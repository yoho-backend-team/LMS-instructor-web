/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStudentProfile } from '../services';
import { getProfile, updateProfile } from './ProfileSlice';

export const getStudentProfileThunk =
	() => async (dispatch: any) => {
		try {
			const response = await getStudentProfile();
			dispatch(getProfile(response?.data));
			return response
		} catch (error) {
			console.log(error);
		}
	};

export const UpdateInstructorThunk = (data: any) => async (dispatch: any) => {
	try {
		dispatch(updateProfile(data))
	} catch (error) {
		console.log(error)
	}
}