<template>
    <div>
        <user-page-infor v-bind:countPost="countPostOfUser" v-bind:userInfo="userInfo"/>

        <div class="ass1-section__wrap row ass1-section__isotope-init">
            <div class="user-page  ass1-section__items col-lg-12">
                <div class="ass1-section" v-if="listPostOfUser && listPostOfUser.length">
                    <post-item 
                        v-for="post in listPostOfUser" 
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
import UserPageInfor from '../components/UserPageInfor'

export default {
    name: 'user-page',
    components: { UserPageInfor,PostItem },
    data() {
        return {
            userInfo: null,
            listPostOfUser: [],
            userId: this.$route.params.id,
        }
    },
    watch: {
        '$route' (to, from){
            this.userId = to.params.id;
            this.fetchAllData();
        }
    },
    created () {
        this.fetchAllData();
    },
    computed: {
        countPostOfUser(){
            if(this.listPostOfUser && this.listPostOfUser.length){
                return this.listPostOfUser.length;
            }
            return 0;
        }
    },
    methods: {
        async fetchAllData(){
            this.$store.dispatch('setLoading', true);
            var userId = this.userId;
            var promiseUserObj   = this.$store.dispatch('getUserById', userId);
            var promisePostUser  = this.$store.dispatch('getListPostByUserId', userId);
            var [resultUserObj, resultPostUser] = await Promise.all([promiseUserObj, promisePostUser]);

            this.$store.dispatch('setLoading', false);
            if(resultUserObj.ok && resultPostUser.ok){
                this.userInfo       = resultUserObj.data;
                this.listPostOfUser = resultPostUser.data;
            }else{
                this.$router.push('/')
            }
        }
    },
}
</script>

<style scoped>
    
</style>