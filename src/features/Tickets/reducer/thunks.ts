import {  getticketdata } from '../services/Ticket';
import { getticketdetails } from './TicketSlice';


export const getStudentticket =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getticketdata(params);
            console.log(response, 'login response');
            dispatch(getticketdetails(response));
        } catch (error) {
            console.log(error);
        }
    };
   
