declare namespace Gordic.Report.Interface {
	/**DTO pro generovani sestavy pres async. ulohu*/
	interface GCreateReportAsyncDto {
		/**Id sestavy (wrid)*/
		id?: string|null;
		/**Nazev sestavy*/
		name?: string|null;
		/**Platnost*/
		platnost?: string|null;
		/**Parametry reportu (X0000 - X0009 i dalsi vlastni)*/
		params?: ObjectLiteral<string>|null;
		/**CommonInfos (smerem na server plna verze, smerem do JS oklestena na vybrane hodnoty)*/
		commonInfos?: ObjectLiteral<any>|null;
		/**Kontext generovani (pozor, co se tam uklada, posila se vsude!)*/
		context?: ObjectLiteral<any>|null;
		/**Hodnoty z posledniho custom dialogu*/
		dialogValues?: ObjectLiteral<any>|null;
		/**Trida pro generovani v async. uloze*/
		reportGeneratorTypeAsync?: string|null;
		/**Parametry pro beh generatoru*/
		reportGeneratorParams?: string|null;
		/**RestrictionAlf*/
		restrictionAlf?: string|null;
		/**Nacist data sestavy?*/
		loadData?: boolean|null;
		/**State: 0 = initialized, 3 - running, 5 - report byl uspesne vygenerovan, 6 - vyskytla se vyjimka, 7 - generovani bylo zruseno, 8 - custom dialog*/
		state?: number|null;
		/**Vygenerovany soubor*/
		fileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**DmsInfo*/
		dmsInfo?: Gordic.Report.Interface.GReportDmsInfoDto|null;
		/**Nazev aplikace, ktere sestava patri*/
		appName?: string|null;
	}
	const enum GCreateReportAsyncDtoNames { id = "id", name = "name", platnost = "platnost", params = "params", commonInfos = "commonInfos", context = "context", dialogValues = "dialogValues", reportGeneratorTypeAsync = "reportGeneratorTypeAsync", reportGeneratorParams = "reportGeneratorParams", restrictionAlf = "restrictionAlf", loadData = "loadData", state = "state", fileInfo = "fileInfo", dmsInfo = "dmsInfo", appName = "appName",}
	const enum GCreateReportAsyncDtoFragments { id = "*", name = "*", platnost = "*", params = "*", commonInfos = "*", context = "*", dialogValues = "*", reportGeneratorTypeAsync = "*", reportGeneratorParams = "*", restrictionAlf = "*", loadData = "*", state = "*", fileInfo = "*", dmsInfo = "*", appName = "*",}
	const enum GCreateReportAsyncDtoTypes { id = "string", name = "string", platnost = "string", params = "ObjectLiteral<string>", commonInfos = "ObjectLiteral<any>", context = "ObjectLiteral<any>", dialogValues = "ObjectLiteral<any>", reportGeneratorTypeAsync = "string", reportGeneratorParams = "string", restrictionAlf = "string", loadData = "boolean", state = "number", fileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", dmsInfo = "Gordic.Report.Interface.GReportDmsInfoDto", appName = "string",}
	const enum GCreateReportAsyncDtoTypeLengths {}
	/**Vysledek generovani (muze byt i jen dilci step)*/
	interface GReportGenerateResultAsyncDto extends Gordic.Report.Interface.GCreateReportAsyncDto {
		/**Custom Dialog sestavy*/
		customDialog?: Gordic.Report.Interface.GCustomDialogDto|null;
		/**Data z vygenerovane sestavy (je-li pozadovano pres prop. LoadData = true)*/
		data?: object|null;
	}
	const enum GReportGenerateResultAsyncDtoNames { customDialog = "customDialog", data = "data", id = "id", name = "name", platnost = "platnost", params = "params", commonInfos = "commonInfos", context = "context", dialogValues = "dialogValues", reportGeneratorTypeAsync = "reportGeneratorTypeAsync", reportGeneratorParams = "reportGeneratorParams", restrictionAlf = "restrictionAlf", loadData = "loadData", state = "state", fileInfo = "fileInfo", dmsInfo = "dmsInfo", appName = "appName",}
	const enum GReportGenerateResultAsyncDtoFragments { customDialog = "*", data = "*", id = "*", name = "*", platnost = "*", params = "*", commonInfos = "*", context = "*", dialogValues = "*", reportGeneratorTypeAsync = "*", reportGeneratorParams = "*", restrictionAlf = "*", loadData = "*", state = "*", fileInfo = "*", dmsInfo = "*", appName = "*",}
	const enum GReportGenerateResultAsyncDtoTypes { customDialog = "Gordic.Report.Interface.GCustomDialogDto", data = "object", id = "string", name = "string", platnost = "string", params = "ObjectLiteral<string>", commonInfos = "ObjectLiteral<any>", context = "ObjectLiteral<any>", dialogValues = "ObjectLiteral<any>", reportGeneratorTypeAsync = "string", reportGeneratorParams = "string", restrictionAlf = "string", loadData = "boolean", state = "number", fileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", dmsInfo = "Gordic.Report.Interface.GReportDmsInfoDto", appName = "string",}
	const enum GReportGenerateResultAsyncDtoTypeLengths {}
	/**Progress async. ulohy generovane sestavy*/
	interface GAsyncReportProgressDto extends Gordic.General.ApplicationInterface.GAsyncProgressDto {
		/**Nazev sestavy*/
		name?: string|null;
		/**Nazev aplikace, ktere sestava patri*/
		appName?: string|null;
	}
	const enum GAsyncReportProgressDtoNames { name = "name", appName = "appName", current = "current", total = "total", text = "text",}
	const enum GAsyncReportProgressDtoFragments { name = "*", appName = "*", current = "*", total = "*", text = "*",}
	const enum GAsyncReportProgressDtoTypes { name = "string", appName = "string", current = "number", total = "number", text = "string",}
	const enum GAsyncReportProgressDtoTypeLengths {}
}
