<template>
</template>

<script setup lang="ts">
	// import {useAuthStore} from "@/store/auth";
	import {computed, ref} from "vue";
	import {useI18n} from "vue-i18n";
	import {ValidationRule} from "@/common/validation/Validator";
	import RequiredValidator from "@/common/validation/RequiredValidator";
	import useIcons from "@/plugins/icons";

	const {t} = useI18n();
	// const authStore = useAuthStore();
	const icons = useIcons();

	const loading = ref<boolean>(false);
	const valid = ref<boolean>(false);
	const accessToken = ref<string | null>(null);
	const accessTokenVisible = ref<boolean>(false);
	const accessTokenRules = computed<ValidationRule[]>(() => {
		return [
			new RequiredValidator('user.term.accessToken').rule(),
		];
	});

	async function requestLogin(): Promise<void> {
		if (!valid.value || accessToken.value === null) return;
		try {
			loading.value = true;
		} catch (err) {
			return Promise.reject();
		} finally {
			loading.value = false;
		}
	}
</script>

<style scoped lang="scss">

</style>
