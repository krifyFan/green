import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/home.vue'
// import ECharts from '../views/echarts.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		// redirect: '/echarts',
		component: Home
	},
	// {
	// 	path: "/echarts",
	// 	name: "echarts",
	// 	component: ECharts
	// }
];

const router = new VueRouter({
  routes
});

export default router;
