var express = require("express"),
    Campground = require("../models/campground"),
    router = express.Router();

//INDEX Route - Show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            //Then Render that
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW Route - Show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//CREATE Route- Add New Campground to Database
router.post("/", function(req, res){
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
router.get("/:id", function(req, res){
    //find the campground with provided ID
    //New mongoose method
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;