//App Setup
var express     = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//Attaching Routes    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");
    

//connecting and creating the yelpCamp database
mongoose.connect("mongodb://localhost/yelp_camp_v10");
//common declaraiton to get body-parser to work
app.use(bodyParser.urlencoded({extended: true}));
//setting express to assume all files in the view folder will be .ejs
app.set("view engine", "ejs");
//Getting the css extrasheet connected
app.use(express.static(__dirname + "/public"));

//Temporary Seed Data
// seedDB();

app.use(methodOverride("_method"));

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

//Tell App.js to use our external route files required above
//Clean up route declarations by putting common parts as arguments
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});