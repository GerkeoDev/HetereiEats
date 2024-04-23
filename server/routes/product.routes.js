const express = require("express")
const ProductController = require("../controllers/product.controller")
const router = express.Router()

router.post('/product/', ProductController.createProduct)
router.get('/products/', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getOneProduct)
router.get('/products/category/:category', ProductController.getProductByCategory)
router.get('/product/name/:name', ProductController.getProductByName)
router.put('/product/:id', ProductController.updateProduct)
router.delete('/product/:id', ProductController.deleteProduct)

module.exports = {
    productRouter: router
}