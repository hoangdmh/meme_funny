<template>
    <div>
        <div class="search-page mt-4">
            <p>Từ khóa tìm kiếm: <strong>{{ query }}</strong></p>
            <p>Tìm kiếm được ({{ listPostSearch.length }}) kết quả</p>
        </div>
        <div class="ass1-section__wrap row ass1-section__isotope-init">
            <div class="user-page  ass1-section__items col-lg-12">
                <div class="ass1-section" v-if="listPostSearch && listPostSearch.length">
                    <post-item 
                        v-for="post in listPostSearch" 
                        :key="post.PID"
                        v-bind:post="post"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostItem from '../components/PostItem'

export default { 
    name: 'search',
    components: { PostItem },
    data() {
        return {
            listPostSearch: [],
            query: this.$route.query.query,
        }
    },
    watch: {
        '$route' (to, from){
            this.query = to.query.query;
            this.checkQuery();
            this.fetchDataSearch();
        }
    },
    created () {
        this.checkQuery();
        this.fetchDataSearch();
    },
    methods: {
        checkQuery() {
            if(!this.query){
                this.$router.push('/');
            }
        },
        fetchDataSearch(){
            if(this.query){
                this.$store.dispatch('getListPostSearch', this.query).then(res => {
                    console.log('res', res);
                    if(res.ok){
                        this.listPostSearch = res.data;
                    }
                });
            }
        }
    },
}
</script>

<style>

</style>