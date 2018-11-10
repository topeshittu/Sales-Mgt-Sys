var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var middleware = require("../middleware");

//INDEX ROUTE Show all products
router.get("/", middleware.isLoggedIn, function(req, res){
    //Get all products from DB
    Product.find({}, function(err, allProducts){
       if(err){
           console.log(err);
       } else{
            res.render("products/index", {products: allProducts, page: "products"});
       }  
    });
});

//CREATE ROUTE Add new products to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   // get data from form and add to product array
  var name = req.body.name;
  var sellingPrice =req.body.sellingPrice;
  var openingStock = req.body.openingStock;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newProduct ={name: name, openingStock: openingStock, sellingPrice: sellingPrice, author: author}
 //Create a new product and save to DB
 Product.create(newProduct, function(err, newlyCreated){
    if(err){
        console.log(err);
    }else{
       //redirect back to products page
       console.log(newlyCreated);
       res.redirect("/products");
    }
 });
 
});

//NEW Show form to create product
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("products/new")
});

//SHOW -- Show more info about one product
router.get("/:id", function(req, res) {
    //Find the product with provided ID
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
       if(err || !foundProduct){
           req.flash("error", "Product not found");
           res.redirect("back");
       } else{
       console.log(foundProduct)    
      //render show template with that product
      res.render("products/show", {product: foundProduct});

       }
    });
       
});

//EDIT PRODUCT ROUTE
router.get("/:id/edit", middleware.checkProductOwnership, function(req, res) {
             Product.findById(req.params.id, function(err, foundProduct){
                 if(err){
                     req.flash("error", "That product doesn't exist");
                     res.redirect("back");
                 }
             res.render("products/edit", {product: foundProduct});
  });
        
});

//UPDATE PRODUCT ROUTE
router.put("/:id",middleware.checkProductOwnership, function(req, res){
    //find and update the correct caampground
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
        if(err){
            res.redirect("/products");
        } else {
            //redirect back to the show page of the product
            res.redirect("/products/" + req.params.id);
        }
    });
});

//DESTROY PRODUCT ROUTE
router.delete("/:id", middleware.checkProductOwnership, function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/products");
        }else{
            res.redirect("/products");
        }
    });
});


module.exports = router;

