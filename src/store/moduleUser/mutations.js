import Vue from 'vue';

export default {
    // increment (state) {
    //     state.count++
    // }
    SET_USER_INFO(state, userid){//lưu vào state dạng object key value
        //console.log('Mutation User',userid);
        Vue.set(state.users, userid.USERID, userid)
    },
    SET_LOGIN_INFO(state, data){
        localStorage.setItem('ACCESS_TOKEN', data.token);
        state.ACCESS_TOKEN = data.token;
        state.currentUser = data.user;
    },
    SET_LOGOUT(state){
        state.ACCESS_TOKEN = '',
        state.currentUser = null;
        localStorage.removeItem('ACCESS_TOKEN');
    },
    SET_USER_POST(state, {userid, post}){//lưu vào state dạng object key value
        Vue.set(state.posts, userid, post)
    },
    SET_CURRENT_USER(state, user){
        // console.log('Mutation SET_CURRENT_USER', user);
        state.currentUser = user
    },
}  