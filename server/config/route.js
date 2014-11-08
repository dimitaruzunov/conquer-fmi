var ctrlIndex = require('../controller/index');
var express = require('express');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render(__dirname + '../../../public/app/index.html')
	});
	app.get('/game', function(req, res) {
		res.render(__dirname + '../../../public/app/game/game.html');
	});

};