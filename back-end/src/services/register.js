const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { users } = require('../database/models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const register = async (login) => {
  const { email, password, name } = login;
  const md5Password = md5(password);
  const user = await users.findOne({ where: { email, password: md5Password } });
  if (user) {
    return { status: 409, message: 'User já cadastrado' };
  }
  const result = await users.create({ email, password: md5Password, name });
  const { role, id } = result.dataValues;
  const newUser = {
    id,
    name,
    email,
    role,
  };
  const secret = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'));
  const token = jwt.sign(newUser, secret, jwtConfig);
  return { status: 201, message: { ...newUser, token } };
};

module.exports = {
  register,
};
