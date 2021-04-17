const express = require('express');
const { middlewareAuthorUser, middlewareAuthorAdmin } = require('../auth/authorization');
const { Message } = require('../configs/message');
const New = require('../models/New');
const router = express.Router();

router.delete('/:id', middlewareAuthorAdmin, async (req, res) => {
  const { id } = req.params
  console.log(id);
  res.send('hihi')
})

router.get('/', middlewareAuthorUser, async (req, res) => {
  try {
    const allNews = await New.find()
    if (allNews) {
      res.status(200).send({
        allNews: allNews
      })
    } else throw new Error()
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

module.exports = router