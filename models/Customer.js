const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const CustomerSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  avatar: {
    type: String,
    default: 'http://localhost:4000/avatar/non_avatar.png'
  },
  description: {
    type: String
  },
  fullName: {
    type: String
  },
  age: {
    type: Number
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  education: {
    type: String
  },
  phone: {
    type: String
  },
  experience: {
    type: String
  },
  subject: {
    type: Array
  },
  isTeacher: {
    type: Boolean
  },
  sex: {
    type: Boolean
  },
  salary: {
    type: Number
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

module.exports = mongoose.model('Customer', CustomerSchema)