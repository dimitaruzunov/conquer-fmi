var mongoose = require('mongoose');
	questionModel = require('../models/questionModel');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;

	db.once('open', function(err) {
		if (err) {
			console.log('Database could not open: ' + err);
			return;
		}
		console.log('Database up and running...');
	});

	db.on('error', function(err) {
		console.log('Database error: ' + err);
	});

	questionModel.addInitialQuestions();
}