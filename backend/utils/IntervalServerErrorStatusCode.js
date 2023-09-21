const { INTERVAL_SERVER_ERROR_STATUS_CODE } = require('./errors');

class IntervalServerErrorStatusCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERVAL_SERVER_ERROR_STATUS_CODE;
  }
}

module.exports = IntervalServerErrorStatusCode;
