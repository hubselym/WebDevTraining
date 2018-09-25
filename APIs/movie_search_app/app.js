var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

// Search
app.get("/", function(req, res) {
    res.render("search");
})


// Results
app.get("/results", function(req, res){
    // Getting the value of the form called whatever we called it (search in this case)
    var query = (req.query.search);
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            //turn the body obj from a big string to an object
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Moive App has Started!");
})