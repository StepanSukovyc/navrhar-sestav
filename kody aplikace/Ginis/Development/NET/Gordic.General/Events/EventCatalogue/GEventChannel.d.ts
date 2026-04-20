declare namespace Gordic.General {
	/**Channel for same type of events (or events of same interest)*/
	interface GEventChannel {
		/**channel prefix*/
		prefix?: string|null;
		/**ID of event*/
		eventId?: string|null;
		/**Subject filtering parts*/
		subjectParts?: Primitive[]|null;
		/**Domain of event*/
		domain?: string|null;
	}
	const enum GEventChannelNames { prefix = "prefix", eventId = "eventId", subjectParts = "subjectParts", domain = "domain",}
	const enum GEventChannelFragments { prefix = "*", eventId = "*", subjectParts = "*", domain = "*",}
	const enum GEventChannelTypes { prefix = "string", eventId = "string", subjectParts = "Primitive[]", domain = "string",}
	const enum GEventChannelTypeLengths {}
}
