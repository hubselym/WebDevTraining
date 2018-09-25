var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//need to read what this does
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lilly"];

app.get("/", function(req,res){
    res.render("home");
});


app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});


//Post route for adding data
app.post("/addfriend", function(req, res){
    //req.body is all the data that's contained in the body
    console.log(req.body.newfriend);
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    //redirect takes name of a route and it will redirect to that route
    res.redirect("/friends")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is started");
})