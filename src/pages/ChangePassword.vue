<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Đổi mật khẩu</p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="changePassword">
                    <input v-model="oldPassword" type="password" class="form-control" placeholder="Mật khẩu cũ">
                    <input v-model="newPassword" type="password" class="form-control" placeholder="Mật khẩu mới">
                    <input v-model="reNewPassword" type="password" class="form-control" placeholder="Xác nhận mật khẩu mới">
                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Gửi</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'change-password',
    data() {
        return {
            userId: this.$route.params.id,
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
        }
    },
    watch: {
        '$route' (to, from){
            this.userId = to.params.id;
            this.checkIsCurrentUser();
        }
    },
    created () {
        this.checkIsCurrentUser();
    },
    computed: {
        ...mapGetters([
            'currentUser',
        ]),
    },
    methods: {
        checkIsCurrentUser() {
            if(this.userId && this.currentUser){
                if(this.userId != this.currentUser.USERID){
                    this.$router.push('/')
                }
            }
        },
        changePassword(){
            let { oldPassword, newPassword, reNewPassword } = this;

            if(oldPassword && newPassword && reNewPassword){
                if(oldPassword == newPassword){
                    alert('Mat khau mơi khong duoc trung voi mat khau cu');
                }else if(newPassword != reNewPassword){
                    alert('Mat khau nhap lai khong dung');
                }else {
                    let data = {
                        oldPassword,
                        newPassword,
                        reNewPassword
                    }

                    // console.log('data =>',data);
                    this.$store.dispatch('changePassword', data).then(res => {
                        if(res.ok){
                            alert(res.message);
                            this.$router.push('/')
                        }else {
                            alert(res.error);
                        }
                    })
                }
            }else {
                alert('Vui long nhap day du thong tin');
            }
        }
    },
}
</script>

<style>

</style>