const path = require('path')
const express = require('express')
const port = process.env.PORT || 4000

const app = express()

const DIST_DIR = path.join(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
  res.send(HTML_FILE)
})

app.listen(port, function () {
  console.log('App listening on port: ' + port)
})
