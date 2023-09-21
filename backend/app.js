const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/router');
const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('БД подключена');
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log('Не удалось подключиться к БД');
  });

app.use(bodyParser.json());

app.use(routes);
app.use(cookieParser());
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application is running on port ${PORT}`);
});
