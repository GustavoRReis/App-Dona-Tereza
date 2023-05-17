const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const secret = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'));

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const result = jwt.verify(token, secret);
    req.user = result;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};