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

export const authInstructorLogout = async (data: any) => {
	try {
		const response = await Client.Instructor.log_out(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const authEmailVerification = async (data: any) => {
	try {
		const response = await Client.Instructor.forgotPassword(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const authOtpVerification = async (data: any, params?: any) => {
	try {
		const response = await Client.Instructor.verifyOtp(data, params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const authChangePassword = async (data: any, params?: any) => {
	try {
		const response = await Client.Instructor.changePassword(data, params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
