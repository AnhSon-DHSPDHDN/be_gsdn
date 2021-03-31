import { Message } from '../configs/message'

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Users = require('../models/Users');
const bscript = require('bcryptjs')

router.get('/', async (req, res) => {
  res.send('users')
})

router.post('/', async (req, res) => {
  const salt = bscript.genSaltSync(10);

  const users = new Users({
    _id: new mongoose.Types.ObjectId,
    username: req.body.username,
    password: bscript.hashSync(req.body.password, salt),
    email: req.body.email
  })
  const allUser = await Users.find();
  const foundUser = allUser.find(user => user.username === req.body.username)
  if (foundUser) {
    return res.status(200).send({
      message: Message.TAI_KHOAN_TON_TAI
    })
  } else {
    return users
      .save()
      .then(result => {
        res.status(200).send({
          message: Message.DANG_KY_THANH_CONG,
          user: result
        })
      }).catch(error => {
        res.status(500).send({
          message: Message.LOI_SERVER,
          error: error
        })
      })
  }
})

module.exports = router;