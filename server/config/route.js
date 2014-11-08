//var ctrlIndex = require('../controller/index');
var express = require('express');
//var app = express();

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('../../public/app/index.html')
	});
};