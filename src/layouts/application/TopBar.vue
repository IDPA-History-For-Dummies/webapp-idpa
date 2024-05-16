<template>
	<v-app-bar class="bar" color="primary" density="comfortable">
		<template v-slot:title>
			<div @click="logoClicked">{{ t('application.name') }}</div>
		</template>
	</v-app-bar>
</template>

<script setup lang="ts">
	import {RouteNames, useRouteHelper} from "@/compositions/helpers/route";
	import {useI18n} from "vue-i18n";

	const {t} = useI18n();
	const routeHelper = useRouteHelper();

	function logoClicked(): void {
		routeHelper.push(RouteNames.home);
	}
</script>

<style scoped lang="scss">
	.bar {
		position: relative;
	}
</style>
