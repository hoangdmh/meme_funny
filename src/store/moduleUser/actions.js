import axiosInstance from '../../plugins/axios';

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
    }
}