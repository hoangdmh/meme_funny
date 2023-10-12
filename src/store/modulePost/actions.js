import axiosInstance from '../../plugins/axios';

export default {
    async getListPostHasPaging ({ commit }, { pagesize = 3, currPage = 1 }) {
        //console.log('getListPost to run!');
        try {
            // var result = await axiosInstance.get(`/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`);
            var config = {
                params: {
                    pagesize,
                    currPage
                }
            }
            var result = await axiosInstance.get('/post/getListPagination.php', config);
            if(result.data && result.data.status == 200){
                commit('SET_LIST_POST', result.data.posts)
            }
            //console.log(result);
        }catch(error){
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