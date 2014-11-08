var yourTurn = function () {

};

var attack = function (terrId) {
	socketOnAttack(terrId);
};

var askForQuestion = function () {
	socketOnAskQuestion();
};

var timeout;
var questionTime;
var loadUpQuestion = function (question) {
	questionTime = new Date().getTime();
	timeout = window.setTimeout(sendAnswer, 10000000);

	openPopup(question);
};

var openPopup = function (question) {
	$("#question").text(question);
	$("#code").val();
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
