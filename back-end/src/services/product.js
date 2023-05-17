const { products } = require('../database/models');

const product = async () => {
  const getProduct = await products.findAll();
  return getProduct;
};

module.exports = {
  product,
};
