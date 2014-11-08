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
var map = [],usernames = {}, users={}, turn=2;
for(var i=0; i<18; i++)map[i]=0;

users[1] = false;
users[2] = false;

function changeTurn(){
	turn = 3-turn;
	io.sockets.emit('changeTurns');
}

io.sockets.on('connection', function (socket) {
	socket.on('adduser', function(username){
		if(io.eio.clientsCount<=2){
			if(!users[1]){
				socket.username = username;
				socket.player = 1;
				usernames[username] = username;
				users[1] = true;
			}else{
				socket.username = username;
				socket.player = 2;
				usernames[username] = username;
				users[2] = true;
				changeTurn();
			}
			console.log(socket.player+" player has joined.");
			socket.emit('setPlayer', socket.player);
		}
		
	});

	socket.on('changeTerritory', function(data){
		io.sockets.emit('invadeTerritory', data);
	});

	socket.on('disconnect', function(){
		console.log(socket.player+" player has left the game.");
		users[socket.player] = false;
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat');
	});
});

console.log('Server up and running on port: ' + config.port);