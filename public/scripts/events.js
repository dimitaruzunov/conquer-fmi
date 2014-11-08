(function () {
	var body = $("body");
	body.on("click", ".territory .free", function() {
		attack($(this).attr("id"));
		$(this).addClass("underAttack");
	});

	body.on("click", "#btn-join", function(e) {
		e.preventDefault();
		window.location.href = $(this).attr("href") + "/" + $("#username").val();
	});
})();