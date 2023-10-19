import axiosInstance from '../../plugins/axios';
import {parseJwt} from '../../helpers';

export default {
    // increment ({ commit }) {
    //     commit('increment')
    // }
    async getUserById({commit}, userid){
        commit('SET_LOADING', true);

        try {
            var result = await axiosInstance.get(`/member/member.php?userid=${userid}`);
            commit('SET_LOADING', false);

            if(result.data && result.data.status == 200){
                commit('SET_USER_INFO', result.data.user);

                return {
                    ok: true,
                    data: result.data.user,
                    error: null,
                }
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async login({commit}, {email = '', password = ''}){
        commit('SET_LOADING', true);

        try {
            var data = {
                email: email,
                password: password
            }

            var result = await axiosInstance.post('/member/login.php', data);
            commit('SET_LOADING', false);

            if(result.data && result.data.status === 200){
                // console.log('result =>', result.data);
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data);

                return {
                    ok: true,
                    data: result.data,
                    error: null,
                }
            }else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }

        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async checkLogin({commit, dispatch}){
        try {
            var token = localStorage.getItem('ACCESS_TOKEN');
            var userObj = parseJwt(token);

            if(userObj){
                var resultUserObj = await dispatch('getUserById', userObj.id);
                if(resultUserObj.ok){
                    var data = {
                        token: token,
                        user: resultUserObj.data
                    }
                    commit('SET_LOGIN_INFO', data);
                    return {
                        ok: true,
                        error: null
                    }
                }
            }
            return {
                ok: false
            }

            console.log('resultUserObj', resultUserObj);

        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async logout({commit}){
        commit('SET_LOGOUT');
        return null;
    }
}