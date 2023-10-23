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
    async login({commit, dispatch}, {email = '', password = ''}){
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

                dispatch('getListPostByUserId', result.data.user.USERID);
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
                // var resultUserObj   = await dispatch('getUserById', userObj.id);
                // var resultPostUser  = await dispatch('getListPostByUserId', userObj.id);

                // code của resultUserObj chạy hết 3s
                // code của resultPostUser chạy hết 4s
                // Tổng time cần hết 7s, nhưng 2 lần call api đó có thể chạy song song
                // Vì vậy dùng Promise.all() để giải quyết vấn đề code chạy đồng thời song song

                var promiseUserObj   = dispatch('getUserById', userObj.id);
                var promisePostUser  = dispatch('getListPostByUserId', userObj.id);

                var [resultUserObj, resultPostUser] = await Promise.all([promiseUserObj, promisePostUser]);


                if(resultUserObj.ok && resultPostUser.ok){
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
    },
    async getListPostByUserId({commit}, userid){
        try {
            let config = {
                params: {
                    userid: userid,
                },
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                    // 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            }
            //console.log('config', config);
            var result = await axiosInstance.get('/post/getListPostUserID.php', config);
            //console.log('getListPostByUserId', result.data);
            if(result.data.status === 200) {
                var dataObj = {
                    userid: userid,
                    post: result.data.posts
                }
                commit('SET_USER_POST', dataObj)
                return {
                    ok: true, 
                    data: result.data.posts,
                    error: null
                }
            }
            return {
                ok: false, 
                error: null
            }

        } catch (error) {
            return {
                ok: false, 
                error: error.message
            }
        }
    },
    async register({commit, dispatch}, data){
        commit('SET_LOADING', true);
        try {
            // console.log('Action data =>', data);
            var dataRegister = {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                repassword: data.repassword
            }
            var result = await axiosInstance.post('/member/register.php', dataRegister);
            commit('SET_LOADING', false);

            if(result.data && result.data.code === 200){
                console.log('Action result =>', result);
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data);
                dispatch('getListPostByUserId', result.data.user.USERID);

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
    }
}