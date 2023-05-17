const express = require('express');
const cors = require('cors');
const loginRouter = require('../Routes/login');
const productRouter = require('../Routes/product');
const salesRouter = require('../Routes/sales');
const ordersRouter = require('../Routes/orders');
const salesProductsRouter = require('../Routes/salesProducts');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(express.json());
app.use(cors());
app.use(express.static('src'));
app.use('/', loginRouter);
app.use('/', productRouter);
app.use('/', salesRouter);
app.use('/', ordersRouter);
app.use('/', salesProductsRouter);

module.exports = app;
