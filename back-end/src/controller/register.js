const Service = require('../services/register');

const register = async (req, res) => {
  const { status, message } = await Service.register(req.body);
  if (status === 400) return res.status(status).json({ message });

  return res.status(status).json(message);
};

module.exports = {
  register,
};
