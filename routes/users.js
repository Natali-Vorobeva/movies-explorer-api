const usersRouter = require('express').Router();
const { getUsers, getUser, updateUser } = require('../controllers/users');
const { validateUserGet, validateUserUpdate } = require('../middlewares/celebrate');

usersRouter.get('/', getUsers);
usersRouter.get('/me', validateUserGet, getUser);
usersRouter.patch('/me', validateUserUpdate, updateUser);

module.exports = usersRouter;
