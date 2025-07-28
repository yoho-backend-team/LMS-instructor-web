import { getattendancedata } from '../services/Attendance';
import { getattendancedetails } from './AttendanceSlice';

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
