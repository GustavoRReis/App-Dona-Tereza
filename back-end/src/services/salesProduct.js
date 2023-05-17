const { SaleProduct, sales, products } = require('../database/models');

const orders = async () => {
  const getOrders = await SaleProduct.findAll({
    include: [{ model: products }, { model: sales }],
  });
  return getOrders;
};

module.exports = {
  orders,
};
