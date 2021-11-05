import * as React from 'react'
import { FC, useEffect } from 'react'
import * as io from 'socket.io-client'
import { Slide } from '../type'
import SlideShow from './SlideShow'
const ENDPOINT = 'http://localhost:3000'

interface Props {
  slides: Slide[]
  currentSlideId: number
}

const SocketHandler: FC<Props> = (props) => {
  // const { register, handleSubmit } = useForm()
  useEffect(() => {
    const socket = io.connect(ENDPOINT)
    socket.on('chat message', (data) => console.log(data))
  }, [])
  return (
    <div className="dark:text-gray-50">
      <SlideShow {...props} />
    </div>
  )
}
export default SocketHandler
