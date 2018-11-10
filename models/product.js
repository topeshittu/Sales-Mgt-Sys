var mongoose = require("mongoose");

//SCHEMA SET UP
var ProductSchema = new mongoose.Schema({
    name: String,
    sellingPrice: Number,
    openingStock: Number,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    
});

module.exports  = mongoose.model("Product", ProductSchema);