export type IDPACardKeyValueValue = string | number | boolean | object | null;
export type IDPADensity = null | 'default' | 'comfortable' | 'compact';
export type IDPAVariant = 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain';
export type IDPADirection = 't' | 'b' | 'l' | 'r' | 's' | 'e' | 'x' | 'y' | 'a';
export type IDPASize = 'x-small' | 'small' | 'default' | 'large' | 'x-large';

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
type Tblock = typeof block[number];
type Tinline = typeof inline[number];
export type IDPAAnchor =
	Tblock
	| Tinline
	| 'center'
	| 'center center'
	| `${Tblock} ${Tinline | 'center'}`
	| `${Tinline} ${Tblock | 'center'}`;
