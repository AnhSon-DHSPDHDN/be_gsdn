const express = require('express')
const { middlewareAuthorAdmin } = require('../auth/authorization');
const { Message } = require('../configs/message');
const Customer = require('../models/Customer');
const Users = require('../models/Users');
const New = require('../models/New')
const router = express.Router()

router.get('/', middlewareAuthorAdmin, async (req, res) => {
  try {
    const numAccount = await Users.countDocuments()
    const numTeacher = await Customer.countDocuments({ isTeacher: true })
    const numCustomer = await Customer.countDocuments({ isTeacher: false })
    const numAllCustomer = await Customer.countDocuments()
    const numNews = await New.countDocuments()
    res.status(200).send([
      { column: 'Khách hàng', value: numAllCustomer },
      { column: 'Gia sư', value: numTeacher },
      { column: 'Khách', value: numCustomer },
      { column: 'Tài khoản', value: numAccount },
      { column: 'Tin tức', value: numNews }
    ])
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

module.exports = router