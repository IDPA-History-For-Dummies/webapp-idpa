import i18n from "@/plugins/i18n";
import {IIDPAEnumOption} from "@/models/common/IDPAComponentModels";

export class EnumHelper {

	protected toArray<T>(e: any): { key: string; value: T }[] {
		return Object.keys(e)
			.filter(key => isNaN(Number(key)))
			.map((key: string) => {
				return {
					key: key,
					value: e[key] as T,
				};
			});
	}

	public toSelectItems<T>(e: any, translateTexts: boolean = true): IIDPAEnumOption<T>[] {
		return this.toArray<T>(e).map(kvp => {
			return {
				title: translateTexts ? i18n.global.t('enums.' + kvp.key).toString() : kvp.key,
				value: kvp.value as T,
			};
		});
	}

	public textFromValue<T>(e: any, v: T | null | undefined, translateText: boolean = true): string | null {
		return v === null || v === undefined
			? null
			: this.toSelectItems<T>(e, translateText).find(o => o.value === v)?.title ?? v.toString();
	}

}

const instance = new EnumHelper();

export function useEnumHelper(): EnumHelper {
	return instance;
}
