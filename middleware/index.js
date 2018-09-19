var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
    // is user logged in
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if (err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            //does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } 
            //otherwise, redirect
            else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        }
    });
    // if not, redirect
    } else {
       req.flash("error", "You must log in first!");
       res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership =  function checkCommentOwnership(req, res, next){
    // is user logged in
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err || !foundComment){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            //does user own the comment?
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } 
            //otherwise, redirect
            else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        }
    });
    // if not, redirect
    } else {
       req.flash("error", "You must log in first!");
       res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must log in first!");
    res.redirect("/login");
}

module.exports = middlewareObj;