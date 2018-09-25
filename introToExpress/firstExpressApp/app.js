var express = require("express");
var app = express();

// when you go to "/" => get a message that says "Hi There!"
app.get("/", function(req, res){
    //request is an object that contains all information of request, same for response
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye");
});
// "/dog" => "Meow!"
app.get("/dog", function(req, res){
    console.log("Someone made a request to /dog!");
    res.send("Meow");
});

// Making a route for a path
app.get("/r/:subredditName", function(req, res) {
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

// Reddit style
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    res.send("Welcome to the comments page");
});

app.get("*", function(req, res){
    res.send("You are a star!!!");
});

//Tell express to listen for requests. Will use the desired port cloud9 gives/ip
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});