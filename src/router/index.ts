import { createRouter, createWebHistory } from 'vue-router';
import { loadFinish } from '@/utils/app';

// @ts-ignore
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/firstPage/home/index.vue'),
        },
        {
            path: '/message',
            name: 'Message',
            component: () => import('@/views/firstPage/message/index.vue')
        },
        {
            path: '/center',
            name: 'Center',
            component: () => import('@/views/firstPage/center/index.vue'),
        },
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('@/views/firstPage/cart/index.vue'),
        },
        {
            path: '/app',
            name: 'App',
            component: () => import('@/views/firstPage/app/index.vue'),
        },
        {
            path: '/details',
            name: 'Details',
            component: () => import('@/views/details/index.vue'),
        },
        {
            path: '/details2',
            name: 'Details2',
            component: () => import('@/views/details/details2.vue'),
        },
    ],
});

// 路由加载前
router.beforeEach((to: any, from: any, next: any) => {
    next();
});

// 路由加载后
router.afterEach(async (to: any, from: any, next: any) => {
    // 加载完成，页面加载基础界面后給Android端此回调。通知Android端已经完成页面的基础加载。建议每个页面都需要调用此方法。
    await nextTick();
    loadFinish();
});

export default router;
