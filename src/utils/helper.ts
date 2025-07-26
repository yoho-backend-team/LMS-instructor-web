/* eslint-disable @typescript-eslint/no-explicit-any */
import secureStorage from 'react-secure-storage';
const backendurl = 'https://lms-node-backend-v1.onrender.com/';

export const GetImageUrl = (url: string) => {
	const data = url ? backendurl + url : null;
	return data;
};

export const StoreLocalStorage = (key: string, data: any) => {
	secureStorage.setItem(key, data);
};

export const GetLocalStorage = (key: string) => {
	const data = secureStorage.getItem(key);
	return data;
};

export const RemoveLocalStorage = (key: string) => {
	secureStorage.removeItem(key);
};

export const ClearLocalStorage = () => {
	secureStorage.clear();
};
