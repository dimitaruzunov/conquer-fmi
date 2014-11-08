var turn = 2;
var map = [], id, selectedArea;
var yourTurn = function () {
	alert("Your Turn!");
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

for(var i=0; i<18; i++)map[i]=0;
//TODO: add config file
var socket = io.connect('http://localhost:3030');
//var socket = io.connect('http://localhost:8080');
socket.on('connect', function(){
	socket.emit('adduser', "krisko");
});
socket.on('changeTurns', function(){
	turn = 3-turn;
	if(turn == id){
		yourTurn();
	}else{
		//its not your turn
	}
	
});
socket.on('setPlayer', function(data){
	id = parseInt(data);
	if(id==1) $("#player").css("color", "blue");
	if(id==2) $("#player").css("color", "red");
	$("#player").text(data);
});
socket.on('invadeTerritory', function(data){
	var axis = JSON.parse(data);
	$("#d"+axis.x).css("background-color", "blue");
	//map[axis.x] = axis.id;
	//updateMap()
});
socket.on('selectArea', function(data){
	var axis = JSON.parse(data);
	map[axis.y][axis.x] = axis.id;
	updateMap()
});

$(function(){
	$(".territory").click(function(){
		socket.emit('changeTerritory', JSON.stringify({x:$(this).index(), id:id}));
		//selectedArea = JSON.stringify({x:$(this).index(), id:id});		
	})
});

function updateMap(){

}