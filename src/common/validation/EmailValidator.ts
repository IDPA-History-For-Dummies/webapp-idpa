import PatternValidator from "@/common/validation/PatternValidator";

export default class EmailValidator extends PatternValidator {

	public static readonly emailPattern = '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*';

	public constructor(attributeLabelTranslationKey: string) {
		super(attributeLabelTranslationKey, new RegExp('^' + EmailValidator.emailPattern + '$'));
	}

}
