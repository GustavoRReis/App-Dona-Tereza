const { Router } = require('express');
const { loginController } = require('../controller');
const { registerController } = require('../controller');

const loginRouter = Router();

loginRouter.get('/login', loginController.getAll);
loginRouter.post('/login', loginController.login);
loginRouter.post('/register', registerController.register);

module.exports = loginRouter;
