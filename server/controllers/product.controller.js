const {Product} = require('../models/product.model')

const getAllProducts = (req, res) => {
    Product.find({})
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err))
};

const getOneProduct = (req, res) => {
    Product.findOne({_id: req.params.id})
        .then(product => {
            if(!product) {
                res.status(404).json({
                    message: "We're sorry, but we couldn't find the product you're looking for"
                })
            }else{
                res.json(product)
            }
        })
        .catch(err => res.status(500).json(err))
}

const getProductByCategory = (req, res) => {
    Product.find({category: req.params.category})
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err))
}

const getProductByName = (req, res) => {
    Product.findOne({name: req.params.name})
        .then(product => {
            if(!product) {
                res.status(404).json({
                    message: "We're sorry, but we couldn't find the product you're looking for"
                })
            }else{
                res.json(product)
            }
        })
        .catch(err => res.status(400).json(err))
}

const createProduct = (req, res) => {
    const {name, title, price, imgUrl, category, description} = req.body;
    Product.create({
        name,
        title,
        price,
        imgUrl,
        category,
        description
    })
        .then(newProduct => res.json(newProduct))
        .catch(err => res.status(400).json(err))
}

const updateProduct = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(400).json(err))
}

const deleteProduct = (req, res) => {
    Product.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    getAllProducts,
    getOneProduct,
    getProductByCategory,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
}