<template>
    <div class="ass1-section__head">
        <router-link 
            :to="{ name: 'user-page', params: { id: post.USERID }}" 
            class="ass1-section__avatar ass1-avatar"
        >
            <img :src="getAvatar" alt="">
        </router-link>
        <div>
            <router-link 
                :to="{ name: 'user-page', params: { id: post.USERID }}" 
                class="ass1-section__name"
            >
                {{ post.fullname }}
            </router-link>
            <span class="ass1-section__passed">{{ getDateNow }}</span> 
        </div>
        <router-link 
            :to="{ name: 'user-page', params: { id: post.USERID }}" 
            class="ass1-section__link ass1-btn-icon">
            <i class="icon-Link"></i>
        </router-link>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'post-item-header',
    data() {
        return {
            date1: 'abc'
        }
    },
    props: {
        post: {
            type: Object,
            default: null
        },
    },
    computed: {
        getAvatar(){
            if(this.post.profilepicture){
                return this.post.profilepicture
            }
            return `/dist/images/avatar-02.png`
        },
        getDateNow() {
            moment.locale('vi');
            return moment(this.post.time_added).fromNow();
        }
    },
    methods: {
        
    },
}
</script>

<style></style>