const sales = require('../services/sales');

const newSale = async (req, res) => {
  const { body, user: { id } } = req;

  const { status, message } = await sales.newSale({ ...body }, id);

  if (status === 400) return res.status(status).json({ message });

  return res.status(status).json(message);
};

const sellers = async (req, res) => {
  const result = await sales.sellers();
  return res.status(200).json(result);
};

const getAll = async (req, res) => {
  const result = await sales.getAll();
  return res.status(200).json(result);
};

const mudaStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const result = await sales.mudaStatus(id, status);
  return res.status(201).json(result);
};

module.exports = {
    newSale,
    sellers,
    getAll,
    mudaStatus,
};
