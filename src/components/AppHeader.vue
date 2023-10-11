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


				<a href="dang-nhap.html" class="ass1-header__btn-upload ass1-btn">
					Login
				</a>

			</div>
		</div>
	</header>
</template>

<script>
import $ from "jquery";
import AppNavigation from './AppNavigation.vue';
import AppHeaderSearch from './AppHeaderSearch.vue';
export default {
	name: 'app-header',
	components: { AppNavigation, AppHeaderSearch },
	mounted () {
		$(".ass1-header__menu li > a").click(function(e) {
            // $(".ass1-header__nav").hide();
            $(this).parent().find(".ass1-header__nav").slideToggle(300, 'swing');
        });
	},
}
</script>

<style>

</style>