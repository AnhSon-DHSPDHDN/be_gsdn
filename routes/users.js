import { uuid } from 'uuidv4';
import { Message } from '../configs/message';
import { middlewareAuthorAdmin } from '../auth/authorization'

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Users = require('../models/Users');
const bcript = require('bcryptjs')

router.delete('/:_id', middlewareAuthorAdmin, async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await Users.findByIdAndDelete(_id);
    if (user) {
      return res.status(200).send(user)
    }
    throw new Error()
  } catch (error) {
    return res.status(403).send({
      message: Message.LOI_SERVER
    })
  }
})

router.get('/', middlewareAuthorAdmin, async (req, res) => {
  try {
    const allUser = await Users.find()
    return res.send(allUser)
  } catch (error) {
    return res.status(500).send({
      message: Message.LOI_SERVER
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const userFound = await Users.findOne({ username: req.body.username });
    if (userFound) {
      return res.status(200).send({
        message: Message.TAI_KHOAN_TON_TAI
      })
    } else {
      const users = new Users({
        _id: uuid(),
        username: req.body.username,
        password: await bcript.hash(req.body.password, 10),
        email: req.body.email,
        createBy: req.body.createBy
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
  } catch (error) {
    return res.status(500).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

module.exports = router;