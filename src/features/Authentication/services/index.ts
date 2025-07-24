import Client from '../../../api/index';

export const authInstructorLogin = async (data: any) => {
	try {
		const response = await Client.Instructor.login(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
