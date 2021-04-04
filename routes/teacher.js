const express = require('express');
const { middlewareAuthorUser } = require('../auth/authorization');
const { Message } = require('../configs/message');
const Teacher = require('../models/Teacher');
const router = express.Router();

router.get('/', middlewareAuthorUser, async (req, res) => {
  try {
    const allTeacher = await Teacher.find()
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