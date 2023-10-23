import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import ChangePassword from './pages/ChangePassword'
import PostDetail from './pages/PostDetail'
import PostUpload from './pages/PostUpload'
import UserPage from './pages/UserPage'
import UserProfile from './pages/UserProfile'

import {ifNotAuthenticated, ifAuthenticated} from './plugins/authenticate';

const routes = [
    { 
        path: '/', 
        name: 'home-page',
        component: HomePage 
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    },
    { 
        path: '/register', 
        name: 'register',
        component: Register,
        beforeEnter: ifNotAuthenticated
    },
    { 
        path: '/user/:id', 
        name: 'user-page',
        component: UserPage,
        beforeEnter: ifAuthenticated
    },
    { 
        path: '/user/:id/profile', 
        name: 'user-profile',
        component: UserProfile,
        beforeEnter: ifAuthenticated
    },
    { 
        path: '/user/:id/password', 
        name: 'change-password',
        component: ChangePassword 
    },
    { 
        path: '/post-detail/:id', 
        name: 'post-detail',
        component: PostDetail
    },
    {
        path: '/upload',
        name: 'upload',
        component: PostUpload,
    },
];


const router = new VueRouter({
    routes
});

export default router;