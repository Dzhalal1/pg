import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/home'
    },
    {
        path: '/tabs/',
        component: Tabs,
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'subjects',
                component: () => import('@/views/Subjects.vue')
            },
            {
                path: 'home',
                component: () => import('@/views/Home.vue'),
                name: 'Home'
            },
            {
                path: 'profile',
                component: () => import('@/views/Profile.vue')
            },
            {
                path: 'rating',
                component: () => import('@/views/Rating.vue')
            }

        ]
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && localStorage.getItem('token') === null) {
        next({name: 'Login'})
    } else {
        next()
    }
})
export default router
