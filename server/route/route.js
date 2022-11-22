const express = require('express')
const route = express.Router();
const productController = require('../controllers/roleController')

route.get('/products', productController.getAllProducts);
route.post('/post', productController.postProduct);
route.put('/put/role/:id', productController.updateProduct);
route.delete('/delete/role/:id_', productController.deleteProduct);

module.exports = route;