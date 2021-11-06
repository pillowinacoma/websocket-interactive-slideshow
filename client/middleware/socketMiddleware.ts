import { io } from 'socket.io-client'
import { Middleware, Dispatch, AnyAction } from 'redux'
import { store } from '../store'
import { refreshSlides, setSlide } from '../slices/slideShowSlice'

const socket = io()

socket.on('action', (msg) => {
  console.log('ACTION', msg)
  switch (msg.type) {
    case 'setSlide':
      store.dispatch(setSlide(msg.value, false))
      break
    case 'slideData':
      store.dispatch(refreshSlides(msg.data))
      break
    default:
      console.log('socket middleware : message type is not listed')
      break
  }
})

export const actionMiddlleware: Middleware<Dispatch> =
  () => (next) => (action: AnyAction) => {
    if (action.meta) {
      if (action.type === 'slidesApp/removeSlide') {
        socket.emit('removeSlide', {
          type: 'removeSlide',
          value: action.payload
        })
      } else if (action.type === 'slidesApp/addSlide') {
        socket.emit('addSlide', {
          type: 'addSlide',
          value: action.payload
        })
      } else if (action.type === 'slidesApp/changeVisibilitySlide') {
        socket.emit('changeVisibilitySlide', {
          type: 'changeVisibilitySlide',
          value: action.payload
        })
      } else if (action.type === 'slidesApp/editSlide') {
        socket.emit('editSlide', {
          type: 'editSlide',
          value: action.payload
        })
      } else if (action.type === 'slidesApp/setSlide') {
        socket.emit('setSlide', {
          type: 'setSlide',
          value: action.payload
        })
      } else if (action.type === 'slidesApp/resetSlides') {
        socket.emit('resetSlides', {
          type: 'resetSlides',
          value: action.payload
        })
      }
    }
    return next(action)
  }
