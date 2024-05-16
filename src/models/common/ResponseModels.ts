import {IFrontendModel} from "@/models/common/FrontendModels";

export interface ICreateResponse extends IFrontendModel {
	id: string;
}

export interface IPaginatedListResponse<T> extends IFrontendModel {
	data: T[],
	total: number,
}
