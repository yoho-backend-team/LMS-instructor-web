import { configureStore } from "@reduxjs/toolkit";
import DashBoardSlice from '../features/Dashboard/reducers/slices'
import CourseSlice from "../features/Course/reducers/courseSlice"

const store = configureStore({
    reducer: {
        dashboard: DashBoardSlice,
        CourseSlice: CourseSlice,
    }
})

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;