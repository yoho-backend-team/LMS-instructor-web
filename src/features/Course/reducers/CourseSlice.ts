import { createSlice } from '@reduxjs/toolkit';


const   CourseSlice = createSlice({
	name: 'CourseSlice',
	initialState: {
		data: [],
		courseData: [],
		batches:[]
        
	},
	reducers: {
		getcoursedetails: (state, action) => {
			state.data = action.payload;
		},
		getCoursedata : (state,action)=>{
		   state.courseData = action.payload
		},
		getBatches:(state,action)=>{
			state.batches = action.payload
		}
}});

export const { getcoursedetails, getCoursedata, getBatches } = CourseSlice.actions;
export default CourseSlice.reducer;
