<template>
	<Toast position="bottom-right" class="custom-toast"/>
	<main>
		<TopBar>hallo</TopBar>
		<router-view/>
	</main>
</template>

<script setup lang="ts">
	import Toast from 'primevue/toast';
	import TopBar from "@/components/common/TopBar.vue";
</script>

<style scoped lang="scss">

</style>
