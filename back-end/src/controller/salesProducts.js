const Service = require('../services/salesProduct');

const orders = async (_req, res) => {
  const result = await Service.orders();
  return res.status(200).json(result);
};

module.exports = {
  orders,
};
