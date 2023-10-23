<template>
    <div class="ass1-head-user" v-if="userInfo">
        <div class="ass1-head-user__content">
            <div class="ass1-head-user__image"><a href="#"><img :src="getAvatar" alt=""></a></div>
            <div class="ass1-head-user__info">
                <div class="ass1-head-user__info-head">
                    <div class="ass1-head-user__name">
                        <span>{{ userInfo.fullname }}</span>
                        <i><img src="/dist/fonts/emotion/svg/Verified.svg" alt=""></i>
                    </div>
                    <div class="w-100"></div>
                    <a href="#" class="ass1-head-user__btn-follow ass1-btn" v-if="!isCurrentUser">Theo dõi</a>
                    <template v-else>
                        <router-link 
                            :to="{ name: 'change-password', params: { id: userInfo.USERID }}"
                            class="ass1-head-user__btn-follow ass1-btn"
                        >Đổi mật khẩu</router-link>
                        <router-link 
                            :to="{ name: 'user-profile', params: { id: userInfo.USERID }}" 
                            class="ass1-head-user__btn-follow ass1-btn"
                        >Profile</router-link>
                    </template>
                </div>
                <div class="ass1-head-user__info-statistic">
                    <div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{ userInfo.profileviews }}</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Followers"></i><span>Theo dõi: {{ userInfo.yourviewed }}</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Following"></i><span>Đang theo dõi: {{ userInfo.youviewed }}</span></div>
                </div>
                <p>{{ userInfo.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'user-page-info',
    props: {
        userInfo: {
            type: Object,
            default: null
        },
    },
    computed: {
        ...mapState({
            currentUser: state => state.user.currentUser,
        }),
		getAvatar(){
            if(this.userInfo && this.userInfo.profilepicture){
                return this.userInfo.profilepicture
            }
            return `/dist/images/avatar-02.png`
        },
        isCurrentUser(){
            if(this.userInfo && this.currentUser){
                if(this.userInfo.USERID == this.currentUser.USERID) return true;
            }
            return false;
        }
    },
}
</script>

<style></style>