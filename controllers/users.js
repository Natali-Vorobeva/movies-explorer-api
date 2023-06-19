const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const BadRequestError = require('../utils/errors/bad-request');
const ConflictError = require('../utils/errors/conflictError');
const NotFoundError = require('../utils/errors/not-found');

const createUsers = (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(req.body);

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с такой почтой уже зарегистрирован.'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные для создания пользователя.'));
          } else {
            next(err);
          }
        })
        .catch(next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'where_are_we_going',
          { expiresIn: '7d' },
        ),
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Не найдено'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Не найдено.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Не найдено.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUsers,
  login,
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
};
