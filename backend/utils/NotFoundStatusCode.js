const { NOT_FOUND_STATUS_CODE } = require('./errors');

class NotFoundStatusCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
  }
}

module.exports = NotFoundStatusCode;
