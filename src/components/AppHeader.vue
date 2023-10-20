<template>
    <!-- HEADER -->
	<header>
		<div class="ass1-header">
			<div class="container">
				<router-link to="/" class="ass1-logo">Hoang Meme</router-link>

				<app-navigation />

				<app-header-search />

				<router-link to="/upload" class="ass1-header__btn-upload ass1-btn">
					<i class="icon-Upvote"></i> Upload
				</router-link>


				<router-link v-if="!isLogin" to="/login" class="ass1-header__btn-upload ass1-btn">Login</router-link>

				<div v-else-if="currentUser && isLogin" class="avatar ass1-section__head pb-0">
					<span class="ass1-section__avatar ass1-avatar mr-2">
						<img :src="getAvatar" alt="" class="ass1-section__avatar ass1-avatar mr-2">
					</span> 
					<router-link :to="{ name: 'user-page', params: { id: currentUser.USERID }}" >
						<span>{{ currentUser.email }}</span>
					</router-link>
					<span class="logout ass1-header__btn-upload ass1-btn" @click="handleLogout">Logout</span>
				</div>

			</div>
		</div>
	</header>
</template>

<script>
import $ from "jquery";
import AppNavigation from './AppNavigation';
import AppHeaderSearch from './AppHeaderSearch';
import { mapGetters, mapState } from 'vuex';

export default {
	name: 'app-header',
	components: { AppNavigation, AppHeaderSearch },
	mounted () {
		$(".ass1-header__menu li > a").click(function(e) {
            // $(".ass1-header__nav").hide();
            $(this).parent().find(".ass1-header__nav").slideToggle(300, 'swing');
        });

		$(".ass1-header__nav ul li > a").click(function(e){
            $(this).parents(".ass1-header__nav").slideUp(300, 'swing');
        })
	},
	computed: {
		...mapGetters(['isLogin']),
		...mapState({
            currentUser: state => state.user.currentUser,
        }),
		getAvatar(){
            if(this.currentUser.profilepicture){
                return this.currentUser.profilepicture
            }
            return `/dist/images/avatar-02.png`
        },
	},
	methods: {
		handleLogout() {
			this.$store.dispatch('logout').then(res => {
				this.$router.push('/login')
			});
		}
	},
}
</script>

<style scoped>
	.avatar {
		position: relative;
		border-bottom: none;
	}
	.logout {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, 0);
		cursor: pointer;
		display: none;
		transition: all 0.3s ease;
		z-index: 99;
	}
	.avatar:hover .logout {
		display: flex;
	}
</style>