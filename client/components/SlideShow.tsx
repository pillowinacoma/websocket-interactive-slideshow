import { Button, Card, CardBody } from '@windmill/react-ui'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { resetDrawPoints } from '../slices/slideShowSlice'
import { AppDispatch } from '../store'
import { Slide } from '../type'
import Canvas from './Canvas'

interface Props {
  slides: Slide[]
  currentSlideId: number
  drawing: {
    clickX: number[]
    clickY: number[]
    clickDrag: boolean[]
  }
}

const SlideShow: React.FC<Props> = ({ slides, currentSlideId, drawing }) => {
  const currentSlide = slides[currentSlideId]
  const opacity: string = !currentSlide.visible ? 'opacity-10' : 'opacity-100'
  const dispatch = useDispatch<AppDispatch>()

  return (
    <>
      <div>
        <Button
          layout="outline"
          className="w-full h-auto"
          onClick={() => dispatch(resetDrawPoints())}
        >
          Effacer
        </Button>
        <Button
          layout="outline"
          className="w-full h-auto"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else {
              document.documentElement.requestFullscreen()
            }
          }}
        >
          Plein Ecran
        </Button>
      </div>
      <div
        className={`p-10 flex justify-center w-screen  items-center ${opacity}`}
      >
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
        <Canvas drawing={drawing} />
      </div>
    </>
  )
}
export default SlideShow
