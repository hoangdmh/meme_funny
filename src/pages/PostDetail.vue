<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="ass1-section__post-detail section__list" v-if="getListPostDetail && getListPostDetail.post">
                <div class="ass1-section">
                    <post-item v-bind:post="getListPostDetail.post" />

                    <ul class="category">
                        <li v-for="item in getListPostDetail.categories" :key="item.TAG_ID">
                            <router-link 
                                :to="getLinkCategory(item)"
                            >
                                {{ item.tag_value }}
                            </router-link>
                        </li>
                    </ul>
                    <!-- <post-feeling /> -->
                </div>
                <post-comment-add />
                <post-comments v-bind:comments="getListPostDetail.comments"/>
            </div>
        </div>
        <div class="col-lg-4">
            <sidebar />
        </div>
    </div>
</template>

<script>
import PostCommentAdd from '../components/PostCommentAdd'
import PostComments from '../components/PostComments'
import PostFeeling from '../components/PostFeeling'
import PostItem from '../components/PostItem'
import Sidebar from '../components/Sidebar'

import { mapGetters } from 'vuex';
import {removeVietnameseFromString} from '../helpers';

export default {
    name: 'post-detail',
    components: { Sidebar, PostItem, PostFeeling, PostCommentAdd, PostComments },
    data() {
        return {
            postId: this.$route.params.id,
        }
    },
    watch: {
        '$route'(to, from) {
            this.postId = to.params.id;
            //console.log('To =>', to.params.id);
            this.fetchDataPostDetail();
        }
    },
    created () {// xử lý trong trường hợp load lại trang lần đầu tiên
        this.fetchDataPostDetail();
    },
    computed: {
        ...mapGetters([
            'getListPostDetail',
        ])
    },
    methods: {
        fetchDataPostDetail() {
            this.$store.dispatch('getPostDetailById', this.postId).then(res => { 
                if(!res.ok){
                    this.$router.push('/')
                }
            });
        },
        getLinkCategory(category) {
            return {
                name: 'home-page', 
                query: {
                    text: removeVietnameseFromString(category.tag_value), 
                    tagIndex: category.tag_index 
                }
            }
        }
    },
}
</script>

<style lang="css" scoped>
    .category {
        display: flex;
        flex-wrap: wrap;
    }
    .category li {
        padding: 5px 10px;
    }
</style>>