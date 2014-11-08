(function () {
    var rooms = $(".territory");

    rooms.on('click', function () { 
    	replayGif();
		setTimeout(function() {
        var blurredBackground = $('.focused');
        blurredBackground.addClass('blurred');
        $('#popup').removeClass('hidden');
        $('.dark').removeClass('hidden');}, 950);
		
		replayGif();
		
		var x = $("#"+territoryName).offset().left+$("#"+territoryName).width()/2-90;
		var y = $("#"+territoryName).offset().top+$("#"+territoryName).height()/2-50;
		$('#xAnimation').css({ 'opacity': 1});
		$('#xAnimation').css({ 'margin-left': x+'px'});
		$('#xAnimation').css({ 'margin-top': y+'px'});
		setTimeout(function() {$('#xAnimation').css({ 'opacity': 0});},900);
    });
	function replayGif(){
		var img = new Image();
		img.src = '../img/xAnimation.gif';
		$('#xAnimation').css('background-image', 'url("' + img.src + '?x=' + Date.now() + '")' );
	}
})();