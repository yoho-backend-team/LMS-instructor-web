import {  getticketdata } from '../services/Ticket';
import { getticketdetails } from './TicketSlice';


export const getStudentticket =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getticketdata(params);
            dispatch(getticketdetails(response));
        } catch (error) {
            console.log(error);
        }
    };
   
