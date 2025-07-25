import Client from '../../../api/index';

export const getAllNotifications = async (params:any) => {
    const response = await Client.Instructor.notification.get(params);
    if (response) {
        return response;
    }
};


export const updateNotificationStatus = async (data:any) => {
    const response = await Client.Instructor.notification.put(data);
    if (response) {
        return response;
    }
};

export const deleteNotification = async (data:any) => {
    const response = await Client.Instructor.notification.delete(data);
    if (response) {
        return response;
    }
}