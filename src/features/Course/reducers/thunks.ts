import { getCoursesListData } from '../services/Course';
import { getcoursedetails } from './courseSlice';


export const getInstructorcourse = (params: any = {}) => async (dispatch: any) => {
  try {
    const response = await getCoursesListData(params);
    dispatch(getcoursedetails(response?.data));
    return response?.data;
  } catch (error) {
    console.error('Error in getStudentcourse:', error);
    throw error;
  }
};
