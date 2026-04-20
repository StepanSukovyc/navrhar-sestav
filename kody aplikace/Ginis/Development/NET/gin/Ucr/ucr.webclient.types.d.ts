/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ucr.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ucr.WebClient\Gordic.Ucr.WebClient.csproj
*    created     2026-02-16 14:35:11
*    files       MainApp.d.ts
*                Dto\GDetailPozadavkuOptionsDto.d.ts
*                Dto\GEkoFilterDto.d.ts
*                Dto\GEkoParamsDto.d.ts
*                Dto\GFilterOptionsDtoNG.d.ts
*                Dto\GFilterParamsDto.d.ts
*                Dto\GMaskaFilterDto.d.ts
*                Dto\GPopisDokladuDto.d.ts
*                Dto\GRegistrIDDto.d.ts
*                Dto\GSeznamEkoZaznamuGetDataFilterDto.d.ts
*                Dto\GSeznamPozadavkuDto.d.ts
*                Dto\GSlovaRozvrhFilterDto.d.ts
*                Dto\GStavRadkuDto.d.ts
*                Dto\GStavRadkuValDto.d.ts
*                Dto\GStrukturovanyPopisFilterDto.d.ts
*                Dto\GUcPrintParamDanPrizDto.d.ts
*                Dto\GUcPrintParamRegistrDto.d.ts
*                Dto\GUcrGlobalsDtoNG.d.ts
*                Dto\GUcrResultReloadDto.d.ts
*                Dto\GUcrTreeDoplnUdajeDto.d.ts
*                Dto\GUcrTreeUschovnaDto.d.ts
*                Dto\GUcrTxtDto.d.ts
*                Dto\GUcrZkrDto.d.ts
*                Dto\GZapisRadkuDto.d.ts
*                Scripts\GEkoGlobals.d.ts
*                Scripts\GElementUtils.d.ts
*                Scripts\GFilterPrefabsTs.d.ts
*                Scripts\GridFormatExtensions.d.ts
*                Scripts\GUcrMaskaDetail.d.ts
*                Scripts\GUcrMaskaService.d.ts
*                Scripts\slovaRozvrhuFilter.prefab.d.ts
*                Scripts\strukturovanyPopisFilter.prefab.d.ts
*                Scripts\Controls\GDashboardControl.d.ts
*                Scripts\Controls\GDetailStavZapisRadku.d.ts
*                Scripts\Controls\GPopisRadkuControl.d.ts
*                Scripts\Controls\GSeznamEkoZaznamuBase.d.ts
*                Scripts\Controls\GSeznamEkoZaznamuBaseContent.d.ts
*                Scripts\Controls\GSeznamEkoZaznamuTS.d.ts
*                Scripts\Controls\GSeznamMasekControl.d.ts
*                Scripts\Controls\GSeznamPozadavku.d.ts
*                Scripts\Controls\GUcrReportScheduler.d.ts
*                Scripts\Controls\IGSeznamEkoZaznamuBase.d.ts
*                Scripts\Controls\DPH\GDetailDanoveEvidence.d.ts
*                Scripts\Controls\DPH\GSeznamDanovaEvidence.d.ts
*                Scripts\Controls\DPH\GSeznamDanovePriznani.d.ts
*                Scripts\Controls\DPH\GSeznamDanovePriznaniA.d.ts
*                Scripts\Controls\DPH\GSeznamEvidence.d.ts
*                Scripts\Controls\Financovani\GSeznamEkoFinancovani.d.ts
*                Scripts\Controls\IISSP\GInputIDRISRE.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPBase.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPBaseContent.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnosti.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiBanka.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiNZ.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiRegistr.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiStavy.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPStavyStavyCerpaniRozpoctu.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPStavyStavyRezervaci.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPStavyStavyRezervaciChyby.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPStavyStavyRozpoctu.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPStavyStavySkutecnosti.d.ts
*                Scripts\Controls\IISSP\GSeznamIISSPStavyStavyVolaniInbox.d.ts
*                Scripts\Controls\IISSP\GSeznamPreuctovaniStavy.d.ts
*                Scripts\Controls\IISSP\IGSeznamIISSPBase.d.ts
*                Scripts\Controls\Konsolidace\GDetailTransformacniPredpis.d.ts
*                Scripts\Controls\Konsolidace\GSeznamEkoStavyKonsolidace.d.ts
*                Scripts\Controls\Konsolidace\GSeznamStavyKonsolidace.d.ts
*                Scripts\Controls\Konsolidace\GSeznamTransformacniPredpis.d.ts
*                Scripts\Controls\Obalkovac\GObalkovac.d.ts
*                Scripts\Controls\Odesilac\GOdesilac.d.ts
*                Scripts\Controls\PevneOmezeni\GSeznamOmezeni.d.ts
*                Scripts\Controls\Pozadavky\GDetailPozadavkuControl.d.ts
*                Scripts\Controls\Pozadavky\GSeznamPozadavek.d.ts
*                Scripts\Controls\Pozadavky\GSeznamPozadavku.d.ts
*                Scripts\Controls\Registr\GDetailRegistr.d.ts
*                Scripts\Controls\Registr\GSeznamEkoRegistr.d.ts
*                Scripts\Controls\Saldokonto\GSeznamEkoSaldokonto.d.ts
*                Scripts\Controls\Saldokonto\GSeznamEkoSaldokontoZapis.d.ts
*                Scripts\Controls\Saldokonto\GSeznamEkoSaldokontoZapisVse.d.ts
*                Scripts\Controls\Stavy\GSeznamEkoRozStavy.d.ts
*                Scripts\Controls\Stavy\GSeznamEkoUctStavy.d.ts
*                Scripts\Controls\Sumarizace\GExportDatSeznamUcr.d.ts
*                Scripts\Controls\Sumarizace\GExportDatSumarizaceUcr.d.ts
*                Scripts\Controls\Ukazatele\GDetailUkazatele.d.ts
*                Scripts\Controls\Ukazatele\GHistorieUkazatele.d.ts
*                Scripts\Controls\Ukazatele\GSeznamEkoUkazatele.d.ts
*                Scripts\Controls\Ukazatele\GSeznamUkazatele.d.ts
*                Scripts\Controls\Uschovna\GSeznamUschovna.d.ts
*                Scripts\Controls\Vyhled\GSeznamBalancovani.d.ts
*                Scripts\Controls\Vyhled\GSeznamEkoPrimPozadavky.d.ts
*                Scripts\Controls\VYK\GDetailDoplHodnoty.d.ts
*                Scripts\Controls\VYK\GSeznamDoplnkoveUdaje.d.ts
*                Scripts\Controls\Zapisy\GEditaceZapisu.d.ts
*                Scripts\Controls\Zapisy\GSeznamEkoRozZapis.d.ts
*                Scripts\Controls\Zapisy\GSeznamEkoUctZapis.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\MainApp.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GMainApp extends GContentBase {
        title: "Gordic.Ucr.MainApp";
        /** Parametry sestavy na dashboard */
        private ekoRok;
        private globals;
        private dashboardActionName;
        private DebugOrDevelopVersion?;
        /** zasobnik ulozenych filtru */
        ulozeneFiltryGrid: Gordic.Uct.Interface.GUcrFilterDto;
        /**
         * identifikator ucetniho rozvrhu
         */
        protected ixsRoz: string;
        /**
         * identifikator Sax
         */
        protected ixsSax: string;
        onContentReady(args: any): void;
        /**
         * Nalezeni a spusteni startovaci stranky
         * @returns
         */
        private resolveStartPage;
        /**
        * Uzavirani okna
        * @returns
        */
        closing(): JQueryPromise<any>;
        /**
         * Definice dashboardu
         */
        private defineDashBoard;
        private openIISSPInbox;
        /**
         * registrace handleru pro archivace knih
         *
         * */
        private SaldokontoSeznamZapisuHandler;
        /**
         * registrace handleru pro archivace knih
         *
         * */
        private VytvoritDavkuHandler;
        private showScheduledEventList;
        /** Otestovani konkurenceschopnosti generovani sestavy vs async task */
        private runTestAsyncTask;
        /**
         * Zobrazeni prim. dokladu
         * @param ixp
         */
        protected showPrimDoklad(ixp: string): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GDetailPozadavkuOptionsDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**DTO vstupu pro GDetailPozadavkuControl*/
	interface GDetailPozadavkuOptionsDto {
        /**IxsSes*/
		ixsSes?: string|null;
        /**Formular je readonly*/
		readOnly?: boolean|null;
        /**Je povolene zmenit obdobi?*/
		allowChangeObd?: boolean|null;
        /**Cislo odlozeneho pozdavku (por_cis_kud)*/
		porCisKud?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GEkoFilterDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**Filtr pro dvou-radkovy filtr nad gridem*/
	interface GEkoFilterDto extends Gordic.Eko.Interface.GCfuTopoFilterDto {
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
		/**ROK DPH*/
		rok_uej?: GIntervalDto<number>|null;
		/**Mesic DPH*/
		mesic_uej?: GIntervalDto<number>|null;
		/**ZD*/
		zd?: GIntervalDto<number>|null;
		/**PID*/
		ixp?: Gordic.Ucr.WebClient.GEkoFilterDto.GEkoIxpFilterDto|null;
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
		/**generated*/
		te5?: GIntervalDto<string>|null;
		/**generated*/
		te6?: GIntervalDto<string>|null;
		/**generated*/
		te7?: GIntervalDto<string>|null;
		/**generated*/
		te8?: GIntervalDto<string>|null;
		/**generated*/
		te9?: GIntervalDto<string>|null;
	}
	const enum GEkoFilterDtoNames { drd_msk = "drd_msk", rok = "rok", mesic = "mesic", den = "den", ac = "ac", pdok = "pdok", popis = "popis", c0 = "c0", c1 = "c1", c2 = "c2", c0c1 = "c0c1", c0_as = "c0_as", c1_as = "c1_as", c0c1_as = "c0c1_as", c_navrh = "c_navrh", c_sl = "c_sl", c_cerpani_rs = "c_cerpani_rs", c_ru = "c_ru", c_cerpani_ru = "c_cerpani_ru", c_14 = "c_14", c_mrz = "c_mrz", c_act = "c_act", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_obj_blk = "c_obj_blk", c_fak = "c_fak", c_rsm = "c_rsm", c_disp = "c_disp", c_uct = "c_uct", druh_char = "druh_char", priz_char = "priz_char", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", ixp = "ixp", ixp_prim = "ixp_prim", ac_ag = "ac_ag", dat_zmena = "dat_zmena", typ_ag = "typ_ag", esu_txt = "esu_txt", esu_ico = "esu_ico", esu_rc = "esu_rc", id_hdr_ris = "id_hdr_ris", ixs_msk = "ixs_msk", nazev_rf = "nazev_rf", kc0 = "kc0", kc1 = "kc1", kc2 = "kc2", nazev = "nazev", radek = "radek", sc0 = "sc0", sc1 = "sc1", sc2 = "sc2", sc3 = "sc3", sc4 = "sc4", sc5 = "sc5", sc6 = "sc6", sc7 = "sc7", sc8 = "sc8", sc9 = "sc9", radek_hdr = "radek_hdr", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", cfu = "cfu",}
	const enum GEkoFilterDtoFragments { drd_msk = "*", rok = "*", mesic = "*", den = "*", ac = "*", pdok = "*", popis = "*", c0 = "*", c1 = "*", c2 = "*", c0c1 = "*", c0_as = "*", c1_as = "*", c0c1_as = "*", c_navrh = "*", c_sl = "*", c_cerpani_rs = "*", c_ru = "*", c_cerpani_ru = "*", c_14 = "*", c_mrz = "*", c_act = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_obj_blk = "*", c_fak = "*", c_rsm = "*", c_disp = "*", c_uct = "*", druh_char = "*", priz_char = "*", rok_uej = "*", mesic_uej = "*", zd = "*", ixp = "*", ixp_prim = "*", ac_ag = "*", dat_zmena = "*", typ_ag = "*", esu_txt = "*", esu_ico = "*", esu_rc = "*", id_hdr_ris = "*", ixs_msk = "*", nazev_rf = "*", kc0 = "*", kc1 = "*", kc2 = "*", nazev = "*", radek = "*", sc0 = "*", sc1 = "*", sc2 = "*", sc3 = "*", sc4 = "*", sc5 = "*", sc6 = "*", sc7 = "*", sc8 = "*", sc9 = "*", radek_hdr = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", ico = "*", ucs = "*", uus = "*", nks = "*", cfu = "*",}
	const enum GEkoFilterDtoTypes { drd_msk = "string", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", ac = "GIntervalDto<string>", pdok = "string", popis = "string", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", c2 = "GIntervalDto<JsonDecimal>", c0c1 = "GIntervalDto<JsonDecimal>", c0_as = "GIntervalDto<JsonDecimal>", c1_as = "GIntervalDto<JsonDecimal>", c0c1_as = "GIntervalDto<JsonDecimal>", c_navrh = "GIntervalDto<JsonDecimal>", c_sl = "GIntervalDto<JsonDecimal>", c_cerpani_rs = "GIntervalDto<JsonDecimal>", c_ru = "GIntervalDto<JsonDecimal>", c_cerpani_ru = "GIntervalDto<JsonDecimal>", c_14 = "GIntervalDto<JsonDecimal>", c_mrz = "GIntervalDto<JsonDecimal>", c_act = "GIntervalDto<JsonDecimal>", c_vz = "GIntervalDto<JsonDecimal>", c_sml = "GIntervalDto<JsonDecimal>", c_vz_sml = "GIntervalDto<JsonDecimal>", c_obj = "GIntervalDto<JsonDecimal>", c_obj_sml = "GIntervalDto<JsonDecimal>", c_obj_blk = "GIntervalDto<JsonDecimal>", c_fak = "GIntervalDto<JsonDecimal>", c_rsm = "GIntervalDto<JsonDecimal>", c_disp = "GIntervalDto<JsonDecimal>", c_uct = "GIntervalDto<JsonDecimal>", druh_char = "GIntervalDto<number>", priz_char = "GIntervalDto<number>", rok_uej = "GIntervalDto<number>", mesic_uej = "GIntervalDto<number>", zd = "GIntervalDto<number>", ixp = "Gordic.Ucr.WebClient.GEkoFilterDto.GEkoIxpFilterDto", ixp_prim = "string", ac_ag = "GIntervalDto<string>", dat_zmena = "GIntervalDto<JsonDate>", typ_ag = "number", esu_txt = "string", esu_ico = "string", esu_rc = "string", id_hdr_ris = "GIntervalDto<string>", ixs_msk = "string", nazev_rf = "string", kc0 = "GIntervalDto<JsonDecimal>", kc1 = "GIntervalDto<JsonDecimal>", kc2 = "GIntervalDto<JsonDecimal>", nazev = "string", radek = "number", sc0 = "GIntervalDto<JsonDecimal>", sc1 = "GIntervalDto<JsonDecimal>", sc2 = "GIntervalDto<JsonDecimal>", sc3 = "GIntervalDto<JsonDecimal>", sc4 = "GIntervalDto<JsonDecimal>", sc5 = "GIntervalDto<JsonDecimal>", sc6 = "GIntervalDto<JsonDecimal>", sc7 = "GIntervalDto<JsonDecimal>", sc8 = "GIntervalDto<JsonDecimal>", sc9 = "GIntervalDto<JsonDecimal>", radek_hdr = "GIntervalDto<number>", te0 = "GIntervalDto<string>", te1 = "GIntervalDto<string>", te2 = "GIntervalDto<string>", te3 = "GIntervalDto<string>", te4 = "GIntervalDto<string>", te5 = "GIntervalDto<string>", te6 = "GIntervalDto<string>", te7 = "GIntervalDto<string>", te8 = "GIntervalDto<string>", te9 = "GIntervalDto<string>", ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GEkoFilterDtoTypeLengths {}
}
declare namespace Gordic.Ucr.WebClient.GEkoFilterDto {
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
declare namespace Gordic.Ucr.WebClient {
	/**DTO elementu*/
	interface GEkoElementsDto {
		/**Jednotlive elementy*/
		filters?: Gordic.Uct.Interface.GUcrFilterDto[]|null;
	}
	const enum GEkoElementsDtoNames { filters = "filters",}
	const enum GEkoElementsDtoFragments { filters = "*",}
	const enum GEkoElementsDtoTypes { filters = "Gordic.Uct.Interface.GUcrFilterDto[]",}
	const enum GEkoElementsDtoTypeLengths {}
	/**DTO UCR masky*/
	interface GUcrMaskaDto extends Gordic.Gin.Interface.GSeznamMasekDto {
		/**platnost_od*/
		platnost_od?: JsonDate|null;
		/**platnost_do*/
		platnost_do?: JsonDate|null;
		/**zkratka*/
		zkratka?: string|null;
		/**typSestavy*/
		typSestavy?: Gordic.Uct.Interface.GUcrTypSestavy|null;
		/**Elementy*/
		elementy?: Gordic.Ucr.WebClient.GEkoElementsDto|null;
	}
	const enum GUcrMaskaDtoNames { platnost_od = "platnost_od", platnost_do = "platnost_do", zkratka = "zkratka", typSestavy = "typSestavy", elementy = "elementy", ixs_mas = "ixs_mas", gfilterpanel_name = "gfilterpanel_name", tema = "tema", typ_masky = "typ_masky", typ_masky_txt = "typ_masky_txt", gfilterpanel_poznamka = "gfilterpanel_poznamka", gfilterpanel_dat_zmena = "gfilterpanel_dat_zmena", gfilterpanel_zmenu_prov = "gfilterpanel_zmenu_prov", gfilterpanel_zmenu_prov_txt = "gfilterpanel_zmenu_prov_txt", gfilterpanel_aktivita = "gfilterpanel_aktivita", dataInFilter = "dataInFilter", dataInFilterString = "dataInFilterString",}
	const enum GUcrMaskaDtoFragments { platnost_od = "*", platnost_do = "*", zkratka = "*", typSestavy = "*", elementy = "*", ixs_mas = "*", gfilterpanel_name = "*", tema = "*", typ_masky = "*", typ_masky_txt = "*", gfilterpanel_poznamka = "*", gfilterpanel_dat_zmena = "*", gfilterpanel_zmenu_prov = "*", gfilterpanel_zmenu_prov_txt = "*", gfilterpanel_aktivita = "*", dataInFilter = "*", dataInFilterString = "*",}
	const enum GUcrMaskaDtoTypes { platnost_od = "JsonDate", platnost_do = "JsonDate", zkratka = "string", typSestavy = "Gordic.Uct.Interface.GUcrTypSestavy", elementy = "Gordic.Ucr.WebClient.GEkoElementsDto", ixs_mas = "string", gfilterpanel_name = "string", tema = "string", typ_masky = "Gordic.Gin.Interface.TypMaskyEnum", typ_masky_txt = "string", gfilterpanel_poznamka = "string", gfilterpanel_dat_zmena = "JsonDate", gfilterpanel_zmenu_prov = "string", gfilterpanel_zmenu_prov_txt = "string", gfilterpanel_aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dataInFilter = "Newtonsoft.Json.Linq.JObject", dataInFilterString = "string",}
	const enum GUcrMaskaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GEkoParamsDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO obs. podmnozinu UserProcess.EkoParams*/
	interface GEkoParamsDto {
		/**Příznak zda organizace v daném roce komunikuje se systémem Státní pokladny (IISSP)*/
		PrizIissp?: number|null;
		/**Ixs rozvrhu*/
		IxsRoz?: string|null;
		/**IČ*/
		Ico?: string|null;
		/**UCS*/
		Ucs?: string|null;
		/**NKS*/
		Nks?: string|null;
		/**Příznak odděleného sledování příjmů a výdajů (od 360) (0=nesledovat, 1=sledovat)*/
		PrizNpv?: number|null;
		/**Rok*/
		Rok?: number|null;
		/**Povolení pořizovaní alfanumerickych znaku ve slovech účetní věty*/
		CheckUete?: number|null;
	}
	const enum GEkoParamsDtoNames { PrizIissp = "PrizIissp", IxsRoz = "IxsRoz", Ico = "Ico", Ucs = "Ucs", Nks = "Nks", PrizNpv = "PrizNpv", Rok = "Rok", CheckUete = "CheckUete",}
	const enum GEkoParamsDtoFragments { PrizIissp = "*", IxsRoz = "*", Ico = "*", Ucs = "*", Nks = "*", PrizNpv = "*", Rok = "*", CheckUete = "*",}
	const enum GEkoParamsDtoTypes { PrizIissp = "number", IxsRoz = "string", Ico = "string", Ucs = "string", Nks = "string", PrizNpv = "number", Rok = "number", CheckUete = "number",}
	const enum GEkoParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GFilterOptionsDtoNG.d.ts 

declare namespace Gordic.Ucr.WebClient.Dto {
    export interface GFilterOptionsDto {
        /**UCS*/
        ucs: Gordic.Eko.WebClient.GFilterOptionDto;
        /**UUS*/
        uus: Gordic.Eko.WebClient.GFilterOptionUusDto;
        /**NKS*/
        nks: Gordic.Eko.WebClient.GFilterOptionDto;
        /**DRD*/
        drd: Gordic.Eko.WebClient.GFilterOptionDrdDto;
        /**AC*/
        ac: Gordic.Eko.WebClient.GFilterOptionAcDto;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GFilterParamsDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**Parametry filtru (pro elementy)*/
	interface GFilterParamsDto {
        /**Typ ulohy*/
		typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        /**ShowUct*/
		showUct: boolean;
        /**ShowRoz*/
		showRoz: boolean;
        /**ShowOst*/
		showOst: boolean;
        /**UctOnly*/
		uctOnly: boolean;
        /**RozOnly*/
		rozOnly: boolean;
        /**PrizIissp*/
		prizIissp: boolean;
        /**IxsRoz*/
		ixsRoz?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GMaskaFilterDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**Filtr UCR masek*/
	interface GMaskaFilterDto {
        /**aktivita*/
		aktivita?: number|null;
        /**typ_masky*/
		typ_masky?: number|null;
        /**ktg_msk*/
		typSestavy?: number | null;

	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GPopisDokladuDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**Dto s popisem radku*/
	interface GPopisDokladuDto {
        /**PopisDokladu*/
		popis?: string|null;
        /**Radek*/
		grafickyPopis?: Gordic.Ucr.WebClient.GStavRadkuValDto[]|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GRegistrIDDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO identifikatoru detailu registru P/Z*/
	interface GRegistrIDDto {
		/**Zkratka agendy*/
		zkr_ag?: string|null;
		/**Prim. doklad*/
		ixp?: string|null;
		/**Ucetni identifikator*/
		uex_reg?: string|null;
		/**Typ kategorie*/
		kat?: number|null;
		/**Kategorie - text*/
		kat_txt?: string|null;
		/**su*/
		uea?: string|null;
		/**au*/
		ueb?: string|null;
		/**Mesic*/
		mesic?: number|null;
		/**Radek*/
		row?: Gordic.Eko.Interface.GRegistrZPDto|null;
		/**Definice sloupcu*/
		Columns?: Gordic.Uct.Interface.GUcrDefSloupceDto[]|null;
	}
	const enum GRegistrIDDtoNames { zkr_ag = "zkr_ag", ixp = "ixp", uex_reg = "uex_reg", kat = "kat", kat_txt = "kat_txt", uea = "uea", ueb = "ueb", mesic = "mesic", row = "row", Columns = "Columns",}
	const enum GRegistrIDDtoFragments { zkr_ag = "*", ixp = "*", uex_reg = "*", kat = "*", kat_txt = "*", uea = "*", ueb = "*", mesic = "*", row = "*", Columns = "*",}
	const enum GRegistrIDDtoTypes { zkr_ag = "string", ixp = "string", uex_reg = "string", kat = "number", kat_txt = "string", uea = "string", ueb = "string", mesic = "number", row = "Gordic.Eko.Interface.GRegistrZPDto", Columns = "Gordic.Uct.Interface.GUcrDefSloupceDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GSeznamEkoZaznamuGetDataFilterDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**Filtr pro nacteni dat v GSeznamEkoZaznamu.GetData()*/
	interface GSeznamEkoZaznamuGetDataFilterDto {
		/**Filtr*/
		filter?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Elementy*/
		filters?: Gordic.Uct.Interface.GEkoElementsDto|null;
		/**Elementy*/
		elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
		/**Strukturovany popis*/
		filterStrPopis?: Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]|null;
		/**Ma se vyhodit vyjimka, pokud je pocet zaznamu vetsi nez nastavena hodnota?*/
		skipSumLimit?: boolean|null;
		/**Ma se k zaznamum pridat data str. popisu?*/
		strPopisKeys?: string[]|null;
		/**Popis dokladu*/
		popisDokladu?: boolean|null;
		/**Pouziti NS*/
		useNS?: boolean|null;
		/**Pouziti ORJ*/
		useORJ?: boolean|null;
		/**Pouziti ORG*/
		useORG?: boolean|null;
		/**Radek*/
		RadekStavu?: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto|null;
	}
	const enum GSeznamEkoZaznamuGetDataFilterDtoNames { filter = "filter", filters = "filters", elementy = "elementy", filterStrPopis = "filterStrPopis", skipSumLimit = "skipSumLimit", strPopisKeys = "strPopisKeys", popisDokladu = "popisDokladu", useNS = "useNS", useORJ = "useORJ", useORG = "useORG", RadekStavu = "RadekStavu",}
	const enum GSeznamEkoZaznamuGetDataFilterDtoFragments { filter = "*", filters = "*", elementy = "*", filterStrPopis = "*", skipSumLimit = "*", strPopisKeys = "*", popisDokladu = "*", useNS = "*", useORJ = "*", useORG = "*", RadekStavu = "*",}
	const enum GSeznamEkoZaznamuGetDataFilterDtoTypes { filter = "Gordic.Uct.Interface.GUcrFilterDto", filters = "Gordic.Uct.Interface.GEkoElementsDto", elementy = "Gordic.Uct.Interface.GEkoElementsDto", filterStrPopis = "Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]", skipSumLimit = "boolean", strPopisKeys = "string[]", popisDokladu = "boolean", useNS = "boolean", useORJ = "boolean", useORG = "boolean", RadekStavu = "Gordic.Uct.Interface.GUctSeznamZapisuStavuDto",}
	const enum GSeznamEkoZaznamuGetDataFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GSeznamPozadavkuDto.d.ts 

declare namespace Gordic.Ucr.WebClient.Dto {
    /**DTO seznamu pozadavku*/
    interface GSeznamPozadavkuDto {
        /**ID pozadavku*/
        ixs_ses?: string|null;
        /**Nazev pozadavku*/
        nazev?: string|null;
        /**Sestava*/
        id_ses_alv?: string|null;
        /**Nazev sestavy*/
        nazev_alv?: string|null;
        /**Nazev formatu*/
        nazev_frm?: string|null;
        /**Rok*/
        rok?: number|null;
        /**Mesic*/
        mesic_comp?: string|null;
        /**Nazev masky*/
        msk_nazev?: string|null;
        /**ICO*/
        ico?: string|null;
        /**UCS*/
        ucs?: string|null;
        /**UUS*/
        uus?: string|null;
        /**NKS*/
        nks?: string|null;
        /**???*/
        sns_nazev?: string|null;
        /**Poznamka*/
        poznamka?: string|null;
        /**Datum zmeny*/
        dat_zmena?: JsonDate|null;
        /**Ixs funkcniho mista*/
        ixs_fun?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GSlovaRozvrhFilterDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO pro jeden filtr strukturovaneho popisu*/
	interface GSlovaRozvrhFilterDto {
		/**klic*/
		klic?: string|null;
		/**klic_txt*/
		klic_txt?: string|null;
		/**hodnota*/
		hodnota?: string|null;
	}
	const enum GSlovaRozvrhFilterDtoNames { klic = "klic", klic_txt = "klic_txt", hodnota = "hodnota",}
	const enum GSlovaRozvrhFilterDtoFragments { klic = "*", klic_txt = "*", hodnota = "*",}
	const enum GSlovaRozvrhFilterDtoTypes { klic = "string", klic_txt = "string", hodnota = "string",}
	const enum GSlovaRozvrhFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GStavRadkuDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**DTO s detailem stavu radku*/
	interface GStavRadkuDto {
        /**DRD*/
		drd?: number|null;
        /**Obdobi*/
		denMesicRok?: string|null;
        /**Typ ulohy*/
		type?: Gordic.Uct.Interface.GProhlizeniUctTaskType|null;
        /**Popisek*/
		title?: string|null;
        /**Stavy*/
		stavy?: GStavRadkuValDto[]|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GStavRadkuValDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO se stavem radku*/
	interface GStavRadkuValDto {
		/**Nazev*/
		name?: string|null;
		/**nazev databazovaho sloupce*/
		colDBName?: string|null;
		ekoField?: boolean|null;
		canEdit?: boolean|null;
		/**Value 1*/
		val1?: object|null;
		/**Value 2*/
		val2?: object|null;
		/**JS datovy typ value 1*/
		val1Type?: string|null;
		/**JS datovy typ value 2*/
		val2Type?: string|null;
	}
	const enum GStavRadkuValDtoNames { name = "name", colDBName = "colDBName", ekoField = "ekoField", canEdit = "canEdit", val1 = "val1", val2 = "val2", val1Type = "val1Type", val2Type = "val2Type",}
	const enum GStavRadkuValDtoFragments { name = "*", colDBName = "*", ekoField = "*", canEdit = "*", val1 = "*", val2 = "*", val1Type = "*", val2Type = "*",}
	const enum GStavRadkuValDtoTypes { name = "string", colDBName = "string", ekoField = "boolean", canEdit = "boolean", val1 = "object", val2 = "object", val1Type = "string", val2Type = "string",}
	const enum GStavRadkuValDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GStrukturovanyPopisFilterDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**DTO pro jeden filtr strukturovaneho popisu*/
	interface GStrukturovanyPopisFilterDto {
        /**klic*/
		klic?: string|null;
        /**klic_txt*/
		klic_txt?: string|null;
        /**hodnota*/
		hodnota?: string|null;
	}
	const enum GStrukturovanyPopisFilterDtoNames { klic = "klic", klic_txt = "klic_txt", hodnota = "hodnota",}
	const enum GStrukturovanyPopisFilterDtoFragments { klic = "*", klic_txt = "*", hodnota = "*",}
	const enum GStrukturovanyPopisFilterDtoTypes { klic = "string", klic_txt = "string", hodnota = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcPrintParamDanPrizDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**Parametry pro tisk sestavy prodanova priznani*/
	interface GUcPrintParamDanPrizDto {
		/**Ucs*/
		Ucs?: string;
		/**Uus*/
		Uus?: string;
		/**Mesic dph*/
		MesicDPH?: number|null;
	}
	const enum GUcPrintParamDanPrizDtoNames { Ucs = "Ucs", Uus = "Uus", MesicDPH = "MesicDPH",}
	const enum GUcPrintParamDanPrizDtoFragments { Ucs = "*", Uus = "*", MesicDPH = "*",}
	const enum GUcPrintParamDanPrizDtoTypes { Ucs = "string", Uus = "string", MesicDPH = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcPrintParamRegistrDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**Parametry pro tisk sestavyregistr Z/P*/
	interface GUcPrintParamRegistrDto {
		/**Nepripravene*/
		Nepripravane?: boolean;
		/**Nezatridene*/
		Nezatridene?: boolean;
		/**uzivatelska hodnota*/
		UzivHodnota?: boolean;
		/**Mesic*/
		Mesic?: number|null;
		/**Maska*/
		Maska?: Gordic.Eko.Interface.GRegistrZPfilterDto|null;
	}
	const enum GUcPrintParamRegistrDtoNames { Nepripravane = "Nepripravane", Nezatridene = "Nezatridene", UzivHodnota = "UzivHodnota", Mesic = "Mesic", Maska = "Maska",}
	const enum GUcPrintParamRegistrDtoFragments { Nepripravane = "*", Nezatridene = "*", UzivHodnota = "*", Mesic = "*", Maska = "*",}
	const enum GUcPrintParamRegistrDtoTypes { Nepripravane = "boolean", Nezatridene = "boolean", UzivHodnota = "boolean", Mesic = "number", Maska = "Gordic.Eko.Interface.GRegistrZPfilterDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcrGlobalsDtoNG.d.ts 

declare namespace Gordic.Ucr.WebClient.Dto {
    export interface GUcrGlobalsDto {
        /**IxsFun akt. prihl. uzivatele*/
        ixs_fun: string;
        /**Datum, ke kterému se vztahuje platnost pevné masky*/
        PlatnostPM: string;
        /**Režim provozu*/
        RezimProvozu: Gordic.Uct.Interface.GUcrRezimProvozu;
        /**Maximální režim provozu*/
        MaxRezimProvozu: any;
        /**Typ sumarizace*/
        TypSumarizace: Gordic.Uct.Interface.GUcrTypSumarizace;
        /**predplnovani ucs*/
        PredplnUCS: any;
        /**predplnovani pristupu k NS*/
        PredplnPri: any;
        /**moznost nastaveni vlastniho zahlavi*/
        VlastniZahlavi: any;
        /**povoleni na ulozeni noveho pozadavku*/
        Rad_NovyPozadavek: any;
        /**povoleni na zruseni pozadavku*/
        Rad_ZrusPozadavek: any;
        /**povoleni na zruseni cizich pozadavku*/
        Rad_ZrusCiziPozadavek: any;
        /**povoleni na ulozeni nove masky*/
        Rad_NovaMaska: any;
        /**povoleni na zruseni masky*/
        Rad_ZrusMasku: any;
        /**odeslání sestavy generované mailem*/
        Rad_OdeslatMail: any;
        /**povolení prohlížení Financování*/
        Rad_Financovani: any;
        /**povolení prohlížení DPH*/
        Rad_Dph: any;
        /**povolení Registru P/Z*/
        Rad_Rzp: any;
        /**Povoleni menit hodnoty v registru P/Z*/
        RPZ_Povoleni_Menit_Hodnoty: any;
        /**Povoleni v registru P/Z zmenit prim. doklad*/
        RPZ_Povoleni_Menit_PRIM_DOKL: any;
        /**povolení Vykaznictvi DU*/
        Rad_Vdu: any;
        /**režim zpracování DPH*/
        Dph_Rezim: any;
        /**ŘP - Možnost mít prázdnou pevnou masku. Při false nezobrazí nic pokud nemá administovánu pevnou masku.*/
        Rad_DefaultSes: any;
        /**možnost nabídky subřad na F4 na polích ac*/
        Rad_NabidkaSubrad: any;
        /**možnost zobrazení rozdílu MD-Dal v prohlížení*/
        Rad_ZobrazMdDal: any;
        /**mazání cizích požadavků ODL*/
        Rad_ZrusCiziODL: any;
        /**editace cizích požadavků ODL*/
        Rad_EditCiziODL: any;
        /**povolení ODL*/
        Rad_ODLEnabled: any;
        /**Povoleni PAP kontrol a oprav*/
        Rad_Pap: any;
        /**Povoleni prepoctu stavu od zacatku roku*/
        Rad_PapRocniPrepocetStavu: any;
        /**Povoleni zauctovani pap zapisu*/
        Rad_PapPovoleniZauctovani: any;
        /**Atribut, zda kontrolovat strany v PAP*/
        Rad_PapKontrolovatStrany: any;
        /**Rezim zpracovani vykazu v PAP nastroji*/
        RezimZpracovaniPap: any;
        /**Rezim zatridovani analytik*/
        RezimZatridovani: any;
        /**Rezim vyrovnavani pripadu pap zapisy*/
        RezimVyrovnavaniPripadu: any;
        /**Filtrovani na tridy 7,8,9*/
        FiltrNaTridy789Pap: string;
        /**povolení RISRE*/
        Rad_Risre: any;
        /**povolení RISRE/PS dávky rezervací*/
        Rad_Risdrez: any;
        /**povolení RISRE/PS dávky rozpočtu*/
        Rad_Risdrop: any;
        /**povolení RISRE IISSP stavy rezervaci*/
        Rad_RisStav: any;
        /**povolení RISRE IISSP stavy rozpoctu a cerpani (Inbox)*/
        Rad_RisStrc: any;
        /**povolení RISRE IISSP stavy skutecnosti (Inbox)*/
        Rad_RisStsk: any;
        /**povolení RISRE IISSP stavy skutecnosti (Inbox)*/
        Rad_RisVyka: any;
        /**způsob odeslání RISRE/PS*/
        Rad_RisOdes: any;
        /**povolení Konsolidace*/
        Rad_Konsolidace: any;
        /**povolení Ukazatele*/
        Rad_Ukazatele: any;
        /**povolení Ukazatele VLZR*/
        Rad_UkazateleVL: any;
        /**nastavení prace s WFL*/
        TypPraceWfl: any;
        /**nastavení prace s ESU*/
        TypPraceESU: any;
        /**možnost zobrazeni RČ*/
        Rad_Esu_RcZobr: boolean;
        /**možnost vyhledávání RČ*/
        Rad_Esu_RcVyhl: boolean;
        /**Délka AC pro UCT*/
        DelkaAcUct: number;
        /**Délka AC pro ROZ*/
        DelkaAcRoz: number;
        /**Max(DelkaAcUct, DelkaAcRoz)*/
        DelkaAcMax: number;
        /**Příznak, zda je aktuální období (EkoParams.Rok) otevřené (aktivita 100)*/
        OtevreneObdobi: any;
        /**Priznak externi sumarizace*/
        ExterniSumarizace: any;
        /** Rezim nacitani dat v uloze financovani */
        RezimZobrazeniUlohyFinancovani: GUcrRezimZobrazeniFinancovani;
        PevnaMaskaName: string;
        /*
        povolení zobrazeni cerpani RU, RS v procentech
        */
        ZobrazeniCerpaniRozpoctuVProcentech: boolean;
        /// <summary>
        /// UCR - Saldokonto sloupec 1. úrovně
        /// </summary>
        SaldokontoParam1: string;
        /// <summary>
        /// UCR - Saldokonto sloupec 1. úrovně
        /// </summary>
        SaldokontoParam2: string;
    }

    //Gordic.Uct.Interface.GUcrRezimZobrazeniFinancovani
    const enum GUcrRezimZobrazeniFinancovani {
        /** Pouze financování */
        PouzeFinancovani = 0,
        
        /** Financování se střednědobým výhledem (drd 9 a 69) */
        FinancovaniSeStrednedobymVyhledem = 1
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcrResultReloadDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**Platnost*/
	interface GUcrResultReloadDto {
		seznam?: object|null;
		platnost?: Gordic.Uct.Interface.GUcrPlatnostDto|null;
	}
	const enum GUcrResultReloadDtoNames { seznam = "seznam", platnost = "platnost",}
	const enum GUcrResultReloadDtoFragments { seznam = "*", platnost = "*",}
	const enum GUcrResultReloadDtoTypes { seznam = "object", platnost = "Gordic.Uct.Interface.GUcrPlatnostDto",}
	const enum GUcrResultReloadDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcrTreeDoplnUdajeDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO obs. podmnozinu UserProcess.EkoParams*/
	interface GUcrTreeDoplnUdajeDto {
		kod?: string|null;
		vykaz?: string|null;
		pozn?: string|null;
		/**Id*/
		id?: string|null;
		/**ParentId*/
		parentId?: string|null;
		mainId?: string|null;
		level?: number|null;
		delka_du?: number|null;
		priz_opak?: number|null;
		delka_vaz?: number|null;
		nazev_vaz?: string|null;
		poznamka_vaz?: string|null;
		pattern_du?: string|null;
		pattern_vaz?: string|null;
		delka_vaz2?: number|null;
		nazev_vaz2?: string|null;
		poznamka_vaz2?: string|null;
		pattern_vaz2?: string|null;
	}
	const enum GUcrTreeDoplnUdajeDtoNames { kod = "kod", vykaz = "vykaz", pozn = "pozn", id = "id", parentId = "parentId", mainId = "mainId", level = "level", delka_du = "delka_du", priz_opak = "priz_opak", delka_vaz = "delka_vaz", nazev_vaz = "nazev_vaz", poznamka_vaz = "poznamka_vaz", pattern_du = "pattern_du", pattern_vaz = "pattern_vaz", delka_vaz2 = "delka_vaz2", nazev_vaz2 = "nazev_vaz2", poznamka_vaz2 = "poznamka_vaz2", pattern_vaz2 = "pattern_vaz2",}
	const enum GUcrTreeDoplnUdajeDtoFragments { kod = "*", vykaz = "*", pozn = "*", id = "*", parentId = "*", mainId = "*", level = "*", delka_du = "*", priz_opak = "*", delka_vaz = "*", nazev_vaz = "*", poznamka_vaz = "*", pattern_du = "*", pattern_vaz = "*", delka_vaz2 = "*", nazev_vaz2 = "*", poznamka_vaz2 = "*", pattern_vaz2 = "*",}
	const enum GUcrTreeDoplnUdajeDtoTypes { kod = "string", vykaz = "string", pozn = "string", id = "string", parentId = "string", mainId = "string", level = "number", delka_du = "number", priz_opak = "number", delka_vaz = "number", nazev_vaz = "string", poznamka_vaz = "string", pattern_du = "string", pattern_vaz = "string", delka_vaz2 = "number", nazev_vaz2 = "string", poznamka_vaz2 = "string", pattern_vaz2 = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcrTreeUschovnaDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO obs. podmnozinu UserProcess.EkoParams*/
	interface GUcrTreeUschovnaDto {
		/**Kategodie dokumentu*/
		kategorie?: string|null;
		/**Typ*/
		typ?: string|null;
		soubor?: string|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Kategorie dokumentu*/
		ktg_typ?: number|null;
		/**Id*/
		primaryKey?: string|null;
		/**ParentId*/
		parentId?: string|null;
		mainId?: string|null;
		level?: number|null;
	}
	const enum GUcrTreeUschovnaDtoNames { kategorie = "kategorie", typ = "typ", soubor = "soubor", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", primaryKey = "primaryKey", parentId = "parentId", mainId = "mainId", level = "level",}
	const enum GUcrTreeUschovnaDtoFragments { kategorie = "*", typ = "*", soubor = "*", ixs_typ = "*", ktg_typ = "*", primaryKey = "*", parentId = "*", mainId = "*", level = "*",}
	const enum GUcrTreeUschovnaDtoTypes { kategorie = "string", typ = "string", soubor = "string", ixs_typ = "string", ktg_typ = "number", primaryKey = "string", parentId = "string", mainId = "string", level = "number",}
	const enum GUcrTreeUschovnaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcrTxtDto.d.ts 

declare namespace Gordic.Ucr.WebClient.Dto {
    /**Cele nazvy*/
	interface GUcrTxtDto {
        /**Nks*/
		Nks?: string;
        /**Ucs*/
		Ucs?: string;
        /**Uus*/
		Uus?: string;
        /**Ico*/
		Ico: string;
	}
	const enum GUcrTxtDtoNames { Nks = "Nks", Ucs = "Ucs", Uus = "Uus", Ico = "Ico",}
	const enum GUcrTxtDtoFragments { Nks = "*", Ucs = "*", Uus = "*", Ico = "*",}
	const enum GUcrTxtDtoTypes { Nks = "string", Ucs = "string", Uus = "string", Ico = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GUcrZkrDto.d.ts 

declare namespace Gordic.Ucr.WebClient.Dto {
    /**ReadOnly DTO se zkratkami*/
	interface GUcrZkrDto {
        /**Nks*/
		Nks?: string;
        /**Ucs*/
		Ucs?: string;
        /**Uus*/
		Uus?: string;
        /**Ico*/
		Ico: string;
	}
	const enum GUcrZkrDtoNames { Nks = "Nks", Ucs = "Ucs", Uus = "Uus", Ico = "Ico",}
	const enum GUcrZkrDtoFragments { Nks = "*", Ucs = "*", Uus = "*", Ico = "*",}
	const enum GUcrZkrDtoTypes { Nks = "string", Ucs = "string", Uus = "string", Ico = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Dto\GZapisRadkuDto.d.ts 

declare namespace Gordic.Ucr.WebClient {
	/**DTO s detailem zapisu radku*/
	interface GZapisRadkuDto extends Gordic.Ucr.WebClient.GStavRadkuDto {
		/**Zkratka agendy*/
		zkrAg?: string|null;
		/**Agendove cislo*/
		ac?: string|null;
		/**IXP*/
		ixp?: string|null;
		/**Typ*/
		ixs_typ?: string|null;
		/**AC*/
		akt_znacka?: string|null;
		/**Popis*/
		popis?: Gordic.Ucr.WebClient.GPopisDokladuDto|null;
	}
	const enum GZapisRadkuDtoNames { zkrAg = "zkrAg", ac = "ac", ixp = "ixp", ixs_typ = "ixs_typ", akt_znacka = "akt_znacka", popis = "popis", drd = "drd", denMesicRok = "denMesicRok", type = "type", title = "title", stavy = "stavy",}
	const enum GZapisRadkuDtoFragments { zkrAg = "*", ac = "*", ixp = "*", ixs_typ = "*", akt_znacka = "*", popis = "*", drd = "*", denMesicRok = "*", type = "*", title = "*", stavy = "*",}
	const enum GZapisRadkuDtoTypes { zkrAg = "string", ac = "string", ixp = "string", ixs_typ = "string", akt_znacka = "string", popis = "Gordic.Ucr.WebClient.GPopisDokladuDto", drd = "number", denMesicRok = "string", type = "Gordic.Uct.Interface.GProhlizeniUctTaskType", title = "string", stavy = "Gordic.Ucr.WebClient.GStavRadkuValDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\GEkoGlobals.d.ts 

declare namespace Gordic.Ucr.Globals {
    const GUcrGlobals: Gordic.Uct.Interface.GUcrParamsDto;
    const GZkr: Gordic.Ucr.WebClient.Dto.GUcrZkrDto;
    const GTxt: Gordic.Ucr.WebClient.Dto.GUcrZkrDto;
    const StrPopis: Gordic.Ucr.WebClient.GStrukturovanyPopisFilterDto[];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\GElementUtils.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface GElementsOptions {
        typSestavy: Gordic.Uct.Interface.GUcrTypSestavy;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        globals: Gordic.Uct.Interface.GUcrParamsDto;
        filterParams: Gordic.Ucr.WebClient.GFilterParamsDto;
        cfuSet: Gordic.Data.GridFormat;
        ekoParams: Gordic.Ucr.WebClient.GEkoParamsDto;
    }
    class GElementUtils {
        static createElementsGridFormat(options: GElementsOptions): Gordic.Data.GridFormat<GEkoFilterDto>;
        static createNewElementFunc(rp: Gordic.Uct.Interface.GUcrRezimProvozu, ekoParams: GEkoParamsDto): Gordic.Eko.Prefabs.CreateElementRecord<Gordic.Eko.Prefabs.IGCfuDto>;
        static createClearElementFunc(rp: Gordic.Uct.Interface.GUcrRezimProvozu): Gordic.Eko.Prefabs.ClearElementRecord<Gordic.Eko.Prefabs.IGCfuDto>;
        /** Zjisti, ktere sloupce gridFormatu nemaji byt viditelne na zastupne hodnote elementoveho policka */
        static getElementValueSkipColumns(rp: Gordic.Uct.Interface.GUcrRezimProvozu): string[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\GFilterPrefabsTs.d.ts 

declare namespace Gordic.Ucr.WebClient.FilterPrefabs {
    interface IGFilterOptionEsu extends Gordic.Eko.WebClient.GFilterLabeledOptionDto {
        /** interni ulozeni ixs_esu na modelu */
        ixs_esuPath: string;
    }
    interface IGFilterOptionEsuRc extends IGFilterOptionEsu {
        /** Moznost vyhledavani RC */
        Rad_Esu_RcVyhl: boolean;
    }
    interface IGFilterOptionTypAg extends Gordic.Eko.WebClient.GFilterLabeledOptionDto {
        isRozpocet: boolean;
        zkr_agPath: string;
    }
    interface IGFilterOptionTypUctu extends Gordic.Eko.WebClient.GFilterLabeledOptionDto {
        txt_name: string;
    }
    function esu_txt(options: IGFilterOptionEsu): Gordic.Eko.Filters.ServerFilterOptions;
    function esu_ixs(options: IGFilterOptionEsu): Eko.Filters.ServerFilterOptions;
    function esu_ico(options: IGFilterOptionEsu): Eko.Filters.ServerFilterOptions;
    function esu_rc(options: IGFilterOptionEsuRc): Eko.Filters.ServerFilterOptions;
    /** Typ agendy, model lze mapovat na Gordic.Data.Readers.GinctagDto */
    function s_vyriz_rezsp(options: Gordic.Eko.WebClient.GFilterLabeledOptionDto): Gordic.Eko.Filters.ServerFilterOptions;
    /** Typ agendy, model lze mapovat na Gordic.Data.Readers.GinctagDto */
    function typ_ag(options: IGFilterOptionTypAg): Gordic.Eko.Filters.ServerFilterOptions;
    /** Druh  GReaderEkocdch  */
    function druh_char(options: IGFilterOptionTypUctu): Gordic.Eko.Filters.ServerFilterOptions;
    /** Charakter GReaderEkocpch */
    function priz_char(options: IGFilterOptionTypUctu): Gordic.Eko.Filters.ServerFilterOptions;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\GridFormatExtensions.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GUcrStavRadkuGridFormat extends Gordic.Data.GridFormat<GStavRadkuValDto> {
        addStavRadkuCol(column: GGridColumn, valPropName: string, typePropName: string): GUcrStavRadkuGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\GUcrMaskaDetail.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface IGUcrMaskaDetailOptions {
        maska?: GUcrMaskaDto;
        serviceOptions: GUcrMaskaServiceOptions;
        elementFormat: Gordic.Data.GridFormat<GEkoFilterDto>;
        checkUete?: number | null;
    }
    class GUcrMaskaDetail extends GContentBase implements IGClientContent {
        private options;
        private saveAct;
        private srv;
        private form;
        uid: string;
        prepareContent(options: IGUcrMaskaDetailOptions): void;
        private save;
        private loadData;
        /** Formular detailu filtru (!pozor! musi sedet s policky, ktere jsou soucasti filterpanelu v GSeznamEkoZaznamuTS!) */
        static getForm(elementFormat: Gordic.Data.GridFormat<GEkoFilterDto>, o?: {
            checkUete?: number | undefined;
        }): Gordic.Forms.Form;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\GUcrMaskaService.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface GUcrMaskaServiceOptions extends Gordic.Gin.FilterStorageService.IGFilterStorageServiceOptions {
        parentContent: GContent;
        typSestavy?: Gordic.Uct.Interface.GUcrTypSestavy;
        typ_masky?: Gordic.Gin.Interface.TypMaskyEnum | number;
        aktivita?: number;
        fragments: string | null;
    }
    /**
     * Sluzba pro ukladani UCR masak
     *
     * @author bmartinek
     * @since 482.1.0.2
     */
    class GUcrMaskaService implements IGFilterStorageService {
        private options;
        private srv;
        private log;
        constructor(options: GUcrMaskaServiceOptions);
        set typSestavy(typSestavy: Gordic.Uct.Interface.GUcrTypSestavy | undefined);
        get typSestavy(): Gordic.Uct.Interface.GUcrTypSestavy | undefined;
        set typ_masky(typ_masky: number | undefined);
        get typ_masky(): number | undefined;
        set aktitiva(aktivita: number | undefined);
        get aktitiva(): number | undefined;
        getFilters(filter: GMaskaFilterDto): JQueryPromise<GUcrMaskaDto[]>;
        saveFilter(obj: {
            filter: GUcrMaskaDto;
        }): JQueryPromise<GUcrMaskaDto | GUcrMaskaDto[]>;
        removeFilter(obj: {
            filter: GUcrMaskaDto;
        }): JQueryPromise<GUcrMaskaDto[]>;
        saveFilterOnly(obj: {
            filter: GUcrMaskaDto;
        }): JQueryPromise<GUcrMaskaDto>;
        read(ixs_mas: string): JQueryPromise<GUcrMaskaDto>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\slovaRozvrhuFilter.prefab.d.ts 

declare namespace Gordic.Ucr.WebClient.Prefabs {
    interface ISlovaRozvrhuFilterOptions extends GSelectBoxOptions<GSlovaRozvrhFilterDto[]> {
    }
    interface GSlovaRozvrhuFilterOptions {
        data: GSlovaRozvrhFilterDto[];
        id?: string;
        /** V gridu lze vybirat jednotlive hodnoty */
        selectable?: boolean;
        /** V pripade, ze je editable=true, vybrane radky v gridu oznaci */
        selected?: GSlovaRozvrhFilterDto[];
    }
    interface GSlovaRozvrhuFilterSelectorOptionsOutput {
        data: GSlovaRozvrhFilterDto[];
        /** V pripade, ze byl selector v editovatelnem modu, sem hodi pole stringu s klici vybranych radku */
        selected?: GSlovaRozvrhFilterDto[];
    }
    function slovaRozvrhuFilter(options: ISlovaRozvrhuFilterOptions): GSelectBoxOptions<GSlovaRozvrhFilterDto[]>;
    class GSlovaRozvrhuFilterFilterSelector extends GContentBase implements IGClientContent {
        /**
         * trida gridu
         */
        protected classGrid: string;
        prepareContent(options: GSlovaRozvrhuFilterOptions): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        private getData;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\strukturovanyPopisFilter.prefab.d.ts 

declare namespace Gordic.Ucr.WebClient.Prefabs {
    interface IGStrukturovanyPopisFilterOptions extends GSelectBoxOptions<GStrukturovanyPopisFilterDto[]> {
    }
    interface GStrukturovanyPopisFilterSelectorOptions {
        data: GStrukturovanyPopisFilterDto[];
        id?: string;
        /** V gridu lze vybirat jednotlive hodnoty */
        selectable?: boolean;
        /** V pripade, ze je editable=true, vybrane radky v gridu oznaci */
        selected?: string[];
    }
    interface GStrukturovanyPopisFilterSelectorOptionsOutput {
        data: GStrukturovanyPopisFilterDto[];
        /** V pripade, ze byl selector v editovatelnem modu, sem hodi pole stringu s klici vybranych radku */
        selected?: string[];
    }
    function strukturovanyPopisFilter(options: IGStrukturovanyPopisFilterOptions): GSelectBoxOptions<GStrukturovanyPopisFilterDto[]>;
    class GStrukturovanyPopisFilterSelector extends GContentBase implements IGClientContent {
        /**
         * trida gridu
         */
        protected classGrid: string;
        prepareContent(options: GStrukturovanyPopisFilterSelectorOptions): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        private getData;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GDashboardControl.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GDashboardControl extends GContentBase {
        static uid: string;
        prepareContent(options: {
            rok: string;
        }): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GDetailStavZapisRadku.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface IGDetailStavZapisRadkuOptions {
        typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        gridFormat: Gordic.Data.GridFormat<Uct.Interface.GSeznamZapisuStavuDto>;
        globals?: Gordic.Uct.Interface.GUcrParamsDto;
        filter: GEkoFilterDto;
        row: Uct.Interface.GSeznamZapisuStavuDto;
        viewMode: IGDetailStavZapisDisplayMode;
        /** Docasne nastaveni tabu, neuklada se do UserSettings */
        tabSettings?: IGDetailStavZapisRadkuTabSettings;
        cfuSetSorted: Gui.WebApp.GGridFormatDto;
    }
    type IGDetailStavZapisDisplayMode = "full" | "preview";
    interface IGDetailStavZapisRadkuTabSettings {
        dokladOpened: boolean;
        detailOpened: boolean;
        popisOpened: boolean;
        souvisejiciOpened: boolean;
    }
    class GDetailStavZapisRadku extends GContentBase implements IGClientContent {
        uid: string;
        private options;
        private $zapisyTab;
        /**
         * trida gridu
         */
        protected classGrid: string;
        /**
         * trida gridu pro detail
         */
        protected classDetailGrid: string;
        /**
         * nactene zapisy radku
         */
        private zapisyRadu;
        private $popisTab;
        private tabSettings;
        userSettings: Gordic.Data.IGStorage;
        private editMode;
        valueChanged: boolean;
        private reloadZapisRadku;
        prepareContent(options: IGDetailStavZapisRadkuOptions): void;
        /**
         *
         * @param options
         */
        init(options: IGDetailStavZapisRadkuOptions): void;
        private srv;
        private getFormOptions;
        private initStavRadku;
        private initZapisRadku;
        /**
         *  Nastaveni akci
         */
        nastaveniAkci(): void;
        /***
         * Rezim oprav
         *
         */
        private startEditMode;
        /***
         * Zruseni rezimu oprav
         *
         */
        private cancelEditMode;
        /**
         * Ulozeni zmen na zapisu
         * @returns
         */
        private saveRecord;
        /**
         * Ulozeni zmen
         * @returns
         */
        private saveRecordSP;
        /**
         * Akce po ulozeni zapisu
         * @param savedRow
         * @param saveDateRowDto
         */
        private actioAfterSave;
        /**
         * Zjistini moznosti editace bunky
         * @returns
         */
        private isCanEdit;
        private initGrid;
        private initGridDoklad;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Vraci objekt gridu pro detail
         */
        protected getDetailGrid(): JQuery<HTMLElement> | null;
        private initPopis;
        private createPopis;
        private setStavRadku;
        private setZapisRadku;
        private createPreviewForm;
        private updateSettings;
        private loadGridDoklad;
        private closing;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GPopisRadkuControl.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface GPopisRadkuControlOptions {
        popis: GPopisDokladuDto;
    }
    class GPopisRadkuControl extends GContentBase implements IGClientContent {
        private options;
        prepareContent(options?: GPopisRadkuControlOptions): void;
        init(options: GPopisRadkuControlOptions): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GSeznamEkoZaznamuBase.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Predek sezanmu kontentu
     *
     * @author tkares
     * @since 484.1.0.69
    */
    class GSeznamEkoZaznamuBase implements IGSeznamEkoZaznamuBase {
        protected globalParams: Gordic.Uct.Interface.GUcrParamsDto;
        protected filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        protected Filter: GEkoFilterDto;
        protected ExterniSumarizace: boolean;
        protected CurrentRow: Gordic.Uct.Interface.GSeznamZapisuStavuDto;
        protected filterStrPopis?: GStrukturovanyPopisFilterDto[];
        protected addStrPopisColumns?: string[];
        protected Rows: Gordic.Uct.Interface.GSeznamZapisuStavuDto[];
        protected Radek_DPH: string;
        protected StrictFilter: boolean;
        protected AutoLoadData: boolean;
        protected Ecdd: string;
        protected Dic: string;
        protected Zapisova: boolean;
        protected debug: boolean;
        protected AvoidUus: boolean;
        protected AvoidNks: boolean;
        protected AvoidExt: boolean;
        protected Rozpocet: boolean;
        protected Ucetnictvi: boolean;
        protected typSestavy: Gordic.Uct.Interface.GUcrTypSestavy;
        protected tema: string;
        protected $filterPanel: JQuery;
        protected myKeys: string | undefined;
        protected Globals: Gordic.Uct.Interface.GUcrGlobalDto;
        protected VolanoZUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        protected loadingData: boolean;
        protected TypUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        protected parentCnt: GSeznamEkoZaznamuBaseContent;
        protected filterHistory: Array<GSeznamEkoZaznamuGetDataFilterDto> & Array<Gordic.Uct.Interface.GRozStavyAatListRequestDto>;
        protected currFilterHistoryIndex: number;
        protected addFilterToHistory: boolean;
        protected previewController: Gordic.Previews.GPreviewController<IGSeznamZapisuStavuDtoWithTabSettings>;
        protected profiles: IGSeznamZapisuProfiles;
        protected detailInf: string;
        protected PrizIissp: boolean;
        protected dotAct: GAction;
        protected clearFilterRowAct: GAction;
        protected printAct: GPrintActionType;
        protected globals: Gordic.Uct.Interface.GUcrParamsDto;
        protected zkratky: Gordic.Ucr.WebClient.Dto.GUcrZkrDto;
        protected texty: Gordic.Ucr.WebClient.Dto.GUcrZkrDto;
        protected cfuSetSorted: Gui.WebApp.GGridFormatDto;
        /**
         * trida gridu
         */
        protected classGrid: string;
        /**
         * identifikator ucetniho rozvrhu
         */
        protected ixsRoz: string;
        /**
         * identifikator Sax
         */
        protected ixsSax: string;
        /**
         * Pouzivat texty z rozvrhu
         *
         */
        protected useTextyZRozvrhu: boolean;
        /**
         * Pouzivat PAP radky
         *
         */
        protected usePapRows: boolean;
        /**
         * Pamatovani historie
         *
         */
        protected rememberHistory: boolean;
        protected povolenNahled: boolean;
        protected pouzivanStrukPopis: boolean;
        protected soucetVeStatusBaru: boolean;
        protected islView: Gordic.Isl.View<IGSeznamZapisuStavuDtoWithTabSettings>;
        protected sumare_processor: Gordic.Data.BaseProcessor<IGSeznamZapisuStavuDtoWithTabSettings>;
        protected souctovyRadekAtomaticky: boolean;
        protected serverovyFilterNadGridem: boolean;
        /**
         * task pro pocet
         * */
        protected taskCount: Isl._Task<Isl.GServiceListRequest, number>;
        /**
         * task pro seznam
         * */
        protected taskList: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        protected loading: boolean;
        /**
         * Zobrazit data z ESU
         */
        protected showEsu: boolean;
        /**
         * Zobrazit data z ESU - stara hodnota
         */
        protected showEsuOld: boolean;
        /**
         * Zobrazit strukturovany popis
         */
        protected showPopisStrukt: boolean;
        /**
         * Zobrazit strukturovany popis - stara hodnota
         */
        protected showPopisStruktOld: boolean;
        /**
         * Zobrazit vybrane polozky strukturovaneho popisu
         */
        protected showPopisStruktPolozky: boolean;
        /**
         * nacitani bez PAP radku
         */
        protected filterPap: boolean;
        /**
         * Zobrazit vybrane polozky strukturovaneho popisu - stara hodnota
         */
        protected showPopisStruktPolozkyOld: boolean;
        /**
         * Atribut 1. nacteni
         */
        protected firstLoad: boolean;
        /**
         * Defailtni akce na gridu
         */
        protected defaultGridAction: GAction;
        /**
         * Konstruktor
         *
         * @param content - parent content
         */
        constructor(content: GSeznamEkoZaznamuBaseContent);
        onContentReady(): void;
        /**
         * Souctove radky
         *
         * */
        protected nastavSumacniRadek(sumRow: MetaRow<IGSeznamZapisuStavuDtoWithTabSettings> | undefined): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Nastaveni sumacniho radku
         * @param sumRow
         * @param $souctySpn
         */
        protected setSumBar(sumRow: MetaRow<IGSeznamZapisuStavuDtoWithTabSettings>, $souctySpn: JQuery<HTMLElement>): void;
        protected formatSumy(caption: string, value: JsonDecimal, $spn: JQuery, separator?: string): void;
        /**
         * Definice menubaru
         *
         * */
        protected CreateMenuBar(): void;
        /**
         * Definice menu baru
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        protected createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Nacteni textu z rozvrhu
         * @param view
         * @returns
         */
        private loadTextyZRozvrhu;
        protected doFilterClick(): void;
        protected getZapisFilter(): GEkoFilterDto;
        /**
         * Priprava pro generovani sestavy
         * @param ri
         */
        protected reportStarting(ri: IGPrintActionReportStarting<Gordic.Uct.Interface.GSeznamEkoZaznamuGeneratorDto>): JQueryPromise<void>;
        /**
         * Nastaveni akci
         * */
        protected _nastaveniAkci(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
         * Zobrazeni zapisu
         *
         * */
        showZapisy(): void;
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
         * Zmena focusu radku
         *
         */
        protected changeSelect(newRow: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto | null): void;
        /**
         * Pridani spolecnych sloupcu
         * @param gridFormat
         */
        addCommonCols(gridFormat: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): void;
        /**
         * Metoda povoleni nacteni seznamu
         * @param rq
         */
        protected allowedList(rq: Isl.GServiceListRequest): boolean;
        /**
         * Vraci ISL metodu pro zjisteni poctu zaznamu
         *
         * */
        protected getCallCount(): JQueryPromise<number>;
        /**
         * Udalost pred vlstnim nacteni. Lze zrusit nacteni
         * @returns
         */
        protected beforeLoading(): boolean;
        /**
         * Vytvoreni view pro list
         *
         * */
        protected createListView(): Gordic.Isl.View;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<any> | JQueryPromise<Isl.GServiceListResponse<any>> | JQueryPromise<number> | JQueryPromise<Isl.GServiceListRequest>;
        /**
         * Zobrazeni detailu
         * @param row
         */
        protected showDetail(row?: Uct.Interface.GSeznamZapisuStavuDto): void;
        /**
         * Defaultni akce na gridu
         *
         * V potomku lze predefinovat
         *
         * @param row
         */
        protected defaultAction(row?: Uct.Interface.GSeznamZapisuStavuDto): void;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        dispatchFillServerGridEvent(ev: JQueryEventObject): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        getFilter(fPanelData?: any): JQueryPromise<GSeznamEkoZaznamuGetDataFilterDto>;
        /**
         * Vraci filtr nad gridem
         * @returns
         */
        protected getFilterGrid(): JQueryPromise<Gordic.Uct.Interface.GUcrFilterDto>;
        /**
         * Ulozeni filtru do zasobniku
         * @param filter
         */
        protected setFilterStack(filter: Gordic.Uct.Interface.GUcrFilterDto): void;
        /**
         * Vyber filtru ze zasobniku
         * @param filter
         */
        protected getFilterStack(): Gordic.Uct.Interface.GUcrFilterDto | null;
        /**
         * Kopie cfu do objektu
         * @param source
         * @param destination
         * @returns
         */
        protected copyCfuToObject(source: any, destination: any): void;
        /**
         *  Nacteni dat
         */
        loadData(): void;
        /**
         * Znovunacteni
         * @returns
         */
        protected reload(): void;
        /**
         * Prechazejici fasledujici
         *
         */
        protected prevFilter(): void;
        /**
         *
         * Nalsedujici filtr
         *
         */
        protected nextFilter(): void;
        protected moveFilter(currFilter: GSeznamEkoZaznamuGetDataFilterDto): void;
        /**
         * Pridani podminky do historie filtru
         * @param newFilter
         */
        protected addFilterIntoHistory(newFilter: any): void;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(typeZapis?: "Detail"): Gordic.Data.GridFormat<any>;
        /**
         * Zobrazeni prim. dokladu
         * @param row
         */
        protected showPrimDoklad(row?: Uct.Interface.GSeznamZapisuStavuDto, typ?: "PRI" | "BLK" | "SML" | "RO" | ""): void;
        protected toggleGrouping(profileName?: string): void;
        /**
         * Nacteni urovne ze slov ucetni vety
         *
         * @returns
         */
        protected getUroven(): JQueryPromise<number>;
        /**
         * Zobrazit texty z rovrhu
         *
         * @returns
         */
        protected autoLoadTextyZRozvrhu(): boolean;
        /**
         * Zobrazit texty z rovrhu
         *
         * @returns
         */
        protected displayTextyZRozvrhu(): boolean;
        /**
         * Zobrazit akci bez PAP
         *
         * @returns
         */
        protected showPapAction(): boolean;
        /**
         * Stav vyberu PAP zapisu
         *
         * @returns
         */
        protected getCheckedPap(): boolean;
        /**
         * Nacte cfu set (z gcontentu nebo primo z argumentu) a jednotlivym sloupcum vytvori propertu 'serverFilter' pro CFU.
         * @param delegateIntervalOptionsUse {boolean} true bude pouzit delegat pro pripadnou upravu options cfuIntervalu pred jeho vytvorenim
         */
        protected getCfuSetServerFilters(delegateIntervalOptionsUse: boolean): Gordic.Data.GridFormat<any>;
        /**
         * Ziskani nastaveni pro infetval cfu
         * @param delegateIntervalOptionsUse {boolean} true bude pouzit delegat pro pripadnou upravu options cfuIntervalu pred jeho vytvorenim
         * @returns
         */
        protected getCfuIntervalOptions(delegateIntervalOptionsUse: boolean): Gordic.Eko.CfuUtils.IGCfuFilterOptions;
        /**
         * Zjisteni aktualniho radku
         *
         *  @returns
         */
        protected getCurrentRow(grid?: JQuery<HTMLElement> | null): Uct.Interface.GSeznamZapisuStavuDto | null;
    }
    type IGSeznamZapisuStavuDtoWithTabSettings = Gordic.Uct.Interface.GUctSeznamZapisuStavuDto & {
        tabSettings?: IGDetailStavZapisRadkuTabSettings;
    };
    interface IGSeznamZapisuProfiles {
        default: GridProfile<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        doklady?: GridProfile<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GSeznamEkoZaznamuBaseContent.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Stavy konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamEkoZaznamuBaseContent extends GContentBase implements IGContent {
        globalParams: Gordic.Uct.Interface.GUcrParamsDto;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        filterParams: GFilterParamsDto;
        Filter: GEkoFilterDto;
        addStrPopisColumns?: string[];
        ExterniSumarizace: boolean;
        debug: boolean;
        CurrentRow: Gordic.Uct.Interface.GSeznamZapisuStavuDto;
        filterStrPopis?: GStrukturovanyPopisFilterDto[];
        Rows: Gordic.Uct.Interface.GSeznamZapisuStavuDto[];
        Radek_DPH: string;
        StrictFilter: boolean;
        AutoLoadData: boolean;
        Ecdd: string;
        Dic: string;
        AvoidUus: boolean;
        AvoidNks: boolean;
        AvoidExt: boolean;
        typSestavy: Gordic.Uct.Interface.GUcrTypSestavy;
        $filterPanel: JQuery;
        $grid: JQuery<HTMLElement>;
        Globals: Gordic.Uct.Interface.GUcrGlobalDto;
        globals: Gordic.Uct.Interface.GUcrParamsDto;
        TypUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        tema: string;
        Zapisova: boolean;
        loadingData: boolean;
        ekoParams: Gordic.Ucr.WebClient.GEkoParamsDto;
        modifyCfu: Gui.WebApp.GGridFormatDto;
        cfuSetSorted: Gui.WebApp.GGridFormatDto;
        wodrOrj: Gui.WebApp.GGridColumnDto;
        wodrOrg: Gui.WebApp.GGridColumnDto;
        detailInf: string;
        PrizIissp: boolean;
        private serviceObject;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        onContentReady(): void;
        /**
          * Uzavirani okna
          * @returns
          */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GSeznamEkoZaznamuTS.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoZaznamu extends GContentBase {
        /** Globalni modulove parametry v JS */
        globals: Gordic.Uct.Interface.GUcrParamsDto;
        Globals: Gordic.Uct.Interface.GUcrGlobalDto;
        zkratky: Gordic.Ucr.WebClient.Dto.GUcrZkrDto;
        texty: Gordic.Ucr.WebClient.Dto.GUcrZkrDto;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        filterParams: GFilterParamsDto;
        filterStrPopis?: GStrukturovanyPopisFilterDto[];
        private ekoParams;
        AvoidUus: boolean;
        AvoidNks: boolean;
        AvoidExt: boolean;
        Zapisova: boolean;
        Rozpocet: boolean;
        Ucetnictvi: boolean;
        ExterniSumarizace: boolean;
        private modifyCfu;
        private wodrOrj;
        private wodrOrg;
        Filter: GEkoFilterDto;
        CurrentRow: Gordic.Uct.Interface.GSeznamZapisuStavuDto;
        Rows: Gordic.Uct.Interface.GSeznamZapisuStavuDto[];
        Radek_DPH: string;
        StrictFilter: boolean;
        AutoLoadData: boolean;
        Ecdd: string;
        Dic: string;
        private useNS;
        private useORJ;
        private useORG;
        private TypUlohy;
        private typSestavy;
        private tema;
        private detailInf;
        PrizIissp: boolean;
        /**
         * trida gridu
         */
        protected classGrid: string;
        $filterPanel: JQuery;
        private filterHistory;
        private currFilterHistoryIndex;
        private addFilterToHistory;
        private previewController;
        private profiles;
        private addStrPopisColumns?;
        private detailAct;
        private prevFilterAct;
        private nextFilterAct;
        private printAct;
        private zapisyAct;
        private zapisyAllAct;
        private dokladAct;
        private primdokladAct;
        private dokladROAct;
        private dokladBLKAct;
        private clearFilterRowAct;
        private insAct;
        private clearAndFilterAct;
        private selFilterAct;
        private selFilterAndSearchAct;
        private dotAct;
        private filterPidAct;
        private shDokladyAct;
        private shZapisyAct;
        private zatriditAct;
        private cfuSetSorted;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        onContentReady(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        createGridFormat(): Gordic.Data.GridFormat<Uct.Interface.GSeznamZapisuStavuDto>;
        private createProfiles;
        private createActions;
        /**
         * Definice menu
         * @param typUlohy
         */
        private createMenubarDef;
        loadData(fPanelData?: any): void;
        private formatSumy;
        private getFilter;
        private createFilterPanel;
        private getData;
        /**
         * Nacteni vsech zapisu
         *
         * @param def
         * @param filter
         */
        private getSaldokontoZapisyVse;
        /**
         * Nacteni dat pro saldokonto zapisy
         * @param def
         * @param maska
         * @param rq
         */
        private getDataSaldokontoZapisy;
        /**
         * Nacteni dat pro saldokonto
         * @param def
         * @param maska
         * @param rq
         */
        private getDataSaldokonto;
        /**
         * Zatrideni radku
         *
         * */
        private zatridit;
        private showSumLimitExceeded;
        private showDetail;
        /**
         * Zobrazeni prim. dokladu
         * @param row
         */
        private showPrimDoklad;
        /***
         * Zobrazeni vsech zapisu pro saldokonto
         *
         * */
        private showZapisyAll;
        private showZapisy;
        private getZapisFilter;
        private prevFilter;
        private nextFilter;
        private moveFilter;
        private doFilterClick;
        private dispatchFillServerGridEvent;
        /** Priprava pro generovani sestavy */
        private reportStarting;
        private toggleGrouping;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GSeznamMasekControl.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface IGSeznamMasekControlOptions extends IGUcrMaskaDetailOptions {
        /** ID masky, ktera ma byt predvybrana v gridu */
        ixs_mas?: string | null;
    }
    /**
     * GSeznamMasekControl
     * Navratovou hodnotou je GUcrMaskaDto
     *
     * @author bmartinek
     * @since 482.1.0.2
     */
    class GSeznamMasekControl extends GContentBase implements IGClientContent {
        private options;
        private srv;
        private okAct;
        uid: string;
        /**
         * trida gridu
         */
        protected classGrid: string;
        prepareContent(options: IGSeznamMasekControlOptions): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        private createFilterForm;
        private createGridFormat;
        private getData;
        private showDetail;
        private newMaska;
        private copyMaska;
        private openFilterDetails;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GSeznamPozadavku.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Seznam pozadavku
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamPozadavku extends GContentBase implements IGContent {
        private lastTypMsk;
        /**
         * trida gridu
         */
        protected classGrid: string;
        taskId: string;
        title: string;
        onContentReady(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         *  Nacteni dat
         */
        loadData(typMask?: number): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\GUcrReportScheduler.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GUcrReportScheduler extends Gordic.Report.WebClient.GReportScheduler {
        protected reportSchedulerClassName: string;
        constructor(cnt: GContent, options: Gordic.Report.WebClient.IGReportSchedulerOptions);
        protected getMenuBar(): MenuParams[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IGSeznamEkoZaznamuBase.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Predek Eko seznamu kontentu
     *
     * @author tkares
     * @since 484.1.0.69
     */
    interface IGSeznamEkoZaznamuBase {
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        dispatchFillServerGridEvent(ev: JQueryEventObject): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        getFilter(fPanelData?: any): JQueryPromise<GSeznamEkoZaznamuGetDataFilterDto>;
        /**
         * Vytvoreni gridformatu
         *
         */
        createGridFormat<TRow = any>(): Gordic.Data.GridFormat<TRow>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\DPH\GDetailDanoveEvidence.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface IGDetaiDanovaEvidenceOptions {
        currentRow: any;
        cols: Gordic.Uct.Interface.GEkocskoDto[];
        viewMode: boolean;
    }
    class GDetailDanoveEvidence extends GContentBase {
        uid: string;
        private editGrid;
        private inputValues;
        title: string;
        prepareContent(options: IGDetaiDanovaEvidenceOptions): void;
        init(options: IGDetaiDanovaEvidenceOptions): void;
        private getFormOptions;
        /**
         * Vyplneni dat
         * @param form
         */
        private fillValues;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\DPH\GSeznamDanovaEvidence.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Danove evidence
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamDanovaEvidence extends GContentBase implements IGContent {
        private ekoParams;
        private filterMonth;
        private $filterPanel;
        private previewController;
        private cols;
        /**
         * trida gridu
         */
        protected classGrid: string;
        title: string;
        onContentReady(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Zobrazeni z8pis;
         * @param row
         */
        private showZapisy;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         *  Nacteni dat
         */
        loadData(filter?: any): JQueryPromise<any>;
        /**
         *  Zda zobrazovat mesic DPH
         *
         *
         * */
        private isMesicDPH;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         * @param colDefinition
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\DPH\GSeznamDanovePriznani.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Danove priznani
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamDanovePriznani extends GContentBase implements IGContent {
        private ekoParams;
        private listMonth;
        private $filterPanel;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private Globals;
        private condFormats;
        private loadingData;
        private profilName;
        onContentReady(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Nastaveni titulku okna
         * @param month
         */
        private setTitle;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        private dispatchFillServerGridEvent;
        /**
         * Zobrazeni ucetnich zapisu
         * @param row
         */
        private showZapisy;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
         * Vraceni hodnota nastaveni rozpadu
         * */
        private getRozpad;
        /**
         * Zjisteni jmena sloupce dle nastaveni rozpadu
         *
         * */
        private getColsByRozpad;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         *  Nacteni dat
         */
        private loadData;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         * @param colDefinition
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\DPH\GSeznamDanovePriznaniA.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Danove priznani
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamDanovePriznaniA extends GContentBase implements IGContent {
        private ekoParams;
        private filterMonth;
        private $filterPanel;
        private $grid;
        private previewController;
        private cols;
        title: string;
        onContentReady(): void;
        private showZapisy;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         *  Nacteni dat
         */
        loadData(filter?: any): JQueryPromise<any>;
        /**
         *  Zda zobrazovat mesic DPH
         *
         *
         * */
        private isMesicDPH;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         * @param colDefinition
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\DPH\GSeznamEvidence.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Danove evidence
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamEvidence extends GContentBase implements IGContent {
        private ekoParams;
        private filterMonth;
        private $filterPanel;
        private $grid;
        private previewController;
        private cols;
        taskId: string;
        title: string;
        onContentReady(): void;
        private showZapisy;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         *  Nacteni dat
         */
        loadData(filter?: any): JQueryPromise<any>;
        /**
         *  Zda zobrazovat mesic DPH
         *
         *
         * */
        private isMesicDPH;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         * @param colDefinition
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Financovani\GSeznamEkoFinancovani.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoFinancovani extends GSeznamEkoZaznamuBase implements IGContent {
        private zapisyAct;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        /**
         * Vytvoreni gridformatu
         * @returns
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
         * Zobrazeni detailu - budu zobrazovat zapisy
         * @param row
         */
        protected showDetail(row?: Uct.Interface.GSeznamZapisuStavuDto): void;
        /**
         *
         * Zobrazeni zapisu
         * */
        showZapisy(): void;
        protected getZapisFilter(): GEkoFilterDto;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GInputIDRISRE.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GInputIDRISRE extends GContentBase {
        uid: string;
        private row;
        private specialSelect;
        private zatrideno;
        prepareContent(row: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto): void;
        init(options: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto): void;
        /**
         * Skryti selectoru
         *
         * @param {string} selector
         */
        private hideBySelector;
        /**
         * Zobrazeni selectoru
         *
         * @param {string} selector
         */
        private showBySelector;
        private changeValue;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
        /**
         * Vyplneni dat
         * @param form
         */
        private fillValues;
        /**
         * Ulozeni hodnot
         *
         * */
        private Save;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPBase.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Predek IISSP kontentu
     *
     * @author tkares
     * @since 484.1.0.69
    */
    class GSeznamIISSPBase implements IGSeznamIISSPBase {
        protected globalParams: Gordic.Uct.Interface.GUcrParamsDto;
        protected filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        protected debug: boolean;
        protected $filterPanel: JQuery;
        /**
         * trida gridu
         */
        protected classGrid: string;
        protected Globals: Gordic.Uct.Interface.GUcrGlobalDto;
        protected TypUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        protected VolanoZUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        protected loadingData: boolean;
        protected parentCnt: GSeznamIISSPBaseContent;
        protected aktDatum: Date;
        autoReload: boolean;
        private islViewUse;
        protected multiSelect: boolean;
        protected sumRow: boolean;
        protected myKeys: string | undefined;
        /**
         * task pro pocet
         * */
        protected taskCount: Isl._Task<Isl.GServiceListRequest, number>;
        /**
         * task pro seznam
         * */
        protected taskList: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        /**
         * Konstruktor
         *
         * @param content - parent content
         */
        constructor(content: GSeznamIISSPBaseContent);
        onContentReady(): void;
        /**
         * Definice menubaru
         *
         * */
        protected CreateMenuBar(): void;
        /**
         * Definice menubaru
         *
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Zobrazeni zapisu
         *
         * */
        showZapisy(): void;
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
         * Vraci ISL metodu pro zjisteni poctu zaznamu
         *
         * */
        protected getCallCount(): JQueryPromise<number>;
        protected Detail(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        dispatchFillServerGridEvent(ev: JQueryEventObject): void;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
         * Vraci objekt filtru
         * @returns
         */
        getFilter(): JQuery;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
        /**
         * Nacteni Isl sluzby pro list
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: {};
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         *  Nacteni dat
         */
        loadData(): JQueryPromise<any>;
        /**
         * Vytvoreni view pro list
         *
         * */
        protected createListView(): Gordic.Isl.View;
        /**
           * Nacti filtry
           * @param that
           * @param req
           * @param next
           */
        protected getFilterData(req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): JQueryPromise<Isl.GServiceListRequest>;
        /**
         * Vracifiltry na gridu
         * @returns
         */
        protected getFilterGrid(): JQueryPromise<any>;
        /**
         * Udalost pred vlstnim nacteni. Lze zrusit nacteni
         * @returns
         */
        protected beforeLoading(): boolean;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<any>;
        /**
         * Znovunacteni dat
         *
         * */
        protected reload(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPBaseContent.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Stavy konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPBaseContent extends GContentBase implements IGContent {
        globalParams: Gordic.Uct.Interface.GUcrParamsDto;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        debug: boolean;
        $filterPanel: JQuery;
        $grid: JQuery<HTMLElement>;
        Globals: Gordic.Uct.Interface.GUcrGlobalDto;
        TypUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        loadingData: boolean;
        private _isAggregation;
        autoReload: boolean;
        maska: any;
        aktDatum: Date;
        private serviceObject;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnosti.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Stavy konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPPreuctovaniSkutecnosti extends GContentBase implements IGContent {
        globalParams: Gordic.Ucr.WebClient.Dto.GUcrGlobalsDto;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        debug: boolean;
        $filterPanel: JQuery;
        $grid: JQuery<HTMLElement>;
        Globals: Gordic.Uct.Interface.GUcrGlobalDto;
        TypUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        loadingData: boolean;
        private _isAggregation;
        private serviceObject;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiBanka.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Stavy konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPPreuctovaniSkutecnostiBanka extends GSeznamIISSPBase implements IGContent {
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Zobrazeni stavu
         *
         * */
        showStavy(): void;
        /**
         * Zobrazeni stavu
         *
         * */
        showDavky(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Nacteni Isl sluzby pro list
         *
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: any;
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GRisreBankaDto>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiNZ.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP preuctovani skutecnosti - Nezatridene zapisy
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPPreuctovaniSkutecnostiNZ extends GSeznamEkoUctZapis implements IGContent {
        /** Globalni modulove parametry v JS */
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
         * Vytvoreni akci
         *
         */
        createActions(): void;
        /**
         * Zatrideni radku
         *
         * */
        private zatridit;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiRegistr.d.ts 

declare namespace Gordic.Ucr.WebClient {
    const enum TypeActionRegister {
        Open = 0,
        Send = 1,
        Storno = 2,
        Created = 3,
        Save = 4,
        History = 5,
        Cancel = 6,
        Commit = 7,
        State = 8
    }
    /**
     * IISSP preuctovani skutecnosti - Registr davek
     *
     * @author tkares
     * @since 484.1.0.69
     */
    export class GSeznamIISSPPreuctovaniSkutecnostiRegistr extends GSeznamIISSPBase implements IGContent {
        private _isStorno;
        private _isZamistnuto;
        private FinMisto;
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Spusteni akce
         *
         * */
        protected RunAction(action: TypeActionRegister): JQueryPromise<any>;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private Odeslat;
        /**
         * Zadani datumu
         * */
        private ZadaniDatumu;
        /**
         * Zrusit davku
         *
         * */
        private Zrusit;
        /**
         * Potvrdit
         *
         * */
        protected Potvrdit(): void;
        /**
         * Vytvorit
         *
         * */
        protected Otevrit(): JQueryPromise<any>;
        /**
         * Ulozit jako
         *
         * */
        protected SaveAs(): JQueryPromise<any>;
        /**
         * Potvrdit
         *
         * */
        protected Storno(): void;
        /**
         * Vytvorit
         *
         * */
        protected Vytvorit(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GSeznamVykazuDto>;
        /**
         * Nacteni Isl sluzby pro list
         * @param param0
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: any;
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         * Zjisteni voleb na filtrpanelu
         * */
        private nactiVolby;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
    }
    export {};
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPPreuctovaniSkutecnostiStavy.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP preuctovani skutecnosti - stavy
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPPreuctovaniSkutecnostiStavy extends GSeznamIISSPBase implements IGContent {
        private FinMisto;
        private showUCS_UUS;
        private filter;
        private _isAggregation;
        onContentReady(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Zobrazeni zapisu
         *
         * */
        showZapisy(): void;
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
         * Prepocet
         * */
        private Recalculation;
        /**
         * Prepocet uplny
         * */
        private RecalculationAll;
        /**
         * Vytvorit davku - prime volany
         * */
        private createDoze;
        /**
         * Vytvorit davku - asynchronni volani
         * */
        private createDozeAsync;
        /**
         * Kontrola podminek na moznost provest davku
         * */
        private checkFM;
        /**
        * function createFilterZalozka
        *
        * filtrovaci zalozka
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Nacteni Isl sluzby pro list
         * @param param0
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: any;
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto>;
        /**
         * Je zapnuta agregace
         * */
        private isAggregation;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPStavyStavyCerpaniRozpoctu.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP stavy - Stavy cerpni rozpoctu
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPStavyStavyCerpaniRozpoctu extends GSeznamIISSPBase implements IGContent {
        private FinMisto;
        private _nestazene;
        private _nesouhlasne;
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private dotazIISSP;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto>;
        /**
         * Nacteni Isl sluzby pro list
         * @param param0
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: any;
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         * Zjisteni voleb na filtrpanelu
         * */
        private nactiVolby;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPStavyStavyRezervaci.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP stavy - Stavy rezervaci
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPStavyStavyRezervaci extends GSeznamIISSPBase implements IGContent {
        protected FinMisto: string;
        protected pouzeSChybou: number;
        private LICMO;
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Overit stav
         *
         *
         * */
        private OveritStav;
        /**
         *detail
         *
         *
         * */
        protected Detail(): void;
        private debugShowIisspResDetail;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid2(): void;
        /**
         * Vytvoreni view pro list
         *
         * */
        protected createListView2(): Gordic.Isl.View;
        /**
         * Vraci ISL metodu pro zjisteni poctu zaznamu
         *
         * */
        protected getCallCount2(): JQueryPromise<number>;
        /**
           * Nacti filtry
           * @param that
           * @param req
           * @param next
           */
        protected getFilterData(req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): JQueryPromise<Isl.GServiceListRequest>;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        getFilterGrid2(): JQueryPromise<any>;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GRisreIIsspDto>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPStavyStavyRezervaciChyby.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP stavy - Stavy rezervaci
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPStavyStavyRezervaciChyby extends GSeznamIISSPStavyStavyRezervaci implements IGContent {
        onContentReady(): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPStavyStavyRozpoctu.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP stavy - Stavy rozpoctu
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPStavyStavyRozpoctu extends GSeznamIISSPBase implements IGContent {
        private FinMisto;
        private _nestazene;
        private _nesouhlasne;
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private dotazIISSP;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Nacteni Isl sluzby pro list
         * @param param0
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: any;
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         * Zjisteni voleb na filtrpanelu
         * */
        private nactiVolby;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPStavyStavySkutecnosti.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP stavy - Stavy skutecnosti
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPStavyStavySkutecnosti extends GSeznamIISSPBase implements IGContent {
        private FinMisto;
        private _nestazene;
        private _nesouhlasne;
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private dotazIISSP;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private pohyby;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto>;
        /**
         * Zjisteni voleb na filtrpanelu
         * */
        private nactiVolby;
        /**
         * Nacteni Isl sluzby pro list
         * @param param0
         */
        protected loadISLList(rq: {
            maska: {};
            filter: {
                filters: any;
            };
        }): Isl._Task<any, Isl.GServiceListResponse<any>>;
        /**
         * Vrat muj sestaveny filtr
         *
         * @returns
         */
        protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): {
            maska: {};
            filter: {
                filters: {};
            };
        } | undefined;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamIISSPStavyStavyVolaniInbox.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * IISSP stavy - Stavy skutecnosti
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamIISSPStavyStavyVolaniInbox extends GSeznamIISSPBase implements IGContent {
        private FinMisto;
        private _nestazene;
        private _nesouhlasne;
        onContentReady(): void;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private dotazIISSP;
        /**
         * Odeslat vykaz
         *
         *
         * */
        private pohyby;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         * Definice menubaru
         * */
        protected DefineMenuBar(): MenuParams[];
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctaspsDto>;
        /**
         * Zjisteni voleb na filtrpanelu
         * */
        private nactiVolby;
        /**
         *  Nacteni dat
         */
        loadData(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\GSeznamPreuctovaniStavy.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Stavy konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamPreuctovaniStavy extends GContentBase implements IGContent {
        private selectedMonth;
        globalParams: Gordic.Ucr.WebClient.Dto.GUcrGlobalsDto;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        private $filterPanel;
        private $grid;
        private Globals;
        private loadingData;
        onContentReady(): void;
        /**
         * Vytovreni akci
         *
         * */
        private createActions;
        /**
         *  Vytvoreni gridu
         *
         * */
        private createGrid;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        private dispatchFillServerGridEvent;
        /**
         * Prepocet
         * */
        private Recalculation;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         *  Nacteni dat
         */
        private loadData;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\IISSP\IGSeznamIISSPBase.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Predek IISSP kontentu
     *
     * @author tkares
     * @since 484.1.0.69
     */
    interface IGSeznamIISSPBase {
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(): void;
        /**
         *  Vytvoreni gridu
         *
         * */
        createGrid(): void;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        dispatchFillServerGridEvent(ev: JQueryEventObject): void;
        /**
        * function createFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        createFilterZalozka(): any;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        getFilter(): JQuery;
        /**
         *  Nacteni dat
         */
        loadData(): JQueryPromise<any>;
        /**
         * Vytvoreni gridformatu
         *
         */
        createGridFormat<TRow = any>(): Gordic.Data.GridFormat<TRow>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Konsolidace\GDetailTransformacniPredpis.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GDetailTransformacniPredpis extends GContentBase implements IGContent {
        uid: string;
        private currentRow;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        private refresh;
        private error;
        private Globals;
        private modifyCfu;
        onContentReady(): void;
        prepareContent(): void;
        init(): void;
        /**
         * Vytvoreni akci
         * */
        private createActions;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
         * Vyplneni dat
         * @param form
         */
        private fillValues;
        /**
         * Ulozeni dat
         *
         * */
        private save;
        /**
        * Uzavirani okna
        * @returns
        */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Konsolidace\GSeznamEkoStavyKonsolidace.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoStavyKonsolidace extends GSeznamEkoZaznamuBase implements IGContent {
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        onContentReady(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        createGridFormat(): Gordic.Data.GridFormat<any>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
        /**
         * Nastaveni sumacniho radku
         * @param sumRow
         * @param $souctySpn
         */
        protected setSumBar(sumRow: MetaRow<IGSeznamZapisuStavuDtoWithTabSettings>, $souctySpn: JQuery<HTMLElement>): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<any> | JQueryPromise<Isl.GServiceListResponse<any>> | JQueryPromise<number>;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Prepocet
         * */
        private Recalculation;
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
         * Zobrazeni detailu - budu zobrazovat zapisy
         * @param row
         */
        protected showDetail(row?: Uct.Interface.GSeznamZapisuStavuDto): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Konsolidace\GSeznamStavyKonsolidace.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Stavy konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamStavyKonsolidace extends GContentBase implements IGContent {
        private selectedMonth;
        globalParams: Gordic.Uct.Interface.GUcrParamsDto;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        private $filterPanel;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private Globals;
        private loadingData;
        onContentReady(): void;
        /**
         * Vytovreni akci
         *
         * */
        private createActions;
        /**
         *  Vytvoreni gridu
         *
         * */
        private createGrid;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        private dispatchFillServerGridEvent;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Prepocet
         * */
        private Recalculation;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
         *  Nacteni dat
         */
        private loadData;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         *
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Konsolidace\GSeznamTransformacniPredpis.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Seznam transformacnich predpisu konsolidace
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamTransformacniPredpis extends GContentBase implements IGContent {
        private ekoParams;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        private $filterPanel;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private modifyCfu;
        editovatPermit: Gordic.General.ApplicationInterface.GPermission;
        private Globals;
        private loadingData;
        onContentReady(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Odstraneni radku
         * */
        private DeleteRows;
        /**
         * Znovunacteni dat
         *
         * */
        private refresh;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        private dispatchFillServerGridEvent;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showDetail;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
         *  Nacteni dat
         */
        private loadData;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         * @param colDefinition
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Obalkovac\GObalkovac.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GObalkovac extends GContentBase implements IGContent {
        uid: string;
        private refresh;
        private filesLoaded;
        /**
         *  inforamce o prenesenem souboru
         */
        private infoFile;
        prepareContent(): void;
        onContentReady(): void;
        init(): void;
        /**
         * Definice akci
         * @param that
         */
        private createActions;
        /**
         * Vytvoreni formulare
         */
        private createForm;
        /**
         * Spusteni vlastniho obalkovani
         *
         */
        private obalkuj;
        /**
         * Validace pred odeslanim
         *
         */
        private validation;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        private NastaveniAkci;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Odesilac\GOdesilac.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GOdesilac extends GContentBase implements IGContent {
        uid: string;
        private refresh;
        private filesLoaded;
        private filesToSendLoaded;
        /**
         *  inforamce o prenesenem souboru
         */
        private infoFile;
        private infoFileSend;
        private view_data;
        private row;
        prepareContent(): void;
        onContentReady(): void;
        init(): void;
        /**
         * Definice akci
         * @param that
         */
        private createActions;
        /**
         * Vytvoreni formulare
         */
        private createForm;
        /**
         * Spusteni vlastniho obalkovani
         *
         */
        private obalkuj;
        /**
         * Validace pred odeslanim
         *
         */
        private validation;
        private validation_Send;
        private validation_Send_Inbox;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        private NastaveniAkci;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
        /**
         * Spusteni vlastniho odeslani
         *
         */
        private odesli;
        /**
         * Spusteni vlastniho odeslani Inbox
         *
         */
        private odesli_inbox;
        zjisti_sloupce(gf: any, vlastnosti: any): string;
        detail_zpravy(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\PevneOmezeni\GSeznamOmezeni.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamOmezeni extends GContentBase implements IGContent {
        private grid;
        private change;
        private inputData;
        private statusOmezeni;
        onContentReady(): void;
        /**
         * Znovunacteni dat
         *
         * */
        private reload;
        /**
         * Nastaveni hodnot do formulare
         *
         * */
        private nastavHodnoty;
        /**
         * Zmena platnosti omezeni
         * @param {GUctDetail} content
         */
        private ZmenitPlatnost;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Pozadavky\GDetailPozadavkuControl.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GDetailPozadavkuControl extends GContentBase {
        taskId: string;
        title: string;
        logOptions: {
            name: string;
            fileName: string;
            authorCode: number;
        };
        private options;
        private pozadavek;
        private filterParams;
        private readonly globals;
        private readonly Globals;
        private readonly ekoParams;
        /**Ek z TK AddTopoFilters (ucs, uus, nks, drd_msk a ac atd.) */
        private readonly filterOptions;
        private readOnly;
        private readonly externiSumarizace;
        private isOdlozeny;
        private $header;
        private $pozTab;
        private $pozParTab;
        private $pozFiltrTab;
        private generatorOptions;
        private generovatAct;
        private generovatAsyncAct;
        private saveAct;
        private saveNewAct;
        private selectOnlyAct;
        private odlozAct;
        private vystupAct;
        private vystupSelectorAct;
        private maskaDetailsAct;
        private newMaskaAct;
        private clearElementsAct;
        private omezeniAct;
        private isObdobiChanging;
        private actualReportInfo;
        onContentReady(): void;
        private collectValues;
        private generateReport;
        private _generateReport;
        private generateReportAsync;
        private scheduleReport;
        private setOutput;
        private onObdobiChanged;
        private updateVystupActEkoDate;
        /** Update GUI na sumace + hro */
        private updateSumaceHro;
        private showGfrm;
        /** Uprava vykonnych akci podle stavu dto */
        private updateActionsState;
        private updateFieldsState;
        private updateElements;
        private getElementFormat;
        private save;
        private saveNew;
        private getServiceOptions;
        private showSeznamMasek;
        private showMaskaDetail;
        private createNewMaska;
        private showMaskaDetailDlg;
        private clearVystup;
        private validateReportPlatnost;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Pozadavky\GSeznamPozadavek.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Seznam pozadavku
     *
     * @author tkares
     * @since 488.1.0.69
     */
    class GSeznamPozadavek extends GSeznamEkoZaznamuBase implements IGContent {
        /**
         * filtry na pozadavky
         * */
        private filterPozadavek;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Konstruktor
         * @param content
         */
        constructor(content: GSeznamEkoZaznamuBaseContent);
        onContentReady(): void;
        /**
         * Zobrazeni detailu
         * @param row
         */
        protected showDetail(row?: any): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<any> | JQueryPromise<Isl.GServiceListResponse<any>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Pozadavky\GSeznamPozadavku.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Seznam pozadavku
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamPozadavekx extends GContentBase implements IGContent {
        private lastTypMsk;
        private $grid;
        taskId: string;
        title: string;
        onContentReady(): void;
        /**
         *  Nacteni dat
         */
        loadData(typMask?: number): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Registr\GDetailRegistr.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GDetailRegistr extends GContentBase {
        uid: string;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private inputParams;
        private uea_txt;
        private ueb_txt;
        private modified;
        private error;
        private typAg;
        private data;
        private Globals;
        private globalParams;
        onContentReady(): void;
        init(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
         * Zobrazeni prim. dokladu
         * @param row
         */
        private showPrimDoklad;
        /**
         * Ulozeni zmen
         * */
        private ulozit;
        /**
         * Navrat hodnoty v pozadovanem formatu
         * @param value
         */
        private getValue;
        /**
         * Vytvoreni gridformatu
         * */
        private createGridFormat;
        /**
         * Nacteni gridu
         * @param content
         */
        private GetGrid;
        /**
         * Vytvoreni editacniho policka
         * @param editorContext
         */
        private createEditor;
        private SpustVypocet;
        private Vzorec;
        private getFormOptions;
        /**
         * Vyplneni dat
         * @param form
         */
        private fillValues;
        /**
        * Uzavirani okna
        * @returns
        */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Registr\GSeznamEkoRegistr.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoRegistr extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        private definovaneSloupce;
        private typReg;
        private selectedMonth;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Konstruktor
         *
         * @param content - parent content
         */
        constructor(content: GSeznamEkoZaznamuBaseContent);
        onContentReady(): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<any> | JQueryPromise<Isl.GServiceListResponse<any>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        /**
         * Vytvoreni formatovacich podminek
         *
         * */
        private createFormatCond;
        /**
         *  Hodnoty
         *
         * */
        private Hodnoty;
        /**
         * Upraveni radku hodnot predni Pole hodno preneseno do sloupcu
         *
         * @param radek
         */
        private upravHodnoty;
        /**
         * Nastaveni pristupnosti akci
         *
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
         * Vytovreni gridformatu
         *
         * @returns
         */
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Eko.Interface.GRegistrZPDto>;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Metoda povoleni nastani seznamu
         * @param rq
         */
        protected allowedList(rq: Isl.GServiceListRequest): boolean;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private GetFilter;
        /**
          * Zobrazeni detailu
          * @param row - aktualni radek
          */
        protected showDetail(row: Gordic.Eko.Interface.GRegistrZPDto & Uct.Interface.GSeznamZapisuStavuDto): void;
        /**
         * Zjisteni mesice
         * */
        private getMesic;
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        createFilterPanel(): void;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Nastaveni filtru
         */
        private setFilter;
        /**
         * Zjisteni filtru dle zaskrtavatek
         *
         * */
        private getFiltering;
        protected createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Saldokonto\GSeznamEkoSaldokonto.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoSaldokonto extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        private detailAct;
        private prevFilterAct;
        private nextFilterAct;
        private zapisyAct;
        private zapisyAllAct;
        private dokladAct;
        private primdokladAct;
        private dokladROAct;
        private dokladBLKAct;
        private insAct;
        private clearAndFilterAct;
        private selFilterAct;
        private selFilterAndSearchAct;
        private filterPidAct;
        private shDokladyAct;
        private shZapisyAct;
        private zatriditAct;
        useNS: boolean;
        useORJ: boolean;
        useORG: boolean;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Konstruktor
         *
         * @param content - parent content
         */
        constructor(content: GSeznamEkoZaznamuBaseContent);
        onContentReady_1(): void;
        /**
         * Nacti filtry
         * @param that
         * @param req
         * @param next
         */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto> | JQueryPromise<Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        /**
         * Vytoreni akci
         */
        createActions(): void;
        /**
         * Definice menu
         * @param typUlohy
         */
        private createMenubarDef;
        createFilterPanel(): void;
        /**
         * Zobrazeni detailu - budu zobrazovat zapisy
         * @param row
         */
        protected showDetail(row?: Uct.Interface.GSeznamZapisuStavuDto): void;
        /***
         * Zobrazeni vsech zapisu pro saldokonto
         *
         * */
        private showZapisyAll;
        showZapisy(): void;
        protected createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        /**
         * nacteni pomoci tecky
         * */
        protected doFilterClick(): void;
        /**
         * Definice menu baru
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Saldokonto\GSeznamEkoSaldokontoZapis.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoSaldokontoZapis extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        private detailAct;
        private prevFilterAct;
        private nextFilterAct;
        private zapisyAct;
        private zapisyAllAct;
        private dokladAct;
        private primdokladAct;
        private dokladROAct;
        private dokladBLKAct;
        private insAct;
        private clearAndFilterAct;
        private selFilterAct;
        private selFilterAndSearchAct;
        private filterPidAct;
        private shDokladyAct;
        private shZapisyAct;
        private zatriditAct;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        onContentReady2(): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto> | JQueryPromise<Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
        /**
         * Definice menu
         * @param typUlohy
         */
        private createMenubarDef;
        createFilterPanel(): void;
        /**
         * Nacteni dat pro saldokonto
         * @param def
         * @param maska
         * @param rq
         */
        private getDataSaldokonto;
        /***
         * Zobrazeni vsech zapisu pro saldokonto
         *
         * */
        private showZapisyAll;
        showZapisy(): void;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Saldokonto\GSeznamEkoSaldokontoZapisVse.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoSaldokontoZapisVse extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        private detailAct;
        private prevFilterAct;
        private nextFilterAct;
        private zapisyAct;
        private zapisyAllAct;
        private dokladAct;
        private primdokladAct;
        private dokladROAct;
        private dokladBLKAct;
        private insAct;
        private clearAndFilterAct;
        private selFilterAct;
        private selFilterAndSearchAct;
        private filterPidAct;
        private shDokladyAct;
        private shZapisyAct;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        onContentReady(): void;
        /**
        * Vytvoreni klavesovych zkratek
        *
        * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
        /**
         * Definice menu
         * @param typUlohy
         */
        private createMenubarDef;
        loadDataOld(fPanelData?: any): void;
        createFilterPanel(): void;
        private getData;
        /**
         * Nacteni vsech zapisu
         *
         * @param def
         * @param filter
         */
        private getSaldokontoZapisyVse;
        /**
         * Nacteni dat pro saldokonto zapisy
         * @param def
         * @param maska
         * @param rq
         */
        private getDataSaldokontoZapisy;
        /**
         * Nacteni dat pro saldokonto
         * @param def
         * @param maska
         * @param rq
         */
        private getDataSaldokonto;
        /***
         * Zobrazeni vsech zapisu pro saldokonto
         *
         * */
        private showZapisyAll;
        showZapisy(): void;
        protected doFilterClick(): void;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Stavy\GSeznamEkoRozStavy.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoRozStavy extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Konstruktor
         * @param content
         */
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
         * Vraci ISL metodu pro zjisteni poctu zaznamu
         *
         * */
        protected getCallCount(): JQueryPromise<number>;
        /**
         * Vytvoreni view pro list
         * */
        protected createListView(): Gordic.Isl.View;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto> | JQueryPromise<Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
        /**
         * Definice menu baru
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        showZapisy(): void;
        protected doFilterClick(): void;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Stavy\GSeznamEkoUctStavy.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoUctStavy extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Konstruktor
         * @param content
         */
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData1(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto> | JQueryPromise<Isl.GServiceListResponse<Uct.Interface.GUctSeznamZapisuStavuDto>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        /**
         * Vytvoreni akci
         *
         * */
        createActions(): void;
        /**
         * Definice menu baru
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        createFilterPanel(): void;
        showZapisy(): void;
        protected getZapisFilter(): GEkoFilterDto;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Sumarizace\GExportDatSeznamUcr.d.ts 

/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ucr.WebClient.GExportDatSeznamUcr.js                                                        </Name>
//    <Description> GExportDatSeznam                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
declare namespace Gordic.Ucr.WebClient {
    class GExportDatSeznamUcr extends GContentBase {
        title: string;
        private $filterPanel;
        private view_ISL;
        private view_ISL_zapisy;
        protected init: boolean;
        protected model_typ: string;
        protected agenda: string;
        protected form: JQuery;
        protected Form_Davka: Gordic.Forms.Form;
        protected akt_davka: Gordic.Uct.Interface.GUcrsexpDto;
        protected akt_new_davka: Gordic.Uct.Interface.GUcrsexpDto;
        private $grid;
        private globals;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Sumarizace\GExportDatSumarizaceUcr.d.ts 

/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ucr.WebClient.GExportDatSumarizaceUcrUcrUcr.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
declare namespace Gordic.Ucr.WebClient {
    class GExportDatSumarizaceUcr extends GContentBase {
        title: string;
        protected model: Gordic.Uct.Interface.GUcrExportDto;
        protected modelmesice: Gordic.Uct.Interface.GUcrSelectOptionDto[];
        protected PrepForm: Gordic.Forms.Form;
        protected sesTreeParams: any;
        protected sestava: any;
        protected init: boolean;
        protected typ: string;
        protected agenda: string;
        protected form: JQuery;
        protected pdg: JQuery;
        protected _currGeneratingDef: JQuery;
        private globals;
        private file;
        onContentReady(): void;
        odeslat(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Ukazatele\GDetailUkazatele.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface IGDetaiUkazatelOptions {
        currentRow: Uct.Interface.GEkoaukaDto;
        typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
        viewMode: boolean;
    }
    class IGDetaiUkazatelData {
        _nazev: string;
        radek: number;
        prijem: JsonDecimal | null | undefined;
        vydej: JsonDecimal | null | undefined;
    }
    class GDetaiUkazatelResult {
        prijem: JsonDecimal | null | undefined;
        vydej: JsonDecimal | null | undefined;
    }
    class GDetailUkazatel extends GContentBase {
        uid: string;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private inputValues;
        private refresh;
        prepareContent(options: IGDetaiUkazatelOptions): void;
        init(options: IGDetaiUkazatelOptions): void;
        /**
         * vyplaneni formulare
         * @param data
         */
        private getdata;
        /**
         *  Definice sloupcu
         *
         * */
        private createCols;
        /**
         * Definice akci
         * @param that
         */
        private DefinceAkci;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Nacteni zadanych dat
         *
         * */
        private getNewData;
        /**
         * Ulozit
         * */
        private Ulozit;
        /**
         * Zmenit rezim
         *
         * */
        private Prenastavit;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        private NastaveniAkci;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Ukazatele\GHistorieUkazatele.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GHistorieUkazatele extends GContentBase implements IGClientContent {
        /**
         True - okno pro poznamky
         */
        private vstup;
        /**
         grid
         */
        /**
         * trida gridu
         */
        protected classGrid: string;
        /**
         * Okno pro historii a poznamky
         * */
        prepareContent(vstup: {
            row: Gordic.Uct.Interface.GEkoaukaDto;
            data: Gordic.Uct.Interface.GUcrUkazatelHistoryDto[];
            notes: boolean;
        }): void;
        /**
         * Definice akci
         * @param that
         */
        private definceAkci;
        /**
         * Nova poznamka
         * */
        private novaPoznamka;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Znovunacteni
         *
         * */
        private reload;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Ukazatele\GSeznamEkoUkazatele.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoUkazatele extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        editovatPermit: Gordic.General.ApplicationInterface.GPermission;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<any> | JQueryPromise<Isl.GServiceListResponse<any>> | JQueryPromise<number>;
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
        * Vytvoreni klavesovych zkratek
        *
        * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        createActions(): void;
        /**
         * Defaultni akce na gridu
         *
         *
         * @param row
         */
        protected defaultAction(row?: Uct.Interface.GEkoaukaDto): void;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showUkazatel;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showHistory;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showNotes;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Ukazatele\GSeznamUkazatele.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Danove priznani
     *
     * @author tkares
     * @since 484.1.0.69
     */
    class GSeznamUkazatele extends GContentBase implements IGContent {
        private ekoParams;
        private listMonth;
        private rezimDPHtxt;
        filterOptions: Gordic.Ucr.WebClient.Dto.GFilterOptionsDto;
        private $filterPanel;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private TypUlohy;
        editovatPermit: Gordic.General.ApplicationInterface.GPermission;
        AvoidUus: boolean;
        AvoidNks: boolean;
        AvoidExt: boolean;
        private Globals;
        private loadingData;
        private: string;
        onContentReady(): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Prevedeni kliku na bunku do filtru a nacteni
         * @param ev
         */
        private dispatchFillServerGridEvent;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showUkazatel;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showHistory;
        /**
         * Zobrazeni detailu ukazatele
         * @param radek
         */
        private showNotes;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private getFilter;
        /**
         *  Nacteni dat
         */
        private loadData;
        /**
         * Vytvoreni gridformatu dle predlohy
         *
         * @param colDefinition
         */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Uschovna\GSeznamUschovna.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Seznam pozadavku
     *
     * @author tkares
     * @since 484.1.0.69
    */
    class GSeznamUschovna extends GContentBase implements IGContent {
        private $filterPanel;
        $grid: JQuery<HTMLElement>;
        private ekoParams;
        private firstLoad;
        private currentMonth;
        private currentRok;
        private previewController;
        title: string;
        onContentReady(): void;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        private getTopologie;
        /**
         * Prevod formatu textu na id (xxx_id)
         *
         * @param src
         */
        private getId;
        /**
         * Nacteni casti vykazu
         * @param filtr
         */
        loadCasti(filtr: Gordic.Ucr.WebClient.GUcrTreeUschovnaDto): JQueryPromise<Gordic.Ucr.WebClient.GUcrTreeUschovnaDto[]>;
        /**
         *  Nacteni dat
         */
        loadData(filtr?: any): JQueryPromise<Gordic.Ucr.WebClient.GUcrTreeUschovnaDto[]>;
        /**
         * Doplneni subkategorie
         * @param rootItems
         * @param primaryKey
         * @param subkategorie
         */
        private addSubKategorie;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Vyhled\GSeznamBalancovani.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamBalancovani extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        private insAct;
        private clearAndFilterAct;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        protected setSumBar(sumRow: MetaRow<IGSeznamZapisuStavuDtoWithTabSettings>, $souctySpn: JQuery<HTMLElement>): void;
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
        * Zmena focusu radku
        *
        */
        protected changeSelect(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
        * Vytvoreni klavesovych zkratek
        *
        * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Vyhled\GSeznamEkoPrimPozadavky.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoPrimPozadavky extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        private clearAndFilterAct;
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
         * Definice menu
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
        * Zmena focusu radku
        *
        */
        protected changeSelect(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
        * Vytvoreni klavesovych zkratek
        *
        * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        createActions(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\VYK\GDetailDoplHodnoty.d.ts 

declare namespace Gordic.Ucr.WebClient {
    export interface GVykColHodnoty extends Gordic.Uct.Interface.GVykColValueDto {
        combo: boolean;
    }
    export interface IGDetailDoplHodnotyOptions {
        currentRow: Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto;
        cols?: GSloupce[];
        viewMode: boolean;
        editCols?: GVykColHodnoty[];
        topologie: Gordic.Uct.Interface.GVykazTopologieDto;
        rok: number;
        mesic: number;
    }
    const enum GETypeValue {
        Date = 0,
        DateTime = 1,
        String = 2,
        Number = 3,
        Decimal = 4,
        Integer = 5,
        Combo = 6,
        File = 7
    }
    export interface GSloupce extends Gordic.Uct.Interface.GVyksvkhDto {
        max: any;
        min: any;
        type: GETypeValue;
        patern: string;
        name: string;
        maxLen: number;
        minLen: number;
        title: string;
        por_opak: number;
    }
    export interface GColsOptions {
        form: Gordic.Forms.Form;
        max: any;
        min: any;
        type: GETypeValue;
        cel: string;
        title: string;
        minLen: number;
        maxLen: number;
        grid: boolean;
        value?: any;
        por_opak: number;
        pattern_du?: string | null;
        data: Gordic.Uct.Interface.GVykdvkhHodnotyDto;
    }
    export class GDetailDoplHodnoty extends GContentBase {
        uid: string;
        private myPanel;
        /**
         * trida gridu
         */
        protected classGrid: string;
        private inputValues;
        private myGridFormat;
        private myForm;
        private editing;
        private reload;
        private defSloupcu;
        prepareContent(options: IGDetailDoplHodnotyOptions): void;
        init(options: IGDetailDoplHodnotyOptions): void;
        /**
         * Vraci objekt gridu
         * @returns
        */
        protected getGrid(): JQuery<HTMLElement> | null;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
        /**
         * Odstranit radek
         *
         * */
        private OdstranitRadek;
        /**
         * Uprava viditelnosti akci
         *
         * */
        private setActions;
        /**
         * Prevod formatu textu na id (xxx_id)
         *
         * @param src
         */
        private getId;
        /**
         * Nacteni hodnot
         * @param filtr
         */
        private loadHodnoty;
        private getCombo;
        /**
         * Vytvoreni policka pro zadani hodnoty
         * @param input
         */
        private createCol;
        /**
         * Vycisteni prvku
         *
         * */
        private clearControls;
        /**
         *  Zjisteni typu slouce
         *
         *
         * @param pattern
         */
        private getTypeCol;
        /**
         * Vytvoreni sloupcu
         * @param currentRow
         * @param data
         */
        private createCols;
        /**
         * Nromalizace pro numericke cislo
         *
         * @param source
         */
        private normalizeForMumeric;
        /**
         * Nacteni casti vykazu
         * @param filtr
         */
        loadSloupce(filtr: Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto): JQueryPromise<GSloupce[]>;
        /**
         * Ulozeni hodnot
         *
         * */
        private Save;
        /**
         * Kopirovani predchazejici
         *
         * */
        private CopySelect;
        /**
        * Formular pro zadani popisu radku
        * @param {GUctDetail} content
        */
        private VyberObdobi;
        /**
         * Kopirovani predchazejici
         *
         * */
        private CopyPreview;
        /**
         * Kopirovani z minulych let
         *
         * */
        private Copy;
        /**
         * Novy radek
         * */
        private NovyRadek;
    }
    export class GVyberObdobiKopirovani extends GContentBase {
        uid: string;
        private selectGrid;
        /**
         * Vybrany radek
         * */
        private selectedRow;
        prepareContent(data: any): void;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
    export {};
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\VYK\GSeznamDoplnkoveUdaje.d.ts 

declare namespace Gordic.Ucr.WebClient {
    /**
     * Seznam pozadavku
     *
     * @author tkares
     * @since 484.1.0.69
    */
    class GSeznamDoplnkoveUdaje extends GContentBase implements IGContent {
        private $filterPanel;
        $grid: JQuery<HTMLElement>;
        private ekoParams;
        private firstLoad;
        private currentMonth;
        private currentRok;
        private previewController;
        title: string;
        onContentReady(): void;
        /**
         * Nastaveni pristupnosti akci dle stavu
         *
         */
        private enableActions;
        /**
         *
         * Vraceni instance gridu
         *
         */
        private getGrid;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private CreateFilterZalozka;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        private getTopologie;
        /**
         * Prevod formatu textu na id (xxx_id)
         *
         * @param src
         */
        private getId;
        /**
         * Nacteni casti vykazu
         * @param filtr
         */
        loadCasti(filtr: Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto): JQueryPromise<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>;
        /**
         *  Nacteni dat
         */
        loadData(filtr?: any): JQueryPromise<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Zapisy\GEditaceZapisu.d.ts 

declare namespace Gordic.Ucr.WebClient {
    interface IEditaceZapisuOptions {
        currentRow: any;
        cols: Gordic.Uct.Interface.GEkocskoDto[];
        viewMode: boolean;
    }
    class GEditaceZapisu extends GContentBase implements IGContent {
        uid: string;
        private editGrid;
        private inputValues;
        title: string;
        onContentReady(): void;
        prepareContent(options: IEditaceZapisuOptions): void;
        init(options: IEditaceZapisuOptions): void;
        /**
         * Vytvoreni akci
         * */
        private createActions;
        /**
         * Ulozeni radku
         *
         */
        private save;
        private getFormOptions;
        /**
         * Vyplneni dat
         * @param form
         */
        private fillValues;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Zapisy\GSeznamEkoRozZapis.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoRozZapis extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
        sumLimit: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
        * Vytvoreni klavesovych zkratek
        *
        * */
        protected createShortCut(): void;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        /**
         *  Vytvoření akcí
         *
         */
        createActions(): void;
        /**
         * Pregenerovani griformatu
         * @returns
         */
        private reCreateGridFormat;
        /**
         * Udalost pred vlastnim nactenim. Lze zrusit nacteni
         * @returns
         */
        protected beforeLoading(): boolean;
        /**
         * Zobrazeni formulare se zapisy
         */
        showZapisy(): void;
        /**
         * Definice menu baru
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ucr.WebClient\Scripts\Controls\Zapisy\GSeznamEkoUctZapis.d.ts 

declare namespace Gordic.Ucr.WebClient {
    class GSeznamEkoUctZapis extends GSeznamEkoZaznamuBase implements IGContent {
        /** Globalni modulove parametry v JS */
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        constructor(content: GSeznamEkoZaznamuBaseContent);
        /**
        * Zmena focusu radku
        *
        */
        protected changeSelect(): void;
        /**
         * Nastaveni pristupnosti akci
         *
         * */
        nastaveniAkci(grid: JQuery<HTMLElement>, pocetRadku: number): void;
        /**
          * Nacti filtry
          * @param that
          * @param req
          * @param next
          */
        protected getFilterData(that: this, req: Isl.GServiceListRequest, next: Isl.TaskRuntimeNext<Isl.GServiceListRequest, Isl.GServiceListResponse<any>> | Isl.TaskRuntimeNext<Isl.GServiceListRequest, number>): Isl.GServiceListResponse<any> | JQueryPromise<Isl.GServiceListResponse<any>> | JQueryPromise<number>;
        /**
         * Vytvoreni klavesovych zkratek
         *
         * */
        protected createShortCut(): void;
        createGridFormat(typeZapis?: "Detail"): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>;
        createProfiles(gf: Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>): IGSeznamZapisuProfiles;
        /**
         * Udalost pred vlastnim nactenim. Lze zrusit nacteni
         * @returns
         */
        protected beforeLoading(): boolean;
        /**
         * Pregenerovani griformatu
         * @returns
         */
        private reCreateGridFormat;
        /**
         * Vytvoreni akci
         *
         */
        createActions(): void;
        createFilterPanel(): void;
        /**
         * Zobrazeni zapisu
         */
        showZapisy(): void;
        /**
         * Zobrazeni dokladu o zauctovani
         */
        protected showDokladZauc(): JQuery.Promise<any>;
        protected getZapisFilter(): GEkoFilterDto;
        /**
         * Definice menu baru
         * @param typUlohy
         */
        protected DefineMenuBar(typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType): MenuParams[];
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

