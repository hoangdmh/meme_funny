<template>
    <div class="ass1-login">
        <div class="ass1-login__logo">
            <router-link to="/" class="ass1-logo">Meme Meme</router-link>
        </div>
        <div class="ass1-login__content">
            <p>Đăng nhập</p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="handleLogin">
                    <input 
                        type="text" class="form-control" placeholder="Email" required=""
                        v-model="email"
                    >
                    <div class="ass1-input-copy">
                        <input 
                        type="password" class="form-control" placeholder="Mật khẩu" required=""
                        v-model="password"
                        >
                        <a href="#">Copy</a>
                    </div>
                    <div class="ass1-login__send">
                        <router-link to="/register">Đăng ký một tài khoản</router-link>
                        <button type="submit" class="ass1-btn">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleLogin(e) {
            var data = {
                email: this.email,
                password: this.password
            }
            
            this.$store.dispatch('login', data).then(res => {
                console.log('res from handLogin =>', res);
                if(!res.ok){
                    if(typeof res.ok == 'string' ){
                        alert(res.error)
                    }else {
                        alert(res.error.join(' '));
                    }
                }else {
                    this.$router.push('/');
                }
            })
        }
    },
}
</script>

<style scoped>
    .ass1-btn {
        cursor: pointer;
    }
</style>