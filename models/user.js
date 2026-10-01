const mongoose = require('mongoose');
const { isValidUrl } = require('../utils/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: isValidUrl,
      message: 'URL invalida',
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
