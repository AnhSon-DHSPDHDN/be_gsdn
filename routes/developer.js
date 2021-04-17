const express = require('express');
const { Message } = require('../configs/message');
const router = express.Router();
const Developer = require('../models/Developer')
const multer = require('multer')
const fs = require('fs')
const FileType = require('file-type');
const { middlewareAuthorUser, middlewareAuthorAdmin } = require('../auth/authorization');

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const developer = await Developer.findById(id);
    const update = {
      fullName: req.body.fullName,
      description: req.body.description
    }
    if (req.body.avatar) {
      update["avatar"] = req.body.avatar
    }
    const updateDev = await Developer.findOneAndUpdate({ _id: id }, {
      $set: update
     })
    if (updateDev) {
      res.status(200).send({
        developer: updateDev
      })
    } else throw new Error()
  } catch (error) {
    res.status(403).send({
      message: Message.LOI_SERVER,
      error
    })
  }
})

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

router.post('/upload', middlewareAuthorAdmin, upload.single('avatar'), async (req, res) => {
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
    return res.json({
      imageLink: `${process.env.BASE_BE}avatar/${req.file.filename}`
    })
  } catch (error) {
    res.status(400).send({
      message: Message.LOI_SERVER,
      error: error
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