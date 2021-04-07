const express = require('express');
const { middlewareAuthorUser } = require('../auth/authorization');
const { Message } = require('../configs/message');
const router = express.Router();
const Customer = require('../models/Customer');
const Users = require('../models/Users');
const multer = require('multer')
const fs = require('fs')
const FileType = require('file-type')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/avatar')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1000000
  }
})

router.post('/upload', middlewareAuthorUser, upload.single('avatar'), async (req, res) => {
  try {
    const filepath = FileType.fromFile(req.file.path)
    if (!filepath) {
      fs.unlink(`${filepath}`, err => {
        if (err) throw new Error(err)
      })
      throw new Error()
    }
    if ((await filepath).ext !== 'jpg' || (await filepath).mime !== 'image/jpeg') {
      fs.unlink(`${filepath}`, err => {
        if (err) throw new Error(err)
      })
      throw new Error()
    }
    const _id = req.user._idCustomer
    await Customer.findByIdAndUpdate(_id, { avatar: `${process.env.BASE_BE}avatar/${req.file.filename}` })
    const customer = await Customer.findById(_id)
    if (customer) {
      res.status(200).send({
        customer: customer
      })
    } else {
      throw new Error()
    }
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

router.post('/', middlewareAuthorUser, async (req, res) => {
  try {
    if (req.body.id) {
      await Customer.findByIdAndUpdate(req.body.id, { ...req.body.customer })
      const customer = await Customer.findById(req.body.id)
      if (customer) {
        res.status(200).send({
          customer: customer
        })
      }
    } else {
      const customer = new Customer({ ...req.body.customer })
      customer.save()
        .then(async result => {
          res.status(200).send({
            customer: result
          })
          await Users.findByIdAndUpdate(req.user._id, { _idCustomer: result._id })
        }).catch(error => {
          throw new Error(error)
        })
    }
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

router.get('/', middlewareAuthorUser, async (req, res) => {
  try {
    const allCustomer = await Customer.find()
    return res.status(200).send({
      message: Message.THANH_CONG,
      data: allCustomer
    })
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

router.get('/:id', middlewareAuthorUser, async (req, res) => {
  try {
    const { id } = req.params
    const customer = await Customer.findById(id)
    res.status(200).send(customer)
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

module.exports = router