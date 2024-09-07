<template>
	<PageHeader :title="pageHeader()">
		<slot>
			<i class="pi pi-question-circle" style="font-size: 1rem"></i>
		</slot>
	</PageHeader>
	<QuizDetail :searchTerm="searchTerm"/>
</template>

<script lang="ts">
	import {defineComponent} from "vue";
	import PageHeader from "@/components/common/PageHeader.vue";
	import {useRoute} from "vue-router";
	import QuizDetail from "@/components/quiz/QuizDetail.vue";

	export default defineComponent({
		name: 'Quiz',
		components: {QuizDetail, PageHeader,},
		setup() {
			const searchTerm = useRoute().fullPath.split("/")[2].replaceAll('-', ' ');

			function pageHeader() {
				return "Quiz: " + searchTerm;
			}

			return {
				searchTerm,
				pageHeader,
			};
		}
	});
</script>

<style scoped lang="scss">

</style>
