import {useAxios} from "@/compositions/axios";
import {IPaginatedListResponse} from "@/models/common/ResponseModels";
import {ListRequest} from "@/models/common/ListRequestModels";
import {ApiError, ValidationError} from "@/models/common/ErrorModels";
import {useUiStore} from "@/store/ui";
import i18n from "@/plugins/i18n";
import {AxiosError, AxiosProgressEvent} from "axios";

const i18nInstance = i18n;

export interface IApi {
	get<T>(url: string, config?: IApiRequestConfig): Promise<T>;

	getList<T>(url: string, listRequest: ListRequest): Promise<IPaginatedListResponse<T>>;

	getFile(url: string, mimeType: string, config?: IApiRequestConfig): Promise<Blob>;

	post<T>(url: string, data?: object, config?: IApiRequestConfig): Promise<T>;

	postFile<T>(url: string, data: Blob, config?: IApiRequestConfig, onProgress?: ((event: IApiProgressEvent) => void)): Promise<T>;

	patch<T>(url: string, data?: object, config?: IApiRequestConfig): Promise<T>;

	put<T>(url: string, data?: object, config?: IApiRequestConfig): Promise<T>;

	delete(url: string, config?: IApiRequestConfig): Promise<void>;
}

export type ApiResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

export interface IApiProgressEvent extends AxiosProgressEvent {

}

export interface IApiRequestConfig {
	params?: any;
	responseType?: ApiResponseType;
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
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
		async getList<T>(url: string, listRequest: ListRequest): Promise<IPaginatedListResponse<T>> {
			return axios
				.get<IPaginatedListResponse<T>>(url, {params: listRequest.filter})
				.then(res => res.data)
				.catch((error: AxiosError) => {
					const err = convertAxiosError(error);
					useUiStore().showSnackbar(i18nInstance.global.t('error.common.loadingList'), 'error', 30000, err);
					return Promise.reject(err);
				});
		},
		async getFile(url: string, mimeType: string, config?: IApiRequestConfig): Promise<Blob> {
			config = config ?? {} as IApiRequestConfig;
			config.responseType = 'blob';

			return axios
				.get<Blob>(url, config)
				.then(res => new Blob([res.data], {type: mimeType}))
				.catch((error: AxiosError) => {
					const err = convertAxiosError(error);
					useUiStore().showSnackbar(i18nInstance.global.t('error.common.loadingFile'), 'error', 30000, err);
					return Promise.reject(err);
				});
		},
		async post<T>(url: string, data?: object, config?: IApiRequestConfig): Promise<T> {
			return axios
				.post<T>(url, data, config)
				.then(res => res.data)
				.catch((error: AxiosError) => Promise.reject(convertAxiosError(error)));
		},
		async postFile<T>(url: string, file: File, config?: IApiRequestConfig, onProgress?: ((event: IApiProgressEvent) => void)): Promise<T> {
			const formData = new FormData();
			formData.append('file', file as Blob);

			if (config === undefined) config = {params: {}};
			if (onProgress !== undefined) config.onUploadProgress = onProgress;

			return axios
				.post<T>(url, formData, config)
				.then(res => res.data)
				.catch((error: AxiosError) => Promise.reject(convertAxiosError(error)));
		},
		async patch<T>(url: string, data?: object, config?: IApiRequestConfig): Promise<T> {
			return axios
				.patch<T>(url, data, config)
				.then(res => res.data)
				.catch((error: AxiosError) => Promise.reject(convertAxiosError(error)));
		},
		async put<T>(url: string, data?: object, config?: IApiRequestConfig): Promise<T> {
			return axios
				.put<T>(url, data, config)
				.then(res => res.data)
				.catch((error: AxiosError) => Promise.reject(convertAxiosError(error)));
		},
		async delete(url: string, config?: IApiRequestConfig): Promise<void> {
			return axios
				.delete<void>(url, config)
				.then(res => res.data)
				.catch((error: AxiosError) => Promise.reject(convertAxiosError(error)));
		},
	};
}
