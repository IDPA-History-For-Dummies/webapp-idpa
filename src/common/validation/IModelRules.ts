import {ValidationRule} from "@/common/validation/Validator";

export default interface IModelRules {

	rules(attribute: string, isUpdate: boolean): ValidationRule[];

}
