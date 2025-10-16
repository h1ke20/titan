import { configureStore } from '@reduxjs/toolkit'
import passengersReducer from './passengersSlice.ts'

export const store = configureStore({
  reducer: {
    passengers: passengersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch