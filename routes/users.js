var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var mongoose = require('mongoose');
var User = require('../models/users');
const passport = require('passport');
var userRouter = express.Router();

/* GET users listing. */


userRouter.use(bodyParser.json());

userRouter.route('/')
.get(function(req, res, next) {
  res.send('respond with a resource');
})

userRouter.route('/signup')
.post((req,res,next)=>{
  User.register(new User({email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname,
          phone:req.body.phone}),req.body.password,(err,user)=>{

    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({message:"Unable to register user",error:err});
    }
    else{
      passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success:true,status: 'Registration Successful!'});
        });
    }
  })
})

userRouter.route('/login')
.post((req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
      if(err)
      {
        return next(err);
      }
      if(!user){
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful',err:info});
      }

      req.logIn(user,(err)=>{
        if(err){
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: false, status: 'Login Unsuccessful!',err:'Could Not Login User'});
        }

        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'You are successfully logged in!'});
      });
    })(req,res,next);
})

userRouter.route('/logout')
.get((req, res,next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = userRouter;
