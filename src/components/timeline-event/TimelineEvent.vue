<template>
	<div class="component-body">
		<div class="container-center" v-if="!loading && eventModel !== null">
			<div class="event-container">
				<p class="event-description">
					{{ eventModel.eventDescription }}
				</p>

				<div class="event-details">
					<p><strong>Location:</strong> {{ eventModel.eventMetaData.location }}</p>
					<p><strong>Date:</strong>
						{{ displayDate(eventModel.eventMetaData.startDate, eventModel.eventMetaData.endDate) }}</p>
				</div>
				<div class="nav-button-container">
					<router-link class="router-link-btn p-button mt-1"
					             :to="{ name: RouteNames.events }">
						Timeline
					</router-link>
					<router-link class="router-link-btn p-button mt-1"
					             :to="{ name: RouteNames.quiz, params: { term: prepareUrl(props.searchTerm)}}">
						Quiz
					</router-link>
				</div>
			</div>
		</div>
		<div class="loading-spinner" v-else>
			<ProgressSpinner/>
		</div>
	</div>
</template>

<script lang="ts">
	import {defineComponent, ref} from 'vue'
	import useEventService from "@/compositions/services/event";
	import {useToast} from "primevue/usetoast";
	import ProgressSpinner from 'primevue/progressspinner';
	import {RouteNames} from "@/compositions/helpers/route";
	import {IEventDetail} from "@/models/events/EventModels";

	export default defineComponent({
		name: "TimelineEvent",
		computed: {
			RouteNames() {
				return RouteNames;
			}
		},
		components: {
			ProgressSpinner,
		},
		props: {
			searchTerm: {
				type: String,
				required: true,
			}
		},

		async created() {
			await this.getEventFromTerm(this.$props.searchTerm);
		},

		setup(props) {
			const eventService = useEventService();
			const toast = useToast();
			const loading = ref<boolean>(true);
			const eventModel = ref<IEventDetail | null>(null);

			// Function to get the cached event if it exists and hasn't expired
			function getCachedEvent(searchTerm: string) {
				const cached = localStorage.getItem(`event_${searchTerm}`);

				if (!cached) return null;

				const cachedData = JSON.parse(cached);

				// Check if the cache is older than 24 hours (1 day)
				const now = new Date().getTime();
				if (now - cachedData.timestamp > 24 * 60 * 60 * 1000) {
					localStorage.removeItem(`event_${searchTerm}`);
					return null;
				}

				return cachedData.event;
			}

			// Fetch the event from cache or the API
			async function getEventFromTerm(searchTerm: string) {
				const cachedEvent = getCachedEvent(searchTerm);

				if (cachedEvent) {
					eventModel.value = cachedEvent;
					loading.value = false;
					return;
				}

				try {
					// Fetch event from API
					eventModel.value = await eventService.event(searchTerm);

					// Cache the event with a timestamp
					if (eventModel.value) {
						localStorage.setItem(`event_${searchTerm}`, JSON.stringify({
							event: eventModel.value,
							timestamp: new Date().getTime(),
						}));
					}
				} catch (error) {
					console.error('Request failed with error:', error);
					toast.add({
						severity: 'error',
						summary: 'Error with a request',
						detail: 'An error occurred with a request',
						life: 5000
					});
				} finally {
					loading.value = false;
				}
			}

			// Convert date string to a localized date format
			function toDate(dateString: string) {
				const date = new Date(dateString);
				return date.toLocaleDateString('de-CH');
			}

			// Display either a single date or a range if start and end dates are different
			function displayDate(startDate: string, endDate: string) {
				const start = toDate(startDate);
				const end = toDate(endDate);

				return start === end ? start : `${start} - ${end}`;
			}

			function prepareUrl(eventTitle: string) {
				return eventTitle.replaceAll(' ', '-');
			}

			return {
				getEventFromTerm,
				eventModel,
				loading,
				toDate,
				displayDate,
				prepareUrl,
				props,
			};
		}
	});
</script>

<style scoped lang="scss">

	.event-container {
		width: 70%;
	}

	.event-description {
		font-size: 1rem;
		line-height: 1.6;
		color: #666;
		margin-bottom: 20px;
		background-color: #fafafa;
		border-radius: 10px;
		padding: 15px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}

	.event-details {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #444;
		background-color: #fafafa;
		border-radius: 10px;
		padding: 15px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}

	.nav-button-container {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
