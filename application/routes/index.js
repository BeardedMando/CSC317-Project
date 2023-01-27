var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
//part of sharp
const {getRecentPosts, getPostById, getCommentsForPostById} = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get('/',getRecentPosts ,function(req, res, next) {
  res.render('index', {js:["indexscript.js"]});
});

router.get("/login", function(req, res){
  res.render('login');
});
router.get("/register", function(req, res){
  res.render('registration',{js:["script.js"]});
});
router.get("/postimage", isLoggedIn ,function(req, res){
  res.render('postimage');
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostById ,function(req, res){
  // console.log(req.params);
  res.render('viewpost', {js:["viewpost.js"]});
});

module.exports = router;
