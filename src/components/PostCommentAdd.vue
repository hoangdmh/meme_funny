<template>
    <div class="ass1-add-comment">
        <form action="#">
            <textarea v-model="comment" class="form-control ttg-border-none" placeholder="Thêm một bình luận"></textarea>
        </form>
        <div class="ass1-add-comment__content">
            <a @click.prevent="handleAddNewComment" href="#" class="ass1-add-comment__btn-save ass1-btn-icon"><span>{{ renderMaxLength }}</span>
            <i class="icon-Submit_Tick"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'post-comment-add',
    data() {
        return {
            comment: '',
            maxLength: 180,
            postId: this.$route.params.id,
        }
    },
    watch: {
        '$route'(to, from) {
            this.postId = to.params.id;
        }
    },
    computed: {
        renderMaxLength() {
            return this.maxLength - this.comment.length; 
        }
    },
    methods: {
        handleAddNewComment() {
            if(this.comment.length && this.comment.length <= this.maxLength){
                //call API
                let data = {
                    comment: this.comment,
                    postid: this.postId,
                }

                this.$store.dispatch('addNewComment', data).then(res => {
                    if(res.ok){
                        alert('Đăng bình luận thành công!');
                        this.comment = '';
                    }else {
                        alert(res.error)
                    }
                })
            }else {
                alert('Dữ liệu nhập vào không đúng quy tắc!');
            }
        }
    },
}
</script>

<style></style>