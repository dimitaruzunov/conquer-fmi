var mongoose = require('mongoose');

// var courseSchema = mongoose.Schema({
// 	title: String,
// 	featured: Boolean,
// 	published: Date,
// 	tags: [String]
// });
// var Course = mongoose.model('Course', courseSchema);

// mongoose.connection.on('open', function() {
// 	mongoose.connection.db.dropDatabase(function(err){
// 		console.log('can\'t delete database');
// 	});
// });

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