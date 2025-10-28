/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLiveClassDetails } from '../services';
import { getclassdetails } from './slices';

export const getClassDetails = (params: any) => async (dispatch: any) => {
	try {
		params.users = '67d7ff20adc836d7f85fb99e';
		const response = await getLiveClassDetails(params);
		dispatch(getclassdetails(response));
	} catch (error) {
		console.log(error);
	}
};
