var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

    var campgrounds = [
            {name: "Berd Nest", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144293f1c971a0e8b4_340.jpg"},
            {name: "Apropriation", image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104496f6c071afedb7b9_340.jpg"},
            {name: "UnderMountain", image: "https://farm3.staticflickr.com/2363/2386955872_a1196b0286.jpg"}
        ];


app.get("/", function(req, res){
    res.render("landing");
});

//Page that lists all the camp grounds.
app.get("/campgrounds", function(req, res){

        res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

//shows the data that is sent to the post route (restful format)
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});