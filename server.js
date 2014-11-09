var express = require('express');
var env = process.env.NODE_ENV || 'development';


var app=express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

var config = require('./server/config/config')[env];
var qIndex = 0;
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/route')(app);

var Question = require('mongoose').model('Question');

server.listen(config.port);
//TODO: move on seperate file
// var map = [1,1,1,0,0,2,2,0,1,1,1,1,0,2,2,2,2,2];
var usernames = {}, users={}, turn=1, falseAns = 0, questions = [], scores;
// for(var i=0; i<18; i++)map[i]=0;

users[1] = false;
users[2] = false;

function changeTurn(){
	turn = 3-turn;
	io.sockets.emit('changeTurns', JSON.stringify({turn: turn}));
}

function getData(n) {
	questions = n;
	console.log(questions);
};

function getDbId() {
	Question.find({}).exec(function(err, data) {
		if (err) {
			console.log('Cant find questions ' + err);
			return;
		}
		return getData(data);
	});
	console.log('data loaded');
};
function startGame() {
	// game timer
	setTimeout(function () {
		io.sockets.emit('endGame');
	}, 2000000);
	getDbId();
	scores = [0, 0];
	turn = 1;
	io.sockets.emit('startGame', JSON.stringify({turn: turn}));
};

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
				startGame();
			}
			console.log(socket.player+" player has joined.");
			socket.emit('setPlayer', socket.player);
		}

	});
	var question;
	socket.on('changeTerritory', function(data){
		console.log(questions[0]);
		if (qIndex < questions.length) {
			question = questions[qIndex];
			qIndex++;
		}
		else {
			qIndex = 0;
		}
		//var question = {body: '2 + 3 = ?', answer: 5};
		io.sockets.emit('invadeTerritory', data);
		io.sockets.emit('loadUpQuestion', JSON.stringify(question));
	});

	socket.on('trueAnswer', function() {
		console.log("Player"+turn+" answered!");
		if (turn == socket.player) {
			console.log("Player"+socket.player+" has answered correctly!");
			scores[turn-1] += 100;
			io.sockets.emit('winTerritory', JSON.stringify({winner: socket.player, score: scores[turn-1]}));
			changeTurn();
		} else {
			scores[2-turn] += 50;
			io.sockets.emit('winPoints', JSON.stringify({winner: 3-turn, score: scores[2-turn]}));
			changeTurn();
		}
		io.sockets.emit('updatePoints');

		falseAns = 0;
	});

	socket.on('falseAnswer', function() {
		if (falseAns) {
			changeTurn();
			falseAns = 0;
			io.sockets.emit('noWinTerritory');
			return;
		}
		falseAns++;
		socket.emit('showFalseAnswer');
	});

	socket.on('checkAnswer', function(data){
		// get question from db
		var q = JSON.parse(data);
		if (turn == socket.player) {
			if (q.question.answer == q.userAns) {

			}
		}
		io.sockets.emit('loadUpQuestion', JSON.stringify(question));
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
