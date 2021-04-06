const express = require('express');
const { middlewareAuthorUser } = require('../auth/authorization');
const { Message } = require('../configs/message');
const router = express.Router();
const Customer = require('../models/Customer');
const Users = require('../models/Users');
const multer = require('multer')

const upload = multer({
  dest: './images/avatar'
})

router.post('/upload', upload.single('avatar'), async (req, res) => {
  console.log(req.file);
  res.send('hihi')
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