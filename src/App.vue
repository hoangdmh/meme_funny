<template>
	<div id="app">
		<loading :class="{show: isLoading}"/>

		<app-header v-if="isRenderHeader"/>
		<main>
			<div class="container">
				<router-view />
			</div>
		</main>
		<app-footer  v-if="isRenderFooter"/>
	</div>
</template>

<script>
import Loading from './components/Loading';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';

import { mapState } from 'vuex';

export default {
	components: { AppHeader, AppFooter, Loading },
	name: 'app',
	data () {
		return {
		 
		}
	},
	computed: {
		isRenderHeader(){
			var arrRouter = ['login', 'register'];
			var routerName = this.$route.name;
			if(arrRouter.indexOf(routerName) !== -1){
				return false
			}
			return true;
		},
		isRenderFooter() {
			var arrRouter = ['home-page', 'post-detail'];
			var routerName = this.$route.name;
			if(arrRouter.indexOf(routerName) !== -1) return false;
			return true;
		},
		...mapState([
			'isLoading',
		])
	},
	created () {
		//console.log(this.$store);
		this.$store.dispatch('getListPostHasPaging', {})
	},
}
</script>

<style>
</style>
