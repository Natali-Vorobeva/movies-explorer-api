const { celebrate, Joi } = require('celebrate');
const { imgUrlRegExp } = require('../utils/imgUrlRegExp');

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserGet = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
});

// ! ПОСМОТРЕТЬ PARAMS (СКОЛЬКО СИМВОЛОВ)
const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24),
  }),
});

const validateMoviesPost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(imgUrlRegExp),
    trailerLink: Joi.string().required().pattern(imgUrlRegExp),
    thumbnail: Joi.string().required().pattern(imgUrlRegExp),
    owner: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateUserCreate,
  validateUserLogin,
  validateUserGet,
  // validateUserId,
  validateUserUpdate,
  validateMoviesPost,
  validateMovieId,
};