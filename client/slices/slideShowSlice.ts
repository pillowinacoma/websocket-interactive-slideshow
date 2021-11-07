// TODO compléter en s'appuyant sur le tutoriel lié au dessus

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Slide } from '../type'
import { initialSlides } from '../mock/slides'

export interface SlideShowState {
  currentSlideId: number
  slides: Slide[]
  drawing: { clickX: number[]; clickY: number[]; clickDrag: boolean[] }
}

export interface SingleSlideState {
  id: number
  slide: Slide
}

const initialState: SlideShowState = {
  currentSlideId: 0,
  slides: initialSlides,
  drawing: { clickX: [], clickY: [], clickDrag: [] }
}

export const slideshowSlice = createSlice({
  name: 'slidesApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextSlide: (state, action: null) => {
      state.currentSlideId < state.slides.length - 1 && state.currentSlideId++
    },
    previousSlide: (state, action: null) => {
      state.currentSlideId > 0 && state.currentSlideId--
    },
    setSlide: {
      reducer: (state, action: PayloadAction<number>) => {
        action.payload < state.slides.length &&
          action.payload >= 0 &&
          (state.currentSlideId = action.payload)
        if (action.payload >= state.slides.length)
          state.currentSlideId = state.slides.length - 1
        if (action.payload < 0) state.currentSlideId = 0
      },
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    refreshSlides: (state, action: PayloadAction<Slide[]>) => {
      action?.payload && (state.slides = action.payload)
    },
    changeVisibilitySlide: {
      reducer: (state, action: PayloadAction<number>) => {
        state.slides[action.payload].visible =
          !state.slides[action.payload].visible
      },
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    addSlide: {
      reducer: (state, action: PayloadAction<Slide>) => {
        state.slides.push(action.payload)
      },
      prepare: (payload: Slide, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    removeSlide: {
      reducer: (state, action: PayloadAction<number>) => {
        if (state.slides.length > 0) {
          state.slides = state.slides.filter(
            (val, idx) => idx !== state.currentSlideId
          )
          if (state.currentSlideId > state.slides.length - 1) {
            state.currentSlideId = state.slides.length - 1
          }
          if (state.currentSlideId < 0) {
            state.currentSlideId = 0
          }
        }
      },
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    editSlide: {
      reducer: (state, action: PayloadAction<SingleSlideState>) => {
        action?.payload &&
          (state.slides[action.payload.id] = action.payload.slide)
      },
      prepare: (payload: SingleSlideState, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    resetSlides: {
      reducer: (state, action: null) => {
        console.log('Restting slides')
      },
      prepare: (payload: null, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    addDrawingPoint: (
      state,
      action: PayloadAction<{
        clickX: number[]
        clickY: number[]
        clickDrag: boolean[]
      }>
    ) => {
      console.log(action.payload)

      state.drawing.clickX = state.drawing.clickX.concat(action.payload.clickX)
      state.drawing.clickY = state.drawing.clickY.concat(action.payload.clickY)
      state.drawing.clickDrag = state.drawing.clickDrag.concat(
        action.payload.clickDrag
      )
    },
    resetDrawPoints: (state) => {
      state.drawing = { clickX: [], clickY: [], clickDrag: [] }
    }
  }
})

export const {
  nextSlide,
  previousSlide,
  setSlide,
  changeVisibilitySlide,
  addSlide,
  removeSlide,
  editSlide,
  resetSlides,
  refreshSlides,
  addDrawingPoint,
  resetDrawPoints
} = slideshowSlice.actions
export default slideshowSlice.reducer
