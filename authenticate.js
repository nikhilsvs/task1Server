var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var User = require('./models/users');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config');
var LocalStrategy = require('passport-local').Strategy;

exports.local = passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secret,{expiresIn:300}); //Expires in 5 minutes
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken;
opts.secretOrKey = config.secret;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("Jwt : " + jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,null);
        }

        else if(user){
            return done(null,user);
        }
        else{
            return done(null,err);
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt',{session:false});

