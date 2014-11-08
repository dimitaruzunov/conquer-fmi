// var Course = require('mongoose').model('Course');
var Question = require('mongoose').model('Question');

module.exports = {
	getRandomQuestion: function(req, res, next) {
		Question.find({}).exec(function(err, data) {
			if (err) {
				console.log('Cant find questions ' + err);
				return;
			}
			var arr=[];
			for (int i=0; i<data.length; i++) {
				arr.push(i);
			}
		})

	}
	// sendAllCourses: function(req, res, next) {
	// 	Course.find({}).exec(function(err, data){
	// 		if (err) {
	// 			console.log('Couldn\'t access database: ' + err);
	// 			return;
	// 		}
	// 		res.send(data);
	// 		res.end();
	// 	});
	// }
};

//getRandom, 