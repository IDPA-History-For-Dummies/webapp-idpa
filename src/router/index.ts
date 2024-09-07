// Composables
import {createRouter, createWebHistory} from 'vue-router';
import {RouteNames} from "@/compositions/helpers/route";
import i18n from "@/plugins/i18n";
import EventDetail from "@/views/events/EventDetail.vue";
import Events from "@/views/events/Events.vue";
import Programming from "@/views/Programming.vue";
import Quiz from "@/views/quiz/Quiz.vue";

const routes = [
	{
		path: '/',
		alias: ['', '/events'],
		name: RouteNames.events,
		component: Events,
		meta: {
			title: i18n.global.t('page.events'),
		},
	},
	{
		path: '/event/:term',
		name: RouteNames.eventDetail,
		component: EventDetail,
		meta: {
			title: i18n.global.t('page.eventDetail'),
		},
	},
	{
		path: '/quiz/:term',
		name: RouteNames.quiz,
		component: Quiz,
		meta: {
			title: i18n.global.t('page.quizDetail'),
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
