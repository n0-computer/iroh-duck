import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"


import { SlideOverAppState, SlideOverReducer } from "./slideOver/slideOvers"

export interface AppState {
  slideOver: SlideOverAppState
}

// const logger = (_ : any) => (next: any) => (action: any) => {
//   console.log('dispatching', action)
//   // let result = next(action)
//   // console.log('next state', store.getState())
//   return next(action)
// }

export const store = configureStore({
  reducer: {
    slideOver: SlideOverReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
