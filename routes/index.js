var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function(req, res){
    res.json("landing");
});



//register form route
router.get("/register", function(req, res) {
   res.json("register"); 
});

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({name: req.body.name, email: req.body.body.email, username: req.body.username, });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.json("register", {error: err.message});
        } else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success","Successfully Signed in, Welcome " + user.username);
                res.redirect("/products");
            });
        }
    });
});

//show login form
router.get("/login", function(req, res) {
   res.json("{login page}");
  }); 


//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/products",
        failureRedirect: "/login"
    }), function(req, res) {
        
});

//Logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "You logged out!");
   res.redirect("/products");
});



module.exports = router;