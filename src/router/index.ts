// Composables
import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import {RouteNames} from "@/compositions/helpers/route";
import Base from "@/layouts/Base.vue";
import LayoutModal from "@/layouts/LayoutModal.vue";
import Login from "@/views/Login.vue";
import LayoutApplication from "@/layouts/LayoutApplication.vue";
import Test from "@/views/Test.vue";
import i18n from "@/plugins/i18n";
import NotFound from "@/views/NotFound.vue";
import {useAuthStore} from "@/store/auth";

const routes = [
	{
		path: '',
		component: Base,
		children: [
			{
				path: '/login',
				component: LayoutModal,
				children: [
					{
						path: '',
						name: RouteNames.login,
						component: Login,
						meta: {
							title: i18n.global.t('page.login'),
						},
					},
				],
			},
			{
				path: '/not-found',
				component: LayoutModal,
				children: [
					{
						path: '',
						name: RouteNames.notFound,
						component: NotFound,
						meta: {
							title: i18n.global.t('page.notFound'),
						},
					},
				],
			},
			{
				path: '',
				component: LayoutApplication,
				children: [
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
						path: '/test',
						name: RouteNames.test,
						component: Test,
						meta: {
							title: i18n.global.t('page.test'),
						},
					},
				],
			},
		],
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

	//handle auth
	const authStore = useAuthStore();
	if (!authStore.isLoggedIn && to.name !== RouteNames.login) {
		return {name: RouteNames.login};
	} else if (authStore.isLoggedIn && to.name === RouteNames.login) {
		return {name: RouteNames.home};
	}
});

export default router;
