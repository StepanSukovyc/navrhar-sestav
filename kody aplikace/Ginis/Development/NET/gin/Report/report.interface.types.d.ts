/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       report.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Report.Interface\Gordic.Report.Interface.csproj
*    created     2026-02-16 14:33:46
*    files       Classes\GScheduledReportParameter.d.ts
*                Dto\GBatchesInfoDto.d.ts
*                Dto\GCreateReportAsyncDto.d.ts
*                Dto\GCustomDialogDto.d.ts
*                Dto\GFormatTypeInfoDto.d.ts
*                Dto\GReportDmsInfoDto.d.ts
*                Dto\GReportInfoDto.d.ts
*                Dto\GReportMinimalInfoDto.d.ts
*                Dto\GReportOutputInfoDto.d.ts
*                Dto\GSablonaKonvenceGordicDto.d.ts
*                Interfaces\IGSablonaKonvenceGordic.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Classes\GScheduledReportParameter.d.ts 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GBatchesInfoDto.d.ts 

declare namespace Gordic.Report.Interface {
	/**Rozsireni pro batch files*/
	interface GBatchesInfoDto extends Gordic.General.ApplicationInterface.GFileInfoDto {
		/**Nazev adresare obs. files*/
		directory?: string|null;
		/**Seznam souboru v adresari*/
		files?: string[]|null;
		/**Hlavni soubor ke stazeni neexistuje (jsou k dispozici jen prop. Files)*/
		isMainFileEmpty?: boolean|null;
	}
	const enum GBatchesInfoDtoNames { directory = "directory", files = "files", isMainFileEmpty = "isMainFileEmpty", metaData = "metaData", guid = "guid", id = "id", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon", fileSize = "fileSize", sizeB = "sizeB", tempName = "tempName",}
	const enum GBatchesInfoDtoFragments { directory = "*", files = "*", isMainFileEmpty = "*", metaData = "*", guid = "*", id = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*", fileSize = "*", sizeB = "*", tempName = "*",}
	const enum GBatchesInfoDtoTypes { directory = "string", files = "string[]", isMainFileEmpty = "boolean", metaData = "any", guid = "string", id = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string", fileSize = "string", sizeB = "number", tempName = "string",}
	const enum GBatchesInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GCreateReportAsyncDto.d.ts 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GCustomDialogDto.d.ts 

declare namespace Gordic.Report.Interface {
	/**Custom dialog sestavy*/
	interface GCustomDialogDto {
		/**Titulek okna*/
		title?: string|null;
		/**id*/
		id?: string|null;
		/**Pozice X*/
		posX?: number|null;
		/**Pozice Y*/
		posY?: number|null;
		/**Sirka*/
		width?: number|null;
		/**Vyska*/
		height?: number|null;
		/**Typ dialogu (default = "Custom")*/
		dialogType?: string|null;
		/**Seznam ovl. prvku*/
		controls?: Gordic.Report.Interface.GCustomDialogControlDto[]|null;
		/**Dalsi property dialogu*/
		props?: ObjectLiteral<any>|null;
	}
	const enum GCustomDialogDtoNames { title = "title", id = "id", posX = "posX", posY = "posY", width = "width", height = "height", dialogType = "dialogType", controls = "controls", props = "props",}
	const enum GCustomDialogDtoFragments { title = "*", id = "*", posX = "*", posY = "*", width = "*", height = "*", dialogType = "*", controls = "*", props = "*",}
	const enum GCustomDialogDtoTypes { title = "string", id = "string", posX = "number", posY = "number", width = "number", height = "number", dialogType = "string", controls = "Gordic.Report.Interface.GCustomDialogControlDto[]", props = "ObjectLiteral<any>",}
	const enum GCustomDialogDtoTypeLengths {}
	/**Ovl. prvek (obecne)*/
	interface GCustomDialogControlDto {
		/**Nazev*/
		name?: string|null;
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Pozice X*/
		left?: number|null;
		/**Pozice Y*/
		top?: number|null;
		/**Sirka*/
		width?: number|null;
		/**Vyska*/
		height?: number|null;
		/**Property (serializovatelne!!!)*/
		props?: ObjectLiteral<any>|null;
	}
	const enum GCustomDialogControlDtoNames { name = "name", controlType = "controlType", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogControlDtoFragments { name = "*", controlType = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogControlDtoTypes { name = "string", controlType = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogControlDtoTypeLengths {}
	/**Label*/
	interface GCustomDialogLabelDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Popisek*/
		caption?: string|null;
	}
	const enum GCustomDialogLabelDtoNames { controlType = "controlType", caption = "caption", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogLabelDtoFragments { controlType = "*", caption = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogLabelDtoTypes { controlType = "string", caption = "string", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogLabelDtoTypeLengths {}
	/**Checkbox*/
	interface GCustomDialogCheckBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Popisek*/
		caption?: string|null;
		/**Hodnota*/
		value?: boolean|null;
	}
	const enum GCustomDialogCheckBoxDtoNames { controlType = "controlType", caption = "caption", value = "value", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogCheckBoxDtoFragments { controlType = "*", caption = "*", value = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogCheckBoxDtoTypes { controlType = "string", caption = "string", value = "boolean", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogCheckBoxDtoTypeLengths {}
	/**Datebox*/
	interface GCustomDialogDateBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Hodnota*/
		value?: JsonDate|null;
	}
	const enum GCustomDialogDateBoxDtoNames { controlType = "controlType", value = "value", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogDateBoxDtoFragments { controlType = "*", value = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogDateBoxDtoTypes { controlType = "string", value = "JsonDate", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogDateBoxDtoTypeLengths {}
	/**Editbox*/
	interface GCustomDialogEditBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Hodnota*/
		value?: string|null;
		/**Maximalni delka (hodnota 0 = nedefinovano)*/
		maxLength?: number;
	}
	const enum GCustomDialogEditBoxDtoNames { controlType = "controlType", value = "value", maxLength = "maxLength", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogEditBoxDtoFragments { controlType = "*", value = "*", maxLength = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogEditBoxDtoTypes { controlType = "string", value = "string", maxLength = "number", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogEditBoxDtoTypeLengths {}
	/**Memo*/
	interface GCustomDialogMemoDto extends Gordic.Report.Interface.GCustomDialogEditBoxDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
	}
	const enum GCustomDialogMemoDtoNames { controlType = "controlType", value = "value", maxLength = "maxLength", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogMemoDtoFragments { controlType = "*", value = "*", maxLength = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogMemoDtoTypes { controlType = "string", value = "string", maxLength = "number", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogMemoDtoTypeLengths {}
	/**Numberbox*/
	interface GCustomDialogNumberBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Hodnota*/
		value?: JsonDecimal|null;
		/**Minimalni hodnota*/
		minValue?: JsonDecimal|null;
		/**Maximalni hodnota*/
		maxValue?: JsonDecimal|null;
		/**Maximalni delka?*/
		maxLength?: number|null;
		/**Presnost*/
		decimals?: number|null;
	}
	const enum GCustomDialogNumberBoxDtoNames { controlType = "controlType", value = "value", minValue = "minValue", maxValue = "maxValue", maxLength = "maxLength", decimals = "decimals", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogNumberBoxDtoFragments { controlType = "*", value = "*", minValue = "*", maxValue = "*", maxLength = "*", decimals = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogNumberBoxDtoTypes { controlType = "string", value = "JsonDecimal", minValue = "JsonDecimal", maxValue = "JsonDecimal", maxLength = "number", decimals = "number", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogNumberBoxDtoTypeLengths {}
	interface GCustomDialogSelectBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Predvybrana hodnota*/
		selectedIndex?: number|null;
		/**Polozky*/
		items?: Gordic.Report.Interface.GCustomDialogSelectOptionDto[]|null;
	}
	const enum GCustomDialogSelectBoxDtoNames { selectedIndex = "selectedIndex", items = "items", name = "name", controlType = "controlType", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogSelectBoxDtoFragments { selectedIndex = "*", items = "*", name = "*", controlType = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogSelectBoxDtoTypes { selectedIndex = "number", items = "Gordic.Report.Interface.GCustomDialogSelectOptionDto[]", name = "string", controlType = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogSelectBoxDtoTypeLengths {}
	/**Listbox*/
	interface GCustomDialogListBoxDto extends Gordic.Report.Interface.GCustomDialogSelectBoxDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**?*/
		checks?: string|null;
		/**Styl (Gordic.Report.Interface.GCheckListStyle)*/
		style?: number|null;
	}
	const enum GCustomDialogListBoxDtoNames { controlType = "controlType", checks = "checks", style = "style", selectedIndex = "selectedIndex", items = "items", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogListBoxDtoFragments { controlType = "*", checks = "*", style = "*", selectedIndex = "*", items = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogListBoxDtoTypes { controlType = "string", checks = "string", style = "number", selectedIndex = "number", items = "Gordic.Report.Interface.GCustomDialogSelectOptionDto[]", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogListBoxDtoTypeLengths {}
	/**Combobox*/
	interface GCustomDialogComboBoxDto extends Gordic.Report.Interface.GCustomDialogSelectBoxDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**?*/
		returnIndex?: boolean|null;
	}
	const enum GCustomDialogComboBoxDtoNames { controlType = "controlType", returnIndex = "returnIndex", selectedIndex = "selectedIndex", items = "items", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogComboBoxDtoFragments { controlType = "*", returnIndex = "*", selectedIndex = "*", items = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogComboBoxDtoTypes { controlType = "string", returnIndex = "boolean", selectedIndex = "number", items = "Gordic.Report.Interface.GCustomDialogSelectOptionDto[]", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogComboBoxDtoTypeLengths {}
	/**Polozka seznamu*/
	interface GCustomDialogSelectOptionDto {
		/**Nazev option*/
		text?: string|null;
		/**Hodnota (value) option*/
		value?: string|null;
		/**?*/
		check?: string|null;
	}
	const enum GCustomDialogSelectOptionDtoNames { text = "text", value = "value", check = "check",}
	const enum GCustomDialogSelectOptionDtoFragments { text = "*", value = "*", check = "*",}
	const enum GCustomDialogSelectOptionDtoTypes { text = "string", value = "string", check = "string",}
	const enum GCustomDialogSelectOptionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GFormatTypeInfoDto.d.ts 

declare namespace Gordic.Report.Interface {
	/**Pomocna trida pro udrzeni informaci o formatu*/
	interface GFormatTypeInfoDto {
		/**Pripona soubour*/
		extension: string;
		/**Popis formatu*/
		description: string;
	}
	const enum GFormatTypeInfoDtoNames { extension = "extension", description = "description",}
	const enum GFormatTypeInfoDtoFragments { extension = "*", description = "*",}
	const enum GFormatTypeInfoDtoTypes { extension = "string", description = "string",}
	const enum GFormatTypeInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GReportDmsInfoDto.d.ts 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GReportInfoDto.d.ts 

declare namespace Gordic.Report.Interface {
	/**Info o sestave*/
	interface GReportInfoDto extends Gordic.Report.Interface.GReportMinimalInfoDto {
		isAktivni?: boolean|null;
		outputInfo?: Gordic.Report.Interface.GReportOutputInfoDto|null;
		/**Graficka*/
		graficka?: boolean|null;
		/**IxsStr*/
		ixsStr?: string|null;
		/**IxsXme*/
		ixsXme?: string|null;
		/**FormVyst*/
		formVyst?: string|null;
		/**TypVyst*/
		typVyst?: string|null;
		/**Nazev*/
		nazev?: string|null;
		/**TypAlv*/
		typAlv?: string|null;
		/**Tema*/
		tema?: string|null;
		alv?: ObjectLiteral<string>|null;
		/**Podmonozina commoninfos*/
		commonInfos?: ObjectLiteral<string>|null;
		/**Lze sestavu odlozit?*/
		isOdlozitelne?: boolean|null;
	}
	const enum GReportInfoDtoNames { isAktivni = "isAktivni", outputInfo = "outputInfo", graficka = "graficka", ixsStr = "ixsStr", ixsXme = "ixsXme", formVyst = "formVyst", typVyst = "typVyst", nazev = "nazev", typAlv = "typAlv", tema = "tema", alv = "alv", commonInfos = "commonInfos", isOdlozitelne = "isOdlozitelne", ixsAlv = "ixsAlv", idSes = "idSes", datModif = "datModif",}
	const enum GReportInfoDtoFragments { isAktivni = "*", outputInfo = "*", graficka = "*", ixsStr = "*", ixsXme = "*", formVyst = "*", typVyst = "*", nazev = "*", typAlv = "*", tema = "*", alv = "*", commonInfos = "*", isOdlozitelne = "*", ixsAlv = "*", idSes = "*", datModif = "*",}
	const enum GReportInfoDtoTypes { isAktivni = "boolean", outputInfo = "Gordic.Report.Interface.GReportOutputInfoDto", graficka = "boolean", ixsStr = "string", ixsXme = "string", formVyst = "string", typVyst = "string", nazev = "string", typAlv = "string", tema = "string", alv = "ObjectLiteral<string>", commonInfos = "ObjectLiteral<string>", isOdlozitelne = "boolean", ixsAlv = "string", idSes = "string", datModif = "string",}
	const enum GReportInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GReportMinimalInfoDto.d.ts 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GReportOutputInfoDto.d.ts 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Dto\GSablonaKonvenceGordicDto.d.ts 

declare namespace Gordic.Report.Interface {
	/**DBTABLE:ginssag*/
	interface GSablonaKonvenceGordicDto {
		/**Název souboru (včetně prefixu)*/
		soubor?: string|null;
		/**Cesta*/
		cesta?: string|null;
		/**Popis
		*       Popis souboru
		*/
		popis?: string|null;
		/**Kopie
		*       Uložený soubor v db jako blob
		*/
		kopie?: JsonBlob|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		prefix?: string|null;
		priz_spis?: number|null;
		/**Ičo*/
		ico?: string|null;
	}
	const enum GSablonaKonvenceGordicDtoNames { soubor = "soubor", cesta = "cesta", popis = "popis", kopie = "kopie", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prefix = "prefix", priz_spis = "priz_spis", ico = "ico",}
	const enum GSablonaKonvenceGordicDtoFragments { soubor = "*", cesta = "*", popis = "*", kopie = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prefix = "*", priz_spis = "*", ico = "*",}
	const enum GSablonaKonvenceGordicDtoTypes { soubor = "string", cesta = "string", popis = "string", kopie = "JsonBlob", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prefix = "string", priz_spis = "number", ico = "string",}
	const enum GSablonaKonvenceGordicDtoTypeLengths { soubor = 100, cesta = 100, popis = 254, zmenu_prov = 12, prefix = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.Interface\Interfaces\IGSablonaKonvenceGordic.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Šablony konvence Gordic z databáze
	* @businessObject SablonaKonvenceGordic
	*/
	interface SablonaKonvenceGordic {
		/**Načtení šablony včetně obsahu (byte Array)*/
		read(rq?:Gordic.Report.Interface.GSablonaKonvenceGordicDto|CallParams<GServiceReadRequest<Gordic.Report.Interface.GSablonaKonvenceGordicDto>>): _Task<GServiceReadRequest<Gordic.Report.Interface.GSablonaKonvenceGordicDto>,GServiceReadResponse<Gordic.Report.Interface.GSablonaKonvenceGordicDto>>;
		/**Načtení informací o šabloně (bez načtení obsahu šablony)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Report.Interface.GSablonaKonvenceGordicDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SablonaKonvenceGordic: ServiceBase & Catalog.SablonaKonvenceGordic;
	}
	const SablonaKonvenceGordic: Client["SablonaKonvenceGordic"];
}
declare namespace Gordic.Report.Interface {
	const enum GSablonaKonvenceGordicEnum {
		/**Cesta k souboru*/
		cesta,
		/**Samotný soubor*/
		soubor,
		/**Příznak spisu*/
		priz_spis,
	}
	const enum GTemplatesControlTypeEnum {
		/**Dokument*/
		Dokument=0,
		/**Spis*/
		Spis=1,
		/**Dolozka*/
		Dolozka=2,
	}
}

//#endregion

