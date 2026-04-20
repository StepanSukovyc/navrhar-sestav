/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gex.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Gex.Interface\Gordic.Gex.Interface.csproj
*    created     2026-02-16 14:33:54
*    files       Ciselniky\GGexcdbs.Dto.d.ts
*                Ciselniky\GGexcdbt.Dto.d.ts
*                DTO\GOpravnenaOsobaDto.d.ts
*                DTO\GPovolenyAdresatDto.d.ts
*                Filters\GGexsdboFilter.d.ts
*                ISL\IGDataboxUser.d.ts
*                ISL\IGDatoveSchrankyGex.d.ts
*                ISL\IGOpravneneOsoby.d.ts
*                ISL\IGPovoleniAdresati.d.ts
*                Support\GGexsdbo.Dto.d.ts
*                Support\GGexsdbrGinsref.Dto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\Ciselniky\GGexcdbs.Dto.d.ts 

declare namespace Gordic.Gex.Interface {
	/**DBTABLE:gexcdbs*/
	interface GGexcdbsDto {
		/**DBCOLUMN:gexcdbs.dbstate*/
		dbstate?: number|null;
		/**DBCOLUMN:gexcdbs.dbstate_txt*/
		dbstate_txt?: string|null;
		/**DBCOLUMN:gexcdbs.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gexcdbs.k_s*/
		k_s?: string|null;
	}
	const enum GGexcdbsDtoNames { dbstate = "dbstate", dbstate_txt = "dbstate_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGexcdbsDtoFragments { dbstate = "*", dbstate_txt = "*", k_v = "*", k_s = "*",}
	const enum GGexcdbsDtoTypes { dbstate = "number", dbstate_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\Ciselniky\GGexcdbt.Dto.d.ts 

declare namespace Gordic.Gex.Interface {
	/**DBTABLE:gexcdbt*/
	interface GGexcdbtDto {
		/**DBCOLUMN:gexcdbt.dbtype*/
		dbtype?: number|null;
		/**DBCOLUMN:gexcdbt.dbtype_txt*/
		dbtype_txt?: string|null;
		/**DBCOLUMN:gexcdbt.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gexcdbt.k_s*/
		k_s?: string|null;
	}
	const enum GGexcdbtDtoNames { dbtype = "dbtype", dbtype_txt = "dbtype_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGexcdbtDtoFragments { dbtype = "*", dbtype_txt = "*", k_v = "*", k_s = "*",}
	const enum GGexcdbtDtoTypes { dbtype = "number", dbtype_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\DTO\GOpravnenaOsobaDto.d.ts 

declare namespace Gordic.Gex.Interface {
	/**DTO pro oprávněnou osobu*/
	interface GOpravnenaOsobaDto {
		/**Osoba*/
		osoba?: Gordic.Gex.Interface.GGexsdbrGinsrefDto|null;
		/**Ixs_ref*/
		ixs_ref?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**Datum od*/
		dat_od?: JsonDate|null;
		/**Datum do*/
		dat_do?: JsonDate|null;
		/**Id datové schránky*/
		dbid?: string|null;
		/**Majitel datové schránky*/
		privil_owner?: boolean|null;
		/**Právo spravovat DS*/
		privil_owner_adm?: boolean|null;
		/**Právo stahovat a číst DZ určené do vlastních rukou*/
		privil_read_non_personal?: boolean|null;
		/**Právo stahovat a číst došlé DZ*/
		privil_read_all?: boolean|null;
		/**Právo vytvářet a odesílat DZ, stahovat odeslané DZ*/
		privil_create_dm?: boolean|null;
		/**Právo načítat seznamy DZ, Dodejky a Doručenky*/
		privil_view_info?: boolean|null;
		/**Právo vyhledávat DS*/
		privil_search_db?: boolean|null;
	}
	const enum GOpravnenaOsobaDtoNames { osoba = "osoba", ixs_ref = "ixs_ref", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dbid = "dbid", privil_owner = "privil_owner", privil_owner_adm = "privil_owner_adm", privil_read_non_personal = "privil_read_non_personal", privil_read_all = "privil_read_all", privil_create_dm = "privil_create_dm", privil_view_info = "privil_view_info", privil_search_db = "privil_search_db",}
	const enum GOpravnenaOsobaDtoFragments { osoba = "*", ixs_ref = "*", aktivita = "*", dat_od = "*", dat_do = "*", dbid = "*", privil_owner = "*", privil_owner_adm = "*", privil_read_non_personal = "*", privil_read_all = "*", privil_create_dm = "*", privil_view_info = "*", privil_search_db = "*",}
	const enum GOpravnenaOsobaDtoTypes { osoba = "Gordic.Gex.Interface.GGexsdbrGinsrefDto", ixs_ref = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dbid = "string", privil_owner = "boolean", privil_owner_adm = "boolean", privil_read_non_personal = "boolean", privil_read_all = "boolean", privil_create_dm = "boolean", privil_view_info = "boolean", privil_search_db = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\DTO\GPovolenyAdresatDto.d.ts 

declare namespace Gordic.Gex.Interface {
	/**DTO pro povoleného adresáta*/
	interface GPovolenyAdresatDto {
		/**DBIDS*/
		dbids?: string|null;
		/**DBIDR*/
		dbidr?: string|null;
		/**Poznamka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GPovolenyAdresatDtoNames { dbids = "dbids", dbidr = "dbidr", poznamka = "poznamka", aktivita = "aktivita",}
	const enum GPovolenyAdresatDtoFragments { dbids = "*", dbidr = "*", poznamka = "*", aktivita = "*",}
	const enum GPovolenyAdresatDtoTypes { dbids = "string", dbidr = "string", poznamka = "string", aktivita = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\Filters\GGexsdboFilter.d.ts 

declare namespace Gordic.Gex.Interface {
	/**Filtr pro Gexsdbo*/
	const enum FilterGexsdbo {
		/**Id datové schránky*/
		dbid,
		/**Typ datové schránky*/
		dbtype,
		/**IČO*/
		ic,
		/**Název firmy*/
		firmname,
		/**Národnost*/
		nationality,
		/**Řídit se právy gexvdbr?*/
		priz_vdbr,
		/**Stav datové schránky*/
		dbstate,
		/**dbeffectiveovm*/
		dbeffectiveovm,
		/**dbopenaddressing*/
		dbopenaddressing,
		/**identifier*/
		identifier,
		/**registrycode*/
		registrycode,
		/**vlastník*/
		ixs_own,
		/**datum změny*/
		dat_zmena,
		/**změnil*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\ISL\IGDataboxUser.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro DatoveSchrankyGex*/
	interface GexSouvisejiciOsoby {
		/**Metoda pro ulozeni*/
		upsert(rq?:Gordic.Gex.Interface.GGexsdbrGinsrefDto|CallParams<GServiceSaveRequest<Gordic.Gex.Interface.GGexsdbrGinsrefDto>>): _Task<GServiceSaveRequest<Gordic.Gex.Interface.GGexsdbrGinsrefDto>,GServiceSaveResponse<Gordic.Gex.Interface.GGexsdbrGinsrefDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gex.Interface.GGexsdbrGinsrefDto>>;
		/**Zkontroluje zda záznam v tabulce již existuje 
		*     Metoda kvůli nežádoucím přepisům dat
		*/
		checkExistUser(rq?:CallParams<{ixs_ref:string}>): _Task<{ixs_ref:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GexSouvisejiciOsoby: ServiceBase & Catalog.GexSouvisejiciOsoby;
	}
	const GexSouvisejiciOsoby: Client["GexSouvisejiciOsoby"];
}
declare namespace Gordic.Gex.Interface {
	/**Filtra4n9 enum pro databox user*/
	const enum GDataboxUserFilter {
		/**ixs_ref*/
		ixs_ref,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\ISL\IGDatoveSchrankyGex.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro DatoveSchrankyGex*/
	interface GexDatoveSchranky {
		/**Metoda pro vypis*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gex.Interface.GGexsdboDto>>;
		/**Metoda upsert pro detail datové schránky*/
		upsert(rq?:Gordic.Gex.Interface.GGexsdboDto|CallParams<GServiceSaveRequest<Gordic.Gex.Interface.GGexsdboDto>>): _Task<GServiceSaveRequest<Gordic.Gex.Interface.GGexsdboDto>,GServiceSaveResponse<Gordic.Gex.Interface.GGexsdboDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GexDatoveSchranky: ServiceBase & Catalog.GexDatoveSchranky;
	}
	const GexDatoveSchranky: Client["GexDatoveSchranky"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\ISL\IGOpravneneOsoby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Opravnene osoby*/
	interface GexOpravneneOsoby {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gex.Interface.GOpravnenaOsobaDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Gex.Interface.GOpravnenaOsobaDto|CallParams<GServiceSaveRequest<Gordic.Gex.Interface.GOpravnenaOsobaDto>>): _Task<GServiceSaveRequest<Gordic.Gex.Interface.GOpravnenaOsobaDto>,GServiceSaveResponse<Gordic.Gex.Interface.GOpravnenaOsobaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GexOpravneneOsoby: ServiceBase & Catalog.GexOpravneneOsoby;
	}
	const GexOpravneneOsoby: Client["GexOpravneneOsoby"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\ISL\IGPovoleniAdresati.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro povolene adresaty*/
	interface GexPovoleniAdresati {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Gex.Interface.GGexsdboDto>>;
		/**Ppřidat povoleného adresáta*/
		addPovolenyAdresat(rq?:Gordic.Gex.Interface.GPovolenyAdresatDto|CallParams<GServiceSaveRequest<Gordic.Gex.Interface.GPovolenyAdresatDto>>): _Task<GServiceSaveRequest<Gordic.Gex.Interface.GPovolenyAdresatDto>,void>;
		/**Odebrat povoleného adresáta*/
		removePovolenyAdresat(rq?:Gordic.Gex.Interface.GPovolenyAdresatDto|CallParams<GServiceSaveRequest<Gordic.Gex.Interface.GPovolenyAdresatDto>>): _Task<GServiceSaveRequest<Gordic.Gex.Interface.GPovolenyAdresatDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GexPovoleniAdresati: ServiceBase & Catalog.GexPovoleniAdresati;
	}
	const GexPovoleniAdresati: Client["GexPovoleniAdresati"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\Support\GGexsdbo.Dto.d.ts 

declare namespace Gordic.Gex.Interface {
	/**DBTABLE:gexsdbo*/
	interface GGexsdboDto {
		/**DBCOLUMN:gexsdbo.dbid*/
		dbid?: string|null;
		/**DBCOLUMN:gexsdbo.dbtype*/
		dbtype?: number|null;
		/**DBCOLUMN:gexsdbo.ic*/
		ic?: string|null;
		/**DBCOLUMN:gexsdbo.firmname*/
		firmname?: string|null;
		/**DBCOLUMN:gexsdbo.nationality*/
		nationality?: string|null;
		/**DBCOLUMN:gexsdbo.priz_vdbr*/
		priz_vdbr?: number|null;
		/**DBCOLUMN:gexsdbo.dbstate*/
		dbstate?: number|null;
		/**DBCOLUMN:gexsdbo.dbeffectiveovm*/
		dbeffectiveovm?: number|null;
		/**DBCOLUMN:gexsdbo.dbopenaddressing*/
		dbopenaddressing?: number|null;
		/**DBCOLUMN:gexsdbo.identifier*/
		identifier?: string|null;
		/**DBCOLUMN:gexsdbo.registrycode*/
		registrycode?: string|null;
		/**DBCOLUMN:gexsdbo.ixs_own*/
		ixs_own?: string|null;
		/**DBCOLUMN:gexsdbo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gexsdbo.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGexsdboDtoNames { dbid = "dbid", dbtype = "dbtype", ic = "ic", firmname = "firmname", nationality = "nationality", priz_vdbr = "priz_vdbr", dbstate = "dbstate", dbeffectiveovm = "dbeffectiveovm", dbopenaddressing = "dbopenaddressing", identifier = "identifier", registrycode = "registrycode", ixs_own = "ixs_own", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGexsdboDtoFragments { dbid = "*", dbtype = "*", ic = "*", firmname = "*", nationality = "*", priz_vdbr = "*", dbstate = "*", dbeffectiveovm = "*", dbopenaddressing = "*", identifier = "*", registrycode = "*", ixs_own = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGexsdboDtoTypes { dbid = "string", dbtype = "number", ic = "string", firmname = "string", nationality = "string", priz_vdbr = "number", dbstate = "number", dbeffectiveovm = "number", dbopenaddressing = "number", identifier = "string", registrycode = "string", ixs_own = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gex.Interface\Support\GGexsdbrGinsref.Dto.d.ts 

declare namespace Gordic.Gex.Interface {
	/**DBTABLE:gexsdbrGinsref*/
	interface GGexsdbrGinsrefDto {
		/**DBCOLUMN:gexsdbrGinsref.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.pnmiddlename*/
		pnmiddlename?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.bidate*/
		bidate?: JsonDate|null;
		/**DBCOLUMN:gexsdbrGinsref.bicity*/
		bicity?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.bicounty*/
		bicounty?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.bistate*/
		bistate?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.adcity*/
		adcity?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.adstreet*/
		adstreet?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.adnumberinstreet*/
		adnumberinstreet?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.adnuminmunicipalit*/
		adnuminmunicipalit?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.adzipcode*/
		adzipcode?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.adstate*/
		adstate?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gexsdbrGinsref.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.mail*/
		mail?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.tel*/
		tel?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.login_name*/
		login_name?: string|null;
		/**DBCOLUMN:gexsdbrGinsref.rod_prijmeni*/
		rod_prijmeni?: string|null;
	}
	const enum GGexsdbrGinsrefDtoNames { ixs_ref = "ixs_ref", pnmiddlename = "pnmiddlename", bidate = "bidate", bicity = "bicity", bicounty = "bicounty", bistate = "bistate", adcity = "adcity", adstreet = "adstreet", adnumberinstreet = "adnumberinstreet", adnuminmunicipalit = "adnuminmunicipalit", adzipcode = "adzipcode", adstate = "adstate", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mail = "mail", tel = "tel", jmeno = "jmeno", prijmeni = "prijmeni", login_name = "login_name", rod_prijmeni = "rod_prijmeni",}
	const enum GGexsdbrGinsrefDtoFragments { ixs_ref = "*", pnmiddlename = "*", bidate = "*", bicity = "*", bicounty = "*", bistate = "*", adcity = "*", adstreet = "*", adnumberinstreet = "*", adnuminmunicipalit = "*", adzipcode = "*", adstate = "*", dat_zmena = "*", zmenu_prov = "*", mail = "*", tel = "*", jmeno = "*", prijmeni = "*", login_name = "*", rod_prijmeni = "*",}
	const enum GGexsdbrGinsrefDtoTypes { ixs_ref = "string", pnmiddlename = "string", bidate = "JsonDate", bicity = "string", bicounty = "string", bistate = "string", adcity = "string", adstreet = "string", adnumberinstreet = "string", adnuminmunicipalit = "string", adzipcode = "string", adstate = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mail = "string", tel = "string", jmeno = "string", prijmeni = "string", login_name = "string", rod_prijmeni = "string",}
}

//#endregion

