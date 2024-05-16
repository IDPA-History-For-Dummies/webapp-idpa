<template>
	<v-main class="d-flex flex-row justify-center align-center bg-grey-lighten-4 min-main-area-height">
		<div style="width: 50rem; max-width: 90vw;">
			<router-view/>
		</div>
	</v-main>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
	.v-main {
		background-image: radial-gradient(#fafafa 25%, #d0d0d0 100%);
	}
</style>
