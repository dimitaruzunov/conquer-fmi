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
var endGame = function (scores) {

	showEndGamePopup(scores);
};

var showEndGamePopup = function (scores) {
	$('#p1-score').html(scores[0]);
	$('#p2-score').html(scores[1]);
	if (scores[0] === scores[1]) {
		$('#winner').html('Draw');
	} else if (scores[0] > scores[1]) {
		$('#winner').html('Player 1');
	} else {
		$('#winner').html('Player 2');
	}
	$('#popup').hide();
	endGamePopup.show();
	$('.dark').show();
	$('.player-info').addClass('hidden');
};

// var timeout;
// var questionTime;
var loadUpQuestion = function (question) {
	//questionTime = new Date().getTime();
	// timeout = window.setTimeout(sendAnswer, 10000000);
	console.log("invoked/loadUpQuestion");
	curQ = question;
	if (question.codeable) {
		setTimeout(function() {
	        var blurredBackground = $('.focused');
	        blurredBackground.addClass('blurred');
	        editor.setSession(ace.createEditSession('function returnValue(){\n\n}\nreturnValue();'));
	        editor.setReadOnly(false);
	        editor.getSession().setMode("ace/mode/javascript");
	        $('#popup .question').html(question.body);
	        $('#popup').removeClass('hidden');
	        $('.dark').removeClass('hidden');
	        $('#answer').css('width', 535 + 'px');
	   		$('#compile').removeClass('hidden');}, 950);
	} else if (!question.codeable) {
		setTimeout(function() {
	        var blurredBackground = $('.focused');
	        blurredBackground.addClass('blurred');
	        $('#popup .question').html(/*question.body*/"What's the result of the following compilation?");
	        editor.setSession(ace.createEditSession(question.body));
	        editor.setReadOnly(true);
			editor.getSession().setMode("ace/mode/javascript");
			$('#editor').prop('readonly', true);
			$('#answer').css('width', 80+535 + 'px');
	        $('#popup').removeClass('hidden');
	        $('.dark').removeClass('hidden');
	    	$('#compile').addClass('hidden');}, 950);
	}
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

$(document).keydown(function(e) {
    if (e.which == 8 && !$(':focus').length) {
        e.preventDefault();
    }
});

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
	editor.getSession().setMode("ace/mode/javascript");
}

var updateCorrectness = function (correct) {
	if (correct) {
		$("#correct").text("correct");
	} else {
		$("#correct").text("not correct");
	}
};
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function deleteCookie( name ) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
//TODO: add config file
//var socket = io.connect('http://10.0.201.34:3030');
var socket = io.connect('http://localhost:3030');
