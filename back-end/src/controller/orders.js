const Service = require('../services/orders');

const orders = async (_req, res) => {
  const result = await Service.orders();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await Service.findById(id);
  return res.status(200).json(result);
};

module.exports = {
  orders,
  findById,
};
