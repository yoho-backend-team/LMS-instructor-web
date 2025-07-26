/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLocalStorage } from '@/utils/helper';
import axios from 'axios';

const backendurl = 'http://localhost:3001/api'
// const backendurl = 'https://lms-node-backend-v1.onrender.com/api';
const Axios = axios.create({
	baseURL: backendurl,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	const token = GetLocalStorage('instructorToken');

	if (token) {
		config.headers['Authorization'] = `Token ${token ? token : ''}`;
	}
	return config;
});

class Client {
	async get(
		url: string,
		params?: { userId?: any; classId?: string; course?: string },
		userType?: string
	) {
		const response = await Axios.get(url, {
			params: params,
			headers: {
				'User-Type': userType,
			},
		});
		return response.data;
	}

	async post(url: string, data: any, params?: string, userType?: string) {
		const response = await Axios.post(url, data, {
			params,
			headers: {
				'User-Type': userType,
			},
		});
		return response.data;
	}

	async update(url: string, data: any, params?: any, userType?: string) {
		const response = await Axios.put(url, data, {
			params,
			headers: {
				'User-Type': userType,
			},
		});
		return response?.data;
	}

	async delete(url: string, params?: any, userType?: string) {
		const response = await Axios.delete(url, {
			params,
			headers: { 'User-Type': userType },
		});
		return response?.data;
	}

	async fileGet(url: string, params: any, userType?: undefined) {
		const response = Axios.get(url, {
			params,
			responseType: 'blob',
			headers: {
				'User-Type': userType,
			},
		});
		return response;
	}

	async uploadFile(url: string, data?: any, userType?: undefined) {
		const response = await Axios.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'User-Type': userType,
			},
		});
		return response?.data;
	}
}

export default new Client();
