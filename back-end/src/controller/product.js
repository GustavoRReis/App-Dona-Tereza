const Service = require('../services/product');

const product = async (req, res) => {
  const result = await Service.product();
  return res.status(200).json(result);
};

module.exports = {
  product,
};
