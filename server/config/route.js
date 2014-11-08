//var ctrlIndex = require('../controller/index');
var express = require('express');
var path = require('path');
var fs = require('fs');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render(__dirname + '../../../public/app/index.html')
	});
};