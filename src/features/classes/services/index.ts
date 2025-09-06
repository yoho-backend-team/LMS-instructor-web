/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getLiveClassDetails = async (data: any) => {
	const response = await Client.Instructor.class.get(data);
	if (response) return response;
};
