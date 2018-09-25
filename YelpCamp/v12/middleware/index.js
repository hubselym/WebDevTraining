var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

// All Middleware Goes Here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does user own the campground? Can't Use === because different types
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    //otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not, redirect
        //back sends them back to the previous page they were on
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};


middlewareObj.checkCommentsOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does user own the comment? Can't Use === because different types
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    //otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not, redirect
        //back sends them back to the previous page they were on
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    //Middleware to make sure a user is logged in before proceeding
    if(req.isAuthenticated()){
        return next();
    }
    //if not logged, store the error in the flash for the next request
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};


module.exports = middlewareObj;