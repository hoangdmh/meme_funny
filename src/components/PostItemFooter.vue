<template>
    <div class="ass1-section__footer">
        <a href="#" class="ass1-section__btn-comment ass1-btn-icon"><i class="icon-Comment_Full"></i><span>{{ post.count > 0 ? post.count: 0 }}</span></a>
    </div>
</template>

<script>
export default {
    name: 'post-item-footer',
    props: {
        post: {
            type: Object,
            default: null
        },
    },
}
</script>

<style></style> 