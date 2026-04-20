declare namespace Gordic.General {
	/**CloudEvent-like structure
	*     https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md
	*/
	interface GCloudEvent {
		specversion?: string|null;
		type?: string|null;
		source?: string|null;
		id?: string|null;
		time?: string|null;
		datacontenttype?: string|null;
		data?: string|null;
		subject?: string|null;
	}
	const enum GCloudEventNames { specversion = "specversion", type = "type", source = "source", id = "id", time = "time", datacontenttype = "datacontenttype", data = "data", subject = "subject",}
	const enum GCloudEventFragments { specversion = "*", type = "*", source = "*", id = "*", time = "*", datacontenttype = "*", data = "*", subject = "*",}
	const enum GCloudEventTypes { specversion = "string", type = "string", source = "string", id = "string", time = "string", datacontenttype = "string", data = "string", subject = "string",}
	const enum GCloudEventTypeLengths {}
	/**DTO for messages from subscription*/
	interface GSubscriptionMessageDto {
		/**ID of originating subscription*/
		SubscriptionId?: string|null;
		/**List of event messages*/
		Events?: Gordic.General.GCloudEvent[]|null;
	}
	const enum GSubscriptionMessageDtoNames { SubscriptionId = "SubscriptionId", Events = "Events",}
	const enum GSubscriptionMessageDtoFragments { SubscriptionId = "*", Events = "*",}
	const enum GSubscriptionMessageDtoTypes { SubscriptionId = "string", Events = "Gordic.General.GCloudEvent[]",}
	const enum GSubscriptionMessageDtoTypeLengths {}
}
