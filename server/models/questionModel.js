var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
	body: String,
	codeable: Boolean,
	difficulty: Integer,
	answer: String
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
			Question.create({body: "Find the sum of all prime numbers from 7 to 69", codeable: true, difficulty: 3, answer: "641"},
				{body: "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000.", codeable: true, difficulty: 4},
				{body: "By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13. What is the 10 001st prime number?", codeable: true, difficulty: 10},
				{body: "The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17. Find the sum of all the primes below two million." ,codeable: true,difficulty: 6}, 
				{body: "How many times will the given loop repeat?
				{
					int n=6;
					for(int i=0, i<=n; i++) {
						for (int j=0, j<n; j++) {
							...
							for (int p=0, p<1; p++) {
								cout<<\"Hi\";
							}
						}
					}
				}", codeable: false, difficulty: 2},
				{body: "2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder. What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?", codeable: true, difficulty: 6 }
			);
		}
	});
}
// module.exports.addInitialCourses = function() {
// 	Course.find({}).exec(function(err, data){
// 		if (err) {
// 			console.log('Cannot find courses: ' + err);
// 			return;
// 		}
// 		if (data.length===0) {
// 			Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
// 			console.log('Courses addded to database successfully');
// 		}
// 	});
// }