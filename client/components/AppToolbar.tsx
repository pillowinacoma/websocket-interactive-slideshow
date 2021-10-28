import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import {
  changeVisibilitySlide,
  nextSlide,
  previousSlide
} from '../slices/slideShowSlice'

import { Badge, Button, Dropdown, DropdownItem } from '@windmill/react-ui'
import * as React from 'react'
import { useState } from 'react'
import { Slide } from '../type'
import AjouterModal from './AjouterModal'

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
  const [slides] = useState(slideData)
  const [currentSlide] = useState(slides[currentSlideId])

  const goNext = () => dispatch(nextSlide())

  const goPrevious = () => dispatch(previousSlide())

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
            {currentSlide.title}
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
          className="flex justify-center p-0 m-0 w-full h-full "
        >
          ...
          <Dropdown
            className="z-10 w-full "
            align="left"
            isOpen={isOptionsOpen}
            onClose={() => {}}
          >
            <DropdownItem>Accueil</DropdownItem>
            <DropdownItem
              onClick={() => {
                dispatch(changeVisibilitySlide(currentSlideId))
              }}
            >
              Cacher
            </DropdownItem>
            <DropdownItem onClick={() => setIsEditModalOpen(true)}>
              Modifier
            </DropdownItem>
            <DropdownItem onClick={() => setIsAddModalOpen(true)}>
              Ajouter
            </DropdownItem>
          </Dropdown>
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
