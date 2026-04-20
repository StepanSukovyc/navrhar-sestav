/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       fuc.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Fuc.Interface\Gordic.Fuc.Interface.csproj
*    created     2026-02-16 14:33:51
*    files       Controls\DTO\Gordic.Fuc.Interface.GBuccbvyDto.d.ts
*                Controls\DTO\Gordic.Fuc.Interface.GFuccssoDto.d.ts
*                Controls\DTO\Gordic.Fuc.Interface.GFuccsucDto.d.ts
*                Controls\DTO\Gordic.Fuc.Interface.GFuccsuoDto.d.ts
*                Controls\DTO\Gordic.Fuc.Interface.GFuccsupDto.d.ts
*                Init\Dto\Gordic.Fuc.Interface.GFucSeznamDuctDto.d.ts
*                Init\Dto\Gordic.Fuc.Interface.GFucSeznamDuctWflDto.d.ts
*                MylnaPlatba\Gordic.Fuc.Interface.IGMylnaPlatba.d.ts
*                MylnaPlatba\Gordic.Fuc.Interface.IGMylnaPlatbaHistorie.d.ts
*                MylnaPlatba\Dto\Gordic.Fuc.Interface.GMylnaPlatbaDto.d.ts
*                MylnaPlatba\Dto\Gordic.Fuc.Interface.GMylnaPlatbaFilterDto.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGAgenda.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGHledani.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGIissp.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGKniha.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGKniha2.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGPomocne.d.ts
*                Ostatni\Gordic.Fuc.Interface.IGZpz.d.ts
*                Ostatni\Dto\Gordic.Fuc.Interface.GFucductDto.d.ts
*                Ostatni\Dto\Gordic.Fuc.Interface.GIisspDto.d.ts
*                Ostatni\Dto\Gordic.Fuc.Interface.GKnihaDto.d.ts
*                Ostatni\Dto\Gordic.Fuc.Interface.GUeTeNksUusDto.d.ts
*                Ostatni\Dto\Gordic.Fuc.Interface.GZpzDto.d.ts
*                Platba\Gordic.Fuc.Interface.IGBankovniVypis.d.ts
*                Platba\Gordic.Fuc.Interface.IGPlatba.d.ts
*                Platba\Dto\Gordic.Fuc.Interface.GBankovniVypisDto.d.ts
*                Platba\Dto\Gordic.Fuc.Interface.GPlatbaDto.d.ts
*                Pohyb\Gordic.Fuc.Interface.IGHistorieUctovani.d.ts
*                Pohyb\Gordic.Fuc.Interface.IGPohyb.d.ts
*                Pohyb\Gordic.Fuc.Interface.IGZapis.d.ts
*                Pohyb\Dto\Gordic.Fuc.Interface.GHistorieUctovaniDto.d.ts
*                Pohyb\Dto\Gordic.Fuc.Interface.GPohybDto.d.ts
*                Pohyb\Dto\Gordic.Fuc.Interface.GPohybFilterDto.d.ts
*                Pohyb\Dto\Gordic.Fuc.Interface.GTypUprVUctovaniDto.d.ts
*                Pohyb\Dto\Gordic.Fuc.Interface.GZapisDto.d.ts
*                Pripad\Gordic.Fuc.Interface.IGPripad.d.ts
*                Pripad\Dto\Gordic.Fuc.Interface.GPripadDto.d.ts
*                Soupiska\Gordic.Fuc.Interface.IGSoupiska.d.ts
*                Soupiska\Dto\Gordic.Fuc.Interface.GSoupiskaDto.d.ts
*                Soupiska\Dto\Gordic.Fuc.Interface.GSoupiskaFilterDto.d.ts
*                ZapoctovyList\Gordic.Fuc.Interface.IGZapoctovyList.d.ts
*                ZapoctovyList\Dto\Gordic.Fuc.Interface.GZapoctovyListDto.d.ts
*                ZapoctovyList\Dto\Gordic.Fuc.Interface.GZapoctovyListFilterDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Controls\DTO\Gordic.Fuc.Interface.GBuccbvyDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Číselník Buccbvy (stavy bankovních výpisů)*/
	interface GBuccbvyDto {
		/**stav bankovního výpisu*/
		s_bvy?: number|null;
		/**název stavu bankovního výpisu*/
		s_bvy_txt?: string|null;
		/**zkratka stavu bankovního výpisu*/
		s_bvy_zkr?: string|null;
		/**název stavu bankovního výpisu pro zápočtové listy*/
		s_bvy_zl_txt?: string|null;
	}
	const enum GBuccbvyDtoNames { s_bvy = "s_bvy", s_bvy_txt = "s_bvy_txt", s_bvy_zkr = "s_bvy_zkr", s_bvy_zl_txt = "s_bvy_zl_txt",}
	const enum GBuccbvyDtoFragments { s_bvy = "Base", s_bvy_txt = "Base", s_bvy_zkr = "Base", s_bvy_zl_txt = "Base",}
	const enum GBuccbvyDtoTypes { s_bvy = "number", s_bvy_txt = "string", s_bvy_zkr = "string", s_bvy_zl_txt = "string",}
	const enum GBuccbvyDtoTypeLengths { s_bvy_txt = 50, s_bvy_zkr = 16, s_bvy_zl_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Controls\DTO\Gordic.Fuc.Interface.GFuccssoDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Číselník Fuccsso (stavy soupisky)*/
	interface GFuccssoDto {
		/**stav soupisky*/
		s_soup?: number|null;
		/**název stavu soupisky*/
		s_soup_txt?: string|null;
	}
	const enum GFuccssoDtoNames { s_soup = "s_soup", s_soup_txt = "s_soup_txt",}
	const enum GFuccssoDtoFragments { s_soup = "Base", s_soup_txt = "Base",}
	const enum GFuccssoDtoTypes { s_soup = "number", s_soup_txt = "string",}
	const enum GFuccssoDtoTypeLengths { s_soup_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Controls\DTO\Gordic.Fuc.Interface.GFuccsucDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Číselník Fuccsuc (stavy účtování)*/
	interface GFuccsucDto {
		/**stav účtování*/
		stav_uctovani?: number|null;
		/**název stavu účtování*/
		stav_uctovani_txt?: string|null;
	}
	const enum GFuccsucDtoNames { stav_uctovani = "stav_uctovani", stav_uctovani_txt = "stav_uctovani_txt",}
	const enum GFuccsucDtoFragments { stav_uctovani = "Base", stav_uctovani_txt = "Base",}
	const enum GFuccsucDtoTypes { stav_uctovani = "number", stav_uctovani_txt = "string",}
	const enum GFuccsucDtoTypeLengths { stav_uctovani_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Controls\DTO\Gordic.Fuc.Interface.GFuccsuoDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Číselník Fuccsuo (stavy pohybu)*/
	interface GFuccsuoDto {
		/**stav pohybu*/
		s_upo?: number|null;
		/**název stavu účetního pohybu*/
		s_upo_txt?: string|null;
		/**název stavu rezervačního pohybu*/
		s_upo_rez_txt?: string|null;
		/**kombinovaný název stavu účetního a rezervačního pohybu*/
		s_upo_ur_txt?: string|null;
	}
	const enum GFuccsuoDtoNames { s_upo = "s_upo", s_upo_txt = "s_upo_txt", s_upo_rez_txt = "s_upo_rez_txt", s_upo_ur_txt = "s_upo_ur_txt",}
	const enum GFuccsuoDtoFragments { s_upo = "Base", s_upo_txt = "Base", s_upo_rez_txt = "Base", s_upo_ur_txt = "Base",}
	const enum GFuccsuoDtoTypes { s_upo = "number", s_upo_txt = "string", s_upo_rez_txt = "string", s_upo_ur_txt = "string",}
	const enum GFuccsuoDtoTypeLengths { s_upo_txt = 50, s_upo_rez_txt = 50, s_upo_ur_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Controls\DTO\Gordic.Fuc.Interface.GFuccsupDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Číselník Fuccsup (stavy účetního případu)*/
	interface GFuccsupDto {
		/**stav účetního případu*/
		s_upr?: number|null;
		/**název stavu účetního případu*/
		s_upr_txt?: string|null;
	}
	const enum GFuccsupDtoNames { s_upr = "s_upr", s_upr_txt = "s_upr_txt",}
	const enum GFuccsupDtoFragments { s_upr = "Base", s_upr_txt = "Base",}
	const enum GFuccsupDtoTypes { s_upr = "number", s_upr_txt = "string",}
	const enum GFuccsupDtoTypeLengths { s_upr_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Init\Dto\Gordic.Fuc.Interface.GFucSeznamDuctDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Společný předek seznamového DTO se sloupce z tabulky fucduct*/
	interface GFucSeznamDuctDto {
		/**sloupec duct_txt_err (fucduct.txt_err)*/
		duct_txt_err?: string|null;
		/**sloupec duct_uncheck (fucduct.uncheck)*/
		duct_uncheck?: number|null;
		/**sloupec duct_uncheck (fucduct.uncheck)*/
		duct_kind?: number|null;
		/**zaškrtnutí pohybů (opak k databázovému duct_uncheck)*/
		duct_check?: boolean|null;
		/**Je záznam zašrtnutý?*/
		readonly IsChecked?: boolean|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
		/**Primární klíč tabulky v položkách filtrů (sloupce oddělené čárkami)*/
		readonly PrimaryKeyInFilters?: string|null;
	}
	const enum GFucSeznamDuctDtoNames { duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GFucSeznamDuctDtoFragments { duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GFucSeznamDuctDtoTypes { duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GFucSeznamDuctDtoTypeLengths { duct_txt_err = 254,}
	/**DTO s výsledkem hromadné operace pouštěné nad tabulkou fucduct*/
	interface GFucVyslHromDuctDto {
		/**celkový počet záznamů*/
		pocet_celk?: number|null;
		/**počet záznamů bez chyb*/
		pocet_ok?: number|null;
	}
	const enum GFucVyslHromDuctDtoNames { pocet_celk = "pocet_celk", pocet_ok = "pocet_ok",}
	const enum GFucVyslHromDuctDtoFragments { pocet_celk = "*", pocet_ok = "*",}
	const enum GFucVyslHromDuctDtoTypes { pocet_celk = "number", pocet_ok = "number",}
	const enum GFucVyslHromDuctDtoTypeLengths {}
	/**DTO s výsledkem kontroly hromadné operace pouštěné nad tabulkou fucduct*/
	interface GFucVyslHromKontrDuctDto {
		/**výsledek kontroly (true = v pořádku, false = chyba)*/
		vysl?: boolean|null;
		/**text chyby*/
		errTxt?: string|null;
		/**text potvrzovací otázky (pokud nebyla zjištěna chyba)*/
		textOtazky?: string|null;
	}
	const enum GFucVyslHromKontrDuctDtoNames { vysl = "vysl", errTxt = "errTxt", textOtazky = "textOtazky",}
	const enum GFucVyslHromKontrDuctDtoFragments { vysl = "*", errTxt = "*", textOtazky = "*",}
	const enum GFucVyslHromKontrDuctDtoTypes { vysl = "boolean", errTxt = "string", textOtazky = "string",}
	const enum GFucVyslHromKontrDuctDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Init\Dto\Gordic.Fuc.Interface.GFucSeznamDuctWflDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Společný předek seznamového DTO se sloupci z tabulky fucduct rozšířený o sloupce WFL*/
	interface GFucSeznamDuctWflDto extends Gordic.Fuc.Interface.GFucSeznamDuctDto {
		/**PID*/
		ixp?: string|null;
		/**přeevidence (0 - v aktuální knize, 1 - předáno z jiné knihy, 2 - předáno do jiné knihy)*/
		preevidence?: number|null;
		/**vlastnictví (0 - vlastní doklad, 1 - jiný zpracovatel)*/
		vlastnictvi?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**el. přílohy - počet příloh*/
		el_prilohy_pocet?: number|null;
	}
	const enum GFucSeznamDuctWflDtoNames { ixp = "ixp", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GFucSeznamDuctWflDtoFragments { ixp = "*", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GFucSeznamDuctWflDtoTypes { ixp = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GFucSeznamDuctWflDtoTypeLengths { ixp = 12, duct_txt_err = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\MylnaPlatba\Gordic.Fuc.Interface.IGMylnaPlatba.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Mylné platby
	* @domain FinUctarna
	*/
	interface MylnaPlatba {
		/**Načte detail mylné platby*/
		read(rq?:Gordic.Fuc.Interface.GMylnaPlatbaDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GMylnaPlatbaDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GMylnaPlatbaDto>,GServiceReadResponse<Gordic.Fuc.Interface.GMylnaPlatbaDto>>;
		/**Načte seznam mylných plateb*/
		list(rq?:Gordic.Fuc.Interface.GMylnaPlatbaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GMylnaPlatbaDto>>;
		/**Zjistí počet mylných plateb*/
		listCount(rq?:Gordic.Fuc.Interface.GMylnaPlatbaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Kontrola mylných plateb před likvidací*/
		zkontrolujPredZlikvidovanim(rq?:Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GMylnaPlatbaPkDto>>;
		/**Likvidace mylné platby*/
		zlikviduj(rq?:Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GMylnaPlatbaPkDto>>;
		/**Hromadná likvidace mylných plateb*/
		hromadneZlikviduj(rq?:Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GMylnaPlatbaLikvidaceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GMylnaPlatbaPkDto>>;
		/**Vrátí oprávnění mylných plateb (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GMylnaPlatbaServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MylnaPlatba: ServiceBase & Catalog.MylnaPlatba;
	}
	const MylnaPlatba: Client["MylnaPlatba"];
}
declare namespace Gordic.Fuc.Interface {
	/**Oprávnění pro jednu mylnou platbu*/
	interface GMylnaPlatbaPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze likvidovat*/
		LzeLikvidovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GMylnaPlatbaPermissionNames { LzeZobrazit = "LzeZobrazit", LzeLikvidovat = "LzeLikvidovat",}
	const enum GMylnaPlatbaPermissionFragments { LzeZobrazit = "*", LzeLikvidovat = "*",}
	const enum GMylnaPlatbaPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeLikvidovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GMylnaPlatbaPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GMylnaPlatbaPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GMylnaPlatbaPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GMylnaPlatbaPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GMylnaPlatbaPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GMylnaPlatbaPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro práci nad mylnými platbami*/
	interface GMylnaPlatbaServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze likvidovat*/
		LzeLikvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GMylnaPlatbaServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzeLikvidovat = "LzeLikvidovat", LzeTisknout = "LzeTisknout",}
	const enum GMylnaPlatbaServicePermissionFragments { LzeZobrazit = "*", LzeLikvidovat = "*", LzeTisknout = "*",}
	const enum GMylnaPlatbaServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeLikvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GMylnaPlatbaServicePermissionTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu mylných plateb*/
	const enum GMylnaPlatbaFilter {
		/**aktuální vlastník*/
		upr_ixs_fun_akt,
		/**kategorie případu*/
		upr_ktg_upr,
		/**typ agendy*/
		upr_typ_ag,
		/**kniha*/
		upr_ixp_den,
		/**typ účetního případu*/
		upr_typ_upr,
		/**kategorie typu dokladu*/
		upr_ktg_typ,
		/**popis případu*/
		upr_popis,
		/**poznámka případu*/
		upr_poznamka,
		/**stav případu*/
		upr_s_upr,
		/**defaultní stav případu*/
		upr_s_upr_def,
		/**stav mylné platby*/
		dmp_ixp_upr,
		/**stav mylné platby*/
		dmp_radek_upo,
		/**stav mylné platby*/
		dmp_stav_mp,
		/**mylná platba připravená k likvidaci*/
		dmp_stav_mp_pr_lik,
		/**výpisy - identifikátor*/
		upo_ixp_bvp,
		/**výpisy - číslo*/
		vyp_cis_pid,
		/**výpisy - rok*/
		vyp_rok_pid,
		/**výpisy - zkombinovaná položka vlastního účtu*/
		vyp_vl_ucet_komb,
		/**výpisy - datum výpisu*/
		vyp_dat_nov_zus,
		/**položky - konstantní symbol*/
		upo_ks,
		/**položky - variabilní symbol*/
		upo_vs,
		/**položky - specifický symbol*/
		upo_ss,
		/**pohyby - rok aktuálního příhlášení*/
		upo_akt_rok,
		/**položky - zkombinovaná položka cizího účtu*/
		pol_ci_ucet_komb,
		/**položky - cizí účet*/
		pol_bu_ci,
		/**položky - cizí směrový kód*/
		pol_sk_ci,
		/**položky - datum zaplacení*/
		upo_dat_upo,
		/**položky - částka*/
		upo_c_upo,
		/**položky - popis*/
		upo_popis_upo,
		/**existence v tabulce fucduct*/
		duct_ano,
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck,
		/**IKC v tabulce fucduct*/
		duct_ikc,
		/**pomocná vazba na tabulku fucduct místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_duct,
	}
	/**Způsob likvidace mylné platby*/
	const enum ZpusobLikvidaceMylnePlatby {
		/**nezlikvidována*/
		Nezlikvidovana=0,
		/**odpárování*/
		Odparovani=10,
		/**přepárování*/
		Preparovani=20,
		/**založení výdajového poukazu do POU*/
		ZalozeniPoukazu=30,
		/**založení výdajového přepoukazu do PRE*/
		ZalozeniPrepoukazu=40,
	}
	/**Fáze likvidace mylné platby (přes průvodce)*/
	const enum FazeLikvidaceMylnePlatbyWizard {
		/**kontrola platby a volba způsobu likvidace*/
		VyberZpusobu=0,
		/**zadání parametrů podle způsobu likvidace*/
		ZadaniParametru=1,
		/**ukončení*/
		Ukonceni=2,
		/**není (použitelné pouze pro minulou fázi)*/
		Neni=-1,
	}
	/**Parametry rezervování pohybu*/
	interface GMylnaPlatbaLikvidaceOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GMylnaPlatbaDto> {
		/**způsob likvidace*/
		zpusob_likvidace?: Gordic.Fuc.Interface.ZpusobLikvidaceMylnePlatby|null;
		/**odpárování nebo přepárování - datum UÚP - rok*/
		buc_uup_rok?: number|null;
		/**odpárování nebo přepárování - datum UÚP - měsíc*/
		buc_uup_mesic?: number|null;
		/**odpárování nebo přepárování - datum UÚP - den*/
		buc_uup_den?: number|null;
		/**odpárování - pokyn pro párování*/
		buc_pokyn_pro_par?: string|null;
		/**založení poukazu nebo přepoukazu - kniha*/
		bpl_ixp_den?: string|null;
		/**založení poukazu nebo přepoukazu - funkce*/
		bpl_ixs_fun?: string|null;
		/**založení poukazu nebo přepoukazu - typ dokladu*/
		bpl_ixs_typ?: string|null;
		/**založení poukazu nebo přepoukazu - externí subjekt (pro přepoukaz se neplní)*/
		bpl_ixs_esu?: string|null;
		/**založení poukazu nebo přepoukazu - popis poukazu/přepoukazu*/
		bpl_popis?: string|null;
		/**založení poukazu nebo přepoukazu - variabilní symbol*/
		bpl_vs?: string|null;
		/**založení poukazu nebo přepoukazu - konstantní symbol*/
		bpl_ks?: string|null;
		/**založení poukazu nebo přepoukazu - specifický symbol*/
		bpl_ss?: string|null;
		/**založení poukazu nebo přepoukazu - směrový kód vlastní (pro přepoukaz vlastní výdajový)*/
		bpl_sk_vl?: string|null;
		/**založení poukazu nebo přepoukazu - bankovní účet vlastní (pro přepoukaz vlastní výdajový)*/
		bpl_bu_vl?: string|null;
		/**založení poukazu - směrový kód cizí*/
		bpl_sk_ci?: string|null;
		/**založení poukazu - bankovní účet cizí*/
		bpl_bu_ci?: string|null;
		/**založení přepoukazu - směrový kód vlastní příjmový*/
		bpl_sk_vl_pri?: string|null;
		/**založení přepoukazu - bankovní účet vlastní příjmový*/
		bpl_bu_vl_pri?: string|null;
		/**založení poukazu nebo přepoukazu - částka*/
		bpl_c?: JsonDecimal|null;
		/**založení poukazu nebo přepoukazu - datum vystavení*/
		bpl_dat_vyst?: JsonDate|null;
		/**založení poukazu nebo přepoukazu - kompetent (lze null)*/
		bpl_ixs_fun_vyriz?: string|null;
	}
	const enum GMylnaPlatbaLikvidaceOperationDtoNames { zpusob_likvidace = "zpusob_likvidace", buc_uup_rok = "buc_uup_rok", buc_uup_mesic = "buc_uup_mesic", buc_uup_den = "buc_uup_den", buc_pokyn_pro_par = "buc_pokyn_pro_par", bpl_ixp_den = "bpl_ixp_den", bpl_ixs_fun = "bpl_ixs_fun", bpl_ixs_typ = "bpl_ixs_typ", bpl_ixs_esu = "bpl_ixs_esu", bpl_popis = "bpl_popis", bpl_vs = "bpl_vs", bpl_ks = "bpl_ks", bpl_ss = "bpl_ss", bpl_sk_vl = "bpl_sk_vl", bpl_bu_vl = "bpl_bu_vl", bpl_sk_ci = "bpl_sk_ci", bpl_bu_ci = "bpl_bu_ci", bpl_sk_vl_pri = "bpl_sk_vl_pri", bpl_bu_vl_pri = "bpl_bu_vl_pri", bpl_c = "bpl_c", bpl_dat_vyst = "bpl_dat_vyst", bpl_ixs_fun_vyriz = "bpl_ixs_fun_vyriz", ikc = "ikc", rows = "rows",}
	const enum GMylnaPlatbaLikvidaceOperationDtoFragments { zpusob_likvidace = "*", buc_uup_rok = "*", buc_uup_mesic = "*", buc_uup_den = "*", buc_pokyn_pro_par = "*", bpl_ixp_den = "*", bpl_ixs_fun = "*", bpl_ixs_typ = "*", bpl_ixs_esu = "*", bpl_popis = "*", bpl_vs = "*", bpl_ks = "*", bpl_ss = "*", bpl_sk_vl = "*", bpl_bu_vl = "*", bpl_sk_ci = "*", bpl_bu_ci = "*", bpl_sk_vl_pri = "*", bpl_bu_vl_pri = "*", bpl_c = "*", bpl_dat_vyst = "*", bpl_ixs_fun_vyriz = "*", ikc = "*", rows = "*",}
	const enum GMylnaPlatbaLikvidaceOperationDtoTypes { zpusob_likvidace = "Gordic.Fuc.Interface.ZpusobLikvidaceMylnePlatby", buc_uup_rok = "number", buc_uup_mesic = "number", buc_uup_den = "number", buc_pokyn_pro_par = "string", bpl_ixp_den = "string", bpl_ixs_fun = "string", bpl_ixs_typ = "string", bpl_ixs_esu = "string", bpl_popis = "string", bpl_vs = "string", bpl_ks = "string", bpl_ss = "string", bpl_sk_vl = "string", bpl_bu_vl = "string", bpl_sk_ci = "string", bpl_bu_ci = "string", bpl_sk_vl_pri = "string", bpl_bu_vl_pri = "string", bpl_c = "JsonDecimal", bpl_dat_vyst = "JsonDate", bpl_ixs_fun_vyriz = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GMylnaPlatbaDto[]",}
	const enum GMylnaPlatbaLikvidaceOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\MylnaPlatba\Gordic.Fuc.Interface.IGMylnaPlatbaHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie mylné platby
	* @domain FinUctarna
	*/
	interface MylnaPlatbaHistorie {
		/**Načte seznam mylných plateb*/
		list(rq?:Gordic.Fuc.Interface.GMylnaPlatbaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GHistorieMylnePlatbyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MylnaPlatbaHistorie: ServiceBase & Catalog.MylnaPlatbaHistorie;
	}
	const MylnaPlatbaHistorie: Client["MylnaPlatbaHistorie"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\MylnaPlatba\Dto\Gordic.Fuc.Interface.GMylnaPlatbaDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Mylná platba*/
	interface GMylnaPlatbaDto extends Gordic.Fuc.Interface.GFucSeznamDuctDto {
		/**DBCOLUMN:DetailMylnePlatby.dmp_ixp_upr*/
		dmp_ixp_upr?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_radek_upo*/
		dmp_radek_upo?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_stav_mp*/
		dmp_stav_mp?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_ixp_lik*/
		dmp_ixp_lik?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_dat_zal*/
		dmp_dat_zal?: JsonDate|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_ixs_zmp_zal*/
		dmp_ixs_zmp_zal?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_zmp_zal*/
		dmp_zmp_zal?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_dat_odp*/
		dmp_dat_odp?: JsonDate|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_ixs_zmp_odp*/
		dmp_ixs_zmp_odp?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_zmp_odp*/
		dmp_zmp_odp?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_dat_lik*/
		dmp_dat_lik?: JsonDate|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_ixs_zmp_lik*/
		dmp_ixs_zmp_lik?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_zmp_lik*/
		dmp_zmp_lik?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_s_zau_bpl*/
		dmp_s_zau_bpl?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_s_uhr_bpl*/
		dmp_s_uhr_bpl?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_ixp_bvp*/
		upo_ixp_bvp?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_radek_bvp*/
		upo_radek_bvp?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_subradek_bvp*/
		upo_subradek_bvp?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_radek_av_bvp*/
		upo_radek_av_bvp?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_uus*/
		upo_uus?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_rok*/
		upo_rok?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_mesic*/
		upo_mesic?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_den*/
		upo_den?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_s_upo*/
		upo_s_upo?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_s_sto*/
		upo_s_sto?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_c_upo*/
		upo_c_upo?: JsonDecimal|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_c_mena*/
		upo_c_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_mena*/
		upo_mena?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_znam*/
		upo_znam?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.upo_popis_upo*/
		upo_popis_upo?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.vyp_sk_vl*/
		vyp_sk_vl?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.vyp_bu_vl*/
		vyp_bu_vl?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.vyp_dat_nov_zus*/
		vyp_dat_nov_zus?: JsonDate|null;
		/**DBCOLUMN:DetailMylnePlatby.vyp_rok_pid*/
		vyp_rok_pid?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.vyp_cis_pid*/
		vyp_cis_pid?: number|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_sk_ci*/
		pol_sk_ci?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_bu_ci*/
		pol_bu_ci?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_dat_zap*/
		pol_dat_zap?: JsonDate|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_vs*/
		pol_vs?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_ks*/
		pol_ks?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_ss*/
		pol_ss?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_pokyn*/
		pol_pokyn?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.pol_nazev*/
		pol_nazev?: string|null;
		/**je výpis odlitý? (0 = ne, >0 = ano)*/
		vyp_priz_xx?: number|null;
		/**složený vlastní bú*/
		vyp_bu_vl_txt?: string|null;
		/**složený cizí bú*/
		pol_bu_ci_txt?: string|null;
		/**zkratka stavu likvidace*/
		dmp_stav_mp_zkr?: string|null;
		/**název stavu likvidace*/
		dmp_stav_mp_txt?: string|null;
		/**zkratka k mena*/
		upo_mena_zkr?: string|null;
		/**složený bankovní výpis*/
		upo_bvp?: string|null;
		/**složená položka výpisu*/
		upo_pol_bvp?: string|null;
		/**stav likvidace v agendě*/
		bpl_stav_ag?: string|null;
		/**pole historie mylné platby*/
		historie?: Gordic.Fuc.Interface.GHistorieMylnePlatbyDto[]|null;
		/**Je mylná platba zlikvidovaná?*/
		readonly JeZlikvidovana?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GMylnaPlatbaPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GMylnaPlatbaDtoNames { dmp_ixp_upr = "dmp_ixp_upr", dmp_radek_upo = "dmp_radek_upo", dmp_stav_mp = "dmp_stav_mp", dmp_ixp_lik = "dmp_ixp_lik", dmp_dat_zal = "dmp_dat_zal", dmp_ixs_zmp_zal = "dmp_ixs_zmp_zal", dmp_zmp_zal = "dmp_zmp_zal", dmp_dat_odp = "dmp_dat_odp", dmp_ixs_zmp_odp = "dmp_ixs_zmp_odp", dmp_zmp_odp = "dmp_zmp_odp", dmp_dat_lik = "dmp_dat_lik", dmp_ixs_zmp_lik = "dmp_ixs_zmp_lik", dmp_zmp_lik = "dmp_zmp_lik", dmp_s_zau_bpl = "dmp_s_zau_bpl", dmp_s_uhr_bpl = "dmp_s_uhr_bpl", upo_ixp_bvp = "upo_ixp_bvp", upo_radek_bvp = "upo_radek_bvp", upo_subradek_bvp = "upo_subradek_bvp", upo_radek_av_bvp = "upo_radek_av_bvp", upo_uus = "upo_uus", upo_rok = "upo_rok", upo_mesic = "upo_mesic", upo_den = "upo_den", upo_s_upo = "upo_s_upo", upo_s_sto = "upo_s_sto", upo_c_upo = "upo_c_upo", upo_c_mena = "upo_c_mena", upo_mena = "upo_mena", upo_znam = "upo_znam", upo_popis_upo = "upo_popis_upo", vyp_sk_vl = "vyp_sk_vl", vyp_bu_vl = "vyp_bu_vl", vyp_dat_nov_zus = "vyp_dat_nov_zus", vyp_rok_pid = "vyp_rok_pid", vyp_cis_pid = "vyp_cis_pid", pol_sk_ci = "pol_sk_ci", pol_bu_ci = "pol_bu_ci", pol_dat_zap = "pol_dat_zap", pol_vs = "pol_vs", pol_ks = "pol_ks", pol_ss = "pol_ss", pol_pokyn = "pol_pokyn", pol_nazev = "pol_nazev", vyp_priz_xx = "vyp_priz_xx", vyp_bu_vl_txt = "vyp_bu_vl_txt", pol_bu_ci_txt = "pol_bu_ci_txt", dmp_stav_mp_zkr = "dmp_stav_mp_zkr", dmp_stav_mp_txt = "dmp_stav_mp_txt", upo_mena_zkr = "upo_mena_zkr", upo_bvp = "upo_bvp", upo_pol_bvp = "upo_pol_bvp", bpl_stav_ag = "bpl_stav_ag", historie = "historie", JeZlikvidovana = "JeZlikvidovana", Permissions = "Permissions", PrimaryKey = "PrimaryKey", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GMylnaPlatbaDtoFragments { dmp_ixp_upr = "Base", dmp_radek_upo = "Base", dmp_stav_mp = "Base", dmp_ixp_lik = "Base", dmp_dat_zal = "historie", dmp_ixs_zmp_zal = "historie", dmp_zmp_zal = "historie", dmp_dat_odp = "historie", dmp_ixs_zmp_odp = "historie", dmp_zmp_odp = "historie", dmp_dat_lik = "historie", dmp_ixs_zmp_lik = "historie", dmp_zmp_lik = "historie", dmp_s_zau_bpl = "stav_zauctovani_bpl", dmp_s_uhr_bpl = "stav_uhrady_bpl", upo_ixp_bvp = "Base", upo_radek_bvp = "Base", upo_subradek_bvp = "Base", upo_radek_av_bvp = "Base", upo_uus = "Base", upo_rok = "Base", upo_mesic = "Base", upo_den = "Base", upo_s_upo = "Base", upo_s_sto = "Base", upo_c_upo = "Base", upo_c_mena = "Base", upo_mena = "Base", upo_znam = "Base", upo_popis_upo = "Base", vyp_sk_vl = "Base", vyp_bu_vl = "Base", vyp_dat_nov_zus = "Base", vyp_rok_pid = "Base", vyp_cis_pid = "Base", pol_sk_ci = "Base", pol_bu_ci = "Base", pol_dat_zap = "Base", pol_vs = "Base", pol_ks = "Base", pol_ss = "Base", pol_pokyn = "Base", pol_nazev = "Base", vyp_priz_xx = "Base", vyp_bu_vl_txt = "Base", pol_bu_ci_txt = "Base", dmp_stav_mp_zkr = "stav_likvidace", dmp_stav_mp_txt = "stav_likvidace", upo_mena_zkr = "mena", upo_bvp = "Base", upo_pol_bvp = "Base", bpl_stav_ag = "stav_bpl", historie = "historie", JeZlikvidovana = "*", Permissions = "Permissions", PrimaryKey = "*", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GMylnaPlatbaDtoTypes { dmp_ixp_upr = "string", dmp_radek_upo = "number", dmp_stav_mp = "number", dmp_ixp_lik = "string", dmp_dat_zal = "JsonDate", dmp_ixs_zmp_zal = "string", dmp_zmp_zal = "string", dmp_dat_odp = "JsonDate", dmp_ixs_zmp_odp = "string", dmp_zmp_odp = "string", dmp_dat_lik = "JsonDate", dmp_ixs_zmp_lik = "string", dmp_zmp_lik = "string", dmp_s_zau_bpl = "number", dmp_s_uhr_bpl = "number", upo_ixp_bvp = "string", upo_radek_bvp = "number", upo_subradek_bvp = "number", upo_radek_av_bvp = "number", upo_uus = "string", upo_rok = "number", upo_mesic = "number", upo_den = "number", upo_s_upo = "number", upo_s_sto = "number", upo_c_upo = "JsonDecimal", upo_c_mena = "JsonDecimal", upo_mena = "number", upo_znam = "number", upo_popis_upo = "string", vyp_sk_vl = "string", vyp_bu_vl = "string", vyp_dat_nov_zus = "JsonDate", vyp_rok_pid = "number", vyp_cis_pid = "number", pol_sk_ci = "string", pol_bu_ci = "string", pol_dat_zap = "JsonDate", pol_vs = "string", pol_ks = "string", pol_ss = "string", pol_pokyn = "string", pol_nazev = "string", vyp_priz_xx = "number", vyp_bu_vl_txt = "string", pol_bu_ci_txt = "string", dmp_stav_mp_zkr = "string", dmp_stav_mp_txt = "string", upo_mena_zkr = "string", upo_bvp = "string", upo_pol_bvp = "string", bpl_stav_ag = "string", historie = "Gordic.Fuc.Interface.GHistorieMylnePlatbyDto[]", JeZlikvidovana = "boolean", Permissions = "Gordic.Fuc.Interface.GMylnaPlatbaPermission", PrimaryKey = "string", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GMylnaPlatbaDtoTypeLengths { dmp_ixp_upr = 12, dmp_ixp_lik = 12, dmp_ixs_zmp_zal = 12, dmp_zmp_zal = 254, dmp_ixs_zmp_odp = 12, dmp_zmp_odp = 254, dmp_ixs_zmp_lik = 12, dmp_zmp_lik = 254, upo_ixp_bvp = 12, upo_uus = 10, upo_popis_upo = 254, vyp_sk_vl = 11, vyp_bu_vl = 34, pol_sk_ci = 11, pol_bu_ci = 34, pol_vs = 12, pol_ks = 12, pol_ss = 12, pol_pokyn = 254, pol_nazev = 254, duct_txt_err = 254,}
	/**DBTABLE:~*/
	interface GHistorieMylnePlatbyDto {
		/**DBCOLUMN:SeznamHistorieMylnePlatby.ixp_upr*/
		ixp_upr?: string|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.zmena_txt*/
		zmena_txt?: string|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamHistorieMylnePlatby.poznamka*/
		poznamka?: string|null;
	}
	const enum GHistorieMylnePlatbyDtoNames { ixp_upr = "ixp_upr", radek_upo = "radek_upo", zmena_txt = "zmena_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo = "por_cislo", nazev_rf = "nazev_rf", poznamka = "poznamka",}
	const enum GHistorieMylnePlatbyDtoFragments { ixp_upr = "Base", radek_upo = "Base", zmena_txt = "Base", dat_zmena = "Base", zmenu_prov = "Base", por_cislo = "Base", nazev_rf = "Base", poznamka = "Base",}
	const enum GHistorieMylnePlatbyDtoTypes { ixp_upr = "string", radek_upo = "number", zmena_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo = "number", nazev_rf = "string", poznamka = "string",}
	const enum GHistorieMylnePlatbyDtoTypeLengths { ixp_upr = 12, zmena_txt = 50, zmenu_prov = 12, nazev_rf = 254, poznamka = 254,}
	/**vstup pro historii mylné platby*/
	interface GHistorieMylnePlatbyInputDto {
		/**filtry*/
		filter?: Gordic.Fuc.Interface.GMylnaPlatbaFilterDto|null;
		/**PID případu*/
		ixp_upr?: string|null;
		/**řádek pohybu*/
		radek_upo?: number|null;
		/**vlastník*/
		ixs_fun_akt?: string|null;
	}
	const enum GHistorieMylnePlatbyInputDtoNames { filter = "filter", ixp_upr = "ixp_upr", radek_upo = "radek_upo", ixs_fun_akt = "ixs_fun_akt",}
	const enum GHistorieMylnePlatbyInputDtoFragments { filter = "*", ixp_upr = "*", radek_upo = "*", ixs_fun_akt = "*",}
	const enum GHistorieMylnePlatbyInputDtoTypes { filter = "Gordic.Fuc.Interface.GMylnaPlatbaFilterDto", ixp_upr = "string", radek_upo = "number", ixs_fun_akt = "string",}
	const enum GHistorieMylnePlatbyInputDtoTypeLengths { ixp_upr = 12, ixs_fun_akt = 12,}
	/**DBTABLE:~*/
	interface GMylnaPlatbaPkDto {
		/**DBCOLUMN:DetailMylnePlatby.dmp_ixp_upr*/
		dmp_ixp_upr?: string|null;
		/**DBCOLUMN:DetailMylnePlatby.dmp_radek_upo*/
		dmp_radek_upo?: number|null;
	}
	const enum GMylnaPlatbaPkDtoNames { dmp_ixp_upr = "dmp_ixp_upr", dmp_radek_upo = "dmp_radek_upo",}
	const enum GMylnaPlatbaPkDtoFragments { dmp_ixp_upr = "*", dmp_radek_upo = "*",}
	const enum GMylnaPlatbaPkDtoTypes { dmp_ixp_upr = "string", dmp_radek_upo = "number",}
	const enum GMylnaPlatbaPkDtoTypeLengths { dmp_ixp_upr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\MylnaPlatba\Dto\Gordic.Fuc.Interface.GMylnaPlatbaFilterDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Filtr seznamu mylných plateb*/
	interface GMylnaPlatbaFilterDto {
		/**aktuální vlastník*/
		upr_ixs_fun_akt?: string|null;
		/**kategorie případu*/
		upr_ktg_upr?: GBaseFilter<number>|null;
		/**typ agendy*/
		upr_typ_ag?: GBaseFilter<number>|null;
		/**kniha*/
		upr_ixp_den?: GBaseFilter<string>|null;
		/**typ účetního případu*/
		upr_typ_upr?: GBaseFilter<string>|null;
		/**kategorie typu dokladu*/
		upr_ktg_typ?: GBaseFilter<number>|null;
		/**popis případu*/
		upr_popis?: string|null;
		/**poznámka případu*/
		upr_poznamka?: string|null;
		/**stav případu*/
		upr_s_upr?: GBaseFilter<number>|null;
		/**defaultní stav případu*/
		upr_s_upr_def?: GBaseFilter<number>|null;
		/**stav mylné platby*/
		dmp_ixp_upr?: GBaseFilter<string>|null;
		/**stav mylné platby*/
		dmp_radek_upo?: GBaseFilter<number>|null;
		/**stav mylné platby*/
		dmp_stav_mp?: GBaseFilter<number>|null;
		/**mylná platba připravená k likvidaci*/
		dmp_stav_mp_pr_lik?: GBaseFilter<number>|null;
		/**výpisy - identifikátor*/
		upo_ixp_bvp?: string|null;
		/**výpisy - číslo*/
		vyp_cis_pid?: number|null;
		/**výpisy - rok*/
		vyp_rok_pid?: number|null;
		/**výpisy - zkombinovaná položka vlastního účtu*/
		vyp_vl_ucet_komb?: string|null;
		/**výpisy - datum výpisu*/
		vyp_dat_nov_zus?: GIntervalDto<JsonDate>|null;
		/**položky - konstantní symbol*/
		upo_ks?: string|null;
		/**položky - variabilní symbol*/
		upo_vs?: string|null;
		/**položky - specifický symbol*/
		upo_ss?: string|null;
		/**pohyby - rok aktuálního příhlášení*/
		upo_akt_rok?: boolean|null;
		/**položky - zkombinovaná položka cizího účtu*/
		pol_ci_ucet_komb?: string|null;
		/**položky - cizí účet*/
		pol_bu_ci?: string|null;
		/**položky - cizí směrový kód*/
		pol_sk_ci?: string|null;
		/**položky - datum zaplacení*/
		upo_dat_upo?: GIntervalDto<JsonDate>|null;
		/**položky - částka*/
		upo_c_upo?: GIntervalDto<JsonDecimal>|null;
		/**položky - popis*/
		upo_popis_upo?: string|null;
		/**existence v tabulce fucduct*/
		duct_ano?: number|null;
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck?: number|null;
		/**IKC v tabulce fucduct*/
		duct_ikc?: Gordic.General.GIkc|null;
	}
	const enum GMylnaPlatbaFilterDtoNames { upr_ixs_fun_akt = "upr_ixs_fun_akt", upr_ktg_upr = "upr_ktg_upr", upr_typ_ag = "upr_typ_ag", upr_ixp_den = "upr_ixp_den", upr_typ_upr = "upr_typ_upr", upr_ktg_typ = "upr_ktg_typ", upr_popis = "upr_popis", upr_poznamka = "upr_poznamka", upr_s_upr = "upr_s_upr", upr_s_upr_def = "upr_s_upr_def", dmp_ixp_upr = "dmp_ixp_upr", dmp_radek_upo = "dmp_radek_upo", dmp_stav_mp = "dmp_stav_mp", dmp_stav_mp_pr_lik = "dmp_stav_mp_pr_lik", upo_ixp_bvp = "upo_ixp_bvp", vyp_cis_pid = "vyp_cis_pid", vyp_rok_pid = "vyp_rok_pid", vyp_vl_ucet_komb = "vyp_vl_ucet_komb", vyp_dat_nov_zus = "vyp_dat_nov_zus", upo_ks = "upo_ks", upo_vs = "upo_vs", upo_ss = "upo_ss", upo_akt_rok = "upo_akt_rok", pol_ci_ucet_komb = "pol_ci_ucet_komb", pol_bu_ci = "pol_bu_ci", pol_sk_ci = "pol_sk_ci", upo_dat_upo = "upo_dat_upo", upo_c_upo = "upo_c_upo", upo_popis_upo = "upo_popis_upo", duct_ano = "duct_ano", duct_uncheck = "duct_uncheck", duct_ikc = "duct_ikc",}
	const enum GMylnaPlatbaFilterDtoFragments { upr_ixs_fun_akt = "*", upr_ktg_upr = "*", upr_typ_ag = "*", upr_ixp_den = "*", upr_typ_upr = "*", upr_ktg_typ = "*", upr_popis = "*", upr_poznamka = "*", upr_s_upr = "*", upr_s_upr_def = "*", dmp_ixp_upr = "*", dmp_radek_upo = "*", dmp_stav_mp = "*", dmp_stav_mp_pr_lik = "*", upo_ixp_bvp = "*", vyp_cis_pid = "*", vyp_rok_pid = "*", vyp_vl_ucet_komb = "*", vyp_dat_nov_zus = "*", upo_ks = "*", upo_vs = "*", upo_ss = "*", upo_akt_rok = "*", pol_ci_ucet_komb = "*", pol_bu_ci = "*", pol_sk_ci = "*", upo_dat_upo = "*", upo_c_upo = "*", upo_popis_upo = "*", duct_ano = "*", duct_uncheck = "*", duct_ikc = "*",}
	const enum GMylnaPlatbaFilterDtoTypes { upr_ixs_fun_akt = "string", upr_ktg_upr = "GBaseFilter<number>", upr_typ_ag = "GBaseFilter<number>", upr_ixp_den = "GBaseFilter<string>", upr_typ_upr = "GBaseFilter<string>", upr_ktg_typ = "GBaseFilter<number>", upr_popis = "string", upr_poznamka = "string", upr_s_upr = "GBaseFilter<number>", upr_s_upr_def = "GBaseFilter<number>", dmp_ixp_upr = "GBaseFilter<string>", dmp_radek_upo = "GBaseFilter<number>", dmp_stav_mp = "GBaseFilter<number>", dmp_stav_mp_pr_lik = "GBaseFilter<number>", upo_ixp_bvp = "string", vyp_cis_pid = "number", vyp_rok_pid = "number", vyp_vl_ucet_komb = "string", vyp_dat_nov_zus = "GIntervalDto<JsonDate>", upo_ks = "string", upo_vs = "string", upo_ss = "string", upo_akt_rok = "boolean", pol_ci_ucet_komb = "string", pol_bu_ci = "string", pol_sk_ci = "string", upo_dat_upo = "GIntervalDto<JsonDate>", upo_c_upo = "GIntervalDto<JsonDecimal>", upo_popis_upo = "string", duct_ano = "number", duct_uncheck = "number", duct_ikc = "Gordic.General.GIkc",}
	const enum GMylnaPlatbaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGAgenda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Agenda
	* @domain FinUctarna
	*/
	interface AgendaFuc {
		/**Načte seznam agend*/
		list(rq?:Gordic.Eko.Interface.GEkoAgendaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Kontrola agend před uzavřením / otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Fuc.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GAgendaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Uzavření / otevření agendy*/
		uzavri(rq?:Gordic.Fuc.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GAgendaUzavreniOperationDto>,GServiceActionResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Hromadné uzavření / zrušení uzavření předaných agend*/
		hromadneUzavri(rq?:Gordic.Fuc.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GAgendaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Vrátí oprávnění uzávěrky agendy (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
		/**Vrátí oprávnění uzávěrky agendy*/
		getPermissions(rq?:CallParams<{typAg:number}>): _Task<{typAg:number},Gordic.Eko.Interface.GEkoAgendaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AgendaFuc: ServiceBase & Catalog.AgendaFuc;
	}
	const AgendaFuc: Client["AgendaFuc"];
}
declare namespace Gordic.Fuc.Interface {
	/**Parametry uzavření / zrušení uzavření agendy*/
	interface GAgendaUzavreniOperationDto {
		/**požadovaná operace (true = uzavření, false = zrušení uzavření)*/
		uzavrit?: boolean|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: Gordic.Eko.Interface.GEkoAgendaDto[]|null;
	}
	const enum GAgendaUzavreniOperationDtoNames { uzavrit = "uzavrit", rows = "rows",}
	const enum GAgendaUzavreniOperationDtoFragments { uzavrit = "*", rows = "*",}
	const enum GAgendaUzavreniOperationDtoTypes { uzavrit = "boolean", rows = "Gordic.Eko.Interface.GEkoAgendaDto[]",}
	const enum GAgendaUzavreniOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání záznamů
	* @domain FinUctarna
	*/
	interface HledaniFuc {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniFuc: ServiceBase & Catalog.HledaniFuc;
	}
	const HledaniFuc: Client["HledaniFuc"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGIissp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rezervace ve státní pokladně
	* @domain FinUctarna
	*/
	interface Iissp {
		/**Načte stav IISSP*/
		read(rq?:Gordic.Fuc.Interface.GIisspDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GIisspDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GIisspDto>,GServiceReadResponse<Gordic.Fuc.Interface.GIisspDto>>;
		/**Načte položky IISSP*/
		listPolozek(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GPolozkaIisspDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Iissp: ServiceBase & Catalog.Iissp;
	}
	const Iissp: Client["Iissp"];
}
declare namespace Gordic.Fuc.Interface {
	/**Výčet filtračních kritérií pro filtr IISSP*/
	const enum GIisspFilter {
		/**PID rezervačního případu*/
		ixs_hpr,
		/**rok*/
		rok,
	}
	/**Výčet filtračních kritérií pro filtr položek IISSP*/
	const enum GPolozkaIisspFilter {
		/**id RIS*/
		id_hdr_ris,
		/**řádek RIS*/
		radek_hdr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha
	* @domain FinUctarna
	*/
	interface KnihaFuc {
		/**Načte seznam knih*/
		list(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoKnihaDto>>;
		/**Kontrola knih před uzavřením / otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Fuc.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GKnihaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Uzavření / otevření knihy*/
		uzavri(rq?:Gordic.Fuc.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GKnihaUzavreniOperationDto>,GServiceActionResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Hromadné uzavření / zrušení uzavření předaných knih*/
		hromadneUzavri(rq?:Gordic.Fuc.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GKnihaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Vrátí oprávnění uzávěrky knih (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoKnihaPermissions>;
		/**Vrátí oprávnění uzávěrky knihy*/
		getPermissions(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Eko.Interface.GEkoKnihaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		KnihaFuc: ServiceBase & Catalog.KnihaFuc;
	}
	const KnihaFuc: Client["KnihaFuc"];
}
declare namespace Gordic.Fuc.Interface {
	/**Parametry uzavření / zrušení uzavření knihy*/
	interface GKnihaUzavreniOperationDto {
		/**požadovaná operace (true = uzavření, false = zrušení uzavření)*/
		uzavrit?: boolean|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: Gordic.Eko.Interface.GEkoVybraneKnihyDto[]|null;
	}
	const enum GKnihaUzavreniOperationDtoNames { uzavrit = "uzavrit", rows = "rows",}
	const enum GKnihaUzavreniOperationDtoFragments { uzavrit = "*", rows = "*",}
	const enum GKnihaUzavreniOperationDtoTypes { uzavrit = "boolean", rows = "Gordic.Eko.Interface.GEkoVybraneKnihyDto[]",}
	const enum GKnihaUzavreniOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGKniha2.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu knih*/
	const enum GKnihaFilter {
		/**PID knihy*/
		ixp_den,
		/**rok*/
		rok,
		/**kategorie knihy*/
		ktg_den,
		/**aktivita subřady*/
		akt_subrady,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGPomocne.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pomocné metody
	* @domain FinUctarna
	*/
	interface PomocneFuc {
		/**Aktualizace názvů kontací a knih*/
		aktualizujNazvyKontaciAKnih(rq?:CallParams<{}>): _Task<{},void>;
		/**Vrácení všech typů dokumentů ke kategoriím typu dokumentů*/
		vratVsechnyIxsTyp(rq?:CallParams<{ktgTyp:number[]}>): _Task<{ktgTyp:number[]},string[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PomocneFuc: ServiceBase & Catalog.PomocneFuc;
	}
	const PomocneFuc: Client["PomocneFuc"];
}
declare namespace Gordic.Fuc.Interface {
	/**Společné parametry (hromadné) FUCové operace*/
	interface GFucOperationDto<TDto> {
		/**aktuální IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: TDto[]|null;
	}
	const enum GFucOperationDtoNames { ikc = "ikc", rows = "rows",}
	const enum GFucOperationDtoFragments { ikc = "*", rows = "*",}
	const enum GFucOperationDtoTypes { ikc = "Gordic.General.GIkc", rows = "TDto[]",}
	const enum GFucOperationDtoTypeLengths {}
	/**DTO pro vstup do asynchronní aktualizace názvů kontací a knih*/
	interface GAktualizaceNazvuInputDto {
	}
	const enum GAktualizaceNazvuInputDtoNames {}
	const enum GAktualizaceNazvuInputDtoFragments {}
	const enum GAktualizaceNazvuInputDtoTypes {}
	const enum GAktualizaceNazvuInputDtoTypeLengths {}
	/**DTO pro výstup z asynchronní aktualizace názvů kontací a knih*/
	interface GAktualizaceNazvuOutputDto {
	}
	const enum GAktualizaceNazvuOutputDtoNames {}
	const enum GAktualizaceNazvuOutputDtoFragments {}
	const enum GAktualizaceNazvuOutputDtoTypes {}
	const enum GAktualizaceNazvuOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Gordic.Fuc.Interface.IGZpz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Způsoby zaúčtování
	* @domain FinUctarna
	*/
	interface Zpz {
		/**Načte způsob zaúčtovíní*/
		read(rq?:Gordic.Fuc.Interface.GZpzDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GZpzDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GZpzDto>,GServiceReadResponse<Gordic.Fuc.Interface.GZpzDto>>;
		/**Vrátí PID způsobu zaúčtování*/
		vratIxsZpz(rq?:CallParams<{radek:Gordic.Fuc.Interface.GPohybDto}>): _Task<{radek:Gordic.Fuc.Interface.GPohybDto},string>;
		/**Vrátí název způsobu zaúčtování*/
		vratNazevZpz(rq?:CallParams<{ixsZpz:string}>): _Task<{ixsZpz:string},string>;
		/**Vrátí subřadu (z pohybu nebo dohledanou)*/
		vratSubradu(rq?:CallParams<{radek:Gordic.Fuc.Interface.GPohybDto}>): _Task<{radek:Gordic.Fuc.Interface.GPohybDto},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Zpz: ServiceBase & Catalog.Zpz;
	}
	const Zpz: Client["Zpz"];
}
declare namespace Gordic.Fuc.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu způsobů zaúčtování*/
	const enum GZpzFilter {
		/**PID způsobu zaúčtování*/
		ixs_zpz,
		/**rok*/
		rok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Dto\Gordic.Fuc.Interface.GFucductDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Pracovní tabulka záznamů FUC*/
	interface GFucductDto {
		/**LPC*/
		log_por_cislo?: number|null;
		/**PID (případu, soupisky, platby, zápočtového listu)*/
		ixp_upr?: string|null;
		/**řádek (pohybu, platby)*/
		radek_upo?: number|null;
		/**stav*/
		s_upo?: number|null;
		/**stav storna*/
		s_sto?: number|null;
		/**typ pohybu*/
		typ_upo?: number|null;
		/**číslo chyby*/
		err_code?: number|null;
		/**DBCOLUMN:fucduct.sql_err*/
		sql_err?: number|null;
		/**DBCOLUMN:fucduct.isam_err*/
		isam_err?: number|null;
		/**text chyby*/
		txt_err?: string|null;
		/**DBCOLUMN:fucduct.priz_kontr*/
		priz_kontr?: number|null;
		/**příznak odškrtnutí*/
		uncheck?: number|null;
	}
	const enum GFucductDtoNames { log_por_cislo = "log_por_cislo", ixp_upr = "ixp_upr", radek_upo = "radek_upo", s_upo = "s_upo", s_sto = "s_sto", typ_upo = "typ_upo", err_code = "err_code", sql_err = "sql_err", isam_err = "isam_err", txt_err = "txt_err", priz_kontr = "priz_kontr", uncheck = "uncheck",}
	const enum GFucductDtoFragments { log_por_cislo = "Base", ixp_upr = "Base", radek_upo = "Base", s_upo = "Base", s_sto = "Base", typ_upo = "Base", err_code = "Base", sql_err = "Base", isam_err = "Base", txt_err = "Base", priz_kontr = "Base", uncheck = "Base",}
	const enum GFucductDtoTypes { log_por_cislo = "number", ixp_upr = "string", radek_upo = "number", s_upo = "number", s_sto = "number", typ_upo = "number", err_code = "number", sql_err = "number", isam_err = "number", txt_err = "string", priz_kontr = "number", uncheck = "number",}
	const enum GFucductDtoTypeLengths { ixp_upr = 12, txt_err = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Dto\Gordic.Fuc.Interface.GIisspDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Státní pokladna*/
	interface GIisspDto {
		/**DBCOLUMN:IisspStavy.ixs_hpr*/
		ixs_hpr?: string|null;
		/**DBCOLUMN:IisspStavy.rok*/
		rok?: number|null;
		/**DBCOLUMN:IisspStavy.stav_pripadu*/
		stav_pripadu?: string|null;
		/**DBCOLUMN:IisspStavy.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:IisspStavy.pripraveno*/
		pripraveno?: number|null;
		/**DBCOLUMN:IisspStavy.odeslano*/
		odeslano?: number|null;
		/**DBCOLUMN:IisspStavy.schvaleno*/
		schvaleno?: number|null;
		/**DBCOLUMN:IisspStavy.schvaleno_vyh*/
		schvaleno_vyh?: number|null;
		/**DBCOLUMN:IisspStavy.zamitnuto*/
		zamitnuto?: number|null;
		/**pole položek*/
		polozky?: Gordic.Fuc.Interface.GPolozkaIisspDto[]|null;
	}
	const enum GIisspDtoNames { ixs_hpr = "ixs_hpr", rok = "rok", stav_pripadu = "stav_pripadu", pocet = "pocet", pripraveno = "pripraveno", odeslano = "odeslano", schvaleno = "schvaleno", schvaleno_vyh = "schvaleno_vyh", zamitnuto = "zamitnuto", polozky = "polozky",}
	const enum GIisspDtoFragments { ixs_hpr = "Base", rok = "Base", stav_pripadu = "Base", pocet = "Base", pripraveno = "Base", odeslano = "Base", schvaleno = "Base", schvaleno_vyh = "Base", zamitnuto = "Base", polozky = "*",}
	const enum GIisspDtoTypes { ixs_hpr = "string", rok = "number", stav_pripadu = "string", pocet = "number", pripraveno = "number", odeslano = "number", schvaleno = "number", schvaleno_vyh = "number", zamitnuto = "number", polozky = "Gordic.Fuc.Interface.GPolozkaIisspDto[]",}
	const enum GIisspDtoTypeLengths { ixs_hpr = 12, stav_pripadu = 254,}
	/**Položka státní pokladny*/
	interface GPolozkaIisspDto {
		/**DBCOLUMN:IisspPolozky.ixs_hpr*/
		ixs_hpr?: string|null;
		/**DBCOLUMN:IisspPolozky.radek_gin*/
		radek_gin?: number|null;
		/**DBCOLUMN:IisspPolozky.subradek_gin*/
		subradek_gin?: number|null;
		/**DBCOLUMN:IisspPolozky.rok*/
		rok?: number|null;
		/**DBCOLUMN:IisspPolozky.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:IisspPolozky.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**DBCOLUMN:IisspPolozky.id_hdr*/
		id_hdr?: number|null;
		/**DBCOLUMN:IisspPolozky.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:IisspPolozky.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:IisspPolozky.c_rsp*/
		c_rsp?: JsonDecimal|null;
		/**DBCOLUMN:IisspPolozky.popis*/
		popis?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_kap*/
		isp_kap?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_pol*/
		isp_pol?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:IisspPolozky.isp_uz*/
		isp_uz?: string|null;
		/**DBCOLUMN:IisspPolozky.s_rezsp*/
		s_rezsp?: number|null;
		/**text k s_rezsp*/
		s_rezsp_txt?: string|null;
	}
	const enum GPolozkaIisspDtoNames { ixs_hpr = "ixs_hpr", radek_gin = "radek_gin", subradek_gin = "subradek_gin", rok = "rok", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", id_hdr = "id_hdr", radek_hdr = "radek_hdr", dat_spl = "dat_spl", c_rsp = "c_rsp", popis = "popis", isp_kap = "isp_kap", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", s_rezsp = "s_rezsp", s_rezsp_txt = "s_rezsp_txt",}
	const enum GPolozkaIisspDtoFragments { ixs_hpr = "Base", radek_gin = "Base", subradek_gin = "Base", rok = "Base", id_hdr_ris = "Base", radek_hdr_ris = "Base", id_hdr = "Base", radek_hdr = "Base", dat_spl = "Base", c_rsp = "Base", popis = "Base", isp_kap = "Base", isp_fim = "Base", isp_zdr = "Base", isp_par = "Base", isp_pol = "Base", isp_eds = "Base", isp_pvs = "Base", isp_ucl = "Base", isp_zj = "Base", isp_uj = "Base", isp_uz = "Base", s_rezsp = "Base", s_rezsp_txt = "stav_rez_sp",}
	const enum GPolozkaIisspDtoTypes { ixs_hpr = "string", radek_gin = "number", subradek_gin = "number", rok = "number", id_hdr_ris = "string", radek_hdr_ris = "number", id_hdr = "number", radek_hdr = "number", dat_spl = "JsonDate", c_rsp = "JsonDecimal", popis = "string", isp_kap = "string", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", s_rezsp = "number", s_rezsp_txt = "string",}
	const enum GPolozkaIisspDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10, popis = 60, isp_kap = 3, isp_fim = 16, isp_zdr = 10, isp_par = 16, isp_pol = 24, isp_eds = 15, isp_pvs = 10, isp_ucl = 9, isp_zj = 3, isp_uj = 6, isp_uz = 7,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Dto\Gordic.Fuc.Interface.GKnihaDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Kniha*/
	interface GKnihaDto {
		/**DBCOLUMN:SeznamKnih.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:SeznamKnih.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:SeznamKnih.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamKnih.ktg_den*/
		ktg_den?: number|null;
		/**DBCOLUMN:SeznamKnih.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamKnih.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:SeznamKnih.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamKnih.akt_subrady*/
		akt_subrady?: number|null;
	}
	const enum GKnihaDtoNames { ixp_den = "ixp_den", zkratka = "zkratka", nazev = "nazev", ktg_den = "ktg_den", rok = "rok", subrada = "subrada", aktivita = "aktivita", akt_subrady = "akt_subrady",}
	const enum GKnihaDtoFragments { ixp_den = "Base", zkratka = "Base", nazev = "Base", ktg_den = "Base", rok = "Base", subrada = "Base", aktivita = "Base", akt_subrady = "Base",}
	const enum GKnihaDtoTypes { ixp_den = "string", zkratka = "string", nazev = "string", ktg_den = "number", rok = "number", subrada = "number", aktivita = "number", akt_subrady = "number",}
	const enum GKnihaDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Dto\Gordic.Fuc.Interface.GUeTeNksUusDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Věta včetně NKS a UUS*/
	interface GUeTeNksUusDto {
		/**nákladové středisko*/
		nks?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**analytika uea*/
		uea?: string|null;
		/**analytika ueb*/
		ueb?: string|null;
		/**analytika uec*/
		uec?: string|null;
		/**analytika ued*/
		ued?: string|null;
		/**analytika uee*/
		uee?: string|null;
		/**analytika uef*/
		uef?: string|null;
		/**analytika ueg*/
		ueg?: string|null;
		/**analytika ueh*/
		ueh?: string|null;
		/**analytika uei*/
		uei?: string|null;
		/**analytika uej*/
		uej?: string|null;
		/**analytika te0*/
		te0?: string|null;
		/**analytika te1*/
		te1?: string|null;
		/**analytika te2*/
		te2?: string|null;
		/**analytika te3*/
		te3?: string|null;
		/**analytika te4*/
		te4?: string|null;
		/**analytika uek*/
		uek?: string|null;
		/**analytika uel*/
		uel?: string|null;
		/**analytika uem*/
		uem?: string|null;
		/**analytika uen*/
		uen?: string|null;
		/**analytika te5*/
		te5?: string|null;
		/**analytika te6*/
		te6?: string|null;
		/**analytika te7*/
		te7?: string|null;
		/**analytika te8*/
		te8?: string|null;
		/**analytika te9*/
		te9?: string|null;
	}
	const enum GUeTeNksUusDtoNames { nks = "nks", uus = "uus", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GUeTeNksUusDtoFragments { nks = "Base", uus = "Base", uea = "Base", ueb = "Base", uec = "Base", ued = "Base", uee = "Base", uef = "Base", ueg = "Base", ueh = "Base", uei = "Base", uej = "Base", te0 = "Base", te1 = "Base", te2 = "Base", te3 = "Base", te4 = "Base", uek = "Base", uel = "Base", uem = "Base", uen = "Base", te5 = "Base", te6 = "Base", te7 = "Base", te8 = "Base", te9 = "Base",}
	const enum GUeTeNksUusDtoTypes { nks = "string", uus = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GUeTeNksUusDtoTypeLengths { nks = 12, uus = 10, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Ostatni\Dto\Gordic.Fuc.Interface.GZpzDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Způsob zaúčtování*/
	interface GZpzDto {
		/**id způsobu zaúčtování*/
		ixs_zpz?: string|null;
		/**rok*/
		rok_ixe?: number|null;
		/**kód*/
		kod?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**název*/
		nazev?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**subřada DÚZ*/
		subrada_duz?: number|null;
		/**pole řádků způsobů zaúčtování*/
		radky?: Gordic.Fuc.Interface.GRadekZpzDto[]|null;
	}
	const enum GZpzDtoNames { ixs_zpz = "ixs_zpz", rok_ixe = "rok_ixe", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", subrada_duz = "subrada_duz", radky = "radky",}
	const enum GZpzDtoFragments { ixs_zpz = "Base", rok_ixe = "Base", kod = "Base", zkratka = "Base", nazev = "Base", poznamka = "Base", subrada_duz = "Base", radky = "radky",}
	const enum GZpzDtoTypes { ixs_zpz = "string", rok_ixe = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", subrada_duz = "number", radky = "Gordic.Fuc.Interface.GRadekZpzDto[]",}
	const enum GZpzDtoTypeLengths { ixs_zpz = 12, kod = 30, zkratka = 16, nazev = 254, poznamka = 50,}
	/**Řádek způsobu zaúčtování*/
	interface GRadekZpzDto {
		/**id způsobu zaúčtování*/
		ixs_zpz?: string|null;
		/**rok*/
		rok_ixe?: number|null;
		/**řádek*/
		radek_zpz?: number|null;
		/**zástupka nebo hodnota pro nákladové středisko*/
		nks_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uea*/
		uea_t?: string|null;
		/**zástupka nebo hodnota pro analytiku ueb*/
		ueb_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uec*/
		uec_t?: string|null;
		/**zástupka nebo hodnota pro analytiku ued*/
		ued_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uee*/
		uee_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uef*/
		uef_t?: string|null;
		/**zástupka nebo hodnota pro analytiku ueg*/
		ueg_t?: string|null;
		/**zástupka nebo hodnota pro analytiku ueh*/
		ueh_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uei*/
		uei_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uej*/
		uej_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te0*/
		te0_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te1*/
		te1_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te2*/
		te2_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te3*/
		te3_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te4*/
		te4_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uek*/
		uek_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uel*/
		uel_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uem*/
		uem_t?: string|null;
		/**zástupka nebo hodnota pro analytiku uen*/
		uen_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te5*/
		te5_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te6*/
		te6_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te7*/
		te7_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te8*/
		te8_t?: string|null;
		/**zástupka nebo hodnota pro analytiku te9*/
		te9_t?: string|null;
		/**zástupka nebo hodnota pro MD*/
		c0_t?: string|null;
		/**zástupka nebo hodnota pro Dal*/
		c1_t?: string|null;
		/**zástupka nebo hodnota pro popis*/
		popis_t?: string|null;
		/**toottip pro nks_t*/
		tt_nks_t?: string|null;
		/**toottip pro uea_t*/
		tt_uea_t?: string|null;
		/**toottip pro ueb_t*/
		tt_ueb_t?: string|null;
		/**toottip pro uec_t*/
		tt_uec_t?: string|null;
		/**toottip pro ued_t*/
		tt_ued_t?: string|null;
		/**toottip pro uee_t*/
		tt_uee_t?: string|null;
		/**toottip pro uef_t*/
		tt_uef_t?: string|null;
		/**toottip pro ueg_t*/
		tt_ueg_t?: string|null;
		/**toottip pro ueh_t*/
		tt_ueh_t?: string|null;
		/**toottip pro uei_t*/
		tt_uei_t?: string|null;
		/**toottip pro uej_t*/
		tt_uej_t?: string|null;
		/**toottip pro te0_t*/
		tt_te0_t?: string|null;
		/**toottip pro te1_t*/
		tt_te1_t?: string|null;
		/**toottip pro te2_t*/
		tt_te2_t?: string|null;
		/**toottip pro te3_t*/
		tt_te3_t?: string|null;
		/**toottip pro te4_t*/
		tt_te4_t?: string|null;
		/**toottip pro uek_t*/
		tt_uek_t?: string|null;
		/**toottip pro uel_t*/
		tt_uel_t?: string|null;
		/**toottip pro uem_t*/
		tt_uem_t?: string|null;
		/**toottip pro uen_t*/
		tt_uen_t?: string|null;
		/**toottip pro te5_t*/
		tt_te5_t?: string|null;
		/**toottip pro te6_t*/
		tt_te6_t?: string|null;
		/**toottip pro te7_t*/
		tt_te7_t?: string|null;
		/**toottip pro te8_t*/
		tt_te8_t?: string|null;
		/**toottip pro te9_t*/
		tt_te9_t?: string|null;
		/**toottip pro c0_t*/
		tt_c0_t?: string|null;
		/**toottip pro c1_t*/
		tt_c1_t?: string|null;
		/**toottip pro popis_t*/
		tt_popis_t?: string|null;
	}
	const enum GRadekZpzDtoNames { ixs_zpz = "ixs_zpz", rok_ixe = "rok_ixe", radek_zpz = "radek_zpz", nks_t = "nks_t", uea_t = "uea_t", ueb_t = "ueb_t", uec_t = "uec_t", ued_t = "ued_t", uee_t = "uee_t", uef_t = "uef_t", ueg_t = "ueg_t", ueh_t = "ueh_t", uei_t = "uei_t", uej_t = "uej_t", te0_t = "te0_t", te1_t = "te1_t", te2_t = "te2_t", te3_t = "te3_t", te4_t = "te4_t", uek_t = "uek_t", uel_t = "uel_t", uem_t = "uem_t", uen_t = "uen_t", te5_t = "te5_t", te6_t = "te6_t", te7_t = "te7_t", te8_t = "te8_t", te9_t = "te9_t", c0_t = "c0_t", c1_t = "c1_t", popis_t = "popis_t", tt_nks_t = "tt_nks_t", tt_uea_t = "tt_uea_t", tt_ueb_t = "tt_ueb_t", tt_uec_t = "tt_uec_t", tt_ued_t = "tt_ued_t", tt_uee_t = "tt_uee_t", tt_uef_t = "tt_uef_t", tt_ueg_t = "tt_ueg_t", tt_ueh_t = "tt_ueh_t", tt_uei_t = "tt_uei_t", tt_uej_t = "tt_uej_t", tt_te0_t = "tt_te0_t", tt_te1_t = "tt_te1_t", tt_te2_t = "tt_te2_t", tt_te3_t = "tt_te3_t", tt_te4_t = "tt_te4_t", tt_uek_t = "tt_uek_t", tt_uel_t = "tt_uel_t", tt_uem_t = "tt_uem_t", tt_uen_t = "tt_uen_t", tt_te5_t = "tt_te5_t", tt_te6_t = "tt_te6_t", tt_te7_t = "tt_te7_t", tt_te8_t = "tt_te8_t", tt_te9_t = "tt_te9_t", tt_c0_t = "tt_c0_t", tt_c1_t = "tt_c1_t", tt_popis_t = "tt_popis_t",}
	const enum GRadekZpzDtoFragments { ixs_zpz = "Base", rok_ixe = "Base", radek_zpz = "Base", nks_t = "Base", uea_t = "Base", ueb_t = "Base", uec_t = "Base", ued_t = "Base", uee_t = "Base", uef_t = "Base", ueg_t = "Base", ueh_t = "Base", uei_t = "Base", uej_t = "Base", te0_t = "Base", te1_t = "Base", te2_t = "Base", te3_t = "Base", te4_t = "Base", uek_t = "Base", uel_t = "Base", uem_t = "Base", uen_t = "Base", te5_t = "Base", te6_t = "Base", te7_t = "Base", te8_t = "Base", te9_t = "Base", c0_t = "Base", c1_t = "Base", popis_t = "Base", tt_nks_t = "tooltip", tt_uea_t = "tooltip", tt_ueb_t = "tooltip", tt_uec_t = "tooltip", tt_ued_t = "tooltip", tt_uee_t = "tooltip", tt_uef_t = "tooltip", tt_ueg_t = "tooltip", tt_ueh_t = "tooltip", tt_uei_t = "tooltip", tt_uej_t = "tooltip", tt_te0_t = "tooltip", tt_te1_t = "tooltip", tt_te2_t = "tooltip", tt_te3_t = "tooltip", tt_te4_t = "tooltip", tt_uek_t = "tooltip", tt_uel_t = "tooltip", tt_uem_t = "tooltip", tt_uen_t = "tooltip", tt_te5_t = "tooltip", tt_te6_t = "tooltip", tt_te7_t = "tooltip", tt_te8_t = "tooltip", tt_te9_t = "tooltip", tt_c0_t = "tooltip", tt_c1_t = "tooltip", tt_popis_t = "tooltip",}
	const enum GRadekZpzDtoTypes { ixs_zpz = "string", rok_ixe = "number", radek_zpz = "number", nks_t = "string", uea_t = "string", ueb_t = "string", uec_t = "string", ued_t = "string", uee_t = "string", uef_t = "string", ueg_t = "string", ueh_t = "string", uei_t = "string", uej_t = "string", te0_t = "string", te1_t = "string", te2_t = "string", te3_t = "string", te4_t = "string", uek_t = "string", uel_t = "string", uem_t = "string", uen_t = "string", te5_t = "string", te6_t = "string", te7_t = "string", te8_t = "string", te9_t = "string", c0_t = "string", c1_t = "string", popis_t = "string", tt_nks_t = "string", tt_uea_t = "string", tt_ueb_t = "string", tt_uec_t = "string", tt_ued_t = "string", tt_uee_t = "string", tt_uef_t = "string", tt_ueg_t = "string", tt_ueh_t = "string", tt_uei_t = "string", tt_uej_t = "string", tt_te0_t = "string", tt_te1_t = "string", tt_te2_t = "string", tt_te3_t = "string", tt_te4_t = "string", tt_uek_t = "string", tt_uel_t = "string", tt_uem_t = "string", tt_uen_t = "string", tt_te5_t = "string", tt_te6_t = "string", tt_te7_t = "string", tt_te8_t = "string", tt_te9_t = "string", tt_c0_t = "string", tt_c1_t = "string", tt_popis_t = "string",}
	const enum GRadekZpzDtoTypeLengths { ixs_zpz = 12, nks_t = 20, uea_t = 34, ueb_t = 34, uec_t = 34, ued_t = 34, uee_t = 34, uef_t = 34, ueg_t = 34, ueh_t = 34, uei_t = 34, uej_t = 34, te0_t = 34, te1_t = 34, te2_t = 34, te3_t = 34, te4_t = 34, uek_t = 34, uel_t = 34, uem_t = 34, uen_t = 34, te5_t = 34, te6_t = 34, te7_t = 34, te8_t = 34, te9_t = 34, c0_t = 20, c1_t = 20, popis_t = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Platba\Gordic.Fuc.Interface.IGBankovniVypis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Platby účetních případů
	* @domain FinUctarna
	*/
	interface BankovniVypis {
		/**Načte detail bankovního výpisu (s případným omezením na položky)*/
		read(rq?:Gordic.Fuc.Interface.GBankovniVypisDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GBankovniVypisDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GBankovniVypisDto>,GServiceReadResponse<Gordic.Fuc.Interface.GBankovniVypisDto>>;
		/**Odpárování položky bankovního výpisu*/
		odparujPolozku(rq?:CallParams<{ixp:string,radek:number,subradek:number,radekAv:number,sPol:number,ixpPar:string,cisloPar:number,c:JsonDecimal,radekUpo:number,den:number,mesic:number,rok:number,ktgTyp:number,datZmena:JsonDate}>): _Task<{ixp:string,radek:number,subradek:number,radekAv:number,sPol:number,ixpPar:string,cisloPar:number,c:JsonDecimal,radekUpo:number,den:number,mesic:number,rok:number,ktgTyp:number,datZmena:JsonDate},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BankovniVypis: ServiceBase & Catalog.BankovniVypis;
	}
	const BankovniVypis: Client["BankovniVypis"];
}
declare namespace Gordic.Fuc.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu bankovních výpisů*/
	const enum GBankovniVypisFilter {
		/**identifikátor*/
		ixp,
		/**řádek (položka) výpisu*/
		pol_radek_pol,
		/**subřádek výpisu*/
		pol_subradek,
		/**řádek rozepsané položky*/
		pol_radek_av,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Platba\Gordic.Fuc.Interface.IGPlatba.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Platby účetních případů
	* @domain FinUctarna
	*/
	interface Platba {
		/**Načte detail platby účetního případu*/
		read(rq?:Gordic.Fuc.Interface.GPlatbaDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GPlatbaDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GPlatbaDto>,GServiceReadResponse<Gordic.Fuc.Interface.GPlatbaDto>>;
		/**Načte seznam plateb účetních případů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GPlatbaDto>>;
		/**Zjistí počet plateb účetních případů*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Kontrola předaných plateb před stornem / zrušením storna*/
		zkontrolujPredStornem(rq?:Gordic.Fuc.Interface.GPlatbaStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPlatbaPkDto>>;
		/**Storno / zrušení storna platby*/
		stornuj(rq?:Gordic.Fuc.Interface.GPlatbaStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPlatbaStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPlatbaStornoOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPlatbaPkDto>>;
		/**Hromadné storno / zrušení storna předaných plateb*/
		hromadneStornuj(rq?:Gordic.Fuc.Interface.GPlatbaStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPlatbaPkDto>>;
		/**Kontrola předaných plateb před převodem*/
		zkontrolujPredPrevodem(rq?:Gordic.Fuc.Interface.GPlatbaPrevodOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaPrevodOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaPrevodOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPlatbaPkDto>>;
		/**Převod platby*/
		preved(rq?:Gordic.Fuc.Interface.GPlatbaPrevodOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPlatbaPrevodOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPlatbaPrevodOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPlatbaPkDto>>;
		/**Hromadný převod předaných plateb*/
		hromadnePreved(rq?:Gordic.Fuc.Interface.GPlatbaPrevodOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaPrevodOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPlatbaPrevodOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPlatbaPkDto>>;
		/**Vrátí oprávnění mylných plateb (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GPlatbaServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Platba: ServiceBase & Catalog.Platba;
	}
	const Platba: Client["Platba"];
}
declare namespace Gordic.Fuc.Interface {
	/**Oprávnění pro jednu platbu*/
	interface GPlatbaPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převést do banky*/
		LzePrevestDoBanky: Gordic.General.ApplicationInterface.GPermission;
		/**lze převést z banky*/
		LzePrevestZBanky: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPlatbaPermissionNames { LzeZobrazit = "LzeZobrazit", LzeStornovat = "LzeStornovat", LzePrevestDoBanky = "LzePrevestDoBanky", LzePrevestZBanky = "LzePrevestZBanky",}
	const enum GPlatbaPermissionFragments { LzeZobrazit = "*", LzeStornovat = "*", LzePrevestDoBanky = "*", LzePrevestZBanky = "*",}
	const enum GPlatbaPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzePrevestDoBanky = "Gordic.General.ApplicationInterface.GPermission", LzePrevestZBanky = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPlatbaPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GPlatbaPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GPlatbaPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GPlatbaPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GPlatbaPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GPlatbaPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro práci nad platbami*/
	interface GPlatbaServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převést do banky*/
		LzePrevestDoBanky: Gordic.General.ApplicationInterface.GPermission;
		/**lze převést z banky*/
		LzePrevestZBanky: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPlatbaServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzeStornovat = "LzeStornovat", LzePrevestDoBanky = "LzePrevestDoBanky", LzePrevestZBanky = "LzePrevestZBanky", LzeTisknout = "LzeTisknout",}
	const enum GPlatbaServicePermissionFragments { LzeZobrazit = "*", LzeStornovat = "*", LzePrevestDoBanky = "*", LzePrevestZBanky = "*", LzeTisknout = "*",}
	const enum GPlatbaServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzePrevestDoBanky = "Gordic.General.ApplicationInterface.GPermission", LzePrevestZBanky = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPlatbaServicePermissionTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu plateb případů*/
	const enum GPlatbaFilter {
		/**identifikátor*/
		ixp,
		/**řádek úhrady*/
		radek_uhr,
		/**konstantní symbol*/
		ks,
		/**variabilní symbol*/
		vs,
		/**specifický symbol*/
		ss,
		/**částka*/
		c,
		/**rok aktuálního příhlášení*/
		akt_rok,
		/**datum splatnosti*/
		dat_spl,
		/**datum zaplacení*/
		dat_zap,
		/**stav úhrady*/
		s_uhrp,
		/**způsob úhrady*/
		zp,
		/**INT - externí systém*/
		ixs_ext,
		/**INT - pořadové číslo dávky*/
		por_cislo_int,
		/**INT - id platby*/
		id_platby,
		/**řádek rezervačního pohybu (i pro detail)*/
		radek_upo_rez_komb,
		/**řádek účetního pohybu typu předpis (i pro detail)*/
		radek_upo_komb,
		/**zkombinovaná položka výpisu*/
		ixp_bvp_komb,
		/**platba - zkombinovaná položka vlastního účtu*/
		vl_ucet_komb,
		/**položky - zkombinovaná položka cizího účtu*/
		ci_ucet_komb,
		/**platba - cizí účet*/
		bu_ci,
		/**platba - cizí směrový kód*/
		sk_ci,
		/**externí subjekt*/
		ixs_esu,
		/**příznak nepárovat*/
		priz_nepar,
		/**aktuální vlastník*/
		upr_ixs_fun_akt,
		/**kategorie případu*/
		upr_ktg_upr,
		/**typ agendy*/
		upr_typ_ag,
		/**kniha*/
		upr_ixp_den,
		/**typ účetního případu*/
		upr_typ_upr,
		/**kategorie typu dokladu*/
		upr_ktg_typ,
		/**popis případu*/
		upr_popis,
		/**poznámka případu*/
		upr_poznamka,
		/**stav případu*/
		upr_s_upr,
		/**defaultní stav případu*/
		upr_s_upr_def,
		/**subselekt do tabulky se seznamem PIDů účetních případů*/
		upr_fucduct,
		/**existence v tabulce fucduct*/
		duct_ano,
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck,
		/**IKC v tabulce fucduct*/
		duct_ikc,
		/**pomocná vazba na tabulku fucduct místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_duct,
	}
	/**Místo, odkud je seznam plateb volán*/
	const enum VolanoZ {
		/**z úloh*/
		Uloha,
		/**ze seznamu případů*/
		SeznamPripadu,
		/**z detailu případu*/
		DetailPripadu,
		/**z pohybů případu*/
		PohybyPripadu,
	}
	/**Parametry storna / zrušení storna platby*/
	interface GPlatbaStornoOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPlatbaDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**při stornu (stornovat = true) stornovat i předpisy navázané na platbu (true = ano, false = ne)*/
		i_navazane_predpisy?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPlatbaStornoOperationDtoNames { stornovat = "stornovat", i_navazane_predpisy = "i_navazane_predpisy", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPlatbaStornoOperationDtoFragments { stornovat = "*", i_navazane_predpisy = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPlatbaStornoOperationDtoTypes { stornovat = "boolean", i_navazane_predpisy = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPlatbaDto[]",}
	const enum GPlatbaStornoOperationDtoTypeLengths {}
	/**Parametry převodu platby*/
	interface GPlatbaPrevodOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPlatbaDto> {
		/**požadovaná operace (true = do banky, false = zpět z banky)*/
		do_banky?: boolean|null;
	}
	const enum GPlatbaPrevodOperationDtoNames { do_banky = "do_banky", ikc = "ikc", rows = "rows",}
	const enum GPlatbaPrevodOperationDtoFragments { do_banky = "*", ikc = "*", rows = "*",}
	const enum GPlatbaPrevodOperationDtoTypes { do_banky = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPlatbaDto[]",}
	const enum GPlatbaPrevodOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Platba\Dto\Gordic.Fuc.Interface.GBankovniVypisDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Bankovní výpis*/
	interface GBankovniVypisDto {
		/**DBCOLUMN:DetailVypisu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:DetailVypisu.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:DetailVypisu.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:DetailVypisu.bu_txt_vl*/
		bu_txt_vl?: string|null;
		/**DBCOLUMN:DetailVypisu.dat_nov_zus*/
		dat_nov_zus?: JsonDate|null;
		/**DBCOLUMN:DetailVypisu.rok_pid*/
		rok_pid?: number|null;
		/**DBCOLUMN:DetailVypisu.cis_pid*/
		cis_pid?: number|null;
		/**DBCOLUMN:DetailVypisu.ktg_typ*/
		ktg_typ?: number|null;
		/**pole položek bankovního výpisu*/
		polozky?: Gordic.Fuc.Interface.GPolozkaBankovnihoVypisuDto[]|null;
	}
	const enum GBankovniVypisDtoNames { ixp = "ixp", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", dat_nov_zus = "dat_nov_zus", rok_pid = "rok_pid", cis_pid = "cis_pid", ktg_typ = "ktg_typ", polozky = "polozky",}
	const enum GBankovniVypisDtoFragments { ixp = "Base", sk_vl = "bu_txt_vl", bu_vl = "bu_txt_vl", bu_txt_vl = "bu_txt_vl", dat_nov_zus = "dat_nov_zus", rok_pid = "rok_pid", cis_pid = "cis_pid", ktg_typ = "ktg_typ", polozky = "polozky",}
	const enum GBankovniVypisDtoTypes { ixp = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", dat_nov_zus = "JsonDate", rok_pid = "number", cis_pid = "number", ktg_typ = "number", polozky = "Gordic.Fuc.Interface.GPolozkaBankovnihoVypisuDto[]",}
	const enum GBankovniVypisDtoTypeLengths { ixp = 12, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46,}
	/**Položka bankovního výpisu*/
	interface GPolozkaBankovnihoVypisuDto {
		/**DBCOLUMN:SeznamPolozekVypisu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.radek_pol*/
		radek_pol?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.subradek*/
		subradek?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.radek_av*/
		radek_av?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.ixp_par*/
		ixp_par?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.cislo_par*/
		cislo_par?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.s_pol*/
		s_pol?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.bu_txt_vl*/
		bu_txt_vl?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.bu_txt_ci*/
		bu_txt_ci?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.dat_zap*/
		dat_zap?: JsonDate|null;
		/**DBCOLUMN:SeznamPolozekVypisu.vs*/
		vs?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.ks*/
		ks?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.ss*/
		ss?: string|null;
		/**DBCOLUMN:SeznamPolozekVypisu.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPolozekVypisu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamPolozekVypisu.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.mena*/
		mena?: number|null;
		/**DBCOLUMN:SeznamPolozekVypisu.c_mena*/
		c_mena?: JsonDecimal|null;
		/**složený cizí bankovní účet*/
		bu_ci_txt?: string|null;
	}
	const enum GPolozkaBankovnihoVypisuDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", ixp_par = "ixp_par", cislo_par = "cislo_par", s_pol = "s_pol", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", dat_zap = "dat_zap", vs = "vs", ks = "ks", ss = "ss", c = "c", dat_zmena = "dat_zmena", radek_upo = "radek_upo", mena = "mena", c_mena = "c_mena", bu_ci_txt = "bu_ci_txt",}
	const enum GPolozkaBankovnihoVypisuDtoFragments { ixp = "Base", radek_pol = "Base", subradek = "Base", radek_av = "Base", ixp_par = "Base", cislo_par = "Base", s_pol = "Base", sk_vl = "Base", bu_vl = "Base", bu_txt_vl = "Base", sk_ci = "Base", bu_ci = "Base", bu_txt_ci = "Base", dat_zap = "Base", vs = "Base", ks = "Base", ss = "Base", c = "Base", dat_zmena = "Base", radek_upo = "Base", mena = "Base", c_mena = "Base", bu_ci_txt = "ucet",}
	const enum GPolozkaBankovnihoVypisuDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", ixp_par = "string", cislo_par = "number", s_pol = "number", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", dat_zap = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", dat_zmena = "JsonDate", radek_upo = "number", mena = "number", c_mena = "JsonDecimal", bu_ci_txt = "string",}
	const enum GPolozkaBankovnihoVypisuDtoTypeLengths { ixp = 12, ixp_par = 12, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, sk_ci = 11, bu_ci = 34, bu_txt_ci = 46, vs = 12, ks = 12, ss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Platba\Dto\Gordic.Fuc.Interface.GPlatbaDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Platba případu*/
	interface GPlatbaDto extends Gordic.Fuc.Interface.GFucSeznamDuctDto {
		/**DBCOLUMN:bucdpep.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:bucdpep.radek_uhr*/
		radek_uhr?: number|null;
		/**DBCOLUMN:bucdpep.subradek*/
		subradek?: number|null;
		/**DBCOLUMN:bucdpep.lic*/
		lic?: string|null;
		/**DBCOLUMN:bucdpep.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:bucdpep.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:bucdpep.vs*/
		vs?: string|null;
		/**DBCOLUMN:bucdpep.ks*/
		ks?: string|null;
		/**DBCOLUMN:bucdpep.ss*/
		ss?: string|null;
		/**DBCOLUMN:bucdpep.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:bucdpep.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:bucdpep.bu_txt_vl*/
		bu_txt_vl?: string|null;
		/**DBCOLUMN:bucdpep.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:bucdpep.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:bucdpep.bu_txt_ci*/
		bu_txt_ci?: string|null;
		/**DBCOLUMN:bucdpep.zp*/
		zp?: number|null;
		/**DBCOLUMN:bucdpep.ac*/
		ac?: string|null;
		/**DBCOLUMN:bucdpep.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:bucdpep.s_uhrp*/
		s_uhrp?: number|null;
		/**DBCOLUMN:bucdpep.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_par*/
		c_par?: JsonDecimal|null;
		/**datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:bucdpep.dat_zap*/
		dat_zap?: JsonDate|null;
		/**DBCOLUMN:bucdpep.dat_par*/
		dat_par?: JsonDate|null;
		/**DBCOLUMN:bucdpep.dat_kuhr*/
		dat_kuhr?: JsonDate|null;
		/**DBCOLUMN:bucdpep.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:bucdpep.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:bucdpep.cis_bdo*/
		cis_bdo?: string|null;
		/**DBCOLUMN:bucdpep.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:bucdpep.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:bucdpep.mena*/
		mena?: number|null;
		/**DBCOLUMN:bucdpep.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.zp_z*/
		zp_z?: number|null;
		/**DBCOLUMN:bucdpep.hra_pop*/
		hra_pop?: number|null;
		/**platební titul*/
		pla_tit?: string|null;
		/**DBCOLUMN:bucdpep.ucel_uhr*/
		ucel_uhr?: string|null;
		/**DBCOLUMN:bucdpep.dev_pov*/
		dev_pov?: string|null;
		/**DBCOLUMN:bucdpep.id_platby*/
		id_platby?: string|null;
		/**DBCOLUMN:bucdpep.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:bucdpep.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:bucdpep.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:bucdpep.por_cislo_int*/
		por_cislo_int?: number|null;
		/**DBCOLUMN:bucdpep.rok*/
		rok?: number|null;
		/**IČO*/
		ico?: string|null;
		/**UCS*/
		ucs?: string|null;
		/**DBCOLUMN:bucdpep.upl*/
		upl?: number|null;
		/**DBCOLUMN:bucdpep.exp_pla*/
		exp_pla?: number|null;
		/**DBCOLUMN:bucdpep.bu_pop*/
		bu_pop?: string|null;
		/**DBCOLUMN:bucdpep.mena_pop*/
		mena_pop?: number|null;
		/**DBCOLUMN:bucdpep.mena_poz*/
		mena_poz?: number|null;
		/**DBCOLUMN:bucdpep.inf1*/
		inf1?: string|null;
		/**DBCOLUMN:bucdpep.inf2*/
		inf2?: string|null;
		/**DBCOLUMN:bucdpep.c_par_mena*/
		c_par_mena?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.ixp_real*/
		ixp_real?: string|null;
		/**DBCOLUMN:bucdpep.ixs_ext*/
		ixs_ext?: string|null;
		/**DBCOLUMN:bucdpep.priz_nepar*/
		priz_nepar?: number|null;
		/**DBCOLUMN:bucdpep.popis*/
		popis?: string|null;
		/**DBCOLUMN:bucdpep.sds*/
		sds?: string|null;
		/**DBCOLUMN:bucdpep.priz_pred_rcdn*/
		priz_pred_rcdn?: number|null;
		/**DBCOLUMN:bucdpep.c_z0_par*/
		c_z0_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d0_par*/
		c_d0_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_z1_par*/
		c_z1_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d1_par*/
		c_d1_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_z2_par*/
		c_z2_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d2_par*/
		c_d2_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_zao_par*/
		c_zao_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.ixs_zmp_prik*/
		ixs_zmp_prik?: string|null;
		/**DBCOLUMN:bucdpep.pri_uhr*/
		pri_uhr?: number|null;
		/**DBCOLUMN:bucdpep.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:bucdpep.radek_upo_rez*/
		radek_upo_rez?: number|null;
		/**DBCOLUMN:bucdpep.priz_rez_pri*/
		priz_rez_pri?: number|null;
		/**DBCOLUMN:bucdpep.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:bucdpep.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:bucdpep.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:bucdpep.dsp*/
		dsp?: string|null;
		/**DBCOLUMN:bucdpep.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.alg_par*/
		alg_par?: number|null;
		/**DBCOLUMN:bucdpep.ixp_vaz*/
		ixp_vaz?: string|null;
		/**DBCOLUMN:bucdpep.dat_spl_ag*/
		dat_spl_ag?: JsonDate|null;
		/**DBCOLUMN:bucdpep.c_z3_par*/
		c_z3_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d3_par*/
		c_d3_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_z4_par*/
		c_z4_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d4_par*/
		c_d4_par?: JsonDecimal|null;
		/**UUS*/
		uus?: string|null;
		/**pole pohybů platby*/
		pohyby?: Gordic.Fuc.Interface.GPohybPlatbyDto[]|null;
		/**je platba odlitá? (0 = ne, >0 = ano)*/
		priz_xx?: number|null;
		/**aktuální vlastník případu*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:bucdpep.ktg_upo*/
		priz_sr?: number|null;
		/**pomocný sloupec pro složený bankovní účet vlastní*/
		bu_vl_txt?: string|null;
		/**pomocný sloupec pro složený bankovní účet cizí*/
		bu_ci_txt?: string|null;
		/**text k ixs_ext*/
		ixs_ext_txt?: string|null;
		/**text k zp*/
		zp_txt?: string|null;
		/**text k s_uhrp*/
		s_uhrp_txt?: string|null;
		/**text k priz_nepar*/
		priz_nepar_txt?: string|null;
		/**spojené inf1+inf2*/
		inf12?: string|null;
		/**dopočítaná hodnota k por_cislo_int*/
		por_cislo_int_vyp?: number|null;
		/**zkratka k mena*/
		mena_zkr?: string|null;
		/**zkratka k typ_ag*/
		zkr_ag?: string|null;
		/**Navigacni vlastnost pro případ (ixp_upr)*/
		pripad?: Gordic.Fuc.Interface.GPripadDto|null;
		/**Navigacni vlastnost pro subjekt (ixs_esu)*/
		subjekt?: Gordic.Fuc.Interface.GExterniSubjektDto|null;
		/**Je platba stornována?*/
		readonly JeStornovana?: boolean|null;
		/**Je platba v bance?*/
		readonly JeVBance?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GPlatbaPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GPlatbaDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", lic = "lic", eko_akt = "eko_akt", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", zp = "zp", ac = "ac", ixp_den = "ixp_den", s_uhrp = "s_uhrp", c = "c", c_par = "c_par", dat_spl = "dat_spl", dat_zap = "dat_zap", dat_par = "dat_par", dat_kuhr = "dat_kuhr", typ_ag = "typ_ag", ktg_typ = "ktg_typ", cis_bdo = "cis_bdo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena = "mena", c_mena = "c_mena", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", id_platby = "id_platby", ktg_upo = "ktg_upo", dat_vzniku = "dat_vzniku", radek_upo = "radek_upo", por_cislo_int = "por_cislo_int", rok = "rok", ico = "ico", ucs = "ucs", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", mena_pop = "mena_pop", mena_poz = "mena_poz", inf1 = "inf1", inf2 = "inf2", c_par_mena = "c_par_mena", ixp_real = "ixp_real", ixs_ext = "ixs_ext", priz_nepar = "priz_nepar", popis = "popis", sds = "sds", priz_pred_rcdn = "priz_pred_rcdn", c_z0_par = "c_z0_par", c_d0_par = "c_d0_par", c_z1_par = "c_z1_par", c_d1_par = "c_d1_par", c_z2_par = "c_z2_par", c_d2_par = "c_d2_par", c_zao_par = "c_zao_par", ixs_zmp_prik = "ixs_zmp_prik", pri_uhr = "pri_uhr", dat_sch = "dat_sch", radek_upo_rez = "radek_upo_rez", priz_rez_pri = "priz_rez_pri", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", dsp = "dsp", kurz = "kurz", alg_par = "alg_par", ixp_vaz = "ixp_vaz", dat_spl_ag = "dat_spl_ag", c_z3_par = "c_z3_par", c_d3_par = "c_d3_par", c_z4_par = "c_z4_par", c_d4_par = "c_d4_par", uus = "uus", pohyby = "pohyby", priz_xx = "priz_xx", ixs_fun_akt = "ixs_fun_akt", priz_sr = "priz_sr", bu_vl_txt = "bu_vl_txt", bu_ci_txt = "bu_ci_txt", ixs_ext_txt = "ixs_ext_txt", zp_txt = "zp_txt", s_uhrp_txt = "s_uhrp_txt", priz_nepar_txt = "priz_nepar_txt", inf12 = "inf12", por_cislo_int_vyp = "por_cislo_int_vyp", mena_zkr = "mena_zkr", zkr_ag = "zkr_ag", pripad = "pripad", subjekt = "subjekt", JeStornovana = "JeStornovana", JeVBance = "JeVBance", Permissions = "Permissions", PrimaryKey = "PrimaryKey", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GPlatbaDtoFragments { ixp = "Base", radek_uhr = "Base", subradek = "Base", lic = "Base", eko_akt = "Extended", ixs_esu = "Base", vs = "Base", ks = "Base", ss = "Base", sk_vl = "Base", bu_vl = "Base", bu_txt_vl = "Base", sk_ci = "Base", bu_ci = "Base", bu_txt_ci = "Base", zp = "Base", ac = "Base", ixp_den = "Base", s_uhrp = "Base", c = "Base", c_par = "Base", dat_spl = "Base", dat_zap = "Base", dat_par = "Base", dat_kuhr = "Base", typ_ag = "Base", ktg_typ = "Base", cis_bdo = "Extended", dat_zmena = "Base", zmenu_prov = "Base", mena = "Base", c_mena = "Base", zp_z = "Base", hra_pop = "Extended", pla_tit = "Extended", ucel_uhr = "Extended", dev_pov = "Extended", id_platby = "Extended", ktg_upo = "Base", dat_vzniku = "Extended", radek_upo = "Base", por_cislo_int = "Base", rok = "Base", ico = "Base", ucs = "Base", upl = "Extended", exp_pla = "Extended", bu_pop = "Extended", mena_pop = "Extended", mena_poz = "Extended", inf1 = "Base", inf2 = "Base", c_par_mena = "Base", ixp_real = "Extended", ixs_ext = "Base", priz_nepar = "Extended", popis = "Base", sds = "Extended", priz_pred_rcdn = "Extended", c_z0_par = "Extended2", c_d0_par = "Extended2", c_z1_par = "Extended2", c_d1_par = "Extended2", c_z2_par = "Extended2", c_d2_par = "Extended2", c_zao_par = "Extended2", ixs_zmp_prik = "Extended", pri_uhr = "Extended", dat_sch = "Base", radek_upo_rez = "Extended", priz_rez_pri = "Extended", ixp_sml = "Extended", rok_sml = "Extended", cislo_sml = "Extended", dsp = "Extended", kurz = "Base", alg_par = "Extended", ixp_vaz = "Extended", dat_spl_ag = "Base", c_z3_par = "Extended2", c_d3_par = "Extended2", c_z4_par = "Extended2", c_d4_par = "Extended2", uus = "Base", pohyby = "pohyby", priz_xx = "Base", ixs_fun_akt = "Base", priz_sr = "Base", bu_vl_txt = "Base", bu_ci_txt = "Base", ixs_ext_txt = "externi_system", zp_txt = "zpusob_uhrady", s_uhrp_txt = "stav_uhrady", priz_nepar_txt = "parovani", inf12 = "Base", por_cislo_int_vyp = "Base", mena_zkr = "mena", zkr_ag = "agenda", pripad = "pripad", subjekt = "subjekt", JeStornovana = "*", JeVBance = "*", Permissions = "Permissions", PrimaryKey = "*", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GPlatbaDtoTypes { ixp = "string", radek_uhr = "number", subradek = "number", lic = "string", eko_akt = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", zp = "number", ac = "string", ixp_den = "string", s_uhrp = "number", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", dat_zap = "JsonDate", dat_par = "JsonDate", dat_kuhr = "JsonDate", typ_ag = "number", ktg_typ = "number", cis_bdo = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mena = "number", c_mena = "JsonDecimal", zp_z = "number", hra_pop = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", id_platby = "string", ktg_upo = "number", dat_vzniku = "JsonDate", radek_upo = "number", por_cislo_int = "number", rok = "number", ico = "string", ucs = "string", upl = "number", exp_pla = "number", bu_pop = "string", mena_pop = "number", mena_poz = "number", inf1 = "string", inf2 = "string", c_par_mena = "JsonDecimal", ixp_real = "string", ixs_ext = "string", priz_nepar = "number", popis = "string", sds = "string", priz_pred_rcdn = "number", c_z0_par = "JsonDecimal", c_d0_par = "JsonDecimal", c_z1_par = "JsonDecimal", c_d1_par = "JsonDecimal", c_z2_par = "JsonDecimal", c_d2_par = "JsonDecimal", c_zao_par = "JsonDecimal", ixs_zmp_prik = "string", pri_uhr = "number", dat_sch = "JsonDate", radek_upo_rez = "number", priz_rez_pri = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", dsp = "string", kurz = "JsonDecimal", alg_par = "number", ixp_vaz = "string", dat_spl_ag = "JsonDate", c_z3_par = "JsonDecimal", c_d3_par = "JsonDecimal", c_z4_par = "JsonDecimal", c_d4_par = "JsonDecimal", uus = "string", pohyby = "Gordic.Fuc.Interface.GPohybPlatbyDto[]", priz_xx = "number", ixs_fun_akt = "string", priz_sr = "number", bu_vl_txt = "string", bu_ci_txt = "string", ixs_ext_txt = "string", zp_txt = "string", s_uhrp_txt = "string", priz_nepar_txt = "string", inf12 = "string", por_cislo_int_vyp = "number", mena_zkr = "string", zkr_ag = "string", pripad = "Gordic.Fuc.Interface.GPripadDto", subjekt = "Gordic.Fuc.Interface.GExterniSubjektDto", JeStornovana = "boolean", JeVBance = "boolean", Permissions = "Gordic.Fuc.Interface.GPlatbaPermission", PrimaryKey = "string", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GPlatbaDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, sk_ci = 11, bu_ci = 34, bu_txt_ci = 46, ac = 20, ixp_den = 12, cis_bdo = 30, zmenu_prov = 12, pla_tit = 10, ucel_uhr = 30, dev_pov = 30, id_platby = 50, ico = 10, ucs = 10, bu_pop = 34, inf1 = 34, inf2 = 34, ixp_real = 12, ixs_ext = 12, popis = 254, sds = 10, ixs_zmp_prik = 12, ixp_sml = 12, dsp = 1, ixp_vaz = 12, uus = 10, mena_zkr = 3, zkr_ag = 3, duct_txt_err = 254,}
	/**Pohyb platby*/
	interface GPohybPlatbyDto {
		/**DBCOLUMN:SeznamPohybuPlatby.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.radek_uhr*/
		radek_uhr?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.typ_upr*/
		typ_upr?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uea*/
		uea?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uec*/
		uec?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.ued*/
		ued?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uee*/
		uee?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uef*/
		uef?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uei*/
		uei?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uej*/
		uej?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te0*/
		te0?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te1*/
		te1?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te2*/
		te2?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te3*/
		te3?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te4*/
		te4?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uek*/
		uek?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uel*/
		uel?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uem*/
		uem?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.uen*/
		uen?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te5*/
		te5?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te6*/
		te6?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te7*/
		te7?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te8*/
		te8?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.te9*/
		te9?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.popis_upo*/
		popis_upo?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamPohybuPlatby.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPohybuPlatby.obd_zprac_uo*/
		obd_zprac_uo?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.ixp_pre*/
		ixp_pre?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.radek_uhr_pre*/
		radek_uhr_pre?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.por_cislo_zme*/
		por_cislo_zme?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.priz_zme*/
		priz_zme?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.popis_zme*/
		popis_zme?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.radek_upo_rez*/
		radek_upo_rez?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:SeznamPohybuPlatby.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:SeznamPohybuPlatby.radek_hdr*/
		radek_hdr?: number|null;
	}
	const enum GPohybPlatbyDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", typ_upr = "typ_upr", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis_upo = "popis_upo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo = "por_cislo", c = "c", obd_zprac_uo = "obd_zprac_uo", ixp_pre = "ixp_pre", radek_uhr_pre = "radek_uhr_pre", por_cislo_zme = "por_cislo_zme", priz_zme = "priz_zme", popis_zme = "popis_zme", radek_upo_rez = "radek_upo_rez", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", radek_upo = "radek_upo", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr",}
	const enum GPohybPlatbyDtoFragments { ixp = "Base", radek_uhr = "Base", typ_upr = "Base", nks = "Base", uea = "Base", ueb = "Base", uec = "Base", ued = "Base", uee = "Base", uef = "Base", ueg = "Base", ueh = "Base", uei = "Base", uej = "Base", te0 = "Base", te1 = "Base", te2 = "Base", te3 = "Base", te4 = "Base", uek = "Base", uel = "Base", uem = "Base", uen = "Base", te5 = "Base", te6 = "Base", te7 = "Base", te8 = "Base", te9 = "Base", popis_upo = "Base", dat_zmena = "Base", zmenu_prov = "Base", por_cislo = "Base", c = "Base", obd_zprac_uo = "Base", ixp_pre = "Base", radek_uhr_pre = "Base", por_cislo_zme = "Base", priz_zme = "Base", popis_zme = "Base", radek_upo_rez = "Base", ixp_sml = "Base", rok_sml = "Base", cislo_sml = "Base", radek_upo = "Base", id_hdr_ris = "Base", radek_hdr = "Base",}
	const enum GPohybPlatbyDtoTypes { ixp = "string", radek_uhr = "number", typ_upr = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis_upo = "string", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo = "number", c = "JsonDecimal", obd_zprac_uo = "string", ixp_pre = "string", radek_uhr_pre = "number", por_cislo_zme = "number", priz_zme = "number", popis_zme = "string", radek_upo_rez = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", radek_upo = "number", id_hdr_ris = "string", radek_hdr = "number",}
	const enum GPohybPlatbyDtoTypeLengths { ixp = 12, typ_upr = 15, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis_upo = 50, zmenu_prov = 12, obd_zprac_uo = 4, ixp_pre = 12, popis_zme = 254, ixp_sml = 12, id_hdr_ris = 10,}
	/**Primární klíč platby*/
	interface GPlatbaPkDto {
		/**PID platby*/
		ixp?: string|null;
		/**řádek úhrady*/
		radek_uhr?: number|null;
	}
	const enum GPlatbaPkDtoNames { ixp = "ixp", radek_uhr = "radek_uhr",}
	const enum GPlatbaPkDtoFragments { ixp = "*", radek_uhr = "*",}
	const enum GPlatbaPkDtoTypes { ixp = "string", radek_uhr = "number",}
	const enum GPlatbaPkDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Gordic.Fuc.Interface.IGHistorieUctovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Historie účtování pohybů
	*     
	* @domain FinUctarna
	*/
	interface FinPohybHistorieUctovani {
		/**
		*     Načte detail historie účtování
		*     
		*/
		read(rq?:Gordic.Fuc.Interface.GHistorieUctovaniDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>,GServiceReadResponse<Gordic.Fuc.Interface.GHistorieUctovaniDto>>;
		/**
		*     Načte seznam historie účtování
		*     
		*/
		list(rq?:CallParams<GServiceListRequestWithOrder<Gordic.Fuc.Interface.GHistorieUctovaniOrderBy>>): _Task<GServiceListRequestWithOrder<Gordic.Fuc.Interface.GHistorieUctovaniOrderBy>,GServiceListResponse<Gordic.Fuc.Interface.GHistorieUctovaniDto>>;
		/**
		*     Zjistí počet historií účtování
		*     
		*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     Vrátí oprávnění historie účtování (společné pro celý seznam)
		*     
		*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GHistorieUctovaniServicePermission>;
		/**
		*     Kontrola předaných historií před opravou nedokonceného účtování
		*     
		*/
		zkontrolujPredOpravouNedokoncene(rq?:Gordic.Fuc.Interface.GHistorieUctovaniOpravaNedokonceneOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GHistorieUctovaniOpravaNedokonceneOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GHistorieUctovaniOpravaNedokonceneOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Oprava nedokončeného účtování
		*     
		*/
		opravNedokoncene(rq?:Gordic.Fuc.Interface.GHistorieUctovaniOpravaNedokonceneOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniOpravaNedokonceneOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniOpravaNedokonceneOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Kontrola předaných historií před stornem nedokonceného účtování
		*     
		*/
		zkontrolujPredStornemNedokoncene(rq?:Gordic.Fuc.Interface.GHistorieUctovaniStornoNedokonceneOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GHistorieUctovaniStornoNedokonceneOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GHistorieUctovaniStornoNedokonceneOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Storno nedokončeného účtování
		*     
		*/
		stornujNedokoncene(rq?:Gordic.Fuc.Interface.GHistorieUctovaniStornoNedokonceneOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniStornoNedokonceneOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniStornoNedokonceneOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Kontrola předaných historií před nastavením stavu zaúčtováno
		*     
		*/
		zkontrolujPredNastavenimZauctovano(rq?:Gordic.Fuc.Interface.GHistorieUctovaniNastaveniDokonceniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GHistorieUctovaniNastaveniDokonceniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GHistorieUctovaniNastaveniDokonceniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Nastavení stavu zaúčtováno
		*     
		*/
		nastavZauctovano(rq?:Gordic.Fuc.Interface.GHistorieUctovaniNastaveniDokonceniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniNastaveniDokonceniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniNastaveniDokonceniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Založení historie účtování (pouze hlavní tabulka bez pohybů)
		*     
		*/
		create(rq?:Gordic.Fuc.Interface.GHistorieUctovaniDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Aktualizace historie účtování (pouze hlavní tabulka bez pohybů)
		*     
		*/
		update(rq?:Gordic.Fuc.Interface.GHistorieUctovaniDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Aktualizace informací o fázi historie (ukládá pouze stav účtování, příslušný datum začátku nebo konce fáze a příznak odloženého zpracování)
		*     
		*/
		updateFaze(rq?:Gordic.Fuc.Interface.GHistorieUctovaniUpdateFazeOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniUpdateFazeOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniUpdateFazeOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Založení historie včetně nastavení stavu zahájení a uložení pohybů
		*     
		*/
		createWithPohyby(rq?:Gordic.Fuc.Interface.GHistorieUctovaniDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Aktualizace historie účtování včetně pohybů
		*     
		*/
		updateWithPohyby(rq?:Gordic.Fuc.Interface.GHistorieUctovaniDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GHistorieUctovaniDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
		/**
		*     Uložení pohybů k historii účtování
		*     
		*/
		ulozPohyby(rq?:Gordic.Fuc.Interface.GHistorieUctovaniUlozeniPohybuOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniUlozeniPohybuOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GHistorieUctovaniUlozeniPohybuOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GHistorieUctovaniPkDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FinPohybHistorieUctovani: ServiceBase & Catalog.FinPohybHistorieUctovani;
	}
	const FinPohybHistorieUctovani: Client["FinPohybHistorieUctovani"];
}
declare namespace Gordic.Fuc.Interface {
	/**
	*     Oprávnění pro jednu historii účtování
	*     
	*/
	interface GHistorieUctovaniPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit nedokončenou historii účtování*/
		LzeOpravitNedokoncene: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat nedokončené účtování*/
		LzeStornovatNedokoncene: Gordic.General.ApplicationInterface.GPermission;
		/**lze nastavit stav zaúčtováno*/
		LzeNastavitZauctovano: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit diagnostiku*/
		LzeDiagnostika: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GHistorieUctovaniPermissionNames { LzeZobrazit = "LzeZobrazit", LzeOpravitNedokoncene = "LzeOpravitNedokoncene", LzeStornovatNedokoncene = "LzeStornovatNedokoncene", LzeNastavitZauctovano = "LzeNastavitZauctovano", LzeDiagnostika = "LzeDiagnostika",}
	const enum GHistorieUctovaniPermissionFragments { LzeZobrazit = "*", LzeOpravitNedokoncene = "*", LzeStornovatNedokoncene = "*", LzeNastavitZauctovano = "*", LzeDiagnostika = "*",}
	const enum GHistorieUctovaniPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeOpravitNedokoncene = "Gordic.General.ApplicationInterface.GPermission", LzeStornovatNedokoncene = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitZauctovano = "Gordic.General.ApplicationInterface.GPermission", LzeDiagnostika = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GHistorieUctovaniPermissionTypeLengths {}
	/**
	*     Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)
	*     
	*/
	interface GHistorieUctovaniPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GHistorieUctovaniPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GHistorieUctovaniPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GHistorieUctovaniPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GHistorieUctovaniPermissionRequiredFragmentsTypeLengths {}
	/**
	*     Oprávnění pro práci nad historií účtování
	*     
	*/
	interface GHistorieUctovaniServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit nedokončenou historii účtování*/
		LzeOpravitNedokoncene: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat nedokončené účtování*/
		LzeStornovatNedokoncene: Gordic.General.ApplicationInterface.GPermission;
		/**lze nastavit stav zaúčtováno*/
		LzeNastavitZauctovano: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GHistorieUctovaniServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzeOpravitNedokoncene = "LzeOpravitNedokoncene", LzeStornovatNedokoncene = "LzeStornovatNedokoncene", LzeNastavitZauctovano = "LzeNastavitZauctovano",}
	const enum GHistorieUctovaniServicePermissionFragments { LzeZobrazit = "*", LzeOpravitNedokoncene = "*", LzeStornovatNedokoncene = "*", LzeNastavitZauctovano = "*",}
	const enum GHistorieUctovaniServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeOpravitNedokoncene = "Gordic.General.ApplicationInterface.GPermission", LzeStornovatNedokoncene = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitZauctovano = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GHistorieUctovaniServicePermissionTypeLengths {}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu historie účtování
	*     
	*/
	const enum GHistorieUctovaniFilter {
		/**identifikátor*/
		ixs_huf,
		/**zpracovatel*/
		ixs_fun_akt,
		/**typ účtování (jednotlivě, hromadně nebo kumulovaně)*/
		typ_uct_fuc,
		/**stav účtování*/
		stav_uctovani,
		/**datum zahájení účtování*/
		dat_start,
		/**datum ukončení účtování*/
		dat_konec,
		/**způsob účtování (v libovolné z fází)*/
		priz_odl,
		/**poznámka*/
		poznamka,
		/**kategorie účtování pohybů*/
		uct_poh,
		/**kumulace za PID případu*/
		kumul_za_ixp,
		/**středisková vyrovnanost*/
		priz_vyr_nks,
		/**bez kontroly na přečerpání*/
		priz_bez_kontr,
		/**zachovat ručně pořízené zápisy*/
		zach_ruc_zapisy,
		/**e-účetnictví*/
		e_ucetnictvi,
		/**datum změny starší než zadaný počet hodin*/
		dz_starsi_nez_hodin,
	}
	/**
	*     Výčet sloupců pro řazení
	*     
	*/
	const enum GHistorieUctovaniOrderBy {
		/**datum poslední změny*/
		dat_zmena,
	}
	/**
	*     Parametry uložení pohybů k historii platby
	*     
	*/
	interface GHistorieUctovaniUlozeniPohybuOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GHistorieUctovaniDto> {
		/**id historie*/
		ixs_huf?: string|null;
	}
	const enum GHistorieUctovaniUlozeniPohybuOperationDtoNames { ixs_huf = "ixs_huf", ikc = "ikc", rows = "rows",}
	const enum GHistorieUctovaniUlozeniPohybuOperationDtoFragments { ixs_huf = "*", ikc = "*", rows = "*",}
	const enum GHistorieUctovaniUlozeniPohybuOperationDtoTypes { ixs_huf = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GHistorieUctovaniDto[]",}
	const enum GHistorieUctovaniUlozeniPohybuOperationDtoTypeLengths {}
	/**
	*     Parametry aktualizace fáze k historii platby
	*     
	*/
	interface GHistorieUctovaniUpdateFazeOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GHistorieUctovaniDto> {
		/**id historie*/
		ixs_huf?: string|null;
		/**fáze účtování*/
		faze_uctovani?: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard|null;
		/**zahájení (true) nebo ukončení (false) fáze*/
		start?: boolean|null;
		/**příznak odloženého účtování*/
		priz_odl?: number|null;
	}
	const enum GHistorieUctovaniUpdateFazeOperationDtoNames { ixs_huf = "ixs_huf", faze_uctovani = "faze_uctovani", start = "start", priz_odl = "priz_odl", ikc = "ikc", rows = "rows",}
	const enum GHistorieUctovaniUpdateFazeOperationDtoFragments { ixs_huf = "*", faze_uctovani = "*", start = "*", priz_odl = "*", ikc = "*", rows = "*",}
	const enum GHistorieUctovaniUpdateFazeOperationDtoTypes { ixs_huf = "string", faze_uctovani = "Gordic.Fuc.Interface.FazeUctovaniPohybuWizard", start = "boolean", priz_odl = "number", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GHistorieUctovaniDto[]",}
	const enum GHistorieUctovaniUpdateFazeOperationDtoTypeLengths {}
	/**
	*     Parametry opravy nedokončeného účtování
	*     
	*/
	interface GHistorieUctovaniOpravaNedokonceneOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GHistorieUctovaniDto> {
		/**požadovaná operace (true = oprava)*/
		opravit?: boolean|null;
		/**převést i pohyby ze stavu 'v účtování'*/
		prevest_pohyby?: boolean|null;
		/**smazat i ručně pořízené záznamy u poloautomatických pohybů (false=ne, true=ano)*/
		smazat_poloautomaticke?: boolean|null;
		/**smazat i ručně pořízené záznamy u ručních pohybů (false=ne, true=ano)*/
		smazat_rucni?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GHistorieUctovaniOpravaNedokonceneOperationDtoNames { opravit = "opravit", prevest_pohyby = "prevest_pohyby", smazat_poloautomaticke = "smazat_poloautomaticke", smazat_rucni = "smazat_rucni", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GHistorieUctovaniOpravaNedokonceneOperationDtoFragments { opravit = "*", prevest_pohyby = "*", smazat_poloautomaticke = "*", smazat_rucni = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GHistorieUctovaniOpravaNedokonceneOperationDtoTypes { opravit = "boolean", prevest_pohyby = "boolean", smazat_poloautomaticke = "boolean", smazat_rucni = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GHistorieUctovaniDto[]",}
	const enum GHistorieUctovaniOpravaNedokonceneOperationDtoTypeLengths {}
	/**
	*     Parametry storna nedokončeného účtování
	*     
	*/
	interface GHistorieUctovaniStornoNedokonceneOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GHistorieUctovaniDto> {
		/**požadovaná operace (true = storno)*/
		stornovat?: boolean|null;
		/**převést i pohyby ze stavu 'v účtování'*/
		prevest_pohyby?: boolean|null;
		/**smazat i ručně pořízené záznamy u poloautomatických pohybů (false=ne, true=ano)*/
		smazat_poloautomaticke?: boolean|null;
		/**smazat i ručně pořízené záznamy u ručních pohybů (false=ne, true=ano)*/
		smazat_rucni?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GHistorieUctovaniStornoNedokonceneOperationDtoNames { stornovat = "stornovat", prevest_pohyby = "prevest_pohyby", smazat_poloautomaticke = "smazat_poloautomaticke", smazat_rucni = "smazat_rucni", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GHistorieUctovaniStornoNedokonceneOperationDtoFragments { stornovat = "*", prevest_pohyby = "*", smazat_poloautomaticke = "*", smazat_rucni = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GHistorieUctovaniStornoNedokonceneOperationDtoTypes { stornovat = "boolean", prevest_pohyby = "boolean", smazat_poloautomaticke = "boolean", smazat_rucni = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GHistorieUctovaniDto[]",}
	const enum GHistorieUctovaniStornoNedokonceneOperationDtoTypeLengths {}
	/**
	*     Parametry nastavení stavu zaúčtování
	*     
	*/
	interface GHistorieUctovaniNastaveniDokonceniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GHistorieUctovaniDto> {
		/**požadovaná operace (true = nastavit stav zaúčtováno)*/
		zauctovano?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GHistorieUctovaniNastaveniDokonceniOperationDtoNames { zauctovano = "zauctovano", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GHistorieUctovaniNastaveniDokonceniOperationDtoFragments { zauctovano = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GHistorieUctovaniNastaveniDokonceniOperationDtoTypes { zauctovano = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GHistorieUctovaniDto[]",}
	const enum GHistorieUctovaniNastaveniDokonceniOperationDtoTypeLengths {}
	/**
	*     Stav účtování pohybů
	*     
	*/
	const enum StavUctovaniPohybu {
		/**zahájeno*/
		Zahajeno=0,
		/**zahájena kontrola pohybů*/
		ZahajenaKontrolaPohybu=10,
		/**ukončena kontrola pohybů*/
		UkoncenaKontrolaPohybu=12,
		/**zahájena příprava zápisů*/
		ZahajenaPripravaZapisu=20,
		/**ukončena příprava zápisů*/
		UkoncenaPripravaZapisu=22,
		/**zahájena příprava dokladů*/
		ZahajenaPripravaDokladu=30,
		/**ukončena příprava dokladů*/
		UkoncenaPripravaDokladu=32,
		/**zahájeno zaúčtování*/
		ZahajenoZauctovani=40,
		/**ukončeno zaúčtování*/
		UkoncenoZauctovani=42,
		/**zaúčtováno (konečný stav)*/
		Zauctovano=100,
		/**zaúčtováno s přečerpáním (konečný stav)*/
		ZauctovanoSPrecerpanim=110,
		/**přerušeno uživatelem*/
		PrerusenoUzivatelem=200,
		/**přerušeno kvůli chybě*/
		PrerusenoKvuliChybe=210,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Gordic.Fuc.Interface.IGPohyb.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Účetní a rezervační pohyby
	*     
	* @domain FinUctarna
	*/
	interface FinPohyb {
		/**
		*     Načte detail pohybu
		*     
		*/
		read(rq?:Gordic.Fuc.Interface.GPohybDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GPohybDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GPohybDto>,GServiceReadResponse<Gordic.Fuc.Interface.GPohybDto>>;
		/**
		*     Načte seznam pohybů
		*     
		*/
		list(rq?:Gordic.Fuc.Interface.GPohybFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GPohybDto>>;
		/**
		*     Načte seznam účetních pohybů, které jsou ve stavu "v účtování"
		*     
		*/
		listTypUprVUctovani(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GTypUprVUctovaniDto>>;
		/**
		*     Zjistí počet pohybů
		*     
		*/
		listCount(rq?:Gordic.Fuc.Interface.GPohybFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     Zjistí počty pohybů za zadané kategorie účtovaných pohybů (ve filtrech))
		*     
		*/
		listCountsUctPohPredpis(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,Gordic.Fuc.Interface.GPocetZaUctPohDto[]>;
		/**
		*     Uložení pohybu (pouze vybrané hodnoty)
		*     
		*/
		update(rq?:Gordic.Fuc.Interface.GPohybDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GPohybDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GPohybDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kopie existujícího pohybu s opačnými znaménky částek (včetně kopie vybraných zápisů)
		*     
		*/
		duplikuj(rq?:Gordic.Fuc.Interface.GPohybDuplikovaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPohybDuplikovaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPohybDuplikovaniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před účtováním
		*     
		*/
		zkontrolujPredUctovanim(rq?:Gordic.Fuc.Interface.GPohybUctovaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybUctovaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybUctovaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před účtováním (zjednodušená verze pro použití po kompletní kontrole ZkontrolujPredUctovanim, nevrací chyby k jednotlivým záznamům)
		*     
		*/
		zkontrolujPredUctovanimZjednodusene(rq?:Gordic.Fuc.Interface.GPohybUctovaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybUctovaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybUctovaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Inicializace a prvotní kontrola pohybů před účtováním
		*     
		*/
		inicializujAZkontrolujPredUctovanim(rq?:Gordic.Fuc.Interface.GPohybInicializaceUctovaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybInicializaceUctovaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybInicializaceUctovaniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybInicializaceUctovaniOutputDto>>;
		/**
		*     Vrátí informaci, jestli v seznamu pohybů v účtování jsou i pohyby poloautomatické nebo ruční
		*     
		*/
		jsouNeautomaticke(rq?:CallParams<{ikc:Gordic.General.GIkc}>): _Task<{ikc:Gordic.General.GIkc},boolean>;
		/**
		*     Vrátí informaci, jestli je typ účtování pro dané pohyby povolen
		*     
		*/
		jeUctovaniPovoleno(rq?:CallParams<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu,rows:Gordic.Fuc.Interface.GPohybDto[]}>): _Task<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu,rows:Gordic.Fuc.Interface.GPohybDto[]},boolean>;
		/**
		*     Vrátí informaci, jestli jsou typy účtování pro dané pohyby povolena
		*     
		*/
		jsouUctovaniPovolena(rq?:CallParams<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu[],rows:Gordic.Fuc.Interface.GPohybDto[]}>): _Task<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu[],rows:Gordic.Fuc.Interface.GPohybDto[]},any>;
		/**
		*     Účtování účetních pohybů (přes průvodce)
		*     
		*/
		uctujPresWizard(rq?:CallParams<{ikc:Gordic.General.GIkc,ixsHuf:string,fazeUctovani:Gordic.Fuc.Interface.FazeUctovaniPohybuWizard,minulaFazeUctovani:Gordic.Fuc.Interface.FazeUctovaniPohybuWizard,typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu,kumulaceZaIxp:boolean,vyrovnanost:boolean,bezKontrolyPrecerpani:boolean,zachovatRucniZapisy:boolean,eUcetnictvi:boolean,ixsFunOozuUct:string,ixpDenUct:string}>): _Task<{ikc:Gordic.General.GIkc,ixsHuf:string,fazeUctovani:Gordic.Fuc.Interface.FazeUctovaniPohybuWizard,minulaFazeUctovani:Gordic.Fuc.Interface.FazeUctovaniPohybuWizard,typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu,kumulaceZaIxp:boolean,vyrovnanost:boolean,bezKontrolyPrecerpani:boolean,zachovatRucniZapisy:boolean,eUcetnictvi:boolean,ixsFunOozuUct:string,ixpDenUct:string},void>;
		/**
		*     Kontrola předaných pohybů před rezervací
		*     
		*/
		zkontrolujPredRezervaci(rq?:Gordic.Fuc.Interface.GPohybRezervaceOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybRezervaceOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybRezervaceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Rezervace / odrezervace pohybu
		*     
		*/
		rezervuj(rq?:Gordic.Fuc.Interface.GPohybRezervaceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPohybRezervaceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPohybRezervaceOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Hromadné rezervace / odrezervace předaných pohybů
		*     
		*/
		hromadneRezervuj(rq?:Gordic.Fuc.Interface.GPohybRezervaceOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybRezervaceOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybRezervaceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před stornem / zrušením storna
		*     
		*/
		zkontrolujPredStornem(rq?:Gordic.Fuc.Interface.GPohybStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Storno / zrušení storna pohybu
		*     
		*/
		stornuj(rq?:Gordic.Fuc.Interface.GPohybStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPohybStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPohybStornoOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Hromadné storno / zrušení storna předaných pohybů
		*     
		*/
		hromadneStornuj(rq?:Gordic.Fuc.Interface.GPohybStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před změnou účetních parametrů
		*     
		*/
		zkontrolujPredZmenouUcetnichParametru(rq?:Gordic.Fuc.Interface.GPohybZmenaUcetnichParametruOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybZmenaUcetnichParametruOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybZmenaUcetnichParametruOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Hromadná změna účetních parametrů předaných pohybů
		*     
		*/
		hromadneZmenUcetniParametry(rq?:Gordic.Fuc.Interface.GPohybZmenaUcetnichParametruOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybZmenaUcetnichParametruOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybZmenaUcetnichParametruOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před servisné změnou stavů
		*     
		*/
		zkontrolujPredServisniZmenouStavu(rq?:Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Servisní změna stavů pohybu
		*     
		*/
		servisneZmenStavy(rq?:Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Hromadná servisní změna stavů předaných pohybů
		*     
		*/
		hromadneServisneZmenStavy(rq?:Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybServisniZmenaStavuOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před změnou údajů IISSP
		*     
		*/
		zkontrolujPredZmenouIissp(rq?:Gordic.Fuc.Interface.GPohybZmenaIisspOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybZmenaIisspOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybZmenaIisspOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Změna údajů IISSP na pohybu
		*     
		*/
		zmenIissp(rq?:Gordic.Fuc.Interface.GPohybZmenaIisspOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPohybZmenaIisspOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPohybZmenaIisspOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Kontrola předaných pohybů před vložením/vyjmutím do/ze soupisky
		*     
		*/
		zkontrolujPredVlozenimDoSoupisky(rq?:Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Vložení/vyjmutí pohybu do/ze soupisky
		*     
		*/
		vlozDoSoupisky(rq?:Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Hromadné vložení/vyjmutí předaných pohybů do/ze soupisky
		*     
		*/
		hromadneVlozDoSoupisky(rq?:Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPohybPkDto>>;
		/**
		*     Převod pohybů ze stavu "v účtování" do "nezaúčtováno"
		*     
		*/
		prevedZVUctovaniDoNezauctovano(rq?:CallParams<{typUpr:Gordic.Fuc.Interface.GTypUprVUctovaniDto[],rok:number,smazatPoloautomaticke:boolean,smazatRucni:boolean}>): _Task<{typUpr:Gordic.Fuc.Interface.GTypUprVUctovaniDto[],rok:number,smazatPoloautomaticke:boolean,smazatRucni:boolean},void>;
		/**
		*     Kontrola data na uzavřené období
		*     
		*/
		zkontrolujNaUzavreneObdobi(rq?:CallParams<{mesic:number,rok:number,drd:number}>): _Task<{mesic:number,rok:number,drd:number},boolean>;
		/**
		*     Vrátí číslo řádku s podklady pro kontrolní hlášení DPH
		*     
		*/
		vratCisloRadkuPodkladuKontrolnihoHlaseniDph(rq?:CallParams<{ixpUpr:string,radekUpo:number}>): _Task<{ixpUpr:string,radekUpo:number},number>;
		/**
		*     Uloží podklady pro kontrolní hlášení DPH
		*     
		*/
		ulozPodkladyKontrolnihoHlaseniDph(rq?:CallParams<{ixpUpr:string,radekUpo:number,evidencniCisloDanDokladu:string,datZdanitelnehoPlneni:JsonDate,datUplatneniDane:JsonDate,datVystaveni:JsonDate,datEvidence:JsonDate,prizOstatniZdanitelnaPlneni:number,prizPouzitPomer:number,prizInsolvence:number,prizPlneni:number,radekUpoOpr:number,typAg:number}>): _Task<{ixpUpr:string,radekUpo:number,evidencniCisloDanDokladu:string,datZdanitelnehoPlneni:JsonDate,datUplatneniDane:JsonDate,datVystaveni:JsonDate,datEvidence:JsonDate,prizOstatniZdanitelnaPlneni:number,prizPouzitPomer:number,prizInsolvence:number,prizPlneni:number,radekUpoOpr:number,typAg:number},void>;
		/**
		*     Vrátí oprávnění pohybů (společné pro celý seznam)
		*     
		*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GPohybServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FinPohyb: ServiceBase & Catalog.FinPohyb;
	}
	const FinPohyb: Client["FinPohyb"];
}
declare namespace Gordic.Fuc.Interface {
	/**
	*     Oprávnění pro jeden pohyb
	*     
	*/
	interface GPohybPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze účtovat (účetní pohyby)*/
		LzeUctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze rezervovat (rezervační pohyby)*/
		LzeRezervovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odrezervovat (rezervační pohyby)*/
		LzeOdrezervovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit*/
		LzeOpravit: Gordic.General.ApplicationInterface.GPermission;
		/**lze z pohybu vytvořit nový pohyb*/
		LzeNovyPohyb: Gordic.General.ApplicationInterface.GPermission;
		/**lze servisní nástroje*/
		LzeServis: Gordic.General.ApplicationInterface.GPermission;
		/**lze vložit do soupisky*/
		LzeVlozitDoSoupisky: Gordic.General.ApplicationInterface.GPermission;
		/**lze vyjmout ze soupisky*/
		LzeVyjmoutZeSoupisky: Gordic.General.ApplicationInterface.GPermission;
		/**lze změnit parametry IISSP*/
		LzeZmenitIissp: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPohybPermissionNames { LzeZobrazit = "LzeZobrazit", LzeUctovat = "LzeUctovat", LzeRezervovat = "LzeRezervovat", LzeOdrezervovat = "LzeOdrezervovat", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeOpravit = "LzeOpravit", LzeNovyPohyb = "LzeNovyPohyb", LzeServis = "LzeServis", LzeVlozitDoSoupisky = "LzeVlozitDoSoupisky", LzeVyjmoutZeSoupisky = "LzeVyjmoutZeSoupisky", LzeZmenitIissp = "LzeZmenitIissp", LzeTisknout = "LzeTisknout",}
	const enum GPohybPermissionFragments { LzeZobrazit = "*", LzeUctovat = "*", LzeRezervovat = "*", LzeOdrezervovat = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeOpravit = "*", LzeNovyPohyb = "*", LzeServis = "*", LzeVlozitDoSoupisky = "*", LzeVyjmoutZeSoupisky = "*", LzeZmenitIissp = "*", LzeTisknout = "*",}
	const enum GPohybPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeUctovat = "Gordic.General.ApplicationInterface.GPermission", LzeRezervovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdrezervovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeOpravit = "Gordic.General.ApplicationInterface.GPermission", LzeNovyPohyb = "Gordic.General.ApplicationInterface.GPermission", LzeServis = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoSoupisky = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutZeSoupisky = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitIissp = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPohybPermissionTypeLengths {}
	/**
	*     Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)
	*     
	*/
	interface GPohybPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GPohybPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GPohybPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GPohybPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GPohybPermissionRequiredFragmentsTypeLengths {}
	/**
	*     Oprávnění pro práci nad pohyby
	*     
	*/
	interface GPohybServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze účtovat (účetní pohyby)*/
		LzeUctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze rezervovat (rezervační pohyby)*/
		LzeRezervovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odrezervovat (rezervační pohyby)*/
		LzeOdrezervovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze měnit účetní parametry*/
		LzeUctParametry: Gordic.General.ApplicationInterface.GPermission;
		/**lze servisní nástroje*/
		LzeServis: Gordic.General.ApplicationInterface.GPermission;
		/**lze vložit do soupisky*/
		LzeVlozitDoSoupisky: Gordic.General.ApplicationInterface.GPermission;
		/**lze vyjmout ze soupisky*/
		LzeVyjmoutZeSoupisky: Gordic.General.ApplicationInterface.GPermission;
		/**lze změnit parametry IISSP*/
		LzeZmenitIissp: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPohybServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzeUctovat = "LzeUctovat", LzeRezervovat = "LzeRezervovat", LzeOdrezervovat = "LzeOdrezervovat", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeUctParametry = "LzeUctParametry", LzeServis = "LzeServis", LzeVlozitDoSoupisky = "LzeVlozitDoSoupisky", LzeVyjmoutZeSoupisky = "LzeVyjmoutZeSoupisky", LzeZmenitIissp = "LzeZmenitIissp", LzeTisknout = "LzeTisknout",}
	const enum GPohybServicePermissionFragments { LzeZobrazit = "*", LzeUctovat = "*", LzeRezervovat = "*", LzeOdrezervovat = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeUctParametry = "*", LzeServis = "*", LzeVlozitDoSoupisky = "*", LzeVyjmoutZeSoupisky = "*", LzeZmenitIissp = "*", LzeTisknout = "*",}
	const enum GPohybServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeUctovat = "Gordic.General.ApplicationInterface.GPermission", LzeRezervovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdrezervovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeUctParametry = "Gordic.General.ApplicationInterface.GPermission", LzeServis = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoSoupisky = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutZeSoupisky = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitIissp = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPohybServicePermissionTypeLengths {}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu pohybů případů
	*     
	*/
	const enum GPohybFilter {
		/**identifikátor*/
		ixp_upr,
		/**řádek pohybu*/
		radek_upo,
		/**druh pohybu*/
		druh_upo,
		/**druh pohybu*/
		druh_poh,
		/**typ pohybu*/
		typ_upo,
		/**kategorie pohybu*/
		ktg_upo,
		/**kategorie pohybu předpisu*/
		ktg_upo_pre,
		/**kontace*/
		ixs_kon,
		/**nákladové středisko*/
		nks,
		/**účtárna*/
		uus,
		/**stav pohybu*/
		s_upo,
		/**stav storna*/
		s_sto,
		/**rok aktuálního příhlášení*/
		akt_rok,
		/**rok*/
		rok,
		/**datum účtování*/
		dat_uct,
		/**datum pohybu*/
		dat_upo,
		/**částka*/
		c_upo,
		/**popis*/
		popis_upo,
		/**typ účetního případu*/
		typ_upr,
		/**externí subjekt*/
		ixs_esu,
		/**číslo účetního dokladu*/
		ac_ixe,
		/**subřada deníku účetních zápisů*/
		subrada_duz,
		/**číslo účetního dokladu v externím systému*/
		ac_ext,
		/**konstantní symbol*/
		ks,
		/**variabilní symbol*/
		vs,
		/**specifický symbol*/
		ss,
		/**identifikátor bankovního výpisu*/
		ixp_bvp,
		/**pohyby bez bankovního výpisu*/
		bez_vypisu,
		/**příznak daňového pohybu*/
		priz_dd,
		/**IISSP - ID RIS*/
		id_hdr_ris,
		/**IISSP - řádek RIS*/
		radek_hdr,
		/**kategorie účtovaných pohybů (pro rozlišení vybraného účtování)*/
		uct_poh,
		/**identifikátor soupisky*/
		ixp,
		/**pohyby bez soupisky*/
		bez_soupisky,
		/**řádek navázaného rezervačního pohybu*/
		radek_upo_rez,
		/**aktuální vlastník*/
		upr_ixs_fun_akt,
		/**kategorie případu*/
		upr_ktg_upr,
		/**typ agendy*/
		upr_typ_ag,
		/**kniha*/
		upr_ixp_den,
		/**typ účetního případu*/
		upr_typ_upr,
		/**kategorie typu dokladu*/
		upr_ktg_typ,
		/**popis případu*/
		upr_popis,
		/**poznámka případu*/
		upr_poznamka,
		/**stav případu*/
		upr_s_upr,
		/**defaultní stav případu*/
		upr_s_upr_def,
		/**pohyby účtované stejným dokladem (musí být vyplněny filtry uct_rok, uct_lic, uct_ico, uct_ucs, uct_mesic a uct_ac)*/
		uct_st_doklad,
		/**rok dokladu pro pohyby účtované stejným dokladem*/
		uct_rok,
		/**licence dokladu pro pohyby účtované stejným dokladem*/
		uct_lic,
		/**IČO dokladu pro pohyby účtované stejným dokladem*/
		uct_ico,
		/**UCS dokladu pro pohyby účtované stejným dokladem*/
		uct_ucs,
		/**měsíc dokladu pro pohyby účtované stejným dokladem*/
		uct_mesic,
		/**číslo dokladu pro pohyby účtované stejným dokladem*/
		uct_ac,
		/**pro pohyby účtované stejným dokladem vynechat tento identifikátor*/
		uct_bez_ixp_upr,
		/**pro pohyby účtované stejným dokladem vynechat tento řádek pohybu*/
		uct_bez_radek_upo,
		/**pohyby bez zápisů*/
		zap_bez_zapisu,
		/**pohyby se zápisy*/
		zap_se_zapisy,
		/**pohyby se zápisy se zadanou větou (pro zap_se_zapisy > 0)*/
		zap_veta,
		/**pohyby se zápisy nevyrovanými za NKS*/
		zap_nevyrovnane_za_nks,
		/**pohyby se zápisy nevyrovanými bez ohledu na NKS*/
		zap_nevyrovnane_bez_nks,
		/**id historie*/
		huf_ixs_huf,
		/**neúčtují se podle historie*/
		huf_neuctovane,
		/**existence v tabulce fucduct*/
		duct_ano,
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck,
		/**IKC v tabulce fucduct*/
		duct_ikc,
		/**IČO NKS (na serveru se nezpracovává)*/
		ignore_ico_nks,
		/**IČO UUS (na serveru se nezpracovává)*/
		ignore_ico_uus,
		/**IČO subřady (na serveru se nezpracovává)*/
		ignore_ico_subr,
		/**UCS UUS (na serveru se nezpracovává)*/
		ignore_ucs_uus,
		/**rok subřady (na serveru se nezpracovává)*/
		ignore_rok_subr,
		/**pomocná vazba na tabulku fucduct místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_duct,
	}
	/**
	*     Typ zobrazení seznamu pohybů
	*     
	*/
	const enum TypSeznamPohybu {
		/**účetní pohyby*/
		UcetniPohyby,
		/**rezervační pohyby*/
		RezervacniPohyby,
		/**účtování*/
		Uctovani,
		/**pohyby případu (není to klasický seznamový tab, je to tab na detailu případu)*/
		PohybyPripadu,
		/**pohyby v účtování (není to klasický seznamový tab, je to okno pro účtování)*/
		VUctovani,
		/**pohyby soupisky (není to klasický seznamový tab, je to tab na detailu soupisky)*/
		PohybySoupisky,
	}
	/**
	*     Typy pohybů ke stornu
	*     
	*/
	const enum TypStornovanychPohybu {
		/**jeden účetní pohyb s navázaných rezervačním pohybem*/
		JedenUcetniSRezervacnim,
		/**jeden účetní pohyb bez navázaného rezervačního pohybu*/
		JedenUcetniBezRezervacniho,
		/**jeden rezervační pohyb*/
		JedenRezervacni,
		/**více účetních pohybů*/
		ViceUcetnich,
		/**více rezervační pohybů*/
		ViceRezervacnich,
		/**jeden účetní pohyb s navázaným bankovním výpisem*/
		JedenBankovni,
		/**více účetních pohybů s navázaným bankovním výpisem*/
		ViceBankovnich,
	}
	/**
	*     Typ účtování pohybů
	*     
	*/
	const enum TypUctovaniPohybu {
		/**jednotlivě*/
		Jednotlive=0,
		/**hromadně*/
		Hromadne=10,
		/**kumulovaně*/
		Kumulovane=20,
	}
	/**
	*     Fáze účtování pohybů
	*     
	*/
	const enum FazeUctovaniPohybu {
		/**příprava*/
		Priprava=0,
		/**zaúčtování*/
		Uctovani=10,
		/**zrušení (bez zaúčtování)*/
		Zruseni=20,
		/**opakování přípravy (po ruční editaci zápisů)*/
		OpakovaniPripravy=30,
	}
	/**
	*     Fáze účtování pohybů (přes průvodce)
	*     
	*/
	const enum FazeUctovaniPohybuWizard {
		/**kontrola pohybů*/
		KontrolaPohybu=0,
		/**příprava zápisů*/
		PripravaZapisu=1,
		/**příprava dokladů*/
		PripravaDokladu=2,
		/**zaúčtování*/
		Zauctovani=3,
		/**opakování přípravy (po ruční editaci zápisů)*/
		ZruseniBezZauctovani=4,
		/**není (použitelné pouze pro minulou fázi)*/
		Neni=-1,
	}
	/**
	*     Parametry duplikování pohybu
	*     
	*/
	interface GPohybDuplikovaniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**zápisy, které se mají zduplikovat*/
		radek_zap?: number[]|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPohybDuplikovaniOperationDtoNames { radek_zap = "radek_zap", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPohybDuplikovaniOperationDtoFragments { radek_zap = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPohybDuplikovaniOperationDtoTypes { radek_zap = "number[]", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybDuplikovaniOperationDtoTypeLengths {}
	/**
	*     Parametry účtování pohybu
	*     
	*/
	interface GPohybUctovaniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**typ účtování*/
		typ_uctovani?: Gordic.Fuc.Interface.TypUctovaniPohybu|null;
	}
	const enum GPohybUctovaniOperationDtoNames { typ_uctovani = "typ_uctovani", ikc = "ikc", rows = "rows",}
	const enum GPohybUctovaniOperationDtoFragments { typ_uctovani = "*", ikc = "*", rows = "*",}
	const enum GPohybUctovaniOperationDtoTypes { typ_uctovani = "Gordic.Fuc.Interface.TypUctovaniPohybu", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybUctovaniOperationDtoTypeLengths {}
	/**
	*     Parametry iniciailiace a prvotní kontroly pohybů před účtováním
	*     
	*/
	interface GPohybInicializaceUctovaniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**je účtování puštěno asnychronně?*/
		odlozene?: boolean|null;
		/**kumulace za PID případu?*/
		parKumulovatZaIxp?: boolean|null;
		/**identifkátor historie účtování*/
		ixsHuf?: string|null;
		/**Kategorie účtovaných pohybů*/
		uctPoh?: number|null;
	}
	const enum GPohybInicializaceUctovaniOperationDtoNames { odlozene = "odlozene", parKumulovatZaIxp = "parKumulovatZaIxp", ixsHuf = "ixsHuf", uctPoh = "uctPoh", ikc = "ikc", rows = "rows",}
	const enum GPohybInicializaceUctovaniOperationDtoFragments { odlozene = "*", parKumulovatZaIxp = "*", ixsHuf = "*", uctPoh = "*", ikc = "*", rows = "*",}
	const enum GPohybInicializaceUctovaniOperationDtoTypes { odlozene = "boolean", parKumulovatZaIxp = "boolean", ixsHuf = "string", uctPoh = "number", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybInicializaceUctovaniOperationDtoTypeLengths {}
	/**
	*     Výstupní struktura z inicializace a prvotní kontroly pohybů před účtováním
	*     
	*/
	interface GPohybInicializaceUctovaniOutputDto {
		/**kumulace za PID případu?*/
		parKumulovatZaIxp?: boolean|null;
		/**je povoleno účtování jednotlivě?*/
		povolenoUctovaniJednotlive?: boolean|null;
		/**je povoleno účtování hromadně?*/
		povolenoUctovaniHromadne?: boolean|null;
		/**je povoleno účtování kumulovaně?*/
		povolenoUctovaniKumulovane?: boolean|null;
		/**případná informace zobrazená ve flashi/okně*/
		flashInfo?: string|null;
		/**počet účtovaných pohybů*/
		pocetPohybu?: number|null;
		/**identifkátor historie účtování*/
		ixsHuf?: string|null;
		/**chyba zjistěná při kontrole (celková netýkající se bez konkrétního pohybu)*/
		chyba?: string|null;
	}
	const enum GPohybInicializaceUctovaniOutputDtoNames { parKumulovatZaIxp = "parKumulovatZaIxp", povolenoUctovaniJednotlive = "povolenoUctovaniJednotlive", povolenoUctovaniHromadne = "povolenoUctovaniHromadne", povolenoUctovaniKumulovane = "povolenoUctovaniKumulovane", flashInfo = "flashInfo", pocetPohybu = "pocetPohybu", ixsHuf = "ixsHuf", chyba = "chyba",}
	const enum GPohybInicializaceUctovaniOutputDtoFragments { parKumulovatZaIxp = "*", povolenoUctovaniJednotlive = "*", povolenoUctovaniHromadne = "*", povolenoUctovaniKumulovane = "*", flashInfo = "*", pocetPohybu = "*", ixsHuf = "*", chyba = "*",}
	const enum GPohybInicializaceUctovaniOutputDtoTypes { parKumulovatZaIxp = "boolean", povolenoUctovaniJednotlive = "boolean", povolenoUctovaniHromadne = "boolean", povolenoUctovaniKumulovane = "boolean", flashInfo = "string", pocetPohybu = "number", ixsHuf = "string", chyba = "string",}
	const enum GPohybInicializaceUctovaniOutputDtoTypeLengths {}
	/**
	*     Parametry rezervování pohybu
	*     
	*/
	interface GPohybRezervaceOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**požadovaná operace (true = rezervovat, false = odrezervovat)*/
		rezervovat?: boolean|null;
		/**kontrola prečerpání (false = kontrolovat, true = nekontrolovat)*/
		bez_kontroly_na_precerpani?: boolean|null;
	}
	const enum GPohybRezervaceOperationDtoNames { rezervovat = "rezervovat", bez_kontroly_na_precerpani = "bez_kontroly_na_precerpani", ikc = "ikc", rows = "rows",}
	const enum GPohybRezervaceOperationDtoFragments { rezervovat = "*", bez_kontroly_na_precerpani = "*", ikc = "*", rows = "*",}
	const enum GPohybRezervaceOperationDtoTypes { rezervovat = "boolean", bez_kontroly_na_precerpani = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybRezervaceOperationDtoTypeLengths {}
	/**
	*     Parametry storna / zrušení storna pohybu
	*     
	*/
	interface GPohybStornoOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**nový den (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)*/
		den?: number|null;
		/**nový měsíc (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)*/
		mesic?: number|null;
		/**nový rok (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)*/
		rok?: number|null;
		/**nový měsíc DPH (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)*/
		mesic_dph?: number|null;
		/**nový rok DPH (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)*/
		rok_dph?: number|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPohybStornoOperationDtoNames { stornovat = "stornovat", den = "den", mesic = "mesic", rok = "rok", mesic_dph = "mesic_dph", rok_dph = "rok_dph", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPohybStornoOperationDtoFragments { stornovat = "*", den = "*", mesic = "*", rok = "*", mesic_dph = "*", rok_dph = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPohybStornoOperationDtoTypes { stornovat = "boolean", den = "number", mesic = "number", rok = "number", mesic_dph = "number", rok_dph = "number", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybStornoOperationDtoTypeLengths {}
	/**
	*     Parametry vložení/vyjmutí do/ze soupisky
	*     
	*/
	interface GPohybVlozeniDoSoupiskyOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**požadovaná operace (true = vložit do soupisky, false = vyjmout ze soupisky)*/
		vlozit?: boolean|null;
		/**PID soupisky*/
		ixp?: string|null;
	}
	const enum GPohybVlozeniDoSoupiskyOperationDtoNames { vlozit = "vlozit", ixp = "ixp", ikc = "ikc", rows = "rows",}
	const enum GPohybVlozeniDoSoupiskyOperationDtoFragments { vlozit = "*", ixp = "*", ikc = "*", rows = "*",}
	const enum GPohybVlozeniDoSoupiskyOperationDtoTypes { vlozit = "boolean", ixp = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybVlozeniDoSoupiskyOperationDtoTypeLengths {}
	/**
	*     Parametry změny účetních parametrů pohybu
	*     
	*/
	interface GPohybZmenaUcetnichParametruOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**změna data účtování (true = ano, false = ne)*/
		zmenit_dat_uct?: boolean|null;
		/**změna subřady (true = ano, false = ne)*/
		zmenit_subrada_duz?: boolean|null;
		/**původní den účtování*/
		puvodni_den?: number|null;
		/**původní měsíc účtování*/
		puvodni_mesic?: number|null;
		/**původní rok účtování*/
		puvodni_rok?: number|null;
		/**původní subřada deníku účetních zápisů*/
		puvodni_subrada_duz?: number|null;
		/**nový den účtování*/
		novy_den?: number|null;
		/**nový měsíc účtování*/
		novy_mesic?: number|null;
		/**nový rok účtování*/
		novy_rok?: number|null;
		/**nová subřada deníku účetních zápisů*/
		nova_subrada_duz?: number|null;
	}
	const enum GPohybZmenaUcetnichParametruOperationDtoNames { zmenit_dat_uct = "zmenit_dat_uct", zmenit_subrada_duz = "zmenit_subrada_duz", puvodni_den = "puvodni_den", puvodni_mesic = "puvodni_mesic", puvodni_rok = "puvodni_rok", puvodni_subrada_duz = "puvodni_subrada_duz", novy_den = "novy_den", novy_mesic = "novy_mesic", novy_rok = "novy_rok", nova_subrada_duz = "nova_subrada_duz", ikc = "ikc", rows = "rows",}
	const enum GPohybZmenaUcetnichParametruOperationDtoFragments { zmenit_dat_uct = "*", zmenit_subrada_duz = "*", puvodni_den = "*", puvodni_mesic = "*", puvodni_rok = "*", puvodni_subrada_duz = "*", novy_den = "*", novy_mesic = "*", novy_rok = "*", nova_subrada_duz = "*", ikc = "*", rows = "*",}
	const enum GPohybZmenaUcetnichParametruOperationDtoTypes { zmenit_dat_uct = "boolean", zmenit_subrada_duz = "boolean", puvodni_den = "number", puvodni_mesic = "number", puvodni_rok = "number", puvodni_subrada_duz = "number", novy_den = "number", novy_mesic = "number", novy_rok = "number", nova_subrada_duz = "number", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybZmenaUcetnichParametruOperationDtoTypeLengths {}
	/**
	*     Parametry servisní změny stavů pohybu
	*     
	*/
	interface GPohybServisniZmenaStavuOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**změna stavu pohybu (true = ano, false = ne)*/
		zmenit_s_upo?: boolean|null;
		/**změna stavu storna (true = ano, false = ne)*/
		zmenit_s_sto?: boolean|null;
		/**původní stav pohybu*/
		puvodni_s_upo?: number|null;
		/**původní stav storna*/
		puvodni_s_sto?: number|null;
		/**nový stav pohybu*/
		nove_s_upo?: number|null;
		/**nový stav storna*/
		nove_s_sto?: number|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPohybServisniZmenaStavuOperationDtoNames { zmenit_s_upo = "zmenit_s_upo", zmenit_s_sto = "zmenit_s_sto", puvodni_s_upo = "puvodni_s_upo", puvodni_s_sto = "puvodni_s_sto", nove_s_upo = "nove_s_upo", nove_s_sto = "nove_s_sto", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPohybServisniZmenaStavuOperationDtoFragments { zmenit_s_upo = "*", zmenit_s_sto = "*", puvodni_s_upo = "*", puvodni_s_sto = "*", nove_s_upo = "*", nove_s_sto = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPohybServisniZmenaStavuOperationDtoTypes { zmenit_s_upo = "boolean", zmenit_s_sto = "boolean", puvodni_s_upo = "number", puvodni_s_sto = "number", nove_s_upo = "number", nove_s_sto = "number", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybServisniZmenaStavuOperationDtoTypeLengths {}
	/**
	*     Parametry změny údajů IISSP na pohybu
	*     
	*/
	interface GPohybZmenaIisspOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPohybDto> {
		/**id rezervačního dokladu v RISRE*/
		id_hdr_ris?: string|null;
		/**položka rezervačního dokladu*/
		radek_hdr?: number|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPohybZmenaIisspOperationDtoNames { id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPohybZmenaIisspOperationDtoFragments { id_hdr_ris = "*", radek_hdr = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPohybZmenaIisspOperationDtoTypes { id_hdr_ris = "string", radek_hdr = "number", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPohybDto[]",}
	const enum GPohybZmenaIisspOperationDtoTypeLengths {}
	/**
	*     DTO pro vstup do asynchronního účtování
	*     
	*/
	interface GUctovaniInputDto {
		/**id historie účtování*/
		ixsHuf?: string|null;
		/**LPC, kde byla nachystána data*/
		lpc?: number|null;
		/**aktuální IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**fáze účtování (příprava/zaúčtování/zrušení/opakování přípravy)*/
		fazeUctovani?: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard|null;
		/**předchozí fáze účtování (příprava/zaúčtování/zrušení/opakování přípravy)*/
		minulaFazeUctovani?: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard|null;
		/**typ účtování (jednotlivě/hromadně/kumulovaně)*/
		typUctovani?: Gordic.Fuc.Interface.TypUctovaniPohybu|null;
		/**kategorie účtovaných pohybů*/
		uctPoh?: number|null;
		/**uživatelská poznámka*/
		poznamka?: string|null;
		/**kumulace za ixp (false = ne, true = ano)*/
		kumulaceZaIxp?: boolean|null;
		/**vyrovnanost (false = dokladová, true = středisková)*/
		vyrovnanost?: boolean|null;
		/**kontrola prečerpání (false = kontrolovat, true = nekontrolovat)*/
		bezKontrolyPrecerpani?: boolean|null;
		/**povolit prečerpání (false = ne, true = ano); jen pokud je bezKontrolyPrecerpani == false*/
		povolitPrecerpani?: boolean|null;
		/**zachovat ručně pořízené zápisy při zrušení účtování (false = ne, true = ano); má význam pouze pro fázi účtování zrušení*/
		zachovatRucniZapisy?: boolean|null;
		/**účtovat přes UCT místo přímého účtování do účetního deníku (false = ne, true = ano)*/
		eUcetnictvi?: boolean|null;
		/**osoba odpovědná za zaučtování (jen pro e-účetnictví)*/
		ixsFunOozuUct?: string|null;
		/**kniha UCT (jen pro e-účetnictví)*/
		ixpDenUct?: string|null;
	}
	const enum GUctovaniInputDtoNames { ixsHuf = "ixsHuf", lpc = "lpc", ikc = "ikc", fazeUctovani = "fazeUctovani", minulaFazeUctovani = "minulaFazeUctovani", typUctovani = "typUctovani", uctPoh = "uctPoh", poznamka = "poznamka", kumulaceZaIxp = "kumulaceZaIxp", vyrovnanost = "vyrovnanost", bezKontrolyPrecerpani = "bezKontrolyPrecerpani", povolitPrecerpani = "povolitPrecerpani", zachovatRucniZapisy = "zachovatRucniZapisy", eUcetnictvi = "eUcetnictvi", ixsFunOozuUct = "ixsFunOozuUct", ixpDenUct = "ixpDenUct",}
	const enum GUctovaniInputDtoFragments { ixsHuf = "*", lpc = "*", ikc = "*", fazeUctovani = "*", minulaFazeUctovani = "*", typUctovani = "*", uctPoh = "*", poznamka = "*", kumulaceZaIxp = "*", vyrovnanost = "*", bezKontrolyPrecerpani = "*", povolitPrecerpani = "*", zachovatRucniZapisy = "*", eUcetnictvi = "*", ixsFunOozuUct = "*", ixpDenUct = "*",}
	const enum GUctovaniInputDtoTypes { ixsHuf = "string", lpc = "number", ikc = "Gordic.General.GIkc", fazeUctovani = "Gordic.Fuc.Interface.FazeUctovaniPohybuWizard", minulaFazeUctovani = "Gordic.Fuc.Interface.FazeUctovaniPohybuWizard", typUctovani = "Gordic.Fuc.Interface.TypUctovaniPohybu", uctPoh = "number", poznamka = "string", kumulaceZaIxp = "boolean", vyrovnanost = "boolean", bezKontrolyPrecerpani = "boolean", povolitPrecerpani = "boolean", zachovatRucniZapisy = "boolean", eUcetnictvi = "boolean", ixsFunOozuUct = "string", ixpDenUct = "string",}
	const enum GUctovaniInputDtoTypeLengths {}
	/**
	*     DTO pro výstup z asynchronního účtování
	*     
	*/
	interface GUctovaniOutputDto {
		/**id historie účtování*/
		ixsHuf?: string|null;
	}
	const enum GUctovaniOutputDtoNames { ixsHuf = "ixsHuf",}
	const enum GUctovaniOutputDtoFragments { ixsHuf = "*",}
	const enum GUctovaniOutputDtoTypes { ixsHuf = "string",}
	const enum GUctovaniOutputDtoTypeLengths {}
	/**
	*     DTO pro počet za kategorii účtovaných pohybů
	*     
	*/
	interface GPocetZaUctPohDto {
		/**kategorie účtovaných pohybů*/
		uctPoh?: number|null;
		/**počet*/
		pocet?: number|null;
	}
	const enum GPocetZaUctPohDtoNames { uctPoh = "uctPoh", pocet = "pocet",}
	const enum GPocetZaUctPohDtoFragments { uctPoh = "*", pocet = "*",}
	const enum GPocetZaUctPohDtoTypes { uctPoh = "number", pocet = "number",}
	const enum GPocetZaUctPohDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Gordic.Fuc.Interface.IGZapis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Účetní a rezervační zápisy
	* @domain FinUctarna
	*/
	interface Zapis {
		/**Načte seznam zápisů dokladu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GZapisDto>>;
		/**Načte seznam dokladů*/
		listDokladu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GDokladDto>>;
		/**Uložení jednoho zápisu*/
		upsert(rq?:CallParams<{insert:boolean,data:Gordic.Fuc.Interface.GZapisDto}>): _Task<{insert:boolean,data:Gordic.Fuc.Interface.GZapisDto},void>;
		/**Vrátí Ixb uloženého dokladu o zaúčtování*/
		vratIxbDzu(rq?:CallParams<{rok:number,lic:string,ico:string,ucs:string,mesic:number,ac:string}>): _Task<{rok:number,lic:string,ico:string,ucs:string,mesic:number,ac:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Zapis: ServiceBase & Catalog.Zapis;
	}
	const Zapis: Client["Zapis"];
}
declare namespace Gordic.Fuc.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu pohybů případů*/
	const enum GZapisFilter {
		/**rezervační (true) nebo účetní (false) zápisy*/
		rezervacni,
		/**zápisy pohybu*/
		z_pohybu,
		/**doklady/zápisy v účtování*/
		v_uctovani,
		/**podle historie*/
		z_historie,
		/**ze soupisky*/
		ze_soupisky,
		/**typ účtování*/
		typ_uctovani,
		/**IKC*/
		ikc,
		/**PID případu při jednotlivém/hromadném/kumulovaném účtování*/
		dok_ixp_upr,
		/**řádek pohybu při jednotlivém účtování*/
		dok_radek_upo,
		/**řádek zápisu*/
		dok_radek_zap,
		/**rok účtování při hromadném/kumulovaném účtování nebo po zaúčtování*/
		dok_rok,
		/**měsíc účtování při hromadném/kumulovaném účtování nebo po zaúčtování*/
		dok_mesic,
		/**den účtování při hromadném/kumulovaném účtování*/
		dok_den,
		/**subřada deníku účetních zápisů při hromadném/kumulovaném účtování*/
		dok_subrada_duz,
		/**licence databáze při hromadném/kumulovaném účtování nebo po zaúčtování*/
		dok_lic,
		/**IČO při hromadném/kumulovaném účtování nebo po zaúčtování*/
		dok_ico,
		/**účetní středisko při hromadném/kumulovaném účtování nebo po zaúčtování*/
		dok_ucs,
		/**rok DPH při hromadném/kumulovaném účtování*/
		dok_rok_dph,
		/**měsíc DPH při hromadném/kumulovaném účtování*/
		dok_mesic_dph,
		/**účtárna při hromadném/kumulovaném účtování*/
		dok_uus,
		/**druh dokladu při hromadném/kumulovaném účtování*/
		dok_drd,
		/**PID externího subjektu při hromadném/kumulovaném účtování*/
		dok_ixs_esu,
		/**číslo řádku rozšířeného profilu dokladu pro daňovou evidenci při hromadném/kumulovaném účtování*/
		dok_radek_pde,
		/**PID soupisky pohybů*/
		dok_ixp_soup,
		/**agendové číslo po zaúčtování*/
		dok_ac,
		/**id historie*/
		huf_ixs_huf,
		/**PID soupisky*/
		upo_ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Dto\Gordic.Fuc.Interface.GHistorieUctovaniDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Historie účtování ve FUC*/
	interface GHistorieUctovaniDto extends Gordic.Fuc.Interface.GFucSeznamDuctDto {
		/**Id účtování*/
		ixs_huf?: string|null;
		/**IČO*/
		ico?: string|null;
		/**UCS*/
		ucs?: string|null;
		/**IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**LPC*/
		log_por_cislo?: number|null;
		/**funkce, která účtovala*/
		ixs_fun_akt?: string|null;
		/**typ účtování (jednotlivě, hromadně nebo kumulovaně)*/
		typ_uct_fuc?: number|null;
		/**kumulovat za ixp případu*/
		kumul_za_ixp?: number|null;
		/**vyrovnanost (0 - dokladová, 1 - středisková)*/
		priz_vyr_nks?: number|null;
		/**bez kontroly na přečerpání*/
		priz_bez_kontr?: number|null;
		/**zachovat ručně pořízené zápisy*/
		zach_ruc_zapisy?: number|null;
		/**příznak e-účetnictví*/
		e_ucetnictvi?: number|null;
		/**osoba odpovědná o zaúčtování (pro e-účetnictví)*/
		ixs_fun_oozu_uct?: string|null;
		/**kniha UCT (pro e-účetnictví)*/
		ixp_den_uct?: string|null;
		/**stav účtování*/
		stav_uctovani?: number|null;
		/**datum zahájení účtování*/
		dat_start?: JsonDate|null;
		/**datum ukončení účtvání*/
		dat_konec?: JsonDate|null;
		/**datum zahájení fáze kontroly pohybů*/
		dat_zac_kont_poh?: JsonDate|null;
		/**datum ukončení fáze kontroly pohybů*/
		dat_kon_kont_poh?: JsonDate|null;
		/**příznak odloženého zpracování fáze kontroly pohybů*/
		priz_odl_kont_poh?: number|null;
		/**datum zahájení fáze přípravy zápisů*/
		dat_zac_prip_zap?: JsonDate|null;
		/**datum ukončení fáze přípravy zápisů*/
		dat_kon_prip_zap?: JsonDate|null;
		/**příznak odloženého zpracování fáze přípravy zápisů*/
		priz_odl_prip_zap?: number|null;
		/**datum zahájení fáze přípravy dokladů*/
		dat_zac_prip_dok?: JsonDate|null;
		/**datum ukončení fáze přípravy dokladů*/
		dat_kon_prip_dok?: JsonDate|null;
		/**příznak odloženého zpracování fáze přípravy dokladů*/
		priz_odl_prip_dok?: number|null;
		/**datum zahájení fáze zaúčtování*/
		dat_zac_zauct?: JsonDate|null;
		/**datum ukončení fáze zaúčtování*/
		dat_kon_zauct?: JsonDate|null;
		/**příznak odloženého zpracování fáze zaúčtování*/
		priz_odl_zauct?: number|null;
		/**datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**změny provedl*/
		zmenu_prov?: string|null;
		/**ixs_lpc*/
		ixs_lpc?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**text chyby (jen při přerušení účtování kvůli chybě)*/
		text_chyby?: string|null;
		/**důvodní servisní změny stavu*/
		duvod_servis?: string|null;
		/**kategorie účtovaných pohybů*/
		uct_poh?: number|null;
		/**počet dokladů vzniklých účtováním*/
		pocet_dokladu?: number|null;
		/**počet účtovanách pohybů*/
		pocet_pohybu?: number|null;
		/**počet soupisek účtovanách pohybů*/
		pocet_soupisek?: number|null;
		/**Navigacni vlastnost pro vlastníka (ixs_fun_akt)*/
		vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**text k stav_uctovani*/
		stav_uctovani_txt?: string|null;
		/**text k typ_uct_fuc*/
		typ_uct_fuc_txt?: string|null;
		/**text k priz_odl_kont_poh*/
		priz_odl_kont_poh_txt?: string|null;
		/**text k priz_odl_prip_zap*/
		priz_odl_prip_zap_txt?: string|null;
		/**text k priz_odl_prip_dok*/
		priz_odl_prip_dok_txt?: string|null;
		/**text k priz_odl_zauct*/
		priz_odl_zauct_txt?: string|null;
		/**text k uct_poh*/
		uct_poh_txt?: string|null;
		/**text k kumul_za_ixp*/
		kumul_za_ixp_txt?: string|null;
		/**text k priz_vyr_nks*/
		priz_vyr_nks_txt?: string|null;
		/**text k priz_bez_kontr*/
		priz_bez_kontr_txt?: string|null;
		/**text k zach_ruc_zapisy*/
		zach_ruc_zapisy_txt?: string|null;
		/**text k e_ucetnictvi*/
		e_ucetnictvi_txt?: string|null;
		/**Je zaúčtováno?*/
		readonly JeZauctovano?: boolean|null;
		/**Je účtování nedokončené?*/
		readonly JeNedokonceno?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GHistorieUctovaniPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GHistorieUctovaniDtoNames { ixs_huf = "ixs_huf", ico = "ico", ucs = "ucs", ikc = "ikc", log_por_cislo = "log_por_cislo", ixs_fun_akt = "ixs_fun_akt", typ_uct_fuc = "typ_uct_fuc", kumul_za_ixp = "kumul_za_ixp", priz_vyr_nks = "priz_vyr_nks", priz_bez_kontr = "priz_bez_kontr", zach_ruc_zapisy = "zach_ruc_zapisy", e_ucetnictvi = "e_ucetnictvi", ixs_fun_oozu_uct = "ixs_fun_oozu_uct", ixp_den_uct = "ixp_den_uct", stav_uctovani = "stav_uctovani", dat_start = "dat_start", dat_konec = "dat_konec", dat_zac_kont_poh = "dat_zac_kont_poh", dat_kon_kont_poh = "dat_kon_kont_poh", priz_odl_kont_poh = "priz_odl_kont_poh", dat_zac_prip_zap = "dat_zac_prip_zap", dat_kon_prip_zap = "dat_kon_prip_zap", priz_odl_prip_zap = "priz_odl_prip_zap", dat_zac_prip_dok = "dat_zac_prip_dok", dat_kon_prip_dok = "dat_kon_prip_dok", priz_odl_prip_dok = "priz_odl_prip_dok", dat_zac_zauct = "dat_zac_zauct", dat_kon_zauct = "dat_kon_zauct", priz_odl_zauct = "priz_odl_zauct", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", poznamka = "poznamka", text_chyby = "text_chyby", duvod_servis = "duvod_servis", uct_poh = "uct_poh", pocet_dokladu = "pocet_dokladu", pocet_pohybu = "pocet_pohybu", pocet_soupisek = "pocet_soupisek", vlastnik = "vlastnik", stav_uctovani_txt = "stav_uctovani_txt", typ_uct_fuc_txt = "typ_uct_fuc_txt", priz_odl_kont_poh_txt = "priz_odl_kont_poh_txt", priz_odl_prip_zap_txt = "priz_odl_prip_zap_txt", priz_odl_prip_dok_txt = "priz_odl_prip_dok_txt", priz_odl_zauct_txt = "priz_odl_zauct_txt", uct_poh_txt = "uct_poh_txt", kumul_za_ixp_txt = "kumul_za_ixp_txt", priz_vyr_nks_txt = "priz_vyr_nks_txt", priz_bez_kontr_txt = "priz_bez_kontr_txt", zach_ruc_zapisy_txt = "zach_ruc_zapisy_txt", e_ucetnictvi_txt = "e_ucetnictvi_txt", JeZauctovano = "JeZauctovano", JeNedokonceno = "JeNedokonceno", Permissions = "Permissions", PrimaryKey = "PrimaryKey", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GHistorieUctovaniDtoFragments { ixs_huf = "Base", ico = "Base", ucs = "Base", ikc = "Base", log_por_cislo = "Base", ixs_fun_akt = "Base", typ_uct_fuc = "Base", kumul_za_ixp = "Base", priz_vyr_nks = "Base", priz_bez_kontr = "Base", zach_ruc_zapisy = "Base", e_ucetnictvi = "Base", ixs_fun_oozu_uct = "Base", ixp_den_uct = "Base", stav_uctovani = "Base", dat_start = "Base", dat_konec = "Base", dat_zac_kont_poh = "Base", dat_kon_kont_poh = "Base", priz_odl_kont_poh = "Base", dat_zac_prip_zap = "Base", dat_kon_prip_zap = "Base", priz_odl_prip_zap = "Base", dat_zac_prip_dok = "Base", dat_kon_prip_dok = "Base", priz_odl_prip_dok = "Base", dat_zac_zauct = "Base", dat_kon_zauct = "Base", priz_odl_zauct = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_lpc = "Base", poznamka = "Base", text_chyby = "chyba", duvod_servis = "servis", uct_poh = "Base", pocet_dokladu = "pocet_dokladu", pocet_pohybu = "pocet_pohybu", pocet_soupisek = "pocet_soupisek", vlastnik = "vlastnik", stav_uctovani_txt = "stav_uctovani", typ_uct_fuc_txt = "typ_uctovani", priz_odl_kont_poh_txt = "priz_odl_kont_poh", priz_odl_prip_zap_txt = "priz_odl_prip_zap", priz_odl_prip_dok_txt = "priz_odl_prip_dok", priz_odl_zauct_txt = "priz_odl_zauct", uct_poh_txt = "uctovane_pohyby", kumul_za_ixp_txt = "kumulace_za_pid", priz_vyr_nks_txt = "vyrovnanost_za_nks", priz_bez_kontr_txt = "bez_kontroly_precerpani", zach_ruc_zapisy_txt = "zachovat_rucni_zapisy", e_ucetnictvi_txt = "e_ucetnictvi", JeZauctovano = "*", JeNedokonceno = "*", Permissions = "Permissions", PrimaryKey = "*", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GHistorieUctovaniDtoTypes { ixs_huf = "string", ico = "string", ucs = "string", ikc = "Gordic.General.GIkc", log_por_cislo = "number", ixs_fun_akt = "string", typ_uct_fuc = "number", kumul_za_ixp = "number", priz_vyr_nks = "number", priz_bez_kontr = "number", zach_ruc_zapisy = "number", e_ucetnictvi = "number", ixs_fun_oozu_uct = "string", ixp_den_uct = "string", stav_uctovani = "number", dat_start = "JsonDate", dat_konec = "JsonDate", dat_zac_kont_poh = "JsonDate", dat_kon_kont_poh = "JsonDate", priz_odl_kont_poh = "number", dat_zac_prip_zap = "JsonDate", dat_kon_prip_zap = "JsonDate", priz_odl_prip_zap = "number", dat_zac_prip_dok = "JsonDate", dat_kon_prip_dok = "JsonDate", priz_odl_prip_dok = "number", dat_zac_zauct = "JsonDate", dat_kon_zauct = "JsonDate", priz_odl_zauct = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", poznamka = "string", text_chyby = "string", duvod_servis = "string", uct_poh = "number", pocet_dokladu = "number", pocet_pohybu = "number", pocet_soupisek = "number", vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", stav_uctovani_txt = "string", typ_uct_fuc_txt = "string", priz_odl_kont_poh_txt = "string", priz_odl_prip_zap_txt = "string", priz_odl_prip_dok_txt = "string", priz_odl_zauct_txt = "string", uct_poh_txt = "string", kumul_za_ixp_txt = "string", priz_vyr_nks_txt = "string", priz_bez_kontr_txt = "string", zach_ruc_zapisy_txt = "string", e_ucetnictvi_txt = "string", JeZauctovano = "boolean", JeNedokonceno = "boolean", Permissions = "Gordic.Fuc.Interface.GHistorieUctovaniPermission", PrimaryKey = "string", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GHistorieUctovaniDtoTypeLengths { ixs_huf = 12, ico = 10, ucs = 10, ixs_lpc = 12, poznamka = 254, text_chyby = 1000, duvod_servis = 254, stav_uctovani_txt = 50, typ_uct_fuc_txt = 50, priz_odl_kont_poh_txt = 50, priz_odl_prip_zap_txt = 50, priz_odl_prip_dok_txt = 50, priz_odl_zauct_txt = 50, uct_poh_txt = 50, kumul_za_ixp_txt = 50, priz_vyr_nks_txt = 50, priz_bez_kontr_txt = 50, zach_ruc_zapisy_txt = 50, e_ucetnictvi_txt = 50, duct_txt_err = 254,}
	/**Primární klíč historie účtování*/
	interface GHistorieUctovaniPkDto {
		/**Id účtování*/
		ixs_huf?: string|null;
	}
	const enum GHistorieUctovaniPkDtoNames { ixs_huf = "ixs_huf",}
	const enum GHistorieUctovaniPkDtoFragments { ixs_huf = "*",}
	const enum GHistorieUctovaniPkDtoTypes { ixs_huf = "string",}
	const enum GHistorieUctovaniPkDtoTypeLengths { ixs_huf = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Dto\Gordic.Fuc.Interface.GPohybDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Pohyb*/
	interface GPohybDto extends Gordic.Fuc.Interface.GFucSeznamDuctDto {
		/**DBCOLUMN:fucdupo.ixp_upr*/
		ixp_upr?: string|null;
		/**DBCOLUMN:fucdupo.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:fucdupo.ixp_bvp*/
		ixp_bvp?: string|null;
		/**DBCOLUMN:fucdupo.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:fucdupo.typ_upo*/
		typ_upo?: number|null;
		/**stav pohybu*/
		s_upo?: number|null;
		/**částka pohybu*/
		c_upo?: JsonDecimal|null;
		/**znaménko*/
		znam?: number|null;
		/**rok účtování*/
		rok?: number|null;
		/**měsíc účtování*/
		mesic?: number|null;
		/**den účtování*/
		den?: number|null;
		/**subřada DÚZ*/
		subrada_duz?: number|null;
		/**číslo dokladu*/
		ac_ixe?: string|null;
		/**PID dokladu*/
		ixp_ixe?: string|null;
		/**stav storna*/
		s_sto?: number|null;
		/**DBCOLUMN:fucdupo.radek_upo_sto*/
		radek_upo_sto?: number|null;
		/**DBCOLUMN:fucdupo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:fucdupo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:fucdupo.dat_upo*/
		dat_upo?: JsonDate|null;
		/**DBCOLUMN:fucdupo.radek_bvp*/
		radek_bvp?: number|null;
		/**DBCOLUMN:fucdupo.popis_upo*/
		popis_upo?: string|null;
		/**DBCOLUMN:fucdupo.c_zao*/
		c_zao?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:fucdupo.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:fucdupo.c_z0*/
		c_z0?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_d0*/
		c_d0?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_z1*/
		c_z1?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_d1*/
		c_d1?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_z2*/
		c_z2?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_d2*/
		c_d2?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.id_upo*/
		id_upo?: string|null;
		/**DBCOLUMN:fucdupo.typ_upr*/
		typ_upr?: string|null;
		/**DBCOLUMN:fucdupo.nks*/
		nks?: string|null;
		/**DBCOLUMN:fucdupo.ks*/
		ks?: string|null;
		/**DBCOLUMN:fucdupo.vs*/
		vs?: string|null;
		/**DBCOLUMN:fucdupo.ss*/
		ss?: string|null;
		/**DBCOLUMN:fucdupo.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:fucdupo.uea*/
		uea?: string|null;
		/**DBCOLUMN:fucdupo.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:fucdupo.uec*/
		uec?: string|null;
		/**DBCOLUMN:fucdupo.ued*/
		ued?: string|null;
		/**DBCOLUMN:fucdupo.uee*/
		uee?: string|null;
		/**DBCOLUMN:fucdupo.uef*/
		uef?: string|null;
		/**DBCOLUMN:fucdupo.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:fucdupo.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:fucdupo.uei*/
		uei?: string|null;
		/**DBCOLUMN:fucdupo.uej*/
		uej?: string|null;
		/**DBCOLUMN:fucdupo.te0*/
		te0?: string|null;
		/**DBCOLUMN:fucdupo.te1*/
		te1?: string|null;
		/**DBCOLUMN:fucdupo.te2*/
		te2?: string|null;
		/**DBCOLUMN:fucdupo.te3*/
		te3?: string|null;
		/**DBCOLUMN:fucdupo.te4*/
		te4?: string|null;
		/**DBCOLUMN:fucdupo.uek*/
		uek?: string|null;
		/**DBCOLUMN:fucdupo.uel*/
		uel?: string|null;
		/**DBCOLUMN:fucdupo.uem*/
		uem?: string|null;
		/**DBCOLUMN:fucdupo.uen*/
		uen?: string|null;
		/**DBCOLUMN:fucdupo.te5*/
		te5?: string|null;
		/**DBCOLUMN:fucdupo.te6*/
		te6?: string|null;
		/**DBCOLUMN:fucdupo.te7*/
		te7?: string|null;
		/**DBCOLUMN:fucdupo.te8*/
		te8?: string|null;
		/**DBCOLUMN:fucdupo.te9*/
		te9?: string|null;
		/**DBCOLUMN:fucdupo.subradek_bvp*/
		subradek_bvp?: number|null;
		/**DBCOLUMN:fucdupo.radek_av_bvp*/
		radek_av_bvp?: number|null;
		/**DBCOLUMN:fucdupo.priz_dd*/
		priz_dd?: number|null;
		/**DBCOLUMN:fucdupo.obd_zprac_uo*/
		obd_zprac_uo?: string|null;
		/**DBCOLUMN:fucdupo.ktg_upo_pre*/
		ktg_upo_pre?: number|null;
		/**DBCOLUMN:fucdupo.mena*/
		mena?: number|null;
		/**DBCOLUMN:fucdupo.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.radek_upo_rez*/
		radek_upo_rez?: number|null;
		/**DBCOLUMN:fucdupo.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:fucdupo.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:fucdupo.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:fucdupo.ac_ext*/
		ac_ext?: string|null;
		/**DBCOLUMN:fucdupo.priz_pzp*/
		priz_pzp?: number|null;
		/**PID kontace (z POK)*/
		ixs_kon?: string|null;
		/**DBCOLUMN:fucdupo.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:fucdupo.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:fucdupo.priz_rez_ext*/
		priz_rez_ext?: number|null;
		/**DBCOLUMN:fucdupo.nks_u*/
		nks_u?: string|null;
		/**IČO*/
		ico?: string|null;
		/**UCS*/
		ucs?: string|null;
		/**DBCOLUMN:fucdupo.uus*/
		uus?: string|null;
		/**DBCOLUMN:fucdupo.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:fucdupo.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:fucdupo.c_z3*/
		c_z3?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_d3*/
		c_d3?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_z4*/
		c_z4?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.c_d4*/
		c_d4?: JsonDecimal|null;
		/**DBCOLUMN:fucdupo.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:fucdupo.radek_pde*/
		radek_pde?: number|null;
		/**DBCOLUMN:fucdupo.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:fucdupo.ixp_uct*/
		ixp_uct?: string|null;
		/**DBCOLUMN:fucshuf.ixs_huf*/
		ixs_huf?: string|null;
		/**DBCOLUMN:fucsupr.typ_ag*/
		upr_typ_ag?: number|null;
		/**DBCOLUMN:fucsupr.ktg_upr*/
		upr_ktg_upr?: number|null;
		/**DBCOLUMN:fucsupr.ac_ag*/
		upr_ac_ag?: string|null;
		/**DBCOLUMN:fucsupr.ixs_fun_akt*/
		upr_ixs_fun_akt?: string|null;
		/**DBCOLUMN:fucsupr.drd*/
		upr_drd?: number|null;
		/**DBCOLUMN:fucsupr.s_sto*/
		upr_s_sto?: number|null;
		/**druh pohybu*/
		druh_poh?: number|null;
		/**číslo dokladu nebo *subřada, pokud není pohyb zaúčtován*/
		ac_ixe_subrada_duz?: string|null;
		/**text k s_upo*/
		s_upo_txt?: string|null;
		/**text k typ_upo*/
		typ_upo_txt?: string|null;
		/**text k ktg_upo*/
		ktg_upo_txt?: string|null;
		/**text k druh_poh*/
		druh_poh_txt?: string|null;
		/**text k s_sto*/
		s_sto_txt?: string|null;
		/**text k typ_upr*/
		typ_upr_txt?: string|null;
		/**zkratka k mena*/
		mena_zkr?: string|null;
		/**text k znam*/
		znam_txt?: string|null;
		/**text k priz_dd*/
		priz_dd_txt?: string|null;
		/**částka se znaménkem k c_upo*/
		c_upo_znam?: JsonDecimal|null;
		/**datum zaúčtování (z den+mesic+rok)*/
		dat_zauc?: string|null;
		/**období danění*/
		obd_dan?: string|null;
		/**složený vlastní bú*/
		bu_vl_txt?: string|null;
		/**Navigacni vlastnost pro případ (ixp_upr)*/
		pripad?: Gordic.Fuc.Interface.GPripadDto|null;
		/**Navigacni vlastnost pro soupisku (ixp)*/
		soupiska?: Gordic.Fuc.Interface.GSoupiskaDto|null;
		/**Navigacni vlastnost pro subjekt (ixs_esu)*/
		subjekt?: Gordic.Fuc.Interface.GExterniSubjektDto|null;
		/**Navigacni vlastnost pro bankovní výpis (ixp_bvp)*/
		vypis?: Gordic.Fuc.Interface.GBankovniVypisDto|null;
		/**Je pohyb účetní?*/
		readonly uct_poh?: number|null;
		/**Je pohyb účetní?*/
		readonly JeUcetni?: boolean|null;
		/**Je pohyb rezervační?*/
		readonly JeRezervacni?: boolean|null;
		/**Je pohyb zaúčtovaný?*/
		readonly JeZauctovany?: boolean|null;
		/**Je pohyb nezaúčtovaný?*/
		readonly JeNezauctovany?: boolean|null;
		/**Je pohyb stornovaný?*/
		readonly JeStornovany?: boolean|null;
		/**Je na pohybu položka bankovního výpisu?*/
		readonly JeBankovniVypis?: boolean|null;
		/**Je pohyb daňový?*/
		readonly JeDanovy?: boolean|null;
		/**Je pohyb účetní a má na sobě navázaný pohyb rezervační?*/
		readonly MaRezervacni?: boolean|null;
		/**Je pohyb v soupisce?*/
		readonly JeVSoupisce?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GPohybPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GPohybDtoNames { ixp_upr = "ixp_upr", radek_upo = "radek_upo", ixp_bvp = "ixp_bvp", ktg_upo = "ktg_upo", typ_upo = "typ_upo", s_upo = "s_upo", c_upo = "c_upo", znam = "znam", rok = "rok", mesic = "mesic", den = "den", subrada_duz = "subrada_duz", ac_ixe = "ac_ixe", ixp_ixe = "ixp_ixe", s_sto = "s_sto", radek_upo_sto = "radek_upo_sto", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_upo = "dat_upo", radek_bvp = "radek_bvp", popis_upo = "popis_upo", c_zao = "c_zao", rok_dph = "rok_dph", mesic_dph = "mesic_dph", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", id_upo = "id_upo", typ_upr = "typ_upr", nks = "nks", ks = "ks", vs = "vs", ss = "ss", ixs_esu = "ixs_esu", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", subradek_bvp = "subradek_bvp", radek_av_bvp = "radek_av_bvp", priz_dd = "priz_dd", obd_zprac_uo = "obd_zprac_uo", ktg_upo_pre = "ktg_upo_pre", mena = "mena", c_mena = "c_mena", radek_upo_rez = "radek_upo_rez", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ac_ext = "ac_ext", priz_pzp = "priz_pzp", ixs_kon = "ixs_kon", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", priz_rez_ext = "priz_rez_ext", nks_u = "nks_u", ico = "ico", ucs = "ucs", uus = "uus", bu_vl = "bu_vl", sk_vl = "sk_vl", c_z3 = "c_z3", c_d3 = "c_d3", c_z4 = "c_z4", c_d4 = "c_d4", priz_char = "priz_char", radek_pde = "radek_pde", ixp = "ixp", ixp_uct = "ixp_uct", ixs_huf = "ixs_huf", upr_typ_ag = "upr_typ_ag", upr_ktg_upr = "upr_ktg_upr", upr_ac_ag = "upr_ac_ag", upr_ixs_fun_akt = "upr_ixs_fun_akt", upr_drd = "upr_drd", upr_s_sto = "upr_s_sto", druh_poh = "druh_poh", ac_ixe_subrada_duz = "ac_ixe_subrada_duz", s_upo_txt = "s_upo_txt", typ_upo_txt = "typ_upo_txt", ktg_upo_txt = "ktg_upo_txt", druh_poh_txt = "druh_poh_txt", s_sto_txt = "s_sto_txt", typ_upr_txt = "typ_upr_txt", mena_zkr = "mena_zkr", znam_txt = "znam_txt", priz_dd_txt = "priz_dd_txt", c_upo_znam = "c_upo_znam", dat_zauc = "dat_zauc", obd_dan = "obd_dan", bu_vl_txt = "bu_vl_txt", pripad = "pripad", soupiska = "soupiska", subjekt = "subjekt", vypis = "vypis", uct_poh = "uct_poh", JeUcetni = "JeUcetni", JeRezervacni = "JeRezervacni", JeZauctovany = "JeZauctovany", JeNezauctovany = "JeNezauctovany", JeStornovany = "JeStornovany", JeBankovniVypis = "JeBankovniVypis", JeDanovy = "JeDanovy", MaRezervacni = "MaRezervacni", JeVSoupisce = "JeVSoupisce", Permissions = "Permissions", PrimaryKey = "PrimaryKey", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GPohybDtoFragments { ixp_upr = "Base", radek_upo = "Base", ixp_bvp = "Base", ktg_upo = "Base", typ_upo = "Base", s_upo = "Base", c_upo = "Base", znam = "Base", rok = "Base", mesic = "Base", den = "Base", subrada_duz = "Base", ac_ixe = "Base", ixp_ixe = "Base", s_sto = "Base", radek_upo_sto = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_upo = "Base", radek_bvp = "Extended2", popis_upo = "Base", c_zao = "Extended", rok_dph = "Base", mesic_dph = "Base", c_z0 = "Extended", c_d0 = "Extended", c_z1 = "Extended", c_d1 = "Extended", c_z2 = "Extended", c_d2 = "Extended", id_upo = "Extended2", typ_upr = "Base", nks = "Base", ks = "Extended2", vs = "Extended2", ss = "Extended2", ixs_esu = "Base", uea = "Extended3", ueb = "Extended3", uec = "Extended3", ued = "Extended3", uee = "Extended3", uef = "Extended3", ueg = "Extended3", ueh = "Extended3", uei = "Extended3", uej = "Extended3", te0 = "Extended3", te1 = "Extended3", te2 = "Extended3", te3 = "Extended3", te4 = "Extended3", uek = "Extended3", uel = "Extended3", uem = "Extended3", uen = "Extended3", te5 = "Extended3", te6 = "Extended3", te7 = "Extended3", te8 = "Extended3", te9 = "Extended3", subradek_bvp = "Extended2", radek_av_bvp = "Extended2", priz_dd = "Base", obd_zprac_uo = "Extended2", ktg_upo_pre = "Base", mena = "Base", c_mena = "Base", radek_upo_rez = "Base", ixp_sml = "Base", rok_sml = "Base", cislo_sml = "Base", ac_ext = "Extended2", priz_pzp = "Extended2", ixs_kon = "Base", id_hdr_ris = "Base", radek_hdr = "Base", priz_rez_ext = "Extended2", nks_u = "Extended2", ico = "Base", ucs = "Base", uus = "Base", bu_vl = "Extended2", sk_vl = "Extended2", c_z3 = "Extended", c_d3 = "Extended", c_z4 = "Extended", c_d4 = "Extended", priz_char = "Base", radek_pde = "Base", ixp = "Base", ixp_uct = "Base", ixs_huf = "historie_uctovani", upr_typ_ag = "Base", upr_ktg_upr = "Base", upr_ac_ag = "Base", upr_ixs_fun_akt = "Base", upr_drd = "Base", upr_s_sto = "Base", druh_poh = "Base", ac_ixe_subrada_duz = "Base", s_upo_txt = "stav_pohybu", typ_upo_txt = "typ_pohybu", ktg_upo_txt = "kategorie_pohybu", druh_poh_txt = "druh_pohybu", s_sto_txt = "stav_storna", typ_upr_txt = "typ_pripadu", mena_zkr = "mena", znam_txt = "Base", priz_dd_txt = "priznak_dane", c_upo_znam = "Base", dat_zauc = "Base", obd_dan = "Base", bu_vl_txt = "Extended2", pripad = "pripad", soupiska = "soupiska", subjekt = "subjekt", vypis = "vypis", uct_poh = "*", JeUcetni = "*", JeRezervacni = "*", JeZauctovany = "*", JeNezauctovany = "*", JeStornovany = "*", JeBankovniVypis = "*", JeDanovy = "*", MaRezervacni = "*", JeVSoupisce = "*", Permissions = "Permissions", PrimaryKey = "*", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GPohybDtoTypes { ixp_upr = "string", radek_upo = "number", ixp_bvp = "string", ktg_upo = "number", typ_upo = "number", s_upo = "number", c_upo = "JsonDecimal", znam = "number", rok = "number", mesic = "number", den = "number", subrada_duz = "number", ac_ixe = "string", ixp_ixe = "string", s_sto = "number", radek_upo_sto = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_upo = "JsonDate", radek_bvp = "number", popis_upo = "string", c_zao = "JsonDecimal", rok_dph = "number", mesic_dph = "number", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", id_upo = "string", typ_upr = "string", nks = "string", ks = "string", vs = "string", ss = "string", ixs_esu = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", subradek_bvp = "number", radek_av_bvp = "number", priz_dd = "number", obd_zprac_uo = "string", ktg_upo_pre = "number", mena = "number", c_mena = "JsonDecimal", radek_upo_rez = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", ac_ext = "string", priz_pzp = "number", ixs_kon = "string", id_hdr_ris = "string", radek_hdr = "number", priz_rez_ext = "number", nks_u = "string", ico = "string", ucs = "string", uus = "string", bu_vl = "string", sk_vl = "string", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", priz_char = "number", radek_pde = "number", ixp = "string", ixp_uct = "string", ixs_huf = "string", upr_typ_ag = "number", upr_ktg_upr = "number", upr_ac_ag = "string", upr_ixs_fun_akt = "string", upr_drd = "number", upr_s_sto = "number", druh_poh = "number", ac_ixe_subrada_duz = "string", s_upo_txt = "string", typ_upo_txt = "string", ktg_upo_txt = "string", druh_poh_txt = "string", s_sto_txt = "string", typ_upr_txt = "string", mena_zkr = "string", znam_txt = "string", priz_dd_txt = "string", c_upo_znam = "JsonDecimal", dat_zauc = "string", obd_dan = "string", bu_vl_txt = "string", pripad = "Gordic.Fuc.Interface.GPripadDto", soupiska = "Gordic.Fuc.Interface.GSoupiskaDto", subjekt = "Gordic.Fuc.Interface.GExterniSubjektDto", vypis = "Gordic.Fuc.Interface.GBankovniVypisDto", uct_poh = "number", JeUcetni = "boolean", JeRezervacni = "boolean", JeZauctovany = "boolean", JeNezauctovany = "boolean", JeStornovany = "boolean", JeBankovniVypis = "boolean", JeDanovy = "boolean", MaRezervacni = "boolean", JeVSoupisce = "boolean", Permissions = "Gordic.Fuc.Interface.GPohybPermission", PrimaryKey = "string", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GPohybDtoTypeLengths { ixp_upr = 12, ixp_bvp = 12, ac_ixe = 20, ixp_ixe = 12, zmenu_prov = 12, popis_upo = 254, id_upo = 50, typ_upr = 15, nks = 12, ks = 12, vs = 12, ss = 12, ixs_esu = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, obd_zprac_uo = 4, ixp_sml = 12, ac_ext = 20, ixs_kon = 12, id_hdr_ris = 10, nks_u = 12, ico = 10, ucs = 10, uus = 10, bu_vl = 34, sk_vl = 11, ixp = 12, ixp_uct = 12, ixs_huf = 12, upr_ac_ag = 30, upr_ixs_fun_akt = 12, ac_ixe_subrada_duz = 20, s_upo_txt = 50, typ_upo_txt = 50, ktg_upo_txt = 50, druh_poh_txt = 50, s_sto_txt = 50, typ_upr_txt = 254, mena_zkr = 3, znam_txt = 1, priz_dd_txt = 50, dat_zauc = 50, obd_dan = 50, bu_vl_txt = 50, duct_txt_err = 254,}
	/**Primární klíč pohybu*/
	interface GPohybPkDto {
		/**PID případu*/
		ixp_upr?: string|null;
		/**řádek pohybu*/
		radek_upo?: number|null;
	}
	const enum GPohybPkDtoNames { ixp_upr = "ixp_upr", radek_upo = "radek_upo",}
	const enum GPohybPkDtoFragments { ixp_upr = "*", radek_upo = "*",}
	const enum GPohybPkDtoTypes { ixp_upr = "string", radek_upo = "number",}
	const enum GPohybPkDtoTypeLengths { ixp_upr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Dto\Gordic.Fuc.Interface.GPohybFilterDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Filtr seznamu pohybů*/
	interface GPohybFilterDto {
		/**identifikátor*/
		ixp_upr?: GBaseFilter<string>|null;
		/**řádek pohybu*/
		radek_upo?: GBaseFilter<number>|null;
		/**druh pohybu*/
		druh_upo?: GBaseFilter<number>|null;
		/**druh pohybu*/
		druh_poh?: GBaseFilter<number>|null;
		/**typ pohybu*/
		typ_upo?: GBaseFilter<number>|null;
		/**kategorie pohybu*/
		ktg_upo?: GBaseFilter<number>|null;
		/**kategorie pohybu předpisu*/
		ktg_pre?: GBaseFilter<number>|null;
		/**kontace*/
		ixs_kon?: GBaseFilter<string>|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**stav pohybu*/
		s_upo?: GBaseFilter<number>|null;
		/**stav storna*/
		s_sto?: GBaseFilter<number>|null;
		/**rok aktuálního příhlášení*/
		akt_rok?: number|null;
		/**rok*/
		rok?: GBaseFilter<number>|null;
		/**datum účtování*/
		dat_uct?: GBaseFilter<JsonDate>|null;
		/**datum pohybu*/
		dat_upo?: GBaseFilter<JsonDate>|null;
		/**částka*/
		c_upo?: GBaseFilter<JsonDecimal>|null;
		/**popis*/
		popis_upo?: GBaseFilter<string>|null;
		/**typ účetního případu*/
		typ_upr?: GBaseFilter<string>|null;
		/**externí subjekt*/
		ixs_esu?: GBaseFilter<string>|null;
		/**číslo účetního dokladu*/
		ac_ixe?: GBaseFilter<string>|null;
		/**subřada deníku účetních zápisů*/
		subrada_duz?: number|null;
		/**číslo účetního dokladu v externím systému*/
		ac_ext?: GBaseFilter<string>|null;
		/**konstantní symbol*/
		ks?: GBaseFilter<string>|null;
		/**variabilní symbol*/
		vs?: GBaseFilter<string>|null;
		/**specifický symbol*/
		ss?: GBaseFilter<string>|null;
		/**identifikátor bankovního výpisu*/
		ixp_bvp?: GBaseFilter<string>|null;
		/**pohyby bez bankovního výpisu*/
		bez_vypisu?: number|null;
		/**příznak daňového pohybu*/
		priz_dd?: GBaseFilter<number>|null;
		/**IISSP - ID RIS*/
		id_hdr_ris?: string|null;
		/**IISSP - řádek RIS*/
		radek_hdr?: number|null;
		/**kategorie účtovaných pohybů (pro rozlišení vybraného účtování)*/
		uct_poh?: number|null;
		/**identifikátor soupisky*/
		ixp?: GBaseFilter<string>|null;
		/**pohyby bez soupisky*/
		bez_soupisky?: number|null;
		/**řádek navázaného rezervačního pohybu*/
		radek_upo_rez?: number|null;
		/**aktuální vlastník*/
		upr_ixs_fun_akt?: string|null;
		/**kategorie případu*/
		upr_ktg_upr?: GBaseFilter<number>|null;
		/**typ agendy*/
		upr_typ_ag?: GBaseFilter<number>|null;
		/**kniha*/
		upr_ixp_den?: GBaseFilter<string>|null;
		/**typ účetního případu*/
		upr_typ_upr?: GBaseFilter<string>|null;
		/**kategorie typu dokladu*/
		upr_ktg_typ?: GBaseFilter<number>|null;
		/**popis případu*/
		upr_popis?: GBaseFilter<string>|null;
		/**poznámka případu*/
		upr_poznamka?: GBaseFilter<string>|null;
		/**stav případu*/
		upr_s_upr?: GBaseFilter<number>|null;
		/**defaultní stav případu*/
		upr_s_upr_def?: number|null;
		/**pohyby účtované stejným dokladem (musí být vyplněny filtry uct_rok, uct_lic, uct_ico, uct_ucs, uct_mesic a uct_ac)*/
		uct_st_doklad?: number|null;
		/**rok dokladu pro pohyby účtované stejným dokladem*/
		uct_rok?: number|null;
		/**licence dokladu pro pohyby účtované stejným dokladem*/
		uct_lic?: string|null;
		/**IČO dokladu pro pohyby účtované stejným dokladem*/
		uct_ico?: string|null;
		/**UCS dokladu pro pohyby účtované stejným dokladem*/
		uct_ucs?: string|null;
		/**měsíc dokladu pro pohyby účtované stejným dokladem*/
		uct_mesic?: number|null;
		/**číslo dokladu pro pohyby účtované stejným dokladem*/
		uct_ac?: string|null;
		/**pro pohyby účtované stejným dokladem vynechat tento identifikátor*/
		uct_bez_ixp_upr?: string|null;
		/**pro pohyby účtované stejným dokladem vynechat tento řádek pohybu*/
		uct_bez_radek_upo?: number|null;
		/**pohyby bez zápisů*/
		zap_bez_zapisu?: number|null;
		/**pohyby se zápisy*/
		zap_se_zapisy?: number|null;
		/**pohyby se zápisy se zadanou větou (pro zap_se_zapisy > 0)*/
		zap_veta?: Gordic.Fuc.Interface.GFucCfuFilterDto[]|null;
		/**pohyby se zápisy nevyrovanými za NKS*/
		zap_nevyrovnane_za_nks?: number|null;
		/**pohyby se zápisy nevyrovanými bez ohledu na NKS*/
		zap_nevyrovnane_bez_nks?: number|null;
		/**id historie*/
		huf_ixs_huf?: string|null;
		/**neúčtují se podle historie*/
		huf_neuctovane?: number|null;
		/**existence v tabulce fucduct*/
		duct_ano?: number|null;
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck?: number|null;
		/**IKC v tabulce fucduct*/
		duct_ikc?: Gordic.General.GIkc|null;
		/**IČO NKS (na serveru se nezpracovává)*/
		ignore_ico_nks?: string|null;
		/**IČO UUS (na serveru se nezpracovává)*/
		ignore_ico_uus?: string|null;
		/**IČO subřady (na serveru se nezpracovává)*/
		ignore_ico_subr?: number|null;
		/**UCS UUS (na serveru se nezpracovává)*/
		ignore_ucs_uus?: string|null;
		/**rok subřady (na serveru se nezpracovává)*/
		ignore_rok_subr?: number|null;
	}
	const enum GPohybFilterDtoNames { ixp_upr = "ixp_upr", radek_upo = "radek_upo", druh_upo = "druh_upo", druh_poh = "druh_poh", typ_upo = "typ_upo", ktg_upo = "ktg_upo", ktg_pre = "ktg_pre", ixs_kon = "ixs_kon", nks = "nks", uus = "uus", s_upo = "s_upo", s_sto = "s_sto", akt_rok = "akt_rok", rok = "rok", dat_uct = "dat_uct", dat_upo = "dat_upo", c_upo = "c_upo", popis_upo = "popis_upo", typ_upr = "typ_upr", ixs_esu = "ixs_esu", ac_ixe = "ac_ixe", subrada_duz = "subrada_duz", ac_ext = "ac_ext", ks = "ks", vs = "vs", ss = "ss", ixp_bvp = "ixp_bvp", bez_vypisu = "bez_vypisu", priz_dd = "priz_dd", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", uct_poh = "uct_poh", ixp = "ixp", bez_soupisky = "bez_soupisky", radek_upo_rez = "radek_upo_rez", upr_ixs_fun_akt = "upr_ixs_fun_akt", upr_ktg_upr = "upr_ktg_upr", upr_typ_ag = "upr_typ_ag", upr_ixp_den = "upr_ixp_den", upr_typ_upr = "upr_typ_upr", upr_ktg_typ = "upr_ktg_typ", upr_popis = "upr_popis", upr_poznamka = "upr_poznamka", upr_s_upr = "upr_s_upr", upr_s_upr_def = "upr_s_upr_def", uct_st_doklad = "uct_st_doklad", uct_rok = "uct_rok", uct_lic = "uct_lic", uct_ico = "uct_ico", uct_ucs = "uct_ucs", uct_mesic = "uct_mesic", uct_ac = "uct_ac", uct_bez_ixp_upr = "uct_bez_ixp_upr", uct_bez_radek_upo = "uct_bez_radek_upo", zap_bez_zapisu = "zap_bez_zapisu", zap_se_zapisy = "zap_se_zapisy", zap_veta = "zap_veta", zap_nevyrovnane_za_nks = "zap_nevyrovnane_za_nks", zap_nevyrovnane_bez_nks = "zap_nevyrovnane_bez_nks", huf_ixs_huf = "huf_ixs_huf", huf_neuctovane = "huf_neuctovane", duct_ano = "duct_ano", duct_uncheck = "duct_uncheck", duct_ikc = "duct_ikc", ignore_ico_nks = "ignore_ico_nks", ignore_ico_uus = "ignore_ico_uus", ignore_ico_subr = "ignore_ico_subr", ignore_ucs_uus = "ignore_ucs_uus", ignore_rok_subr = "ignore_rok_subr",}
	const enum GPohybFilterDtoFragments { ixp_upr = "*", radek_upo = "*", druh_upo = "*", druh_poh = "*", typ_upo = "*", ktg_upo = "*", ktg_pre = "*", ixs_kon = "*", nks = "*", uus = "*", s_upo = "*", s_sto = "*", akt_rok = "*", rok = "*", dat_uct = "*", dat_upo = "*", c_upo = "*", popis_upo = "*", typ_upr = "*", ixs_esu = "*", ac_ixe = "*", subrada_duz = "*", ac_ext = "*", ks = "*", vs = "*", ss = "*", ixp_bvp = "*", bez_vypisu = "*", priz_dd = "*", id_hdr_ris = "*", radek_hdr = "*", uct_poh = "*", ixp = "*", bez_soupisky = "*", radek_upo_rez = "*", upr_ixs_fun_akt = "*", upr_ktg_upr = "*", upr_typ_ag = "*", upr_ixp_den = "*", upr_typ_upr = "*", upr_ktg_typ = "*", upr_popis = "*", upr_poznamka = "*", upr_s_upr = "*", upr_s_upr_def = "*", uct_st_doklad = "*", uct_rok = "*", uct_lic = "*", uct_ico = "*", uct_ucs = "*", uct_mesic = "*", uct_ac = "*", uct_bez_ixp_upr = "*", uct_bez_radek_upo = "*", zap_bez_zapisu = "*", zap_se_zapisy = "*", zap_veta = "*", zap_nevyrovnane_za_nks = "*", zap_nevyrovnane_bez_nks = "*", huf_ixs_huf = "*", huf_neuctovane = "*", duct_ano = "*", duct_uncheck = "*", duct_ikc = "*", ignore_ico_nks = "*", ignore_ico_uus = "*", ignore_ico_subr = "*", ignore_ucs_uus = "*", ignore_rok_subr = "*",}
	const enum GPohybFilterDtoTypes { ixp_upr = "GBaseFilter<string>", radek_upo = "GBaseFilter<number>", druh_upo = "GBaseFilter<number>", druh_poh = "GBaseFilter<number>", typ_upo = "GBaseFilter<number>", ktg_upo = "GBaseFilter<number>", ktg_pre = "GBaseFilter<number>", ixs_kon = "GBaseFilter<string>", nks = "string", uus = "string", s_upo = "GBaseFilter<number>", s_sto = "GBaseFilter<number>", akt_rok = "number", rok = "GBaseFilter<number>", dat_uct = "GBaseFilter<JsonDate>", dat_upo = "GBaseFilter<JsonDate>", c_upo = "GBaseFilter<JsonDecimal>", popis_upo = "GBaseFilter<string>", typ_upr = "GBaseFilter<string>", ixs_esu = "GBaseFilter<string>", ac_ixe = "GBaseFilter<string>", subrada_duz = "number", ac_ext = "GBaseFilter<string>", ks = "GBaseFilter<string>", vs = "GBaseFilter<string>", ss = "GBaseFilter<string>", ixp_bvp = "GBaseFilter<string>", bez_vypisu = "number", priz_dd = "GBaseFilter<number>", id_hdr_ris = "string", radek_hdr = "number", uct_poh = "number", ixp = "GBaseFilter<string>", bez_soupisky = "number", radek_upo_rez = "number", upr_ixs_fun_akt = "string", upr_ktg_upr = "GBaseFilter<number>", upr_typ_ag = "GBaseFilter<number>", upr_ixp_den = "GBaseFilter<string>", upr_typ_upr = "GBaseFilter<string>", upr_ktg_typ = "GBaseFilter<number>", upr_popis = "GBaseFilter<string>", upr_poznamka = "GBaseFilter<string>", upr_s_upr = "GBaseFilter<number>", upr_s_upr_def = "number", uct_st_doklad = "number", uct_rok = "number", uct_lic = "string", uct_ico = "string", uct_ucs = "string", uct_mesic = "number", uct_ac = "string", uct_bez_ixp_upr = "string", uct_bez_radek_upo = "number", zap_bez_zapisu = "number", zap_se_zapisy = "number", zap_veta = "Gordic.Fuc.Interface.GFucCfuFilterDto[]", zap_nevyrovnane_za_nks = "number", zap_nevyrovnane_bez_nks = "number", huf_ixs_huf = "string", huf_neuctovane = "number", duct_ano = "number", duct_uncheck = "number", duct_ikc = "Gordic.General.GIkc", ignore_ico_nks = "string", ignore_ico_uus = "string", ignore_ico_subr = "number", ignore_ucs_uus = "string", ignore_rok_subr = "number",}
	const enum GPohybFilterDtoTypeLengths {}
	/**filtr seznamu zápisů pohybu*/
	interface GFucCfuFilterDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**NKS*/
		nks?: GIntervalDto<string>|null;
	}
	const enum GFucCfuFilterDtoNames { nks = "nks", cfu = "cfu",}
	const enum GFucCfuFilterDtoFragments { nks = "*", cfu = "*",}
	const enum GFucCfuFilterDtoTypes { nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GFucCfuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Dto\Gordic.Fuc.Interface.GTypUprVUctovaniDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Typy případů v účtování*/
	interface GTypUprVUctovaniDto {
		/**typ případu*/
		typ_upr?: string|null;
		/**název typu případu*/
		typ_upr_txt?: string|null;
		/**počet záznamů (pohybů)*/
		pocet_zazn?: number|null;
		/**příznak existence poloautomatických pohybů*/
		exist_30?: number|null;
		/**příznak existence ručních pohybů*/
		exist_40?: number|null;
		/**text k příznaku existence poloautomatických pohybů*/
		exist_30_txt?: string|null;
		/**text k příznaku existence ručních pohybů*/
		exist_40_txt?: string|null;
	}
	const enum GTypUprVUctovaniDtoNames { typ_upr = "typ_upr", typ_upr_txt = "typ_upr_txt", pocet_zazn = "pocet_zazn", exist_30 = "exist_30", exist_40 = "exist_40", exist_30_txt = "exist_30_txt", exist_40_txt = "exist_40_txt",}
	const enum GTypUprVUctovaniDtoFragments { typ_upr = "Base", typ_upr_txt = "Base", pocet_zazn = "Base", exist_30 = "Base", exist_40 = "Base", exist_30_txt = "Base", exist_40_txt = "Base",}
	const enum GTypUprVUctovaniDtoTypes { typ_upr = "string", typ_upr_txt = "string", pocet_zazn = "number", exist_30 = "number", exist_40 = "number", exist_30_txt = "string", exist_40_txt = "string",}
	const enum GTypUprVUctovaniDtoTypeLengths { typ_upr = 15, typ_upr_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pohyb\Dto\Gordic.Fuc.Interface.GZapisDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Doklad*/
	interface GDokladDto {
		/**licence*/
		lic?: string|null;
		/**IČO*/
		ico?: string|null;
		/**UCS*/
		ucs?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**rok*/
		rok?: number|null;
		/**měsíc*/
		mesic?: number|null;
		/**den*/
		den?: number|null;
		/**číslo dokladu*/
		ac?: string|null;
		/**identifikátor dokladu*/
		ixp?: string|null;
		/**subřada DÚZ*/
		subrada_duz?: number|null;
		/**druh dokladu*/
		drd?: number|null;
		/**typ agendy*/
		typ_ag?: number|null;
		/**PID účetního případu*/
		ixp_upr?: string|null;
		/**řádek pohybu*/
		radek_upo?: number|null;
		/**PID soupisky pohybů*/
		ixp_soup?: string|null;
		/**příznak daňového pohybu (dokladu)*/
		priz_dd?: number|null;
		/**externí subjekt*/
		ixs_esu?: string|null;
		/**rok DPH*/
		rok_dph?: number|null;
		/**měséíc DPH*/
		mesic_dph?: number|null;
		/**řádek podkladů DPH*/
		radek_pde?: number|null;
		/**počet pohybů účtovaných dokladem*/
		poc_pohybu_dokladu?: number|null;
		/**identifikátor primárního dokladu*/
		ixp_prim?: string|null;
		/**název externího subjektu*/
		ixs_esu_txt?: string|null;
		/**název druhu dokladu*/
		drd_txt?: string|null;
		/**název příznaku daňového pohybu (dokladu)*/
		priz_dd_txt?: string|null;
		/**upravený text k roku DPH*/
		rok_dph_txt?: string|null;
		/**upravený text k měsíci DPH*/
		mesic_dph_txt?: string|null;
	}
	const enum GDokladDtoNames { lic = "lic", ico = "ico", ucs = "ucs", uus = "uus", rok = "rok", mesic = "mesic", den = "den", ac = "ac", ixp = "ixp", subrada_duz = "subrada_duz", drd = "drd", typ_ag = "typ_ag", ixp_upr = "ixp_upr", radek_upo = "radek_upo", ixp_soup = "ixp_soup", priz_dd = "priz_dd", ixs_esu = "ixs_esu", rok_dph = "rok_dph", mesic_dph = "mesic_dph", radek_pde = "radek_pde", poc_pohybu_dokladu = "poc_pohybu_dokladu", ixp_prim = "ixp_prim", ixs_esu_txt = "ixs_esu_txt", drd_txt = "drd_txt", priz_dd_txt = "priz_dd_txt", rok_dph_txt = "rok_dph_txt", mesic_dph_txt = "mesic_dph_txt",}
	const enum GDokladDtoFragments { lic = "Base", ico = "Base", ucs = "Base", uus = "Base", rok = "Base", mesic = "Base", den = "Base", ac = "Base", ixp = "Base", subrada_duz = "Base", drd = "Base", typ_ag = "Base", ixp_upr = "Base", radek_upo = "Base", ixp_soup = "Base", priz_dd = "Base", ixs_esu = "Base", rok_dph = "Base", mesic_dph = "Base", radek_pde = "Base", poc_pohybu_dokladu = "Base", ixp_prim = "Base", ixs_esu_txt = "Base", drd_txt = "drd", priz_dd_txt = "priznak_dd", rok_dph_txt = "rok_dph", mesic_dph_txt = "mesic_dph",}
	const enum GDokladDtoTypes { lic = "string", ico = "string", ucs = "string", uus = "string", rok = "number", mesic = "number", den = "number", ac = "string", ixp = "string", subrada_duz = "number", drd = "number", typ_ag = "number", ixp_upr = "string", radek_upo = "number", ixp_soup = "string", priz_dd = "number", ixs_esu = "string", rok_dph = "number", mesic_dph = "number", radek_pde = "number", poc_pohybu_dokladu = "number", ixp_prim = "string", ixs_esu_txt = "string", drd_txt = "string", priz_dd_txt = "string", rok_dph_txt = "string", mesic_dph_txt = "string",}
	const enum GDokladDtoTypeLengths { lic = 4, ico = 10, ucs = 10, uus = 10, ac = 20, ixp = 12, ixp_upr = 12, ixp_soup = 12, ixs_esu = 12, ixp_prim = 12, ixs_esu_txt = 254,}
	/**Zápis dokladu*/
	interface GZapisDto {
		/**DBCOLUMN:SeznamZapisu.ixp_upr*/
		ixp_upr?: string|null;
		/**DBCOLUMN:SeznamZapisu.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:SeznamZapisu.radek_zap*/
		radek_zap?: number|null;
		/**DBCOLUMN:SeznamZapisu.ixp_bvp*/
		ixp_bvp?: string|null;
		/**licence*/
		lic?: string|null;
		/**IČO*/
		ico?: string|null;
		/**UCS*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamZapisu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamZapisu.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:SeznamZapisu.den*/
		den?: number|null;
		/**DBCOLUMN:SeznamZapisu.ac*/
		ac?: string|null;
		/**DBCOLUMN:SeznamZapisu.drd*/
		drd?: number|null;
		/**DBCOLUMN:SeznamZapisu.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisu.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamZapisu.uea*/
		uea?: string|null;
		/**DBCOLUMN:SeznamZapisu.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:SeznamZapisu.uec*/
		uec?: string|null;
		/**DBCOLUMN:SeznamZapisu.ued*/
		ued?: string|null;
		/**DBCOLUMN:SeznamZapisu.uee*/
		uee?: string|null;
		/**DBCOLUMN:SeznamZapisu.uef*/
		uef?: string|null;
		/**DBCOLUMN:SeznamZapisu.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:SeznamZapisu.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:SeznamZapisu.uei*/
		uei?: string|null;
		/**DBCOLUMN:SeznamZapisu.uej*/
		uej?: string|null;
		/**DBCOLUMN:SeznamZapisu.te0*/
		te0?: string|null;
		/**DBCOLUMN:SeznamZapisu.te1*/
		te1?: string|null;
		/**DBCOLUMN:SeznamZapisu.te2*/
		te2?: string|null;
		/**DBCOLUMN:SeznamZapisu.te3*/
		te3?: string|null;
		/**DBCOLUMN:SeznamZapisu.te4*/
		te4?: string|null;
		/**DBCOLUMN:SeznamZapisu.uek*/
		uek?: string|null;
		/**DBCOLUMN:SeznamZapisu.uel*/
		uel?: string|null;
		/**DBCOLUMN:SeznamZapisu.uem*/
		uem?: string|null;
		/**DBCOLUMN:SeznamZapisu.uen*/
		uen?: string|null;
		/**DBCOLUMN:SeznamZapisu.te5*/
		te5?: string|null;
		/**DBCOLUMN:SeznamZapisu.te6*/
		te6?: string|null;
		/**DBCOLUMN:SeznamZapisu.te7*/
		te7?: string|null;
		/**DBCOLUMN:SeznamZapisu.te8*/
		te8?: string|null;
		/**DBCOLUMN:SeznamZapisu.te9*/
		te9?: string|null;
		/**DBCOLUMN:SeznamZapisu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamZapisu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamZapisu.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:SeznamZapisu.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamZapisu.priz_opr*/
		priz_opr?: number|null;
		/**DBCOLUMN:SeznamZapisu.priz_poriz*/
		priz_poriz?: number|null;
		/**DBCOLUMN:SeznamZapisu.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:SeznamZapisu.zd*/
		zd?: number|null;
		/**DBCOLUMN:SeznamZapisu.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:SeznamZapisu.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:SeznamZapisu.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:SeznamZapisu.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:SeznamZapisu.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamZapisu.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:SeznamZapisu.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:SeznamZapisu.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:SeznamZapisu.x_ac_sml*/
		x_ac_sml?: string|null;
		/**DBCOLUMN:SeznamZapisu.x_ac_sml2*/
		x_ac_sml2?: string|null;
		/**DBCOLUMN:SeznamZapisu.x_ac_sml3*/
		x_ac_sml3?: string|null;
		/**zkratka příznaku DPH*/
		zd_zkr?: string|null;
		/**název příznaku DPH*/
		zd_txt?: string|null;
	}
	const enum GZapisDtoNames { ixp_upr = "ixp_upr", radek_upo = "radek_upo", radek_zap = "radek_zap", ixp_bvp = "ixp_bvp", lic = "lic", ico = "ico", ucs = "ucs", rok = "rok", mesic = "mesic", den = "den", ac = "ac", drd = "drd", c0 = "c0", c1 = "c1", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", xuete = "xuete", popis = "popis", priz_opr = "priz_opr", priz_poriz = "priz_poriz", typ_ag = "typ_ag", zd = "zd", rok_dph = "rok_dph", mesic_dph = "mesic_dph", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", uus = "uus", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", x_ac_sml = "x_ac_sml", x_ac_sml2 = "x_ac_sml2", x_ac_sml3 = "x_ac_sml3", zd_zkr = "zd_zkr", zd_txt = "zd_txt",}
	const enum GZapisDtoFragments { ixp_upr = "Base", radek_upo = "Base", radek_zap = "Base", ixp_bvp = "Base", lic = "Base", ico = "Base", ucs = "Base", rok = "Base", mesic = "Base", den = "Base", ac = "Base", drd = "Base", c0 = "Base", c1 = "Base", nks = "Base", uea = "Base", ueb = "Base", uec = "Base", ued = "Base", uee = "Base", uef = "Base", ueg = "Base", ueh = "Base", uei = "Base", uej = "Base", te0 = "Base", te1 = "Base", te2 = "Base", te3 = "Base", te4 = "Base", uek = "Base", uel = "Base", uem = "Base", uen = "Base", te5 = "Base", te6 = "Base", te7 = "Base", te8 = "Base", te9 = "Base", dat_zmena = "Base", zmenu_prov = "Base", xuete = "Base", popis = "Base", priz_opr = "Base", priz_poriz = "Base", typ_ag = "Base", zd = "Base", rok_dph = "Base", mesic_dph = "Base", id_hdr_ris = "Base", radek_hdr = "Base", uus = "Base", ixp_sml = "Base", rok_sml = "Base", cislo_sml = "Base", x_ac_sml = "Base", x_ac_sml2 = "Base", x_ac_sml3 = "Base", zd_zkr = "zd", zd_txt = "zd",}
	const enum GZapisDtoTypes { ixp_upr = "string", radek_upo = "number", radek_zap = "number", ixp_bvp = "string", lic = "string", ico = "string", ucs = "string", rok = "number", mesic = "number", den = "number", ac = "string", drd = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", xuete = "string", popis = "string", priz_opr = "number", priz_poriz = "number", typ_ag = "number", zd = "number", rok_dph = "number", mesic_dph = "number", id_hdr_ris = "string", radek_hdr = "number", uus = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", x_ac_sml = "string", x_ac_sml2 = "string", x_ac_sml3 = "string", zd_zkr = "string", zd_txt = "string",}
	const enum GZapisDtoTypeLengths { ixp_upr = 12, ixp_bvp = 12, lic = 4, ico = 10, ucs = 10, ac = 20, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, zmenu_prov = 12, xuete = 148, popis = 254, id_hdr_ris = 10, uus = 10, ixp_sml = 12, x_ac_sml = 100, x_ac_sml2 = 100, x_ac_sml3 = 100, zd_zkr = 1, zd_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pripad\Gordic.Fuc.Interface.IGPripad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Seznam účetních případů
	* @domain FinUctarna
	*/
	interface FinPripad {
		/**Načte detail případu*/
		read(rq?:Gordic.Fuc.Interface.GPripadDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GPripadDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GPripadDto>,GServiceReadResponse<Gordic.Fuc.Interface.GPripadDto>>;
		/**Načte seznam případů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Fuc.Interface.GPripadDto>>;
		/**Zjistí počet účetních případů*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Kontrola předaných případů před stornem / zrušením storna*/
		zkontrolujPredStornem(rq?:Gordic.Fuc.Interface.GPripadStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Storno / zrušení storna případu*/
		stornuj(rq?:Gordic.Fuc.Interface.GPripadStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPripadStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPripadStornoOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Hromadné storno / zrušení storna předaných případů*/
		hromadneStornuj(rq?:Gordic.Fuc.Interface.GPripadStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Kontrola předaných případů před uzavřením / zpětným otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Fuc.Interface.GPripadUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadUzavreniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Uzavření / zpětné otevření případu*/
		uzavri(rq?:Gordic.Fuc.Interface.GPripadUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPripadUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPripadUzavreniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Hromadné uzavření / zpětné otevření předaných případů*/
		hromadneUzavri(rq?:Gordic.Fuc.Interface.GPripadUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadUzavreniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Kontrola případů před předáním*/
		zkontrolujPredPredanim(rq?:Gordic.Fuc.Interface.GPripadPredaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadPredaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadPredaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Předání případu*/
		predej(rq?:Gordic.Fuc.Interface.GPripadPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPripadPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPripadPredaniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Hromadné předání případů*/
		hromadnePredej(rq?:Gordic.Fuc.Interface.GPripadPredaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadPredaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GPripadPredaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GPripadPkDto>>;
		/**Zkontroluje existenci nestornovaných pohybů případu*/
		jsouNestornovanePohyby(rq?:CallParams<{ixpUpr:string}>): _Task<{ixpUpr:string},boolean>;
		/**Vrátí oprávnění případů (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GPripadServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FinPripad: ServiceBase & Catalog.FinPripad;
	}
	const FinPripad: Client["FinPripad"];
}
declare namespace Gordic.Fuc.Interface {
	/**Oprávnění pro jeden případ*/
	interface GPripadPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**lze odlít / nalít zpět*/
		LzeOdlit: Gordic.General.ApplicationInterface.GPermission;
		/**lze upravit předkontaci*/
		LzeUprPredkontaci: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit diagnostiku*/
		LzeDiagnostika: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPripadPermissionNames { LzeZobrazit = "LzeZobrazit", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzeOdlit = "LzeOdlit", LzeUprPredkontaci = "LzeUprPredkontaci", LzePredat = "LzePredat", LzeTisknout = "LzeTisknout", LzeDiagnostika = "LzeDiagnostika",}
	const enum GPripadPermissionFragments { LzeZobrazit = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzeOdlit = "*", LzeUprPredkontaci = "*", LzePredat = "*", LzeTisknout = "*", LzeDiagnostika = "*",}
	const enum GPripadPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzeOdlit = "Gordic.General.ApplicationInterface.GPermission", LzeUprPredkontaci = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeDiagnostika = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPripadPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GPripadPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GPripadPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GPripadPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GPripadPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GPripadPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro práci nad případy*/
	interface GPripadServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**lze odlít / nalít zpět*/
		LzeOdlit: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPripadServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzeOdlit = "LzeOdlit", LzePredat = "LzePredat", LzeTisknout = "LzeTisknout",}
	const enum GPripadServicePermissionFragments { LzeZobrazit = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzeOdlit = "*", LzePredat = "*", LzeTisknout = "*",}
	const enum GPripadServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzeOdlit = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPripadServicePermissionTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu případů*/
	const enum GPripadFilter {
		/**identifikátor*/
		ixp_upr,
		/**kategorie případu*/
		ktg_upr,
		/**agendové číslo*/
		ac_ag,
		/**evidenční číslo*/
		ac,
		/**aktuální vlastník*/
		ixs_fun_akt,
		/**typ účetního případu*/
		typ_upr,
		/**kategorie typu dokladu*/
		ktg_typ,
		/**typ dokladu*/
		ixs_typ,
		/**externí subjekt*/
		ixs_esu,
		/**datum evidence*/
		dat_evid,
		/**nákladové středisko*/
		nks,
		/**účtárna*/
		uus,
		/**konstantní symbol*/
		ks,
		/**variabilní symbol*/
		vs,
		/**specifický symbol*/
		ss,
		/**způsob úhrady*/
		zp,
		/**částka celkem*/
		c_mena,
		/**měna*/
		mena,
		/**částka celkem v Kč*/
		c_celk,
		/**datum vystavení*/
		dat_vyst,
		/**datum plnění*/
		dat_zdan,
		/**datum splatnosti*/
		dat_splat,
		/**popis*/
		popis,
		/**poznámka*/
		poznamka,
		/**stav případu*/
		s_upr,
		/**defaultní stav případu*/
		s_upr_def,
		/**částka případu*/
		c_upr,
		/**stav storna*/
		s_sto,
		/**stav zaúčtování*/
		s_zau,
		/**stav přípravy k úhradě*/
		s_prip,
		/**částka přípravená k úhradě*/
		c_prip,
		/**stav odeslání k úhradě*/
		s_ode,
		/**částka odeslaná k úhradě*/
		c_ode,
		/**stav párování*/
		s_par,
		/**částka spárovaná*/
		c_par,
		/**typ agendy*/
		typ_ag,
		/**kniha*/
		ixp_den,
		/**typ dávky (v popisu případu)*/
		ixs_dav,
		/**lokalita externího systému (v popisu případu)*/
		ixp_exs,
		/**analytiky uea*/
		uea,
		/**analytiky ueb*/
		ueb,
		/**analytiky uec*/
		uec,
		/**analytiky ued*/
		ued,
		/**analytiky uee*/
		uee,
		/**analytiky uef*/
		uef,
		/**analytiky ueg*/
		ueg,
		/**analytiky ueh*/
		ueh,
		/**analytiky uei*/
		uei,
		/**analytiky uej*/
		uej,
		/**analytiky te0*/
		te0,
		/**analytiky te1*/
		te1,
		/**analytiky te2*/
		te2,
		/**analytiky te3*/
		te3,
		/**analytiky te4*/
		te4,
		/**analytiky uek*/
		uek,
		/**analytiky uel*/
		uel,
		/**analytiky uem*/
		uem,
		/**analytiky uen*/
		uen,
		/**analytiky te5*/
		te5,
		/**analytiky te6*/
		te6,
		/**analytiky te7*/
		te7,
		/**analytiky te8*/
		te8,
		/**analytiky te9*/
		te9,
		/**WFL - poznámka dokladu*/
		wfl_poznamka,
		/**WFL - klíčová slova*/
		wfl_kls,
		/**pohyby - kategorie*/
		upo_ktg_upo,
		/**pohyby - stav*/
		upo_s_upo,
		/**pohyby - typ*/
		upo_typ_upo,
		/**pohyby - rok aktuálního příhlášení*/
		upo_akt_rok,
		/**pohyby - datum účtování*/
		upo_dat_uct,
		/**pohybyb - částka*/
		upo_c_upo,
		/**pohyby - popis*/
		upo_popis_upo,
		/**pohyby - subřada deníku účetních zápisů*/
		upo_subrada_duz,
		/**pohyby - číslo účetního dokladu*/
		upo_ac_ixe,
		/**pohyby - variabilní symbol*/
		upo_vs,
		/**pohyby - ID RIS*/
		upo_id_hdr_ris,
		/**pohyby - Ř. RIS*/
		upo_radek_hdr,
		/**platba - konstantní symbol*/
		pla_ks,
		/**platba - variabilní symbol*/
		pla_vs,
		/**platba - specifický symbol*/
		pla_ss,
		/**platba - datum splatnosti*/
		pla_dat_spl,
		/**platba - datum zaplacení*/
		pla_dat_zap,
		/**platba - částka*/
		pla_c,
		/**platba - stav úhrady*/
		pla_s_uhrp,
		/**platba - způsob úhrady*/
		pla_zp,
		/**platba - zkombinovaná položka vlastního účtu*/
		pla_vl_ucet_komb,
		/**platba - vlastní účet*/
		pla_bu_vl,
		/**platba - vlastní směrový kód*/
		pla_sk_vl,
		/**platba - zkombinovaná položka cizího účtu*/
		pla_ci_ucet_komb,
		/**platba - cizí účet*/
		pla_bu_ci,
		/**platba - cizí směrový kód*/
		pla_sk_ci,
		/**existence v tabulce fucduct*/
		duct_ano,
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck,
		/**IKC v tabulce fucduct*/
		duct_ikc,
		/**IČO NKS (na serveru se nezpracovává)*/
		ignore_ico_nks,
		/**IČO UUS (na serveru se nezpracovává)*/
		ignore_ico_uus,
		/**IČO bankovního účtu (na serveru se nezpracovává)*/
		ignore_ico_bu,
		/**UCS UUS (na serveru se nezpracovává)*/
		ignore_ucs_uus,
		/**UCS bankovního účtu (na serveru se nezpracovává)*/
		ignore_ucs_bu,
		/**rok bankovního účtu (na serveru se nezpracovává)*/
		ignore_rok_bu,
		/**pomocná vazba na tabulku fucduct místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_duct,
	}
	/**Parametry storna / zrušení storna případu*/
	interface GPripadStornoOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPripadDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPripadStornoOperationDtoNames { stornovat = "stornovat", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPripadStornoOperationDtoFragments { stornovat = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPripadStornoOperationDtoTypes { stornovat = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPripadDto[]",}
	const enum GPripadStornoOperationDtoTypeLengths {}
	/**Parametry uzavření / zpětného otevření případu*/
	interface GPripadUzavreniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPripadDto> {
		/**požadovaná operace (true = uzavřít, false = zpětně otevřít)*/
		uzavrit?: boolean|null;
		/**způsob zpětného otevření případů agend FUC a INT (true = do stavu otevreno, false = do stavu připraveno k uzavření)*/
		otevrit_fuc_int?: boolean|null;
	}
	const enum GPripadUzavreniOperationDtoNames { uzavrit = "uzavrit", otevrit_fuc_int = "otevrit_fuc_int", ikc = "ikc", rows = "rows",}
	const enum GPripadUzavreniOperationDtoFragments { uzavrit = "*", otevrit_fuc_int = "*", ikc = "*", rows = "*",}
	const enum GPripadUzavreniOperationDtoTypes { uzavrit = "boolean", otevrit_fuc_int = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPripadDto[]",}
	const enum GPripadUzavreniOperationDtoTypeLengths {}
	/**Parametry předání případů*/
	interface GPripadPredaniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GPripadDto> {
		/**požadovaná operace (true = předat)*/
		predat?: boolean|null;
		/**účtárna*/
		uus?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GPripadPredaniOperationDtoNames { predat = "predat", uus = "uus", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GPripadPredaniOperationDtoFragments { predat = "*", uus = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GPripadPredaniOperationDtoTypes { predat = "boolean", uus = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GPripadDto[]",}
	const enum GPripadPredaniOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Pripad\Dto\Gordic.Fuc.Interface.GPripadDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Případ*/
	interface GPripadDto extends Gordic.Fuc.Interface.GFucSeznamDuctDto {
		/**xxxxxxx*/
		ixp?: string|null;
		/**PID případu*/
		ixp_upr?: string|null;
		/**licence*/
		lic?: string|null;
		/**DBCOLUMN:fucsupr.ico*/
		ico?: string|null;
		/**DBCOLUMN:fucsupr.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:fucsupr.nks*/
		nks?: string|null;
		/**DBCOLUMN:fucsupr.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:fucsupr.rok*/
		rok?: number|null;
		/**DBCOLUMN:fucsupr.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:fucsupr.ac*/
		ac?: string|null;
		/**DBCOLUMN:fucsupr.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:fucsupr.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:fucsupr.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:fucsupr.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:fucsupr.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:fucsupr.vs*/
		vs?: string|null;
		/**DBCOLUMN:fucsupr.ks*/
		ks?: string|null;
		/**DBCOLUMN:fucsupr.ss*/
		ss?: string|null;
		/**DBCOLUMN:fucsupr.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:fucsupr.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:fucsupr.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:fucsupr.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:fucsupr.zp*/
		zp?: number|null;
		/**DBCOLUMN:fucsupr.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_splat*/
		dat_splat?: JsonDate|null;
		/**DBCOLUMN:fucsupr.mena*/
		mena?: number|null;
		/**DBCOLUMN:fucsupr.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.znam*/
		znam?: number|null;
		/**DBCOLUMN:fucsupr.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_z0*/
		c_z0?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_z1*/
		c_z1?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_d1*/
		c_d1?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_z2*/
		c_z2?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_d2*/
		c_d2?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_upr*/
		c_upr?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.popis*/
		popis?: string|null;
		/**DBCOLUMN:fucsupr.s_ag*/
		s_ag?: number|null;
		/**DBCOLUMN:fucsupr.s_upr*/
		s_upr?: number|null;
		/**DBCOLUMN:fucsupr.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:fucsupr.s_prip*/
		s_prip?: number|null;
		/**DBCOLUMN:fucsupr.c_prip*/
		c_prip?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.s_ode*/
		s_ode?: number|null;
		/**DBCOLUMN:fucsupr.c_ode*/
		c_ode?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.s_par*/
		s_par?: number|null;
		/**DBCOLUMN:fucsupr.c_par*/
		c_par?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:fucsupr.ktg_upr*/
		ktg_upr?: number|null;
		/**DBCOLUMN:fucsupr.typ_upr*/
		typ_upr?: string|null;
		/**DBCOLUMN:fucsupr.typ_zauc*/
		typ_zauc?: number|null;
		/**DBCOLUMN:fucsupr.priz_spr*/
		priz_spr?: number|null;
		/**DBCOLUMN:fucsupr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:fucsupr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:fucsupr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:fucsupr.uea*/
		uea?: string|null;
		/**DBCOLUMN:fucsupr.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:fucsupr.uec*/
		uec?: string|null;
		/**DBCOLUMN:fucsupr.ued*/
		ued?: string|null;
		/**DBCOLUMN:fucsupr.uee*/
		uee?: string|null;
		/**DBCOLUMN:fucsupr.uef*/
		uef?: string|null;
		/**DBCOLUMN:fucsupr.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:fucsupr.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:fucsupr.uei*/
		uei?: string|null;
		/**DBCOLUMN:fucsupr.uej*/
		uej?: string|null;
		/**DBCOLUMN:fucsupr.te0*/
		te0?: string|null;
		/**DBCOLUMN:fucsupr.te1*/
		te1?: string|null;
		/**DBCOLUMN:fucsupr.te2*/
		te2?: string|null;
		/**DBCOLUMN:fucsupr.te3*/
		te3?: string|null;
		/**DBCOLUMN:fucsupr.te4*/
		te4?: string|null;
		/**DBCOLUMN:fucsupr.uek*/
		uek?: string|null;
		/**DBCOLUMN:fucsupr.uel*/
		uel?: string|null;
		/**DBCOLUMN:fucsupr.uem*/
		uem?: string|null;
		/**DBCOLUMN:fucsupr.uen*/
		uen?: string|null;
		/**DBCOLUMN:fucsupr.te5*/
		te5?: string|null;
		/**DBCOLUMN:fucsupr.te6*/
		te6?: string|null;
		/**DBCOLUMN:fucsupr.te7*/
		te7?: string|null;
		/**DBCOLUMN:fucsupr.te8*/
		te8?: string|null;
		/**DBCOLUMN:fucsupr.te9*/
		te9?: string|null;
		/**DBCOLUMN:fucsupr.drd*/
		drd?: number|null;
		/**DBCOLUMN:fucsupr.dat_ag*/
		dat_ag?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_upr*/
		dat_upr?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_sto*/
		dat_sto?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_prip*/
		dat_prip?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_ode*/
		dat_ode?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_par*/
		dat_par?: JsonDate|null;
		/**DBCOLUMN:fucsupr.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:fucsupr.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:fucsupr.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:fucsupr.uus*/
		uus?: string|null;
		/**DBCOLUMN:fucsupr.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:fucsupr.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:fucsupr.c_d0*/
		c_d0?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_zao*/
		c_zao?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_z3*/
		c_z3?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_d3*/
		c_d3?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_z4*/
		c_z4?: JsonDecimal|null;
		/**DBCOLUMN:fucsupr.c_d4*/
		c_d4?: JsonDecimal|null;
		/**počet pohybů k případu*/
		pocet_pohybu?: number|null;
		/**počet účetních pohybů k případu*/
		pocet_uct_pohybu?: number|null;
		/**počet rezervačních pohybů k případu*/
		pocet_rez_pohybu?: number|null;
		/**počet plateb k případu*/
		pocet_plateb?: number|null;
		/**existuje PID (ixp_upr ve WFL? (0 = ne, >0 = ano)*/
		je_ve_wfl?: number|null;
		/**text k typ_upr*/
		typ_upr_txt?: string|null;
		/**text k ixp_den*/
		ixp_den_txt?: string|null;
		/**text k ixs_typ*/
		ixs_typ_txt?: string|null;
		/**text k ktg_typ*/
		ktg_typ_txt?: string|null;
		/**text k ktg_upr*/
		ktg_upr_txt?: string|null;
		/**zkratka k typ_ag*/
		zkr_ag?: string|null;
		/**text k zp*/
		zp_txt?: string|null;
		/**zkratka k mena*/
		mena_zkr?: string|null;
		/**text k znam*/
		znam_txt?: string|null;
		/**text k s_sto*/
		s_sto_txt?: string|null;
		/**text k s_prip*/
		s_prip_txt?: string|null;
		/**text k s_par*/
		s_par_txt?: string|null;
		/**text k s_upr*/
		s_upr_txt?: string|null;
		/**text k s_ode*/
		s_ode_txt?: string|null;
		/**text k s_zau*/
		s_zau_txt?: string|null;
		/**text k s_ag*/
		s_ag_txt?: string|null;
		/**text k priz_spr*/
		priz_spr_txt?: string|null;
		/**text k typ_zauc*/
		typ_zauc_txt?: string|null;
		/**složený vlastní bú*/
		bu_vl_txt?: string|null;
		/**složený cizí bú*/
		bu_ci_txt?: string|null;
		/**upravený popis do jednoho řádku (do hlavičky a také seznamu)*/
		popis_zkr?: string|null;
		/**Navigacni vlastnost pro vlastníka (ixs_fun_akt)*/
		vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**Navigacni vlastnost pro subjekt (ixs_esu)*/
		subjekt?: Gordic.Fuc.Interface.GExterniSubjektDto|null;
		/**Je případ uzavřený?*/
		readonly JeUzavreny?: boolean|null;
		/**Je případ připravený k uzavření?*/
		readonly JePripravenKUzavreni?: boolean|null;
		/**Je případ stornovaný?*/
		readonly JeStornovany?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GPripadPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GPripadDtoNames { ixp = "ixp", ixp_upr = "ixp_upr", lic = "lic", ico = "ico", ucs = "ucs", nks = "nks", typ_ag = "typ_ag", rok = "rok", ixp_den = "ixp_den", ac = "ac", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ico_esu = "ico_esu", ixs_esu = "ixs_esu", ac_esu = "ac_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", dat_evid = "dat_evid", dat_vyst = "dat_vyst", dat_zdan = "dat_zdan", dat_splat = "dat_splat", mena = "mena", c_mena = "c_mena", znam = "znam", c_celk = "c_celk", c_z0 = "c_z0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_upr = "c_upr", popis = "popis", s_ag = "s_ag", s_upr = "s_upr", s_sto = "s_sto", s_prip = "s_prip", c_prip = "c_prip", s_ode = "s_ode", c_ode = "c_ode", s_par = "s_par", c_par = "c_par", s_zau = "s_zau", ktg_upr = "ktg_upr", typ_upr = "typ_upr", typ_zauc = "typ_zauc", priz_spr = "priz_spr", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", drd = "drd", dat_ag = "dat_ag", dat_upr = "dat_upr", dat_sto = "dat_sto", dat_prip = "dat_prip", dat_ode = "dat_ode", dat_par = "dat_par", dat_zau = "dat_zau", rok_dph = "rok_dph", mesic_dph = "mesic_dph", uus = "uus", ixs_fun_akt = "ixs_fun_akt", ac_ag = "ac_ag", c_d0 = "c_d0", c_zao = "c_zao", c_z3 = "c_z3", c_d3 = "c_d3", c_z4 = "c_z4", c_d4 = "c_d4", pocet_pohybu = "pocet_pohybu", pocet_uct_pohybu = "pocet_uct_pohybu", pocet_rez_pohybu = "pocet_rez_pohybu", pocet_plateb = "pocet_plateb", je_ve_wfl = "je_ve_wfl", typ_upr_txt = "typ_upr_txt", ixp_den_txt = "ixp_den_txt", ixs_typ_txt = "ixs_typ_txt", ktg_typ_txt = "ktg_typ_txt", ktg_upr_txt = "ktg_upr_txt", zkr_ag = "zkr_ag", zp_txt = "zp_txt", mena_zkr = "mena_zkr", znam_txt = "znam_txt", s_sto_txt = "s_sto_txt", s_prip_txt = "s_prip_txt", s_par_txt = "s_par_txt", s_upr_txt = "s_upr_txt", s_ode_txt = "s_ode_txt", s_zau_txt = "s_zau_txt", s_ag_txt = "s_ag_txt", priz_spr_txt = "priz_spr_txt", typ_zauc_txt = "typ_zauc_txt", bu_vl_txt = "bu_vl_txt", bu_ci_txt = "bu_ci_txt", popis_zkr = "popis_zkr", vlastnik = "vlastnik", subjekt = "subjekt", JeUzavreny = "JeUzavreny", JePripravenKUzavreni = "JePripravenKUzavreni", JeStornovany = "JeStornovany", Permissions = "Permissions", PrimaryKey = "PrimaryKey", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GPripadDtoFragments { ixp = "*", ixp_upr = "Base", lic = "Base", ico = "Base", ucs = "Base", nks = "Base", typ_ag = "Base", rok = "Base", ixp_den = "Base", ac = "Base", ktg_typ = "Base", ixs_typ = "Base", ico_esu = "Base", ixs_esu = "Base", ac_esu = "Base", vs = "Extended2", ks = "Extended2", ss = "Extended2", sk_vl = "Extended2", bu_vl = "Extended2", sk_ci = "Extended2", bu_ci = "Extended2", zp = "Extended2", dat_evid = "Base", dat_vyst = "Extended2", dat_zdan = "Extended2", dat_splat = "Extended2", mena = "Base", c_mena = "Base", znam = "Base", c_celk = "Base", c_z0 = "Extended", c_z1 = "Extended", c_d1 = "Extended", c_z2 = "Extended", c_d2 = "Extended", c_upr = "Base", popis = "Base", s_ag = "Extended2", s_upr = "Base", s_sto = "Base", s_prip = "Extended2", c_prip = "Extended2", s_ode = "Extended2", c_ode = "Extended2", s_par = "Extended2", c_par = "Extended2", s_zau = "Extended2", ktg_upr = "Base", typ_upr = "Base", typ_zauc = "Base", priz_spr = "Extended2", poznamka = "Base", dat_zmena = "Base", zmenu_prov = "Base", uea = "Extended3", ueb = "Extended3", uec = "Extended3", ued = "Extended3", uee = "Extended3", uef = "Extended3", ueg = "Extended3", ueh = "Extended3", uei = "Extended3", uej = "Extended3", te0 = "Extended3", te1 = "Extended3", te2 = "Extended3", te3 = "Extended3", te4 = "Extended3", uek = "Extended3", uel = "Extended3", uem = "Extended3", uen = "Extended3", te5 = "Extended3", te6 = "Extended3", te7 = "Extended3", te8 = "Extended3", te9 = "Extended3", drd = "Base", dat_ag = "Base", dat_upr = "Base", dat_sto = "Base", dat_prip = "Base", dat_ode = "Base", dat_par = "Base", dat_zau = "Base", rok_dph = "Base", mesic_dph = "Base", uus = "Base", ixs_fun_akt = "Base", ac_ag = "Base", c_d0 = "Extended", c_zao = "Extended", c_z3 = "Extended", c_d3 = "Extended", c_z4 = "Extended", c_d4 = "Extended", pocet_pohybu = "pocet_pohybu", pocet_uct_pohybu = "pocet_uct_pohybu", pocet_rez_pohybu = "pocet_rez_pohybu", pocet_plateb = "pocet_plateb", je_ve_wfl = "Base", typ_upr_txt = "typ_pripadu", ixp_den_txt = "kniha", ixs_typ_txt = "typ_dokladu", ktg_typ_txt = "kategorie_dokladu", ktg_upr_txt = "kategorie_pripadu", zkr_ag = "agenda", zp_txt = "zpusob_uhrady", mena_zkr = "mena", znam_txt = "Base", s_sto_txt = "stav_storna", s_prip_txt = "stav_pripravy", s_par_txt = "stav_parovani", s_upr_txt = "stav_pripadu", s_ode_txt = "stav_odeslani", s_zau_txt = "stav_zauctovani", s_ag_txt = "stav_agendy", priz_spr_txt = "priznak_sparovani", typ_zauc_txt = "typ_zauctovani", bu_vl_txt = "Extended2", bu_ci_txt = "Extended2", popis_zkr = "Base", vlastnik = "vlastnik", subjekt = "subjekt", JeUzavreny = "*", JePripravenKUzavreni = "*", JeStornovany = "*", Permissions = "Permissions", PrimaryKey = "*", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GPripadDtoTypes { ixp = "string", ixp_upr = "string", lic = "string", ico = "string", ucs = "string", nks = "string", typ_ag = "number", rok = "number", ixp_den = "string", ac = "string", ktg_typ = "number", ixs_typ = "string", ico_esu = "string", ixs_esu = "string", ac_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", dat_evid = "JsonDate", dat_vyst = "JsonDate", dat_zdan = "JsonDate", dat_splat = "JsonDate", mena = "number", c_mena = "JsonDecimal", znam = "number", c_celk = "JsonDecimal", c_z0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_upr = "JsonDecimal", popis = "string", s_ag = "number", s_upr = "number", s_sto = "number", s_prip = "number", c_prip = "JsonDecimal", s_ode = "number", c_ode = "JsonDecimal", s_par = "number", c_par = "JsonDecimal", s_zau = "number", ktg_upr = "number", typ_upr = "string", typ_zauc = "number", priz_spr = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", drd = "number", dat_ag = "JsonDate", dat_upr = "JsonDate", dat_sto = "JsonDate", dat_prip = "JsonDate", dat_ode = "JsonDate", dat_par = "JsonDate", dat_zau = "JsonDate", rok_dph = "number", mesic_dph = "number", uus = "string", ixs_fun_akt = "string", ac_ag = "string", c_d0 = "JsonDecimal", c_zao = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", pocet_pohybu = "number", pocet_uct_pohybu = "number", pocet_rez_pohybu = "number", pocet_plateb = "number", je_ve_wfl = "number", typ_upr_txt = "string", ixp_den_txt = "string", ixs_typ_txt = "string", ktg_typ_txt = "string", ktg_upr_txt = "string", zkr_ag = "string", zp_txt = "string", mena_zkr = "string", znam_txt = "string", s_sto_txt = "string", s_prip_txt = "string", s_par_txt = "string", s_upr_txt = "string", s_ode_txt = "string", s_zau_txt = "string", s_ag_txt = "string", priz_spr_txt = "string", typ_zauc_txt = "string", bu_vl_txt = "string", bu_ci_txt = "string", popis_zkr = "string", vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", subjekt = "Gordic.Fuc.Interface.GExterniSubjektDto", JeUzavreny = "boolean", JePripravenKUzavreni = "boolean", JeStornovany = "boolean", Permissions = "Gordic.Fuc.Interface.GPripadPermission", PrimaryKey = "string", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GPripadDtoTypeLengths { ixp = 12, ixp_upr = 12, lic = 4, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 30, ixs_typ = 12, ico_esu = 10, ixs_esu = 12, ac_esu = 60, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, popis = 254, typ_upr = 15, poznamka = 50, zmenu_prov = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uus = 10, ixs_fun_akt = 12, ac_ag = 30, typ_upr_txt = 254, ixp_den_txt = 50, ixs_typ_txt = 254, ktg_typ_txt = 50, ktg_upr_txt = 50, zkr_ag = 3, zp_txt = 50, mena_zkr = 50, znam_txt = 1, s_sto_txt = 50, s_prip_txt = 50, s_par_txt = 50, s_upr_txt = 50, s_ode_txt = 50, s_zau_txt = 50, s_ag_txt = 50, priz_spr_txt = 50, typ_zauc_txt = 50, duct_txt_err = 254,}
	/**Primární klíč případu*/
	interface GPripadPkDto {
		/**PID případu*/
		ixp_upr?: string|null;
	}
	const enum GPripadPkDtoNames { ixp_upr = "ixp_upr",}
	const enum GPripadPkDtoFragments { ixp_upr = "*",}
	const enum GPripadPkDtoTypes { ixp_upr = "string",}
	const enum GPripadPkDtoTypeLengths { ixp_upr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Soupiska\Gordic.Fuc.Interface.IGSoupiska.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Soupisky pohybů
	* @domain FinUctarna
	*/
	interface FinPohybSoupiska {
		/**Načte detail soupisky*/
		read(rq?:Gordic.Fuc.Interface.GSoupiskaDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GSoupiskaDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GSoupiskaDto>,GServiceReadResponse<Gordic.Fuc.Interface.GSoupiskaDto>>;
		/**Načte seznam soupisek*/
		list(rq?:Gordic.Fuc.Interface.GSoupiskaFilterDto|CallParams<GServiceListRequestWithOrder<Gordic.Fuc.Interface.GSoupiskaOrderBy>>): _Task<GServiceListRequestWithOrder<Gordic.Fuc.Interface.GSoupiskaOrderBy>,GServiceListResponse<Gordic.Fuc.Interface.GSoupiskaDto>>;
		/**Zjistí počet soupisek*/
		listCount(rq?:Gordic.Fuc.Interface.GSoupiskaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Zjistí počet soupisek ke schválení za zadané knihy (ve filtrech))*/
		listCountsKeSchvaleni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,Gordic.Fuc.Interface.GPocetZaKnihyDto[]>;
		/**Podání soupisky*/
		create(rq?:Gordic.Fuc.Interface.GSoupiskaDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GSoupiskaDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GSoupiskaDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Evidence (uložení) soupisky*/
		update(rq?:Gordic.Fuc.Interface.GSoupiskaDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GSoupiskaDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GSoupiskaDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola předaných soupisek před stornem / zrušením storna*/
		zkontrolujPredStornem(rq?:Gordic.Fuc.Interface.GSoupiskaStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GSoupiskaStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GSoupiskaStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Storno / zrušení storna soupisky*/
		stornuj(rq?:Gordic.Fuc.Interface.GSoupiskaStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaStornoOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné storno / zrušení storna předaných soupisek*/
		hromadneStornuj(rq?:Gordic.Fuc.Interface.GSoupiskaStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GSoupiskaStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GSoupiskaStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisek před schválením / zrušením schválení*/
		zkontrolujPredSchvalenim(rq?:Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Schváleni / zrušení schválení soupisky*/
		schval(rq?:Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné schváleni / zrušení schválení předaných soupisek*/
		hromadneSchval(rq?:Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisek před uzavřením / zrušením uzavření*/
		zkontrolujPredUzavrenim(rq?:Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Uzavření / zrušení uzavření soupisky*/
		uzavri(rq?:Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné uzavření / zrušení uzavření soupisek (podle fucduct)*/
		hromadneUzavri(rq?:Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisek před předáním*/
		zkontrolujPredPredanim(rq?:Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Předání soupisky*/
		predej(rq?:Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné předání soupisek*/
		hromadnePredej(rq?:Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPredaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisek před převzetím*/
		zkontrolujPredPrevzetim(rq?:Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Převzetí soupisky*/
		prevezmi(rq?:Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné převzetí soupisek*/
		hromadnePrevezmi(rq?:Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisek před přidělením*/
		zkontrolujPredPridelenim(rq?:Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Přidělení soupisky*/
		pridel(rq?:Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné přidělení soupisek*/
		hromadnePridel(rq?:Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPrideleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisek před přeevidováním*/
		zkontrolujPredPreevidovanim(rq?:Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Přeevidování soupisky*/
		preeviduj(rq?:Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné přeevidování soupisek*/
		hromadnePreeviduj(rq?:Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola soupisky před vrácením do WFL*/
		zkontrolujPredVracenimDoWfl(rq?:Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Vrácení soupisky do WFL*/
		vratDoWfl(rq?:Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Hromadné vrácení soupisek do WFL*/
		hromadneVratDoWfl(rq?:Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GSoupiskaVraceniDoWflOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GSoupiskaPkDto>>;
		/**Kontrola na první doklad v knize*/
		zkontrolujNaPrvniDokladVKnize(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**Zjištění omezení typu dokumentu na knihu*/
		zjistiOmezeniNaIxsTyp(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},boolean>;
		/**Kontrola, jestli je povoleno účtování zadaného typu pro pohyby soupisek ze seznamu*/
		jeUctovaniPovoleno(rq?:CallParams<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu,rows:Gordic.Fuc.Interface.GPohybDto[]}>): _Task<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu,rows:Gordic.Fuc.Interface.GPohybDto[]},boolean>;
		/**Kontrola, jestli jsou povolena účtování zadaného typu pro pohyby soupisek ze seznamu*/
		jsouUctovaniPovolena(rq?:CallParams<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu[],rows:Gordic.Fuc.Interface.GPohybDto[]}>): _Task<{typUctovani:Gordic.Fuc.Interface.TypUctovaniPohybu[],rows:Gordic.Fuc.Interface.GPohybDto[]},any>;
		/**Vrátí oprávnění soupisek (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GSoupiskaServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FinPohybSoupiska: ServiceBase & Catalog.FinPohybSoupiska;
	}
	const FinPohybSoupiska: Client["FinPohybSoupiska"];
}
declare namespace Gordic.Fuc.Interface {
	/**Oprávnění pro jednu soupisku*/
	interface GSoupiskaPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit (přejít do editačního módu)*/
		LzeOpravit: Gordic.General.ApplicationInterface.GPermission;
		/**lze účtovat*/
		LzeUctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vrátit do WFL*/
		LzeVratitDoWfl: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit diagnostiku*/
		LzeDiagnostika: Gordic.General.ApplicationInterface.GPermission;
		/**lze vložit pohyb do soupisky*/
		LzeVlozitPohyb: Gordic.General.ApplicationInterface.GPermission;
		/**lze vyjmout pohyb ze soupisky*/
		LzeVyjmoutPohyb: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSoupiskaPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeOpravit = "LzeOpravit", LzeUctovat = "LzeUctovat", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout", LzeDiagnostika = "LzeDiagnostika", LzeVlozitPohyb = "LzeVlozitPohyb", LzeVyjmoutPohyb = "LzeVyjmoutPohyb",}
	const enum GSoupiskaPermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeOpravit = "*", LzeUctovat = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*", LzeDiagnostika = "*", LzeVlozitPohyb = "*", LzeVyjmoutPohyb = "*",}
	const enum GSoupiskaPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeOpravit = "Gordic.General.ApplicationInterface.GPermission", LzeUctovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeDiagnostika = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitPohyb = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutPohyb = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSoupiskaPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GSoupiskaPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GSoupiskaPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GSoupiskaPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GSoupiskaPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GSoupiskaPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro práci nad soupiskami*/
	interface GSoupiskaServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit (přejít do editačního módu)*/
		LzeOpravit: Gordic.General.ApplicationInterface.GPermission;
		/**lze účtovat*/
		LzeUctovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vrátit do WFL*/
		LzeVratitDoWfl: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSoupiskaServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeOpravit = "LzeOpravit", LzeUctovat = "LzeUctovat", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout",}
	const enum GSoupiskaServicePermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeOpravit = "*", LzeUctovat = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*",}
	const enum GSoupiskaServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeOpravit = "Gordic.General.ApplicationInterface.GPermission", LzeUctovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSoupiskaServicePermissionTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu soupisek*/
	const enum GSoupiskaFilter {
		/**PID knihy soupisek*/
		ixp_den,
		/**rok knih soupisek (pro všechny knihy roku)*/
		rok_den,
		/**kategorie knih soupisek*/
		ktg_den,
		/**identifikátor*/
		ixp,
		/**evidenční číslo*/
		ac,
		/**agendové číslo*/
		ac_ag,
		/**stav soupisky*/
		s_soup,
		/**částka soupisky*/
		c_soup,
		/**kategorie typu dokladu*/
		ktg_typ,
		/**typ dokladu*/
		ixs_typ,
		/**datum evidence*/
		dat_evid,
		/**datum schválení*/
		dat_sch,
		/**vlastník*/
		ixs_fun_akt,
		/**typ agendy*/
		typ_ag,
		/**období*/
		rok,
		/**nákladové středisko*/
		nks,
		/**účtárna*/
		uus,
		/**popis*/
		popis,
		/**id historie*/
		huf_ixs_huf,
		/**bez právě účtovaných pohybů (bez právě účtovaných soupisek)*/
		huf_neuctovane,
		/**existence v tabulce fucduct*/
		duct_ano,
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck,
		/**IKC v tabulce fucduct*/
		duct_ikc,
		/**klíčová slova*/
		wfl_kl_slovo,
		/**rozšířující vlastnosti*/
		vlastnosti_r,
		/**popisné vlastnosti*/
		vlastnosti_s,
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis,
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis,
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt,
		dokument_nazev,
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka,
		dokument_stav_dist,
		/**(písemnosti)*/
		dokument_stav_pis,
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij,
		/**profil SSL pro tento dokument*/
		dokument_s_ssl,
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena,
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov,
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele,
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz,
		/**Barva*/
		dokument_uzo,
		/**plánu*/
		dokument_spis_pl,
		/**spisového znaku*/
		dokument_spis_znak,
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl,
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl,
		dokument_dat_vyriz,
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval,
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak,
		/**oproti spisovému znaku*/
		dokument_skar_lhuta,
		/**události*/
		dokument_rok_spo_uda,
		/**skartace dokumentu*/
		dokument_rok_skartace,
		dokument_poc_listu,
		/**dokumentu*/
		dokument_poc_stran,
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop,
		/**dokumentu*/
		dokument_poc_priloh,
		/**příloh*/
		dokument_poc_l_priloh,
		/**pro zobrazení v seznamech*/
		dokument_cj,
		/**existuje profil čísla jednacího*/
		dokument_priz_cj,
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku,
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup,
		/**skartační operace*/
		dokument_PrizPozSkar,
		/**IČO NKS (na serveru se nezpracovává)*/
		ignore_ico_nks,
		/**IČO UUS (na serveru se nezpracovává)*/
		ignore_ico_uus,
		/**UCS UUS (na serveru se nezpracovává)*/
		ignore_ucs_uus,
		/**pomocná vazba na tabulku fucduct místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_duct,
	}
	/**Výčet sloupců pro řazení*/
	const enum GSoupiskaOrderBy {
		/**datum poslední změny*/
		dat_zmena,
	}
	/**Parametry storna / zrušení storna soupisek*/
	interface GSoupiskaStornoOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GSoupiskaStornoOperationDtoNames { stornovat = "stornovat", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaStornoOperationDtoFragments { stornovat = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaStornoOperationDtoTypes { stornovat = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaStornoOperationDtoTypeLengths {}
	/**Parametry schválení / zrušení schválení soupisek*/
	interface GSoupiskaSchvaleniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = schválení, false = zrušení schválení)*/
		schvalit?: boolean|null;
	}
	const enum GSoupiskaSchvaleniOperationDtoNames { schvalit = "schvalit", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaSchvaleniOperationDtoFragments { schvalit = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaSchvaleniOperationDtoTypes { schvalit = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaSchvaleniOperationDtoTypeLengths {}
	/**Parametry uzavření / zrušení uzavření sooupisek*/
	interface GSoupiskaUzavreniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = uzavření, false = zrušení uzavření)*/
		uzavrit?: boolean|null;
	}
	const enum GSoupiskaUzavreniOperationDtoNames { uzavrit = "uzavrit", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaUzavreniOperationDtoFragments { uzavrit = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaUzavreniOperationDtoTypes { uzavrit = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaUzavreniOperationDtoTypeLengths {}
	/**Parametry předání soupisek*/
	interface GSoupiskaPredaniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = předat)*/
		predat?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GSoupiskaPredaniOperationDtoNames { predat = "predat", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaPredaniOperationDtoFragments { predat = "*", ixs_su = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaPredaniOperationDtoTypes { predat = "boolean", ixs_su = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaPredaniOperationDtoTypeLengths {}
	/**Parametry převzetí soupisek*/
	interface GSoupiskaPrevzetiOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = převzít)*/
		prevzit?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GSoupiskaPrevzetiOperationDtoNames { prevzit = "prevzit", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaPrevzetiOperationDtoFragments { prevzit = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaPrevzetiOperationDtoTypes { prevzit = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaPrevzetiOperationDtoTypeLengths {}
	/**Parametry přidělení soupisek*/
	interface GSoupiskaPrideleniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = přidělit)*/
		pridelit?: boolean|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GSoupiskaPrideleniOperationDtoNames { pridelit = "pridelit", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaPrideleniOperationDtoFragments { pridelit = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaPrideleniOperationDtoTypes { pridelit = "boolean", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaPrideleniOperationDtoTypeLengths {}
	/**Parametry přeevidence soupisek*/
	interface GSoupiskaPreevidenceOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = přidělit)*/
		preevidovat?: boolean|null;
		/**kniha*/
		ixp_den?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GSoupiskaPreevidenceOperationDtoNames { preevidovat = "preevidovat", ixp_den = "ixp_den", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaPreevidenceOperationDtoFragments { preevidovat = "*", ixp_den = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaPreevidenceOperationDtoTypes { preevidovat = "boolean", ixp_den = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaPreevidenceOperationDtoTypeLengths {}
	/**Parametry vrácení soupisek do WFL*/
	interface GSoupiskaVraceniDoWflOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GSoupiskaDto> {
		/**požadovaná operace (true = vrátit)*/
		vratit?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GSoupiskaVraceniDoWflOperationDtoNames { vratit = "vratit", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GSoupiskaVraceniDoWflOperationDtoFragments { vratit = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GSoupiskaVraceniDoWflOperationDtoTypes { vratit = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GSoupiskaDto[]",}
	const enum GSoupiskaVraceniDoWflOperationDtoTypeLengths {}
	/**DTO pro počet za knihu*/
	interface GPocetZaKnihyDto {
		/**kniha*/
		ixpDen?: string|null;
		/**počet*/
		pocet?: number|null;
	}
	const enum GPocetZaKnihyDtoNames { ixpDen = "ixpDen", pocet = "pocet",}
	const enum GPocetZaKnihyDtoFragments { ixpDen = "*", pocet = "*",}
	const enum GPocetZaKnihyDtoTypes { ixpDen = "string", pocet = "number",}
	const enum GPocetZaKnihyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Soupiska\Dto\Gordic.Fuc.Interface.GSoupiskaDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Soupiska pohybů*/
	interface GSoupiskaDto extends Gordic.Fuc.Interface.GFucSeznamDuctWflDto {
		/**PID soupisky*/
		ixp?: string|null;
		/**licence*/
		lic?: string|null;
		/**IČO*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**primární agenda*/
		typ_ag?: number|null;
		/**rok*/
		rok?: number|null;
		/**EKO aktivita*/
		eko_akt?: number|null;
		/**PID knihy*/
		ixp_den?: string|null;
		/**evidenční číslo*/
		ac?: string|null;
		/**agendové číslo*/
		ac_ag?: string|null;
		/**aktuální funkce (vlastník)*/
		ixs_fun_akt?: string|null;
		/**kategorie typu dokladu*/
		ktg_typ?: number|null;
		/**typ dokladu*/
		ixs_typ?: string|null;
		/**celková částka*/
		c_soup?: JsonDecimal|null;
		/**datum evidence*/
		dat_evid?: JsonDate|null;
		/**datum schválení*/
		dat_sch?: JsonDate|null;
		/**stav*/
		s_soup?: number|null;
		/**popis*/
		popis?: string|null;
		/**povoleno účtování jednotlivě?*/
		priz_pov_uct_jedn?: boolean|null;
		/**povoleno účtování hromadně?*/
		priz_pov_uct_hrom?: boolean|null;
		/**povoleno účtování kumulovaně?*/
		priz_pov_uct_kum?: boolean|null;
		/**automatické nápočet částky po vložení / vyjmutí pohybu?*/
		priz_aut_poc_c?: boolean|null;
		/**zakázány aktiviní operace ve FUC?*/
		priz_ne_akt_op_fuc?: boolean|null;
		/**příznak nepřečteného záznamu*/
		priz_view?: number|null;
		/**datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**změnu provedl*/
		zmenu_prov?: string|null;
		/**text k ixp_den*/
		ixp_den_txt?: string|null;
		/**text k ixs_typ*/
		ixs_typ_txt?: string|null;
		/**počet pohybů*/
		pocet_pohybu?: number|null;
		/**DBCOLUMN:fucshuf.ixs_huf*/
		ixs_huf?: string|null;
		/**stav zpracování v agendě*/
		stav_sda?: number|null;
		/**text k s_soup*/
		s_soup_txt?: string|null;
		/**zkratka k typ_ag*/
		zkr_ag?: string|null;
		/**text k ktg_typ*/
		ktg_typ_txt?: string|null;
		/**text k priz_pov_uct_jedn*/
		priz_pov_uct_jedn_txt?: string|null;
		/**text k priz_pov_uct_hrom*/
		priz_pov_uct_hrom_txt?: string|null;
		/**text k priz_pov_uct_kum*/
		priz_pov_uct_kum_txt?: string|null;
		/**text k priz_aut_poc_c*/
		priz_aut_poc_c_txt?: string|null;
		/**text k priz_ne_akt_op_fuc*/
		priz_ne_akt_op_fuc_txt?: string|null;
		/**Navigacni vlastnost pro vlastníka (ixs_fun_akt)*/
		vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**přístup k dokumentu*/
		pristup?: Gordic.Wfl.Interface.GWflPristupInfo|null;
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Navigacni vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Je soupiska podaná?*/
		readonly JePodana?: boolean|null;
		/**Je soupiska evidovaná?*/
		readonly JeEvidovana?: boolean|null;
		/**Je soupiska schválená?*/
		readonly JeSchvalena?: boolean|null;
		/**Je soupiska zaúčtovaná?*/
		readonly JeZauctovana?: boolean|null;
		/**Je soupiska uzavřená?*/
		readonly JeUzavrena?: boolean|null;
		/**Je soupiska stornovaná?*/
		readonly JeStornovana?: boolean|null;
		/**Je soupiska vedena v jiné agendě?*/
		readonly JeVJineAgende?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GSoupiskaPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GSoupiskaDtoNames { ixp = "ixp", lic = "lic", ico = "ico", ucs = "ucs", nks = "nks", uus = "uus", typ_ag = "typ_ag", rok = "rok", eko_akt = "eko_akt", ixp_den = "ixp_den", ac = "ac", ac_ag = "ac_ag", ixs_fun_akt = "ixs_fun_akt", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", c_soup = "c_soup", dat_evid = "dat_evid", dat_sch = "dat_sch", s_soup = "s_soup", popis = "popis", priz_pov_uct_jedn = "priz_pov_uct_jedn", priz_pov_uct_hrom = "priz_pov_uct_hrom", priz_pov_uct_kum = "priz_pov_uct_kum", priz_aut_poc_c = "priz_aut_poc_c", priz_ne_akt_op_fuc = "priz_ne_akt_op_fuc", priz_view = "priz_view", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den_txt = "ixp_den_txt", ixs_typ_txt = "ixs_typ_txt", pocet_pohybu = "pocet_pohybu", ixs_huf = "ixs_huf", stav_sda = "stav_sda", s_soup_txt = "s_soup_txt", zkr_ag = "zkr_ag", ktg_typ_txt = "ktg_typ_txt", priz_pov_uct_jedn_txt = "priz_pov_uct_jedn_txt", priz_pov_uct_hrom_txt = "priz_pov_uct_hrom_txt", priz_pov_uct_kum_txt = "priz_pov_uct_kum_txt", priz_aut_poc_c_txt = "priz_aut_poc_c_txt", priz_ne_akt_op_fuc_txt = "priz_ne_akt_op_fuc_txt", vlastnik = "vlastnik", pristup = "pristup", dokument = "dokument", vlastnosti = "vlastnosti", JePodana = "JePodana", JeEvidovana = "JeEvidovana", JeSchvalena = "JeSchvalena", JeZauctovana = "JeZauctovana", JeUzavrena = "JeUzavrena", JeStornovana = "JeStornovana", JeVJineAgende = "JeVJineAgende", Permissions = "Permissions", PrimaryKey = "PrimaryKey", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GSoupiskaDtoFragments { ixp = "Base", lic = "Base", ico = "Base", ucs = "Base", nks = "Base", uus = "Base", typ_ag = "Base", rok = "Base", eko_akt = "Extended", ixp_den = "Base", ac = "Base", ac_ag = "Base", ixs_fun_akt = "Base", ktg_typ = "Base", ixs_typ = "Base", c_soup = "Base", dat_evid = "Base", dat_sch = "Base", s_soup = "Base", popis = "Base", priz_pov_uct_jedn = "Extended", priz_pov_uct_hrom = "Extended", priz_pov_uct_kum = "Extended", priz_aut_poc_c = "Extended", priz_ne_akt_op_fuc = "Extended", priz_view = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixp_den_txt = "kniha", ixs_typ_txt = "typ_dokladu", pocet_pohybu = "pocet_pohybu", ixs_huf = "historie_uctovani", stav_sda = "stav_sda", s_soup_txt = "stav", zkr_ag = "agenda", ktg_typ_txt = "kategorie_dokladu", priz_pov_uct_jedn_txt = "priz_pov_uct_jedn_txt", priz_pov_uct_hrom_txt = "priz_pov_uct_hrom_txt", priz_pov_uct_kum_txt = "priz_pov_uct_kum_txt", priz_aut_poc_c_txt = "priz_aut_poc_c_txt", priz_ne_akt_op_fuc_txt = "priz_ne_akt_op_fuc_txt", vlastnik = "vlastnik", pristup = "pristup", dokument = "dokument", vlastnosti = "vlastnosti", JePodana = "*", JeEvidovana = "*", JeSchvalena = "*", JeZauctovana = "*", JeUzavrena = "*", JeStornovana = "*", JeVJineAgende = "*", Permissions = "Permissions", PrimaryKey = "*", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GSoupiskaDtoTypes { ixp = "string", lic = "string", ico = "string", ucs = "string", nks = "string", uus = "string", typ_ag = "number", rok = "number", eko_akt = "number", ixp_den = "string", ac = "string", ac_ag = "string", ixs_fun_akt = "string", ktg_typ = "number", ixs_typ = "string", c_soup = "JsonDecimal", dat_evid = "JsonDate", dat_sch = "JsonDate", s_soup = "number", popis = "string", priz_pov_uct_jedn = "boolean", priz_pov_uct_hrom = "boolean", priz_pov_uct_kum = "boolean", priz_aut_poc_c = "boolean", priz_ne_akt_op_fuc = "boolean", priz_view = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den_txt = "string", ixs_typ_txt = "string", pocet_pohybu = "number", ixs_huf = "string", stav_sda = "number", s_soup_txt = "string", zkr_ag = "string", ktg_typ_txt = "string", priz_pov_uct_jedn_txt = "string", priz_pov_uct_hrom_txt = "string", priz_pov_uct_kum_txt = "string", priz_aut_poc_c_txt = "string", priz_ne_akt_op_fuc_txt = "string", vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", pristup = "Gordic.Wfl.Interface.GWflPristupInfo", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", JePodana = "boolean", JeEvidovana = "boolean", JeSchvalena = "boolean", JeZauctovana = "boolean", JeUzavrena = "boolean", JeStornovana = "boolean", JeVJineAgende = "boolean", Permissions = "Gordic.Fuc.Interface.GSoupiskaPermission", PrimaryKey = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GSoupiskaDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, nks = 12, uus = 10, ixp_den = 12, ac = 30, ac_ag = 30, ixs_fun_akt = 12, ixs_typ = 12, popis = 254, zmenu_prov = 12, ixp_den_txt = 50, ixs_typ_txt = 50, ixs_huf = 12, s_soup_txt = 50, zkr_ag = 3, ktg_typ_txt = 50, duct_txt_err = 254,}
	/**Primární klíč soupisky*/
	interface GSoupiskaPkDto {
		/**PID soupisky*/
		ixp?: string|null;
	}
	const enum GSoupiskaPkDtoNames { ixp = "ixp",}
	const enum GSoupiskaPkDtoFragments { ixp = "*",}
	const enum GSoupiskaPkDtoTypes { ixp = "string",}
	const enum GSoupiskaPkDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\Soupiska\Dto\Gordic.Fuc.Interface.GSoupiskaFilterDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Filtr seznamu soupisek*/
	interface GSoupiskaFilterDto {
		/**PID knihy soupisek*/
		ixp_den?: string|null;
		/**rok knih soupisek (pro všechny knihy roku)*/
		rok_den?: number|null;
		/**kategorie knih soupisek*/
		ktg_den?: number|null;
		/**identifikátor*/
		ixp?: GBaseFilter<string>|null;
		/**evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**stav soupisky*/
		s_soup?: GBaseFilter<number>|null;
		/**částka soupisky*/
		c_soup?: GIntervalDto<JsonDecimal>|null;
		/**kategorie typu dokladu*/
		ktg_typ?: GBaseFilter<number>|null;
		/**typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**datum evidence*/
		dat_evid?: GIntervalDto<JsonDate>|null;
		/**datum schválení*/
		dat_sch?: GIntervalDto<JsonDate>|null;
		/**vlastník*/
		ixs_fun_akt?: string|null;
		/**typ agendy*/
		typ_ag?: GBaseFilter<number>|null;
		/**období*/
		rok?: number|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**popis*/
		popis?: GBaseFilter<string>|null;
		/**id historie*/
		huf_ixs_huf?: GBaseFilter<string>|null;
		/**bez právě účtovaných pohybů (bez právě účtovaných soupisek)*/
		huf_neuctovane?: GBaseFilter<boolean>|null;
		/**existence v tabulce fucduct*/
		duct_ano?: number|null;
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck?: number|null;
		/**IKC v tabulce fucduct*/
		duct_ikc?: Gordic.General.GIkc|null;
		/**klíčová slova*/
		wfl_kl_slovo?: GBaseFilter<string>|null;
		/**rozšiřující vlastnosti*/
		vlastnosti_r?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**popisné vlastnosti*/
		vlastnosti_s?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis?: GBaseFilter<string>|null;
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis?: GBaseFilter<number>|null;
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt?: GBaseFilter<string>|null;
		dokument_nazev?: GBaseFilter<string>|null;
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka?: GBaseFilter<string>|null;
		dokument_stav_dist?: GBaseFilter<number>|null;
		/**(písemnosti)*/
		dokument_stav_pis?: GBaseFilter<number>|null;
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij?: GBaseFilter<number>|null;
		/**profil SSL pro tento dokument*/
		dokument_s_ssl?: GBaseFilter<number>|null;
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena?: GIntervalDto<JsonDate>|null;
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov?: GBaseFilter<string>|null;
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele?: GBaseFilter<number>|null;
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz?: GBaseFilter<number>|null;
		/**Barva*/
		dokument_uzo?: GBaseFilter<string>|null;
		/**plánu*/
		dokument_spis_pl?: GBaseFilter<string>|null;
		/**spisového znaku*/
		dokument_spis_znak?: GBaseFilter<string>|null;
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl?: GBaseFilter<string>|null;
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl?: GBaseFilter<string>|null;
		dokument_dat_vyriz?: GIntervalDto<JsonDate>|null;
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval?: GBaseFilter<number>|null;
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak?: GBaseFilter<string>|null;
		/**oproti spisovému znaku*/
		dokument_skar_lhuta?: GBaseFilter<number>|null;
		/**události*/
		dokument_rok_spo_uda?: GBaseFilter<number>|null;
		/**skartace dokumentu*/
		dokument_rok_skartace?: GBaseFilter<number>|null;
		dokument_poc_listu?: GBaseFilter<string>|null;
		/**dokumentu*/
		dokument_poc_stran?: GBaseFilter<number>|null;
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop?: GBaseFilter<number>|null;
		/**dokumentu*/
		dokument_poc_priloh?: GBaseFilter<number>|null;
		/**příloh*/
		dokument_poc_l_priloh?: GBaseFilter<string>|null;
		/**pro zobrazení v seznamech*/
		dokument_cj?: GBaseFilter<string>|null;
		/**existuje profil čísla jednacího*/
		dokument_priz_cj?: GBaseFilter<number>|null;
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku?: GBaseFilter<number>|null;
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup?: GBaseFilter<string>|null;
		/**skartační operace*/
		dokument_PrizPozSkar?: GBaseFilter<number>|null;
		/**IČO NKS (na serveru se nezpracovává)*/
		ignore_ico_nks?: GBaseFilter<string>|null;
		/**IČO UUS (na serveru se nezpracovává)*/
		ignore_ico_uus?: GBaseFilter<string>|null;
		/**UCS UUS (na serveru se nezpracovává)*/
		ignore_ucs_uus?: GBaseFilter<string>|null;
	}
	const enum GSoupiskaFilterDtoNames { ixp_den = "ixp_den", rok_den = "rok_den", ktg_den = "ktg_den", ixp = "ixp", ac = "ac", ac_ag = "ac_ag", s_soup = "s_soup", c_soup = "c_soup", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_evid = "dat_evid", dat_sch = "dat_sch", ixs_fun_akt = "ixs_fun_akt", typ_ag = "typ_ag", rok = "rok", nks = "nks", uus = "uus", popis = "popis", huf_ixs_huf = "huf_ixs_huf", huf_neuctovane = "huf_neuctovane", duct_ano = "duct_ano", duct_uncheck = "duct_uncheck", duct_ikc = "duct_ikc", wfl_kl_slovo = "wfl_kl_slovo", vlastnosti_r = "vlastnosti_r", vlastnosti_s = "vlastnosti_s", dokument_ixp_spis = "dokument_ixp_spis", dokument_priz_spis = "dokument_priz_spis", dokument_ixs_su_akt = "dokument_ixs_su_akt", dokument_nazev = "dokument_nazev", dokument_akt_znacka = "dokument_akt_znacka", dokument_stav_dist = "dokument_stav_dist", dokument_stav_pis = "dokument_stav_pis", dokument_s_prij = "dokument_s_prij", dokument_s_ssl = "dokument_s_ssl", dokument_dat_zmena = "dokument_dat_zmena", dokument_zmenu_prov = "dokument_zmenu_prov", dokument_s_ele = "dokument_s_ele", dokument_s_fyz = "dokument_s_fyz", dokument_uzo = "dokument_uzo", dokument_spis_pl = "dokument_spis_pl", dokument_spis_znak = "dokument_spis_znak", dokument_ixs_fun_wfl = "dokument_ixs_fun_wfl", dokument_ixs_su_wfl = "dokument_ixs_su_wfl", dokument_dat_vyriz = "dokument_dat_vyriz", dokument_s_schval = "dokument_s_schval", dokument_skar_znak = "dokument_skar_znak", dokument_skar_lhuta = "dokument_skar_lhuta", dokument_rok_spo_uda = "dokument_rok_spo_uda", dokument_rok_skartace = "dokument_rok_skartace", dokument_poc_listu = "dokument_poc_listu", dokument_poc_stran = "dokument_poc_stran", dokument_poc_kop = "dokument_poc_kop", dokument_poc_priloh = "dokument_poc_priloh", dokument_poc_l_priloh = "dokument_poc_l_priloh", dokument_cj = "dokument_cj", dokument_priz_cj = "dokument_priz_cj", dokument_PrizVBaliku = "dokument_PrizVBaliku", dokument_ixs_zup = "dokument_ixs_zup", dokument_PrizPozSkar = "dokument_PrizPozSkar", ignore_ico_nks = "ignore_ico_nks", ignore_ico_uus = "ignore_ico_uus", ignore_ucs_uus = "ignore_ucs_uus",}
	const enum GSoupiskaFilterDtoFragments { ixp_den = "*", rok_den = "*", ktg_den = "*", ixp = "*", ac = "*", ac_ag = "*", s_soup = "*", c_soup = "*", ktg_typ = "*", ixs_typ = "*", dat_evid = "*", dat_sch = "*", ixs_fun_akt = "*", typ_ag = "*", rok = "*", nks = "*", uus = "*", popis = "*", huf_ixs_huf = "*", huf_neuctovane = "*", duct_ano = "*", duct_uncheck = "*", duct_ikc = "*", wfl_kl_slovo = "*", vlastnosti_r = "*", vlastnosti_s = "*", dokument_ixp_spis = "*", dokument_priz_spis = "*", dokument_ixs_su_akt = "*", dokument_nazev = "*", dokument_akt_znacka = "*", dokument_stav_dist = "*", dokument_stav_pis = "*", dokument_s_prij = "*", dokument_s_ssl = "*", dokument_dat_zmena = "*", dokument_zmenu_prov = "*", dokument_s_ele = "*", dokument_s_fyz = "*", dokument_uzo = "*", dokument_spis_pl = "*", dokument_spis_znak = "*", dokument_ixs_fun_wfl = "*", dokument_ixs_su_wfl = "*", dokument_dat_vyriz = "*", dokument_s_schval = "*", dokument_skar_znak = "*", dokument_skar_lhuta = "*", dokument_rok_spo_uda = "*", dokument_rok_skartace = "*", dokument_poc_listu = "*", dokument_poc_stran = "*", dokument_poc_kop = "*", dokument_poc_priloh = "*", dokument_poc_l_priloh = "*", dokument_cj = "*", dokument_priz_cj = "*", dokument_PrizVBaliku = "*", dokument_ixs_zup = "*", dokument_PrizPozSkar = "*", ignore_ico_nks = "*", ignore_ico_uus = "*", ignore_ucs_uus = "*",}
	const enum GSoupiskaFilterDtoTypes { ixp_den = "string", rok_den = "number", ktg_den = "number", ixp = "GBaseFilter<string>", ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", s_soup = "GBaseFilter<number>", c_soup = "GIntervalDto<JsonDecimal>", ktg_typ = "GBaseFilter<number>", ixs_typ = "GBaseFilter<string>", dat_evid = "GIntervalDto<JsonDate>", dat_sch = "GIntervalDto<JsonDate>", ixs_fun_akt = "string", typ_ag = "GBaseFilter<number>", rok = "number", nks = "string", uus = "string", popis = "GBaseFilter<string>", huf_ixs_huf = "GBaseFilter<string>", huf_neuctovane = "GBaseFilter<boolean>", duct_ano = "number", duct_uncheck = "number", duct_ikc = "Gordic.General.GIkc", wfl_kl_slovo = "GBaseFilter<string>", vlastnosti_r = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", vlastnosti_s = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", dokument_ixp_spis = "GBaseFilter<string>", dokument_priz_spis = "GBaseFilter<number>", dokument_ixs_su_akt = "GBaseFilter<string>", dokument_nazev = "GBaseFilter<string>", dokument_akt_znacka = "GBaseFilter<string>", dokument_stav_dist = "GBaseFilter<number>", dokument_stav_pis = "GBaseFilter<number>", dokument_s_prij = "GBaseFilter<number>", dokument_s_ssl = "GBaseFilter<number>", dokument_dat_zmena = "GIntervalDto<JsonDate>", dokument_zmenu_prov = "GBaseFilter<string>", dokument_s_ele = "GBaseFilter<number>", dokument_s_fyz = "GBaseFilter<number>", dokument_uzo = "GBaseFilter<string>", dokument_spis_pl = "GBaseFilter<string>", dokument_spis_znak = "GBaseFilter<string>", dokument_ixs_fun_wfl = "GBaseFilter<string>", dokument_ixs_su_wfl = "GBaseFilter<string>", dokument_dat_vyriz = "GIntervalDto<JsonDate>", dokument_s_schval = "GBaseFilter<number>", dokument_skar_znak = "GBaseFilter<string>", dokument_skar_lhuta = "GBaseFilter<number>", dokument_rok_spo_uda = "GBaseFilter<number>", dokument_rok_skartace = "GBaseFilter<number>", dokument_poc_listu = "GBaseFilter<string>", dokument_poc_stran = "GBaseFilter<number>", dokument_poc_kop = "GBaseFilter<number>", dokument_poc_priloh = "GBaseFilter<number>", dokument_poc_l_priloh = "GBaseFilter<string>", dokument_cj = "GBaseFilter<string>", dokument_priz_cj = "GBaseFilter<number>", dokument_PrizVBaliku = "GBaseFilter<number>", dokument_ixs_zup = "GBaseFilter<string>", dokument_PrizPozSkar = "GBaseFilter<number>", ignore_ico_nks = "GBaseFilter<string>", ignore_ico_uus = "GBaseFilter<string>", ignore_ucs_uus = "GBaseFilter<string>",}
	const enum GSoupiskaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\ZapoctovyList\Gordic.Fuc.Interface.IGZapoctovyList.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Zápočtové listy
	* @domain FinUctarna
	*/
	interface ZapoctovyList {
		/**Načte detail zápočtového listu*/
		read(rq?:Gordic.Fuc.Interface.GZapoctovyListDto|CallParams<GServiceReadRequest<Gordic.Fuc.Interface.GZapoctovyListDto>>): _Task<GServiceReadRequest<Gordic.Fuc.Interface.GZapoctovyListDto>,GServiceReadResponse<Gordic.Fuc.Interface.GZapoctovyListDto>>;
		/**Načte seznam zápočtových listů*/
		list(rq?:Gordic.Fuc.Interface.GZapoctovyListFilterDto|CallParams<GServiceListRequestWithOrder<Gordic.Fuc.Interface.GZapoctovyListOrderBy>>): _Task<GServiceListRequestWithOrder<Gordic.Fuc.Interface.GZapoctovyListOrderBy>,GServiceListResponse<Gordic.Fuc.Interface.GZapoctovyListDto>>;
		/**Zjistí počet zápočtových listů*/
		listCount(rq?:Gordic.Fuc.Interface.GZapoctovyListFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Zjistí počet zápočtových listů ke schválení za zadané knihy (ve filtrech))*/
		listCountsKeSchvaleni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,Gordic.Fuc.Interface.GPocetZaKnihyDto[]>;
		/**Podání zápočtového listu*/
		create(rq?:Gordic.Fuc.Interface.GZapoctovyListDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GZapoctovyListDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GZapoctovyListDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Evidence (uložení) zápočtového listu*/
		update(rq?:Gordic.Fuc.Interface.GZapoctovyListDto|CallParams<GServiceSaveRequest<Gordic.Fuc.Interface.GZapoctovyListDto>>): _Task<GServiceSaveRequest<Gordic.Fuc.Interface.GZapoctovyListDto>,GServiceSaveResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola předaných zápočtových listů před stornem / zrušením storna*/
		zkontrolujPredStornem(rq?:Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Storno / zrušení storna zápočtového listu*/
		stornuj(rq?:Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné storno / zrušení storna předaných zápočtových listů*/
		hromadneStornuj(rq?:Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Fuc.Interface.GZapoctovyListStornoOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před schválením / zrušením schválení*/
		zkontrolujPredSchvalenim(rq?:Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Schváleni / zrušení schválení zápočtového listu*/
		schval(rq?:Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné schváleni / zrušení schválení předaných zápočtových listů*/
		hromadneSchval(rq?:Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před uzavřením / zrušením uzavření*/
		zkontrolujPredUzavrenim(rq?:Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Uzavření / zrušení uzavření zápočtového listu*/
		uzavri(rq?:Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné uzavření / zrušení uzavření zápočtových listů (podle fucduct)*/
		hromadneUzavri(rq?:Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListUzavreniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před předáním*/
		zkontrolujPredPredanim(rq?:Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Předání zápočtového listu*/
		predej(rq?:Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné předání zápočtových listů*/
		hromadnePredej(rq?:Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPredaniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před převzetím*/
		zkontrolujPredPrevzetim(rq?:Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Převzetí zápočtového listu*/
		prevezmi(rq?:Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné převzetí zápočtových listů*/
		hromadnePrevezmi(rq?:Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před přidělením*/
		zkontrolujPredPridelenim(rq?:Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Přidělení zápočtového listu*/
		pridel(rq?:Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné přidělení zápočtových listů*/
		hromadnePridel(rq?:Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPrideleniOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před přeevidováním*/
		zkontrolujPredPreevidovanim(rq?:Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Přeevidování zápočtového listu*/
		preeviduj(rq?:Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné přeevidování zápočtových listů*/
		hromadnePreeviduj(rq?:Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Kontrola zápočtových listů před vrácením do WFL*/
		zkontrolujPredVracenimDoWfl(rq?:Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Vrácení zápočtového listu do WFL*/
		vratDoWfl(rq?:Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Hromadné vrácení zápočtových listů do WFL*/
		hromadneVratDoWfl(rq?:Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GZapoctovyListVraceniDoWflOperationDto>,GServiceGroupResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Načte seznam závazků nebo pohledávek pro přidání na zápočtový list*/
		listNovychPolozek(rq?:CallParams<{ixp:string,zavazky:boolean,ixpDen:string,ixsEko:string}>): _Task<{ixp:string,zavazky:boolean,ixpDen:string,ixsEko:string},GServiceListResponse<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuDto>>;
		/**Vložení položky na zápočtový list*/
		createPolozky(rq?:Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Oprava položky zápočtového listu*/
		updatePolozky(rq?:Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Odstranění položky zápočtového listu*/
		deletePolozky(rq?:Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto|CallParams<GServiceActionRequest<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto>>): _Task<GServiceActionRequest<Gordic.Fuc.Interface.GPolozkaZapoctovehoListuOperationDto>,GServiceActionResponse<Gordic.Fuc.Interface.GZapoctovyListPkDto>>;
		/**Zjištění minimální a maximální částky položky*/
		zjistiMinMaxCastkuPolozky(rq?:CallParams<{ixp:string,radekPol:number,subradek:number,radekAV:number}>): _Task<{ixp:string,radekPol:number,subradek:number,radekAV:number},object>;
		/**Kontrola na první doklad v knize*/
		zkontrolujNaPrvniDokladVKnize(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**Zjištění omezení typu dokumentu na knihu*/
		zjistiOmezeniNaIxsTyp(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},boolean>;
		/**Vrátí oprávnění zápočtových listů (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Fuc.Interface.GZapoctovyListServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZapoctovyList: ServiceBase & Catalog.ZapoctovyList;
	}
	const ZapoctovyList: Client["ZapoctovyList"];
}
declare namespace Gordic.Fuc.Interface {
	/**Oprávnění pro jeden zápočtový list*/
	interface GZapoctovyListPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit (přejít do editačního módu)*/
		LzeOpravit: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vrátit do WFL*/
		LzeVratitDoWfl: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout (návrh nebo oznámení)*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit diagnostiku*/
		LzeDiagnostika: Gordic.General.ApplicationInterface.GPermission;
		/**lze vložit nový závazek*/
		LzeVlozitNovyZavazek: Gordic.General.ApplicationInterface.GPermission;
		/**lze vložit novou pohledávku*/
		LzeVlozitNovouPohledavku: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GZapoctovyListPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeOpravit = "LzeOpravit", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout", LzeDiagnostika = "LzeDiagnostika", LzeVlozitNovyZavazek = "LzeVlozitNovyZavazek", LzeVlozitNovouPohledavku = "LzeVlozitNovouPohledavku",}
	const enum GZapoctovyListPermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeOpravit = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*", LzeDiagnostika = "*", LzeVlozitNovyZavazek = "*", LzeVlozitNovouPohledavku = "*",}
	const enum GZapoctovyListPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeOpravit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeDiagnostika = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitNovyZavazek = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitNovouPohledavku = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GZapoctovyListPermissionTypeLengths {}
	/**Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
	interface GZapoctovyListPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GZapoctovyListPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GZapoctovyListPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GZapoctovyListPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GZapoctovyListPermissionRequiredFragmentsTypeLengths {}
	/**Oprávnění pro jednu položku zápočtového listu*/
	interface GPolozkaZapoctovehoListuPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze opravit položku (přejít do editačního módu)*/
		LzeOpravitPolozku: Gordic.General.ApplicationInterface.GPermission;
		/**lze odstranit položku*/
		LzeOdstranitPolozku: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPolozkaZapoctovehoListuPermissionNames { LzeOpravitPolozku = "LzeOpravitPolozku", LzeOdstranitPolozku = "LzeOdstranitPolozku",}
	const enum GPolozkaZapoctovehoListuPermissionFragments { LzeOpravitPolozku = "*", LzeOdstranitPolozku = "*",}
	const enum GPolozkaZapoctovehoListuPermissionTypes { LzeOpravitPolozku = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitPolozku = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPolozkaZapoctovehoListuPermissionTypeLengths {}
	/**Oprávnění pro práci nad zápočtovými listy*/
	interface GZapoctovyListServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze opravit (přejít do editačního módu)*/
		LzeOpravit: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vrátit do WFL*/
		LzeVratitDoWfl: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout (návrh nebo oznámení)*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GZapoctovyListServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeOpravit = "LzeOpravit", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout",}
	const enum GZapoctovyListServicePermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeOpravit = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*",}
	const enum GZapoctovyListServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeOpravit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GZapoctovyListServicePermissionTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu zápočtových listů*/
	const enum GZapoctovyListFilter {
		/**PID knihy zápočtových listů*/
		ixp_den,
		/**rok knih zápočtových listů (pro všechny knihy roku)*/
		rok_den,
		/**kategorie knih zápočtových listů*/
		ktg_den,
		/**PID zápočtového listu*/
		ixp,
		/**aktuální funkce*/
		ixs_fun_akt,
		/**stav*/
		s_bvy,
		/**popis*/
		popis,
		/**agendové číslo*/
		ac_ag,
		/**evidenční číslo*/
		ac,
		/**kategorie typu dokladu*/
		ktg_typ,
		/**typ dokladu*/
		ixs_typ,
		/**PID externího subjektu*/
		ixs_esu,
		/**datum evidence*/
		dat_evid,
		/**datum UÚP*/
		dat_nov_zus,
		/**celková kompenzace - závazky*/
		obr_deb,
		/**celková kompenzace - pohledávky*/
		obr_kre,
		/**variabilní symbol*/
		pol_vs,
		/**konstantní symbol*/
		pol_ks,
		/**specifický symbol*/
		pol_ss,
		/**existence v tabulce fucduct*/
		duct_ano,
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck,
		/**IKC v tabulce fucduct*/
		duct_ikc,
		/**klíčová slova*/
		wfl_kl_slovo,
		/**rozšířující vlastnosti*/
		vlastnosti_r,
		/**popisné vlastnosti*/
		vlastnosti_s,
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis,
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis,
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt,
		dokument_nazev,
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka,
		dokument_stav_dist,
		/**(písemnosti)*/
		dokument_stav_pis,
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij,
		/**profil SSL pro tento dokument*/
		dokument_s_ssl,
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena,
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov,
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele,
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz,
		/**Barva*/
		dokument_uzo,
		/**plánu*/
		dokument_spis_pl,
		/**spisového znaku*/
		dokument_spis_znak,
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl,
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl,
		dokument_dat_vyriz,
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval,
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak,
		/**oproti spisovému znaku*/
		dokument_skar_lhuta,
		/**události*/
		dokument_rok_spo_uda,
		/**skartace dokumentu*/
		dokument_rok_skartace,
		dokument_poc_listu,
		/**dokumentu*/
		dokument_poc_stran,
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop,
		/**dokumentu*/
		dokument_poc_priloh,
		/**příloh*/
		dokument_poc_l_priloh,
		/**pro zobrazení v seznamech*/
		dokument_cj,
		/**existuje profil čísla jednacího*/
		dokument_priz_cj,
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku,
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup,
		/**skartační operace*/
		dokument_PrizPozSkar,
		/**pomocná vazba na tabulku fucduct místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_duct,
	}
	/**Výčet sloupců pro řazení*/
	const enum GZapoctovyListOrderBy {
		/**datum poslední změny*/
		dat_zmena,
	}
	/**Parametry storna / zrušení storna zápočtových listů*/
	interface GZapoctovyListStornoOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GZapoctovyListStornoOperationDtoNames { stornovat = "stornovat", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListStornoOperationDtoFragments { stornovat = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListStornoOperationDtoTypes { stornovat = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListStornoOperationDtoTypeLengths {}
	/**Parametry schválení / zrušení schválení zápočtových listů*/
	interface GZapoctovyListSchvaleniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = schválení, false = zrušení schválení)*/
		schvalit?: boolean|null;
	}
	const enum GZapoctovyListSchvaleniOperationDtoNames { schvalit = "schvalit", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListSchvaleniOperationDtoFragments { schvalit = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListSchvaleniOperationDtoTypes { schvalit = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListSchvaleniOperationDtoTypeLengths {}
	/**Parametry uzavření / zrušení uzavření zápočtových listů*/
	interface GZapoctovyListUzavreniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = uzavření, false = zrušení uzavření)*/
		uzavrit?: boolean|null;
	}
	const enum GZapoctovyListUzavreniOperationDtoNames { uzavrit = "uzavrit", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListUzavreniOperationDtoFragments { uzavrit = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListUzavreniOperationDtoTypes { uzavrit = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListUzavreniOperationDtoTypeLengths {}
	/**Parametry vložení/změny/odstranění položky zápočtového listu*/
	interface GPolozkaZapoctovehoListuOperationDto {
		/**PID zápočtového listu*/
		ixp?: string|null;
		/**datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**položka*/
		polozka?: Gordic.Fuc.Interface.GPolozkaZapoctovehoListuDto|null;
	}
	const enum GPolozkaZapoctovehoListuOperationDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", polozka = "polozka",}
	const enum GPolozkaZapoctovehoListuOperationDtoFragments { ixp = "*", dat_zmena = "*", polozka = "*",}
	const enum GPolozkaZapoctovehoListuOperationDtoTypes { ixp = "string", dat_zmena = "JsonDate", polozka = "Gordic.Fuc.Interface.GPolozkaZapoctovehoListuDto",}
	const enum GPolozkaZapoctovehoListuOperationDtoTypeLengths {}
	/**Parametry předání zápočtových listů*/
	interface GZapoctovyListPredaniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = předat)*/
		predat?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GZapoctovyListPredaniOperationDtoNames { predat = "predat", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListPredaniOperationDtoFragments { predat = "*", ixs_su = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListPredaniOperationDtoTypes { predat = "boolean", ixs_su = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListPredaniOperationDtoTypeLengths {}
	/**Parametry převzetí zápočtových listů*/
	interface GZapoctovyListPrevzetiOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = převzít)*/
		prevzit?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GZapoctovyListPrevzetiOperationDtoNames { prevzit = "prevzit", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListPrevzetiOperationDtoFragments { prevzit = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListPrevzetiOperationDtoTypes { prevzit = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListPrevzetiOperationDtoTypeLengths {}
	/**Parametry přidělení zápočtových listů*/
	interface GZapoctovyListPrideleniOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = přidělit)*/
		pridelit?: boolean|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GZapoctovyListPrideleniOperationDtoNames { pridelit = "pridelit", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListPrideleniOperationDtoFragments { pridelit = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListPrideleniOperationDtoTypes { pridelit = "boolean", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListPrideleniOperationDtoTypeLengths {}
	/**Parametry přeevidence zápočtových listů*/
	interface GZapoctovyListPreevidenceOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = přidělit)*/
		preevidovat?: boolean|null;
		/**kniha*/
		ixp_den?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GZapoctovyListPreevidenceOperationDtoNames { preevidovat = "preevidovat", ixp_den = "ixp_den", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListPreevidenceOperationDtoFragments { preevidovat = "*", ixp_den = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListPreevidenceOperationDtoTypes { preevidovat = "boolean", ixp_den = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListPreevidenceOperationDtoTypeLengths {}
	/**Parametry vrácení zápočtových listů do WFL*/
	interface GZapoctovyListVraceniDoWflOperationDto extends Gordic.Fuc.Interface.GFucOperationDto<Gordic.Fuc.Interface.GZapoctovyListDto> {
		/**požadovaná operace (true = vrátit)*/
		vratit?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GZapoctovyListVraceniDoWflOperationDtoNames { vratit = "vratit", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GZapoctovyListVraceniDoWflOperationDtoFragments { vratit = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GZapoctovyListVraceniDoWflOperationDtoTypes { vratit = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Fuc.Interface.GZapoctovyListDto[]",}
	const enum GZapoctovyListVraceniDoWflOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\ZapoctovyList\Dto\Gordic.Fuc.Interface.GZapoctovyListDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Zápočtový list*/
	interface GZapoctovyListDto extends Gordic.Fuc.Interface.GFucSeznamDuctWflDto {
		/**PID zápočtového listu*/
		ixp?: string|null;
		/**stav*/
		s_bvy?: number|null;
		/**agendové číslo*/
		ac_ag?: string|null;
		/**evidenční číslo*/
		ac?: string|null;
		/**externí subjekt*/
		ixs_esu?: string|null;
		/**externí subjekt (ekonomicky svázaný)*/
		ixs_eko?: string|null;
		/**kompenzováno závazků*/
		obr_deb?: JsonDecimal|null;
		/**kompenzováno pohledávek*/
		obr_kre?: JsonDecimal|null;
		/**rok*/
		rok_pid?: number|null;
		/**datum uskutečnění účetního případu*/
		dat_nov_zus?: JsonDate|null;
		/**datum evidence*/
		dat_evid?: JsonDate|null;
		/**kategorie typu dokladu*/
		ktg_typ?: number|null;
		/**typ dokladu*/
		ixs_typ?: string|null;
		/**vlastní účet - číslo účtu*/
		bu_vl?: string|null;
		/**vlastní účet - směrový kód banky*/
		sk_vl?: string|null;
		/**částka debet*/
		c_deb?: JsonDecimal|null;
		/**částka kredit*/
		c_kre?: JsonDecimal|null;
		/**částka limit*/
		c_limit?: JsonDecimal|null;
		/**typ položek*/
		typ_pol?: number|null;
		/**příznak nepřečteného záznamu*/
		priz_view?: number|null;
		/**poslední datum změny*/
		dat_zmena?: JsonDate|null;
		/**změnu provedl*/
		zmenu_prov?: string|null;
		/**aktuální funkce (vlastník)*/
		ixs_fun_akt?: string|null;
		/**popis*/
		popis?: string|null;
		/**kniha*/
		ixp_den?: string|null;
		/**počet položek*/
		pocet_polozek?: number|null;
		/**pole položek zápočtového listu*/
		polozky?: Gordic.Fuc.Interface.GPolozkaZapoctovehoListuDto[]|null;
		/**je zápočtový list odlitý? (0 = ne, >0 = ano)*/
		priz_xx?: number|null;
		/**název knihy*/
		ixp_den_txt?: string|null;
		/**stav zpracování v agendě*/
		stav_sda?: number|null;
		/**název stavu*/
		s_bvy_zl_txt?: string|null;
		/**název kategorie typu dokladu*/
		ktg_typ_txt?: string|null;
		/**název typu dokladu*/
		ixs_typ_txt?: string|null;
		/**název typu položek*/
		typ_pol_txt?: string|null;
		/**složený vlastní bú*/
		bu_vl_txt?: string|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_akt)*/
		vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**přístup k dokumentu*/
		pristup?: Gordic.Wfl.Interface.GWflPristupInfo|null;
		/**navigační vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**navigační vlastnost pro subjekt (ixs_esu)*/
		subjekt?: Gordic.Fuc.Interface.GExterniSubjektDto|null;
		/**navigační vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Je zápočtový list jednostranný?*/
		readonly JeJednostranny?: boolean|null;
		/**Je zápočtový list na závazky?*/
		readonly JeNaZavazky?: boolean|null;
		/**Je zápočtový list na pohledávky?*/
		readonly JeNaPohledavky?: boolean|null;
		/**Je zápočtový list podaný?*/
		readonly JePodany?: boolean|null;
		/**Je zápočtový list evidovaný?*/
		readonly JeEvidovany?: boolean|null;
		/**Je zápočtový list schválený?*/
		readonly JeSchvaleny?: boolean|null;
		/**Je zápočtový list spárovaný?*/
		readonly JeSparovany?: boolean|null;
		/**Je zápočtový list uzavřený?*/
		readonly JeUzavreny?: boolean|null;
		/**Je zápočtový list stornovaný?*/
		readonly JeStornovany?: boolean|null;
		/**Je zápočtový list veden v jiné agendě?*/
		readonly JeVJineAgende?: boolean|null;
		/**Je zápočtový list bez položek?*/
		readonly BezPolozek?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GZapoctovyListPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GZapoctovyListDtoNames { ixp = "ixp", s_bvy = "s_bvy", ac_ag = "ac_ag", ac = "ac", ixs_esu = "ixs_esu", ixs_eko = "ixs_eko", obr_deb = "obr_deb", obr_kre = "obr_kre", rok_pid = "rok_pid", dat_nov_zus = "dat_nov_zus", dat_evid = "dat_evid", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", bu_vl = "bu_vl", sk_vl = "sk_vl", c_deb = "c_deb", c_kre = "c_kre", c_limit = "c_limit", typ_pol = "typ_pol", priz_view = "priz_view", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun_akt = "ixs_fun_akt", popis = "popis", ixp_den = "ixp_den", pocet_polozek = "pocet_polozek", polozky = "polozky", priz_xx = "priz_xx", ixp_den_txt = "ixp_den_txt", stav_sda = "stav_sda", s_bvy_zl_txt = "s_bvy_zl_txt", ktg_typ_txt = "ktg_typ_txt", ixs_typ_txt = "ixs_typ_txt", typ_pol_txt = "typ_pol_txt", bu_vl_txt = "bu_vl_txt", vlastnik = "vlastnik", pristup = "pristup", dokument = "dokument", subjekt = "subjekt", vlastnosti = "vlastnosti", JeJednostranny = "JeJednostranny", JeNaZavazky = "JeNaZavazky", JeNaPohledavky = "JeNaPohledavky", JePodany = "JePodany", JeEvidovany = "JeEvidovany", JeSchvaleny = "JeSchvaleny", JeSparovany = "JeSparovany", JeUzavreny = "JeUzavreny", JeStornovany = "JeStornovany", JeVJineAgende = "JeVJineAgende", BezPolozek = "BezPolozek", Permissions = "Permissions", PrimaryKey = "PrimaryKey", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", duct_txt_err = "duct_txt_err", duct_uncheck = "duct_uncheck", duct_kind = "duct_kind", duct_check = "duct_check", IsChecked = "IsChecked", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GZapoctovyListDtoFragments { ixp = "Base", s_bvy = "Base", ac_ag = "Base", ac = "Base", ixs_esu = "Base", ixs_eko = "Extended", obr_deb = "Base", obr_kre = "Base", rok_pid = "Base", dat_nov_zus = "Base", dat_evid = "Base", ktg_typ = "Base", ixs_typ = "Base", bu_vl = "Base", sk_vl = "Base", c_deb = "Base", c_kre = "Base", c_limit = "Base", typ_pol = "Base", priz_view = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_fun_akt = "Base", popis = "Base", ixp_den = "Base", pocet_polozek = "pocet_polozek", polozky = "polozky", priz_xx = "Base", ixp_den_txt = "kniha", stav_sda = "stav_sda", s_bvy_zl_txt = "stav", ktg_typ_txt = "kategorie_dokladu", ixs_typ_txt = "typ_dokladu", typ_pol_txt = "Base", bu_vl_txt = "Base", vlastnik = "vlastnik", pristup = "pristup", dokument = "dokument", subjekt = "subjekt", vlastnosti = "vlastnosti", JeJednostranny = "*", JeNaZavazky = "*", JeNaPohledavky = "*", JePodany = "*", JeEvidovany = "*", JeSchvaleny = "*", JeSparovany = "*", JeUzavreny = "*", JeStornovany = "*", JeVJineAgende = "*", BezPolozek = "*", Permissions = "Permissions", PrimaryKey = "*", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", duct_txt_err = "duct", duct_uncheck = "duct", duct_kind = "*", duct_check = "*", IsChecked = "*", PrimaryKeyInFilters = "*",}
	const enum GZapoctovyListDtoTypes { ixp = "string", s_bvy = "number", ac_ag = "string", ac = "string", ixs_esu = "string", ixs_eko = "string", obr_deb = "JsonDecimal", obr_kre = "JsonDecimal", rok_pid = "number", dat_nov_zus = "JsonDate", dat_evid = "JsonDate", ktg_typ = "number", ixs_typ = "string", bu_vl = "string", sk_vl = "string", c_deb = "JsonDecimal", c_kre = "JsonDecimal", c_limit = "JsonDecimal", typ_pol = "number", priz_view = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun_akt = "string", popis = "string", ixp_den = "string", pocet_polozek = "number", polozky = "Gordic.Fuc.Interface.GPolozkaZapoctovehoListuDto[]", priz_xx = "number", ixp_den_txt = "string", stav_sda = "number", s_bvy_zl_txt = "string", ktg_typ_txt = "string", ixs_typ_txt = "string", typ_pol_txt = "string", bu_vl_txt = "string", vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", pristup = "Gordic.Wfl.Interface.GWflPristupInfo", dokument = "Gordic.Ssl.Interface.GDokumentDto", subjekt = "Gordic.Fuc.Interface.GExterniSubjektDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", JeJednostranny = "boolean", JeNaZavazky = "boolean", JeNaPohledavky = "boolean", JePodany = "boolean", JeEvidovany = "boolean", JeSchvaleny = "boolean", JeSparovany = "boolean", JeUzavreny = "boolean", JeStornovany = "boolean", JeVJineAgende = "boolean", BezPolozek = "boolean", Permissions = "Gordic.Fuc.Interface.GZapoctovyListPermission", PrimaryKey = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", duct_txt_err = "string", duct_uncheck = "number", duct_kind = "number", duct_check = "boolean", IsChecked = "boolean", PrimaryKeyInFilters = "string",}
	const enum GZapoctovyListDtoTypeLengths { ixp = 12, ac_ag = 20, ac = 20, ixs_esu = 12, ixs_eko = 12, ixs_typ = 12, bu_vl = 34, sk_vl = 11, zmenu_prov = 12, ixs_fun_akt = 12, popis = 254, ixp_den = 12, ixp_den_txt = 50, duct_txt_err = 254,}
	/**DTO pro GExterniSubjektDto*/
	interface GExterniSubjektDto {
		/**PID subjektu*/
		ixs_esu?: string|null;
		/**typ subjektu*/
		typ_esu?: number|null;
		/**PID ekonomické vazby*/
		ixs_eko?: string|null;
		/**IČO*/
		ico?: string|null;
		/**RČ*/
		rc?: string|null;
		/**název a adresa*/
		esu_txt?: string|null;
	}
	const enum GExterniSubjektDtoNames { ixs_esu = "ixs_esu", typ_esu = "typ_esu", ixs_eko = "ixs_eko", ico = "ico", rc = "rc", esu_txt = "esu_txt",}
	const enum GExterniSubjektDtoFragments { ixs_esu = "Base", typ_esu = "Base", ixs_eko = "Extended", ico = "ico", rc = "rc", esu_txt = "esu_txt",}
	const enum GExterniSubjektDtoTypes { ixs_esu = "string", typ_esu = "number", ixs_eko = "string", ico = "string", rc = "string", esu_txt = "string",}
	const enum GExterniSubjektDtoTypeLengths {}
	/**Položka zápočtového listu*/
	interface GPolozkaZapoctovehoListuDto {
		/**PID zápočtového listu*/
		ixp?: string|null;
		/**řádek položky*/
		radek_pol?: number|null;
		/**subřádek položky*/
		subradek?: number|null;
		/**řádek AV položky*/
		radek_av?: number|null;
		/**variabilní symbol*/
		vs?: string|null;
		/**konstantní symbol*/
		ks?: string|null;
		/**specifický symbol*/
		ss?: string|null;
		/**kompenzovaná částka*/
		c?: JsonDecimal|null;
		/**stav*/
		s_pol?: number|null;
		/**vlastní účet - číslo účtu*/
		bu_vl?: string|null;
		/**vlastní účet - směrový kód banky*/
		sk_vl?: string|null;
		/**napárovaný doklad*/
		ixp_par?: string|null;
		/**způsob úhrady*/
		zu?: number|null;
		/**typ agendy (na položce)*/
		typ_ag?: number|null;
		/**stav úhrady v agendě*/
		ag_s_uhrp?: number|null;
		/**kategorie typu dokladu v agendě*/
		ag_ktg_typ?: number|null;
		/**typ dokladu v agendě*/
		ag_ixs_typ?: string|null;
		/**kategorie pohybu v agendě*/
		ag_ktg_upo?: number|null;
		/**agendové číslo v agendě*/
		ag_ac_ag?: string|null;
		/**evidenční číslo v agendě*/
		ag_ac?: string|null;
		/**částka celkem v agendě*/
		ag_c_celk?: JsonDecimal|null;
		/**zůstatek v agendě*/
		ag_c_zust?: JsonDecimal|null;
		/**datum uskutečnění účetního případu v agendě*/
		ag_dat_uup?: JsonDate|null;
		/**typ agendy (skutečný)*/
		ag_typ_ag?: number|null;
		/**zkratka příznaku pohledávky/závazku*/
		priz_pz_zkr?: string|null;
		/**název příznaku pohledávky/závazku*/
		priz_pz_txt?: string|null;
		/**složený vlastní účet*/
		bu_vl_txt?: string|null;
		/**zkratka stavu položky*/
		s_pol_zkr?: string|null;
		/**název stavu položky*/
		s_pol_txt?: string|null;
		/**Název typu dokladu*/
		ag_ktg_typ_txt?: string|null;
		/**název stavu*/
		ag_s_uhrp_txt?: string|null;
		/**název kategorie pohybu*/
		ag_ktg_upo_txt?: string|null;
		/**zkratka typu agendy*/
		ag_zkr_ag?: string|null;
		/**název typu agendy*/
		ag_typ_ag_txt?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Fuc.Interface.GPolozkaZapoctovehoListuPermission|null;
	}
	const enum GPolozkaZapoctovehoListuDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", vs = "vs", ks = "ks", ss = "ss", c = "c", s_pol = "s_pol", bu_vl = "bu_vl", sk_vl = "sk_vl", ixp_par = "ixp_par", zu = "zu", typ_ag = "typ_ag", ag_s_uhrp = "ag_s_uhrp", ag_ktg_typ = "ag_ktg_typ", ag_ixs_typ = "ag_ixs_typ", ag_ktg_upo = "ag_ktg_upo", ag_ac_ag = "ag_ac_ag", ag_ac = "ag_ac", ag_c_celk = "ag_c_celk", ag_c_zust = "ag_c_zust", ag_dat_uup = "ag_dat_uup", ag_typ_ag = "ag_typ_ag", priz_pz_zkr = "priz_pz_zkr", priz_pz_txt = "priz_pz_txt", bu_vl_txt = "bu_vl_txt", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_txt", ag_ktg_typ_txt = "ag_ktg_typ_txt", ag_s_uhrp_txt = "ag_s_uhrp_txt", ag_ktg_upo_txt = "ag_ktg_upo_txt", ag_zkr_ag = "ag_zkr_ag", ag_typ_ag_txt = "ag_typ_ag_txt", Permissions = "Permissions",}
	const enum GPolozkaZapoctovehoListuDtoFragments { ixp = "Base", radek_pol = "Base", subradek = "Base", radek_av = "Base", vs = "Base", ks = "Base", ss = "Base", c = "Base", s_pol = "Base", bu_vl = "Base", sk_vl = "Base", ixp_par = "Base", zu = "Base", typ_ag = "Base", ag_s_uhrp = "maagendain", ag_ktg_typ = "agenda", ag_ixs_typ = "agenda", ag_ktg_upo = "agenda", ag_ac_ag = "agenda", ag_ac = "agenda", ag_c_celk = "agenda", ag_c_zust = "agenda", ag_dat_uup = "agenda", ag_typ_ag = "agenda", priz_pz_zkr = "priznak_pz", priz_pz_txt = "priznak_pz", bu_vl_txt = "Base", s_pol_zkr = "stav_polozky", s_pol_txt = "stav_polozky", ag_ktg_typ_txt = "agenda", ag_s_uhrp_txt = "agenda", ag_ktg_upo_txt = "agenda", ag_zkr_ag = "agenda", ag_typ_ag_txt = "agenda", Permissions = "Permissions",}
	const enum GPolozkaZapoctovehoListuDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", s_pol = "number", bu_vl = "string", sk_vl = "string", ixp_par = "string", zu = "number", typ_ag = "number", ag_s_uhrp = "number", ag_ktg_typ = "number", ag_ixs_typ = "string", ag_ktg_upo = "number", ag_ac_ag = "string", ag_ac = "string", ag_c_celk = "JsonDecimal", ag_c_zust = "JsonDecimal", ag_dat_uup = "JsonDate", ag_typ_ag = "number", priz_pz_zkr = "string", priz_pz_txt = "string", bu_vl_txt = "string", s_pol_zkr = "string", s_pol_txt = "string", ag_ktg_typ_txt = "string", ag_s_uhrp_txt = "string", ag_ktg_upo_txt = "string", ag_zkr_ag = "string", ag_typ_ag_txt = "string", Permissions = "Gordic.Fuc.Interface.GPolozkaZapoctovehoListuPermission",}
	const enum GPolozkaZapoctovehoListuDtoTypeLengths { ixp = 12, vs = 12, ks = 12, ss = 12, bu_vl = 34, sk_vl = 11, ixp_par = 12, ag_ixs_typ = 12, ag_ac_ag = 20, ag_ac = 20,}
	/**Primární klíč zápočtového listu*/
	interface GZapoctovyListPkDto {
		/**PID zápočtového listu*/
		ixp?: string|null;
	}
	const enum GZapoctovyListPkDtoNames { ixp = "ixp",}
	const enum GZapoctovyListPkDtoFragments { ixp = "*",}
	const enum GZapoctovyListPkDtoTypes { ixp = "string",}
	const enum GZapoctovyListPkDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Fuc.Interface\ZapoctovyList\Dto\Gordic.Fuc.Interface.GZapoctovyListFilterDto.d.ts 

declare namespace Gordic.Fuc.Interface {
	/**Filtr seznamu zápočtových listů*/
	interface GZapoctovyListFilterDto {
		/**PID knihy zápočtových listů*/
		ixp_den?: string|null;
		/**rok knih zápočtových listů (pro všechny knihy roku)*/
		rok_den?: number|null;
		/**kategorie knih zápočtových listů*/
		ktg_den?: number|null;
		/**PID zápočtového listu*/
		ixp?: GBaseFilter<string>|null;
		/**aktuální funkce*/
		ixs_fun_akt?: string|null;
		/**stav*/
		s_bvy?: GBaseFilter<number>|null;
		/**popis*/
		popis?: GBaseFilter<string>|null;
		/**agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**kategorie typu dokladu*/
		ktg_typ?: GBaseFilter<number>|null;
		/**typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**PID externího subjektu*/
		ixs_esu?: GBaseFilter<string>|null;
		/**datum evidence*/
		dat_evid?: GIntervalDto<JsonDate>|null;
		/**datum UÚP*/
		dat_nov_zus?: GIntervalDto<JsonDate>|null;
		/**celková kompenzace - závazky*/
		obr_deb?: GIntervalDto<JsonDecimal>|null;
		/**celková kompenzace - pohledávky*/
		obr_kre?: GIntervalDto<JsonDecimal>|null;
		/**variabilní symbol*/
		pol_vs?: GBaseFilter<string>|null;
		/**konstantní symbol*/
		pol_ks?: string|null;
		/**specifický symbol*/
		pol_ss?: string|null;
		/**existence v tabulce fucduct*/
		duct_ano?: number|null;
		/**příznak vyškrtnutého pohybu v tabulce fucduct*/
		duct_uncheck?: number|null;
		/**IKC v tabulce fucduct*/
		duct_ikc?: Gordic.General.GIkc|null;
		/**klíčová slova*/
		wfl_kl_slovo?: GBaseFilter<string>|null;
		/**rozšiřující vlastnosti*/
		vlastnosti_r?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**popisné vlastnosti*/
		vlastnosti_s?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis?: GBaseFilter<string>|null;
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis?: GBaseFilter<number>|null;
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt?: GBaseFilter<string>|null;
		dokument_nazev?: GBaseFilter<string>|null;
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka?: GBaseFilter<string>|null;
		dokument_stav_dist?: GBaseFilter<number>|null;
		/**(písemnosti)*/
		dokument_stav_pis?: GBaseFilter<number>|null;
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij?: GBaseFilter<number>|null;
		/**profil SSL pro tento dokument*/
		dokument_s_ssl?: GBaseFilter<number>|null;
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena?: GIntervalDto<JsonDate>|null;
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov?: GBaseFilter<string>|null;
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele?: GBaseFilter<number>|null;
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz?: GBaseFilter<number>|null;
		/**Barva*/
		dokument_uzo?: GBaseFilter<string>|null;
		/**plánu*/
		dokument_spis_pl?: GBaseFilter<string>|null;
		/**spisového znaku*/
		dokument_spis_znak?: GBaseFilter<string>|null;
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl?: GBaseFilter<string>|null;
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl?: GBaseFilter<string>|null;
		dokument_dat_vyriz?: GIntervalDto<JsonDate>|null;
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval?: GBaseFilter<number>|null;
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak?: GBaseFilter<string>|null;
		/**oproti spisovému znaku*/
		dokument_skar_lhuta?: GBaseFilter<number>|null;
		/**události*/
		dokument_rok_spo_uda?: GBaseFilter<number>|null;
		/**skartace dokumentu*/
		dokument_rok_skartace?: GBaseFilter<number>|null;
		dokument_poc_listu?: GBaseFilter<string>|null;
		/**dokumentu*/
		dokument_poc_stran?: GBaseFilter<number>|null;
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop?: GBaseFilter<number>|null;
		/**dokumentu*/
		dokument_poc_priloh?: GBaseFilter<number>|null;
		/**příloh*/
		dokument_poc_l_priloh?: GBaseFilter<string>|null;
		/**pro zobrazení v seznamech*/
		dokument_cj?: GBaseFilter<string>|null;
		/**existuje profil čísla jednacího*/
		dokument_priz_cj?: GBaseFilter<number>|null;
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku?: GBaseFilter<number>|null;
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup?: GBaseFilter<string>|null;
		/**skartační operace*/
		dokument_PrizPozSkar?: GBaseFilter<number>|null;
	}
	const enum GZapoctovyListFilterDtoNames { ixp_den = "ixp_den", rok_den = "rok_den", ktg_den = "ktg_den", ixp = "ixp", ixs_fun_akt = "ixs_fun_akt", s_bvy = "s_bvy", popis = "popis", ac_ag = "ac_ag", ac = "ac", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_esu = "ixs_esu", dat_evid = "dat_evid", dat_nov_zus = "dat_nov_zus", obr_deb = "obr_deb", obr_kre = "obr_kre", pol_vs = "pol_vs", pol_ks = "pol_ks", pol_ss = "pol_ss", duct_ano = "duct_ano", duct_uncheck = "duct_uncheck", duct_ikc = "duct_ikc", wfl_kl_slovo = "wfl_kl_slovo", vlastnosti_r = "vlastnosti_r", vlastnosti_s = "vlastnosti_s", dokument_ixp_spis = "dokument_ixp_spis", dokument_priz_spis = "dokument_priz_spis", dokument_ixs_su_akt = "dokument_ixs_su_akt", dokument_nazev = "dokument_nazev", dokument_akt_znacka = "dokument_akt_znacka", dokument_stav_dist = "dokument_stav_dist", dokument_stav_pis = "dokument_stav_pis", dokument_s_prij = "dokument_s_prij", dokument_s_ssl = "dokument_s_ssl", dokument_dat_zmena = "dokument_dat_zmena", dokument_zmenu_prov = "dokument_zmenu_prov", dokument_s_ele = "dokument_s_ele", dokument_s_fyz = "dokument_s_fyz", dokument_uzo = "dokument_uzo", dokument_spis_pl = "dokument_spis_pl", dokument_spis_znak = "dokument_spis_znak", dokument_ixs_fun_wfl = "dokument_ixs_fun_wfl", dokument_ixs_su_wfl = "dokument_ixs_su_wfl", dokument_dat_vyriz = "dokument_dat_vyriz", dokument_s_schval = "dokument_s_schval", dokument_skar_znak = "dokument_skar_znak", dokument_skar_lhuta = "dokument_skar_lhuta", dokument_rok_spo_uda = "dokument_rok_spo_uda", dokument_rok_skartace = "dokument_rok_skartace", dokument_poc_listu = "dokument_poc_listu", dokument_poc_stran = "dokument_poc_stran", dokument_poc_kop = "dokument_poc_kop", dokument_poc_priloh = "dokument_poc_priloh", dokument_poc_l_priloh = "dokument_poc_l_priloh", dokument_cj = "dokument_cj", dokument_priz_cj = "dokument_priz_cj", dokument_PrizVBaliku = "dokument_PrizVBaliku", dokument_ixs_zup = "dokument_ixs_zup", dokument_PrizPozSkar = "dokument_PrizPozSkar",}
	const enum GZapoctovyListFilterDtoFragments { ixp_den = "*", rok_den = "*", ktg_den = "*", ixp = "*", ixs_fun_akt = "*", s_bvy = "*", popis = "*", ac_ag = "*", ac = "*", ktg_typ = "*", ixs_typ = "*", ixs_esu = "*", dat_evid = "*", dat_nov_zus = "*", obr_deb = "*", obr_kre = "*", pol_vs = "*", pol_ks = "*", pol_ss = "*", duct_ano = "*", duct_uncheck = "*", duct_ikc = "*", wfl_kl_slovo = "*", vlastnosti_r = "*", vlastnosti_s = "*", dokument_ixp_spis = "*", dokument_priz_spis = "*", dokument_ixs_su_akt = "*", dokument_nazev = "*", dokument_akt_znacka = "*", dokument_stav_dist = "*", dokument_stav_pis = "*", dokument_s_prij = "*", dokument_s_ssl = "*", dokument_dat_zmena = "*", dokument_zmenu_prov = "*", dokument_s_ele = "*", dokument_s_fyz = "*", dokument_uzo = "*", dokument_spis_pl = "*", dokument_spis_znak = "*", dokument_ixs_fun_wfl = "*", dokument_ixs_su_wfl = "*", dokument_dat_vyriz = "*", dokument_s_schval = "*", dokument_skar_znak = "*", dokument_skar_lhuta = "*", dokument_rok_spo_uda = "*", dokument_rok_skartace = "*", dokument_poc_listu = "*", dokument_poc_stran = "*", dokument_poc_kop = "*", dokument_poc_priloh = "*", dokument_poc_l_priloh = "*", dokument_cj = "*", dokument_priz_cj = "*", dokument_PrizVBaliku = "*", dokument_ixs_zup = "*", dokument_PrizPozSkar = "*",}
	const enum GZapoctovyListFilterDtoTypes { ixp_den = "string", rok_den = "number", ktg_den = "number", ixp = "GBaseFilter<string>", ixs_fun_akt = "string", s_bvy = "GBaseFilter<number>", popis = "GBaseFilter<string>", ac_ag = "GIntervalDto<string>", ac = "GIntervalDto<string>", ktg_typ = "GBaseFilter<number>", ixs_typ = "GBaseFilter<string>", ixs_esu = "GBaseFilter<string>", dat_evid = "GIntervalDto<JsonDate>", dat_nov_zus = "GIntervalDto<JsonDate>", obr_deb = "GIntervalDto<JsonDecimal>", obr_kre = "GIntervalDto<JsonDecimal>", pol_vs = "GBaseFilter<string>", pol_ks = "string", pol_ss = "string", duct_ano = "number", duct_uncheck = "number", duct_ikc = "Gordic.General.GIkc", wfl_kl_slovo = "GBaseFilter<string>", vlastnosti_r = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", vlastnosti_s = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", dokument_ixp_spis = "GBaseFilter<string>", dokument_priz_spis = "GBaseFilter<number>", dokument_ixs_su_akt = "GBaseFilter<string>", dokument_nazev = "GBaseFilter<string>", dokument_akt_znacka = "GBaseFilter<string>", dokument_stav_dist = "GBaseFilter<number>", dokument_stav_pis = "GBaseFilter<number>", dokument_s_prij = "GBaseFilter<number>", dokument_s_ssl = "GBaseFilter<number>", dokument_dat_zmena = "GIntervalDto<JsonDate>", dokument_zmenu_prov = "GBaseFilter<string>", dokument_s_ele = "GBaseFilter<number>", dokument_s_fyz = "GBaseFilter<number>", dokument_uzo = "GBaseFilter<string>", dokument_spis_pl = "GBaseFilter<string>", dokument_spis_znak = "GBaseFilter<string>", dokument_ixs_fun_wfl = "GBaseFilter<string>", dokument_ixs_su_wfl = "GBaseFilter<string>", dokument_dat_vyriz = "GIntervalDto<JsonDate>", dokument_s_schval = "GBaseFilter<number>", dokument_skar_znak = "GBaseFilter<string>", dokument_skar_lhuta = "GBaseFilter<number>", dokument_rok_spo_uda = "GBaseFilter<number>", dokument_rok_skartace = "GBaseFilter<number>", dokument_poc_listu = "GBaseFilter<string>", dokument_poc_stran = "GBaseFilter<number>", dokument_poc_kop = "GBaseFilter<number>", dokument_poc_priloh = "GBaseFilter<number>", dokument_poc_l_priloh = "GBaseFilter<string>", dokument_cj = "GBaseFilter<string>", dokument_priz_cj = "GBaseFilter<number>", dokument_PrizVBaliku = "GBaseFilter<number>", dokument_ixs_zup = "GBaseFilter<string>", dokument_PrizPozSkar = "GBaseFilter<number>",}
	const enum GZapoctovyListFilterDtoTypeLengths {}
}

//#endregion

