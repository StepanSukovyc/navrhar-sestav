declare namespace Gordic.Report.Interface {
	/**Nejnutnější info o sestavě*/
	interface GReportMinimalInfoDto {
		/**IXS_ALV*/
		ixsAlv?: string|null;
		/**ID_SES*/
		idSes?: string|null;
		/**DAT_MODIF*/
		datModif?: string|null;
	}
	const enum GReportMinimalInfoDtoNames { ixsAlv = "ixsAlv", idSes = "idSes", datModif = "datModif",}
	const enum GReportMinimalInfoDtoFragments { ixsAlv = "*", idSes = "*", datModif = "*",}
	const enum GReportMinimalInfoDtoTypes { ixsAlv = "string", idSes = "string", datModif = "string",}
	const enum GReportMinimalInfoDtoTypeLengths {}
}
