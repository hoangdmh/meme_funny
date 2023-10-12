<template>
	<div id="app">
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
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

export default {
	components: { AppHeader, AppFooter },
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
		}
	},
	created () {
		//console.log(this.$store);
		this.$store.dispatch('getListPostHasPaging', {})
	},
}
</script>

<style>
</style>
