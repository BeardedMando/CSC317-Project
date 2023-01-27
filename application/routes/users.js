var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const db = require('../conf/database');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//Method : POST
//localhost: 3000/users/register
router.post("/register", function(req, res, next){
  const {username, email, pass} = req.body;

  db.query('select id from users where username=?',[username])
    .then(function([results, fields]){
      if(results && results.length == 0){
        return db.query('select id from users where email=?',
        [email])
      }else{
        throw new Error('username already exists');
      }
    }).then(function([results, fields]){
      if(results && results.length == 0){
       return bcrypt.hash(pass, 2);
      }else{
        throw new Error('email already exists');
      }
    }).then(function(hashedPassword){
      return db.query('insert into users (username, email,  password) value (?,?,?)',[username, email, hashedPassword])
    })
  
    .then(function([results, fields]){
      if(results && results.affectedRows == 1){
        res.redirect('/login');
      }else{
        throw new Error('user could not be made');
      }
    }).catch(function(err){
      res.redirect('/register');
      next(err);
    });
});

//Method : POST
//localhost:300/users/login
router.post("/login", function(req, res, next){
  const {index_username, password} = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('select id, username, password from users where username=? ', [index_username])
    .then(function([results, fields]){
      if(results && results.length == 1){
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword);
      }else{
        throw new UserError('Failed Login: Invalid user credentials', "/login", 200);
      }
    })
    .then(function(passwordsMatched){
      if(passwordsMatched){
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}, you are now logged in.`);
        req.session.save(function(saveError){
          res.redirect('/');
        }) 
        res.redirect('/');
      }else{
        throw new UserError('Failed Login: Invalid user credentials', "/login", 200);
      }
    })
    .catch(function(err){
      if(err instanceof UserError){
        req.flash("error", err.getMessage());
        req.session.save(function(saveErr){
          res.redirect(err.getRedirectURL());
        })
      }else{
        next(err);
      }
    })
});

router.post("/logout", function(req, res){
  req.session.destroy(function(destroyError){
    if(destroyError){
      next(err);
    }else{
      res.json({
        status: 200,
        message: "You have been logged out"
      });
    }
  })
});
// router.delete('/login')

module.exports = router;
