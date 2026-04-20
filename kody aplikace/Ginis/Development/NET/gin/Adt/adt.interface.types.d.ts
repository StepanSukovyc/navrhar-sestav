/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adt.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adt.Interface\Gordic.Adt.Interface.csproj
*    created     2026-02-16 14:33:43
*    files       IGGdzBalicek.d.ts
*                IGGdzBalicekADLSoubor.d.ts
*                IGGdzBalicekHistorie.d.ts
*                IGGdzBalicekHistorieSpusteni.d.ts
*                IGGdzBalicekObsazenySoubor.d.ts
*                IGLicDatabaze.d.ts
*                IGVerzeDatabaze.d.ts
*                Authenticator\IGAuthenticator.d.ts
*                Automat\IGAutPozadavek.d.ts
*                CenikProduktu\IGBalikyProduktu.d.ts
*                CenikProduktu\IGCeniky.d.ts
*                CenikProduktu\IGProduktoveListy.d.ts
*                CenikProduktu\IGProdukty.d.ts
*                CenikProduktu\IGSkupinyProduktu.d.ts
*                DalsiSoubory\IGDalsiSoubory.d.ts
*                LicencniPoplatky\IGChybaLicPopl.d.ts
*                LicencniPoplatky\IGFakturaceNaJineICO.d.ts
*                LicencniPoplatky\IGVyjimkyDatabaze.d.ts
*                LicencniPoplatky\IGVyjimkyDatabazePol.d.ts
*                PopisyZmen\IGPopisyZmen.d.ts
*                PopisyZmen\IGPopisZmeny.d.ts
*                PopisyZmenSync\IGPopisZmenySync.d.ts
*                PrehledKomponent\IGAplKomponenty.d.ts
*                Readers\IAgtReaderTypFaze.d.ts
*                Readers\IGAdtReaderAgenda.d.ts
*                Readers\IGAdtReaderAgt.d.ts
*                Readers\IGAdtReaderAutenticator.d.ts
*                Readers\IGAdtReaderBalikyLicenci.d.ts
*                Readers\IGAdtReaderCenik.d.ts
*                Readers\IGAdtReaderCenikovePolozky.d.ts
*                Readers\IGAdtReaderCloud.d.ts
*                Readers\IGAdtReaderDalsiSoubory.d.ts
*                Readers\IGAdtReaderDistributor.d.ts
*                Readers\IGAdtReaderDostupneVerzeRevize.d.ts
*                Readers\IGAdtReaderFaze.d.ts
*                Readers\IGAdtReaderGDZBaliky.d.ts
*                Readers\IGAdtReaderIcoAdministrace.d.ts
*                Readers\IGAdtReaderIcoFakturace.d.ts
*                Readers\IGAdtReaderLicenceDatabazi.d.ts
*                Readers\IGAdtReaderObc.d.ts
*                Readers\IGAdtReaderORJ.d.ts
*                Readers\IGAdtReaderPol.d.ts
*                Readers\IGAdtReaderPolBezLicPopl.d.ts
*                Readers\IGAdtReaderPpol.d.ts
*                Readers\IGAdtReaderProdListy.d.ts
*                Readers\IGAdtReaderRevize.d.ts
*                Readers\IGAdtReaderRoleRegLic.d.ts
*                Readers\IGAdtReaderSkupinyDatabazi.d.ts
*                Readers\IGAdtReaderStavRevize.d.ts
*                Readers\IGAdtReaderSubsystem.d.ts
*                Readers\IGAdtReaderTypImpl.d.ts
*                Readers\IGAdtReaderVerzeDB.d.ts
*                Readers\IGAdtReaderVerzeGDZBaliku.d.ts
*                Readers\IGAdtReaderVlastniLicDB.d.ts
*                Readers\IGAdtReaderVlastniLicRad.d.ts
*                Readers\IGAdtReaderZAK.d.ts
*                RegistrLicenci\IGBalikLicenci.d.ts
*                RegistrLicenci\IGLicenceDatabazi.d.ts
*                RegistrLicenci\IGLicenceG0.d.ts
*                RegistrLicenci\IGLicenceRadPID.d.ts
*                RegistrLicenci\IGLicencniCertifikat.d.ts
*                RegistrLicenci\IGPrehledLicenciDB.d.ts
*                RegistrLicenci\IGPrehledProduktu.d.ts
*                RegistrLicenci\IGPrimarniLicenceDB.d.ts
*                RegistrLicenci\IGSkupinyDatabazi.d.ts
*                RegistrLicenci\IGZakaznik.d.ts
*                RegistrRevizi\IGAplRevize.d.ts
*                Statistiky\IGSpousteniFazi.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGGdzBalicek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ginsgdt - deklarace balíčků GDZ
	* @domain Distribuce
	*/
	interface GdzBalicek {
		/**Aktivovat GDZ balíčrk*/
		aktivovat(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**Uložit změnu GDZ balíčku*/
		upsert(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**Deaktivovat GDZ balíčrk*/
		deaktivovat(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**Načíst obsah GDZ balíčku z DB*/
		getContent(rq?:Gordic.Adt.Interface.GGdzBalicekContentDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdzBalicekContentDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdzBalicekContentDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdzBalicekContentDto>>;
		/**Načíst obsah GDZ balíčku dle verze z DB*/
		getVersionContent(rq?:Gordic.Adt.Interface.GGdzBalicekContentDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdzBalicekContentDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdzBalicekContentDto>,JsonBlob>;
		/**List pro historii Code review*/
		listHistorieCodeReview(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGinhgdrDto>>;
		/**List pro Vyvojove databaze*/
		listVyvojoveDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVyvojoveDatabazeDto>>;
		/**Code Review GMZ/GDZ balíčku*/
		codeReview(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**Upsert Code Review GMZ/GDZ balíčku*/
		upsertCodeReview(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**Upsert vývojové databáze*/
		upsertVyvojoveDB(rq?:Gordic.Adt.Interface.GVyvojoveDatabazeDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GVyvojoveDatabazeDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GVyvojoveDatabazeDto>,GServiceSaveResponse<Gordic.Adt.Interface.GVyvojoveDatabazeDto>>;
		/**Hromadná úprava množiny GDZ balíků*/
		bulkEditGDZ(rq?:CallParams<{baliky:Gordic.Adt.Interface.GGinsgdtDto[],rq_zmeny:Gordic.Adt.Interface.GPopisZmenyDto}>): _Task<{baliky:Gordic.Adt.Interface.GGinsgdtDto[],rq_zmeny:Gordic.Adt.Interface.GPopisZmenyDto},void>;
		/**Read*/
		read(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceReadResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
		/**Delete*/
		delete(rq?:Gordic.Adt.Interface.GGinsgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGinsgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GdzBalicek: ServiceBase & Catalog.GdzBalicek;
	}
	const GdzBalicek: Client["GdzBalicek"];
}
declare namespace Gordic.Adt.Interface {
	/**Práva na jednotlivé akce spojené s GDZ balíčkem*/
	interface GGdzBalicekPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Právo na smazání balíčku*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
		/**Právo na změnu aktivity balíčku*/
		CanChangeActivity: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GGdzBalicekPermissionsNames { CanDelete = "CanDelete", CanChangeActivity = "CanChangeActivity",}
	const enum GGdzBalicekPermissionsFragments { CanDelete = "*", CanChangeActivity = "*",}
	const enum GGdzBalicekPermissionsTypes { CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanChangeActivity = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GGdzBalicekPermissionsTypeLengths {}
	/**Typ reinstalačního balíku*/
	const enum TypGdzBalickuEnum {
		/**T - testovací pro vývoj*/
		T,
		/**B - betatestovací*/
		B,
		/**R - reinstalace od předchozí verze*/
		R,
		/**K - reinstalace v rámci verze*/
		K,
		/**M - reinstalace od předchozí subverze*/
		M,
		/**P - reinstalace v rámci subverze*/
		P,
	}
	/**DBTABLE:ginsgdt*/
	interface GGinsgdtDto {
		/**DBCOLUMN:ginsgdt.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:ginsgdt.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsgdt.nazev*/
		nazev_automat?: string|null;
		/**DBCOLUMN:ginsgdt.popis*/
		popis?: string|null;
		/**DBCOLUMN:ginsgdt.orj*/
		orj?: string|null;
		/**DBCOLUMN:ginsgdt.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsgdt.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginhgdr.dat_zmena_preview*/
		dat_zmena_review?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.ixs_zmp_review*/
		ixs_zmp_review?: string|null;
		/**DBCOLUMN:ginsgdt.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginsgdt.dist_cond*/
		dist_cond?: string|null;
		/**DBCOLUMN:ginsgdt.run_cond*/
		run_cond?: string|null;
		/**DBCOLUMN:ginsgdt.typ_gdt*/
		typ_gdt?: number|null;
		/**DBCOLUMN:ginsgdt.priorita_gdt*/
		priorita_gdt?: number|null;
		/**DBCOLUMN:ginsgdt.priz_log_db*/
		priz_log_db?: number|null;
		zdroj?: string|null;
		priz_public?: number|null;
		cs_nazev?: string|null;
		cs_popis?: string|null;
		/**Veřejná verze popisu - může být prázdný*/
		popis_verejny?: string|null;
		/**Soukromá verze popisu - může být prázdný*/
		popis_privatni?: string|null;
		/**Počet detekovaných spuštění*/
		pocet_spusteni?: number|null;
		/**Počet registrovaných verzí*/
		pocet_verzi?: number|null;
		/**Počet registrovaných souboeu balicku*/
		pocet_souboru?: number|null;
		/**Počet registrovaných souboru balicku*/
		pocet_ADLsouboru?: number|null;
		/**Počet navázaných skupin Databází*/
		pocet_skupinDB?: number|null;
		/**Počet provedení codereview*/
		pocet_codereview?: number|null;
		/**Název autora code review*/
		autor_review?: string|null;
		/**Velikost GDZ balíčku*/
		sizeB?: number|null;
		/**Příznak, že k balíčku existuje veřejný popis.*/
		priz_public_description?: number|null;
		/**Práva k balíčku*/
		Permissions?: Gordic.Adt.Interface.GGdzBalicekPermissions|null;
		/**Autor baliku*/
		Autor?: Gordic.Gin.Interface.GReferentDto|null;
	}
	const enum GGinsgdtDtoNames { ixs_gdt = "ixs_gdt", nazev = "nazev", nazev_automat = "nazev_automat", popis = "popis", orj = "orj", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_zmena_review = "dat_zmena_review", ixs_zmp_review = "ixs_zmp_review", verze = "verze", dist_cond = "dist_cond", run_cond = "run_cond", typ_gdt = "typ_gdt", priorita_gdt = "priorita_gdt", priz_log_db = "priz_log_db", zdroj = "zdroj", priz_public = "priz_public", cs_nazev = "cs_nazev", cs_popis = "cs_popis", popis_verejny = "popis_verejny", popis_privatni = "popis_privatni", pocet_spusteni = "pocet_spusteni", pocet_verzi = "pocet_verzi", pocet_souboru = "pocet_souboru", pocet_ADLsouboru = "pocet_ADLsouboru", pocet_skupinDB = "pocet_skupinDB", pocet_codereview = "pocet_codereview", autor_review = "autor_review", sizeB = "sizeB", priz_public_description = "priz_public_description", Permissions = "Permissions", Autor = "Autor",}
	const enum GGinsgdtDtoFragments { ixs_gdt = "*", nazev = "*", nazev_automat = "*", popis = "*", orj = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_zmena_review = "*", ixs_zmp_review = "*", verze = "*", dist_cond = "*", run_cond = "*", typ_gdt = "*", priorita_gdt = "*", priz_log_db = "*", zdroj = "*", priz_public = "*", cs_nazev = "*", cs_popis = "*", popis_verejny = "*", popis_privatni = "*", pocet_spusteni = "*", pocet_verzi = "*", pocet_souboru = "*", pocet_ADLsouboru = "*", pocet_skupinDB = "*", pocet_codereview = "*", autor_review = "*", sizeB = "*", priz_public_description = "*", Permissions = "*", Autor = "*",}
	const enum GGinsgdtDtoTypes { ixs_gdt = "string", nazev = "string", nazev_automat = "string", popis = "string", orj = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_zmena_review = "JsonDate", ixs_zmp_review = "string", verze = "number", dist_cond = "string", run_cond = "string", typ_gdt = "number", priorita_gdt = "number", priz_log_db = "number", zdroj = "string", priz_public = "number", cs_nazev = "string", cs_popis = "string", popis_verejny = "string", popis_privatni = "string", pocet_spusteni = "number", pocet_verzi = "number", pocet_souboru = "number", pocet_ADLsouboru = "number", pocet_skupinDB = "number", pocet_codereview = "number", autor_review = "string", sizeB = "number", priz_public_description = "number", Permissions = "Gordic.Adt.Interface.GGdzBalicekPermissions", Autor = "Gordic.Gin.Interface.GReferentDto",}
	const enum GGinsgdtDtoTypeLengths { ixs_gdt = 12, nazev = 254, nazev_automat = 254, popis = 254, orj = 4, zmenu_prov = 12, ixs_zmp_review = 12, dist_cond = 4000, run_cond = 4000, zdroj = 255, cs_nazev = 254, cs_popis = 254, autor_review = 100,}
	/**DBTABLE:ginsgdt*/
	interface GGdzBalicekContentDto {
		/**DBCOLUMN:ginsgdt.ixs_gdt*/
		ixs_gdt?: string|null;
		/**GUID uloženého dočasného souboru - musí se ale naplnit až na straně webového serveru. Ze strany aplikačního serveru půjde NULL*/
		guid?: string|null;
		/**Velikost GDZ balíčku*/
		sizeB?: number|null;
		/**Velikost souboru vyjádřená textově, uživatelsky přívětivě*/
		fileSize?: string|null;
		/**Číselná velikost GDZ balíčku*/
		filename?: string|null;
		/**Číselná velikost GDZ balíčku*/
		fileDescription?: string|null;
		fileTypeIcon?: string|null;
		/**Verze GDZ balíčku*/
		verze?: string|null;
	}
	const enum GGdzBalicekContentDtoNames { ixs_gdt = "ixs_gdt", guid = "guid", sizeB = "sizeB", fileSize = "fileSize", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon", verze = "verze",}
	const enum GGdzBalicekContentDtoFragments { ixs_gdt = "*", guid = "*", sizeB = "*", fileSize = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*", verze = "*",}
	const enum GGdzBalicekContentDtoTypes { ixs_gdt = "string", guid = "string", sizeB = "number", fileSize = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string", verze = "string",}
	const enum GGdzBalicekContentDtoTypeLengths { ixs_gdt = 12,}
	/**DBTABLE:ginhgdr*/
	interface GGinhgdrDto {
		/**DBCOLUMN:ginhgdr.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:ginhgdr.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginhgdr.dat_zmena_preview*/
		dat_zmena_review?: JsonDate|null;
		/**DBCOLUMN:ginhgdr.ixs_zmp_review*/
		ixs_zmp_review?: string|null;
		/**Název autora code review*/
		autor_review?: string|null;
	}
	const enum GGinhgdrDtoNames { ixs_gdt = "ixs_gdt", verze = "verze", dat_zmena_review = "dat_zmena_review", ixs_zmp_review = "ixs_zmp_review", autor_review = "autor_review",}
	const enum GGinhgdrDtoFragments { ixs_gdt = "*", verze = "*", dat_zmena_review = "*", ixs_zmp_review = "*", autor_review = "*",}
	const enum GGinhgdrDtoTypes { ixs_gdt = "string", verze = "number", dat_zmena_review = "JsonDate", ixs_zmp_review = "string", autor_review = "string",}
	const enum GGinhgdrDtoTypeLengths { ixs_gdt = 12, ixs_zmp_review = 12, autor_review = 100,}
	/**DBTABLE:gdesvdb*/
	interface GVyvojoveDatabazeDto {
		/**DBCOLUMN:gdesvdb.id_databaze*/
		id_databaze?: number|null;
		/**DBCOLUMN:gdesvdb.id_server*/
		id_server?: number|null;
		/**DBCOLUMN:gdesvdb.db_name*/
		db_name?: string|null;
		/**DBCOLUMN:gdesvdb.is_vas_povolen*/
		is_vas_povolen?: number|null;
		/**DBCOLUMN:gdesvdb.is_ginis*/
		is_ginis?: number|null;
		/**DBCOLUMN:gdesvdb.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdesvdb.verze*/
		verze?: string|null;
		/**DBCOLUMN:gdesvdb.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdesvdb.dat_posl_prihl*/
		dat_posl_prihl?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.jm_posl_prihl*/
		jm_posl_prihl?: string|null;
		/**DBCOLUMN:gdesvdb.dat_zmena_str*/
		dat_zmena_str?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.dat_zmena_proc*/
		dat_zmena_proc?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.dat_vytvoreni*/
		dat_vytvoreni?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.dat_zaloha*/
		dat_zaloha?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.dat_radek_vloz*/
		dat_radek_vloz?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.dat_radek_akt*/
		dat_radek_akt?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.vel_mdf*/
		vel_mdf?: number|null;
		/**DBCOLUMN:gdesvdb.vel_ldf*/
		vel_ldf?: number|null;
		/**DBCOLUMN:gdesvdb.priz_unicode*/
		priz_unicode?: number|null;
		/**DBCOLUMN:gdesvdb.priz_read_only*/
		priz_read_only?: number|null;
		/**DBCOLUMN:gdesvdb.poznamka*/
		poznamka_databaze?: string|null;
		/**DBCOLUMN:gdesvsr.poznamka*/
		poznamka_server?: string|null;
		/**DBCOLUMN:gdesvdb.aktivita*/
		aktivita_databaze?: number|null;
		/**DBCOLUMN:gdesvsr.aktivita*/
		aktivita_server?: number|null;
		/**DBCOLUMN:gdesvdb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesvdb.zmenu_prov*/
		zmenu_prov?: string|null;
		zmenil?: string|null;
		/**DBCOLUMN:gdesvsr.server_name*/
		server_name?: string|null;
		/**DBCOLUMN:gdesvsr.data_source*/
		data_source?: string|null;
		/**DBCOLUMN:gdesvsr.edice*/
		edice?: string|null;
		/**DBCOLUMN:gdesvsr.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:gdesvsr.err*/
		err?: string|null;
		/**DBCOLUMN:gdesvsr.conn_str*/
		conn_str?: string|null;
		/**DBCOLUMN:gdesvsr.typ_db*/
		typ_db?: string|null;
		/**DBCOLUMN:gdesvsr.priz_azure*/
		priz_azure?: number|null;
	}
	const enum GVyvojoveDatabazeDtoNames { id_databaze = "id_databaze", id_server = "id_server", db_name = "db_name", is_vas_povolen = "is_vas_povolen", is_ginis = "is_ginis", lic = "lic", verze = "verze", popis = "popis", dat_posl_prihl = "dat_posl_prihl", jm_posl_prihl = "jm_posl_prihl", dat_zmena_str = "dat_zmena_str", dat_zmena_proc = "dat_zmena_proc", dat_vytvoreni = "dat_vytvoreni", dat_zaloha = "dat_zaloha", dat_radek_vloz = "dat_radek_vloz", dat_radek_akt = "dat_radek_akt", vel_mdf = "vel_mdf", vel_ldf = "vel_ldf", priz_unicode = "priz_unicode", priz_read_only = "priz_read_only", poznamka_databaze = "poznamka_databaze", poznamka_server = "poznamka_server", aktivita_databaze = "aktivita_databaze", aktivita_server = "aktivita_server", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", server_name = "server_name", data_source = "data_source", edice = "edice", poradi = "poradi", err = "err", conn_str = "conn_str", typ_db = "typ_db", priz_azure = "priz_azure",}
	const enum GVyvojoveDatabazeDtoFragments { id_databaze = "*", id_server = "*", db_name = "*", is_vas_povolen = "*", is_ginis = "*", lic = "*", verze = "*", popis = "*", dat_posl_prihl = "*", jm_posl_prihl = "*", dat_zmena_str = "*", dat_zmena_proc = "*", dat_vytvoreni = "*", dat_zaloha = "*", dat_radek_vloz = "*", dat_radek_akt = "*", vel_mdf = "*", vel_ldf = "*", priz_unicode = "*", priz_read_only = "*", poznamka_databaze = "*", poznamka_server = "*", aktivita_databaze = "*", aktivita_server = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", server_name = "*", data_source = "*", edice = "*", poradi = "*", err = "*", conn_str = "*", typ_db = "*", priz_azure = "*",}
	const enum GVyvojoveDatabazeDtoTypes { id_databaze = "number", id_server = "number", db_name = "string", is_vas_povolen = "number", is_ginis = "number", lic = "string", verze = "string", popis = "string", dat_posl_prihl = "JsonDate", jm_posl_prihl = "string", dat_zmena_str = "JsonDate", dat_zmena_proc = "JsonDate", dat_vytvoreni = "JsonDate", dat_zaloha = "JsonDate", dat_radek_vloz = "JsonDate", dat_radek_akt = "JsonDate", vel_mdf = "number", vel_ldf = "number", priz_unicode = "number", priz_read_only = "number", poznamka_databaze = "string", poznamka_server = "string", aktivita_databaze = "number", aktivita_server = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", server_name = "string", data_source = "string", edice = "string", poradi = "number", err = "string", conn_str = "string", typ_db = "string", priz_azure = "number",}
	const enum GVyvojoveDatabazeDtoTypeLengths { db_name = 50, lic = 4, verze = 50, popis = 254, jm_posl_prihl = 254, poznamka_databaze = 254, poznamka_server = 254, zmenu_prov = 12, zmenil = 100, server_name = 100, data_source = 100, edice = 50, err = 1000, conn_str = 1000, typ_db = 3,}
	/**Filtry pro požadavky na budování LISTu GdzBalicku*/
	const enum GGinsgdtFilterEnum {
		/**PK tabulky - ID balíčku*/
		ixs_gdt,
		/**Tp balíčku*/
		typ_gdt,
		/**Priorita balíčku*/
		priorita_gdt,
		/**Název balíčku*/
		nazev,
		/**Popis balíčku*/
		popis,
		/**ORJ autora*/
		orj,
		/**Datum OD - od zveřejnění balíčku - většinou společné datum pro časovou platnost balíčku*/
		dat_od,
		/**Datum poslední změny balíčku*/
		dat_zmena,
		/**aktivita balíčku*/
		aktivita,
		/**Licence databáze, pro kterou jsou balíčky určeny*/
		lic,
		/**ID databáze, pro kterou jsou GDZ balíčky určeny*/
		db_guid,
		/**Verze databáze, pro kterou mají být balíky určeny
		*     Nepovinný - číslo max. jedno
		*      Pokud tyto filtrační položky nejsou zadány, potom se vezme z GDEV poslední známá informace o verzi databáze zákazníka - zatím z gdesdbo
		*/
		verze_db,
		/**SubVerze databáze, pro kterou mají být balíky určeny. Pokud je zadán, musí být zadán i filtr: verze_db
		*     Nepovinný - číslo max. jedno
		*      Pokud tyto filtrační položky nejsou zadány, potom se vezme z GDEV poslední známá informace o verzi databáze zákazníka - zatím z gdesdbo
		*/
		sub_verze_db,
		/**Revize databáze, pro kterou mají být balíky určeny. Pokud je zadán, musí být zadán i filtr: verze_db a sub_verze_db
		*     To je třetí a poslední číslo plně určující verzi databáze GINIS
		*     Nepovinný - číslo max. jedno
		*      Pokud tyto filtrační položky nejsou zadány, potom se vezme z GDEV poslední známá informace o verzi databáze zákazníka - zatím z gdesdbo
		*/
		revize_db,
		/**Filtrační podmínka, zda se mají zobrazovat pouze tzv. doporučené:
		*     To znamená nejvyšší vhodná verze reistalačních balíků + vyslovně uvedené balíky ostatních typů 
		*     Výslovně uvedené balíky: Distributor, nebo někdo jiný s patřičným porávněném kokrétní balík připojil ke skupině databází, nebo k jedné konkrétní databázi
		*     Tedy někdo deklarativně spojil balík s cílovou databází => doporučený balík
		*     Očekává se pouze jedna číselná hodnota int a to pouze 1-ANO doporučené, 0-Ne tento přepínač nemá na sestavení balíků vliv
		*     gincpan
		*/
		doporucene,
		/**filtr pro typ GDZ - pouze priprava, na tento filtr neni bran ohled*/
		typGDZ,
		/**filtr na cilovou verzi db*/
		cil_verze_db,
		/**filtr na cilovou subverzi db*/
		cil_sub_verze_db,
	}
	/**Filtry pro požadavky na budování LISTu vývojových databází*/
	const enum GVyvojoveDatabazeFilterEnum {
		/**filtr na aktivitu databáze*/
		aktivita_databaze,
		/**filtr na aktivitu serveru*/
		aktivita_server,
		/**filtr na GINIS*/
		is_ginis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGGdzBalicekADLSoubor.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**gdeladl - Přehlad ADL (diagnostických) souborů
	* @domain Distribuce
	*/
	interface GdzBalicekADLSoubor {
		/**Získání contentu ADL souboru*/
		getADLContent(rq?:Gordic.Adt.Interface.GGdeladlDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeladlDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeladlDto>,JsonBlob>;
		/**Insert Update dat do Gdeladl (sloupec popis_reseni)*/
		insertUpdateGdeladl(rq?:Gordic.Adt.Interface.GGdeladlDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeladlDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeladlDto>,void>;
		/**Hromadny update vice radku ulohy Chyby z reinstalaci*/
		updateVyberChybReinstalaci(rq?:CallParams<{rq_chybyReinstalaci:GServiceSaveRequest<Gordic.Adt.Interface.GGdeladlDto>,vyberRadku:string[]}>): _Task<{rq_chybyReinstalaci:GServiceSaveRequest<Gordic.Adt.Interface.GGdeladlDto>,vyberRadku:string[]},void>;
		/**Read detailu ADL souborů*/
		read(rq?:Gordic.Adt.Interface.GGdeladlDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdeladlDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdeladlDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdeladlDto>>;
		/**List ADL souborů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeladlDto>>;
		/**List ADL souborů - chyby z reinstalací*/
		listChybyReinstalaci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeladlDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GdzBalicekADLSoubor: ServiceBase & Catalog.GdzBalicekADLSoubor;
	}
	const GdzBalicekADLSoubor: Client["GdzBalicekADLSoubor"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdeladl*/
	interface GGdeladlDto {
		/**DBCOLUMN:gdeladl.db_guid*/
		db_guid?: string|null;
		/**DBCOLUMN:gdeladl.adl*/
		adl?: string|null;
		/**DBCOLUMN:gdeladl.dat_start*/
		dat_start?: JsonDate|null;
		/**DBCOLUMN:gdeladl.dat_exs*/
		dat_exs?: JsonDate|null;
		/**DBCOLUMN:gdeladl.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gdeladl.dat_zprac*/
		dat_zprac?: JsonDate|null;
		/**DBCOLUMN:gdeladl.ixs_gdt*/
		ixs_gdt?: string|null;
		/**popois reseni - text*/
		popis_reseni_txt?: string|null;
		/**Povoleni menit popis reseni (pro hromadnou upravu chyb reinstalaci)*/
		popis_reseni_txt_enable?: boolean|null;
		/**DBCOLUMN:gdeladl.stav_kontr_adl*/
		run_id?: number|null;
		/**DBCOLUMN:gdeladl.run_id*/
		stav_kontr_adl?: number|null;
		/**Povoleni menit stav kontroly ADL (pro hromadnou upravu chyb reinstalaci)*/
		stav_kontr_adl_enable?: boolean|null;
		/**Počet ADL souboru balicku*/
		pocet_ADLsouboru?: number|null;
		/**velikost kopie v B*/
		velikost?: number|null;
		/**Hodnota zmenil - pro subselect seznamu Chyby z reinstalaci*/
		zmenil?: string|null;
		/**DBCOLUMN:gdeladl.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gdeladl.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdeladl.mail_response*/
		mail_response?: string|null;
		/**DBCOLUMN:gdeladl.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**vybrane radky*/
		checkedRows?: boolean|null;
	}
	const enum GGdeladlDtoNames { db_guid = "db_guid", adl = "adl", dat_start = "dat_start", dat_exs = "dat_exs", dat_mpd = "dat_mpd", dat_zprac = "dat_zprac", ixs_gdt = "ixs_gdt", popis_reseni_txt = "popis_reseni_txt", popis_reseni_txt_enable = "popis_reseni_txt_enable", run_id = "run_id", stav_kontr_adl = "stav_kontr_adl", stav_kontr_adl_enable = "stav_kontr_adl_enable", pocet_ADLsouboru = "pocet_ADLsouboru", velikost = "velikost", zmenil = "zmenil", zmenu_prov = "zmenu_prov", lic = "lic", mail_response = "mail_response", dat_zmena = "dat_zmena", checkedRows = "checkedRows",}
	const enum GGdeladlDtoFragments { db_guid = "*", adl = "*", dat_start = "*", dat_exs = "*", dat_mpd = "*", dat_zprac = "*", ixs_gdt = "*", popis_reseni_txt = "*", popis_reseni_txt_enable = "*", run_id = "*", stav_kontr_adl = "*", stav_kontr_adl_enable = "*", pocet_ADLsouboru = "*", velikost = "*", zmenil = "*", zmenu_prov = "*", lic = "*", mail_response = "*", dat_zmena = "*", checkedRows = "*",}
	const enum GGdeladlDtoTypes { db_guid = "string", adl = "string", dat_start = "JsonDate", dat_exs = "JsonDate", dat_mpd = "JsonDate", dat_zprac = "JsonDate", ixs_gdt = "string", popis_reseni_txt = "string", popis_reseni_txt_enable = "boolean", run_id = "number", stav_kontr_adl = "number", stav_kontr_adl_enable = "boolean", pocet_ADLsouboru = "number", velikost = "number", zmenil = "string", zmenu_prov = "string", lic = "string", mail_response = "string", dat_zmena = "JsonDate", checkedRows = "boolean",}
	const enum GGdeladlDtoTypeLengths { db_guid = 36, adl = 100, ixs_gdt = 12, popis_reseni_txt = 5000, zmenil = 100, zmenu_prov = 15, lic = 15, mail_response = 256,}
	/**DBTABLE:gdeladl - pripraveno pro stahovani contentu ADL souborů*/
	interface GGdeladlContentDto {
		/**DBCOLUMN:gdeladl.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:gdeladl.adl*/
		adl?: string|null;
		content?: string|null;
	}
	const enum GGdeladlContentDtoNames { ixs_gdt = "ixs_gdt", adl = "adl", content = "content",}
	const enum GGdeladlContentDtoFragments { ixs_gdt = "*", adl = "*", content = "*",}
	const enum GGdeladlContentDtoTypes { ixs_gdt = "string", adl = "string", content = "string",}
	const enum GGdeladlContentDtoTypeLengths { ixs_gdt = 12, adl = 100,}
	/**Filtr pro požadavky na budování LISTu zobrazení ADL souborů*/
	const enum GGdeladlFilterEnum {
		/**PK tabulky - ID balíčku*/
		ixs_gdt,
		/**Jméno ADL souboru*/
		adl,
		/**filtr na zacatek casu spusteni*/
		dat_spusteni_start,
		/**filtr na konec casu spusteni*/
		dat_spusteni_end,
		/**filtr na licenci*/
		lic,
		/**filtr na stav kontroly ADL*/
		neurceno,
		/**filtr na stav kontroly ADL*/
		bezChyb,
		/**filtr na stav kontroly ADL*/
		opraveno,
		/**filtr na stav kontroly ADL*/
		cekaNaAnalyzu,
		/**filtr na stav kontroly ADL*/
		probihaReseniChyb,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGGdzBalicekHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ginsgdt - historie balíčků GDZ
	* @domain Distribuce
	*/
	interface GdzBalicekHistorie {
		/**Read*/
		read(rq?:Gordic.Adt.Interface.GGinhgdtDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGinhgdtDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGinhgdtDto>,GServiceReadResponse<Gordic.Adt.Interface.GGinhgdtDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGinhgdtDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GdzBalicekHistorie: ServiceBase & Catalog.GdzBalicekHistorie;
	}
	const GdzBalicekHistorie: Client["GdzBalicekHistorie"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:ginhgdt*/
	interface GGinhgdtDto {
		/**DBCOLUMN:ginhgdt.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:ginhgdt.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginhgdt.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginhgdt.popis*/
		popis?: string|null;
		/**DBCOLUMN:ginhgdt.orj*/
		orj?: string|null;
		/**DBCOLUMN:ginhgdt.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginhgdt.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginhgdt.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginhgdt.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginhgdt.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginhgdt.dist_cond*/
		dist_cond?: string|null;
		/**DBCOLUMN:ginhgdt.run_cond*/
		run_cond?: string|null;
		/**DBCOLUMN:ginhgdt.typ_gdt*/
		typ_gdt?: number|null;
		/**DBCOLUMN:ginhgdt.priorita_gdt*/
		priorita_gdt?: number|null;
		/**DBCOLUMN:ginhgdt.priz_log_db*/
		priz_log_db?: number|null;
	}
	const enum GGinhgdtDtoNames { ixs_gdt = "ixs_gdt", verze = "verze", nazev = "nazev", popis = "popis", orj = "orj", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dist_cond = "dist_cond", run_cond = "run_cond", typ_gdt = "typ_gdt", priorita_gdt = "priorita_gdt", priz_log_db = "priz_log_db",}
	const enum GGinhgdtDtoFragments { ixs_gdt = "*", verze = "*", nazev = "*", popis = "*", orj = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dist_cond = "*", run_cond = "*", typ_gdt = "*", priorita_gdt = "*", priz_log_db = "*",}
	const enum GGinhgdtDtoTypes { ixs_gdt = "string", verze = "number", nazev = "string", popis = "string", orj = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dist_cond = "string", run_cond = "string", typ_gdt = "number", priorita_gdt = "number", priz_log_db = "number",}
	const enum GGinhgdtDtoTypeLengths { ixs_gdt = 12, nazev = 254, popis = 254, orj = 4, zmenu_prov = 12, dist_cond = 4000, run_cond = 4000,}
	/**Filtry pro požadavky na budování LISTu GdzBalicku*/
	const enum GGinhgdtFilterEnum {
		/**PK tabulky - ID balíčku*/
		ixs_gdt,
		/**Datum změny balíčku*/
		dat_zmena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGGdzBalicekHistorieSpusteni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ginsgdt - historie ověření/spuštění balíčků GDZ
	* @domain Distribuce
	*/
	interface GdzBalicekHistorieSpusteni {
		/**Read detailu ověření/spuštění GdzBalicku u zákazníků*/
		read(rq?:Gordic.Adt.Interface.GGinlgdeDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGinlgdeDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGinlgdeDto>,GServiceReadResponse<Gordic.Adt.Interface.GGinlgdeDto>>;
		/**List ověření/spuštění GdzBalicku u zákazníků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGinlgdeDto>>;
		/**List ověření/spuštění GdzBalicku u zákazníků*/
		listExt(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdzBalicekHistorieSpusteniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GdzBalicekHistorieSpusteni: ServiceBase & Catalog.GdzBalicekHistorieSpusteni;
	}
	const GdzBalicekHistorieSpusteni: Client["GdzBalicekHistorieSpusteni"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:ginlgde*/
	interface GGinlgdeDto {
		/**DBCOLUMN:ginlgde.run_id*/
		run_id?: number|null;
		/**DBCOLUMN:ginlgde.dat_run_od*/
		dat_run_od?: JsonDate|null;
		/**DBCOLUMN:ginlgde.dat_run_do*/
		dat_run_do?: JsonDate|null;
		/**DBCOLUMN:ginlgde.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:ginlgde.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginlgde.vysledek*/
		vysledek?: string|null;
		/**DBCOLUMN:ginlgde.db_guid*/
		db_guid?: string|null;
		/**DBCOLUMN:ginlgde.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginlgde.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginlgde.typ_db*/
		typ_db?: string|null;
		/**DBCOLUMN:ginlgde.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:ginlgde.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:ginlgde.revize_adz*/
		revize_adz?: number|null;
		/**DBCOLUMN:ginlgde.typ_inst*/
		typ_inst?: number|null;
		/**DBCOLUMN:ginlgde.priz_archiv*/
		priz_archiv?: number|null;
		/**DBCOLUMN:ginlgde.priz_blob*/
		priz_blob?: number|null;
		/**DBCOLUMN:ginlgde.stav_db*/
		stav_db?: number|null;
		/**DBCOLUMN:ginlgde.priz_adm*/
		priz_adm?: number|null;
		/**DBCOLUMN:ginlgde.s_eko*/
		s_eko?: number|null;
		/**DBCOLUMN:ginlgde.s_ssl*/
		s_ssl?: number|null;
		/**DBCOLUMN:ginlgde.s_reg*/
		s_reg?: number|null;
		/**DBCOLUMN:ginlgde.priz_d*/
		priz_d?: number|null;
		/**DBCOLUMN:ginlgde.kultura*/
		kultura?: number|null;
		/**DBCOLUMN:ginlgde.gin_typ_inst*/
		gin_typ_inst?: string|null;
		/**DBCOLUMN:ginlgde.priz_multikult*/
		priz_multikult?: number|null;
		/**DBCOLUMN:ginlgde.priz_azure*/
		priz_azure?: number|null;
		/**DBCOLUMN:ginlgde.priz_unicode*/
		priz_unicode?: number|null;
		/**DBCOLUMN:ginlgde.edi*/
		edi?: string|null;
		/**DBCOLUMN:ginlgde.idle_ping*/
		idle_ping?: number|null;
		/**DBCOLUMN:ginlgde.servername*/
		servername?: string|null;
		/**DBCOLUMN:ginlgde.db_name*/
		db_name?: string|null;
		/**DBCOLUMN:ginlgde.dat_test_od*/
		dat_test_od?: JsonDate|null;
		/**DBCOLUMN:ginlgde.mail_adl*/
		mail_adl?: string|null;
		/**DBCOLUMN:ginlgde.tel_adl*/
		tel_adl?: string|null;
		/**DBCOLUMN:ginlgde.pozn_adl*/
		pozn_adl?: string|null;
		/**DBCOLUMN:ginlgde.mail_chyby*/
		mail_chyby?: string|null;
		/**DBCOLUMN:ginlgde.tel_chyby*/
		tel_chyby?: string|null;
		/**DBCOLUMN:ginlgde.pozn_chyby*/
		pozn_chyby?: string|null;
		/**DBCOLUMN:ginlgde.pc_name*/
		pc_name?: string|null;
		/**DBCOLUMN:ginlgde.user_name*/
		user_name?: string|null;
		/**DBCOLUMN:ginlgde.verze_adt*/
		verze_adt?: string|null;
	}
	const enum GGinlgdeDtoNames { run_id = "run_id", dat_run_od = "dat_run_od", dat_run_do = "dat_run_do", ixs_gdt = "ixs_gdt", verze = "verze", vysledek = "vysledek", db_guid = "db_guid", lic = "lic", ico = "ico", typ_db = "typ_db", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", typ_inst = "typ_inst", priz_archiv = "priz_archiv", priz_blob = "priz_blob", stav_db = "stav_db", priz_adm = "priz_adm", s_eko = "s_eko", s_ssl = "s_ssl", s_reg = "s_reg", priz_d = "priz_d", kultura = "kultura", gin_typ_inst = "gin_typ_inst", priz_multikult = "priz_multikult", priz_azure = "priz_azure", priz_unicode = "priz_unicode", edi = "edi", idle_ping = "idle_ping", servername = "servername", db_name = "db_name", dat_test_od = "dat_test_od", mail_adl = "mail_adl", tel_adl = "tel_adl", pozn_adl = "pozn_adl", mail_chyby = "mail_chyby", tel_chyby = "tel_chyby", pozn_chyby = "pozn_chyby", pc_name = "pc_name", user_name = "user_name", verze_adt = "verze_adt",}
	const enum GGinlgdeDtoFragments { run_id = "*", dat_run_od = "*", dat_run_do = "*", ixs_gdt = "*", verze = "*", vysledek = "*", db_guid = "*", lic = "*", ico = "*", typ_db = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*", typ_inst = "*", priz_archiv = "*", priz_blob = "*", stav_db = "*", priz_adm = "*", s_eko = "*", s_ssl = "*", s_reg = "*", priz_d = "*", kultura = "*", gin_typ_inst = "*", priz_multikult = "*", priz_azure = "*", priz_unicode = "*", edi = "*", idle_ping = "*", servername = "*", db_name = "*", dat_test_od = "*", mail_adl = "*", tel_adl = "*", pozn_adl = "*", mail_chyby = "*", tel_chyby = "*", pozn_chyby = "*", pc_name = "*", user_name = "*", verze_adt = "*",}
	const enum GGinlgdeDtoTypes { run_id = "number", dat_run_od = "JsonDate", dat_run_do = "JsonDate", ixs_gdt = "string", verze = "number", vysledek = "string", db_guid = "string", lic = "string", ico = "string", typ_db = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number", typ_inst = "number", priz_archiv = "number", priz_blob = "number", stav_db = "number", priz_adm = "number", s_eko = "number", s_ssl = "number", s_reg = "number", priz_d = "number", kultura = "number", gin_typ_inst = "string", priz_multikult = "number", priz_azure = "number", priz_unicode = "number", edi = "string", idle_ping = "number", servername = "string", db_name = "string", dat_test_od = "JsonDate", mail_adl = "string", tel_adl = "string", pozn_adl = "string", mail_chyby = "string", tel_chyby = "string", pozn_chyby = "string", pc_name = "string", user_name = "string", verze_adt = "string",}
	const enum GGinlgdeDtoTypeLengths { ixs_gdt = 12, vysledek = 4000, db_guid = 36, lic = 4, ico = 10, typ_db = 3, gin_typ_inst = 3, edi = 1, servername = 100, db_name = 100, mail_adl = 254, tel_adl = 254, pozn_adl = 254, mail_chyby = 254, tel_chyby = 254, pozn_chyby = 254, pc_name = 254, user_name = 254, verze_adt = 16,}
	/**Rozšíření tabulkové DTO o nové položky zajímaví pro klienta*/
	interface GGdzBalicekHistorieSpusteniDto extends Gordic.Adt.Interface.GGinlgdeDto {
		/**DBCOLUMN:ginsgdt.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsgdt.popis*/
		popis?: string|null;
		/**DBCOLUMN:ginsgdt.orj*/
		orj?: string|null;
		/**Lidská prezentace příznaku DEMO databáze*/
		readonly priz_d_txt?: string|null;
		/**Lidská prezentace typu GDZ balíčku*/
		typ_gdt_txt?: string|null;
		/**Lidská prezentace priority GDZ balíčku*/
		priorita_gdt_txt?: string|null;
		/**Hodnocení spuštění balíčku.
		*     ginlgdv.resp_stat
		*/
		resp_stat?: number|null;
		/**Textové hodnocení výsledku spuštění balíčku.*/
		popis_txt?: string|null;
	}
	const enum GGdzBalicekHistorieSpusteniDtoNames { nazev = "nazev", popis = "popis", orj = "orj", priz_d_txt = "priz_d_txt", typ_gdt_txt = "typ_gdt_txt", priorita_gdt_txt = "priorita_gdt_txt", resp_stat = "resp_stat", popis_txt = "popis_txt", run_id = "run_id", dat_run_od = "dat_run_od", dat_run_do = "dat_run_do", ixs_gdt = "ixs_gdt", verze = "verze", vysledek = "vysledek", db_guid = "db_guid", lic = "lic", ico = "ico", typ_db = "typ_db", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", typ_inst = "typ_inst", priz_archiv = "priz_archiv", priz_blob = "priz_blob", stav_db = "stav_db", priz_adm = "priz_adm", s_eko = "s_eko", s_ssl = "s_ssl", s_reg = "s_reg", priz_d = "priz_d", kultura = "kultura", gin_typ_inst = "gin_typ_inst", priz_multikult = "priz_multikult", priz_azure = "priz_azure", priz_unicode = "priz_unicode", edi = "edi", idle_ping = "idle_ping", servername = "servername", db_name = "db_name", dat_test_od = "dat_test_od", mail_adl = "mail_adl", tel_adl = "tel_adl", pozn_adl = "pozn_adl", mail_chyby = "mail_chyby", tel_chyby = "tel_chyby", pozn_chyby = "pozn_chyby", pc_name = "pc_name", user_name = "user_name", verze_adt = "verze_adt",}
	const enum GGdzBalicekHistorieSpusteniDtoFragments { nazev = "*", popis = "*", orj = "*", priz_d_txt = "*", typ_gdt_txt = "*", priorita_gdt_txt = "*", resp_stat = "*", popis_txt = "*", run_id = "*", dat_run_od = "*", dat_run_do = "*", ixs_gdt = "*", verze = "*", vysledek = "*", db_guid = "*", lic = "*", ico = "*", typ_db = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*", typ_inst = "*", priz_archiv = "*", priz_blob = "*", stav_db = "*", priz_adm = "*", s_eko = "*", s_ssl = "*", s_reg = "*", priz_d = "*", kultura = "*", gin_typ_inst = "*", priz_multikult = "*", priz_azure = "*", priz_unicode = "*", edi = "*", idle_ping = "*", servername = "*", db_name = "*", dat_test_od = "*", mail_adl = "*", tel_adl = "*", pozn_adl = "*", mail_chyby = "*", tel_chyby = "*", pozn_chyby = "*", pc_name = "*", user_name = "*", verze_adt = "*",}
	const enum GGdzBalicekHistorieSpusteniDtoTypes { nazev = "string", popis = "string", orj = "string", priz_d_txt = "string", typ_gdt_txt = "string", priorita_gdt_txt = "string", resp_stat = "number", popis_txt = "string", run_id = "number", dat_run_od = "JsonDate", dat_run_do = "JsonDate", ixs_gdt = "string", verze = "number", vysledek = "string", db_guid = "string", lic = "string", ico = "string", typ_db = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number", typ_inst = "number", priz_archiv = "number", priz_blob = "number", stav_db = "number", priz_adm = "number", s_eko = "number", s_ssl = "number", s_reg = "number", priz_d = "number", kultura = "number", gin_typ_inst = "string", priz_multikult = "number", priz_azure = "number", priz_unicode = "number", edi = "string", idle_ping = "number", servername = "string", db_name = "string", dat_test_od = "JsonDate", mail_adl = "string", tel_adl = "string", pozn_adl = "string", mail_chyby = "string", tel_chyby = "string", pozn_chyby = "string", pc_name = "string", user_name = "string", verze_adt = "string",}
	const enum GGdzBalicekHistorieSpusteniDtoTypeLengths { nazev = 254, popis = 254, orj = 4, ixs_gdt = 12, vysledek = 4000, db_guid = 36, lic = 4, ico = 10, typ_db = 3, gin_typ_inst = 3, edi = 1, servername = 100, db_name = 100, mail_adl = 254, tel_adl = 254, pozn_adl = 254, mail_chyby = 254, tel_chyby = 254, pozn_chyby = 254, pc_name = 254, user_name = 254, verze_adt = 16,}
	/**Filtry pro požadavky na budování LISTu ověření/spuštění GdzBalicku u zákazníků*/
	const enum GGinlgdeFilterEnum {
		/**PK tabulky - ID balíčku*/
		ixs_gdt,
		/**verze GDZ balíčku*/
		verze,
		/**Datum ověření ( startu spuštění )*/
		dat_run_od,
		/**Licence zákazníka*/
		lic,
		/**ICO zákazníka*/
		ico,
		/**Typ databáze zákazníka*/
		typ_db,
		/**Příznak demo databáze zákazníka*/
		priz_d,
		/**Jméno DB serveru u zákazníka*/
		servername,
		/**Jméno databáze u zákazníka*/
		db_name,
	}
	/**Filtry pro požadavky na budování extend LISTu ověření/spuštění GdzBalicku u zákazníků*/
	const enum GGinlgdeExtFilterEnum {
		/**PK tabulky - ID balíčku*/
		ixs_gdt,
		/**verze GDZ balíčku*/
		verze,
		/**Datum ověření ( startu spuštění )*/
		dat_run_od,
		/**Licence zákazníka*/
		lic,
		/**ICO zákazníka*/
		ico,
		/**Typ databáze zákazníka*/
		typ_db,
		/**Příznak demo databáze zákazníka*/
		priz_d,
		/**Jméno DB serveru u zákazníka*/
		servername,
		/**Jméno databáze u zákazníka*/
		db_name,
		/**Název uvedený u GDZ balíčku*/
		nazev,
		/**Popis uvedený u GDZ balíčku*/
		popis,
		/**ORJ autora balíčku*/
		orj,
		/**typ GDZ balíčku*/
		typ_gdt,
		/**Priorita GDZ balíčku*/
		priorita_gdt,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro DB paramter adt_user_type*/
		userType,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGGdzBalicekObsazenySoubor.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ginsgdt - soubor obsažený v GDZ balíčků
	* @domain Distribuce
	*/
	interface GdzBalicekObsazenySoubor {
		/**Aktivovat GDZ balíčrk*/
		getContent(rq?:Gordic.Adt.Interface.GGindgdtDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGindgdtDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGindgdtDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGinsgdtContentDto>>;
		/**Read*/
		read(rq?:Gordic.Adt.Interface.GGindgdtDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGindgdtDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGindgdtDto>,GServiceReadResponse<Gordic.Adt.Interface.GGindgdtDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGindgdtDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GdzBalicekObsazenySoubor: ServiceBase & Catalog.GdzBalicekObsazenySoubor;
	}
	const GdzBalicekObsazenySoubor: Client["GdzBalicekObsazenySoubor"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gindgdt*/
	interface GGindgdtDto {
		/**DBCOLUMN:gindgdt.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:gindgdt.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:gindgdt.pripona*/
		pripona?: string|null;
		/**DBCOLUMN:gindgdt.popis*/
		popis?: string|null;
		velikost?: number|null;
	}
	const enum GGindgdtDtoNames { ixs_gdt = "ixs_gdt", soubor = "soubor", pripona = "pripona", popis = "popis", velikost = "velikost",}
	const enum GGindgdtDtoFragments { ixs_gdt = "*", soubor = "*", pripona = "*", popis = "*", velikost = "*",}
	const enum GGindgdtDtoTypes { ixs_gdt = "string", soubor = "string", pripona = "string", popis = "string", velikost = "number",}
	const enum GGindgdtDtoTypeLengths { ixs_gdt = 12, soubor = 200, pripona = 3, popis = 254,}
	/**DBTABLE:gindgdt*/
	interface GGinsgdtContentDto {
		/**DBCOLUMN:gindgdt.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:gindgdt.soubor*/
		soubor?: string|null;
		content?: string|null;
	}
	const enum GGinsgdtContentDtoNames { ixs_gdt = "ixs_gdt", soubor = "soubor", content = "content",}
	const enum GGinsgdtContentDtoFragments { ixs_gdt = "*", soubor = "*", content = "*",}
	const enum GGinsgdtContentDtoTypes { ixs_gdt = "string", soubor = "string", content = "string",}
	const enum GGinsgdtContentDtoTypeLengths { ixs_gdt = 12, soubor = 200,}
	/**Filtry pro požadavky na budování LISTu souborů obsažených v GdzBalicku*/
	const enum GGindgdtFilterEnum {
		/**PK tabulky - ID balíčku*/
		ixs_gdt,
		/**Jméno souboru*/
		soubor,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGLicDatabaze.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**gdesdbo - deklarace licence databáze
	* @domain Distribuce
	*/
	interface LicDatabaze {
		/**Read*/
		read(rq?:Gordic.Adt.Interface.GGdesdboDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesdboDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesdboDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesdboDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdboDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LicDatabaze: ServiceBase & Catalog.LicDatabaze;
	}
	const LicDatabaze: Client["LicDatabaze"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesdbo*/
	interface GGdesdboDto {
		/**DBCOLUMN:gdesdbo.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdesdbo.priz_d*/
		priz_d?: number|null;
		/**DBCOLUMN:gdesdbo.db_guid*/
		db_guid?: string|null;
		/**DBCOLUMN:gdesdbo.ico*/
		ico?: string|null;
		/**DBCOLUMN:gdesdbo.typ_db*/
		typ_db?: string|null;
		/**DBCOLUMN:gdesdbo.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesdbo.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesdbo.revize_adz*/
		revize_adz?: number|null;
		/**DBCOLUMN:gdesdbo.typ_inst*/
		typ_inst?: number|null;
		/**DBCOLUMN:gdesdbo.priz_archiv*/
		priz_archiv?: number|null;
		/**DBCOLUMN:gdesdbo.kultura*/
		kultura?: number|null;
		/**DBCOLUMN:gdesdbo.gin_typ_inst*/
		gin_typ_inst?: string|null;
		/**DBCOLUMN:gdesdbo.priz_multikult*/
		priz_multikult?: number|null;
		/**DBCOLUMN:gdesdbo.priz_azure*/
		priz_azure?: number|null;
		/**DBCOLUMN:gdesdbo.priz_unicode*/
		priz_unicode?: number|null;
		/**DBCOLUMN:gdesdbo.edi*/
		edi?: string|null;
		/**DBCOLUMN:gdesdbo.idle_ping*/
		idle_ping?: number|null;
		/**DBCOLUMN:gdesdbo.servername*/
		servername?: string|null;
		/**DBCOLUMN:gdesdbo.db_name*/
		db_name?: string|null;
		/**DBCOLUMN:gdesdbo.dat_test_od*/
		dat_test_od?: JsonDate|null;
		/**DBCOLUMN:gdesdbo.mail_adl*/
		mail_adl?: string|null;
		/**DBCOLUMN:gdesdbo.tel_adl*/
		tel_adl?: string|null;
		/**DBCOLUMN:gdesdbo.pozn_adl*/
		pozn_adl?: string|null;
		/**DBCOLUMN:gdesdbo.mail_chyby*/
		mail_chyby?: string|null;
		/**DBCOLUMN:gdesdbo.tel_chyby*/
		tel_chyby?: string|null;
		/**DBCOLUMN:gdesdbo.pozn_chyby*/
		pozn_chyby?: string|null;
		/**Počet registrovaných spuštění balíčků pro tuto licenci na ostré databázi*/
		pocet_historie_spusteni?: number|null;
	}
	const enum GGdesdboDtoNames { lic = "lic", priz_d = "priz_d", db_guid = "db_guid", ico = "ico", typ_db = "typ_db", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", typ_inst = "typ_inst", priz_archiv = "priz_archiv", kultura = "kultura", gin_typ_inst = "gin_typ_inst", priz_multikult = "priz_multikult", priz_azure = "priz_azure", priz_unicode = "priz_unicode", edi = "edi", idle_ping = "idle_ping", servername = "servername", db_name = "db_name", dat_test_od = "dat_test_od", mail_adl = "mail_adl", tel_adl = "tel_adl", pozn_adl = "pozn_adl", mail_chyby = "mail_chyby", tel_chyby = "tel_chyby", pozn_chyby = "pozn_chyby", pocet_historie_spusteni = "pocet_historie_spusteni",}
	const enum GGdesdboDtoFragments { lic = "*", priz_d = "*", db_guid = "*", ico = "*", typ_db = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*", typ_inst = "*", priz_archiv = "*", kultura = "*", gin_typ_inst = "*", priz_multikult = "*", priz_azure = "*", priz_unicode = "*", edi = "*", idle_ping = "*", servername = "*", db_name = "*", dat_test_od = "*", mail_adl = "*", tel_adl = "*", pozn_adl = "*", mail_chyby = "*", tel_chyby = "*", pozn_chyby = "*", pocet_historie_spusteni = "count",}
	const enum GGdesdboDtoTypes { lic = "string", priz_d = "number", db_guid = "string", ico = "string", typ_db = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number", typ_inst = "number", priz_archiv = "number", kultura = "number", gin_typ_inst = "string", priz_multikult = "number", priz_azure = "number", priz_unicode = "number", edi = "string", idle_ping = "number", servername = "string", db_name = "string", dat_test_od = "JsonDate", mail_adl = "string", tel_adl = "string", pozn_adl = "string", mail_chyby = "string", tel_chyby = "string", pozn_chyby = "string", pocet_historie_spusteni = "number",}
	const enum GGdesdboDtoTypeLengths { lic = 4, db_guid = 36, ico = 10, typ_db = 3, gin_typ_inst = 3, edi = 1, servername = 100, db_name = 100, mail_adl = 254, tel_adl = 254, pozn_adl = 254, mail_chyby = 254, tel_chyby = 254, pozn_chyby = 254,}
	/**Filtry pro požadavky na budování LISTu LICencí databází*/
	const enum GGdesdboFilterEnum {
		/**PK tabulky - licence databáze*/
		lic,
		/**Příznak demo databáze - zatím nevyužito*/
		priz_d,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\IGVerzeDatabaze.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na Verze databaze
	* @domain Distribuce
	*/
	interface VerzeDatabaze {
		/**Zalozeni / Update zaznamu - Verze databazi GINIS (tabulka gdesver)*/
		insertUpdateVerzeDatabaze(rq?:Gordic.Adt.Interface.GGdesverDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesverDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesverDto>,void>;
		/**Zruseni zaznamu - Verze databazi GINIS (tabulka gdesver)*/
		deleteVerzeDatabaze(rq?:Gordic.Adt.Interface.GGdesverDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesverDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesverDto>,void>;
		/**Zalozeni / Update zaznamu - Subverze databazi GINIS (tabulka gdessve)*/
		insertUpdateSubverzeDatabaze(rq?:Gordic.Adt.Interface.GGdessveDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdessveDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdessveDto>,void>;
		/**Metoda List pro seznam Aktuálně otevřené reinstalační balíky*/
		listReinstBal(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesgdzDto>>;
		/**Metoda List pro seznam Obsah reinstalacniho baliku*/
		listObsahReinstBal(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedgdzDto>>;
		/**Metoda List pro seznam Verze databazi*/
		listVerzeDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesverDto>>;
		/**Metoda List pro seznam Revizí databazi*/
		listRevizeDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesadzDto>>;
		/**Metoda List pro seznam Verze a subverze*/
		listVerzeSubverze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdessveDto>>;
		/**Metoda List pro seznam Vydane verze databaze*/
		listVydaneVerzeDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesadzDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VerzeDatabaze: ServiceBase & Catalog.VerzeDatabaze;
	}
	const VerzeDatabaze: Client["VerzeDatabaze"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesver*/
	interface GGdesverDto {
		/**DBCOLUMN:gdesver.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesver.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdesver.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdesver.stav_verze*/
		stav_verze?: number|null;
		/**DBCOLUMN:gdesver.poznamka*/
		poznamka?: string|null;
	}
	const enum GGdesverDtoNames { verze_db = "verze_db", dat_od = "dat_od", dat_do = "dat_do", stav_verze = "stav_verze", poznamka = "poznamka",}
	const enum GGdesverDtoFragments { verze_db = "*", dat_od = "*", dat_do = "*", stav_verze = "*", poznamka = "*",}
	const enum GGdesverDtoTypes { verze_db = "number", dat_od = "JsonDate", dat_do = "JsonDate", stav_verze = "number", poznamka = "string",}
	const enum GGdesverDtoTypeLengths { poznamka = 254,}
	/**DBTABLE:gdesgdz*/
	interface GGdesgdzDto {
		/**DBCOLUMN:gdesgdz.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesgdz.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesgdz.revize_adz*/
		revize_adz?: number|null;
		/**DBCOLUMN:gdesgdz.db_target*/
		db_target?: string|null;
		/**DBCOLUMN:gdeagdz.dat_od*/
		vyvoj_od?: JsonDate|null;
		/**DBCOLUMN:gdesadz.dat_od*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdeagdz.dat_od*/
		dat_od?: JsonDate|null;
	}
	const enum GGdesgdzDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", db_target = "db_target", vyvoj_od = "vyvoj_od", dat_do = "dat_do", dat_od = "dat_od",}
	const enum GGdesgdzDtoFragments { verze_db = "*", sub_verze_db = "*", revize_adz = "*", db_target = "*", vyvoj_od = "*", dat_do = "*", dat_od = "*",}
	const enum GGdesgdzDtoTypes { verze_db = "number", sub_verze_db = "number", revize_adz = "number", db_target = "string", vyvoj_od = "JsonDate", dat_do = "JsonDate", dat_od = "JsonDate",}
	const enum GGdesgdzDtoTypeLengths { db_target = 5,}
	/**DBTABLE:gdedgdz*/
	interface GGdedgdzDto {
		/**DBCOLUMN:gdedgdz.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdedgdz.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdedgdz.revize_adz*/
		revize_adz?: number|null;
		/**DBCOLUMN:gdesgdz.db_target*/
		db_target?: string|null;
		/**DBCOLUMN:gdedgdz.typ_obj_gdz*/
		typ_obj_gdz?: number|null;
		/**DBCOLUMN:gdedgdz.obj_gdz*/
		obj_gdz?: string|null;
		/**DBCOLUMN:gdedgdz.svn_id*/
		svn_id?: JsonDecimal|null;
		/**Čase zveřejnění*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdedgdz.orj_autor*/
		orj_autor?: string|null;
		/**DBCOLUMN:gdedgdz.mail_from*/
		mail_from?: string|null;
		/**DBCOLUMN:gdedgdz.messageid*/
		messageid?: string|null;
		/**DBCOLUMN:gdedgdz.verze_obj*/
		verze_obj?: number|null;
		/**DBCOLUMN:gdedgdz.sub_verze_obj*/
		sub_verze_obj?: number|null;
		/**DBCOLUMN:gdedgdz.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:gdedgdz.autor*/
		autor?: string|null;
		/**DBCOLUMN:gdedgdz.komentar*/
		komentar?: string|null;
		/**DBCOLUMN:gdedgdz.archiv_file*/
		archiv_file?: string|null;
	}
	const enum GGdedgdzDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", db_target = "db_target", typ_obj_gdz = "typ_obj_gdz", obj_gdz = "obj_gdz", svn_id = "svn_id", dat_zmena = "dat_zmena", orj_autor = "orj_autor", mail_from = "mail_from", messageid = "messageid", verze_obj = "verze_obj", sub_verze_obj = "sub_verze_obj", por_cislo = "por_cislo", autor = "autor", komentar = "komentar", archiv_file = "archiv_file",}
	const enum GGdedgdzDtoFragments { verze_db = "*", sub_verze_db = "*", revize_adz = "*", db_target = "*", typ_obj_gdz = "*", obj_gdz = "*", svn_id = "*", dat_zmena = "*", orj_autor = "*", mail_from = "*", messageid = "*", verze_obj = "*", sub_verze_obj = "*", por_cislo = "*", autor = "*", komentar = "*", archiv_file = "*",}
	const enum GGdedgdzDtoTypes { verze_db = "number", sub_verze_db = "number", revize_adz = "number", db_target = "string", typ_obj_gdz = "number", obj_gdz = "string", svn_id = "JsonDecimal", dat_zmena = "JsonDate", orj_autor = "string", mail_from = "string", messageid = "string", verze_obj = "number", sub_verze_obj = "number", por_cislo = "number", autor = "string", komentar = "string", archiv_file = "string",}
	const enum GGdedgdzDtoTypeLengths { db_target = 5, obj_gdz = 100, orj_autor = 4, mail_from = 100, messageid = 100, autor = 50, komentar = 4000, archiv_file = 1000,}
	/**DBTABLE:gdessve*/
	interface GGdessveDto {
		/**DBCOLUMN:gdessve.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdessve.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdessve.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdessve.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdessve.stav_subverze*/
		stav_subverze?: number|null;
		/**DBCOLUMN:gdessve.poznamka*/
		poznamka?: string|null;
	}
	const enum GGdessveDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db", dat_od = "dat_od", dat_do = "dat_do", stav_subverze = "stav_subverze", poznamka = "poznamka",}
	const enum GGdessveDtoFragments { verze_db = "*", sub_verze_db = "*", dat_od = "*", dat_do = "*", stav_subverze = "*", poznamka = "*",}
	const enum GGdessveDtoTypes { verze_db = "number", sub_verze_db = "number", dat_od = "JsonDate", dat_do = "JsonDate", stav_subverze = "number", poznamka = "string",}
	const enum GGdessveDtoTypeLengths { poznamka = 254,}
	/**DBTABLE:gdesadz*/
	interface GGdesadzDto {
		/**DBCOLUMN:gdesadz.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesadz.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesadz.revize_adz*/
		revize_adz?: number|null;
		/**DBCOLUMN:gdesadz.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdesadz.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdesadz.stav_rev_adz*/
		stav_rev_adz?: number|null;
		/**Stav revize adz - textově*/
		stav_rev_adz_txt?: string|null;
		/**DBCOLUMN:gdesadz.poznamka*/
		poznamka?: string|null;
		/**Revize databaze = verze_dbXXXsub_verze_dbxrevize_adz (524XXX003x25)*/
		revize_db?: string|null;
	}
	const enum GGdesadzDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", dat_od = "dat_od", dat_do = "dat_do", stav_rev_adz = "stav_rev_adz", stav_rev_adz_txt = "stav_rev_adz_txt", poznamka = "poznamka", revize_db = "revize_db",}
	const enum GGdesadzDtoFragments { verze_db = "*", sub_verze_db = "*", revize_adz = "*", dat_od = "*", dat_do = "*", stav_rev_adz = "*", stav_rev_adz_txt = "*", poznamka = "*", revize_db = "*",}
	const enum GGdesadzDtoTypes { verze_db = "number", sub_verze_db = "number", revize_adz = "number", dat_od = "JsonDate", dat_do = "JsonDate", stav_rev_adz = "number", stav_rev_adz_txt = "string", poznamka = "string", revize_db = "string",}
	const enum GGdesadzDtoTypeLengths { stav_rev_adz_txt = 100, poznamka = 254, revize_db = 12,}
	/**Možné položky filtru pro seznam ulohy Licence rad PID*/
	const enum GVerzeDatabazeFilterEnum {
		/**filtr na verzi DB*/
		verze_db,
		/**filtr na sub verzi DB*/
		sub_verze_db,
		/**filtr na pocatek platnosti*/
		dat_od,
		/**filtr na konec platnosti*/
		dat_do,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr na aktualne otevrene reinstalacni baliky (boolean)*/
		aktualne_otevrene,
		/**filtr na DB stroj*/
		inf,
		/**filtr na DB stroj*/
		ora,
		/**filtr na DB stroj*/
		mss,
		/**filtr na revizi subverze DB*/
		revize_adz,
		/**filtr na cílovou DB*/
		db_target,
		/**Přiznak roznasobeni selectu dle typu cilove databaze (true/false)*/
		multi_db,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Authenticator\IGAuthenticator.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Authenticator
	* @domain CentralAdmin
	* @businessObject GGdelexpDto
	*/
	interface Authenticator {
		/**Metoda List - Historie provedených Generování ověřovacích kódů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdelexpDto>>;
		/**Založení/Update Balíku licencí*/
		upsert(rq?:Gordic.Adt.Interface.GGdelexpDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdelexpDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdelexpDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdelexpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Authenticator: ServiceBase & Catalog.Authenticator;
	}
	const Authenticator: Client["Authenticator"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdelexpto - Hlavní datový objekt pro Authenticator expertního režimu*/
	interface GGdelexpDto {
		/**Pořadové číslo generování*/
		ser_cislo?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Level přístupné úlohy fáze*/
		level_exp?: number|null;
		/**Level přístupné úlohy fáze - textově*/
		level_exp_txt?: string|null;
		/**ixs_ref přihlášeného uživatele*/
		ixs_ref?: string|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdelexpDtoNames { ser_cislo = "ser_cislo", lic = "lic", faze = "faze", level_exp = "level_exp", level_exp_txt = "level_exp_txt", ixs_ref = "ixs_ref", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdelexpDtoFragments { ser_cislo = "*", lic = "*", faze = "*", level_exp = "*", level_exp_txt = "*", ixs_ref = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdelexpDtoTypes { ser_cislo = "number", lic = "string", faze = "string", level_exp = "number", level_exp_txt = "string", ixs_ref = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdelexpDtoTypeLengths { lic = 4, faze = 8, level_exp_txt = 8, ixs_ref = 12, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro Authenticator*/
	const enum GAuthenticatorFilterEnum {
		/**filtr na licenci databáze*/
		lic,
		/**filtr na programovou fázi*/
		faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Automat\IGAutPozadavek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Pozadavek na automat SP
	*     
	* @domain Distribuce
	*/
	interface AutPozadavek {
		/**
		*     Získání contentu pozadavku automatu
		*     
		*/
		getAutomatRequestContent(rq?:Gordic.Adt.Interface.GAutPozadavekAuttmsgDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>,JsonBlob>;
		/**
		*     Metoda List s daty z Inboxu automatu
		*     
		*/
		listInbox(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>;
		/**
		*     Metoda List s daty z Inboxu - obsahem pozadavku 
		*     
		*/
		listInboxObsahPozadavku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsbDto>>;
		/**
		*     Metoda List pro Outbox - hodina 
		*     
		*/
		listOutboxHodina(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>;
		/**
		*     Metoda List pro Outbox - den 
		*     
		*/
		listOutboxDen(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>;
		/**
		*     Metoda List pro Outbox - tyden 
		*     
		*/
		listOutboxTyden(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>;
		/**
		*     Metoda List pro Outbox - mesic 
		*     
		*/
		listOutboxMesic(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>;
		/**
		*     Metoda List pro Outbox - hodina s obsahem požadavku
		*     
		*/
		listOutboxHodinaObsahPozadavku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsbDto>>;
		/**
		*     Metoda List pro Outbox - den s obsahem požadavku
		*     
		*/
		listOutboxDenObsahPozadavku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsbDto>>;
		/**
		*     Metoda List pro Outbox - tyden s obsahem požadavku
		*     
		*/
		listOutboxTydenObsahPozadavku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsbDto>>;
		/**
		*     Metoda List pro Outbox - mesic s obsahem požadavku
		*     
		*/
		listOutboxMesicObsahPozadavku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsbDto>>;
		/**
		*     Metoda List pro Outbox - rok s obsahem požadavku
		*     
		*/
		listOutboxRokObsahPozadavku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsbDto>>;
		/**
		*     Metoda List pro Outbox - s filtry
		*     
		*/
		listOutboxFilters(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAutPozadavekAuttmsgDto>>;
		/**
		*     Metoda List s daty o ručním uploadu revizí
		*     
		*/
		listUploadRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GUploadRevDto>>;
		/**
		*     Odmazání zadané zprávy - přesun z INBOX do DELETED
		*     
		*/
		deleteMessageInbox(rq?:CallParams<{messageID:string}>): _Task<{messageID:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AutPozadavek: ServiceBase & Catalog.AutPozadavek;
	}
	const AutPozadavek: Client["AutPozadavek"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE: auttmsg*/
	interface GAutPozadavekAuttmsgDto {
		/**Unikátní generované ID mailu / přijaté zprávy*/
		messageid?: string|null;
		/**Identifikace odesilatele ve formě mailové adresy*/
		sender?: string|null;
		/**DBCOLUMN:auttmsg.sender_txt*/
		sender_txt?: string|null;
		/**Nazev souboru*/
		filename?: string|null;
		/**Věc mailu. Pro zpracování SP nepodstatné. Může ale sloužit pro autory pro lepší orientaci, co odeslali a jak to bylo zpracováno atd..*/
		subject?: string|null;
		/**Pro zpracování SP nepodstatné - může pouze sloužit pro lidskou orientaci v mailech*/
		body_txt?: string|null;
		/**DBCOLUMN:auttmsg.dat_odesl*/
		dat_odesl?: JsonDate|null;
		/**DBCOLUMN:auttmsg.dat_prij*/
		dat_prij?: JsonDate|null;
		/**DBCOLUMN:auttmsg.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:auttmsg.attachment_number*/
		attachment_number?: number|null;
		/**DBCOLUMN:auttmsg.status*/
		status?: number|null;
		/**DBCOLUMN:auttmsg.body_is_html*/
		body_is_html?: number|null;
		/**Telo mailu v původní - binární podobě*/
		body?: JsonBlob|null;
		/**Mail v původní - binární podobě*/
		raw_message?: JsonBlob|null;
		/**DBCOLUMN:auttmsg.dat_del*/
		dat_del?: JsonDate|null;
		/**Text odpovědi - popis, jak byly SP zpracovány. Odesílá se mailem na adresu odesilatele po zpracování mailu, nebo po zpracování zprávou přijatou přes WS*/
		respons_txt?: string|null;
		/**DBCOLUMN:auttmsg.respons*/
		respons?: JsonBlob|null;
		/**DBCOLUMN:auttmsg.dat_res*/
		dat_res?: JsonDate|null;
		/**DBCOLUMN:auttmsg.respons_sub*/
		respons_sub?: string|null;
		/**DBCOLUMN:auttmsg.result*/
		result?: number|null;
		address_to?: string|null;
	}
	const enum GAutPozadavekAuttmsgDtoNames { messageid = "messageid", sender = "sender", sender_txt = "sender_txt", filename = "filename", subject = "subject", body_txt = "body_txt", dat_odesl = "dat_odesl", dat_prij = "dat_prij", dat_pod = "dat_pod", attachment_number = "attachment_number", status = "status", body_is_html = "body_is_html", body = "body", raw_message = "raw_message", dat_del = "dat_del", respons_txt = "respons_txt", respons = "respons", dat_res = "dat_res", respons_sub = "respons_sub", result = "result", address_to = "address_to",}
	const enum GAutPozadavekAuttmsgDtoFragments { messageid = "*", sender = "*", sender_txt = "*", filename = "*", subject = "*", body_txt = "*", dat_odesl = "*", dat_prij = "*", dat_pod = "*", attachment_number = "*", status = "*", body_is_html = "*", body = "*", raw_message = "*", dat_del = "*", respons_txt = "*", respons = "*", dat_res = "*", respons_sub = "*", result = "*", address_to = "*",}
	const enum GAutPozadavekAuttmsgDtoTypes { messageid = "string", sender = "string", sender_txt = "string", filename = "string", subject = "string", body_txt = "string", dat_odesl = "JsonDate", dat_prij = "JsonDate", dat_pod = "JsonDate", attachment_number = "number", status = "number", body_is_html = "number", body = "JsonBlob", raw_message = "JsonBlob", dat_del = "JsonDate", respons_txt = "string", respons = "JsonBlob", dat_res = "JsonDate", respons_sub = "string", result = "number", address_to = "string",}
	const enum GAutPozadavekAuttmsgDtoTypeLengths { messageid = 100, sender = 255, sender_txt = 255, filename = 500, subject = 4000, body_txt = 4000, respons_txt = 4000, respons_sub = 4000,}
	/**DBTABLE: auttmsa*/
	interface GAutPozadavekAuttmsaDto {
		/**DBCOLUMN:auttmsa.messageid*/
		messageid?: string|null;
		/**U mailu automatu určuje cílový typ DB stroje a také cílovou verzi GINIS databáze.*/
		address_to?: string|null;
		/**DBCOLUMN:auttmsa.address_to_txt*/
		address_to_txt?: string|null;
		/**DBCOLUMN:auttmsa.address_to_type*/
		address_to_type?: string|null;
	}
	const enum GAutPozadavekAuttmsaDtoNames { messageid = "messageid", address_to = "address_to", address_to_txt = "address_to_txt", address_to_type = "address_to_type",}
	const enum GAutPozadavekAuttmsaDtoFragments { messageid = "*", address_to = "*", address_to_txt = "*", address_to_type = "*",}
	const enum GAutPozadavekAuttmsaDtoTypes { messageid = "string", address_to = "string", address_to_txt = "string", address_to_type = "string",}
	const enum GAutPozadavekAuttmsaDtoTypeLengths { messageid = 100, address_to = 155, address_to_txt = 255, address_to_type = 30,}
	/**DBTABLE: auttmsb*/
	interface GAutPozadavekAuttmsbDto {
		/**DBCOLUMN:auttmsb.messageid*/
		messageid?: string|null;
		/**Strojně generované ID pro připojený soubor*/
		contentid?: string|null;
		/**DBCOLUMN:auttmsb.soubor*/
		soubor?: string|null;
		/**Načteno z definice mailu*/
		contenttype?: string|null;
		/**DBCOLUMN:auttmsb.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:auttmsb.soubor_h*/
		soubor_h?: string|null;
		/**DBCOLUMN:auttmsb.poradi*/
		poradi?: number|null;
		/**Binární podoba připojeného souboru*/
		kopie?: JsonBlob|null;
	}
	const enum GAutPozadavekAuttmsbDtoNames { messageid = "messageid", contentid = "contentid", soubor = "soubor", contenttype = "contenttype", velikost = "velikost", soubor_h = "soubor_h", poradi = "poradi", kopie = "kopie",}
	const enum GAutPozadavekAuttmsbDtoFragments { messageid = "*", contentid = "*", soubor = "*", contenttype = "*", velikost = "*", soubor_h = "*", poradi = "*", kopie = "*",}
	const enum GAutPozadavekAuttmsbDtoTypes { messageid = "string", contentid = "string", soubor = "string", contenttype = "string", velikost = "number", soubor_h = "string", poradi = "number", kopie = "JsonBlob",}
	const enum GAutPozadavekAuttmsbDtoTypeLengths { messageid = 100, contentid = 100, soubor = 255, contenttype = 100, soubor_h = 254,}
	/**DBTABLE:auttmsg - pripraveno pro stahovani contentu pozadavku na Automat*/
	interface GAutPozadavekContentDto {
		/**DBCOLUMN:gdeladl.adl*/
		messageid?: string|null;
		content?: string|null;
		filename?: string|null;
	}
	const enum GAutPozadavekContentDtoNames { messageid = "messageid", content = "content", filename = "filename",}
	const enum GAutPozadavekContentDtoFragments { messageid = "*", content = "*", filename = "*",}
	const enum GAutPozadavekContentDtoTypes { messageid = "string", content = "string", filename = "string",}
	const enum GAutPozadavekContentDtoTypeLengths { messageid = 100,}
	/**DBTABLE:gdelodr - Pro přehled uploadovanych revizí do distribuce*/
	interface GUploadRevDto {
		/**DBCOLUMN:gdelodr.soubor - Název souboru*/
		soubor?: string|null;
		/**DBCOLUMN:gdelodr.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gdelodr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdelodr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**zkratka programové fáze*/
		zkratka?: string|null;
	}
	const enum GUploadRevDtoNames { soubor = "soubor", velikost = "velikost", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", zkratka = "zkratka",}
	const enum GUploadRevDtoFragments { soubor = "*", velikost = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", zkratka = "*",}
	const enum GUploadRevDtoTypes { soubor = "string", velikost = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", zkratka = "string",}
	const enum GUploadRevDtoTypeLengths { soubor = 254, zmenu_prov = 12, zmenil = 100, zkratka = 3,}
	const enum GAutPozadavekFilterEnum {
		/**
		*     Unikátní generované ID mailu / přijaté zprávy
		*     
		*/
		messageid,
		/**
		*     filtr pro rozsah pozadavku
		*     
		*/
		priorita_gdt,
		/**
		*     filtr pro verzi pozadavku
		*     
		*/
		Verze,
		/**
		*     filtr pro typ DB INF
		*     
		*/
		Inf,
		/**
		*     filtr pro typ DB ORA
		*     
		*/
		Ora,
		/**
		*     filtr pro typ DB MSS
		*     
		*/
		Mss,
		/**
		*     filtr pro typ SPG
		*     
		*/
		Spg,
		/**
		*     filtr pro typ Adl (diagnostické soubory)
		*     
		*/
		Adl,
		/**
		*     filtr pro typ typ vyvojarske verze - vyber z radio buttons
		*     
		*/
		Radio,
		/**
		*     filtr na autora pozadavku pro automat
		*     
		*/
		Sender,
		/**
		*     filtr pro rozsah data z políčka intervalBoxu
		*     
		*/
		intervalBox,
		/**
		*     Unikátní generované contentu požadavku automatu
		*     
		*/
		contentid,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\CenikProduktu\IGBalikyProduktu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Balíky produktů, (Produkt = Položka + Podpoložka)
	* @domain Distribuce
	*/
	interface BalikyProduktu {
		/**Metoda List - Seznam Balíků produktů (obsah tabulky gdesbpr)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesbprDto>>;
		/**Metoda Read pro detail Balíku produktů (čtení obsahu tabulky gdesbpr)*/
		read(rq?:Gordic.Adt.Interface.GGdesbprDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesbprDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesbprDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesbprDto>>;
		/**Založení/Update Balíku produktů*/
		upsert(rq?:Gordic.Adt.Interface.GGdesbprDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesbprDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesbprDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesbprDto>>;
		/**Metoda List pro seznam Produkty*/
		listProdukty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevbprDto>>;
		/**Insert / Update seznamu Baliky produktu*/
		insertUpdateBalikyProduktu(rq?:Gordic.Adt.Interface.GGdesbprDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesbprDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesbprDto>,void>;
		/**Zalozeni / Update zaznamu - Produkty (tabulka gdevbpr)*/
		insertUpdateProdukty(rq?:Gordic.Adt.Interface.GGdevbprDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevbprDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevbprDto>,void>;
		/**Zruseni zaznamu - Produkty (tabulka gdevbpr)*/
		deleteProdukty(rq?:Gordic.Adt.Interface.GGdevbprDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevbprDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevbprDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BalikyProduktu: ServiceBase & Catalog.BalikyProduktu;
	}
	const BalikyProduktu: Client["BalikyProduktu"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdesbprDto - Hlavní datový objekt Balíku produktů (tabulka gdesbpr)*/
	interface GGdesbprDto {
		/**Identifikátor balíku produktů*/
		ixs_bpr?: string|null;
		/**Název balíku produktů*/
		nazev?: string|null;
		/**Zkratka Balíku produktů*/
		zkratka?: string|null;
		/**Poznámka k balíku produktů*/
		poznamka?: string|null;
		/**Aktivita Balíku produktů*/
		aktivita?: number|null;
		/**Datum změny Balíku produktů*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesbprDtoNames { ixs_bpr = "ixs_bpr", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesbprDtoFragments { ixs_bpr = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesbprDtoTypes { ixs_bpr = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesbprDtoTypeLengths { ixs_bpr = 12, nazev = 254, zkratka = 16, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdevbprDto - datový objekt Produktu (ceníkové Položky a Podpoložky) obsaženého v Balíku produktů*/
	interface GGdevbprDto {
		/**Identifikátor Balíku produktů*/
		ixs_bpr?: string|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**Aktivita produktu*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevbprDtoNames { ixs_bpr = "ixs_bpr", pol = "pol", ppol = "ppol", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevbprDtoFragments { ixs_bpr = "*", pol = "*", ppol = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevbprDtoTypes { ixs_bpr = "string", pol = "string", ppol = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevbprDtoTypeLengths { ixs_bpr = 12, pol = 4, ppol = 3, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtrů pro ulohu Baliky produktu*/
	const enum GBalikyProduktuFilterEnum {
		/**filtr na identifikátor Baliku produktu*/
		ixs_bpr,
		/**filtr na nazev baliku produktu*/
		nazev,
		/**filtr na zkratku baliku produktu*/
		zkratka,
		/**filtr na poznamku baliku produktu*/
		poznamka,
		/**filtr na aktivitu polozky*/
		aktivita,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_cenik*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\CenikProduktu\IGCeniky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Ceníky, (Ceníky Produktů GORDIC)
	* @domain Distribuce
	*/
	interface Ceniky {
		/**Metoda List - Seznam Ceníků GORDIC(obsah tabulky gdesccm)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesccmDto>>;
		/**Metoda Read pro detail Ceníku (čtení obsahu tabulky gdesccm)*/
		read(rq?:Gordic.Adt.Interface.GGdesccmDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesccmDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesccmDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesccmDto>>;
		/**Založení/Update Ceníku*/
		upsert(rq?:Gordic.Adt.Interface.GGdesccmDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesccmDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesccmDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesccmDto>>;
		/**Metoda List - Obsah ceniku*/
		listObsahCeniku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedccmDto>>;
		/**Metoda List - Polozky*/
		listCenikPolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedccmDto>>;
		/**Zalozeni zaznamu - Cenik( tabulka gdesgce)*/
		insertUpdateCeniky(rq?:Gordic.Adt.Interface.GGdesccmDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesccmDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesccmDto>,void>;
		/**Zalozeni / Update zaznamu - Obsah ceniku*/
		insertUpdateObsahCeniku(rq?:Gordic.Adt.Interface.GGdedccmDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,void>;
		/**Zruseni zaznamu - Ceniky*/
		deleteCeniky(rq?:Gordic.Adt.Interface.GGdesccmDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesccmDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesccmDto>,void>;
		/**Zruseni zaznamu - Obsah ceniku*/
		deleteObsahCeniku(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,vyberRadkuObsahuCeniku:Gordic.Adt.Interface.GGdedccmDto[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,vyberRadkuObsahuCeniku:Gordic.Adt.Interface.GGdedccmDto[]},void>;
		/**Zalozeni / Update zaznamu - Polozky na detailu ceniku ( tabulka gdedccp)*/
		insertUpdateCenikPolozky(rq?:Gordic.Adt.Interface.GGdedccmDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,void>;
		/**Zruseni zaznamu - Polozky na detailu ceniku ( tabulka gdedccp)*/
		deleteCenikPolozky(rq?:Gordic.Adt.Interface.GGdedccmDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,void>;
		/**Seznam s udaji o porovnani obsahu ceníků*/
		listCompareCeniky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedccmCompareDto>>;
		/**Hromadny update vice Podpolozek z obsahu ceniku*/
		updateVyberObsahCeniku(rq?:CallParams<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,vyberPolozek:string[],vyberPodpolozek:string[]}>): _Task<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdedccmDto>,vyberPolozek:string[],vyberPodpolozek:string[]},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ceniky: ServiceBase & Catalog.Ceniky;
	}
	const Ceniky: Client["Ceniky"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdesccmDto - Ceníky produktů GORDIC*/
	interface GGdesccmDto {
		/**Identifikátor ceníku GORDIC*/
		ixp_ccm?: string|null;
		/**Vzor ceníku (použit v případě akce pro tvorbu nového ceníku kopií z...)*/
		ixp_ccm_vzor?: string|null;
		/**Typ ceníku (jedná se o vzor, ze kterého byl ceník vytvořen)*/
		typ_ccm?: string|null;
		/**Odkaz do tabulky gdesgce s původními ceníky GORDIC*/
		gcenik?: number|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Název ceníku*/
		nazev?: string|null;
		/**Poznámka k ceníku*/
		poznamka?: string|null;
		/**Aktivita ceníku*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Priznak noveho ceniku*/
		novy_cenik?: boolean|null;
	}
	const enum GGdesccmDtoNames { ixp_ccm = "ixp_ccm", ixp_ccm_vzor = "ixp_ccm_vzor", typ_ccm = "typ_ccm", gcenik = "gcenik", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", novy_cenik = "novy_cenik",}
	const enum GGdesccmDtoFragments { ixp_ccm = "*", ixp_ccm_vzor = "*", typ_ccm = "*", gcenik = "*", dat_od = "*", dat_do = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", novy_cenik = "*",}
	const enum GGdesccmDtoTypes { ixp_ccm = "string", ixp_ccm_vzor = "string", typ_ccm = "string", gcenik = "number", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", novy_cenik = "boolean",}
	const enum GGdesccmDtoTypeLengths { ixp_ccm = 12, ixp_ccm_vzor = 12, typ_ccm = 254, nazev = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdesgceDto - Původní ceníky GORDIC*/
	interface GGdesgceDto {
		/**Identifikátor původního ceníku*/
		gcenik?: number|null;
		/**Název ceníku*/
		nazev?: string|null;
		/**Zkratka ceníku*/
		zkratka?: string|null;
		/**Edice ceníku*/
		edi?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti*/
		dat_do?: JsonDate|null;
		/**Aktivita ceníku*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesgceDtoNames { gcenik = "gcenik", nazev = "nazev", zkratka = "zkratka", edi = "edi", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesgceDtoFragments { gcenik = "*", nazev = "*", zkratka = "*", edi = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesgceDtoTypes { gcenik = "number", nazev = "string", zkratka = "string", edi = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesgceDtoTypeLengths { nazev = 254, zkratka = 16, edi = 1, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdedccmDto - Obsah ceníku (v ceníku jsou obsaženy jednotlivé položky a podpoložky tvořící produkt)*/
	interface GGdedccmDto {
		/**Identifikátor ceníku*/
		ixp_ccm?: string|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Popis ceníkové položky*/
		polPopis?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**Popis produktu (kombinace Pol + PPol)*/
		popis?: string|null;
		/**Vzorová ceníková položka*/
		polVzor?: string|null;
		/**Cena produktu (kombinace Pol + PPol)*/
		c?: JsonDecimal|null;
		/**Povoleni menit cenu (pro hromadnou upravu podpolozek)*/
		c_enable?: boolean|null;
		/**Typ ceny (% = cena vyjádřená procentuálně / IND = individuální cena / Kč = cena uvedená v korunách)*/
		typ_cen?: string|null;
		/**Povoleni menit typ ceny (pro hromadnou upravu podpolozek)*/
		typ_cen_enable?: boolean|null;
		/**Poslední změna záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Priznak noveho radku*/
		novy_radek?: boolean|null;
		/**Priznak tabulky gdedccm*/
		gdedccm?: boolean|null;
		/**priznak vybranych radku*/
		checkedRows?: boolean|null;
	}
	const enum GGdedccmDtoNames { ixp_ccm = "ixp_ccm", pol = "pol", polPopis = "polPopis", ppol = "ppol", popis = "popis", polVzor = "polVzor", c = "c", c_enable = "c_enable", typ_cen = "typ_cen", typ_cen_enable = "typ_cen_enable", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", novy_radek = "novy_radek", gdedccm = "gdedccm", checkedRows = "checkedRows",}
	const enum GGdedccmDtoFragments { ixp_ccm = "*", pol = "*", polPopis = "*", ppol = "*", popis = "*", polVzor = "*", c = "*", c_enable = "*", typ_cen = "*", typ_cen_enable = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", novy_radek = "*", gdedccm = "*", checkedRows = "*",}
	const enum GGdedccmDtoTypes { ixp_ccm = "string", pol = "string", polPopis = "string", ppol = "string", popis = "string", polVzor = "string", c = "JsonDecimal", c_enable = "boolean", typ_cen = "string", typ_cen_enable = "boolean", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", novy_radek = "boolean", gdedccm = "boolean", checkedRows = "boolean",}
	const enum GGdedccmDtoTypeLengths { ixp_ccm = 12, pol = 4, polPopis = 254, ppol = 3, popis = 254, polVzor = 4, typ_cen = 3, zmenu_prov = 12, zmenil = 100,}
	/**GGdevprzDto - Základ procentuální ceny Produktu*/
	interface GGdevprzDto {
		/**Ceníková položka*/
		pol?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**Položka základu*/
		pol_zaklad?: string|null;
		/**Podpoložka základu*/
		ppol_zaklad?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevprzDtoNames { pol = "pol", ppol = "ppol", pol_zaklad = "pol_zaklad", ppol_zaklad = "ppol_zaklad", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevprzDtoFragments { pol = "*", ppol = "*", pol_zaklad = "*", ppol_zaklad = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevprzDtoTypes { pol = "string", ppol = "string", pol_zaklad = "string", ppol_zaklad = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevprzDtoTypeLengths { pol = 4, ppol = 3, pol_zaklad = 4, ppol_zaklad = 3, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdedccmCompareDto - DTO pro jednotlivé obsahy ceníků*/
	interface GGdedccmCompareDto {
		/**Identifikátor ceníku*/
		ixp_ccm?: string|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Popis ceníkové položky*/
		polPopis?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**Popis produktu (kombinace Pol + PPol)*/
		ppolPopis?: string|null;
		/**Cena produktu (kombinace Pol + PPol)*/
		c?: JsonDecimal|null;
		/**Povoleni menit cenu (pro hromadnou upravu podpolozek)*/
		c_enable?: boolean|null;
		/**Typ ceny (% = cena vyjádřená procentuálně / IND = individuální cena / Kč = cena uvedená v korunách)*/
		typ_cen?: string|null;
		/**Povoleni menit typ ceny (pro hromadnou upravu podpolozek)*/
		typ_cen_enable?: boolean|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol0?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol1?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol2?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol3?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol4?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol5?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol6?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol7?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol8?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol9?: string|null;
		/**Pomocny objekt pro porovnani obsahu ceniku*/
		comparePpol10?: string|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol0?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol1?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol2?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol3?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol4?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol5?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol6?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol7?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol8?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol9?: JsonDecimal|null;
		/**Cena produktu obsazeneho v ceníku*/
		cPpol10?: JsonDecimal|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol0?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol1?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol2?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol3?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol4?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol5?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol6?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol7?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol8?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol9?: string|null;
		/**Typ Ceny produktu obsazeneho v ceníku*/
		typ_cenPpol10?: string|null;
	}
	const enum GGdedccmCompareDtoNames { ixp_ccm = "ixp_ccm", pol = "pol", polPopis = "polPopis", ppol = "ppol", ppolPopis = "ppolPopis", c = "c", c_enable = "c_enable", typ_cen = "typ_cen", typ_cen_enable = "typ_cen_enable", comparePpol0 = "comparePpol0", comparePpol1 = "comparePpol1", comparePpol2 = "comparePpol2", comparePpol3 = "comparePpol3", comparePpol4 = "comparePpol4", comparePpol5 = "comparePpol5", comparePpol6 = "comparePpol6", comparePpol7 = "comparePpol7", comparePpol8 = "comparePpol8", comparePpol9 = "comparePpol9", comparePpol10 = "comparePpol10", cPpol0 = "cPpol0", cPpol1 = "cPpol1", cPpol2 = "cPpol2", cPpol3 = "cPpol3", cPpol4 = "cPpol4", cPpol5 = "cPpol5", cPpol6 = "cPpol6", cPpol7 = "cPpol7", cPpol8 = "cPpol8", cPpol9 = "cPpol9", cPpol10 = "cPpol10", typ_cenPpol0 = "typ_cenPpol0", typ_cenPpol1 = "typ_cenPpol1", typ_cenPpol2 = "typ_cenPpol2", typ_cenPpol3 = "typ_cenPpol3", typ_cenPpol4 = "typ_cenPpol4", typ_cenPpol5 = "typ_cenPpol5", typ_cenPpol6 = "typ_cenPpol6", typ_cenPpol7 = "typ_cenPpol7", typ_cenPpol8 = "typ_cenPpol8", typ_cenPpol9 = "typ_cenPpol9", typ_cenPpol10 = "typ_cenPpol10",}
	const enum GGdedccmCompareDtoFragments { ixp_ccm = "*", pol = "*", polPopis = "*", ppol = "*", ppolPopis = "*", c = "*", c_enable = "*", typ_cen = "*", typ_cen_enable = "*", comparePpol0 = "*", comparePpol1 = "*", comparePpol2 = "*", comparePpol3 = "*", comparePpol4 = "*", comparePpol5 = "*", comparePpol6 = "*", comparePpol7 = "*", comparePpol8 = "*", comparePpol9 = "*", comparePpol10 = "*", cPpol0 = "*", cPpol1 = "*", cPpol2 = "*", cPpol3 = "*", cPpol4 = "*", cPpol5 = "*", cPpol6 = "*", cPpol7 = "*", cPpol8 = "*", cPpol9 = "*", cPpol10 = "*", typ_cenPpol0 = "*", typ_cenPpol1 = "*", typ_cenPpol2 = "*", typ_cenPpol3 = "*", typ_cenPpol4 = "*", typ_cenPpol5 = "*", typ_cenPpol6 = "*", typ_cenPpol7 = "*", typ_cenPpol8 = "*", typ_cenPpol9 = "*", typ_cenPpol10 = "*",}
	const enum GGdedccmCompareDtoTypes { ixp_ccm = "string", pol = "string", polPopis = "string", ppol = "string", ppolPopis = "string", c = "JsonDecimal", c_enable = "boolean", typ_cen = "string", typ_cen_enable = "boolean", comparePpol0 = "string", comparePpol1 = "string", comparePpol2 = "string", comparePpol3 = "string", comparePpol4 = "string", comparePpol5 = "string", comparePpol6 = "string", comparePpol7 = "string", comparePpol8 = "string", comparePpol9 = "string", comparePpol10 = "string", cPpol0 = "JsonDecimal", cPpol1 = "JsonDecimal", cPpol2 = "JsonDecimal", cPpol3 = "JsonDecimal", cPpol4 = "JsonDecimal", cPpol5 = "JsonDecimal", cPpol6 = "JsonDecimal", cPpol7 = "JsonDecimal", cPpol8 = "JsonDecimal", cPpol9 = "JsonDecimal", cPpol10 = "JsonDecimal", typ_cenPpol0 = "string", typ_cenPpol1 = "string", typ_cenPpol2 = "string", typ_cenPpol3 = "string", typ_cenPpol4 = "string", typ_cenPpol5 = "string", typ_cenPpol6 = "string", typ_cenPpol7 = "string", typ_cenPpol8 = "string", typ_cenPpol9 = "string", typ_cenPpol10 = "string",}
	const enum GGdedccmCompareDtoTypeLengths { ixp_ccm = 12, pol = 4, polPopis = 254, ppol = 3, ppolPopis = 254, typ_cen = 3, comparePpol0 = 10, comparePpol1 = 10, comparePpol2 = 10, comparePpol3 = 10, comparePpol4 = 10, comparePpol5 = 10, comparePpol6 = 10, comparePpol7 = 10, comparePpol8 = 10, comparePpol9 = 10, comparePpol10 = 10, typ_cenPpol0 = 3, typ_cenPpol1 = 3, typ_cenPpol2 = 3, typ_cenPpol3 = 3, typ_cenPpol4 = 3, typ_cenPpol5 = 3, typ_cenPpol6 = 3, typ_cenPpol7 = 3, typ_cenPpol8 = 3, typ_cenPpol9 = 3, typ_cenPpol10 = 3,}
	/**Možné položky filtru pro seznam ulohy Ceniky*/
	const enum GCenikyFilterEnum {
		/**filtr na cenik produktu Gordic*/
		gcenik,
		/**filtr na ID ceniku*/
		ixp_ccm,
		/**filtr na typ ceníku*/
		typ_ccm,
		/**filtr na nazev Ceníku*/
		nazev,
		/**filtr na zkratku Ceníku*/
		zkratka,
		/**filtr na edici Ceníku*/
		edi,
		/**filtr na poznamku*/
		poznamka,
		/**filtr na platnost od*/
		dat_od,
		/**filtr na platnost do*/
		dat_do,
		/**filtr na aktivitu Ceníku*/
		aktivita,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_cenik*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr, kterým se omezí výčet kontrolovaných řádků podmínkou ppol menší než 350*/
		produktovePpol,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\CenikProduktu\IGProduktoveListy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Produktové listy, (Produktuvý list slouží pro potřeby vazby na produkty v ceníku)
	* @domain Distribuce
	*/
	interface ProduktoveListy {
		/**Metoda List - Seznam Produktových listů (obsah tabulky gdesprl)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesprlDto>>;
		/**Metoda Read pro detail Produktového listu (čtení obsahu tabulky gdesprl)*/
		read(rq?:Gordic.Adt.Interface.GGdesprlDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesprlDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesprlDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesprlDto>>;
		/**Založení/Update Produktového listu*/
		upsert(rq?:Gordic.Adt.Interface.GGdesprlDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesprlDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesprlDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesprlDto>>;
		/**Zalozeni / Update zaznamu - Souvisejici polozky ( tabulka gdevnpo)*/
		insertUpdateSouvisejiciPolozky(rq?:Gordic.Adt.Interface.GGdevnpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>,void>;
		/**Zruseni zaznamu - Souvisejici polozky*/
		deleteSouvisejiciPolozky(rq?:Gordic.Adt.Interface.GGdevnpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>,void>;
		/**Zalozeni / Update zaznamu - Souvisejici podpolozky ( tabulka gdevpro)*/
		insertUpdateSouvisejiciPodpolozky(rq?:Gordic.Adt.Interface.GGdevproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>,void>;
		/**Zruseni zaznamu - Souvisejici podpolozky*/
		deleteSouvisejiciPodpolozky(rq?:Gordic.Adt.Interface.GGdevproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ProduktoveListy: ServiceBase & Catalog.ProduktoveListy;
	}
	const ProduktoveListy: Client["ProduktoveListy"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdesprlDto - Hlavní datový objekt Produktového listu (tabulka gdesprl)*/
	interface GGdesprlDto {
		/**Identifikátor Produktového listu*/
		id_listu?: number|null;
		/**Název Produktového listu*/
		nazev?: string|null;
		/**Popis Produktového listu*/
		popis?: string|null;
		/**Aktivita Produktového listu*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesprlDtoNames { id_listu = "id_listu", nazev = "nazev", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesprlDtoFragments { id_listu = "*", nazev = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesprlDtoTypes { id_listu = "number", nazev = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesprlDtoTypeLengths { nazev = 254, popis = 4000, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro ulohu Produktove listy*/
	const enum GProduktoveListyFilterEnum {
		/**filtr na Produktovy list (ID listu = identifikátor Produktového listu)*/
		id_listu,
		/**filtr na nazev Produktoveho listu*/
		nazev,
		/**filtr na popis Produktoveho listu*/
		popis,
		/**filtr na aktivitu Produktového listu*/
		aktivita,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_cenik*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\CenikProduktu\IGProdukty.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohy Cenik produktu/Polozky, Podpolozky (Produkt = Položka + Podpoložka)
	* @domain CentralAdmin
	* @businessObject GGdecproDto
	*/
	interface Produkty {
		/**Metoda List - Seznam Položek (gdecpro)*/
		listPolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecnpoDto>>;
		/**Metoda List - Seznam Podpoložek (gdecnpo)*/
		listPodpolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecproDto>>;
		/**Metoda Read pro detail Polozky*/
		readPolozka(rq?:Gordic.Adt.Interface.GGdecnpoDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdecnpoDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdecnpoDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdecnpoDto>>;
		/**Metoda Read pro detail Podpolozky*/
		readPodpolozka(rq?:Gordic.Adt.Interface.GGdecproDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdecproDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdecproDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdecproDto>>;
		/**Založení/Update ceníkové Položky*/
		upsertPolozka(rq?:Gordic.Adt.Interface.GGdecnpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecnpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecnpoDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdecnpoDto>>;
		/**Založení/Update ceníkové Podpoložky*/
		upsertPodpolozka(rq?:Gordic.Adt.Interface.GGdecproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecproDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdecproDto>>;
		/**Metoda List - Tagy programových fází*/
		listTagFaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Založení/Update záznamů pro tagy programových fází (tabulka gdevtaf)*/
		zmenaTagFaze(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdecfazDto>,tagsField:string[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdecfazDto>,tagsField:string[]},GServiceSaveResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Metoda List - Historie Položek*/
		listHistoriePol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecnpohhDto>>;
		/**Metoda List - Historie Podpoložek*/
		listHistoriePpol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecprohhDto>>;
		/**Metoda List pro grid Komentáře k polozce*/
		listKomentarePol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdednpoDto>>;
		/**Metoda List - Produktové listy k polozce*/
		listPolProduktoveListy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevnpoDto>>;
		/**Metoda List - Komentáře podpolozky*/
		listPodpolKomentare(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedproDto>>;
		/**Metoda List - Produktove listy podpolozky*/
		listPodpolProduktoveListy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevproDto>>;
		/**Metoda List - Programove faze podpolozky*/
		listPodpolProgramoveFaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecppfDto>>;
		/**Metoda List - Souvisejici produkty (gdevsou)*/
		listPodpolSouvisejici(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevSouZavZamDto>>;
		/**Metoda List - Zavislost podpolozek (gdevzav)*/
		listPodpolZavislost(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevSouZavZamDto>>;
		/**Metoda List - Zavislost podpolozek*/
		listZavislostPpol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevzavDto>>;
		/**Metoda List - Zavislost podpolozek*/
		listZavislePpol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevzavDto>>;
		/**Metoda List - Zamennost s jinymi produkty podpolozky*/
		listPodpolZamennost(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevSouZavZamDto>>;
		/**Metoda List - Zaklad procentualni ceny podpolozky*/
		listPodpolZakladProcCeny(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevprzDto>>;
		/**Zalozeni/Update zaznamu - Polozky (tabulka gdecnpo)*/
		insertUpdatePol(rq?:Gordic.Adt.Interface.GGdecnpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecnpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecnpoDto>,void>;
		/**Zalozeni/Update zaznamu - Komentare k polozce  ( tabulka gdednpo)*/
		insertUpdateKomentare(rq?:Gordic.Adt.Interface.GGdednpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdednpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdednpoDto>,void>;
		/**Zalozeni/Update zaznamu - Produkt  (tabulka gdecfaz)*/
		insertUpdateProdukt(rq?:Gordic.Adt.Interface.GGdecfazDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecfazDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecfazDto>,void>;
		/**Zruseni zaznamu - Komentare k polozce*/
		deleteKomentare(rq?:Gordic.Adt.Interface.GGdednpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdednpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdednpoDto>,void>;
		/**Zalozeni/Update zaznamu - Produktove listy k polozce ( tabulka gdevnpo)*/
		insertUpdateProduktoveListyPolozky(rq?:Gordic.Adt.Interface.GGdevnpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>,void>;
		/**Zruseni zaznamu - Produktove listy k polozce*/
		deleteProduktoveListyPolozky(rq?:Gordic.Adt.Interface.GGdevnpoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevnpoDto>,void>;
		/**Zalozeni zaznamu - Podpolozky(tabulka gdecpro)*/
		insertUpdatePpol(rq?:Gordic.Adt.Interface.GGdecproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecproDto>,void>;
		/**Hromadny update vice Podpolozek - výběr Podpolozek (tabulka gdecpro)*/
		updateVyberPodpolozek(rq?:CallParams<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdecproDto>,vyberPolozek:string[],vyberPodpolozek:string[]}>): _Task<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdecproDto>,vyberPolozek:string[],vyberPodpolozek:string[]},void>;
		/**Hromadny update vice Produktu - výběr Produktu (tabulka gdecfaz)*/
		updateVyberProduktu(rq?:CallParams<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdecfazDto>,vyberProduktu:string[]}>): _Task<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdecfazDto>,vyberProduktu:string[]},void>;
		/**Zalozeni/Update zaznamu - Komentare podpolozky  ( tabulka gdedpro)*/
		insertUpdatePodpolKomentare(rq?:Gordic.Adt.Interface.GGdedproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedproDto>,void>;
		/**Zruseni zaznamu - Komentare podpolozky*/
		deletePodpolKomentare(rq?:Gordic.Adt.Interface.GGdedproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedproDto>,void>;
		/**Zalozeni/Update zaznamu - Produktove listy k podpolozce ( tabulka gdevpro)*/
		insertUpdatePodpolProdListy(rq?:Gordic.Adt.Interface.GGdevproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>,void>;
		/**Zruseni zaznamu - Produktove listy k podpolozce*/
		deletePodpolProdListy(rq?:Gordic.Adt.Interface.GGdevproDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevproDto>,void>;
		/**Zalozeni/Update zaznamu - Programove faze podpolozky  ( tabulka gdecppf)*/
		insertUpdatePodpolProgFaze(rq?:Gordic.Adt.Interface.GGdecppfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecppfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecppfDto>,void>;
		/**Zruseni zaznamu - Programove faze podpolozky*/
		deletePodpolProgFaze(rq?:Gordic.Adt.Interface.GGdecppfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdecppfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdecppfDto>,void>;
		/**Zalozeni/Update zaznamu - Souvisejici prudukty podpolozky  ( tabulka gdevsou)*/
		insertUpdatePodpolSouvisejici(rq?:Gordic.Adt.Interface.GGdevSouZavZamDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>,void>;
		/**Zruseni zaznamu - Souvisejici produkty podpolozky*/
		deletePodpolSouvisejici(rq?:Gordic.Adt.Interface.GGdevSouZavZamDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>,void>;
		/**Zalozeni/Update zaznamu - Zavislost na jinych produktech podpolozky  (tabulka gdevzav)*/
		insertUpdatePodpolZavislost(rq?:CallParams<{newRequest:Gordic.Adt.Interface.GGdevzavDto,originalRequest:Gordic.Adt.Interface.GGdevzavDto}>): _Task<{newRequest:Gordic.Adt.Interface.GGdevzavDto,originalRequest:Gordic.Adt.Interface.GGdevzavDto},void>;
		/**Zruseni zaznamu - Zavislost na jinych produktech podpolozky*/
		deletePodpolZavislost(rq?:Gordic.Adt.Interface.GGdevzavDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevzavDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevzavDto>,void>;
		/**Zalozeni/Update zaznamu - Zamennost s jinymi produkty podpolozky  ( tabulka gdevzam)*/
		insertUpdatePodpolZamennost(rq?:Gordic.Adt.Interface.GGdevSouZavZamDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>,void>;
		/**Zruseni zaznamu - Zamennost s jinymi produkty podpolozky*/
		deletePodpolZamennost(rq?:Gordic.Adt.Interface.GGdevSouZavZamDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevSouZavZamDto>,void>;
		/**Zalozeni/Update zaznamu - Zaklad procentualni ceny podpolozky  ( tabulka gdevprz)*/
		insertUpdatePodpolZakladProcCeny(rq?:Gordic.Adt.Interface.GGdevprzDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevprzDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevprzDto>,void>;
		/**Zruseni zaznamu - Zaklad procentualni ceny podpolozky*/
		deletePodpolZakladProcCeny(rq?:Gordic.Adt.Interface.GGdevprzDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevprzDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevprzDto>,void>;
		/**Metoda List - Produkty*/
		listProdukty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Metoda List - Programové fáze*/
		listFaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Metoda List - Typ modulu*/
		listTypModul(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Metoda List - Produkty licence databáze*/
		listProduktyLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Metoda List - Seznam ORJ*/
		listORJ(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesorjDto>>;
		/**Metoda List - Licence*/
		listLicence(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecppfDto>>;
		/**Metoda List - Dostupnost fáze ve verzi*/
		listDostupnostVeVerzi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfpvDto>>;
		/**Metoda list pro kontrolu vyzadovanych produktu*/
		listVyzadovaneProdukty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesvyzDto>>;
		/**Metoda Read pro detail Produktu*/
		readProdukt(rq?:Gordic.Adt.Interface.GGdecfazDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdecfazDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdecfazDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**Metoda Read - Detail ulohy Polozky (poduloha Ceniku produktu), To DO: nahradit metodu Read standardním GServiceReadResponse(Dto) Read(GServiceReadRequest(Dto) rq)*/
		readPol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecnpoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Produkty: ServiceBase & Catalog.Produkty;
	}
	const Produkty: Client["Produkty"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdecnpoDto - Polozky (datový objekt hlavní entity)*/
	interface GGdecnpoDto {
		/**Ceníková položka*/
		pol?: string|null;
		/**Datum počátku platnosti ceníkové položky*/
		dat_pol_od?: JsonDate|null;
		/**Datum konce platnosti ceníkové položky*/
		dat_pol_do?: JsonDate|null;
		/**Datum počátku platnosti ceníkové položky*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti ceníkové položky*/
		dat_do?: JsonDate|null;
		/**Popis ceníkové položky*/
		popis?: string|null;
		/**aktivita ceníkové položky*/
		aktivita?: number|null;
		/**Datum poslední změny položky*/
		dat_zmena?: JsonDate|null;
		/**identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Kategorie ceníkové položky (0 = Fakturační / 10 = Nadpisová / 20 = Časová)*/
		ktg_pol?: number|null;
		/**Zkratka ceníkové položky*/
		zkratka?: string|null;
		/**Poznámka k ceníkové položce*/
		poznamka?: string|null;
		/**Anglický popis ceníkové položky*/
		popis_eng?: string|null;
		/**Hodnota zmenil - název autora poslední změny*/
		zmenil?: string|null;
	}
	const enum GGdecnpoDtoNames { pol = "pol", dat_pol_od = "dat_pol_od", dat_pol_do = "dat_pol_do", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_pol = "ktg_pol", zkratka = "zkratka", poznamka = "poznamka", popis_eng = "popis_eng", zmenil = "zmenil",}
	const enum GGdecnpoDtoFragments { pol = "main", dat_pol_od = "main", dat_pol_do = "main", dat_od = "main", dat_do = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ktg_pol = "main", zkratka = "main", poznamka = "main", popis_eng = "main", zmenil = "main",}
	const enum GGdecnpoDtoTypes { pol = "string", dat_pol_od = "JsonDate", dat_pol_do = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_pol = "number", zkratka = "string", poznamka = "string", popis_eng = "string", zmenil = "string",}
	const enum GGdecnpoDtoTypeLengths { pol = 4, popis = 254, zmenu_prov = 12, zkratka = 20, poznamka = 254, popis_eng = 254, zmenil = 100,}
	/**GGdecproDto - Podpoložky (datový objekt hlavní entity)*/
	interface GGdecproDto {
		/**Identifikátor položky (PK)*/
		pol?: string|null;
		polVzor?: string|null;
		/**Povoleni menit datum platnosti (pro hromadnou upravu podpolozek)*/
		platnost_ppol_enable?: boolean|null;
		/**Počátek platnosti ceníkové podpoložky*/
		dat_od?: JsonDate|null;
		/**Povoleni menit pocatek data platnosti (pro hromadnou upravu podpolozek)*/
		dat_od_enable?: boolean|null;
		/**Konec platnosti ceníkové podpoložky*/
		dat_do?: JsonDate|null;
		/**Povoleni menit konec data platnosti (pro hromadnou upravu podpolozek)*/
		dat_do_enable?: boolean|null;
		/**Poznámka k podpoložce*/
		poznamka?: string|null;
		/**Povoleni menit poznamku (pro hromadnou upravu podpolozek)*/
		poznamka_enable?: boolean|null;
		/**Ceníkové Podpoložka*/
		ppol?: string|null;
		/**Popis podpoložky*/
		popis?: string|null;
		/**Povoleni menit popis (pro hromadnou upravu podpolozek)*/
		popis_enable?: boolean|null;
		/**Popis ceníkové položky*/
		popisPol?: string|null;
		/**Aktivita ceníkové podpoložky*/
		aktivita?: number|null;
		/**Povoleni menit aktivitu (pro hromadnou upravu podpolozek)*/
		aktivita_enable?: boolean|null;
		/**Datum změny ceníkové podpoložky*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Anglický popis ceníkové podpoložky*/
		popis_eng?: string|null;
		/**Zkratka ceníkové podpoložky*/
		zkratka?: string|null;
		/**Povoleni menit zkratku (pro hromadnou upravu podpolozek)*/
		zkratka_enable?: boolean|null;
		/**Kategorie ceníkové podpoložky*/
		ktg_ppol?: number|null;
		/**Povoleni menit kategorii ppol (pro hromadnou upravu podpolozek)*/
		ktg_ppol_enable?: boolean|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**priznak vybranych radku pro hromadnou úpravu podpoložek*/
		checkedRows?: boolean|null;
	}
	const enum GGdecproDtoNames { pol = "pol", polVzor = "polVzor", platnost_ppol_enable = "platnost_ppol_enable", dat_od = "dat_od", dat_od_enable = "dat_od_enable", dat_do = "dat_do", dat_do_enable = "dat_do_enable", poznamka = "poznamka", poznamka_enable = "poznamka_enable", ppol = "ppol", popis = "popis", popis_enable = "popis_enable", popisPol = "popisPol", aktivita = "aktivita", aktivita_enable = "aktivita_enable", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis_eng = "popis_eng", zkratka = "zkratka", zkratka_enable = "zkratka_enable", ktg_ppol = "ktg_ppol", ktg_ppol_enable = "ktg_ppol_enable", zmenil = "zmenil", checkedRows = "checkedRows",}
	const enum GGdecproDtoFragments { pol = "main", polVzor = "main", platnost_ppol_enable = "main", dat_od = "main", dat_od_enable = "main", dat_do = "main", dat_do_enable = "*", poznamka = "main", poznamka_enable = "main", ppol = "main", popis = "main", popis_enable = "main", popisPol = "main", aktivita = "main", aktivita_enable = "main", dat_zmena = "main", zmenu_prov = "main", popis_eng = "main", zkratka = "main", zkratka_enable = "main", ktg_ppol = "main", ktg_ppol_enable = "main", zmenil = "main", checkedRows = "main",}
	const enum GGdecproDtoTypes { pol = "string", polVzor = "string", platnost_ppol_enable = "boolean", dat_od = "JsonDate", dat_od_enable = "boolean", dat_do = "JsonDate", dat_do_enable = "boolean", poznamka = "string", poznamka_enable = "boolean", ppol = "string", popis = "string", popis_enable = "boolean", popisPol = "string", aktivita = "number", aktivita_enable = "boolean", dat_zmena = "JsonDate", zmenu_prov = "string", popis_eng = "string", zkratka = "string", zkratka_enable = "boolean", ktg_ppol = "number", ktg_ppol_enable = "boolean", zmenil = "string", checkedRows = "boolean",}
	const enum GGdecproDtoTypeLengths { pol = 4, polVzor = 4, poznamka = 254, ppol = 3, popis = 254, popisPol = 254, zmenu_prov = 12, popis_eng = 254, zkratka = 20, zmenil = 100,}
	/**GGdednpoDto - Komentáře k položce*/
	interface GGdednpoDto {
		/**Identifikátor položky (PK)*/
		pol?: string|null;
		/**Pořadí komentáře*/
		poradi?: number|null;
		/**Popis komentáře*/
		popis?: string|null;
		/**Aktivita komentéře*/
		aktivita?: number|null;
		/**Datum změny komentáře*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Typ komentare k polozce (0 = Veřejný / 10 = Interní / 20 = Návrh)*/
		typ_koment?: number|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdednpoDtoNames { pol = "pol", poradi = "poradi", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_koment = "typ_koment", zmenil = "zmenil",}
	const enum GGdednpoDtoFragments { pol = "*", poradi = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_koment = "*", zmenil = "*",}
	const enum GGdednpoDtoTypes { pol = "string", poradi = "number", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_koment = "number", zmenil = "string",}
	const enum GGdednpoDtoTypeLengths { pol = 4, popis = 4000, zmenu_prov = 12, zmenil = 100,}
	/**GGdevnpoDto - Produktové listy k položce*/
	interface GGdevnpoDto {
		/**Identifikátor položky (PK)*/
		pol?: string|null;
		/**Identifikátor produktového listu*/
		id_listu?: number|null;
		/**Aktivita produktového listu*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevnpoDtoNames { pol = "pol", id_listu = "id_listu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevnpoDtoFragments { pol = "*", id_listu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevnpoDtoTypes { pol = "string", id_listu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevnpoDtoTypeLengths { pol = 4, zmenu_prov = 12, zmenil = 100,}
	/**GGdecnpohhDto - auditní tabulka s historií zmen jednotlivych polozek*/
	interface GGdecnpohhDto {
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Identifikátor položky*/
		pol?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil*/
		zmenil?: string|null;
		/**Kategorie položky*/
		ktg_pol?: number|null;
		/**Anglický popis*/
		popis_eng?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
	}
	const enum GGdecnpohhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", pol = "pol", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", ktg_pol = "ktg_pol", popis_eng = "popis_eng", zkratka = "zkratka", dat_od = "dat_od", dat_do = "dat_do",}
	const enum GGdecnpohhDtoFragments { iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", pol = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", ktg_pol = "*", popis_eng = "*", zkratka = "*", dat_od = "*", dat_do = "*",}
	const enum GGdecnpohhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", pol = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", ktg_pol = "number", popis_eng = "string", zkratka = "string", dat_od = "JsonDate", dat_do = "JsonDate",}
	const enum GGdecnpohhDtoTypeLengths { typ_zmeny = 1, pol = 4, popis = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100, popis_eng = 254, zkratka = 20,}
	/**GGdecprohhDto - auditní tabulka s  historií Podpoložky (produktu)*/
	interface GGdecprohhDto {
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**Popis změny*/
		popis?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Anglický popis*/
		popis_eng?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Kategorie podpoložky*/
		ktg_ppol?: number|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
	}
	const enum GGdecprohhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", pol = "pol", ppol = "ppol", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", popis_eng = "popis_eng", zkratka = "zkratka", ktg_ppol = "ktg_ppol", dat_od = "dat_od", dat_do = "dat_do",}
	const enum GGdecprohhDtoFragments { iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", pol = "*", ppol = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", popis_eng = "*", zkratka = "*", ktg_ppol = "*", dat_od = "*", dat_do = "*",}
	const enum GGdecprohhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", pol = "string", ppol = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", popis_eng = "string", zkratka = "string", ktg_ppol = "number", dat_od = "JsonDate", dat_do = "JsonDate",}
	const enum GGdecprohhDtoTypeLengths { typ_zmeny = 1, pol = 4, ppol = 3, popis = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100, popis_eng = 254, zkratka = 20,}
	/**GGdedproDto - Komentáře k podpoložce (Produktu)*/
	interface GGdedproDto {
		/**Identifikátor položky (PK)*/
		pol?: string|null;
		/**Identifikátr podpoložky*/
		ppol?: string|null;
		/**Pořadí komentáře k podpoložce*/
		poradi?: number|null;
		/**Popis komentáře k podpoložce*/
		popis?: string|null;
		/**Aktivita komentáře*/
		aktivita?: number|null;
		/**Datum změny komentáře*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Typ komentáře k podpoložce*/
		typ_koment?: number|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdedproDtoNames { pol = "pol", ppol = "ppol", poradi = "poradi", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_koment = "typ_koment", zmenil = "zmenil",}
	const enum GGdedproDtoFragments { pol = "*", ppol = "*", poradi = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_koment = "*", zmenil = "*",}
	const enum GGdedproDtoTypes { pol = "string", ppol = "string", poradi = "number", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_koment = "number", zmenil = "string",}
	const enum GGdedproDtoTypeLengths { pol = 4, ppol = 3, popis = 4000, zmenu_prov = 12, zmenil = 100,}
	/**GGdevproDto - Produktové listy k podpoložce (Produktu)*/
	interface GGdevproDto {
		/**Identifikátor položky (PK)*/
		pol?: string|null;
		/**Identifikátor ceníkové podpoložky*/
		ppol?: string|null;
		/**identifikátor produktového listu k podpoložce*/
		id_listu?: number|null;
		/**Aktivita produktového listu podpoložky*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevproDtoNames { pol = "pol", ppol = "ppol", id_listu = "id_listu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevproDtoFragments { pol = "*", ppol = "*", id_listu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevproDtoTypes { pol = "string", ppol = "string", id_listu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevproDtoTypeLengths { pol = 4, ppol = 3, zmenu_prov = 12, zmenil = 100,}
	/**GGdecppfDto - Programové fáze ceníkové podpoložky*/
	interface GGdecppfDto {
		/**Identifikátor položky (PK)*/
		pol?: string|null;
		/**Popis ceníkové položky*/
		popisPol?: string|null;
		/**Identifikátor ceníkové podpoložky*/
		ppol?: string|null;
		/**Popis ceníkové Podpoložky*/
		popisPpol?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Počet programových fází*/
		pocet?: number|null;
		/**určení licence (0 = plnohodnotná licence/ 10 = kombinovaná licence / 20 = Shodná licence)*/
		reslic?: number|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		orj_autor?: string|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		orj_autor_nazev?: string|null;
		/**DBCOLUMN:gdecfaz.orj_gk*/
		orj_gk?: string|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		orj_gk_nazev?: string|null;
		/**Zkratka modulu (Substring z nazvu faze)*/
		modul?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**faze_typ_txt*/
		faze_typ_txt?: string|null;
		/**agenda*/
		agt_txt?: string|null;
		/**subsystem*/
		subsyst_txt?: string|null;
	}
	const enum GGdecppfDtoNames { pol = "pol", popisPol = "popisPol", ppol = "ppol", popisPpol = "popisPpol", faze = "faze", pocet = "pocet", reslic = "reslic", orj_autor = "orj_autor", orj_autor_nazev = "orj_autor_nazev", orj_gk = "orj_gk", orj_gk_nazev = "orj_gk_nazev", modul = "modul", aktivita = "aktivita", faze_typ_txt = "faze_typ_txt", agt_txt = "agt_txt", subsyst_txt = "subsyst_txt",}
	const enum GGdecppfDtoFragments { pol = "*", popisPol = "*", ppol = "*", popisPpol = "*", faze = "*", pocet = "*", reslic = "*", orj_autor = "*", orj_autor_nazev = "*", orj_gk = "*", orj_gk_nazev = "*", modul = "*", aktivita = "*", faze_typ_txt = "*", agt_txt = "*", subsyst_txt = "*",}
	const enum GGdecppfDtoTypes { pol = "string", popisPol = "string", ppol = "string", popisPpol = "string", faze = "string", pocet = "number", reslic = "number", orj_autor = "string", orj_autor_nazev = "string", orj_gk = "string", orj_gk_nazev = "string", modul = "string", aktivita = "number", faze_typ_txt = "string", agt_txt = "string", subsyst_txt = "string",}
	const enum GGdecppfDtoTypeLengths { pol = 4, popisPol = 254, ppol = 3, popisPpol = 254, faze = 8, orj_autor = 4, orj_autor_nazev = 900, orj_gk = 4, orj_gk_nazev = 900, modul = 5, faze_typ_txt = 50, agt_txt = 900, subsyst_txt = 50,}
	/**GGdevSouZavZamDto - gdevsou, gdevzav, gdevzam (souhrnne DTO pro Související produkty, Závislé produkty a Záměnnost s produkty jednotlivých podpoložek)*/
	interface GGdevSouZavZamDto {
		/**Položka nadřízeného produktu*/
		pol_nad?: string|null;
		/**Podpoložka nadřízeného produktu*/
		ppol_nad?: string|null;
		/**Položka podřízeného produktu*/
		pol_pod?: string|null;
		/**Podpoložka podřízeného produktu*/
		ppol_pod?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Prizank pokusu u update zaznamu*/
		updateRow?: boolean|null;
	}
	const enum GGdevSouZavZamDtoNames { pol_nad = "pol_nad", ppol_nad = "ppol_nad", pol_pod = "pol_pod", ppol_pod = "ppol_pod", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", updateRow = "updateRow",}
	const enum GGdevSouZavZamDtoFragments { pol_nad = "*", ppol_nad = "*", pol_pod = "*", ppol_pod = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", updateRow = "*",}
	const enum GGdevSouZavZamDtoTypes { pol_nad = "string", ppol_nad = "string", pol_pod = "string", ppol_pod = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", updateRow = "boolean",}
	const enum GGdevSouZavZamDtoTypeLengths { pol_nad = 4, ppol_nad = 3, pol_pod = 4, ppol_pod = 3, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdevzavDto - Závislost podpoložek*/
	interface GGdevzavDto {
		/**Položka nadřízeného produktu*/
		pol_nad?: string|null;
		/**Podpoložka nadřízeného produktu*/
		ppol_nad?: string|null;
		/**Položka podřízeného produktu*/
		pol_pod?: string|null;
		/**Podpoložka podřízeného produktu*/
		ppol_pod?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Prizank pokusu u update zaznamu*/
		updateRow?: boolean|null;
	}
	const enum GGdevzavDtoNames { pol_nad = "pol_nad", ppol_nad = "ppol_nad", pol_pod = "pol_pod", ppol_pod = "ppol_pod", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", updateRow = "updateRow",}
	const enum GGdevzavDtoFragments { pol_nad = "*", ppol_nad = "*", pol_pod = "*", ppol_pod = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", updateRow = "*",}
	const enum GGdevzavDtoTypes { pol_nad = "string", ppol_nad = "string", pol_pod = "string", ppol_pod = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", updateRow = "boolean",}
	const enum GGdevzavDtoTypeLengths { pol_nad = 4, ppol_nad = 3, pol_pod = 4, ppol_pod = 3, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdecfazDto - Deklarativní seznam všech fází distribučních balíků evidovaných v tabulce gdecfaz
	*     Na rozdíl od seznamu v gincfaz, tento seznam obsahuje zcela všechny fáze, které jsou v rámci distribučních balíků šířeny.
	*/
	interface GGdecfazDto {
		/**DBCOLUMN:gdecfaz.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdecfaz.faze_txt*/
		faze_txt?: string|null;
		/**DBCOLUMN:gdecfaz.faze_typ*/
		faze_typ?: number|null;
		/**Povoleni menit typ faze (pro hromadnou upravu produktu)*/
		faze_typ_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.faze_typ_txt*/
		faze_typ_txt?: string|null;
		/**DBCOLUMN:gdecfaz.faze_typ_txt*/
		faze_typ_text?: string|null;
		/**DBCOLUMN:gdecfaz.stav_faze*/
		stav_faze?: number|null;
		/**DBCOLUMN:gdecfaz.stav_faze_txt*/
		stav_faze_txt?: string|null;
		/**Povoleni menit stav faze (pro hromadnou upravu produktu)*/
		stav_faze_enable?: boolean|null;
		/**Zkratka modulu (Substring z nazvu faze)*/
		modul?: string|null;
		/**DBCOLUMN:gdecfaz.verze_od*/
		verze?: number|null;
		/**Povoleni menit verze od (pro hromadnou upravu produktu)*/
		verze_od_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.verze_do*/
		verze_do?: number|null;
		/**Povoleni menit verze do (pro hromadnou upravu produktu)*/
		verze_do_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:gdecfaz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gdecfaz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gdecfaz.akt_faze*/
		akt_faze?: number|null;
		/**DBCOLUMN:gdecfaz.vzkaz*/
		vzkaz?: string|null;
		/**DBCOLUMN:gdecfaz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdecfaz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gdecfaz.typ_ag*/
		typ_ag?: number|null;
		/**Povoleni menit agendu (pro hromadnou upravu produktu)*/
		typ_ag_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.zmenu_prov*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:gdecfaz.dat_avi*/
		dat_avi?: JsonDate|null;
		/**DBCOLUMN:gdecfaz.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdecfaz.tavi*/
		tavi?: string|null;
		/**DBCOLUMN:gdecfaz.tstop*/
		tstop?: string|null;
		/**DBCOLUMN:gdecfaz.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:gdecfaz.aktivita*/
		aktivita?: number|null;
		/**Povoleni menit aktivitu (pro hromadnou upravu produktu)*/
		aktivita_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.uee*/
		uee?: string|null;
		/**DBCOLUMN:gdecfaz.uei*/
		uei?: string|null;
		/**DBCOLUMN:gdecfaz.submodel*/
		submodel?: string|null;
		/**DBCOLUMN:gdecfaz.priz_adm*/
		priz_adm?: number|null;
		/**DBCOLUMN:gdecfaz.exp_tic*/
		exp_tic?: number|null;
		/**DBCOLUMN:gdecfaz.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:gdecfaz.priz_gentag*/
		priz_gentag?: number|null;
		/**DBCOLUMN:gdecfaz.rpp_w_x*/
		rpp_w_x?: number|null;
		/**DBCOLUMN:gdecfaz.rpp_w_y*/
		rpp_w_y?: number|null;
		/**DBCOLUMN:gdecfaz.priz_f*/
		priz_f?: number|null;
		/**DBCOLUMN:gdecfaz.faze_adr*/
		faze_adr?: string|null;
		/**DBCOLUMN:gdecfaz.faze_exe*/
		faze_exe?: string|null;
		/**DBCOLUMN:gdecfaz.priz_uninstall*/
		priz_uninstall?: number|null;
		/**DBCOLUMN:gdecfaz.agt*/
		agt?: string|null;
		/**Povoleni menit agendovy tym (pro hromadnou upravu produktu)*/
		agt_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.zmenu_prov*/
		agt_txt?: string|null;
		/**DBCOLUMN:gdecfaz.subsyst*/
		subsyst?: string|null;
		/**Povoleni menit subsystem (pro hromadnou upravu produktu)*/
		subsyst_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.subsyst*/
		subsyst_txt?: string|null;
		/**DBCOLUMN:gdecfaz.priz_exu*/
		priz_exu?: number|null;
		/**DBCOLUMN:gdecfaz.priz_arch*/
		priz_arch?: number|null;
		/**DBCOLUMN:gdecfaz.pocet_lic*/
		pocet_lic?: number|null;
		/**DBCOLUMN:gdecfaz.pocet_adm*/
		pocet_adm?: number|null;
		/**DBCOLUMN:gdecfaz.pocet_prihl*/
		pocet_prihl?: number|null;
		/**DBCOLUMN:gdecfaz.priz_zobr_lic*/
		priz_zobr_lic?: number|null;
		/**DBCOLUMN:gdecfaz.priz_bsl*/
		priz_bsl?: number|null;
		/**DBCOLUMN:gdecfaz.pocet_lic_srv*/
		pocet_lic_srv?: number|null;
		/**DBCOLUMN:gdecfaz.pocet_skut_srv*/
		pocet_skut_srv?: number|null;
		/**DBCOLUMN:gdecfaz.pozn_srv*/
		pozn_srv?: string|null;
		/**DBCOLUMN:gdecfaz.faze_rsx*/
		faze_rsx?: number|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		orj_autor?: string|null;
		/**Povoleni menit autora (pro hromadnou upravu produktu)*/
		orj_autor_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		orj_autor_nazev?: string|null;
		/**DBCOLUMN:gdecfaz.orj_gk*/
		orj_gk?: string|null;
		/**Povoleni menit garanta kvality (pro hromadnou upravu produktu)*/
		orj_gk_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		orj_gk_nazev?: string|null;
		/**DBCOLUMN:gdecfaz.orj_pra*/
		orj_pra?: string|null;
		/**Povoleni menit autora PRA (pro hromadnou upravu produktu)*/
		orj_pra_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.orj_pra*/
		orj_pra_nazev?: string|null;
		/**DBCOLUMN:gdecfaz.orj_prg*/
		orj_prg?: string|null;
		/**Povoleni menit autora PRG (pro hromadnou upravu produktu)*/
		orj_prg_enable?: boolean|null;
		/**DBCOLUMN:gdecfaz.orj_prg*/
		orj_prg_nazev?: string|null;
		/**DBCOLUMN:gdecfaz.sorj*/
		sorj?: string|null;
		/**DBCOLUMN:gdecfaz.orj_autor*/
		sorj_nazev?: string|null;
		/**Hodnota zmenil*/
		zmenil?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Povoleni menit poznamku (pro hromadnou upravu produktu)*/
		poznamka_enable?: boolean|null;
		/**priznak vybranych radku pro hromadnou úpravu prodktu*/
		checkedRows?: boolean|null;
		/**Pole tagů programové fáze*/
		tagy?: string|null;
	}
	const enum GGdecfazDtoNames { faze = "faze", faze_txt = "faze_txt", faze_typ = "faze_typ", faze_typ_enable = "faze_typ_enable", faze_typ_txt = "faze_typ_txt", faze_typ_text = "faze_typ_text", stav_faze = "stav_faze", stav_faze_txt = "stav_faze_txt", stav_faze_enable = "stav_faze_enable", modul = "modul", verze = "verze", verze_od_enable = "verze_od_enable", verze_do = "verze_do", verze_do_enable = "verze_do_enable", sub_verze = "sub_verze", k_v = "k_v", k_s = "k_s", akt_faze = "akt_faze", vzkaz = "vzkaz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", typ_ag_enable = "typ_ag_enable", typ_ag_txt = "typ_ag_txt", dat_avi = "dat_avi", dat_do = "dat_do", tavi = "tavi", tstop = "tstop", pocet = "pocet", aktivita = "aktivita", aktivita_enable = "aktivita_enable", uee = "uee", uei = "uei", submodel = "submodel", priz_adm = "priz_adm", exp_tic = "exp_tic", priz_ext = "priz_ext", priz_gentag = "priz_gentag", rpp_w_x = "rpp_w_x", rpp_w_y = "rpp_w_y", priz_f = "priz_f", faze_adr = "faze_adr", faze_exe = "faze_exe", priz_uninstall = "priz_uninstall", agt = "agt", agt_enable = "agt_enable", agt_txt = "agt_txt", subsyst = "subsyst", subsyst_enable = "subsyst_enable", subsyst_txt = "subsyst_txt", priz_exu = "priz_exu", priz_arch = "priz_arch", pocet_lic = "pocet_lic", pocet_adm = "pocet_adm", pocet_prihl = "pocet_prihl", priz_zobr_lic = "priz_zobr_lic", priz_bsl = "priz_bsl", pocet_lic_srv = "pocet_lic_srv", pocet_skut_srv = "pocet_skut_srv", pozn_srv = "pozn_srv", faze_rsx = "faze_rsx", orj_autor = "orj_autor", orj_autor_enable = "orj_autor_enable", orj_autor_nazev = "orj_autor_nazev", orj_gk = "orj_gk", orj_gk_enable = "orj_gk_enable", orj_gk_nazev = "orj_gk_nazev", orj_pra = "orj_pra", orj_pra_enable = "orj_pra_enable", orj_pra_nazev = "orj_pra_nazev", orj_prg = "orj_prg", orj_prg_enable = "orj_prg_enable", orj_prg_nazev = "orj_prg_nazev", sorj = "sorj", sorj_nazev = "sorj_nazev", zmenil = "zmenil", poznamka = "poznamka", poznamka_enable = "poznamka_enable", checkedRows = "checkedRows", tagy = "tagy",}
	const enum GGdecfazDtoFragments { faze = "*", faze_txt = "*", faze_typ = "*", faze_typ_enable = "*", faze_typ_txt = "*", faze_typ_text = "*", stav_faze = "*", stav_faze_txt = "*", stav_faze_enable = "*", modul = "*", verze = "*", verze_od_enable = "*", verze_do = "*", verze_do_enable = "*", sub_verze = "*", k_v = "*", k_s = "*", akt_faze = "*", vzkaz = "*", dat_zmena = "*", zmenu_prov = "*", typ_ag = "*", typ_ag_enable = "*", typ_ag_txt = "*", dat_avi = "*", dat_do = "*", tavi = "*", tstop = "*", pocet = "*", aktivita = "*", aktivita_enable = "*", uee = "*", uei = "*", submodel = "*", priz_adm = "*", exp_tic = "*", priz_ext = "*", priz_gentag = "*", rpp_w_x = "*", rpp_w_y = "*", priz_f = "*", faze_adr = "*", faze_exe = "*", priz_uninstall = "*", agt = "*", agt_enable = "*", agt_txt = "*", subsyst = "*", subsyst_enable = "*", subsyst_txt = "*", priz_exu = "*", priz_arch = "*", pocet_lic = "*", pocet_adm = "*", pocet_prihl = "*", priz_zobr_lic = "*", priz_bsl = "*", pocet_lic_srv = "*", pocet_skut_srv = "*", pozn_srv = "*", faze_rsx = "*", orj_autor = "*", orj_autor_enable = "*", orj_autor_nazev = "*", orj_gk = "*", orj_gk_enable = "*", orj_gk_nazev = "*", orj_pra = "*", orj_pra_enable = "*", orj_pra_nazev = "*", orj_prg = "*", orj_prg_enable = "*", orj_prg_nazev = "*", sorj = "*", sorj_nazev = "*", zmenil = "*", poznamka = "*", poznamka_enable = "*", checkedRows = "*", tagy = "*",}
	const enum GGdecfazDtoTypes { faze = "string", faze_txt = "string", faze_typ = "number", faze_typ_enable = "boolean", faze_typ_txt = "string", faze_typ_text = "string", stav_faze = "number", stav_faze_txt = "string", stav_faze_enable = "boolean", modul = "string", verze = "number", verze_od_enable = "boolean", verze_do = "number", verze_do_enable = "boolean", sub_verze = "number", k_v = "number", k_s = "string", akt_faze = "number", vzkaz = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", typ_ag_enable = "boolean", typ_ag_txt = "string", dat_avi = "JsonDate", dat_do = "JsonDate", tavi = "string", tstop = "string", pocet = "number", aktivita = "number", aktivita_enable = "boolean", uee = "string", uei = "string", submodel = "string", priz_adm = "number", exp_tic = "number", priz_ext = "number", priz_gentag = "number", rpp_w_x = "number", rpp_w_y = "number", priz_f = "number", faze_adr = "string", faze_exe = "string", priz_uninstall = "number", agt = "string", agt_enable = "boolean", agt_txt = "string", subsyst = "string", subsyst_enable = "boolean", subsyst_txt = "string", priz_exu = "number", priz_arch = "number", pocet_lic = "number", pocet_adm = "number", pocet_prihl = "number", priz_zobr_lic = "number", priz_bsl = "number", pocet_lic_srv = "number", pocet_skut_srv = "number", pozn_srv = "string", faze_rsx = "number", orj_autor = "string", orj_autor_enable = "boolean", orj_autor_nazev = "string", orj_gk = "string", orj_gk_enable = "boolean", orj_gk_nazev = "string", orj_pra = "string", orj_pra_enable = "boolean", orj_pra_nazev = "string", orj_prg = "string", orj_prg_enable = "boolean", orj_prg_nazev = "string", sorj = "string", sorj_nazev = "string", zmenil = "string", poznamka = "string", poznamka_enable = "boolean", checkedRows = "boolean", tagy = "string",}
	const enum GGdecfazDtoTypeLengths { faze = 8, faze_txt = 50, faze_typ_txt = 50, faze_typ_text = 50, stav_faze = 50, stav_faze_txt = 50, modul = 5, k_s = 15, vzkaz = 254, zmenu_prov = 12, typ_ag_txt = 900, tavi = 254, tstop = 254, uee = 12, uei = 4, submodel = 3, faze_adr = 254, faze_exe = 254, agt = 20, agt_txt = 900, subsyst = 4, subsyst_txt = 50, pozn_srv = 254, orj_autor = 4, orj_autor_nazev = 900, orj_gk = 4, orj_gk_nazev = 900, orj_pra = 4, orj_pra_nazev = 900, orj_prg = 4, orj_prg_nazev = 900, sorj = 4, sorj_nazev = 900, zmenil = 100, poznamka = 254, tagy = 5000,}
	/**GGdecfpvDto - Licence fází ve verzi*/
	interface GGdecfpvDto {
		/**DBCOLUMN:gdecfpv.verze_db*/
		verze_db?: number|null;
		/**Identifikátor položky*/
		pol?: string|null;
		/**Popis ceníkové položky*/
		popisPol?: string|null;
		/**Identifikátor položky*/
		ppol?: string|null;
		/**Popis ceníkové Podpoložky*/
		popisPpol?: string|null;
		/**DBCOLUMN:gdecfpv.faze*/
		faze?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
	}
	const enum GGdecfpvDtoNames { verze_db = "verze_db", pol = "pol", popisPol = "popisPol", ppol = "ppol", popisPpol = "popisPpol", faze = "faze", poznamka = "poznamka",}
	const enum GGdecfpvDtoFragments { verze_db = "*", pol = "*", popisPol = "*", ppol = "*", popisPpol = "*", faze = "*", poznamka = "*",}
	const enum GGdecfpvDtoTypes { verze_db = "number", pol = "string", popisPol = "string", ppol = "string", popisPpol = "string", faze = "string", poznamka = "string",}
	const enum GGdecfpvDtoTypeLengths { pol = 4, popisPol = 254, ppol = 3, popisPpol = 254, faze = 8, poznamka = 254,}
	/**DBTABLE:gdesorj*/
	interface GGdesorjDto {
		/**DBCOLUMN:gdesorj.orj*/
		orj?: string|null;
		/**DBCOLUMN:gdesorj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesorj.titul*/
		titul?: string|null;
		/**DBCOLUMN:gdesorj.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:gdesorj.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:gdesorj.firma*/
		firma?: string|null;
		/**DBCOLUMN:gdesorj.mesto*/
		mesto?: string|null;
		/**DBCOLUMN:gdesorj.nadorg*/
		nadorg?: string|null;
		/**DBCOLUMN:gdesorj.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:gdesorj.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:gdesorj.ktg_orj*/
		ktg_orj?: number|null;
		/**DBCOLUMN:gdesorj.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesorj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesorj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesorj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - název autora poslední změny*/
		zmenil?: string|null;
		/**Datum počátku platnosti*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdesorj.sorj*/
		sorj?: string|null;
	}
	const enum GGdesorjDtoNames { orj = "orj", nazev = "nazev", titul = "titul", jmeno = "jmeno", prijmeni = "prijmeni", firma = "firma", mesto = "mesto", nadorg = "nadorg", ixs_ref = "ixs_ref", ixs_orj = "ixs_orj", ktg_orj = "ktg_orj", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", dat_od = "dat_od", dat_do = "dat_do", sorj = "sorj",}
	const enum GGdesorjDtoFragments { orj = "*", nazev = "*", titul = "*", jmeno = "*", prijmeni = "*", firma = "*", mesto = "*", nadorg = "*", ixs_ref = "*", ixs_orj = "*", ktg_orj = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "main", dat_od = "*", dat_do = "*", sorj = "*",}
	const enum GGdesorjDtoTypes { orj = "string", nazev = "string", titul = "string", jmeno = "string", prijmeni = "string", firma = "string", mesto = "string", nadorg = "string", ixs_ref = "string", ixs_orj = "string", ktg_orj = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", dat_od = "JsonDate", dat_do = "JsonDate", sorj = "string",}
	const enum GGdesorjDtoTypeLengths { orj = 4, nazev = 50, titul = 35, jmeno = 24, prijmeni = 36, firma = 50, mesto = 50, nadorg = 50, ixs_ref = 12, ixs_orj = 12, poznamka = 254, zmenu_prov = 12, zmenil = 100, sorj = 4,}
	/**DBTABLE:gdesvyz - Vyžadované produkty*/
	interface GGdesvyzDto {
		/**Identifikátor vyžadovaného produktu*/
		ixs_vyz?: string|null;
		/**Identifikátor požadavku na produkt*/
		id_vyz?: number|null;
		/**Název vyžadovaného produktu*/
		nazev?: string|null;
		/**Ceníková položka (pol + ppol = produkt)*/
		pol?: string|null;
		/**Popis ceníkové položky*/
		popisPol?: string|null;
		/**Ceníková podpoložka (pol + ppol = produkt)*/
		ppol?: string|null;
		/**Popis ceníkové Podpoložky*/
		popisPpol?: string|null;
		/**Výsledek kontroly vyžadovaných produktů (Ok/Chybí)*/
		kontrola?: string|null;
		/**Zkratka vyžadovaného produktu*/
		zkratka?: string|null;
		/**Poznámka k vyžadovanému produktu*/
		poznamka?: string|null;
		/**Popis k vyžadovanému produktu*/
		popis?: string|null;
		/**Aktivita vyžadovaného produktu*/
		aktivita?: number|null;
		/**Platnost licence do*/
		dat_do?: JsonDate|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - název autora poslední změny*/
		zmenil?: string|null;
		/**Cena produktu (kombinace Pol + PPol)*/
		c?: JsonDecimal|null;
		/**Typ ceny (% = cena vyjádřená procentuálně / IND = individuální cena / Kč = cena uvedená v korunách)*/
		typ_cen?: string|null;
		/**Název ceníku*/
		cenik?: string|null;
		/**Základní položky pro výpočet ceny produktu stanovené procentem*/
		zakladProcCenPol?: string|null;
		/**Základní podpoložky pro výpočet ceny produktu stanovené procentem*/
		zakladProcCenPpol?: string|null;
	}
	const enum GGdesvyzDtoNames { ixs_vyz = "ixs_vyz", id_vyz = "id_vyz", nazev = "nazev", pol = "pol", popisPol = "popisPol", ppol = "ppol", popisPpol = "popisPpol", kontrola = "kontrola", zkratka = "zkratka", poznamka = "poznamka", popis = "popis", aktivita = "aktivita", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", c = "c", typ_cen = "typ_cen", cenik = "cenik", zakladProcCenPol = "zakladProcCenPol", zakladProcCenPpol = "zakladProcCenPpol",}
	const enum GGdesvyzDtoFragments { ixs_vyz = "*", id_vyz = "*", nazev = "*", pol = "*", popisPol = "*", ppol = "*", popisPpol = "*", kontrola = "*", zkratka = "*", poznamka = "*", popis = "*", aktivita = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", c = "*", typ_cen = "*", cenik = "*", zakladProcCenPol = "*", zakladProcCenPpol = "*",}
	const enum GGdesvyzDtoTypes { ixs_vyz = "string", id_vyz = "number", nazev = "string", pol = "string", popisPol = "string", ppol = "string", popisPpol = "string", kontrola = "string", zkratka = "string", poznamka = "string", popis = "string", aktivita = "number", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", c = "JsonDecimal", typ_cen = "string", cenik = "string", zakladProcCenPol = "string", zakladProcCenPpol = "string",}
	const enum GGdesvyzDtoTypeLengths { ixs_vyz = 12, nazev = 254, pol = 4, popisPol = 254, ppol = 3, popisPpol = 254, kontrola = 100, zkratka = 16, poznamka = 254, popis = 254, zmenu_prov = 12, zmenil = 100, typ_cen = 3, cenik = 254, zakladProcCenPol = 2000, zakladProcCenPpol = 2000,}
	/**DBTABLE:gdedvyz - Požadavek na produkt*/
	interface GGdedvyzDto {
		/**Identifikátor vyžadovaného produktu*/
		ixs_vyz?: string|null;
		/**Identifikátor požadavku na produkt*/
		id_vyz?: number|null;
		/**Název požadavku na produkt*/
		nazev?: string|null;
		/**Typ požadavku vyžadovaného produktu (0 = Doporučené / 1 = Potřebné)*/
		typ_vyz?: number|null;
		/**Poznámka k požadavku na produkt*/
		poznamka?: string|null;
		/**Aktivita požadavku na produkt*/
		aktivita?: number|null;
		/**Datum změny požadavku na produkt*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - název autora poslední změny*/
		zmenil?: string|null;
		/**Popis*/
		popis?: string|null;
	}
	const enum GGdedvyzDtoNames { ixs_vyz = "ixs_vyz", id_vyz = "id_vyz", nazev = "nazev", typ_vyz = "typ_vyz", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", popis = "popis",}
	const enum GGdedvyzDtoFragments { ixs_vyz = "*", id_vyz = "*", nazev = "*", typ_vyz = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", popis = "*",}
	const enum GGdedvyzDtoTypes { ixs_vyz = "string", id_vyz = "number", nazev = "string", typ_vyz = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", popis = "string",}
	const enum GGdedvyzDtoTypeLengths { ixs_vyz = 12, nazev = 100, poznamka = 50, zmenu_prov = 12, zmenil = 100, popis = 254,}
	/**DBTABLE:gdevvyz - Varianty pokrytí požadavku na produkt*/
	interface GGdevvyzDto {
		/**Identifikátor vyžadovaného produktu*/
		ixs_vyz?: string|null;
		/**Identifikátor požadavku na produkt*/
		id_vyz?: number|null;
		/**Ceníková položka (pol + ppol = produkt)*/
		pol?: string|null;
		/**Ceníková podpoložka (pol + ppol = produkt)*/
		ppol?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - název autora poslední změny*/
		zmenil?: string|null;
	}
	const enum GGdevvyzDtoNames { ixs_vyz = "ixs_vyz", id_vyz = "id_vyz", pol = "pol", ppol = "ppol", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevvyzDtoFragments { ixs_vyz = "*", id_vyz = "*", pol = "*", ppol = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevvyzDtoTypes { ixs_vyz = "string", id_vyz = "number", pol = "string", ppol = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevvyzDtoTypeLengths { ixs_vyz = 12, pol = 4, ppol = 3, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevtaf - Tagy společných komponent*/
	interface GGdevtafDto {
		/**Programová fáze*/
		faze?: string|null;
		/**Název programové fáze*/
		faze_nazev?: string|null;
		/**Společný tag k programové fázi*/
		tag?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevtafDtoNames { faze = "faze", faze_nazev = "faze_nazev", tag = "tag", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevtafDtoFragments { faze = "*", faze_nazev = "*", tag = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevtafDtoTypes { faze = "string", faze_nazev = "string", tag = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevtafDtoTypeLengths { faze = 8, faze_nazev = 254, tag = 50, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznamy ulohy Produkty (Polozky/Podpolozky)*/
	const enum GProduktyFilterEnum {
		/**filtr na Polozku*/
		pol,
		/**filtr na pocatek platnosti polozky*/
		dat_pol_od,
		/**filtr na Polozku nadrizeneho produktu*/
		pol_nad,
		/**filtr na Polozku podrizeneho produktu*/
		pol_pod,
		/**filtr na Podpolozku nadrizeneho produktu*/
		ppol_nad,
		/**filtr na Podpolozku podrizeneho produktu*/
		ppol_pod,
		/**filtr na Podpolozku produktu*/
		ppol,
		/**filtr na kategorii podpolozky*/
		ktg_ppol,
		/**filtr na popis polozky*/
		popis,
		/**filtr na aktivitu polozky*/
		aktivita,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele*/
		zmenu_prov,
		/**filtr na kategorii cenikove polozky*/
		ktg_pol,
		/**filtr na popis polozky v anglictine*/
		popis_eng,
		/**filtr na zkratku*/
		zkratka,
		/**filtr pro DB paramter adt_user_cenik*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr pro Produktový list (id_listu)*/
		id_listu,
		/**filtr na programovou fázi*/
		faze,
		/**filtr na verzi databaze produktu*/
		verze,
		/**filtr na konec platnosti verze*/
		verze_do,
		/**filtr na modulové fáze*/
		modul,
		/**filtr na fáze pro sestavy*/
		sestavy,
		/**filtr na faze pro helpy*/
		help,
		/**filtr na faze pro dokumentace*/
		dokumentace,
		/**filtr na typ fáze*/
		faze_typ,
		/**filtr na ketegorii orj*/
		ktg_orj,
		/**filtr na licenci databáze*/
		lic_fyz,
		/**filtr na pol_zaklad*/
		pol_zaklad,
		/**filtr na ppol_zaklad*/
		ppol_zaklad,
		/**filtr na poradi*/
		poradi,
		/**filtr na orj*/
		orj,
		/**filtr na verze_db*/
		verze_db,
	}
	/**Možné položky filtru pro kontrolu vyzadovanych produktu v baliku licenci a licenci DB*/
	const enum GKontrolaProduktuFilterEnum {
		/**filtr na Balik licenci*/
		ixs_lip,
		/**filtr na licenci databaze*/
		lic,
		/**filtr na požadovaný produkt*/
		ixs_vyz,
		/**filtr na potřebné produkty*/
		potrebne,
		/**filtr na doporučené produkty*/
		doporucene,
		/**filtr na platné produkty*/
		platne,
		/**filtr na ppol*/
		ppol,
		/**filtr na pol*/
		pol,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\CenikProduktu\IGSkupinyProduktu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Skupiny produktu*/
	interface SkupinyProduktu {
		/**Insert / Update seznamu Skupiny produktu*/
		insertUpdateSkupinyProduktu(rq?:Gordic.Adt.Interface.GGdessprDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdessprDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdessprDto>,void>;
		/**Zalozeni / Update zaznamu - Souvisejici polozky (tabulka gdevspo)*/
		insertUpdateSouvisejiciPolozky(rq?:Gordic.Adt.Interface.GGdevspoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevspoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevspoDto>,void>;
		/**Zruseni zaznamu - Souvisejici polozky (tabulka gdevspo)*/
		deleteSouvisejiciPolozky(rq?:Gordic.Adt.Interface.GGdevspoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevspoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevspoDto>,void>;
		/**Zalozeni / Update zaznamu - Souvisejici podpolozky (tabulka gdevspp)*/
		insertUpdateSouvisejiciPodpolozky(rq?:Gordic.Adt.Interface.GGdevsppDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsppDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsppDto>,void>;
		/**Zruseni zaznamu - Souvisejici polozky (tabulka gdevspp)*/
		deleteSouvisejiciPodpolozky(rq?:Gordic.Adt.Interface.GGdevsppDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsppDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsppDto>,void>;
		/**Metoda List pro seznam ulohy Skupiny produktu (poduloha Ceniku produktu)*/
		listSkupinyProduktu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdessprDto>>;
		/**Metoda List pro detail ulohy Produkty (poduloha Ceniku produktu)*/
		listDetailSkupinyProduktu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdessprDto>>;
		/**Metoda List pro seznam Souvisejici polozky*/
		listSouvisejiciPolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevspoDto>>;
		/**Metoda List pro seznam Souvisejici podpolozky*/
		listSouvisejiciPodpolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevsppDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SkupinyProduktu: ServiceBase & Catalog.SkupinyProduktu;
	}
	const SkupinyProduktu: Client["SkupinyProduktu"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesspr*/
	interface GGdessprDto {
		/**DBCOLUMN:gdesspr.ixs_spr*/
		ixs_spr?: string|null;
		/**DBCOLUMN:gdesspr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesspr.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:gdesspr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesspr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesspr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesspr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Produkty*/
		zmenil?: string|null;
	}
	const enum GGdessprDtoNames { ixs_spr = "ixs_spr", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdessprDtoFragments { ixs_spr = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdessprDtoTypes { ixs_spr = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	/**DBTABLE:gdevspo*/
	interface GGdevspoDto {
		/**DBCOLUMN:gdevspo.ixs_spr*/
		ixs_spr?: string|null;
		/**DBCOLUMN:gdevspo.pol*/
		pol?: string|null;
		/**DBCOLUMN:gdevspo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevspo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevspo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect sloupce Zmenil*/
		zmenil?: string|null;
	}
	const enum GGdevspoDtoNames { ixs_spr = "ixs_spr", pol = "pol", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevspoDtoFragments { ixs_spr = "*", pol = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevspoDtoTypes { ixs_spr = "string", pol = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	/**DBTABLE:gdevspp*/
	interface GGdevsppDto {
		/**DBCOLUMN:gdevspp.ixs_spr*/
		ixs_spr?: string|null;
		/**DBCOLUMN:gdevspp.pol*/
		pol?: string|null;
		/**DBCOLUMN:gdevspp.ppol*/
		ppol?: string|null;
		/**DBCOLUMN:gdevspp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevspp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevspp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect sloupce Zmenil*/
		zmenil?: string|null;
	}
	const enum GGdevsppDtoNames { ixs_spr = "ixs_spr", pol = "pol", ppol = "ppol", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevsppDtoFragments { ixs_spr = "*", pol = "*", ppol = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevsppDtoTypes { ixs_spr = "string", pol = "string", ppol = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	/**Možné položky filtru pro seznam ulohy Baliky produktu*/
	const enum GSkupinyProduktuFilterEnum {
		/**filtr na Skupinu produktu*/
		ixs_spr,
		/**filtr na nazev baliku produktu*/
		nazev,
		/**filtr na zkratku baliku produktu*/
		zkratka,
		/**filtr na poznamku baliku produktu*/
		poznamka,
		/**filtr na aktivitu polozky*/
		aktivita,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_cenik*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\DalsiSoubory\IGDalsiSoubory.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Dalsi soubory*/
	interface DalsiSoubory {
		/**Metoda List pro seznam ulohy Dalsi soubory*/
		listDalsiSoubory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdifDto>>;
		/**Metoda List pro seznam ulohy Dalsi soubory - filtrovany dle dostupnych skupin databazi*/
		listDistribuceSouboru(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdifDto>>;
		/**Insert / Update tabulky gdesdif pro ulohu Dalsi soubory*/
		upsertDalsiSoubory(rq?:Gordic.Adt.Interface.GGdesdifDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdifDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdifDto>,void>;
		/**Generovani ixs_dif z tabulky gderdif*/
		generateIxsDif(rq?:CallParams<{tabName:string}>): _Task<{tabName:string},string>;
		/**Načíst obsah souboru*/
		getContent(rq?:Gordic.Adt.Interface.GGdesdifDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdifDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdifDto>,JsonBlob>;
		/**Odeslani souboru do uloziste na FTPS server dnld2-ji.cz*/
		moveToStorage(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GFileUploadFTPDto>,ixsRef:string,datetimeStamp:string}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GFileUploadFTPDto>,ixsRef:string,datetimeStamp:string},void>;
		/**Metoda List pro seznam Historie Dalsich souboru*/
		listHistorieDalsiSoubory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdifhhDto>>;
		/**Metoda List pro seznam Skupin Databazi navazanych na dany soubor*/
		listSkupinyDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevaksDto>>;
		/**Insert / Update tabulky gdevaks pro ulohu Dalsi soubory*/
		upsertSkupinyDB(rq?:Gordic.Adt.Interface.GGdevaksDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevaksDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevaksDto>,void>;
		/**Delete z tabulky gdevaks pro ulohu Dalsi soubory*/
		deleteSkupinyDB(rq?:Gordic.Adt.Interface.GGdevaksDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevaksDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevaksDto>,void>;
		/**Delete z tabulky gdesdif pro Dalsi soubory*/
		deleteSoubory(rq?:Gordic.Adt.Interface.GGdesdifDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdifDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdifDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DalsiSoubory: ServiceBase & Catalog.DalsiSoubory;
	}
	const DalsiSoubory: Client["DalsiSoubory"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesdif*/
	interface GGdesdifDto {
		/**DBCOLUMN:gdesdif.ixs_dif*/
		ixs_dif?: string|null;
		/**DBCOLUMN:gdesdif.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesdif.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdesdif.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gdesdif.typ_dif*/
		typ_dif?: number|null;
		/**DBCOLUMN:gdesdif.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesdif.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesdif.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesdif.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Dalsi soubory*/
		zmenil?: string|null;
		/**DBCOLUMN:gdesdif.priz_verejny*/
		priz_verejny?: number|null;
	}
	const enum GGdesdifDtoNames { ixs_dif = "ixs_dif", nazev = "nazev", popis = "popis", velikost = "velikost", typ_dif = "typ_dif", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", priz_verejny = "priz_verejny",}
	const enum GGdesdifDtoFragments { ixs_dif = "*", nazev = "*", popis = "*", velikost = "*", typ_dif = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", priz_verejny = "*",}
	const enum GGdesdifDtoTypes { ixs_dif = "string", nazev = "string", popis = "string", velikost = "number", typ_dif = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", priz_verejny = "number",}
	const enum GGdesdifDtoTypeLengths { ixs_dif = 12, nazev = 254, popis = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DTO pro login uzivatele na upload Souboru do uloziste*/
	interface GFileUploadFTPDto {
		/**Identifikator souboru*/
		ixs_dif?: string|null;
		/**Velikost souboru vyjádřená textově, uživatelsky přívětivě*/
		fileSize?: string|null;
		/**Číselná velikost revize*/
		filename?: string|null;
		/**Číselná velikost revize*/
		fileDescription?: string|null;
		/**Typ ikony revize*/
		fileTypeIcon?: string|null;
		/**Login uzivatele pro nazev adresare*/
		login_name?: string|null;
	}
	const enum GFileUploadFTPDtoNames { ixs_dif = "ixs_dif", fileSize = "fileSize", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon", login_name = "login_name",}
	const enum GFileUploadFTPDtoFragments { ixs_dif = "*", fileSize = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*", login_name = "*",}
	const enum GFileUploadFTPDtoTypes { ixs_dif = "string", fileSize = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string", login_name = "string",}
	const enum GFileUploadFTPDtoTypeLengths { ixs_dif = 30,}
	/**DBTABLE:gdesdifhh*/
	interface GGdesdifhhDto {
		/**DBCOLUMN:gdesdifhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:gdesdifhh.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesdifhh.ixs_dif*/
		ixs_dif?: string|null;
		/**DBCOLUMN:gdesdifhh.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdesdifhh.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesdifhh.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdesdifhh.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gdesdifhh.typ_dif*/
		typ_dif?: number|null;
		/**DBCOLUMN:gdesdifhh.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesdifhh.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesdifhh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesdifhh.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Baliky licenci*/
		zmenil?: string|null;
		/**DBCOLUMN:gdesdifhh.priz_verejny*/
		priz_verejny?: number|null;
	}
	const enum GGdesdifhhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", ixs_dif = "ixs_dif", typ_zmeny = "typ_zmeny", nazev = "nazev", popis = "popis", velikost = "velikost", typ_dif = "typ_dif", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", priz_verejny = "priz_verejny",}
	const enum GGdesdifhhDtoFragments { iud_por = "*", iud_dat_zmena = "*", ixs_dif = "*", typ_zmeny = "*", nazev = "*", popis = "*", velikost = "*", typ_dif = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", priz_verejny = "*",}
	const enum GGdesdifhhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", ixs_dif = "string", typ_zmeny = "string", nazev = "string", popis = "string", velikost = "number", typ_dif = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", priz_verejny = "number",}
	const enum GGdesdifhhDtoTypeLengths { ixs_dif = 12, typ_zmeny = 1, nazev = 254, popis = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevaks*/
	interface GGdevaksDto {
		/**DBCOLUMN:gdevaks.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdevaks.ixs_dif*/
		ixs_dif?: string|null;
		/**DBCOLUMN:gdesdif.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesdif.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdesdif.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gdesdif.typ_dif*/
		typ_dif?: number|null;
		/**DBCOLUMN:gdevaks.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevaks.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevaks.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevaks.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Baliky licenci*/
		zmenil?: string|null;
	}
	const enum GGdevaksDtoNames { ixs_sdb = "ixs_sdb", ixs_dif = "ixs_dif", nazev = "nazev", popis = "popis", velikost = "velikost", typ_dif = "typ_dif", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevaksDtoFragments { ixs_sdb = "*", ixs_dif = "*", nazev = "*", popis = "*", velikost = "*", typ_dif = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevaksDtoTypes { ixs_sdb = "string", ixs_dif = "string", nazev = "string", popis = "string", velikost = "number", typ_dif = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevaksDtoTypeLengths { ixs_sdb = 12, ixs_dif = 12, nazev = 254, popis = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznam Dalsi soubory*/
	const enum GDalsiSouboryFilterEnum {
		/**filtr pro DB paramter adt_user_dif*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr na identifikator souboru*/
		ixs_dif,
		/**filtr na identifikator skupiny DB*/
		ixs_sdb,
		/**filtr na nazev souboru*/
		nazev,
		/**filtr na popis souboru*/
		popis,
		/**filtr na typ souboru*/
		typ_dif,
		/**filtr na aktivitu*/
		aktivita,
		/**filtr na poznamku*/
		poznamka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\LicencniPoplatky\IGChybaLicPopl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na Chyby*/
	interface ChybaLicPopl {
		/**Metoda List pro seznam ulohy Chyby*/
		listChyby(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GChybaLicPoplDto>>;
		/**Metoda List pro seznam Historie kontrol*/
		listHistorieKontrol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GChybaLicPoplDto>>;
		/**Metoda upsert pro log pristupu k uloze Licencni poplatky/chyby*/
		upsertLogChyby(rq?:Gordic.Adt.Interface.GGdelkolDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdelkolDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdelkolDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdelkolDto>>;
		/**Metoda List pro datum platnosti fakturačních údajů*/
		listDatumPlatnostiUdaju(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GChybaLicPoplDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ChybaLicPopl: ServiceBase & Catalog.ChybaLicPopl;
	}
	const ChybaLicPopl: Client["ChybaLicPopl"];
}
declare namespace Gordic.Adt.Interface {
	/**DTO pro ulohu Chyby*/
	interface GChybaLicPoplDto {
		/**DBCOLUMN:gdesldb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdedlip.dat_od*/
		dat_od?: JsonDate|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**DBCOLUMN:gdedlip.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdedlip.dat_do*/
		dat_do?: JsonDate|null;
		/**Počet licencí*/
		pocet?: JsonDecimal|null;
		/**DBCOLUMN:gdedlip.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesfkd.dat_akt*/
		dat_akt?: JsonDate|null;
		/**DBCOLUMN:gdedlip.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Baliky licenci*/
		zmenil?: string|null;
		/**Důvod*/
		duvod?: string|null;
		/**Datum nákupu*/
		dat_nakup?: JsonDate|null;
		/**DBCOLUMN:gdecnpo.popis*/
		popisPol?: string|null;
		/**DBCOLUMN:gdecpro.popis*/
		popisPpol?: string|null;
		/**Rezim licence*/
		rezim_lic_txt?: string|null;
		/**DBCOLUMN:gdeslip.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdeslip.ico_fakt*/
		ico_fakt?: string|null;
		/**DBCOLUMN:jine_ico*/
		jine_ico?: string|null;
		/**DBCOLUMN:nazev_ico_fakt_txt*/
		nazev_ico_fakt_txt?: string|null;
		/**DBCOLUMN:ico_fakt_txt*/
		ico_fakt_txt?: string|null;
		/**DBCOLUMN:gdeslip.ico_adm*/
		ico_adm?: string|null;
		/**DBCOLUMN:nazev_ico_adm_txt*/
		nazev_ico_adm_txt?: string|null;
		/**DBCOLUMN:ico_adm_txt*/
		ico_adm_txt?: string|null;
		/**DBCOLUMN:posledni_faktura*/
		posledni_faktura?: string|null;
		/**ico_celkem_rok_zpet*/
		ico_celkem_rok_zpet?: JsonDecimal|null;
		/**pol_celkem_rok_zpet*/
		pol_celkem_rok_zpet?: JsonDecimal|null;
		/**pol_licence_celkem_rok_zpet*/
		pol_licence_celkem_rok_zpet?: JsonDecimal|null;
		/**ico_celkem_dva_roky_zpet*/
		ico_celkem_dva_roky_zpet?: JsonDecimal|null;
		/**pol_celkem_dva_roky_zpet*/
		pol_celkem_dva_roky_zpet?: JsonDecimal|null;
		/**pol_licence_celkem_dva_roky_zpet*/
		pol_licence_celkem_dva_roky_zpet?: JsonDecimal|null;
		/**DBCOLUMN:posledni_fakturace*/
		posledni_fakturace?: JsonDate|null;
		/**DBCOLUMN:Kontrola fakturace*/
		stav_fakturace?: string|null;
		/**DBCOLUMN:Upozornění na neplatné kombinace licencí*/
		stav_kontroly_lic?: string|null;
		/**DBCOLUMN:Upozornění na neplatnou ppol*/
		stav_kontroly_ppol?: string|null;
		/**Pořizovací cena licence*/
		c_nakup?: JsonDecimal|null;
		/**Pořizovací cena licence uvedená procentem*/
		c_procentem?: JsonDecimal|null;
		/**cena maintenance licence*/
		c_maintenance?: JsonDecimal|null;
		/**cena SaaS licence*/
		c_saas?: JsonDecimal|null;
		/**Perioda plateb SaaS (1=mesíční / 3 = čtvrtletní / 12 = roční)*/
		perioda_saas?: number|null;
		/**Vedoucí projektu - osoba zodpovědná za balík licencí*/
		vedouci_projektu?: string|null;
		/**Email vedoucího projektu - email osoby zodpovědné za balík licencí*/
		vedouci_projektu_mail?: string|null;
	}
	const enum GChybaLicPoplDtoNames { lic_fyz = "lic_fyz", dat_od = "dat_od", pol = "pol", ppol = "ppol", poznamka = "poznamka", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", dat_akt = "dat_akt", zmenu_prov = "zmenu_prov", zmenil = "zmenil", duvod = "duvod", dat_nakup = "dat_nakup", popisPol = "popisPol", popisPpol = "popisPpol", rezim_lic_txt = "rezim_lic_txt", nazev = "nazev", ico_fakt = "ico_fakt", jine_ico = "jine_ico", nazev_ico_fakt_txt = "nazev_ico_fakt_txt", ico_fakt_txt = "ico_fakt_txt", ico_adm = "ico_adm", nazev_ico_adm_txt = "nazev_ico_adm_txt", ico_adm_txt = "ico_adm_txt", posledni_faktura = "posledni_faktura", ico_celkem_rok_zpet = "ico_celkem_rok_zpet", pol_celkem_rok_zpet = "pol_celkem_rok_zpet", pol_licence_celkem_rok_zpet = "pol_licence_celkem_rok_zpet", ico_celkem_dva_roky_zpet = "ico_celkem_dva_roky_zpet", pol_celkem_dva_roky_zpet = "pol_celkem_dva_roky_zpet", pol_licence_celkem_dva_roky_zpet = "pol_licence_celkem_dva_roky_zpet", posledni_fakturace = "posledni_fakturace", stav_fakturace = "stav_fakturace", stav_kontroly_lic = "stav_kontroly_lic", stav_kontroly_ppol = "stav_kontroly_ppol", c_nakup = "c_nakup", c_procentem = "c_procentem", c_maintenance = "c_maintenance", c_saas = "c_saas", perioda_saas = "perioda_saas", vedouci_projektu = "vedouci_projektu", vedouci_projektu_mail = "vedouci_projektu_mail",}
	const enum GChybaLicPoplDtoFragments { lic_fyz = "*", dat_od = "*", pol = "*", ppol = "*", poznamka = "*", dat_do = "*", pocet = "*", dat_zmena = "*", dat_akt = "*", zmenu_prov = "*", zmenil = "*", duvod = "*", dat_nakup = "*", popisPol = "*", popisPpol = "*", rezim_lic_txt = "*", nazev = "*", ico_fakt = "*", jine_ico = "*", nazev_ico_fakt_txt = "*", ico_fakt_txt = "*", ico_adm = "*", nazev_ico_adm_txt = "*", ico_adm_txt = "*", posledni_faktura = "*", ico_celkem_rok_zpet = "*", pol_celkem_rok_zpet = "*", pol_licence_celkem_rok_zpet = "*", ico_celkem_dva_roky_zpet = "*", pol_celkem_dva_roky_zpet = "*", pol_licence_celkem_dva_roky_zpet = "*", posledni_fakturace = "*", stav_fakturace = "*", stav_kontroly_lic = "*", stav_kontroly_ppol = "*", c_nakup = "*", c_procentem = "*", c_maintenance = "*", c_saas = "*", perioda_saas = "*", vedouci_projektu = "*", vedouci_projektu_mail = "*",}
	const enum GChybaLicPoplDtoTypes { lic_fyz = "string", dat_od = "JsonDate", pol = "string", ppol = "string", poznamka = "string", dat_do = "JsonDate", pocet = "JsonDecimal", dat_zmena = "JsonDate", dat_akt = "JsonDate", zmenu_prov = "string", zmenil = "string", duvod = "string", dat_nakup = "JsonDate", popisPol = "string", popisPpol = "string", rezim_lic_txt = "string", nazev = "string", ico_fakt = "string", jine_ico = "string", nazev_ico_fakt_txt = "string", ico_fakt_txt = "string", ico_adm = "string", nazev_ico_adm_txt = "string", ico_adm_txt = "string", posledni_faktura = "string", ico_celkem_rok_zpet = "JsonDecimal", pol_celkem_rok_zpet = "JsonDecimal", pol_licence_celkem_rok_zpet = "JsonDecimal", ico_celkem_dva_roky_zpet = "JsonDecimal", pol_celkem_dva_roky_zpet = "JsonDecimal", pol_licence_celkem_dva_roky_zpet = "JsonDecimal", posledni_fakturace = "JsonDate", stav_fakturace = "string", stav_kontroly_lic = "string", stav_kontroly_ppol = "string", c_nakup = "JsonDecimal", c_procentem = "JsonDecimal", c_maintenance = "JsonDecimal", c_saas = "JsonDecimal", perioda_saas = "number", vedouci_projektu = "string", vedouci_projektu_mail = "string",}
	const enum GChybaLicPoplDtoTypeLengths { lic_fyz = 4, pol = 4, ppol = 3, poznamka = 254, zmenu_prov = 12, zmenil = 100, duvod = 254, popisPol = 254, popisPpol = 254, nazev = 500, ico_fakt = 10, jine_ico = 10, nazev_ico_fakt_txt = 100, ico_fakt_txt = 10, ico_adm = 10, nazev_ico_adm_txt = 100, ico_adm_txt = 10, posledni_faktura = 100, stav_fakturace = 50, stav_kontroly_lic = 50, stav_kontroly_ppol = 50, vedouci_projektu = 500, vedouci_projektu_mail = 500,}
	/**DTO pro ulohu Chyby - historie přístupů (gdelkol)*/
	interface GGdelkolDto {
		/**DBCOLUMN:gdelkol.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdelkol.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu histori přístupů k chybám v licenčních poplatcích*/
		zmenil?: string|null;
	}
	const enum GGdelkolDtoNames { dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdelkolDtoFragments { dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdelkolDtoTypes { dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdelkolDtoTypeLengths { zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznam ulohy Vyjimky databaze*/
	const enum GChybaLicPoplFilterEnum {
		/**filtr na datum*/
		datum,
		/**filtr na pocatek data licence*/
		datum_lic_od,
		/**filtr na mesic*/
		mesic,
		/**filtr na datum platnosti do*/
		dat_do,
		/**filtr platnost k zadanemu datu*/
		dat_platnost,
		/**filtr na popis*/
		popis,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele, ktery provedl zmenu*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_licpop*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\LicencniPoplatky\IGFakturaceNaJineICO.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek pro ulohu Fakturace na jine ICO*/
	interface FakturaceNaJineICO {
		/**Metoda List pro seznam ulohy Vyjimky databaze (poduloha Licencnich polatku)*/
		listFakturaceNaJineICO(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesliiTabDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FakturaceNaJineICO: ServiceBase & Catalog.FakturaceNaJineICO;
	}
	const FakturaceNaJineICO: Client["FakturaceNaJineICO"];
}
declare namespace Gordic.Adt.Interface {
	/**Možné položky filtru pro seznam ulohy Vyjimky databaze*/
	const enum GFakturaceNaJineICOFilterEnum {
		/**filtr na licenci*/
		lic,
		/**filtr na pol*/
		pol,
		/**filtr na ppol*/
		ppol,
		/**filtr na datum platnosti od*/
		dat_od,
		/**filtr na datum platnosti do*/
		dat_do,
		/**filtr platnost k zadanemu datu*/
		dat_platnost,
		/**filtr na ICO pro fakturaci*/
		ico_fakt,
		/**filtr na popis*/
		popis,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele, ktery provedl zmenu*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_licpop*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\LicencniPoplatky\IGVyjimkyDatabaze.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na Vyjimky databaze*/
	interface VyjimkyDatabaze {
		/**Metoda List pro seznam ulohy Vyjimky databaze (poduloha Licencnich polatku)*/
		listVyjimkyDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdbnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VyjimkyDatabaze: ServiceBase & Catalog.VyjimkyDatabaze;
	}
	const VyjimkyDatabaze: Client["VyjimkyDatabaze"];
}
declare namespace Gordic.Adt.Interface {
	/**Možné položky filtru pro seznam ulohy Vyjimky databaze*/
	const enum GVyjimkyDatabazeFilterEnum {
		/**filtr na licenci*/
		lic,
		/**filtr na datum platnosti od*/
		dat_od,
		/**filtr na datum platnosti do*/
		dat_do,
		/**filtr platnost k zadanemu datu*/
		dat_platnost,
		/**filtr na popis*/
		popis,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele, ktery provedl zmenu*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_licpop*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\LicencniPoplatky\IGVyjimkyDatabazePol.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na Vyjimky databaze Pol*/
	interface VyjimkyDatabazePol {
		/**Metoda List pro seznam ulohy Vyjimky databaze (poduloha Licencnich polatku)*/
		listVyjimkyDatabazePol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslinDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VyjimkyDatabazePol: ServiceBase & Catalog.VyjimkyDatabazePol;
	}
	const VyjimkyDatabazePol: Client["VyjimkyDatabazePol"];
}
declare namespace Gordic.Adt.Interface {
	/**Možné položky filtru pro seznam ulohy Vyjimky databaze*/
	const enum GVyjimkyDatabazePolFilterEnum {
		/**filtr na licenci*/
		lic,
		/**filtr na pol*/
		pol,
		/**filtr na datum platnosti od*/
		dat_od,
		/**filtr na datum platnosti do*/
		dat_do,
		/**filtr platnost k zadanemu datu*/
		dat_platnost,
		/**filtr na popis*/
		popis,
		/**filtr na datum zmeny*/
		dat_zmena,
		/**filtr na uzivatele, ktery provedl zmenu*/
		zmenu_prov,
		/**filtr pro DB paramter adt_user_licpop*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\PopisyZmen\IGPopisyZmen.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Registr licenci/Baliky licenci (Balík licencí = množina dílčích licencí)
	* @domain CentralAdmin
	* @businessObject GPopisyZmenDto
	*/
	interface PopisyZmen {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PopisyZmen: ServiceBase & Catalog.PopisyZmen;
	}
	const PopisyZmen: Client["PopisyZmen"];
}
declare namespace Gordic.Adt.Interface {
	/**GHistorieZmenDto - Hlavní datový objekt Historie změn*/
	interface GChangelogDto {
		/**Identifikátor Historie změny*/
		ixs_hist?: string|null;
		/**Pořadí změny (Každý changelog může mít X záznamů)*/
		radek_hist?: number|null;
		/**Typ změny (Novinka/Oprava/Next)*/
		typ_zmeny?: number|null;
		/**Tagy pro Historii změn*/
		tagy?: string[]|null;
		/**Příznak zobrazení změny (0=NE-Private/1=ANO-Public)*/
		priz_zobr?: number|null;
		/**Verze databaze*/
		verze_db?: number|null;
		/**Subverze databaze*/
		sub_verze_db?: number|null;
		/**Autor historie změny*/
		autor?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Aktivita Historie změny*/
		aktivita?: number|null;
		/**Obsah - slovní popis historie změny*/
		obsah?: string|null;
		/**Název souboru sestavy*/
		file_ses?: string|null;
		/**Identifikátor sestavy*/
		id_ses?: string|null;
		/**Příznak legislativní změny (0=NE/1=ANO)*/
		legislativa?: number|null;
		/**Začátek platnosti tiskové sestavy*/
		dat_od_ses?: JsonDate|null;
		/**Konec platnosti tiskové sestavy*/
		dat_do_ses?: JsonDate|null;
		/**Pořadí třídění změn v sestavě*/
		order_ses?: number|null;
		/**url externího článku*/
		url?: string|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
	}
	const enum GChangelogDtoNames { ixs_hist = "ixs_hist", radek_hist = "radek_hist", typ_zmeny = "typ_zmeny", tagy = "tagy", priz_zobr = "priz_zobr", verze_db = "verze_db", sub_verze_db = "sub_verze_db", autor = "autor", faze = "faze", aktivita = "aktivita", obsah = "obsah", file_ses = "file_ses", id_ses = "id_ses", legislativa = "legislativa", dat_od_ses = "dat_od_ses", dat_do_ses = "dat_do_ses", order_ses = "order_ses", url = "url", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GChangelogDtoFragments { ixs_hist = "*", radek_hist = "*", typ_zmeny = "*", tagy = "*", priz_zobr = "*", verze_db = "*", sub_verze_db = "*", autor = "*", faze = "*", aktivita = "*", obsah = "*", file_ses = "*", id_ses = "*", legislativa = "*", dat_od_ses = "*", dat_do_ses = "*", order_ses = "*", url = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GChangelogDtoTypes { ixs_hist = "string", radek_hist = "number", typ_zmeny = "number", tagy = "string[]", priz_zobr = "number", verze_db = "number", sub_verze_db = "number", autor = "string", faze = "string", aktivita = "number", obsah = "string", file_ses = "string", id_ses = "string", legislativa = "number", dat_od_ses = "JsonDate", dat_do_ses = "JsonDate", order_ses = "number", url = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GChangelogDtoTypeLengths { ixs_hist = 12, autor = 500, faze = 12, obsah = 5000, file_ses = 12, id_ses = 12, url = 500, zmenu_prov = 12,}
	/**Možné položky filtru pro Baliky licenci*/
	const enum GPopisyZmenFilterEnum {
		/**filtr na historii změny - identifikator historie zmeny*/
		ixs_hist,
		/**filtr na tagy náležící k popisu změny (pole hodnot)*/
		tagy,
		/**Autor zmeny*/
		autor,
		/**filtr na typ_zmeny = (Novinka/Oprava)*/
		typ_zmeny,
		/**filtr na Identifik8tor sestavy*/
		id_ses,
		/**filtr na soubor sestavy*/
		file_ses,
		/**filtr na legislativní změnu*/
		legislativa,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\PopisyZmen\IGPopisZmeny.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Popisy změn
	* @domain CentralAdmin
	* @businessObject GPopisZmenyDto
	*/
	interface PopisZmeny {
		/**Metoda List - Popisy změn*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Metoda Read pro detail Popisu změny*/
		read(rq?:Gordic.Adt.Interface.GPopisZmenyDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GPopisZmenyDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GPopisZmenyDto>,GServiceReadResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Založení/Update popisu změny*/
		upsert(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GPopisZmenyDto>,fieldTags:string[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GPopisZmenyDto>,fieldTags:string[]},GServiceSaveResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Zrušení popisu změny*/
		delete(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GPopisZmenyDto>,fieldTags:string[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GPopisZmenyDto>,fieldTags:string[]},void>;
		/**Metoda List - Veřejné popisy změn*/
		listPublic(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Metoda List - Společné tagy dle programové fáze*/
		listTagFaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevtafDto>>;
		/**Založení/Update skupiny/karty s tagy*/
		upsertSkupinaTagu(rq?:Gordic.Adt.Interface.GSkupinyTaguDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GSkupinyTaguDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GSkupinyTaguDto>,boolean>;
		/**Založení/Update statických tagů skupiny/karty s tagy*/
		upsertGdevkta(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GObsahSkupinyTaguDto>,fieldTags:string[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GObsahSkupinyTaguDto>,fieldTags:string[]},boolean>;
		/**Zrušení statických tagů skupiny/karty s tagy*/
		deleteGdevkta(rq?:Gordic.Adt.Interface.GObsahSkupinyTaguDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GObsahSkupinyTaguDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GObsahSkupinyTaguDto>,boolean>;
		/**Založení/Update obsahu skupiny/karty s tagy*/
		upsertObsahSkupinaTagu(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GSkupinyTaguDto>,fieldTags:string[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GSkupinyTaguDto>,fieldTags:string[]},void>;
		/**Metoda List - Uživatelské záložky s popisy změn (Uživatelská skupina tagů)*/
		listSkupinyTagu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSkupinyTaguDto>>;
		/**Metoda List - Tagy náležící k uživatelské záložce skupiny změn (Tagy Obsažené v záložce/uživatelské skupině tagů)*/
		listObsahSkupinyTagu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GObsahSkupinyTaguDto>>;
		/**Import společných popisů změn k revizi (Nabídka popisů změn společných komponent na detailu revize)*/
		importPopisyZmen(rq?:CallParams<{fieldIxsKmp:string[],tag:string}>): _Task<{fieldIxsKmp:string[],tag:string},void>;
		/**Import popisů změn k revizím sestav (ref T28988)*/
		importPopisyZmenSestav(rq?:Gordic.Adt.Interface.GPopisyZmenSestav|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GPopisyZmenSestav>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GPopisyZmenSestav>,GServiceSaveResponse<Gordic.Adt.Interface.GPopisyZmenSestav>>;
		/**Zrušení popisů změn vázaných k revizi/GDZ balíku*/
		zrusitPopisyZmen(rq?:CallParams<{fieldIxsKmp:string[],tag:string}>): _Task<{fieldIxsKmp:string[],tag:string},void>;
		/**Zrušení skupiny s popisy změn*/
		zrusitSkupinuPopisuZmen(rq?:CallParams<{ixsKta:string}>): _Task<{ixsKta:string},void>;
		/**Import - Veřejné popisy změn z webové prohlížečky*/
		importChangeLog(rq?:Gordic.Adt.Interface.GChangeLogParamsDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GChangeLogParamsDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GChangeLogParamsDto>,void>;
		/**Import - Neveřejné popisy změn z webové prohlížečky*/
		importPrivateChangeLog(rq?:Gordic.Adt.Interface.GChangeLogParamsDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GChangeLogParamsDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GChangeLogParamsDto>,void>;
		/**Import - Popisy změn v sestavách*/
		importReportChangeLog(rq?:Gordic.Adt.Interface.GChangeLogParamsDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GChangeLogParamsDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GChangeLogParamsDto>,void>;
		/**Akceptace popisů změn*/
		akceptovat(rq?:CallParams<{rqField:Gordic.Adt.Interface.GPopisZmenyDto[],revize:string}>): _Task<{rqField:Gordic.Adt.Interface.GPopisZmenyDto[],revize:string},void>;
		/**RevBranchesFilters*/
		revBranchesFilters(rq?:CallParams<{list:Gordic.Adt.Interface.GGdesrevDto[],revisionStart:Gordic.Adt.Interface.GGdesrevDto}>): _Task<{list:Gordic.Adt.Interface.GGdesrevDto[],revisionStart:Gordic.Adt.Interface.GGdesrevDto},GServiceListResponse<Gordic.Adt.Interface.GGdesrevDto>>;
		/**Data*/
		loadData(rq?:CallParams<{VstupniData:Gordic.Adt.Interface.GPopisZmenyDto,tagyData:string[]}>): _Task<{VstupniData:Gordic.Adt.Interface.GPopisZmenyDto,tagyData:string[]},GServiceListResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Nacteni importního souboru s popisy změn (v XML)*/
		loadChangelogFromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto},GServiceListResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Nacteni uživatelského textu s popisy změn*/
		loadUserChangelogFromFile(rq?:CallParams<{userChangeLog:string}>): _Task<{userChangeLog:string},GServiceListResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PopisZmeny: ServiceBase & Catalog.PopisZmeny;
	}
	const PopisZmeny: Client["PopisZmeny"];
}
declare namespace Gordic.Adt.Interface {
	/**GPopisZmenDto - Hlavní datový objekt k popisům změn, které budou společné všem kartám popisů*/
	interface GPopisZmenyDto {
		/**Identifikátor popisu změny*/
		ixs_kmp?: string|null;
		/**Typ zmeny (0 = Novinka / 10 = Oprava / 20 = Známá chyba / 30 = Interní poznámka)*/
		typ_zmeny_kmp?: number|null;
		/**Typ zmeny textově (0 = Novinka / 10 = Oprava / 20 = Známá chyba / 30 = Interní poznámka)*/
		typ_zmeny_kmp_txt?: string|null;
		/**Popis změny*/
		popis?: string|null;
		/**Poznámka k popisu změny*/
		poznamky?: string|null;
		/**Příznak veřejného popisu změny (0 = Neveřejný popis / 1 = veřejný popis)*/
		priz_verejny?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**tagy k popisu změny (String obsahující náležící tagy oddělené od sebe středníkem)*/
		tagy?: string|null;
		/**tagy vázané ke kartě s popisy zmněn (String obsahující náležící tagy oddělené od sebe středníkem)*/
		karta_tagy?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Pole fází*/
		fazeField?: string[]|null;
		/**Pole tagů*/
		tagyField?: string|null;
		/**Datum změny od*/
		dat_od?: JsonDate|null;
		/**Datum změny do*/
		dat_do?: JsonDate|null;
		/**Příznak neveřejné prohlížky změn v ADT07 (0 = NE / 1 = ANO)*/
		private_mode?: number|null;
		/**DBCOLUMN:gdeskmp.kotva*/
		kotva?: string|null;
		/**DBCOLUMN:gdeskmp.kotva*/
		kotvaDesc?: string|null;
	}
	const enum GPopisZmenyDtoNames { ixs_kmp = "ixs_kmp", typ_zmeny_kmp = "typ_zmeny_kmp", typ_zmeny_kmp_txt = "typ_zmeny_kmp_txt", popis = "popis", poznamky = "poznamky", priz_verejny = "priz_verejny", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", tagy = "tagy", karta_tagy = "karta_tagy", zmenil = "zmenil", fazeField = "fazeField", tagyField = "tagyField", dat_od = "dat_od", dat_do = "dat_do", private_mode = "private_mode", kotva = "kotva", kotvaDesc = "kotvaDesc",}
	const enum GPopisZmenyDtoFragments { ixs_kmp = "*", typ_zmeny_kmp = "*", typ_zmeny_kmp_txt = "*", popis = "*", poznamky = "*", priz_verejny = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", tagy = "*", karta_tagy = "*", zmenil = "*", fazeField = "*", tagyField = "*", dat_od = "*", dat_do = "*", private_mode = "*", kotva = "*", kotvaDesc = "*",}
	const enum GPopisZmenyDtoTypes { ixs_kmp = "string", typ_zmeny_kmp = "number", typ_zmeny_kmp_txt = "string", popis = "string", poznamky = "string", priz_verejny = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", tagy = "string", karta_tagy = "string", zmenil = "string", fazeField = "string[]", tagyField = "string", dat_od = "JsonDate", dat_do = "JsonDate", private_mode = "number", kotva = "string", kotvaDesc = "string",}
	const enum GPopisZmenyDtoTypeLengths { ixs_kmp = 12, typ_zmeny_kmp = 12, typ_zmeny_kmp_txt = 12, popis = 4000, poznamky = 4000, zmenu_prov = 12, tagy = 20000, karta_tagy = 2000, zmenil = 100, tagyField = 256, kotva = 50, kotvaDesc = 50,}
	/**GTagyPopisuZmenDto - Datový objekt s tagy k jednotlivým popisům změn*/
	interface GTagyPopisuZmenDto {
		/**Název tagu*/
		tag?: string|null;
		/**Identifikátor Popisu změny*/
		ixs_kmp?: string|null;
		/**Typ tagu*/
		typ_tagu?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GTagyPopisuZmenDtoNames { tag = "tag", ixs_kmp = "ixs_kmp", typ_tagu = "typ_tagu", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GTagyPopisuZmenDtoFragments { tag = "*", ixs_kmp = "*", typ_tagu = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GTagyPopisuZmenDtoTypes { tag = "string", ixs_kmp = "string", typ_tagu = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GTagyPopisuZmenDtoTypeLengths { tag = 50, ixs_kmp = 12, zmenu_prov = 12, zmenil = 100,}
	/**GObsahSkupinyTaguDto - Datový objekt s tagy pro skupinu/kartu popisů změn*/
	interface GObsahSkupinyTaguDto {
		/**tag navázaný na skupinu/kartu s popisy změn*/
		tag?: string|null;
		/**Identifikátor skupiny/karty popisů změn*/
		ixs_kta?: string|null;
	}
	const enum GObsahSkupinyTaguDtoNames { tag = "tag", ixs_kta = "ixs_kta",}
	const enum GObsahSkupinyTaguDtoFragments { tag = "*", ixs_kta = "*",}
	const enum GObsahSkupinyTaguDtoTypes { tag = "string", ixs_kta = "string",}
	const enum GObsahSkupinyTaguDtoTypeLengths { tag = 50, ixs_kta = 12,}
	/**GSkupinyTaguDto - Datový objekt pro založené karty (skupiny) s tagy pro jednotlivé uživatele*/
	interface GSkupinyTaguDto {
		/**Identifikátor skupiny tagů*/
		ixs_kta?: string|null;
		/**Název skupiny/záložky s popisy změn*/
		nazev?: string|null;
		/**Identifikátor zakladatele karty skupiny tagu*/
		ixs_fun?: string|null;
		/**Identifikátor pohledu změny*/
		ixs_pzm?: string|null;
		/**Identifikátor popisu změn*/
		ixs_kmp?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GSkupinyTaguDtoNames { ixs_kta = "ixs_kta", nazev = "nazev", ixs_fun = "ixs_fun", ixs_pzm = "ixs_pzm", ixs_kmp = "ixs_kmp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GSkupinyTaguDtoFragments { ixs_kta = "*", nazev = "*", ixs_fun = "*", ixs_pzm = "*", ixs_kmp = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GSkupinyTaguDtoTypes { ixs_kta = "string", nazev = "string", ixs_fun = "string", ixs_pzm = "string", ixs_kmp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GSkupinyTaguDtoTypeLengths { ixs_kta = 12, nazev = 50, ixs_fun = 12, ixs_pzm = 12, ixs_kmp = 12, zmenu_prov = 12, zmenil = 100,}
	/**GSkupinyTaguDto - Datový objekt pro založené karty (skupiny) s tagy pro jednotlivé uživatele*/
	interface GPohledPopisZmenDto {
		/**Identifikátor pohledu změny*/
		ixs_pzm?: string|null;
		nazev?: string|null;
		pohled?: string|null;
		/**Identifikátor zakladatele pohledu*/
		ixs_fun?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GPohledPopisZmenDtoNames { ixs_pzm = "ixs_pzm", nazev = "nazev", pohled = "pohled", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GPohledPopisZmenDtoFragments { ixs_pzm = "*", nazev = "*", pohled = "*", ixs_fun = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GPohledPopisZmenDtoTypes { ixs_pzm = "string", nazev = "string", pohled = "string", ixs_fun = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GPohledPopisZmenDtoTypeLengths { ixs_pzm = 12, nazev = 50, pohled = 4000, ixs_fun = 12, zmenu_prov = 12, zmenil = 100,}
	/**GGdeskmpDto - Pomocný datový objekt s popisy změn*/
	interface GGdeskmpDto {
		/**Identifikátor Komponenty*/
		ixs_kmp?: string|null;
		ixs_kta?: string|null;
		/**Identifikátor zakladatele karty komponenty*/
		ixs_fun?: string|null;
		/**Typ komponenty (Fáze/Sestava/Databáze)*/
		typ_kmp?: number|null;
		/**Název karty komponenty*/
		nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Nejvyssi radek karty s popisy*/
		radek_max?: number|null;
	}
	const enum GGdeskmpDtoNames { ixs_kmp = "ixs_kmp", ixs_kta = "ixs_kta", ixs_fun = "ixs_fun", typ_kmp = "typ_kmp", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", radek_max = "radek_max",}
	const enum GGdeskmpDtoFragments { ixs_kmp = "*", ixs_kta = "*", ixs_fun = "*", typ_kmp = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", radek_max = "*",}
	const enum GGdeskmpDtoTypes { ixs_kmp = "string", ixs_kta = "string", ixs_fun = "string", typ_kmp = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", radek_max = "number",}
	const enum GGdeskmpDtoTypeLengths { ixs_kmp = 12, ixs_kta = 12, ixs_fun = 12, nazev = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GChangeLogParamsDto - DTO s parametry pro volání webové služby*/
	interface GChangeLogParamsDto {
		/**URL pro získání changeLogu*/
		url?: string|null;
		/**JSON changeLog*/
		json?: string|null;
		/**titulek*/
		title?: string|null;
		/**kategorie*/
		category?: string|null;
		/**link*/
		link?: string|null;
		/**description*/
		description?: string|null;
		/**datum zveřejnění*/
		pubDate?: JsonDate|null;
		/**datum úpravy*/
		lastBuildDate?: JsonDate|null;
		/**Datum*/
		date?: JsonDate|null;
		/**Město*/
		mesto?: string|null;
		/**Img - obrázek*/
		img?: Gordic.Gin.Interface.RssImage|null;
	}
	const enum GChangeLogParamsDtoNames { url = "url", json = "json", title = "title", category = "category", link = "link", description = "description", pubDate = "pubDate", lastBuildDate = "lastBuildDate", date = "date", mesto = "mesto", img = "img",}
	const enum GChangeLogParamsDtoFragments { url = "*", json = "*", title = "*", category = "*", link = "*", description = "*", pubDate = "*", lastBuildDate = "*", date = "*", mesto = "*", img = "*",}
	const enum GChangeLogParamsDtoTypes { url = "string", json = "string", title = "string", category = "string", link = "string", description = "string", pubDate = "JsonDate", lastBuildDate = "JsonDate", date = "JsonDate", mesto = "string", img = "Gordic.Gin.Interface.RssImage",}
	const enum GChangeLogParamsDtoTypeLengths {}
	/**GDataChangeLogDto - DTO s daty pro import popisů změn webové prohlížečky*/
	interface GDataChangeLogDto {
		/**Vrácená strakturovaná datata z veřejné prohlížečky změn*/
		d?: Gordic.Adt.Interface.GDataImportDto|null;
	}
	const enum GDataChangeLogDtoNames { d = "d",}
	const enum GDataChangeLogDtoFragments { d = "*",}
	const enum GDataChangeLogDtoTypes { d = "Gordic.Adt.Interface.GDataImportDto",}
	const enum GDataChangeLogDtoTypeLengths {}
	/**GDataImportDto - DTO pro import historických popisů změn*/
	interface GDataImportDto {
		/**Vráyená kolekce data z veřejné prohlížečky změn*/
		DataArr?: Gordic.Adt.Interface.GDataArrDto[]|null;
		/**Celkový počet vrácených záznamů*/
		ResultTotalCount?: number|null;
		/**Rozsah stran s popisy změn*/
		PageItemCount?: number|null;
		/**Startovní index pro výběr popisů změn*/
		StartIndex?: number|null;
		/**Předchozí Startovní index*/
		PrevStartIndex?: number|null;
		/**Příznak předchozího start. indexu*/
		IsPrevLinkEnabled?: boolean|null;
		/**Příznak odkazu*/
		IsNextLinkEnabled?: boolean|null;
		/**Budoucí startovní index*/
		NextStartIndex?: number|null;
		/**Příznak pro zobrazení hlavičky projektů*/
		ShowProjectHeading?: boolean|null;
		/**Příznak odkazu k projektu*/
		ShowOpenProjectLink?: boolean|null;
		/**Chyba*/
		Error?: string|null;
		/**Vyhodnocení chyb*/
		ValidationErrors?: string|null;
	}
	const enum GDataImportDtoNames { DataArr = "DataArr", ResultTotalCount = "ResultTotalCount", PageItemCount = "PageItemCount", StartIndex = "StartIndex", PrevStartIndex = "PrevStartIndex", IsPrevLinkEnabled = "IsPrevLinkEnabled", IsNextLinkEnabled = "IsNextLinkEnabled", NextStartIndex = "NextStartIndex", ShowProjectHeading = "ShowProjectHeading", ShowOpenProjectLink = "ShowOpenProjectLink", Error = "Error", ValidationErrors = "ValidationErrors",}
	const enum GDataImportDtoFragments { DataArr = "*", ResultTotalCount = "*", PageItemCount = "*", StartIndex = "*", PrevStartIndex = "*", IsPrevLinkEnabled = "*", IsNextLinkEnabled = "*", NextStartIndex = "*", ShowProjectHeading = "*", ShowOpenProjectLink = "*", Error = "*", ValidationErrors = "*",}
	const enum GDataImportDtoTypes { DataArr = "Gordic.Adt.Interface.GDataArrDto[]", ResultTotalCount = "number", PageItemCount = "number", StartIndex = "number", PrevStartIndex = "number", IsPrevLinkEnabled = "boolean", IsNextLinkEnabled = "boolean", NextStartIndex = "number", ShowProjectHeading = "boolean", ShowOpenProjectLink = "boolean", Error = "string", ValidationErrors = "string",}
	const enum GDataImportDtoTypeLengths {}
	/**GDataArrDto - DTO pro import datových polí z veřejné prohlížečky změn*/
	interface GDataArrDto {
		/**Název souboru *.hist.xml*/
		FileName?: string|null;
		/**Zkratka modulu*/
		Abbr?: string|null;
		/**Programová fáze*/
		Faze?: string|null;
		/**Verze aplikace*/
		Verze?: string|null;
		/**Minimální verze databáze*/
		DbMin?: string|null;
		/**Revize (Verze programové fáze)*/
		Revize?: string|null;
		/**Datum publikování změny*/
		Datum?: string|null;
		/**Pole s jednotlivými typy popisů změn*/
		Items?: Gordic.Adt.Interface.GItemsDto[]|null;
	}
	const enum GDataArrDtoNames { FileName = "FileName", Abbr = "Abbr", Faze = "Faze", Verze = "Verze", DbMin = "DbMin", Revize = "Revize", Datum = "Datum", Items = "Items",}
	const enum GDataArrDtoFragments { FileName = "*", Abbr = "*", Faze = "*", Verze = "*", DbMin = "*", Revize = "*", Datum = "*", Items = "*",}
	const enum GDataArrDtoTypes { FileName = "string", Abbr = "string", Faze = "string", Verze = "string", DbMin = "string", Revize = "string", Datum = "string", Items = "Gordic.Adt.Interface.GItemsDto[]",}
	const enum GDataArrDtoTypeLengths {}
	/**GItemsDto - DTO s položkami veřejné prohlížečky změn*/
	interface GItemsDto {
		/**Typ prohlížení změn - Public/Private*/
		VersionType?: string|null;
		/**Popis změny*/
		Text?: string|null;
		/**Název souboru*/
		File?: string|null;
		/**ID Souboru (sestavy)*/
		IdSes?: string|null;
		/**Datum změny*/
		Changed?: string|null;
		/**Počátek platnosti sestavy*/
		ValidFrom?: string|null;
		/**Konec platnosti sestavy*/
		ValidTo?: string|null;
		/**Příznak veřejného popisu*/
		IsPublic?: boolean|null;
		/**Příznak legislativní změny*/
		IsLegislative?: boolean|null;
	}
	const enum GItemsDtoNames { VersionType = "VersionType", Text = "Text", File = "File", IdSes = "IdSes", Changed = "Changed", ValidFrom = "ValidFrom", ValidTo = "ValidTo", IsPublic = "IsPublic", IsLegislative = "IsLegislative",}
	const enum GItemsDtoFragments { VersionType = "*", Text = "*", File = "*", IdSes = "*", Changed = "*", ValidFrom = "*", ValidTo = "*", IsPublic = "*", IsLegislative = "*",}
	const enum GItemsDtoTypes { VersionType = "string", Text = "string", File = "string", IdSes = "string", Changed = "string", ValidFrom = "string", ValidTo = "string", IsPublic = "boolean", IsLegislative = "boolean",}
	const enum GItemsDtoTypeLengths {}
	/**GPopisyZmenSestav - Hlavní datový objekt pro sběr dat k popisům změn v sestavách*/
	interface GPopisyZmenSestav {
		/**Revize sestav*/
		revize?: string|null;
		/**Datový objekt zákaznické databáze (GGdesg0d)*/
		zmeny?: Gordic.Adt.Interface.GGdeskmpDto|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora importu popisů změn sestav*/
		zmenu_prov?: string|null;
	}
	const enum GPopisyZmenSestavNames { revize = "revize", zmeny = "zmeny", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPopisyZmenSestavFragments { revize = "*", zmeny = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPopisyZmenSestavTypes { revize = "string", zmeny = "Gordic.Adt.Interface.GGdeskmpDto", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPopisyZmenSestavTypeLengths { zmenu_prov = 12,}
	/**Možné položky filtru pro Popisy změn*/
	const enum GKomponentaFilterEnum {
		/**Tag k popisům změn*/
		tag,
		/**filtr na skupinu/kartu s popisy změn*/
		ixs_kta,
		/**filtr na komponentu - identifikator komponenty*/
		ixs_kmp,
		/**filtr na ixs_fun - identifikator autora karty komponenty*/
		ixs_fun,
		/**filtr na číselník typu komponenty (Modul/Sestava/DB)*/
		typ_komp,
		/**Název komponenty (Karty s popisy změn)*/
		nazev,
		/**filtr na aktivitu*/
		aktivita,
		/**Programová fáze*/
		faze,
		/**popis zmeny*/
		popis,
		/**revize v tagu*/
		revize,
		/**Příznak veřejného popisu změny*/
		priz_pouzity,
		/**Příznak již navázaného popisu změny*/
		priz_navazany,
		/**Filtr na datum změny*/
		dat_zmena,
		/**Filtr na změny od*/
		dat_od,
		/**Filtr na změny do*/
		dat_do,
		/**Filtr na verzi*/
		verze,
		/**Filtr na legislativní změny*/
		legZmena,
		/**Filtr na Novinky*/
		novinka,
		/**Filtr na opravy*/
		oprava,
		/**Filtr na poznámky*/
		poznamka,
		/**Filtr na známé chyby*/
		znamaChyba,
		/**Filtr na výčet Tagů*/
		fieldTags,
		/**Filtr na GDZ balík*/
		gdz,
		/**Příznak neveřejné prohlížky změn v ADT07 (0 = NE / 1 = ANO)*/
		privateMode,
		/**Filtr na kotvu*/
		kotva,
	}
	/**Možné položky filtru pro Popisy změn*/
	const enum GPopisZmenyLicDBFilterEnum {
		/**Tag k popisům změn*/
		tag,
		/**filtr na skupinu/kartu s popisy změn*/
		ixs_kta,
		/**filtr na komponentu - identifikator komponenty*/
		ixs_kmp,
		/**filtr na ixs_fun - identifikator autora karty komponenty*/
		ixs_fun,
		/**filtr na číselník typu komponenty (Modul/Sestava/DB)*/
		typ_komp,
		/**Název komponenty (Karty s popisy změn)*/
		nazev,
		/**filtr na aktivitu*/
		aktivita,
		/**Programová fáze*/
		faze,
		/**popis zmeny*/
		popis,
		/**revize v tagu*/
		revize,
		/**Příznak veřejného popisu změny*/
		priz_pouzity,
		/**Příznak již navázaného popisu změny*/
		priz_navazany,
		/**Filtr na datum změny*/
		dat_zmena,
		/**Filtr na změny od*/
		dat_od,
		/**Filtr na změny do*/
		dat_do,
		/**Filtr na verzi*/
		verze,
		/**Filtr na legislativní změnu*/
		legZmena,
		/**Filtr na výčet Tagů*/
		fieldTags,
		/**Filtr na GDZ balík*/
		gdz,
		/**Příznak neveřejné prohlížky změn v ADT07 (0 = NE / 1 = ANO)*/
		privateMode,
		/**Filtr na kotvu*/
		kotva,
		/**Filtr na licenci databáze*/
		lic,
		/**Filtr na rozdílový popis změn*/
		diff,
		/**Filtr na typ implementace licence DB*/
		tyi,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\PopisyZmenSync\IGPopisZmenySync.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro komunikaci BS/IS s ESL CentralAdmin
	* @domain CentralAdmin
	* @businessObject GPopisZmenySyncDto
	*/
	interface PopisZmenySync {
		/**Metoda List - Popisy změn*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GEtagDto>>;
		/**Založení/Update záznamů pro synchronizaci změn*/
		upsert(rq?:Gordic.Adt.Interface.GEtagDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GEtagDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GEtagDto>,GServiceSaveResponse<Gordic.Adt.Interface.GEtagDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PopisZmenySync: ServiceBase & Catalog.PopisZmenySync;
	}
	const PopisZmenySync: Client["PopisZmenySync"];
}
declare namespace Gordic.Adt.Interface {
	/**GEtagDto - Hlavní datový objekt pro synchronizaci popisů změn z BS a IS*/
	interface GEtagDto {
		/**Identifikátor pro synchronizaci zmen*/
		klic?: string|null;
		/**Pomocná hodnota obsahující klíčové informace k synchroniazci popisů změn. Etag je vyjádřen jako složený string*/
		etag?: string|null;
	}
	const enum GEtagDtoNames { klic = "klic", etag = "etag",}
	const enum GEtagDtoFragments { klic = "*", etag = "*",}
	const enum GEtagDtoTypes { klic = "string", etag = "string",}
	const enum GEtagDtoTypeLengths { klic = 100, etag = 254,}
	/**Možné položky filtru pro synchroniazci Popisů změn*/
	const enum GEtagFilterEnum {
		/**Etag pro synchronizaci popisů změn*/
		etag,
		/**ID pro tabulku gdeseta*/
		klic,
		/**ID pro filtraci hodnot s počátkem řetězce (Např. všechny klíče pro fázi při synchronizaci popisů změn sestav)*/
		klic_like,
		/**Programová fáze*/
		faze,
		/**Tag programové fáze*/
		tag,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\PrehledKomponent\IGAplKomponenty.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Přehled komponent obsažených v distribučních balících revizí*/
	interface AplKomponenty {
		/**Zalozeni / Update zaznamu - Prehled komponent(gdesexk)*/
		updatePrehledKomponent(rq?:Gordic.Adt.Interface.GGdesexkDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesexkDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesexkDto>,void>;
		/**Zalozeni / Update zaznamu - Prehled komponent(gdeseko)*/
		insertUpdateExterniKomponenta(rq?:Gordic.Adt.Interface.GGdesekoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesekoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesekoDto>,void>;
		/**Zalozeni / Update zaznamu - Výrobce externi komponenty(gdesvek)*/
		insertUpdateVyrobce(rq?:Gordic.Adt.Interface.GGdesekoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesekoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesekoDto>,void>;
		/**Metoda List pro Prehled produktu*/
		listPrehledKomponent(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesexkDto>>;
		/**Metoda Read - Externi komponenta*/
		readExterniKomponenta(rq?:Gordic.Adt.Interface.GGdesekoDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesekoDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesekoDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesekoDto>>;
		/**Metoda Read -  Výrobce externí komponenty*/
		readVyrobce(rq?:Gordic.Adt.Interface.GGdesekoDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesekoDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesekoDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesekoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AplKomponenty: ServiceBase & Catalog.AplKomponenty;
	}
	const AplKomponenty: Client["AplKomponenty"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesexk*/
	interface GGdesexkDto {
		/**DBCOLUMN:gdesexk.file_name*/
		file_name?: string|null;
		/**DBCOLUMN:gdesexk.file_path*/
		file_path?: string|null;
		/**DBCOLUMN:gdesexk.file_version*/
		file_version?: string|null;
		/**DBCOLUMN:gdesexk.bit_version*/
		bit_version?: string|null;
		/**DBCOLUMN:gdesexk.stav_exk*/
		stav_exk?: number|null;
		/**DBCOLUMN:gdesexk.vyrobce_exk*/
		vyrobce_exk?: string|null;
		/**DBCOLUMN:gdesexk.produkt_exk*/
		produkt_exk?: string|null;
		/**DBCOLUMN:gdesexk.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdesexk.pouziti*/
		pouziti?: string|null;
		/**DBCOLUMN:gdesexk.ixs_fun_garant*/
		ixs_fun_garant?: string|null;
		/**DBCOLUMN:gdesexk.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdesexk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesexk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - autor zmmeny zaznamu*/
		zmenil?: string|null;
	}
	const enum GGdesexkDtoNames { file_name = "file_name", file_path = "file_path", file_version = "file_version", bit_version = "bit_version", stav_exk = "stav_exk", vyrobce_exk = "vyrobce_exk", produkt_exk = "produkt_exk", popis = "popis", pouziti = "pouziti", ixs_fun_garant = "ixs_fun_garant", faze = "faze", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesexkDtoFragments { file_name = "*", file_path = "*", file_version = "*", bit_version = "*", stav_exk = "*", vyrobce_exk = "*", produkt_exk = "*", popis = "*", pouziti = "*", ixs_fun_garant = "*", faze = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesexkDtoTypes { file_name = "string", file_path = "string", file_version = "string", bit_version = "string", stav_exk = "number", vyrobce_exk = "string", produkt_exk = "string", popis = "string", pouziti = "string", ixs_fun_garant = "string", faze = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesexkDtoTypeLengths { file_name = 100, file_path = 100, file_version = 254, bit_version = 3, vyrobce_exk = 100, produkt_exk = 100, popis = 4000, pouziti = 4000, ixs_fun_garant = 12, faze = 8, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdeseko*/
	interface GGdesekoDto {
		/**DBCOLUMN:gdeseko.vyrobce_exk*/
		vyrobce_exk?: string|null;
		/**DBCOLUMN:gdeseko.produkt_exk*/
		produkt_exk?: string|null;
		/**DBCOLUMN:gdeseko.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdeseko.url*/
		url?: string|null;
		/**DBCOLUMN:gdeseko.smlouva*/
		smlouva?: string|null;
		/**DBCOLUMN:gdeseko.distribuce_exk*/
		distribuce_exk?: number|null;
		/**DBCOLUMN:gdeseko.ixs_fun_garant*/
		ixs_fun_garant?: string|null;
		/**DBCOLUMN:gdeseko.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdeseko.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - autor zmmeny zaznamu*/
		zmenil?: string|null;
	}
	const enum GGdesekoDtoNames { vyrobce_exk = "vyrobce_exk", produkt_exk = "produkt_exk", popis = "popis", url = "url", smlouva = "smlouva", distribuce_exk = "distribuce_exk", ixs_fun_garant = "ixs_fun_garant", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesekoDtoFragments { vyrobce_exk = "*", produkt_exk = "*", popis = "*", url = "*", smlouva = "*", distribuce_exk = "*", ixs_fun_garant = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesekoDtoTypes { vyrobce_exk = "string", produkt_exk = "string", popis = "string", url = "string", smlouva = "string", distribuce_exk = "number", ixs_fun_garant = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesekoDtoTypeLengths { vyrobce_exk = 100, produkt_exk = 100, popis = 4000, url = 254, smlouva = 4000, ixs_fun_garant = 12, zmenu_prov = 12, zmenil = 100,}
	/**Parametry filtru pro Prehled komponent*/
	const enum GPrehledKomponentFilterEnum {
		/**filtr na vyrobce komponenty*/
		vyrobce_exk,
		/**filtr na externi produkt*/
		produkt_exk,
		/**filtr na stav externi komponenty*/
		stav_exk,
		/**filtr na jmeno komponenty*/
		file_name,
		/**filtr na verzi komponenty*/
		file_version,
		/**filtr na programovou fazi*/
		faze,
		/**filtr na garanta komponenty*/
		ixs_fun_garant,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IAgtReaderTypFaze.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu agendy*/
	interface GAdtReaderTypFazeDto {
		/**DBCOLUMN:gincfat.faze_typ*/
		faze_typ?: number|null;
		/**DBCOLUMN:gincfat.faze_typ_txt*/
		faze_typ_txt?: string|null;
	}
	const enum GAdtReaderTypFazeDtoNames { faze_typ = "faze_typ", faze_typ_txt = "faze_typ_txt",}
	const enum GAdtReaderTypFazeDtoFragments { faze_typ = "*", faze_typ_txt = "*",}
	const enum GAdtReaderTypFazeDtoTypes { faze_typ = "number", faze_typ_txt = "string",}
	const enum GAdtReaderTypFazeDtoTypeLengths { faze_typ_txt = 500,}
	/**filter pro reader pro Dostupne agendy*/
	const enum GAdtReaderTypFazeFilterEnum {
		/**Identifikátor typu faze*/
		faze_typ,
		/**Filtr na textovy Typu fáze*/
		faze_typ_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderAgenda.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu agendy*/
	interface GAdtReaderAgendaDto {
		/**DBCOLUMN:ginctag.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ginctag.typ_ag_txt*/
		typ_ag_txt?: string|null;
	}
	const enum GAdtReaderAgendaDtoNames { typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt",}
	const enum GAdtReaderAgendaDtoFragments { typ_ag = "*", typ_ag_txt = "*",}
	const enum GAdtReaderAgendaDtoTypes { typ_ag = "number", typ_ag_txt = "string",}
	const enum GAdtReaderAgendaDtoTypeLengths { typ_ag_txt = 500,}
	/**filter pro reader pro Dostupne agendy*/
	const enum GAdtReaderAgendaFilterEnum {
		/**Identifikátor Agendy*/
		typ_ag,
		/**Filtr na textovy nazev Agendy*/
		typ_ag_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderAgt.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Agendove tymy*/
	interface GAdtReaderAgtDto {
		/**DBCOLUMN:gdecagt.agt*/
		agt?: string|null;
		/**DBCOLUMN:gdecagt.agt_txt*/
		agt_txt?: string|null;
	}
	const enum GAdtReaderAgtDtoNames { agt = "agt", agt_txt = "agt_txt",}
	const enum GAdtReaderAgtDtoFragments { agt = "*", agt_txt = "*",}
	const enum GAdtReaderAgtDtoTypes { agt = "string", agt_txt = "string",}
	const enum GAdtReaderAgtDtoTypeLengths { agt = 20, agt_txt = 50,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderAgtFilterEnum {
		/**Identifikátor Agendoveho tymu*/
		agt,
		/**Filtr na textovy nazev Agendoveho tymu*/
		agt_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderAutenticator.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdecfaz*/
	interface GAdtReaderAutenticatorDto {
		/**DBCOLUMN:gdecexp.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdecexp.level_exp*/
		level_exp?: number|null;
		/**DBCOLUMN:gdecexp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdecexp.popis*/
		popis?: string|null;
	}
	const enum GAdtReaderAutenticatorDtoNames { faze = "faze", level_exp = "level_exp", aktivita = "aktivita", popis = "popis",}
	const enum GAdtReaderAutenticatorDtoFragments { faze = "*", level_exp = "*", aktivita = "*", popis = "*",}
	const enum GAdtReaderAutenticatorDtoTypes { faze = "string", level_exp = "number", aktivita = "number", popis = "string",}
	const enum GAdtReaderAutenticatorDtoTypeLengths { faze = 8, popis = 100,}
	/**filter pro reader pro Dostupne úlohy programových fází*/
	const enum GAdtReaderAutenticatorFilterEnum {
		/**faze*/
		faze,
		/**dostupná úloha pro fázi (level)*/
		level_exp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderBalikyLicenci.d.ts 

declare namespace Gordic.Adt.Interface {
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderBalikyLicenciFilterEnum {
		/**Název baliku licenci*/
		nazev,
		/**Identifikátor balíku licencí*/
		ixs_lip,
		/**DB Parametr adt_user_licenc | 99 = supervizor*/
		UserParam,
		/**Identifikator ixs_fun*/
		IxsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderCenik.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne cenikove polozky noveho Ceniku*/
	interface GAdtReaderCenikDto {
		/**DBCOLUMN:gdesccm.ixp_ccm*/
		ixp_ccm?: string|null;
		/**DBCOLUMN:gdesccm.gcenik*/
		gcenik?: number|null;
		/**DBCOLUMN:gdesccm.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdesccm.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdesccm.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesccm.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesccm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesccm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesccm.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderCenikDtoNames { ixp_ccm = "ixp_ccm", gcenik = "gcenik", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderCenikDtoFragments { ixp_ccm = "*", gcenik = "*", dat_od = "*", dat_do = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderCenikDtoTypes { ixp_ccm = "string", gcenik = "number", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderCenikDtoTypeLengths { ixp_ccm = 12, nazev = 254, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro Dostupne cenikove polozky noveho Ceniku*/
	const enum GAdtReaderCenikFilterEnum {
		/**Identifikátor balíku licencí*/
		ixs_lip,
		/**Identifikátor ceniku*/
		ixp_ccm,
		/**nazev ceniku*/
		nazev,
		/**typ ceniku*/
		gcenik,
		/**Produkční řada*/
		prod_rada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderCenikovePolozky.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne cenikove polozky pro danou licenci*/
	interface GAdtReaderCenikovePolozkyDto {
		/**DBCOLUMN:gdeslic.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdeslic.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdeslic.pol*/
		pol?: string|null;
		/**DBCOLUMN:gdeslic.ppol*/
		ppol?: string|null;
		/**DBCOLUMN:gdeslic.rezim_lic*/
		rezim_lic?: number|null;
		/**DBCOLUMN:gdeslic.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdeslic.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdeslic.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:gdeslic.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdeslic.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gdeslic.ico_fakt*/
		ico_fakt?: string|null;
		/**DBCOLUMN:gdeslic.ico_adm*/
		ico_adm?: string|null;
		/**DBCOLUMN:gdeslic.priz_multilicence*/
		priz_multilicence?: number|null;
		/**DBCOLUMN:gdeslic.priz_spec_cena*/
		priz_spec_cena?: number|null;
		/**DBCOLUMN:gdeslic.priz_spec_maint*/
		priz_spec_maint?: number|null;
		/**DBCOLUMN:gdeslic.pocet_skutecny*/
		pocet_skutecny?: number|null;
		/**DBCOLUMN:gdeslic.duvod*/
		duvod?: string|null;
		/**DBCOLUMN:gdeslic.c_nakup*/
		c_nakup?: JsonDecimal|null;
		/**DBCOLUMN:gdeslic.dat_nakup*/
		dat_nakup?: JsonDate|null;
		/**DBCOLUMN:gdeslic.c_maintenance*/
		c_maintenance?: JsonDecimal|null;
	}
	const enum GAdtReaderCenikovePolozkyDtoNames { lic = "lic", dat_od = "dat_od", pol = "pol", ppol = "ppol", rezim_lic = "rezim_lic", popis = "popis", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico_fakt = "ico_fakt", ico_adm = "ico_adm", priz_multilicence = "priz_multilicence", priz_spec_cena = "priz_spec_cena", priz_spec_maint = "priz_spec_maint", pocet_skutecny = "pocet_skutecny", duvod = "duvod", c_nakup = "c_nakup", dat_nakup = "dat_nakup", c_maintenance = "c_maintenance",}
	const enum GAdtReaderCenikovePolozkyDtoFragments { lic = "*", dat_od = "*", pol = "*", ppol = "*", rezim_lic = "*", popis = "*", dat_do = "*", pocet = "*", dat_zmena = "*", zmenu_prov = "*", ico_fakt = "*", ico_adm = "*", priz_multilicence = "*", priz_spec_cena = "*", priz_spec_maint = "*", pocet_skutecny = "*", duvod = "*", c_nakup = "*", dat_nakup = "*", c_maintenance = "*",}
	const enum GAdtReaderCenikovePolozkyDtoTypes { lic = "string", dat_od = "JsonDate", pol = "string", ppol = "string", rezim_lic = "number", popis = "string", dat_do = "JsonDate", pocet = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico_fakt = "string", ico_adm = "string", priz_multilicence = "number", priz_spec_cena = "number", priz_spec_maint = "number", pocet_skutecny = "number", duvod = "string", c_nakup = "JsonDecimal", dat_nakup = "JsonDate", c_maintenance = "JsonDecimal",}
	const enum GAdtReaderCenikovePolozkyDtoTypeLengths { lic = 4, pol = 4, ppol = 3, popis = 254, zmenu_prov = 12, ico_fakt = 10, ico_adm = 10, duvod = 254,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderCenikovePolozkyFilterEnum {
		/**Licence*/
		lic,
		/**Cenikova polozka*/
		pol,
		/**Cenikova podpolozka*/
		ppol,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderCloud.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu agendy*/
	interface GAdtReaderCloudDto {
		/**DBCOLUMN:gdecclo.provoz_cloud*/
		provoz_cloud?: number|null;
		/**DBCOLUMN:gdecclo.provoz_cloud_txt*/
		provoz_cloud_txt?: string|null;
	}
	const enum GAdtReaderCloudDtoNames { provoz_cloud = "provoz_cloud", provoz_cloud_txt = "provoz_cloud_txt",}
	const enum GAdtReaderCloudDtoFragments { provoz_cloud = "*", provoz_cloud_txt = "*",}
	const enum GAdtReaderCloudDtoTypes { provoz_cloud = "number", provoz_cloud_txt = "string",}
	const enum GAdtReaderCloudDtoTypeLengths { provoz_cloud_txt = 500,}
	/**filter pro reader pro Dostupne hodnoty fakturace za Cloud*/
	const enum GAdtReaderCloudFilterEnum {
		/**Identifikátor cloudu*/
		provoz_cloud,
		/**Filtr na textovy nazev cloudu*/
		provoz_cloud_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderDalsiSoubory.d.ts 

declare namespace Gordic.Adt.Interface {
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderDalsiSouboryFilterEnum {
		/**Identifikátor souboru*/
		ixs_dif,
		/**Identifikátor skupiny DB*/
		ixs_sdb,
		/**Nazev souboru*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderDistributor.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti Distributoru*/
	interface GAdtReaderDistributorDto {
		/**DBCOLUMN:gdesdis.distributor*/
		distributor?: number|null;
		/**DBCOLUMN:gdesdis.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesdis.nazev*/
		nazev_distributor?: string|null;
		/**DBCOLUMN:gdesdis.nazev*/
		nazev_obc?: string|null;
		/**DBCOLUMN:gdesdis.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesdis.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesdis.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesdis.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderDistributorDtoNames { distributor = "distributor", nazev = "nazev", nazev_distributor = "nazev_distributor", nazev_obc = "nazev_obc", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderDistributorDtoFragments { distributor = "*", nazev = "*", nazev_distributor = "*", nazev_obc = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderDistributorDtoTypes { distributor = "number", nazev = "string", nazev_distributor = "string", nazev_obc = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderDistributorDtoTypeLengths { nazev = 254, nazev_distributor = 254, nazev_obc = 254, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro Distributory*/
	const enum GAdtReaderDistributorFilterEnum {
		/**Filtr na distributora*/
		distributor,
		/**Filtr na nazev*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderDostupneVerzeRevize.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro dostupne verze revize*/
	interface GAdtReaderDostupneVerzeRevizeDto {
		/**verze databáze*/
		verze_db?: number|null;
		/**sub verze databáze*/
		sub_verze_db?: number|null;
	}
	const enum GAdtReaderDostupneVerzeRevizeDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db",}
	const enum GAdtReaderDostupneVerzeRevizeDtoFragments { verze_db = "*", sub_verze_db = "*",}
	const enum GAdtReaderDostupneVerzeRevizeDtoTypes { verze_db = "number", sub_verze_db = "number",}
	const enum GAdtReaderDostupneVerzeRevizeDtoTypeLengths {}
	/**filter pro reader dostupnych revizi*/
	const enum GAdtReaderDostupneVerzeRevizeFilterEnum {
		/**verze databaze*/
		verze_db,
		/**subverze databaze*/
		sub_verze_db,
		/**filtr s priznakem pro inicializacni hodnotu pro políčkový prefab (bool hodnota)*/
		initial,
		/**filtr na licenci databáze*/
		lic,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderFaze.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdecfaz*/
	interface GAdtReaderFazeDto {
		/**DBCOLUMN:gdecfaz.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdecfaz.faze_txt*/
		faze_txt?: string|null;
		/**DBCOLUMN:gdecfaz.faze_typ*/
		faze_typ?: number|null;
		/**DBCOLUMN:gdecfaz.verze*/
		verze?: number|null;
		/**DBCOLUMN:gdecfaz.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:gdecfaz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gdecfaz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gdecfaz.akt_faze*/
		akt_faze?: number|null;
		/**DBCOLUMN:gdecfaz.vzkaz*/
		vzkaz?: string|null;
		/**DBCOLUMN:gdecfaz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdecfaz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gdecfaz.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:gdecfaz.dat_avi*/
		dat_avi?: JsonDate|null;
		/**DBCOLUMN:gdecfaz.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdecfaz.tavi*/
		tavi?: string|null;
		/**DBCOLUMN:gdecfaz.tstop*/
		tstop?: string|null;
		/**DBCOLUMN:gdecfaz.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:gdecfaz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdecfaz.uee*/
		uee?: string|null;
		/**DBCOLUMN:gdecfaz.uei*/
		uei?: string|null;
		/**DBCOLUMN:gdecfaz.submodel*/
		submodel?: string|null;
		/**DBCOLUMN:gdecfaz.priz_adm*/
		priz_adm?: number|null;
		/**DBCOLUMN:gdecfaz.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:gdecfaz.priz_gentag*/
		priz_gentag?: number|null;
		/**DBCOLUMN:gdecfaz.rpp_w_x*/
		rpp_w_x?: number|null;
		/**DBCOLUMN:gdecfaz.rpp_w_y*/
		rpp_w_y?: number|null;
		/**DBCOLUMN:gdecfaz.priz_f*/
		priz_f?: number|null;
		/**DBCOLUMN:gdecfaz.faze_adr*/
		faze_adr?: string|null;
		/**DBCOLUMN:gdecfaz.faze_exe*/
		faze_exe?: string|null;
		/**DBCOLUMN:gdecfaz.priz_uninstall*/
		priz_uninstall?: number|null;
		/**DBCOLUMN:gdecfaz.agt*/
		agt?: string|null;
		/**DBCOLUMN:gdecfaz.subsyst*/
		subsyst?: string|null;
		/**DBCOLUMN:gdecfaz.priz_exu*/
		priz_exu?: number|null;
		/**DBCOLUMN:gdecfaz.priz_arch*/
		priz_arch?: number|null;
		/**DBCOLUMN:gdecfaz.priz_zobr_lic*/
		priz_zobr_lic?: number|null;
		/**DBCOLUMN:gdecfaz.priz_bsl*/
		priz_bsl?: number|null;
	}
	const enum GAdtReaderFazeDtoNames { faze = "faze", faze_txt = "faze_txt", faze_typ = "faze_typ", verze = "verze", sub_verze = "sub_verze", k_v = "k_v", k_s = "k_s", akt_faze = "akt_faze", vzkaz = "vzkaz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", dat_avi = "dat_avi", dat_do = "dat_do", tavi = "tavi", tstop = "tstop", pocet = "pocet", aktivita = "aktivita", uee = "uee", uei = "uei", submodel = "submodel", priz_adm = "priz_adm", priz_ext = "priz_ext", priz_gentag = "priz_gentag", rpp_w_x = "rpp_w_x", rpp_w_y = "rpp_w_y", priz_f = "priz_f", faze_adr = "faze_adr", faze_exe = "faze_exe", priz_uninstall = "priz_uninstall", agt = "agt", subsyst = "subsyst", priz_exu = "priz_exu", priz_arch = "priz_arch", priz_zobr_lic = "priz_zobr_lic", priz_bsl = "priz_bsl",}
	const enum GAdtReaderFazeDtoFragments { faze = "*", faze_txt = "*", faze_typ = "*", verze = "*", sub_verze = "*", k_v = "*", k_s = "*", akt_faze = "*", vzkaz = "*", dat_zmena = "*", zmenu_prov = "*", typ_ag = "*", dat_avi = "*", dat_do = "*", tavi = "*", tstop = "*", pocet = "*", aktivita = "*", uee = "*", uei = "*", submodel = "*", priz_adm = "*", priz_ext = "*", priz_gentag = "*", rpp_w_x = "*", rpp_w_y = "*", priz_f = "*", faze_adr = "*", faze_exe = "*", priz_uninstall = "*", agt = "*", subsyst = "*", priz_exu = "*", priz_arch = "*", priz_zobr_lic = "*", priz_bsl = "*",}
	const enum GAdtReaderFazeDtoTypes { faze = "string", faze_txt = "string", faze_typ = "number", verze = "number", sub_verze = "number", k_v = "number", k_s = "string", akt_faze = "number", vzkaz = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", dat_avi = "JsonDate", dat_do = "JsonDate", tavi = "string", tstop = "string", pocet = "number", aktivita = "number", uee = "string", uei = "string", submodel = "string", priz_adm = "number", priz_ext = "number", priz_gentag = "number", rpp_w_x = "number", rpp_w_y = "number", priz_f = "number", faze_adr = "string", faze_exe = "string", priz_uninstall = "number", agt = "string", subsyst = "string", priz_exu = "number", priz_arch = "number", priz_zobr_lic = "number", priz_bsl = "number",}
	const enum GAdtReaderFazeDtoTypeLengths { faze = 8, faze_txt = 50, k_s = 15, vzkaz = 254, zmenu_prov = 12, tavi = 254, tstop = 254, uee = 12, uei = 4, submodel = 3, faze_adr = 254, faze_exe = 254, agt = 3, subsyst = 4,}
	/**filter pro reader pro Dostupne faze v uloze statistika fazi*/
	const enum GAdtReaderFazeFilterEnum {
		/**faze*/
		faze,
		/**nazev faze*/
		faze_txt,
		/**typ faze*/
		faze_typ,
		/**verze*/
		verze,
		/**sub_verze*/
		sub_verze,
		/**filtr na db parametr adt_user_licenc*/
		userParam,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderGDZBaliky.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro GDZ baliky*/
	interface GAdtReaderGDZBalikyDto {
		/**Interní ID balíku - je přidělováno vždy z GDEV databáze a to přes aplikaci ADT07*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:ginsgdt.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsgdt.popis*/
		popis?: string|null;
		/**DBCOLUMN:ginsgdt.orj*/
		orj?: string|null;
		/**DBCOLUMN:ginsgdt.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsgdt.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsgdt.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Binární obsah GDZ balíku*/
		kopie?: JsonBlob|null;
		/**DBCOLUMN:ginsgdt.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginsgdt.dist_cond*/
		dist_cond?: string|null;
		/**DBCOLUMN:ginsgdt.run_cond*/
		run_cond?: string|null;
		/**DBCOLUMN:ginsgdt.typ_gdt*/
		typ_gdt?: number|null;
		/**DBCOLUMN:ginsgdt.priorita_gdt*/
		priorita_gdt?: number|null;
		/**DBCOLUMN:ginsgdt.priz_log_db*/
		priz_log_db?: number|null;
		/**DBCOLUMN:ginsgdt.zdroj*/
		zdroj?: string|null;
		/**DBCOLUMN:ginsgdt.priz_public*/
		priz_public?: number|null;
		/**DBCOLUMN:ginsgdt.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsgdt.cs_popis*/
		cs_popis?: string|null;
		/**Počet dní určující exspiraci ADL - tedy doba po které budou ADL diagnostické balíky odstraněny z centrálního portálu*/
		dnu_exs_adl?: number|null;
	}
	const enum GAdtReaderGDZBalikyDtoNames { ixs_gdt = "ixs_gdt", nazev = "nazev", popis = "popis", orj = "orj", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kopie = "kopie", verze = "verze", dist_cond = "dist_cond", run_cond = "run_cond", typ_gdt = "typ_gdt", priorita_gdt = "priorita_gdt", priz_log_db = "priz_log_db", zdroj = "zdroj", priz_public = "priz_public", cs_nazev = "cs_nazev", cs_popis = "cs_popis", dnu_exs_adl = "dnu_exs_adl",}
	const enum GAdtReaderGDZBalikyDtoFragments { ixs_gdt = "*", nazev = "*", popis = "*", orj = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kopie = "*", verze = "*", dist_cond = "*", run_cond = "*", typ_gdt = "*", priorita_gdt = "*", priz_log_db = "*", zdroj = "*", priz_public = "*", cs_nazev = "*", cs_popis = "*", dnu_exs_adl = "*",}
	const enum GAdtReaderGDZBalikyDtoTypes { ixs_gdt = "string", nazev = "string", popis = "string", orj = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kopie = "JsonBlob", verze = "number", dist_cond = "string", run_cond = "string", typ_gdt = "number", priorita_gdt = "number", priz_log_db = "number", zdroj = "string", priz_public = "number", cs_nazev = "string", cs_popis = "string", dnu_exs_adl = "number",}
	const enum GAdtReaderGDZBalikyDtoTypeLengths { ixs_gdt = 12, nazev = 254, popis = 254, orj = 4, zmenu_prov = 12, dist_cond = 4000, run_cond = 4000, zdroj = 255, cs_nazev = 254, cs_popis = 254,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderGDZBalikyFilterEnum {
		/**Identifikator GDZ baliku*/
		ixs_gdt,
		/**Název GDZ baliku*/
		nazev,
		/**Popis GDZ baliku*/
		popis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderIcoAdministrace.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro dostupna ICA k administraci*/
	interface GAdtReaderIcoAdministraceDto {
		/**IČO pro administraci*/
		ico_adm?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**DBCOLUMN:gdesica.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesica.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesica.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesica.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderIcoAdministraceDtoNames { ico_adm = "ico_adm", nazev = "nazev", ixs_esu = "ixs_esu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderIcoAdministraceDtoFragments { ico_adm = "*", nazev = "*", ixs_esu = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderIcoAdministraceDtoTypes { ico_adm = "string", nazev = "string", ixs_esu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderIcoAdministraceDtoTypeLengths { ico_adm = 10, nazev = 254, ixs_esu = 12, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro dostupna ICA k administraci*/
	const enum GAdtReaderIcoAdministraceFilterEnum {
		/**IČO pro administraci*/
		ico_adm,
		/**Prihlaseny uzivatel*/
		ixs_fun,
		/**Název*/
		nazev,
		/**Externí subjekt*/
		ixs_esu,
		/**Parametr uzivatele (adt_user_licenc = 99) - Supervisor*/
		userParam,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderIcoFakturace.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro dostupna ICA k fakturaci*/
	interface GAdtReaderIcoFakturaceDto {
		/**IČO pro administraci*/
		ico_fakt?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**DBCOLUMN:gdesicf.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesicf.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesicf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesicf.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderIcoFakturaceDtoNames { ico_fakt = "ico_fakt", nazev = "nazev", ixs_esu = "ixs_esu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderIcoFakturaceDtoFragments { ico_fakt = "*", nazev = "*", ixs_esu = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderIcoFakturaceDtoTypes { ico_fakt = "string", nazev = "string", ixs_esu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderIcoFakturaceDtoTypeLengths { ico_fakt = 10, nazev = 254, ixs_esu = 12, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro dostupna ICA k fakturaci*/
	const enum GAdtReaderIcoFakturaceFilterEnum {
		/**IČO pro administraci*/
		ico_fakt,
		/**Prihlaseny uzivatel*/
		ixs_fun,
		/**Název*/
		nazev,
		/**Externí subjekt*/
		ixs_esu,
		/**Parametr uzivatele (adt_user_licenc = 99) - Supervisor*/
		userParam,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderLicenceDatabazi.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro GDZ baliky*/
	interface GAdtReaderLicenceDatabaziDto {
		/**DBCOLUMN:gdessdb.ixs_sdb*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdessdb.nazev*/
		nazev?: string|null;
	}
	const enum GAdtReaderLicenceDatabaziDtoNames { lic_fyz = "lic_fyz", nazev = "nazev",}
	const enum GAdtReaderLicenceDatabaziDtoFragments { lic_fyz = "*", nazev = "*",}
	const enum GAdtReaderLicenceDatabaziDtoTypes { lic_fyz = "string", nazev = "string",}
	const enum GAdtReaderLicenceDatabaziDtoTypeLengths { lic_fyz = 12, nazev = 100,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderLicenceDatabaziFilterEnum {
		/**Název skupiny databazi*/
		nazev,
		/**Skupina databazi*/
		lic_fyz,
		/**DB Parametr adt_user_licenc | 99 = supervizor*/
		UserParam,
		/**Identifikator ixs_fun*/
		IxsFun,
		/**Řada produktů GORDIC*/
		prod_rada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderObc.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu impementace*/
	interface GAdtReaderObcDto {
		/**DBCOLUMN:gdesobc.distributor*/
		distributor?: number|null;
		/**DBCOLUMN:gdesobc.obchodnik*/
		obchodnik?: number|null;
		/**DBCOLUMN:gdesobc.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesobc.nazev*/
		nazev_obc?: string|null;
		/**DBCOLUMN:gdesobc.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesobc.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesobc.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesobc.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderObcDtoNames { distributor = "distributor", obchodnik = "obchodnik", nazev = "nazev", nazev_obc = "nazev_obc", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderObcDtoFragments { distributor = "*", obchodnik = "*", nazev = "*", nazev_obc = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderObcDtoTypes { distributor = "number", obchodnik = "number", nazev = "string", nazev_obc = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderObcDtoTypeLengths { nazev = 254, nazev_obc = 254, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderObcFilterEnum {
		/**Identifikátor obchodnika*/
		obchodnik,
		/**Filtr na distributora*/
		distributor,
		/**Filtr na nazev*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderORJ.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesorj*/
	interface GAdtReaderORJDto {
		/**DBCOLUMN:gdesorj.orj*/
		orj?: string|null;
		/**DBCOLUMN:gdesorj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesorj.titul*/
		titul?: string|null;
		/**DBCOLUMN:gdesorj.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:gdesorj.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:gdesorj.firma*/
		firma?: string|null;
		/**DBCOLUMN:gdesorj.mesto*/
		mesto?: string|null;
		/**DBCOLUMN:gdesorj.nadorg*/
		nadorg?: string|null;
		/**DBCOLUMN:gdesorj.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:gdesorj.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:gdesorj.ktg_orj*/
		ktg_orj?: number|null;
		/**DBCOLUMN:gdesorj.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesorj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesorj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesorj.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderORJDtoNames { orj = "orj", nazev = "nazev", titul = "titul", jmeno = "jmeno", prijmeni = "prijmeni", firma = "firma", mesto = "mesto", nadorg = "nadorg", ixs_ref = "ixs_ref", ixs_orj = "ixs_orj", ktg_orj = "ktg_orj", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderORJDtoFragments { orj = "*", nazev = "*", titul = "*", jmeno = "*", prijmeni = "*", firma = "*", mesto = "*", nadorg = "*", ixs_ref = "*", ixs_orj = "*", ktg_orj = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderORJDtoTypes { orj = "string", nazev = "string", titul = "string", jmeno = "string", prijmeni = "string", firma = "string", mesto = "string", nadorg = "string", ixs_ref = "string", ixs_orj = "string", ktg_orj = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderORJDtoTypeLengths { orj = 4, nazev = 50, titul = 35, jmeno = 24, prijmeni = 36, firma = 50, mesto = 50, nadorg = 50, ixs_ref = 12, ixs_orj = 12, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro Dostupna ORJ*/
	const enum GAdtReaderORJFilterEnum {
		/**orj*/
		orj,
		/**nazev*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderPol.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	interface GAdtReaderPolDto {
		/**DBCOLUMN:gdeslin.lic*/
		lic?: string|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Počátek období platnosti výjimky*/
		dat_od?: JsonDate|null;
		/**Konec období platnosti výjimky*/
		dat_do?: JsonDate|null;
		/**Popis důvodu k výjimce*/
		popis?: string|null;
		/**DBCOLUMN:gdeslin.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdeslin.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Popis polozky*/
		popis_pol?: string|null;
	}
	const enum GAdtReaderPolDtoNames { lic = "lic", pol = "pol", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis_pol = "popis_pol",}
	const enum GAdtReaderPolDtoFragments { lic = "*", pol = "*", dat_od = "*", dat_do = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*", popis_pol = "*",}
	const enum GAdtReaderPolDtoTypes { lic = "string", pol = "string", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", popis_pol = "string",}
	const enum GAdtReaderPolDtoTypeLengths { lic = 4, pol = 4, popis = 254, zmenu_prov = 12, popis_pol = 254,}
	/**filter pro reader pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	const enum GAdtReaderPolFilterEnum {
		/**Licence*/
		lic,
		/**hledat v gdedccp*/
		gdedccp,
		/**Cenikova polozka*/
		pol,
		/**Popis*/
		popis_pol,
		/**filtr na db parametr adt_user_licenc*/
		userParam,
		/**filtr na balik licenci*/
		ixs_lip,
		/**filtr cenik*/
		ixp_ccm,
		/**filtr na produkční řadu*/
		prod_rada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderPolBezLicPopl.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	interface GAdtReaderPolBezLicPoplDto {
		/**DBCOLUMN:gdeslin.lic*/
		lic?: string|null;
		/**Ceníková položka*/
		pol?: string|null;
		/**Počátek období platnosti výjimky*/
		dat_od?: JsonDate|null;
		/**Konec období platnosti výjimky*/
		dat_do?: JsonDate|null;
		/**Popis důvodu k výjimce*/
		popis?: string|null;
		/**DBCOLUMN:gdeslin.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdeslin.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Popis polozky*/
		popis_pol?: string|null;
	}
	const enum GAdtReaderPolBezLicPoplDtoNames { lic = "lic", pol = "pol", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis_pol = "popis_pol",}
	const enum GAdtReaderPolBezLicPoplDtoFragments { lic = "*", pol = "*", dat_od = "*", dat_do = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*", popis_pol = "*",}
	const enum GAdtReaderPolBezLicPoplDtoTypes { lic = "string", pol = "string", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", popis_pol = "string",}
	const enum GAdtReaderPolBezLicPoplDtoTypeLengths { lic = 4, pol = 4, popis = 254, zmenu_prov = 12, popis_pol = 254,}
	/**filter pro reader pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	const enum GAdtReaderPolBezLicPoplFilterEnum {
		/**Licence*/
		lic,
		/**Cenikova polozka*/
		pol,
		/**Popis*/
		popis_pol,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderPpol.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	interface GAdtReaderPpolDto {
		/**DBCOLUMN:gdeslin.lic*/
		lic?: string|null;
		/**Ceníková podpoložka*/
		ppol?: string|null;
		/**Počátek období platnosti výjimky*/
		dat_od?: JsonDate|null;
		/**Konec období platnosti výjimky*/
		dat_do?: JsonDate|null;
		/**Popis důvodu k výjimce*/
		popis?: string|null;
		/**Typ ceny*/
		typ_cen?: string|null;
		/**c = cena položky v ceniku*/
		c?: JsonDecimal|null;
		/**ktg_ppol = kategorie podpolozky*/
		ktg_ppol?: number|null;
		/**DBCOLUMN:gdeslin.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdeslin.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Popis polozky*/
		popis_ppol?: string|null;
	}
	const enum GAdtReaderPpolDtoNames { lic = "lic", ppol = "ppol", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", typ_cen = "typ_cen", c = "c", ktg_ppol = "ktg_ppol", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis_ppol = "popis_ppol",}
	const enum GAdtReaderPpolDtoFragments { lic = "*", ppol = "*", dat_od = "*", dat_do = "*", popis = "*", typ_cen = "*", c = "*", ktg_ppol = "*", dat_zmena = "*", zmenu_prov = "*", popis_ppol = "*",}
	const enum GAdtReaderPpolDtoTypes { lic = "string", ppol = "string", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", typ_cen = "string", c = "JsonDecimal", ktg_ppol = "number", dat_zmena = "JsonDate", zmenu_prov = "string", popis_ppol = "string",}
	const enum GAdtReaderPpolDtoTypeLengths { lic = 4, ppol = 4, popis = 254, typ_cen = 3, zmenu_prov = 12, popis_ppol = 254,}
	/**filter pro reader pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	const enum GAdtReaderPpolFilterEnum {
		/**Licence*/
		lic,
		/**Cenikova polozka*/
		ppol,
		/**Typ cenikove podpolozky (0-350 licence, 350-500 poplatky, 500-999 sluzby)*/
		ppolTyp,
		/**Popis*/
		popis,
		/**cenikova polozka*/
		pol,
		/**filtr na db parametr adt_user_licenc*/
		userParam,
		/**filtr na balik licenci*/
		ixs_lip,
		/**filtr cenik*/
		ixp_ccm,
		/**filtr na novou Podpolozku*/
		nova_ppol,
		/**filtr na select z gdedccm*/
		gdedccm,
		/**filtr na první řádek do obsahu balíku*/
		first_row,
		/**filtr na víe řádků do obsahu balíku*/
		multi_row,
		/**filtr na produkční řádku G0/G1/G3*/
		prod_rada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderProdListy.d.ts 

declare namespace Gordic.Adt.Interface {
	/**filter pro reader pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	const enum GAdtReaderProdListyFilterEnum {
		/**id produktoveho listu*/
		id_listu,
		/**Nazev produktoveho listu*/
		nazev,
		/**Popis produktoveho listu*/
		popis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderRevize.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro GDZ baliky*/
	interface GAdtReaderRevizeDto {
		/**Registrované revize všech distribučních balíků ( povolených / zakázaných atd.. )*/
		revize?: string|null;
		/**DBCOLUMN:gdesrev.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdesrev.verze*/
		verze?: number|null;
		/**Minimální subverze DB, kterou distribuční balík vyžaduje*/
		sub_verze_db_min?: number|null;
		/**DBCOLUMN:gdesrev.stav_revize*/
		stav_revize?: number|null;
		/**DBCOLUMN:gdesrev.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**Identifikace, kdo provedl zveřejnění distribučního balíku*/
		mail?: string|null;
		/**DBCOLUMN:gdesrev.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesrev.revize_new*/
		revize_new?: string|null;
		/**DBCOLUMN:gdesrev.dat_revoke*/
		dat_revoke?: JsonDate|null;
		/**Čas fyzického odstranění distribučních balíků z distribučních úložišť.*/
		dat_vymaz?: JsonDate|null;
		/**DBCOLUMN:gdesrev.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gdesrev.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:gdesrev.tyi*/
		tyi?: string|null;
		/**DBCOLUMN:gdesrev.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:gdesrev.lic_od*/
		lic_od?: string|null;
		/**DBCOLUMN:gdesrev.lic_pro*/
		lic_pro?: string|null;
		/**DBCOLUMN:gdesrev.velikost*/
		velikost?: number|null;
	}
	const enum GAdtReaderRevizeDtoNames { revize = "revize", faze = "faze", verze = "verze", sub_verze_db_min = "sub_verze_db_min", stav_revize = "stav_revize", dat_zmena = "dat_zmena", mail = "mail", poznamka = "poznamka", revize_new = "revize_new", dat_revoke = "dat_revoke", dat_vymaz = "dat_vymaz", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", tyi = "tyi", sub_verze = "sub_verze", lic_od = "lic_od", lic_pro = "lic_pro", velikost = "velikost",}
	const enum GAdtReaderRevizeDtoFragments { revize = "*", faze = "*", verze = "*", sub_verze_db_min = "*", stav_revize = "*", dat_zmena = "*", mail = "*", poznamka = "*", revize_new = "*", dat_revoke = "*", dat_vymaz = "*", zmenu_prov = "*", ixs_lpc = "*", tyi = "*", sub_verze = "*", lic_od = "*", lic_pro = "*", velikost = "*",}
	const enum GAdtReaderRevizeDtoTypes { revize = "string", faze = "string", verze = "number", sub_verze_db_min = "number", stav_revize = "number", dat_zmena = "JsonDate", mail = "string", poznamka = "string", revize_new = "string", dat_revoke = "JsonDate", dat_vymaz = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", tyi = "string", sub_verze = "number", lic_od = "string", lic_pro = "string", velikost = "number",}
	const enum GAdtReaderRevizeDtoTypeLengths { revize = 30, faze = 8, mail = 254, poznamka = 254, revize_new = 15, zmenu_prov = 12, ixs_lpc = 12, tyi = 1, lic_od = 4, lic_pro = 4,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderRevizeFilterEnum {
		/**Revize*/
		revize,
		/**typ faze revize (modul/sestava/help/dokumentace)*/
		faze_typ,
		/**Fáze*/
		faze,
		/**Pole fází revizí*/
		fieldFaze,
		/**verze programové fáze*/
		verze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderRoleRegLic.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesorj*/
	interface GAdtReaderRoleRegLicDto {
		/**DBCOLUMN:gdecrob.role_fun_lip*/
		role_fun_lip?: number|null;
		/**DBCOLUMN:gdecrob.role_fun_lip_txt*/
		role_fun_lip_txt?: string|null;
	}
	const enum GAdtReaderRoleRegLicDtoNames { role_fun_lip = "role_fun_lip", role_fun_lip_txt = "role_fun_lip_txt",}
	const enum GAdtReaderRoleRegLicDtoFragments { role_fun_lip = "*", role_fun_lip_txt = "*",}
	const enum GAdtReaderRoleRegLicDtoTypes { role_fun_lip = "number", role_fun_lip_txt = "string",}
	const enum GAdtReaderRoleRegLicDtoTypeLengths {}
	/**filter pro reader pro Dostupna ORJ*/
	const enum GAdtReaderRoleRegLicFilterEnum {
		/**Identifikátor Role v registru licencí*/
		role_fun_lip,
		/**Role registru licencí - textově*/
		role_fun_lip_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderSkupinyDatabazi.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro GDZ baliky*/
	interface GAdtReaderSkupinyDatabaziDto {
		/**DBCOLUMN:gdessdb.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdessdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdessdb.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:gdessdb.typ_sdb*/
		typ_sdb?: number|null;
		/**DBCOLUMN:gdessdb.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdessdb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdessdb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdessdb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gdessdb.rezim_aktual*/
		rezim_aktual?: number|null;
		/**DBCOLUMN:gdessdb.priz_akut_gdz*/
		priz_akut_gdz?: number|null;
	}
	const enum GAdtReaderSkupinyDatabaziDtoNames { ixs_sdb = "ixs_sdb", nazev = "nazev", zkratka = "zkratka", typ_sdb = "typ_sdb", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rezim_aktual = "rezim_aktual", priz_akut_gdz = "priz_akut_gdz",}
	const enum GAdtReaderSkupinyDatabaziDtoFragments { ixs_sdb = "*", nazev = "*", zkratka = "*", typ_sdb = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", rezim_aktual = "*", priz_akut_gdz = "*",}
	const enum GAdtReaderSkupinyDatabaziDtoTypes { ixs_sdb = "string", nazev = "string", zkratka = "string", typ_sdb = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", rezim_aktual = "number", priz_akut_gdz = "number",}
	const enum GAdtReaderSkupinyDatabaziDtoTypeLengths { ixs_sdb = 12, nazev = 100, zkratka = 16, poznamka = 254, zmenu_prov = 12,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderSkupinyDatabaziFilterEnum {
		/**Název skupiny databazi*/
		nazev,
		/**Skupina databazi*/
		ixs_sdb,
		/**DB Parametr adt_user_licenc | 99 = supervizor*/
		UserParam,
		/**Identifikator ixs_fun*/
		IxsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderStavRevize.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu impementace*/
	interface GAdtReaderStavRevizeDto {
		/**DBCOLUMN:gincrev.stav_revize*/
		stav_revize?: number|null;
		/**DBCOLUMN:gincrev.stav_revize_txt*/
		stav_revize_txt?: string|null;
	}
	const enum GAdtReaderStavRevizeDtoNames { stav_revize = "stav_revize", stav_revize_txt = "stav_revize_txt",}
	const enum GAdtReaderStavRevizeDtoFragments { stav_revize = "*", stav_revize_txt = "*",}
	const enum GAdtReaderStavRevizeDtoTypes { stav_revize = "number", stav_revize_txt = "string",}
	const enum GAdtReaderStavRevizeDtoTypeLengths { stav_revize = 1, stav_revize_txt = 50,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderStavRevizeFilterEnum {
		/**Identifikátor stavu revize*/
		stav_revize,
		/**Název stavu revize*/
		stav_revize_txt,
		/**DB parametr adt_user_revize s opravnenim pristupu k revizim (0 = Prohlizeni, 10 = Autor, 20 = Vedouci vyvojoveho teamu, 99 = Supervizor)*/
		user_param,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderSubsystem.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu impementace*/
	interface GAdtReaderSubsystemDto {
		/**DBCOLUMN:gincsub.subsyst*/
		subsyst?: string|null;
		/**DBCOLUMN:gincszb.subsyst_txt*/
		subsyst_txt?: string|null;
	}
	const enum GAdtReaderSubsystemDtoNames { subsyst = "subsyst", subsyst_txt = "subsyst_txt",}
	const enum GAdtReaderSubsystemDtoFragments { subsyst = "*", subsyst_txt = "*",}
	const enum GAdtReaderSubsystemDtoTypes { subsyst = "string", subsyst_txt = "string",}
	const enum GAdtReaderSubsystemDtoTypeLengths { subsyst = 4, subsyst_txt = 50,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderSubsystemFilterEnum {
		/**Identifikátor Subsystemu*/
		subsyst,
		/**Filtr na textovy nazev Subsystemu*/
		subsyst_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderTypImpl.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne moznosti typu impementace*/
	interface GAdtReaderTiyDto {
		/**DBCOLUMN:ginctiy.tyi*/
		tyi?: string|null;
		/**DBCOLUMN:ginctiy.tyi_txt*/
		tyi_txt?: string|null;
	}
	const enum GAdtReaderTiyDtoNames { tyi = "tyi", tyi_txt = "tyi_txt",}
	const enum GAdtReaderTiyDtoFragments { tyi = "*", tyi_txt = "*",}
	const enum GAdtReaderTiyDtoTypes { tyi = "string", tyi_txt = "string",}
	const enum GAdtReaderTiyDtoTypeLengths { tyi = 1, tyi_txt = 50,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderTypImplFilterEnum {
		/**Identifikátor typu implementace*/
		tyi,
		/**Filtr na textovy nazev typu implementace*/
		tyi_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderVerzeDB.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro Dostupne verze databaze*/
	interface GAdtReaderVerzeDBDto {
		/**DBCOLUMN:gdesver.verze_db*/
		verze_db?: number|null;
		/**Počátek období platnosti verze*/
		dat_od?: JsonDate|null;
		/**Konec období platnosti verze*/
		dat_do?: JsonDate|null;
		/**stav verze*/
		stav_verze?: number|null;
		/**DBCOLUMN:gdesver.poznamka*/
		poznamka?: string|null;
	}
	const enum GAdtReaderVerzeDBDtoNames { verze_db = "verze_db", dat_od = "dat_od", dat_do = "dat_do", stav_verze = "stav_verze", poznamka = "poznamka",}
	const enum GAdtReaderVerzeDBDtoFragments { verze_db = "*", dat_od = "*", dat_do = "*", stav_verze = "*", poznamka = "*",}
	const enum GAdtReaderVerzeDBDtoTypes { verze_db = "number", dat_od = "JsonDate", dat_do = "JsonDate", stav_verze = "number", poznamka = "string",}
	const enum GAdtReaderVerzeDBDtoTypeLengths { poznamka = 254,}
	/**filter pro reader pro Dostupne polozky bez licencnich polatku pro danou licenci*/
	const enum GAdtReaderVerzeDBFilterEnum {
		/**verze databaze*/
		verze_db,
		/**stav verze db*/
		stav_verze,
		/**verze revizi*/
		verze_rev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderVerzeGDZBaliku.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro dostupne licence*/
	interface GReaderVerzeGDZBalikuDto {
		/**DBCOLUMN:gdesadz.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesadz.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesadz.revize_adz*/
		revize_adz?: number|null;
	}
	const enum GReaderVerzeGDZBalikuDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz",}
	const enum GReaderVerzeGDZBalikuDtoFragments { verze_db = "*", sub_verze_db = "*", revize_adz = "*",}
	const enum GReaderVerzeGDZBalikuDtoTypes { verze_db = "number", sub_verze_db = "number", revize_adz = "number",}
	const enum GReaderVerzeGDZBalikuDtoTypeLengths {}
	/**filter pro reader dostupnych licenci*/
	const enum GReaderVerzeGDZBalikuFilterEnum {
		verze_db,
		/**subverze databaze*/
		sub_verze_db,
		/**revize_adz*/
		revize_adz,
		/**nazev licence*/
		nazev,
		/**filtr s priznakem pro inicializacni hodnotu*/
		initial,
		/**filtr na licenci*/
		lic,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderVlastniLicDB.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro vlastni licence DB*/
	interface GAdtReaderVlastniLicDBDto {
		/**DBCOLUMN:vgdeslok.lic*/
		lic?: string|null;
		/**DBCOLUMN:vgdeslok.nazev*/
		nazev?: string|null;
	}
	const enum GAdtReaderVlastniLicDBDtoNames { lic = "lic", nazev = "nazev",}
	const enum GAdtReaderVlastniLicDBDtoFragments { lic = "*", nazev = "*",}
	const enum GAdtReaderVlastniLicDBDtoTypes { lic = "string", nazev = "string",}
	const enum GAdtReaderVlastniLicDBDtoTypeLengths { lic = 4, nazev = 50,}
	/**filter pro reader pro Vlastni licence DB*/
	const enum GAdtReaderVlastniLicDBFilterEnum {
		/**Licence řady*/
		lic,
		/**Název licence*/
		nazev,
		/**DB Parametr adt_user_licenc | 99 = supervizor*/
		UserParam,
		/**Identifikator ixs_fun*/
		IxsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderVlastniLicRad.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DTO pro GDZ baliky*/
	interface GAdtReaderVlastniLicRadDto {
		/**DBCOLUMN:gdesldb.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdesldb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdesldb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdesldb.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdesldb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesldb.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesldb.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdesldb.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdesldb.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gdesldb.typ_db*/
		typ_db?: string|null;
		/**DBCOLUMN:gdesldb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesldb.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdtReaderVlastniLicRadDtoNames { lic = "lic", lic_fyz = "lic_fyz", nazev = "nazev", popis = "popis", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_mpd = "dat_mpd", typ_db = "typ_db", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdtReaderVlastniLicRadDtoFragments { lic = "*", lic_fyz = "*", nazev = "*", popis = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_mpd = "*", typ_db = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdtReaderVlastniLicRadDtoTypes { lic = "string", lic_fyz = "string", nazev = "string", popis = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_mpd = "JsonDate", typ_db = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdtReaderVlastniLicRadDtoTypeLengths { lic = 4, lic_fyz = 4, nazev = 50, popis = 4000, poznamka = 254, typ_db = 3, zmenu_prov = 12,}
	/**filter pro reader pro Dostupne cenikove polozky pro danou licenci*/
	const enum GAdtReaderVlastniLicRadFilterEnum {
		/**Licence řady*/
		lic,
		/**Název licence*/
		nazev,
		/**DB Parametr adt_user_licenc | 99 = supervizor*/
		UserParam,
		/**Identifikator ixs_fun*/
		IxsFun,
		/**Produkční řada*/
		prod_rada,
		/**Balík licencí*/
		ixs_lip,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Readers\IGAdtReaderZAK.d.ts 

declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdesorj*/
	interface GAdtReaderZAKDto {
		/**DBCOLUMN:gdeczak.zak*/
		zak?: string|null;
		/**DBCOLUMN:gdeczak.zak_txt*/
		zak_txt?: string|null;
	}
	const enum GAdtReaderZAKDtoNames { zak = "zak", zak_txt = "zak_txt",}
	const enum GAdtReaderZAKDtoFragments { zak = "*", zak_txt = "*",}
	const enum GAdtReaderZAKDtoTypes { zak = "string", zak_txt = "string",}
	const enum GAdtReaderZAKDtoTypeLengths { zak = 4, zak_txt = 254,}
	/**filter pro reader pro Dostupna ORJ*/
	const enum GAdtReaderZAKFilterEnum {
		/**zak*/
		zak,
		/**nazev zak*/
		zak_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGBalikLicenci.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Registr licenci/Baliky licenci (Balík licencí = množina dílčích licencí)
	* @domain CentralAdmin
	* @businessObject GGdeslipDto
	*/
	interface BalikLicenci {
		/**Metoda List - Seznam Balíků licencí (obsah tabulky gdeslip)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Metoda Read pro detail Balíku licencí (čtení obsahu tabulky gdeslip)*/
		read(rq?:Gordic.Adt.Interface.GGdeslipDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdeslipDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdeslipDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Založení/Update Balíku licencí*/
		upsert(rq?:Gordic.Adt.Interface.GGdeslipDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Metoda list pro prehled programových fazí k licenci (Pol/PPol)*/
		listPrehledFaziLicence(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GPrehledFaziLicenceDto>>;
		/**Metoda List - Maintence Ultimate*/
		listMaintenanceUltimate(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GMaintenanceUltimateDto>>;
		/**Metoda List - SaaS Ultimate mesicni*/
		listSaaSUltimateMesicni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GMaintenanceUltimateDto>>;
		/**Metoda List - SaaS*/
		listSaaS(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GMaintenanceUltimateDto>>;
		/**Metoda List - Prodej*/
		listProdej(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GProdejDto>>;
		/**Metoda List - Historie Baliku licenci (tabulka gdesliphh)*/
		listHistorieBalikyLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesliphhDto>>;
		/**Metoda Read pro detail ulohy Baliky licenci (poduloha Registru licenci), To DO: nahradit metodu Read standardním GServiceReadResponse(Dto) Read(GServiceReadRequest(Dto) rq)*/
		readBalLic(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Metoda Read pro detail Baliky licenci, To DO: nahradit metodu Read standardním GServiceReadResponse(Dto) Read(GServiceReadRequest(Dto) rq)*/
		readBalikyLicenci(rq?:Gordic.Adt.Interface.GGdeslipDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdeslipDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdeslipDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Metoda List - Licence (Obsah baliku licenci - tabulka gdedlip))*/
		listLicence(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlipDto>>;
		/**Metoda List - Provozni sluzby (tabulka gdedlis)*/
		listProvozniSluzby(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlisDto>>;
		/**Metoda List - Sluzby z licencni smlouvy (tabulka gdedsls)*/
		listSluzbyLicencniSmlouvy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedslsDto>>;
		/**Metoda List - Historie Licence (Obsahu baliku licenci -tabulka gdedliphh)*/
		listHistLicence(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedliphhDto>>;
		/**Metoda List - Zodpovednost za balik licenci*/
		listZodpovednostZaBalikLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevfliDto>>;
		/**Metoda List - Historie Zodpovednosti za balik licenci*/
		listHistZodpovednostZaBalikLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevfliDto>>;
		/**Metoda List - Historie Licenci rad PID*/
		listHistLicRadPID(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevlidDto>>;
		/**Metoda List - Historie Komentaru*/
		listHistKomentare(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlikDto>>;
		/**Metoda List - Historie obdobi nehrazeni lic. poplatku*/
		listHistObdNehrLicPopl(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlinDto>>;
		/**Metoda List - Komentare k licenci (dostupne ze seznamu Obsah baliku licenci)*/
		listKomentareKLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlikDto>>;
		/**Metoda List - Obdobi nehrazeni licencnich poplatku (dostupne ze seznamu Obsah baliku licenci)*/
		listObdNehrLicPopl(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlinDto>>;
		/**Metoda list pro seznam existujicich licencnich certifikatu z tabulky gdeslcb (na detailu baliku licenci)*/
		listLicencniCertifikaty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslcbDto>>;
		/**Metoda List pro detail ulohy Baliky licenci (poduloha Registru licenci)*/
		listDetailBalikyLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Insert / Update detailu Baliku licenci (tabulka gdeslip)*/
		upsertBalikyLicenci(rq?:Gordic.Adt.Interface.GGdeslipDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>,void>;
		/**Zalozeni / Update zaznamu - Licence (Obsah balíku licencí - tabulka gdedlip)*/
		upsertLicence(rq?:Gordic.Adt.Interface.GGdedlipDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,void>;
		/**Zruseni zaznamu - Licence (Obsah balíku licencí - tabulka gdedlip)*/
		deleteLicence(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,vyberRadkuBaliku:number[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,vyberRadkuBaliku:number[]},GServiceSaveResponse<Gordic.Adt.Interface.GGdedlipDto>>;
		/**Zalozeni / Update zaznamu - Provozni sluzby(tabulka gdedlis)*/
		upsertProvozniSluzby(rq?:Gordic.Adt.Interface.GGdedlisDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlisDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlisDto>,void>;
		/**Zruseni zaznamu - Provozni sluzby (tabulka gdedlis)*/
		deleteProvozniSluzby(rq?:Gordic.Adt.Interface.GGdedlisDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlisDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlisDto>,void>;
		/**Zalozeni / Update zaznamu - Sluzby licencni smlouvy (tabulka gdedsls)*/
		insertUpdateSluzbyLicencniSmlouvy(rq?:Gordic.Adt.Interface.GGdedslsDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedslsDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedslsDto>,void>;
		/**Zruseni zaznamu - Sluzby licencni smlouvy (tabulka gdedsls)*/
		deleteSluzbyLicencniSmlouvy(rq?:Gordic.Adt.Interface.GGdedslsDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedslsDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedslsDto>,void>;
		/**Zalozeni / Update zaznamu - Obdobi nehrazeni licencnich polatku (tabulka gdedlin)*/
		upsertObdNehrLicPopl(rq?:Gordic.Adt.Interface.GGdedlinDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlinDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlinDto>,void>;
		/**Zruseni zaznamu - Obdobi nehrazeni licencnich polatku (tabulka gdedlin)*/
		deleteObdNehrLicPopl(rq?:Gordic.Adt.Interface.GGdedlinDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlinDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlinDto>,void>;
		/**Zalozeni / Update zaznamu - Komentare k licenci (tabulka gdedlik)*/
		upsertKomentareKLicenci(rq?:Gordic.Adt.Interface.GGdedlikDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlikDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlikDto>,void>;
		/**Zruseni zaznamu - Komentare k licenci (tabulka gdedlik)*/
		deleteKomentareKLicenci(rq?:Gordic.Adt.Interface.GGdedlikDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlikDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlikDto>,void>;
		/**Zalozeni / Update zaznamu - Zodpovednost za balik licenci (tabulka gdevfli)*/
		insertUpdateZodpovednostZaBalLic(rq?:Gordic.Adt.Interface.GGdevfliDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevfliDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevfliDto>,void>;
		/**Zruseni zaznamu - Zodpovednost za balik licenci (tabulka gdevfli)*/
		deleteZodpovednostZaBalLic(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdevfliDto>,vyberUzivatelu:Gordic.Adt.Interface.GGdevfliDto[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GGdevfliDto>,vyberUzivatelu:Gordic.Adt.Interface.GGdevfliDto[]},void>;
		/**Zalozeni / Update zaznamu - Licencni certifikaty (gdeslcb)*/
		insertUpdateLicencniCertifikaty(rq?:Gordic.Adt.Interface.GGdeslcbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslcbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslcbDto>,void>;
		/**Nacteni Licenci z UNL souboru (obsahu baliku licenci ze souboru)*/
		loadLicFromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,ixs_lip:string,ppolJadro:string}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,ixs_lip:string,ppolJadro:string},GServiceSaveResponse<Gordic.Adt.Interface.GImportRowsDto>>;
		/**Nacteni baliku licenci G0 z UNL souboru (migrace dat z G0ADM)*/
		loadBalLicG0FromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,fieldBalLic:string[]}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,fieldBalLic:string[]},GServiceSaveResponse<Gordic.Adt.Interface.GImportRowsDto>>;
		/**Validace importních dat licence řady G0*/
		validateBalLicG0FromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto},GServiceSaveResponse<Gordic.Adt.Interface.GValidDataDto>>;
		/**Zruseni zaznamu - Balik licenci (tabulka gdeslip)*/
		deleteBalLic(rq?:CallParams<{ixs_lip:string}>): _Task<{ixs_lip:string},void>;
		/**Update balíku licencí pro import licencí řady G0*/
		updateBalLic(rq?:Gordic.Adt.Interface.GGdeslipDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>,void>;
		/**Nacteni Provoznich sluzeb ze souboru do balíku licencí*/
		importProvozniSluzby(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,ixs_lip:string}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,ixs_lip:string},GServiceSaveResponse<Gordic.Adt.Interface.GImportRowsDto>>;
		/**Zjisteni poctu mozneho pouziti licenci ultimate*/
		pocetLicenciUltimate(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedlipDto>>;
		/**Výpočet celkové ceny Provozních služeb pro balík licencí*/
		cenaProvozniSluzbyCelkem(rq?:CallParams<{ixs_lip:string,cloud:boolean}>): _Task<{ixs_lip:string,cloud:boolean},GServiceListResponse<Gordic.Adt.Interface.GGdedlisDto>>;
		/**Výpočet celkové ceny Služeb z licencni smlouvy pro balík licencí*/
		cenaSluzbyLicencniSmlouvyCelkem(rq?:CallParams<{ixs_lip:string}>): _Task<{ixs_lip:string},GServiceListResponse<Gordic.Adt.Interface.GGdedslsDto>>;
		/**Ulozeni Licenci do UNL souboru (obsahu baliku licenci do souboru)*/
		saveToFile(rq?:CallParams<{fileInfo:Gordic.Adt.Interface.GObsahBalLicDto,ixs_lip:string,vyberRadkuBaliku:number[]}>): _Task<{fileInfo:Gordic.Adt.Interface.GObsahBalLicDto,ixs_lip:string,vyberRadkuBaliku:number[]},GServiceSaveResponse<Gordic.Adt.Interface.GObsahBalLicDto>>;
		/**Uloženi Provozních služeb do souboru*/
		exportProvozniSluzby(rq?:CallParams<{fileInfo:Gordic.Adt.Interface.GGdedlisDto,ixs_lip:string,vyberRadku:number[]}>): _Task<{fileInfo:Gordic.Adt.Interface.GGdedlisDto,ixs_lip:string,vyberRadku:number[]},GServiceSaveResponse<Gordic.Adt.Interface.GGdedlisDto>>;
		/**Zalozeni zaznamu - Obsah balíku licencí importem ze souboru (tabulka gdedlip)*/
		insertUpdateLicenceFromFile(rq?:Gordic.Adt.Interface.GGdedlipDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,boolean>;
		/**Zalozeni zaznamu - Provozni sluzby ze souboru (tabulka gdedlis)*/
		upsertProvozniSluzbyFromFile(rq?:Gordic.Adt.Interface.GGdedlisDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlisDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlisDto>,boolean>;
		/**Hromadny update vice baliku licenci - výběr baliku licenci (tabulka gdeslip/tabulka gdevfli/tabulka gdevlid)*/
		updateVyberBalLic(rq?:CallParams<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>,rq_zodpovednost:Gordic.Adt.Interface.GGdevfliDto,rq_zodpovednost_odebrat:Gordic.Adt.Interface.GGdevfliDto,rq_licenceRadPID:Gordic.Adt.Interface.GGdevlidDto,vyberBaliku:string[]}>): _Task<{rq_obecneUdaje:GServiceSaveRequest<Gordic.Adt.Interface.GGdeslipDto>,rq_zodpovednost:Gordic.Adt.Interface.GGdevfliDto,rq_zodpovednost_odebrat:Gordic.Adt.Interface.GGdevfliDto,rq_licenceRadPID:Gordic.Adt.Interface.GGdevlidDto,vyberBaliku:string[]},void>;
		/**Hromadny update vice radku z obsahu baliku licenci*/
		updateVyberLicence(rq?:CallParams<{rq_obsahBalLic:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,vyberRadkuBaliku:number[]}>): _Task<{rq_obsahBalLic:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,vyberRadkuBaliku:number[]},GServiceSaveResponse<Gordic.Adt.Interface.GGdedlipDto>>;
		/**update radku z obsahu baliku licenci volany hromadnym updatem*/
		updateVyberRadekLicence(rq?:Gordic.Adt.Interface.GGdedlipDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,boolean>;
		/**Metoda list - Pristupova prava v Registru licenci - Baliky licenci*/
		listPristupovaPravaBalikyLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevfliDto>>;
		/**Metoda list - Aktualni verze licence databaze k baliku licenci*/
		listAktualniVerzeDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVerzeDBDto>>;
		/**Vytvoří nový Licenční certifikát v PDF tvaru*/
		createLicensePdf(rq?:CallParams<{ixs_lip:string,reportIdVarianty:string}>): _Task<{ixs_lip:string,reportIdVarianty:string},GServiceActionResponse<Gordic.Adt.Interface.GBalikyLicenciPdfResult>>;
		/**Kontrola vazby IČA pro Administraci k navázené licenci řady PID pro balík licencí.*/
		icoAdmNavazano(rq?:CallParams<{ixs_lip:string}>): _Task<{ixs_lip:string},GServiceListResponse<Gordic.Adt.Interface.GGdevlidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BalikLicenci: ServiceBase & Catalog.BalikLicenci;
	}
	const BalikLicenci: Client["BalikLicenci"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdeslipDto - Hlavní datový objekt Balíku licencí (tabulka gdeslip)*/
	interface GGdeslipDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**IČO pro fakturaci licenčních poplatků*/
		ico_fakt?: string|null;
		/**Název IČA pro fakturaci licenčních poplatků*/
		ico_fakt_nazev?: string|null;
		/**Povoleni menit ico pro fakturaci (pro hromadnou upravu bal. lic.)*/
		ico_fakt_enable?: boolean|null;
		/**Název balíku licencí*/
		nazev?: string|null;
		/**Vztah funkce k balíku licencí*/
		typ_vdb?: number|null;
		/**Příznak zodpovědného uživatele za balík licencí (0=Ne/ 1=Ano)*/
		zodpovednost_za_bal_lic?: number|null;
		/**Počátek platnosti balíku licencí*/
		dat_od?: JsonDate|null;
		/**Povoleni menit datum platnosti (pro hromadnou upravu bal. lic.)*/
		dat_od_enable?: boolean|null;
		/**Konec platnosti balíku licencí*/
		dat_do?: JsonDate|null;
		/**Platba licencí od*/
		dat_plat_lic_od?: JsonDate|null;
		/**Platba cloud od*/
		dat_plat_cloud_od?: JsonDate|null;
		/**Povoleni menit datum platnosti (pro hromadnou upravu bal. lic.)*/
		dat_do_enable?: boolean|null;
		/**Link na CRM systém distributora*/
		url_crm?: string|null;
		/**Link na Cloud systém distributora*/
		url_cloud?: string|null;
		/**Smlouva provozní*/
		smlouva_provoz?: string|null;
		/**Provoz Cloud systému*/
		provoz_cloud?: number|null;
		/**Provoz Cloud systému textově*/
		provoz_cloud_txt?: string|null;
		/**Poznámka k balíku licencí*/
		poznamka?: string|null;
		/**Povoleni menit poznamku (pro hromadnou upravu bal. lic.)*/
		poznamka_enable?: boolean|null;
		/**Aktivita balíku licencí*/
		aktivita?: number|null;
		/**Povoleni menit aktivitu (pro hromadnou upravu bal. lic.)*/
		aktivita_enable?: boolean|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Popis balíku licencí*/
		popis?: string|null;
		/**Povoleni menit popis (pro hromadnou upravu bal. lic.)*/
		popis_enable?: boolean|null;
		/**Edice balíku licencí*/
		edice?: string|null;
		/**Výsledný režim balíku licenící (0=neultimate / 1 = režim Ultimate)*/
		result?: number|null;
		/**Cena maintenance za balík licencí*/
		cena_maintenance?: JsonDecimal|null;
		/**Pořizovací cena balíku licencí - pro neultimate balíky licencí*/
		porizovaci_cena_neultimate?: JsonDecimal|null;
		/**Celková cena maintenance - pro neultimate balíky licencí*/
		cena_maintenance_neultimate?: JsonDecimal|null;
		/**Celková cena SaaS poplatku - pro neultimate balíky licencí*/
		cena_saas_neultimate?: JsonDecimal|null;
		/**Identifikátor uživatele*/
		ixsFun?: string|null;
		/**Smlouva k balíku licencí, ne jejímž základě byl balík vytvořen*/
		smlouva?: string|null;
		/**Povoleni menit smlouvu (pro hromadnou upravu bal. lic.)*/
		smlouva_enable?: boolean|null;
		/**vybrane radky pro hromadnou úpravu balíků licencí*/
		checkedRows?: boolean|null;
		/**Obchodní model (0=trvalá licence / 10 = licence SaaS)*/
		ob_model?: number|null;
		/**Obchodní model textově (trvalá licence/licence SaaS)*/
		ob_model_txt?: string|null;
		/**Perioda plateb SaaS (1=mesíční / 3 = čtvrtletní / 12 = roční)*/
		perioda_saas?: number|null;
		/**Perioda plateb Služeb (1=mesíční / 3 = čtvrtletní / 12 = roční)*/
		perioda_sl?: number|null;
		/**Datum exportu podkladů plateb do KOF*/
		dat_exp_kof?: JsonDate|null;
		/**Identifikátor distributora (0= centrála / 1 = Praha / 2 = Brno / 3 = Ostrava / 4 = KMS / 5 = FPO / 6 = HAIDA / 7 = Datab)*/
		distributor?: number|null;
		/**Distributor - textová hodnota*/
		distributor_txt?: string|null;
		/**Identifikátor distribučního obchodníka*/
		var?: string|null;
		/**Identifikátor obchodníka (každý má své uid)k*/
		obchodnik?: number|null;
		/**Datum poslední fakturace*/
		posledni_fakturace?: JsonDate|null;
		/**Datum příští měsíční fakturace*/
		pristi_fakturace_mesicni_perioda?: JsonDate|null;
		/**Datum příští čtvrtletní fakturace*/
		pristi_fakturace_ctvrtletni_perioda?: JsonDate|null;
		/**Datum příští roční fakturace*/
		pristi_fakturace_rocni_perioda?: JsonDate|null;
		/**Datum příští fakturace*/
		pristi_fakturace?: JsonDate|null;
		/**Priznak provedeno exportu do KOF (true = ano / false = ne)*/
		export_kof?: boolean|null;
		/**Ceníková položka jádra*/
		pol_jadro?: string|null;
		/**Ceníková podpoložka jádra*/
		ppol_jadro?: string|null;
		/**Ceníková podpoložka jádra*/
		ppol?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**pocet radku v obsahu baliku licenci*/
		pocet_radku_obsah?: number|null;
		/**Hodnota Zak - zákaznické číslo distributorů*/
		zak?: string|null;
		/**Hodnota Zak textově*/
		zak_txt?: string|null;
		/**Příznak produkcni rady (0 = Ginis Express G0 SQL / 200 = Ginis Express G0 WIN / 1000 = Ginis G1 / 3000 = Ginis Express G3 / 4000 = CA / 5000 = Cybersec )*/
		prod_rada?: number|null;
		/**Nazev polozky jadra (modulu) licence rady G0*/
		modul_G0_nazev?: string|null;
		/**Příznak správné administrace role vedoucího projektu pro Azure (Ano/Ne)*/
		role_vedouci_azure_exist?: number|null;
		/**Příznak správné administrace role servisního technika pro Azure (Ano/Ne)*/
		role_servisni_technik_azure_exist?: number|null;
		/**Příznak správné administrace role fakturace pro Azure (Ano/Ne)*/
		role_fakturace_azure_exist?: number|null;
	}
	const enum GGdeslipDtoNames { ixs_lip = "ixs_lip", ico_fakt = "ico_fakt", ico_fakt_nazev = "ico_fakt_nazev", ico_fakt_enable = "ico_fakt_enable", nazev = "nazev", typ_vdb = "typ_vdb", zodpovednost_za_bal_lic = "zodpovednost_za_bal_lic", dat_od = "dat_od", dat_od_enable = "dat_od_enable", dat_do = "dat_do", dat_plat_lic_od = "dat_plat_lic_od", dat_plat_cloud_od = "dat_plat_cloud_od", dat_do_enable = "dat_do_enable", url_crm = "url_crm", url_cloud = "url_cloud", smlouva_provoz = "smlouva_provoz", provoz_cloud = "provoz_cloud", provoz_cloud_txt = "provoz_cloud_txt", poznamka = "poznamka", poznamka_enable = "poznamka_enable", aktivita = "aktivita", aktivita_enable = "aktivita_enable", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", popis = "popis", popis_enable = "popis_enable", edice = "edice", result = "result", cena_maintenance = "cena_maintenance", porizovaci_cena_neultimate = "porizovaci_cena_neultimate", cena_maintenance_neultimate = "cena_maintenance_neultimate", cena_saas_neultimate = "cena_saas_neultimate", ixsFun = "ixsFun", smlouva = "smlouva", smlouva_enable = "smlouva_enable", checkedRows = "checkedRows", ob_model = "ob_model", ob_model_txt = "ob_model_txt", perioda_saas = "perioda_saas", perioda_sl = "perioda_sl", dat_exp_kof = "dat_exp_kof", distributor = "distributor", distributor_txt = "distributor_txt", var = "var", obchodnik = "obchodnik", posledni_fakturace = "posledni_fakturace", pristi_fakturace_mesicni_perioda = "pristi_fakturace_mesicni_perioda", pristi_fakturace_ctvrtletni_perioda = "pristi_fakturace_ctvrtletni_perioda", pristi_fakturace_rocni_perioda = "pristi_fakturace_rocni_perioda", pristi_fakturace = "pristi_fakturace", export_kof = "export_kof", pol_jadro = "pol_jadro", ppol_jadro = "ppol_jadro", ppol = "ppol", lic = "lic", pocet_radku_obsah = "pocet_radku_obsah", zak = "zak", zak_txt = "zak_txt", prod_rada = "prod_rada", modul_G0_nazev = "modul_G0_nazev", role_vedouci_azure_exist = "role_vedouci_azure_exist", role_servisni_technik_azure_exist = "role_servisni_technik_azure_exist", role_fakturace_azure_exist = "role_fakturace_azure_exist",}
	const enum GGdeslipDtoFragments { ixs_lip = "*", ico_fakt = "*", ico_fakt_nazev = "*", ico_fakt_enable = "*", nazev = "*", typ_vdb = "*", zodpovednost_za_bal_lic = "*", dat_od = "*", dat_od_enable = "*", dat_do = "*", dat_plat_lic_od = "*", dat_plat_cloud_od = "*", dat_do_enable = "*", url_crm = "*", url_cloud = "*", smlouva_provoz = "*", provoz_cloud = "*", provoz_cloud_txt = "*", poznamka = "*", poznamka_enable = "*", aktivita = "*", aktivita_enable = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", popis = "*", popis_enable = "*", edice = "*", result = "*", cena_maintenance = "*", porizovaci_cena_neultimate = "*", cena_maintenance_neultimate = "*", cena_saas_neultimate = "*", ixsFun = "*", smlouva = "*", smlouva_enable = "*", checkedRows = "*", ob_model = "*", ob_model_txt = "*", perioda_saas = "*", perioda_sl = "*", dat_exp_kof = "*", distributor = "*", distributor_txt = "*", var = "*", obchodnik = "*", posledni_fakturace = "*", pristi_fakturace_mesicni_perioda = "*", pristi_fakturace_ctvrtletni_perioda = "*", pristi_fakturace_rocni_perioda = "*", pristi_fakturace = "*", export_kof = "*", pol_jadro = "*", ppol_jadro = "*", ppol = "*", lic = "*", pocet_radku_obsah = "*", zak = "*", zak_txt = "*", prod_rada = "*", modul_G0_nazev = "*", role_vedouci_azure_exist = "*", role_servisni_technik_azure_exist = "*", role_fakturace_azure_exist = "*",}
	const enum GGdeslipDtoTypes { ixs_lip = "string", ico_fakt = "string", ico_fakt_nazev = "string", ico_fakt_enable = "boolean", nazev = "string", typ_vdb = "number", zodpovednost_za_bal_lic = "number", dat_od = "JsonDate", dat_od_enable = "boolean", dat_do = "JsonDate", dat_plat_lic_od = "JsonDate", dat_plat_cloud_od = "JsonDate", dat_do_enable = "boolean", url_crm = "string", url_cloud = "string", smlouva_provoz = "string", provoz_cloud = "number", provoz_cloud_txt = "string", poznamka = "string", poznamka_enable = "boolean", aktivita = "number", aktivita_enable = "boolean", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", popis = "string", popis_enable = "boolean", edice = "string", result = "number", cena_maintenance = "JsonDecimal", porizovaci_cena_neultimate = "JsonDecimal", cena_maintenance_neultimate = "JsonDecimal", cena_saas_neultimate = "JsonDecimal", ixsFun = "string", smlouva = "string", smlouva_enable = "boolean", checkedRows = "boolean", ob_model = "number", ob_model_txt = "string", perioda_saas = "number", perioda_sl = "number", dat_exp_kof = "JsonDate", distributor = "number", distributor_txt = "string", var = "string", obchodnik = "number", posledni_fakturace = "JsonDate", pristi_fakturace_mesicni_perioda = "JsonDate", pristi_fakturace_ctvrtletni_perioda = "JsonDate", pristi_fakturace_rocni_perioda = "JsonDate", pristi_fakturace = "JsonDate", export_kof = "boolean", pol_jadro = "string", ppol_jadro = "string", ppol = "string", lic = "string", pocet_radku_obsah = "number", zak = "string", zak_txt = "string", prod_rada = "number", modul_G0_nazev = "string", role_vedouci_azure_exist = "number", role_servisni_technik_azure_exist = "number", role_fakturace_azure_exist = "number",}
	const enum GGdeslipDtoTypeLengths { ixs_lip = 12, ico_fakt = 10, ico_fakt_nazev = 500, nazev = 500, url_crm = 254, url_cloud = 254, smlouva_provoz = 254, provoz_cloud_txt = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100, popis = 4000, edice = 500, ixsFun = 50, smlouva = 254, ob_model_txt = 200, distributor_txt = 200, var = 200, pol_jadro = 4, ppol_jadro = 3, ppol = 10, lic = 4, zak = 4, zak_txt = 254, modul_G0_nazev = 254,}
	/**GPrehledFaziLicenceDto - DTO pro přehled fází k licenci*/
	interface GPrehledFaziLicenceDto {
		/**Programová fáze*/
		faze?: string|null;
		/**Programová fáze textově*/
		faze_txt?: string|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Verze databáze*/
		verze_db?: number|null;
		/**Počet klientských licencí konkrétních fází*/
		pocet?: number|null;
	}
	const enum GPrehledFaziLicenceDtoNames { faze = "faze", faze_txt = "faze_txt", pol = "pol", ppol = "ppol", verze_db = "verze_db", pocet = "pocet",}
	const enum GPrehledFaziLicenceDtoFragments { faze = "*", faze_txt = "*", pol = "*", ppol = "*", verze_db = "*", pocet = "*",}
	const enum GPrehledFaziLicenceDtoTypes { faze = "string", faze_txt = "string", pol = "string", ppol = "string", verze_db = "number", pocet = "number",}
	const enum GPrehledFaziLicenceDtoTypeLengths { faze = 8, faze_txt = 12, pol = 4, ppol = 3,}
	/**GGdesliphhDto - DTO Historie balíků licencí*/
	interface GGdesliphhDto {
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny*/
		iud_dat_zmena?: JsonDate|null;
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Identifikáto IČA pro fakturaci licenčních poplatků*/
		ico_fakt?: string|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Název balíku licencí*/
		nazev?: string|null;
		/**Smlouva pro balík licencí*/
		smlouva?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesliphhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", ixs_lip = "ixs_lip", typ_zmeny = "typ_zmeny", ico_fakt = "ico_fakt", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis = "popis", nazev = "nazev", smlouva = "smlouva", zmenil = "zmenil",}
	const enum GGdesliphhDtoFragments { iud_por = "*", iud_dat_zmena = "*", ixs_lip = "*", typ_zmeny = "*", ico_fakt = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", popis = "*", nazev = "*", smlouva = "*", zmenil = "*",}
	const enum GGdesliphhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", ixs_lip = "string", typ_zmeny = "string", ico_fakt = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", popis = "string", nazev = "string", smlouva = "string", zmenil = "string",}
	const enum GGdesliphhDtoTypeLengths { ixs_lip = 12, typ_zmeny = 1, ico_fakt = 10, poznamka = 254, zmenu_prov = 12, popis = 4000, nazev = 254, smlouva = 254, zmenil = 100,}
	/**GGdedliphhDto - DTO Historie obsahu baliku licenci*/
	interface GGdedliphhDto {
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Číslo řádku v obsahu balíku licencí*/
		radek_lip?: number|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Počet licencí uvedených v balíku licencí*/
		pocet?: number|null;
		/**Počet licencí dle režimu licence*/
		pocet_skut?: number|null;
		/**Režim licence (0 = Řádná / 10 = Technologická / 20 = Marketingová / 30 = Saas / 40 = Gordic / 50 = Ultimate / 90 = Návrh)*/
		rezim_lic?: number|null;
		/**Důvod vzniku licence*/
		duvod?: string|null;
		/**Počátek platnosti licence*/
		dat_od?: JsonDate|null;
		/**Konec platnosti licence*/
		dat_do?: JsonDate|null;
		/**Příznak multilicence (1 = ano / 0 = ne)*/
		priz_multilicence?: number|null;
		/**Příznak speciální ceny (1 = ano / 0 = ne)*/
		priz_spec_cena?: number|null;
		/**Příznak speciální výše maintenance (1 = ano / 0 = ne)*/
		priz_spec_maint?: number|null;
		/**Datum pořízení licence*/
		dat_nakup?: JsonDate|null;
		/**Cena licence*/
		c_nakup?: JsonDecimal|null;
		/**Cena maintenance*/
		c_maintenance?: JsonDecimal|null;
		/**Poznámka k licenci*/
		poznamka?: string|null;
		/**Aktivita licence*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Smlouva pro licenci*/
		smlouva?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdedliphhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ixs_lip = "ixs_lip", radek_lip = "radek_lip", pol = "pol", ppol = "ppol", pocet = "pocet", pocet_skut = "pocet_skut", rezim_lic = "rezim_lic", duvod = "duvod", dat_od = "dat_od", dat_do = "dat_do", priz_multilicence = "priz_multilicence", priz_spec_cena = "priz_spec_cena", priz_spec_maint = "priz_spec_maint", dat_nakup = "dat_nakup", c_nakup = "c_nakup", c_maintenance = "c_maintenance", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", smlouva = "smlouva", zmenil = "zmenil",}
	const enum GGdedliphhDtoFragments { iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ixs_lip = "*", radek_lip = "*", pol = "*", ppol = "*", pocet = "*", pocet_skut = "*", rezim_lic = "*", duvod = "*", dat_od = "*", dat_do = "*", priz_multilicence = "*", priz_spec_cena = "*", priz_spec_maint = "*", dat_nakup = "*", c_nakup = "*", c_maintenance = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", smlouva = "*", zmenil = "*",}
	const enum GGdedliphhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ixs_lip = "string", radek_lip = "number", pol = "string", ppol = "string", pocet = "number", pocet_skut = "number", rezim_lic = "number", duvod = "string", dat_od = "JsonDate", dat_do = "JsonDate", priz_multilicence = "number", priz_spec_cena = "number", priz_spec_maint = "number", dat_nakup = "JsonDate", c_nakup = "JsonDecimal", c_maintenance = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", smlouva = "string", zmenil = "string",}
	const enum GGdedliphhDtoTypeLengths { typ_zmeny = 1, ixs_lip = 12, pol = 4, ppol = 3, duvod = 254, poznamka = 254, zmenu_prov = 12, smlouva = 254, zmenil = 100,}
	/**GGdedlipDto - DTO pro Obsah baliku licenci*/
	interface GGdedlipDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Řádek balíku licencí*/
		radek_lip?: number|null;
		/**Pořadí licence v obsahu balíku licencí*/
		poradi?: number|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Identifikátor lic pro import licencí řady G0*/
		lic?: string|null;
		/**Povoleni menit polozku (pro hromadnou upravu obsahu bal. lic.)*/
		pol_enable?: boolean|null;
		/**popis položky*/
		polPopis?: string|null;
		/**Popis licence*/
		popis?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Povoleni menit podpolozku (pro hromadnou upravu obsahu bal. lic.)*/
		ppol_enable?: boolean|null;
		/**Popis podpoložky*/
		ppolPopis?: string|null;
		/**Počet licencí*/
		pocet?: number|null;
		/**Povoleni menit pocet (pro hromadnou upravu obsahu bal. lic.)*/
		pocet_enable?: boolean|null;
		/**Skutečný počet dle režimu licence*/
		pocet_skut?: number|null;
		/**Interní číselník režimu licencování ceníkových položek systému GINIS  (0 = Řádná / 10 = Technologická / 20 = Marketingová / 30 = Saas / 40 = Gordic / 50 = Ultimate / 90 = Návrh)*/
		rezim_lic?: number|null;
		/**Režim licence - textově*/
		rezim_lic_txt?: string|null;
		/**Povoleni menit rezim (pro hromadnou upravu obsahu bal. lic.)*/
		rezim_lic_enable?: boolean|null;
		/**Typ komentáře k licenci*/
		typ_koment?: number|null;
		/**Důvod vzniku licence*/
		duvod?: string|null;
		/**Povoleni menit duvod (pro hromadnou upravu obsahu bal. lic.)*/
		duvod_enable?: boolean|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Povoleni menit datum platnosti (pro hromadnou upravu obsahu bal. lic.)*/
		dat_od_enable?: boolean|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Povoleni menit datum platnosti (pro hromadnou upravu obsahu bal. lic.)*/
		dat_do_enable?: boolean|null;
		/**Příznak multilicence (0 = ne / 1 = ano)*/
		priz_multilicence?: number|null;
		/**Příznak speciální ceny (0 = ne / 1 = ano)*/
		priz_spec_cena?: number|null;
		/**Příznak speciání výše maintenance (0 = ne / 1 = ano)*/
		priz_spec_maint?: number|null;
		/**Datum nákupu licence*/
		dat_nakup?: JsonDate|null;
		/**Povoleni menit datum nakupu (pro hromadnou upravu obsahu bal. lic.)*/
		dat_nakup_enable?: boolean|null;
		/**Pořizovací cena licence*/
		c_nakup?: JsonDecimal|null;
		/**Povoleni menit porizovaci cenu (pro hromadnou upravu obsahu bal. lic.)*/
		c_nakup_enable?: boolean|null;
		/**Výše maintenance*/
		c_maintenance?: JsonDecimal|null;
		/**Povoleni menit cenu maintenance (pro hromadnou upravu obsahu bal. lic.)*/
		c_maintenance_enable?: boolean|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Povoleni menit poznamku (pro hromadnou upravu obsahu bal. lic.)*/
		poznamka_enable?: boolean|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Povoleni menit aktivitu (pro hromadnou upravu obsahu bal. lic.)*/
		aktivita_enable?: boolean|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Priznak komentar_licence (0 = ne / 1 = ano)*/
		komentar_licence?: number|null;
		/**Priznak obdobi nehrazeni licencnich poplatku - (0 = ne / 1 = ano)*/
		obdobi_nehr_lic_popl?: number|null;
		/**Smlouva k pořízení licence*/
		smlouva?: string|null;
		/**Povoleni menit smlouvu (pro hromadnou upravu obsahu bal. lic.)*/
		smlouva_enable?: boolean|null;
		/**priznak vybranych radku v obsahu balíku licencí (pro hromadnou úpravu obsahu balíku licencí)*/
		checkedRows?: boolean|null;
		/**ORJ - identifikátor osoby pro zodpovědnost za fakturaci*/
		orj?: string|null;
		/**Povoleni menit orj (pro hromadnou upravu obsahu bal. lic.)*/
		orj_enable?: boolean|null;
		/**Upozornění na neplatné kombinace licencí*/
		stav_kontroly_lic?: string|null;
		/**Upozornění na neplatnou ppol*/
		stav_kontroly_ppol?: string|null;
		/**Upozornění na neplatný produkt použitého ceníku*/
		stav_kontroly_cenik?: string|null;
		/**Datum poslední fakturace*/
		posledni_fakturace?: JsonDate|null;
		/**Stav fakturace*/
		stav_fakturace?: string|null;
		/**Identifikátor ceníku GORDIC ze kterého jsou použity položky a podpoložky*/
		ixp_ccm?: string|null;
		/**Povoleni menit cenik (pro hromadnou upravu obsahu bal. lic.)*/
		ixp_ccm_enable?: boolean|null;
		/**Název ceniku*/
		nazev_ceniku?: string|null;
		/**Cena produktu uvedena procentem*/
		cena_procentem?: JsonDecimal|null;
		/**Pořizovací cena neultimate balíku licencí*/
		porizovaci_cena_neultimate?: JsonDecimal|null;
	}
	const enum GGdedlipDtoNames { ixs_lip = "ixs_lip", radek_lip = "radek_lip", poradi = "poradi", pol = "pol", lic = "lic", pol_enable = "pol_enable", polPopis = "polPopis", popis = "popis", ppol = "ppol", ppol_enable = "ppol_enable", ppolPopis = "ppolPopis", pocet = "pocet", pocet_enable = "pocet_enable", pocet_skut = "pocet_skut", rezim_lic = "rezim_lic", rezim_lic_txt = "rezim_lic_txt", rezim_lic_enable = "rezim_lic_enable", typ_koment = "typ_koment", duvod = "duvod", duvod_enable = "duvod_enable", dat_od = "dat_od", dat_od_enable = "dat_od_enable", dat_do = "dat_do", dat_do_enable = "dat_do_enable", priz_multilicence = "priz_multilicence", priz_spec_cena = "priz_spec_cena", priz_spec_maint = "priz_spec_maint", dat_nakup = "dat_nakup", dat_nakup_enable = "dat_nakup_enable", c_nakup = "c_nakup", c_nakup_enable = "c_nakup_enable", c_maintenance = "c_maintenance", c_maintenance_enable = "c_maintenance_enable", poznamka = "poznamka", poznamka_enable = "poznamka_enable", aktivita = "aktivita", aktivita_enable = "aktivita_enable", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", komentar_licence = "komentar_licence", obdobi_nehr_lic_popl = "obdobi_nehr_lic_popl", smlouva = "smlouva", smlouva_enable = "smlouva_enable", checkedRows = "checkedRows", orj = "orj", orj_enable = "orj_enable", stav_kontroly_lic = "stav_kontroly_lic", stav_kontroly_ppol = "stav_kontroly_ppol", stav_kontroly_cenik = "stav_kontroly_cenik", posledni_fakturace = "posledni_fakturace", stav_fakturace = "stav_fakturace", ixp_ccm = "ixp_ccm", ixp_ccm_enable = "ixp_ccm_enable", nazev_ceniku = "nazev_ceniku", cena_procentem = "cena_procentem", porizovaci_cena_neultimate = "porizovaci_cena_neultimate",}
	const enum GGdedlipDtoFragments { ixs_lip = "*", radek_lip = "*", poradi = "*", pol = "*", lic = "*", pol_enable = "*", polPopis = "*", popis = "*", ppol = "*", ppol_enable = "*", ppolPopis = "*", pocet = "*", pocet_enable = "*", pocet_skut = "*", rezim_lic = "*", rezim_lic_txt = "*", rezim_lic_enable = "*", typ_koment = "*", duvod = "*", duvod_enable = "*", dat_od = "*", dat_od_enable = "*", dat_do = "*", dat_do_enable = "*", priz_multilicence = "*", priz_spec_cena = "*", priz_spec_maint = "*", dat_nakup = "*", dat_nakup_enable = "*", c_nakup = "*", c_nakup_enable = "*", c_maintenance = "*", c_maintenance_enable = "*", poznamka = "*", poznamka_enable = "*", aktivita = "*", aktivita_enable = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", komentar_licence = "*", obdobi_nehr_lic_popl = "*", smlouva = "*", smlouva_enable = "*", checkedRows = "*", orj = "*", orj_enable = "*", stav_kontroly_lic = "*", stav_kontroly_ppol = "*", stav_kontroly_cenik = "*", posledni_fakturace = "*", stav_fakturace = "*", ixp_ccm = "*", ixp_ccm_enable = "*", nazev_ceniku = "*", cena_procentem = "*", porizovaci_cena_neultimate = "*",}
	const enum GGdedlipDtoTypes { ixs_lip = "string", radek_lip = "number", poradi = "number", pol = "string", lic = "string", pol_enable = "boolean", polPopis = "string", popis = "string", ppol = "string", ppol_enable = "boolean", ppolPopis = "string", pocet = "number", pocet_enable = "boolean", pocet_skut = "number", rezim_lic = "number", rezim_lic_txt = "string", rezim_lic_enable = "boolean", typ_koment = "number", duvod = "string", duvod_enable = "boolean", dat_od = "JsonDate", dat_od_enable = "boolean", dat_do = "JsonDate", dat_do_enable = "boolean", priz_multilicence = "number", priz_spec_cena = "number", priz_spec_maint = "number", dat_nakup = "JsonDate", dat_nakup_enable = "boolean", c_nakup = "JsonDecimal", c_nakup_enable = "boolean", c_maintenance = "JsonDecimal", c_maintenance_enable = "boolean", poznamka = "string", poznamka_enable = "boolean", aktivita = "number", aktivita_enable = "boolean", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", komentar_licence = "number", obdobi_nehr_lic_popl = "number", smlouva = "string", smlouva_enable = "boolean", checkedRows = "boolean", orj = "string", orj_enable = "boolean", stav_kontroly_lic = "string", stav_kontroly_ppol = "string", stav_kontroly_cenik = "string", posledni_fakturace = "JsonDate", stav_fakturace = "string", ixp_ccm = "string", ixp_ccm_enable = "boolean", nazev_ceniku = "string", cena_procentem = "JsonDecimal", porizovaci_cena_neultimate = "JsonDecimal",}
	const enum GGdedlipDtoTypeLengths { ixs_lip = 12, pol = 4, lic = 4, polPopis = 254, popis = 4000, ppol = 3, ppolPopis = 254, rezim_lic_txt = 254, duvod = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100, smlouva = 254, orj = 4, stav_kontroly_lic = 50, stav_kontroly_ppol = 50, stav_kontroly_cenik = 50, stav_fakturace = 50, ixp_ccm = 12, nazev_ceniku = 254,}
	/**GGdedlisDto - DTO pro Paušální služby k balíku licencí*/
	interface GGdedlisDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Číslo řádku záznamu s paušální službou*/
		radek_lis?: number|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Cena paušální služby*/
		c?: JsonDecimal|null;
		/**Jednotková cena paušální služby*/
		c_jedn?: JsonDecimal|null;
		/**Cena paušální služby s DPH (21%)*/
		c_tax?: JsonDecimal|null;
		/**Celková cena všech paušálních služeb*/
		cena_pausalni_sluzby_celkem?: JsonDecimal|null;
		/**Cena provozu cloudu za balík licencí*/
		cena_cloud?: JsonDecimal|null;
		/**Popis paušální služby*/
		popis?: string|null;
		/**Identifikátor osoby zodpovědné za export podkladů pro KOF*/
		orj?: string|null;
		/**Poznámka k paušální službě*/
		poznamka?: string|null;
		/**Smlouva*/
		smlouva?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Počet paušálních služeb*/
		pocet?: JsonDecimal|null;
		/**Priznak, zda kumulovat radky v exportu pro KOF*/
		priz_kumul?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Priznak více vybranych radku*/
		checkedRows?: boolean|null;
		/**Binární obsah radku pausalnich sluzeb za balik licenci*/
		obsah?: JsonBlob|null;
	}
	const enum GGdedlisDtoNames { ixs_lip = "ixs_lip", radek_lis = "radek_lis", pol = "pol", ppol = "ppol", c = "c", c_jedn = "c_jedn", c_tax = "c_tax", cena_pausalni_sluzby_celkem = "cena_pausalni_sluzby_celkem", cena_cloud = "cena_cloud", popis = "popis", orj = "orj", poznamka = "poznamka", smlouva = "smlouva", aktivita = "aktivita", pocet = "pocet", priz_kumul = "priz_kumul", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", checkedRows = "checkedRows", obsah = "obsah",}
	const enum GGdedlisDtoFragments { ixs_lip = "*", radek_lis = "*", pol = "*", ppol = "*", c = "*", c_jedn = "*", c_tax = "*", cena_pausalni_sluzby_celkem = "*", cena_cloud = "*", popis = "*", orj = "*", poznamka = "*", smlouva = "*", aktivita = "*", pocet = "*", priz_kumul = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", checkedRows = "*", obsah = "*",}
	const enum GGdedlisDtoTypes { ixs_lip = "string", radek_lis = "number", pol = "string", ppol = "string", c = "JsonDecimal", c_jedn = "JsonDecimal", c_tax = "JsonDecimal", cena_pausalni_sluzby_celkem = "JsonDecimal", cena_cloud = "JsonDecimal", popis = "string", orj = "string", poznamka = "string", smlouva = "string", aktivita = "number", pocet = "JsonDecimal", priz_kumul = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", checkedRows = "boolean", obsah = "JsonBlob",}
	const enum GGdedlisDtoTypeLengths { ixs_lip = 12, pol = 4, ppol = 3, popis = 256, orj = 4, poznamka = 254, smlouva = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdedlisDto - DTO pro Služby z licencni smlouvy k balíku licencí*/
	interface GGdedslsDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Číslo řádku záznamu s paušální službou*/
		radek_lis?: number|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Cena paušální služby*/
		c?: JsonDecimal|null;
		/**Jednotková cena paušální služby*/
		c_jedn?: JsonDecimal|null;
		/**Cena paušální služby s DPH (21%)*/
		c_tax?: JsonDecimal|null;
		/**Celková cena všech paušálních služeb*/
		cena_sluzby_licencni_smlouvy_celkem?: JsonDecimal|null;
		/**Cena provozu cloudu za balík licencí*/
		cena_cloud?: JsonDecimal|null;
		/**Popis paušální služby*/
		popis?: string|null;
		/**Identifikátor osoby zodpovědné za export podkladů pro KOF*/
		orj?: string|null;
		/**Poznámka k paušální službě*/
		poznamka?: string|null;
		/**Smlouva*/
		smlouva?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Počet paušálních služeb*/
		pocet?: JsonDecimal|null;
		/**Priznak, zda kumulovat radky v exportu pro KOF*/
		priz_kumul?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Priznak více vybranych radku*/
		checkedRows?: boolean|null;
		/**Binární obsah radku pausalnich sluzeb za balik licenci*/
		obsah?: JsonBlob|null;
	}
	const enum GGdedslsDtoNames { ixs_lip = "ixs_lip", radek_lis = "radek_lis", pol = "pol", ppol = "ppol", c = "c", c_jedn = "c_jedn", c_tax = "c_tax", cena_sluzby_licencni_smlouvy_celkem = "cena_sluzby_licencni_smlouvy_celkem", cena_cloud = "cena_cloud", popis = "popis", orj = "orj", poznamka = "poznamka", smlouva = "smlouva", aktivita = "aktivita", pocet = "pocet", priz_kumul = "priz_kumul", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", checkedRows = "checkedRows", obsah = "obsah",}
	const enum GGdedslsDtoFragments { ixs_lip = "*", radek_lis = "*", pol = "*", ppol = "*", c = "*", c_jedn = "*", c_tax = "*", cena_sluzby_licencni_smlouvy_celkem = "*", cena_cloud = "*", popis = "*", orj = "*", poznamka = "*", smlouva = "*", aktivita = "*", pocet = "*", priz_kumul = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", checkedRows = "*", obsah = "*",}
	const enum GGdedslsDtoTypes { ixs_lip = "string", radek_lis = "number", pol = "string", ppol = "string", c = "JsonDecimal", c_jedn = "JsonDecimal", c_tax = "JsonDecimal", cena_sluzby_licencni_smlouvy_celkem = "JsonDecimal", cena_cloud = "JsonDecimal", popis = "string", orj = "string", poznamka = "string", smlouva = "string", aktivita = "number", pocet = "JsonDecimal", priz_kumul = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", checkedRows = "boolean", obsah = "JsonBlob",}
	const enum GGdedslsDtoTypeLengths { ixs_lip = 12, pol = 4, ppol = 3, popis = 256, orj = 4, poznamka = 254, smlouva = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdevfliDto - Dto pro Zodpovědnost za balík licencí*/
	interface GGdevfliDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Název balíku licencí*/
		nazev?: string|null;
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Identifikátor uživatele zodpovědného za balík licencí*/
		ixs_fun?: string|null;
		/**Identifikátor povolení měnit pole funkcniho mista (pro hromadnou úpravu balíků licencí)*/
		ixs_fun_enabled?: boolean|null;
		/**Identifikátor uživatele pro odebrání ze zodpovědných osob za balík licencí*/
		ixs_fun_odebrat?: string|null;
		/**Identifikátor povolení pole funkcniho mista pro odebrani*/
		ixs_fun_odebrat_enabled?: boolean|null;
		/**Název funkčního místa uživatele*/
		funkcniMisto?: string|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Poznámka k zodpovědné osobě*/
		poznamka?: string|null;
		/**Aktivita zodpovědné osoby*/
		aktivita?: number|null;
		/**Role zodpovědné osoby v rámci Registru licencí*/
		role_fun_lip?: number|null;
		/**Role zodpovědné osoby v rámci Registru licencí (textově)*/
		role_fun_lip_txt?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**priznak více vybranych radku pro hromadnou úpravu záznamů zodpovědných uživatelů*/
		checkedRows?: boolean|null;
	}
	const enum GGdevfliDtoNames { ixs_lip = "ixs_lip", nazev = "nazev", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ixs_fun = "ixs_fun", ixs_fun_enabled = "ixs_fun_enabled", ixs_fun_odebrat = "ixs_fun_odebrat", ixs_fun_odebrat_enabled = "ixs_fun_odebrat_enabled", funkcniMisto = "funkcniMisto", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", role_fun_lip = "role_fun_lip", role_fun_lip_txt = "role_fun_lip_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", checkedRows = "checkedRows",}
	const enum GGdevfliDtoFragments { ixs_lip = "*", nazev = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ixs_fun = "*", ixs_fun_enabled = "*", ixs_fun_odebrat = "*", ixs_fun_odebrat_enabled = "*", funkcniMisto = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", role_fun_lip = "*", role_fun_lip_txt = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", checkedRows = "*",}
	const enum GGdevfliDtoTypes { ixs_lip = "string", nazev = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ixs_fun = "string", ixs_fun_enabled = "boolean", ixs_fun_odebrat = "string", ixs_fun_odebrat_enabled = "boolean", funkcniMisto = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", role_fun_lip = "number", role_fun_lip_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", checkedRows = "boolean",}
	const enum GGdevfliDtoTypeLengths { ixs_lip = 12, nazev = 500, typ_zmeny = 1, ixs_fun = 12, ixs_fun_odebrat = 12, funkcniMisto = 100, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdedlikDto - DTO pro komentáře k balíku licencí*/
	interface GGdedlikDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Řádek balíku licencí*/
		radek_lip?: number|null;
		/**ID záznamu změny*/
		iud_por?: number|null;
		/**Datum změny*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Pořadí komentáře*/
		poradi?: number|null;
		/**Komentář*/
		popis?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Typ komentáře*/
		typ_koment?: number|null;
	}
	const enum GGdedlikDtoNames { ixs_lip = "ixs_lip", radek_lip = "radek_lip", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", poradi = "poradi", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", typ_koment = "typ_koment",}
	const enum GGdedlikDtoFragments { ixs_lip = "*", radek_lip = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", poradi = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", typ_koment = "*",}
	const enum GGdedlikDtoTypes { ixs_lip = "string", radek_lip = "number", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", poradi = "number", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", typ_koment = "number",}
	const enum GGdedlikDtoTypeLengths { ixs_lip = 12, typ_zmeny = 1, popis = 4000, zmenu_prov = 12, zmenil = 100,}
	/**GGdedlinDto - DTO pro Období oprávněného neplacení licenčních poplatků*/
	interface GGdedlinDto {
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Řádek balíku licencí*/
		radek_lip?: number|null;
		/**ID změny*/
		iud_por?: number|null;
		/**Datum změny záznamu*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Důvod neplacení lic. poplatků*/
		duvod?: string|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdedlinDtoNames { ixs_lip = "ixs_lip", radek_lip = "radek_lip", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", dat_od = "dat_od", dat_do = "dat_do", duvod = "duvod", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdedlinDtoFragments { ixs_lip = "*", radek_lip = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", dat_od = "*", dat_do = "*", duvod = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdedlinDtoTypes { ixs_lip = "string", radek_lip = "number", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", dat_od = "JsonDate", dat_do = "JsonDate", duvod = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdedlinDtoTypeLengths { ixs_lip = 12, typ_zmeny = 1, duvod = 254, zmenu_prov = 12, zmenil = 100,}
	/**GMaintenanceUltimateDto - DTO pro kontrolu maintenance Ultimate*/
	interface GMaintenanceUltimateDto {
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Cena roční maintenance*/
		rocni_maintenance?: JsonDecimal|null;
		/**Cena licence uvedena procentem*/
		cena_procentem?: JsonDecimal|null;
		/**Cena roční maintenance textově*/
		rocni_maintenance_txt?: string|null;
		/**Cena měsíční SaaS Ultimate*/
		SaaSUltimateMesicni?: JsonDecimal|null;
		/**Cena roční SaaS Ultimate*/
		SaaSUltimateRocni?: JsonDecimal|null;
		/**Cena SaaS*/
		SaaS?: JsonDecimal|null;
		/**Celková cena licence*/
		cena_licence?: JsonDecimal|null;
		/**Pořizovací cena licence*/
		porizovaci_cena?: JsonDecimal|null;
		/**Cena SaaS celkem*/
		saas_celkem?: JsonDecimal|null;
		/**Příznak speciální maintenance (0 = ne / 1 = ano)*/
		priz_spec_maint?: number|null;
		/**Příznak speciální ceny (1 = ano / 0 = ne)*/
		priz_spec_cena?: number|null;
		/**Popis*/
		popis?: string|null;
		/**Cena maintenance*/
		cena_maintenance?: JsonDecimal|null;
		/**Identifikátor Distributora*/
		distributor?: string|null;
		/**Identifikátor určující řadu faktur*/
		var?: string|null;
		/**Identifikátor osoby zodpovědné za export podkladů pro KOF*/
		orj?: string|null;
		/**Datum vystavení*/
		dat_vystaveni?: string|null;
		/**Datum uskutečnitelného zdanitelného plnění*/
		dat_uzp?: string|null;
		/**Datum splatnosti*/
		dat_splatnost?: string|null;
		/**Poznamka*/
		poznamka?: string|null;
	}
	const enum GMaintenanceUltimateDtoNames { pol = "pol", ppol = "ppol", rocni_maintenance = "rocni_maintenance", cena_procentem = "cena_procentem", rocni_maintenance_txt = "rocni_maintenance_txt", SaaSUltimateMesicni = "SaaSUltimateMesicni", SaaSUltimateRocni = "SaaSUltimateRocni", SaaS = "SaaS", cena_licence = "cena_licence", porizovaci_cena = "porizovaci_cena", saas_celkem = "saas_celkem", priz_spec_maint = "priz_spec_maint", priz_spec_cena = "priz_spec_cena", popis = "popis", cena_maintenance = "cena_maintenance", distributor = "distributor", var = "var", orj = "orj", dat_vystaveni = "dat_vystaveni", dat_uzp = "dat_uzp", dat_splatnost = "dat_splatnost", poznamka = "poznamka",}
	const enum GMaintenanceUltimateDtoFragments { pol = "*", ppol = "*", rocni_maintenance = "*", cena_procentem = "*", rocni_maintenance_txt = "*", SaaSUltimateMesicni = "*", SaaSUltimateRocni = "*", SaaS = "*", cena_licence = "*", porizovaci_cena = "*", saas_celkem = "*", priz_spec_maint = "*", priz_spec_cena = "*", popis = "*", cena_maintenance = "*", distributor = "*", var = "*", orj = "*", dat_vystaveni = "*", dat_uzp = "*", dat_splatnost = "*", poznamka = "*",}
	const enum GMaintenanceUltimateDtoTypes { pol = "string", ppol = "string", rocni_maintenance = "JsonDecimal", cena_procentem = "JsonDecimal", rocni_maintenance_txt = "string", SaaSUltimateMesicni = "JsonDecimal", SaaSUltimateRocni = "JsonDecimal", SaaS = "JsonDecimal", cena_licence = "JsonDecimal", porizovaci_cena = "JsonDecimal", saas_celkem = "JsonDecimal", priz_spec_maint = "number", priz_spec_cena = "number", popis = "string", cena_maintenance = "JsonDecimal", distributor = "string", var = "string", orj = "string", dat_vystaveni = "string", dat_uzp = "string", dat_splatnost = "string", poznamka = "string",}
	const enum GMaintenanceUltimateDtoTypeLengths { pol = 6, ppol = 6, popis = 800, distributor = 40, var = 100, orj = 100,}
	/**GProdejDto - DTO pro zalozku Prodej*/
	interface GProdejDto {
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Cena licence*/
		cena_licence?: JsonDecimal|null;
		/**Cena licence uvedena procentem*/
		cena_procentem?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
		/**Pořizovací cena*/
		porizovaci_cena?: JsonDecimal|null;
		/**Označení distributora*/
		distributor?: string|null;
		/**Identifikátor řady faktur*/
		var?: string|null;
		/**Identifikátor osoby zodpovědné za export podkladů pro KOF*/
		orj?: string|null;
		/**Datum vystavení*/
		dat_vystaveni?: string|null;
		/**Datum uskutečnitelného zdanitelného plnění*/
		dat_uzp?: string|null;
		/**Datum splatnosti*/
		dat_splatnost?: string|null;
	}
	const enum GProdejDtoNames { pol = "pol", ppol = "ppol", cena_licence = "cena_licence", cena_procentem = "cena_procentem", popis = "popis", porizovaci_cena = "porizovaci_cena", distributor = "distributor", var = "var", orj = "orj", dat_vystaveni = "dat_vystaveni", dat_uzp = "dat_uzp", dat_splatnost = "dat_splatnost",}
	const enum GProdejDtoFragments { pol = "*", ppol = "*", cena_licence = "*", cena_procentem = "*", popis = "*", porizovaci_cena = "*", distributor = "*", var = "*", orj = "*", dat_vystaveni = "*", dat_uzp = "*", dat_splatnost = "*",}
	const enum GProdejDtoTypes { pol = "string", ppol = "string", cena_licence = "JsonDecimal", cena_procentem = "JsonDecimal", popis = "string", porizovaci_cena = "JsonDecimal", distributor = "string", var = "string", orj = "string", dat_vystaveni = "string", dat_uzp = "string", dat_splatnost = "string",}
	const enum GProdejDtoTypeLengths { pol = 6, ppol = 6, popis = 800, distributor = 100, var = 100, orj = 100,}
	/**GObsahBalLicDto - DTO pro Obsah baliku licenci*/
	interface GObsahBalLicDto {
		/**Identifikátor Balíku licencí*/
		ixs_lip?: string|null;
		/**Binární obsah radku baliku licenci*/
		obsah?: JsonBlob|null;
		/**Jméno vygenerovaného souboru obsahujícího radky bliku licenci*/
		content_file_name?: string|null;
	}
	const enum GObsahBalLicDtoNames { ixs_lip = "ixs_lip", obsah = "obsah", content_file_name = "content_file_name",}
	const enum GObsahBalLicDtoFragments { ixs_lip = "*", obsah = "*", content_file_name = "*",}
	const enum GObsahBalLicDtoTypes { ixs_lip = "string", obsah = "JsonBlob", content_file_name = "string",}
	const enum GObsahBalLicDtoTypeLengths { ixs_lip = 12,}
	/**GGdeslcbDto - DTO pro licenční certifikáty*/
	interface GGdeslcbDto {
		/**Identifikátor Balíku licencí*/
		ixs_lip?: string|null;
		/**Identifikátor licenčního certifikátu*/
		ixp?: string|null;
		/**Verze lic. certifikátu*/
		verze_lip?: number|null;
		/**Binární obsah licenčního certifikátu*/
		obsah?: JsonBlob|null;
		/**Identifikátor tiskové sestavy*/
		ixs_frm?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdeslcbDtoNames { ixs_lip = "ixs_lip", ixp = "ixp", verze_lip = "verze_lip", obsah = "obsah", ixs_frm = "ixs_frm", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdeslcbDtoFragments { ixs_lip = "*", ixp = "*", verze_lip = "*", obsah = "*", ixs_frm = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdeslcbDtoTypes { ixs_lip = "string", ixp = "string", verze_lip = "number", obsah = "JsonBlob", ixs_frm = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdeslcbDtoTypeLengths { ixs_lip = 12, ixp = 12, ixs_frm = 12, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GValidDataDto - Validační Dto pro import licence řady G0*/
	interface GValidDataDto {
		/**Vypis duplicitnich radku zjistenych pro import*/
		log?: string|null;
		/**Vypis ostatních upozornění*/
		other_info?: string|null;
		/**Pole kolizních licencí řad PID G0 pro import*/
		licRadPidG0?: string[]|null;
		/**Pole kolizních balíků licencí řady G0 pro import*/
		balLicG0?: string[]|null;
		/**Pole kolizních licencí řad PID G1 pro import*/
		licRadPidG1?: string[]|null;
		/**Existence aktivních balíků licencí řady G0 s použitou importní licencí řady PID*/
		activBalLicG0Exist?: boolean|null;
		/**Existence importní licence řady PID v řadě G1*/
		licPidG1Exist?: boolean|null;
	}
	const enum GValidDataDtoNames { log = "log", other_info = "other_info", licRadPidG0 = "licRadPidG0", balLicG0 = "balLicG0", licRadPidG1 = "licRadPidG1", activBalLicG0Exist = "activBalLicG0Exist", licPidG1Exist = "licPidG1Exist",}
	const enum GValidDataDtoFragments { log = "*", other_info = "*", licRadPidG0 = "*", balLicG0 = "*", licRadPidG1 = "*", activBalLicG0Exist = "*", licPidG1Exist = "*",}
	const enum GValidDataDtoTypes { log = "string", other_info = "string", licRadPidG0 = "string[]", balLicG0 = "string[]", licRadPidG1 = "string[]", activBalLicG0Exist = "boolean", licPidG1Exist = "boolean",}
	const enum GValidDataDtoTypeLengths { log = 10000, other_info = 10000,}
	/**GImportRowsDto - Dto pro import radku baliku licenci*/
	interface GImportRowsDto {
		/**Vypis duplicitnich radku zjistenych behem importu*/
		log?: string|null;
		/**Vypis ostatních upozornění*/
		other_info?: string|null;
	}
	const enum GImportRowsDtoNames { log = "log", other_info = "other_info",}
	const enum GImportRowsDtoFragments { log = "*", other_info = "*",}
	const enum GImportRowsDtoTypes { log = "string", other_info = "string",}
	const enum GImportRowsDtoTypeLengths { log = 10000, other_info = 10000,}
	/**GBalikyLicenciPdfResult - DTO pro licenční certifikáty ve formátu PDF*/
	interface GBalikyLicenciPdfResult {
		/**Obsah PDF souboru*/
		file?: JsonBlob|null;
		/**Název souboru*/
		kind_name?: string|null;
	}
	const enum GBalikyLicenciPdfResultNames { file = "file", kind_name = "kind_name",}
	const enum GBalikyLicenciPdfResultFragments { file = "*", kind_name = "*",}
	const enum GBalikyLicenciPdfResultTypes { file = "JsonBlob", kind_name = "string",}
	const enum GBalikyLicenciPdfResultTypeLengths {}
	/**DTO pro dostupne verze licence databaze*/
	interface GVerzeDBDto {
		/**Verze zákaznické databáze*/
		verze_db?: number|null;
		/**Subverze zákaznické databáze*/
		sub_verze_db?: number|null;
		/**Licence rady PID*/
		lic?: string|null;
		/**Licence databaze*/
		lic_fyz?: string|null;
	}
	const enum GVerzeDBDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db", lic = "lic", lic_fyz = "lic_fyz",}
	const enum GVerzeDBDtoFragments { verze_db = "*", sub_verze_db = "*", lic = "*", lic_fyz = "*",}
	const enum GVerzeDBDtoTypes { verze_db = "number", sub_verze_db = "number", lic = "string", lic_fyz = "string",}
	const enum GVerzeDBDtoTypeLengths { lic = 4, lic_fyz = 4,}
	/**Možné položky filtru pro Baliky licenci*/
	const enum GBalikLicenciFilterEnum {
		/**filtr na vybranou skupinu baliku licenci*/
		vyberBaliku,
		/**filtr na vybranou skupinu radku z baliku licenci (obsah balíku licencí)*/
		vyberRadku,
		/**filtr na Baliky licenci - identifikator baliku licenci*/
		ixs_lip,
		/**filtr na cenik - identifikátor ceníku*/
		ixp_ccm,
		/**filtr na Baliky licenci - IČO pro fakturaci licenčních poplatků*/
		ico_fakt,
		/**filtr na Baliky licenci - IČO pro administraci*/
		ico_adm,
		/**filtr na Baliky licenci - Aktivita záznamu*/
		aktivita,
		/**filtr na platnost baliku licenci*/
		dat_od,
		/**filtr na platnost baliku licenci*/
		dat_do,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr na uživatele*/
		ixsFun,
		/**filtr pro Název balíku*/
		nazev,
		/**filtr na řádek z obsahu balíku licencí*/
		radek_lip,
		/**filtr na cenu rocni maintenance*/
		rocni_maintenance,
		/**filtr na cenu SaaS mesicni maintenance*/
		SaaS_mesicni,
		/**filtr na cenu SaaS rocni maintenance*/
		SaaS_rocni,
		/**filtr na porizovaci cenu*/
		porizovaci_cena,
		/**filtr na periodu saas*/
		perioda_saas,
		/**filtr na castku saas*/
		SaaS,
		/**filtr na edici baliku licenci*/
		edice,
		/**filtr na ORJ*/
		orj,
		/**Filtr na položku balíku licencí*/
		pol,
		/**Filtr na podpoložku balíku licencí*/
		ppol,
		/**Filtr na priznak otevirani baliku licenci pres url*/
		url_user,
		/**filtr na produkční řadu baliku licencí (0=G0 SQL, 200=G0 WIN, 1000=G1)*/
		prod_rada,
		poradi,
		lic,
		lic_fyz,
		ixs_fun,
	}
	/**Možné položky filtru pro seznam Licencnich certifikatu*/
	const enum GLicCertFilterEnum {
		/**filtr na vybrany balik licenci - identifikátor balíku licencí*/
		ixs_lip,
		/**filtr na vybranou verzi lic. certifikatu pro balik licenci*/
		verze_lip,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**Filtr pro licenci databáze*/
		lic,
		/**Filtr na datum platnosti*/
		dat_od,
	}
	/**Možné položky filtru pro ziskani prehledu fazi licence*/
	const enum GPrehledFaziLicenceFilterEnum {
		/**filtr na licenční položku*/
		pol,
		/**filtr na lienční podpoložku*/
		ppol,
		/**filtr na verzi databáze*/
		verzeDB,
		/**filtr na fázi*/
		faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGLicenceDatabazi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Registr licenci/Licence databází (Licence databáze = množina dílčích licencí)
	* @domain CentralAdmin
	* @businessObject GGdespdbDto
	*/
	interface LicenceDatabazi {
		/**Metoda List pro seznam ulohy Primarni licence databazi (poduloha Registru licenci)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdespdbDTO>>;
		/**Metoda Read pro detail Licence databáze (čtení obsahu tabulky gdespdp)*/
		read(rq?:Gordic.Adt.Interface.GGdespdbDTO|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdespdbDTO>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdespdbDTO>,GServiceReadResponse<Gordic.Adt.Interface.GGdespdbDTO>>;
		/**Založení/Update Licence databáze*/
		upsert(rq?:Gordic.Adt.Interface.GGdespdbDTO|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdespdbDTO>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdespdbDTO>,GServiceSaveResponse<Gordic.Adt.Interface.GGdespdbDTO>>;
		/**Založení/Update zaznamu do tabulky vsech provoznich databazi zakaznuku GINIS (gdesdbo)*/
		upsertLicDb(rq?:Gordic.Adt.Interface.GLicDbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GLicDbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GLicDbDto>,GServiceSaveResponse<Gordic.Adt.Interface.GLicDbDto>>;
		/**Založení/Update Garanta provozni databaze*/
		upsertGarantDB(rq?:Gordic.Adt.Interface.GGdevdboDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevdboDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevdboDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdevdboDto>>;
		/**Zruseni zaznamu - Garant provozni databaze*/
		deleteGarantDB(rq?:Gordic.Adt.Interface.GGdevdboDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevdboDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevdboDto>,void>;
		/**Metoda List pro seznam statistiky databaze (ref T23437)*/
		listStatistikaDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdbtDto>>;
		/**Metoda List pro seznam Historie Primarnich licenci*/
		listHistorieLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdespdbDTO>>;
		/**Metoda list seznam licencí*/
		listSeznamLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslicDTO>>;
		/**Metoda list Garanti provozní databáze*/
		listGarantiDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevdboDto>>;
		/**Seznam s udaji o porovnani licenci DB
		*     To do: Zatim pouze experiment
		*/
		listCompareLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslicCompareDto>>;
		/**Metoda List - Popisy změn za licenci databáze*/
		listZmenyLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GPopisZmenyDto>>;
		/**Metoda List - Aktuálně používané revize za licenci databáze*/
		listPouzivaneRevizeLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesredDto>>;
		/**Nacteni max revizi licence DB nasazenych u zakaznika*/
		loadRevMaxLicDBFromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,lic:string}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,lic:string},GServiceSaveResponse<Gordic.Adt.Interface.GImportRowsDto>>;
		/**Zalozeni zaznamu - Nejvyssi revize Licence DB*/
		insertUpdateRevMaxLicDB(rq?:Gordic.Adt.Interface.GGdesredDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesredDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesredDto>,boolean>;
		/**Zrušení maximálních revizí licence DB*/
		deleteRevMaxLicDB(rq?:Gordic.Adt.Interface.GGdesredDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesredDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesredDto>,boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LicenceDatabazi: ServiceBase & Catalog.LicenceDatabazi;
	}
	const LicenceDatabazi: Client["LicenceDatabazi"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdespdb*/
	interface GGdespdbDTO {
		/**DBCOLUMN:gdespdb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdespdbhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdespdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdecsdf.typ_vdb*/
		typ_vdb?: number|null;
		/**DBCOLUMN:gdespdb.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdespdb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdespdb.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdespdb.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdespdb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu primarni licene databazi*/
		zmenil?: string|null;
		/**DBCOLUMN:gdespdb.rezim_aktual*/
		rezim_aktual?: number|null;
		/**DBCOLUMN:gdespdb.rezim_aktual*/
		rezim_aktual_txt?: string|null;
		/**DBCOLUMN:gdespdb.rezim_aktual_gdz*/
		rezim_aktual_gdz?: number|null;
		/**DBCOLUMN:gdespdb.rezim_aktual_gdz*/
		rezim_aktual_gdz_txt?: string|null;
		/**Příznak existence licence v pohledu vgeslok*/
		vgdeslok_exist?: number|null;
		/**Typ implementace, výběr z ginctiy*/
		tyi?: string|null;
		/**Typ implementace textově*/
		tyi_txt?: string|null;
		/**ICO zákazníka*/
		ico?: string|null;
		/**Projekt vztahující se k licenci databáze*/
		projekt?: string|null;
		/**Typ databáze (MSS/ORA/INF)*/
		typ_db?: string|null;
		/**Kultura textu, podle číselníku ginscfd*/
		kultura?: number|null;
		/**Příznak existence licence v gdesdbo (Seznam provozních databází všech detekovaných zákazníků GINIS)*/
		gdesdbo_exist?: number|null;
		/**Příznak existence navázané licence řady PID k licenci databáze*/
		pid_exist?: number|null;
		/**Příznak existence navázané licence řady PID s ICEM pro administraci k licenci databáze*/
		ico_adm_pid_exist?: number|null;
		/**Příznak existence zadaneho tyou implementace k navazane licenci rady PID*/
		pid_typ_impl_exist?: number|null;
		/**Příznak existence navázaného baliku licenci na licenci rady PID*/
		ixs_lip_exist?: number|null;
		/**Příznak více vybraných řádků (pro hromadné úpravy)*/
		checkedRows?: boolean|null;
		/**Příznak produkcni rady (0 = Ginis Express G0 SQL / 200 = Ginis Express G0 WIN / 1000 = Ginis G1 / 3000 = Ginis Express G3 / 4000 = CA / 5000 = Cybersec )*/
		prod_rada?: number|null;
		/**Polozka jadra (modul) pro licence rady G0*/
		modul_G0?: string|null;
		/**Nazev polozky jadra (modulu) licence rady G0*/
		modul_G0_nazev?: string|null;
		/**Nazev podpolozky jadra*/
		ppol_jadro?: string|null;
	}
	const enum GGdespdbDTONames { lic_fyz = "lic_fyz", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", nazev = "nazev", typ_vdb = "typ_vdb", popis = "popis", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_mpd = "dat_mpd", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", rezim_aktual = "rezim_aktual", rezim_aktual_txt = "rezim_aktual_txt", rezim_aktual_gdz = "rezim_aktual_gdz", rezim_aktual_gdz_txt = "rezim_aktual_gdz_txt", vgdeslok_exist = "vgdeslok_exist", tyi = "tyi", tyi_txt = "tyi_txt", ico = "ico", projekt = "projekt", typ_db = "typ_db", kultura = "kultura", gdesdbo_exist = "gdesdbo_exist", pid_exist = "pid_exist", ico_adm_pid_exist = "ico_adm_pid_exist", pid_typ_impl_exist = "pid_typ_impl_exist", ixs_lip_exist = "ixs_lip_exist", checkedRows = "checkedRows", prod_rada = "prod_rada", modul_G0 = "modul_G0", modul_G0_nazev = "modul_G0_nazev", ppol_jadro = "ppol_jadro",}
	const enum GGdespdbDTOFragments { lic_fyz = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", nazev = "*", typ_vdb = "*", popis = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_mpd = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", rezim_aktual = "*", rezim_aktual_txt = "*", rezim_aktual_gdz = "*", rezim_aktual_gdz_txt = "*", vgdeslok_exist = "*", tyi = "*", tyi_txt = "*", ico = "*", projekt = "*", typ_db = "*", kultura = "*", gdesdbo_exist = "*", pid_exist = "*", ico_adm_pid_exist = "*", pid_typ_impl_exist = "*", ixs_lip_exist = "*", checkedRows = "*", prod_rada = "*", modul_G0 = "*", modul_G0_nazev = "*", ppol_jadro = "*",}
	const enum GGdespdbDTOTypes { lic_fyz = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", nazev = "string", typ_vdb = "number", popis = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_mpd = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", rezim_aktual = "number", rezim_aktual_txt = "string", rezim_aktual_gdz = "number", rezim_aktual_gdz_txt = "string", vgdeslok_exist = "number", tyi = "string", tyi_txt = "string", ico = "string", projekt = "string", typ_db = "string", kultura = "number", gdesdbo_exist = "number", pid_exist = "number", ico_adm_pid_exist = "number", pid_typ_impl_exist = "number", ixs_lip_exist = "number", checkedRows = "boolean", prod_rada = "number", modul_G0 = "string", modul_G0_nazev = "string", ppol_jadro = "string",}
	const enum GGdespdbDTOTypeLengths { lic_fyz = 4, typ_zmeny = 1, nazev = 50, popis = 4000, poznamka = 254, zmenu_prov = 12, zmenil = 100, tyi = 1, tyi_txt = 500, ico = 10, projekt = 254, typ_db = 3, modul_G0 = 4, modul_G0_nazev = 254, ppol_jadro = 3,}
	/**DBTABLE:gdesdbt*/
	interface GGdesdbtDto {
		/**DBCOLUMN:gdesdbt.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdesdbt.priz_d*/
		priz_d?: number|null;
		/**DBCOLUMN:gdesdbt.db_guid*/
		db_guid?: string|null;
		/**DBCOLUMN:gdesdbt.ico*/
		ico?: string|null;
		/**DBCOLUMN:gdesdbt.typ_db*/
		typ_db?: string|null;
		/**DBCOLUMN:gdesdbt.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdesdbt.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesdbt.revize_adz*/
		revize_adz?: number|null;
		/**DBCOLUMN:gdesdbt.typ_inst*/
		typ_inst?: number|null;
		/**DBCOLUMN:gdesdbt.priz_archiv*/
		priz_archiv?: number|null;
		/**DBCOLUMN:gdesdbt.kultura*/
		kultura?: number|null;
		/**DBCOLUMN:gdesdbt.gin_typ_inst*/
		gin_typ_inst?: string|null;
		/**DBCOLUMN:gdesdbt.priz_multikult*/
		priz_multikult?: number|null;
		/**DBCOLUMN:gdesdbt.priz_azure*/
		priz_azure?: number|null;
		/**DBCOLUMN:gdesdbt.priz_unicode*/
		priz_unicode?: number|null;
		/**DBCOLUMN:gdesdbt.edi*/
		edi?: string|null;
		/**DBCOLUMN:gdesdbt.idle_ping*/
		idle_ping?: number|null;
		/**DBCOLUMN:gdesdbt.servername*/
		servername?: string|null;
		/**DBCOLUMN:gdesdbt.db_name*/
		db_name?: string|null;
		/**DBCOLUMN:gdesdbt.dat_test_od*/
		dat_test_od?: JsonDate|null;
		/**DBCOLUMN:gdesdbt.mail_adl*/
		mail_adl?: string|null;
		/**DBCOLUMN:table_name*/
		table_name?: string|null;
		/**DBCOLUMN:gdesdbt.tel_adl*/
		tel_adl?: string|null;
		/**DBCOLUMN:gdesdbt.pozn_adl*/
		pozn_adl?: string|null;
		/**DBCOLUMN:gdesdbt.mail_chyby*/
		mail_chyby?: string|null;
		/**DBCOLUMN:gdesdbt.tel_chyby*/
		tel_chyby?: string|null;
		/**DBCOLUMN:gdesdbt.pozn_chyby*/
		pozn_chyby?: string|null;
	}
	const enum GGdesdbtDtoNames { lic = "lic", priz_d = "priz_d", db_guid = "db_guid", ico = "ico", typ_db = "typ_db", verze_db = "verze_db", sub_verze_db = "sub_verze_db", revize_adz = "revize_adz", typ_inst = "typ_inst", priz_archiv = "priz_archiv", kultura = "kultura", gin_typ_inst = "gin_typ_inst", priz_multikult = "priz_multikult", priz_azure = "priz_azure", priz_unicode = "priz_unicode", edi = "edi", idle_ping = "idle_ping", servername = "servername", db_name = "db_name", dat_test_od = "dat_test_od", mail_adl = "mail_adl", table_name = "table_name", tel_adl = "tel_adl", pozn_adl = "pozn_adl", mail_chyby = "mail_chyby", tel_chyby = "tel_chyby", pozn_chyby = "pozn_chyby",}
	const enum GGdesdbtDtoFragments { lic = "*", priz_d = "*", db_guid = "*", ico = "*", typ_db = "*", verze_db = "*", sub_verze_db = "*", revize_adz = "*", typ_inst = "*", priz_archiv = "*", kultura = "*", gin_typ_inst = "*", priz_multikult = "*", priz_azure = "*", priz_unicode = "*", edi = "*", idle_ping = "*", servername = "*", db_name = "*", dat_test_od = "*", mail_adl = "*", table_name = "*", tel_adl = "*", pozn_adl = "*", mail_chyby = "*", tel_chyby = "*", pozn_chyby = "*",}
	const enum GGdesdbtDtoTypes { lic = "string", priz_d = "number", db_guid = "string", ico = "string", typ_db = "string", verze_db = "number", sub_verze_db = "number", revize_adz = "number", typ_inst = "number", priz_archiv = "number", kultura = "number", gin_typ_inst = "string", priz_multikult = "number", priz_azure = "number", priz_unicode = "number", edi = "string", idle_ping = "number", servername = "string", db_name = "string", dat_test_od = "JsonDate", mail_adl = "string", table_name = "string", tel_adl = "string", pozn_adl = "string", mail_chyby = "string", tel_chyby = "string", pozn_chyby = "string",}
	const enum GGdesdbtDtoTypeLengths { lic = 4, db_guid = 36, ico = 10, typ_db = 3, gin_typ_inst = 3, edi = 1, servername = 100, db_name = 100, mail_adl = 254, table_name = 254, tel_adl = 254, pozn_adl = 254, mail_chyby = 254, tel_chyby = 254, pozn_chyby = 254,}
	/**GVgdeslicDto - DTO pro jednotlivé zákaznické licence*/
	interface GVgdeslicDTO {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**Název licence databáze*/
		nazev_lic?: string|null;
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**název balíku licencí*/
		nazev_bal_lic?: string|null;
		/**Identifikátor řádku z balíku licencí*/
		radek_lip?: number|null;
		/**Datum počátku platnosti*/
		dat_od?: JsonDate|null;
		/**Název ICA pro fakturaci*/
		ico_fakt_nazev?: string|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Popis licenční položky*/
		polPopis?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Popis licenční podpoložky*/
		ppolPopis?: string|null;
		/**Režim licence (0 = Řádná / 10 = Technologická / 20 = Marketingová / 30 = Saas / 40 = Gordic / 50 = Ultimate / 90 = Návrh)*/
		rezim_lic?: number|null;
		/**Textová hodnota režimu licence*/
		rezim_lic_txt?: string|null;
		/**Popis licence*/
		popis?: string|null;
		/**Datum konce platnosti*/
		dat_do?: JsonDate|null;
		/**Pocet licencí obsazenych v balíku licencí*/
		pocet?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**ICO pro fakturaci*/
		ico_fakt?: string|null;
		/**ICO pro administraci*/
		ico_adm?: string|null;
		/**Příznak multilicence (0 = ne / 1 = ano)*/
		priz_multilicence?: number|null;
		/**Příznak speciální ceny licence (0 = ne / 1 = ano)*/
		priz_spec_cena?: number|null;
		/**Příznak speciální výše maintenance (0 = ne / 1 = ano)*/
		priz_spec_maint?: number|null;
		/**Počet zakoupených licencí*/
		pocet_skutecny?: number|null;
		/**Důvod k přízení licence*/
		duvod?: string|null;
		/**Nákupní cena licence*/
		c_nakup?: JsonDecimal|null;
		/**Datum nákupu licence*/
		dat_nakup?: JsonDate|null;
		/**Cena maintenance*/
		c_maintenance?: JsonDecimal|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Hodnota chybneho stavu - pro zjisteni chybneho data marketingovych licenci*/
		error_state?: boolean|null;
		/**Upozornění na neplatné kombinace licencí*/
		stav_kontroly_lic?: string|null;
		/**Upozornění na neplatnou ppol*/
		stav_kontroly_ppol?: string|null;
		/**Datum posledni_fakturace*/
		posledni_fakturace?: JsonDate|null;
		/**Kontrola fakturace (stavu faktura)*/
		stav_fakturace?: string|null;
	}
	const enum GVgdeslicDTONames { lic = "lic", nazev_lic = "nazev_lic", ixs_lip = "ixs_lip", nazev_bal_lic = "nazev_bal_lic", radek_lip = "radek_lip", dat_od = "dat_od", ico_fakt_nazev = "ico_fakt_nazev", pol = "pol", polPopis = "polPopis", ppol = "ppol", ppolPopis = "ppolPopis", rezim_lic = "rezim_lic", rezim_lic_txt = "rezim_lic_txt", popis = "popis", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico_fakt = "ico_fakt", ico_adm = "ico_adm", priz_multilicence = "priz_multilicence", priz_spec_cena = "priz_spec_cena", priz_spec_maint = "priz_spec_maint", pocet_skutecny = "pocet_skutecny", duvod = "duvod", c_nakup = "c_nakup", dat_nakup = "dat_nakup", c_maintenance = "c_maintenance", zmenil = "zmenil", error_state = "error_state", stav_kontroly_lic = "stav_kontroly_lic", stav_kontroly_ppol = "stav_kontroly_ppol", posledni_fakturace = "posledni_fakturace", stav_fakturace = "stav_fakturace",}
	const enum GVgdeslicDTOFragments { lic = "*", nazev_lic = "*", ixs_lip = "*", nazev_bal_lic = "*", radek_lip = "*", dat_od = "*", ico_fakt_nazev = "*", pol = "*", polPopis = "*", ppol = "*", ppolPopis = "*", rezim_lic = "*", rezim_lic_txt = "*", popis = "*", dat_do = "*", pocet = "*", dat_zmena = "*", zmenu_prov = "*", ico_fakt = "*", ico_adm = "*", priz_multilicence = "*", priz_spec_cena = "*", priz_spec_maint = "*", pocet_skutecny = "*", duvod = "*", c_nakup = "*", dat_nakup = "*", c_maintenance = "*", zmenil = "*", error_state = "*", stav_kontroly_lic = "*", stav_kontroly_ppol = "*", posledni_fakturace = "*", stav_fakturace = "*",}
	const enum GVgdeslicDTOTypes { lic = "string", nazev_lic = "string", ixs_lip = "string", nazev_bal_lic = "string", radek_lip = "number", dat_od = "JsonDate", ico_fakt_nazev = "string", pol = "string", polPopis = "string", ppol = "string", ppolPopis = "string", rezim_lic = "number", rezim_lic_txt = "string", popis = "string", dat_do = "JsonDate", pocet = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico_fakt = "string", ico_adm = "string", priz_multilicence = "number", priz_spec_cena = "number", priz_spec_maint = "number", pocet_skutecny = "number", duvod = "string", c_nakup = "JsonDecimal", dat_nakup = "JsonDate", c_maintenance = "JsonDecimal", zmenil = "string", error_state = "boolean", stav_kontroly_lic = "string", stav_kontroly_ppol = "string", posledni_fakturace = "JsonDate", stav_fakturace = "string",}
	const enum GVgdeslicDTOTypeLengths { lic = 4, nazev_lic = 50, ixs_lip = 50, nazev_bal_lic = 254, ico_fakt_nazev = 500, pol = 4, polPopis = 254, ppol = 3, ppolPopis = 254, rezim_lic_txt = 254, popis = 254, zmenu_prov = 12, ico_fakt = 10, ico_adm = 10, duvod = 254, zmenil = 100, stav_kontroly_lic = 50, stav_kontroly_ppol = 50, stav_fakturace = 50,}
	/**GKontrolaLicDbDto - DTO pro kontrolu jednotlivých zákaznických licencí*/
	interface GKontrolaLicDbDto {
		/**Příznak existence licence v gdesdbo (Seznam provozních databází všech detekovaných zákazníků GINIS)*/
		gdesdbo_exist?: number|null;
		/**Příznak existence navázané licence řady PID k licenci databáze*/
		pid_exist?: number|null;
		/**Příznak existence zadaneho tyou implementace k navazane licenci rady PID*/
		pid_typ_impl_exist?: number|null;
		/**Příznak existence navázaného baliku licenci na licenci rady PID*/
		ixs_lip_exist?: number|null;
	}
	const enum GKontrolaLicDbDtoNames { gdesdbo_exist = "gdesdbo_exist", pid_exist = "pid_exist", pid_typ_impl_exist = "pid_typ_impl_exist", ixs_lip_exist = "ixs_lip_exist",}
	const enum GKontrolaLicDbDtoFragments { gdesdbo_exist = "*", pid_exist = "*", pid_typ_impl_exist = "*", ixs_lip_exist = "*",}
	const enum GKontrolaLicDbDtoTypes { gdesdbo_exist = "number", pid_exist = "number", pid_typ_impl_exist = "number", ixs_lip_exist = "number",}
	const enum GKontrolaLicDbDtoTypeLengths {}
	/**GLicDbDto*/
	interface GLicDbDto {
		/**DBCOLUMN:gdesdbo.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdesdbo.priz_d*/
		priz_d?: number|null;
		/**DBCOLUMN:gdesdbo.db_guid*/
		db_guid?: string|null;
		/**DBCOLUMN:gdesdbo.priz_vyvoj*/
		priz_vyvoj?: number|null;
	}
	const enum GLicDbDtoNames { lic = "lic", priz_d = "priz_d", db_guid = "db_guid", priz_vyvoj = "priz_vyvoj",}
	const enum GLicDbDtoFragments { lic = "*", priz_d = "*", db_guid = "*", priz_vyvoj = "*",}
	const enum GLicDbDtoTypes { lic = "string", priz_d = "number", db_guid = "string", priz_vyvoj = "number",}
	const enum GLicDbDtoTypeLengths { lic = 4, db_guid = 36,}
	/**GGdevdboDto - Dto pro přehled garantů provozních databází*/
	interface GGdevdboDto {
		/**DBCOLUMN:gdevdbo.lic*/
		lic?: string|null;
		/**Identifikátor uživatele zodpovědného za licenci databaze*/
		ixs_fun?: string|null;
		/**nazev uživatele zodpovědného za licenci databaze*/
		uzivatel?: string|null;
		/**DBCOLUMN:gdevdbo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevdbo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevdbo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil*/
		zmenil?: string|null;
	}
	const enum GGdevdboDtoNames { lic = "lic", ixs_fun = "ixs_fun", uzivatel = "uzivatel", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevdboDtoFragments { lic = "*", ixs_fun = "*", uzivatel = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevdboDtoTypes { lic = "string", ixs_fun = "string", uzivatel = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevdboDtoTypeLengths { lic = 4, ixs_fun = 12, uzivatel = 200, zmenu_prov = 12, zmenil = 100,}
	/**GVgdeslicCompareDto - DTO pro jednotlivé zákaznické licence*/
	interface GVgdeslicCompareDto {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**Název licence databáze*/
		nazev_lic?: string|null;
		/**Název balíku licencí*/
		nazev_bal_lic?: string|null;
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Identifikátor řádku z balíku licencí*/
		radek_lip?: number|null;
		/**Datum počátku platnosti*/
		dat_od?: JsonDate|null;
		/**Název ICA pro fakturaci*/
		ico_fakt_nazev?: string|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Popis licenční položky*/
		polPopis?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Popis licenční podpoložky*/
		ppolPopis?: string|null;
		/**Režim licence (0 = Řádná / 10 = Technologická / 20 = Marketingová / 30 = Saas / 40 = Gordic / 50 = Ultimate / 90 = Návrh)*/
		rezim_lic?: number|null;
		/**Textová hodnota režimu licence*/
		rezim_lic_txt?: string|null;
		/**Popis licence*/
		popis?: string|null;
		/**Datum konce platnosti*/
		dat_do?: JsonDate|null;
		/**Pocet licencí obsazenych v balíku licencí*/
		pocet?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**ICO pro fakturaci*/
		ico_fakt?: string|null;
		/**ICO pro administraci*/
		ico_adm?: string|null;
		/**Příznak multilicence (0 = ne / 1 = ano)*/
		priz_multilicence?: number|null;
		/**Příznak speciální ceny licence (0 = ne / 1 = ano)*/
		priz_spec_cena?: number|null;
		/**Příznak speciální výše maintenance (0 = ne / 1 = ano)*/
		priz_spec_maint?: number|null;
		/**Počet zakoupených licencí*/
		pocet_skutecny?: number|null;
		/**Důvod k přízení licence*/
		duvod?: string|null;
		/**Nákupní cena licence*/
		c_nakup?: JsonDecimal|null;
		/**Datum nákupu licence*/
		dat_nakup?: JsonDate|null;
		/**Cena maintenance*/
		c_maintenance?: JsonDecimal|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Hodnota chybneho stavu - pro zjisteni chybneho data marketingovych licenci*/
		error_state?: boolean|null;
		/**Upozornění na neplatné kombinace licencí*/
		stav_kontroly_lic?: string|null;
		/**Upozornění na neplatnou ppol*/
		stav_kontroly_ppol?: string|null;
		/**Datum posledni_fakturace*/
		posledni_fakturace?: JsonDate|null;
		/**Kontrola fakturace (stavu faktura)*/
		stav_fakturace?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic0?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic1?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic2?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic3?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic4?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic5?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic6?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic7?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic8?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic9?: string|null;
		/**Pomocny objekt pro porovnani obsahu licenci*/
		compareLic10?: string|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic0?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic1?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic2?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic3?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic4?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic5?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic6?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic7?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic8?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic9?: JsonDecimal|null;
		/**Pocet licenci obsazenych v licenci databaze*/
		pocetLic10?: JsonDecimal|null;
	}
	const enum GVgdeslicCompareDtoNames { lic = "lic", nazev_lic = "nazev_lic", nazev_bal_lic = "nazev_bal_lic", ixs_lip = "ixs_lip", radek_lip = "radek_lip", dat_od = "dat_od", ico_fakt_nazev = "ico_fakt_nazev", pol = "pol", polPopis = "polPopis", ppol = "ppol", ppolPopis = "ppolPopis", rezim_lic = "rezim_lic", rezim_lic_txt = "rezim_lic_txt", popis = "popis", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico_fakt = "ico_fakt", ico_adm = "ico_adm", priz_multilicence = "priz_multilicence", priz_spec_cena = "priz_spec_cena", priz_spec_maint = "priz_spec_maint", pocet_skutecny = "pocet_skutecny", duvod = "duvod", c_nakup = "c_nakup", dat_nakup = "dat_nakup", c_maintenance = "c_maintenance", zmenil = "zmenil", error_state = "error_state", stav_kontroly_lic = "stav_kontroly_lic", stav_kontroly_ppol = "stav_kontroly_ppol", posledni_fakturace = "posledni_fakturace", stav_fakturace = "stav_fakturace", compareLic0 = "compareLic0", compareLic1 = "compareLic1", compareLic2 = "compareLic2", compareLic3 = "compareLic3", compareLic4 = "compareLic4", compareLic5 = "compareLic5", compareLic6 = "compareLic6", compareLic7 = "compareLic7", compareLic8 = "compareLic8", compareLic9 = "compareLic9", compareLic10 = "compareLic10", pocetLic0 = "pocetLic0", pocetLic1 = "pocetLic1", pocetLic2 = "pocetLic2", pocetLic3 = "pocetLic3", pocetLic4 = "pocetLic4", pocetLic5 = "pocetLic5", pocetLic6 = "pocetLic6", pocetLic7 = "pocetLic7", pocetLic8 = "pocetLic8", pocetLic9 = "pocetLic9", pocetLic10 = "pocetLic10",}
	const enum GVgdeslicCompareDtoFragments { lic = "*", nazev_lic = "*", nazev_bal_lic = "*", ixs_lip = "*", radek_lip = "*", dat_od = "*", ico_fakt_nazev = "*", pol = "*", polPopis = "*", ppol = "*", ppolPopis = "*", rezim_lic = "*", rezim_lic_txt = "*", popis = "*", dat_do = "*", pocet = "*", dat_zmena = "*", zmenu_prov = "*", ico_fakt = "*", ico_adm = "*", priz_multilicence = "*", priz_spec_cena = "*", priz_spec_maint = "*", pocet_skutecny = "*", duvod = "*", c_nakup = "*", dat_nakup = "*", c_maintenance = "*", zmenil = "*", error_state = "*", stav_kontroly_lic = "*", stav_kontroly_ppol = "*", posledni_fakturace = "*", stav_fakturace = "*", compareLic0 = "*", compareLic1 = "*", compareLic2 = "*", compareLic3 = "*", compareLic4 = "*", compareLic5 = "*", compareLic6 = "*", compareLic7 = "*", compareLic8 = "*", compareLic9 = "*", compareLic10 = "*", pocetLic0 = "*", pocetLic1 = "*", pocetLic2 = "*", pocetLic3 = "*", pocetLic4 = "*", pocetLic5 = "*", pocetLic6 = "*", pocetLic7 = "*", pocetLic8 = "*", pocetLic9 = "*", pocetLic10 = "*",}
	const enum GVgdeslicCompareDtoTypes { lic = "string", nazev_lic = "string", nazev_bal_lic = "string", ixs_lip = "string", radek_lip = "number", dat_od = "JsonDate", ico_fakt_nazev = "string", pol = "string", polPopis = "string", ppol = "string", ppolPopis = "string", rezim_lic = "number", rezim_lic_txt = "string", popis = "string", dat_do = "JsonDate", pocet = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico_fakt = "string", ico_adm = "string", priz_multilicence = "number", priz_spec_cena = "number", priz_spec_maint = "number", pocet_skutecny = "number", duvod = "string", c_nakup = "JsonDecimal", dat_nakup = "JsonDate", c_maintenance = "JsonDecimal", zmenil = "string", error_state = "boolean", stav_kontroly_lic = "string", stav_kontroly_ppol = "string", posledni_fakturace = "JsonDate", stav_fakturace = "string", compareLic0 = "string", compareLic1 = "string", compareLic2 = "string", compareLic3 = "string", compareLic4 = "string", compareLic5 = "string", compareLic6 = "string", compareLic7 = "string", compareLic8 = "string", compareLic9 = "string", compareLic10 = "string", pocetLic0 = "JsonDecimal", pocetLic1 = "JsonDecimal", pocetLic2 = "JsonDecimal", pocetLic3 = "JsonDecimal", pocetLic4 = "JsonDecimal", pocetLic5 = "JsonDecimal", pocetLic6 = "JsonDecimal", pocetLic7 = "JsonDecimal", pocetLic8 = "JsonDecimal", pocetLic9 = "JsonDecimal", pocetLic10 = "JsonDecimal",}
	const enum GVgdeslicCompareDtoTypeLengths { lic = 4, nazev_lic = 50, nazev_bal_lic = 50, ixs_lip = 50, ico_fakt_nazev = 500, pol = 4, polPopis = 254, ppol = 3, ppolPopis = 254, rezim_lic_txt = 254, popis = 254, zmenu_prov = 12, ico_fakt = 10, ico_adm = 10, duvod = 254, zmenil = 100, stav_kontroly_lic = 50, stav_kontroly_ppol = 50, stav_fakturace = 50, compareLic0 = 10, compareLic1 = 10, compareLic2 = 10, compareLic3 = 10, compareLic4 = 10, compareLic5 = 10, compareLic6 = 10, compareLic7 = 10, compareLic8 = 10, compareLic9 = 10, compareLic10 = 10,}
	/**GGdesredDto - Rozdílový přehled změn za databázi*/
	interface GGdesredDto {
		/**DBCOLUMN:gdesred.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdesred.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdecfaz.stav_faze*/
		stav_faze?: number|null;
		/**DBCOLUMN:gdecfaz.stav_faze_txt*/
		stav_faze_txt?: string|null;
		/**DBCOLUMN:gdesred.revize_max*/
		revize_max?: string|null;
		/**DBCOLUMN:gdesred.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**Stav revize distribučního balíku (0 = Doporučená / 10 = Betatest / 20 = Alfatest / 30 = Příprava / 50 = Nedoporučená, k omezenému použití / 90 = Zakázaná)*/
		stav_revize?: number|null;
	}
	const enum GGdesredDtoNames { lic = "lic", faze = "faze", stav_faze = "stav_faze", stav_faze_txt = "stav_faze_txt", revize_max = "revize_max", dat_zmena = "dat_zmena", stav_revize = "stav_revize",}
	const enum GGdesredDtoFragments { lic = "*", faze = "*", stav_faze = "*", stav_faze_txt = "*", revize_max = "*", dat_zmena = "*", stav_revize = "*",}
	const enum GGdesredDtoTypes { lic = "string", faze = "string", stav_faze = "number", stav_faze_txt = "string", revize_max = "string", dat_zmena = "JsonDate", stav_revize = "number",}
	const enum GGdesredDtoTypeLengths { lic = 4, faze = 8, stav_faze = 50, stav_faze_txt = 50, revize_max = 30,}
	/**Možné položky filtru pro seznam ulohy Skupiny databazi*/
	const enum GLicenceDatabaziFilterEnum {
		/**filtr na licenci DB*/
		lic,
		/**filtr na Primarni licence DB - licence fyzicke DB*/
		lic_fyz,
		/**filtr na aktivitu*/
		aktivita,
		/**filtr na Primarni licence DB - nazev licence*/
		nazev,
		/**filtr na Primarni licence DB - zkratka licence*/
		zkratka,
		/**filtr na Primarni licence DB - poznamka k licenci*/
		poznamka,
		/**filtr pro ID baliku licenci*/
		ixs_lip,
		/**filtr pro skupinu DB*/
		ixs_sdb,
		/**filtr na ID Instance databaze*/
		db_guid,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr na data pro provozni DB (tabulka gdesdbo)*/
		table_name,
		/**filtr na verzi databaze*/
		verze_db,
		/**filtr na produkční řadu licencí (0=G0 SQL, 200=G0 WIN, 1000=G1)*/
		prod_rada,
		/**filtr na počátek platnosti*/
		dat_od,
		/**filtr na ceníkovou položku*/
		pol,
		/**filtr na ceníkovou podpoložku*/
		ppol,
		/**filtr na programovou fázi*/
		faze,
		/**filtr na režim licence*/
		rezim_lic,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGLicenceG0.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro Import licencí řady G0
	* @domain CentralAdmin
	* @businessObject GRegistraceG0
	*/
	interface LicenceG0 {
		/**Metoda ImportG0 - Sehrávání dat od aplikací G0 prostřednictvím GDEX databáze*/
		import(rq?:Gordic.Adt.Interface.GRegistraceG0|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GRegistraceG0>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GRegistraceG0>,GServiceSaveResponse<Gordic.Adt.Interface.GRegistraceG0>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LicenceG0: ServiceBase & Catalog.LicenceG0;
	}
	const LicenceG0: Client["LicenceG0"];
}
declare namespace Gordic.Adt.Interface {
	/**GRegistraceG0 - Hlavní datový objekt pro sběr dat G0*/
	interface GRegistraceG0 {
		/**Datový objekt zákaznické databáze (GGdesg0d)*/
		registrace?: Gordic.Adt.Interface.GGdesg0d|null;
	}
	const enum GRegistraceG0Names { registrace = "registrace",}
	const enum GRegistraceG0Fragments { registrace = "*",}
	const enum GRegistraceG0Types { registrace = "Gordic.Adt.Interface.GGdesg0d",}
	const enum GRegistraceG0TypeLengths {}
	/**GGdesG0d - DTO pro sběr údajů z G0 aplikací (databáze)*/
	interface GGdesg0d {
		/**Globální unikátní identifikátor databáze řady G0*/
		db_guid?: string|null;
		/**Příznak azure DB (0 = on-premise (SQL Server), 1 = Azure SQL Database)*/
		priz_azure?: number|null;
		/**Název SQL serveru*/
		servername?: string|null;
		/**Název databáze řady G0*/
		db_name?: string|null;
		/**Datový objekt organizace (GGdesg0o)*/
		organizace?: Gordic.Adt.Interface.GGdesg0o[]|null;
	}
	const enum GGdesg0dNames { db_guid = "db_guid", priz_azure = "priz_azure", servername = "servername", db_name = "db_name", organizace = "organizace",}
	const enum GGdesg0dFragments { db_guid = "*", priz_azure = "*", servername = "*", db_name = "*", organizace = "*",}
	const enum GGdesg0dTypes { db_guid = "string", priz_azure = "number", servername = "string", db_name = "string", organizace = "Gordic.Adt.Interface.GGdesg0o[]",}
	const enum GGdesg0dTypeLengths { db_guid = 36, servername = 100, db_name = 100,}
	/**GGdesG0o - DTO pro sběr údajů z G0 aplikací (organizace)*/
	interface GGdesg0o {
		/**IČO organizace*/
		ico?: string|null;
		/**Název organizace*/
		nazev?: string|null;
		/**Datový objekt s moduly (GGdesg0m)*/
		moduly?: Gordic.Adt.Interface.GGdesg0m[]|null;
	}
	const enum GGdesg0oNames { ico = "ico", nazev = "nazev", moduly = "moduly",}
	const enum GGdesg0oFragments { ico = "*", nazev = "*", moduly = "*",}
	const enum GGdesg0oTypes { ico = "string", nazev = "string", moduly = "Gordic.Adt.Interface.GGdesg0m[]",}
	const enum GGdesg0oTypeLengths { ico = 8, nazev = 254,}
	/**GGdesG0m - DTO pro sběr údajů z G0 aplikací (moduly)*/
	interface GGdesg0m {
		/**Zkratka modulu*/
		modul_zkratka?: string|null;
		/**Položka modulu*/
		pol?: string|null;
		/**Verze modulu (např: 15.01.6)*/
		verze?: string|null;
		/**Licence modulu*/
		lic?: string|null;
		/**ORJ distributora*/
		orj?: string|null;
		/**Datový objekt s podpoložkami (GGdesg0p)*/
		podpolozky?: Gordic.Adt.Interface.GGdesg0p[]|null;
	}
	const enum GGdesg0mNames { modul_zkratka = "modul_zkratka", pol = "pol", verze = "verze", lic = "lic", orj = "orj", podpolozky = "podpolozky",}
	const enum GGdesg0mFragments { modul_zkratka = "*", pol = "*", verze = "*", lic = "*", orj = "*", podpolozky = "*",}
	const enum GGdesg0mTypes { modul_zkratka = "string", pol = "string", verze = "string", lic = "string", orj = "string", podpolozky = "Gordic.Adt.Interface.GGdesg0p[]",}
	const enum GGdesg0mTypeLengths { modul_zkratka = 3, pol = 4, verze = 10, lic = 4, orj = 4,}
	/**GGdesG0p - DTO pro sběr údajů z G0 aplikací (podpoložky)*/
	interface GGdesg0p {
		/**Podpoložka modulu*/
		ppol?: string|null;
		/**Počet podpoložek*/
		pocet?: number|null;
	}
	const enum GGdesg0pNames { ppol = "ppol", pocet = "pocet",}
	const enum GGdesg0pFragments { ppol = "*", pocet = "*",}
	const enum GGdesg0pTypes { ppol = "string", pocet = "number",}
	const enum GGdesg0pTypeLengths { ppol = 3,}
	/**Možné položky filtru pro LicenceG0*/
	const enum GLicenceG0FilterEnum {
		/**filtr na ico organizace*/
		ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGLicenceRadPID.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Registr licenci/Licence rad PID (Řada PID = vazba baliku licenci na databazi)
	* @domain CentralAdmin
	* @businessObject GGdesldbDto
	*/
	interface LicenceRadPID {
		/**Metoda List pro seznam Licence rad PID*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Metoda Read pro detail Licence řady PID (čtení obsahu tabulky gdesldb)*/
		read(rq?:Gordic.Adt.Interface.GGdesldbDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesldbDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesldbDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Založení/Update Licence řady PID*/
		upsert(rq?:Gordic.Adt.Interface.GGdesldbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Metoda List pro seznam Historie Licence rad PID*/
		listHistorieLicenceRadPID(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Metoda List pro Detail ulohy Licence řad PID (poduloha Registru licenci)*/
		listDetailLicenceRadPID(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Metoda List pro seznam Baliky licenci (dostupne ze seznamu Licence rad)*/
		listLicRadPIDBalLic(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevlidDto>>;
		/**Metoda List pro seznam Typ implementace (dostupne ze seznamu Licence rad)*/
		listLicRadPIDTypImp(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevtyiDto>>;
		/**Metoda List pro seznam ICO pro administraci (dostupne ze seznamu Licence rad PID)*/
		listLicRadPIDICOAdm(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevicoDto>>;
		/**Zruseni zaznamu - Licence rad PID (tabulka gdesldb)*/
		deleteLicenceRadPID(rq?:Gordic.Adt.Interface.GGdesldbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>,void>;
		/**Zalozeni / Update zaznamu - Licence rad -> Baliky licenci (tabulka gdevlid)*/
		insertUpdateLicRadPIDBalLic(rq?:Gordic.Adt.Interface.GGdevlidDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>,void>;
		/**Zruseni zaznamu - Licence rad -> Baliky licenci (tabulka gdevlid)*/
		deleteLicRadPIDBalLic(rq?:Gordic.Adt.Interface.GGdevlidDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>,void>;
		/**Zalozeni / Update zaznamu - Licence rad -> Typ implementace (tabulka gdevtyi)*/
		insertUpdateLicRadPIDTypImp(rq?:Gordic.Adt.Interface.GGdevtyiDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevtyiDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevtyiDto>,void>;
		/**Zruseni zaznamu - Licence rad -> Typ implementace (tabulka gdevtyi)*/
		deleteLicRadPIDTypImp(rq?:Gordic.Adt.Interface.GGdevtyiDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevtyiDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevtyiDto>,void>;
		/**Zalozeni / Update zaznamu - Licence rad -> ICO pro administraci (tabulka gdevico)*/
		insertUpdateLicRadPIDICOAdm(rq?:Gordic.Adt.Interface.GGdevicoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevicoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevicoDto>,void>;
		/**Zruseni zaznamu - Licence rad -> ICO pro administraci (tabulka gdevico)*/
		deleteLicRadPIDICOAdm(rq?:Gordic.Adt.Interface.GGdevicoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevicoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevicoDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LicenceRadPID: ServiceBase & Catalog.LicenceRadPID;
	}
	const LicenceRadPID: Client["LicenceRadPID"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdesldbDto - Licence řady PID*/
	interface GGdesldbDto {
		/**Licence řady pro generování identifikátorů (Firmou přidělené ID licence databáze systému GINIS)*/
		lic?: string|null;
		/**ID záznamu pro zobrazení historie změn z auditní tabulky gdesldbhh*/
		iud_por?: number|null;
		/**Datum změny záznamu pro zobrazení historie změn z auditní tabulky gdesldbhh*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění) pro zobrazení historie změn z auditní tabulky gdesldbhh*/
		typ_zmeny?: string|null;
		/**Primární licence databáze*/
		lic_fyz?: string|null;
		/**Název licence řady PID*/
		nazev?: string|null;
		/**Popis licence řady PID*/
		popis?: string|null;
		/**Aktivita licence řady PID*/
		aktivita?: number|null;
		/**Poznámka k licenci řady PID*/
		poznamka?: string|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Datum vzniku licence řady PID*/
		dat_mpd?: JsonDate|null;
		/**Typ databázového stroje (MS/Oracle/Informix)*/
		typ_db?: string|null;
		/**Datum poslední změnya*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Vztah funkce k balíku licencí*/
		typ_vdb?: number|null;
		/**Určení správce skupiny DB (0 = NE / 1 = ANO)*/
		spravce_sk_db?: number|null;
		/**Příznak produkcni rady (0 = Ginis Express G0 SQL / 200 = Ginis Express G0 WIN / 1000 = Ginis G1 / 3000 = Ginis Express G3 / 4000 = CA / 5000 = Cybersec )*/
		prod_rada?: number|null;
		/**Kontrola navázané licence řady PID na IČO pro administraci (0 = NE / 1 = ANO)*/
		ico_adm_exist?: number|null;
	}
	const enum GGdesldbDtoNames { lic = "lic", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", lic_fyz = "lic_fyz", nazev = "nazev", popis = "popis", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_mpd = "dat_mpd", typ_db = "typ_db", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", typ_vdb = "typ_vdb", spravce_sk_db = "spravce_sk_db", prod_rada = "prod_rada", ico_adm_exist = "ico_adm_exist",}
	const enum GGdesldbDtoFragments { lic = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", lic_fyz = "*", nazev = "*", popis = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_mpd = "*", typ_db = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", typ_vdb = "*", spravce_sk_db = "*", prod_rada = "*", ico_adm_exist = "*",}
	const enum GGdesldbDtoTypes { lic = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", lic_fyz = "string", nazev = "string", popis = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_mpd = "JsonDate", typ_db = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", typ_vdb = "number", spravce_sk_db = "number", prod_rada = "number", ico_adm_exist = "number",}
	const enum GGdesldbDtoTypeLengths { lic = 4, typ_zmeny = 1, lic_fyz = 4, nazev = 50, popis = 4000, poznamka = 254, typ_db = 3, zmenu_prov = 12, zmenil = 100,}
	/**GGdevtyiDto - DTO pro Typ implementace*/
	interface GGdevtyiDto {
		/**Identifikátor licence řady PID*/
		lic?: string|null;
		/**Typ implementace vychazejici z ciselniku ginctiy*/
		tyi?: string|null;
		/**Textový popis typu implementace*/
		tyi_txt?: string|null;
		/**Číselná hodnota typu implementace z čísleníku ginctiy*/
		tyi_number?: number|null;
		/**Poznámka k typu implementace*/
		poznamka?: string|null;
		/**Aktivita typu implementace*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevtyiDtoNames { lic = "lic", tyi = "tyi", tyi_txt = "tyi_txt", tyi_number = "tyi_number", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevtyiDtoFragments { lic = "*", tyi = "*", tyi_txt = "*", tyi_number = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevtyiDtoTypes { lic = "string", tyi = "string", tyi_txt = "string", tyi_number = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevtyiDtoTypeLengths { lic = 4, tyi = 1, tyi_txt = 100, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdevicoDto - vazba IČA na IČO pro administraci*/
	interface GGdevicoDto {
		/**Identifikátor IČA pro administraci*/
		ico_adm?: string|null;
		/**Název IČA pro administraci*/
		ico_adm_nazev?: string|null;
		/**Identifikátor licence řady PID*/
		lic?: string|null;
		/**Identifikátor primární licence databáze*/
		lic_fyz?: string|null;
		/**Počátek data platnosti*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti*/
		dat_do?: JsonDate|null;
		/**Poznamka*/
		poznamka?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny záznamu*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdevicoDtoNames { ico_adm = "ico_adm", ico_adm_nazev = "ico_adm_nazev", lic = "lic", lic_fyz = "lic_fyz", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevicoDtoFragments { ico_adm = "*", ico_adm_nazev = "*", lic = "*", lic_fyz = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevicoDtoTypes { ico_adm = "string", ico_adm_nazev = "string", lic = "string", lic_fyz = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevicoDtoTypeLengths { ico_adm = 10, ico_adm_nazev = 254, lic = 4, lic_fyz = 4, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznam ulohy Licence rad PID*/
	const enum GLicenceRadPIDFilterEnum {
		/**filtr na licenci ŘADY pid*/
		lic,
		/**filtr na Primarni licence DB - licence fyzicke DB*/
		lic_fyz,
		/**filtr na Primarni licence DB - nazev licence*/
		nazev,
		/**filtr na aktivitu*/
		aktivita,
		/**filtr na zkratku k primarni licence*/
		zkratka,
		/**filtr na poznamka k primarni licenci*/
		poznamka,
		/**filtr pro ID baliku licenci*/
		ixs_lip,
		/**filtr na ID Instance databaze*/
		db_guid,
		/**filtr na ICO pro administraci*/
		ico_adm,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGLicencniCertifikat.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Licenční certifikát*/
	interface LicencniCertifikat {
		/**Vygenerování nového licenčního certifikátu pro zadanou licenci*/
		make(rq?:Gordic.Adt.Interface.GLicencniCertifikatDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GLicencniCertifikatDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GLicencniCertifikatDto>,GServiceSaveResponse<Gordic.Adt.Interface.GLicencniCertifikatDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LicencniCertifikat: ServiceBase & Catalog.LicencniCertifikat;
	}
	const LicencniCertifikat: Client["LicencniCertifikat"];
}
declare namespace Gordic.Adt.Interface {
	/**Licence GINIS*/
	interface GLicencniCertifikatDto {
		/**licence lokality*/
		lic?: string|null;
		/**identifik. lokality*/
		ixs_lok?: string|null;
		/**první den platnosti*/
		dat_od?: JsonDate|null;
		/**poslední den platnosti*/
		dat_do?: JsonDate|null;
		/**Projekt*/
		projekt?: string|null;
		/**Typ implementace*/
		tyi?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Binární obsah licenčního certifikátu*/
		content?: JsonBlob|null;
		/**Jméno vygenerovaného souboru obsahujícího licenční certifikát*/
		content_file_name?: string|null;
	}
	const enum GLicencniCertifikatDtoNames { lic = "lic", ixs_lok = "ixs_lok", dat_od = "dat_od", dat_do = "dat_do", projekt = "projekt", tyi = "tyi", poznamka = "poznamka", content = "content", content_file_name = "content_file_name",}
	const enum GLicencniCertifikatDtoFragments { lic = "*", ixs_lok = "*", dat_od = "*", dat_do = "*", projekt = "*", tyi = "*", poznamka = "*", content = "*", content_file_name = "*",}
	const enum GLicencniCertifikatDtoTypes { lic = "string", ixs_lok = "string", dat_od = "JsonDate", dat_do = "JsonDate", projekt = "string", tyi = "string", poznamka = "string", content = "JsonBlob", content_file_name = "string",}
	/**Filtr pro sestavení ISL listů*/
	const enum GLicencniCertifikatFilterEnum {
		/**Podle licence*/
		lic,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGPrehledLicenciDB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohu Registr licenci/Přehled licencí databáze (Vydané licence systému GINIS)
	* @domain Distribuce
	* @businessObject GVgdeslokDto
	*/
	interface PrehledLicenciDB {
		/**Metoda List - Přehled licencí databáze (obsah DB pohledu vgdeslok)*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslokDto>>;
		/**Metoda Read pro detail licence databáze (čtení obsahu DB pohledu vgdeslok)*/
		read(rq?:Gordic.Adt.Interface.GVgdeslokDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GVgdeslokDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GVgdeslokDto>,GServiceReadResponse<Gordic.Adt.Interface.GVgdeslokDto>>;
		/**Metoda list seznam licencí*/
		listSeznamLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslicDto>>;
		/**Metoda list - Obdobi osvobozeni (pro detail registru licenci)*/
		listSeznamObdobiOsvobozeni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdbnDto>>;
		/**Metoda list - Obdobi osvobozeni polozky*/
		listSeznamObdobiOsvobozeniPolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslinDto>>;
		/**Metoda list - Fakturace poplatku na jine ICO*/
		listFakturacePoplatkuNaJineICO(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesliiTabDto>>;
		/**Metoda list pro seznam navazanych Dalsich souboru*/
		listDalsiSoubory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesdifDto>>;
		/**Metoda list pro seznam existujicich licencnich certifikatu z tabulky gdevlid (na detailu licence databáze)*/
		listLicencniCertifikaty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.LicCertDto>>;
		/**Read - Prehled licenci databaze (poduloha Registru licenci), To DO: nahradit metodu Read standardním GServiceReadResponse(Dto) Read(GServiceReadRequest(Dto) rq)*/
		readPrehledLicenciDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslokDto>>;
		/**Metoda ReadObdobiOsvobozeni pro detail registru licenci*/
		readObdobiOsvobozeni(rq?:Gordic.Adt.Interface.GGdesdbnDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesdbnDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesdbnDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesdbnDto>>;
		/**Metoda Read pro editaci seznamu licenci*/
		readSeznamLicenci(rq?:Gordic.Adt.Interface.GVgdeslicDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GVgdeslicDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GVgdeslicDto>,GServiceReadResponse<Gordic.Adt.Interface.GVgdeslicDto>>;
		/**Zalozeni zaznamu - Duvod osvobozeni od licencnich poplatku*/
		insertDuvodOsvobozeni(rq?:Gordic.Adt.Interface.GGdesdbnDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdbnDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdbnDto>,void>;
		/**Zalozeni zaznamu - Seznam licenci na detailu registru licenci*/
		insertSeznamLicenci(rq?:Gordic.Adt.Interface.GVgdeslicDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GVgdeslicDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GVgdeslicDto>,void>;
		/**Update zaznamu - Duvod osvobozeni od licencnich poplatku*/
		updateDuvodOsvobozeni(rq?:Gordic.Adt.Interface.GGdesdbnDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdbnDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdbnDto>,void>;
		/**Zruseni zaznamu - Duvod osvobozeni od licencnich poplatku*/
		deleteDuvodOsvobozeni(rq?:Gordic.Adt.Interface.GGdesdbnDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdbnDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesdbnDto>,void>;
		/**Zalozeni zaznamu - Obdobi vyjimky od licencnich poplatku*/
		insertDuvodOsvobozeniPolozky(rq?:Gordic.Adt.Interface.GGdeslinDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslinDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslinDto>,void>;
		/**Zalozeni zaznamu - Fakturace poplatku na jine ICO*/
		insertFakturaceNaJineIco(rq?:Gordic.Adt.Interface.GGdesliiTabDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesliiTabDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesliiTabDto>,void>;
		/**Update zaznamu - Fakturace poplatku na jine ICO*/
		updateFakturaceNaJineIco(rq?:Gordic.Adt.Interface.GGdesliiTabDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesliiTabDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesliiTabDto>,void>;
		/**Update zaznamu - Obdobi vyjimky od licencnich poplatku*/
		updateDuvodOsvobozeniPolozky(rq?:Gordic.Adt.Interface.GGdeslinDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslinDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslinDto>,void>;
		/**Zruseni zaznamu - Obdobi vyjimky od licencnich poplatku*/
		deleteDuvodOsvobozeniPolozky(rq?:Gordic.Adt.Interface.GGdeslinDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslinDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdeslinDto>,void>;
		/**Zruseni zaznamu - Fakturace poplatku na jine ICO*/
		deleteFakturaceNaJineIco(rq?:Gordic.Adt.Interface.GGdesliiTabDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesliiTabDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesliiTabDto>,void>;
		/**Seznam cenikovych polozek pro danou licenci databaze*/
		listSeznamPolozek(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslicDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrehledLicenciDB: ServiceBase & Catalog.PrehledLicenciDB;
	}
	const PrehledLicenciDB: Client["PrehledLicenciDB"];
}
declare namespace Gordic.Adt.Interface {
	/**GVgdeslokDto - Hlavní datový objekt Licence databáze (DB pohled vgdeslok)*/
	interface GVgdeslokDto {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**identifikátor lokality pro MPD (MPD = modul pro aplikační replikace dat)*/
		ixs_lok?: string|null;
		/**Aktivita licence databáze*/
		aktivita?: number|null;
		/**Poznámka k licenci databáze*/
		poznamka?: string|null;
		/**Počátek data platnosti Licence databáze*/
		dat_od?: JsonDate|null;
		/**Konec platnosti licence databáze*/
		dat_do?: JsonDate|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název licence databáze*/
		nazev?: string|null;
		/**Režim licence (0 = Řádná / 10 = Technologická / 20 = Marketingová / 30 = Saas / 40 = Gordic / 50 = Ultimate / 90 = Návrh)*/
		rezim?: number|null;
		/**Kontaktní email*/
		mail?: string|null;
		/**ICO zákazníka*/
		ico?: string|null;
		/**Projekt vztahující se k licenci databáze*/
		projekt?: string|null;
		/**Typ implementace, výběr z ginctiy*/
		tyi?: string|null;
		/**Typ implementace textově*/
		tyi_txt?: string|null;
		/**výběr z ginctiy - cislo*/
		tyi_number?: number|null;
		/**Typ databáze (MSS/ORA/INF)*/
		typ_db?: string|null;
		/**Zákazník*/
		zak?: string|null;
		/**Kultura textu, podle číselníku ginscfd*/
		kultura?: number|null;
		/**Datum vzniku databáze*/
		dat_mpd?: JsonDate|null;
		/**ICO pro fakturaci*/
		ico_fakt?: string|null;
		/**Licence databáze*/
		lic_db?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Vztah funkce k licenci databáze (0 = správce / 10 = aktivní přístup / 20 = pouze prohlížení)*/
		typ_vdb?: number|null;
		/**Příznak více vybraných řádků (pro hromadné úpravy)*/
		checkedRows?: boolean|null;
	}
	const enum GVgdeslokDtoNames { lic = "lic", ixs_lok = "ixs_lok", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", rezim = "rezim", mail = "mail", ico = "ico", projekt = "projekt", tyi = "tyi", tyi_txt = "tyi_txt", tyi_number = "tyi_number", typ_db = "typ_db", zak = "zak", kultura = "kultura", dat_mpd = "dat_mpd", ico_fakt = "ico_fakt", lic_db = "lic_db", zmenil = "zmenil", typ_vdb = "typ_vdb", checkedRows = "checkedRows",}
	const enum GVgdeslokDtoFragments { lic = "*", ixs_lok = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", rezim = "*", mail = "*", ico = "*", projekt = "*", tyi = "*", tyi_txt = "*", tyi_number = "*", typ_db = "*", zak = "*", kultura = "*", dat_mpd = "*", ico_fakt = "*", lic_db = "*", zmenil = "*", typ_vdb = "*", checkedRows = "*",}
	const enum GVgdeslokDtoTypes { lic = "string", ixs_lok = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", rezim = "number", mail = "string", ico = "string", projekt = "string", tyi = "string", tyi_txt = "string", tyi_number = "number", typ_db = "string", zak = "string", kultura = "number", dat_mpd = "JsonDate", ico_fakt = "string", lic_db = "string", zmenil = "string", typ_vdb = "number", checkedRows = "boolean",}
	const enum GVgdeslokDtoTypeLengths { lic = 4, ixs_lok = 12, poznamka = 254, zmenu_prov = 12, nazev = 50, mail = 254, ico = 10, projekt = 254, tyi = 1, tyi_txt = 100, typ_db = 3, zak = 4, ico_fakt = 10, lic_db = 4, zmenil = 100,}
	/**GVgdeslicDto - DTO pro jednotlivé zákaznické licence*/
	interface GVgdeslicDto {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**Název licence databáze*/
		nazev_lic?: string|null;
		/**Název balíku licencí*/
		nazev_bal_lic?: string|null;
		/**Identifikátor balíku licencí*/
		ixs_lip?: string|null;
		/**Identifikátor řádku z balíku licencí*/
		radek_lip?: number|null;
		/**Datum počátku platnosti*/
		dat_od?: JsonDate|null;
		/**Název ICA pro fakturaci*/
		ico_fakt_nazev?: string|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Popis licenční položky*/
		polPopis?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Popis licenční podpoložky*/
		ppolPopis?: string|null;
		/**Režim licence (0 = Řádná / 10 = Technologická / 20 = Marketingová / 30 = Saas / 40 = Gordic / 50 = Ultimate / 90 = Návrh)*/
		rezim_lic?: number|null;
		/**Textová hodnota režimu licence*/
		rezim_lic_txt?: string|null;
		/**Popis licence*/
		popis?: string|null;
		/**Datum konce platnosti*/
		dat_do?: JsonDate|null;
		/**Pocet licencí obsazenych v balíku licencí*/
		pocet?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**ICO pro fakturaci*/
		ico_fakt?: string|null;
		/**ICO pro administraci*/
		ico_adm?: string|null;
		/**Příznak multilicence (0 = ne / 1 = ano)*/
		priz_multilicence?: number|null;
		/**Příznak speciální ceny licence (0 = ne / 1 = ano)*/
		priz_spec_cena?: number|null;
		/**Příznak speciální výše maintenance (0 = ne / 1 = ano)*/
		priz_spec_maint?: number|null;
		/**Počet zakoupených licencí*/
		pocet_skutecny?: number|null;
		/**Důvod k přízení licence*/
		duvod?: string|null;
		/**Nákupní cena licence*/
		c_nakup?: JsonDecimal|null;
		/**Datum nákupu licence*/
		dat_nakup?: JsonDate|null;
		/**Cena maintenance*/
		c_maintenance?: JsonDecimal|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Hodnota chybneho stavu - pro zjisteni chybneho data marketingovych licenci*/
		error_state?: boolean|null;
		/**Upozornění na neplatné kombinace licencí*/
		stav_kontroly_lic?: string|null;
		/**Upozornění na neplatnou ppol*/
		stav_kontroly_ppol?: string|null;
		/**Datum posledni_fakturace*/
		posledni_fakturace?: JsonDate|null;
		/**Kontrola fakturace (stavu faktura)*/
		stav_fakturace?: string|null;
		/**Vlastni balik (1 = Ano / 0 = Ne)*/
		vlastni_balik?: number|null;
	}
	const enum GVgdeslicDtoNames { lic = "lic", nazev_lic = "nazev_lic", nazev_bal_lic = "nazev_bal_lic", ixs_lip = "ixs_lip", radek_lip = "radek_lip", dat_od = "dat_od", ico_fakt_nazev = "ico_fakt_nazev", pol = "pol", polPopis = "polPopis", ppol = "ppol", ppolPopis = "ppolPopis", rezim_lic = "rezim_lic", rezim_lic_txt = "rezim_lic_txt", popis = "popis", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico_fakt = "ico_fakt", ico_adm = "ico_adm", priz_multilicence = "priz_multilicence", priz_spec_cena = "priz_spec_cena", priz_spec_maint = "priz_spec_maint", pocet_skutecny = "pocet_skutecny", duvod = "duvod", c_nakup = "c_nakup", dat_nakup = "dat_nakup", c_maintenance = "c_maintenance", zmenil = "zmenil", error_state = "error_state", stav_kontroly_lic = "stav_kontroly_lic", stav_kontroly_ppol = "stav_kontroly_ppol", posledni_fakturace = "posledni_fakturace", stav_fakturace = "stav_fakturace", vlastni_balik = "vlastni_balik",}
	const enum GVgdeslicDtoFragments { lic = "*", nazev_lic = "*", nazev_bal_lic = "*", ixs_lip = "*", radek_lip = "*", dat_od = "*", ico_fakt_nazev = "*", pol = "*", polPopis = "*", ppol = "*", ppolPopis = "*", rezim_lic = "*", rezim_lic_txt = "*", popis = "*", dat_do = "*", pocet = "*", dat_zmena = "*", zmenu_prov = "*", ico_fakt = "*", ico_adm = "*", priz_multilicence = "*", priz_spec_cena = "*", priz_spec_maint = "*", pocet_skutecny = "*", duvod = "*", c_nakup = "*", dat_nakup = "*", c_maintenance = "*", zmenil = "*", error_state = "*", stav_kontroly_lic = "*", stav_kontroly_ppol = "*", posledni_fakturace = "*", stav_fakturace = "*", vlastni_balik = "*",}
	const enum GVgdeslicDtoTypes { lic = "string", nazev_lic = "string", nazev_bal_lic = "string", ixs_lip = "string", radek_lip = "number", dat_od = "JsonDate", ico_fakt_nazev = "string", pol = "string", polPopis = "string", ppol = "string", ppolPopis = "string", rezim_lic = "number", rezim_lic_txt = "string", popis = "string", dat_do = "JsonDate", pocet = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico_fakt = "string", ico_adm = "string", priz_multilicence = "number", priz_spec_cena = "number", priz_spec_maint = "number", pocet_skutecny = "number", duvod = "string", c_nakup = "JsonDecimal", dat_nakup = "JsonDate", c_maintenance = "JsonDecimal", zmenil = "string", error_state = "boolean", stav_kontroly_lic = "string", stav_kontroly_ppol = "string", posledni_fakturace = "JsonDate", stav_fakturace = "string", vlastni_balik = "number",}
	const enum GVgdeslicDtoTypeLengths { lic = 4, nazev_lic = 50, nazev_bal_lic = 50, ixs_lip = 50, ico_fakt_nazev = 500, pol = 4, polPopis = 254, ppol = 3, ppolPopis = 254, rezim_lic_txt = 254, popis = 254, zmenu_prov = 12, ico_fakt = 10, ico_adm = 10, duvod = 254, zmenil = 100, stav_kontroly_lic = 50, stav_kontroly_ppol = 50, stav_fakturace = 50,}
	/**GGdesdbnDto - DTO pro Období osvobození od licenčních poplatků*/
	interface GGdesdbnDto {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**Datum počátku období osvobození od lic. poplatků*/
		dat_od?: JsonDate|null;
		/**Datum konce osvobození od lic. poplatků*/
		dat_do?: JsonDate|null;
		/**Popis důvodu osvobození od lic. poplatků*/
		popis?: string|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesdbnDtoNames { lic = "lic", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesdbnDtoFragments { lic = "*", dat_od = "*", dat_do = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesdbnDtoTypes { lic = "string", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesdbnDtoTypeLengths { lic = 4, popis = 254, zmenu_prov = 12, zmenil = 100,}
	/**GgdeslinDto - DTO pro Období výjimky z placení licenčních poplatků*/
	interface GGdeslinDto {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Počátek období platnosti výjimky*/
		dat_od?: JsonDate|null;
		/**Konec období platnosti výjimky*/
		dat_do?: JsonDate|null;
		/**Popis důvodu k výjimce*/
		popis?: string|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdeslinDtoNames { lic = "lic", pol = "pol", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdeslinDtoFragments { lic = "*", pol = "*", dat_od = "*", dat_do = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdeslinDtoTypes { lic = "string", pol = "string", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdeslinDtoTypeLengths { lic = 4, pol = 4, popis = 254, zmenu_prov = 12, zmenil = 100,}
	/**GgdesliiDto - DTO pro Fakturaci licenčních poplatků na jiné IČO*/
	interface GGdesliiTabDto {
		/**Identifikátor licence databáze*/
		lic?: string|null;
		/**Licenční položka*/
		pol?: string|null;
		/**Licenční podpoložka*/
		ppol?: string|null;
		/**Počátek období platnosti fakturace na jiné IČO*/
		dat_od?: JsonDate|null;
		/**Konec období platnosti fakturace na jiné IČO*/
		dat_do?: JsonDate|null;
		/**IČO na které probíhá fakturace*/
		ico_fakt?: string|null;
		/**Název IČA pro fakturaci*/
		ico_fakt_nazev?: string|null;
		/**Popis k období platnosti fakturace na jiné IČO*/
		popis?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesliiTabDtoNames { lic = "lic", pol = "pol", ppol = "ppol", dat_od = "dat_od", dat_do = "dat_do", ico_fakt = "ico_fakt", ico_fakt_nazev = "ico_fakt_nazev", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesliiTabDtoFragments { lic = "*", pol = "*", ppol = "*", dat_od = "*", dat_do = "*", ico_fakt = "*", ico_fakt_nazev = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesliiTabDtoTypes { lic = "string", pol = "string", ppol = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico_fakt = "string", ico_fakt_nazev = "string", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesliiTabDtoTypeLengths { lic = 4, pol = 4, ppol = 3, ico_fakt = 10, ico_fakt_nazev = 254, popis = 254, zmenu_prov = 12, zmenil = 100,}
	/**LicCertDto - DTO pro Licenční certifikáty dané licence databáze*/
	interface LicCertDto {
		/**Identifikátor licenčního certifikátu*/
		ixp?: string|null;
		/**Identifikátor Balíku licencí*/
		ixs_lip?: string|null;
		/**Verze lic. certifikátu*/
		verze_lip?: number|null;
		/**Binární obsah licenčního certifikátu*/
		obsah?: JsonBlob|null;
		/**Identifikátor tiskové sestavy*/
		ixs_frm?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Název balíku licencí*/
		nazevBalLic?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Počátek data platnosti certifikátu*/
		dat_od?: JsonDate|null;
		/**Konec data platnosti certifikátu*/
		dat_do?: JsonDate|null;
		/**Počet vygenerovaných licenčních certifikátů*/
		pocet?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum LicCertDtoNames { ixp = "ixp", ixs_lip = "ixs_lip", verze_lip = "verze_lip", obsah = "obsah", ixs_frm = "ixs_frm", poznamka = "poznamka", aktivita = "aktivita", nazevBalLic = "nazevBalLic", lic = "lic", dat_od = "dat_od", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum LicCertDtoFragments { ixp = "*", ixs_lip = "*", verze_lip = "*", obsah = "*", ixs_frm = "*", poznamka = "*", aktivita = "*", nazevBalLic = "*", lic = "*", dat_od = "*", dat_do = "*", pocet = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum LicCertDtoTypes { ixp = "string", ixs_lip = "string", verze_lip = "number", obsah = "JsonBlob", ixs_frm = "string", poznamka = "string", aktivita = "number", nazevBalLic = "string", lic = "string", dat_od = "JsonDate", dat_do = "JsonDate", pocet = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum LicCertDtoTypeLengths { ixp = 12, ixs_lip = 12, ixs_frm = 12, poznamka = 254, nazevBalLic = 12, lic = 4, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro úlohu Přehled licencí databáze*/
	const enum GPrehledLicenciDBFilterEnum {
		/**filtr pro licenci databaze*/
		lic,
		/**filtr na aktivitu licence databáze*/
		aktivita,
		/**filtr pro název licence databáze*/
		nazev,
		/**filtr pro projekt*/
		projekt,
		/**filtr pro poznamku*/
		poznamka,
		/**filtr pro ICO (fakturace / administrace)*/
		ico,
		/**filtr na uživatele dle identifikátoru funkčního místa (ixs_fun)*/
		ixsFun,
		/**filtr pro DB paramter adt_user_licenc (Oprávnění přistupovat k registru licencí)*/
		userParam,
	}
	/**filtr pro seznam licenci*/
	const enum GSeznamLicenciFilterEnum {
		/**filtr pro licenci databaze*/
		lic,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr na datum platnosti*/
		dat_od,
		/**filtr na ceníkovou položku*/
		pol,
		/**filtr na ceníkovou podpoložku*/
		ppol,
		/**filtr na režim licence*/
		rezim_lic,
		/**filtr na vlastníka balíku*/
		vlastni_balik,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGPrehledProduktu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na registr licencí - Prehled produktu*/
	interface PrehledProduktu {
		/**Update zaznamu - Marketingova licence*/
		updateMarketingovaLicence(rq?:Gordic.Adt.Interface.GVgdeslicDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GVgdeslicDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GVgdeslicDto>,void>;
		/**Zruseni zaznamu - Licence (Obsah balíku licencí - tabulka gdedlip)*/
		deleteProdukty(rq?:CallParams<{vyberProduktu:Gordic.Adt.Interface.GVgdeslicDto[]}>): _Task<{vyberProduktu:Gordic.Adt.Interface.GVgdeslicDto[]},void>;
		/**Hromadny update vice radku z obsahu baliku licenci (Produktu)*/
		updateVyberProduktu(rq?:CallParams<{rq_obsahBalLic:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,vyberProduktu:Gordic.Adt.Interface.GVgdeslicDto[]}>): _Task<{rq_obsahBalLic:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,vyberProduktu:Gordic.Adt.Interface.GVgdeslicDto[]},GServiceSaveResponse<Gordic.Adt.Interface.GGdedlipDto>>;
		/**Hromadny update vice radku z obsahu baliku licenci (Produktu)*/
		updateProdukt(rq?:CallParams<{rq_obsahBalLic:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,Produkt:Gordic.Adt.Interface.GVgdeslicDto}>): _Task<{rq_obsahBalLic:GServiceSaveRequest<Gordic.Adt.Interface.GGdedlipDto>,Produkt:Gordic.Adt.Interface.GVgdeslicDto},boolean>;
		/**Metoda List pro seznam Prehled produktu*/
		listPrehledProduktu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslicDto>>;
		/**Metoda List pro seznam Koncicich licenci*/
		listKonciciLicence(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GVgdeslicDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrehledProduktu: ServiceBase & Catalog.PrehledProduktu;
	}
	const PrehledProduktu: Client["PrehledProduktu"];
}
declare namespace Gordic.Adt.Interface {
	/**Možné položky filtru pro registr licencí - prehled produktu*/
	const enum GPrehledProduktuFilterEnum {
		/**filtr pro licenci databaze*/
		lic,
		/**filtr na cenikovou polozku*/
		pol,
		/**filtr na cenikovou podpolozku*/
		ppol,
		/**filtr na rezim licence*/
		rezim_lic,
		/**filtr pro pocatek platnosti*/
		dat_od,
		/**filtr pro konec platnosti*/
		dat_do,
		/**filtr pro popis*/
		popis,
		/**filtr pro poznamku*/
		poznamka,
		/**filtr pro ICO fakturace*/
		ico_fakt,
		/**filtr pro datum zmeny*/
		dat_zmena,
		/**filtr na autora zmeny*/
		zmenil,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr platnost k zadanemu datu*/
		dat_platnost,
		/**filtr na pocatek zmeny*/
		zmena_od,
		/**filtr na konec zmeny*/
		zmena_do,
		/**filtr na autora zmeny*/
		zmenu_prov,
		/**filtr na uvedený důvod prodeje Marketingové / Technologické licence*/
		duvod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGPrimarniLicenceDB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na Primarni licence databazi*/
	interface PrimarniLicenceDB {
		/**Insert / Update v detailu zaznamu Primarni licence*/
		insertUpdatePrimarniLicence(rq?:Gordic.Adt.Interface.GGdespdbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdespdbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdespdbDto>,void>;
		/**Zalozeni / Update zaznamu - Licence rad (tabulka gdesldb)*/
		insertUpdateLicenceRadPID(rq?:Gordic.Adt.Interface.GGdesldbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>,void>;
		/**Zruseni zaznamu - Licence rad (tabulka gdesldb)*/
		deleteLicenceRadPID(rq?:Gordic.Adt.Interface.GGdesldbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesldbDto>,void>;
		/**Zalozeni / Update zaznamu - Licence rad -> Baliky licenci (tabulka gdevlid)*/
		insertUpdateLicRadPIDBalLic(rq?:Gordic.Adt.Interface.GGdevlidDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>,void>;
		/**Zruseni zaznamu - Licence rad -> Baliky licenci (tabulka gdevlid)*/
		deleteLicRadPIDBalLic(rq?:Gordic.Adt.Interface.GGdevlidDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevlidDto>,void>;
		/**Zalozeni / Update zaznamu - Povolene verze databaze (tabulka gdevved)*/
		insertUpdatePovoleneVerzeDatabaze(rq?:Gordic.Adt.Interface.GGdevvedDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvedDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvedDto>,void>;
		/**Zruseni zaznamu - Povolene verze databaze (tabulka gdevved)*/
		deletePovoleneVerzeDatabaze(rq?:Gordic.Adt.Interface.GGdevvedDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvedDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvedDto>,void>;
		/**Metoda List pro seznam ulohy Primarni licence databazi (poduloha Registru licenci)*/
		listPrimarniLicenceDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdespdbDto>>;
		/**Metoda List pro seznam Historie Primarnich licenci*/
		listHistoriePrimLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdespdbDto>>;
		/**Metoda List pro Detail ulohy Primarni licence databazi (poduloha Registru licenci)*/
		listDetailPrimarniLicenceDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdespdbDto>>;
		/**Metoda Read pro detail Primarni licence DB*/
		readPrimarniLicenceDB(rq?:Gordic.Adt.Interface.GGdespdbDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdespdbDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdespdbDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdespdbDto>>;
		/**Metoda List pro seznam Skupiny databazi*/
		listLicenceRadPID(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Metoda List pro Detail ulohy Licence řad PID (poduloha Registru licenci)*/
		listDetailLicenceRadPID(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesldbDto>>;
		/**Metoda List pro seznam Baliky licenci (dostupne ze seznamu Licence rad)*/
		listLicRadPIDBalLic(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevlidDto>>;
		/**Metoda list seznam Povolene verze databaze (pro detail ulohy Primarni licence v registru licenci)*/
		listPovoleneVerzeDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevvedDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrimarniLicenceDB: ServiceBase & Catalog.PrimarniLicenceDB;
	}
	const PrimarniLicenceDB: Client["PrimarniLicenceDB"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdespdb*/
	interface GGdespdbDto {
		/**DBCOLUMN:gdespdb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdespdbhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdespdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdecsdf.typ_vdb*/
		typ_vdb?: number|null;
		/**DBCOLUMN:gdespdb.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdespdb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdespdb.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdespdb.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdespdb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu primarni licene databazi*/
		zmenil?: string|null;
		/**DBCOLUMN:gdespdb.rezim_aktual*/
		rezim_aktual?: number|null;
		/**DBCOLUMN:gdespdb.rezim_aktual_gdz*/
		rezim_aktual_gdz?: number|null;
	}
	const enum GGdespdbDtoNames { lic_fyz = "lic_fyz", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", nazev = "nazev", typ_vdb = "typ_vdb", popis = "popis", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_mpd = "dat_mpd", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", rezim_aktual = "rezim_aktual", rezim_aktual_gdz = "rezim_aktual_gdz",}
	const enum GGdespdbDtoFragments { lic_fyz = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", nazev = "*", typ_vdb = "*", popis = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_mpd = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", rezim_aktual = "*", rezim_aktual_gdz = "*",}
	const enum GGdespdbDtoTypes { lic_fyz = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", nazev = "string", typ_vdb = "number", popis = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_mpd = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", rezim_aktual = "number", rezim_aktual_gdz = "number",}
	const enum GGdespdbDtoTypeLengths { lic_fyz = 4, typ_zmeny = 1, nazev = 50, popis = 4000, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevlid*/
	interface GGdevlidDto {
		/**DBCOLUMN:gdevlidhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdevlid.ixs_lip*/
		ixs_lip?: string|null;
		/**název balíku licencí*/
		nazevBalLic?: string|null;
		/**DBCOLUMN:gdevlid.lic*/
		lic?: string|null;
		/**Identifikátor povolení pole licence*/
		lic_enabled?: boolean|null;
		/**DBCOLUMN:gdevlid.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdevlid.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdevlid.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdevlid.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:gdevlid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevlid.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevlid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevlid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect sloupce Zmenil*/
		zmenil?: string|null;
		/**DBCOLUMN:gdeslip.nazev*/
		nazev?: string|null;
	}
	const enum GGdevlidDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ixs_lip = "ixs_lip", nazevBalLic = "nazevBalLic", lic = "lic", lic_enabled = "lic_enabled", lic_fyz = "lic_fyz", dat_od = "dat_od", dat_do = "dat_do", pocet = "pocet", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", nazev = "nazev",}
	const enum GGdevlidDtoFragments { iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ixs_lip = "*", nazevBalLic = "*", lic = "*", lic_enabled = "*", lic_fyz = "*", dat_od = "*", dat_do = "*", pocet = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", nazev = "*",}
	const enum GGdevlidDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ixs_lip = "string", nazevBalLic = "string", lic = "string", lic_enabled = "boolean", lic_fyz = "string", dat_od = "JsonDate", dat_do = "JsonDate", pocet = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", nazev = "string",}
	const enum GGdevlidDtoTypeLengths { typ_zmeny = 1, ixs_lip = 12, nazevBalLic = 12, lic = 4, lic_fyz = 4, poznamka = 254, zmenu_prov = 12, zmenil = 100, nazev = 100,}
	/**DBTABLE:gdevved*/
	interface GGdevvedDto {
		/**DBCOLUMN:gdevved.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdevved.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdevved.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevved.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevved.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevved.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Povolene verze databaze*/
		zmenil?: string|null;
	}
	const enum GGdevvedDtoNames { lic_fyz = "lic_fyz", verze_db = "verze_db", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevvedDtoFragments { lic_fyz = "*", verze_db = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevvedDtoTypes { lic_fyz = "string", verze_db = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevvedDtoTypeLengths { lic_fyz = 4, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznam ulohy Skupiny databazi*/
	const enum GPrimarniLicenceDBFilterEnum {
		/**filtr na licenci DB*/
		lic,
		/**filtr na Primarni licence DB - licence fyzicke DB*/
		lic_fyz,
		/**filtr na aktivitu*/
		aktivita,
		/**filtr na Primarni licence DB - nazev licence*/
		nazev,
		/**filtr na Primarni licence DB - zkratka licence*/
		zkratka,
		/**filtr na Primarni licence DB - poznamka k licenci*/
		poznamka,
		/**filtr pro ID baliku licenci*/
		ixs_lip,
		/**filtr pro skupinu DB*/
		ixs_sdb,
		/**filtr na ID Instance databaze*/
		db_guid,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGSkupinyDatabazi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na skupiny databazi*/
	interface SkupinyDatabazi {
		/**Insert / Update v detailu zaznamu skupiny databazi*/
		insertUpdateSkupinyDatabazi(rq?:Gordic.Adt.Interface.GGdessdbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdessdbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdessdbDto>,void>;
		/**Zalozeni / Update zaznamu - Pristupova prava (tabulka gdevsdf)*/
		insertUpdatePristupovaPrava(rq?:Gordic.Adt.Interface.GGdevsdfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsdfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsdfDto>,void>;
		/**Upsert vyjmenovanych produkcnich fazi (tabulka gdevvpf)*/
		upsertVyjmenovaneProdukcniFaze(rq?:Gordic.Adt.Interface.GGdevvpfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvpfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvpfDto>,void>;
		/**Zruseni zaznamu - vyjmenovane produkcni faze (tabulka gdevvpf)*/
		deleteVyjmenovaneProdukcniFaze(rq?:Gordic.Adt.Interface.GGdevvpfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvpfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvpfDto>,void>;
		/**Zruseni zaznamu - Pristupova prava (tabulka gdevsdf)*/
		deletePristupovaPrava(rq?:Gordic.Adt.Interface.GGdevsdfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsdfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevsdfDto>,void>;
		/**Zalozeni / Update zaznamu - Primarni licence databazi (tabulka gdevpdb)*/
		insertUpdatePrimarniLicenceDatabazi(rq?:Gordic.Adt.Interface.GGdevpdbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevpdbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevpdbDto>,void>;
		/**Zruseni zaznamu - Primarni licence databazi (tabulka gdevpdb)*/
		deletePrimarniLicenceDatabazi(rq?:Gordic.Adt.Interface.GGdevpdbDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevpdbDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevpdbDto>,void>;
		/**Zalozeni / Update zaznamu - Vyjmenovane revize (tabulka gdevakr)*/
		insertUpdateVyjmenovaneRevize(rq?:Gordic.Adt.Interface.GGdevakrDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakrDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakrDto>,void>;
		/**Zruseni zaznamu - Vyjmenovane revize (tabulka gdevakr)*/
		deleteVyjmenovaneRevize(rq?:Gordic.Adt.Interface.GGdevakrDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakrDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakrDto>,void>;
		/**Zalozeni / Update zaznamu - Vyjmenovane GDZ baliky (tabulka gdevakd)*/
		insertUpdateVyjmenovaneGDZBaliky(rq?:Gordic.Adt.Interface.GGdevakdDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakdDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakdDto>,void>;
		/**Zruseni zaznamu - Vyjmenovane GDZ baliky (tabulka gdevakd)*/
		deleteVyjmenovaneGDZBaliky(rq?:Gordic.Adt.Interface.GGdevakdDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakdDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevakdDto>,void>;
		/**Zalozeni / Update zaznamu - Povolene verze databaze (tabulka gdevves)*/
		insertUpdatePovoleneVerzeDatabaze(rq?:Gordic.Adt.Interface.GGdevvesDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvesDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvesDto>,void>;
		/**Zruseni zaznamu - Povolene verze databaze (tabulka gdevves)*/
		deletePovoleneVerzeDatabaze(rq?:Gordic.Adt.Interface.GGdevvesDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvesDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevvesDto>,void>;
		/**Metoda List pro seznam ulohy Skupiny databazi (poduloha Registru licenci)*/
		listSkupinyDatabazi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdessdbDto>>;
		/**Metoda List pro seznam Historie Skupiny databazi*/
		listHistorieSkupinyDatabazi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdessdbDto>>;
		/**Metoda List pro detail ulohy Skupiny databazi (poduloha Registru licenci)*/
		listDetailSkupinyDatabazi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdessdbDto>>;
		/**Metoda Read pro detail skupiny databazi*/
		readSkupinyDatabazi(rq?:Gordic.Adt.Interface.GGdessdbDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdessdbDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdessdbDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdessdbDto>>;
		/**Metoda list seznam Pristupova prava (pro detail ulohy Skupiny databaze v registru licenci)*/
		listPristupovaPrava(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevsdfDto>>;
		/**Metoda list seznam Primarni licence databaze (pro detail ulohy Skupiny databaze v registru licenci)*/
		listPrimarniLicenceDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevpdbDto>>;
		/**Metoda List pro seznam Historie navazanych Primarnich licenci databazi*/
		listHistPrimarniLicenceDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevpdbDto>>;
		/**Metoda list pro vyjmenovane revize (pro detail ulohy Skupiny databaze v registru licenci)*/
		listVyjmenovaneRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevakrDto>>;
		/**Metoda List pro seznam Historie Vyjmenovanych revizi*/
		listHistVyjmenovaneRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevakrDto>>;
		/**Metoda list pro seznam Vyjmenovane GDZ baliky (pro detail ulohy Skupiny databaze v registru licenci)*/
		listVyjmenovaneGDZBaliky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevakdDto>>;
		/**Metoda list pro seznam skupiny DB pro vyjmenovane GDZ baliky (pro detail GDZ baliku)*/
		listSkupinyDatabazeGDZBaliky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevakdDto>>;
		/**Metoda List pro seznam Historie Vyjmenovanych GDZ baliku*/
		listHistVyjmenovaneGDZBaliky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevakdDto>>;
		/**Metoda list seznam Povolene verze databaze (pro detail ulohy Skupiny databaze v registru licenci)*/
		listPovoleneVerzeDatabaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevvesDto>>;
		/**Metoda list pro ulohu Pristupova prava v Registru licenci*/
		listPristupovaPravaSkupinyDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevsdfDto>>;
		/**Metoda List pro seznam Historie Pristupovych prav ke skupine DB*/
		listHistPristupovaPravaSkupinyDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevsdfDto>>;
		/**Metoda List pro seznam Dalsich souboru pro skupinu DB*/
		listDalsiSoubory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevaksDto>>;
		/**Metoda List pro seznam Vyjmenovaných produkčních fází (T40443)*/
		listVyjmenovaneProdukcniFaze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevvpfDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SkupinyDatabazi: ServiceBase & Catalog.SkupinyDatabazi;
	}
	const SkupinyDatabazi: Client["SkupinyDatabazi"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdessdb*/
	interface GGdessdbDto {
		/**DBCOLUMN:gdessdb.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdessdbhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdessdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdecsdf.typ_vdb*/
		typ_vdb?: number|null;
		/**DBCOLUMN:gdessdb.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:gdessdb.typ_sdb*/
		typ_sdb?: number|null;
		/**DBCOLUMN:gdessdb.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdessdb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdessdb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdessdb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Skupiny databazi*/
		zmenil?: string|null;
		/**DBCOLUMN:gdessdb.rezim_aktual*/
		rezim_aktual?: number|null;
		/**DBCOLUMN:gdessdb.rezim_aktual*/
		rezim_aktual_txt?: string|null;
		/**DBCOLUMN:gdessdb.rezim_aktual_gdz*/
		rezim_aktual_gdz?: number|null;
		/**DBCOLUMN:gdessdb.rezim_aktual_gdz*/
		rezim_aktual_gdz_txt?: string|null;
		/**DBCOLUMN:gdessdb.priz_akut_gdz*/
		priz_akut_gdz?: number|null;
		/**ixsFun*/
		ixsFun?: string|null;
		/**Příznak produkcni rady (0 = Ginis Express G0 SQL / 200 = Ginis Express G0 WIN / 1000 = Ginis G1 / 3000 = Ginis Express G3 / 4000 = CA / 5000 = Cybersec )*/
		prod_rada?: number|null;
	}
	const enum GGdessdbDtoNames { ixs_sdb = "ixs_sdb", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", nazev = "nazev", typ_vdb = "typ_vdb", zkratka = "zkratka", typ_sdb = "typ_sdb", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", rezim_aktual = "rezim_aktual", rezim_aktual_txt = "rezim_aktual_txt", rezim_aktual_gdz = "rezim_aktual_gdz", rezim_aktual_gdz_txt = "rezim_aktual_gdz_txt", priz_akut_gdz = "priz_akut_gdz", ixsFun = "ixsFun", prod_rada = "prod_rada",}
	const enum GGdessdbDtoFragments { ixs_sdb = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", nazev = "*", typ_vdb = "*", zkratka = "*", typ_sdb = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", rezim_aktual = "*", rezim_aktual_txt = "*", rezim_aktual_gdz = "*", rezim_aktual_gdz_txt = "*", priz_akut_gdz = "*", ixsFun = "*", prod_rada = "*",}
	const enum GGdessdbDtoTypes { ixs_sdb = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", nazev = "string", typ_vdb = "number", zkratka = "string", typ_sdb = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", rezim_aktual = "number", rezim_aktual_txt = "string", rezim_aktual_gdz = "number", rezim_aktual_gdz_txt = "string", priz_akut_gdz = "number", ixsFun = "string", prod_rada = "number",}
	const enum GGdessdbDtoTypeLengths { ixs_sdb = 12, typ_zmeny = 1, nazev = 100, zkratka = 16, poznamka = 254, zmenu_prov = 12, zmenil = 100, ixsFun = 50,}
	/**DBTABLE:gdevsdf*/
	interface GGdevsdfDto {
		/**DBCOLUMN:gdevsdf.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdevsdfhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdevsdf.ixs_fun*/
		ixs_fun?: string|null;
		/**funkcniMisto*/
		funkcniMisto?: string|null;
		/**DBCOLUMN:gdevsdf.typ_vdb*/
		typ_vdb?: number|null;
		/**DBCOLUMN:gdevsdf.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdevsdf.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdevsdf.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevsdf.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevsdf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevsdf.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Pristupova prava*/
		zmenil?: string|null;
		/**Hodnota nazev (Skupiny DB) - pro subselect seznamu Pristupova prava*/
		nazev?: string|null;
	}
	const enum GGdevsdfDtoNames { ixs_sdb = "ixs_sdb", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ixs_fun = "ixs_fun", funkcniMisto = "funkcniMisto", typ_vdb = "typ_vdb", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", nazev = "nazev",}
	const enum GGdevsdfDtoFragments { ixs_sdb = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ixs_fun = "*", funkcniMisto = "*", typ_vdb = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", nazev = "*",}
	const enum GGdevsdfDtoTypes { ixs_sdb = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ixs_fun = "string", funkcniMisto = "string", typ_vdb = "number", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", nazev = "string",}
	const enum GGdevsdfDtoTypeLengths { ixs_sdb = 12, typ_zmeny = 1, ixs_fun = 12, funkcniMisto = 100, poznamka = 254, zmenu_prov = 12, zmenil = 100, nazev = 100,}
	/**DBTABLE:gdevpdb*/
	interface GGdevpdbDto {
		/**DBCOLUMN:gdevpdb.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdevpdbhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		nazev_ixs_sdb?: string|null;
		nazev_lic_fyz?: string|null;
		/**DBCOLUMN:gdespdb.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdespdb.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdevpdb.lic_fyz*/
		lic_fyz?: string|null;
		/**DBCOLUMN:gdevpdb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevpdb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevpdb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Primarni licence databazi*/
		zmenil?: string|null;
		/**Příznak existence navázané licence řady PID s ICEM pro administraci k licenci databáze*/
		ico_adm_pid_exist?: number|null;
	}
	const enum GGdevpdbDtoNames { ixs_sdb = "ixs_sdb", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", nazev_ixs_sdb = "nazev_ixs_sdb", nazev_lic_fyz = "nazev_lic_fyz", dat_od = "dat_od", dat_do = "dat_do", lic_fyz = "lic_fyz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", ico_adm_pid_exist = "ico_adm_pid_exist",}
	const enum GGdevpdbDtoFragments { ixs_sdb = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", nazev_ixs_sdb = "*", nazev_lic_fyz = "*", dat_od = "*", dat_do = "*", lic_fyz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", ico_adm_pid_exist = "*",}
	const enum GGdevpdbDtoTypes { ixs_sdb = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", nazev_ixs_sdb = "string", nazev_lic_fyz = "string", dat_od = "JsonDate", dat_do = "JsonDate", lic_fyz = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", ico_adm_pid_exist = "number",}
	const enum GGdevpdbDtoTypeLengths { ixs_sdb = 12, typ_zmeny = 1, nazev_ixs_sdb = 100, nazev_lic_fyz = 100, lic_fyz = 4, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevakr*/
	interface GGdevakrDto {
		/**DBCOLUMN:gdevakr.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdevakrhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdevakr.revize*/
		revize?: string|null;
		/**DBCOLUMN:gdesrev.stav_revize*/
		stav_revize?: number|null;
		/**DBCOLUMN:gincrev.stav_revize_txt*/
		stav_revize_txt?: string|null;
		/**DBCOLUMN:gdevakr.aktualizovat*/
		aktualizovat?: number|null;
		/**DBCOLUMN:gdevakr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevakr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevakr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevakr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Vyjmenovane revize revize*/
		zmenil?: string|null;
	}
	const enum GGdevakrDtoNames { ixs_sdb = "ixs_sdb", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", revize = "revize", stav_revize = "stav_revize", stav_revize_txt = "stav_revize_txt", aktualizovat = "aktualizovat", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevakrDtoFragments { ixs_sdb = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", revize = "*", stav_revize = "*", stav_revize_txt = "stav_revize_txt", aktualizovat = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevakrDtoTypes { ixs_sdb = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", revize = "string", stav_revize = "number", stav_revize_txt = "string", aktualizovat = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevakrDtoTypeLengths { ixs_sdb = 12, typ_zmeny = 1, revize = 30, stav_revize_txt = 254, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevakd*/
	interface GGdevakdDto {
		/**DBCOLUMN:gdevakd.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdessdb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:gdevakdhh.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginliud.dat_zmena*/
		iud_dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginliud.iud*/
		typ_zmeny?: string|null;
		/**DBCOLUMN:gdevakd.ixs_gdt*/
		ixs_gdt?: string|null;
		/**nazevGdzBaliku*/
		nazevGdzBaliku?: string|null;
		/**popisGdzBaliku*/
		popisGdzBaliku?: string|null;
		/**DBCOLUMN:gdevakd.aktualizovat*/
		aktualizovat?: number|null;
		/**DBCOLUMN:gdevakd.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevakd.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevakd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevakd.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Vyjmenovane GDZ baliky*/
		zmenil?: string|null;
	}
	const enum GGdevakdDtoNames { ixs_sdb = "ixs_sdb", nazev = "nazev", iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ixs_gdt = "ixs_gdt", nazevGdzBaliku = "nazevGdzBaliku", popisGdzBaliku = "popisGdzBaliku", aktualizovat = "aktualizovat", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevakdDtoFragments { ixs_sdb = "*", nazev = "*", iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ixs_gdt = "*", nazevGdzBaliku = "*", popisGdzBaliku = "*", aktualizovat = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevakdDtoTypes { ixs_sdb = "string", nazev = "string", iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ixs_gdt = "string", nazevGdzBaliku = "string", popisGdzBaliku = "string", aktualizovat = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevakdDtoTypeLengths { ixs_sdb = 12, nazev = 100, typ_zmeny = 1, ixs_gdt = 12, nazevGdzBaliku = 300, popisGdzBaliku = 300, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevves*/
	interface GGdevvesDto {
		/**DBCOLUMN:gdevves.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdevves.verze_db*/
		verze_db?: number|null;
		/**DBCOLUMN:gdevves.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevves.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevves.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevves.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenil - pro subselect seznamu Povolene verze databaze*/
		zmenil?: string|null;
	}
	const enum GGdevvesDtoNames { ixs_sdb = "ixs_sdb", verze_db = "verze_db", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevvesDtoFragments { ixs_sdb = "*", verze_db = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevvesDtoTypes { ixs_sdb = "string", verze_db = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevvesDtoTypeLengths { ixs_sdb = 12, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdevvpf*/
	interface GGdevvpfDto {
		/**DBCOLUMN:gdevvpf.ixs_sdb*/
		ixs_sdb?: string|null;
		/**DBCOLUMN:gdevvpf.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdecfaz.faze_txt*/
		faze_txt?: string|null;
		/**DBCOLUMN:gdevvpf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevvpf.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Hodnota zmenile*/
		zmenil?: string|null;
	}
	const enum GGdevvpfDtoNames { ixs_sdb = "ixs_sdb", faze = "faze", faze_txt = "faze_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdevvpfDtoFragments { ixs_sdb = "*", faze = "*", faze_txt = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdevvpfDtoTypes { ixs_sdb = "string", faze = "string", faze_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdevvpfDtoTypeLengths { ixs_sdb = 12, faze = 8, faze_txt = 50, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznam ulohy Skupiny databazi*/
	const enum GSkupinyDatabaziFilterEnum {
		/**filtr na skupinu databazi - ixs_sdb*/
		ixs_sdb,
		/**filtr na GDZ balik - ixs_gdt*/
		ixs_gdt,
		/**filtr pro fyzickou licenci databaze*/
		lic_fyz,
		/**filtr na aktivitu*/
		aktivita,
		/**filtr pro název licence*/
		nazev,
		/**filtr pro zkratku*/
		zkratka,
		/**filtr pro poznamku*/
		poznamka,
		/**filtr pro ID instance databaze*/
		db_guid,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr na produkční řadu skupiny DB*/
		prod_rada,
		/**filtr na programovou fázi*/
		faze,
		/**ID souboru*/
		ixs_dif,
		/**ixs_fun uživatele*/
		ixs_fun,
		/**filtr na revizi*/
		revize,
		/**filtr na verzi db*/
		verze_db,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrLicenci\IGZakaznik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface cast ISL logiky pro ulohy ICO pro administraci/Fakturaci
	* @domain CentralAdmin
	* @businessObject GGdesicaDto
	*/
	interface Zakaznik {
		/**Metoda List - Seznam IČ pro administraci (gdesica)*/
		listIcoProAdm(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesicaDto>>;
		/**Metoda List - Seznam IČ pro fakturaci (gdesicf)*/
		listIcoProFakt(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesicfDto>>;
		/**Metoda Read pro detail IČA pro administraci*/
		readIcoProAdm(rq?:Gordic.Adt.Interface.GGdesicaDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesicaDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesicaDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesicaDto>>;
		/**Metoda Read pro detail IČA pro fakturaci*/
		readIcoProFakt(rq?:Gordic.Adt.Interface.GGdesicfDto|CallParams<GServiceReadRequest<Gordic.Adt.Interface.GGdesicfDto>>): _Task<GServiceReadRequest<Gordic.Adt.Interface.GGdesicfDto>,GServiceReadResponse<Gordic.Adt.Interface.GGdesicfDto>>;
		/**Založení/Update IČA pro administraci*/
		upsertIcoProAdm(rq?:Gordic.Adt.Interface.GGdesicaDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesicaDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesicaDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesicaDto>>;
		/**Založení/Update IČA pro fakturaci*/
		upsertIcoProFakt(rq?:Gordic.Adt.Interface.GGdesicfDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesicfDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesicfDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesicfDto>>;
		/**Metoda List - Baliky licenci pro zakaznika (ref T21759)*/
		listBalikyLicenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdeslipDto>>;
		/**Metoda List - Licence rad PID (na detailu ICA pro administraci)*/
		listLicRadPID(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdevicoDto>>;
		/**Metoda List - Historie zmen (na detailu ICA pro administraci)*/
		listIcoAdmHistorieZmen(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesicahhDto>>;
		/**Metoda List - Historie zmen (na detailu ICA pro akturaci)*/
		listIcoFaktHistorieZmen(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdesicfhhDto>>;
		/**Insert / Update zaznamu Licence rad PID*/
		insertUpdateLicRadPID(rq?:Gordic.Adt.Interface.GGdevicoDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdevicoDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdevicoDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Zakaznik: ServiceBase & Catalog.Zakaznik;
	}
	const Zakaznik: Client["Zakaznik"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdesicaDto - Hlavní datový objekt IČA pro administraci (tabulka gdesica)*/
	interface GGdesicaDto {
		/**Identifikátor IČA pro administraci*/
		ico_adm?: string|null;
		/**Název IČA pro administraci*/
		nazev?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**Nazev externího subjekt*/
		ixs_esu_nazev?: string|null;
		/**Poznámka k IČ pro administraci*/
		poznamka?: string|null;
		/**Aktivita IČA pro administraci*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Příznak pro zobrazení - Jedná se o informaci, zda má být daná hodnota (IČO pro fakturaci) veřejně prezentována. (0 = nezobrazovat hodnotu / 1 = zobrazovat hodnotu)*/
		priz_zobr?: number|null;
	}
	const enum GGdesicaDtoNames { ico_adm = "ico_adm", nazev = "nazev", ixs_esu = "ixs_esu", ixs_esu_nazev = "ixs_esu_nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", priz_zobr = "priz_zobr",}
	const enum GGdesicaDtoFragments { ico_adm = "*", nazev = "*", ixs_esu = "*", ixs_esu_nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", priz_zobr = "*",}
	const enum GGdesicaDtoTypes { ico_adm = "string", nazev = "string", ixs_esu = "string", ixs_esu_nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", priz_zobr = "number",}
	const enum GGdesicaDtoTypeLengths { ico_adm = 10, nazev = 254, ixs_esu = 12, ixs_esu_nazev = 500, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdesicfDto - Hlavní datový objekt IČA pro fakturaci (tabulka gdesicf)*/
	interface GGdesicfDto {
		/**Identifikátor IČ pro fakturaci licenčních poplatků*/
		ico_fakt?: string|null;
		/**Název IČA pro fakturaci*/
		nazev?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**Nazev externího subjekt*/
		ixs_esu_nazev?: string|null;
		/**Poznámka k OČ pro fakturaci*/
		poznamka?: string|null;
		/**Aktivita IČA pro fakturaci*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Příznak pro zobrazení - Jedná se o informaci, zda má být daná hodnota (IČO pro fakturaci) veřejně prezentována. (0 = nezobrazovat hodnotu / 1 = zobrazovat hodnotu)*/
		priz_zobr?: number|null;
	}
	const enum GGdesicfDtoNames { ico_fakt = "ico_fakt", nazev = "nazev", ixs_esu = "ixs_esu", ixs_esu_nazev = "ixs_esu_nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil", priz_zobr = "priz_zobr",}
	const enum GGdesicfDtoFragments { ico_fakt = "*", nazev = "*", ixs_esu = "*", ixs_esu_nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*", priz_zobr = "*",}
	const enum GGdesicfDtoTypes { ico_fakt = "string", nazev = "string", ixs_esu = "string", ixs_esu_nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string", priz_zobr = "number",}
	const enum GGdesicfDtoTypeLengths { ico_fakt = 10, nazev = 254, ixs_esu = 12, ixs_esu_nazev = 500, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**DBTABLE:gdesicahh - DTO pro Historii IČA pro administraci*/
	interface GGdesicahhDto {
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny záznamu*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Identifikátor IČA pro administraci*/
		ico_adm?: string|null;
		/**Název IČA pro administraci*/
		nazev?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**Název externího subjekt*/
		ixs_esu_nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesicahhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ico_adm = "ico_adm", nazev = "nazev", ixs_esu = "ixs_esu", ixs_esu_nazev = "ixs_esu_nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesicahhDtoFragments { iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ico_adm = "*", nazev = "*", ixs_esu = "*", ixs_esu_nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesicahhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ico_adm = "string", nazev = "string", ixs_esu = "string", ixs_esu_nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesicahhDtoTypeLengths { typ_zmeny = 1, ico_adm = 10, nazev = 254, ixs_esu = 12, ixs_esu_nazev = 500, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**GGdesicfhhDto - DTO pro Historii IČA pro fakturaci licenčních poplatků*/
	interface GGdesicfhhDto {
		/**ID záznamu*/
		iud_por?: number|null;
		/**Datum změny záznamu*/
		iud_dat_zmena?: JsonDate|null;
		/**Typ změny (založení/změna/odstranění)*/
		typ_zmeny?: string|null;
		/**Identifikátor IČA pro fakturaci*/
		ico_fakt?: string|null;
		/**Název IČA pro fakturaci*/
		nazev?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**Nazev externího subjekt*/
		ixs_esu_nazev?: string|null;
		/**Poznamka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdesicfhhDtoNames { iud_por = "iud_por", iud_dat_zmena = "iud_dat_zmena", typ_zmeny = "typ_zmeny", ico_fakt = "ico_fakt", nazev = "nazev", ixs_esu = "ixs_esu", ixs_esu_nazev = "ixs_esu_nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdesicfhhDtoFragments { iud_por = "*", iud_dat_zmena = "*", typ_zmeny = "*", ico_fakt = "*", nazev = "*", ixs_esu = "*", ixs_esu_nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdesicfhhDtoTypes { iud_por = "number", iud_dat_zmena = "JsonDate", typ_zmeny = "string", ico_fakt = "string", nazev = "string", ixs_esu = "string", ixs_esu_nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdesicfhhDtoTypeLengths { typ_zmeny = 1, ico_fakt = 10, nazev = 254, ixs_esu = 12, ixs_esu_nazev = 500, poznamka = 254, zmenu_prov = 12, zmenil = 100,}
	/**Možné položky filtru pro seznam ulohy ICO pro administraci*/
	const enum GIcoProAdmFilterEnum {
		/**filtr na ico pro administraci*/
		ico_adm,
		/**filtr na nazev - IČO pro administraci*/
		nazev,
		/**filtr na aktivitu zaznamu*/
		aktivita,
		/**Parametr uzivatele (adt_user_licenc = 99) - Supervisor*/
		userParam,
		/**filtr na ID balíku licencí*/
		ixs_lip,
	}
	/**Možné položky filtru pro seznam ulohy ICO pro fakturaci*/
	const enum GIcoProFaktFilterEnum {
		/**filtr na ico pro fakturaci*/
		ico_fakt,
		/**filtr na nazev - IČO pro fakturaci*/
		nazev,
		/**filtr na aktivitu zaznamu*/
		aktivita,
		/**Parametr uzivatele (adt_user_licenc = 99) - Supervisor*/
		userParam,
	}
	/**Možné položky filtru pro seznam seznam Historie zmen*/
	const enum GIcoHistorieZmenFilterEnum {
		/**filtr na ico pro administraci*/
		ico_adm,
		/**filtr na ico pro fakturaci*/
		ico_fakt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\RegistrRevizi\IGAplRevize.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Pozadavek na seznam revizi
	*     
	* @domain Distribuce
	*/
	interface AplRevize {
		/**
		*     Založení nové Revize do distribuce (Pro budoucí volání služby ze strany installserveru/buildserveru/Automatu...)
		*     
		*/
		create(rq?:Gordic.Adt.Interface.GGdesrevDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesrevDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesrevDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesrevDto>>;
		/**
		*     Update/založení Revize do distribuce
		*     
		*/
		upsert(rq?:Gordic.Adt.Interface.GGdesrevDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdesrevDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdesrevDto>,GServiceSaveResponse<Gordic.Adt.Interface.GGdesrevDto>>;
		/**
		*     Update stavu revize a poznámky
		*     
		*/
		updateStavRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,void>;
		/**
		*     Zmena stavu revizi 
		*     
		*/
		updateStavRevizi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,void>;
		/**
		*     Kontrola existence doporucene revize k programove fazi
		*     
		*/
		kontrolaDoporuceneRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSeznamDoporucenaRevizeDto>>;
		/**
		*     ListTestQueue - seznam fronty automatického testování
		*     
		*/
		listTestQueue(rq?:CallParams<{Revize:string}>): _Task<{Revize:string},GServiceListResponse<Gordic.Adt.Interface.GAutTestDto>>;
		/**
		*     CheckTest - Kontrola probíhajícího automatického testování revize
		*     
		*/
		checkTest(rq?:CallParams<{Dto:Gordic.Adt.Interface.GSeznamReviziGdesrevDto}>): _Task<{Dto:Gordic.Adt.Interface.GSeznamReviziGdesrevDto},GServiceListResponse<Gordic.Adt.Interface.GAutTestDto>>;
		/**
		*     UpdateTestWeight - Změna testovací váhy priority
		*     
		*/
		updateTestWeight(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GAutTestDto>,arrId:string[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GAutTestDto>,arrId:string[]},void>;
		/**
		*     StartRevisionTest - Start automatického testování revize
		*     
		*/
		startTest(rq?:CallParams<{Dto:Gordic.Adt.Interface.GSeznamReviziGdesrevDto,Email:string,Weight:number}>): _Task<{Dto:Gordic.Adt.Interface.GSeznamReviziGdesrevDto,Email:string,Weight:number},GServiceListResponse<Gordic.Adt.Interface.GAutTestDto>>;
		/**
		*     Získání aktuálního stavu automatického testování revize
		*     
		*/
		getTestState(rq?:CallParams<{Id:string}>): _Task<{Id:string},GServiceListResponse<Gordic.Adt.Interface.GAutTestDto>>;
		/**
		*     ListTest - List provedených automatických testů revize
		*     
		*/
		listTest(rq?:CallParams<{Revize:string}>): _Task<{Revize:string},GServiceListResponse<Gordic.Adt.Interface.GAutTestDto>>;
		/**
		*      Kontrola existence doporucenych revizi k licenci databaze
		*     
		*/
		kontrolaDoporuceneRevizeProLicDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdecfazDto>>;
		/**
		*     Revokace stavu revizi (zakazani revizi) 
		*     
		*/
		updateRevokaceRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,void>;
		/**
		*     Insert dat do Gdedrev
		*     
		*/
		insertGdedrev(rq?:Gordic.Adt.Interface.GGdedrevDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdedrevDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdedrevDto>,void>;
		/**
		*     Insert dat do Gdedrev
		*     
		*/
		interniPopisZakazu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,void>;
		/**
		*     Načíst obsah souboru revize
		*     
		*/
		getContent(rq?:Gordic.Adt.Interface.GAplRevizeContentDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GAplRevizeContentDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GAplRevizeContentDto>,JsonBlob>;
		/**
		*     Insert / Update tabulky gdelodr pro logování informací ručního odeslání revizí do distribuce (Ruční inbox revizí)
		*     
		*/
		upsertInboxDistribuce(rq?:Gordic.Adt.Interface.GGdelodrDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdelodrDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdelodrDto>,void>;
		/**
		*     Insert / Update tabulky gdelrev pro logování informací o stahování souboru rvize
		*     
		*/
		upsertDownloadRev(rq?:Gordic.Adt.Interface.GGdelrevDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdelrevDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdelrevDto>,void>;
		/**
		*     Insert / Update tabulky gdelrer pro logování informací o stahování souboru rvize z Registru revizí
		*     
		*/
		upsertGdelrer(rq?:Gordic.Adt.Interface.GGdelrerDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GGdelrerDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GGdelrerDto>,void>;
		/**
		*     Hromadná úprava množiny revizí
		*     
		*/
		bulkEditRevize(rq?:CallParams<{revize:Gordic.Adt.Interface.GGdesrevDto[],rq_zmeny:Gordic.Adt.Interface.GPopisZmenyDto,rq_bulkEdit:Gordic.Adt.Interface.GBulkEditRevizeDto}>): _Task<{revize:Gordic.Adt.Interface.GGdesrevDto[],rq_zmeny:Gordic.Adt.Interface.GPopisZmenyDto,rq_bulkEdit:Gordic.Adt.Interface.GBulkEditRevizeDto},void>;
		/**
		*     Metoda List se seznamem revizi
		*     
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSeznamReviziGdesrevDto>>;
		/**
		*     Metoda List se seznamem verzi
		*     
		*/
		listSeznamVerzi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSeznamReviziGdesrevDto>>;
		/**
		*     Metoda List se seznamem verzi pro doporucene revize
		*     
		*/
		listSeznamVerziDoporuceneRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAktualniVerzeDto>>;
		/**
		*     Metoda List se seznamem stavu
		*     
		*/
		listSeznamStavu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSeznamReviziGdesrevDto>>;
		/**
		*     Metoda List pro vybudování seznamu doporučených revizí aplikací pro zadanou licenci
		*     
		*/
		listDoporucenychRevizi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GDoporucenaRevizeDto>>;
		/**
		*     Metoda List pro typ instalace
		*     
		*/
		listTyi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GTyiDto>>;
		/**
		*     Metoda List se seznamem doporucenych revizi
		*     
		*/
		listSeznamDoporucenychRevizi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSeznamDoporucenaRevizeDto>>;
		/**
		*     Metoda List se seznamem doporucenych revizi za skupinu databaze
		*     
		*/
		listDoporuceneRevizeSkupinyDB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GSeznamDoporucenaRevizeDto>>;
		/**
		*     Zjisteni aktualni verze databaze pro doporucene revize
		*     
		*/
		listAktualniVerze(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GAktualniVerzeDto>>;
		/**
		*     Metoda List pro seznam obsahu distribucnich balicich jednotlivych revizi, ref T17133
		*     
		*/
		listObsahDistBalRev(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdedfilDto>>;
		/**
		*      Odeslani souboru do uloziste na FTPS server dnld2-ji.cz
		*     
		*/
		moveToStorage(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GAplRevizeUploadDto>,ixsRef:string,datetimeStamp:string}>): _Task<{rq:GServiceSaveRequest<Gordic.Adt.Interface.GAplRevizeUploadDto>,ixsRef:string,datetimeStamp:string},void>;
		/**
		*     Upload souboru revize do distribuce
		*     
		*/
		uploadRevFile(rq?:Gordic.Adt.Interface.GAplRevizeUploadDto|CallParams<GServiceSaveRequest<Gordic.Adt.Interface.GAplRevizeUploadDto>>): _Task<GServiceSaveRequest<Gordic.Adt.Interface.GAplRevizeUploadDto>,GServiceSaveResponse<Gordic.Adt.Interface.GAplRevizeUploadDto>>;
		/**
		*     Metoda List pro získání přehledu o stažených revizích (zda a kdo si již revizi stáhnul)
		*     
		*/
		listDownloadRevize(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdelrevDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AplRevize: ServiceBase & Catalog.AplRevize;
	}
	const AplRevize: Client["AplRevize"];
}
declare namespace Gordic.Adt.Interface {
	/**GGdesrevDto - DTO s údaji o revizi*/
	interface GGdesrevDto {
		/**Revize distribučních balíků aplikací, sestav, dokumentace a helpů*/
		revize?: string|null;
		/**Programová fáze (lze odvodit z textu revize)*/
		faze?: string|null;
		/**Verze databáze*/
		verze?: number|null;
		/**Minimální Verze databáze (aby bylo možné blokovat revize vůči starším verzím databáze)*/
		verze_db_min?: number|null;
		/**Minimální Verze databáze (aby bylo možné blokovat revize vůči starším verzím databáze)*/
		verze_db_min2?: number|null;
		/**Minimální verze DB, kterou distribuční balík vyžaduje*/
		sub_verze_db_min?: number|null;
		/**Stav revize distribučního balíku (0 = Doporučená / 10 = Betatest / 20 = Alfatest / 30 = Příprava / 50 = Nedoporučená, k omezenému použití / 90 = Zakázaná)*/
		stav_revize?: number|null;
		/**Identifikace emailů pro avizace k balíku (oddělené středníkem)*/
		mail?: string|null;
		/**Poznámka k revizi*/
		poznamka?: string|null;
		/**První další doporučená revize nahrazující zakázanou revizi (Zatím se s tímto sloupcem nikde aktivně nepracuje - neplní se)*/
		revize_new?: string|null;
		/**Čas vyhlášení revize jako zakázané*/
		dat_revoke?: JsonDate|null;
		/**Čas fyzického odstranění distribučních balíků z distribučních úložišť*/
		dat_vymaz?: JsonDate|null;
		/**ID pro různé auditní záznamy. Odkazuje na ginllog.ixs_lpc*/
		ixs_lpc?: string|null;
		/**Typ implementace*/
		tyi?: string|null;
		/**Subverze revize*/
		sub_verze?: number|null;
		/**Identifikátor zdrojové licenede DB*/
		lic_od?: string|null;
		/**Identifikátor cílové licenede DB*/
		lic_pro?: string|null;
		/**Velikost distribučního balíku revize*/
		velikost?: number|null;
		/**Revize DB minimální (Automat toto plní při příjmu distribučního balíku a to podle dat v jeho TST souboru)*/
		rev_db_min?: number|null;
		/**Minimální subverze DB, kterou distribuční balík vyžaduje (Automat toto plní při příjmu distribučního balíku a to podle dat v jeho TST souboru)*/
		sub_verze_db_min2?: number|null;
		/**Revize DB minimální (Automat toto plní při příjmu distribučního balíku a to podle dat v jeho TST souboru)*/
		rev_db_min2?: number|null;
		/**Datum vzniku revize*/
		dat_mpd?: JsonDate|null;
		/**Subverze DB*/
		sub_verze_db?: number|null;
		/**Číslo buildu v rámci větve např. 2139*/
		build?: number|null;
		/**Čas požadavku na vytvoření revize*/
		dat_requested?: JsonDate|null;
		/**Datum vzniku revize*/
		dat_created?: JsonDate|null;
		/**Větev (např. 52431 nebo 52420_T13354)*/
		branch?: string|null;
		/**SVN revize, např. 460291*/
		svn?: number|null;
		/**Kotva pro hromadné úpravy revizí (Určení rozsahu popisů změn k revizím)*/
		kotva?: string|null;
		/**Username bez domény, kdo revizi zadal do výroby*/
		autor?: string|null;
		/**Příznak lokalizace*/
		priz_loc?: number|null;
		/**Příznak akceptace popisů změn*/
		priz_akcept?: number|null;
		/**Identifikátor ixs_fun distributora importujícího soubor revize sestav mimo centrálu GORDIC (defaultně null), ref T44371*/
		ixs_fun_upload?: string|null;
	}
	const enum GGdesrevDtoNames { revize = "revize", faze = "faze", verze = "verze", verze_db_min = "verze_db_min", verze_db_min2 = "verze_db_min2", sub_verze_db_min = "sub_verze_db_min", stav_revize = "stav_revize", mail = "mail", poznamka = "poznamka", revize_new = "revize_new", dat_revoke = "dat_revoke", dat_vymaz = "dat_vymaz", ixs_lpc = "ixs_lpc", tyi = "tyi", sub_verze = "sub_verze", lic_od = "lic_od", lic_pro = "lic_pro", velikost = "velikost", rev_db_min = "rev_db_min", sub_verze_db_min2 = "sub_verze_db_min2", rev_db_min2 = "rev_db_min2", dat_mpd = "dat_mpd", sub_verze_db = "sub_verze_db", build = "build", dat_requested = "dat_requested", dat_created = "dat_created", branch = "branch", svn = "svn", kotva = "kotva", autor = "autor", priz_loc = "priz_loc", priz_akcept = "priz_akcept", ixs_fun_upload = "ixs_fun_upload",}
	const enum GGdesrevDtoFragments { revize = "*", faze = "*", verze = "*", verze_db_min = "*", verze_db_min2 = "*", sub_verze_db_min = "*", stav_revize = "*", mail = "*", poznamka = "*", revize_new = "*", dat_revoke = "*", dat_vymaz = "*", ixs_lpc = "*", tyi = "*", sub_verze = "*", lic_od = "*", lic_pro = "*", velikost = "*", rev_db_min = "*", sub_verze_db_min2 = "*", rev_db_min2 = "*", dat_mpd = "*", sub_verze_db = "*", build = "*", dat_requested = "*", dat_created = "*", branch = "*", svn = "*", kotva = "*", autor = "*", priz_loc = "*", priz_akcept = "*", ixs_fun_upload = "*",}
	const enum GGdesrevDtoTypes { revize = "string", faze = "string", verze = "number", verze_db_min = "number", verze_db_min2 = "number", sub_verze_db_min = "number", stav_revize = "number", mail = "string", poznamka = "string", revize_new = "string", dat_revoke = "JsonDate", dat_vymaz = "JsonDate", ixs_lpc = "string", tyi = "string", sub_verze = "number", lic_od = "string", lic_pro = "string", velikost = "number", rev_db_min = "number", sub_verze_db_min2 = "number", rev_db_min2 = "number", dat_mpd = "JsonDate", sub_verze_db = "number", build = "number", dat_requested = "JsonDate", dat_created = "JsonDate", branch = "string", svn = "number", kotva = "string", autor = "string", priz_loc = "number", priz_akcept = "number", ixs_fun_upload = "string",}
	const enum GGdesrevDtoTypeLengths { revize = 30, faze = 8, mail = 254, poznamka = 254, revize_new = 15, ixs_lpc = 12, tyi = 1, lic_od = 4, lic_pro = 4, branch = 50, kotva = 50, autor = 50, ixs_fun_upload = 12,}
	/**GGdesreiDto - DTO s informacemi o vznikající revizi*/
	interface GGdesreiDto {
		/**Revize distribučních balíků aplikací, sestav, dokumentace a helpů*/
		revize?: string|null;
		/**Identifikace emailů pro avizace k balíku (oddělené středníkem)*/
		mail?: string|null;
		/**Čas požadavku na vytvoření revize*/
		dat_requested?: JsonDate|null;
		/**Datum vzniku revize*/
		dat_created?: JsonDate|null;
		/**Větev (např. 52431 nebo 52420_T13354)*/
		branch?: string|null;
		/**Číslo buildu v rámci větve např. 2139*/
		build?: number|null;
		/**SVN revize, např. 460291*/
		svn?: number|null;
		/**Kotva pro hromadné úpravy revizí (Určení rozsahu popisů změn k revizím)*/
		kotva?: string|null;
		/**Username bez domény, kdo revizi zadal do výroby*/
		autor?: string|null;
		/**Příznak lokalizace*/
		priz_loc?: number|null;
		/**Datum vzniku revize*/
		dat_mpd?: JsonDate|null;
		/**Datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
	}
	const enum GGdesreiDtoNames { revize = "revize", mail = "mail", dat_requested = "dat_requested", dat_created = "dat_created", branch = "branch", build = "build", svn = "svn", kotva = "kotva", autor = "autor", priz_loc = "priz_loc", dat_mpd = "dat_mpd", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGdesreiDtoFragments { revize = "*", mail = "*", dat_requested = "*", dat_created = "*", branch = "*", build = "*", svn = "*", kotva = "*", autor = "*", priz_loc = "*", dat_mpd = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGdesreiDtoTypes { revize = "string", mail = "string", dat_requested = "JsonDate", dat_created = "JsonDate", branch = "string", build = "number", svn = "number", kotva = "string", autor = "string", priz_loc = "number", dat_mpd = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGdesreiDtoTypeLengths { revize = 30, mail = 254, branch = 50, kotva = 50, autor = 50, zmenu_prov = 12,}
	/**
	*     DTO pro vybudování seznamu doporučených revizí aplikací
	*     
	*/
	interface GDoporucenaRevizeDto {
		/**DBCOLUMN:gdesrev.revize*/
		revize?: string|null;
		/**
		*     velikost distribučního souboru
		*     
		*/
		velikost?: number|null;
		/**
		*     Čase zveřejnění nebo revokace
		*     
		*/
		dat_zmena?: JsonDate|null;
		/**
		*     Stav revize
		*     
		*/
		stav_revize?: number|null;
	}
	const enum GDoporucenaRevizeDtoNames { revize = "revize", velikost = "velikost", dat_zmena = "dat_zmena", stav_revize = "stav_revize",}
	const enum GDoporucenaRevizeDtoFragments { revize = "*", velikost = "*", dat_zmena = "*", stav_revize = "*",}
	const enum GDoporucenaRevizeDtoTypes { revize = "string", velikost = "number", dat_zmena = "JsonDate", stav_revize = "number",}
	const enum GDoporucenaRevizeDtoTypeLengths { revize = 30,}
	/**DBTABLE: gdesrev*/
	interface GSeznamReviziGdesrevDto {
		/**DBCOLUMN:gdesrev.revize*/
		revize?: string|null;
		/**pole stringovych nazvu revizi*/
		revize_field?: string[]|null;
		/**DBCOLUMN:gdesrev.faze*/
		faze?: string|null;
		/**Stav programové fáze*/
		stav_faze?: number|null;
		/**Název stavu programové fáze*/
		stav_faze_txt?: string|null;
		/**DBCOLUMN:gdesrev.verze*/
		verze?: number|null;
		/**DBCOLUMN:gdesrev.verze_db_min*/
		verze_db_min?: number|null;
		/**DBCOLUMN:gdesrev.verze_db_min2*/
		verze_db_min2?: number|null;
		/**DBCOLUMN:gdesrev.sub_verze_db_min*/
		sub_verze_db_min?: number|null;
		/**DBCOLUMN:gdesrev.sub_verze_db_min2*/
		sub_verze_db_min2?: number|null;
		/**DBCOLUMN:gdesrev.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:gdesrev.sub_verze_db - stav subverze db*/
		stav_sub_verze_db?: string|null;
		/**DBCOLUMN:gdesrev.stav_revize*/
		stav_revize?: number|null;
		/**DBCOLUMN:gdesrev.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesrev.mail*/
		mail?: string|null;
		/**DBCOLUMN:gdesrev.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdesrev.revize_new*/
		revize_new?: string|null;
		/**DBCOLUMN:gdesrev.dat_revoke*/
		dat_revoke?: JsonDate|null;
		/**DBCOLUMN:gdesrev.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gdesrev.dat_vymaz*/
		dat_vymaz?: JsonDate|null;
		/**DBCOLUMN:gdesrev.dat_nedoporuc*/
		dat_nedoporuc?: JsonDate|null;
		/**
		*     Příznak, že existuje text důvodu revokace - 0-neexistuje 
		*     Zde bude ulozen count sloupcu z tabulky ginddre 
		*/
		int_popis?: number|null;
		/**DBCOLUMN:gincrev.stav_revize_txt*/
		stav_revize_txt?: string|null;
		/**DBCOLUMN:gdedrev.popis*/
		interni_popis?: string|null;
		/**Zkratka modulu (Substring z nazvu revize)*/
		modul?: string|null;
		/**Typ dokumentu (Substring z nazvu revize)*/
		typ_revize?: string|null;
		/**verze revize (Substring z nazvu revize)*/
		verze_revize?: string|null;
		/**Verze revize pro dany modul(Substring z nazvu revize)*/
		verze_revize_modulu?: string|null;
		/**Nazev stahovaneho souboru*/
		nazev_souboru?: string|null;
		/**Nazev fáze*/
		faze_nazev?: string|null;
		/**Typ distribuce (13. znak v nazvu revize)*/
		typ_distribuce?: string|null;
		/**Cilova licence (pouze distribuce typu L)*/
		lic?: string|null;
		/**DBCOLUMN:gdesrev.velikost*/
		velikost?: number|null;
		/**Minimalni pozadovana verze DB pro spusteni aplikace, ref T18311*/
		min_poz_verze_db?: string|null;
		/**Minimalni pozadovana verze DB pro spusteni aplikace, ref T18311*/
		min_poz_verze_db2?: string|null;
		/**vybrane radky pro hromadnou úpravu revizi*/
		checkedRows?: boolean|null;
		/**Identifikátor autora změny*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
		/**Autor revize*/
		autor_revize?: string|null;
		/**Garant kvality*/
		garant_kvality?: string|null;
		/**DBCOLUMN:gdesrev.build*/
		build?: number|null;
		/**DBCOLUMN:gdesrev.svn*/
		svn?: number|null;
		/**DBCOLUMN:gdesrev.kotva*/
		kotva?: string|null;
		/**DBCOLUMN:gdesrev.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:gdesrev.tyi - Typ implementace*/
		tyi?: string|null;
		/**DBCOLUMN:gdesrev.lic_od*/
		lic_od?: string|null;
		/**DBCOLUMN:gdesrev.lic_pro*/
		lic_pro?: string|null;
		/**DBCOLUMN:gdesrev.rev_db_min*/
		rev_db_min?: number|null;
		/**DBCOLUMN:gdesrev.rev_db_min2*/
		rev_db_min2?: number|null;
		/**Větev (např. 52431 nebo 52420_T13354)*/
		branch?: string|null;
		/**Čas požadavku na vytvoření revize*/
		dat_requested?: JsonDate|null;
		/**Datum vzniku revize*/
		dat_created?: JsonDate|null;
		/**Username bez domény, kdo revizi zadal do výroby*/
		autor?: string|null;
		/**Příznak lokalizace*/
		priz_loc?: number|null;
		/**Příznak akceptace nabídky popisů změn*/
		priz_akcept?: number|null;
		/**Identifikátor ixs_fun distributora importujícího soubor revize sestav mimo centrálu GORDIC (defaultně null), ref T44371*/
		ixs_fun_upload?: string|null;
	}
	const enum GSeznamReviziGdesrevDtoNames { revize = "revize", revize_field = "revize_field", faze = "faze", stav_faze = "stav_faze", stav_faze_txt = "stav_faze_txt", verze = "verze", verze_db_min = "verze_db_min", verze_db_min2 = "verze_db_min2", sub_verze_db_min = "sub_verze_db_min", sub_verze_db_min2 = "sub_verze_db_min2", sub_verze_db = "sub_verze_db", stav_sub_verze_db = "stav_sub_verze_db", stav_revize = "stav_revize", dat_zmena = "dat_zmena", mail = "mail", poznamka = "poznamka", revize_new = "revize_new", dat_revoke = "dat_revoke", dat_mpd = "dat_mpd", dat_vymaz = "dat_vymaz", dat_nedoporuc = "dat_nedoporuc", int_popis = "int_popis", stav_revize_txt = "stav_revize_txt", interni_popis = "interni_popis", modul = "modul", typ_revize = "typ_revize", verze_revize = "verze_revize", verze_revize_modulu = "verze_revize_modulu", nazev_souboru = "nazev_souboru", faze_nazev = "faze_nazev", typ_distribuce = "typ_distribuce", lic = "lic", velikost = "velikost", min_poz_verze_db = "min_poz_verze_db", min_poz_verze_db2 = "min_poz_verze_db2", checkedRows = "checkedRows", zmenu_prov = "zmenu_prov", zmenil = "zmenil", autor_revize = "autor_revize", garant_kvality = "garant_kvality", build = "build", svn = "svn", kotva = "kotva", ixs_lpc = "ixs_lpc", tyi = "tyi", lic_od = "lic_od", lic_pro = "lic_pro", rev_db_min = "rev_db_min", rev_db_min2 = "rev_db_min2", branch = "branch", dat_requested = "dat_requested", dat_created = "dat_created", autor = "autor", priz_loc = "priz_loc", priz_akcept = "priz_akcept", ixs_fun_upload = "ixs_fun_upload",}
	const enum GSeznamReviziGdesrevDtoFragments { revize = "main", revize_field = "revize_field", faze = "main", stav_faze = "main", stav_faze_txt = "main", verze = "main", verze_db_min = "main", verze_db_min2 = "main", sub_verze_db_min = "main", sub_verze_db_min2 = "main", sub_verze_db = "main", stav_sub_verze_db = "stav_sub_verze_db", stav_revize = "main", dat_zmena = "main", mail = "main", poznamka = "main", revize_new = "main", dat_revoke = "main", dat_mpd = "main", dat_vymaz = "main", dat_nedoporuc = "main", int_popis = "int_popis", stav_revize_txt = "stav_revize_txt", interni_popis = "interni_popis", modul = "modul", typ_revize = "typ_revize", verze_revize = "verze_revize", verze_revize_modulu = "verze_revize_modulu", nazev_souboru = "nazev_souboru", faze_nazev = "faze_nazev", typ_distribuce = "typ_distribuce", lic = "lic", velikost = "main", min_poz_verze_db = "min_poz_verze_db", min_poz_verze_db2 = "min_poz_verze_db2", checkedRows = "checkedRows", zmenu_prov = "main", zmenil = "main", autor_revize = "autor_revize", garant_kvality = "garant_kvality", build = "main", svn = "main", kotva = "main", ixs_lpc = "main", tyi = "main", lic_od = "main", lic_pro = "main", rev_db_min = "main", rev_db_min2 = "main", branch = "main", dat_requested = "main", dat_created = "main", autor = "main", priz_loc = "main", priz_akcept = "main", ixs_fun_upload = "*",}
	const enum GSeznamReviziGdesrevDtoTypes { revize = "string", revize_field = "string[]", faze = "string", stav_faze = "number", stav_faze_txt = "string", verze = "number", verze_db_min = "number", verze_db_min2 = "number", sub_verze_db_min = "number", sub_verze_db_min2 = "number", sub_verze_db = "number", stav_sub_verze_db = "string", stav_revize = "number", dat_zmena = "JsonDate", mail = "string", poznamka = "string", revize_new = "string", dat_revoke = "JsonDate", dat_mpd = "JsonDate", dat_vymaz = "JsonDate", dat_nedoporuc = "JsonDate", int_popis = "number", stav_revize_txt = "string", interni_popis = "string", modul = "string", typ_revize = "string", verze_revize = "string", verze_revize_modulu = "string", nazev_souboru = "string", faze_nazev = "string", typ_distribuce = "string", lic = "string", velikost = "number", min_poz_verze_db = "string", min_poz_verze_db2 = "string", checkedRows = "boolean", zmenu_prov = "string", zmenil = "string", autor_revize = "string", garant_kvality = "string", build = "number", svn = "number", kotva = "string", ixs_lpc = "string", tyi = "string", lic_od = "string", lic_pro = "string", rev_db_min = "number", rev_db_min2 = "number", branch = "string", dat_requested = "JsonDate", dat_created = "JsonDate", autor = "string", priz_loc = "number", priz_akcept = "number", ixs_fun_upload = "string",}
	const enum GSeznamReviziGdesrevDtoTypeLengths { revize = 30, faze = 8, stav_faze_txt = 50, mail = 254, poznamka = 254, revize_new = 15, stav_revize_txt = 254, interni_popis = 254, modul = 5, typ_revize = 5, verze_revize = 2, verze_revize_modulu = 7, nazev_souboru = 50, faze_nazev = 500, typ_distribuce = 1, lic = 4, min_poz_verze_db = 50, min_poz_verze_db2 = 50, zmenu_prov = 12, zmenil = 100, autor_revize = 254, garant_kvality = 254, kotva = 50, ixs_lpc = 12, tyi = 1, lic_od = 4, lic_pro = 4, branch = 50, autor = 50, ixs_fun_upload = 12,}
	/**DBTABLE:gdedrev*/
	interface GGdedrevDto {
		/**DBCOLUMN:gdedrev.revize*/
		revize?: string|null;
		/**DBCOLUMN:gdedrev.popis_format*/
		popis_format?: number|null;
		/**DBCOLUMN:gdedrev.kultura*/
		kultura?: number|null;
		/**DBCOLUMN:gdedrev.typ_popisu*/
		typ_popisu?: number|null;
		/**DBCOLUMN:gdedrev.popis*/
		popis?: string|null;
	}
	const enum GGdedrevDtoNames { revize = "revize", popis_format = "popis_format", kultura = "kultura", typ_popisu = "typ_popisu", popis = "popis",}
	const enum GGdedrevDtoFragments { revize = "*", popis_format = "*", kultura = "*", typ_popisu = "*", popis = "*",}
	const enum GGdedrevDtoTypes { revize = "string", popis_format = "number", kultura = "number", typ_popisu = "number", popis = "string",}
	const enum GGdedrevDtoTypeLengths { revize = 30, popis = 2000,}
	/**DTO pro content downloadu revize*/
	interface GAplRevizeContentDto {
		/**Identifikator Revize*/
		revize?: string|null;
		/**
		*     GUID uloženého dočasného souboru - musí se ale naplnit až na straně webového serveru. Ze strany aplikačního serveru půjde NULL
		*     
		*/
		guid?: string|null;
		/**
		*     Velikost revize
		*     
		*/
		sizeB?: number|null;
		/**
		*     Velikost souboru vyjádřená textově, uživatelsky přívětivě
		*     
		*/
		fileSize?: string|null;
		/**
		*     Číselná velikost revize
		*     
		*/
		filename?: string|null;
		/**
		*     Číselná velikost revize
		*     
		*/
		fileDescription?: string|null;
		/**
		*     Typ ikony revize
		*     
		*/
		fileTypeIcon?: string|null;
	}
	const enum GAplRevizeContentDtoNames { revize = "revize", guid = "guid", sizeB = "sizeB", fileSize = "fileSize", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon",}
	const enum GAplRevizeContentDtoFragments { revize = "*", guid = "*", sizeB = "*", fileSize = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*",}
	const enum GAplRevizeContentDtoTypes { revize = "string", guid = "string", sizeB = "number", fileSize = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string",}
	const enum GAplRevizeContentDtoTypeLengths { revize = 30,}
	/**
	*     DTO pro dostupne verze licence databaze
	*     
	*/
	interface GAktualniVerzeDto {
		/**Verze zákaznické databáze*/
		verze_db?: number|null;
		/**Subverze zákaznické databáze*/
		sub_verze_db?: number|null;
	}
	const enum GAktualniVerzeDtoNames { verze_db = "verze_db", sub_verze_db = "sub_verze_db",}
	const enum GAktualniVerzeDtoFragments { verze_db = "*", sub_verze_db = "*",}
	const enum GAktualniVerzeDtoTypes { verze_db = "number", sub_verze_db = "number",}
	const enum GAktualniVerzeDtoTypeLengths {}
	/**
	*     DTO pro login uzivatele na upload Revizi do uloziste
	*     
	*/
	interface GAplRevizeUploadDto {
		/**Identifikator Revize*/
		revize?: string|null;
		/**Blob pro content revize*/
		kopie?: Blob|null;
		/**
		*     Velikost souboru vyjádřená textově, uživatelsky přívětivě
		*     
		*/
		fileSize?: string|null;
		/**
		*     Číselná velikost revize
		*     
		*/
		filename?: string|null;
		/**
		*     Číselná velikost revize
		*     
		*/
		fileDescription?: string|null;
		/**
		*     Typ ikony revize
		*     
		*/
		fileTypeIcon?: string|null;
		/**
		*     Login uzivatele pro nazev adresare
		*     
		*/
		login_name?: string|null;
		/**
		*     Licence databaze
		*     
		*/
		lic?: string|null;
		/**
		*     Příznak provedeného uploadu (true - úspěch / false - neúspěch) 
		*     
		*/
		uploaded?: boolean|null;
	}
	const enum GAplRevizeUploadDtoNames { revize = "revize", kopie = "kopie", fileSize = "fileSize", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon", login_name = "login_name", lic = "lic", uploaded = "uploaded",}
	const enum GAplRevizeUploadDtoFragments { revize = "*", kopie = "*", fileSize = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*", login_name = "*", lic = "*", uploaded = "*",}
	const enum GAplRevizeUploadDtoTypes { revize = "string", kopie = "Blob", fileSize = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string", login_name = "string", lic = "string", uploaded = "boolean",}
	const enum GAplRevizeUploadDtoTypeLengths { revize = 30, lic = 40,}
	/**
	*     DTO pro typ instalace
	*     
	*/
	interface GTyiDto {
		/**Typ instalace GINIS - AČR, ISTA, CIVIL atd...*/
		tyi?: string|null;
	}
	const enum GTyiDtoNames { tyi = "tyi",}
	const enum GTyiDtoFragments { tyi = "*",}
	const enum GTyiDtoTypes { tyi = "string",}
	const enum GTyiDtoTypeLengths { tyi = 10,}
	/**
	*     DTO pro vybudování seznamu doporučených revizí
	*     
	*/
	interface GSeznamDoporucenaRevizeDto {
		/**DBCOLUMN:gdesrev.revize*/
		revize?: string|null;
		/**DBCOLUMN:gdesrev.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdecfaz.stav_faze*/
		stav_faze?: number|null;
		/**DBCOLUMN:gdecfaz.stav_faze_txt*/
		stav_faze_txt?: string|null;
		/**DBCOLUMN:gdesrev.verze*/
		verze?: number|null;
		/**DBCOLUMN:gdesrev.stav_verze*/
		stav_revize?: number|null;
		/**DBCOLUMN:gincrev.stav_revize_txt*/
		stav_revize_txt?: string|null;
		/**DBCOLUMN:gdesrev.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesrev.velikost*/
		velikost?: number|null;
		/**vybrane radky*/
		checkedRows?: boolean|null;
	}
	const enum GSeznamDoporucenaRevizeDtoNames { revize = "revize", faze = "faze", stav_faze = "stav_faze", stav_faze_txt = "stav_faze_txt", verze = "verze", stav_revize = "stav_revize", stav_revize_txt = "stav_revize_txt", dat_zmena = "dat_zmena", velikost = "velikost", checkedRows = "checkedRows",}
	const enum GSeznamDoporucenaRevizeDtoFragments { revize = "*", faze = "*", stav_faze = "*", stav_faze_txt = "*", verze = "*", stav_revize = "*", stav_revize_txt = "*", dat_zmena = "*", velikost = "*", checkedRows = "*",}
	const enum GSeznamDoporucenaRevizeDtoTypes { revize = "string", faze = "string", stav_faze = "number", stav_faze_txt = "string", verze = "number", stav_revize = "number", stav_revize_txt = "string", dat_zmena = "JsonDate", velikost = "number", checkedRows = "boolean",}
	const enum GSeznamDoporucenaRevizeDtoTypeLengths { revize = 30, faze = 8, stav_faze = 50, stav_faze_txt = 50, stav_revize_txt = 254,}
	/**
	*     DTO pro kopirovani revizi na FTP
	*     
	*/
	interface GAplRevizeMoveToFTPDto {
		/**
		*     Vybrane revize pro vlozeni na FTP
		*     
		*/
		revizeRows?: Gordic.Adt.Interface.GSeznamReviziGdesrevDto[]|null;
		/**
		*     Casove razitko pro nazev slozky na FTP
		*     
		*/
		datetimeStamp?: string|null;
		/**
		*     Identifikator uzivatele
		*     
		*/
		ixsRef?: string|null;
		/**
		*     Licence revize pro nazev slozky na FTP
		*     
		*/
		lic?: string|null;
	}
	const enum GAplRevizeMoveToFTPDtoNames { revizeRows = "revizeRows", datetimeStamp = "datetimeStamp", ixsRef = "ixsRef", lic = "lic",}
	const enum GAplRevizeMoveToFTPDtoFragments { revizeRows = "*", datetimeStamp = "*", ixsRef = "*", lic = "*",}
	const enum GAplRevizeMoveToFTPDtoTypes { revizeRows = "Gordic.Adt.Interface.GSeznamReviziGdesrevDto[]", datetimeStamp = "string", ixsRef = "string", lic = "string",}
	const enum GAplRevizeMoveToFTPDtoTypeLengths {}
	/**DTO pro zobrazení obsahu distribucnich souboru jednotlivych revizi, DBTABLE:gdedfil*/
	interface GGdedfilDto {
		/**DBCOLUMN:gdedfil.revize*/
		revize?: string|null;
		/**DBCOLUMN:gdedfil.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:gdedfil.cesta*/
		cesta?: string|null;
		/**DBCOLUMN:gdedfil.crc*/
		crc?: number|null;
		/**DBCOLUMN:gdedfil.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gdedfil.soubor_h*/
		soubor_h?: string|null;
		/**DBCOLUMN:gdedfil.alg_h*/
		alg_h?: string|null;
		/**DBCOLUMN:gdedfil.verze*/
		verze?: string|null;
		/**DBCOLUMN:gdedfil.antivir_result*/
		antivir_result?: string|null;
		/**pocet obsazenych souboru v baliku*/
		pocetSouboru?: number|null;
	}
	const enum GGdedfilDtoNames { revize = "revize", soubor = "soubor", cesta = "cesta", crc = "crc", velikost = "velikost", soubor_h = "soubor_h", alg_h = "alg_h", verze = "verze", antivir_result = "antivir_result", pocetSouboru = "pocetSouboru",}
	const enum GGdedfilDtoFragments { revize = "*", soubor = "*", cesta = "*", crc = "*", velikost = "*", soubor_h = "*", alg_h = "*", verze = "*", antivir_result = "*", pocetSouboru = "*",}
	const enum GGdedfilDtoTypes { revize = "string", soubor = "string", cesta = "string", crc = "number", velikost = "number", soubor_h = "string", alg_h = "string", verze = "string", antivir_result = "string", pocetSouboru = "number",}
	const enum GGdedfilDtoTypeLengths { revize = 30, soubor = 100, cesta = 100, soubor_h = 254, alg_h = 100, verze = 254, antivir_result = 4000,}
	/**DBTABLE:gdelodr - Inbox revizí (logování záznamů)*/
	interface GGdelodrDto {
		/**DBCOLUMN:gdelodr.soubor - Název souboru*/
		soubor?: string|null;
		/**DBCOLUMN:gdelodr.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gdelodr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdelodr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGdelodrDtoNames { soubor = "soubor", velikost = "velikost", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGdelodrDtoFragments { soubor = "*", velikost = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGdelodrDtoTypes { soubor = "string", velikost = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGdelodrDtoTypeLengths { soubor = 254, zmenu_prov = 12,}
	/**GGdelrevDto - Dto s informacemi o stahování revizí*/
	interface GGdelrevDto {
		/**DBCOLUMN:gdelrev.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdelrev.revize*/
		revize?: string|null;
		/**DBCOLUMN:gdelrev.zpus_staz_rev*/
		zpus_staz_rev?: number|null;
		/**DBCOLUMN:gdeczsr.zpus_staz_rev_txt*/
		zpus_staz_rev_txt?: string|null;
		/**ID instance databáze v rámci které bylo stažení realizováno - nemusí to být ale ostrá databáze zákazníka. Může to být dokonce pouze maketa zákazníka se stejnou LIC databáze*/
		db_guid?: string|null;
		/**Zatím není plněna správně - zatím tam dávám servername*/
		ip_adr?: string|null;
		/**Jméno stanice, na kterpou se distribuční balík stahuje*/
		pc_name?: string|null;
		/**Zatím není plněna správně - zatím tam dávám db_name*/
		domena?: string|null;
		/**Zatím tam dávám login do stanice na kterou se stahuje*/
		nazev_rf?: string|null;
		/**Čas akce*/
		dat_zmena?: JsonDate|null;
		/**Plní se zatím konstanta 0000SZ000007*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdelrevDtoNames { lic = "lic", revize = "revize", zpus_staz_rev = "zpus_staz_rev", zpus_staz_rev_txt = "zpus_staz_rev_txt", db_guid = "db_guid", ip_adr = "ip_adr", pc_name = "pc_name", domena = "domena", nazev_rf = "nazev_rf", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdelrevDtoFragments { lic = "*", revize = "*", zpus_staz_rev = "*", zpus_staz_rev_txt = "*", db_guid = "*", ip_adr = "*", pc_name = "*", domena = "*", nazev_rf = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdelrevDtoTypes { lic = "string", revize = "string", zpus_staz_rev = "number", zpus_staz_rev_txt = "string", db_guid = "string", ip_adr = "string", pc_name = "string", domena = "string", nazev_rf = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdelrevDtoTypeLengths { lic = 4, revize = 30, zpus_staz_rev_txt = 100, db_guid = 36, ip_adr = 254, pc_name = 254, domena = 254, nazev_rf = 200, zmenu_prov = 12, zmenil = 100,}
	/**GGdelrerDto - Dto s informacemi o stahování revizí z Registru revizí*/
	interface GGdelrerDto {
		/**DBCOLUMN:gdelrev.revize*/
		revize?: string|null;
		/**Čas akce*/
		dat_zmena?: JsonDate|null;
		/**Plní se zatím konstanta 0000SZ000007*/
		zmenu_prov?: string|null;
		/**Název autora změny*/
		zmenil?: string|null;
	}
	const enum GGdelrerDtoNames { revize = "revize", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenil = "zmenil",}
	const enum GGdelrerDtoFragments { revize = "*", dat_zmena = "*", zmenu_prov = "*", zmenil = "*",}
	const enum GGdelrerDtoTypes { revize = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenil = "string",}
	const enum GGdelrerDtoTypeLengths { revize = 30, zmenu_prov = 12, zmenil = 100,}
	/**GBulkEditRevizeDto - DTO s informacemi o hrmadné operaci nad seznamem revizí*/
	interface GBulkEditRevizeDto {
		/**Povoleni menit stav revizí*/
		stav_revize_enable?: boolean|null;
		/**Povoleni přidat nový popis změny k revizi*/
		novy_popis_enable?: boolean|null;
		/**Povoleni navazat existujici popis zmeny k revizi*/
		navazat_popis_enable?: boolean|null;
		/**Stav revize (0 = Doporučená / 10 = Betatest / 20 = Alfatest / 30 = Příprava / 50 = Nedoporučená, k omezenému použití / 90 = Zakázaná)*/
		stav_revize?: number|null;
		/**
		*     Pole identikátorů popisů změn
		*     
		*/
		fieldIxsKmp?: string[]|null;
	}
	const enum GBulkEditRevizeDtoNames { stav_revize_enable = "stav_revize_enable", novy_popis_enable = "novy_popis_enable", navazat_popis_enable = "navazat_popis_enable", stav_revize = "stav_revize", fieldIxsKmp = "fieldIxsKmp",}
	const enum GBulkEditRevizeDtoFragments { stav_revize_enable = "*", novy_popis_enable = "*", navazat_popis_enable = "*", stav_revize = "*", fieldIxsKmp = "*",}
	const enum GBulkEditRevizeDtoTypes { stav_revize_enable = "boolean", novy_popis_enable = "boolean", navazat_popis_enable = "boolean", stav_revize = "number", fieldIxsKmp = "string[]",}
	const enum GBulkEditRevizeDtoTypeLengths {}
	/**GAutTestDto - DTO s údaji o automatickém testování revize*/
	interface GAutTestDto {
		/**Revize distribučních balíků aplikací, sestav, dokumentace a helpů*/
		Revision?: string|null;
		/**Identifikátor automatického testu*/
		Id?: string|null;
		/**Zjištěný stav automatického testu*/
		State?: string|null;
		/**Počátek automatického testu*/
		StartTime?: JsonDate|null;
		/**Délka trvání automatického testu*/
		RunTime?: JsonDecimal|null;
		/**Konec automatického testu*/
		EndTime?: JsonDate|null;
		/**Čas Požadaveu na automatický test*/
		RequestTime?: JsonDate|null;
		/**Modul testované revize*/
		Module?: string|null;
		/**Kód ukončení testu*/
		ExitCode?: number|null;
		/**Váha priority vykonání testu*/
		Weight?: number|null;
		/**Verze testovací databáze*/
		DBVersion?: number|null;
		/**Subverze testovací databáze*/
		SubversionDB?: number|null;
		/**Revize testovací databáze*/
		RevisionDB?: number|null;
		/**Licence testovací databáze*/
		License?: string|null;
		/**Emailová adresa zadavatele testu*/
		Mail?: string|null;
		/**Cfu licence DB*/
		Cfu?: string[]|null;
	}
	const enum GAutTestDtoNames { Revision = "Revision", Id = "Id", State = "State", StartTime = "StartTime", RunTime = "RunTime", EndTime = "EndTime", RequestTime = "RequestTime", Module = "Module", ExitCode = "ExitCode", Weight = "Weight", DBVersion = "DBVersion", SubversionDB = "SubversionDB", RevisionDB = "RevisionDB", License = "License", Mail = "Mail", Cfu = "Cfu",}
	const enum GAutTestDtoFragments { Revision = "*", Id = "*", State = "*", StartTime = "*", RunTime = "*", EndTime = "*", RequestTime = "*", Module = "*", ExitCode = "*", Weight = "*", DBVersion = "*", SubversionDB = "*", RevisionDB = "*", License = "*", Mail = "*", Cfu = "*",}
	const enum GAutTestDtoTypes { Revision = "string", Id = "string", State = "string", StartTime = "JsonDate", RunTime = "JsonDecimal", EndTime = "JsonDate", RequestTime = "JsonDate", Module = "string", ExitCode = "number", Weight = "number", DBVersion = "number", SubversionDB = "number", RevisionDB = "number", License = "string", Mail = "string", Cfu = "string[]",}
	const enum GAutTestDtoTypeLengths { Revision = 30, Id = 254, State = 100, Module = 10, License = 10, Mail = 256,}
	/**
	*     Povinné položky filtru pro seznam doporučených revizí
	*     
	*/
	const enum GListDoporucenychReviziFilterEnum {
		/**
		*     licenci databáze - povinný filtr
		*     
		*/
		lic,
		/**
		*     verze databáze - povinný filtr
		*     
		*/
		verze_db,
		/**
		*     sub verze databáze - povinný filtr
		*     
		*/
		sub_verze_db,
		/**
		*     Písmeno zákazníka  - povinný filtr - očekává se výčet
		*     
		*/
		tyi,
		/**
		*     ID instance databáze - slouží pro filtr přes správcem povolené vazby databáze na revizi
		*     https://phabricator.gordic.cz/T5332
		*     
		*/
		db_guid,
		/**
		*     Filtrační podmínka, zda se mají zobrazovat pouze tzv. doporučené:
		*     https://phabricator.gordic.cz/T5332
		*     
		*/
		doporucene,
		/**
		*     Nepovinný parametr na fáze
		*     
		*/
		faze,
		/**
		*     Nepovinný parametr na nadřízené fáze GSAPOK01 je nadřízaná např. k GSAPOKS1
		*     
		*/
		nadFaze,
		/**
		*     Typ distribučního balíku - odpovídá hodnotě GRevize.TypRevize
		*     Může se jednat o pole písmen obsahující následující možná písměna {S, D, H, N } - odpovídají předposlednímu písmenu ve fázi
		*     N - jako number 
		*     
		*/
		typRevize,
		/**
		*     Typ filtru na revizi - očekává se pouze filtr typu LIKE na část textu revize
		*     
		*/
		revize,
		/**
		*     filtr na modul (typ revize) - nepovinny filtr
		*     
		*/
		modul,
		/**
		*     filtr na sestavy (typ revize) - nepovinny filtr
		*     
		*/
		sestavy,
		/**
		*     filtr na help (typ revize) - nepovinny filtr
		*     
		*/
		help,
		/**
		*     filtr na dokumentace (typ revize) - nepovinny filtr
		*     
		*/
		dokumentace,
		/**
		*     filtr revize betatest (stav revize) - nepovinny filtr, ref T34812
		*     
		*/
		betatest,
		/**
		*     Revize databáze - třetí nejnižší složka verze databáze
		*     
		*/
		revize_adz,
		/**
		*     Identifikator skupiny databaze
		*     
		*/
		ixs_sdb,
	}
	/**
	*     filter pro reader dostupnych licenci
	*     
	*/
	const enum GReaderDostupneVerzeRevizeFilterEnum {
		/**
		*     Licence databaze
		*     
		*/
		lic,
		/**
		*     subverze databaze
		*     
		*/
		verze_db,
		/**
		*     subverze databaze
		*     
		*/
		sub_verze_db,
	}
	/**
	*     Možné položky filtru pro seznam revizí
	*     
	*/
	const enum GSeznamReviziFilterEnum {
		/**
		*     filtr pro fazi revize
		*     
		*/
		faze,
		/**
		*     filtr pro rozsah revize
		*     
		*/
		dat_zmena,
		/**
		*     filtr pro datum revokace
		*     
		*/
		dat_revoke,
		/**
		*     filtr pro verzi revize
		*     
		*/
		verze,
		/**
		*     filtr pro stav revize
		*     
		*/
		stav_revize,
		/**
		*     filtr pro stav revize - textově
		*     
		*/
		stav_revize_txt,
		/**
		*     filtr pro vybrane revize z detailu revizi
		*     
		*/
		revize,
		/**
		*     filtr pro verejnou poznamku
		*     
		*/
		poznamka,
		/**
		*     filtr pro interní poznamku
		*     
		*/
		interni_popis,
		/**
		*     filtr pro revize typu T
		*     
		*/
		revize_typ_t,
		/**
		*     filtr pro revize nejnovejsi k testovani	- alfatest
		*     
		*/
		revize_nejnovejsi_alfatest,
		/**
		*     filtr pro revize nejnovejsi k testovani	- betatest
		*     
		*/
		revize_nejnovejsi_betatest,
		/**
		*     filtr pro souvisejici faze k programove fazi
		*     
		*/
		faze_souvisejici,
		/**
		*     filtr pro vlastni (autorovy) revize
		*     
		*/
		revize_vlastni,
		/**
		*     filtr pro revize archivní a stabilní
		*     
		*/
		revize_archivni_stabilni,
		/**filtr pro azure slot - vrátí za každou fázi maximální potřebnou revizi ( možné položky filtru jsou: 'pro_alfa' / 'pro_beta' / 'production' / 'stable')*/
		azure_slot,
		/**
		*     filtr na distribuční soubor
		*     
		*/
		soubor,
		/**
		*     filtr na cestu uvdějící obsah distribučního souboru
		*     
		*/
		cesta,
		/**
		*     filtr na licenci databáze
		*     
		*/
		lic,
	}
	/**
	*     Možné položky filtru pro seznam revizí
	*     
	*/
	const enum GRevizeProLicDBFilterEnum {
		/**
		*     licence databaze
		*     
		*/
		lic,
		/**
		*     filtr pro fazi revize
		*     
		*/
		faze,
		/**
		*     filtr pro verzi DB
		*     
		*/
		verze_db,
		/**
		*     filtr pro sub verzi DB
		*     
		*/
		sub_verze_db,
		/**
		*     filtr pro vybrane revize z detailu revizi
		*     
		*/
		revize,
		/**
		*     filtr na modul (typ revize) - nepovinny filtr
		*     
		*/
		modul,
		/**
		*     filtr na sestavy (typ revize) - nepovinny filtr
		*     
		*/
		sestavy,
		/**
		*     filtr na help (typ revize) - nepovinny filtr
		*     
		*/
		help,
		/**
		*     filtr na dokumentace (typ revize) - nepovinny filtr
		*     
		*/
		dokumentace,
		/**
		*     filtr na betatestované revize
		*     
		*/
		betatest,
	}
	/**
	*     Možné položky pro Azure Slot
	*     
	*/
	const enum GRevizeAzureSlotEnum {
		/**
		*     Azure slot Produkční - Alfatest
		*     
		*/
		pro_alfa,
		/**
		*     Azure slot Produkční - Betatest
		*     
		*/
		pro_beta,
		/**
		*     Azure slot Produkční
		*     
		*/
		production,
		/**
		*     Azure slot Stable
		*     
		*/
		stable,
	}
	/**
	*     Možné položky filtru pro utomatické testování revize
	*     
	*/
	const enum GAutTestFilterEnum {
		/**
		*     ID testu
		*     
		*/
		id,
	}
	/**
	*     Možné položky filtru pro databázové profily
	*     
	*/
	const enum GDbProfileFilterEnum {
		/**
		*     Ostrá (produkční) databáze
		*     
		*/
		gdev,
		/**
		*     Vývojová (testovací) databáze
		*     
		*/
		gdev_test,
		/**
		*     Referenční (vzorová) databáze
		*     
		*/
		gdev_vzor,
		/**
		*     Externí (vedlejší) databáze s importovanými údaji o implementacích G0
		*     
		*/
		gdex,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.Interface\Statistiky\IGSpousteniFazi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pozadavek na Spousteni fazi*/
	interface SpousteniFazi {
		/**Metoda List pro seznam Spousteni fazi*/
		listSpousteniFazi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Adt.Interface.GGdelfazDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SpousteniFazi: ServiceBase & Catalog.SpousteniFazi;
	}
	const SpousteniFazi: Client["SpousteniFazi"];
}
declare namespace Gordic.Adt.Interface {
	/**DBTABLE:gdelfaz*/
	interface GGdelfazDto {
		/**DBCOLUMN:gdelfaz.log_name*/
		log_name?: string|null;
		/**DBCOLUMN:gdelfaz.lic*/
		lic?: string|null;
		/**DBCOLUMN:gdelfaz.nazev*/
		nazev_databaze?: string|null;
		/**DBCOLUMN:gdelfaz.faze*/
		faze?: string|null;
		/**DBCOLUMN:gdelfaz.nazev_faze*/
		nazev_faze?: string|null;
		/**DBCOLUMN:gdelfaz.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:gdelfaz.dat_login_max*/
		dat_login_max?: JsonDate|null;
		/**DBCOLUMN:gdelfaz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdelfaz.verze_databaze*/
		verze_databaze?: string|null;
		/**DBCOLUMN:gdelfaz.priz_d*/
		priz_d?: number|null;
		/**DBCOLUMN:gdelfaz.priz_max*/
		priz_max?: number|null;
	}
	const enum GGdelfazDtoNames { log_name = "log_name", lic = "lic", nazev_databaze = "nazev_databaze", faze = "faze", nazev_faze = "nazev_faze", pocet = "pocet", dat_login_max = "dat_login_max", dat_zmena = "dat_zmena", verze_databaze = "verze_databaze", priz_d = "priz_d", priz_max = "priz_max",}
	const enum GGdelfazDtoFragments { log_name = "*", lic = "*", nazev_databaze = "*", faze = "*", nazev_faze = "*", pocet = "*", dat_login_max = "*", dat_zmena = "*", verze_databaze = "*", priz_d = "*", priz_max = "*",}
	const enum GGdelfazDtoTypes { log_name = "string", lic = "string", nazev_databaze = "string", faze = "string", nazev_faze = "string", pocet = "number", dat_login_max = "JsonDate", dat_zmena = "JsonDate", verze_databaze = "string", priz_d = "number", priz_max = "number",}
	/**Možné položky filtru pro seznam ulohy Statistika fazi*/
	const enum GSpousteniFaziFilterEnum {
		/**filtr na licenci databaze*/
		lic,
		/**filtr na fazi*/
		faze,
		/**filtr na verzi databaze*/
		verze_databaze,
		/**filtr na provozni databazi*/
		priz_d,
		/**filtr na posledni udaj*/
		priz_max,
		/**filtr pro identifikator ixs_fun*/
		ixsFun,
		/**filtr pro DB paramter adt_user_licenc*/
		userParam,
	}
}

//#endregion

