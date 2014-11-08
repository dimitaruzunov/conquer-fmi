(function () {
    var rooms = $(".territory");
    console.log(rooms);

    rooms.on('click', function () {
        var blurredBackground = $('.focused');
        blurredBackground.addClass('blurred');
        $('#popup').removeClass('hidden');
    });
})();