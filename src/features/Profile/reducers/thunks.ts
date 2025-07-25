import { getStudentProfile } from '../services';
import { getProfile } from './ProfileSlice';

export const getStudentProfileThunk =
	() => async (dispatch: any) => {
		try {
			const response = await getStudentProfile();
			dispatch(getProfile(response?.data));
		} catch (error) {
			console.log(error);
		}
	};
