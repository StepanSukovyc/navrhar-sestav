/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ess.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ess.Interface\Gordic.Ess.Interface.csproj
*    created     2026-02-16 14:34:17
*    files       IGEss.d.ts
*                DTO\GEssIslDto.d.ts
*                DTO\GSslssplDto.d.ts
*                DTO\Export\GEssExportIdDto.d.ts
*                DTO\Export\GEssExportInputDto.d.ts
*                DTO\Export\GEssExportIxbDto.d.ts
*                DTO\Export\GEssExportIxpDto.d.ts
*                DTO\Export\GEssExportResultDto.d.ts
*                DTO\Import\GEssImportEntityDto.d.ts
*                DTO\Import\GEssImportFileVerDto.d.ts
*                DTO\Import\GEssImportInputDto.d.ts
*                DTO\Import\GEssImportReportDto.d.ts
*                DTO\Import\GEssImportReportIntddavDto.d.ts
*                DTO\Import\GEssIntddavDto.d.ts
*                DTO\Import\GEssOdpoved2024Dto.d.ts
*                DTO\Import\GEssRssddavDto.d.ts
*                DTO\Import\GEssRsssdavDto.d.ts
*                Filter\GEssIslFilter.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\IGEss.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL ESS*/
	interface Ess {
		/**Vygenerování XML potvrzení k naimportované dávce*/
		getEssOdpoved2024(rq?:CallParams<{ImportDavkaDto:Gordic.Ess.Interface.GEssImportInputDto}>): _Task<{ImportDavkaDto:Gordic.Ess.Interface.GEssImportInputDto},Gordic.Ess.Interface.GEssOdpoved2024Dto>;
		/**Načtení detailu jedne davky z tabulky rssddav*/
		listRssddav(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ess.Interface.GEssRssddavDto>>;
		/**Načtení davek z tabulky rsssdav*/
		listRsssdav(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ess.Interface.GEssRsssdavDto>>;
		/**Kontrola entity externí vs interní v tabulce intddav*/
		checkIxsIntddav(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ess.Interface.GEssIntddavDto>>;
		/**Načte seznam identifikátorů písemnosti*/
		listIxp(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ess.Interface.GEssExportIxpDto>>;
		/**Vrať identifikátory souborů (ixb) s identifikátory písemností (ixp) dle identifikátorů písemností (ixp)*/
		getIxbWithIxpFromIxpInput(rq?:CallParams<{Input:Gordic.Ess.Interface.GEssExportIxpDto[]}>): _Task<{Input:Gordic.Ess.Interface.GEssExportIxpDto[]},GServiceReadResponse<Gordic.Ess.Interface.GEssExportIdDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ess: ServiceBase & Catalog.Ess;
	}
	const Ess: Client["Ess"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\GEssIslDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssIslDto (zatím bez využití)*/
	interface GEssIslDto {
	}
	const enum GEssIslDtoNames {}
	const enum GEssIslDtoFragments {}
	const enum GEssIslDtoTypes {}
	const enum GEssIslDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\GSslssplDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**DBTABLE:sslsspl
	*      Spisový plán
	*/
	interface GSslssplDto {
		/**Spisový plán
		*      Id spisového plánu. Jedná se o identifikátor v otevřeném tvaru, takže se zobrazuje běžným uživatelům a nelze jej dodatečně editovat.
		*/
		spis_pl?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Výčet středisek
		*      Příznak výčtu přiřazených středisek spisových uzlů. Pokud je 0-ne, potom spisový plán platí pro všechna střediska. Pokud je 1-Ano, potom platí pouze pro výčtem uvedená střediska.
		*/
		priz_vycet?: number|null;
		/**Oddělovač
		*      Znaky, které jsou v rámci plně určeného spisového znaku použity jako oddělovače jednotlivých spisových znaků
		*/
		oddelovace?: string|null;
		/**Přírustek
		*      Výchozí inkrement, který se má použít při zakládání nového spisového znaku v rámci nějaké věcné skupiny.
		*/
		prirustek?: number|null;
		/**Číselný parametr*/
		priz_num?: number|null;
		priz_manual?: number|null;
		priz_check_lev?: number|null;
		root_level?: number|null;
		priz_end_znak?: number|null;
		/**Středisko spisových uzlů*/
		ixs_tre?: string|null;
		/**Externí označení
		*      ID použité v externím systému ( např. po importu spisového plánu z externího zdroje )
		*/
		spis_pl_ext?: string|null;
	}
	const enum GSslssplDtoNames { spis_pl = "spis_pl", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", popis = "popis", priz_vycet = "priz_vycet", oddelovace = "oddelovace", prirustek = "prirustek", priz_num = "priz_num", priz_manual = "priz_manual", priz_check_lev = "priz_check_lev", root_level = "root_level", priz_end_znak = "priz_end_znak", ixs_tre = "ixs_tre", spis_pl_ext = "spis_pl_ext",}
	const enum GSslssplDtoFragments { spis_pl = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", popis = "*", priz_vycet = "*", oddelovace = "*", prirustek = "*", priz_num = "*", priz_manual = "*", priz_check_lev = "*", root_level = "*", priz_end_znak = "*", ixs_tre = "*", spis_pl_ext = "*",}
	const enum GSslssplDtoTypes { spis_pl = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", popis = "string", priz_vycet = "number", oddelovace = "string", prirustek = "number", priz_num = "number", priz_manual = "number", priz_check_lev = "number", root_level = "number", priz_end_znak = "number", ixs_tre = "string", spis_pl_ext = "string",}
	const enum GSslssplDtoTypeLengths { spis_pl = 5, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, oddelovace = 20, ixs_tre = 12, spis_pl_ext = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Export\GEssExportIdDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssExportIdDto*/
	interface GEssExportIdDto {
		/**ID pisemnosti, souboru*/
		Ids?: string[]|null;
	}
	const enum GEssExportIdDtoNames { Ids = "Ids",}
	const enum GEssExportIdDtoFragments { Ids = "*",}
	const enum GEssExportIdDtoTypes { Ids = "string[]",}
	const enum GEssExportIdDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Export\GEssExportInputDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssExportResultDto*/
	interface GEssExportInputDto {
		/**Typ 
		*     0 - přenos
		*     10 - export
		*/
		Type?: number|null;
		/**IxpList*/
		IxpList?: string[]|null;
		/**ID ext. systému*/
		IxsExt?: string|null;
		/**Důvod přenosu (dávky)*/
		DuvodPrenosu?: string|null;
		/**Uživatelská poznámka*/
		Poznamka?: string|null;
		/**Výstupní název souboru*/
		FileName?: string|null;
	}
	const enum GEssExportInputDtoNames { Type = "Type", IxpList = "IxpList", IxsExt = "IxsExt", DuvodPrenosu = "DuvodPrenosu", Poznamka = "Poznamka", FileName = "FileName",}
	const enum GEssExportInputDtoFragments { Type = "*", IxpList = "*", IxsExt = "*", DuvodPrenosu = "*", Poznamka = "*", FileName = "*",}
	const enum GEssExportInputDtoTypes { Type = "number", IxpList = "string[]", IxsExt = "string", DuvodPrenosu = "string", Poznamka = "string", FileName = "string",}
	const enum GEssExportInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Export\GEssExportIxbDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssExportIxpDto*/
	interface GEssExportIxbDto {
		/**ID souboru*/
		ixb?: string|null;
	}
	const enum GEssExportIxbDtoNames { ixb = "ixb",}
	const enum GEssExportIxbDtoFragments { ixb = "*",}
	const enum GEssExportIxbDtoTypes { ixb = "string",}
	const enum GEssExportIxbDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Export\GEssExportIxpDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssExportIxpDto*/
	interface GEssExportIxpDto {
		/**ixp*/
		ixp?: string|null;
		/**typ_spis*/
		typ_spis?: number|null;
		/**Datum podání*/
		dat_pod?: JsonDate|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Název*/
		nazev?: string|null;
		/**Vlastník*/
		nazev_rf?: string|null;
		/**Věcná skupina (název)*/
		vecskup_nazev?: string|null;
		/**Věcná skupina (spisový znak)*/
		vecskup_spis_znak?: string|null;
	}
	const enum GEssExportIxpDtoNames { ixp = "ixp", typ_spis = "typ_spis", dat_pod = "dat_pod", dat_zmena = "dat_zmena", nazev = "nazev", nazev_rf = "nazev_rf", vecskup_nazev = "vecskup_nazev", vecskup_spis_znak = "vecskup_spis_znak",}
	const enum GEssExportIxpDtoFragments { ixp = "*", typ_spis = "*", dat_pod = "*", dat_zmena = "*", nazev = "*", nazev_rf = "*", vecskup_nazev = "*", vecskup_spis_znak = "*",}
	const enum GEssExportIxpDtoTypes { ixp = "string", typ_spis = "number", dat_pod = "JsonDate", dat_zmena = "JsonDate", nazev = "string", nazev_rf = "string", vecskup_nazev = "string", vecskup_spis_znak = "string",}
	const enum GEssExportIxpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Export\GEssExportResultDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssExportResultDto*/
	interface GEssExportResultDto {
		/**Guid pro stažení výsledku*/
		Guid?: string|null;
		/**Text chyby*/
		ErrorMessage?: string|null;
		/**Příznak úspěchu*/
		Success?: boolean|null;
		/**Popis výsledku*/
		ResultTxt?: string|null;
	}
	const enum GEssExportResultDtoNames { Guid = "Guid", ErrorMessage = "ErrorMessage", Success = "Success", ResultTxt = "ResultTxt",}
	const enum GEssExportResultDtoFragments { Guid = "*", ErrorMessage = "*", Success = "*", ResultTxt = "*",}
	const enum GEssExportResultDtoTypes { Guid = "string", ErrorMessage = "string", Success = "boolean", ResultTxt = "string",}
	const enum GEssExportResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssImportEntityDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Parametry jednoho prvku importovaného ze ZIP dávky podle NS2024 - jedna položka načtená z manifest.xml*/
	interface GEssImportEntityDto {
		/**Příznak, zda se tento prvek může zobrazovat uživatelům pro výběr - potlačení zobrazení musí být realizováno pro prvky, které 
		*     nesmí být samostatně vybrány volbou uživatele, jako např. soubory, dokumenty vložené do spisy, spisy vložené do typových spisů
		*     T42206
		*/
		UmoznitVyberUzivatele?: boolean|null;
		/**Příznak, zda se byl tento prvek vybrán uživatelem pro import*/
		VyberUzivatele?: boolean|null;
		/**IdEntity (Id Externí entity)*/
		IdEntity?: string|null;
		/**Jmeno*/
		Jmeno?: string|null;
		/**Otisk*/
		Otisk?: string|null;
		/**Poradi*/
		Poradi?: number|null;
		/**TypEntity {TypovySpis,Spis,Dokument,Soubor,SeznamUzivatelu,Ciselnik}*/
		TypEntity?: string|null;
		/**Umisteni*/
		Umisteni?: string|null;
		/**Interní ID věcné skupiny, do které se má prvek importovat. 
		*     Vychozí stav je nenastaveno = null
		*/
		IxsVsk?: string|null;
		/**Stav entity*/
		Stav?: string|null;
		/**Stav entity (textově)*/
		readonly StavTxt?: string|null;
		/**ID prvku tak jak je uvedeno dvousložkově v jednotlivých XML - druhá část ID - hodnota identifikátoru*/
		HodnotaID?: string|null;
		/**ID prvku tak jak je uvedeno dvousložkově v jednotlivých XML - první část ID - zdroj identifikátoru*/
		ZdrojID?: string|null;
		/**Název prvku jak je uvedeno v popisných metadatech Dokumentu/Spisu/Typového spisu*/
		Nazev?: string|null;
		/**Číslo jednací přidělené dokumentu 
		*     Bude naplněné pouze pro dokumenty
		*/
		CisloJednaci?: string|null;
		/**Spisová značka spisu
		*     Bude naplněna pro spisy a může být naplněna i pro spisu
		*/
		SpisovaZnacka?: string|null;
		/**Export / Dokument / DruhDokumentu / Nazev
		*     Bude naplněno pouze pro dokumenty
		*/
		DruhDokumentu?: string|null;
		/**ID spisu nebo typového spisu do kterého je prvek vložen. Může být null -> není vložen
		*     VlozenVeSpisu / SpisId / Identifikator / HodnotaID
		*/
		VlozenVeSpisu?: string|null;
		/**Spisový znak skupiny
		*     Export / { Spis || Dokument || TypovySpis }  / VecnaSkupina / SpisovyZnak - pouze pokud je StavZarazeni = Vlozen ( jinak null )
		*/
		VecnaSkupina?: string|null;
		/**Seznam entit, které jsou v rámci této entity obsažen - pro dokument jsou to el.soubory, pro spis jsou to dokumenty (DokumentyVlozene), pro typový spis jsou to spisy (Spis
		*     Tento seznam bude sloužit k automatickému výběru obsažených entit v případě, že je vybrána tato entita - aby byl zajištěn kompletní import entity
		*     OdkazyNaSoubory / dmFileLink / Identifikator / HodnotaID - kdekoliv se tento prvek v XML najde - může se vyskytovat v různých zanoření
		*/
		OdkazyNaSoubory?: string[]|null;
		/**DokumentID všech dokumentů vložených ve spisech
		*     DokumentyVlozene / DokumentIdVlozeny / DokumentId / Identifikator / HodnotaID
		*/
		DokumentyVlozene?: string[]|null;
		/**SpisID všech vložených spisů v typovém spisu
		*     SpisyVlozene / SpisVlozeny / SpisId / Identifikator / HodnotaID - kdekoliv se tento prvek v XML najde - může se vyskytovat v různých zanoření
		*/
		SpisVlozeny?: string[]|null;
	}
	const enum GEssImportEntityDtoNames { UmoznitVyberUzivatele = "UmoznitVyberUzivatele", VyberUzivatele = "VyberUzivatele", IdEntity = "IdEntity", Jmeno = "Jmeno", Otisk = "Otisk", Poradi = "Poradi", TypEntity = "TypEntity", Umisteni = "Umisteni", IxsVsk = "IxsVsk", Stav = "Stav", StavTxt = "StavTxt", HodnotaID = "HodnotaID", ZdrojID = "ZdrojID", Nazev = "Nazev", CisloJednaci = "CisloJednaci", SpisovaZnacka = "SpisovaZnacka", DruhDokumentu = "DruhDokumentu", VlozenVeSpisu = "VlozenVeSpisu", VecnaSkupina = "VecnaSkupina", OdkazyNaSoubory = "OdkazyNaSoubory", DokumentyVlozene = "DokumentyVlozene", SpisVlozeny = "SpisVlozeny",}
	const enum GEssImportEntityDtoFragments { UmoznitVyberUzivatele = "*", VyberUzivatele = "*", IdEntity = "*", Jmeno = "*", Otisk = "*", Poradi = "*", TypEntity = "*", Umisteni = "*", IxsVsk = "*", Stav = "*", StavTxt = "*", HodnotaID = "*", ZdrojID = "*", Nazev = "*", CisloJednaci = "*", SpisovaZnacka = "*", DruhDokumentu = "*", VlozenVeSpisu = "*", VecnaSkupina = "*", OdkazyNaSoubory = "*", DokumentyVlozene = "*", SpisVlozeny = "*",}
	const enum GEssImportEntityDtoTypes { UmoznitVyberUzivatele = "boolean", VyberUzivatele = "boolean", IdEntity = "string", Jmeno = "string", Otisk = "string", Poradi = "number", TypEntity = "string", Umisteni = "string", IxsVsk = "string", Stav = "string", StavTxt = "string", HodnotaID = "string", ZdrojID = "string", Nazev = "string", CisloJednaci = "string", SpisovaZnacka = "string", DruhDokumentu = "string", VlozenVeSpisu = "string", VecnaSkupina = "string", OdkazyNaSoubory = "string[]", DokumentyVlozene = "string[]", SpisVlozeny = "string[]",}
	const enum GEssImportEntityDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssImportFileVerDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Parametry konkrétní verze/souboru komponenty načítané s pomocí manifest.xml ze ZIPu podle NS2024*/
	interface GEssImportFileVerDto {
		/**Složka souboru uloženého v ZPIu - odpovídá XML elementu: dmLocalRelativePath
		*     Relativní cesta k souboru s binárním obsahem komponenty. Relativní cesta
		*     je vztažena k lokaci načítaného XML souboru s daty dokumentu.Standardně se bude jednat
		*     o podadresář např. data nebo komponenty atd.
		*/
		dmLocalRelativePath?: string|null;
		/**Název souboru uloženého v ZIPu - odpovídá XML elementu: dmLocalFileName
		*     Jméno pomocného souboru použitého pro přenos nebo export binárního
		*     obsahu komponenty.Jméno souboru standardně nebude odpovídat jménu komponenty evidované
		*     u přenášeného souboru. Ani přípona souboru nemusí odpovídat skutečné příponě komponenty.
		*     
		*     Standardně se bude jednat o strojně generovaný název např.s příponou .bin nebo .dat
		*     Jediné zásadní je zachovat unikátnost názvů přenášených souborů v rámci celé exportované
		*     nebo přenášené dávky.
		*/
		DmLocalFileName?: string|null;
		/**Původní název souboru i s koncovkou - odpovídá XML atributu: dmFileDescr 
		*     Musí se vždy jednat o jméno souboru, splňující požadavky Windows a Linux
		*     OS, kladené na pojmenování souboru v rámci souborového systému, včetně přípony
		*     souboru.
		*     Název komponenty (file name) NSESSS 1.19, 9.2.10
		*/
		DmFileDescr?: string|null;
		/**Typ souboru - odpov9d8 XML atributu: dmMimeType
		*     Datový formát komponenty (včetně verze formátu podle vnitřní struktury
		*     komponenty) NSESSS 2.1.3
		*/
		DmMimeType?: string|null;
		/**Příznak finální verze komponenty. Odpovídá XML atributu: dmFinalniVerze - může obsahovat pouze hodnoty {A,N}
		*     Není přesně definované, co to procesně znamená
		*/
		DmFinalniVerze?: string|null;
		/**Verze komponenty. Odpovídá XML elementu: Verze
		*     Pořadové číslo verze souboru/komponenty. Verze začínají od 1 a tvoří
		*     rostoucí nepřerušenou řadu.Při přenosu dat dokumentu je přípustné přenést pouze
		*     poslední verzi souboru/komponenty.Pokud je v rámci implementace dohodnut i přenos
		*     starých verzí komponenty, potom se pod stejnou identifikací(element Identifikator)
		*     přenesou jednotlivé verze komponenty.Poslední verze s nejvyšším pořadovým číslem je
		*     pokládána a poslední/aktuální verzi komponenty.Pozor! Příznak dmFinalVerze nemusí být
		*     nastaven pouze pro nejvyšší/aktuální verzi komponenty.I u finální verze komponenty může
		*     např.přerazítkováním vzniknout nová verze komponenty.Jedná se potom o verzi, která
		*     vznikla ne z vůle uživatele, ale např. kvůli technickým nebo legislativním
		*     požadavkům.
		*/
		Verze?: number|null;
	}
	const enum GEssImportFileVerDtoNames { dmLocalRelativePath = "dmLocalRelativePath", DmLocalFileName = "DmLocalFileName", DmFileDescr = "DmFileDescr", DmMimeType = "DmMimeType", DmFinalniVerze = "DmFinalniVerze", Verze = "Verze",}
	const enum GEssImportFileVerDtoFragments { dmLocalRelativePath = "*", DmLocalFileName = "*", DmFileDescr = "*", DmMimeType = "*", DmFinalniVerze = "*", Verze = "*",}
	const enum GEssImportFileVerDtoTypes { dmLocalRelativePath = "string", DmLocalFileName = "string", DmFileDescr = "string", DmMimeType = "string", DmFinalniVerze = "string", Verze = "number",}
	const enum GEssImportFileVerDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssImportInputDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Vstupní parametry pro realizaci importu dávky podle NS2024*/
	interface GEssImportInputDto {
		/**ID externího systému*/
		IxsExt?: string|null;
		/**Guid .zipu s daty pro import*/
		Guid?: string|null;
		/**Id dávky*/
		DavkaId?: number|null;
		/**Seznam všech prvků obsažených v dávce*/
		Entities?: Gordic.Ess.Interface.GEssImportEntityDto[]|null;
		/**Uživatelský výběr entit k provedení importu - je to jen prostředník pro přístup do Entities - ta ale musí být nastavena na kompletní sadu obsaženou v ZIPu*/
		Selection?: Gordic.Ess.Interface.GEssImportEntityDto[]|null;
	}
	const enum GEssImportInputDtoNames { IxsExt = "IxsExt", Guid = "Guid", DavkaId = "DavkaId", Entities = "Entities", Selection = "Selection",}
	const enum GEssImportInputDtoFragments { IxsExt = "*", Guid = "*", DavkaId = "*", Entities = "*", Selection = "*",}
	const enum GEssImportInputDtoTypes { IxsExt = "string", Guid = "string", DavkaId = "number", Entities = "Gordic.Ess.Interface.GEssImportEntityDto[]", Selection = "Gordic.Ess.Interface.GEssImportEntityDto[]",}
	const enum GEssImportInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssImportReportDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Parametry hlášení progressu importu entit - obsahuje pole parametrů importovaných prvků a číselné vyjádření průběhu importu
	*     Používá se v rámci zpětného volání delegáta pro zobrazení průběhu importu
	*/
	interface GEssImportReportDto {
		/**List úspěšně převedených nebo nepřevedených (již v systému jsou) entit*/
		Data?: Gordic.Ess.Interface.GEssImportReportIntddavDto[]|null;
		/**Progress*/
		Progress?: number|null;
		/**Celkový počet*/
		Total?: number|null;
	}
	const enum GEssImportReportDtoNames { Data = "Data", Progress = "Progress", Total = "Total",}
	const enum GEssImportReportDtoFragments { Data = "*", Progress = "*", Total = "*",}
	const enum GEssImportReportDtoTypes { Data = "Gordic.Ess.Interface.GEssImportReportIntddavDto[]", Progress = "number", Total = "number",}
	const enum GEssImportReportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssImportReportIntddavDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Parametry hlášení progressu importu entit - popisuje aktuálně importovanou jednu entitu
	*     Používá se v rámci zpětného volání delegáta pro zobrazení průběhu importu
	*/
	interface GEssImportReportIntddavDto {
		/**Název*/
		Nazev?: string|null;
		/**ID externí entity*/
		IdEntity?: string|null;
		/**ID interní entity*/
		IdInt?: string|null;
		/**ID verze interní entity*/
		IdIntVer?: string|null;
		/**Typ entity (dokument, soubor, ...)*/
		TypEntity?: string|null;
		/**stav (0 - neuspech, 1 - uspech)*/
		State?: number|null;
		/**info*/
		Info?: string|null;
	}
	const enum GEssImportReportIntddavDtoNames { Nazev = "Nazev", IdEntity = "IdEntity", IdInt = "IdInt", IdIntVer = "IdIntVer", TypEntity = "TypEntity", State = "State", Info = "Info",}
	const enum GEssImportReportIntddavDtoFragments { Nazev = "*", IdEntity = "*", IdInt = "*", IdIntVer = "*", TypEntity = "*", State = "*", Info = "*",}
	const enum GEssImportReportIntddavDtoTypes { Nazev = "string", IdEntity = "string", IdInt = "string", IdIntVer = "string", TypEntity = "string", State = "number", Info = "string",}
	const enum GEssImportReportIntddavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssIntddavDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Převod externí na interní identifikaci intddav*/
	interface GEssIntddavDto {
		/**ID externího systému*/
		ixs_ext?: string|null;
		/**ID externí entity*/
		id_ext?: string|null;
		/**ID interní entity*/
		id_int?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GEssIntddavDtoNames { ixs_ext = "ixs_ext", id_ext = "id_ext", id_int = "id_int", aktivita = "aktivita",}
	const enum GEssIntddavDtoFragments { ixs_ext = "*", id_ext = "*", id_int = "*", aktivita = "*",}
	const enum GEssIntddavDtoTypes { ixs_ext = "string", id_ext = "string", id_int = "string", aktivita = "number",}
	const enum GEssIntddavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssOdpoved2024Dto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**GEssOdpoved2024Dto*/
	interface GEssOdpoved2024Dto {
		/**Výsledek potvrzení*/
		Odpoved?: any|null;
	}
	const enum GEssOdpoved2024DtoNames { Odpoved = "Odpoved",}
	const enum GEssOdpoved2024DtoFragments { Odpoved = "*",}
	const enum GEssOdpoved2024DtoTypes { Odpoved = "any",}
	const enum GEssOdpoved2024DtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssRssddavDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Parametry jednoho impotovaného prvku - odpovídá tabulce rssddav
	*     Obsahuje jak vstupní parametry importu, tak výsledek a případně popisná data vásledného prvku v DB
	*/
	interface GEssRssddavDto {
		/**ID externího systému*/
		ixs_ext?: string|null;
		/**nazev externiho systemu*/
		nazev_ext?: string|null;
		/**davka_id*/
		davka_id?: number|null;
		/**poradi*/
		poradi?: number|null;
		/**umisteni*/
		umisteni?: string|null;
		/**jmeno*/
		jmeno?: string|null;
		/**otisk*/
		otisk?: string|null;
		/**typ_entity_txt*/
		typ_entity_txt?: string|null;
		/**id_entity*/
		id_entity?: string|null;
		/**rss_por_cislo*/
		rss_por_cislo?: number|null;
		/**vyber*/
		vyber?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**akt_znacka*/
		akt_znacka?: string|null;
		/**spis_znak*/
		spis_znak?: string|null;
		/**barcode*/
		barcode?: string|null;
		/**zdrojid*/
		zdrojid?: string|null;
		/**hodnotaid*/
		hodnotaid?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**ixp_spis*/
		ixp_spis?: string|null;
		/**ixp_soucast*/
		ixp_soucast?: string|null;
		/**ixp_top*/
		ixp_top?: string|null;
		/**ixs_vsk*/
		ixs_vsk?: string|null;
		/**ixs_rkr*/
		ixs_rkr?: string|null;
		/**gor_err*/
		gor_err?: number|null;
		/**sql_err*/
		sql_err?: number|null;
		/**isam_err*/
		isam_err?: number|null;
		/**err_txt*/
		err_txt?: string|null;
		/**lock_err*/
		lock_err?: string|null;
		/**vysledek*/
		vysledek?: number|null;
		/**vysledek_txt*/
		vysledek_txt?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**dat_potvrz*/
		dat_potvrz?: JsonDate|null;
		/**stav_potvrz*/
		stav_potvrz?: number|null;
		/**dat_del*/
		dat_del?: JsonDate|null;
		/**priz_del*/
		priz_del?: number|null;
	}
	const enum GEssRssddavDtoNames { ixs_ext = "ixs_ext", nazev_ext = "nazev_ext", davka_id = "davka_id", poradi = "poradi", umisteni = "umisteni", jmeno = "jmeno", otisk = "otisk", typ_entity_txt = "typ_entity_txt", id_entity = "id_entity", rss_por_cislo = "rss_por_cislo", vyber = "vyber", nazev = "nazev", akt_znacka = "akt_znacka", spis_znak = "spis_znak", barcode = "barcode", zdrojid = "zdrojid", hodnotaid = "hodnotaid", ixp = "ixp", ixb = "ixb", ixp_spis = "ixp_spis", ixp_soucast = "ixp_soucast", ixp_top = "ixp_top", ixs_vsk = "ixs_vsk", ixs_rkr = "ixs_rkr", gor_err = "gor_err", sql_err = "sql_err", isam_err = "isam_err", err_txt = "err_txt", lock_err = "lock_err", vysledek = "vysledek", vysledek_txt = "vysledek_txt", poznamka = "poznamka", dat_potvrz = "dat_potvrz", stav_potvrz = "stav_potvrz", dat_del = "dat_del", priz_del = "priz_del",}
	const enum GEssRssddavDtoFragments { ixs_ext = "*", nazev_ext = "*", davka_id = "*", poradi = "*", umisteni = "*", jmeno = "*", otisk = "*", typ_entity_txt = "*", id_entity = "*", rss_por_cislo = "*", vyber = "*", nazev = "*", akt_znacka = "*", spis_znak = "*", barcode = "*", zdrojid = "*", hodnotaid = "*", ixp = "*", ixb = "*", ixp_spis = "*", ixp_soucast = "*", ixp_top = "*", ixs_vsk = "*", ixs_rkr = "*", gor_err = "*", sql_err = "*", isam_err = "*", err_txt = "*", lock_err = "*", vysledek = "*", vysledek_txt = "*", poznamka = "*", dat_potvrz = "*", stav_potvrz = "*", dat_del = "*", priz_del = "*",}
	const enum GEssRssddavDtoTypes { ixs_ext = "string", nazev_ext = "string", davka_id = "number", poradi = "number", umisteni = "string", jmeno = "string", otisk = "string", typ_entity_txt = "string", id_entity = "string", rss_por_cislo = "number", vyber = "string", nazev = "string", akt_znacka = "string", spis_znak = "string", barcode = "string", zdrojid = "string", hodnotaid = "string", ixp = "string", ixb = "string", ixp_spis = "string", ixp_soucast = "string", ixp_top = "string", ixs_vsk = "string", ixs_rkr = "string", gor_err = "number", sql_err = "number", isam_err = "number", err_txt = "string", lock_err = "string", vysledek = "number", vysledek_txt = "string", poznamka = "string", dat_potvrz = "JsonDate", stav_potvrz = "number", dat_del = "JsonDate", priz_del = "number",}
	const enum GEssRssddavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\DTO\Import\GEssRsssdavDto.d.ts 

declare namespace Gordic.Ess.Interface {
	/**Parametry importovan0 dávky rsssdav*/
	interface GEssRsssdavDto {
		/**ID externího systému*/
		ixs_ext?: string|null;
		/**nazev_ext*/
		nazev_ext?: string|null;
		/**ID dávky*/
		davka_id?: number|null;
		/**Zdroj*/
		zdroj?: string|null;
		/**Cíl*/
		cil?: string|null;
		/**nazev_esu*/
		nazev_esu?: string|null;
		/**typ_dav_rss_txt*/
		typ_dav_rss_txt?: string|null;
		/**typ_dav_rss*/
		typ_dav_rss?: number|null;
		/**Účel dávky*/
		ucel_davky?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**hash_algoritmus*/
		hash_algoritmus?: string|null;
		/**stav_davky_rss_txt*/
		stav_davky_rss_txt?: string|null;
		/**stav_davky_rss*/
		stav_davky_rss?: number|null;
		/**rss_por_cislo*/
		rss_por_cislo?: number|null;
		/**Datum změny*/
		dat_exp?: JsonDate|null;
		/**dat_imp*/
		dat_imp?: JsonDate|null;
		/**dat_potvrz*/
		dat_potvrz?: JsonDate|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GEssRsssdavDtoNames { ixs_ext = "ixs_ext", nazev_ext = "nazev_ext", davka_id = "davka_id", zdroj = "zdroj", cil = "cil", nazev_esu = "nazev_esu", typ_dav_rss_txt = "typ_dav_rss_txt", typ_dav_rss = "typ_dav_rss", ucel_davky = "ucel_davky", poznamka = "poznamka", hash_algoritmus = "hash_algoritmus", stav_davky_rss_txt = "stav_davky_rss_txt", stav_davky_rss = "stav_davky_rss", rss_por_cislo = "rss_por_cislo", dat_exp = "dat_exp", dat_imp = "dat_imp", dat_potvrz = "dat_potvrz", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GEssRsssdavDtoFragments { ixs_ext = "*", nazev_ext = "*", davka_id = "*", zdroj = "*", cil = "*", nazev_esu = "*", typ_dav_rss_txt = "*", typ_dav_rss = "*", ucel_davky = "*", poznamka = "*", hash_algoritmus = "*", stav_davky_rss_txt = "*", stav_davky_rss = "*", rss_por_cislo = "*", dat_exp = "*", dat_imp = "*", dat_potvrz = "*", dat_zmena = "*", zmenu_prov_txt = "*",}
	const enum GEssRsssdavDtoTypes { ixs_ext = "string", nazev_ext = "string", davka_id = "number", zdroj = "string", cil = "string", nazev_esu = "string", typ_dav_rss_txt = "string", typ_dav_rss = "number", ucel_davky = "string", poznamka = "string", hash_algoritmus = "string", stav_davky_rss_txt = "string", stav_davky_rss = "number", rss_por_cislo = "number", dat_exp = "JsonDate", dat_imp = "JsonDate", dat_potvrz = "JsonDate", dat_zmena = "JsonDate", zmenu_prov_txt = "string",}
	const enum GEssRsssdavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ess.Interface\Filter\GEssIslFilter.d.ts 

declare namespace Gordic.Ess.Interface {
	/**ISL ESS Filtr*/
	const enum GEssIslFilter {
		/**Funkční místo*/
		ixs_fun_akt=0,
		/**Datum podání*/
		dat_pod=1,
		/**Název písemnosti*/
		nazev=2,
		/**datum změny*/
		dat_zmena=3,
		/**Identifikator entity*/
		ixp=4,
	}
	/**Typ dávky podle NS*/
	const enum GEssTypDavRssEnum {
		/**Přenos*/
		Prenos=0,
		/**Export*/
		Export=10,
		/**Import*/
		Import=20,
		/**Potvrzeni*/
		Potvrzeni=30,
	}
	/**Stav dávky*/
	const enum GEssStavDavkyRssEnum {
		/**Připravovaná*/
		Pripravovana=0,
		/**Připravená*/
		Pripravena=10,
		/**Odeslaná*/
		Odeslana=20,
		/**Potvrzená kladně*/
		PotvrzenaKladne=30,
		/**Potvrzená částečně*/
		PotvrzenaCastecne=40,
		/**Potvrzená záporně (nenačteno)*/
		PotvrzenaZaporne=50,
		/**Stornovaná*/
		Stornovana=90,
	}
	/**Filtr pro tabulku rsssdav*/
	const enum GEssRsssdavFilter {
		/**Typ dávky (GEssTypDavRssEnum)*/
		typ_dav_rss=0,
		/**ID externího systému*/
		ixs_ext=1,
		/**Datum změny*/
		dat_zmena=2,
		/**Id dávky*/
		davka_id=3,
		/**stav dávky*/
		stav_davky_rss=4,
	}
	/**Filtr pro tabulku rssddav*/
	const enum GEssRssddavFilter {
		/**Číslo dávky*/
		davka_id=0,
		/**ID entity*/
		id_entity=1,
	}
	/**Filtr pro kontrolu do tabulky intddav*/
	const enum GEssImportIntdddavFilter {
		/**ID externího systému*/
		ixs_ext=0,
		/**ID externí entity*/
		id_ext=1,
		/**ID interní entity*/
		id_int=2,
	}
}

//#endregion

