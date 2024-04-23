const express = require("express")
const UserController = require("../controllers/user.controller")
const router = express.Router()

router.get('/cart/:id', UserController.getCart)
router.put('/cart/:id', UserController.setUserCart)

router.get('/orders/:id', UserController.getOrders)
router.put('/orders/:id', UserController.setUserOrders)


module.exports = {
    userRouter: router
}