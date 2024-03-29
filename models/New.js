const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const NewSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  title: {
    type: String,
    require
  },
  image: {
    type: String,
    require
  },
  description: {
    type: String,
    require
  },
  link: {
    type: String,
    require
  },
  createBy: {
    type: String,
    default: 'admin'
  },
  createdAt: {
    type: Number,
    default: () => + new Date()
  }
})

module.exports = mongoose.model('New', NewSchema)