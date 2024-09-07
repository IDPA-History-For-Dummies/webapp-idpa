<template>
	<div class="component-body">

		<div class="container-center mb-3">
			<InputText v-model="searchTerm" type="text" placeholder="Search" :disabled="loading"
			           @keyup.enter="performSearch"/>
			<Button label="Search" @click="performSearch"
			        class="p-button" :disabled="loading"/>
			<Button label="Last Search" @click="getLastSearch" class="p-button" :disabled="loading"
			        severity="secondary"/>
		</div>
		<div class="timeline-result">
			<Timeline v-if="!loading" :value="timeLineEvents" align="alternate">
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
								<router-link class="router-link-btn show-more-button p-button mt-1"
								             :to="{ name: RouteNames.eventDetail, params: { term: prepareUrl(props.item.eventTitle) }}">
									Show more
								</router-link>
							</div>
						</template>
					</Card>
				</template>
			</Timeline>
			<div class="loading-spinner" v-else>
				<ProgressSpinner/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Timeline from 'primevue/timeline';
	import Button from 'primevue/button';
	import InputText from 'primevue/inputtext';
	import {defineComponent, onMounted, ref} from "vue";
	import useEventService from "@/compositions/services/event";
	import {useToast} from "primevue/usetoast";
	import Card from "primevue/card";
	import {RouteNames} from "@/compositions/helpers/route";
	import ProgressSpinner from 'primevue/progressspinner';
	import {IEvents} from "@/models/events/EventModels";


	export default defineComponent({
		name: 'TimelineComponent',
		computed: {
			RouteNames() {
				return RouteNames
			}
		},
		components: {
			ProgressSpinner,
			InputText,
			Button,
			Timeline,
			Card,
		},

		setup() {
			const eventService = useEventService();
			const toast = useToast();

			const timelineLoading = ref<boolean>(false);
			const searchTerm = ref<string | null>(null);
			const timeLineEvents = ref<IEvents | null>(null);

			const CACHE_KEY = 'timelineEventsCache';
			const LAST_SEARCH_KEY = 'lastSearchTerm';

			// Retrieve cached event data
			function getCachedData(searchTerm: string) {
				const cachedData = localStorage.getItem(`${CACHE_KEY}_${searchTerm}`);
				return cachedData ? JSON.parse(cachedData) : null;
			}

			// Cache the event data
			function setCacheData(searchTerm: string, data: IEvents) {
				localStorage.setItem(`${CACHE_KEY}_${searchTerm}`, JSON.stringify(data));
			}

			// Save the last search term
			function setLastSearchTerm(searchTerm: string) {
				localStorage.setItem(LAST_SEARCH_KEY, searchTerm);
			}

			// Get the last search term from the cache
			function getLastSearchTerm() {
				return localStorage.getItem(LAST_SEARCH_KEY);
			}

			// Perform search, first checking the cache
			async function performSearch() {
				if (searchTerm.value !== null && searchTerm.value !== '' && !timelineLoading.value) {
					const cachedData = getCachedData(searchTerm.value);
					if (cachedData) {
						timeLineEvents.value = cachedData;
					} else {
						await executeRequest(searchTerm.value);
					}
					setLastSearchTerm(searchTerm.value); // Store the current search term as the last search
				}
			}

			// Execute the API request and cache the result
			async function executeRequest(searchTerm: string) {
				try {
					timelineLoading.value = true;
					const response = await eventService.events(searchTerm);
					timeLineEvents.value = response;

					// Cache the fetched data
					setCacheData(searchTerm, response);
				} catch (error) {
					console.error('Request failed with error:', error);
					toast.add({
						severity: 'error',
						summary: 'Error with a request',
						detail: 'An error occurred with the request',
						life: 5000
					});
				} finally {
					timelineLoading.value = false;
				}
			}

			// Get the last search from cache and perform the search
			async function getLastSearch() {
				const lastSearch = getLastSearchTerm();
				if (lastSearch) {
					searchTerm.value = lastSearch;
					await performSearch();
				} else {
					toast.add({
						severity: 'info',
						summary: 'No Last Search Found',
						detail: 'No previous search term found in the cache.',
						life: 5000
					});
				}
			}

			// Automatically load the last search term from cache on component mount
			onMounted(async () => {
				await getLastSearch();
			});

			// Helper functions
			function toDate(dateString: string) {
				const date = new Date(dateString);
				return date.toLocaleDateString('de-CH');
			}

			function prepareUrl(eventTitle: string) {
				return eventTitle.replaceAll(' ', '-');
			}

			return {
				loading: timelineLoading,
				searchTerm,
				timeLineEvents,
				performSearch,
				toDate,
				prepareUrl,
				getLastSearch,
			};
		}
	});
</script>

<style scoped lang="scss">
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
