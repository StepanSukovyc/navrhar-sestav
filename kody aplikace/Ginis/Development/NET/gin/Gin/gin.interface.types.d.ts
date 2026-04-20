/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gin.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Gin.Interface\Gordic.Gin.Interface.csproj
*    created     2026-02-16 14:33:45
*    files       602\GEnter602AccountPasswordServiceDto.d.ts
*                Ads\GAdsBaseDto.d.ts
*                Ads\GAdsDto.d.ts
*                Ads\GAdsFilter.d.ts
*                Ads\GAdsModulsDto.d.ts
*                Ads\GAdsPhasesDto.d.ts
*                Ads\GGinsfilDto.d.ts
*                Ads\IGAds.d.ts
*                AiChat\DTO\GAiChatAppDto.d.ts
*                AiChat\DTO\GAiChatAppErrorDto.d.ts
*                AiChat\DTO\GAiChatAttachmentDto.d.ts
*                AiChat\DTO\GAiChatCapability.d.ts
*                AiChat\DTO\GAiChatFormAttachmentDto.d.ts
*                AiChat\DTO\GAiChatMessageDto.d.ts
*                AiChat\DTO\GAiChatResponseDto.d.ts
*                AiChat\DTO\GAiChatRole.d.ts
*                AiChat\DTO\GAiChatScenarioDto.d.ts
*                AiChat\DTO\GAiChatToolCallDto.d.ts
*                AiChat\ISL\IGAiChatApps.d.ts
*                Avizace\Dto\Gordic.Gin.Interface.GNotificationOrderDto.d.ts
*                Avizace\Dto\Gordic.Gin.Interface.GNotificationPlaceholderDto.d.ts
*                Avizace\Dto\Gordic.Gin.Interface.GNotificationRuleDto.d.ts
*                Avizace\FilterDto\Gordic.Gin.Interface.GNotificationOrderFilterDto.d.ts
*                Avizace\FilterDto\Gordic.Gin.Interface.GNotificationPlaceholderFilterDto.d.ts
*                Avizace\FilterDto\Gordic.Gin.Interface.GNotificationRuleFilterDto.d.ts
*                Avizace\Isl\Gordic.Gin.Interface.IGNotificationOrder.d.ts
*                Avizace\Isl\Gordic.Gin.Interface.IGNotificationPlaceholder.d.ts
*                Avizace\Isl\Gordic.Gin.Interface.IGNotificationRule.d.ts
*                Base\Gordic.Gin.Interface.IGGinTsCommon.d.ts
*                BCH\GGinbchDbDto.d.ts
*                BCH\GGinbchDto.d.ts
*                BCH\GGinbchFilter.d.ts
*                BCH\GGinbchViewDto.d.ts
*                BCH\IGGinbch.d.ts
*                Dashboard\Dto\Sql\Enums.d.ts
*                Dashboard\Dto\Sql\GIpadpohDto.d.ts
*                Dashboard\Dto\Sql\GIpadupoDto.d.ts
*                Dashboard\Dto\Sql\GIpadzfuDto.d.ts
*                Dashboard\Dto\Sql\GIpasnasDto.d.ts
*                Dashboard\Dto\Sql\GIpaspohDto.d.ts
*                Dashboard\Dto\Sql\GIpasupaDto.d.ts
*                Dashboard\Dto\Sql\GIpasupoDto.d.ts
*                Dashboard\Dto\Sql\GIpavfnaDto.d.ts
*                Dashboard\Dto\UI\GDashboardAppInfoDto.d.ts
*                Dashboard\Dto\UI\GDashboardDataColumnDto.d.ts
*                Dashboard\Dto\UI\GDashboardImportExportDto.d.ts
*                Dashboard\Dto\UI\GDashboardIslObjectMeta.d.ts
*                Dashboard\Dto\UI\GDashboardJsonFileDto.d.ts
*                Dashboard\Dto\UI\GDashboardMoveDto.d.ts
*                Dashboard\Dto\UI\GDashboardPanelDto.d.ts
*                Dashboard\Dto\UI\GDashboardRestDto.d.ts
*                Dashboard\Dto\UI\GDashboardRssDto - Copy.d.ts
*                Dashboard\Dto\UI\GDashboardRssDto.d.ts
*                Dashboard\Dto\UI\GDashboardSharedPanelDto.d.ts
*                Dashboard\Dto\UI\GDashboardsSqlDto.d.ts
*                Dashboard\Dto\UI\GDashboardTaskDto.d.ts
*                Dashboard\Dto\UI\GDashboardViewDto.d.ts
*                Dashboard\Dto\UI\GDashboardViewTemplateDto.d.ts
*                Dashboard\Dto\UI\GDashboardXrgConfigDto.d.ts
*                Dashboard\Dto\UI\GDashboardXrgMethodDto.d.ts
*                Dashboard\Dto\UI\GDashboardZoneDto.d.ts
*                Dashboard\ISL\IGDashboardJsonFile.d.ts
*                Dashboard\ISL\IGDashboardPanel.d.ts
*                Dashboard\ISL\IGDashboardPanelZone.d.ts
*                Dashboard\ISL\IGDashboardRest.d.ts
*                Dashboard\ISL\IGDashboardRss.d.ts
*                Dashboard\ISL\IGDashboardSql.d.ts
*                Dashboard\ISL\IGDashboardSsrs.d.ts
*                Dashboard\ISL\IGDashboardTask.d.ts
*                Dashboard\ISL\IGDashboardView.d.ts
*                Dashboard\ISL\IGDashboardViewTemplate.d.ts
*                Dashboard\ISL\IGDashboardXrg.d.ts
*                DataSety\Gordic.Gin.Interface.SeznamVlastnosti.Dto.d.ts
*                Datove schranky\Gordic.Gin.Interface.IGGinsmbx.d.ts
*                Datove schranky\Gordic.Gin.Interface.KategorieDuvoduPodpisu.d.ts
*                DohledovySystem\GControlsSystemAggregatedDto.d.ts
*                DohledovySystem\Gordic.Gin.Interface.GControlsSystemDto.d.ts
*                DohledovySystem\IGGControlsSystem.d.ts
*                Dto\GAibConnectorInfoDto.d.ts
*                Dto\GAIRecognizedItemDto.d.ts
*                Dto\GAIRecognizedItemGroupDto.d.ts
*                Dto\GAIRecognizeHistoryDto.d.ts
*                Dto\GAIRecognizeRequestDto.d.ts
*                Dto\GArticleFileDto.d.ts
*                Dto\GBlogClanekDto.d.ts
*                Dto\GBlogClanekHistorieDto.d.ts
*                Dto\GBlogClanekPredchoziDto.d.ts
*                Dto\GBlogClanekUdalostiDto.d.ts
*                Dto\GBlogDto.d.ts
*                Dto\GBlogEditoriDto.d.ts
*                Dto\GBlogKonfigSkupinyDto.d.ts
*                Dto\GContextHelpBlogDto.d.ts
*                Dto\GEnums.d.ts
*                Dto\GFormularDto.d.ts
*                Dto\GGinsaivDto.d.ts
*                Dto\GGinscfdDto.d.ts
*                Dto\GGinspodDto.d.ts
*                Dto\GGinsusrDto.d.ts
*                Dto\GGinszmpDto.d.ts
*                Dto\GMaskaTypeDefinitionDto.d.ts
*                Dto\GRevizeDto.d.ts
*                Dto\GSeznamMasekDto.d.ts
*                Dto\GTypAgendyDto.d.ts
*                Dto\GTypSpousteciUdalostiDto.d.ts
*                Dto\GUrovenPristupuDto.d.ts
*                GCalendar\IGCalendarNotificationService.d.ts
*                GCalendar\IGCalendarService.d.ts
*                GCalendar\IGIcsService.d.ts
*                GCalendar\Dto\GCalendarEventNotificationDto.d.ts
*                GCalendar\Dto\GCalendarEventNotificationTimeUnitDto.d.ts
*                GCalendar\Dto\GCalendarEventNotificationTypeDto.d.ts
*                GCalendar\Dto\GCalendarImportantEventListDto.d.ts
*                GCalendar\Dto\GIcsDto.d.ts
*                GCalendar\Enum\GCalendarEventDeleteRelated.d.ts
*                GCalendar\Enum\GCalendarEventNotificationTimeUnitEnum.d.ts
*                GCalendar\Enum\GCalendarEventNotificationTypeEnum.d.ts
*                GCalendar\Enum\GCalendarEventRecurrenceEnum.d.ts
*                GCalendar\Filter\GIcsFilter.d.ts
*                Gin\Gordic.Gin.Interface.GIxsAndName.d.ts
*                Gin\IGAIRecognizedItem.d.ts
*                Gin\IGAIRecognizedItemGroup.d.ts
*                Gin\IGAIRecognizeHistory.d.ts
*                Gin\IGAiRecognizer.d.ts
*                Gin\IGAIRecognizeRequest.d.ts
*                Gin\IGAiRecognizerFormRecognizer.d.ts
*                Gin\IGAiRecognizerNathan.d.ts
*                Gin\IGAiRecognizerQRCode.d.ts
*                Gin\IGFilterStorage.d.ts
*                Gin\IGFormular.d.ts
*                Gin\IGGinspodI.d.ts
*                Gin\IGGinszmpI.d.ts
*                Gin\IGinskal.d.ts
*                Gin\IGIslEntityCustomViewGenerator.d.ts
*                Gin\IGRevize.d.ts
*                Gin\IGTypAgendy.d.ts
*                Gin\IGTypSpousteciUdalosti.d.ts
*                Gin\Dto\GGinvovkDto.d.ts
*                Gin\Dto\GGinvovpDto.d.ts
*                Gin\Dto\GSkartacniRezimDto.d.ts
*                Gin\Dto\GVecnaSkupinaDto.d.ts
*                HledaniIxs\HledaniIxsInfo.d.ts
*                HledaniIxs\Dto\GHledaniIxsInfoDto.d.ts
*                ISL\FunkcniMisto.d.ts
*                ISL\IGAppActionTimer.d.ts
*                ISL\IGBlog.d.ts
*                ISL\IGBlogClanek.d.ts
*                ISL\IGBlogClanekHistorie.d.ts
*                ISL\IGBlogClanekPredchozi.d.ts
*                ISL\IGBlogClanekUdalost.d.ts
*                ISL\IGBlogEditori.d.ts
*                ISL\IGBlogKonfigSkupiny.d.ts
*                ISL\IGGArticleFile.d.ts
*                ISL\IGGinisLastSessions.d.ts
*                ISL\IGKonfiguracniSkupiny.d.ts
*                ISL\IGSkartacniRezim.d.ts
*                ISL\IGVecnaSkupina.d.ts
*                ISL\Referent - Copy.d.ts
*                ISL\Referent.d.ts
*                ISL\TypDokumentu.d.ts
*                Masky\Gordic.Gin.Interface.Enums.d.ts
*                OAuth\IGAdmOAuthService.d.ts
*                OAuth\OAuthDTOs.d.ts
*                Poznamky\GGindpozFilter.d.ts
*                Poznamky\GGindpozNoteCountDto.d.ts
*                Poznamky\GNoteCategoryDto.d.ts
*                Poznamky\GNoteDto.d.ts
*                Poznamky\IGGindpozNote.d.ts
*                RegSpa\Dto\GBaseDetailDto.d.ts
*                RegSpa\Enums\GRezimContentu.d.ts
*                RegSpa\Permissions\GBaseDetailPermissions.d.ts
*                Security\GWflsumiDto.d.ts
*                Security\GWflvumpDto.d.ts
*                Security\IGFutureSignaturePositionBindingService.d.ts
*                Security\IGSignaturePositionService.d.ts
*                UserSettings\IGUserCustomStorage.d.ts
*                UserSettings\SettingTemplate.d.ts
*                Vlastnosti\GGinVlastnostiDto.d.ts
*                Vlastnosti\Gordic.Gin.Interface.GGinVlastnostiServices.d.ts
*                Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiDataService.d.ts
*                Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiDocumentDataService.d.ts
*                Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiDocumentMetaService.d.ts
*                Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiMetaService.d.ts
*                ZastupyExu\Gordic.Gin.Interface.GPublicUserDelegationDto.d.ts
*                ZastupyExu\Gordic.Gin.Interface.GPublicUserDelegationFilter.d.ts
*                ZastupyExu\Gordic.Gin.Interface.GPublicUserDelegationFilterDto.d.ts
*                ZastupyExu\Gordic.Gin.Interface.IGPublicUserDelegation.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\602\GEnter602AccountPasswordServiceDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**GEnter602AccountPasswordServiceDto*/
	interface GEnter602AccountPasswordServiceDto {
		/**Identifikátor příhlášení 602*/
		ID?: string|null;
		/**reason for showing this dialog*/
		reason?: string|null;
		/**Nastavení účtu
		*     0 - is cached1 - is allowed but is not cached2 - is not allowed by DB parameters
		*/
		AccountSetting?: number|null;
		/**GIN - SGN - URL adresa vzdáleného podepsání/pečetění S602 SecuSign*/
		gin_sgn_ssurl?: boolean|null;
		/**GIN ELE - Zobrazovat dialog pro zadání přihlášení k účtu 602*/
		gin_ele_602iden?: boolean|null;
		/**Licence*/
		LicAdr?: string|null;
	}
	const enum GEnter602AccountPasswordServiceDtoNames { ID = "ID", reason = "reason", AccountSetting = "AccountSetting", gin_sgn_ssurl = "gin_sgn_ssurl", gin_ele_602iden = "gin_ele_602iden", LicAdr = "LicAdr",}
	const enum GEnter602AccountPasswordServiceDtoFragments { ID = "*", reason = "*", AccountSetting = "*", gin_sgn_ssurl = "*", gin_ele_602iden = "*", LicAdr = "*",}
	const enum GEnter602AccountPasswordServiceDtoTypes { ID = "string", reason = "string", AccountSetting = "number", gin_sgn_ssurl = "boolean", gin_ele_602iden = "boolean", LicAdr = "string",}
	const enum GEnter602AccountPasswordServiceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\GAdsBaseDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Základní ADS DTO pro dialogy seznamů*/
	interface GAdsBaseDto {
		/**Název souboru*/
		file_name?: string|null;
		/**Formát výstupu*/
		form_vyst?: string|null;
		/**Filtr frm*/
		filtr_frm?: string|null;
		/**Platnost Od*/
		rokmes_od?: number|null;
		/**Platnost Do*/
		rokmes_do?: number|null;
		/**Formátovací skupina*/
		format_skup?: string|null;
		/**Datum posledního generování formátu*/
		dat_posl_gener?: any|null;
		/**Název sestavy*/
		nazev_ses?: string|null;
		/**Identifikátor sestavy*/
		id_ses?: string|null;
		/**Kategorie přílohy*/
		ktg_typ_pri_txt?: string|null;
		/**identifikátor formátu ALF*/
		ixs_frm?: string|null;
		/**Identifikátor struktury sestavy*/
		ixs_xme?: string|null;
		/**název formátu*/
		nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Stav aktivity*/
		aktivita?: number|null;
		/**Popis aktivity*/
		aktivita_txt?: string|null;
		/**Datum změny*/
		dat_zmena?: any|null;
		/**Identifikátor uživatele, který provedl změnu*/
		zmenu_prov?: string|null;
		/**Verze*/
		xmeta_ver?: number|null;
		/**Subverze*/
		xmeta_subver?: number|null;
		/**Identifikátor sestavy*/
		ixs_alv?: string|null;
		/**Datum modifikace*/
		dat_modif?: JsonDate|null;
		/**Téma sestavy*/
		tema?: string|null;
		/**typ algoritmu*/
		typ_alg?: string|null;
		/**typ výstupu - rtf, txt,...*/
		typ_vyst?: string|null;
		/**typ alv*/
		typ_alv?: string|null;
		/**priz_sor*/
		priz_sor?: number|null;
		/**Min. verze DB*/
		verze_db_min?: number|null;
		/**submodel*/
		submodel?: string|null;
		/**Subverze DB min.*/
		sub_verze_db_min?: number|null;
		/**Identifikátor struktury*/
		ixs_str?: string|null;
		/**Verze*/
		xmeta?: string|null;
		/**Mejkr*/
		maker?: string|null;
		/**Příznak distribuce*/
		priz_dist?: number|null;
		/**Příznak vazby*/
		priz_vazby?: string|null;
		/**Příznak dotazu*/
		priz_dotaz?: string|null;
		/**Příznak/možnost změny*/
		priz_zmeny?: string|null;
		/**Způsob uložení*/
		zpus_uloz?: string|null;
		/**Filtr alv*/
		filtr_alv?: string|null;
		/**priz_ipa*/
		priz_ipa?: number|null;
		/**priz_odloz*/
		priz_odloz?: number|null;
	}
	const enum GAdsBaseDtoNames { file_name = "file_name", form_vyst = "form_vyst", filtr_frm = "filtr_frm", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", format_skup = "format_skup", dat_posl_gener = "dat_posl_gener", nazev_ses = "nazev_ses", id_ses = "id_ses", ktg_typ_pri_txt = "ktg_typ_pri_txt", ixs_frm = "ixs_frm", ixs_xme = "ixs_xme", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", xmeta_ver = "xmeta_ver", xmeta_subver = "xmeta_subver", ixs_alv = "ixs_alv", dat_modif = "dat_modif", tema = "tema", typ_alg = "typ_alg", typ_vyst = "typ_vyst", typ_alv = "typ_alv", priz_sor = "priz_sor", verze_db_min = "verze_db_min", submodel = "submodel", sub_verze_db_min = "sub_verze_db_min", ixs_str = "ixs_str", xmeta = "xmeta", maker = "maker", priz_dist = "priz_dist", priz_vazby = "priz_vazby", priz_dotaz = "priz_dotaz", priz_zmeny = "priz_zmeny", zpus_uloz = "zpus_uloz", filtr_alv = "filtr_alv", priz_ipa = "priz_ipa", priz_odloz = "priz_odloz",}
	const enum GAdsBaseDtoFragments { file_name = "*", form_vyst = "*", filtr_frm = "*", rokmes_od = "*", rokmes_do = "*", format_skup = "*", dat_posl_gener = "*", nazev_ses = "*", id_ses = "*", ktg_typ_pri_txt = "*", ixs_frm = "*", ixs_xme = "*", nazev = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", xmeta_ver = "*", xmeta_subver = "*", ixs_alv = "*", dat_modif = "*", tema = "*", typ_alg = "*", typ_vyst = "*", typ_alv = "*", priz_sor = "*", verze_db_min = "*", submodel = "*", sub_verze_db_min = "*", ixs_str = "*", xmeta = "*", maker = "*", priz_dist = "*", priz_vazby = "*", priz_dotaz = "*", priz_zmeny = "*", zpus_uloz = "*", filtr_alv = "*", priz_ipa = "*", priz_odloz = "*",}
	const enum GAdsBaseDtoTypes { file_name = "string", form_vyst = "string", filtr_frm = "string", rokmes_od = "number", rokmes_do = "number", format_skup = "string", dat_posl_gener = "any", nazev_ses = "string", id_ses = "string", ktg_typ_pri_txt = "string", ixs_frm = "string", ixs_xme = "string", nazev = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "any", zmenu_prov = "string", xmeta_ver = "number", xmeta_subver = "number", ixs_alv = "string", dat_modif = "JsonDate", tema = "string", typ_alg = "string", typ_vyst = "string", typ_alv = "string", priz_sor = "number", verze_db_min = "number", submodel = "string", sub_verze_db_min = "number", ixs_str = "string", xmeta = "string", maker = "string", priz_dist = "number", priz_vazby = "string", priz_dotaz = "string", priz_zmeny = "string", zpus_uloz = "string", filtr_alv = "string", priz_ipa = "number", priz_odloz = "number",}
	const enum GAdsBaseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\GAdsDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Předek ADS(dto) tříd*/
	interface GAdsDto {
	}
	const enum GAdsDtoNames {}
	const enum GAdsDtoFragments {}
	const enum GAdsDtoTypes {}
	const enum GAdsDtoTypeLengths {}
	/**ADS DTO aktivity - XME, ALV, ALF*/
	interface GAdsActivityDto {
		/**ALV*/
		Alv?: Gordic.Gin.Interface.GAdsActSingleDto|null;
		/**Xme*/
		Xme?: Gordic.Gin.Interface.GAdsActSingleDto|null;
		/**Alf*/
		Alf?: Gordic.Gin.Interface.GAdsActSingleDto|null;
	}
	const enum GAdsActivityDtoNames { Alv = "Alv", Xme = "Xme", Alf = "Alf",}
	const enum GAdsActivityDtoFragments { Alv = "*", Xme = "*", Alf = "*",}
	const enum GAdsActivityDtoTypes { Alv = "Gordic.Gin.Interface.GAdsActSingleDto", Xme = "Gordic.Gin.Interface.GAdsActSingleDto", Alf = "Gordic.Gin.Interface.GAdsActSingleDto",}
	const enum GAdsActivityDtoTypeLengths {}
	/**GAdsActSingleDto*/
	interface GAdsActSingleDto {
		/**Value*/
		Caption?: string|null;
		/**State*/
		State?: string|null;
	}
	const enum GAdsActSingleDtoNames { Caption = "Caption", State = "State",}
	const enum GAdsActSingleDtoFragments { Caption = "*", State = "*",}
	const enum GAdsActSingleDtoTypes { Caption = "string", State = "string",}
	const enum GAdsActSingleDtoTypeLengths {}
	/**GAdsMaxAlvDto*/
	interface GAdsMaxAlvDto {
		/**IxsAlv*/
		ixs_alv?: string|null;
	}
	const enum GAdsMaxAlvDtoNames { ixs_alv = "ixs_alv",}
	const enum GAdsMaxAlvDtoFragments { ixs_alv = "*",}
	const enum GAdsMaxAlvDtoTypes { ixs_alv = "string",}
	const enum GAdsMaxAlvDtoTypeLengths {}
	/**Dto vybraných identifikátorů na detailu sestavy*/
	interface GAdsIdsDto {
		/**Název souboru GRC včetně přípony
		*     Příklad: 000006X1.GRC
		*/
		grc?: string|null;
		/**IxsAlv*/
		ixs_alv?: string|null;
		/**IxsXme*/
		ixs_xme?: string|null;
		/**IxsFrm (ALF)*/
		ixs_frm?: string|null;
	}
	const enum GAdsIdsDtoNames { grc = "grc", ixs_alv = "ixs_alv", ixs_xme = "ixs_xme", ixs_frm = "ixs_frm",}
	const enum GAdsIdsDtoFragments { grc = "*", ixs_alv = "*", ixs_xme = "*", ixs_frm = "*",}
	const enum GAdsIdsDtoTypes { grc = "string", ixs_alv = "string", ixs_xme = "string", ixs_frm = "string",}
	const enum GAdsIdsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\GAdsFilter.d.ts 

declare namespace Gordic.Gin.Interface {
	/**GAdsFilter*/
	const enum GAdsFilter {
		/**Datum úpravy*/
		dat_modif,
		/**Datum změny*/
		dat_zmena,
		/**Datum posledního generování formátu*/
		dat_posl_gener,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\GAdsModulsDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO modulů pro ADS sestavu*/
	interface GAdsModulsDto {
		/**název fáze*/
		faze?: string|null;
	}
	const enum GAdsModulsDtoNames { faze = "faze",}
	const enum GAdsModulsDtoFragments { faze = "*",}
	const enum GAdsModulsDtoTypes { faze = "string",}
	const enum GAdsModulsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\GAdsPhasesDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Ads fáze DTO*/
	interface GAdsPhasesDto extends Gordic.Gin.Interface.GAdsDto {
		/**fáze*/
		faze?: string|null;
		/**textový popis fází*/
		faze_txt?: string|null;
	}
	const enum GAdsPhasesDtoNames { faze = "faze", faze_txt = "faze_txt",}
	const enum GAdsPhasesDtoFragments { faze = "*", faze_txt = "*",}
	const enum GAdsPhasesDtoTypes { faze = "string", faze_txt = "string",}
	const enum GAdsPhasesDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\GGinsfilDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**GGinsfilDto*/
	interface GGinsfilDto {
		/**Soubor (včetně koncovky)*/
		soubor?: string|null;
		/**Fáze*/
		faze?: string|null;
		/**Velikost souboru*/
		velikost?: number|null;
		/**Datum(vytvoření?)*/
		datum?: JsonDate|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Změnu provedl*/
		nazev_rf?: string|null;
		/**Cesta k souboru*/
		cesta?: string|null;
		/**Problém :-O*/
		problem?: number|null;
	}
	const enum GGinsfilDtoNames { soubor = "soubor", faze = "faze", velikost = "velikost", datum = "datum", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", cesta = "cesta", problem = "problem",}
	const enum GGinsfilDtoFragments { soubor = "*", faze = "*", velikost = "*", datum = "*", dat_zmena = "*", nazev_rf = "*", cesta = "*", problem = "*",}
	const enum GGinsfilDtoTypes { soubor = "string", faze = "string", velikost = "number", datum = "JsonDate", dat_zmena = "JsonDate", nazev_rf = "string", cesta = "string", problem = "number",}
	const enum GGinsfilDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Ads\IGAds.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGAdsService*/
	interface Ads {
		/**Načtení detailu sestavy*/
		read(rq?:CallParams<{IxsAlv:string}>): _Task<{IxsAlv:string},GServiceReadResponse<Gordic.Gin.Interface.GAdsBaseDto>>;
		/**Test existuje fáze v tabulce ginvfaz*/
		dbTestExistsGinvfaz(rq?:CallParams<{phase:string}>): _Task<{phase:string},boolean>;
		/**Načtení seznamu sestav (ALV)*/
		listIxsAlv(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GAdsBaseDto>>;
		/**Načtení seznamu formátu sestav (ALF)*/
		listIxsAlf(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Gin.Interface.GAdsBaseDto>>;
		/**Načtení všech záznamů struktur sestavy (XME)*/
		listIxsXme(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Gin.Interface.GAdsBaseDto>>;
		/**Uložení sestavy do DB
		*     - info: commit se provádí ve volané metodě
		*/
		dbSave(rq?:CallParams<{GStream:any,Path:string,FileName:string,Phase:string}>): _Task<{GStream:any,Path:string,FileName:string,Phase:string},void>;
		/**Vrať všechny aktivní fáze*/
		getPhases(rq?:CallParams<{}>): _Task<{},Gordic.Gin.Interface.GAdsPhasesDto[]>;
		/**Načtení všech identifikátorů na detail sestavy dle IxsAlv*/
		readIdsByIxsAlv(rq?:CallParams<{IxsAlv:string}>): _Task<{IxsAlv:string},GServiceReadResponse<Gordic.Gin.Interface.GAdsIdsDto>>;
		/**Vrať identifikátor sestavy (ixs_alv) na základě identifikátoru struktury (ixs_xme)*/
		getMaxIxsAlv(rq?:CallParams<{IxsXme:string}>): _Task<{IxsXme:string},string>;
		/**Vrať název sestavy*/
		getNameOfAlv(rq?:CallParams<{IxsAlv:string}>): _Task<{IxsAlv:string},string>;
		/**Vrať seznam všech souborů (ALF, XME, GRC) uložené v DB*/
		listFilesInDb(rq?:CallParams<{IdsOfFiles:string[]}>): _Task<{IdsOfFiles:string[]},GServiceListResponse<Gordic.Gin.Interface.GGinsfilDto>>;
		/**Vrať všechny moduly dané sestavy*/
		getAlvModuls(rq?:CallParams<{IxsAlv:string}>): _Task<{IxsAlv:string},Gordic.Gin.Interface.GAdsModulsDto[]>;
		/**Vrať aktivitu pro ALV, XME a ALF*/
		getAlvXmeAlfActivity(rq?:CallParams<{IxsAlv:string,IxsXme:string}>): _Task<{IxsAlv:string,IxsXme:string},Gordic.Gin.Interface.GAdsActivityDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ads: ServiceBase & Catalog.Ads;
	}
	const Ads: Client["Ads"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatAppDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro přenos údajů o AI aplikace, modelu, systémového a uživatelského promptu, seznamu příloh*/
	interface GAiChatAppDto {
		/**Id AI aplikace*/
		IxsLap?: string|null;
		/**Název AI aplikace*/
		AppName?: string|null;
		/**Indikace, že AI aplikace využívá RAG systém a je připojena na vlastní datový zdroj*/
		IsOnYourData?: boolean|null;
		/**Popis*/
		Desc?: string|null;
		/**Podrobnější popis*/
		DescLong?: string|null;
		/**Systémový prompt, který nastavuje chování cílového LLM modelu*/
		SysPrompt?: string|null;
		/**Uživatelský prompt*/
		UsrPrompt?: string|null;
		/**Pokud má být vidět pouze nějaký text namísto celého promptu. Pokud je vyplněno, v historii se zobrazí pouze Txt*/
		UsrPromptTxt?: string|null;
		ChatHistory?: Gordic.Gin.Interface.GAiChatMessageDto[]|null;
		/**List příloh, které se vlepují nakonec uživatelského dotazu, čili jsou podrobeny predikci*/
		Attachments?: Gordic.Gin.Interface.GAiChatAttachmentDto[]|null;
		/**Indikace, že se jedná o Ginis Copilota*/
		IsCopilot?: boolean|null;
		Errors?: Gordic.Gin.Interface.GAiChatAppErrorDto[]|null;
	}
	const enum GAiChatAppDtoNames { IxsLap = "IxsLap", AppName = "AppName", IsOnYourData = "IsOnYourData", Desc = "Desc", DescLong = "DescLong", SysPrompt = "SysPrompt", UsrPrompt = "UsrPrompt", UsrPromptTxt = "UsrPromptTxt", ChatHistory = "ChatHistory", Attachments = "Attachments", IsCopilot = "IsCopilot", Errors = "Errors",}
	const enum GAiChatAppDtoFragments { IxsLap = "*", AppName = "*", IsOnYourData = "*", Desc = "*", DescLong = "*", SysPrompt = "*", UsrPrompt = "*", UsrPromptTxt = "*", ChatHistory = "*", Attachments = "*", IsCopilot = "*", Errors = "*",}
	const enum GAiChatAppDtoTypes { IxsLap = "string", AppName = "string", IsOnYourData = "boolean", Desc = "string", DescLong = "string", SysPrompt = "string", UsrPrompt = "string", UsrPromptTxt = "string", ChatHistory = "Gordic.Gin.Interface.GAiChatMessageDto[]", Attachments = "Gordic.Gin.Interface.GAiChatAttachmentDto[]", IsCopilot = "boolean", Errors = "Gordic.Gin.Interface.GAiChatAppErrorDto[]",}
	const enum GAiChatAppDtoTypeLengths {}
	interface GAiChatAppDtoExtensions {
	}
	const enum GAiChatAppDtoExtensionsNames {}
	const enum GAiChatAppDtoExtensionsFragments {}
	const enum GAiChatAppDtoExtensionsTypes {}
	const enum GAiChatAppDtoExtensionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatAppErrorDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Chyba, která se naskytla při zpracování AI aplikace*/
	interface GAiChatAppErrorDto {
		/**Nese podrobnosti o chybě v závislosti na ErrorCode
		*     - FileNotFound nese ID přílohy, která nebyla nalezena (pokud je prázdné -> neznámá příloha)
		*/
		Message?: string|null;
		/**Typ chyby, která nastala*/
		ErrorCode?: Gordic.Gin.Interface.GAiChatErrorEnum|null;
	}
	const enum GAiChatAppErrorDtoNames { Message = "Message", ErrorCode = "ErrorCode",}
	const enum GAiChatAppErrorDtoFragments { Message = "*", ErrorCode = "*",}
	const enum GAiChatAppErrorDtoTypes { Message = "string", ErrorCode = "Gordic.Gin.Interface.GAiChatErrorEnum",}
	const enum GAiChatAppErrorDtoTypeLengths {}
	/**Typ chyby, která nastala při zpracování AI aplikace*/
	const enum GAiChatErrorEnum {
		None=0,
		FileNotFound=1,
		Timeout=2,
		Licence=3,
		BehavioralPolicyViolation=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatAttachmentDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO k přenosu příloh*/
	interface GAiChatAttachmentDto {
		/**Identifikátor přílohy, defaultně je přebírán z js GAttachmentDefinition.id*/
		AttachmentId?: string|null;
		/**K předávání zakódované přílohy, například obrázek/pdf zakódovaný přes Base64, text z pdf atd*/
		EncodedAttachment?: string|null;
		/**FileInfoDto pro těžení textu z přílohy*/
		FileInfoDto?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Obecný objekt*/
		GeneralObjectJSON?: string|null;
		FormDto?: Gordic.Gin.Interface.GAiChatFormAttachmentDto|null;
	}
	const enum GAiChatAttachmentDtoNames { AttachmentId = "AttachmentId", EncodedAttachment = "EncodedAttachment", FileInfoDto = "FileInfoDto", GeneralObjectJSON = "GeneralObjectJSON", FormDto = "FormDto",}
	const enum GAiChatAttachmentDtoFragments { AttachmentId = "*", EncodedAttachment = "*", FileInfoDto = "*", GeneralObjectJSON = "*", FormDto = "*",}
	const enum GAiChatAttachmentDtoTypes { AttachmentId = "string", EncodedAttachment = "string", FileInfoDto = "Gordic.General.ApplicationInterface.GFileInfoDto", GeneralObjectJSON = "string", FormDto = "Gordic.Gin.Interface.GAiChatFormAttachmentDto",}
	const enum GAiChatAttachmentDtoTypeLengths {}
	interface GAiChatAttachmentDtoExtensions {
	}
	const enum GAiChatAttachmentDtoExtensionsNames {}
	const enum GAiChatAttachmentDtoExtensionsFragments {}
	const enum GAiChatAttachmentDtoExtensionsTypes {}
	const enum GAiChatAttachmentDtoExtensionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatCapability.d.ts 

declare namespace Gordic.Gin.Interface {
	interface QueryTypes {
	}
	const enum QueryTypesNames {}
	const enum QueryTypesFragments {}
	const enum QueryTypesTypes {}
	const enum QueryTypesTypeLengths {}
}
declare namespace Gordic.Gin.Interface.QueryTypes {
	const enum GAiChatCapability {
		IMG,
		TXT,
		AUDIO,
		UNKNOWN,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatFormAttachmentDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Represents an AI attachment for a gform, containing one or more sections.*/
	interface GAiChatFormAttachmentDto {
		/**Will always contain one or more sections of the gform ai attachment. If sections does not exist, provide stirng.Empty Name*/
		sections?: Gordic.Gin.Interface.GAiChatFormSectionAttachmentDto[]|null;
	}
	const enum GAiChatFormAttachmentDtoNames { sections = "sections",}
	const enum GAiChatFormAttachmentDtoFragments { sections = "*",}
	const enum GAiChatFormAttachmentDtoTypes { sections = "Gordic.Gin.Interface.GAiChatFormSectionAttachmentDto[]",}
	const enum GAiChatFormAttachmentDtoTypeLengths {}
	interface GAiChatFormSectionAttachmentDto {
		/**Name can be provided if the section exists, otherwise string.Empty (default)*/
		name?: string|null;
		/**Rows = label-value pairs representing the data in the gform (within non/existing section)*/
		rows?: Gordic.Gin.Interface.GAiChatFormRowAttachmentDto[]|null;
	}
	const enum GAiChatFormSectionAttachmentDtoNames { name = "name", rows = "rows",}
	const enum GAiChatFormSectionAttachmentDtoFragments { name = "*", rows = "*",}
	const enum GAiChatFormSectionAttachmentDtoTypes { name = "string", rows = "Gordic.Gin.Interface.GAiChatFormRowAttachmentDto[]",}
	const enum GAiChatFormSectionAttachmentDtoTypeLengths {}
	interface GAiChatFormRowAttachmentDto {
		label?: string|null;
		value?: string|null;
	}
	const enum GAiChatFormRowAttachmentDtoNames { label = "label", value = "value",}
	const enum GAiChatFormRowAttachmentDtoFragments { label = "*", value = "*",}
	const enum GAiChatFormRowAttachmentDtoTypes { label = "string", value = "string",}
	const enum GAiChatFormRowAttachmentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatMessageDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro přenos údajů o AI chatu, uživatelském promptu, predikované odpovědi a seznamu příloh
	*     
	*     Nová verze pro dočasnou koexistenci se starou verzí
	*/
	interface GAiChatMessageDto {
		Content?: string|null;
		Role?: Gordic.Gin.Interface.GAiChatRole|null;
		Attachments?: Gordic.Gin.Interface.GAiChatAttachmentDto[]|null;
		/**Detail odpovědi od AI (pouze v případě AI role)*/
		ResponseDetail?: Gordic.Gin.Interface.GAiChatResponseDto|null;
	}
	const enum GAiChatMessageDtoNames { Content = "Content", Role = "Role", Attachments = "Attachments", ResponseDetail = "ResponseDetail",}
	const enum GAiChatMessageDtoFragments { Content = "*", Role = "*", Attachments = "*", ResponseDetail = "*",}
	const enum GAiChatMessageDtoTypes { Content = "string", Role = "Gordic.Gin.Interface.GAiChatRole", Attachments = "Gordic.Gin.Interface.GAiChatAttachmentDto[]", ResponseDetail = "Gordic.Gin.Interface.GAiChatResponseDto",}
	const enum GAiChatMessageDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatResponseDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO for AI chat response detail*/
	interface GAiChatResponseDto {
		/**Text of the response from AI*/
		Text?: string|null;
		/**Role of AI, in this object it will mostly be Assistant*/
		Role?: Gordic.Gin.Interface.GAiChatRole|null;
		/**If the AI decides not to respond, it can return a reason*/
		Refusal?: string|null;
		/**Number of input tokens used*/
		InputTokenUsage?: number|null;
		/**Number of output tokens used*/
		OutputTokenUsage?: number|null;
		/**(just a) Preparation for the ability to call Tools*/
		ToolCalls?: Gordic.Gin.Interface.GAiChatToolCallDto[]|null;
		ErrorMessage?: string|null;
		readonly IsError?: boolean|null;
	}
	const enum GAiChatResponseDtoNames { Text = "Text", Role = "Role", Refusal = "Refusal", InputTokenUsage = "InputTokenUsage", OutputTokenUsage = "OutputTokenUsage", ToolCalls = "ToolCalls", ErrorMessage = "ErrorMessage", IsError = "IsError",}
	const enum GAiChatResponseDtoFragments { Text = "*", Role = "*", Refusal = "*", InputTokenUsage = "*", OutputTokenUsage = "*", ToolCalls = "*", ErrorMessage = "*", IsError = "*",}
	const enum GAiChatResponseDtoTypes { Text = "string", Role = "Gordic.Gin.Interface.GAiChatRole", Refusal = "string", InputTokenUsage = "number", OutputTokenUsage = "number", ToolCalls = "Gordic.Gin.Interface.GAiChatToolCallDto[]", ErrorMessage = "string", IsError = "boolean",}
	const enum GAiChatResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatRole.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Role of the chat participant*/
	const enum GAiChatRole {
		User,
		Assistant,
		Tool,
		Unknown,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatScenarioDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO předdefinovaných scénářů AI chatu*/
	interface GAiChatScenarioDto {
		/**Aplikace, které scénář náleží*/
		IxsLap?: string|null;
		Prompt?: string|null;
		/**Pro uživatele viditelný základní popis (zatím spíše nadpis)*/
		Caption?: string|null;
		/**Pro uživatele viditelný dlouhý popis, co přesně scénář dělá*/
		CaptionLong?: string|null;
		/**V případě, že je nutné uvést změnu i na úrovni systémového promptu.*/
		SysPrompt?: string|null;
	}
	const enum GAiChatScenarioDtoNames { IxsLap = "IxsLap", Prompt = "Prompt", Caption = "Caption", CaptionLong = "CaptionLong", SysPrompt = "SysPrompt",}
	const enum GAiChatScenarioDtoFragments { IxsLap = "*", Prompt = "*", Caption = "*", CaptionLong = "*", SysPrompt = "*",}
	const enum GAiChatScenarioDtoTypes { IxsLap = "string", Prompt = "string", Caption = "string", CaptionLong = "string", SysPrompt = "string",}
	const enum GAiChatScenarioDtoTypeLengths {}
	interface GAiChatScenarioDtoExtensions {
	}
	const enum GAiChatScenarioDtoExtensionsNames {}
	const enum GAiChatScenarioDtoExtensionsFragments {}
	const enum GAiChatScenarioDtoExtensionsTypes {}
	const enum GAiChatScenarioDtoExtensionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\DTO\GAiChatToolCallDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Prepared support class for AI tool calls*/
	interface GAiChatToolCallDto {
		ToolCallId?: string|null;
		/**Tool name (function name) to call*/
		Name?: string|null;
		/**Deserialized arguments of the called function*/
		Arguments?: string|null;
	}
	const enum GAiChatToolCallDtoNames { ToolCallId = "ToolCallId", Name = "Name", Arguments = "Arguments",}
	const enum GAiChatToolCallDtoFragments { ToolCallId = "*", Name = "*", Arguments = "*",}
	const enum GAiChatToolCallDtoTypes { ToolCallId = "string", Name = "string", Arguments = "string",}
	const enum GAiChatToolCallDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\AiChat\ISL\IGAiChatApps.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL AI chat aplikace, přednastavené scénáře, predikce*/
	interface AiChatApps {
		/**Zkontroluje, zdali pro danou fázi lze použít AiChat, závisí řídících parametrech a dostupnosti AI licence pro danou fazi*/
		isLicencedAndConfigured(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Zdali je některý z AI connectorů licencován*/
		isAnyConnectorLicensed(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Vrátí seznam aplikací pro danou párovací enum val z Ginclgc*/
		getChatAppsDtoList(rq?:CallParams<{content:Gordic.Ginis.DbModel.GGinclgcEnum}>): _Task<{content:Gordic.Ginis.DbModel.GGinclgcEnum},Gordic.Gin.Interface.GAiChatAppDto[]>;
		/**Vrátí seznam přednastavených scénářů náležící příslušné AI aplikaci a gcontentu*/
		getChatScenarioDtoList(rq?:CallParams<{ixs_lap:string,content:Gordic.Ginis.DbModel.GGinclgcEnum}>): _Task<{ixs_lap:string,content:Gordic.Ginis.DbModel.GGinclgcEnum},Gordic.Gin.Interface.GAiChatScenarioDto[]>;
		/**Vrátí scénáře pro více AI aplikací najednou dle zadaných ixs_lap a daného gcontentu. Scénáře jsou řazeny dle pozice ixs_laps kolekce.*/
		getAllChatScenariosDtoList(rq?:CallParams<{ixsLaps:string[],content:Gordic.Ginis.DbModel.GGinclgcEnum}>): _Task<{ixsLaps:string[],content:Gordic.Ginis.DbModel.GGinclgcEnum},Gordic.Gin.Interface.GAiChatScenarioDto[]>;
		/**Připraví AI přílohy do formátu vhodného pro AI chat predikci, v případě FileInfoFto extrahuje text z pdf*/
		encodeAiChatAttachments(rq?:CallParams<{attachments:Gordic.Gin.Interface.GAiChatAttachmentDto[]}>): _Task<{attachments:Gordic.Gin.Interface.GAiChatAttachmentDto[]},Gordic.Gin.Interface.GAiChatAttachmentDto[]>;
		/**Provede chat predikci na základě zadaného promptu a historie. Pozor, pravděpdobně zavolá externí službu (azure, ...)!*/
		chatCompletionRequest(rq?:CallParams<{dto:Gordic.Gin.Interface.GAiChatAppDto}>): _Task<{dto:Gordic.Gin.Interface.GAiChatAppDto},Gordic.Gin.Interface.GAiChatAppDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AiChatApps: ServiceBase & Catalog.AiChatApps;
	}
	const AiChatApps: Client["AiChatApps"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\Dto\Gordic.Gin.Interface.GNotificationOrderDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**požadavek na uživatelskou avizaci*/
	interface GNotificationOrderDto {
		/**pořadové číslo požadavku na avizaci*/
		por_cis_avi?: number|null;
		/**identifikátor typu avizované události*/
		id_uda?: string|null;
		/**název typu avizované události*/
		id_uda_txt?: string|null;
		/**identifikátor funkce vlastníka požadavku na avizaci*/
		ixs_fun?: string|null;
		/**název požadavku na avizaci*/
		nazev?: string|null;
		/**kontaktní údaje adresáta odesílané zprávy*/
		kontakt?: string|null;
		/**text odesílané zprávy*/
		text?: string|null;
		/**příznak zrušení požadavku po avizaci*/
		priz_del?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**popis aktivity*/
		aktivita_txt?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor původce změny*/
		zmenu_prov?: string|null;
		/**název původce změny*/
		nazev_ref?: string|null;
	}
	const enum GNotificationOrderDtoNames { por_cis_avi = "por_cis_avi", id_uda = "id_uda", id_uda_txt = "id_uda_txt", ixs_fun = "ixs_fun", nazev = "nazev", kontakt = "kontakt", text = "text", priz_del = "priz_del", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref",}
	const enum GNotificationOrderDtoFragments { por_cis_avi = "*", id_uda = "*", id_uda_txt = "*", ixs_fun = "*", nazev = "*", kontakt = "*", text = "*", priz_del = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*",}
	const enum GNotificationOrderDtoTypes { por_cis_avi = "number", id_uda = "string", id_uda_txt = "string", ixs_fun = "string", nazev = "string", kontakt = "string", text = "string", priz_del = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string",}
	const enum GNotificationOrderDtoTypeLengths { id_uda = 15, id_uda_txt = 254, ixs_fun = 12, nazev = 254, kontakt = 254, aktivita_txt = 50, zmenu_prov = 12, nazev_ref = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\Dto\Gordic.Gin.Interface.GNotificationPlaceholderDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**zástupný symbol pro uživatelské avizace*/
	interface GNotificationPlaceholderDto {
		/**identifikátor typu avizované události*/
		id_uda?: string|null;
		/**zástupný symbol*/
		z_symbol?: string|null;
		/**popis zástupného symbolu*/
		param_uda_txt?: string|null;
	}
	const enum GNotificationPlaceholderDtoNames { id_uda = "id_uda", z_symbol = "z_symbol", param_uda_txt = "param_uda_txt",}
	const enum GNotificationPlaceholderDtoFragments { id_uda = "*", z_symbol = "*", param_uda_txt = "*",}
	const enum GNotificationPlaceholderDtoTypes { id_uda = "string", z_symbol = "string", param_uda_txt = "string",}
	const enum GNotificationPlaceholderDtoTypeLengths { id_uda = 15, z_symbol = 30, param_uda_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\Dto\Gordic.Gin.Interface.GNotificationRuleDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**pravidlo pro uživatelské avizace*/
	interface GNotificationRuleDto {
		/**pořadové číslo pravidla pro událost*/
		por_cis_avp?: number|null;
		/**pořadové číslo pravidla pro parametr události*/
		por_cis_avu?: number|null;
		/**identifikátor pravidla pro událost*/
		id_avp?: string|null;
		/**identifikátor typu avizované události*/
		id_uda?: string|null;
		/**název parametru události*/
		param_uda?: string|null;
		/**datový typ pravidla*/
		dat_typ?: number|null;
		/**název pravidla*/
		nazev?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**pořadové číslo požadavku na avizaci*/
		por_cis_avi?: number|null;
		/**identifikátor operátoru*/
		id_avo?: number|null;
		/**popis operátoru*/
		id_avo_txt?: string|null;
		/**hodnota*/
		hodnota?: string|null;
		/**příznak povinnosti*/
		priz_pov?: number|null;
		/**příznak povinnosti textově*/
		priz_pov_txt?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**příznak požadavku na vyhodnocení pravidla*/
		enabled?: boolean|null;
	}
	const enum GNotificationRuleDtoNames { por_cis_avp = "por_cis_avp", por_cis_avu = "por_cis_avu", id_avp = "id_avp", id_uda = "id_uda", param_uda = "param_uda", dat_typ = "dat_typ", nazev = "nazev", poznamka = "poznamka", por_cis_avi = "por_cis_avi", id_avo = "id_avo", id_avo_txt = "id_avo_txt", hodnota = "hodnota", priz_pov = "priz_pov", priz_pov_txt = "priz_pov_txt", aktivita = "aktivita", enabled = "enabled",}
	const enum GNotificationRuleDtoFragments { por_cis_avp = "*", por_cis_avu = "*", id_avp = "*", id_uda = "*", param_uda = "*", dat_typ = "*", nazev = "*", poznamka = "*", por_cis_avi = "*", id_avo = "*", id_avo_txt = "*", hodnota = "*", priz_pov = "*", priz_pov_txt = "*", aktivita = "*", enabled = "*",}
	const enum GNotificationRuleDtoTypes { por_cis_avp = "number", por_cis_avu = "number", id_avp = "string", id_uda = "string", param_uda = "string", dat_typ = "number", nazev = "string", poznamka = "string", por_cis_avi = "number", id_avo = "number", id_avo_txt = "string", hodnota = "string", priz_pov = "number", priz_pov_txt = "string", aktivita = "number", enabled = "boolean",}
	const enum GNotificationRuleDtoTypeLengths { id_uda = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\FilterDto\Gordic.Gin.Interface.GNotificationOrderFilterDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtr pro omezení výběru požadavků na uživatelskou avizaci*/
	interface GNotificationOrderFilterDto {
		/**pořadové číslo požadavku na avizaci*/
		por_cis_avi?: GBaseFilter<number>|null;
		/**identifikátor typu avizované události*/
		id_uda?: GBaseFilter<string>|null;
		/**identifikátor funkce vlastníka požadavku na avizaci*/
		ixs_fun?: GBaseFilter<string>|null;
	}
	const enum GNotificationOrderFilterDtoNames { por_cis_avi = "por_cis_avi", id_uda = "id_uda", ixs_fun = "ixs_fun",}
	const enum GNotificationOrderFilterDtoFragments { por_cis_avi = "*", id_uda = "*", ixs_fun = "*",}
	const enum GNotificationOrderFilterDtoTypes { por_cis_avi = "GBaseFilter<number>", id_uda = "GBaseFilter<string>", ixs_fun = "GBaseFilter<string>",}
	const enum GNotificationOrderFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\FilterDto\Gordic.Gin.Interface.GNotificationPlaceholderFilterDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtr pro omezení výběru zástupných symbolů pro uživatelské avizace*/
	interface GNotificationPlaceholderFilterDto {
		/**identifikátor typu avizované události*/
		id_uda?: GBaseFilter<string>|null;
	}
	const enum GNotificationPlaceholderFilterDtoNames { id_uda = "id_uda",}
	const enum GNotificationPlaceholderFilterDtoFragments { id_uda = "*",}
	const enum GNotificationPlaceholderFilterDtoTypes { id_uda = "GBaseFilter<string>",}
	const enum GNotificationPlaceholderFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\FilterDto\Gordic.Gin.Interface.GNotificationRuleFilterDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtr pro omezení výběru pravidel pro uživatelské avizace*/
	interface GNotificationRuleFilterDto {
		/**identifikátor typu avizované události*/
		id_uda?: GBaseFilter<string>|null;
		/**pořadové číslo požadavku na avizaci*/
		por_cis_avi?: GBaseFilter<number>|null;
	}
	const enum GNotificationRuleFilterDtoNames { id_uda = "id_uda", por_cis_avi = "por_cis_avi",}
	const enum GNotificationRuleFilterDtoFragments { id_uda = "*", por_cis_avi = "*",}
	const enum GNotificationRuleFilterDtoTypes { id_uda = "GBaseFilter<string>", por_cis_avi = "GBaseFilter<number>",}
	const enum GNotificationRuleFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\Isl\Gordic.Gin.Interface.IGNotificationOrder.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro požadavek na uživatelskou avizaci
	* @domain EventsAdmin
	*/
	interface PozadavekNaAvizaci {
		/**získání seznamu požadavků na uživatelskou avizaci*/
		list(rq?:Gordic.Gin.Interface.GNotificationOrderFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GNotificationOrderDto>>;
		/**získání požadavku na uživatelskou avizaci*/
		read(rq?:Gordic.Gin.Interface.GNotificationOrderDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GNotificationOrderDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GNotificationOrderDto>,GServiceReadResponse<Gordic.Gin.Interface.GNotificationOrderDto>>;
		/**vytvoření požadavku na uživatelskou avizaci*/
		create(rq?:Gordic.Gin.Interface.GNotificationOrderDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GNotificationOrderDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GNotificationOrderDto>,GServiceSaveResponse<Gordic.Gin.Interface.GNotificationOrderDto>>;
		/**aktualizace požadavku na uživatelskou avizaci*/
		update(rq?:Gordic.Gin.Interface.GNotificationOrderDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GNotificationOrderDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GNotificationOrderDto>,GServiceSaveResponse<Gordic.Gin.Interface.GNotificationOrderDto>>;
		/**smazání požadavku na uživatelskou avizaci*/
		delete(rq?:Gordic.Gin.Interface.GNotificationOrderDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GNotificationOrderDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GNotificationOrderDto>,GServiceSaveResponse<Gordic.Gin.Interface.GNotificationOrderDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PozadavekNaAvizaci: ServiceBase & Catalog.PozadavekNaAvizaci;
	}
	const PozadavekNaAvizaci: Client["PozadavekNaAvizaci"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\Isl\Gordic.Gin.Interface.IGNotificationPlaceholder.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro zástupný symbol uživatelské avizace
	* @domain EventsAdmin
	*/
	interface ZastupnySymbol {
		/**získání seznamu zástupných symbolů pro uživatelské avizace*/
		list(rq?:Gordic.Gin.Interface.GNotificationPlaceholderFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GNotificationPlaceholderDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZastupnySymbol: ServiceBase & Catalog.ZastupnySymbol;
	}
	const ZastupnySymbol: Client["ZastupnySymbol"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Avizace\Isl\Gordic.Gin.Interface.IGNotificationRule.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro pravidlo uživatelské avizace
	* @domain EventsAdmin
	*/
	interface PravidloAvizace {
		/**získání seznamu pravidel pro uživatelské avizace*/
		list(rq?:Gordic.Gin.Interface.GNotificationRuleFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GNotificationRuleDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PravidloAvizace: ServiceBase & Catalog.PravidloAvizace;
	}
	const PravidloAvizace: Client["PravidloAvizace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Base\Gordic.Gin.Interface.IGGinTsCommon.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Třída pro uchování informací o operaci*/
	interface GResultInfo {
		/**identifikator*/
		Ixs?: string|null;
		/**Vysledek operace*/
		Vysledek?: Gordic.Gin.Interface.TypVysledkuOperace|null;
		/**Informace*/
		Info?: string|null;
		/**Chyba*/
		ErrorText?: string|null;
		/**datum zmeny*/
		dat_zmena?: JsonDate|null;
	}
	const enum GResultInfoNames { Ixs = "Ixs", Vysledek = "Vysledek", Info = "Info", ErrorText = "ErrorText", dat_zmena = "dat_zmena",}
	const enum GResultInfoFragments { Ixs = "*", Vysledek = "*", Info = "*", ErrorText = "*", dat_zmena = "*",}
	const enum GResultInfoTypes { Ixs = "string", Vysledek = "Gordic.Gin.Interface.TypVysledkuOperace", Info = "string", ErrorText = "string", dat_zmena = "JsonDate",}
	const enum GResultInfoTypeLengths {}
	/**Info o prostedi*/
	interface GSessionInfoDto {
		/**vyvojova vetev*/
		IsVyvoj?: boolean|null;
		/**faze modulu*/
		Faze?: Gordic.Gin.Interface.FazeGinisuEnum|null;
		/**Typ Lokalizace*/
		TypLokalizace?: Gordic.Gin.Interface.TypLokalizace|null;
		/**LogPorCislo*/
		LogPorCislo?: number|null;
		/**LogPorCislo kon*/
		LogPorCisloKon?: number|null;
	}
	const enum GSessionInfoDtoNames { IsVyvoj = "IsVyvoj", Faze = "Faze", TypLokalizace = "TypLokalizace", LogPorCislo = "LogPorCislo", LogPorCisloKon = "LogPorCisloKon",}
	const enum GSessionInfoDtoFragments { IsVyvoj = "*", Faze = "*", TypLokalizace = "*", LogPorCislo = "*", LogPorCisloKon = "*",}
	const enum GSessionInfoDtoTypes { IsVyvoj = "boolean", Faze = "Gordic.Gin.Interface.FazeGinisuEnum", TypLokalizace = "Gordic.Gin.Interface.TypLokalizace", LogPorCislo = "number", LogPorCisloKon = "number",}
	const enum GSessionInfoDtoTypeLengths {}
	/**Třída pro pracei se soubory*/
	interface GFileInStringDto {
		/**identifikator*/
		Name?: string|null;
		/**Vysledek operace*/
		Bytes?: string|null;
	}
	const enum GFileInStringDtoNames { Name = "Name", Bytes = "Bytes",}
	const enum GFileInStringDtoFragments { Name = "*", Bytes = "*",}
	const enum GFileInStringDtoTypes { Name = "string", Bytes = "string",}
	const enum GFileInStringDtoTypeLengths {}
	/**Třída pro uchování informací o operaci*/
	interface GResultInfoDto {
		/**identifikator*/
		Ixs?: string|null;
		/**Vysledek operace*/
		Vysledek?: Gordic.Gin.Interface.TypVysledkuOperace|null;
		/**Informace*/
		Info?: string|null;
		/**Chyba*/
		ErrorText?: string|null;
	}
	const enum GResultInfoDtoNames { Ixs = "Ixs", Vysledek = "Vysledek", Info = "Info", ErrorText = "ErrorText",}
	const enum GResultInfoDtoFragments { Ixs = "*", Vysledek = "*", Info = "*", ErrorText = "*",}
	const enum GResultInfoDtoTypes { Ixs = "string", Vysledek = "Gordic.Gin.Interface.TypVysledkuOperace", Info = "string", ErrorText = "string",}
	const enum GResultInfoDtoTypeLengths {}
	/**Předek DTO pro ISL operace*/
	interface GEntityDto {
		/**identifikator*/
		IxsEntity?: string|null;
	}
	const enum GEntityDtoNames { IxsEntity = "IxsEntity",}
	const enum GEntityDtoFragments { IxsEntity = "*",}
	const enum GEntityDtoTypes { IxsEntity = "string",}
	const enum GEntityDtoTypeLengths {}
	/**Třída pro ixs a datum (vetsinou datum zmeny)*/
	interface GIxsDateTime {
		/**identifikator*/
		Ixs?: string|null;
		/**Vysledek operace*/
		Datum?: JsonDate|null;
	}
	const enum GIxsDateTimeNames { Ixs = "Ixs", Datum = "Datum",}
	const enum GIxsDateTimeFragments { Ixs = "*", Datum = "*",}
	const enum GIxsDateTimeTypes { Ixs = "string", Datum = "JsonDate",}
	const enum GIxsDateTimeTypeLengths {}
	/**faze GINIS - moduly*/
	const enum FazeGinisuEnum {
		neurceno,
		GSAVYP01,
		GWAVYP05,
		GSASPI01,
		GWASPI05,
		GSAPOD01,
		GWAPOD05,
		GSAESR01,
		GWAESR05,
		GSASUD01,
		GWASUD05,
		GSAUDU01,
		GWASSD05,
		GSAUSU01,
		GWAUSU01,
		GWAUSU05,
		GWAGDU01,
		GWAGDU05,
		GWAVED05,
		GWAPPO05,
		GSAEPK01,
		GWAEPK05,
		GWATPD05,
	}
	/**Typ vysledku operace*/
	const enum TypVysledkuOperace {
		/**neurceno*/
		Neurceno=0,
		/**Provedeno - akce se zdarila (modrá fajfka)*/
		Provedeno=2,
		/**Neprovedeno - akce se nepodarila (cervený krízek)*/
		Neprovedeno=3,
		/**Provedeno - s upozornenim*/
		ProvedenoSUpozornenim=4,
		/**Neni mozne provadet aktivni operace*/
		Neoznacitelny=8,
		/**Provedeno jiz dríve (sedá fajfka)*/
		ProvedenoJizDrive=9,
	}
	/**Typ pouzitych ikon*/
	const enum TypIconSet {
		/**tanfo ikony*/
		Tango,
		/**Fontove (pro GWAXXX05)*/
		Fontove,
	}
	/**Typ odpovedi dle Gincpoo*/
	const enum GincpooEnum {
		/**neurceno*/
		Neurceno=0,
		/**odpovědět mailem*/
		OdpovedMailem=10,
		/**odpovědět DZ - datovou zpravou*/
		OdpovedDZ=20,
		/**neodpovidat*/
		Neodpovidat=30,
	}
	/**Typ oznaceni radku seznamu dle provadene akce*/
	const enum TypOznaceniRadkuSeznamu {
		/**Neurceno*/
		Neurceno=0,
		/**Vybrano*/
		Vybrano=1,
		/**Provedeno - akce se zdarila (modrá fajfka)*/
		Provedeno=2,
		/**Neprovedeno - akce se nepodarila (cervený krízek)*/
		Neprovedeno=3,
		/**Provedeno - bylo provedeno, ale nejaký problém se objevil (warning - zluty obdelnik)*/
		ProvedenoSUpozornenim=4,
		/**Provedeno jiz dríve (sedá fajfka)
		*     ///
		*/
		Neoznacitelny=8,
		/**Provedeno jiz dríve (sedá fajfka)
		*     ///
		*/
		ProvedenoJizDrive=9,
		/**Neznamy stav (otaznik)*/
		Neznamo=99,
	}
	/**Enum typ_sgn (gincsgn)*/
	const enum GincsgnEnum {
		/**Neurčeno*/
		Neurceno=0,
		/**VnejsiPodpis*/
		VnejsiPodpis=1,
		/**VnitrniPodpis*/
		VnitrniPodpis=2,
		/**Vnejsi casove razitko*/
		VnejsiCasoveRazitko=3,
		/**Podpis a vnitrni CasRazitko*/
		PodpisAVnitrniCasRazitko=4,
		/**Vnitrni CasRazitko*/
		VnitrniCasRazitko=5,
	}
	/**Typ MessageBoxIcon*/
	const enum TypMessageBoxIcon {
		/**None*/
		None,
		/**Asterisk*/
		Asterisk,
		/**Error*/
		Error,
		/**Exclamation*/
		Exclamation,
		/**Hand*/
		Hand,
		/**Information*/
		Information,
		/**Question*/
		Question,
		/**Stop*/
		Stop,
		/**Warning*/
		Warning,
	}
	/**pro skladani ikon*/
	const enum TypIkonyCharakteru {
		digitalni,
		hybridni,
		mimoradny,
		neznamy,
	}
	/**pro skladani ikon*/
	const enum TypIkonyStavu {
		provedeno,
		zruseno,
		stornovano,
		predano,
		prevzato,
		podepsano,
		odeslano,
		vypraveno,
		doruceno,
		vraceno,
		sdruzeno,
		neznamo,
		neprovedeno,
		ulozeno,
		opakovano,
		chybne,
		archivovano,
		skartovano,
		pripraveno,
	}
	/**typ ikony akce*/
	const enum TypIkonyAkce {
		stornovat,
		zastavit,
		predat,
		pridelit,
		prevzit,
		vypravit,
		odeslat,
		obcerstvit,
		kontrola,
		kontrolaMetadat,
		vratit,
		ulozit,
		ulozitPoradi,
		vyjmout,
		odstranit,
		vymazat,
		ztratit,
		sdruzit,
		rozebrat,
		zmenit,
		editovat,
		tisk,
		generovat,
		zobrazitDebugInfo,
		informace,
		nasledujici,
		predchazejici,
		tridit,
		dorucit,
		zmenaTerminu,
		zobrazitDetail,
		novyZaznam,
		zmenitAktivitu,
		zrusitZmeny,
		zavrit,
		vlozit,
		aktualizovatStav,
		zobrazitSoubor,
		vypujcit,
		vypocitat,
		archivovat,
		skartovat,
		/**umistit (např. v uloznem miste)*/
		umistit,
		hledat,
	}
	/**pro skladani ikon*/
	const enum TypIkonyPredmetu {
		dokument,
		spis,
		dokSpis,
		zasilka,
		balik,
		provedeni,
		zruseni,
		stornovani,
		ulozeni,
		predani,
		prevzeti,
		podpis,
		tisk,
		uzivatel,
		odeslano,
		prehled,
		mazani,
		vypraveni,
		kniha,
		soubor,
		ostatni,
		elPodani,
	}
	/**pro skladani ikon*/
	const enum TypBarvyIkony {
		zluta,
		modra,
		cerna,
		cervena,
		zelena,
		cervenaVyrazna,
	}
	/**pro skladani ikon*/
	const enum TypZobrazeniIkony {
		text,
		stav,
		stred,
		vlastnost,
	}
	/**pro skladani ikon*/
	const enum TypLokalizace {
		/**Ceska republika*/
		CeskaRepublika=0,
		/**Slovensko*/
		Slovensko=10,
		/**Ukrajina*/
		Ukrajina=50,
		/**neurceno*/
		neurceno=99,
	}
	/**pro skladani ikon*/
	const enum TypUmisteniIkony {
		vpravoNahore,
		vpravoDole,
		vpravoStred,
		stred,
		vlevoNahore,
		vlevoDole,
		vlevoStred,
		vPopredi,
		vPozadi,
		vBilemKolecku,
		vBilemCtvrerecku,
	}
	/**Typ zobrazení (detailu) entity.*/
	const enum TypZobrazeniEntity {
		/**Náhled na entitu.*/
		Preview=0,
		/**Vytváření nové entity.*/
		New=1,
		/**Zobrazní entity (NEeditační režim).*/
		View=2,
		/**Úprava entity (editační režim).*/
		Edit=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\BCH\GGinbchDbDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro uložení informací o souboru uloženém v blockchainu v databázi*/
	interface GGinbchDbDto {
		/**Interní ID popisující fyzické uložení binárního obsahu jedné verze el.souboru*/
		ixs_ulo?: string|null;
		/**Identifikátor záznamu v blockchainu*/
		id_bch?: string|null;
		/**Datum vytvoření/ změny záznamu v blockchainu*/
		dat_zmena_bch?: JsonDate|null;
		/**Typ blockchainu
		*     Uložen v číselníku vas.gincbch
		*/
		typ_bch?: number|null;
		/**Název souboru*/
		popis?: string|null;
		/**Popis souboru*/
		poznamka?: string|null;
		/**Datum změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Změnu provedl*/
		zmenu_prov?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GGinbchDbDtoNames { ixs_ulo = "ixs_ulo", id_bch = "id_bch", dat_zmena_bch = "dat_zmena_bch", typ_bch = "typ_bch", popis = "popis", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita",}
	const enum GGinbchDbDtoFragments { ixs_ulo = "*", id_bch = "*", dat_zmena_bch = "*", typ_bch = "*", popis = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*",}
	const enum GGinbchDbDtoTypes { ixs_ulo = "string", id_bch = "string", dat_zmena_bch = "JsonDate", typ_bch = "number", popis = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number",}
	const enum GGinbchDbDtoTypeLengths { ixs_ulo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\BCH\GGinbchDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Vstupní DTO pro uložení záznamu do blockchainu*/
	interface GGinbchDto {
		/**Hash souboru souboru*/
		Hash?: string|null;
		/**Název souboru*/
		FileName?: string|null;
		/**Popis souboru*/
		FileDescription?: string|null;
		/**Identifikátor souboru*/
		Ixb?: string|null;
		/**Interní ID popisující fyzické uložení binárního obsahu jedné verze el.souboru*/
		IxsUlo?: string|null;
	}
	const enum GGinbchDtoNames { Hash = "Hash", FileName = "FileName", FileDescription = "FileDescription", Ixb = "Ixb", IxsUlo = "IxsUlo",}
	const enum GGinbchDtoFragments { Hash = "*", FileName = "*", FileDescription = "*", Ixb = "*", IxsUlo = "*",}
	const enum GGinbchDtoTypes { Hash = "string", FileName = "string", FileDescription = "string", Ixb = "string", IxsUlo = "string",}
	const enum GGinbchDtoTypeLengths { Ixb = 12, IxsUlo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\BCH\GGinbchFilter.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Filter (enum): ISL služba pro uložení informací o souboru uloženém v blockchainu do databáze*/
	const enum GGinbchFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\BCH\GGinbchViewDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**GGinbchViewDto*/
	interface GGinbchViewDto {
		/**Id*/
		Id?: string|null;
		/**Name*/
		Name?: string|null;
		/**Hashes*/
		Hashes?: Gordic.Gin.Interface.GGinbchViewHashesDto[]|null;
	}
	const enum GGinbchViewDtoNames { Id = "Id", Name = "Name", Hashes = "Hashes",}
	const enum GGinbchViewDtoFragments { Id = "*", Name = "*", Hashes = "*",}
	const enum GGinbchViewDtoTypes { Id = "string", Name = "string", Hashes = "Gordic.Gin.Interface.GGinbchViewHashesDto[]",}
	const enum GGinbchViewDtoTypeLengths {}
	/**GGinbchViewHashesDto*/
	interface GGinbchViewHashesDto {
		/**DocumentHash*/
		DocumentHash?: string|null;
	}
	const enum GGinbchViewHashesDtoNames { DocumentHash = "DocumentHash",}
	const enum GGinbchViewHashesDtoFragments { DocumentHash = "*",}
	const enum GGinbchViewHashesDtoTypes { DocumentHash = "string",}
	const enum GGinbchViewHashesDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\BCH\IGGinbch.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface: ISL služba pro uložení informací o souboru uloženém v blockchainu do databáze*/
	interface Ginbch {
		/**Přidání záznamu do blockchainu a uložení informací o záznamu do DB*/
		set(rq?:CallParams<{Input:Gordic.Gin.Interface.GGinbchDto}>): _Task<{Input:Gordic.Gin.Interface.GGinbchDto},void>;
		/**Zobrazení informací záznamu z blockchainu*/
		view(rq?:CallParams<{DocumentId:string}>): _Task<{DocumentId:string},Gordic.Gin.Interface.GGinbchViewDto>;
		/**Kontrola hashe souboru v DB uložišti vůči hasi souboru v blockchainu*/
		checkHash(rq?:CallParams<{DocumentId:string,HashFromDb:string}>): _Task<{DocumentId:string,HashFromDb:string},boolean>;
		/**Načtení záznamu z DB*/
		read(rq?:CallParams<{IxsUlo:string}>): _Task<{IxsUlo:string},Gordic.Gin.Interface.GGinbchDbDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ginbch: ServiceBase & Catalog.Ginbch;
	}
	const Ginbch: Client["Ginbch"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\Enums.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Typ vystupu sql pohledu*/
	const enum GDashboardSqlTypVystupu {
		/**Neurceno*/
		neurceno=0,
		/**Semafor zobrazuje jediný výsledek. Z tabulkové množiny vrací pouze první záznam a zobrazí hodnotu prvního sloupce v seznamu, který je označen jako viditelný.*/
		semafor=10,
		/**Tabulka zobrazuje záznamy orientované do řádků o několika sloupcích. V tabulkovém zobrazení lze definovat agregace a seskupování záznamů.*/
		tabulka=40,
		/**Graf zobrazuje data tabulkového charakteru v grafické formě. Je možné zvolit z několika typů grafu.*/
		formular=50,
		/**Graf zobrazuje data tabulkového charakteru v grafické formě. Je možné zvolit z několika typů grafu.*/
		graf=60,
		/**Měřidlo zobrazuje jeden výstup číselného typu na stupnici v podobě, jakou známe např. u tachometru automobilu.*/
		meridlo=70,
		/**Sestava spustí samostatného klienta "Prohlížeč sestav" firmy GORDIC spol. s r.o. Sestava je plně funkční pouze v rámci tohoto prohlížeče.*/
		sestava=80,
		/**Výstup grafického reportéru GORDIC spol. s r.o.*/
		reporter=82,
		/**Reportovací služba umožňuje prohlížení hotových sestav (reportů) uložených na vzdáleném serveru. V rámci výstupu jsou povoleny jen takové operace, které poskytuje daný report.*/
		reportovaciSluzba=85,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpadpohDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipadpoh*/
	interface GIpadpohDto {
		/**DBCOLUMN:ipadpoh.ixs_poh*/
		ixs_poh?: string|null;
		/**DBCOLUMN:ipadpoh.klic*/
		klic?: string|null;
		/**DBCOLUMN:ipadpoh.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:ipadpoh.obsah*/
		obsah?: string|null;
		/**DBCOLUMN:ipadpoh.aktivita*/
		aktivita?: number|null;
		/**nazev z ipaspoh (pro join)*/
		nazev?: string|null;
	}
	const enum GIpadpohDtoNames { ixs_poh = "ixs_poh", klic = "klic", por_cislo = "por_cislo", obsah = "obsah", aktivita = "aktivita", nazev = "nazev",}
	const enum GIpadpohDtoFragments { ixs_poh = "*", klic = "*", por_cislo = "*", obsah = "*", aktivita = "*", nazev = "*",}
	const enum GIpadpohDtoTypes { ixs_poh = "string", klic = "string", por_cislo = "number", obsah = "string", aktivita = "number", nazev = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpadupoDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipasupo*/
	interface GIpadupoDto {
		/**DBCOLUMN:ipasupo.ixs_upo*/
		ixs_upo?: string|null;
		/**DBCOLUMN:ipasupo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipasupo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ipasupo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**obsah pohledu*/
		obsah_json?: JsonBlob|null;
	}
	const enum GIpadupoDtoNames { ixs_upo = "ixs_upo", aktivita = "aktivita", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", obsah_json = "obsah_json",}
	const enum GIpadupoDtoFragments { ixs_upo = "*", aktivita = "*", zmenu_prov = "*", dat_zmena = "*", obsah_json = "*",}
	const enum GIpadupoDtoTypes { ixs_upo = "string", aktivita = "number", zmenu_prov = "string", dat_zmena = "JsonDate", obsah_json = "JsonBlob",}
	const enum GIpadupoDtoFilter {
		ixs_upo=0,
		aktivita=1,
		zmenu_prov=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpadzfuDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipadzfu*/
	interface GIpadzfuDto {
		/**DBCOLUMN:ipadzfu.ixs_nas*/
		ixs_nas?: string|null;
		/**fáze, se kterou je panel spojen*/
		faze?: string|null;
		/**DBCOLUMN:ipadzfu.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ipadzfu.zona*/
		zona?: number|null;
		/**DBCOLUMN:ipadzfu.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:ipadzfu.webpart*/
		webpart?: number|null;
		/**DBCOLUMN:ipadzfu.ixs_upo*/
		ixs_upo?: string|null;
		/**DBCOLUMN:ipadzfu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipadzfu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ipadzfu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ipadzfu.usr_obj_start*/
		usr_obj_start?: number|null;
	}
	const enum GIpadzfuDtoNames { ixs_nas = "ixs_nas", faze = "faze", ixs_fun = "ixs_fun", zona = "zona", por_cislo = "por_cislo", webpart = "webpart", ixs_upo = "ixs_upo", aktivita = "aktivita", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", usr_obj_start = "usr_obj_start",}
	const enum GIpadzfuDtoFragments { ixs_nas = "*", faze = "*", ixs_fun = "*", zona = "*", por_cislo = "*", webpart = "*", ixs_upo = "*", aktivita = "*", zmenu_prov = "*", dat_zmena = "*", usr_obj_start = "*",}
	const enum GIpadzfuDtoTypes { ixs_nas = "string", faze = "string", ixs_fun = "string", zona = "number", por_cislo = "number", webpart = "number", ixs_upo = "string", aktivita = "number", zmenu_prov = "string", dat_zmena = "JsonDate", usr_obj_start = "number",}
	const enum GIpadzfuDtoTypeLengths { ixs_fun = 12,}
	const enum GIpadzfuFilter {
		/**id panelu*/
		ixs_nas=0,
		/**id funkce*/
		ixs_fun=1,
		zona=2,
		por_cislo=3,
		ixs_upo=4,
		aktivita=5,
		faze=6,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpasnasDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipasnas*/
	interface GIpasnasDto {
		/**DBCOLUMN:ipasnas.ixs_nas*/
		ixs_nas?: string|null;
		/**DBCOLUMN:ipasnas.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ipasnas.typ_nas*/
		typ_nas?: number|null;
		/**DBCOLUMN:ipasnas.typ_konf_nas*/
		typ_konf_nas?: number|null;
		/**DBCOLUMN:ipasnas.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ipasnas.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipasnas.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Autor posledni zmeny*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:ipasnas.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ipasnas.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		nazev_rf?: string|null;
		/**DBCOLUMN:ipasnas.layout_zon*/
		layout_zon?: number|null;
		/**json*/
		obsah_json?: JsonBlob|null;
		faze?: string|null;
	}
	const enum GIpasnasDtoNames { ixs_nas = "ixs_nas", nazev = "nazev", typ_nas = "typ_nas", typ_konf_nas = "typ_konf_nas", poznamka = "poznamka", aktivita = "aktivita", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", dat_zmena = "dat_zmena", ixs_fun_akt = "ixs_fun_akt", nazev_rf = "nazev_rf", layout_zon = "layout_zon", obsah_json = "obsah_json", faze = "faze",}
	const enum GIpasnasDtoFragments { ixs_nas = "*", nazev = "*", typ_nas = "*", typ_konf_nas = "*", poznamka = "*", aktivita = "*", zmenu_prov = "*", zmenu_prov_txt = "*", dat_zmena = "*", ixs_fun_akt = "*", nazev_rf = "*", layout_zon = "*", obsah_json = "*", faze = "*",}
	const enum GIpasnasDtoTypes { ixs_nas = "string", nazev = "string", typ_nas = "number", typ_konf_nas = "number", poznamka = "string", aktivita = "number", zmenu_prov = "string", zmenu_prov_txt = "string", dat_zmena = "JsonDate", ixs_fun_akt = "string", nazev_rf = "string", layout_zon = "number", obsah_json = "JsonBlob", faze = "string",}
	const enum GIpasnasDtoTypeLengths { ixs_nas = 12, nazev = 50, poznamka = 254, zmenu_prov = 12, ixs_fun_akt = 12, faze = 8,}
	/**filtry panelu*/
	const enum GIpasnasFilter {
		/**id panelu*/
		ixs_nas=0,
		aktivita=1,
		nazev=2,
		ixs_fun_akt=3,
		faze=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpaspohDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipaspoh*/
	interface GIpaspohDto {
		ixs_upa?: string|null;
		ixs_upo?: string|null;
		/**DBCOLUMN:ipaspoh.ixs_poh*/
		ixs_poh?: string|null;
		/**DBCOLUMN:ipaspoh.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ipaspoh.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ipaspoh.typ_prist_poh*/
		typ_prist_poh?: number|null;
		/**DBCOLUMN:ipaspoh.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ipaspoh.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipaspoh.zmenu_prov*/
		zmenu_prov?: string|null;
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:ipaspoh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ipaspoh.typ_pohled*/
		typ_pohled?: number|null;
		typ_vystup?: number|null;
		/**DBCOLUMN:ipadpoh.obsah_json*/
		obsah_json?: JsonBlob|null;
		/**Prehled pouziti (je-li pozadovano)*/
		usage_count?: number|null;
	}
	const enum GIpaspohDtoNames { ixs_upa = "ixs_upa", ixs_upo = "ixs_upo", ixs_poh = "ixs_poh", nazev = "nazev", typ_ag = "typ_ag", typ_prist_poh = "typ_prist_poh", poznamka = "poznamka", aktivita = "aktivita", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", dat_zmena = "dat_zmena", typ_pohled = "typ_pohled", typ_vystup = "typ_vystup", obsah_json = "obsah_json", usage_count = "usage_count",}
	const enum GIpaspohDtoFragments { ixs_upa = "*", ixs_upo = "*", ixs_poh = "*", nazev = "*", typ_ag = "*", typ_prist_poh = "*", poznamka = "*", aktivita = "*", zmenu_prov = "*", zmenu_prov_txt = "*", dat_zmena = "*", typ_pohled = "*", typ_vystup = "*", obsah_json = "*", usage_count = "*",}
	const enum GIpaspohDtoTypes { ixs_upa = "string", ixs_upo = "string", ixs_poh = "string", nazev = "string", typ_ag = "number", typ_prist_poh = "number", poznamka = "string", aktivita = "number", zmenu_prov = "string", zmenu_prov_txt = "string", dat_zmena = "JsonDate", typ_pohled = "number", typ_vystup = "number", obsah_json = "JsonBlob", usage_count = "number",}
	const enum GIpaspohDtoTypeLengths { ixs_upa = 12, ixs_upo = 12, ixs_poh = 12, nazev = 100, poznamka = 254, zmenu_prov = 12,}
	const enum GIpaspohDtoFilter {
		/**identifikátor šablony pohledu*/
		ixs_poh=0,
		/**klíč*/
		ixs_upa=1,
		ixs_upo=2,
		aktivita=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpasupaDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipasupa*/
	interface GIpasupaDto {
		/**DBCOLUMN:ipasupa.ixs_upa*/
		ixs_upa?: string|null;
		/**DBCOLUMN:ipasupa.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ipasupa.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ipasupa.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipasupa.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ipasupa.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GIpasupaDtoNames { ixs_upa = "ixs_upa", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena",}
	const enum GIpasupaDtoFragments { ixs_upa = "*", nazev = "*", poznamka = "*", aktivita = "*", zmenu_prov = "*", dat_zmena = "*",}
	const enum GIpasupaDtoTypes { ixs_upa = "string", nazev = "string", poznamka = "string", aktivita = "number", zmenu_prov = "string", dat_zmena = "JsonDate",}
	const enum GIpasupaDtoFilter {
		ixs_upa=0,
		nazev=1,
		aktivita=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpasupoDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipasupo*/
	interface GIpasupoDto {
		/**DBCOLUMN:ipasupo.ixs_upo*/
		ixs_upo?: string|null;
		/**DBCOLUMN:ipasupo.ixs_upa*/
		ixs_upa?: string|null;
		/**DBCOLUMN:ipasupo.ixs_poh*/
		ixs_poh?: string|null;
		/**DBCOLUMN:ipasupo.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ipasupo.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ipasupo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipasupo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ipasupo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ipasupo.typ_vystup*/
		typ_vystup?: Gordic.Gin.Interface.GDashboardSqlTypVystupu|null;
		/**obsah pohledu*/
		obsah_json?: JsonBlob|null;
	}
	const enum GIpasupoDtoNames { ixs_upo = "ixs_upo", ixs_upa = "ixs_upa", ixs_poh = "ixs_poh", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", typ_vystup = "typ_vystup", obsah_json = "obsah_json",}
	const enum GIpasupoDtoFragments { ixs_upo = "*", ixs_upa = "*", ixs_poh = "*", nazev = "*", poznamka = "*", aktivita = "*", zmenu_prov = "*", dat_zmena = "*", typ_vystup = "*", obsah_json = "*",}
	const enum GIpasupoDtoTypes { ixs_upo = "string", ixs_upa = "string", ixs_poh = "string", nazev = "string", poznamka = "string", aktivita = "number", zmenu_prov = "string", dat_zmena = "JsonDate", typ_vystup = "Gordic.Gin.Interface.GDashboardSqlTypVystupu", obsah_json = "JsonBlob",}
	const enum GIpasupoDtoTypeLengths { ixs_upo = 12, ixs_upa = 12, ixs_poh = 12, nazev = 100, poznamka = 254, zmenu_prov = 12,}
	const enum GIpasupoDtoFilter {
		ixs_nas=0,
		ixs_upo=1,
		ixs_upa=2,
		webpart=3,
		aktivita=4,
		ixs_poh=5,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\Sql\GIpavfnaDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ipavfna*/
	interface GIpavfnaDto {
		/**DBCOLUMN:ipavfna.ixs_nas*/
		ixs_nas?: string|null;
		/**DBCOLUMN:ipavfna.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ipavfna.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ipavfna.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ipavfna.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ipavfna.faze*/
		faze?: string|null;
	}
	const enum GIpavfnaDtoNames { ixs_nas = "ixs_nas", ixs_fun = "ixs_fun", aktivita = "aktivita", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", faze = "faze",}
	const enum GIpavfnaDtoFragments { ixs_nas = "*", ixs_fun = "*", aktivita = "*", zmenu_prov = "*", dat_zmena = "*", faze = "*",}
	const enum GIpavfnaDtoTypes { ixs_nas = "string", ixs_fun = "string", aktivita = "number", zmenu_prov = "string", dat_zmena = "JsonDate", faze = "string",}
	const enum GIpavfnaFilter {
		/**id panelu*/
		ixs_nas=0,
		aktivita=1,
		ixs_fun=3,
		faze=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardAppInfoDto.d.ts 

declare namespace Gordic.Gin.Interface {
	interface GDashboardAppInfoDto {
		/**Název referenta*/
		nazevRef?: string|null;
		nazevFun?: string|null;
		zastup?: string|null;		
		datLogin?: string|null;
	}
	const enum GDashboardAppInfoDtoNames { nazevRef = "nazevRef", nazevFun = "nazevFun", zastup = "zastup", datLogin = "datLogin",}
	const enum GDashboardAppInfoDtoFragments { nazevRef = "*", nazevFun = "*", zastup = "*", datLogin = "*",}
	const enum GDashboardAppInfoDtoTypes { nazevRef = "string", nazevFun = "string", zastup = "string", datLogin = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardDataColumnDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**
	*     Definice datového sloupce (pro volání ISLu)
	*     
	*/
	interface GDashboardDataColumnDto {
		ipaDataType?: string|null;
		dataType?: string|null;
		name?: string|null;
		caption?: string|null;
		visible?: boolean|null;
		attributes?: ObjectLiteral<string>|null;
	}
	const enum GDashboardDataColumnDtoNames { ipaDataType = "ipaDataType", dataType = "dataType", name = "name", caption = "caption", visible = "visible", attributes = "attributes",}
	const enum GDashboardDataColumnDtoFragments { ipaDataType = "*", dataType = "*", name = "*", caption = "*", visible = "*", attributes = "*",}
	const enum GDashboardDataColumnDtoTypes { ipaDataType = "string", dataType = "string", name = "string", caption = "string", visible = "boolean", attributes = "ObjectLiteral<string>",}
	const enum GDashboardDataColumnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardImportExportDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO sloužící pro export a import šablon*/
	interface GDashboardViewTemplateImportExportDto {
		items?: Gordic.Gin.Interface.GDashboardViewTemplateDto[]|null;
		/**stream souboru (vrací zazipovaný)*/
		file?: number[]|null;
		/**vstupní json pro export*/
		json?: string|null;
		/**guid pro upload zipovaného souboru*/
		fileGuid?: string|null;
		/**file info pro vracející se ZIP z exportu*/
		fileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
	}
	const enum GDashboardViewTemplateImportExportDtoNames { items = "items", file = "file", json = "json", fileGuid = "fileGuid", fileInfo = "fileInfo",}
	const enum GDashboardViewTemplateImportExportDtoFragments { items = "*", file = "*", json = "*", fileGuid = "*", fileInfo = "*",}
	const enum GDashboardViewTemplateImportExportDtoTypes { items = "Gordic.Gin.Interface.GDashboardViewTemplateDto[]", file = "number[]", json = "string", fileGuid = "string", fileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardIslObjectMeta.d.ts 

declare namespace Gordic.Gin.Interface {
	interface GDashboardIslObjectMetaDto {
		/**Nazev sluzby*/
		serviceName?: string|null;
		/**Nazev metody*/
		methodName?: string|null;
		/**serializované DTO volané metody*/
		dataColumns?: Gordic.Gin.Interface.GDashboardDataColumnDto[]|null;
		interfaceType?: string|null;
	}
	const enum GDashboardIslObjectMetaDtoNames { serviceName = "serviceName", methodName = "methodName", dataColumns = "dataColumns", interfaceType = "interfaceType",}
	const enum GDashboardIslObjectMetaDtoFragments { serviceName = "*", methodName = "*", dataColumns = "*", interfaceType = "*",}
	const enum GDashboardIslObjectMetaDtoTypes { serviceName = "string", methodName = "string", dataColumns = "Gordic.Gin.Interface.GDashboardDataColumnDto[]", interfaceType = "string",}
	const enum GDashboardIslObjectMetaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardJsonFileDto.d.ts 

declare namespace Gordic.Gin.Interface {
	interface GDashboardJsonFileDto {
		/**objekt z obsahu JSON souboru*/
		jsonObject?: object|null;
		/**název souboru*/
		fileName?: string|null;
		/**guid z upload políčka*/
		fileGuid?: string|null;
	}
	const enum GDashboardJsonFileDtoNames { jsonObject = "jsonObject", fileName = "fileName", fileGuid = "fileGuid",}
	const enum GDashboardJsonFileDtoFragments { jsonObject = "*", fileName = "*", fileGuid = "*",}
	const enum GDashboardJsonFileDtoTypes { jsonObject = "object", fileName = "string", fileGuid = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardMoveDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro přesun pohledů mezi zónami*/
	interface GDashboardMoveDto {
		/**fáze*/
		phase?: string|null;
		/**funkcni misto*/
		ixsFun?: string|null;
		/**id panelu*/
		panelId?: string|null;
		/**Zony*/
		zones?: Gordic.Gin.Interface.GDashboardMoveZoneSettingsDto[]|null;
	}
	const enum GDashboardMoveDtoNames { phase = "phase", ixsFun = "ixsFun", panelId = "panelId", zones = "zones",}
	const enum GDashboardMoveDtoFragments { phase = "*", ixsFun = "*", panelId = "*", zones = "*",}
	const enum GDashboardMoveDtoTypes { phase = "string", ixsFun = "string", panelId = "string", zones = "Gordic.Gin.Interface.GDashboardMoveZoneSettingsDto[]",}
	const enum GDashboardMoveDtoTypeLengths {}
	/**Nastaveni zony*/
	interface GDashboardMoveZoneSettingsDto {
		/**id*/
		zoneId?: number|null;
		/**pohledy*/
		views?: Gordic.Gin.Interface.GDashboardMoveViewSettingsDto[]|null;
	}
	const enum GDashboardMoveZoneSettingsDtoNames { zoneId = "zoneId", views = "views",}
	const enum GDashboardMoveZoneSettingsDtoFragments { zoneId = "*", views = "*",}
	const enum GDashboardMoveZoneSettingsDtoTypes { zoneId = "number", views = "Gordic.Gin.Interface.GDashboardMoveViewSettingsDto[]",}
	const enum GDashboardMoveZoneSettingsDtoTypeLengths {}
	interface GDashboardMoveViewSettingsDto {
		/**viewId*/
		viewId?: string|null;
		/**Por cislo puvodni pozici*/
		porCislo?: number|null;
		/**porCislo*/
		ixsFun?: string|null;
		/**ZoneId*/
		zoneId?: number|null;
		/**PanelId*/
		panelId?: string|null;
	}
	const enum GDashboardMoveViewSettingsDtoNames { viewId = "viewId", porCislo = "porCislo", ixsFun = "ixsFun", zoneId = "zoneId", panelId = "panelId",}
	const enum GDashboardMoveViewSettingsDtoFragments { viewId = "*", porCislo = "*", ixsFun = "*", zoneId = "*", panelId = "*",}
	const enum GDashboardMoveViewSettingsDtoTypes { viewId = "string", porCislo = "number", ixsFun = "string", zoneId = "number", panelId = "string",}
	const enum GDashboardMoveViewSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardPanelDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro uložení konfigurace ISL metod*/
	interface GDashboardPanelDto {
		/**id pohledu*/
		panelId?: string|null;
		/**fáze, se kterými je panel spojen*/
		phase?: string|null;
		/**název ISL metody*/
		name?: string|null;
		/**popis panelu*/
		description?: string|null;
		/**url na panel (pro otevírání z administrace)*/
		url?: string|null;
		/**aktivita pohledu*/
		activity?: number|null;
		/**datum změny*/
		modified?: JsonDate|null;
		/**změněno kým (ixs_zmp)*/
		modifiedBy?: string|null;
		/**textové jméno změněno kým*/
		modifiedByTxt?: string|null;
		/**ixs fun*/
		ixsFun?: string|null;
		/**nazev_fun*/
		nazev_rf?: string|null;
		isPublic?: boolean|null;
		isAdmin?: boolean|null;
		isOwner?: boolean|null;
		zonesCount?: number|null;
		settingsJson?: string|null;
		zones?: Gordic.Gin.Interface.GDashboardZoneDto[]|null;
		/**seznam funkčních míst, se kterými je panel sdílen*/
		sharedWith?: string[]|null;
	}
	const enum GDashboardPanelDtoNames { panelId = "panelId", phase = "phase", name = "name", description = "description", url = "url", activity = "activity", modified = "modified", modifiedBy = "modifiedBy", modifiedByTxt = "modifiedByTxt", ixsFun = "ixsFun", nazev_rf = "nazev_rf", isPublic = "isPublic", isAdmin = "isAdmin", isOwner = "isOwner", zonesCount = "zonesCount", settingsJson = "settingsJson", zones = "zones", sharedWith = "sharedWith",}
	const enum GDashboardPanelDtoFragments { panelId = "*", phase = "*", name = "*", description = "*", url = "*", activity = "*", modified = "*", modifiedBy = "*", modifiedByTxt = "*", ixsFun = "*", nazev_rf = "*", isPublic = "*", isAdmin = "*", isOwner = "*", zonesCount = "*", settingsJson = "*", zones = "*", sharedWith = "*",}
	const enum GDashboardPanelDtoTypes { panelId = "string", phase = "string", name = "string", description = "string", url = "string", activity = "number", modified = "JsonDate", modifiedBy = "string", modifiedByTxt = "string", ixsFun = "string", nazev_rf = "string", isPublic = "boolean", isAdmin = "boolean", isOwner = "boolean", zonesCount = "number", settingsJson = "string", zones = "Gordic.Gin.Interface.GDashboardZoneDto[]", sharedWith = "string[]",}
	const enum GDashboardPanelDtoTypeLengths {}
	/**DTO pro hodnotu parametru přístupu*/
	interface GDashboardAccessDTO {
		/**hodnota parametru IPA_RP_USRPANEL*/
		value?: number|null;
	}
	const enum GDashboardAccessDTONames { value = "value",}
	const enum GDashboardAccessDTOFragments { value = "*",}
	const enum GDashboardAccessDTOTypes { value = "number",}
	const enum GDashboardAccessDTOTypeLengths {}
	const enum GDashboardAccessEnum {
		/**Nelze manipulovat s panely*/
		ReaderOnly=0,
		/**Povoleno zalozit soukromy panel*/
		Editor=1,
		/**Spravce panelu*/
		Admin=100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardRestDto.d.ts 

declare namespace Gordic.Gin.Interface {
	interface GDashboardRestDto {
		/**objekt z obsahu JSON souboru*/
		jsonObject?: object|null;
		/**url služby*/
		url?: string|null;
		/**sekce dat*/
		section?: string|null;
	}
	const enum GDashboardRestDtoNames { jsonObject = "jsonObject", url = "url", section = "section",}
	const enum GDashboardRestDtoFragments { jsonObject = "*", url = "*", section = "*",}
	const enum GDashboardRestDtoTypes { jsonObject = "object", url = "string", section = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardRssDto - Copy.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO odpovídající RSS 2.0*/
	interface GDashboardSsrsDto {
		/**URL RSS kanálu*/
		url?: string|null;
		/**vrácený JSON*/
		jsonObject?: object|null;
	}
	const enum GDashboardSsrsDtoNames { url = "url", jsonObject = "jsonObject",}
	const enum GDashboardSsrsDtoFragments { url = "*", jsonObject = "*",}
	const enum GDashboardSsrsDtoTypes { url = "string", jsonObject = "object",}
	const enum GDashboardSsrsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardRssDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO odpovídající RSS 2.0*/
	interface GDashboardRssDto {
		/**URL RSS kanálu*/
		url?: string|null;
		/**JSON RSS kanálu*/
		json?: string|null;
		/**titulek RSS zprávy*/
		title?: string|null;
		/**kategorie*/
		category?: string|null;
		/**link RSS zprávy*/
		link?: string|null;
		/**description RSS zprávy*/
		description?: string|null;
		/**datum zveřejnění RSS zprávy*/
		pubDate?: JsonDate|null;
		/**datum úpravy RSS zprávy*/
		lastBuildDate?: JsonDate|null;
		date?: JsonDate|null;
		mesto?: string|null;
		img?: Gordic.Gin.Interface.RssImage|null;
	}
	const enum GDashboardRssDtoNames { url = "url", json = "json", title = "title", category = "category", link = "link", description = "description", pubDate = "pubDate", lastBuildDate = "lastBuildDate", date = "date", mesto = "mesto", img = "img",}
	const enum GDashboardRssDtoFragments { url = "*", json = "*", title = "*", category = "*", link = "*", description = "*", pubDate = "*", lastBuildDate = "*", date = "*", mesto = "*", img = "*",}
	const enum GDashboardRssDtoTypes { url = "string", json = "string", title = "string", category = "string", link = "string", description = "string", pubDate = "JsonDate", lastBuildDate = "JsonDate", date = "JsonDate", mesto = "string", img = "Gordic.Gin.Interface.RssImage",}
	const enum GDashboardRssDtoTypeLengths {}
	interface RssImage {
		type?: string|null;
		url?: string|null;
	}
	const enum RssImageNames { type = "type", url = "url",}
	const enum RssImageFragments { type = "*", url = "*",}
	const enum RssImageTypes { type = "string", url = "string",}
	const enum RssImageTypeLengths {}
	/**Inicializace providera*/
	interface GDashboardRssProviderConfigDto {
		/**Faze*/
		faze?: string|null;
		/**Lic*/
		license?: string|null;
	}
	const enum GDashboardRssProviderConfigDtoNames { faze = "faze", license = "license",}
	const enum GDashboardRssProviderConfigDtoFragments { faze = "*", license = "*",}
	const enum GDashboardRssProviderConfigDtoTypes { faze = "string", license = "string",}
	const enum GDashboardRssProviderConfigDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardSharedPanelDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**sdílený panel*/
	interface GDashboardSharedPanelDto {
		/**id panelu*/
		panelId?: string|null;
		/**funkční místo*/
		ixsFun?: string|null;
		/**aktivita*/
		active?: boolean|null;
		/**upraveno*/
		modified?: JsonDate|null;
		/**upraveno kým*/
		modifiedBy?: string|null;
		/**fáze*/
		phase?: string|null;
	}
	const enum GDashboardSharedPanelDtoNames { panelId = "panelId", ixsFun = "ixsFun", active = "active", modified = "modified", modifiedBy = "modifiedBy", phase = "phase",}
	const enum GDashboardSharedPanelDtoFragments { panelId = "*", ixsFun = "*", active = "*", modified = "*", modifiedBy = "*", phase = "*",}
	const enum GDashboardSharedPanelDtoTypes { panelId = "string", ixsFun = "string", active = "boolean", modified = "JsonDate", modifiedBy = "string", phase = "string",}
	const enum GDashboardSharedPanelFilter {
		/**id panelu*/
		panelId=0,
		/**aktivita panelu*/
		active=1,
		/**id funkce*/
		ixsFun=2,
		phase=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardsSqlDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Metadata pohledu*/
	interface GDashboardSqlMetaDto {
		/**definice datových sloupců*/
		columns?: Gordic.Gin.Interface.GDashboardDataColumnDto[]|null;
		/**parametry sql příkazu*/
		params?: Gordic.Gin.Interface.GDashboardViewParamDto[]|null;
		/**Graf*/
		chart?: Gordic.Gin.Interface.GSqlChartDto|null;
		/**Pohled*/
		view?: Gordic.Gin.Interface.GDashboardViewDto|null;
		/**Akce (drillovani, apod.)*/
		actions?: Gordic.Gin.Interface.GDashboardViewAction[]|null;
	}
	const enum GDashboardSqlMetaDtoNames { columns = "columns", params = "params", chart = "chart", view = "view", actions = "actions",}
	const enum GDashboardSqlMetaDtoFragments { columns = "*", params = "*", chart = "*", view = "*", actions = "*",}
	const enum GDashboardSqlMetaDtoTypes { columns = "Gordic.Gin.Interface.GDashboardDataColumnDto[]", params = "Gordic.Gin.Interface.GDashboardViewParamDto[]", chart = "Gordic.Gin.Interface.GSqlChartDto", view = "Gordic.Gin.Interface.GDashboardViewDto", actions = "Gordic.Gin.Interface.GDashboardViewAction[]",}
	const enum GDashboardSqlMetaDtoTypeLengths {}
	interface GSqlParamDto {
		name?: string|null;
		value?: object|null;
		type?: string|null;
	}
	const enum GSqlParamDtoNames { name = "name", value = "value", type = "type",}
	const enum GSqlParamDtoFragments { name = "*", value = "*", type = "*",}
	const enum GSqlParamDtoTypes { name = "string", value = "object", type = "string",}
	const enum GSqlParamDtoTypeLengths {}
	/**Graf*/
	interface GSqlChartDto {
		/**Typ*/
		type?: string|null;
		/**3D?*/
		show3d?: boolean|null;
		/**Zobrazit legendu?*/
		showLegend?: boolean|null;
		/**Zobrazit hodnoty*/
		showValues?: boolean|null;
		/**Zobrazit popisky*/
		showTitles?: boolean|null;
	}
	const enum GSqlChartDtoNames { type = "type", show3d = "show3d", showLegend = "showLegend", showValues = "showValues", showTitles = "showTitles",}
	const enum GSqlChartDtoFragments { type = "*", show3d = "*", showLegend = "*", showValues = "*", showTitles = "*",}
	const enum GSqlChartDtoTypes { type = "string", show3d = "boolean", showLegend = "boolean", showValues = "boolean", showTitles = "boolean",}
	const enum GSqlChartDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardTaskDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro uložení konfigurace ISL metod*/
	interface GDashboardTaskDto {
		/**id úlohy*/
		taskId?: string|null;
		/**název úlohy*/
		name?: string|null;
		/**popis úlohy*/
		description?: string|null;
		/**aktivita úlohy*/
		activity?: number|null;
		/**datum úlohy*/
		modified?: JsonDate|null;
		/**změněno kým (ixs_zmp)*/
		modifiedBy?: string|null;
		/**textové jméno změněno kým*/
		modifiedByTxt?: string|null;
		viewTemplates?: Gordic.Gin.Interface.GDashboardViewTemplateDto[]|null;
	}
	const enum GDashboardTaskDtoNames { taskId = "taskId", name = "name", description = "description", activity = "activity", modified = "modified", modifiedBy = "modifiedBy", modifiedByTxt = "modifiedByTxt", viewTemplates = "viewTemplates",}
	const enum GDashboardTaskDtoFragments { taskId = "*", name = "*", description = "*", activity = "*", modified = "*", modifiedBy = "*", modifiedByTxt = "*", viewTemplates = "*",}
	const enum GDashboardTaskDtoTypes { taskId = "string", name = "string", description = "string", activity = "number", modified = "JsonDate", modifiedBy = "string", modifiedByTxt = "string", viewTemplates = "Gordic.Gin.Interface.GDashboardViewTemplateDto[]",}
	const enum GDashboardTaskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardViewDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pohledu (nemusi byt nutne umisten na nejakem dashboardu)*/
	interface GDashboardViewDto {
		/**id pohledu (ixs_upo)*/
		viewId?: string|null;
		/**PorCislo pohledu umisteneho v zone nejakeho dashboardu (pokud je)*/
		porCislo?: number|null;
		/**ID zony (pokud je umisten v zone nejakeho dashboardu)*/
		zoneId?: number|null;
		/**ID panelu (dashboardu), pokud je dashboard v nejakem konkretnim umisten.*/
		panelId?: string|null;
		/**ID ulohy (ixs_upa)*/
		taskId?: string|null;
		/**Faze (potřebuju kvůli zakládání zóny)*/
		phase?: string|null;
		/**id šablony (ixs_poh)*/
		templateId?: string|null;
		/**Poskytovatel dat*/
		provider?: string|null;
		/**Nazev pohledu*/
		name?: string|null;
		/**funkční místo*/
		ixsFun?: string|null;
		/**popis pohledu*/
		description?: string|null;
		/**aktivita pohledu*/
		activity?: number|null;
		/**datum změny*/
		modified?: JsonDate|null;
		/**změněno kým (ixs_zmp)*/
		modifiedBy?: string|null;
		/**textové jméno změněno kým*/
		modifiedByTxt?: string|null;
		/**grid|table|panel|chart*/
		widgetType?: string|null;
		/**Definice datovych sloupcu*/
		columns?: Gordic.Gin.Interface.GDashboardDataColumnDto[]|null;
		/**Graf*/
		chart?: Gordic.Gin.Interface.GSqlChartDto|null;
		/**Sablona pohledu? (vizualizace??)*/
		itemTemplate?: string|null;
		/**parametry ISL pohledu (asi se nepouziva???)*/
		filters?: Gordic.Gin.Interface.GDashboardViewDataFilter[]|null;
		/**Nastaveni JSON sablony.*/
		dataSourceSettingsJson?: string|null;
		/**Nastaveni JSON pohledu v uloze.*/
		viewInTaskSettingsJson?: string|null;
		/**Nastaveni JSON pohledu umisteneho v zone na dashboardu.*/
		viewInZoneSettingsJson?: string|null;
		/**Akce (drillovani, apod.)*/
		actions?: Gordic.Gin.Interface.GDashboardViewAction[]|null;
		/**parametry sql příkazu (uzivatelske)*/
		params?: Gordic.Gin.Interface.GDashboardViewParamDto[]|null;
		/**vrácená data*/
		data?: object[]|null;
	}
	const enum GDashboardViewDtoNames { viewId = "viewId", porCislo = "porCislo", zoneId = "zoneId", panelId = "panelId", taskId = "taskId", phase = "phase", templateId = "templateId", provider = "provider", name = "name", ixsFun = "ixsFun", description = "description", activity = "activity", modified = "modified", modifiedBy = "modifiedBy", modifiedByTxt = "modifiedByTxt", widgetType = "widgetType", columns = "columns", chart = "chart", itemTemplate = "itemTemplate", filters = "filters", dataSourceSettingsJson = "dataSourceSettingsJson", viewInTaskSettingsJson = "viewInTaskSettingsJson", viewInZoneSettingsJson = "viewInZoneSettingsJson", actions = "actions", params = "params", data = "data",}
	const enum GDashboardViewDtoFragments { viewId = "*", porCislo = "*", zoneId = "*", panelId = "*", taskId = "*", phase = "*", templateId = "*", provider = "*", name = "*", ixsFun = "*", description = "*", activity = "*", modified = "*", modifiedBy = "*", modifiedByTxt = "*", widgetType = "*", columns = "*", chart = "*", itemTemplate = "*", filters = "*", dataSourceSettingsJson = "*", viewInTaskSettingsJson = "*", viewInZoneSettingsJson = "*", actions = "*", params = "*", data = "*",}
	const enum GDashboardViewDtoTypes { viewId = "string", porCislo = "number", zoneId = "number", panelId = "string", taskId = "string", phase = "string", templateId = "string", provider = "string", name = "string", ixsFun = "string", description = "string", activity = "number", modified = "JsonDate", modifiedBy = "string", modifiedByTxt = "string", widgetType = "string", columns = "Gordic.Gin.Interface.GDashboardDataColumnDto[]", chart = "Gordic.Gin.Interface.GSqlChartDto", itemTemplate = "string", filters = "Gordic.Gin.Interface.GDashboardViewDataFilter[]", dataSourceSettingsJson = "string", viewInTaskSettingsJson = "string", viewInZoneSettingsJson = "string", actions = "Gordic.Gin.Interface.GDashboardViewAction[]", params = "Gordic.Gin.Interface.GDashboardViewParamDto[]", data = "object[]",}
	const enum GDashboardViewDtoTypeLengths {}
	/**DTO parametru SQL pohledu*/
	interface GDashboardViewParamDto {
		/**Nazev*/
		name?: string|null;
		/**Uzivatelsky citelny popisek*/
		title?: string|null;
		/**Hodnota*/
		value?: string|number|boolean|null;
		/**Zobrazovana hodnota misto value (hodi se napr. na enumy)*/
		displayValue?: string|null;
		/**Datovy typ*/
		dataType?: string|null;
		/**Aktivni?*/
		active?: boolean|null;
		/**Povolena editace uzivatelem?*/
		userEditAllowed?: boolean|null;
		/**Minimalni delka*/
		userEditMinLength?: number|null;
		/**Skupina priznaku*/
		flags?: string[]|null;
		/**Popis*/
		description?: string|null;
		/**Format*/
		format?: string|null;
		/**Typ IPA*/
		ipaDataType?: string|null;
		/**Nazev skupiny enumu (uzivatelsky vybratelnych hodnot)*/
		enumName?: string|null;
		/**Hodnoty enumu*/
		enumValues?: Gordic.Gin.Interface.GDashboardEnumDto[]|null;
	}
	const enum GDashboardViewParamDtoNames { name = "name", title = "title", value = "value", displayValue = "displayValue", dataType = "dataType", active = "active", userEditAllowed = "userEditAllowed", userEditMinLength = "userEditMinLength", flags = "flags", description = "description", format = "format", ipaDataType = "ipaDataType", enumName = "enumName", enumValues = "enumValues",}
	const enum GDashboardViewParamDtoFragments { name = "*", title = "*", value = "*", displayValue = "*", dataType = "*", active = "*", userEditAllowed = "*", userEditMinLength = "*", flags = "*", description = "*", format = "*", ipaDataType = "*", enumName = "*", enumValues = "*",}
	const enum GDashboardViewParamDtoTypes { name = "string", title = "string", value = "string|number|boolean", displayValue = "string", dataType = "string", active = "boolean", userEditAllowed = "boolean", userEditMinLength = "number", flags = "string[]", description = "string", format = "string", ipaDataType = "string", enumName = "string", enumValues = "Gordic.Gin.Interface.GDashboardEnumDto[]",}
	const enum GDashboardViewParamDtoTypeLengths {}
	/**DTO filtru (toto se asi nepouziva, zrusime???)*/
	interface GDashboardViewDataFilter {
		/**OperatorCaption*/
		operatorCaption?: string|null;
		/**dataOperator*/
		dataOperator?: string|null;
		/**column*/
		column?: string|null;
		/**dataType*/
		dataType?: string|null;
		/**title*/
		title?: string|null;
	}
	const enum GDashboardViewDataFilterNames { operatorCaption = "operatorCaption", dataOperator = "dataOperator", column = "column", dataType = "dataType", title = "title",}
	const enum GDashboardViewDataFilterFragments { operatorCaption = "*", dataOperator = "*", column = "*", dataType = "*", title = "*",}
	const enum GDashboardViewDataFilterTypes { operatorCaption = "string", dataOperator = "string", column = "string", dataType = "string", title = "string",}
	const enum GDashboardViewDataFilterTypeLengths {}
	/**Uzivatelsky definovana hodnota*/
	interface GDashboardEnumDto {
		value?: string|null;
		text?: string|null;
	}
	const enum GDashboardEnumDtoNames { value = "value", text = "text",}
	const enum GDashboardEnumDtoFragments { value = "*", text = "*",}
	const enum GDashboardEnumDtoTypes { value = "string", text = "string",}
	const enum GDashboardEnumDtoTypeLengths {}
	/**Akce*/
	interface GDashboardViewAction {
		/**Typ (zde bude asi jen drill)*/
		type?: 'drill'|null;
		/**Ixs navazujici pohledu*/
		ixs?: string|null;
		/**Url*/
		url?: string|null;
		/**Popisek*/
		caption?: string|null;
		/**Cislo polozky*/
		cisloPol?: number|null;
		/**Nazev parametru z DTO ze vstupniho pohledu*/
		sourceParamName?: string|null;
		/**Nazev parametru pro vystupni pohled*/
		targetParamName?: string|null;
	}
	const enum GDashboardViewActionNames { type = "type", ixs = "ixs", url = "url", caption = "caption", cisloPol = "cisloPol", sourceParamName = "sourceParamName", targetParamName = "targetParamName",}
	const enum GDashboardViewActionFragments { type = "*", ixs = "*", url = "*", caption = "*", cisloPol = "*", sourceParamName = "*", targetParamName = "*",}
	const enum GDashboardViewActionTypes { type = "'drill'", ixs = "string", url = "string", caption = "string", cisloPol = "number", sourceParamName = "string", targetParamName = "string",}
	const enum GDashboardViewActionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardViewTemplateDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro uložení konfigurace ISL metod*/
	interface GDashboardViewTemplateDto {
		/**id šablony pohledu*/
		templateId?: string|null;
		/**id úlohy*/
		taskId?: string|null;
		/**id úlohy*/
		ixs_upo?: string|null;
		/**nazev šablony*/
		name?: string|null;
		/**popis šablony*/
		description?: string|null;
		/**aktivita šablony*/
		activity?: number|null;
		/**datum změny*/
		modified?: JsonDate|null;
		/**změněno kým (ixs_zmp)*/
		modifiedBy?: string|null;
		/**textové jméno změněno kým*/
		modifiedByTxt?: string|null;
		/**grid|table|panel|chart*/
		widgetType?: string|null;
		/**název datového providera*/
		provider?: string|null;
		columns?: Gordic.Gin.Interface.GDashboardDataColumnDto[]|null;
		/**parametry ISL pohledu*/
		parameters?: Gordic.Gin.Interface.GDashboardViewTemplateParamDto[]|null;
		/**parametry ISL pohledu*/
		filters?: Gordic.Gin.Interface.GIpaIslViewTemplateFilter[]|null;
		/**Pocet vyskytu pouziti teto sablony*/
		usageCount?: number|null;
		/**ulozena cela konfigurace volani v JSON stringu*/
		settingsJson?: string|null;
	}
	const enum GDashboardViewTemplateDtoNames { templateId = "templateId", taskId = "taskId", ixs_upo = "ixs_upo", name = "name", description = "description", activity = "activity", modified = "modified", modifiedBy = "modifiedBy", modifiedByTxt = "modifiedByTxt", widgetType = "widgetType", provider = "provider", columns = "columns", parameters = "parameters", filters = "filters", usageCount = "usageCount", settingsJson = "settingsJson",}
	const enum GDashboardViewTemplateDtoFragments { templateId = "*", taskId = "*", ixs_upo = "*", name = "*", description = "*", activity = "*", modified = "*", modifiedBy = "*", modifiedByTxt = "*", widgetType = "*", provider = "*", columns = "*", parameters = "*", filters = "*", usageCount = "*", settingsJson = "*",}
	const enum GDashboardViewTemplateDtoTypes { templateId = "string", taskId = "string", ixs_upo = "string", name = "string", description = "string", activity = "number", modified = "JsonDate", modifiedBy = "string", modifiedByTxt = "string", widgetType = "string", provider = "string", columns = "Gordic.Gin.Interface.GDashboardDataColumnDto[]", parameters = "Gordic.Gin.Interface.GDashboardViewTemplateParamDto[]", filters = "Gordic.Gin.Interface.GIpaIslViewTemplateFilter[]", usageCount = "number", settingsJson = "string",}
	const enum GDashboardViewTemplateDtoTypeLengths {}
	/**DTO parametru*/
	interface GDashboardViewTemplateParamDto {
		name?: string|null;
		title?: string|null;
		value?: string|null;
		dataType?: string|null;
		active?: boolean|null;
	}
	const enum GDashboardViewTemplateParamDtoNames { name = "name", title = "title", value = "value", dataType = "dataType", active = "active",}
	const enum GDashboardViewTemplateParamDtoFragments { name = "*", title = "*", value = "*", dataType = "*", active = "*",}
	const enum GDashboardViewTemplateParamDtoTypes { name = "string", title = "string", value = "string", dataType = "string", active = "boolean",}
	const enum GDashboardViewTemplateParamDtoTypeLengths {}
	/**DTO filtru*/
	const enum GIpaIslViewTemplateFilter {
		/**id ulohy, kam patri*/
		taskId=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardXrgConfigDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Objekt pro načtení konfigurace z web.configu*/
	interface GDashboardXrgConfigDto {
		/**jméno uživatele*/
		Login?: string|null;
		/**heslo*/
		Password?: string|null;
		/**zkratka modulu*/
		Module?: string|null;
		/**URL webové služby*/
		Url?: string|null;
		/**fyzická cesta ke složce obsahující XSD webové služby*/
		PhysicalPath?: string|null;
		/**seznam metod, které mají být přístupné z XRG služby*/
		Methods?: string[]|null;
	}
	const enum GDashboardXrgConfigDtoNames { Login = "Login", Password = "Password", Module = "Module", Url = "Url", PhysicalPath = "PhysicalPath", Methods = "Methods",}
	const enum GDashboardXrgConfigDtoFragments { Login = "*", Password = "*", Module = "*", Url = "*", PhysicalPath = "*", Methods = "*",}
	const enum GDashboardXrgConfigDtoTypes { Login = "string", Password = "string", Module = "string", Url = "string", PhysicalPath = "string", Methods = "string[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardXrgMethodDto.d.ts 

declare namespace Gordic.Gin.Interface {
	interface GDashboardXrgMethodDto {
		/**název metody*/
		name?: string|null;
		/**namespace*/
		name_space?: string|null;
		/**Objekt requestu*/
		request?: object|null;
		/**Objekt requestu*/
		response?: object|null;
	}
	const enum GDashboardXrgMethodDtoNames { name = "name", name_space = "name_space", request = "request", response = "response",}
	const enum GDashboardXrgMethodDtoFragments { name = "*", name_space = "*", request = "*", response = "*",}
	const enum GDashboardXrgMethodDtoTypes { name = "string", name_space = "string", request = "object", response = "object",}
	/**filtry XRG*/
	const enum GDashboardXrgFilters {
		name=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\Dto\UI\GDashboardZoneDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro uložení konfigurace ISL metod*/
	interface GDashboardZoneDto {
		/**id pohledu*/
		zoneId?: number|null;
		panelId?: string|null;
		/**název ISL metody*/
		name?: string|null;
		/**titulek pohledu*/
		title?: string|null;
		/**ixs_upo*/
		ixs_upo?: string|null;
		/**por_cislo*/
		porCislo?: number|null;
		/**popis pohledu*/
		description?: string|null;
		/**funkce svázaná se zónou*/
		ixsFun?: string|null;
		/**fáze*/
		phase?: string|null;
		/**aktivita pohledu*/
		active?: boolean|null;
		/**datum změny*/
		modified?: JsonDate|null;
		/**změněno kým (ixs_zmp)*/
		modifiedBy?: string|null;
		/**textové jméno změněno kým*/
		modifiedByTxt?: string|null;
		/**parametry ISL pohledu*/
		views?: Gordic.Gin.Interface.GDashboardViewDto[]|null;
	}
	const enum GDashboardZoneDtoNames { zoneId = "zoneId", panelId = "panelId", name = "name", title = "title", ixs_upo = "ixs_upo", porCislo = "porCislo", description = "description", ixsFun = "ixsFun", phase = "phase", active = "active", modified = "modified", modifiedBy = "modifiedBy", modifiedByTxt = "modifiedByTxt", views = "views",}
	const enum GDashboardZoneDtoFragments { zoneId = "*", panelId = "*", name = "*", title = "*", ixs_upo = "*", porCislo = "*", description = "*", ixsFun = "*", phase = "*", active = "*", modified = "*", modifiedBy = "*", modifiedByTxt = "*", views = "*",}
	const enum GDashboardZoneDtoTypes { zoneId = "number", panelId = "string", name = "string", title = "string", ixs_upo = "string", porCislo = "number", description = "string", ixsFun = "string", phase = "string", active = "boolean", modified = "JsonDate", modifiedBy = "string", modifiedByTxt = "string", views = "Gordic.Gin.Interface.GDashboardViewDto[]",}
	const enum GDashboardZoneDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardJsonFile.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardJsonFile {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardJsonFileDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardJsonFileDto>>;
		/**nahraje JSON soubor na server*/
		uploadFile(rq?:Gordic.Gin.Interface.GDashboardJsonFileDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardJsonFileDto>>;
		/**nahraje ZIP*/
		uploadZipFile(rq?:Gordic.Gin.Interface.GDashboardJsonFileDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardJsonFileDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardJsonFile: ServiceBase & Catalog.DashboardJsonFile;
	}
	const DashboardJsonFile: Client["DashboardJsonFile"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardJsonFileFilter {
		/**file name*/
		fileName=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardPanel.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardPanel {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardPanelDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardPanelDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardPanelDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
		/**vrátí seznam panelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
		/**vytvoří nový panel*/
		create(rq?:Gordic.Gin.Interface.GDashboardPanelDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
		/**aktualizuje panel*/
		update(rq?:Gordic.Gin.Interface.GDashboardPanelDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
		/**Upsertnuti*/
		upsert(rq?:Gordic.Gin.Interface.GDashboardPanelDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
		/**vymaže panely*/
		delete(rq?:Gordic.Gin.Interface.GDashboardPanelDeleteDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDeleteDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardPanelDeleteDto>,void>;
		/**získání hodnoty parametru IPA_RP_USRPANEL*/
		getAccessParamValue(rq?:Gordic.Gin.Interface.GDashboardAccessDTO|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardAccessDTO>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardAccessDTO>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardAccessDTO>>;
		/**získání hodnoty parametru IPA_RP_USRPANEL*/
		getAccess(rq?:CallParams<{}>): _Task<{},Gordic.Gin.Interface.GDashboardAccessEnum>;
		/**získání URL panelu (pro zobrazení panelu z jiné aplikace - URL včetně autorizačního ticketu)*/
		getPanelUrl(rq?:Gordic.Gin.Interface.GDashboardPanelDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardPanelDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardPanelDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
		/**získání informací o uživateli a aplikaci (pro hlavičku nástěnky)*/
		getApplicationInfo(rq?:Gordic.Gin.Interface.GDashboardAppInfoDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardAppInfoDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardAppInfoDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardAppInfoDto>>;
		/**Ziska seznam panelu (dashboardu), kde se vyskytuje dany pohled - podle viewId (ixs_upo)*/
		getPanelsByViewId(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceListResponse<Gordic.Gin.Interface.GDashboardPanelDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardPanel: ServiceBase & Catalog.DashboardPanel;
	}
	const DashboardPanel: Client["DashboardPanel"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardPanelFilter {
		/**id panelu*/
		panelId=0,
		/**aktivita panelu (NOTE (BM): Tento nahradit 'aktivita'*/
		active=1,
		/**id funkce*/
		ixsFun=2,
		phase=3,
		/**Aktivita*/
		aktivita=4,
		/**Sdileny*/
		shared=5,
	}
	/**Dto k promazani panelu*/
	interface GDashboardPanelDeleteDto {
		/**ID panelu k odstraneni*/
		panelIds?: string[]|null;
	}
	const enum GDashboardPanelDeleteDtoNames { panelIds = "panelIds",}
	const enum GDashboardPanelDeleteDtoFragments { panelIds = "*",}
	const enum GDashboardPanelDeleteDtoTypes { panelIds = "string[]",}
	const enum GDashboardPanelDeleteDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardPanelZone.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní pro zónu v panelu*/
	interface DashboardPanelZone {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardZoneDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardZoneDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardZoneDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardZoneDto>>;
		/**vrátí seznam panelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardZoneDto>>;
		/**Prida view do zony*/
		addView(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**Upravi view zony*/
		updateView(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**Nacte view konfigurovany v zone*/
		readView(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**Odebere view ze zony*/
		removeView(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**vymaže panel*/
		delete(rq?:Gordic.Gin.Interface.GDashboardZoneDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardZoneDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardZoneDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardZoneDto>>;
		/**přesun pohledů mezi panely*/
		move(rq?:Gordic.Gin.Interface.GDashboardMoveDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardMoveDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardMoveDto>,void>;
		/**vymaže pohledy ze všech zón*/
		clearAllZones(rq?:Gordic.Gin.Interface.GDashboardZoneDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardZoneDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardZoneDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardPanelZone: ServiceBase & Catalog.DashboardPanelZone;
	}
	const DashboardPanelZone: Client["DashboardPanelZone"];
}
declare namespace Gordic.Gin.Interface {
	/**filtr pro zóny*/
	const enum GDashboardZoneFilter {
		/**zoneId*/
		zoneId=0,
		/**ixsFun*/
		ixs_fun=1,
		/**zona*/
		active=2,
		/**id pohledu*/
		ixs_upo=3,
		templateId=4,
		/**id panelu*/
		panelId=5,
		por_cislo=6,
		phase=7,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardRest.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rest služba*/
	interface DashboardRest {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardRestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardRestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardRestDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardRestDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardRest: ServiceBase & Catalog.DashboardRest;
	}
	const DashboardRest: Client["DashboardRest"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardRestFilter {
		/**url*/
		url=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardRss.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardRss {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardRssDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardRssDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardRssDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardRssDto>>;
		/**vrátí seznam panelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardRssDto>>;
		/**Konfigurace RSS providera*/
		readConfiguration(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Gin.Interface.GDashboardRssProviderConfigDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardRss: ServiceBase & Catalog.DashboardRss;
	}
	const DashboardRss: Client["DashboardRss"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardRssFilter {
		/**id panelu*/
		id=0,
		/**aktivita panelu*/
		date=1,
		/**id funkce*/
		text=2,
		url=3,
		categories=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardSql.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní pro Sql pohledy*/
	interface DashboardSql {
		/**Nacteni pohledu (meta + data)*/
		read(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**Nacteni metadat pohledu*/
		readMeta(rq?:Gordic.Gin.Interface.GDashboardSqlMetaReadDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardSqlMetaReadDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardSqlMetaReadDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardSqlMetaDto>>;
		/**vrátí seznam panelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GIpadpohDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardSql: ServiceBase & Catalog.DashboardSql;
	}
	const DashboardSql: Client["DashboardSql"];
}
declare namespace Gordic.Gin.Interface {
	/**Filtr pro sql pohledy*/
	const enum GDashboardSqlFilter {
		aktivita,
		por_cislo,
		klic,
		ixs_poh,
	}
	/**DTO pro cteni metadat*/
	interface GDashboardSqlMetaReadDto {
		/**ixs_upo*/
		ixs_upo?: string|null;
		/**ixs_poh*/
		ixs_poh?: string|null;
	}
	const enum GDashboardSqlMetaReadDtoNames { ixs_upo = "ixs_upo", ixs_poh = "ixs_poh",}
	const enum GDashboardSqlMetaReadDtoFragments { ixs_upo = "*", ixs_poh = "*",}
	const enum GDashboardSqlMetaReadDtoTypes { ixs_upo = "string", ixs_poh = "string",}
	const enum GDashboardSqlMetaReadDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardSsrs.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rest služba*/
	interface DashboardSsrs {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardSsrsDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardSsrsDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardSsrsDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardSsrsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardSsrs: ServiceBase & Catalog.DashboardSsrs;
	}
	const DashboardSsrs: Client["DashboardSsrs"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardSsrsFilter {
		/**url*/
		url=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardTask.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardTask {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardTaskDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardTaskDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardTaskDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardTaskDto>>;
		/**vrátí seznam panelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardTaskDto>>;
		/**vytvoří nový panel*/
		create(rq?:Gordic.Gin.Interface.GDashboardTaskDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardTaskDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardTaskDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardTaskDto>>;
		/**aktualizuje panel*/
		update(rq?:Gordic.Gin.Interface.GDashboardTaskDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardTaskDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardTaskDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardTaskDto>>;
		/**vymaže panel*/
		delete(rq?:Gordic.Gin.Interface.GDashboardTaskDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardTaskDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardTaskDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardTaskDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardTask: ServiceBase & Catalog.DashboardTask;
	}
	const DashboardTask: Client["DashboardTask"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardTaskFilter {
		/**id panelu*/
		taskId=0,
		/**aktivita panelu*/
		activity=1,
		/**Aktivita pohledu*/
		viewActivity=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardView.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardView {
		/**vrátí detail panelu*/
		read(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**vrátí seznam panelů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**vytvoří nový panel*/
		create(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**aktualizuje panel*/
		update(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewDto>>;
		/**vymaže panel*/
		delete(rq?:Gordic.Gin.Interface.GDashboardViewDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardView: ServiceBase & Catalog.DashboardView;
	}
	const DashboardView: Client["DashboardView"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardViewFilter {
		/**ixs_poh*/
		viewId=0,
		/**ixs_poh*/
		templateId=1,
		/**ixs_poh*/
		activity=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardViewTemplate.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardViewTemplate {
		/**vrátí detail šablony pohledu*/
		read(rq?:Gordic.Gin.Interface.GDashboardViewTemplateDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardViewTemplateDto>>;
		/**vrátí seznam šablony pohledu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardViewTemplateDto>>;
		/**vytvoří nový šablony pohledu*/
		create(rq?:Gordic.Gin.Interface.GDashboardViewTemplateDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewTemplateDto>>;
		/**aktualizuje šablony pohledu*/
		update(rq?:Gordic.Gin.Interface.GDashboardViewTemplateDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewTemplateDto>>;
		/**vymaže šablony pohledu*/
		delete(rq?:Gordic.Gin.Interface.GDashboardViewTemplateDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GDashboardViewTemplateDto>,GServiceSaveResponse<Gordic.Gin.Interface.GDashboardViewTemplateDto>>;
		/**naimportuje šablony pohledů*/
		importViewTemplate(rq?:Gordic.Gin.Interface.GDashboardJsonFileDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardViewTemplateImportExportDto>>;
		/**zabalí šablony pohledů pro export*/
		createZip(rq?:Gordic.Gin.Interface.GDashboardViewTemplateImportExportDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardViewTemplateImportExportDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardViewTemplateImportExportDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardViewTemplateImportExportDto>>;
		/**vrrátí strukturu DTO, který vrací ISL*/
		getIslObjectStructure(rq?:Gordic.Gin.Interface.GDashboardIslObjectMetaDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GDashboardIslObjectMetaDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GDashboardIslObjectMetaDto>,GServiceActionResponse<Gordic.Gin.Interface.GDashboardIslObjectMetaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardViewTemplate: ServiceBase & Catalog.DashboardViewTemplate;
	}
	const DashboardViewTemplate: Client["DashboardViewTemplate"];
}
declare namespace Gordic.Gin.Interface {
	/**filter panelu*/
	const enum GDashboardViewTemplateFilter {
		/**identifikátor šablony pohledu*/
		templateId=0,
		/**klíč*/
		taskId=1,
		/**pořadové číslo*/
		name=2,
		/**aktivita*/
		activity=3,
		ixs_upo=4,
	}
	/**filter panelu*/
	const enum GViewTemplateConfigFilter {
		/**identifikátor šablony pohledu*/
		ixs_poh=0,
		/**klíč*/
		klic=1,
		/**pořadové číslo*/
		por_cislo=2,
		/**obsah*/
		obsah=3,
		/**aktivita*/
		aktivita=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dashboard\ISL\IGDashboardXrg.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface DashboardXrg {
		/**vrátí detail XRG metody*/
		read(rq?:Gordic.Gin.Interface.GDashboardXrgMethodDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardXrgMethodDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardXrgMethodDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardXrgMethodDto>>;
		/**vrátí seznam dostupných XRG metod pro dashboard*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GDashboardXrgMethodDto>>;
		/**vrátí data pro danou webovou službu*/
		getXrgData(rq?:Gordic.Gin.Interface.GDashboardXrgMethodDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardXrgMethodDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardXrgMethodDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardXrgMethodDto>>;
		testCall(rq?:Gordic.Gin.Interface.GDashboardJsonFileDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GDashboardJsonFileDto>,GServiceReadResponse<Gordic.Gin.Interface.GDashboardJsonFileDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DashboardXrg: ServiceBase & Catalog.DashboardXrg;
	}
	const DashboardXrg: Client["DashboardXrg"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\DataSety\Gordic.Gin.Interface.SeznamVlastnosti.Dto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:SeznamVlastnosti*/
	interface SeznamVlastnostiDto {
		/**DBCOLUMN:SeznamVlastnosti.ixs_pro*/
		ixs_pro?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.nazev_pro*/
		nazev_pro?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.ixs_stv*/
		ixs_stv?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.nazev_stv*/
		nazev_stv?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.ixs_vla*/
		ixs_vla?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.nazev_vla*/
		nazev_vla?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.radek*/
		radek?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.hovla*/
		hovla?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.hovla_txt*/
		hovla_txt?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.hovla_txt2*/
		hovla_txt2?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.cs_hovla_txt*/
		cs_hovla_txt?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.ix*/
		ix?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.kod*/
		kod?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamVlastnosti.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.k_v_pro*/
		k_v_pro?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.k_v_stv*/
		k_v_stv?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.k_v_vla*/
		k_v_vla?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.aktivita1*/
		aktivita1?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.priz_edit*/
		priz_edit?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.priz_add*/
		priz_add?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.typ_vla*/
		typ_vla?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.typ_vla_txt*/
		typ_vla_txt?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.dat_typ*/
		dat_typ?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.maska*/
		maska?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.kod_pro*/
		kod_pro?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.kod_stv*/
		kod_stv?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.kod_vla*/
		kod_vla?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.priz_pov_stv*/
		priz_pov_stv?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.priz_edit_stv*/
		priz_edit_stv?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.priz_vir_stv*/
		priz_vir_stv?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.priz_vir_pro*/
		priz_vir_pro?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.uroven_vla*/
		uroven_vla?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.barva*/
		barva?: string|null;
		/**DBCOLUMN:SeznamVlastnosti.s_view_detail*/
		s_view_detail?: number|null;
		/**DBCOLUMN:SeznamVlastnosti.ixs_cis*/
		ixs_cis?: string|null;
	}
	const enum SeznamVlastnostiDtoNames { ixs_pro = "ixs_pro", nazev_pro = "nazev_pro", ixs_stv = "ixs_stv", nazev_stv = "nazev_stv", ixs_vla = "ixs_vla", nazev_vla = "nazev_vla", por_cislo = "por_cislo", radek = "radek", aktivita = "aktivita", hovla = "hovla", hovla_txt = "hovla_txt", hovla_txt2 = "hovla_txt2", cs_hovla_txt = "cs_hovla_txt", ix = "ix", typ_ag = "typ_ag", kod = "kod", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_zmenu_prov = "nazev_zmenu_prov", k_v_pro = "k_v_pro", k_v_stv = "k_v_stv", k_v_vla = "k_v_vla", nazev = "nazev", zkratka = "zkratka", aktivita1 = "aktivita1", priz_edit = "priz_edit", priz_add = "priz_add", typ_vla = "typ_vla", typ_vla_txt = "typ_vla_txt", dat_typ = "dat_typ", velikost = "velikost", maska = "maska", kod_pro = "kod_pro", kod_stv = "kod_stv", kod_vla = "kod_vla", priz_pov_stv = "priz_pov_stv", priz_edit_stv = "priz_edit_stv", priz_vir_stv = "priz_vir_stv", priz_vir_pro = "priz_vir_pro", uroven_vla = "uroven_vla", barva = "barva", s_view_detail = "s_view_detail", ixs_cis = "ixs_cis",}
	const enum SeznamVlastnostiDtoFragments { ixs_pro = "*", nazev_pro = "*", ixs_stv = "*", nazev_stv = "*", ixs_vla = "*", nazev_vla = "*", por_cislo = "*", radek = "*", aktivita = "*", hovla = "*", hovla_txt = "*", hovla_txt2 = "*", cs_hovla_txt = "*", ix = "*", typ_ag = "*", kod = "*", dat_zmena = "*", zmenu_prov = "*", nazev_zmenu_prov = "*", k_v_pro = "*", k_v_stv = "*", k_v_vla = "*", nazev = "*", zkratka = "*", aktivita1 = "*", priz_edit = "*", priz_add = "*", typ_vla = "*", typ_vla_txt = "*", dat_typ = "*", velikost = "*", maska = "*", kod_pro = "*", kod_stv = "*", kod_vla = "*", priz_pov_stv = "*", priz_edit_stv = "*", priz_vir_stv = "*", priz_vir_pro = "*", uroven_vla = "*", barva = "*", s_view_detail = "*", ixs_cis = "*",}
	const enum SeznamVlastnostiDtoTypes { ixs_pro = "string", nazev_pro = "string", ixs_stv = "string", nazev_stv = "string", ixs_vla = "string", nazev_vla = "string", por_cislo = "number", radek = "number", aktivita = "number", hovla = "string", hovla_txt = "string", hovla_txt2 = "string", cs_hovla_txt = "string", ix = "string", typ_ag = "number", kod = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_zmenu_prov = "string", k_v_pro = "number", k_v_stv = "number", k_v_vla = "number", nazev = "string", zkratka = "string", aktivita1 = "number", priz_edit = "number", priz_add = "number", typ_vla = "number", typ_vla_txt = "string", dat_typ = "number", velikost = "number", maska = "string", kod_pro = "string", kod_stv = "string", kod_vla = "string", priz_pov_stv = "number", priz_edit_stv = "number", priz_vir_stv = "number", priz_vir_pro = "number", uroven_vla = "number", barva = "string", s_view_detail = "number", ixs_cis = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Datove schranky\Gordic.Gin.Interface.IGGinsmbx.d.ts 

declare namespace Gordic.Gin.Interface {
    /**Typ autorizace datové schranky - tab. gincaut*/
	const enum TypAutentifikaceMailboxu {
        /**jménem a heslem*/
		jmenemAHeslem=0,
        /**osobním certifikátem*/
		osobnimCertifikatem=10,
        /**systémovým certifikátem*/
		systemovymCertifikatem=20,
        /**systémovým certifikátem s jménem a heslem*/
		systemovymCertifikatemSJmenemAHeslem=30,
        /**neurčeno*/
		neurceno=999,
	}
    /**Typ mailboxu - tab. gincmbx*/
	const enum TypMailboxu {
        /**jménem a heslem*/
		neurceno=0,
        /**příjem el. podání - e_mail*/
		email=10,
        /**ostatní-MAS (dotazy na stav, scan, interní podání)*/
		ostatni=20,
        /**datová schránka ISDS*/
		datovaSchranka=30,
        /**Gordic exchange (GEX)*/
		gordicExchange=40,
        /**UPSR eDesk (slovenské datovky)*/
		eDeskUPVS=50,
        /**datová schránka ISDS nebo Gordic exchange (GEX)*/
		datovaSchrankaNeboGordicExchange=3040,
        /**všechny - select bez WHERE na typ mailboxu*/
		vsechny=999,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Datove schranky\Gordic.Gin.Interface.KategorieDuvoduPodpisu.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Kategorie důvodu podpisu dle wflckdp*/
	const enum KategorieDuvoduPodpisu {
		/**neurceno*/
		neurceno=0,
		/**Podepsání/razítko při vložení el. dokumentu (přidání el. obrazu/přílohy)*/
		PodepsaniRazitko_pri_vlozeni_el_dokumentu=10,
		/**Podepsání/razítko již existujícího el. dokumentu (běžné podepsání v modulu)*/
		PodepsaniRazitko_jiz_existujiciho_el_dokumentu_bezne_podepsani_v_modulu=20,
		/**Podepsání/razítko pro potvrzení vidimace po naskenování dokumentu*/
		PodepsaniRazitko_pro_potvrzeni_vidimace_po_naskenovani_dokumentu=30,
		/**Podepsání/razítko po konverzi do PDF*/
		PodepsaniRazitko_po_konverzi_do_PDF=40,
		/**Systémové razítko při příjmu el. podání*/
		Systemove_razitko_pri_prijmu_el_podani=50,
		/**Podepsání el. obrazu, příloh před odesláním z GINISu*/
		Podepsani_el_obrazu_priloh_pred_odeslanim_z_GINISu=60,
		/**Podepsání/razítko odpovědi na el. podání*/
		PodepsaniRazitko_odpovedi_na_el_podani=70,
		/**Podepsání úkonu v EPK  (kval. certifikátem)*/
		Podepsani_ukonu_v_EPK_kval_certifikatem=80,
		/**Podepsání/čas. razítko úkonu v EPK  (kval. certifikátem)*/
		PodepsaniRazitko_ukonu_v_EPK_kval_certifikatem=90,
		/**Podepsání  úkonu v EPK  (kval. certifikátem nebo systémovou značku)*/
		Podepsani_ukonu_v_EPK_kval_certifikatem_nebo_systemovou_znackou=100,
		/**Podepsání/čas. razítko úkonu v EPK  (kval. certifikátem nebo systémovou značku)*/
		PodepsaniRazitko_ukonu_v_EPK_kval_certifikatem_nebo_systemovou_znackou=110,
		/**Podepsání/razítko při vložení el. dokumentu s konverzí (přidání el. obrazu/přílohy)*/
		PodepsaniRazitko_pri_vlozeni_el_dokumentu_s_konverzi=120,
		/**Podepisování dávek ČNB*/
		Podepisovani_davek_CNB=130,
		/**Podepsání/razítko potvrzení příjmu el. podání*/
		PodepsaniRazitko_potvrzeni_prijmu_el_podani=150,
		/**Podepsání dokumentu nabytí právní moci*/
		Podepsani_dokumentu_nabyti_pravni_moci=200,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\DohledovySystem\GControlsSystemAggregatedDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto s aggregovanými záznamy DSG pro objekt*/
	interface GControlsSystemAggregatedDto {
		/**Fragment pro aggregovaná DSG data*/
		DSG_FRAGMENT?: string|null;
		/**Počet DSG zpráv*/
		dsg_count?: number|null;
		/**Nejvyšší závažnost z DSG zpráv*/
		max_zavaznost?: string|null;
		/**Spojený text zpráv*/
		joined_text?: string|null;
		/**Seznam DSG zpráv k objektu*/
		dsg?: Gordic.Gin.Interface.GControlsSystemDto[]|null;
	}
	const enum GControlsSystemAggregatedDtoNames { DSG_FRAGMENT = "DSG_FRAGMENT", dsg_count = "dsg_count", max_zavaznost = "max_zavaznost", joined_text = "joined_text", dsg = "dsg",}
	const enum GControlsSystemAggregatedDtoFragments { DSG_FRAGMENT = "*", dsg_count = "DSG_FRAGMENT", max_zavaznost = "DSG_FRAGMENT", joined_text = "DSG_FRAGMENT", dsg = "DSG_FRAGMENT",}
	const enum GControlsSystemAggregatedDtoTypes { DSG_FRAGMENT = "string", dsg_count = "number", max_zavaznost = "string", joined_text = "string", dsg = "Gordic.Gin.Interface.GControlsSystemDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\DohledovySystem\Gordic.Gin.Interface.GControlsSystemDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ControlsResults*/
	interface GControlsSystemDto {
		/**DBCOLUMN:ControlsResults.por_cis_dkon*/
		por_cis_dkon?: number|null;
		/**DBCOLUMN:ControlsResults.por_cis_kon*/
		por_cis_kon?: number|null;
		/**DBCOLUMN:ControlsResults.typ_koch*/
		typ_koch?: number|null;
		/**DBCOLUMN:ControlsResults.dat_kon*/
		dat_kon?: JsonDate|null;
		/**DBCOLUMN:ControlsResults.typ_koch_txt*/
		typ_koch_txt?: string|null;
		/**DBCOLUMN:ControlsResults.ixs_alv*/
		ixs_alv?: string|null;
		/**DBCOLUMN:ControlsResults.typ_aku*/
		typ_aku?: string|null;
		/**DBCOLUMN:ControlsResults.typ_kobj*/
		typ_kobj?: number|null;
		/**DBCOLUMN:ControlsResults.typ_kobj_txt*/
		typ_kobj_txt?: string|null;
		/**DBCOLUMN:ControlsResults.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ControlsResults.zkr_ag*/
		zkr_ag?: string|null;
		/**DBCOLUMN:ControlsResults.typ_vkon*/
		typ_vkon?: number|null;
		/**DBCOLUMN:ControlsResults.typ_vkon_txt*/
		typ_vkon_txt?: string|null;
		/**DBCOLUMN:ControlsResults.zav_kon*/
		zav_kon?: number|null;
		/**DBCOLUMN:ControlsResults.zav_kon_txt*/
		zav_kon_txt?: string|null;
		/**DBCOLUMN:ControlsResults.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ControlsResults.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ControlsResults.ixx_1*/
		ixx_1?: string|null;
		/**DBCOLUMN:ControlsResults.ixx_2*/
		ixx_2?: string|null;
		/**DBCOLUMN:ControlsResults.ixx_3*/
		ixx_3?: string|null;
		/**DBCOLUMN:ControlsResults.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:ControlsResults.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:ControlsResults.dat_navedomi*/
		dat_navedomi?: JsonDate|null;
		/**DBCOLUMN:ControlsResults.txt_1*/
		txt_1?: string|null;
		/**DBCOLUMN:ControlsResults.txt_2*/
		txt_2?: string|null;
		/**DBCOLUMN:ControlsResults.txt_3*/
		txt_3?: string|null;
		/**DBCOLUMN:ControlsResults.txt*/
		txt?: string|null;
		/**DBCOLUMN:ControlsResults.ixb_pri*/
		ixb_pri?: string|null;
		/**DBCOLUMN:ControlsResults.popis_pri*/
		popis_pri?: string|null;
		/**DBCOLUMN:ControlsResults.por_cis_oav*/
		por_cis_oav?: number|null;
		/**DBCOLUMN:ControlsResults.dat_avi*/
		dat_avi?: JsonDate|null;
		/**DBCOLUMN:ControlsResults.ac*/
		ac?: string|null;
		/**DBCOLUMN:ControlsResults.mail*/
		mail?: string|null;
	}
	const enum GControlsSystemDtoNames { por_cis_dkon = "por_cis_dkon", por_cis_kon = "por_cis_kon", typ_koch = "typ_koch", dat_kon = "dat_kon", typ_koch_txt = "typ_koch_txt", ixs_alv = "ixs_alv", typ_aku = "typ_aku", typ_kobj = "typ_kobj", typ_kobj_txt = "typ_kobj_txt", typ_ag = "typ_ag", zkr_ag = "zkr_ag", typ_vkon = "typ_vkon", typ_vkon_txt = "typ_vkon_txt", zav_kon = "zav_kon", zav_kon_txt = "zav_kon_txt", dat_od = "dat_od", dat_do = "dat_do", ixx_1 = "ixx_1", ixx_2 = "ixx_2", ixx_3 = "ixx_3", ixs_fun_akt = "ixs_fun_akt", nazev_rf = "nazev_rf", dat_navedomi = "dat_navedomi", txt_1 = "txt_1", txt_2 = "txt_2", txt_3 = "txt_3", txt = "txt", ixb_pri = "ixb_pri", popis_pri = "popis_pri", por_cis_oav = "por_cis_oav", dat_avi = "dat_avi", ac = "ac", mail = "mail",}
	const enum GControlsSystemDtoFragments { por_cis_dkon = "*", por_cis_kon = "*", typ_koch = "*", dat_kon = "*", typ_koch_txt = "*", ixs_alv = "*", typ_aku = "*", typ_kobj = "*", typ_kobj_txt = "*", typ_ag = "*", zkr_ag = "*", typ_vkon = "*", typ_vkon_txt = "*", zav_kon = "*", zav_kon_txt = "*", dat_od = "*", dat_do = "*", ixx_1 = "*", ixx_2 = "*", ixx_3 = "*", ixs_fun_akt = "*", nazev_rf = "*", dat_navedomi = "*", txt_1 = "*", txt_2 = "*", txt_3 = "*", txt = "*", ixb_pri = "*", popis_pri = "*", por_cis_oav = "*", dat_avi = "*", ac = "*", mail = "*",}
	const enum GControlsSystemDtoTypes { por_cis_dkon = "number", por_cis_kon = "number", typ_koch = "number", dat_kon = "JsonDate", typ_koch_txt = "string", ixs_alv = "string", typ_aku = "string", typ_kobj = "number", typ_kobj_txt = "string", typ_ag = "number", zkr_ag = "string", typ_vkon = "number", typ_vkon_txt = "string", zav_kon = "number", zav_kon_txt = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixx_1 = "string", ixx_2 = "string", ixx_3 = "string", ixs_fun_akt = "string", nazev_rf = "string", dat_navedomi = "JsonDate", txt_1 = "string", txt_2 = "string", txt_3 = "string", txt = "string", ixb_pri = "string", popis_pri = "string", por_cis_oav = "number", dat_avi = "JsonDate", ac = "string", mail = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\DohledovySystem\IGGControlsSystem.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface pro dohledový systém*/
	interface GControlsSystem {
		/**Read záznamu dohledového systému podle por_cis_dkon*/
		read(rq?:Gordic.Gin.Interface.GControlsSystemDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GControlsSystemDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GControlsSystemDto>,GServiceReadResponse<Gordic.Gin.Interface.GControlsSystemDto>>;
		/**List dohledového systému*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GControlsSystemDto>>;
		/**List historie dohledového systému*/
		list_History(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GControlsSystemDto>>;
		/**Označení výsledku kontrolního chodu jako vzatého na vědomí*/
		acceptControlsResult(rq?:Gordic.Gin.Interface.GControlsSystemDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GControlsSystemDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GControlsSystemDto>,void>;
		/**Hromadné označení výsledku kontrolního chodu jako vzatého na vědomí*/
		acceptControlsResults(rq?:CallParams<{rq:Gordic.Gin.Interface.GControlsSystemDto[]}>): _Task<{rq:Gordic.Gin.Interface.GControlsSystemDto[]},void>;
		/**List dohledového systému včetně podrobností*/
		list_FullControlsResults(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GControlsSystemDto>>;
		/**List historie dohledového systému včetně podrobností*/
		list_FullHistory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GControlsSystemDto>>;
		/**Získání počtu výsledků kontrolních chodů*/
		getControlsResultsCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GControlsSystem: ServiceBase & Catalog.GControlsSystem;
	}
	const GControlsSystem: Client["GControlsSystem"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GAibConnectorInfoDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro zobrazení*/
	interface GAibConnectorInfoDto {
		/**Název*/
		nazev?: string|null;
		/**Položka*/
		pol?: number|null;
		/**Podpoložka*/
		ppol?: number|null;
		/**Textová reprezentace položky a podpoložky*/
		polPpol?: string|null;
		/**Seznam všech položek diagnostiky Aib*/
		polozkyAib?: Gordic.Gin.Interface.GAibConnectorInfoPolozkaDto[]|null;
		/**Objekt reprezentující jednotlivé stavy*/
		stavy?: any|null;
	}
	const enum GAibConnectorInfoDtoNames { nazev = "nazev", pol = "pol", ppol = "ppol", polPpol = "polPpol", polozkyAib = "polozkyAib", stavy = "stavy",}
	const enum GAibConnectorInfoDtoFragments { nazev = "*", pol = "*", ppol = "*", polPpol = "*", polozkyAib = "*", stavy = "*",}
	const enum GAibConnectorInfoDtoTypes { nazev = "string", pol = "number", ppol = "number", polPpol = "string", polozkyAib = "Gordic.Gin.Interface.GAibConnectorInfoPolozkaDto[]", stavy = "any",}
	const enum GAibConnectorInfoDtoTypeLengths {}
	interface GAibConnectorInfoPolozkaDto {
		/**Název položky*/
		nazev?: string|null;
		/**Hodnota*/
		hodnota?: string|null;
	}
	const enum GAibConnectorInfoPolozkaDtoNames { nazev = "nazev", hodnota = "hodnota",}
	const enum GAibConnectorInfoPolozkaDtoFragments { nazev = "*", hodnota = "*",}
	const enum GAibConnectorInfoPolozkaDtoTypes { nazev = "string", hodnota = "string",}
	const enum GAibConnectorInfoPolozkaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GAIRecognizedItemDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Položka vytěžená pomocí AI.*/
	interface GAIRecognizedItemDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo vytěžené položky.*/
		por_cislo?: number|null;
		/**Technická hodnota ve stringu. 
		*     Slouží především pro ukládání v databázi a vypočítává se z ní typová hodnota Value.
		*     Typovou instanci hodnoty získáte pomocí metody GetValue(), případně vlastností Value.
		*     V TypeScriptu pro získání hodnoty použijte metodu Gordic.Gin.WebClient.GAiRecognizerUtils.GetValue().
		*     Pokud chcete zjistit původní vytěžený text, tak je ve vlastnosti RecognizedText.
		*/
		hodnota_upr?: string|null;
		/**Vytěžený text.*/
		hodnota_orig?: string|null;
		/**Typ vytěžené položky.*/
		typ_vytez_pol?: Gordic.Ginis.DbModel.GGinctpoEnum|null;
		/**Pravděpodobnost správně rozpoznané hodnoty (0-1).*/
		pravdepodobnost?: JsonDecimal|null;
		/**Index stránky na které je text (počítáno od 0).*/
		page_index?: number|null;
		/**Pozice X horního levého bodu ohraničujícího hodnotu v obrazu.*/
		top_left_x?: JsonDecimal|null;
		/**Pozice Y horního levého bodu ohraničujícího hodnotu v obrazu.*/
		top_left_y?: JsonDecimal|null;
		/**Šířka "rámečku" textu.*/
		size_x?: JsonDecimal|null;
		/**Výška "rámečku" textu.*/
		size_y?: JsonDecimal|null;
		/**Pořadové číslo skupiny.*/
		por_cislo_skupina?: number|null;
		/**Skupina položek.*/
		Skupina?: Gordic.Gin.Interface.GAIRecognizedItemGroupDto|null;
		/**Druh Hodnoty - Uživatelský text.*/
		readonly ItemTxt?: string|null;
		/**Číslo stránky na které je text (počítáno od 1).*/
		readonly ImagePositionPageNumber?: number|null;
		/**Pozice bodů ohraničujících hodnotu v obrazu.*/
		readonly ImagePositionTopLeft?: Gordic.Gin.Interface.GVector2Dto|null;
		/**Velikost "rámečku" textu.*/
		readonly ImagePositionSize?: Gordic.Gin.Interface.GVector2Dto|null;
	}
	const enum GAIRecognizedItemDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", hodnota_upr = "hodnota_upr", hodnota_orig = "hodnota_orig", typ_vytez_pol = "typ_vytez_pol", pravdepodobnost = "pravdepodobnost", page_index = "page_index", top_left_x = "top_left_x", top_left_y = "top_left_y", size_x = "size_x", size_y = "size_y", por_cislo_skupina = "por_cislo_skupina", Skupina = "Skupina", ItemTxt = "ItemTxt", ImagePositionPageNumber = "ImagePositionPageNumber", ImagePositionTopLeft = "ImagePositionTopLeft", ImagePositionSize = "ImagePositionSize",}
	const enum GAIRecognizedItemDtoFragments { ixs_ulo = "*", por_cislo = "*", hodnota_upr = "*", hodnota_orig = "*", typ_vytez_pol = "*", pravdepodobnost = "*", page_index = "*", top_left_x = "*", top_left_y = "*", size_x = "*", size_y = "*", por_cislo_skupina = "*", Skupina = "*", ItemTxt = "*", ImagePositionPageNumber = "*", ImagePositionTopLeft = "*", ImagePositionSize = "*",}
	const enum GAIRecognizedItemDtoTypes { ixs_ulo = "string", por_cislo = "number", hodnota_upr = "string", hodnota_orig = "string", typ_vytez_pol = "Gordic.Ginis.DbModel.GGinctpoEnum", pravdepodobnost = "JsonDecimal", page_index = "number", top_left_x = "JsonDecimal", top_left_y = "JsonDecimal", size_x = "JsonDecimal", size_y = "JsonDecimal", por_cislo_skupina = "number", Skupina = "Gordic.Gin.Interface.GAIRecognizedItemGroupDto", ItemTxt = "string", ImagePositionPageNumber = "number", ImagePositionTopLeft = "Gordic.Gin.Interface.GVector2Dto", ImagePositionSize = "Gordic.Gin.Interface.GVector2Dto",}
	const enum GAIRecognizedItemDtoTypeLengths {}
	const enum GAIRecognizedItemFilter {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo,
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		por_cislo,
		/**Technická hodnota ve stringu.*/
		hodnota_upr,
		/**Vytěžený text.*/
		hodnota_orig,
		/**Typ vytěžené položky.*/
		typ_vytez_pol,
		/**Pravděpodobnost správně rozpoznané hodnoty (0-1).*/
		pravdepodobnost,
		/**Index stránky na které je text (počítáno od 0).*/
		page_index,
		/**Pozice X horního levého bodu ohraničujícího hodnotu v obrazu.*/
		top_left_x,
		/**Pozice Y horního levého bodu ohraničujícího hodnotu v obrazu.*/
		top_left_y,
		/**Šířka "rámečku" textu.*/
		size_x,
		/**Výška "rámečku" textu.*/
		size_y,
	}
	interface GVector2Dto {
		/**X.*/
		X?: JsonDecimal|null;
		/**Y.*/
		Y?: JsonDecimal|null;
	}
	const enum GVector2DtoNames { X = "X", Y = "Y",}
	const enum GVector2DtoFragments { X = "*", Y = "*",}
	const enum GVector2DtoTypes { X = "JsonDecimal", Y = "JsonDecimal",}
	const enum GVector2DtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GAIRecognizedItemGroupDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Skupina položek vytěžených pomocí AI.*/
	interface GAIRecognizedItemGroupDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo skupiny vytěžené položky.*/
		por_cislo_skupina?: number|null;
		/**Identifikátor skupiny položek.*/
		druh_skupiny?: Gordic.Ginis.DbModel.GGincargEnum|null;
	}
	const enum GAIRecognizedItemGroupDtoNames { ixs_ulo = "ixs_ulo", por_cislo_skupina = "por_cislo_skupina", druh_skupiny = "druh_skupiny",}
	const enum GAIRecognizedItemGroupDtoFragments { ixs_ulo = "*", por_cislo_skupina = "*", druh_skupiny = "*",}
	const enum GAIRecognizedItemGroupDtoTypes { ixs_ulo = "string", por_cislo_skupina = "number", druh_skupiny = "Gordic.Ginis.DbModel.GGincargEnum",}
	const enum GAIRecognizedItemGroupDtoTypeLengths {}
	const enum GAIRecognizedItemGroupFilter {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo,
		/**Pořadové číslo skupiny vytěžené položky.*/
		por_cislo_skupina,
		/**Identifikátor skupiny položek.*/
		druh_skupiny,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GAIRecognizeHistoryDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GAIRecognizeRequestDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Požadavek na vytěžení dat pomocí AI.*/
	interface GAIRecognizeRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Stav požadavku na vytěžení.*/
		stav_vytez?: Gordic.Ginis.DbModel.GGincsvyEnum|null;
		/**Datum a čas poslední změny požadavku na vytěžení dat.*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny požadavku na vytěžení dat.*/
		zmenu_prov?: string|null;
		/**Vytěžené položky.*/
		RecognizedItems?: Gordic.Gin.Interface.GAIRecognizedItemDto[]|null;
		/**Skupiny vytěžených položek.*/
		RecognizedItemGroups?: Gordic.Gin.Interface.GAIRecognizedItemGroupDto[]|null;
	}
	const enum GAIRecognizeRequestDtoNames { ixs_ulo = "ixs_ulo", stav_vytez = "stav_vytez", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", RecognizedItems = "RecognizedItems", RecognizedItemGroups = "RecognizedItemGroups",}
	const enum GAIRecognizeRequestDtoFragments { ixs_ulo = "*", stav_vytez = "*", dat_zmena = "*", zmenu_prov = "*", RecognizedItems = "*", RecognizedItemGroups = "*",}
	const enum GAIRecognizeRequestDtoTypes { ixs_ulo = "string", stav_vytez = "Gordic.Ginis.DbModel.GGincsvyEnum", dat_zmena = "JsonDate", zmenu_prov = "string", RecognizedItems = "Gordic.Gin.Interface.GAIRecognizedItemDto[]", RecognizedItemGroups = "Gordic.Gin.Interface.GAIRecognizedItemGroupDto[]",}
	const enum GAIRecognizeRequestDtoTypeLengths {}
	/**GAIRecognizeRequestFilter*/
	const enum GAIRecognizeRequestFilter {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo,
		/**Stav požadavku na vytěžení.*/
		stav_vytez,
		/**Datum a čas poslední změny požadavku na vytěžení dat.*/
		dat_zmena,
		/**Autor poslední změny požadavku na vytěžení dat.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GArticleFileDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginsble 
	*      Dto pro soubory vložené do GArticle
	*/
	interface GArticleFileDto {
		/**Identifikátor*/
		ixs_ble?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Bytes souboru*/
		obsah?: JsonBlob|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Velikost*/
		velikost?: JsonDecimal|null;
		/**Miniatura obrázku*/
		miniatura?: JsonBlob|null;
		/**MIME typ souboru*/
		mime?: string|null;
		/**Textová verze zmenu_prov*/
		zmenu_prov_txt?: string|null;
	}
	const enum GArticleFileDtoNames { ixs_ble = "ixs_ble", nazev = "nazev", obsah = "obsah", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", velikost = "velikost", miniatura = "miniatura", mime = "mime", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GArticleFileDtoFragments { ixs_ble = "*", nazev = "*", obsah = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", velikost = "*", miniatura = "*", mime = "*", zmenu_prov_txt = "*",}
	const enum GArticleFileDtoTypes { ixs_ble = "string", nazev = "string", obsah = "JsonBlob", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", velikost = "JsonDecimal", miniatura = "JsonBlob", mime = "string", zmenu_prov_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogClanekDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Články blogu*/
	interface GBlogClanekDto {
		/**Hlavní identifikátor*/
		ixs_clb?: string|null;
		/**Vazba na tabulku blogu (ginsblg) - FK*/
		ixs_blg?: string|null;
		/**Název článku*/
		nazev?: string|null;
		/**Obsah článku*/
		obsah?: JsonBlob|null;
		/**Tagy článku (klíčová slova), oddělena oddělovačem*/
		tagy?: string|null;
		/**Datum publikace článku*/
		dat_od?: JsonDate|null;
		/**Datum od kdy je neaktuální článek*/
		dat_do?: JsonDate|null;
		/**Priorita článku, vazba na tabulku gincclb*/
		priorita_clb?: Gordic.Ginis.DbModel.GGincclbEnum|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita článku, vazba na tabulku gincakt*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Změnu provedl*/
		zmenu_prov?: string|null;
		/**Textové vyjádření stavu článku*/
		stav_txt?: string|null;
		/**Textové vyjádření priority*/
		priorita_clb_txt?: string|null;
		/**Textový název blogu*/
		blog_txt?: string|null;
		/**Textový název referenta změny*/
		zmenu_prov_txt?: string|null;
		/**Příznak, zda byl článek zobrazen aktuálním uživatelem*/
		zobrazeno_uzivatelem?: boolean|null;
		/**Příznak, zda byl článek potvrzen aktuálním uživatelem*/
		potvrzeno_uzivatelem?: boolean|null;
		/**Hodnocení článku aktuálním uživatelem*/
		hodnoceni_uzivatelem?: number|null;
		/**Události o článcích*/
		Udalosti?: Gordic.Gin.Interface.GBlogClanekUdalostiDto[]|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Gin.Interface.GBlogClanekPermissions|null;
	}
	const enum GBlogClanekDtoNames { ixs_clb = "ixs_clb", ixs_blg = "ixs_blg", nazev = "nazev", obsah = "obsah", tagy = "tagy", dat_od = "dat_od", dat_do = "dat_do", priorita_clb = "priorita_clb", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_txt = "stav_txt", priorita_clb_txt = "priorita_clb_txt", blog_txt = "blog_txt", zmenu_prov_txt = "zmenu_prov_txt", zobrazeno_uzivatelem = "zobrazeno_uzivatelem", potvrzeno_uzivatelem = "potvrzeno_uzivatelem", hodnoceni_uzivatelem = "hodnoceni_uzivatelem", Udalosti = "Udalosti", Permissions = "Permissions",}
	const enum GBlogClanekDtoFragments { ixs_clb = "*", ixs_blg = "*", nazev = "*", obsah = "*", tagy = "*", dat_od = "*", dat_do = "*", priorita_clb = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav_txt = "*", priorita_clb_txt = "*", blog_txt = "*", zmenu_prov_txt = "*", zobrazeno_uzivatelem = "Udalosti", potvrzeno_uzivatelem = "Udalosti", hodnoceni_uzivatelem = "Udalosti", Udalosti = "*", Permissions = "Permissions",}
	const enum GBlogClanekDtoTypes { ixs_clb = "string", ixs_blg = "string", nazev = "string", obsah = "JsonBlob", tagy = "string", dat_od = "JsonDate", dat_do = "JsonDate", priorita_clb = "Gordic.Ginis.DbModel.GGincclbEnum", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_txt = "string", priorita_clb_txt = "string", blog_txt = "string", zmenu_prov_txt = "string", zobrazeno_uzivatelem = "boolean", potvrzeno_uzivatelem = "boolean", hodnoceni_uzivatelem = "number", Udalosti = "Gordic.Gin.Interface.GBlogClanekUdalostiDto[]", Permissions = "Gordic.Gin.Interface.GBlogClanekPermissions",}
	const enum GBlogClanekDtoTypeLengths { nazev = 100, tagy = 254, poznamka = 254,}
	/**Dto request čtení článku*/
	interface GBlogClanekReadRequestDto {
		/**Identifikátor článku*/
		ixs_clb?: string|null;
		/**Příznak, zda provést zápis do událostí o přečtení článku*/
		withRecord?: boolean|null;
	}
	const enum GBlogClanekReadRequestDtoNames { ixs_clb = "ixs_clb", withRecord = "withRecord",}
	const enum GBlogClanekReadRequestDtoFragments { ixs_clb = "*", withRecord = "*",}
	const enum GBlogClanekReadRequestDtoTypes { ixs_clb = "string", withRecord = "boolean",}
	const enum GBlogClanekReadRequestDtoTypeLengths {}
	/**Dto pro akce nad článkem blogu*/
	interface GBlogClanekActionRequestDto {
		/**Identifikátor článku*/
		ixs_clb?: string|null;
	}
	const enum GBlogClanekActionRequestDtoNames { ixs_clb = "ixs_clb",}
	const enum GBlogClanekActionRequestDtoFragments { ixs_clb = "*",}
	const enum GBlogClanekActionRequestDtoTypes { ixs_clb = "string",}
	const enum GBlogClanekActionRequestDtoTypeLengths {}
	/**Dto pro hromadné akce nad článkem blogu*/
	interface GBlogClanekHromActionRequestDto {
		/**Identifikátory článku*/
		ixs_clbs?: string[]|null;
	}
	const enum GBlogClanekHromActionRequestDtoNames { ixs_clbs = "ixs_clbs",}
	const enum GBlogClanekHromActionRequestDtoFragments { ixs_clbs = "*",}
	const enum GBlogClanekHromActionRequestDtoTypes { ixs_clbs = "string[]",}
	const enum GBlogClanekHromActionRequestDtoTypeLengths {}
	/**Dto pro vytvoření/editaci článku*/
	interface GBlogClanekUpsertDto {
		/**Identifikátor článku*/
		ixs_clb?: string|null;
		/**Identifikátor blogu*/
		ixs_blg?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Tagy*/
		tagy?: string|null;
		/**Datum publikace článku*/
		dat_od?: JsonDate|null;
		/**Datum od kdy je neaktuální článek*/
		dat_do?: JsonDate|null;
		/**Priorita článku*/
		priorita_clb?: Gordic.Ginis.DbModel.GGincclbEnum|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Obsah článku*/
		obsah?: JsonBlob|null;
	}
	const enum GBlogClanekUpsertDtoNames { ixs_clb = "ixs_clb", ixs_blg = "ixs_blg", nazev = "nazev", tagy = "tagy", dat_od = "dat_od", dat_do = "dat_do", priorita_clb = "priorita_clb", poznamka = "poznamka", obsah = "obsah",}
	const enum GBlogClanekUpsertDtoFragments { ixs_clb = "*", ixs_blg = "*", nazev = "*", tagy = "*", dat_od = "*", dat_do = "*", priorita_clb = "*", poznamka = "*", obsah = "*",}
	const enum GBlogClanekUpsertDtoTypes { ixs_clb = "string", ixs_blg = "string", nazev = "string", tagy = "string", dat_od = "JsonDate", dat_do = "JsonDate", priorita_clb = "Gordic.Ginis.DbModel.GGincclbEnum", poznamka = "string", obsah = "JsonBlob",}
	const enum GBlogClanekUpsertDtoTypeLengths { ixs_clb = 12, ixs_blg = 12, nazev = 100, tagy = 254, poznamka = 254,}
	/**Permissions pro práci s článkem blogu*/
	interface GBlogClanekPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat záznam*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zveřejnit článek*/
		LzeZverejnit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit zveřejnění*/
		LzeZrusitZverejneni: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno smazat článek*/
		LzeSmazat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBlogClanekPermissionsNames { LzeEditovat = "LzeEditovat", LzeZverejnit = "LzeZverejnit", LzeZrusitZverejneni = "LzeZrusitZverejneni", LzeSmazat = "LzeSmazat",}
	const enum GBlogClanekPermissionsFragments { LzeEditovat = "*", LzeZverejnit = "*", LzeZrusitZverejneni = "*", LzeSmazat = "*",}
	const enum GBlogClanekPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeSmazat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBlogClanekPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogClanekHistorieDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto pro historii editace článku blogu*/
	interface GBlogClanekHistorieDto {
		/**Identifikátor článku*/
		ixs_clb?: string|null;
		/**Sériové číslo změny*/
		ser_cislo?: number|null;
		/**Identifikátor blogu*/
		ixs_blg?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Obsah článku*/
		obsah?: JsonBlob|null;
		/**Tagy článku*/
		tagy?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Priorita článku*/
		priorita_clb?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Textové vyjádření stavu článku*/
		stav_txt?: string|null;
		/**Textové vyjádření priority*/
		priorita_clb_txt?: string|null;
		/**Textový název blogu*/
		blog_txt?: string|null;
		/**Textový název referenta změny*/
		zmenu_prov_txt?: string|null;
	}
	const enum GBlogClanekHistorieDtoNames { ixs_clb = "ixs_clb", ser_cislo = "ser_cislo", ixs_blg = "ixs_blg", nazev = "nazev", obsah = "obsah", tagy = "tagy", dat_od = "dat_od", dat_do = "dat_do", priorita_clb = "priorita_clb", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_txt = "stav_txt", priorita_clb_txt = "priorita_clb_txt", blog_txt = "blog_txt", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GBlogClanekHistorieDtoFragments { ixs_clb = "*", ser_cislo = "*", ixs_blg = "*", nazev = "*", obsah = "*", tagy = "*", dat_od = "*", dat_do = "*", priorita_clb = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav_txt = "*", priorita_clb_txt = "*", blog_txt = "*", zmenu_prov_txt = "*",}
	const enum GBlogClanekHistorieDtoTypes { ixs_clb = "string", ser_cislo = "number", ixs_blg = "string", nazev = "string", obsah = "JsonBlob", tagy = "string", dat_od = "JsonDate", dat_do = "JsonDate", priorita_clb = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_txt = "string", priorita_clb_txt = "string", blog_txt = "string", zmenu_prov_txt = "string",}
	const enum GBlogClanekHistorieDtoTypeLengths { ixs_clb = 12, ixs_blg = 12, nazev = 100, tagy = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogClanekPredchoziDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**BLOGOVÝ SYSTÉM.
	*      Články které navazují na další články
	*/
	interface GBlogClanekPredchoziDto {
		/**Část klíče - hlavní identifikátor pro článek*/
		ixs_clb?: string|null;
		/**Část klíče - seriový integer*/
		ixs_clb_novy?: string|null;
		/**Poznámka o*/
		poznamka?: string|null;
		/**Aktivita článku, vazba na tabulku gincakt*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Zmenu provedl funkční místo*/
		zmenu_prov_funkce?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Změnu provedl*/
		zmenu_prov?: string|null;
	}
	const enum GBlogClanekPredchoziDtoNames { ixs_clb = "ixs_clb", ixs_clb_novy = "ixs_clb_novy", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov_funkce = "zmenu_prov_funkce", zmenu_prov = "zmenu_prov",}
	const enum GBlogClanekPredchoziDtoFragments { ixs_clb = "*", ixs_clb_novy = "GINVCLB", poznamka = "GINVCLB", aktivita = "GINVCLB", dat_zmena = "GINVCLB", zmenu_prov_funkce = "GINVCLB", zmenu_prov = "GINVCLB",}
	const enum GBlogClanekPredchoziDtoTypes { ixs_clb = "string", ixs_clb_novy = "string", poznamka = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dat_zmena = "JsonDate", zmenu_prov_funkce = "Gordic.Gin.Interface.GGinszmpDto", zmenu_prov = "string",}
	/**BLOGOVÝ SYSTÉM.
	*      Read request pro předchozí články (článek navazuje na jiný)
	*/
	interface GBlogClanekPredchoziReadRequestDto {
		/**Část klíče - hlavní identifikátor pro článek*/
		ixs_clb?: string|null;
	}
	const enum GBlogClanekPredchoziReadRequestDtoNames { ixs_clb = "ixs_clb",}
	const enum GBlogClanekPredchoziReadRequestDtoFragments { ixs_clb = "*",}
	const enum GBlogClanekPredchoziReadRequestDtoTypes { ixs_clb = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogClanekUdalostiDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto pro události nad článkem blogu*/
	interface GBlogClanekUdalostiDto {
		/**Identifikátor článku*/
		ixs_clb?: string|null;
		/**Pořádové číslo*/
		ser_cislo?: number|null;
		/**Typ změny/události*/
		zmena_clb?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Textové vyjádření typu změny/události*/
		zmena_clb_txt?: string|null;
		/**Textový název referenta změny*/
		zmenu_prov_txt?: string|null;
	}
	const enum GBlogClanekUdalostiDtoNames { ixs_clb = "ixs_clb", ser_cislo = "ser_cislo", zmena_clb = "zmena_clb", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poznamka = "poznamka", zmena_clb_txt = "zmena_clb_txt", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GBlogClanekUdalostiDtoFragments { ixs_clb = "*", ser_cislo = "*", zmena_clb = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", poznamka = "*", zmena_clb_txt = "*", zmenu_prov_txt = "*",}
	const enum GBlogClanekUdalostiDtoTypes { ixs_clb = "string", ser_cislo = "number", zmena_clb = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poznamka = "string", zmena_clb_txt = "string", zmenu_prov_txt = "string",}
	const enum GBlogClanekUdalostiDtoTypeLengths { ixs_clb = 12, zmenu_prov = 12, poznamka = 254,}
	/**Dto pro vytvoření/editaci článku*/
	interface GBlogClanekUdalostiUpsertDto {
		/**Identifikátor článku*/
		ixs_clb?: string|null;
		/**Typ změny/události*/
		zmena_clb?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
	}
	const enum GBlogClanekUdalostiUpsertDtoNames { ixs_clb = "ixs_clb", zmena_clb = "zmena_clb", poznamka = "poznamka",}
	const enum GBlogClanekUdalostiUpsertDtoFragments { ixs_clb = "*", zmena_clb = "*", poznamka = "*",}
	const enum GBlogClanekUdalostiUpsertDtoTypes { ixs_clb = "string", zmena_clb = "number", poznamka = "string",}
	const enum GBlogClanekUdalostiUpsertDtoTypeLengths { ixs_clb = 12, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginsblg
	*      Dto s blogy
	*/
	interface GBlogDto {
		/**Identifikátor blogu*/
		ixs_blg?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Typ blogu*/
		typ_blg?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Příznak režimu zobrazení/přístupnosti*/
		priz_blg_all?: number|null;
		/**Textové vyjádření stavu blogu*/
		stav_txt?: string|null;
		/**Seznam článků blogu*/
		Clanky?: Gordic.Gin.Interface.GBlogClanekDto[]|null;
		/**Editoři blogu*/
		Editori?: Gordic.Gin.Interface.GBlogEditoriDto[]|null;
		/**Čtenáři blogu (konfigurační skupiny)*/
		KonfiguracniSkupiny?: Gordic.Gin.Interface.GBlogKonfigSkupinyDto[]|null;
		/**Seznam navázaných IČO blogu*/
		Icos?: Gordic.Gin.Interface.GBlogIcoDto[]|null;
		/**Seznam navázaných středisek spisových uzlů blogu*/
		Strediska?: Gordic.Gin.Interface.GBlogStrediskoDto[]|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Gin.Interface.GBlogPermissions|null;
	}
	const enum GBlogDtoNames { ixs_blg = "ixs_blg", nazev = "nazev", typ_blg = "typ_blg", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_blg_all = "priz_blg_all", stav_txt = "stav_txt", Clanky = "Clanky", Editori = "Editori", KonfiguracniSkupiny = "KonfiguracniSkupiny", Icos = "Icos", Strediska = "Strediska", Permissions = "Permissions",}
	const enum GBlogDtoFragments { ixs_blg = "Base", nazev = "Base", typ_blg = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", priz_blg_all = "Base", stav_txt = "Base", Clanky = "*", Editori = "Editori", KonfiguracniSkupiny = "KonfiguracniSkupiny", Icos = "*", Strediska = "*", Permissions = "Permissions",}
	const enum GBlogDtoTypes { ixs_blg = "string", nazev = "string", typ_blg = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_blg_all = "number", stav_txt = "string", Clanky = "Gordic.Gin.Interface.GBlogClanekDto[]", Editori = "Gordic.Gin.Interface.GBlogEditoriDto[]", KonfiguracniSkupiny = "Gordic.Gin.Interface.GBlogKonfigSkupinyDto[]", Icos = "Gordic.Gin.Interface.GBlogIcoDto[]", Strediska = "Gordic.Gin.Interface.GBlogStrediskoDto[]", Permissions = "Gordic.Gin.Interface.GBlogPermissions",}
	const enum GBlogDtoTypeLengths { ixs_blg = 12, nazev = 100, poznamka = 254, zmenu_prov = 12,}
	/**Permissions pro práci s blogem*/
	interface GBlogPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat záznam*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zveřejnit blog*/
		LzeZverejnit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit zveřejnění*/
		LzeZrusitZverejneni: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno smazat blog*/
		LzeSmazat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBlogPermissionsNames { LzeEditovat = "LzeEditovat", LzeZverejnit = "LzeZverejnit", LzeZrusitZverejneni = "LzeZrusitZverejneni", LzeSmazat = "LzeSmazat",}
	const enum GBlogPermissionsFragments { LzeEditovat = "*", LzeZverejnit = "*", LzeZrusitZverejneni = "*", LzeSmazat = "*",}
	const enum GBlogPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeSmazat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBlogPermissionsTypeLengths {}
	/**Servisní permissions pro práci s blogy*/
	interface GBlogServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno vytvořit nový blog*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBlogServicePermissionsNames { LzeNovy = "LzeNovy",}
	const enum GBlogServicePermissionsFragments { LzeNovy = "*",}
	const enum GBlogServicePermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBlogServicePermissionsTypeLengths {}
	/**Dto pro vytvoření/editaci blogu*/
	interface GBlogUpsertDto {
		/**Identifikátor blogu*/
		ixs_blg?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Příznak režimu zobrazení/přístupnosti*/
		priz_blg_all?: number|null;
		/**Seznam IČO pro vazby*/
		Icos?: string[]|null;
		/**Seznam Středisek spisových uzlů pro vazby*/
		Strediska?: string[]|null;
		/**Editoři blogu (ixs_fun)*/
		Editori?: string[]|null;
		/**Čtenáři blogu (konfigurační skupiny - ixs_usr)*/
		KonfiguracniSkupiny?: string[]|null;
	}
	const enum GBlogUpsertDtoNames { ixs_blg = "ixs_blg", nazev = "nazev", poznamka = "poznamka", priz_blg_all = "priz_blg_all", Icos = "Icos", Strediska = "Strediska", Editori = "Editori", KonfiguracniSkupiny = "KonfiguracniSkupiny",}
	const enum GBlogUpsertDtoFragments { ixs_blg = "*", nazev = "*", poznamka = "*", priz_blg_all = "*", Icos = "*", Strediska = "*", Editori = "*", KonfiguracniSkupiny = "*",}
	const enum GBlogUpsertDtoTypes { ixs_blg = "string", nazev = "string", poznamka = "string", priz_blg_all = "number", Icos = "string[]", Strediska = "string[]", Editori = "string[]", KonfiguracniSkupiny = "string[]",}
	const enum GBlogUpsertDtoTypeLengths { ixs_blg = 12, nazev = 100, poznamka = 254,}
	/**Dto pro read blogu*/
	interface GBlogReadRequestDto {
		/**Identifikátor blogu*/
		ixs_blg?: string|null;
	}
	const enum GBlogReadRequestDtoNames { ixs_blg = "ixs_blg",}
	const enum GBlogReadRequestDtoFragments { ixs_blg = "*",}
	const enum GBlogReadRequestDtoTypes { ixs_blg = "string",}
	const enum GBlogReadRequestDtoTypeLengths {}
	/**Dto pro akce nad blogem*/
	interface GBlogActionRequestDto {
		/**Identifikátor blogu*/
		ixs_blg?: string|null;
	}
	const enum GBlogActionRequestDtoNames { ixs_blg = "ixs_blg",}
	const enum GBlogActionRequestDtoFragments { ixs_blg = "*",}
	const enum GBlogActionRequestDtoTypes { ixs_blg = "string",}
	const enum GBlogActionRequestDtoTypeLengths {}
	/**Dto pro seznam ICO nad blogem*/
	interface GBlogIcoDto {
		/**ICO*/
		ico?: string|null;
		/**Textový název ICO*/
		nazev?: string|null;
	}
	const enum GBlogIcoDtoNames { ico = "ico", nazev = "nazev",}
	const enum GBlogIcoDtoFragments { ico = "*", nazev = "*",}
	const enum GBlogIcoDtoTypes { ico = "string", nazev = "string",}
	const enum GBlogIcoDtoTypeLengths {}
	/**Dto pro seznam Středisek spisových uzlů nad blogem*/
	interface GBlogStrediskoDto {
		/**Středisko spisových uzlů*/
		ixs_tre?: string|null;
		/**Textový název Střediska spisových uzlů*/
		nazev?: string|null;
	}
	const enum GBlogStrediskoDtoNames { ixs_tre = "ixs_tre", nazev = "nazev",}
	const enum GBlogStrediskoDtoFragments { ixs_tre = "*", nazev = "*",}
	const enum GBlogStrediskoDtoTypes { ixs_tre = "string", nazev = "string",}
	const enum GBlogStrediskoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogEditoriDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto pro editory blogů*/
	interface GBlogEditoriDto {
		/**DBCOLUMN:ginvblg.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginvblg.ixs_blg*/
		ixs_blg?: string|null;
		/**DBCOLUMN:ginvblg.aktivita*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**DBCOLUMN:ginvblg.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginvblg.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Název referenta*/
		nazev_ref?: string|null;
	}
	const enum GBlogEditoriDtoNames { ixs_fun = "ixs_fun", ixs_blg = "ixs_blg", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref",}
	const enum GBlogEditoriDtoFragments { ixs_fun = "*", ixs_blg = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*",}
	const enum GBlogEditoriDtoTypes { ixs_fun = "string", ixs_blg = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string",}
	const enum GBlogEditoriDtoTypeLengths { ixs_fun = 12, ixs_blg = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GBlogKonfigSkupinyDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Blogový systém - dto se čtenáři blogu (konfigurační skupiny)*/
	interface GBlogKonfigSkupinyDto {
		/**DBCOLUMN:ginvblu.ixs_usr*/
		ixs_usr?: string|null;
		/**DBCOLUMN:ginvblu.ixs_blg*/
		ixs_blg?: string|null;
		/**DBCOLUMN:ginvblu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginvblu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginvblu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Textový název konfigurační skupiny*/
		ixs_usr_txt?: string|null;
	}
	const enum GBlogKonfigSkupinyDtoNames { ixs_usr = "ixs_usr", ixs_blg = "ixs_blg", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_usr_txt = "ixs_usr_txt",}
	const enum GBlogKonfigSkupinyDtoFragments { ixs_usr = "*", ixs_blg = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_usr_txt = "*",}
	const enum GBlogKonfigSkupinyDtoTypes { ixs_usr = "string", ixs_blg = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_usr_txt = "string",}
	const enum GBlogKonfigSkupinyDtoTypeLengths { ixs_usr = 12, ixs_blg = 12, zmenu_prov = 12, ixs_usr_txt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GContextHelpBlogDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto využité pro konverzi z blogů na metodickou nápovědu dto*/
	interface GContextHelpBlogDto {
		/**Hlavní identifikátor článku*/
		ixs_clb?: string|null;
		/**Hlavní identifikátor blogu ke kterému je článek přiřazen*/
		ixs_blg?: string|null;
		/**Název článku*/
		nazev?: string|null;
		/**Tagy článku, kde jsou uloženy constraints*/
		tagy?: string|null;
		/**Priorita článku*/
		priority?: Gordic.Ginis.DbModel.GGincclbEnum|null;
		/**Datum poslední změny článku*/
		dat_zmena?: JsonDate|null;
		/**Datum potvrzení přečtení článku*/
		potvrzeno_uzivatelem?: JsonDate|null;
		/**Poslední změnu provedl*/
		zmenu_prov_funkce?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GContextHelpBlogDtoNames { ixs_clb = "ixs_clb", ixs_blg = "ixs_blg", nazev = "nazev", tagy = "tagy", priority = "priority", dat_zmena = "dat_zmena", potvrzeno_uzivatelem = "potvrzeno_uzivatelem", zmenu_prov_funkce = "zmenu_prov_funkce",}
	const enum GContextHelpBlogDtoFragments { ixs_clb = "*", ixs_blg = "*", nazev = "*", tagy = "*", priority = "*", dat_zmena = "*", potvrzeno_uzivatelem = "*", zmenu_prov_funkce = "*",}
	const enum GContextHelpBlogDtoTypes { ixs_clb = "string", ixs_blg = "string", nazev = "string", tagy = "string", priority = "Gordic.Ginis.DbModel.GGincclbEnum", dat_zmena = "JsonDate", potvrzeno_uzivatelem = "JsonDate", zmenu_prov_funkce = "Gordic.Gin.Interface.GGinszmpDto",}
	const enum GContextHelpBlogDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GEnums.d.ts 

declare namespace Gordic.Gin.Interface.GGinszmpDto {
    /**
     * Konstanty fragmentů.
     * 
     * @author  TFeik
     * @since   484.1.0.35
     */
    const enum FRAGMENT {
        BASE = "FRAGMENT_GINSZMP_BASE",
        FUNKCNI_MISTO = "FRAGMENT_GINSZMP_FUNKCNI_MISTO"
    }
}

declare namespace Gordic.Gin.Interface.GTypAgendyDto {
    type FRAGMENT = 'GINCTAG' | 'KEY' | 'TEXT' | 'SHORTCUT' | 'CATEGORY' | 'FLAGS' | 'SERVICE';
}

declare namespace Gordic.Gin.Interface.GUrovenPristupuDto {
    type FRAGMENT = 'KEY' | 'BASE' | 'TEXT' | 'ZMENA' | 'SERVICE';
}

declare namespace Gordic.Gin.Interface.GFormularDto {
    type FRAGMENT = 'KEY' | 'BASE' | 'ZMENA';
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GFormularDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Formulář.*/
	interface GFormularDto {
		/**Fragmenty.*/
		FRAGMENT_KEY?: string|null;
		/**Fragmenty.*/
		FRAGMENT_BASE?: string|null;
		/**Fragmenty.*/
		FRAGMENT_ZMENA?: string|null;
		/**Identifikátor dokumentu.*/
		ixp?: string|null;
		/**Identifikátor sestavy.*/
		ixs_frm_gform?: string|null;
		/**Identifikátor přílohy.*/
		ixb?: string|null;
		/**Datum a čas poslední změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny.*/
		zmenu_prov?: string|null;
	}
	const enum GFormularDtoNames { FRAGMENT_KEY = "FRAGMENT_KEY", FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_ZMENA = "FRAGMENT_ZMENA", ixp = "ixp", ixs_frm_gform = "ixs_frm_gform", ixb = "ixb", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GFormularDtoFragments { FRAGMENT_KEY = "*", FRAGMENT_BASE = "*", FRAGMENT_ZMENA = "*", ixp = "KEY", ixs_frm_gform = "KEY", ixb = "BASE", dat_zmena = "ZMENA", zmenu_prov = "ZMENA",}
	const enum GFormularDtoTypes { FRAGMENT_KEY = "string", FRAGMENT_BASE = "string", FRAGMENT_ZMENA = "string", ixp = "string", ixs_frm_gform = "string", ixb = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GFormularDtoTypeLengths {}
	/**Filtr formulářů.*/
	const enum GFormularFilter {
		/**Identifikátor dokumentu.*/
		ixp,
		/**Identifikátor sestavy.*/
		ixs_frm_gform,
		/**Identifikátor přílohy.*/
		ixb,
		/**Datum a čas poslední změny.*/
		dat_zmena,
		/**Identifikátor autora poslední změny.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GGinsaivDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**AI Resilver.*/
	interface GGinsaivDto {
		FRAGMENT_KEY?: string|null;
		FRAGMENT_BASE?: string|null;
		FRAGMENT_SERVICE?: string|null;
		/**Identifikátor AI Resolveru.*/
		ixs_aiv?: string|null;
		/**IČO.*/
		ico?: string|null;
		/**Poskytovatel AI Resolveru.*/
		aiv_poskyt?: Gordic.Ginis.DbModel.GGincaivEnum|null;
		/**Identifikátor OAurh profilu.*/
		ixs_oap?: string|null;
		/**Aktivita.*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Datum poslední změny.*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny.*/
		zmenu_prov?: string|null;
	}
	const enum GGinsaivDtoNames { FRAGMENT_KEY = "FRAGMENT_KEY", FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_SERVICE = "FRAGMENT_SERVICE", ixs_aiv = "ixs_aiv", ico = "ico", aiv_poskyt = "aiv_poskyt", ixs_oap = "ixs_oap", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsaivDtoFragments { FRAGMENT_KEY = "*", FRAGMENT_BASE = "*", FRAGMENT_SERVICE = "*", ixs_aiv = "KEY", ico = "BASE", aiv_poskyt = "BASE", ixs_oap = "BASE", aktivita = "BASE", dat_zmena = "SERVICE", zmenu_prov = "SERVICE",}
	const enum GGinsaivDtoTypes { FRAGMENT_KEY = "string", FRAGMENT_BASE = "string", FRAGMENT_SERVICE = "string", ixs_aiv = "string", ico = "string", aiv_poskyt = "Gordic.Ginis.DbModel.GGincaivEnum", ixs_oap = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsaivDtoTypeLengths { ico = 10,}
	/**AI Resolver - filtr.*/
	const enum GGinsaivFilter {
		/**Identifikátor AI Resolveru.*/
		ixs_aiv,
		/**IČO.*/
		ico,
		/**Poskytovatel AI Resolveru.*/
		aiv_poskyt,
		/**Identifikátor OAurh profilu.*/
		ixs_oap,
		/**Aktivita.*/
		aktivita,
		/**Datum poslední změny.*/
		dat_zmena,
		/**Autor poslední změny.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GGinscfdDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginscfd*/
	interface GGinscfdDto {
		/**DBCOLUMN:ginscfd.cs_db*/
		cs_db?: number|null;
		/**DBCOLUMN:ginscfd.typ_inst*/
		typ_inst?: number|null;
		/**DBCOLUMN:ginscfd.priz_archiv*/
		priz_archiv?: number|null;
		/**DBCOLUMN:ginscfd.priz_blob*/
		priz_blob?: number|null;
		/**Příznak zámku celé databáze pro běžné aplikace a běžné uživatele. Používá se např. při reinstalacích databáze.*/
		stav_db?: number|null;
		/**Vzkaz pro uživatele.*/
		vzkaz?: string|null;
		/**DBCOLUMN:ginscfd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginscfd.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginscfd.priz_adm*/
		priz_adm?: number|null;
		/**Datum a čas, od kdy se uživatelům začne zobrazovat avizacační text ze sloupce ginscfd.tavi*/
		dat_avi?: JsonDate|null;
		/**Čas do kterého platí licence celé DB. Po tomto čase se systém uzamkne.*/
		dat_do?: JsonDate|null;
		/**Viz. popis sloupce dat_avi*/
		tavi?: string|null;
		/**Měl to být text zobrazovaný při uzamčení databáze vypršením licenčního certifikátu. Ve výsledku se nepoužívá.*/
		tstop?: string|null;
		/**DBCOLUMN:ginscfd.s_eko*/
		s_eko?: number|null;
		/**DBCOLUMN:ginscfd.s_ssl*/
		s_ssl?: number|null;
		/**DBCOLUMN:ginscfd.s_reg*/
		s_reg?: number|null;
		/**Hlavní verze databáze systému GINIS*/
		verze_db?: number|null;
		/**Druhá část kompletní verze databáze. Tzv. subverze*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:ginscfd.pwstat*/
		pwstat?: string|null;
		/**DBCOLUMN:ginscfd.lic*/
		lic?: string|null;
		/**Pomocný technologický sloupec zajišťující jednořádkovou tabulku*/
		jeden?: number|null;
		/**DBCOLUMN:ginscfd.xxdb*/
		xxdb?: string|null;
		/**DBCOLUMN:ginscfd.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginscfd.blobsp*/
		blobsp?: string|null;
		/**DBCOLUMN:ginscfd.vzkaz_16*/
		vzkaz_16?: string|null;
		/**DBCOLUMN:ginscfd.vzkaz_32*/
		vzkaz_32?: string|null;
		/**DBCOLUMN:ginscfd.vzkaz_ww*/
		vzkaz_ww?: string|null;
		/**DBCOLUMN:ginscfd.priz_ftx*/
		priz_ftx?: number|null;
		/**DBCOLUMN:ginscfd.priz_ele*/
		priz_ele?: number|null;
		/**DBCOLUMN:ginscfd.priz_eps*/
		priz_eps?: number|null;
		/**DBCOLUMN:ginscfd.typ_srv*/
		typ_srv?: number|null;
		/**DBCOLUMN:ginscfd.projekt*/
		projekt?: string|null;
		/**Příznak, že se jedné o DEMO/TESTOVACI/SKOLICI databázi*/
		priz_d?: number|null;
		/**DBCOLUMN:ginscfd.priz_f*/
		priz_f?: number|null;
		/**Platí pouze pro INFORMIX a možná už ani tam ne. Jedná se o OS příkaz, určený pro změnu hesla uživatele*/
		zmenaa?: string|null;
		/**Identifikace typu DB stroje, na kterém je aktuální databáze GINIS provozována*/
		typ_db?: string|null;
		/**Pojmenování databáze na databázovém serveru*/
		db_name?: string|null;
		/**Jedná se o sítové jméno databázového serveru na kterém aktuálně běží instance GINIS databáze*/
		servername?: string|null;
		/**Mail o zaslání hlášení o chybách*/
		err_mail?: string|null;
		/**DBCOLUMN:ginscfd.sub_verze_dbo*/
		sub_verze_dbo?: number|null;
		/**DBCOLUMN:ginscfd.priz_edit_do*/
		priz_edit_do?: number|null;
		/**DBCOLUMN:ginscfd.int_blok_aut*/
		int_blok_aut?: number|null;
		/**DBCOLUMN:ginscfd.rrdb*/
		rrdb?: string|null;
		/**DBCOLUMN:ginscfd.dat_test_od*/
		dat_test_od?: JsonDate|null;
		/**DBCOLUMN:ginscfd.vzkaz_test*/
		vzkaz_test?: string|null;
		/**DBCOLUMN:ginscfd.vodotisk*/
		vodotisk?: string|null;
		/**DBCOLUMN:ginscfd.s_gor_event*/
		s_gor_event?: number|null;
		/**DBCOLUMN:ginscfd.cfg_uda*/
		cfg_uda?: string|null;
		/**DBCOLUMN:ginscfd.s_prep*/
		s_prep?: number|null;
		/**DBCOLUMN:ginscfd.sub_verze_adz*/
		sub_verze_adz?: number|null;
		/**DBCOLUMN:ginscfd.tyi*/
		tyi?: string|null;
		/**Hlavní kultura databáze*/
		kultura?: number|null;
		/**DBCOLUMN:ginscfd.gin_typ_inst*/
		gin_typ_inst?: string|null;
		/**Čas posledního detekovaného rebootu databázového stroje*/
		dat_last_reboot?: JsonDate|null;
		/**DBCOLUMN:ginscfd.netest_akt_adz*/
		netest_akt_adz?: number|null;
		/**DBCOLUMN:ginscfd.priz_new_db*/
		priz_new_db?: number|null;
		/**DBCOLUMN:ginscfd.priz_mail_adl*/
		priz_mail_adl?: number|null;
		/**DBCOLUMN:ginscfd.db_name_test*/
		db_name_test?: string|null;
		/**DBCOLUMN:ginscfd.servername_test*/
		servername_test?: string|null;
		/**Třetí část kompletní verze databáze.*/
		revize_adz?: number|null;
		/**Příznak, že databáze je provozována na cluster DB serveru*/
		priz_cluster?: number|null;
		/**DBCOLUMN:ginscfd.pnsdb*/
		pnsdb?: string|null;
		/**DBCOLUMN:ginscfd.pnsxxdb*/
		pnsxxdb?: string|null;
		/**DBCOLUMN:ginscfd.stat_sis_aaa*/
		stat_sis_aaa?: string|null;
		/**Příznak, že aplikace i databáze mají uživateli zajistit možnost přepnutí lokalizace aplikace, číselníků a textů v rámci SP*/
		priz_multikult?: number|null;
		/**DBCOLUMN:ginscfd.pruh_barva*/
		pruh_barva?: number|null;
		/**DBCOLUMN:ginscfd.pruh_zkratka*/
		pruh_zkratka?: string|null;
		/**DBCOLUMN:ginscfd.priz_min_rgt*/
		priz_min_rgt?: number|null;
		/**DBCOLUMN:ginscfd.mail_adl*/
		mail_adl?: string|null;
		/**DBCOLUMN:ginscfd.tel_adl*/
		tel_adl?: string|null;
		/**DBCOLUMN:ginscfd.pozn_adl*/
		pozn_adl?: string|null;
		/**DBCOLUMN:ginscfd.url_histxml*/
		url_histxml?: string|null;
		/**DBCOLUMN:ginscfd.url_gordic*/
		url_gordic?: string|null;
		/**DBCOLUMN:ginscfd.url_vsprava*/
		url_vsprava?: string|null;
		/**DBCOLUMN:ginscfd.ftp_dist*/
		ftp_dist?: string|null;
		/**DBCOLUMN:ginscfd.ftp_dist_ldb*/
		ftp_dist_ldb?: string|null;
		/**DBCOLUMN:ginscfd.ftp_dist_pdb*/
		ftp_dist_pdb?: string|null;
		/**DBCOLUMN:ginscfd.url_histxmldebug*/
		url_histxmldebug?: string|null;
		/**DBCOLUMN:ginscfd.mail_adl_info*/
		mail_adl_info?: string|null;
		/**DBCOLUMN:ginscfd.mail_chyby*/
		mail_chyby?: string|null;
		/**DBCOLUMN:ginscfd.tel_chyby*/
		tel_chyby?: string|null;
		/**DBCOLUMN:ginscfd.pozn_chyby*/
		pozn_chyby?: string|null;
		/**DBCOLUMN:ginscfd.url_teamviewer*/
		url_teamviewer?: string|null;
		/**DBCOLUMN:ginscfd.klon_id*/
		klon_id?: string|null;
		/**DBCOLUMN:ginscfd.hhdb*/
		hhdb?: string|null;
		/**Čas vzniku této databáze - prvotní inicializace databáze*/
		dat_vznik_db?: JsonDate|null;
		/**Kontrolní hash aktuálně platného/načteného licenčního certifikátu systému GINIS*/
		crc_lic?: string|null;
		/**DBCOLUMN:ginscfd.pocet_lic_r*/
		pocet_lic_r?: number|null;
		/**DBCOLUMN:ginscfd.pocet_lic_t*/
		pocet_lic_t?: number|null;
		/**DBCOLUMN:ginscfd.pocet_lic_m*/
		pocet_lic_m?: number|null;
		/**DBCOLUMN:ginscfd.pocet_lic_s*/
		pocet_lic_s?: number|null;
		/**DBCOLUMN:ginscfd.dat_ldcl*/
		dat_ldcl?: JsonDate|null;
		/**Zakódovaná podoba hesla do debug.režimu. Může být NULL a potom je heslo pevně stanoveno pro každou verzi databáze GINIS.*/
		pbug?: string|null;
		/**Písmeno přidělené pro edici systému GINIS - toto písmeno určuje rozsah funkcionality celého systému*/
		edi?: string|null;
		/**Příznak, že celá databáze je provozována v UNICODE režimu*/
		priz_unicode?: number|null;
		/**DBCOLUMN:ginscfd.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**Příznak, že databáze je provozována na cloud platformě AZURE*/
		priz_azure?: number|null;
		/**DBCOLUMN:ginscfd.idle_ping*/
		idle_ping?: number|null;
		/**DBCOLUMN:ginscfd.priz_disconnect*/
		priz_disconnect?: number|null;
		/**DBCOLUMN:ginscfd.priz_session_audit*/
		priz_session_audit?: number|null;
		/**Příznak že při přepnutí ostré databáze na DEMO databázi se může spustit proces anonymizace osobních dat*/
		priz_demo_del_esu?: number|null;
		/**DBCOLUMN:ginscfd.sessid_anon*/
		sessid_anon?: number|null;
		/**Unikátně generované ID pro každou instanci databáze - snaží se odlišit instalace ostré databáze od jejich jednotlivých kopií*/
		db_guid?: string|null;
		/**Příznak, že v databázi provozuje systém GINIS více samostatných organizací současně - jejich data by za všech okolností měla být oddělena na základě hodnoty ICO - které je pro každou samostatnou databázi unikátní.*/
		priz_multitenant?: number|null;
		/**DBCOLUMN:ginscfd.priz_ginsfil*/
		priz_ginsfil?: number|null;
		/**DBCOLUMN:ginscfd.priz_ginssou*/
		priz_ginssou?: number|null;
		/**DBCOLUMN:ginscfd.priz_vyvoj*/
		priz_vyvoj?: number|null;
		/**DBCOLUMN:ginscfd.dat_zmena_lock*/
		dat_zmena_lock?: JsonDate|null;
		/**DBCOLUMN:ginscfd.zmenu_prov_lock*/
		zmenu_prov_lock?: string|null;
		/**DBCOLUMN:ginscfd.dat_zmena_vzkaz*/
		dat_zmena_vzkaz?: JsonDate|null;
		/**DBCOLUMN:ginscfd.zmenu_prov_vzkaz*/
		zmenu_prov_vzkaz?: string|null;
		/**Příznak, že pro tuto databázi není síťově dostupný GDT portál podpory a proto se nemají on-line kontrolovat verze spouštěných GDZ balíků*/
		gdz_nocheckversion?: number|null;
		/**Povolení v rámci databáze používat vícefaktorovou autentizaci*/
		priz_totp?: number|null;
		/**DBCOLUMN:ginscfd.p_contained_users*/
		p_contained_users?: number|null;
		/**DBCOLUMN:ginscfd.url_skoleni*/
		url_skoleni?: string|null;
		/**DBCOLUMN:ginscfd.rezim_lic_cert*/
		rezim_lic_cert?: number|null;
	}
	const enum GGinscfdDtoNames { cs_db = "cs_db", typ_inst = "typ_inst", priz_archiv = "priz_archiv", priz_blob = "priz_blob", stav_db = "stav_db", vzkaz = "vzkaz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_adm = "priz_adm", dat_avi = "dat_avi", dat_do = "dat_do", tavi = "tavi", tstop = "tstop", s_eko = "s_eko", s_ssl = "s_ssl", s_reg = "s_reg", verze_db = "verze_db", sub_verze_db = "sub_verze_db", pwstat = "pwstat", lic = "lic", jeden = "jeden", xxdb = "xxdb", poznamka = "poznamka", blobsp = "blobsp", vzkaz_16 = "vzkaz_16", vzkaz_32 = "vzkaz_32", vzkaz_ww = "vzkaz_ww", priz_ftx = "priz_ftx", priz_ele = "priz_ele", priz_eps = "priz_eps", typ_srv = "typ_srv", projekt = "projekt", priz_d = "priz_d", priz_f = "priz_f", zmenaa = "zmenaa", typ_db = "typ_db", db_name = "db_name", servername = "servername", err_mail = "err_mail", sub_verze_dbo = "sub_verze_dbo", priz_edit_do = "priz_edit_do", int_blok_aut = "int_blok_aut", rrdb = "rrdb", dat_test_od = "dat_test_od", vzkaz_test = "vzkaz_test", vodotisk = "vodotisk", s_gor_event = "s_gor_event", cfg_uda = "cfg_uda", s_prep = "s_prep", sub_verze_adz = "sub_verze_adz", tyi = "tyi", kultura = "kultura", gin_typ_inst = "gin_typ_inst", dat_last_reboot = "dat_last_reboot", netest_akt_adz = "netest_akt_adz", priz_new_db = "priz_new_db", priz_mail_adl = "priz_mail_adl", db_name_test = "db_name_test", servername_test = "servername_test", revize_adz = "revize_adz", priz_cluster = "priz_cluster", pnsdb = "pnsdb", pnsxxdb = "pnsxxdb", stat_sis_aaa = "stat_sis_aaa", priz_multikult = "priz_multikult", pruh_barva = "pruh_barva", pruh_zkratka = "pruh_zkratka", priz_min_rgt = "priz_min_rgt", mail_adl = "mail_adl", tel_adl = "tel_adl", pozn_adl = "pozn_adl", url_histxml = "url_histxml", url_gordic = "url_gordic", url_vsprava = "url_vsprava", ftp_dist = "ftp_dist", ftp_dist_ldb = "ftp_dist_ldb", ftp_dist_pdb = "ftp_dist_pdb", url_histxmldebug = "url_histxmldebug", mail_adl_info = "mail_adl_info", mail_chyby = "mail_chyby", tel_chyby = "tel_chyby", pozn_chyby = "pozn_chyby", url_teamviewer = "url_teamviewer", klon_id = "klon_id", hhdb = "hhdb", dat_vznik_db = "dat_vznik_db", crc_lic = "crc_lic", pocet_lic_r = "pocet_lic_r", pocet_lic_t = "pocet_lic_t", pocet_lic_m = "pocet_lic_m", pocet_lic_s = "pocet_lic_s", dat_ldcl = "dat_ldcl", pbug = "pbug", edi = "edi", priz_unicode = "priz_unicode", dat_mpd = "dat_mpd", priz_azure = "priz_azure", idle_ping = "idle_ping", priz_disconnect = "priz_disconnect", priz_session_audit = "priz_session_audit", priz_demo_del_esu = "priz_demo_del_esu", sessid_anon = "sessid_anon", db_guid = "db_guid", priz_multitenant = "priz_multitenant", priz_ginsfil = "priz_ginsfil", priz_ginssou = "priz_ginssou", priz_vyvoj = "priz_vyvoj", dat_zmena_lock = "dat_zmena_lock", zmenu_prov_lock = "zmenu_prov_lock", dat_zmena_vzkaz = "dat_zmena_vzkaz", zmenu_prov_vzkaz = "zmenu_prov_vzkaz", gdz_nocheckversion = "gdz_nocheckversion", priz_totp = "priz_totp", p_contained_users = "p_contained_users", url_skoleni = "url_skoleni", rezim_lic_cert = "rezim_lic_cert",}
	const enum GGinscfdDtoFragments { cs_db = "*", typ_inst = "*", priz_archiv = "*", priz_blob = "*", stav_db = "*", vzkaz = "*", dat_zmena = "*", zmenu_prov = "*", priz_adm = "*", dat_avi = "*", dat_do = "*", tavi = "*", tstop = "*", s_eko = "*", s_ssl = "*", s_reg = "*", verze_db = "*", sub_verze_db = "*", pwstat = "*", lic = "*", jeden = "*", xxdb = "*", poznamka = "*", blobsp = "*", vzkaz_16 = "*", vzkaz_32 = "*", vzkaz_ww = "*", priz_ftx = "*", priz_ele = "*", priz_eps = "*", typ_srv = "*", projekt = "*", priz_d = "*", priz_f = "*", zmenaa = "*", typ_db = "*", db_name = "*", servername = "*", err_mail = "*", sub_verze_dbo = "*", priz_edit_do = "*", int_blok_aut = "*", rrdb = "*", dat_test_od = "*", vzkaz_test = "*", vodotisk = "*", s_gor_event = "*", cfg_uda = "*", s_prep = "*", sub_verze_adz = "*", tyi = "*", kultura = "*", gin_typ_inst = "*", dat_last_reboot = "*", netest_akt_adz = "*", priz_new_db = "*", priz_mail_adl = "*", db_name_test = "*", servername_test = "*", revize_adz = "*", priz_cluster = "*", pnsdb = "*", pnsxxdb = "*", stat_sis_aaa = "*", priz_multikult = "*", pruh_barva = "*", pruh_zkratka = "*", priz_min_rgt = "*", mail_adl = "*", tel_adl = "*", pozn_adl = "*", url_histxml = "*", url_gordic = "*", url_vsprava = "*", ftp_dist = "*", ftp_dist_ldb = "*", ftp_dist_pdb = "*", url_histxmldebug = "*", mail_adl_info = "*", mail_chyby = "*", tel_chyby = "*", pozn_chyby = "*", url_teamviewer = "*", klon_id = "*", hhdb = "*", dat_vznik_db = "*", crc_lic = "*", pocet_lic_r = "*", pocet_lic_t = "*", pocet_lic_m = "*", pocet_lic_s = "*", dat_ldcl = "*", pbug = "*", edi = "*", priz_unicode = "*", dat_mpd = "*", priz_azure = "*", idle_ping = "*", priz_disconnect = "*", priz_session_audit = "*", priz_demo_del_esu = "*", sessid_anon = "*", db_guid = "*", priz_multitenant = "*", priz_ginsfil = "*", priz_ginssou = "*", priz_vyvoj = "*", dat_zmena_lock = "*", zmenu_prov_lock = "*", dat_zmena_vzkaz = "*", zmenu_prov_vzkaz = "*", gdz_nocheckversion = "*", priz_totp = "*", p_contained_users = "*", url_skoleni = "*", rezim_lic_cert = "*",}
	const enum GGinscfdDtoTypes { cs_db = "number", typ_inst = "number", priz_archiv = "number", priz_blob = "number", stav_db = "number", vzkaz = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_adm = "number", dat_avi = "JsonDate", dat_do = "JsonDate", tavi = "string", tstop = "string", s_eko = "number", s_ssl = "number", s_reg = "number", verze_db = "number", sub_verze_db = "number", pwstat = "string", lic = "string", jeden = "number", xxdb = "string", poznamka = "string", blobsp = "string", vzkaz_16 = "string", vzkaz_32 = "string", vzkaz_ww = "string", priz_ftx = "number", priz_ele = "number", priz_eps = "number", typ_srv = "number", projekt = "string", priz_d = "number", priz_f = "number", zmenaa = "string", typ_db = "string", db_name = "string", servername = "string", err_mail = "string", sub_verze_dbo = "number", priz_edit_do = "number", int_blok_aut = "number", rrdb = "string", dat_test_od = "JsonDate", vzkaz_test = "string", vodotisk = "string", s_gor_event = "number", cfg_uda = "string", s_prep = "number", sub_verze_adz = "number", tyi = "string", kultura = "number", gin_typ_inst = "string", dat_last_reboot = "JsonDate", netest_akt_adz = "number", priz_new_db = "number", priz_mail_adl = "number", db_name_test = "string", servername_test = "string", revize_adz = "number", priz_cluster = "number", pnsdb = "string", pnsxxdb = "string", stat_sis_aaa = "string", priz_multikult = "number", pruh_barva = "number", pruh_zkratka = "string", priz_min_rgt = "number", mail_adl = "string", tel_adl = "string", pozn_adl = "string", url_histxml = "string", url_gordic = "string", url_vsprava = "string", ftp_dist = "string", ftp_dist_ldb = "string", ftp_dist_pdb = "string", url_histxmldebug = "string", mail_adl_info = "string", mail_chyby = "string", tel_chyby = "string", pozn_chyby = "string", url_teamviewer = "string", klon_id = "string", hhdb = "string", dat_vznik_db = "JsonDate", crc_lic = "string", pocet_lic_r = "number", pocet_lic_t = "number", pocet_lic_m = "number", pocet_lic_s = "number", dat_ldcl = "JsonDate", pbug = "string", edi = "string", priz_unicode = "number", dat_mpd = "JsonDate", priz_azure = "number", idle_ping = "number", priz_disconnect = "number", priz_session_audit = "number", priz_demo_del_esu = "number", sessid_anon = "number", db_guid = "string", priz_multitenant = "number", priz_ginsfil = "number", priz_ginssou = "number", priz_vyvoj = "number", dat_zmena_lock = "JsonDate", zmenu_prov_lock = "string", dat_zmena_vzkaz = "JsonDate", zmenu_prov_vzkaz = "string", gdz_nocheckversion = "number", priz_totp = "number", p_contained_users = "number", url_skoleni = "string", rezim_lic_cert = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GGinspodDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginspod*/
	interface GGinspodDto {
		/**DBCOLUMN:ginspod.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginspod.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginspod.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginspod.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginspod.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginspod.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginspod.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginspod.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginspod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginspod.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginspod.nazev*/
		nazev?: string|null;
		/**Příznak, že spisový uzel funguje jako podatelna*/
		priz_pod?: number|null;
		/**Příznak, že spisový uzel funguje jako výpravna*/
		priz_vyp?: number|null;
		/**ID nadřízeného spisového uzlu. Uzly tvoří stromovou strukturu na jejímž vrcholu stojí hlavní podatelna a nad ní uzel Neurčeno.*/
		ixs_nad?: string|null;
		/**Licence databáze ke které organizačně spisový uzel přísluší. Má význam pouze na MO ČR*/
		lic_adr?: string|null;
		/**DBCOLUMN:ginspod.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:ginspod.cs_nazev*/
		cs_nazev?: string|null;
		/**Pomocný sloupec který se neukazuje. Obsahuje počet podřízených spisových uzlů. Průběžně se udržuje a pomáhá při vykreslení stromu spisových uzlů - tzv. podací graf*/
		num_pod?: number|null;
		/**Kontaktní mail na spisový uzel*/
		mail?: string|null;
		/**DBCOLUMN:ginspod.url*/
		url?: string|null;
		/**Příznak, že se nejedná o skutečný spisový uzel ale pouze o skupiny kurýrů, kteří zajišťují přesun dokumentů mezi spisovými uzly. Nejsou logickou součástí podacího grafu a účastní se redistribucí ale tak, že nemění plánování tras.*/
		priz_kur?: number|null;
		/**Funkční místo, které zodpovídá za spisový uzel z pohledu redistribuce dokumnetů. Často se jedná o sekretářku, která přerozděluje dokumenty v rámci uzlu a v některých případech vystupuje za celý uzel.*/
		ixs_fun?: string|null;
		/**Středisko spisových uzlů ke kterému spisový uzel náleží. Od střediska se odvozuje Interní subjekt a tím i organizace a IČO ke které uzel patří*/
		ixs_tre?: string|null;
		/**Příznak elektronické podatelny*/
		priz_evy?: number|null;
		/**Příznak, že záznam vznikl prostřednictvím interface.*/
		z_int?: number|null;
		/**Čas vzniku záznamu.*/
		dat_mpd?: JsonDate|null;
		/**Příznak, že v rámci redistribucí dokumentů je tento uzel průtokový. Tedy při výpočtu další trasy dokumentu tento uzel není do trasy zahrnut jako další cíl - je přeskakován.*/
		priz_prut?: number|null;
		/**Příznak, že se jedná o servisní uzel. Při redistribucích se uživatelům tento uzel nenabízí jako cíl pro předání. Jsou na něm umístěny uživatelů systémových služeb, např. ZUDu.*/
		priz_servis?: number|null;
		/**Kontaktní telefon na spisový uzel*/
		tel?: string|null;
		/**Kontaktní fax na spisový uzel*/
		fax?: string|null;
		/**DBCOLUMN:ginspod.ixs_lpc*/
		ixs_lpc?: string|null;
		/**IČO interního subjeltu ke kterému spisový uzel přísluší*/
		ico?: string|null;
		/**Externí systém typu AIS, na který se mají předat přes rozhraní dokumenty v případě, že je dokument předán a tento spisový uzel*/
		ixs_ext_ais?: string|null;
	}
	const enum GGinspodDtoNames { ixs_su = "ixs_su", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", priz_pod = "priz_pod", priz_vyp = "priz_vyp", ixs_nad = "ixs_nad", lic_adr = "lic_adr", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", url = "url", priz_kur = "priz_kur", ixs_fun = "ixs_fun", ixs_tre = "ixs_tre", priz_evy = "priz_evy", z_int = "z_int", dat_mpd = "dat_mpd", priz_prut = "priz_prut", priz_servis = "priz_servis", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", ixs_ext_ais = "ixs_ext_ais",}
	const enum GGinspodDtoFragments { ixs_su = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", priz_pod = "*", priz_vyp = "*", ixs_nad = "*", lic_adr = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", url = "*", priz_kur = "*", ixs_fun = "*", ixs_tre = "*", priz_evy = "*", z_int = "*", dat_mpd = "*", priz_prut = "*", priz_servis = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", ixs_ext_ais = "*",}
	const enum GGinspodDtoTypes { ixs_su = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", priz_pod = "number", priz_vyp = "number", ixs_nad = "string", lic_adr = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", url = "string", priz_kur = "number", ixs_fun = "string", ixs_tre = "string", priz_evy = "number", z_int = "number", dat_mpd = "JsonDate", priz_prut = "number", priz_servis = "number", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", ixs_ext_ais = "string",}
	const enum GGinspodFilter {
		/**identifikátor funkce*/
		ixs_su,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GGinsusrDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginsusr*/
	interface GGinsusrDto {
		/**Konfigurační skupina slouží pro sdružení uživatelů, kteří mají povolenu stejnou kolekci instancí programovách fází*/
		ixs_usr?: string|null;
		/**DBCOLUMN:ginsusr.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsusr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsusr.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsusr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsusr.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsusr.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsusr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsusr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsusr.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsusr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsusr.ktg_usr*/
		ktg_usr?: number|null;
		/**DBCOLUMN:ginsusr.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsusr.typ_usr*/
		typ_usr?: number|null;
		/**ID přihlášení, které realizovalo poslední změnu tohot záznamu*/
		ixs_lpc?: string|null;
	}
	const enum GGinsusrDtoNames { ixs_usr = "ixs_usr", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ktg_usr = "ktg_usr", dat_mpd = "dat_mpd", typ_usr = "typ_usr", ixs_lpc = "ixs_lpc",}
	const enum GGinsusrDtoFragments { ixs_usr = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ktg_usr = "*", dat_mpd = "*", typ_usr = "*", ixs_lpc = "*",}
	const enum GGinsusrDtoTypes { ixs_usr = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ktg_usr = "number", dat_mpd = "JsonDate", typ_usr = "number", ixs_lpc = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GGinszmpDto.d.ts 

declare namespace Gordic.Gin.Interface {
    /**Autor změny dokumentu (dto).*/
	interface GGinszmpDto {
        /**Konstanty fragmentů.*/
		FRAGMENT_BASE?: string|null;
        /**Konstanty fragmentů.*/
		FRAGMENT_FUNKCNI_MISTO?: string|null;
        /**Součtové-kumulativní informace identifikující kdo realizoval změnu*/
		ixs_zmp?: string|null;
        /**DBCOLUMN:ginszmp.lic*/
		lic?: string|null;
        /**DBCOLUMN:ginszmp.aktivita*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
        /**DBCOLUMN:ginszmp.arw*/
		arw?: number|null;
        /**DBCOLUMN:ginszmp.dat_zmena*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:ginszmp.zmenu_prov*/
		zmenu_prov?: string|null;
        /**DBCOLUMN:ginszmp.ixs_ref*/
		ixs_ref?: string|null;
        /**Funkční místo.*/
		FunkcniMisto?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
        /**DBCOLUMN:ginszmp.ixs_su*/
		ixs_su?: string|null;
        /**DBCOLUMN:ginszmp.ixs_orj*/
		ixs_orj?: string|null;
        /**DBCOLUMN:ginszmp.nazev_ref*/
		nazev_ref?: string|null;
        /**Název funkřního místa*/
		nazev_fun?: string|null;
        /**Název spisového uzlu*/
		nazev_su?: string|null;
        /**Název organizační jednotky*/
		nazev_orj?: string|null;
        /**DBCOLUMN:ginszmp.typ_zmp*/
		typ_zmp?: Gordic.Ginis.DbModel.GGinczmpEnum|null;
        /**DBCOLUMN:ginszmp.dat_mpd*/
		dat_mpd?: JsonDate|null;
        /**DBCOLUMN:ginszmp.nazev_rf*/
		nazev_rf?: string|null;
        /**DBCOLUMN:ginszmp.jmeno*/
		jmeno?: string|null;
        /**DBCOLUMN:ginszmp.prijmeni*/
		prijmeni?: string|null;
        /**DBCOLUMN:ginszmp.tit_pred*/
		tit_pred?: string|null;
        /**DBCOLUMN:ginszmp.tit_za*/
		tit_za?: string|null;
	}
	const enum GGinszmpDtoNames { FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_FUNKCNI_MISTO = "FRAGMENT_FUNKCNI_MISTO", ixs_zmp = "ixs_zmp", lic = "lic", aktivita = "aktivita", arw = "arw", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_ref = "ixs_ref", FunkcniMisto = "FunkcniMisto", ixs_su = "ixs_su", ixs_orj = "ixs_orj", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", nazev_su = "nazev_su", nazev_orj = "nazev_orj", typ_zmp = "typ_zmp", dat_mpd = "dat_mpd", nazev_rf = "nazev_rf", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za",}
	const enum GGinszmpDtoFragments { FRAGMENT_BASE = "*", FRAGMENT_FUNKCNI_MISTO = "*", ixs_zmp = "*", lic = "FRAGMENT_GINSZMP_BASE", aktivita = "FRAGMENT_GINSZMP_BASE", arw = "FRAGMENT_GINSZMP_BASE", dat_zmena = "FRAGMENT_GINSZMP_BASE", zmenu_prov = "FRAGMENT_GINSZMP_BASE", ixs_ref = "FRAGMENT_GINSZMP_BASE", FunkcniMisto = "FRAGMENT_GINSZMP_FUNKCNI_MISTO", ixs_su = "FRAGMENT_GINSZMP_BASE", ixs_orj = "FRAGMENT_GINSZMP_BASE", nazev_ref = "FRAGMENT_GINSZMP_BASE", nazev_fun = "FRAGMENT_GINSZMP_BASE", nazev_su = "FRAGMENT_GINSZMP_BASE", nazev_orj = "FRAGMENT_GINSZMP_BASE", typ_zmp = "FRAGMENT_GINSZMP_BASE", dat_mpd = "FRAGMENT_GINSZMP_BASE", nazev_rf = "FRAGMENT_GINSZMP_BASE", jmeno = "FRAGMENT_GINSZMP_BASE", prijmeni = "FRAGMENT_GINSZMP_BASE", tit_pred = "FRAGMENT_GINSZMP_BASE", tit_za = "FRAGMENT_GINSZMP_BASE",}
	const enum GGinszmpDtoTypes { FRAGMENT_BASE = "string", FRAGMENT_FUNKCNI_MISTO = "string", ixs_zmp = "string", lic = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", arw = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_ref = "string", FunkcniMisto = "Gordic.Gin.Interface.GFunkcniMistoDto", ixs_su = "string", ixs_orj = "string", nazev_ref = "string", nazev_fun = "string", nazev_su = "string", nazev_orj = "string", typ_zmp = "Gordic.Ginis.DbModel.GGinczmpEnum", dat_mpd = "JsonDate", nazev_rf = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string",}
    /**Autor změny dokumentu.*/
	const enum GGinszmpFilter {
        /**Součtové-kumulativní informace identifikující kdo realizoval změnu*/
		ixs_zmp//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.lic*/
		lic//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.aktivita*/
		aktivita//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.arw*/
		arw//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.dat_zmena*/
		dat_zmena//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.zmenu_prov*/
		zmenu_prov//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.ixs_ref*/
		ixs_ref//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.ixs_fun*/
		ixs_fun//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.ixs_su*/
		ixs_su//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.ixs_orj*/
		ixs_orj//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.nazev_ref*/
		nazev_ref//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Název funkřního místa*/
		nazev_fun//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Název spisového uzlu*/
		nazev_su//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Název organizační jednotky*/
		nazev_orj//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.typ_zmp*/
		typ_zmp//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.dat_mpd*/
		dat_mpd//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.nazev_rf*/
		nazev_rf//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.jmeno*/
		jmeno//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.prijmeni*/
		prijmeni//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.tit_pred*/
		tit_pred//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**DBCOLUMN:ginszmp.tit_za*/
		tit_za//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GMaskaTypeDefinitionDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto pro definici datových typů hodnot filtrů masek.*/
	interface GMaskaTypeDefinitionDto {
		Key?: string|null;
		Type?: Gordic.Gin.Interface.GMaskaValueType|null;
	}
	const enum GMaskaTypeDefinitionDtoNames { Key = "Key", Type = "Type",}
	const enum GMaskaTypeDefinitionDtoFragments { Key = "*", Type = "*",}
	const enum GMaskaTypeDefinitionDtoTypes { Key = "string", Type = "Gordic.Gin.Interface.GMaskaValueType",}
	const enum GMaskaTypeDefinitionDtoTypeLengths {}
	/**Typ hodnoty filtrů masek.*/
	const enum GMaskaValueType {
		None,
		GString,
		GInt16,
		GInt32,
		GInt64,
		GDecimal,
		GBoolean,
		GDate,
		GDateTime,
		Array,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GRevizeDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Revize.*/
	interface GRevizeDto {
		/**Název.*/
		Name?: string|null;
	}
	const enum GRevizeDtoNames { Name = "Name",}
	const enum GRevizeDtoFragments { Name = "*",}
	const enum GRevizeDtoTypes { Name = "string",}
	const enum GRevizeDtoTypeLengths {}
	/**Filtr revizí.*/
	const enum GRevizeFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GSeznamMasekDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**SeznamMasekDataSet.SeznamMasekRow*/
	interface GSeznamMasekDto {
		/**Autogenerated.*/
		ixs_mas?: string|null;
		/**Název uloženého filtru.*/
		gfilterpanel_name?: string|null;
		/**Autogenerated.*/
		tema?: string|null;
		/**Autogenerated.*/
		typ_masky?: Gordic.Gin.Interface.TypMaskyEnum|null;
		/**Autogenerated.*/
		typ_masky_txt?: string|null;
		/**Autogenerated.*/
		gfilterpanel_poznamka?: string|null;
		/**Autogenerated.*/
		gfilterpanel_dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		gfilterpanel_zmenu_prov?: string|null;
		/**Autogenerated.*/
		gfilterpanel_zmenu_prov_txt?: string|null;
		/**Autogenerated.*/
		gfilterpanel_aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Data filtru serializovaná do strngu. Pokud můžete, tak využijte vlastnost dataInFilter která pracuje s objektem.*/
		dataInFilterString?: string|null;
	}
	const enum GSeznamMasekDtoNames { ixs_mas = "ixs_mas", gfilterpanel_name = "gfilterpanel_name", tema = "tema", typ_masky = "typ_masky", typ_masky_txt = "typ_masky_txt", gfilterpanel_poznamka = "gfilterpanel_poznamka", gfilterpanel_dat_zmena = "gfilterpanel_dat_zmena", gfilterpanel_zmenu_prov = "gfilterpanel_zmenu_prov", gfilterpanel_zmenu_prov_txt = "gfilterpanel_zmenu_prov_txt", gfilterpanel_aktivita = "gfilterpanel_aktivita", dataInFilterString = "dataInFilterString",}
	const enum GSeznamMasekDtoFragments { ixs_mas = "*", gfilterpanel_name = "*", tema = "*", typ_masky = "*", typ_masky_txt = "*", gfilterpanel_poznamka = "*", gfilterpanel_dat_zmena = "*", gfilterpanel_zmenu_prov = "*", gfilterpanel_zmenu_prov_txt = "*", gfilterpanel_aktivita = "*", dataInFilterString = "*",}
	const enum GSeznamMasekDtoTypes { ixs_mas = "string", gfilterpanel_name = "string", tema = "string", typ_masky = "Gordic.Gin.Interface.TypMaskyEnum", typ_masky_txt = "string", gfilterpanel_poznamka = "string", gfilterpanel_dat_zmena = "JsonDate", gfilterpanel_zmenu_prov = "string", gfilterpanel_zmenu_prov_txt = "string", gfilterpanel_aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dataInFilterString = "string",}
	const enum GSeznamMasekDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GTypAgendyDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Typ agendy (dto) - ginctag.*/
	interface GTypAgendyDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_GINCTAG?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_KEY?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_TEXT?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_SHORTCUT?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_CATEGORY?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_FLAGS?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_SERVICE?: string|null;
		/**The typ ag.*/
		typ_ag?: number|null;
		/**The typ ag text.*/
		typ_ag_txt?: string|null;
		/**Gets or sets the k v.*/
		k_v?: number|null;
		/**Gets or sets the k s.*/
		k_s?: string|null;
		/**Gets or sets the typ uct.*/
		typ_uct?: number|null;
		/**Gets or sets the ZKR ag.*/
		zkr_ag?: string|null;
		/**Gets or sets the KTG ag.*/
		ktg_ag?: number|null;
		/**Gets or sets the priz ext.*/
		priz_ext?: number|null;
		/**Gets or sets the priz ekovago.*/
		priz_ekovago?: number|null;
		/**Gets or sets the k XML.*/
		k_xml?: string|null;
		/**Gets or sets the ixs ext.*/
		ixs_ext?: string|null;
		/**Gets or sets the typ ag RSG.*/
		typ_ag_rsx?: number|null;
	}
	const enum GTypAgendyDtoNames { FRAGMENT_GINCTAG = "FRAGMENT_GINCTAG", FRAGMENT_KEY = "FRAGMENT_KEY", FRAGMENT_TEXT = "FRAGMENT_TEXT", FRAGMENT_SHORTCUT = "FRAGMENT_SHORTCUT", FRAGMENT_CATEGORY = "FRAGMENT_CATEGORY", FRAGMENT_FLAGS = "FRAGMENT_FLAGS", FRAGMENT_SERVICE = "FRAGMENT_SERVICE", typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", k_v = "k_v", k_s = "k_s", typ_uct = "typ_uct", zkr_ag = "zkr_ag", ktg_ag = "ktg_ag", priz_ext = "priz_ext", priz_ekovago = "priz_ekovago", k_xml = "k_xml", ixs_ext = "ixs_ext", typ_ag_rsx = "typ_ag_rsx",}
	const enum GTypAgendyDtoFragments { FRAGMENT_GINCTAG = "*", FRAGMENT_KEY = "*", FRAGMENT_TEXT = "*", FRAGMENT_SHORTCUT = "*", FRAGMENT_CATEGORY = "*", FRAGMENT_FLAGS = "*", FRAGMENT_SERVICE = "*", typ_ag = "KEY", typ_ag_txt = "TEXT", k_v = "SERVICE", k_s = "SERVICE", typ_uct = "GINCTAG", zkr_ag = "SHORTCUT", ktg_ag = "CATEGORY", priz_ext = "FLAGS", priz_ekovago = "FLAGS", k_xml = "SERVICE", ixs_ext = "GINCTAG", typ_ag_rsx = "SERVICE",}
	const enum GTypAgendyDtoTypes { FRAGMENT_GINCTAG = "string", FRAGMENT_KEY = "string", FRAGMENT_TEXT = "string", FRAGMENT_SHORTCUT = "string", FRAGMENT_CATEGORY = "string", FRAGMENT_FLAGS = "string", FRAGMENT_SERVICE = "string", typ_ag = "number", typ_ag_txt = "string", k_v = "number", k_s = "string", typ_uct = "number", zkr_ag = "string", ktg_ag = "number", priz_ext = "number", priz_ekovago = "number", k_xml = "string", ixs_ext = "string", typ_ag_rsx = "number",}
	const enum GTypAgendyDtoTypeLengths { typ_ag_txt = 100, k_s = 15, zkr_ag = 3, k_xml = 254,}
	/**GTypAgendyFilter*/
	const enum GTypAgendyFilter {
		/**The typ ag*/
		typ_ag,
		/**The typ ag text*/
		typ_ag_txt,
		/**The k v*/
		k_v,
		/**The k s*/
		k_s,
		/**The typ uct*/
		typ_uct,
		/**The ZKR ag*/
		zkr_ag,
		/**The KTG ag*/
		ktg_ag,
		/**The priz ext*/
		priz_ext,
		/**The priz ekovago*/
		priz_ekovago,
		/**The k XML*/
		k_xml,
		/**The ixs ext*/
		ixs_ext,
		/**The typ ag RSG*/
		typ_ag_rsx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GTypSpousteciUdalostiDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Typ spouštěcí události (DTO).*/
	interface GTypSpousteciUdalostiDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_KEY?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_BASE?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_TEXT?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_POZNAMKA?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_SERVICE?: string|null;
		/**Identifikátor.*/
		ixs_spu?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu.*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu.*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt.*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Datum a čas poslední změny tohoto záznamu.*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp.*/
		zmenu_prov?: string|null;
	}
	const enum GTypSpousteciUdalostiDtoNames { FRAGMENT_KEY = "FRAGMENT_KEY", FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_TEXT = "FRAGMENT_TEXT", FRAGMENT_POZNAMKA = "FRAGMENT_POZNAMKA", FRAGMENT_SERVICE = "FRAGMENT_SERVICE", ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GTypSpousteciUdalostiDtoFragments { FRAGMENT_KEY = "*", FRAGMENT_BASE = "*", FRAGMENT_TEXT = "*", FRAGMENT_POZNAMKA = "*", FRAGMENT_SERVICE = "*", ixs_spu = "KEY", zkratka = "TEXT", nazev = "TEXT", poznamka = "POZNAMKA", dat_od = "BASE", dat_do = "BASE", aktivita = "SERVICE", dat_zmena = "SERVICE", zmenu_prov = "SERVICE",}
	const enum GTypSpousteciUdalostiDtoTypes { FRAGMENT_KEY = "string", FRAGMENT_BASE = "string", FRAGMENT_TEXT = "string", FRAGMENT_POZNAMKA = "string", FRAGMENT_SERVICE = "string", ixs_spu = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GTypSpousteciUdalostiDtoTypeLengths { zkratka = 16, nazev = 100, poznamka = 254,}
	/**Typ spouštěcí události (filtr).*/
	const enum GTypSpousteciUdalostiFilter {
		/**Identifikátor.*/
		ixs_spu,
		/**Zkratka.*/
		zkratka,
		/**Název.*/
		nazev,
		/**Všeobecná textová poznámka*/
		poznamka,
		/**Datum počátku platnosti záznamu.*/
		dat_od,
		/**Datum konce platnosti záznamu.*/
		dat_do,
		/**Aktivita záznamu dle gincakt.*/
		aktivita,
		/**Datum a čas poslední změny tohoto záznamu.*/
		dat_zmena,
		/**Autor poslední změny záznamu dle ginszmp.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Dto\GUrovenPristupuDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Úroveň přístupu.*/
	interface GUrovenPristupuDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_KEY?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_BASE?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_TEXT?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_ZMENA?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_SERVICE?: string|null;
		/**Interní identifikátor úrovně přístupu k dokumnetům.*/
		st_utaj_id?: number|null;
		/**Uživatelská forma číselníku úrovně přístupu uživatelů k dokumentu*/
		st_utaj_id_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů.*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů.*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt.*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Originální identifikátor úrovně přístupu.*/
		st_utaj_id_orig?: Gordic.Ginis.DbModel.GGincstuEnum|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML.*/
		k_xml?: string|null;
		/**Datum a čas poslední změny.*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny.*/
		zmenu_prov?: string|null;
		/**ID přihlášení.*/
		ixs_lpc?: string|null;
		/**st_utaj_id_rsx.*/
		st_utaj_id_rsx?: number|null;
		/**Režim nakládání.*/
		rezim_nakl?: number|null;
		/**Stupeň utajení.*/
		stupen_utaj?: number|null;
		/**Mezinárodní název.*/
		nazev_mezinar?: string|null;
		/**Mezinárodní zkratka.*/
		zkratka_mezinar?: string|null;
	}
	const enum GUrovenPristupuDtoNames { FRAGMENT_KEY = "FRAGMENT_KEY", FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_TEXT = "FRAGMENT_TEXT", FRAGMENT_ZMENA = "FRAGMENT_ZMENA", FRAGMENT_SERVICE = "FRAGMENT_SERVICE", st_utaj_id = "st_utaj_id", st_utaj_id_txt = "st_utaj_id_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", zkratka = "zkratka", st_utaj_id_orig = "st_utaj_id_orig", k_xml = "k_xml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", st_utaj_id_rsx = "st_utaj_id_rsx", rezim_nakl = "rezim_nakl", stupen_utaj = "stupen_utaj", nazev_mezinar = "nazev_mezinar", zkratka_mezinar = "zkratka_mezinar",}
	const enum GUrovenPristupuDtoFragments { FRAGMENT_KEY = "*", FRAGMENT_BASE = "*", FRAGMENT_TEXT = "*", FRAGMENT_ZMENA = "*", FRAGMENT_SERVICE = "*", st_utaj_id = "KEY", st_utaj_id_txt = "TEXT", k_v = "SERVICE", k_s = "SERVICE", aktivita = "BASE", zkratka = "TEXT", st_utaj_id_orig = "BASE", k_xml = "SERVICE", dat_zmena = "ZMENA", zmenu_prov = "ZMENA", ixs_lpc = "SERVICE", st_utaj_id_rsx = "SERVICE", rezim_nakl = "BASE", stupen_utaj = "BASE", nazev_mezinar = "TEXT", zkratka_mezinar = "TEXT",}
	const enum GUrovenPristupuDtoTypes { FRAGMENT_KEY = "string", FRAGMENT_BASE = "string", FRAGMENT_TEXT = "string", FRAGMENT_ZMENA = "string", FRAGMENT_SERVICE = "string", st_utaj_id = "number", st_utaj_id_txt = "string", k_v = "number", k_s = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", zkratka = "string", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum", k_xml = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", st_utaj_id_rsx = "number", rezim_nakl = "number", stupen_utaj = "number", nazev_mezinar = "string", zkratka_mezinar = "string",}
	const enum GUrovenPristupuDtoTypeLengths { st_utaj_id_txt = 50, k_s = 15, zkratka = 5, k_xml = 254, nazev_mezinar = 254, zkratka_mezinar = 16,}
	/**Filtr pro úroveň přístupu.*/
	const enum GUrovenPristupuFilter {
		/**Interní identifikátor úrovně přístupu k dokumnetům*/
		st_utaj_id,
		/**Uživatelská forma číselníku úrovně přístupu uživatelů k dokumentu*/
		st_utaj_id_txt,
		/**DBCOLUMN:gincstu.k_v*/
		k_v,
		/**DBCOLUMN:gincstu.k_s*/
		k_s,
		/**DBCOLUMN:gincstu.aktivita*/
		aktivita,
		/**DBCOLUMN:gincstu.zkratka*/
		zkratka,
		/**DBCOLUMN:gincstu.st_utaj_id_orig*/
		st_utaj_id_orig,
		/**DBCOLUMN:gincstu.k_xml*/
		k_xml,
		/**DBCOLUMN:gincstu.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:gincstu.zmenu_prov*/
		zmenu_prov,
		/**DBCOLUMN:gincstu.ixs_lpc*/
		ixs_lpc,
		/**DBCOLUMN:gincstu.st_utaj_id_rsx*/
		st_utaj_id_rsx,
		/**DBCOLUMN:gincstu.rezim_nakl*/
		rezim_nakl,
		/**DBCOLUMN:gincstu.stupen_utaj*/
		stupen_utaj,
		/**DBCOLUMN:gincstu.nazev_mezinar*/
		nazev_mezinar,
		/**DBCOLUMN:gincstu.zkratka_mezinar*/
		zkratka_mezinar,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\IGCalendarNotificationService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**(Interface) - GCalendarService ISL*/
	interface CalendarNotificationService {
		/**Vytvoření notifikace události (s commitem)*/
		create(rq?:Gordic.General.ApplicationInterface.GGinvokaDto|CallParams<GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinvokaDto>>): _Task<GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinvokaDto>,GServiceSaveResponse<Gordic.General.ApplicationInterface.GGinvokaDto>>;
		/**Aktualizace notifikace události*/
		update(rq?:Gordic.General.ApplicationInterface.GGinvokaDto|CallParams<GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinvokaDto>>): _Task<GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinvokaDto>,GServiceSaveResponse<Gordic.General.ApplicationInterface.GGinvokaDto>>;
		/**Načtení seznamu událostí*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.General.ApplicationInterface.GCalendarNotificationDto>>;
		/**Načtení události*/
		read(rq?:Gordic.General.ApplicationInterface.GGinvokaDto|CallParams<GServiceReadRequest<Gordic.General.ApplicationInterface.GGinvokaDto>>): _Task<GServiceReadRequest<Gordic.General.ApplicationInterface.GGinvokaDto>,GServiceReadResponse<Gordic.General.ApplicationInterface.GGinvokaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		CalendarNotificationService: ServiceBase & Catalog.CalendarNotificationService;
	}
	const CalendarNotificationService: Client["CalendarNotificationService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\IGCalendarService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**(Interface) - GCalendarService ISL*/
	interface CalendarService {
		/**Vytvořit událost s commitem (ginsoka)*/
		create(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,ginvoka:Gordic.General.ApplicationInterface.GGinvokaDto[]}>): _Task<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,ginvoka:Gordic.General.ApplicationInterface.GGinvokaDto[]},GServiceSaveResponse<Gordic.General.ApplicationInterface.GGinsokaDto>>;
		/**Aktualizace události s commitem (ginsoka)*/
		update(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,ginvoka:Gordic.General.ApplicationInterface.GGinvokaDto[]}>): _Task<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,ginvoka:Gordic.General.ApplicationInterface.GGinvokaDto[]},GServiceSaveResponse<Gordic.General.ApplicationInterface.GGinsokaDto>>;
		/**Načtení události (ginsoka)*/
		read(rq?:Gordic.General.ApplicationInterface.GGinsokaDto|CallParams<GServiceReadRequest<Gordic.General.ApplicationInterface.GGinsokaDto>>): _Task<GServiceReadRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,GServiceReadResponse<Gordic.General.ApplicationInterface.GGinsokaExtendDto>>;
		/**Vytvoření či aktualizace události*/
		upsert(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,ginvoka:Gordic.General.ApplicationInterface.GGinvokaDto[]}>): _Task<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,ginvoka:Gordic.General.ApplicationInterface.GGinvokaDto[]},GServiceSaveResponse<Gordic.General.ApplicationInterface.GGinsokaDto>>;
		/**Načtení seznamu událostí*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.General.ApplicationInterface.GGinsokaDto>>;
		/**Smazání záznamu*/
		delete(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,DeleteRelatedEvents?:Gordic.Gin.Interface.GCalendarEventDeleteRelated}>): _Task<{rq:GServiceSaveRequest<Gordic.General.ApplicationInterface.GGinsokaDto>,DeleteRelatedEvents:Gordic.Gin.Interface.GCalendarEventDeleteRelated},GServiceSaveResponse<Gordic.General.ApplicationInterface.GGinsokaExtendDto>>;
		/**Vrať poslední pořadové číslo události*/
		readMaxPorCislo(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.General.ApplicationInterface.GCalendarPorCisloDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		CalendarService: ServiceBase & Catalog.CalendarService;
	}
	const CalendarService: Client["CalendarService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\IGIcsService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**(Interface) - ICS ISL*/
	interface IcsService {
		/**Vytvoření/Uložení události .ics na server*/
		create(rq?:Gordic.Gin.Interface.GIcsDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GIcsDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GIcsDto>,GServiceSaveResponse<Gordic.Gin.Interface.GIcsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IcsService: ServiceBase & Catalog.IcsService;
	}
	const IcsService: Client["IcsService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Dto\GCalendarEventNotificationDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Notifikace události*/
	interface GCalendarEventNotificationDto {
		/**název*/
		nazev?: Gordic.Gin.Interface.GFileInStringDto|null;
		/**typ avizace,
		*     0 - oznámení (zatím jediné)
		*/
		typ_avizace?: number|null;
		/**jednotka avizace*/
		unit_avizace?: Gordic.Gin.Interface.GCalendarEventNotificationTimeUnitEnum|null;
		/**hodnota avizace*/
		val_avizace?: number|null;
	}
	const enum GCalendarEventNotificationDtoNames { nazev = "nazev", typ_avizace = "typ_avizace", unit_avizace = "unit_avizace", val_avizace = "val_avizace",}
	const enum GCalendarEventNotificationDtoFragments { nazev = "*", typ_avizace = "*", unit_avizace = "*", val_avizace = "*",}
	const enum GCalendarEventNotificationDtoTypes { nazev = "Gordic.Gin.Interface.GFileInStringDto", typ_avizace = "number", unit_avizace = "Gordic.Gin.Interface.GCalendarEventNotificationTimeUnitEnum", val_avizace = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Dto\GCalendarEventNotificationTimeUnitDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Časová jednotka notifikace události*/
	interface GCalendarEventNotificationTimeUnit {
		/**hodnota*/
		value?: Gordic.Gin.Interface.GCalendarEventNotificationTimeUnitEnum|null;
		/**popisek*/
		caption?: string|null;
	}
	const enum GCalendarEventNotificationTimeUnitNames { value = "value", caption = "caption",}
	const enum GCalendarEventNotificationTimeUnitFragments { value = "*", caption = "*",}
	const enum GCalendarEventNotificationTimeUnitTypes { value = "Gordic.Gin.Interface.GCalendarEventNotificationTimeUnitEnum", caption = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Dto\GCalendarEventNotificationTypeDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Notifikace události*/
	interface GCalendarEventNotificationTypeDto {
		/**hodnota*/
		value?: Gordic.Gin.Interface.GCalendarEventNotificationTypeEnum|null;
		/**popisek*/
		caption?: string|null;
	}
	const enum GCalendarEventNotificationTypeDtoNames { value = "value", caption = "caption",}
	const enum GCalendarEventNotificationTypeDtoFragments { value = "*", caption = "*",}
	const enum GCalendarEventNotificationTypeDtoTypes { value = "Gordic.Gin.Interface.GCalendarEventNotificationTypeEnum", caption = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Dto\GCalendarImportantEventListDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Dto pro načtení důležitých událostí v kalendaři
	*     - využitelné pro načítání dat přes ISL
	*/
	interface GCalendarImportantEventListDto {
		/**Identifikátor události*/
		ixs_oka?: string|null;
		/**Název události*/
		nazev?: string|null;
		/**Název referenta*/
		nazev_ref?: string|null;
		/**Status události:
		*     0 - běžná, 
		*     1 - důležitá (NÁVRH),
		*     2 - přijatá událost,
		*     3 - odmítnutá událost
		*/
		status_uda?: number|null;
		/**Příznak možného opakování události*/
		opakovani?: number|null;
		/**Datum začátku události*/
		dat_od?: JsonDate|null;
	}
	const enum GCalendarImportantEventListDtoNames { ixs_oka = "ixs_oka", nazev = "nazev", nazev_ref = "nazev_ref", status_uda = "status_uda", opakovani = "opakovani", dat_od = "dat_od",}
	const enum GCalendarImportantEventListDtoFragments { ixs_oka = "*", nazev = "*", nazev_ref = "*", status_uda = "*", opakovani = "*", dat_od = "*",}
	const enum GCalendarImportantEventListDtoTypes { ixs_oka = "string", nazev = "string", nazev_ref = "string", status_uda = "number", opakovani = "number", dat_od = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Dto\GIcsDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**(DTO) ICS*/
	interface GIcsDto {
		/**Název události*/
		Summary?: string|null;
		/**Začátek události*/
		DateStart?: JsonDate|null;
		/**Konec události*/
		DateEnd?: JsonDate|null;
		/**guid souboru - vyplní se na výstupu*/
		Guid?: string|null;
		/**Název souboru*/
		FileName?: string|null;
		/**Lokace události*/
		Location?: string|null;
		/**Popis události*/
		Description?: string|null;
		/**Opakování*/
		Recurrence?: Gordic.Gin.Interface.GCalendarEventRecurrenceEnum|null;
		/**Notifikace*/
		Alert?: Gordic.Gin.Interface.GCalendarEventNotificationDto[]|null;
	}
	const enum GIcsDtoNames { Summary = "Summary", DateStart = "DateStart", DateEnd = "DateEnd", Guid = "Guid", FileName = "FileName", Location = "Location", Description = "Description", Recurrence = "Recurrence", Alert = "Alert",}
	const enum GIcsDtoFragments { Summary = "*", DateStart = "*", DateEnd = "*", Guid = "*", FileName = "*", Location = "*", Description = "*", Recurrence = "*", Alert = "*",}
	const enum GIcsDtoTypes { Summary = "string", DateStart = "JsonDate", DateEnd = "JsonDate", Guid = "string", FileName = "string", Location = "string", Description = "string", Recurrence = "Gordic.Gin.Interface.GCalendarEventRecurrenceEnum", Alert = "Gordic.Gin.Interface.GCalendarEventNotificationDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Enum\GCalendarEventDeleteRelated.d.ts 

declare namespace Gordic.Gin.Interface {
	/**(enum) mazání opakujících se událostí*/
	const enum GCalendarEventDeleteRelated {
		/**Nic se neprovede*/
		None=0,
		/**Smazání všech opakujících se událostí*/
		All=1,
		/**Aktuální událost a všechny budoucí*/
		Future=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Enum\GCalendarEventNotificationTimeUnitEnum.d.ts 

declare namespace Gordic.Gin.Interface {
	/**jednotka avizace*/
	const enum GCalendarEventNotificationTimeUnitEnum {
		/**minuta*/
		Minute=10,
		/**hodina*/
		Hour=20,
		/**den*/
		Day=30,
		/**týden*/
		Week=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Enum\GCalendarEventNotificationTypeEnum.d.ts 

declare namespace Gordic.Gin.Interface {
	/**typ notifikace*/
	const enum GCalendarEventNotificationTypeEnum {
		/**oznámení notifikačního centra v GINIS*/
		Ginis=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Enum\GCalendarEventRecurrenceEnum.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Enum opakování události v kalendáři*/
	const enum GCalendarEventRecurrenceEnum {
		/**Bez opakování*/
		WithoutRepeating=0,
		/**Každý den*/
		Daily=10,
		/**Týdně v den založení (např. úterý)*/
		WeeklyOnDayOfCreation=20,
		/**Každý pracovní den (pondělí až pátek)*/
		EveryWorkingDay=30,
		/**Vlastní rozsah (není implementováno)*/
		Own=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\GCalendar\Filter\GIcsFilter.d.ts 

declare namespace Gordic.Gin.Interface {
	/**(Filter) ICS*/
	const enum GIcsFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\Gordic.Gin.Interface.GIxsAndName.d.ts 

declare namespace Gordic.Gin.Interface {
	/**třída svazující dohromady identifikátor a jeho textové jméno*/
	interface GIxsAndName {
		/**identifikátor (tj. PID)*/
		readonly Ixs?: string|null;
		/**název (tj. textové vyjádření) objektu identifikovaného identifikátorem*/
		readonly Name?: string|null;
		/**typ Ixs - Fun nebo SU*/
		readonly IxsType?: Gordic.Gin.Interface.IxsType|null;
	}
	const enum GIxsAndNameNames { Ixs = "Ixs", Name = "Name", IxsType = "IxsType",}
	const enum GIxsAndNameFragments { Ixs = "*", Name = "*", IxsType = "*",}
	const enum GIxsAndNameTypes { Ixs = "string", Name = "string", IxsType = "Gordic.Gin.Interface.IxsType",}
	const enum GIxsAndNameTypeLengths {}
	/**Typ identifikátoru*/
	const enum IxsType {
		/**Identfikátor je identifikátor funkce*/
		IxsFun,
		/**Identifikátor je identifikátor spisového uzlu*/
		IxsSu,
	}
	/**SubjectStructOrgEnum*/
	const enum SubjectStructOrgEnum {
		AktualniFunkce=0,
		AktualniSpisUzel=1,
		PodrizeneUzly=2,
		OsobyUzlu=3,
		SkupinyOsob=4,
	}
	interface SubjektSelectedInfo {
		/**Autogenerated.*/
		Ixs?: string|null;
		/**Autogenerated.*/
		Name?: string|null;
		/**Autogenerated.*/
		TypeIxs?: Gordic.Gin.Interface.IxsType|null;
		/**Autogenerated.*/
		SubjectStructOrg?: Gordic.Gin.Interface.SubjectStructOrgEnum|null;
	}
	const enum SubjektSelectedInfoNames { Ixs = "Ixs", Name = "Name", TypeIxs = "TypeIxs", SubjectStructOrg = "SubjectStructOrg",}
	const enum SubjektSelectedInfoFragments { Ixs = "*", Name = "*", TypeIxs = "*", SubjectStructOrg = "*",}
	const enum SubjektSelectedInfoTypes { Ixs = "string", Name = "string", TypeIxs = "Gordic.Gin.Interface.IxsType", SubjectStructOrg = "Gordic.Gin.Interface.SubjectStructOrgEnum",}
	const enum SubjektSelectedInfoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAIRecognizedItem.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položka vytěžená pomocí AI.*/
	interface AIRecognizedItem {
		/**Vrátí data položky vytěžené pomocí AI.*/
		read(rq?:Gordic.Gin.Interface.GAIRecognizedItemReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizedItemReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizedItemReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GAIRecognizedItemDto>>;
		/**Vrátí seznam položek vytěžených pomocí AI dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GAIRecognizedItemDto>>;
		/**Vytvoří položku vytěženou pomocí AI.*/
		create(rq?:Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>>;
		/**Upraví položku vytěženou pomocí AI.*/
		update(rq?:Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>>;
		/**Upraví, nebo vytvoří položku vytěženou pomocí AI.*/
		upsert(rq?:Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemCreateRequestDto>>;
		/**Smaže položku vytěženou pomocí AI.*/
		delete(rq?:Gordic.Gin.Interface.GAIRecognizedItemDeleteRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemDeleteRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemDeleteRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemDeleteResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AIRecognizedItem: ServiceBase & Catalog.AIRecognizedItem;
	}
	const AIRecognizedItem: Client["AIRecognizedItem"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení položky vytěžené pomocí AI (IGAIRecognizedItem.Read).*/
	interface GAIRecognizedItemReadRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo vytěžené položky.*/
		por_cislo?: number|null;
	}
	const enum GAIRecognizedItemReadRequestDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo",}
	const enum GAIRecognizedItemReadRequestDtoFragments { ixs_ulo = "*", por_cislo = "*",}
	const enum GAIRecognizedItemReadRequestDtoTypes { ixs_ulo = "string", por_cislo = "number",}
	const enum GAIRecognizedItemReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro uložení položky vytěžené pomocí AI (IGAIRecognizedItem.Create).*/
	interface GAIRecognizedItemCreateRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo vytěžené položky.*/
		por_cislo?: number|null;
		/**Technická hodnota ve stringu. 
		*     Slouží především pro ukládání v databázi a vypočítává se z ní typová hodnota Value.
		*     Typovou instanci hodnoty získáte pomocí metody GetValue(), případně vlastností Value.
		*     V TypeScriptu pro získání hodnoty použijte metodu Gordic.Gin.WebClient.GAiRecognizerUtils.GetValue().
		*     Pokud chcete zjistit původní vytěžený text, tak je ve vlastnosti RecognizedText.
		*/
		hodnota_upr?: string|null;
		/**Vytěžený text.*/
		hodnota_orig?: string|null;
		/**Typ vytěžené položky.*/
		typ_vytez_pol?: Gordic.Ginis.DbModel.GGinctpoEnum|null;
		/**Pravděpodobnost správně rozpoznané hodnoty (0-1).*/
		pravdepodobnost?: JsonDecimal|null;
		/**Index stránky na které je text (počítáno od 0).*/
		page_index?: number|null;
		/**Pozice X horního levého bodu ohraničujícího hodnotu v obrazu.*/
		top_left_x?: JsonDecimal|null;
		/**Pozice Y horního levého bodu ohraničujícího hodnotu v obrazu.*/
		top_left_y?: JsonDecimal|null;
		/**Šířka "rámečku" textu.*/
		size_x?: JsonDecimal|null;
		/**Výška "rámečku" textu.*/
		size_y?: JsonDecimal|null;
		/**Pořadové číslo skupiny.*/
		por_cislo_skupina?: number|null;
	}
	const enum GAIRecognizedItemCreateRequestDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", hodnota_upr = "hodnota_upr", hodnota_orig = "hodnota_orig", typ_vytez_pol = "typ_vytez_pol", pravdepodobnost = "pravdepodobnost", page_index = "page_index", top_left_x = "top_left_x", top_left_y = "top_left_y", size_x = "size_x", size_y = "size_y", por_cislo_skupina = "por_cislo_skupina",}
	const enum GAIRecognizedItemCreateRequestDtoFragments { ixs_ulo = "*", por_cislo = "*", hodnota_upr = "*", hodnota_orig = "*", typ_vytez_pol = "*", pravdepodobnost = "*", page_index = "*", top_left_x = "*", top_left_y = "*", size_x = "*", size_y = "*", por_cislo_skupina = "*",}
	const enum GAIRecognizedItemCreateRequestDtoTypes { ixs_ulo = "string", por_cislo = "number", hodnota_upr = "string", hodnota_orig = "string", typ_vytez_pol = "Gordic.Ginis.DbModel.GGinctpoEnum", pravdepodobnost = "JsonDecimal", page_index = "number", top_left_x = "JsonDecimal", top_left_y = "JsonDecimal", size_x = "JsonDecimal", size_y = "JsonDecimal", por_cislo_skupina = "number",}
	const enum GAIRecognizedItemCreateRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro smazání položky vytěžené pomocí AI (IGAIRecognizedItem.Delete).*/
	interface GAIRecognizedItemDeleteRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo vytěžené položky.*/
		por_cislo?: number|null;
	}
	const enum GAIRecognizedItemDeleteRequestDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo",}
	const enum GAIRecognizedItemDeleteRequestDtoFragments { ixs_ulo = "*", por_cislo = "*",}
	const enum GAIRecognizedItemDeleteRequestDtoTypes { ixs_ulo = "string", por_cislo = "number",}
	const enum GAIRecognizedItemDeleteRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro smazání položky vytěžené pomocí AI (IGAIRecognizedItem.Delete).*/
	interface GAIRecognizedItemDeleteResponseDto {
	}
	const enum GAIRecognizedItemDeleteResponseDtoNames {}
	const enum GAIRecognizedItemDeleteResponseDtoFragments {}
	const enum GAIRecognizedItemDeleteResponseDtoTypes {}
	const enum GAIRecognizedItemDeleteResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAIRecognizedItemGroup.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Skupina položek vytěžených pomocí AI.*/
	interface AIRecognizedItemGroup {
		/**Vrátí data skupiny položek vytěžených pomocí AI.*/
		read(rq?:Gordic.Gin.Interface.GAIRecognizedItemGroupReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GAIRecognizedItemGroupDto>>;
		/**Vrátí data skupin položek vytěžených pomocí AI dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GAIRecognizedItemGroupDto>>;
		/**Vytvoří skupinu položek vytěžených pomocí AI.*/
		create(rq?:Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>>;
		/**Upraví skupinu položek vytěžených pomocí AI.*/
		update(rq?:Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>>;
		/**Upraví, nebo vytvoří skupinu položek vytěžených pomocí AI.*/
		upsert(rq?:Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemGroupCreateRequestDto>>;
		/**Smaže skupinu položek vytěžených pomocí AI.*/
		delete(rq?:Gordic.Gin.Interface.GAIRecognizedItemGroupDeleteRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupDeleteRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizedItemGroupDeleteRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizedItemGroupDeleteResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AIRecognizedItemGroup: ServiceBase & Catalog.AIRecognizedItemGroup;
	}
	const AIRecognizedItemGroup: Client["AIRecognizedItemGroup"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení položky vytěžené pomocí AI (IGAIRecognizedItem.Read).*/
	interface GAIRecognizedItemGroupReadRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo skupiny vytěžené položky.*/
		por_cislo_skupina?: number|null;
	}
	const enum GAIRecognizedItemGroupReadRequestDtoNames { ixs_ulo = "ixs_ulo", por_cislo_skupina = "por_cislo_skupina",}
	const enum GAIRecognizedItemGroupReadRequestDtoFragments { ixs_ulo = "*", por_cislo_skupina = "*",}
	const enum GAIRecognizedItemGroupReadRequestDtoTypes { ixs_ulo = "string", por_cislo_skupina = "number",}
	const enum GAIRecognizedItemGroupReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro uložení položky vytěžené pomocí AI (IGAIRecognizedItem.Create).*/
	interface GAIRecognizedItemGroupCreateRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo vytěžené položky.*/
		por_cislo_skupina?: number|null;
		/**Identifikátor skupiny položek.*/
		druh_skupiny?: Gordic.Ginis.DbModel.GGincargEnum|null;
	}
	const enum GAIRecognizedItemGroupCreateRequestDtoNames { ixs_ulo = "ixs_ulo", por_cislo_skupina = "por_cislo_skupina", druh_skupiny = "druh_skupiny",}
	const enum GAIRecognizedItemGroupCreateRequestDtoFragments { ixs_ulo = "*", por_cislo_skupina = "*", druh_skupiny = "*",}
	const enum GAIRecognizedItemGroupCreateRequestDtoTypes { ixs_ulo = "string", por_cislo_skupina = "number", druh_skupiny = "Gordic.Ginis.DbModel.GGincargEnum",}
	const enum GAIRecognizedItemGroupCreateRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro smazání položky vytěžené pomocí AI (IGAIRecognizedItem.Delete).*/
	interface GAIRecognizedItemGroupDeleteRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Pořadové číslo vytěžené položky.*/
		por_cislo_skupina?: number|null;
	}
	const enum GAIRecognizedItemGroupDeleteRequestDtoNames { ixs_ulo = "ixs_ulo", por_cislo_skupina = "por_cislo_skupina",}
	const enum GAIRecognizedItemGroupDeleteRequestDtoFragments { ixs_ulo = "*", por_cislo_skupina = "*",}
	const enum GAIRecognizedItemGroupDeleteRequestDtoTypes { ixs_ulo = "string", por_cislo_skupina = "number",}
	const enum GAIRecognizedItemGroupDeleteRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro smazání položky vytěžené pomocí AI (IGAIRecognizedItem.Delete).*/
	interface GAIRecognizedItemGroupDeleteResponseDto {
	}
	const enum GAIRecognizedItemGroupDeleteResponseDtoNames {}
	const enum GAIRecognizedItemGroupDeleteResponseDtoFragments {}
	const enum GAIRecognizedItemGroupDeleteResponseDtoTypes {}
	const enum GAIRecognizedItemGroupDeleteResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAIRecognizeHistory.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAiRecognizer.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**AiRecognizer.*/
	interface AiRecognizer {
		/**Vrátí data AI Resolveru.*/
		read(rq?:Gordic.Gin.Interface.GAiRecognizerReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GAiRecognizerReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GAiRecognizerReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinsaivDto>>;
		/**Vrátí seznam AI Resolverů dle zadaných kritérií.
		*     
		*     Pokud není použit filtr na aktivitu, tak se použije automticky filtr na aktivní.
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinsaivDto>>;
		/**Vytěží data z dokumentu.*/
		recognize(rq?:Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerRecognizeResponseDto>>;
		/**Zjištění zda jsou vytěžena data z dokumentu.*/
		isRecognized(rq?:Gordic.Gin.Interface.GAiRecognizerIsRecognizedRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerIsRecognizedRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerIsRecognizedRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerIsRecognizedResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AiRecognizer: ServiceBase & Catalog.AiRecognizer;
	}
	const AiRecognizer: Client["AiRecognizer"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení AI Resolveru (IGAiRecognizer.Read).*/
	interface GAiRecognizerReadRequestDto {
		/**Identifikátor AI Resolveru.*/
		IxsAiv?: string|null;
	}
	const enum GAiRecognizerReadRequestDtoNames { IxsAiv = "IxsAiv",}
	const enum GAiRecognizerReadRequestDtoFragments { IxsAiv = "*",}
	const enum GAiRecognizerReadRequestDtoTypes { IxsAiv = "string",}
	const enum GAiRecognizerReadRequestDtoTypeLengths {}
	/**Vstupní data metody pro vytěženídat z dokumentu (IGAiRecognizer.Recognize)*/
	interface GAiRecognizerRecognizeRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**(Default: false) Příznak, který vynutí nové vytěžení dat i pokud jsou uložena data z předchozího vytěžení.*/
		VynutitVytezeni?: boolean|null;
	}
	const enum GAiRecognizerRecognizeRequestDtoNames { ixs_ulo = "ixs_ulo", VynutitVytezeni = "VynutitVytezeni",}
	const enum GAiRecognizerRecognizeRequestDtoFragments { ixs_ulo = "*", VynutitVytezeni = "*",}
	const enum GAiRecognizerRecognizeRequestDtoTypes { ixs_ulo = "string", VynutitVytezeni = "boolean",}
	const enum GAiRecognizerRecognizeRequestDtoTypeLengths {}
	interface GAiRecognizerRecognizeResponseDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		RecognizedItems?: Gordic.Gin.Interface.GAIRecognizedItemDto[]|null;
		RecognizedItemGroups?: Gordic.Gin.Interface.GAIRecognizedItemGroupDto[]|null;
	}
	const enum GAiRecognizerRecognizeResponseDtoNames { ixs_ulo = "ixs_ulo", RecognizedItems = "RecognizedItems", RecognizedItemGroups = "RecognizedItemGroups",}
	const enum GAiRecognizerRecognizeResponseDtoFragments { ixs_ulo = "*", RecognizedItems = "*", RecognizedItemGroups = "*",}
	const enum GAiRecognizerRecognizeResponseDtoTypes { ixs_ulo = "string", RecognizedItems = "Gordic.Gin.Interface.GAIRecognizedItemDto[]", RecognizedItemGroups = "Gordic.Gin.Interface.GAIRecognizedItemGroupDto[]",}
	const enum GAiRecognizerRecognizeResponseDtoTypeLengths {}
	/**Vstupní data metody pro zjištění zda jsou vytěžena data z dokumentu (IGAiRecognizer.IsRecognized)*/
	interface GAiRecognizerIsRecognizedRequestDto {
		/**Identifikátor elektronického souboru.*/
		ixs_ulo?: string|null;
	}
	const enum GAiRecognizerIsRecognizedRequestDtoNames { ixs_ulo = "ixs_ulo",}
	const enum GAiRecognizerIsRecognizedRequestDtoFragments { ixs_ulo = "*",}
	const enum GAiRecognizerIsRecognizedRequestDtoTypes { ixs_ulo = "string",}
	const enum GAiRecognizerIsRecognizedRequestDtoTypeLengths {}
	/**Výstupní data metody pro zjištění zda jsou vytěžena data z dokumentu (IGAiRecognizer.IsRecognized)*/
	interface GAiRecognizerIsRecognizedResponseDto {
		/**Stav požadavku na vytěžení.*/
		stav_vytez?: Gordic.Ginis.DbModel.GGincsvyEnum|null;
		/**Příznak, zda je již soubor vytěžen.*/
		readonly IsRecognized?: boolean|null;
	}
	const enum GAiRecognizerIsRecognizedResponseDtoNames { stav_vytez = "stav_vytez", IsRecognized = "IsRecognized",}
	const enum GAiRecognizerIsRecognizedResponseDtoFragments { stav_vytez = "*", IsRecognized = "*",}
	const enum GAiRecognizerIsRecognizedResponseDtoTypes { stav_vytez = "Gordic.Ginis.DbModel.GGincsvyEnum", IsRecognized = "boolean",}
	const enum GAiRecognizerIsRecognizedResponseDtoTypeLengths {}
	const enum GRecognizedDocumentType {
		NotSpecified,
		/**Faktura*/
		Invoice,
	}
	const enum GAiRecognizerFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAIRecognizeRequest.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Požadavek na vytěžení dat pomocí AI.*/
	interface AIRecognizeRequest {
		/**Vrátí data požadavku na vytěžení dat pomocí AI.*/
		read(rq?:Gordic.Gin.Interface.GAIRecognizeRequestReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizeRequestReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizeRequestReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GAIRecognizeRequestDto>>;
		/**Vrátí seznam požadavků na vytěžení dat pomocí AI dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GAIRecognizeRequestDto>>;
		/**Vytvoří požadavek na vytěžení dat pomocí AI.*/
		create(rq?:Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>;
		/**Upraví požadavek na vytěžení dat pomocí AI.*/
		update(rq?:Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>;
		/**Upraví, nebo vytvoří požadavek na vytěžení dat pomocí AI.*/
		upsert(rq?:Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>;
		/**Vymaže požadavek na vytěžení dat pomocí AI.*/
		delete(rq?:Gordic.Gin.Interface.GAIRecognizeRequestDeleteRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestDeleteRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestDeleteRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>;
		/**Naplánuje požadavek na vytěžení dat pomocí AI.*/
		shedule(rq?:Gordic.Gin.Interface.GAIRecognizeRequestSheduleRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestSheduleRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GAIRecognizeRequestSheduleRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GAIRecognizeRequestUpdateRequestDto>>;
		/**Vytěží náplánované požadavky na vytěžení dat pomocí AI.*/
		recognizeSheduled(rq?:Gordic.Gin.Interface.GAIRecognizeRequestRecognizeSheduledRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAIRecognizeRequestRecognizeSheduledRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAIRecognizeRequestRecognizeSheduledRequestDto>,GServiceGroupResponse<Gordic.Gin.Interface.GAIRecognizeRequestDto>>;
		/**Vrátí stav požadavku na vytěžení dat pomocí AI.*/
		readStavVytezeni(rq?:Gordic.Gin.Interface.GAIRecognizeRequestReadStavVytezeniRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizeRequestReadStavVytezeniRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GAIRecognizeRequestReadStavVytezeniRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GAIRecognizeRequestReadStavVytezeniResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AIRecognizeRequest: ServiceBase & Catalog.AIRecognizeRequest;
	}
	const AIRecognizeRequest: Client["AIRecognizeRequest"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.Read).*/
	interface GAIRecognizeRequestReadRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
	}
	const enum GAIRecognizeRequestReadRequestDtoNames { ixs_ulo = "ixs_ulo",}
	const enum GAIRecognizeRequestReadRequestDtoFragments { ixs_ulo = "*",}
	const enum GAIRecognizeRequestReadRequestDtoTypes { ixs_ulo = "string",}
	const enum GAIRecognizeRequestReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro vymazání požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.Delete).*/
	interface GAIRecognizeRequestDeleteRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
	}
	const enum GAIRecognizeRequestDeleteRequestDtoNames { ixs_ulo = "ixs_ulo",}
	const enum GAIRecognizeRequestDeleteRequestDtoFragments { ixs_ulo = "*",}
	const enum GAIRecognizeRequestDeleteRequestDtoTypes { ixs_ulo = "string",}
	const enum GAIRecognizeRequestDeleteRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.Shedule).*/
	interface GAIRecognizeRequestSheduleRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
	}
	const enum GAIRecognizeRequestSheduleRequestDtoNames { ixs_ulo = "ixs_ulo",}
	const enum GAIRecognizeRequestSheduleRequestDtoFragments { ixs_ulo = "*",}
	const enum GAIRecognizeRequestSheduleRequestDtoTypes { ixs_ulo = "string",}
	const enum GAIRecognizeRequestSheduleRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro naplánování požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.RecognizeSheduled).*/
	interface GAIRecognizeRequestRecognizeSheduledRequestDto {
		/**(default: int.MaxValue) Maximální počet požadavků na vytěžení.*/
		MaxRequestsCount?: number|null;
	}
	const enum GAIRecognizeRequestRecognizeSheduledRequestDtoNames { MaxRequestsCount = "MaxRequestsCount",}
	const enum GAIRecognizeRequestRecognizeSheduledRequestDtoFragments { MaxRequestsCount = "*",}
	const enum GAIRecognizeRequestRecognizeSheduledRequestDtoTypes { MaxRequestsCount = "number",}
	const enum GAIRecognizeRequestRecognizeSheduledRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro aktualizaci požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.Update).*/
	interface GAIRecognizeRequestUpdateRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
		/**Stav požadavku na vytěžení.*/
		stav_vytez?: Gordic.Ginis.DbModel.GGincsvyEnum|null;
	}
	const enum GAIRecognizeRequestUpdateRequestDtoNames { ixs_ulo = "ixs_ulo", stav_vytez = "stav_vytez",}
	const enum GAIRecognizeRequestUpdateRequestDtoFragments { ixs_ulo = "*", stav_vytez = "*",}
	const enum GAIRecognizeRequestUpdateRequestDtoTypes { ixs_ulo = "string", stav_vytez = "Gordic.Ginis.DbModel.GGincsvyEnum",}
	const enum GAIRecognizeRequestUpdateRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení stavu požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.ReadStavVytezeni).*/
	interface GAIRecognizeRequestReadStavVytezeniRequestDto {
		/**Identifikátor elektronického souboru, ze kterého jsou data vytěžována.*/
		ixs_ulo?: string|null;
	}
	const enum GAIRecognizeRequestReadStavVytezeniRequestDtoNames { ixs_ulo = "ixs_ulo",}
	const enum GAIRecognizeRequestReadStavVytezeniRequestDtoFragments { ixs_ulo = "*",}
	const enum GAIRecognizeRequestReadStavVytezeniRequestDtoTypes { ixs_ulo = "string",}
	const enum GAIRecognizeRequestReadStavVytezeniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení stavu požadavku na vytěžení dat pomocí AI (IGAIRecognizeRequest.ReadStavVytezeni).*/
	interface GAIRecognizeRequestReadStavVytezeniResponseDto {
		/**Stav požadavku na vytěžení.*/
		stav_vytez?: Gordic.Ginis.DbModel.GGincsvyEnum|null;
	}
	const enum GAIRecognizeRequestReadStavVytezeniResponseDtoNames { stav_vytez = "stav_vytez",}
	const enum GAIRecognizeRequestReadStavVytezeniResponseDtoFragments { stav_vytez = "*",}
	const enum GAIRecognizeRequestReadStavVytezeniResponseDtoTypes { stav_vytez = "Gordic.Ginis.DbModel.GGincsvyEnum",}
	const enum GAIRecognizeRequestReadStavVytezeniResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAiRecognizerFormRecognizer.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**AiRecognizer FormRecognizer.*/
	interface AiRecognizerFormRecognizer {
		recognize(rq?:Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerRecognizeResponseDto>>;
		recognizeSpecific(rq?:Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecogniseSpecificRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecogniseSpecificRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecogniseSpecificRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecognizeSpecificResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AiRecognizerFormRecognizer: ServiceBase & Catalog.AiRecognizerFormRecognizer;
	}
	const AiRecognizerFormRecognizer: Client["AiRecognizerFormRecognizer"];
}
declare namespace Gordic.Gin.Interface {
	interface GAiRecognizerFormRecognizerRecogniseSpecificRequestDto {
		/**File.*/
		File?: any|null;
	}
	const enum GAiRecognizerFormRecognizerRecogniseSpecificRequestDtoNames { File = "File",}
	const enum GAiRecognizerFormRecognizerRecogniseSpecificRequestDtoFragments { File = "*",}
	const enum GAiRecognizerFormRecognizerRecogniseSpecificRequestDtoTypes { File = "any",}
	const enum GAiRecognizerFormRecognizerRecogniseSpecificRequestDtoTypeLengths {}
	interface GAiRecognizerFormRecognizerRecognizeSpecificResponseDto {
		/**Extracted key-value pairs.*/
		KeyValuePairs?: Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecognizeSpecificResponseDto.GKeyValuePairDto[]|null;
		/**Extracted lines from the page, potentially containing both textual and visual elements*/
		Lines?: Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecognizeSpecificResponseDto.GLineDto[]|null;
	}
	const enum GAiRecognizerFormRecognizerRecognizeSpecificResponseDtoNames { KeyValuePairs = "KeyValuePairs", Lines = "Lines",}
	const enum GAiRecognizerFormRecognizerRecognizeSpecificResponseDtoFragments { KeyValuePairs = "*", Lines = "*",}
	const enum GAiRecognizerFormRecognizerRecognizeSpecificResponseDtoTypes { KeyValuePairs = "Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecognizeSpecificResponseDto.GKeyValuePairDto[]", Lines = "Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecognizeSpecificResponseDto.GLineDto[]",}
	const enum GAiRecognizerFormRecognizerRecognizeSpecificResponseDtoTypeLengths {}
}
declare namespace Gordic.Gin.Interface.GAiRecognizerFormRecognizerRecognizeSpecificResponseDto {
	interface GKeyValuePairDto {
		/**Field label of the key-value pair.*/
		Key?: string|null;
		/**Field value of the key-value pair.*/
		Value?: string|null;
		/**Confidence of correctly extracting the key-value pair.*/
		Confidence?: JsonDecimal|null;
	}
	const enum GKeyValuePairDtoNames { Key = "Key", Value = "Value", Confidence = "Confidence",}
	const enum GKeyValuePairDtoFragments { Key = "*", Value = "*", Confidence = "*",}
	const enum GKeyValuePairDtoTypes { Key = "string", Value = "string", Confidence = "JsonDecimal",}
	const enum GKeyValuePairDtoTypeLengths {}
	interface GLineDto {
		/**Field label of the key-value pair.*/
		Content?: string|null;
		/**1-based page number in the input document.*/
		PageNumber?: number|null;
		/**Field value of the key-value pair.*/
		BoundingPolygons?: Gordic.Gin.Interface.GVector2Dto[]|null;
	}
	const enum GLineDtoNames { Content = "Content", PageNumber = "PageNumber", BoundingPolygons = "BoundingPolygons",}
	const enum GLineDtoFragments { Content = "*", PageNumber = "*", BoundingPolygons = "*",}
	const enum GLineDtoTypes { Content = "string", PageNumber = "number", BoundingPolygons = "Gordic.Gin.Interface.GVector2Dto[]",}
	const enum GLineDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAiRecognizerNathan.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**AiRecognizer Nathan.*/
	interface AiRecognizerNathan {
		recognize(rq?:Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerRecognizeResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AiRecognizerNathan: ServiceBase & Catalog.AiRecognizerNathan;
	}
	const AiRecognizerNathan: Client["AiRecognizerNathan"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGAiRecognizerQRCode.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**AiRecognizer QR Code.*/
	interface AiRecognizerQRCode {
		recognize(rq?:Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerRecognizeRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerRecognizeResponseDto>>;
		recognizeSpecific(rq?:Gordic.Gin.Interface.GAiRecognizerQRCodeRecogniseSpecificRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerQRCodeRecogniseSpecificRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerQRCodeRecogniseSpecificRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerQRCodeRecognizeSpecificResponseDto>>;
		recognizeString(rq?:Gordic.Gin.Interface.GAiRecognizerQRCodeRecogniseStringRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerQRCodeRecogniseStringRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAiRecognizerQRCodeRecogniseStringRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerRecognizeResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AiRecognizerQRCode: ServiceBase & Catalog.AiRecognizerQRCode;
	}
	const AiRecognizerQRCode: Client["AiRecognizerQRCode"];
}
declare namespace Gordic.Gin.Interface {
	interface GAiRecognizerQRCodeRecogniseSpecificRequestDto {
		/**Cesta k PDF souboru.*/
		FilePathPdf?: string|null;
	}
	const enum GAiRecognizerQRCodeRecogniseSpecificRequestDtoNames { FilePathPdf = "FilePathPdf",}
	const enum GAiRecognizerQRCodeRecogniseSpecificRequestDtoFragments { FilePathPdf = "*",}
	const enum GAiRecognizerQRCodeRecogniseSpecificRequestDtoTypes { FilePathPdf = "string",}
	const enum GAiRecognizerQRCodeRecogniseSpecificRequestDtoTypeLengths {}
	interface GAiRecognizerQRCodeRecogniseStringRequestDto {
		/**QR kód string*/
		QRCode?: string|null;
	}
	const enum GAiRecognizerQRCodeRecogniseStringRequestDtoNames { QRCode = "QRCode",}
	const enum GAiRecognizerQRCodeRecogniseStringRequestDtoFragments { QRCode = "*",}
	const enum GAiRecognizerQRCodeRecogniseStringRequestDtoTypes { QRCode = "string",}
	const enum GAiRecognizerQRCodeRecogniseStringRequestDtoTypeLengths {}
	interface GAiRecognizerQRCodeRecognizeSpecificResponseDto {
		Items?: Gordic.Gin.Interface.GAiRecognizerQRCodeRecognizeSpecificResponseDto.GQRValueItem[]|null;
	}
	const enum GAiRecognizerQRCodeRecognizeSpecificResponseDtoNames { Items = "Items",}
	const enum GAiRecognizerQRCodeRecognizeSpecificResponseDtoFragments { Items = "*",}
	const enum GAiRecognizerQRCodeRecognizeSpecificResponseDtoTypes { Items = "Gordic.Gin.Interface.GAiRecognizerQRCodeRecognizeSpecificResponseDto.GQRValueItem[]",}
	const enum GAiRecognizerQRCodeRecognizeSpecificResponseDtoTypeLengths {}
}
declare namespace Gordic.Gin.Interface.GAiRecognizerQRCodeRecognizeSpecificResponseDto {
	interface GQRValueItem {
		Key?: string|null;
		Value?: string|null;
	}
	const enum GQRValueItemNames { Key = "Key", Value = "Value",}
	const enum GQRValueItemFragments { Key = "*", Value = "*",}
	const enum GQRValueItemTypes { Key = "string", Value = "string",}
	const enum GQRValueItemTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGFilterStorage.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**FilterStorage (Isl) pro společné ukládání masek.*/
	interface FilterStorage {
		/**Metoda pro načtení filtrů.*/
		getFilters(rq?:CallParams<{filter:Gordic.Gin.Interface.GSeznamMasekDto}>): _Task<{filter:Gordic.Gin.Interface.GSeznamMasekDto},Gordic.Gin.Interface.GSeznamMasekDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FilterStorage: ServiceBase & Catalog.FilterStorage;
	}
	const FilterStorage: Client["FilterStorage"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGFormular.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Formulář (Isl).*/
	interface Formular {
		/**Vrátí data formuláře.*/
		read(rq?:Gordic.Gin.Interface.GFormularReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GFormularReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GFormularReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GFormularDto>>;
		/**Vrátí seznam formulářů dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GFormularDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Formular: ServiceBase & Catalog.Formular;
	}
	const Formular: Client["Formular"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení informací o formuláři (IGFormular.Read).*/
	interface GFormularReadRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Identifikátor sestavy.*/
		IxsFrmGform?: string|null;
	}
	const enum GFormularReadRequestDtoNames { Ixp = "Ixp", IxsFrmGform = "IxsFrmGform",}
	const enum GFormularReadRequestDtoFragments { Ixp = "*", IxsFrmGform = "*",}
	const enum GFormularReadRequestDtoTypes { Ixp = "string", IxsFrmGform = "string",}
	const enum GFormularReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGGinspodI.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Spisové uzly*/
	interface Ginspod {
		/**Vrátí seznam historie písemnosti dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinspodDto>>;
		/**Vrátí spisový uzel dle zadaných kritérií.*/
		read(rq?:Gordic.Gin.Interface.GGinspodDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinspodDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinspodDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinspodDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ginspod: ServiceBase & Catalog.Ginspod;
	}
	const Ginspod: Client["Ginspod"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGGinszmpI.d.ts 

declare namespace Gordic.Isl {
    /**Autor změny dokumentu (Isl).*/
	abstract class Ginszmp extends ServiceBase {
        /**Vrátí seznam autorů změn dokumentu dle zadaných kritérií.*/
		public static list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinszmpDto>>;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGinskal.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily*/
	interface Ginskal {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ginis.DbModel.GGinskalDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ginis.DbModel.GGinskalDto|CallParams<GServiceReadRequest<Gordic.Ginis.DbModel.GGinskalDto>>): _Task<GServiceReadRequest<Gordic.Ginis.DbModel.GGinskalDto>,GServiceReadResponse<Gordic.Ginis.DbModel.GGinskalDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ginis.DbModel.GGinskalDto|CallParams<GServiceSaveRequest<Gordic.Ginis.DbModel.GGinskalDto>>): _Task<GServiceSaveRequest<Gordic.Ginis.DbModel.GGinskalDto>,GServiceSaveResponse<Gordic.Ginis.DbModel.GGinskalDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ginis.DbModel.GGinskalDto|CallParams<GServiceSaveRequest<Gordic.Ginis.DbModel.GGinskalDto>>): _Task<GServiceSaveRequest<Gordic.Ginis.DbModel.GGinskalDto>,GServiceSaveResponse<Gordic.Ginis.DbModel.GGinskalDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ginis.DbModel.GGinskalDto|CallParams<GServiceSaveRequest<Gordic.Ginis.DbModel.GGinskalDto>>): _Task<GServiceSaveRequest<Gordic.Ginis.DbModel.GGinskalDto>,GServiceSaveResponse<Gordic.Ginis.DbModel.GGinskalDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ginskal: ServiceBase & Catalog.Ginskal;
	}
	const Ginskal: Client["Ginskal"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGIslEntityCustomViewGenerator.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Generátor custom view pro isl entity.*/
	interface IslEntityCustomViewGenerator {
		/**Vytvoří popisné funkce entity pro webového klienta.*/
		createWebClientDescription(rq?:Gordic.Gin.Interface.GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GIslEntityCustomViewGeneratorCreateWebClientDescriptionResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IslEntityCustomViewGenerator: ServiceBase & Catalog.IslEntityCustomViewGenerator;
	}
	const IslEntityCustomViewGenerator: Client["IslEntityCustomViewGenerator"];
}
declare namespace Gordic.Gin.Interface {
	interface GIslEntityCustomViewGeneratorCreateWebClientDescriptionResponseDto {
		CreateGridFormat?: string|null;
		CreateFilterForms?: string|null;
	}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionResponseDtoNames { CreateGridFormat = "CreateGridFormat", CreateFilterForms = "CreateFilterForms",}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionResponseDtoFragments { CreateGridFormat = "*", CreateFilterForms = "*",}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionResponseDtoTypes { CreateGridFormat = "string", CreateFilterForms = "string",}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionResponseDtoTypeLengths {}
	interface GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDto {
		AssemblyQualifiedName?: string|null;
		EntityDto?: object|null;
	}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDtoNames { AssemblyQualifiedName = "AssemblyQualifiedName", EntityDto = "EntityDto",}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDtoFragments { AssemblyQualifiedName = "*", EntityDto = "*",}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDtoTypes { AssemblyQualifiedName = "string", EntityDto = "object",}
	const enum GIslEntityCustomViewGeneratorCreateWebClientDescriptionRequestDtoTypeLengths {}
	interface GIslEntityDescriptionDto {
		Property?: string|null;
		Fragment?: string|null;
		TypeName?: string|null;
		AssemblyQualifiedName?: string|null;
	}
	const enum GIslEntityDescriptionDtoNames { Property = "Property", Fragment = "Fragment", TypeName = "TypeName", AssemblyQualifiedName = "AssemblyQualifiedName",}
	const enum GIslEntityDescriptionDtoFragments { Property = "*", Fragment = "*", TypeName = "*", AssemblyQualifiedName = "*",}
	const enum GIslEntityDescriptionDtoTypes { Property = "string", Fragment = "string", TypeName = "string", AssemblyQualifiedName = "string",}
	const enum GIslEntityDescriptionDtoTypeLengths {}
	const enum GIslEntityCustomViewGeneratorFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGRevize.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Revize (Isl).*/
	interface Revize {
		/**Vrátí seznam revizí pro těžkého / tlustého klienta.*/
		getRevisionsForTK(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GRevizeDto>>;
		/**Vrátí seznam revizí pro webového klienta.*/
		getRevisionsForWK(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GRevizeDto>>;
		/**Načte seznam instalovaných revizí.*/
		listFromInstalled(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GRevizeDto>>;
		/**Načte seznam revizí z databáze.*/
		listFromDatabase(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GRevizeDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Revize: ServiceBase & Catalog.Revize;
	}
	const Revize: Client["Revize"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGTypAgendy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ agendy (Isl).*/
	interface TypAgendy {
		/**Vrátí data typu agendy.*/
		read(rq?:Gordic.Gin.Interface.GTypAgendyReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GTypAgendyReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GTypAgendyReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GTypAgendyDto>>;
		/**Vrátí seznam typů agend dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GTypAgendyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypAgendy: ServiceBase & Catalog.TypAgendy;
	}
	const TypAgendy: Client["TypAgendy"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení informací o typu agendy (IGTypAgendy.Read).*/
	interface GTypAgendyReadRequestDto {
		/**Identifikátor.*/
		TypAgendy?: number|null;
	}
	const enum GTypAgendyReadRequestDtoNames { TypAgendy = "TypAgendy",}
	const enum GTypAgendyReadRequestDtoFragments { TypAgendy = "*",}
	const enum GTypAgendyReadRequestDtoTypes { TypAgendy = "number",}
	const enum GTypAgendyReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\IGTypSpousteciUdalosti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ spouštěcí události (ISL).*/
	interface TypSpousteciUdalosti {
		/**Vrátí data typu spouštěcí události.*/
		read(rq?:Gordic.Gin.Interface.GTypSpousteciUdalostiReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GTypSpousteciUdalostiReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GTypSpousteciUdalostiReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GTypSpousteciUdalostiDto>>;
		/**Vrátí seznam typu spouštěcích událostí dle zadaných kritérií.
		*     
		*     Pokud není použit filtr na aktivitu, tak se použije automticky filtr na aktivní.
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GTypSpousteciUdalostiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypSpousteciUdalosti: ServiceBase & Catalog.TypSpousteciUdalosti;
	}
	const TypSpousteciUdalosti: Client["TypSpousteciUdalosti"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení typu spouštěcí události (IGTypSpousteciUdalosti.Read).*/
	interface GTypSpousteciUdalostiReadRequestDto {
		/**Identifikátor.*/
		IxsSpu?: string|null;
	}
	const enum GTypSpousteciUdalostiReadRequestDtoNames { IxsSpu = "IxsSpu",}
	const enum GTypSpousteciUdalostiReadRequestDtoFragments { IxsSpu = "*",}
	const enum GTypSpousteciUdalostiReadRequestDtoTypes { IxsSpu = "string",}
	const enum GTypSpousteciUdalostiReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\Dto\GGinvovkDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtry pro navázané vlastnosti*/
	const enum FilGinvovk {
		sxs,
		typ_obj,
		ixs,
		typ_vps,
		aktivita,
		dat_zmena,
		zmenu_prov,
	}
	/**DBTABLE:ginvovl*/
	interface GGinvovkDto {
		/**DBCOLUMN:ginvovk.sxs*/
		sxs?: string|null;
		/**DBCOLUMN:ginvovk.typ_obj*/
		typ_obj?: number|null;
		/**DBCOLUMN:ginvovk.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:ginvovk.typ_vps*/
		typ_vps?: number|null;
		/**DBCOLUMN:ginvovk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginvovk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginvovk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginvovk.poradi*/
		poradi?: number|null;
		/**Gets the ixs.*/
		readonly Get_Ixs?: string|null;
		/**Gets the typ VPS.*/
		readonly Get_Typ_vps?: number|null;
	}
	const enum GGinvovkDtoNames { sxs = "sxs", typ_obj = "typ_obj", ixs = "ixs", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poradi = "poradi", Get_Ixs = "Get_Ixs", Get_Typ_vps = "Get_Typ_vps",}
	const enum GGinvovkDtoFragments { sxs = "Default", typ_obj = "Default", ixs = "Default", typ_vps = "Default", aktivita = "Default", dat_zmena = "Default", zmenu_prov = "Default", poradi = "Default", Get_Ixs = "*", Get_Typ_vps = "*",}
	const enum GGinvovkDtoTypes { sxs = "string", typ_obj = "number", ixs = "string", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poradi = "number", Get_Ixs = "string", Get_Typ_vps = "number",}
	const enum GGinvovkDtoTypeLengths { ixs = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\Dto\GGinvovpDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtry pro zástupy*/
	const enum FilGinvovp {
		typ_obj,
		ixs,
		typ_vps,
		aktivita,
		dat_zmena,
		zmenu_prov,
	}
	/**DBTABLE:ginvovl*/
	interface GGinvovpDto {
		/**DBCOLUMN:ginvovl.typ_obj*/
		typ_obj?: number|null;
		/**DBCOLUMN:ginvovl.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:ginvovl.typ_vps*/
		typ_vps?: number|null;
		/**DBCOLUMN:ginvovl.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginvovl.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginvovl.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Gets the ixs.*/
		readonly Get_Ixs?: string|null;
		/**Gets the typ VPS.*/
		readonly Get_Typ_vps?: number|null;
	}
	const enum GGinvovpDtoNames { typ_obj = "typ_obj", ixs = "ixs", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Get_Ixs = "Get_Ixs", Get_Typ_vps = "Get_Typ_vps",}
	const enum GGinvovpDtoFragments { typ_obj = "Default", ixs = "Default", typ_vps = "Default", aktivita = "Default", dat_zmena = "Default", zmenu_prov = "Default", Get_Ixs = "*", Get_Typ_vps = "*",}
	const enum GGinvovpDtoTypes { typ_obj = "number", ixs = "string", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Get_Ixs = "string", Get_Typ_vps = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\Dto\GSkartacniRezimDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Skartační režim (ginsskr).*/
	interface GSkartacniRezimDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_GINSSKR?: string|null;
		/**ID skartačního režimu*/
		ixs_skr?: string|null;
		/**Identifikátor spouštěcí události*/
		ixs_spu?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Komentář*/
		komentar?: string|null;
		/**Odůvodneni*/
		oduvodneni?: string|null;
		/**Skartační znak*/
		skar_znak?: string|null;
		/**Skartační lhůta*/
		skar_lhuta?: number|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Aktivita*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Id změnu provedl*/
		zmenu_prov?: string|null;
		/**Kontrolní lhůta*/
		kontrolni_lhuta?: number|null;
		/**Rok vyřazení*/
		rok_vyrazeni?: number|null;
		/**Id změnu provedl*/
		lic?: string|null;
		/**Autor poslední změny.*/
		ZmenuProvedl?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GSkartacniRezimDtoNames { FRAGMENT_GINSSKR = "FRAGMENT_GINSSKR", ixs_skr = "ixs_skr", ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", komentar = "komentar", oduvodneni = "oduvodneni", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrolni_lhuta = "kontrolni_lhuta", rok_vyrazeni = "rok_vyrazeni", lic = "lic", ZmenuProvedl = "ZmenuProvedl",}
	const enum GSkartacniRezimDtoFragments { FRAGMENT_GINSSKR = "*", ixs_skr = "*", ixs_spu = "GINSSKR", zkratka = "GINSSKR", nazev = "GINSSKR", poznamka = "GINSSKR", komentar = "GINSSKR", oduvodneni = "GINSSKR", skar_znak = "GINSSKR", skar_lhuta = "GINSSKR", dat_od = "GINSSKR", dat_do = "GINSSKR", aktivita = "GINSSKR", dat_zmena = "GINSSKR", zmenu_prov = "GINSSKR", kontrolni_lhuta = "GINSSKR", rok_vyrazeni = "GINSSKR", lic = "GINSSKR", ZmenuProvedl = "*",}
	const enum GSkartacniRezimDtoTypes { FRAGMENT_GINSSKR = "string", ixs_skr = "string", ixs_spu = "string", zkratka = "string", nazev = "string", poznamka = "string", komentar = "string", oduvodneni = "string", skar_znak = "string", skar_lhuta = "number", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dat_zmena = "JsonDate", zmenu_prov = "string", kontrolni_lhuta = "number", rok_vyrazeni = "number", lic = "string", ZmenuProvedl = "Gordic.Gin.Interface.GGinszmpDto",}
	const enum GSkartacniRezimDtoTypeLengths { zkratka = 16, nazev = 100, poznamka = 254, komentar = 254, oduvodneni = 254, skar_znak = 2, lic = 4,}
	/**Skartační režimy filtr (ginsskr).*/
	const enum GSkartacniRezimFilter {
		/**ID skartačního režimu*/
		ixs_skr,
		/**Spouštění událost*/
		ixs_spu,
		/**zkratka*/
		zkratka,
		/**název*/
		nazev,
		/**poznámka*/
		poznamka,
		/**Komentář*/
		komentar,
		/**Odůvodnění*/
		oduvodneni,
		/**Skartační znak*/
		skar_znak,
		/**Skartační lhůta*/
		skar_lhuta,
		/**Datum počátku platnosti záznamu*/
		dat_od,
		/**Datum konce platnosti záznamu*/
		dat_do,
		/**aktivita*/
		aktivita,
		/**datum poslední změny*/
		dat_zmena,
		/**kdo provedl poslední změnu*/
		zmenu_prov,
		/**Kontrolní lhůta*/
		kontrolni_lhuta,
		/**Rok vyřazení*/
		rok_vyrazeni,
		/**licence*/
		lic,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Gin\Dto\GVecnaSkupinaDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Věcná skupina (ginsvsk).*/
	interface GVecnaSkupinaDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_BASE?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_PERMISSION?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_POZASTAVENI_SKARTACE?: string|null;
		/**Identifikátor věcné skupiny.*/
		ixs_vsk?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Plně určený spisový znak*/
		spis_znak?: string|null;
		/**Jednoduchý spisový znak*/
		spis_znak_short?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Identifikátor nadřazené věcné skupiny.*/
		ixs_vsk_nad?: string|null;
		/**Identifikátor následující věcné skupiny.*/
		ixs_vsk_next?: string|null;
		/**Identifikátor skartačního režimu.*/
		ixs_skr?: string|null;
		/**skartační znak.*/
		skar_znak?: string|null;
		/**skartační lhůta*/
		skar_lhuta?: number|null;
		/**název spouštěcí události.*/
		nazev_spu?: string|null;
		/**Určení VSK*/
		urceni_spis_z?: number|null;
		/**Příznak trvalého skartačního souhlasu*/
		priz_trvskar?: number|null;
		/**Příznak pozastaveni skartace*/
		priz_poz_skar?: number|null;
		/**Příznak kontroly formátu*/
		priz_kon_form?: number|null;
		/**id způsob přiřazení ČJ*/
		zpus_prid_cj?: number|null;
		/**přiznak oprávnění pouze pro vyjmenovaná funkční místa*/
		priz_vazba_fun?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**aktivita.*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**aktivita_vvsk.*/
		aktivita_vvsk?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**aktivita_vvsr.*/
		aktivita_vvsr?: number|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**Způsob přiřazení ČJ*/
		zpus_prid_cj_txt?: string|null;
		/**Určení spis.znaku*/
		urceni_spis_z_txt?: string|null;
		/**Důvod pozastavení skartace*/
		duvod_poz_skar?: string|null;
		/**Identifikátor uživatele, který pozastavil skartaci.*/
		ixs_zmp_poz_skar?: string|null;
		/**Datum pozastavení skartace.*/
		dat_poz_skar?: JsonDate|null;
		/**Priz oprávněni funkčního místa k věcné skupině.*/
		VskUserPermission?: number|null;
	}
	const enum GVecnaSkupinaDtoNames { FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_PERMISSION = "FRAGMENT_PERMISSION", FRAGMENT_POZASTAVENI_SKARTACE = "FRAGMENT_POZASTAVENI_SKARTACE", ixs_vsk = "ixs_vsk", ico = "ico", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", spis_znak = "spis_znak", spis_znak_short = "spis_znak_short", poznamka = "poznamka", ixs_vsk_nad = "ixs_vsk_nad", ixs_vsk_next = "ixs_vsk_next", ixs_skr = "ixs_skr", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev_spu = "nazev_spu", urceni_spis_z = "urceni_spis_z", priz_trvskar = "priz_trvskar", priz_poz_skar = "priz_poz_skar", priz_kon_form = "priz_kon_form", zpus_prid_cj = "zpus_prid_cj", priz_vazba_fun = "priz_vazba_fun", dat_zmena = "dat_zmena", aktivita = "aktivita", aktivita_vvsk = "aktivita_vvsk", aktivita_vvsr = "aktivita_vvsr", zmenu_prov = "zmenu_prov", zpus_prid_cj_txt = "zpus_prid_cj_txt", urceni_spis_z_txt = "urceni_spis_z_txt", duvod_poz_skar = "duvod_poz_skar", ixs_zmp_poz_skar = "ixs_zmp_poz_skar", dat_poz_skar = "dat_poz_skar", VskUserPermission = "VskUserPermission",}
	const enum GVecnaSkupinaDtoFragments { FRAGMENT_BASE = "*", FRAGMENT_PERMISSION = "*", FRAGMENT_POZASTAVENI_SKARTACE = "*", ixs_vsk = "*", ico = "FRAGMENT_GINSVSK_BASE", nazev = "FRAGMENT_GINSVSK_BASE", dat_od = "FRAGMENT_GINSVSK_BASE", dat_do = "FRAGMENT_GINSVSK_BASE", spis_znak = "FRAGMENT_GINSVSK_BASE", spis_znak_short = "FRAGMENT_GINSVSK_BASE", poznamka = "FRAGMENT_GINSVSK_BASE", ixs_vsk_nad = "FRAGMENT_GINSVSK_BASE", ixs_vsk_next = "FRAGMENT_GINSVSK_BASE", ixs_skr = "FRAGMENT_GINSVSK_BASE", skar_znak = "FRAGMENT_GINSVSK_BASE", skar_lhuta = "FRAGMENT_GINSVSK_BASE", nazev_spu = "FRAGMENT_GINSVSK_BASE", urceni_spis_z = "FRAGMENT_GINSVSK_BASE", priz_trvskar = "FRAGMENT_GINSVSK_BASE", priz_poz_skar = "FRAGMENT_GINSVSK_BASE", priz_kon_form = "FRAGMENT_GINSVSK_BASE", zpus_prid_cj = "FRAGMENT_GINSVSK_BASE", priz_vazba_fun = "FRAGMENT_GINSVSK_PERMISSION", dat_zmena = "FRAGMENT_GINSVSK_BASE", aktivita = "FRAGMENT_GINSVSK_BASE", aktivita_vvsk = "FRAGMENT_GINSVSK_PERMISSION", aktivita_vvsr = "FRAGMENT_GINSVSK_PERMISSION", zmenu_prov = "FRAGMENT_GINSVSK_BASE", zpus_prid_cj_txt = "FRAGMENT_GINSVSK_BASE", urceni_spis_z_txt = "FRAGMENT_GINSVSK_BASE", duvod_poz_skar = "FRAGMENT_GINSVSK_POZASTAVENI_SKARTACE", ixs_zmp_poz_skar = "FRAGMENT_GINSVSK_POZASTAVENI_SKARTACE", dat_poz_skar = "FRAGMENT_GINSVSK_POZASTAVENI_SKARTACE", VskUserPermission = "FRAGMENT_GINSVSK_PERMISSION",}
	const enum GVecnaSkupinaDtoTypes { FRAGMENT_BASE = "string", FRAGMENT_PERMISSION = "string", FRAGMENT_POZASTAVENI_SKARTACE = "string", ixs_vsk = "string", ico = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", spis_znak = "string", spis_znak_short = "string", poznamka = "string", ixs_vsk_nad = "string", ixs_vsk_next = "string", ixs_skr = "string", skar_znak = "string", skar_lhuta = "number", nazev_spu = "string", urceni_spis_z = "number", priz_trvskar = "number", priz_poz_skar = "number", priz_kon_form = "number", zpus_prid_cj = "number", priz_vazba_fun = "number", dat_zmena = "JsonDate", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", aktivita_vvsk = "Gordic.Ginis.DbModel.GGincaktEnum", aktivita_vvsr = "number", zmenu_prov = "string", zpus_prid_cj_txt = "string", urceni_spis_z_txt = "string", duvod_poz_skar = "string", ixs_zmp_poz_skar = "string", dat_poz_skar = "JsonDate", VskUserPermission = "number",}
	const enum GVecnaSkupinaDtoTypeLengths { ixs_vsk = 12, ico = 10, nazev = 100, spis_znak = 255, spis_znak_short = 100, poznamka = 254, ixs_vsk_nad = 12, ixs_vsk_next = 12, ixs_skr = 12, skar_znak = 2, nazev_spu = 100, aktivita = 12, aktivita_vvsk = 12, aktivita_vvsr = 12, zmenu_prov = 12, zpus_prid_cj_txt = 100, urceni_spis_z_txt = 100, duvod_poz_skar = 254,}
	/**Věcna skupina znak (ginsvsk).*/
	const enum GVecnaSkupinaFilter {
		/**Identifikátor věcné skupiny.*/
		ixs_vsk,
		/**IČO.*/
		ico,
		/**Název.*/
		nazev,
		/**Platnost OD.*/
		dat_od,
		/**Platnost DO.*/
		dat_do,
		/**Plně určený spisový znak*/
		spis_znak,
		/**Jednoduchý spisový znak*/
		spis_znak_short,
		/**Identifikátor nadřízené věcné skupiny*/
		ixs_vsk_nad,
		/**Skartační režimy*/
		ixs_skr,
		/**Způsob přidělování ČJ*/
		zpus_prid_cj,
		/**Trvalý skartační souhlas*/
		priz_trvskar,
		/**původní věcná skupina*/
		ixs_vsk_prev,
		/**následující věcná skupina*/
		ixs_vsk_next,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\HledaniIxs\HledaniIxsInfo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání Ixs skrz Ginisem*/
	interface HledaniIxsInfo {
		/**Reads the specified rq.*/
		findIxs(rq?:Gordic.Gin.Interface.GHledaniIxsInfoDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GHledaniIxsInfoDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GHledaniIxsInfoDto>,GServiceReadResponse<Gordic.Gin.Interface.GHledaniIxsInfoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniIxsInfo: ServiceBase & Catalog.HledaniIxsInfo;
	}
	const HledaniIxsInfo: Client["HledaniIxsInfo"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\HledaniIxs\Dto\GHledaniIxsInfoDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**dto k hledání*/
	interface GHledaniIxsInfoDto {
		/**Gets or sets the ixs.*/
		ixs?: string|null;
		/**Zda už byl zjištěn typ hledaného pidu*/
		typIxsZjisten?: boolean|null;
		/**Gets or sets the ixs.*/
		typIxs?: Gordic.Gin.Interface.GHledaniTypIxs|null;
		/**Typ ag.*/
		typ_ag?: number|null;
		/**zda je v tabulce SSL*/
		s_ssl?: number|null;
		/**vytažená fáze z gincfaz*/
		ZjistenaFaze?: string|null;
		/**vytažená fáze z gincfaz*/
		AktualniFaze?: string|null;
		/**vytažená submodel z gincfaz*/
		ZjistenySubmodel?: string|null;
		/**Gets or sets the apps.*/
		apps?: Gordic.Gin.Interface.AppsDto[]|null;
	}
	const enum GHledaniIxsInfoDtoNames { ixs = "ixs", typIxsZjisten = "typIxsZjisten", typIxs = "typIxs", typ_ag = "typ_ag", s_ssl = "s_ssl", ZjistenaFaze = "ZjistenaFaze", AktualniFaze = "AktualniFaze", ZjistenySubmodel = "ZjistenySubmodel", apps = "apps",}
	const enum GHledaniIxsInfoDtoFragments { ixs = "*", typIxsZjisten = "*", typIxs = "*", typ_ag = "*", s_ssl = "*", ZjistenaFaze = "*", AktualniFaze = "*", ZjistenySubmodel = "*", apps = "*",}
	const enum GHledaniIxsInfoDtoTypes { ixs = "string", typIxsZjisten = "boolean", typIxs = "Gordic.Gin.Interface.GHledaniTypIxs", typ_ag = "number", s_ssl = "number", ZjistenaFaze = "string", AktualniFaze = "string", ZjistenySubmodel = "string", apps = "Gordic.Gin.Interface.AppsDto[]",}
	/**filtry*/
	const enum GHledaniIxsInfoFilter {
		/**The ixs*/
		ixs,
	}
	/**ruzne typy ixp*/
	const enum GHledaniTypIxs {
		/**The WFL pisemnost*/
		wflPisemnost=10,
		/**The WFL el. obraz / hlavni priloha*/
		wflObraz=20,
		/**The WFL valid ixs*/
		wflValidIxs=100,
		/**Sxs zasilky*/
		wflZasilkaSxs=200,
		/**IxsZup balíku.*/
		spiBalikIxs=300,
		/**The epk detail zadost*/
		epkDetailZadost=400,
		/**The esu detail*/
		esuDetail=500,
	}
	interface AppsDto {
		/**Gets or sets the description.*/
		description?: string|null;
		/**Gets or sets the description.*/
		faze?: string|null;
		/**Gets or sets the description.*/
		icon?: string|null;
		/**Gets or sets the description.*/
		license?: string|null;
		/**Gets or sets the description.*/
		shortcut?: string|null;
		/**Gets or sets the description.*/
		url?: string|null;
	}
	const enum AppsDtoNames { description = "description", faze = "faze", icon = "icon", license = "license", shortcut = "shortcut", url = "url",}
	const enum AppsDtoFragments { description = "*", faze = "*", icon = "*", license = "*", shortcut = "*", url = "*",}
	const enum AppsDtoTypes { description = "string", faze = "string", icon = "string", license = "string", shortcut = "string", url = "string",}
	interface RetFromOtevriDetailDto {
		/**Zda je detail ze stejní agendy jako je aktuální agenda*/
		openItSelf?: boolean|null;
		/**window pokud se otevřela jiná záložka*/
		Window?: object|null;
		/**informace o ixp*/
		info?: Gordic.Gin.Interface.GHledaniIxsInfoDto|null;
		/**když se něco nepovede*/
		ErrorTxt?: string|null;
	}
	const enum RetFromOtevriDetailDtoNames { openItSelf = "openItSelf", Window = "Window", info = "info", ErrorTxt = "ErrorTxt",}
	const enum RetFromOtevriDetailDtoFragments { openItSelf = "*", Window = "*", info = "*", ErrorTxt = "*",}
	const enum RetFromOtevriDetailDtoTypes { openItSelf = "boolean", Window = "object", info = "Gordic.Gin.Interface.GHledaniIxsInfoDto", ErrorTxt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\FunkcniMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Funkční místo*/
	interface FunkcniMisto {
		read(rq?:Gordic.Gin.Interface.GFunkcniMistoDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GFunkcniMistoDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GFunkcniMistoDto>,GServiceReadResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		listZmp(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		create(rq?:Gordic.Gin.Interface.GFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>,GServiceSaveResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		update(rq?:Gordic.Gin.Interface.GFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>,GServiceSaveResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		upsert(rq?:Gordic.Gin.Interface.GFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>,GServiceSaveResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		delete(rq?:Gordic.Gin.Interface.GFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GFunkcniMistoDto>,GServiceSaveResponse<Gordic.Gin.Interface.GFunkcniMistoDto>>;
		/**Zjistí login referenta v danné funkci*/
		loginReferentaVeFunkci(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string>;
		/**Testuje, zda zadaný referent vykonává dannou funkci, či je alespoň jejím zástupem*/
		testPlatnyZastupFunkce(rq?:CallParams<{ixsFun:string,ixsRef:string,zastupFunkce:boolean}>): _Task<{ixsFun:string,ixsRef:string,zastupFunkce:boolean},void>;
		vratFunDleIdo(rq?:CallParams<{Idk:string,ixsFun:string,zastup:boolean}>): _Task<{Idk:string,ixsFun:string,zastup:boolean},string>;
		/**Testuje, zda referent s danným přihlašovacím jménem a heslem je v systému známý, zda je heslo správné a zda vykonává dannou funkci, či je alespoň jejím zástupem*/
		testPlatnyLoginZastupuProFunkci(rq?:CallParams<{ixsFun:string,loginName:string,passwd:string}>): _Task<{ixsFun:string,loginName:string,passwd:string},string>;
		/**Vrátí název referenta v danné funkci funkce (např. Ing. Králíček Milan, Hlavní účetní )*/
		jmenoReferentaVeFunkciANazevFunkce(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string>;
		/**Vrací identifikátor referenta na danné funkci*/
		ixsRefReferentaNaFunkci(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string>;
		/**Vrací název danné funkce*/
		nazevFunkce(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string>;
		/**Vrátí plné jméno referenta ve funkci, název funkce, název uzlu a název ORJ.*/
		nazvyReferentaFunkceUzluOrj(rq?:CallParams<{ixsFun:string,nazevRef:string,nazevFun:string,nazevOrj:string,nazevSu:string}>): _Task<{ixsFun:string,nazevRef:string,nazevFun:string,nazevOrj:string,nazevSu:string},void>;
		/**Vrací ixp nadřízene funkce danné funkce*/
		ixsNadrizeneFunkce(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string>;
		/**Vrací seznam ixp nadřízených funkcí danné funkce*/
		ixpNadrizenychFunkci(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string[]>;
		/**Vrací seznam ixp podřízených funkcí danné funkce*/
		ixpPodrizenychFunkci(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},string[]>;
		/**Zda funkce s daným ixsFun existuje*/
		existujeFunkce(rq?:CallParams<{ixsFun:string}>): _Task<{ixsFun:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FunkcniMisto: ServiceBase & Catalog.FunkcniMisto;
	}
	const FunkcniMisto: Client["FunkcniMisto"];
}
declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginsfun*/
	interface GFunkcniMistoDto {
		/**DBCOLUMN:ginsfun.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginsfun.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsfun.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsfun.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsfun.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsfun.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsfun.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsfun.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsfun.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsfun.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsfun.nazev_su*/
		nazev_su?: string|null;
		/**DBCOLUMN:ginsfun.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsfun.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsfun.uroven_fun*/
		uroven_fun?: number|null;
		/**DBCOLUMN:ginsfun.priorita_max*/
		priorita_max?: number|null;
		/**DBCOLUMN:ginsfun.fc*/
		fc?: string|null;
		/**DBCOLUMN:ginsfun.ixs_nad*/
		ixs_nad?: string|null;
		/**DBCOLUMN:ginsfun.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginsfun.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:ginsfun.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:ginsfun.nazev_orj*/
		nazev_orj?: string|null;
		/**DBCOLUMN:ginsfun.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:ginsfun.ur_hod*/
		ur_hod?: string|null;
		/**DBCOLUMN:ginsfun.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsfun.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsfun.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsfun.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:ginsfun.status_fun*/
		status_fun?: number|null;
		/**DBCOLUMN:ginsfun.pri_fun*/
		pri_fun?: number|null;
		/**DBCOLUMN:ginsfun.ixs_zmp*/
		ixs_zmp?: string|null;
		/**DBCOLUMN:ginsfun.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsfun.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:ginsfun.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsfun.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:ginsfun.zkratka_su*/
		zkratka_su?: string|null;
		/**DBCOLUMN:ginsfun.url*/
		url?: string|null;
		/**DBCOLUMN:ginsfun.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsfun.aktuz*/
		aktuz?: number|null;
		/**DBCOLUMN:ginsfun.poradi_log*/
		poradi_log?: number|null;
		/**DBCOLUMN:ginsfun.ixs_ose*/
		ixs_ose?: string|null;
		/**DBCOLUMN:ginsfun.priz_servis*/
		priz_servis?: number|null;
		/**DBCOLUMN:ginsfun.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsfun.ixs_su_navrh*/
		ixs_su_navrh?: string|null;
		/**DBCOLUMN:ginsfun.barva*/
		barva?: string|null;
		/**DBCOLUMN:ginsfun.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsfun.ixs_zap*/
		ixs_zap?: string|null;
		Referent?: Gordic.Gin.Interface.GReferentDto|null;
		Permissions?: Gordic.Gin.Interface.GFunkcniMistoPermissions|null;
	}
	const enum GFunkcniMistoDtoNames { ixs_fun = "ixs_fun", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", nazev_su = "nazev_su", zkratka = "zkratka", nazev = "nazev", uroven_fun = "uroven_fun", priorita_max = "priorita_max", fc = "fc", ixs_nad = "ixs_nad", ixs_ref = "ixs_ref", nazev_ref = "nazev_ref", ixs_orj = "ixs_orj", nazev_orj = "nazev_orj", mistnost_kod = "mistnost_kod", ur_hod = "ur_hod", tel = "tel", mail = "mail", fax = "fax", ofic_nazev = "ofic_nazev", status_fun = "status_fun", pri_fun = "pri_fun", ixs_zmp = "ixs_zmp", cs_nazev = "cs_nazev", num_pod = "num_pod", dat_mpd = "dat_mpd", nazev_rf = "nazev_rf", zkratka_su = "zkratka_su", url = "url", z_int = "z_int", aktuz = "aktuz", poradi_log = "poradi_log", ixs_ose = "ixs_ose", priz_servis = "priz_servis", ixs_lpc = "ixs_lpc", ixs_su_navrh = "ixs_su_navrh", barva = "barva", ico = "ico", ixs_zap = "ixs_zap", Referent = "Referent", Permissions = "Permissions",}
	const enum GFunkcniMistoDtoFragments { ixs_fun = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "e", dat_od = "e", dat_do = "e", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", nazev_su = "c", zkratka = "c", nazev = "c", uroven_fun = "*", priorita_max = "*", fc = "*", ixs_nad = "*", ixs_ref = "*", nazev_ref = "*", ixs_orj = "*", nazev_orj = "*", mistnost_kod = "*", ur_hod = "*", tel = "f", mail = "f", fax = "f", ofic_nazev = "e", status_fun = "*", pri_fun = "*", ixs_zmp = "*", cs_nazev = "*", num_pod = "*", dat_mpd = "*", nazev_rf = "b", zkratka_su = "c", url = "*", z_int = "*", aktuz = "*", poradi_log = "*", ixs_ose = "*", priz_servis = "*", ixs_lpc = "*", ixs_su_navrh = "*", barva = "*", ico = "*", ixs_zap = "*", Referent = "*", Permissions = "*",}
	const enum GFunkcniMistoDtoTypes { ixs_fun = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", nazev_su = "string", zkratka = "string", nazev = "string", uroven_fun = "number", priorita_max = "number", fc = "string", ixs_nad = "string", ixs_ref = "string", nazev_ref = "string", ixs_orj = "string", nazev_orj = "string", mistnost_kod = "string", ur_hod = "string", tel = "string", mail = "string", fax = "string", ofic_nazev = "string", status_fun = "number", pri_fun = "number", ixs_zmp = "string", cs_nazev = "string", num_pod = "number", dat_mpd = "JsonDate", nazev_rf = "string", zkratka_su = "string", url = "string", z_int = "number", aktuz = "number", poradi_log = "number", ixs_ose = "string", priz_servis = "number", ixs_lpc = "string", ixs_su_navrh = "string", barva = "string", ico = "string", ixs_zap = "string", Referent = "Gordic.Gin.Interface.GReferentDto", Permissions = "Gordic.Gin.Interface.GFunkcniMistoPermissions",}
	interface GFunkcniMistoPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GFunkcniMistoPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate",}
	const enum GFunkcniMistoPermissionsFragments { CanCreate = "*", CanUpdate = "*",}
	const enum GFunkcniMistoPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission",}
	/**Výčet filtračních kritérií pro seznam funkcí*/
	const enum GFunkcniMistoFilter {
		/**identifikátor funkce*/
		ixs_fun,
		/**licence*/
		lic,
		/**aktivita*/
		aktivita,
		/**arw*/
		arw,
		/**poznámka*/
		poznamka,
		/**datum platnosti od*/
		dat_od,
		/**datum platnosti do*/
		dat_do,
		/**datum poslední změny*/
		dat_zmena,
		/**kdo provedl poslední změnu*/
		zmenu_prov,
		/**identifikace spisového uzlu do kterého funkce patří*/
		ixs_su,
		/**název uzlu do kterého funkce patří*/
		nazev_su,
		/**zkratka funkce*/
		zkratka,
		/**název funkce*/
		nazev,
		/**úroveň*/
		uroven_fun,
		/**priorita*/
		priorita_max,
		/**identifikace nadřízené funkce*/
		ixs_nad,
		/**identifikace referenta ve funkci*/
		ixs_ref,
		/**název referenta ve funkci*/
		nazev_ref,
		/**identifikace organizační jednotky*/
		ixs_orj,
		/**název organizační jednotky*/
		nazev_orj,
		/**kód místnosti*/
		mistnost_kod,
		/**telefon*/
		tel,
		/**mail*/
		mail,
		/**fax*/
		fax,
		/**oficiální název*/
		ofic_nazev,
		/**kdo provedl poslední změnu*/
		ixs_zmp,
		/**název v cs tvaru*/
		cs_nazev,
		/**název funkce a referenta ve funkci*/
		nazev_rf,
		/**url*/
		url,
		/**zda je z interface*/
		z_int,
		/**identifikace obecného seskupení*/
		ixs_ose,
		/**jméno referenta na funkci*/
		jmeno_rf,
		/**příjmení referenta na funkci*/
		prijmeni_rf,
		/**titul referenta na funkci*/
		tit_pred_rf,
		/**titul referenta na funkci*/
		tit_za_rf,
		/**login referenta na funkci*/
		login_name_rf,
		/**mail referenta na funkci*/
		mail_rf,
		/**loginy referenta na funkci*/
		login_names_rf,
		/**login externího referenta na funkci*/
		login_name_ext_rf,
		/**výrazový filtr nad názvem*/
		nazev__expr,
		/**Testuj vazbu na spisový deník (hodnoty: 0/1)*/
		VazbaNaSpisovyDenik,
		/**Test na povolené agendy (hodnoty: 0/1)*/
		DlePovolenychAgend,
		/**Test na povolené faze (string faze)*/
		DlePovolenychFazi,
		/**Test na povolené instance (string název instance)*/
		DlePovolenychInstanci,
		/**Testuj vazbu na přidružená střediska (hodnoty: 0/1)*/
		PridruzenaStrediska,
		/**Testuj vazbu na cizí střediska (hodnoty: 0/1)*/
		CiziStrediska,
		/**Filtrovat funkce, které mají přístup do knihy (PRO EKO !!)*/
		VrfuIxpDen,
		/**Filtrovat funkce, pro danou subřadu (PRO RKO !!)*/
		VrfuSubrada,
		/**Filtrovat zdali mensi nezli aktivita 900(hodnoty 0/1) - vazba funkce/kniha/subřada (PRO EKO !!)*/
		VrfuAktivita,
		/**Typ_ag pro filtr pres vrfu tabulku. Pokud neni uvedeno, bere se dle prihlaseneho modulu*/
		VrfuTypAg,
		/**Určuje, zda budou zobrazeny také servisní funkce (hodnoty: true/false)*/
		VcetneServisnichFunkci,
		/**pouze takové, jejichž uzel je v sslsspi*/
		ExistujeSpisovna,
		/**Filtruje funkce, které mají přístup do zadané spisovny (zadej ixs_spi)*/
		SPristupemDoSpisovny,
		/**Filtruje funkce, které mají ve vazbě na role nastavenu schvalovací roli (zadej ixs_sro)*/
		SeSchvalovaciRoli,
		/**Filtruje funkce, které mají ve vazbě na role nastavenu šablonu schvalovací role (zadej ixs_ssa)*/
		SeSablonouSchvalovaciRole,
		/**Filtruje funkce, které mají ve vazbě na role nastaven datum od*/
		SDatumOdSchvalovaciRole,
		/**Filtruje funkce, které mají ve vazbě na role nastaven datum do*/
		SDatumDoSchvalovaciRole,
		/**Přidá všechny funkce, které mají přiřazenou schvalovací roli bez šablony (zadej ixs_sro)*/
		UnionSchvalovaciRoleBezSablony,
		/**Určuje, zda bude zobrazena také funkce s PIDem 0000SF00000Z  (fuknce Nikdo) (hodnoty: true/false)*/
		VcetneNullFunkce,
		/**Určuje, že budou zobrazeny pouze ty funkce, které mají naadministrován nějaký typ pohledávky.*/
		PovoleneProTypyPhl,
		/**IČ pro filtr na ucs,nks. Samotné nic nedělá*/
		EkoIco,
		/**UCS pro filtrování funkcí (ekovfns)*/
		EkoUcs,
		/**NKS pro filtrování funkcí (ekovfte)*/
		EkoNks,
		/**Rok pro některé filtry. Samotné nic nedělá*/
		EkoRok,
		/**Filtr algoritmu*/
		Algoritmus,
		/**IXP pro Filtr algoritmu*/
		AlgoritmusIxp,
		/**G+*/
		gplus,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGAppActionTimer.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Aplikační počítadla
	* @domain GinisAdmin
	* @businessObject AppActionTimer
	*/
	interface AppActionTimer {
		/**Smaže všechna uložená počítadla*/
		clear(rq?:Gordic.Gin.Interface.GAppActionTimerForClearDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimerForClearDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimerForClearDto>,GServiceActionResponse<Gordic.Gin.Interface.GAppActionTimerForClearDto>>;
		/**Zápis času všech akcí do DB*/
		save(rq?:Gordic.Gin.Interface.GAppActionTimerForSaveDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimerForSaveDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimerForSaveDto>,GServiceActionResponse<Gordic.Gin.Interface.GAppActionTimerForSaveDto>>;
		/**Povolení/zakázání sbírat metriky
		*     Pokud má vstupní paramert dat ActionTimersEnabled hodnotu null, potom se stav nepřepne. Pouze se vrátí aktuální hodnota stavu.
		*/
		setActionTimersEnabled(rq?:Gordic.Gin.Interface.GAppActionTimersEnabledDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimersEnabledDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimersEnabledDto>,GServiceActionResponse<Gordic.Gin.Interface.GAppActionTimersEnabledDto>>;
		/**Zápis času jedné identifikované akce z klientské strany*/
		addToTimer(rq?:Gordic.Gin.Interface.GAppActionTimerForAddDto|CallParams<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimerForAddDto>>): _Task<GServiceActionRequest<Gordic.Gin.Interface.GAppActionTimerForAddDto>,GServiceActionResponse<Gordic.Gin.Interface.GAppActionTimerForAddDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GAppActionTimerDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AppActionTimer: ServiceBase & Catalog.AppActionTimer;
	}
	const AppActionTimer: Client["AppActionTimer"];
}
declare namespace Gordic.Gin.Interface {
	/**DTO pro akci, která nepožaduje parametry - zatím*/
	interface GAppActionTimerForClearDto {
	}
	const enum GAppActionTimerForClearDtoNames {}
	const enum GAppActionTimerForClearDtoFragments {}
	const enum GAppActionTimerForClearDtoTypes {}
	const enum GAppActionTimerForClearDtoTypeLengths {}
	/**DTO pro akci, která nepožaduje parametry - zatím*/
	interface GAppActionTimerForSaveDto {
	}
	const enum GAppActionTimerForSaveDtoNames {}
	const enum GAppActionTimerForSaveDtoFragments {}
	const enum GAppActionTimerForSaveDtoTypes {}
	const enum GAppActionTimerForSaveDtoTypeLengths {}
	/**DTO pro službu ActionTimersEnabled*/
	interface GAppActionTimersEnabledDto {
		/**Příznak, zda je sbírání metrik povoleno*/
		ActionTimersEnabled?: boolean|null;
	}
	const enum GAppActionTimersEnabledDtoNames { ActionTimersEnabled = "ActionTimersEnabled",}
	const enum GAppActionTimersEnabledDtoFragments { ActionTimersEnabled = "detail",}
	const enum GAppActionTimersEnabledDtoTypes { ActionTimersEnabled = "boolean",}
	const enum GAppActionTimersEnabledDtoTypeLengths {}
	/**Informace o časech jedné akcé*/
	interface GAppActionTimerForAddDto {
		/**Identifikace akce*/
		ActionId?: string|null;
		/**Pojmenování akce - pro uživatele*/
		ActionName?: string|null;
		/**Celkové trvání akce v sekundách*/
		TotalSeconds?: JsonDecimal|null;
	}
	const enum GAppActionTimerForAddDtoNames { ActionId = "ActionId", ActionName = "ActionName", TotalSeconds = "TotalSeconds",}
	const enum GAppActionTimerForAddDtoFragments { ActionId = "seznam", ActionName = "seznam", TotalSeconds = "seznam",}
	const enum GAppActionTimerForAddDtoTypes { ActionId = "string", ActionName = "string", TotalSeconds = "JsonDecimal",}
	const enum GAppActionTimerForAddDtoTypeLengths {}
	/**Informace o celkových časech trvání jednoho typu akcí*/
	interface GAppActionTimerDto {
		/**Identifikace akce*/
		ActionId?: string|null;
		/**Pojmenování akce - pro uživatele*/
		ActionName?: string|null;
		/**Počet spuštění akce*/
		Count?: number|null;
		/**Celkové trvání akce v sekundách*/
		TotalSeconds?: JsonDecimal|null;
		/**Nejdelší trvání akce*/
		MaxSeconds?: JsonDecimal|null;
		/**Nejkratší trvání akce*/
		MinSeconds?: JsonDecimal|null;
		/**Nejkratší trvání akce*/
		Average?: JsonDecimal|null;
		/**Průměrné trvání akce bez Maxima*/
		AverageWithoutMax?: JsonDecimal|null;
		/**Celkové trvání akce v sekundách bez maxima*/
		TotalSecondsWithoutMax?: JsonDecimal|null;
	}
	const enum GAppActionTimerDtoNames { ActionId = "ActionId", ActionName = "ActionName", Count = "Count", TotalSeconds = "TotalSeconds", MaxSeconds = "MaxSeconds", MinSeconds = "MinSeconds", Average = "Average", AverageWithoutMax = "AverageWithoutMax", TotalSecondsWithoutMax = "TotalSecondsWithoutMax",}
	const enum GAppActionTimerDtoFragments { ActionId = "seznam", ActionName = "seznam", Count = "seznam", TotalSeconds = "seznam", MaxSeconds = "seznam", MinSeconds = "seznam", Average = "seznam", AverageWithoutMax = "seznam", TotalSecondsWithoutMax = "seznam",}
	const enum GAppActionTimerDtoTypes { ActionId = "string", ActionName = "string", Count = "number", TotalSeconds = "JsonDecimal", MaxSeconds = "JsonDecimal", MinSeconds = "JsonDecimal", Average = "JsonDecimal", AverageWithoutMax = "JsonDecimal", TotalSecondsWithoutMax = "JsonDecimal",}
	const enum GAppActionTimerDtoTypeLengths {}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAppActionTimerFilterEnum {
		/**ID*/
		ActionId,
		/**název*/
		ActionName,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlog.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL - Blogy*/
	interface Blog {
		/**Detail blogu*/
		read(rq?:Gordic.Gin.Interface.GBlogReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GBlogReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GBlogReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GBlogDto>>;
		/**Seznam blogů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogDto>>;
		/**Vytvoření nového blogu*/
		create(rq?:Gordic.Gin.Interface.GBlogUpsertDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogUpsertDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogDto>>;
		/**Upravení stávajícího blogu*/
		update(rq?:Gordic.Gin.Interface.GBlogUpsertDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogUpsertDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogDto>>;
		/**Zveřejnění blogu*/
		zverejnit(rq?:Gordic.Gin.Interface.GBlogActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogActionRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogDto>>;
		/**Zrušení zveřejnění blogu*/
		zrusitZverejneni(rq?:Gordic.Gin.Interface.GBlogActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogActionRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogDto>>;
		/**Smazání blogu*/
		smazat(rq?:Gordic.Gin.Interface.GBlogActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogActionRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Blog: ServiceBase & Catalog.Blog;
	}
	const Blog: Client["Blog"];
}
declare namespace Gordic.Gin.Interface {
	/**Filter pro blogový systém*/
	const enum GBlogFilter {
		/**Identifikátor blogu*/
		ixs_blg,
		/**Název blogu*/
		nazev,
		/**Typ blogu*/
		typ_blg,
		/**Poznámka*/
		poznamka,
		/**Aktivita*/
		aktivita,
		/**Datum změny*/
		dat_zmena,
		/**Změnu provedl*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlogClanek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL - Článek blogu*/
	interface BlogClanek {
		/**Detail článku*/
		read(rq?:Gordic.Gin.Interface.GBlogClanekReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GBlogClanekReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GBlogClanekReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Seznam článků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Seznam článků pro čtenáře*/
		listWidget(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Vytvoření nového článku*/
		create(rq?:Gordic.Gin.Interface.GBlogClanekUpsertDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekUpsertDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Upravení stávajícího článku*/
		update(rq?:Gordic.Gin.Interface.GBlogClanekUpsertDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekUpsertDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Zveřejnění článku*/
		zverejnit(rq?:Gordic.Gin.Interface.GBlogClanekActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekActionRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Zrušení zveřejnění článku*/
		zrusitZverejneni(rq?:Gordic.Gin.Interface.GBlogClanekActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekActionRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Smazání článku*/
		smazat(rq?:Gordic.Gin.Interface.GBlogClanekActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekActionRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Hromadné zveřejnení článků*/
		zverejnitHromadne(rq?:Gordic.Gin.Interface.GBlogClanekHromActionRequestDto|CallParams<GServiceGroupRequest<Gordic.Gin.Interface.GBlogClanekHromActionRequestDto>>): _Task<GServiceGroupRequest<Gordic.Gin.Interface.GBlogClanekHromActionRequestDto>,GServiceGroupResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Hromadné zrušení zveřejnění článků*/
		zrusitZverejneniHromadne(rq?:Gordic.Gin.Interface.GBlogClanekHromActionRequestDto|CallParams<GServiceGroupRequest<Gordic.Gin.Interface.GBlogClanekHromActionRequestDto>>): _Task<GServiceGroupRequest<Gordic.Gin.Interface.GBlogClanekHromActionRequestDto>,GServiceGroupResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
		/**Hromadné smazání článků*/
		smazatHromadne(rq?:Gordic.Gin.Interface.GBlogClanekHromActionRequestDto|CallParams<GServiceGroupRequest<Gordic.Gin.Interface.GBlogClanekHromActionRequestDto>>): _Task<GServiceGroupRequest<Gordic.Gin.Interface.GBlogClanekHromActionRequestDto>,GServiceGroupResponse<Gordic.Gin.Interface.GBlogClanekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BlogClanek: ServiceBase & Catalog.BlogClanek;
	}
	const BlogClanek: Client["BlogClanek"];
}
declare namespace Gordic.Gin.Interface {
	/**Filter pro články blogu*/
	const enum GBlogClanekFilter {
		/**Hlavní identifikátor tabulky Blog*/
		ixs_blg,
		/**aktivita*/
		aktivita,
		/**Hlavní identifikátor tabulky článků*/
		ixs_clb,
		/**Datum platnosti od*/
		dat_od,
		/**Datum platnosti do*/
		dat_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlogClanekHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL - Historie článků v blogovém systému*/
	interface BlogClanekHistorie {
		/**Seznam editací článku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogClanekHistorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BlogClanekHistorie: ServiceBase & Catalog.BlogClanekHistorie;
	}
	const BlogClanekHistorie: Client["BlogClanekHistorie"];
}
declare namespace Gordic.Gin.Interface {
	/**Filtr historie článků v blogovém systému*/
	const enum GBlogClanekHistorieFilter {
		/**Identifikátor článku*/
		ixs_clb,
		/**Identifikátor blogu*/
		ixs_blg,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlogClanekPredchozi.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Filter pro blogový systém*/
	const enum GBlogClanekPredchoziFilter {
		/**Část klíče identifikátoru tabulky historie změn*/
		ixs_clb,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlogClanekUdalost.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL - Události nad článkem blogu*/
	interface BlogClanekUdalost {
		/**Událost článku*/
		read(rq?:Gordic.Gin.Interface.GBlogClanekUdalostiDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GBlogClanekUdalostiDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GBlogClanekUdalostiDto>,GServiceReadResponse<Gordic.Gin.Interface.GBlogClanekUdalostiDto>>;
		/**Seznam událostí článku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogClanekUdalostiDto>>;
		/**Vytvoří událost nad článkem*/
		create(rq?:Gordic.Gin.Interface.GBlogClanekUdalostiUpsertDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekUdalostiUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GBlogClanekUdalostiUpsertDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BlogClanekUdalost: ServiceBase & Catalog.BlogClanekUdalost;
	}
	const BlogClanekUdalost: Client["BlogClanekUdalost"];
}
declare namespace Gordic.Gin.Interface {
	/**Filter pro události nad článkem blogu*/
	const enum GBlogClanekUdalostiFilter {
		/**Identifikátor článku*/
		ixs_clb,
		/**Hlavní identifikátor tabulky Blog*/
		ixs_blg,
		/**Typ změny události*/
		zmena_clb,
		/**zmenu_prov*/
		zmenu_prov,
		/**The aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlogEditori.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL - Editoři blogu*/
	interface BlogEditori {
		/**Přečte editora pomocí hodnot ixs_fun(identifikátor uživatele) a ixs_blg (identifikátor blogu)*/
		read(rq?:Gordic.Gin.Interface.GBlogEditoriDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GBlogEditoriDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GBlogEditoriDto>,GServiceReadResponse<Gordic.Gin.Interface.GBlogEditoriDto>>;
		/**Vrátí list všech editorů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogEditoriDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BlogEditori: ServiceBase & Catalog.BlogEditori;
	}
	const BlogEditori: Client["BlogEditori"];
}
declare namespace Gordic.Gin.Interface {
	/**Filter pro editory blogu*/
	const enum GBlogEditoriFilter {
		/**Hlavní identifikátor tabulky Blog*/
		ixs_blg,
		/**Identifikátor role*/
		ixs_fun,
		/**Název blogu*/
		nazev,
		/**The aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGBlogKonfigSkupiny.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL - Čtenáři blogu (konfigurační skupiny)*/
	interface BlogKonfigSkupiny {
		/**Read*/
		read(rq?:Gordic.Gin.Interface.GBlogKonfigSkupinyDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GBlogKonfigSkupinyDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GBlogKonfigSkupinyDto>,GServiceReadResponse<Gordic.Gin.Interface.GBlogKonfigSkupinyDto>>;
		/**Vrátí list všech konfig. skup.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GBlogKonfigSkupinyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BlogKonfigSkupiny: ServiceBase & Catalog.BlogKonfigSkupiny;
	}
	const BlogKonfigSkupiny: Client["BlogKonfigSkupiny"];
}
declare namespace Gordic.Gin.Interface {
	/**Filter pro konfig. skupiny*/
	const enum GBlogKonfigSkupinyFilter {
		/**Identifikátor konfigurační skupiny*/
		ixs_usr,
		/**Identifikátor blogu*/
		ixs_blg,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGGArticleFile.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface pro obrázky/soubory GArticle*/
	interface GArticleFile {
		/**Read*/
		read(rq?:Gordic.Gin.Interface.GArticleFileDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GArticleFileDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GArticleFileDto>,GServiceReadResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Read záznamu pro zjištění detailů a miniatury pro preview*/
		read_Preview(rq?:Gordic.Gin.Interface.GArticleFileDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GArticleFileDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GArticleFileDto>,GServiceReadResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Create*/
		create(rq?:Gordic.Gin.Interface.GArticleFileDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GArticleFileDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GArticleFileDto>,GServiceSaveResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Obecný list*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**List záznamů pro grid*/
		list_Grid(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Update záznamu (Nahradit, přejmenování)*/
		update(rq?:Gordic.Gin.Interface.GArticleFileDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GArticleFileDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GArticleFileDto>,GServiceSaveResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Získání aktuální velikosti všech souborů uživatele v db*/
		getTotalFilesSize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Delete - nastavení aktivity na 900*/
		delete(rq?:Gordic.Gin.Interface.GArticleFileDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GArticleFileDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GArticleFileDto>,GServiceSaveResponse<Gordic.Gin.Interface.GArticleFileDto>>;
		/**Hromadný delete - nastavení aktivity na 900*/
		deleteMore(rq?:CallParams<{data:Gordic.Gin.Interface.GArticleFileDto[]}>): _Task<{data:Gordic.Gin.Interface.GArticleFileDto[]},GServiceSaveResponse<Gordic.Gin.Interface.GArticleFileDto>[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GArticleFile: ServiceBase & Catalog.GArticleFile;
	}
	const GArticleFile: Client["GArticleFile"];
}
declare namespace Gordic.Gin.Interface {
	/**GFilterGArticleFile*/
	const enum GFilterGArticleFile {
		/**ixs_ble*/
		ixs_ble,
		/**Název*/
		nazev,
		/**MIME typ*/
		mime,
		/**Aktivita*/
		aktivita,
		/**Změnu provedl*/
		zmenu_prov,
		/**Datum změny*/
		dat_zmena,
		/**Velikost*/
		velikost,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGGinisLastSessions.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL pro přístup k seznamu aktuálně/nedávno pracujících uživatelů aktuální aplikace - seznam se buduje v statické paměti činností uživatelů
	* @domain GinisAdmin
	* @businessObject GinisLastSession
	*/
	interface GinisLastSession {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinisSessionDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GinisLastSession: ServiceBase & Catalog.GinisLastSession;
	}
	const GinisLastSession: Client["GinisLastSession"];
}
declare namespace Gordic.Gin.Interface {
	/**Informace o časech jedné session*/
	interface GGinisSessionDto {
		/**Identifikace GINIS session*/
		LogPorCislo?: number|null;
		/**Čas poslední zaznamenané akce uživatele proti databázi*/
		LastDbAction?: JsonDate|null;
		nazev_ref?: string|null;
		nazev_fun?: string|null;
		/**DBCOLUMN:ginllog.dat_login*/
		dat_login?: JsonDate|null;
		/**DBCOLUMN:ginllog.comp_name*/
		comp_name?: string|null;
		/**DBCOLUMN:ginllog.por_cislo_exu*/
		por_cislo_exu?: number|null;
	}
	const enum GGinisSessionDtoNames { LogPorCislo = "LogPorCislo", LastDbAction = "LastDbAction", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", dat_login = "dat_login", comp_name = "comp_name", por_cislo_exu = "por_cislo_exu",}
	const enum GGinisSessionDtoFragments { LogPorCislo = "seznam", LastDbAction = "seznam", nazev_ref = "seznam", nazev_fun = "seznam", dat_login = "seznam", comp_name = "seznam", por_cislo_exu = "seznam",}
	const enum GGinisSessionDtoTypes { LogPorCislo = "number", LastDbAction = "JsonDate", nazev_ref = "string", nazev_fun = "string", dat_login = "JsonDate", comp_name = "string", por_cislo_exu = "number",}
	const enum GGinisSessionDtoTypeLengths { comp_name = 254,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GGinisLastSessionsFilterEnum {
		Osoba,
		FunkcniMisto,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGKonfiguracniSkupiny.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL Konfigurační skupiny - ginsusr*/
	interface KonfiguracniSkupiny {
		/**Vrátí jeden záznam konfigurační skupiny*/
		read(rq?:Gordic.Gin.Interface.GGinsusrDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinsusrDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinsusrDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinsusrDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		KonfiguracniSkupiny: ServiceBase & Catalog.KonfiguracniSkupiny;
	}
	const KonfiguracniSkupiny: Client["KonfiguracniSkupiny"];
}
declare namespace Gordic.Gin.Interface {
	/**Filter pro blogový systém*/
	const enum GKonfiguracniSkupinyFilter {
		/**Hlavní identifikátor tabulky Blog*/
		ixs_usr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGSkartacniRezim.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Skartační režim (ginsskr).
	* @domain DRMS
	*/
	interface SkartacniRezim {
		/**Vrátí data skartačního režimu.*/
		read(rq?:Gordic.Gin.Interface.GSkartacniRezimRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GSkartacniRezimRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GSkartacniRezimRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GSkartacniRezimDto>>;
		/**Vrátí seznam skartačních režimů dle zadaných kritérií.
		*     Pokud není použit filtr na aktivitu, tak se použije automticky filtr na aktivní.
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GSkartacniRezimDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SkartacniRezim: ServiceBase & Catalog.SkartacniRezim;
	}
	const SkartacniRezim: Client["SkartacniRezim"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení AI Resolveru (IGAiRecognizer.Read).*/
	interface GSkartacniRezimRequestDto {
		/**ID skartačního režimu*/
		ixs_skr?: string|null;
	}
	const enum GSkartacniRezimRequestDtoNames { ixs_skr = "ixs_skr",}
	const enum GSkartacniRezimRequestDtoFragments { ixs_skr = "*",}
	const enum GSkartacniRezimRequestDtoTypes { ixs_skr = "string",}
	const enum GSkartacniRezimRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\IGVecnaSkupina.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Věcná skupina - ginsvsk*/
	interface VecnaSkupina {
		/**Vrátí data ginsvsk.*/
		read(rq?:Gordic.Gin.Interface.GVecnaSkupinaReadRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GVecnaSkupinaReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GVecnaSkupinaReadRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GVecnaSkupinaDto>>;
		/**Vrátí seznam wflszne dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GVecnaSkupinaDto>>;
		/**Změna pozastavení skartace věcné skupině.*/
		updatePozastaveniSkartace(rq?:Gordic.Gin.Interface.GVecnaSkupinaUpdatePozastaveniSkartaceRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GVecnaSkupinaUpdatePozastaveniSkartaceRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GVecnaSkupinaUpdatePozastaveniSkartaceRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GVecnaSkupinaUpdatePozastaveniSkartaceRequestDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VecnaSkupina: ServiceBase & Catalog.VecnaSkupina;
	}
	const VecnaSkupina: Client["VecnaSkupina"];
}
declare namespace Gordic.Gin.Interface {
	/**Vstupní parametry metody pro načtení informací o věcné skupině.*/
	interface GVecnaSkupinaReadRequestDto {
		/**DBCOLUMN:ginsvsk.ixs_vsk*/
		ixs_vsk?: string|null;
	}
	const enum GVecnaSkupinaReadRequestDtoNames { ixs_vsk = "ixs_vsk",}
	const enum GVecnaSkupinaReadRequestDtoFragments { ixs_vsk = "*",}
	const enum GVecnaSkupinaReadRequestDtoTypes { ixs_vsk = "string",}
	const enum GVecnaSkupinaReadRequestDtoTypeLengths { ixs_vsk = 12,}
	/**Vstupní parametry metody pro změnu pozastavení skartace věcné skupině.*/
	interface GVecnaSkupinaUpdatePozastaveniSkartaceRequestDto {
		/**Identifikátor věcné skupiny.*/
		ixs_vsk?: string|null;
		/**Příznak pozastaveni skartace.*/
		priz_poz_skar?: number|null;
		/**Důvod pozastavení skartace*/
		duvod_poz_skar?: string|null;
	}
	const enum GVecnaSkupinaUpdatePozastaveniSkartaceRequestDtoNames { ixs_vsk = "ixs_vsk", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar",}
	const enum GVecnaSkupinaUpdatePozastaveniSkartaceRequestDtoFragments { ixs_vsk = "*", priz_poz_skar = "*", duvod_poz_skar = "*",}
	const enum GVecnaSkupinaUpdatePozastaveniSkartaceRequestDtoTypes { ixs_vsk = "string", priz_poz_skar = "number", duvod_poz_skar = "string",}
	const enum GVecnaSkupinaUpdatePozastaveniSkartaceRequestDtoTypeLengths { duvod_poz_skar = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\Referent - Copy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Referent*/
	interface GinsmbxService {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GinsmbxService: ServiceBase & Catalog.GinsmbxService;
	}
	const GinsmbxService: Client["GinsmbxService"];
}
declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginsref*/
	interface GGinsmbxDto {
		/**DBCOLUMN:ginsref.ixs_ref*/
		Mailbox?: string|null;
	}
	const enum GGinsmbxDtoNames { Mailbox = "Mailbox",}
	const enum GGinsmbxDtoFragments { Mailbox = "*",}
	const enum GGinsmbxDtoTypes { Mailbox = "string",}
	/**Výčet filtračních kritérií pro referentů*/
	const enum GGinsmbxFilter {
		/**identifikátor referenta/osoby*/
		mailbox,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\Referent.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Referent*/
	interface Referent {
		read(rq?:Gordic.Gin.Interface.GReferentDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GReferentDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GReferentDto>,GServiceReadResponse<Gordic.Gin.Interface.GReferentDto>>;
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GReferentDto>>;
		create(rq?:Gordic.Gin.Interface.GReferentDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>,GServiceSaveResponse<Gordic.Gin.Interface.GReferentDto>>;
		update(rq?:Gordic.Gin.Interface.GReferentDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>,GServiceSaveResponse<Gordic.Gin.Interface.GReferentDto>>;
		upsert(rq?:Gordic.Gin.Interface.GReferentDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>,GServiceSaveResponse<Gordic.Gin.Interface.GReferentDto>>;
		delete(rq?:Gordic.Gin.Interface.GReferentDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GReferentDto>,GServiceSaveResponse<Gordic.Gin.Interface.GReferentDto>>;
		/**Nastaví nový DB login a heslo a to pro IXS_REF tohoto objektu
		*     Může také sloužit pro změnu hesla již existujícího loginu.
		*/
		dbSaveNewLogin(rq?:CallParams<{ixs_ref:string,new_login:string,new_password:string}>): _Task<{ixs_ref:string,new_login:string,new_password:string},void>;
		/**Vrátí identifikátor referenta podle jeho loginu*/
		ixsReferentaSLoginem(rq?:CallParams<{login:string}>): _Task<{login:string},string>;
		/**Vrátí název danného referenta referenta*/
		nazevReferenta(rq?:CallParams<{ixsRef:string}>): _Task<{ixsRef:string},string>;
		/**Vrátí login danného referenta referenta*/
		loginReferenta(rq?:CallParams<{ixsRef:string}>): _Task<{ixsRef:string},string>;
		/**Vrátí pole identifikátorů funkcí referenta*/
		funkceReferenta(rq?:CallParams<{ixsRef:string}>): _Task<{ixsRef:string},string[]>;
		/**Založí / změní alternativní login osoby*/
		changeAlternativeLoginOrPassword(rq?:CallParams<{ixsRef:string,loginNameGrant2:string,pwd2:string,typAut:number,datExp:JsonDate}>): _Task<{ixsRef:string,loginNameGrant2:string,pwd2:string,typAut:number,datExp:JsonDate},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Referent: ServiceBase & Catalog.Referent;
	}
	const Referent: Client["Referent"];
}
declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginsref*/
	interface GReferentDto {
		/**DBCOLUMN:ginsref.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginsref.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsref.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsref.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsref.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsref.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsref.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsref.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsref.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsref.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsref.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsref.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsref.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:ginsref.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:ginsref.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:ginsref.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:ginsref.oc*/
		oc?: string|null;
		/**DBCOLUMN:ginsref.rc*/
		rc?: string|null;
		/**DBCOLUMN:ginsref.pritomnost*/
		pritomnost?: number|null;
		/**DBCOLUMN:ginsref.login_name*/
		login_name?: string|null;
		/**DBCOLUMN:ginsref.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsref.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsref.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsref.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsref.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsref.typ_aut*/
		typ_aut?: number|null;
		/**DBCOLUMN:ginsref.poc_dni_exp*/
		poc_dni_exp?: number|null;
		/**DBCOLUMN:ginsref.dat_exp*/
		dat_exp?: JsonDate|null;
		/**DBCOLUMN:ginsref.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:ginsref.priz_int*/
		priz_int?: number|null;
		/**DBCOLUMN:ginsref.priz_f*/
		priz_f?: number|null;
		/**DBCOLUMN:ginsref.login_name_ext*/
		login_name_ext?: string|null;
		/**DBCOLUMN:ginsref.login_name_grant*/
		login_name_grant?: string|null;
		/**DBCOLUMN:ginsref.login_name2*/
		login_name2?: string|null;
		/**DBCOLUMN:ginsref.login_name_grant2*/
		login_name_grant2?: string|null;
		/**DBCOLUMN:ginsref.typ_aut2*/
		typ_aut2?: number|null;
		/**DBCOLUMN:ginsref.dat_exp2*/
		dat_exp2?: JsonDate|null;
		/**DBCOLUMN:ginsref.priz_msmsesu*/
		priz_msmsesu?: number|null;
		/**DBCOLUMN:ginsref.ixs_esu_pam*/
		ixs_esu_pam?: string|null;
		/**DBCOLUMN:ginsref.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsref.tel_privat*/
		tel_privat?: string|null;
		/**DBCOLUMN:ginsref.tel_mobil*/
		tel_mobil?: string|null;
		/**DBCOLUMN:ginsref.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsref.rod_prijmeni*/
		rod_prijmeni?: string|null;
		/**DBCOLUMN:ginsref.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsref.login_passwdh*/
		login_passwdh?: string|null;
		/**DBCOLUMN:ginsref.login_salt*/
		login_salt?: string|null;
		/**DBCOLUMN:ginsref.login_passwdh2*/
		login_passwdh2?: string|null;
		/**DBCOLUMN:ginsref.login_salt2*/
		login_salt2?: string|null;
		/**DBCOLUMN:ginsref.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsref.dat_sync*/
		dat_sync?: JsonDate|null;
		/**DBCOLUMN:ginsref.login_sid*/
		login_sid?: string|null;
		/**DBCOLUMN:ginsref.login_sid2*/
		login_sid2?: string|null;
		/**DBCOLUMN:ginsref.ixs_zap*/
		ixs_zap?: string|null;
		Permissions?: Gordic.Gin.Interface.GReferentPermissions|null;
	}
	const enum GReferentDtoNames { ixs_ref = "ixs_ref", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", oc = "oc", rc = "rc", pritomnost = "pritomnost", login_name = "login_name", cs_nazev = "cs_nazev", dat_mpd = "dat_mpd", mail = "mail", ixs_esu = "ixs_esu", z_int = "z_int", typ_aut = "typ_aut", poc_dni_exp = "poc_dni_exp", dat_exp = "dat_exp", priz_ext = "priz_ext", priz_int = "priz_int", priz_f = "priz_f", login_name_ext = "login_name_ext", login_name_grant = "login_name_grant", login_name2 = "login_name2", login_name_grant2 = "login_name_grant2", typ_aut2 = "typ_aut2", dat_exp2 = "dat_exp2", priz_msmsesu = "priz_msmsesu", ixs_esu_pam = "ixs_esu_pam", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", ixs_lpc = "ixs_lpc", rod_prijmeni = "rod_prijmeni", fax = "fax", login_passwdh = "login_passwdh", login_salt = "login_salt", login_passwdh2 = "login_passwdh2", login_salt2 = "login_salt2", ico = "ico", dat_sync = "dat_sync", login_sid = "login_sid", login_sid2 = "login_sid2", ixs_zap = "ixs_zap", Permissions = "Permissions",}
	const enum GReferentDtoFragments { ixs_ref = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "nazev", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", oc = "*", rc = "*", pritomnost = "*", login_name = "login", cs_nazev = "*", dat_mpd = "*", mail = "*", ixs_esu = "*", z_int = "*", typ_aut = "*", poc_dni_exp = "*", dat_exp = "*", priz_ext = "*", priz_int = "*", priz_f = "*", login_name_ext = "login", login_name_grant = "login", login_name2 = "login", login_name_grant2 = "login", typ_aut2 = "*", dat_exp2 = "*", priz_msmsesu = "*", ixs_esu_pam = "*", tel = "*", tel_privat = "*", tel_mobil = "*", ixs_lpc = "*", rod_prijmeni = "*", fax = "*", login_passwdh = "login", login_salt = "login", login_passwdh2 = "login", login_salt2 = "login", ico = "*", dat_sync = "*", login_sid = "login", login_sid2 = "login", ixs_zap = "*", Permissions = "*",}
	const enum GReferentDtoTypes { ixs_ref = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", oc = "string", rc = "string", pritomnost = "number", login_name = "string", cs_nazev = "string", dat_mpd = "JsonDate", mail = "string", ixs_esu = "string", z_int = "number", typ_aut = "number", poc_dni_exp = "number", dat_exp = "JsonDate", priz_ext = "number", priz_int = "number", priz_f = "number", login_name_ext = "string", login_name_grant = "string", login_name2 = "string", login_name_grant2 = "string", typ_aut2 = "number", dat_exp2 = "JsonDate", priz_msmsesu = "number", ixs_esu_pam = "string", tel = "string", tel_privat = "string", tel_mobil = "string", ixs_lpc = "string", rod_prijmeni = "string", fax = "string", login_passwdh = "string", login_salt = "string", login_passwdh2 = "string", login_salt2 = "string", ico = "string", dat_sync = "JsonDate", login_sid = "string", login_sid2 = "string", ixs_zap = "string", Permissions = "Gordic.Gin.Interface.GReferentPermissions",}
	interface GReferentPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GReferentPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate",}
	const enum GReferentPermissionsFragments { CanCreate = "*", CanUpdate = "*",}
	const enum GReferentPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission",}
	/**Výčet filtračních kritérií pro referentů*/
	const enum GReferentFilter {
		/**identifikátor referenta/osoby*/
		ixs_ref,
		/**licence*/
		lic,
		/**aktivita*/
		aktivita,
		/**arw*/
		arw,
		/**poznámka*/
		poznamka,
		/**datum platnosti od*/
		dat_od,
		/**datum platnosti do*/
		dat_do,
		/**datum poslední změny*/
		dat_zmena,
		/**kdo provedl poslední změnu*/
		zmenu_prov,
		/**identifikace spisového uzlu do kterého funkce patří*/
		ixs_su,
		/**zkratka funkce*/
		zkratka,
		/**název funkce*/
		nazev,
		/**zkratka funkce*/
		jmeno,
		/**název funkce*/
		prijmeni,
		/**tituly před jménem*/
		tit_pred,
		/**tituly za jménem*/
		tit_za,
		/**osobní číslo*/
		oc,
		/**rodné číslo*/
		rc,
		/**?*/
		pritomnost,
		/**přihlašovací jméno*/
		login_name,
		/**název v cs tvaru*/
		cs_nazev,
		/**?*/
		dat_mpd,
		/**mail*/
		mail,
		/**identifikace ESU*/
		ixs_esu,
		/**zda je z interface*/
		z_int,
		/**typ autentizace*/
		typ_aut,
		/**?*/
		pocet_dni_exp,
		/**?*/
		dat_exp,
		/**?*/
		priz_ext,
		/**?*/
		priz_int,
		/**?*/
		priz_f,
		/**přihlašovací jméno - externí systém*/
		login_name_ext,
		/**?*/
		login_name_grant,
		/**alt. login (doména)*/
		login_name2,
		/**?*/
		login_name_grant2,
		/**?*/
		typ_aut2,
		/**?*/
		dat_exp2,
		/**?*/
		priz_msmsesu,
		/**?*/
		ixs_esu_pam,
		/**?*/
		tel,
		/**?*/
		tel_privat,
		/**?*/
		tel_mobil,
		/**?*/
		ixs_lpc,
		/**?*/
		rod_prijmeni,
		/**?*/
		fax,
		/**filtr nad 'login_name' OR 'login_name2'*/
		login_names,
		/**výrazový filtr nad názvem*/
		nazev__expr,
		/**Bude se testovat, zda jsou splněny podmínky pro zastupujícího referenta (hodnoty: 0/1)*/
		Zastup,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ISL\TypDokumentu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Funkční místo*/
	interface TypDokumentu {
		read(rq?:Gordic.Gin.Interface.GTypDokumentuDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GTypDokumentuDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GTypDokumentuDto>,GServiceReadResponse<Gordic.Gin.Interface.GTypDokumentuDto>>;
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GTypDokumentuDto>>;
		/**Výchozí typ dokladu pro danou kategorii*/
		vychoziTypProKategorii(rq?:CallParams<{ktg_typ:number,EkoParams_IxsTyp:string,EkoParams_IxpDen:string}>): _Task<{ktg_typ:number,EkoParams_IxsTyp:string,EkoParams_IxpDen:string},string>;
		/**Výchozí typ dokladu pro danou kategorii dle nadřazeného dokumentu*/
		typDleNadrazenehoTypu(rq?:CallParams<{ktg_typ:number,ixpNadrazeneho:string,ixsTypNadrazeneho:string}>): _Task<{ktg_typ:number,ixpNadrazeneho:string,ixsTypNadrazeneho:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypDokumentu: ServiceBase & Catalog.TypDokumentu;
	}
	const TypDokumentu: Client["TypDokumentu"];
}
declare namespace Gordic.Gin.Interface {
	/**DBTABLE:sslstyp*/
	interface GTypDokumentuDto {
		/**DBCOLUMN:sslstyp.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:sslstyp.lic*/
		lic?: string|null;
		/**DBCOLUMN:sslstyp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sslstyp.arw*/
		arw?: number|null;
		/**DBCOLUMN:sslstyp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sslstyp.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:sslstyp.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:sslstyp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslstyp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sslstyp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sslstyp.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:sslstyp.popis*/
		popis?: string|null;
		/**DBCOLUMN:sslstyp.st_utaj_id*/
		st_utaj_id?: number|null;
		/**DBCOLUMN:sslstyp.lhuta_vyr*/
		lhuta_vyr?: number|null;
		/**DBCOLUMN:sslstyp.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:sslstyp.ixs_ulz*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:sslstyp.aktivita_ssl*/
		aktivita_ssl?: number|null;
		/**DBCOLUMN:sslstyp.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:sslstyp.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:sslstyp.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:sslstyp.s_gen_cj*/
		s_gen_cj?: number|null;
		/**DBCOLUMN:sslstyp.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:sslstyp.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:sslstyp.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:sslstyp.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:sslstyp.priz_vycet*/
		priz_vycet?: number|null;
		/**DBCOLUMN:sslstyp.ixs_cin*/
		ixs_cin?: string|null;
		/**DBCOLUMN:sslstyp.poc_dnu_vyp_dor*/
		poc_dnu_vyp_dor?: number|null;
		/**DBCOLUMN:sslstyp.ixs_typ_opr*/
		ixs_typ_opr?: string|null;
		/**DBCOLUMN:sslstyp.priz_rsp*/
		priz_rsp?: number|null;
		/**DBCOLUMN:sslstyp.ixs_frm_gform*/
		ixs_frm_gform?: string|null;
		/**DBCOLUMN:sslstyp.priz_epk*/
		priz_epk?: number|null;
		/**DBCOLUMN:sslstyp.predpl_vec*/
		predpl_vec?: string|null;
		/**DBCOLUMN:sslstyp.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:sslstyp.ixp_sablony*/
		ixp_sablony?: string|null;
		/**DBCOLUMN:sslstyp.ixs_frm_gform_spi*/
		ixs_frm_gform_spi?: string|null;
		/**DBCOLUMN:sslstyp.priz_dupli*/
		priz_dupli?: number|null;
		/**DBCOLUMN:sslstyp.over_duver*/
		over_duver?: number|null;
		/**DBCOLUMN:sslstyp.zakon_duvod_gdpr*/
		zakon_duvod_gdpr?: string|null;
		/**DBCOLUMN:sslstyp.s_dotaz_irp*/
		s_dotaz_irp?: number|null;
		/**DBCOLUMN:sslstyp.plan_zve*/
		plan_zve?: number|null;
		/**DBCOLUMN:sslstyp.priz_fyz*/
		priz_fyz?: number|null;
		/**DBCOLUMN:sslstyp.ixs_zap*/
		ixs_zap?: string|null;
		/**DBCOLUMN:sslstyp.ixs_fsk*/
		ixs_fsk?: string|null;
		/**Počet navázaných agend SZR (szrvagt)*/
		szr_agenda_count?: number|null;
		/**Skartační režim.*/
		ixs_skr?: string|null;
		/**Skartační znak.*/
		skar_znak?: string|null;
		/**Skartační lhůta*/
		skar_lhuta?: number|null;
		/**Název spouštěcí události.*/
		nazev_spu?: string|null;
		/**Kategorie spouštěcí události*/
		ktg_spu?: number|null;
	}
	const enum GTypDokumentuDtoNames { ixs_typ = "ixs_typ", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ktg_typ = "ktg_typ", popis = "popis", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", ofic_nazev = "ofic_nazev", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", ixs_lpc = "ixs_lpc", z_int = "z_int", cs_nazev = "cs_nazev", priz_vycet = "priz_vycet", ixs_cin = "ixs_cin", poc_dnu_vyp_dor = "poc_dnu_vyp_dor", ixs_typ_opr = "ixs_typ_opr", priz_rsp = "priz_rsp", ixs_frm_gform = "ixs_frm_gform", priz_epk = "priz_epk", predpl_vec = "predpl_vec", typ_vazby = "typ_vazby", ixp_sablony = "ixp_sablony", ixs_frm_gform_spi = "ixs_frm_gform_spi", priz_dupli = "priz_dupli", over_duver = "over_duver", zakon_duvod_gdpr = "zakon_duvod_gdpr", s_dotaz_irp = "s_dotaz_irp", plan_zve = "plan_zve", priz_fyz = "priz_fyz", ixs_zap = "ixs_zap", ixs_fsk = "ixs_fsk", szr_agenda_count = "szr_agenda_count", ixs_skr = "ixs_skr", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev_spu = "nazev_spu", ktg_spu = "ktg_spu",}
	const enum GTypDokumentuDtoFragments { ixs_typ = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "e", dat_od = "e", dat_do = "e", dat_zmena = "*", zmenu_prov = "*", nazev = "b", ktg_typ = "*", popis = "e", st_utaj_id = "*", lhuta_vyr = "c", zkratka = "c", ixs_ulz = "*", aktivita_ssl = "*", spis_pl = "c", spis_znak = "c", ofic_nazev = "e", s_gen_cj = "*", ixs_esu = "*", ixs_lpc = "*", z_int = "*", cs_nazev = "*", priz_vycet = "*", ixs_cin = "*", poc_dnu_vyp_dor = "f", ixs_typ_opr = "*", priz_rsp = "*", ixs_frm_gform = "*", priz_epk = "*", predpl_vec = "*", typ_vazby = "*", ixp_sablony = "*", ixs_frm_gform_spi = "*", priz_dupli = "*", over_duver = "*", zakon_duvod_gdpr = "g", s_dotaz_irp = "*", plan_zve = "*", priz_fyz = "*", ixs_zap = "*", ixs_fsk = "*", szr_agenda_count = "*", ixs_skr = "h", skar_znak = "h", skar_lhuta = "h", nazev_spu = "h", ktg_spu = "h",}
	const enum GTypDokumentuDtoTypes { ixs_typ = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ktg_typ = "number", popis = "string", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", ofic_nazev = "string", s_gen_cj = "number", ixs_esu = "string", ixs_lpc = "string", z_int = "number", cs_nazev = "string", priz_vycet = "number", ixs_cin = "string", poc_dnu_vyp_dor = "number", ixs_typ_opr = "string", priz_rsp = "number", ixs_frm_gform = "string", priz_epk = "number", predpl_vec = "string", typ_vazby = "number", ixp_sablony = "string", ixs_frm_gform_spi = "string", priz_dupli = "number", over_duver = "number", zakon_duvod_gdpr = "string", s_dotaz_irp = "number", plan_zve = "number", priz_fyz = "number", ixs_zap = "string", ixs_fsk = "string", szr_agenda_count = "number", ixs_skr = "string", skar_znak = "string", skar_lhuta = "number", nazev_spu = "string", ktg_spu = "number",}
	const enum GTypDokumentuDtoTypeLengths { ixs_typ = 12, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ofic_nazev = 254, ixs_esu = 12, ixs_lpc = 12, cs_nazev = 50, ixs_cin = 12, ixs_typ_opr = 12, ixs_frm_gform = 12, predpl_vec = 100, ixp_sablony = 12, ixs_frm_gform_spi = 12, zakon_duvod_gdpr = 1000, ixs_zap = 12, ixs_fsk = 12,}
	const enum GTypDokumentuFilter {
		/**Autogenerated.*/
		ixs_typ,
		/**Autogenerated.*/
		aktivita,
		/**Autogenerated.*/
		arw,
		/**Autogenerated.*/
		poznamka,
		/**Autogenerated.*/
		dat_od,
		/**Autogenerated.*/
		dat_do,
		/**Autogenerated.*/
		dat_zmena,
		/**Autogenerated.*/
		zmenu_prov,
		/**Autogenerated.*/
		nazev,
		/**Autogenerated.*/
		ktg_typ,
		/**Autogenerated.*/
		st_utaj_id,
		/**Autogenerated.*/
		lhuta_vyr,
		/**Autogenerated.*/
		zkratka,
		/**Autogenerated.*/
		ixs_ulz,
		/**Autogenerated.*/
		aktivita_ssl,
		/**Autogenerated.*/
		spis_pl,
		/**Autogenerated.*/
		spis_znak,
		/**Autogenerated.*/
		s_gen_cj,
		/**Autogenerated.*/
		ixs_esu,
		/**Autogenerated.*/
		priz_rsp,
		/**Přidružený formulář*/
		ixs_frm_gform,
		/**PID šablony*/
		ixp_sablony,
		/**Oblíbené (hodnoty: 0/1)*/
		Oblibene,
		/**Pouze ty, které jsou povoleny ve vazbě na knihu*/
		VazbaNaKnihu,
		/**Pouze doklady pro dannou agendu.*/
		typ_ag,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Masky\Gordic.Gin.Interface.Enums.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Typ masky - veřejná/soukromá*/
	const enum TypMaskyEnum {
		/**Veřejná maska*/
		Verejna=0,
		/**Soukromá maska*/
		Soukroma=10,
		/**Pevná maska*/
		Pevna=20,
		/**maska za SU*/
		ZaSu=5,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\OAuth\IGAdmOAuthService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**OAuth consent -> Gin.Interface
	* @domain Core
	* @businessObject OAuth
	*/
	interface OAuth {
		/**Continue*/
		start(rq?:Gordic.Gin.Interface.GOAuthStartRequestDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GOAuthStartRequestDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GOAuthStartRequestDto>,GServiceReadResponse<Gordic.Gin.Interface.GOAuthStartResponseDto>>;
		/**Continue*/
		continue(rq?:Gordic.Gin.Interface.GOAuthContinueRequestDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GOAuthContinueRequestDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GOAuthContinueRequestDto>,GServiceSaveResponse<Gordic.Gin.Interface.GOAuthContinueResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OAuth: ServiceBase & Catalog.OAuth;
	}
	const OAuth: Client["OAuth"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\OAuth\OAuthDTOs.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Filtra4n9 parametry*/
	const enum GAdmOAuthFilter {
	}
	/**GAbstractOAuthHtmlResponse*/
	interface GAbstractOAuthHtmlResponse {
		/**Code*/
		Html?: string|null;
	}
	const enum GAbstractOAuthHtmlResponseNames { Html = "Html",}
	const enum GAbstractOAuthHtmlResponseFragments { Html = "*",}
	const enum GAbstractOAuthHtmlResponseTypes { Html = "string",}
	const enum GAbstractOAuthHtmlResponseTypeLengths {}
	/**GOAbstractAuthStartRequestDto*/
	interface GAbstractOAuthStartRequestDto {
		/**IxsOap*/
		IxsOap?: string|null;
		/**Service*/
		Service?: Gordic.General.OAuthService|null;
	}
	const enum GAbstractOAuthStartRequestDtoNames { IxsOap = "IxsOap", Service = "Service",}
	const enum GAbstractOAuthStartRequestDtoFragments { IxsOap = "*", Service = "*",}
	const enum GAbstractOAuthStartRequestDtoTypes { IxsOap = "string", Service = "Gordic.General.OAuthService",}
	const enum GAbstractOAuthStartRequestDtoTypeLengths {}
	/**GOAuthStartRequestDto*/
	interface GOAuthStartRequestDto extends Gordic.Gin.Interface.GAbstractOAuthStartRequestDto {
	}
	const enum GOAuthStartRequestDtoNames { IxsOap = "IxsOap", Service = "Service",}
	const enum GOAuthStartRequestDtoFragments { IxsOap = "*", Service = "*",}
	const enum GOAuthStartRequestDtoTypes { IxsOap = "string", Service = "Gordic.General.OAuthService",}
	const enum GOAuthStartRequestDtoTypeLengths {}
	/**GAdmOAuthStartResponseDto*/
	interface GOAuthStartResponseDto {
	}
	const enum GOAuthStartResponseDtoNames {}
	const enum GOAuthStartResponseDtoFragments {}
	const enum GOAuthStartResponseDtoTypes {}
	const enum GOAuthStartResponseDtoTypeLengths {}
	/**GOAuthContinueRequestDto*/
	interface GOAuthContinueRequestDto {
		/**Code*/
		Code?: string|null;
		/**Testovací proměnná*/
		State?: string|null;
	}
	const enum GOAuthContinueRequestDtoNames { Code = "Code", State = "State",}
	const enum GOAuthContinueRequestDtoFragments { Code = "*", State = "*",}
	const enum GOAuthContinueRequestDtoTypes { Code = "string", State = "string",}
	const enum GOAuthContinueRequestDtoTypeLengths {}
	/**Objekt pro Oauth*/
	interface GOAuthContinueResponseDto {
		/**Html*/
		Html?: string|null;
	}
	const enum GOAuthContinueResponseDtoNames { Html = "Html",}
	const enum GOAuthContinueResponseDtoFragments { Html = "*",}
	const enum GOAuthContinueResponseDtoTypes { Html = "string",}
	const enum GOAuthContinueResponseDtoTypeLengths {}
	/**Objekt pro Oauth -- TODO: jklusacek - pouze pro GUI/ADM????*/
	interface GAdmOAuthDto {
		/**Url*/
		Url?: string|null;
	}
	const enum GAdmOAuthDtoNames { Url = "Url",}
	const enum GAdmOAuthDtoFragments { Url = "*",}
	const enum GAdmOAuthDtoTypes { Url = "string",}
	const enum GAdmOAuthDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Poznamky\GGindpozFilter.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Filter - Gin Poznámky (ISL)*/
	const enum GGindpozFilter {
		/**První část identifikátoru. Jedná se o složený tvar hodnot sloupců PK a to v pořadí PK a ve formátování podle standardu UNL.*/
		sxs,
		/**Druhá část identifikátoru. Interní ID typu objektu, který je v rámci GINIS najakým způsobem evidován, spravován*/
		typObj,
		/**Zobrazit pouze aktivní pouznámky (default=true)*/
		activeOnly,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Poznamky\GGindpozNoteCountDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Pomocné DTO pro počty poznámek*/
	interface GGindpozNoteCountDto {
		/**Počet poznámek*/
		Count?: number|null;
	}
	const enum GGindpozNoteCountDtoNames { Count = "Count",}
	const enum GGindpozNoteCountDtoFragments { Count = "*",}
	const enum GGindpozNoteCountDtoTypes { Count = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Poznamky\GNoteCategoryDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Kategorie poznámky, typicky určuje viditelnost (soukromá, veřejná) a
	*     nastavuje barvu poznámkového bločku. Uživatel jí může měnit.
	*/
	interface GNoteCategoryDto {
		/**Popisek, který se zobrazí uživateli.*/
		Caption?: string|null;
		/**Hodnota, která se nastaví při výběru kategorie do vlastnosti
		*     category .
		*/
		Value?: string|null;
		/**Příznak, že kategorie je výchozí. První kategorie, která je
		*     nalezena jako výchozí, se použije pro vytváření nových poznámek.
		*/
		IsDefault?: boolean|null;
		/**Barva podkladu poznámkového bločku. Musí být kontrastní s
		*     foreground.
		*/
		Background?: any|null;
		/**Barva písma poznámkového bločku. Musí být kontrastní s background.*/
		Foreground?: any|null;
	}
	const enum GNoteCategoryDtoNames { Caption = "Caption", Value = "Value", IsDefault = "IsDefault", Background = "Background", Foreground = "Foreground",}
	const enum GNoteCategoryDtoFragments { Caption = "*", Value = "*", IsDefault = "*", Background = "*", Foreground = "*",}
	const enum GNoteCategoryDtoTypes { Caption = "string", Value = "string", IsDefault = "boolean", Background = "any", Foreground = "any",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Poznamky\GNoteDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro přenos poznámek do webové aplikace.*/
	interface GNoteDto {
		/**Text poznámky*/
		text?: string|null;
		/**Kategorie poznámky*/
		category?: string|null;
		/**Identifikátor*/
		Id?: string|null;
		/**Oprávnění k nakládání s poznámkou*/
		Permissions: number;
		/**Původní autor poznámky celým jménem. Obvykle funkce která 
		*     původně vytvořila poznámku, reprezentovaná sloupcem ixs_fun
		*/
		author?: string|null;
		/**Čas vytvoření poznámky.*/
		dateCreated?: JsonDate|null;
		/**Poslední editor poznámky celým jménem.*/
		editor?: string|null;
		/**Datum poslední změny.*/
		dateModified?: JsonDate|null;
		/**Příznak, zda poznámka je aktivní z DB sloupce aktivita.*/
		isActive?: boolean|null;
		/**Příznak že jde o vlastní poznámku (autorem je současný uživatel).*/
		isOwn?: boolean|null;
		/**barva poznámky (default: bílá)*/
		uzo?: string|null;
		/**odkaz na původní pořadové číslo v případě reakce*/
		porCisloPuv?: number|null;
	}
	const enum GNoteDtoNames { text = "text", category = "category", Id = "Id", Permissions = "Permissions", author = "author", dateCreated = "dateCreated", editor = "editor", dateModified = "dateModified", isActive = "isActive", isOwn = "isOwn", uzo = "uzo", porCisloPuv = "porCisloPuv",}
	const enum GNoteDtoFragments { text = "*", category = "*", Id = "*", Permissions = "*", author = "*", dateCreated = "*", editor = "*", dateModified = "*", isActive = "*", isOwn = "*", uzo = "*", porCisloPuv = "*",}
	const enum GNoteDtoTypes { text = "string", category = "string", Id = "string", Permissions = "number", author = "string", dateCreated = "JsonDate", editor = "string", dateModified = "JsonDate", isActive = "boolean", isOwn = "boolean", uzo = "string", porCisloPuv = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Poznamky\IGGindpozNote.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface - GIN Poznámky*/
	interface GindpozNote {
		/**Získej počet poznámek*/
		getCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Gin.Interface.GGindpozNoteCountDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GindpozNote: ServiceBase & Catalog.GindpozNote;
	}
	const GindpozNote: Client["GindpozNote"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\RegSpa\Dto\GBaseDetailDto.d.ts 

declare namespace Gordic.Gin.Interface.RegSpa {
	/**Předek pro DTO*/
	interface GBaseDetailDto {
		/**Oprávnění*/
		Permissions?: Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions|null;
	}
	const enum GBaseDetailDtoNames { Permissions = "Permissions",}
	const enum GBaseDetailDtoFragments { Permissions = "*",}
	const enum GBaseDetailDtoTypes { Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\RegSpa\Enums\GRezimContentu.d.ts 

declare namespace Gordic.Gin.Interface.RegSpa {
	/**Výčet režimu pro řízení detailu*/
	const enum GRezimContentu {
		/**View - režim prohlížení*/
		View=1,
		/**New - režim nový*/
		New=2,
		/**Editace - režim editace*/
		Editace=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\RegSpa\Permissions\GBaseDetailPermissions.d.ts 

declare namespace Gordic.Gin.Interface.RegSpa {
	/**Základní oprávnění*/
	interface GBaseDetailPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Vytvoření*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprava*/
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
		/**Odstranění*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
		/**Obnovení*/
		CanRestore: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBaseDetailPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GBaseDetailPermissionsFragments { CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GBaseDetailPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Security\GWflsumiDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO pro ISL - Umístění podpisu*/
	interface GSignaturePositionDto extends Gordic.Gin.Interface.GWflsumiDto {
	}
	const enum GSignaturePositionDtoNames { ixs_umi = "ixs_umi", sirka = "sirka", vyska = "vyska", pozice_x = "pozice_x", pozice_y = "pozice_y", strana = "strana", strana_vyska = "strana_vyska", strana_sirka = "strana_sirka", text_podp = "text_podp", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSignaturePositionDtoFragments { ixs_umi = "*", sirka = "*", vyska = "*", pozice_x = "*", pozice_y = "*", strana = "*", strana_vyska = "*", strana_sirka = "*", text_podp = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSignaturePositionDtoTypes { ixs_umi = "string", sirka = "number", vyska = "number", pozice_x = "number", pozice_y = "number", strana = "number", strana_vyska = "number", strana_sirka = "number", text_podp = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**DBTABLE:wflsumi*/
	interface GWflsumiDto {
		/**Identifikátor umístění*/
		ixs_umi?: string|null;
		/**DBCOLUMN:wflsumi.sirka*/
		sirka?: number|null;
		/**DBCOLUMN:wflsumi.vyska*/
		vyska?: number|null;
		/**DBCOLUMN:wflsumi.pozice_x*/
		pozice_x?: number|null;
		/**DBCOLUMN:wflsumi.pozice_y*/
		pozice_y?: number|null;
		/**DBCOLUMN:wflsumi.strana*/
		strana?: number|null;
		/**DBCOLUMN:wflsumi.strana_vyska*/
		strana_vyska?: number|null;
		/**DBCOLUMN:wflsumi.strana_sirka*/
		strana_sirka?: number|null;
		/**DBCOLUMN:wflsumi.text_podp*/
		text_podp?: string|null;
		/**DBCOLUMN:wflsumi.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:wflsumi.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsumi.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsumi.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflsumiDtoNames { ixs_umi = "ixs_umi", sirka = "sirka", vyska = "vyska", pozice_x = "pozice_x", pozice_y = "pozice_y", strana = "strana", strana_vyska = "strana_vyska", strana_sirka = "strana_sirka", text_podp = "text_podp", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflsumiDtoFragments { ixs_umi = "*", sirka = "*", vyska = "*", pozice_x = "*", pozice_y = "*", strana = "*", strana_vyska = "*", strana_sirka = "*", text_podp = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflsumiDtoTypes { ixs_umi = "string", sirka = "number", vyska = "number", pozice_x = "number", pozice_y = "number", strana = "number", strana_vyska = "number", strana_sirka = "number", text_podp = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Security\GWflvumpDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**DTO - navázání na šablonu předpisu*/
	interface GWflvumpDto {
		/**identifikátor vizuální podpisu*/
		ixs_umi?: string|null;
		/**Identifikátor subjektu, typ subjektu je zadán v IX        // pro náš případ ixs_ssa (wfldssa)*/
		ixs?: string|null;
		/**Pro náš případ radek_sab (wfldssa)*/
		por_cislo?: number|null;
		/**typ subjektu  // AWI*/
		ix?: string|null;
		/**navázané funkční místo*/
		ixs_fun?: string|null;
		/**index strany souboru*/
		strana?: number|null;
		/**DBCOLUMN:wflvump.aktivita*/
		aktivita?: number|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**kdo změnu provedl*/
		zmenu_prov?: string|null;
		/**ser_cislo žádosti v EPK*/
		ser_cislo_szps?: number|null;
	}
	const enum GWflvumpDtoNames { ixs_umi = "ixs_umi", ixs = "ixs", por_cislo = "por_cislo", ix = "ix", ixs_fun = "ixs_fun", strana = "strana", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ser_cislo_szps = "ser_cislo_szps",}
	const enum GWflvumpDtoFragments { ixs_umi = "*", ixs = "*", por_cislo = "*", ix = "*", ixs_fun = "*", strana = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ser_cislo_szps = "*",}
	const enum GWflvumpDtoTypes { ixs_umi = "string", ixs = "string", por_cislo = "number", ix = "string", ixs_fun = "string", strana = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ser_cislo_szps = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Security\IGFutureSignaturePositionBindingService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Navázání na šablonu předpisu
	* @businessObject FutureSignaturePositionBinding
	*/
	interface FutureSignaturePositionBinding {
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Gin.Interface.GFutureSignaturePositionBindingDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>,GServiceSaveResponse<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>>;
		/**Read*/
		read(rq?:Gordic.Gin.Interface.GFutureSignaturePositionBindingDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>,GServiceReadResponse<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GFutureSignaturePositionBindingDto>>;
		/**Set future signature placement*/
		setFutureSignaturePositionBinding(rq?:CallParams<{position:Gordic.Security.Service.GPdfVisualSignPositionDto,ixs:string,porCislo:number,ixsFun:string}>): _Task<{position:Gordic.Security.Service.GPdfVisualSignPositionDto,ixs:string,porCislo:number,ixsFun:string},void>;
		/**Kontrola, jestli ID (vizuálního podpisu) existuje v tabulce wflvump
		*     Tabulka je určena pro přednastavení podpisu v rámci ADM
		*/
		checkKeyExist(rq?:CallParams<{ixs_umi:string}>): _Task<{ixs_umi:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FutureSignaturePositionBinding: ServiceBase & Catalog.FutureSignaturePositionBinding;
	}
	const FutureSignaturePositionBinding: Client["FutureSignaturePositionBinding"];
}
declare namespace Gordic.Gin.Interface {
	/**DTO pro ISL - Navázání na šablonu předpisu*/
	interface GFutureSignaturePositionBindingDto extends Gordic.Gin.Interface.GWflvumpDto {
	}
	const enum GFutureSignaturePositionBindingDtoNames { ixs_umi = "ixs_umi", ixs = "ixs", por_cislo = "por_cislo", ix = "ix", ixs_fun = "ixs_fun", strana = "strana", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ser_cislo_szps = "ser_cislo_szps",}
	const enum GFutureSignaturePositionBindingDtoFragments { ixs_umi = "*", ixs = "*", por_cislo = "*", ix = "*", ixs_fun = "*", strana = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ser_cislo_szps = "*",}
	const enum GFutureSignaturePositionBindingDtoTypes { ixs_umi = "string", ixs = "string", por_cislo = "number", ix = "string", ixs_fun = "string", strana = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ser_cislo_szps = "number",}
	const enum GFutureSignaturePositionBindingDtoTypeLengths { ixs_umi = 12, ixs = 12, ix = 3, ixs_fun = 12, zmenu_prov = 12,}
	/**Filtr - Navázání na šablonu předpisu*/
	const enum GFutureSignaturePositionBindingFilterEnum {
		/**ID umístění*/
		ixs_umi,
		/**Identifikátor subjektu, typ subjektu je zadán v IX - pro náš případ ixs_ssa (wfldssa)*/
		ixs,
		/**Pro náš případ radek_sab (wfldssa)*/
		por_cislo,
		/**Typ subjektu  // AWI*/
		ix,
		/**Navázané funkční místo*/
		ixs_fun,
		/**Index strany souboru*/
		strana,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Security\IGSignaturePositionService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL vazeb umístění podpisu
	* @businessObject SignaturePosition
	*/
	interface SignaturePosition {
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Gin.Interface.GSignaturePositionDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GSignaturePositionDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GSignaturePositionDto>,GServiceSaveResponse<Gordic.Gin.Interface.GSignaturePositionDto>>;
		/**Read*/
		read(rq?:Gordic.Gin.Interface.GSignaturePositionDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GSignaturePositionDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GSignaturePositionDto>,GServiceReadResponse<Gordic.Gin.Interface.GSignaturePositionDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GSignaturePositionDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SignaturePosition: ServiceBase & Catalog.SignaturePosition;
	}
	const SignaturePosition: Client["SignaturePosition"];
}
declare namespace Gordic.Gin.Interface {
	/**Filtry pro požadavky na budování LISTu*/
	const enum GSignaturePositionFilterEnum {
		/**ID umístění*/
		ixs_umi,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\UserSettings\IGUserCustomStorage.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGSettingTemplate
	* @domain Core
	*/
	interface UserCustomStorage {
		/**Read*/
		read(rq?:Gordic.Gin.Interface.GUserCustomStorageDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GUserCustomStorageDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GUserCustomStorageDto>,GServiceReadResponse<Gordic.Gin.Interface.GUserCustomStorageDto>>;
		/**Update*/
		upsert(rq?:Gordic.Gin.Interface.GUserCustomStorageDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GUserCustomStorageDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GUserCustomStorageDto>,GServiceSaveResponse<Gordic.Gin.Interface.GUserCustomStorageDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UserCustomStorage: ServiceBase & Catalog.UserCustomStorage;
	}
	const UserCustomStorage: Client["UserCustomStorage"];
}
declare namespace Gordic.Gin.Interface {
	/**DBTABLE:ginnunw*/
	interface GUserCustomStorageDto {
		/**DBCOLUMN:ginnunw.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginnunw.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginnunw.sxs_una*/
		sxs_una?: string|null;
		/**DBCOLUMN:ginnunw.obsah*/
		obsah?: JsonBlob|null;
		/**DBCOLUMN:ginnunw.dat_zmeny*/
		dat_zmena?: JsonDate|null;
	}
	const enum GUserCustomStorageDtoNames { ixs_ref = "ixs_ref", faze = "faze", sxs_una = "sxs_una", obsah = "obsah", dat_zmena = "dat_zmena",}
	const enum GUserCustomStorageDtoFragments { ixs_ref = "*", faze = "*", sxs_una = "*", obsah = "*", dat_zmena = "*",}
	const enum GUserCustomStorageDtoTypes { ixs_ref = "string", faze = "string", sxs_una = "string", obsah = "JsonBlob", dat_zmena = "JsonDate",}
	const enum GUserCustomStorageDtoTypeLengths {}
	/**Výčet identifikačních kritérií pro UserCustomStorage*/
	const enum GUserCustomStorageFilter {
		/**identifikátor referenta*/
		ixs_ref,
		/**faze*/
		faze,
		sxs_una,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\UserSettings\SettingTemplate.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGSettingTemplate
	* @domain Core
	*/
	interface SettingTemplate {
		/**Read*/
		read(rq?:Gordic.Gin.Interface.GSettingTemplateDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GSettingTemplateDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GSettingTemplateDto>,GServiceReadResponse<Gordic.Gin.Interface.GSettingTemplateDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GSettingTemplateDto>>;
		/**Create*/
		create(rq?:Gordic.Gin.Interface.GSettingTemplateDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GSettingTemplateDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GSettingTemplateDto>,GServiceSaveResponse<Gordic.Gin.Interface.GSettingTemplateDto>>;
		/**Update*/
		update(rq?:Gordic.Gin.Interface.GSettingTemplateDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GSettingTemplateDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GSettingTemplateDto>,GServiceSaveResponse<Gordic.Gin.Interface.GSettingTemplateDto>>;
		/**Delete*/
		delete(rq?:Gordic.Gin.Interface.GSettingTemplateDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GSettingTemplateDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GSettingTemplateDto>,GServiceSaveResponse<Gordic.Gin.Interface.GSettingTemplateDto>>;
		/**Funkce, která zjistí, jestli databáze může ukládat do databáze poznámku*/
		canUpdateNode(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Zajistí založení základní globální šablony pro fázi*/
		ensureBaseSettingTemplate(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SettingTemplate: ServiceBase & Catalog.SettingTemplate;
	}
	const SettingTemplate: Client["SettingTemplate"];
}
declare namespace Gordic.Gin.Interface {
	/**GSettingTemplateDto*/
	interface GSettingTemplateDto {
		/**ixs_unw*/
		ixs_unw?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**obsah*/
		obsah?: string|null;
		/**poznamka*/
		poznamka?: string|null;
	}
	const enum GSettingTemplateDtoNames { ixs_unw = "ixs_unw", nazev = "nazev", obsah = "obsah", poznamka = "poznamka",}
	const enum GSettingTemplateDtoFragments { ixs_unw = "*", nazev = "base", obsah = "obsah", poznamka = "base",}
	const enum GSettingTemplateDtoTypes { ixs_unw = "string", nazev = "string", obsah = "string", poznamka = "string",}
	const enum GSettingTemplateDtoTypeLengths {}
	/**GSettingTemplateFilter*/
	const enum GSettingTemplateFilter {
		/**ixs_unw*/
		ixs_unw,
		/**nazev*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Vlastnosti\GGinVlastnostiDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**Třída rozšiřující již existující DTO o property, které se v TK neselectují*/
	interface GSeznamVlastnostiDtoExtended extends Gordic.Gin.Interface.SeznamVlastnostiDto {
		/**The priz delete*/
		priz_del?: number|null;
		/**Aktivita struktury*/
		aktivita_stv?: number|null;
		/**Aktivita profilu*/
		aktivita_pro?: number|null;
		/**Aktivita vazby profil-struktura*/
		aktivita_stv_pro?: number|null;
		/**Aktivita vazby struktura - vlastnost*/
		aktivita_vla_stv?: number|null;
		/**ixs_rpp*/
		ixs_rpp?: string|null;
		/**rpp_colname*/
		rpp_colname?: string|null;
		druh_vla?: number|null;
	}
	const enum GSeznamVlastnostiDtoExtendedNames { priz_del = "priz_del", aktivita_stv = "aktivita_stv", aktivita_pro = "aktivita_pro", aktivita_stv_pro = "aktivita_stv_pro", aktivita_vla_stv = "aktivita_vla_stv", ixs_rpp = "ixs_rpp", rpp_colname = "rpp_colname", druh_vla = "druh_vla", ixs_pro = "ixs_pro", nazev_pro = "nazev_pro", ixs_stv = "ixs_stv", nazev_stv = "nazev_stv", ixs_vla = "ixs_vla", nazev_vla = "nazev_vla", por_cislo = "por_cislo", radek = "radek", aktivita = "aktivita", hovla = "hovla", hovla_txt = "hovla_txt", hovla_txt2 = "hovla_txt2", cs_hovla_txt = "cs_hovla_txt", ix = "ix", typ_ag = "typ_ag", kod = "kod", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_zmenu_prov = "nazev_zmenu_prov", k_v_pro = "k_v_pro", k_v_stv = "k_v_stv", k_v_vla = "k_v_vla", nazev = "nazev", zkratka = "zkratka", aktivita1 = "aktivita1", priz_edit = "priz_edit", priz_add = "priz_add", typ_vla = "typ_vla", typ_vla_txt = "typ_vla_txt", dat_typ = "dat_typ", velikost = "velikost", maska = "maska", kod_pro = "kod_pro", kod_stv = "kod_stv", kod_vla = "kod_vla", priz_pov_stv = "priz_pov_stv", priz_edit_stv = "priz_edit_stv", priz_vir_stv = "priz_vir_stv", priz_vir_pro = "priz_vir_pro", uroven_vla = "uroven_vla", barva = "barva", s_view_detail = "s_view_detail", ixs_cis = "ixs_cis",}
	const enum GSeznamVlastnostiDtoExtendedFragments { priz_del = "*", aktivita_stv = "*", aktivita_pro = "*", aktivita_stv_pro = "*", aktivita_vla_stv = "*", ixs_rpp = "*", rpp_colname = "*", druh_vla = "*", ixs_pro = "*", nazev_pro = "*", ixs_stv = "*", nazev_stv = "*", ixs_vla = "*", nazev_vla = "*", por_cislo = "*", radek = "*", aktivita = "*", hovla = "*", hovla_txt = "*", hovla_txt2 = "*", cs_hovla_txt = "*", ix = "*", typ_ag = "*", kod = "*", dat_zmena = "*", zmenu_prov = "*", nazev_zmenu_prov = "*", k_v_pro = "*", k_v_stv = "*", k_v_vla = "*", nazev = "*", zkratka = "*", aktivita1 = "*", priz_edit = "*", priz_add = "*", typ_vla = "*", typ_vla_txt = "*", dat_typ = "*", velikost = "*", maska = "*", kod_pro = "*", kod_stv = "*", kod_vla = "*", priz_pov_stv = "*", priz_edit_stv = "*", priz_vir_stv = "*", priz_vir_pro = "*", uroven_vla = "*", barva = "*", s_view_detail = "*", ixs_cis = "*",}
	const enum GSeznamVlastnostiDtoExtendedTypes { priz_del = "number", aktivita_stv = "number", aktivita_pro = "number", aktivita_stv_pro = "number", aktivita_vla_stv = "number", ixs_rpp = "string", rpp_colname = "string", druh_vla = "number", ixs_pro = "string", nazev_pro = "string", ixs_stv = "string", nazev_stv = "string", ixs_vla = "string", nazev_vla = "string", por_cislo = "number", radek = "number", aktivita = "number", hovla = "string", hovla_txt = "string", hovla_txt2 = "string", cs_hovla_txt = "string", ix = "string", typ_ag = "number", kod = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_zmenu_prov = "string", k_v_pro = "number", k_v_stv = "number", k_v_vla = "number", nazev = "string", zkratka = "string", aktivita1 = "number", priz_edit = "number", priz_add = "number", typ_vla = "number", typ_vla_txt = "string", dat_typ = "number", velikost = "number", maska = "string", kod_pro = "string", kod_stv = "string", kod_vla = "string", priz_pov_stv = "number", priz_edit_stv = "number", priz_vir_stv = "number", priz_vir_pro = "number", uroven_vla = "number", barva = "string", s_view_detail = "number", ixs_cis = "string",}
	const enum GSeznamVlastnostiDtoExtendedTypeLengths {}
	/**Keys only dto for vla*/
	interface GGinVlastnostiDocKeysDto {
		/**The ixx*/
		ixx?: string|null;
		/**sxs*/
		sxs?: string|null;
		/**typ_obj*/
		typ_obj?: number|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**Aktivita filter*/
		aktivita?: number|null;
	}
	const enum GGinVlastnostiDocKeysDtoNames { ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", aktivita = "aktivita",}
	const enum GGinVlastnostiDocKeysDtoFragments { ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", aktivita = "*",}
	const enum GGinVlastnostiDocKeysDtoTypes { ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", aktivita = "number",}
	const enum GGinVlastnostiDocKeysDtoTypeLengths {}
	interface GGinVlastnostiMetaReadDto extends Gordic.Gin.Interface.GGinVlastnostiDocKeysDto {
		/**extensions filter*/
		extPropsFilter?: Gordic.Gin.Interface.GGinVlastnostiExtPropsFilterDto|null;
		filterUrovenVla?: boolean|null;
		filterPovinneOnly?: boolean|null;
	}
	const enum GGinVlastnostiMetaReadDtoNames { extPropsFilter = "extPropsFilter", filterUrovenVla = "filterUrovenVla", filterPovinneOnly = "filterPovinneOnly", ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", aktivita = "aktivita",}
	const enum GGinVlastnostiMetaReadDtoFragments { extPropsFilter = "*", filterUrovenVla = "*", filterPovinneOnly = "*", ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", aktivita = "*",}
	const enum GGinVlastnostiMetaReadDtoTypes { extPropsFilter = "Gordic.Gin.Interface.GGinVlastnostiExtPropsFilterDto", filterUrovenVla = "boolean", filterPovinneOnly = "boolean", ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", aktivita = "number",}
	const enum GGinVlastnostiMetaReadDtoTypeLengths {}
	/**Dto for AddFromDoc operation*/
	interface GGinVlastnostiCopyFromToDto {
		/**Document to copy from*/
		from?: Gordic.Gin.Interface.GGinVlastnostiDocKeysDto|null;
		/**Document to copy to*/
		to?: Gordic.Gin.Interface.GGinVlastnostiDocKeysDto|null;
	}
	const enum GGinVlastnostiCopyFromToDtoNames { from = "from", to = "to",}
	const enum GGinVlastnostiCopyFromToDtoFragments { from = "*", to = "*",}
	const enum GGinVlastnostiCopyFromToDtoTypes { from = "Gordic.Gin.Interface.GGinVlastnostiDocKeysDto", to = "Gordic.Gin.Interface.GGinVlastnostiDocKeysDto",}
	const enum GGinVlastnostiCopyFromToDtoTypeLengths {}
	/**Dto for manipulations with meta data on documents*/
	interface GGinVlastnostiDocDto<TMeta> extends Gordic.Gin.Interface.GGinVlastnostiDocKeysDto {
		/**Metadata - contains metadata of pro/stv or vla*/
		meta?: TMeta|null;
		/**Value data for vla on document*/
		vla_data?: Gordic.Gin.Interface.GGinVlastnostDataDto[]|null;
		/**extensions filter - if set, services will return data filtered by this filter*/
		extPropsFilter?: Gordic.Gin.Interface.GGinVlastnostiExtPropsFilterDto|null;
		/**if true, services will load fresh vla_data info from database, otherwise they will return what they got.*/
		returnVlaData?: boolean|null;
	}
	const enum GGinVlastnostiDocDtoNames { meta = "meta", vla_data = "vla_data", extPropsFilter = "extPropsFilter", returnVlaData = "returnVlaData", ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", aktivita = "aktivita",}
	const enum GGinVlastnostiDocDtoFragments { meta = "*", vla_data = "*", extPropsFilter = "*", returnVlaData = "*", ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", aktivita = "*",}
	const enum GGinVlastnostiDocDtoTypes { meta = "TMeta", vla_data = "Gordic.Gin.Interface.GGinVlastnostDataDto[]", extPropsFilter = "Gordic.Gin.Interface.GGinVlastnostiExtPropsFilterDto", returnVlaData = "boolean", ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", aktivita = "number",}
	const enum GGinVlastnostiDocDtoTypeLengths {}
	/**Dto for bulk transferring vla data for details*/
	interface GGinVlastnostiDataDto extends Gordic.Gin.Interface.GGinVlastnostiDocKeysDto {
		/**The vlastnosti data*/
		vla_data?: Gordic.Gin.Interface.GGinVlastnostDataDto[]|null;
		Ext?: any|null;
	}
	const enum GGinVlastnostiDataDtoNames { vla_data = "vla_data", Ext = "Ext", ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", aktivita = "aktivita",}
	const enum GGinVlastnostiDataDtoFragments { vla_data = "*", Ext = "*", ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", aktivita = "*",}
	const enum GGinVlastnostiDataDtoTypes { vla_data = "Gordic.Gin.Interface.GGinVlastnostDataDto[]", Ext = "any", ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", aktivita = "number",}
	const enum GGinVlastnostiDataDtoTypeLengths {}
	/**Dto for bulk transferring vla meta for details*/
	interface GGinVlastnostiMetaDto extends Gordic.Gin.Interface.GGinVlastnostiDocKeysDto {
		/**The vla meta*/
		vla_meta?: Gordic.Gin.Interface.GGinProfilMetaDto[]|null;
	}
	const enum GGinVlastnostiMetaDtoNames { vla_meta = "vla_meta", ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", aktivita = "aktivita",}
	const enum GGinVlastnostiMetaDtoFragments { vla_meta = "*", ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", aktivita = "*",}
	const enum GGinVlastnostiMetaDtoTypes { vla_meta = "Gordic.Gin.Interface.GGinProfilMetaDto[]", ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", aktivita = "number",}
	const enum GGinVlastnostiMetaDtoTypeLengths {}
	/**Dto for ginspro*/
	interface GGinProfilMetaDto {
		/**The ixs pro*/
		ixs_pro?: string|null;
		/**The nazev*/
		nazev?: string|null;
		/**The k v*/
		k_v?: number|null;
		/**The priz vir*/
		priz_vir?: number|null;
		/**The kod*/
		kod?: string|null;
		/**The por cislo*/
		por_cislo?: number|null;
		/**Ixs_RPP*/
		ixs_rpp?: string|null;
		/**This profile has already saved value for document*/
		isSaved?: boolean|null;
		/**This profile is defined by extProps.*/
		isExtProp?: boolean|null;
		/**Virtual por_cislo. Same as por_cislo for records which are saved, virtual for records which are not saved yet. Future actual por_cislo can be different for not saved records*/
		virtual_por_cislo?: number|null;
		/**Aktivita of the ext.prop definition*/
		aktivita_ext?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Druh vlastností*/
		druh_vla?: number|null;
		/**The samostatna vlastnost*/
		samostatnaVlastnost?: boolean|null;
		/**The struktury*/
		Struktury?: Gordic.Gin.Interface.GGinStrukturaMetaDto[]|null;
	}
	const enum GGinProfilMetaDtoNames { ixs_pro = "ixs_pro", nazev = "nazev", k_v = "k_v", priz_vir = "priz_vir", kod = "kod", por_cislo = "por_cislo", ixs_rpp = "ixs_rpp", isSaved = "isSaved", isExtProp = "isExtProp", virtual_por_cislo = "virtual_por_cislo", aktivita_ext = "aktivita_ext", aktivita = "aktivita", druh_vla = "druh_vla", samostatnaVlastnost = "samostatnaVlastnost", Struktury = "Struktury",}
	const enum GGinProfilMetaDtoFragments { ixs_pro = "Base", nazev = "Minimal", k_v = "*", priz_vir = "*", kod = "*", por_cislo = "*", ixs_rpp = "*", isSaved = "*", isExtProp = "*", virtual_por_cislo = "*", aktivita_ext = "*", aktivita = "*", druh_vla = "*", samostatnaVlastnost = "*", Struktury = "*",}
	const enum GGinProfilMetaDtoTypes { ixs_pro = "string", nazev = "string", k_v = "number", priz_vir = "number", kod = "string", por_cislo = "number", ixs_rpp = "string", isSaved = "boolean", isExtProp = "boolean", virtual_por_cislo = "number", aktivita_ext = "number", aktivita = "number", druh_vla = "number", samostatnaVlastnost = "boolean", Struktury = "Gordic.Gin.Interface.GGinStrukturaMetaDto[]",}
	const enum GGinProfilMetaDtoTypeLengths {}
	/**Dto for ginsstv*/
	interface GGinStrukturaMetaDto {
		/**The ixs pro*/
		ixs_pro?: string|null;
		/**The ixs STV*/
		ixs_stv?: string|null;
		/**The nazev*/
		nazev?: string|null;
		/**The zkratka*/
		zkratka?: string|null;
		/**The k v*/
		k_v?: number|null;
		/**The priz vir*/
		priz_vir?: number|null;
		/**The kod*/
		kod?: string|null;
		/**The vlastnosti*/
		Vlastnosti?: Gordic.Gin.Interface.GGinVlastnostMetaDto[]|null;
		/**The priz edit*/
		priz_edit?: number|null;
		/**Příznak povinnosti*/
		priz_pov?: number|null;
		/**The aktivita*/
		aktivita?: number|null;
		/**The aktivita of link with pro in gindpro*/
		aktivita_stv_pro?: number|null;
		/**The por cislo*/
		por_cislo?: number|null;
		/**Virtual por_cislo. Same as por_cislo for records which are saved, virtual for records which are not saved yet. Future actual por_cislo can be different for not saved records*/
		virtual_por_cislo?: number|null;
		/**Druh vlastností*/
		druh_vla?: number|null;
	}
	const enum GGinStrukturaMetaDtoNames { ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", nazev = "nazev", zkratka = "zkratka", k_v = "k_v", priz_vir = "priz_vir", kod = "kod", Vlastnosti = "Vlastnosti", priz_edit = "priz_edit", priz_pov = "priz_pov", aktivita = "aktivita", aktivita_stv_pro = "aktivita_stv_pro", por_cislo = "por_cislo", virtual_por_cislo = "virtual_por_cislo", druh_vla = "druh_vla",}
	const enum GGinStrukturaMetaDtoFragments { ixs_pro = "Base", ixs_stv = "Base", nazev = "Minimal", zkratka = "*", k_v = "*", priz_vir = "*", kod = "*", Vlastnosti = "*", priz_edit = "*", priz_pov = "*", aktivita = "*", aktivita_stv_pro = "*", por_cislo = "*", virtual_por_cislo = "*", druh_vla = "*",}
	const enum GGinStrukturaMetaDtoTypes { ixs_pro = "string", ixs_stv = "string", nazev = "string", zkratka = "string", k_v = "number", priz_vir = "number", kod = "string", Vlastnosti = "Gordic.Gin.Interface.GGinVlastnostMetaDto[]", priz_edit = "number", priz_pov = "number", aktivita = "number", aktivita_stv_pro = "number", por_cislo = "number", virtual_por_cislo = "number", druh_vla = "number",}
	const enum GGinStrukturaMetaDtoTypeLengths {}
	/**Dto for vla keys*/
	interface GGinVlastnostMetaKeyDto {
		ixs_pro?: string|null;
		ixs_stv?: string|null;
		ixs_vla?: string|null;
	}
	const enum GGinVlastnostMetaKeyDtoNames { ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", ixs_vla = "ixs_vla",}
	const enum GGinVlastnostMetaKeyDtoFragments { ixs_pro = "*", ixs_stv = "*", ixs_vla = "*",}
	const enum GGinVlastnostMetaKeyDtoTypes { ixs_pro = "string", ixs_stv = "string", ixs_vla = "string",}
	const enum GGinVlastnostMetaKeyDtoTypeLengths {}
	/**Meta dto for vla*/
	interface GGinVlastnostMetaDto {
		/**The ixs pro - vvla*/
		ixs_pro?: string|null;
		/**The ixs stv - vvla*/
		ixs_stv?: string|null;
		/**The ixs vla*/
		ixs_vla?: string|null;
		/**The ixs cis*/
		ixs_cis?: string|null;
		/**The nazev*/
		nazev?: string|null;
		/**The priz vir*/
		priz_vir?: number|null;
		/**The maska*/
		maska?: string|null;
		/**The kod of ginsvla*/
		kod?: string|null;
		/**The zmenu prov*/
		zmenu_prov?: string|null;
		/**The aktivita*/
		aktivita?: number|null;
		/**The priz edit*/
		priz_edit?: number|null;
		/**The priz add*/
		priz_add?: number|null;
		/**The priz delete*/
		priz_del?: number|null;
		/**The typ vla*/
		typ_vla?: number|null;
		/**The typ vla text*/
		typ_vla_txt?: string|null;
		/**The dat typ*/
		dat_typ?: number|null;
		/**The velikost*/
		velikost?: number|null;
		/**The zkratka*/
		zkratka?: string|null;
		/**The kod from ginvvla*/
		kod_vvla?: string|null;
		/**The k v from ginvvla*/
		k_v?: number|null;
		/**The por cislo from ginvvla*/
		por_cislo?: number|null;
		/**Aktivita vlastnosti ve struktuře (gindstv)*/
		aktivita_vla_stv?: number|null;
		/**Default hovla*/
		hovla?: string|null;
		/**Default hovla_txt*/
		hovla_txt?: string|null;
		/**ixs_rpp*/
		ixs_rpp?: string|null;
		/**rpp_colname*/
		rpp_colname?: string|null;
		/**rpp_name*/
		rpp_name?: string|null;
		/**Virtual por_cislo. Same as por_cislo for records which are saved, virtual for records which are not saved yet. Future actual por_cislo can be different for not saved records*/
		virtual_por_cislo?: number|null;
		/**Druh vlastnosti - 0 = popisná, 10 = rozšiřující*/
		druh_vla?: number|null;
		/**Příznak povinnosti*/
		priz_pov?: number|null;
	}
	const enum GGinVlastnostMetaDtoNames { ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", ixs_vla = "ixs_vla", ixs_cis = "ixs_cis", nazev = "nazev", priz_vir = "priz_vir", maska = "maska", kod = "kod", zmenu_prov = "zmenu_prov", aktivita = "aktivita", priz_edit = "priz_edit", priz_add = "priz_add", priz_del = "priz_del", typ_vla = "typ_vla", typ_vla_txt = "typ_vla_txt", dat_typ = "dat_typ", velikost = "velikost", zkratka = "zkratka", kod_vvla = "kod_vvla", k_v = "k_v", por_cislo = "por_cislo", aktivita_vla_stv = "aktivita_vla_stv", hovla = "hovla", hovla_txt = "hovla_txt", ixs_rpp = "ixs_rpp", rpp_colname = "rpp_colname", rpp_name = "rpp_name", virtual_por_cislo = "virtual_por_cislo", druh_vla = "druh_vla", priz_pov = "priz_pov",}
	const enum GGinVlastnostMetaDtoFragments { ixs_pro = "Base", ixs_stv = "Base", ixs_vla = "Base", ixs_cis = "*", nazev = "Minimal", priz_vir = "*", maska = "*", kod = "*", zmenu_prov = "*", aktivita = "*", priz_edit = "*", priz_add = "*", priz_del = "*", typ_vla = "*", typ_vla_txt = "*", dat_typ = "*", velikost = "*", zkratka = "*", kod_vvla = "*", k_v = "*", por_cislo = "*", aktivita_vla_stv = "*", hovla = "*", hovla_txt = "*", ixs_rpp = "*", rpp_colname = "*", rpp_name = "RPP_NAME", virtual_por_cislo = "*", druh_vla = "*", priz_pov = "*",}
	const enum GGinVlastnostMetaDtoTypes { ixs_pro = "string", ixs_stv = "string", ixs_vla = "string", ixs_cis = "string", nazev = "string", priz_vir = "number", maska = "string", kod = "string", zmenu_prov = "string", aktivita = "number", priz_edit = "number", priz_add = "number", priz_del = "number", typ_vla = "number", typ_vla_txt = "string", dat_typ = "number", velikost = "number", zkratka = "string", kod_vvla = "string", k_v = "number", por_cislo = "number", aktivita_vla_stv = "number", hovla = "string", hovla_txt = "string", ixs_rpp = "string", rpp_colname = "string", rpp_name = "string", virtual_por_cislo = "number", druh_vla = "number", priz_pov = "number",}
	const enum GGinVlastnostMetaDtoTypeLengths {}
	/**Dto for vla value data and keys to parent document and pro/stv/vla*/
	interface GGinVlastnostDataDto extends Gordic.Gin.Interface.GGinVlastnostiDocKeysDto {
		/**The ixs pro*/
		ixs_pro?: string|null;
		/**The ixs STV*/
		ixs_stv?: string|null;
		/**The ixs vla*/
		ixs_vla?: string|null;
		ixs_rpp?: string|null;
		rpp_colname?: string|null;
		/**The kod*/
		kod?: string|null;
		/**The por cislo*/
		por_cislo?: number|null;
		/**Řádek*/
		radek?: number|null;
		/**The hovla*/
		hovla?: string|null;
		/**The hovla text*/
		hovla_txt?: string|null;
		/**The k v PRO*/
		k_v_pro?: number|null;
		/**The k v STV*/
		k_v_stv?: number|null;
		/**The k v vla*/
		k_v_vla?: number|null;
		druh_vla?: number|null;
	}
	const enum GGinVlastnostDataDtoNames { ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", ixs_vla = "ixs_vla", ixs_rpp = "ixs_rpp", rpp_colname = "rpp_colname", kod = "kod", por_cislo = "por_cislo", radek = "radek", hovla = "hovla", hovla_txt = "hovla_txt", k_v_pro = "k_v_pro", k_v_stv = "k_v_stv", k_v_vla = "k_v_vla", druh_vla = "druh_vla", ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", aktivita = "aktivita",}
	const enum GGinVlastnostDataDtoFragments { ixs_pro = "*", ixs_stv = "*", ixs_vla = "*", ixs_rpp = "*", rpp_colname = "*", kod = "*", por_cislo = "*", radek = "*", hovla = "*", hovla_txt = "*", k_v_pro = "*", k_v_stv = "*", k_v_vla = "*", druh_vla = "*", ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", aktivita = "*",}
	const enum GGinVlastnostDataDtoTypes { ixs_pro = "string", ixs_stv = "string", ixs_vla = "string", ixs_rpp = "string", rpp_colname = "string", kod = "string", por_cislo = "number", radek = "number", hovla = "string", hovla_txt = "string", k_v_pro = "number", k_v_stv = "number", k_v_vla = "number", druh_vla = "number", ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", aktivita = "number",}
	const enum GGinVlastnostDataDtoTypeLengths {}
	/**Dto for connection of pro/stv/vla and ixs_typ*/
	interface GGinVlastnostiTvlDto {
		ixs?: string|null;
		typ_vps?: number|null;
		aktivita?: number|null;
		ixs_typ?: string|null;
	}
	const enum GGinVlastnostiTvlDtoNames { ixs = "ixs", typ_vps = "typ_vps", aktivita = "aktivita", ixs_typ = "ixs_typ",}
	const enum GGinVlastnostiTvlDtoFragments { ixs = "*", typ_vps = "*", aktivita = "*", ixs_typ = "*",}
	const enum GGinVlastnostiTvlDtoTypes { ixs = "string", typ_vps = "number", aktivita = "number", ixs_typ = "string",}
	const enum GGinVlastnostiTvlDtoTypeLengths {}
	/**Dto for connection of pro/stv/vla and typ_obj*/
	interface GGinVlastnostiOvlDto {
		ixs?: string|null;
		typ_vps?: number|null;
		typ_obj?: number|null;
	}
	const enum GGinVlastnostiOvlDtoNames { ixs = "ixs", typ_vps = "typ_vps", typ_obj = "typ_obj",}
	const enum GGinVlastnostiOvlDtoFragments { ixs = "*", typ_vps = "*", typ_obj = "*",}
	const enum GGinVlastnostiOvlDtoTypes { ixs = "string", typ_vps = "number", typ_obj = "number",}
	const enum GGinVlastnostiOvlDtoTypeLengths {}
	/**Dto for connection of pro/stv/vla and sxs+typ_obj(ovk) or null+typ_obj(ovl)*/
	interface GGinVlastnostiExtDto {
		ixs?: string|null;
		typ_vps?: number|null;
		typ_obj?: number|null;
		sxs?: string|null;
		aktivita?: number|null;
		poradi?: number|null;
	}
	const enum GGinVlastnostiExtDtoNames { ixs = "ixs", typ_vps = "typ_vps", typ_obj = "typ_obj", sxs = "sxs", aktivita = "aktivita", poradi = "poradi",}
	const enum GGinVlastnostiExtDtoFragments { ixs = "*", typ_vps = "*", typ_obj = "*", sxs = "*", aktivita = "*", poradi = "*",}
	const enum GGinVlastnostiExtDtoTypes { ixs = "string", typ_vps = "number", typ_obj = "number", sxs = "string", aktivita = "number", poradi = "number",}
	const enum GGinVlastnostiExtDtoTypeLengths {}
	/**Dto for connection of pro/stv/vla and typ_obj*/
	interface GGinVlastnostiOvkSxsKeyDto {
		sxs?: string|null;
		typ_obj?: number|null;
	}
	const enum GGinVlastnostiOvkSxsKeyDtoNames { sxs = "sxs", typ_obj = "typ_obj",}
	const enum GGinVlastnostiOvkSxsKeyDtoFragments { sxs = "*", typ_obj = "*",}
	const enum GGinVlastnostiOvkSxsKeyDtoTypes { sxs = "string", typ_obj = "number",}
	const enum GGinVlastnostiOvkSxsKeyDtoTypeLengths {}
	interface GGinVlastnostiExtPropsFilterDto {
		/**Konkretni vlastnost*/
		ixs?: string|null;
		/**Profil/Struktura/Vlastnost*/
		typ_vps?: number|null;
		/**Filtr na vlastnosti pro vsechny objekty daneho typu napr. dokument - ovl*/
		typ_obj?: number[]|null;
		/**Filtr na vlastnosti pro konkretni objekt urciteho typu (dvojice sxs,typ_obj) - napr konkretni kniha, kniha - ovk*/
		t_sxs?: Gordic.Gin.Interface.GGinVlastnostiOvkSxsKeyDto[]|null;
		/**Jestli se jedná o popisnou nebo rozšiřující vlastnost*/
		druh_vla?: number[]|null;
	}
	const enum GGinVlastnostiExtPropsFilterDtoNames { ixs = "ixs", typ_vps = "typ_vps", typ_obj = "typ_obj", t_sxs = "t_sxs", druh_vla = "druh_vla",}
	const enum GGinVlastnostiExtPropsFilterDtoFragments { ixs = "*", typ_vps = "*", typ_obj = "*", t_sxs = "*", druh_vla = "*",}
	const enum GGinVlastnostiExtPropsFilterDtoTypes { ixs = "string", typ_vps = "number", typ_obj = "number[]", t_sxs = "Gordic.Gin.Interface.GGinVlastnostiOvkSxsKeyDto[]", druh_vla = "number[]",}
	const enum GGinVlastnostiExtPropsFilterDtoTypeLengths {}
	/**Dto for filtering documents based on vla/pro/stv*/
	interface GGinVlastnostiFilterDto {
		/**Kind of filter - vla, stv or pro*/
		kind?: string|null;
		/**If is caseSensitive or not - 0/1*/
		caseSensitive?: number|null;
		/**Filter, which will be transformed for correct where.
		*     operator is operator
		*     if kind = pro value is "ixs_pro" ;
		*     if kind = stv value is "ixs_stv"; 
		*     if kind = vla values are ["ixs_vla","hovla","dat_typ|typ_vla"];
		*/
		values?: GBaseFilter<string>|null;
	}
	const enum GGinVlastnostiFilterDtoNames { kind = "kind", caseSensitive = "caseSensitive", values = "values",}
	const enum GGinVlastnostiFilterDtoFragments { kind = "*", caseSensitive = "*", values = "*",}
	const enum GGinVlastnostiFilterDtoTypes { kind = "string", caseSensitive = "number", values = "GBaseFilter<string>",}
	const enum GGinVlastnostiFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Vlastnosti\Gordic.Gin.Interface.GGinVlastnostiServices.d.ts 

declare namespace Gordic.Gin.Interface {
	interface GServiceSaveToDocRequest<TDto> extends Gordic.Isl.GServiceSaveRequest<TDto> {
		/**The Target ixx*/
		ixx?: string|null;
		sxs?: string|null;
		typ_obj?: number|null;
		/**The ixs typ*/
		ixs_typ?: string|null;
		/**Optional data to save for currently added profiles*/
		vla_data?: Gordic.Gin.Interface.GGinVlastnostDataDto[]|null;
	}
	const enum GServiceSaveToDocRequestNames { ixx = "ixx", sxs = "sxs", typ_obj = "typ_obj", ixs_typ = "ixs_typ", vla_data = "vla_data", data = "data", context = "context",}
	const enum GServiceSaveToDocRequestFragments { ixx = "*", sxs = "*", typ_obj = "*", ixs_typ = "*", vla_data = "*", data = "*", context = "*",}
	const enum GServiceSaveToDocRequestTypes { ixx = "string", sxs = "string", typ_obj = "number", ixs_typ = "string", vla_data = "Gordic.Gin.Interface.GGinVlastnostDataDto[]", data = "TDto", context = "Gordic.General.ApplicationInterface.GRequestContext",}
	interface GServiceSaveToDocResponse<TDto> extends Gordic.Isl.GServiceSaveResponse<TDto> {
		/**Optional data to save for currently added profiles*/
		vla_data?: Gordic.Gin.Interface.GGinVlastnostDataDto[]|null;
	}
	const enum GServiceSaveToDocResponseNames { vla_data = "vla_data", data = "data", result = "result",}
	const enum GServiceSaveToDocResponseFragments { vla_data = "*", data = "*", result = "*",}
	const enum GServiceSaveToDocResponseTypes { vla_data = "Gordic.Gin.Interface.GGinVlastnostDataDto[]", data = "TDto", result = "Gordic.General.ApplicationInterface.GOperationResult",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiDataService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain Core
	*/
	interface GinVlastnostiDataService {
		/**Saves data for the specified rq.*/
		upsert(rq?:Gordic.Gin.Interface.GGinVlastnostDataDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostDataDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostDataDto>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostDataDto>>;
		/**Lists data for the specified rq as single DTO for DETAILS.*/
		read(rq?:Gordic.Gin.Interface.GGinVlastnostDataDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostDataDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostDataDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinVlastnostDataDto>>;
		/**Lists data for the specified rq.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinVlastnostDataDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GinVlastnostiDataService: ServiceBase & Catalog.GinVlastnostiDataService;
	}
	const GinVlastnostiDataService: Client["GinVlastnostiDataService"];
}
declare namespace Gordic.Gin.Interface {
	const enum FilterGinVlastnosti {
		/**The profil*/
		ixs_pro,
		/**The struktura*/
		ixs_stv,
		/**The vlastnost*/
		ixs_vla,
		/**The dokument*/
		ixx,
		/**The dokument*/
		sxs,
		/**The typ objektu*/
		typ_obj,
		/**The por cislo*/
		por_cislo,
		/**The exist only*/
		existsOnly,
		/**The aktivita*/
		aktivita,
		druh_vla,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiDocumentDataService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain Core
	*/
	interface GinVlastnostiDocumentDataService {
		/**Saves data for the specified rq.*/
		save(rq?:Gordic.Gin.Interface.GGinVlastnostiDataDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDataDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDataDto>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDataDto>>;
		/**Lists data for the specified rq as single DTO for DETAILS.*/
		read(rq?:Gordic.Gin.Interface.GGinVlastnostiDocKeysDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostiDocKeysDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostiDocKeysDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinVlastnostiDataDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GinVlastnostiDocumentDataService: ServiceBase & Catalog.GinVlastnostiDocumentDataService;
	}
	const GinVlastnostiDocumentDataService: Client["GinVlastnostiDocumentDataService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiDocumentMetaService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain Core
	*/
	interface GinVlastnostiDocumentMetaService {
		/**Lists the vla on given ixx. You can select if you want Base Fragment or Data Fragment and Meta Fragment.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GSeznamVlastnostiDtoExtended>>;
		/**Reads whole meta tree for given ixx.*/
		read(rq?:Gordic.Gin.Interface.GGinVlastnostiMetaReadDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinVlastnostiMetaDto>>;
		/**Deletes the pro.*/
		removePro(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>>>;
		/**Deletes the STV.*/
		removeStv(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>>>;
		/**Deletes the vla.*/
		removeVla(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>>>;
		/**Adds the type of the by.*/
		addByType(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostiMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostiMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostiMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostiMetaDto>>>;
		/**Adds the by document.*/
		addFromDoc(rq?:Gordic.Gin.Interface.GGinVlastnostiCopyFromToDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiCopyFromToDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiCopyFromToDto>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiMetaDto>>;
		/**Deletes the pro.*/
		addPro(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinProfilMetaDto>>>;
		/**Deletes the STV.*/
		addStv(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinStrukturaMetaDto>>>;
		/**Deletes the vla.*/
		addVla(rq?:Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>>,GServiceSaveResponse<Gordic.Gin.Interface.GGinVlastnostiDocDto<Gordic.Gin.Interface.GGinVlastnostMetaDto>>>;
		/**Count of all desc props*/
		count(rq?:CallParams<GServiceListRequestWithData<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>>): _Task<GServiceListRequestWithData<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>,number>;
		/**Count of stored extended props*/
		storedExtPropsCount(rq?:CallParams<GServiceListRequestWithData<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>>): _Task<GServiceListRequestWithData<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>,number>;
		/**Count of valid extended props*/
		extPropsCount(rq?:CallParams<GServiceListRequestWithData<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>>): _Task<GServiceListRequestWithData<Gordic.Gin.Interface.GGinVlastnostiMetaReadDto>,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GinVlastnostiDocumentMetaService: ServiceBase & Catalog.GinVlastnostiDocumentMetaService;
	}
	const GinVlastnostiDocumentMetaService: Client["GinVlastnostiDocumentMetaService"];
}
declare namespace Gordic.Gin.Interface {
	const enum FilterVlastnostiCount {
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\Vlastnosti\Gordic.Gin.Interface.IGGinVlastnostiMetaService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain Core
	*/
	interface GinVlastnostiMetaService {
		/**List of connections between pro/stv/vla and ixs_typ*/
		listTvl(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinVlastnostiTvlDto>>;
		/**List of connections between ixs_rpp and ixs_typ*/
		listTvlIxsRpp(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinVlastnostiTvlDto>>;
		/**List of extensions - connections between pro/stv/vla and typ_obj/sxs from ginvovl/ovk*/
		listExts(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinVlastnostiExtDto>>;
		/**Lists all vla meta - with ixs_pro and ixs_stv. Name contains name of stv and pro if vla is contained in some (ixs_stv or ixs_pro is different from ixs_vla).*/
		listAllVla(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinVlastnostMetaDto>>;
		/**Lists the vla meta*/
		listVla(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinVlastnostMetaDto>>;
		/**Lists the structures.*/
		listStv(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinStrukturaMetaDto>>;
		/**Lists the profiles.*/
		listPro(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinProfilMetaDto>>;
		/**List Extensional properties*/
		listExtProps(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GGinProfilMetaDto>>;
		/**Reads the Pro meta.*/
		readPro(rq?:Gordic.Gin.Interface.GGinProfilMetaDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinProfilMetaDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinProfilMetaDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinProfilMetaDto>>;
		/**Reads the Stv meta.*/
		readStv(rq?:Gordic.Gin.Interface.GGinStrukturaMetaDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinStrukturaMetaDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinStrukturaMetaDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinStrukturaMetaDto>>;
		/**Reads the Vla meta.*/
		readVla(rq?:Gordic.Gin.Interface.GGinVlastnostMetaDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostMetaDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GGinVlastnostMetaDto>,GServiceReadResponse<Gordic.Gin.Interface.GGinVlastnostMetaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GinVlastnostiMetaService: ServiceBase & Catalog.GinVlastnostiMetaService;
	}
	const GinVlastnostiMetaService: Client["GinVlastnostiMetaService"];
}
declare namespace Gordic.Gin.Interface {
	const enum FilterListPro {
		ixs_pro,
		ixs_stv,
		ixs_vla,
		/**is virtual - was created automatically*/
		priz_vir,
		aktivita,
	}
	const enum FilterListStv {
		ixs_pro,
		ixs_stv,
		ixs_vla,
		/**is virtual - was created automatically*/
		priz_vir,
		aktivita,
	}
	const enum FilterListVla {
		ixs_stv,
		ixs_vla,
		priz_add,
		priz_edit,
		priz_del,
		aktivita,
		ixs_rpp,
	}
	const enum FilterListAllVla {
		ixs_pro,
		ixs_stv,
		ixs_vla,
		priz_add,
		priz_edit,
		priz_del,
		/**todo - jedna aktivita asi nestačí*/
		aktivita,
		ixs_rpp,
		/**Kod*/
		kod,
		/**Filter by gin_vla_ppro/pstr/pvla params*/
		filter_by_params,
	}
	const enum FilterTvl {
		ixs,
		typ_vps,
		ixs_typ,
	}
	const enum FilterOvl {
		sxs,
		ixs,
		typ_vps,
		typ_obj,
		t_sxs,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ZastupyExu\Gordic.Gin.Interface.GPublicUserDelegationDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**informace o zástupu externího uživatele typu veřejnost*/
	interface GPublicUserDelegationDto {
		/**identifikátor zastupujícího uživatele*/
		ixs_exu?: string|null;
		/**identifikátor zastupovaného uživatele*/
		ixs_exu_zas?: string|null;
		/**pořadové číslo zástupu*/
		por_cis_zas?: number|null;
		/**identifikátor externího subektu zastupovaného uživatele*/
		ixs_esu_zas?: string|null;
		/**název externího subjektu zastupovaného uživatele*/
		esu_txt_zas?: string|null;
		/**datum platnosti zástupu od*/
		dat_od?: JsonDate|null;
		/**datum platnosti zástupu do*/
		dat_do?: JsonDate|null;
		/**stupeň verifikace zástupu*/
		verif_exu?: number|null;
		/**poznámka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor původce změny*/
		zmenu_prov?: string|null;
	}
	const enum GPublicUserDelegationDtoNames { ixs_exu = "ixs_exu", ixs_exu_zas = "ixs_exu_zas", por_cis_zas = "por_cis_zas", ixs_esu_zas = "ixs_esu_zas", esu_txt_zas = "esu_txt_zas", dat_od = "dat_od", dat_do = "dat_do", verif_exu = "verif_exu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPublicUserDelegationDtoFragments { ixs_exu = "*", ixs_exu_zas = "*", por_cis_zas = "*", ixs_esu_zas = "*", esu_txt_zas = "*", dat_od = "*", dat_do = "*", verif_exu = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPublicUserDelegationDtoTypes { ixs_exu = "string", ixs_exu_zas = "string", por_cis_zas = "number", ixs_esu_zas = "string", esu_txt_zas = "string", dat_od = "JsonDate", dat_do = "JsonDate", verif_exu = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPublicUserDelegationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ZastupyExu\Gordic.Gin.Interface.GPublicUserDelegationFilter.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtr pro omezení výběru zástupů externích uživatelů typu veřejnost*/
	const enum GPublicUserDelegationFilter {
		/**identifikátor zastupujícího uživatele*/
		ixs_exu,
		/**identifikátor zastupovaného uživatele*/
		ixs_exu_zas,
		/**pořadové číslo zástupu*/
		por_cis_zas,
		/**datum platnosti zástupu od*/
		dat_od,
		/**datum platnosti zástupu do*/
		dat_do,
		/**stupeň verifikace zástupu*/
		verif_exu,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ZastupyExu\Gordic.Gin.Interface.GPublicUserDelegationFilterDto.d.ts 

declare namespace Gordic.Gin.Interface {
	/**filtr pro omezení výběru zástupů externích uživatelů typu veřejnost*/
	interface GPublicUserDelegationFilterDto {
		/**identifikátor zastupujícího uživatele*/
		ixs_exu?: GBaseFilter<string>|null;
		/**identifikátor zastupovaného uživatele*/
		ixs_exu_zas?: GBaseFilter<string>|null;
		/**pořadové číslo zástupu*/
		por_cis_zas?: GBaseFilter<number>|null;
		/**datum platnosti zástupu od*/
		dat_od?: GBaseFilter<JsonDate>|null;
		/**datum platnosti zástupu do*/
		dat_do?: GBaseFilter<JsonDate>|null;
		/**stupeň verifikace zástupu*/
		verif_exu?: GBaseFilter<number>|null;
		/**aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GPublicUserDelegationFilterDtoNames { ixs_exu = "ixs_exu", ixs_exu_zas = "ixs_exu_zas", por_cis_zas = "por_cis_zas", dat_od = "dat_od", dat_do = "dat_do", verif_exu = "verif_exu", aktivita = "aktivita",}
	const enum GPublicUserDelegationFilterDtoFragments { ixs_exu = "*", ixs_exu_zas = "*", por_cis_zas = "*", dat_od = "*", dat_do = "*", verif_exu = "*", aktivita = "*",}
	const enum GPublicUserDelegationFilterDtoTypes { ixs_exu = "GBaseFilter<string>", ixs_exu_zas = "GBaseFilter<string>", por_cis_zas = "GBaseFilter<number>", dat_od = "GBaseFilter<JsonDate>", dat_do = "GBaseFilter<JsonDate>", verif_exu = "GBaseFilter<number>", aktivita = "GBaseFilter<number>",}
	const enum GPublicUserDelegationFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gin.Interface\ZastupyExu\Gordic.Gin.Interface.IGPublicUserDelegation.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro zástupy externích uživatelů typu veřejnost
	* @domain Core
	*/
	interface ZastupExternihoUzivatele {
		/**získání seznamu zástupů externích uživatelů typu veřejnost*/
		list(rq?:Gordic.Gin.Interface.GPublicUserDelegationFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gin.Interface.GPublicUserDelegationDto>>;
		/**získání informací o zástupu externího uživatele typu veřejnost*/
		read(rq?:Gordic.Gin.Interface.GPublicUserDelegationDto|CallParams<GServiceReadRequest<Gordic.Gin.Interface.GPublicUserDelegationDto>>): _Task<GServiceReadRequest<Gordic.Gin.Interface.GPublicUserDelegationDto>,GServiceReadResponse<Gordic.Gin.Interface.GPublicUserDelegationDto>>;
		/**aktualizace informací o zástupu externího uživatele typu veřejnost*/
		update(rq?:Gordic.Gin.Interface.GPublicUserDelegationDto|CallParams<GServiceSaveRequest<Gordic.Gin.Interface.GPublicUserDelegationDto>>): _Task<GServiceSaveRequest<Gordic.Gin.Interface.GPublicUserDelegationDto>,GServiceSaveResponse<Gordic.Gin.Interface.GPublicUserDelegationDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZastupExternihoUzivatele: ServiceBase & Catalog.ZastupExternihoUzivatele;
	}
	const ZastupExternihoUzivatele: Client["ZastupExternihoUzivatele"];
}

//#endregion

