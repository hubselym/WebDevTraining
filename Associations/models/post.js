var mongoose = require("mongoose");

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
//return value to whatever's using the model
module.exports = mongoose.model("Post", postSchema);