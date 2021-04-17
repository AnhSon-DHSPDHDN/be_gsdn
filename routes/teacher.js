const express = require('express');
const { middlewareAuthorUser, middlewareAuthorAdmin } = require('../auth/authorization');
const { Message } = require('../configs/message');
const Customer = require('../models/Customer');
const router = express.Router();

router.delete('/', middlewareAuthorAdmin, async (req, res) => {
  try {
    const { ids } = req.body
    await Customer.updateMany({ _id: { $in: ids } }, {
      $set: {
        isTeacher: false
      }
    })
    res.status(200).send({
      message: Message.THANH_CONG
    })
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

router.get('/', middlewareAuthorUser, async (req, res) => {
  try {
    const allTeacher = await Customer.find({
      isTeacher: true,
      fullName: new RegExp(req.query.fullName, 'i')
    })
    return res.status(200).send({
      message: Message.THANH_CONG,
      data: allTeacher
    })
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

module.exports = router;