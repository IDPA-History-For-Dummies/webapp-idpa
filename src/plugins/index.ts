/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import {loadFonts} from './webfontloader';
// import pinia from '../store';
import router from '../router';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import i18n from './i18n';
// Types
import type {App} from 'vue';

export function registerPlugins(app: App) {
	loadFonts();
	app.component('font-awesome-icon', FontAwesomeIcon);
	app
		.use(router)
		// .use(pinia)
		.use(i18n);
}
