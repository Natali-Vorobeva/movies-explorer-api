const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

require('mongoose-type-url');

const UnauthorizedError = require('../utils/errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')

    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль.'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
