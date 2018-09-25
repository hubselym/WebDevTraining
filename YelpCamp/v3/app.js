//App Setup

var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

//connecting and creating the yelpCamp database
mongoose.connect("mongodb://localhost/yelp_camp_v3");
//common declaraiton to get body-parser to work
app.use(bodyParser.urlencoded({extended: true}));
//setting express to assume all files in the view folder will be .ejs
app.set("view engine", "ejs");

//Temporary Seed Data
seedDB();

//App Routes
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX Route - Show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            //Then Render that
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW Route - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//CREATE Route- Add New Campground to Database
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//SHOW Route - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    //New mongoose method
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});