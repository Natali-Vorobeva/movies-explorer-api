const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const centralHandlerErrors = require('./utils/errors/centralHandlerErrors');
const allowedCors = require('./utils/constants');
const limiter = require('./utils/rateLimiter');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_DB_LINK } = process.env;

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: allowedCors,
}));

mongoose.connect(MONGO_DB_LINK);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(centralHandlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
