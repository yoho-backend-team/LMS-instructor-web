/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getLiveClassDetails = async (data: any) => {
	const response = await Client.Instructor.class.get(data);
	if (response) return response;
};

export const updateClassService = async (params: any, data: any) => {
	try {
		const response = await Client.Instructor.class.update(params, data);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};
