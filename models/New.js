const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const NewSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  title: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  }
})

module.exports = mongoose.model('New', NewSchema)