const express = require("express")
const LoginController = require("../controllers/login.controller")
const router = express.Router()

router.post('/register/', LoginController.register)
router.post('/login/', LoginController.login)
router.post('/refresh/', LoginController.refresh)
router.post('/logout/', LoginController.logout)

module.exports = {
    oAuthRouter: router
}