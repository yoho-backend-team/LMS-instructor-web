/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	getCoursesListData,
	getCourseData,
	getAllBatches,
} from '../services/Course';
import { getBatches, getCoursedata, getcoursedetails } from './CourseSlice';

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
