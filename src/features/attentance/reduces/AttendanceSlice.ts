import { createSlice } from '@reduxjs/toolkit';

const AttendanceSlice = createSlice({
	name: 'AttendanceSlice',
	initialState: {
		data: [],
		dailyData: []
	},
	reducers: {
		getattendancedetails: (state, action) => {
			state.data = action.payload;
		},
		getAttendanceDailyData: (state, action) => {
			state.dailyData = action.payload
		}
	},
});

export const { getattendancedetails, getAttendanceDailyData } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;
