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

    async getPostDetailById ({ commit, dispatch }, postid) {
        commit('SET_LOADING', true);

        try {
            var result = await axiosInstance.get(`/post/post.php?postid=${postid}`);            
            
            if(result.data && result.data.status == 200){
                //Call API user by id
                var userID = result.data.data.post.USERID;
                var resultUser = await dispatch('getUserById',userID)
                commit('SET_LOADING', false);
                commit('SET_POST_DETAIL', result.data.data)
                
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
    },

    async getListPostSearch({commit}, data){
        commit('SET_LOADING', true);
        try {
            
            var result = await axiosInstance.get(`/post/search.php?query=${data}`);
            commit('SET_LOADING', false);
            //console.log('result =>', result);
            if(result.data && result.data.status == 200){

                return {
                    ok: true,
                    data: result.data.posts,
                    error: null,
                }
            }else {
                return {
                    ok: false,
                }
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },

    async createNewPost({commit}, {obj_image = null, url_image = '', post_content = '', category = '' }){
        commit('SET_LOADING', true);

        try {
            let bodyFormData = new FormData();

            bodyFormData.append('url_image', url_image);
            bodyFormData.append('post_content', post_content);
            bodyFormData.append('category', category);

            //for avatar image
            if(obj_image){
                bodyFormData.append('obj_image', obj_image);
            }

            let config = {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                    'Content-Type': 'multipart/form-data' 
                }
            }

            var result = await axiosInstance.post('/post/addNew.php', bodyFormData, config);
            commit('SET_LOADING', false);
            console.log('createPost =>', result);

            if(result.data.status === 200){
                return {
                    ok: true,
                    message: result.data.message
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