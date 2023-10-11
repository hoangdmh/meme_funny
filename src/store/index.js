import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moduleExample from './moduleExample';

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        moduleExample: moduleExample
    }
})

export default store;