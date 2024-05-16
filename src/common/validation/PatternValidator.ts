import {ValidationInput, ValidationResult, Validator} from "@/common/validation/Validator";
import i18n from "@/plugins/i18n";

export default class PatternValidator extends Validator {

	protected patterns!: RegExp[];
	protected matchAll!: boolean;

	public constructor(attributeLabelTranslationKey: string, pattern: RegExp | RegExp[], matchAll: boolean = false) {
		super(attributeLabelTranslationKey);
		this.patterns = Array.isArray(pattern) ? pattern : [pattern];
		this.matchAll = matchAll;
	}

	protected validate(value: ValidationInput): ValidationResult {
		if (value === null || value === undefined) return this.success();

		const strVal = value.toString();
		if (this.matchAll && this.patterns.every(p => strVal.match(p))) {
			return this.success();
		} else if (!this.matchAll && this.patterns.some(p => strVal.match(p))) {
			return this.success();
		} else {
			return this.fail();
		}
	}

	protected createFailMessage(attributeLabel: string, reason?: number): string {
		return i18n.global.t('error.validation.patternDoesNotMatch', {attribute: attributeLabel});
	}

}
