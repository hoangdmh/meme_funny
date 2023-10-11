import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import post from './modulePost';
import user from './moduleUser';

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        post: post,
        user: user
    }
})

export default store;