// Components
import App from './App.vue';

// Composables
import {createApp} from 'vue';

// Plugins
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';

//Styles
import './scss/global.scss';
import 'primeicons/primeicons.css'
import router from "@/router";

const app = createApp(App)
	.use(router)
	.use(ToastService);

app.use(PrimeVue, {
	theme: {
		preset: Lara,
		options: {
			prefix: 'p',
			darkModeSelector: 'white',
			cssLayer: false
		},
	},

});

app.mount('#app');
