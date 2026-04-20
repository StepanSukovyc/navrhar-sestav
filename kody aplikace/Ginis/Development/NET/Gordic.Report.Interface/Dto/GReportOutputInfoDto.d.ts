declare namespace Gordic.Report.Interface {
	/**Info o sestave*/
	interface GReportOutputInfoDto {
		/**Vychozi format*/
		selectedOutputTypeOrDefault?: string|null;
		/**Formaty*/
		formats?: Gordic.Report.Interface.GFormatTypeInfoDto[]|null;
	}
	const enum GReportOutputInfoDtoNames { selectedOutputTypeOrDefault = "selectedOutputTypeOrDefault", formats = "formats",}
	const enum GReportOutputInfoDtoFragments { selectedOutputTypeOrDefault = "*", formats = "*",}
	const enum GReportOutputInfoDtoTypes { selectedOutputTypeOrDefault = "string", formats = "Gordic.Report.Interface.GFormatTypeInfoDto[]",}
	const enum GReportOutputInfoDtoTypeLengths {}
}
