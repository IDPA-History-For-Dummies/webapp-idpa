/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import {createApp} from 'vue';

// Plugins
import {registerPlugins} from '@/plugins';

//Styles
import './scss/global.scss';

import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);


app.use(PrimeVue,{ unstyled: false});

registerPlugins(app);

app.mount('#app');
