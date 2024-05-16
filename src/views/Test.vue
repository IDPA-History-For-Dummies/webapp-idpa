<template>
	<AsiPageHeader :title="t('page.test')"/>

	<div>
		<AsiContentWrapper :columns="2">
			<div>
				<VDatePicker v-model="datePickerValue"/>
				<pre>{{ JSON.stringify(datePickerValue) }}</pre>
			</div>
		</AsiContentWrapper>
		<AsiContentWrapper :columns="2">
			<div>
				<AsiDatePicker v-model="dateValue" label="Date" clearable/>
				{{ dateValue ?? 'null' }}
			</div>
			<div>
				<AsiTimePicker v-model="timeValue" label="Time" clearable/>
				{{ timeValue ?? 'null' }}
			</div>
		</AsiContentWrapper>
	</div>
</template>

<script setup lang="ts">
	import AsiPageHeader from "@/components/asi/AsiPageHeader.vue";
	import {useI18n} from "vue-i18n";
	import AsiContentWrapper from "@/components/asi/AsiContentWrapper.vue";
	import AsiDatePicker from "@/components/asi/controls/AsiDatePicker.vue";
	import {ref} from "vue";
	import AsiTimePicker from "@/components/asi/controls/AsiTimePicker.vue";

	const {t} = useI18n();
	const datePickerValue = ref<string | null>(null);
	const dateValue = ref<string | null>(null);
	const timeValue = ref<string | null>(null);
</script>

<style scoped lang="scss">

</style>
