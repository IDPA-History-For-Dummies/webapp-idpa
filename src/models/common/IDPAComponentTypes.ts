export type AsiCardKeyValueValue = string | number | boolean | object | null;
export type AsiDensity = null | 'default' | 'comfortable' | 'compact';
export type AsiVariant = 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain';
export type AsiDirection = 't' | 'b' | 'l' | 'r' | 's' | 'e' | 'x' | 'y' | 'a';
export type AsiSize = 'x-small' | 'small' | 'default' | 'large' | 'x-large';

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
type Tblock = typeof block[number];
type Tinline = typeof inline[number];
export type AsiAnchor =
	Tblock
	| Tinline
	| 'center'
	| 'center center'
	| `${Tblock} ${Tinline | 'center'}`
	| `${Tinline} ${Tblock | 'center'}`;
