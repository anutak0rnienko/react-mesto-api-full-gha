const { config } = require('dotenv');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

const { AUTH_KEY = 'dev-secret' } = process.env;

const urlRegexPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  AUTH_KEY,
  urlRegexPattern,
  NODE_ENV,
};
