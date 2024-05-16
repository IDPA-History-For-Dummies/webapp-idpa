import {ValidationInput, ValidationResult, Validator} from "@/common/validation/Validator";
import i18n from "@/plugins/i18n";
import {useFileHelper} from "@/compositions/helpers/file";

export default class FileValidator extends Validator {

	protected mimeTypes!: string[];
	protected maxSize!: number;

	public constructor(attributeLabelTranslationKey: string, mimeTypes: string[] = [], maxSize: number = 0) {
		super(attributeLabelTranslationKey);
		this.mimeTypes = mimeTypes;
		this.maxSize = maxSize;
	}

	protected validate(value: ValidationInput): ValidationResult {
		if (value === null || value === undefined) {
			return this.success();
		}

		value = Array.isArray(value) ? value : [value];
		if (!value.every(v => v instanceof File)) return this.fail();
		const files = value as File[];

		if (this.mimeTypes.length > 0) {
			const mimePatterns = this.mimeTypes.map(m => {
				return new RegExp(`^${m.replace('*', '.*')}$`, 'g');
			});
			if (!files.every(f => mimePatterns.some(p => f.type.match(p)))) {
				return this.fail(0);
			}
		}
		if (this.maxSize > 0 && files.some(f => f.size > this.maxSize)) {
			return this.fail(1);
		}

		return this.success();
	}

	protected createFailMessage(attributeLabel: string, reason?: number): string {
		switch (reason) {
			case 0:
				return i18n.global.t('error.validation.invalidFileType', {
					attribute: attributeLabel,
					allowedTypes: this.allowedMimeTypesString(),
				});
			case 1:
				return i18n.global.t('error.validation.fileTooBig', {
					attribute: attributeLabel,
					maxSize: useFileHelper().fileSizeFormatted(this.maxSize),
				});
			default:
				return i18n.global.t('error.validation.invalidFile', {attribute: attributeLabel});
		}
	}

	private allowedMimeTypesString(): string {
		return this.mimeTypes
			.map(m => m === 'text/plain' ? 'TXT' : (m.split('/')[1]?.toUpperCase() ?? '?'))
			.join(', ');
	}

}
