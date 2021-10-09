import * as React from 'react'
import { Slide } from '../type'

interface Props {
  slides: Slide[]
}
const AppToolbar: React.FC<Props> = (slides: Props) => {
  console.log(slides)

  return <div></div>
}
export default AppToolbar
