const { sales } = require('../database/models');

const orders = async () => {
  const getOrders = await sales.findAll();
  return getOrders;
};

const findById = async (id) => {
  const result = await sales.findAll({ where: { userId: id } });
  return result;
};

module.exports = {
  orders,
  findById,
};
