<template>
	<v-snackbar :model-value="snackbar.visible" min-width="25rem" max-width="30rem"
	            :timeout="snackbar.timeout" :color="snackbar.color"
	            :multi-line="snackbar.error !== null" location="bottom end"
	            @update:snackbar="close">

		<div :class="['text-wrap', snackbar.dark ? 'text-white' : 'text-black']">
			<strong>{{ snackbar.message }}</strong>
		</div>
		<v-expand-transition v-if="snackbar.error !== null">
			<div v-if="expanded">
				<div v-if="apiError !== null && apiError.statusCode !== null" class="d-flex flex-row align-center mt-3">
					<code class="mr-1">{{ apiError.statusCode }}:</code>
					<code>{{ t(`error.statusCode.${apiError.statusCode}`) }}</code>
				</div>
				<div v-if="apiError !== null">
					<code v-if="apiError.method !== null" class="mr-1">{{ apiError.method }}</code>
					<code v-if="apiError.baseUrl !== null || apiError.url !== null" class="mr-1">
						{{ [apiError.baseUrl, apiError.url].join('') }}
					</code>
				</div>
				<div>
					<code>{{ snackbar.error.message }}</code>
				</div>
				<v-btn :prepend-icon="icons.copy" variant="outlined" class="mt-3"
				       :color="snackbar.dark ? 'white' : 'black'"
				       :text="t('action.copy')" density="comfortable" @click="copyErrorToClipboard"/>
			</div>
		</v-expand-transition>

		<template v-slot:actions>
			<v-btn v-if="snackbar.error !== null" icon size="sm" :class="['btn-expand', expanded ? 'flipped': '']"
			       :color="snackbar.dark ? 'white' : 'black'"
			       @click="expanded = !expanded">
				<v-icon size="sm" :icon="icons.expand"/>
			</v-btn>
			<v-btn icon @click="close" size="sm" :color="snackbar.dark ? 'white' : 'black'">
				<v-icon size="sm" :icon="icons.close"/>
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script setup lang="ts">
	import {computed, PropType, ref} from "vue";
	import {useUiStore} from "@/store/ui";
	import {useI18n} from "vue-i18n";
	import {ApiError} from "@/models/common/ErrorModels";
	import {useClipboardHelper} from "@/compositions/helpers/clipboard";
	import useIcons from '@/plugins/icons';
	import {IIDPASnackbar} from "@/models/common/IDPAComponentModels";

	const {t} = useI18n();
	const uiStore = useUiStore();
	const icons = useIcons();

	const props = defineProps({
		snackbar: {type: Object as PropType<IIDPASnackbar>, required: true},
	});

	const expanded = ref<boolean>(false);
	const apiError = computed<ApiError | null>(() => {
		return props.snackbar.error instanceof ApiError ? props.snackbar.error : null;
	});

	const close = () => uiStore.closeSnackbar(props.snackbar.id);
	const copyErrorToClipboard = () => {
		if (props.snackbar.error === null) return;
		useClipboardHelper().copyText(props.snackbar.error);
		close();
	};
</script>

<style scoped lang="scss">
	.btn-expand {
		transition: transform .3s ease-out;

		&.flipped {
			transform: rotate(180deg);
		}
	}
</style>
