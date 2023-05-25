const usersRouter = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { validateUserGet, validateUserUpdate } = require('../middlewares/celebrate');

usersRouter.get('/me', validateUserGet, getUserInfo);
usersRouter.patch('/me', validateUserUpdate, updateUser);

module.exports = usersRouter;
