const { Router } = require('express');
const { ordersController } = require('../controller');

const ordersRouter = Router();

/* ordersRouter.get('/customer/orders', ordersController.orders); */
ordersRouter.get('/customer/orders/:id', ordersController.findById);

module.exports = ordersRouter;
