<template>
    <div class="ass1-section__item">
        <div class="ass1-section">
            <post-item-head />

            <post-item-content />

            <post-item-footer />
        </div>
    </div>
</template>

<script>
import PostItemContent from './PostItemContent'
import PostItemFooter from './PostItemFooter'
import PostItemHead from './PostItemHead'

export default {
  components: { PostItemHead, PostItemContent, PostItemFooter },
    name: 'post-item'
}
</script>

<style></style>