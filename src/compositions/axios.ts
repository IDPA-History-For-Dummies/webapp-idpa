import axios, {AxiosInstance} from "axios";

//create axios instance
const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export function useAxios(): AxiosInstance {
	return axiosInstance;
}
