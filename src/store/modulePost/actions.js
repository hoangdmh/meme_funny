import axiosInstance from '../../plugins/axios';

export default {
    async getListPostHasPaging ({ commit }, { pagesize = 3, currPage = 1, tagIndex = null }) {
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
                commit('SET_LIST_POST', result.data.posts)
            }
            //console.log(result);
        }catch(error){
            commit('SET_LOADING', false);
            //console.log(error);
        }
    },

    async getListPostByCategory ({ commit }, { pagesize = 3, currPage = 1, tagIndex= 1 }) {
        //console.log('getListPost to run!');
        try {
            // var result = await axiosInstance.get(`/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`);
            var config = {
                params: {
                    pagesize,
                    currPage,
                    tagIndex
                }
            }
            var result = await axiosInstance.get('/post/getListByCategory.php', config);
            if(result.data && result.data.status == 200){
                commit('SET_LIST_POST', result.data.posts)
            }
            //console.log(result);
        }catch(error){
            //console.log(error);
        }
    }
}