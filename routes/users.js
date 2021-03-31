import { Message } from '../configs/message'

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Users = require('../models/Users');
const bcript = require('bcryptjs')

router.get('/', async (req, res) => {
  res.send('all User')
})

const middleware = (req, res, next) => {
  const token = req.headers['access-token'];
  console.log(token);
  next()
}

router.post('/', middleware, async (req, res) => {
  const userFound = await Users.findOne({ username: req.body.username });
  if (userFound) {
    return res.status(200).send({
      message: Message.TAI_KHOAN_TON_TAI
    })
  } else {
    const users = new Users({
      _id: new mongoose.Types.ObjectId,
      username: req.body.username,
      password: await bcript.hash(req.body.password, 10),
      email: req.body.email
    })
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