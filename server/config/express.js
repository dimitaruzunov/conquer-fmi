var express = require('express');

module.exports = function(app, config) {
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '../../../public/'));
	app.engine('html', require('ejs').renderFile);
	app.set('views', __dirname + '../../public/');
}