import * as React from 'react'
import { FC } from 'react'
import { Slide } from '../type'
import SlideShow from './SlideShow'

interface Props {
  slides: Slide[]
  currentSlideId: number
}

const SocketHandler: FC<Props> = (props) => {
  return (
    <div className="dark:text-gray-50">
      <SlideShow {...props} />
    </div>
  )
}
export default SocketHandler
