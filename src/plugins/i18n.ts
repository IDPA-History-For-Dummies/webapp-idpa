import {createI18n, DefineDateTimeFormat} from "vue-i18n";

const msgDeCh = await import('../i18n/messages/de-CH.json');
const dtDeCH = await import('../i18n/date-time-formats/de-CH.json');
type MessageSchema = typeof msgDeCh;
type DateTimeSchema = typeof dtDeCH;
export type SupportedLocale = 'de-CH';

const i18n = createI18n<[MessageSchema, DateTimeSchema], SupportedLocale, false>({
	legacy: false,
	allowComposition: true,
	locale: 'de-CH',
	fallbackLocale: 'de-CH',
	messages: {
		'de-CH': msgDeCh,
	},
	datetimeFormats: {
		'de-CH': dtDeCH as DefineDateTimeFormat,
	},
	modifiers: {
		lcfirst: str => `${str.toString().charAt(0).toLowerCase()}${str.toString().substring(1)}`,
		ucfirst: str => `${str.toString().charAt(0).toUpperCase()}${str.toString().substring(1)}`,
	},
});

export default i18n;
