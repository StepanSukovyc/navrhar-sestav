/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       dpg.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Dpg.Interface\Gordic.Dpg.Interface.csproj
*    created     2026-02-16 14:34:08
*    files       Adl\IGAdlFile.d.ts
*                Ostatni\IGHledani.d.ts
*                Readers\IGReaderDostupneLicence.d.ts
*                Readers\IGReaderDostupneLicenceIxsFun.d.ts
*                Readers\IGReaderDostupneVerzeGdesrev.d.ts
*                Revize\IGDpgRevize.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Dpg.Interface\Adl\IGAdlFile.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Diagnostické adl soubory
	*     
	*/
	interface GAdlFile {
		/**
		*     List pro seznam evidovaných adl souborů 
		*     
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GAdlFileDto>>;
		/**
		*     List pro seznam Historie uploadovaných adl souborů 
		*     
		*/
		listHistorie(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GAdlFileDto>>;
		/**
		*     Založení/Update Adl souboru 
		*     
		*/
		upsert(rq?:Gordic.Dpg.Interface.GAdlFileDto|CallParams<GServiceSaveRequest<Gordic.Dpg.Interface.GAdlFileDto>>): _Task<GServiceSaveRequest<Gordic.Dpg.Interface.GAdlFileDto>,GServiceSaveResponse<Gordic.Dpg.Interface.GAdlFileDto>>;
		/**
		*     Založení/Update historie nahrávání Adl souborů 
		*     
		*/
		upsertHistorie(rq?:Gordic.Dpg.Interface.GAdlFileDto|CallParams<GServiceSaveRequest<Gordic.Dpg.Interface.GAdlFileDto>>): _Task<GServiceSaveRequest<Gordic.Dpg.Interface.GAdlFileDto>,GServiceSaveResponse<Gordic.Dpg.Interface.GAdlFileDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GAdlFile: ServiceBase & Catalog.GAdlFile;
	}
	const GAdlFile: Client["GAdlFile"];
}
declare namespace Gordic.Dpg.Interface {
	/**
	*     DTO s podrobnostmi o diagnostickém Adl souboru
	*     
	*/
	interface GAdlFileDto {
		/**ID instance databáze*/
		db_guid?: string|null;
		/**Jméno ADL souboru*/
		adl?: string|null;
		/**Čas spuštění GDZ balíku*/
		dat_start?: JsonDate|null;
		/**Datum exspirace*/
		dat_exs?: JsonDate|null;
		/**Datum mpd*/
		dat_mpd?: JsonDate|null;
		/**Datum zpracování*/
		dat_zprac?: JsonDate|null;
		/**Balík GDZ (Interní ID balíku - je přidělováno vždy z GDEV databáze a to přes aplikaci ADT07)*/
		ixs_gdt?: string|null;
		/**ID spouštění*/
		run_id?: number|null;
		/**Stav kontroly Adl souboru*/
		stav_kontr_adl?: number|null;
		/**Hodnota změnil - autor změny textově*/
		zmenil?: string|null;
		/**Identifikace autora změny*/
		zmenu_prov?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**ixs_ref přihlášeného uživatele*/
		ixs_ref?: string|null;
		/**Pořadové číslo nahrávání*/
		ser_cislo?: number|null;
		/**Email pro avizace*/
		email?: string|null;
		/**Mailová adresa ze které ADL přišlo mailem. Pokud je prázdno, potom přišlo přes FTP nebo přes WS*/
		mail_response?: string|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
	}
	const enum GAdlFileDtoNames { db_guid = "db_guid", adl = "adl", dat_start = "dat_start", dat_exs = "dat_exs", dat_mpd = "dat_mpd", dat_zprac = "dat_zprac", ixs_gdt = "ixs_gdt", run_id = "run_id", stav_kontr_adl = "stav_kontr_adl", zmenil = "zmenil", zmenu_prov = "zmenu_prov", lic = "lic", ixs_ref = "ixs_ref", ser_cislo = "ser_cislo", email = "email", mail_response = "mail_response", dat_zmena = "dat_zmena",}
	const enum GAdlFileDtoFragments { db_guid = "*", adl = "*", dat_start = "*", dat_exs = "*", dat_mpd = "*", dat_zprac = "*", ixs_gdt = "*", run_id = "*", stav_kontr_adl = "*", zmenil = "*", zmenu_prov = "*", lic = "*", ixs_ref = "*", ser_cislo = "*", email = "*", mail_response = "*", dat_zmena = "*",}
	const enum GAdlFileDtoTypes { db_guid = "string", adl = "string", dat_start = "JsonDate", dat_exs = "JsonDate", dat_mpd = "JsonDate", dat_zprac = "JsonDate", ixs_gdt = "string", run_id = "number", stav_kontr_adl = "number", zmenil = "string", zmenu_prov = "string", lic = "string", ixs_ref = "string", ser_cislo = "number", email = "string", mail_response = "string", dat_zmena = "JsonDate",}
	const enum GAdlFileDtoTypeLengths { db_guid = 36, adl = 100, ixs_gdt = 12, zmenil = 100, zmenu_prov = 15, lic = 15, ixs_ref = 12, email = 254, mail_response = 256,}
	/**
	*     Povinné položky filtru k diagnostickému Adl souboru
	*     
	*/
	const enum GAdlFileFilterEnum {
		/**
		*     Název Adl souboru
		*     
		*/
		adl,
		/**
		*     identifikace databáze
		*     
		*/
		db_guid,
		/**
		*     ID uploadu
		*     
		*/
		ser_cislo,
		/**
		*     ID referenta
		*     
		*/
		ixs_ref,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dpg.Interface\Ostatni\IGHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání záznamů
	* @domain Distribuce
	*/
	interface HledaniDpg {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniDpg: ServiceBase & Catalog.HledaniDpg;
	}
	const HledaniDpg: Client["HledaniDpg"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dpg.Interface\Readers\IGReaderDostupneLicence.d.ts 

declare namespace Gordic.Dpg.Interface {
	/**DTO pro dostupne licence*/
	interface GReaderDostupneLicenceDto {
		/**DBCOLUMN:gdespdb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdespdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesadz.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesadz.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesadz.revize_adz*/
		revize_adz?: number|null;
	}
	const enum GReaderDostupneLicenceDtoNames { lic_fyz = "lic_fyz", nazev = "nazev", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz",}
	const enum GReaderDostupneLicenceDtoFragments { lic_fyz = "*", nazev = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*",}
	const enum GReaderDostupneLicenceDtoTypes { lic_fyz = "string", nazev = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number",}
	/**filter pro reader dostupnych licenci*/
	const enum GReaderDostupneLicenceFilterEnum {
		/**licence db*/
		lic_fyz,
		/**verze databaze*/
		verze_db,
		/**subverze databaze*/
		sub_verze_db,
		/**revize_adz*/
		revize_adz,
		/**nazev licence*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dpg.Interface\Readers\IGReaderDostupneLicenceIxsFun.d.ts 

declare namespace Gordic.Dpg.Interface {
	/**DTO pro dostupne licence*/
	interface GReaderDostupneLicenceIxsFunDto {
		/**DBCOLUMN:gdespdb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdespdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesadz.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesadz.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesadz.revize_adz*/
		revize_adz?: number|null;
	}
	const enum GReaderDostupneLicenceIxsFunDtoNames { lic_fyz = "lic_fyz", nazev = "nazev", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz",}
	const enum GReaderDostupneLicenceIxsFunDtoFragments { lic_fyz = "*", nazev = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*",}
	const enum GReaderDostupneLicenceIxsFunDtoTypes { lic_fyz = "string", nazev = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number",}
	/**filter pro reader dostupnych licenci*/
	const enum GReaderDostupneLicenceIxsFunFilterEnum {
		/**rozliseni osoby - ixs_fun*/
		ixs_fun,
		/**licence db*/
		lic_fyz,
		/**verze databaze*/
		verze_db,
		/**subverze databaze*/
		sub_verze_db,
		/**revize_adz*/
		revize_adz,
		/**nazev licence*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dpg.Interface\Readers\IGReaderDostupneVerzeGdesrev.d.ts 

declare namespace Gordic.Dpg.Interface {
	/**DTO pro dostupne licence*/
	interface GReaderDostupneVerzeGdesrevDto {
		/**DBCOLUMN:gdesrev.verze*/
		verze?: number|null;
		/**DBCOLUMN:gdesver.verze_db*/
		verze_db?: number|null;
	}
	const enum GReaderDostupneVerzeGdesrevDtoNames { verze = "verze", verze_db = "verze_db",}
	const enum GReaderDostupneVerzeGdesrevDtoFragments { verze = "*", verze_db = "*",}
	const enum GReaderDostupneVerzeGdesrevDtoTypes { verze = "number", verze_db = "number",}
	/**filter pro reader dostupnych licenci*/
	const enum GReaderDostupneVerzeGdesrevFilterEnum {
		/**verze databaze*/
		verze_db,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dpg.Interface\Revize\IGDpgRevize.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na doporucenou instalacni sadu (Distribuční revize)*/
	interface GDpgRevize {
		/**Metoda List se seznamem verzi*/
		listSeznamVerzi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GDostupneLicenceDto>>;
		/**Metoda List pro typ implementace*/
		listTyi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GTyiDto>>;
		/**Metoda List pro seznam Licenci*/
		listDostupneLicence(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GDostupneLicenceDto>>;
		/**Metoda List pro seznam dostupných verzí k instalační sadě revizí*/
		listVerze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GVerzeDto>>;
		/**Metoda List se seznamem revizi*/
		listSeznamRevizi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Dpg.Interface.GSeznamDoporucenaRevizeDto>>;
		/**Načíst obsah souboru revize*/
		getContent(rq?:Gordic.Dpg.Interface.GDpgRevizeContentDto|CallParams<GServiceSaveRequest<Gordic.Dpg.Interface.GDpgRevizeContentDto>>): _Task<GServiceSaveRequest<Gordic.Dpg.Interface.GDpgRevizeContentDto>,JsonBlob>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GDpgRevize: ServiceBase & Catalog.GDpgRevize;
	}
	const GDpgRevize: Client["GDpgRevize"];
}
declare namespace Gordic.Dpg.Interface {
	/**DTO pro vybudování seznamu doporučených revizí*/
	interface GSeznamDoporucenaRevizeDto {
		/**Název revize*/
		revize?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Verze databáze*/
		verze?: number|null;
		/**Stav revize*/
		stav_revize_txt?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Velikost souboru revize*/
		velikost?: number|null;
	}
	const enum GSeznamDoporucenaRevizeDtoNames { revize = "revize", faze = "faze", verze = "verze", stav_revize_txt = "stav_revize_txt", dat_zmena = "dat_zmena", velikost = "velikost",}
	const enum GSeznamDoporucenaRevizeDtoFragments { revize = "*", faze = "*", verze = "*", stav_revize_txt = "*", dat_zmena = "*", velikost = "*",}
	const enum GSeznamDoporucenaRevizeDtoTypes { revize = "string", faze = "string", verze = "number", stav_revize_txt = "string", dat_zmena = "JsonDate", velikost = "number",}
	const enum GSeznamDoporucenaRevizeDtoTypeLengths { revize = 30, faze = 8, stav_revize_txt = 254,}
	/**DTO pro vybudování seznamu doporučené instalační sady pro zadanou licenci*/
	interface GDoporucenaRevizeDto {
		/**Název revize*/
		revize?: string|null;
	}
	const enum GDoporucenaRevizeDtoNames { revize = "revize",}
	const enum GDoporucenaRevizeDtoFragments { revize = "*",}
	const enum GDoporucenaRevizeDtoTypes { revize = "string",}
	const enum GDoporucenaRevizeDtoTypeLengths { revize = 30,}
	/**DTO pro typ implementace*/
	interface GTyiDto {
		/**Typ implementace*/
		tyi?: string|null;
	}
	const enum GTyiDtoNames { tyi = "tyi",}
	const enum GTyiDtoFragments { tyi = "*",}
	const enum GTyiDtoTypes { tyi = "string",}
	const enum GTyiDtoTypeLengths { tyi = 10,}
	/**DTO pro dostupne licence*/
	interface GDostupneLicenceDto {
		/**Identifikátor licence databáze*/
		lic_fyz?: string|null;
		/**Název licence databáze*/
		nazev?: string|null;
		/**Verze databáze*/
		verze_db?: number|null;
		/**Subverze databáze*/
		sub_verze_db?: number|null;
		/**Revize ADZ*/
		revize_adz?: number|null;
		/**Stav Revize ADZ*/
		stav_rev_adz?: number|null;
	}
	const enum GDostupneLicenceDtoNames { lic_fyz = "lic_fyz", nazev = "nazev", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", stav_rev_adz = "stav_rev_adz",}
	const enum GDostupneLicenceDtoFragments { lic_fyz = "*", nazev = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*", stav_rev_adz = "*",}
	const enum GDostupneLicenceDtoTypes { lic_fyz = "string", nazev = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number", stav_rev_adz = "number",}
	const enum GDostupneLicenceDtoTypeLengths {}
	/**DTO pro seznam verzi DB*/
	interface GVerzeDto {
		/**Verze databáze*/
		verze_db?: number|null;
		/**Subverze databáze*/
		sub_verze_db?: number|null;
	}
	const enum GVerzeDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db",}
	const enum GVerzeDtoFragments { verze_db = "*", sub_verze_db = "*",}
	const enum GVerzeDtoTypes { verze_db = "number", sub_verze_db = "number",}
	const enum GVerzeDtoTypeLengths {}
	/**DTO pro content downloadu revize*/
	interface GDpgRevizeContentDto {
		/**Identifikator Revize*/
		revize?: string|null;
		/**GUID uloženého dočasného souboru - musí se ale naplnit až na straně webového serveru. Ze strany aplikačního serveru půjde NULL*/
		guid?: string|null;
		/**Velikost revize*/
		sizeB?: number|null;
		/**Velikost souboru vyjádřená textově, uživatelsky přívětivě*/
		fileSize?: string|null;
		/**Číselná velikost revize*/
		filename?: string|null;
		/**Číselná velikost revize*/
		fileDescription?: string|null;
		/**Typ ikony revize*/
		fileTypeIcon?: string|null;
	}
	const enum GDpgRevizeContentDtoNames { revize = "revize", guid = "guid", sizeB = "sizeB", fileSize = "fileSize", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon",}
	const enum GDpgRevizeContentDtoFragments { revize = "*", guid = "*", sizeB = "*", fileSize = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*",}
	const enum GDpgRevizeContentDtoTypes { revize = "string", guid = "string", sizeB = "number", fileSize = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string",}
	const enum GDpgRevizeContentDtoTypeLengths { revize = 30,}
	/**Povinné položky filtru pro seznam doporučených revizí*/
	const enum GListDoporucenychVerziFilterEnum {
		/**Identifikace Licence db*/
		lic,
	}
	/**Povinné položky filtru pro seznam doporučených revizí*/
	const enum GListDostupneLicenceFilterEnum {
		/**identifikace osoby*/
		ixs_fun,
		/**identifikace opravneni*/
		UserParam,
	}
}

//#endregion

