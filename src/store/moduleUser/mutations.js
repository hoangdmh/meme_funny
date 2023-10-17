import Vue from 'vue';

export default {
    // increment (state) {
    //     state.count++
    // }
    SET_USER_INFO(state, userid){
        //console.log('Mutation User',userid);
        Vue.set(state.users, userid.USERID, userid)
    }
}