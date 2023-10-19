import {parseJwt} from '../../helpers';

export default {
    // test: state => {
    //     return state
    // }
    isLogin: state => {
        var token = parseJwt(state.ACCESS_TOKEN);
        
        if(token){
            return true;
        }else {
            return false
        }
    },
    getListPostOfCurrentUser: state => {
        if(state.currentUser){
            let userCurrent = state.currentUser.USERID
            return state.posts[userCurrent];
        }
        return null;
    }
}