const { NOT_FOUND_AUTH_STATUS } = require('./errors');

class NotFoundStatusCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_AUTH_STATUS;
  }
}

module.exports = NotFoundStatusCode;
