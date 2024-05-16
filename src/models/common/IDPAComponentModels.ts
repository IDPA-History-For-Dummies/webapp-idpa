import {RouteLocationRaw} from 'vue-router';
import {FrontendError} from "@/models/common/ErrorModels";
import {IFrontendModel} from "@/models/common/FrontendModels";
import {IDPAAnchor, IDPACardKeyValueValue, IDPADensity, IDPAVariant} from "@/models/common/IDPAComponentTypes";

export interface IIDPACardKeyValueEntry extends IFrontendModel {
	key?: string;
	title?: string;
	value?: IDPACardKeyValueValue | IDPACardKeyValueValue[] | (() => IDPACardKeyValueValue | IDPACardKeyValueValue[]);
	icon?: string;
	iconColor?: string;
	wrap?: boolean;
	showValueIfEmpty?: boolean;
}

export interface IIDPAAction<T = any> extends IFrontendModel {
	click: (event: Event, payload?: T) => void;
	disabled?: boolean | ((payload?: T) => boolean);
	density?: IDPADensity;
	visible?: boolean | ((payload?: T) => boolean);
	confirm?: boolean;
	confirmText?: string;
	confirmSecure?: boolean;
	confirmSecureWord?: string;
}

export interface IIDPAActionButton<T = any> extends IIDPAAction<T> {
	icon: string | ((payload?: T) => string);
	tooltip?: string | ((payload?: T) => string);
	tooltipLocation?: NonNullable<IDPAAnchor>;
	color?: string | ((payload?: T) => string);
	loading?: boolean | ((payload?: T) => boolean);
	size?: string | number;
	variant?: IDPAVariant;
	rotation?: number;
}

export interface IIDPADropdownEntry<T = any> extends IIDPAAction<T> {
	icon?: string | ((payload?: T) => string);
	title: string | ((payload?: T) => string);
	subtitle?: string | ((payload?: T) => string);
	active?: boolean | ((payload?: T) => boolean);
}

export interface IIDPADialogFooterButton<T = any> extends IIDPAAction<T> {
	icon?: string | ((payload?: T) => string);
	title: string | ((payload?: T) => string);
	color?: string | ((payload?: T) => string);
	loading?: boolean | ((payload?: T) => boolean);
	size?: string | number;
	variant?: IDPAVariant;
}

export interface IIDPAEnumOption<T> extends IFrontendModel {
	title: string;
	value: T;
}

export interface IIDPANavEntry extends IFrontendModel {
	title: string;
	icon: string;
	to: RouteLocationRaw | undefined;
	click: ((event: Event) => void) | undefined;
	iconColor: string | (() => string) | undefined;
	disabled: boolean | (() => boolean) | undefined;
}

export interface IIDPASettingNavEntry extends IFrontendModel {
	type: string | undefined;
	title: string;
	to: RouteLocationRaw | undefined;
}

export interface IIDPASnackbar extends IFrontendModel {
	id: string;
	message: string;
	color?: string;
	timeout: number;
	dark: boolean;
	error: FrontendError | null;
	visible: boolean;
}

export interface IIDPASortByOption {
	key: string;
	order: 'asc' | 'desc';
}

export interface IIDPADataTableHeader {
	key: string;
	//value?: SelectItemKey;
	title: string;
	colspan?: number;
	rowspan?: number;
	fixed?: boolean;
	align?: 'start' | 'end' | 'center';
	width?: number | string;
	minWidth?: string;
	maxWidth?: string;
	sortable?: boolean;
	//sort?: DataTableCompareFunction;
}
