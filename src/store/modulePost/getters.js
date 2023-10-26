export default {
    getListPost: state => {
        return state.listPost
    },
    getListPostDetail(state, getters, rootState) {
        // console.log('state', state);
        // console.log('getters', getters);
        // console.log('rootState', rootState); 

        if(state.postDetail && state.postDetail.post){            
            var USERID =  state.postDetail.post.USERID;
            var user = rootState.user.users[USERID];
            
            //Đưa thông tin user + post by user id vào biến data
            var data = {
                post: {
                    ...state.postDetail.post,
                    fullname: user.fullname,
                    profilepicture: user.profilepicture,
                    
                },
                categories: state.postDetail.categories,
                comments: state.postDetail.comments,
            }
        }

        return data;
    }
}