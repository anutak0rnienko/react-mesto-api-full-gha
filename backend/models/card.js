const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректно указан URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
