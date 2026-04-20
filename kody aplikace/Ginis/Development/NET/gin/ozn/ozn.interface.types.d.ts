/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ozn.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ozn.Interface\Gordic.Ozn.Interface.csproj
*    created     2026-02-16 14:33:45
*    files       Cis\Dto\GGincumsDto.d.ts
*                Cis\List\IGGincumsNew.d.ts
*                Dto\GGinstreDto.d.ts
*                Dto\GMessageDto.d.ts
*                Dto\GMessagesReadedDto.d.ts
*                Dto\GResultHromadneOperace.d.ts
*                ISL\GMessagesReaded.d.ts
*                ISL\Messages.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\Cis\Dto\GGincumsDto.d.ts 

declare namespace Gordic.Ozn.Interface {
	/**DBTABLE:gincums*/
	interface GGincumsDto {
		/**DBCOLUMN:gincums.uroven_msg*/
		uroven_msg?: number|null;
		/**DBCOLUMN:gincums.uroven_msg_txt*/
		uroven_msg_txt?: string|null;
		/**DBCOLUMN:gincums.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincums.k_s*/
		k_s?: string|null;
	}
	const enum GGincumsDtoNames { uroven_msg = "uroven_msg", uroven_msg_txt = "uroven_msg_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincumsDtoFragments { uroven_msg = "*", uroven_msg_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincumsDtoTypes { uroven_msg = "number", uroven_msg_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\Cis\List\IGGincumsNew.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\Dto\GGinstreDto.d.ts 

declare namespace Gordic.Ozn.Interface {
	/**GGincfazSimpleDto*/
	interface GGinstreDto {
		/**faze*/
		ixs_tre?: string|null;
		/**nazev*/
		zkratka?: string|null;
		/**aktivita*/
		nazev?: string|null;
		/**aktivita*/
		aktivita?: number|null;
	}
	const enum GGinstreDtoNames { ixs_tre = "ixs_tre", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita",}
	const enum GGinstreDtoFragments { ixs_tre = "*", zkratka = "*", nazev = "*", aktivita = "*",}
	const enum GGinstreDtoTypes { ixs_tre = "string", zkratka = "string", nazev = "string", aktivita = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\Dto\GMessageDto.d.ts 

declare namespace Gordic.Ozn.Interface {
	/**GMessageDto*/
	interface GMessageDto {
		/**id_avz*/
		id_avz?: number|null;
		/**datum_od*/
		datum_od?: JsonDate|null;
		/**datum_do*/
		datum_do?: JsonDate|null;
		/**typ_msg*/
		typ_msg?: string|null;
		/**priorita*/
		priorita?: number|null;
		/**popis*/
		popis?: string|null;
		/**soubor*/
		soubor?: JsonBlob|null;
		/**nazev_souboru*/
		nazev_souboru?: string|null;
		/**pripona_souboru*/
		pripona_souboru?: string|null;
		/**faze*/
		faze?: Gordic.ControlsLogic.Interface.GGincfazDto[]|null;
		/**ixs_tre*/
		strediska?: Gordic.Ozn.Interface.GGinstreDto[]|null;
		/**text*/
		text?: string|null;
		/**Guid souboru*/
		guid?: string|null;
		/**Uroven*/
		uroven_msg?: number|null;
		/**uroven msg text*/
		uroven_msg_txt?: string|null;
		/**archiv*/
		archiv?: number|null;
		/**Trvání notifikace až se vloží do not centra*/
		avz_delay?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Příznak zaškrtknutí všech fází*/
		fazeAllChecked?: boolean|null;
	}
	const enum GMessageDtoNames { id_avz = "id_avz", datum_od = "datum_od", datum_do = "datum_do", typ_msg = "typ_msg", priorita = "priorita", popis = "popis", soubor = "soubor", nazev_souboru = "nazev_souboru", pripona_souboru = "pripona_souboru", faze = "faze", strediska = "strediska", text = "text", guid = "guid", uroven_msg = "uroven_msg", uroven_msg_txt = "uroven_msg_txt", archiv = "archiv", avz_delay = "avz_delay", aktivita = "aktivita", fazeAllChecked = "fazeAllChecked",}
	const enum GMessageDtoFragments { id_avz = "*", datum_od = "*", datum_do = "*", typ_msg = "*", priorita = "*", popis = "*", soubor = "*", nazev_souboru = "*", pripona_souboru = "*", faze = "*", strediska = "*", text = "*", guid = "*", uroven_msg = "*", uroven_msg_txt = "*", archiv = "*", avz_delay = "*", aktivita = "*", fazeAllChecked = "*",}
	const enum GMessageDtoTypes { id_avz = "number", datum_od = "JsonDate", datum_do = "JsonDate", typ_msg = "string", priorita = "number", popis = "string", soubor = "JsonBlob", nazev_souboru = "string", pripona_souboru = "string", faze = "Gordic.ControlsLogic.Interface.GGincfazDto[]", strediska = "Gordic.Ozn.Interface.GGinstreDto[]", text = "string", guid = "string", uroven_msg = "number", uroven_msg_txt = "string", archiv = "number", avz_delay = "number", aktivita = "number", fazeAllChecked = "boolean",}
	const enum GMessageDtoTypeLengths {}
	const enum GMessageFilter {
		/**Id avz*/
		id_avz,
		/**uroven_msg*/
		uroven_msg,
		/**popis*/
		popis,
		/**aktivita*/
		aktivita,
		/**archiv*/
		archiv,
		/**faze*/
		faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\Dto\GMessagesReadedDto.d.ts 

declare namespace Gordic.Ozn.Interface {
	/**Objekt pro kontrolu, kdo potvrdil přečtení oznámení*/
	interface GMessagesReadedDto {
		/**Id oznámení*/
		id_avz?: number|null;
		/**Kdy byla zpráva zobrazena*/
		dat_zmena?: JsonDate|null;
		/**Titul před osoby*/
		tit_pred?: string|null;
		/**Titul za osoby*/
		tit_za?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Název*/
		nazev?: string|null;
	}
	const enum GMessagesReadedDtoNames { id_avz = "id_avz", dat_zmena = "dat_zmena", tit_pred = "tit_pred", tit_za = "tit_za", jmeno = "jmeno", prijmeni = "prijmeni", nazev = "nazev",}
	const enum GMessagesReadedDtoFragments { id_avz = "*", dat_zmena = "*", tit_pred = "*", tit_za = "*", jmeno = "*", prijmeni = "*", nazev = "*",}
	const enum GMessagesReadedDtoTypes { id_avz = "number", dat_zmena = "JsonDate", tit_pred = "string", tit_za = "string", jmeno = "string", prijmeni = "string", nazev = "string",}
	/**Filtr pro získání dat o přečtení*/
	const enum GMessagesReadedFilter {
		/**Číslo zprávy*/
		id_avz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\Dto\GResultHromadneOperace.d.ts 

declare namespace Gordic.Ozn.Interface {
	/**Výsledek hromadné operace*/
	interface GResultHromadneOperace {
		/**výsledek*/
		result_txt?: string|null;
		/**ppopis*/
		popis?: string|null;
		/**Výsledek result (oK, error)*/
		result?: Gordic.Ozn.Interface.GResultHromadneOperaceEnum|null;
	}
	const enum GResultHromadneOperaceNames { result_txt = "result_txt", popis = "popis", result = "result",}
	const enum GResultHromadneOperaceFragments { result_txt = "*", popis = "*", result = "*",}
	const enum GResultHromadneOperaceTypes { result_txt = "string", popis = "string", result = "Gordic.Ozn.Interface.GResultHromadneOperaceEnum",}
	/**Výsledek hromadné operace*/
	const enum GResultHromadneOperaceEnum {
		/**OK*/
		OK,
		/**Chyba*/
		Error,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\ISL\GMessagesReaded.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGMessages
	* @domain Core
	*/
	interface MessagesReaded {
		/**Získání seznamu záznamů o přečtení*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ozn.Interface.GMessagesReadedDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MessagesReaded: ServiceBase & Catalog.MessagesReaded;
	}
	const MessagesReaded: Client["MessagesReaded"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ozn.Interface\ISL\Messages.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGMessages
	* @domain Core
	*/
	interface Messages {
		/**Nacteni vsech aktivnich oznameni*/
		listReaded(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ozn.Interface.GMessageDto>>;
		/**Nacteni vsech aktivnich oznameni*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ozn.Interface.GMessageDto>>;
		/**Nacteni detailu oznameni*/
		read(rq?:Gordic.Ozn.Interface.GMessageDto|CallParams<GServiceReadRequest<Gordic.Ozn.Interface.GMessageDto>>): _Task<GServiceReadRequest<Gordic.Ozn.Interface.GMessageDto>,GServiceReadResponse<Gordic.Ozn.Interface.GMessageDto>>;
		/**ReadEntireDetail*/
		readEntire(rq?:Gordic.Ozn.Interface.GMessageDto|CallParams<GServiceReadRequest<Gordic.Ozn.Interface.GMessageDto>>): _Task<GServiceReadRequest<Gordic.Ozn.Interface.GMessageDto>,GServiceReadResponse<Gordic.Ozn.Interface.GMessageDto>>;
		/**Výpis všech oznámení*/
		listAll(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ozn.Interface.GMessageDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Ozn.Interface.GMessageDto|CallParams<GServiceSaveRequest<Gordic.Ozn.Interface.GMessageDto>>): _Task<GServiceSaveRequest<Gordic.Ozn.Interface.GMessageDto>,GServiceSaveResponse<Gordic.Ozn.Interface.GMessageDto>>;
		/**Upsert*/
		zneaktivnitHromadne(rq?:CallParams<{data:Gordic.Ozn.Interface.GMessageDto[]}>): _Task<{data:Gordic.Ozn.Interface.GMessageDto[]},Gordic.Ozn.Interface.GResultHromadneOperace[]>;
		/**Hromadné ukončení platnosti*/
		ukoncitPlatnostHromadne(rq?:CallParams<{data:Gordic.Ozn.Interface.GMessageDto[]}>): _Task<{data:Gordic.Ozn.Interface.GMessageDto[]},Gordic.Ozn.Interface.GResultHromadneOperace[]>;
		/**Hromadné ukončení platnosti*/
		archivovatHromadne(rq?:CallParams<{data:Gordic.Ozn.Interface.GMessageDto[]}>): _Task<{data:Gordic.Ozn.Interface.GMessageDto[]},Gordic.Ozn.Interface.GResultHromadneOperace[]>;
		/**ConfirmRead*/
		confirmRead(rq?:CallParams<{id_avz:number}>): _Task<{id_avz:number},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Messages: ServiceBase & Catalog.Messages;
	}
	const Messages: Client["Messages"];
}

//#endregion

