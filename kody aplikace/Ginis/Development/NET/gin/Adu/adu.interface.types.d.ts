/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adu.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adu.Interface\Gordic.Adu.Interface.csproj
*    created     2026-02-16 14:33:45
*    files       Dto\Gordic.Adu.Interface.GActionDto.d.ts
*                Dto\Gordic.Adu.Interface.GActionParameterDto.d.ts
*                Dto\Gordic.Adu.Interface.GControledObjectDto.d.ts
*                Dto\Gordic.Adu.Interface.GControlRelevanceDto.d.ts
*                Dto\Gordic.Adu.Interface.GControlResultDto.d.ts
*                Dto\Gordic.Adu.Interface.GCreateQueuedEventDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventActionDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventActionParameterDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventCalendarDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventCategoryDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventParameterDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventPriorityDto.d.ts
*                Dto\Gordic.Adu.Interface.GEventStateDto.d.ts
*                Dto\Gordic.Adu.Interface.GExecutionConditionDto.d.ts
*                Dto\Gordic.Adu.Interface.GGmzScriptDto.d.ts
*                Dto\Gordic.Adu.Interface.GGmzScriptEventActionDto.d.ts
*                Dto\Gordic.Adu.Interface.GGmzScriptParameterDto.d.ts
*                Dto\Gordic.Adu.Interface.GParameterDataTypeDto.d.ts
*                Dto\Gordic.Adu.Interface.GParameterDutyFlagDto.d.ts
*                Dto\Gordic.Adu.Interface.GQueuedEventDto.d.ts
*                Dto\Gordic.Adu.Interface.GQueuedEventLogDto.d.ts
*                Dto\Gordic.Adu.Interface.GScheduledEventDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GActionFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GActionParameterFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GControledObjectFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GControlRelevanceFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GControlResultFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventActionFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventActionParameterFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventCategoryFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventParameterFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventPriorityFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GEventStateFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GExecutionConditionFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GGmzScriptFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GParameterDataTypeFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GParameterDutyFlagFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GQueuedEventFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GQueuedEventLogFilterDto.d.ts
*                FilterDto\Gordic.Adu.Interface.GScheduledEventFilterDto.d.ts
*                Isl\Gordic.Adu.Interface.IGAction.d.ts
*                Isl\Gordic.Adu.Interface.IGActionParameter.d.ts
*                Isl\Gordic.Adu.Interface.IGControledObject.d.ts
*                Isl\Gordic.Adu.Interface.IGControlRelevance.d.ts
*                Isl\Gordic.Adu.Interface.IGControlResult.d.ts
*                Isl\Gordic.Adu.Interface.IGEvent.d.ts
*                Isl\Gordic.Adu.Interface.IGEventAction.d.ts
*                Isl\Gordic.Adu.Interface.IGEventActionParameter.d.ts
*                Isl\Gordic.Adu.Interface.IGEventCategory.d.ts
*                Isl\Gordic.Adu.Interface.IGEventParameter.d.ts
*                Isl\Gordic.Adu.Interface.IGEventPriority.d.ts
*                Isl\Gordic.Adu.Interface.IGEventState.d.ts
*                Isl\Gordic.Adu.Interface.IGExecutionCondition.d.ts
*                Isl\Gordic.Adu.Interface.IGGdtSsript.d.ts
*                Isl\Gordic.Adu.Interface.IGParameterDataType.d.ts
*                Isl\Gordic.Adu.Interface.IGParameterDutyFlag.d.ts
*                Isl\Gordic.Adu.Interface.IGQueuedEvent.d.ts
*                Isl\Gordic.Adu.Interface.IGQueuedEventLog.d.ts
*                Isl\Gordic.Adu.Interface.IGScheduledEvent.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GActionDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**obslužná akce*/
	interface GActionDto {
		/**identifikátor obslužné akce*/
		typ_aku?: string|null;
		/**název obslužné akce*/
		typ_aku_txt?: string|null;
		/**submodel*/
		submodel?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**popis aktivity*/
		aktivita_txt?: string|null;
		/**výkonný kód*/
		vyk_kod?: string|null;
		/**příznak licence*/
		priz_lic?: number|null;
		/**příznak licence textově*/
		priz_lic_txt?: string|null;
		/**seznam navázaných událostí*/
		id_uda_list?: string|null;
	}
	const enum GActionDtoNames { typ_aku = "typ_aku", typ_aku_txt = "typ_aku_txt", submodel = "submodel", aktivita = "aktivita", aktivita_txt = "aktivita_txt", vyk_kod = "vyk_kod", priz_lic = "priz_lic", priz_lic_txt = "priz_lic_txt", id_uda_list = "id_uda_list",}
	const enum GActionDtoFragments { typ_aku = "*", typ_aku_txt = "*", submodel = "*", aktivita = "*", aktivita_txt = "*", vyk_kod = "*", priz_lic = "*", priz_lic_txt = "*", id_uda_list = "*",}
	const enum GActionDtoTypes { typ_aku = "string", typ_aku_txt = "string", submodel = "string", aktivita = "number", aktivita_txt = "string", vyk_kod = "string", priz_lic = "number", priz_lic_txt = "string", id_uda_list = "string",}
	const enum GActionDtoTypeLengths { typ_aku = 15, typ_aku_txt = 254, submodel = 3, aktivita_txt = 50, vyk_kod = 254, priz_lic_txt = 20, id_uda_list = 1024,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GActionParameterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**parametr obslužné akce*/
	interface GActionParameterDto {
        /**identifikátor obslužné akce*/
		typ_aku?: string|null;
        /**identifikátor parametru obslužné akce*/
		param_uda?: string|null;
        /**popis parametru obslužné akce*/
		param_uda_txt?: string|null;
        /**poznámka k parametru obslužné akce*/
		poznamka?: string|null;
        /**aktivita*/
		aktivita?: number|null;
        /**příznak povinnosti parametru obslužné akce*/
		priz_pov?: number|null;
        /**příznak povinnosti parametru obslužné akce textově*/
		priz_pov_txt?: string|null;
        /**datový typ parametru obslužné akce*/
		dat_typ?: number|null;
        /**datový typ parametru obslužné akce textově*/
		dat_typ_txt?: string|null;
	}
	const enum GActionParameterDtoNames { typ_aku = "typ_aku", param_uda = "param_uda", param_uda_txt = "param_uda_txt", poznamka = "poznamka", aktivita = "aktivita", priz_pov = "priz_pov", priz_pov_txt = "priz_pov_txt", dat_typ = "dat_typ", dat_typ_txt = "dat_typ_txt",}
	const enum GActionParameterDtoFragments { typ_aku = "*", param_uda = "*", param_uda_txt = "*", poznamka = "*", aktivita = "*", priz_pov = "*", priz_pov_txt = "*", dat_typ = "*", dat_typ_txt = "*",}
	const enum GActionParameterDtoTypes { typ_aku = "string", param_uda = "string", param_uda_txt = "string", poznamka = "string", aktivita = "number", priz_pov = "number", priz_pov_txt = "string", dat_typ = "number", dat_typ_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GControledObjectDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**typ kontrolovaného objektu*/
	interface GControledObjectDto {
        /**typ kontrolovaného objektu*/
		typ_kobj?: number|null;
        /**popis typ kontrolovaného objektu*/
		typ_kobj_txt?: string|null;
	}
	const enum GControledObjectDtoNames { typ_kobj = "typ_kobj", typ_kobj_txt = "typ_kobj_txt",}
	const enum GControledObjectDtoFragments { typ_kobj = "*", typ_kobj_txt = "*",}
	const enum GControledObjectDtoTypes { typ_kobj = "number", typ_kobj_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GControlRelevanceDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**závažnost výsledku kontroly*/
	interface GControlRelevanceDto {
        /**závažnost výsledku kontroly*/
		zav_kon?: number|null;
        /**popis závažnosti výsledku kontroly*/
		zav_kon_txt?: string|null;
	}
	const enum GControlRelevanceDtoNames { zav_kon = "zav_kon", zav_kon_txt = "zav_kon_txt",}
	const enum GControlRelevanceDtoFragments { zav_kon = "*", zav_kon_txt = "*",}
	const enum GControlRelevanceDtoTypes { zav_kon = "number", zav_kon_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GControlResultDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**typ výsledku kontroly*/
	interface GControlResultDto {
        /**typ výsledku kontroly*/
		typ_vkon?: number|null;
        /**popis typ výsledku kontroly*/
		typ_vkon_txt?: string|null;
	}
	const enum GControlResultDtoNames { typ_vkon = "typ_vkon", typ_vkon_txt = "typ_vkon_txt",}
	const enum GControlResultDtoFragments { typ_vkon = "*", typ_vkon_txt = "*",}
	const enum GControlResultDtoTypes { typ_vkon = "number", typ_vkon_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GCreateQueuedEventDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**nová událost ve frontě*/
	interface GCreateQueuedEventDto {
        /**pořadové číslo události ve frontě*/
		por_cis_uda?: number|null;
        /**identifikátor typu události*/
		id_uda?: string|null;
        /**parametry události*/
		cfg_uda?: string|null;
        /**příznak úspěšného vložení do fronty*/
		success?: boolean|null;
	}
	const enum GCreateQueuedEventDtoNames { por_cis_uda = "por_cis_uda", id_uda = "id_uda", cfg_uda = "cfg_uda", success = "success",}
	const enum GCreateQueuedEventDtoFragments { por_cis_uda = "*", id_uda = "*", cfg_uda = "*", success = "*",}
	const enum GCreateQueuedEventDtoTypes { por_cis_uda = "number", id_uda = "string", cfg_uda = "string", success = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventActionDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**obslužná akce události*/
	interface GEventActionDto {
        /**identifikátor typu události*/
		id_uda?: string|null;
        /**identifikátor obslužné akce*/
		typ_aku?: string|null;
        /**pořadové číslo obslužné akce*/
		por_aku?: number|null;
        /**název typu události*/
		id_uda_txt?: string|null;
        /**název obslužné akce*/
		typ_aku_txt?: string|null;
        /**poznámka k události*/
		poznamka?: string|null;
        /**podmínka pro provedení obslužné akce*/
		id_ppa?: number|null;
        /**popis podmínky pro provedení obslužné akce*/
		id_ppa_txt?: string|null;
        /**aktivita*/
		aktivita?: number|null;
        /**popis aktivity*/
		aktivita_txt?: string|null;
        /**datum změny*/
		dat_zmena?: JsonDate|null;
        /**identifikátor původce změny*/
		zmenu_prov?: string|null;
        /**původce změny*/
		nazev_ref?: string|null;
        /**aktivita obslužné akce*/
		aktivita_aku?: number|null;
        /**výkonný kód obslužné akce*/
		vyk_kod?: string|null;
        /**příznak vyplnění všech povinných parametrů*/
		param_flag?: boolean|null;
        /**příznak licence*/
		priz_lic?: number|null;
        /**příznak licence textově*/
		priz_lic_txt?: string|null;
        /**původní pořadové číslo obslužné akce*/
		por_aku_puv?: number|null;
	}
	const enum GEventActionDtoNames { id_uda = "id_uda", typ_aku = "typ_aku", por_aku = "por_aku", id_uda_txt = "id_uda_txt", typ_aku_txt = "typ_aku_txt", poznamka = "poznamka", id_ppa = "id_ppa", id_ppa_txt = "id_ppa_txt", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", aktivita_aku = "aktivita_aku", vyk_kod = "vyk_kod", param_flag = "param_flag", priz_lic = "priz_lic", priz_lic_txt = "priz_lic_txt", por_aku_puv = "por_aku_puv",}
	const enum GEventActionDtoFragments { id_uda = "*", typ_aku = "*", por_aku = "*", id_uda_txt = "*", typ_aku_txt = "*", poznamka = "*", id_ppa = "*", id_ppa_txt = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", aktivita_aku = "*", vyk_kod = "*", param_flag = "*", priz_lic = "*", priz_lic_txt = "*", por_aku_puv = "*",}
	const enum GEventActionDtoTypes { id_uda = "string", typ_aku = "string", por_aku = "number", id_uda_txt = "string", typ_aku_txt = "string", poznamka = "string", id_ppa = "number", id_ppa_txt = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", aktivita_aku = "number", vyk_kod = "string", param_flag = "boolean", priz_lic = "number", priz_lic_txt = "string", por_aku_puv = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventActionParameterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**parametr obslužné akce události*/
	interface GEventActionParameterDto {
        /**identifikátor typu události*/
		id_uda?: string|null;
        /**identifikátor obslužné akce*/
		typ_aku?: string|null;
        /**pořadové číslo obslužné akce*/
		por_aku?: number|null;
        /**název parametru*/
		param_uda?: string|null;
        /**popis parametru*/
		param_uda_txt?: string|null;
        /**poznámka k události*/
		poznamka?: string|null;
        /**příznak povinnosti parametru*/
		priz_pov?: number|null;
        /**příznak povinnosti parametru textově*/
		priz_pov_txt?: string|null;
        /**datový typ parametru*/
		dat_typ?: number|null;
        /**datový typ parametru textově*/
		dat_typ_txt?: string|null;
        /**hodnota parametru*/
		config_aku?: string|null;
	}
	const enum GEventActionParameterDtoNames { id_uda = "id_uda", typ_aku = "typ_aku", por_aku = "por_aku", param_uda = "param_uda", param_uda_txt = "param_uda_txt", poznamka = "poznamka", priz_pov = "priz_pov", priz_pov_txt = "priz_pov_txt", dat_typ = "dat_typ", dat_typ_txt = "dat_typ_txt", config_aku = "config_aku",}
	const enum GEventActionParameterDtoFragments { id_uda = "*", typ_aku = "*", por_aku = "*", param_uda = "*", param_uda_txt = "*", poznamka = "*", priz_pov = "*", priz_pov_txt = "*", dat_typ = "*", dat_typ_txt = "*", config_aku = "*",}
	const enum GEventActionParameterDtoTypes { id_uda = "string", typ_aku = "string", por_aku = "number", param_uda = "string", param_uda_txt = "string", poznamka = "string", priz_pov = "number", priz_pov_txt = "string", dat_typ = "number", dat_typ_txt = "string", config_aku = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventCalendarDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**položka kalendáře termínů vzniku plánované události*/
	interface GEventCalendarDto {
		/**pořadové číslo plánované události*/
		por_cis_kud?: number|null;
		/**čas vzniku plánované události*/
		dat_plan?: JsonDate|null;
		/**poznámka*/
		poznamka?: string|null;
	}
	const enum GEventCalendarDtoNames { por_cis_kud = "por_cis_kud", dat_plan = "dat_plan", poznamka = "poznamka",}
	const enum GEventCalendarDtoFragments { por_cis_kud = "*", dat_plan = "*", poznamka = "*",}
	const enum GEventCalendarDtoTypes { por_cis_kud = "number", dat_plan = "JsonDate", poznamka = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventCategoryDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**kategorie události*/
	interface GEventCategoryDto {
        /**kategorie události*/
		ktg_uda?: number|null;
        /**popis kategorie události*/
		ktg_uda_txt?: string|null;
	}
	const enum GEventCategoryDtoNames { ktg_uda = "ktg_uda", ktg_uda_txt = "ktg_uda_txt",}
	const enum GEventCategoryDtoFragments { ktg_uda = "*", ktg_uda_txt = "*",}
	const enum GEventCategoryDtoTypes { ktg_uda = "number", ktg_uda_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**typ události*/
	interface GEventDto {
		/**identifikátor typu události*/
		id_uda?: string|null;
		/**název typu události*/
		id_uda_txt?: string|null;
		/**kategorie události*/
		ktg_uda?: number|null;
		/**priorita události*/
		priorita_uda?: number|null;
		/**popis piority události*/
		priorita_uda_txt?: string|null;
		/**poznámka k události*/
		poznamka?: string|null;
		/**submodel*/
		submodel?: string|null;
		/**příznak odloženého zpracování*/
		priz_odloz?: number|null;
		/**příznak unikátního výskytu ve frontě*/
		priz_unik?: number|null;
		/**příznak možnosti plánování*/
		priz_plan?: number|null;
		/**příznak správy databázového kontextu*/
		priz_ctx?: number|null;
		/**počítač určený ka zpracování události*/
		comp_name?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**popis aktivity*/
		aktivita_txt?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor původce změny*/
		zmenu_prov?: string|null;
		/**původce změny*/
		nazev_ref?: string|null;
		/**seznam navázaných obslužných akcí*/
		typ_aku_list?: string|null;
	}
	const enum GEventDtoNames { id_uda = "id_uda", id_uda_txt = "id_uda_txt", ktg_uda = "ktg_uda", priorita_uda = "priorita_uda", priorita_uda_txt = "priorita_uda_txt", poznamka = "poznamka", submodel = "submodel", priz_odloz = "priz_odloz", priz_unik = "priz_unik", priz_plan = "priz_plan", priz_ctx = "priz_ctx", comp_name = "comp_name", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", typ_aku_list = "typ_aku_list",}
	const enum GEventDtoFragments { id_uda = "*", id_uda_txt = "*", ktg_uda = "*", priorita_uda = "*", priorita_uda_txt = "*", poznamka = "*", submodel = "*", priz_odloz = "*", priz_unik = "*", priz_plan = "*", priz_ctx = "*", comp_name = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", typ_aku_list = "*",}
	const enum GEventDtoTypes { id_uda = "string", id_uda_txt = "string", ktg_uda = "number", priorita_uda = "number", priorita_uda_txt = "string", poznamka = "string", submodel = "string", priz_odloz = "number", priz_unik = "number", priz_plan = "number", priz_ctx = "number", comp_name = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", typ_aku_list = "string",}
	const enum GEventDtoTypeLengths { id_uda = 15, id_uda_txt = 254, priorita_uda_txt = 50, poznamka = 254, submodel = 3, comp_name = 50, aktivita_txt = 50, zmenu_prov = 12, nazev_ref = 200, typ_aku_list = 1024,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventParameterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**parametr události*/
	interface GEventParameterDto {
        /**identifikátor typu události*/
		id_uda?: string|null;
        /**identifikátor parametru události*/
		param_uda?: string|null;
        /**popis parametru události*/
		param_uda_txt?: string|null;
        /**poznámka k parametru události*/
		poznamka?: string|null;
        /**zástupný symbol pro avizace*/
		z_symbol?: string|null;
        /**aktivita*/
		aktivita?: number|null;
        /**příznak povinnosti parametru události*/
		priz_pov?: number|null;
        /**příznak povinnosti parametru události textově*/
		priz_pov_txt?: string|null;
        /**datový typ parametru události*/
		dat_typ?: number|null;
        /**datový typ parametru události textově*/
		dat_typ_txt?: string|null;
        /**příznak veřejného parametru*/
		priz_usr?: number|null;
        /**příznak veřejného parametru textově*/
		priz_usr_txt?: string|null;
	}
	const enum GEventParameterDtoNames { id_uda = "id_uda", param_uda = "param_uda", param_uda_txt = "param_uda_txt", poznamka = "poznamka", z_symbol = "z_symbol", aktivita = "aktivita", priz_pov = "priz_pov", priz_pov_txt = "priz_pov_txt", dat_typ = "dat_typ", dat_typ_txt = "dat_typ_txt", priz_usr = "priz_usr", priz_usr_txt = "priz_usr_txt",}
	const enum GEventParameterDtoFragments { id_uda = "*", param_uda = "*", param_uda_txt = "*", poznamka = "*", z_symbol = "*", aktivita = "*", priz_pov = "*", priz_pov_txt = "*", dat_typ = "*", dat_typ_txt = "*", priz_usr = "*", priz_usr_txt = "*",}
	const enum GEventParameterDtoTypes { id_uda = "string", param_uda = "string", param_uda_txt = "string", poznamka = "string", z_symbol = "string", aktivita = "number", priz_pov = "number", priz_pov_txt = "string", dat_typ = "number", dat_typ_txt = "string", priz_usr = "number", priz_usr_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventPriorityDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**priorita události*/
	interface GEventPriorityDto {
        /**priorita události*/
		priorita_uda?: number|null;
        /**popis priorita události*/
		priorita_uda_txt?: string|null;
	}
	const enum GEventPriorityDtoNames { priorita_uda = "priorita_uda", priorita_uda_txt = "priorita_uda_txt",}
	const enum GEventPriorityDtoFragments { priorita_uda = "*", priorita_uda_txt = "*",}
	const enum GEventPriorityDtoTypes { priorita_uda = "number", priorita_uda_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GEventStateDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**stav události*/
	interface GEventStateDto {
        /**stav události*/
		stav_uda?: number|null;
        /**popis stavu události*/
		stav_uda_txt?: string|null;
	}
	const enum GEventStateDtoNames { stav_uda = "stav_uda", stav_uda_txt = "stav_uda_txt",}
	const enum GEventStateDtoFragments { stav_uda = "*", stav_uda_txt = "*",}
	const enum GEventStateDtoTypes { stav_uda = "number", stav_uda_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GExecutionConditionDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**podmínka provedení akce*/
	interface GExecutionConditionDto {
        /**podmínka provedení akce*/
		id_ppa?: number|null;
        /**popis podmínka provedení akce*/
		id_ppa_txt?: string|null;
	}
	const enum GExecutionConditionDtoNames { id_ppa = "id_ppa", id_ppa_txt = "id_ppa_txt",}
	const enum GExecutionConditionDtoFragments { id_ppa = "*", id_ppa_txt = "*",}
	const enum GExecutionConditionDtoTypes { id_ppa = "number", id_ppa_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GGmzScriptDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**GMZ skript*/
	interface GGmzScriptDto {
		/**identifikátor GMZ skriptu*/
		ixs_gdt?: string|null;
		/**název GMZ skriptu*/
		nazev?: string|null;
		/**popis GMZ skriptu*/
		popis?: string|null;
		/**typ GMZ skriptu*/
		typ_gdt?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**identifikátor souboru s GMZ skriptem*/
		guid?: string|null;
	}
	const enum GGmzScriptDtoNames { ixs_gdt = "ixs_gdt", nazev = "nazev", popis = "popis", typ_gdt = "typ_gdt", aktivita = "aktivita", guid = "guid",}
	const enum GGmzScriptDtoFragments { ixs_gdt = "*", nazev = "*", popis = "*", typ_gdt = "*", aktivita = "*", guid = "*",}
	const enum GGmzScriptDtoTypes { ixs_gdt = "string", nazev = "string", popis = "string", typ_gdt = "number", aktivita = "number", guid = "string",}
	const enum GGmzScriptDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GGmzScriptEventActionDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**událost pro spuštění GMZ skriptu*/
	interface GGmzScriptEventActionDto {
		/**identifikátor typu události*/
		id_uda?: string|null;
		/**identifikátor GMZ skriptu*/
		ixs_gdt?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**parametry události*/
		parameters?: Gordic.Adu.Interface.GGmzScriptParameterDto[]|null;
	}
	const enum GGmzScriptEventActionDtoNames { id_uda = "id_uda", ixs_gdt = "ixs_gdt", poznamka = "poznamka", parameters = "parameters",}
	const enum GGmzScriptEventActionDtoFragments { id_uda = "*", ixs_gdt = "*", poznamka = "*", parameters = "*",}
	const enum GGmzScriptEventActionDtoTypes { id_uda = "string", ixs_gdt = "string", poznamka = "string", parameters = "Gordic.Adu.Interface.GGmzScriptParameterDto[]",}
	const enum GGmzScriptEventActionDtoTypeLengths { id_uda = 15, ixs_gdt = 12, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GGmzScriptParameterDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**parametr GMZ skriptu*/
	interface GGmzScriptParameterDto {
		/**název parametru*/
		param_uda?: string|null;
		/**popis parametru obslužné akce*/
		param_uda_txt?: string|null;
		/**datový typ parametru obslužné akce*/
		dat_typ?: number|null;
	}
	const enum GGmzScriptParameterDtoNames { param_uda = "param_uda", param_uda_txt = "param_uda_txt", dat_typ = "dat_typ",}
	const enum GGmzScriptParameterDtoFragments { param_uda = "*", param_uda_txt = "*", dat_typ = "*",}
	const enum GGmzScriptParameterDtoTypes { param_uda = "string", param_uda_txt = "string", dat_typ = "number",}
	const enum GGmzScriptParameterDtoTypeLengths { param_uda = 20, param_uda_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GParameterDataTypeDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**datový typ parametru*/
	interface GParameterDataTypeDto {
        /**datový typ parametru*/
		dat_typ?: number|null;
        /**popis datový typ parametru*/
		dat_typ_txt?: string|null;
	}
	const enum GParameterDataTypeDtoNames { dat_typ = "dat_typ", dat_typ_txt = "dat_typ_txt",}
	const enum GParameterDataTypeDtoFragments { dat_typ = "*", dat_typ_txt = "*",}
	const enum GParameterDataTypeDtoTypes { dat_typ = "number", dat_typ_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GParameterDutyFlagDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**příznak povinnosti parametru*/
	interface GParameterDutyFlagDto {
        /**příznak povinnosti parametru*/
		priz_pov?: number|null;
        /**popis příznak povinnosti parametru*/
		priz_pov_txt?: string|null;
	}
	const enum GParameterDutyFlagDtoNames { priz_pov = "priz_pov", priz_pov_txt = "priz_pov_txt",}
	const enum GParameterDutyFlagDtoFragments { priz_pov = "*", priz_pov_txt = "*",}
	const enum GParameterDutyFlagDtoTypes { priz_pov = "number", priz_pov_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GQueuedEventDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**událost ve frontě*/
	interface GQueuedEventDto {
        /**pořadové číslo události ve frontě*/
		por_cis_uda?: number|null;
        /**identifikátor typu události*/
		id_uda?: string|null;
        /**název typu události*/
		id_uda_txt?: string|null;
        /**čas vzniku události*/
		dat_zmena?: JsonDate|null;
        /**pořadové číslo přihlášení původce události*/
		log_por_cislo?: number|null;
        /**čas zahájení zpracování události*/
		dat_start_zpr?: JsonDate|null;
        /**čas zpracování události*/
		dat_zmena_zpr?: JsonDate|null;
        /**pořadové číslo přihlášení zpracovatele události*/
		log_por_cislo_zpr?: number|null;
        /**stav události*/
		stav_uda?: number|null;
        /**popis stavu události*/
		stav_uda_txt?: string|null;
        /**priorita události*/
		priorita_uda?: number|null;
        /**popis priority události*/
		priorita_uda_txt?: string|null;
        /**určený počítač*/
		comp_name?: string|null;
        /**parametry události*/
		cfg_uda?: string|null;
        /**pořadové číslo plánované události*/
		por_cis_kud?: number|null;
        /**identifikátor funkce vlastníka plánované události*/
		ixs_fun?: string|null;
        /**název vlastníka plánované události*/
		nazev_rf?: string|null;
        /**poznámka u plánované události*/
		poznamka?: string|null;
        /**pořadové číslo primární události*/
		por_cis_pri?: number|null;
	}
	const enum GQueuedEventDtoNames { por_cis_uda = "por_cis_uda", id_uda = "id_uda", id_uda_txt = "id_uda_txt", dat_zmena = "dat_zmena", log_por_cislo = "log_por_cislo", dat_start_zpr = "dat_start_zpr", dat_zmena_zpr = "dat_zmena_zpr", log_por_cislo_zpr = "log_por_cislo_zpr", stav_uda = "stav_uda", stav_uda_txt = "stav_uda_txt", priorita_uda = "priorita_uda", priorita_uda_txt = "priorita_uda_txt", comp_name = "comp_name", cfg_uda = "cfg_uda", por_cis_kud = "por_cis_kud", ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", poznamka = "poznamka", por_cis_pri = "por_cis_pri",}
	const enum GQueuedEventDtoFragments { por_cis_uda = "*", id_uda = "*", id_uda_txt = "*", dat_zmena = "*", log_por_cislo = "*", dat_start_zpr = "*", dat_zmena_zpr = "*", log_por_cislo_zpr = "*", stav_uda = "*", stav_uda_txt = "*", priorita_uda = "*", priorita_uda_txt = "*", comp_name = "*", cfg_uda = "*", por_cis_kud = "*", ixs_fun = "*", nazev_rf = "*", poznamka = "*", por_cis_pri = "*",}
	const enum GQueuedEventDtoTypes { por_cis_uda = "number", id_uda = "string", id_uda_txt = "string", dat_zmena = "JsonDate", log_por_cislo = "number", dat_start_zpr = "JsonDate", dat_zmena_zpr = "JsonDate", log_por_cislo_zpr = "number", stav_uda = "number", stav_uda_txt = "string", priorita_uda = "number", priorita_uda_txt = "string", comp_name = "string", cfg_uda = "string", por_cis_kud = "number", ixs_fun = "string", nazev_rf = "string", poznamka = "string", por_cis_pri = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GQueuedEventLogDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**záznam o zpracování události ve frontě*/
	interface GQueuedEventLogDto {
        /**pořadové číslo události ve frontě*/
		por_cis_uda?: number|null;
        /**pořadové číslo záznamu*/
		por_log?: number|null;
        /**relativní pořadí záznamu*/
		por_log_rel?: number|null;
        /**identifikátor obslužné akce*/
		typ_aku?: string|null;
        /**název obslužné akce*/
		typ_aku_txt?: string|null;
        /**text záznamu*/
		txt?: string|null;
        /**datum změny*/
		dat_zmena?: JsonDate|null;
        /**identifikátor původce změny*/
		zmenu_prov?: string|null;
	}
	const enum GQueuedEventLogDtoNames { por_cis_uda = "por_cis_uda", por_log = "por_log", por_log_rel = "por_log_rel", typ_aku = "typ_aku", typ_aku_txt = "typ_aku_txt", txt = "txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GQueuedEventLogDtoFragments { por_cis_uda = "*", por_log = "*", por_log_rel = "*", typ_aku = "*", typ_aku_txt = "*", txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GQueuedEventLogDtoTypes { por_cis_uda = "number", por_log = "number", por_log_rel = "number", typ_aku = "string", typ_aku_txt = "string", txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Dto\Gordic.Adu.Interface.GScheduledEventDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**plánovaná událost*/
	interface GScheduledEventDto {
		/**pořadové číslo plánované události*/
		por_cis_kud?: number|null;
		/**identifikátor typu události*/
		id_uda?: string|null;
		/**název typu události*/
		id_uda_txt?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**nastavení vzniku události*/
		cfg_uda?: string|null;
		/**určený počítač*/
		comp_name?: string|null;
		/**aktivita plánované události*/
		aktivita?: number|null;
		/**popis aktivity*/
		aktivita_txt?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor původce změny*/
		zmenu_prov?: string|null;
		/**název původce změny*/
		nazev_ref?: string|null;
		/**parametry události*/
		config_uda?: string|null;
		/**interval opakování*/
		interval?: string|null;
		/**čas prvního vzniku*/
		start_date?: JsonDate|null;
		/**identifikátor funkce vlastníka události*/
		ixs_fun?: string|null;
		/**název vlastníka události*/
		nazev_rf?: string|null;
		/**čas příštího spuštění*/
		next_date?: string|null;
		/**čas předchozího spuštění*/
		dat_last_gen?: JsonDate|null;
		/**aktivita typu události*/
		aktivita_uda?: number|null;
		/**pořadové číslo primární události*/
		por_cis_pri?: number|null;
		/**kalendář termínů vzniku plánovaných událostí*/
		calendar?: Gordic.Adu.Interface.GEventCalendarDto[]|null;
	}
	const enum GScheduledEventDtoNames { por_cis_kud = "por_cis_kud", id_uda = "id_uda", id_uda_txt = "id_uda_txt", poznamka = "poznamka", cfg_uda = "cfg_uda", comp_name = "comp_name", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", config_uda = "config_uda", interval = "interval", start_date = "start_date", ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", next_date = "next_date", dat_last_gen = "dat_last_gen", aktivita_uda = "aktivita_uda", por_cis_pri = "por_cis_pri", calendar = "calendar",}
	const enum GScheduledEventDtoFragments { por_cis_kud = "*", id_uda = "*", id_uda_txt = "*", poznamka = "*", cfg_uda = "*", comp_name = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", config_uda = "*", interval = "*", start_date = "*", ixs_fun = "*", nazev_rf = "*", next_date = "*", dat_last_gen = "*", aktivita_uda = "*", por_cis_pri = "*", calendar = "*",}
	const enum GScheduledEventDtoTypes { por_cis_kud = "number", id_uda = "string", id_uda_txt = "string", poznamka = "string", cfg_uda = "string", comp_name = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", config_uda = "string", interval = "string", start_date = "JsonDate", ixs_fun = "string", nazev_rf = "string", next_date = "string", dat_last_gen = "JsonDate", aktivita_uda = "number", por_cis_pri = "number", calendar = "Gordic.Adu.Interface.GEventCalendarDto[]",}
	const enum GScheduledEventDtoTypeLengths { id_uda = 15, id_uda_txt = 254, poznamka = 254, cfg_uda = 254, comp_name = 50, aktivita_txt = 50, zmenu_prov = 12, nazev_ref = 200, interval = 512, ixs_fun = 12, nazev_rf = 200, next_date = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GActionFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**filtr pro omezení výběru obslužných akcí*/
	interface GActionFilterDto {
		/**identifikátor obslužné akce*/
		typ_aku?: GBaseFilter<string>|null;
		/**submodel*/
		submodel?: GBaseFilter<string>|null;
		/**aktivita*/
		aktivita?: GBaseFilter<number>|null;
		/**identifikátor typu navázané události*/
		id_uda?: GBaseFilter<string>|null;
	}
	const enum GActionFilterDtoNames { typ_aku = "typ_aku", submodel = "submodel", aktivita = "aktivita", id_uda = "id_uda",}
	const enum GActionFilterDtoFragments { typ_aku = "*", submodel = "*", aktivita = "*", id_uda = "*",}
	const enum GActionFilterDtoTypes { typ_aku = "GBaseFilter<string>", submodel = "GBaseFilter<string>", aktivita = "GBaseFilter<number>", id_uda = "GBaseFilter<string>",}
	const enum GActionFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GActionParameterFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru parametrů obslužné akce*/
	interface GActionParameterFilterDto {
        /**identifikátor obslužné akce*/
		typ_aku?: GBaseFilter<string>|null;
        /**identifikátor parametru obslužné akce*/
		param_uda?: GBaseFilter<string>|null;
        /**aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GActionParameterFilterDtoNames { typ_aku = "typ_aku", param_uda = "param_uda", aktivita = "aktivita",}
	const enum GActionParameterFilterDtoFragments { typ_aku = "*", param_uda = "*", aktivita = "*",}
	const enum GActionParameterFilterDtoTypes { typ_aku = "GBaseFilter<string>", param_uda = "GBaseFilter<string>", aktivita = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GControledObjectFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru typu kontrolovaného objektu*/
	const enum GControledObjectFilter {
        /**typ kontrolovaného objektu*/
		typ_kobj//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru typu kontrolovaného objektu*/
	interface GControledObjectFilterDto {
        /**typ kontrolovaného objektu*/
		typ_kobj?: GBaseFilter<number>|null;
	}
	const enum GControledObjectFilterDtoNames { typ_kobj = "typ_kobj",}
	const enum GControledObjectFilterDtoFragments { typ_kobj = "*",}
	const enum GControledObjectFilterDtoTypes { typ_kobj = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GControlRelevanceFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru závažnosti výsledku kontroly*/
	const enum GControlRelevanceFilter {
        /**závažnost výsledku kontroly*/
		zav_kon//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru závažnosti výsledku kontroly*/
	interface GControlRelevanceFilterDto {
        /**závažnost výsledku kontroly*/
		zav_kon?: GBaseFilter<number>|null;
	}
	const enum GControlRelevanceFilterDtoNames { zav_kon = "zav_kon",}
	const enum GControlRelevanceFilterDtoFragments { zav_kon = "*",}
	const enum GControlRelevanceFilterDtoTypes { zav_kon = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GControlResultFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru typu výsledku kontroly*/
	const enum GControlResultFilter {
        /**typ výsledku kontroly*/
		typ_vkon//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru typu výsledku kontroly*/
	interface GControlResultFilterDto {
        /**typ výsledku kontroly*/
		typ_vkon?: GBaseFilter<number>|null;
	}
	const enum GControlResultFilterDtoNames { typ_vkon = "typ_vkon",}
	const enum GControlResultFilterDtoFragments { typ_vkon = "*",}
	const enum GControlResultFilterDtoTypes { typ_vkon = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventActionFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru obslužné akce události*/
	interface GEventActionFilterDto {
        /**identifikátor typu události*/
		id_uda?: GBaseFilter<string>|null;
        /**identifikátor obslužné akce*/
		typ_aku?: GBaseFilter<string>|null;
        /**pořadové číslo obslužné akce*/
		por_aku?: GBaseFilter<number>|null;
        /**aktivita*/
		aktivita?: GBaseFilter<number>|null;
        /**datum změny*/
		dat_zmena?: GBaseFilter<JsonDate>|null;
	}
	const enum GEventActionFilterDtoNames { id_uda = "id_uda", typ_aku = "typ_aku", por_aku = "por_aku", aktivita = "aktivita", dat_zmena = "dat_zmena",}
	const enum GEventActionFilterDtoFragments { id_uda = "*", typ_aku = "*", por_aku = "*", aktivita = "*", dat_zmena = "*",}
	const enum GEventActionFilterDtoTypes { id_uda = "GBaseFilter<string>", typ_aku = "GBaseFilter<string>", por_aku = "GBaseFilter<number>", aktivita = "GBaseFilter<number>", dat_zmena = "GBaseFilter<JsonDate>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventActionParameterFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru parametru obslužné akce události*/
	interface GEventActionParameterFilterDto {
        /**identifikátor typu události*/
		id_uda?: GBaseFilter<string>|null;
        /**identifikátor obslužné akce*/
		typ_aku?: GBaseFilter<string>|null;
        /**pořadové číslo obslužné akce*/
		por_aku?: GBaseFilter<number>|null;
        /**identifikátor parametru události*/
		param_uda?: GBaseFilter<string>|null;
	}
	const enum GEventActionParameterFilterDtoNames { id_uda = "id_uda", typ_aku = "typ_aku", por_aku = "por_aku", param_uda = "param_uda",}
	const enum GEventActionParameterFilterDtoFragments { id_uda = "*", typ_aku = "*", por_aku = "*", param_uda = "*",}
	const enum GEventActionParameterFilterDtoTypes { id_uda = "GBaseFilter<string>", typ_aku = "GBaseFilter<string>", por_aku = "GBaseFilter<number>", param_uda = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventCategoryFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru kategorie události*/
	const enum GEventCategoryFilter {
        /**kategorie události*/
		ktg_uda//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru kategorie události*/
	interface GEventCategoryFilterDto {
        /**kategorie události*/
		ktg_uda?: GBaseFilter<number>|null;
	}
	const enum GEventCategoryFilterDtoNames { ktg_uda = "ktg_uda",}
	const enum GEventCategoryFilterDtoFragments { ktg_uda = "*",}
	const enum GEventCategoryFilterDtoTypes { ktg_uda = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**filtr pro omezení výběru typu události*/
	interface GEventFilterDto {
		/**identifikátor typu události*/
		id_uda?: GBaseFilter<string>|null;
		/**kategorie události*/
		ktg_uda?: GBaseFilter<number>|null;
		/**priorita události*/
		priorita_uda?: GBaseFilter<number>|null;
		/**submodel*/
		submodel?: GBaseFilter<string>|null;
		/**příznak odloženého zpracování*/
		priz_odloz?: GBaseFilter<number>|null;
		/**příznak unikátního výskytu ve frontě*/
		priz_unik?: GBaseFilter<number>|null;
		/**příznak možnosti plánování*/
		priz_plan?: GBaseFilter<number>|null;
		/**počítač určený ke zpracování událostí*/
		comp_name?: GBaseFilter<string>|null;
		/**aktivita*/
		aktivita?: GBaseFilter<number>|null;
		/**identifikátor navázané obslužné akce*/
		typ_aku?: GBaseFilter<string>|null;
	}
	const enum GEventFilterDtoNames { id_uda = "id_uda", ktg_uda = "ktg_uda", priorita_uda = "priorita_uda", submodel = "submodel", priz_odloz = "priz_odloz", priz_unik = "priz_unik", priz_plan = "priz_plan", comp_name = "comp_name", aktivita = "aktivita", typ_aku = "typ_aku",}
	const enum GEventFilterDtoFragments { id_uda = "*", ktg_uda = "*", priorita_uda = "*", submodel = "*", priz_odloz = "*", priz_unik = "*", priz_plan = "*", comp_name = "*", aktivita = "*", typ_aku = "*",}
	const enum GEventFilterDtoTypes { id_uda = "GBaseFilter<string>", ktg_uda = "GBaseFilter<number>", priorita_uda = "GBaseFilter<number>", submodel = "GBaseFilter<string>", priz_odloz = "GBaseFilter<number>", priz_unik = "GBaseFilter<number>", priz_plan = "GBaseFilter<number>", comp_name = "GBaseFilter<string>", aktivita = "GBaseFilter<number>", typ_aku = "GBaseFilter<string>",}
	const enum GEventFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventParameterFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru parametrů události*/
	interface GEventParameterFilterDto {
        /**identifikátor typu události*/
		id_uda?: GBaseFilter<string>|null;
        /**identifikátor parametru události*/
		param_uda?: GBaseFilter<string>|null;
        /**zástupný symbol pro avizace*/
		z_symbol?: GBaseFilter<string>|null;
        /**aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GEventParameterFilterDtoNames { id_uda = "id_uda", param_uda = "param_uda", z_symbol = "z_symbol", aktivita = "aktivita",}
	const enum GEventParameterFilterDtoFragments { id_uda = "*", param_uda = "*", z_symbol = "*", aktivita = "*",}
	const enum GEventParameterFilterDtoTypes { id_uda = "GBaseFilter<string>", param_uda = "GBaseFilter<string>", z_symbol = "GBaseFilter<string>", aktivita = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventPriorityFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru priority události*/
	const enum GEventPriorityFilter {
        /**priorita události*/
		priorita_uda//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru priority události*/
	interface GEventPriorityFilterDto {
        /**priorita události*/
		priorita_uda?: GBaseFilter<number>|null;
	}
	const enum GEventPriorityFilterDtoNames { priorita_uda = "priorita_uda",}
	const enum GEventPriorityFilterDtoFragments { priorita_uda = "*",}
	const enum GEventPriorityFilterDtoTypes { priorita_uda = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GEventStateFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru stavu události*/
	const enum GEventStateFilter {
        /**stav události*/
		stav_uda//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru stavu události*/
	interface GEventStateFilterDto {
        /**stav události*/
		stav_uda?: GBaseFilter<number>|null;
	}
	const enum GEventStateFilterDtoNames { stav_uda = "stav_uda",}
	const enum GEventStateFilterDtoFragments { stav_uda = "*",}
	const enum GEventStateFilterDtoTypes { stav_uda = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GExecutionConditionFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru podmínky provedení akce*/
	const enum GExecutionConditionFilter {
        /**podmínka provedení akce*/
		id_ppa//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru podmínky provedení akce*/
	interface GExecutionConditionFilterDto {
        /**podmínka provedení akce*/
		id_ppa?: GBaseFilter<number>|null;
	}
	const enum GExecutionConditionFilterDtoNames { id_ppa = "id_ppa",}
	const enum GExecutionConditionFilterDtoFragments { id_ppa = "*",}
	const enum GExecutionConditionFilterDtoTypes { id_ppa = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GGmzScriptFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
	/**položky filtru pro omezení výběru GMZ skriptu*/
	const enum GGmzScriptFilter {
		/**identifikátor GMZ skriptu*/
		ixs_gdt,
		/**typ GMZ skriptu*/
		typ_gdt,
		/**aktivita*/
		aktivita,
	}
	/**filtr pro omezení výběru GMZ skriptu*/
	interface GGmzScriptFilterDto {
		/**typ GMZ skriptu*/
		ixs_gdt?: GBaseFilter<string>|null;
		/**typ GMZ skriptu*/
		typ_gdt?: GBaseFilter<number>|null;
		/**aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GGmzScriptFilterDtoNames { ixs_gdt = "ixs_gdt", typ_gdt = "typ_gdt", aktivita = "aktivita",}
	const enum GGmzScriptFilterDtoFragments { ixs_gdt = "*", typ_gdt = "*", aktivita = "*",}
	const enum GGmzScriptFilterDtoTypes { ixs_gdt = "GBaseFilter<string>", typ_gdt = "GBaseFilter<number>", aktivita = "GBaseFilter<number>",}
	const enum GGmzScriptFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GParameterDataTypeFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru datového typu parametru*/
	const enum GParameterDataTypeFilter {
        /**datový typ parametru*/
		dat_typ//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru datového typu parametru*/
	interface GParameterDataTypeFilterDto {
        /**datový typ parametru*/
		dat_typ?: GBaseFilter<number>|null;
	}
	const enum GParameterDataTypeFilterDtoNames { dat_typ = "dat_typ",}
	const enum GParameterDataTypeFilterDtoFragments { dat_typ = "*",}
	const enum GParameterDataTypeFilterDtoTypes { dat_typ = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GParameterDutyFlagFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**položky filtru pro omezení výběru příznaku povinnosti parametru*/
	const enum GParameterDutyFlagFilter {
        /**příznak povinnosti parametru*/
		priz_pov//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
    /**filtr pro omezení výběru příznaku povinnosti parametru*/
	interface GParameterDutyFlagFilterDto {
        /**příznak povinnosti parametru*/
		priz_pov?: GBaseFilter<number>|null;
	}
	const enum GParameterDutyFlagFilterDtoNames { priz_pov = "priz_pov",}
	const enum GParameterDutyFlagFilterDtoFragments { priz_pov = "*",}
	const enum GParameterDutyFlagFilterDtoTypes { priz_pov = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GQueuedEventFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru události ve frontě*/
	interface GQueuedEventFilterDto {
        /**pořadové číslo události ve frontě*/
		por_cis_uda?: GBaseFilter<number>|null;
        /**typ události*/
		id_uda?: GBaseFilter<string>|null;
        /**datum vzniku události*/
		dat_zmena?: GBaseFilter<JsonDate>|null;
        /**pořadové číslo přihlášení původce události*/
		log_por_cislo?: GBaseFilter<number>|null;
        /**datum zpracování události*/
		dat_zmena_zpr?: GBaseFilter<JsonDate>|null;
        /**pořadové číslo přihlášení zpracovatele události*/
		log_por_cislo_zpr?: GBaseFilter<number>|null;
        /**stav zpracování události*/
		stav_uda?: GBaseFilter<number>|null;
        /**priorita události*/
		priorita_uda?: GBaseFilter<number>|null;
        /**počítače určený ke zpracování*/
		comp_name?: GBaseFilter<string>|null;
        /**pořadové číslo plánované události*/
		por_cis_kud?: GBaseFilter<number>|null;
        /**identifikátor funkce vlastníka naplánované události*/
		ixs_fun?: GBaseFilter<string>|null;
        /**identifikátor referenta vlastníka naplánované události*/
		ixs_ref?: GBaseFilter<string>|null;
        /**pořadové číslo primární události*/
		por_cis_pri?: GBaseFilter<number>|null;
        /**maximální počet záznamů*/
		max_count?: GBaseFilter<number>|null;
	}
	const enum GQueuedEventFilterDtoNames { por_cis_uda = "por_cis_uda", id_uda = "id_uda", dat_zmena = "dat_zmena", log_por_cislo = "log_por_cislo", dat_zmena_zpr = "dat_zmena_zpr", log_por_cislo_zpr = "log_por_cislo_zpr", stav_uda = "stav_uda", priorita_uda = "priorita_uda", comp_name = "comp_name", por_cis_kud = "por_cis_kud", ixs_fun = "ixs_fun", ixs_ref = "ixs_ref", por_cis_pri = "por_cis_pri", max_count = "max_count",}
	const enum GQueuedEventFilterDtoFragments { por_cis_uda = "*", id_uda = "*", dat_zmena = "*", log_por_cislo = "*", dat_zmena_zpr = "*", log_por_cislo_zpr = "*", stav_uda = "*", priorita_uda = "*", comp_name = "*", por_cis_kud = "*", ixs_fun = "*", ixs_ref = "*", por_cis_pri = "*", max_count = "*",}
	const enum GQueuedEventFilterDtoTypes { por_cis_uda = "GBaseFilter<number>", id_uda = "GBaseFilter<string>", dat_zmena = "GBaseFilter<JsonDate>", log_por_cislo = "GBaseFilter<number>", dat_zmena_zpr = "GBaseFilter<JsonDate>", log_por_cislo_zpr = "GBaseFilter<number>", stav_uda = "GBaseFilter<number>", priorita_uda = "GBaseFilter<number>", comp_name = "GBaseFilter<string>", por_cis_kud = "GBaseFilter<number>", ixs_fun = "GBaseFilter<string>", ixs_ref = "GBaseFilter<string>", por_cis_pri = "GBaseFilter<number>", max_count = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GQueuedEventLogFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru výběru záznamů o zpracování události*/
	interface GQueuedEventLogFilterDto {
        /**pořadové číslo události ve frontě*/
		por_cis_uda?: GBaseFilter<number>|null;
        /**pořadové číslo záznamu*/
		por_log?: GBaseFilter<number>|null;
        /**identifikátor obslužné akce*/
		typ_aku?: GBaseFilter<string>|null;
        /**datum změny*/
		dat_zmena?: GBaseFilter<JsonDate>|null;
        /**identifikátor původce změny*/
		zmenu_prov?: GBaseFilter<string>|null;
	}
	const enum GQueuedEventLogFilterDtoNames { por_cis_uda = "por_cis_uda", por_log = "por_log", typ_aku = "typ_aku", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GQueuedEventLogFilterDtoFragments { por_cis_uda = "*", por_log = "*", typ_aku = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GQueuedEventLogFilterDtoTypes { por_cis_uda = "GBaseFilter<number>", por_log = "GBaseFilter<number>", typ_aku = "GBaseFilter<string>", dat_zmena = "GBaseFilter<JsonDate>", zmenu_prov = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\FilterDto\Gordic.Adu.Interface.GScheduledEventFilterDto.d.ts 

declare namespace Gordic.Adu.Interface {
    /**filtr pro omezení výběru plánované události*/
	interface GScheduledEventFilterDto {
        /**pořadové číslo plánované události*/
		por_cis_kud?: GBaseFilter<number>|null;
        /**identifikátor typu události*/
		id_uda?: GBaseFilter<string>|null;
        /**vlastník naplánované události*/
		ixs_fun?: GBaseFilter<string>|null;
        /**počítače určený ke zpracování*/
		comp_name?: GBaseFilter<string>|null;
        /**aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GScheduledEventFilterDtoNames { por_cis_kud = "por_cis_kud", id_uda = "id_uda", ixs_fun = "ixs_fun", comp_name = "comp_name", aktivita = "aktivita",}
	const enum GScheduledEventFilterDtoFragments { por_cis_kud = "*", id_uda = "*", ixs_fun = "*", comp_name = "*", aktivita = "*",}
	const enum GScheduledEventFilterDtoTypes { por_cis_kud = "GBaseFilter<number>", id_uda = "GBaseFilter<string>", ixs_fun = "GBaseFilter<string>", comp_name = "GBaseFilter<string>", aktivita = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGAction.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro práci s obslužnými akcemi
	* @domain EventsAdmin
	*/
	interface ObsluznaAkce {
		/**získání seznamu obslužných akcí*/
		list(rq?:Gordic.Adu.Interface.GActionFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GActionDto>>;
		/**získání obslužné akce*/
		read(rq?:Gordic.Adu.Interface.GActionDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GActionDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GActionDto>,GServiceReadResponse<Gordic.Adu.Interface.GActionDto>>;
		/**vytvoření obslužné akce*/
		create(rq?:Gordic.Adu.Interface.GActionDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GActionDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GActionDto>,GServiceSaveResponse<Gordic.Adu.Interface.GActionDto>>;
		/**aktualizace obslužné akce*/
		update(rq?:Gordic.Adu.Interface.GActionDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GActionDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GActionDto>,GServiceSaveResponse<Gordic.Adu.Interface.GActionDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ObsluznaAkce: ServiceBase & Catalog.ObsluznaAkce;
	}
	const ObsluznaAkce: Client["ObsluznaAkce"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGActionParameter.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro práci s parametry obslužné akce
	* @domain EventsAdmin
	*/
	interface ParametrObsluzneAkce {
		/**získání seznamu parametrů obslužné akce*/
		list(rq?:Gordic.Adu.Interface.GActionParameterFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GActionParameterDto>>;
		/**získání parametru obslužné akce*/
		read(rq?:Gordic.Adu.Interface.GActionParameterDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GActionParameterDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GActionParameterDto>,GServiceReadResponse<Gordic.Adu.Interface.GActionParameterDto>>;
		/**vytvoření parametru obslužné akce*/
		create(rq?:Gordic.Adu.Interface.GActionParameterDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GActionParameterDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GActionParameterDto>,GServiceSaveResponse<Gordic.Adu.Interface.GActionParameterDto>>;
		/**aktualizace parametru obslužné akce*/
		update(rq?:Gordic.Adu.Interface.GActionParameterDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GActionParameterDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GActionParameterDto>,GServiceSaveResponse<Gordic.Adu.Interface.GActionParameterDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ParametrObsluzneAkce: ServiceBase & Catalog.ParametrObsluzneAkce;
	}
	const ParametrObsluzneAkce: Client["ParametrObsluzneAkce"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGControledObject.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro typ kontrolovaného objektu
	* @domain EventsAdmin
	*/
	interface TypKontrolovanehoObjektu {
		/**získání seznamu typů kontrolovaného objektu*/
		list(rq?:Gordic.Adu.Interface.GControledObjectFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GControledObjectDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypKontrolovanehoObjektu: ServiceBase & Catalog.TypKontrolovanehoObjektu;
	}
	const TypKontrolovanehoObjektu: Client["TypKontrolovanehoObjektu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGControlRelevance.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro závažnost výsledku kontroly
	* @domain EventsAdmin
	*/
	interface ZavaznostVysledkuKontroly {
		/**získání seznamu závažností výsledku kontroly*/
		list(rq?:Gordic.Adu.Interface.GControlRelevanceFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GControlRelevanceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZavaznostVysledkuKontroly: ServiceBase & Catalog.ZavaznostVysledkuKontroly;
	}
	const ZavaznostVysledkuKontroly: Client["ZavaznostVysledkuKontroly"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGControlResult.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro typ výsledku kontroly
	* @domain EventsAdmin
	*/
	interface TypVysledkuKontroly {
		/**získání seznamu typů výsledku kontroly*/
		list(rq?:Gordic.Adu.Interface.GControlResultFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GControlResultDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypVysledkuKontroly: ServiceBase & Catalog.TypVysledkuKontroly;
	}
	const TypVysledkuKontroly: Client["TypVysledkuKontroly"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEvent.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro typ události
	* @domain EventsAdmin
	*/
	interface Udalost {
		/**získání seznamu typů událostí*/
		list(rq?:Gordic.Adu.Interface.GEventFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventDto>>;
		/**získání typu události*/
		read(rq?:Gordic.Adu.Interface.GEventDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GEventDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GEventDto>,GServiceReadResponse<Gordic.Adu.Interface.GEventDto>>;
		/**vytvoření typu události*/
		create(rq?:Gordic.Adu.Interface.GEventDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventDto>>;
		/**aktualizace typu události*/
		update(rq?:Gordic.Adu.Interface.GEventDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Udalost: ServiceBase & Catalog.Udalost;
	}
	const Udalost: Client["Udalost"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEventAction.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro obslužnou akci události
	* @domain EventsAdmin
	*/
	interface ObsluznaAkceUdalosti {
		/**získání seznamu obslužných akcí události*/
		list(rq?:Gordic.Adu.Interface.GEventActionFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventActionDto>>;
		/**získání obslužné akce události*/
		read(rq?:Gordic.Adu.Interface.GEventActionDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GEventActionDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GEventActionDto>,GServiceReadResponse<Gordic.Adu.Interface.GEventActionDto>>;
		/**vytvoření obslužné akce události*/
		create(rq?:Gordic.Adu.Interface.GEventActionDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventActionDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventActionDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventActionDto>>;
		/**aktualizace obslužné akce události*/
		update(rq?:Gordic.Adu.Interface.GEventActionDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventActionDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventActionDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventActionDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ObsluznaAkceUdalosti: ServiceBase & Catalog.ObsluznaAkceUdalosti;
	}
	const ObsluznaAkceUdalosti: Client["ObsluznaAkceUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEventActionParameter.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro parametr obslužné akce události
	* @domain EventsAdmin
	*/
	interface ParametrObsluzneAkceUdalosti {
		/**získání seznamu parametrů obslužných akcí události*/
		list(rq?:Gordic.Adu.Interface.GEventActionParameterFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventActionParameterDto>>;
		/**získání parametru obslužné akce události*/
		read(rq?:Gordic.Adu.Interface.GEventActionParameterDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GEventActionParameterDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GEventActionParameterDto>,GServiceReadResponse<Gordic.Adu.Interface.GEventActionParameterDto>>;
		/**aktualizace parametru obslužné akce události*/
		update(rq?:Gordic.Adu.Interface.GEventActionParameterDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventActionParameterDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventActionParameterDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventActionParameterDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ParametrObsluzneAkceUdalosti: ServiceBase & Catalog.ParametrObsluzneAkceUdalosti;
	}
	const ParametrObsluzneAkceUdalosti: Client["ParametrObsluzneAkceUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEventCategory.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro kategorii události
	* @domain EventsAdmin
	*/
	interface KategorieUdalosti {
		/**získání seznamu kategorií události*/
		list(rq?:Gordic.Adu.Interface.GEventCategoryFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventCategoryDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		KategorieUdalosti: ServiceBase & Catalog.KategorieUdalosti;
	}
	const KategorieUdalosti: Client["KategorieUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEventParameter.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro práci s parametry události
	* @domain EventsAdmin
	*/
	interface ParametrUdalosti {
		/**získání seznamu parametrů události*/
		list(rq?:Gordic.Adu.Interface.GEventParameterFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventParameterDto>>;
		/**získání parametru události*/
		read(rq?:Gordic.Adu.Interface.GEventParameterDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GEventParameterDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GEventParameterDto>,GServiceReadResponse<Gordic.Adu.Interface.GEventParameterDto>>;
		/**vytvoření parametru události*/
		create(rq?:Gordic.Adu.Interface.GEventParameterDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventParameterDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventParameterDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventParameterDto>>;
		/**aktualizace parametru události*/
		update(rq?:Gordic.Adu.Interface.GEventParameterDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GEventParameterDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GEventParameterDto>,GServiceSaveResponse<Gordic.Adu.Interface.GEventParameterDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ParametrUdalosti: ServiceBase & Catalog.ParametrUdalosti;
	}
	const ParametrUdalosti: Client["ParametrUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEventPriority.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro prioritu události
	* @domain EventsAdmin
	*/
	interface PrioritaUdalosti {
		/**získání seznamu priorit události*/
		list(rq?:Gordic.Adu.Interface.GEventPriorityFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventPriorityDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrioritaUdalosti: ServiceBase & Catalog.PrioritaUdalosti;
	}
	const PrioritaUdalosti: Client["PrioritaUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGEventState.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro stav události
	* @domain EventsAdmin
	*/
	interface StavUdalosti {
		/**získání seznamu stavů události*/
		list(rq?:Gordic.Adu.Interface.GEventStateFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GEventStateDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StavUdalosti: ServiceBase & Catalog.StavUdalosti;
	}
	const StavUdalosti: Client["StavUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGExecutionCondition.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro podmínku provedení akce
	* @domain EventsAdmin
	*/
	interface PodminkaProvedeniAkce {
		/**získání seznamu podmínek provedení akce*/
		list(rq?:Gordic.Adu.Interface.GExecutionConditionFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GExecutionConditionDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PodminkaProvedeniAkce: ServiceBase & Catalog.PodminkaProvedeniAkce;
	}
	const PodminkaProvedeniAkce: Client["PodminkaProvedeniAkce"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGGdtSsript.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro práci s GMZ skripty
	* @domain EventsAdmin
	*/
	interface ServisniSkript {
		/**získání seznamu GMZ skriptů*/
		list(rq?:Gordic.Adu.Interface.GGmzScriptFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GGmzScriptDto>>;
		/**vytvoření nové obslužné akce pro GMZ skript*/
		createAction(rq?:Gordic.Adu.Interface.GGmzScriptDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GGmzScriptDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GGmzScriptDto>,GServiceSaveResponse<Gordic.Adu.Interface.GActionDto>>;
		/**vytvoření nové události s navázanou obslužnou akcí pro GMZ skript*/
		createEventAction(rq?:Gordic.Adu.Interface.GGmzScriptDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GGmzScriptDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GGmzScriptDto>,GServiceSaveResponse<Gordic.Adu.Interface.GGmzScriptEventActionDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ServisniSkript: ServiceBase & Catalog.ServisniSkript;
	}
	const ServisniSkript: Client["ServisniSkript"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGParameterDataType.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro datový typ parametru
	* @domain EventsAdmin
	*/
	interface DatovyTypParameteru {
		/**získání seznamu datových typů parametru*/
		list(rq?:Gordic.Adu.Interface.GParameterDataTypeFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GParameterDataTypeDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DatovyTypParameteru: ServiceBase & Catalog.DatovyTypParameteru;
	}
	const DatovyTypParameteru: Client["DatovyTypParameteru"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGParameterDutyFlag.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro příznak povinnosti parametru
	* @domain EventsAdmin
	*/
	interface PovinnostParameteru {
		/**získání seznamu příznaků povinnosti parametru*/
		list(rq?:Gordic.Adu.Interface.GParameterDutyFlagFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GParameterDutyFlagDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PovinnostParameteru: ServiceBase & Catalog.PovinnostParameteru;
	}
	const PovinnostParameteru: Client["PovinnostParameteru"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGQueuedEvent.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro pro událost ve frontě
	* @domain EventsAdmin
	*/
	interface UdalostVeFronte {
		/**získání seznamu událostí ve frontě*/
		list(rq?:Gordic.Adu.Interface.GQueuedEventFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GQueuedEventDto>>;
		/**získání počtu událostí ve frontě*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**získání události ve frontě*/
		read(rq?:Gordic.Adu.Interface.GQueuedEventDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GQueuedEventDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GQueuedEventDto>,GServiceReadResponse<Gordic.Adu.Interface.GQueuedEventDto>>;
		/**vložení události do fronty*/
		create(rq?:Gordic.Adu.Interface.GCreateQueuedEventDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GCreateQueuedEventDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GCreateQueuedEventDto>,GServiceSaveResponse<Gordic.Adu.Interface.GCreateQueuedEventDto>>;
		/**zákaz zpracování události*/
		disable(rq?:Gordic.Adu.Interface.GQueuedEventDto|CallParams<GServiceActionRequest<Gordic.Adu.Interface.GQueuedEventDto>>): _Task<GServiceActionRequest<Gordic.Adu.Interface.GQueuedEventDto>,GServiceActionResponse<Gordic.Adu.Interface.GQueuedEventDto>>;
		/**zopakování události*/
		repeat(rq?:Gordic.Adu.Interface.GQueuedEventDto|CallParams<GServiceActionRequest<Gordic.Adu.Interface.GQueuedEventDto>>): _Task<GServiceActionRequest<Gordic.Adu.Interface.GQueuedEventDto>,GServiceActionResponse<Gordic.Adu.Interface.GQueuedEventDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdalostVeFronte: ServiceBase & Catalog.UdalostVeFronte;
	}
	const UdalostVeFronte: Client["UdalostVeFronte"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGQueuedEventLog.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro záznam o zpracování události
	* @domain EventsAdmin
	*/
	interface LogZpracovaniUdalosti {
		/**získání seznamu záznamů o zpracování události*/
		list(rq?:Gordic.Adu.Interface.GQueuedEventLogFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GQueuedEventLogDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LogZpracovaniUdalosti: ServiceBase & Catalog.LogZpracovaniUdalosti;
	}
	const LogZpracovaniUdalosti: Client["LogZpracovaniUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adu.Interface\Isl\Gordic.Adu.Interface.IGScheduledEvent.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro plánované události
	* @domain EventsAdmin
	*/
	interface PlanovanaUdalost {
		/**získání seznamu plánovaných událostí*/
		list(rq?:Gordic.Adu.Interface.GScheduledEventFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adu.Interface.GScheduledEventDto>>;
		/**získání plánované události*/
		read(rq?:Gordic.Adu.Interface.GScheduledEventDto|CallParams<GServiceReadRequest<Gordic.Adu.Interface.GScheduledEventDto>>): _Task<GServiceReadRequest<Gordic.Adu.Interface.GScheduledEventDto>,GServiceReadResponse<Gordic.Adu.Interface.GScheduledEventDto>>;
		/**vytvoření plánované události*/
		create(rq?:Gordic.Adu.Interface.GScheduledEventDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GScheduledEventDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GScheduledEventDto>,GServiceSaveResponse<Gordic.Adu.Interface.GScheduledEventDto>>;
		/**aktualizace plánované události*/
		update(rq?:Gordic.Adu.Interface.GScheduledEventDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GScheduledEventDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GScheduledEventDto>,GServiceSaveResponse<Gordic.Adu.Interface.GScheduledEventDto>>;
		/**smazání plánované události*/
		delete(rq?:Gordic.Adu.Interface.GScheduledEventDto|CallParams<GServiceSaveRequest<Gordic.Adu.Interface.GScheduledEventDto>>): _Task<GServiceSaveRequest<Gordic.Adu.Interface.GScheduledEventDto>,GServiceSaveResponse<Gordic.Adu.Interface.GScheduledEventDto>>;
		/**spuštění plánované události*/
		run(rq?:Gordic.Adu.Interface.GScheduledEventDto|CallParams<GServiceActionRequest<Gordic.Adu.Interface.GScheduledEventDto>>): _Task<GServiceActionRequest<Gordic.Adu.Interface.GScheduledEventDto>,GServiceActionResponse<Gordic.Adu.Interface.GScheduledEventDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PlanovanaUdalost: ServiceBase & Catalog.PlanovanaUdalost;
	}
	const PlanovanaUdalost: Client["PlanovanaUdalost"];
}

//#endregion

