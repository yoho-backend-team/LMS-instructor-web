import { configureStore } from '@reduxjs/toolkit';
import DashBoardSlice from '../features/Dashboard/reducers/slices';
import TicketSlice from '../features/Tickets/reducer/TicketSlice';

import ClassSlice from '../features/classes/reducers/slices';

const store = configureStore({
	reducer: {
		dashboard: DashBoardSlice,
		TicketSlice: TicketSlice,
		ClassSlice: ClassSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
