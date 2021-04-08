const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const DeveloperSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  avatar: {
    type: String,
    default: 'http://localhost:4000/avatar/non_avatar.png',
    require
  },
  fullName: {
    type: String,
    require
  },
  description: {
    type: String,
    require
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

module.exports = mongoose.model('Developer', DeveloperSchema)