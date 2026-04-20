/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       report.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Report.WebClient\Gordic.Report.WebClient.csproj
*    created     2026-02-16 14:33:47
*    files       Reporter\SinglePage\Common\GSchedulerEnums.d.ts
*                Reporter\SinglePage\Dto\GAsyncHandlerOptionsDto.d.ts
*                Reporter\SinglePage\Dto\GBatchFilesInfoDto.d.ts
*                Reporter\SinglePage\Dto\GCreateReportDto.d.ts
*                Reporter\SinglePage\Dto\GetTreeResponseDto.d.ts
*                Reporter\SinglePage\Dto\GFrmaInfoDto.d.ts
*                Reporter\SinglePage\Dto\GNotificationDto.d.ts
*                Reporter\SinglePage\Dto\GPreselectedListItemDto.d.ts
*                Reporter\SinglePage\Dto\GReportCommonInfosDto.d.ts
*                Reporter\SinglePage\Dto\GReportDetailsDto.d.ts
*                Reporter\SinglePage\Dto\GReportPropsDto.d.ts
*                Reporter\SinglePage\Dto\GReportScheduleDto.d.ts
*                Reporter\SinglePage\Dto\GReportScheduleListFilterDto.d.ts
*                Reporter\SinglePage\Dto\GReportScheduleResponseDto.d.ts
*                Reporter\SinglePage\Dto\GReportTreeControlParamsDto.d.ts
*                Reporter\SinglePage\Dto\GReportTreeNodeDto.d.ts
*                Reporter\SinglePage\Dto\GRunAlgorithmOptionsDto.d.ts
*                Reporter\SinglePage\Dto\GScheduleDto.d.ts
*                Reporter\SinglePage\Dto\GScheduleEventListDto.d.ts
*                Reporter\SinglePage\Dto\GScheduleEventListResponseDto.d.ts
*                Reporter\SinglePage\Dto\GTemplateItem.d.ts
*                Reporter\SinglePage\Dto\GTemplatesDto.d.ts
*                Reporter\SinglePage\Scripts\GPrintAction.d.ts
*                Reporter\SinglePage\Scripts\GReportFormControl.d.ts
*                Reporter\SinglePage\Scripts\GReports.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Common\GSchedulerEnums.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Zpusob opakovani*/
	const enum ScheduleIterationType {
		/**Jednou*/
		Once,
		/**Denne*/
		Daily,
		/**Tydne*/
		Weekly,
		/**Mesicne*/
		Monthly,
		/**Pokazde za periodu*/
		EveryPeriod,
	}
	/**Typy dnu v mesici*/
	const enum ScheduleMonthType {
		/**Dny v mesici (1 - 31)*/
		Days,
		/**Dny v tydnu (pondeli-nedele)*/
		WeekDays,
	}
	/**Zpusob komprimace souboru*/
	const enum ScheduleMakePackageType {
		/**Bez komprimace*/
		No,
		/**Komprimace vsech soubour*/
		Yes,
		/**Kombinace jen tech velkych*/
		BigOnly,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GAsyncHandlerOptionsDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Options pro obecne handlery pri generovani pres async. ulohu*/
	interface GAsyncHandlerOptionsDto {
		/**Identifikace aplikace*/
		appName?: string|null;
	}
	const enum GAsyncHandlerOptionsDtoNames { appName = "appName",}
	const enum GAsyncHandlerOptionsDtoFragments { appName = "*",}
	const enum GAsyncHandlerOptionsDtoTypes { appName = "string",}
	const enum GAsyncHandlerOptionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GBatchFilesInfoDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO s informacemi o sestave generujici davky*/
	interface GBatchFilesInfoDto {
		/**Nazev adresare (bez cele cesty) v TempFiles dle nastaveni sestav*/
		directory?: string|null;
		/**Seznam souboru v adresari (@see Directory)*/
		files?: string[]|null;
	}
	const enum GBatchFilesInfoDtoNames { directory = "directory", files = "files",}
	const enum GBatchFilesInfoDtoFragments { directory = "*", files = "*",}
	const enum GBatchFilesInfoDtoTypes { directory = "string", files = "string[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GCreateReportDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO s parametry pro generovani reportu pomoci WS*/
	interface GCreateReportDto {
		/**Identifikator reportu*/
		Wrid?: string|null;
		/**Nazev sestavy*/
		Name?: string|null;
		/**Tiskove tema*/
		Tema?: string|null;
		/**OutputStyle - pozadovana pripona vygenerovaneho reportu*/
		OutputStyle?: string|null;
		/**Preselect*/
		Preselect?: boolean|null;
		/**RunAgain*/
		RunAgain?: boolean|null;
		/**Vlastnosti reportu*/
		Props?: Gordic.Report.WebClient.GReportPropsDto|null;
		/**Po vygenerovani sestavy nacte data*/
		LoadData?: boolean|null;
		/**Typ generatoru, ktery se pouzije pro generovani reportu*/
		ReportGeneratorType?: string|null;
		/**Trida pro generovani v async. uloze*/
		ReportGeneratorTypeAsync?: string|null;
		/**Generuje-li se pres async. ulohu, maji byt vysledky ulozene v databazi?*/
		Persistent?: boolean|null;
		/**Dalsi parametry pro generator (ke zpracovani v PrepareReport)*/
		ReportGeneratorParams?: object|null;
		/**Doba, po kterou se generuje synchronne v requestu. Pokud sestava trva dele po uplynuti doby se rozjede asynchronne.*/
		ReportGeneratorWaitToAsync?: number|null;
		/**Nazev tridy a metody pro omezeni Alv*/
		ServerRestrictionAlvMethod?: string|null;
		/**Nazev tridy a metody pro omezeni Alf*/
		ServerRestrictionAlfMethod?: string|null;
		/**Nazev tridy a metody pro upravu parametru sestavy pred generovanim. Metoda musi byt staticka a musi obsahovat argumenty:
		*     GUserProcess, IGReport a volitelne vlastni DTO objekt (ten se plni v customDto v gprintAction).
		*/
		ServerParameterMethod?: string|null;
		/**Custom dto pro doplneni parametru sestavy v ServerParameterMethod*/
		CustomDto?: object|null;
		/**StartFragment pro interaktivni GFRM*/
		StartFragment?: string|null;
		/**Vystupni adresar, do ktreho se report vytvori*/
		OutDir?: string|null;
		/**Nazev vystupniho souboru*/
		FileName?: string|null;
	}
	const enum GCreateReportDtoNames { Wrid = "Wrid", Name = "Name", Tema = "Tema", OutputStyle = "OutputStyle", Preselect = "Preselect", RunAgain = "RunAgain", Props = "Props", LoadData = "LoadData", ReportGeneratorType = "ReportGeneratorType", ReportGeneratorTypeAsync = "ReportGeneratorTypeAsync", Persistent = "Persistent", ReportGeneratorParams = "ReportGeneratorParams", ReportGeneratorWaitToAsync = "ReportGeneratorWaitToAsync", ServerRestrictionAlvMethod = "ServerRestrictionAlvMethod", ServerRestrictionAlfMethod = "ServerRestrictionAlfMethod", ServerParameterMethod = "ServerParameterMethod", CustomDto = "CustomDto", StartFragment = "StartFragment", OutDir = "OutDir", FileName = "FileName",}
	const enum GCreateReportDtoFragments { Wrid = "*", Name = "*", Tema = "*", OutputStyle = "*", Preselect = "*", RunAgain = "*", Props = "*", LoadData = "*", ReportGeneratorType = "*", ReportGeneratorTypeAsync = "*", Persistent = "*", ReportGeneratorParams = "*", ReportGeneratorWaitToAsync = "*", ServerRestrictionAlvMethod = "*", ServerRestrictionAlfMethod = "*", ServerParameterMethod = "*", CustomDto = "*", StartFragment = "*", OutDir = "*", FileName = "*",}
	const enum GCreateReportDtoTypes { Wrid = "string", Name = "string", Tema = "string", OutputStyle = "string", Preselect = "boolean", RunAgain = "boolean", Props = "Gordic.Report.WebClient.GReportPropsDto", LoadData = "boolean", ReportGeneratorType = "string", ReportGeneratorTypeAsync = "string", Persistent = "boolean", ReportGeneratorParams = "object", ReportGeneratorWaitToAsync = "number", ServerRestrictionAlvMethod = "string", ServerRestrictionAlfMethod = "string", ServerParameterMethod = "string", CustomDto = "object", StartFragment = "string", OutDir = "string", FileName = "string",}
	const enum GCreateReportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GetTreeResponseDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO se stromem sestav*/
	interface GetTreeResponseDto {
		/**Sestavy*/
		data: Gordic.Report.WebClient.GReportTreeNodeDto[];
		/**Platnost sestav ve stromu*/
		platnost: string;
		/**Vsechny zjistene formaty*/
		outputFormats: Gordic.Report.Interface.GFormatTypeInfoDto[];
		/**Jsou k dispozici oblibene?*/
		hasFavorites?: boolean|null;
		/**Zobrazuje slozky?*/
		showsFolders?: boolean|null;
		/**Ma slozky? (plati jen pro stromove zobrazeni)*/
		hasFolders?: boolean|null;
		/**Soucasti dat jsou pouze oblibene*/
		contains?: Gordic.Report.WebClient.GReportTreeBuilderLoadItemsType|null;
		/**Pouze generovane za poslednich N dni*/
		onlyGeneratedInDays?: number|null;
		/**Pouze generovane mym funkcnim mistem*/
		onlyGeneratedByMyIxsFun?: boolean|null;
		/**Titulek okna*/
		title?: string|null;
		/**Vsechna temata ve stromu sestav (klic = tema, value = nazev tematu)*/
		temata?: any|null;
		/**Posledni pouzite treeId (pro dynamicke do-loadovani dat)*/
		lastTreeId?: number|null;
		/**Rezim nacitani stromu*/
		treeLoadMode?: Gordic.Report.WebClient.GReportTreeBuilderTreeLoadMode|null;
	}
	const enum GetTreeResponseDtoNames { data = "data", platnost = "platnost", outputFormats = "outputFormats", hasFavorites = "hasFavorites", showsFolders = "showsFolders", hasFolders = "hasFolders", contains = "contains", onlyGeneratedInDays = "onlyGeneratedInDays", onlyGeneratedByMyIxsFun = "onlyGeneratedByMyIxsFun", title = "title", temata = "temata", lastTreeId = "lastTreeId", treeLoadMode = "treeLoadMode",}
	const enum GetTreeResponseDtoFragments { data = "*", platnost = "*", outputFormats = "*", hasFavorites = "*", showsFolders = "*", hasFolders = "*", contains = "*", onlyGeneratedInDays = "*", onlyGeneratedByMyIxsFun = "*", title = "*", temata = "*", lastTreeId = "*", treeLoadMode = "*",}
	const enum GetTreeResponseDtoTypes { data = "Gordic.Report.WebClient.GReportTreeNodeDto[]", platnost = "string", outputFormats = "Gordic.Report.Interface.GFormatTypeInfoDto[]", hasFavorites = "boolean", showsFolders = "boolean", hasFolders = "boolean", contains = "Gordic.Report.WebClient.GReportTreeBuilderLoadItemsType", onlyGeneratedInDays = "number", onlyGeneratedByMyIxsFun = "boolean", title = "string", temata = "any", lastTreeId = "number", treeLoadMode = "Gordic.Report.WebClient.GReportTreeBuilderTreeLoadMode",}
	const enum GetTreeResponseDtoTypeLengths {}
	/**Typ zobrazovanych polozek ve stromu sestav*/
	const enum GReportTreeBuilderLoadItemsType {
		/**Vsechny*/
		All,
		/**Oblibene*/
		Favorites,
		/**Redukovane dle nastaveni*/
		Reduced,
	}
	/**Rezim nacitani polozek stromu*/
	const enum GReportTreeBuilderTreeLoadMode {
		/**Dynamicky (pouze jedna uroven)*/
		Dynamic,
		/**Kompletni (rekurzivne cely strom)*/
		Complete,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GFrmaInfoDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Info k ulozeni GFRMA*/
	interface GFrmaInfoDto {
		/**Vystupni adresar*/
		OutDir?: string|null;
		/**Seznam souboru*/
		Files?: Gordic.Report.WebClient.GFrmaFileInfoDto[]|null;
		/**FileInfo*/
		OutFileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Index posledniho souboru??? Mozna posledniho zobrazeneho?*/
		LastIndex?: number|null;
	}
	const enum GFrmaInfoDtoNames { OutDir = "OutDir", Files = "Files", OutFileInfo = "OutFileInfo", LastIndex = "LastIndex",}
	const enum GFrmaInfoDtoFragments { OutDir = "*", Files = "*", OutFileInfo = "*", LastIndex = "*",}
	const enum GFrmaInfoDtoTypes { OutDir = "string", Files = "Gordic.Report.WebClient.GFrmaFileInfoDto[]", OutFileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", LastIndex = "number",}
	/**Jeden GFRMA soubor*/
	interface GFrmaFileInfoDto {
		/**Nazev souboru*/
		FileName?: string|null;
		/**ReportId*/
		Wrid?: string|null;
		/**RelatedUrls*/
		RelatedUrls?: string[]|null;
		/**Parametry sestavy*/
		ReportParams?: Gordic.Report.WebClient.GCreateReportDto|null;
	}
	const enum GFrmaFileInfoDtoNames { FileName = "FileName", Wrid = "Wrid", RelatedUrls = "RelatedUrls", ReportParams = "ReportParams",}
	const enum GFrmaFileInfoDtoFragments { FileName = "*", Wrid = "*", RelatedUrls = "*", ReportParams = "*",}
	const enum GFrmaFileInfoDtoTypes { FileName = "string", Wrid = "string", RelatedUrls = "string[]", ReportParams = "Gordic.Report.WebClient.GCreateReportDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GNotificationDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO k mailove notifikaci pro odlozene ulohy*/
	interface GNotificationDto {
		/**Adresati*/
		Recipients?: string[]|null;
		/**Predmet*/
		Subject?: string|null;
		/**Obsah mailu*/
		Content?: string|null;
		/**Zpusob zabaleni prilohy*/
		MakePackage?: Gordic.Report.WebClient.ScheduleMakePackageType|null;
		/**Je zakazane poslat mail?*/
		SendMailDisabled?: boolean|null;
		/**Ulozit soubor na sitovy disk*/
		ShouldSaveFile?: boolean|null;
		/**Cesta k sitovemu disku*/
		SchedulePath?: string|null;
		/**Nazev souboru*/
		FileName?: string|null;
		/**ID naplanovane udalosti*/
		IdUda?: string|null;
		/**Je zakazane vyvolat udalost?*/
		EventInvocationDisabled?: boolean|null;
		/**Povolene ulozeni do DMS?*/
		DmsSaveDisabled?: boolean|null;
		/**DMS*/
		DmsZpus?: number|null;
		/**K dokumentu/el.obr - pid?*/
		DmsPid1?: string|null;
		/**K dokumentu/el.obr - podepsat?*/
		DmsSign?: boolean|null;
		/**K dokumentu/el.obr - razitkovat?*/
		DmsTimestamp?: boolean|null;
		/**Novy dokument - typ*/
		DmsTypDok?: string|null;
		/**Novy dokument - podepsat?*/
		DmsSign2?: boolean|null;
		/**Novy dokument - razitkovat?*/
		DmsTimestamp2?: boolean|null;
		/**Novy dokument - souvisejici s?*/
		DmsPid2?: string|null;
		/**Novy dokument - nazev?*/
		DmsBody?: string|null;
		/**Novy dokument - znacka?*/
		DmsPoznamka?: string|null;
		/**Novy dokument - predat funkci?*/
		DmsFun?: string|null;
		/**Novy dokument - spis p?*/
		DmsSpisPl?: string|null;
		/**Novy dokument - spis zn?*/
		DmsSpisZn?: string|null;
	}
	const enum GNotificationDtoNames { Recipients = "Recipients", Subject = "Subject", Content = "Content", MakePackage = "MakePackage", SendMailDisabled = "SendMailDisabled", ShouldSaveFile = "ShouldSaveFile", SchedulePath = "SchedulePath", FileName = "FileName", IdUda = "IdUda", EventInvocationDisabled = "EventInvocationDisabled", DmsSaveDisabled = "DmsSaveDisabled", DmsZpus = "DmsZpus", DmsPid1 = "DmsPid1", DmsSign = "DmsSign", DmsTimestamp = "DmsTimestamp", DmsTypDok = "DmsTypDok", DmsSign2 = "DmsSign2", DmsTimestamp2 = "DmsTimestamp2", DmsPid2 = "DmsPid2", DmsBody = "DmsBody", DmsPoznamka = "DmsPoznamka", DmsFun = "DmsFun", DmsSpisPl = "DmsSpisPl", DmsSpisZn = "DmsSpisZn",}
	const enum GNotificationDtoFragments { Recipients = "*", Subject = "*", Content = "*", MakePackage = "*", SendMailDisabled = "*", ShouldSaveFile = "*", SchedulePath = "*", FileName = "*", IdUda = "*", EventInvocationDisabled = "*", DmsSaveDisabled = "*", DmsZpus = "*", DmsPid1 = "*", DmsSign = "*", DmsTimestamp = "*", DmsTypDok = "*", DmsSign2 = "*", DmsTimestamp2 = "*", DmsPid2 = "*", DmsBody = "*", DmsPoznamka = "*", DmsFun = "*", DmsSpisPl = "*", DmsSpisZn = "*",}
	const enum GNotificationDtoTypes { Recipients = "string[]", Subject = "string", Content = "string", MakePackage = "Gordic.Report.WebClient.ScheduleMakePackageType", SendMailDisabled = "boolean", ShouldSaveFile = "boolean", SchedulePath = "string", FileName = "string", IdUda = "string", EventInvocationDisabled = "boolean", DmsSaveDisabled = "boolean", DmsZpus = "number", DmsPid1 = "string", DmsSign = "boolean", DmsTimestamp = "boolean", DmsTypDok = "string", DmsSign2 = "boolean", DmsTimestamp2 = "boolean", DmsPid2 = "string", DmsBody = "string", DmsPoznamka = "string", DmsFun = "string", DmsSpisPl = "string", DmsSpisZn = "string",}
	const enum GNotificationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GPreselectedListItemDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO do seznamu preselected sestav*/
	interface GPreselectedListItemDto {
		/**WRID*/
		reportId?: string|null;
		/**Nazev sestavy*/
		reportName?: string|null;
		/**Tema*/
		tema?: string|null;
		/**Tema nazev*/
		temaName?: string|null;
		/**Nazev formatu*/
		formatName?: string|null;
		/**Typ vystupu*/
		outputStyle?: string|null;
		/**IdSes*/
		idSes?: string|null;
		/**IxsAlv*/
		ixsAlv?: string|null;
		/**Selhalo nacteni dat o sestave (podrobnosti viz log)*/
		loadFailed?: boolean|null;
		/**Rok*/
		year?: string|null;
	}
	const enum GPreselectedListItemDtoNames { reportId = "reportId", reportName = "reportName", tema = "tema", temaName = "temaName", formatName = "formatName", outputStyle = "outputStyle", idSes = "idSes", ixsAlv = "ixsAlv", loadFailed = "loadFailed", year = "year",}
	const enum GPreselectedListItemDtoFragments { reportId = "*", reportName = "*", tema = "*", temaName = "*", formatName = "*", outputStyle = "*", idSes = "*", ixsAlv = "*", loadFailed = "*", year = "*",}
	const enum GPreselectedListItemDtoTypes { reportId = "string", reportName = "string", tema = "string", temaName = "string", formatName = "string", outputStyle = "string", idSes = "string", ixsAlv = "string", loadFailed = "boolean", year = "string",}
	const enum GPreselectedListItemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportCommonInfosDto.d.ts 

declare namespace Gordic.Report.WebClient.Reporter.SinglePage.Dto {
	/**Vybrane informace z Report.CommonInfos*/
	interface GReportCommonInfosDto {
		/**Primy tisk. Zname hodnoty:
		*     0 = normal (bez tisku).
		*     1 = tisk s nastavenim (zobrazí se dialog vytisknout ano/ne, nastavení tisku)
		*     2 = tisk - rovnou poslani na tiskarnu.
		*/
		PRIMY_TISK?: number|null;
	}
	const enum GReportCommonInfosDtoNames { PRIMY_TISK = "PRIMY_TISK",}
	const enum GReportCommonInfosDtoFragments { PRIMY_TISK = "*",}
	const enum GReportCommonInfosDtoTypes { PRIMY_TISK = "number",}
	const enum GReportCommonInfosDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportDetailsDto.d.ts 

declare namespace Gordic.Report.WebClient.Reporter.SinglePage.Dto {
	/**Detail sestavy*/
	interface GReportDetailsDto {
		/**Typ distribuce ALV*/
		AlvTypDist?: string|null;
		/**Datum modifikace*/
		DatModif?: string|null;
		/**Datum posledni zmeny*/
		DatZmena?: string|null;
		/**Uzivatelsky popis*/
		Desc?: string|null;
		/**Nazev souboru*/
		FileName?: string|null;
		/**Id sestavy*/
		IdSes?: string|null;
		/**Vytvoril*/
		Maker?: string|null;
		/**Nazev*/
		Name?: string|null;
		/**Pid sestavy*/
		Pid?: string|null;
		/**Platnost od*/
		PlatOd?: string|null;
		/**Platnost do*/
		PlatDo?: string|null;
		/**?*/
		PrizVazby?: string|null;
		/**Tip dist?*/
		TypDist?: string|null;
		/**Zmenu provedl*/
		ZmenuProv?: string|null;
		/**Data z ALV*/
		Data?: Array<{Name: string, Value: string}>|null;
	}
	const enum GReportDetailsDtoNames { AlvTypDist = "AlvTypDist", DatModif = "DatModif", DatZmena = "DatZmena", Desc = "Desc", FileName = "FileName", IdSes = "IdSes", Maker = "Maker", Name = "Name", Pid = "Pid", PlatOd = "PlatOd", PlatDo = "PlatDo", PrizVazby = "PrizVazby", TypDist = "TypDist", ZmenuProv = "ZmenuProv", Data = "Data",}
	const enum GReportDetailsDtoFragments { AlvTypDist = "*", DatModif = "*", DatZmena = "*", Desc = "*", FileName = "*", IdSes = "*", Maker = "*", Name = "*", Pid = "*", PlatOd = "*", PlatDo = "*", PrizVazby = "*", TypDist = "*", ZmenuProv = "*", Data = "*",}
	const enum GReportDetailsDtoTypes { AlvTypDist = "string", DatModif = "string", DatZmena = "string", Desc = "string", FileName = "string", IdSes = "string", Maker = "string", Name = "string", Pid = "string", PlatOd = "string", PlatDo = "string", PrizVazby = "string", TypDist = "string", ZmenuProv = "string", Data = "Array<{Name: string, Value: string}>",}
	const enum GReportDetailsDtoTypeLengths {}
}
declare namespace Gordic.Report.WebClient.Reporter.SinglePage.Dto.GReportDetailsDto {
	/**Data v ALV*/
	interface GData {
		/**Name*/
		Name?: string|null;
		/**Value*/
		Value?: string|null;
	}
	const enum GDataNames { Name = "Name", Value = "Value",}
	const enum GDataFragments { Name = "*", Value = "*",}
	const enum GDataTypes { Name = "string", Value = "string",}
	const enum GDataTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportPropsDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Obecne vlastnosti reportu*/
	interface GReportPropsDto {
		/**Platnost (pretypovatelne na GEkoDate)*/
		Platnost?: string|null;
		/**?*/
		RestrictionAlf?: string|null;
		/**?*/
		RestrictionAlv?: string|null;
		/**Parametry reportu (X0000 - X0009 i dalsi vlastni)*/
		ReportParams?: ObjectLiteral<string>|null;
	}
	const enum GReportPropsDtoNames { Platnost = "Platnost", RestrictionAlf = "RestrictionAlf", RestrictionAlv = "RestrictionAlv", ReportParams = "ReportParams",}
	const enum GReportPropsDtoFragments { Platnost = "*", RestrictionAlf = "*", RestrictionAlv = "*", ReportParams = "*",}
	const enum GReportPropsDtoTypes { Platnost = "string", RestrictionAlf = "string", RestrictionAlv = "string", ReportParams = "ObjectLiteral<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportScheduleDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO k planovani odlozeneho generovani sestavy*/
	interface GReportScheduleDto {
		/**Potomek Gordic.Report.WebClient.GReportScheduler*/
		ReportSchedulerClassName?: string|null;
		/**Nazev ulohy*/
		TaskName?: string|null;
		/**Poznamka*/
		Note?: string|null;
		/**Planovani*/
		Schedule?: Gordic.Report.WebClient.GScheduleDto|null;
		/**Mailova notifikace*/
		Notification?: Gordic.Report.WebClient.GNotificationDto|null;
		/**Parametry reportu*/
		Report?: Gordic.Report.WebClient.GCreateReportDto|null;
		/**PorCisUlohy*/
		PorCisUlohy?: number|null;
		/**IxsPoz*/
		IxsPoz?: string|null;
		/**Parametry odl. ulohy*/
		Parameters?: Gordic.Report.Interface.GScheduledReportParameter[]|null;
		/**Vlastnik*/
		IxsFun?: string|null;
		/**ZmenuProv*/
		ZmenuProv?: string|null;
		/**Balik*/
		Balik_PorCisKud?: number|null;
		/**IxsPoz baliku*/
		Balik_IxsPoz?: string|null;
		/**IdUda*/
		IdUda?: string|null;
		/**Seznam pro_cis_kud (sestav) v baliku*/
		BalikKuds?: number[]|null;
	}
	const enum GReportScheduleDtoNames { ReportSchedulerClassName = "ReportSchedulerClassName", TaskName = "TaskName", Note = "Note", Schedule = "Schedule", Notification = "Notification", Report = "Report", PorCisUlohy = "PorCisUlohy", IxsPoz = "IxsPoz", Parameters = "Parameters", IxsFun = "IxsFun", ZmenuProv = "ZmenuProv", Balik_PorCisKud = "Balik_PorCisKud", Balik_IxsPoz = "Balik_IxsPoz", IdUda = "IdUda", BalikKuds = "BalikKuds",}
	const enum GReportScheduleDtoFragments { ReportSchedulerClassName = "*", TaskName = "*", Note = "*", Schedule = "*", Notification = "*", Report = "*", PorCisUlohy = "*", IxsPoz = "*", Parameters = "*", IxsFun = "*", ZmenuProv = "*", Balik_PorCisKud = "*", Balik_IxsPoz = "*", IdUda = "*", BalikKuds = "*",}
	const enum GReportScheduleDtoTypes { ReportSchedulerClassName = "string", TaskName = "string", Note = "string", Schedule = "Gordic.Report.WebClient.GScheduleDto", Notification = "Gordic.Report.WebClient.GNotificationDto", Report = "Gordic.Report.WebClient.GCreateReportDto", PorCisUlohy = "number", IxsPoz = "string", Parameters = "Gordic.Report.Interface.GScheduledReportParameter[]", IxsFun = "string", ZmenuProv = "string", Balik_PorCisKud = "number", Balik_IxsPoz = "string", IdUda = "string", BalikKuds = "number[]",}
	const enum GReportScheduleDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportScheduleListFilterDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Filtrovaci DTO pro seznam odlozenych uloh*/
	interface GReportScheduleListFilterDto {
		/**Aktivita*/
		aktivita?: number|null;
		/**Typ udalosti*/
		id_uda?: string[]|null;
		/**Vlastnik naplanovane udalosti*/
		ixs_fun?: GBaseFilter<string>|null;
		/**por_cis_kud*/
		por_cis_kud?: GBaseFilter<number>|null;
	}
	const enum GReportScheduleListFilterDtoNames { aktivita = "aktivita", id_uda = "id_uda", ixs_fun = "ixs_fun", por_cis_kud = "por_cis_kud",}
	const enum GReportScheduleListFilterDtoFragments { aktivita = "*", id_uda = "*", ixs_fun = "*", por_cis_kud = "*",}
	const enum GReportScheduleListFilterDtoTypes { aktivita = "number", id_uda = "string[]", ixs_fun = "GBaseFilter<string>", por_cis_kud = "GBaseFilter<number>",}
	const enum GReportScheduleListFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportScheduleResponseDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Odpoved na pozadavek k odlozenemu zpracovani sestavy*/
	interface GReportScheduleResponseDto {
		/**Identifikator pozadavku*/
		IxsPoz?: string|null;
		/**Cislo ulohy*/
		PorCisUlohy?: string|null;
	}
	const enum GReportScheduleResponseDtoNames { IxsPoz = "IxsPoz", PorCisUlohy = "PorCisUlohy",}
	const enum GReportScheduleResponseDtoFragments { IxsPoz = "*", PorCisUlohy = "*",}
	const enum GReportScheduleResponseDtoTypes { IxsPoz = "string", PorCisUlohy = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportTreeControlParamsDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Parametry tematu pro zobrazeni stromu reportu*/
	interface GReportTreeControlParamsDto {
		/**Tema sestav*/
		Tema?: string|null;
		/**Titulek okna*/
		Title?: string|null;
		/**ID stromu*/
		IxsStr?: string|null;
		/**Platnost sestavy*/
		Platnost?: string|null;
		/**Typ generatoru ke generovani reportu (musi byt GReportGenerator nebo odvozeny)*/
		ReportGeneratorType?: string|null;
		/**SelectReportOnly*/
		SelectReportOnly?: boolean|null;
		/**Pokud je strom sestav v rezimu vyberu a je tam jen jedna sestava, pak se standardne vybere a okno zavre.
		*     Nastavenim teto hodnoty na true lze nechat okno otevrene.
		*/
		ShowJustOneReport?: boolean|null;
		/**Povoluje viditelnost možnosti přednastavení sestavy(default = true)*/
		PreselectVisible?: boolean|null;
		/**WRID sestavy, ktera ma byt predvybrana ve stromu sestav*/
		ReportId?: string|null;
		/**Je-li true, nezobrazi dalsi typy formatu*/
		SelectDefaultFormatOnly?: boolean|null;
		/**Nazev tridy a metody pro omezeni Alf*/
		ServerRestrictionAlfMethod?: string|null;
		/**Nazev tridy a metody pro omezeni Alv*/
		ServerRestrictionAlvMethod?: string|null;
		/**Vlastni DTO predavane do ServerRestrictionAlfMethod a ServerRestrictionAlvMethod*/
		CustomDto?: object|null;
		/**Zakazani tlacitka s odlozenym zpracovanim*/
		SchedulingDisabled?: boolean|null;
		/**Loadne pouze oblibene sestavy*/
		LoadFavoritesOnly?: boolean|null;
		/**Loadne pouze redukovane (pokud pro to existuje nastaveni)*/
		LoadReducedOnly?: boolean|null;
		/**Loadnout vsechny polozky (nehlede posledne generovane sestavy). Pozor! Nezamenovat s TreeLoadMode!!!*/
		LoadAll?: boolean|null;
		/**Rezim nacitani stromu*/
		TreeLoadMode?: Gordic.Report.WebClient.GReportTreeBuilderTreeLoadMode|null;
		/**Je-li true, necha okno sestav po generovani otevrene*/
		KeepOpen?: boolean|null;
		/**Zobrazovat slozky? Nelze kombinovat s LoadFavoritesOnly*/
		ShowFolders?: boolean|null;
		/**Byla zmacknuta klavesa shift pri spousteni akce k otevreni stromu sestav?*/
		ShiftKeyPressed?: boolean|null;
		/**Generovat pres asynchronni ulohu*/
		Async?: boolean|null;
		/**Zpusob generovani "window" | "notifications". Default = "window".*/
		WorkflowType?: 'window'|'notifications'|null;
		/**Posledne generovane sestavy za N dni*/
		OnlyGeneratedInDays?: number|null;
		/**Pouze generovane za dane ixs_fun*/
		OnlyGeneratedByMyIxsFun?: boolean|null;
		/**Nejvyssi treeId*/
		LastTreeId?: number|null;
	}
	const enum GReportTreeControlParamsDtoNames { Tema = "Tema", Title = "Title", IxsStr = "IxsStr", Platnost = "Platnost", ReportGeneratorType = "ReportGeneratorType", SelectReportOnly = "SelectReportOnly", ShowJustOneReport = "ShowJustOneReport", PreselectVisible = "PreselectVisible", ReportId = "ReportId", SelectDefaultFormatOnly = "SelectDefaultFormatOnly", ServerRestrictionAlfMethod = "ServerRestrictionAlfMethod", ServerRestrictionAlvMethod = "ServerRestrictionAlvMethod", CustomDto = "CustomDto", SchedulingDisabled = "SchedulingDisabled", LoadFavoritesOnly = "LoadFavoritesOnly", LoadReducedOnly = "LoadReducedOnly", LoadAll = "LoadAll", TreeLoadMode = "TreeLoadMode", KeepOpen = "KeepOpen", ShowFolders = "ShowFolders", ShiftKeyPressed = "ShiftKeyPressed", Async = "Async", WorkflowType = "WorkflowType", OnlyGeneratedInDays = "OnlyGeneratedInDays", OnlyGeneratedByMyIxsFun = "OnlyGeneratedByMyIxsFun", LastTreeId = "LastTreeId",}
	const enum GReportTreeControlParamsDtoFragments { Tema = "*", Title = "*", IxsStr = "*", Platnost = "*", ReportGeneratorType = "*", SelectReportOnly = "*", ShowJustOneReport = "*", PreselectVisible = "*", ReportId = "*", SelectDefaultFormatOnly = "*", ServerRestrictionAlfMethod = "*", ServerRestrictionAlvMethod = "*", CustomDto = "*", SchedulingDisabled = "*", LoadFavoritesOnly = "*", LoadReducedOnly = "*", LoadAll = "*", TreeLoadMode = "*", KeepOpen = "*", ShowFolders = "*", ShiftKeyPressed = "*", Async = "*", WorkflowType = "*", OnlyGeneratedInDays = "*", OnlyGeneratedByMyIxsFun = "*", LastTreeId = "*",}
	const enum GReportTreeControlParamsDtoTypes { Tema = "string", Title = "string", IxsStr = "string", Platnost = "string", ReportGeneratorType = "string", SelectReportOnly = "boolean", ShowJustOneReport = "boolean", PreselectVisible = "boolean", ReportId = "string", SelectDefaultFormatOnly = "boolean", ServerRestrictionAlfMethod = "string", ServerRestrictionAlvMethod = "string", CustomDto = "object", SchedulingDisabled = "boolean", LoadFavoritesOnly = "boolean", LoadReducedOnly = "boolean", LoadAll = "boolean", TreeLoadMode = "Gordic.Report.WebClient.GReportTreeBuilderTreeLoadMode", KeepOpen = "boolean", ShowFolders = "boolean", ShiftKeyPressed = "boolean", Async = "boolean", WorkflowType = "'window'|'notifications'", OnlyGeneratedInDays = "number", OnlyGeneratedByMyIxsFun = "boolean", LastTreeId = "number",}
	const enum GReportTreeControlParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GReportTreeNodeDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Info o jednom uzlu stromu (slozka nebo sestava)*/
	interface GReportTreeNodeDto {
		/**Id parenta*/
		treeParentId?: number|null;
		/**Id nodu*/
		treeId: number;
		/**Wrid*/
		reportId?: string|null;
		/**Name*/
		name: string;
		/**Vychozi nazev (bez id sestavy, neprejmenovany oblibenyma, apod.)*/
		originalName: string;
		/**Img*/
		img?: string|null;
		/**Icon*/
		icon: string;
		/**Podporovane formaty oddelene |*/
		allowedOutputTypes?: string|null;
		/**Id sestavy*/
		idSes?: string|null;
		tema: string;
		/**Zkratka tematu*/
		temaZkr?: string|null;
		/**Je odlozitelne*/
		isOdlozitelne: boolean;
		/**Je mozne sestavu dat do oblibenych?*/
		isFavoritizable: boolean;
		/**Je oblibene*/
		isFavorite: boolean;
		favIcon?: string|null;
		/**Je aktivni*/
		isAktivni: boolean;
		rokMesOd: string;
		rokMesDo: string;
		typVyst: string;
		typAlv?: string|null;
		ixsStr?: string|null;
		ixsAlv?: string|null;
		ixsFrm?: string|null;
		ixsXme?: string|null;
		fromFos?: boolean|null;
		hasFormats?: boolean|null;
		formVyst?: string|null;
	}
	const enum GReportTreeNodeDtoNames { treeParentId = "treeParentId", treeId = "treeId", reportId = "reportId", name = "name", originalName = "originalName", img = "img", icon = "icon", allowedOutputTypes = "allowedOutputTypes", idSes = "idSes", tema = "tema", temaZkr = "temaZkr", isOdlozitelne = "isOdlozitelne", isFavoritizable = "isFavoritizable", isFavorite = "isFavorite", favIcon = "favIcon", isAktivni = "isAktivni", rokMesOd = "rokMesOd", rokMesDo = "rokMesDo", typVyst = "typVyst", typAlv = "typAlv", ixsStr = "ixsStr", ixsAlv = "ixsAlv", ixsFrm = "ixsFrm", ixsXme = "ixsXme", fromFos = "fromFos", hasFormats = "hasFormats", formVyst = "formVyst",}
	const enum GReportTreeNodeDtoFragments { treeParentId = "*", treeId = "*", reportId = "*", name = "*", originalName = "*", img = "*", icon = "*", allowedOutputTypes = "*", idSes = "*", tema = "*", temaZkr = "*", isOdlozitelne = "*", isFavoritizable = "*", isFavorite = "*", favIcon = "*", isAktivni = "*", rokMesOd = "*", rokMesDo = "*", typVyst = "*", typAlv = "*", ixsStr = "*", ixsAlv = "*", ixsFrm = "*", ixsXme = "*", fromFos = "*", hasFormats = "*", formVyst = "*",}
	const enum GReportTreeNodeDtoTypes { treeParentId = "number", treeId = "number", reportId = "string", name = "string", originalName = "string", img = "string", icon = "string", allowedOutputTypes = "string", idSes = "string", tema = "string", temaZkr = "string", isOdlozitelne = "boolean", isFavoritizable = "boolean", isFavorite = "boolean", favIcon = "string", isAktivni = "boolean", rokMesOd = "string", rokMesDo = "string", typVyst = "string", typAlv = "string", ixsStr = "string", ixsAlv = "string", ixsFrm = "string", ixsXme = "string", fromFos = "boolean", hasFormats = "boolean", formVyst = "string",}
	const enum GReportTreeNodeDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GRunAlgorithmOptionsDto.d.ts 

declare namespace Gordic.Report.WebClient.Reporter.SinglePage.Dto {
	/**DTO pro spusteni RulAlgorithm*/
	interface GRunAlgorithmOptionsDto {
		/**Tema sestavy*/
		tema?: string|null;
		/**Wrid sestavy*/
		reportId?: string|null;
		/**Parametry reportu (X0000 - X0009 i dalsi vlastni)*/
		reportParams?: ObjectLiteral<string>|null;
		/**Custom dto pro doplneni parametru sestavy v ServerParameterMethod*/
		customDto?: object|null;
		/**Nazev tridy a metody pro omezeni Alv*/
		serverRestrictionAlvMethod?: string|null;
	}
	const enum GRunAlgorithmOptionsDtoNames { tema = "tema", reportId = "reportId", reportParams = "reportParams", customDto = "customDto", serverRestrictionAlvMethod = "serverRestrictionAlvMethod",}
	const enum GRunAlgorithmOptionsDtoFragments { tema = "*", reportId = "*", reportParams = "*", customDto = "*", serverRestrictionAlvMethod = "*",}
	const enum GRunAlgorithmOptionsDtoTypes { tema = "string", reportId = "string", reportParams = "ObjectLiteral<string>", customDto = "object", serverRestrictionAlvMethod = "string",}
	const enum GRunAlgorithmOptionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GScheduleDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO k naplanovani ulohy*/
	interface GScheduleDto {
		/**Zpusob opakovani*/
		Iteration?: Gordic.Report.WebClient.ScheduleIterationType|null;
		/**Zacatek a konec ulohy*/
		DateInterval?: GIntervalDto<JsonDate>|null;
		/**Ma byt uloha odebrana po poslednim zpracovani?*/
		ShouldRemoveAfterLast?: boolean|null;
		/**Pocet opakovani*/
		RepDays?: number|null;
		/**Pocet opakovani (tydny)*/
		RepWeeks?: number|null;
		/**Dny v tydnu*/
		WeekDays?: number[]|null;
		/**Zpusob opakovani v mesici*/
		MonthType?: Gordic.Report.WebClient.ScheduleMonthType|null;
		/**Vybrane mesice*/
		Months?: number[]|null;
		/**Vybrane dny v mesici (1 - 31, -1 = posledni)*/
		MonthDays?: number[]|null;
		/**Tydny v mesici (0 - 4, 4 = posledni)*/
		MonthWeeks?: number[]|null;
		/**Dny v tydnu (po-ne 0-6 + 7 - posledni den v mesici)*/
		MonthWeekDays?: number[]|null;
		/**Interval opakovani*/
		Period?: number|null;
		/**Typ opakovani. Podporovane hodnoty: m - minuty, h - hodiny, d - dny, w - tydny.*/
		PeriodType?: string|null;
		/**Cas behem dne od - hodiny*/
		TimeFromHour?: number|null;
		/**Cas behem dne od - minuty*/
		TimeFromMinute?: number|null;
		/**Cas behem dne do - hodiny*/
		TimeToHour?: number|null;
		/**Cas behem dne do - minuty*/
		TimeToMinute?: number|null;
	}
	const enum GScheduleDtoNames { Iteration = "Iteration", DateInterval = "DateInterval", ShouldRemoveAfterLast = "ShouldRemoveAfterLast", RepDays = "RepDays", RepWeeks = "RepWeeks", WeekDays = "WeekDays", MonthType = "MonthType", Months = "Months", MonthDays = "MonthDays", MonthWeeks = "MonthWeeks", MonthWeekDays = "MonthWeekDays", Period = "Period", PeriodType = "PeriodType", TimeFromHour = "TimeFromHour", TimeFromMinute = "TimeFromMinute", TimeToHour = "TimeToHour", TimeToMinute = "TimeToMinute",}
	const enum GScheduleDtoFragments { Iteration = "*", DateInterval = "*", ShouldRemoveAfterLast = "*", RepDays = "*", RepWeeks = "*", WeekDays = "*", MonthType = "*", Months = "*", MonthDays = "*", MonthWeeks = "*", MonthWeekDays = "*", Period = "*", PeriodType = "*", TimeFromHour = "*", TimeFromMinute = "*", TimeToHour = "*", TimeToMinute = "*",}
	const enum GScheduleDtoTypes { Iteration = "Gordic.Report.WebClient.ScheduleIterationType", DateInterval = "GIntervalDto<JsonDate>", ShouldRemoveAfterLast = "boolean", RepDays = "number", RepWeeks = "number", WeekDays = "number[]", MonthType = "Gordic.Report.WebClient.ScheduleMonthType", Months = "number[]", MonthDays = "number[]", MonthWeeks = "number[]", MonthWeekDays = "number[]", Period = "number", PeriodType = "string", TimeFromHour = "number", TimeFromMinute = "number", TimeToHour = "number", TimeToMinute = "number",}
	const enum GScheduleDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GScheduleEventListDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**DTO jedne naplanovane udalosti v seznamu odlozenych udalosti*/
	interface GScheduleEventListDto {
		id_ses?: string|null;
		/**Autogenerated.*/
		por_cis_kud?: number|null;
		/**Autogenerated.*/
		id_uda?: string|null;
		/**Autogenerated.*/
		id_uda_txt?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		cfg_uda?: string|null;
		/**Autogenerated.*/
		comp_name?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		nazev_ref?: string|null;
		/**Autogenerated.*/
		config_uda?: string|null;
		/**Autogenerated.*/
		interval?: string|null;
		/**Autogenerated.*/
		start_date?: JsonDate|null;
		/**Autogenerated.*/
		ixs_fun?: string|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		next_date?: string|null;
		/**Autogenerated.*/
		dat_last_gen?: JsonDate|null;
		/**Autogenerated.*/
		aktivita_uda?: number|null;
		/**Autogenerated.*/
		por_cis_pri?: number|null;
	}
	const enum GScheduleEventListDtoNames { id_ses = "id_ses", por_cis_kud = "por_cis_kud", id_uda = "id_uda", id_uda_txt = "id_uda_txt", poznamka = "poznamka", cfg_uda = "cfg_uda", comp_name = "comp_name", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", config_uda = "config_uda", interval = "interval", start_date = "start_date", ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", next_date = "next_date", dat_last_gen = "dat_last_gen", aktivita_uda = "aktivita_uda", por_cis_pri = "por_cis_pri",}
	const enum GScheduleEventListDtoFragments { id_ses = "*", por_cis_kud = "*", id_uda = "*", id_uda_txt = "*", poznamka = "*", cfg_uda = "*", comp_name = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", config_uda = "*", interval = "*", start_date = "*", ixs_fun = "*", nazev_rf = "*", next_date = "*", dat_last_gen = "*", aktivita_uda = "*", por_cis_pri = "*",}
	const enum GScheduleEventListDtoTypes { id_ses = "string", por_cis_kud = "number", id_uda = "string", id_uda_txt = "string", poznamka = "string", cfg_uda = "string", comp_name = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", config_uda = "string", interval = "string", start_date = "JsonDate", ixs_fun = "string", nazev_rf = "string", next_date = "string", dat_last_gen = "JsonDate", aktivita_uda = "number", por_cis_pri = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GScheduleEventListResponseDto.d.ts 

declare namespace Gordic.Report.WebClient {
	/**Response k incializaci odl. uloh*/
	interface GScheduleEventListInitDto {
		/**ixs_fun*/
		ixs_fun: string;
		/**editCiziODL*/
		editCiziODL: boolean;
		/**zrusCiziODL*/
		zrusCiziODL: boolean;
	}
	const enum GScheduleEventListInitDtoNames { ixs_fun = "ixs_fun", editCiziODL = "editCiziODL", zrusCiziODL = "zrusCiziODL",}
	const enum GScheduleEventListInitDtoFragments { ixs_fun = "*", editCiziODL = "*", zrusCiziODL = "*",}
	const enum GScheduleEventListInitDtoTypes { ixs_fun = "string", editCiziODL = "boolean", zrusCiziODL = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GTemplateItem.d.ts 

declare namespace Gordic.Report.WebClient {
	interface GTemplateItem {
		name?: string|null;
		value?: string|null;
	}
	const enum GTemplateItemNames { name = "name", value = "value",}
	const enum GTemplateItemFragments { name = "*", value = "*",}
	const enum GTemplateItemTypes { name = "string", value = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Dto\GTemplatesDto.d.ts 

declare namespace Gordic.Report.WebClient {
	interface GTemplatesDto {
		id?: number|null;
		name?: string|null;
		type?: Gordic.Report.WebClient.ItemType|null;
		parentId?: number|null;
		extension?: string|null;
		fullPath?: string|null;
		favorite_int?: number|null;
	}
	const enum GTemplatesDtoNames { id = "id", name = "name", type = "type", parentId = "parentId", extension = "extension", fullPath = "fullPath", favorite_int = "favorite_int",}
	const enum GTemplatesDtoFragments { id = "*", name = "*", type = "*", parentId = "*", extension = "*", fullPath = "*", favorite_int = "*",}
	const enum GTemplatesDtoTypes { id = "number", name = "string", type = "Gordic.Report.WebClient.ItemType", parentId = "number", extension = "string", fullPath = "string", favorite_int = "number",}
	const enum GTemplatesDtoTypeLengths {}
	const enum ItemType {
		File,
		Directory,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Scripts\GPrintAction.d.ts 

declare type GReportParams = IGDefaultReportparams & ObjectLiteral<any>;

interface IGDefaultReportparams {
    X0000?: string;
    X0001?: string;
    X0002?: string;
    X0003?: string;
    X0004?: string;
    X0005?: string;
    X0006?: string;
    X0007?: string;
    X0008?: string;
    X0009?: string;
}

interface IGPrintActionReportInfo {
    /** WRID sestavy */
    reportId: string;

    /** ID sestavy */
    idSes: string;

    /** Zda se jedna o sestavu */
    isReport: boolean;

    /** */
    allowedTypes: string;

    /** Slozenina nazvu a id sestavy*/
    name: string;

    /** Pouze nazev */
    nameOnly: string;

    /** Vybrany vystup */
    outputStyle?: string;

    /** Tema */
    tema: string;

    /** Lze jej planovat? */
    schedulable: boolean;

    /** DTO sestavy ve stromu sestav (k pripadnemu dalsimu zpracovani) */
    node?: Gordic.Report.WebClient.GReportTreeNodeDto;

    /** DmsInfo (k dispozici po vygenerovani sestavy) */
    dmsInfo?: Gordic.Report.Interface.GReportDmsInfoDto;
}

interface IGPrintActionReportFinishedInfo extends IGPrintActionReportInfo {
    customData: ObjectLiteral<string>;
}

interface IGPrintActionReportDataCollectedInfo extends IGPrintActionReportInfo {
    formData: any;
}

type IGPrintActionReportEvent = (this: GAction & IGPrintActionParams, event: JQueryEventObject, reportInfo?: IGPrintActionReportInfo) => void;
type IGPrintActionReportGeneratedEvent = (this: GAction & IGPrintActionParams, event: JQueryEventObject, reportInfo?: IGPrintActionReportInfo & { fileOps: Gordic.Report.WebClient.IGReportFileOps }) => void;
type IGPrintActionReportFinishedEvent = (this: GAction & IGPrintActionParams, event: JQueryEventObject, reportInfo?: IGPrintActionReportFinishedInfo) => void;

interface IGPrintActionScheduledReportInfo extends IGPrintActionReportInfo {
    scheduled: {
        /** Ixs pozadavku */
        ixsPoz: string
    };
}

interface IGPrintActionReportStarting<TCustomDto = any> {
    /** Parametry sestavy */
    params: GReportParams;

    /** Vlastni DTO, ktere je pak predano v metode definovane v serverParameterMethod */
    customDto?: TCustomDto;

    /** Tema sestavy */
    readonly tema: string;

    /** Zobrazovany nazev sestavy */
    readonly name: string;

    /** Originalni nazev sestavy (bez id_ses, bez prejmenovani v oblibenych, apod.) */
    readonly originalName: string;

    /** ID reportu (pouze ke čtení) */
    readonly reportId: string;

    /** Vybrany vystup sestavy */
    readonly outputStyle: string;

    /** 
     * Serverova metoda k uprave parametru k pred generovanim
     * @see [XWIKI] {https://xwiki.gordic.cz/NET/javascript/GPrintAction/#HDApravaparametr16Fsestavyp159edgenerovE1nEDmnaserveru}
     */
    serverParameterMethod?: string;
}

interface IGPrintActionGfrmOptions {
    /** Nazev serverove tridy (musi byt odvozen od Gordic.Report.WebClient.GFrmControl) */
    serverClass?: string;

    /** Vlastni content v JS/TS k extendnuti */
    clientClass?: Gordic.Report.WebClient.GFrmControl | any;

    /** Metoda zavolana pri inicializaci formulare (this je content, repInfo jsou info. o sestave) */
    init?: (this: Gordic.Report.WebClient.GFrmControl, repInfo: IGPrintActionReportInfo) => void;
}

/**
 * Parametry akce pro tisk
 * @see [XWIKI] {https://xwiki.gordic.cz/NET/javascript/GPrintAction/}
 */
interface IGPrintActionParams<TCustomDto = any> extends GActionParamsDefObjBase {
    /** Nazev akce */
    name: string;

    /** Titulek okna */
    title?: string;

    /** Id okna stromu sestav (vychozi reportTreeCtl#) */
    id?: string;

    /** Sirka okna stromu sestav */
    width?: number;

    /** Vyska okna stromu sestav */
    height?: number;

    /** Tema sestav */
    tema: string;

    /** ID stromu */
    ixsStr?: string;

    /** Platnost */
    platnost?: string;

    /** GContent, ktery otevira okno sestav (kvuli zavirani oken) */
    parentContent?: GContent;

    /** Otevre okno pres celou pracovni plochu. Funguje pouze v pripade, ze je vyplnena properta 'parentContent'.
     * @default false
     */
    fullScreen?: boolean;

    /** zakaze odlozene zpracovani 
     * @default true 
    */
    schedulingDisabled?: boolean;

    /** Pro restrikci alf pred otevrenim stromu sestav a pred generovanim
        @see [XWIKI] {https://xwiki.gordic.cz/NET/javascript/GPrintAction/#HserverRestrictionAlfMethod}
    */
    serverRestrictionAlfMethod?: string;

    /** Pro restrikci alv pred otevrenim stromu sestav */
    serverRestrictionAlvMethod?: string;

    /** Pro parametry tesne pred generovani - na vstupu by melo mit IGReport */
    serverParameterMethod?: string;

    /** Id reportu (WRID), ktere ma byt predvybrane po otevreni stromu sestav */
    reportId?: string;

    /** Pouze vybere sestavu bez generovani */
    selectReportOnly?: boolean;

    /** 
     *  Pokud je strom sestav v rezimu vyberu a je tam jen jedna sestava, pak se standardne vybere a okno zavre.
     *  Nastavenim teto hodnoty na true lze nechat okno otevrene.
     *  @default false
     */
    showJustOneReport?: boolean;

    /**
     * Po vygenerovani sestavy a celkovem ukonceni workflow necha otevrene okno stromu sestav
     * @default false
     */
    keepOpen?: boolean;

    /**
     * Po otevreni stromu sestav je preferovano nacteni oblibenych polozek, pokud nejake v tematu jsou.
     * @default true
     */
    initFavorites?: boolean;

    /**
     * Po otevreni stromu sestav se zobrazi slozky (!Pozor!: Pokud je property 'initFavorites' na true a tema obsahuje oblibene, budou otevreny na zacatku oblibene (bez slozek))
     * @default true
     */
    initFolders?: boolean;

    /** Parametry X0000 az X0009 */
    reportParams?: GReportParams;

    /** Vlastni DTO pro metody serverRestrictionAlfMethod, serverRestrictionAlvMethod, serverParameterMethod */
    customDto?: TCustomDto | (() => TCustomDto);

    /** Po vygenerovani sestavy nacte jeji data (default=false) */
    loadData?: boolean;

    /**
     * Typ generatoru
     * @default "Gordic.Report.WebClient.Reporter.SinglePage.Common.GReportGenerator"
     */
    reportGeneratorType?: string;

    /**
     * Typ generatoru pro generovani v asynchronni uloze (trida odvozena od Gordic.Report.Server.GReportGenerateAl)
     * @type {string}
     */
    reportGeneratorTypeAsync?: string;

    /** Vlastni DTO pro vlastni generator */
    reportGeneratorParams?: object;

    /**
     * Funkce, ktera se zavola pred otevrenim dialogu
     * @type {GAction} Instance akce
     * @returns V pripade, ze se dialog vubec nema otevrit, vratit false nebo rejectnuty promise. Dialog se otevre, pokud se nevrati nic nebo az na resolvnuty promise.
     */
    dialogOpening?: (thisAct: GAction) => boolean | JQueryPromise<void>;

    /** Okno stromu sestav bylo zavreno */
    dialogClosed?: IGPrintActionReportEvent;

    /** Metoda volana pred generovanim setavy (zde se plni parametry) */
    reportStarting?: (reportInfo: IGPrintActionReportStarting<TCustomDto>) => void | JQueryPromise<IGPrintActionReportStarting<TCustomDto>> | false;

    /** Report byl vybran */
    reportSelected?: IGPrintActionReportEvent;

    /** Report byl vygenerovan */
    reportGenerated?: IGPrintActionReportGeneratedEvent;

    /** Dokument (report) byl stazen, dokument byl stazen, podepsan, orazitkovan a poslan zpet, apod...proste konec workflow */
    reportFinished?: IGPrintActionReportFinishedEvent;

    /** Generovani sestavy bylo zruseno uzivatelem */
    reportCancelled?: IGPrintActionReportEvent;

    /** Sestava byla zarazena do odlozeneho zpracovani */
    reportScheduled?: (event: JQueryEventObject, reportInfo?: IGPrintActionScheduledReportInfo) => void;

    /** Uzivatel kliknul na akci pro ziskani dat z formulare */
    reportFormDataCollected?: (event: JQueryEventObject, reportInfo?: IGPrintActionReportDataCollectedInfo) => void;

    /** Vlastni podepisovac (nahrazuje defaultni) */
    getReportSigner?: (reportInfo: IGPrintActionReportStarting<TCustomDto>) => IGSignerBase | null;

    /** Options pro otevreni GFRM sestav */
    gfrmOptions?: IGPrintActionGfrmOptions;

    ///** Sputeni akce (defaultne otevre okno se stromem sestav) */
    //run?: (() => void);
    
    /* EXPERIMENTAL: Generovat pres asynchronni ulohu (docasny default v liche = true, v sude = false), zatim nepouzivat!!! */
    //async?: boolean; //NOTE: Uz se nikde nepouziva. Je to kandidat na smazani

    /**
     * EXPERIMENTAL: Způsob generování sestavy. 'window' = klasicky na okně stromu sestav, 'notifications' = generování s pomocí notifikačního
     * centra.
     * @type {"window" | "notifications"}
     * @default "window"
     */
    workflowType?: "window" | "notifications";
}

interface IGPrintActionUtils {
    getReportTreeControlParams(): Gordic.Report.WebClient.GReportTreeControlParamsDto;

    /** ActionContext nacteny pri spusteni akce */
    readonly actionContext?: ObjectLiteral<any>;
}

type GPrintActionType<TCustomDto = any> = GAction & IGPrintActionParams<TCustomDto> & IGPrintActionUtils;

declare namespace GAction {
    /**
     * Vytvori akci pro tisk
     * @see [XWIKI] {https://xwiki.gordic.cz/NET/javascript/GPrintAction/}
     * @param {IGPrintActionParams} params
     */
    function createPrintAction<TCustomDto = any>(params: IGPrintActionParams<TCustomDto>): GPrintActionType<TCustomDto>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Scripts\GReportFormControl.d.ts 

declare namespace Gordic.Report.WebClient {
    export interface IGFormControlOptions {
        Form: string;
        server?: string;
    }

    class GReportFormControl extends GContentBase {
        public _setData(a: object);
        public reload(): JQueryPromise<void>;
        public collect(): object;
        public checkvalid(): JQueryPromise<void>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Report.WebClient\Reporter\SinglePage\Scripts\GReports.d.ts 

//<reference path="../../../../gin/gui/gui.webcontrols.types.d.ts" />
//<reference path="../../../../gin/gui/vendor/_types/jquery/index.d.ts" />

declare namespace Gordic.Report.WebClient {
    /**
     * Options generatoru
     * 
     * @author bmartinek
     * @since 478.1.0.0
     */
    interface IGReportGeneratorOptions {
        /**
         * Typ generatoru vc namespace 
         * @default "Gordic.Report.WebClient.Reporter.SinglePage.Common.GReportGenerator"
         * @type {string}
         */
        reportGeneratorType?: string;

        /**
         * Sluzba pro praci s reporty
         * @default "Gordic.Report.WebClient.GReportService"
         */
        reportService?: string;

        /**
         * Jak casto se zjistuje stav generovani sestavy (v sekundach)
         * @default 1
         */
        getStateInterval?: number;

        /**
         * Pocet sekud, po ktere se ceka, nez se zacne generovat v jinem vlakne
         * @default 15
         */
        waitToAsync?: number;

        /** Content z jehoz kontextu se bude pak volat server (readonly - nic se na nem nemeni) */
        parentContent?: GContent;
    }

    interface IGReportGenerateParams {

        /** WRID sestavy */
        reportId: string;

        /** Nazev sestavy */
        name?: string;

        /** Pripona souboru */
        outputStyle?: string;

        /** Platnost sestavy */
        platnost?: string;

        /** Restrikce ALF */
        restrictionAlf?: string;

        /** Restrikce ALV */
        restrictionAlv?: string;

        preselect?: boolean;

        runAgain?: boolean;

        generatorParams?: any;

        /** naplneni RestrictionAlf pres metodu: [namespace].[nazev tridy]:[nazev metody]  argumenty jsou GUserProcess, string (tiskove tema), vraci string */
        serverRestrictionAlfMethod?: string;

        /** //volitelne - naplneni RestrictionAlv pres metodu: [namespace].[nazev tridy]:[nazev metody]  argumenty jsou GUserProcess, string (tiskove tema), vraci string */
        serverRestrictionAlvMethod?: string;

        /**   
         *    Nazev tridy a metody pro upravu parametru sestavy pred generovanim. Metoda musi byt staticka a musi obsahovat argumenty:
         *    GUserProcess, IGReport a volitelne vlastni DTO objekt (ten se plni v customDto v gprintAction).
         */
        serverParameterMethod?: string;

        customDto?: any;

        props?: any;

        /** Parametry sestavy X0000 - X0009  */
        params?: IGDefaultReportparams;

        /** Po vygenerovani sestavy nacte data (default=false) */
        loadData?: boolean;

        persistent?: boolean;
    }

    interface IGReportGenerateResult<TData extends object = {}> {
        id: string;
        idSes?: string;
        fileName?: string; 
        /** Koncovka souboru (i s teckou, napr.: '.gfrm') */
        fileExtension?: string;
        /** Dalsi soubory, ktere vznikly behem generovani */
        batchFiles?: Gordic.Report.WebClient.GBatchFilesInfoDto;
        dmsInfo?: Gordic.Report.Interface.GReportDmsInfoDto;
        fileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto;
        /** 
         *  Data vznikla behem generovani. 
         *  Pozn.: Implicitne je na strane serveru objekt typu GDataSet, ktery je pak zaserializovan do struktury:
         *  { 
         *      tabulka1: [{col1t1: val, col2t1: val}, {col1t1: val, col2t1: val}],
         *      tabulka2: [{col1t2: val}, {col2t2: val}]
         *  }
         *  
         *  Pripadne pretizeni na strane serveru lze ve vlastnim generatoru pretizenim metody GetReportData().
         */
        data?: TData;
        /** Data vznikla post processingem sestavy */
        postProcessData?: object;

        /** Vybrane hodnoty z Report.CommonInfos */
        commonInfos?: Gordic.Report.WebClient.Reporter.SinglePage.Dto.GReportCommonInfosDto;
    }

    interface IGReportCancellationToken {
        cancel: boolean;
    }

    /**
     * @deprecated Stary generator sestav (pouzivejte nove generovani pres async. ulohu viz: https://xwiki.gordic.cz/bin/NET/guides/Sestavy/ )
     */
    class GReportGenerator {
        constructor(options?: IGReportGeneratorOptions);

        /**
         * @deprecated Vygeneruje sestavu (pouzivejte nove generovani pres async. ulohu viz: https://xwiki.gordic.cz/bin/NET/guides/Sestavy/ )
         * 
         * @param {IGReportGenerateParams} repParams
         * @param {IGDefaultReportparams | null} [xParams]
         * @param {IGReportCancellationToken} [cancellationToken]
         */
        generate<TData extends object>(repParams: IGReportGenerateParams | GCreateReportDto, xParams?: IGDefaultReportparams | null, cancellationToken?: IGReportCancellationToken)
            : JQuery.Promise3<
                IGReportGenerateResult<TData>, XMLHttpRequest, IGClientProgressOptions,
                never, string, never,
                never, any, never>;

        /**
         * Vygeneruje sestavu, vrati pouze jeji data a provede serverovy uklid.
         * 
         * @param {IGReportGenerateParams} repParams
         * @param {IGDefaultReportparams | null} [xParams]
         * @param {IGReportCancellationToken} [cancellationToken]
         */
        generateDataOnly<TData extends object>(repParams: IGReportGenerateParams, xParams?: IGDefaultReportparams | null, cancellationToken?: IGReportCancellationToken)
            : JQuery.Promise3<
                TData, XMLHttpRequest, IGClientProgressOptions,
                never, string, never,
                never, any, never>;

        /**
         * Odstrani generovanou sestavu(y) + souvisejici ze serveru
         * 
         * @param {IGReportGenerateResult|IGReportGenerateResult[]} res jeden nebo vice gen. vysledku
         * @returns {JQueryPromise<void>}
         */
        clean(res: IGReportGenerateResult | IGReportGenerateResult[]): JQueryPromise<void>;

        /** Nastaveni generatoru */
        readonly options: IGReportGeneratorOptions;

        static progressBegin(gcontent: GContent, cancellationAction: GAction): void;
        static progressUpdate(gcontent: GContent, progress: IGClientProgressOptions, formaterFunc?: (progress: IGClientProgressOptions) => string): void;
        static formatProgress(progress: IGClientProgressOptions): string;
        static convertParamsToGCreateReportDto(repParams: IGReportGenerateParams, xParams?: IGDefaultReportparams, options?: IGReportGeneratorOptions): GCreateReportDto;
    }

    interface IGReportDocumentOptions {
        msgFileDownloading?: string;
        msgFileIsOpened?: string;
        msgFileDownloaded?: string;
        msgFileUploading?: string;
        msgFileUploaded?: string;
        msgFileProcessError?: string;
        cptSaveFile?: string;
    }

    class GReportDocument extends GDocument {
        constructor(gcontent: GContent, options?: IGReportDocumentOptions);
    }
}

//#endregion

