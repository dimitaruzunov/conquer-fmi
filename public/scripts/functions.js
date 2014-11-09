var curQ;
// $("#pl-" + turn.toString()).html("Player " + turn.toString() + " turn");
// $("#pl-" + (3-turn).toString()).html("Player " + (3-turn).toString() + " waiting...");
var map = [1,1,1,0,0,2,2,0,1,1,1,1,0,2,2,2,2,2];
var id, selectedArea;

// players
var p1 = $("#p1");
var p2 = $("#p2");

p1.html("Player 1 result: " + 0);
p2.html("Player 2 result: " + 0);
// var yourTurn = function () {
// 	console.log("Your Turn! Player"+turn);
// };
var attack = function (terrId) {
	socketOnAttack(terrId);
};

// game ends when the time runs out
var endGamePopup = $('#endgame-popup');
var endGame = function () {

	showEndGamePopup();
};

var showEndGamePopup = function () {
	$('#popup').hide();
	endGamePopup.show();
	$('.dark').show();
};

// var timeout;
// var questionTime;
var loadUpQuestion = function (question) {
	//questionTime = new Date().getTime();
	// timeout = window.setTimeout(sendAnswer, 10000000);
	console.log("invoked/loadUpQuestion");
	curQ = question;
	setTimeout(function() {
        var blurredBackground = $('.focused');
        blurredBackground.addClass('blurred');
        $('#popup .question').html(question.body);
        $('#popup').removeClass('hidden');
        $('.dark').removeClass('hidden');}, 950);
};

var checkAnswer = function (question) {
	//$("#question").text(question.body);
	//$("#code").val();
	var userAns = $("#answer").val();

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
	$(".console-response").val(eval(code));
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
