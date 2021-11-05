const express = require('express')
const router = express.Router()
const data = require('./data')

const stateGet = (_, res) => {
  res.status(201).send(data)
}

router.get('/get', stateGet)
module.exports = router
