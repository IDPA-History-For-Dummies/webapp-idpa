<template>
	<PageHeader title="Home">
		<i class="pi pi-home"></i>
	</PageHeader>
	<router-link to="/events">events</router-link>
	<router-view/>
</template>

<script setup lang="ts">
	import PageHeader from "@/components/common/PageHeader.vue";
</script>

<style scoped lang="scss">

</style>
