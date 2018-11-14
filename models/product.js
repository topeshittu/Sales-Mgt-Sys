var mongoose = require("mongoose");

//SCHEMA SET UP
var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    openingStock:{
        type: Number,
        required: true
    }
});

module.exports  = mongoose.model("Product", ProductSchema);