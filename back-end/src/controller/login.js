const { verify } = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Service = require('../services/login');

const login = async (req, res) => {
  const { status, message } = await Service.login(req.body);
  const { token } = message;
  if (!token) {
    return res.status(status).json(message);
  }
  const secret = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'));
  verify(token, secret); 
  req.headers.authorization = token;
  return res.status(status).json(message);
};

const getAll = async (_req, res) => {
  const result = await Service.getAll();
  return res.status(200).json(result);
};

module.exports = {
  login,
  getAll,
};
