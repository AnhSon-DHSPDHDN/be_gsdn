const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  username: {
    type: String,
    required: true,
    unique: true
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
  },
  _idRole: {
    type: String,
    default: "user"
  },
  createBy: {
    type: String,
    default: null
  },
  createdAt: {
    type: Number,
    default: () => + new Date()
  }
})

module.exports = mongoose.model('Users', UserSchema)