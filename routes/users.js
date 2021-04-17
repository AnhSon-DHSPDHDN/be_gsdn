import { uuid } from 'uuidv4';
import { Message } from '../configs/message';
import { middlewareAuthorAdmin } from '../auth/authorization'

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Users = require('../models/Users');
const bcript = require('bcryptjs')

router.delete('/', middlewareAuthorAdmin, async (req, res) => {
  try {
    const { ids } = req.body;
    const user = await Users.deleteMany({ _id: { $in: ids } });
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
    const allUser = await Users.find({ username: { $ne: "admin" } })
    allUser.map(u => {
      u.toObject();
      delete u.password
    })
    return res.send(allUser)
  } catch (error) {
    return res.status(500).send({
      message: Message.LOI_SERVER
    })
  }
})


router.put('/:id', middlewareAuthorAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const userEdit = await Users.findById(id);
    if (!userEdit) return res.status(404).send({
      message: Message.TAI_KHOAN_KHONG_TON_TAI
    })
    const userFound = await Users.findOne({ username: req.body.username, _id: { $ne: id } });
    if (userFound) {
      return res.status(402).send({
        message: Message.TAI_KHOAN_TON_TAI
      })
    } else {
      const update = {
        username: req.body.username,
        email: req.body.email,
        _idRole: req.body._idRole,
      }
      if (req.body.password) {
        update["password"] = await bcript.hash(req.body.password, 10)
      }
      const user = await Users.findOneAndUpdate({ _id: id }, {
        $set: update
      });
      return res.status(200).send({
        message: Message.CAP_NHAT_THANH_CONG,
        user: user
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

router.post('/create', middlewareAuthorAdmin, async (req, res) => {
  try {
    const userFound = await Users.findOne({ username: req.body.username });
    if (userFound) {
      return res.status(402).send({
        message: Message.TAI_KHOAN_TON_TAI
      })
    } else {
      const users = new Users({
        _id: uuid(),
        username: req.body.username,
        password: await bcript.hash(req.body.password, 10),
        email: req.body.email,
        _idRole: req.body._idRole,
        createBy: req.user.createBy
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

router.post('/', async (req, res) => {
  try {
    const userFound = await Users.findOne({ username: req.body.username });
    if (userFound) {
      return res.status(402).send({
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