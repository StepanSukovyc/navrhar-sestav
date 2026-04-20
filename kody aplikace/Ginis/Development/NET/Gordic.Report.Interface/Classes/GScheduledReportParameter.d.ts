declare namespace Gordic.Report.Interface {
	/**TODO*/
	interface GScheduledReportParameter {
		/**TODO*/
		readonly key: string;
		/**TODO*/
		name?: string|null;
		/**Typ policka? V C# je jako char.*/
		type?: string|null;
		/**TODO*/
		readonly length?: number|null;
		/**TODO*/
		value?: string|null;
	}
	const enum GScheduledReportParameterNames { key = "key", name = "name", type = "type", length = "length", value = "value",}
	const enum GScheduledReportParameterFragments { key = "*", name = "*", type = "*", length = "*", value = "*",}
	const enum GScheduledReportParameterTypes { key = "string", name = "string", type = "string", length = "number", value = "string",}
	const enum GScheduledReportParameterTypeLengths {}
}
