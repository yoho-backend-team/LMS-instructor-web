/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	getCoursesListData,
	getCourseData,
	getAllBatches,
	getTaskDeatails,
} from '../services/Course';
import { getBatches, getCoursedata, getcoursedetails, getTaskData } from './CourseSlice';

export const getInstructorcourse = () => async (dispatch: any) => {
	try {
		const response = await getCoursesListData();
		dispatch(getcoursedetails(response?.data));
		return response?.data;
	} catch (error) {
		console.error('Error in getStudentcourse:', error);
		throw error;
	}
};

export const getInstructorcourseData = (course: string) => async (dispatch: any) => {
	try {
		const response = await getCourseData(course);
		dispatch(getCoursedata(response?.data));
		return response?.data;
	} catch (error) {
		console.error('Error in getStudentcoursedata:', error);
		throw error;
	}
};

export const getBatchesData = (data: any) => async (dispatch: any) => {
	try {
		const response = await getAllBatches(data);
		dispatch(getBatches(response?.data));
		return response?.data;
	} catch (error) {
		console.error('Error in getStudentcoursedata:', error);
		throw error;
	}
};

export const getAllTaskData = (params: any) => async (dispatch: any) => {
	try {
		const response = await getTaskDeatails(params);
		console.log("thunk res", response);
		dispatch(getTaskData(response))
		return response;
	} catch (error) {
		console.log('error in getting course data:', error);
		throw error;
	}
}
