var express = require('express');
var path=require('path');
var passport = require('passport');
var router = express.Router();
var obj2=readQuiz["questions"];
var curr_obj;
var user;
var index;
// Get Homepage
router.get('/',function(req, res){
	res.render('index');
});

module.exports = router;