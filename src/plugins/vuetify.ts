/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Components

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import {createVueI18nAdapter} from "vuetify/locale/adapters/vue-i18n";
import {useI18n} from 'vue-i18n';
import i18n from "@/plugins/i18n";

// Composables
import {createVuetify} from 'vuetify';
import {VTextField} from "vuetify/components/VTextField";
import {VAutocomplete} from "vuetify/components/VAutocomplete";
import {VCombobox} from "vuetify/components/VCombobox";
import {VFileInput} from "vuetify/components/VFileInput";
import {VSelect} from "vuetify/components/VSelect";
import {VTextarea} from "vuetify/components/VTextarea";

// FontAwesome
import useIcons from '@/plugins/icons';
import {fa} from 'vuetify/iconsets/fa-svg';

const icons = useIcons();

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	theme: {
		themes: {
			light: {
				colors: {
					'primary': '#F7941E',
					'primary-lighten': '#ffc383',
					'primary-darken': '#e37400',
					'secondary': '#555555',
					'secondary-lighten': '#aaaaaa',
					'secondary-darken': '#333333',
				},
			},
		},
	},
	icons: {
		defaultSet: 'fa',
		aliases: {
			...icons,
		},
		sets: {
			fa,
		},
	},
	locale: {
		//TODO: check this problem
		//@ts-ignore
		adapter: createVueI18nAdapter({i18n, useI18n}),
	},
	aliases: {
		VAutocompleteSimple: VAutocomplete,
		VComboboxSimple: VCombobox,
		VFileInputSimple: VFileInput,
		VSelectSimple: VSelect,
		VTextFieldSimple: VTextField,
		VTextareaSimple: VTextarea,
	},
	defaults: {
		VAlert: {
			class: 'text-left',
		},

		VAutocomplete: {
			hideDetails: 'auto',
		},
		VAutocompleteSimple: {
			variant: 'solo',
			flat: true,
			density: 'comfortable',
			hideDetails: 'auto',
		},

		VCombobox: {
			hideDetails: 'auto',
		},
		VComboboxSimple: {
			variant: 'solo',
			flat: true,
			density: 'comfortable',
			hideDetails: 'auto',
		},

		VFileInput: {
			chips: true,
			showSize: true,
			counter: true,
			truncateLength: 30,
			hideDetails: 'auto',
		},
		VFileInputSimple: {
			chips: true,
			showSize: true,
			truncateLength: 30,
			variant: 'solo',
			flat: true,
			density: 'comfortable',
			hideDetails: 'auto',
		},

		VSelect: {
			hideDetails: 'auto',
		},
		VSelectSimple: {
			variant: 'solo',
			flat: true,
			density: 'comfortable',
			hideDetails: 'auto',
		},

		VTabs: {
			stacked: true,
			bgColor: 'grey-lighten-4',
			sliderColor: 'primary',
		},

		VTextarea: {
			hideDetails: 'auto',
		},

		VTextField: {
			hideDetails: 'auto',
		},
		VTextFieldSimple: {
			variant: 'solo',
			flat: true,
			density: 'comfortable',
			hideDetails: 'auto',
		},

		VTextareaSimple: {
			variant: 'solo',
			flat: true,
			density: 'comfortable',
			rows: 3,
			hideDetails: 'auto',
		},
	},
});
