import { configureStore } from '@reduxjs/toolkit';
import DashBoardSlice from '../features/Dashboard/reducers/slices';
import TicketSlice from '../features/Tickets/reducer/TicketSlice';
import ClassSlice from '../features/classes/reducers/slices';
import ActivityLogsSlice from '../features/activitylog/reduces/ActivitySlice';
import AttendanceSlice from '../features/attentance/reduces/AttendanceSlice';
import PaymentSlice from '../features/Payment/reducers/PaymentSlice';
import NotificationSlice from '../features/Notifications/reducers/NotificationSlice';
import CourseSlice from '../features/Course/reducers/CourseSlice';
import communityReducer from '../features/community/redux/communitySlice';
import ProfileSlice from '../features/Profile/reducers/ProfileSlice';
import ClassIdSlice from '../features/classId/services/reducers/classidslice';
import faqSlice from '../features/faq/reduces/faqSlice';

const store = configureStore({
	reducer: {
		dashboard: DashBoardSlice,
		TicketSlice: TicketSlice,
		ClassSlice: ClassSlice,
		ClassIdSlice: ClassIdSlice,
		ActivityLogsSlice: ActivityLogsSlice,
		AttendanceSlice: AttendanceSlice,
		PaymentSlice: PaymentSlice,
		NotificationSlice: NotificationSlice,
		CourseSlice: CourseSlice,
		community: communityReducer,
		ProfileSlice: ProfileSlice,
		faqSlice: faqSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
