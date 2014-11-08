var Question = require('mongoose').model('Question');
var usedQuestions = [];

module.exports = {
	getRandomQuestion: function(req, res, next) {
		Question.find({}).exec(function(err, data) {
			if (err) {
				console.log('Cant find questions ' + err);
				return;
			}
			var randNum = Math.floor(Math.random()*data.length);
			res.send(data);
		});

	}
};