import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'
import First from  '../views/First.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/tab1'
    },
    {
        path: '/tabs/',
        component: Tabs,
        children: [
            {
                path: '',
                redirect: 'tab1'
            },
            {
                path: 'tab1',
                component: () => import('@/views/Tab1.vue')
            },
            {
                path: 'tab2',
                component: () => import('@/views/Tab2.vue')
            },
            {
                path: 'tab3',
                component: () => import('@/views/Tab3.vue')
            },
            {
                path: 'subjects',
                component: () => import('@/views/Subjects.vue')
            },
            {
                path: 'home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'profile',
                component: () => import('@/views/Profile.vue')
            }

        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/first',
        component: First
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
