const mongoose   = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose'),
      findOrCreate   = require('mongoose-findorcreate');


const userSchema = new mongoose.Schema
({
    email :
    {
        type     : String ,
        trim     : true 
    },

    password :
    {
        type     : String ,
    },

    googleId :
    {
        type : String
    },

    secret : 
    {
        type : String
    }
    
} , {versionKey : false , timestamps : { createdAt : "createt_at" , updatedAt : "updated_at" }});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User" , userSchema);

module.exports = User;