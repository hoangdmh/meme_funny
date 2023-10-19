// xác thực router

import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
    //1. Router cho phép vào khi chưa đăng nhập (Login, Register)

    var isLogin = store.getters.isLogin;
    if(!isLogin){//false
        next();//cho phép vào router đó
    }else {
        next({
            name: 'home-page',
            query: {
                redirect: to.name
            }
        });
    }
}

const ifAuthenticated = (to, from, next) => {
    //2. Router chỉ dc vào khi đả login
    var isLogin = store.getters.isLogin;
    if(isLogin){//true
        next();//cho phép vào router đó
    }else {
        next({
            name: 'login',
            query: {
                redirect: to.name
            }
        });
    }
}

export {
    ifNotAuthenticated,
    ifAuthenticated
}