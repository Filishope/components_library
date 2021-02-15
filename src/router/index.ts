import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/spanTable',
    name: 'spanTable',
    component: () => import('../views/spanTable/index.vue')
  },
  {
    path: '/waterFall',
    name: 'waterFall',
    component: () => import('../views/waterFall/index.vue')
  }
];

const router = new VueRouter({
  routes,
});

export default router;
