<template>
	<header class="app-header">
		<div>
			<div>
				<slot>
					<i class="pi pi-face-smile"></i>
				</slot>
			</div>
			<p>
				{{ title }}
			</p>
		</div>
	</header>
</template>

<script setup lang="ts">

	const props = defineProps({
		title: {type: String, required: true}
	});

</script>

<style scoped lang="scss">
	.app-header {
		margin: 0;
		font-family: "Roboto", sans-serif;
		padding: 5px 5px;
		font-weight: bold;
		left: 0;
		position: absolute;
		box-shadow: inset 0px 6px 10px -5px rgba(0, 0, 0, 0.20);
		width: 100%;
		height: 64px;
		background-color: #f6f6f6;
		display: flex;
		justify-content: center;

		> div {
			@media only screen and (min-width: 1400px) {
				width: 70%;
			}
			align-items: center;
			display: flex;


			> div {
				margin: 0 20px 0 20px;
				display: flex;
				align-items: center;
				background-color: #10b981;
				padding: 10px;
				border-radius: 25px;
			}

			> p {
				font-size: 1.5rem;
			}
		}
	}
</style>
