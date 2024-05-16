import {useUiStore} from "@/store/ui";
import i18n from "@/plugins/i18n";

export class ClipboardHelper {

	public copyText(value: any): void {
		const text = Array.isArray(value) || ['object', 'function', 'symbol'].includes(typeof value)
			? JSON.stringify(value, null, 2)
			: value;

		navigator.clipboard.writeText(text)
			.then(this.copySuccess)
			.catch(this.copyError);
	}

	private copySuccess(): void {
		useUiStore().showSnackbar(i18n.global.t('term.snackbar.copyClipboardSuccess'), 'success', 2000);
	}

	private copyError(): void {
		useUiStore().showSnackbar(i18n.global.t('term.snackbar.copyClipboardError'), 'error', 2000);
	}

}

const instance = new ClipboardHelper();

export function useClipboardHelper(): ClipboardHelper {
	return instance;
}
