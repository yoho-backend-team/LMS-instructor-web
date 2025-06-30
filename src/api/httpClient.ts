/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'


const backendurl = ''
const Axios = axios.create({
    baseURL: backendurl,
    timeout: 5000000,
    headers: {
        "Content-Type": "application/json",
    }
})


class HttpClient {
    async get(url: string, params?: { userId?: any; classId?: string; course?: string; }, userType?: string) {
        const response = await Axios.get(url, {
            params: params,
            headers: {
                "User-Type": userType,
            },
        });
        return response.data;
    }

    async post(url: string, data: any, params?: string, userType?: string) {
        const response = await Axios.post(url, data, {
            params: params,
            headers: {
                "User-Type": userType,
            },
        });
        return response.data;
    }

    async update(url: string, data?: { uuid?: string; NoteId?: string; materialId?: string; }, userType?: string) {

        const response = await Axios.put(url, data, {
            headers: {
                "User-Type": userType,
            },
        });
        return response?.data;
    }

    async delete(url: string, userType?: string) {
        const response = await Axios.delete(url, { headers: { "User-Type": userType } })
        return response?.data
    }

    async fileGet(url: string, userType?: undefined) {
        const response = Axios.get(url, {
            responseType: "blob",
            headers: {
                "User-Type": userType,
            },
        });
        return response;
    }

    async uploadFile(url: string, data?: any, userType?: undefined) {
        const response = await Axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "User-Type": userType,
            },
        });
        return response?.data;
    }
}

export default new HttpClient();