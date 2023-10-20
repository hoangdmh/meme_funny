<template>
    <div class="ass1-login">
        <div class="ass1-login__logo">
            <a href="index.html" class="ass1-logo">Hoang Meme</a>
        </div>
        <div class="ass1-login__content">
            <p>Đăng ký một tài khoản</p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="handleSubmitRegister">
                    <input 
                        type="text" class="form-control" placeholder="Tên hiển thị" required=""
                        v-model="fullname"
                    >
                    <input 
                        type="email" class="form-control" placeholder="Email" required=""
                        v-model="email"
                    >
                    <input 
                        type="password" class="form-control" placeholder="Mật khẩu" required=""
                        v-model="password"
                    >
                    <input 
                        type="password" class="form-control" placeholder="Nhập lại mật khẩu" required=""
                        ref="repassword"
                        v-model="repassword"
                    >
                    <div class="ass1-login__send">
                        <router-link to="/login">Đăng nhập</router-link>
                        <button type="submit" class="ass1-btn">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            fullname: '',
            email: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        handleSubmitRegister() {
            var data = {
                fullname: this.fullname,
                email: this.email,
                password: this.password,
                repassword: this.repassword
            }

            if(this.password != this.repassword) {
                alert('Mật khẩu nhập lại không đúng!');
                this.repassword = '';
                this.$refs.repassword.focus();
            }

            this.$store.dispatch('register', data).then(res => {
                // console.log('res from handleRegister =>', res);
                if(!res.ok){
                    alert(res.error);
                }else {
                    this.$router.push('/');//đăng ký thành công thì đẩy về trang chủ
                }
            })
            //console.log('handleRegister', data);
        }
    },
}
</script>

<style></style>