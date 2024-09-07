<template>
	<PageHeader :title="searchTerm">
		<slot>
			<i class="pi pi-bullseye" style="font-size: 1rem"></i>
		</slot>
	</PageHeader>
	<TimelineEvent :searchTerm="searchTerm"/>
</template>
<script lang="ts">
	import {defineComponent} from 'vue'
	import PageHeader from "@/components/common/PageHeader.vue";
	import TimelineEvent from "@/components/timeline-event/TimelineEvent.vue";
	import {useRoute} from "vue-router";

	export default defineComponent({
		name: "EventDetail",
		components: {TimelineEvent, PageHeader},
		setup() {
			const searchTerm = useRoute().fullPath.split("/")[2].replaceAll('-', ' ');
			return {
				searchTerm,
			};
		}

	});
</script>

<style scoped lang="scss">

</style>
