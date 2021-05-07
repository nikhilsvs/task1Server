var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    name:{
        type:String,
        require:true
    }
});

var Images = mongoose.model('images',imageSchema);

module.exports = Images;