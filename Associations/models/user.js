var mongoose = require("mongoose");

//User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // Array of object ids belonging to a post (this is the mongoose syntax)
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
module.exports = mongoose.model("User", userSchema);