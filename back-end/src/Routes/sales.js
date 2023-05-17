const { Router } = require('express');
const { validateToken } = require('../auth/ValidateToken');
const { salesController } = require('../controller');

const salesRouter = Router();

salesRouter.post('/customer/sales', validateToken, salesController.newSale);
salesRouter.get('/sellers', salesController.sellers);
salesRouter.get('/seller/orders', salesController.getAll);
salesRouter.put('/seller/orders/:id', salesController.mudaStatus);

module.exports = salesRouter;
