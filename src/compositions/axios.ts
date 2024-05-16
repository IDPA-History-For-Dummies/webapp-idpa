import axios, {AxiosError, AxiosInstance} from "axios";
import {useAuthStore} from "@/store/auth";

//create axios instance
const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

//request interceptors
axiosInstance.interceptors.request.use(
	(config) => useAuthStore().interceptRequestFulfilled(config),
	(error) => Promise.reject(error),
);

//response interceptors
axiosInstance.interceptors.response.use(
	(response) => response,
	(error: AxiosError<any, any>): any => useAuthStore().interceptResponseRejected(error),
);

export function useAxios(): AxiosInstance {
	return axiosInstance;
}
