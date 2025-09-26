/* eslint-disable @typescript-eslint/no-explicit-any */
import secureStorage from 'react-secure-storage';
const backendurl = 'https://lms-node-backend-v1.onrender.com/';

export const GetImageUrl = (url: string) => {
	const data = url ? backendurl + url : undefined;
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

// utils/dateFormatter.ts
export const formatDate = (isoDate: string | Date): string => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};