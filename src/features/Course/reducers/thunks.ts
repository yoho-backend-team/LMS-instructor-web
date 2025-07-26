import { getCoursesListData, getCourseData, getAllBatches } from '../services/Course';
import { getBatches, getCoursedata, getcoursedetails } from './CourseSlice';


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

export const getInstructorcourseData = (params: any = {}) => async(dispatch:any)=>{
  try {
    const response = await getCourseData(params);
  dispatch(getCoursedata(response?.data));
    return response?.data;
  } catch (error) {
    console.error('Error in getStudentcoursedata:', error);
    throw error;
  }
}

export const getBatchesData = (params: any = {}) => async(dispatch:any)=>{
  try {
    const response = await getAllBatches(params);
  dispatch(getBatches(response?.data));
    return response?.data;
  } catch (error) {
    console.error('Error in getStudentcoursedata:', error);
    throw error;
  }
}
