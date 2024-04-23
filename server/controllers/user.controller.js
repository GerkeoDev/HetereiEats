const {User} = require("../models/user.model")
const mongoose = require("mongoose")

const getCart = (req, res) => {
    User.findOne({_id: req.params.id})
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user.cart)
        })
        .catch(err => res.status(400).json(err))
}

const getOrders = (req, res) => {
    User.findOne({_id: req.params.id})
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user.orders)
        })
        .catch(err => res.status(400).json(err))
}

const setUserCart = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {cart: req.body}, {new: true})
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user.cart)
        })
        .catch(err => res.status(400).json(err))
}

const setUserOrders = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {orders: req.body}, {new: true})
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user.orders)
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    getCart,
    getOrders,
    setUserCart,
    setUserOrders
}