export interface IEventMetaData {
	startDate: string;
	endDate: string;
	location: string;
}

export interface IEventDetail {
	eventMetaData: IEventMetaData;
	eventDescription: string;
}

export interface EventListEntry {
	shortDescription: string;
	date: string;
	eventTitle: string
}

export interface IEvents {
	events: EventListEntry[];
}
