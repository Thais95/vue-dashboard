import { createWebHistory, createRouter } from 'vue-router';

import MainDashboard from '../pages/MainDashboard.vue';
import ErrorNotFound from '../pages/ErrorNotFound.vue';

const routes = [
	{
		path: '/',
		name: 'MainDashboard',
		component: MainDashboard,
	},
	{
		path: '/:catchAll(.*)*',
		name: 'ErrorNotFound',
		component: ErrorNotFound
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
