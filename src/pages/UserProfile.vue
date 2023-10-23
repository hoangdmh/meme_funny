<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Profile</p>

            <div class="ass1-login__form">
                <div class="avatar">
                    <img :src="getAvatar" alt="">
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

                    <input 
                        v-on:change="uploadAvatar"
                        type="file" name="avatar" placeholder="Ảnh đại diện" class="form-control">

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
            avatar: {
                objFile: null,
                base64URL: ''
            }
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
        getAvatar(){
            if(this.currentUser && this.avatar.base64URL){
                return this.avatar.base64URL
            }else {
                return this.currentUser.profilepicture;
            }
        }
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
        },
        uploadAvatar(e){
            if(e.target.files && e.target.files.length){
                const fileAvatar = e.target.files[0];
                console.log('fileAvatar', fileAvatar);

                let reader = new FileReader();
                reader.addEventListener("load",() => {
                        // convert image file to base64 string
                        let previewUrl = reader.result;
                        // console.log('previewUrl', previewUrl);
                        this.avatar.objFile = fileAvatar;
                        this.avatar.base64URL = previewUrl;
                    },
                    false,
                );

                if (fileAvatar) {
                    reader.readAsDataURL(fileAvatar);
                }
            }

        }
    },
}
</script>

<style></style>