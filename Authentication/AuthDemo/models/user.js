var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//take passportLocalMongoose package and add methods that come with the package to user schema
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);