<template>
	<PageHeader title="Timeline">
		<slot>
			<i class="pi pi-history" style="font-size: 1rem"></i>
		</slot>
	</PageHeader>
	<TimelineComponent/>
</template>

<script setup lang="ts">
	import PageHeader from "@/components/common/PageHeader.vue";
	import TimelineComponent from "@/components/timeline/TimelineComponent.vue";
</script>

<style scoped lang="scss">

</style>
