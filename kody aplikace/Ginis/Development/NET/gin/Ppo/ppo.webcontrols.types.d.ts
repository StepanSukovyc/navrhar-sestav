/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ppo.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gordic.Ppo.WebControls.csproj
*    created     2026-02-16 14:35:27
*    files       Gin\Ppo\Dto\GPpoDocInfo.d.ts
*                Gin\Ppo\Dto\GPpoHistoryDocSpisDto.d.ts
*                Gin\Ppo\Settings\GPpoBase.d.ts
*                Gin\Ppo\Settings\GPpoEnums.d.ts
*                Gin\Ppo\Settings\GPpoUtils.d.ts
*                Gin\Ppo\Tasks\GPpoGeneratePpoAjaxContent.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gin\Ppo\Dto\GPpoDocInfo.d.ts 

declare namespace Gordic.Ppo.WebControls {
	/**Informace o dokumentu*/
	interface GPpoDocInfo {
		/**Identifikator dokumentu*/
		Ixp?: string|null;
		/**Název dokumentu*/
		Nazev?: string|null;
		/**Číslo jednací nebo agendové číslo nebo sp.značka spisu*/
		AktZnacka?: string|null;
		/**Spisový plán*/
		SpisPl?: string|null;
		/**Spisový znak*/
		SpisZnak?: string|null;
		/**Jedná se o spis?*/
		IsSpis?: boolean|null;
	}
	const enum GPpoDocInfoNames { Ixp = "Ixp", Nazev = "Nazev", AktZnacka = "AktZnacka", SpisPl = "SpisPl", SpisZnak = "SpisZnak", IsSpis = "IsSpis",}
	const enum GPpoDocInfoFragments { Ixp = "*", Nazev = "*", AktZnacka = "*", SpisPl = "*", SpisZnak = "*", IsSpis = "*",}
	const enum GPpoDocInfoTypes { Ixp = "string", Nazev = "string", AktZnacka = "string", SpisPl = "string", SpisZnak = "string", IsSpis = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gin\Ppo\Dto\GPpoHistoryDocSpisDto.d.ts 

declare namespace Gordic.Ppo.WebControls {
	/**GPpoHistoryDocSpisDto*/
	interface GPpoHistoryDocSpisDto {
		/**Identifikátor dokumentu*/
		Ixp?: string|null;
		/**SeznamPodpisuElSouboruDto*/
		SeznamPodpisuElSouboruDto?: Gordic.Wfl.Interface.GSeznamElSouboruDokumentuExtendDto[]|null;
		/**HistorieZmenDto*/
		HistorieZmenDto?: Gordic.Wfl.Interface.SeznamHistorieZmenDto[]|null;
		/**SeznamSbernyArchSpisuDto*/
		SeznamSbernyArchSpisuDto?: Gordic.Ssl.Interface.SeznamSbernyArchSpisuDto[]|null;
		/**DocInfo*/
		DocInfo?: Gordic.Ppo.WebControls.GPpoDocInfo|null;
	}
	const enum GPpoHistoryDocSpisDtoNames { Ixp = "Ixp", SeznamPodpisuElSouboruDto = "SeznamPodpisuElSouboruDto", HistorieZmenDto = "HistorieZmenDto", SeznamSbernyArchSpisuDto = "SeznamSbernyArchSpisuDto", DocInfo = "DocInfo",}
	const enum GPpoHistoryDocSpisDtoFragments { Ixp = "*", SeznamPodpisuElSouboruDto = "*", HistorieZmenDto = "*", SeznamSbernyArchSpisuDto = "*", DocInfo = "*",}
	const enum GPpoHistoryDocSpisDtoTypes { Ixp = "string", SeznamPodpisuElSouboruDto = "Gordic.Wfl.Interface.GSeznamElSouboruDokumentuExtendDto[]", HistorieZmenDto = "Gordic.Wfl.Interface.SeznamHistorieZmenDto[]", SeznamSbernyArchSpisuDto = "Gordic.Ssl.Interface.SeznamSbernyArchSpisuDto[]", DocInfo = "Gordic.Ppo.WebControls.GPpoDocInfo",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gin\Ppo\Settings\GPpoBase.d.ts 

declare namespace Gordic.Ppo.WebControls {
	/**PPO (BASE)*/
	interface GPpoBase extends Gordic.Ppo.WebControls.GPpoGeneratePpoAjaxContent {
		/**PPO - Generovat Transakční Protokol Správy Systému*/
		readonly ppo_gentpss?: boolean|null;
		/**PPO - Spisový plán a znak pro vygenerovaný dokument Transakčního Protokolu. (default value = "")*/
		readonly ppo_sppl?: string|null;
		/**ID Funkce (ze sessionInfo)*/
		readonly SessionIxsFun?: string|null;
		/**Pořadové číslo přihlášení (ze sessionInfo)*/
		readonly SessionLogPorCislo?: number|null;
		/**Příznak D (ze sessionInfo)*/
		readonly SessionPrizD?: number|null;
		/**Příznak D*/
		readonly PrizD?: number|null;
		/**Hodnota maximalniho data ke kteremu lze vygenerovat protokol.
		*     Nesmi byt vetsi nebo stejne nez aktualni datum.
		*/
		readonly MaxAllowedValue?: JsonDate|null;
		/**Datum od kdy se může zpracovat transakční protokol*/
		readonly MinimalValue?: JsonDate|null;
		/**Poslední datum (od)*/
		readonly LastDate?: JsonDate|null;
	}
	const enum GPpoBaseNames { ppo_gentpss = "ppo_gentpss", ppo_sppl = "ppo_sppl", SessionIxsFun = "SessionIxsFun", SessionLogPorCislo = "SessionLogPorCislo", SessionPrizD = "SessionPrizD", PrizD = "PrizD", MaxAllowedValue = "MaxAllowedValue", MinimalValue = "MinimalValue", LastDate = "LastDate", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", AdvancedValues = "AdvancedValues", ContentValues = "ContentValues", GlobalUserSettings = "GlobalUserSettings", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GPpoBaseFragments { ppo_gentpss = "*", ppo_sppl = "*", SessionIxsFun = "*", SessionLogPorCislo = "*", SessionPrizD = "*", PrizD = "*", MaxAllowedValue = "*", MinimalValue = "*", LastDate = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", AdvancedValues = "*", ContentValues = "*", GlobalUserSettings = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GPpoBaseTypes { ppo_gentpss = "boolean", ppo_sppl = "string", SessionIxsFun = "string", SessionLogPorCislo = "number", SessionPrizD = "number", PrizD = "number", MaxAllowedValue = "JsonDate", MinimalValue = "JsonDate", LastDate = "JsonDate", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", AdvancedValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalUserSettings = "Newtonsoft.Json.Linq.JObject", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gin\Ppo\Settings\GPpoEnums.d.ts 

declare namespace Gordic.Ppo.WebControls {
	/**Typ seznamu na dialogu historie dokumentu/spisu*/
	const enum GPpoTypeGridHistoryDocSpisEnum {
		/**Historie*/
		Hist=0,
		/**El. soubory*/
		ElDocs=1,
		/**Sběrný arch pro spisy*/
		Arch=2,
	}
	/**(enum) Generování pro určité období*/
	const enum GPpoGenerateForDatePeriodEnum {
		/**celé období*/
		WholeSeason=0,
		/**jednotlivé dny*/
		IndividualDays=1,
		/**jednotlivé měsíce*/
		IndividualMonths=2,
	}
	/**(enum) Generovat protokoly*/
	const enum GPpoGenerateProtocolEnum {
		/**Kompletní transační protokol*/
		CompleteTransactionProtocol=0,
		/**Protokol příjmu a odeslání*/
		ProtocolSendAndReceive=1,
		/**Transakční protokol změn*/
		TransactionProtocolOfChanges=2,
	}
	/**typ seznamu v dialogu generování*/
	const enum GPpoGeneratePpoTypeEnum {
		/**přijaté*/
		receive=0,
		/**odeslané*/
		send=1,
		/**změny*/
		change=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gin\Ppo\Settings\GPpoUtils.d.ts 

declare namespace Gordic.Ppo.WebControls {
	/**Třída - Zaregistruje pozadovane JS promenne (VED + Utilitky)*/
	interface GPpoUtils {
	}
	const enum GPpoUtilsNames {}
	const enum GPpoUtilsFragments {}
	const enum GPpoUtilsTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ppo.WebControls\Gin\Ppo\Tasks\GPpoGeneratePpoAjaxContent.d.ts 

declare namespace Gordic.Ppo.WebControls {
	/**GPpoGeneratePpoAjaxContent*/
	interface GPpoGeneratePpoAjaxContent {
	}
	const enum GPpoGeneratePpoAjaxContentNames { UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", AdvancedValues = "AdvancedValues", ContentValues = "ContentValues", GlobalUserSettings = "GlobalUserSettings", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GPpoGeneratePpoAjaxContentFragments { UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", AdvancedValues = "*", ContentValues = "*", GlobalUserSettings = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GPpoGeneratePpoAjaxContentTypes { UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", AdvancedValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalUserSettings = "Newtonsoft.Json.Linq.JObject", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
}

//#endregion

