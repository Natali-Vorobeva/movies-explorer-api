const BAD_REQUEST_ERROR_CODE = 400;

const centralHandlerErrors = ((err, req, res, next) => {
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

module.exports = centralHandlerErrors;
