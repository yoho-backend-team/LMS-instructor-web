import { configureStore } from "@reduxjs/toolkit";
import DashBoardSlice from '../features/Dashboard/reducers/slices'

const store = configureStore({
    reducer: {
        dashboard: DashBoardSlice
    }
})

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;