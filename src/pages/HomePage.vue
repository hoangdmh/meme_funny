<template>
    <div class="row">
        <div class="col-lg-8">
            <post-list/>
        </div>
        <div class="col-lg-4">
            <sidebar />
        </div>
    </div>
</template>

<script>
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';

import { mapActions } from 'vuex';

export default {
    name: 'home-page',
    components: {
        PostList,
        Sidebar
    },
    watch:{
        '$route' (to, from){
            var tagIndex = to.query.tagIndex;

            //this.getListPostHasPaging({tagIndex: tagIndex})
            this.$store.dispatch('getListPostHasPaging', {tagIndex: tagIndex});

            // Nếu nhảy ra trang HomePage -> tagIndex - undefine
            // Nếu nhảy ra trang HomePage co thêm query -> tagIndex có giá trị
        }
    },
    
	created () {
		var tagIndex = this.$route.query.tagIndex;
		this.$store.dispatch('getListPostHasPaging', {tagIndex})
	},
    methods: {
        ...mapActions([
            'getListPostHasPaging',
        ])
    },
}
</script>

<style></style>