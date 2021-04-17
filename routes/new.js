const express = require('express');
const { uuid } = require('uuidv4');
const { middlewareAuthorUser, middlewareAuthorAdmin } = require('../auth/authorization');
const { Message } = require('../configs/message');
const New = require('../models/New');
const router = express.Router();

router.post('/news', middlewareAuthorAdmin, async (req, res) => {
  try {
    const newDocument = req.body;
    const newReponse = new New({
      _id: uuid(),
      ...newDocument
    });
    return newReponse.save()
      .then(result => {
        res.status(200).send({
          message: Message.THANH_CONG,
          new: result
        })
      }).catch(err => {
        throw new Error(err)
      })
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

router.put('/:id', middlewareAuthorAdmin, async (req, res) => {
  try {
    const newUpdate = { ...req.body };
    const { id } = req.params
    await New.findByIdAndUpdate(id, { ...newUpdate })
    res.status(200).send({
      message: Message.THANH_CONG
    })
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
})

router.delete('/', middlewareAuthorAdmin, async (req, res) => {
  try {
    const { ids } = req.body
    console.log(ids);
    await New.deleteMany({ _id: { $in: ids } })
    res.status(200).send({
      message: Message.THANH_CONG
    })
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
    })
  }
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