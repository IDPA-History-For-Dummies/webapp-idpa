import {useDisplay} from "vuetify";
import {IDPADirection, IDPASize} from "@/models/common/IDPAComponentTypes";

export class LayoutHelper {

	private readonly sizes: IDPASize[] = [
		'x-small',
		'small',
		'default',
		'large',
		'x-large',
	];

	public spacingSize(): number {
		return useDisplay().mobile.value ? 4 : 6;
	}

	public margin(direction: IDPADirection = 'a'): string {
		return `m${direction}-${this.spacingSize()}`;
	}

	public padding(direction: IDPADirection = 'a'): string {
		return `p${direction}-${this.spacingSize()}`;
	}

	public sizeStepDown(size: IDPASize | undefined, amount: number = 1): IDPASize | undefined {
		if (size === undefined) return undefined;
		if (amount < 0) amount = 0;
		return this.shiftSize(size, amount * -1);
	}

	public sizeStepUp(size: IDPASize | undefined, amount: number = 1): IDPASize | undefined {
		if (size === undefined) return undefined;
		if (amount < 0) amount = 0;
		return this.shiftSize(size, amount);
	}

	private shiftSize(size: IDPASize, steps: number): IDPASize {
		const index = this.sizes.indexOf(size);
		const shiftedIndex = index + steps;
		if (shiftedIndex < 0) {
			return this.sizes[0];
		} else if (shiftedIndex >= this.sizes.length) {
			return this.sizes[this.sizes.length - 1];
		}
		return this.sizes[shiftedIndex];
	}

}

const instance = new LayoutHelper();

export function useLayoutHelper(): LayoutHelper {
	return instance;
}
