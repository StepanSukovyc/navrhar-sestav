/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       iissp.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Iissp.Interface\Gordic.Iissp.Interface.csproj
*    created     2026-02-16 14:33:48
*    files       Fidoo\GFidooDto.d.ts
*                Fidoo\IGFidoo.d.ts
*                ISL\Dto\GDavkaZpracovaniStavDto.d.ts
*                ISL\Dto\GDummyDto.d.ts
*                ISL\Dto\GHlaseniDto.d.ts
*                ISL\Dto\GKodDoDto.d.ts
*                ISL\Dto\GPolozkaDto.d.ts
*                ISL\EkisSpPsk\GIisspEkisSpPskRequestDto.d.ts
*                ISL\EkisSpPsk\GIisspEkisSpPskResponseDto.d.ts
*                ISL\EkisSpPsk\IGIisspEkisSpPsk.d.ts
*                ISL\EkisSpPskHistorie\GIisspEkisSpPskHistorieDto.d.ts
*                ISL\EkisSpPskHistorie\IGIisspEkisSpPskHistorie.d.ts
*                ISL\Inbox\GIisspEkisSpCeroRequestDto.d.ts
*                ISL\Inbox\GIisspInboxDto.d.ts
*                ISL\Inbox\GIisspInboxGroupRequestDto.d.ts
*                ISL\Inbox\GIisspInboxHistorieDto.d.ts
*                ISL\Inbox\GIisspInboxHistorieObsahDto.d.ts
*                ISL\Inbox\GIisspInboxObsahDto.d.ts
*                ISL\Inbox\GIisspInboxPermissions.d.ts
*                ISL\Inbox\GIisspInboxPohybyPolozkyRezervaceDto.d.ts
*                ISL\Inbox\GIisspInboxRequestDto.d.ts
*                ISL\Inbox\GIisspInboxResponseDto.d.ts
*                ISL\Inbox\GIisspInboxZpravaDto.d.ts
*                ISL\Inbox\GIisspInboxZpravaVystupDto.d.ts
*                ISL\Inbox\GIisspSpEkisStroRequestDto.d.ts
*                ISL\Inbox\GIisspSpEkisStskRequestDto.d.ts
*                ISL\Inbox\IGIisspInbox.d.ts
*                ISL\Rezervace\GIisspRezervaceDto.d.ts
*                ISL\Rezervace\GIisspRezervaceGroupDto.d.ts
*                ISL\Rezervace\IGIisspRezervace.d.ts
*                ISL\RezervaceHistorie\GIisspRezervaceHistorieDto.d.ts
*                ISL\RezervaceHistorie\GIisspRezervaceHistorieShadowDto.d.ts
*                ISL\RezervaceHistorie\IGIisspRezervaceHistorie.d.ts
*                ISL\RezervacePripadu\GIisspRezervaceDokladuDto.d.ts
*                ISL\RezervacePripadu\GIisspRezervacePripaduDto.d.ts
*                ISL\RezervacePripadu\GIisspRezervacePripaduGroupDto.d.ts
*                ISL\RezervacePripadu\IGIisspRezervacePripadu.d.ts
*                ISL\StavRezervace\GIisspStavRezervaceDto.d.ts
*                ISL\StavRezervace\GIisspStavRezervacePermissions.d.ts
*                ISL\StavRezervace\GIisspStavRezervacePolozkaDto.d.ts
*                ISL\StavRezervace\GIisspStavRezervacePolozkaHistorieDto.d.ts
*                ISL\StavRezervace\IGIisspStavRezervace.d.ts
*                ISL\TypKomunikace\GIisspTypKomunikaceDto.d.ts
*                ISL\TypKomunikace\IGIisspTypKomunikace.d.ts
*                ISL\Vykaz\GIisspVykazDto.d.ts
*                ISL\Vykaz\GIisspVykazGloDto.d.ts
*                ISL\Vykaz\GIisspVykazNarDto.d.ts
*                ISL\Vykaz\GIisspVykazPermissions.d.ts
*                ISL\Vykaz\GIisspVykazRekDto.d.ts
*                ISL\Vykaz\GIisspVykazTypDto.d.ts
*                ISL\Vykaz\GIisspVykazZukDto.d.ts
*                ISL\Vykaz\IGIisspVykaz.d.ts
*                NapocetCiselniku\IGISLCfuKonfigurace.d.ts
*                NapocetCiselniku\DataSets\GSspdcfm.Dto.d.ts
*                NapocetCiselniku\DataSets\GSspscfm.Dto.d.ts
*                NapocetCiselniku\DataSets\GSspsdac.Dto.d.ts
*                NapocetCiselniku\Dto\GCiselnikDetailFilterDto.d.ts
*                NapocetCiselniku\Dto\GCiselnikIisspFilterDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcfmDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcpaDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcpoDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcprDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcrpDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcstDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcucDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcujDto.d.ts
*                NapocetCiselniku\Dto\GSspsdcuzDto.d.ts
*                NapocetCiselniku\Dto\GSspsdczdDto.d.ts
*                NapocetCiselniku\Dto\GSspsdczjDto.d.ts
*                NapocetCiselniku\Dto\GSspsdczuDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\Fidoo\GFidooDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Fidoo Dto*/
	interface GFidooDto {
		param1?: string|null;
		param2BezApiKey?: string|null;
		oper_id?: number|null;
		ico?: string|null;
		ucs?: string|null;
		rok?: number|null;
		lpc?: number|null;
		ikc?: JsonDecimal|null;
		log_dir?: string|null;
		api_key?: string|null;
		url_api?: string|null;
		path?: string|null;
		owner_id?: string|null;
		from?: string|null;
		to?: string|null;
		last_modify_from?: string|null;
		closed?: string|null;
		state?: string|null;
		limit?: string|null;
		log_text?: string|null;
	}
	const enum GFidooDtoNames { param1 = "param1", param2BezApiKey = "param2BezApiKey", oper_id = "oper_id", ico = "ico", ucs = "ucs", rok = "rok", lpc = "lpc", ikc = "ikc", log_dir = "log_dir", api_key = "api_key", url_api = "url_api", path = "path", owner_id = "owner_id", from = "from", to = "to", last_modify_from = "last_modify_from", closed = "closed", state = "state", limit = "limit", log_text = "log_text",}
	const enum GFidooDtoFragments { param1 = "*", param2BezApiKey = "*", oper_id = "*", ico = "*", ucs = "*", rok = "*", lpc = "*", ikc = "*", log_dir = "*", api_key = "*", url_api = "*", path = "*", owner_id = "*", from = "*", to = "*", last_modify_from = "*", closed = "*", state = "*", limit = "*", log_text = "*",}
	const enum GFidooDtoTypes { param1 = "string", param2BezApiKey = "string", oper_id = "number", ico = "string", ucs = "string", rok = "number", lpc = "number", ikc = "JsonDecimal", log_dir = "string", api_key = "string", url_api = "string", path = "string", owner_id = "string", from = "string", to = "string", last_modify_from = "string", closed = "string", state = "string", limit = "string", log_text = "string",}
	const enum GFidooDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\Fidoo\IGFidoo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Služby rozhraní Fidoo API*/
	interface Fidoo {
		/**Vrácení účtenek - volá externí WS - předtím provádí COMMIT!*/
		getExpensesCommit(rq?:Gordic.Iissp.Interface.GFidooDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GFidooDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GFidooDto>,GServiceActionResponse<Gordic.Iissp.Interface.GFidooDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Fidoo: ServiceBase & Catalog.Fidoo;
	}
	const Fidoo: Client["Fidoo"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Dto\GDavkaZpracovaniStavDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Stav zpracování v IISSP RISRE (součást synchronní odpovědi na INBOX metody)*/
	interface GDavkaZpracovaniStavDto {
		/**Identifikátor zpracování (transakce) v IISSP RISRE*/
		davka_id_zpracovani?: string|null;
		/**Status zpracování - identifikátor
		*     Číselník:
		*     „0“ - Zpracování dávky inicializováno
		*     „1“ - Dávka zařazena do fronty zpracování
		*     „2“ - Zpracování dávky zahájeno
		*     „8“ - Zpracování dávky ukončeno
		*     „9“ - Zpracování dávky ukončeno s chybou
		*/
		davka_status?: string|null;
		/**Status zpracování - text*/
		davka_status_txt?: string|null;
		/**Čas předpokládaného ukončení zpracování*/
		zpracovani_ukonceni_predpokladane_datum_cas?: JsonDate|null;
	}
	const enum GDavkaZpracovaniStavDtoNames { davka_id_zpracovani = "davka_id_zpracovani", davka_status = "davka_status", davka_status_txt = "davka_status_txt", zpracovani_ukonceni_predpokladane_datum_cas = "zpracovani_ukonceni_predpokladane_datum_cas",}
	const enum GDavkaZpracovaniStavDtoFragments { davka_id_zpracovani = "*", davka_status = "*", davka_status_txt = "*", zpracovani_ukonceni_predpokladane_datum_cas = "*",}
	const enum GDavkaZpracovaniStavDtoTypes { davka_id_zpracovani = "string", davka_status = "string", davka_status_txt = "string", zpracovani_ukonceni_predpokladane_datum_cas = "JsonDate",}
	const enum GDavkaZpracovaniStavDtoTypeLengths { davka_id_zpracovani = 32, davka_status = 1, davka_status_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Dto\GDummyDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Pomocné prázdné Dto*/
	interface GDummyDto {
	}
	const enum GDummyDtoNames {}
	const enum GDummyDtoFragments {}
	const enum GDummyDtoTypes {}
	const enum GDummyDtoTypeLengths {}
	/**Pomocný prázdný filter*/
	const enum GDummyFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Dto\GHlaseniDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Výsledek zpracování v synchronní odpovědi z IISSP (součást ZpracovaniVysledekDto)*/
	interface GHlaseniDto {
		/**Maximální úroveň hlášení, dle významnosti. E - chyba, W - varování, I - informace.*/
		typ_maximum?: string|null;
		/**Položky hlášení*/
		polozka?: Gordic.Iissp.Interface.GPolozkaDto[]|null;
	}
	const enum GHlaseniDtoNames { typ_maximum = "typ_maximum", polozka = "polozka",}
	const enum GHlaseniDtoFragments { typ_maximum = "*", polozka = "*",}
	const enum GHlaseniDtoTypes { typ_maximum = "string", polozka = "Gordic.Iissp.Interface.GPolozkaDto[]",}
	const enum GHlaseniDtoTypeLengths { typ_maximum = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Dto\GKodDoDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dvojice hodnot od - do, např. pro metodu B_EKIS_SP_CERO*/
	interface GKodDoDto {
		/**Pokud je ve výběru pouze element Kod, provede se výběr pouze na danou hodnotu. Max je 24 zn. různé pole mohou mít menší maximum, to se zde nehlídá.*/
		kod?: string|null;
		/**Pokud je ve výběru uveden i element KodDo, provede se výběr na rozsah hodnot elementů Kod (Od) - KodDo (Do).*/
		kod_do?: string|null;
	}
	const enum GKodDoDtoNames { kod = "kod", kod_do = "kod_do",}
	const enum GKodDoDtoFragments { kod = "*", kod_do = "*",}
	const enum GKodDoDtoTypes { kod = "string", kod_do = "string",}
	const enum GKodDoDtoTypeLengths { kod = 24, kod_do = 24,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Dto\GPolozkaDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Položka hlášení v synchronní odpovědi z IISSP (součást ZpracovaniVysledekDto)*/
	interface GPolozkaDto {
		/**Typ hlášení (E - chyba, W - varování, I - informace)*/
		typ?: string|null;
		/**Identifikace (číslo) hlášení. Identifikace hlášení z IISSP RISRE. Poznámka: některé textové popisy hlášení jsou dodatečně generovány a nemají přiřazenu identifikaci.*/
		id?: string|null;
		/**Textový popis hlášení. Povinné pole.*/
		text?: string|null;
	}
	const enum GPolozkaDtoNames { typ = "typ", id = "id", text = "text",}
	const enum GPolozkaDtoFragments { typ = "*", id = "*", text = "*",}
	const enum GPolozkaDtoTypes { typ = "string", id = "string", text = "string",}
	const enum GPolozkaDtoTypeLengths { typ = 1, id = 40, text = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\EkisSpPsk\GIisspEkisSpPskRequestDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Požadavek na přeúčtování skutečnosti z EKIS do IISSP*/
	interface GIisspEkisSpPskRequestDto {
		/**způsob volání*/
		zpusob_volani?: Gordic.Ginis.DbModel.GIisspZpusobVolaniEnum|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**přeúčtování skutečnosti*/
		psk?: any|null;
	}
	const enum GIisspEkisSpPskRequestDtoNames { zpusob_volani = "zpusob_volani", ico = "ico", ucs = "ucs", psk = "psk",}
	const enum GIisspEkisSpPskRequestDtoFragments { zpusob_volani = "*", ico = "*", ucs = "*", psk = "*",}
	const enum GIisspEkisSpPskRequestDtoTypes { zpusob_volani = "Gordic.Ginis.DbModel.GIisspZpusobVolaniEnum", ico = "string", ucs = "string", psk = "any",}
	const enum GIisspEkisSpPskRequestDtoTypeLengths { ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\EkisSpPsk\GIisspEkisSpPskResponseDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Odpověď na požadavek na přeúčtování skutečnosti z EKIS do IISSP*/
	interface GIisspEkisSpPskResponseDto {
		/**Číslo dokladu přeúčtování skutečnosti v IISSP RISRE*/
		doklad_cislo?: string|null;
		/**Výsledek zpracování*/
		hlaseni?: Gordic.Iissp.Interface.GHlaseniDto|null;
	}
	const enum GIisspEkisSpPskResponseDtoNames { doklad_cislo = "doklad_cislo", hlaseni = "hlaseni",}
	const enum GIisspEkisSpPskResponseDtoFragments { doklad_cislo = "*", hlaseni = "*",}
	const enum GIisspEkisSpPskResponseDtoTypes { doklad_cislo = "string", hlaseni = "Gordic.Iissp.Interface.GHlaseniDto",}
	const enum GIisspEkisSpPskResponseDtoTypeLengths { doklad_cislo = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\EkisSpPsk\IGIisspEkisSpPsk.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro přenášení informací o přeúčtování skutečnosti z OSS (EKIS) do IISSP RISRE*/
	interface IisspEkisSpPsk {
		/**Odeslání požadavku na přeúčtování skutečnosti – provádí Commit!*/
		odeslaniPreuctovaniSkutecnosti(rq?:Gordic.Iissp.Interface.GIisspEkisSpPskRequestDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspEkisSpPskRequestDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspEkisSpPskRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspEkisSpPskResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspEkisSpPsk: ServiceBase & Catalog.IisspEkisSpPsk;
	}
	const IisspEkisSpPsk: Client["IisspEkisSpPsk"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\EkisSpPskHistorie\GIisspEkisSpPskHistorieDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s historií přeúčtování skutečnosti IISSP (směr EKIS to SP)*/
	interface GIisspEkisSpPskHistorieDto {
		/**DBCOLUMN:sspsope.id_volani_ssp*/
		id_volani_ssp?: number|null;
		/**DBCOLUMN:sspsoxp.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:sspsope.vysl_volani*/
		vysl_volani?: number|null;
		/**DBCOLUMN:sspcvys.vysl_volani_txt*/
		vysl_volani_txt?: string|null;
		/**DBCOLUMN:sspsope.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspsofh.doklad_cislo*/
		doklad_cislo?: string|null;
		/**DBCOLUMN:sspsifh.druh*/
		druh?: string|null;
		/**DBCOLUMN:sspsifh.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:sspsifh.datum_od*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:sspsifh.datum*/
		datum?: JsonDate|null;
		/**DBCOLUMN:sspsoxp.typ_hlaseni*/
		typ_hlaseni?: string|null;
		/**DBCOLUMN:sspsoxp.id_hlaseni*/
		id_hlaseni?: string|null;
		/**DBCOLUMN:sspsoxp.text_hlaseni*/
		text_hlaseni?: string|null;
		/**DBCOLUMN:sspsexp.text_chyby*/
		text_chyby?: string|null;
		/**xml request*/
		xml_request?: string|null;
		/**xml response*/
		xml_response?: string|null;
		/**error long message*/
		text_chyby_long?: string|null;
	}
	const enum GIisspEkisSpPskHistorieDtoNames { id_volani_ssp = "id_volani_ssp", por_cis = "por_cis", vysl_volani = "vysl_volani", vysl_volani_txt = "vysl_volani_txt", dat_zmena = "dat_zmena", doklad_cislo = "doklad_cislo", druh = "druh", id_ext = "id_ext", datum_od = "datum_od", datum = "datum", typ_hlaseni = "typ_hlaseni", id_hlaseni = "id_hlaseni", text_hlaseni = "text_hlaseni", text_chyby = "text_chyby", xml_request = "xml_request", xml_response = "xml_response", text_chyby_long = "text_chyby_long",}
	const enum GIisspEkisSpPskHistorieDtoFragments { id_volani_ssp = "*", por_cis = "*", vysl_volani = "*", vysl_volani_txt = "*", dat_zmena = "*", doklad_cislo = "*", druh = "*", id_ext = "*", datum_od = "*", datum = "*", typ_hlaseni = "*", id_hlaseni = "*", text_hlaseni = "*", text_chyby = "*", xml_request = "*", xml_response = "*", text_chyby_long = "*",}
	const enum GIisspEkisSpPskHistorieDtoTypes { id_volani_ssp = "number", por_cis = "number", vysl_volani = "number", vysl_volani_txt = "string", dat_zmena = "JsonDate", doklad_cislo = "string", druh = "string", id_ext = "string", datum_od = "JsonDate", datum = "JsonDate", typ_hlaseni = "string", id_hlaseni = "string", text_hlaseni = "string", text_chyby = "string", xml_request = "string", xml_response = "string", text_chyby_long = "string",}
	const enum GIisspEkisSpPskHistorieDtoTypeLengths { vysl_volani_txt = 254, doklad_cislo = 10, druh = 2, id_ext = 20, typ_hlaseni = 1, id_hlaseni = 40, text_hlaseni = 200, text_chyby = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\EkisSpPskHistorie\IGIisspEkisSpPskHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Aplikační služba pro práci s historií přeúčtování skutečnosti IISSP (směr EKIS to SP)*/
	interface IisspEkisSpPskHistorie {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto>>;
		/**Read*/
		read(rq?:Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspEkisSpPskHistorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspEkisSpPskHistorie: ServiceBase & Catalog.IisspEkisSpPskHistorie;
	}
	const IisspEkisSpPskHistorie: Client["IisspEkisSpPskHistorie"];
}
declare namespace Gordic.Iissp.Interface {
	/**Filtrační parametry pro získání historie volání přeúčtování skutečnosti IISSP (směr EKIS to SP)*/
	const enum GIisspEkisSpPskHistorieFilter {
		/**DBCOLUMN:sspsope.id_volani_ssp*/
		id_volani_ssp,
		/**DBCOLUMN:sspsifh.id_ext*/
		id_ext,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspEkisSpCeroRequestDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Podoba žádosti na předání stavu čerpání rozpočtu za období (směr: EKIS -> IISSP, INBOX)*/
	interface GIisspEkisSpCeroRequestDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**Počáteční datum, od kterého je sestava vytvořena*/
		stav_datum_od?: JsonDate|null;
		/**Rozhodné datum, ke kterému je sestava vytvořena*/
		stav_datum?: JsonDate|null;
		/**Výběr dle finančního místa. Minimálně jedno finanční místo musí být v požadavku uvedeno.*/
		misto_financni?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle zdroje*/
		zdroj?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle paragrafu*/
		paragraf?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle rozpočtové položky*/
		polozka_rozpoctova?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle PVS (příjmová výdajová struktura)*/
		pvs?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle EDS/SMVS/ZED*/
		eds_smvs_akce?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle účelu*/
		ucel?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle záznamové jednotky*/
		jednotka_zaznamova?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle územní jednotky*/
		jednotka_uzemni?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle účelového znaku*/
		znak_ucelovy?: Gordic.Iissp.Interface.GKodDoDto[]|null;
	}
	const enum GIisspEkisSpCeroRequestDtoNames { ico = "ico", ucs = "ucs", stav_datum_od = "stav_datum_od", stav_datum = "stav_datum", misto_financni = "misto_financni", zdroj = "zdroj", paragraf = "paragraf", polozka_rozpoctova = "polozka_rozpoctova", pvs = "pvs", eds_smvs_akce = "eds_smvs_akce", ucel = "ucel", jednotka_zaznamova = "jednotka_zaznamova", jednotka_uzemni = "jednotka_uzemni", znak_ucelovy = "znak_ucelovy",}
	const enum GIisspEkisSpCeroRequestDtoFragments { ico = "*", ucs = "*", stav_datum_od = "*", stav_datum = "*", misto_financni = "*", zdroj = "*", paragraf = "*", polozka_rozpoctova = "*", pvs = "*", eds_smvs_akce = "*", ucel = "*", jednotka_zaznamova = "*", jednotka_uzemni = "*", znak_ucelovy = "*",}
	const enum GIisspEkisSpCeroRequestDtoTypes { ico = "string", ucs = "string", stav_datum_od = "JsonDate", stav_datum = "JsonDate", misto_financni = "Gordic.Iissp.Interface.GKodDoDto[]", zdroj = "Gordic.Iissp.Interface.GKodDoDto[]", paragraf = "Gordic.Iissp.Interface.GKodDoDto[]", polozka_rozpoctova = "Gordic.Iissp.Interface.GKodDoDto[]", pvs = "Gordic.Iissp.Interface.GKodDoDto[]", eds_smvs_akce = "Gordic.Iissp.Interface.GKodDoDto[]", ucel = "Gordic.Iissp.Interface.GKodDoDto[]", jednotka_zaznamova = "Gordic.Iissp.Interface.GKodDoDto[]", jednotka_uzemni = "Gordic.Iissp.Interface.GKodDoDto[]", znak_ucelovy = "Gordic.Iissp.Interface.GKodDoDto[]",}
	const enum GIisspEkisSpCeroRequestDtoTypeLengths { ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP*/
	interface GIisspInboxDto {
		/**DBCOLUMN:sspsinb.id_inbox_ssp*/
		id_inbox_ssp?: number|null;
		/**DBCOLUMN:sspcsts.priz_detail*/
		id_inbox_user?: number|null;
		/**DBCOLUMN:sspsinb.id_inbox_ext*/
		id_inbox_ext?: string|null;
		/**DBCOLUMN:sspsinb.id_inbox_ris*/
		id_inbox_ris?: string|null;
		/**DBCOLUMN:sspsinb.metoda_iissp*/
		metoda_iissp?: number|null;
		/**zkratka metody 1. část, DBCOLUMN:sspcmet.metoda_zkr*/
		metoda_zkr?: string|null;
		/**zkratka metody 2. část, DBCOLUMN:sspcsts.stsk_typ_zkr*/
		stsk_typ_zkr?: string|null;
		/**popis STSK metody, DBCOLUMN:sspcsts.stsk_typ_txt*/
		stsk_typ_txt?: string|null;
		/**DBCOLUMN:sspcsts.priz_detail*/
		priz_detail?: number|null;
		/**text pro DBCOLUMN:sspcsts.priz_detail*/
		priz_detail_txt?: string|null;
		/**DBCOLUMN:sspsinb.status_inbox*/
		status_inbox?: number|null;
		/**DBCOLUMN:sspcsin.status_inbox_txt*/
		status_inbox_txt?: string|null;
		/**DBCOLUMN:sspcsin.status_inbox_zkr*/
		status_inbox_zkr?: string|null;
		/**DBCOLUMN:sspsinb.dat_stav_od*/
		dat_stav_od?: JsonDate|null;
		/**DBCOLUMN:sspsinb.dat_stav*/
		dat_stav?: JsonDate|null;
		/**DBCOLUMN:sspsinb.dat_ukonceni*/
		dat_ukonceni?: JsonDate|null;
		/**DBCOLUMN:sspsinb.dat_zadal*/
		dat_zadal?: JsonDate|null;
		/**DBCOLUMN:sspsinb.pocet_zprav*/
		pocet_zprav?: number|null;
		/**DBCOLUMN:ginszmp.nazev_rf*/
		zadal_nazev_rf?: string|null;
		/**DBCOLUMN:sspsinb.dat_prevzal*/
		dat_prevzal?: JsonDate|null;
		/**DBCOLUMN:sspsinb.zmenu_prov_prevzal*/
		prevzal_nazev_rf?: string|null;
		/**DBCOLUMN:sspsinb.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:sspsinb.isp_fim_do*/
		isp_fim_do?: string|null;
		/**Číslo rezervace*/
		rezervace_cislo?: string|null;
		/**Číslo rezervace do*/
		rezervace_cislo_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:sspsinb.isp_zdr_do*/
		isp_zdr_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:sspsinb.isp_par_do*/
		isp_par_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_pol*/
		isp_pol?: string|null;
		/**DBCOLUMN:sspsinb.isp_pol_do*/
		isp_pol_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:sspsinb.isp_pvs_do*/
		isp_pvs_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:sspsinb.isp_eds_do*/
		isp_eds_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:sspsinb.isp_ucl_do*/
		isp_ucl_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:sspsinb.isp_zj_do*/
		isp_zj_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:sspsinb.isp_uj_do*/
		isp_uj_do?: string|null;
		/**DBCOLUMN:sspsinb.isp_uz*/
		isp_uz?: string|null;
		/**DBCOLUMN:sspsinb.isp_uz_do*/
		isp_uz_do?: string|null;
		/**filtrace podle IK*/
		filtrace?: string|null;
		priz_vyzvednuto?: boolean|null;
		priz_chybne?: boolean|null;
		/**Oprávnění*/
		Permissions?: Gordic.Iissp.Interface.GIisspInboxPermissions|null;
		/**Zda vrátit i výkazy*/
		priz_vykazy?: boolean|null;
	}
	const enum GIisspInboxDtoNames { id_inbox_ssp = "id_inbox_ssp", id_inbox_user = "id_inbox_user", id_inbox_ext = "id_inbox_ext", id_inbox_ris = "id_inbox_ris", metoda_iissp = "metoda_iissp", metoda_zkr = "metoda_zkr", stsk_typ_zkr = "stsk_typ_zkr", stsk_typ_txt = "stsk_typ_txt", priz_detail = "priz_detail", priz_detail_txt = "priz_detail_txt", status_inbox = "status_inbox", status_inbox_txt = "status_inbox_txt", status_inbox_zkr = "status_inbox_zkr", dat_stav_od = "dat_stav_od", dat_stav = "dat_stav", dat_ukonceni = "dat_ukonceni", dat_zadal = "dat_zadal", pocet_zprav = "pocet_zprav", zadal_nazev_rf = "zadal_nazev_rf", dat_prevzal = "dat_prevzal", prevzal_nazev_rf = "prevzal_nazev_rf", isp_fim = "isp_fim", isp_fim_do = "isp_fim_do", rezervace_cislo = "rezervace_cislo", rezervace_cislo_do = "rezervace_cislo_do", isp_zdr = "isp_zdr", isp_zdr_do = "isp_zdr_do", isp_par = "isp_par", isp_par_do = "isp_par_do", isp_pol = "isp_pol", isp_pol_do = "isp_pol_do", isp_pvs = "isp_pvs", isp_pvs_do = "isp_pvs_do", isp_eds = "isp_eds", isp_eds_do = "isp_eds_do", isp_ucl = "isp_ucl", isp_ucl_do = "isp_ucl_do", isp_zj = "isp_zj", isp_zj_do = "isp_zj_do", isp_uj = "isp_uj", isp_uj_do = "isp_uj_do", isp_uz = "isp_uz", isp_uz_do = "isp_uz_do", filtrace = "filtrace", priz_vyzvednuto = "priz_vyzvednuto", priz_chybne = "priz_chybne", Permissions = "Permissions", priz_vykazy = "priz_vykazy",}
	const enum GIisspInboxDtoFragments { id_inbox_ssp = "*", id_inbox_user = "*", id_inbox_ext = "*", id_inbox_ris = "*", metoda_iissp = "*", metoda_zkr = "*", stsk_typ_zkr = "*", stsk_typ_txt = "*", priz_detail = "*", priz_detail_txt = "*", status_inbox = "*", status_inbox_txt = "*", status_inbox_zkr = "*", dat_stav_od = "*", dat_stav = "*", dat_ukonceni = "*", dat_zadal = "*", pocet_zprav = "*", zadal_nazev_rf = "*", dat_prevzal = "*", prevzal_nazev_rf = "*", isp_fim = "*", isp_fim_do = "*", rezervace_cislo = "*", rezervace_cislo_do = "*", isp_zdr = "*", isp_zdr_do = "*", isp_par = "*", isp_par_do = "*", isp_pol = "*", isp_pol_do = "*", isp_pvs = "*", isp_pvs_do = "*", isp_eds = "*", isp_eds_do = "*", isp_ucl = "*", isp_ucl_do = "*", isp_zj = "*", isp_zj_do = "*", isp_uj = "*", isp_uj_do = "*", isp_uz = "*", isp_uz_do = "*", filtrace = "*", priz_vyzvednuto = "*", priz_chybne = "*", Permissions = "*", priz_vykazy = "*",}
	const enum GIisspInboxDtoTypes { id_inbox_ssp = "number", id_inbox_user = "number", id_inbox_ext = "string", id_inbox_ris = "string", metoda_iissp = "number", metoda_zkr = "string", stsk_typ_zkr = "string", stsk_typ_txt = "string", priz_detail = "number", priz_detail_txt = "string", status_inbox = "number", status_inbox_txt = "string", status_inbox_zkr = "string", dat_stav_od = "JsonDate", dat_stav = "JsonDate", dat_ukonceni = "JsonDate", dat_zadal = "JsonDate", pocet_zprav = "number", zadal_nazev_rf = "string", dat_prevzal = "JsonDate", prevzal_nazev_rf = "string", isp_fim = "string", isp_fim_do = "string", rezervace_cislo = "string", rezervace_cislo_do = "string", isp_zdr = "string", isp_zdr_do = "string", isp_par = "string", isp_par_do = "string", isp_pol = "string", isp_pol_do = "string", isp_pvs = "string", isp_pvs_do = "string", isp_eds = "string", isp_eds_do = "string", isp_ucl = "string", isp_ucl_do = "string", isp_zj = "string", isp_zj_do = "string", isp_uj = "string", isp_uj_do = "string", isp_uz = "string", isp_uz_do = "string", filtrace = "string", priz_vyzvednuto = "boolean", priz_chybne = "boolean", Permissions = "Gordic.Iissp.Interface.GIisspInboxPermissions", priz_vykazy = "boolean",}
	const enum GIisspInboxDtoTypeLengths { id_inbox_ext = 30, id_inbox_ris = 32, metoda_zkr = 50, stsk_typ_zkr = 50, stsk_typ_txt = 50, priz_detail_txt = 25, status_inbox_txt = 100, status_inbox_zkr = 50, zadal_nazev_rf = 200, prevzal_nazev_rf = 200, isp_fim = 16, isp_fim_do = 16, rezervace_cislo = 10, rezervace_cislo_do = 10, isp_zdr = 10, isp_zdr_do = 10, isp_par = 16, isp_par_do = 16, isp_pol = 24, isp_pol_do = 24, isp_pvs = 10, isp_pvs_do = 10, isp_eds = 15, isp_eds_do = 15, isp_ucl = 9, isp_ucl_do = 9, isp_zj = 3, isp_zj_do = 3, isp_uj = 6, isp_uj_do = 6, isp_uz = 7, isp_uz_do = 7, filtrace = 1000,}
	/**Filtrační parametry pro získání záznamů Inboxu*/
	const enum GIisspInboxFilter {
		id_inbox_ssp,
		priz_vyzvednuto,
		priz_chybne,
		priz_vykazy,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxGroupRequestDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - vstup pro hromadné operace*/
	interface GIisspInboxGroupRequestDto {
		/**id_inbox_ssp - list*/
		id_inbox_ssp_group?: number[]|null;
	}
	const enum GIisspInboxGroupRequestDtoNames { id_inbox_ssp_group = "id_inbox_ssp_group",}
	const enum GIisspInboxGroupRequestDtoFragments { id_inbox_ssp_group = "*",}
	const enum GIisspInboxGroupRequestDtoTypes { id_inbox_ssp_group = "number[]",}
	const enum GIisspInboxGroupRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxHistorieDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - historie*/
	interface GIisspInboxHistorieDto {
		/**id_inbox_ssp*/
		id_inbox_ssp?: number|null;
		/**# - id volání IISSP*/
		id_volani_ssp?: number|null;
		/**Datum volání - datum a čas volání metody*/
		dat_start?: JsonDate|null;
		/**Metoda - volaná IISSP metoda*/
		metoda_iissp_txt?: string|null;
		/**Výsledek volání*/
		vysl_volani_txt?: string|null;
		/**Typ - hlášení z IISSP*/
		typ_hlaseni?: string|null;
		/**Text - hlášení z IISSP*/
		text_hlaseni?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Provedl - volání provedeno uživatelem*/
		zmenu_prov_txt?: string|null;
	}
	const enum GIisspInboxHistorieDtoNames { id_inbox_ssp = "id_inbox_ssp", id_volani_ssp = "id_volani_ssp", dat_start = "dat_start", metoda_iissp_txt = "metoda_iissp_txt", vysl_volani_txt = "vysl_volani_txt", typ_hlaseni = "typ_hlaseni", text_hlaseni = "text_hlaseni", poznamka = "poznamka", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GIisspInboxHistorieDtoFragments { id_inbox_ssp = "*", id_volani_ssp = "*", dat_start = "*", metoda_iissp_txt = "*", vysl_volani_txt = "*", typ_hlaseni = "*", text_hlaseni = "*", poznamka = "*", zmenu_prov_txt = "*",}
	const enum GIisspInboxHistorieDtoTypes { id_inbox_ssp = "number", id_volani_ssp = "number", dat_start = "JsonDate", metoda_iissp_txt = "string", vysl_volani_txt = "string", typ_hlaseni = "string", text_hlaseni = "string", poznamka = "string", zmenu_prov_txt = "string",}
	const enum GIisspInboxHistorieDtoTypeLengths { metoda_iissp_txt = 50, vysl_volani_txt = 254, typ_hlaseni = 1, text_hlaseni = 200, poznamka = 1000, zmenu_prov_txt = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxHistorieObsahDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - obsah řádku historie*/
	interface GIisspInboxHistorieObsahDto {
		/**id volání IISSP*/
		id_volani_ssp?: number|null;
		/**Vstupní XML request*/
		vstup?: string|null;
		/**Výstupní XML response nebo text výjimky, když došlo k chybě.*/
		vystup?: string|null;
		/**Status, E: chyba, W: warning, I: informace (=OK)*/
		status?: string|null;
	}
	const enum GIisspInboxHistorieObsahDtoNames { id_volani_ssp = "id_volani_ssp", vstup = "vstup", vystup = "vystup", status = "status",}
	const enum GIisspInboxHistorieObsahDtoFragments { id_volani_ssp = "*", vstup = "*", vystup = "*", status = "*",}
	const enum GIisspInboxHistorieObsahDtoTypes { id_volani_ssp = "number", vstup = "string", vystup = "string", status = "string",}
	const enum GIisspInboxHistorieObsahDtoTypeLengths { status = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxObsahDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - obsah*/
	interface GIisspInboxObsahDto {
		id_inbox_ssp?: number|null;
		/**Vstupní XML request*/
		vstup?: string|null;
		/**Seznam zpráv*/
		zpravy?: Gordic.Iissp.Interface.GIisspInboxZpravaDto[]|null;
		/**Jedná-li se o výstup ze zprávy, bude to první zpráva z Listu zpravy a pro jistotu její id je zde*/
		vystup_zprava_id?: string|null;
		/**Výstupní XML response nebo text výjimky, když došlo k chybě.*/
		vystup?: string|null;
		/**Status výstupu, E: chyba, W: warning, I: informace (=OK)*/
		status?: string|null;
	}
	const enum GIisspInboxObsahDtoNames { id_inbox_ssp = "id_inbox_ssp", vstup = "vstup", zpravy = "zpravy", vystup_zprava_id = "vystup_zprava_id", vystup = "vystup", status = "status",}
	const enum GIisspInboxObsahDtoFragments { id_inbox_ssp = "*", vstup = "*", zpravy = "*", vystup_zprava_id = "*", vystup = "*", status = "*",}
	const enum GIisspInboxObsahDtoTypes { id_inbox_ssp = "number", vstup = "string", zpravy = "Gordic.Iissp.Interface.GIisspInboxZpravaDto[]", vystup_zprava_id = "string", vystup = "string", status = "string",}
	const enum GIisspInboxObsahDtoTypeLengths { vystup_zprava_id = 32, status = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxPermissions.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Permissions nad řádkem Inboxu IISSP*/
	interface GIisspInboxPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Dostupnost akce*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost akce*/
		LzeStorno: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GIisspInboxPermissionsNames { LzePrevzit = "LzePrevzit", LzeStorno = "LzeStorno",}
	const enum GIisspInboxPermissionsFragments { LzePrevzit = "*", LzeStorno = "*",}
	const enum GIisspInboxPermissionsTypes { LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeStorno = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GIisspInboxPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxPohybyPolozkyRezervaceDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Filtrační parametry pro práci s Inbox Pohyby položky rezervace v IISSP*/
	const enum GIisspInboxPohybyPolozkyRezervaceFilter {
		id_volani_ssp,
		radek_ik,
		radek_pol,
	}
	/**Dto pro práci s Inbox Pohyby položky rezervace v IISSP*/
	interface GIisspInboxPohybyPolozkyRezervaceDto {
		/**DBCOLUMN:sspsokr.id_volani_ssp*/
		id_volani_ssp?: number|null;
		/**DBCOLUMN:sspsokr.radek_ik*/
		radek_ik?: number|null;
		/**DBCOLUMN:sspsokr.radek_pol*/
		radek_pol?: number|null;
		/**DBCOLUMN:sspsokr.radek_pohyb*/
		radek_pohyb?: number|null;
		/**DBCOLUMN:sspsokr.id_doklad*/
		id_doklad?: string|null;
		/**DBCOLUMN:sspsokr.dat_doklad*/
		dat_doklad?: JsonDate|null;
		/**DBCOLUMN:sspsokr.dat_rad_iissp*/
		dat_rad_iissp?: JsonDate|null;
		/**DBCOLUMN:sspsokr.c_platba*/
		c_platba?: JsonDecimal|null;
		/**DBCOLUMN:sspsokr.mena_c_platba*/
		mena_c_platba?: string|null;
		/**DBCOLUMN:sspsokr.c_bvypis*/
		c_bvypis?: JsonDecimal|null;
		/**DBCOLUMN:sspsokr.mena_c_bvypis*/
		mena_c_bvypis?: string|null;
		/**DBCOLUMN:sspsokr.c_psk*/
		c_psk?: JsonDecimal|null;
		/**DBCOLUMN:sspsokr.mena_c_psk*/
		mena_c_psk?: string|null;
	}
	const enum GIisspInboxPohybyPolozkyRezervaceDtoNames { id_volani_ssp = "id_volani_ssp", radek_ik = "radek_ik", radek_pol = "radek_pol", radek_pohyb = "radek_pohyb", id_doklad = "id_doklad", dat_doklad = "dat_doklad", dat_rad_iissp = "dat_rad_iissp", c_platba = "c_platba", mena_c_platba = "mena_c_platba", c_bvypis = "c_bvypis", mena_c_bvypis = "mena_c_bvypis", c_psk = "c_psk", mena_c_psk = "mena_c_psk",}
	const enum GIisspInboxPohybyPolozkyRezervaceDtoFragments { id_volani_ssp = "*", radek_ik = "*", radek_pol = "*", radek_pohyb = "*", id_doklad = "*", dat_doklad = "*", dat_rad_iissp = "*", c_platba = "*", mena_c_platba = "*", c_bvypis = "*", mena_c_bvypis = "*", c_psk = "*", mena_c_psk = "*",}
	const enum GIisspInboxPohybyPolozkyRezervaceDtoTypes { id_volani_ssp = "number", radek_ik = "number", radek_pol = "number", radek_pohyb = "number", id_doklad = "string", dat_doklad = "JsonDate", dat_rad_iissp = "JsonDate", c_platba = "JsonDecimal", mena_c_platba = "string", c_bvypis = "JsonDecimal", mena_c_bvypis = "string", c_psk = "JsonDecimal", mena_c_psk = "string",}
	const enum GIisspInboxPohybyPolozkyRezervaceDtoTypeLengths { id_doklad = 14,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxRequestDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - vstup některých Action metod*/
	interface GIisspInboxRequestDto {
		/**id_inbox_ssp*/
		id_inbox_ssp?: number|null;
	}
	const enum GIisspInboxRequestDtoNames { id_inbox_ssp = "id_inbox_ssp",}
	const enum GIisspInboxRequestDtoFragments { id_inbox_ssp = "*",}
	const enum GIisspInboxRequestDtoTypes { id_inbox_ssp = "number",}
	const enum GIisspInboxRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxResponseDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Synchronní odpověď na INBOX zprávu zaslanou z EKIS do IISSP*/
	interface GIisspInboxResponseDto {
		/**Identifikátor dávky za odesílající EKIS (tedy za technického uživatele = za Ginis).*/
		davka_id_externi?: string|null;
		/**Stav zpracování v IISSP RISRE*/
		stav?: Gordic.Iissp.Interface.GDavkaZpracovaniStavDto|null;
		/**Výsledek zpracování*/
		hlaseni?: Gordic.Iissp.Interface.GHlaseniDto|null;
	}
	const enum GIisspInboxResponseDtoNames { davka_id_externi = "davka_id_externi", stav = "stav", hlaseni = "hlaseni",}
	const enum GIisspInboxResponseDtoFragments { davka_id_externi = "*", stav = "*", hlaseni = "*",}
	const enum GIisspInboxResponseDtoTypes { davka_id_externi = "string", stav = "Gordic.Iissp.Interface.GDavkaZpracovaniStavDto", hlaseni = "Gordic.Iissp.Interface.GHlaseniDto",}
	const enum GIisspInboxResponseDtoTypeLengths { davka_id_externi = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxZpravaDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - doručené zprávy*/
	interface GIisspInboxZpravaDto {
		/**id_inbox_ssp*/
		id_inbox_ssp?: number|null;
		/**Id zprávy - generováno v IISSP*/
		zprava_id?: string|null;
		/**Vznik - datum vzniku zprávy*/
		dat_vznik?: JsonDate|null;
		/**Status - status zprávy v INBOX (N = nová, R = přečtená, D = k výmazu)*/
		status_ris?: string|null;
		/**Typ - typ zprávy*/
		typ_ris?: string|null;
		/**Název - název nebo druhotný identifikátor zprávy*/
		nazev?: string|null;
		/**Přečteno - datum stažení zprávy*/
		dat_precteno?: JsonDate|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov_txt?: string|null;
	}
	const enum GIisspInboxZpravaDtoNames { id_inbox_ssp = "id_inbox_ssp", zprava_id = "zprava_id", dat_vznik = "dat_vznik", status_ris = "status_ris", typ_ris = "typ_ris", nazev = "nazev", dat_precteno = "dat_precteno", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GIisspInboxZpravaDtoFragments { id_inbox_ssp = "*", zprava_id = "*", dat_vznik = "*", status_ris = "*", typ_ris = "*", nazev = "*", dat_precteno = "*", dat_zmena = "*", zmenu_prov_txt = "*",}
	const enum GIisspInboxZpravaDtoTypes { id_inbox_ssp = "number", zprava_id = "string", dat_vznik = "JsonDate", status_ris = "string", typ_ris = "string", nazev = "string", dat_precteno = "JsonDate", dat_zmena = "JsonDate", zmenu_prov_txt = "string",}
	const enum GIisspInboxZpravaDtoTypeLengths { zprava_id = 32, status_ris = 1, typ_ris = 4, nazev = 120,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspInboxZpravaVystupDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Inbox IISSP - výstup zprávy (XML obsah)*/
	interface GIisspInboxZpravaVystupDto {
		/**Id zprávy - generováno v IISSP*/
		zprava_id?: string|null;
		/**Výstup zprávy (XML obsah)*/
		vystup?: string|null;
		/**Status zprávy, E: chyba, W: warning, I: informace (=OK)*/
		status?: string|null;
	}
	const enum GIisspInboxZpravaVystupDtoNames { zprava_id = "zprava_id", vystup = "vystup", status = "status",}
	const enum GIisspInboxZpravaVystupDtoFragments { zprava_id = "*", vystup = "*", status = "*",}
	const enum GIisspInboxZpravaVystupDtoTypes { zprava_id = "string", vystup = "string", status = "string",}
	const enum GIisspInboxZpravaVystupDtoTypeLengths { zprava_id = 32, status = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspSpEkisStroRequestDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Podoba žádosti na předání stavu rozpočtu za období (směr: IISSP -> EKIS, INBOX)*/
	interface GIisspSpEkisStroRequestDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**Rozhodné datum, ke kterému je sestava vytvořena*/
		stav_datum?: JsonDate|null;
		/**Výběr dle finančního místa*/
		misto_financni?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle zdroje*/
		zdroj?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle paragrafu*/
		paragraf?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle rozpočtové položky*/
		polozka_rozpoctova?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle PVS (příjmová výdajová struktura)*/
		pvs?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle EDS/SMVS/ZED*/
		eds_smvs_akce?: Gordic.Iissp.Interface.GKodDoDto[]|null;
		/**Výběr dle účelu*/
		ucel?: Gordic.Iissp.Interface.GKodDoDto[]|null;
	}
	const enum GIisspSpEkisStroRequestDtoNames { ico = "ico", ucs = "ucs", stav_datum = "stav_datum", misto_financni = "misto_financni", zdroj = "zdroj", paragraf = "paragraf", polozka_rozpoctova = "polozka_rozpoctova", pvs = "pvs", eds_smvs_akce = "eds_smvs_akce", ucel = "ucel",}
	const enum GIisspSpEkisStroRequestDtoFragments { ico = "*", ucs = "*", stav_datum = "*", misto_financni = "*", zdroj = "*", paragraf = "*", polozka_rozpoctova = "*", pvs = "*", eds_smvs_akce = "*", ucel = "*",}
	const enum GIisspSpEkisStroRequestDtoTypes { ico = "string", ucs = "string", stav_datum = "JsonDate", misto_financni = "Gordic.Iissp.Interface.GKodDoDto[]", zdroj = "Gordic.Iissp.Interface.GKodDoDto[]", paragraf = "Gordic.Iissp.Interface.GKodDoDto[]", polozka_rozpoctova = "Gordic.Iissp.Interface.GKodDoDto[]", pvs = "Gordic.Iissp.Interface.GKodDoDto[]", eds_smvs_akce = "Gordic.Iissp.Interface.GKodDoDto[]", ucel = "Gordic.Iissp.Interface.GKodDoDto[]",}
	const enum GIisspSpEkisStroRequestDtoTypeLengths { ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\GIisspSpEkisStskRequestDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Podoba žádosti na předání stavu skutečnosti (směr: IISSP -> EKIS, INBOX)*/
	interface GIisspSpEkisStskRequestDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**Počáteční datum, od kterého je sestava vytvořena*/
		stav_datum_od?: JsonDate|null;
		/**Rozhodné datum, ke kterému je sestava vytvořena*/
		stav_datum?: JsonDate|null;
		/**Finanční místo*/
		misto_financni?: string|null;
		/**Výběr dle čísla rezervace (není to pole!)*/
		rezervace_cislo?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle zdroje*/
		zdroj?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle paragrafu*/
		paragraf?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle rozpočtové položky*/
		polozka_rozpoctova?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle PVS (příjmová výdajová struktura)*/
		pvs?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle EDS/SMVS/ZED*/
		eds_smvs_akce?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle účelu*/
		ucel?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle záznamové jednotky*/
		jednotka_zaznamova?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle územní jednotky*/
		jednotka_uzemni?: Gordic.Iissp.Interface.GKodDoDto|null;
		/**Výběr dle účelového znaku*/
		znak_ucelovy?: Gordic.Iissp.Interface.GKodDoDto|null;
	}
	const enum GIisspSpEkisStskRequestDtoNames { ico = "ico", ucs = "ucs", stav_datum_od = "stav_datum_od", stav_datum = "stav_datum", misto_financni = "misto_financni", rezervace_cislo = "rezervace_cislo", zdroj = "zdroj", paragraf = "paragraf", polozka_rozpoctova = "polozka_rozpoctova", pvs = "pvs", eds_smvs_akce = "eds_smvs_akce", ucel = "ucel", jednotka_zaznamova = "jednotka_zaznamova", jednotka_uzemni = "jednotka_uzemni", znak_ucelovy = "znak_ucelovy",}
	const enum GIisspSpEkisStskRequestDtoFragments { ico = "*", ucs = "*", stav_datum_od = "*", stav_datum = "*", misto_financni = "*", rezervace_cislo = "*", zdroj = "*", paragraf = "*", polozka_rozpoctova = "*", pvs = "*", eds_smvs_akce = "*", ucel = "*", jednotka_zaznamova = "*", jednotka_uzemni = "*", znak_ucelovy = "*",}
	const enum GIisspSpEkisStskRequestDtoTypes { ico = "string", ucs = "string", stav_datum_od = "JsonDate", stav_datum = "JsonDate", misto_financni = "string", rezervace_cislo = "Gordic.Iissp.Interface.GKodDoDto", zdroj = "Gordic.Iissp.Interface.GKodDoDto", paragraf = "Gordic.Iissp.Interface.GKodDoDto", polozka_rozpoctova = "Gordic.Iissp.Interface.GKodDoDto", pvs = "Gordic.Iissp.Interface.GKodDoDto", eds_smvs_akce = "Gordic.Iissp.Interface.GKodDoDto", ucel = "Gordic.Iissp.Interface.GKodDoDto", jednotka_zaznamova = "Gordic.Iissp.Interface.GKodDoDto", jednotka_uzemni = "Gordic.Iissp.Interface.GKodDoDto", znak_ucelovy = "Gordic.Iissp.Interface.GKodDoDto",}
	const enum GIisspSpEkisStskRequestDtoTypeLengths { ico = 10, ucs = 10, misto_financni = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Inbox\IGIisspInbox.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Komunikace s IISSP přes INBOX*/
	interface IisspInbox {
		/**Zaslání žádosti na předání stavu čerpání rozpočtu za období (směr: EKIS -> IISSP, INBOX) – provádí Commit!*/
		odeslaniEkisSpCero(rq?:Gordic.Iissp.Interface.GIisspEkisSpCeroRequestDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspEkisSpCeroRequestDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspEkisSpCeroRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspInboxResponseDto>>;
		/**Zaslání žádosti na předání stavu rozpočtu za období (směr: IISSP -> EKIS, INBOX) – provádí Commit!*/
		odeslaniSpEkisStro(rq?:Gordic.Iissp.Interface.GIisspSpEkisStroRequestDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspSpEkisStroRequestDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspSpEkisStroRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspInboxResponseDto>>;
		/**Zaslání žádosti na předání stavu skutečnosti (směr: IISSP -> EKIS, INBOX) – provádí Commit!*/
		odeslaniSpEkisStsk(rq?:Gordic.Iissp.Interface.GIisspSpEkisStskRequestDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspSpEkisStskRequestDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspSpEkisStskRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspInboxResponseDto>>;
		/**Pohyby položky rezervace v IISSP*/
		pohybyPolozkyRezervaceList(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspInboxPohybyPolozkyRezervaceDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspInboxDto>>;
		/**Historie záznamu v Inboxu IISSP*/
		historie(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspInboxHistorieDto>>;
		/**Obsah komunikace (request, response) konkrétního řádku historie záznamu v Inboxu IISSP*/
		historieObsah(rq?:Gordic.Iissp.Interface.GIisspInboxHistorieObsahDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspInboxHistorieObsahDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspInboxHistorieObsahDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspInboxHistorieObsahDto>>;
		/**Souhrn obsahu komunikace (request, response) - shrnutí + seznam zpráv + případně s odpovědí na 1. zprávu*/
		inboxObsah(rq?:Gordic.Iissp.Interface.GIisspInboxObsahDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspInboxObsahDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspInboxObsahDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspInboxObsahDto>>;
		/**Výstup zprávy (XML obsah)*/
		inboxZpravaVystup(rq?:Gordic.Iissp.Interface.GIisspInboxZpravaVystupDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspInboxZpravaVystupDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspInboxZpravaVystupDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspInboxZpravaVystupDto>>;
		/**Převzetí zpráv z Inboxu IISSP, pro 1 inbox záznam – provádí Commit!*/
		prevzitZpravyCommit(rq?:Gordic.Iissp.Interface.GIisspInboxRequestDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspInboxRequestDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspInboxRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspInboxDto>>;
		/**Převzetí zpráv z Inboxu IISSP, pro více inbox záznamů – provádí Commit!*/
		prevzitZpravyHromadneCommit(rq?:Gordic.Iissp.Interface.GIisspInboxGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspInboxGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspInboxGroupRequestDto>,GServiceGroupResponse<Gordic.Iissp.Interface.GIisspInboxDto>>;
		/**Storno Inbox žádosti*/
		stornuj(rq?:Gordic.Iissp.Interface.GIisspInboxRequestDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspInboxRequestDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspInboxRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspInboxDto>>;
		/**Storno Inbox žádostí*/
		stornujHromadne(rq?:Gordic.Iissp.Interface.GIisspInboxGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspInboxGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspInboxGroupRequestDto>,GServiceGroupResponse<Gordic.Iissp.Interface.GIisspInboxDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspInbox: ServiceBase & Catalog.IisspInbox;
	}
	const IisspInbox: Client["IisspInbox"];
}
declare namespace Gordic.Iissp.Interface {
	/**Filtrační parametry pro získání historie záznamu v Inboxu IISSP*/
	const enum GIisspInboxHistorieFilter {
		/**# - id volání IISSP*/
		id_inbox_ssp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Rezervace\GIisspRezervaceDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Rezervace*/
	interface GIisspRezervaceDto {
		/**id případu GINIS*/
		ixs_hpr?: string|null;
		/**id dokladu GINIS*/
		id_hdr?: number|null;
		/**id rezervace v IISSP*/
		id_hdr_ris?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**rok*/
		rok?: number|null;
	}
	const enum GIisspRezervaceDtoNames { ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", id_hdr_ris = "id_hdr_ris", ico = "ico", ucs = "ucs", rok = "rok",}
	const enum GIisspRezervaceDtoFragments { ixs_hpr = "*", id_hdr = "*", id_hdr_ris = "*", ico = "*", ucs = "*", rok = "*",}
	const enum GIisspRezervaceDtoTypes { ixs_hpr = "string", id_hdr = "number", id_hdr_ris = "string", ico = "string", ucs = "string", rok = "number",}
	const enum GIisspRezervaceDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Rezervace\GIisspRezervaceGroupDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Seznam rezervací*/
	interface GIisspRezervaceGroupDto {
		/**Seznam rezervací*/
		rezervace_list?: Gordic.Iissp.Interface.GIisspRezervaceDto[]|null;
	}
	const enum GIisspRezervaceGroupDtoNames { rezervace_list = "rezervace_list",}
	const enum GIisspRezervaceGroupDtoFragments { rezervace_list = "*",}
	const enum GIisspRezervaceGroupDtoTypes { rezervace_list = "Gordic.Iissp.Interface.GIisspRezervaceDto[]",}
	const enum GIisspRezervaceGroupDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Rezervace\IGIisspRezervace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rezervace v IISSP*/
	interface IisspRezervace {
		/**Uzavření rezervace - volá IISSP - provádí Commit
		*     INPUT: ixs_hpr, id_hdr, id_hdr_ris, ico, ucs
		*/
		uzavriRezervaciCommit(rq?:Gordic.Iissp.Interface.GIisspRezervaceDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspRezervaceDto>>;
		/**Otevření rezervace - volá IISSP - provádí Commit
		*     INPUT: ixs_hpr, id_hdr, id_hdr_ris, ico, ucs
		*/
		otevriRezervaciCommit(rq?:Gordic.Iissp.Interface.GIisspRezervaceDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspRezervaceDto>>;
		/**Uzavření případu - volá IISSP - provádí Commit
		*     INPUT: ixs_hpr, ico, ucs
		*/
		uzavriPripadCommit(rq?:Gordic.Iissp.Interface.GIisspRezervaceDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspRezervaceDto>>;
		/**Načtení stavu případu v IISSP - volá IISSP - provádí Commit
		*     INPUT: ixs_hpr, rok, ico, ucs
		*/
		nactiPripadCommit(rq?:Gordic.Iissp.Interface.GIisspRezervaceDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspRezervaceDto>>;
		/**Načtení stavu rezervace v IISSP - volá IISSP - provádí Commit
		*     INPUT: ixs_hpr, id_hdr, id_hdr_ris, rok, ico, ucs
		*/
		nactiRezervaciCommit(rq?:Gordic.Iissp.Interface.GIisspRezervaceDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervaceDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspRezervaceDto>>;
		/**Hromadné načtení stavu rezervace v IISSP - volá IISSP - provádí Commit*/
		nactiRezervaciHromadneCommit(rq?:Gordic.Iissp.Interface.GIisspRezervaceGroupDto|CallParams<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspRezervaceGroupDto>>): _Task<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspRezervaceGroupDto>,GServiceGroupResponse<Gordic.Iissp.Interface.GIisspRezervaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspRezervace: ServiceBase & Catalog.IisspRezervace;
	}
	const IisspRezervace: Client["IisspRezervace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervaceHistorie\GIisspRezervaceHistorieDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Historie volání rezervačních metod IISSP*/
	interface GIisspRezervaceHistorieDto {
		/**Id volání [key]*/
		id_volani_ssp?: number|null;
		/**Typ volání; Online / offline; 0 = Online (voláním WS); 1 = Offline (přes dávku)*/
		priz_offline?: number|null;
		/**Typ volání; Přímo / offline*/
		priz_offline_txt?: string|null;
		/**Případ*/
		ixs_hpr?: string|null;
		/**#D; ID dokladu GINIS (řádek dokladu v rámci případu)*/
		id_hdr?: number|null;
		/**Doklad (id dokladu, jedná se o složeninu ixs_hpr#id_hdr)*/
		doklad?: string|null;
		/**metoda_iissp*/
		metoda_iissp?: number|null;
		/**Metoda*/
		metoda_iissp_txt?: string|null;
		/**vysl_volani*/
		vysl_volani?: number|null;
		/**Výsledek*/
		vysl_volani_txt?: string|null;
		/**Datum*/
		dat_zmena?: JsonDate|null;
		/**Číslo rezervace; Id rezervace v IISSP*/
		id_hdr_ris?: string|null;
		/**Příz.akt.*/
		rez_akt_priz?: number|null;
		/**Zpr. č.*/
		por_cis?: number|null;
		/**Typ zpr.*/
		typ_hlaseni?: string|null;
		/**Ident. zprávy*/
		id_hlaseni?: string|null;
		/**Text zprávy*/
		text_hlaseni?: string|null;
		/**Text chyby*/
		text_chyby?: string|null;
		/**xml request*/
		xml_request?: string|null;
		/**xml response*/
		xml_response?: string|null;
		/**error long message*/
		text_chyby_long?: string|null;
	}
	const enum GIisspRezervaceHistorieDtoNames { id_volani_ssp = "id_volani_ssp", priz_offline = "priz_offline", priz_offline_txt = "priz_offline_txt", ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", doklad = "doklad", metoda_iissp = "metoda_iissp", metoda_iissp_txt = "metoda_iissp_txt", vysl_volani = "vysl_volani", vysl_volani_txt = "vysl_volani_txt", dat_zmena = "dat_zmena", id_hdr_ris = "id_hdr_ris", rez_akt_priz = "rez_akt_priz", por_cis = "por_cis", typ_hlaseni = "typ_hlaseni", id_hlaseni = "id_hlaseni", text_hlaseni = "text_hlaseni", text_chyby = "text_chyby", xml_request = "xml_request", xml_response = "xml_response", text_chyby_long = "text_chyby_long",}
	const enum GIisspRezervaceHistorieDtoFragments { id_volani_ssp = "*", priz_offline = "*", priz_offline_txt = "*", ixs_hpr = "*", id_hdr = "*", doklad = "*", metoda_iissp = "*", metoda_iissp_txt = "*", vysl_volani = "*", vysl_volani_txt = "*", dat_zmena = "*", id_hdr_ris = "*", rez_akt_priz = "*", por_cis = "*", typ_hlaseni = "*", id_hlaseni = "*", text_hlaseni = "*", text_chyby = "*", xml_request = "*", xml_response = "*", text_chyby_long = "*",}
	const enum GIisspRezervaceHistorieDtoTypes { id_volani_ssp = "number", priz_offline = "number", priz_offline_txt = "string", ixs_hpr = "string", id_hdr = "number", doklad = "string", metoda_iissp = "number", metoda_iissp_txt = "string", vysl_volani = "number", vysl_volani_txt = "string", dat_zmena = "JsonDate", id_hdr_ris = "string", rez_akt_priz = "number", por_cis = "number", typ_hlaseni = "string", id_hlaseni = "string", text_hlaseni = "string", text_chyby = "string", xml_request = "string", xml_response = "string", text_chyby_long = "string",}
	const enum GIisspRezervaceHistorieDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervaceHistorie\GIisspRezervaceHistorieShadowDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Historie volání případu v IISSP*/
	interface GIisspRezervaceHistorieShadowDto {
		/**Id volání*/
		IdVolani?: number|null;
		/**Typ volání; Online / offline; 0 = Online (voláním WS); 1 = Offline (přes dávku)*/
		PrizOffline?: number|null;
		/**Typ volání; Přímo / offline*/
		PrizOfflineTxt?: string|null;
		/**Případ*/
		IxsPripadu?: string|null;
		/**#D; ID dokladu GINIS (řádek dokladu v rámci případu)*/
		IdDokladu?: number|null;
		/**Doklad (id dokladu, jedná se o složeninu ixs_hpr#id_hdr)*/
		IxsAndId?: string|null;
		/**metoda_iissp*/
		MetodaIissp?: number|null;
		/**Metoda*/
		MetodaIisspTxt?: string|null;
		/**Výsledek (kód)*/
		VyslVolani?: number|null;
		/**Výsledek*/
		VyslVolaniTxt?: string|null;
		/**Datum*/
		DatumZmena?: JsonDate|null;
		/**Číslo rezervace; Id rezervace v IISSP*/
		RezervaceCislo?: string|null;
		/**Příz.akt.*/
		RezervaceAktualizovanaPriznak?: number|null;
		/**Zpr. č.*/
		ZprVyslPolozkaPoradi?: number|null;
		/**Typ zpr.*/
		ZprVyslPolozkaTyp?: string|null;
		/**Ident. zprávy*/
		ZprVyslPolozkaId?: string|null;
		/**Text zprávy*/
		ZprVyslPolozkaText?: string|null;
		/**Text chyby*/
		TextChyby?: string|null;
	}
	const enum GIisspRezervaceHistorieShadowDtoNames { IdVolani = "IdVolani", PrizOffline = "PrizOffline", PrizOfflineTxt = "PrizOfflineTxt", IxsPripadu = "IxsPripadu", IdDokladu = "IdDokladu", IxsAndId = "IxsAndId", MetodaIissp = "MetodaIissp", MetodaIisspTxt = "MetodaIisspTxt", VyslVolani = "VyslVolani", VyslVolaniTxt = "VyslVolaniTxt", DatumZmena = "DatumZmena", RezervaceCislo = "RezervaceCislo", RezervaceAktualizovanaPriznak = "RezervaceAktualizovanaPriznak", ZprVyslPolozkaPoradi = "ZprVyslPolozkaPoradi", ZprVyslPolozkaTyp = "ZprVyslPolozkaTyp", ZprVyslPolozkaId = "ZprVyslPolozkaId", ZprVyslPolozkaText = "ZprVyslPolozkaText", TextChyby = "TextChyby",}
	const enum GIisspRezervaceHistorieShadowDtoFragments { IdVolani = "*", PrizOffline = "*", PrizOfflineTxt = "*", IxsPripadu = "*", IdDokladu = "*", IxsAndId = "*", MetodaIissp = "*", MetodaIisspTxt = "*", VyslVolani = "*", VyslVolaniTxt = "*", DatumZmena = "*", RezervaceCislo = "*", RezervaceAktualizovanaPriznak = "*", ZprVyslPolozkaPoradi = "*", ZprVyslPolozkaTyp = "*", ZprVyslPolozkaId = "*", ZprVyslPolozkaText = "*", TextChyby = "*",}
	const enum GIisspRezervaceHistorieShadowDtoTypes { IdVolani = "number", PrizOffline = "number", PrizOfflineTxt = "string", IxsPripadu = "string", IdDokladu = "number", IxsAndId = "string", MetodaIissp = "number", MetodaIisspTxt = "string", VyslVolani = "number", VyslVolaniTxt = "string", DatumZmena = "JsonDate", RezervaceCislo = "string", RezervaceAktualizovanaPriznak = "number", ZprVyslPolozkaPoradi = "number", ZprVyslPolozkaTyp = "string", ZprVyslPolozkaId = "string", ZprVyslPolozkaText = "string", TextChyby = "string",}
	const enum GIisspRezervaceHistorieShadowDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervaceHistorie\IGIisspRezervaceHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie volání rezervace v IISSP*/
	interface IisspRezervaceHistorie {
		/**List - historie volání rezervačních metod pro případ*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspRezervaceHistorieDto>>;
		/**Read - historie volání rezervační metody*/
		read(rq?:Gordic.Iissp.Interface.GIisspRezervaceHistorieDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspRezervaceHistorieDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspRezervaceHistorieDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspRezervaceHistorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspRezervaceHistorie: ServiceBase & Catalog.IisspRezervaceHistorie;
	}
	const IisspRezervaceHistorie: Client["IisspRezervaceHistorie"];
}
declare namespace Gordic.Iissp.Interface {
	/**Filtr rezervace*/
	const enum GIisspRezervaceHistorieFilter {
		id_volani_ssp,
		/**id případu*/
		ixs_hpr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervacePripadu\GIisspRezervaceDokladuDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Výsledek rezervace dokladu Dto*/
	interface GIisspRezervaceDokladuDto extends Gordic.Iissp.Interface.GHlaseniDto {
		/**id dokladu v GINIS*/
		id_hdr?: number|null;
		/**ixs_hpr#id_hdr*/
		doklad?: string|null;
		/**id rezervace v IISSP*/
		id_hdr_ris?: string|null;
		/**Zda šlo o založení (true) nebo aktualizaci (false) rezervace*/
		zalozeni_rezervace?: boolean|null;
	}
	const enum GIisspRezervaceDokladuDtoNames { id_hdr = "id_hdr", doklad = "doklad", id_hdr_ris = "id_hdr_ris", zalozeni_rezervace = "zalozeni_rezervace", typ_maximum = "typ_maximum", polozka = "polozka",}
	const enum GIisspRezervaceDokladuDtoFragments { id_hdr = "*", doklad = "*", id_hdr_ris = "*", zalozeni_rezervace = "*", typ_maximum = "*", polozka = "*",}
	const enum GIisspRezervaceDokladuDtoTypes { id_hdr = "number", doklad = "string", id_hdr_ris = "string", zalozeni_rezervace = "boolean", typ_maximum = "string", polozka = "Gordic.Iissp.Interface.GPolozkaDto[]",}
	const enum GIisspRezervaceDokladuDtoTypeLengths { id_hdr_ris = 10, zalozeni_rezervace = 10, typ_maximum = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervacePripadu\GIisspRezervacePripaduDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Rezervace případu*/
	interface GIisspRezervacePripaduDto {
		/**id případu v GINIS*/
		ixs_hpr?: string|null;
		/**ixs referenta*/
		ixs_ref?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**rok*/
		rok?: number|null;
		/**pid_rd*/
		pid_rd?: string|null;
		/**Hromadná rezervace, příznak*/
		hromadna?: boolean|null;
		/**Output: Maximální úroveň hlášení, dle významnosti. E - chyba, W - varování, I - informace.*/
		typ_maximum?: string|null;
		/**Output: doklady případu s výsledky hlášení z IISSP*/
		doklady?: Gordic.Iissp.Interface.GIisspRezervaceDokladuDto[]|null;
	}
	const enum GIisspRezervacePripaduDtoNames { ixs_hpr = "ixs_hpr", ixs_ref = "ixs_ref", ico = "ico", ucs = "ucs", rok = "rok", pid_rd = "pid_rd", hromadna = "hromadna", typ_maximum = "typ_maximum", doklady = "doklady",}
	const enum GIisspRezervacePripaduDtoFragments { ixs_hpr = "*", ixs_ref = "*", ico = "*", ucs = "*", rok = "*", pid_rd = "*", hromadna = "*", typ_maximum = "*", doklady = "*",}
	const enum GIisspRezervacePripaduDtoTypes { ixs_hpr = "string", ixs_ref = "string", ico = "string", ucs = "string", rok = "number", pid_rd = "string", hromadna = "boolean", typ_maximum = "string", doklady = "Gordic.Iissp.Interface.GIisspRezervaceDokladuDto[]",}
	const enum GIisspRezervacePripaduDtoTypeLengths { ixs_hpr = 12, ixs_ref = 12, typ_maximum = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervacePripadu\GIisspRezervacePripaduGroupDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Hromadná rezervace případu Dto*/
	interface GIisspRezervacePripaduGroupDto {
		/**případy*/
		pripady?: Gordic.Iissp.Interface.GIisspRezervacePripaduDto[]|null;
	}
	const enum GIisspRezervacePripaduGroupDtoNames { pripady = "pripady",}
	const enum GIisspRezervacePripaduGroupDtoFragments { pripady = "*",}
	const enum GIisspRezervacePripaduGroupDtoTypes { pripady = "Gordic.Iissp.Interface.GIisspRezervacePripaduDto[]",}
	const enum GIisspRezervacePripaduGroupDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\RezervacePripadu\IGIisspRezervacePripadu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rezervace případu*/
	interface IisspRezervacePripadu {
		/**Založení / aktualizace rezervace případu v IISSP - volá IISSP - provádí Commit*/
		rezervujPripadHrom(rq?:Gordic.Iissp.Interface.GIisspRezervacePripaduGroupDto|CallParams<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspRezervacePripaduGroupDto>>): _Task<GServiceGroupRequest<Gordic.Iissp.Interface.GIisspRezervacePripaduGroupDto>,GServiceGroupResponse<Gordic.Iissp.Interface.GIisspRezervacePripaduDto>>;
		/**Založení / aktualizace rezervace případu v IISSP - volá IISSP - provádí Commit*/
		rezervujPripad(rq?:Gordic.Iissp.Interface.GIisspRezervacePripaduDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervacePripaduDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspRezervacePripaduDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspRezervacePripaduDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspRezervacePripadu: ServiceBase & Catalog.IisspRezervacePripadu;
	}
	const IisspRezervacePripadu: Client["IisspRezervacePripadu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\StavRezervace\GIisspStavRezervaceDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Stav rezervace*/
	interface GIisspStavRezervaceDto {
		/**id případu GINIS*/
		ixs_hpr?: string|null;
		/**id dokladu GINIS*/
		id_hdr?: number|null;
		/**id rezervace v IISSP*/
		id_hdr_ris?: string|null;
		/**Příznak uzavření v IISSP (s_rezsp = Stav REzervace Storno Příznak)*/
		s_rezsp_iissp?: number|null;
		/**Příznak uzavření v GINIS (s_rezsp = Stav REzervace Storno Příznak)*/
		s_rezsp_gin?: number|null;
		/**id rezervace v IISSP (id_hdr_ris) je známé v GINIS (jde o count, ale bude 0 nebo 1)*/
		in_ginis?: number|null;
		/**DBCOLUMN:sspshdp.id_volani_ssp*/
		id_volani_ssp?: number|null;
		/**DBCOLUMN:sspshdp.priz_nas_id*/
		priz_nas_id?: number|null;
		/**DBCOLUMN:sspshdp.typ_rezsp*/
		typ_rezsp?: number|null;
		/**DBCOLUMN:sspshdp.druh_rezsp*/
		druh_rezsp?: string|null;
		/**DBCOLUMN:sspshdp.dokl_puv_cis*/
		dokl_puv_cis?: string|null;
		/**DBCOLUMN:sspshdp.dat_rad_iissp*/
		dat_rad_iissp?: JsonDate|null;
		/**DBCOLUMN:sspshdp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sspshdp.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspshdp.cislo_vz_ca*/
		cislo_vz_ca?: string|null;
		/**DBCOLUMN:sspshdp.priz_pfk*/
		priz_pfk?: string|null;
		/**DBCOLUMN:sspshdp.priz_inkaso*/
		priz_inkaso?: string|null;
		/**DBCOLUMN:sspshdp.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:sspshdp.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:sspshdp.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:sspshdp.vs*/
		vs?: string|null;
		/**DBCOLUMN:sspshdp.ss*/
		ss?: string|null;
		/**DBCOLUMN:sspshdp.dat_dotaz*/
		dat_dotaz?: JsonDate|null;
		/**DBCOLUMN:sspshdp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspshdp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspshdp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**dat_zalozeni*/
		dat_zalozeni?: JsonDate|null;
		/**dat_akt*/
		dat_akt?: JsonDate|null;
		/**stav_odeslani*/
		stav_odeslani?: string|null;
		/**rok*/
		rok?: number|null;
		/**info o duplicitě*/
		duplicitni_rezervace?: number|null;
		/**Oprávnění*/
		Permissions?: Gordic.Iissp.Interface.GIisspStavRezervacePermissions|null;
	}
	const enum GIisspStavRezervaceDtoNames { ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", id_hdr_ris = "id_hdr_ris", s_rezsp_iissp = "s_rezsp_iissp", s_rezsp_gin = "s_rezsp_gin", in_ginis = "in_ginis", id_volani_ssp = "id_volani_ssp", priz_nas_id = "priz_nas_id", typ_rezsp = "typ_rezsp", druh_rezsp = "druh_rezsp", dokl_puv_cis = "dokl_puv_cis", dat_rad_iissp = "dat_rad_iissp", poznamka = "poznamka", popis = "popis", cislo_vz_ca = "cislo_vz_ca", priz_pfk = "priz_pfk", priz_inkaso = "priz_inkaso", bu_vl = "bu_vl", bu_ci = "bu_ci", sk_ci = "sk_ci", vs = "vs", ss = "ss", dat_dotaz = "dat_dotaz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_zalozeni = "dat_zalozeni", dat_akt = "dat_akt", stav_odeslani = "stav_odeslani", rok = "rok", duplicitni_rezervace = "duplicitni_rezervace", Permissions = "Permissions",}
	const enum GIisspStavRezervaceDtoFragments { ixs_hpr = "*", id_hdr = "*", id_hdr_ris = "*", s_rezsp_iissp = "*", s_rezsp_gin = "*", in_ginis = "*", id_volani_ssp = "*", priz_nas_id = "*", typ_rezsp = "*", druh_rezsp = "*", dokl_puv_cis = "*", dat_rad_iissp = "*", poznamka = "*", popis = "*", cislo_vz_ca = "*", priz_pfk = "*", priz_inkaso = "*", bu_vl = "*", bu_ci = "*", sk_ci = "*", vs = "*", ss = "*", dat_dotaz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_zalozeni = "*", dat_akt = "*", stav_odeslani = "*", rok = "*", duplicitni_rezervace = "*", Permissions = "*",}
	const enum GIisspStavRezervaceDtoTypes { ixs_hpr = "string", id_hdr = "number", id_hdr_ris = "string", s_rezsp_iissp = "number", s_rezsp_gin = "number", in_ginis = "number", id_volani_ssp = "number", priz_nas_id = "number", typ_rezsp = "number", druh_rezsp = "string", dokl_puv_cis = "string", dat_rad_iissp = "JsonDate", poznamka = "string", popis = "string", cislo_vz_ca = "string", priz_pfk = "string", priz_inkaso = "string", bu_vl = "string", bu_ci = "string", sk_ci = "string", vs = "string", ss = "string", dat_dotaz = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_zalozeni = "JsonDate", dat_akt = "JsonDate", stav_odeslani = "string", rok = "number", duplicitni_rezervace = "number", Permissions = "Gordic.Iissp.Interface.GIisspStavRezervacePermissions",}
	const enum GIisspStavRezervaceDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10, druh_rezsp = 2, dokl_puv_cis = 20, poznamka = 80, popis = 254, cislo_vz_ca = 15, priz_pfk = 1, priz_inkaso = 1, bu_vl = 34, bu_ci = 34, sk_ci = 11, vs = 10, ss = 10, zmenu_prov = 12,}
	/**Filtrační parametry pro získání stavu rezervací*/
	const enum GIisspStavRezervaceFilter {
		/**ID GINIS případu*/
		ixs_hpr,
		id_hdr,
		id_hdr_ris,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\StavRezervace\GIisspStavRezervacePermissions.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci se Stav Rezervace IISSP Permissions*/
	interface GIisspStavRezervacePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Dostupnost tlačítka Uzavřít rezervaci*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost tlačítka Otevřít rezervaci*/
		LzeOtevrit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GIisspStavRezervacePermissionsNames { LzeUzavrit = "LzeUzavrit", LzeOtevrit = "LzeOtevrit",}
	const enum GIisspStavRezervacePermissionsFragments { LzeUzavrit = "*", LzeOtevrit = "*",}
	const enum GIisspStavRezervacePermissionsTypes { LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeOtevrit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GIisspStavRezervacePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\StavRezervace\GIisspStavRezervacePolozkaDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Stav položek rezervace*/
	interface GIisspStavRezervacePolozkaDto {
		/**DBCOLUMN:sspdppp.ixs_hpr*/
		ixs_hpr?: string|null;
		/**DBCOLUMN:sspdppp.id_hdr*/
		id_hdr?: number|null;
		/**DBCOLUMN:sspdppp.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:sspdppp.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**DBCOLUMN:sspdppp.id_volani_ssp*/
		id_volani_ssp?: number|null;
		/**DBCOLUMN:sspdppp.id_hdr_vcl*/
		id_hdr_vcl?: string|null;
		/**DBCOLUMN:sspdppp.radek_hdr_vcl*/
		radek_hdr_vcl?: number|null;
		/**DBCOLUMN:sspdppp.s_rezsp*/
		s_rezsp_isp?: number|null;
		/**DBCOLUMN:sspdppp.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:sspdppp.c_rsp*/
		c_rsp_isp?: JsonDecimal|null;
		/**DBCOLUMN:sspdppp.mena_c_rsp*/
		mena_c_rsp?: string|null;
		/**DBCOLUMN:sspdppp.c_cerp*/
		c_cerp_isp?: JsonDecimal|null;
		/**DBCOLUMN:sspdppp.mena_c_cerp*/
		mena_c_cerp?: string|null;
		/**DBCOLUMN:sspdppp.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdppp.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:sspdppp.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:sspdppp.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:sspdppp.isp_pol*/
		isp_pol?: string|null;
		/**DBCOLUMN:sspdppp.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:sspdppp.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:sspdppp.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:sspdppp.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:sspdppp.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:sspdppp.isp_uz*/
		isp_uz?: string|null;
		/**DBCOLUMN:sspdppp.dat_dotaz*/
		dat_dotaz?: JsonDate|null;
		/**DBCOLUMN:sspdppp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspdppp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspdppp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspdppr.c_rsp*/
		c_rsp_gin?: JsonDecimal|null;
		/**DBCOLUMN:sspdppr.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:sspdppr.s_rezsp*/
		s_rezsp_gin?: number|null;
		/**c_cerp_gin*/
		c_cerp_gin?: JsonDecimal|null;
		/**c_cerp_xma*/
		c_cerp_xma?: JsonDecimal|null;
		/**c_cerp_xma_xx*/
		c_cerp_xma_xx?: JsonDecimal|null;
		/**mesden*/
		mesden?: number|null;
		/**computed column*/
		k_uvolneni?: JsonDecimal|null;
		/**DBCOLUMN:sspshdr.s_vyriz_rezsp*/
		s_vyriz_rezsp?: number|null;
	}
	const enum GIisspStavRezervacePolozkaDtoNames { ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", id_volani_ssp = "id_volani_ssp", id_hdr_vcl = "id_hdr_vcl", radek_hdr_vcl = "radek_hdr_vcl", s_rezsp_isp = "s_rezsp_isp", dat_spl = "dat_spl", c_rsp_isp = "c_rsp_isp", mena_c_rsp = "mena_c_rsp", c_cerp_isp = "c_cerp_isp", mena_c_cerp = "mena_c_cerp", popis = "popis", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", dat_dotaz = "dat_dotaz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_rsp_gin = "c_rsp_gin", radek_hdr = "radek_hdr", s_rezsp_gin = "s_rezsp_gin", c_cerp_gin = "c_cerp_gin", c_cerp_xma = "c_cerp_xma", c_cerp_xma_xx = "c_cerp_xma_xx", mesden = "mesden", k_uvolneni = "k_uvolneni", s_vyriz_rezsp = "s_vyriz_rezsp",}
	const enum GIisspStavRezervacePolozkaDtoFragments { ixs_hpr = "*", id_hdr = "*", id_hdr_ris = "*", radek_hdr_ris = "*", id_volani_ssp = "*", id_hdr_vcl = "*", radek_hdr_vcl = "*", s_rezsp_isp = "*", dat_spl = "*", c_rsp_isp = "*", mena_c_rsp = "*", c_cerp_isp = "*", mena_c_cerp = "*", popis = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", dat_dotaz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", c_rsp_gin = "*", radek_hdr = "*", s_rezsp_gin = "*", c_cerp_gin = "*", c_cerp_xma = "*", c_cerp_xma_xx = "*", mesden = "*", k_uvolneni = "*", s_vyriz_rezsp = "*",}
	const enum GIisspStavRezervacePolozkaDtoTypes { ixs_hpr = "string", id_hdr = "number", id_hdr_ris = "string", radek_hdr_ris = "number", id_volani_ssp = "number", id_hdr_vcl = "string", radek_hdr_vcl = "number", s_rezsp_isp = "number", dat_spl = "JsonDate", c_rsp_isp = "JsonDecimal", mena_c_rsp = "string", c_cerp_isp = "JsonDecimal", mena_c_cerp = "string", popis = "string", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", dat_dotaz = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_rsp_gin = "JsonDecimal", radek_hdr = "number", s_rezsp_gin = "number", c_cerp_gin = "JsonDecimal", c_cerp_xma = "JsonDecimal", c_cerp_xma_xx = "JsonDecimal", mesden = "number", k_uvolneni = "JsonDecimal", s_vyriz_rezsp = "number",}
	const enum GIisspStavRezervacePolozkaDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10, id_hdr_vcl = 10, mena_c_rsp = 3, mena_c_cerp = 3, popis = 60, isp_fim = 16, isp_zdr = 10, isp_par = 16, isp_pol = 24, isp_eds = 15, isp_pvs = 10, isp_ucl = 9, isp_zj = 3, isp_uj = 6, isp_uz = 7, zmenu_prov = 12,}
	const enum GIisspStavRezervacePolozkaFilter {
		ixs_hpr,
		id_hdr,
		id_hdr_ris,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\StavRezervace\GIisspStavRezervacePolozkaHistorieDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Historie stavů položek případu*/
	interface GIisspStavRezervacePolozkaHistorieDto {
		/**Případ*/
		ixs_hpr?: string|null;
		/**#D; ID dokladu GINIS*/
		id_hdr?: number|null;
		/**ID IISSP*/
		id_hdr_ris?: string|null;
		/**Ř; Řádek IISSP*/
		radek_hdr_ris?: number|null;
		/**Dotaz #; ID dotazu na stav v IISSP*/
		id_volani_ssp?: number|null;
		/**SD; Stav dokladu v IISSP – Otevřeno / Uzavřeno*/
		s_rezsp_dokl?: number|null;
		/**Datum dotazu*/
		dat_dotaz_dokl?: JsonDate|null;
		/**SŘ; Stav řádku v IISSP – Otevřeno / Uzavřeno*/
		s_rezsp?: number|null;
		/**Splatnost*/
		dat_spl?: JsonDate|null;
		/**Rezervováno*/
		c_rsp?: JsonDecimal|null;
		/**Čerpáno*/
		c_cerp?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
		/**FIM*/
		isp_fim?: string|null;
		/**ZDR*/
		isp_zdr?: string|null;
		/**PAR*/
		isp_par?: string|null;
		/**POL*/
		isp_pol?: string|null;
		/**EDS*/
		isp_eds?: string|null;
		/**PVS*/
		isp_pvs?: string|null;
		/**UCL*/
		isp_ucl?: string|null;
		/**ZJ*/
		isp_zj?: string|null;
		/**UJ*/
		isp_uj?: string|null;
		/**UZ*/
		isp_uz?: string|null;
	}
	const enum GIisspStavRezervacePolozkaHistorieDtoNames { ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", id_volani_ssp = "id_volani_ssp", s_rezsp_dokl = "s_rezsp_dokl", dat_dotaz_dokl = "dat_dotaz_dokl", s_rezsp = "s_rezsp", dat_spl = "dat_spl", c_rsp = "c_rsp", c_cerp = "c_cerp", popis = "popis", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz",}
	const enum GIisspStavRezervacePolozkaHistorieDtoFragments { ixs_hpr = "*", id_hdr = "*", id_hdr_ris = "*", radek_hdr_ris = "*", id_volani_ssp = "*", s_rezsp_dokl = "*", dat_dotaz_dokl = "*", s_rezsp = "*", dat_spl = "*", c_rsp = "*", c_cerp = "*", popis = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*",}
	const enum GIisspStavRezervacePolozkaHistorieDtoTypes { ixs_hpr = "string", id_hdr = "number", id_hdr_ris = "string", radek_hdr_ris = "number", id_volani_ssp = "number", s_rezsp_dokl = "number", dat_dotaz_dokl = "JsonDate", s_rezsp = "number", dat_spl = "JsonDate", c_rsp = "JsonDecimal", c_cerp = "JsonDecimal", popis = "string", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string",}
	const enum GIisspStavRezervacePolozkaHistorieDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10, popis = 60, isp_fim = 16, isp_zdr = 10, isp_par = 16, isp_pol = 24, isp_eds = 15, isp_pvs = 10, isp_ucl = 9, isp_zj = 3, isp_uj = 6, isp_uz = 7,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\StavRezervace\IGIisspStavRezervace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Stav rezervace v IISSP*/
	interface IisspStavRezervace {
		/**List - seznam rezervací případu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspStavRezervaceDto>>;
		/**Read - stav hlavičky rezervace*/
		read(rq?:Gordic.Iissp.Interface.GIisspStavRezervaceDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspStavRezervaceDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspStavRezervaceDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspStavRezervaceDto>>;
		/**Polozky_List - stav položek rezervace*/
		polozky_List(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspStavRezervacePolozkaDto>>;
		/**HistoriePolozek_List - historie stavů položek případu*/
		historiePolozek_List(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspStavRezervacePolozkaHistorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspStavRezervace: ServiceBase & Catalog.IisspStavRezervace;
	}
	const IisspStavRezervace: Client["IisspStavRezervace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\TypKomunikace\GIisspTypKomunikaceDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro typ komunikace se Státní pokladnou*/
	interface GIisspTypKomunikaceDto {
		/**DBCOLUMN:ekodico.rok*/
		rok?: number|null;
		/**DBCOLUMN:ekodico.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekodico.typ_kom_iissp*/
		typ_kom_iissp?: Gordic.Ginis.DbModel.GEkoctiiEnum|null;
	}
	const enum GIisspTypKomunikaceDtoNames { rok = "rok", ico = "ico", typ_kom_iissp = "typ_kom_iissp",}
	const enum GIisspTypKomunikaceDtoFragments { rok = "*", ico = "*", typ_kom_iissp = "*",}
	const enum GIisspTypKomunikaceDtoTypes { rok = "number", ico = "string", typ_kom_iissp = "Gordic.Ginis.DbModel.GEkoctiiEnum",}
	const enum GIisspTypKomunikaceDtoTypeLengths { ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\TypKomunikace\IGIisspTypKomunikace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ komunikace se Státní pokladnou*/
	interface IisspTypKomunikace {
		/**Read*/
		read(rq?:Gordic.Iissp.Interface.GIisspTypKomunikaceDto|CallParams<GServiceReadRequest<Gordic.Iissp.Interface.GIisspTypKomunikaceDto>>): _Task<GServiceReadRequest<Gordic.Iissp.Interface.GIisspTypKomunikaceDto>,GServiceReadResponse<Gordic.Iissp.Interface.GIisspTypKomunikaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspTypKomunikace: ServiceBase & Catalog.IisspTypKomunikace;
	}
	const IisspTypKomunikace: Client["IisspTypKomunikace"];
}
declare namespace Gordic.Iissp.Interface {
	/**Filtrační parametry*/
	const enum GIisspTypKomunikaceFilter {
		/**DBCOLUMN:ekodico.rok*/
		rok,
		/**DBCOLUMN:ekodico.ico*/
		ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Dto pro práci s Výkazy IISSP*/
	interface GIisspVykazDto {
		/**DBCOLUMN:sspsinb.id_inbox_ssp*/
		id_inbox_ssp?: number|null;
		/**DBCOLUMN:sspcsts.priz_detail*/
		id_inbox_user?: number|null;
		/**DBCOLUMN:sspsinb.id_inbox_ext*/
		id_inbox_ext?: string|null;
		/**DBCOLUMN:sspsinb.id_inbox_ris*/
		id_inbox_ris?: string|null;
		/**DBCOLUMN:sspsinb.status_inbox*/
		status_inbox?: number|null;
		/**DBCOLUMN:sspcsin.status_inbox_txt*/
		status_inbox_txt?: string|null;
		/**DBCOLUMN:sspcsin.status_inbox_zkr*/
		status_inbox_zkr?: string|null;
		/**DBCOLUMN:sspsinb.dat_ukonceni*/
		dat_ukonceni?: JsonDate|null;
		/**DBCOLUMN:sspsinb.vysl_max*/
		vysl_max?: string|null;
		/**DBCOLUMN:sspsinb.pocet_zprav*/
		pocet_zprav?: number|null;
		/**DBCOLUMN:sspsinb.dat_zadal*/
		dat_zadal?: JsonDate|null;
		/**DBCOLUMN:ginszmp.nazev_rf*/
		zadal_nazev_rf?: string|null;
		/**DBCOLUMN:sspsinb.dat_prevzal*/
		dat_prevzal?: JsonDate|null;
		/**DBCOLUMN:sspsinb.zmenu_prov_prevzal*/
		prevzal_nazev_rf?: string|null;
		/**DBCOLUMN:sspsinb.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:sspsilx.rok*/
		rok?: number|null;
		/**DBCOLUMN:sspsilx.mesic_do*/
		mesic_do?: number|null;
		/**DBCOLUMN:sspsilx.vykaz_typ*/
		vykaz_typ?: number|null;
		/**DBCOLUMN:sspcvyk.vykaz_typ_iissp*/
		vykaz_typ_iissp?: string|null;
		/**DBCOLUMN:sspcvyk.vykaz_typ_txt*/
		vykaz_typ_txt?: string|null;
		/**DBCOLUMN:sspsilx.stav_porovnani*/
		stav_porovnani?: number|null;
		/**DBCOLUMN:sspsilx.pocet_rozdilu*/
		pocet_rozdilu?: number|null;
		priz_vyzvednuto?: number|null;
		priz_chybne?: number|null;
		/**Oprávnění*/
		Permissions?: Gordic.Iissp.Interface.GIisspVykazPermissions|null;
		/**ico - nutný v req GenerujVykaz*/
		ico?: string|null;
		/**ucs - nutný v req GenerujVykaz*/
		ucs?: string|null;
		/**info pro sestavu*/
		ico_or_ucs?: boolean|null;
	}
	const enum GIisspVykazDtoNames { id_inbox_ssp = "id_inbox_ssp", id_inbox_user = "id_inbox_user", id_inbox_ext = "id_inbox_ext", id_inbox_ris = "id_inbox_ris", status_inbox = "status_inbox", status_inbox_txt = "status_inbox_txt", status_inbox_zkr = "status_inbox_zkr", dat_ukonceni = "dat_ukonceni", vysl_max = "vysl_max", pocet_zprav = "pocet_zprav", dat_zadal = "dat_zadal", zadal_nazev_rf = "zadal_nazev_rf", dat_prevzal = "dat_prevzal", prevzal_nazev_rf = "prevzal_nazev_rf", isp_fim = "isp_fim", rok = "rok", mesic_do = "mesic_do", vykaz_typ = "vykaz_typ", vykaz_typ_iissp = "vykaz_typ_iissp", vykaz_typ_txt = "vykaz_typ_txt", stav_porovnani = "stav_porovnani", pocet_rozdilu = "pocet_rozdilu", priz_vyzvednuto = "priz_vyzvednuto", priz_chybne = "priz_chybne", Permissions = "Permissions", ico = "ico", ucs = "ucs", ico_or_ucs = "ico_or_ucs",}
	const enum GIisspVykazDtoFragments { id_inbox_ssp = "*", id_inbox_user = "*", id_inbox_ext = "*", id_inbox_ris = "*", status_inbox = "*", status_inbox_txt = "*", status_inbox_zkr = "*", dat_ukonceni = "*", vysl_max = "*", pocet_zprav = "*", dat_zadal = "*", zadal_nazev_rf = "*", dat_prevzal = "*", prevzal_nazev_rf = "*", isp_fim = "*", rok = "*", mesic_do = "*", vykaz_typ = "*", vykaz_typ_iissp = "*", vykaz_typ_txt = "*", stav_porovnani = "*", pocet_rozdilu = "*", priz_vyzvednuto = "*", priz_chybne = "*", Permissions = "*", ico = "*", ucs = "*", ico_or_ucs = "*",}
	const enum GIisspVykazDtoTypes { id_inbox_ssp = "number", id_inbox_user = "number", id_inbox_ext = "string", id_inbox_ris = "string", status_inbox = "number", status_inbox_txt = "string", status_inbox_zkr = "string", dat_ukonceni = "JsonDate", vysl_max = "string", pocet_zprav = "number", dat_zadal = "JsonDate", zadal_nazev_rf = "string", dat_prevzal = "JsonDate", prevzal_nazev_rf = "string", isp_fim = "string", rok = "number", mesic_do = "number", vykaz_typ = "number", vykaz_typ_iissp = "string", vykaz_typ_txt = "string", stav_porovnani = "number", pocet_rozdilu = "number", priz_vyzvednuto = "number", priz_chybne = "number", Permissions = "Gordic.Iissp.Interface.GIisspVykazPermissions", ico = "string", ucs = "string", ico_or_ucs = "boolean",}
	const enum GIisspVykazDtoTypeLengths { id_inbox_ext = 30, id_inbox_ris = 32, status_inbox_txt = 100, status_inbox_zkr = 50, vysl_max = 1, zadal_nazev_rf = 200, prevzal_nazev_rf = 200, isp_fim = 16, vykaz_typ_iissp = 4, vykaz_typ_txt = 100, ico = 10, ucs = 10,}
	/**Filtrační parametry pro získání Výkazů*/
	const enum GIisspVykazFilter {
		id_inbox_ssp,
		isp_fim,
		rok,
		mesic_do,
		vykaz_typ,
		priz_vyzvednuto,
		priz_chybne,
		vykaz_typ_iissp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazGloDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**RV01 – Globální výkaz*/
	interface GIisspVykazGloDto {
		rok?: number|null;
		mesic_do?: number|null;
		isp_fim?: string|null;
		neshoda?: number|null;
		alternating?: number|null;
		rozdily?: number|null;
		rozdily_txt?: string|null;
		zdroj?: number|null;
		pocet_rozdilu?: number|null;
		isp_par?: string|null;
		isp_pol?: string|null;
		isp_zdr?: string|null;
		isp_eds?: string|null;
		isp_ucl?: string|null;
		isp_pvs?: string|null;
		c_r_sch?: JsonDecimal|null;
		c_r_sch_b?: boolean|null;
		c_r_zme?: JsonDecimal|null;
		c_r_zme_b?: boolean|null;
		c_r_kon?: JsonDecimal|null;
		c_r_kon_b?: boolean|null;
		c_sku?: JsonDecimal|null;
		c_sku_b?: boolean|null;
	}
	const enum GIisspVykazGloDtoNames { rok = "rok", mesic_do = "mesic_do", isp_fim = "isp_fim", neshoda = "neshoda", alternating = "alternating", rozdily = "rozdily", rozdily_txt = "rozdily_txt", zdroj = "zdroj", pocet_rozdilu = "pocet_rozdilu", isp_par = "isp_par", isp_pol = "isp_pol", isp_zdr = "isp_zdr", isp_eds = "isp_eds", isp_ucl = "isp_ucl", isp_pvs = "isp_pvs", c_r_sch = "c_r_sch", c_r_sch_b = "c_r_sch_b", c_r_zme = "c_r_zme", c_r_zme_b = "c_r_zme_b", c_r_kon = "c_r_kon", c_r_kon_b = "c_r_kon_b", c_sku = "c_sku", c_sku_b = "c_sku_b",}
	const enum GIisspVykazGloDtoFragments { rok = "*", mesic_do = "*", isp_fim = "*", neshoda = "*", alternating = "*", rozdily = "*", rozdily_txt = "*", zdroj = "*", pocet_rozdilu = "*", isp_par = "*", isp_pol = "*", isp_zdr = "*", isp_eds = "*", isp_ucl = "*", isp_pvs = "*", c_r_sch = "*", c_r_sch_b = "*", c_r_zme = "*", c_r_zme_b = "*", c_r_kon = "*", c_r_kon_b = "*", c_sku = "*", c_sku_b = "*",}
	const enum GIisspVykazGloDtoTypes { rok = "number", mesic_do = "number", isp_fim = "string", neshoda = "number", alternating = "number", rozdily = "number", rozdily_txt = "string", zdroj = "number", pocet_rozdilu = "number", isp_par = "string", isp_pol = "string", isp_zdr = "string", isp_eds = "string", isp_ucl = "string", isp_pvs = "string", c_r_sch = "JsonDecimal", c_r_sch_b = "boolean", c_r_zme = "JsonDecimal", c_r_zme_b = "boolean", c_r_kon = "JsonDecimal", c_r_kon_b = "boolean", c_sku = "JsonDecimal", c_sku_b = "boolean",}
	const enum GIisspVykazGloDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazNarDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**RV04 / RV05 – Výkaz o nárocích z nespotřebovaných výdajů OSS*/
	interface GIisspVykazNarDto {
		vykaz_typ_iissp?: string|null;
		rok?: number|null;
		mesic_do?: number|null;
		isp_fim?: string|null;
		neshoda?: number|null;
		alternating?: number|null;
		rozdily?: number|null;
		rozdily_txt?: string|null;
		zdroj?: number|null;
		pocet_rozdilu?: number|null;
		radek_cislo?: number|null;
		nazev?: string|null;
		nazev_uroven?: number|null;
		nazev_display?: string|null;
		c_sl_1?: JsonDecimal|null;
		c_sl_1_b?: boolean|null;
		c_sl_2?: JsonDecimal|null;
		c_sl_2_b?: boolean|null;
		c_sl_3?: JsonDecimal|null;
		c_sl_3_b?: boolean|null;
		c_sl_4?: JsonDecimal|null;
		c_sl_4_b?: boolean|null;
		c_sl_5?: JsonDecimal|null;
		c_sl_5_b?: boolean|null;
		c_sl_6?: JsonDecimal|null;
		c_sl_6_b?: boolean|null;
		c_sl_7?: JsonDecimal|null;
		c_sl_7_b?: boolean|null;
		c_sl_8?: JsonDecimal|null;
		c_sl_8_b?: boolean|null;
		c_sl_9?: JsonDecimal|null;
		c_sl_9_b?: boolean|null;
	}
	const enum GIisspVykazNarDtoNames { vykaz_typ_iissp = "vykaz_typ_iissp", rok = "rok", mesic_do = "mesic_do", isp_fim = "isp_fim", neshoda = "neshoda", alternating = "alternating", rozdily = "rozdily", rozdily_txt = "rozdily_txt", zdroj = "zdroj", pocet_rozdilu = "pocet_rozdilu", radek_cislo = "radek_cislo", nazev = "nazev", nazev_uroven = "nazev_uroven", nazev_display = "nazev_display", c_sl_1 = "c_sl_1", c_sl_1_b = "c_sl_1_b", c_sl_2 = "c_sl_2", c_sl_2_b = "c_sl_2_b", c_sl_3 = "c_sl_3", c_sl_3_b = "c_sl_3_b", c_sl_4 = "c_sl_4", c_sl_4_b = "c_sl_4_b", c_sl_5 = "c_sl_5", c_sl_5_b = "c_sl_5_b", c_sl_6 = "c_sl_6", c_sl_6_b = "c_sl_6_b", c_sl_7 = "c_sl_7", c_sl_7_b = "c_sl_7_b", c_sl_8 = "c_sl_8", c_sl_8_b = "c_sl_8_b", c_sl_9 = "c_sl_9", c_sl_9_b = "c_sl_9_b",}
	const enum GIisspVykazNarDtoFragments { vykaz_typ_iissp = "*", rok = "*", mesic_do = "*", isp_fim = "*", neshoda = "*", alternating = "*", rozdily = "*", rozdily_txt = "*", zdroj = "*", pocet_rozdilu = "*", radek_cislo = "*", nazev = "*", nazev_uroven = "*", nazev_display = "*", c_sl_1 = "*", c_sl_1_b = "*", c_sl_2 = "*", c_sl_2_b = "*", c_sl_3 = "*", c_sl_3_b = "*", c_sl_4 = "*", c_sl_4_b = "*", c_sl_5 = "*", c_sl_5_b = "*", c_sl_6 = "*", c_sl_6_b = "*", c_sl_7 = "*", c_sl_7_b = "*", c_sl_8 = "*", c_sl_8_b = "*", c_sl_9 = "*", c_sl_9_b = "*",}
	const enum GIisspVykazNarDtoTypes { vykaz_typ_iissp = "string", rok = "number", mesic_do = "number", isp_fim = "string", neshoda = "number", alternating = "number", rozdily = "number", rozdily_txt = "string", zdroj = "number", pocet_rozdilu = "number", radek_cislo = "number", nazev = "string", nazev_uroven = "number", nazev_display = "string", c_sl_1 = "JsonDecimal", c_sl_1_b = "boolean", c_sl_2 = "JsonDecimal", c_sl_2_b = "boolean", c_sl_3 = "JsonDecimal", c_sl_3_b = "boolean", c_sl_4 = "JsonDecimal", c_sl_4_b = "boolean", c_sl_5 = "JsonDecimal", c_sl_5_b = "boolean", c_sl_6 = "JsonDecimal", c_sl_6_b = "boolean", c_sl_7 = "JsonDecimal", c_sl_7_b = "boolean", c_sl_8 = "JsonDecimal", c_sl_8_b = "boolean", c_sl_9 = "JsonDecimal", c_sl_9_b = "boolean",}
	const enum GIisspVykazNarDtoTypeLengths { vykaz_typ_iissp = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazPermissions.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Permissions nad řádkem Výkazu IISSP*/
	interface GIisspVykazPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Dostupnost akce*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost akce*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost akce*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost akce*/
		LzePorovnat: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost akce*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Dostupnost akce*/
		LzeGenerovatNew: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GIisspVykazPermissionsNames { LzeGenerovat = "LzeGenerovat", LzePrevzit = "LzePrevzit", LzeStornovat = "LzeStornovat", LzePorovnat = "LzePorovnat", LzeZobrazit = "LzeZobrazit", LzeGenerovatNew = "LzeGenerovatNew",}
	const enum GIisspVykazPermissionsFragments { LzeGenerovat = "*", LzePrevzit = "*", LzeStornovat = "*", LzePorovnat = "*", LzeZobrazit = "*", LzeGenerovatNew = "*",}
	const enum GIisspVykazPermissionsTypes { LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzePorovnat = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatNew = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GIisspVykazPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazRekDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**RV02 / RV06 – Rekapitulace příjmů, výdajů, financování a jejich konsolidace*/
	interface GIisspVykazRekDto {
		vykaz_typ_iissp?: string|null;
		rok?: number|null;
		mesic_do?: number|null;
		isp_fim?: string|null;
		neshoda?: number|null;
		alternating?: number|null;
		rozdily?: number|null;
		rozdily_txt?: string|null;
		zdroj?: number|null;
		pocet_rozdilu?: number|null;
		radek_cislo?: string|null;
		nazev?: string|null;
		trida_polozka?: string|null;
		nazev_display?: string|null;
		c_r_sch?: JsonDecimal|null;
		c_r_sch_b?: boolean|null;
		c_r_zme?: JsonDecimal|null;
		c_r_zme_b?: boolean|null;
		c_r_kon?: JsonDecimal|null;
		c_r_kon_b?: boolean|null;
		c_sku?: JsonDecimal|null;
		c_sku_b?: boolean|null;
	}
	const enum GIisspVykazRekDtoNames { vykaz_typ_iissp = "vykaz_typ_iissp", rok = "rok", mesic_do = "mesic_do", isp_fim = "isp_fim", neshoda = "neshoda", alternating = "alternating", rozdily = "rozdily", rozdily_txt = "rozdily_txt", zdroj = "zdroj", pocet_rozdilu = "pocet_rozdilu", radek_cislo = "radek_cislo", nazev = "nazev", trida_polozka = "trida_polozka", nazev_display = "nazev_display", c_r_sch = "c_r_sch", c_r_sch_b = "c_r_sch_b", c_r_zme = "c_r_zme", c_r_zme_b = "c_r_zme_b", c_r_kon = "c_r_kon", c_r_kon_b = "c_r_kon_b", c_sku = "c_sku", c_sku_b = "c_sku_b",}
	const enum GIisspVykazRekDtoFragments { vykaz_typ_iissp = "*", rok = "*", mesic_do = "*", isp_fim = "*", neshoda = "*", alternating = "*", rozdily = "*", rozdily_txt = "*", zdroj = "*", pocet_rozdilu = "*", radek_cislo = "*", nazev = "*", trida_polozka = "*", nazev_display = "*", c_r_sch = "*", c_r_sch_b = "*", c_r_zme = "*", c_r_zme_b = "*", c_r_kon = "*", c_r_kon_b = "*", c_sku = "*", c_sku_b = "*",}
	const enum GIisspVykazRekDtoTypes { vykaz_typ_iissp = "string", rok = "number", mesic_do = "number", isp_fim = "string", neshoda = "number", alternating = "number", rozdily = "number", rozdily_txt = "string", zdroj = "number", pocet_rozdilu = "number", radek_cislo = "string", nazev = "string", trida_polozka = "string", nazev_display = "string", c_r_sch = "JsonDecimal", c_r_sch_b = "boolean", c_r_zme = "JsonDecimal", c_r_zme_b = "boolean", c_r_kon = "JsonDecimal", c_r_kon_b = "boolean", c_sku = "JsonDecimal", c_sku_b = "boolean",}
	const enum GIisspVykazRekDtoTypeLengths { vykaz_typ_iissp = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazTypDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Typ výkazu*/
	interface GIisspVykazTypDto {
		vykaz_typ?: number|null;
		vykaz_typ_iissp?: string|null;
		vykaz_typ_txt?: string|null;
	}
	const enum GIisspVykazTypDtoNames { vykaz_typ = "vykaz_typ", vykaz_typ_iissp = "vykaz_typ_iissp", vykaz_typ_txt = "vykaz_typ_txt",}
	const enum GIisspVykazTypDtoFragments { vykaz_typ = "*", vykaz_typ_iissp = "*", vykaz_typ_txt = "*",}
	const enum GIisspVykazTypDtoTypes { vykaz_typ = "number", vykaz_typ_iissp = "string", vykaz_typ_txt = "string",}
	const enum GIisspVykazTypDtoTypeLengths { vykaz_typ_iissp = 4, vykaz_typ_txt = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\GIisspVykazZukDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**RV03 - Závazné ukazatele státního rozpočtu (FIN 1-12 OSS)*/
	interface GIisspVykazZukDto {
		vykaz_typ_iissp?: string|null;
		rok?: number|null;
		mesic_do?: number|null;
		isp_fim?: string|null;
		neshoda?: number|null;
		alternating?: number|null;
		rozdily?: number|null;
		rozdily_txt?: string|null;
		zdroj?: number|null;
		pocet_rozdilu?: number|null;
		id_ukazatel?: string|null;
		c_r_sch?: JsonDecimal|null;
		c_r_sch_b?: boolean|null;
		c_r_zme?: JsonDecimal|null;
		c_r_zme_b?: boolean|null;
		c_r_kon?: JsonDecimal|null;
		c_r_kon_b?: boolean|null;
		c_sku?: JsonDecimal|null;
		c_sku_b?: boolean|null;
		c_mrp?: JsonDecimal|null;
		c_mrp_b?: boolean|null;
		c_nnv?: JsonDecimal|null;
		c_nnv_b?: boolean|null;
	}
	const enum GIisspVykazZukDtoNames { vykaz_typ_iissp = "vykaz_typ_iissp", rok = "rok", mesic_do = "mesic_do", isp_fim = "isp_fim", neshoda = "neshoda", alternating = "alternating", rozdily = "rozdily", rozdily_txt = "rozdily_txt", zdroj = "zdroj", pocet_rozdilu = "pocet_rozdilu", id_ukazatel = "id_ukazatel", c_r_sch = "c_r_sch", c_r_sch_b = "c_r_sch_b", c_r_zme = "c_r_zme", c_r_zme_b = "c_r_zme_b", c_r_kon = "c_r_kon", c_r_kon_b = "c_r_kon_b", c_sku = "c_sku", c_sku_b = "c_sku_b", c_mrp = "c_mrp", c_mrp_b = "c_mrp_b", c_nnv = "c_nnv", c_nnv_b = "c_nnv_b",}
	const enum GIisspVykazZukDtoFragments { vykaz_typ_iissp = "*", rok = "*", mesic_do = "*", isp_fim = "*", neshoda = "*", alternating = "*", rozdily = "*", rozdily_txt = "*", zdroj = "*", pocet_rozdilu = "*", id_ukazatel = "*", c_r_sch = "*", c_r_sch_b = "*", c_r_zme = "*", c_r_zme_b = "*", c_r_kon = "*", c_r_kon_b = "*", c_sku = "*", c_sku_b = "*", c_mrp = "*", c_mrp_b = "*", c_nnv = "*", c_nnv_b = "*",}
	const enum GIisspVykazZukDtoTypes { vykaz_typ_iissp = "string", rok = "number", mesic_do = "number", isp_fim = "string", neshoda = "number", alternating = "number", rozdily = "number", rozdily_txt = "string", zdroj = "number", pocet_rozdilu = "number", id_ukazatel = "string", c_r_sch = "JsonDecimal", c_r_sch_b = "boolean", c_r_zme = "JsonDecimal", c_r_zme_b = "boolean", c_r_kon = "JsonDecimal", c_r_kon_b = "boolean", c_sku = "JsonDecimal", c_sku_b = "boolean", c_mrp = "JsonDecimal", c_mrp_b = "boolean", c_nnv = "JsonDecimal", c_nnv_b = "boolean",}
	const enum GIisspVykazZukDtoTypeLengths { vykaz_typ_iissp = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\ISL\Vykaz\IGIisspVykaz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IISSP VYKAZY*/
	interface IisspVykaz {
		/**Typy výkazů pro daný rok*/
		listTyp(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspVykazTypDto>>;
		/**Výsledek porovnání - RV04 / RV05 – Výkaz o nárocích z nespotřebovaných výdajů OSS*/
		listNar(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspVykazNarDto>>;
		/**Výsledek porovnání - RV03 - Závazné ukazatele státního rozpočtu (FIN 1-12 OSS)*/
		listZuk(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspVykazZukDto>>;
		/**Výsledek porovnání - RV02 / RV06 – Rekapitulace příjmů, výdajů, financování a jejich konsolidace*/
		listRek(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspVykazRekDto>>;
		/**Výsledek porovnání - RV01 – Globální výkaz*/
		listGlo(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspVykazGloDto>>;
		/**Porovná výkaz z IISSP s výkazem v GINIS*/
		porovnejCommit(rq?:Gordic.Iissp.Interface.GIisspVykazDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspVykazDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspVykazDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspVykazDto>>;
		/**Vytvoření výkazu, skládá se ze 2 kroků
		*     – IISSP metoda B_SP_EKIS_VYKAZ, volá WS = tvrdý commit (tato metoda)
		*     – vytvoření sestavy v GINIS, pro pozdější porovnání (v .ts)
		*     – při úspěchu sestavy zavolat isl UspechSestavyCommit(id_inbox_ssp)
		*/
		createCommit(rq?:Gordic.Iissp.Interface.GIisspVykazDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspVykazDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspVykazDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspVykazDto>>;
		/**Volat po úspěšném vytvoření sestavy, nastaví stav 1 = 'Ve frontě'
		*     – tvrdý commit
		*/
		uspechSestavyCommit(rq?:Gordic.Iissp.Interface.GIisspVykazDto|CallParams<GServiceActionRequest<Gordic.Iissp.Interface.GIisspVykazDto>>): _Task<GServiceActionRequest<Gordic.Iissp.Interface.GIisspVykazDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspVykazDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GIisspVykazDto>>;
		/**Info o tom, zda je povoleno generování výkazu*/
		readLzeGenerovat(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Iissp.Interface.GIisspVykazDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		IisspVykaz: ServiceBase & Catalog.IisspVykaz;
	}
	const IisspVykaz: Client["IisspVykaz"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\IGISLCfuKonfigurace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - číselníky státní pokladny*/
	interface CiselnikIissp {
		/**ISL seznam číselníků*/
		list(rq?:Gordic.Iissp.Interface.GCiselnikIisspFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdacDto>>;
		/**Ulozi seznam mailu do tabulky*/
		ulozMaily(rq?:Gordic.Iissp.Interface.GSspsdacDto|CallParams<GServiceSaveRequest<Gordic.Iissp.Interface.GSspsdacDto>>): _Task<GServiceSaveRequest<Gordic.Iissp.Interface.GSspsdacDto>,GServiceSaveResponse<Gordic.Iissp.Interface.GSspsdacDto>>;
		/**ISL detail číselníku RISRE0001*/
		rISRE0001Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcfmDto>>;
		/**ISL detail číselníku RISRE0002*/
		rISRE0002Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcpoDto>>;
		/**ISL detail číselníku RISRE0003*/
		rISRE0003Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdczdDto>>;
		/**ISL detail číselníku RISRE0004*/
		rISRE0004Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcpaDto>>;
		/**ISL detail číselníku RISRE0005*/
		rISRE0005Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcrpDto>>;
		/**ISL detail číselníku RISRE0006*/
		rISRE0006Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcprDto>>;
		/**ISL detail číselníku RISRE0012*/
		rISRE0012Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdczjDto>>;
		/**ISL detail číselníku RISRE0013*/
		rISRE0013Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcuzDto>>;
		/**ISL detail číselníku RISRE0016*/
		rISRE0016Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcujDto>>;
		/**ISL detail číselníku RISRE0017*/
		rISRE0017Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcstDto>>;
		/**ISL detail číselníku RISRE0018*/
		rISRE0028Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdcucDto>>;
		/**ISL detail číselníku RISRE0038*/
		rISRE0038Data(rq?:Gordic.Iissp.Interface.GCiselnikDetailFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Iissp.Interface.GSspsdczuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		CiselnikIissp: ServiceBase & Catalog.CiselnikIissp;
	}
	const CiselnikIissp: Client["CiselnikIissp"];
}
declare namespace Gordic.Iissp.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu číselníků*/
	const enum GCiselnikIisspFilterEnum {
		/**url, ze kterého se mají číselníky načítat*/
		url,
	}
	/**Výčet filtračních kritérií pro konkrétní číselník*/
	const enum GCiselnikDetailFilterEnum {
		/**kapitola*/
		kapitola,
		/**konkrétní kód (zj, zdroj atd.) pro zjištění jeho historie z hh tabulky*/
		historiePolozky,
		/**Zda se jedná o srovnávací select dvou verzí z hh tabulky*/
		compareVersions,
		/**Nová verze při srovnávání*/
		verzeNew,
		/**Stará verze při srovnávání*/
		verzeOld,
		/**Typ změn - 0 - všechny změny, novePolozky = 1, odstranenePolozky = 2, novePopisy = 3, upraveneZaznamy = 4*/
		typZmen,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\DataSets\GSspdcfm.Dto.d.ts 

declare namespace Gordic.Iissp.Interface {
    /**DBTABLE:Seznam*/
	interface GSspdcfmDto {
        /**DBCOLUMN:Seznam.fin_misto*/
		fin_misto?: string|null;
        /**DBCOLUMN:Seznam.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
        /**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
        /**DBCOLUMN:Seznam.popis_dlouhy*/
		popis_dlouhy?: string|null;
        /**DBCOLUMN:Seznam.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
        /**DBCOLUMN:Seznam.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
	}
	const enum GSspdcfmDtoNames { fin_misto = "fin_misto", dat_plat_od = "dat_plat_od", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do",}
	const enum GSspdcfmDtoFragments { fin_misto = "*", dat_plat_od = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*",}
	const enum GSspdcfmDtoTypes { fin_misto = "string", dat_plat_od = "JsonDate", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\DataSets\GSspscfm.Dto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:Seznam*/
	interface GSspscfmDto {
		/**DBCOLUMN:Seznam.fin_misto*/
		fin_misto?: string|null;
		/**DBCOLUMN:Seznam.fin_misto_nad*/
		fin_misto_nad?: string|null;
		/**DBCOLUMN:Seznam.fin_misto_typ*/
		fin_misto_typ?: string|null;
		/**DBCOLUMN:Seznam.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:Seznam.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:Seznam.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
	}
	const enum GSspscfmDtoNames { fin_misto = "fin_misto", fin_misto_nad = "fin_misto_nad", fin_misto_typ = "fin_misto_typ", priz_roz = "priz_roz", priz_uct = "priz_uct", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba",}
	const enum GSspscfmDtoFragments { fin_misto = "*", fin_misto_nad = "*", fin_misto_typ = "*", priz_roz = "*", priz_uct = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*",}
	const enum GSspscfmDtoTypes { fin_misto = "string", fin_misto_nad = "string", fin_misto_typ = "string", priz_roz = "number", priz_uct = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\DataSets\GSspsdac.Dto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:Seznam*/
	interface GSspsdacDto {
		/**DBCOLUMN:Seznam.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.verze*/
		verze?: string|null;
		/**DBCOLUMN:Seznam.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.maily*/
		maily?: string|null;
		/**verze na webu*/
		verze_web_date?: string|null;
		/**verze v db*/
		verze_db_date?: string|null;
	}
	const enum GSspsdacDtoNames { id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", verze = "verze", soubor = "soubor", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", maily = "maily", verze_web_date = "verze_web_date", verze_db_date = "verze_db_date",}
	const enum GSspsdacDtoFragments { id_dav_cis_risre = "*", nazev = "*", popis = "*", verze = "*", soubor = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", maily = "*", verze_web_date = "*", verze_db_date = "*",}
	const enum GSspsdacDtoTypes { id_dav_cis_risre = "number", nazev = "string", popis = "string", verze = "string", soubor = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", maily = "string", verze_web_date = "string", verze_db_date = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GCiselnikDetailFilterDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Filter na detail konkrétního číselníku IISSP*/
	interface GCiselnikDetailFilterDto {
		/**kapitola*/
		kapitola?: string|null;
		/**konkrétní kód (zj, zdroj atd.) pro zjištění jeho historie z hh tabulky*/
		historiePolozky?: string|null;
		/**Zda se jedná o srovnávací select dvou verzí z hh tabulky*/
		compareVersions?: boolean|null;
		/**Nová verze při srovnávání*/
		verzeNew?: string|null;
		/**Stará verze při srovnávání*/
		verzeOld?: string|null;
		/**Typ změn - 0 - všechny změny, novePolozky = 1, odstranenePolozky = 2, novePopisy = 3, upraveneZaznamy = 4*/
		typZmen?: number|null;
	}
	const enum GCiselnikDetailFilterDtoNames { kapitola = "kapitola", historiePolozky = "historiePolozky", compareVersions = "compareVersions", verzeNew = "verzeNew", verzeOld = "verzeOld", typZmen = "typZmen",}
	const enum GCiselnikDetailFilterDtoFragments { kapitola = "*", historiePolozky = "*", compareVersions = "*", verzeNew = "*", verzeOld = "*", typZmen = "*",}
	const enum GCiselnikDetailFilterDtoTypes { kapitola = "string", historiePolozky = "string", compareVersions = "boolean", verzeNew = "string", verzeOld = "string", typZmen = "number",}
	const enum GCiselnikDetailFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GCiselnikIisspFilterDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**Filter na seznam číselníků Iissp*/
	interface GCiselnikIisspFilterDto {
		/**url*/
		url?: string|null;
	}
	const enum GCiselnikIisspFilterDtoNames { url = "url",}
	const enum GCiselnikIisspFilterDtoFragments { url = "*",}
	const enum GCiselnikIisspFilterDtoTypes { url = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcfmDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcfmDto {
		/**DBCOLUMN:sspscfm.fin_misto*/
		fin_misto?: string|null;
		/**DBCOLUMN:sspscfm.fin_misto_nad*/
		fin_misto_nad?: string|null;
		/**DBCOLUMN:sspscfm.fin_misto_typ*/
		fin_misto_typ?: string|null;
		/**DBCOLUMN:sspscfm.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscfm.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscfm.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscfm.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscfm.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscfm.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscfm.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscfm.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscfm.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcfm.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcfm.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcfm.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcfm.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcfm.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcfmDtoNames { fin_misto = "fin_misto", fin_misto_nad = "fin_misto_nad", fin_misto_typ = "fin_misto_typ", priz_roz = "priz_roz", priz_uct = "priz_uct", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcfmDtoFragments { fin_misto = "*", fin_misto_nad = "*", fin_misto_typ = "*", priz_roz = "*", priz_uct = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcfmDtoTypes { fin_misto = "string", fin_misto_nad = "string", fin_misto_typ = "string", priz_roz = "number", priz_uct = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcfmDtoTypeLengths { fin_misto = 16, fin_misto_nad = 16, fin_misto_typ = 1, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcpaDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcpaDto {
		/**DBCOLUMN:sspscpa.paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:sspscpa.paragraf_nad*/
		paragraf_nad?: string|null;
		/**DBCOLUMN:sspscpa.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscpa.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscpa.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscpa.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscpa.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscpa.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscpa.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscpa.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscpa.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcpa.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcpa.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcpa.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcpa.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcpa.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcpaDtoNames { paragraf = "paragraf", paragraf_nad = "paragraf_nad", priz_roz = "priz_roz", priz_uct = "priz_uct", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcpaDtoFragments { paragraf = "*", paragraf_nad = "*", priz_roz = "*", priz_uct = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcpaDtoTypes { paragraf = "string", paragraf_nad = "string", priz_roz = "number", priz_uct = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcpaDtoTypeLengths { paragraf = 16, paragraf_nad = 16, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcpoDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcpoDto {
		/**DBCOLUMN:sspscpo.polozka*/
		polozka?: string|null;
		/**DBCOLUMN:sspscpo.polozka_nad*/
		polozka_nad?: string|null;
		/**DBCOLUMN:sspscpo.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscpo.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscpo.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscpo.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscpo.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscpo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscpo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscpo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscpo.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcpo.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcpo.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcpo.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcpo.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcpo.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcpoDtoNames { polozka = "polozka", polozka_nad = "polozka_nad", priz_roz = "priz_roz", priz_uct = "priz_uct", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcpoDtoFragments { polozka = "*", polozka_nad = "*", priz_roz = "*", priz_uct = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcpoDtoTypes { polozka = "string", polozka_nad = "string", priz_roz = "number", priz_uct = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcpoDtoTypeLengths { polozka = 24, polozka_nad = 24, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcprDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcprDto {
		/**DBCOLUMN:sspscpr.kapitola*/
		kapitola?: string|null;
		/**DBCOLUMN:sspscpr.rozp_program*/
		program_zed?: string|null;
		/**DBCOLUMN:sspscpr.program_zed_nad*/
		program_zed_nad?: string|null;
		/**DBCOLUMN:sspscpr.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscpr.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscpr.stav_zed*/
		stav_zed?: string|null;
		/**DBCOLUMN:sspscpr.priz_agr*/
		priz_agr?: number|null;
		/**DBCOLUMN:sspscpr.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscpr.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscpr.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscpr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscpr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscpr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscpr.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcpr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcpr.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcpr.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcpr.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcpr.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcprDtoNames { kapitola = "kapitola", program_zed = "program_zed", program_zed_nad = "program_zed_nad", priz_roz = "priz_roz", priz_uct = "priz_uct", stav_zed = "stav_zed", priz_agr = "priz_agr", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcprDtoFragments { kapitola = "*", program_zed = "*", program_zed_nad = "*", priz_roz = "*", priz_uct = "*", stav_zed = "*", priz_agr = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcprDtoTypes { kapitola = "string", program_zed = "string", program_zed_nad = "string", priz_roz = "number", priz_uct = "number", stav_zed = "string", priz_agr = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcprDtoTypeLengths { kapitola = 4, program_zed = 24, program_zed_nad = 24, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcrpDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcrpDto {
		/**DBCOLUMN:sspscrp.kapitola*/
		kapitola?: string|null;
		/**DBCOLUMN:sspscrp.rozp_program*/
		rozp_program?: string|null;
		/**DBCOLUMN:sspscrp.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscrp.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscrp.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscrp.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscrp.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscrp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscrp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscrp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscrp.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcrp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcrp.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcrp.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcrp.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcrp.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcrpDtoNames { kapitola = "kapitola", rozp_program = "rozp_program", priz_roz = "priz_roz", priz_uct = "priz_uct", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcrpDtoFragments { kapitola = "*", rozp_program = "*", priz_roz = "*", priz_uct = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcrpDtoTypes { kapitola = "string", rozp_program = "string", priz_roz = "number", priz_uct = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcrpDtoTypeLengths { kapitola = 4, rozp_program = 24, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcstDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcstDto {
		/**DBCOLUMN:sspscst.kapitola*/
		kapitola?: string|null;
		/**DBCOLUMN:sspscst.struktura_pv*/
		struktura_pv?: string|null;
		/**DBCOLUMN:sspscst.priz_prijem*/
		priz_prijem?: number|null;
		/**DBCOLUMN:sspscst.priz_vydej*/
		priz_vydej?: number|null;
		/**DBCOLUMN:sspscst.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscst.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscst.priz_spec_ukaz*/
		priz_spec_ukaz?: number|null;
		/**DBCOLUMN:sspscst.struktura_pv_nad*/
		struktura_pv_nad?: string|null;
		/**DBCOLUMN:sspscst.zdroj*/
		zdroj?: string|null;
		/**DBCOLUMN:sspscst.fin_misto*/
		fin_misto?: string|null;
		/**DBCOLUMN:sspscst.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscst.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscst.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscst.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscst.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscst.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscst.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcst.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcst.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcst.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcst.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcst.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcstDtoNames { kapitola = "kapitola", struktura_pv = "struktura_pv", priz_prijem = "priz_prijem", priz_vydej = "priz_vydej", priz_roz = "priz_roz", priz_uct = "priz_uct", priz_spec_ukaz = "priz_spec_ukaz", struktura_pv_nad = "struktura_pv_nad", zdroj = "zdroj", fin_misto = "fin_misto", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcstDtoFragments { kapitola = "*", struktura_pv = "*", priz_prijem = "*", priz_vydej = "*", priz_roz = "*", priz_uct = "*", priz_spec_ukaz = "*", struktura_pv_nad = "*", zdroj = "*", fin_misto = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcstDtoTypes { kapitola = "string", struktura_pv = "string", priz_prijem = "number", priz_vydej = "number", priz_roz = "number", priz_uct = "number", priz_spec_ukaz = "number", struktura_pv_nad = "string", zdroj = "string", fin_misto = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcstDtoTypeLengths { kapitola = 4, struktura_pv = 10, struktura_pv_nad = 10, zdroj = 10, fin_misto = 16, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcucDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcucDto {
		/**DBCOLUMN:sspscuc.ucel*/
		ucel?: string|null;
		/**DBCOLUMN:sspscuc.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspscuc.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspscuc.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscuc.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscuc.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscuc.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscuc.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscuc.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscuc.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcuc.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcuc.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcuc.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcuc.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcuc.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcucDtoNames { ucel = "ucel", priz_roz = "priz_roz", priz_uct = "priz_uct", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcucDtoFragments { ucel = "*", priz_roz = "*", priz_uct = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcucDtoTypes { ucel = "string", priz_roz = "number", priz_uct = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcucDtoTypeLengths { ucel = 9, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcujDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcujDto {
		/**DBCOLUMN:sspscuj.uzem_jednotka*/
		uzem_jednotka?: string|null;
		/**DBCOLUMN:sspscuj.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscuj.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscuj.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscuj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscuj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscuj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscuj.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcuj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcuj.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcuj.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcuj.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcuj.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcujDtoNames { uzem_jednotka = "uzem_jednotka", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcujDtoFragments { uzem_jednotka = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcujDtoTypes { uzem_jednotka = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcujDtoTypeLengths { uzem_jednotka = 6, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdcuzDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdcuzDto {
		/**DBCOLUMN:sspscuz.uz*/
		uz?: string|null;
		/**DBCOLUMN:sspscuz.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspscuz.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspscuz.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspscuz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspscuz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspscuz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspscuz.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdcuz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdcuz.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdcuz.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdcuz.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdcuz.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdcuzDtoNames { uz = "uz", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdcuzDtoFragments { uz = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdcuzDtoTypes { uz = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdcuzDtoTypeLengths { uz = 7, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdczdDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdczdDto {
		/**DBCOLUMN:sspsczd.zdroj*/
		zdroj?: string|null;
		/**DBCOLUMN:sspsczd.priz_roz*/
		priz_roz?: number|null;
		/**DBCOLUMN:sspsczd.priz_uct*/
		priz_uct?: number|null;
		/**DBCOLUMN:sspsczd.priz_prip_roz*/
		priz_prip_roz?: number|null;
		/**DBCOLUMN:sspsczd.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspsczd.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspsczd.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspsczd.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspsczd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspsczd.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspsczd.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdczd.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdczd.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdczd.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdczd.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdczd.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdczdDtoNames { zdroj = "zdroj", priz_roz = "priz_roz", priz_uct = "priz_uct", priz_prip_roz = "priz_prip_roz", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdczdDtoFragments { zdroj = "*", priz_roz = "*", priz_uct = "*", priz_prip_roz = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdczdDtoTypes { zdroj = "string", priz_roz = "number", priz_uct = "number", priz_prip_roz = "number", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdczdDtoTypeLengths { zdroj = 10, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdczjDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdczjDto {
		/**DBCOLUMN:sspsczj.zj*/
		zj?: string|null;
		/**DBCOLUMN:sspsczj.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspsczj.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspsczj.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspsczj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspsczj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspsczj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspsczj.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdczj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdczj.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdczj.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdczj.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdczj.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdczjDtoNames { zj = "zj", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdczjDtoFragments { zj = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdczjDtoTypes { zj = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdczjDtoTypeLengths { zj = 3, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Iissp.Interface\NapocetCiselniku\Dto\GSspsdczuDto.d.ts 

declare namespace Gordic.Iissp.Interface {
	/**DBTABLE:~*/
	interface GSspsdczuDto {
		/**DBCOLUMN:sspsczu.kapitola*/
		kapitola?: string|null;
		/**DBCOLUMN:sspsczu.zavaz_ukazatel*/
		zavaz_ukazatel?: string|null;
		/**DBCOLUMN:sspsczu.zavaz_ukazatel_typ*/
		zavaz_ukazatel_typ?: string|null;
		/**DBCOLUMN:sspsczu.zavaz_ukazatel_nad*/
		zavaz_ukazatel_nad?: string|null;
		/**DBCOLUMN:sspsczu.fin_radka*/
		fin_radka?: string|null;
		/**DBCOLUMN:sspsczu.trid_klic*/
		trid_klic?: string|null;
		/**DBCOLUMN:sspsczu.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:sspsczu.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:sspsczu.dat_posl_udrzba*/
		dat_posl_udrzba?: JsonDate|null;
		/**DBCOLUMN:sspsczu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspsczu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspsczu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspsczu.id_dav_cis_risre*/
		id_dav_cis_risre?: number|null;
		/**DBCOLUMN:sspdczu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sspdczu.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdczu.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:sspdczu.dat_plat_text_od*/
		dat_plat_text_od?: JsonDate|null;
		/**DBCOLUMN:sspdczu.dat_plat_text_do*/
		dat_plat_text_do?: JsonDate|null;
		/**Verze dávky*/
		verze?: string|null;
		/**insert, update, delete*/
		iud?: string|null;
		/**insert, update, delete*/
		iud_texty?: string|null;
	}
	const enum GSspsdczuDtoNames { kapitola = "kapitola", zavaz_ukazatel = "zavaz_ukazatel", zavaz_ukazatel_typ = "zavaz_ukazatel_typ", zavaz_ukazatel_nad = "zavaz_ukazatel_nad", fin_radka = "fin_radka", trid_klic = "trid_klic", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_posl_udrzba = "dat_posl_udrzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_dav_cis_risre = "id_dav_cis_risre", nazev = "nazev", popis = "popis", popis_dlouhy = "popis_dlouhy", dat_plat_text_od = "dat_plat_text_od", dat_plat_text_do = "dat_plat_text_do", verze = "verze", iud = "iud", iud_texty = "iud_texty",}
	const enum GSspsdczuDtoFragments { kapitola = "*", zavaz_ukazatel = "*", zavaz_ukazatel_typ = "*", zavaz_ukazatel_nad = "*", fin_radka = "*", trid_klic = "*", dat_plat_od = "*", dat_plat_do = "*", dat_posl_udrzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_dav_cis_risre = "*", nazev = "*", popis = "*", popis_dlouhy = "*", dat_plat_text_od = "*", dat_plat_text_do = "*", verze = "*", iud = "*", iud_texty = "*",}
	const enum GSspsdczuDtoTypes { kapitola = "string", zavaz_ukazatel = "string", zavaz_ukazatel_typ = "string", zavaz_ukazatel_nad = "string", fin_radka = "string", trid_klic = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_posl_udrzba = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_dav_cis_risre = "number", nazev = "string", popis = "string", popis_dlouhy = "string", dat_plat_text_od = "JsonDate", dat_plat_text_do = "JsonDate", verze = "string", iud = "string", iud_texty = "string",}
	const enum GSspsdczuDtoTypeLengths { kapitola = 4, zavaz_ukazatel = 12, zavaz_ukazatel_typ = 2, zavaz_ukazatel_nad = 12, fin_radka = 4, trid_klic = 4, zmenu_prov = 12, nazev = 20, popis = 60, popis_dlouhy = 255, verze = 8, iud = 1, iud_texty = 1,}
}

//#endregion

