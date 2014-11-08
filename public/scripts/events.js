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
})();
