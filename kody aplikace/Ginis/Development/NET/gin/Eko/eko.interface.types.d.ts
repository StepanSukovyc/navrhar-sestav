/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       eko.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Eko.Interface\Gordic.Eko.Interface.csproj
*    created     2026-02-16 14:33:46
*    files       Adp\History\DTO\GEkohkonDto.d.ts
*                Adp\History\ISL\IGAdpHistory.d.ts
*                Adp\Params\IGAdpGlobals.d.ts
*                Adp\Params\DTO\GAdpEkoParamsDto.d.ts
*                Adp\Params\DTO\GAdpGlobalsDto.d.ts
*                Adp\Params\DTO\GAdpParamsDto.d.ts
*                Adp\UctRoz\DTO\GFiltrPredkontace.d.ts
*                Adp\UctRoz\DTO\GPredkontaceAkceDto.d.ts
*                Adp\UctRoz\DTO\GPredkontaceCountResponseDto.d.ts
*                Adp\UctRoz\DTO\GPredkontaceDokladDto.d.ts
*                Adp\UctRoz\DTO\GPredkontaceRequestDto.d.ts
*                Adp\UctRoz\DTO\GPredkontaceRequestPrevodDto.d.ts
*                Adp\UctRoz\DTO\GSeznamPredkontaciDto.d.ts
*                Adp\UctRoz\DTO\GUctRozPrevZapisyDto.d.ts
*                Adp\UctRoz\DTO\GUctRozsvpkDto.d.ts
*                Adp\UctRoz\Enums\GEAdpHistoreZdroj.d.ts
*                Adp\UctRoz\Enums\GEAdpHistoriAkce.d.ts
*                Adp\UctRoz\Enums\GEAgenda.d.ts
*                Adp\UctRoz\Enums\GEFilterdkonDto.d.ts
*                Adp\UctRoz\Enums\GEPovoleniPrevoduPredkontace.d.ts
*                Adp\UctRoz\Enums\GEPovoleniUzivatelskePredkontace.d.ts
*                Adp\UctRoz\Enums\GEPredkotaceUrovewPristupu.d.ts
*                Adp\UctRoz\Enums\GETypPredkontace.d.ts
*                Adp\UctRoz\Enums\GEVlastnikPredkontaci.d.ts
*                Adp\UctRoz\Enums\GEVyberPredkontaci.d.ts
*                Adp\UctRoz\ISL\IGEkoPrekontaceSablona.d.ts
*                Adp\UctRoz\ISL\IGEkoPrekontaceSablonaRadek.d.ts
*                Adp\UctRoz\ISL\IGEkoPrekontaceVarianta.d.ts
*                Adr\IGISLCfuKonfigurace.d.ts
*                Adr\IGISLEkoOpen.d.ts
*                Adr\IGISLGlobalniCiselnik.d.ts
*                Adr\IGISLHloubkaRezervace.d.ts
*                Adr\IGISLOmezeniPristupu.d.ts
*                Adr\IGISLPolozkaGlobalnihoCiselniku.d.ts
*                Adr\IGISLRozsirenaVlastnost.d.ts
*                Adr\IGISLRozvrh.d.ts
*                Adr\IGISLRozvrhovyCiselnik.d.ts
*                Adr\IGISLRozvrhovyCiselnikHodnota.d.ts
*                Adr\IGISLRozvrhovyCiselnikVazba.d.ts
*                Adr\IGISLRozvrhovyCiselnikVetev - Copy.d.ts
*                Adr\IGISLRozvrhovyCiselnikVetev.d.ts
*                Adr\IGISLRozvrhRadek.d.ts
*                Adr\IGISLRozvrhVlastnik - Copy.d.ts
*                Adr\IGISLRozvrhVlastnik.d.ts
*                Adr\IGISLSrvOpen.d.ts
*                Adr\DataSets\GBplvtza.Dto.d.ts
*                Adr\DataSets\GEkoccfu.Dto.d.ts
*                Adr\DataSets\GEkockts.Dto.d.ts
*                Adr\DataSets\GEkodcfu.Dto.d.ts
*                Adr\DataSets\GEkodgdu.Dto.d.ts
*                Adr\DataSets\GEkoscfu.Dto.d.ts
*                Adr\DataSets\GEkosdrr.Dto.d.ts
*                Adr\DataSets\GEkosgdc.Dto.d.ts
*                Adr\DataSets\GEkosrci.Dto.d.ts
*                Adr\DataSets\GEkovrcc.Dto.d.ts
*                Adr\DataSets\GEkovrcp.Dto.d.ts
*                Adr\DataSets\GEkovrcr.Dto.d.ts
*                Adr\DataSets\GSrvspla.Dto.d.ts
*                Adr\DataSets\GUctdrozMore.Dto.d.ts
*                Adr\DataSets\GUctdtra.Dto.d.ts
*                Adr\DataSets\GUcthroz.Dto.d.ts
*                Adr\DataSets\GUctvrozNZ.Dto.d.ts
*                Adr\Dto\DavkaDto.d.ts
*                Adr\Dto\GCfs.Dto.d.ts
*                Adr\Dto\GEkodgdtDto.d.ts
*                Adr\Dto\GEkodrci.Dto.d.ts
*                Adr\Dto\GEkosico.Dto.d.ts
*                Adr\Dto\GEkosmsr.Dto.d.ts
*                Adr\Dto\GEkossgx.Dto.d.ts
*                Adr\Dto\GEkosucsHRDto.d.ts
*                Adr\Dto\GRozvrhImportInputDto.d.ts
*                Adr\Dto\GRozvrhImportOutputDto.d.ts
*                Adr\Dto\GSrvOpenDto.d.ts
*                Adr\Dto\GUctsrozDto.d.ts
*                Adr\Dto\RozvrhDavkaDto.d.ts
*                Adr\Dto\VyjimkyDto.d.ts
*                Adr\Dto\FilterDto\GCfsVyjimkaFilterDto.d.ts
*                Adr\Dto\FilterDto\GCfuKonfiguraceFilterDto.d.ts
*                Adr\Dto\FilterDto\GDcfuKonfiguraceFilterDto.d.ts
*                Adr\Dto\FilterDto\GDoplnkovyUdajFilterDto.d.ts
*                Adr\Dto\FilterDto\GEmptyFilterDto.d.ts
*                Adr\Dto\FilterDto\GFilterHloubkaRezervaceDto.d.ts
*                Adr\Dto\FilterDto\GHloubkaRezervaceUcsFilterDto.d.ts
*                Adr\Dto\FilterDto\GKombinaceSuAuFilterDto.d.ts
*                Adr\Dto\FilterDto\GKombinaceSuAuRegFilterDto.d.ts
*                Adr\Dto\FilterDto\GOmezeniPristupuFilterDto.d.ts
*                Adr\Dto\FilterDto\GPolozkaGlobalnihoCiselnikuFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozsirenaVlastnostFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhovyCiselnikFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhovyCiselnikHodnotaFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhovyCiselnikVazbaFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhovyCiselnikVetevFilterDto - Copy.d.ts
*                Adr\Dto\FilterDto\GRozvrhovyCiselnikVetevFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhRadekFilterDto.d.ts
*                Adr\Dto\FilterDto\GRozvrhVlastnikFilterDto.d.ts
*                Adr\Dto\FilterDto\GSeznamRozvrhuFilterDto.d.ts
*                Adr\Init\Dto\GAdrGlobalsDto.d.ts
*                Akce\GEkoAgDokladyFilterDto.d.ts
*                Akce\GEkoAkceDto.d.ts
*                Akce\GEkoKompetentiAkceDto.d.ts
*                Akce\GEkoRozpisAkceDto.d.ts
*                Akce\GEkoSeznamAdaFilterDto.d.ts
*                Akce\GEkoSrvdciaSeznamZapisuDto.d.ts
*                Cfu\GCfuFilterDto.d.ts
*                Controlling\IGControllingService.d.ts
*                Controlling\Dto\GVazebneMaskovySeznamDto.d.ts
*                Controls\IGEkosden.d.ts
*                Controls\IGEkosdenAll.d.ts
*                Controls\Dto\GAcInfoDto.d.ts
*                Controls\Dto\GBookFilterDto.d.ts
*                Controls\Dto\GEkockryDto.d.ts
*                Controls\Dto\GEkoclikDto.d.ts
*                Controls\Dto\GEkosdenDto.d.ts
*                Controls\Dto\GKofspolDto.d.ts
*                Controls\Dto\GMajsmajEkoDto.d.ts
*                CSUIS\IGCsuis.d.ts
*                Dashboard\GEkoDashboardDto.d.ts
*                Dashboard\IGEkoDashboard.d.ts
*                Datasets\GEkodkpl.Dto.d.ts
*                Datasets\GEkospde.Dto.d.ts
*                Datasets\GSmlapid.Dto.d.ts
*                Datasets\GSmlspol.Dto.d.ts
*                Datasets\GUctRozdkon.Dto.d.ts
*                Datasets\GUctRozskon.Dto.d.ts
*                Datasets\GWflspidSimple.Dto.d.ts
*                Datasets\GZapisyDto.d.ts
*                Doklady\IGEkoKniha.d.ts
*                Doklady\DanovaEvidence\GDanovaEvidenceEditSettingsDto.d.ts
*                Doklady\DataAgend\GEkoDataEvzDto.d.ts
*                Doklady\DataAgend\GEkoDataSmlDto.d.ts
*                Doklady\DataAgend\IGEkoDataAgend.d.ts
*                Doklady\DatovaVeta\GDatovaVetaInfoDto.d.ts
*                Doklady\DatovaVeta\GEkoZapisDto.d.ts
*                Doklady\DatovaVeta\IGGDatovaVetaInfo.d.ts
*                Doklady\DodaciList\GDodaciListDto.d.ts
*                Doklady\DodaciList\IGDodaciListService.d.ts
*                Doklady\Import\GItemImportDto.d.ts
*                Doklady\Import\GListItemImportDto.d.ts
*                Doklady\Import\GVisibleTableColumns.d.ts
*                Doklady\Pozadavky\GPozadavkyDto.d.ts
*                Doklady\Pozadavky\IGPozadavky.d.ts
*                Doklady\SchvalovaciProces\IGEkoSchvalovaciProces.d.ts
*                Doklady\Service\GEkoPidRokDto.d.ts
*                Doklady\Service\IGEkoServices.d.ts
*                Doklady\Smlouvy\GEkoVyberSmlouvyPolDto.d.ts
*                Doklady\StrukturaIISSP\GStrukturaIISSPDto.d.ts
*                Doklady\StrukturaIISSP\IGStrukturaIISSP.d.ts
*                Doklady\VazbyDokladu\GVazbaDokladuDto.d.ts
*                Doklady\ZahranicniPlatby\GZahranicniPlatbyDto.d.ts
*                Doklady\ZahranicniPlatby\IGZahranicniPlatby.d.ts
*                EkoBookInit\GEkoBookVariant.d.ts
*                Enums\GEAktivitaDokladu.d.ts
*                Enums\GEDruhDokladu.d.ts
*                Enums\GEKategorieDokladu.d.ts
*                Enums\GEKHPrava.d.ts
*                Enums\GEPovoleniVazbyDokladu.d.ts
*                Enums\GEResultOfProcessingTheMessage.d.ts
*                Enums\GERezimPraceSVazbami.d.ts
*                Enums\GEStavyDokladu.d.ts
*                Enums\GETypeTransferMessage.d.ts
*                Enums\GRezimPraceSVazbami.d.ts
*                Enums\GVecnyProfilOperace.d.ts
*                Hledani\GSearchAcAgDto.d.ts
*                Hledani\GSearchAcDto.d.ts
*                Hledani\GSearchResponseDto.d.ts
*                Hledani\GSearchVsDto.d.ts
*                NavazaniRealizatori\TypoveDatasety\Gordic.Eko.Interface.SeznamRealizatoru.Dto.d.ts
*                ObecneSeskupeni\GHodnotyUzlu.Dto.d.ts
*                Ostatni\GEkoFilePreviewDto.d.ts
*                Ostatni\GWflForEkoDto.d.ts
*                Ostatni\DatoveObjekty\GC0C1Pair.d.ts
*                Ostatni\DTO\GAIRecognizedItemExtendedDto.d.ts
*                Ostatni\DTO\GAiRecognizerRecognizeExtendedResponseDto.d.ts
*                Ostatni\DTO\GekosuusDto.d.ts
*                Ostatni\DTO\GEkoZkrDto.d.ts
*                Ostatni\TiskoveParametry\GEkoTiskovyParametrDto.d.ts
*                Ostatni\TiskoveParametry\GEkoTiskovyParametrRequestDto.d.ts
*                Ostatni\TiskoveParametry\IGEkoTiskovyParametr.d.ts
*                Ostatni\TransferParametrs\GReportParam.d.ts
*                Ostatni\TransferParametrs\GTransferMessage.d.ts
*                Porizovacka\KontrolniMechanismus\IGDefiniceRozvrhu.d.ts
*                Porizovacka\KontrolniMechanismus\Dto\PKontrolaDataDto.d.ts
*                Porizovacka\UctovyRozvrh\TypVetyEnum.d.ts
*                RegZP\GUctcsud.Dto.d.ts
*                RegZP\GUctddrv.Dto.d.ts
*                RegZP\IGUctareg.d.ts
*                RegZP\Dto\GDefHodnotaDto.d.ts
*                RegZP\Dto\GRegistrZPDto.d.ts
*                RegZP\Dto\GRegistrZPfilterDto.d.ts
*                RegZP\Dto\GUctsdrv.Dto.d.ts
*                RegZP\Dto\GUctssud.Dto.d.ts
*                Roz\Dto\GRozspid.Dto.d.ts
*                Roz\Dto\GRozspidWDto.d.ts
*                Rozbory\GEkoFilterRzbDto.d.ts
*                Uct\GUctspidDto.d.ts
*                Uct\Obdobi\GUctMesciObdobiDto.d.ts
*                Uct\Obdobi\IGUctsobd.d.ts
*                Uzavreky\Agenda\GEkoAgendaDto.d.ts
*                Uzavreky\Agenda\GEkoAgendaFiltrDto.d.ts
*                Uzavreky\Agenda\GEkoAgendaPermissions.d.ts
*                Uzavreky\Agenda\GEkoSouctyKnihDto.d.ts
*                Uzavreky\Kniha\GEkoAktivitaKnihyEnum.d.ts
*                Uzavreky\Kniha\GEkoKnihaDto.d.ts
*                Uzavreky\Kniha\GEkoKnihaFiltrDto.d.ts
*                Uzavreky\Kniha\GEkoKnihaPermissions.d.ts
*                Uzavreky\Kniha\GEkosdenBaseDto.d.ts
*                Uzavreky\Kniha\GEkoTypyUzaverekKnihEnum.d.ts
*                Uzavreky\Kniha\GEkoVybraneKnihyDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\History\DTO\GEkohkonDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Datový objekt pro obsah historie*/
	interface GEkohkonDto {
		/**Ser číslo.*/
		ser_cislo?: number|null;
		/**Typ ag.*/
		typ_ag?: number|null;
		/**Typ info.*/
		typ_info?: number|null;
		/**Id.*/
		id?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ_ag_txt.*/
		typ_ag_txt?: string|null;
		/**Typ_info_txt.*/
		typ_info_txt?: string|null;
		/**Autor zmeny*/
		nazev_rf?: string|null;
	}
	const enum GEkohkonDtoNames { ser_cislo = "ser_cislo", typ_ag = "typ_ag", typ_info = "typ_info", id = "id", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag_txt = "typ_ag_txt", typ_info_txt = "typ_info_txt", nazev_rf = "nazev_rf",}
	const enum GEkohkonDtoFragments { ser_cislo = "main", typ_ag = "main", typ_info = "main", id = "main", popis = "main", dat_zmena = "main", zmenu_prov = "main", typ_ag_txt = "typ_ag_txt", typ_info_txt = "typ_info_txt", nazev_rf = "nazev_rf",}
	const enum GEkohkonDtoTypes { ser_cislo = "number", typ_ag = "number", typ_info = "number", id = "string", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag_txt = "string", typ_info_txt = "string", nazev_rf = "string",}
	const enum GEkohkonDtoTypeLengths { id = 100, popis = 254, zmenu_prov = 12,}
	/**Filtr pro Ekohkon*/
	const enum GEkohkonFilter {
		/**Ser číslo.*/
		ser_cislo,
		/**Typ ag.*/
		typ_ag,
		/**Typ info.*/
		typ_info,
		/**Id.*/
		id,
		/**Popis.*/
		popis,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\History\ISL\IGAdpHistory.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s historii*/
	interface AdpHistory {
		/**Zapis do historie zmen*/
		create(rq?:CallParams<{tableName:string,id:string,akce:Gordic.Eko.Interface.GEAdpHistoriAkce,dalsiPopis:string,zdrojZmeny:Gordic.Eko.Interface.GEAdpHistoreZdroj}>): _Task<{tableName:string,id:string,akce:Gordic.Eko.Interface.GEAdpHistoriAkce,dalsiPopis:string,zdrojZmeny:Gordic.Eko.Interface.GEAdpHistoreZdroj},void>;
		/**Seznam zapisu historie*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkohkonDto>>;
		/**Počet .*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdpHistory: ServiceBase & Catalog.AdpHistory;
	}
	const AdpHistory: Client["AdpHistory"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\Params\IGAdpGlobals.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro globalni nastaveni*/
	interface AdpGlobals {
		/**Ziskani globalnich parametru*/
		read(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GAdpGlobalsDto>;
		/**Ulozeni hodnot do cache*/
		save(rq?:CallParams<{ucrParams:Gordic.Eko.Interface.GAdpGlobalsDto}>): _Task<{ucrParams:Gordic.Eko.Interface.GAdpGlobalsDto},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdpGlobals: ServiceBase & Catalog.AdpGlobals;
	}
	const AdpGlobals: Client["AdpGlobals"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\Params\DTO\GAdpEkoParamsDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Datovy objekt pro nastaveni ekoinicializace*/
	interface GAdpEkoParamsDto {
		/**Vybrane ico*/
		ICO?: string|null;
		/**UCS*/
		UCS?: string|null;
		/**UUS*/
		UUS?: string|null;
		/**Nks*/
		NKS?: string|null;
		/**Vybrany rok*/
		Rok?: number|null;
		/**Subrada*/
		Subrada?: number|null;
		/**Nks valstni*/
		NKSVL?: string|null;
		/**Aktivita knihy*/
		AktivitaKnihy?: number|null;
	}
	const enum GAdpEkoParamsDtoNames { ICO = "ICO", UCS = "UCS", UUS = "UUS", NKS = "NKS", Rok = "Rok", Subrada = "Subrada", NKSVL = "NKSVL", AktivitaKnihy = "AktivitaKnihy",}
	const enum GAdpEkoParamsDtoFragments { ICO = "*", UCS = "*", UUS = "*", NKS = "*", Rok = "*", Subrada = "*", NKSVL = "*", AktivitaKnihy = "*",}
	const enum GAdpEkoParamsDtoTypes { ICO = "string", UCS = "string", UUS = "string", NKS = "string", Rok = "number", Subrada = "number", NKSVL = "string", AktivitaKnihy = "number",}
	const enum GAdpEkoParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\Params\DTO\GAdpGlobalsDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Datovy objekt pro globalni nastaveni*/
	interface GAdpGlobalsDto {
		/**Prihlasena funkce*/
		IxsFun?: string|null;
		/**Eko pamametry*/
		EkoParams?: Gordic.Eko.Interface.GAdpEkoParamsDto|null;
		/**Parametry uct*/
		Params?: Gordic.Eko.Interface.GAdpParamsDto|null;
	}
	const enum GAdpGlobalsDtoNames { IxsFun = "IxsFun", EkoParams = "EkoParams", Params = "Params",}
	const enum GAdpGlobalsDtoFragments { IxsFun = "*", EkoParams = "*", Params = "*",}
	const enum GAdpGlobalsDtoTypes { IxsFun = "string", EkoParams = "Gordic.Eko.Interface.GAdpEkoParamsDto", Params = "Gordic.Eko.Interface.GAdpParamsDto",}
	const enum GAdpGlobalsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\Params\DTO\GAdpParamsDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**ReadOnly DTO s podmnozinou globalnich parametru UCR*/
	interface GAdpParamsDto {
		/**Pouzivani veriant pro UCT*/
		PouzivaniVariantUCT?: boolean|null;
		/**Pouzivani veriant pro UCT*/
		PouzivaniVariantROZ?: boolean|null;
		/**Existuje licecni certifikat pro ROZ*/
		JeCertifikatProUzivROZ?: boolean|null;
		/**Existuje licecni certifikat pro ROZ*/
		JeCertifikatProUzivUCT?: boolean|null;
		/**Je povolena uzivatelska pradkotace*/
		JePovolenaUzivatelskaPrekontace?: Gordic.Eko.Interface.GEPovoleniUzivatelskePredkontace|null;
		/**Povoleni zverejnit uzivatelske predkontace*/
		JePovolenoZverejniUzivPredkontaci?: Gordic.Eko.Interface.GEPovoleniPrevoduPredkontace|null;
		/**Uroven pristupu k predkontacim UCT*/
		RezimPristupuUCT?: Gordic.Eko.Interface.GEPredkotaceUrovewPristupu|null;
		/**Uroven pristupu k predkontacim ROZ*/
		RezimPristupuROZ?: Gordic.Eko.Interface.GEPredkotaceUrovewPristupu|null;
		/**Povoleni ukladani historie*/
		PovoleniUkladaniHistorie?: string|null;
	}
	const enum GAdpParamsDtoNames { PouzivaniVariantUCT = "PouzivaniVariantUCT", PouzivaniVariantROZ = "PouzivaniVariantROZ", JeCertifikatProUzivROZ = "JeCertifikatProUzivROZ", JeCertifikatProUzivUCT = "JeCertifikatProUzivUCT", JePovolenaUzivatelskaPrekontace = "JePovolenaUzivatelskaPrekontace", JePovolenoZverejniUzivPredkontaci = "JePovolenoZverejniUzivPredkontaci", RezimPristupuUCT = "RezimPristupuUCT", RezimPristupuROZ = "RezimPristupuROZ", PovoleniUkladaniHistorie = "PovoleniUkladaniHistorie",}
	const enum GAdpParamsDtoFragments { PouzivaniVariantUCT = "*", PouzivaniVariantROZ = "*", JeCertifikatProUzivROZ = "*", JeCertifikatProUzivUCT = "*", JePovolenaUzivatelskaPrekontace = "*", JePovolenoZverejniUzivPredkontaci = "*", RezimPristupuUCT = "*", RezimPristupuROZ = "*", PovoleniUkladaniHistorie = "*",}
	const enum GAdpParamsDtoTypes { PouzivaniVariantUCT = "boolean", PouzivaniVariantROZ = "boolean", JeCertifikatProUzivROZ = "boolean", JeCertifikatProUzivUCT = "boolean", JePovolenaUzivatelskaPrekontace = "Gordic.Eko.Interface.GEPovoleniUzivatelskePredkontace", JePovolenoZverejniUzivPredkontaci = "Gordic.Eko.Interface.GEPovoleniPrevoduPredkontace", RezimPristupuUCT = "Gordic.Eko.Interface.GEPredkotaceUrovewPristupu", RezimPristupuROZ = "Gordic.Eko.Interface.GEPredkotaceUrovewPristupu", PovoleniUkladaniHistorie = "string",}
	const enum GAdpParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GFiltrPredkontace.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Enum filtru dokladu*/
	const enum GEFiltrPredkontace {
		/**algoritmus pocitani cetnosti*/
		Pevnyfiltr,
		/**Typ agendy*/
		TypAgendy,
		/**identifikator varianty*/
		IDVarianty,
		/**klic predkontace - pridano z duvodu nevalidniho designeru (makara nejsou dokonala...)*/
		ixs_kon,
	}
	/**Filtry na predkontace*/
	interface GFiltrPredkontace {
		/**Filtrovani dat pro uzivatelske predkontace*/
		PevnyFiltr?: GBaseFilter<number>|null;
		/**Typ Agendy*/
		TypAgendy?: GBaseFilter<number>|null;
		/**Typ Agendy*/
		Ixs_vpk?: GBaseFilter<string>|null;
	}
	const enum GFiltrPredkontaceNames { PevnyFiltr = "PevnyFiltr", TypAgendy = "TypAgendy", Ixs_vpk = "Ixs_vpk",}
	const enum GFiltrPredkontaceFragments { PevnyFiltr = "*", TypAgendy = "*", Ixs_vpk = "*",}
	const enum GFiltrPredkontaceTypes { PevnyFiltr = "GBaseFilter<number>", TypAgendy = "GBaseFilter<number>", Ixs_vpk = "GBaseFilter<string>",}
	const enum GFiltrPredkontaceTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GPredkontaceAkceDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO predavane evidenci pristupnosti akci*/
	interface GPredkontaceAkceDto {
		/**Tooltip*/
		ToolTip?: string|null;
		/**Nezav menu*/
		Title?: string|null;
		/**Viditelnost akce*/
		Visible?: boolean|null;
		/**Povoleni akce*/
		Enabled?: boolean|null;
		/**Filtr pro subtasky*/
		Filtr?: number|null;
		/**Defaultni uloha*/
		Vychozi?: boolean|null;
	}
	const enum GPredkontaceAkceDtoNames { ToolTip = "ToolTip", Title = "Title", Visible = "Visible", Enabled = "Enabled", Filtr = "Filtr", Vychozi = "Vychozi",}
	const enum GPredkontaceAkceDtoFragments { ToolTip = "*", Title = "*", Visible = "*", Enabled = "*", Filtr = "*", Vychozi = "*",}
	const enum GPredkontaceAkceDtoTypes { ToolTip = "string", Title = "string", Visible = "boolean", Enabled = "boolean", Filtr = "number", Vychozi = "boolean",}
	const enum GPredkontaceAkceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GPredkontaceCountResponseDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Odpoved na dotaz na pocet*/
	interface GPredkontaceCountResponseDto {
		/**Pocet variant*/
		Count?: number|null;
		/**Identifikator varianty*/
		Identifikator?: string|null;
	}
	const enum GPredkontaceCountResponseDtoNames { Count = "Count", Identifikator = "Identifikator",}
	const enum GPredkontaceCountResponseDtoFragments { Count = "*", Identifikator = "*",}
	const enum GPredkontaceCountResponseDtoTypes { Count = "number", Identifikator = "string",}
	const enum GPredkontaceCountResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GPredkontaceDokladDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO objektu predkontace*/
	interface GPredkontaceDoklad extends Gordic.Eko.Interface.GPredkontaceRequestDto {
		/**Hlavicka predkontace*/
		Hlavicka?: Gordic.Eko.Interface.GUctRozskonDto|null;
		/**Polozky predkontace*/
		Radky?: Gordic.Eko.Interface.GUctRozdkonDto[]|null;
		/**Typ Agendy*/
		TypAg?: number|null;
	}
	const enum GPredkontaceDokladNames { Hlavicka = "Hlavicka", Radky = "Radky", TypAg = "TypAg", IdMessage = "IdMessage", Identifikator = "Identifikator",}
	const enum GPredkontaceDokladFragments { Hlavicka = "*", Radky = "*", TypAg = "*", IdMessage = "*", Identifikator = "*",}
	const enum GPredkontaceDokladTypes { Hlavicka = "Gordic.Eko.Interface.GUctRozskonDto", Radky = "Gordic.Eko.Interface.GUctRozdkonDto[]", TypAg = "number", IdMessage = "string", Identifikator = "string",}
	const enum GPredkontaceDokladTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GPredkontaceRequestDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO predek pro requesty predkontaci*/
	interface GPredkontaceRequestDto {
		/**Zprava*/
		IdMessage?: string|null;
		/**Identifikator predkontace (ixs_kon)*/
		Identifikator?: string|null;
	}
	const enum GPredkontaceRequestDtoNames { IdMessage = "IdMessage", Identifikator = "Identifikator",}
	const enum GPredkontaceRequestDtoFragments { IdMessage = "*", Identifikator = "*",}
	const enum GPredkontaceRequestDtoTypes { IdMessage = "string", Identifikator = "string",}
	const enum GPredkontaceRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GPredkontaceRequestPrevodDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO Pozadavek na prevod pradkontace na verejnou*/
	interface GPredkontaceRequestPrevodDto extends Gordic.Eko.Interface.GPredkontaceRequestDto {
		/**Identifikator varianty*/
		IDVarianty?: string|null;
		/**Priznak editace (Bude potreba?)*/
		IsEditace?: boolean|null;
		/**Priznak zmeny dat (Bude potreba?)*/
		IsDataChanged?: boolean|null;
		/**Typ agendy*/
		TypAgendy?: number|null;
	}
	const enum GPredkontaceRequestPrevodDtoNames { IDVarianty = "IDVarianty", IsEditace = "IsEditace", IsDataChanged = "IsDataChanged", TypAgendy = "TypAgendy", IdMessage = "IdMessage", Identifikator = "Identifikator",}
	const enum GPredkontaceRequestPrevodDtoFragments { IDVarianty = "*", IsEditace = "*", IsDataChanged = "*", TypAgendy = "*", IdMessage = "*", Identifikator = "*",}
	const enum GPredkontaceRequestPrevodDtoTypes { IDVarianty = "string", IsEditace = "boolean", IsDataChanged = "boolean", TypAgendy = "number", IdMessage = "string", Identifikator = "string",}
	const enum GPredkontaceRequestPrevodDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GSeznamPredkontaciDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:uctskon*/
	interface GSeznamPredkontaciDto {
		/**DBCOLUMN:uctskon.ixs_kon*/
		ixs_kon?: string|null;
		/**hodnota uctskon.ixs_kon*/
		code?: string|null;
		/**DBCOLUMN:uctskon.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:uctskon.kod*/
		kod?: string|null;
		/**DBCOLUMN:uctskon.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:uctskon.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:uctskon.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:uctskon.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:uctskon.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:uctskon.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctskon.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctskon.typ_kon*/
		typ_kon?: number|null;
		/**DBCOLUMN:uctskon.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:uctskon.ixs_fun*/
		ixs_fun?: string|null;
		/**The vlastnik.*/
		vlastnik?: string|null;
		/**Atribut oblibene polozky.*/
		favorite?: number|null;
		/**pocet vyskytu*/
		pocet?: number|null;
		/**vlastnictvi predkontace*/
		vlastnictvi?: Gordic.Eko.Interface.GEVlastnikPredkontaci|null;
	}
	const enum GSeznamPredkontaciDtoNames { ixs_kon = "ixs_kon", code = "code", aktivita = "aktivita", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_kon = "typ_kon", k_v = "k_v", ixs_fun = "ixs_fun", vlastnik = "vlastnik", favorite = "favorite", pocet = "pocet", vlastnictvi = "vlastnictvi",}
	const enum GSeznamPredkontaciDtoFragments { ixs_kon = "*", code = "*", aktivita = "*", kod = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", typ_kon = "*", k_v = "*", ixs_fun = "*", vlastnik = "*", favorite = "*", pocet = "*", vlastnictvi = "*",}
	const enum GSeznamPredkontaciDtoTypes { ixs_kon = "string", code = "string", aktivita = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", typ_kon = "number", k_v = "number", ixs_fun = "string", vlastnik = "string", favorite = "number", pocet = "number", vlastnictvi = "Gordic.Eko.Interface.GEVlastnikPredkontaci",}
	const enum GSeznamPredkontaciDtoTypeLengths { ixs_kon = 12, code = 12, kod = 30, zkratka = 16, nazev = 254, poznamka = 50, zmenu_prov = 12, ixs_fun = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GUctRozPrevZapisyDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:uctdpep*/
	interface GUctRozPrevZapisyDto {
		/**DBCOLUMN:uctdpep.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:uctdpep.nks*/
		nks?: string|null;
		/**DBCOLUMN:uctdpep.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:uctdpep.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:uctdpep.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:uctdpep.te0*/
		te0?: string|null;
		/**DBCOLUMN:uctdpep.te1*/
		te1?: string|null;
		/**DBCOLUMN:uctdpep.te2*/
		te2?: string|null;
		/**DBCOLUMN:uctdpep.te3*/
		te3?: string|null;
		/**DBCOLUMN:uctdpep.te4*/
		te4?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
		/**DBCOLUMN:uctdpep.uea*/
		uea?: string|null;
		/**DBCOLUMN:uctdpep.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:uctdpep.uec*/
		uec?: string|null;
		/**DBCOLUMN:uctdpep.ued*/
		ued?: string|null;
		/**DBCOLUMN:uctdpep.uee*/
		uee?: string|null;
		/**DBCOLUMN:uctdpep.uef*/
		uef?: string|null;
		/**DBCOLUMN:uctdpep.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:uctdpep.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:uctdpep.uei*/
		uei?: string|null;
		/**DBCOLUMN:uctdpep.uej*/
		uej?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		/**DBCOLUMN:uctdpep.popis*/
		popis?: string|null;
		/**DBCOLUMN:uctdpep.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:uctdpep.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:uctdpep.cislo_sml*/
		cislo_sml?: number|null;
		smlouva?: string|null;
	}
	const enum GUctRozPrevZapisyDtoNames { radek_z = "radek_z", nks = "nks", ixp = "ixp", c0 = "c0", c1 = "c1", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", popis = "popis", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", smlouva = "smlouva",}
	const enum GUctRozPrevZapisyDtoFragments { radek_z = "*", nks = "*", ixp = "*", c0 = "*", c1 = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", popis = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", smlouva = "*",}
	const enum GUctRozPrevZapisyDtoTypes { radek_z = "number", nks = "string", ixp = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", popis = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", smlouva = "string",}
	const enum GUctRozPrevZapisyDtoTypeLengths { popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\DTO\GUctRozsvpkDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:uctsvpk*/
	interface GUctRozsvpkDto {
		/**DBCOLUMN:uctsvpk.ixs_vpk*/
		ixs_vpk?: string|null;
		/**DBCOLUMN:uctsvpk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:uctsvpk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:uctsvpk.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:uctsvpk.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:uctsvpk.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:uctsvpk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctsvpk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctsvpk.typ_rzv*/
		typ_rzv?: string|null;
		/**DBCOLUMN:uctsvpk.ktg_sax*/
		ktg_sax?: string|null;
		/**DBCOLUMN:uctsvpk.ico*/
		ico?: string|null;
		/**DBCOLUMN:uctsvpk.ucs*/
		ucs?: string|null;
	}
	const enum GUctRozsvpkDtoNames { ixs_vpk = "ixs_vpk", aktivita = "aktivita", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_rzv = "typ_rzv", ktg_sax = "ktg_sax", ico = "ico", ucs = "ucs",}
	const enum GUctRozsvpkDtoFragments { ixs_vpk = "*", aktivita = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", typ_rzv = "*", ktg_sax = "*", ico = "*", ucs = "*",}
	const enum GUctRozsvpkDtoTypes { ixs_vpk = "string", aktivita = "number", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", typ_rzv = "string", ktg_sax = "string", ico = "string", ucs = "string",}
	const enum GUctRozsvpkDtoTypeLengths { ixs_vpk = 12, nazev = 50, poznamka = 50, zmenu_prov = 12, typ_rzv = 12, ktg_sax = 12, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEAdpHistoreZdroj.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Enum pro zdroj zmeny pri zapisu do historie*/
	const enum GEAdpHistoreZdroj {
		RUCNE=0,
		/**Davka*/
		DAVKA=1,
		/**Import*/
		IMPORT=10,
		/**Export*/
		EXPORT=11,
		/**Export do SQL*/
		EXPORTSQL=12,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEAdpHistoriAkce.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Enum pro akce zapisovane do historie*/
	const enum GEAdpHistoriAkce {
		/**Porizeni*/
		INSERT,
		/**Mazani*/
		DELETE,
		/**aktualizace*/
		UPDATE,
		/**zmena specificka*/
		SPECIALNI_ZMENA,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEAgenda.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Zpracovavana agenda*/
	const enum GEAgenda {
		/**Nenastaveno, chyba*/
		NONE=0,
		/**Ucetnictvi*/
		UCT=40,
		/**Rozpocet*/
		ROZ=50,
		/**ADP*/
		ADP=280,
		/**FUC*/
		FUC=330,
		/**PCN*/
		PCN=630,
		/**KDF*/
		KDF=70,
		/**KOF*/
		KOF=80,
		/**POU*/
		POU=180,
		/**PRE*/
		PRE=230,
		/**POK*/
		POK=90,
		/**MAJ*/
		MAJ=260,
		/**MUD*/
		MUD=260,
		/**MAT*/
		MAT=60,
		/**INT*/
		INT=300,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEFilterdkonDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filtr na ROZ/UCT poradky predkontace*/
	const enum GEFilterdkonDto {
		/**indetikator predkontace*/
		ixs_kon,
		/**radek predkontace*/
		radek,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEPovoleniPrevoduPredkontace.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Povoleni prevodu uzivatelske pradkontace na verejnou*/
	const enum GEPovoleniPrevoduPredkontace {
		/**Nepovoleno*/
		Nepovoleno,
		/**Pouze vlastni*/
		PouzeVlastni,
		/**Vsechny*/
		VlastniACizi,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEPovoleniUzivatelskePredkontace.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Povoleni uzivatelske predkontace*/
	const enum GEPovoleniUzivatelskePredkontace {
		/**Nepovoleno*/
		Nepovoleno,
		/**Vlastni a verejne*/
		VlastniAVerejne,
		/**Vsechny*/
		Vsechny,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEPredkotaceUrovewPristupu.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Uroven pristupu k predkontacim*/
	const enum GEPredkotaceUrovewPristupu {
		/**Pouze prohlizet*/
		Prohlizeni=0,
		/**Oprava existujicich*/
		Oprava=1,
		/**Vsechny*/
		PorizovaniAOprava=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GETypPredkontace.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Typ predkontace*/
	const enum GETypPredkontace {
		/**cizi vlastni kontace*/
		Cizi,
		/**Vlastni kontace*/
		Vlastni,
		/**Verejna kontace*/
		Verejna,
		/**Neurcena*/
		Neurceno,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEVlastnikPredkontaci.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Typu vlastnictvi predkontaci*/
	const enum GEVlastnikPredkontaci {
		/**Vlastni*/
		Vlastni=1,
		/**Verejne predkontace*/
		Verejne=3,
		/**Cizi predkontace*/
		Cizi=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\Enums\GEVyberPredkontaci.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filtr pro nacitani predkontaci*/
	const enum GEVyberPredkontaci {
		/**Pouze vlastni predkontace*/
		PouzeVlastni=1,
		/**Verejne pripojene k variante u knihy*/
		Verejne=10,
		/**Vsechny verejne*/
		VsechnyVerejne=11,
		/**Vlastni a verejne*/
		VlastniAVerejne=12,
		/**Cizi uziv.*/
		Cizi=30,
		/**Cizi a vlastni*/
		CiziAVlastni,
		/**Cizi a Verejne*/
		CiziAVerejne,
		/**Vsechny*/
		Vsechny=40,
		/**Zadne*/
		Zadne,
		/**Nezvoleno*/
		Nevybrano,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\ISL\IGEkoPrekontaceSablona.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s uzivatelskymi predkontacemi*/
	interface EkoPrekontaceSablona {
		/**List predkontaci*/
		list(rq?:Gordic.Eko.Interface.GFiltrPredkontace|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GSeznamPredkontaciDto>>;
		/**Nacteni hlavicky predkontace*/
		read(rq?:Gordic.Eko.Interface.GUctRozskonDto|CallParams<GServiceReadRequest<Gordic.Eko.Interface.GUctRozskonDto>>): _Task<GServiceReadRequest<Gordic.Eko.Interface.GUctRozskonDto>,GServiceReadResponse<Gordic.Eko.Interface.GUctRozskonDto>>;
		/**Ulozeni hlavicky*/
		upsert(rq?:Gordic.Eko.Interface.GUctRozskonDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctRozskonDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctRozskonDto>,GServiceReadResponse<Gordic.Eko.Interface.GUctRozskonDto>>;
		/**Ulozeni cele predkontace*/
		save(rq?:Gordic.Eko.Interface.GPredkontaceDoklad|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GPredkontaceDoklad>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GPredkontaceDoklad>,GServiceReadResponse<Gordic.Eko.Interface.GPredkontaceDoklad>>;
		/**Pocet uzivatelskych predkontaci*/
		count(rq?:CallParams<{}>): _Task<{},number>;
		/**Vymazani predkontace*/
		delete(rq?:CallParams<{rq:Gordic.Eko.Interface.GUctRozskonDto[]}>): _Task<{rq:Gordic.Eko.Interface.GUctRozskonDto[]},void>;
		/**Prevod uzivatelske predkontace na verejnou*/
		prevodPredkontaceNaVerejnou(rq?:Gordic.Eko.Interface.GPredkontaceRequestPrevodDto|CallParams<GServiceActionRequest<Gordic.Eko.Interface.GPredkontaceRequestPrevodDto>>): _Task<GServiceActionRequest<Gordic.Eko.Interface.GPredkontaceRequestPrevodDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoPrekontaceSablona: ServiceBase & Catalog.EkoPrekontaceSablona;
	}
	const EkoPrekontaceSablona: Client["EkoPrekontaceSablona"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\ISL\IGEkoPrekontaceSablonaRadek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s uzivatelskymi predkontacemi - radky*/
	interface EkoPrekontaceSablonaRadek {
		/**List predkontaci*/
		list(rq?:CallParams<{typAg:number,rq:GServiceListRequest}>): _Task<{typAg:number,rq:GServiceListRequest},GServiceListResponse<Gordic.Eko.Interface.GUctRozdkonDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoPrekontaceSablonaRadek: ServiceBase & Catalog.EkoPrekontaceSablonaRadek;
	}
	const EkoPrekontaceSablonaRadek: Client["EkoPrekontaceSablonaRadek"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adp\UctRoz\ISL\IGEkoPrekontaceVarianta.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s uzivatelskymi predkontacemi*/
	interface EkoPrekontaceVarianta {
		/**List variant*/
		list(rq?:CallParams<{typAg:number}>): _Task<{typAg:number},GServiceListResponse<Gordic.Eko.Interface.GUctRozsvpkDto>>;
		/**Pocet variant*/
		count(rq?:CallParams<{typAg:number}>): _Task<{typAg:number},GServiceActionResponse<Gordic.Eko.Interface.GPredkontaceCountResponseDto>>;
		/**Test existence predkontace ve variante*/
		existujePredkontaceVeVariante(rq?:CallParams<{ixs_kon:string,ixs_vpk:string,typAg:number}>): _Task<{ixs_kon:string,ixs_vpk:string,typAg:number},boolean>;
		/**Metoda vlozi variantu do predkontace*/
		vlozPredkontaciDoVarianty(rq?:CallParams<{ixs_kon:string,ixs_vpk:string,typAg:number}>): _Task<{ixs_kon:string,ixs_vpk:string,typAg:number},void>;
		/**Id varianty privazene ke knize*/
		getIdVarinaty(rq?:CallParams<{ipx_den:string,typAg:number}>): _Task<{ipx_den:string,typAg:number},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoPrekontaceVarianta: ServiceBase & Catalog.EkoPrekontaceVarianta;
	}
	const EkoPrekontaceVarianta: Client["EkoPrekontaceVarianta"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLCfuKonfigurace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - cfu konfigurace*/
	interface CfuKonfigurace {
		/**ISL cfu konfigurace*/
		list(rq?:Gordic.Eko.Interface.GCfuKonfiguraceFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoscfuDto>>;
		/**ISL dcfu konfigurace*/
		list_dcfu(rq?:Gordic.Eko.Interface.GDcfuKonfiguraceFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkodcfuDto>>;
		/**ISL create dcfu*/
		createDcfu(rq?:Gordic.Eko.Interface.GEkodcfuDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkodcfuDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkodcfuDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkodcfuDto>>;
		/**ISL delete dcfu*/
		deleteDcfu(rq?:Gordic.Eko.Interface.GEkodcfuDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkodcfuDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkodcfuDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkodcfuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		CfuKonfigurace: ServiceBase & Catalog.CfuKonfigurace;
	}
	const CfuKonfigurace: Client["CfuKonfigurace"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr cfu konfigurace*/
	const enum FilterCfuKonfigurace {
		/**typ zákazníka*/
		cfu,
	}
	/**Výčet filtračních kritérií pro filtr dcfu konfigurace*/
	const enum FilterDcfuKonfigurace {
		/**typ zákazníka*/
		cfu,
		/**rok*/
		rok,
		/**úroveň (slovo)*/
		urovenNum,
		/**Agenda*/
		agenda,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLEkoOpen.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Logika pro EkoOpen*/
	interface GEkoOpen {
		pocetccfu(rq?:CallParams<{}>): _Task<{},number>;
		pocetscfu(rq?:CallParams<{rok:number}>): _Task<{rok:number},number>;
		pocetdcfu(rq?:CallParams<{rok:number}>): _Task<{rok:number},number>;
		pocetdico(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},number>;
		cfsExists(rq?:CallParams<{ixsSax:string}>): _Task<{ixsSax:string},boolean>;
		updateCfuDataset(rq?:CallParams<{dt:Gordic.Eko.Interface.GEkoscfuDto[],standard:boolean}>): _Task<{dt:Gordic.Eko.Interface.GEkoscfuDto[],standard:boolean},void>;
		updateEkodcfuDataset(rq?:CallParams<{dt:Gordic.Eko.Interface.GEkodcfuDto[],standard:boolean}>): _Task<{dt:Gordic.Eko.Interface.GEkodcfuDto[],standard:boolean},void>;
		deleteEkodcfuDatasetRow(rq?:CallParams<{r:Gordic.Eko.Interface.GEkodcfuDto,standard:boolean}>): _Task<{r:Gordic.Eko.Interface.GEkodcfuDto,standard:boolean},void>;
		/**Množina Ič k otevření*/
		icaKOtevreniLK(rq?:CallParams<{pouzeAktivni:boolean,rokPrev:number}>): _Task<{pouzeAktivni:boolean,rokPrev:number},Gordic.Eko.Interface.GEkosicoDto[]>;
		ekodcfuDataset(rq?:CallParams<{r:Gordic.Eko.Interface.GEkoscfuDto,standard:boolean}>): _Task<{r:Gordic.Eko.Interface.GEkoscfuDto,standard:boolean},Gordic.Eko.Interface.GEkodcfuDto[]>;
		cfuDataset(rq?:CallParams<{cfu:string,rok:number,standard:boolean}>): _Task<{cfu:string,rok:number,standard:boolean},Gordic.Eko.Interface.GEkoscfuDto[]>;
		cfuDatasetAll(rq?:CallParams<{cfu:string,rok:number,standard:boolean}>): _Task<{cfu:string,rok:number,standard:boolean},Gordic.Eko.Interface.GEkoscfuDto[]>;
		/**Vrátí cfu z tabulky ekodico na základě zadaného ica a roku*/
		vrat_cfu(rq?:CallParams<{ico:string,rok:number}>): _Task<{ico:string,rok:number},string>;
		/**Select z ekockts pro daný typ zákazníka*/
		seznamEkockts(rq?:CallParams<{cfu:string}>): _Task<{cfu:string},Gordic.Eko.Interface.GEkocktsDto[]>;
		/**Vrátí jeden radek s ktg_sax a ktg_sax_txt*/
		seznamEkockts(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},Gordic.Eko.Interface.GEkocktsDto[]>;
		seznamBplvtza(rq?:CallParams<{rok:number,standard:boolean}>): _Task<{rok:number,standard:boolean},Gordic.Eko.Interface.GBplvtzaDto[]>;
		seznamEkosdrr(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},Gordic.Eko.Interface.GEkosdrrDto[]>;
		pocetsdsr(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},number>;
		pocetsmsr(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},number>;
		pocetbplvtza(rq?:CallParams<{rok:number}>): _Task<{rok:number},number>;
		pocetekovago(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},number>;
		deleteEkodscfu(rq?:CallParams<{rok:number}>): _Task<{rok:number},void>;
		tmpekoscfu(rq?:CallParams<{rok:number,standard:boolean}>): _Task<{rok:number,standard:boolean},void>;
		tmpekodcfu(rq?:CallParams<{rok:number,standard:boolean}>): _Task<{rok:number,standard:boolean},void>;
		insertEkodcfu(rq?:CallParams<{cfu:string,rok:number}>): _Task<{cfu:string,rok:number},void>;
		tmpbplvtza(rq?:CallParams<{rok:number,standard:boolean}>): _Task<{rok:number,standard:boolean},void>;
		pocetsdrr(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},number>;
		tmpekosdrr(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},void>;
		pocetekosobd(rq?:CallParams<{rok:number}>): _Task<{rok:number},number>;
		ekosObd(rq?:CallParams<{rok:number}>): _Task<{rok:number},void>;
		insertIxsSaxDoEkodico(rq?:CallParams<{ico:string,rok:number,ixs_sax:string,cfu:string}>): _Task<{ico:string,rok:number,ixs_sax:string,cfu:string},void>;
		updateEkodico(rq?:CallParams<{ico:string,rok:number,cfu:string,ixsSax:string}>): _Task<{ico:string,rok:number,cfu:string,ixsSax:string},void>;
		maxOtevrenyRok(rq?:CallParams<{}>): _Task<{},number>;
		updateEkosico(rq?:CallParams<{ico:string}>): _Task<{ico:string},void>;
		copyCFS(rq?:CallParams<{ixsSax:string,ixsSaxPrev:string,ekossgxRow:Gordic.Eko.Interface.GEkossgxDto}>): _Task<{ixsSax:string,ixsSaxPrev:string,ekossgxRow:Gordic.Eko.Interface.GEkossgxDto},void>;
		copyEkovucl(rq?:CallParams<{ico:string,rok:number}>): _Task<{ico:string,rok:number},void>;
		copyEkovago(rq?:CallParams<{ico:string,rok:number}>): _Task<{ico:string,rok:number},void>;
		insertEkosdsrEkosmsr(rq?:CallParams<{ico:string,rok:number,cfu:string}>): _Task<{ico:string,rok:number,cfu:string},void>;
		copyEkosdsrEkosmsr(rq?:CallParams<{ico:string,rok:number}>): _Task<{ico:string,rok:number},void>;
		copyRozvrh(rq?:CallParams<{ixsSaxOld:string,ixsSaxNew:string}>): _Task<{ixsSaxOld:string,ixsSaxNew:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GEkoOpen: ServiceBase & Catalog.GEkoOpen;
	}
	const GEkoOpen: Client["GEkoOpen"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLGlobalniCiselnik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Globální číselník*/
	interface GlobalniCiselnik {
		/**ISL Globální číselník*/
		list(rq?:Gordic.Eko.Interface.GGlobalniCiselnikFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosgdcDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		GlobalniCiselnik: ServiceBase & Catalog.GlobalniCiselnik;
	}
	const GlobalniCiselnik: Client["GlobalniCiselnik"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr GlobalniCiselnik*/
	const enum FilterGlobalniCiselnikEnum {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLHloubkaRezervace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Hloubka rezervace*/
	interface HloubkaRezervace {
		/**ISL Seznam masek hloubky rezervace*/
		list(rq?:Gordic.Eko.Interface.GHloubkaRezervaceFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosmsrDto>>;
		/**ISL create masky hloubky rezervace*/
		create(rq?:Gordic.Eko.Interface.GEkosmsrDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosmsrDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosmsrDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosmsrDto>>;
		/**ISL delete masky hloubky rezervace*/
		delete(rq?:Gordic.Eko.Interface.GEkosmsrDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosmsrDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosmsrDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosmsrDto>>;
		/**ISL Seznam ucs s řídícími úrovněmi pro hloubku rezervace*/
		listUcs(rq?:Gordic.Eko.Interface.GHloubkaRezervaceUcsFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosucsHRDto>>;
		/**ISL create uroven*/
		createUrovne(rq?:Gordic.Eko.Interface.GEkosucsHRDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosucsHRDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosucsHRDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosucsHRDto>>;
		/**Vrati radek z ekosmsr pro urcity radek smlouvy*/
		vratEkosmsrRow(rq?:CallParams<{ixp_sml:string,rok_sml:number,cislo_sml:number}>): _Task<{ixp_sml:string,rok_sml:number,cislo_sml:number},Gordic.Eko.Interface.GEkosmsrDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HloubkaRezervace: ServiceBase & Catalog.HloubkaRezervace;
	}
	const HloubkaRezervace: Client["HloubkaRezervace"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr hloubky rezervace*/
	const enum FilterHloubkaRezervace {
		/**účetní středisko*/
		ucs,
		/**IČO*/
		ico,
		/**Rok*/
		rok,
		/**Aktivita*/
		aktivita,
	}
	/**Filter pro seznam Ucs s úrovněmi hloubky rezervace*/
	const enum FilterHloubkaRezervaceUcs {
		ucs,
		/**pouze platná ucs v roce z ekoinit*/
		pouzePlatna,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLOmezeniPristupu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Omezení přístupu kúčtům*/
	interface OmezeniPristupu {
		/**ISL Seznam omezení přístupu k účtům*/
		list(rq?:Gordic.Eko.Interface.GOmezeniPristupuFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosdrrDto>>;
		/**ISL create omezení přístupu k účtům*/
		create(rq?:Gordic.Eko.Interface.GEkosdrrDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosdrrDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosdrrDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosdrrDto>>;
		/**ISL delete záznamu omezení přístupu k účtům*/
		delete(rq?:Gordic.Eko.Interface.GEkosdrrDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosdrrDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosdrrDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosdrrDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OmezeniPristupu: ServiceBase & Catalog.OmezeniPristupu;
	}
	const OmezeniPristupu: Client["OmezeniPristupu"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr omezení přístupu k účtům*/
	const enum FilterOmezeniPristupu {
		/**účetní středisko*/
		ucs,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLPolozkaGlobalnihoCiselniku.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Interface pro ISL - Položka globálního číselníku
	*     
	*/
	interface PolozkaGlobalnihoCiselniku {
		/**
		*     ISL Položka globálního číselníku
		*     
		*/
		list(rq?:Gordic.Eko.Interface.GPolozkaGlobalnihoCiselnikuFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkodgdtDto>>;
		/**
		*     Detail úrovně
		*     
		*/
		gEkodgdu(rq?:CallParams<{gdc:number,naduroven:number}>): _Task<{gdc:number,naduroven:number},Gordic.Eko.Interface.GEkodgduDto>;
		/**
		*     ISL create položky globálního číselníku
		*     
		*/
		create(rq?:Gordic.Eko.Interface.GEkodgdtDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkodgdtDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkodgdtDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkodgdtDto>>;
		/**
		*     ISL delete položky globálního číselníku
		*     
		*/
		delete(rq?:Gordic.Eko.Interface.GEkodgdtDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkodgdtDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkodgdtDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkodgdtDto>>;
		/**
		*     Update roční hodnoty
		*     
		*/
		updateRocniHodnota(rq?:CallParams<{datarow:Gordic.Eko.Interface.GEkodgdtDto,hodnota_rdc_old:string,rokmes_od_old:string}>): _Task<{datarow:Gordic.Eko.Interface.GEkodgdtDto,hodnota_rdc_old:string,rokmes_od_old:string},void>;
		/**
		*     Insert roční hodnoty
		*     
		*/
		insertRocniHodnota(rq?:CallParams<{datarow:Gordic.Eko.Interface.GEkodgdtDto}>): _Task<{datarow:Gordic.Eko.Interface.GEkodgdtDto},void>;
		/**
		*     Smaže roční hodnotu
		*     
		*/
		deleteRocniHodnota(rq?:CallParams<{datarow:Gordic.Eko.Interface.GEkodgdtDto}>): _Task<{datarow:Gordic.Eko.Interface.GEkodgdtDto},void>;
		/**
		*     Import hodnot číselníku a ročních hodnot
		*     
		*/
		import(rq?:CallParams<{data:Gordic.Eko.Interface.GEkodgdtDto[]}>): _Task<{data:Gordic.Eko.Interface.GEkodgdtDto[]},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PolozkaGlobalnihoCiselniku: ServiceBase & Catalog.PolozkaGlobalnihoCiselniku;
	}
	const PolozkaGlobalnihoCiselniku: Client["PolozkaGlobalnihoCiselniku"];
}
declare namespace Gordic.Eko.Interface {
	/**
	*     Výčet filtračních kritérií pro filtr položek Globálního číselníku
	*     
	*/
	const enum FilterPolozkaGlobalnihoCiselnikuEnum {
		/**
		*     Globální číselník
		*     
		*/
		gdc,
		/**
		*     Nadúroveň
		*     
		*/
		naduroven,
		/**
		*     Identifikátor položky číselníku
		*     
		*/
		kod_gdc,
		/**
		*     zkratka
		*     
		*/
		zkratka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozsirenaVlastnost.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Rozšířené vlastnosti SU AU*/
	interface RozsirenaVlastnost {
		/**Seznam kombinací SU AU reg*/
		listSuAuReg(rq?:Gordic.Eko.Interface.GKombinaceSuAuRegFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctdtraDto>>;
		/**ISL create kombinace SU AU reg*/
		createSuAuReg(rq?:Gordic.Eko.Interface.GUctdtraDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctdtraDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctdtraDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctdtraDto>>;
		/**ISL delete kombinace SU AU reg*/
		deleteSuAuReg(rq?:Gordic.Eko.Interface.GUctdtraDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctdtraDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctdtraDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctdtraDto>>;
		/**Seznam kombinací SU AU*/
		listSuAu(rq?:Gordic.Eko.Interface.GKombinaceSuAuFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctsdrvDto>>;
		/**ISL create kombinace SU AU*/
		createSuAu(rq?:Gordic.Eko.Interface.GUctsdrvDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctsdrvDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctsdrvDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctsdrvDto>>;
		/**ISL delete kombinace SU AU*/
		deleteSuAu(rq?:Gordic.Eko.Interface.GUctsdrvDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctsdrvDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctsdrvDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctsdrvDto>>;
		/**Seznam rozšířených vlastností*/
		list(rq?:Gordic.Eko.Interface.GRozsirenaVlastnostFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctddrvDto>>;
		/**ISL create rozšířené vlastnosti*/
		create(rq?:Gordic.Eko.Interface.GUctddrvDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctddrvDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctddrvDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctddrvDto>>;
		/**ISL delete rozšířené vlastnosti*/
		delete(rq?:Gordic.Eko.Interface.GUctddrvDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctddrvDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctddrvDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctddrvDto>>;
		/**Seznam doplňkových údajů k závazkům/pohledávkám*/
		listDoplnkoveUdaje(rq?:Gordic.Eko.Interface.GDoplnkovyUdajFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctssudDto>>;
		/**Prepocet registru zavazku a pohledavek*/
		prepocetRegistru(rq?:CallParams<{allRows:boolean}>): _Task<{allRows:boolean},void>;
		/**Jestli Existuji pocatecni stavy v tabulce UCTDXMA*/
		existujiPocatecniStavyUctdxma(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Jestli existuje alespon jedno ucs, kde je dane obdobi zavreno*/
		existujeUzavreneUcsVObdobi(rq?:CallParams<{}>): _Task<{},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozsirenaVlastnost: ServiceBase & Catalog.RozsirenaVlastnost;
	}
	const RozsirenaVlastnost: Client["RozsirenaVlastnost"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr KombinaceSuAu*/
	const enum FilterKombinaceSuAuEnum {
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**rokOd*/
		rokOd,
		/**rokDo*/
		rokDo,
	}
	/**Výčet filtračních kritérií pro filtrování seznamu strukturovaných vlastností SU AU*/
	const enum FilterRozsirenaVlastnostEnum {
		/**Autogenerated.*/
		uea_reg,
		/**Autogenerated.*/
		ueb_reg,
		/**Autogenerated.*/
		druh_sud,
		/**Pokud ma zadanou default hodnotu*/
		ma_default,
		/**Jestli se maji vyselectovat i 900*/
		iZrusene,
	}
	/**Výčet filtračních kritérií pro filtrování seznamu doplnkovych udaju*/
	const enum FilterDoplnkovyUdajEnum {
		/**Autogenerated.*/
		aktivita,
		/**Autogenerated.*/
		pridruzene_ueaReg,
		/**Autogenerated.*/
		pridruzene_uebReg,
		/**Autogenerated.*/
		druh_sud,
	}
	/**Výčet filtračních kritérií pro filtr KombinaceSuAuReg*/
	const enum FilterKombinaceSuAuRegEnum {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrh.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Rozvrh*/
	interface Rozvrh {
		/**ISL Seznam rozvrhů*/
		list(rq?:Gordic.Eko.Interface.GRozvrhFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctsrozDto>>;
		/**ISL create rozvrhu*/
		create(rq?:Gordic.Eko.Interface.GUctsrozDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctsrozDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctsrozDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctsrozDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Rozvrh: ServiceBase & Catalog.Rozvrh;
	}
	const Rozvrh: Client["Rozvrh"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu rozvrhu*/
	const enum FilterRozvrh {
		/**pouze navázané rozvrhy*/
		pouzeNavazane,
		/**zda zobrazit rozvrhy navázané pouze na rok z ekoinit*/
		rok,
		/**zda zobrazit rozvrhy navázané pouze na ucs/nks z ekoinit (v jakémkoliv roce)*/
		ucsNks,
		/**seznam rozvrhu primo vyctem ixsRoz*/
		ixs_roz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhovyCiselnik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Rozvrhové číselníky*/
	interface RozvrhovyCiselnik {
		/**Seznam rozvrhových číselníků*/
		list(rq?:Gordic.Eko.Interface.GRozvrhovyCiselnikFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosrciDto>>;
		create(rq?:Gordic.Eko.Interface.GEkosrciDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosrciDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosrciDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosrciDto>>;
		/**Delete rozvrhového číselníku*/
		delete(rq?:Gordic.Eko.Interface.GEkosrciDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkosrciDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkosrciDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkosrciDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhovyCiselnik: ServiceBase & Catalog.RozvrhovyCiselnik;
	}
	const RozvrhovyCiselnik: Client["RozvrhovyCiselnik"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr Rozvrhových číselníků*/
	const enum FilterRozvrhovyCiselnikEnum {
		/**maxDelka*/
		maxDelka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhovyCiselnikHodnota.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Hodnoty rozvrhových číselníků*/
	interface RozvrhovyCiselnikHodnota {
		/**Seznam rozvrhových číselníků*/
		list(rq?:Gordic.Eko.Interface.GRozvrhovyCiselnikHodnotaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkodrciDto>>;
		create(rq?:Gordic.Eko.Interface.GEkodrciDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkodrciDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkodrciDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkodrciDto>>;
		/**Delete hodnoty rozvrhového číselníku*/
		delete(rq?:Gordic.Eko.Interface.GEkodrciDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkodrciDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkodrciDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkodrciDto>>;
		/**Synchronizuje synchronizované číselníky do rozvrhových číselníků*/
		synchronizujCiselnik(rq?:CallParams<{ciselnik:Gordic.Eko.Interface.GEkosrciDto,isExcel:boolean,excelData:Gordic.Eko.Interface.GEkodrciDto[]}>): _Task<{ciselnik:Gordic.Eko.Interface.GEkosrciDto,isExcel:boolean,excelData:Gordic.Eko.Interface.GEkodrciDto[]},void>;
		/**Zkopiruje do aktuálního roku hodnoty z jiného roku*/
		kopirujHodnoty(rq?:CallParams<{ciselnik:Gordic.Eko.Interface.GEkosrciDto,rok_old:number}>): _Task<{ciselnik:Gordic.Eko.Interface.GEkosrciDto,rok_old:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhovyCiselnikHodnota: ServiceBase & Catalog.RozvrhovyCiselnikHodnota;
	}
	const RozvrhovyCiselnikHodnota: Client["RozvrhovyCiselnikHodnota"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr Hodnot rozvrhových číselníků*/
	const enum FilterRozvrhovyCiselnikHodnotaEnum {
		/**identifikátor rozvrhového číselníku*/
		ixs_rci,
		/**zda načíst i zrušené záznamy*/
		vcetneZrusenych,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhovyCiselnikVazba.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Spravované vazby na synchronizované číselníky*/
	interface RozvrhovyCiselnikVazba {
		/**Seznam spravovaných vazeb na synchronizované číselníky*/
		list(rq?:Gordic.Eko.Interface.GRozvrhovyCiselnikVazbaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkovrccDto>>;
		create(rq?:Gordic.Eko.Interface.GEkovrccDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrccDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrccDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkovrccDto>>;
		/**Delete vazby rozvrhového číselníku*/
		delete(rq?:Gordic.Eko.Interface.GEkovrccDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrccDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrccDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkovrccDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhovyCiselnikVazba: ServiceBase & Catalog.RozvrhovyCiselnikVazba;
	}
	const RozvrhovyCiselnikVazba: Client["RozvrhovyCiselnikVazba"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr spravovaných vazeb na synchronizované číselníky*/
	const enum FilterRozvrhovyCiselnikVazbaEnum {
		/**identifikátor rozvrhového číselníku*/
		ixs_rci,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhovyCiselnikVetev - Copy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Práva k rozvrhovým číselníkům*/
	interface RozvrhovyCiselnikPrava {
		/**Seznam práv*/
		list(rq?:Gordic.Eko.Interface.GRozvrhovyCiselnikPravaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkovrcpDto>>;
		create(rq?:Gordic.Eko.Interface.GEkovrcpDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcpDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcpDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkovrcpDto>>;
		/**Delete práva k rozvrhovému číselníku*/
		delete(rq?:Gordic.Eko.Interface.GEkovrcpDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcpDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcpDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkovrcpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhovyCiselnikPrava: ServiceBase & Catalog.RozvrhovyCiselnikPrava;
	}
	const RozvrhovyCiselnikPrava: Client["RozvrhovyCiselnikPrava"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr spravovaných větví rozvrhových číselníků*/
	const enum FilterRozvrhovyCiselnikPravaEnum {
		/**identifikátor rozvrhového číselníku*/
		ixs_rci,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhovyCiselnikVetev.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Spravované větve rozvrhu rozvrhových číselníků*/
	interface RozvrhovyCiselnikVetev {
		/**Seznam spravovaných větví rozvrhu*/
		list(rq?:Gordic.Eko.Interface.GRozvrhovyCiselnikVetevFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkovrcrDto>>;
		create(rq?:Gordic.Eko.Interface.GEkovrcrDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcrDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcrDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkovrcrDto>>;
		/**Delete vazby rozvrhového číselníku*/
		delete(rq?:Gordic.Eko.Interface.GEkovrcrDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcrDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkovrcrDto>,GServiceSaveResponse<Gordic.Eko.Interface.GEkovrcrDto>>;
		/**Aktualizace rozvrhu*/
		aktualizaceRozvrhu(rq?:CallParams<{ciselnik:Gordic.Eko.Interface.GEkosrciDto,seznamVetvi:Gordic.Eko.Interface.GEkovrcrDto[],insertDoRozvrhu:boolean}>): _Task<{ciselnik:Gordic.Eko.Interface.GEkosrciDto,seznamVetvi:Gordic.Eko.Interface.GEkovrcrDto[],insertDoRozvrhu:boolean},Gordic.Eko.Interface.RozvrhDavkaDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhovyCiselnikVetev: ServiceBase & Catalog.RozvrhovyCiselnikVetev;
	}
	const RozvrhovyCiselnikVetev: Client["RozvrhovyCiselnikVetev"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr spravovaných větví rozvrhových číselníků*/
	const enum FilterRozvrhovyCiselnikVetevEnum {
		/**identifikátor rozvrhového číselníku*/
		ixs_rci,
		/**identifikátor rozvrhu*/
		ixs_roz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhRadek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface vrstva ISL pro řádky rozvrhů*/
	interface RozvrhRadek {
		/**ISL Seznam rozvrhů*/
		list(rq?:Gordic.Eko.Interface.GRozvrhRadekFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctdrozMoreDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhRadek: ServiceBase & Catalog.RozvrhRadek;
	}
	const RozvrhRadek: Client["RozvrhRadek"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr na řádky rozvrhu*/
	const enum FilterRozvrhRadek {
		/**ixs_roz*/
		ixs_roz,
		/**poradi*/
		Poradi,
		/**Bupsrr*/
		Bupsrr,
		/**zd*/
		Zd,
		/**nazev*/
		Nazev,
		/**prizNekumul*/
		PrizNekumul,
		/**aktivitaUct*/
		AktivitaUct,
		/**aktivitaRoz*/
		AktivitaRoz,
		/**dat_zmena*/
		Dat_zmena,
		/**zmenuProv*/
		ZmenuProv,
		/**popis*/
		Popis,
		/**cfu*/
		cfu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhVlastnik - Copy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Výjimka CFS*/
	interface CfsVyjimka {
		/**ISL Seznam výjimek*/
		list(rq?:Gordic.Eko.Interface.GCfsVyjimkaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.VyjimkyDto>>;
		/**Vrátí ixs_sax z tabulky ekodico na základě zadaného ica a roku*/
		vrat_ixs_sax(rq?:CallParams<{ico:string,rok:number}>): _Task<{ico:string,rok:number},string>;
		/**Vrátí KtgSax na základě zadaného ixs_sax*/
		vrat_ktg_sax(rq?:CallParams<{ixs_sax:string}>): _Task<{ixs_sax:string},string>;
		/**Vrátí VerzeKtgSax na základě zadaného ktg_sax*/
		vrat_verze_ktg_sax(rq?:CallParams<{ktg_sax:string}>): _Task<{ktg_sax:string},string>;
		/**Vrátí dto se třemi dto ekovsax, ekodsax a ekosvax deklarujícími cfs*/
		cfsDto(rq?:CallParams<{ixs_sax:string}>): _Task<{ixs_sax:string},Gordic.Eko.Interface.GCfsDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		CfsVyjimka: ServiceBase & Catalog.CfsVyjimka;
	}
	const CfsVyjimka: Client["CfsVyjimka"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu výjimek*/
	const enum FilterCfsVyjimka {
		/**identifikátor CFS*/
		ixs_sgx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLRozvrhVlastnik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Vlastník rozvrhu*/
	interface RozvrhVlastnik {
		/**ISL Seznam vlastníků rozvrhu*/
		list(rq?:Gordic.Eko.Interface.GRozvrhVlastnikFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GUctvrozNZDto>>;
		/**ISL create vlastníka rozvrhu*/
		create(rq?:Gordic.Eko.Interface.GUctvrozNZDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GUctvrozNZDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GUctvrozNZDto>,GServiceSaveResponse<Gordic.Eko.Interface.GUctvrozNZDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozvrhVlastnik: ServiceBase & Catalog.RozvrhVlastnik;
	}
	const RozvrhVlastnik: Client["RozvrhVlastnik"];
}
declare namespace Gordic.Eko.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu vlastníků rozvrhu*/
	const enum FilterRozvrhVlastnik {
		/**identifikátor rozvrhu*/
		ixs_roz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\IGISLSrvOpen.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - srvOpen*/
	interface SrvOpen {
		/**Seznam plánů*/
		seznamPlanu(rq?:CallParams<{rok:number}>): _Task<{rok:number},Gordic.Eko.Interface.GSrvsplaDto[]>;
		/**Pocet zaznamu v srvsmsa*/
		pocetSmsa(rq?:CallParams<{ico:string,rok:number}>): _Task<{ico:string,rok:number},number>;
		/**Počet období v tabulce ekosobd pro daný rok*/
		pocetsobd(rq?:CallParams<{rok:number}>): _Task<{rok:number},number>;
		/**Otevře SRV období*/
		runSrvOpen(rq?:CallParams<{DO:Gordic.Eko.Interface.GSrvOpenDto}>): _Task<{DO:Gordic.Eko.Interface.GSrvOpenDto},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SrvOpen: ServiceBase & Catalog.SrvOpen;
	}
	const SrvOpen: Client["SrvOpen"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GBplvtza.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GBplvtzaDto {
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.typ_zauc*/
		typ_zauc?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GBplvtzaDtoNames { ktg_typ = "ktg_typ", typ_zauc = "typ_zauc", ktg_typ_txt = "ktg_typ_txt",}
	const enum GBplvtzaDtoFragments { ktg_typ = "*", typ_zauc = "*", ktg_typ_txt = "*",}
	const enum GBplvtzaDtoTypes { ktg_typ = "number", typ_zauc = "number", ktg_typ_txt = "string",}
	const enum GBplvtzaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkoccfu.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkoccfuDto {
		/**DBCOLUMN:Seznam.cfu*/
		cfu?: string|null;
		/**DBCOLUMN:Seznam.cfu_txt*/
		cfu_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:Seznam.tyi*/
		tyi?: string|null;
	}
	const enum GEkoccfuDtoNames { cfu = "cfu", cfu_txt = "cfu_txt", k_v = "k_v", k_s = "k_s", tyi = "tyi",}
	const enum GEkoccfuDtoFragments { cfu = "*", cfu_txt = "*", k_v = "*", k_s = "*", tyi = "*",}
	const enum GEkoccfuDtoTypes { cfu = "string", cfu_txt = "string", k_v = "number", k_s = "string", tyi = "string",}
	const enum GEkoccfuDtoTypeLengths { cfu = 1, cfu_txt = 50, k_s = 15, tyi = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkockts.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkocktsDto {
		/**DBCOLUMN:Seznam.ktg_sax*/
		ktg_sax?: string|null;
		/**DBCOLUMN:Seznam.ktg_sax_txt*/
		ktg_sax_txt?: string|null;
		/**DBCOLUMN:Seznam.cfu*/
		cfu?: string|null;
		/**DBCOLUMN:Seznam.verze_ktg_sax*/
		verze_ktg_sax?: string|null;
	}
	const enum GEkocktsDtoNames { ktg_sax = "ktg_sax", ktg_sax_txt = "ktg_sax_txt", cfu = "cfu", verze_ktg_sax = "verze_ktg_sax",}
	const enum GEkocktsDtoFragments { ktg_sax = "*", ktg_sax_txt = "*", cfu = "*", verze_ktg_sax = "*",}
	const enum GEkocktsDtoTypes { ktg_sax = "string", ktg_sax_txt = "string", cfu = "string", verze_ktg_sax = "string",}
	const enum GEkocktsDtoTypeLengths { ktg_sax = 12, ktg_sax_txt = 50, cfu = 1, verze_ktg_sax = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkodcfu.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkodcfuDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.cfu*/
		cfu?: string|null;
		/**DBCOLUMN:Seznam.uroven_num*/
		uroven_num?: number|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.priz_kry*/
		priz_kry?: number|null;
		/**DBCOLUMN:Seznam.priz_lik*/
		priz_lik?: number|null;
		/**DBCOLUMN:Seznam.zkr_ag*/
		zkr_ag?: string|null;
	}
	const enum GEkodcfuDtoNames { rok = "rok", cfu = "cfu", uroven_num = "uroven_num", typ_ag = "typ_ag", priz_kry = "priz_kry", priz_lik = "priz_lik", zkr_ag = "zkr_ag",}
	const enum GEkodcfuDtoFragments { rok = "*", cfu = "*", uroven_num = "*", typ_ag = "*", priz_kry = "*", priz_lik = "*", zkr_ag = "*",}
	const enum GEkodcfuDtoTypes { rok = "number", cfu = "string", uroven_num = "number", typ_ag = "number", priz_kry = "number", priz_lik = "number", zkr_ag = "string",}
	const enum GEkodcfuDtoTypeLengths { cfu = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkodgdu.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkodgduDto {
		/**DBCOLUMN:Seznam.gdc*/
		gdc?: number|null;
		/**DBCOLUMN:Seznam.naduroven*/
		naduroven?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
	}
	const enum GEkodgduDtoNames { gdc = "gdc", naduroven = "naduroven", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita",}
	const enum GEkodgduDtoFragments { gdc = "*", naduroven = "*", nazev = "*", poznamka = "*", aktivita = "*",}
	const enum GEkodgduDtoTypes { gdc = "number", naduroven = "number", nazev = "string", poznamka = "string", aktivita = "number",}
	const enum GEkodgduDtoTypeLengths { nazev = 50, poznamka = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkoscfu.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkoscfuDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.cfu*/
		cfu?: string|null;
		/**DBCOLUMN:Seznam.uroven_num*/
		uroven_num?: number|null;
		/**DBCOLUMN:Seznam.uroven*/
		uroven?: string|null;
		/**DBCOLUMN:Seznam.db_nazev*/
		db_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:Seznam.pouziti*/
		pouziti?: number|null;
		/**DBCOLUMN:Seznam.uroven_dos*/
		uroven_dos?: string|null;
		/**DBCOLUMN:Seznam.prazdny*/
		prazdny?: string|null;
		/**DBCOLUMN:Seznam.zobrazovany*/
		zobrazovany?: string|null;
		/**DBCOLUMN:Seznam.predkontace*/
		predkontace?: string|null;
		/**DBCOLUMN:Seznam.delka*/
		delka?: number|null;
		/**DBCOLUMN:Seznam.delka_db*/
		delka_db?: number|null;
		/**DBCOLUMN:Seznam.uroven_ginis*/
		uroven_ginis?: string|null;
		/**DBCOLUMN:Seznam.atribut*/
		atribut?: string|null;
		/**DBCOLUMN:Seznam.priz_lik*/
		priz_lik?: number|null;
	}
	const enum GEkoscfuDtoNames { rok = "rok", cfu = "cfu", uroven_num = "uroven_num", uroven = "uroven", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", poradi = "poradi", pouziti = "pouziti", uroven_dos = "uroven_dos", prazdny = "prazdny", zobrazovany = "zobrazovany", predkontace = "predkontace", delka = "delka", delka_db = "delka_db", uroven_ginis = "uroven_ginis", atribut = "atribut", priz_lik = "priz_lik",}
	const enum GEkoscfuDtoFragments { rok = "*", cfu = "*", uroven_num = "*", uroven = "*", db_nazev = "*", nazev = "*", zkratka = "*", poradi = "*", pouziti = "*", uroven_dos = "*", prazdny = "*", zobrazovany = "*", predkontace = "*", delka = "*", delka_db = "*", uroven_ginis = "*", atribut = "*", priz_lik = "*",}
	const enum GEkoscfuDtoTypes { rok = "number", cfu = "string", uroven_num = "number", uroven = "string", db_nazev = "string", nazev = "string", zkratka = "string", poradi = "number", pouziti = "number", uroven_dos = "string", prazdny = "string", zobrazovany = "string", predkontace = "string", delka = "number", delka_db = "number", uroven_ginis = "string", atribut = "string", priz_lik = "number",}
	const enum GEkoscfuDtoTypeLengths { cfu = 1, uroven = 1, db_nazev = 3, nazev = 50, uroven_dos = 1, predkontace = 1, uroven_ginis = 2, atribut = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkosdrr.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosdrrDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.uea_0*/
		uea_0?: string|null;
		/**DBCOLUMN:Seznam.uea_1*/
		uea_1?: string|null;
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb_0?: string|null;
		/**DBCOLUMN:Seznam.ueb_1*/
		ueb_1?: string|null;
		/**DBCOLUMN:Seznam.uec_0*/
		uec_0?: string|null;
		/**DBCOLUMN:Seznam.uec_1*/
		uec_1?: string|null;
		/**DBCOLUMN:Seznam.ued_0*/
		ued_0?: string|null;
		/**DBCOLUMN:Seznam.ued_1*/
		ued_1?: string|null;
		/**DBCOLUMN:Seznam.uee_0*/
		uee_0?: string|null;
		/**DBCOLUMN:Seznam.uee_1*/
		uee_1?: string|null;
		/**DBCOLUMN:Seznam.uef_0*/
		uef_0?: string|null;
		/**DBCOLUMN:Seznam.uef_1*/
		uef_1?: string|null;
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg_0?: string|null;
		/**DBCOLUMN:Seznam.ueg_1*/
		ueg_1?: string|null;
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh_0?: string|null;
		/**DBCOLUMN:Seznam.ueh_1*/
		ueh_1?: string|null;
		/**DBCOLUMN:Seznam.uei_0*/
		uei_0?: string|null;
		/**DBCOLUMN:Seznam.uei_1*/
		uei_1?: string|null;
		/**DBCOLUMN:Seznam.uej_0*/
		uej_0?: string|null;
		/**DBCOLUMN:Seznam.uej_1*/
		uej_1?: string|null;
		/**DBCOLUMN:Seznam.uek_0*/
		uek_0?: string|null;
		/**DBCOLUMN:Seznam.uek_1*/
		uek_1?: string|null;
		/**DBCOLUMN:Seznam.uel_0*/
		uel_0?: string|null;
		/**DBCOLUMN:Seznam.uel_1*/
		uel_1?: string|null;
		/**DBCOLUMN:Seznam.uem_0*/
		uem_0?: string|null;
		/**DBCOLUMN:Seznam.uem_1*/
		uem_1?: string|null;
		/**DBCOLUMN:Seznam.uen_0*/
		uen_0?: string|null;
		/**DBCOLUMN:Seznam.uen_1*/
		uen_1?: string|null;
		/**DBCOLUMN:Seznam.te0_0*/
		te0_0?: string|null;
		/**DBCOLUMN:Seznam.te0_1*/
		te0_1?: string|null;
		/**DBCOLUMN:Seznam.te1_0*/
		te1_0?: string|null;
		/**DBCOLUMN:Seznam.te1_1*/
		te1_1?: string|null;
		/**DBCOLUMN:Seznam.te2_0*/
		te2_0?: string|null;
		/**DBCOLUMN:Seznam.te2_1*/
		te2_1?: string|null;
		/**DBCOLUMN:Seznam.te3_0*/
		te3_0?: string|null;
		/**DBCOLUMN:Seznam.te3_1*/
		te3_1?: string|null;
		/**DBCOLUMN:Seznam.te4_0*/
		te4_0?: string|null;
		/**DBCOLUMN:Seznam.te4_1*/
		te4_1?: string|null;
		/**DBCOLUMN:Seznam.te5_0*/
		te5_0?: string|null;
		/**DBCOLUMN:Seznam.te5_1*/
		te5_1?: string|null;
		/**DBCOLUMN:Seznam.te6_0*/
		te6_0?: string|null;
		/**DBCOLUMN:Seznam.te6_1*/
		te6_1?: string|null;
		/**DBCOLUMN:Seznam.te7_0*/
		te7_0?: string|null;
		/**DBCOLUMN:Seznam.te7_1*/
		te7_1?: string|null;
		/**DBCOLUMN:Seznam.te8_0*/
		te8_0?: string|null;
		/**DBCOLUMN:Seznam.te8_1*/
		te8_1?: string|null;
		/**DBCOLUMN:Seznam.te9_0*/
		te9_0?: string|null;
		/**DBCOLUMN:Seznam.te9_1*/
		te9_1?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.drd_txt*/
		drd_txt?: string|null;
	}
	const enum GEkosdrrDtoNames { rok = "rok", ico = "ico", ucs = "ucs", drd = "drd", uea_0 = "uea_0", uea_1 = "uea_1", ueb_0 = "ueb_0", ueb_1 = "ueb_1", uec_0 = "uec_0", uec_1 = "uec_1", ued_0 = "ued_0", ued_1 = "ued_1", uee_0 = "uee_0", uee_1 = "uee_1", uef_0 = "uef_0", uef_1 = "uef_1", ueg_0 = "ueg_0", ueg_1 = "ueg_1", ueh_0 = "ueh_0", ueh_1 = "ueh_1", uei_0 = "uei_0", uei_1 = "uei_1", uej_0 = "uej_0", uej_1 = "uej_1", uek_0 = "uek_0", uek_1 = "uek_1", uel_0 = "uel_0", uel_1 = "uel_1", uem_0 = "uem_0", uem_1 = "uem_1", uen_0 = "uen_0", uen_1 = "uen_1", te0_0 = "te0_0", te0_1 = "te0_1", te1_0 = "te1_0", te1_1 = "te1_1", te2_0 = "te2_0", te2_1 = "te2_1", te3_0 = "te3_0", te3_1 = "te3_1", te4_0 = "te4_0", te4_1 = "te4_1", te5_0 = "te5_0", te5_1 = "te5_1", te6_0 = "te6_0", te6_1 = "te6_1", te7_0 = "te7_0", te7_1 = "te7_1", te8_0 = "te8_0", te8_1 = "te8_1", te9_0 = "te9_0", te9_1 = "te9_1", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", drd_txt = "drd_txt",}
	const enum GEkosdrrDtoFragments { rok = "*", ico = "*", ucs = "*", drd = "*", uea_0 = "*", uea_1 = "*", ueb_0 = "*", ueb_1 = "*", uec_0 = "*", uec_1 = "*", ued_0 = "*", ued_1 = "*", uee_0 = "*", uee_1 = "*", uef_0 = "*", uef_1 = "*", ueg_0 = "*", ueg_1 = "*", ueh_0 = "*", ueh_1 = "*", uei_0 = "*", uei_1 = "*", uej_0 = "*", uej_1 = "*", uek_0 = "*", uek_1 = "*", uel_0 = "*", uel_1 = "*", uem_0 = "*", uem_1 = "*", uen_0 = "*", uen_1 = "*", te0_0 = "*", te0_1 = "*", te1_0 = "*", te1_1 = "*", te2_0 = "*", te2_1 = "*", te3_0 = "*", te3_1 = "*", te4_0 = "*", te4_1 = "*", te5_0 = "*", te5_1 = "*", te6_0 = "*", te6_1 = "*", te7_0 = "*", te7_1 = "*", te8_0 = "*", te8_1 = "*", te9_0 = "*", te9_1 = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", drd_txt = "*",}
	const enum GEkosdrrDtoTypes { rok = "number", ico = "string", ucs = "string", drd = "number", uea_0 = "string", uea_1 = "string", ueb_0 = "string", ueb_1 = "string", uec_0 = "string", uec_1 = "string", ued_0 = "string", ued_1 = "string", uee_0 = "string", uee_1 = "string", uef_0 = "string", uef_1 = "string", ueg_0 = "string", ueg_1 = "string", ueh_0 = "string", ueh_1 = "string", uei_0 = "string", uei_1 = "string", uej_0 = "string", uej_1 = "string", uek_0 = "string", uek_1 = "string", uel_0 = "string", uel_1 = "string", uem_0 = "string", uem_1 = "string", uen_0 = "string", uen_1 = "string", te0_0 = "string", te0_1 = "string", te1_0 = "string", te1_1 = "string", te2_0 = "string", te2_1 = "string", te3_0 = "string", te3_1 = "string", te4_0 = "string", te4_1 = "string", te5_0 = "string", te5_1 = "string", te6_0 = "string", te6_1 = "string", te7_0 = "string", te7_1 = "string", te8_0 = "string", te8_1 = "string", te9_0 = "string", te9_1 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", drd_txt = "string",}
	const enum GEkosdrrDtoTypeLengths { ico = 10, ucs = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkosgdc.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosgdcDto {
		/**DBCOLUMN:Seznam.gdc*/
		gdc?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.poc_nadur*/
		poc_nadur?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.uroven_gdc*/
		uroven_gdc?: string|null;
		/**DBCOLUMN:Seznam.count*/
		count?: number|null;
	}
	const enum GEkosgdcDtoNames { gdc = "gdc", nazev = "nazev", poznamka = "poznamka", poc_nadur = "poc_nadur", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uroven_gdc = "uroven_gdc", count = "count",}
	const enum GEkosgdcDtoFragments { gdc = "*", nazev = "*", poznamka = "*", poc_nadur = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uroven_gdc = "*", count = "*",}
	const enum GEkosgdcDtoTypes { gdc = "number", nazev = "string", poznamka = "string", poc_nadur = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uroven_gdc = "string", count = "number",}
	const enum GEkosgdcDtoTypeLengths { nazev = 50, poznamka = 50, zmenu_prov = 12, uroven_gdc = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkosrci.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosrciDto {
		/**DBCOLUMN:Seznam.ixs_rci*/
		ixs_rci?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.typ_rci*/
		typ_rci?: number|null;
		/**DBCOLUMN:Seznam.s_akt_rzv*/
		s_akt_rzv?: number|null;
		/**DBCOLUMN:Seznam.dat_akt_rzv*/
		dat_akt_rzv?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_synch_sc*/
		dat_synch_sc?: JsonDate|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.typ_synch*/
		typ_synch?: number|null;
		/**DBCOLUMN:Seznam.typ_rci_txt*/
		typ_rci_txt?: string|null;
		/**DBCOLUMN:Seznam.prava_rci*/
		prava_rci?: number|null;
		/**DBCOLUMN:Seznam.delka*/
		delka?: number|null;
		/**DBCOLUMN:Seznam.zarovnani*/
		zarovnani?: number|null;
	}
	const enum GEkosrciDtoNames { ixs_rci = "ixs_rci", nazev = "nazev", ico = "ico", typ_rci = "typ_rci", s_akt_rzv = "s_akt_rzv", dat_akt_rzv = "dat_akt_rzv", dat_synch_sc = "dat_synch_sc", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", typ_synch = "typ_synch", typ_rci_txt = "typ_rci_txt", prava_rci = "prava_rci", delka = "delka", zarovnani = "zarovnani",}
	const enum GEkosrciDtoFragments { ixs_rci = "*", nazev = "*", ico = "*", typ_rci = "*", s_akt_rzv = "*", dat_akt_rzv = "*", dat_synch_sc = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", typ_synch = "*", typ_rci_txt = "*", prava_rci = "*", delka = "*", zarovnani = "*",}
	const enum GEkosrciDtoTypes { ixs_rci = "string", nazev = "string", ico = "string", typ_rci = "number", s_akt_rzv = "number", dat_akt_rzv = "JsonDate", dat_synch_sc = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", typ_synch = "number", typ_rci_txt = "string", prava_rci = "number", delka = "number", zarovnani = "number",}
	const enum GEkosrciDtoTypeLengths { ixs_rci = 12, nazev = 100, ico = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkovrcc.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkovrccDto {
		/**DBCOLUMN:Seznam.ixs_rci*/
		ixs_rci?: string|null;
		/**DBCOLUMN:Seznam.radek_sc*/
		radek_sc?: number|null;
		/**DBCOLUMN:Seznam.id_sci*/
		id_sci?: number|null;
		/**DBCOLUMN:Seznam.hodnota_o1*/
		hodnota_o1?: string|null;
		/**DBCOLUMN:Seznam.hodnota_o2*/
		hodnota_o2?: string|null;
		/**DBCOLUMN:Seznam.hodnota_o3*/
		hodnota_o3?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev_o1*/
		nazev_o1?: string|null;
		/**DBCOLUMN:Seznam.nazev_o2*/
		nazev_o2?: string|null;
		/**DBCOLUMN:Seznam.nazev_o3*/
		nazev_o3?: string|null;
		/**DBCOLUMN:Seznam.poznamka_o1*/
		poznamka_o1?: string|null;
		/**DBCOLUMN:Seznam.poznamka_o2*/
		poznamka_o2?: string|null;
		/**DBCOLUMN:Seznam.poznamka_o3*/
		poznamka_o3?: string|null;
		/**DBCOLUMN:Seznam.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:Seznam.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:Seznam.nazev_sci*/
		nazev_sci?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
	}
	const enum GEkovrccDtoNames { ixs_rci = "ixs_rci", radek_sc = "radek_sc", id_sci = "id_sci", hodnota_o1 = "hodnota_o1", hodnota_o2 = "hodnota_o2", hodnota_o3 = "hodnota_o3", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_o1 = "nazev_o1", nazev_o2 = "nazev_o2", nazev_o3 = "nazev_o3", poznamka_o1 = "poznamka_o1", poznamka_o2 = "poznamka_o2", poznamka_o3 = "poznamka_o3", rok_od = "rok_od", rok_do = "rok_do", nazev_sci = "nazev_sci", popis = "popis",}
	const enum GEkovrccDtoFragments { ixs_rci = "*", radek_sc = "*", id_sci = "*", hodnota_o1 = "*", hodnota_o2 = "*", hodnota_o3 = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_o1 = "*", nazev_o2 = "*", nazev_o3 = "*", poznamka_o1 = "*", poznamka_o2 = "*", poznamka_o3 = "*", rok_od = "*", rok_do = "*", nazev_sci = "*", popis = "*",}
	const enum GEkovrccDtoTypes { ixs_rci = "string", radek_sc = "number", id_sci = "number", hodnota_o1 = "string", hodnota_o2 = "string", hodnota_o3 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_o1 = "string", nazev_o2 = "string", nazev_o3 = "string", poznamka_o1 = "string", poznamka_o2 = "string", poznamka_o3 = "string", rok_od = "number", rok_do = "number", nazev_sci = "string", popis = "string",}
	const enum GEkovrccDtoTypeLengths { ixs_rci = 12, hodnota_o1 = 100, hodnota_o2 = 100, hodnota_o3 = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkovrcp.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkovrcpDto {
		/**DBCOLUMN:Seznam.ixs_rci*/
		ixs_rci?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.prava_rci*/
		prava_rci?: number|null;
		/**DBCOLUMN:Seznam.prava_aktualizace*/
		prava_aktualizace?: number|null;
		/**DBCOLUMN:Seznam.prava_synchronizace*/
		prava_synchronizace?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GEkovrcpDtoNames { ixs_rci = "ixs_rci", ixs_fun = "ixs_fun", prava_rci = "prava_rci", prava_aktualizace = "prava_aktualizace", prava_synchronizace = "prava_synchronizace", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf",}
	const enum GEkovrcpDtoFragments { ixs_rci = "*", ixs_fun = "*", prava_rci = "*", prava_aktualizace = "*", prava_synchronizace = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*",}
	const enum GEkovrcpDtoTypes { ixs_rci = "string", ixs_fun = "string", prava_rci = "number", prava_aktualizace = "number", prava_synchronizace = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string",}
	const enum GEkovrcpDtoTypeLengths { ixs_rci = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GEkovrcr.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkovrcrDto {
		/**DBCOLUMN:Seznam.ixs_rci*/
		ixs_rci?: string|null;
		/**DBCOLUMN:Seznam.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:Seznam.ixs_roz*/
		ixs_roz?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.aktivita_uct*/
		aktivita_uct?: number|null;
		/**DBCOLUMN:Seznam.aktivita_roz*/
		aktivita_roz?: number|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.kod*/
		kod?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.uroven_kon*/
		uroven_kon?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.bupsrr*/
		bupsrr?: string|null;
		/**DBCOLUMN:Seznam.o_uea*/
		o_uea?: string|null;
		/**DBCOLUMN:Seznam.o_ueb*/
		o_ueb?: string|null;
		/**DBCOLUMN:Seznam.o_uec*/
		o_uec?: string|null;
		/**DBCOLUMN:Seznam.o_ued*/
		o_ued?: string|null;
		/**DBCOLUMN:Seznam.o_uee*/
		o_uee?: string|null;
		/**DBCOLUMN:Seznam.o_uef*/
		o_uef?: string|null;
		/**DBCOLUMN:Seznam.o_ueg*/
		o_ueg?: string|null;
		/**DBCOLUMN:Seznam.o_ueh*/
		o_ueh?: string|null;
		/**DBCOLUMN:Seznam.o_uei*/
		o_uei?: string|null;
		/**DBCOLUMN:Seznam.o_uej*/
		o_uej?: string|null;
		/**DBCOLUMN:Seznam.o_te0*/
		o_te0?: string|null;
		/**DBCOLUMN:Seznam.o_te1*/
		o_te1?: string|null;
		/**DBCOLUMN:Seznam.o_te2*/
		o_te2?: string|null;
		/**DBCOLUMN:Seznam.o_te3*/
		o_te3?: string|null;
		/**DBCOLUMN:Seznam.o_te4*/
		o_te4?: string|null;
		/**DBCOLUMN:Seznam.o_uek*/
		o_uek?: string|null;
		/**DBCOLUMN:Seznam.o_uel*/
		o_uel?: string|null;
		/**DBCOLUMN:Seznam.o_uem*/
		o_uem?: string|null;
		/**DBCOLUMN:Seznam.o_uen*/
		o_uen?: string|null;
		/**DBCOLUMN:Seznam.o_te5*/
		o_te5?: string|null;
		/**DBCOLUMN:Seznam.o_te6*/
		o_te6?: string|null;
		/**DBCOLUMN:Seznam.o_te7*/
		o_te7?: string|null;
		/**DBCOLUMN:Seznam.o_te8*/
		o_te8?: string|null;
		/**DBCOLUMN:Seznam.o_te9*/
		o_te9?: string|null;
		/**DBCOLUMN:Seznam.ixs_indir*/
		ixs_indir?: string|null;
		/**DBCOLUMN:Seznam.exp_cmd*/
		exp_cmd?: string|null;
		/**DBCOLUMN:Seznam.exp_stav*/
		exp_stav?: number|null;
		/**DBCOLUMN:Seznam.zd*/
		zd?: number|null;
		/**DBCOLUMN:Seznam.priz_nekumul*/
		priz_nekumul?: number|null;
		/**DBCOLUMN:Seznam.dat_mpd0*/
		dat_mpd0?: JsonDate|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.rozvrh_nazev*/
		rozvrh_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_cis*/
		nazev_cis?: string|null;
		/**DBCOLUMN:Seznam.prefix*/
		prefix?: string|null;
		/**DBCOLUMN:Seznam.sufix*/
		sufix?: string|null;
		/**DBCOLUMN:Seznam.db_nazev*/
		db_nazev?: string|null;
		/**DBCOLUMN:Seznam.delka*/
		delka?: number|null;
		/**DBCOLUMN:Seznam.delka_db*/
		delka_db?: number|null;
		/**DBCOLUMN:Seznam.DataColumn1*/
		DataColumn1?: string|null;
	}
	const enum GEkovrcrDtoNames { ixs_rci = "ixs_rci", xuete = "xuete", ixs_roz = "ixs_roz", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", lic = "lic", aktivita_uct = "aktivita_uct", aktivita_roz = "aktivita_roz", zkratka = "zkratka", nazev = "nazev", kod = "kod", dat_od = "dat_od", dat_do = "dat_do", uroven_kon = "uroven_kon", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", bupsrr = "bupsrr", o_uea = "o_uea", o_ueb = "o_ueb", o_uec = "o_uec", o_ued = "o_ued", o_uee = "o_uee", o_uef = "o_uef", o_ueg = "o_ueg", o_ueh = "o_ueh", o_uei = "o_uei", o_uej = "o_uej", o_te0 = "o_te0", o_te1 = "o_te1", o_te2 = "o_te2", o_te3 = "o_te3", o_te4 = "o_te4", o_uek = "o_uek", o_uel = "o_uel", o_uem = "o_uem", o_uen = "o_uen", o_te5 = "o_te5", o_te6 = "o_te6", o_te7 = "o_te7", o_te8 = "o_te8", o_te9 = "o_te9", ixs_indir = "ixs_indir", exp_cmd = "exp_cmd", exp_stav = "exp_stav", zd = "zd", priz_nekumul = "priz_nekumul", dat_mpd0 = "dat_mpd0", rok = "rok", rozvrh_nazev = "rozvrh_nazev", nazev_cis = "nazev_cis", prefix = "prefix", sufix = "sufix", db_nazev = "db_nazev", delka = "delka", delka_db = "delka_db", DataColumn1 = "DataColumn1",}
	const enum GEkovrcrDtoFragments { ixs_rci = "*", xuete = "*", ixs_roz = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", lic = "*", aktivita_uct = "*", aktivita_roz = "*", zkratka = "*", nazev = "*", kod = "*", dat_od = "*", dat_do = "*", uroven_kon = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", bupsrr = "*", o_uea = "*", o_ueb = "*", o_uec = "*", o_ued = "*", o_uee = "*", o_uef = "*", o_ueg = "*", o_ueh = "*", o_uei = "*", o_uej = "*", o_te0 = "*", o_te1 = "*", o_te2 = "*", o_te3 = "*", o_te4 = "*", o_uek = "*", o_uel = "*", o_uem = "*", o_uen = "*", o_te5 = "*", o_te6 = "*", o_te7 = "*", o_te8 = "*", o_te9 = "*", ixs_indir = "*", exp_cmd = "*", exp_stav = "*", zd = "*", priz_nekumul = "*", dat_mpd0 = "*", rok = "*", rozvrh_nazev = "*", nazev_cis = "*", prefix = "*", sufix = "*", db_nazev = "*", delka = "*", delka_db = "*", DataColumn1 = "*",}
	const enum GEkovrcrDtoTypes { ixs_rci = "string", xuete = "string", ixs_roz = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", lic = "string", aktivita_uct = "number", aktivita_roz = "number", zkratka = "string", nazev = "string", kod = "string", dat_od = "JsonDate", dat_do = "JsonDate", uroven_kon = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", bupsrr = "string", o_uea = "string", o_ueb = "string", o_uec = "string", o_ued = "string", o_uee = "string", o_uef = "string", o_ueg = "string", o_ueh = "string", o_uei = "string", o_uej = "string", o_te0 = "string", o_te1 = "string", o_te2 = "string", o_te3 = "string", o_te4 = "string", o_uek = "string", o_uel = "string", o_uem = "string", o_uen = "string", o_te5 = "string", o_te6 = "string", o_te7 = "string", o_te8 = "string", o_te9 = "string", ixs_indir = "string", exp_cmd = "string", exp_stav = "number", zd = "number", priz_nekumul = "number", dat_mpd0 = "JsonDate", rok = "number", rozvrh_nazev = "string", nazev_cis = "string", prefix = "string", sufix = "string", db_nazev = "string", delka = "number", delka_db = "number", DataColumn1 = "string",}
	const enum GEkovrcrDtoTypeLengths { ixs_rci = 12, xuete = 148, ixs_roz = 12, lic = 4, zkratka = 16, nazev = 50, kod = 30, uroven_kon = 1, zmenu_prov = 12, bupsrr = 6, ixs_indir = 12, exp_cmd = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GSrvspla.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GSrvsplaDto {
		/**DBCOLUMN:Seznam.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.ktg_akce*/
		ktg_akce?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.cpps_msk*/
		cpps_msk?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_old*/
		ixp_den_old?: string|null;
		/**DBCOLUMN:Seznam.priz_az_def*/
		priz_az_def?: number|null;
		/**DBCOLUMN:Seznam.priz_gen_cis*/
		priz_gen_cis?: number|null;
		/**DBCOLUMN:Seznam.ixs_csp*/
		ixs_csp?: string|null;
		/**DBCOLUMN:Seznam.priz_ram_doh*/
		priz_ram_doh?: number|null;
	}
	const enum GSrvsplaDtoNames { ixs_pla = "ixs_pla", rok = "rok", ico = "ico", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", ktg_akce = "ktg_akce", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpps_msk = "cpps_msk", ixp_den_old = "ixp_den_old", priz_az_def = "priz_az_def", priz_gen_cis = "priz_gen_cis", ixs_csp = "ixs_csp", priz_ram_doh = "priz_ram_doh",}
	const enum GSrvsplaDtoFragments { ixs_pla = "*", rok = "*", ico = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", ktg_akce = "*", dat_zmena = "*", zmenu_prov = "*", cpps_msk = "*", ixp_den_old = "*", priz_az_def = "*", priz_gen_cis = "*", ixs_csp = "*", priz_ram_doh = "*",}
	const enum GSrvsplaDtoTypes { ixs_pla = "string", rok = "number", ico = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", ktg_akce = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpps_msk = "string", ixp_den_old = "string", priz_az_def = "number", priz_gen_cis = "number", ixs_csp = "string", priz_ram_doh = "number",}
	const enum GSrvsplaDtoTypeLengths { ixs_pla = 12, ico = 10, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, cpps_msk = 13, ixp_den_old = 12, ixs_csp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GUctdrozMore.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:~*/
	interface GUctdrozMoreDto {
		/**DBCOLUMN:Seznam.uea*/
		uea: string;
		/**DBCOLUMN:Seznam.ueb*/
		ueb: string;
		/**DBCOLUMN:Seznam.uec*/
		uec: string;
		/**DBCOLUMN:Seznam.ued*/
		ued: string;
		/**DBCOLUMN:Seznam.uee*/
		uee: string;
		/**DBCOLUMN:Seznam.uef*/
		uef: string;
		/**DBCOLUMN:Seznam.ueg*/
		ueg: string;
		/**DBCOLUMN:Seznam.ueh*/
		ueh: string;
		/**DBCOLUMN:Seznam.uei*/
		uei: string;
		/**DBCOLUMN:Seznam.uej*/
		uej: string;
		/**DBCOLUMN:Seznam.te0*/
		te0: string;
		/**DBCOLUMN:Seznam.te1*/
		te1: string;
		/**DBCOLUMN:Seznam.te2*/
		te2: string;
		/**DBCOLUMN:Seznam.te3*/
		te3: string;
		/**DBCOLUMN:Seznam.te4*/
		te4: string;
		/**DBCOLUMN:Seznam.uek*/
		uek: string;
		/**DBCOLUMN:Seznam.uel*/
		uel: string;
		/**DBCOLUMN:Seznam.uem*/
		uem: string;
		/**DBCOLUMN:Seznam.uen*/
		uen: string;
		/**DBCOLUMN:Seznam.te5*/
		te5: string;
		/**DBCOLUMN:Seznam.te6*/
		te6: string;
		/**DBCOLUMN:Seznam.te7*/
		te7: string;
		/**DBCOLUMN:Seznam.te8*/
		te8: string;
		/**DBCOLUMN:Seznam.te9*/
		te9: string;
		/**DBCOLUMN:Seznam.lic*/
		lic: string;
		/**DBCOLUMN:Seznam.aktivita_uct*/
		aktivita_uct: number;
		/**DBCOLUMN:Seznam.aktivita_roz*/
		aktivita_roz: number;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka: string;
		/**DBCOLUMN:Seznam.nazev*/
		nazev: string;
		/**DBCOLUMN:Seznam.kod*/
		kod: string;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od: JsonDate;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do: JsonDate;
		/**DBCOLUMN:Seznam.uroven_kon*/
		uroven_kon: string;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena: JsonDate;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov: string;
		/**DBCOLUMN:Seznam.bupsrr*/
		bupsrr: string;
		/**DBCOLUMN:Seznam.o_uea*/
		o_uea: string;
		/**DBCOLUMN:Seznam.o_ueb*/
		o_ueb: string;
		/**DBCOLUMN:Seznam.o_uec*/
		o_uec: string;
		/**DBCOLUMN:Seznam.o_ued*/
		o_ued: string;
		/**DBCOLUMN:Seznam.o_uee*/
		o_uee: string;
		/**DBCOLUMN:Seznam.o_uef*/
		o_uef: string;
		/**DBCOLUMN:Seznam.o_ueg*/
		o_ueg: string;
		/**DBCOLUMN:Seznam.o_ueh*/
		o_ueh: string;
		/**DBCOLUMN:Seznam.o_uei*/
		o_uei: string;
		/**DBCOLUMN:Seznam.o_uej*/
		o_uej: string;
		/**DBCOLUMN:Seznam.o_te0*/
		o_te0: string;
		/**DBCOLUMN:Seznam.o_te1*/
		o_te1: string;
		/**DBCOLUMN:Seznam.o_te2*/
		o_te2: string;
		/**DBCOLUMN:Seznam.o_te3*/
		o_te3: string;
		/**DBCOLUMN:Seznam.o_te4*/
		o_te4: string;
		/**DBCOLUMN:Seznam.o_ueg*/
		o_uek: string;
		/**DBCOLUMN:Seznam.o_ueh*/
		o_uel: string;
		/**DBCOLUMN:Seznam.o_uei*/
		o_uem: string;
		/**DBCOLUMN:Seznam.o_uej*/
		o_uen: string;
		/**DBCOLUMN:Seznam.o_te0*/
		o_te5: string;
		/**DBCOLUMN:Seznam.o_te1*/
		o_te6: string;
		/**DBCOLUMN:Seznam.o_te2*/
		o_te7: string;
		/**DBCOLUMN:Seznam.o_te3*/
		o_te8: string;
		/**DBCOLUMN:Seznam.o_te4*/
		o_te9: string;
		/**DBCOLUMN:Seznam.ixs_indir*/
		ixs_indir: string;
		/**DBCOLUMN:Seznam.exp_cmd*/
		exp_cmd: string;
		/**DBCOLUMN:Seznam.exp_stav*/
		exp_stav: number;
		/**DBCOLUMN:Seznam.zd*/
		zd: number;
		/**DBCOLUMN:Seznam.priz_nekumul*/
		priz_nekumul: number;
		/**DBCOLUMN:Seznam.uroven_ginis*/
		uroven_ginis: string;
		/**DBCOLUMN:Seznam.poradi*/
		poradi: number;
		/**DBCOLUMN:Seznam.zmenu_prov_txt*/
		zmenu_prov_txt: string;
		/**DBCOLUMN:Seznam.xuete*/
		xuete: string;
		/**DBCOLUMN:Seznam.ixs_roz*/
		ixs_roz: string;
		/**DBCOLUMN:Seznam.zd_exp*/
		zd_exp: string;
		/**DBCOLUMN:Seznam.uroven_dos*/
		uroven_dos: string;
		/**DBCOLUMN:Seznam.uroven_num*/
		uroven_num: number;
		/**DBCOLUMN:Seznam.soubor*/
		soubor: string;
		/**DBCOLUMN:Seznam.popis*/
		popis: string;
	}
	const enum GUctdrozMoreDtoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", lic = "lic", aktivita_uct = "aktivita_uct", aktivita_roz = "aktivita_roz", zkratka = "zkratka", nazev = "nazev", kod = "kod", dat_od = "dat_od", dat_do = "dat_do", uroven_kon = "uroven_kon", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", bupsrr = "bupsrr", o_uea = "o_uea", o_ueb = "o_ueb", o_uec = "o_uec", o_ued = "o_ued", o_uee = "o_uee", o_uef = "o_uef", o_ueg = "o_ueg", o_ueh = "o_ueh", o_uei = "o_uei", o_uej = "o_uej", o_te0 = "o_te0", o_te1 = "o_te1", o_te2 = "o_te2", o_te3 = "o_te3", o_te4 = "o_te4", o_uek = "o_uek", o_uel = "o_uel", o_uem = "o_uem", o_uen = "o_uen", o_te5 = "o_te5", o_te6 = "o_te6", o_te7 = "o_te7", o_te8 = "o_te8", o_te9 = "o_te9", ixs_indir = "ixs_indir", exp_cmd = "exp_cmd", exp_stav = "exp_stav", zd = "zd", priz_nekumul = "priz_nekumul", uroven_ginis = "uroven_ginis", poradi = "poradi", zmenu_prov_txt = "zmenu_prov_txt", xuete = "xuete", ixs_roz = "ixs_roz", zd_exp = "zd_exp", uroven_dos = "uroven_dos", uroven_num = "uroven_num", soubor = "soubor", popis = "popis",}
	const enum GUctdrozMoreDtoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", lic = "*", aktivita_uct = "*", aktivita_roz = "*", zkratka = "*", nazev = "*", kod = "*", dat_od = "*", dat_do = "*", uroven_kon = "*", dat_zmena = "*", zmenu_prov = "*", bupsrr = "*", o_uea = "*", o_ueb = "*", o_uec = "*", o_ued = "*", o_uee = "*", o_uef = "*", o_ueg = "*", o_ueh = "*", o_uei = "*", o_uej = "*", o_te0 = "*", o_te1 = "*", o_te2 = "*", o_te3 = "*", o_te4 = "*", o_uek = "*", o_uel = "*", o_uem = "*", o_uen = "*", o_te5 = "*", o_te6 = "*", o_te7 = "*", o_te8 = "*", o_te9 = "*", ixs_indir = "*", exp_cmd = "*", exp_stav = "*", zd = "*", priz_nekumul = "*", uroven_ginis = "*", poradi = "*", zmenu_prov_txt = "*", xuete = "*", ixs_roz = "*", zd_exp = "*", uroven_dos = "*", uroven_num = "*", soubor = "*", popis = "*",}
	const enum GUctdrozMoreDtoTypes { uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", lic = "string", aktivita_uct = "number", aktivita_roz = "number", zkratka = "string", nazev = "string", kod = "string", dat_od = "JsonDate", dat_do = "JsonDate", uroven_kon = "string", dat_zmena = "JsonDate", zmenu_prov = "string", bupsrr = "string", o_uea = "string", o_ueb = "string", o_uec = "string", o_ued = "string", o_uee = "string", o_uef = "string", o_ueg = "string", o_ueh = "string", o_uei = "string", o_uej = "string", o_te0 = "string", o_te1 = "string", o_te2 = "string", o_te3 = "string", o_te4 = "string", o_uek = "string", o_uel = "string", o_uem = "string", o_uen = "string", o_te5 = "string", o_te6 = "string", o_te7 = "string", o_te8 = "string", o_te9 = "string", ixs_indir = "string", exp_cmd = "string", exp_stav = "number", zd = "number", priz_nekumul = "number", uroven_ginis = "string", poradi = "number", zmenu_prov_txt = "string", xuete = "string", ixs_roz = "string", zd_exp = "string", uroven_dos = "string", uroven_num = "number", soubor = "string", popis = "string",}
	const enum GUctdrozMoreDtoTypeLengths { lic = 4, zkratka = 16, nazev = 50, kod = 30, uroven_kon = 1, bupsrr = 6, ixs_indir = 12, exp_cmd = 1, zmenu_prov_txt = 50, xuete = 148, ixs_roz = 12, zd_exp = 2,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GUctdtra.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctdtraDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uea_reg*/
		uea_reg?: string|null;
		/**DBCOLUMN:Seznam.ueb_reg*/
		ueb_reg?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
	}
	const enum GUctdtraDtoNames { ico = "ico", ucs = "ucs", uea_reg = "uea_reg", ueb_reg = "ueb_reg", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis = "popis",}
	const enum GUctdtraDtoFragments { ico = "*", ucs = "*", uea_reg = "*", ueb_reg = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", popis = "*",}
	const enum GUctdtraDtoTypes { ico = "string", ucs = "string", uea_reg = "string", ueb_reg = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", popis = "string",}
	const enum GUctdtraDtoTypeLengths { ico = 10, ucs = 10, uea_reg = 3, ueb_reg = 4, zmenu_prov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GUcthroz.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUcthrozDto {
		/**DBCOLUMN:Seznam.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:Seznam.ixs_roz*/
		ixs_roz?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.uroven_kon*/
		uroven_kon?: string|null;
		/**DBCOLUMN:Seznam.aktivita_uct_o*/
		aktivita_uct_o?: number|null;
		/**DBCOLUMN:Seznam.aktivita_uct_n*/
		aktivita_uct_n?: number|null;
		/**DBCOLUMN:Seznam.aktivita_roz_o*/
		aktivita_roz_o?: number|null;
		/**DBCOLUMN:Seznam.aktivita_roz_n*/
		aktivita_roz_n?: number|null;
		/**DBCOLUMN:Seznam.zkratka_o*/
		zkratka_o?: string|null;
		/**DBCOLUMN:Seznam.zkratka_n*/
		zkratka_n?: string|null;
		/**DBCOLUMN:Seznam.nazev_o*/
		nazev_o?: string|null;
		/**DBCOLUMN:Seznam.nazev_n*/
		nazev_n?: string|null;
		/**DBCOLUMN:Seznam.kod_o*/
		kod_o?: string|null;
		/**DBCOLUMN:Seznam.kod_n*/
		kod_n?: string|null;
		/**DBCOLUMN:Seznam.dat_od_o*/
		dat_od_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_od_n*/
		dat_od_n?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do_o*/
		dat_do_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do_n*/
		dat_do_n?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_o*/
		dat_zmena_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_n*/
		dat_zmena_n?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov_o*/
		zmenu_prov_o?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov_n*/
		zmenu_prov_n?: string|null;
		/**DBCOLUMN:Seznam.bupsrr_o*/
		bupsrr_o?: string|null;
		/**DBCOLUMN:Seznam.bupsrr_n*/
		bupsrr_n?: string|null;
		/**DBCOLUMN:Seznam.o_uea_o*/
		o_uea_o?: string|null;
		/**DBCOLUMN:Seznam.o_uea_n*/
		o_uea_n?: string|null;
		/**DBCOLUMN:Seznam.o_ueb_o*/
		o_ueb_o?: string|null;
		/**DBCOLUMN:Seznam.o_ueb_n*/
		o_ueb_n?: string|null;
		/**DBCOLUMN:Seznam.o_uec_o*/
		o_uec_o?: string|null;
		/**DBCOLUMN:Seznam.o_uec_n*/
		o_uec_n?: string|null;
		/**DBCOLUMN:Seznam.o_ued_o*/
		o_ued_o?: string|null;
		/**DBCOLUMN:Seznam.o_ued_n*/
		o_ued_n?: string|null;
		/**DBCOLUMN:Seznam.o_uee_o*/
		o_uee_o?: string|null;
		/**DBCOLUMN:Seznam.o_uee_n*/
		o_uee_n?: string|null;
		/**DBCOLUMN:Seznam.o_uef_o*/
		o_uef_o?: string|null;
		/**DBCOLUMN:Seznam.o_uef_n*/
		o_uef_n?: string|null;
		/**DBCOLUMN:Seznam.o_ueg_o*/
		o_ueg_o?: string|null;
		/**DBCOLUMN:Seznam.o_ueg_n*/
		o_ueg_n?: string|null;
		/**DBCOLUMN:Seznam.o_ueh_o*/
		o_ueh_o?: string|null;
		/**DBCOLUMN:Seznam.o_ueh_n*/
		o_ueh_n?: string|null;
		/**DBCOLUMN:Seznam.o_uei_o*/
		o_uei_o?: string|null;
		/**DBCOLUMN:Seznam.o_uei_n*/
		o_uei_n?: string|null;
		/**DBCOLUMN:Seznam.o_uej_o*/
		o_uej_o?: string|null;
		/**DBCOLUMN:Seznam.o_uej_n*/
		o_uej_n?: string|null;
		/**DBCOLUMN:Seznam.o_te0_o*/
		o_te0_o?: string|null;
		/**DBCOLUMN:Seznam.o_te0_n*/
		o_te0_n?: string|null;
		/**DBCOLUMN:Seznam.o_te1_o*/
		o_te1_o?: string|null;
		/**DBCOLUMN:Seznam.o_te1_n*/
		o_te1_n?: string|null;
		/**DBCOLUMN:Seznam.o_te2_o*/
		o_te2_o?: string|null;
		/**DBCOLUMN:Seznam.o_te2_n*/
		o_te2_n?: string|null;
		/**DBCOLUMN:Seznam.o_te3_o*/
		o_te3_o?: string|null;
		/**DBCOLUMN:Seznam.o_te3_n*/
		o_te3_n?: string|null;
		/**DBCOLUMN:Seznam.o_te4_o*/
		o_te4_o?: string|null;
		/**DBCOLUMN:Seznam.o_te4_n*/
		o_te4_n?: string|null;
		/**DBCOLUMN:Seznam.o_uek_o*/
		o_uek_o?: string|null;
		/**DBCOLUMN:Seznam.o_uek_n*/
		o_uek_n?: string|null;
		/**DBCOLUMN:Seznam.o_uel_o*/
		o_uel_o?: string|null;
		/**DBCOLUMN:Seznam.o_uel_n*/
		o_uel_n?: string|null;
		/**DBCOLUMN:Seznam.o_uem_o*/
		o_uem_o?: string|null;
		/**DBCOLUMN:Seznam.o_uem_n*/
		o_uem_n?: string|null;
		/**DBCOLUMN:Seznam.o_uen_o*/
		o_uen_o?: string|null;
		/**DBCOLUMN:Seznam.o_uen_n*/
		o_uen_n?: string|null;
		/**DBCOLUMN:Seznam.o_te5_o*/
		o_te5_o?: string|null;
		/**DBCOLUMN:Seznam.o_te5_n*/
		o_te5_n?: string|null;
		/**DBCOLUMN:Seznam.o_te6_o*/
		o_te6_o?: string|null;
		/**DBCOLUMN:Seznam.o_te6_n*/
		o_te6_n?: string|null;
		/**DBCOLUMN:Seznam.o_te7_o*/
		o_te7_o?: string|null;
		/**DBCOLUMN:Seznam.o_te7_n*/
		o_te7_n?: string|null;
		/**DBCOLUMN:Seznam.o_te8_o*/
		o_te8_o?: string|null;
		/**DBCOLUMN:Seznam.o_te8_n*/
		o_te8_n?: string|null;
		/**DBCOLUMN:Seznam.o_te9_o*/
		o_te9_o?: string|null;
		/**DBCOLUMN:Seznam.o_te9_n*/
		o_te9_n?: string|null;
		/**DBCOLUMN:Seznam.ixs_indir_o*/
		ixs_indir_o?: string|null;
		/**DBCOLUMN:Seznam.ixs_indir_n*/
		ixs_indir_n?: string|null;
		/**DBCOLUMN:Seznam.exp_cmd_o*/
		exp_cmd_o?: string|null;
		/**DBCOLUMN:Seznam.exp_cmd_n*/
		exp_cmd_n?: string|null;
		/**DBCOLUMN:Seznam.exp_stav_o*/
		exp_stav_o?: number|null;
		/**DBCOLUMN:Seznam.exp_stav_n*/
		exp_stav_n?: number|null;
		/**DBCOLUMN:Seznam.zd_o*/
		zd_o?: number|null;
		/**DBCOLUMN:Seznam.zd_n*/
		zd_n?: number|null;
		/**DBCOLUMN:Seznam.priz_nekumul_o*/
		priz_nekumul_o?: number|null;
		/**DBCOLUMN:Seznam.priz_nekumul_n*/
		priz_nekumul_n?: number|null;
		/**DBCOLUMN:Seznam.uroven_ginis*/
		uroven_ginis?: string|null;
		/**DBCOLUMN:Seznam.uroven_dos*/
		uroven_dos?: string|null;
		/**DBCOLUMN:Seznam.uroven_num*/
		uroven_num?: number|null;
		/**DBCOLUMN:Seznam.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:Seznam.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:Seznam.soubor_o*/
		soubor_o?: string|null;
		/**DBCOLUMN:Seznam.soubor_n*/
		soubor_n?: string|null;
		/**DBCOLUMN:Seznam.popis_o*/
		popis_o?: string|null;
		/**DBCOLUMN:Seznam.popis_n*/
		popis_n?: string|null;
	}
	const enum GUcthrozDtoNames { xuete = "xuete", ixs_roz = "ixs_roz", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", lic = "lic", uroven_kon = "uroven_kon", aktivita_uct_o = "aktivita_uct_o", aktivita_uct_n = "aktivita_uct_n", aktivita_roz_o = "aktivita_roz_o", aktivita_roz_n = "aktivita_roz_n", zkratka_o = "zkratka_o", zkratka_n = "zkratka_n", nazev_o = "nazev_o", nazev_n = "nazev_n", kod_o = "kod_o", kod_n = "kod_n", dat_od_o = "dat_od_o", dat_od_n = "dat_od_n", dat_do_o = "dat_do_o", dat_do_n = "dat_do_n", dat_zmena_o = "dat_zmena_o", dat_zmena_n = "dat_zmena_n", zmenu_prov_o = "zmenu_prov_o", zmenu_prov_n = "zmenu_prov_n", bupsrr_o = "bupsrr_o", bupsrr_n = "bupsrr_n", o_uea_o = "o_uea_o", o_uea_n = "o_uea_n", o_ueb_o = "o_ueb_o", o_ueb_n = "o_ueb_n", o_uec_o = "o_uec_o", o_uec_n = "o_uec_n", o_ued_o = "o_ued_o", o_ued_n = "o_ued_n", o_uee_o = "o_uee_o", o_uee_n = "o_uee_n", o_uef_o = "o_uef_o", o_uef_n = "o_uef_n", o_ueg_o = "o_ueg_o", o_ueg_n = "o_ueg_n", o_ueh_o = "o_ueh_o", o_ueh_n = "o_ueh_n", o_uei_o = "o_uei_o", o_uei_n = "o_uei_n", o_uej_o = "o_uej_o", o_uej_n = "o_uej_n", o_te0_o = "o_te0_o", o_te0_n = "o_te0_n", o_te1_o = "o_te1_o", o_te1_n = "o_te1_n", o_te2_o = "o_te2_o", o_te2_n = "o_te2_n", o_te3_o = "o_te3_o", o_te3_n = "o_te3_n", o_te4_o = "o_te4_o", o_te4_n = "o_te4_n", o_uek_o = "o_uek_o", o_uek_n = "o_uek_n", o_uel_o = "o_uel_o", o_uel_n = "o_uel_n", o_uem_o = "o_uem_o", o_uem_n = "o_uem_n", o_uen_o = "o_uen_o", o_uen_n = "o_uen_n", o_te5_o = "o_te5_o", o_te5_n = "o_te5_n", o_te6_o = "o_te6_o", o_te6_n = "o_te6_n", o_te7_o = "o_te7_o", o_te7_n = "o_te7_n", o_te8_o = "o_te8_o", o_te8_n = "o_te8_n", o_te9_o = "o_te9_o", o_te9_n = "o_te9_n", ixs_indir_o = "ixs_indir_o", ixs_indir_n = "ixs_indir_n", exp_cmd_o = "exp_cmd_o", exp_cmd_n = "exp_cmd_n", exp_stav_o = "exp_stav_o", exp_stav_n = "exp_stav_n", zd_o = "zd_o", zd_n = "zd_n", priz_nekumul_o = "priz_nekumul_o", priz_nekumul_n = "priz_nekumul_n", uroven_ginis = "uroven_ginis", uroven_dos = "uroven_dos", uroven_num = "uroven_num", poradi = "poradi", zmenu_prov_txt = "zmenu_prov_txt", soubor_o = "soubor_o", soubor_n = "soubor_n", popis_o = "popis_o", popis_n = "popis_n",}
	const enum GUcthrozDtoFragments { xuete = "*", ixs_roz = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", lic = "*", uroven_kon = "*", aktivita_uct_o = "*", aktivita_uct_n = "*", aktivita_roz_o = "*", aktivita_roz_n = "*", zkratka_o = "*", zkratka_n = "*", nazev_o = "*", nazev_n = "*", kod_o = "*", kod_n = "*", dat_od_o = "*", dat_od_n = "*", dat_do_o = "*", dat_do_n = "*", dat_zmena_o = "*", dat_zmena_n = "*", zmenu_prov_o = "*", zmenu_prov_n = "*", bupsrr_o = "*", bupsrr_n = "*", o_uea_o = "*", o_uea_n = "*", o_ueb_o = "*", o_ueb_n = "*", o_uec_o = "*", o_uec_n = "*", o_ued_o = "*", o_ued_n = "*", o_uee_o = "*", o_uee_n = "*", o_uef_o = "*", o_uef_n = "*", o_ueg_o = "*", o_ueg_n = "*", o_ueh_o = "*", o_ueh_n = "*", o_uei_o = "*", o_uei_n = "*", o_uej_o = "*", o_uej_n = "*", o_te0_o = "*", o_te0_n = "*", o_te1_o = "*", o_te1_n = "*", o_te2_o = "*", o_te2_n = "*", o_te3_o = "*", o_te3_n = "*", o_te4_o = "*", o_te4_n = "*", o_uek_o = "*", o_uek_n = "*", o_uel_o = "*", o_uel_n = "*", o_uem_o = "*", o_uem_n = "*", o_uen_o = "*", o_uen_n = "*", o_te5_o = "*", o_te5_n = "*", o_te6_o = "*", o_te6_n = "*", o_te7_o = "*", o_te7_n = "*", o_te8_o = "*", o_te8_n = "*", o_te9_o = "*", o_te9_n = "*", ixs_indir_o = "*", ixs_indir_n = "*", exp_cmd_o = "*", exp_cmd_n = "*", exp_stav_o = "*", exp_stav_n = "*", zd_o = "*", zd_n = "*", priz_nekumul_o = "*", priz_nekumul_n = "*", uroven_ginis = "*", uroven_dos = "*", uroven_num = "*", poradi = "*", zmenu_prov_txt = "*", soubor_o = "*", soubor_n = "*", popis_o = "*", popis_n = "*",}
	const enum GUcthrozDtoTypes { xuete = "string", ixs_roz = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", lic = "string", uroven_kon = "string", aktivita_uct_o = "number", aktivita_uct_n = "number", aktivita_roz_o = "number", aktivita_roz_n = "number", zkratka_o = "string", zkratka_n = "string", nazev_o = "string", nazev_n = "string", kod_o = "string", kod_n = "string", dat_od_o = "JsonDate", dat_od_n = "JsonDate", dat_do_o = "JsonDate", dat_do_n = "JsonDate", dat_zmena_o = "JsonDate", dat_zmena_n = "JsonDate", zmenu_prov_o = "string", zmenu_prov_n = "string", bupsrr_o = "string", bupsrr_n = "string", o_uea_o = "string", o_uea_n = "string", o_ueb_o = "string", o_ueb_n = "string", o_uec_o = "string", o_uec_n = "string", o_ued_o = "string", o_ued_n = "string", o_uee_o = "string", o_uee_n = "string", o_uef_o = "string", o_uef_n = "string", o_ueg_o = "string", o_ueg_n = "string", o_ueh_o = "string", o_ueh_n = "string", o_uei_o = "string", o_uei_n = "string", o_uej_o = "string", o_uej_n = "string", o_te0_o = "string", o_te0_n = "string", o_te1_o = "string", o_te1_n = "string", o_te2_o = "string", o_te2_n = "string", o_te3_o = "string", o_te3_n = "string", o_te4_o = "string", o_te4_n = "string", o_uek_o = "string", o_uek_n = "string", o_uel_o = "string", o_uel_n = "string", o_uem_o = "string", o_uem_n = "string", o_uen_o = "string", o_uen_n = "string", o_te5_o = "string", o_te5_n = "string", o_te6_o = "string", o_te6_n = "string", o_te7_o = "string", o_te7_n = "string", o_te8_o = "string", o_te8_n = "string", o_te9_o = "string", o_te9_n = "string", ixs_indir_o = "string", ixs_indir_n = "string", exp_cmd_o = "string", exp_cmd_n = "string", exp_stav_o = "number", exp_stav_n = "number", zd_o = "number", zd_n = "number", priz_nekumul_o = "number", priz_nekumul_n = "number", uroven_ginis = "string", uroven_dos = "string", uroven_num = "number", poradi = "number", zmenu_prov_txt = "string", soubor_o = "string", soubor_n = "string", popis_o = "string", popis_n = "string",}
	const enum GUcthrozDtoTypeLengths { xuete = 148, ixs_roz = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, lic = 4, uroven_kon = 1, zkratka_o = 16, zkratka_n = 16, nazev_o = 50, nazev_n = 50, kod_o = 30, kod_n = 30, zmenu_prov_o = 12, zmenu_prov_n = 12, bupsrr_o = 6, bupsrr_n = 6, o_uea_o = 3, o_uea_n = 3, o_ueb_o = 4, o_ueb_n = 4, o_uec_o = 12, o_uec_n = 12, o_ued_o = 12, o_ued_n = 12, o_uee_o = 12, o_uee_n = 12, o_uef_o = 3, o_uef_n = 3, o_ueg_o = 16, o_ueg_n = 16, o_ueh_o = 4, o_ueh_n = 4, o_uei_o = 4, o_uei_n = 4, o_uej_o = 12, o_uej_n = 12, o_te0_o = 16, o_te0_n = 16, o_te1_o = 16, o_te1_n = 16, o_te2_o = 16, o_te2_n = 16, o_te3_o = 6, o_te3_n = 6, o_te4_o = 12, o_te4_n = 12, ixs_indir_o = 12, ixs_indir_n = 12, exp_cmd_o = 1, exp_cmd_n = 1, popis_o = 254, popis_n = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\DataSets\GUctvrozNZ.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctvrozNZDto {
		/**DBCOLUMN:Seznam.ixs_roz*/
		ixs_roz?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**Nážev rozvrhu*/
		nazevRozvrh?: string|null;
		/**Zkratka rozvrhu*/
		zkratkaRozvrh?: string|null;
		/**Poznámka rozvrhu*/
		poznamkaRozvrh?: string|null;
	}
	const enum GUctvrozNZDtoNames { ixs_roz = "ixs_roz", ico = "ico", ucs = "ucs", rok = "rok", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", zkratka = "zkratka", nazevRozvrh = "nazevRozvrh", zkratkaRozvrh = "zkratkaRozvrh", poznamkaRozvrh = "poznamkaRozvrh",}
	const enum GUctvrozNZDtoFragments { ixs_roz = "*", ico = "*", ucs = "*", rok = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", zkratka = "*", nazevRozvrh = "*", zkratkaRozvrh = "*", poznamkaRozvrh = "*",}
	const enum GUctvrozNZDtoTypes { ixs_roz = "string", ico = "string", ucs = "string", rok = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", zkratka = "string", nazevRozvrh = "string", zkratkaRozvrh = "string", poznamkaRozvrh = "string",}
	const enum GUctvrozNZDtoTypeLengths { ixs_roz = 12, ico = 10, ucs = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\DavkaDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto expanderovych davek*/
	interface DavkaDto {
		/**DBCOLUMN:Seznam.dat_od*/
		dat_zmena?: JsonDate|null;
		/**typ*/
		typ?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**ixs_rci*/
		ixs_rci?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**ixs_indir*/
		ixs_indir?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
	}
	const enum DavkaDtoNames { dat_zmena = "dat_zmena", typ = "typ", nazev = "nazev", ixs_rci = "ixs_rci", nazev_rf = "nazev_rf", ixs_indir = "ixs_indir", dat_od = "dat_od", dat_do = "dat_do",}
	const enum DavkaDtoFragments { dat_zmena = "*", typ = "*", nazev = "*", ixs_rci = "*", nazev_rf = "*", ixs_indir = "*", dat_od = "*", dat_do = "*",}
	const enum DavkaDtoTypes { dat_zmena = "JsonDate", typ = "string", nazev = "string", ixs_rci = "string", nazev_rf = "string", ixs_indir = "string", dat_od = "JsonDate", dat_do = "JsonDate",}
	const enum DavkaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GCfs.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	interface GCfsDto {
		uctyVyjimekDto?: Gordic.Eko.Interface.GEkodsaxDto[]|null;
		detailyVyjimekDto?: Gordic.Eko.Interface.GEkosvaxDto[]|null;
		ixs_sax?: string|null;
		detailyVyjimekDictDto?: any|null;
	}
	const enum GCfsDtoNames { uctyVyjimekDto = "uctyVyjimekDto", detailyVyjimekDto = "detailyVyjimekDto", ixs_sax = "ixs_sax", detailyVyjimekDictDto = "detailyVyjimekDictDto",}
	const enum GCfsDtoFragments { uctyVyjimekDto = "*", detailyVyjimekDto = "*", ixs_sax = "*", detailyVyjimekDictDto = "*",}
	const enum GCfsDtoTypes { uctyVyjimekDto = "Gordic.Eko.Interface.GEkodsaxDto[]", detailyVyjimekDto = "Gordic.Eko.Interface.GEkosvaxDto[]", ixs_sax = "string", detailyVyjimekDictDto = "any",}
	const enum GCfsDtoTypeLengths {}
	/**DBTABLE:~*/
	interface GEkosvaxDto {
		/**DBCOLUMN:Ekosvax.ixs_sax*/
		id?: string|null;
		/**DBCOLUMN:Ekosvax.vyjimka*/
		vyjimka?: number|null;
		/**DBCOLUMN:Ekosvax.uroven*/
		uroven?: number|null;
		/**DBCOLUMN:Ekosvax.uea*/
		uea?: string|null;
		/**DBCOLUMN:Ekosvax.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Ekosvax.uec*/
		uec?: string|null;
		/**DBCOLUMN:Ekosvax.ued*/
		ued?: string|null;
		/**DBCOLUMN:Ekosvax.uee*/
		uee?: string|null;
		/**DBCOLUMN:Ekosvax.uef*/
		uef?: string|null;
		/**DBCOLUMN:Ekosvax.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Ekosvax.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Ekosvax.uei*/
		uei?: string|null;
		/**DBCOLUMN:Ekosvax.uej*/
		uej?: string|null;
		/**DBCOLUMN:Ekosvax.te0*/
		te0?: string|null;
		/**DBCOLUMN:Ekosvax.te1*/
		te1?: string|null;
		/**DBCOLUMN:Ekosvax.te2*/
		te2?: string|null;
		/**DBCOLUMN:Ekosvax.te3*/
		te3?: string|null;
		/**DBCOLUMN:Ekosvax.te4*/
		te4?: string|null;
		/**DBCOLUMN:Ekosvax.ueg*/
		uek?: string|null;
		/**DBCOLUMN:Ekosvax.ueh*/
		uel?: string|null;
		/**DBCOLUMN:Ekosvax.uei*/
		uem?: string|null;
		/**DBCOLUMN:Ekosvax.uej*/
		uen?: string|null;
		/**DBCOLUMN:Ekosvax.te0*/
		te5?: string|null;
		/**DBCOLUMN:Ekosvax.te1*/
		te6?: string|null;
		/**DBCOLUMN:Ekosvax.te2*/
		te7?: string|null;
		/**DBCOLUMN:Ekosvax.te3*/
		te8?: string|null;
		/**DBCOLUMN:Ekosvax.te4*/
		te9?: string|null;
		/**DBCOLUMN:Ekosvax.uroven_poriz*/
		uroven_poriz?: string|null;
		/**DBCOLUMN:Ekosvax.kontrola_poriz*/
		kontrola_poriz?: number|null;
		/**DBCOLUMN:Ekosvax.kontrola_kch*/
		kontrola_kch?: number|null;
		/**DBCOLUMN:Ekosvax.kontrola_ext*/
		kontrola_ext?: number|null;
		/**DBCOLUMN:Ekosvax.uroven_opr*/
		uroven_opr?: string|null;
	}
	const enum GEkosvaxDtoNames { id = "id", vyjimka = "vyjimka", uroven = "uroven", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uroven_poriz = "uroven_poriz", kontrola_poriz = "kontrola_poriz", kontrola_kch = "kontrola_kch", kontrola_ext = "kontrola_ext", uroven_opr = "uroven_opr",}
	const enum GEkosvaxDtoFragments { id = "*", vyjimka = "*", uroven = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uroven_poriz = "*", kontrola_poriz = "*", kontrola_kch = "*", kontrola_ext = "*", uroven_opr = "*",}
	const enum GEkosvaxDtoTypes { id = "string", vyjimka = "number", uroven = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uroven_poriz = "string", kontrola_poriz = "number", kontrola_kch = "number", kontrola_ext = "number", uroven_opr = "string",}
	const enum GEkosvaxDtoTypeLengths { id = 12, uroven_poriz = 1, uroven_opr = 1,}
	interface GEkovsaxDto {
		/**DBCOLUMN:Ekovsax.ixs_sax*/
		id?: string|null;
		/**DBCOLUMN:Ekovsax.vyjimka*/
		vyjimka?: number|null;
		/**DBCOLUMN:Ekovsax.popis*/
		popis?: string|null;
	}
	const enum GEkovsaxDtoNames { id = "id", vyjimka = "vyjimka", popis = "popis",}
	const enum GEkovsaxDtoFragments { id = "*", vyjimka = "*", popis = "*",}
	const enum GEkovsaxDtoTypes { id = "string", vyjimka = "number", popis = "string",}
	const enum GEkovsaxDtoTypeLengths { id = 12, popis = 254,}
	interface GEkodsaxDto {
		/**DBCOLUMN:Ekodsax.ixs_sax*/
		id?: string|null;
		/**DBCOLUMN:Ekodsax.ucet*/
		ucet?: string|null;
		/**DBCOLUMN:Ekodsax.vyjimka*/
		vyjimka?: number|null;
		/**DBCOLUMN:Ekodsax.druh_uctu*/
		druh_uctu?: number|null;
	}
	const enum GEkodsaxDtoNames { id = "id", ucet = "ucet", vyjimka = "vyjimka", druh_uctu = "druh_uctu",}
	const enum GEkodsaxDtoFragments { id = "*", ucet = "*", vyjimka = "*", druh_uctu = "*",}
	const enum GEkodsaxDtoTypes { id = "string", ucet = "string", vyjimka = "number", druh_uctu = "number",}
	const enum GEkodsaxDtoTypeLengths { id = 12, ucet = 7,}
	interface GWordUsageDto {
	}
	const enum GWordUsageDtoNames {}
	const enum GWordUsageDtoFragments {}
	const enum GWordUsageDtoTypes {}
	const enum GWordUsageDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GEkodgdtDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:ekodgdt*/
	interface GEkodgdtDto {
		/**DBCOLUMN:ekodgdt.gdc*/
		gdc?: number|null;
		/**DBCOLUMN:ekodgdt.kod_gdc*/
		kod_gdc?: number|null;
		/**DBCOLUMN:ekodgdt.naduroven*/
		naduroven?: number|null;
		/**DBCOLUMN:ekodgdt.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ekodgdt.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekodgdt.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekodgdt.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekodgdt.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekodgdt.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekodgdt.kod_gdc_nad*/
		kod_gdc_nad?: number|null;
		/**id - pro tree processor*/
		id?: string|null;
		/**id_nad - pro tree processor*/
		id_nad?: string|null;
		/**rokmes_od - jenom u ročních hodnot*/
		rokmes_od?: string|null;
		/**rokmes_do - jenom u ročních hodnot*/
		rokmes_do?: string|null;
	}
	const enum GEkodgdtDtoNames { gdc = "gdc", kod_gdc = "kod_gdc", naduroven = "naduroven", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_gdc_nad = "kod_gdc_nad", id = "id", id_nad = "id_nad", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do",}
	const enum GEkodgdtDtoFragments { gdc = "*", kod_gdc = "*", naduroven = "*", zkratka = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kod_gdc_nad = "*", id = "*", id_nad = "*", rokmes_od = "*", rokmes_do = "*",}
	const enum GEkodgdtDtoTypes { gdc = "number", kod_gdc = "number", naduroven = "number", zkratka = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_gdc_nad = "number", id = "string", id_nad = "string", rokmes_od = "string", rokmes_do = "string",}
	const enum GEkodgdtDtoTypeLengths { zkratka = 50, nazev = 255, poznamka = 255, zmenu_prov = 12, id = 56, id_nad = 56, rokmes_od = 6, rokmes_do = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GEkodrci.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkodrciDto {
		/**DBCOLUMN:Seznam.ixs_rci*/
		ixs_rci?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.uete_prc*/
		uete_prc?: string|null;
		/**DBCOLUMN:Seznam.zkratka_prc*/
		zkratka_prc?: string|null;
		/**DBCOLUMN:Seznam.nazev_prc*/
		nazev_prc?: string|null;
		/**DBCOLUMN:Seznam.s_akt_rzv*/
		s_akt_rzv?: number|null;
		/**DBCOLUMN:Seznam.dat_akt_rzv*/
		dat_akt_rzv?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_synch_sc*/
		dat_synch_sc?: JsonDate|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Nazev_ref*/
		nazev_ref?: string|null;
	}
	const enum GEkodrciDtoNames { ixs_rci = "ixs_rci", rok = "rok", uete_prc = "uete_prc", zkratka_prc = "zkratka_prc", nazev_prc = "nazev_prc", s_akt_rzv = "s_akt_rzv", dat_akt_rzv = "dat_akt_rzv", dat_synch_sc = "dat_synch_sc", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref",}
	const enum GEkodrciDtoFragments { ixs_rci = "*", rok = "*", uete_prc = "*", zkratka_prc = "*", nazev_prc = "*", s_akt_rzv = "*", dat_akt_rzv = "*", dat_synch_sc = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*",}
	const enum GEkodrciDtoTypes { ixs_rci = "string", rok = "number", uete_prc = "string", zkratka_prc = "string", nazev_prc = "string", s_akt_rzv = "number", dat_akt_rzv = "JsonDate", dat_synch_sc = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string",}
	const enum GEkodrciDtoTypeLengths { ixs_rci = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GEkosico.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosicoDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.cfu*/
		cfu?: string|null;
	}
	const enum GEkosicoDtoNames { ico = "ico", typ_org = "typ_org", nazev = "nazev", ixs_esu = "ixs_esu", cfu = "cfu",}
	const enum GEkosicoDtoFragments { ico = "*", typ_org = "*", nazev = "*", ixs_esu = "*", cfu = "*",}
	const enum GEkosicoDtoTypes { ico = "string", typ_org = "number", nazev = "string", ixs_esu = "string", cfu = "string",}
	const enum GEkosicoDtoTypeLengths { ico = 10, nazev = 100, ixs_esu = 12, cfu = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GEkosmsr.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosmsrDto {
		/**Rok*/
		rok?: number|null;
		/**IČO*/
		ico?: string|null;
		/**UCS*/
		ucs?: string|null;
		/**Hodnota dolní hranice intervalu řídící úrovně 1*/
		uetex_od?: string|null;
		/**Hodnota horní hranice intervalu řídící úrovně 1*/
		uetex_do?: string|null;
		/**vlastní maska slova*/
		te0_msk?: string|null;
		/**vlastní maska slova*/
		te1_msk?: string|null;
		/**vlastní maska slova*/
		te2_msk?: string|null;
		/**vlastní maska slova*/
		te3_msk?: string|null;
		/**vlastní maska slova*/
		te4_msk?: string|null;
		/**vlastní maska slova*/
		te5_msk?: string|null;
		/**vlastní maska slova*/
		te6_msk?: string|null;
		/**vlastní maska slova*/
		te7_msk?: string|null;
		/**vlastní maska slova*/
		te8_msk?: string|null;
		/**vlastní maska slova*/
		te9_msk?: string|null;
		/**vlastní maska slova*/
		uea_msk?: string|null;
		/**vlastní maska slova*/
		ueb_msk?: string|null;
		/**vlastní maska slova*/
		uec_msk?: string|null;
		/**vlastní maska slova*/
		ued_msk?: string|null;
		/**vlastní maska slova*/
		uee_msk?: string|null;
		/**vlastní maska slova*/
		uef_msk?: string|null;
		/**vlastní maska slova*/
		ueg_msk?: string|null;
		/**vlastní maska slova*/
		ueh_msk?: string|null;
		/**vlastní maska slova*/
		uei_msk?: string|null;
		/**vlastní maska slova*/
		uej_msk?: string|null;
		/**vlastní maska slova*/
		uek_msk?: string|null;
		/**vlastní maska slova*/
		uel_msk?: string|null;
		/**vlastní maska slova*/
		uem_msk?: string|null;
		/**vlastní maska slova*/
		uen_msk?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Změnu proved*/
		zmenu_prov?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Maska nákladového střediska*/
		nks_msk?: string|null;
		/**Hodnota dolní hranice intervalu řídící úrovně 2*/
		uetex2_od?: string|null;
		/**Hodnota horní hranice intervalu řídící úrovně 2*/
		uetex2_do?: string|null;
		/**Stará hodnota dolní hranice intervalu řídící úrovně 1 - nutno vyplnit v případě, že se nahrazuje starý interval novým (úprava řádku v pořizovači)*/
		uetex_od_old?: string|null;
		/**Stará hodnota horní hranice intervalu řídící úrovně 1 - nutno vyplnit v případě, že se nahrazuje starý interval novým (úprava řádku v pořizovači)*/
		uetex_do_old?: string|null;
		/**Stará hodnota dolní hranice intervalu řídící úrovně 2 - nutno vyplnit v případě, že se nahrazuje starý interval novým (úprava řádku v pořizovači)*/
		uetex2_od_old?: string|null;
		/**Stará hodnota horní hranice intervalu řídící úrovně 2 - nutno vyplnit v případě, že se nahrazuje starý interval novým (úprava řádku v pořizovači)*/
		uetex2_do_old?: string|null;
	}
	const enum GEkosmsrDtoNames { rok = "rok", ico = "ico", ucs = "ucs", uetex_od = "uetex_od", uetex_do = "uetex_do", te0_msk = "te0_msk", te1_msk = "te1_msk", te2_msk = "te2_msk", te3_msk = "te3_msk", te4_msk = "te4_msk", te5_msk = "te5_msk", te6_msk = "te6_msk", te7_msk = "te7_msk", te8_msk = "te8_msk", te9_msk = "te9_msk", uea_msk = "uea_msk", ueb_msk = "ueb_msk", uec_msk = "uec_msk", ued_msk = "ued_msk", uee_msk = "uee_msk", uef_msk = "uef_msk", ueg_msk = "ueg_msk", ueh_msk = "ueh_msk", uei_msk = "uei_msk", uej_msk = "uej_msk", uek_msk = "uek_msk", uel_msk = "uel_msk", uem_msk = "uem_msk", uen_msk = "uen_msk", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", nks_msk = "nks_msk", uetex2_od = "uetex2_od", uetex2_do = "uetex2_do", uetex_od_old = "uetex_od_old", uetex_do_old = "uetex_do_old", uetex2_od_old = "uetex2_od_old", uetex2_do_old = "uetex2_do_old",}
	const enum GEkosmsrDtoFragments { rok = "*", ico = "*", ucs = "*", uetex_od = "*", uetex_do = "*", te0_msk = "*", te1_msk = "*", te2_msk = "*", te3_msk = "*", te4_msk = "*", te5_msk = "*", te6_msk = "*", te7_msk = "*", te8_msk = "*", te9_msk = "*", uea_msk = "*", ueb_msk = "*", uec_msk = "*", ued_msk = "*", uee_msk = "*", uef_msk = "*", ueg_msk = "*", ueh_msk = "*", uei_msk = "*", uej_msk = "*", uek_msk = "*", uel_msk = "*", uem_msk = "*", uen_msk = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*", nks_msk = "*", uetex2_od = "*", uetex2_do = "*", uetex_od_old = "*", uetex_do_old = "*", uetex2_od_old = "*", uetex2_do_old = "*",}
	const enum GEkosmsrDtoTypes { rok = "number", ico = "string", ucs = "string", uetex_od = "string", uetex_do = "string", te0_msk = "string", te1_msk = "string", te2_msk = "string", te3_msk = "string", te4_msk = "string", te5_msk = "string", te6_msk = "string", te7_msk = "string", te8_msk = "string", te9_msk = "string", uea_msk = "string", ueb_msk = "string", uec_msk = "string", ued_msk = "string", uee_msk = "string", uef_msk = "string", ueg_msk = "string", ueh_msk = "string", uei_msk = "string", uej_msk = "string", uek_msk = "string", uel_msk = "string", uem_msk = "string", uen_msk = "string", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", nks_msk = "string", uetex2_od = "string", uetex2_do = "string", uetex_od_old = "string", uetex_do_old = "string", uetex2_od_old = "string", uetex2_do_old = "string",}
	const enum GEkosmsrDtoTypeLengths { ico = 10, ucs = 10, uetex_od = 16, uetex_do = 16, zmenu_prov = 12, nks_msk = 12, uetex2_od = 16, uetex2_do = 16, uetex_od_old = 16, uetex_do_old = 16, uetex2_od_old = 16, uetex2_do_old = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GEkossgx.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkossgxDto {
		/**DBCOLUMN:Seznam.ktg_sax*/
		ktg_sax?: string|null;
		/**DBCOLUMN:Seznam.verze_ktg_sax*/
		verze_ktg_sax?: string|null;
		/**DBCOLUMN:Seznam.ixs_sgx*/
		ixs_sgx?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**Rok - není v tabulce ekossgx*/
		rok?: number|null;
		/**CFU - není v tabulce ekossgx*/
		cfu?: string|null;
	}
	const enum GEkossgxDtoNames { ktg_sax = "ktg_sax", verze_ktg_sax = "verze_ktg_sax", ixs_sgx = "ixs_sgx", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", rok = "rok", cfu = "cfu",}
	const enum GEkossgxDtoFragments { ktg_sax = "*", verze_ktg_sax = "*", ixs_sgx = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", zkratka = "*", poznamka = "*", rok = "*", cfu = "*",}
	const enum GEkossgxDtoTypes { ktg_sax = "string", verze_ktg_sax = "string", ixs_sgx = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", zkratka = "string", poznamka = "string", rok = "number", cfu = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GEkosucsHRDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:ekosucs*/
	interface GEkosucsHRDto {
		/**DBCOLUMN:ekosucs.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:ekosucs.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekosucs.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosucs.zkratka*/
		zkratka?: string|null;
		/**1...ucs je v danem roce platne, 0...neni platne*/
		platnost?: number|null;
		/**1...ucs je v danem roce navazano na rozvrh, 0...neni navazano na rozvrh*/
		navazano?: number|null;
		/**Řídící úroveň hloubky rezervace*/
		uroven?: string|null;
		/**Druhá řídící úroveň hloubky rezervace*/
		uroven2?: string|null;
	}
	const enum GEkosucsHRDtoNames { ucs = "ucs", poznamka = "poznamka", nazev = "nazev", zkratka = "zkratka", platnost = "platnost", navazano = "navazano", uroven = "uroven", uroven2 = "uroven2",}
	const enum GEkosucsHRDtoFragments { ucs = "*", poznamka = "*", nazev = "*", zkratka = "*", platnost = "*", navazano = "*", uroven = "*", uroven2 = "*",}
	const enum GEkosucsHRDtoTypes { ucs = "string", poznamka = "string", nazev = "string", zkratka = "string", platnost = "number", navazano = "number", uroven = "string", uroven2 = "string",}
	const enum GEkosucsHRDtoTypeLengths { ucs = 10, poznamka = 50, nazev = 50, zkratka = 16, uroven = 1, uroven2 = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GRozvrhImportInputDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Vstupní DTO pro import rozvrhu*/
	interface GRozvrhImportInputDto {
		/**fileInfo*/
		fileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**množina ixs_roz*/
		ixs_rozy?: string[]|null;
		/**množina názvů rozvrhu*/
		nazvy_rozvrhu?: string[]|null;
	}
	const enum GRozvrhImportInputDtoNames { fileInfo = "fileInfo", ixs_rozy = "ixs_rozy", nazvy_rozvrhu = "nazvy_rozvrhu",}
	const enum GRozvrhImportInputDtoFragments { fileInfo = "*", ixs_rozy = "*", nazvy_rozvrhu = "*",}
	const enum GRozvrhImportInputDtoTypes { fileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", ixs_rozy = "string[]", nazvy_rozvrhu = "string[]",}
	const enum GRozvrhImportInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GRozvrhImportOutputDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Výstupní DTO pro import rozvrhu*/
	interface GRozvrhImportOutputDto {
		/**Expanderové dávky*/
		ixsIndirs?: string[]|null;
		/**Rozvrhy*/
		ixs_rozy?: string[]|null;
		/**Jméno souboru - expanderové dávky, která byla načtena*/
		fileName?: string|null;
		/**množina názvů rozvrhu*/
		nazvy_rozvrhu?: string[]|null;
	}
	const enum GRozvrhImportOutputDtoNames { ixsIndirs = "ixsIndirs", ixs_rozy = "ixs_rozy", fileName = "fileName", nazvy_rozvrhu = "nazvy_rozvrhu",}
	const enum GRozvrhImportOutputDtoFragments { ixsIndirs = "*", ixs_rozy = "*", fileName = "*", nazvy_rozvrhu = "*",}
	const enum GRozvrhImportOutputDtoTypes { ixsIndirs = "string[]", ixs_rozy = "string[]", fileName = "string", nazvy_rozvrhu = "string[]",}
	const enum GRozvrhImportOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GSrvOpenDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**SRV Open*/
	interface GSrvOpenDto {
		Ico?: string|null;
		IcoPopis?: string|null;
		/**Rok*/
		Rok?: number|null;
		Cfu?: string|null;
		/**Kopírovat administrační data z předchozího období?*/
		KopieAdm?: boolean|null;
		/**Z jakého roku kopírovat administrační data*/
		RokPrevKopieAdm?: number|null;
		/**Kopírovat data požadavků z předchozího období*/
		KopiePoz?: boolean|null;
		/**Deaktivace požadavků*/
		DeaktivacePoz?: boolean|null;
		/**Z jakého roku kopírovat data požadavků*/
		RokPrevKopiePoz?: number|null;
		/**Kopírovat akce s financováním v otevíraném období*/
		KopieAkc?: boolean|null;
		/**Z jakého roku kopírovat akce s financováním*/
		RokPrevKopieAkce?: number|null;
		/**pocet zaznamu v tabulce srvsmsa*/
		PocetSmsa?: number|null;
		/**Maska*/
		SmsAval?: string|null;
		Pocetekosobd?: number|null;
		Pocetscfu?: number|null;
		PocetscfuPrev?: number|null;
		IxsRoz?: string|null;
		IxsPlaNew?: string|null;
		/**Jde o období sběru?*/
		RokBalanc?: boolean|null;
	}
	const enum GSrvOpenDtoNames { Ico = "Ico", IcoPopis = "IcoPopis", Rok = "Rok", Cfu = "Cfu", KopieAdm = "KopieAdm", RokPrevKopieAdm = "RokPrevKopieAdm", KopiePoz = "KopiePoz", DeaktivacePoz = "DeaktivacePoz", RokPrevKopiePoz = "RokPrevKopiePoz", KopieAkc = "KopieAkc", RokPrevKopieAkce = "RokPrevKopieAkce", PocetSmsa = "PocetSmsa", SmsAval = "SmsAval", Pocetekosobd = "Pocetekosobd", Pocetscfu = "Pocetscfu", PocetscfuPrev = "PocetscfuPrev", IxsRoz = "IxsRoz", IxsPlaNew = "IxsPlaNew", RokBalanc = "RokBalanc",}
	const enum GSrvOpenDtoFragments { Ico = "*", IcoPopis = "*", Rok = "*", Cfu = "*", KopieAdm = "*", RokPrevKopieAdm = "*", KopiePoz = "*", DeaktivacePoz = "*", RokPrevKopiePoz = "*", KopieAkc = "*", RokPrevKopieAkce = "*", PocetSmsa = "*", SmsAval = "*", Pocetekosobd = "*", Pocetscfu = "*", PocetscfuPrev = "*", IxsRoz = "*", IxsPlaNew = "*", RokBalanc = "*",}
	const enum GSrvOpenDtoTypes { Ico = "string", IcoPopis = "string", Rok = "number", Cfu = "string", KopieAdm = "boolean", RokPrevKopieAdm = "number", KopiePoz = "boolean", DeaktivacePoz = "boolean", RokPrevKopiePoz = "number", KopieAkc = "boolean", RokPrevKopieAkce = "number", PocetSmsa = "number", SmsAval = "string", Pocetekosobd = "number", Pocetscfu = "number", PocetscfuPrev = "number", IxsRoz = "string", IxsPlaNew = "string", RokBalanc = "boolean",}
	const enum GSrvOpenDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\GUctsrozDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Hlavička rozvrhu*/
	interface GUctsrozDto {
		/**DBCOLUMN:Seznam.ixs_roz*/
		ixs_roz?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.arw*/
		arw?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.typ_rzv*/
		typ_rzv?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.R*/
		R?: string|null;
		/**DBCOLUMN:Seznam.B*/
		B?: string|null;
		/**DBCOLUMN:Seznam.V*/
		V?: string|null;
		/**Referenční rozvrh pro textování sestav*/
		R_bool?: boolean|null;
		/**Rozvrh pro víceleté změnové řízení*/
		B_bool?: boolean|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**Seznam.ixs_roz - zdrojový rozvrh v ekoopen*/
		ixs_roz_zdroj?: string|null;
		/**DBCOLUMN:Seznam.zkratka - zdrojový rozvrh v ekoopen*/
		zkratka_zdroj?: string|null;
		/**DBCOLUMN:Seznam.nazev - zdrojový rozvrh v ekoopen*/
		nazev_zdroj?: string|null;
	}
	const enum GUctsrozDtoNames { ixs_roz = "ixs_roz", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", typ_rzv = "typ_rzv", rok = "rok", R = "R", B = "B", V = "V", R_bool = "R_bool", B_bool = "B_bool", ico = "ico", ixs_roz_zdroj = "ixs_roz_zdroj", zkratka_zdroj = "zkratka_zdroj", nazev_zdroj = "nazev_zdroj",}
	const enum GUctsrozDtoFragments { ixs_roz = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", typ_rzv = "*", rok = "*", R = "*", B = "*", V = "*", R_bool = "*", B_bool = "*", ico = "*", ixs_roz_zdroj = "*", zkratka_zdroj = "*", nazev_zdroj = "*",}
	const enum GUctsrozDtoTypes { ixs_roz = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", typ_rzv = "string", rok = "number", R = "string", B = "string", V = "string", R_bool = "boolean", B_bool = "boolean", ico = "string", ixs_roz_zdroj = "string", zkratka_zdroj = "string", nazev_zdroj = "string",}
	const enum GUctsrozDtoTypeLengths { ixs_roz = 12, lic = 4, poznamka = 50, zmenu_prov = 12, zkratka = 16, nazev = 50, typ_rzv = 12, R = 12, B = 12, V = 12, ico = 10, ixs_roz_zdroj = 12, zkratka_zdroj = 16, nazev_zdroj = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\RozvrhDavkaDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto pro zobrazení proběhlých expanderových dávek v jednotlivých rozvrzích*/
	interface RozvrhDavkaDto {
		/**ixs_roz*/
		ixs_roz?: string|null;
		/**ixs_indir*/
		ixs_indir?: string|null;
	}
	const enum RozvrhDavkaDtoNames { ixs_roz = "ixs_roz", ixs_indir = "ixs_indir",}
	const enum RozvrhDavkaDtoFragments { ixs_roz = "*", ixs_indir = "*",}
	const enum RozvrhDavkaDtoTypes { ixs_roz = "string", ixs_indir = "string",}
	const enum RozvrhDavkaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\VyjimkyDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto expanderovych davek*/
	interface VyjimkyDto {
		/**vyjimka*/
		vyjimka?: number|null;
		/**ucty*/
		ucty?: string|null;
	}
	const enum VyjimkyDtoNames { vyjimka = "vyjimka", ucty = "ucty",}
	const enum VyjimkyDtoFragments { vyjimka = "*", ucty = "*",}
	const enum VyjimkyDtoTypes { vyjimka = "number", ucty = "string",}
	const enum VyjimkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GCfsVyjimkaFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter seznamu vyjimek*/
	interface GCfsVyjimkaFilterDto {
		/**ixs_sgx*/
		ixs_sgx?: string|null;
	}
	const enum GCfsVyjimkaFilterDtoNames { ixs_sgx = "ixs_sgx",}
	const enum GCfsVyjimkaFilterDtoFragments { ixs_sgx = "*",}
	const enum GCfsVyjimkaFilterDtoTypes { ixs_sgx = "string",}
	const enum GCfsVyjimkaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GCfuKonfiguraceFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter cfu konfigurace*/
	interface GCfuKonfiguraceFilterDto {
		/**cfu*/
		cfu?: string|null;
	}
	const enum GCfuKonfiguraceFilterDtoNames { cfu = "cfu",}
	const enum GCfuKonfiguraceFilterDtoFragments { cfu = "*",}
	const enum GCfuKonfiguraceFilterDtoTypes { cfu = "string",}
	const enum GCfuKonfiguraceFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GDcfuKonfiguraceFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter dcfu konfigurace*/
	interface GDcfuKonfiguraceFilterDto {
		/**cfu*/
		cfu?: string|null;
		/**rok*/
		rok?: number|null;
		/**urovenNum*/
		urovenNum?: number|null;
	}
	const enum GDcfuKonfiguraceFilterDtoNames { cfu = "cfu", rok = "rok", urovenNum = "urovenNum",}
	const enum GDcfuKonfiguraceFilterDtoFragments { cfu = "*", rok = "*", urovenNum = "*",}
	const enum GDcfuKonfiguraceFilterDtoTypes { cfu = "string", rok = "number", urovenNum = "number",}
	const enum GDcfuKonfiguraceFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GDoplnkovyUdajFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - doplňkové údaje*/
	interface GDoplnkovyUdajFilterDto {
		/**aktivita*/
		aktivita?: number|null;
		/**pridruzene_ueaReg*/
		pridruzene_ueaReg?: string|null;
		/**pridruzene_uebReg*/
		pridruzene_uebReg?: string|null;
		/**druh_sud*/
		druh_sud?: number|null;
	}
	const enum GDoplnkovyUdajFilterDtoNames { aktivita = "aktivita", pridruzene_ueaReg = "pridruzene_ueaReg", pridruzene_uebReg = "pridruzene_uebReg", druh_sud = "druh_sud",}
	const enum GDoplnkovyUdajFilterDtoFragments { aktivita = "*", pridruzene_ueaReg = "*", pridruzene_uebReg = "*", druh_sud = "*",}
	const enum GDoplnkovyUdajFilterDtoTypes { aktivita = "number", pridruzene_ueaReg = "string", pridruzene_uebReg = "string", druh_sud = "number",}
	const enum GDoplnkovyUdajFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GEmptyFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Globální číselník*/
	interface GGlobalniCiselnikFilterDto {
	}
	const enum GGlobalniCiselnikFilterDtoNames {}
	const enum GGlobalniCiselnikFilterDtoFragments {}
	const enum GGlobalniCiselnikFilterDtoTypes {}
	const enum GGlobalniCiselnikFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GFilterHloubkaRezervaceDto.d.ts 

declare namespace Gordic.Eko.Interface {
    /**Filter hloubky rezervace*/
	interface GHloubkaRezervaceFilterDto {
        /**ucs*/
		ucs?: string|null;
	}
	const enum GHloubkaRezervaceFilterDtoNames { ucs = "ucs",}
	const enum GHloubkaRezervaceFilterDtoFragments { ucs = "*",}
	const enum GHloubkaRezervaceFilterDtoTypes { ucs = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GHloubkaRezervaceUcsFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter ucs s úrovněmi hloubky rezervace*/
	interface GHloubkaRezervaceUcsFilterDto {
		/**pouzePlatna*/
		pouzePlatna?: boolean|null;
	}
	const enum GHloubkaRezervaceUcsFilterDtoNames { pouzePlatna = "pouzePlatna",}
	const enum GHloubkaRezervaceUcsFilterDtoFragments { pouzePlatna = "*",}
	const enum GHloubkaRezervaceUcsFilterDtoTypes { pouzePlatna = "boolean",}
	const enum GHloubkaRezervaceUcsFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GKombinaceSuAuFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Rozšířené vlastnosti seznam kombinací SU AU*/
	interface GKombinaceSuAuFilterDto {
		/**uea*/
		uea?: string|null;
		/**ueb*/
		ueb?: string|null;
		/**rok_od*/
		rokOd?: number|null;
		/**rok_do*/
		rokDo?: number|null;
	}
	const enum GKombinaceSuAuFilterDtoNames { uea = "uea", ueb = "ueb", rokOd = "rokOd", rokDo = "rokDo",}
	const enum GKombinaceSuAuFilterDtoFragments { uea = "*", ueb = "*", rokOd = "*", rokDo = "*",}
	const enum GKombinaceSuAuFilterDtoTypes { uea = "string", ueb = "string", rokOd = "number", rokDo = "number",}
	const enum GKombinaceSuAuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GKombinaceSuAuRegFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - SU AU reg*/
	interface GKombinaceSuAuRegFilterDto {
	}
	const enum GKombinaceSuAuRegFilterDtoNames {}
	const enum GKombinaceSuAuRegFilterDtoFragments {}
	const enum GKombinaceSuAuRegFilterDtoTypes {}
	const enum GKombinaceSuAuRegFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GOmezeniPristupuFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter omezení přístupu k účtům*/
	interface GOmezeniPristupuFilterDto {
		/**ucs*/
		ucs?: string|null;
	}
	const enum GOmezeniPristupuFilterDtoNames { ucs = "ucs",}
	const enum GOmezeniPristupuFilterDtoFragments { ucs = "*",}
	const enum GOmezeniPristupuFilterDtoTypes { ucs = "string",}
	const enum GOmezeniPristupuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GPolozkaGlobalnihoCiselnikuFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter položek globálního číselníku*/
	interface GPolozkaGlobalnihoCiselnikuFilterDto {
		/**gdc*/
		gdc?: number|null;
		/**Nadúroveň*/
		naduroven?: number|null;
		/**Identifikátor položky číselníku*/
		kod_gdc?: number|null;
		/**Zkratka*/
		zkratka?: string|null;
	}
	const enum GPolozkaGlobalnihoCiselnikuFilterDtoNames { gdc = "gdc", naduroven = "naduroven", kod_gdc = "kod_gdc", zkratka = "zkratka",}
	const enum GPolozkaGlobalnihoCiselnikuFilterDtoFragments { gdc = "*", naduroven = "*", kod_gdc = "*", zkratka = "*",}
	const enum GPolozkaGlobalnihoCiselnikuFilterDtoTypes { gdc = "number", naduroven = "number", kod_gdc = "number", zkratka = "string",}
	const enum GPolozkaGlobalnihoCiselnikuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozsirenaVlastnostFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - strukturované vlastnosti SU AU*/
	interface GRozsirenaVlastnostFilterDto {
		/**uea*/
		uea_reg?: string|null;
		/**ueb*/
		ueb_reg?: string|null;
		/**druh_sud*/
		druh_sud?: number|null;
		/**ma_default*/
		ma_default?: boolean|null;
		/**včetně zrušených (aktivita 900)*/
		iZrusene?: boolean|null;
	}
	const enum GRozsirenaVlastnostFilterDtoNames { uea_reg = "uea_reg", ueb_reg = "ueb_reg", druh_sud = "druh_sud", ma_default = "ma_default", iZrusene = "iZrusene",}
	const enum GRozsirenaVlastnostFilterDtoFragments { uea_reg = "*", ueb_reg = "*", druh_sud = "*", ma_default = "*", iZrusene = "*",}
	const enum GRozsirenaVlastnostFilterDtoTypes { uea_reg = "string", ueb_reg = "string", druh_sud = "number", ma_default = "boolean", iZrusene = "boolean",}
	const enum GRozsirenaVlastnostFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter řádků rozvrhu*/
	interface GRozvrhFilterDto {
		/**pouze rozvrhy navázané v jakémkoliv roce na jakékoliv nks/ ucs*/
		pouzeNavazane?: boolean|null;
		/**rok*/
		rok?: boolean|null;
		/**ucsNks*/
		ucsNks?: boolean|null;
		/**ixsRozArr*/
		ixs_roz?: string[]|null;
	}
	const enum GRozvrhFilterDtoNames { pouzeNavazane = "pouzeNavazane", rok = "rok", ucsNks = "ucsNks", ixs_roz = "ixs_roz",}
	const enum GRozvrhFilterDtoFragments { pouzeNavazane = "*", rok = "*", ucsNks = "*", ixs_roz = "*",}
	const enum GRozvrhFilterDtoTypes { pouzeNavazane = "boolean", rok = "boolean", ucsNks = "boolean", ixs_roz = "string[]",}
	const enum GRozvrhFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhovyCiselnikFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Rozvrhové číselníky*/
	interface GRozvrhovyCiselnikFilterDto {
		/**maxDelka*/
		maxDelka?: number|null;
	}
	const enum GRozvrhovyCiselnikFilterDtoNames { maxDelka = "maxDelka",}
	const enum GRozvrhovyCiselnikFilterDtoFragments { maxDelka = "*",}
	const enum GRozvrhovyCiselnikFilterDtoTypes { maxDelka = "number",}
	const enum GRozvrhovyCiselnikFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhovyCiselnikHodnotaFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Hodnota Rozvrhového číselníku*/
	interface GRozvrhovyCiselnikHodnotaFilterDto {
		/**identifikátor číselníku*/
		ixs_rci?: string|null;
		/**Zda načíst i zrušené záznamy*/
		vcetneZrusenych?: boolean|null;
	}
	const enum GRozvrhovyCiselnikHodnotaFilterDtoNames { ixs_rci = "ixs_rci", vcetneZrusenych = "vcetneZrusenych",}
	const enum GRozvrhovyCiselnikHodnotaFilterDtoFragments { ixs_rci = "*", vcetneZrusenych = "*",}
	const enum GRozvrhovyCiselnikHodnotaFilterDtoTypes { ixs_rci = "string", vcetneZrusenych = "boolean",}
	const enum GRozvrhovyCiselnikHodnotaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhovyCiselnikVazbaFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Spravovaná vazba rozvrhového číselníku na synchronizovaný číselník*/
	interface GRozvrhovyCiselnikVazbaFilterDto {
		/**identifikátor číselníku*/
		ixs_rci?: string|null;
	}
	const enum GRozvrhovyCiselnikVazbaFilterDtoNames { ixs_rci = "ixs_rci",}
	const enum GRozvrhovyCiselnikVazbaFilterDtoFragments { ixs_rci = "*",}
	const enum GRozvrhovyCiselnikVazbaFilterDtoTypes { ixs_rci = "string",}
	const enum GRozvrhovyCiselnikVazbaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhovyCiselnikVetevFilterDto - Copy.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Práva k rozvrhovým číselníkům*/
	interface GRozvrhovyCiselnikPravaFilterDto {
		/**identifikátor číselníku*/
		ixs_rci?: string|null;
	}
	const enum GRozvrhovyCiselnikPravaFilterDtoNames { ixs_rci = "ixs_rci",}
	const enum GRozvrhovyCiselnikPravaFilterDtoFragments { ixs_rci = "*",}
	const enum GRozvrhovyCiselnikPravaFilterDtoTypes { ixs_rci = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhovyCiselnikVetevFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter pro ISL - Spravovaná větev rozvrhového číselníku*/
	interface GRozvrhovyCiselnikVetevFilterDto {
		/**identifikátor číselníku*/
		ixs_rci?: string|null;
		/**Identifikátor rozvrhu*/
		ixs_roz?: string|null;
	}
	const enum GRozvrhovyCiselnikVetevFilterDtoNames { ixs_rci = "ixs_rci", ixs_roz = "ixs_roz",}
	const enum GRozvrhovyCiselnikVetevFilterDtoFragments { ixs_rci = "*", ixs_roz = "*",}
	const enum GRozvrhovyCiselnikVetevFilterDtoTypes { ixs_rci = "string", ixs_roz = "string",}
	const enum GRozvrhovyCiselnikVetevFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhRadekFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter řádků rozvrhu*/
	interface GRozvrhRadekFilterDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**ixs_roz*/
		ixs_roz?: string|null;
		/**Poradi*/
		Poradi?: GIntervalDto<number>|null;
		/**Bupsr*/
		Bupsrr?: GIntervalDto<string>|null;
		/**Zd*/
		Zd?: GIntervalDto<number>|null;
		/**Nazev*/
		Nazev?: string|null;
		/**priznak nekumulovanosti*/
		PrizNekumul?: number|null;
		/**aktivitaUct*/
		AktivitaUct?: number|null;
		/**aktivita Roz*/
		AktivitaRoz?: number|null;
		/**Datum změny*/
		Dat_zmena?: GIntervalDto<JsonDate>|null;
		/**Změnu proved*/
		ZmenuProv?: string|null;
		/**Popis*/
		Popis?: string|null;
	}
	const enum GRozvrhRadekFilterDtoNames { ixs_roz = "ixs_roz", Poradi = "Poradi", Bupsrr = "Bupsrr", Zd = "Zd", Nazev = "Nazev", PrizNekumul = "PrizNekumul", AktivitaUct = "AktivitaUct", AktivitaRoz = "AktivitaRoz", Dat_zmena = "Dat_zmena", ZmenuProv = "ZmenuProv", Popis = "Popis", cfu = "cfu",}
	const enum GRozvrhRadekFilterDtoFragments { ixs_roz = "*", Poradi = "*", Bupsrr = "*", Zd = "*", Nazev = "*", PrizNekumul = "*", AktivitaUct = "*", AktivitaRoz = "*", Dat_zmena = "*", ZmenuProv = "*", Popis = "*", cfu = "*",}
	const enum GRozvrhRadekFilterDtoTypes { ixs_roz = "string", Poradi = "GIntervalDto<number>", Bupsrr = "GIntervalDto<string>", Zd = "GIntervalDto<number>", Nazev = "string", PrizNekumul = "number", AktivitaUct = "number", AktivitaRoz = "number", Dat_zmena = "GIntervalDto<JsonDate>", ZmenuProv = "string", Popis = "string", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GRozvrhRadekFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GRozvrhVlastnikFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filter vlastníků rozvrhu*/
	interface GRozvrhVlastnikFilterDto {
		/**ixs_roz*/
		ixs_roz?: string|null;
	}
	const enum GRozvrhVlastnikFilterDtoNames { ixs_roz = "ixs_roz",}
	const enum GRozvrhVlastnikFilterDtoFragments { ixs_roz = "*",}
	const enum GRozvrhVlastnikFilterDtoTypes { ixs_roz = "string",}
	const enum GRozvrhVlastnikFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Dto\FilterDto\GSeznamRozvrhuFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
    /**Filter řádků rozvrhu*/
	interface GRozvrhFilterDto {
        /**pouze rozvrhy navázané v jakémkoliv roce na jakékoliv nks/ ucs*/
		pouzeNavazane?: boolean|null;
        /**rok*/
		rok?: boolean|null;
        /**ucsNks*/
		ucsNks?: boolean|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Adr\Init\Dto\GAdrGlobalsDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO s podmnozinou informaci v Globals*/
	interface GAdrGlobalsDto {
		/**Úroveň přístupu (větší z uct_rzv_ins a roz_rzv_ins)*/
		urovenPristupu?: number|null;
		/**Zda je rozšířená účetní věta*/
		rozsirenaUcetniVeta?: boolean|null;
	}
	const enum GAdrGlobalsDtoNames { urovenPristupu = "urovenPristupu", rozsirenaUcetniVeta = "rozsirenaUcetniVeta",}
	const enum GAdrGlobalsDtoFragments { urovenPristupu = "*", rozsirenaUcetniVeta = "*",}
	const enum GAdrGlobalsDtoTypes { urovenPristupu = "number", rozsirenaUcetniVeta = "boolean",}
	const enum GAdrGlobalsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Akce\GEkoAgDokladyFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO na filtrovani agendovych dokladu*/
	interface GEkoAgDokladyFilterDto {
		/**DBCOLUMN:rok*/
		rok?: number|null;
		/**DBCOLUMN:ico*/
		ico?: string|null;
		/**DBCOLUMN:cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csl*/
		ixs_csl?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:rok_srv*/
		rok_srv?: number|null;
		/**DBCOLUMN:typ*/
		typ?: string|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GEkoAgDokladyFilterDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", ixs_csl = "ixs_csl", ixs_prr = "ixs_prr", rok_od = "rok_od", rok_do = "rok_do", rok_srv = "rok_srv", typ = "typ", cis_real = "cis_real", ixs_pla = "ixs_pla", aktivita = "aktivita",}
	const enum GEkoAgDokladyFilterDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_cia = "*", ixs_csl = "*", ixs_prr = "*", rok_od = "*", rok_do = "*", rok_srv = "*", typ = "*", cis_real = "*", ixs_pla = "*", aktivita = "*",}
	const enum GEkoAgDokladyFilterDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", ixs_csl = "string", ixs_prr = "string", rok_od = "number", rok_do = "number", rok_srv = "number", typ = "string", cis_real = "string", ixs_pla = "string", aktivita = "GBaseFilter<number>",}
	const enum GEkoAgDokladyFilterDtoTypeLengths { ico = 10, cislo = 12, ixs_cia = 12, ixs_csl = 12, ixs_prr = 12, typ = 3, ixs_pla = 12,}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilEkoDokladyAg {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_cia*/
		ixs_cia,
		/**ixs_csl*/
		ixs_csl,
		/**ixs_pla*/
		ixs_pla,
		/**ixs_prr*/
		ixs_prr,
		/**rok_od*/
		rok_od,
		/**rok_do*/
		rok_do,
		/**rok_srv*/
		rok_srv,
		/**typ*/
		typ,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Akce\GEkoAkceDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Testovaci verze Detailu dokladu DTO*/
	interface GEkoAkceDto {
		/**DBCOLUMN:SeznamDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladu.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ*/
		typ?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_txt*/
		typ_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.adresa1*/
		adresa1?: string|null;
		/**DBCOLUMN:SeznamDokladu.adresa2*/
		adresa2?: string|null;
		/**DBCOLUMN:SeznamDokladu.psc*/
		psc?: string|null;
		/**DBCOLUMN:SeznamDokladu.adresa3*/
		adresa3?: string|null;
		/**DBCOLUMN:SeznamDokladu.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:SeznamDokladu.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:SeznamDokladu.real_od*/
		real_od?: number|null;
		/**DBCOLUMN:SeznamDokladu.real_do*/
		real_do?: number|null;
		/**DBCOLUMN:SeznamDokladujmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:SeznamDokladu.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:SeznamDokladu.os_cislo*/
		os_cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.telefon*/
		telefon?: string|null;
		/**DBCOLUMN:SeznamDokladu.upresneni*/
		upresneni?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamDokladu.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ktg_akce*/
		ktg_akce?: number|null;
		/**DBCOLUMN:SeznamDokladu.skp_akc*/
		skp_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akc*/
		psk_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.skp_akc*/
		skp_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akc*/
		psk_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamDokladu.aktivita_s*/
		aktivita_s?: string|null;
		/**DBCOLUMN:SeznamDokladu.stav_real*/
		stav_real?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_real_txt*/
		stav_real_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:SeznamDokladu.mandatar*/
		mandatar?: string|null;
		/**DBCOLUMN:SeznamDokladu.t_nks*/
		t_nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.xpf_pf*/
		xpf_pf?: string|null;
		/**DBCOLUMN:SeznamDokladu.zad*/
		zad?: string|null;
		/**DBCOLUMN:SeznamDokladu.cevid*/
		cevid?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpp*/
		cpp?: string|null;
		/**DBCOLUMN:SeznamDokladu.chp*/
		chp?: string|null;
		/**DBCOLUMN:SeznamDokladu.cip*/
		cip?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_nato*/
		c_nato?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_ipf*/
		c_ipf?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.cpps01*/
		cpps01?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps02*/
		cpps02?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps03*/
		cpps03?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps04*/
		cpps04?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps05*/
		cpps05?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla_txt*/
		ixs_pla_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.mj*/
		mj?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_pd*/
		c_pd?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.cislo_pd*/
		cislo_pd?: string|null;
		/**DBCOLUMN:SeznamDokladu.xpf_nato*/
		xpf_nato?: string|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamDokladu.prij_dot*/
		prij_dot?: string|null;
		/**DBCOLUMN:SeznamDokladu.skp*/
		skp?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_nazev*/
		ixs_fun_akt_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_nazev_ref*/
		ixs_fun_akt_nazev_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_az*/
		ixs_fun_az?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_az_nazev*/
		ixs_fun_az_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_az_nazev_ref*/
		ixs_fun_az_nazev_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_zad*/
		ixs_fun_zad?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_zad_nazev*/
		ixs_fun_zad_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_sro_az*/
		ixs_sro_az?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_vzb*/
		typ_vzb?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_vzb_txt*/
		typ_vzb_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.priz_az*/
		priz_az?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_az*/
		stav_az?: number|null;
		/**DBCOLUMN:SeznamDokladu.priz_az_txt*/
		stav_az_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_akce_sum*/
		typ_akce_sum?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_akce_sum_txt*/
		typ_akce_sum_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.stav_inp*/
		stav_inp?: number|null;
		/**DBCOLUMN:SeznamDokladu.priz_az_b*/
		priz_az_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.stav_inp_b*/
		stav_inp_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_az_s*/
		priz_az_s?: string|null;
		/**DBCOLUMN:SeznamDokladu.stav_inp_s*/
		stav_inp_s?: string|null;
		/**DBCOLUMN:SeznamDokladu.pocet_kompetentu*/
		pocet_kompetentu?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_isp*/
		pocet_isp?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_dtzd*/
		pocet_dtzd?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_rozpis*/
		pocet_rozpis?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_priloh*/
		pocet_priloh?: number|null;
		/**DBCOLUMN:SeznamDokladu.c_kc*/
		c_kc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_0*/
		c_0?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_1*/
		c_1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2*/
		c_2?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_3*/
		c_3?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_4*/
		c_4?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_6*/
		c_6?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_7*/
		c_7?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_8*/
		c_8?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_9*/
		c_9?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_10*/
		c_10?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_11*/
		c_11?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_12*/
		c_12?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_13*/
		c_13?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_14*/
		c_14?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_15*/
		c_15?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_16*/
		c_16?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_17*/
		c_17?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_18*/
		c_18?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_21*/
		c_21?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_23*/
		c_23?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_25*/
		c_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_34*/
		c_34?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_54*/
		c_54?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_66*/
		c_66?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2_3_7_8*/
		c_2_3_7_8?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_23_25*/
		c_23_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2_3_7_8_23_25*/
		c_2_3_7_8_23_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2_3_7_8_23_25_14_34_54*/
		c_2_3_7_8_23_25_14_34_54?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_6_18*/
		c_6_18?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_10_11*/
		c_10_11?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_15_16_17*/
		c_15_16_17?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		c_zbyva_nasmlouvat?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_cerpat*/
		c_zbyva_cerpat?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**DBCOLUMN:SeznamDokladu.new_rok*/
		new_rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_pla*/
		new_ixs_pla?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_cislo*/
		new_cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_fun_akt*/
		new_ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_aktivita*/
		new_aktivita?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_stav_real*/
		new_stav_real?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_stav_az*/
		new_stav_az?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_typ*/
		new_typ?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csl*/
		ixs_csl?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csp*/
		ixs_csp?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr_txt*/
		ixs_prr_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_prr*/
		new_ixs_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_tri*/
		ixs_tri?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_tri_txt*/
		ixs_tri_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_tri_prr*/
		new_tri_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.priz_ram_doh*/
		priz_ram_doh?: number|null;
		/**DBCOLUMN:SeznamDokladu.priz_ram_doh_b*/
		priz_ram_doh_b?: boolean|null;
		/**Permissions*/
		Permissions?: Gordic.Eko.Interface.GEkoAkcePermissions|null;
		/**Navigacni vlastnost pro Vlastnosti*/
		Vlastnost?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Navigacni vlastnost pro Vlastnika (ixs_fun_akt)*/
		Vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**DBCOLUMN:SeznamDokladu.pocet_kompetentu_ja*/
		pocet_kompetentu_ja?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_prr*/
		pocet_prr?: number|null;
		/**JsemKompetent*/
		JsemKompetent?: boolean|null;
		/**JsemKompetentAZ*/
		JsemKompetentAZ?: boolean|null;
		/**mazat_kompetenty*/
		mazat_kompetenty?: boolean|null;
		/**new _kompetenti*/
		new_kompetenti?: Gordic.Eko.Interface.GEkoKompetentiAkceDto[]|null;
		/**DBCOLUMN:SeznamDokladu.prev_nazev_skp*/
		prev_nazev_skp?: string|null;
		/**DBCOLUMN:SeznamDokladu.prev_nazev_psk*/
		prev_nazev_psk?: string|null;
		/**ControlsSystemAggregated*/
		ControlsSystemAggregated?: Gordic.Gin.Interface.GControlsSystemAggregatedDto|null;
		/**vlastnictvi*/
		vlastnictvi?: number|null;
	}
	const enum GEkoAkceDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", nazev = "nazev", typ = "typ", typ_txt = "typ_txt", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", upresneni = "upresneni", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ktg_akce = "ktg_akce", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", aktivita = "aktivita", aktivita_s = "aktivita_s", stav_real = "stav_real", stav_real_txt = "stav_real_txt", inv_cis = "inv_cis", mandatar = "mandatar", t_nks = "t_nks", nks = "nks", xpf_pf = "xpf_pf", zad = "zad", cevid = "cevid", cpp = "cpp", chp = "chp", cip = "cip", c_nato = "c_nato", c_ipf = "c_ipf", cpps01 = "cpps01", cpps02 = "cpps02", cpps03 = "cpps03", cpps04 = "cpps04", cpps05 = "cpps05", ixs_pla = "ixs_pla", ixs_pla_txt = "ixs_pla_txt", mj = "mj", c_pd = "c_pd", cislo_pd = "cislo_pd", xpf_nato = "xpf_nato", cis_real = "cis_real", prij_dot = "prij_dot", skp = "skp", c_celk = "c_celk", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_nazev = "ixs_fun_akt_nazev", ixs_fun_akt_nazev_ref = "ixs_fun_akt_nazev_ref", ixs_fun_az = "ixs_fun_az", ixs_fun_az_nazev = "ixs_fun_az_nazev", ixs_fun_az_nazev_ref = "ixs_fun_az_nazev_ref", ucs = "ucs", ixs_fun_zad = "ixs_fun_zad", ixs_fun_zad_nazev = "ixs_fun_zad_nazev", ixs_sro_az = "ixs_sro_az", typ_vzb = "typ_vzb", typ_vzb_txt = "typ_vzb_txt", dat_mpd = "dat_mpd", priz_az = "priz_az", stav_az = "stav_az", stav_az_txt = "stav_az_txt", typ_akce_sum = "typ_akce_sum", typ_akce_sum_txt = "typ_akce_sum_txt", stav_inp = "stav_inp", priz_az_b = "priz_az_b", stav_inp_b = "stav_inp_b", priz_az_s = "priz_az_s", stav_inp_s = "stav_inp_s", pocet_kompetentu = "pocet_kompetentu", pocet_isp = "pocet_isp", pocet_dtzd = "pocet_dtzd", pocet_rozpis = "pocet_rozpis", pocet_priloh = "pocet_priloh", c_kc = "c_kc", c_0 = "c_0", c_1 = "c_1", c_2 = "c_2", c_3 = "c_3", c_4 = "c_4", c_6 = "c_6", c_7 = "c_7", c_8 = "c_8", c_9 = "c_9", c_10 = "c_10", c_11 = "c_11", c_12 = "c_12", c_13 = "c_13", c_14 = "c_14", c_15 = "c_15", c_16 = "c_16", c_17 = "c_17", c_18 = "c_18", c_21 = "c_21", c_23 = "c_23", c_25 = "c_25", c_34 = "c_34", c_54 = "c_54", c_66 = "c_66", c_2_3_7_8 = "c_2_3_7_8", c_23_25 = "c_23_25", c_2_3_7_8_23_25 = "c_2_3_7_8_23_25", c_2_3_7_8_23_25_14_34_54 = "c_2_3_7_8_23_25_14_34_54", c_6_18 = "c_6_18", c_10_11 = "c_10_11", c_15_16_17 = "c_15_16_17", c_zbyva_nasmlouvat = "c_zbyva_nasmlouvat", c_zbyva_cerpat = "c_zbyva_cerpat", vlastnosti = "vlastnosti", new_rok = "new_rok", new_ixs_pla = "new_ixs_pla", new_cislo = "new_cislo", new_ixs_fun_akt = "new_ixs_fun_akt", new_aktivita = "new_aktivita", new_stav_real = "new_stav_real", new_stav_az = "new_stav_az", new_typ = "new_typ", ixs_csl = "ixs_csl", ixs_csp = "ixs_csp", ixs_prr = "ixs_prr", ixs_prr_txt = "ixs_prr_txt", new_ixs_prr = "new_ixs_prr", ixs_tri = "ixs_tri", ixs_tri_txt = "ixs_tri_txt", new_tri_prr = "new_tri_prr", priz_ram_doh = "priz_ram_doh", priz_ram_doh_b = "priz_ram_doh_b", Permissions = "Permissions", Vlastnost = "Vlastnost", Vlastnik = "Vlastnik", pocet_kompetentu_ja = "pocet_kompetentu_ja", pocet_prr = "pocet_prr", JsemKompetent = "JsemKompetent", JsemKompetentAZ = "JsemKompetentAZ", mazat_kompetenty = "mazat_kompetenty", new_kompetenti = "new_kompetenti", prev_nazev_skp = "prev_nazev_skp", prev_nazev_psk = "prev_nazev_psk", ControlsSystemAggregated = "ControlsSystemAggregated", vlastnictvi = "vlastnictvi",}
	const enum GEkoAkceDtoFragments { rok = "main", ico = "main", cislo = "main", ixs_cia = "main", nazev = "main", typ = "main", typ_txt = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", upresneni = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main", ktg_akce = "main", skp_akce = "main", psk_akce = "main", skp_akc = "main", psk_akc = "main", aktivita = "main", aktivita_s = "main", stav_real = "main", stav_real_txt = "main", inv_cis = "main", mandatar = "main", t_nks = "main", nks = "main", xpf_pf = "main", zad = "main", cevid = "main", cpp = "main", chp = "main", cip = "main", c_nato = "main", c_ipf = "main", cpps01 = "main", cpps02 = "main", cpps03 = "main", cpps04 = "main", cpps05 = "main", ixs_pla = "main", ixs_pla_txt = "main", mj = "main", c_pd = "main", cislo_pd = "main", xpf_nato = "main", cis_real = "main", prij_dot = "main", skp = "main", c_celk = "main", ixs_fun_akt = "main", ixs_fun_akt_nazev = "main", ixs_fun_akt_nazev_ref = "main", ixs_fun_az = "main", ixs_fun_az_nazev = "main", ixs_fun_az_nazev_ref = "main", ucs = "main", ixs_fun_zad = "main", ixs_fun_zad_nazev = "main", ixs_sro_az = "main", typ_vzb = "main", typ_vzb_txt = "main", dat_mpd = "main", priz_az = "main", stav_az = "main", stav_az_txt = "main", typ_akce_sum = "main", typ_akce_sum_txt = "main", stav_inp = "main", priz_az_b = "main", stav_inp_b = "main", priz_az_s = "main", stav_inp_s = "main", pocet_kompetentu = "main", pocet_isp = "main", pocet_dtzd = "main", pocet_rozpis = "main", pocet_priloh = "main", c_kc = "main", c_0 = "main", c_1 = "main", c_2 = "main", c_3 = "main", c_4 = "main", c_6 = "main", c_7 = "main", c_8 = "main", c_9 = "main", c_10 = "main", c_11 = "main", c_12 = "main", c_13 = "main", c_14 = "main", c_15 = "main", c_16 = "main", c_17 = "main", c_18 = "main", c_21 = "main", c_23 = "main", c_25 = "main", c_34 = "main", c_54 = "main", c_66 = "main", c_2_3_7_8 = "main", c_23_25 = "main", c_2_3_7_8_23_25 = "main", c_2_3_7_8_23_25_14_34_54 = "main", c_6_18 = "main", c_10_11 = "main", c_15_16_17 = "main", c_zbyva_nasmlouvat = "main", c_zbyva_cerpat = "main", vlastnosti = "main", new_rok = "main", new_ixs_pla = "main", new_cislo = "main", new_ixs_fun_akt = "main", new_aktivita = "main", new_stav_real = "main", new_stav_az = "main", new_typ = "main", ixs_csl = "main", ixs_csp = "main", ixs_prr = "main", ixs_prr_txt = "main", new_ixs_prr = "main", ixs_tri = "main", ixs_tri_txt = "main", new_tri_prr = "main", priz_ram_doh = "main", priz_ram_doh_b = "main", Permissions = "main", Vlastnost = "main", Vlastnik = "main", pocet_kompetentu_ja = "main", pocet_prr = "main", JsemKompetent = "main", JsemKompetentAZ = "main", mazat_kompetenty = "main", new_kompetenti = "main", prev_nazev_skp = "main", prev_nazev_psk = "main", ControlsSystemAggregated = "DSG_FRAGMENT", vlastnictvi = "*",}
	const enum GEkoAkceDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", nazev = "string", typ = "number", typ_txt = "string", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", upresneni = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ktg_akce = "number", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", aktivita = "number", aktivita_s = "string", stav_real = "number", stav_real_txt = "string", inv_cis = "string", mandatar = "string", t_nks = "string", nks = "string", xpf_pf = "string", zad = "string", cevid = "string", cpp = "string", chp = "string", cip = "string", c_nato = "JsonDecimal", c_ipf = "JsonDecimal", cpps01 = "string", cpps02 = "string", cpps03 = "string", cpps04 = "string", cpps05 = "string", ixs_pla = "string", ixs_pla_txt = "string", mj = "string", c_pd = "JsonDecimal", cislo_pd = "string", xpf_nato = "string", cis_real = "string", prij_dot = "string", skp = "string", c_celk = "JsonDecimal", ixs_fun_akt = "string", ixs_fun_akt_nazev = "string", ixs_fun_akt_nazev_ref = "string", ixs_fun_az = "string", ixs_fun_az_nazev = "string", ixs_fun_az_nazev_ref = "string", ucs = "string", ixs_fun_zad = "string", ixs_fun_zad_nazev = "string", ixs_sro_az = "string", typ_vzb = "number", typ_vzb_txt = "string", dat_mpd = "JsonDate", priz_az = "number", stav_az = "number", stav_az_txt = "string", typ_akce_sum = "number", typ_akce_sum_txt = "string", stav_inp = "number", priz_az_b = "boolean", stav_inp_b = "boolean", priz_az_s = "string", stav_inp_s = "string", pocet_kompetentu = "number", pocet_isp = "number", pocet_dtzd = "number", pocet_rozpis = "number", pocet_priloh = "number", c_kc = "JsonDecimal", c_0 = "JsonDecimal", c_1 = "JsonDecimal", c_2 = "JsonDecimal", c_3 = "JsonDecimal", c_4 = "JsonDecimal", c_6 = "JsonDecimal", c_7 = "JsonDecimal", c_8 = "JsonDecimal", c_9 = "JsonDecimal", c_10 = "JsonDecimal", c_11 = "JsonDecimal", c_12 = "JsonDecimal", c_13 = "JsonDecimal", c_14 = "JsonDecimal", c_15 = "JsonDecimal", c_16 = "JsonDecimal", c_17 = "JsonDecimal", c_18 = "JsonDecimal", c_21 = "JsonDecimal", c_23 = "JsonDecimal", c_25 = "JsonDecimal", c_34 = "JsonDecimal", c_54 = "JsonDecimal", c_66 = "JsonDecimal", c_2_3_7_8 = "JsonDecimal", c_23_25 = "JsonDecimal", c_2_3_7_8_23_25 = "JsonDecimal", c_2_3_7_8_23_25_14_34_54 = "JsonDecimal", c_6_18 = "JsonDecimal", c_10_11 = "JsonDecimal", c_15_16_17 = "JsonDecimal", c_zbyva_nasmlouvat = "JsonDecimal", c_zbyva_cerpat = "JsonDecimal", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", new_rok = "number", new_ixs_pla = "string", new_cislo = "string", new_ixs_fun_akt = "string", new_aktivita = "number", new_stav_real = "number", new_stav_az = "number", new_typ = "number", ixs_csl = "string", ixs_csp = "string", ixs_prr = "string", ixs_prr_txt = "string", new_ixs_prr = "string", ixs_tri = "string", ixs_tri_txt = "string", new_tri_prr = "string", priz_ram_doh = "number", priz_ram_doh_b = "boolean", Permissions = "Gordic.Eko.Interface.GEkoAkcePermissions", Vlastnost = "Gordic.Gin.Interface.GGinVlastnostiDataDto", Vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", pocet_kompetentu_ja = "number", pocet_prr = "number", JsemKompetent = "boolean", JsemKompetentAZ = "boolean", mazat_kompetenty = "boolean", new_kompetenti = "Gordic.Eko.Interface.GEkoKompetentiAkceDto[]", prev_nazev_skp = "string", prev_nazev_psk = "string", ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", vlastnictvi = "number",}
	const enum GEkoAkceDtoTypeLengths { ico = 10, cislo = 16, ixs_cia = 12, nazev = 254, typ_txt = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 36, jmeno = 24, os_cislo = 10, telefon = 254, upresneni = 254, zmenu_prov = 12, zmenu_prov_txt = 254, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, inv_cis = 12, mandatar = 5, t_nks = 50, nks = 12, xpf_pf = 63, zad = 35, cevid = 6, cpp = 6, chp = 6, cip = 13, cpps01 = 6, cpps02 = 6, cpps03 = 6, cpps04 = 6, cpps05 = 6, ixs_pla = 12, ixs_pla_txt = 12, mj = 5, cislo_pd = 20, xpf_nato = 20, cis_real = 6, prij_dot = 254, skp = 15, ixs_fun_akt = 12, ixs_fun_akt_nazev = 254, ixs_fun_akt_nazev_ref = 254, ixs_fun_az = 12, ixs_fun_az_nazev = 254, ixs_fun_az_nazev_ref = 254, ucs = 10, ixs_fun_zad = 12, ixs_fun_zad_nazev = 254, ixs_sro_az = 12, typ_vzb_txt = 254, new_ixs_pla = 12, new_cislo = 12, new_ixs_fun_akt = 12, ixs_csl = 12, ixs_csp = 12, ixs_prr = 12, ixs_prr_txt = 12, new_ixs_prr = 12, ixs_tri = 12, ixs_tri_txt = 12, new_tri_prr = 12,}
	interface GEkoAkceRozsireneDto extends Gordic.Eko.Interface.GEkoAkceDto {
		/**DBCOLUMN:SeznamDokladu.cc_c_kc*/
		cc_c_kc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_0?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_2?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_3?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_4?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_6?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_7?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_8?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_9?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_10?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_11?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_12?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_15?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_16?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_17?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_18?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_23?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_21?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_2_3_7_8?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_23_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_2_3_7_8_23_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_2_3_7_8_23_25_14_34_54?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_6_18?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_10_11?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		cc_c_15_16_17?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		datum_zmeny_filtrace?: JsonDate|null;
		/**DBCOLUMN:RozpisAkce.c_nenasmlouvano_z_roz.*/
		c_nenasmlouvano_z_roz?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_nenasmlouvano_z_blk.*/
		c_nenasmlouvano_z_blk?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_neobjednano_z_sml*/
		c_neobjednano_z_sml?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_nerezervovano_z_sml*/
		c_nerezervovano_z_sml?: JsonDecimal|null;
	}
	const enum GEkoAkceRozsireneDtoNames { cc_c_kc = "cc_c_kc", cc_c_0 = "cc_c_0", cc_c_1 = "cc_c_1", cc_c_2 = "cc_c_2", cc_c_3 = "cc_c_3", cc_c_4 = "cc_c_4", cc_c_6 = "cc_c_6", cc_c_7 = "cc_c_7", cc_c_8 = "cc_c_8", cc_c_9 = "cc_c_9", cc_c_10 = "cc_c_10", cc_c_11 = "cc_c_11", cc_c_12 = "cc_c_12", cc_c_15 = "cc_c_15", cc_c_16 = "cc_c_16", cc_c_17 = "cc_c_17", cc_c_18 = "cc_c_18", cc_c_23 = "cc_c_23", cc_c_21 = "cc_c_21", cc_c_2_3_7_8 = "cc_c_2_3_7_8", cc_c_23_25 = "cc_c_23_25", cc_c_2_3_7_8_23_25 = "cc_c_2_3_7_8_23_25", cc_2_3_7_8_23_25_14_34_54 = "cc_2_3_7_8_23_25_14_34_54", cc_c_6_18 = "cc_c_6_18", cc_c_10_11 = "cc_c_10_11", cc_c_15_16_17 = "cc_c_15_16_17", datum_zmeny_filtrace = "datum_zmeny_filtrace", c_nenasmlouvano_z_roz = "c_nenasmlouvano_z_roz", c_nenasmlouvano_z_blk = "c_nenasmlouvano_z_blk", c_neobjednano_z_sml = "c_neobjednano_z_sml", c_nerezervovano_z_sml = "c_nerezervovano_z_sml", rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", nazev = "nazev", typ = "typ", typ_txt = "typ_txt", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", upresneni = "upresneni", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ktg_akce = "ktg_akce", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", aktivita = "aktivita", aktivita_s = "aktivita_s", stav_real = "stav_real", stav_real_txt = "stav_real_txt", inv_cis = "inv_cis", mandatar = "mandatar", t_nks = "t_nks", nks = "nks", xpf_pf = "xpf_pf", zad = "zad", cevid = "cevid", cpp = "cpp", chp = "chp", cip = "cip", c_nato = "c_nato", c_ipf = "c_ipf", cpps01 = "cpps01", cpps02 = "cpps02", cpps03 = "cpps03", cpps04 = "cpps04", cpps05 = "cpps05", ixs_pla = "ixs_pla", ixs_pla_txt = "ixs_pla_txt", mj = "mj", c_pd = "c_pd", cislo_pd = "cislo_pd", xpf_nato = "xpf_nato", cis_real = "cis_real", prij_dot = "prij_dot", skp = "skp", c_celk = "c_celk", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_nazev = "ixs_fun_akt_nazev", ixs_fun_akt_nazev_ref = "ixs_fun_akt_nazev_ref", ixs_fun_az = "ixs_fun_az", ixs_fun_az_nazev = "ixs_fun_az_nazev", ixs_fun_az_nazev_ref = "ixs_fun_az_nazev_ref", ucs = "ucs", ixs_fun_zad = "ixs_fun_zad", ixs_fun_zad_nazev = "ixs_fun_zad_nazev", ixs_sro_az = "ixs_sro_az", typ_vzb = "typ_vzb", typ_vzb_txt = "typ_vzb_txt", dat_mpd = "dat_mpd", priz_az = "priz_az", stav_az = "stav_az", stav_az_txt = "stav_az_txt", typ_akce_sum = "typ_akce_sum", typ_akce_sum_txt = "typ_akce_sum_txt", stav_inp = "stav_inp", priz_az_b = "priz_az_b", stav_inp_b = "stav_inp_b", priz_az_s = "priz_az_s", stav_inp_s = "stav_inp_s", pocet_kompetentu = "pocet_kompetentu", pocet_isp = "pocet_isp", pocet_dtzd = "pocet_dtzd", pocet_rozpis = "pocet_rozpis", pocet_priloh = "pocet_priloh", c_kc = "c_kc", c_0 = "c_0", c_1 = "c_1", c_2 = "c_2", c_3 = "c_3", c_4 = "c_4", c_6 = "c_6", c_7 = "c_7", c_8 = "c_8", c_9 = "c_9", c_10 = "c_10", c_11 = "c_11", c_12 = "c_12", c_13 = "c_13", c_14 = "c_14", c_15 = "c_15", c_16 = "c_16", c_17 = "c_17", c_18 = "c_18", c_21 = "c_21", c_23 = "c_23", c_25 = "c_25", c_34 = "c_34", c_54 = "c_54", c_66 = "c_66", c_2_3_7_8 = "c_2_3_7_8", c_23_25 = "c_23_25", c_2_3_7_8_23_25 = "c_2_3_7_8_23_25", c_2_3_7_8_23_25_14_34_54 = "c_2_3_7_8_23_25_14_34_54", c_6_18 = "c_6_18", c_10_11 = "c_10_11", c_15_16_17 = "c_15_16_17", c_zbyva_nasmlouvat = "c_zbyva_nasmlouvat", c_zbyva_cerpat = "c_zbyva_cerpat", vlastnosti = "vlastnosti", new_rok = "new_rok", new_ixs_pla = "new_ixs_pla", new_cislo = "new_cislo", new_ixs_fun_akt = "new_ixs_fun_akt", new_aktivita = "new_aktivita", new_stav_real = "new_stav_real", new_stav_az = "new_stav_az", new_typ = "new_typ", ixs_csl = "ixs_csl", ixs_csp = "ixs_csp", ixs_prr = "ixs_prr", ixs_prr_txt = "ixs_prr_txt", new_ixs_prr = "new_ixs_prr", ixs_tri = "ixs_tri", ixs_tri_txt = "ixs_tri_txt", new_tri_prr = "new_tri_prr", priz_ram_doh = "priz_ram_doh", priz_ram_doh_b = "priz_ram_doh_b", Permissions = "Permissions", Vlastnost = "Vlastnost", Vlastnik = "Vlastnik", pocet_kompetentu_ja = "pocet_kompetentu_ja", pocet_prr = "pocet_prr", JsemKompetent = "JsemKompetent", JsemKompetentAZ = "JsemKompetentAZ", mazat_kompetenty = "mazat_kompetenty", new_kompetenti = "new_kompetenti", prev_nazev_skp = "prev_nazev_skp", prev_nazev_psk = "prev_nazev_psk", ControlsSystemAggregated = "ControlsSystemAggregated", vlastnictvi = "vlastnictvi",}
	const enum GEkoAkceRozsireneDtoFragments { cc_c_kc = "main", cc_c_0 = "main", cc_c_1 = "main", cc_c_2 = "main", cc_c_3 = "main", cc_c_4 = "main", cc_c_6 = "main", cc_c_7 = "main", cc_c_8 = "main", cc_c_9 = "main", cc_c_10 = "main", cc_c_11 = "main", cc_c_12 = "main", cc_c_15 = "main", cc_c_16 = "main", cc_c_17 = "main", cc_c_18 = "main", cc_c_23 = "main", cc_c_21 = "main", cc_c_2_3_7_8 = "main", cc_c_23_25 = "main", cc_c_2_3_7_8_23_25 = "main", cc_2_3_7_8_23_25_14_34_54 = "main", cc_c_6_18 = "main", cc_c_10_11 = "main", cc_c_15_16_17 = "main", datum_zmeny_filtrace = "main", c_nenasmlouvano_z_roz = "main", c_nenasmlouvano_z_blk = "main", c_neobjednano_z_sml = "main", c_nerezervovano_z_sml = "main", rok = "main", ico = "main", cislo = "main", ixs_cia = "main", nazev = "main", typ = "main", typ_txt = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", upresneni = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main", ktg_akce = "main", skp_akce = "main", psk_akce = "main", skp_akc = "main", psk_akc = "main", aktivita = "main", aktivita_s = "main", stav_real = "main", stav_real_txt = "main", inv_cis = "main", mandatar = "main", t_nks = "main", nks = "main", xpf_pf = "main", zad = "main", cevid = "main", cpp = "main", chp = "main", cip = "main", c_nato = "main", c_ipf = "main", cpps01 = "main", cpps02 = "main", cpps03 = "main", cpps04 = "main", cpps05 = "main", ixs_pla = "main", ixs_pla_txt = "main", mj = "main", c_pd = "main", cislo_pd = "main", xpf_nato = "main", cis_real = "main", prij_dot = "main", skp = "main", c_celk = "main", ixs_fun_akt = "main", ixs_fun_akt_nazev = "main", ixs_fun_akt_nazev_ref = "main", ixs_fun_az = "main", ixs_fun_az_nazev = "main", ixs_fun_az_nazev_ref = "main", ucs = "main", ixs_fun_zad = "main", ixs_fun_zad_nazev = "main", ixs_sro_az = "main", typ_vzb = "main", typ_vzb_txt = "main", dat_mpd = "main", priz_az = "main", stav_az = "main", stav_az_txt = "main", typ_akce_sum = "main", typ_akce_sum_txt = "main", stav_inp = "main", priz_az_b = "main", stav_inp_b = "main", priz_az_s = "main", stav_inp_s = "main", pocet_kompetentu = "main", pocet_isp = "main", pocet_dtzd = "main", pocet_rozpis = "main", pocet_priloh = "main", c_kc = "main", c_0 = "main", c_1 = "main", c_2 = "main", c_3 = "main", c_4 = "main", c_6 = "main", c_7 = "main", c_8 = "main", c_9 = "main", c_10 = "main", c_11 = "main", c_12 = "main", c_13 = "main", c_14 = "main", c_15 = "main", c_16 = "main", c_17 = "main", c_18 = "main", c_21 = "main", c_23 = "main", c_25 = "main", c_34 = "main", c_54 = "main", c_66 = "main", c_2_3_7_8 = "main", c_23_25 = "main", c_2_3_7_8_23_25 = "main", c_2_3_7_8_23_25_14_34_54 = "main", c_6_18 = "main", c_10_11 = "main", c_15_16_17 = "main", c_zbyva_nasmlouvat = "main", c_zbyva_cerpat = "main", vlastnosti = "main", new_rok = "main", new_ixs_pla = "main", new_cislo = "main", new_ixs_fun_akt = "main", new_aktivita = "main", new_stav_real = "main", new_stav_az = "main", new_typ = "main", ixs_csl = "main", ixs_csp = "main", ixs_prr = "main", ixs_prr_txt = "main", new_ixs_prr = "main", ixs_tri = "main", ixs_tri_txt = "main", new_tri_prr = "main", priz_ram_doh = "main", priz_ram_doh_b = "main", Permissions = "main", Vlastnost = "main", Vlastnik = "main", pocet_kompetentu_ja = "main", pocet_prr = "main", JsemKompetent = "main", JsemKompetentAZ = "main", mazat_kompetenty = "main", new_kompetenti = "main", prev_nazev_skp = "main", prev_nazev_psk = "main", ControlsSystemAggregated = "DSG_FRAGMENT", vlastnictvi = "*",}
	const enum GEkoAkceRozsireneDtoTypes { cc_c_kc = "JsonDecimal", cc_c_0 = "JsonDecimal", cc_c_1 = "JsonDecimal", cc_c_2 = "JsonDecimal", cc_c_3 = "JsonDecimal", cc_c_4 = "JsonDecimal", cc_c_6 = "JsonDecimal", cc_c_7 = "JsonDecimal", cc_c_8 = "JsonDecimal", cc_c_9 = "JsonDecimal", cc_c_10 = "JsonDecimal", cc_c_11 = "JsonDecimal", cc_c_12 = "JsonDecimal", cc_c_15 = "JsonDecimal", cc_c_16 = "JsonDecimal", cc_c_17 = "JsonDecimal", cc_c_18 = "JsonDecimal", cc_c_23 = "JsonDecimal", cc_c_21 = "JsonDecimal", cc_c_2_3_7_8 = "JsonDecimal", cc_c_23_25 = "JsonDecimal", cc_c_2_3_7_8_23_25 = "JsonDecimal", cc_2_3_7_8_23_25_14_34_54 = "JsonDecimal", cc_c_6_18 = "JsonDecimal", cc_c_10_11 = "JsonDecimal", cc_c_15_16_17 = "JsonDecimal", datum_zmeny_filtrace = "JsonDate", c_nenasmlouvano_z_roz = "JsonDecimal", c_nenasmlouvano_z_blk = "JsonDecimal", c_neobjednano_z_sml = "JsonDecimal", c_nerezervovano_z_sml = "JsonDecimal", rok = "number", ico = "string", cislo = "string", ixs_cia = "string", nazev = "string", typ = "number", typ_txt = "string", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", upresneni = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ktg_akce = "number", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", aktivita = "number", aktivita_s = "string", stav_real = "number", stav_real_txt = "string", inv_cis = "string", mandatar = "string", t_nks = "string", nks = "string", xpf_pf = "string", zad = "string", cevid = "string", cpp = "string", chp = "string", cip = "string", c_nato = "JsonDecimal", c_ipf = "JsonDecimal", cpps01 = "string", cpps02 = "string", cpps03 = "string", cpps04 = "string", cpps05 = "string", ixs_pla = "string", ixs_pla_txt = "string", mj = "string", c_pd = "JsonDecimal", cislo_pd = "string", xpf_nato = "string", cis_real = "string", prij_dot = "string", skp = "string", c_celk = "JsonDecimal", ixs_fun_akt = "string", ixs_fun_akt_nazev = "string", ixs_fun_akt_nazev_ref = "string", ixs_fun_az = "string", ixs_fun_az_nazev = "string", ixs_fun_az_nazev_ref = "string", ucs = "string", ixs_fun_zad = "string", ixs_fun_zad_nazev = "string", ixs_sro_az = "string", typ_vzb = "number", typ_vzb_txt = "string", dat_mpd = "JsonDate", priz_az = "number", stav_az = "number", stav_az_txt = "string", typ_akce_sum = "number", typ_akce_sum_txt = "string", stav_inp = "number", priz_az_b = "boolean", stav_inp_b = "boolean", priz_az_s = "string", stav_inp_s = "string", pocet_kompetentu = "number", pocet_isp = "number", pocet_dtzd = "number", pocet_rozpis = "number", pocet_priloh = "number", c_kc = "JsonDecimal", c_0 = "JsonDecimal", c_1 = "JsonDecimal", c_2 = "JsonDecimal", c_3 = "JsonDecimal", c_4 = "JsonDecimal", c_6 = "JsonDecimal", c_7 = "JsonDecimal", c_8 = "JsonDecimal", c_9 = "JsonDecimal", c_10 = "JsonDecimal", c_11 = "JsonDecimal", c_12 = "JsonDecimal", c_13 = "JsonDecimal", c_14 = "JsonDecimal", c_15 = "JsonDecimal", c_16 = "JsonDecimal", c_17 = "JsonDecimal", c_18 = "JsonDecimal", c_21 = "JsonDecimal", c_23 = "JsonDecimal", c_25 = "JsonDecimal", c_34 = "JsonDecimal", c_54 = "JsonDecimal", c_66 = "JsonDecimal", c_2_3_7_8 = "JsonDecimal", c_23_25 = "JsonDecimal", c_2_3_7_8_23_25 = "JsonDecimal", c_2_3_7_8_23_25_14_34_54 = "JsonDecimal", c_6_18 = "JsonDecimal", c_10_11 = "JsonDecimal", c_15_16_17 = "JsonDecimal", c_zbyva_nasmlouvat = "JsonDecimal", c_zbyva_cerpat = "JsonDecimal", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", new_rok = "number", new_ixs_pla = "string", new_cislo = "string", new_ixs_fun_akt = "string", new_aktivita = "number", new_stav_real = "number", new_stav_az = "number", new_typ = "number", ixs_csl = "string", ixs_csp = "string", ixs_prr = "string", ixs_prr_txt = "string", new_ixs_prr = "string", ixs_tri = "string", ixs_tri_txt = "string", new_tri_prr = "string", priz_ram_doh = "number", priz_ram_doh_b = "boolean", Permissions = "Gordic.Eko.Interface.GEkoAkcePermissions", Vlastnost = "Gordic.Gin.Interface.GGinVlastnostiDataDto", Vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", pocet_kompetentu_ja = "number", pocet_prr = "number", JsemKompetent = "boolean", JsemKompetentAZ = "boolean", mazat_kompetenty = "boolean", new_kompetenti = "Gordic.Eko.Interface.GEkoKompetentiAkceDto[]", prev_nazev_skp = "string", prev_nazev_psk = "string", ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", vlastnictvi = "number",}
	const enum GEkoAkceRozsireneDtoTypeLengths { ico = 10, cislo = 16, ixs_cia = 12, nazev = 254, typ_txt = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 36, jmeno = 24, os_cislo = 10, telefon = 254, upresneni = 254, zmenu_prov = 12, zmenu_prov_txt = 254, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, inv_cis = 12, mandatar = 5, t_nks = 50, nks = 12, xpf_pf = 63, zad = 35, cevid = 6, cpp = 6, chp = 6, cip = 13, cpps01 = 6, cpps02 = 6, cpps03 = 6, cpps04 = 6, cpps05 = 6, ixs_pla = 12, ixs_pla_txt = 12, mj = 5, cislo_pd = 20, xpf_nato = 20, cis_real = 6, prij_dot = 254, skp = 15, ixs_fun_akt = 12, ixs_fun_akt_nazev = 254, ixs_fun_akt_nazev_ref = 254, ixs_fun_az = 12, ixs_fun_az_nazev = 254, ixs_fun_az_nazev_ref = 254, ucs = 10, ixs_fun_zad = 12, ixs_fun_zad_nazev = 254, ixs_sro_az = 12, typ_vzb_txt = 254, new_ixs_pla = 12, new_cislo = 12, new_ixs_fun_akt = 12, ixs_csl = 12, ixs_csp = 12, ixs_prr = 12, ixs_prr_txt = 12, new_ixs_prr = 12, ixs_tri = 12, ixs_tri_txt = 12, new_tri_prr = 12,}
	/**GAkcePermissions*/
	interface GEkoAkcePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**CanRead*/
		LzeCist: Gordic.General.ApplicationInterface.GPermission;
		/**CanEdit*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**CanDelete*/
		LzeMazat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePredat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePrevzit*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**LzePreevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**JsemVlastnik*/
		JsemVlastnik: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GEkoAkcePermissionsNames { LzeCist = "LzeCist", LzeEditovat = "LzeEditovat", LzeMazat = "LzeMazat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat", JsemVlastnik = "JsemVlastnik",}
	const enum GEkoAkcePermissionsFragments { LzeCist = "*", LzeEditovat = "*", LzeMazat = "*", LzePredat = "*", LzePrevzit = "*", LzePreevidovat = "*", JsemVlastnik = "*",}
	const enum GEkoAkcePermissionsTypes { LzeCist = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeMazat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", JsemVlastnik = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GEkoAkcePermissionsTypeLengths {}
	/**GAkcePermissions*/
	interface GEkoAkceServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**CanCreate*/
		LzeVytvorit: Gordic.General.ApplicationInterface.GPermission;
		/**CanEdit*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**CanDelete*/
		LzeMazat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePredat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePrevzit*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**LzePreevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GEkoAkceServicePermissionsNames { LzeVytvorit = "LzeVytvorit", LzeEditovat = "LzeEditovat", LzeMazat = "LzeMazat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat",}
	const enum GEkoAkceServicePermissionsFragments { LzeVytvorit = "*", LzeEditovat = "*", LzeMazat = "*", LzePredat = "*", LzePrevzit = "*", LzePreevidovat = "*",}
	const enum GEkoAkceServicePermissionsTypes { LzeVytvorit = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeMazat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GEkoAkceServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Akce\GEkoKompetentiAkceDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Kompetenti akce DTO*/
	interface GEkoKompetentiAkceDto {
		/**DBCOLUMN:SeznamKompetentu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamKompetentu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamKompetentu.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamKompetentu.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:SeznamKompetentu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:SeznamKompetentu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamKompetentu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamKompetentu.kompetent_txt*/
		kompetent_txt?: string|null;
		/**DBCOLUMN:SeznamKompetentu.cis_real*/
		cis_real?: string|null;
	}
	const enum GEkoKompetentiAkceDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_fun = "ixs_fun", ixs_pla = "ixs_pla", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kompetent_txt = "kompetent_txt", cis_real = "cis_real",}
	const enum GEkoKompetentiAkceDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_fun = "*", ixs_pla = "*", dat_zmena = "*", zmenu_prov = "*", kompetent_txt = "*", cis_real = "*",}
	const enum GEkoKompetentiAkceDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_fun = "string", ixs_pla = "string", dat_zmena = "JsonDate", zmenu_prov = "string", kompetent_txt = "string", cis_real = "string",}
	const enum GEkoKompetentiAkceDtoTypeLengths { ico = 10, cislo = 16, ixs_fun = 12, ixs_pla = 12, zmenu_prov = 12, cis_real = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Akce\GEkoRozpisAkceDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Rozpis akce DTO*/
	interface GEkoRozpisAkceDto {
		/**DBCOLUMN:RozpisAkce.ico*/
		ico?: string|null;
		/**DBCOLUMN:RozpisAkce.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:RozpisAkce.nks*/
		nks?: string|null;
		/**DBCOLUMN:RozpisAkce.rok*/
		rok?: number|null;
		/**DBCOLUMN:RozpisAkce.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:RozpisAkce.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:RozpisAkce.drd*/
		drd?: number|null;
		/**DBCOLUMN:RozpisAkce.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:RozpisAkce.uea*/
		uea?: string|null;
		/**DBCOLUMN:RozpisAkce.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:RozpisAkce.uec*/
		uec?: string|null;
		/**DBCOLUMN:RozpisAkce.ued*/
		ued?: string|null;
		/**DBCOLUMN:RozpisAkce.uee*/
		uee?: string|null;
		/**DBCOLUMN:RozpisAkce.uef*/
		uef?: string|null;
		/**DBCOLUMN:RozpisAkce.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:RozpisAkce.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:RozpisAkce.uei*/
		uei?: string|null;
		/**DBCOLUMN:RozpisAkce.uej*/
		uej?: string|null;
		/**DBCOLUMN:RozpisAkce.te0*/
		te0?: string|null;
		/**DBCOLUMN:RozpisAkce.te1*/
		te1?: string|null;
		/**DBCOLUMN:RozpisAkce.te2*/
		te2?: string|null;
		/**DBCOLUMN:RozpisAkce.te3*/
		te3?: string|null;
		/**DBCOLUMN:RozpisAkce.te4*/
		te4?: string|null;
		/**DBCOLUMN:RozpisAkce.kc0*/
		kc0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.kc1*/
		kc1?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.sm0*/
		sm0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.sm1*/
		sm1?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.km0*/
		km0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.km1*/
		km1?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.mj*/
		mj?: string|null;
		/**DBCOLUMN:RozpisAkce.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:RozpisAkce.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:RozpisAkce.c0_23*/
		c0_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_23*/
		c1_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_13*/
		c0_13?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_13*/
		c1_13?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_14*/
		c0_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_14*/
		c1_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_24*/
		c0_24?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_24*/
		c1_24?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_25*/
		c0_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_25*/
		c1_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_26*/
		c0_26?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_26*/
		c1_26?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_30*/
		c0_30?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_30*/
		c1_30?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_31*/
		c0_31?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_31*/
		c1_31?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_0*/
		c0_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_0*/
		c1_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_2*/
		c0_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_2*/
		c1_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_3*/
		c0_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_3*/
		c1_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_6*/
		c0_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_6*/
		c1_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_7*/
		c0_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_7*/
		c1_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_8*/
		c0_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_8*/
		c1_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_10*/
		c0_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_10*/
		c1_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_11*/
		c0_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_11*/
		c1_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_12*/
		c0_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_12*/
		c1_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_15*/
		c0_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_15*/
		c1_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_16*/
		c0_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_16*/
		c1_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_17*/
		c0_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_17*/
		c1_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_18*/
		c0_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_18*/
		c1_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_22*/
		c0_22?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_22*/
		c1_22?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.ca_0*/
		ca_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.cb_0*/
		cb_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.ca_6*/
		ca_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.cb_6*/
		cb_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.ca_18*/
		ca_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.cb_18*/
		cb_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:RozpisAkce.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:RozpisAkce.c0_21*/
		c0_21?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_21*/
		c1_21?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_34*/
		c0_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_34*/
		c1_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_54*/
		c0_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_54*/
		c1_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_66*/
		c0_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_66*/
		c1_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_62*/
		c0_62?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_62*/
		c1_62?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_63*/
		c0_63?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_63*/
		c1_63?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_67*/
		c0_67?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_67*/
		c1_67?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_68*/
		c0_68?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_68*/
		c1_68?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_2*/
		c0c1_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_3*/
		c0c1_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_7*/
		c0c1_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_8*/
		c0c1_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_2_3_7_8*/
		c0c1_2_3_7_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_23*/
		c0c1_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_25*/
		c0c1_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_23_25*/
		c0c1_23_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_6*/
		c0c1_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_18*/
		c0c1_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_6_18*/
		c0c1_6_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_12*/
		c0c1_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_10*/
		c0c1_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_11*/
		c0c1_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_10_11*/
		c0c1_10_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_15*/
		c0c1_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_16*/
		c0c1_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_17*/
		c0c1_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_15_16_17*/
		c0c1_15_16_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_14*/
		c0c1_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_342*/
		c0c1_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_54*/
		c0c1_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_14_34_54*/
		c0c1_14_34_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_66*/
		c0c1_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_0*/
		c0c1_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_kc*/
		c0c1_kc?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_2_3_7_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_23_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_6_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_10_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_15_16_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_14_34_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.*/
		cc_c0c1_kc?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_nenasmlouvano_z_roz.*/
		c_nenasmlouvano_z_roz?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_nenasmlouvano_z_blk.*/
		c_nenasmlouvano_z_blk?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_neobjednano_z_sml*/
		c_neobjednano_z_sml?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c_nerezervovano_z_sml*/
		c_nerezervovano_z_sml?: JsonDecimal|null;
	}
	const enum GEkoRozpisAkceDtoNames { ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", xuete = "xuete", cislo = "cislo", drd = "drd", mesic = "mesic", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", kc0 = "kc0", kc1 = "kc1", sm0 = "sm0", sm1 = "sm1", km0 = "km0", km1 = "km1", mj = "mj", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_23 = "c0_23", c1_23 = "c1_23", c0_13 = "c0_13", c1_13 = "c1_13", c0_14 = "c0_14", c1_14 = "c1_14", c0_24 = "c0_24", c1_24 = "c1_24", c0_25 = "c0_25", c1_25 = "c1_25", c0_26 = "c0_26", c1_26 = "c1_26", c0_30 = "c0_30", c1_30 = "c1_30", c0_31 = "c0_31", c1_31 = "c1_31", c0_0 = "c0_0", c1_0 = "c1_0", c0_2 = "c0_2", c1_2 = "c1_2", c0_3 = "c0_3", c1_3 = "c1_3", c0_6 = "c0_6", c1_6 = "c1_6", c0_7 = "c0_7", c1_7 = "c1_7", c0_8 = "c0_8", c1_8 = "c1_8", c0_10 = "c0_10", c1_10 = "c1_10", c0_11 = "c0_11", c1_11 = "c1_11", c0_12 = "c0_12", c1_12 = "c1_12", c0_15 = "c0_15", c1_15 = "c1_15", c0_16 = "c0_16", c1_16 = "c1_16", c0_17 = "c0_17", c1_17 = "c1_17", c0_18 = "c0_18", c1_18 = "c1_18", c0_22 = "c0_22", c1_22 = "c1_22", ca_0 = "ca_0", cb_0 = "cb_0", ca_6 = "ca_6", cb_6 = "cb_6", ca_18 = "ca_18", cb_18 = "cb_18", priz_char = "priz_char", druh_char = "druh_char", c0_21 = "c0_21", c1_21 = "c1_21", c0_34 = "c0_34", c1_34 = "c1_34", c0_54 = "c0_54", c1_54 = "c1_54", c0_66 = "c0_66", c1_66 = "c1_66", c0_62 = "c0_62", c1_62 = "c1_62", c0_63 = "c0_63", c1_63 = "c1_63", c0_67 = "c0_67", c1_67 = "c1_67", c0_68 = "c0_68", c1_68 = "c1_68", c0c1_2 = "c0c1_2", c0c1_3 = "c0c1_3", c0c1_7 = "c0c1_7", c0c1_8 = "c0c1_8", c0c1_2_3_7_8 = "c0c1_2_3_7_8", c0c1_23 = "c0c1_23", c0c1_25 = "c0c1_25", c0c1_23_25 = "c0c1_23_25", c0c1_6 = "c0c1_6", c0c1_18 = "c0c1_18", c0c1_6_18 = "c0c1_6_18", c0c1_12 = "c0c1_12", c0c1_10 = "c0c1_10", c0c1_11 = "c0c1_11", c0c1_10_11 = "c0c1_10_11", c0c1_15 = "c0c1_15", c0c1_16 = "c0c1_16", c0c1_17 = "c0c1_17", c0c1_15_16_17 = "c0c1_15_16_17", c0c1_14 = "c0c1_14", c0c1_34 = "c0c1_34", c0c1_54 = "c0c1_54", c0c1_14_34_54 = "c0c1_14_34_54", c0c1_66 = "c0c1_66", c0c1_0 = "c0c1_0", c0c1_kc = "c0c1_kc", cc_c0c1_2 = "cc_c0c1_2", cc_c0c1_3 = "cc_c0c1_3", cc_c0c1_7 = "cc_c0c1_7", cc_c0c1_8 = "cc_c0c1_8", cc_c0c1_2_3_7_8 = "cc_c0c1_2_3_7_8", cc_c0c1_23 = "cc_c0c1_23", cc_c0c1_25 = "cc_c0c1_25", cc_c0c1_23_25 = "cc_c0c1_23_25", cc_c0c1_6 = "cc_c0c1_6", cc_c0c1_18 = "cc_c0c1_18", cc_c0c1_6_18 = "cc_c0c1_6_18", cc_c0c1_12 = "cc_c0c1_12", cc_c0c1_10 = "cc_c0c1_10", cc_c0c1_11 = "cc_c0c1_11", cc_c0c1_10_11 = "cc_c0c1_10_11", cc_c0c1_15 = "cc_c0c1_15", cc_c0c1_16 = "cc_c0c1_16", cc_c0c1_17 = "cc_c0c1_17", cc_c0c1_15_16_17 = "cc_c0c1_15_16_17", cc_c0c1_14 = "cc_c0c1_14", cc_c0c1_34 = "cc_c0c1_34", cc_c0c1_54 = "cc_c0c1_54", cc_c0c1_14_34_54 = "cc_c0c1_14_34_54", cc_c0c1_66 = "cc_c0c1_66", cc_c0c1_0 = "cc_c0c1_0", cc_c0c1_kc = "cc_c0c1_kc", c_nenasmlouvano_z_roz = "c_nenasmlouvano_z_roz", c_nenasmlouvano_z_blk = "c_nenasmlouvano_z_blk", c_neobjednano_z_sml = "c_neobjednano_z_sml", c_nerezervovano_z_sml = "c_nerezervovano_z_sml",}
	const enum GEkoRozpisAkceDtoFragments { ico = "*", ucs = "*", nks = "*", rok = "*", xuete = "*", cislo = "*", drd = "*", mesic = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", kc0 = "*", kc1 = "*", sm0 = "*", sm1 = "*", km0 = "*", km1 = "*", mj = "*", dat_zmena = "*", zmenu_prov = "*", c0_23 = "*", c1_23 = "*", c0_13 = "*", c1_13 = "*", c0_14 = "*", c1_14 = "*", c0_24 = "*", c1_24 = "*", c0_25 = "*", c1_25 = "*", c0_26 = "*", c1_26 = "*", c0_30 = "*", c1_30 = "*", c0_31 = "*", c1_31 = "*", c0_0 = "*", c1_0 = "*", c0_2 = "*", c1_2 = "*", c0_3 = "*", c1_3 = "*", c0_6 = "*", c1_6 = "*", c0_7 = "*", c1_7 = "*", c0_8 = "*", c1_8 = "*", c0_10 = "*", c1_10 = "*", c0_11 = "*", c1_11 = "*", c0_12 = "*", c1_12 = "*", c0_15 = "*", c1_15 = "*", c0_16 = "*", c1_16 = "*", c0_17 = "*", c1_17 = "*", c0_18 = "*", c1_18 = "*", c0_22 = "*", c1_22 = "*", ca_0 = "*", cb_0 = "*", ca_6 = "*", cb_6 = "*", ca_18 = "*", cb_18 = "*", priz_char = "*", druh_char = "*", c0_21 = "*", c1_21 = "*", c0_34 = "*", c1_34 = "*", c0_54 = "*", c1_54 = "*", c0_66 = "*", c1_66 = "*", c0_62 = "*", c1_62 = "*", c0_63 = "*", c1_63 = "*", c0_67 = "*", c1_67 = "*", c0_68 = "*", c1_68 = "*", c0c1_2 = "*", c0c1_3 = "*", c0c1_7 = "*", c0c1_8 = "*", c0c1_2_3_7_8 = "*", c0c1_23 = "*", c0c1_25 = "*", c0c1_23_25 = "*", c0c1_6 = "*", c0c1_18 = "*", c0c1_6_18 = "*", c0c1_12 = "*", c0c1_10 = "*", c0c1_11 = "*", c0c1_10_11 = "*", c0c1_15 = "*", c0c1_16 = "*", c0c1_17 = "*", c0c1_15_16_17 = "*", c0c1_14 = "*", c0c1_34 = "*", c0c1_54 = "*", c0c1_14_34_54 = "*", c0c1_66 = "*", c0c1_0 = "*", c0c1_kc = "*", cc_c0c1_2 = "*", cc_c0c1_3 = "*", cc_c0c1_7 = "*", cc_c0c1_8 = "*", cc_c0c1_2_3_7_8 = "*", cc_c0c1_23 = "*", cc_c0c1_25 = "*", cc_c0c1_23_25 = "*", cc_c0c1_6 = "*", cc_c0c1_18 = "*", cc_c0c1_6_18 = "*", cc_c0c1_12 = "*", cc_c0c1_10 = "*", cc_c0c1_11 = "*", cc_c0c1_10_11 = "*", cc_c0c1_15 = "*", cc_c0c1_16 = "*", cc_c0c1_17 = "*", cc_c0c1_15_16_17 = "*", cc_c0c1_14 = "*", cc_c0c1_34 = "*", cc_c0c1_54 = "*", cc_c0c1_14_34_54 = "*", cc_c0c1_66 = "*", cc_c0c1_0 = "*", cc_c0c1_kc = "*", c_nenasmlouvano_z_roz = "*", c_nenasmlouvano_z_blk = "*", c_neobjednano_z_sml = "*", c_nerezervovano_z_sml = "*",}
	const enum GEkoRozpisAkceDtoTypes { ico = "string", ucs = "string", nks = "string", rok = "number", xuete = "string", cislo = "string", drd = "number", mesic = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", kc0 = "JsonDecimal", kc1 = "JsonDecimal", sm0 = "JsonDecimal", sm1 = "JsonDecimal", km0 = "JsonDecimal", km1 = "JsonDecimal", mj = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c0_23 = "JsonDecimal", c1_23 = "JsonDecimal", c0_13 = "JsonDecimal", c1_13 = "JsonDecimal", c0_14 = "JsonDecimal", c1_14 = "JsonDecimal", c0_24 = "JsonDecimal", c1_24 = "JsonDecimal", c0_25 = "JsonDecimal", c1_25 = "JsonDecimal", c0_26 = "JsonDecimal", c1_26 = "JsonDecimal", c0_30 = "JsonDecimal", c1_30 = "JsonDecimal", c0_31 = "JsonDecimal", c1_31 = "JsonDecimal", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c0_2 = "JsonDecimal", c1_2 = "JsonDecimal", c0_3 = "JsonDecimal", c1_3 = "JsonDecimal", c0_6 = "JsonDecimal", c1_6 = "JsonDecimal", c0_7 = "JsonDecimal", c1_7 = "JsonDecimal", c0_8 = "JsonDecimal", c1_8 = "JsonDecimal", c0_10 = "JsonDecimal", c1_10 = "JsonDecimal", c0_11 = "JsonDecimal", c1_11 = "JsonDecimal", c0_12 = "JsonDecimal", c1_12 = "JsonDecimal", c0_15 = "JsonDecimal", c1_15 = "JsonDecimal", c0_16 = "JsonDecimal", c1_16 = "JsonDecimal", c0_17 = "JsonDecimal", c1_17 = "JsonDecimal", c0_18 = "JsonDecimal", c1_18 = "JsonDecimal", c0_22 = "JsonDecimal", c1_22 = "JsonDecimal", ca_0 = "JsonDecimal", cb_0 = "JsonDecimal", ca_6 = "JsonDecimal", cb_6 = "JsonDecimal", ca_18 = "JsonDecimal", cb_18 = "JsonDecimal", priz_char = "number", druh_char = "number", c0_21 = "JsonDecimal", c1_21 = "JsonDecimal", c0_34 = "JsonDecimal", c1_34 = "JsonDecimal", c0_54 = "JsonDecimal", c1_54 = "JsonDecimal", c0_66 = "JsonDecimal", c1_66 = "JsonDecimal", c0_62 = "JsonDecimal", c1_62 = "JsonDecimal", c0_63 = "JsonDecimal", c1_63 = "JsonDecimal", c0_67 = "JsonDecimal", c1_67 = "JsonDecimal", c0_68 = "JsonDecimal", c1_68 = "JsonDecimal", c0c1_2 = "JsonDecimal", c0c1_3 = "JsonDecimal", c0c1_7 = "JsonDecimal", c0c1_8 = "JsonDecimal", c0c1_2_3_7_8 = "JsonDecimal", c0c1_23 = "JsonDecimal", c0c1_25 = "JsonDecimal", c0c1_23_25 = "JsonDecimal", c0c1_6 = "JsonDecimal", c0c1_18 = "JsonDecimal", c0c1_6_18 = "JsonDecimal", c0c1_12 = "JsonDecimal", c0c1_10 = "JsonDecimal", c0c1_11 = "JsonDecimal", c0c1_10_11 = "JsonDecimal", c0c1_15 = "JsonDecimal", c0c1_16 = "JsonDecimal", c0c1_17 = "JsonDecimal", c0c1_15_16_17 = "JsonDecimal", c0c1_14 = "JsonDecimal", c0c1_34 = "JsonDecimal", c0c1_54 = "JsonDecimal", c0c1_14_34_54 = "JsonDecimal", c0c1_66 = "JsonDecimal", c0c1_0 = "JsonDecimal", c0c1_kc = "JsonDecimal", cc_c0c1_2 = "JsonDecimal", cc_c0c1_3 = "JsonDecimal", cc_c0c1_7 = "JsonDecimal", cc_c0c1_8 = "JsonDecimal", cc_c0c1_2_3_7_8 = "JsonDecimal", cc_c0c1_23 = "JsonDecimal", cc_c0c1_25 = "JsonDecimal", cc_c0c1_23_25 = "JsonDecimal", cc_c0c1_6 = "JsonDecimal", cc_c0c1_18 = "JsonDecimal", cc_c0c1_6_18 = "JsonDecimal", cc_c0c1_12 = "JsonDecimal", cc_c0c1_10 = "JsonDecimal", cc_c0c1_11 = "JsonDecimal", cc_c0c1_10_11 = "JsonDecimal", cc_c0c1_15 = "JsonDecimal", cc_c0c1_16 = "JsonDecimal", cc_c0c1_17 = "JsonDecimal", cc_c0c1_15_16_17 = "JsonDecimal", cc_c0c1_14 = "JsonDecimal", cc_c0c1_34 = "JsonDecimal", cc_c0c1_54 = "JsonDecimal", cc_c0c1_14_34_54 = "JsonDecimal", cc_c0c1_66 = "JsonDecimal", cc_c0c1_0 = "JsonDecimal", cc_c0c1_kc = "JsonDecimal", c_nenasmlouvano_z_roz = "JsonDecimal", c_nenasmlouvano_z_blk = "JsonDecimal", c_neobjednano_z_sml = "JsonDecimal", c_nerezervovano_z_sml = "JsonDecimal",}
	const enum GEkoRozpisAkceDtoTypeLengths { ico = 10, ucs = 10, nks = 12, xuete = 148, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, mj = 5, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Akce\GEkoSeznamAdaFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filtr pro seznam dokladu*/
	interface GEkoSeznamAdaFilterDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**Cislo akce*/
		cislo?: GIntervalDto<string>|null;
		/**Aktivita*/
		aktivita?: GBaseFilter<number>|null;
		/**Stav realizace*/
		stav_real?: GBaseFilter<number>|null;
		/**Nazev*/
		nazev?: GBaseFilter<string>|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: GBaseFilter<string>|null;
		/**typ akce*/
		typ?: GBaseFilter<number>|null;
		/**cfuDto*/
		cfuDto?: Gordic.Eko.Interface.GCfuFilterDto[]|null;
		/**DBCOLUMN:SeznamDokladu.skp_akce*/
		skp_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akce*/
		psk_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.skp_akc*/
		skp_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akc*/
		psk_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csp*/
		ixs_csp?: string|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamDokladu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.fin_od*/
		fin_od?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.fin_do*/
		fin_do?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.real_od*/
		real_od?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.real_do*/
		real_do?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.upresneni*/
		upresneni?: GBaseFilter<string>|null;
		/**Stav INP*/
		stav_inp?: GBaseFilter<number>|null;
		/**Stav AZ old*/
		priz_az?: GBaseFilter<number>|null;
		/**Stav AZ*/
		stav_az?: GBaseFilter<number>|null;
		/**ixs_fun_az*/
		ixs_fun_az?: GBaseFilter<string>|null;
		/**Typ akce sum*/
		typ_akce_sum?: GBaseFilter<number>|null;
		/**id_eds*/
		id_eds?: GIntervalDto<string>|null;
		/**id_psp*/
		id_psp?: GIntervalDto<string>|null;
		/**id_tzd*/
		id_tzd?: GBaseFilter<string>|null;
		/**id_tzd_tzd*/
		id_tzd_tzd?: GBaseFilter<string>|null;
		/**id_tzd_vyb*/
		id_tzd_vyb?: GBaseFilter<string>|null;
		/**id_tzd_eds*/
		id_tzd_eds?: GBaseFilter<string>|null;
		/**isp_nepozadopvano*/
		isp_nepozadopvano?: GBaseFilter<string>|null;
		/**isp_splneno*/
		isp_splneno?: GBaseFilter<string>|null;
		/**isp_nesplneno*/
		isp_nesplneno?: GBaseFilter<string>|null;
		/**isp_nenastaveno*/
		isp_nenastaveno?: GBaseFilter<string>|null;
		/**ixs_prr*/
		ixs_prr?: GBaseFilter<string>|null;
		/**ixs_tri*/
		ixs_tri?: GBaseFilter<string>|null;
		/**komp*/
		komp?: GBaseFilter<string>|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**Typ VZB*/
		typ_vzb?: GBaseFilter<number>|null;
		/**priz_ram_doh*/
		priz_ram_doh?: GBaseFilter<number>|null;
		/**ixp_spis_ip*/
		ixp_spis_ip?: string|null;
		/**ixp_dok_ip*/
		ixp_dok_ip?: string|null;
		/**akt_znacka_spis_ip*/
		akt_znacka_spis_ip?: string|null;
		/**Stav spisu*/
		stav_spis_ip?: GBaseFilter<number>|null;
		/**akt_znacka_dok_ip*/
		akt_znacka_dok_ip?: string|null;
		/**Stav dok*/
		stav_dok_ip?: GBaseFilter<number>|null;
		/**filtr_financovani*/
		filtr_financovani?: number|null;
		/**nazevFiltru*/
		nazevFiltru?: string|null;
	}
	const enum GEkoSeznamAdaFilterDtoNames { ico = "ico", rok = "rok", ixs_cia = "ixs_cia", cislo = "cislo", aktivita = "aktivita", stav_real = "stav_real", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", typ = "typ", cfuDto = "cfuDto", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", ixs_csp = "ixs_csp", vlastnosti = "vlastnosti", cis_real = "cis_real", nks = "nks", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", upresneni = "upresneni", stav_inp = "stav_inp", priz_az = "priz_az", stav_az = "stav_az", ixs_fun_az = "ixs_fun_az", typ_akce_sum = "typ_akce_sum", id_eds = "id_eds", id_psp = "id_psp", id_tzd = "id_tzd", id_tzd_tzd = "id_tzd_tzd", id_tzd_vyb = "id_tzd_vyb", id_tzd_eds = "id_tzd_eds", isp_nepozadopvano = "isp_nepozadopvano", isp_splneno = "isp_splneno", isp_nesplneno = "isp_nesplneno", isp_nenastaveno = "isp_nenastaveno", ixs_prr = "ixs_prr", ixs_tri = "ixs_tri", komp = "komp", dat_zmena = "dat_zmena", typ_vzb = "typ_vzb", priz_ram_doh = "priz_ram_doh", ixp_spis_ip = "ixp_spis_ip", ixp_dok_ip = "ixp_dok_ip", akt_znacka_spis_ip = "akt_znacka_spis_ip", stav_spis_ip = "stav_spis_ip", akt_znacka_dok_ip = "akt_znacka_dok_ip", stav_dok_ip = "stav_dok_ip", filtr_financovani = "filtr_financovani", nazevFiltru = "nazevFiltru",}
	const enum GEkoSeznamAdaFilterDtoFragments { ico = "*", rok = "*", ixs_cia = "*", cislo = "*", aktivita = "*", stav_real = "*", nazev = "*", ixs_fun_akt = "*", typ = "*", cfuDto = "*", skp_akce = "*", psk_akce = "*", skp_akc = "*", psk_akc = "*", ixs_csp = "*", vlastnosti = "*", cis_real = "*", nks = "*", fin_od = "*", fin_do = "*", real_od = "*", real_do = "*", upresneni = "*", stav_inp = "*", priz_az = "*", stav_az = "*", ixs_fun_az = "*", typ_akce_sum = "*", id_eds = "*", id_psp = "*", id_tzd = "*", id_tzd_tzd = "*", id_tzd_vyb = "*", id_tzd_eds = "*", isp_nepozadopvano = "*", isp_splneno = "*", isp_nesplneno = "*", isp_nenastaveno = "*", ixs_prr = "*", ixs_tri = "*", komp = "*", dat_zmena = "*", typ_vzb = "*", priz_ram_doh = "*", ixp_spis_ip = "*", ixp_dok_ip = "*", akt_znacka_spis_ip = "*", stav_spis_ip = "*", akt_znacka_dok_ip = "*", stav_dok_ip = "*", filtr_financovani = "*", nazevFiltru = "*",}
	const enum GEkoSeznamAdaFilterDtoTypes { ico = "string", rok = "number", ixs_cia = "string", cislo = "GIntervalDto<string>", aktivita = "GBaseFilter<number>", stav_real = "GBaseFilter<number>", nazev = "GBaseFilter<string>", ixs_fun_akt = "GBaseFilter<string>", typ = "GBaseFilter<number>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", ixs_csp = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", cis_real = "string", nks = "string", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", real_od = "GIntervalDto<number>", real_do = "GIntervalDto<number>", upresneni = "GBaseFilter<string>", stav_inp = "GBaseFilter<number>", priz_az = "GBaseFilter<number>", stav_az = "GBaseFilter<number>", ixs_fun_az = "GBaseFilter<string>", typ_akce_sum = "GBaseFilter<number>", id_eds = "GIntervalDto<string>", id_psp = "GIntervalDto<string>", id_tzd = "GBaseFilter<string>", id_tzd_tzd = "GBaseFilter<string>", id_tzd_vyb = "GBaseFilter<string>", id_tzd_eds = "GBaseFilter<string>", isp_nepozadopvano = "GBaseFilter<string>", isp_splneno = "GBaseFilter<string>", isp_nesplneno = "GBaseFilter<string>", isp_nenastaveno = "GBaseFilter<string>", ixs_prr = "GBaseFilter<string>", ixs_tri = "GBaseFilter<string>", komp = "GBaseFilter<string>", dat_zmena = "JsonDate", typ_vzb = "GBaseFilter<number>", priz_ram_doh = "GBaseFilter<number>", ixp_spis_ip = "string", ixp_dok_ip = "string", akt_znacka_spis_ip = "string", stav_spis_ip = "GBaseFilter<number>", akt_znacka_dok_ip = "string", stav_dok_ip = "GBaseFilter<number>", filtr_financovani = "number", nazevFiltru = "string",}
	const enum GEkoSeznamAdaFilterDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, ixs_csp = 12, cis_real = 6, nks = 12, upresneni = 254, ixs_fun_az = 12, ixs_prr = 12, ixs_tri = 12,}
	/**Enum pro elementy masky*/
	const enum MaskaElementyEnum {
		/**Elementy*/
		Element,
	}
	/**DTO ulozeneho filtru*/
	interface GSeznamAdaFilterStoredDto extends Gordic.Eko.Interface.GEkoSeznamAdaFilterDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamAdaFilterStoredDtoNames { id = "id", name = "name", description = "description", ico = "ico", rok = "rok", ixs_cia = "ixs_cia", cislo = "cislo", aktivita = "aktivita", stav_real = "stav_real", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", typ = "typ", cfuDto = "cfuDto", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", ixs_csp = "ixs_csp", vlastnosti = "vlastnosti", cis_real = "cis_real", nks = "nks", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", upresneni = "upresneni", stav_inp = "stav_inp", priz_az = "priz_az", stav_az = "stav_az", ixs_fun_az = "ixs_fun_az", typ_akce_sum = "typ_akce_sum", id_eds = "id_eds", id_psp = "id_psp", id_tzd = "id_tzd", id_tzd_tzd = "id_tzd_tzd", id_tzd_vyb = "id_tzd_vyb", id_tzd_eds = "id_tzd_eds", isp_nepozadopvano = "isp_nepozadopvano", isp_splneno = "isp_splneno", isp_nesplneno = "isp_nesplneno", isp_nenastaveno = "isp_nenastaveno", ixs_prr = "ixs_prr", ixs_tri = "ixs_tri", komp = "komp", dat_zmena = "dat_zmena", typ_vzb = "typ_vzb", priz_ram_doh = "priz_ram_doh", ixp_spis_ip = "ixp_spis_ip", ixp_dok_ip = "ixp_dok_ip", akt_znacka_spis_ip = "akt_znacka_spis_ip", stav_spis_ip = "stav_spis_ip", akt_znacka_dok_ip = "akt_znacka_dok_ip", stav_dok_ip = "stav_dok_ip", filtr_financovani = "filtr_financovani", nazevFiltru = "nazevFiltru",}
	const enum GSeznamAdaFilterStoredDtoFragments { id = "*", name = "*", description = "*", ico = "*", rok = "*", ixs_cia = "*", cislo = "*", aktivita = "*", stav_real = "*", nazev = "*", ixs_fun_akt = "*", typ = "*", cfuDto = "*", skp_akce = "*", psk_akce = "*", skp_akc = "*", psk_akc = "*", ixs_csp = "*", vlastnosti = "*", cis_real = "*", nks = "*", fin_od = "*", fin_do = "*", real_od = "*", real_do = "*", upresneni = "*", stav_inp = "*", priz_az = "*", stav_az = "*", ixs_fun_az = "*", typ_akce_sum = "*", id_eds = "*", id_psp = "*", id_tzd = "*", id_tzd_tzd = "*", id_tzd_vyb = "*", id_tzd_eds = "*", isp_nepozadopvano = "*", isp_splneno = "*", isp_nesplneno = "*", isp_nenastaveno = "*", ixs_prr = "*", ixs_tri = "*", komp = "*", dat_zmena = "*", typ_vzb = "*", priz_ram_doh = "*", ixp_spis_ip = "*", ixp_dok_ip = "*", akt_znacka_spis_ip = "*", stav_spis_ip = "*", akt_znacka_dok_ip = "*", stav_dok_ip = "*", filtr_financovani = "*", nazevFiltru = "*",}
	const enum GSeznamAdaFilterStoredDtoTypes { id = "string", name = "string", description = "string", ico = "string", rok = "number", ixs_cia = "string", cislo = "GIntervalDto<string>", aktivita = "GBaseFilter<number>", stav_real = "GBaseFilter<number>", nazev = "GBaseFilter<string>", ixs_fun_akt = "GBaseFilter<string>", typ = "GBaseFilter<number>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", ixs_csp = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", cis_real = "string", nks = "string", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", real_od = "GIntervalDto<number>", real_do = "GIntervalDto<number>", upresneni = "GBaseFilter<string>", stav_inp = "GBaseFilter<number>", priz_az = "GBaseFilter<number>", stav_az = "GBaseFilter<number>", ixs_fun_az = "GBaseFilter<string>", typ_akce_sum = "GBaseFilter<number>", id_eds = "GIntervalDto<string>", id_psp = "GIntervalDto<string>", id_tzd = "GBaseFilter<string>", id_tzd_tzd = "GBaseFilter<string>", id_tzd_vyb = "GBaseFilter<string>", id_tzd_eds = "GBaseFilter<string>", isp_nepozadopvano = "GBaseFilter<string>", isp_splneno = "GBaseFilter<string>", isp_nesplneno = "GBaseFilter<string>", isp_nenastaveno = "GBaseFilter<string>", ixs_prr = "GBaseFilter<string>", ixs_tri = "GBaseFilter<string>", komp = "GBaseFilter<string>", dat_zmena = "JsonDate", typ_vzb = "GBaseFilter<number>", priz_ram_doh = "GBaseFilter<number>", ixp_spis_ip = "string", ixp_dok_ip = "string", akt_znacka_spis_ip = "string", stav_spis_ip = "GBaseFilter<number>", akt_znacka_dok_ip = "string", stav_dok_ip = "GBaseFilter<number>", filtr_financovani = "number", nazevFiltru = "string",}
	const enum GSeznamAdaFilterStoredDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, ixs_csp = 12, cis_real = 6, nks = 12, upresneni = 254, ixs_fun_az = 12, ixs_prr = 12, ixs_tri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Akce\GEkoSrvdciaSeznamZapisuDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:srvdcia*/
	interface GEkoSrvdciaSeznamZapisuDto {
		/**DBCOLUMN:srvdcia.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvdcia.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvdcia.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:srvdcia.radek*/
		radek?: number|null;
		/**DBCOLUMN:srvdcia.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:srvdcia.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:srvdcia.drd*/
		drd?: number|null;
		/**DBCOLUMN:srvdcia.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:srvdcia.komp*/
		komp?: string|null;
		/**DBCOLUMN:srvdcia.nks*/
		nks?: string|null;
		/**DBCOLUMN:srvdcia.den*/
		den?: number|null;
		/**DBCOLUMN:srvdcia.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.uea*/
		uea?: string|null;
		/**DBCOLUMN:srvdcia.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:srvdcia.uec*/
		uec?: string|null;
		/**DBCOLUMN:srvdcia.ued*/
		ued?: string|null;
		/**DBCOLUMN:srvdcia.uee*/
		uee?: string|null;
		/**DBCOLUMN:srvdcia.uef*/
		uef?: string|null;
		/**DBCOLUMN:srvdcia.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:srvdcia.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:srvdcia.uei*/
		uei?: string|null;
		/**DBCOLUMN:srvdcia.uej*/
		uej?: string|null;
		/**DBCOLUMN:srvdcia.te0*/
		te0?: string|null;
		/**DBCOLUMN:srvdcia.te1*/
		te1?: string|null;
		/**DBCOLUMN:srvdcia.te2*/
		te2?: string|null;
		/**DBCOLUMN:srvdcia.te3*/
		te3?: string|null;
		/**DBCOLUMN:srvdcia.te4*/
		te4?: string|null;
		/**DBCOLUMN:srvdcia.t_ico*/
		t_ico?: string|null;
		/**DBCOLUMN:srvdcia.c0_s*/
		c0_s?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.c1_s*/
		c1_s?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:srvdcia.ac*/
		ac?: string|null;
		/**DBCOLUMN:srvdcia.ac_p*/
		ac_p?: string|null;
		/**DBCOLUMN:srvdcia.dat_inv_maj*/
		dat_inv_maj?: JsonDate|null;
		/**DBCOLUMN:srvdcia.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:srvdcia.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvdcia.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:srvdcia.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:srvdcia.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:srvdcia.uec_uc*/
		uec_uc?: string|null;
		/**DBCOLUMN:srvdcia.ued_uc*/
		ued_uc?: string|null;
		/**DBCOLUMN:srvdcia.uee_uc*/
		uee_uc?: string|null;
		/**DBCOLUMN:srvdcia.uef_uc*/
		uef_uc?: string|null;
		/**DBCOLUMN:srvdcia.ueg_uc*/
		ueg_uc?: string|null;
		/**DBCOLUMN:srvdcia.ueh_uc*/
		ueh_uc?: string|null;
		/**DBCOLUMN:srvdcia.uei_uc*/
		uei_uc?: string|null;
		/**DBCOLUMN:srvdcia.uej_uc*/
		uej_uc?: string|null;
		/**DBCOLUMN:srvdcia.te0_uc*/
		te0_uc?: string|null;
		/**DBCOLUMN:srvdcia.te1_uc*/
		te1_uc?: string|null;
		/**DBCOLUMN:srvdcia.te2_uc*/
		te2_uc?: string|null;
		/**DBCOLUMN:srvdcia.te3_uc*/
		te3_uc?: string|null;
		/**DBCOLUMN:srvdcia.te4_uc*/
		te4_uc?: string|null;
		/**DBCOLUMN:srvdcia.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:srvdcia.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:srvdcia.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:srvdcia.nks_uc*/
		nks_uc?: string|null;
		/**DBCOLUMN:srvdcia.lic*/
		lic?: string|null;
		/**DBCOLUMN:srvdcia.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:srvdcia.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:srvdcia.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:srvdcia.popis*/
		popis?: string|null;
	}
	const enum GEkoSrvdciaSeznamZapisuDtoNames { rok = "rok", ico = "ico", cislo = "cislo", radek = "radek", ucs = "ucs", xuete = "xuete", drd = "drd", mesic = "mesic", komp = "komp", nks = "nks", den = "den", c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", t_ico = "t_ico", c0_s = "c0_s", c1_s = "c1_s", typ_org = "typ_org", ac = "ac", ac_p = "ac_p", dat_inv_maj = "dat_inv_maj", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uec_uc = "uec_uc", ued_uc = "ued_uc", uee_uc = "uee_uc", uef_uc = "uef_uc", ueg_uc = "ueg_uc", ueh_uc = "ueh_uc", uei_uc = "uei_uc", uej_uc = "uej_uc", te0_uc = "te0_uc", te1_uc = "te1_uc", te2_uc = "te2_uc", te3_uc = "te3_uc", te4_uc = "te4_uc", radek_z = "radek_z", priz_char = "priz_char", druh_char = "druh_char", nks_uc = "nks_uc", lic = "lic", ixp = "ixp", typ_ag = "typ_ag", stav_kch = "stav_kch", popis = "popis",}
	const enum GEkoSrvdciaSeznamZapisuDtoFragments { rok = "*", ico = "*", cislo = "*", radek = "*", ucs = "*", xuete = "*", drd = "*", mesic = "*", komp = "*", nks = "*", den = "*", c0 = "*", c1 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", t_ico = "*", c0_s = "*", c1_s = "*", typ_org = "*", ac = "*", ac_p = "*", dat_inv_maj = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uea_uc = "*", ueb_uc = "*", uec_uc = "*", ued_uc = "*", uee_uc = "*", uef_uc = "*", ueg_uc = "*", ueh_uc = "*", uei_uc = "*", uej_uc = "*", te0_uc = "*", te1_uc = "*", te2_uc = "*", te3_uc = "*", te4_uc = "*", radek_z = "*", priz_char = "*", druh_char = "*", nks_uc = "*", lic = "*", ixp = "*", typ_ag = "*", stav_kch = "*", popis = "*",}
	const enum GEkoSrvdciaSeznamZapisuDtoTypes { rok = "number", ico = "string", cislo = "string", radek = "number", ucs = "string", xuete = "string", drd = "number", mesic = "number", komp = "string", nks = "string", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", t_ico = "string", c0_s = "JsonDecimal", c1_s = "JsonDecimal", typ_org = "number", ac = "string", ac_p = "string", dat_inv_maj = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uea_uc = "string", ueb_uc = "string", uec_uc = "string", ued_uc = "string", uee_uc = "string", uef_uc = "string", ueg_uc = "string", ueh_uc = "string", uei_uc = "string", uej_uc = "string", te0_uc = "string", te1_uc = "string", te2_uc = "string", te3_uc = "string", te4_uc = "string", radek_z = "number", priz_char = "number", druh_char = "number", nks_uc = "string", lic = "string", ixp = "string", typ_ag = "number", stav_kch = "number", popis = "string",}
	const enum GEkoSrvdciaSeznamZapisuDtoTypeLengths { ico = 10, cislo = 16, ucs = 10, xuete = 148, komp = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, t_ico = 50, ac = 20, ac_p = 20, zmenu_prov = 12, uea_uc = 3, ueb_uc = 4, uec_uc = 12, ued_uc = 12, uee_uc = 12, uef_uc = 3, ueg_uc = 16, ueh_uc = 4, uei_uc = 4, uej_uc = 12, te0_uc = 16, te1_uc = 16, te2_uc = 16, te3_uc = 6, te4_uc = 12, nks_uc = 12, lic = 4, ixp = 12, popis = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Cfu\GCfuFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro cfu set z dvojpolicek*/
	interface GCfuFilterDto {
		/**Cfu set*/
		cfu?: ObjectLiteral<GIntervalDto<string>>|null;
	}
	const enum GCfuFilterDtoNames { cfu = "cfu",}
	const enum GCfuFilterDtoFragments { cfu = "*",}
	const enum GCfuFilterDtoTypes { cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GCfuFilterDtoTypeLengths {}
	/**Eko topologie*/
	interface GCfuTopoFilterDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**ico*/
		ico?: GIntervalDto<string>|null;
		/**ucs*/
		ucs?: GIntervalDto<string>|null;
		/**uus*/
		uus?: GIntervalDto<string>|null;
		/**nks*/
		nks?: GIntervalDto<string>|null;
	}
	const enum GCfuTopoFilterDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", cfu = "cfu",}
	const enum GCfuTopoFilterDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", cfu = "*",}
	const enum GCfuTopoFilterDtoTypes { ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GCfuTopoFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controlling\IGControllingService.d.ts 

declare namespace Gordic.Isl.Catalog {
	interface ControllingService {
		vazebneMaskovySeznamList(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GVazebneMaskovySeznamDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ControllingService: ServiceBase & Catalog.ControllingService;
	}
	const ControllingService: Client["ControllingService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controlling\Dto\GVazebneMaskovySeznamDto.d.ts 

declare namespace Gordic.Eko.Interface {
	interface GVazebneMaskovySeznamDto {
		ixp?: string|null;
		prm_dat_zmena?: JsonDate|null;
		prm_zmenu_prov?: string|null;
		prm_zmenu_prov_rf?: string|null;
		ac?: string|null;
		ac_esu?: string|null;
		ac_ag?: string|null;
		ixs_esu?: string|null;
		esu_txt?: string|null;
		typ_esu?: number|null;
		ico_esu?: string|null;
		nks?: string|null;
		ico?: string|null;
		dat_evid?: JsonDate|null;
		dat_zmena?: JsonDate|null;
		zmenu_prov?: string|null;
		ac_sml?: string|null;
		ixs_msk?: string|null;
		radek?: number|null;
		c0_0?: JsonDecimal|null;
		c1_0?: JsonDecimal|null;
		uea_0?: string|null;
		ueb_0?: string|null;
		uec_0?: string|null;
		ued_0?: string|null;
		uee_0?: string|null;
		uef_0?: string|null;
		ueg_0?: string|null;
		ueh_0?: string|null;
		uei_0?: string|null;
		uej_0?: string|null;
		te0_0?: string|null;
		te1_0?: string|null;
		te2_0?: string|null;
		te3_0?: string|null;
		te4_0?: string|null;
		rok_0?: number|null;
		mesic_0?: number|null;
		den_0?: number|null;
		ico_0?: string|null;
		nks_0?: string|null;
		ixs_ope?: string|null;
		stav_dl?: number|null;
		stav_dl_txt?: string|null;
		popis?: string|null;
		ixp_dod?: string|null;
	}
	const enum GVazebneMaskovySeznamDtoNames { ixp = "ixp", prm_dat_zmena = "prm_dat_zmena", prm_zmenu_prov = "prm_zmenu_prov", prm_zmenu_prov_rf = "prm_zmenu_prov_rf", ac = "ac", ac_esu = "ac_esu", ac_ag = "ac_ag", ixs_esu = "ixs_esu", esu_txt = "esu_txt", typ_esu = "typ_esu", ico_esu = "ico_esu", nks = "nks", ico = "ico", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ac_sml = "ac_sml", ixs_msk = "ixs_msk", radek = "radek", c0_0 = "c0_0", c1_0 = "c1_0", uea_0 = "uea_0", ueb_0 = "ueb_0", uec_0 = "uec_0", ued_0 = "ued_0", uee_0 = "uee_0", uef_0 = "uef_0", ueg_0 = "ueg_0", ueh_0 = "ueh_0", uei_0 = "uei_0", uej_0 = "uej_0", te0_0 = "te0_0", te1_0 = "te1_0", te2_0 = "te2_0", te3_0 = "te3_0", te4_0 = "te4_0", rok_0 = "rok_0", mesic_0 = "mesic_0", den_0 = "den_0", ico_0 = "ico_0", nks_0 = "nks_0", ixs_ope = "ixs_ope", stav_dl = "stav_dl", stav_dl_txt = "stav_dl_txt", popis = "popis", ixp_dod = "ixp_dod",}
	const enum GVazebneMaskovySeznamDtoFragments { ixp = "*", prm_dat_zmena = "*", prm_zmenu_prov = "*", prm_zmenu_prov_rf = "*", ac = "*", ac_esu = "*", ac_ag = "*", ixs_esu = "*", esu_txt = "*", typ_esu = "*", ico_esu = "*", nks = "*", ico = "*", dat_evid = "*", dat_zmena = "*", zmenu_prov = "*", ac_sml = "*", ixs_msk = "*", radek = "*", c0_0 = "*", c1_0 = "*", uea_0 = "*", ueb_0 = "*", uec_0 = "*", ued_0 = "*", uee_0 = "*", uef_0 = "*", ueg_0 = "*", ueh_0 = "*", uei_0 = "*", uej_0 = "*", te0_0 = "*", te1_0 = "*", te2_0 = "*", te3_0 = "*", te4_0 = "*", rok_0 = "*", mesic_0 = "*", den_0 = "*", ico_0 = "*", nks_0 = "*", ixs_ope = "*", stav_dl = "*", stav_dl_txt = "*", popis = "*", ixp_dod = "*",}
	const enum GVazebneMaskovySeznamDtoTypes { ixp = "string", prm_dat_zmena = "JsonDate", prm_zmenu_prov = "string", prm_zmenu_prov_rf = "string", ac = "string", ac_esu = "string", ac_ag = "string", ixs_esu = "string", esu_txt = "string", typ_esu = "number", ico_esu = "string", nks = "string", ico = "string", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ac_sml = "string", ixs_msk = "string", radek = "number", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", uea_0 = "string", ueb_0 = "string", uec_0 = "string", ued_0 = "string", uee_0 = "string", uef_0 = "string", ueg_0 = "string", ueh_0 = "string", uei_0 = "string", uej_0 = "string", te0_0 = "string", te1_0 = "string", te2_0 = "string", te3_0 = "string", te4_0 = "string", rok_0 = "number", mesic_0 = "number", den_0 = "number", ico_0 = "string", nks_0 = "string", ixs_ope = "string", stav_dl = "number", stav_dl_txt = "string", popis = "string", ixp_dod = "string",}
	const enum GVazebneMaskovySeznamDtoTypeLengths {}
	/**Enum pro filtrování záznamů GVazebneMaskovySeznam.
	*     Členy odpovídají sloupcům DTO. Ponechte jen potřebné, pokud bude filtr zúžen.
	*/
	const enum GVazebneMaskovySeznamFiltrEnum {
		ixp,
		prm_dat_zmena,
		prm_zmenu_prov,
		prm_zmenu_prov_rf,
		ac,
		ac_esu,
		ac_ag,
		ixs_esu,
		esu_txt,
		typ_esu,
		ico_esu,
		nks,
		ico,
		dat_evid,
		dat_zmena,
		zmenu_prov,
		ac_sml,
		ixs_msk,
		radek,
		c0_0,
		c1_0,
		uea_0,
		ueb_0,
		uec_0,
		ued_0,
		uee_0,
		uef_0,
		ueg_0,
		ueh_0,
		uei_0,
		uej_0,
		te0_0,
		te1_0,
		te2_0,
		te3_0,
		te4_0,
		rok_0,
		mesic_0,
		den_0,
		ico_0,
		nks_0,
		ixs_ope,
		stav_dl,
		stav_dl_txt,
		popis,
		ixp_dod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\IGEkosden.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Autogenerated.*/
	const enum FilterEkosden {
		/**The ixp den*/
		ixp_den,
		/**The nazev*/
		nazev,
		/**The typ ag*/
		typ_ag,
		/**The KTG den*/
		ktg_den,
		/**The typ den*/
		typ_den,
		/**The NKS*/
		nks,
		/**The ucs*/
		ucs,
		/**The ico*/
		ico,
		/**The rok*/
		rok,
		/**The aktivita*/
		aktivita,
		/**The pouze akt obd*/
		pouzeAktObd,
		/**The prefix*/
		prefix,
		/**The suffix*/
		suffix,
		/**The suffix*/
		subrada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\IGEkosdenAll.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Autogenerated.*/
	const enum FilterEkosdenAll {
		/**The ixp den*/
		ixp_den,
		/**The ixs_fun*/
		ixs_fun,
		/**The nazev*/
		nazev,
		/**The typ ag*/
		typ_ag,
		/**The KTG den*/
		ktg_den,
		/**The typ den*/
		typ_den,
		/**The NKS*/
		nks,
		/**The ucs*/
		ucs,
		/**The ico*/
		ico,
		/**The rok*/
		rok,
		/**The aktivita*/
		aktivita,
		/**The pouze akt obd*/
		pouzeAktObd,
		/**The prefix*/
		prefix,
		/**The suffix*/
		suffix,
		/**The suffix*/
		subrada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GAcInfoDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Info about Ac or AcAg possible values*/
	interface GAcInfoDto {
		/**length of number part*/
		len?: number|null;
		/**prefix*/
		prefix?: string|null;
		/**suffix*/
		suffix?: string|null;
		/**min of number part*/
		min?: number|null;
		/**max of number part*/
		max?: number|null;
	}
	const enum GAcInfoDtoNames { len = "len", prefix = "prefix", suffix = "suffix", min = "min", max = "max",}
	const enum GAcInfoDtoFragments { len = "*", prefix = "*", suffix = "*", min = "*", max = "*",}
	const enum GAcInfoDtoTypes { len = "number", prefix = "string", suffix = "string", min = "number", max = "number",}
	const enum GAcInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GBookFilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
    /**Dto for filtering eko-books*/
	interface GBookFilterDto {
        /**The ixp den*/
		ixp_den?: GBaseFilter<string>|null;
        /**The rok*/
		rok?: GBaseFilter<number>|null;
        /**The KTG den*/
		ktg_den?: GBaseFilter<number>|null;
        /**The typ ag*/
		typ_ag?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GEkockryDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:ekockry*/
	interface GEkockryDto {
		/**DBCOLUMN:ekockry.s_kry*/
		s_kry?: number|null;
		/**DBCOLUMN:ekockry.s_kry_txt*/
		s_kry_txt?: string|null;
		/**DBCOLUMN:ekockry.s_kry_zkr*/
		s_kry_zkr?: string|null;
		/**DBCOLUMN:ekockry.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekockry.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekockry.k_xml*/
		k_xml?: string|null;
	}
	const enum GEkockryDtoNames { s_kry = "s_kry", s_kry_txt = "s_kry_txt", s_kry_zkr = "s_kry_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GEkockryDtoFragments { s_kry = "*", s_kry_txt = "*", s_kry_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GEkockryDtoTypes { s_kry = "number", s_kry_txt = "string", s_kry_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GEkockryDtoTypeLengths { s_kry_txt = 50, s_kry_zkr = 16, k_s = 15, k_xml = 254,}
	/**ENUM:ekockry*/
	const enum GEkockryEnum {
		/**neurčeno*/
		neurceno=0,
		/**návrh*/
		navrh=10,
		/**schváleno*/
		schvaleno=20,
	}
	function GEkockryEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkockryEnum, Gordic.Eko.Interface.GEkockryDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GEkoclikDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:ekoclik*/
	interface GEkoclikDto {
		/**DBCOLUMN:ekoclik.s_lik*/
		s_lik?: number|null;
		/**DBCOLUMN:ekoclik.s_lik_txt*/
		s_lik_txt?: string|null;
		/**DBCOLUMN:ekoclik.s_lik_zkr*/
		s_lik_zkr?: string|null;
		/**DBCOLUMN:ekoclik.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekoclik.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekoclik.k_xml*/
		k_xml?: string|null;
	}
	const enum GEkoclikDtoNames { s_lik = "s_lik", s_lik_txt = "s_lik_txt", s_lik_zkr = "s_lik_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GEkoclikDtoFragments { s_lik = "*", s_lik_txt = "*", s_lik_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GEkoclikDtoTypes { s_lik = "number", s_lik_txt = "string", s_lik_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GEkoclikDtoTypeLengths { s_lik_txt = 50, s_lik_zkr = 16, k_s = 15, k_xml = 254,}
	/**ENUM:ekoclik*/
	const enum GEkoclikEnum {
		/**neurčena*/
		neurcena=0,
		/**návrh*/
		navrh=10,
		/**likvidace záloh schválena*/
		likvidace_zaloh_schvalena=15,
		/**schváleno*/
		schvaleno=20,
	}
	function GEkoclikEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkoclikEnum, Gordic.Eko.Interface.GEkoclikDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GEkosdenDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Vyber knihy podle agendy a dalsich parametru ...*/
	interface GEkosdenDto {
		/**DBCOLUMN:poksden.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:poksden.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:poksden.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:poksden.rok*/
		rok?: number|null;
		/**DBCOLUMN:prefix*/
		prefix?: string|null;
		/**DBCOLUMN:suffix*/
		suffix?: string|null;
		/**DBCOLUMN:ktg_den*/
		ktg_den?: number|null;
		/**DBCOLUMN:typ_den*/
		typ_den?: number|null;
		/**DBCOLUMN:zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:subrada*/
		subrada?: number|null;
		/**DBCOLUMN:akt_subrady*/
		akt_subrady?: number|null;
		/**DBCOLUMN:ktg_den_txt*/
		ktg_den_txt?: string|null;
		/**DBCOLUMN:akt_subrady_txt*/
		akt_subrady_txt?: string|null;
		/**DBCOLUMN:typ_ag*/
		typ_ag?: number|null;
		ixs_vpk?: string|null;
	}
	const enum GEkosdenDtoNames { ixp_den = "ixp_den", aktivita = "aktivita", nazev = "nazev", rok = "rok", prefix = "prefix", suffix = "suffix", ktg_den = "ktg_den", typ_den = "typ_den", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", akt_subrady_txt = "akt_subrady_txt", typ_ag = "typ_ag", ixs_vpk = "ixs_vpk",}
	const enum GEkosdenDtoFragments { ixp_den = "*", aktivita = "*", nazev = "*", rok = "*", prefix = "*", suffix = "*", ktg_den = "*", typ_den = "*", zkratka = "*", subrada = "*", akt_subrady = "*", ktg_den_txt = "*", akt_subrady_txt = "*", typ_ag = "*", ixs_vpk = "*",}
	const enum GEkosdenDtoTypes { ixp_den = "string", aktivita = "number", nazev = "string", rok = "number", prefix = "string", suffix = "string", ktg_den = "number", typ_den = "number", zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", akt_subrady_txt = "string", typ_ag = "number", ixs_vpk = "string",}
	const enum GEkosdenDtoTypeLengths { ixp_den = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GKofspolDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:kofspol*/
	interface GKofspolDto {
		/**DBCOLUMN:kofspol.kod_pol*/
		kod_pol?: string|null;
		/**DBCOLUMN:kofspol.typ_pol*/
		typ_pol?: number|null;
		/**DBCOLUMN:kofspol.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:kofspol.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:kofspol.mj*/
		mj?: string|null;
		/**DBCOLUMN:kofspol.mj_zkr*/
		mj_zkr?: string|null;
		/**DBCOLUMN:kofspol.cmj*/
		cmj?: JsonDecimal|null;
		/**DBCOLUMN:kofspol.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:kofspol.obch_pri*/
		obch_pri?: JsonDecimal|null;
		/**DBCOLUMN:kofspol.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:kofspol.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:kofspol.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:kofspol.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:kofspol.ico*/
		ico?: string|null;
		/**DBCOLUMN:kofctpo.typ_pol_txt*/
		typ_pol_txt?: string|null;
		/**DBCOLUMN:kofspol.kod_klas*/
		kod_klas?: string|null;
		/**DBCOLUMN:kofspol.typ_klas*/
		typ_klas?: number|null;
		/**DBCOLUMN:kofspol.dan_typ_txt*/
		dan_typ_txt?: string|null;
		/**DBCOLUMN:kofspol.aktivita_txt*/
		aktivita_txt?: string|null;
		typ_klas_txt?: string|null;
		/**DBCOLUMN:kofspol.dan_typ_txt*/
		kod_predmetu_nazev?: string|null;
	}
	const enum GKofspolDtoNames { kod_pol = "kod_pol", typ_pol = "typ_pol", nazev = "nazev", mat_cis = "mat_cis", mj = "mj", mj_zkr = "mj_zkr", cmj = "cmj", dan_proc = "dan_proc", obch_pri = "obch_pri", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dan_typ = "dan_typ", ico = "ico", typ_pol_txt = "typ_pol_txt", kod_klas = "kod_klas", typ_klas = "typ_klas", dan_typ_txt = "dan_typ_txt", aktivita_txt = "aktivita_txt", typ_klas_txt = "typ_klas_txt", kod_predmetu_nazev = "kod_predmetu_nazev",}
	const enum GKofspolDtoFragments { kod_pol = "*", typ_pol = "*", nazev = "*", mat_cis = "*", mj = "*", mj_zkr = "*", cmj = "*", dan_proc = "*", obch_pri = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dan_typ = "*", ico = "*", typ_pol_txt = "*", kod_klas = "*", typ_klas = "*", dan_typ_txt = "*", aktivita_txt = "*", typ_klas_txt = "*", kod_predmetu_nazev = "*",}
	const enum GKofspolDtoTypes { kod_pol = "string", typ_pol = "number", nazev = "string", mat_cis = "string", mj = "string", mj_zkr = "string", cmj = "JsonDecimal", dan_proc = "JsonDecimal", obch_pri = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dan_typ = "number", ico = "string", typ_pol_txt = "string", kod_klas = "string", typ_klas = "number", dan_typ_txt = "string", aktivita_txt = "string", typ_klas_txt = "string", kod_predmetu_nazev = "string",}
	const enum GKofspolDtoTypeLengths { kod_pol = 20, nazev = 254, mat_cis = 20, mj = 5, mj_zkr = 16, zmenu_prov = 12, ico = 10, kod_klas = 15, dan_typ_txt = 50, aktivita_txt = 50, typ_klas_txt = 50, kod_predmetu_nazev = 600,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Controls\Dto\GMajsmajEkoDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:majsmaj*/
	interface GMajsmajEkoDto {
		/**DBCOLUMN:majsmaj.ixs_maj -*/
		ixs_maj?: string|null;
		/**DBCOLUMN:majsmaj.inv_cis - Inventární číslo*/
		inv_cis?: string|null;
		/**DBCOLUMN:majsmaj.ser_cis - Sériové číslo*/
		ser_cis?: string|null;
		/**DBCOLUMN:majsmaj.evi_cis - Evidenční číslo*/
		evi_cis?: string|null;
		/**DBCOLUMN:majsmaj.vyr_cis - Výrobní číslo*/
		vyr_cis?: string|null;
		/**DBCOLUMN:majsmaj.skp - Klasifikace*/
		skp?: string|null;
		/**DBCOLUMN:majsmaj.nazev_skp - Název majetku*/
		nazev_skp?: string|null;
		/**DBCOLUMN:majsmaj.nazev - Technický název majetku*/
		nazev?: string|null;
		/**DBCOLUMN:majsmaj.drh_id - Druh majetku*/
		drh_id?: number|null;
		/**DBCOLUMN:majsmaj.skupina_id - Skupina majetku*/
		skupina_id?: number|null;
		/**DBCOLUMN:majsmaj.mj - Měrná jednotka*/
		mj?: string|null;
		/**DBCOLUMN:majsmaj.tev - Typ evidence majetku*/
		tev?: number|null;
		/**DBCOLUMN:majsmaj.tka - Typ karty*/
		tka?: number|null;
		/**DBCOLUMN:majsmaj.mat_akt - Stav majetku*/
		mat_akt?: number|null;
		/**DBCOLUMN:majsmaj.mat_cis - Materiálové číslo*/
		mat_cis?: string|null;
		/**DBCOLUMN:majsmaj.sarze - Šarže*/
		sarze?: string|null;
		/**DBCOLUMN:majsmaj.zev - Způsob evidence*/
		zev?: number|null;
	}
	const enum GMajsmajEkoDtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", vyr_cis = "vyr_cis", skp = "skp", nazev_skp = "nazev_skp", nazev = "nazev", drh_id = "drh_id", skupina_id = "skupina_id", mj = "mj", tev = "tev", tka = "tka", mat_akt = "mat_akt", mat_cis = "mat_cis", sarze = "sarze", zev = "zev",}
	const enum GMajsmajEkoDtoFragments { ixs_maj = "*", inv_cis = "*", ser_cis = "*", evi_cis = "*", vyr_cis = "*", skp = "*", nazev_skp = "*", nazev = "*", drh_id = "*", skupina_id = "*", mj = "*", tev = "*", tka = "*", mat_akt = "*", mat_cis = "*", sarze = "*", zev = "*",}
	const enum GMajsmajEkoDtoTypes { ixs_maj = "string", inv_cis = "string", ser_cis = "string", evi_cis = "string", vyr_cis = "string", skp = "string", nazev_skp = "string", nazev = "string", drh_id = "number", skupina_id = "number", mj = "string", tev = "number", tka = "number", mat_akt = "number", mat_cis = "string", sarze = "string", zev = "number",}
	const enum GMajsmajEkoDtoTypeLengths { ixs_maj = 12, inv_cis = 50, ser_cis = 40, evi_cis = 40, vyr_cis = 40, skp = 15, nazev_skp = 254, nazev = 254, mj = 5, mat_cis = 20, sarze = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\CSUIS\IGCsuis.d.ts 

declare namespace Gordic.Eko.Interface {
	interface GCSUISZpravaDto {
		/**ZpravaId*/
		ZpravaId?: string|null;
		/**IC*/
		IC?: string|null;
		/**ZpravaDatumVytvoreni*/
		ZpravaDatumVytvoreni?: string|null;
		/**ZpravaDatumPublikace*/
		ZpravaDatumPublikace?: string|null;
		/**ZpravaStatus*/
		ZpravaStatus?: string|null;
		/**TypDatoveZpravy*/
		TypDatoveZpravy?: string|null;
		/**ZpravaNazev*/
		ZpravaNazev?: string|null;
	}
	const enum GCSUISZpravaDtoNames { ZpravaId = "ZpravaId", IC = "IC", ZpravaDatumVytvoreni = "ZpravaDatumVytvoreni", ZpravaDatumPublikace = "ZpravaDatumPublikace", ZpravaStatus = "ZpravaStatus", TypDatoveZpravy = "TypDatoveZpravy", ZpravaNazev = "ZpravaNazev",}
	const enum GCSUISZpravaDtoFragments { ZpravaId = "*", IC = "*", ZpravaDatumVytvoreni = "*", ZpravaDatumPublikace = "*", ZpravaStatus = "*", TypDatoveZpravy = "*", ZpravaNazev = "*",}
	const enum GCSUISZpravaDtoTypes { ZpravaId = "string", IC = "string", ZpravaDatumVytvoreni = "string", ZpravaDatumPublikace = "string", ZpravaStatus = "string", TypDatoveZpravy = "string", ZpravaNazev = "string",}
	const enum GCSUISZpravaDtoTypeLengths {}
	interface GCSUISZpravaStavDetailDto {
		/**Timestamp*/
		Timestamp?: string|null;
		/**Komponenta*/
		Komponenta?: string|null;
		/**ZaznamTyp*/
		ZaznamTyp?: string|null;
		/**ZaznamText*/
		ZaznamText?: string|null;
	}
	const enum GCSUISZpravaStavDetailDtoNames { Timestamp = "Timestamp", Komponenta = "Komponenta", ZaznamTyp = "ZaznamTyp", ZaznamText = "ZaznamText",}
	const enum GCSUISZpravaStavDetailDtoFragments { Timestamp = "*", Komponenta = "*", ZaznamTyp = "*", ZaznamText = "*",}
	const enum GCSUISZpravaStavDetailDtoTypes { Timestamp = "string", Komponenta = "string", ZaznamTyp = "string", ZaznamText = "string",}
	const enum GCSUISZpravaStavDetailDtoTypeLengths {}
	interface GCSUISZpravaStavDto {
		/**ZpravaId*/
		ZpravaId?: string|null;
		/**IC*/
		IC?: string|null;
		/**ZpravaDatumVytvoreni*/
		ZpravaDatumVytvoreni?: string|null;
		/**ZpravaDatumPublikace*/
		ZpravaDatumPublikace?: string|null;
		/**ZpravaStatus*/
		ZpravaStatus?: string|null;
		/**TypDatoveZpravy*/
		TypDatoveZpravy?: string|null;
		/**ZpravaNazev*/
		ZpravaNazev?: string|null;
		/**RefIdPrenosu*/
		RefIdPrenosu?: string|null;
		/**StavId*/
		StavId?: string|null;
		/**StavTyp*/
		StavTyp?: string|null;
		/**StavNazev*/
		StavNazev?: string|null;
		/**StavPopis*/
		StavPopis?: string|null;
		/**detaily*/
		detaily?: Gordic.Eko.Interface.GCSUISZpravaStavDetailDto[]|null;
	}
	const enum GCSUISZpravaStavDtoNames { ZpravaId = "ZpravaId", IC = "IC", ZpravaDatumVytvoreni = "ZpravaDatumVytvoreni", ZpravaDatumPublikace = "ZpravaDatumPublikace", ZpravaStatus = "ZpravaStatus", TypDatoveZpravy = "TypDatoveZpravy", ZpravaNazev = "ZpravaNazev", RefIdPrenosu = "RefIdPrenosu", StavId = "StavId", StavTyp = "StavTyp", StavNazev = "StavNazev", StavPopis = "StavPopis", detaily = "detaily",}
	const enum GCSUISZpravaStavDtoFragments { ZpravaId = "*", IC = "*", ZpravaDatumVytvoreni = "*", ZpravaDatumPublikace = "*", ZpravaStatus = "*", TypDatoveZpravy = "*", ZpravaNazev = "*", RefIdPrenosu = "*", StavId = "*", StavTyp = "*", StavNazev = "*", StavPopis = "*", detaily = "*",}
	const enum GCSUISZpravaStavDtoTypes { ZpravaId = "string", IC = "string", ZpravaDatumVytvoreni = "string", ZpravaDatumPublikace = "string", ZpravaStatus = "string", TypDatoveZpravy = "string", ZpravaNazev = "string", RefIdPrenosu = "string", StavId = "string", StavTyp = "string", StavNazev = "string", StavPopis = "string", detaily = "Gordic.Eko.Interface.GCSUISZpravaStavDetailDto[]",}
	const enum GCSUISZpravaStavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Dashboard\GEkoDashboardDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**GEkoDashboardRadekDto*/
	interface GEkoDashboardRadekDto {
		/**id_radek*/
		id?: string|null;
		/**description*/
		description?: string|null;
		/**tooltip*/
		tooltip?: string|null;
		/**value*/
		value?: JsonDecimal|null;
		/**formatter*/
		formatter?: string|null;
		/**meaning*/
		meaning?: string|null;
		/**unit*/
		unit?: string|null;
	}
	const enum GEkoDashboardRadekDtoNames { id = "id", description = "description", tooltip = "tooltip", value = "value", formatter = "formatter", meaning = "meaning", unit = "unit",}
	const enum GEkoDashboardRadekDtoFragments { id = "*", description = "*", tooltip = "*", value = "*", formatter = "*", meaning = "*", unit = "*",}
	const enum GEkoDashboardRadekDtoTypes { id = "string", description = "string", tooltip = "string", value = "JsonDecimal", formatter = "string", meaning = "string", unit = "string",}
	const enum GEkoDashboardRadekDtoTypeLengths {}
	/**GEkoDashboardBlokDto*/
	interface GEkoDashboardBlokDto {
		/**id_blok*/
		id?: string|null;
		/**typ*/
		typ?: string|null;
		/**title*/
		title?: string|null;
		/**detailsDirection*/
		detailsDirection?: string|null;
		/**text1*/
		text1?: string|null;
		/**text2*/
		text2?: string|null;
		/**rok*/
		details?: Gordic.Eko.Interface.GEkoDashboardRadekDto[]|null;
	}
	const enum GEkoDashboardBlokDtoNames { id = "id", typ = "typ", title = "title", detailsDirection = "detailsDirection", text1 = "text1", text2 = "text2", details = "details",}
	const enum GEkoDashboardBlokDtoFragments { id = "*", typ = "*", title = "*", detailsDirection = "*", text1 = "*", text2 = "*", details = "*",}
	const enum GEkoDashboardBlokDtoTypes { id = "string", typ = "string", title = "string", detailsDirection = "string", text1 = "string", text2 = "string", details = "Gordic.Eko.Interface.GEkoDashboardRadekDto[]",}
	const enum GEkoDashboardBlokDtoTypeLengths {}
	/**GEkoDashboardDto*/
	interface GEkoDashboardDto {
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
		/**ico*/
		ico?: string|null;
		/**rok*/
		data?: Gordic.Eko.Interface.GEkoDashboardBlokDto[]|null;
	}
	const enum GEkoDashboardDtoNames { rok = "rok", mesic = "mesic", ico = "ico", data = "data",}
	const enum GEkoDashboardDtoFragments { rok = "*", mesic = "*", ico = "*", data = "*",}
	const enum GEkoDashboardDtoTypes { rok = "number", mesic = "number", ico = "string", data = "Gordic.Eko.Interface.GEkoDashboardBlokDto[]",}
	const enum GEkoDashboardDtoTypeLengths {}
	/**
	*     Výčet filtračních kritérií 
	*     
	*/
	const enum FilEkoDashboard {
		/**rok*/
		rok,
		/**mesic*/
		mesic,
		/**ico*/
		ico,
	}
	/**filtr DTO pro srvsxpf*/
	interface GEkoDashboardFilterDto {
		/**
		*     rok
		*     
		*/
		rok?: number|null;
		/**
		*     mesic
		*     
		*/
		mesic?: number|null;
		/**
		*     ico
		*     
		*/
		ico?: string|null;
	}
	const enum GEkoDashboardFilterDtoNames { rok = "rok", mesic = "mesic", ico = "ico",}
	const enum GEkoDashboardFilterDtoFragments { rok = "*", mesic = "*", ico = "*",}
	const enum GEkoDashboardFilterDtoTypes { rok = "number", mesic = "number", ico = "string",}
	const enum GEkoDashboardFilterDtoTypeLengths {}
	/**GEkoDashboardRadekDto*/
	interface GEkoDashboardRadkyDto {
		/**castka_01*/
		castka_01?: JsonDecimal|null;
		/**castka_02*/
		castka_02?: JsonDecimal|null;
		/**castka_03*/
		castka_03?: JsonDecimal|null;
		/**castka_04*/
		castka_04?: JsonDecimal|null;
		/**castka_05*/
		castka_05?: JsonDecimal|null;
		/**castka_06*/
		castka_06?: JsonDecimal|null;
		/**castka_07*/
		castka_07?: JsonDecimal|null;
		/**castka_08*/
		castka_08?: JsonDecimal|null;
		/**castka_09*/
		castka_09?: JsonDecimal|null;
		/**castka_10*/
		castka_10?: JsonDecimal|null;
		/**castka_11*/
		castka_11?: JsonDecimal|null;
		/**castka_12*/
		castka_12?: JsonDecimal|null;
		/**castka_13*/
		castka_13?: JsonDecimal|null;
		/**castka_14*/
		castka_14?: JsonDecimal|null;
		/**castka_15*/
		castka_15?: JsonDecimal|null;
	}
	const enum GEkoDashboardRadkyDtoNames { castka_01 = "castka_01", castka_02 = "castka_02", castka_03 = "castka_03", castka_04 = "castka_04", castka_05 = "castka_05", castka_06 = "castka_06", castka_07 = "castka_07", castka_08 = "castka_08", castka_09 = "castka_09", castka_10 = "castka_10", castka_11 = "castka_11", castka_12 = "castka_12", castka_13 = "castka_13", castka_14 = "castka_14", castka_15 = "castka_15",}
	const enum GEkoDashboardRadkyDtoFragments { castka_01 = "*", castka_02 = "*", castka_03 = "*", castka_04 = "*", castka_05 = "*", castka_06 = "*", castka_07 = "*", castka_08 = "*", castka_09 = "*", castka_10 = "*", castka_11 = "*", castka_12 = "*", castka_13 = "*", castka_14 = "*", castka_15 = "*",}
	const enum GEkoDashboardRadkyDtoTypes { castka_01 = "JsonDecimal", castka_02 = "JsonDecimal", castka_03 = "JsonDecimal", castka_04 = "JsonDecimal", castka_05 = "JsonDecimal", castka_06 = "JsonDecimal", castka_07 = "JsonDecimal", castka_08 = "JsonDecimal", castka_09 = "JsonDecimal", castka_10 = "JsonDecimal", castka_11 = "JsonDecimal", castka_12 = "JsonDecimal", castka_13 = "JsonDecimal", castka_14 = "JsonDecimal", castka_15 = "JsonDecimal",}
	const enum GEkoDashboardRadkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Dashboard\IGEkoDashboard.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**interface pro EkoDashboard
	* @domain EkoDashboard
	* @businessObject EkoDashboard
	*/
	interface EkoDashboard {
		/**GetEkoDashboardData*/
		getEkoDashboardData(rq?:Gordic.Eko.Interface.GEkoDashboardFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoDashboardDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoDashboard: ServiceBase & Catalog.EkoDashboard;
	}
	const EkoDashboard: Client["EkoDashboard"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GEkodkpl.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkodkplDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.radek_pde*/
		radek_pde?: number|null;
		/**DBCOLUMN:Seznam.typ_klas*/
		typ_klas?: number|null;
		/**DBCOLUMN:Seznam.kod_klas*/
		kod_klas?: string|null;
		/**DBCOLUMN:Seznam.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:Seznam.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_z*/
		c_z?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_d*/
		c_d?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkodkplDtoNames { ixp = "ixp", radek_pde = "radek_pde", typ_klas = "typ_klas", kod_klas = "kod_klas", dan_typ = "dan_typ", dan_proc = "dan_proc", c_z = "c_z", c_d = "c_d", radek_z = "radek_z", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkodkplDtoFragments { ixp = "*", radek_pde = "*", typ_klas = "*", kod_klas = "*", dan_typ = "*", dan_proc = "*", c_z = "*", c_d = "*", radek_z = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkodkplDtoTypes { ixp = "string", radek_pde = "number", typ_klas = "number", kod_klas = "string", dan_typ = "number", dan_proc = "JsonDecimal", c_z = "JsonDecimal", c_d = "JsonDecimal", radek_z = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkodkplDtoTypeLengths { ixp = 12, kod_klas = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GEkospde.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GEkospdeDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.radek_pde*/
		radek_pde?: number|null;
		/**DBCOLUMN:Seznam.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:Seznam.ec_dd*/
		ec_dd?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.dic_esu*/
		dic_esu?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.osoba_esu*/
		osoba_esu?: string|null;
		/**DBCOLUMN:Seznam.dat_nar_esu*/
		dat_nar_esu?: JsonDate|null;
		/**DBCOLUMN:Seznam.adresa_esu*/
		adresa_esu?: string|null;
		/**DBCOLUMN:Seznam.dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_upd*/
		dat_upd?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dor*/
		dat_dor?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:Seznam.priz_ozp*/
		priz_ozp?: number|null;
		/**DBCOLUMN:Seznam.priz_pomer*/
		priz_pomer?: number|null;
		/**DBCOLUMN:Seznam.priz_inr*/
		priz_inr?: number|null;
		/**DBCOLUMN:Seznam.ec_dd_puv*/
		ec_dd_puv?: string|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.priz_pdp*/
		priz_pdp?: number|null;
		/**DBCOLUMN:Seznam.priz_zpl*/
		priz_zpl?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ec_dd_o*/
		ec_dd_o?: string|null;
		/**DBCOLUMN:Seznam.dic_esu_o*/
		dic_esu_o?: string|null;
		/**DBCOLUMN:Seznam.dat_nar_esu_o*/
		dat_nar_esu_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_upd_o*/
		dat_upd_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.priz_zahr*/
		priz_zahr?: number|null;
		/**DBCOLUMN:Seznam.ixp_prim*/
		ixp_prim?: string|null;
		/**DBCOLUMN:Seznam.radek_pde_prim*/
		radek_pde_prim?: number|null;
	}
	const enum GEkospdeDtoNames { ixp = "ixp", radek_pde = "radek_pde", rok_dph = "rok_dph", ec_dd = "ec_dd", ixs_esu = "ixs_esu", dic_esu = "dic_esu", ico_esu = "ico_esu", osoba_esu = "osoba_esu", dat_nar_esu = "dat_nar_esu", adresa_esu = "adresa_esu", dat_zdan = "dat_zdan", dat_upd = "dat_upd", dat_vyst = "dat_vyst", dat_dor = "dat_dor", dat_evid = "dat_evid", priz_ozp = "priz_ozp", priz_pomer = "priz_pomer", priz_inr = "priz_inr", ec_dd_puv = "ec_dd_puv", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixp_den = "ixp_den", priz_pdp = "priz_pdp", priz_zpl = "priz_zpl", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ec_dd_o = "ec_dd_o", dic_esu_o = "dic_esu_o", dat_nar_esu_o = "dat_nar_esu_o", dat_upd_o = "dat_upd_o", priz_zahr = "priz_zahr", ixp_prim = "ixp_prim", radek_pde_prim = "radek_pde_prim",}
	const enum GEkospdeDtoFragments { ixp = "*", radek_pde = "*", rok_dph = "*", ec_dd = "*", ixs_esu = "*", dic_esu = "*", ico_esu = "*", osoba_esu = "*", dat_nar_esu = "*", adresa_esu = "*", dat_zdan = "*", dat_upd = "*", dat_vyst = "*", dat_dor = "*", dat_evid = "*", priz_ozp = "*", priz_pomer = "*", priz_inr = "*", ec_dd_puv = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", ixp_den = "*", priz_pdp = "*", priz_zpl = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ec_dd_o = "*", dic_esu_o = "*", dat_nar_esu_o = "*", dat_upd_o = "*", priz_zahr = "*", ixp_prim = "*", radek_pde_prim = "*",}
	const enum GEkospdeDtoTypes { ixp = "string", radek_pde = "number", rok_dph = "number", ec_dd = "string", ixs_esu = "string", dic_esu = "string", ico_esu = "string", osoba_esu = "string", dat_nar_esu = "JsonDate", adresa_esu = "string", dat_zdan = "JsonDate", dat_upd = "JsonDate", dat_vyst = "JsonDate", dat_dor = "JsonDate", dat_evid = "JsonDate", priz_ozp = "number", priz_pomer = "number", priz_inr = "number", ec_dd_puv = "string", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", ixp_den = "string", priz_pdp = "number", priz_zpl = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ec_dd_o = "string", dic_esu_o = "string", dat_nar_esu_o = "JsonDate", dat_upd_o = "JsonDate", priz_zahr = "number", ixp_prim = "string", radek_pde_prim = "number",}
	const enum GEkospdeDtoTypeLengths { ixp = 12, ec_dd = 60, ixs_esu = 12, dic_esu = 15, ico_esu = 10, osoba_esu = 57, adresa_esu = 100, ec_dd_puv = 60, ixs_typ = 12, ixp_den = 12, zmenu_prov = 12, ec_dd_o = 60, dic_esu_o = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GSmlapid.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlapidDto {
		/**DBCOLUMN:Seznam.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_pol*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:Seznam.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.por_cislo_nab*/
		por_cislo_nab?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:Seznam.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Seznam.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:Seznam.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:Seznam.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:Seznam.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.priz_pzp*/
		priz_pzp?: number|null;
		/**DBCOLUMN:Seznam.mena_txt*/
		mena_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz_txt*/
		ixs_fun_vyriz_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_ref_txt*/
		ixs_fun_ref_txt?: string|null;
		/**DBCOLUMN:Seznam.popis2*/
		popis2?: string|null;
		/**DBCOLUMN:Seznam.rc_esu*/
		rc_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.rok_smlsden*/
		rok_smlsden?: number|null;
		/**DBCOLUMN:Seznam.nazev_smlsden*/
		nazev_smlsden?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_prev*/
		ixs_prev?: string|null;
		/**DBCOLUMN:Seznam.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:Seznam.typ_spo*/
		typ_spo?: number|null;
		/**DBCOLUMN:Seznam.priz_spo*/
		priz_spo?: number|null;
		/**DBCOLUMN:Seznam.priz_uroc*/
		priz_uroc?: number|null;
		/**DBCOLUMN:Seznam.c_spo*/
		c_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.zak_upr*/
		zak_upr?: number|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.cis_real_txt*/
		cis_real_txt?: string|null;
	}
	const enum GSmlapidDtoNames { ixp_sml_pri = "ixp_sml_pri", ico = "ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c = "c", c_pol = "c_pol", c_fak = "c_fak", mena = "mena", ktg_sml = "ktg_sml", dat_uzavreni = "dat_uzavreni", dat_ucinnost = "dat_ucinnost", dat_platnost = "dat_platnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", por_cislo_nab = "por_cislo_nab", typ_ag_blok = "typ_ag_blok", fin_od = "fin_od", fin_do = "fin_do", sml_stav = "sml_stav", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", ac_ver_zak = "ac_ver_zak", ixs_typ = "ixs_typ", popis = "popis", nazev = "nazev", ac_sml = "ac_sml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pzp = "priz_pzp", mena_txt = "mena_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", popis2 = "popis2", rc_esu = "rc_esu", ixs_esu_txt = "ixs_esu_txt", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", bu_vl = "bu_vl", sk_vl = "sk_vl", rok_smlsden = "rok_smlsden", nazev_smlsden = "nazev_smlsden", ktg_typ_txt = "ktg_typ_txt", kurz = "kurz", ktg_typ = "ktg_typ", ixs_prev = "ixs_prev", typ_pen = "typ_pen", typ_spo = "typ_spo", priz_spo = "priz_spo", priz_uroc = "priz_uroc", c_spo = "c_spo", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", proc_spo = "proc_spo", zak_upr = "zak_upr", ac = "ac", vs = "vs", cis_real_txt = "cis_real_txt",}
	const enum GSmlapidDtoFragments { ixp_sml_pri = "*", ico = "*", ucs = "*", nks = "*", c_mena = "*", c = "*", c_pol = "*", c_fak = "*", mena = "*", ktg_sml = "*", dat_uzavreni = "*", dat_ucinnost = "*", dat_platnost = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", cis_real = "*", ixs_pri = "*", ixp_nab = "*", por_cislo_nab = "*", typ_ag_blok = "*", fin_od = "*", fin_do = "*", sml_stav = "*", sgn_stav = "*", typ_ceny = "*", ac_ver_zak = "*", ixs_typ = "*", popis = "*", nazev = "*", ac_sml = "*", dat_zmena = "*", zmenu_prov = "*", priz_pzp = "*", mena_txt = "*", ixs_fun_vyriz_txt = "*", ixs_fun_ref_txt = "*", popis2 = "*", rc_esu = "*", ixs_esu_txt = "*", ico_esu = "*", bu_ci = "*", sk_ci = "*", ixs_esu = "*", bu_vl = "*", sk_vl = "*", rok_smlsden = "*", nazev_smlsden = "*", ktg_typ_txt = "*", kurz = "*", ktg_typ = "*", ixs_prev = "*", typ_pen = "*", typ_spo = "*", priz_spo = "*", priz_uroc = "*", c_spo = "*", c_sazba_pen = "*", proc_sazba_pen = "*", proc_spo = "*", zak_upr = "*", ac = "*", vs = "*", cis_real_txt = "*",}
	const enum GSmlapidDtoTypes { ixp_sml_pri = "string", ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", c_fak = "JsonDecimal", mena = "number", ktg_sml = "number", dat_uzavreni = "JsonDate", dat_ucinnost = "JsonDate", dat_platnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", ixs_pri = "string", ixp_nab = "string", por_cislo_nab = "number", typ_ag_blok = "number", fin_od = "number", fin_do = "number", sml_stav = "number", sgn_stav = "number", typ_ceny = "number", ac_ver_zak = "string", ixs_typ = "string", popis = "string", nazev = "string", ac_sml = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pzp = "number", mena_txt = "string", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", popis2 = "string", rc_esu = "string", ixs_esu_txt = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", bu_vl = "string", sk_vl = "string", rok_smlsden = "number", nazev_smlsden = "string", ktg_typ_txt = "string", kurz = "JsonDecimal", ktg_typ = "number", ixs_prev = "string", typ_pen = "number", typ_spo = "number", priz_spo = "number", priz_uroc = "number", c_spo = "JsonDecimal", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", proc_spo = "JsonDecimal", zak_upr = "number", ac = "string", vs = "string", cis_real_txt = "string",}
	const enum GSmlapidDtoTypeLengths { ixp_sml_pri = 12, ico = 10, ucs = 10, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, cis_real = 6, ixs_pri = 12, ixp_nab = 12, ac_ver_zak = 30, ixs_typ = 12, popis = 254, ac_sml = 30, zmenu_prov = 12, ixs_prev = 12, ac = 30, cis_real_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GSmlspol.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlspolDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.cislo*/
		cislo?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_vznik*/
		dat_vznik?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:Seznam.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:Seznam.uea_rr*/
		uea_rr?: string|null;
		/**DBCOLUMN:Seznam.ueb_rr*/
		ueb_rr?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:Seznam.znam*/
		znam?: number|null;
		/**DBCOLUMN:Seznam.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:Seznam.priz_zaz*/
		priz_zaz?: number|null;
		/**DBCOLUMN:Seznam.c_zbyva*/
		c_zbyva?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.bu_vl_txt*/
		bu_vl_txt?: string|null;
	}
	const enum GSmlspolDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", cis_pol_pla = "cis_pol_pla", nazev = "nazev", up_stav = "up_stav", c = "c", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vznik = "dat_vznik", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", xuete = "xuete", priz_zaz = "priz_zaz", c_zbyva = "c_zbyva", ac_sml = "ac_sml", bu_vl_txt = "bu_vl_txt",}
	const enum GSmlspolDtoFragments { ixp = "*", rok = "*", cislo = "*", lic = "*", cis_pol_pla = "*", nazev = "*", up_stav = "*", c = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", sk_vl = "*", bu_vl = "*", c_fak = "*", dat_zmena = "*", zmenu_prov = "*", dat_vznik = "*", c_obj_sml = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", typ_ag_blok = "*", znam = "*", xuete = "*", priz_zaz = "*", c_zbyva = "*", ac_sml = "*", bu_vl_txt = "*",}
	const enum GSmlspolDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", cis_pol_pla = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", sk_vl = "string", bu_vl = "string", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vznik = "JsonDate", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", xuete = "string", priz_zaz = "number", c_zbyva = "JsonDecimal", ac_sml = "string", bu_vl_txt = "string",}
	const enum GSmlspolDtoTypeLengths { ixp = 12, lic = 4, cis_pol_pla = 16, nazev = 254, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, zmenu_prov = 12, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, xuete = 148,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GUctRozdkon.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctRozdkonDto {
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.radek*/
		radek?: number|null;
		/**DBCOLUMN:Seznam.uea_t*/
		uea_t?: string|null;
		/**DBCOLUMN:Seznam.ueb_t*/
		ueb_t?: string|null;
		/**DBCOLUMN:Seznam.uec_t*/
		uec_t?: string|null;
		/**DBCOLUMN:Seznam.ued_t*/
		ued_t?: string|null;
		/**DBCOLUMN:Seznam.uee_t*/
		uee_t?: string|null;
		/**DBCOLUMN:Seznam.uef_t*/
		uef_t?: string|null;
		/**DBCOLUMN:Seznam.ueg_t*/
		ueg_t?: string|null;
		/**DBCOLUMN:Seznam.ueh_t*/
		ueh_t?: string|null;
		/**DBCOLUMN:Seznam.uei_t*/
		uei_t?: string|null;
		/**DBCOLUMN:Seznam.uej_t*/
		uej_t?: string|null;
		/**DBCOLUMN:Seznam.uek_t*/
		uek_t?: string|null;
		/**DBCOLUMN:Seznam.uel_t*/
		uel_t?: string|null;
		/**DBCOLUMN:Seznam.uem_t*/
		uem_t?: string|null;
		/**DBCOLUMN:Seznam.uen_t*/
		uen_t?: string|null;
		/**DBCOLUMN:Seznam.te0_t*/
		te0_t?: string|null;
		/**DBCOLUMN:Seznam.te1_t*/
		te1_t?: string|null;
		/**DBCOLUMN:Seznam.te2_t*/
		te2_t?: string|null;
		/**DBCOLUMN:Seznam.te3_t*/
		te3_t?: string|null;
		/**DBCOLUMN:Seznam.te4_t*/
		te4_t?: string|null;
		/**DBCOLUMN:Seznam.te5_t*/
		te5_t?: string|null;
		/**DBCOLUMN:Seznam.te6_t*/
		te6_t?: string|null;
		/**DBCOLUMN:Seznam.te7_t*/
		te7_t?: string|null;
		/**DBCOLUMN:Seznam.te8_t*/
		te8_t?: string|null;
		/**DBCOLUMN:Seznam.te9_t*/
		te9_t?: string|null;
		/**DBCOLUMN:Seznam.c0_t*/
		c0_t?: string|null;
		/**DBCOLUMN:Seznam.c1_t*/
		c1_t?: string|null;
		/**DBCOLUMN:Seznam.naz_t*/
		naz_t?: string|null;
		/**DBCOLUMN:Seznam.nks_t*/
		nks_t?: string|null;
		/**DBCOLUMN:Seznam.sml_t*/
		sml_t?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
	}
	const enum GUctRozdkonDtoNames { ixs_kon = "ixs_kon", radek = "radek", uea_t = "uea_t", ueb_t = "ueb_t", uec_t = "uec_t", ued_t = "ued_t", uee_t = "uee_t", uef_t = "uef_t", ueg_t = "ueg_t", ueh_t = "ueh_t", uei_t = "uei_t", uej_t = "uej_t", uek_t = "uek_t", uel_t = "uel_t", uem_t = "uem_t", uen_t = "uen_t", te0_t = "te0_t", te1_t = "te1_t", te2_t = "te2_t", te3_t = "te3_t", te4_t = "te4_t", te5_t = "te5_t", te6_t = "te6_t", te7_t = "te7_t", te8_t = "te8_t", te9_t = "te9_t", c0_t = "c0_t", c1_t = "c1_t", naz_t = "naz_t", nks_t = "nks_t", sml_t = "sml_t", radek_z = "radek_z",}
	const enum GUctRozdkonDtoFragments { ixs_kon = "*", radek = "*", uea_t = "*", ueb_t = "*", uec_t = "*", ued_t = "*", uee_t = "*", uef_t = "*", ueg_t = "*", ueh_t = "*", uei_t = "*", uej_t = "*", uek_t = "*", uel_t = "*", uem_t = "*", uen_t = "*", te0_t = "*", te1_t = "*", te2_t = "*", te3_t = "*", te4_t = "*", te5_t = "*", te6_t = "*", te7_t = "*", te8_t = "*", te9_t = "*", c0_t = "*", c1_t = "*", naz_t = "*", nks_t = "*", sml_t = "*", radek_z = "*",}
	const enum GUctRozdkonDtoTypes { ixs_kon = "string", radek = "number", uea_t = "string", ueb_t = "string", uec_t = "string", ued_t = "string", uee_t = "string", uef_t = "string", ueg_t = "string", ueh_t = "string", uei_t = "string", uej_t = "string", uek_t = "string", uel_t = "string", uem_t = "string", uen_t = "string", te0_t = "string", te1_t = "string", te2_t = "string", te3_t = "string", te4_t = "string", te5_t = "string", te6_t = "string", te7_t = "string", te8_t = "string", te9_t = "string", c0_t = "string", c1_t = "string", naz_t = "string", nks_t = "string", sml_t = "string", radek_z = "number",}
	const enum GUctRozdkonDtoTypeLengths { ixs_kon = 12, uea_t = 34, ueb_t = 34, uec_t = 34, ued_t = 34, uee_t = 34, uef_t = 34, ueg_t = 34, ueh_t = 34, uei_t = 34, uej_t = 34, uek_t = 34, uel_t = 34, uem_t = 34, uen_t = 34, te0_t = 34, te1_t = 34, te2_t = 34, te3_t = 34, te4_t = 34, te5_t = 34, te6_t = 34, te7_t = 34, te8_t = 34, te9_t = 34, c0_t = 20, c1_t = 20, naz_t = 254, nks_t = 20, sml_t = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GUctRozskon.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctRozskonDto {
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.kod*/
		kod?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.typ_kon*/
		typ_kon?: number|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**Vlastnik*/
		vlastnik?: string|null;
		/**Typ agendy*/
		typAg?: number|null;
	}
	const enum GUctRozskonDtoNames { ixs_kon = "ixs_kon", aktivita = "aktivita", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_kon = "typ_kon", k_v = "k_v", ixs_fun = "ixs_fun", vlastnik = "vlastnik", typAg = "typAg",}
	const enum GUctRozskonDtoFragments { ixs_kon = "*", aktivita = "*", kod = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", typ_kon = "*", k_v = "*", ixs_fun = "*", vlastnik = "*", typAg = "*",}
	const enum GUctRozskonDtoTypes { ixs_kon = "string", aktivita = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", typ_kon = "number", k_v = "number", ixs_fun = "string", vlastnik = "string", typAg = "number",}
	const enum GUctRozskonDtoTypeLengths { ixs_kon = 12, kod = 30, zkratka = 16, nazev = 254, poznamka = 50, zmenu_prov = 12, ixs_fun = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GWflspidSimple.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GWflspidSimpleDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.historickyZapis*/
		historickyZapis?: number|null;
		/**DBCOLUMN:Seznam.zkr_ag*/
		zkr_ag?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.ec*/
		ec?: string|null;
		/**DBCOLUMN:Seznam.kniha*/
		kniha?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.EsuNazev*/
		EsuNazev?: string|null;
		/**DBCOLUMN:Seznam.EsuIco*/
		EsuIco?: string|null;
		/**DBCOLUMN:Seznam.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt_txt*/
		ixs_fun_akt_txt?: string|null;
	}
	const enum GWflspidSimpleDtoNames { ixp = "ixp", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", historickyZapis = "historickyZapis", zkr_ag = "zkr_ag", ac = "ac", ixs_typ_txt = "ixs_typ_txt", vs = "vs", ec = "ec", kniha = "kniha", rok = "rok", EsuNazev = "EsuNazev", EsuIco = "EsuIco", esu_txt = "esu_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt",}
	const enum GWflspidSimpleDtoFragments { ixp = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", dat_zmena = "*", zmenu_prov = "*", historickyZapis = "*", zkr_ag = "*", ac = "*", ixs_typ_txt = "*", vs = "*", ec = "*", kniha = "*", rok = "*", EsuNazev = "*", EsuIco = "*", esu_txt = "*", ixs_fun_akt_txt = "*",}
	const enum GWflspidSimpleDtoTypes { ixp = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", dat_zmena = "JsonDate", zmenu_prov = "string", historickyZapis = "number", zkr_ag = "string", ac = "string", ixs_typ_txt = "string", vs = "string", ec = "string", kniha = "string", rok = "number", EsuNazev = "string", EsuIco = "string", esu_txt = "string", ixs_fun_akt_txt = "string",}
	const enum GWflspidSimpleDtoTypeLengths { ixp = 12, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, akt_znacka = 50, ixs_typ = 12, zmenu_prov = 12, ac = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Datasets\GZapisyDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GZapisyDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uel?: string|null;
		uem?: string|null;
		ue2?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.m0*/
		m0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m1*/
		m1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.mesic_uej*/
		mesic_uej?: number|null;
		/**DBCOLUMN:Seznam.rok_uej*/
		rok_uej?: number|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.ixb_dzu*/
		ixb_dzu?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GZapisyDtoNames { ixp = "ixp", rok = "rok", ico = "ico", ac = "ac", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", ue2 = "ue2", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", typ_ag = "typ_ag", den = "den", mesic = "mesic", drd = "drd", radek_z = "radek_z", m0 = "m0", m1 = "m1", c1 = "c1", c0 = "c0", mesic_uej = "mesic_uej", rok_uej = "rok_uej", popis = "popis", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", ixb_dzu = "ixb_dzu", dat_zmena = "dat_zmena",}
	const enum GZapisyDtoFragments { ixp = "*", rok = "*", ico = "*", ac = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", ue2 = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", typ_ag = "*", den = "*", mesic = "*", drd = "*", radek_z = "*", m0 = "*", m1 = "*", c1 = "*", c0 = "*", mesic_uej = "*", rok_uej = "*", popis = "*", id_hdr_ris = "*", radek_hdr = "*", ixb_dzu = "*", dat_zmena = "*",}
	const enum GZapisyDtoTypes { ixp = "string", rok = "number", ico = "string", ac = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", ue2 = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", typ_ag = "number", den = "number", mesic = "number", drd = "number", radek_z = "number", m0 = "JsonDecimal", m1 = "JsonDecimal", c1 = "JsonDecimal", c0 = "JsonDecimal", mesic_uej = "number", rok_uej = "number", popis = "string", id_hdr_ris = "string", radek_hdr = "number", ixb_dzu = "string", dat_zmena = "JsonDate",}
	const enum GZapisyDtoTypeLengths { ixp = 12, ico = 10, ac = 30, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 16, uel = 10, uem = 10, ue2 = 6, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\IGEkoKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Obecná kniha vrstvy EKO*/
	interface EkoKniha {
		/**zjištění předdefinovaného typu dokladu v závislosti na aktuální knize EkoInit.IxpDen*/
		getIxsTypDefBook(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**Lists the specified request.*/
		list(rq?:Gordic.Eko.Interface.GBookFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosdenDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoKniha: ServiceBase & Catalog.EkoKniha;
	}
	const EkoKniha: Client["EkoKniha"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DanovaEvidence\GDanovaEvidenceEditSettingsDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto pro nastavení přístupnosti jednotlivých tlačítek/políček v danove evidenci*/
	interface GDanovaEvidenceEditSettingsDto {
		/**Povolení editace typu dokladu.*/
		ixs_typ?: boolean|null;
		/**Speciální režim editace čísla dokladu - s dotazem (ec_dd)*/
		spec_ec_dd?: boolean|null;
		/**Povolení editace cisla dokladu (ec_dd)*/
		ec_dd?: boolean|null;
		/**Povolení editace esu*/
		ixs_esu?: boolean|null;
		/**Povolení editace datumu zdanitelneho plneni (dat_zdan)*/
		dat_zdan?: boolean|null;
		/**Povolení editace datumu uplatneni dane (dat_upd)*/
		dat_upd?: boolean|null;
		/**Povolení editace datumu vystaveni (dat_vyst)*/
		dat_vyst?: boolean|null;
		/**Povolení editace datumu doruceni (dat_dor)*/
		dat_dor?: boolean|null;
		/**Povolení editace datumu evidence (dat_evid)*/
		dat_evid?: boolean|null;
		/**Povolení editace plneni do 10 000 Kc (priz_ozp)*/
		priz_ozp?: boolean|null;
		/**Povoleni zaskrtavatka Použít poměr pro odpočet dle §75*/
		priz_pomer?: boolean|null;
		/**Zobrazení textu insolvence*/
		priz_inr?: boolean|null;
		/**Povoleni zaskrtavatka Zdanění příjemcem daňového dokladu*/
		priz_pdp?: boolean|null;
		/**Povolení změny volby Uskutečněná plnění/Přijatá plnění*/
		priz_zpl?: boolean|null;
		/**Povolení editace policka plneni s dodanenim v zahranici/tuzemske (priz_zahr)*/
		priz_zahr?: boolean|null;
		/**The polozky kh*/
		polozkyKH?: boolean|null;
	}
	const enum GDanovaEvidenceEditSettingsDtoNames { ixs_typ = "ixs_typ", spec_ec_dd = "spec_ec_dd", ec_dd = "ec_dd", ixs_esu = "ixs_esu", dat_zdan = "dat_zdan", dat_upd = "dat_upd", dat_vyst = "dat_vyst", dat_dor = "dat_dor", dat_evid = "dat_evid", priz_ozp = "priz_ozp", priz_pomer = "priz_pomer", priz_inr = "priz_inr", priz_pdp = "priz_pdp", priz_zpl = "priz_zpl", priz_zahr = "priz_zahr", polozkyKH = "polozkyKH",}
	const enum GDanovaEvidenceEditSettingsDtoFragments { ixs_typ = "*", spec_ec_dd = "*", ec_dd = "*", ixs_esu = "*", dat_zdan = "*", dat_upd = "*", dat_vyst = "*", dat_dor = "*", dat_evid = "*", priz_ozp = "*", priz_pomer = "*", priz_inr = "*", priz_pdp = "*", priz_zpl = "*", priz_zahr = "*", polozkyKH = "*",}
	const enum GDanovaEvidenceEditSettingsDtoTypes { ixs_typ = "boolean", spec_ec_dd = "boolean", ec_dd = "boolean", ixs_esu = "boolean", dat_zdan = "boolean", dat_upd = "boolean", dat_vyst = "boolean", dat_dor = "boolean", dat_evid = "boolean", priz_ozp = "boolean", priz_pomer = "boolean", priz_inr = "boolean", priz_pdp = "boolean", priz_zpl = "boolean", priz_zahr = "boolean", polozkyKH = "boolean",}
	const enum GDanovaEvidenceEditSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DataAgend\GEkoDataEvzDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro seznam EVZ*/
	interface GEkoDataEvzDto {
		/**ixs pri*/
		identifikator?: string|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**c sch*/
		c_sch?: JsonDecimal|null;
		/**částka*/
		c?: JsonDecimal|null;
		/**datum pri*/
		dat_pri?: JsonDate|null;
		/**datum real s*/
		dat_real_s?: JsonDate|null;
		/**datum uza s*/
		dat_uza_s?: JsonDate|null;
		/**funkce komp txt*/
		ixs_fun_komp_txt?: string|null;
		/**cis real*/
		cis_real?: string|null;
		/**fin od*/
		fin_od?: number|null;
		/**fin do*/
		fin_do?: number|null;
		/**s vz*/
		s_vz?: number|null;
		/**agendové číslo ver zak*/
		ac_ver_zak?: string|null;
		/**název*/
		popis?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**agendové číslo ag*/
		cislo?: string|null;
		/**rc esu*/
		rc_esu?: string|null;
		/**ixs esu txt*/
		ixs_esu_txt?: string|null;
		/**ičo esu*/
		ico_esu?: string|null;
		/**bu ci*/
		bu_ci?: string|null;
		/**sk ci*/
		sk_ci?: string|null;
		/**soutez*/
		soutez?: string|null;
	}
	const enum GEkoDataEvzDtoNames { identifikator = "identifikator", ico = "ico", ucs = "ucs", c_sch = "c_sch", c = "c", dat_pri = "dat_pri", dat_real_s = "dat_real_s", dat_uza_s = "dat_uza_s", ixs_fun_komp_txt = "ixs_fun_komp_txt", cis_real = "cis_real", fin_od = "fin_od", fin_do = "fin_do", s_vz = "s_vz", ac_ver_zak = "ac_ver_zak", popis = "popis", poznamka = "poznamka", cislo = "cislo", rc_esu = "rc_esu", ixs_esu_txt = "ixs_esu_txt", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", soutez = "soutez",}
	const enum GEkoDataEvzDtoFragments { identifikator = "main", ico = "main", ucs = "main", c_sch = "main", c = "main", dat_pri = "main", dat_real_s = "main", dat_uza_s = "main", ixs_fun_komp_txt = "main", cis_real = "main", fin_od = "main", fin_do = "main", s_vz = "main", ac_ver_zak = "main", popis = "main", poznamka = "main", cislo = "main", rc_esu = "main", ixs_esu_txt = "main", ico_esu = "main", bu_ci = "main", sk_ci = "main", soutez = "main",}
	const enum GEkoDataEvzDtoTypes { identifikator = "string", ico = "string", ucs = "string", c_sch = "JsonDecimal", c = "JsonDecimal", dat_pri = "JsonDate", dat_real_s = "JsonDate", dat_uza_s = "JsonDate", ixs_fun_komp_txt = "string", cis_real = "string", fin_od = "number", fin_do = "number", s_vz = "number", ac_ver_zak = "string", popis = "string", poznamka = "string", cislo = "string", rc_esu = "string", ixs_esu_txt = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", soutez = "string",}
	const enum GEkoDataEvzDtoTypeLengths { identifikator = 12, ico = 10, ucs = 10, ixs_fun_komp_txt = 200, cis_real = 6, ac_ver_zak = 30, popis = 100, poznamka = 254, cislo = 20, rc_esu = 10, ixs_esu_txt = 254, ico_esu = 14, bu_ci = 34, sk_ci = 11, soutez = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DataAgend\GEkoDataSmlDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro seznam SML*/
	interface GEkoDataSmlDto {
		/**ixp sml pri*/
		identifikator?: string|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**c měna*/
		c_mena?: JsonDecimal|null;
		/**částka*/
		c?: JsonDecimal|null;
		/**měna txt*/
		mena_txt?: string|null;
		/**datum uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**datum ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**datum platnost*/
		dat_platnost?: JsonDate|null;
		/**funkce vyriz txt*/
		ixs_fun_vyriz_txt?: string|null;
		/**funkce ref txt*/
		ixs_fun_ref_txt?: string|null;
		/**cis real*/
		cis_real?: string|null;
		/**fin od*/
		fin_od?: number|null;
		/**fin do*/
		fin_do?: number|null;
		/**sml Stav*/
		sml_stav?: number|null;
		/**sgn Stav*/
		sgn_stav?: number|null;
		/**agendové číslo ver zak*/
		ac_ver_zak?: string|null;
		/**popis*/
		popis?: string|null;
		/**název*/
		nazev?: string|null;
		/**agendové číslo sml*/
		cislo?: string|null;
		/**popis2*/
		popis2?: string|null;
		/**rc esu*/
		rc_esu?: string|null;
		/**ixs esu txt*/
		ixs_esu_txt?: string|null;
		/**ičo esu*/
		ico_esu?: string|null;
		/**bu ci*/
		bu_ci?: string|null;
		/**sk ci*/
		sk_ci?: string|null;
		/**ktg sml*/
		ktg_sml?: number|null;
		/**bankovní účet vlastní*/
		bu_vl?: string|null;
		/**směrový kód vlastního účtu*/
		sk_vl?: string|null;
	}
	const enum GEkoDataSmlDtoNames { identifikator = "identifikator", ico = "ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c = "c", mena_txt = "mena_txt", dat_uzavreni = "dat_uzavreni", dat_ucinnost = "dat_ucinnost", dat_platnost = "dat_platnost", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", cis_real = "cis_real", fin_od = "fin_od", fin_do = "fin_do", sml_stav = "sml_stav", sgn_stav = "sgn_stav", ac_ver_zak = "ac_ver_zak", popis = "popis", nazev = "nazev", cislo = "cislo", popis2 = "popis2", rc_esu = "rc_esu", ixs_esu_txt = "ixs_esu_txt", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", ktg_sml = "ktg_sml", bu_vl = "bu_vl", sk_vl = "sk_vl",}
	const enum GEkoDataSmlDtoFragments { identifikator = "main", ico = "main", ucs = "main", nks = "main", c_mena = "main", c = "main", mena_txt = "main", dat_uzavreni = "main", dat_ucinnost = "main", dat_platnost = "main", ixs_fun_vyriz_txt = "main", ixs_fun_ref_txt = "main", cis_real = "main", fin_od = "main", fin_do = "main", sml_stav = "main", sgn_stav = "main", ac_ver_zak = "main", popis = "main", nazev = "main", cislo = "main", popis2 = "main", rc_esu = "main", ixs_esu_txt = "main", ico_esu = "main", bu_ci = "main", sk_ci = "main", ktg_sml = "main", bu_vl = "main", sk_vl = "main",}
	const enum GEkoDataSmlDtoTypes { identifikator = "string", ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c = "JsonDecimal", mena_txt = "string", dat_uzavreni = "JsonDate", dat_ucinnost = "JsonDate", dat_platnost = "JsonDate", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", cis_real = "string", fin_od = "number", fin_do = "number", sml_stav = "number", sgn_stav = "number", ac_ver_zak = "string", popis = "string", nazev = "string", cislo = "string", popis2 = "string", rc_esu = "string", ixs_esu_txt = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", ktg_sml = "number", bu_vl = "string", sk_vl = "string",}
	const enum GEkoDataSmlDtoTypeLengths { identifikator = 12, ico = 10, ucs = 10, nks = 12, mena_txt = 16, ixs_fun_vyriz_txt = 200, ixs_fun_ref_txt = 200, cis_real = 6, ac_ver_zak = 30, popis = 254, nazev = 4000, cislo = 30, popis2 = 254, rc_esu = 10, ixs_esu_txt = 254, ico_esu = 10, bu_ci = 34, sk_ci = 11, bu_vl = 34, sk_vl = 11,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DataAgend\IGEkoDataAgend.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro výběr dat z ruznych agend*/
	interface EkoDataAgend {
		/**Nacteni zkratky ulohy*/
		getZkrkAgendy(rq?:CallParams<{identifikator:string}>): _Task<{identifikator:string},string>;
		/**Nacteni smluv*/
		listSML(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoDataSmlDto>>;
		/**Nacteni verejnych zakazek*/
		listEVZ1(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoDataEvzDto>>;
		/**Nacteni verejnych zakazek*/
		listEVZ(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoDataEvzDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoDataAgend: ServiceBase & Catalog.EkoDataAgend;
	}
	const EkoDataAgend: Client["EkoDataAgend"];
}
declare namespace Gordic.Eko.Interface {
	/**Filtr pro*/
	const enum GEVZFilter {
		/**ixs_pri*/
		ixs_pri,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**c_sch*/
		c_sch,
		/**c*/
		c,
		/**dat_pri*/
		dat_pri,
		/**dat_real_s*/
		dat_real_s,
		/**dat_uza_s*/
		dat_uza_s,
		/**ixs_fun_komp_txt*/
		ixs_fun_komp_txt,
		/**cis_real*/
		cis_real,
		/**fin_od*/
		fin_od,
		/**fin_do*/
		fin_do,
		/**s_vz*/
		s_vz,
		/**ac_ver_zak*/
		ac_ver_zak,
		/**nazev*/
		nazev,
		/**poznamka*/
		poznamka,
		/**ac_ag*/
		ac_ag,
		/**rc_esu*/
		rc_esu,
		/**ixs_esu_txt*/
		ixs_esu_txt,
		/**ico_esu*/
		ico_esu,
		/**bu_ci*/
		bu_ci,
		/**sk_ci*/
		sk_ci,
		/**soutez*/
		soutez,
		/**Dodavatel*/
		ixs_esu,
		ixp_den,
		rok_zal,
		rokFinancovani,
	}
	/**Filtr pro*/
	const enum GSMLFilter {
		/**ixp_sml_pri*/
		ixp_sml_pri,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**c_mena*/
		c_mena,
		/**c*/
		c,
		/**mena_txt*/
		mena_txt,
		/**dat_uzavreni*/
		dat_uzavreni,
		/**dat_ucinnost*/
		dat_ucinnost,
		/**dat_platnost*/
		dat_platnost,
		/**ixs_fun_vyriz_txt*/
		ixs_fun_vyriz_txt,
		/**ixs_fun_ref_txt*/
		ixs_fun_ref_txt,
		/**cis_real*/
		cis_real,
		/**fin_od*/
		fin_od,
		/**fin_do*/
		fin_do,
		/**sml_stav*/
		sml_stav,
		/**sgn_stav*/
		sgn_stav,
		/**ac_ver_zak*/
		ac_ver_zak,
		/**popis*/
		popis,
		/**nazev*/
		nazev,
		/**ac_sml*/
		ac_sml,
		/**popis2*/
		popis2,
		/**rc_esu*/
		rc_esu,
		/**ixs_esu_txt*/
		ixs_esu_txt,
		/**ico_esu*/
		ico_esu,
		/**bu_ci*/
		bu_ci,
		/**sk_ci*/
		sk_ci,
		/**ktg_sml*/
		ktg_sml,
		/**bu_vl*/
		bu_vl,
		/**sk_vl*/
		sk_vl,
		rokFinancovani,
		rok,
		ixp_den,
		/**Dodavatel*/
		ixs_esu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DatovaVeta\GDatovaVetaInfoDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Datova veta s popisem*/
	interface GDatovaVetaInfoDto {
		/**Kód datoveho slova*/
		code?: string|null;
		/**název datoveho slova*/
		name?: string|null;
		/**název datoveho slova*/
		title?: string|null;
	}
	const enum GDatovaVetaInfoDtoNames { code = "code", name = "name", title = "title",}
	const enum GDatovaVetaInfoDtoFragments { code = "*", name = "*", title = "*",}
	const enum GDatovaVetaInfoDtoTypes { code = "string", name = "string", title = "string",}
	const enum GDatovaVetaInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DatovaVeta\GEkoZapisDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Eko zapis pro praci s datovou vetou*/
	interface GEkoZapisDto {
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
	}
	const enum GEkoZapisDtoNames { ucs = "ucs", nks = "nks", drd = "drd", c0 = "c0", c1 = "c1", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen",}
	const enum GEkoZapisDtoFragments { ucs = "*", nks = "*", drd = "*", c0 = "*", c1 = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*",}
	const enum GEkoZapisDtoTypes { ucs = "string", nks = "string", drd = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string",}
	const enum GEkoZapisDtoTypeLengths { ucs = 10, nks = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DatovaVeta\IGGDatovaVetaInfo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Povoleni akci
	* @domain Ekonomika
	*/
	interface EkoDatovaVeta {
		/**Nacteni textu z rovrhu dle ekozapisu*/
		getTextyZRozvrhu(rq?:CallParams<{ekoZapis:Gordic.Eko.Interface.GEkoZapisDto,typVety:Gordic.Eko.Interface.TypVetyEnum,pidRozvrhu:string}>): _Task<{ekoZapis:Gordic.Eko.Interface.GEkoZapisDto,typVety:Gordic.Eko.Interface.TypVetyEnum,pidRozvrhu:string},Gordic.Eko.Interface.GDatovaVetaInfoDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoDatovaVeta: ServiceBase & Catalog.EkoDatovaVeta;
	}
	const EkoDatovaVeta: Client["EkoDatovaVeta"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DodaciList\GDodaciListDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Třída DTO pro záznamy Dodacího listu (GDodaciList).*/
	interface GDodaciListDto {
		ixp?: string|null;
		lic?: string|null;
		typ_ag_prim?: string|null;
		ac?: string|null;
		ac_ag?: string|null;
		ixs_esu?: string|null;
		ico_esu?: string|null;
		ac_esu?: string|null;
		nks?: string|null;
		ucs?: string|null;
		ico?: string|null;
		id_top?: string|null;
		popis?: string|null;
		dat_evid?: JsonDate|null;
		stav_bnd_pri?: string|null;
		stav_bnd_maj?: string|null;
		typ_dod?: string|null;
		subrada?: string|null;
		stav_dod?: string|null;
		dat_ze_dne_esu?: JsonDate|null;
		ktg_typ?: string|null;
		ixs_typ?: string|null;
		dat_zmena?: JsonDate|null;
		zmenu_prov?: string|null;
	}
	const enum GDodaciListDtoNames { ixp = "ixp", lic = "lic", typ_ag_prim = "typ_ag_prim", ac = "ac", ac_ag = "ac_ag", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ac_esu = "ac_esu", nks = "nks", ucs = "ucs", ico = "ico", id_top = "id_top", popis = "popis", dat_evid = "dat_evid", stav_bnd_pri = "stav_bnd_pri", stav_bnd_maj = "stav_bnd_maj", typ_dod = "typ_dod", subrada = "subrada", stav_dod = "stav_dod", dat_ze_dne_esu = "dat_ze_dne_esu", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GDodaciListDtoFragments { ixp = "*", lic = "*", typ_ag_prim = "*", ac = "*", ac_ag = "*", ixs_esu = "*", ico_esu = "*", ac_esu = "*", nks = "*", ucs = "*", ico = "*", id_top = "*", popis = "*", dat_evid = "*", stav_bnd_pri = "*", stav_bnd_maj = "*", typ_dod = "*", subrada = "*", stav_dod = "*", dat_ze_dne_esu = "*", ktg_typ = "*", ixs_typ = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GDodaciListDtoTypes { ixp = "string", lic = "string", typ_ag_prim = "string", ac = "string", ac_ag = "string", ixs_esu = "string", ico_esu = "string", ac_esu = "string", nks = "string", ucs = "string", ico = "string", id_top = "string", popis = "string", dat_evid = "JsonDate", stav_bnd_pri = "string", stav_bnd_maj = "string", typ_dod = "string", subrada = "string", stav_dod = "string", dat_ze_dne_esu = "JsonDate", ktg_typ = "string", ixs_typ = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GDodaciListDtoTypeLengths {}
	/**Enum pro filtrování záznamů GDodaciList.
	*     Členy odpovídají sloupcům DTO.
	*     Ponechte jen potřebné, pokud bude filtr zúžen.
	*/
	const enum GDodaciListFiltrEnum {
		ixp,
		lic,
		typ_ag_prim,
		ac,
		ac_ag,
		ixs_esu,
		ico_esu,
		ac_esu,
		nks,
		ucs,
		ico,
		id_top,
		popis,
		dat_evid,
		stav_bnd_pri,
		stav_bnd_maj,
		typ_dod,
		subrada,
		stav_dod,
		dat_ze_dne_esu,
		ktg_typ,
		ixs_typ,
		dat_zmena,
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\DodaciList\IGDodaciListService.d.ts 

declare namespace Gordic.Isl.Catalog {
	interface DodaciListService {
		read(rq?:Gordic.Eko.Interface.GDodaciListDto|CallParams<GServiceReadRequest<Gordic.Eko.Interface.GDodaciListDto>>): _Task<GServiceReadRequest<Gordic.Eko.Interface.GDodaciListDto>,GServiceReadRequest<Gordic.Eko.Interface.GDodaciListDto>>;
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GDodaciListDto>>;
		upsert(rq?:Gordic.Eko.Interface.GDodaciListDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GDodaciListDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GDodaciListDto>,GServiceSaveRequest<Gordic.Eko.Interface.GDodaciListDto>>;
		delete(rq?:Gordic.Eko.Interface.GDodaciListDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GDodaciListDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GDodaciListDto>,GServiceSaveRequest<Gordic.Eko.Interface.GDodaciListDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DodaciListService: ServiceBase & Catalog.DodaciListService;
	}
	const DodaciListService: Client["DodaciListService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Import\GItemImportDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro polozku importu*/
	interface GItemImportDto {
		/**Hodnota*/
		Value?: string|null;
		/**Databazovy nazev*/
		DBName?: string|null;
		/**Uzivatelsky nazev*/
		Caption?: string|null;
	}
	const enum GItemImportDtoNames { Value = "Value", DBName = "DBName", Caption = "Caption",}
	const enum GItemImportDtoFragments { Value = "*", DBName = "*", Caption = "*",}
	const enum GItemImportDtoTypes { Value = "string", DBName = "string", Caption = "string",}
	const enum GItemImportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Import\GListItemImportDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro seznam polozku importu*/
	interface GListItemImportDto {
		/**Seznam polozek na radku*/
		items?: Gordic.Eko.Interface.GItemImportDto[]|null;
	}
	const enum GListItemImportDtoNames { items = "items",}
	const enum GListItemImportDtoFragments { items = "*",}
	const enum GListItemImportDtoTypes { items = "Gordic.Eko.Interface.GItemImportDto[]",}
	const enum GListItemImportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Import\GVisibleTableColumns.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Predavana trida viditelnych sloupcu*/
	interface GVisibleTableColumns {
		Name?: string|null;
		HeaderText?: string|null;
	}
	const enum GVisibleTableColumnsNames { Name = "Name", HeaderText = "HeaderText",}
	const enum GVisibleTableColumnsFragments { Name = "*", HeaderText = "*",}
	const enum GVisibleTableColumnsTypes { Name = "string", HeaderText = "string",}
	const enum GVisibleTableColumnsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Pozadavky\GPozadavkyDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto pro Požadavky příštích období*/
	interface GPozadavkyDto {
		rok_srv?: number|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		cislo?: string|null;
		radek_z?: number|null;
		/**Rok deníku*/
		rok?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		mesic?: number|null;
		komp?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		drd?: number|null;
		den?: number|null;
		c0?: JsonDecimal|null;
		c1?: JsonDecimal|null;
		/**SU - Syntetický účet*/
		uea?: string|null;
		/**AU - Analytický účet*/
		ueb?: string|null;
		/**ZDR - Zdroj*/
		uec?: string|null;
		/**ODPA - Paragraf*/
		ued?: string|null;
		/**POL - Položka*/
		uee?: string|null;
		/**ZJ - Záznamová jednotka*/
		uef?: string|null;
		/**UZ - Účelový znak*/
		ueg?: string|null;
		/**POPA - Podpararagraf*/
		ueh?: string|null;
		/**FIN - Financování*/
		uei?: string|null;
		/**PRJ - Projekt*/
		uej?: string|null;
		/**ORJ - ORJ*/
		te0?: string|null;
		/**ORG - ORG*/
		te1?: string|null;
		/**COR - Cílově orientované rozpočtování*/
		te2?: string|null;
		/**KZ - Konsolidační záznam*/
		te3?: string|null;
		/**UKO - Úkol*/
		te4?: string|null;
		/**Popis*/
		popis?: string|null;
		t_ico?: string|null;
		t_nks?: string|null;
		c0_s?: JsonDecimal|null;
		c1_s?: JsonDecimal|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		xpf_pf?: string|null;
		xpf_fs?: string|null;
		komodita?: string|null;
		/**Typ organizace*/
		typ_org?: number|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**Příznak blokování*/
		priz_blok?: number|null;
		ixp_prim?: string|null;
		ixp_roz?: string|null;
		xuete?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
		/**MD konto*/
		c0_konto?: JsonDecimal|null;
		/**DAL konto*/
		c1_konto?: JsonDecimal|null;
	}
	const enum GPozadavkyDtoNames { rok_srv = "rok_srv", ixp = "ixp", cislo = "cislo", radek_z = "radek_z", rok = "rok", ico = "ico", ucs = "ucs", mesic = "mesic", komp = "komp", nks = "nks", drd = "drd", den = "den", c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", popis = "popis", t_ico = "t_ico", t_nks = "t_nks", c0_s = "c0_s", c1_s = "c1_s", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", xpf_pf = "xpf_pf", xpf_fs = "xpf_fs", komodita = "komodita", typ_org = "typ_org", uus = "uus", priz_blok = "priz_blok", ixp_prim = "ixp_prim", ixp_roz = "ixp_roz", xuete = "xuete", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c0_konto = "c0_konto", c1_konto = "c1_konto",}
	const enum GPozadavkyDtoFragments { rok_srv = "*", ixp = "*", cislo = "*", radek_z = "*", rok = "*", ico = "*", ucs = "*", mesic = "*", komp = "*", nks = "*", drd = "*", den = "*", c0 = "*", c1 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", popis = "*", t_ico = "*", t_nks = "*", c0_s = "*", c1_s = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*", xpf_pf = "*", xpf_fs = "*", komodita = "*", typ_org = "*", uus = "*", priz_blok = "*", ixp_prim = "*", ixp_roz = "*", xuete = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c0_konto = "*", c1_konto = "*",}
	const enum GPozadavkyDtoTypes { rok_srv = "number", ixp = "string", cislo = "string", radek_z = "number", rok = "number", ico = "string", ucs = "string", mesic = "number", komp = "string", nks = "string", drd = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", popis = "string", t_ico = "string", t_nks = "string", c0_s = "JsonDecimal", c1_s = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", xpf_pf = "string", xpf_fs = "string", komodita = "string", typ_org = "number", uus = "string", priz_blok = "number", ixp_prim = "string", ixp_roz = "string", xuete = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c0_konto = "JsonDecimal", c1_konto = "JsonDecimal",}
	const enum GPozadavkyDtoTypeLengths { ixp = 12, cislo = 16, ico = 10, ucs = 10, komp = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, popis = 254, t_ico = 50, t_nks = 50, zmenu_prov = 12, xpf_pf = 63, xpf_fs = 20, komodita = 15, uus = 10, ixp_prim = 12, ixp_roz = 12, xuete = 286, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Pozadavky\IGPozadavky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Požadavky příštích období*/
	interface Pozadavky {
		/**Načtení seznamu požadavků příštích období*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GPozadavkyDto>>;
		/**Načtení seznamu požadavků příštích období pro výběr*/
		listVyber(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GPozadavkyDto>>;
		/**Odstranění požadavku u dokladu*/
		delete(rq?:Gordic.Eko.Interface.GPozadavkyDeleteReqDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GPozadavkyDeleteReqDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GPozadavkyDeleteReqDto>,void>;
		/**Přidání požadavku u dokladu*/
		save(rq?:Gordic.Eko.Interface.GPozadavkySaveReqDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GPozadavkySaveReqDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GPozadavkySaveReqDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Pozadavky: ServiceBase & Catalog.Pozadavky;
	}
	const Pozadavky: Client["Pozadavky"];
}
declare namespace Gordic.Eko.Interface {
	/**Filtr pro List požadavků příštích období*/
	const enum GPozadavkyFilter {
		/**Identifikátor navázaného dokladu*/
		ixp_prim,
		/**Key1*/
		rok_srv,
		/**Identifikátor požadavku (Key2)*/
		ixp,
		/**Key3*/
		radek_z,
		/**Identifikátor veřejné zakázky*/
		ixs_pri,
		/**rok*/
		rok,
		/**nks*/
		nks,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uec*/
		uec,
		/**ued*/
		ued,
		/**uee*/
		uee,
		/**uef*/
		uef,
		/**ueg*/
		ueg,
		/**ueh*/
		ueh,
		/**uei*/
		uei,
		/**uej*/
		uej,
		/**te0*/
		te0,
		/**te1*/
		te1,
		/**te2*/
		te2,
		/**te3*/
		te3,
		/**te4*/
		te4,
		/**MU*/
		uek,
		/**IČO*/
		uel,
		/**ÚČEL*/
		uem,
		/**ÚJ*/
		uen,
		/**PS*/
		te5,
		/**REZ1*/
		te6,
		/**REZ2*/
		te7,
		/**REZ3*/
		te8,
		/**REZ4*/
		te9,
	}
	/**Vstupní dto pro odstranění požadavku u dokladu*/
	interface GPozadavkyDeleteReqDto {
		rok_srv?: number|null;
		/**Identifikátor požadavku*/
		ixp?: string|null;
		radek_z?: number|null;
	}
	const enum GPozadavkyDeleteReqDtoNames { rok_srv = "rok_srv", ixp = "ixp", radek_z = "radek_z",}
	const enum GPozadavkyDeleteReqDtoFragments { rok_srv = "*", ixp = "*", radek_z = "*",}
	const enum GPozadavkyDeleteReqDtoTypes { rok_srv = "number", ixp = "string", radek_z = "number",}
	const enum GPozadavkyDeleteReqDtoTypeLengths { ixp = 12,}
	/**Vstupní dto pro přidání požadavku u dokladu*/
	interface GPozadavkySaveReqDto {
		rok_srv?: number|null;
		/**Identifikátor požadavku*/
		ixp?: string|null;
		radek_z?: number|null;
		/**Identifikátor navázeného dokladu*/
		ixp_prim?: string|null;
		/**MD*/
		c0?: JsonDecimal|null;
		/**DAL*/
		c1?: JsonDecimal|null;
		/**Příznak blokování*/
		priz_blok?: number|null;
	}
	const enum GPozadavkySaveReqDtoNames { rok_srv = "rok_srv", ixp = "ixp", radek_z = "radek_z", ixp_prim = "ixp_prim", c0 = "c0", c1 = "c1", priz_blok = "priz_blok",}
	const enum GPozadavkySaveReqDtoFragments { rok_srv = "*", ixp = "*", radek_z = "*", ixp_prim = "*", c0 = "*", c1 = "*", priz_blok = "*",}
	const enum GPozadavkySaveReqDtoTypes { rok_srv = "number", ixp = "string", radek_z = "number", ixp_prim = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", priz_blok = "number",}
	const enum GPozadavkySaveReqDtoTypeLengths { ixp = 12, ixp_prim = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\SchvalovaciProces\IGEkoSchvalovaciProces.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Isl pro Ekonomický schvalovací proces*/
	interface EkoSchvalovaciProces {
		/**Detail schvalovacího procesu*/
		read(rq?:Gordic.Wfl.Interface.GWflvdfkDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GWflvdfkDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GWflvdfkDto>,GServiceReadResponse<Gordic.Wfl.Interface.GWflvdfkDto>>;
		/**List schvalovacích procesů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.GWflvdfkDto>>;
		/**Podání ekonomického schvalovacího procesu*/
		create(rq?:CallParams<{ixp:string,rok:number}>): _Task<{ixp:string,rok:number},GServiceSaveResponse<Gordic.Wfl.Interface.GWflvdfkDto>>;
		/**Uložení změn v ekonomickém schvalovacím procesu*/
		save(rq?:Gordic.Eko.Interface.GEkoSchvalovaciProcesSaveDto|CallParams<GServiceSaveRequest<Gordic.Eko.Interface.GEkoSchvalovaciProcesSaveDto>>): _Task<GServiceSaveRequest<Gordic.Eko.Interface.GEkoSchvalovaciProcesSaveDto>,void>;
		/**Nastavení ekonomického schvalovacího procesu na aktivní*/
		setActive(rq?:CallParams<{proces:Gordic.Wfl.Interface.GWflvdfkDto,udajePrimarnihoDokladu:Gordic.Wfl.Interface.GFinancniKontrolaUPD}>): _Task<{proces:Gordic.Wfl.Interface.GWflvdfkDto,udajePrimarnihoDokladu:Gordic.Wfl.Interface.GFinancniKontrolaUPD},void>;
		/**Vložení ekonomického schvalovacího proces do EPK*/
		insertIntoEpk(rq?:CallParams<{proces:Gordic.Wfl.Interface.GWflvdfkDto}>): _Task<{proces:Gordic.Wfl.Interface.GWflvdfkDto},void>;
		/**Ukončení platnosti ekonomického schvalovacího procesu*/
		endValidity(rq?:CallParams<{proces:Gordic.Wfl.Interface.GWflvdfkDto,duvod:string,eventToRaise:string}>): _Task<{proces:Gordic.Wfl.Interface.GWflvdfkDto,duvod:string,eventToRaise:string},void>;
		/**Zrušení předpisu, pokud existuje a storno ekonomického schvalovacího procesu*/
		storno(rq?:CallParams<{proces:Gordic.Wfl.Interface.GWflvdfkDto}>): _Task<{proces:Gordic.Wfl.Interface.GWflvdfkDto},void>;
		/**Stáhnout předpis z EPK a zrušení předpisu v wflvdfk*/
		withdrawAndStorno(rq?:CallParams<{proces:Gordic.Wfl.Interface.GWflvdfkDto}>): _Task<{proces:Gordic.Wfl.Interface.GWflvdfkDto},void>;
		/**Zjištění, zda existuje aktivní proces*/
		existsActiveProces(rq?:CallParams<{ixp:string,rok:number}>): _Task<{ixp:string,rok:number},boolean>;
		/**Zjištění počtu procesů nad dokladem*/
		procesCount(rq?:CallParams<{ixp:string,rok:number,KtgTypFilter:GBaseFilter<number>}>): _Task<{ixp:string,rok:number,KtgTypFilter:GBaseFilter<number>},number>;
		/**Získání dat pro vytvoření KPI se stavy*/
		kPIList(rq?:CallParams<{ixp:string,PKEnabled:boolean,KtgTypFilter:GBaseFilter<number>}>): _Task<{ixp:string,PKEnabled:boolean,KtgTypFilter:GBaseFilter<number>},Gordic.Wfl.Interface.GWflvdfkDto[]>;
		/**Zrušení předpisu, pokud existuje a odblokování editace obrazu*/
		stornoHybrid(rq?:CallParams<{ixp:string,ixs_spd:string}>): _Task<{ixp:string,ixs_spd:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoSchvalovaciProces: ServiceBase & Catalog.EkoSchvalovaciProces;
	}
	const EkoSchvalovaciProces: Client["EkoSchvalovaciProces"];
}
declare namespace Gordic.Eko.Interface {
	/**EKO schvalovací proces - dto pro uložení změn na detailu*/
	interface GEkoSchvalovaciProcesSaveDto {
		/**Dto Eko schvalovacího procesu*/
		dto?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**Identifikátor šablony*/
		ixs_ssa?: string|null;
		/**List s dto se schvalovacími úkony*/
		ukony?: Gordic.Wfl.Interface.GWflSchvalovaciProcesDto[]|null;
		/**Příznak, zda úkony existují (je vytvořen předpis)*/
		ukonySaved?: boolean|null;
	}
	const enum GEkoSchvalovaciProcesSaveDtoNames { dto = "dto", ixs_ssa = "ixs_ssa", ukony = "ukony", ukonySaved = "ukonySaved",}
	const enum GEkoSchvalovaciProcesSaveDtoFragments { dto = "*", ixs_ssa = "*", ukony = "*", ukonySaved = "*",}
	const enum GEkoSchvalovaciProcesSaveDtoTypes { dto = "Gordic.Wfl.Interface.GWflvdfkDto", ixs_ssa = "string", ukony = "Gordic.Wfl.Interface.GWflSchvalovaciProcesDto[]", ukonySaved = "boolean",}
	const enum GEkoSchvalovaciProcesSaveDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Service\GEkoPidRokDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO objektu predavani pid a roku*/
	interface GEkoPidRokDto {
		/**Identifikator dokladu*/
		Ixp?: string|null;
		/**Rok*/
		Rok?: number|null;
	}
	const enum GEkoPidRokDtoNames { Ixp = "Ixp", Rok = "Rok",}
	const enum GEkoPidRokDtoFragments { Ixp = "*", Rok = "*",}
	const enum GEkoPidRokDtoTypes { Ixp = "string", Rok = "number",}
	const enum GEkoPidRokDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Service\IGEkoServices.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Sluzba pro obslouzeni spolecnych metod pro praci s eko doklady*/
	interface EkoServices {
		/**Kontrola a doplnění metadat dokladu*/
		dokladDoplneniMetadat(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Automaticke dopleni*/
		automatickeDoplneniMetadat(rq?:CallParams<{seznamIxp:string[],seznamIxpRok:Gordic.Eko.Interface.GEkoPidRokDto[]}>): _Task<{seznamIxp:string[],seznamIxpRok:Gordic.Eko.Interface.GEkoPidRokDto[]},void>;
		/**Kontrola metadat baliku*/
		kontrolaMetadat(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Vrácení dokladu do WFL*/
		vratDoWFL(rq?:CallParams<{ixp:string,duvod:string}>): _Task<{ixp:string,duvod:string},void>;
		/**Automaticke doplneni a kontrala metadat dokladu*/
		doplneniKontrolaMetadat(rq?:CallParams<{pidDokladu:string}>): _Task<{pidDokladu:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoServices: ServiceBase & Catalog.EkoServices;
	}
	const EkoServices: Client["EkoServices"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\Smlouvy\GEkoVyberSmlouvyPolDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto pro vybranou položku smlouvy*/
	interface GEkoVyberSmlouvyPolDto extends Gordic.Eko.Interface.GSmlspolDto {
		/**Jde o vyhovující položku nebo ne?*/
		vyhovujici?: boolean|null;
	}
	const enum GEkoVyberSmlouvyPolDtoNames { vyhovujici = "vyhovujici", ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", cis_pol_pla = "cis_pol_pla", nazev = "nazev", up_stav = "up_stav", c = "c", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vznik = "dat_vznik", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", xuete = "xuete", priz_zaz = "priz_zaz", c_zbyva = "c_zbyva", ac_sml = "ac_sml", bu_vl_txt = "bu_vl_txt",}
	const enum GEkoVyberSmlouvyPolDtoFragments { vyhovujici = "*", ixp = "*", rok = "*", cislo = "*", lic = "*", cis_pol_pla = "*", nazev = "*", up_stav = "*", c = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", sk_vl = "*", bu_vl = "*", c_fak = "*", dat_zmena = "*", zmenu_prov = "*", dat_vznik = "*", c_obj_sml = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", typ_ag_blok = "*", znam = "*", xuete = "*", priz_zaz = "*", c_zbyva = "*", ac_sml = "*", bu_vl_txt = "*",}
	const enum GEkoVyberSmlouvyPolDtoTypes { vyhovujici = "boolean", ixp = "string", rok = "number", cislo = "number", lic = "string", cis_pol_pla = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", sk_vl = "string", bu_vl = "string", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vznik = "JsonDate", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", xuete = "string", priz_zaz = "number", c_zbyva = "JsonDecimal", ac_sml = "string", bu_vl_txt = "string",}
	const enum GEkoVyberSmlouvyPolDtoTypeLengths { ixp = 12, lic = 4, cis_pol_pla = 16, nazev = 254, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, zmenu_prov = 12, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, xuete = 148,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\StrukturaIISSP\GStrukturaIISSPDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto se strukturou IISSP*/
	interface GStrukturaIISSPDto {
		/**Identifikátor*/
		ixs_hpr?: string|null;
		/**Rezervační případ*/
		pripad?: Gordic.Eko.Interface.GStrukturaIISSPRezPripadDto|null;
		/**Položky struktury IISSP*/
		polozky?: Gordic.Eko.Interface.GStrukturaIISSPPolozkaDto[]|null;
		/**Permissions*/
		Permissions?: Gordic.Eko.Interface.GStrukturaIISSPPermissions|null;
	}
	const enum GStrukturaIISSPDtoNames { ixs_hpr = "ixs_hpr", pripad = "pripad", polozky = "polozky", Permissions = "Permissions",}
	const enum GStrukturaIISSPDtoFragments { ixs_hpr = "*", pripad = "*", polozky = "*", Permissions = "*",}
	const enum GStrukturaIISSPDtoTypes { ixs_hpr = "string", pripad = "Gordic.Eko.Interface.GStrukturaIISSPRezPripadDto", polozky = "Gordic.Eko.Interface.GStrukturaIISSPPolozkaDto[]", Permissions = "Gordic.Eko.Interface.GStrukturaIISSPPermissions",}
	const enum GStrukturaIISSPDtoTypeLengths {}
	/**Dto pro rezervační případ ve struktuře IISSP*/
	interface GStrukturaIISSPRezPripadDto {
		/**stav_pripadu*/
		stav_pripadu?: string|null;
		/**pocet*/
		pocet?: number|null;
		/**pripraveno*/
		pripraveno?: number|null;
		/**odeslano*/
		odeslano?: number|null;
		/**schvaleno*/
		schvaleno?: number|null;
		/**schvaleno_vyh*/
		schvaleno_vyh?: number|null;
		/**zamitnuto*/
		zamitnuto?: number|null;
	}
	const enum GStrukturaIISSPRezPripadDtoNames { stav_pripadu = "stav_pripadu", pocet = "pocet", pripraveno = "pripraveno", odeslano = "odeslano", schvaleno = "schvaleno", schvaleno_vyh = "schvaleno_vyh", zamitnuto = "zamitnuto",}
	const enum GStrukturaIISSPRezPripadDtoFragments { stav_pripadu = "*", pocet = "*", pripraveno = "*", odeslano = "*", schvaleno = "*", schvaleno_vyh = "*", zamitnuto = "*",}
	const enum GStrukturaIISSPRezPripadDtoTypes { stav_pripadu = "string", pocet = "number", pripraveno = "number", odeslano = "number", schvaleno = "number", schvaleno_vyh = "number", zamitnuto = "number",}
	const enum GStrukturaIISSPRezPripadDtoTypeLengths {}
	/**Dto s položkou ve struktuře IISSP*/
	interface GStrukturaIISSPPolozkaDto {
		ixs_hpr?: string|null;
		radek_gin?: number|null;
		subradek_gin?: number|null;
		rok?: number|null;
		id_hdr?: string|null;
		radek_hdr?: number|null;
		dat_spl?: JsonDate|null;
		c_rsp?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
		isp_fim?: string|null;
		isp_zdr?: string|null;
		isp_par?: string|null;
		isp_pol?: string|null;
		isp_eds?: string|null;
		isp_pvs?: string|null;
		isp_ucl?: string|null;
		isp_zj?: string|null;
		isp_uj?: string|null;
		isp_uz?: string|null;
		s_rezsp?: number|null;
		radek_hdr_ris?: number|null;
		isp_kap?: string|null;
		/**Textově stav s_rezsp*/
		s_rezsp_txt?: string|null;
	}
	const enum GStrukturaIISSPPolozkaDtoNames { ixs_hpr = "ixs_hpr", radek_gin = "radek_gin", subradek_gin = "subradek_gin", rok = "rok", id_hdr = "id_hdr", radek_hdr = "radek_hdr", dat_spl = "dat_spl", c_rsp = "c_rsp", popis = "popis", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", s_rezsp = "s_rezsp", radek_hdr_ris = "radek_hdr_ris", isp_kap = "isp_kap", s_rezsp_txt = "s_rezsp_txt",}
	const enum GStrukturaIISSPPolozkaDtoFragments { ixs_hpr = "*", radek_gin = "*", subradek_gin = "*", rok = "*", id_hdr = "*", radek_hdr = "*", dat_spl = "*", c_rsp = "*", popis = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", s_rezsp = "*", radek_hdr_ris = "*", isp_kap = "*", s_rezsp_txt = "*",}
	const enum GStrukturaIISSPPolozkaDtoTypes { ixs_hpr = "string", radek_gin = "number", subradek_gin = "number", rok = "number", id_hdr = "string", radek_hdr = "number", dat_spl = "JsonDate", c_rsp = "JsonDecimal", popis = "string", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", s_rezsp = "number", radek_hdr_ris = "number", isp_kap = "string", s_rezsp_txt = "string",}
	const enum GStrukturaIISSPPolozkaDtoTypeLengths { ixs_hpr = 12, popis = 60, isp_fim = 16, isp_zdr = 10, isp_par = 16, isp_pol = 24, isp_eds = 15, isp_pvs = 10, isp_ucl = 9, isp_zj = 3, isp_uj = 6, isp_uz = 7,}
	/**Service permissions pro práci se strukturou IISSP*/
	interface GStrukturaIISSPPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno ověřit stav*/
		LzeOveritStav: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno připravit SP*/
		LzePripravaSP: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GStrukturaIISSPPermissionsNames { LzeOveritStav = "LzeOveritStav", LzePripravaSP = "LzePripravaSP",}
	const enum GStrukturaIISSPPermissionsFragments { LzeOveritStav = "*", LzePripravaSP = "*",}
	const enum GStrukturaIISSPPermissionsTypes { LzeOveritStav = "Gordic.General.ApplicationInterface.GPermission", LzePripravaSP = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GStrukturaIISSPPermissionsTypeLengths {}
	/**Dto pro read požadavek na strukturu IISSP*/
	interface GStrukturaIISSPReqDto {
		/**Identifikátor*/
		ixs_hpr?: string|null;
	}
	const enum GStrukturaIISSPReqDtoNames { ixs_hpr = "ixs_hpr",}
	const enum GStrukturaIISSPReqDtoFragments { ixs_hpr = "*",}
	const enum GStrukturaIISSPReqDtoTypes { ixs_hpr = "string",}
	const enum GStrukturaIISSPReqDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\StrukturaIISSP\IGStrukturaIISSP.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Struktura IISSP*/
	interface StrukturaIISSPEko {
		/**Read*/
		read(rq?:Gordic.Eko.Interface.GStrukturaIISSPReqDto|CallParams<GServiceReadRequest<Gordic.Eko.Interface.GStrukturaIISSPReqDto>>): _Task<GServiceReadRequest<Gordic.Eko.Interface.GStrukturaIISSPReqDto>,GServiceReadResponse<Gordic.Eko.Interface.GStrukturaIISSPDto>>;
		/**Připravit rezervaci případu v IISSP*/
		pripravitSP(rq?:Gordic.Eko.Interface.GStrukturaIISSPReqDto|CallParams<GServiceActionRequest<Gordic.Eko.Interface.GStrukturaIISSPReqDto>>): _Task<GServiceActionRequest<Gordic.Eko.Interface.GStrukturaIISSPReqDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StrukturaIISSPEko: ServiceBase & Catalog.StrukturaIISSPEko;
	}
	const StrukturaIISSPEko: Client["StrukturaIISSPEko"];
}
declare namespace Gordic.Eko.Interface {
	/**Filtry pro požadavky na budování LISTu struktury IISSP*/
	const enum GStrukturaIISSPFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\VazbyDokladu\GVazbaDokladuDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto pro doklad do výběru pro navázání*/
	interface GDokladKNavazaniDto {
		/**The ixp*/
		ixp?: string|null;
		/**The ac ag*/
		ac_ag?: string|null;
		/**The pri*/
		pri?: string|null;
		/**The ac pri*/
		ac_pri?: string|null;
		/**The vyd*/
		vyd?: string|null;
		/**The ac vyd*/
		ac_vyd?: string|null;
		/**The nazev*/
		nazev?: string|null;
		/**The rok*/
		rok?: string|null;
		/**Typ dokladu*/
		ixs_typ_txt?: string|null;
		/**Cislo dokladu*/
		ac?: string|null;
	}
	const enum GDokladKNavazaniDtoNames { ixp = "ixp", ac_ag = "ac_ag", pri = "pri", ac_pri = "ac_pri", vyd = "vyd", ac_vyd = "ac_vyd", nazev = "nazev", rok = "rok", ixs_typ_txt = "ixs_typ_txt", ac = "ac",}
	const enum GDokladKNavazaniDtoFragments { ixp = "*", ac_ag = "*", pri = "*", ac_pri = "*", vyd = "*", ac_vyd = "*", nazev = "*", rok = "*", ixs_typ_txt = "*", ac = "*",}
	const enum GDokladKNavazaniDtoTypes { ixp = "string", ac_ag = "string", pri = "string", ac_pri = "string", vyd = "string", ac_vyd = "string", nazev = "string", rok = "string", ixs_typ_txt = "string", ac = "string",}
	const enum GDokladKNavazaniDtoTypeLengths {}
	/**Dto k vazbě dokladu*/
	interface GVazbaDokladuDto {
		/**Příznak hlavního dokladu = 0, navázaný = 1*/
		priz_hla?: number|null;
		/**Identifikátor nadřazeného dokladu*/
		ixp_pri?: string|null;
		/**Identifikátor dokladu*/
		ixp_sek?: string|null;
		/**Typ dokladu*/
		ixs_nazev?: string|null;
		/**Agendové číslo*/
		ac_ag?: string|null;
		/**Typ agendy sek*/
		typ_ag_sek?: number|null;
		/**Počet dokladů*/
		count?: number|null;
		/**Čísla dokladů*/
		doklady?: string|null;
		/**Rok*/
		rok?: string|null;
		/**Kniha*/
		nazev?: string|null;
		/**Gets or sets a value indicating whether this instance has kh - kontrolni hlaseni.*/
		hasKH?: boolean|null;
		/**Gets a value indicating whether this instance is fuc.*/
		readonly isFuc?: boolean|null;
	}
	const enum GVazbaDokladuDtoNames { priz_hla = "priz_hla", ixp_pri = "ixp_pri", ixp_sek = "ixp_sek", ixs_nazev = "ixs_nazev", ac_ag = "ac_ag", typ_ag_sek = "typ_ag_sek", count = "count", doklady = "doklady", rok = "rok", nazev = "nazev", hasKH = "hasKH", isFuc = "isFuc",}
	const enum GVazbaDokladuDtoFragments { priz_hla = "*", ixp_pri = "*", ixp_sek = "*", ixs_nazev = "*", ac_ag = "*", typ_ag_sek = "*", count = "*", doklady = "*", rok = "*", nazev = "*", hasKH = "*", isFuc = "*",}
	const enum GVazbaDokladuDtoTypes { priz_hla = "number", ixp_pri = "string", ixp_sek = "string", ixs_nazev = "string", ac_ag = "string", typ_ag_sek = "number", count = "number", doklady = "string", rok = "string", nazev = "string", hasKH = "boolean", isFuc = "boolean",}
	const enum GVazbaDokladuDtoTypeLengths {}
	const enum RezimKnihy {
		castka=0,
		castkaMnozstvi=10,
		mnozstvi=20,
	}
	const enum GKumulaceEnum {
		bezKumulace,
		bezRozliseni,
		nevyrovnane,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\ZahranicniPlatby\GZahranicniPlatbyDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto zahraničních plateb (doplňující údaje)*/
	interface GZahranicniPlatbyDto {
		/**Identifikátor dokladu*/
		ixp?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**způsob hrazení poplatků  pro zahraniční platby*/
		hra_pop?: number|null;
		/**způsob úhrady pro zahraniční platby*/
		zp_z?: number|null;
		/**Název příjmce/plátce*/
		nazevP?: string|null;
		/**Stát příjmce/plátce*/
		statP?: string|null;
		/**Ulice příjmce/plátce*/
		uliceP?: string|null;
		/**Č.p. příjmce/plátce*/
		cpP?: string|null;
		/**Č.or. příjmce/plátce*/
		corP?: string|null;
		/**P.O. Box příjmce/plátce*/
		poBoxP?: string|null;
		/**PSČ příjmce/plátce*/
		pscP?: string|null;
		/**Pošta příjmce/plátce*/
		postaP?: string|null;
		/**Obec příjmce/plátce*/
		obecP?: string|null;
		/**Část obce příjmce/plátce*/
		castObceP?: string|null;
		/**Účet příjmce/plátce*/
		ucetP?: string|null;
		/**INN / Název účtu*/
		obeP?: string|null;
		/**Název banky*/
		nazevB?: string|null;
		/**Stát banky*/
		statB?: string|null;
		/**Ulice banky*/
		uliceB?: string|null;
		/**Č.p. banky*/
		cpB?: string|null;
		/**Č.or. banky*/
		corB?: string|null;
		/**P.O. Box banky*/
		poBoxB?: string|null;
		/**PSČ banky*/
		pscB?: string|null;
		/**Pošta banky*/
		postaB?: string|null;
		/**Obec banky*/
		obecB?: string|null;
		/**Část obce banky*/
		castObceB?: string|null;
		/**Měna Účet plátce*/
		ucetPlatceMena?: number|null;
		/**Měna Platba*/
		platbaMena?: number|null;
		/**Měna Požadovaná*/
		pozadovanaMena?: number|null;
		/**Měna Účet příjemce*/
		ucetPrijemceMena?: number|null;
		/**Seznam podmínek EuroUhrady*/
		podminkyEuroUhrady?: Gordic.Eko.Interface.GZahranicniPlatbyPodEuroUhradyDto[]|null;
		/**Popis*/
		popis?: string|null;
		/**Bankovní účet příjemce - změna při generování IBAN*/
		bu_ci?: string|null;
		/**Info*/
		info?: string|null;
		/**BIC*/
		bicB?: string|null;
		/**Typ BIC*/
		typBicB?: string|null;
		/**Filtr způsobu hrazení poplatků*/
		hra_pop_filter?: number[]|null;
		/**Název políčka obeP*/
		obeP_label?: string|null;
		/**Externí subjekt bankovního účtu*/
		ixs_esu_ban?: string|null;
		/**Zkratka státu Příjemce/plátce*/
		stat_sis_aa_P?: string|null;
		/**Zkratka státu Banky*/
		stat_sis_aa_B?: string|null;
		/**BIC typ ban banky*/
		bicTypBanB?: number|null;
		/**Stát banky numericky*/
		statBNum?: number|null;
		/**Permissions*/
		Permissions?: Gordic.Eko.Interface.GZahranicniPlatbyPermissions|null;
	}
	const enum GZahranicniPlatbyDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", hra_pop = "hra_pop", zp_z = "zp_z", nazevP = "nazevP", statP = "statP", uliceP = "uliceP", cpP = "cpP", corP = "corP", poBoxP = "poBoxP", pscP = "pscP", postaP = "postaP", obecP = "obecP", castObceP = "castObceP", ucetP = "ucetP", obeP = "obeP", nazevB = "nazevB", statB = "statB", uliceB = "uliceB", cpB = "cpB", corB = "corB", poBoxB = "poBoxB", pscB = "pscB", postaB = "postaB", obecB = "obecB", castObceB = "castObceB", ucetPlatceMena = "ucetPlatceMena", platbaMena = "platbaMena", pozadovanaMena = "pozadovanaMena", ucetPrijemceMena = "ucetPrijemceMena", podminkyEuroUhrady = "podminkyEuroUhrady", popis = "popis", bu_ci = "bu_ci", info = "info", bicB = "bicB", typBicB = "typBicB", hra_pop_filter = "hra_pop_filter", obeP_label = "obeP_label", ixs_esu_ban = "ixs_esu_ban", stat_sis_aa_P = "stat_sis_aa_P", stat_sis_aa_B = "stat_sis_aa_B", bicTypBanB = "bicTypBanB", statBNum = "statBNum", Permissions = "Permissions",}
	const enum GZahranicniPlatbyDtoFragments { ixp = "*", ixs_esu = "*", hra_pop = "*", zp_z = "*", nazevP = "*", statP = "*", uliceP = "*", cpP = "*", corP = "*", poBoxP = "*", pscP = "*", postaP = "*", obecP = "*", castObceP = "*", ucetP = "*", obeP = "*", nazevB = "*", statB = "*", uliceB = "*", cpB = "*", corB = "*", poBoxB = "*", pscB = "*", postaB = "*", obecB = "*", castObceB = "*", ucetPlatceMena = "*", platbaMena = "*", pozadovanaMena = "*", ucetPrijemceMena = "*", podminkyEuroUhrady = "*", popis = "*", bu_ci = "*", info = "*", bicB = "*", typBicB = "*", hra_pop_filter = "*", obeP_label = "*", ixs_esu_ban = "*", stat_sis_aa_P = "*", stat_sis_aa_B = "*", bicTypBanB = "*", statBNum = "*", Permissions = "*",}
	const enum GZahranicniPlatbyDtoTypes { ixp = "string", ixs_esu = "string", hra_pop = "number", zp_z = "number", nazevP = "string", statP = "string", uliceP = "string", cpP = "string", corP = "string", poBoxP = "string", pscP = "string", postaP = "string", obecP = "string", castObceP = "string", ucetP = "string", obeP = "string", nazevB = "string", statB = "string", uliceB = "string", cpB = "string", corB = "string", poBoxB = "string", pscB = "string", postaB = "string", obecB = "string", castObceB = "string", ucetPlatceMena = "number", platbaMena = "number", pozadovanaMena = "number", ucetPrijemceMena = "number", podminkyEuroUhrady = "Gordic.Eko.Interface.GZahranicniPlatbyPodEuroUhradyDto[]", popis = "string", bu_ci = "string", info = "string", bicB = "string", typBicB = "string", hra_pop_filter = "number[]", obeP_label = "string", ixs_esu_ban = "string", stat_sis_aa_P = "string", stat_sis_aa_B = "string", bicTypBanB = "number", statBNum = "number", Permissions = "Gordic.Eko.Interface.GZahranicniPlatbyPermissions",}
	const enum GZahranicniPlatbyDtoTypeLengths { ixp = 12, ixs_esu = 12, ixs_esu_ban = 12,}
	/**Vstupní dto pro read doplňujích informací pro zahraniční platby*/
	interface GZahranicniPlatbyReadReqDto {
		/**Identifikátor dokladu*/
		ixp?: string|null;
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**způsob hrazení poplatků  pro zahraniční platby*/
		hra_pop?: number|null;
		/**způsob úhrady pro zahraniční platby*/
		zp_z?: number|null;
		/**Bankovní účet příjemce*/
		bu_ci?: string|null;
		/**Kód banky příjemce*/
		sk_ci?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Kód banky vlastní*/
		sk_vl?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Měna*/
		mena?: number|null;
		/**Měna vybraná k platbě*/
		mena_poz?: number|null;
		/**Variabilní symbol*/
		vs?: string|null;
		/**Datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**Mód*/
		mod?: number|null;
		/**ReadOnly příznak - TRUE - pouze náhledové okno, nic nebude editovatelné*/
		read_only?: boolean|null;
		/**Informace pro server, že uživatel byl informavám s dotazem IBAN*/
		serverMessageIBAN?: boolean|null;
		/**Informace pro server, že uživatel byl informavám s dotazem SHA*/
		serverMessageSHA?: boolean|null;
	}
	const enum GZahranicniPlatbyReadReqDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", hra_pop = "hra_pop", zp_z = "zp_z", bu_ci = "bu_ci", sk_ci = "sk_ci", bu_vl = "bu_vl", sk_vl = "sk_vl", rok = "rok", mena = "mena", mena_poz = "mena_poz", vs = "vs", dat_spl = "dat_spl", mod = "mod", read_only = "read_only", serverMessageIBAN = "serverMessageIBAN", serverMessageSHA = "serverMessageSHA",}
	const enum GZahranicniPlatbyReadReqDtoFragments { ixp = "*", ixs_esu = "*", hra_pop = "*", zp_z = "*", bu_ci = "*", sk_ci = "*", bu_vl = "*", sk_vl = "*", rok = "*", mena = "*", mena_poz = "*", vs = "*", dat_spl = "*", mod = "*", read_only = "*", serverMessageIBAN = "*", serverMessageSHA = "*",}
	const enum GZahranicniPlatbyReadReqDtoTypes { ixp = "string", ixs_esu = "string", hra_pop = "number", zp_z = "number", bu_ci = "string", sk_ci = "string", bu_vl = "string", sk_vl = "string", rok = "number", mena = "number", mena_poz = "number", vs = "string", dat_spl = "JsonDate", mod = "number", read_only = "boolean", serverMessageIBAN = "boolean", serverMessageSHA = "boolean",}
	const enum GZahranicniPlatbyReadReqDtoTypeLengths { ixp = 12, ixs_esu = 12,}
	/**Vstupní dto pro kontrolu doplňujích informací pro zahraniční platby*/
	interface GZahranicniPlatbyKontrolaReqDto extends Gordic.Eko.Interface.GZahranicniPlatbyReadReqDto {
		/**způsob hrazení poplatků  pro zahraniční platby*/
		hra_pop?: number|null;
		/**způsob úhrady pro zahraniční platby*/
		zp_z?: number|null;
		/**Platební titul*/
		pla_tit?: number|null;
		/**Popis*/
		popis?: string|null;
	}
	const enum GZahranicniPlatbyKontrolaReqDtoNames { hra_pop = "hra_pop", zp_z = "zp_z", pla_tit = "pla_tit", popis = "popis", ixp = "ixp", ixs_esu = "ixs_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", bu_vl = "bu_vl", sk_vl = "sk_vl", rok = "rok", mena = "mena", mena_poz = "mena_poz", vs = "vs", dat_spl = "dat_spl", mod = "mod", read_only = "read_only", serverMessageIBAN = "serverMessageIBAN", serverMessageSHA = "serverMessageSHA",}
	const enum GZahranicniPlatbyKontrolaReqDtoFragments { hra_pop = "*", zp_z = "*", pla_tit = "*", popis = "*", ixp = "*", ixs_esu = "*", bu_ci = "*", sk_ci = "*", bu_vl = "*", sk_vl = "*", rok = "*", mena = "*", mena_poz = "*", vs = "*", dat_spl = "*", mod = "*", read_only = "*", serverMessageIBAN = "*", serverMessageSHA = "*",}
	const enum GZahranicniPlatbyKontrolaReqDtoTypes { hra_pop = "number", zp_z = "number", pla_tit = "number", popis = "string", ixp = "string", ixs_esu = "string", bu_ci = "string", sk_ci = "string", bu_vl = "string", sk_vl = "string", rok = "number", mena = "number", mena_poz = "number", vs = "string", dat_spl = "JsonDate", mod = "number", read_only = "boolean", serverMessageIBAN = "boolean", serverMessageSHA = "boolean",}
	const enum GZahranicniPlatbyKontrolaReqDtoTypeLengths { popis = 140, ixp = 12, ixs_esu = 12,}
	/**Výstupní dto u kontroly doplňujích informací pro zahraniční platby*/
	interface GZahranicniPlatbyKontrolaResDto {
		/**způsob hrazení poplatků  pro zahraniční platby*/
		hra_pop?: number|null;
		/**způsob úhrady pro zahraniční platby*/
		zp_z?: number|null;
		/**Platební titul*/
		pla_tit?: number|null;
		/**Popis*/
		popis?: string|null;
		/**UPL*/
		upl?: number|null;
	}
	const enum GZahranicniPlatbyKontrolaResDtoNames { hra_pop = "hra_pop", zp_z = "zp_z", pla_tit = "pla_tit", popis = "popis", upl = "upl",}
	const enum GZahranicniPlatbyKontrolaResDtoFragments { hra_pop = "*", zp_z = "*", pla_tit = "*", popis = "*", upl = "*",}
	const enum GZahranicniPlatbyKontrolaResDtoTypes { hra_pop = "number", zp_z = "number", pla_tit = "number", popis = "string", upl = "number",}
	const enum GZahranicniPlatbyKontrolaResDtoTypeLengths { popis = 140,}
	/**Dto pro zobrazení podmínky Euroúhrady zahraniční platby*/
	interface GZahranicniPlatbyPodEuroUhradyDto {
		/**Identifikátor podmínky*/
		name?: string|null;
		/**Ikona*/
		icon?: string|null;
		/**Text*/
		primaryText?: string|null;
		/**Hodnota (0/1)*/
		value?: number|null;
		/**Pořadí*/
		sortOrder?: number|null;
	}
	const enum GZahranicniPlatbyPodEuroUhradyDtoNames { name = "name", icon = "icon", primaryText = "primaryText", value = "value", sortOrder = "sortOrder",}
	const enum GZahranicniPlatbyPodEuroUhradyDtoFragments { name = "*", icon = "*", primaryText = "*", value = "*", sortOrder = "*",}
	const enum GZahranicniPlatbyPodEuroUhradyDtoTypes { name = "string", icon = "string", primaryText = "string", value = "number", sortOrder = "number",}
	const enum GZahranicniPlatbyPodEuroUhradyDtoTypeLengths {}
	/**Permissions pro práci s zahraniční platbou*/
	interface GZahranicniPlatbyPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno potvrdit zahraniční platbu*/
		LzeOk: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat pole Poplatky hradí*/
		LzePoleHraPop: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat pole Uhradit*/
		LzePoleZpZ: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat pole Platební titul*/
		LzePolePlatTit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat Informace pro příjemce*/
		LzePolePopis: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GZahranicniPlatbyPermissionsNames { LzeOk = "LzeOk", LzePoleHraPop = "LzePoleHraPop", LzePoleZpZ = "LzePoleZpZ", LzePolePlatTit = "LzePolePlatTit", LzePolePopis = "LzePolePopis",}
	const enum GZahranicniPlatbyPermissionsFragments { LzeOk = "*", LzePoleHraPop = "*", LzePoleZpZ = "*", LzePolePlatTit = "*", LzePolePopis = "*",}
	const enum GZahranicniPlatbyPermissionsTypes { LzeOk = "Gordic.General.ApplicationInterface.GPermission", LzePoleHraPop = "Gordic.General.ApplicationInterface.GPermission", LzePoleZpZ = "Gordic.General.ApplicationInterface.GPermission", LzePolePlatTit = "Gordic.General.ApplicationInterface.GPermission", LzePolePopis = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GZahranicniPlatbyPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Doklady\ZahranicniPlatby\IGZahranicniPlatby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - zahraniční plateby (doplňující údaje)*/
	interface ZahranicniPlatby {
		/**Načtení doplňujích údajů k zahraničním platbám*/
		read(rq?:Gordic.Eko.Interface.GZahranicniPlatbyReadReqDto|CallParams<GServiceReadRequest<Gordic.Eko.Interface.GZahranicniPlatbyReadReqDto>>): _Task<GServiceReadRequest<Gordic.Eko.Interface.GZahranicniPlatbyReadReqDto>,GServiceReadResponse<Gordic.Eko.Interface.GZahranicniPlatbyDto>>;
		/**Kontrola doplňujích údajů k zahraničním platbám*/
		kontrola(rq?:Gordic.Eko.Interface.GZahranicniPlatbyKontrolaReqDto|CallParams<GServiceActionRequest<Gordic.Eko.Interface.GZahranicniPlatbyKontrolaReqDto>>): _Task<GServiceActionRequest<Gordic.Eko.Interface.GZahranicniPlatbyKontrolaReqDto>,GServiceActionResponse<Gordic.Eko.Interface.GZahranicniPlatbyKontrolaResDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZahranicniPlatby: ServiceBase & Catalog.ZahranicniPlatby;
	}
	const ZahranicniPlatby: Client["ZahranicniPlatby"];
}
declare namespace Gordic.Eko.Interface {
	/**Dummy filtr*/
	const enum GZahranicniPlatbyFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\EkoBookInit\GEkoBookVariant.d.ts 

declare namespace Gordic.Eko.Interface {
    /**Selected variant of book*/
	const enum GEkoBookVariant {
        /**Book is not set or variant is unknown*/
		Unknown//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**One particullar book is set*/
		One//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Books of current year are set*/
		Year//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**All books are set*/
		All//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEAktivitaDokladu.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Povolene stavy aktivity dokladu*/
	const enum GEAktivitaDokladu {
		/**Aktivni*/
		Aktivni=100,
		/**Storno*/
		Storno=500,
		/**Uzavreny*/
		Uzavren=800,
		/**Zruseny*/
		Zrusen=900,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEDruhDokladu.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Druh dokladu
	*     Tabulka: ekocdrd
	*/
	const enum GEDruhDokladu {
		/**Drd nebyl dosud nastaven (po podani)*/
		Nenastaveno=-1,
		/**Bezne uctovani (drd = 0)*/
		BezneUctovani=0,
		/**Pocatecni stavy (drd = 1)*/
		PocatecniStavyUcetnictvi=1,
		/**Schvaleny rozpocet (drd = 2)*/
		SchvalenyRozpocet=2,
		/**Upravy rozpoctu (drd = 3)*/
		UpravaRozpoctu=3,
		/**Zaverecne zapisy (drd = 4)*/
		ZaverecneUcetniZapisy=4,
		/**Uzaverni ucetnich knih (drd = 5)*/
		UzavreniUcetnichKnih=5,
		/**Rezervace rozpoctovych prostredku (drd = 6)*/
		RezervaceRozpoctovychProstredku=6,
		/**Uprava rozpoctu MF (drd = 7)*/
		UpravaRozpoctuSchvaleneMF=7,
		/**Uprava rozpoctu usnesenim vlady (drd = 8)*/
		UpravaRozpoctuUsneseniVlady=8,
		/**Pozadavek na rozpocet - vicelete zmenove rizeni (drd = 9)*/
		PozadavekNaRozpocet=9,
		/**Smlouvy (drd = 10)*/
		Smlouvy=10,
		/**Smlouvy na verejnou zakazku*/
		SmlouvyVazaneNaVerejnouZakazku=11,
		/**Verejne zakazky*/
		VerejneZakazky=12,
		/**Ocekavana skutecnost*/
		OcekavanaSkutecnost=13,
		/**Vazani vydaju*/
		VazaniVydaju=14,
		/**Objednavky vazane na plan*/
		ObjednavkyVazanePrimoNaPlan=15,
		/**Objednavky vazane na smlouvu*/
		ObjednavkyVazaneNaSmlouvu=16,
		/**Objednavky BLK*/
		ObjednanoBLK=17,
		/**Rezervovano smlouvou - SML (drd = 18)*/
		RezervovanoSML=18,
		/**Tvorba ENNV*/
		TvorbaENNV=22,
		/**Uprava mimorozp. zdroju*/
		UpravaMimorozpoctovychZdroju=23,
		/**Uzavreni rozpoctu*/
		UzavreniRozpoctu=24,
		/**Prevod mimorozpoctovych zdroju (drd = 25)*/
		PrevodMimorozpoctovychZdroju=25,
		/**Zmeny max. limitu BU  (drd = 30)*/
		ZmenyMaximalnihoLimituBU=30,
		/**Zmeny limitu BU (drd = 31)*/
		ZmenyLimituBU=31,
		/**Uprava rozpoctu v ramci rozpoctoveho provizoria*/
		ProvizoriumUpravaRozpoctu=63,
		/**Schvaleny limit*/
		SchvalenyLimit=202,
		/**Upraveny limit KAP*/
		UpravenyLimitVKompetenciKAP=203,
		/**Upraveny limit MF*/
		UpravenyLimitVKompetenciMF=207,
		/**Upraveny limit vlady*/
		UpravenyLimitVKompotenciVladyCR=208,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEKategorieDokladu.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Seznam kategorii dokladu (NUTNO DOPLNIT DALSIMI !!!!)
	*     Tab: ginckat
	*/
	const enum GEKategorieDokladu {
		/**Ucetni doklad*/
		UcetniDoklad=1000,
		UcetniDokladDanovy=1001,
		/**Inslovencni doklad*/
		InsolvencniDanovyDoklad=1005,
		/**Insolvecni doklad: Oprava u nedobytné pohledávky dle §46/74a ZDPH*/
		InsolvencniDanovyDokladDlePar46=1006,
		OpravaUcetnihoDokladu=1010,
		OpravaUcetnihoDokladuDanoveho=1011,
		/**Rozpočtový doklad*/
		RozpoctovyDoklad=1100,
		/**RO decentrální*/
		RODecentralni=1130,
		/**Opravné RO decentrální*/
		OpravneROCentralni=1160,
		/**Opravné RO centrální mimo ISPROFIN*/
		OpravneROCentralniMimoISPROFIN=1170,
		/**Opravné RO centrální související s ISPROFIN*/
		OpravneROCentralniSouvisejiciSISPROFIN=1180,
		/**Opravne rozhodnuti o pouziti evidence naroku z nespotreb.vydaju (ktg_typ=1184)*/
		OpravneRozhodnutiOPouzitiENNV=1184,
		/**Rozhodnuti o pouziti evidence naroku z nespotreb.vydaju (ktg_typ=1185)*/
		RozhodnutiOPouzitiENNV=1185,
		/**Otevreni limitu bank. uctu*/
		OtevreniLimituBankovnihoUctu=1390,
		/**Oprava otevreni limitu BU*/
		OpravaOtevreniLimituBankovnihoUctu=1395,
		/**Zaverecne rozpoctove opatreni*/
		ZaverecneRozpoctoveOpatreni=1197,
		/**Opravne zaverecne rozpoctove opatreni*/
		OpravneZaverecneRozpoctoveOpatreni=1198,
		/**Doklady likvidovane z BUC*/
		DokladNesparovanychPlateb=1790,
		/**Doklady likvidovane z BUC - vydej*/
		DokladNesparovanychPlatebVydej=1791,
		/**Doklady likvidovane z BUC - prijem*/
		DokladNesparovanychPlatebPrijem=1792,
		/**Doklady likvidovane z BUC - vydej danovy*/
		DokladNesparovanychPlatebVydejDanovy=1793,
		/**Doklady likvidovane z BUC - prijem danovy*/
		DokladNesparovanychPlatebPrijemDanovy=1794,
		/**Limitovaný příslib - PAM*/
		LimitovanyPrislib=1135,
		/**Individuální příslib - PAM*/
		IndividualniPrislib=1136,
		/**Opravný limitovaný příslib - PAM*/
		OpravnyLimitovanyPrislib=1137,
		/**Opravný individuální příslib - PAM*/
		OpravnyIndividualniPrislib=1138,
		/**Opravný daňový doklad KDF*/
		OpravnyDanovyDokladKDF=1306,
		/**Opravný daňový doklad KOF*/
		OpravnyDanovyDokladKOF=1406,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEKHPrava.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Prava prace s udaji pro kontrolni hlaseni / danove evidence*/
	const enum GEKHPrava {
		/**Pouze pro prohlizeni*/
		Prohlizeni,
		/**Moznost oprav*/
		Oprava,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEPovoleniVazbyDokladu.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Povoleni vazby dokladu*/
	const enum GEPovoleniVazbyDokladu {
		/**Doklad nelze vazat*/
		nelze,
		/**Doklad muze byt navazan*/
		nepovinne,
		/**Doklad musi byt navazan*/
		povinne,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEResultOfProcessingTheMessage.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Vysledek zpracovani predane zpravy*/
	const enum GEResultOfProcessingTheMessage {
		/**Ok - konec*/
		OK=10,
		/**chyba konec*/
		Error=20,
		/**Opakovani*/
		Repeat=30,
		/**Neobslouzeno*/
		NoServed=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GERezimPraceSVazbami.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Rezim prace s vazbami*/
	const enum GERezimPraceSVazbami {
		VazbaSekundaruNaPrimarni,
		VazbaPrimarnihoNaSekundar,
		Nenastaven,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GEStavyDokladu.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Stavy dokladu*/
	const enum GEStavyDokladu {
		/**Doklad je ve stavu nezauctovano a nema vyplnene cislo jednaci.*/
		Neevidovano=-1,
		/**Nezauctovany doklad*/
		Nezauctovano=0,
		/**Podany doklad*/
		Podano=1,
		/**Doklad je evidovan*/
		Evidovano=2,
		/**?*/
		Jinde=3,
		/**?*/
		Polozky=4,
		/**Doklad ma porizene zapisy*/
		Navrh=5,
		/**Nektere zapisy jsou zauctovane, nektere ne*/
		ZauctovanoCastecne=10,
		/**Doklad je schvaleny*/
		Schvaleno=30,
		/**Doklad byl spravne interne/externi validovan*/
		Validovano=38,
		/**Doklad je cely zauctovany*/
		Zauctovano=40,
		/**Doklad je uzavreny*/
		Uzavreno=50,
		/**Doklad je stornovany*/
		Storno=90,
		/**Storno, neni to stav, ale vzhledem k tomu ze se zmeny posilaji pro zmene detailu pridano sem*/
		Neprecteno=111,
		/**Neprecteno, neni to stav, ale vzhledem k tomu ze se zmeny posilaji pro zmene detailu pridano sem*/
		Precteno=112,
		/**Doklad predan*/
		Predano=113,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GETypeTransferMessage.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Typ prenosova zpravy*/
	const enum GETypeTransferMessage {
		/**Chybova zprava, nelze pokracovat dal*/
		ErrorMessage=-1,
		/**Chybova zprava z validace, nelze pokracovat dal*/
		ErrorValidation=-2,
		/**Vyjimka jiz se nepokracuje dal*/
		ExceptionMessage=-15,
		/**Varovna zprava. Jiz se dal nepokracuje.*/
		WarningMessage=-10,
		/**Zprava pro zobrazeni chybove sestavy a konec zpracovani (vypis chyboveho protokolu)*/
		ReportErrorMessage=-20,
		/**Zprava pro zobrazeni sestavy. Pred zobrazenim sestavy se zobrazi dotaz, zda zobrazit report.
		*     Pokud bude vyplnena zprava Message2, zobrazi se zprava po zavreni reportu nebo zprava Message1 (pokud uzivatel nezobrazil report)
		*/
		ReportErrorQuestionMessage=-25,
		/**Info zprava o vysledku. Jiz se dal nepokracuje.*/
		OkMessage=0,
		/**informacni zprava. Lze pokracovat dal*/
		InfoMessage=1,
		/**Otazka na rozhodnuti jit cestou A, nebo B. Po odpovedi se pokracuje dal.(Vysledek je v ResultQuestion ="YES" || "NO")*/
		DecisionQuestionMessage=4,
		/**Otazka, po kladne odpovedi, lze pokracovat (nutna reakce uzivatele)*/
		QuestionMessage=5,
		/**Varovna otazka, po kladne odpovedi, lze pokracovat (nutna reakce uzivatele, vim co delam)*/
		WarningQuestionMessage=6,
		/**Pozadavek zadani textu (ulozi se do vlastnosti v poleparam[0]). Pokud text nezada(storno), nepokracuje se dal. Zobrazi se hlaska message2*/
		InputText=7,
		/**Zprava pro zobrazeni sestavy (vysledek akce)*/
		ReportShow=12,
		/**Zprava pro zobrazeni sestavy a po zobrazeni dotaz s pokracovanim(nutna reakce uzivatele)*/
		ReportQuestionMessage=11,
		/**Zprava pro zobrazeni sestavy a pred zobrazenim sestavy se zobrazi dotaz, zda zobrazit report (vzdy se pokracuje dal bez ohledu na odpoved)*/
		ReportBeforeQuestionMessage=15,
		/**Zprava pro zobrazeni sestavy a pred zobrazenim sestavy se zobrazi dotaz, zda zobrazit report a nalsednem dotazu, zda pokracovat*/
		ReportAllQuestionMessage=20,
		/**Zprava pro spusteni testovaci sestavy a pokracuje se dal*/
		ReportTestMessage=10,
		/**Uzivatelske zpracovani zpravy - programator si obslouzi sam*/
		UserMessage=100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GRezimPraceSVazbami.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Rezim prace s vazbami*/
	const enum GRezimPraceSVazbami {
		VazbaSekundaruNaPrimarni,
		VazbaPrimarnihoNaSekundar,
		Nenastaven,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Enums\GVecnyProfilOperace.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Definice operací nad Věcným profilem*/
	const enum GVecnyProfilOperace {
		/**Evidence položky*/
		evidovat=20,
		/**Schválení položky*/
		schvalit=30,
		/**Storno položky*/
		stornovat=90,
		/**Zrušení storna položky*/
		zrusitStorno=91,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Hledani\GSearchAcAgDto.d.ts 

declare namespace Gordic.Eko.Interface {
	interface GSearchAcAgData {
		/**variabilní symbol záznamu*/
		ac_ag?: string|null;
		/**ixp_den záznamu*/
		ixp_den?: string|null;
	}
	const enum GSearchAcAgDataNames { ac_ag = "ac_ag", ixp_den = "ixp_den",}
	const enum GSearchAcAgDataFragments { ac_ag = "*", ixp_den = "*",}
	const enum GSearchAcAgDataTypes { ac_ag = "string", ixp_den = "string",}
	const enum GSearchAcAgDataTypeLengths {}
	interface GSearchAcAgItem extends Gordic.Eko.Interface.GSearchItem<Gordic.Eko.Interface.GSearchAcAgData> {
	}
	const enum GSearchAcAgItemNames { AppInfo = "AppInfo", DataInfo = "DataInfo", Ixx1 = "Ixx1", Ixx2 = "Ixx2", Ixx3 = "Ixx3", CoJsemZac = "CoJsemZac", Nazev = "Nazev", DalsiInformace = "DalsiInformace",}
	const enum GSearchAcAgItemFragments { AppInfo = "*", DataInfo = "*", Ixx1 = "*", Ixx2 = "*", Ixx3 = "*", CoJsemZac = "*", Nazev = "*", DalsiInformace = "*",}
	const enum GSearchAcAgItemTypes { AppInfo = "Gordic.Wfl.Interface.GSearchItemAppAndTypeInfo", DataInfo = "Gordic.Eko.Interface.GSearchAcAgData", Ixx1 = "string", Ixx2 = "string", Ixx3 = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", Nazev = "string", DalsiInformace = "Gordic.Wfl.Interface.GIdentifikatorDalsiInformaceDto[]",}
	const enum GSearchAcAgItemTypeLengths {}
	interface GSearchAcAgResponseDto extends Gordic.Eko.Interface.GSearchResponseDto<Gordic.Eko.Interface.GSearchAcAgItem, Gordic.Eko.Interface.GSearchAcAgData> {
	}
	const enum GSearchAcAgResponseDtoNames { Items = "Items", Faze = "Faze",}
	const enum GSearchAcAgResponseDtoFragments { Items = "*", Faze = "*",}
	const enum GSearchAcAgResponseDtoTypes { Items = "Gordic.Eko.Interface.GSearchAcAgItem[]", Faze = "string",}
	const enum GSearchAcAgResponseDtoTypeLengths {}
	interface GSearchAcAgRequestDto {
		ac_ag?: string[]|null;
	}
	const enum GSearchAcAgRequestDtoNames { ac_ag = "ac_ag",}
	const enum GSearchAcAgRequestDtoFragments { ac_ag = "*",}
	const enum GSearchAcAgRequestDtoTypes { ac_ag = "string[]",}
	const enum GSearchAcAgRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Hledani\GSearchAcDto.d.ts 

declare namespace Gordic.Eko.Interface {
	interface GSearchAcData {
		/**variabilní symbol záznamu*/
		ac?: string|null;
		/**ixp_den záznamu*/
		ixp_den?: string|null;
	}
	const enum GSearchAcDataNames { ac = "ac", ixp_den = "ixp_den",}
	const enum GSearchAcDataFragments { ac = "*", ixp_den = "*",}
	const enum GSearchAcDataTypes { ac = "string", ixp_den = "string",}
	const enum GSearchAcDataTypeLengths {}
	interface GSearchAcItem extends Gordic.Eko.Interface.GSearchItem<Gordic.Eko.Interface.GSearchAcData> {
	}
	const enum GSearchAcItemNames { AppInfo = "AppInfo", DataInfo = "DataInfo", Ixx1 = "Ixx1", Ixx2 = "Ixx2", Ixx3 = "Ixx3", CoJsemZac = "CoJsemZac", Nazev = "Nazev", DalsiInformace = "DalsiInformace",}
	const enum GSearchAcItemFragments { AppInfo = "*", DataInfo = "*", Ixx1 = "*", Ixx2 = "*", Ixx3 = "*", CoJsemZac = "*", Nazev = "*", DalsiInformace = "*",}
	const enum GSearchAcItemTypes { AppInfo = "Gordic.Wfl.Interface.GSearchItemAppAndTypeInfo", DataInfo = "Gordic.Eko.Interface.GSearchAcData", Ixx1 = "string", Ixx2 = "string", Ixx3 = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", Nazev = "string", DalsiInformace = "Gordic.Wfl.Interface.GIdentifikatorDalsiInformaceDto[]",}
	const enum GSearchAcItemTypeLengths {}
	interface GSearchAcResponseDto extends Gordic.Eko.Interface.GSearchResponseDto<Gordic.Eko.Interface.GSearchAcItem, Gordic.Eko.Interface.GSearchAcData> {
	}
	const enum GSearchAcResponseDtoNames { Items = "Items", Faze = "Faze",}
	const enum GSearchAcResponseDtoFragments { Items = "*", Faze = "*",}
	const enum GSearchAcResponseDtoTypes { Items = "Gordic.Eko.Interface.GSearchAcItem[]", Faze = "string",}
	const enum GSearchAcResponseDtoTypeLengths {}
	interface GSearchAcRequestDto {
		ac?: string[]|null;
	}
	const enum GSearchAcRequestDtoNames { ac = "ac",}
	const enum GSearchAcRequestDtoFragments { ac = "*",}
	const enum GSearchAcRequestDtoTypes { ac = "string[]",}
	const enum GSearchAcRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Hledani\GSearchResponseDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**ResponseDTO for search action*/
	interface GSearchResponseDto<T, TData> {
		/**Found items*/
		Items?: T[]|null;
		/**Current Faze*/
		Faze?: string|null;
	}
	const enum GSearchResponseDtoNames { Items = "Items", Faze = "Faze",}
	const enum GSearchResponseDtoFragments { Items = "*", Faze = "*",}
	const enum GSearchResponseDtoTypes { Items = "T[]", Faze = "string",}
	const enum GSearchResponseDtoTypeLengths {}
	/**Base Search item DTO*/
	interface GSearchItem<T> extends Gordic.Wfl.Interface.GSearchItem {
		/**Info about to which application item belongs*/
		AppInfo?: Gordic.Wfl.Interface.GSearchItemAppAndTypeInfo|null;
		/**More information with data values*/
		DataInfo?: T|null;
	}
	const enum GSearchItemNames { AppInfo = "AppInfo", DataInfo = "DataInfo", Ixx1 = "Ixx1", Ixx2 = "Ixx2", Ixx3 = "Ixx3", CoJsemZac = "CoJsemZac", Nazev = "Nazev", DalsiInformace = "DalsiInformace",}
	const enum GSearchItemFragments { AppInfo = "*", DataInfo = "*", Ixx1 = "*", Ixx2 = "*", Ixx3 = "*", CoJsemZac = "*", Nazev = "*", DalsiInformace = "*",}
	const enum GSearchItemTypes { AppInfo = "Gordic.Wfl.Interface.GSearchItemAppAndTypeInfo", DataInfo = "T", Ixx1 = "string", Ixx2 = "string", Ixx3 = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", Nazev = "string", DalsiInformace = "Gordic.Wfl.Interface.GIdentifikatorDalsiInformaceDto[]",}
	const enum GSearchItemTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Hledani\GSearchVsDto.d.ts 

declare namespace Gordic.Eko.Interface {
	interface GSearchVsData {
		/**variabilní symbol záznamu*/
		vs?: string[]|null;
		/**ixp_den záznamu*/
		ixp_den?: string|null;
	}
	const enum GSearchVsDataNames { vs = "vs", ixp_den = "ixp_den",}
	const enum GSearchVsDataFragments { vs = "*", ixp_den = "*",}
	const enum GSearchVsDataTypes { vs = "string[]", ixp_den = "string",}
	const enum GSearchVsDataTypeLengths {}
	interface GSearchVsItem extends Gordic.Eko.Interface.GSearchItem<Gordic.Eko.Interface.GSearchVsData> {
	}
	const enum GSearchVsItemNames { AppInfo = "AppInfo", DataInfo = "DataInfo", Ixx1 = "Ixx1", Ixx2 = "Ixx2", Ixx3 = "Ixx3", CoJsemZac = "CoJsemZac", Nazev = "Nazev", DalsiInformace = "DalsiInformace",}
	const enum GSearchVsItemFragments { AppInfo = "*", DataInfo = "*", Ixx1 = "*", Ixx2 = "*", Ixx3 = "*", CoJsemZac = "*", Nazev = "*", DalsiInformace = "*",}
	const enum GSearchVsItemTypes { AppInfo = "Gordic.Wfl.Interface.GSearchItemAppAndTypeInfo", DataInfo = "Gordic.Eko.Interface.GSearchVsData", Ixx1 = "string", Ixx2 = "string", Ixx3 = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", Nazev = "string", DalsiInformace = "Gordic.Wfl.Interface.GIdentifikatorDalsiInformaceDto[]",}
	const enum GSearchVsItemTypeLengths {}
	interface GSearchVsResponseDto extends Gordic.Eko.Interface.GSearchResponseDto<Gordic.Eko.Interface.GSearchVsItem, Gordic.Eko.Interface.GSearchVsData> {
	}
	const enum GSearchVsResponseDtoNames { Items = "Items", Faze = "Faze",}
	const enum GSearchVsResponseDtoFragments { Items = "*", Faze = "*",}
	const enum GSearchVsResponseDtoTypes { Items = "Gordic.Eko.Interface.GSearchVsItem[]", Faze = "string",}
	const enum GSearchVsResponseDtoTypeLengths {}
	interface GSearchVsRequestDto {
		vs?: string[]|null;
	}
	const enum GSearchVsRequestDtoNames { vs = "vs",}
	const enum GSearchVsRequestDtoFragments { vs = "*",}
	const enum GSearchVsRequestDtoTypes { vs = "string[]",}
	const enum GSearchVsRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\NavazaniRealizatori\TypoveDatasety\Gordic.Eko.Interface.SeznamRealizatoru.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:SeznamRealizatoru*/
	interface SeznamRealizatoruDto {
		/**DBCOLUMN:SeznamRealizatoru.nazevR*/
		nazevR?: string|null;
		/**DBCOLUMN:SeznamRealizatoru.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamRealizatoru.aktivitaR*/
		aktivitaR?: number|null;
		/**DBCOLUMN:SeznamRealizatoru.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:SeznamRealizatoru.priz_kom*/
		priz_kom?: number|null;
		/**DBCOLUMN:SeznamRealizatoru.aktivitaK*/
		aktivitaK?: number|null;
		/**DBCOLUMN:SeznamRealizatoru.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamRealizatoru.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamRealizatoru.aktivifaF*/
		aktivifaF?: number|null;
		/**DBCOLUMN:SeznamRealizatoru.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamRealizatoru.defaultRealizator*/
		defaultRealizator?: number|null;
	}
	const enum SeznamRealizatoruDtoNames { nazevR = "nazevR", cis_real = "cis_real", aktivitaR = "aktivitaR", ixs_fun = "ixs_fun", priz_kom = "priz_kom", aktivitaK = "aktivitaK", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", aktivifaF = "aktivifaF", ico = "ico", defaultRealizator = "defaultRealizator",}
	const enum SeznamRealizatoruDtoFragments { nazevR = "*", cis_real = "*", aktivitaR = "*", ixs_fun = "*", priz_kom = "*", aktivitaK = "*", dat_zmena = "*", nazev_rf = "*", aktivifaF = "*", ico = "*", defaultRealizator = "*",}
	const enum SeznamRealizatoruDtoTypes { nazevR = "string", cis_real = "string", aktivitaR = "number", ixs_fun = "string", priz_kom = "number", aktivitaK = "number", dat_zmena = "JsonDate", nazev_rf = "string", aktivifaF = "number", ico = "string", defaultRealizator = "number",}
	const enum SeznamRealizatoruDtoTypeLengths { nazevR = 50, cis_real = 6, ixs_fun = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\ObecneSeskupeni\GHodnotyUzlu.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GHodnotyUzluDto {
		/**DBCOLUMN:Seznam.element_ose*/
		element_ose?: string|null;
		/**DBCOLUMN:Seznam.rokmes_od*/
		rokmes_od?: string|null;
		/**DBCOLUMN:Seznam.rokmes_do*/
		rokmes_do?: string|null;
	}
	const enum GHodnotyUzluDtoNames { element_ose = "element_ose", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do",}
	const enum GHodnotyUzluDtoFragments { element_ose = "*", rokmes_od = "*", rokmes_do = "*",}
	const enum GHodnotyUzluDtoTypes { element_ose = "string", rokmes_od = "string", rokmes_do = "string",}
	const enum GHodnotyUzluDtoTypeLengths { rokmes_od = 6, rokmes_do = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\GEkoFilePreviewDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Zdroje eko souborů pro náhled*/
	const enum GEkoFilePreviewEnum {
		/**Doklad o zaúčtování*/
		DokladOZauctovani=0,
	}
	interface GEkoFilePreviewDto extends Gordic.Wfl.Interface.GWflFileFetchAsyncBaseDataDto {
		/**Gets or sets the source.*/
		source?: Gordic.Eko.Interface.GEkoFilePreviewEnum|null;
		/**Gets or sets the ixp. Ixp dokladu*/
		ixp?: string|null;
		/**Gets or sets the ixb. Ixb přílohy*/
		ixb?: string|null;
		/**drd - Druh dokumentu*/
		drd?: number|null;
		/**Důvod pro otevření souboru*/
		reason?: string|null;
	}
	const enum GEkoFilePreviewDtoNames { source = "source", ixp = "ixp", ixb = "ixb", drd = "drd", reason = "reason", forceNew = "forceNew", conversion = "conversion", cacheConversion = "cacheConversion", convertToBase64 = "convertToBase64", alwaysConvertToPdf = "alwaysConvertToPdf", alwaysUTF8 = "alwaysUTF8",}
	const enum GEkoFilePreviewDtoFragments { source = "*", ixp = "*", ixb = "*", drd = "*", reason = "*", forceNew = "*", conversion = "*", cacheConversion = "*", convertToBase64 = "*", alwaysConvertToPdf = "*", alwaysUTF8 = "*",}
	const enum GEkoFilePreviewDtoTypes { source = "Gordic.Eko.Interface.GEkoFilePreviewEnum", ixp = "string", ixb = "string", drd = "number", reason = "string", forceNew = "boolean", conversion = "boolean", cacheConversion = "boolean", convertToBase64 = "boolean", alwaysConvertToPdf = "boolean", alwaysUTF8 = "boolean",}
	const enum GEkoFilePreviewDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\GWflForEkoDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Společný předek seznamového DTO se společnými WFL sloupci*/
	interface GWflForEkoDto {
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
	const enum GWflForEkoDtoNames { ixp = "ixp", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet",}
	const enum GWflForEkoDtoFragments { ixp = "Base", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy",}
	const enum GWflForEkoDtoTypes { ixp = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number",}
	const enum GWflForEkoDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\DatoveObjekty\GC0C1Pair.d.ts 

declare namespace Gordic.Eko.Interface {
	/**MD+DAL. Obsahuje dvě čísla C0, C1 a operace nad nimi*/
	interface GC0C1Pair {
		/**MD*/
		C0?: JsonDecimal|null;
		/**DAL*/
		C1?: JsonDecimal|null;
		/**MD-DAL*/
		readonly C0C1?: JsonDecimal|null;
		/**jsou obe cisla NULL?*/
		readonly IsNull?: boolean|null;
	}
	const enum GC0C1PairNames { C0 = "C0", C1 = "C1", C0C1 = "C0C1", IsNull = "IsNull",}
	const enum GC0C1PairFragments { C0 = "*", C1 = "*", C0C1 = "*", IsNull = "*",}
	const enum GC0C1PairTypes { C0 = "JsonDecimal", C1 = "JsonDecimal", C0C1 = "JsonDecimal", IsNull = "boolean",}
	const enum GC0C1PairTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\DTO\GAIRecognizedItemExtendedDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Položka vytěžená pomocí AI rozšířená o další hodnoty.*/
	interface GAIRecognizedItemExtendedDto extends Gordic.Gin.Interface.GAIRecognizedItemDto {
		/**Zdroj vytěžených dat.*/
		Source?: Gordic.Eko.Interface.GAIRecognizedItemSource|null;
	}
	const enum GAIRecognizedItemExtendedDtoNames { Source = "Source", ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", hodnota_upr = "hodnota_upr", hodnota_orig = "hodnota_orig", typ_vytez_pol = "typ_vytez_pol", pravdepodobnost = "pravdepodobnost", page_index = "page_index", top_left_x = "top_left_x", top_left_y = "top_left_y", size_x = "size_x", size_y = "size_y", ItemTxt = "ItemTxt", Value = "Value", ImagePositionPageNumber = "ImagePositionPageNumber", ImagePositionTopLeft = "ImagePositionTopLeft", ImagePositionSize = "ImagePositionSize",}
	const enum GAIRecognizedItemExtendedDtoFragments { Source = "*", ixs_ulo = "*", por_cislo = "*", hodnota_upr = "*", hodnota_orig = "*", typ_vytez_pol = "*", pravdepodobnost = "*", page_index = "*", top_left_x = "*", top_left_y = "*", size_x = "*", size_y = "*", ItemTxt = "*", Value = "*", ImagePositionPageNumber = "*", ImagePositionTopLeft = "*", ImagePositionSize = "*",}
	const enum GAIRecognizedItemExtendedDtoTypes { Source = "Gordic.Eko.Interface.GAIRecognizedItemSource", ixs_ulo = "string", por_cislo = "number", hodnota_upr = "string", hodnota_orig = "string", typ_vytez_pol = "Gordic.Ginis.DbModel.GGinctpoEnum", pravdepodobnost = "JsonDecimal", page_index = "number", top_left_x = "JsonDecimal", top_left_y = "JsonDecimal", size_x = "JsonDecimal", size_y = "JsonDecimal", ItemTxt = "string", Value = "string|number|boolean|Date", ImagePositionPageNumber = "number", ImagePositionTopLeft = "Gordic.Gin.Interface.GVector2Dto", ImagePositionSize = "Gordic.Gin.Interface.GVector2Dto",}
	const enum GAIRecognizedItemExtendedDtoTypeLengths {}
	/**Zdroj vytěžených dat.*/
	const enum GAIRecognizedItemSource {
		/**Vytěžení dat pomocí umělé inteligence (NATHAN, FormRecognizer a další).*/
		AI,
		/**Vytěžení dat z QR kódu.*/
		QR,
		/**Vytěžení dat dle ISDOC.*/
		ISDOC,
		/**Dopočítání dat z GAI.*/
		GAI,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\DTO\GAiRecognizerRecognizeExtendedResponseDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Rozšířený response na rozpoznávací DTO*/
	interface GAiRecognizerRecognizeExtendedResponseDto {
		RecognizedItems?: Gordic.Eko.Interface.GAIRecognizedItemExtendedDto[]|null;
		ixs_ulo?: string|null;
	}
	const enum GAiRecognizerRecognizeExtendedResponseDtoNames { RecognizedItems = "RecognizedItems", ixs_ulo = "ixs_ulo",}
	const enum GAiRecognizerRecognizeExtendedResponseDtoFragments { RecognizedItems = "*", ixs_ulo = "*",}
	const enum GAiRecognizerRecognizeExtendedResponseDtoTypes { RecognizedItems = "Gordic.Eko.Interface.GAIRecognizedItemExtendedDto[]", ixs_ulo = "string",}
	const enum GAiRecognizerRecognizeExtendedResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\DTO\GekosuusDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro ekosuuso (uctarna)*/
	interface GekosuusDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**uus*/
		uus?: string|null;
		/**lic*/
		lic?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**arw*/
		arw?: number|null;
		/**poznamka*/
		poznamka?: string|null;
		/**dat_od*/
		dat_od?: JsonDate|null;
		/**dat_do*/
		dat_do?: JsonDate|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**ixs_su*/
		ixs_su?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**rok_od*/
		rok_od?: number|null;
		/**rok_do*/
		rok_do?: number|null;
		/**akt_prohl*/
		akt_prohl?: number|null;
		/**rezim_fin*/
		rezim_fin?: number|null;
		/**ico_ext*/
		ico_ext?: string|null;
		/**ucs_ext*/
		ucs_ext?: string|null;
		/**uus_ext*/
		uus_ext?: string|null;
		/**id_okres*/
		id_okres?: string|null;
		/**fm_iissp*/
		fm_iissp?: string|null;
		/**id_okres_txt*/
		id_okres_txt?: string|null;
	}
	const enum GekosuusDtoNames { ico = "ico", ucs = "ucs", uus = "uus", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", ixs_esu = "ixs_esu", rok_od = "rok_od", rok_do = "rok_do", akt_prohl = "akt_prohl", rezim_fin = "rezim_fin", ico_ext = "ico_ext", ucs_ext = "ucs_ext", uus_ext = "uus_ext", id_okres = "id_okres", fm_iissp = "fm_iissp", id_okres_txt = "id_okres_txt",}
	const enum GekosuusDtoFragments { ico = "simple", ucs = "simple", uus = "simple", lic = "main", aktivita = "main", arw = "main", poznamka = "main", dat_od = "main", dat_do = "main", nazev = "simple", zkratka = "main", dat_zmena = "main", zmenu_prov = "main", ixs_su = "main", ixs_esu = "main", rok_od = "main", rok_do = "main", akt_prohl = "main", rezim_fin = "main", ico_ext = "main", ucs_ext = "main", uus_ext = "main", id_okres = "main", fm_iissp = "main", id_okres_txt = "id_okres_txt",}
	const enum GekosuusDtoTypes { ico = "string", ucs = "string", uus = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", ixs_esu = "string", rok_od = "number", rok_do = "number", akt_prohl = "number", rezim_fin = "number", ico_ext = "string", ucs_ext = "string", uus_ext = "string", id_okres = "string", fm_iissp = "string", id_okres_txt = "string",}
	const enum GekosuusDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\DTO\GEkoZkrDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**ReadOnly DTO se zkratkami*/
	interface GEkoZkrDto {
		/**Nks*/
		Nks?: string;
		/**Ucs*/
		Ucs?: string;
		/**Uus*/
		Uus?: string;
		/**Ico*/
		Ico: string;
	}
	const enum GEkoZkrDtoNames { Nks = "Nks", Ucs = "Ucs", Uus = "Uus", Ico = "Ico",}
	const enum GEkoZkrDtoFragments { Nks = "*", Ucs = "*", Uus = "*", Ico = "*",}
	const enum GEkoZkrDtoTypes { Nks = "string", Ucs = "string", Uus = "string", Ico = "string",}
	const enum GEkoZkrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\TiskoveParametry\GEkoTiskovyParametrDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto s hodnotami tiskoveho parametru (ginscfk)*/
	interface GEkoTiskovyParametrDto {
		/**jmena parametru*/
		ParamName?: string|null;
		/**Hodnota parametru*/
		ParamValue?: string|null;
		/**Klic knihy*/
		IxpDen?: string|null;
		/**Klic funkce*/
		IxsFun?: string|null;
	}
	const enum GEkoTiskovyParametrDtoNames { ParamName = "ParamName", ParamValue = "ParamValue", IxpDen = "IxpDen", IxsFun = "IxsFun",}
	const enum GEkoTiskovyParametrDtoFragments { ParamName = "*", ParamValue = "*", IxpDen = "*", IxsFun = "*",}
	const enum GEkoTiskovyParametrDtoTypes { ParamName = "string", ParamValue = "string", IxpDen = "string", IxsFun = "string",}
	const enum GEkoTiskovyParametrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\TiskoveParametry\GEkoTiskovyParametrRequestDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Vstupni dto pro praci s parametry (ginscfk)*/
	interface GEkoTiskovyParametrRequestDto {
		/**jmena parametru*/
		ParamNames?: string[]|null;
		/**Klic knihy*/
		IxpDen?: string|null;
		/**Klic funkce*/
		IxsFun?: string|null;
	}
	const enum GEkoTiskovyParametrRequestDtoNames { ParamNames = "ParamNames", IxpDen = "IxpDen", IxsFun = "IxsFun",}
	const enum GEkoTiskovyParametrRequestDtoFragments { ParamNames = "*", IxpDen = "*", IxsFun = "*",}
	const enum GEkoTiskovyParametrRequestDtoTypes { ParamNames = "string[]", IxpDen = "string", IxsFun = "string",}
	const enum GEkoTiskovyParametrRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\TiskoveParametry\IGEkoTiskovyParametr.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Trida pracujici s lokalnimi parametry vazanymi na knihu*/
	interface EkoTiskovyParametr {
		/**Nacteni hodnot parametru*/
		list(rq?:CallParams<{rq:Gordic.Eko.Interface.GEkoTiskovyParametrRequestDto}>): _Task<{rq:Gordic.Eko.Interface.GEkoTiskovyParametrRequestDto},GServiceListResponse<Gordic.Eko.Interface.GEkoTiskovyParametrDto>>;
		/**Ulozeni hodnoty parametru*/
		save(rq?:CallParams<{rq:Gordic.Eko.Interface.GEkoTiskovyParametrDto}>): _Task<{rq:Gordic.Eko.Interface.GEkoTiskovyParametrDto},void>;
		/**Hromadne ulozeni hodnot parametru*/
		saveAll(rq?:CallParams<{rq:Gordic.Eko.Interface.GEkoTiskovyParametrDto[]}>): _Task<{rq:Gordic.Eko.Interface.GEkoTiskovyParametrDto[]},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EkoTiskovyParametr: ServiceBase & Catalog.EkoTiskovyParametr;
	}
	const EkoTiskovyParametr: Client["EkoTiskovyParametr"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\TransferParametrs\GReportParam.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Trida pro predavani parametru pro spusteni sestavy*/
	interface GReportParam {
		/**Vraci / nastavuje tema sestavy*/
		Thema?: string|null;
		/**atribut, zda tiknout.*/
		Print?: boolean|null;
		/**atribut, zda se prepne na oblibene sestavy.*/
		UseFavorits?: boolean|null;
		/**Platnost sestavy*/
		Platnost?: string|null;
		/**Parametr 0*/
		Par0?: string|null;
		/**Parametr 1*/
		Par1?: string|null;
		/**Parametr 2*/
		Par2?: string|null;
		/**Parametr 3*/
		Par3?: string|null;
		/**Parametr 4*/
		Par4?: string|null;
		/**Parametr 5*/
		Par5?: string|null;
		/**Parametr 6*/
		Par6?: string|null;
		/**Parametr 7*/
		Par7?: string|null;
		/**Parametr 8*/
		Par8?: string|null;
		/**Parametr 9*/
		Par9?: string|null;
		/**Nazev sestavy LK*/
		Caption?: string|null;
		/**Servrove metody pro uprava parametru LK*/
		ServerParameterMethod?: string|null;
		/**Serverova metody pro omezeni dle alv LK*/
		ServerRestrictionAlvMethod?: string|null;
		/**Alv omezeni pro TK*/
		RestrictionALV?: string|null;
		IXP?: string|null;
		/**Data pro zobrazeni/generovani reportu*/
		ReportDTO?: any|null;
		/**Vygenerovany soubor s reportem*/
		ReportFile?: string|null;
	}
	const enum GReportParamNames { Thema = "Thema", Print = "Print", UseFavorits = "UseFavorits", Platnost = "Platnost", Par0 = "Par0", Par1 = "Par1", Par2 = "Par2", Par3 = "Par3", Par4 = "Par4", Par5 = "Par5", Par6 = "Par6", Par7 = "Par7", Par8 = "Par8", Par9 = "Par9", Caption = "Caption", ServerParameterMethod = "ServerParameterMethod", ServerRestrictionAlvMethod = "ServerRestrictionAlvMethod", RestrictionALV = "RestrictionALV", IXP = "IXP", ReportDTO = "ReportDTO", ReportFile = "ReportFile",}
	const enum GReportParamFragments { Thema = "*", Print = "*", UseFavorits = "*", Platnost = "*", Par0 = "*", Par1 = "*", Par2 = "*", Par3 = "*", Par4 = "*", Par5 = "*", Par6 = "*", Par7 = "*", Par8 = "*", Par9 = "*", Caption = "*", ServerParameterMethod = "*", ServerRestrictionAlvMethod = "*", RestrictionALV = "*", IXP = "*", ReportDTO = "*", ReportFile = "*",}
	const enum GReportParamTypes { Thema = "string", Print = "boolean", UseFavorits = "boolean", Platnost = "string", Par0 = "string", Par1 = "string", Par2 = "string", Par3 = "string", Par4 = "string", Par5 = "string", Par6 = "string", Par7 = "string", Par8 = "string", Par9 = "string", Caption = "string", ServerParameterMethod = "string", ServerRestrictionAlvMethod = "string", RestrictionALV = "string", IXP = "string", ReportDTO = "any", ReportFile = "string",}
	const enum GReportParamTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Ostatni\TransferParametrs\GTransferMessage.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Objekt predavacich zpravy*/
	interface GTransferMessage extends Gordic.General.GValidationResult {
		/**Zprava*/
		Message?: string|null;
		/**Zprava 2*/
		Message2?: string|null;
		/**Vyjimka*/
		Exception?: any|null;
		/**jednoznacny identifikator zpravy*/
		IdMessage?: string|null;
		/**Nastavuje / cte  hodnotu indikace, zda je zprava obslouzena*/
		Served?: boolean|null;
		/**Atribut zobrazeni hlasky jako flash. Pouze pro LK*/
		DisplayAsFlash?: boolean|null;
		/**Vysledek zpravy*/
		Result?: Gordic.Eko.Interface.GEResultOfProcessingTheMessage|null;
		/**Vyseldek dotazu "YES"/ "NO"*/
		ResultQuestion?: string|null;
		/**Typ zpravy*/
		TypeMessage?: Gordic.Eko.Interface.GETypeTransferMessage|null;
		/**Parametry pro sestavu*/
		ReportParam?: Gordic.Eko.Interface.GReportParam|null;
		/**Pole parametru*/
		PoleParam?: object[]|null;
		/**Nastaveni*/
		Nastaveni?: object|null;
	}
	const enum GTransferMessageNames { Message = "Message", Message2 = "Message2", Exception = "Exception", IdMessage = "IdMessage", Served = "Served", DisplayAsFlash = "DisplayAsFlash", Result = "Result", ResultQuestion = "ResultQuestion", TypeMessage = "TypeMessage", ReportParam = "ReportParam", PoleParam = "PoleParam", Nastaveni = "Nastaveni", Success = "Success", message = "message", member = "member", Dto = "Dto", data = "data", severity = "severity",}
	const enum GTransferMessageFragments { Message = "*", Message2 = "*", Exception = "*", IdMessage = "*", Served = "*", DisplayAsFlash = "*", Result = "*", ResultQuestion = "*", TypeMessage = "*", ReportParam = "*", PoleParam = "*", Nastaveni = "*", Success = "*", message = "*", member = "*", Dto = "*", data = "*", severity = "*",}
	const enum GTransferMessageTypes { Message = "string", Message2 = "string", Exception = "any", IdMessage = "string", Served = "boolean", DisplayAsFlash = "boolean", Result = "Gordic.Eko.Interface.GEResultOfProcessingTheMessage", ResultQuestion = "string", TypeMessage = "Gordic.Eko.Interface.GETypeTransferMessage", ReportParam = "Gordic.Eko.Interface.GReportParam", PoleParam = "object[]", Nastaveni = "object", Success = "Gordic.General.GValidationResult", message = "string", member = "string", Dto = "object", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GTransferMessageTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Porizovacka\KontrolniMechanismus\IGDefiniceRozvrhu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro definici rozvrhu*/
	interface DefiniceRozvrhu {
		/**List všech zadanych*/
		list(rq?:CallParams<{id:string}>): _Task<{id:string},Gordic.Eko.Interface.PKontrolaDataDto[]>;
		checkDate(rq?:CallParams<{id:string,date:JsonDate}>): _Task<{id:string,date:JsonDate},boolean>;
		checkAndGetNewDate(rq?:CallParams<{id:string,date:JsonDate}>): _Task<{id:string,date:JsonDate},JsonDate>;
		loadSettings(rq?:CallParams<{id:string}>): _Task<{id:string},any>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DefiniceRozvrhu: ServiceBase & Catalog.DefiniceRozvrhu;
	}
	const DefiniceRozvrhu: Client["DefiniceRozvrhu"];
}
declare namespace Gordic.Eko.Interface {
	/**test*/
	const enum GDeficeRozvrhuFilter {
		/**identifikator rozvrhu*/
		ixs_roz,
		/**uroven*/
		uroven_kon,
	}
	interface DeficeRozvrhuFilterDto {
		id?: string|null;
		u?: string|null;
	}
	const enum DeficeRozvrhuFilterDtoNames { id = "id", u = "u",}
	const enum DeficeRozvrhuFilterDtoFragments { id = "*", u = "*",}
	const enum DeficeRozvrhuFilterDtoTypes { id = "string", u = "string",}
	const enum DeficeRozvrhuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Porizovacka\KontrolniMechanismus\Dto\PKontrolaDataDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Kontrolni DTO*/
	interface PKontrolaDto {
		id: string;
		datZmena: JsonDate;
	}
	const enum PKontrolaDtoNames { id = "id", datZmena = "datZmena",}
	const enum PKontrolaDtoFragments { id = "*", datZmena = "*",}
	const enum PKontrolaDtoTypes { id = "string", datZmena = "JsonDate",}
	const enum PKontrolaDtoTypeLengths {}
	interface PUpdateDataResultDto {
		/**priznak ze se pouzije extended datova veta*/
		isExtendedDataSentence: boolean;
		/**priznak ze se povedla ulozit cache na serveru*/
		cachedOnServer: boolean;
		/**data*/
		data: ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>;
		/**datum*/
		date: JsonDate;
		/**nastaveni*/
		settings: ObjectLiteral<Gordic.Eko.Interface.PSettingsDto>;
	}
	const enum PUpdateDataResultDtoNames { isExtendedDataSentence = "isExtendedDataSentence", cachedOnServer = "cachedOnServer", data = "data", date = "date", settings = "settings",}
	const enum PUpdateDataResultDtoFragments { isExtendedDataSentence = "*", cachedOnServer = "*", data = "*", date = "*", settings = "*",}
	const enum PUpdateDataResultDtoTypes { isExtendedDataSentence = "boolean", cachedOnServer = "boolean", data = "ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>", date = "JsonDate", settings = "ObjectLiteral<Gordic.Eko.Interface.PSettingsDto>",}
	const enum PUpdateDataResultDtoTypeLengths {}
	/**zaznam z rozvrhu*/
	interface PExceptionDataDto {
		/**uea*/
		uea?: string|null;
		/**ueb*/
		ueb?: string|null;
		/**uec*/
		uec?: string|null;
		/**ued*/
		ued?: string|null;
		/**uee*/
		uee?: string|null;
		/**uef*/
		uef?: string|null;
		/**ueg*/
		ueg?: string|null;
		/**ueh*/
		ueh?: string|null;
		/**uei*/
		uei?: string|null;
		/**uej*/
		uej?: string|null;
		/**te0*/
		te0?: string|null;
		/**te1*/
		te1?: string|null;
		/**te2*/
		te2?: string|null;
		/**te3*/
		te3?: string|null;
		/**te4*/
		te4?: string|null;
		/**uek*/
		uek?: string|null;
		/**uel*/
		uel?: string|null;
		/**uem*/
		uem?: string|null;
		/**uen*/
		uen?: string|null;
		/**te5*/
		te5?: string|null;
		/**te6*/
		te6?: string|null;
		/**te7*/
		te7?: string|null;
		/**te8*/
		te8?: string|null;
		/**te9*/
		te9?: string|null;
		kporiz?: number|null;
		kkch?: number|null;
		kext?: number|null;
	}
	const enum PExceptionDataDtoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", kporiz = "kporiz", kkch = "kkch", kext = "kext",}
	const enum PExceptionDataDtoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", kporiz = "*", kkch = "*", kext = "*",}
	const enum PExceptionDataDtoTypes { uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", kporiz = "number", kkch = "number", kext = "number",}
	const enum PExceptionDataDtoTypeLengths {}
	interface PSettingsDto {
		idSax: string;
		/**Nastavení pro organizaci (ekodico)*/
		orgSettings: ObjectLiteral<ObjectLiteralNumber<Gordic.Eko.Interface.POrgSettings>>;
		dataSentenceSettings: ObjectLiteralNumber<ObjectLiteral<Gordic.Eko.Interface.PDataSentenceSettings[]>>;
		exceptionSettings: ObjectLiteral<number>;
		detailExceptionSettings: ObjectLiteralNumber<ObjectLiteralNumber<Gordic.Eko.Interface.PExceptionDataDto>>;
	}
	const enum PSettingsDtoNames { idSax = "idSax", orgSettings = "orgSettings", dataSentenceSettings = "dataSentenceSettings", exceptionSettings = "exceptionSettings", detailExceptionSettings = "detailExceptionSettings",}
	const enum PSettingsDtoFragments { idSax = "*", orgSettings = "*", dataSentenceSettings = "*", exceptionSettings = "*", detailExceptionSettings = "*",}
	const enum PSettingsDtoTypes { idSax = "string", orgSettings = "ObjectLiteral<ObjectLiteralNumber<Gordic.Eko.Interface.POrgSettings>>", dataSentenceSettings = "ObjectLiteralNumber<ObjectLiteral<Gordic.Eko.Interface.PDataSentenceSettings[]>>", exceptionSettings = "ObjectLiteral<number>", detailExceptionSettings = "ObjectLiteralNumber<ObjectLiteralNumber<Gordic.Eko.Interface.PExceptionDataDto>>",}
	const enum PSettingsDtoTypeLengths {}
	interface PRawSettingsDto {
		orgSettings: Gordic.Eko.Interface.POrgSettingsLoadDto[];
		dataSentenceSettings: Gordic.Eko.Interface.PDataSentenceSettingsLoadDto[];
		exceptionSettings: Gordic.Eko.Interface.GEkodsaxDto[];
		detailExceptionSettings: Gordic.Eko.Interface.GEkosvaxDto[];
	}
	const enum PRawSettingsDtoNames { orgSettings = "orgSettings", dataSentenceSettings = "dataSentenceSettings", exceptionSettings = "exceptionSettings", detailExceptionSettings = "detailExceptionSettings",}
	const enum PRawSettingsDtoFragments { orgSettings = "*", dataSentenceSettings = "*", exceptionSettings = "*", detailExceptionSettings = "*",}
	const enum PRawSettingsDtoTypes { orgSettings = "Gordic.Eko.Interface.POrgSettingsLoadDto[]", dataSentenceSettings = "Gordic.Eko.Interface.PDataSentenceSettingsLoadDto[]", exceptionSettings = "Gordic.Eko.Interface.GEkodsaxDto[]", detailExceptionSettings = "Gordic.Eko.Interface.GEkosvaxDto[]",}
	const enum PRawSettingsDtoTypeLengths {}
	/**Obsah ekoscfu*/
	interface PDataSentenceSettings {
		/**poradi*/
		p?: number|null;
		/**uroven*/
		u?: string|null;
		/**delka v db*/
		ddb: number;
		/**delka*/
		d?: number|null;
		/**uroven cislo*/
		un: number;
		/**zkratka*/
		z?: string|null;
		/**pouziti*/
		pz: number;
		/**prazdny*/
		pr: string;
		/**db_nazev*/
		dbn?: string|null;
		/**zobrazovany*/
		zb: string;
	}
	const enum PDataSentenceSettingsNames { p = "p", u = "u", ddb = "ddb", d = "d", un = "un", z = "z", pz = "pz", pr = "pr", dbn = "dbn", zb = "zb",}
	const enum PDataSentenceSettingsFragments { p = "*", u = "*", ddb = "*", d = "*", un = "*", z = "*", pz = "*", pr = "*", dbn = "*", zb = "*",}
	const enum PDataSentenceSettingsTypes { p = "number", u = "string", ddb = "number", d = "number", un = "number", z = "string", pz = "number", pr = "string", dbn = "string", zb = "string",}
	const enum PDataSentenceSettingsTypeLengths {}
	interface PDataSentenceSettingsLoadDto extends Gordic.Eko.Interface.PDataSentenceSettings {
		/**rok*/
		rok: number;
		/**cfu*/
		cfu: string;
	}
	const enum PDataSentenceSettingsLoadDtoNames { rok = "rok", cfu = "cfu", p = "p", u = "u", ddb = "ddb", d = "d", un = "un", z = "z", pz = "pz", pr = "pr", dbn = "dbn", zb = "zb",}
	const enum PDataSentenceSettingsLoadDtoFragments { rok = "*", cfu = "*", p = "*", u = "*", ddb = "*", d = "*", un = "*", z = "*", pz = "*", pr = "*", dbn = "*", zb = "*",}
	const enum PDataSentenceSettingsLoadDtoTypes { rok = "number", cfu = "string", p = "number", u = "string", ddb = "number", d = "number", un = "number", z = "string", pz = "number", pr = "string", dbn = "string", zb = "string",}
	const enum PDataSentenceSettingsLoadDtoTypeLengths {}
	/**Obsah nastavení (ixs_sax - id a cfu - c) organizace (ekodico)*/
	interface POrgSettings {
		/**Ixs_sax*/
		id: string;
		/**Cfu*/
		c: string;
	}
	const enum POrgSettingsNames { id = "id", c = "c",}
	const enum POrgSettingsFragments { id = "*", c = "*",}
	const enum POrgSettingsTypes { id = "string", c = "string",}
	const enum POrgSettingsTypeLengths {}
	interface POrgSettingsLoadDto extends Gordic.Eko.Interface.POrgSettings {
		ico?: string|null;
		rok?: number|null;
	}
	const enum POrgSettingsLoadDtoNames { ico = "ico", rok = "rok", id = "id", c = "c",}
	const enum POrgSettingsLoadDtoFragments { ico = "*", rok = "*", id = "*", c = "*",}
	const enum POrgSettingsLoadDtoTypes { ico = "string", rok = "number", id = "string", c = "string",}
	const enum POrgSettingsLoadDtoTypeLengths {}
	interface PKontrolaDataDto {
		guid: string;
		/**o_uea*/
		uea?: string|null;
		/**o_ueb*/
		ueb?: string|null;
		/**o_ uec*/
		uec?: string|null;
		/**o_ued*/
		ued?: string|null;
		/**o_uee*/
		uee?: string|null;
		/**o_uef*/
		uef?: string|null;
		/**o_ueg*/
		ueg?: string|null;
		/**o_ueh*/
		ueh?: string|null;
		/**o_uei*/
		uei?: string|null;
		/**o_uej*/
		uej?: string|null;
		/**o_te0*/
		te0?: string|null;
		/**o_te1*/
		te1?: string|null;
		/**o_te2*/
		te2?: string|null;
		/**o_te3*/
		te3?: string|null;
		/**o_te4*/
		te4?: string|null;
		/**o_uek*/
		uek?: string|null;
		/**o_uel*/
		uel?: string|null;
		/**o_uem*/
		uem?: string|null;
		/**o_uen*/
		uen?: string|null;
		/**o_te5*/
		te5?: string|null;
		/**o_te6*/
		te6?: string|null;
		/**o_te7*/
		te7?: string|null;
		/**o_te8*/
		te8?: string|null;
		/**o_te9*/
		te9?: string|null;
		/**nazev*/
		n?: string|null;
		/**uroven_kon*/
		u: string;
		/**bupsrr*/
		br?: string|null;
		/**priz_nekumul*/
		pn: number;
		/**zd*/
		z: number;
		/**aktivita_uct*/
		au: number;
		/**aktivita_roz*/
		ar: number;
	}
	const enum PKontrolaDataDtoNames { guid = "guid", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", n = "n", u = "u", br = "br", pn = "pn", z = "z", au = "au", ar = "ar",}
	const enum PKontrolaDataDtoFragments { guid = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", n = "*", u = "*", br = "*", pn = "*", z = "*", au = "*", ar = "*",}
	const enum PKontrolaDataDtoTypes { guid = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", n = "string", u = "string", br = "string", pn = "number", z = "number", au = "number", ar = "number",}
	const enum PKontrolaDataDtoTypeLengths {}
	interface RequestCacheDto {
		dataCacheId?: string|null;
		cfuId?: string|null;
		onlySettings?: boolean|null;
		isDirty?: boolean|null;
	}
	const enum RequestCacheDtoNames { dataCacheId = "dataCacheId", cfuId = "cfuId", onlySettings = "onlySettings", isDirty = "isDirty",}
	const enum RequestCacheDtoFragments { dataCacheId = "*", cfuId = "*", onlySettings = "*", isDirty = "*",}
	const enum RequestCacheDtoTypes { dataCacheId = "string", cfuId = "string", onlySettings = "boolean", isDirty = "boolean",}
	const enum RequestCacheDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Porizovacka\UctovyRozvrh\TypVetyEnum.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Určuje typ datové věty - zda je účetní či rozpočtová*/
	const enum TypVetyEnum {
		/**Účetní věta*/
		Ucetni=40,
		/**Rozpočtová věta*/
		Rozpoctova=50,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\GUctcsud.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctcsudDto {
		/**DBCOLUMN:Seznam.druh_sud*/
		druh_sud?: number|null;
		/**DBCOLUMN:Seznam.druh_sud_txt*/
		druh_sud_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
	}
	const enum GUctcsudDtoNames { druh_sud = "druh_sud", druh_sud_txt = "druh_sud_txt", k_v = "k_v", k_s = "k_s",}
	const enum GUctcsudDtoFragments { druh_sud = "*", druh_sud_txt = "*", k_v = "*", k_s = "*",}
	const enum GUctcsudDtoTypes { druh_sud = "number", druh_sud_txt = "string", k_v = "number", k_s = "string",}
	const enum GUctcsudDtoTypeLengths { druh_sud_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\GUctddrv.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctddrvDto {
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.ixs_sud*/
		ixs_sud?: string|null;
		/**DBCOLUMN:Seznam.pov_sud*/
		pov_sud?: number|null;
		/**DBCOLUMN:Seznam.sud_num*/
		sud_num?: number|null;
		/**DBCOLUMN:Seznam.sud_text*/
		sud_text?: string|null;
		/**DBCOLUMN:Seznam.sud_date*/
		sud_date?: JsonDate|null;
		/**DBCOLUMN:Seznam.sud_dec*/
		sud_dec?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.hodnota*/
		hodnota?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.typ_sud*/
		typ_sud?: number|null;
		/**DBCOLUMN:Seznam.pov_sud_def*/
		pov_sud_def?: number|null;
		/**DBCOLUMN:Seznam.typ_sud_txt*/
		typ_sud_txt?: string|null;
		/**DBCOLUMN:Seznam.count_druh_sud*/
		count_druh_sud?: number|null;
		/**DBCOLUMN:Seznam.tz*/
		tz?: number|null;
		/**DBCOLUMN:Seznam.sud_rep*/
		sud_rep?: string|null;
		/**DBCOLUMN:Seznam.typ_default*/
		typ_default?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uea_reg*/
		uea_reg?: string|null;
		/**DBCOLUMN:Seznam.ueb_reg*/
		ueb_reg?: string|null;
	}
	const enum GUctddrvDtoNames { uea = "uea", ueb = "ueb", ixs_sud = "ixs_sud", pov_sud = "pov_sud", sud_num = "sud_num", sud_text = "sud_text", sud_date = "sud_date", sud_dec = "sud_dec", hodnota = "hodnota", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", typ_sud = "typ_sud", pov_sud_def = "pov_sud_def", typ_sud_txt = "typ_sud_txt", count_druh_sud = "count_druh_sud", tz = "tz", sud_rep = "sud_rep", typ_default = "typ_default", ico = "ico", ucs = "ucs", uea_reg = "uea_reg", ueb_reg = "ueb_reg",}
	const enum GUctddrvDtoFragments { uea = "*", ueb = "*", ixs_sud = "*", pov_sud = "*", sud_num = "*", sud_text = "*", sud_date = "*", sud_dec = "*", hodnota = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", typ_sud = "*", pov_sud_def = "*", typ_sud_txt = "*", count_druh_sud = "*", tz = "*", sud_rep = "*", typ_default = "*", ico = "*", ucs = "*", uea_reg = "*", ueb_reg = "*",}
	const enum GUctddrvDtoTypes { uea = "string", ueb = "string", ixs_sud = "string", pov_sud = "number", sud_num = "number", sud_text = "string", sud_date = "JsonDate", sud_dec = "JsonDecimal", hodnota = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", typ_sud = "number", pov_sud_def = "number", typ_sud_txt = "string", count_druh_sud = "number", tz = "number", sud_rep = "string", typ_default = "number", ico = "string", ucs = "string", uea_reg = "string", ueb_reg = "string",}
	const enum GUctddrvDtoTypeLengths { uea = 3, ueb = 4, ixs_sud = 12, sud_text = 254, zmenu_prov = 12, ico = 10, ucs = 10, uea_reg = 3, ueb_reg = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\IGUctareg.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Autogenerated.*/
	const enum FilterSeznamRp {
		/**Autogenerated.*/
		uea_reg,
		/**Autogenerated.*/
		ueb_reg,
		/**Autogenerated.*/
		uex_reg,
		/**Autogenerated.*/
		ico,
		/**Autogenerated.*/
		ucs,
		/**Autogenerated.*/
		uus,
		/**Autogenerated.*/
		nks,
		/**Autogenerated.*/
		ktg_ueab,
		/**Autogenerated.*/
		rok,
		/**Autogenerated.*/
		mesic,
		/**Autogenerated.*/
		registrovane,
		/**Autogenerated.*/
		neregistrovane,
		/**Autogenerated.*/
		nenulove,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\Dto\GDefHodnotaDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro definice sloupcu*/
	interface GDefHodnotaDto {
		/**DBCOLUMN:Seznam.h0*/
		Name?: string|null;
		/**Typ*/
		Typ?: number|null;
		/**DBCOLUMN:Seznam.h1*/
		ValueD?: JsonDate|null;
		/**DBCOLUMN:Seznam.h1*/
		ValueN?: number|null;
		/**DBCOLUMN:Seznam.h1*/
		ValueC?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.h1*/
		ValueS?: string|null;
	}
	const enum GDefHodnotaDtoNames { Name = "Name", Typ = "Typ", ValueD = "ValueD", ValueN = "ValueN", ValueC = "ValueC", ValueS = "ValueS",}
	const enum GDefHodnotaDtoFragments { Name = "*", Typ = "*", ValueD = "*", ValueN = "*", ValueC = "*", ValueS = "*",}
	const enum GDefHodnotaDtoTypes { Name = "string", Typ = "number", ValueD = "JsonDate", ValueN = "number", ValueC = "JsonDecimal", ValueS = "string",}
	const enum GDefHodnotaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\Dto\GRegistrZPDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Dto registru Z/P*/
	interface GRegistrZPDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**uus*/
		uus?: string|null;
		/**nks*/
		nks?: string|null;
		/**uea_reg*/
		uea_reg?: string|null;
		/**ueb_reg*/
		ueb_reg?: string|null;
		/**uex_reg*/
		uex_reg?: string|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**zkr_ag*/
		zkr_ag?: string|null;
		/**ktg_ueab*/
		ktg_ueab?: number|null;
		/**c0*/
		c0?: JsonDecimal|null;
		/**c1*/
		c1?: JsonDecimal|null;
		/**c0c1*/
		c0c1?: JsonDecimal|null;
		/**uea_vaz*/
		uea_vaz?: string|null;
		/**ueb_vaz*/
		ueb_vaz?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**s_prep*/
		s_prep?: number|null;
		Sloupce?: any|null;
	}
	const enum GRegistrZPDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea_reg = "uea_reg", ueb_reg = "ueb_reg", uex_reg = "uex_reg", typ_ag = "typ_ag", aktivita = "aktivita", ixp = "ixp", zkr_ag = "zkr_ag", ktg_ueab = "ktg_ueab", c0 = "c0", c1 = "c1", c0c1 = "c0c1", uea_vaz = "uea_vaz", ueb_vaz = "ueb_vaz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_prep = "s_prep", Sloupce = "Sloupce",}
	const enum GRegistrZPDtoFragments { ico = "main", ucs = "main", uus = "main", nks = "main", uea_reg = "main", ueb_reg = "main", uex_reg = "main", typ_ag = "main", aktivita = "main", ixp = "main", zkr_ag = "main", ktg_ueab = "main", c0 = "main", c1 = "main", c0c1 = "main", uea_vaz = "main", ueb_vaz = "main", dat_zmena = "main", zmenu_prov = "main", s_prep = "main", Sloupce = "*",}
	const enum GRegistrZPDtoTypes { ico = "string", ucs = "string", uus = "string", nks = "string", uea_reg = "string", ueb_reg = "string", uex_reg = "string", typ_ag = "number", aktivita = "number", ixp = "string", zkr_ag = "string", ktg_ueab = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", c0c1 = "JsonDecimal", uea_vaz = "string", ueb_vaz = "string", dat_zmena = "JsonDate", zmenu_prov = "string", s_prep = "number", Sloupce = "any",}
	const enum GRegistrZPDtoTypeLengths { ico = 10, ucs = 10, uus = 10, nks = 12, uea_reg = 3, ueb_reg = 4, uex_reg = 60, ixp = 12, zkr_ag = 3, uea_vaz = 3, ueb_vaz = 4, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\Dto\GRegistrZPfilterDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:~*/
	interface GRegistrZPfilterDto {
		/**DBCOLUMN:SeznamAat.ico*/
		ico?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uus*/
		uus?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.nks*/
		nks?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ico	DBCOLUMN:Seznam.uea_reg*/
		uea_reg?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ueb_reg*/
		ueb_reg?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.uex_reg*/
		uex_reg?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ktg_ueab*/
		ktg_ueab?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c0c1*/
		c0c1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.s_prep*/
		s_prep?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.zkr_ag*/
		zkr_ag?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.uea_vaz*/
		uea_vaz?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ueb_vaz*/
		ueb_vaz?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.vc0*/
		vc0?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.vc1*/
		vc1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.vc0c1*/
		vc0c1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Hodnoty.ico	DBCOLUMN:Hodnoty.ixs_sud*/
		ixs_sud?: GIntervalDto<string>|null;
		/**DBCOLUMN:Hodnoty.sud_num*/
		sud_num?: GIntervalDto<number>|null;
		/**DBCOLUMN:Hodnoty.sud_text*/
		sud_text?: GIntervalDto<string>|null;
		/**DBCOLUMN:Hodnoty.sud_date*/
		sud_date?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Hodnoty.sud_dec*/
		sud_dec?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:AutHodnoty.sud_rep*/
		sud_rep?: GIntervalDto<string>|null;
	}
	const enum GRegistrZPfilterDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea_reg = "uea_reg", ueb_reg = "ueb_reg", uex_reg = "uex_reg", ixp = "ixp", typ_ag = "typ_ag", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_ueab = "ktg_ueab", c0 = "c0", c1 = "c1", c0c1 = "c0c1", s_prep = "s_prep", zkr_ag = "zkr_ag", uea_vaz = "uea_vaz", ueb_vaz = "ueb_vaz", vc0 = "vc0", vc1 = "vc1", vc0c1 = "vc0c1", ixs_sud = "ixs_sud", sud_num = "sud_num", sud_text = "sud_text", sud_date = "sud_date", sud_dec = "sud_dec", sud_rep = "sud_rep",}
	const enum GRegistrZPfilterDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", uea_reg = "*", ueb_reg = "*", uex_reg = "*", ixp = "*", typ_ag = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ktg_ueab = "*", c0 = "*", c1 = "*", c0c1 = "*", s_prep = "*", zkr_ag = "*", uea_vaz = "*", ueb_vaz = "*", vc0 = "*", vc1 = "*", vc0c1 = "*", ixs_sud = "*", sud_num = "*", sud_text = "*", sud_date = "*", sud_dec = "*", sud_rep = "*",}
	const enum GRegistrZPfilterDtoTypes { ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", uea_reg = "GIntervalDto<string>", ueb_reg = "GIntervalDto<string>", uex_reg = "GIntervalDto<string>", ixp = "GIntervalDto<string>", typ_ag = "GIntervalDto<number>", aktivita = "GIntervalDto<number>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "GIntervalDto<string>", ktg_ueab = "GIntervalDto<number>", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", c0c1 = "GIntervalDto<JsonDecimal>", s_prep = "GIntervalDto<number>", zkr_ag = "GIntervalDto<string>", uea_vaz = "GIntervalDto<string>", ueb_vaz = "GIntervalDto<string>", vc0 = "GIntervalDto<JsonDecimal>", vc1 = "GIntervalDto<JsonDecimal>", vc0c1 = "GIntervalDto<JsonDecimal>", ixs_sud = "GIntervalDto<string>", sud_num = "GIntervalDto<number>", sud_text = "GIntervalDto<string>", sud_date = "GIntervalDto<JsonDate>", sud_dec = "GIntervalDto<JsonDecimal>", sud_rep = "GIntervalDto<string>",}
	const enum GRegistrZPfilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\Dto\GUctsdrv.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctsdrvDto {
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.ktg_ueab*/
		ktg_ueab?: number|null;
		/**DBCOLUMN:Seznam.uea_vaz*/
		uea_vaz?: string|null;
		/**DBCOLUMN:Seznam.uroven_num1*/
		uroven_num1?: number|null;
		/**DBCOLUMN:Seznam.uroven_num2*/
		uroven_num2?: number|null;
		/**DBCOLUMN:Seznam.uea_reg*/
		uea_reg?: string|null;
		/**DBCOLUMN:Seznam.ueb_reg*/
		ueb_reg?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.uex_reg*/
		uex_reg?: string|null;
		/**DBCOLUMN:Seznam.ueb_vaz*/
		ueb_vaz?: string|null;
		/**DBCOLUMN:Seznam.priz_stav*/
		priz_stav?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:Seznam.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:ktg_ueab_txt*/
		ktg_ueab_txt?: string|null;
	}
	const enum GUctsdrvDtoNames { uea = "uea", ueb = "ueb", ktg_ueab = "ktg_ueab", uea_vaz = "uea_vaz", uroven_num1 = "uroven_num1", uroven_num2 = "uroven_num2", uea_reg = "uea_reg", ueb_reg = "ueb_reg", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uex_reg = "uex_reg", ueb_vaz = "ueb_vaz", priz_stav = "priz_stav", ico = "ico", ucs = "ucs", rok_od = "rok_od", rok_do = "rok_do", popis = "popis", ktg_ueab_txt = "ktg_ueab_txt",}
	const enum GUctsdrvDtoFragments { uea = "*", ueb = "*", ktg_ueab = "*", uea_vaz = "*", uroven_num1 = "*", uroven_num2 = "*", uea_reg = "*", ueb_reg = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uex_reg = "*", ueb_vaz = "*", priz_stav = "*", ico = "*", ucs = "*", rok_od = "*", rok_do = "*", popis = "*", ktg_ueab_txt = "*",}
	const enum GUctsdrvDtoTypes { uea = "string", ueb = "string", ktg_ueab = "number", uea_vaz = "string", uroven_num1 = "number", uroven_num2 = "number", uea_reg = "string", ueb_reg = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uex_reg = "string", ueb_vaz = "string", priz_stav = "number", ico = "string", ucs = "string", rok_od = "number", rok_do = "number", popis = "string", ktg_ueab_txt = "string",}
	const enum GUctsdrvDtoTypeLengths { uea = 3, ueb = 4, uea_vaz = 3, uea_reg = 3, ueb_reg = 4, zmenu_prov = 12, uex_reg = 32, ueb_vaz = 4, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\RegZP\Dto\GUctssud.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctssudDto {
		/**DBCOLUMN:Seznam.ixs_sud*/
		ixs_sud?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.pov_sud*/
		pov_sud?: number|null;
		/**DBCOLUMN:Seznam.sud_rep*/
		sud_rep?: string|null;
		/**DBCOLUMN:Seznam.aut_sud*/
		aut_sud?: number|null;
		/**DBCOLUMN:Seznam.typ_sud*/
		typ_sud?: number|null;
		/**DBCOLUMN:Seznam.text_min*/
		text_min?: number|null;
		/**DBCOLUMN:Seznam.text_max*/
		text_max?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ktg_sud*/
		ktg_sud?: number|null;
		/**druh z tabulky uctdsud - neni v uctssud*/
		druh_sud?: number|null;
	}
	const enum GUctssudDtoNames { ixs_sud = "ixs_sud", zkratka = "zkratka", nazev = "nazev", pov_sud = "pov_sud", sud_rep = "sud_rep", aut_sud = "aut_sud", typ_sud = "typ_sud", text_min = "text_min", text_max = "text_max", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_sud = "ktg_sud", druh_sud = "druh_sud",}
	const enum GUctssudDtoFragments { ixs_sud = "*", zkratka = "*", nazev = "*", pov_sud = "*", sud_rep = "*", aut_sud = "*", typ_sud = "*", text_min = "*", text_max = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ktg_sud = "*", druh_sud = "*",}
	const enum GUctssudDtoTypes { ixs_sud = "string", zkratka = "string", nazev = "string", pov_sud = "number", sud_rep = "string", aut_sud = "number", typ_sud = "number", text_min = "number", text_max = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_sud = "number", druh_sud = "number",}
	const enum GUctssudDtoTypeLengths { ixs_sud = 12, zkratka = 16, nazev = 100, sud_rep = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Roz\Dto\GRozspid.Dto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro hlavicku rozpoctoveho dokladu*/
	interface GRozspidDto {
		/**ixp*/
		ixp?: string|null;
		/**lic*/
		lic?: string|null;
		/**popis*/
		popis?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**ac*/
		ac?: string|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
		/**den*/
		den?: number|null;
		/**dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**eko_akt*/
		eko_akt?: number|null;
		/**dat_evid*/
		dat_evid?: JsonDate|null;
		/**dat_zau*/
		dat_zau?: JsonDate|null;
		/**s_zau*/
		s_zau?: number|null;
		/**s_sto*/
		s_sto?: number|null;
		/**ac_ixe*/
		ac_ixe?: string|null;
		/**stav_ac_ixe*/
		stav_ac_ixe?: number|null;
		/**drd*/
		drd?: number|null;
		/**c*/
		c?: JsonDecimal|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**priz_view*/
		priz_view?: number|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**uus*/
		uus?: string|null;
		/**cis_real*/
		cis_real?: string|null;
		/**ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**ixs_uka*/
		ixs_uka?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**ico_esu*/
		ico_esu?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**ks*/
		ks?: string|null;
		/**vs*/
		vs?: string|null;
		/**ss*/
		ss?: string|null;
		/**ext_valid*/
		ext_valid?: number|null;
		/**ixs_ahl*/
		ixs_ahl?: string|null;
		/**cis_sabl_eds*/
		cis_sabl_eds?: string|null;
		/**ixs_evp*/
		ixs_evp?: string|null;
		/**ixs_evp_eo*/
		ixs_evp_eo?: string|null;
		/**ixs_fun_mng*/
		ixs_fun_mng?: string|null;
		/**kontrola_dok
		*      15.07.24 KK - pridan sloupecek pro kontrolu pred akci
		*/
		kontrola_dok?: number|null;
		/**Odpoved IISSP*/
		dokl_status_iissp?: number|null;
		/**Stav komunikace s IISSP*/
		vysl_volani?: number|null;
		/**Textove stav dokladu*/
		stav_dokl_txt?: string|null;
		/**Textove stav storna*/
		stav_storno_txt?: string|null;
		/**Textove stav ve statni pokladne*/
		stav_iissp_txt?: string|null;
		/**Textove stav schvalovaciho procesu*/
		stav_epk_txt?: string|null;
		/**vybrany manager cile*/
		manager_cile_txt?: string|null;
		ixp_vlzr?: string|null;
	}
	const enum GRozspidDtoNames { ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_uka = "ixs_uka", ixs_esu = "ixs_esu", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", ks = "ks", vs = "vs", ss = "ss", ext_valid = "ext_valid", ixs_ahl = "ixs_ahl", cis_sabl_eds = "cis_sabl_eds", ixs_evp = "ixs_evp", ixs_evp_eo = "ixs_evp_eo", ixs_fun_mng = "ixs_fun_mng", kontrola_dok = "kontrola_dok", dokl_status_iissp = "dokl_status_iissp", vysl_volani = "vysl_volani", stav_dokl_txt = "stav_dokl_txt", stav_storno_txt = "stav_storno_txt", stav_iissp_txt = "stav_iissp_txt", stav_epk_txt = "stav_epk_txt", manager_cile_txt = "manager_cile_txt", ixp_vlzr = "ixp_vlzr",}
	const enum GRozspidDtoFragments { ixp = "main", lic = "main", popis = "main", ico = "main", ucs = "main", nks = "main", ixp_den = "main", ac = "main", rok = "main", mesic = "main", den = "main", dat_prij_pod = "main", ixs_typ = "main", ktg_typ = "main", eko_akt = "main", dat_evid = "main", dat_zau = "main", s_zau = "main", s_sto = "main", ac_ixe = "main", stav_ac_ixe = "main", drd = "main", c = "main", dat_zmena = "main", zmenu_prov = "main", typ_ag = "main", ixs_fun_akt = "main", bu_vl = "main", sk_vl = "main", priz_view = "main", ac_ag = "main", uus = "main", cis_real = "main", ixs_fun_vyriz = "main", ixs_uka = "main", ixs_esu = "main", ico_esu = "main", bu_ci = "main", sk_ci = "main", ks = "main", vs = "main", ss = "main", ext_valid = "main", ixs_ahl = "main", cis_sabl_eds = "main", ixs_evp = "main", ixs_evp_eo = "main", ixs_fun_mng = "main", kontrola_dok = "main", dokl_status_iissp = "main", vysl_volani = "main", stav_dokl_txt = "main", stav_storno_txt = "main", stav_iissp_txt = "main", stav_epk_txt = "main", manager_cile_txt = "*", ixp_vlzr = "main",}
	const enum GRozspidDtoTypes { ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", ixs_uka = "string", ixs_esu = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", ks = "string", vs = "string", ss = "string", ext_valid = "number", ixs_ahl = "string", cis_sabl_eds = "string", ixs_evp = "string", ixs_evp_eo = "string", ixs_fun_mng = "string", kontrola_dok = "number", dokl_status_iissp = "number", vysl_volani = "number", stav_dokl_txt = "string", stav_storno_txt = "string", stav_iissp_txt = "string", stav_epk_txt = "string", manager_cile_txt = "string", ixp_vlzr = "string",}
	const enum GRozspidDtoTypeLengths {}
	/**Zpusob jakym zpusobem lze validovat doklad (pri zapnute funkcnosti)*/
	const enum GEOperacePoSchvaleni {
		/**Priznak, ze doklad je po schvaleni mozno rovnou realizovat*/
		Realizace=0,
		/**Priznak, ze doklad bude predan k externi validaci (IISSP)*/
		OdeslaniDoIissp=10,
		/**Priznak, ze doklad bude predan k interni validaci*/
		InterniValidace=20,
		/**Doklad bude vracen zpet k oprave*/
		VracenoKOprave=30,
	}
	/**Vycet odpovedi IISSP na stav dokladu*/
	const enum GEOdpovedIISSP {
		/**Nenastavena hodnota, komunikace neprobehla*/
		Nenastaveno=0,
		/**ROP byl schválen a zanesen do chronologické evidence IISSP RISRE*/
		Evidovano=1,
		/**ROP je ve stavu návrhu a je stále ve schvalování,*/
		Navrh=2,
		/**Návrh ROP byl pří schvalování zamítnut*/
		Zamitnuto=4,
	}
	/**Vycet stavu dokladu v Ginisu v ramci komunkace s IISSP*/
	const enum GEStavKomunikaceIISSP {
		/**Schvaleno statni pokladnou*/
		Schvaleno=0,
		/**Komunikace skoncila vyjimkou*/
		Chyba=50,
		/**Bez zalogovani vysledku*/
		BezZalogovaniVysl=60,
		/**Offline verze, doklad urcen k odeslani do davky na IISSP*/
		OfflineKVlozeni=70,
		/**Offline verze, doklad byl jiz ulozen do davky*/
		OfflineVlozeno=80,
		/**Doklad schvalen statni pokladnou s vyhradou*/
		SchvalenoVyhrada=90,
		/**Doklad zamitnut statni pokladnou*/
		Zamitnuto=100,
		/**Doklad je v priprave na odeslani do IISSP*/
		Priprava=110,
		/**Spadla komunikace mezi IISSP a EKIS*/
		KomunikacniChyba=120,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Roz\Dto\GRozspidWDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO hlavicky rozpoctoveho dokladu s rozsirenou funkcionaliztou prevodu stavu dokladu*/
	interface GRozspidWDto {
		/**ixp*/
		ixp?: string|null;
		/**lic*/
		lic?: string|null;
		/**popis*/
		popis?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**ac*/
		ac?: string|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
		/**den*/
		den?: number|null;
		/**dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**eko_akt*/
		eko_akt?: number|null;
		/**dat_evid*/
		dat_evid?: JsonDate|null;
		/**dat_zau*/
		dat_zau?: JsonDate|null;
		/**s_zau*/
		s_zau?: number|null;
		/**s_sto*/
		s_sto?: number|null;
		/**ac_ixe*/
		ac_ixe?: string|null;
		/**stav_ac_ixe*/
		stav_ac_ixe?: number|null;
		/**drd*/
		drd?: number|null;
		/**c*/
		c?: JsonDecimal|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**priz_view*/
		priz_view?: number|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**uus*/
		uus?: string|null;
		/**cis_real*/
		cis_real?: string|null;
		/**ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**ixs_uka*/
		ixs_uka?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**ico_esu*/
		ico_esu?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**ks*/
		ks?: string|null;
		/**vs*/
		vs?: string|null;
		/**ss*/
		ss?: string|null;
		/**ext_valid*/
		ext_valid?: number|null;
		/**ixs_ahl*/
		ixs_ahl?: string|null;
		/**cis_sabl_eds*/
		cis_sabl_eds?: string|null;
		/**ixs_evp*/
		ixs_evp?: string|null;
		/**ixs_evp_eo*/
		ixs_evp_eo?: string|null;
		/**ixs_fun_mng*/
		ixs_fun_mng?: string|null;
		/**kontrola_dok
		*      15.07.24 KK - pridan sloupecek pro kontrolu pred akci
		*/
		kontrola_dok?: number|null;
		/**Aktivita dokladu - eko_akt*/
		Aktivita?: Gordic.Eko.Interface.GEAktivitaDokladu|null;
		/**Stav dokladu - s_zau*/
		Stav?: Gordic.Eko.Interface.GEStavyDokladu|null;
		/**Nasledna akce po schvaleni - ext_valid*/
		AkcePoSchvaleni?: Gordic.Eko.Interface.GEOperacePoSchvaleni|null;
		/**Textovy stav dokladu*/
		readonly StavTxt?: string|null;
		/**Priznak, zda je doklad evidovany*/
		readonly IsEvidovano?: boolean|null;
	}
	const enum GRozspidWDtoNames { ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_uka = "ixs_uka", ixs_esu = "ixs_esu", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", ks = "ks", vs = "vs", ss = "ss", ext_valid = "ext_valid", ixs_ahl = "ixs_ahl", cis_sabl_eds = "cis_sabl_eds", ixs_evp = "ixs_evp", ixs_evp_eo = "ixs_evp_eo", ixs_fun_mng = "ixs_fun_mng", kontrola_dok = "kontrola_dok", Aktivita = "Aktivita", Stav = "Stav", AkcePoSchvaleni = "AkcePoSchvaleni", StavTxt = "StavTxt", IsEvidovano = "IsEvidovano",}
	const enum GRozspidWDtoFragments { ixp = "main", lic = "main", popis = "main", ico = "main", ucs = "main", nks = "main", ixp_den = "main", ac = "main", rok = "main", mesic = "main", den = "main", dat_prij_pod = "main", ixs_typ = "main", ktg_typ = "main", eko_akt = "main", dat_evid = "main", dat_zau = "main", s_zau = "main", s_sto = "main", ac_ixe = "main", stav_ac_ixe = "main", drd = "main", c = "main", dat_zmena = "main", zmenu_prov = "main", typ_ag = "main", ixs_fun_akt = "main", bu_vl = "main", sk_vl = "main", priz_view = "main", ac_ag = "main", uus = "main", cis_real = "main", ixs_fun_vyriz = "main", ixs_uka = "main", ixs_esu = "main", ico_esu = "main", bu_ci = "main", sk_ci = "main", ks = "main", vs = "main", ss = "main", ext_valid = "main", ixs_ahl = "main", cis_sabl_eds = "main", ixs_evp = "main", ixs_evp_eo = "main", ixs_fun_mng = "main", kontrola_dok = "main", Aktivita = "*", Stav = "*", AkcePoSchvaleni = "*", StavTxt = "*", IsEvidovano = "*",}
	const enum GRozspidWDtoTypes { ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", ixs_uka = "string", ixs_esu = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", ks = "string", vs = "string", ss = "string", ext_valid = "number", ixs_ahl = "string", cis_sabl_eds = "string", ixs_evp = "string", ixs_evp_eo = "string", ixs_fun_mng = "string", kontrola_dok = "number", Aktivita = "Gordic.Eko.Interface.GEAktivitaDokladu", Stav = "Gordic.Eko.Interface.GEStavyDokladu", AkcePoSchvaleni = "Gordic.Eko.Interface.GEOperacePoSchvaleni", StavTxt = "string", IsEvidovano = "boolean",}
	const enum GRozspidWDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Rozbory\GEkoFilterRzbDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Filtr pro dvou-radkovy filtr nad gridem*/
	interface GEkoFilterRzbDto extends Gordic.Eko.Interface.GCfuTopoFilterDto {
		/**drd_msk*/
		drd_msk?: string|null;
		/**rok*/
		rok?: GIntervalDto<number>|null;
		/**mesic*/
		mesic?: GIntervalDto<number>|null;
		/**den*/
		den?: GIntervalDto<number>|null;
		/**Doklad*/
		ac?: GIntervalDto<string>|null;
		/**Popis dokladu*/
		pdok?: string|null;
		/**Popis dokladu*/
		popis?: string|null;
		/**MD*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**Dal*/
		c1?: GIntervalDto<JsonDecimal>|null;
		/**???*/
		c2?: GIntervalDto<JsonDecimal>|null;
		/**MD - Dal*/
		c0c1?: GIntervalDto<JsonDecimal>|null;
		/**AS MD*/
		c0_as?: GIntervalDto<JsonDecimal>|null;
		/**AS DAL*/
		c1_as?: GIntervalDto<JsonDecimal>|null;
		/**AS P-V*/
		c0c1_as?: GIntervalDto<JsonDecimal>|null;
		/**ROK DPH*/
		rok_uej?: GIntervalDto<number>|null;
		/**Mesic DPH*/
		mesic_uej?: GIntervalDto<number>|null;
		/**ZD*/
		zd?: GIntervalDto<number>|null;
		/**PID*/
		ixp?: Gordic.Eko.Interface.GEkoFilterRzbDto.GEkoIxpFilterDto|null;
		/**PID Primarni*/
		ixp_prim?: string|null;
		/**Agendove cislo*/
		ac_ag?: GIntervalDto<string>|null;
		/**Datum zmeny*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**ixs_ico*/
		ixs_esu?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
		/**id_hdr_ris*/
		id_hdr_ris?: GIntervalDto<string>|null;
		/**ixs_msk*/
		ixs_msk?: string|null;
		/**Zmenu prov.*/
		nazev_rf?: string|null;
		/**typ dokuemntu*/
		ixs_typ?: string|null;
		/**generated*/
		kc0?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		kc1?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		kc2?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		nazev?: string|null;
		/**generated*/
		radek?: number|null;
		/**generated*/
		sc0?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc1?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc2?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc3?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc4?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc5?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc6?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc7?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc8?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc9?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		radek_hdr?: GIntervalDto<number>|null;
		/**generated*/
		te0?: GIntervalDto<string>|null;
		/**generated*/
		te1?: GIntervalDto<string>|null;
		/**generated*/
		te2?: GIntervalDto<string>|null;
		/**generated*/
		te3?: GIntervalDto<string>|null;
		/**generated*/
		te4?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uea*/
		uea?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueb*/
		ueb?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uec*/
		uec?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ued*/
		ued?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uee*/
		uee?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uef*/
		uef?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueg*/
		ueg?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueh*/
		ueh?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uei*/
		uei?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uej*/
		uej?: GIntervalDto<string>|null;
		/**Status*/
		status?: boolean|null;
		/**Priznak blokace*/
		priz_blok?: number|null;
		/**MD*/
		c_navrh?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_sl?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_cerpani_rs?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_ru?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_cerpani_ru?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_14?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_mrz?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_act?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_vz?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_vz_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj_blk?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_fak?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_rsm?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_disp?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_uct?: GIntervalDto<JsonDecimal>|null;
		druh_char?: GIntervalDto<number>|null;
		priz_char?: GIntervalDto<number>|null;
		/**Par 1*/
		value0?: GIntervalDto<string>|null;
		/**Par 2*/
		value1?: GIntervalDto<string>|null;
	}
	const enum GEkoFilterRzbDtoNames { drd_msk = "drd_msk", rok = "rok", mesic = "mesic", den = "den", ac = "ac", pdok = "pdok", popis = "popis", c0 = "c0", c1 = "c1", c2 = "c2", c0c1 = "c0c1", c0_as = "c0_as", c1_as = "c1_as", c0c1_as = "c0c1_as", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", ixp = "ixp", ixp_prim = "ixp_prim", ac_ag = "ac_ag", dat_zmena = "dat_zmena", typ_ag = "typ_ag", esu_txt = "esu_txt", ixs_esu = "ixs_esu", esu_ico = "esu_ico", esu_rc = "esu_rc", id_hdr_ris = "id_hdr_ris", ixs_msk = "ixs_msk", nazev_rf = "nazev_rf", ixs_typ = "ixs_typ", kc0 = "kc0", kc1 = "kc1", kc2 = "kc2", nazev = "nazev", radek = "radek", sc0 = "sc0", sc1 = "sc1", sc2 = "sc2", sc3 = "sc3", sc4 = "sc4", sc5 = "sc5", sc6 = "sc6", sc7 = "sc7", sc8 = "sc8", sc9 = "sc9", radek_hdr = "radek_hdr", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", status = "status", priz_blok = "priz_blok", c_navrh = "c_navrh", c_sl = "c_sl", c_cerpani_rs = "c_cerpani_rs", c_ru = "c_ru", c_cerpani_ru = "c_cerpani_ru", c_14 = "c_14", c_mrz = "c_mrz", c_act = "c_act", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_obj_blk = "c_obj_blk", c_fak = "c_fak", c_rsm = "c_rsm", c_disp = "c_disp", c_uct = "c_uct", druh_char = "druh_char", priz_char = "priz_char", value0 = "value0", value1 = "value1", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", cfu = "cfu",}
	const enum GEkoFilterRzbDtoFragments { drd_msk = "*", rok = "*", mesic = "*", den = "*", ac = "*", pdok = "*", popis = "*", c0 = "*", c1 = "*", c2 = "*", c0c1 = "*", c0_as = "*", c1_as = "*", c0c1_as = "*", rok_uej = "*", mesic_uej = "*", zd = "*", ixp = "*", ixp_prim = "*", ac_ag = "*", dat_zmena = "*", typ_ag = "*", esu_txt = "*", ixs_esu = "*", esu_ico = "*", esu_rc = "*", id_hdr_ris = "*", ixs_msk = "*", nazev_rf = "*", ixs_typ = "*", kc0 = "*", kc1 = "*", kc2 = "*", nazev = "*", radek = "*", sc0 = "*", sc1 = "*", sc2 = "*", sc3 = "*", sc4 = "*", sc5 = "*", sc6 = "*", sc7 = "*", sc8 = "*", sc9 = "*", radek_hdr = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", status = "*", priz_blok = "*", c_navrh = "*", c_sl = "*", c_cerpani_rs = "*", c_ru = "*", c_cerpani_ru = "*", c_14 = "*", c_mrz = "*", c_act = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_obj_blk = "*", c_fak = "*", c_rsm = "*", c_disp = "*", c_uct = "*", druh_char = "*", priz_char = "*", value0 = "*", value1 = "*", ico = "*", ucs = "*", uus = "*", nks = "*", cfu = "*",}
	const enum GEkoFilterRzbDtoTypes { drd_msk = "string", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", ac = "GIntervalDto<string>", pdok = "string", popis = "string", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", c2 = "GIntervalDto<JsonDecimal>", c0c1 = "GIntervalDto<JsonDecimal>", c0_as = "GIntervalDto<JsonDecimal>", c1_as = "GIntervalDto<JsonDecimal>", c0c1_as = "GIntervalDto<JsonDecimal>", rok_uej = "GIntervalDto<number>", mesic_uej = "GIntervalDto<number>", zd = "GIntervalDto<number>", ixp = "Gordic.Eko.Interface.GEkoFilterRzbDto.GEkoIxpFilterDto", ixp_prim = "string", ac_ag = "GIntervalDto<string>", dat_zmena = "GIntervalDto<JsonDate>", typ_ag = "number", esu_txt = "string", ixs_esu = "string", esu_ico = "string", esu_rc = "string", id_hdr_ris = "GIntervalDto<string>", ixs_msk = "string", nazev_rf = "string", ixs_typ = "string", kc0 = "GIntervalDto<JsonDecimal>", kc1 = "GIntervalDto<JsonDecimal>", kc2 = "GIntervalDto<JsonDecimal>", nazev = "string", radek = "number", sc0 = "GIntervalDto<JsonDecimal>", sc1 = "GIntervalDto<JsonDecimal>", sc2 = "GIntervalDto<JsonDecimal>", sc3 = "GIntervalDto<JsonDecimal>", sc4 = "GIntervalDto<JsonDecimal>", sc5 = "GIntervalDto<JsonDecimal>", sc6 = "GIntervalDto<JsonDecimal>", sc7 = "GIntervalDto<JsonDecimal>", sc8 = "GIntervalDto<JsonDecimal>", sc9 = "GIntervalDto<JsonDecimal>", radek_hdr = "GIntervalDto<number>", te0 = "GIntervalDto<string>", te1 = "GIntervalDto<string>", te2 = "GIntervalDto<string>", te3 = "GIntervalDto<string>", te4 = "GIntervalDto<string>", uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", uec = "GIntervalDto<string>", ued = "GIntervalDto<string>", uee = "GIntervalDto<string>", uef = "GIntervalDto<string>", ueg = "GIntervalDto<string>", ueh = "GIntervalDto<string>", uei = "GIntervalDto<string>", uej = "GIntervalDto<string>", status = "boolean", priz_blok = "number", c_navrh = "GIntervalDto<JsonDecimal>", c_sl = "GIntervalDto<JsonDecimal>", c_cerpani_rs = "GIntervalDto<JsonDecimal>", c_ru = "GIntervalDto<JsonDecimal>", c_cerpani_ru = "GIntervalDto<JsonDecimal>", c_14 = "GIntervalDto<JsonDecimal>", c_mrz = "GIntervalDto<JsonDecimal>", c_act = "GIntervalDto<JsonDecimal>", c_vz = "GIntervalDto<JsonDecimal>", c_sml = "GIntervalDto<JsonDecimal>", c_vz_sml = "GIntervalDto<JsonDecimal>", c_obj = "GIntervalDto<JsonDecimal>", c_obj_sml = "GIntervalDto<JsonDecimal>", c_obj_blk = "GIntervalDto<JsonDecimal>", c_fak = "GIntervalDto<JsonDecimal>", c_rsm = "GIntervalDto<JsonDecimal>", c_disp = "GIntervalDto<JsonDecimal>", c_uct = "GIntervalDto<JsonDecimal>", druh_char = "GIntervalDto<number>", priz_char = "GIntervalDto<number>", value0 = "GIntervalDto<string>", value1 = "GIntervalDto<string>", ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GEkoFilterRzbDtoTypeLengths {}
}
declare namespace Gordic.Eko.Interface.GEkoFilterRzbDto {
	/**Pomocna trida pro formular Gordic.Filter.ixp*/
	interface GEkoIxpFilterDto {
		/**PID*/
		ixp?: string|null;
		/**PID souvisejici*/
		ixp_s?: boolean|null;
	}
	const enum GEkoIxpFilterDtoNames { ixp = "ixp", ixp_s = "ixp_s",}
	const enum GEkoIxpFilterDtoFragments { ixp = "*", ixp_s = "*",}
	const enum GEkoIxpFilterDtoTypes { ixp = "string", ixp_s = "boolean",}
	const enum GEkoIxpFilterDtoTypeLengths {}
}
declare namespace Gordic.Eko.Interface {
	/**DTO elementu*/
	interface GEkoElementsRzbDto {
		/**Jednotlive elementy*/
		filters?: Gordic.Eko.Interface.GEkoFilterRzbDto[]|null;
	}
	const enum GEkoElementsRzbDtoNames { filters = "filters",}
	const enum GEkoElementsRzbDtoFragments { filters = "*",}
	const enum GEkoElementsRzbDtoTypes { filters = "Gordic.Eko.Interface.GEkoFilterRzbDto[]",}
	const enum GEkoElementsRzbDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uct\GUctspidDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:Seznam*/
	interface GUctspidDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:Seznam.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:Seznam.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:Seznam.ac_ixe*/
		ac_ixe?: string|null;
		/**DBCOLUMN:Seznam.stav_ac_ixe*/
		stav_ac_ixe?: number|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:Seznam.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:Seznam.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.stav*/
		stav?: number|null;
		/**DBCOLUMN:Seznam.ac_akt*/
		ac_akt?: string|null;
		/**DBCOLUMN:Seznam.fik*/
		fik?: number|null;
		/**DBCOLUMN:Seznam.fik*/
		uck?: number|null;
		/**DBCOLUMN:Seznam.int_dok*/
		int_dok?: number|null;
		/**DBCOLUMN:Seznam.stav_txt*/
		stav_txt?: string|null;
		/**Bankovni limit*/
		banklimit_c0?: JsonDecimal|null;
		/**Bankovni limit*/
		banklimit_c1?: JsonDecimal|null;
		/**Pro ESU*/
		stupen_ver?: number|null;
		/**Ico esu*/
		icoesu?: string|null;
		/**Pid pod kterym se doklad zauctuje v rezimu e-uctetnictvi*/
		ixp_zauct?: string|null;
		/**Priznak, zda je doklad v e-ucetnictvi*/
		priz_euct?: number|null;
		/**Osoba odpovědná za účetní případ(funkce)*/
		ixs_fun_ooup?: string|null;
		/**Osobu odpovědnou za zaúčtování(funkce)*/
		ixs_fun_oozu?: string|null;
		/**DBCOLUMN:Seznam.kniha*/
		kniha?: string|null;
		/**DBCOLUMN:Seznam.ecdd*/
		ecdd?: string|null;
		/**Vraci stav dokladu pretypovany na enum*/
		readonly StavDokladu?: Gordic.Eko.Interface.GEStavyDokladu|null;
		/**Vraci priznak, zda byl doklad jiz evidovany (ma vyplnene evidencni cislo)*/
		readonly IsEvidovany?: boolean|null;
		/**Stav dokladu - zauctovano castecne*/
		readonly IsZauctovanoCastecne?: boolean|null;
		/**Zmenene podklady dph*/
		IsZmenenePodkladyDPH?: boolean|null;
		/**Stav dokladu - uzavreny*/
		readonly IsUzavreny?: boolean|null;
		/**Aktivita dokladu*/
		readonly Aktivita?: Gordic.Eko.Interface.GEAktivitaDokladu|null;
		/**Stav dokladu - stornovano*/
		readonly IsStornovano?: boolean|null;
		/**Vraci priznak, zda je doklad jiz zauctovany*/
		readonly IsZauctovany?: boolean|null;
		/**Vraci priznak zda je doklad ve stavu navrh - evidovany se zapisy*/
		readonly IsNavrh?: boolean|null;
		/**Vraci priznak, zda je doklad schvaleny*/
		readonly IsSchvaleny?: boolean|null;
		/**Vraci priznak zda je doklad aktivni*/
		readonly IsAktivni?: boolean|null;
		/**Metoda vraci priznak, zda doklad vyzaduje vazbu na jiny doklad - jedna se o sekundarni doklad*/
		readonly IsVyzadujeVazbu?: boolean|null;
		/**Kategorie dokladu vyjadrena jako vycet*/
		readonly KategorieDokladu?: Gordic.Eko.Interface.GEKategorieDokladu|null;
		/**Druh dokladu vraceny jako hodnota vyctu*/
		readonly DruhDokladu?: Gordic.Eko.Interface.GEDruhDokladu|null;
		/**Typ dokladu -danovy*/
		IsDanovyDoklad?: boolean|null;
		/**Je prim. doklad stornovany*/
		IsPrimDokladStornovany?: boolean|null;
		/**Atribut nesparovanych plateb*/
		readonly IsDokladNesparovanychPlateb?: boolean|null;
		/**Atribut urcuje, zda je na dokladu kategorie opravneho dokladu*/
		readonly IsDokladOpravny?: boolean|null;
		/**Je doklad schvalen financni kontrolou*/
		readonly JeDokladSchvalenFinancniKontrolou?: boolean|null;
		/**Je doklad zamitnut financni kontrolou*/
		readonly JeDokladZamitnutFinancniKontrolou?: boolean|null;
		/**Je doklad v procesu financni kontroly*/
		JeDokladVProcesuFinancniKontroly?: boolean|null;
		/**Je doklad v procesu ucetni kontroly*/
		JeDokladVProcesuUcetniKontroly?: boolean|null;
		/**Zjisti zda doklad pochazi z agend BPL*/
		readonly IsPohledavkaBPL?: boolean|null;
		/**Atribut priznaku dokladu e-uct*/
		readonly IsDokladEuct?: boolean|null;
	}
	const enum GUctspidDtoNames { ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", subrada = "subrada", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", ixs_esu = "ixs_esu", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", stav = "stav", ac_akt = "ac_akt", fik = "fik", uck = "uck", int_dok = "int_dok", stav_txt = "stav_txt", banklimit_c0 = "banklimit_c0", banklimit_c1 = "banklimit_c1", stupen_ver = "stupen_ver", icoesu = "icoesu", ixp_zauct = "ixp_zauct", priz_euct = "priz_euct", ixs_fun_ooup = "ixs_fun_ooup", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "StavDokladu", IsEvidovany = "IsEvidovany", IsZauctovanoCastecne = "IsZauctovanoCastecne", IsZmenenePodkladyDPH = "IsZmenenePodkladyDPH", IsUzavreny = "IsUzavreny", Aktivita = "Aktivita", IsStornovano = "IsStornovano", IsZauctovany = "IsZauctovany", IsNavrh = "IsNavrh", IsSchvaleny = "IsSchvaleny", IsAktivni = "IsAktivni", IsVyzadujeVazbu = "IsVyzadujeVazbu", KategorieDokladu = "KategorieDokladu", DruhDokladu = "DruhDokladu", IsDanovyDoklad = "IsDanovyDoklad", IsPrimDokladStornovany = "IsPrimDokladStornovany", IsDokladNesparovanychPlateb = "IsDokladNesparovanychPlateb", IsDokladOpravny = "IsDokladOpravny", JeDokladSchvalenFinancniKontrolou = "JeDokladSchvalenFinancniKontrolou", JeDokladZamitnutFinancniKontrolou = "JeDokladZamitnutFinancniKontrolou", JeDokladVProcesuFinancniKontroly = "JeDokladVProcesuFinancniKontroly", JeDokladVProcesuUcetniKontroly = "JeDokladVProcesuUcetniKontroly", IsPohledavkaBPL = "IsPohledavkaBPL", IsDokladEuct = "IsDokladEuct",}
	const enum GUctspidDtoFragments { ixp = "all", lic = "all", popis = "popis", ico = "all", ucs = "all", nks = "all", ixp_den = "all", ac = "all", rok = "all", mesic = "all", den = "all", dat_prij_pod = "dat_prij_pod", ixs_typ = "all", ktg_typ = "all", eko_akt = "all", dat_evid = "all", dat_zau = "all", s_zau = "all", s_sto = "all", ac_ixe = "all", stav_ac_ixe = "all", drd = "all", c = "all", dat_zmena = "all", zmenu_prov = "all", typ_ag = "all", ixs_fun_akt = "all", rok_dph = "all", mesic_dph = "all", subrada = "all", bu_vl = "all", sk_vl = "all", priz_view = "all", ac_ag = "all", ixs_esu = "all", uus = "all", cis_real = "all", ixs_fun_vyriz = "all", stav = "stav", ac_akt = "ac_akt", fik = "all", uck = "all", int_dok = "all", stav_txt = "stav_txt", banklimit_c0 = "all", banklimit_c1 = "all", stupen_ver = "all", icoesu = "all", ixp_zauct = "all", priz_euct = "all", ixs_fun_ooup = "ixs_fun_oozu", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "all", IsEvidovany = "all", IsZauctovanoCastecne = "all", IsZmenenePodkladyDPH = "all", IsUzavreny = "all", Aktivita = "all", IsStornovano = "all", IsZauctovany = "all", IsNavrh = "all", IsSchvaleny = "all", IsAktivni = "all", IsVyzadujeVazbu = "all", KategorieDokladu = "all", DruhDokladu = "all", IsDanovyDoklad = "all", IsPrimDokladStornovany = "all", IsDokladNesparovanychPlateb = "all", IsDokladOpravny = "all", JeDokladSchvalenFinancniKontrolou = "all", JeDokladZamitnutFinancniKontrolou = "all", JeDokladVProcesuFinancniKontroly = "all", JeDokladVProcesuUcetniKontroly = "all", IsPohledavkaBPL = "all", IsDokladEuct = "all",}
	const enum GUctspidDtoTypes { ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", subrada = "number", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", ixs_esu = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", stav = "number", ac_akt = "string", fik = "number", uck = "number", int_dok = "number", stav_txt = "string", banklimit_c0 = "JsonDecimal", banklimit_c1 = "JsonDecimal", stupen_ver = "number", icoesu = "string", ixp_zauct = "string", priz_euct = "number", ixs_fun_ooup = "string", ixs_fun_oozu = "string", kniha = "string", ecdd = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", IsEvidovany = "boolean", IsZauctovanoCastecne = "boolean", IsZmenenePodkladyDPH = "boolean", IsUzavreny = "boolean", Aktivita = "Gordic.Eko.Interface.GEAktivitaDokladu", IsStornovano = "boolean", IsZauctovany = "boolean", IsNavrh = "boolean", IsSchvaleny = "boolean", IsAktivni = "boolean", IsVyzadujeVazbu = "boolean", KategorieDokladu = "Gordic.Eko.Interface.GEKategorieDokladu", DruhDokladu = "Gordic.Eko.Interface.GEDruhDokladu", IsDanovyDoklad = "boolean", IsPrimDokladStornovany = "boolean", IsDokladNesparovanychPlateb = "boolean", IsDokladOpravny = "boolean", JeDokladSchvalenFinancniKontrolou = "boolean", JeDokladZamitnutFinancniKontrolou = "boolean", JeDokladVProcesuFinancniKontroly = "boolean", JeDokladVProcesuUcetniKontroly = "boolean", IsPohledavkaBPL = "boolean", IsDokladEuct = "boolean",}
	const enum GUctspidDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, ixs_typ = 12, ac_ixe = 20, zmenu_prov = 12, ixs_fun_akt = 12, bu_vl = 34, sk_vl = 11, ac_ag = 20, ixs_esu = 12, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, icoesu = 10, ixp_zauct = 12, ixs_fun_ooup = 12, ixs_fun_oozu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uct\Obdobi\GUctMesciObdobiDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO mesicnich obdobi*/
	interface GUctMesciObdobiDto {
		/**Jmeno agendy*/
		Mesic?: number|null;
	}
	const enum GUctMesciObdobiDtoNames { Mesic = "Mesic",}
	const enum GUctMesciObdobiDtoFragments { Mesic = "*",}
	const enum GUctMesciObdobiDtoTypes { Mesic = "number",}
	const enum GUctMesciObdobiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uct\Obdobi\IGUctsobd.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s ucetnim obdobim*/
	interface UctObd {
		/**Zjisteni otevrenych mesicu pro vytvoreni noveho dokladu*/
		listNew(rq?:CallParams<{povolenoUctovaniDoUzavrenehoObdobi:boolean}>): _Task<{povolenoUctovaniDoUzavrenehoObdobi:boolean},GServiceListResponse<Gordic.Uct.Interface.GUctMesciObdobiDto>>;
		/**Zjištění otevřených měsíců roku*/
		listOpenMonthsByYear(rq?:CallParams<{rok:number,povolenoUctovaniDoUzavrenehoObdobi:boolean}>): _Task<{rok:number,povolenoUctovaniDoUzavrenehoObdobi:boolean},GServiceListResponse<Gordic.Uct.Interface.GUctMesciObdobiDto>>;
		/**Zjisteni otevrenych mesicu pro opravu dokladu*/
		listUpdate(rq?:CallParams<{drd:number,povolenoUctovaniDoUzavrenehoObdobi:boolean}>): _Task<{drd:number,povolenoUctovaniDoUzavrenehoObdobi:boolean},GServiceListResponse<Gordic.Uct.Interface.GUctMesciObdobiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctObd: ServiceBase & Catalog.UctObd;
	}
	const UctObd: Client["UctObd"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Agenda\GEkoAgendaDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO agendy*/
	interface GEkoAgendaDto extends Gordic.Eko.Interface.GEkoSouctyKnihDto {
		/**Jmeno agendy*/
		nazev?: string|null;
		/**Zkratka agendy*/
		zkratka?: string|null;
		/**Typ agendy*/
		typ_ag?: number|null;
	}
	const enum GEkoAgendaDtoNames { nazev = "nazev", zkratka = "zkratka", typ_ag = "typ_ag", pocet_knih_celkem = "pocet_knih_celkem", pocet_knih_uzavreno = "pocet_knih_uzavreno", pocet_knih_otevreno = "pocet_knih_otevreno", pocet_knih_pripraveno = "pocet_knih_pripraveno",}
	const enum GEkoAgendaDtoFragments { nazev = "*", zkratka = "*", typ_ag = "*", pocet_knih_celkem = "*", pocet_knih_uzavreno = "*", pocet_knih_otevreno = "*", pocet_knih_pripraveno = "*",}
	const enum GEkoAgendaDtoTypes { nazev = "string", zkratka = "string", typ_ag = "number", pocet_knih_celkem = "number", pocet_knih_uzavreno = "number", pocet_knih_otevreno = "number", pocet_knih_pripraveno = "number",}
	const enum GEkoAgendaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Agenda\GEkoAgendaFiltrDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Enum filtru seznamu agend*/
	const enum GEkoAgendaFiltrEnum {
		/**cislo agendy*/
		typ_ag,
		/**jmeno agendy*/
		nazev,
		/**Zkratka agendy*/
		zkratka,
	}
	/**Filtracni dto seznamu agend*/
	interface GEkoAgendaFiltrDto {
		/**Pid knihy*/
		typ_ag?: GBaseFilter<number>|null;
		/**n8zev agendy*/
		nazev?: GBaseFilter<string>|null;
		/**Rok dokladu*/
		zkratka?: GBaseFilter<string>|null;
	}
	const enum GEkoAgendaFiltrDtoNames { typ_ag = "typ_ag", nazev = "nazev", zkratka = "zkratka",}
	const enum GEkoAgendaFiltrDtoFragments { typ_ag = "*", nazev = "*", zkratka = "*",}
	const enum GEkoAgendaFiltrDtoTypes { typ_ag = "GBaseFilter<number>", nazev = "GBaseFilter<string>", zkratka = "GBaseFilter<string>",}
	const enum GEkoAgendaFiltrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Agenda\GEkoAgendaPermissions.d.ts 

declare namespace Gordic.Eko.Interface {
	/**opravneni k  akcim na agende*/
	interface GEkoAgendaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni uzaverek agendy*/
		EnableClosing: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GEkoAgendaPermissionsNames { EnableClosing = "EnableClosing",}
	const enum GEkoAgendaPermissionsFragments { EnableClosing = "*",}
	const enum GEkoAgendaPermissionsTypes { EnableClosing = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GEkoAgendaPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Agenda\GEkoSouctyKnihDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO knihy*/
	interface GEkoSouctyKnihDto {
		/**Pocet knih v agende*/
		pocet_knih_celkem?: number|null;
		/**Pocet uzavrenych knih v agende*/
		pocet_knih_uzavreno?: number|null;
		/**Pocet otevrenych knih v agende*/
		pocet_knih_otevreno?: number|null;
		/**Pocet pripavenych knih k uzavreni knih v agende*/
		pocet_knih_pripraveno?: number|null;
	}
	const enum GEkoSouctyKnihDtoNames { pocet_knih_celkem = "pocet_knih_celkem", pocet_knih_uzavreno = "pocet_knih_uzavreno", pocet_knih_otevreno = "pocet_knih_otevreno", pocet_knih_pripraveno = "pocet_knih_pripraveno",}
	const enum GEkoSouctyKnihDtoFragments { pocet_knih_celkem = "*", pocet_knih_uzavreno = "*", pocet_knih_otevreno = "*", pocet_knih_pripraveno = "*",}
	const enum GEkoSouctyKnihDtoTypes { pocet_knih_celkem = "number", pocet_knih_uzavreno = "number", pocet_knih_otevreno = "number", pocet_knih_pripraveno = "number",}
	const enum GEkoSouctyKnihDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkoAktivitaKnihyEnum.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Aktivita knihy*/
	const enum GEkoAktivitaKnihyEnum {
		NEOBSAZENO=0,
		/**Otevreno*/
		OTEVRENO=100,
		/**Pripraveno k uzavreni*/
		PRIPRAVENO_K_UZAVRENI=300,
		/**Uzavreno neodlito*/
		UZAVRENO_NEODLITO=400,
		/**Uzevreno odlito*/
		UZAVRENO_ODLITO=500,
		/**Zruseno*/
		ZRUSENO=900,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkoKnihaDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO knihy*/
	interface GEkoKnihaDto extends Gordic.Eko.Interface.GEkosdenBaseDto {
		/**zkratka knihy*/
		zkratka?: string|null;
		/**subrada knihy*/
		subrada?: number|null;
		/**aktivita subrady*/
		akt_subrady?: number|null;
		/**Kategorie knihy  - popis*/
		ktg_den_txt?: string|null;
		/**Stav knihy - popis*/
		stav_txt?: string|null;
		/**Počet dokladů aktuálně evidovaných v knize*/
		pocet_vsech_dokladu?: number|null;
		/**Celkovy pocet dokladu ke knize v archivu*/
		pocet_vsech_dokladu_archiv?: number|null;
		/**Pocet nepripravenych dokladu k uzaverce*/
		pocet_neuzavrenych_dokladu?: number|null;
		/**Počet dokladů podaných do knihy a nezaevidovaných, které rovněž mohou bránit uzávěrce*/
		pocet_neevid_dokladu?: number|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**Zkratka agendy*/
		zkr_ag?: string|null;
	}
	const enum GEkoKnihaDtoNames { zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", stav_txt = "stav_txt", pocet_vsech_dokladu = "pocet_vsech_dokladu", pocet_vsech_dokladu_archiv = "pocet_vsech_dokladu_archiv", pocet_neuzavrenych_dokladu = "pocet_neuzavrenych_dokladu", pocet_neevid_dokladu = "pocet_neevid_dokladu", typ_ag = "typ_ag", zkr_ag = "zkr_ag", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GEkoKnihaDtoFragments { zkratka = "rdac", subrada = "rdac", akt_subrady = "rdac", ktg_den_txt = "uctcktd", stav_txt = "ekocakr", pocet_vsech_dokladu = "doklad_vse", pocet_vsech_dokladu_archiv = "doklad_archiv", pocet_neuzavrenych_dokladu = "doklad_neuzavreno", pocet_neevid_dokladu = "doklad_neevid", typ_ag = "agenda", zkr_ag = "agenda", ixp_den = "sden", lic = "sden", aktivita = "sden", arw = "sden", poznamka = "sden", dat_od = "sden", dat_do = "sden", ico = "sden", ucs = "sden", nazev = "sden", rok = "sden", typ_den = "sden", ktg_den = "sden", dat_zmena = "sden", zmenu_prov = "sden", por_cislo_max = "sden", subrada_max = "sden", subrada_duz = "sden", len_ac = "sden", krok_uza = "sden", ixp_den_old = "sden", uus = "sden", prefix = "sden", suffix = "sden", uex = "sden", ixs_vpk = "sden",}
	const enum GEkoKnihaDtoTypes { zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", stav_txt = "string", pocet_vsech_dokladu = "number", pocet_vsech_dokladu_archiv = "number", pocet_neuzavrenych_dokladu = "number", pocet_neevid_dokladu = "number", typ_ag = "number", zkr_ag = "string", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
	const enum GEkoKnihaDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, ixs_vpk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkoKnihaFiltrDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Enum filtru seznamu knih*/
	const enum GEkoKnihaFiltrEnum {
		/**Pid knihy*/
		ixp_den,
		/**Uctarna*/
		uus,
		/**Ucetnistredisko*/
		ucs,
		/**Subrada*/
		subrada,
		/**Rok*/
		rok,
		/**aktivita deniku*/
		aktivita,
		/**Nazev knihy*/
		nazev,
		/**Zkratka subrady*/
		zkratka,
		/**Aktivita subrady*/
		akt_subrady,
	}
	/**Filtracni dto seznamu knih*/
	interface GEkoKnihaFiltrDto {
		/**Pid knihy*/
		ixp_den?: GBaseFilter<string>|null;
		/**Rok dokladu*/
		rok?: GIntervalDto<number>|null;
		/**Aktivita knihy*/
		aktivita?: GBaseFilter<number>|null;
		/**Uctarna*/
		uus?: GBaseFilter<string>|null;
		/**Ucetni stredisko*/
		ucs?: GIntervalDto<number>|null;
		/**Nazev knihy*/
		nazev?: GBaseFilter<string>|null;
		/**Aktivita subrady*/
		akt_subrady?: GIntervalDto<number>|null;
		/**Subrada*/
		subrada?: GBaseFilter<number>|null;
		/**Zkratka subrady*/
		zkratka?: GBaseFilter<string>|null;
	}
	const enum GEkoKnihaFiltrDtoNames { ixp_den = "ixp_den", rok = "rok", aktivita = "aktivita", uus = "uus", ucs = "ucs", nazev = "nazev", akt_subrady = "akt_subrady", subrada = "subrada", zkratka = "zkratka",}
	const enum GEkoKnihaFiltrDtoFragments { ixp_den = "sden", rok = "sden", aktivita = "sden", uus = "sden", ucs = "sden", nazev = "sden", akt_subrady = "rdac", subrada = "rdac", zkratka = "rdac",}
	const enum GEkoKnihaFiltrDtoTypes { ixp_den = "GBaseFilter<string>", rok = "GIntervalDto<number>", aktivita = "GBaseFilter<number>", uus = "GBaseFilter<string>", ucs = "GIntervalDto<number>", nazev = "GBaseFilter<string>", akt_subrady = "GIntervalDto<number>", subrada = "GBaseFilter<number>", zkratka = "GBaseFilter<string>",}
	const enum GEkoKnihaFiltrDtoTypeLengths { ixp_den = 12, zkratka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkoKnihaPermissions.d.ts 

declare namespace Gordic.Eko.Interface {
	/**opravneni k  akcim na seznamu dokladu*/
	interface GEkoKnihaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni uzaverek*/
		EnableClosing: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni znovuotevreni aktualni knihy*/
		OpenBook: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavreni knihy*/
		CloseBook: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni k priprave uzavreni knihy*/
		PrepareToCloseBook: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni k zruseni pripravy uzavreni knihy*/
		CancelPrepareToCloseBook: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GEkoKnihaPermissionsNames { EnableClosing = "EnableClosing", OpenBook = "OpenBook", CloseBook = "CloseBook", PrepareToCloseBook = "PrepareToCloseBook", CancelPrepareToCloseBook = "CancelPrepareToCloseBook",}
	const enum GEkoKnihaPermissionsFragments { EnableClosing = "*", OpenBook = "*", CloseBook = "*", PrepareToCloseBook = "*", CancelPrepareToCloseBook = "*",}
	const enum GEkoKnihaPermissionsTypes { EnableClosing = "Gordic.General.ApplicationInterface.GPermission", OpenBook = "Gordic.General.ApplicationInterface.GPermission", CloseBook = "Gordic.General.ApplicationInterface.GPermission", PrepareToCloseBook = "Gordic.General.ApplicationInterface.GPermission", CancelPrepareToCloseBook = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GEkoKnihaPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkosdenBaseDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DBTABLE:uctsden*/
	interface GEkosdenBaseDto {
		/**DBCOLUMN:uctsden.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:uctsden.lic*/
		lic?: string|null;
		/**DBCOLUMN:uctsden.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:uctsden.arw*/
		arw?: number|null;
		/**DBCOLUMN:uctsden.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:uctsden.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:uctsden.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:uctsden.ico*/
		ico?: string|null;
		/**DBCOLUMN:uctsden.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:uctsden.ucs*/
		nks?: string|null;
		/**DBCOLUMN:uctsden.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:uctsden.rok*/
		rok?: number|null;
		/**DBCOLUMN:uctsden.typ_den*/
		typ_den?: number|null;
		/**DBCOLUMN:uctsden.ktg_den*/
		ktg_den?: number|null;
		/**DBCOLUMN:uctsden.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctsden.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctsden.por_cislo_max*/
		por_cislo_max?: number|null;
		/**DBCOLUMN:uctsden.subrada_max*/
		subrada_max?: number|null;
		/**DBCOLUMN:uctsden.subrada_duz*/
		subrada_duz?: number|null;
		/**DBCOLUMN:uctsden.len_ac*/
		len_ac?: number|null;
		/**DBCOLUMN:uctsden.krok_uza*/
		krok_uza?: number|null;
		/**DBCOLUMN:uctsden.ixp_den_old*/
		ixp_den_old?: string|null;
		/**DBCOLUMN:uctsden.uus*/
		uus?: string|null;
		/**DBCOLUMN:uctsden.prefix*/
		prefix?: string|null;
		/**DBCOLUMN:uctsden.suffix*/
		suffix?: string|null;
		/**DBCOLUMN:uctsden.uex*/
		uex?: string|null;
		/**DBCOLUMN:uctsden.ixs_vpk*/
		ixs_vpk?: string|null;
	}
	const enum GEkosdenBaseDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nks = "nks", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GEkosdenBaseDtoFragments { ixp_den = "sden", lic = "sden", aktivita = "sden", arw = "sden", poznamka = "sden", dat_od = "sden", dat_do = "sden", ico = "sden", ucs = "sden", nks = "sden", nazev = "sden", rok = "sden", typ_den = "sden", ktg_den = "sden", dat_zmena = "sden", zmenu_prov = "sden", por_cislo_max = "sden", subrada_max = "sden", subrada_duz = "sden", len_ac = "sden", krok_uza = "sden", ixp_den_old = "sden", uus = "sden", prefix = "sden", suffix = "sden", uex = "sden", ixs_vpk = "sden",}
	const enum GEkosdenBaseDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nks = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
	const enum GEkosdenBaseDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nks = 12, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, ixs_vpk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkoTypyUzaverekKnihEnum.d.ts 

declare namespace Gordic.Eko.Interface {
	/**Typ uzaverek*/
	const enum GEkoTypyUzaverekKnihEnum {
		/**Uzavreni vybranych knih*/
		UZAVRENI_KNIHY,
		/**Znovuotevreni uzavrenych knih*/
		ZNOVUOTEVRENI_KNIH,
		/**Připravit k uzavření*/
		PRIPRAVA_K_UZAVRENI,
		/**Zrušit přípravu k uzavření*/
		ZRUSIT_PRIPRAVU_K_UZAVRENI,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.Interface\Uzavreky\Kniha\GEkoVybraneKnihyDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO knihy*/
	interface GEkoVybraneKnihyDto extends Gordic.Eko.Interface.GEkoKnihaDto {
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GEkoVybraneKnihyDtoNames { wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", stav_txt = "stav_txt", pocet_vsech_dokladu = "pocet_vsech_dokladu", pocet_vsech_dokladu_archiv = "pocet_vsech_dokladu_archiv", pocet_neuzavrenych_dokladu = "pocet_neuzavrenych_dokladu", pocet_neevid_dokladu = "pocet_neevid_dokladu", typ_ag = "typ_ag", zkr_ag = "zkr_ag", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GEkoVybraneKnihyDtoFragments { wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", zkratka = "rdac", subrada = "rdac", akt_subrady = "rdac", ktg_den_txt = "uctcktd", stav_txt = "ekocakr", pocet_vsech_dokladu = "doklad_vse", pocet_vsech_dokladu_archiv = "doklad_archiv", pocet_neuzavrenych_dokladu = "doklad_neuzavreno", pocet_neevid_dokladu = "doklad_neevid", typ_ag = "agenda", zkr_ag = "agenda", ixp_den = "sden", lic = "sden", aktivita = "sden", arw = "sden", poznamka = "sden", dat_od = "sden", dat_do = "sden", ico = "sden", ucs = "sden", nazev = "sden", rok = "sden", typ_den = "sden", ktg_den = "sden", dat_zmena = "sden", zmenu_prov = "sden", por_cislo_max = "sden", subrada_max = "sden", subrada_duz = "sden", len_ac = "sden", krok_uza = "sden", ixp_den_old = "sden", uus = "sden", prefix = "sden", suffix = "sden", uex = "sden", ixs_vpk = "sden",}
	const enum GEkoVybraneKnihyDtoTypes { wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", stav_txt = "string", pocet_vsech_dokladu = "number", pocet_vsech_dokladu_archiv = "number", pocet_neuzavrenych_dokladu = "number", pocet_neevid_dokladu = "number", typ_ag = "number", zkr_ag = "string", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
	const enum GEkoVybraneKnihyDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, ixs_vpk = 12,}
}

//#endregion

