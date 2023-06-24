const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const BAD_REQUEST_ERROR_CODE = 400;

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Accept'],
}));

app.use(requestLogger);
app.use(helmet());
app.use(errorLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError ') {
    res.status(BAD_REQUEST_ERROR_CODE).send({ message: '400 — Переданы некорректные данные' });
    return;
  }
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка!!'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
