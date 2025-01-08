import { createRouter, createWebHistory } from 'vue-router';

// @ts-ignore
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: '/home',
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                hideMenu: false,
            },
            component: () => import('/@/views/login/index.vue'),
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('/@/views/home/index.vue'),
        },
    ],
});

// 路由加载前
router.beforeEach((to: any, from: any, next: any) => {
    next();
});

// 路由加载后
router.afterEach(() => {
    // console.log('路由加载后');
});

export default router;
