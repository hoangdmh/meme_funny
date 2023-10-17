import axiosInstance from '../../plugins/axios';
import { PAGE_SIZE, CURRENT_PAGE } from '../../constants';

export default {
    async getListPostHasPaging ({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }) {
        //console.log('getListPost to run!');
        commit('SET_LOADING', true);
        try {
            // var result = await axiosInstance.get(`/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`);
            var config = {
                params: {
                    pagesize,
                    currPage
                }
            }

            if(tagIndex){
                config.params.tagIndex = tagIndex;
                var result = await axiosInstance.get('/post/getListByCategory.php', config);
            }else {
                var result = await axiosInstance.get('/post/getListPagination.php', config);
            }
            
            commit('SET_LOADING', false);

            if(result.data && result.data.status == 200){
                if(currPage === 1){
                    commit('SET_LIST_POST', result.data.posts)
                }
                if(currPage > 1){
                    commit('PUSH_LIST_POST', result.data.posts);
                    // console.log('result.data.posts', result.data.posts.length, result.data.posts);
                }
            }
            //console.log(result);
        }catch(error){
            commit('SET_LOADING', false);
            //console.log(error);
        }
    },

    async getPostDetailById ({ commit }, postid) {
        commit('SET_LOADING', true);

        try {
            var result = await axiosInstance.get(`/post/post.php?postid=${postid}`);            
            commit('SET_LOADING', false);

            if(result.data && result.data.status == 200){
                commit('SET_POST_DETAIL', result.data.data)
                console.log('Data action', result.data.data);
                return {
                    ok: true,
                    data: result.data.data,
                    error: null,
                }
            }
            
        }catch(error){
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    }
}