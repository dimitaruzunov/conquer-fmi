var Question = require('mongoose').model('Question');

module.exports = {
	returnAllID: function(req, res, next) {
		Question.find({}).exec(function(err, data) {
			if (err) {
				console.log('Cant find questions ' + err);
				return;
			}
			res.send(data._id);
		});
	},
	getQuestionByID: function(req, res, next) {
		Question.find({_id: req.searchId}).exec(function(err, data){
			if (err) {
				console.log('Cant find questions ' + err);
				return;
			}
			res.send(data);
		});
	}
};