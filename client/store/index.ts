import { configureStore } from '@reduxjs/toolkit'
import slideshowReducer from '../slices/slideShowSlice' // chemin à adapter

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: slideshowReducer,
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
