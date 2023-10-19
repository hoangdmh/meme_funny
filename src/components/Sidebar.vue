<template>
    <aside class="ass1-aside">
        <div class="ass1-content-head__t">
            <div>Bài viết gần đây của bạn.</div>
        </div>
        <div v-if="!isLogin">Vui lòng đăng nhập để xem nội dung này
            <router-link to="/login">Đăng nhập</router-link>
        </div>
        <div v-else-if="isLogin && getListPostOfCurrentUser && getListPostOfCurrentUser.length">
            <post-item 
                v-for="post in getListPostOfCurrentUser"
                :key="post.PID"
                v-bind:post="post"
            />
        </div>
    </aside>
</template>

<script>

import { mapGetters } from 'vuex';
import PostItem from './PostItem';

export default {
  components: { PostItem },
    name: 'sidebar',
    computed: {
        ...mapGetters([
            'isLogin',
            'getListPostOfCurrentUser'
        ])
    },
}
</script>

<style></style>