import { Badge, Button, Dropdown, DropdownItem } from '@windmill/react-ui'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { frameSlideIndex } from '../utils/slideId'
import { Link, useParams } from 'react-router-dom'
import { Slide } from '../type'

interface Props {
  slideData: Slide[]
}
interface ParamTypes {
  stringSlideId: string
}

const AppToolbar: React.FC<Props> = ({ slideData }) => {
  const LIMIT = slideData.length
  const { stringSlideId } = useParams<ParamTypes>()
  const [slideId, setSlideId] = useState(frameSlideIndex(stringSlideId, LIMIT))
  const [isDDOpen, setIsDDOpen] = useState(false)
  const [slides] = useState(slideData)
  const [thisSlide, setThisSlide] = useState(slides[slideId])

  const goNext = (n: number) => (n + 1 < LIMIT ? n + 1 : LIMIT - 1)
  const goPrevious = (n: number) => (n - 1 >= 0 ? n - 1 : 0)

  useEffect(() => {
    setSlideId(frameSlideIndex(stringSlideId, LIMIT))
  }, [stringSlideId])

  useEffect(() => {
    setThisSlide(slides[slideId])
  }, [slideId])

  const makeDropdownItems = (data: Slide[]) =>
    data.map((daton: Slide, idx: number) => (
      <DropdownItem
        tag="a"
        href={`#/${idx}`}
        className="justify-between"
        key={`${daton.title}-${idx}-DropdownItem`}
      >
        <span>{daton.title}</span>

        <Badge type="primary">{idx}</Badge>
      </DropdownItem>
    ))

  return (
    <div className="col-span-3 grid grid-cols-3 grid-rows-1 md:max-h-16 p-0 m-0">
      <div className="">
        <Link to={`/${goPrevious(slideId)}`}>
          <Button
            className=" h-full w-full rounded-t-sm rounded-b-sm dark:bg-cool-gray-800 "
            layout="outline"
            to={`/${goPrevious(slideId)}`}
          >
            {'<'}
          </Button>
        </Link>
      </div>
      <div className="">
        <Button
          className="h-full href-full w-full rounded-t-sm rounded-b-sm dark:bg-cool-gray-800"
          layout="outline"
          onClick={() => setIsDDOpen(!isDDOpen)}
          aria-haspopup="true"
        >
          {thisSlide.title}
        </Button>
        <Dropdown
          className="z-10 w-full "
          align="left"
          isOpen={isDDOpen}
          onClose={() => {}}
        >
          {makeDropdownItems(slides)}
        </Dropdown>
      </div>
      <div>
        <Link to={`/${goNext(slideId)}`}>
          <Button
            layout="outline"
            className="right w-full h-full rounded-t-sm rounded-b-sm dark:bg-cool-gray-800"
          >
            {'>'}
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default AppToolbar
