(function () {

	var body = $("body");

	body.on("click", "#btn-join", function(e) {
		e.preventDefault();
		window.location.href = $(this).attr("href");
	});

	body.on("click", "#compile", function() {
		var code = editor.getSession().getValue();
		evaluateCode(code);
	});

	body.on("click", "#run", function() {
		evaluateCode($("#code").text());
	});

	socket.on('connect', function() {
		socket.emit('adduser', "krisko");
	});

	socket.on('startGame', function(data) {
		updateMap();

		var pData = JSON.parse(data);
		$("#pl-" + pData.turn).html("Player " + pData.turn + " turn");
		$("#pl-" + (3 - pData.turn)).html("Player " + (3-pData.turn) + " waiting...");

		if (pData.turn == id){
			enableRooms();
		} else {
			disableRooms();
		}
	});

	socket.on('changeTurns', function(data) {
		var pData = JSON.parse(data);
		$("#pl-" + pData.turn).html("Player " + pData.turn + " turn");
		$("#pl-" + (3 - pData.turn)).html("Player " + (3-pData.turn) + " waiting...");
		updateMap();
		resetTextFields();
		if (pData.turn == id){
			enableRooms();
		} else {
			disableRooms();
		}
	});

	socket.on('setPlayer', function(data) {
		id = parseInt(data);
		if(id==1) $("#player").css("color", "blue");
		if(id==2) $("#player").css("color", "red");
		$("#player").text(data);
	});

	socket.on('updatePoints', function() {
		updateStat();
	});
	socket.on('invadeTerritory', function(data){
		var axis = JSON.parse(data);
		selectedArea = axis.x;
		console.log("You are fighgting for:"+selectedArea);
		replayGif();
		$('#xAnimation').css('background-image', 'url(\'\')' );
		var territoryName = "d"+selectedArea;
		var x = $("#"+territoryName).offset().left+$("#"+territoryName).width()/2-90;
		var y = $("#"+territoryName).offset().top+$("#"+territoryName).height()/2-50;
		$('#xAnimation').css({ 'opacity': 1, 'z-index': 100});
		$('#xAnimation').css({ 'margin-left': x+'px'});
		$('#xAnimation').css({ 'margin-top': y+'px'});
		setTimeout(function() {$('#xAnimation').css({ 'opacity': 0, 'z-index': -9999});},800);
		// $("#d"+axis.x).css("background-color", "blue");
		//map[axis.x] = axis.id;
		//updateMap()
	});

	$('.submit').on('click', function() {
		$("#popup").addClass('hidden');
		$(".dark").addClass('hidden');
		$(".focused").removeClass('blurred');
		checkAnswer(curQ);
	});

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
		console.log("Player"+axis.winner+" won");
		map[selectedArea] = axis.winner;
		updateMap();

        var blurredBackground = $('.focused');
        blurredBackground.removeClass('blurred');
        $('#popup').addClass('hidden');
        $('.dark').addClass('hidden');

		$("#score-"+axis.winner).html(axis.score);
	});

	socket.on('winPoints', function (data) {
		var axis = JSON.parse(data);
		//alert(selectedArea + " " + data);
		console.log("Player"+axis.winner+" won");

        var blurredBackground = $('.focused');
        blurredBackground.removeClass('blurred');
        $('#popup').addClass('hidden');
        $('.dark').addClass('hidden');

		$("#p"+axis.winner).html("Player " + axis.winner + " result: " + (axis.score));
	});

	socket.on('noWinTerritory', function () {
        var blurredBackground = $('.focused');
        blurredBackground.removeClass('blurred');
        $('#popup').addClass('hidden');
        $('.dark').addClass('hidden');
	});

	socket.on('showFalseAnswer', function () {
		disableRooms();
	});

	socket.on('endGame', function () {
		endGame();
	});

	function replayGif(){
		var img = new Image();
		img.src = '../img/xAnimation.gif';
		$('#xAnimation').css('background-image', 'url("' + img.src + '?x=' + Date.now() + '")' );
	};
})();
