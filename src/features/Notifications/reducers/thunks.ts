import { getAllNotifications } from '../services';
import { getNotifications } from './NotificationSlice';

export const getAllNotificationsThunk =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getAllNotifications(params);
            console.log(response, "Notification Datas")
            dispatch(getNotifications(response.data));
        } catch (error) {
            console.log(error);
        }
    };
