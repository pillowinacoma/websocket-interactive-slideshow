import { io } from 'socket.io-client'
import { Middleware, Dispatch, AnyAction } from 'redux'
import { store } from '../store'
import {
  nextSlide,
  previousSlide,
  refreshSlides,
  setSlide
} from '../slices/slideShowSlice'

const socket = io()

socket.on('action', (msg) => {
  console.log('MESSAGE', msg)
  switch (msg.type) {
    case 'nextSlide':
      store.dispatch(nextSlide(null, false))
      break
    case 'previousSlide':
      store.dispatch(previousSlide(null, false))
      break
    case 'setSlide':
      store.dispatch(setSlide(msg.value, false))
      break
    case 'slideData':
      store.dispatch(refreshSlides(msg.data))
      console.log(msg)
      break
    default:
      console.log('socket middleware : message type is not listed')
      break
  }
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
