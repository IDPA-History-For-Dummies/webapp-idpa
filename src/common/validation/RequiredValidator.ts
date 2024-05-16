import {ValidationInput, ValidationResult, Validator} from "@/common/validation/Validator";
import i18n from "@/plugins/i18n";
import {useStringHelper} from "@/compositions/helpers/string";

export default class RequiredValidator extends Validator {

	protected validate(value: ValidationInput): ValidationResult {
		if (Array.isArray(value)) {
			if (value.length > 0) return this.success();
		} else if (typeof value === 'boolean') {
			return this.success();
		} else if (typeof value === 'string') {
			if (!useStringHelper().isEmpty(value)) return this.success();
		} else if (typeof value === 'number') {
			return this.success();
		} else if (value !== null && value !== undefined) {
			return this.success();
		}

		return this.fail();
	}

	protected createFailMessage(attributeLabel: string): string {
		return i18n.global.t('error.validation.isRequired', {attribute: attributeLabel});
	}

}
