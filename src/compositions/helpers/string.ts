export class StringHelper {

	public isEmpty(str: string | null | undefined, ignoreWhitespaces: boolean = true): boolean {
		if (str === null || str === undefined) return true;
		if (ignoreWhitespaces) {
			str = str.replace(/\s/g, '');
		}

		return str.length === 0;
	}

	public convertToTag(val: string | null | undefined): string | null {
		if (val === undefined || val === null) return null;
		return val
			.trim()
			.replace(/[-_]/g, ' ')
			.replace(/[^\wäÄöÖüÜéÉàÀèÈêÊ]/g, ' ')
			.split(/\s+/g)
			.map(w => w.charAt(0).toLocaleUpperCase() + w.substr(1))
			.join(' ')
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
				return word.toUpperCase();
			})
			.replace(/\s+/g, '');
	}

	public firstCharsOfWords(str: string | null, toUppercase: boolean = true): string | null {
		if (this.isEmpty(str) || str === null) return null;

		return this.extractWords(str)
			.map(s => s.replace(/[^a-zA-Z0-9äÄöÖüÜéÉàÀèÈêÊ]/, ''))
			.filter(s => s.length > 0)
			.reduce((acc: string, cur: string): string => {
				let char = Array.from(cur)[0]; // unicode works this way :)
				if (toUppercase) char = char.toLocaleUpperCase();
				return acc + char;
			}, '');
	}

	public ucFirst(str: string): string {
		return `${str.toString().charAt(0).toUpperCase()}${str.toString().substring(1)}`;
	}

	public lcFirst(str: string): string {
		return `${str.toString().charAt(0).toLowerCase()}${str.toString().substring(1)}`;
	}

	public extractWords(str: string): string[] {
		return str.trim().split(/\s+/);
	}

	public searchWords(query: string, searchValues: string[], allWordsMustMatch: boolean = true): boolean {
		const words = this.extractWords(query.toLowerCase());
		const values = searchValues.map(v => v.toLowerCase());
		if (allWordsMustMatch) {
			return words.every(w => values.some(v => v.includes(w)));
		} else {
			return words.some(w => values.some(v => v.includes(w)));
		}
	}

}

const instance = new StringHelper();

export function useStringHelper(): StringHelper {
	return instance;
}
