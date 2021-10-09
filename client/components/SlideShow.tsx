import { Card, CardBody } from '@windmill/react-ui'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Slide } from '../type'
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
  const [slideId, setSlideId] = useState(Number(stringSlideId) ?? 0)
  const [slides] = useState(slideData)
  const [thisSlide, setThisSlide] = useState(slides[slideId])

  useEffect(() => {
    setSlideId(Number(stringSlideId) ?? 0)
  }, [stringSlideId])

  useEffect(() => {
    setThisSlide(slides[slideId])
  }, [slideId])

  return (
    <Card className="flex h-8 md:h-full">
      <img className="object-cover w-1/3" src={image} />
      <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
          {thisSlide.title}
        </p>
        <p className="text-gray-600 dark:text-gray-400">{thisSlide.text}</p>
      </CardBody>
    </Card>
  )
}
export default SlideShow
