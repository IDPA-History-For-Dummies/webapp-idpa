export class CommonHelper {

	public waitAsync(ms: number): Promise<void> {
		return new Promise(res => setTimeout(res, ms));
	}

}

const instance = new CommonHelper();

export function useCommonHelper(): CommonHelper {
	return instance;
}
