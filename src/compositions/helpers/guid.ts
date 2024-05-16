import {Guid} from "guid-typescript";

export class GuidHelper {

	public create(): string {
		return Guid.raw();
	}

}

const instance = new GuidHelper();

export function useGuidHelper(): GuidHelper {
	return instance;
}
