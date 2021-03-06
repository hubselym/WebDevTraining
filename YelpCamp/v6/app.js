//App Setup

var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    

//connecting and creating the yelpCamp database
mongoose.connect("mongodb://localhost/yelp_camp_v6");
//common declaraiton to get body-parser to work
app.use(bodyParser.urlencoded({extended: true}));
//setting express to assume all files in the view folder will be .ejs
app.set("view engine", "ejs");
//Getting the css extrasheet connected
app.use(express.static(__dirname + "/public"));

//Temporary Seed Data
seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret: "Once Again, Sweetie is the evilist cat!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Personalized Middleware, whatever function we provide to it will be called on every route
app.use(function(req, res, next){
    //Whatever we put in res.locals is available in our templates
    //req.user will contain id and username of currently logged in user. Passport creates this
    res.locals.currentUser = req.user;
    next();
});

//=====================
//App Routes
//=====================
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
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW Route - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
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
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//=================================================
//Comments Routes
//=================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

//=======================
//Authentication Routes
//=======================

//Show register form
app.get("/register", function(req, res) {
    res.render("register");
});
//Handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show Login form
app.get("/login", function(req, res) {
    res.render('login');
});

//handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
    
});

//Logout Route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});