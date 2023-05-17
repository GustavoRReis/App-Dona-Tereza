const md5 = require('md5');
const { verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { users } = require('../database/models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const getAll = async () => {
  const result = await users.findAll();
  return result;
};

const login = async (login1) => {
  const { email, password } = login1;
  const md5Password = md5(password); 
  const user = await users.findOne({ where: { email, password: md5Password } });
  if (!user) { 
    return { status: 404, message: 'Not Found' };
  }
  
  const { name, role, id } = user.dataValues;
  const newUser = {
    id,
    name,
    email,
    role,
  };
  const secret = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'));
  const token = jwt.sign(newUser, secret, jwtConfig);
  return { status: 200, message: { ...newUser, token } };
};

const verificationToken2 = (token) => {
  const secret = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'));
  verify(token, secret); 
  return { status: 200, message: 'Ok' };
};

module.exports = {
  login,
  verificationToken2,
  getAll,
};
