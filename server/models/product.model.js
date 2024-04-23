const mongoose = require('mongoose')

const ProductSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The product needs a title"]
    },
    title: {
        type: String,
        required: [true, "The product needs a title"]
    },
    price: {
        type: Number,
        required: [true, "The product needs a price"],
    },
    imgUrl: {
        type: String,
        required: [true, "The product needs a image"]
    },
    category: {
        type: String,
        required: [true, "The product needs a category"]
    },
    description: {
        type: String,
        required: [true, "The product needs a description"]
    }
}, {timestamps: true})

module.exports.Product = mongoose.model('Product', ProductSchema)