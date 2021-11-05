import { io } from 'socket.io-client'
import { Middleware, Dispatch, AnyAction } from 'redux'

const socket = io('http://localhost:3000')

socket.on('action', (msg) => {
  console.log('MESSAGE', msg)
})

export const actionMiddlleware: Middleware<Dispatch> =
  () => (next) => (action: AnyAction) => {
    if (action.meta) {
      if (action.type === 'slidesApp/nextSlide') {
        socket.emit('nextSlide', {
          type: 'nextSlide',
          value: action.payload
        })
      }

      if (action.type === 'slidesApp/previousSlide') {
        socket.emit('previousSlide', {
          type: 'previousSlide',
          value: action.payload
        })
      }

      if (action.type === 'slidesApp/setSlide') {
        socket.emit('setSlide', {
          type: 'setSlide',
          value: action.payload
        })
      }
    }
    return next(action)
  }
