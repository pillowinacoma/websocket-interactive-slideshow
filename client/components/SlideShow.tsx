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
    <div className="p-10 flex justify-center w-screen  items-center">
      <div className={opacity}>
        <Card className="relative w-full">
          <div className="carousel bg-gray-300 dark:bg-gray-800">
            <div className="flex justify-center content-center">
              <img className="md:h-96 sm:h-auto" src={currentSlide.img} />
            </div>
            <CardBody className="w-full flex-shrink-0">
              <p className="mb-4 font-semibold text-cool-gray-600 dark:text-gray-300">
                {currentSlide.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {currentSlide.text}
              </p>
            </CardBody>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default SlideShow
