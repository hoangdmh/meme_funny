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

            if(tagIndex){
                // dispatch action by category
                //this.getListPostHasPaging({tagIndex: tagIndex})
                this.$store.dispatch('getListPostHasPaging', {tagIndex: tagIndex});

            }else {
                // dispatch action by paging
                //this.getListPostHasPaging({})
                this.$store.dispatch('getListPostHasPaging', {});
            }
            //console.log('home-page  ', to);
        }
    },
    methods: {
        ...mapActions([
            'getListPostHasPaging',
        ])
    },
}
</script>

<style></style>