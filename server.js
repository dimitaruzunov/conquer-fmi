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
var map = [],usernames = {};
for(var i=0; i<18; i++)map[i]=0;

io.sockets.on('connection', function (socket) {
	console.log("New Connection!");
	socket.on('adduser', function(username){
		socket.username = username;
		usernames[username] = username;
		socket.emit('setPlayer', io.eio.clientsCount);
	});

	socket.on('disconnect', function(){
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat');
	});
});

console.log('Server up and running on port: ' + config.port);