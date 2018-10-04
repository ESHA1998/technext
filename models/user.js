var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String
	},
	contact: {
		type: String
	},
	email: {
		type: String
	},
	contact1: {
		type: String
	},
	contact2:{
		type: Number
	},
	contact3:{
		type:Number
	},
	 resetPasswordToken: {
	 	type: String
	 },
  resetPasswordExpires:{
  		type: Date
  } 
});

//UserSchema.plugin(passportLocalMongoose);

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
