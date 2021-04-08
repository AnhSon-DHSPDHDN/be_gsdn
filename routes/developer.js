const express = require('express');
const { Message } = require('../configs/message');
const router = express.Router();
const Developer = require('../models/Developer')

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const developer = await Developer.findById(id);
    if (developer) {
      res.status(200).send({
        developer: developer
      })
    } else throw new Error()
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const allDeveloper = await Developer.find()
    return res.status(200).send({
      message: Message.THANH_CONG,
      data: allDeveloper
    })
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

module.exports = router;