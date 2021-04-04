import jwt from 'jsonwebtoken';
import { middlewareAuth } from '../auth/authentication';
import { Message } from '../configs/message';

const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Customer = require('../models/Customer')
const bscript = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      username
    });

    if (!user || !bscript.compareSync(password, user.password)) return res.status(200).json({
      message: Message.TAI_KHOAN_OR_MK_SAI
    });

    const token = await jwt.sign({ userID: user._id }, process.env.SECRET_KEY, { expiresIn: '15d' })

    return res.status(200).send({
      message: Message.DANG_NHAP_THANH_CONG,
      access_token: token
    })
  } catch (error) {
    res.status(500).send({
      message: Message.LOI_SERVER
    })
  }
})

router.get('/me', middlewareAuth, async (req, res) => {
  try {
    let { user } = req;
    if (user._idCustomer) {
      const customer = await Customer.findById(user._idCustomer)
      const { avatar } = customer
      user = { avatar, ...user }
    } else {
      const avatar = `${process.env.BASE_BE}avatar/non_avatar.png`
      user = { avatar, ...user }
    }
    return res.status(200).send(user)
  } catch (error) {
    res.status(500).send({
      message: Message.LOI_SERVER
    })
  }
})

module.exports = router