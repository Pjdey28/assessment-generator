import { configureStore } from "@reduxjs/toolkit"
import assignmentReducer from "./features/assignmentSlice"

export const store = configureStore({
  reducer: {
    assignment: assignmentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch