import {ValidationInput, ValidationResult, Validator} from "@/common/validation/Validator";
import {useEnumHelper} from "@/compositions/helpers/enum";
import i18n from "@/plugins/i18n";

export default class EnumValidator<T> extends Validator {

	protected enumType!: T;
	protected validValues!: T[];

	public constructor(attributeLabelTranslationKey: string, enumType: T) {
		super(attributeLabelTranslationKey);
		this.enumType = enumType;
		this.validValues = useEnumHelper()
			.toSelectItems(this.enumType)
			.map(e => e.value) as T[];
	}

	protected validate(value: ValidationInput): ValidationResult {
		if (value === null || value === undefined) return this.success();

		if (this.validValues.includes(value as T)) {
			return this.success();
		} else {
			return this.fail();
		}
	}

	protected createFailMessage(attributeLabel: string, reason?: number): string {
		return i18n.global.t('error.validation.invalidEnumValue', {attribute: attributeLabel});
	}

}
