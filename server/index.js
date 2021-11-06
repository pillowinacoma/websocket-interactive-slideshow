const path = require('path')
const express = require('express')
const port = process.env.PORT || 4000
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
let { data, makeSlides } = require('./data')

const DIST_DIR = path.join(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
  res.send(HTML_FILE)
})

io.on('connection', (socket) => {
  console.log(`START\t${socket.id}`)
  io.to(socket.id).emit('action', { type: 'slideData', data: data })

  socket.on('setSlide', (msg) => {
    socket.broadcast.emit('action', msg)
  })

  socket.on('removeSlide', (msg) => {
    if (data.length > 0 && (msg?.value || msg.value === 0) && data[msg.value]) {
      data = data.filter((val, idx) => idx !== msg.value)
      if (msg.value > data.length - 1) {
        socket.broadcast.emit('action', {
          type: 'setSlide',
          value: data.length - 1
        })
      }
      if (msg.value < 0) {
        socket.broadcast.emit('action', {
          type: 'setSlide',
          value: 0
        })
      }
      socket.broadcast.emit('action', { type: 'slideData', data: data })
    }
  })
  socket.on('addSlide', (msg) => {
    data.push(msg.value)
    socket.broadcast.emit('action', { type: 'slideData', data: data })
  })
  socket.on('changeVisibilitySlide', (msg) => {
    data[msg.value].visible = !data[msg.value].visible
    socket.broadcast.emit('action', { type: 'slideData', data: data })
  })
  socket.on('editSlide', (msg) => {
    const editID = msg.value.id
    const editedSlide = msg.value.slide
    data[editID] = editedSlide
    socket.broadcast.emit('action', { type: 'slideData', data: data })
  })

  socket.on('resetSlides', (msg) => {
    makeSlides(data)
    io.to(socket.id).emit('action', { type: 'slideData', data: data })
    socket.broadcast.emit('action', { type: 'slideData', data: data })
  })

  socket.on('disconnect', () => {
    console.log(`END\t${socket.id}`)
  })
})

server.listen(port, function () {
  console.log('App listening on port: ' + port)
})
