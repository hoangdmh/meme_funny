<template>
    <!--comment-->
    <div class="ass1-comments__section">
        <a href="#" class="ass1-comments__avatar ass1-avatar"><img :src="getAvatar" alt=""></a>
        <div class="ass1-comments__content">
            <a href="#" class="ass1-comments__name">{{ comment.fullname }}</a>
            <span class="ass1-comments__passed">{{ getDateNow }}</span>
            <p>{{ comment.comment }}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'post-comment-item',
    props: {
        comment: {
            type: Object,
            default: null
        },
    },
    computed: {
        getAvatar(){
            if(this.comment.profilepicture){
                return this.comment.profilepicture
            }
            return `/dist/images/avatar-02.png`
        },
        getDateNow() {
            moment.locale('vi');
            return moment(this.comment.time_added).fromNow();
        }
    },
}
</script>

<style></style>