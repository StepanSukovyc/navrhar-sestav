/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adx.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adx.Interface\Gordic.Adx.Interface.csproj
*    created     2026-02-16 14:33:44
*    files       Base\GAdxExistResultDto.d.ts
*                Base\GAdxInformationDto.d.ts
*                Base\GAdxIslConst.d.ts
*                Base\GAdxResultHromadnaOperace.d.ts
*                Base\GAdxSubjectPermissions.d.ts
*                Base\IAdxSubjectPermissionsIslDto.d.ts
*                Base\IGAdeEkonomickaKonfigurace.d.ts
*                Base\IGAdxExterniIdInput.d.ts
*                Base\IGAdxObjektZmenaService.d.ts
*                Base\IGAdxVlastnostProSubjekt.d.ts
*                Dto\GAdxExportInfoDto.d.ts
*                Dto\GAdxFieldMetaData.d.ts
*                Dto\GAdxPasswordDto.d.ts
*                Dto\GAdxResultKopieVazbyDto.d.ts
*                Dto\GCountData.d.ts
*                Dto\GEkoKnihaDto.d.ts
*                Dto\GEkoscfuDto.d.ts
*                Dto\GExterniIdentifikaceDto.d.ts
*                Dto\GGinsicoDto.d.ts
*                Dto\GWfldblkDto.d.ts
*                Dto\GWflsblkDto.d.ts
*                Dto\GXxxrdac.d.ts
*                Dto\GXxxsden.d.ts
*                Dto\GXxxvrfu.d.ts
*                Dto\LicenceDto.d.ts
*                Dto\Gin\GGincmisDto.d.ts
*                Dto\Gin\GGincorjDto.d.ts
*                Dto\Gin\GGincsbuDto.d.ts
*                Dto\Gin\GGinqbudDto.d.ts
*                Dto\Gin\GGinqmisDto.d.ts
*                Dto\Gin\GGinqsbuDto.d.ts
*                Dto\Gin\GGinsbudDto.d.ts
*                Dto\Gin\GGinskeyDto.d.ts
*                Dto\Gin\GGinskovDto.d.ts
*                Dto\Gin\GGinsmisDto.d.ts
*                Dto\Gin\GGinsorjDto.d.ts
*                Dto\Gin\GGinsrefDto.d.ts
*                Dto\Gin\GGinssbuDto.d.ts
*                Dto\Gin\GGinvovkDto.d.ts
*                Dto\Gin\GGinvovpDto.d.ts
*                Dto\Readers\Dto\GGincobjDto.d.ts
*                Dto\Readers\Dto\GMzardacDto.d.ts
*                Dto\Readers\Dto\GReaderAdxEkosobdDto.d.ts
*                Dto\Readers\Dto\GReaderAdxGincaktDto.d.ts
*                Dto\Readers\Dto\GReaderAdxKnihaIxpDto.d.ts
*                Dto\Readers\Dto\GRzardacDto.d.ts
*                Dto\Readers\Dto\GWflctsuDto.d.ts
*                Dto\Readers\Interface\IGReaderAdxGincorj.d.ts
*                Dto\Readers\Interface\IGReaderAdxGinvovp.d.ts
*                ISL\Gin\IGAdxBudova.d.ts
*                ISL\Gin\IGAdxMistnost.d.ts
*                ISL\Gin\IGAdxOrganizacniJednotka.d.ts
*                ISL\Gin\IGAdxPrirazenaVlastnostProObjekt.d.ts
*                ISL\Gin\IGAdxPristupovyKlic.d.ts
*                ISL\Gin\IGAdxSegmentBudovy.d.ts
*                ISL\Gin\IGAdxZodpovednyPracovnik.d.ts
*                ISL\Wfl\IGAdxVyberovaSkupina.d.ts
*                ISL\Wfl\IGAdxVyberovaSkupinaObsah.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\GAdxExistResultDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Dto, které vrací výsledek existence DTO podle PK*/
	interface GAdxExistResultDto<Dto> {
		/**Výsledek*/
		result?: boolean|null;
		/**Dto*/
		data?: Dto|null;
	}
	const enum GAdxExistResultDtoNames { result = "result", data = "data",}
	const enum GAdxExistResultDtoFragments { result = "*", data = "*",}
	const enum GAdxExistResultDtoTypes { result = "boolean", data = "Dto",}
	const enum GAdxExistResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\GAdxInformationDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Přídavné informace k objektu*/
	interface GAdxInformationDto {
		/**ID typu objektu*/
		typ_obj?: number|null;
		/**SXS objektu*/
		sxs?: string|null;
		/**Příznak nového objektu (důležité v případě pokud se jedná o vazební objekt)*/
		priz_new?: boolean|null;
	}
	const enum GAdxInformationDtoNames { typ_obj = "typ_obj", sxs = "sxs", priz_new = "priz_new",}
	const enum GAdxInformationDtoFragments { typ_obj = "*", sxs = "*", priz_new = "*",}
	const enum GAdxInformationDtoTypes { typ_obj = "number", sxs = "string", priz_new = "boolean",}
	const enum GAdxInformationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\GAdxIslConst.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Konstanty pro ADM - ISL*/
	interface GAdxIslConst {
		/**Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se nemají načítat data z DB, pouze se mají vrátit výchozí honodty pro požadovaný objekt*/
		defaultValuesForNewRecord?: string|null;
		/**Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je přítomná na detailu*/
		detail?: string|null;
		/**Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je přítomná na seznamu*/
		seznam?: string|null;
		/**Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je všude - jak na seznamu, tak na detailu*/
		everyWhere?: string|null;
	}
	const enum GAdxIslConstNames { defaultValuesForNewRecord = "defaultValuesForNewRecord", detail = "detail", seznam = "seznam", everyWhere = "everyWhere",}
	const enum GAdxIslConstFragments { defaultValuesForNewRecord = "*", detail = "*", seznam = "*", everyWhere = "*",}
	const enum GAdxIslConstTypes { defaultValuesForNewRecord = "string", detail = "string", seznam = "string", everyWhere = "string",}
	const enum GAdxIslConstTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\GAdxResultHromadnaOperace.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Předpis pro výsledek hromadné operace*/
	interface GAdxResultHromadnaOperace<T> {
		/**Výsledek Enum*/
		result?: Gordic.Adx.Interface.GAdxResultHromadnaOperaceEnum|null;
		/**Zpráva (význam při chybě)*/
		message?: string|null;
		/**Výsledná data*/
		data?: T|null;
	}
	const enum GAdxResultHromadnaOperaceNames { result = "result", message = "message", data = "data",}
	const enum GAdxResultHromadnaOperaceFragments { result = "*", message = "*", data = "*",}
	const enum GAdxResultHromadnaOperaceTypes { result = "Gordic.Adx.Interface.GAdxResultHromadnaOperaceEnum", message = "string", data = "T",}
	const enum GAdxResultHromadnaOperaceTypeLengths {}
	/**Jednoduchý enum pro v´ýslewdek*/
	const enum GAdxResultHromadnaOperaceEnum {
		/**OK*/
		OK,
		/**Chyba*/
		Error,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\GAdxSubjectPermissions.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Kolekce práv pro použití uvnitř DTO objektů v rámci ISL - odpovídá internímu číselníku administrace: GDataAccessRightsEnum*/
	interface GAdxSubjectPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Právo na čtení*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Právo na editaci*/
		CanWrite: Gordic.General.ApplicationInterface.GPermission;
		/**Právo na založení*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Právo na smazání*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
		/**Zdůvodnění nastavení Read práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		ReadReason?: string|null;
		/**Zdůvodnění nastavení Write práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		WriteReason?: string|null;
		/**Zdůvodnění nastavení Create práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		CreateReason?: string|null;
		/**Zdůvodnění nastavení Delete práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		DeleteReason?: string|null;
	}
	const enum GAdxSubjectPermissionsNames { CanRead = "CanRead", CanWrite = "CanWrite", CanCreate = "CanCreate", CanDelete = "CanDelete", ReadReason = "ReadReason", WriteReason = "WriteReason", CreateReason = "CreateReason", DeleteReason = "DeleteReason",}
	const enum GAdxSubjectPermissionsFragments { CanRead = "*", CanWrite = "*", CanCreate = "*", CanDelete = "*", ReadReason = "*", WriteReason = "*", CreateReason = "*", DeleteReason = "*",}
	const enum GAdxSubjectPermissionsTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanWrite = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", ReadReason = "string", WriteReason = "string", CreateReason = "string", DeleteReason = "string",}
	const enum GAdxSubjectPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\IAdxSubjectPermissionsIslDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\IGAdeEkonomickaKonfigurace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Základní ekonomická konfigurace
	* @domain GinisAdmin
	* @businessObject AdeEkonomickaKonfigurace
	*/
	interface AdeEkonomickaKonfigurace {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeEkonomickaKonfigurace: ServiceBase & Catalog.AdeEkonomickaKonfigurace;
	}
	const AdeEkonomickaKonfigurace: Client["AdeEkonomickaKonfigurace"];
}
declare namespace Gordic.Adx.Interface {
	/**Ekonomická konfigurace pro roky*/
	interface GAdeEkonomickaKonfiguraceDto extends Gordic.Adx.Interface.GEkoscfuDto {
	}
	const enum GAdeEkonomickaKonfiguraceDtoNames { rok = "rok", cfu = "cfu", uroven_num = "uroven_num", uroven = "uroven", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", poradi = "poradi", pouziti = "pouziti", uroven_dos = "uroven_dos", prazdny = "prazdny", zobrazovany = "zobrazovany", predkontace = "predkontace", delka = "delka", delka_db = "delka_db", uroven_ginis = "uroven_ginis", atribut = "atribut", priz_lik = "priz_lik", zkratka_dist = "zkratka_dist", nazev_dist = "nazev_dist",}
	const enum GAdeEkonomickaKonfiguraceDtoFragments { rok = "*", cfu = "*", uroven_num = "*", uroven = "*", db_nazev = "*", nazev = "*", zkratka = "*", poradi = "*", pouziti = "*", uroven_dos = "*", prazdny = "*", zobrazovany = "*", predkontace = "*", delka = "*", delka_db = "*", uroven_ginis = "*", atribut = "*", priz_lik = "*", zkratka_dist = "*", nazev_dist = "*",}
	const enum GAdeEkonomickaKonfiguraceDtoTypes { rok = "number", cfu = "string", uroven_num = "number", uroven = "string", db_nazev = "string", nazev = "string", zkratka = "string", poradi = "number", pouziti = "number", uroven_dos = "string", prazdny = "string", zobrazovany = "string", predkontace = "string", delka = "number", delka_db = "number", uroven_ginis = "string", atribut = "string", priz_lik = "number", zkratka_dist = "string", nazev_dist = "string",}
	const enum GAdeEkonomickaKonfiguraceDtoTypeLengths { cfu = 1, uroven = 1, db_nazev = 3, nazev = 50, zkratka = 16, uroven_dos = 1, prazdny = 30, zobrazovany = 30, predkontace = 1, uroven_ginis = 2, atribut = 1, zkratka_dist = 16, nazev_dist = 50,}
	const enum GAdeEkomickaKonfiguraceFilterEnum {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\IGAdxExterniIdInput.d.ts 

declare namespace Gordic.Adx.Interface {
	interface GAdxExterniIdInput {
		/**Externí identifikátor objektu*/
		externi_identifikator?: string|null;
		/**GORDIC Identifikátor systému*/
		id_ext?: string|null;
	}
	const enum GAdxExterniIdInputNames { externi_identifikator = "externi_identifikator", id_ext = "id_ext",}
	const enum GAdxExterniIdInputFragments { externi_identifikator = "*", id_ext = "*",}
	const enum GAdxExterniIdInputTypes { externi_identifikator = "string", id_ext = "string",}
	const enum GAdxExterniIdInputTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\IGAdxObjektZmenaService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie změn objektů - ginhobj
	* @domain GinisAdmin
	* @businessObject AdxObjektZmena
	*/
	interface AdxObjektZmena {
		/**List změn pro jeden konkrétní objekt - filtrační poloožky sxs, typ_obj jsou pro toto volání povinné*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxObjektZmenaDto>>;
		/**Text zda je povoleno čtení historie*/
		isPovolCteniHistorie(rq?:CallParams<{}>): _Task<{},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxObjektZmena: ServiceBase & Catalog.AdxObjektZmena;
	}
	const AdxObjektZmena: Client["AdxObjektZmena"];
}
declare namespace Gordic.Adx.Interface {
	interface GAdxObjektZmenaDto {
		/**V - view, E - edit, N - new, P - připojení poznámky administrátora*/
		typ_akce?: string|null;
		por_cislo?: number|null;
		typ_ag?: number|null;
		/**Čas*/
		dat_zmena?: JsonDate|null;
		/**Realizoval*/
		nazev_rf?: string|null;
		ip_adr?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		nazev?: string|null;
		/**Důvod*/
		poznamka?: string|null;
		/**Typ akce*/
		typ_akce_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxObjektZmenaDtoNames { typ_akce = "typ_akce", por_cislo = "por_cislo", typ_ag = "typ_ag", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", ip_adr = "ip_adr", ixs_lpc = "ixs_lpc", nazev = "nazev", poznamka = "poznamka", typ_akce_txt = "typ_akce_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto",}
	const enum GAdxObjektZmenaDtoFragments { typ_akce = "*", por_cislo = "*", typ_ag = "*", dat_zmena = "*", nazev_rf = "*", ip_adr = "*", ixs_lpc = "*", nazev = "*", poznamka = "*", typ_akce_txt = "*", Permissions = "permissions", AdxInfoDto = "info",}
	const enum GAdxObjektZmenaDtoTypes { typ_akce = "string", por_cislo = "number", typ_ag = "number", dat_zmena = "JsonDate", nazev_rf = "string", ip_adr = "string", ixs_lpc = "string", nazev = "string", poznamka = "string", typ_akce_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto",}
	const enum GAdxObjektZmenaDtoTypeLengths { typ_akce = 1, nazev_rf = 200, ip_adr = 50, ixs_lpc = 12, nazev = 254, poznamka = 254, typ_akce_txt = 9,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxObjektZmenaFilterEnum {
		/**ID objektu*/
		sxs,
		/**ID typui objektu - odkaz na gincobj*/
		typ_obj,
		/**Datum změny od*/
		dat_od,
		/**Datum změny do*/
		dat_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Base\IGAdxVlastnostProSubjekt.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vlastnosti pro typ dokumentu - ginvovp, ginvovl
	* @domain GinisAdmin
	* @businessObject AdxVlastnostProSubjekt
	*/
	interface AdxVlastnostProSubjekt {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxVlastnostProSubjektDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxVlastnostProSubjektDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>>;
		/**Metoda pro ověření zda záznamy existují*/
		testExist(rq?:CallParams<{dtos:Gordic.Adx.Interface.GAdxVlastnostProSubjektDto[]}>): _Task<{dtos:Gordic.Adx.Interface.GAdxVlastnostProSubjektDto[]},Gordic.Adx.Interface.GAdxExistResultDto<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>[]>;
		/**Hromadné uložení dat*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Adx.Interface.GAdxVlastnostProSubjektDto[]}>): _Task<{data:Gordic.Adx.Interface.GAdxVlastnostProSubjektDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto>[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxVlastnostProSubjekt: ServiceBase & Catalog.AdxVlastnostProSubjekt;
	}
	const AdxVlastnostProSubjekt: Client["AdxVlastnostProSubjekt"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro ISL pro zadání požadavku na READ - obsahuje pouze PK hodnty - Vlastnosti pro typ dokumentu - ginvovp, ginvovl*/
	interface GAdxVlastnostProSubjektDto {
		/**Typ subjektu
		*      Interní ID typu subjektu, pro který je možné přidat profil/strukturu/vlastnost
		*/
		typ_obj?: number|null;
		/**Textová reprezentace typu subjektu*/
		typ_obj_txt?: string|null;
		/**ID vlastnosti/struktury/profilu
		*      ID vlastnosti, struktury nebo profilu, které má být umožněno navázat na zadaný typ objektu GINIS
		*/
		ixs?: string|null;
		/**Textová reprezentace ID vlastnosti/struktury/profilu*/
		ixs_txt?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Typ vlastnosti (txt)*/
		typ_vps_txt?: string|null;
		/**Typ přirazení (txt)*/
		typ_prirazeni_txt?: string|null;
		/**Typ přirazení (10 - přiřazeno všem, 20 - pouze konkrétně)*/
		typ_prirazeni?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Pořadí*/
		poradi?: number|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Změnil (txt)*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxVlastnostProSubjektDtoNames { typ_obj = "typ_obj", typ_obj_txt = "typ_obj_txt", ixs = "ixs", ixs_txt = "ixs_txt", ico = "ico", typ_vps = "typ_vps", typ_vps_txt = "typ_vps_txt", typ_prirazeni_txt = "typ_prirazeni_txt", typ_prirazeni = "typ_prirazeni", aktivita = "aktivita", dat_zmena = "dat_zmena", poradi = "poradi", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto",}
	const enum GAdxVlastnostProSubjektDtoFragments { typ_obj = "*", typ_obj_txt = "*", ixs = "*", ixs_txt = "*", ico = "*", typ_vps = "*", typ_vps_txt = "*", typ_prirazeni_txt = "*", typ_prirazeni = "*", aktivita = "*", dat_zmena = "*", poradi = "*", zmenu_prov = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info",}
	const enum GAdxVlastnostProSubjektDtoTypes { typ_obj = "number", typ_obj_txt = "string", ixs = "string", ixs_txt = "string", ico = "string", typ_vps = "number", typ_vps_txt = "string", typ_prirazeni_txt = "string", typ_prirazeni = "number", aktivita = "number", dat_zmena = "JsonDate", poradi = "number", zmenu_prov = "string", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto",}
	const enum GAdxVlastnostProSubjektDtoTypeLengths { ixs = 12, ico = 10, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxVlastnostProSubjektFilterEnum {
		/**Typ objektu*/
		typ_obj,
		/**IXS*/
		ixs,
		/**Ičo*/
		ico,
		/**Aktivita*/
		aktivita,
		/**Typ prirazeni*/
		typ_prirazeni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GAdxExportInfoDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Přidané informace pro export obejtků z ADX*/
	interface GAdxExportInfoDto {
		/**Licence*/
		lic?: string|null;
		/**Identifikátor funkce*/
		ixs_fun?: string|null;
		/**Identifikátor osoby*/
		ixs_ref?: string|null;
		/**Textová reprezentace funkce*/
		ixs_fun_txt?: string|null;
		/**Textová reprezentace osoby*/
		ixs_ref_txt?: string|null;
		/**Revize*/
		revize?: string|null;
	}
	const enum GAdxExportInfoDtoNames { lic = "lic", ixs_fun = "ixs_fun", ixs_ref = "ixs_ref", ixs_fun_txt = "ixs_fun_txt", ixs_ref_txt = "ixs_ref_txt", revize = "revize",}
	const enum GAdxExportInfoDtoFragments { lic = "*", ixs_fun = "*", ixs_ref = "*", ixs_fun_txt = "*", ixs_ref_txt = "*", revize = "*",}
	const enum GAdxExportInfoDtoTypes { lic = "string", ixs_fun = "string", ixs_ref = "string", ixs_fun_txt = "string", ixs_ref_txt = "string", revize = "string",}
	const enum GAdxExportInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GAdxFieldMetaData.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Metadata pro popis jednoho políčka pro potřeby typesciptu*/
	interface GAdxFieldMetaData {
		/**Příznak, že položka je součástí primárního klíče*/
		field_is_pk?: boolean|null;
		/**Redukovaný datový typ položky - typ určený pro JavaScript*/
		field_base_type?: Gordic.General.GFieldBaseTypeEnum|null;
		/**Max. velikost položky ( asi pouze u string položek )*/
		field_size?: number|null;
		/**Max. velikost obsažené hodnty datové položky - určeno pro seznamy ( obsahuje největší délku dat v rámci celého seznamu )*/
		field_max_data_size?: number|null;
		/**Programátorské označení položky ( ID ) položky*/
		field_name?: string|null;
		/**Programátorské označení zdrojové položky k této položce ( ID )  
		*     Např. u vypočítávaných sloupců je zde odkaz na zdrojový sloupec (pokud je jeden).
		*     U textových sloupců číselníku je zde odkaz na sloupec s číselníkovou hodnotou 
		*     ( např. field_name = "aktivita_txt" => field_name_source = "aktivita"
		*     Standardně bude NULL
		*/
		field_name_source?: string|null;
		/**Popisek políčka*/
		field_caption?: string|null;
		/**Zkrácený popisek políčka - může být null a potom to znamená, že není uveden zkrácený tvar popisu*/
		field_short_caption?: string|null;
		/**Text tooltipu pro políčko*/
		field_tooltip?: string|null;
		/**Příznak, že položka může být zobrazována uživatelům ( opakem je pomocná, technická položka ) - položka se ale z množiny přenášených dat neodstraňuje.*/
		field_visible?: boolean|null;
		/**příznak, že položka nesmí být měněna (editována)*/
		field_readonly?: boolean|null;
		/**Příznak, že pole je pro vyplnění povinné*/
		field_mandatory?: boolean|null;
	}
	const enum GAdxFieldMetaDataNames { field_is_pk = "field_is_pk", field_base_type = "field_base_type", field_size = "field_size", field_max_data_size = "field_max_data_size", field_name = "field_name", field_name_source = "field_name_source", field_caption = "field_caption", field_short_caption = "field_short_caption", field_tooltip = "field_tooltip", field_visible = "field_visible", field_readonly = "field_readonly", field_mandatory = "field_mandatory",}
	const enum GAdxFieldMetaDataFragments { field_is_pk = "*", field_base_type = "*", field_size = "*", field_max_data_size = "*", field_name = "*", field_name_source = "*", field_caption = "*", field_short_caption = "*", field_tooltip = "*", field_visible = "*", field_readonly = "*", field_mandatory = "*",}
	const enum GAdxFieldMetaDataTypes { field_is_pk = "boolean", field_base_type = "Gordic.General.GFieldBaseTypeEnum", field_size = "number", field_max_data_size = "number", field_name = "string", field_name_source = "string", field_caption = "string", field_short_caption = "string", field_tooltip = "string", field_visible = "boolean", field_readonly = "boolean", field_mandatory = "boolean",}
	const enum GAdxFieldMetaDataTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GAdxPasswordDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Objekt reprezentující heslo*/
	interface GAdxPasswordDto {
		/**Příznak, zda aktualizovat heslo*/
		update_password?: boolean|null;
		/**Způsob uložení hesla*/
		zpusob_ulozeni?: Gordic.Adx.Interface.GAdxZpusobUlozeniEnum|null;
		/**Mapovací řetězec (pouze v případě nepřímého mapování)*/
		password_map?: string|null;
		/**Heslo (pouye v případě databáze) - zašifrováno*/
		password?: string|null;
	}
	const enum GAdxPasswordDtoNames { update_password = "update_password", zpusob_ulozeni = "zpusob_ulozeni", password_map = "password_map", password = "password",}
	const enum GAdxPasswordDtoFragments { update_password = "*", zpusob_ulozeni = "*", password_map = "*", password = "*",}
	const enum GAdxPasswordDtoTypes { update_password = "boolean", zpusob_ulozeni = "Gordic.Adx.Interface.GAdxZpusobUlozeniEnum", password_map = "string", password = "string",}
	const enum GAdxPasswordDtoTypeLengths {}
	const enum GAdxZpusobUlozeniEnum {
		/**Databáze*/
		databaze=0,
		/**Přímé mapování*/
		prime_mapovani=10,
		/**Neprímé mapování*/
		neprime_mapovani=20,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GAdxResultKopieVazbyDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Výsledek kopie vazby*/
	interface GAdxResultKopieVazbyDto {
		/**Výsledek kopie vazby (0 = chyba, 1 = OK)*/
		result?: number|null;
		/**TXT výsledku kopie vazby*/
		result_txt?: string|null;
		/**Typ objektu*/
		typ_objektu?: string|null;
		/**Objekt TXT*/
		objekt_txt?: string|null;
	}
	const enum GAdxResultKopieVazbyDtoNames { result = "result", result_txt = "result_txt", typ_objektu = "typ_objektu", objekt_txt = "objekt_txt",}
	const enum GAdxResultKopieVazbyDtoFragments { result = "*", result_txt = "*", typ_objektu = "*", objekt_txt = "*",}
	const enum GAdxResultKopieVazbyDtoTypes { result = "number", result_txt = "string", typ_objektu = "string", objekt_txt = "string",}
	const enum GAdxResultKopieVazbyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GCountData.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Počet dat*/
	interface GAdxCountData {
		/**Počet záznamů při získání selectu*/
		count?: number|null;
	}
	const enum GAdxCountDataNames { count = "count",}
	const enum GAdxCountDataFragments { count = "*",}
	const enum GAdxCountDataTypes { count = "number",}
	const enum GAdxCountDataTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GEkoKnihaDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Obecná EKO kniha*/
	interface GEkoKnihaDto {
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Ičo*/
		ico?: string|null;
		/**Název knihy*/
		nazev?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Agenda*/
		agenda?: string|null;
		/**Textová reprezentace stavu*/
		stav_txt?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
	}
	const enum GEkoKnihaDtoNames { ixp_den = "ixp_den", ico = "ico", nazev = "nazev", rok = "rok", aktivita = "aktivita", agenda = "agenda", stav_txt = "stav_txt", ucs = "ucs",}
	const enum GEkoKnihaDtoFragments { ixp_den = "*", ico = "*", nazev = "*", rok = "*", aktivita = "*", agenda = "*", stav_txt = "*", ucs = "*",}
	const enum GEkoKnihaDtoTypes { ixp_den = "string", ico = "string", nazev = "string", rok = "number", aktivita = "number", agenda = "string", stav_txt = "string", ucs = "string",}
	const enum GEkoKnihaDtoTypeLengths {}
	/**Informace o tabulce*/
	interface GEkoKnihaTableInfoDto {
		/**Identifikátor*/
		ix?: string|null;
		/**Submodel*/
		submodel?: string|null;
		/**Název tabulky*/
		tablename?: string|null;
		/**Agenda*/
		agenda?: string|null;
	}
	const enum GEkoKnihaTableInfoDtoNames { ix = "ix", submodel = "submodel", tablename = "tablename", agenda = "agenda",}
	const enum GEkoKnihaTableInfoDtoFragments { ix = "*", submodel = "*", tablename = "*", agenda = "*",}
	const enum GEkoKnihaTableInfoDtoTypes { ix = "string", submodel = "string", tablename = "string", agenda = "string",}
	const enum GEkoKnihaTableInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GEkoscfuDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ekoscfu
	*      Nastavení elementu účetní věty
	*/
	interface GEkoscfuDto {
		/**Rok deníku*/
		rok?: number|null;
		cfu?: string|null;
		/**pořadové číslo elementu*/
		uroven_num?: number|null;
		/**pořadové číslo elementu*/
		uroven?: string|null;
		/**název db. sloupců elementu*/
		db_nazev?: string|null;
		/**plný název elementu*/
		nazev?: string|null;
		/**zkrácený název elementu*/
		zkratka?: string|null;
		/**pořadí elementu při zobrazování*/
		poradi?: number|null;
		/**element je/není použit*/
		pouziti?: number|null;
		/**odpovídající úroveň DOSu*/
		uroven_dos?: string|null;
		/**co plnit při prázdném elementu*/
		prazdny?: string|null;
		zobrazovany?: string|null;
		/**symbol pro předkontace*/
		predkontace?: string|null;
		/**počet znaků elementu*/
		delka?: number|null;
		delka_db?: number|null;
		uroven_ginis?: string|null;
		atribut?: string|null;
		priz_lik?: number|null;
		zkratka_dist?: string|null;
		nazev_dist?: string|null;
	}
	const enum GEkoscfuDtoNames { rok = "rok", cfu = "cfu", uroven_num = "uroven_num", uroven = "uroven", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", poradi = "poradi", pouziti = "pouziti", uroven_dos = "uroven_dos", prazdny = "prazdny", zobrazovany = "zobrazovany", predkontace = "predkontace", delka = "delka", delka_db = "delka_db", uroven_ginis = "uroven_ginis", atribut = "atribut", priz_lik = "priz_lik", zkratka_dist = "zkratka_dist", nazev_dist = "nazev_dist",}
	const enum GEkoscfuDtoFragments { rok = "*", cfu = "*", uroven_num = "*", uroven = "*", db_nazev = "*", nazev = "*", zkratka = "*", poradi = "*", pouziti = "*", uroven_dos = "*", prazdny = "*", zobrazovany = "*", predkontace = "*", delka = "*", delka_db = "*", uroven_ginis = "*", atribut = "*", priz_lik = "*", zkratka_dist = "*", nazev_dist = "*",}
	const enum GEkoscfuDtoTypes { rok = "number", cfu = "string", uroven_num = "number", uroven = "string", db_nazev = "string", nazev = "string", zkratka = "string", poradi = "number", pouziti = "number", uroven_dos = "string", prazdny = "string", zobrazovany = "string", predkontace = "string", delka = "number", delka_db = "number", uroven_ginis = "string", atribut = "string", priz_lik = "number", zkratka_dist = "string", nazev_dist = "string",}
	const enum GEkoscfuDtoTypeLengths { cfu = 1, uroven = 1, db_nazev = 3, nazev = 50, zkratka = 16, uroven_dos = 1, prazdny = 30, zobrazovany = 30, predkontace = 1, uroven_ginis = 2, atribut = 1, zkratka_dist = 16, nazev_dist = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GExterniIdentifikaceDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Dto reprezentující externi identifikaci*/
	interface GExterniIdentifikaceDto {
		/**Externí systém*/
		ixs_ext?: string|null;
		/**Textová reprezentace externího systému*/
		ixs_ext_txt?: string|null;
		/**Segment INTu*/
		id_seg?: string|null;
		/**Externí ID objektu
		*      Externí systém přiřadí objektu se kterým v rámci rozhraní GINIS pracuje svou unikátní identifikaci. Systém GINIS ji při prvním zachyceném výskytu zaregistruje do převodní tabulky a následně již objekt externím systémem takto identifikovaný dokáže přiřadit k vnitřní identifikaci systému GINIS
		*/
		id_ext?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Textová reprezentace aktivity*/
		aktivita_txt?: string|null;
	}
	const enum GExterniIdentifikaceDtoNames { ixs_ext = "ixs_ext", ixs_ext_txt = "ixs_ext_txt", id_seg = "id_seg", id_ext = "id_ext", aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GExterniIdentifikaceDtoFragments { ixs_ext = "*", ixs_ext_txt = "*", id_seg = "*", id_ext = "*", aktivita = "*", aktivita_txt = "*",}
	const enum GExterniIdentifikaceDtoTypes { ixs_ext = "string", ixs_ext_txt = "string", id_seg = "string", id_ext = "string", aktivita = "number", aktivita_txt = "string",}
	const enum GExterniIdentifikaceDtoTypeLengths { ixs_ext = 12, id_seg = 12, id_ext = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GGinsicoDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginsico
	*      Interní IČO
	*/
	interface GGinsicoDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Název subjektu*/
		nazev?: string|null;
		/**Interní subjekt
		*      Interní ID subjektu, který je hlavním sídlem interního subjektu
		*/
		ixs_isu?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinsicoDtoNames { ico = "ico", nazev = "nazev", ixs_isu = "ixs_isu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsicoDtoFragments { ico = "*", nazev = "*", ixs_isu = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsicoDtoTypes { ico = "string", nazev = "string", ixs_isu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsicoDtoTypeLengths { ico = 10, nazev = 100, ixs_isu = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GWfldblkDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:wfldblk
	*      Obsah poznámkového bloku ADM
	*/
	interface GWfldblkDto {
		/**Poznámkový blok*/
		ixs_blk?: string|null;
		/**Typ subjektu*/
		typ_subj?: number|null;
		/**Sxs subjektu*/
		sxs_subj?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GWfldblkDtoNames { ixs_blk = "ixs_blk", typ_subj = "typ_subj", sxs_subj = "sxs_subj", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", aktivita = "aktivita",}
	const enum GWfldblkDtoFragments { ixs_blk = "*", typ_subj = "*", sxs_subj = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", aktivita = "*",}
	const enum GWfldblkDtoTypes { ixs_blk = "string", typ_subj = "number", sxs_subj = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", aktivita = "number",}
	const enum GWfldblkDtoTypeLengths { ixs_blk = 12, sxs_subj = 200, poznamka = 50, zmenu_prov = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GWflsblkDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:wflsblk
	*      Výběrová skupina ADM
	*/
	interface GWflsblkDto {
		/**Poznámkový blok
		*      ID poznámkového bloku
		*/
		ixs_blk?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Vlastník*/
		ixs_fun?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ bloku
		*      Jednotypová / vícetypová / šablona parametrů
		*/
		typ?: number|null;
		/**Typ subjektů
		*      Typ subjektů, které se do jednotypové supiny mohou zapisovat.
		*/
		typ_subj?: number|null;
	}
	const enum GWflsblkDtoNames { ixs_blk = "ixs_blk", lic = "lic", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ = "typ", typ_subj = "typ_subj",}
	const enum GWflsblkDtoFragments { ixs_blk = "*", lic = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_od = "*", dat_do = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*", typ = "*", typ_subj = "*",}
	const enum GWflsblkDtoTypes { ixs_blk = "string", lic = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ = "number", typ_subj = "number",}
	const enum GWflsblkDtoTypeLengths { ixs_blk = 12, lic = 4, nazev = 50, poznamka = 50, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GXxxrdac.d.ts 

declare namespace Gordic.Adx.Interface {
	interface GXxxrdac {
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Číslo subřady
		*      Číslo subřady knihy
		*/
		subrada?: number|null;
		/**Zkratka
		*      Zkratka
		*/
		zkratka?: string|null;
		/**Název subřady
		*      Název subřady
		*/
		nazev?: string|null;
		/**Aktivita subřady
		*      Aktivita subřady
		*/
		akt_subrady?: number|null;
		/**Konec subřady
		*      Konec subřady
		*/
		ac_cislo_do?: number|null;
		/**Začátek subřady
		*      Začátek subřady
		*/
		ac_cislo_od?: number|null;
		/**Poslední použité číslo
		*      Poslední použité číslo
		*/
		ac_cislo_max?: number|null;
		/**Měsíc subřady
		*      Měsíc subřady
		*/
		mesic?: number|null;
		/**Datum a čas poslední změny tohoto záznamu
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel
		*/
		ixs_su?: string|null;
	}
	const enum GXxxrdacNames { ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su",}
	const enum GXxxrdacFragments { ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*",}
	const enum GXxxrdacTypes { ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string",}
	const enum GXxxrdacTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GXxxsden.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Obecný předek pro deníky - slouží pro generické předky*/
	interface GXxxsden {
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Licence
		*      Mělo by jít o licenci shodnou s licencí v ixp_den
		*/
		lic?: string|null;
		/**Aktivita
		*      Aktivita záznamu dle gincakt
		*/
		aktivita?: number|null;
		/**Nyní již nepoužívaný údaj, za který není náhrada
		*      Jméno identifikátoru znamená Atribut Read/Write
		*/
		arw?: number|null;
		/**Poznámka
		*      Poznámku zadává administrátor a jemu také slouží. Ostatním uživatelům se nezobrazuje.
		*/
		poznamka?: string|null;
		/**Počátek platnosti knihy
		*      Omezení zadává administrátor a jemu také slouží pro orientaci. Ostatním uživatelům
		*/
		dat_od?: JsonDate|null;
		/**Konec platnosti knihy
		*      Omezení zadává administrátor a jemu také slouží pro orientaci. Ostatním uživatelům
		*/
		dat_do?: JsonDate|null;
		/**IČO
		*      IČO určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy k účetní jednotce
		*/
		ico?: string|null;
		/**Účetní středisko
		*      Účetní středisko určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy k účetnímu středisku
		*/
		ucs?: string|null;
		/**Název knihy
		*      Název zadává administrátor (napřiklad: "Kniha monitoru zakázek roku XXXX")
		*/
		nazev?: string|null;
		/**Rok deníku
		*      Rok určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy pro účetní období
		*/
		rok?: number|null;
		/**Typ číselné řady
		*      Typ knihy se v praxi nepoužívá. Výjimkou je účetní deník v tabulce
		*/
		typ_den?: number|null;
		/**Kategorie knihy
		*      Kategorie knihy ovlivňuje agendově závislé algoritmy. To znamená, že někde může být kód říkající:
		*/
		ktg_den?: number|null;
		/**Změněno
		*      Datum a čas poslední změny tohoto záznamu
		*/
		dat_zmena?: JsonDate|null;
		/**Změnil
		*      Autor poslední změny záznamu dle ginszmp
		*/
		zmenu_prov?: string|null;
		/**Maximální pořadové číslo dokladu v knize
		*      Tento údaj administrátor nezadává. Při založení knihy se nastaví na nulu.
		*/
		por_cislo_max?: number|null;
		/**Maximální pořadové číslo subřady v knize
		*      Tento údaj administrátor nezadává. Při založení knihy se nastaví na nulu.
		*/
		subrada_max?: number|null;
		/**Délka evidenčního čísla dokladu bez prefixu a suffixu
		*      Evidenční číslo s prefixem a suffixem může být maximálně 20 znaků dlouhé
		*/
		len_ac?: number|null;
		/**Krok uzávěrky
		*      Stavová informace (uzávěrka knih je roční)
		*/
		krok_uza?: number|null;
		/**Kniha použitá jako vzor při generování této knihy
		*      Kniha použitá jako vzor při generování této knihy
		*/
		ixp_den_old?: string|null;
		/**Účtárna účetního střediska
		*      Účtárna účetního střediska určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy k účtárně
		*/
		uus?: string|null;
		/**Prefix evidenčního čísla dokladu
		*      Prefix evidenčního čísla dokladu
		*/
		prefix?: string|null;
		/**Suffix evidenčního čísla dokladu
		*      Suffix evidenčního čísla dokladu
		*/
		suffix?: string|null;
	}
	const enum GXxxsdenNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GXxxsdenFragments { ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GXxxsdenTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GXxxsdenTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\GXxxvrfu.d.ts 

declare namespace Gordic.Adx.Interface {
	interface GXxxvrfu {
		/**Funkční místo
		*      Interní identifikace funkčního místa
		*/
		ixs_fun?: string|null;
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Číslo subřady
		*      Číslo subřady deníku
		*/
		subrada?: number|null;
		/**Aktivita záznamu dle gincakt
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu
		*      Datum počátku platnosti záznamu
		*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu
		*      Datum konce platnosti záznamu
		*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp
		*      Změnil
		*/
		zmenu_prov?: string|null;
	}
	const enum GXxxvrfuNames { ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GXxxvrfuFragments { ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GXxxvrfuTypes { ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GXxxvrfuTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\LicenceDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**LicenceDto*/
	interface LicenceDto {
		/**Faze*/
		faze?: string|null;
	}
	const enum LicenceDtoNames { faze = "faze",}
	const enum LicenceDtoFragments { faze = "*",}
	const enum LicenceDtoTypes { faze = "string",}
	/**Filter pro licence*/
	const enum GFilterLicence {
		/**faze*/
		faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGincmisDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:gincmis
	*      Druh místnosti
	*/
	interface GGincmisDto {
		/**Druh místnosti
		*      Druh místnosti
		*/
		mistnost_druh?: number|null;
		/**Druh místnosti
		*      Druh místnosti
		*/
		mistnost_druh_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		mistnost_druh_rsx?: number|null;
	}
	const enum GGincmisDtoNames { mistnost_druh = "mistnost_druh", mistnost_druh_txt = "mistnost_druh_txt", k_v = "k_v", k_s = "k_s", mistnost_druh_rsx = "mistnost_druh_rsx",}
	const enum GGincmisDtoFragments { mistnost_druh = "*", mistnost_druh_txt = "*", k_v = "*", k_s = "*", mistnost_druh_rsx = "*",}
	const enum GGincmisDtoTypes { mistnost_druh = "number", mistnost_druh_txt = "string", k_v = "number", k_s = "string", mistnost_druh_rsx = "number",}
	const enum GGincmisDtoTypeLengths { mistnost_druh_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGincorjDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:gincorj*/
	interface GGincorjDto {
		/**DBCOLUMN:gincorj.uroven_orj*/
		uroven_orj?: number|null;
		/**DBCOLUMN:gincorj.uroven_orj_txt*/
		uroven_orj_txt?: string|null;
		/**DBCOLUMN:gincorj.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincorj.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincorj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincorj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincorj.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGincorjDtoNames { uroven_orj = "uroven_orj", uroven_orj_txt = "uroven_orj_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGincorjDtoFragments { uroven_orj = "*", uroven_orj_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGincorjDtoTypes { uroven_orj = "number", uroven_orj_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGincorjDtoTypeLengths { uroven_orj_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGincsbuDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:gincsbu
	*      Druh segmentu budovy
	*/
	interface GGincsbuDto {
		/**Druh segmentu budovy
		*      Druh segmentu budovy
		*/
		segment_druh?: number|null;
		/**Druh segmentu budovy
		*      Druh segmentu budovy
		*/
		segment_druh_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		segment_druh_rsx?: number|null;
	}
	const enum GGincsbuDtoNames { segment_druh = "segment_druh", segment_druh_txt = "segment_druh_txt", k_v = "k_v", k_s = "k_s", segment_druh_rsx = "segment_druh_rsx",}
	const enum GGincsbuDtoFragments { segment_druh = "*", segment_druh_txt = "*", k_v = "*", k_s = "*", segment_druh_rsx = "*",}
	const enum GGincsbuDtoTypes { segment_druh = "number", segment_druh_txt = "string", k_v = "number", k_s = "string", segment_druh_rsx = "number",}
	const enum GGincsbuDtoTypeLengths { segment_druh_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinqbudDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginqbud
	*      Přístupový klíč na budovy
	*/
	interface GGinqbudDto {
		acckey?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinqbudDtoNames { acckey = "acckey", ico = "ico", budova_kod = "budova_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinqbudDtoFragments { acckey = "*", ico = "*", budova_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinqbudDtoTypes { acckey = "string", ico = "string", budova_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinqbudDtoTypeLengths { acckey = 12, ico = 10, budova_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinqmisDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginqmis
	*      Přístupový klíč na místnosti
	*/
	interface GGinqmisDto {
		acckey?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Místnost*/
		mistnost_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinqmisDtoNames { acckey = "acckey", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinqmisDtoFragments { acckey = "*", ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinqmisDtoTypes { acckey = "string", ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinqmisDtoTypeLengths { acckey = 12, ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinqsbuDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginqsbu
	*      Přístupový klíč na segmenty budov
	*/
	interface GGinqsbuDto {
		acckey?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinqsbuDtoNames { acckey = "acckey", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinqsbuDtoFragments { acckey = "*", ico = "*", budova_kod = "*", segment_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinqsbuDtoTypes { acckey = "string", ico = "string", budova_kod = "string", segment_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinqsbuDtoTypeLengths { acckey = 12, ico = 10, budova_kod = 8, segment_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinsbudDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginsbud
	*      Budova
	*/
	interface GGinsbudDto {
		/**IČO*/
		ico?: string|null;
		/**Kód budovy
		*      Kód budovy
		*/
		budova_kod?: string|null;
		/**Název budovy
		*      Název budovy
		*/
		budova_naz?: string|null;
		/**Platnost OD
		*      Platnost OD
		*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Uživatel
		*      Interní subjekt - uživatel objektu
		*/
		ixs_esu_uziv?: string|null;
		/**Správce budovy
		*      Interní subjekt - Správce objektu
		*/
		ixs_esu_spr?: string|null;
		/**Druh budovy
		*      Druh budovy
		*/
		budova_druh?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Čárový kód
		*      Čárový kód
		*/
		id_kod?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Elementární objekt*/
		ixs_elo?: string|null;
		inv_cis?: string|null;
	}
	const enum GGinsbudDtoNames { ico = "ico", budova_kod = "budova_kod", budova_naz = "budova_naz", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", budova_druh = "budova_druh", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo", inv_cis = "inv_cis",}
	const enum GGinsbudDtoFragments { ico = "*", budova_kod = "*", budova_naz = "*", dat_od = "*", dat_do = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", budova_druh = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_lpc = "*", ixs_elo = "*", inv_cis = "*",}
	const enum GGinsbudDtoTypes { ico = "string", budova_kod = "string", budova_naz = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", budova_druh = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_lpc = "string", ixs_elo = "string", inv_cis = "string",}
	const enum GGinsbudDtoTypeLengths { ico = 10, budova_kod = 8, budova_naz = 50, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_lpc = 12, ixs_elo = 12, inv_cis = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinskeyDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginskey
	*      Slovník přístupových klíčů
	*/
	interface GGinskeyDto {
		acckey?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinskeyDtoNames { acckey = "acckey", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinskeyDtoFragments { acckey = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinskeyDtoTypes { acckey = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinskeyDtoTypeLengths { acckey = 12, nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinskovDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginskov
	*      Způsob využití
	*/
	interface GGinskovDto {
		/**Způsob využití
		*      Způsob využití
		*/
		kod_vyu?: number|null;
		/**Způsob využití
		*      Způsob využití
		*/
		kod_vyu_txt?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		kod_vyu_rsx?: number|null;
	}
	const enum GGinskovDtoNames { kod_vyu = "kod_vyu", kod_vyu_txt = "kod_vyu_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", kod_vyu_rsx = "kod_vyu_rsx",}
	const enum GGinskovDtoFragments { kod_vyu = "*", kod_vyu_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", kod_vyu_rsx = "*",}
	const enum GGinskovDtoTypes { kod_vyu = "number", kod_vyu_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", kod_vyu_rsx = "number",}
	const enum GGinskovDtoTypeLengths { kod_vyu_txt = 50, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinsmisDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginsmis
	*      Místnost
	*/
	interface GGinsmisDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**umístění židle, kód místnosti*/
		mistnost_kod?: string|null;
		/**název/popis místnosti*/
		mistnost_naz?: string|null;
		/**Patro*/
		patro?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Uživatel*/
		ixs_esu_uziv?: string|null;
		/**Správce budovy*/
		ixs_esu_spr?: string|null;
		/**Plocha*/
		plocha?: JsonDecimal|null;
		/**Druh místnosti*/
		mistnost_druh?: number|null;
		/**Způsob využití*/
		kod_vyu?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Čárový kód*/
		id_kod?: string|null;
		/**Zodpovědná osoba
		*      Zodpovědná osoba
		*/
		ixs_ref?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Elementární objekt*/
		ixs_elo?: string|null;
	}
	const enum GGinsmisDtoNames { ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", mistnost_naz = "mistnost_naz", patro = "patro", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", plocha = "plocha", mistnost_druh = "mistnost_druh", kod_vyu = "kod_vyu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_ref = "ixs_ref", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo",}
	const enum GGinsmisDtoFragments { ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", mistnost_naz = "*", patro = "*", dat_od = "*", dat_do = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", plocha = "*", mistnost_druh = "*", kod_vyu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_ref = "*", ixs_lpc = "*", ixs_elo = "*",}
	const enum GGinsmisDtoTypes { ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", mistnost_naz = "string", patro = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", plocha = "JsonDecimal", mistnost_druh = "number", kod_vyu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_ref = "string", ixs_lpc = "string", ixs_elo = "string",}
	const enum GGinsmisDtoTypeLengths { ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, mistnost_naz = 50, patro = 10, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_ref = 12, ixs_lpc = 12, ixs_elo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinsorjDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginsorj
	*      Organizační jednotka
	*/
	interface GGinsorjDto {
		/**Organizační jednotka
		*      interní ID organizační jednotky ve formě IXS založenéné na GINRORJ kde IX = SJ
		*/
		ixs_orj?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		arw?: number|null;
		/**Poznámka
		*      Poznámka
		*/
		poznamka?: string|null;
		/**Platnost OD
		*      Platnost OD
		*/
		dat_od?: JsonDate|null;
		/**Platnost DO
		*      Platnost DO
		*/
		dat_do?: JsonDate|null;
		/**Změněno
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Změnil
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název orj.*/
		nazev?: string|null;
		/**Úroveň orj.*/
		uroven_orj?: number|null;
		/**ID nadřízeného*/
		ixs_nad?: string|null;
		/**Kód organizační jednotky*/
		kod_orj?: string|null;
		/**organizace*/
		ixs_isu?: string|null;
		/**Identifikátor funkce*/
		ixs_fun?: string|null;
		/**Oficiální název*/
		ofic_nazev?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Počet podřízených
		*      Počet podřízených záznamů - ve stromě nadřízeností
		*/
		num_pod?: number|null;
		/**Mail*/
		mail?: string|null;
		/**Z interface*/
		z_int?: number|null;
		/**Čas zápisu*/
		dat_mpd?: JsonDate|null;
		/**Telefon*/
		tel?: string|null;
		/**Fax*/
		fax?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Čas synchronizace*/
		dat_sync?: JsonDate|null;
	}
	const enum GGinsorjDtoNames { ixs_orj = "ixs_orj", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", uroven_orj = "uroven_orj", ixs_nad = "ixs_nad", kod_orj = "kod_orj", ixs_isu = "ixs_isu", ixs_fun = "ixs_fun", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", z_int = "z_int", dat_mpd = "dat_mpd", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", dat_sync = "dat_sync",}
	const enum GGinsorjDtoFragments { ixs_orj = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", uroven_orj = "*", ixs_nad = "*", kod_orj = "*", ixs_isu = "*", ixs_fun = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", z_int = "*", dat_mpd = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", dat_sync = "*",}
	const enum GGinsorjDtoTypes { ixs_orj = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", uroven_orj = "number", ixs_nad = "string", kod_orj = "string", ixs_isu = "string", ixs_fun = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", z_int = "number", dat_mpd = "JsonDate", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", dat_sync = "JsonDate",}
	const enum GGinsorjDtoTypeLengths { ixs_orj = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 100, ixs_nad = 12, kod_orj = 30, ixs_isu = 12, ixs_fun = 12, ofic_nazev = 254, cs_nazev = 100, mail = 254, tel = 33, fax = 33, ixs_lpc = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinsrefDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginsref
	*      Osoba
	*/
	interface GGinsrefDto {
		/**Osoba
		*       Interní identifikátor osoby
		*/
		ixs_ref?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nepoužívá se*/
		arw?: number|null;
		/**Poznámka
		*      Poznámka administrátora systému k osobě
		*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel ke kterémů osoba přísluší - tato vazba určuje také příslušnost k IČO
		*/
		ixs_su?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název
		*      Složený text jména a příjmení + titul
		*/
		nazev?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Titul před*/
		tit_pred?: string|null;
		/**Titul za*/
		tit_za?: string|null;
		/**Osobní číslo*/
		oc?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Zatím nepoužito*/
		pritomnost?: number|null;
		/**Primární login
		*      Primární login uživatele určený pro přihlášení do szstému GINIS. Slouží pro dohledání uživatele podle loginu, pro kontroly případných duplicit loginů atd..
		*/
		login_name?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**Mail*/
		mail?: string|null;
		/**Identifikátor externího subjektu zaměstnance
		*      Využívá pouze personalistika
		*/
		ixs_esu?: string|null;
		/**Z interface*/
		z_int?: number|null;
		/**Typ primárního účtu*/
		typ_aut?: number|null;
		/**Délka expirace hesla
		*      Počet dní, po kterých má exspirovat primární heslo uživatele GINIS.
		*/
		poc_dni_exp?: number|null;
		/**Expirace hesla
		*      Čas příští exspirace hesla primárního přihlašovacího účtu.
		*/
		dat_exp?: JsonDate|null;
		/**Externí uživatel
		*      Příznak, že uživatel má oprávnění pracovat přes externí rozhraní - tedy prostřednictvím webových služeb XRG
		*/
		priz_ext?: number|null;
		/**Interní uživatel
		*      Příznak, že uživatel má oprávnění pracovat přes interní aplikace systému GINIS
		*/
		priz_int?: number|null;
		priz_f?: number|null;
		/**Externí login
		*      Login uživatele určený pro přihlášení externích systémů prostřednictvím webových služeb XRG.
		*/
		login_name_ext?: string|null;
		/**Login
		*      Forma loginu, která se proti DB stroji použije pro grantování. Je CASE SENSITIVE.
		*/
		login_name_grant?: string|null;
		/**Sekundární login
		*      Alternativní login uživatele určený pro přihlášení do szstému GINIS. Slouží pro dohledání uživatele podle loginu, pro kontroly případných duplicit loginů atd..
		*/
		login_name2?: string|null;
		/**Alternativní login
		*      Forma alternativního loginu, která se proti DB stroji použije pro grantování. Je CASE SENSITIVE.
		*/
		login_name_grant2?: string|null;
		/**Typ alternativního účtu*/
		typ_aut2?: number|null;
		/**Datum exspirace alt.účtu
		*      Pokud je NULL, potom účet nebude exspirovat
		*/
		dat_exp2?: JsonDate|null;
		priz_msmsesu?: number|null;
		ixs_esu_pam?: string|null;
		/**Telefon*/
		tel?: string|null;
		/**Soukromý telefon*/
		tel_privat?: string|null;
		/**Mobil*/
		tel_mobil?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Rodné příjmení*/
		rod_prijmeni?: string|null;
		/**Fax*/
		fax?: string|null;
		/**HASH loginu se solí*/
		login_passwdh?: string|null;
		/**Sůl*/
		login_salt?: string|null;
		/**HASH alternativního loginu se solí*/
		login_passwdh2?: string|null;
		/**Sůl pro alternativní login*/
		login_salt2?: string|null;
		/**IČO
		*      IČO interního subjeltu ke kterému tento záznam přísluší
		*/
		ico?: string|null;
		/**Čas synchronizace*/
		dat_sync?: JsonDate|null;
		/**SID pro login
		*      Jedná se o guid přidělený OS/doménou pro login
		*/
		login_sid?: string|null;
		/**SID pro alternativná login
		*      Jedná se o guid přidělený OS/doménou pro použitý alternativní login
		*/
		login_sid2?: string|null;
		/**Účel zpracování*/
		ixs_zap?: string|null;
		/**Vícefaktorové autentizace
		*      Povinnost uživatele použít vícefaktorovou autentizaci typu TOTP
		*/
		priz_totp?: number|null;
		/**Klíč vícefaktorové autentizace*/
		totp_key?: string|null;
		mail_public?: string|null;
	}
	const enum GGinsrefDtoNames { ixs_ref = "ixs_ref", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", oc = "oc", rc = "rc", pritomnost = "pritomnost", login_name = "login_name", cs_nazev = "cs_nazev", dat_mpd = "dat_mpd", mail = "mail", ixs_esu = "ixs_esu", z_int = "z_int", typ_aut = "typ_aut", poc_dni_exp = "poc_dni_exp", dat_exp = "dat_exp", priz_ext = "priz_ext", priz_int = "priz_int", priz_f = "priz_f", login_name_ext = "login_name_ext", login_name_grant = "login_name_grant", login_name2 = "login_name2", login_name_grant2 = "login_name_grant2", typ_aut2 = "typ_aut2", dat_exp2 = "dat_exp2", priz_msmsesu = "priz_msmsesu", ixs_esu_pam = "ixs_esu_pam", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", ixs_lpc = "ixs_lpc", rod_prijmeni = "rod_prijmeni", fax = "fax", login_passwdh = "login_passwdh", login_salt = "login_salt", login_passwdh2 = "login_passwdh2", login_salt2 = "login_salt2", ico = "ico", dat_sync = "dat_sync", login_sid = "login_sid", login_sid2 = "login_sid2", ixs_zap = "ixs_zap", priz_totp = "priz_totp", totp_key = "totp_key", mail_public = "mail_public",}
	const enum GGinsrefDtoFragments { ixs_ref = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", oc = "*", rc = "*", pritomnost = "*", login_name = "*", cs_nazev = "*", dat_mpd = "*", mail = "*", ixs_esu = "*", z_int = "*", typ_aut = "*", poc_dni_exp = "*", dat_exp = "*", priz_ext = "*", priz_int = "*", priz_f = "*", login_name_ext = "*", login_name_grant = "*", login_name2 = "*", login_name_grant2 = "*", typ_aut2 = "*", dat_exp2 = "*", priz_msmsesu = "*", ixs_esu_pam = "*", tel = "*", tel_privat = "*", tel_mobil = "*", ixs_lpc = "*", rod_prijmeni = "*", fax = "*", login_passwdh = "*", login_salt = "*", login_passwdh2 = "*", login_salt2 = "*", ico = "*", dat_sync = "*", login_sid = "*", login_sid2 = "*", ixs_zap = "*", priz_totp = "*", totp_key = "*", mail_public = "*",}
	const enum GGinsrefDtoTypes { ixs_ref = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", oc = "string", rc = "string", pritomnost = "number", login_name = "string", cs_nazev = "string", dat_mpd = "JsonDate", mail = "string", ixs_esu = "string", z_int = "number", typ_aut = "number", poc_dni_exp = "number", dat_exp = "JsonDate", priz_ext = "number", priz_int = "number", priz_f = "number", login_name_ext = "string", login_name_grant = "string", login_name2 = "string", login_name_grant2 = "string", typ_aut2 = "number", dat_exp2 = "JsonDate", priz_msmsesu = "number", ixs_esu_pam = "string", tel = "string", tel_privat = "string", tel_mobil = "string", ixs_lpc = "string", rod_prijmeni = "string", fax = "string", login_passwdh = "string", login_salt = "string", login_passwdh2 = "string", login_salt2 = "string", ico = "string", dat_sync = "JsonDate", login_sid = "string", login_sid2 = "string", ixs_zap = "string", priz_totp = "number", totp_key = "string", mail_public = "string",}
	const enum GGinsrefDtoTypeLengths { ixs_ref = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 200, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, oc = 30, rc = 10, login_name = 60, cs_nazev = 200, mail = 254, ixs_esu = 12, login_name_ext = 60, login_name_grant = 60, login_name2 = 60, login_name_grant2 = 60, ixs_esu_pam = 12, tel = 33, tel_privat = 33, tel_mobil = 33, ixs_lpc = 12, rod_prijmeni = 100, fax = 33, login_passwdh = 254, login_salt = 254, login_passwdh2 = 254, login_salt2 = 254, ico = 10, login_sid = 254, login_sid2 = 254, ixs_zap = 12, totp_key = 254, mail_public = 254,}
	/**Rozšíření osoby*/
	interface GGinsrefExtDto extends Gordic.Adx.Interface.GGinsrefDto {
		/**Textová reprezentace spisového uzlu*/
		ixs_su_txt?: string|null;
	}
	const enum GGinsrefExtDtoNames { ixs_su_txt = "ixs_su_txt", ixs_ref = "ixs_ref", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", oc = "oc", rc = "rc", pritomnost = "pritomnost", login_name = "login_name", cs_nazev = "cs_nazev", dat_mpd = "dat_mpd", mail = "mail", ixs_esu = "ixs_esu", z_int = "z_int", typ_aut = "typ_aut", poc_dni_exp = "poc_dni_exp", dat_exp = "dat_exp", priz_ext = "priz_ext", priz_int = "priz_int", priz_f = "priz_f", login_name_ext = "login_name_ext", login_name_grant = "login_name_grant", login_name2 = "login_name2", login_name_grant2 = "login_name_grant2", typ_aut2 = "typ_aut2", dat_exp2 = "dat_exp2", priz_msmsesu = "priz_msmsesu", ixs_esu_pam = "ixs_esu_pam", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", ixs_lpc = "ixs_lpc", rod_prijmeni = "rod_prijmeni", fax = "fax", login_passwdh = "login_passwdh", login_salt = "login_salt", login_passwdh2 = "login_passwdh2", login_salt2 = "login_salt2", ico = "ico", dat_sync = "dat_sync", login_sid = "login_sid", login_sid2 = "login_sid2", ixs_zap = "ixs_zap", priz_totp = "priz_totp", totp_key = "totp_key", mail_public = "mail_public",}
	const enum GGinsrefExtDtoFragments { ixs_su_txt = "*", ixs_ref = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", oc = "*", rc = "*", pritomnost = "*", login_name = "*", cs_nazev = "*", dat_mpd = "*", mail = "*", ixs_esu = "*", z_int = "*", typ_aut = "*", poc_dni_exp = "*", dat_exp = "*", priz_ext = "*", priz_int = "*", priz_f = "*", login_name_ext = "*", login_name_grant = "*", login_name2 = "*", login_name_grant2 = "*", typ_aut2 = "*", dat_exp2 = "*", priz_msmsesu = "*", ixs_esu_pam = "*", tel = "*", tel_privat = "*", tel_mobil = "*", ixs_lpc = "*", rod_prijmeni = "*", fax = "*", login_passwdh = "*", login_salt = "*", login_passwdh2 = "*", login_salt2 = "*", ico = "*", dat_sync = "*", login_sid = "*", login_sid2 = "*", ixs_zap = "*", priz_totp = "*", totp_key = "*", mail_public = "*",}
	const enum GGinsrefExtDtoTypes { ixs_su_txt = "string", ixs_ref = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", oc = "string", rc = "string", pritomnost = "number", login_name = "string", cs_nazev = "string", dat_mpd = "JsonDate", mail = "string", ixs_esu = "string", z_int = "number", typ_aut = "number", poc_dni_exp = "number", dat_exp = "JsonDate", priz_ext = "number", priz_int = "number", priz_f = "number", login_name_ext = "string", login_name_grant = "string", login_name2 = "string", login_name_grant2 = "string", typ_aut2 = "number", dat_exp2 = "JsonDate", priz_msmsesu = "number", ixs_esu_pam = "string", tel = "string", tel_privat = "string", tel_mobil = "string", ixs_lpc = "string", rod_prijmeni = "string", fax = "string", login_passwdh = "string", login_salt = "string", login_passwdh2 = "string", login_salt2 = "string", ico = "string", dat_sync = "JsonDate", login_sid = "string", login_sid2 = "string", ixs_zap = "string", priz_totp = "number", totp_key = "string", mail_public = "string",}
	const enum GGinsrefExtDtoTypeLengths { ixs_ref = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 200, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, oc = 30, rc = 10, login_name = 60, cs_nazev = 200, mail = 254, ixs_esu = 12, login_name_ext = 60, login_name_grant = 60, login_name2 = 60, login_name_grant2 = 60, ixs_esu_pam = 12, tel = 33, tel_privat = 33, tel_mobil = 33, ixs_lpc = 12, rod_prijmeni = 100, fax = 33, login_passwdh = 254, login_salt = 254, login_passwdh2 = 254, login_salt2 = 254, ico = 10, login_sid = 254, login_sid2 = 254, ixs_zap = 12, totp_key = 254, mail_public = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinssbuDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginssbu
	*      Segmenty budovy
	*/
	interface GGinssbuDto {
		/**IČO*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy
		*      Segment budovy
		*/
		segment_kod?: string|null;
		/**Název segmentu
		*      Název segmentu budovy
		*/
		segment_naz?: string|null;
		/**Patro
		*      Patro
		*/
		patro?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Uživatel*/
		ixs_esu_uziv?: string|null;
		/**Správce budovy*/
		ixs_esu_spr?: string|null;
		/**Plocha
		*      Plocha - výměra v m2
		*/
		plocha?: JsonDecimal|null;
		/**Druh segmentu budovy*/
		segment_druh?: number|null;
		/**Způsob využití*/
		kod_vyu?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Čárový kód*/
		id_kod?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Elementární objekt*/
		ixs_elo?: string|null;
	}
	const enum GGinssbuDtoNames { ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", segment_naz = "segment_naz", patro = "patro", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", plocha = "plocha", segment_druh = "segment_druh", kod_vyu = "kod_vyu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo",}
	const enum GGinssbuDtoFragments { ico = "*", budova_kod = "*", segment_kod = "*", segment_naz = "*", patro = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", plocha = "*", segment_druh = "*", kod_vyu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_lpc = "*", ixs_elo = "*",}
	const enum GGinssbuDtoTypes { ico = "string", budova_kod = "string", segment_kod = "string", segment_naz = "string", patro = "string", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", plocha = "JsonDecimal", segment_druh = "number", kod_vyu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_lpc = "string", ixs_elo = "string",}
	const enum GGinssbuDtoTypeLengths { ico = 10, budova_kod = 8, segment_kod = 8, segment_naz = 50, patro = 10, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_lpc = 12, ixs_elo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinvovkDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginvovk
	*      Vlastnost pro obecný objekt
	*/
	interface GGinvovkDto {
		/**ID subjektu*/
		sxs?: string|null;
		/**ID vlastnosti/struktury/profilu
		*      ID vlastnosti, struktury nebo profilu, který je navázán na objekt identifikovaný klíčem sxs a typem objektu GINIS
		*/
		ixs?: string|null;
		/**Typu subjektu*/
		typ_obj?: number|null;
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Pořadí*/
		poradi?: number|null;
	}
	const enum GGinvovkDtoNames { sxs = "sxs", ixs = "ixs", typ_obj = "typ_obj", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", poradi = "poradi",}
	const enum GGinvovkDtoFragments { sxs = "*", ixs = "*", typ_obj = "*", typ_vps = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", poradi = "*",}
	const enum GGinvovkDtoTypes { sxs = "string", ixs = "string", typ_obj = "number", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", poradi = "number",}
	const enum GGinvovkDtoTypeLengths { sxs = 200, ixs = 12, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Gin\GGinvovpDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ginvovp
	*      Vlastnosti pro typ subjektu a IČO
	*/
	interface GGinvovpDto {
		/**Typ subjektu
		*      Interní ID typu subjektu, pro který je možné přidat profil/strukturu/vlastnost
		*/
		typ_obj?: number|null;
		/**ID vlastnosti/struktury/profilu
		*      ID vlastnosti, struktury nebo profilu, které má být umožněno navázat na zadaný typ objektu GINIS
		*/
		ixs?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvovpDtoNames { typ_obj = "typ_obj", ixs = "ixs", ico = "ico", typ_vps = "typ_vps", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvovpDtoFragments { typ_obj = "*", ixs = "*", ico = "*", typ_vps = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvovpDtoTypes { typ_obj = "number", ixs = "string", ico = "string", typ_vps = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvovpDtoTypeLengths { ixs = 12, ico = 10, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GGincobjDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:gincobj*/
	interface GGincobjDto {
		/**DBCOLUMN:gincobj.typ_obj*/
		typ_obj?: number|null;
		/**DBCOLUMN:gincobj.typ_obj_txt*/
		typ_obj_txt?: string|null;
		/**DBCOLUMN:gincobj.tabname*/
		tabname?: string|null;
		/**DBCOLUMN:gincobj.tabname_hi*/
		tabname_hi?: string|null;
		/**DBCOLUMN:gincobj.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincobj.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincobj.param_hv*/
		param_hv?: string|null;
		/**DBCOLUMN:gincobj.param_hs*/
		param_hs?: string|null;
		/**DBCOLUMN:gincobj.priz_od_do_akt*/
		priz_od_do_akt?: number|null;
		/**DBCOLUMN:gincobj.usr_od_do_akt*/
		usr_od_do_akt?: number|null;
		/**DBCOLUMN:gincobj.priz_zobr_trla*/
		priz_zobr_trla?: number|null;
	}
	const enum GGincobjDtoNames { typ_obj = "typ_obj", typ_obj_txt = "typ_obj_txt", tabname = "tabname", tabname_hi = "tabname_hi", k_v = "k_v", k_s = "k_s", param_hv = "param_hv", param_hs = "param_hs", priz_od_do_akt = "priz_od_do_akt", usr_od_do_akt = "usr_od_do_akt", priz_zobr_trla = "priz_zobr_trla",}
	const enum GGincobjDtoFragments { typ_obj = "*", typ_obj_txt = "*", tabname = "*", tabname_hi = "*", k_v = "*", k_s = "*", param_hv = "*", param_hs = "*", priz_od_do_akt = "*", usr_od_do_akt = "*", priz_zobr_trla = "*",}
	const enum GGincobjDtoTypes { typ_obj = "number", typ_obj_txt = "string", tabname = "string", tabname_hi = "string", k_v = "number", k_s = "string", param_hv = "string", param_hs = "string", priz_od_do_akt = "number", usr_od_do_akt = "number", priz_zobr_trla = "number",}
	const enum GGincobjDtoTypeLengths { typ_obj_txt = 100, tabname = 9, tabname_hi = 9, k_s = 15, param_hv = 15, param_hs = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GMzardacDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:mzardac
	*      Deklarace subřad
	*/
	interface GMzardacDto extends Gordic.Adx.Interface.GXxxrdac {
	}
	const enum GMzardacDtoNames { ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su",}
	const enum GMzardacDtoFragments { ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*",}
	const enum GMzardacDtoTypes { ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string",}
	const enum GMzardacDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
	interface GMzardacExtDto {
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Číslo subřady
		*      Číslo subřady knihy
		*/
		subrada?: number|null;
		/**Zkratka
		*      Zkratka
		*/
		zkratka?: string|null;
		/**Název subřady
		*      Název subřady
		*/
		nazev?: string|null;
		/**Aktivita subřady
		*      Aktivita subřady
		*/
		akt_subrady?: number|null;
		/**Konec subřady
		*      Konec subřady
		*/
		ac_cislo_do?: number|null;
		/**Začátek subřady
		*      Začátek subřady
		*/
		ac_cislo_od?: number|null;
		/**Poslední použité číslo
		*      Poslední použité číslo
		*/
		ac_cislo_max?: number|null;
		/**Měsíc subřady
		*      Měsíc subřady
		*/
		mesic?: number|null;
		/**Datum a čas poslední změny tohoto záznamu
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel
		*/
		ixs_su?: string|null;
		/**Textová reprezentace knihy*/
		ixp_den_txt?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GMzardacExtDtoNames { ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", ixp_den_txt = "ixp_den_txt", ucs = "ucs", ico = "ico", aktivita = "aktivita",}
	const enum GMzardacExtDtoFragments { ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", ixp_den_txt = "*", ucs = "*", ico = "*", aktivita = "*",}
	const enum GMzardacExtDtoTypes { ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", ixp_den_txt = "string", ucs = "string", ico = "string", aktivita = "number",}
	const enum GMzardacExtDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GReaderAdxEkosobdDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:ekosobd
	*      Účetní období
	*/
	interface GReaderAdxEkosobdDto {
		/**účetní období*/
		rok?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		apl_lock?: number|null;
		ixs_roz_vlzr?: string|null;
	}
	const enum GReaderAdxEkosobdDtoNames { rok = "rok", dat_od = "dat_od", dat_do = "dat_do", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", apl_lock = "apl_lock", ixs_roz_vlzr = "ixs_roz_vlzr",}
	const enum GReaderAdxEkosobdDtoFragments { rok = "*", dat_od = "*", dat_do = "*", zkratka = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", apl_lock = "*", ixs_roz_vlzr = "*",}
	const enum GReaderAdxEkosobdDtoTypes { rok = "number", dat_od = "JsonDate", dat_do = "JsonDate", zkratka = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", apl_lock = "number", ixs_roz_vlzr = "string",}
	const enum GReaderAdxEkosobdDtoTypeLengths { zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_roz_vlzr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GReaderAdxGincaktDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Dto pro zvláštní prefab výběru aktivity*/
	interface GReaderAdxGincaktDto {
		/**Aktivita*/
		aktivita?: number|null;
		/**Popis*/
		aktivita_txt?: string|null;
	}
	const enum GReaderAdxGincaktDtoNames { aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GReaderAdxGincaktDtoFragments { aktivita = "*", aktivita_txt = "*",}
	const enum GReaderAdxGincaktDtoTypes { aktivita = "number", aktivita_txt = "string",}
	const enum GReaderAdxGincaktDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GReaderAdxKnihaIxpDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Dto pro zvláštní prefab výběru aktivity*/
	interface GReaderAdxKnihaIxpDto {
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Název knihy*/
		nazev?: string|null;
		/**Název knihy*/
		rok?: number|null;
		/**Ičo knihy*/
		ico?: string|null;
		/**Identifikátor učetního střediska*/
		ucs?: string|null;
		/**Název učetního střediska*/
		ucs_txt?: string|null;
		/**Agenda*/
		agenda?: string|null;
		/**Typ objektu*/
		typ_obj?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GReaderAdxKnihaIxpDtoNames { ixp_den = "ixp_den", nazev = "nazev", rok = "rok", ico = "ico", ucs = "ucs", ucs_txt = "ucs_txt", agenda = "agenda", typ_obj = "typ_obj", aktivita = "aktivita",}
	const enum GReaderAdxKnihaIxpDtoFragments { ixp_den = "*", nazev = "*", rok = "*", ico = "*", ucs = "*", ucs_txt = "*", agenda = "*", typ_obj = "*", aktivita = "*",}
	const enum GReaderAdxKnihaIxpDtoTypes { ixp_den = "string", nazev = "string", rok = "number", ico = "string", ucs = "string", ucs_txt = "string", agenda = "string", typ_obj = "number", aktivita = "number",}
	const enum GReaderAdxKnihaIxpDtoTypeLengths {}
	interface GDictionaryDenik {
		/**Agenda*/
		agenda?: string|null;
		/**tabulka*/
		tabname?: string|null;
	}
	const enum GDictionaryDenikNames { agenda = "agenda", tabname = "tabname",}
	const enum GDictionaryDenikFragments { agenda = "*", tabname = "*",}
	const enum GDictionaryDenikTypes { agenda = "string", tabname = "string",}
	const enum GDictionaryDenikTypeLengths {}
	/**Base denik pro různé tabulky*/
	interface GDenikBase {
		/**Tabulky mají společný název*/
		nazev?: string|null;
	}
	const enum GDenikBaseNames { nazev = "nazev",}
	const enum GDenikBaseFragments { nazev = "*",}
	const enum GDenikBaseTypes { nazev = "string",}
	const enum GDenikBaseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GRzardacDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:rzardac
	*      Deklarace subřad
	*/
	interface GRzardacDto extends Gordic.Adx.Interface.GXxxrdac {
	}
	const enum GRzardacDtoNames { ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su",}
	const enum GRzardacDtoFragments { ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*",}
	const enum GRzardacDtoTypes { ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string",}
	const enum GRzardacDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
	interface GRzardacExtDto {
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Číslo subřady
		*      Číslo subřady knihy
		*/
		subrada?: number|null;
		/**Zkratka
		*      Zkratka
		*/
		zkratka?: string|null;
		/**Název subřady
		*      Název subřady
		*/
		nazev?: string|null;
		/**Aktivita subřady
		*      Aktivita subřady
		*/
		akt_subrady?: number|null;
		/**Konec subřady
		*      Konec subřady
		*/
		ac_cislo_do?: number|null;
		/**Začátek subřady
		*      Začátek subřady
		*/
		ac_cislo_od?: number|null;
		/**Poslední použité číslo
		*      Poslední použité číslo
		*/
		ac_cislo_max?: number|null;
		/**Měsíc subřady
		*      Měsíc subřady
		*/
		mesic?: number|null;
		/**Datum a čas poslední změny tohoto záznamu
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel
		*/
		ixs_su?: string|null;
		/**Textová reprezentace knihy*/
		ixp_den_txt?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GRzardacExtDtoNames { ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", ixp_den_txt = "ixp_den_txt", ucs = "ucs", ico = "ico", aktivita = "aktivita",}
	const enum GRzardacExtDtoFragments { ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", ixp_den_txt = "*", ucs = "*", ico = "*", aktivita = "*",}
	const enum GRzardacExtDtoTypes { ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", ixp_den_txt = "string", ucs = "string", ico = "string", aktivita = "number",}
	const enum GRzardacExtDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Dto\GWflctsuDto.d.ts 

declare namespace Gordic.Adx.Interface {
	/**DBTABLE:wflctsu
	*      Typy subjektů
	*/
	interface GWflctsuDto {
		/**typ subjektu*/
		typ_subj?: number|null;
		/**název typu subjektu*/
		typ_subj_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Jméno tabulky*/
		tab_name?: string|null;
	}
	const enum GWflctsuDtoNames { typ_subj = "typ_subj", typ_subj_txt = "typ_subj_txt", k_v = "k_v", k_s = "k_s", tab_name = "tab_name",}
	const enum GWflctsuDtoFragments { typ_subj = "*", typ_subj_txt = "*", k_v = "*", k_s = "*", tab_name = "*",}
	const enum GWflctsuDtoTypes { typ_subj = "number", typ_subj_txt = "string", k_v = "number", k_s = "string", tab_name = "string",}
	const enum GWflctsuDtoTypeLengths { typ_subj_txt = 254, k_s = 15, tab_name = 18,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Interface\IGReaderAdxGincorj.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Filtry pro přístup k číselníku Gincorj*/
	const enum FilterReaderAdxGincorj {
		/**PK*/
		uroven_orj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\Dto\Readers\Interface\IGReaderAdxGinvovp.d.ts 

declare namespace Gordic.Adx.Interface {
	/**Rozšíření o název profilu, sturktury nebo vlastnosti*/
	interface GGinvovpExtDto extends Gordic.Adx.Interface.GGinvovpDto {
		/**Název profilu/struktury/vlastnosti*/
		nazev?: string|null;
		/**Typ vazby (profil,struktura,vlastnost)*/
		typ_vps_txt?: string|null;
	}
	const enum GGinvovpExtDtoNames { nazev = "nazev", typ_vps_txt = "typ_vps_txt", typ_obj = "typ_obj", ixs = "ixs", ico = "ico", typ_vps = "typ_vps", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvovpExtDtoFragments { nazev = "*", typ_vps_txt = "*", typ_obj = "*", ixs = "*", ico = "*", typ_vps = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvovpExtDtoTypes { nazev = "string", typ_vps_txt = "string", typ_obj = "number", ixs = "string", ico = "string", typ_vps = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvovpExtDtoTypeLengths { ixs = 12, ico = 10, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro přístup k číselníku Ginvovp*/
	const enum GFilterReaderAdxGinvovp {
		/**PK číselníku*/
		typ_obj,
		/**PK číselníku*/
		ixs,
		/**PK číselníku*/
		ico,
		/**PK číselníku*/
		typ_vps,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxBudova.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Budova - ginsbud
	* @domain GinisAdmin
	* @businessObject AdxBudova
	*/
	interface AdxBudova {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxBudovaDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxBudovaDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxBudovaDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxBudovaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxBudovaDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxBudovaDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxBudovaDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxBudovaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxBudovaDto>>;
		/**Před změnou aktivity je nutné zkotrolovat jestli je navázán na majetek a upozornit uživatele*/
		checkSpojeniMajetek(rq?:CallParams<{ico:string,budova_kod:string}>): _Task<{ico:string,budova_kod:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxBudova: ServiceBase & Catalog.AdxBudova;
	}
	const AdxBudova: Client["AdxBudova"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro ISL READ - Budova - ginsbud*/
	interface GAdxBudovaDto extends Gordic.Adx.Interface.GGinsbudDto {
		/**Textová reprezentace druhu budovy*/
		budova_druh_txt?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Přístupové klíče k budově*/
		pristupove_klice?: string[]|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxBudovaDtoNames { budova_druh_txt = "budova_druh_txt", zmenu_prov_txt = "zmenu_prov_txt", pristupove_klice = "pristupove_klice", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", budova_kod = "budova_kod", budova_naz = "budova_naz", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", budova_druh = "budova_druh", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo", inv_cis = "inv_cis",}
	const enum GAdxBudovaDtoFragments { budova_druh_txt = "*", zmenu_prov_txt = "*", pristupove_klice = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", budova_kod = "*", budova_naz = "*", dat_od = "*", dat_do = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", budova_druh = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_lpc = "*", ixs_elo = "*", inv_cis = "*",}
	const enum GAdxBudovaDtoTypes { budova_druh_txt = "string", zmenu_prov_txt = "string", pristupove_klice = "string[]", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", budova_kod = "string", budova_naz = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", budova_druh = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_lpc = "string", ixs_elo = "string", inv_cis = "string",}
	const enum GAdxBudovaDtoTypeLengths { ico = 10, budova_kod = 8, budova_naz = 50, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_lpc = 12, ixs_elo = 12, inv_cis = 50,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxBudovaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - IČO*/
		ico,
		/**PK tabulky - Kód budovy*/
		budova_kod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxMistnost.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Místnost - ginsmis
	* @domain GinisAdmin
	* @businessObject AdxMistnost
	*/
	interface AdxMistnost {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxMistnostDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxMistnostDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxMistnostDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxMistnostDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxMistnostDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxMistnostDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxMistnostDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxMistnostDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxMistnostDto>>;
		/**Před změnou aktivity je nutné zkotrolovat jestli je navázán na majetek a upozornit uživatele*/
		checkSpojeniMajetek(rq?:CallParams<{ico:string,budova_kod:string,segment_kod:string,mistnost_kod:string}>): _Task<{ico:string,budova_kod:string,segment_kod:string,mistnost_kod:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxMistnost: ServiceBase & Catalog.AdxMistnost;
	}
	const AdxMistnost: Client["AdxMistnost"];
}
declare namespace Gordic.Adx.Interface {
	/**Místnost - ginsmis*/
	interface GAdxMistnostDto extends Gordic.Adx.Interface.GGinsmisDto {
		/**Textová reprezentace kódu budovy*/
		budova_naz?: string|null;
		/**Textová reprezentace segmentu budovy*/
		segment_naz?: string|null;
		/**Textová reprezentace kódu využití*/
		kod_vyu_txt?: string|null;
		/**Textová reprezentace druhu segmentu budovy*/
		mistnost_druh_txt?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Navázané spisovny*/
		navazane_spisovny?: Gordic.Adx.Interface.GAdmNavazaneSpisovnyDto[]|null;
		/**Přístupové klíče k segmentu budovy*/
		pristupove_klice?: string[]|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxMistnostDtoNames { budova_naz = "budova_naz", segment_naz = "segment_naz", kod_vyu_txt = "kod_vyu_txt", mistnost_druh_txt = "mistnost_druh_txt", zmenu_prov_txt = "zmenu_prov_txt", navazane_spisovny = "navazane_spisovny", pristupove_klice = "pristupove_klice", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", mistnost_naz = "mistnost_naz", patro = "patro", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", plocha = "plocha", mistnost_druh = "mistnost_druh", kod_vyu = "kod_vyu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_ref = "ixs_ref", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo",}
	const enum GAdxMistnostDtoFragments { budova_naz = "*", segment_naz = "*", kod_vyu_txt = "*", mistnost_druh_txt = "*", zmenu_prov_txt = "*", navazane_spisovny = "*", pristupove_klice = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", mistnost_naz = "*", patro = "*", dat_od = "*", dat_do = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", plocha = "*", mistnost_druh = "*", kod_vyu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_ref = "*", ixs_lpc = "*", ixs_elo = "*",}
	const enum GAdxMistnostDtoTypes { budova_naz = "string", segment_naz = "string", kod_vyu_txt = "string", mistnost_druh_txt = "string", zmenu_prov_txt = "string", navazane_spisovny = "Gordic.Adx.Interface.GAdmNavazaneSpisovnyDto[]", pristupove_klice = "string[]", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", mistnost_naz = "string", patro = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", plocha = "JsonDecimal", mistnost_druh = "number", kod_vyu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_ref = "string", ixs_lpc = "string", ixs_elo = "string",}
	const enum GAdxMistnostDtoTypeLengths { ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, mistnost_naz = 50, patro = 10, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_ref = 12, ixs_lpc = 12, ixs_elo = 12,}
	/**GAdmNavazaneSpisovnyDto*/
	interface GAdmNavazaneSpisovnyDto {
		/**Identifikátor spsisovny*/
		ixs_spi?: string|null;
		/**Název spisovny*/
		ixs_spi_txt?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GAdmNavazaneSpisovnyDtoNames { ixs_spi = "ixs_spi", ixs_spi_txt = "ixs_spi_txt", aktivita = "aktivita",}
	const enum GAdmNavazaneSpisovnyDtoFragments { ixs_spi = "*", ixs_spi_txt = "*", aktivita = "*",}
	const enum GAdmNavazaneSpisovnyDtoTypes { ixs_spi = "string", ixs_spi_txt = "string", aktivita = "number",}
	const enum GAdmNavazaneSpisovnyDtoTypeLengths {}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxMistnostFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico,
		/**PK tabulky - Kód budovy*/
		budova_kod,
		/**PK tabulky - Segment budovy*/
		segment_kod,
		/**PK tabulky - umístění židle, kód místnosti*/
		mistnost_kod,
		mistnost_druh,
		kod_vyu,
		id_kod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxOrganizacniJednotka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Organizační jednotka - ginsorj
	* @domain GinisAdmin
	* @businessObject AdxOrganizacniJednotka
	*/
	interface AdxOrganizacniJednotka {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto>>;
		/**Získání počtu záznamů pro zobrazení*/
		getDataCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Adx.Interface.GAdxCountData>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxOrganizacniJednotka: ServiceBase & Catalog.AdxOrganizacniJednotka;
	}
	const AdxOrganizacniJednotka: Client["AdxOrganizacniJednotka"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro ISL READ - Organizační jednotka - ginsorj*/
	interface GAdxOrganizacniJednotkaDto extends Gordic.Adx.Interface.GGinsorjDto {
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Název nadřízené organizační jednotky*/
		ixs_nad_txt?: string|null;
		/**Textová reprezentace úrovně organizační jednotky*/
		uroven_orj_txt?: string|null;
		/**Textová reprezentace přísluší ke spisovému uzlu*/
		ixs_su_txt?: string|null;
		/**Externí identifikace*/
		externi_identifikace?: Gordic.Adx.Interface.GExterniIdentifikaceDto[]|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxOrganizacniJednotkaDtoNames { zmenu_prov_txt = "zmenu_prov_txt", ixs_nad_txt = "ixs_nad_txt", uroven_orj_txt = "uroven_orj_txt", ixs_su_txt = "ixs_su_txt", externi_identifikace = "externi_identifikace", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_orj = "ixs_orj", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", uroven_orj = "uroven_orj", ixs_nad = "ixs_nad", kod_orj = "kod_orj", ixs_isu = "ixs_isu", ixs_fun = "ixs_fun", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", z_int = "z_int", dat_mpd = "dat_mpd", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", dat_sync = "dat_sync",}
	const enum GAdxOrganizacniJednotkaDtoFragments { zmenu_prov_txt = "*", ixs_nad_txt = "*", uroven_orj_txt = "*", ixs_su_txt = "*", externi_identifikace = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_orj = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", uroven_orj = "*", ixs_nad = "*", kod_orj = "*", ixs_isu = "*", ixs_fun = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", z_int = "*", dat_mpd = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", dat_sync = "*",}
	const enum GAdxOrganizacniJednotkaDtoTypes { zmenu_prov_txt = "string", ixs_nad_txt = "string", uroven_orj_txt = "string", ixs_su_txt = "string", externi_identifikace = "Gordic.Adx.Interface.GExterniIdentifikaceDto[]", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_orj = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", uroven_orj = "number", ixs_nad = "string", kod_orj = "string", ixs_isu = "string", ixs_fun = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", z_int = "number", dat_mpd = "JsonDate", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", dat_sync = "JsonDate",}
	const enum GAdxOrganizacniJednotkaDtoTypeLengths { ixs_orj = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 100, ixs_nad = 12, kod_orj = 30, ixs_isu = 12, ixs_fun = 12, ofic_nazev = 254, cs_nazev = 100, mail = 254, tel = 33, fax = 33, ixs_lpc = 12, ico = 10,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxOrganizacniJednotkaFilterEnum {
		/**Ičo*/
		ico,
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Identifikátor organizační jednotky*/
		ixs_orj,
		/**Název organizační jednotky*/
		nazev,
		/**Úroveň organizační jednotky*/
		uroven_orj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxPrirazenaVlastnostProObjekt.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro konkrétně přiřazenouvlastnost pro instanci objektu
	* @domain GinisAdmin
	* @businessObject AdxPrirazenaVlastnostProObjekt
	*/
	interface AdxPrirazenaVlastnostProObjekt {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>>;
		/**Získání počtu záznamů podle filtračních parametrů*/
		getDataCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Adx.Interface.GAdxCountData>>;
		/**Založení nebo aktualizace*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto[]}>): _Task<{data:Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>[]>;
		/**Test existence záznamu*/
		testExist(rq?:CallParams<{dtos:Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto[]}>): _Task<{dtos:Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto[]},Gordic.Adx.Interface.GAdxExistResultDto<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto>[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxPrirazenaVlastnostProObjekt: ServiceBase & Catalog.AdxPrirazenaVlastnostProObjekt;
	}
	const AdxPrirazenaVlastnostProObjekt: Client["AdxPrirazenaVlastnostProObjekt"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro konkrétně přiřazenouvlastnost pro instanci objektu*/
	interface GAdxPrirazenaVlastnostProObjektDto extends Gordic.Adx.Interface.GGinvovkDto {
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Textová reprezentace typu přiřazení*/
		typ_vps_txt?: string|null;
		/**Textová reprezentace typu objektu*/
		typ_obj_txt?: string|null;
		/**Textová reprezentace SXS objektu*/
		sxs_txt?: string|null;
		/**Textová reprezentace ID vlastnosti/struktury/profilu*/
		ixs_txt?: string|null;
		/**Kompletní textová reprezentace objektu*/
		sxs_complete_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxPrirazenaVlastnostProObjektDtoNames { zmenu_prov_txt = "zmenu_prov_txt", typ_vps_txt = "typ_vps_txt", typ_obj_txt = "typ_obj_txt", sxs_txt = "sxs_txt", ixs_txt = "ixs_txt", sxs_complete_txt = "sxs_complete_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", sxs = "sxs", ixs = "ixs", typ_obj = "typ_obj", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", poradi = "poradi",}
	const enum GAdxPrirazenaVlastnostProObjektDtoFragments { zmenu_prov_txt = "*", typ_vps_txt = "*", typ_obj_txt = "*", sxs_txt = "*", ixs_txt = "*", sxs_complete_txt = "*", Permissions = "permissions", AdxInfoDto = "info", sxs = "*", ixs = "*", typ_obj = "*", typ_vps = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", poradi = "*",}
	const enum GAdxPrirazenaVlastnostProObjektDtoTypes { zmenu_prov_txt = "string", typ_vps_txt = "string", typ_obj_txt = "string", sxs_txt = "string", ixs_txt = "string", sxs_complete_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", sxs = "string", ixs = "string", typ_obj = "number", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", poradi = "number",}
	const enum GAdxPrirazenaVlastnostProObjektDtoTypeLengths { sxs = 200, ixs = 12, zmenu_prov = 12, ico = 10,}
	/**DTO pro objekt subjektu, ke kterému je přiřazena vlastnost/struktura/profil*/
	interface GAdxPrirazenaVlastnostProObjektSubjektDto {
		/**Textová reprezentace identifikátoru objektu*/
		sxs?: string|null;
		/**Název objektu*/
		nazev?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GAdxPrirazenaVlastnostProObjektSubjektDtoNames { sxs = "sxs", nazev = "nazev", aktivita = "aktivita",}
	const enum GAdxPrirazenaVlastnostProObjektSubjektDtoFragments { sxs = "*", nazev = "*", aktivita = "*",}
	const enum GAdxPrirazenaVlastnostProObjektSubjektDtoTypes { sxs = "string", nazev = "string", aktivita = "number",}
	const enum GAdxPrirazenaVlastnostProObjektSubjektDtoTypeLengths {}
	/**DTO pro objekt vlastnosti/struktury/profilu, která je přiřazena k subjektu*/
	interface GAdxPrirazenaVlastnostVSPDto {
		/**Identifikátor vlastnosti/struktury/profilu*/
		ixs?: string|null;
		/**Název vlastnosti/struktury/profilu*/
		nazev?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GAdxPrirazenaVlastnostVSPDtoNames { ixs = "ixs", nazev = "nazev", aktivita = "aktivita",}
	const enum GAdxPrirazenaVlastnostVSPDtoFragments { ixs = "*", nazev = "*", aktivita = "*",}
	const enum GAdxPrirazenaVlastnostVSPDtoTypes { ixs = "string", nazev = "string", aktivita = "number",}
	const enum GAdxPrirazenaVlastnostVSPDtoTypeLengths {}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxPrirazenaVlastnostProObjektFilterEnum {
		/**Aktivita*/
		aktivita,
		/**SXS objektu*/
		sxs,
		/**ID vlastnosti/struktury/profilu*/
		ixs,
		/**Typ objektu*/
		typ_obj,
		/**Ičo*/
		ico,
		/**Pouze knihy*/
		pouzeKnihy,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxPristupovyKlic.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Přístupový klíč - ginskey
	* @domain GinisAdmin
	* @businessObject AdxPristupovyKlic
	*/
	interface AdxPristupovyKlic {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxPristupovyKlicDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxPristupovyKlicDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxPristupovyKlicDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxPristupovyKlicDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxPristupovyKlicDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxPristupovyKlicDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxPristupovyKlicDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxPristupovyKlicDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxPristupovyKlicDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxPristupovyKlic: ServiceBase & Catalog.AdxPristupovyKlic;
	}
	const AdxPristupovyKlic: Client["AdxPristupovyKlic"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO - Přístupový klíč - ginskey*/
	interface GAdxPristupovyKlicDto extends Gordic.Adx.Interface.GGinskeyDto {
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxPristupovyKlicDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", acckey = "acckey", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdxPristupovyKlicDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", acckey = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdxPristupovyKlicDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", acckey = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdxPristupovyKlicDtoTypeLengths { acckey = 12, nazev = 50, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxPristupovyKlicFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - přístupový klíč*/
		acckey,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxSegmentBudovy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Budova - ginsbud
	* @domain GinisAdmin
	* @businessObject AdxSegmentBudovy
	*/
	interface AdxSegmentBudovy {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxSegmentBudovyDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxSegmentBudovyDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxSegmentBudovyDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxSegmentBudovyDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxSegmentBudovyDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxSegmentBudovyDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxSegmentBudovyDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxSegmentBudovyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxSegmentBudovyDto>>;
		/**Před změnou aktivity je nutné zkotrolovat jestli je navázán na majetek a upozornit uživatele*/
		checkSpojeniMajetek(rq?:CallParams<{ico:string,budova_kod:string,segment_kod:string}>): _Task<{ico:string,budova_kod:string,segment_kod:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxSegmentBudovy: ServiceBase & Catalog.AdxSegmentBudovy;
	}
	const AdxSegmentBudovy: Client["AdxSegmentBudovy"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro ISL READ - Budova - ginsbud*/
	interface GAdxSegmentBudovyDto extends Gordic.Adx.Interface.GGinssbuDto {
		/**Textová reprezentace kódu budovy*/
		budova_kod_txt?: string|null;
		/**Textová reprezentace kódu využití*/
		kod_vyu_txt?: string|null;
		/**Textová reprezentace druhu segmentu budovy*/
		segment_druh_txt?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Přístupové klíče k segmentu budovy*/
		pristupove_klice?: string[]|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxSegmentBudovyDtoNames { budova_kod_txt = "budova_kod_txt", kod_vyu_txt = "kod_vyu_txt", segment_druh_txt = "segment_druh_txt", zmenu_prov_txt = "zmenu_prov_txt", pristupove_klice = "pristupove_klice", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", segment_naz = "segment_naz", patro = "patro", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", plocha = "plocha", segment_druh = "segment_druh", kod_vyu = "kod_vyu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo",}
	const enum GAdxSegmentBudovyDtoFragments { budova_kod_txt = "*", kod_vyu_txt = "*", segment_druh_txt = "*", zmenu_prov_txt = "*", pristupove_klice = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "*", budova_kod = "*", segment_kod = "*", segment_naz = "*", patro = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", plocha = "*", segment_druh = "*", kod_vyu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_lpc = "*", ixs_elo = "*",}
	const enum GAdxSegmentBudovyDtoTypes { budova_kod_txt = "string", kod_vyu_txt = "string", segment_druh_txt = "string", zmenu_prov_txt = "string", pristupove_klice = "string[]", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", budova_kod = "string", segment_kod = "string", segment_naz = "string", patro = "string", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", plocha = "JsonDecimal", segment_druh = "number", kod_vyu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_lpc = "string", ixs_elo = "string",}
	const enum GAdxSegmentBudovyDtoTypeLengths { ico = 10, budova_kod = 8, segment_kod = 8, segment_naz = 50, patro = 10, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_lpc = 12, ixs_elo = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxSegmentBudovyFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - IČO*/
		ico,
		/**PK tabulky - Kód budovy*/
		budova_kod,
		/**PK tabulky - Segment budovy*/
		segment_kod,
		kod_vyu,
		id_kod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Gin\IGAdxZodpovednyPracovnik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Zodpovědný pracovník - ginsref
	* @domain GinisAdmin
	* @businessObject AdxZodpovednyPracovnik
	*/
	interface AdxZodpovednyPracovnik {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxZodpovednyPracovnik: ServiceBase & Catalog.AdxZodpovednyPracovnik;
	}
	const AdxZodpovednyPracovnik: Client["AdxZodpovednyPracovnik"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro ISL READ - Zodpovědný pracovník - ginsref*/
	interface GAdxZodpovednyPracovnikDto extends Gordic.Adx.Interface.GGinsrefDto {
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Textová reprezentace spisového uzlu*/
		ixs_su_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxZodpovednyPracovnikDtoNames { zmenu_prov_txt = "zmenu_prov_txt", ixs_su_txt = "ixs_su_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_ref = "ixs_ref", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", oc = "oc", rc = "rc", pritomnost = "pritomnost", login_name = "login_name", cs_nazev = "cs_nazev", dat_mpd = "dat_mpd", mail = "mail", ixs_esu = "ixs_esu", z_int = "z_int", typ_aut = "typ_aut", poc_dni_exp = "poc_dni_exp", dat_exp = "dat_exp", priz_ext = "priz_ext", priz_int = "priz_int", priz_f = "priz_f", login_name_ext = "login_name_ext", login_name_grant = "login_name_grant", login_name2 = "login_name2", login_name_grant2 = "login_name_grant2", typ_aut2 = "typ_aut2", dat_exp2 = "dat_exp2", priz_msmsesu = "priz_msmsesu", ixs_esu_pam = "ixs_esu_pam", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", ixs_lpc = "ixs_lpc", rod_prijmeni = "rod_prijmeni", fax = "fax", login_passwdh = "login_passwdh", login_salt = "login_salt", login_passwdh2 = "login_passwdh2", login_salt2 = "login_salt2", ico = "ico", dat_sync = "dat_sync", login_sid = "login_sid", login_sid2 = "login_sid2", ixs_zap = "ixs_zap", priz_totp = "priz_totp", totp_key = "totp_key", mail_public = "mail_public",}
	const enum GAdxZodpovednyPracovnikDtoFragments { zmenu_prov_txt = "*", ixs_su_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_ref = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", oc = "*", rc = "*", pritomnost = "*", login_name = "*", cs_nazev = "*", dat_mpd = "*", mail = "*", ixs_esu = "*", z_int = "*", typ_aut = "*", poc_dni_exp = "*", dat_exp = "*", priz_ext = "*", priz_int = "*", priz_f = "*", login_name_ext = "*", login_name_grant = "*", login_name2 = "*", login_name_grant2 = "*", typ_aut2 = "*", dat_exp2 = "*", priz_msmsesu = "*", ixs_esu_pam = "*", tel = "*", tel_privat = "*", tel_mobil = "*", ixs_lpc = "*", rod_prijmeni = "*", fax = "*", login_passwdh = "*", login_salt = "*", login_passwdh2 = "*", login_salt2 = "*", ico = "*", dat_sync = "*", login_sid = "*", login_sid2 = "*", ixs_zap = "*", priz_totp = "*", totp_key = "*", mail_public = "*",}
	const enum GAdxZodpovednyPracovnikDtoTypes { zmenu_prov_txt = "string", ixs_su_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_ref = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", oc = "string", rc = "string", pritomnost = "number", login_name = "string", cs_nazev = "string", dat_mpd = "JsonDate", mail = "string", ixs_esu = "string", z_int = "number", typ_aut = "number", poc_dni_exp = "number", dat_exp = "JsonDate", priz_ext = "number", priz_int = "number", priz_f = "number", login_name_ext = "string", login_name_grant = "string", login_name2 = "string", login_name_grant2 = "string", typ_aut2 = "number", dat_exp2 = "JsonDate", priz_msmsesu = "number", ixs_esu_pam = "string", tel = "string", tel_privat = "string", tel_mobil = "string", ixs_lpc = "string", rod_prijmeni = "string", fax = "string", login_passwdh = "string", login_salt = "string", login_passwdh2 = "string", login_salt2 = "string", ico = "string", dat_sync = "JsonDate", login_sid = "string", login_sid2 = "string", ixs_zap = "string", priz_totp = "number", totp_key = "string", mail_public = "string",}
	const enum GAdxZodpovednyPracovnikDtoTypeLengths { ixs_ref = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 200, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, oc = 30, rc = 10, login_name = 60, cs_nazev = 200, mail = 254, ixs_esu = 12, login_name_ext = 60, login_name_grant = 60, login_name2 = 60, login_name_grant2 = 60, ixs_esu_pam = 12, tel = 33, tel_privat = 33, tel_mobil = 33, ixs_lpc = 12, rod_prijmeni = 100, fax = 33, login_passwdh = 254, login_salt = 254, login_passwdh2 = 254, login_salt2 = 254, ico = 10, login_sid = 254, login_sid2 = 254, ixs_zap = 12, totp_key = 254, mail_public = 254,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxZodpovednyPracovnikFilterEnum {
		/**Identifikátor pracovníka*/
		ixs_ref,
		/**Ičo*/
		ico,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Wfl\IGAdxVyberovaSkupina.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběrové skupiny
	* @domain GinisAdmin
	* @businessObject AdxVyberovaSkupina
	*/
	interface AdxVyberovaSkupina {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxVyberovaSkupinaDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxVyberovaSkupinaDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>>;
		/**Metoda pro odstranění výběrové skupiny z DB*/
		delete(rq?:Gordic.Adx.Interface.GAdxVyberovaSkupinaDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>,void>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaDto>>;
		/**Získání výběrových skupin určitého typu subjektu*/
		getVyberoveSkupinyTypu(rq?:CallParams<{typ_subj:number}>): _Task<{typ_subj:number},GServiceListResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaSelectDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxVyberovaSkupina: ServiceBase & Catalog.AdxVyberovaSkupina;
	}
	const AdxVyberovaSkupina: Client["AdxVyberovaSkupina"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro použití v prefabu*/
	interface GAdxVyberovaSkupinaSelectDto extends Gordic.Adx.Interface.GWflsblkDto {
		/**Textová reprezentace typu výběrové skupiny*/
		typ_txt?: string|null;
	}
	const enum GAdxVyberovaSkupinaSelectDtoNames { typ_txt = "typ_txt", ixs_blk = "ixs_blk", lic = "lic", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ = "typ", typ_subj = "typ_subj",}
	const enum GAdxVyberovaSkupinaSelectDtoFragments { typ_txt = "*", ixs_blk = "*", lic = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_od = "*", dat_do = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*", typ = "*", typ_subj = "*",}
	const enum GAdxVyberovaSkupinaSelectDtoTypes { typ_txt = "string", ixs_blk = "string", lic = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ = "number", typ_subj = "number",}
	const enum GAdxVyberovaSkupinaSelectDtoTypeLengths { ixs_blk = 12, lic = 4, nazev = 50, poznamka = 50, ixs_fun = 12, zmenu_prov = 12,}
	/**DTO pro ISL LIST - Výběrová skupina ADM - wflsblk*/
	interface GAdxVyberovaSkupinaDto extends Gordic.Adx.Interface.GWflsblkDto {
		/**Textová reprezentace typu výběrové skupiny*/
		typ_txt?: string|null;
		/**Kdo provedl zmenu*/
		zmenu_provedl?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxVyberovaSkupinaDtoNames { typ_txt = "typ_txt", zmenu_provedl = "zmenu_provedl", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_blk = "ixs_blk", lic = "lic", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ = "typ", typ_subj = "typ_subj",}
	const enum GAdxVyberovaSkupinaDtoFragments { typ_txt = "*", zmenu_provedl = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_blk = "*", lic = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_od = "*", dat_do = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*", typ = "*", typ_subj = "*",}
	const enum GAdxVyberovaSkupinaDtoTypes { typ_txt = "string", zmenu_provedl = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_blk = "string", lic = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ = "number", typ_subj = "number",}
	const enum GAdxVyberovaSkupinaDtoTypeLengths { ixs_blk = 12, lic = 4, nazev = 50, poznamka = 50, ixs_fun = 12, zmenu_prov = 12,}
	const enum GAdxVyberovaSkupinaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Poznámkový blok*/
		ixs_blk,
		/**Typ subjektu*/
		typ_subj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adx.Interface\ISL\Wfl\IGAdxVyberovaSkupinaObsah.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Obsah výběrové skupiny
	* @domain GinisAdmin
	* @businessObject AdxVyberovaSkupinaObsah
	*/
	interface AdxVyberovaSkupinaObsah {
		/**Read*/
		read(rq?:Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto|CallParams<GServiceReadRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>>): _Task<GServiceReadRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>,GServiceReadResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>,GServiceSaveResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>>;
		/**Smazání položky*/
		delete(rq?:Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto|CallParams<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>>): _Task<GServiceSaveRequest<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>,void>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>>;
		/**Získání obsahu výběrové skupiny*/
		getPolozkyVyberoveSkupiny(rq?:CallParams<{ixs_blk:string}>): _Task<{ixs_blk:string},GServiceListResponse<Gordic.Adx.Interface.GAdxPolozkaVyberoveSkupinaSelectDto>>;
		/**Hromadné uložení dat*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto[]}>): _Task<{data:Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Adx.Interface.GAdxVyberovaSkupinaObsahDto>[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdxVyberovaSkupinaObsah: ServiceBase & Catalog.AdxVyberovaSkupinaObsah;
	}
	const AdxVyberovaSkupinaObsah: Client["AdxVyberovaSkupinaObsah"];
}
declare namespace Gordic.Adx.Interface {
	/**DTO pro ISL READ - Obsah poznámkového bloku ADM - wfldblk*/
	interface GAdxVyberovaSkupinaObsahDto extends Gordic.Adx.Interface.GWfldblkDto {
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdxVyberovaSkupinaObsahDtoNames { Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_blk = "ixs_blk", typ_subj = "typ_subj", sxs_subj = "sxs_subj", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", aktivita = "aktivita",}
	const enum GAdxVyberovaSkupinaObsahDtoFragments { Permissions = "permissions", AdxInfoDto = "info", ixs_blk = "*", typ_subj = "*", sxs_subj = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", aktivita = "*",}
	const enum GAdxVyberovaSkupinaObsahDtoTypes { Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_blk = "string", typ_subj = "number", sxs_subj = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", aktivita = "number",}
	const enum GAdxVyberovaSkupinaObsahDtoTypeLengths { ixs_blk = 12, sxs_subj = 200, poznamka = 50, zmenu_prov = 12, nazev = 50,}
	/**Položka výběrové skupiny*/
	interface GAdxPolozkaVyberoveSkupinaSelectDto extends Gordic.Adx.Interface.GWfldblkDto {
		/**Typ subjektu (txt)*/
		typ_subj_txt?: string|null;
	}
	const enum GAdxPolozkaVyberoveSkupinaSelectDtoNames { typ_subj_txt = "typ_subj_txt", ixs_blk = "ixs_blk", typ_subj = "typ_subj", sxs_subj = "sxs_subj", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", aktivita = "aktivita",}
	const enum GAdxPolozkaVyberoveSkupinaSelectDtoFragments { typ_subj_txt = "*", ixs_blk = "*", typ_subj = "*", sxs_subj = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", aktivita = "*",}
	const enum GAdxPolozkaVyberoveSkupinaSelectDtoTypes { typ_subj_txt = "string", ixs_blk = "string", typ_subj = "number", sxs_subj = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", aktivita = "number",}
	const enum GAdxPolozkaVyberoveSkupinaSelectDtoTypeLengths { ixs_blk = 12, sxs_subj = 200, poznamka = 50, zmenu_prov = 12, nazev = 50,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdxVyberovaSkupinaObsahFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Poznámkový blok*/
		ixs_blk,
		/**PK tabulky - Typ subjektu*/
		typ_subj,
		/**PK tabulky - Sxs subjektu*/
		sxs_subj,
	}
}

//#endregion

