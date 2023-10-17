<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="ass1-section__post-detail section__list">
                <div class="ass1-section">
                    <post-item />
                    <post-feeling />
                </div>
                <post-comment-add />
                <post-comments />
            </div>
        </div>
        <div class="col-lg-4">
            <sidebar />
            <aside class="ass1-aside">
                <div class="ass1-content-head__t">
                    <div>Bài viết gần đây.</div>
                </div>
                <div class="ass1-section">
                    <div class="ass1-section__head">
                        <a href="#" class="ass1-section__avatar ass1-avatar"><img src="/dist/images/avatar-03.png" alt=""></a>
                        <div>
                            <a href="#" class="ass1-section__name">Trần Văn A</a>
                            <span class="ass1-section__passed">20 phút trước</span>
                        </div>
                        <!-- <a href="#" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></a> -->
                    </div>
                    <div class="ass1-section__content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum tempore recusandae, nemo consequuntur rem pariatur ducimus dolorem aperiam nesciunt dolore, ratione aut, corporis laborum? Numquam ad magnam consectetur labore quam?</p>
                    </div>
                    <div class="ass1-section__footer">
                        <a href="#" class="ass1-section__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a>
                        <a href="#" class="ass1-section__btn-downvote ass1-btn-icon"><i class="icon-Downvote"></i></a>
                        <!-- <a href="#" class="ass1-section__btn-repost ass1-btn-icon"><i class="icon-Repost"></i></a> -->
                        <a href="#" class="ass1-section__btn-like ass1-btn-icon"><i class="icon-Favorite_Full"></i><span>1,274</span></a>
                        <a href="#" class="ass1-section__btn-comment ass1-btn-icon"><i class="icon-Comment_Full"></i><span>982</span></a>
                    </div>
                </div>

            </aside>
        </div>
    </div>
</template>

<script>
import PostCommentAdd from '../components/PostCommentAdd'
import PostComments from '../components/PostComments'
import PostFeeling from '../components/PostFeeling'
import PostItem from '../components/PostItem'
import Sidebar from '../components/Sidebar'


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
    methods: {
        fetchDataPostDetail() {
            this.$store.dispatch('getPostDetailById', this.postId).then(res => { 
                if(!res.ok){
                    this.$router.push('/')
                }
            });
        }
    },
}
</script>

<style>

</style>