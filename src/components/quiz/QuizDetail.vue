<template>
	<div class="component-body">
		<div class="container-center" v-if="!loading && questionModels !== null">
			<div class="quiz-container">
				<div v-for="(question, index) in questionModels" :key="index" class="quiz-question">
					<h3>{{ index + 1 }}. {{ question.question }}</h3>
					<div v-for="(option, optIndex) in question.options" :key="optIndex" class="quiz-option">
						<label>
							<input
								type="radio"
								:name="'question-' + index"
								:value="optIndex"
								v-model="userAnswers[index]"
							/>
							<span>{{ option }}</span>
						</label>
					</div>
				</div>

				<div class="btn-containers">
					<Button label="Submit Quiz" @click="submitQuiz" :disabled="!allAnswered"/>
					<router-link class="event-btn router-link-btn p-button"
					             :to="{ name: RouteNames.eventDetail, params: { term: prepareUrl(props.searchTerm)}}">
						Event
					</router-link>
				</div>

				<div v-if="showResult" class="quiz-result">
					<h3>Your Score: {{ score }} / {{ questionModels.length }}</h3>
				</div>
			</div>
		</div>
		<div class="loading-spinner" v-else>
			<ProgressSpinner/>
		</div>
	</div>
</template>

<script lang="ts">
	import {computed, defineComponent, ref} from 'vue';
	import ProgressSpinner from 'primevue/progressspinner';
	import {useToast} from 'primevue/usetoast';
	import useQuizService from '@/compositions/services/quiz';
	import {IQuizQuestion} from '@/models/quiz/QuizModels';
	import Button from 'primevue/button';
	import {RouteNames} from "@/compositions/helpers/route";

	export default defineComponent({
		name: 'QuizDetail',
		computed: {
			RouteNames() {
				return RouteNames
			}
		},
		components: {
			ProgressSpinner,
			Button
		},
		props: {
			searchTerm: {
				type: String,
				required: true
			}
		},
		async created() {
			await this.getQuizFromTerm(this.$props.searchTerm);
		},
		setup(props) {
			const quizService = useQuizService();
			const toast = useToast();
			const loading = ref<boolean>(true);
			const questionModels = ref<IQuizQuestion[] | null>(null);
			const userAnswers = ref<number[]>([]); // Stores selected answers (numbers instead of strings)
			const showResult = ref<boolean>(false);
			const score = ref<number>(0);

			// Fetch quiz data based on the search term
			async function getQuizFromTerm(searchTerm: string) {
				try {
					questionModels.value = await quizService.quiz(searchTerm);
					// Initialize user answers array with null values for each question
					userAnswers.value = Array(questionModels.value.length).fill(null);
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

			// Check if all questions have been answered
			const allAnswered = computed(() => {
				return userAnswers.value.every((answer) => answer !== null);
			});

			// Calculate the score after submission
			function submitQuiz() {
				score.value = 0;
				if (questionModels.value !== null && questionModels.value.length > 0) {
					questionModels.value.forEach((question, index) => {
						// If the selected answer matches the correct solution, increment score
						if (question.solutions.includes(userAnswers.value[index].toString())) {
							score.value += question.score;
						}
					});
				}
				showResult.value = true;
			}

			function prepareUrl(eventTitle: string) {
				return eventTitle.replaceAll(' ', '-');
			}

			return {
				loading,
				questionModels,
				userAnswers,
				submitQuiz,
				getQuizFromTerm,
				allAnswered,
				showResult,
				score,
				prepareUrl,
				props,
			};
		}
	});
</script>

<style scoped lang="scss">
	.quiz-container {
		width: 70%;
		margin: auto;
		background-color: #f9f9f9;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.quiz-question {
		margin-bottom: 20px;
	}

	.quiz-option {
		display: flex;
		align-items: center;
		margin-left: 20px;
		margin-bottom: 10px;
	}

	.quiz-option input[type='radio'] {
		margin-right: 10px;
	}

	.btn-containers {
		display: flex;
		margin-top: 20px;
		text-align: center;
		gap: 1rem;
		justify-content: center;

	}

	.quiz-result {
		display: flex;
		justify-content: center;
		margin-top: 30px;
		margin-bottom: 15px;
		text-align: center;
		color: green;
		font-size: 1.2em;
	}
</style>
