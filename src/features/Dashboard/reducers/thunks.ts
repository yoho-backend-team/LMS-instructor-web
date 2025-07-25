/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDashBoardData } from '../services';
import { setDashBoard } from './slices';

export const getDashBoardReports = () => async (dispatch: any) => {
	try {
		const response: any = await getDashBoardData();
		await dispatch(setDashBoard(response.data));
		return response;
	} catch (error) {
		console.log(error);
	}
};
