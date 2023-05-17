const { Router } = require('express');
const { salesProductsController } = require('../controller');

const salesProductsRouter = Router();

salesProductsRouter.get('/sales/product/', salesProductsController.orders);

module.exports = salesProductsRouter;
