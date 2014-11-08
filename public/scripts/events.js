(function () {
	$("body").on("click", ".territory .free", function() {
		attack($(this).attr("id"));
		$(this).addClass("underAttack");
	});
})();