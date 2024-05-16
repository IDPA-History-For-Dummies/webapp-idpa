import i18n from "@/plugins/i18n";

export type ValidationValue =
	string
	| number
	| boolean
	| File
	| (string | number | boolean | File)[]
	| null
	| undefined;
export type ValidationInput = ValidationValue | ValidationValue[];
export type ValidationResult = boolean | string;
export type ValidationRule = (value: ValidationInput) => ValidationResult;

export abstract class Validator {

	public readonly attributeLabelTranslationKey: string;

	public constructor(attributeLabelTranslationKey: string) {
		this.attributeLabelTranslationKey = attributeLabelTranslationKey;
	}

	public rule(): ValidationRule {
		return (value: ValidationInput) => this.validate(value);
	}

	protected success(): boolean {
		return true;
	}

	protected fail(reason?: number): string {
		return this.createFailMessage(i18n.global.t(this.attributeLabelTranslationKey), reason);
	}

	protected abstract validate(value: ValidationInput): ValidationResult;

	protected abstract createFailMessage(attributeLabel: string, reason?: number): string;

}
