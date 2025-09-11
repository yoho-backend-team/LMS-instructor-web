import Client from '../../../api/index';

export const getStudentPayment = async (params: any) => {
	const response = await Client.Instructor.payment.get(params);
	if (response) {
		return response;
	}
};
