import Client from '../../../api/index';

export const getattendancedata = async (params: any) => {
	const response = await Client.Instructor.attendance.get(params);
	if (response) {
		return response;
	}
};
