/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getattendancedata = async (params: any) => {
	const response = await Client.Instructor.attendance.get(params);
	if (response) {
		return response;
	}
};

export const getAttendanceByDaily = async (params: string, data: any) => {
	const response = await Client.Instructor.attendance.getByDaily(params, data)
	return response
}