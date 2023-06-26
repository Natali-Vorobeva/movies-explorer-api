const { celebrate, Joi } = require('celebrate');
const { imgUrlRegExp } = require('../utils/imgUrlRegExp');

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
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
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

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
