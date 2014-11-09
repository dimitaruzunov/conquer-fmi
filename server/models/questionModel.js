var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
	body: String,
	codeable: Boolean,
	answer: Number
});
var Question = mongoose.model('Question', questionSchema);

// mongoose.connection.on('open', function() {
// 	mongoose.connection.db.dropDatabase(function(err){
// 		console.log('can\'t delete database');
// 	});
// });

module.exports.addInitialQuestions = function() {
	Question.find({}).exec(function(err,data) {
		if (err) {
			console.log('Error finding question '+ err);
			return;
		}
		if (data.length === 0) {
			Question.create({body: "Find the sum of all prime numbers from 7 to 69.", codeable: true, answer: 641},
							{body: "Find 12 factorial.", codeable: true, answer: 479001600},
							{body: "Find the sum of first 18 fibonacci numbers.", codeable: true, answer: 0});
			console.log("Questions added");
		}
	});
}
