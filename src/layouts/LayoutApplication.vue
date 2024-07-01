<template>
<!--	<template v-if="authStore.isLoggedIn">-->
<!--		<TopBar/>-->
<!--		<v-main class="d-flex flex-column">-->
<!--			<router-view/>-->
<!--		</v-main>-->
<!--	</template>-->
</template>

<script setup lang="ts">
	// import {useAuthStore} from '@/store/auth';
	import TopBar from '@/layouts/application/TopBar.vue';

	// const authStore = useAuthStore();
</script>

<style scoped lang="scss">
	.v-main {
		min-height: 100vh;

		&.fixed-height {
			max-height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
			overflow-y: hidden;
		}
	}

	//@keyframes danger-animation {
	//	0% {
	//		background-color: rgba(var(--v-theme-primary), 0.2);
	//	}
	//	100% {
	//		background-color: rgba(var(--v-theme-info), 0.2);
	//	}
	//}
</style>
