const handleError = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.dir(err);
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = handleError;
