import useApi from "@/compositions/api";
import {IEvents} from "@/models/events/EventModels";

const api = useApi();

const historyApiUrl = 'history-api/v1/';

export class EventService {

	public async event(topic: string): Promise<IEvents> {
		return api.get<IEvents>(historyApiUrl + `events/${topic}`);
	}

	public async events(topic: string): Promise<IEvents> {
		return api.get<IEvents>(historyApiUrl + `events?eventName=${topic}`);
	}
}

const instance = new EventService();

export default function useEventService(): EventService {
	return instance;
}
