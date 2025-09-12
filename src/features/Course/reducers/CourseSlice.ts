import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
	name: 'CourseSlice',
	initialState: {
		data: [],
		courseData: [],
		batches: [],
		taskData: [],
		modules: []
	},
	reducers: {
		getcoursedetails: (state, action) => {
			state.data = action.payload;
		},
		getCoursedata: (state, action) => {
			state.courseData = action.payload;
		},
		getBatches: (state, action) => {
			state.batches = action.payload;
		},
		getTaskData: (state, action) => {
			state.taskData = action.payload
		},
		getCourseModule: (state, action) => {
			state.modules = action.payload
		}
	},
});

export const { getcoursedetails, getCoursedata, getBatches, getTaskData, getCourseModule } =
	CourseSlice.actions;
export default CourseSlice.reducer;
