var yourTurn = function () {

};

var attack = function (terrId) {
	socketOnAttack(terrId);
};

var askForQuestion = function () {
	socketOnAskQuestion();
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

var updateMap = function () {

};

var updateCorrectness = function (correct) {
	if (correct) {
		$("#correct").text("correct");
	} else {
		$("#correct").text("not correct");
	}
};

var map = [], id, selectedArea;
for(var i=0; i<18; i++)map[i]=0;
//TODO: add config file
var socket = io.connect('http://localhost:3030');
//var socket = io.connect('http://localhost:8080');

socket.on('connect', function(){
	socket.emit('adduser', "krisko");
});
socket.on('setPlayer', function(data){
	id = parseInt(data);
	if(id==1) $("#player").css("color", "blue");
	if(id==2) $("#player").css("color", "red");
	$("#player").text(data);
});
socket.on('selectArea', function(data){
	var axis = JSON.parse(data);
	map[axis.y][axis.x] = axis.id;
	updateMap()
});

$(function(){
	$(".territory").click(function(){
		socket.emit('serverAskQuestion');
		selectedArea = JSON.stringify({x:$(this).index(), id:id});		
	})
});

function updateMap(){

}