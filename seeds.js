var mongoose = require("mongoose");
var Product = require("./models/product");

var data = [
      
      {
       name: "Pepsi",
       sellingPrice: 100,
       openingStock: 20
      },
      
      {
       name: "Cocacola",
       sellingPrice: 200,
       openingStock: 25
      }, 
      
      {
       name: "Pampers",
       sellingPrice: 400,
       openingStock: 40
      }
    
    ]

function seedDB(){
        //Remove All Products
        Product.deleteMany({}, function(err){
            if(err){
            console.log(err);
           } 
         
            console.log("removed products!")
            
            //Add a few products
            data.forEach(function(seed){
                Product.create(seed, function(err, product ){
                    if(err){
                        console.log(err);
                        
                    }else {
                     console.log("Added a product")
                    }
                })
            });
    });

};

module.exports = seedDB

 