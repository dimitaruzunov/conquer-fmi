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

	// body.on("click", "#submitAnswer", sendAnswer);

	socket.on('connect', function() {
		socket.emit('adduser', "krisko");
	});

	socket.on('changeTurns', function() {
		turn = 3-turn;
		updateMap();
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
		selectedArea = axis.x;
		console.log("You are fighgting for:"+selectedArea);
		replayGif();
		var territoryName = "d"+selectedArea;
		var x = $("#"+territoryName).offset().left+$("#"+territoryName).width()/2-90;
		var y = $("#"+territoryName).offset().top+$("#"+territoryName).height()/2-50;
		$('#xAnimation').css({ 'opacity': 1});
		$('#xAnimation').css({ 'margin-left': x+'px'});
		$('#xAnimation').css({ 'margin-top': y+'px'});
		setTimeout(function() {$('#xAnimation').css({ 'opacity': 0});},900);
		// $("#d"+axis.x).css("background-color", "blue");
		//map[axis.x] = axis.id;
		//updateMap()
	});

	$('.submit').on('click', function() {
		$("#popup").addClass('hidden');
		$(".dark").addClass('hidden');
		$(".focused").removeClass('blurred');
	})
	socket.on('selectArea', function(data){
		var axis = JSON.parse(data);
		map[axis.y][axis.x] = axis.id;
		updateMap();
	});

	socket.on('loadUpQuestion', function (data) {
		loadUpQuestion(JSON.parse(data));
	});

	socket.on('winTerritory', function (data) {
		var axis = JSON.parse(data);
		//alert(selectedArea + " " + data);
		console.log("Player"+axis.winner+" won")
		map[selectedArea] = axis.winner;
		updateMap()
		//$('#d'+selectedArea).addClass(axis.winner == 1 ? 'blue' : "red");
	});

	socket.on('noWinTerritory', function () {
		// hide popup
	});

	// end game
	socket.on('endGame', function () {
		endGame();
	});

	$(".territory").click(function(){
		socket.emit('changeTerritory', JSON.stringify({x:$(this).index(), id:id}));
		//selectedArea = JSON.stringify({x:$(this).index(), id:id});
    });
	function replayGif(){
		var img = new Image();
		img.src = '../img/xAnimation.gif';
		$('#xAnimation').css('background-image', 'url("' + img.src + '?x=' + Date.now() + '")' );
	};
})();
