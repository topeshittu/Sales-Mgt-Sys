var Product = require("../models/product");


//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkProductOwnership = function(req, res, next){
    //Is user logged in?
        if(req.isAuthenticated()){
             Product.findById(req.params.id, function(err, foundProduct){
               if(err || !foundProduct){
                   req.flash("error", "Product not found")
                   res.redirect("back");
               } else{
                   //does user own the product?
                   if(foundProduct.author.id.equals(req.user._id)){
                      next();
                   } else{
                       req.flash("error", "You don't have permission to do that")
                       res.redirect("back");
                   }
               }
            });
        
    }else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
    
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

 



module.exports = middlewareObj