var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    app                     = express();


// adding express-session in single line
//Needs 3 different options passed in to work with passport
app.use(require("express-session")({
    secret: "Sweetie is the evilist cat ever",
    resave: false,
    saveUninitialized: false 
}));
//Tell express to use passport
app.use(passport.initialize());
app.use(passport.session());
//Responsible for reading the session, taking the encoded data from the session and unencoding and then reencoding
//References the serializeUser() method in user.js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// creating a new local strategy using the user.authenticate that comes from user.js
passport.use(new LocalStrategy(User.authenticate()));

app.set("view engine", "ejs");
//need bodyParser anytime you're using a form and posting data to a reques
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/auth_demo_app");

//====================
//ROUTES
//====================
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//Auth Routes
//Show signup form
app.get("/register", function(req, res) {
    res.render("register");
});
//handling user sign up
app.post("/register", function(req, res){
    // User.register will take the new user with a username and hash the password and store it in the database
    //create password after user is created
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        //log the user in and store correct session info, will run the serialized user method
        //Saying that we are using the "local" strategy
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        })
    });
});

//Login Routes
//Render Login Form
app.get("/login", function(req, res) {
   res.render('login');
});
//Login Logic
//This is a middleware move - code that runs before final route callback
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});
//Logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
})