<template>
	<div id="app">
		<header class="app-header">
			<h1>Programming For Dummies</h1>
		</header>
		<main>
			<div class="p-grid p-justify-center">
				<div class="p-col-12 p-md-10 p-lg-8">
					<BlockUI :blocked="loading">
						<div class="card search-card">
							<div class="p-grid p-align-center p-nogutter horizontal-container">
								<div class="p-field p-col p-mr-2">
									<IconField class="topicSearch">
										<InputIcon class="p-inputicon">
											<i class="pi pi-search" />
										</InputIcon>
										<InputText class="p-inputtext p-component" id="search" v-model="searchQuery" placeholder="Search for a topic..." />
									</IconField>
								</div>
								<div class="p-field p-col p-mr-2">
									<label for="language">Language</label>
									<Dropdown id="language" v-model="selectedLanguage" :options="languages" optionLabel="label" placeholder="Select a language" />
								</div>
								<div class="p-field p-d-flex p-ai-end">
									<Button label="Search" icon="pi pi-search" @click="performSearch" class="p-button p-ml-auto" />
								</div>
							</div>
						</div>
					</BlockUI>
					<div v-if="loading" class="loading-container">
						<ProgressSpinner />
					</div>
					<div class="card content-card" v-if="!loading && theme">
						<h2 v-html="theme.topicName"></h2>
						<p v-html="formatText(theme.description)"></p>
						<h3>Example</h3>
						<MonacoEditor v-model="theme.example" language="javascript" theme="vs-dark" height="300px"/>
						<h3>Exercise</h3>
						<p v-html="formatText(theme.question)"></p>
						<MonacoEditor v-model="codeSnippet" language="javascript" theme="vs-dark" height="300px" v-bind:readonly="false"/>
						<Button label="Check" icon="pi pi-check" class="p-button-warning p-mt-2" @click="checkExercise" />
					</div>
					<div class="card content-card" v-else-if="!loading">
						<p>No data available. Please enter a topic and select a language to search.</p>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from './compositions/api';
import MonacoEditor from './components/MonacoEditor.vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import BlockUI from 'primevue/blockui';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

interface LanguageOption {
	label: string;
	value: string;
}

interface InformaticTopic {
	topicName: string;
	description: string;
	example: string;
	question: string;
	codeSnippet: string;
}

export default defineComponent({
	name: 'App',
	components: {
		MonacoEditor,
		InputText,
		Dropdown,
		// eslint-disable-next-line vue/no-reserved-component-names
		Button,
		ProgressSpinner,
		BlockUI,
	},
	setup() {
		const searchQuery = ref('');
		const selectedLanguage = ref<LanguageOption | null>(null);
		const languages = ref<LanguageOption[]>([
			{ label: 'C#', value: 'csharp' },
			{ label: 'Java', value: 'java' },
			{ label: 'Python', value: 'python' },
			{ label: 'JavaScript', value: 'javascript' },
			{ label: 'SQL', value: 'sql' },
			{ label: 'Html', value: 'html' },
			{ label: 'Css', value: 'css' },
		]);
		const theme = ref<InformaticTopic | null>(null);
		const codeSnippet = ref('');
		const loading = ref(false);

		const loadTheme = async (topicName: string, language: LanguageOption) => {
			try {
				const response = await api.getTopic(topicName, language.value);
				theme.value = response.data;
				codeSnippet.value = theme.value.codeSnippet || '';
			} catch (error) {
				console.error('Failed to load theme:', error);
				theme.value = null;
			} finally {
				loading.value = false;
			}
		};

		const performSearch = async () => {
			if (searchQuery.value && selectedLanguage.value) {
				loading.value = true;
				await loadTheme(searchQuery.value, selectedLanguage.value);
			}
		};

		const checkExercise = async () => {
			if (theme.value) {
				try {
					const response = await api.checkCode(theme.value.question, codeSnippet.value);
					alert(`Result: ${response.data.questionAnswered ? 'Correct' : 'Incorrect'}\nHint: ${response.data.hint}`);
				} catch (error) {
					console.error('Failed to submit code snippet:', error);
				}
			}
		};

		const formatText = (text: string) => {
			if (text) {
				return text.replace(/\n/g, '<br />');
			}
			return text;
		};

		return {
			searchQuery,
			selectedLanguage,
			languages,
			theme,
			codeSnippet,
			loading,
			performSearch,
			checkExercise,
			formatText,
		};
	},
});
</script>

<style scoped>
body {
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	background-color: #f4f7f9;
	margin: 0;
	padding: 0;
	color: #333;
}

.app-header {
	background-color: #007bff;
	color: white;
	padding: 20px;
	text-align: center;
	border-bottom: 4px solid #0056b3;
}

main {
	padding: 20px;
}

.search-card {
	background-color: #ffffff;
	border: 1px solid #e0e0e0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	margin-bottom: 20px;
	padding: 1rem;
}

.content-card {
	background-color: #ffffff;
	border: 1px solid #e0e0e0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 20px;
}

.horizontal-container {
	display: flex;
	flex-wrap: wrap;
}

.loading-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
}

h2, h3 {
	color: #007bff;
	margin-bottom: 10px;
}

p {
	margin: 10px 0;
}
</style>
