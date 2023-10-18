import Vue from 'vue';

export default {
    // increment (state) {
    //     state.count++
    // }
    SET_USER_INFO(state, userid){
        //console.log('Mutation User',userid);
        Vue.set(state.users, userid.USERID, userid)
    },
    SET_LOGIN_INFO(state, data){
        localStorage.setItem('ACCESS_TOKEN', data.token);
        state.ACCESS_TOKEN = data.token;
        state.currentUser = data.user;
    }
}  