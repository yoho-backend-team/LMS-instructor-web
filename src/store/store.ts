import { configureStore } from "@reduxjs/toolkit";
import DashBoardSlice from '../features/Dashboard/reducers/slices'
import TicketSlice from "../features/Tickets/reducer/TicketSlice";


const store = configureStore({
    reducer: {
        dashboard: DashBoardSlice,
        TicketSlice: TicketSlice,
    }
})

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;