import { configureStore } from "@reduxjs/toolkit";
import DashBoardSlice from '../features/Dashboard/reducers/slices'
import PaymentSlice from '../features/Payment/reducers/PaymentSlice'
import NotificationSlice from '../features/Notifications/reducers/NotificationSlice'

const store = configureStore({
    reducer: {
        dashboard: DashBoardSlice,
        PaymentSlice:PaymentSlice,
        NotificationSlice:NotificationSlice
    }
})

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;