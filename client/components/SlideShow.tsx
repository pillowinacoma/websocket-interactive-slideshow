import { Card, CardBody } from '@windmill/react-ui'
import * as React from 'react'
import { Slide } from '../type'

interface Props {
  slides: Slide[]
  currentSlideId: number
}

const SlideShow: React.FC<Props> = ({ slides, currentSlideId }) => {
  const currentSlide = slides[currentSlideId]
  const opacity: string = !currentSlide.visible ? 'opacity-10' : 'opacity-100'

  return (
    <div
      className={`p-10 flex justify-center w-screen  items-center ${opacity}`}
    >
      <canvas className="stroke">
        <Card className="relative w-4/5">
          <div className="carousel bg-gray-300 dark:bg-gray-800">
            <p className="mb-4 font-semibold text-cool-gray-600 dark:text-gray-300 flex justify-center text-3xl">
              {currentSlide.title}
            </p>
            <div className="flex justify-center content-center">
              <img className="md:h-96 sm:h-auto" src={currentSlide.img} />
            </div>
            <CardBody className="w-full flex-shrink-0 flex flex-col">
              <p className="text-gray-600 dark:text-gray-400 flex justify-center">
                {currentSlide.text}
              </p>
            </CardBody>
          </div>
        </Card>
      </canvas>
    </div>
  )
}
export default SlideShow
