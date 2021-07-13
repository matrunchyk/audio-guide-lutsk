import { createRouter, createWebHistory } from 'vue-router'

import MapPage from '../pages/MapPage.vue';
import ErrorPage from '../components/ErrorPage.vue';
import AppVenues from "@/components/AppVenues.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'list',
            component: AppVenues,
        },
        {
            path: '/map',
            name: 'map',
            component: MapPage,

        },
        {
            path: '/error',
            name: '404',
            component: ErrorPage,
        },
    ]
})