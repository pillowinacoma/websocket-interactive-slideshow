import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import {
  changeVisibilitySlide,
  nextSlide,
  previousSlide,
  removeSlide,
  setSlide
} from '../slices/slideShowSlice'

import { Badge, Button, Dropdown, DropdownItem } from '@windmill/react-ui'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Slide } from '../type'
import AjouterModal from './AjouterModal'
import {
  EditIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  MinusIcon
} from '../utils/Icons'

interface Props {
  slideData: Slide[]
  currentSlideId: number
}

const AppToolbar: React.FC<Props> = ({ slideData, currentSlideId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isDDOpen, setIsDDOpen] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(slideData[currentSlideId])

  useEffect(() => {
    setCurrentSlide(slideData[currentSlideId])
  }, [currentSlideId, slideData[currentSlideId]])

  const goNext = () => dispatch(nextSlide())

  const goPrevious = () => dispatch(previousSlide())

  const makeDropdownItems = (data: Slide[]) =>
    data.map((daton: Slide, idx: number) => (
      <DropdownItem
        tag="a"
        onClick={() => dispatch(setSlide(idx, true))}
        className={`justify-between ${
          idx === currentSlideId && 'dark:bg-green-700 bg-orange-500'
        }`}
        key={`${daton.title}-${idx}-DropdownItem`}
      >
        <span>{daton.title}</span>

        <Badge type="primary">{idx}</Badge>
      </DropdownItem>
    ))

  return (
    <>
      <div className="col-span-3 grid grid-cols-3 grid-rows-1 md:max-h-16 p-0 m-0">
        <div className="">
          <Button
            onClick={() => goPrevious()}
            className=" h-full w-full rounded-t-sm rounded-b-sm dark:bg-cool-gray-800 "
            layout="outline"
          >
            {'<'}
          </Button>
        </div>
        <div className="">
          <Button
            className="h-full href-full w-full rounded-t-sm rounded-b-sm dark:bg-cool-gray-800"
            layout="outline"
            onClick={() => setIsDDOpen(!isDDOpen)}
            aria-haspopup="true"
          >
            {currentSlideId}
          </Button>
          <Dropdown
            className="z-10 w-full "
            align="left"
            isOpen={isDDOpen}
            onClose={() => {}}
          >
            {makeDropdownItems(slideData)}
          </Dropdown>
        </div>
        <div>
          <Button
            onClick={() => goNext()}
            layout="outline"
            className="right w-full h-full rounded-t-sm rounded-b-sm dark:bg-cool-gray-800"
          >
            {'>'}
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-baseline col-span-3 md:max-h-10 p-0 dark:text-cool-gray-50">
        <div
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className="flex justify-evenly p-0 m-0 w-full h-full "
        >
          <Button
            layout="link"
            icon={currentSlide.visible ? EyeOffIcon : EyeIcon}
            onClick={() => {
              dispatch(changeVisibilitySlide(currentSlideId, true))
            }}
          ></Button>
          <Button
            layout="link"
            icon={EditIcon}
            onClick={() => setIsEditModalOpen(true)}
          ></Button>
          <Button
            icon={MinusIcon}
            layout="link"
            onClick={() => dispatch(removeSlide(currentSlideId, true))}
          ></Button>
          <Button
            icon={PlusIcon}
            layout="link"
            onClick={() => setIsAddModalOpen(true)}
          ></Button>
        </div>
      </div>
      {isAddModalOpen && (
        <AjouterModal closeModal={() => setIsAddModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <AjouterModal
          closeModal={() => setIsEditModalOpen(false)}
          initData={currentSlide}
          slideId={currentSlideId}
        />
      )}
    </>
  )
}

export default AppToolbar
