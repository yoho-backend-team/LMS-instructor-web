/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLiveClassDetails } from '../services';
import { getclassdetails } from './slices';

export const getClassDetails = (params: any) => async (dispatch: any) => {
	try {
		params.users = 'instructor'
		const response = await getLiveClassDetails(params);
		dispatch(getclassdetails(response));
	} catch (error) {
		console.log(error);
	}
};
