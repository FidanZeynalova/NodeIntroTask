import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { CarApi } from './slices/CarSlices'

export const store = configureStore({
  reducer: {
    [CarApi.reducerPath]: CarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CarApi.middleware),
})

setupListeners(store.dispatch)