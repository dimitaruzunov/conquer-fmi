var Question = require('mongoose').model('Question');

module.exports = {
	returnAllID: function() {
		Question.find({}).exec(function(err, data) {
			if (err) {
				console.log('Cant find questions ' + err);
				return;
			}
			return "dksal";
		});
	}
};