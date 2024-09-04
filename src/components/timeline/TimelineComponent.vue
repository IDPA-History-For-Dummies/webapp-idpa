<template>
	<div class="component-body">

		<div class="container-center mb-3">
			<InputText v-model="searchTerm" type="text" placeholder="Search" :disabled="loading"/>
			<Button label="Search" @click="performSearch"
			        class="p-button" :disabled="loading"/>
		</div>
		<div class="timeline-result">
			<Timeline :value="timeLineEvents" align="alternate">
				<template #content="props">
					<Card>
						<template #title>
							{{ props.item.eventTitle }}
						</template>
						<template #subtitle>
							{{ toDate(props.item.date) }}
						</template>
						<template #content>
							{{ props.item.shortDescription }}
							<div class="show-more-container">
								<Button label="Show more" class="show-more-button p-button mt-1"/>
							</div>
						</template>
					</Card>
				</template>
			</Timeline>
		</div>
	</div>
</template>

<script lang="ts">
	import Timeline from 'primevue/timeline';
	import Button from 'primevue/button';
	import InputText from 'primevue/inputtext';
	import {defineComponent, ref} from "vue";
	import useEventService from "@/compositions/services/event";
	import {useToast} from "primevue/usetoast";
	import Card from "primevue/card";
	import {IEvents} from "@/models/events/EventModels";

	export default defineComponent({
		name: 'TimelineComponent',
		components: {
			InputText,
			Button,
			Timeline,
			Card,
		},
		setup() {
			const eventService = useEventService();
			const toast = useToast();

			const loading = ref<boolean>(false)
			const searchTerm = ref<string | null>(null);
			const timeLineEvents = ref<IEvents | null>(null)
			// const timeLineEvents = [
			// 	{
			// 		"event": "Birth of East Coast Hip Hop with DJ Kool Herc's 'Back to School Jam' in the Bronx",
			// 		"date": "1973-08-11T00:00:00",
			// 		"eventTitle": "Birth of East Coast Hip Hop"
			// 	},
			// 	{
			// 		"event": "Sugarhill Gang releases 'Rapper's Delight', the first Hip Hop single to become a Top 40 hit",
			// 		"date": "1979-09-16T00:00:00",
			// 		"eventTitle": "'Rapper's Delight' Release"
			// 	},
			// 	{
			// 		"event": "Grandmaster Flash and The Furious Five's 'The Message' becomes the first significant socio-political rap song",
			// 		"date": "1982-07-01T00:00:00",
			// 		"eventTitle": "'The Message' Release"
			// 	},
			// 	{
			// 		"event": "Run-DMC releases 'Sucker M.C.'s', a song that set the aesthetics of East Coast Hip Hop",
			// 		"date": "1983-03-12T00:00:00",
			// 		"eventTitle": "'Sucker M.C.'s' Release"
			// 	},
			// 	{
			// 		"event": "Public Enemy releases 'Fight the Power', a significant and influential song in the political hip hop movement",
			// 		"date": "1989-06-01T00:00:00",
			// 		"eventTitle": "'Fight the Power' Release"
			// 	},
			// 	{
			// 		"event": "The Golden Age of Hip Hop, a period of time when influential, innovative, and diverse Hip Hop music was produced",
			// 		"date": "1986-01-01T00:00:00",
			// 		"eventTitle": "Start of Golden Age of Hip Hop"
			// 	},
			// 	{
			// 		"event": "The end of the Golden Age of Hip Hop",
			// 		"date": "1994-12-31T00:00:00",
			// 		"eventTitle": "End of Golden Age of Hip Hop"
			// 	},
			// 	{
			// 		"event": "The Notorious B.I.G. releases 'Ready to Die', a cornerstone album of East Coast Gangsta Rap",
			// 		"date": "1994-09-13T00:00:00",
			// 		"eventTitle": "'Ready to Die' Release"
			// 	},
			// 	{
			// 		"event": "The murder of The Notorious B.I.G., a significant moment in the East Coast-West Coast Hip Hop rivalry",
			// 		"date": "1997-03-09T00:00:00",
			// 		"eventTitle": "Death of The Notorious B.I.G."
			// 	},
			// 	{
			// 		"event": "Jay-Z releases 'Hard Knock Life (Ghetto Anthem)', one of the most commercially successful East Coast rap songs",
			// 		"date": "1998-09-29T00:00:00",
			// 		"eventTitle": "'Hard Knock Life' Release"
			// 	}
			// ]

			async function performSearch() {
				if (searchTerm.value !== null && searchTerm.value !== '' && !loading.value) {
					await executeRequest(searchTerm.value);
				}
			}

			async function executeRequest(searchTerm: string) {
				try {
					loading.value = true;
					const response = await eventService.events(searchTerm);
					timeLineEvents.value = response;
				} catch (error) {
					console.error('Request failed with error:', error);
					toast.add({
						severity: 'error',
						summary: 'Error with a request',
						detail: 'An error occured with a request',
						life: 5000
					});
				} finally {
					loading.value = false;
				}
			}

			function toDate(dateString: string) {
				const date = new Date(dateString);
				return date.toLocaleDateString('de-CH');
			}

			return {
				loading,
				searchTerm,
				timeLineEvents,
				performSearch,
				toDate,
			};
		}
	});
</script>

<style scoped lang="scss">

	.component-body {
		width: 100%;
		margin-top: 72.5px;
		border-radius: 20px;
	}

	.container-center {
		display: flex;
		justify-content: center;
		gap: 1rem;
		padding-top: 3rem;
	}

	.mb-3 {
		margin-bottom: 3rem;
	}

	.mt-3 {
		margin-top: 3rem;
	}

	.mt-1 {
		margin-top: 1rem;
	}

	.show-more-container:nth-child(even) {
		flex-direction: row;

		.show-more-button {
			text-align: left;
		}
	}

	.timeline-result {
		padding-top: 15px;
		display: flex;
		justify-content: center;

		> div.p-timeline {
			flex-grow: 0;
			width: 70%;
		}
	}

</style>
