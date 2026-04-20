declare namespace Gordic.Report.Interface {
	/**DTO s info k ulozeni do DMS*/
	interface GReportDmsInfoDto {
		/**Sestava ma byt ulozena?*/
		shouldSave?: boolean|null;
		/**Zpusob ulozeni*/
		zpusobUlozeni?: number|null;
		/**Ma se zobrazit vyzva k ulozeni?*/
		shouldShowConfirmation?: boolean|null;
		/**Ma se zobrazit vyzva k ulozeni? (Toto je varianta z reportu)*/
		shouldShowConfirmationRep?: boolean|null;
		/**Ma se zobrazit vyber uloziste?*/
		shouldShowConfirmationChoice?: boolean|null;
		/**Ma byt zobrazeny podpis?*/
		shouldShowSignature?: boolean|null;
		/**Melo by byt podepsano?*/
		shouldMakeSignature?: boolean|null;
		/**Melo by se zobrazit razitkovani?*/
		shouldShowTimestamp?: boolean|null;
		/**Melo melo byt se razitkovat?*/
		shouldMakeTimestamp?: boolean|null;
		/**Ixp*/
		ixp?: string|null;
		/**IXS duvodu podpisu*/
		ixsDpo?: string|null;
		prepared?: object|null;
		ixbNew?: string|null;
		ixpNew?: string|null;
		ixsFrm?: string|null;
		ixsAlv?: string|null;
	}
	const enum GReportDmsInfoDtoNames { shouldSave = "shouldSave", zpusobUlozeni = "zpusobUlozeni", shouldShowConfirmation = "shouldShowConfirmation", shouldShowConfirmationRep = "shouldShowConfirmationRep", shouldShowConfirmationChoice = "shouldShowConfirmationChoice", shouldShowSignature = "shouldShowSignature", shouldMakeSignature = "shouldMakeSignature", shouldShowTimestamp = "shouldShowTimestamp", shouldMakeTimestamp = "shouldMakeTimestamp", ixp = "ixp", ixsDpo = "ixsDpo", prepared = "prepared", ixbNew = "ixbNew", ixpNew = "ixpNew", ixsFrm = "ixsFrm", ixsAlv = "ixsAlv",}
	const enum GReportDmsInfoDtoFragments { shouldSave = "*", zpusobUlozeni = "*", shouldShowConfirmation = "*", shouldShowConfirmationRep = "*", shouldShowConfirmationChoice = "*", shouldShowSignature = "*", shouldMakeSignature = "*", shouldShowTimestamp = "*", shouldMakeTimestamp = "*", ixp = "*", ixsDpo = "*", prepared = "*", ixbNew = "*", ixpNew = "*", ixsFrm = "*", ixsAlv = "*",}
	const enum GReportDmsInfoDtoTypes { shouldSave = "boolean", zpusobUlozeni = "number", shouldShowConfirmation = "boolean", shouldShowConfirmationRep = "boolean", shouldShowConfirmationChoice = "boolean", shouldShowSignature = "boolean", shouldMakeSignature = "boolean", shouldShowTimestamp = "boolean", shouldMakeTimestamp = "boolean", ixp = "string", ixsDpo = "string", prepared = "object", ixbNew = "string", ixpNew = "string", ixsFrm = "string", ixsAlv = "string",}
	const enum GReportDmsInfoDtoTypeLengths {}
}
