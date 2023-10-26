export default {
    SET_LIST_POST (state,data) {
        state.listPost = data
    },
    PUSH_LIST_POST(state, data){
        state.listPost = [...state.listPost, ...data]
    },
    SET_POST_DETAIL(state, data){
        // console.log('Data Mutation', data);
        state.postDetail = data;
    },
    PUSH_LIST_COMMENT(state, comment){
        console.log('PUSH_LIST_COMMENT', comment);
        state.postDetail.comments.push(comment);
    }
}


// Trường hợp nếu current = 1 -> Thay thế array gốc 
// Trường hợp nếu current = 2, 3, 4 -> Đẩy thêm dữ liệu vào ( nối 2 array lại với nhau )