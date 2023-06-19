const mongoose = require('mongoose');

require('mongoose-type-url');

const { imgUrlRegExp } = require('../utils/imgUrlRegExp');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => imgUrlRegExp.test(image),
      message: 'Неверный URL-адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (trailerLink) => imgUrlRegExp.test(trailerLink),
      message: 'Неверный URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => imgUrlRegExp.test(thumbnail),
      message: 'Неверный URL-адрес',
    },
  },
  owner: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
