// game timer
var gameTimer = window.setTimeout(endGame, 30000);

// game ends when the time runs out
var endGame = function () {	
	showEndGamePopup();
};

var showEndGamePopup() {
	$("#popup").hide();
	$("#endgame-popup").show();
};

var turn = 2;
var map = [1,1,1,0,0,2,2,0,1,1,1,1,0,2,2,2,2,2];
var id, selectedArea;
var yourTurn = function () {
	console.log("Your Turn! Player"+turn);
};
var attack = function (terrId) {
	socketOnAttack(terrId);
};

// var timeout;
// var questionTime;
var loadUpQuestion = function (question) {
	//questionTime = new Date().getTime();
	// timeout = window.setTimeout(sendAnswer, 10000000);
	setTimeout(function() {
        var blurredBackground = $('.focused');
        blurredBackground.addClass('blurred');
        $('#popup').removeClass('hidden');
        $('.dark').removeClass('hidden');}, 950);
	//openPopup(question);
};

var openPopup = function (question) {
	//$("#question").text(question.body);
	//$("#code").val();
	//var userAns = prompt(question.body);

	// window.clearTimeout(timeout);
	console.log("Answering question for territory "+selectedArea)
	// send answer and time
	if (question.answer == userAns) {
		socket.emit('trueAnswer');//, JSON.stringify({correctness: , time: time}));
	} else {
		socket.emit('falseAnswer');
	}
};

var evaluateCode = function (code) {
	$("#answer").text(eval(code));
};

var updateStats = function (status) {
	updateCorrectness(status.correct);

	updateMap();

	if (status.yourTurn) {
		yourTurn();
	}
};

var updateMap = function () {
	for(var key in map){
		if(map[key] == 1){
			$("#d"+key).css("background-color", "blue");
		}else if(map[key] == 2){
			$("#d"+key).css("background-color", "red");
		}
	}
};

var updateCorrectness = function (correct) {
	if (correct) {
		$("#correct").text("correct");
	} else {
		$("#correct").text("not correct");
	}
};
//TODO: add config file
var socket = io.connect('http://localhost:3030');
//var socket = io.connect('http://localhost:8080');
