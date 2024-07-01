import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://programmingfordummiesapi.azurewebsites.net/informatics-api/v1/informatics', // Prolly no die falsch addresse
	headers: {
		'Content-Type': 'application/json',
	},
});

const api = {
	getTopic(topicName: string, language: string) {
		return apiClient.get(`/${topicName}/${language}`);
	},
	checkCode(question: string, codesnippet: string) {
		return apiClient.post(`/code-snippet`, {question, codesnippet });
	},
};

export default api;
