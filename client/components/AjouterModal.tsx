import { FC } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@windmill/react-ui'
import { Slide } from '../type'
import { AppDispatch } from '../store'
import { useDispatch } from 'react-redux'
import { addSlide, editSlide, SingleSlideState } from '../slices/slideShowSlice'

interface AjoutModalProps {
  closeModal: () => void
  initData?: Slide
  slideId?: number
}

const AjouterModal: FC<AjoutModalProps> = ({
  closeModal,
  initData,
  slideId
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Slide>()

  return (
    <Modal isOpen={true} onClose={() => closeModal()}>
      <ModalHeader>Créer un Slide</ModalHeader>
      <ModalBody>
        <Input
          {...register('type', { value: initData?.type })}
          type="text"
          placeholder="Type"
          className="m-2"
        />
        <Label>
          <Input
            {...register('title', {
              value: initData?.title,
              required: 'ce champ est obligatoir mon khey'
            })}
            type="text"
            placeholder="Title"
            className="m-2"
          />
          <HelperText valid={false}>
            {errors.title && errors.title.message}
          </HelperText>
        </Label>
        <Label>
          <Textarea
            {...register('text', {
              value: initData?.text,
              required: 'met un peu de text stp'
            })}
            type="text"
            placeholder="Text"
            className="m-2"
          />
          <HelperText valid={false}>
            {errors.text && errors.text.message}
          </HelperText>
        </Label>
        <Input
          {...register('visible', { value: initData?.visible ?? true })}
          type="checkbox"
          className="m-2"
        />
        <span className="ml-2">Visible ?</span>
        <Label>
          <Input
            {...register('img', {
              required: "met une image, c'est une diapo",
              value: initData?.img
            })}
            type="text"
            placeholder="Image link"
            className="m-2"
          />
          <HelperText valid={false}>
            {errors.img && errors.img.message}
          </HelperText>
        </Label>
        <Textarea
          {...register('notes', { value: initData?.notes })}
          type="text"
          placeholder="Notes"
          className="m-2"
        />
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full sm:w-auto"
          layout="outline"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit((data: Slide) => {
            console.log(data)

            slideId !== undefined
              ? dispatch(
                  editSlide({ id: slideId, slide: data } as SingleSlideState)
                )
              : dispatch(addSlide(data))
            closeModal()
          })}
          className="w-full sm:w-auto"
        >
          Accept
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default AjouterModal
