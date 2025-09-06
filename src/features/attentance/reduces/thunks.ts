/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppDispatch } from '@/store/store';
import { getattendancedata, getAttendanceByDaily } from '../services/Attendance';
import { getattendancedetails, getAttendanceDailyData } from './AttendanceSlice';
import { GetLocalStorage } from '@/utils/helper';

export const getInstructorAttendance =
	(params: any) => async (dispatch: any) => {
		try {
			const response = await getattendancedata(params);
			dispatch(getattendancedetails(response));
			return response
		} catch (error) {
			console.log(error);
		}
	};

export const getAttendanceDailyThunk = (data: any) => async (dispatch: AppDispatch) => {
	try {
		const params: any = GetLocalStorage("instructorDetails")
		const response = await getAttendanceByDaily(params?.uuid, data)
		dispatch(getAttendanceDailyData(response.data))
	} catch (error) {
		console.log(error)
	}
}