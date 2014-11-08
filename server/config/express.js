var express = require('express');
var path = require('path');

module.exports = function(app, config) {
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);
	app.set('views', path.normalize(__dirname + '../../../public/app'));
}