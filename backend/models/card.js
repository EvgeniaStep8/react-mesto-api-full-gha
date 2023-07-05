const mongoose = require('mongoose');

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
      validator(link) {
        // eslint-disable-next-line no-useless-escape
        return /https*:\/\/(www.)*[a-z0-9\-\.]{1,}\.[a-z]{2,3}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]*/.test(link);
      },
      message: 'Введите ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
});

module.exports = mongoose.model('card', cardSchema);
