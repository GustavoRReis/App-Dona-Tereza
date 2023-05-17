const { Router } = require('express');
const { productController } = require('../controller');

const productRouter = Router();

productRouter.get('/customer/products', productController.product);

module.exports = productRouter;
