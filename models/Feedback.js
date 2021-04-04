const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const FeedbackSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Feedback', FeedbackSchema)