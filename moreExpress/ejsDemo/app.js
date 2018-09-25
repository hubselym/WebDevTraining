var express = require("express");
var app = express();

//Tell express to server the contents of extra folders
app.use(express.static("public"));

//Tells express to assume files served in the "view" folder to be file type ejs
app.set("view engine", "ejs")

app.get("/", function(req, res){
    //render method lives on the res object (response object)
    res.render("home");
});

//ejs lets us embed javascript code inside html. Embedded Java script

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
            {title: "Post 1", author: "Siggy"},
            {title: "This course is great", author: "Mindy"},
            {title: "Why am i studying?", author: "Varlo"},
        ];
        res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Listening");
})