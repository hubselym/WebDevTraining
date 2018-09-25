var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //Ref refers to the model that we're going to refer to with that object Id
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);