var turn = 2;
var map = [], id, selectedArea;
var yourTurn = function () {
	alert("Your Turn!");
};
var attack = function (terrId) {
	socketOnAttack(terrId);
};

var timeout;
var questionTime;
var loadUpQuestion = function (question) {
	questionTime = new Date().getTime();
	timeout = window.setTimeout(sendAnswer, 10000000);

};


var evaluateCode = function (code) {
	$("#answer").text(eval(code));
};

var sendAnswer = function () {
	window.clearTimeout(timeout);

	var currentTime = new Date().getTime();
	var time = currentTime - questionTime;

	// send answer and time
};

var updateStats = function (status) {
	updateCorrectness(status.correct);

	updateMap();

	if (status.yourTurn) {
		yourTurn();
	}
};

var updateMap = function () {

};

var updateCorrectness = function (correct) {
	if (correct) {
		$("#correct").text("correct");
	} else {
		$("#correct").text("not correct");
	}
};

for(var i=0; i<18; i++)map[i]=0;
//TODO: add config file
var socket = io.connect('http://localhost:3030');
//var socket = io.connect('http://localhost:8080');
