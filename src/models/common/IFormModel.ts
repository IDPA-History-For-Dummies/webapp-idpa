import {ValidationRule} from "@/common/validation/Validator";

export default interface IFormModel {

	reset(): void;

	rules(property: string): ValidationRule[];

}
