const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  _idCustomer: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('Users', UserSchema)