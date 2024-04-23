const mongoose = require('mongoose')

const CartSchema =  new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: [true, "The cart needs an id"]
    },
    quantity: {
        type: Number,
        required: [true, "The cart needs a quantity"]
    },
    price: {
        type: Number,
        required: [true, "The cart needs a price"]
    }
}, {timestamps: true})

const OrdersSchema =  new mongoose.Schema({
    products: {
        type: Array,
        required: [true, "The product needs products"]
    },
    address: {
        type: Object,
        required: [true, "The product needs an address"]
    },
    total: {
        type: Number,
        required: [true, "The product needs a total"]
    },
    status: {
        type: String,
        default: "Pending"
    }
}, {timestamps: true})

const UserSchema =  new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "The user needs an user name"],
        minlength: [3, "The user name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "The user needs an email"],
    },
    password: {
        type: String,
        required: [true, "The user needs a password"],
    },
    cart: {
        type: [CartSchema],
        default: []
    },
    orders: {
       type: [OrdersSchema],
       default: []
    }
}, {timestamps: true})

module.exports.User = mongoose.model('User', UserSchema)