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
    nextSlide: (state) => {
      state.currentSlideId < state.slides.length - 1 && state.currentSlideId++
    },
    previousSlide: (state) => {
      state.currentSlideId > 0 && state.currentSlideId--
    },
    setSlide: {
      reducer: (state, action: PayloadAction<number>) => {
        const res: SlideShowState = state
        action.payload < state.slides.length &&
          action.payload >= 0 &&
          (res.currentSlideId = action.payload)
        if (action.payload >= state.slides.length)
          res.currentSlideId = state.slides.length - 1
        if (action.payload < 0) res.currentSlideId = 0
        return res
      },
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    refreshSlides: (state, action: PayloadAction<Slide[]>) => {
      const res: SlideShowState = state
      action?.payload && (res.slides = action.payload)
      return res
    },
    changeVisibilitySlide: {
      reducer: (state, action: PayloadAction<number>) => {
        const res: SlideShowState = state
        res.slides[action.payload].visible = !res.slides[action.payload].visible
        return res
      },
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    addSlide: {
      reducer: (state, action: PayloadAction<Slide>) => {
        const res: SlideShowState = state
        res.slides.push(action.payload)
        return res
      },
      prepare: (payload: Slide, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    removeSlide: {
      reducer: (state, action: PayloadAction<number>) => {
        const res: SlideShowState = state
        if (state.slides.length > 0) {
          res.slides = state.slides.filter(
            (val, idx) => idx !== state.currentSlideId
          )
          if (state.currentSlideId > state.slides.length - 1) {
            res.currentSlideId = state.slides.length - 1
          }
          if (state.currentSlideId < 0) {
            res.currentSlideId = 0
          }
        }
        return res
      },
      prepare: (payload: number, propagate: boolean) => ({
        payload,
        meta: propagate
      })
    },
    editSlide: {
      reducer: (state, action: PayloadAction<SingleSlideState>) => {
        const res: SlideShowState = state
        action?.payload &&
          (res.slides[action.payload.id] = action.payload.slide)
        return res
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
    addDrawingPoint: {
      reducer: (
        state,
        action: PayloadAction<{
          clickX: number[]
          clickY: number[]
          clickDrag: boolean[]
        }>
      ) => {
        const res: SlideShowState = state
        res.drawing.clickX = res.drawing.clickX.concat(action.payload.clickX)
        res.drawing.clickY = res.drawing.clickY.concat(action.payload.clickY)
        res.drawing.clickDrag = res.drawing.clickDrag.concat(
          action.payload.clickDrag
        )
        return res
      },
      prepare: (
        payload: {
          clickX: number[]
          clickY: number[]
          clickDrag: boolean[]
        },
        propagate: boolean
      ) => ({
        payload,
        meta: propagate
      })
    },
    resetDrawPoints: {
      reducer: (state, action: null) => {
        const res: SlideShowState = state
        res.drawing = { clickX: [], clickY: [], clickDrag: [] }
        return res
      },
      prepare: (payload: null, propagate: boolean) => ({
        payload,
        meta: propagate
      })
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
