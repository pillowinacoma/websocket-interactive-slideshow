import { Badge, Button, Dropdown, DropdownItem } from '@windmill/react-ui'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Slide } from '../type'

interface Props {
  slideData: Slide[]
}
interface ParamTypes {
  stringSlideId: string
}

const AppToolbar: React.FC<Props> = ({ slideData }) => {
  const { stringSlideId } = useParams<ParamTypes>()
  const [slideId, setSlideId] = useState(Number(stringSlideId ?? 0) ?? 0)
  const [isDDOpen, setIsDDOpen] = useState(false)
  const [slides] = useState(slideData)
  const [thisSlide, setThisSlide] = useState(slides[slideId])

  const LIMIT = slideData.length
  const goNext = (n: number) => (n + 1 < LIMIT ? n + 1 : LIMIT - 1)
  const goPrevious = (n: number) => (n - 1 >= 0 ? n - 1 : 0)

  useEffect(() => {
    setSlideId(Number(stringSlideId ?? 0) ?? 0)
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
    <div className="relative">
      <Link to={`/${goPrevious(slideId)}`}>
        <Button aria-label="Notifications">{'<'}</Button>
      </Link>
      <Button
        onClick={() => setIsDDOpen(!isDDOpen)}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        {thisSlide.title}
      </Button>
      <Link to={`/${goNext(slideId)}`}>
        <Button aria-label="Notifications">{'>'} </Button>
      </Link>
      <Dropdown align="left" isOpen={isDDOpen} onClose={() => {}}>
        {makeDropdownItems(slides)}
      </Dropdown>
    </div>
  )
}
export default AppToolbar
