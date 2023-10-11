<template>
    <div class="ass1-section__list">
        <post-item />
        <button class="load-more ass1-btn"><span>Xem thêm</span></button>
    </div>
</template>

<script>
import PostItem from './PostItem'
export default {
  components: { PostItem },
    name: 'post-list'
}
</script>

<style></style>