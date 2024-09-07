import useApi from "@/compositions/api";
import {IQuizQuestion} from "@/models/quiz/QuizModels";

const api = useApi();

const quizApiUrl = 'history-api/v1/quiz/';

export class QuizService {

	public async quiz(topic: string): Promise<IQuizQuestion[]> {
		return api.get<IQuizQuestion[]>(quizApiUrl + `events/${topic}/quiz-questions`);
	}
}

const instance = new QuizService();

export default function useQuizService(): QuizService {
	return instance;
}
