const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const RoleSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  name: {
    type: String,
    unique: true
  },
  createBy: {
    type: String,
    default: "admin"
  },
  createdAt: {
    type: Number,
    default: () => + new Date()
  }
})

module.exports = mongoose.model('Role', RoleSchema)