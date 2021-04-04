const express = require('express');
const { uuid } = require('uuidv4');
const { middlewareAuthorAdmin, middlewareAuthorUser } = require('../auth/authorization');
const { Message } = require('../configs/message');
const Feedback = require('../models/Feedback');
const router = express.Router();

router.get('/', middlewareAuthorAdmin, async (req, res) => {
  try {
    const allFeedBack = await Feedback.find()
    return res.send(allFeedBack)
  } catch (error) {
    return res.send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (name && email && message) {
      const feedBack = new Feedback({
        _id: uuid(),
        name,
        email,
        message
      })
      feedBack.save()
      return res.send({
        message: Message.GUI_FEED_BACK_THANH_CONG,
        feedBack
      })
    } else {
      return res.send({
        message: Message.THIEU_THONG_TIN_FEED_BACK
      })
    }
  } catch (error) {
    return res.send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

module.exports = router