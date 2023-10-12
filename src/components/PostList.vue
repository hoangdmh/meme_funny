<template>
    <div class="ass1-section__list">
        <post-item 
            v-for="item in getListPost"
            :key="item.PID"
            v-bind:post="item"
        />
        <button 
            v-if="getListPost && getListPost.length" 
            class="load-more ass1-btn"
            @click="handleLoadMore"
        >
            <span>Xem thêm</span>
        </button>
    </div>
</template>

<script>
import PostItem from './PostItem'
import { PAGE_SIZE, CURRENT_PAGE } from '../constants';

import { mapGetters } from 'vuex';

export default {
    name: 'post-list',
    data() {
        return {
            pagesize: PAGE_SIZE,
            currPage: CURRENT_PAGE,
            tagIndex: parseInt(this.$route.query.tagIndex)
        }
    },
    components: { PostItem },
    computed: {
        ...mapGetters([
            'getListPost',
        ])
    },
    watch: {
        '$route'(to, from){
            this.tagIndex = to.query.tagIndex;         
            this.currPage = 1;
            // console.log('postList.vue', to);
        }
    },
    methods: {
        handleLoadMore() {
            this.currPage = this.currPage + 1;
            var obj = {
                pagesize: this.pagesize,
                currPage: this.currPage,
                tagIndex: this.tagIndex
            }
            console.log(obj);
            this.$store.dispatch('getListPostHasPaging', obj);
        }
    },
}
</script>

<style></style>