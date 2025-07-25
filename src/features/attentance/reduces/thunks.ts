
import { getattendancedata } from '../services/Attendance';
import {  getattendancedetails } from './AttendanceSlice';


export const getStudentattendance =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getattendancedata(params);
           
            dispatch(getattendancedetails(response));
        } catch (error) {
            console.log(error);
        }
    };

