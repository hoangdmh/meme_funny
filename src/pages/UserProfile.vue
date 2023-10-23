<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Profile</p>

            <div class="ass1-login__form">
                <div class="avatar">
                    <img src="/dist/images/avatar-01.png" alt="">
                </div>
                <form action="#" v-if="currentUser" v-on:submit.prevent="handleEditProfile">
                    <input 
                        type="text" class="form-control" placeholder="Tên ..." required=""
                        v-bind:value="currentUser.fullname"
                        v-on:input="fullname = $event.target.value"
                    >

                    <select 
                        class="form-control"
                        v-bind:value="currentUser.gender"
                        v-on:change="gender = $event.target.value"
                    >
                        <option value="" disabled>Giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                    </select>

                    <input type="file" name="avatar" placeholder="Ảnh đại diện" class="form-control">

                    <textarea 
                        class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."
                        v-bind:value="currentUser.description"
                        v-on:input="description = $event.target.value"
                    ></textarea>

                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'user-profile',
    data() {
        return {
            userId: this.$route.params.id,
            fullname: '',
            gender: '',
            description: '',
            avatarFile: null
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
        ])
    },
    methods: {
        checkIsCurrentUser() {
            if(this.userId && this.currentUser){
                if(this.userId != this.currentUser.USERID){
                    this.$router.push('/')
                }
            }
        },
        handleEditProfile(e){
            console.log('fullname', this.fullname);
            console.log('gender', this.gender);
            console.log('description', this.description);
        }
    },
}
</script>

<style></style>