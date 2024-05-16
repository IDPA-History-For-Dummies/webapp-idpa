import i18n from "@/plugins/i18n";

export class FileHelper {

	public getBinaryString(blob: Blob | File): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				if (event.target === null) {
					reject('Error reading blob.');
					return;
				}

				const binaryString = event.target.result as string;
				resolve(binaryString);
			};

			reader.onerror = () => {
				reject('Error reading blob.');
			};

			reader.readAsBinaryString(blob);
		});
	}

	public fileSizeFormatted(sizeBytes: number): string {
		if (sizeBytes < 1024) {
			return i18n.global.t('term.fileSizeFormatted', {size: sizeBytes, unit: 'B'}).toString();
		} else if (sizeBytes < 1024 * 1024) {
			return i18n.global.t('term.fileSizeFormatted', {size: Math.round(sizeBytes / 1024), unit: 'KB'}).toString();
		} else if (sizeBytes < 1024 * 1024 * 1024) {
			return i18n.global.t('term.fileSizeFormatted', {
				size: Math.round(sizeBytes / (1024 * 1024)).toFixed(2),
				unit: 'MB'
			}).toString();
		} else {
			return i18n.global.t('term.fileSizeFormatted', {
				size: Math.round(sizeBytes / (1024 * 1024 * 1024)).toFixed(2),
				unit: 'GB'
			}).toString();
		}
	}

	public async download(endpoint: Promise<Blob>, fileName: string): Promise<void> {
		try {
			const blob = await endpoint;
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = fileName;
			link.click();
			URL.revokeObjectURL(link.href);
			return Promise.resolve();
		} catch (e) {
			return Promise.reject(e);
		}
	}

}

const instance = new FileHelper();

export function useFileHelper(): FileHelper {
	return instance;
}
