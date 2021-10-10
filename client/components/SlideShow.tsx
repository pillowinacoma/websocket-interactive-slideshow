import { Card, CardBody } from '@windmill/react-ui'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Slide } from '../type'
import { frameSlideIndex } from '../utils/slideId'
import image from '../img/simple.jpg'
import { useParams } from 'react-router-dom'

interface Props {
  slideData: Slide[]
}
interface ParamTypes {
  stringSlideId: string
}

const SlideShow: React.FC<Props> = ({ slideData }) => {
  const { stringSlideId } = useParams<ParamTypes>()
  const LIMIT = slideData.length
  const [slideId, setSlideId] = useState(
    frameSlideIndex(Number(stringSlideId), LIMIT)
  )
  const [slides] = useState(slideData)
  const [thisSlide, setThisSlide] = useState(slides[slideId])

  useEffect(() => {
    setSlideId(frameSlideIndex(stringSlideId, LIMIT))
    console.log(slideId)
  }, [stringSlideId])

  useEffect(() => {
    setThisSlide(slides[slideId])
  }, [slideId])

  return (
    <div className="p-10 flex justify-center w-screen  items-center">
      <Card className="relative w-full">
        <div className="carousel bg-gray-300 dark:bg-gray-800">
          <div className="flex justify-center content-center">
            <img className="w-1/2 " src={image} />
          </div>
          <CardBody className="w-full flex-shrink-0">
            <p className="mb-4 font-semibold text-cool-gray-600 dark:text-gray-300">
              {thisSlide.title}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{thisSlide.text}</p>
          </CardBody>
        </div>
      </Card>
    </div>
  )
}
export default SlideShow
