<template>
	<AsiPageHeader :title="t('page.notFound')" :icon="icons.cancel" class="flex-grow-0 flex-shrink-0"/>
</template>

<script setup lang="ts">
	import AsiPageHeader from "@/components/asi/AsiPageHeader.vue";
	import {useI18n} from "vue-i18n";
	import useIcons from "@/plugins/icons";

	const {t} = useI18n();
	const icons = useIcons();
</script>

<style scoped lang="scss">

</style>
