import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CalculatorView from '../views/CalculatorView.vue';
import DpsCalculatorView from '../views/DpsCalculatorView.vue';
import TaxCalculatorView from '../views/TaxCalculatorView.vue';
import NotFoundView from '../views/NotFoundView.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Hisab — Everyday calculations, made simple' }
  },
  {
    path: '/tools/calculator',
    name: 'Calculator',
    component: CalculatorView,
    meta: { title: 'Calculator — Hisab' }
  },
  {
    path: '/tools/dps-calculator',
    name: 'DpsCalculator',
    component: DpsCalculatorView,
    meta: { title: 'DPS Calculator — Hisab' }
  },
  {
    path: '/tools/tax-calculator',
    name: 'TaxCalculator',
    component: TaxCalculatorView,
    meta: { title: 'Bangladesh Tax Calculator — Hisab' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: 'Page Not Found — Hisab' }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
