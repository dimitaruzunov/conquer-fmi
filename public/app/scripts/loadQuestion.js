var yourTurn = function () {

};

var askForQuestion = function () {

};

var loadUpQuestion = function (question) {
	openPopup(question);

	// get answer
	$("#submit").click(function() {
		var answer = $("#answer").val();
	});

	sendAnswer(answer);
};

var openPopup = function (question) {
	$("#question").text(question);
};

var sendAnswer = function (answer) {

};

var updateStats = function (status) {
	updateCorrectness(status.correct);

	updateMap();

	if (status.yourTurn) {
		yourTurn();
	}
};

var updateCorrectness = function (correct) {
	if (correct) {
		$("#correct").text("correct");
	} else {
		$("#correct").text("not correct");
	}
};
