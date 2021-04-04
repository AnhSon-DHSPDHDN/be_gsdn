const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const TeacherSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  avatar: {
    type: String
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

module.exports = mongoose.model('Teacher', TeacherSchema)