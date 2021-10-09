import { Card, CardBody } from '@windmill/react-ui'
import * as React from 'react'
import { Slide } from '../type'
import { useParams } from 'react-router-dom'

interface Props {
  slides: Slide[]
}
const SlideShow: React.FC<Props> = (slides: Props) => {
  const pm = useParams<string>()
  console.log(pm)

  return (
    <Card colored className="bg-purple-600">
      <CardBody>hello</CardBody>
    </Card>
  )
}
export default SlideShow
