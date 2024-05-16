import {defineStore} from "pinia";
import {FrontendError} from "@/models/common/ErrorModels";
import {useGuidHelper} from "@/compositions/helpers/guid";
import {useCommonHelper} from "@/compositions/helpers/common";
import {IListRequestStored} from "@/models/common/ListRequestModels";
import {IIDPASnackbar} from "@/models/common/IDPAComponentModels";

interface IUiStore {
	dialogs: {
		numFullscreenDialogs: number,
	},
	tabs: {
		memory: {
			[key: string]: string | null
		},
	},
	lists: {
		memory: {
			[key: string]: IListRequestStored
		},
	},
	snackbar: {
		entries: {
			[id: string]: IIDPASnackbar
		},
	},
}

export const useUiStore = defineStore('ui', {
	persist: {
		paths: ['tabs', 'lists'],
	},
	state: (): IUiStore => ({
		dialogs: {
			numFullscreenDialogs: 0,
		},
		tabs: {
			memory: {},
		},
		lists: {
			memory: {},
		},
		snackbar: {
			entries: {},
		},
	}),
	getters: {},
	actions: {
		showSnackbar(message: string, color?: string, timeout?: number, error?: FrontendError, dark?: boolean): void {
			const snackbar = {
				id: useGuidHelper().create(),
				visible: true,
				message: message,
				color: color ?? 'black',
				timeout: timeout ?? -1,
				dark: dark ?? true,
				error: error ?? null,
			} as IIDPASnackbar;

			this.snackbar.entries[snackbar.id] = snackbar;
		},
		async closeSnackbar(id: string): Promise<void> {
			const snackbar = this.snackbar.entries[id];
			if (snackbar === undefined) return Promise.reject();

			snackbar.visible = false;
			await useCommonHelper().waitAsync(500);
			delete this.snackbar.entries[id];
			return Promise.resolve();
		},
	},
});
