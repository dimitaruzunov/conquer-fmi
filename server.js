var express = require('express');
var env = process.env.NODE_ENV || 'development';


var app=express(), 
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/route')(app);

server.listen(config.port);
//TODO: move on seperate file

var usernames = {};

io.sockets.on('connection', function (socket) {
	console.log("New Connection!");
	socket.on('adduser', function(username){
		socket.username = username;
		usernames[username] = username;
		socket.emit('setPlayer', io.eio.clientsCount);
	});

	socket.on('selectField', function (data) {
		socket.broadcast.emit('selectEnemyArea', data);
		socket.emit('selectArea', data);
		var axis = JSON.parse(data);
		
		console.log("map["+axis.y+"]["+axis.x+"]="+axis.id);
		map[axis.y][axis.x] = axis.id;
	});

	socket.on('serverAskQuestion', function () {
		socket.broadcast.emit('askQuestion');
		socket.emit('askQuestion');
	});	

	socket.on('disconnect', function(){
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat');
	});
});

console.log('Server up and running on port: ' + config.port);