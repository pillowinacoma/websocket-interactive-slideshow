// TODO compléter en s'appuyant sur le tutoriel lié au dessus

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Slide } from '../type'
import { initialSlides } from '../mock/slides'

export interface SlideShowState {
  currentSlideId: number
  slides: Slide[]
}

export interface SingleSlideState {
  id: number
  slide: Slide
}

const initialState: SlideShowState = {
  currentSlideId: 0,
  slides: initialSlides
}

export const slideshowSlice = createSlice({
  name: 'slidesApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextSlide: {
      reducer: (state, action: null) => {
        state.currentSlideId < state.slides.length - 1 && state.currentSlideId++
      },
      prepare: (payload: null, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    previousSlide: {
      reducer: (state, action: null) => {
        state.currentSlideId > 0 && state.currentSlideId--
      },
      prepare: (payload: null, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    setSlide: {
      reducer: (state, action: PayloadAction<number>) => {},
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    changeVisibilitySlide: (state, action: PayloadAction<number>) => {
      state.slides[action.payload].visible =
        !state.slides[action.payload].visible
    },
    addSlide: (state, action: PayloadAction<Slide>) => {
      state.slides.push(action.payload)
    },
    removeSlide: (state) => {
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
    editSlide: (state, action: PayloadAction<SingleSlideState>) => {
      state.slides[action.payload.id] = action.payload.slide
    },
    resetSlides: (state) => {
      if (state.slides.length === 0) {
        state.slides = initialSlides
      }
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
  resetSlides
} = slideshowSlice.actions
export default slideshowSlice.reducer
