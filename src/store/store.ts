import { configureStore } from "@reduxjs/toolkit";
import DashBoardSlice from '../features/Dashboard/reducers/slices'
import ActivityLogsSlice from '../features/activitylog/reduces/ActivitySlice';
import AttendanceSlice from '../features/attentance/reduces/AttendanceSlice'

const store = configureStore({
    reducer: {
        dashboard: DashBoardSlice,
        ActivityLogsSlice: ActivityLogsSlice,
        AttendanceSlice: AttendanceSlice,
    }
})

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;