import {AxiosError} from "axios";
import {ApiError, ValidationError} from "@/models/common/ErrorModels";
import {useAxios} from "@/compositions/axios";

export interface IApi {
	get<T>(url: string, config?: IApiRequestConfig): Promise<T>;
}

export type ApiResponseType = 'json' | 'text';


export interface IApiRequestConfig {
	params?: any;
	responseType?: ApiResponseType;
}

function convertAxiosError(error: AxiosError): ApiError {
	return error.response?.status === 400
		? new ValidationError(error)
		: new ApiError(error);
}

export default function useApi(): IApi {
	const axios = useAxios();

	return {
		async get<T>(url: string, config?: IApiRequestConfig): Promise<T> {
			return axios
				.get<T>(url, config)
				.then(res => res.data)
				.catch((error: AxiosError) => Promise.reject(convertAxiosError(error)));
		},
	};
}
