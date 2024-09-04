export interface EventListEntry {
	shortDescription: string;
	date: string;
	eventTitle: string
}

export interface IEvents {
	events: EventListEntry[];
}
