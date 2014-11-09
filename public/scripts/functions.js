var curQ;
// $("#pl-" + turn.toString()).html("Player " + turn.toString() + " turn");
// $("#pl-" + (3-turn).toString()).html("Player " + (3-turn).toString() + " waiting...");
var map = [1,1,1,0,0,2,2,0,1,1,1,1,0,2,2,2,2,2];
var id, selectedArea;

// players
var p1 = $("#p1");
var p2 = $("#p2");

p1.html("Player 1");
p2.html("Player 2");

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

var enableRooms = function () {
	$('body').on('click', '.territory', function () {
		socket.emit('changeTerritory', JSON.stringify({x:$(this).index(), id:id}));
	});
	$('.territory').addClass('darken').removeClass('rooms-disabled');
};

var disableRooms = function () {
	$('body').off('click', '.territory');
	$('.territory').removeClass('darken').addClass('rooms-disabled');
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

var resetTextFields = function () {
	$('#answer').val('');
	editor.setSession(ace.createEditSession('function returnValue(){\n\n}\nreturnValue();'));
}

var updateCorrectness = function (correct) {
	if (correct) {
		$("#correct").text("correct");
	} else {
		$("#correct").text("not correct");
	}
};
//TODO: add config file
var socket = io.connect('http://localhost:3030');
