import jwt from 'jsonwebtoken';
import { middlewareAuth } from '../auth/authentication';
import { Message } from '../configs/message';

const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bscript = require('bcryptjs');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({
    username
  });

  if (!user || !bscript.compareSync(password, user.password)) return res.status(403).json({
    message: Message.TAI_KHOAN_OR_MK_SAI
  });

  const token = await jwt.sign({ userID: user._id }, process.env.SECRET_KEY, { expiresIn: '15d' })

  return res.status(200).send({
    access_token: token
  })
})

router.get('/me', middlewareAuth, async (req, res) => {
  return res.status(200).send(req.user)
})

module.exports = router