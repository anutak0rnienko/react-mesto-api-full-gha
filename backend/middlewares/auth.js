const jwt = require('jsonwebtoken');
const NotFoundStatusCode = require('../utils/NotFoundAuthStatus');

const authorization = (req, res, next) => {
  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    throw new NotFoundStatusCode('Необходимо авторизироваться');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new NotFoundStatusCode('Необходимо авторизироваться');
  }
  req.user = payload;
  next();
};

module.exports = authorization;
