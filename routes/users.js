var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer=require('nodemailer');

var User=require('../models/user');

// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Register User
router.post('/register', function (req, res) {
	var contact = req.body.contact;
	var email = req.body.email;
	var username = req.body.username;
	var contact1 = req.body.contact1;
	var contact2 = req.body.contact2;
	var contact3 = req.body.contact3;

	// Validation
	req.checkBody('contact', 'Contact is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('contact1', 'Contact1 is required').notEmpty();
	req.checkBody('contact', 'Contact must be 10 numbers').isLength({min:10});
	req.checkBody('contact1', 'Contact must be 10 numbers').isLength({min:10});

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email already taken
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (mail) {
					res.render('register', {
						mail: mail
					});
				}
				else {
					var newUser = new User({
						username: username,
						email: email,
						contact:contact,
						contact1:contact1,
						contact2:contact2,
						contact3:contact3
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
					var transporter = nodemailer.createTransport({
 					service: 'gmail',
 					secure: false,
  					port: 25,
 					auth: {
            		user: 'esha251298@gmail.com',
            		pass:'esha123abc'
   					},
   					tls:{
   						rejectUnauthorized:false
   					}
				});

					const mailOptions = {
 					 from: '"Amigo Contact"<esha251298@gmail.com>', // we will put innerve's address here
  					 to: email, // list of receivers can be put if reqd
  					 subject: 'Amigo registeration', 
  					 html: '<h3>Hi</h3><p>Thanks for registering with Amigo!!!</p>'// other content can be put eg-events etc.
				};
				transporter.sendMail(mailOptions, function (err, info) {
   				if(err)
     				console.log(err)
   				else
     				console.log(info);
				});
         	req.flash('success_msg', 'You are registered. Your safety is now our responsibility');
					res.render('index');
				}
			});
	}
});

module.exports = router;