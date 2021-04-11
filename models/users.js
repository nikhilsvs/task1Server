var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    phone:{
        type:String
    }
});

userSchema.plugin(passportLocalMongoose,{usernameField: 'email'});

var User = mongoose.model('users',userSchema);

module.exports = User;