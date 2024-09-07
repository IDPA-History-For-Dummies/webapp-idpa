import {AxiosError, AxiosHeaders, AxiosResponseHeaders, RawAxiosResponseHeaders} from "axios";

export class FrontendError extends Error {

	public message: string;

	public constructor(name: string, message: string) {
		super(name);
		this.name = name;
		this.message = message;
	}

}

export interface IApiErrorHeader {
	header: string;
	value: string | null;
}

export type ValidationErrors = { [attribute: string]: string[] }

export type ValidationErrorData = {
	title: string,
	errors: ValidationErrors;
}

export class ApiError extends FrontendError {

	public readonly statusCode: number | null;
	public readonly statusText: string | null;
	public readonly method: string | null;
	public readonly baseUrl: string | null;
	public readonly url: string | null;
	public readonly params: any | null;
	public readonly requestHeaders: IApiErrorHeader[];
	public readonly responseHeaders: IApiErrorHeader[];

	public constructor(error: AxiosError, name?: string, message?: string) {
		//@ts-ignore
		super(name ?? ApiError.name, message ?? error.response?.data?.message ?? error.message);
		console.log(error, this.message);

		this.statusCode = error.response?.status ?? null;
		this.statusText = error.response !== undefined && error.response.statusText.length > 0 ? error.response.statusText : null;
		this.method = error.config?.method?.toUpperCase() ?? null;
		this.baseUrl = error.config?.baseURL ?? null;
		this.url = error.config?.url ?? null;
		this.params = error.config?.params ?? null;

		this.requestHeaders = this.extractHeaders(error.config?.headers);
		this.responseHeaders = this.extractHeaders(error.response?.headers);
	}

	public getFullURL(): string | null {
		return this.baseUrl !== null || this.url === null
			? (this.baseUrl ?? '') + (this.url ?? '')
			: null;
	}

	private extractHeaders(headers: AxiosHeaders | RawAxiosResponseHeaders | AxiosResponseHeaders | undefined): IApiErrorHeader[] {
		const ret = [] as IApiErrorHeader[];
		if (headers === undefined) return ret;

		return Object.keys(headers)
			.filter(key => !key.toLowerCase().includes('authorization'))
			.map(key => {
				return {
					header: key,
					value: headers[key]
				};
			});
	}

}

export class ValidationError extends ApiError {

	public readonly validationErrors: { [field: string]: string[] };

	public constructor(error: AxiosError) {
		const data = error.response?.data as ValidationErrorData | undefined;
		super(error, ValidationError.name, data?.title);

		this.validationErrors = data?.errors ?? {};
	}

}
