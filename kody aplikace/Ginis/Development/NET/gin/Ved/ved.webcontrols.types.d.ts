/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ved.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ved.WebControls\Gordic.Ved.WebControls.csproj
*    created     2026-02-16 14:36:35
*    files       Gin\Ved\Settings\GVedBase.d.ts
*                Gin\Ved\Settings\GVedEnums.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ved.WebControls\Gin\Ved\Settings\GVedBase.d.ts 

declare namespace Gordic.Ved.WebControls {
    /**Inteface formy dokumentu*/
	interface GVedFormDoc {
        /**popisek*/
		caption?: string|null;
        /**hodnota*/
		value?: Gordic.Ved.WebControls.GVedFormDocEnum|null;
	}
	const enum GVedFormDocNames { caption = "caption", value = "value",}
	const enum GVedFormDocFragments { caption = "*", value = "*",}
	const enum GVedFormDocTypes { caption = "string", value = "Gordic.Ved.WebControls.GVedFormDocEnum",}
    /**Základní společná třída pro jednotlivé úlohy*/
	interface GVedBaseContent {
	}
	const enum GVedBaseContentNames { UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", AdvancedValues = "AdvancedValues", ContentValues = "ContentValues", GlobalUserSettings = "GlobalUserSettings", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVedBaseContentFragments { UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", AdvancedValues = "*", ContentValues = "*", GlobalUserSettings = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVedBaseContentTypes { UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", AdvancedValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalUserSettings = "Newtonsoft.Json.Linq.JObject", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
    /**Společné databázové parametry*/
	interface GVedDbParamsContent extends Gordic.Ved.WebControls.GVedBaseContent {
        /**VED - ŘP Supervizorský přístup, přehledy za organ.*/
		readonly ved_prehl_org?: number|null;
	}
	const enum GVedDbParamsContentNames { ved_prehl_org = "ved_prehl_org", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", AdvancedValues = "AdvancedValues", ContentValues = "ContentValues", GlobalUserSettings = "GlobalUserSettings", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVedDbParamsContentFragments { ved_prehl_org = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", AdvancedValues = "*", ContentValues = "*", GlobalUserSettings = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVedDbParamsContentTypes { ved_prehl_org = "number", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", AdvancedValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalUserSettings = "Newtonsoft.Json.Linq.JObject", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
    /**Společné parametry jednotlivých úloh*/
	interface GVedTasksParamsContent extends Gordic.Ved.WebControls.GVedDbParamsContent {
        /**Identifikátor spisového uzlu (ze SessionInfo)*/
		ixs_su?: string|null;
        /**typ reportu*/
		report_type?: Gordic.Ved.WebControls.GVedReportTypeEnum|null;
        /**typ začlenění úlohy*/
		task_type?: Gordic.Ved.WebControls.GVedTaskTypeEnum|null;
	}
	const enum GVedTasksParamsContentNames { ixs_su = "ixs_su", report_type = "report_type", task_type = "task_type", ved_prehl_org = "ved_prehl_org", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", AdvancedValues = "AdvancedValues", ContentValues = "ContentValues", GlobalUserSettings = "GlobalUserSettings", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GVedTasksParamsContentFragments { ixs_su = "*", report_type = "*", task_type = "*", ved_prehl_org = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", AdvancedValues = "*", ContentValues = "*", GlobalUserSettings = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GVedTasksParamsContentTypes { ixs_su = "string", report_type = "Gordic.Ved.WebControls.GVedReportTypeEnum", task_type = "Gordic.Ved.WebControls.GVedTaskTypeEnum", ved_prehl_org = "number", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", AdvancedValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalUserSettings = "Newtonsoft.Json.Linq.JObject", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ved.WebControls\Gin\Ved\Settings\GVedEnums.d.ts 

declare namespace Gordic.Ved.WebControls {
	/**Forma dokumentu*/
	const enum GVedFormDocEnum {
		/**Fyzický originál*/
		FyzOrig=0,
		/**Elektronický originál / záznam*/
		ElOrig=1,
	}
	/**Typ report dialogu*/
	const enum GVedReportTypeEnum {
		/**Dokument*/
		Document=0,
		/**Spis*/
		Folder=1,
		/**Elektronická podpisová kniha*/
		Epk=2,
		/**Ostatní*/
		Others=3,
		/**Sestavy dokumentů/spisů GRR*/
		Grr=4,
		/**Speciál*/
		Special=5,
		/**Nevyřízené spisy bez úkonu*/
		SpisyNevyrizBezUkon=6,
		/**Způsoby vyřízení dle zpracovatelů*/
		ZpusobyVyrizeniDleZpracovatelu=7,
		/**Vytíženost zpracovatelů*/
		VytizenostZpracovatelu=8,
		/**Spisy dle oblastí nečleněné*/
		SpisyDleOblastiNeclenene=9,
		/**Vytvořené dokumenty dle zpracovatelů bez NZ*/
		VytvoreneDokumentyDleZpracovateluBezNZ=10,
		/**Spisy dle oblasti (KVOP8)*/
		SpisyDleOblasti=11,
		/**Spisy dle oblasti DIS (KVOP8)*/
		SpisyDleOblastiDIS=12,
		/**Atesty - zatím na DEMO*/
		Atestace2024=13,
	}
	/**Typ začlenění úlohy*/
	const enum GVedTaskTypeEnum {
		/**Uzel*/
		Node=0,
		/**Organizace, úřad*/
		Organization=1,
		/**Speciální*/
		Special=2,
	}
}

//#endregion

