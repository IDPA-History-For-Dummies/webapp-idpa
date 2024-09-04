// Composables
import {createRouter, createWebHistory} from 'vue-router';
import {RouteNames} from "@/compositions/helpers/route";
import i18n from "@/plugins/i18n";
import Home from "@/views/Home.vue";
import Events from "@/views/events/Events.vue";
import Programming from "@/views/Programming.vue";

const routes = [

	{
		path: '/',
		alias: ['', '/home'],
		name: RouteNames.home,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		//component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
		component: Home,
		meta: {
			title: i18n.global.t('page.home'),
			fixedHeight: true,
		},
	},
	{
		path: '/events',
		name: RouteNames.events,
		component: Events,
		meta: {
			title: i18n.global.t('page.events'),
		},
	},
	{
		path: '/programming',
		name: RouteNames.programming,
		component: Programming,
		meta: {
			title: i18n.global.t('page.events'),
		},
	},

];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from) => {
	//handle title
	const titleParts = [i18n.global.t('application.name')];
	const pageTitle = to.meta.title?.toString() ?? null;
	if (pageTitle !== null) titleParts.push(pageTitle);
	document.title = titleParts.join(' | ');
});

export default router;
