(function () {
	var body = $("body");

	body.on("click", ".territory .free", function() {
		attack($(this).attr("id").substring(1));
		$(this).addClass("underAttack");
	});

	body.on("click", "#btn-join", function(e) {
		e.preventDefault();
		window.location.href = $(this).attr("href") + "/" + $("#username").val();
	});

	body.on("click", "#run", function() {
		evaluateCode($("#code").text());
	});

	body.on("click", "#submitAnswer", sendAnswer);

	socket.on('connect', function() {
		socket.emit('adduser', "krisko");
	});

	socket.on('changeTurns', function() {
		turn = 3-turn;
		if(turn == id){
			yourTurn();
		}else{
			//its not your turn
		}
	});

	socket.on('setPlayer', function(data) {
		id = parseInt(data);
		if(id==1) $("#player").css("color", "blue");
		if(id==2) $("#player").css("color", "red");
		$("#player").text(data);
	});

	socket.on('invadeTerritory', function(data){
		var axis = JSON.parse(data);
		socket.emit('askForQuestion');
		$("#d"+axis.x).css("background-color", "blue");
		//map[axis.x] = axis.id;
		//updateMap()
	});

	socket.on('selectArea', function(data){
		var axis = JSON.parse(data);
		map[axis.y][axis.x] = axis.id;
		updateMap();
	});

	socket.on('loadUpQuestion', function (data) {
		loadUpQuestion(JSON.parse(data));
	});

	$(".territory").click(function(){
		socket.emit('changeTerritory', JSON.stringify({x:$(this).index(), id:id}));
		//selectedArea = JSON.stringify({x:$(this).index(), id:id});
	});
	
})();
