const express = require("express")
const PaymentController = require("../controllers/payment.controller") 
const router = express.Router()

router.post('/payment', PaymentController.processPayment) 

module.exports = {
    paymentRouter: router
}
