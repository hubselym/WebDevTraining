var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Install Passport plugin which gives methods and functionality
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);