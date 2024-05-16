import {useStringHelper} from "@/compositions/helpers/string";
import {IFrontendModel} from "@/models/common/FrontendModels";
import {IIDPASortByOption} from "@/models/common/IDPAComponentModels";

export abstract class ListFilterBase implements IFrontendModel {

	public fullText: string | null = null;

	public clear(): void {
		this.fullText = null;
	}

	public hasFilter(): boolean {
		const stringHelper = useStringHelper();
		return !stringHelper.isEmpty(this.fullText);
	}
}

export class ListFilter extends ListFilterBase {

}

export interface ISortItem {
	key: string,
	order: 'asc' | 'desc'
}

export abstract class ListOptionsBase implements IFrontendModel {

	public page: number;
	public perPage: number;
	public sortBy: ISortItem[];

	public constructor(page?: number, perPage?: number, sortBy?: IIDPASortByOption[]) {
		this.page = page ?? 1;
		this.perPage = perPage ?? 25;
		this.sortBy = sortBy ?? [];
	}
}

export class ListOptions extends ListOptionsBase {

}

export interface IListRequestStored {
	filter: object,
	options: object,
}

export class ListRequest<T extends ListFilterBase = ListFilter> implements IFrontendModel {

	public filter: T;
	public options: ListOptions;

	public constructor(filter?: T, options?: ListOptions) {
		this.filter = filter ?? new ListFilter() as T;
		this.options = options ?? new ListOptions();
	}
}
