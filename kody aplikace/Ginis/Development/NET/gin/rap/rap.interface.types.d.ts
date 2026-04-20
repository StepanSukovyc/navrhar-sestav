/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rap.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rap.Interface\Gordic.Rap.Interface.csproj
*    created     2026-02-16 14:35:22
*    files       Cis\IGStrukturaPopisuZivotniSituace.d.ts
*                Cis\IGVariantaZobrazeniZivotnichSituaci.d.ts
*                Cis\IGZdrojKontaktnichUdaju.d.ts
*                DataSet\DdpastbDto.d.ts
*                DataSet\DdpastcDto.d.ts
*                DataSet\DdpastpDto.d.ts
*                DataSet\DdpdpplDto.d.ts
*                DataSet\DetailPohledavkyDto.d.ts
*                DataSet\GDashboardPopisOrganizaceDto.d.ts
*                DataSet\GDefiniceOmezenehoPristupuDto.d.ts
*                DataSet\GDetailPohledavkyVcetneVazebDto.d.ts
*                DataSet\GFormulareTypuPohledavkyDto.d.ts
*                DataSet\GFormulareZivotniSituaceDto.d.ts
*                DataSet\GHodnotaKontaktnihoUdajeDto.d.ts
*                DataSet\GKomentarKNahlizeniNaSpisDto.d.ts
*                DataSet\GKontaktyFormulareDto.d.ts
*                DataSet\GKontaktyZivotniSituaceDto.d.ts
*                DataSet\GKontaktyZivotniSituaceFormulareDto.d.ts
*                DataSet\GKosikDto.d.ts
*                DataSet\GLogNahlizeniNaSpisDto.d.ts
*                DataSet\GLogNahlizeniNaSpisFilterDto.d.ts
*                DataSet\GMoznostiOdeslaniZadostiDto.d.ts
*                DataSet\GNastaveniPohledavkyProRokUcsDto.d.ts
*                DataSet\GNemovitostiSubjektuDto.d.ts
*                DataSet\GNotifikaceStazeniSoboruDto.d.ts
*                DataSet\Gordic.Rap.Interface.BucsplbDto.d.ts
*                DataSet\Gordic.Rap.Interface.BucvplbDto.d.ts
*                DataSet\Gordic.Rap.Interface.DetailZadostiDto.d.ts
*                DataSet\Gordic.Rap.Interface.RapssfoDto.d.ts
*                DataSet\Gordic.Rap.Interface.RapssfuDto.d.ts
*                DataSet\GOsobaOpravnenaKNahlizeniDto.d.ts
*                DataSet\GOsobaOpravnenaKNahlizeniFilterDto.d.ts
*                DataSet\GPlaceholderValueDto.d.ts
*                DataSet\GPopisnyTextUlohyDto.d.ts
*                DataSet\GPopisPohledavekDto.d.ts
*                DataSet\GPopisPohledavkyProRokUcsDto.d.ts
*                DataSet\GPopisZivotniSituaceDto.d.ts
*                DataSet\GPoplatekSeznamDto.d.ts
*                DataSet\GPoplatekSubjektuDto.d.ts
*                DataSet\GPozadavekNahlizeniNaSpisDto.d.ts
*                DataSet\GPripadNahlizeniNaSpisDto.d.ts
*                DataSet\GRapLoginInfoDto.d.ts
*                DataSet\GSkupinaPoctuOdeslaniDto.d.ts
*                DataSet\GSkupinaUlohyRap1Dto.d.ts
*                DataSet\GSkupinaUlohyRap2Dto.d.ts
*                DataSet\GSouborPripaduNahlizeniDto.d.ts
*                DataSet\GSouvisejiciFormularDto.d.ts
*                DataSet\GSouvisejiciZivotniSituaceDto.d.ts
*                DataSet\GUcastnikRizeniDto.d.ts
*                DataSet\GVazbaFormulareNaSkupinuPoctuOdeslaniDto.d.ts
*                DataSet\GVazbaZivotniSituaceNaSkupinuDto.d.ts
*                DataSet\GZastupnyZnakDto.d.ts
*                DataSet\GZaznamHledaniPoplatkuDto.d.ts
*                DataSet\GZivotniSituaceDetailDto.d.ts
*                DataSet\GZivotniSituaceDto.d.ts
*                DataSet\GZivotniSituaceTypuPohledavkyDto.d.ts
*                DataSet\GZpusobyPodaniFormulareDto.d.ts
*                DataSet\JmenoPrijmeniDto.d.ts
*                DataSet\MB00StavResponseDto.d.ts
*                DataSet\NapojeniPoplatniciEsuDto.d.ts
*                DataSet\Cis\Gordic.Rap.Interface.RapcstfDto.d.ts
*                DataSet\Cis\Gordic.Rap.Interface.RokFormulareDto.d.ts
*                DataSet\Cis\GRapcplmDto.d.ts
*                DataSet\Cis\GRapcspnDto.d.ts
*                DataSet\Cis\GRapctppDto.d.ts
*                DataSet\Cis\GRapczpoDto.d.ts
*                DataSet\Cis\GStrukturaPopisuZivotniSituaceDto.d.ts
*                DataSet\Cis\GVariantaZobrazeniZivotnichSituaciDto.d.ts
*                DataSet\Cis\GZdrojKontaktnichUdajuDto.d.ts
*                Rap\IGDashboardPopisOrganizace.d.ts
*                Rap\IGDefiniceOmezenehoPristupu.d.ts
*                Rap\IGFormulareTypuPohledavky.d.ts
*                Rap\IGFormulareZivotniSituace.d.ts
*                Rap\IGHodnotaKontaktnihoUdaje.d.ts
*                Rap\IGKomentarKNahlizeniNaSpis.d.ts
*                Rap\IGKontaktyFormulare.d.ts
*                Rap\IGKontaktyZivotniSituace.d.ts
*                Rap\IGKontaktyZivotniSituaceFormulare.d.ts
*                Rap\IGLogNahlizeniNaSpis.d.ts
*                Rap\IGNastaveniPohledavkyProRokUcs.d.ts
*                Rap\IGNemovitostiSubjektu.d.ts
*                Rap\IGOsobaOpravnenaKNahlizeni.d.ts
*                Rap\IGPopisPohledavek.d.ts
*                Rap\IGPopisPohledavkyProRokUcs.d.ts
*                Rap\IGPopisZivotniSituace.d.ts
*                Rap\IGPozadavekNahlizeniNaSpis.d.ts
*                Rap\IGPripadNahlizeniNaSpis.d.ts
*                Rap\IGSkupinaPoctuOdeslani.d.ts
*                Rap\IGSkupinaUlohyRap1.d.ts
*                Rap\IGSkupinaUlohyRap2.d.ts
*                Rap\IGSouborPripaduNahlizeni.d.ts
*                Rap\IGSouvisejiciFormular.d.ts
*                Rap\IGSouvisejiciZivotniSituace.d.ts
*                Rap\IGStavPoplatkuMagBrno.d.ts
*                Rap\IGUcastnikRizeni.d.ts
*                Rap\IGVazbaFormulareNaSkupinuPoctuOdeslani.d.ts
*                Rap\IGVazbaZivotniSituaceNaSkupinu.d.ts
*                Rap\IGZastupnyZnak.d.ts
*                Rap\IGZaznamHledaniPoplatku.d.ts
*                Rap\IGZivotniSituace.d.ts
*                Rap\IGZivotniSituaceTypuPohledavky.d.ts
*                Rap\IGZpusobyPodaniFormulare.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Cis\IGStrukturaPopisuZivotniSituace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Struktura popisu životní situace. Eviduje seznam oblastí, kterých se popis může týkat. Konkrétní popis životní situace má vždy přiřazenu jednu z těchto oblastí.
	* @domain PortalObcana
	* @businessObject ZivotniSituaceStrukturaPopisu
	*/
	interface ZivotniSituaceStrukturaPopisu {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GStrukturaPopisuZivotniSituaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GStrukturaPopisuZivotniSituaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GStrukturaPopisuZivotniSituaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GStrukturaPopisuZivotniSituaceDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GStrukturaPopisuZivotniSituaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituaceStrukturaPopisu: ServiceBase & Catalog.ZivotniSituaceStrukturaPopisu;
	}
	const ZivotniSituaceStrukturaPopisu: Client["ZivotniSituaceStrukturaPopisu"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro strukturu popisu životní situace*/
	const enum GStrukturaPopisuZivotniSituaceFilter {
		/**Kód záznamu*/
		kod_sps,
		/**Popis záznamu*/
		kod_sps_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Cis\IGVariantaZobrazeniZivotnichSituaci.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Varianta zobrazení životní situace
	* @domain PortalObcana
	* @businessObject ZivotniSituaceVariantaZobrazeni
	*/
	interface ZivotnichSituaceVariantaZobrazeni {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GVariantaZobrazeniZivotnichSituaciDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GVariantaZobrazeniZivotnichSituaciDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GVariantaZobrazeniZivotnichSituaciDto>,GServiceReadResponse<Gordic.Rap.Interface.GVariantaZobrazeniZivotnichSituaciDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GVariantaZobrazeniZivotnichSituaciDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotnichSituaceVariantaZobrazeni: ServiceBase & Catalog.ZivotnichSituaceVariantaZobrazeni;
	}
	const ZivotnichSituaceVariantaZobrazeni: Client["ZivotnichSituaceVariantaZobrazeni"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro variantu zobrazení životní situace*/
	const enum GVariantaZobrazeniZivotnichSituaciFilter {
		/**Varianta zobrazení životní situace - kód*/
		priz_var,
		/**Varianta zobrazení životní situace - kód*/
		priz_var_txt,
		/**Číslo úlohy*/
		uloha_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Cis\IGZdrojKontaktnichUdaju.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Zdroj kontaktního údaje
	* @domain PortalObcana
	* @businessObject TypKontaktuZdroj
	*/
	interface TypKontaktuZdroj {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GZdrojKontaktnichUdajuDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GZdrojKontaktnichUdajuDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GZdrojKontaktnichUdajuDto>,GServiceReadResponse<Gordic.Rap.Interface.GZdrojKontaktnichUdajuDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GZdrojKontaktnichUdajuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypKontaktuZdroj: ServiceBase & Catalog.TypKontaktuZdroj;
	}
	const TypKontaktuZdroj: Client["TypKontaktuZdroj"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro zdroj kontaktního údaje*/
	const enum GZdrojKontaktnichUdajuFilter {
		/**Zdroj kontaktního údaje - kód*/
		zdroj_kou,
		/**Zdroj kontaktního údaje - popisný text*/
		zdroj_kou_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\DdpastbDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:~*/
	interface DdpastbDto {
		/**DBCOLUMN:Ddpastb.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Ddpastb.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:Ddpastb.dat_uct*/
		dat_uct?: JsonDate|null;
		/**DBCOLUMN:Ddpastb.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:Ddpastb.pri_uhr*/
		pri_uhr?: number|null;
		/**DBCOLUMN:Ddpastb.typ_poh*/
		typ_poh?: number|null;
		/**DBCOLUMN:Ddpastb.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Ddpastb.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Ddpastb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ddpastb.ktg_upo_txt*/
		ktg_upo_txt?: string|null;
		/**DBCOLUMN:Ddpastb.dat_spl_txt*/
		dat_spl_txt?: string|null;
		/**Poznámka k předpisu - jen MB00*/
		poznamka?: string|null;
	}
	const enum DdpastbDtoNames { ixp = "ixp", dat_spl = "dat_spl", dat_uct = "dat_uct", ktg_upo = "ktg_upo", pri_uhr = "pri_uhr", typ_poh = "typ_poh", c = "c", c_mena = "c_mena", dat_zmena = "dat_zmena", ktg_upo_txt = "ktg_upo_txt", dat_spl_txt = "dat_spl_txt", poznamka = "poznamka",}
	const enum DdpastbDtoFragments { ixp = "*", dat_spl = "*", dat_uct = "*", ktg_upo = "*", pri_uhr = "*", typ_poh = "*", c = "*", c_mena = "*", dat_zmena = "*", ktg_upo_txt = "*", dat_spl_txt = "*", poznamka = "*",}
	const enum DdpastbDtoTypes { ixp = "string", dat_spl = "JsonDate", dat_uct = "JsonDate", ktg_upo = "number", pri_uhr = "number", typ_poh = "number", c = "JsonDecimal", c_mena = "JsonDecimal", dat_zmena = "JsonDate", ktg_upo_txt = "string", dat_spl_txt = "string", poznamka = "string",}
	const enum DdpastbDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\DdpastcDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Ddpastc*/
	interface DdpastcDto {
		/**PID případu, pro který se zjišťuje stav (vždy napojený plátce)*/
		ixp?: string|null;
		/**PID případu v ddpastc, může být i napojený poplatník*/
		ixp_prip?: string|null;
		/**DBCOLUMN:Ddpastc.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:Ddpastc.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:Ddpastc.pri_uhr*/
		pri_uhr?: number|null;
		/**DBCOLUMN:Ddpastc.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Ddpastc.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:Ddpastc.zbyva*/
		c_zbyva?: JsonDecimal|null;
		/**DBCOLUMN:Ddpastc.dat_uhr*/
		dat_uhr?: JsonDate|null;
		typ_phl?: string|null;
		typ_phl_nazev?: string|null;
		vs?: string|null;
		ktg_upo_txt?: string|null;
		ob_jmeno?: string|null;
		dat_nar?: string|null;
		esu_txt?: string|null;
		uhrady_txt?: string|null;
		uhrady?: Gordic.Rap.Interface.DdpastpDto[]|null;
	}
	const enum DdpastcDtoNames { ixp = "ixp", ixp_prip = "ixp_prip", dat_spl = "dat_spl", ktg_upo = "ktg_upo", pri_uhr = "pri_uhr", c = "c", c_uhr = "c_uhr", c_zbyva = "c_zbyva", dat_uhr = "dat_uhr", typ_phl = "typ_phl", typ_phl_nazev = "typ_phl_nazev", vs = "vs", ktg_upo_txt = "ktg_upo_txt", ob_jmeno = "ob_jmeno", dat_nar = "dat_nar", esu_txt = "esu_txt", uhrady_txt = "uhrady_txt", uhrady = "uhrady",}
	const enum DdpastcDtoFragments { ixp = "*", ixp_prip = "*", dat_spl = "*", ktg_upo = "*", pri_uhr = "*", c = "*", c_uhr = "*", c_zbyva = "*", dat_uhr = "*", typ_phl = "*", typ_phl_nazev = "*", vs = "*", ktg_upo_txt = "*", ob_jmeno = "*", dat_nar = "*", esu_txt = "*", uhrady_txt = "*", uhrady = "*",}
	const enum DdpastcDtoTypes { ixp = "string", ixp_prip = "string", dat_spl = "JsonDate", ktg_upo = "number", pri_uhr = "number", c = "JsonDecimal", c_uhr = "JsonDecimal", c_zbyva = "JsonDecimal", dat_uhr = "JsonDate", typ_phl = "string", typ_phl_nazev = "string", vs = "string", ktg_upo_txt = "string", ob_jmeno = "string", dat_nar = "string", esu_txt = "string", uhrady_txt = "string", uhrady = "Gordic.Rap.Interface.DdpastpDto[]",}
	const enum DdpastcDtoTypeLengths { ixp = 12, ixp_prip = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\DdpastpDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Ddpastp*/
	interface DdpastpDto {
		/**DBCOLUMN:Ddpastp.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Ddpastp.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:Ddpastp.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:Ddpastp.pri_uhr*/
		pri_uhr?: number|null;
		/**DBCOLUMN:Ddpastp.dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**DBCOLUMN:Ddpastp.c_uhr*/
		c_uhr?: JsonDecimal|null;
	}
	const enum DdpastpDtoNames { ixp = "ixp", dat_spl = "dat_spl", ktg_upo = "ktg_upo", pri_uhr = "pri_uhr", dat_uhr = "dat_uhr", c_uhr = "c_uhr",}
	const enum DdpastpDtoFragments { ixp = "*", dat_spl = "*", ktg_upo = "*", pri_uhr = "*", dat_uhr = "*", c_uhr = "*",}
	const enum DdpastpDtoTypes { ixp = "string", dat_spl = "JsonDate", ktg_upo = "number", pri_uhr = "number", dat_uhr = "JsonDate", c_uhr = "JsonDecimal",}
	const enum DdpastpDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\DdpdpplDto.d.ts 

declare namespace Gordic.Rap.Interface {
    /**DBTABLE:Ddpdppl*/
    interface DdpdpplDto {
        /**DBCOLUMN:Ddpdppl.id_ppl*/
        id_ppl?: string|null;
        /**DBCOLUMN:Ddpdppl.dat_vyv*/
        dat_vyv?: JsonDate|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\DetailPohledavkyDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:DetailPohledavky*/
	interface DetailPohledavkyDto {
		/**DBCOLUMN:DetailPohledavky.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:DetailPohledavky.ixp*/
		nazev_pohledavky?: string|null;
		/**DBCOLUMN:DetailPohledavky.vs*/
		vs?: string|null;
		/**DBCOLUMN:DetailPohledavky.poc_splatek*/
		poc_splatek?: string|null;
		/**DBCOLUMN:DetailPohledavky.zp*/
		zp?: string|null;
		/**DBCOLUMN:DetailPohledavky.zp_txt*/
		zp_txt?: string|null;
		/**DBCOLUMN:DetailPohledavky.ac*/
		ac?: string|null;
		/**DBCOLUMN:DetailPohledavky.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:DetailPohledavky.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:DetailPohledavky.ss*/
		ss?: string|null;
		/**DBCOLUMN:DetailPohledavky.bu_ci*/
		ks?: string|null;
		/**DBCOLUMN:DetailPohledavky.radek_nazev*/
		radek_nazev?: string|null;
		/**DBCOLUMN:DetailPohledavky.ctvrt_nazev*/
		ctvrt_nazev?: string|null;
		/**DBCOLUMN:DetailPohledavky.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:DetailPohledavky.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:DetailPohledavky.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:DetailPohledavky.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:DetailPohledavky.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:DetailPohledavky.esu_ob_jmeno*/
		esu_ob_jmeno?: string|null;
		/**DBCOLUMN:DetailPohledavky.esu_nazev*/
		esu_nazev?: string|null;
		/**DBCOLUMN:DetailPohledavky.esu_adresa*/
		esu_adresa?: string|null;
		esu_ulice?: string|null;
		esu_cor?: string|null;
		esu_cpop?: string|null;
		esu_obec?: string|null;
		esu_cast_obce?: string|null;
		esu_psc?: string|null;
		/**DBCOLUMN:DetailPohledavky.dat_nar*/
		dat_nar?: JsonDate|null;
		/**DBCOLUMN:DetailPohledavky.kontakt_nazev_rf*/
		kontakt_nazev_rf?: string|null;
		/**DBCOLUMN:DetailPohledavky.kontakt_nazev_ref*/
		kontakt_nazev_ref?: string|null;
		/**DBCOLUMN:DetailPohledavky.kontakt_tel*/
		kontakt_tel?: string|null;
		/**DBCOLUMN:DetailPohledavky.kontakt_mail*/
		kontakt_mail?: string|null;
		/**DBCOLUMN:DetailPohledavky.c_dluh*/
		c_dluh?: JsonDecimal|null;
		/**DBCOLUMN:DetailPohledavky.c_dluh_a_nasl_predpis*/
		c_dluh_a_nasl_predpis?: JsonDecimal|null;
		/**DBCOLUMN:DetailPohledavky.c_dluh_a_vsechny_predpisy*/
		c_dluh_a_vsechny_predpisy?: JsonDecimal|null;
		/**DBCOLUMN:DetailPohledavky.nasl_dat_spl*/
		nasl_dat_spl?: string|null;
		/**DBCOLUMN:DetailPohledavky.nejstarsi_dat_spl*/
		nejstarsi_dat_spl?: string|null;
		/**DBCOLUMN:DetailPohledavky.c_do_splatnost*/
		c_do_splatnosti?: JsonDecimal|null;
		/**DBCOLUMN:DetailPohledavky.c_nasl_dat_spl*/
		c_nasl_dat_spl?: JsonDecimal|null;
		/**DBCOLUMN:DetailPohledavky.typ_evid*/
		typ_evid?: number|null;
		/**DBCOLUMN:DetailPohledavky.priz_zobr_rad*/
		priz_zobr_rad?: number|null;
		/**DBCOLUMN:DetailPohledavky.priz_zobr_ctv*/
		priz_zobr_ctv?: number|null;
		message?: string|null;
		urlQR?: string|null;
		/**DBCOLUMN:DetailPohledavky.c_predpisy_akt_rok*/
		c_predpisy_akt_rok?: JsonDecimal|null;
		priz_platce?: number|null;
		platce_esu_txt?: string|null;
		platce_ob_jmeno?: string|null;
		platce_adresa?: string|null;
		platce_ulice?: string|null;
		platce_cor?: string|null;
		platce_cpop?: string|null;
		platce_obec?: string|null;
		platce_cast_obce?: string|null;
		platce_psc?: string|null;
		priz_nap_platce?: number|null;
		prip_c_dluh?: JsonDecimal|null;
		prip_c_dluh_a_nasl_predpis?: JsonDecimal|null;
		prip_c_dluh_a_vsechny_predpisy?: JsonDecimal|null;
		prip_nasl_dat_spl?: string|null;
		prip_c_do_splatnosti?: JsonDecimal|null;
		prip_c_nasl_dat_spl?: JsonDecimal|null;
		dat_spl_saldo?: JsonDate|null;
		c_spl_saldo?: JsonDecimal|null;
		prip_c_spl_saldo?: JsonDecimal|null;
		priz_zobr_dok?: number|null;
		/**DBCOLUMN:DetailPohledavky.typ_phl*/
		typ_phl?: string|null;
	}
	const enum DetailPohledavkyDtoNames { ixp = "ixp", nazev_pohledavky = "nazev_pohledavky", vs = "vs", poc_splatek = "poc_splatek", zp = "zp", zp_txt = "zp_txt", ac = "ac", bu_vl = "bu_vl", sk_vl = "sk_vl", ss = "ss", ks = "ks", radek_nazev = "radek_nazev", ctvrt_nazev = "ctvrt_nazev", dat_od = "dat_od", dat_do = "dat_do", dat_evid = "dat_evid", c_celk = "c_celk", esu_txt = "esu_txt", esu_ob_jmeno = "esu_ob_jmeno", esu_nazev = "esu_nazev", esu_adresa = "esu_adresa", esu_ulice = "esu_ulice", esu_cor = "esu_cor", esu_cpop = "esu_cpop", esu_obec = "esu_obec", esu_cast_obce = "esu_cast_obce", esu_psc = "esu_psc", dat_nar = "dat_nar", kontakt_nazev_rf = "kontakt_nazev_rf", kontakt_nazev_ref = "kontakt_nazev_ref", kontakt_tel = "kontakt_tel", kontakt_mail = "kontakt_mail", c_dluh = "c_dluh", c_dluh_a_nasl_predpis = "c_dluh_a_nasl_predpis", c_dluh_a_vsechny_predpisy = "c_dluh_a_vsechny_predpisy", nasl_dat_spl = "nasl_dat_spl", nejstarsi_dat_spl = "nejstarsi_dat_spl", c_do_splatnosti = "c_do_splatnosti", c_nasl_dat_spl = "c_nasl_dat_spl", typ_evid = "typ_evid", priz_zobr_rad = "priz_zobr_rad", priz_zobr_ctv = "priz_zobr_ctv", message = "message", urlQR = "urlQR", c_predpisy_akt_rok = "c_predpisy_akt_rok", priz_platce = "priz_platce", platce_esu_txt = "platce_esu_txt", platce_ob_jmeno = "platce_ob_jmeno", platce_adresa = "platce_adresa", platce_ulice = "platce_ulice", platce_cor = "platce_cor", platce_cpop = "platce_cpop", platce_obec = "platce_obec", platce_cast_obce = "platce_cast_obce", platce_psc = "platce_psc", priz_nap_platce = "priz_nap_platce", prip_c_dluh = "prip_c_dluh", prip_c_dluh_a_nasl_predpis = "prip_c_dluh_a_nasl_predpis", prip_c_dluh_a_vsechny_predpisy = "prip_c_dluh_a_vsechny_predpisy", prip_nasl_dat_spl = "prip_nasl_dat_spl", prip_c_do_splatnosti = "prip_c_do_splatnosti", prip_c_nasl_dat_spl = "prip_c_nasl_dat_spl", dat_spl_saldo = "dat_spl_saldo", c_spl_saldo = "c_spl_saldo", prip_c_spl_saldo = "prip_c_spl_saldo", priz_zobr_dok = "priz_zobr_dok", typ_phl = "typ_phl",}
	const enum DetailPohledavkyDtoFragments { ixp = "*", nazev_pohledavky = "*", vs = "*", poc_splatek = "*", zp = "*", zp_txt = "*", ac = "*", bu_vl = "*", sk_vl = "*", ss = "*", ks = "*", radek_nazev = "*", ctvrt_nazev = "*", dat_od = "*", dat_do = "*", dat_evid = "*", c_celk = "*", esu_txt = "*", esu_ob_jmeno = "*", esu_nazev = "*", esu_adresa = "*", esu_ulice = "*", esu_cor = "*", esu_cpop = "*", esu_obec = "*", esu_cast_obce = "*", esu_psc = "*", dat_nar = "*", kontakt_nazev_rf = "*", kontakt_nazev_ref = "*", kontakt_tel = "*", kontakt_mail = "*", c_dluh = "*", c_dluh_a_nasl_predpis = "*", c_dluh_a_vsechny_predpisy = "*", nasl_dat_spl = "*", nejstarsi_dat_spl = "*", c_do_splatnosti = "*", c_nasl_dat_spl = "*", typ_evid = "*", priz_zobr_rad = "*", priz_zobr_ctv = "*", message = "*", urlQR = "*", c_predpisy_akt_rok = "*", priz_platce = "*", platce_esu_txt = "*", platce_ob_jmeno = "*", platce_adresa = "*", platce_ulice = "*", platce_cor = "*", platce_cpop = "*", platce_obec = "*", platce_cast_obce = "*", platce_psc = "*", priz_nap_platce = "*", prip_c_dluh = "*", prip_c_dluh_a_nasl_predpis = "*", prip_c_dluh_a_vsechny_predpisy = "*", prip_nasl_dat_spl = "*", prip_c_do_splatnosti = "*", prip_c_nasl_dat_spl = "*", dat_spl_saldo = "*", c_spl_saldo = "*", prip_c_spl_saldo = "*", priz_zobr_dok = "*", typ_phl = "*",}
	const enum DetailPohledavkyDtoTypes { ixp = "string", nazev_pohledavky = "string", vs = "string", poc_splatek = "string", zp = "string", zp_txt = "string", ac = "string", bu_vl = "string", sk_vl = "string", ss = "string", ks = "string", radek_nazev = "string", ctvrt_nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_evid = "JsonDate", c_celk = "JsonDecimal", esu_txt = "string", esu_ob_jmeno = "string", esu_nazev = "string", esu_adresa = "string", esu_ulice = "string", esu_cor = "string", esu_cpop = "string", esu_obec = "string", esu_cast_obce = "string", esu_psc = "string", dat_nar = "JsonDate", kontakt_nazev_rf = "string", kontakt_nazev_ref = "string", kontakt_tel = "string", kontakt_mail = "string", c_dluh = "JsonDecimal", c_dluh_a_nasl_predpis = "JsonDecimal", c_dluh_a_vsechny_predpisy = "JsonDecimal", nasl_dat_spl = "string", nejstarsi_dat_spl = "string", c_do_splatnosti = "JsonDecimal", c_nasl_dat_spl = "JsonDecimal", typ_evid = "number", priz_zobr_rad = "number", priz_zobr_ctv = "number", message = "string", urlQR = "string", c_predpisy_akt_rok = "JsonDecimal", priz_platce = "number", platce_esu_txt = "string", platce_ob_jmeno = "string", platce_adresa = "string", platce_ulice = "string", platce_cor = "string", platce_cpop = "string", platce_obec = "string", platce_cast_obce = "string", platce_psc = "string", priz_nap_platce = "number", prip_c_dluh = "JsonDecimal", prip_c_dluh_a_nasl_predpis = "JsonDecimal", prip_c_dluh_a_vsechny_predpisy = "JsonDecimal", prip_nasl_dat_spl = "string", prip_c_do_splatnosti = "JsonDecimal", prip_c_nasl_dat_spl = "JsonDecimal", dat_spl_saldo = "JsonDate", c_spl_saldo = "JsonDecimal", prip_c_spl_saldo = "JsonDecimal", priz_zobr_dok = "number", typ_phl = "string",}
	const enum DetailPohledavkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GDashboardPopisOrganizaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Popis organizace*/
	interface GDashboardPopisOrganizaceDto {
		/**IČO*/
		ico?: string|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Identifikátor subjektu organizace*/
		ixs_esu?: string|null;
		/**Popisný text*/
		popis?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GDashboardPopisOrganizaceDtoNames { ico = "ico", por_cislo = "por_cislo", ixs_esu = "ixs_esu", popis = "popis", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GDashboardPopisOrganizaceDtoFragments { ico = "*", por_cislo = "*", ixs_esu = "*", popis = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GDashboardPopisOrganizaceDtoTypes { ico = "string", por_cislo = "number", ixs_esu = "string", popis = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GDashboardPopisOrganizaceDtoTypeLengths { ico = 10, ixs_esu = 12, popis = 5000, aktivita_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GDefiniceOmezenehoPristupuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Nahlížení na spis - definice omezení přístupu*/
	interface GDefiniceOmezenehoPristupuDto {
		/**Identifikátor definice omezení přístupu*/
		ixs_tpp?: string|null;
		/**Název omezení přístupu*/
		nazev?: string|null;
		/**Typ přístupu - kód*/
		typ_prist_nah?: number|null;
		/**Typ přístupu - textový popis*/
		typ_prist_nah_txt?: string|null;
		/**Počet hodin do expirace přístupu, který se začíná počítat od prvního stažení souboru*/
		poc_hod_exp?: number|null;
		/**Počet dní do expirace přístupu, který se začíná počítat od prvního stažení souboru*/
		poc_dni_exp?: number|null;
		/**Počet hodin od zveřejnění, dokdy musí být soubor poprvé stažen, jinak dojde k expiraci*/
		poc_hod_exp_max?: number|null;
		/**Počet dní od zveřejnění, dokdy musí být soubor poprvé stažen, jinak dojde k expiraci*/
		poc_dni_exp_max?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GDefiniceOmezenehoPristupuDtoNames { ixs_tpp = "ixs_tpp", nazev = "nazev", typ_prist_nah = "typ_prist_nah", typ_prist_nah_txt = "typ_prist_nah_txt", poc_hod_exp = "poc_hod_exp", poc_dni_exp = "poc_dni_exp", poc_hod_exp_max = "poc_hod_exp_max", poc_dni_exp_max = "poc_dni_exp_max", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GDefiniceOmezenehoPristupuDtoFragments { ixs_tpp = "*", nazev = "*", typ_prist_nah = "*", typ_prist_nah_txt = "*", poc_hod_exp = "*", poc_dni_exp = "*", poc_hod_exp_max = "*", poc_dni_exp_max = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GDefiniceOmezenehoPristupuDtoTypes { ixs_tpp = "string", nazev = "string", typ_prist_nah = "number", typ_prist_nah_txt = "string", poc_hod_exp = "number", poc_dni_exp = "number", poc_hod_exp_max = "number", poc_dni_exp_max = "number", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GDefiniceOmezenehoPristupuDtoTypeLengths { ixs_tpp = 12, nazev = 254, typ_prist_nah_txt = 50, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GDetailPohledavkyVcetneVazebDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DTO pro data nad detailem pohledávky*/
	interface GDetailPohledavkyVcetneVazebDto {
		/**Ixp případu*/
		Ixp?: string|null;
		/**Údaje k detailu*/
		DetailDto?: Gordic.Rap.Interface.DetailPohledavkyDto|null;
		/**Ddpastc*/
		PrehledStavuDto?: Gordic.Rap.Interface.DdpastcDto[]|null;
		/**Napojené případy*/
		NapojenePripadyDto?: Gordic.Rap.Interface.NapojeniPoplatniciEsuDto[]|null;
		/**Napojené svozy popelnic*/
		NapojenePopelniceDto?: Gordic.Rap.Interface.DdpdpplDto[]|null;
		/**Předpisy*/
		PredpisyDto?: Gordic.Rap.Interface.DdpastbDto[]|null;
		/**Platby*/
		PlatbyDto?: Gordic.Rap.Interface.DdpastbDto[]|null;
		/**Provedené avizace*/
		AvizaceDto?: Gordic.Ddp.Interface.DdpsaplDto[]|null;
		/**QR kód*/
		QRkod?: string|null;
		/**Formuláře typu pohledávky*/
		FormulareTypuPohledavky?: Gordic.Rap.Interface.GFormulareTypuPohledavkyDto[]|null;
		/**Potvrzení pro typ pohledávky*/
		PotvrzeniTypuPohledavky?: Gordic.Rap.Interface.GFormulareTypuPohledavkyDto|null;
		/**Životní situace typu pohledávky*/
		ZivotniSituaceTypuPohledavky?: Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto[]|null;
		/**povolení oddělené platby pro dílčí případy skupiny*/
		DetachedPaymentEnabled?: boolean|null;
		/**příznak přístupu ke GP Webpay*/
		GPWebPayEnabled?: boolean|null;
		/**příznak otevřeného období BUC*/
		OtevreneObdobiPlatby?: boolean|null;
		/**příznak přístupu k PayU*/
		PayUEnabled?: boolean|null;
		/**příznak přístupu k GoPay*/
		GoPayEnabled?: boolean|null;
		/**příznak přístupu k ČSOB*/
		CSOBEnabled?: boolean|null;
		/**příznak přístupu k Pays*/
		PaysEnabled?: boolean|null;
		/**podpora nákupního košíku*/
		CartSupport?: boolean|null;
		/**příznak přístupu ke svozům popelnic*/
		BinsEnabled?: boolean|null;
		/**Hláška po návratu z platební brány*/
		Message?: string|null;
		/**Mail případu*/
		Mail?: string|null;
		/**Maximální částka platby*/
		MaxCastkaPlatby?: JsonDecimal|null;
		/**Seznam psů*/
		SeznamPsuDto?: Gordic.Psi.Interface.SeznamPsuDto[]|null;
		/**Seznam el. příloh*/
		ElPrilohyDto?: Gordic.Wfl.Interface.GElektronickySouborDto[]|null;
		/**Seznam hrobových míst*/
		SeznamHMDto?: Gordic.Shm.Interface.ShmvpidDto[]|null;
		/**Typ pohledávky*/
		TypPhl?: string|null;
		/**Licence*/
		Lic?: string|null;
		/**Licence*/
		testMVNM?: boolean|null;
		/**Vyplněný email*/
		VyplnenyMail?: boolean|null;
		/**Informace k platbě*/
		PaymentInfo?: string|null;
		/**Popis k závazku*/
		PopisHlavicka?: string|null;
		/**Popis k předpisům*/
		PopisPredpisy?: string|null;
		/**Popis k platbám*/
		PopisPlatby?: string|null;
		/**Popis k platbám*/
		PopisStavyZaplaceni?: string|null;
		/**Popis k tlačítku zaplatit*/
		PopisZaplatit?: string|null;
		/**Popis ke způsobu úhrady - obecný*/
		PopisZpusobUhrady?: string|null;
		/**Popis k platbě převodem*/
		PopisUcet?: string|null;
		/**Popis k platbě QR kódem*/
		PopisQR?: string|null;
		/**Popis k platbě platební bránou*/
		PopisBrana?: string|null;
		/**Popis k vazbě na formuláře*/
		PopisFormulare?: string|null;
		/**Popis k vazbě na životní situace*/
		PopisZivotniSituace?: string|null;
		/**Popis k vazbě na psy*/
		PopisPsi?: string|null;
		/**Popis k vazbě na hroby*/
		PopisHroby?: string|null;
		/**Popis k vazbě na svoy popelnic*/
		PopisPopelnice?: string|null;
		/**Popis k vazbě na napojené poplatníky*/
		PopisNapojeniPoplatnici?: string|null;
		/**Slevy*/
		Slevy?: Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto|null;
		/**Byla poskytnuta sleva*/
		SlevaPoskytnuta?: boolean|null;
		/**Text ke slevě*/
		SlevaText?: string|null;
		/**Způsob výběru částky*/
		SumSelection?: string|null;
		/**Předplněná částka pro zadání*/
		SumPreset?: JsonDecimal|null;
		/**Typ autorizace*/
		TypAutorizace?: string|null;
		/**Případy s nezpracovanou platbou*/
		NeuzavrenePlatbyPripady?: string[]|null;
		/**Zobrazit předpisy*/
		AssessmentsVisible?: boolean|null;
		/**Zobrazit na seznamu předpisů adresu nemovitosti*/
		AssessmentsAddressVisible?: boolean|null;
		/**Zobrazit platby*/
		PaymentsVisible?: boolean|null;
		/**Zobrazit napojené poplatníky*/
		LinkedPersonsVisible?: boolean|null;
		/**Zobrazit psy*/
		LinkedDogsVisible?: boolean|null;
		/**Zobrazit hroby*/
		LinkedGravesVisible?: boolean|null;
		/**Zobrazit avizace*/
		LinkedNotificationsVisible?: boolean|null;
		/**Zobrazit přehled stavu zaplacení předpisů*/
		DetailedBalanceVisible?: boolean|null;
		/**Zobrazit předpisy celkem*/
		TotalAssessmentVisible?: boolean|null;
		/**Zobrazit osobní údaje*/
		ShowPersonalData?: boolean|null;
		/**Debug mode*/
		DebugMode?: boolean|null;
		/**Zobrazit souvusející dokumenty*/
		LinkedDocumentsVisible?: boolean|null;
	}
	const enum GDetailPohledavkyVcetneVazebDtoNames { Ixp = "Ixp", DetailDto = "DetailDto", PrehledStavuDto = "PrehledStavuDto", NapojenePripadyDto = "NapojenePripadyDto", NapojenePopelniceDto = "NapojenePopelniceDto", PredpisyDto = "PredpisyDto", PlatbyDto = "PlatbyDto", AvizaceDto = "AvizaceDto", QRkod = "QRkod", FormulareTypuPohledavky = "FormulareTypuPohledavky", PotvrzeniTypuPohledavky = "PotvrzeniTypuPohledavky", ZivotniSituaceTypuPohledavky = "ZivotniSituaceTypuPohledavky", DetachedPaymentEnabled = "DetachedPaymentEnabled", GPWebPayEnabled = "GPWebPayEnabled", OtevreneObdobiPlatby = "OtevreneObdobiPlatby", PayUEnabled = "PayUEnabled", GoPayEnabled = "GoPayEnabled", CSOBEnabled = "CSOBEnabled", PaysEnabled = "PaysEnabled", CartSupport = "CartSupport", BinsEnabled = "BinsEnabled", Message = "Message", Mail = "Mail", MaxCastkaPlatby = "MaxCastkaPlatby", SeznamPsuDto = "SeznamPsuDto", ElPrilohyDto = "ElPrilohyDto", SeznamHMDto = "SeznamHMDto", TypPhl = "TypPhl", Lic = "Lic", testMVNM = "testMVNM", VyplnenyMail = "VyplnenyMail", PaymentInfo = "PaymentInfo", PopisHlavicka = "PopisHlavicka", PopisPredpisy = "PopisPredpisy", PopisPlatby = "PopisPlatby", PopisStavyZaplaceni = "PopisStavyZaplaceni", PopisZaplatit = "PopisZaplatit", PopisZpusobUhrady = "PopisZpusobUhrady", PopisUcet = "PopisUcet", PopisQR = "PopisQR", PopisBrana = "PopisBrana", PopisFormulare = "PopisFormulare", PopisZivotniSituace = "PopisZivotniSituace", PopisPsi = "PopisPsi", PopisHroby = "PopisHroby", PopisPopelnice = "PopisPopelnice", PopisNapojeniPoplatnici = "PopisNapojeniPoplatnici", Slevy = "Slevy", SlevaPoskytnuta = "SlevaPoskytnuta", SlevaText = "SlevaText", SumSelection = "SumSelection", SumPreset = "SumPreset", TypAutorizace = "TypAutorizace", NeuzavrenePlatbyPripady = "NeuzavrenePlatbyPripady", AssessmentsVisible = "AssessmentsVisible", AssessmentsAddressVisible = "AssessmentsAddressVisible", PaymentsVisible = "PaymentsVisible", LinkedPersonsVisible = "LinkedPersonsVisible", LinkedDogsVisible = "LinkedDogsVisible", LinkedGravesVisible = "LinkedGravesVisible", LinkedNotificationsVisible = "LinkedNotificationsVisible", DetailedBalanceVisible = "DetailedBalanceVisible", TotalAssessmentVisible = "TotalAssessmentVisible", ShowPersonalData = "ShowPersonalData", DebugMode = "DebugMode", LinkedDocumentsVisible = "LinkedDocumentsVisible",}
	const enum GDetailPohledavkyVcetneVazebDtoFragments { Ixp = "*", DetailDto = "*", PrehledStavuDto = "*", NapojenePripadyDto = "*", NapojenePopelniceDto = "*", PredpisyDto = "*", PlatbyDto = "*", AvizaceDto = "*", QRkod = "*", FormulareTypuPohledavky = "*", PotvrzeniTypuPohledavky = "*", ZivotniSituaceTypuPohledavky = "*", DetachedPaymentEnabled = "*", GPWebPayEnabled = "*", OtevreneObdobiPlatby = "*", PayUEnabled = "*", GoPayEnabled = "*", CSOBEnabled = "*", PaysEnabled = "*", CartSupport = "*", BinsEnabled = "*", Message = "*", Mail = "*", MaxCastkaPlatby = "*", SeznamPsuDto = "*", ElPrilohyDto = "*", SeznamHMDto = "*", TypPhl = "*", Lic = "*", testMVNM = "*", VyplnenyMail = "*", PaymentInfo = "*", PopisHlavicka = "*", PopisPredpisy = "*", PopisPlatby = "*", PopisStavyZaplaceni = "*", PopisZaplatit = "*", PopisZpusobUhrady = "*", PopisUcet = "*", PopisQR = "*", PopisBrana = "*", PopisFormulare = "*", PopisZivotniSituace = "*", PopisPsi = "*", PopisHroby = "*", PopisPopelnice = "*", PopisNapojeniPoplatnici = "*", Slevy = "*", SlevaPoskytnuta = "*", SlevaText = "*", SumSelection = "*", SumPreset = "*", TypAutorizace = "*", NeuzavrenePlatbyPripady = "*", AssessmentsVisible = "*", AssessmentsAddressVisible = "*", PaymentsVisible = "*", LinkedPersonsVisible = "*", LinkedDogsVisible = "*", LinkedGravesVisible = "*", LinkedNotificationsVisible = "*", DetailedBalanceVisible = "*", TotalAssessmentVisible = "*", ShowPersonalData = "*", DebugMode = "*", LinkedDocumentsVisible = "*",}
	const enum GDetailPohledavkyVcetneVazebDtoTypes { Ixp = "string", DetailDto = "Gordic.Rap.Interface.DetailPohledavkyDto", PrehledStavuDto = "Gordic.Rap.Interface.DdpastcDto[]", NapojenePripadyDto = "Gordic.Rap.Interface.NapojeniPoplatniciEsuDto[]", NapojenePopelniceDto = "Gordic.Rap.Interface.DdpdpplDto[]", PredpisyDto = "Gordic.Rap.Interface.DdpastbDto[]", PlatbyDto = "Gordic.Rap.Interface.DdpastbDto[]", AvizaceDto = "Gordic.Ddp.Interface.DdpsaplDto[]", QRkod = "string", FormulareTypuPohledavky = "Gordic.Rap.Interface.GFormulareTypuPohledavkyDto[]", PotvrzeniTypuPohledavky = "Gordic.Rap.Interface.GFormulareTypuPohledavkyDto", ZivotniSituaceTypuPohledavky = "Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto[]", DetachedPaymentEnabled = "boolean", GPWebPayEnabled = "boolean", OtevreneObdobiPlatby = "boolean", PayUEnabled = "boolean", GoPayEnabled = "boolean", CSOBEnabled = "boolean", PaysEnabled = "boolean", CartSupport = "boolean", BinsEnabled = "boolean", Message = "string", Mail = "string", MaxCastkaPlatby = "JsonDecimal", SeznamPsuDto = "Gordic.Psi.Interface.SeznamPsuDto[]", ElPrilohyDto = "Gordic.Wfl.Interface.GElektronickySouborDto[]", SeznamHMDto = "Gordic.Shm.Interface.ShmvpidDto[]", TypPhl = "string", Lic = "string", testMVNM = "boolean", VyplnenyMail = "boolean", PaymentInfo = "string", PopisHlavicka = "string", PopisPredpisy = "string", PopisPlatby = "string", PopisStavyZaplaceni = "string", PopisZaplatit = "string", PopisZpusobUhrady = "string", PopisUcet = "string", PopisQR = "string", PopisBrana = "string", PopisFormulare = "string", PopisZivotniSituace = "string", PopisPsi = "string", PopisHroby = "string", PopisPopelnice = "string", PopisNapojeniPoplatnici = "string", Slevy = "Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto", SlevaPoskytnuta = "boolean", SlevaText = "string", SumSelection = "string", SumPreset = "JsonDecimal", TypAutorizace = "string", NeuzavrenePlatbyPripady = "string[]", AssessmentsVisible = "boolean", AssessmentsAddressVisible = "boolean", PaymentsVisible = "boolean", LinkedPersonsVisible = "boolean", LinkedDogsVisible = "boolean", LinkedGravesVisible = "boolean", LinkedNotificationsVisible = "boolean", DetailedBalanceVisible = "boolean", TotalAssessmentVisible = "boolean", ShowPersonalData = "boolean", DebugMode = "boolean", LinkedDocumentsVisible = "boolean",}
	const enum GDetailPohledavkyVcetneVazebDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GFormulareTypuPohledavkyDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Formulář pro typ poplatku*/
	interface GFormulareTypuPohledavkyDto {
		/**Typ pohledávky*/
		typ_phl?: string|null;
		/**Identifikátor formuláře*/
		ixs_for?: string|null;
		/**Počátek platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Konec platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Název formuláře*/
		for_nazev?: string|null;
		/**Popis formuláře*/
		popis?: string|null;
		/**Název souboru formuláře*/
		form_file_name?: string|null;
		/**Část organizace formuláře*/
		cast_rap?: string|null;
		/**Detail formuláře*/
		detail_form?: Gordic.Rap.Interface.RapssfoDto|null;
	}
	const enum GFormulareTypuPohledavkyDtoNames { typ_phl = "typ_phl", ixs_for = "ixs_for", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", for_nazev = "for_nazev", popis = "popis", form_file_name = "form_file_name", cast_rap = "cast_rap", detail_form = "detail_form",}
	const enum GFormulareTypuPohledavkyDtoFragments { typ_phl = "*", ixs_for = "*", dat_od = "*", dat_do = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", for_nazev = "*", popis = "*", form_file_name = "*", cast_rap = "*", detail_form = "*",}
	const enum GFormulareTypuPohledavkyDtoTypes { typ_phl = "string", ixs_for = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", for_nazev = "string", popis = "string", form_file_name = "string", cast_rap = "string", detail_form = "Gordic.Rap.Interface.RapssfoDto",}
	const enum GFormulareTypuPohledavkyDtoTypeLengths { typ_phl = 6, ixs_for = 12, aktivita_txt = 254, zmenu_prov = 12, for_nazev = 254, popis = 2048, form_file_name = 254, cast_rap = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GFormulareZivotniSituaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Formulář pro životní situaci*/
	interface GFormulareZivotniSituaceDto {
		/**Identifikátor životní situace*/
		ixs_zis?: string|null;
		/**Identifikátor formuláře*/
		ixs_for?: string|null;
		/**URL - odkaz na další související informace*/
		url?: string|null;
		/**Počátek platnosti záznamu*/
		dat_plat_od?: JsonDate|null;
		/**Konec platnosti záznamu*/
		dat_plat_do?: JsonDate|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Název formuláře*/
		for_nazev?: string|null;
		/**Část organizace - životní situace*/
		zis_cast_rap?: string|null;
		/**Část organizace - formulář*/
		for_cast_rap?: string|null;
	}
	const enum GFormulareZivotniSituaceDtoNames { ixs_zis = "ixs_zis", ixs_for = "ixs_for", url = "url", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", for_nazev = "for_nazev", zis_cast_rap = "zis_cast_rap", for_cast_rap = "for_cast_rap",}
	const enum GFormulareZivotniSituaceDtoFragments { ixs_zis = "*", ixs_for = "*", url = "*", dat_plat_od = "*", dat_plat_do = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", for_nazev = "*", zis_cast_rap = "*", for_cast_rap = "*",}
	const enum GFormulareZivotniSituaceDtoTypes { ixs_zis = "string", ixs_for = "string", url = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", for_nazev = "string", zis_cast_rap = "string", for_cast_rap = "string",}
	const enum GFormulareZivotniSituaceDtoTypeLengths { ixs_zis = 12, ixs_for = 12, url = 254, aktivita_txt = 254, zmenu_prov = 12, for_nazev = 254, zis_cast_rap = 10, for_cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GHodnotaKontaktnihoUdajeDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Kontaktní údaj*/
	interface GHodnotaKontaktnihoUdajeDto {
		/**Identifikátor typu kontaktního údaje*/
		ixs_kou?: string|null;
		/**Název typu kontaktního údaje*/
		kou_nazev?: string|null;
		/**Identifikátor zástupného textu*/
		id_zzn?: string|null;
		/**Název zástupného textu*/
		zzn_nazev?: string|null;
		/**Hodnota kontaktního údaje*/
		hodnota?: string|null;
		/**Hodnota kontaktního údaje pro interní použití - nevyplňovat*/
		aut_hodnota?: string|null;
		/**Popis chyby po neúspěšném pokusu o dohledání hodnoty kontaktního údaje*/
		chyba?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Část RAP*/
		cast_rap?: string|null;
	}
	const enum GHodnotaKontaktnihoUdajeDtoNames { ixs_kou = "ixs_kou", kou_nazev = "kou_nazev", id_zzn = "id_zzn", zzn_nazev = "zzn_nazev", hodnota = "hodnota", aut_hodnota = "aut_hodnota", chyba = "chyba", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cast_rap = "cast_rap",}
	const enum GHodnotaKontaktnihoUdajeDtoFragments { ixs_kou = "*", kou_nazev = "*", id_zzn = "*", zzn_nazev = "*", hodnota = "*", aut_hodnota = "*", chyba = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", cast_rap = "*",}
	const enum GHodnotaKontaktnihoUdajeDtoTypes { ixs_kou = "string", kou_nazev = "string", id_zzn = "string", zzn_nazev = "string", hodnota = "string", aut_hodnota = "string", chyba = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", cast_rap = "string",}
	const enum GHodnotaKontaktnihoUdajeDtoTypeLengths { ixs_kou = 12, kou_nazev = 254, id_zzn = 15, zzn_nazev = 254, hodnota = 254, aut_hodnota = 254, chyba = 254, aktivita_txt = 254, zmenu_prov = 12, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GKomentarKNahlizeniNaSpisDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Komentář k nahlížení na spis*/
	interface GKomentarKNahlizeniNaSpisDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Pořadí záznamu*/
		poradi?: number|null;
		/**Text komentáře*/
		koment?: string|null;
		/**Poznámka k záznamu*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Zdroj komnetáře - kód (která strana je autorem komentáře: Oprávněná úřední osoba, Osoba žádající, nebo Osoba oprávněná k nahlížení)*/
		zdroj_koment?: number|null;
		/**Zdroj komnetáře - textový popis (která strana je autorem komentáře: Oprávněná úřední osoba, Osoba žádající, nebo Osoba oprávněná k nahlížení)*/
		zdroj_koment_txt?: string|null;
		/**Identifikátor externího účtu komentující osoby*/
		ixs_exu?: string|null;
		/**Číslo OP komentující oprávněné osoby. Neukládá se do databáze, jen pro přenos údajů pro účely logování*/
		id_pruk?: string|null;
		/**Jméno komentující oprávněné osoby. Neukládá se do db., jen pro přenos údajů pro účely logování*/
		nazev_oon?: string|null;
	}
	const enum GKomentarKNahlizeniNaSpisDtoNames { ixs_pns = "ixs_pns", poradi = "poradi", koment = "koment", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zdroj_koment = "zdroj_koment", zdroj_koment_txt = "zdroj_koment_txt", ixs_exu = "ixs_exu", id_pruk = "id_pruk", nazev_oon = "nazev_oon",}
	const enum GKomentarKNahlizeniNaSpisDtoFragments { ixs_pns = "*", poradi = "*", koment = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", zdroj_koment = "*", zdroj_koment_txt = "*", ixs_exu = "*", id_pruk = "*", nazev_oon = "*",}
	const enum GKomentarKNahlizeniNaSpisDtoTypes { ixs_pns = "string", poradi = "number", koment = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zdroj_koment = "number", zdroj_koment_txt = "string", ixs_exu = "string", id_pruk = "string", nazev_oon = "string",}
	const enum GKomentarKNahlizeniNaSpisDtoTypeLengths { ixs_pns = 12, koment = 10000, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12, zdroj_koment_txt = 254, ixs_exu = 12, id_pruk = 50, nazev_oon = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GKontaktyFormulareDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Kontakt pro formulář*/
	interface GKontaktyFormulareDto {
		/**Identifikátor typu kontaktu*/
		ixs_kou?: string|null;
		/**Název typu kontaktu*/
		kou_nazev?: string|null;
		/**Přebírá hodnotu vyplněné datové položky na základě zdroje kontaktu, pouze pro interní použití*/
		vyplneny_kontakt?: string|null;
		/**Zdroj kontaktu - kód (odkud se vezme hodnota kontaktu, např.: z externího subjektu, funkčního místa, atd.)*/
		zdroj_kou?: number|null;
		/**Zdroj kontaktu - textový popis (odkud se vezme hodnota kontaktu, např.: z externího subjektu, funkčního místa, atd.)*/
		zdroj_kou_txt?: string|null;
		/**Externí subjekt - identifikátor*/
		ixs_esu?: string|null;
		/**Externí subjekt - kompletní textová specifikace*/
		esu_txt?: string|null;
		/**Externí subjekt - název*/
		esu_nazev?: string|null;
		/**Organizační jednotka - identifikátor*/
		ixs_orj?: string|null;
		/**Organizační jednotka - název*/
		orj_nazev?: string|null;
		/**Funkční místo - identifikátor*/
		ixs_fun?: string|null;
		/**Funkční místo - název*/
		fun_nazev?: string|null;
		/**Referent - identifikátor*/
		ixs_ref?: string|null;
		/**Referent - název*/
		ref_nazev?: string|null;
		/**Identifikátor formuláře*/
		ixs_for?: string|null;
		/**Název formuláře*/
		for_nazev?: string|null;
		/**Počátek platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Konec platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Část RAP formuláře*/
		for_cast_rap?: string|null;
		/**Část RAP kontaktního údaje*/
		kou_cast_rap?: string|null;
	}
	const enum GKontaktyFormulareDtoNames { ixs_kou = "ixs_kou", kou_nazev = "kou_nazev", vyplneny_kontakt = "vyplneny_kontakt", zdroj_kou = "zdroj_kou", zdroj_kou_txt = "zdroj_kou_txt", ixs_esu = "ixs_esu", esu_txt = "esu_txt", esu_nazev = "esu_nazev", ixs_orj = "ixs_orj", orj_nazev = "orj_nazev", ixs_fun = "ixs_fun", fun_nazev = "fun_nazev", ixs_ref = "ixs_ref", ref_nazev = "ref_nazev", ixs_for = "ixs_for", for_nazev = "for_nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", for_cast_rap = "for_cast_rap", kou_cast_rap = "kou_cast_rap",}
	const enum GKontaktyFormulareDtoFragments { ixs_kou = "*", kou_nazev = "*", vyplneny_kontakt = "*", zdroj_kou = "*", zdroj_kou_txt = "*", ixs_esu = "*", esu_txt = "*", esu_nazev = "*", ixs_orj = "*", orj_nazev = "*", ixs_fun = "*", fun_nazev = "*", ixs_ref = "*", ref_nazev = "*", ixs_for = "*", for_nazev = "*", dat_od = "*", dat_do = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", for_cast_rap = "*", kou_cast_rap = "*",}
	const enum GKontaktyFormulareDtoTypes { ixs_kou = "string", kou_nazev = "string", vyplneny_kontakt = "string", zdroj_kou = "number", zdroj_kou_txt = "string", ixs_esu = "string", esu_txt = "string", esu_nazev = "string", ixs_orj = "string", orj_nazev = "string", ixs_fun = "string", fun_nazev = "string", ixs_ref = "string", ref_nazev = "string", ixs_for = "string", for_nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", for_cast_rap = "string", kou_cast_rap = "string",}
	const enum GKontaktyFormulareDtoTypeLengths { ixs_kou = 12, kou_nazev = 254, vyplneny_kontakt = 254, zdroj_kou_txt = 254, ixs_esu = 12, esu_txt = 254, esu_nazev = 100, ixs_orj = 12, orj_nazev = 100, ixs_fun = 12, fun_nazev = 25, ixs_ref = 12, ref_nazev = 200, ixs_for = 12, for_nazev = 254, aktivita_txt = 254, zmenu_prov = 12, for_cast_rap = 10, kou_cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GKontaktyZivotniSituaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Kontakt pro životní situaci*/
	interface GKontaktyZivotniSituaceDto {
		/**Identifikátor typu kontaktu*/
		ixs_kou?: string|null;
		/**Název typu kontaktu*/
		kou_nazev?: string|null;
		/**Přebírá hodnotu vyplněné datové položky na základě zdroje kontaktu, pouze pro interní použití*/
		vyplneny_kontakt?: string|null;
		/**Zdroj kontaktu - kód (odkud se vezme hodnota kontaktu, např.: z externího subjektu, funkčního místa, atd.)*/
		zdroj_kou?: number|null;
		/**Zdroj kontaktu - textový popis (odkud se vezme hodnota kontaktu, např.: z externího subjektu, funkčního místa, atd.)*/
		zdroj_kou_txt?: string|null;
		/**Externí subjekt - identifikátor*/
		ixs_esu?: string|null;
		/**Externí subjekt - kompletní textová specifikace*/
		esu_txt?: string|null;
		/**Externí subjekt - název*/
		esu_nazev?: string|null;
		/**Organizační jednotka - identifikátor*/
		ixs_orj?: string|null;
		/**Organizační jednotka - název*/
		orj_nazev?: string|null;
		/**Funkční místo - identifikátor*/
		ixs_fun?: string|null;
		/**Funkční místo - název*/
		fun_nazev?: string|null;
		/**Referent - identifikátor*/
		ixs_ref?: string|null;
		/**Referent - název*/
		ref_nazev?: string|null;
		/**Identifikátor životní situace*/
		ixs_zis?: string|null;
		/**Název životní situace*/
		zis_nazev?: string|null;
		/**Počátek platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Konec platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Část RAP - kontaktní údaj*/
		kou_cast_rap?: string|null;
		/**Část RAP - životní situace*/
		zis_cast_rap?: string|null;
	}
	const enum GKontaktyZivotniSituaceDtoNames { ixs_kou = "ixs_kou", kou_nazev = "kou_nazev", vyplneny_kontakt = "vyplneny_kontakt", zdroj_kou = "zdroj_kou", zdroj_kou_txt = "zdroj_kou_txt", ixs_esu = "ixs_esu", esu_txt = "esu_txt", esu_nazev = "esu_nazev", ixs_orj = "ixs_orj", orj_nazev = "orj_nazev", ixs_fun = "ixs_fun", fun_nazev = "fun_nazev", ixs_ref = "ixs_ref", ref_nazev = "ref_nazev", ixs_zis = "ixs_zis", zis_nazev = "zis_nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kou_cast_rap = "kou_cast_rap", zis_cast_rap = "zis_cast_rap",}
	const enum GKontaktyZivotniSituaceDtoFragments { ixs_kou = "*", kou_nazev = "*", vyplneny_kontakt = "*", zdroj_kou = "*", zdroj_kou_txt = "*", ixs_esu = "*", esu_txt = "*", esu_nazev = "*", ixs_orj = "*", orj_nazev = "*", ixs_fun = "*", fun_nazev = "*", ixs_ref = "*", ref_nazev = "*", ixs_zis = "*", zis_nazev = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kou_cast_rap = "*", zis_cast_rap = "*",}
	const enum GKontaktyZivotniSituaceDtoTypes { ixs_kou = "string", kou_nazev = "string", vyplneny_kontakt = "string", zdroj_kou = "number", zdroj_kou_txt = "string", ixs_esu = "string", esu_txt = "string", esu_nazev = "string", ixs_orj = "string", orj_nazev = "string", ixs_fun = "string", fun_nazev = "string", ixs_ref = "string", ref_nazev = "string", ixs_zis = "string", zis_nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kou_cast_rap = "string", zis_cast_rap = "string",}
	const enum GKontaktyZivotniSituaceDtoTypeLengths { ixs_kou = 12, kou_nazev = 254, vyplneny_kontakt = 254, zdroj_kou_txt = 254, ixs_esu = 12, esu_txt = 254, esu_nazev = 100, ixs_orj = 12, orj_nazev = 100, ixs_fun = 12, fun_nazev = 25, ixs_ref = 12, ref_nazev = 200, ixs_zis = 12, zis_nazev = 254, zmenu_prov = 12, kou_cast_rap = 10, zis_cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GKontaktyZivotniSituaceFormulareDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:rapskou*/
	interface GKontaktyZivotniSituaceFormulareDto {
		/**DBCOLUMN:rapskou.ixs_kou*/
		ixs_kou?: string|null;
		/**DBCOLUMN:rapskou.ico*/
		ico?: string|null;
		/**DBCOLUMN:rapskou.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:rapskou.zdroj_kou*/
		zdroj_kou?: number|null;
		/**DBCOLUMN:rapckou.zdroj_kou_txt*/
		zdroj_kou_txt?: string|null;
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsesu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:ginsesu.nazev*/
		esu_nazev?: string|null;
		ixs_orj?: string|null;
		/**DBCOLUMN:ginsorj.nazev*/
		orj_nazev?: string|null;
		/**DBCOLUMN:rapskou.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginsfun.nazev*/
		fun_nazev?: string|null;
		/**DBCOLUMN:rapskou.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginsref.nazev*/
		ref_nazev?: string|null;
		/**DBCOLUMN:rapskou.poznamka*/
		poznamka?: string|null;
		vyplneny_kontakt?: string|null;
		/**DBCOLUMN:rapskou.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincakt.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:rapskou.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rapskou.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Část RAP*/
		cast_rap?: string|null;
	}
	const enum GKontaktyZivotniSituaceFormulareDtoNames { ixs_kou = "ixs_kou", ico = "ico", nazev = "nazev", zdroj_kou = "zdroj_kou", zdroj_kou_txt = "zdroj_kou_txt", ixs_esu = "ixs_esu", esu_txt = "esu_txt", esu_nazev = "esu_nazev", ixs_orj = "ixs_orj", orj_nazev = "orj_nazev", ixs_fun = "ixs_fun", fun_nazev = "fun_nazev", ixs_ref = "ixs_ref", ref_nazev = "ref_nazev", poznamka = "poznamka", vyplneny_kontakt = "vyplneny_kontakt", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cast_rap = "cast_rap",}
	const enum GKontaktyZivotniSituaceFormulareDtoFragments { ixs_kou = "*", ico = "*", nazev = "*", zdroj_kou = "*", zdroj_kou_txt = "*", ixs_esu = "*", esu_txt = "*", esu_nazev = "*", ixs_orj = "*", orj_nazev = "*", ixs_fun = "*", fun_nazev = "*", ixs_ref = "*", ref_nazev = "*", poznamka = "*", vyplneny_kontakt = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", cast_rap = "*",}
	const enum GKontaktyZivotniSituaceFormulareDtoTypes { ixs_kou = "string", ico = "string", nazev = "string", zdroj_kou = "number", zdroj_kou_txt = "string", ixs_esu = "string", esu_txt = "string", esu_nazev = "string", ixs_orj = "string", orj_nazev = "string", ixs_fun = "string", fun_nazev = "string", ixs_ref = "string", ref_nazev = "string", poznamka = "string", vyplneny_kontakt = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", cast_rap = "string",}
	const enum GKontaktyZivotniSituaceFormulareDtoTypeLengths { ixs_kou = 12, ico = 10, nazev = 254, zdroj_kou_txt = 254, ixs_esu = 12, esu_txt = 254, esu_nazev = 100, ixs_orj = 12, orj_nazev = 100, ixs_fun = 12, fun_nazev = 25, ixs_ref = 12, ref_nazev = 200, poznamka = 254, vyplneny_kontakt = 254, aktivita_txt = 254, zmenu_prov = 12, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GKosikDto.d.ts 

declare namespace Gordic.Rap.Interface {
	interface GKosikDto {
		/**platba*/
		platba?: Gordic.Rap.Interface.BucsplbDto|null;
		/**položky košíku*/
		polozky?: Gordic.Rap.Interface.BucvplbDto[]|null;
	}
	const enum GKosikDtoNames { platba = "platba", polozky = "polozky",}
	const enum GKosikDtoFragments { platba = "*", polozky = "*",}
	const enum GKosikDtoTypes { platba = "Gordic.Rap.Interface.BucsplbDto", polozky = "Gordic.Rap.Interface.BucvplbDto[]",}
	const enum GKosikDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GLogNahlizeniNaSpisDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Historie nahlížení na spis*/
	interface GLogNahlizeniNaSpisDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Typ změny*/
		typ_zmeny?: number|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Popis změny*/
		text?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Jméno autora poslední změny záznamu*/
		zmenu_prov_txt?: string|null;
		/**Identifikátor relace aplikace*/
		sxs_zme?: string|null;
		/**Kód typu objektu*/
		typ_obj?: number|null;
	}
	const enum GLogNahlizeniNaSpisDtoNames { ixs_pns = "ixs_pns", typ_zmeny = "typ_zmeny", por_cislo = "por_cislo", text = "text", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", sxs_zme = "sxs_zme", typ_obj = "typ_obj",}
	const enum GLogNahlizeniNaSpisDtoFragments { ixs_pns = "*", typ_zmeny = "*", por_cislo = "*", text = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", sxs_zme = "*", typ_obj = "*",}
	const enum GLogNahlizeniNaSpisDtoTypes { ixs_pns = "string", typ_zmeny = "number", por_cislo = "number", text = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", sxs_zme = "string", typ_obj = "number",}
	const enum GLogNahlizeniNaSpisDtoTypeLengths { ixs_pns = 12, text = 254, zmenu_prov = 12, zmenu_prov_txt = 254, sxs_zme = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GLogNahlizeniNaSpisFilterDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**filtr DTO*/
	interface GLogNahlizeniNaSpisFilterDto {
		/**ixs_pns*/
		ixs_pns?: string|null;
	}
	const enum GLogNahlizeniNaSpisFilterDtoNames { ixs_pns = "ixs_pns",}
	const enum GLogNahlizeniNaSpisFilterDtoFragments { ixs_pns = "*",}
	const enum GLogNahlizeniNaSpisFilterDtoTypes { ixs_pns = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GMoznostiOdeslaniZadostiDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Možnosti odeslání žádosti*/
	interface GMoznostiOdeslaniZadostiDto {
		/**Identifikátor žádosti*/
		ixp?: string|null;
		/**Dostupné způsoby podání*/
		zpusobyPodani?: Gordic.Rap.Interface.GZpusobyPodaniFormulareDto[]|null;
		/**Identifikátor EXU (zastupovaného)*/
		ixs_exu?: string|null;
		/**Identifikátor login EXU (zástupce)*/
		ixs_exu_login?: string|null;
		/**Identifikátor ESU (zastupovaného)*/
		ixs_esu?: string|null;
		/**Identifikátor login ESU (zástupce)*/
		ixs_esu_login?: string|null;
		/**Identifikátor datové schránky pro EXU (zastupovaného)*/
		id_ds_exu?: string|null;
		/**Identifikátor datové schránky pro login EXU (zástupce)*/
		id_ds_exu_login?: string|null;
	}
	const enum GMoznostiOdeslaniZadostiDtoNames { ixp = "ixp", zpusobyPodani = "zpusobyPodani", ixs_exu = "ixs_exu", ixs_exu_login = "ixs_exu_login", ixs_esu = "ixs_esu", ixs_esu_login = "ixs_esu_login", id_ds_exu = "id_ds_exu", id_ds_exu_login = "id_ds_exu_login",}
	const enum GMoznostiOdeslaniZadostiDtoFragments { ixp = "*", zpusobyPodani = "*", ixs_exu = "*", ixs_exu_login = "*", ixs_esu = "*", ixs_esu_login = "*", id_ds_exu = "*", id_ds_exu_login = "*",}
	const enum GMoznostiOdeslaniZadostiDtoTypes { ixp = "string", zpusobyPodani = "Gordic.Rap.Interface.GZpusobyPodaniFormulareDto[]", ixs_exu = "string", ixs_exu_login = "string", ixs_esu = "string", ixs_esu_login = "string", id_ds_exu = "string", id_ds_exu_login = "string",}
	const enum GMoznostiOdeslaniZadostiDtoTypeLengths { ixp = 12, ixs_exu = 12, ixs_exu_login = 12, ixs_esu = 12, ixs_esu_login = 12, id_ds_exu = 254, id_ds_exu_login = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GNastaveniPohledavkyProRokUcsDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Nastavení typu poplatku pro rok a účetní středisko*/
	interface GNastaveniPohledavkyProRokUcsDto {
		/**Typ pohledávky*/
		typ_phl?: string|null;
		/**Název pohledávky*/
		nazev?: string|null;
		/**Rok*/
		rok?: number|null;
		/**IČO organizace*/
		ico?: string|null;
		/**Účetní středisko organizace*/
		ucs?: string|null;
		/**Částka slevy*/
		c_sleva?: JsonDecimal|null;
		/**Procento slevy*/
		proc_sleva?: JsonDecimal|null;
		/**Maximální částka slevy*/
		c_sleva_max?: JsonDecimal|null;
		/**Příznak možnosti zaplatit typ poplatku online*/
		priz_plbr?: number|null;
		/**Příznak zobrazení řádku*/
		priz_zobr_rad?: number|null;
		/**Příznak zobrazení čtvrti*/
		priz_zobr_ctv?: number|null;
		/**Aktvita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GNastaveniPohledavkyProRokUcsDtoNames { typ_phl = "typ_phl", nazev = "nazev", rok = "rok", ico = "ico", ucs = "ucs", c_sleva = "c_sleva", proc_sleva = "proc_sleva", c_sleva_max = "c_sleva_max", priz_plbr = "priz_plbr", priz_zobr_rad = "priz_zobr_rad", priz_zobr_ctv = "priz_zobr_ctv", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GNastaveniPohledavkyProRokUcsDtoFragments { typ_phl = "*", nazev = "*", rok = "*", ico = "*", ucs = "*", c_sleva = "*", proc_sleva = "*", c_sleva_max = "*", priz_plbr = "*", priz_zobr_rad = "*", priz_zobr_ctv = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GNastaveniPohledavkyProRokUcsDtoTypes { typ_phl = "string", nazev = "string", rok = "number", ico = "string", ucs = "string", c_sleva = "JsonDecimal", proc_sleva = "JsonDecimal", c_sleva_max = "JsonDecimal", priz_plbr = "number", priz_zobr_rad = "number", priz_zobr_ctv = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GNastaveniPohledavkyProRokUcsDtoTypeLengths { typ_phl = 12, nazev = 254, ico = 10, ucs = 12, aktivita_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GNemovitostiSubjektuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Nemovitost subjektu*/
	interface GNemovitostiSubjektuDto {
		/**Budova-jednotka*/
		budjed?: number|null;
		/**IČO*/
		iconum?: number|null;
		/**Oprávněný subjekt*/
		nazev_osu?: string|null;
		/**Identifikátor jednotky*/
		id_jednotky?: string|null;
		/**Typ nemovitosti*/
		typ_nem?: string|null;
		/**Identifikátor budovy*/
		id_budovy?: string|null;
		/**Identifikátor vlastnictví*/
		id_vlastnictvi?: string|null;
		/**Číslo jednotky*/
		cislo_jednotky?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
		/**Adresa budovy*/
		adr_budovy_txt?: string|null;
		/**Podíl - čitatel*/
		podil_citatel?: number|null;
		/**Podíl - jmenovatel*/
		podil_jmenov?: number|null;
		/**Obec*/
		cobce?: string|null;
		/**Číslo domovní*/
		cdom?: number|null;
		/**Vlastník od*/
		dat_vzniku?: JsonDate|null;
		/**Vlastník do*/
		dat_zaniku?: JsonDate|null;
		/**Datum nabytí právní moci*/
		dat_npm?: JsonDate|null;
		/**Příznak výběru (pro interní použití)*/
		vyber?: boolean|null;
	}
	const enum GNemovitostiSubjektuDtoNames { budjed = "budjed", iconum = "iconum", nazev_osu = "nazev_osu", id_jednotky = "id_jednotky", typ_nem = "typ_nem", id_budovy = "id_budovy", id_vlastnictvi = "id_vlastnictvi", cislo_jednotky = "cislo_jednotky", popis = "popis", adr_budovy_txt = "adr_budovy_txt", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", cobce = "cobce", cdom = "cdom", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", dat_npm = "dat_npm", vyber = "vyber",}
	const enum GNemovitostiSubjektuDtoFragments { budjed = "*", iconum = "*", nazev_osu = "*", id_jednotky = "*", typ_nem = "*", id_budovy = "*", id_vlastnictvi = "*", cislo_jednotky = "*", popis = "*", adr_budovy_txt = "*", podil_citatel = "*", podil_jmenov = "*", cobce = "*", cdom = "*", dat_vzniku = "*", dat_zaniku = "*", dat_npm = "*", vyber = "*",}
	const enum GNemovitostiSubjektuDtoTypes { budjed = "number", iconum = "number", nazev_osu = "string", id_jednotky = "string", typ_nem = "string", id_budovy = "string", id_vlastnictvi = "string", cislo_jednotky = "JsonDecimal", popis = "string", adr_budovy_txt = "string", podil_citatel = "number", podil_jmenov = "number", cobce = "string", cdom = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", dat_npm = "JsonDate", vyber = "boolean",}
	const enum GNemovitostiSubjektuDtoTypeLengths { nazev_osu = 254, id_jednotky = 254, typ_nem = 60, id_budovy = 30, id_vlastnictvi = 30, popis = 254, adr_budovy_txt = 254, cobce = 48, cdom = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GNotifikaceStazeniSoboruDto.d.ts 

declare namespace Gordic.Rap.Interface {
	interface GNotifikaceStazeniSouboruDto {
		/**Případ nahlížení na spis*/
		pripad?: Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|null;
		/**Případ nahlížení na spis*/
		doklady?: Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto[]|null;
		/**Případ nahlížení na spis*/
		login?: Gordic.Rap.Interface.GRapLoginInfoDto|null;
	}
	const enum GNotifikaceStazeniSouboruDtoNames { pripad = "pripad", doklady = "doklady", login = "login",}
	const enum GNotifikaceStazeniSouboruDtoFragments { pripad = "*", doklady = "*", login = "*",}
	const enum GNotifikaceStazeniSouboruDtoTypes { pripad = "Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto", doklady = "Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto[]", login = "Gordic.Rap.Interface.GRapLoginInfoDto",}
	const enum GNotifikaceStazeniSouboruDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Gordic.Rap.Interface.BucsplbDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:Bucsplb*/
	interface BucsplbDto {
		/**DBCOLUMN:Bucsplb.ixs_plb*/
		ixs_plb?: string|null;
		/**DBCOLUMN:Bucsplb.pbr*/
		pbr?: number|null;
		/**DBCOLUMN:Bucsplb.pbr_txt*/
		pbr_txt?: string|null;
		/**DBCOLUMN:Bucsplb.message_id*/
		message_id?: string|null;
		/**DBCOLUMN:Bucsplb.payment_id*/
		payment_id?: string|null;
		/**DBCOLUMN:Bucsplb.order_number*/
		order_number?: string|null;
		/**DBCOLUMN:Bucsplb.state*/
		state?: number|null;
		/**DBCOLUMN:Bucsplb.state_txt*/
		state_txt?: string|null;
		/**DBCOLUMN:Bucsplb.state_popis*/
		state_popis?: string|null;
		/**DBCOLUMN:Bucsplb.status*/
		status?: number|null;
		/**DBCOLUMN:Bucsplb.status_txt*/
		status_txt?: string|null;
		/**DBCOLUMN:Bucsplb.status_popis*/
		status_popis?: string|null;
		/**DBCOLUMN:Bucsplb.sub_state*/
		sub_state?: number|null;
		/**DBCOLUMN:Bucsplb.sub_state_txt*/
		sub_state_txt?: string|null;
		/**DBCOLUMN:Bucsplb.sub_state_popis*/
		sub_state_popis?: string|null;
		/**DBCOLUMN:Bucsplb.c_am*/
		c_am?: JsonDecimal|null;
		/**DBCOLUMN:Bucsplb.c_am_approve*/
		c_am_approve?: JsonDecimal|null;
		/**DBCOLUMN:Bucsplb.c_am_capture*/
		c_am_capture?: JsonDecimal|null;
		/**DBCOLUMN:Bucsplb.c_am_refund*/
		c_am_refund?: JsonDecimal|null;
		/**DBCOLUMN:Bucsplb.currency*/
		currency?: number|null;
		/**DBCOLUMN:Bucsplb.currency_txt*/
		currency_txt?: string|null;
		/**DBCOLUMN:Bucsplb.currency_popis*/
		currency_popis?: string|null;
		/**DBCOLUMN:Bucsplb.payment_method*/
		payment_method?: number|null;
		/**DBCOLUMN:Bucsplb.payment_method_txt*/
		payment_method_txt?: string|null;
		/**DBCOLUMN:Bucsplb.payment_method_popis*/
		payment_method_popis?: string|null;
		/**DBCOLUMN:Bucsplb.s_par*/
		s_par?: number|null;
		/**DBCOLUMN:Bucsplb.s_par_txt*/
		s_par_txt?: string|null;
		/**DBCOLUMN:Bucsplb.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Bucsplb.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Bucsplb.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Bucsplb.dat_payment*/
		dat_payment?: JsonDate|null;
		/**DBCOLUMN:Bucsplb.dat_aprove*/
		dat_aprove?: JsonDate|null;
		/**DBCOLUMN:Bucsplb.dat_lcap*/
		dat_lcap?: JsonDate|null;
		/**DBCOLUMN:Bucsplb.ixp_buc*/
		ixp_buc?: string|null;
		/**DBCOLUMN:Bucsplb.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Bucsplb.vs*/
		vs?: string|null;
		/**DBCOLUMN:Bucsplb.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Bucsplb.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Bucsplb.nazev_popl*/
		nazev_popl?: string|null;
		/**DBCOLUMN:Bucsplb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Bucsplb.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:Bucsplb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Bucsplb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Bucsplb.mail*/
		mail?: string|null;
		/**DBCOLUMN:Bucsplb.stav_platby*/
		stav_platby?: number|null;
		/**DBCOLUMN:Bucsplb.stav_platby_txt*/
		stav_platby_txt?: string|null;
		/**DBCOLUMN:Bucsplb.stav_buc*/
		stav_buc?: number|null;
		/**DBCOLUMN:Bucsplb.stav_buc_txt*/
		stav_buc_txt?: string|null;
		/**DBCOLUMN:Bucsplb.c_par*/
		c_par?: JsonDecimal|null;
		/**DBCOLUMN:Bucsplb.ixs_exu*/
		ixs_exu?: string|null;
		/**DBCOLUMN:Bucsplb.ixs_lpc*/
		ixs_lpc?: string|null;
	}
	const enum BucsplbDtoNames { ixs_plb = "ixs_plb", pbr = "pbr", pbr_txt = "pbr_txt", message_id = "message_id", payment_id = "payment_id", order_number = "order_number", state = "state", state_txt = "state_txt", state_popis = "state_popis", status = "status", status_txt = "status_txt", status_popis = "status_popis", sub_state = "sub_state", sub_state_txt = "sub_state_txt", sub_state_popis = "sub_state_popis", c_am = "c_am", c_am_approve = "c_am_approve", c_am_capture = "c_am_capture", c_am_refund = "c_am_refund", currency = "currency", currency_txt = "currency_txt", currency_popis = "currency_popis", payment_method = "payment_method", payment_method_txt = "payment_method_txt", payment_method_popis = "payment_method_popis", s_par = "s_par", s_par_txt = "s_par_txt", c = "c", bu_vl = "bu_vl", sk_vl = "sk_vl", dat_payment = "dat_payment", dat_aprove = "dat_aprove", dat_lcap = "dat_lcap", ixp_buc = "ixp_buc", ixp = "ixp", vs = "vs", ixs_esu = "ixs_esu", esu_txt = "esu_txt", nazev_popl = "nazev_popl", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mail = "mail", stav_platby = "stav_platby", stav_platby_txt = "stav_platby_txt", stav_buc = "stav_buc", stav_buc_txt = "stav_buc_txt", c_par = "c_par", ixs_exu = "ixs_exu", ixs_lpc = "ixs_lpc",}
	const enum BucsplbDtoFragments { ixs_plb = "*", pbr = "*", pbr_txt = "*", message_id = "*", payment_id = "*", order_number = "*", state = "*", state_txt = "*", state_popis = "*", status = "*", status_txt = "*", status_popis = "*", sub_state = "*", sub_state_txt = "*", sub_state_popis = "*", c_am = "*", c_am_approve = "*", c_am_capture = "*", c_am_refund = "*", currency = "*", currency_txt = "*", currency_popis = "*", payment_method = "*", payment_method_txt = "*", payment_method_popis = "*", s_par = "*", s_par_txt = "*", c = "*", bu_vl = "*", sk_vl = "*", dat_payment = "*", dat_aprove = "*", dat_lcap = "*", ixp_buc = "*", ixp = "*", vs = "*", ixs_esu = "*", esu_txt = "*", nazev_popl = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", mail = "*", stav_platby = "*", stav_platby_txt = "*", stav_buc = "*", stav_buc_txt = "*", c_par = "*", ixs_exu = "*", ixs_lpc = "*",}
	const enum BucsplbDtoTypes { ixs_plb = "string", pbr = "number", pbr_txt = "string", message_id = "string", payment_id = "string", order_number = "string", state = "number", state_txt = "string", state_popis = "string", status = "number", status_txt = "string", status_popis = "string", sub_state = "number", sub_state_txt = "string", sub_state_popis = "string", c_am = "JsonDecimal", c_am_approve = "JsonDecimal", c_am_capture = "JsonDecimal", c_am_refund = "JsonDecimal", currency = "number", currency_txt = "string", currency_popis = "string", payment_method = "number", payment_method_txt = "string", payment_method_popis = "string", s_par = "number", s_par_txt = "string", c = "JsonDecimal", bu_vl = "string", sk_vl = "string", dat_payment = "JsonDate", dat_aprove = "JsonDate", dat_lcap = "JsonDate", ixp_buc = "string", ixp = "string", vs = "string", ixs_esu = "string", esu_txt = "string", nazev_popl = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mail = "string", stav_platby = "number", stav_platby_txt = "string", stav_buc = "number", stav_buc_txt = "string", c_par = "JsonDecimal", ixs_exu = "string", ixs_lpc = "string",}
	const enum BucsplbDtoTypeLengths { ixs_plb = 12, pbr_txt = 50, message_id = 256, payment_id = 15, order_number = 128, state_txt = 100, state_popis = 2048, status_txt = 100, status_popis = 2048, sub_state_txt = 100, sub_state_popis = 2048, currency_txt = 50, currency_popis = 2048, payment_method_txt = 100, payment_method_popis = 2048, s_par_txt = 50, bu_vl = 34, sk_vl = 11, ixp_buc = 12, ixp = 12, vs = 12, ixs_esu = 12, esu_txt = 254, nazev_popl = 100, aktivita_txt = 50, zmenu_prov = 12, mail = 254, stav_platby_txt = 254, stav_buc_txt = 254, ixs_exu = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Gordic.Rap.Interface.BucvplbDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:Bucvplb*/
	interface BucvplbDto {
		/**DBCOLUMN:Bucvplb.ixs_plb*/
		ixs_plb?: string|null;
		/**DBCOLUMN:Bucvplb.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Bucvplb.vs*/
		vs?: string|null;
		/**DBCOLUMN:Bucvplb.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Bucvplb.esu_txt*/
		esu_txt?: string|null;
		ob_jmeno?: string|null;
		/**DBCOLUMN:Bucvplb.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Bucvplb.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Bucvplb.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:Bucvplb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Bucvplb.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Bucvplb.nazev_pohledavky*/
		nazev_pohledavky?: string|null;
		/**DBCOLUMN:Bucvplb.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.c_dluh*/
		c_dluh?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.c_dluh_a_nasl_predpis*/
		c_dluh_a_nasl_predpis?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.c_dluh_a_vsechny_predpisy*/
		c_dluh_a_vsechny_predpisy?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.nasl_dat_spl*/
		nasl_dat_spl?: string|null;
		/**DBCOLUMN:Bucvplb.nejstarsi_dat_spl*/
		nejstarsi_dat_spl?: string|null;
		/**DBCOLUMN:Bucvplb.c_do_splatnosti*/
		c_do_splatnosti?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.c_nasl_dat_spl*/
		c_nasl_dat_spl?: JsonDecimal|null;
		/**DBCOLUMN:Bucvplb.popis*/
		popis?: string|null;
	}
	const enum BucvplbDtoNames { ixs_plb = "ixs_plb", ixp = "ixp", vs = "vs", ixs_esu = "ixs_esu", esu_txt = "esu_txt", ob_jmeno = "ob_jmeno", poznamka = "poznamka", c = "c", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_pohledavky = "nazev_pohledavky", c_celk = "c_celk", c_dluh = "c_dluh", c_dluh_a_nasl_predpis = "c_dluh_a_nasl_predpis", c_dluh_a_vsechny_predpisy = "c_dluh_a_vsechny_predpisy", nasl_dat_spl = "nasl_dat_spl", nejstarsi_dat_spl = "nejstarsi_dat_spl", c_do_splatnosti = "c_do_splatnosti", c_nasl_dat_spl = "c_nasl_dat_spl", popis = "popis",}
	const enum BucvplbDtoFragments { ixs_plb = "*", ixp = "*", vs = "*", ixs_esu = "*", esu_txt = "*", ob_jmeno = "*", poznamka = "*", c = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_pohledavky = "*", c_celk = "*", c_dluh = "*", c_dluh_a_nasl_predpis = "*", c_dluh_a_vsechny_predpisy = "*", nasl_dat_spl = "*", nejstarsi_dat_spl = "*", c_do_splatnosti = "*", c_nasl_dat_spl = "*", popis = "*",}
	const enum BucvplbDtoTypes { ixs_plb = "string", ixp = "string", vs = "string", ixs_esu = "string", esu_txt = "string", ob_jmeno = "string", poznamka = "string", c = "JsonDecimal", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_pohledavky = "string", c_celk = "JsonDecimal", c_dluh = "JsonDecimal", c_dluh_a_nasl_predpis = "JsonDecimal", c_dluh_a_vsechny_predpisy = "JsonDecimal", nasl_dat_spl = "string", nejstarsi_dat_spl = "string", c_do_splatnosti = "JsonDecimal", c_nasl_dat_spl = "JsonDecimal", popis = "string",}
	const enum BucvplbDtoTypeLengths { ixs_plb = 12, ixp = 12, vs = 12, ixs_esu = 12, esu_txt = 254, ob_jmeno = 254, poznamka = 254, aktivita_txt = 50, zmenu_prov = 12, nazev_pohledavky = 254, nasl_dat_spl = 254, nejstarsi_dat_spl = 254, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Gordic.Rap.Interface.DetailZadostiDto.d.ts 

declare namespace Gordic.Rap.Interface {
    /**DBTABLE:DetailZadosti*/
    interface DetailZadostiDto {
        /**DBCOLUMN:DetailZadosti.dotacni_titul*/
        dotacni_titul?: string|null;
        /**DBCOLUMN:DetailZadosti.nazev_projektu*/
        nazev_projektu?: string|null;
        /**DBCOLUMN:DetailZadosti.pid_zadosti*/
        pid_zadosti?: string|null;
        /**DBCOLUMN:DetailZadosti.cj*/
        cj?: string|null;
        /**DBCOLUMN:DetailZadosti.kompetent*/
        kompetent?: string|null;
        /**DBCOLUMN:DetailZadosti.podano_dne*/
        podano_dne?: JsonDate|null;
        /**DBCOLUMN:DetailZadosti.zmeneno_dne*/
        zmeneno_dne?: JsonDate|null;
        /**DBCOLUMN:DetailZadosti.stav_zadosti*/
        stav_zadosti?: string|null;
        /**DBCOLUMN:DetailZadosti.stav_zadosti_kod*/
        stav_zadosti_kod?: number|null;
        /**DBCOLUMN:DetailZadosti.stav_pisemnosti*/
        stav_pisemnosti?: string|null;
        /**DBCOLUMN:DetailZadosti.detailni_stav_pisemnosti*/
        detailni_stav_pisemnosti?: string|null;
        /**DBCOLUMN:DetailZadosti.pdf_ixb*/
        pdf_ixb?: string|null;
        /**DBCOLUMN:DetailZadosti.pdf_por_cislo*/
        pdf_por_cislo?: number|null;
        /**DBCOLUMN:DetailZadosti.ixs_esu*/
        ixs_esu?: string|null;
        /**DBCOLUMN:DetailZadosti.nazev_esu*/
        nazev_esu?: string|null;
        /**DBCOLUMN:DetailZadosti.zamer_prj*/
        zamer_prj?: string|null;
        /**DBCOLUMN:DetailZadosti.popis_zad*/
        popis_zad?: string|null;
        /**DBCOLUMN:DetailZadosti.predp_naklady*/
        predp_naklady?: JsonDecimal|null;
        /**DBCOLUMN:DetailZadosti.poz_prostredky*/
        poz_prostredky?: JsonDecimal|null;
        /**DBCOLUMN:DetailZadosti.navrh_prostredky*/
        navrh_prostredky?: JsonDecimal|null;
        /**DBCOLUMN:DetailZadosti.schv_prostredky*/
        schv_prostredky?: JsonDecimal|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Gordic.Rap.Interface.RapssfoDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:Rapssfo*/
	interface RapssfoDto {
		/**DBCOLUMN:Rapssfo.ixs_for*/
		ixs_for?: string|null;
		/**DBCOLUMN:Rapssfo.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Rapssfo.form_file_name*/
		form_file_name?: string|null;
		/**DBCOLUMN:Rapssfo.url*/
		url?: string|null;
		/**DBCOLUMN:Rapssfo.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:Rapssfo.dat_plat_od_txt*/
		dat_plat_od_txt?: string|null;
		/**DBCOLUMN:Rapssfo.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:Rapssfo.dat_plat_do_txt*/
		dat_plat_do_txt?: string|null;
		/**DBCOLUMN:Rapssfo.dat_sber_od*/
		dat_sber_od?: JsonDate|null;
		/**DBCOLUMN:Rapssfo.dat_sber_od_txt*/
		dat_sber_od_txt?: string|null;
		/**DBCOLUMN:Rapssfo.dat_sber_do*/
		dat_sber_do?: JsonDate|null;
		/**DBCOLUMN:Rapssfo.dat_sber_do_txt*/
		dat_sber_do_txt?: string|null;
		/**DBCOLUMN:Rapssfo.priz_odes*/
		priz_odes?: number|null;
		/**DBCOLUMN:Rapssfo.priz_odes_txt*/
		priz_odes_txt?: string|null;
		/**DBCOLUMN:Rapssfo.priz_pod*/
		priz_pod?: number|null;
		/**DBCOLUMN:Rapssfo.priz_pod_txt*/
		priz_pod_txt?: string|null;
		/**DBCOLUMN:Rapssfo.priz_dupl*/
		priz_dupl?: number|null;
		/**DBCOLUMN:Rapssfo.priz_dupl_txt*/
		priz_dupl_txt?: string|null;
		/**DBCOLUMN:Rapssfo.priz_fikce_int*/
		priz_fikce_int?: number|null;
		/**DBCOLUMN:Rapssfo.priz_fikce_ext*/
		priz_fikce_ext?: number|null;
		/**DBCOLUMN:Rapssfo.pocet_dupl*/
		pocet_dupl?: number|null;
		/**DBCOLUMN:Rapssfo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Rapssfo.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:Rapssfo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Rapssfo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Rapssfo.adr_odeslani*/
		adr_odeslani?: string|null;
		/**DBCOLUMN:Rapssfo.form_file_name_osv*/
		form_file_name_osv?: string|null;
		/**DBCOLUMN:Rapssfo.uloha_rap*/
		uloha_rap?: number|null;
		/**DBCOLUMN:Rapssfo.id_ur1*/
		id_ur1?: number|null;
		/**DBCOLUMN:Rapssfo.id_ur2*/
		id_ur2?: number|null;
		/**DBCOLUMN:Rapssfo.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:Rapssfo.akt_plat*/
		akt_plat?: number|null;
		/**DBCOLUMN:Rapssfo.akt_sber*/
		akt_sber?: number|null;
		/**DBCOLUMN:Rapssfo.icon*/
		icon?: string|null;
		/**DBCOLUMN:Rapssfo.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Rapssfo.poc_prac_form*/
		poc_prac_form?: number|null;
		/**DBCOLUMN:Rapssfo.url_order_app*/
		url_order_app?: string|null;
		/**DBCOLUMN:Rapssfo.url_ws*/
		url_ws?: string|null;
		/**DBCOLUMN:Rapssfo.typ_poda*/
		typ_poda?: number|null;
		/**DBCOLUMN:Rapssfo.pod_email*/
		pod_email?: string|null;
		/**DBCOLUMN:Rapssfo.pod_id_ds*/
		pod_id_ds?: string|null;
		/**DBCOLUMN:Rapssfo.priz_azs*/
		priz_azs?: number|null;
		/**DBCOLUMN:Rapssfo.priz_tip*/
		priz_tip?: number|null;
		/**DBCOLUMN:Rapssfo.poc_zadosti*/
		poc_zadosti?: number|null;
		/**DBCOLUMN:Rapssfo.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Rapssfo.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:Rapssfo.mail_to*/
		mail_to?: string|null;
		/**DBCOLUMN:Rapssfo.mail_cc*/
		mail_cc?: string|null;
		/**DBCOLUMN:Rapssfo.mail_bcc*/
		mail_bcc?: string|null;
		/**DBCOLUMN:Rapssfo.popis_kratky*/
		popis_kratky?: string|null;
		/**DBCOLUMN:Rapssfo.poradi_zobr*/
		poradi_zobr?: number|null;
		/**DBCOLUMN:Rapssfo.notifikace*/
		notifikace?: string|null;
		/**DBCOLUMN:Rapssfo.popis*/
		popis?: string|null;
		/**DBCOLUMN:Rapssfo.ico*/
		ico?: string|null;
		/**DBCOLUMN:Rapssfo.priz_sig*/
		priz_sig?: number|null;
		/**DBCOLUMN:Rapssfo.priz_sig_pov*/
		priz_sig_pov?: number|null;
		/**DBCOLUMN:Rapssfo.org_color*/
		org_color?: string|null;
		/**DBCOLUMN:Rapssfo.typ_lic_form*/
		typ_lic_form?: number|null;
		/**DBCOLUMN:Rapssfo.priz_ginsfil*/
		priz_ginsfil?: number|null;
		/**DBCOLUMN:Rapssfo.ginsfil_soubor_h*/
		ginsfil_soubor_h?: string|null;
		/**DBCOLUMN:Rapssfo.ginsfil_alg_h*/
		ginsfil_alg_h?: string|null;
		/**DBCOLUMN:Rapssfo.ginsfil_fil_revize*/
		ginsfil_fil_revize?: string|null;
		/**DBCOLUMN:Rapssfo.ginsfil_fil_soubor_h*/
		ginsfil_fil_soubor_h?: string|null;
		/**DBCOLUMN:Rapssfo.ginsfil_fil_alg_h*/
		ginsfil_fil_alg_h?: string|null;
		/**DBCOLUMN:Rapssfo.cast_rap*/
		cast_rap?: string|null;
		/**DBCOLUMN:Rapssfo.uloha_rap_txt*/
		uloha_rap_txt?: string|null;
		/**DBCOLUMN:Rapssfo.id_ur1_txt*/
		id_ur1_txt?: string|null;
		/**DBCOLUMN:Rapssfo.id_ur2_txt*/
		id_ur2_txt?: string|null;
		/**DBCOLUMN:Rapssfo.form_id*/
		form_id?: string|null;
		/**DBCOLUMN:Rapssfo.agenda_kod*/
		agenda_kod?: string|null;
		/**DBCOLUMN:Rapssfo.agenda_nazev*/
		agenda_nazev?: string|null;
		/**DBCOLUMN:Rapssfo.sluzba_kod*/
		sluzba_kod?: string|null;
		/**DBCOLUMN:Rapssfo.sluzba_nazev*/
		sluzba_nazev?: string|null;
		/**DBCOLUMN:Rapssfo.ukon_kod*/
		ukon_kod?: string|null;
		/**DBCOLUMN:Rapssfo.ukon_nazev*/
		ukon_nazev?: string|null;
		/**DBCOLUMN:Rapssfo.loa*/
		loa?: number|null;
	}
	const enum RapssfoDtoNames { ixs_for = "ixs_for", nazev = "nazev", form_file_name = "form_file_name", url = "url", dat_plat_od = "dat_plat_od", dat_plat_od_txt = "dat_plat_od_txt", dat_plat_do = "dat_plat_do", dat_plat_do_txt = "dat_plat_do_txt", dat_sber_od = "dat_sber_od", dat_sber_od_txt = "dat_sber_od_txt", dat_sber_do = "dat_sber_do", dat_sber_do_txt = "dat_sber_do_txt", priz_odes = "priz_odes", priz_odes_txt = "priz_odes_txt", priz_pod = "priz_pod", priz_pod_txt = "priz_pod_txt", priz_dupl = "priz_dupl", priz_dupl_txt = "priz_dupl_txt", priz_fikce_int = "priz_fikce_int", priz_fikce_ext = "priz_fikce_ext", pocet_dupl = "pocet_dupl", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", adr_odeslani = "adr_odeslani", form_file_name_osv = "form_file_name_osv", uloha_rap = "uloha_rap", id_ur1 = "id_ur1", id_ur2 = "id_ur2", poradi = "poradi", akt_plat = "akt_plat", akt_sber = "akt_sber", icon = "icon", ixb = "ixb", poc_prac_form = "poc_prac_form", url_order_app = "url_order_app", url_ws = "url_ws", typ_poda = "typ_poda", pod_email = "pod_email", pod_id_ds = "pod_id_ds", priz_azs = "priz_azs", priz_tip = "priz_tip", poc_zadosti = "poc_zadosti", ixs_fun = "ixs_fun", ixs_su = "ixs_su", mail_to = "mail_to", mail_cc = "mail_cc", mail_bcc = "mail_bcc", popis_kratky = "popis_kratky", poradi_zobr = "poradi_zobr", notifikace = "notifikace", popis = "popis", ico = "ico", priz_sig = "priz_sig", priz_sig_pov = "priz_sig_pov", org_color = "org_color", typ_lic_form = "typ_lic_form", priz_ginsfil = "priz_ginsfil", ginsfil_soubor_h = "ginsfil_soubor_h", ginsfil_alg_h = "ginsfil_alg_h", ginsfil_fil_revize = "ginsfil_fil_revize", ginsfil_fil_soubor_h = "ginsfil_fil_soubor_h", ginsfil_fil_alg_h = "ginsfil_fil_alg_h", cast_rap = "cast_rap", uloha_rap_txt = "uloha_rap_txt", id_ur1_txt = "id_ur1_txt", id_ur2_txt = "id_ur2_txt", form_id = "form_id", agenda_kod = "agenda_kod", agenda_nazev = "agenda_nazev", sluzba_kod = "sluzba_kod", sluzba_nazev = "sluzba_nazev", ukon_kod = "ukon_kod", ukon_nazev = "ukon_nazev", loa = "loa",}
	const enum RapssfoDtoFragments { ixs_for = "*", nazev = "*", form_file_name = "*", url = "*", dat_plat_od = "*", dat_plat_od_txt = "*", dat_plat_do = "*", dat_plat_do_txt = "*", dat_sber_od = "*", dat_sber_od_txt = "*", dat_sber_do = "*", dat_sber_do_txt = "*", priz_odes = "*", priz_odes_txt = "*", priz_pod = "*", priz_pod_txt = "*", priz_dupl = "*", priz_dupl_txt = "*", priz_fikce_int = "*", priz_fikce_ext = "*", pocet_dupl = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", adr_odeslani = "*", form_file_name_osv = "*", uloha_rap = "*", id_ur1 = "*", id_ur2 = "*", poradi = "*", akt_plat = "*", akt_sber = "*", icon = "*", ixb = "*", poc_prac_form = "*", url_order_app = "*", url_ws = "*", typ_poda = "*", pod_email = "*", pod_id_ds = "*", priz_azs = "*", priz_tip = "*", poc_zadosti = "*", ixs_fun = "*", ixs_su = "*", mail_to = "*", mail_cc = "*", mail_bcc = "*", popis_kratky = "*", poradi_zobr = "*", notifikace = "*", popis = "*", ico = "*", priz_sig = "*", priz_sig_pov = "*", org_color = "*", typ_lic_form = "*", priz_ginsfil = "*", ginsfil_soubor_h = "*", ginsfil_alg_h = "*", ginsfil_fil_revize = "*", ginsfil_fil_soubor_h = "*", ginsfil_fil_alg_h = "*", cast_rap = "*", uloha_rap_txt = "*", id_ur1_txt = "*", id_ur2_txt = "*", form_id = "*", agenda_kod = "*", agenda_nazev = "*", sluzba_kod = "*", sluzba_nazev = "*", ukon_kod = "*", ukon_nazev = "*", loa = "*",}
	const enum RapssfoDtoTypes { ixs_for = "string", nazev = "string", form_file_name = "string", url = "string", dat_plat_od = "JsonDate", dat_plat_od_txt = "string", dat_plat_do = "JsonDate", dat_plat_do_txt = "string", dat_sber_od = "JsonDate", dat_sber_od_txt = "string", dat_sber_do = "JsonDate", dat_sber_do_txt = "string", priz_odes = "number", priz_odes_txt = "string", priz_pod = "number", priz_pod_txt = "string", priz_dupl = "number", priz_dupl_txt = "string", priz_fikce_int = "number", priz_fikce_ext = "number", pocet_dupl = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", adr_odeslani = "string", form_file_name_osv = "string", uloha_rap = "number", id_ur1 = "number", id_ur2 = "number", poradi = "number", akt_plat = "number", akt_sber = "number", icon = "string", ixb = "string", poc_prac_form = "number", url_order_app = "string", url_ws = "string", typ_poda = "number", pod_email = "string", pod_id_ds = "string", priz_azs = "number", priz_tip = "number", poc_zadosti = "number", ixs_fun = "string", ixs_su = "string", mail_to = "string", mail_cc = "string", mail_bcc = "string", popis_kratky = "string", poradi_zobr = "number", notifikace = "string", popis = "string", ico = "string", priz_sig = "number", priz_sig_pov = "number", org_color = "string", typ_lic_form = "number", priz_ginsfil = "number", ginsfil_soubor_h = "string", ginsfil_alg_h = "string", ginsfil_fil_revize = "string", ginsfil_fil_soubor_h = "string", ginsfil_fil_alg_h = "string", cast_rap = "string", uloha_rap_txt = "string", id_ur1_txt = "string", id_ur2_txt = "string", form_id = "string", agenda_kod = "string", agenda_nazev = "string", sluzba_kod = "string", sluzba_nazev = "string", ukon_kod = "string", ukon_nazev = "string", loa = "number",}
	const enum RapssfoDtoTypeLengths { ixs_for = 12, nazev = 254, form_file_name = 254, url = 254, dat_plat_od_txt = 50, dat_plat_do_txt = 50, dat_sber_od_txt = 50, dat_sber_do_txt = 50, priz_odes_txt = 50, priz_pod_txt = 50, priz_dupl_txt = 50, aktivita_txt = 12, zmenu_prov = 12, adr_odeslani = 254, form_file_name_osv = 254, icon = 254, ixb = 12, url_order_app = 254, url_ws = 254, pod_email = 254, pod_id_ds = 100, ixs_fun = 12, ixs_su = 12, mail_to = 254, mail_cc = 254, mail_bcc = 254, popis_kratky = 254, notifikace = 254, popis = 5000, ico = 10, org_color = 10, ginsfil_soubor_h = 254, ginsfil_alg_h = 100, ginsfil_fil_revize = 30, ginsfil_fil_soubor_h = 254, ginsfil_fil_alg_h = 100, cast_rap = 10, uloha_rap_txt = 254, id_ur1_txt = 254, id_ur2_txt = 254, form_id = 20, agenda_kod = 20, agenda_nazev = 254, sluzba_kod = 20, sluzba_nazev = 254, ukon_kod = 20, ukon_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Gordic.Rap.Interface.RapssfuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:Rapssfu*/
	interface RapssfuDto {
		/**DBCOLUMN:Rapssfu.ixs_for*/
		ixs_for?: string|null;
		/**DBCOLUMN:Rapssfu.ixs_exu*/
		ixs_exu?: string|null;
		/**DBCOLUMN:Rapssfu.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Rapssfu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Rapssfu.uziv_nazev*/
		uziv_nazev?: string|null;
		/**DBCOLUMN:Rapssfu.form_file_name*/
		form_file_name?: string|null;
		/**DBCOLUMN:Rapssfu.dat_vytvor*/
		dat_vytvor?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_vytvor_txt*/
		dat_vytvor_txt?: string|null;
		/**DBCOLUMN:Rapssfu.dat_modif*/
		dat_modif?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_modif_txt*/
		dat_modif_txt?: string|null;
		/**DBCOLUMN:Rapssfu.dat_odeslani*/
		dat_odeslani?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_odeslani_txt*/
		dat_odeslani_txt?: string|null;
		/**DBCOLUMN:Rapssfu.dat_zprac*/
		dat_zprac?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_zprac_txt*/
		dat_zprac_txt?: string|null;
		/**DBCOLUMN:Rapssfu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Rapssfu.stav_form*/
		stav_form?: number|null;
		/**DBCOLUMN:Rapssfu.stav_form_txt*/
		stav_form_txt?: string|null;
		/**DBCOLUMN:Rapssfu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Rapssfu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Rapssfu.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_plat_od_txt*/
		dat_plat_od_txt?: string|null;
		/**DBCOLUMN:Rapssfu.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_plat_do_txt*/
		dat_plat_do_txt?: string|null;
		/**DBCOLUMN:Rapssfu.dat_sber_od*/
		dat_sber_od?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_sber_od_txt*/
		dat_sber_od_txt?: string|null;
		/**DBCOLUMN:Rapssfu.dat_sber_do*/
		dat_sber_do?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_sber_do_txt*/
		dat_sber_do_txt?: string|null;
		/**DBCOLUMN:Rapssfu.priz_odes*/
		priz_odes?: number|null;
		/**DBCOLUMN:Rapssfu.priz_odes_txt*/
		priz_odes_txt?: string|null;
		/**DBCOLUMN:Rapssfu.priz_pod*/
		priz_pod?: number|null;
		/**DBCOLUMN:Rapssfu.priz_pod_txt*/
		priz_pod_txt?: string|null;
		/**DBCOLUMN:Rapssfu.priz_dupl*/
		priz_dupl?: number|null;
		/**DBCOLUMN:Rapssfu.priz_dupl_txt*/
		priz_dupl_txt?: string|null;
		/**DBCOLUMN:Rapssfu.pocet_dupl*/
		pocet_dupl?: number|null;
		/**DBCOLUMN:Rapssfu.ser_cislo_zad*/
		ser_cislo_zad?: number|null;
		/**DBCOLUMN:Rapssfu.icon*/
		icon?: string|null;
		/**DBCOLUMN:Rapssfu.uloha_rap*/
		uloha_rap?: number|null;
		/**DBCOLUMN:Rapssfu.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:Rapssfu.adr_odeslani*/
		adr_odeslani?: string|null;
		/**DBCOLUMN:Rapssfu.ico*/
		ico?: string|null;
		/**DBCOLUMN:Rapssfu.priz_sig*/
		priz_sig?: number|null;
		/**DBCOLUMN:Rapssfu.priz_sig_pov*/
		priz_sig_pov?: number|null;
		/**DBCOLUMN:Rapssfu.org_color*/
		org_color?: string|null;
		/**DBCOLUMN:Rapssfu.cj_wfl*/
		cj_wfl?: string|null;
		/**DBCOLUMN:Rapssfu.aktivita_form*/
		aktivita_form?: number|null;
		/**DBCOLUMN:Rapssfu.typ_lic_form*/
		typ_lic_form?: number|null;
		/**DBCOLUMN:Rapssfu.priz_ginsfil*/
		priz_ginsfil?: number|null;
		/**DBCOLUMN:Rapssfu.ginsfil_soubor_h*/
		ginsfil_soubor_h?: string|null;
		/**DBCOLUMN:Rapssfu.ginsfil_alg_h*/
		ginsfil_alg_h?: string|null;
		/**DBCOLUMN:Rapssfu.ginsfil_fil_revize*/
		ginsfil_fil_revize?: string|null;
		/**DBCOLUMN:Rapssfu.ginsfil_fil_soubor_h*/
		ginsfil_fil_soubor_h?: string|null;
		/**DBCOLUMN:Rapssfu.ginsfil_fil_alg_h*/
		ginsfil_fil_alg_h?: string|null;
		/**DBCOLUMN:Rapssfu.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Rapssfu.typ_poda*/
		typ_poda?: number|null;
		/**DBCOLUMN:Rapssfu.pod_email*/
		pod_email?: string|null;
		/**DBCOLUMN:Rapssfu.pod_id_ds*/
		pod_id_ds?: string|null;
		/**DBCOLUMN:Rapssfu.akt_plat*/
		akt_plat?: number|null;
		/**DBCOLUMN:Rapssfu.akt_sber*/
		akt_sber?: number|null;
		/**DBCOLUMN:Rapssfu.poc_prac_form*/
		poc_prac_form?: number|null;
		/**DBCOLUMN:Rapssfu.url_order_app*/
		url_order_app?: string|null;
		/**DBCOLUMN:Rapssfu.priz_azs*/
		priz_azs?: number|null;
		/**DBCOLUMN:Rapssfu.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Rapssfu.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Rapssfu.mail_to*/
		mail_to?: string|null;
		/**DBCOLUMN:Rapssfu.mail_cc*/
		mail_cc?: string|null;
		/**DBCOLUMN:Rapssfu.mail_bcc*/
		mail_bcc?: string|null;
		/**DBCOLUMN:Rapssfu.popis_kratky*/
		popis_kratky?: string|null;
		/**DBCOLUMN:Rapssfu.poradi_zobr*/
		poradi_zobr?: number|null;
		/**DBCOLUMN:Rapssfu.notifikace*/
		notifikace?: string|null;
		/**DBCOLUMN:Rapssfu.popis*/
		popis?: string|null;
		/**DBCOLUMN:Rapssfu.chyba*/
		chyba?: string|null;
		/**DBCOLUMN:Rapssfu.dotacni_titul*/
		dotacni_titul?: string|null;
		/**DBCOLUMN:Rapssfu.nazev_projektu*/
		nazev_projektu?: string|null;
		/**DBCOLUMN:Rapssfu.pid_zadosti*/
		pid_zadosti?: string|null;
		/**DBCOLUMN:Rapssfu.cj*/
		cj?: string|null;
		/**DBCOLUMN:Rapssfu.kompetent*/
		kompetent?: string|null;
		/**DBCOLUMN:Rapssfu.podano_dne*/
		podano_dne?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.podano_dne_txt*/
		podano_dne_txt?: string|null;
		/**DBCOLUMN:Rapssfu.zmeneno_dne*/
		zmeneno_dne?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.zmeneno_dne_txt*/
		zmeneno_dne_txt?: string|null;
		/**DBCOLUMN:Rapssfu.stav_zadosti*/
		stav_zadosti?: string|null;
		/**DBCOLUMN:Rapssfu.stav_zadosti_kod*/
		stav_zadosti_kod?: number|null;
		/**DBCOLUMN:Rapssfu.stav_pisemnosti*/
		stav_pisemnosti?: string|null;
		/**DBCOLUMN:Rapssfu.detailni_stav_pisemnosti*/
		detailni_stav_pisemnosti?: string|null;
		/**DBCOLUMN:Rapssfu.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Rapssfu.pdf_ixb*/
		pdf_ixb?: string|null;
		/**DBCOLUMN:Rapssfu.pdf_por_cislo*/
		pdf_por_cislo?: number|null;
		/**DBCOLUMN:Rapssfu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Rapssfu.nazev_esu*/
		nazev_esu?: string|null;
		/**DBCOLUMN:Rapssfu.zamer_prj*/
		zamer_prj?: string|null;
		/**DBCOLUMN:Rapssfu.popis_zad*/
		popis_zad?: string|null;
		/**DBCOLUMN:Rapssfu.predp_naklady*/
		predp_naklady?: JsonDecimal|null;
		/**DBCOLUMN:Rapssfu.poz_prostredky*/
		poz_prostredky?: JsonDecimal|null;
		/**DBCOLUMN:Rapssfu.navrh_prostredky*/
		navrh_prostredky?: JsonDecimal|null;
		/**DBCOLUMN:Rapssfu.schv_prostredky*/
		schv_prostredky?: JsonDecimal|null;
		/**DBCOLUMN:Rapssfu.lhuta_vyr*/
		lhuta_vyr?: number|null;
		/**DBCOLUMN:Rapssfu.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.dat_vyrizeni*/
		dat_vyrizeni?: JsonDate|null;
		/**DBCOLUMN:Rapssfu.stav_inb*/
		stav_inb?: number|null;
		/**DBCOLUMN:Rapssfu.stav_inb_txt*/
		stav_inb_txt?: string|null;
		/**DBCOLUMN:Rapssfu.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Rapssfu.k_nazev_ref*/
		k_nazev_ref?: string|null;
		/**DBCOLUMN:Rapssfu.k_nazev*/
		k_nazev?: string|null;
		/**DBCOLUMN:Rapssfu.k_nazev_su*/
		k_nazev_su?: string|null;
		/**DBCOLUMN:Rapssfu.k_nazev_orj*/
		k_nazev_orj?: string|null;
		/**DBCOLUMN:Rapssfu.k_mail*/
		k_mail?: string|null;
		/**DBCOLUMN:Rapssfu.k_tel*/
		k_tel?: string|null;
		/**DBCOLUMN:Rapssfu.pns_cj*/
		pns_cj?: string|null;
		/**DBCOLUMN:Rapssfu.ixs_lpc*/
		ixs_lpc?: string|null;
	}
	const enum RapssfuDtoNames { ixs_for = "ixs_for", ixs_exu = "ixs_exu", por_cislo = "por_cislo", nazev = "nazev", uziv_nazev = "uziv_nazev", form_file_name = "form_file_name", dat_vytvor = "dat_vytvor", dat_vytvor_txt = "dat_vytvor_txt", dat_modif = "dat_modif", dat_modif_txt = "dat_modif_txt", dat_odeslani = "dat_odeslani", dat_odeslani_txt = "dat_odeslani_txt", dat_zprac = "dat_zprac", dat_zprac_txt = "dat_zprac_txt", ixp = "ixp", stav_form = "stav_form", stav_form_txt = "stav_form_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_plat_od = "dat_plat_od", dat_plat_od_txt = "dat_plat_od_txt", dat_plat_do = "dat_plat_do", dat_plat_do_txt = "dat_plat_do_txt", dat_sber_od = "dat_sber_od", dat_sber_od_txt = "dat_sber_od_txt", dat_sber_do = "dat_sber_do", dat_sber_do_txt = "dat_sber_do_txt", priz_odes = "priz_odes", priz_odes_txt = "priz_odes_txt", priz_pod = "priz_pod", priz_pod_txt = "priz_pod_txt", priz_dupl = "priz_dupl", priz_dupl_txt = "priz_dupl_txt", pocet_dupl = "pocet_dupl", ser_cislo_zad = "ser_cislo_zad", icon = "icon", uloha_rap = "uloha_rap", ixs_su = "ixs_su", adr_odeslani = "adr_odeslani", ico = "ico", priz_sig = "priz_sig", priz_sig_pov = "priz_sig_pov", org_color = "org_color", cj_wfl = "cj_wfl", aktivita_form = "aktivita_form", typ_lic_form = "typ_lic_form", priz_ginsfil = "priz_ginsfil", ginsfil_soubor_h = "ginsfil_soubor_h", ginsfil_alg_h = "ginsfil_alg_h", ginsfil_fil_revize = "ginsfil_fil_revize", ginsfil_fil_soubor_h = "ginsfil_fil_soubor_h", ginsfil_fil_alg_h = "ginsfil_fil_alg_h", ixb = "ixb", typ_poda = "typ_poda", pod_email = "pod_email", pod_id_ds = "pod_id_ds", akt_plat = "akt_plat", akt_sber = "akt_sber", poc_prac_form = "poc_prac_form", url_order_app = "url_order_app", priz_azs = "priz_azs", ixs_fun = "ixs_fun", ixs_typ = "ixs_typ", mail_to = "mail_to", mail_cc = "mail_cc", mail_bcc = "mail_bcc", popis_kratky = "popis_kratky", poradi_zobr = "poradi_zobr", notifikace = "notifikace", popis = "popis", chyba = "chyba", dotacni_titul = "dotacni_titul", nazev_projektu = "nazev_projektu", pid_zadosti = "pid_zadosti", cj = "cj", kompetent = "kompetent", podano_dne = "podano_dne", podano_dne_txt = "podano_dne_txt", zmeneno_dne = "zmeneno_dne", zmeneno_dne_txt = "zmeneno_dne_txt", stav_zadosti = "stav_zadosti", stav_zadosti_kod = "stav_zadosti_kod", stav_pisemnosti = "stav_pisemnosti", detailni_stav_pisemnosti = "detailni_stav_pisemnosti", por_cis_nab = "por_cis_nab", pdf_ixb = "pdf_ixb", pdf_por_cislo = "pdf_por_cislo", ixs_esu = "ixs_esu", nazev_esu = "nazev_esu", zamer_prj = "zamer_prj", popis_zad = "popis_zad", predp_naklady = "predp_naklady", poz_prostredky = "poz_prostredky", navrh_prostredky = "navrh_prostredky", schv_prostredky = "schv_prostredky", lhuta_vyr = "lhuta_vyr", dat_pod = "dat_pod", dat_prij_pod = "dat_prij_pod", dat_vyrizeni = "dat_vyrizeni", stav_inb = "stav_inb", stav_inb_txt = "stav_inb_txt", akt_znacka = "akt_znacka", k_nazev_ref = "k_nazev_ref", k_nazev = "k_nazev", k_nazev_su = "k_nazev_su", k_nazev_orj = "k_nazev_orj", k_mail = "k_mail", k_tel = "k_tel", pns_cj = "pns_cj", ixs_lpc = "ixs_lpc",}
	const enum RapssfuDtoFragments { ixs_for = "*", ixs_exu = "*", por_cislo = "*", nazev = "*", uziv_nazev = "*", form_file_name = "*", dat_vytvor = "*", dat_vytvor_txt = "*", dat_modif = "*", dat_modif_txt = "*", dat_odeslani = "*", dat_odeslani_txt = "*", dat_zprac = "*", dat_zprac_txt = "*", ixp = "*", stav_form = "*", stav_form_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_plat_od = "*", dat_plat_od_txt = "*", dat_plat_do = "*", dat_plat_do_txt = "*", dat_sber_od = "*", dat_sber_od_txt = "*", dat_sber_do = "*", dat_sber_do_txt = "*", priz_odes = "*", priz_odes_txt = "*", priz_pod = "*", priz_pod_txt = "*", priz_dupl = "*", priz_dupl_txt = "*", pocet_dupl = "*", ser_cislo_zad = "*", icon = "*", uloha_rap = "*", ixs_su = "*", adr_odeslani = "*", ico = "*", priz_sig = "*", priz_sig_pov = "*", org_color = "*", cj_wfl = "*", aktivita_form = "*", typ_lic_form = "*", priz_ginsfil = "*", ginsfil_soubor_h = "*", ginsfil_alg_h = "*", ginsfil_fil_revize = "*", ginsfil_fil_soubor_h = "*", ginsfil_fil_alg_h = "*", ixb = "*", typ_poda = "*", pod_email = "*", pod_id_ds = "*", akt_plat = "*", akt_sber = "*", poc_prac_form = "*", url_order_app = "*", priz_azs = "*", ixs_fun = "*", ixs_typ = "*", mail_to = "*", mail_cc = "*", mail_bcc = "*", popis_kratky = "*", poradi_zobr = "*", notifikace = "*", popis = "*", chyba = "*", dotacni_titul = "*", nazev_projektu = "*", pid_zadosti = "*", cj = "*", kompetent = "*", podano_dne = "*", podano_dne_txt = "*", zmeneno_dne = "*", zmeneno_dne_txt = "*", stav_zadosti = "*", stav_zadosti_kod = "*", stav_pisemnosti = "*", detailni_stav_pisemnosti = "*", por_cis_nab = "*", pdf_ixb = "*", pdf_por_cislo = "*", ixs_esu = "*", nazev_esu = "*", zamer_prj = "*", popis_zad = "*", predp_naklady = "*", poz_prostredky = "*", navrh_prostredky = "*", schv_prostredky = "*", lhuta_vyr = "*", dat_pod = "*", dat_prij_pod = "*", dat_vyrizeni = "*", stav_inb = "*", stav_inb_txt = "*", akt_znacka = "*", k_nazev_ref = "*", k_nazev = "*", k_nazev_su = "*", k_nazev_orj = "*", k_mail = "*", k_tel = "*", pns_cj = "*", ixs_lpc = "*",}
	const enum RapssfuDtoTypes { ixs_for = "string", ixs_exu = "string", por_cislo = "number", nazev = "string", uziv_nazev = "string", form_file_name = "string", dat_vytvor = "JsonDate", dat_vytvor_txt = "string", dat_modif = "JsonDate", dat_modif_txt = "string", dat_odeslani = "JsonDate", dat_odeslani_txt = "string", dat_zprac = "JsonDate", dat_zprac_txt = "string", ixp = "string", stav_form = "number", stav_form_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_plat_od = "JsonDate", dat_plat_od_txt = "string", dat_plat_do = "JsonDate", dat_plat_do_txt = "string", dat_sber_od = "JsonDate", dat_sber_od_txt = "string", dat_sber_do = "JsonDate", dat_sber_do_txt = "string", priz_odes = "number", priz_odes_txt = "string", priz_pod = "number", priz_pod_txt = "string", priz_dupl = "number", priz_dupl_txt = "string", pocet_dupl = "number", ser_cislo_zad = "number", icon = "string", uloha_rap = "number", ixs_su = "string", adr_odeslani = "string", ico = "string", priz_sig = "number", priz_sig_pov = "number", org_color = "string", cj_wfl = "string", aktivita_form = "number", typ_lic_form = "number", priz_ginsfil = "number", ginsfil_soubor_h = "string", ginsfil_alg_h = "string", ginsfil_fil_revize = "string", ginsfil_fil_soubor_h = "string", ginsfil_fil_alg_h = "string", ixb = "string", typ_poda = "number", pod_email = "string", pod_id_ds = "string", akt_plat = "number", akt_sber = "number", poc_prac_form = "number", url_order_app = "string", priz_azs = "number", ixs_fun = "string", ixs_typ = "string", mail_to = "string", mail_cc = "string", mail_bcc = "string", popis_kratky = "string", poradi_zobr = "number", notifikace = "string", popis = "string", chyba = "string", dotacni_titul = "string", nazev_projektu = "string", pid_zadosti = "string", cj = "string", kompetent = "string", podano_dne = "JsonDate", podano_dne_txt = "string", zmeneno_dne = "JsonDate", zmeneno_dne_txt = "string", stav_zadosti = "string", stav_zadosti_kod = "number", stav_pisemnosti = "string", detailni_stav_pisemnosti = "string", por_cis_nab = "number", pdf_ixb = "string", pdf_por_cislo = "number", ixs_esu = "string", nazev_esu = "string", zamer_prj = "string", popis_zad = "string", predp_naklady = "JsonDecimal", poz_prostredky = "JsonDecimal", navrh_prostredky = "JsonDecimal", schv_prostredky = "JsonDecimal", lhuta_vyr = "number", dat_pod = "JsonDate", dat_prij_pod = "JsonDate", dat_vyrizeni = "JsonDate", stav_inb = "number", stav_inb_txt = "string", akt_znacka = "string", k_nazev_ref = "string", k_nazev = "string", k_nazev_su = "string", k_nazev_orj = "string", k_mail = "string", k_tel = "string", pns_cj = "string", ixs_lpc = "string",}
	const enum RapssfuDtoTypeLengths { ixs_for = 12, ixs_exu = 12, nazev = 254, uziv_nazev = 254, form_file_name = 254, dat_vytvor_txt = 50, dat_modif_txt = 50, dat_odeslani_txt = 50, dat_zprac_txt = 50, ixp = 12, stav_form_txt = 50, zmenu_prov = 12, dat_plat_od_txt = 50, dat_plat_do_txt = 50, dat_sber_od_txt = 50, dat_sber_do_txt = 50, priz_odes_txt = 50, priz_pod_txt = 50, priz_dupl_txt = 50, icon = 254, ixs_su = 12, adr_odeslani = 254, ico = 10, org_color = 10, cj_wfl = 254, ginsfil_soubor_h = 254, ginsfil_alg_h = 100, ginsfil_fil_revize = 30, ginsfil_fil_soubor_h = 254, ginsfil_fil_alg_h = 100, ixb = 12, pod_email = 254, pod_id_ds = 100, url_order_app = 254, ixs_fun = 12, ixs_typ = 12, mail_to = 254, mail_cc = 254, mail_bcc = 254, popis_kratky = 254, notifikace = 254, popis = 5000, chyba = 254, dotacni_titul = 254, nazev_projektu = 254, pid_zadosti = 12, cj = 254, kompetent = 254, podano_dne_txt = 50, zmeneno_dne_txt = 50, stav_zadosti = 254, stav_pisemnosti = 254, detailni_stav_pisemnosti = 254, pdf_ixb = 12, ixs_esu = 12, nazev_esu = 254, zamer_prj = 254, popis_zad = 254, stav_inb_txt = 50, akt_znacka = 50, k_nazev_ref = 200, k_nazev = 25, k_nazev_su = 25, k_nazev_orj = 25, k_mail = 254, k_tel = 33, pns_cj = 254, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GOsobaOpravnenaKNahlizeniDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Osoba oprávněná k nahlížení dle čísla OP*/
	interface GOsobaOpravnenaKNahlizeniDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Pořadí záznamu*/
		poradi?: number|null;
		/**Aktuální číslo občanského průkazu*/
		id_pruk?: string|null;
		/**Aktuální e-mailová adresa*/
		mail?: string|null;
		/**Aktuální identifikátor datové schránky*/
		id_ds?: string|null;
		/**Původní číslo občanského průkazu*/
		id_pruk_puv?: string|null;
		/**Původní e-mailová adresa*/
		mail_puv?: string|null;
		/**Původní identifikátor datové schránky*/
		id_ds_puv?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Aktuální název oprávněné osoby*/
		nazev_oon?: string|null;
		/**Původní název oprávněné osoby*/
		nazev_oon_puv?: string|null;
	}
	const enum GOsobaOpravnenaKNahlizeniDtoNames { ixs_pns = "ixs_pns", poradi = "poradi", id_pruk = "id_pruk", mail = "mail", id_ds = "id_ds", id_pruk_puv = "id_pruk_puv", mail_puv = "mail_puv", id_ds_puv = "id_ds_puv", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_oon = "nazev_oon", nazev_oon_puv = "nazev_oon_puv",}
	const enum GOsobaOpravnenaKNahlizeniDtoFragments { ixs_pns = "*", poradi = "*", id_pruk = "*", mail = "*", id_ds = "*", id_pruk_puv = "*", mail_puv = "*", id_ds_puv = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_oon = "*", nazev_oon_puv = "*",}
	const enum GOsobaOpravnenaKNahlizeniDtoTypes { ixs_pns = "string", poradi = "number", id_pruk = "string", mail = "string", id_ds = "string", id_pruk_puv = "string", mail_puv = "string", id_ds_puv = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_oon = "string", nazev_oon_puv = "string",}
	const enum GOsobaOpravnenaKNahlizeniDtoTypeLengths { ixs_pns = 12, id_pruk = 50, mail = 254, id_ds = 100, id_pruk_puv = 50, mail_puv = 254, id_ds_puv = 100, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12, nazev_oon = 100, nazev_oon_puv = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GOsobaOpravnenaKNahlizeniFilterDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Filtr DTO - osoba oprávněná k nahlížení dle čísla OP*/
	interface GOsobaOpravnenaKNahlizeniFilterDto {
		/**Identifikátor případu nahlížení*/
		ixs_pns?: string|null;
	}
	const enum GOsobaOpravnenaKNahlizeniFilterDtoNames { ixs_pns = "ixs_pns",}
	const enum GOsobaOpravnenaKNahlizeniFilterDtoFragments { ixs_pns = "*",}
	const enum GOsobaOpravnenaKNahlizeniFilterDtoTypes { ixs_pns = "string",}
	const enum GOsobaOpravnenaKNahlizeniFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPlaceholderValueDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Výsledek nahrazení zástpného znaku*/
	interface GPlaceholderValueDto {
		hodnota?: string|null;
		chyba?: string|null;
	}
	const enum GPlaceholderValueDtoNames { hodnota = "hodnota", chyba = "chyba",}
	const enum GPlaceholderValueDtoFragments { hodnota = "*", chyba = "*",}
	const enum GPlaceholderValueDtoTypes { hodnota = "string", chyba = "string",}
	const enum GPlaceholderValueDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPopisnyTextUlohyDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Popisný text pro úlohu*/
	interface GPopisnyTextUlohyDto {
		/**Číslo úlohy*/
		uloha_rap?: number|null;
		/**Název úlohy*/
		uloha_rap_txt?: string|null;
		/**IČO organizace*/
		ico?: string|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Popisný text*/
		popis?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Ikona pro úlohu*/
		icon?: string|null;
		/**Příznak externí úlohy*/
		externi?: number|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GPopisnyTextUlohyDtoNames { uloha_rap = "uloha_rap", uloha_rap_txt = "uloha_rap_txt", ico = "ico", por_cislo = "por_cislo", popis = "popis", aktivita = "aktivita", aktivita_txt = "aktivita_txt", icon = "icon", externi = "externi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPopisnyTextUlohyDtoFragments { uloha_rap = "*", uloha_rap_txt = "*", ico = "*", por_cislo = "*", popis = "*", aktivita = "*", aktivita_txt = "*", icon = "*", externi = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPopisnyTextUlohyDtoTypes { uloha_rap = "number", uloha_rap_txt = "string", ico = "string", por_cislo = "number", popis = "string", aktivita = "number", aktivita_txt = "string", icon = "string", externi = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPopisnyTextUlohyDtoTypeLengths { uloha_rap_txt = 254, ico = 10, popis = 5000, aktivita_txt = 50, icon = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPopisPohledavekDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Společný popis pro typy poplatků*/
	interface GPopisPohledavekDto {
		/**Umístění textu - kód*/
		uut?: number|null;
		/**Umístění textu - popisný text*/
		uut_txt?: string|null;
		/**IČO organizace*/
		ico?: string|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Popisný text*/
		popis?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GPopisPohledavekDtoNames { uut = "uut", uut_txt = "uut_txt", ico = "ico", por_cislo = "por_cislo", popis = "popis", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPopisPohledavekDtoFragments { uut = "*", uut_txt = "*", ico = "*", por_cislo = "*", popis = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPopisPohledavekDtoTypes { uut = "number", uut_txt = "string", ico = "string", por_cislo = "number", popis = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPopisPohledavekDtoTypeLengths { uut_txt = 100, ico = 10, popis = 5000, aktivita_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPopisPohledavkyProRokUcsDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Popis typu poplatku pro rok a ucs*/
	interface GPopisPohledavkyProRokUcsDto {
		/**Typ pohledávky*/
		typ_phl?: string|null;
		/**Rok*/
		rok?: number|null;
		/**IČO*/
		ico?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Umístění textu - kód*/
		uut?: number|null;
		/**Umístění textu - název*/
		uut_txt?: string|null;
		/**Popisný text*/
		popis?: string|null;
		/**Akticita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GPopisPohledavkyProRokUcsDtoNames { typ_phl = "typ_phl", rok = "rok", ico = "ico", ucs = "ucs", por_cislo = "por_cislo", uut = "uut", uut_txt = "uut_txt", popis = "popis", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPopisPohledavkyProRokUcsDtoFragments { typ_phl = "*", rok = "*", ico = "*", ucs = "*", por_cislo = "*", uut = "*", uut_txt = "*", popis = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPopisPohledavkyProRokUcsDtoTypes { typ_phl = "string", rok = "number", ico = "string", ucs = "string", por_cislo = "number", uut = "number", uut_txt = "string", popis = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPopisPohledavkyProRokUcsDtoTypeLengths { typ_phl = 12, ico = 10, ucs = 12, uut_txt = 100, popis = 5000, aktivita_txt = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPopisZivotniSituaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Popis životní situace*/
	interface GPopisZivotniSituaceDto {
		/**Identifikátor životní situace*/
		ixs_zis?: string|null;
		/**Kód oblasti, které se popis týká*/
		kod_sps?: number|null;
		/**Název oblasti, které se popis týká*/
		kod_sps_txt?: string|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Popisný text*/
		popis?: Gordic.General.GRawString|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GPopisZivotniSituaceDtoNames { ixs_zis = "ixs_zis", kod_sps = "kod_sps", kod_sps_txt = "kod_sps_txt", por_cislo = "por_cislo", popis = "popis", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPopisZivotniSituaceDtoFragments { ixs_zis = "*", kod_sps = "*", kod_sps_txt = "*", por_cislo = "*", popis = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPopisZivotniSituaceDtoTypes { ixs_zis = "string", kod_sps = "number", kod_sps_txt = "string", por_cislo = "number", popis = "Gordic.General.GRawString", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPopisZivotniSituaceDtoTypeLengths { ixs_zis = 12, kod_sps_txt = 254, popis = 10000, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPoplatekSeznamDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Seznam poplatků*/
	interface GPoplatekSeznamDto {
		/**Seznam poplatků*/
		seznamPoplatku?: Gordic.Rap.Interface.GPoplatekSubjektuDto[]|null;
		/**Saldo po splatnosti celkem*/
		c_saldo_celkem?: JsonDecimal|null;
		/**Počet dlužných případů*/
		pocet_dluznych_pripadu?: number|null;
		/**Nejstarší datum splatnosti z nesplacených předpisů po splatnosti*/
		nejstarsi_dat_spl_minule?: JsonDate|null;
		/**Nejbližší datum splatnosti z nesplacených předpisů před splatnosti*/
		nejblizsi_dat_spl_budouci?: JsonDate|null;
		/**Celková částka nesplacených předpisů před splatností*/
		c_budouci_celkem?: JsonDecimal|null;
		/**Počet případů, které mají nesplacené předpisy před splatností*/
		pocet_pripadu_pred_splatnosti?: number|null;
		/**Popis hlavičky seznamu poplatků*/
		popis_hlavicka?: string|null;
		/**Příznak, že je nastaveno v seznamu zobrazovat jméno poplatníka*/
		zobrazit_poplatnika?: boolean|null;
		/**Příznak, že je nastaveno v seznamu zobrazovat popis*/
		zobrazit_popis?: boolean|null;
		/**Příznak, že je nastaveno zobrazení osobních údajů*/
		zobrazit_osobni_udaje?: boolean|null;
		/**Příznak, že je nastaveno zobrazovat účetní saldo*/
		zobrazit_ucetni_saldo?: boolean|null;
		/**Výchozí stav filtru pro stav pohledávky*/
		stav_phl_vychozi?: number|null;
		/**Identifikátory případů, kde víme, že nedávno došlo k on-line platbě, ale ta nebyla dosud úspěšně uzavřena, a není tedy dosud zahrnuta ve stavech případů*/
		pripadySNeuzavrenouPlatbou?: string[]|null;
		/**Příznak, že je nastaveno zobrazení odkazu na rychlé platby*/
		zobrazit_odkaz_rychle_platby?: boolean|null;
	}
	const enum GPoplatekSeznamDtoNames { seznamPoplatku = "seznamPoplatku", c_saldo_celkem = "c_saldo_celkem", pocet_dluznych_pripadu = "pocet_dluznych_pripadu", nejstarsi_dat_spl_minule = "nejstarsi_dat_spl_minule", nejblizsi_dat_spl_budouci = "nejblizsi_dat_spl_budouci", c_budouci_celkem = "c_budouci_celkem", pocet_pripadu_pred_splatnosti = "pocet_pripadu_pred_splatnosti", popis_hlavicka = "popis_hlavicka", zobrazit_poplatnika = "zobrazit_poplatnika", zobrazit_popis = "zobrazit_popis", zobrazit_osobni_udaje = "zobrazit_osobni_udaje", zobrazit_ucetni_saldo = "zobrazit_ucetni_saldo", stav_phl_vychozi = "stav_phl_vychozi", pripadySNeuzavrenouPlatbou = "pripadySNeuzavrenouPlatbou", zobrazit_odkaz_rychle_platby = "zobrazit_odkaz_rychle_platby",}
	const enum GPoplatekSeznamDtoFragments { seznamPoplatku = "*", c_saldo_celkem = "*", pocet_dluznych_pripadu = "*", nejstarsi_dat_spl_minule = "*", nejblizsi_dat_spl_budouci = "*", c_budouci_celkem = "*", pocet_pripadu_pred_splatnosti = "*", popis_hlavicka = "*", zobrazit_poplatnika = "*", zobrazit_popis = "*", zobrazit_osobni_udaje = "*", zobrazit_ucetni_saldo = "*", stav_phl_vychozi = "*", pripadySNeuzavrenouPlatbou = "*", zobrazit_odkaz_rychle_platby = "*",}
	const enum GPoplatekSeznamDtoTypes { seznamPoplatku = "Gordic.Rap.Interface.GPoplatekSubjektuDto[]", c_saldo_celkem = "JsonDecimal", pocet_dluznych_pripadu = "number", nejstarsi_dat_spl_minule = "JsonDate", nejblizsi_dat_spl_budouci = "JsonDate", c_budouci_celkem = "JsonDecimal", pocet_pripadu_pred_splatnosti = "number", popis_hlavicka = "string", zobrazit_poplatnika = "boolean", zobrazit_popis = "boolean", zobrazit_osobni_udaje = "boolean", zobrazit_ucetni_saldo = "boolean", stav_phl_vychozi = "number", pripadySNeuzavrenouPlatbou = "string[]", zobrazit_odkaz_rychle_platby = "boolean",}
	const enum GPoplatekSeznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPoplatekSubjektuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Poplatek externího subjektu*/
	interface GPoplatekSubjektuDto {
		/**Identifikátor případu DDP*/
		ixp?: string|null;
		/**Popis poplatku*/
		popis?: string|null;
		/**Typ pohledávky DDP*/
		typ_phl?: string|null;
		/**Název pohledávky DDP*/
		nazev?: string|null;
		/**Vlastní účet (účet úřadu pro platbu pohledávky) - číslo účtu*/
		sk_vl?: string|null;
		/**Vlastní účet (účet úřadu pro platbu pohledávky) - kód banky*/
		bu_vl?: string|null;
		/**Variabilní symbol případu DDP*/
		vs?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Název a adresa externího subjektu*/
		esu_txt?: string|null;
		/**Název externího subjektu*/
		esu_nazev?: string|null;
		/**Datum narození externího subjektu*/
		esu_dat_nar?: JsonDate|null;
		/**Saldo po splatnosti*/
		c_saldo?: JsonDecimal|null;
		/**Nesplacená částka z předepsaných předpisů celkem (bez ohledu na splatnost předpisů)*/
		c_celkem?: JsonDecimal|null;
		/**Účetní saldo k dnešku*/
		c_ucet_saldo?: JsonDecimal|null;
		/**Příznak, zda existuje dosud nesplacený předpis před splatností*/
		existuje_budouci_splatka?: boolean|null;
		/**Celková částka nesplacených předpisů před splatností*/
		c_budouci?: JsonDecimal|null;
		/**Částka nesplacených předpisů s nejbližší splatností (která ještě nenastala)*/
		c_nejblizsi_budouci_splatka?: JsonDecimal|null;
		/**Nejbližší datum splatnosti z nesplacených předpisů před splatnosti*/
		dat_spl_budouci?: JsonDate|null;
		/**Nejstarší datum splatnosti z nesplacených předpisů po splatnosti*/
		dat_spl_minule?: JsonDate|null;
		/**Příznak, že příslušný případ DDP se týká plátce nebo samostatného plátce (nejde o napojeného poplatníka)*/
		priz_platce?: number|null;
		/**Název a adresa plátce napojeného plátce, pokud se příslušný případ DDP týká napojeného poplatníka (priz_platce=0)*/
		platce_esu_txt?: string|null;
		/**Identifikátor případu DDP plátce, pokud se příslušný případ DDP týká napojeného poplatníka (priz_platce=0)*/
		platce_ixp?: string|null;
	}
	const enum GPoplatekSubjektuDtoNames { ixp = "ixp", popis = "popis", typ_phl = "typ_phl", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", vs = "vs", ixs_esu = "ixs_esu", esu_txt = "esu_txt", esu_nazev = "esu_nazev", esu_dat_nar = "esu_dat_nar", c_saldo = "c_saldo", c_celkem = "c_celkem", c_ucet_saldo = "c_ucet_saldo", existuje_budouci_splatka = "existuje_budouci_splatka", c_budouci = "c_budouci", c_nejblizsi_budouci_splatka = "c_nejblizsi_budouci_splatka", dat_spl_budouci = "dat_spl_budouci", dat_spl_minule = "dat_spl_minule", priz_platce = "priz_platce", platce_esu_txt = "platce_esu_txt", platce_ixp = "platce_ixp",}
	const enum GPoplatekSubjektuDtoFragments { ixp = "*", popis = "*", typ_phl = "*", nazev = "*", sk_vl = "*", bu_vl = "*", vs = "*", ixs_esu = "*", esu_txt = "*", esu_nazev = "*", esu_dat_nar = "*", c_saldo = "*", c_celkem = "*", c_ucet_saldo = "*", existuje_budouci_splatka = "*", c_budouci = "*", c_nejblizsi_budouci_splatka = "*", dat_spl_budouci = "*", dat_spl_minule = "*", priz_platce = "*", platce_esu_txt = "*", platce_ixp = "*",}
	const enum GPoplatekSubjektuDtoTypes { ixp = "string", popis = "string", typ_phl = "string", nazev = "string", sk_vl = "string", bu_vl = "string", vs = "string", ixs_esu = "string", esu_txt = "string", esu_nazev = "string", esu_dat_nar = "JsonDate", c_saldo = "JsonDecimal", c_celkem = "JsonDecimal", c_ucet_saldo = "JsonDecimal", existuje_budouci_splatka = "boolean", c_budouci = "JsonDecimal", c_nejblizsi_budouci_splatka = "JsonDecimal", dat_spl_budouci = "JsonDate", dat_spl_minule = "JsonDate", priz_platce = "number", platce_esu_txt = "string", platce_ixp = "string",}
	const enum GPoplatekSubjektuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPozadavekNahlizeniNaSpisDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Požadavek nahlížení na spis*/
	interface GPozadavekNahlizeniNaSpisDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Identifikátor požadavku*/
		ixp?: string|null;
		/**Poznámka k požadavku*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GPozadavekNahlizeniNaSpisDtoNames { ixs_pns = "ixs_pns", ixp = "ixp", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPozadavekNahlizeniNaSpisDtoFragments { ixs_pns = "*", ixp = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPozadavekNahlizeniNaSpisDtoTypes { ixs_pns = "string", ixp = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPozadavekNahlizeniNaSpisDtoTypeLengths { ixs_pns = 12, ixp = 12, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GPripadNahlizeniNaSpisDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Případ nahlížení na spis*/
	interface GPripadNahlizeniNaSpisDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Číslo jednací*/
		cj?: string|null;
		/**Stav případu - kód*/
		stav_spn?: number|null;
		/**Stav případu - název*/
		stav_spn_txt?: string|null;
		/**Typ přístupu - kód*/
		typ_prist_nah?: number|null;
		/**Typ přístupu - název*/
		typ_prist_nah_txt?: string|null;
		/**Způsob ověření - kód*/
		zp_overeni?: number|null;
		/**Způsob ověření - název*/
		zp_overeni_txt?: string|null;
		/**Identifikátor definice omezení přístupu*/
		ixs_tpp?: string|null;
		/**Název definice omezení přístupu*/
		tpp_nazev?: string|null;
		/**Nepoužívá se*/
		ixp?: string|null;
		/**Správce případu nahlížení na spis - identifikátor funkčního místa*/
		ixs_fun_akt?: string|null;
		/**Správce případu nahlížení na spis - název funkce*/
		fun_nazev?: string|null;
		/**Správce případu nahlížení na spis - odpovědná osoba*/
		fun_nazev_ref?: string|null;
		/**Správce případu nahlížení na spis - odpovědná osoba + funkce*/
		fun_nazev_rf?: string|null;
		/**Datum vložení souboru do spisu*/
		dat_vloz?: JsonDate|null;
		/**Počátek platnosti případu nahlížení*/
		dat_od?: JsonDate|null;
		/**Datum expirace*/
		dat_exp?: JsonDate|null;
		/**Maximální datum expirace*/
		dat_exp_max?: JsonDate|null;
		/**Identifikátor písemnosti pro archiv souborů*/
		ixb?: string|null;
		/**Identifikátor pro archiv souborů v elektronickém úložiště*/
		ixs_ulo?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Identifikátor požadavku*/
		pozadavek_ixp?: string|null;
		/**Žadatel: e-mail*/
		mail_zad?: string|null;
		/**Žadatel: identifikátor datové schránky*/
		id_ds_zad?: string|null;
		/**Žadatel: IČO*/
		ico_zad?: string|null;
		/**Žadatel: DIČl*/
		dic_zad?: string|null;
		/**Žadatel: název*/
		nazev_zad?: string|null;
		/**Žadatel: ulice*/
		ulice_zad?: string|null;
		/**Žadatel: číslo orientační*/
		cor_zad?: string|null;
		/**Žadatel: číslo popisné*/
		cpop_zad?: string|null;
		/**Žadatel: obec*/
		obec_zad?: string|null;
		/**Žadatel: PSČ*/
		psc_zad?: string|null;
		/**Příznak přílohy*/
		priz_plm?: number|null;
		/**Příznak stažení souboru*/
		priz_down?: number|null;
		/**Ikona pro archiv souborů*/
		zip_ikona?: string|null;
		/**Velikost archivu souborů*/
		zip_velikost?: JsonDecimal|null;
		/**Velikost archivu souborů - textově*/
		zip_velikost_txt?: string|null;
	}
	const enum GPripadNahlizeniNaSpisDtoNames { ixs_pns = "ixs_pns", cj = "cj", stav_spn = "stav_spn", stav_spn_txt = "stav_spn_txt", typ_prist_nah = "typ_prist_nah", typ_prist_nah_txt = "typ_prist_nah_txt", zp_overeni = "zp_overeni", zp_overeni_txt = "zp_overeni_txt", ixs_tpp = "ixs_tpp", tpp_nazev = "tpp_nazev", ixp = "ixp", ixs_fun_akt = "ixs_fun_akt", fun_nazev = "fun_nazev", fun_nazev_ref = "fun_nazev_ref", fun_nazev_rf = "fun_nazev_rf", dat_vloz = "dat_vloz", dat_od = "dat_od", dat_exp = "dat_exp", dat_exp_max = "dat_exp_max", ixb = "ixb", ixs_ulo = "ixs_ulo", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pozadavek_ixp = "pozadavek_ixp", mail_zad = "mail_zad", id_ds_zad = "id_ds_zad", ico_zad = "ico_zad", dic_zad = "dic_zad", nazev_zad = "nazev_zad", ulice_zad = "ulice_zad", cor_zad = "cor_zad", cpop_zad = "cpop_zad", obec_zad = "obec_zad", psc_zad = "psc_zad", priz_plm = "priz_plm", priz_down = "priz_down", zip_ikona = "zip_ikona", zip_velikost = "zip_velikost", zip_velikost_txt = "zip_velikost_txt",}
	const enum GPripadNahlizeniNaSpisDtoFragments { ixs_pns = "*", cj = "*", stav_spn = "*", stav_spn_txt = "*", typ_prist_nah = "*", typ_prist_nah_txt = "*", zp_overeni = "*", zp_overeni_txt = "*", ixs_tpp = "*", tpp_nazev = "*", ixp = "*", ixs_fun_akt = "*", fun_nazev = "*", fun_nazev_ref = "*", fun_nazev_rf = "*", dat_vloz = "*", dat_od = "*", dat_exp = "*", dat_exp_max = "*", ixb = "*", ixs_ulo = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", pozadavek_ixp = "*", mail_zad = "*", id_ds_zad = "*", ico_zad = "*", dic_zad = "*", nazev_zad = "*", ulice_zad = "*", cor_zad = "*", cpop_zad = "*", obec_zad = "*", psc_zad = "*", priz_plm = "*", priz_down = "*", zip_ikona = "*", zip_velikost = "*", zip_velikost_txt = "*",}
	const enum GPripadNahlizeniNaSpisDtoTypes { ixs_pns = "string", cj = "string", stav_spn = "number", stav_spn_txt = "string", typ_prist_nah = "number", typ_prist_nah_txt = "string", zp_overeni = "number", zp_overeni_txt = "string", ixs_tpp = "string", tpp_nazev = "string", ixp = "string", ixs_fun_akt = "string", fun_nazev = "string", fun_nazev_ref = "string", fun_nazev_rf = "string", dat_vloz = "JsonDate", dat_od = "JsonDate", dat_exp = "JsonDate", dat_exp_max = "JsonDate", ixb = "string", ixs_ulo = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", pozadavek_ixp = "string", mail_zad = "string", id_ds_zad = "string", ico_zad = "string", dic_zad = "string", nazev_zad = "string", ulice_zad = "string", cor_zad = "string", cpop_zad = "string", obec_zad = "string", psc_zad = "string", priz_plm = "number", priz_down = "number", zip_ikona = "string", zip_velikost = "JsonDecimal", zip_velikost_txt = "string",}
	const enum GPripadNahlizeniNaSpisDtoTypeLengths { ixs_pns = 12, cj = 50, stav_spn_txt = 100, typ_prist_nah_txt = 50, zp_overeni_txt = 100, ixs_tpp = 12, tpp_nazev = 254, ixp = 12, ixs_fun_akt = 12, fun_nazev = 25, fun_nazev_ref = 254, fun_nazev_rf = 254, ixb = 12, ixs_ulo = 12, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12, pozadavek_ixp = 12, mail_zad = 254, id_ds_zad = 100, ico_zad = 10, dic_zad = 15, nazev_zad = 100, ulice_zad = 48, cor_zad = 6, cpop_zad = 8, obec_zad = 48, psc_zad = 12, zip_ikona = 254, zip_velikost_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GRapLoginInfoDto.d.ts 

declare namespace Gordic.Rap.Interface {
	interface GRapLoginInfoDto {
		user_ip?: string|null;
		user_niaid?: string|null;
		dat_login?: JsonDate|null;
	}
	const enum GRapLoginInfoDtoNames { user_ip = "user_ip", user_niaid = "user_niaid", dat_login = "dat_login",}
	const enum GRapLoginInfoDtoFragments { user_ip = "*", user_niaid = "*", dat_login = "*",}
	const enum GRapLoginInfoDtoTypes { user_ip = "string", user_niaid = "string", dat_login = "JsonDate",}
	const enum GRapLoginInfoDtoTypeLengths { user_ip = 254, user_niaid = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GSkupinaPoctuOdeslaniDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Skupina pro omezení počtu odeslání formulářů*/
	interface GSkupinaPoctuOdeslaniDto {
		/**Identifikátor skupiny*/
		ixs_opo?: string|null;
		/**Název skupiny*/
		nazev?: string|null;
		/**Počátek platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Konec platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Maximální počet odeslání*/
		pocet_dupl?: number|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GSkupinaPoctuOdeslaniDtoNames { ixs_opo = "ixs_opo", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", pocet_dupl = "pocet_dupl", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSkupinaPoctuOdeslaniDtoFragments { ixs_opo = "*", nazev = "*", dat_od = "*", dat_do = "*", pocet_dupl = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSkupinaPoctuOdeslaniDtoTypes { ixs_opo = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", pocet_dupl = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSkupinaPoctuOdeslaniDtoTypeLengths { ixs_opo = 12, nazev = 254, aktivita_txt = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GSkupinaUlohyRap1Dto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Podúloha - 1. úroveň*/
	interface GSkupinaUlohyRap1Dto {
		/**Identifikátor podúlohy 1. úrovně*/
		ixs_sk1?: string|null;
		/**Kód úlohy*/
		uloha_rap?: number|null;
		/**Název úlohy*/
		uloha_rap_txt?: string|null;
		/**Varianta zobrazení - kód*/
		priz_var?: number|null;
		/**Varianta zobrazení - název*/
		priz_var_txt?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Název zobrazený uživateli*/
		nazev_uziv?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Pořadí zobrazení*/
		poradi_zobr?: number|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**ikona*/
		icon?: string|null;
		/**Část RAP*/
		cast_rap?: string|null;
	}
	const enum GSkupinaUlohyRap1DtoNames { ixs_sk1 = "ixs_sk1", uloha_rap = "uloha_rap", uloha_rap_txt = "uloha_rap_txt", priz_var = "priz_var", priz_var_txt = "priz_var_txt", ico = "ico", nazev = "nazev", nazev_uziv = "nazev_uziv", zkratka = "zkratka", poradi_zobr = "poradi_zobr", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", icon = "icon", cast_rap = "cast_rap",}
	const enum GSkupinaUlohyRap1DtoFragments { ixs_sk1 = "*", uloha_rap = "*", uloha_rap_txt = "*", priz_var = "*", priz_var_txt = "*", ico = "*", nazev = "*", nazev_uziv = "*", zkratka = "*", poradi_zobr = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", icon = "*", cast_rap = "*",}
	const enum GSkupinaUlohyRap1DtoTypes { ixs_sk1 = "string", uloha_rap = "number", uloha_rap_txt = "string", priz_var = "number", priz_var_txt = "string", ico = "string", nazev = "string", nazev_uziv = "string", zkratka = "string", poradi_zobr = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", icon = "string", cast_rap = "string",}
	const enum GSkupinaUlohyRap1DtoTypeLengths { ixs_sk1 = 12, uloha_rap_txt = 254, priz_var_txt = 254, ico = 10, nazev = 254, nazev_uziv = 254, zkratka = 50, aktivita_txt = 254, zmenu_prov = 12, icon = 254, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GSkupinaUlohyRap2Dto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Podúloha - 2. úroveň*/
	interface GSkupinaUlohyRap2Dto {
		/**Identifikátor podúlohy 2. úrovně*/
		ixs_sk2?: string|null;
		/**Identifikátor podúlohy 1. úrovně*/
		ixs_sk1?: string|null;
		/**Název podúlohy 2. úrovně*/
		nazev?: string|null;
		/**Název zobrazený uživateli*/
		nazev_uziv?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Pořadí zobrazení*/
		poradi_zobr?: number|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Ikona*/
		icon?: string|null;
		/**Část RAP*/
		cast_rap?: string|null;
	}
	const enum GSkupinaUlohyRap2DtoNames { ixs_sk2 = "ixs_sk2", ixs_sk1 = "ixs_sk1", nazev = "nazev", nazev_uziv = "nazev_uziv", zkratka = "zkratka", poradi_zobr = "poradi_zobr", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", icon = "icon", cast_rap = "cast_rap",}
	const enum GSkupinaUlohyRap2DtoFragments { ixs_sk2 = "*", ixs_sk1 = "*", nazev = "*", nazev_uziv = "*", zkratka = "*", poradi_zobr = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", icon = "*", cast_rap = "*",}
	const enum GSkupinaUlohyRap2DtoTypes { ixs_sk2 = "string", ixs_sk1 = "string", nazev = "string", nazev_uziv = "string", zkratka = "string", poradi_zobr = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", icon = "string", cast_rap = "string",}
	const enum GSkupinaUlohyRap2DtoTypeLengths { ixs_sk2 = 12, ixs_sk1 = 12, nazev = 254, nazev_uziv = 254, zkratka = 50, aktivita_txt = 254, zmenu_prov = 12, icon = 254, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GSouborPripaduNahlizeniDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Soubor případu nahlížení*/
	interface GSouborPripaduNahlizeniDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Identifikátor písemnosti*/
		ixb?: string|null;
		/**Identifikátor souboru v elektronickém úložišti*/
		ixs_ulo?: string|null;
		/**Název souboru*/
		soubor?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Cesta k souboru na straně klienta*/
		soubor_klient?: string|null;
		/**Příznak změny*/
		zmena?: boolean|null;
		/**Ikona*/
		ikona?: string|null;
		/**Typ souboru*/
		typ_soub?: string|null;
		/**Velikost souboru*/
		velikost?: JsonDecimal|null;
		/**Velikost souboru - textově*/
		velikost_txt?: string|null;
	}
	const enum GSouborPripaduNahlizeniDtoNames { ixs_pns = "ixs_pns", ixb = "ixb", ixs_ulo = "ixs_ulo", soubor = "soubor", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", soubor_klient = "soubor_klient", zmena = "zmena", ikona = "ikona", typ_soub = "typ_soub", velikost = "velikost", velikost_txt = "velikost_txt",}
	const enum GSouborPripaduNahlizeniDtoFragments { ixs_pns = "*", ixb = "*", ixs_ulo = "*", soubor = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", soubor_klient = "*", zmena = "*", ikona = "*", typ_soub = "*", velikost = "*", velikost_txt = "*",}
	const enum GSouborPripaduNahlizeniDtoTypes { ixs_pns = "string", ixb = "string", ixs_ulo = "string", soubor = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", soubor_klient = "string", zmena = "boolean", ikona = "string", typ_soub = "string", velikost = "JsonDecimal", velikost_txt = "string",}
	const enum GSouborPripaduNahlizeniDtoTypeLengths { ixs_pns = 12, ixb = 12, ixs_ulo = 12, soubor = 254, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12, soubor_klient = 4000, ikona = 254, typ_soub = 5, velikost_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GSouvisejiciFormularDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Související formulář*/
	interface GSouvisejiciFormularDto {
		/**Identifikátor formuláře*/
		ixs_for?: string|null;
		/**Název formuláře*/
		ixs_for_nazev?: string|null;
		/**Identifikátor souvisejícího formuláře*/
		ixs_for_souv?: string|null;
		/**Název souvisejícího formuláře*/
		ixs_for_souv_nazev?: string|null;
		/**Příznak oznámení - kód*/
		priz_ozn?: number|null;
		/**Příznak oznámení - název*/
		priz_ozn_txt?: string|null;
		/**Pořadí zobrazení*/
		poradi_zobr?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Typ akce - kód*/
		form_akce?: number|null;
		/**Typ akce - název*/
		form_akce_txt?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GSouvisejiciFormularDtoNames { ixs_for = "ixs_for", ixs_for_nazev = "ixs_for_nazev", ixs_for_souv = "ixs_for_souv", ixs_for_souv_nazev = "ixs_for_souv_nazev", priz_ozn = "priz_ozn", priz_ozn_txt = "priz_ozn_txt", poradi_zobr = "poradi_zobr", poznamka = "poznamka", form_akce = "form_akce", form_akce_txt = "form_akce_txt", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSouvisejiciFormularDtoFragments { ixs_for = "*", ixs_for_nazev = "*", ixs_for_souv = "*", ixs_for_souv_nazev = "*", priz_ozn = "*", priz_ozn_txt = "*", poradi_zobr = "*", poznamka = "*", form_akce = "*", form_akce_txt = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSouvisejiciFormularDtoTypes { ixs_for = "string", ixs_for_nazev = "string", ixs_for_souv = "string", ixs_for_souv_nazev = "string", priz_ozn = "number", priz_ozn_txt = "string", poradi_zobr = "number", poznamka = "string", form_akce = "number", form_akce_txt = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSouvisejiciFormularDtoTypeLengths { ixs_for = 12, ixs_for_nazev = 254, ixs_for_souv = 12, ixs_for_souv_nazev = 254, priz_ozn_txt = 50, poznamka = 50, form_akce_txt = 254, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GSouvisejiciZivotniSituaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Související životní situace*/
	interface GSouvisejiciZivotniSituaceDto {
		/**Identifikátor životní situacec*/
		ixs_zis?: string|null;
		/**Název životní situace*/
		zis_nazev?: string|null;
		/**Identifikátor související životní situace*/
		ixs_zis1?: string|null;
		/**Název související životní situace*/
		zis1_nazev?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GSouvisejiciZivotniSituaceDtoNames { ixs_zis = "ixs_zis", zis_nazev = "zis_nazev", ixs_zis1 = "ixs_zis1", zis1_nazev = "zis1_nazev", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSouvisejiciZivotniSituaceDtoFragments { ixs_zis = "*", zis_nazev = "*", ixs_zis1 = "*", zis1_nazev = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSouvisejiciZivotniSituaceDtoTypes { ixs_zis = "string", zis_nazev = "string", ixs_zis1 = "string", zis1_nazev = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSouvisejiciZivotniSituaceDtoTypeLengths { ixs_zis = 12, zis_nazev = 254, ixs_zis1 = 12, zis1_nazev = 254, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GUcastnikRizeniDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Účastník řízení*/
	interface GUcastnikRizeniDto {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns?: string|null;
		/**Pořadové číslo záznamu*/
		poradi?: number|null;
		/**IČO*/
		ico_uca?: string|null;
		/**DIČ*/
		dic_uca?: string|null;
		/**Název účastníka*/
		nazev_uca?: string|null;
		/**Ulice*/
		ulice_uca?: string|null;
		/**Číslo orientační*/
		cor_uca?: string|null;
		/**Číslo popisné*/
		cpop_uca?: string|null;
		/**Obec*/
		obec_uca?: string|null;
		/**PSČ*/
		psc_uca?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GUcastnikRizeniDtoNames { ixs_pns = "ixs_pns", poradi = "poradi", ico_uca = "ico_uca", dic_uca = "dic_uca", nazev_uca = "nazev_uca", ulice_uca = "ulice_uca", cor_uca = "cor_uca", cpop_uca = "cpop_uca", obec_uca = "obec_uca", psc_uca = "psc_uca", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUcastnikRizeniDtoFragments { ixs_pns = "*", poradi = "*", ico_uca = "*", dic_uca = "*", nazev_uca = "*", ulice_uca = "*", cor_uca = "*", cpop_uca = "*", obec_uca = "*", psc_uca = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUcastnikRizeniDtoTypes { ixs_pns = "string", poradi = "number", ico_uca = "string", dic_uca = "string", nazev_uca = "string", ulice_uca = "string", cor_uca = "string", cpop_uca = "string", obec_uca = "string", psc_uca = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GUcastnikRizeniDtoTypeLengths { ixs_pns = 12, ico_uca = 14, dic_uca = 15, nazev_uca = 100, ulice_uca = 48, cor_uca = 6, cpop_uca = 8, obec_uca = 48, psc_uca = 12, poznamka = 50, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GVazbaFormulareNaSkupinuPoctuOdeslaniDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Vazba formuláře na skupinu omezení počtu odeslání*/
	interface GVazbaFormulareNaSkupinuPoctuOdeslaniDto {
		/**Identifikátor skupiny omezení*/
		ixs_opo?: string|null;
		/**Název skupiny omezení*/
		opo_nazev?: string|null;
		/**Identifikátor formuláře*/
		ixs_for?: string|null;
		/**Název formuláře*/
		for_nazev?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Maximální počet odeslání*/
		pocet_dupl?: number|null;
		/**Počátek platnosti skupiny omezení*/
		dat_od?: JsonDate|null;
		/**Konec platnosti skupiny omezení*/
		dat_do?: JsonDate|null;
		/**Aktivita skupiny omezení*/
		skupina_aktivita?: number|null;
	}
	const enum GVazbaFormulareNaSkupinuPoctuOdeslaniDtoNames { ixs_opo = "ixs_opo", opo_nazev = "opo_nazev", ixs_for = "ixs_for", for_nazev = "for_nazev", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pocet_dupl = "pocet_dupl", dat_od = "dat_od", dat_do = "dat_do", skupina_aktivita = "skupina_aktivita",}
	const enum GVazbaFormulareNaSkupinuPoctuOdeslaniDtoFragments { ixs_opo = "*", opo_nazev = "*", ixs_for = "*", for_nazev = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", pocet_dupl = "*", dat_od = "*", dat_do = "*", skupina_aktivita = "*",}
	const enum GVazbaFormulareNaSkupinuPoctuOdeslaniDtoTypes { ixs_opo = "string", opo_nazev = "string", ixs_for = "string", for_nazev = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", pocet_dupl = "number", dat_od = "JsonDate", dat_do = "JsonDate", skupina_aktivita = "number",}
	const enum GVazbaFormulareNaSkupinuPoctuOdeslaniDtoTypeLengths { ixs_opo = 12, opo_nazev = 254, ixs_for = 12, for_nazev = 254, aktivita_txt = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GVazbaZivotniSituaceNaSkupinuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Vazba životní situace na skupinu životních situací*/
	interface GVazbaZivotniSituaceNaSkupinuDto {
		/**Identifikátor životní situace*/
		ixs_zis?: string|null;
		/**Identifikátor skupiny - podúloha 2. úrovně*/
		ixs_sk2?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Název životní situace*/
		zis_nazev?: string|null;
		/**Název skupiny - podúlohy 2. úrovně*/
		sk2_nazev?: string|null;
		/**Aktivita záznamu - textový popis*/
		aktivita_txt?: string|null;
		/**Část RAP*/
		cast_rap?: string|null;
	}
	const enum GVazbaZivotniSituaceNaSkupinuDtoNames { ixs_zis = "ixs_zis", ixs_sk2 = "ixs_sk2", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zis_nazev = "zis_nazev", sk2_nazev = "sk2_nazev", aktivita_txt = "aktivita_txt", cast_rap = "cast_rap",}
	const enum GVazbaZivotniSituaceNaSkupinuDtoFragments { ixs_zis = "*", ixs_sk2 = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zis_nazev = "*", sk2_nazev = "*", aktivita_txt = "*", cast_rap = "*",}
	const enum GVazbaZivotniSituaceNaSkupinuDtoTypes { ixs_zis = "string", ixs_sk2 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zis_nazev = "string", sk2_nazev = "string", aktivita_txt = "string", cast_rap = "string",}
	const enum GVazbaZivotniSituaceNaSkupinuDtoTypeLengths { ixs_zis = 12, ixs_sk2 = 12, zmenu_prov = 12, zis_nazev = 254, sk2_nazev = 254, aktivita_txt = 254, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GZastupnyZnakDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Zástupný text*/
	interface GZastupnyZnakDto {
		/**Identifikátor zástupného textu*/
		id_zzn?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Jméno databázové tabulky - kód*/
		tabname?: string|null;
		/**Sloupec databázové tabulky - kód*/
		colname?: string|null;
		/**Jméno databázové tabulky - popis*/
		pub_tabname?: string|null;
		/**Sloupec databázové tabulky - popis*/
		pub_colname?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GZastupnyZnakDtoNames { id_zzn = "id_zzn", nazev = "nazev", tabname = "tabname", colname = "colname", pub_tabname = "pub_tabname", pub_colname = "pub_colname", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GZastupnyZnakDtoFragments { id_zzn = "*", nazev = "*", tabname = "*", colname = "*", pub_tabname = "*", pub_colname = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GZastupnyZnakDtoTypes { id_zzn = "string", nazev = "string", tabname = "string", colname = "string", pub_tabname = "string", pub_colname = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GZastupnyZnakDtoTypeLengths { id_zzn = 15, nazev = 254, tabname = 18, colname = 18, pub_tabname = 254, pub_colname = 254, poznamka = 254, aktivita_txt = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GZaznamHledaniPoplatkuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Historie hledání poplatku*/
	interface GZaznamHledaniPoplatkuDto {
		/**Licence*/
		lic?: string|null;
		/**Pořadové číslo záznamu*/
		por_cislo?: number|null;
		/**Pořadové číslo relace*/
		log_por_cislo?: number|null;
		/**Identifikátor relace*/
		ixs_lpc?: string|null;
		/**Datum a čas platby*/
		dat_plb?: JsonDate|null;
		/**Identifikátor poplatníka*/
		id_popl?: string|null;
		/**Jméno poplatníka*/
		jmeno?: string|null;
		/**Příjmení poplatníka*/
		prijmeni?: string|null;
		/**Název poplatníka*/
		nazev?: string|null;
		/**E-mail poplatníka*/
		mail?: string|null;
		/**Příznak souhlasu*/
		priz_souhlas?: number|null;
		/**Ixp poplatníka*/
		ixp?: string|null;
		/**Datum a čas založení záznamu*/
		dat_zmena?: JsonDate|null;
	}
	const enum GZaznamHledaniPoplatkuDtoNames { lic = "lic", por_cislo = "por_cislo", log_por_cislo = "log_por_cislo", ixs_lpc = "ixs_lpc", dat_plb = "dat_plb", id_popl = "id_popl", jmeno = "jmeno", prijmeni = "prijmeni", nazev = "nazev", mail = "mail", priz_souhlas = "priz_souhlas", ixp = "ixp", dat_zmena = "dat_zmena",}
	const enum GZaznamHledaniPoplatkuDtoFragments { lic = "*", por_cislo = "*", log_por_cislo = "*", ixs_lpc = "*", dat_plb = "*", id_popl = "*", jmeno = "*", prijmeni = "*", nazev = "*", mail = "*", priz_souhlas = "*", ixp = "*", dat_zmena = "*",}
	const enum GZaznamHledaniPoplatkuDtoTypes { lic = "string", por_cislo = "number", log_por_cislo = "number", ixs_lpc = "string", dat_plb = "JsonDate", id_popl = "string", jmeno = "string", prijmeni = "string", nazev = "string", mail = "string", priz_souhlas = "number", ixp = "string", dat_zmena = "JsonDate",}
	const enum GZaznamHledaniPoplatkuDtoTypeLengths { lic = 4, ixs_lpc = 12, id_popl = 254, jmeno = 100, prijmeni = 100, nazev = 254, mail = 254, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GZivotniSituaceDetailDto.d.ts 

declare namespace Gordic.Rap.Interface {
	interface GZivotniSituaceDetailDto {
		/**detail*/
		zivotniSituace?: Gordic.Rap.Interface.GZivotniSituaceDto|null;
		/**popis*/
		popisZivotniSituace?: Gordic.Rap.Interface.GPopisZivotniSituaceDto[]|null;
		/**vazby na formuláře*/
		formulareZivotniSituace?: Gordic.Rap.Interface.GFormulareZivotniSituaceDto[]|null;
		souvisejiciZivotniSituace?: Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto[]|null;
		/**formuláře*/
		formulare?: Gordic.Rap.Interface.RapssfoDto[]|null;
	}
	const enum GZivotniSituaceDetailDtoNames { zivotniSituace = "zivotniSituace", popisZivotniSituace = "popisZivotniSituace", formulareZivotniSituace = "formulareZivotniSituace", souvisejiciZivotniSituace = "souvisejiciZivotniSituace", formulare = "formulare",}
	const enum GZivotniSituaceDetailDtoFragments { zivotniSituace = "*", popisZivotniSituace = "*", formulareZivotniSituace = "*", souvisejiciZivotniSituace = "*", formulare = "*",}
	const enum GZivotniSituaceDetailDtoTypes { zivotniSituace = "Gordic.Rap.Interface.GZivotniSituaceDto", popisZivotniSituace = "Gordic.Rap.Interface.GPopisZivotniSituaceDto[]", formulareZivotniSituace = "Gordic.Rap.Interface.GFormulareZivotniSituaceDto[]", souvisejiciZivotniSituace = "Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto[]", formulare = "Gordic.Rap.Interface.RapssfoDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GZivotniSituaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Životní situace*/
	interface GZivotniSituaceDto {
		/**Identifikátor životní situace*/
		ixs_zis?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Kód životní situace*/
		id_zis?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Počátek platnosti*/
		dat_plat_od?: JsonDate|null;
		/**Konec platnosti*/
		dat_plat_do?: JsonDate|null;
		/**Datum právního stavu*/
		dat_prav_stav?: JsonDate|null;
		/**Datum poslední aktualizace*/
		dat_akt?: JsonDate|null;
		/**URL s dalšími informacemi*/
		url?: string|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Popis*/
		popis?: Gordic.General.GRawString|null;
		/**Část RAP*/
		cast_rap?: string|null;
	}
	const enum GZivotniSituaceDtoNames { ixs_zis = "ixs_zis", ico = "ico", id_zis = "id_zis", nazev = "nazev", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", dat_prav_stav = "dat_prav_stav", dat_akt = "dat_akt", url = "url", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis = "popis", cast_rap = "cast_rap",}
	const enum GZivotniSituaceDtoFragments { ixs_zis = "*", ico = "*", id_zis = "*", nazev = "*", dat_plat_od = "*", dat_plat_do = "*", dat_prav_stav = "*", dat_akt = "*", url = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", popis = "*", cast_rap = "*",}
	const enum GZivotniSituaceDtoTypes { ixs_zis = "string", ico = "string", id_zis = "string", nazev = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", dat_prav_stav = "JsonDate", dat_akt = "JsonDate", url = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", popis = "Gordic.General.GRawString", cast_rap = "string",}
	const enum GZivotniSituaceDtoTypeLengths { ixs_zis = 12, ico = 10, id_zis = 254, nazev = 254, url = 254, aktivita_txt = 254, zmenu_prov = 12, popis = 10000, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GZivotniSituaceTypuPohledavkyDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Životní situace pro typ poplatku*/
	interface GZivotniSituaceTypuPohledavkyDto {
		/**Typ pohledávky*/
		typ_phl?: string|null;
		/**Identifikátor životní situace*/
		ixs_zis?: string|null;
		/**Počátek platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Konec platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - popisný text*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Název formuláře*/
		zs_nazev?: string|null;
		/**Popis*/
		popis?: string|null;
	}
	const enum GZivotniSituaceTypuPohledavkyDtoNames { typ_phl = "typ_phl", ixs_zis = "ixs_zis", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zs_nazev = "zs_nazev", popis = "popis",}
	const enum GZivotniSituaceTypuPohledavkyDtoFragments { typ_phl = "*", ixs_zis = "*", dat_od = "*", dat_do = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", zs_nazev = "*", popis = "*",}
	const enum GZivotniSituaceTypuPohledavkyDtoTypes { typ_phl = "string", ixs_zis = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zs_nazev = "string", popis = "string",}
	const enum GZivotniSituaceTypuPohledavkyDtoTypeLengths { typ_phl = 6, ixs_zis = 12, aktivita_txt = 254, zmenu_prov = 12, zs_nazev = 254, popis = 2048,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\GZpusobyPodaniFormulareDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Způsob podání formuláře*/
	interface GZpusobyPodaniFormulareDto {
		/**Identifikátor formuláře*/
		ixs_for?: string|null;
		/**Typ podání - kód*/
		typ_poda?: number|null;
		/**Typ podání - název*/
		typ_poda_txt?: string|null;
		/**Příznak podpisu*/
		priz_sig?: number|null;
		/**Příznak povinného podpisu*/
		priz_sig_pov?: number|null;
		/**Aktivita záznamu - kód*/
		aktivita?: number|null;
		/**Aktivita záznamu - tetový popis*/
		aktivita_txt?: string|null;
		/**Datum a čas poslední změny záznamu*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Název formuláře*/
		for_nazev?: string|null;
	}
	const enum GZpusobyPodaniFormulareDtoNames { ixs_for = "ixs_for", typ_poda = "typ_poda", typ_poda_txt = "typ_poda_txt", priz_sig = "priz_sig", priz_sig_pov = "priz_sig_pov", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", for_nazev = "for_nazev",}
	const enum GZpusobyPodaniFormulareDtoFragments { ixs_for = "*", typ_poda = "*", typ_poda_txt = "*", priz_sig = "*", priz_sig_pov = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", for_nazev = "*",}
	const enum GZpusobyPodaniFormulareDtoTypes { ixs_for = "string", typ_poda = "number", typ_poda_txt = "string", priz_sig = "number", priz_sig_pov = "number", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", for_nazev = "string",}
	const enum GZpusobyPodaniFormulareDtoTypeLengths { ixs_for = 12, typ_poda_txt = 254, aktivita_txt = 254, zmenu_prov = 12, for_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\JmenoPrijmeniDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**DBTABLE:~*/
	interface JmenoPrijmeniDto {
		/**jmeno*/
		jmeno?: string|null;
		/**prijmeni*/
		prijmeni?: string|null;
		/**nazev*/
		nazev?: string|null;
	}
	const enum JmenoPrijmeniDtoNames { jmeno = "jmeno", prijmeni = "prijmeni", nazev = "nazev",}
	const enum JmenoPrijmeniDtoFragments { jmeno = "*", prijmeni = "*", nazev = "*",}
	const enum JmenoPrijmeniDtoTypes { jmeno = "string", prijmeni = "string", nazev = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\MB00StavResponseDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Odpověď služby MB00 na zjištění stavu poplatkové povinnnosti*/
	interface MB00StavResponseDto {
		/**Jméno poplatníka*/
		jmeno?: string|null;
		/**Příjmení poplatníka*/
		prijmeni?: string|null;
		/**Datum narození poplatníka*/
		datumNarozeni?: string|null;
		/**Adresa poplatníka*/
		adresa?: string|null;
		/**Datum poslední úhrady*/
		datumPosledniUhrady?: string|null;
		/**Status*/
		status?: number|null;
		/**Textový status*/
		textovyStatus?: string|null;
	}
	const enum MB00StavResponseDtoNames { jmeno = "jmeno", prijmeni = "prijmeni", datumNarozeni = "datumNarozeni", adresa = "adresa", datumPosledniUhrady = "datumPosledniUhrady", status = "status", textovyStatus = "textovyStatus",}
	const enum MB00StavResponseDtoFragments { jmeno = "*", prijmeni = "*", datumNarozeni = "*", adresa = "*", datumPosledniUhrady = "*", status = "*", textovyStatus = "*",}
	const enum MB00StavResponseDtoTypes { jmeno = "string", prijmeni = "string", datumNarozeni = "string", adresa = "string", datumPosledniUhrady = "string", status = "number", textovyStatus = "string",}
	const enum MB00StavResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\NapojeniPoplatniciEsuDto.d.ts 

declare namespace Gordic.Rap.Interface {
    /**DBTABLE:NapojeniPoplatniciEsu*/
    interface NapojeniPoplatniciEsuDto {
        /**DBCOLUMN:NapojeniPoplatniciEsu.typ_phl*/
        typ_phl?: string|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.ixp_pl*/
        ixp_pl?: string|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.ixp_pop*/
        ixp_pop?: string|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.poradi*/
        poradi?: number|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.dat_od*/
        dat_od?: JsonDate|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.dat_do*/
        dat_do?: JsonDate|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.aktivita*/
        aktivita?: number|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.dat_zmena*/
        dat_zmena?: JsonDate|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.zmenu_prov*/
        zmenu_prov?: string|null;
        /**DBCOLUMN:NapojeniPoplatniciEsu.esu_txt*/
        esu_txt?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\Gordic.Rap.Interface.RapcstfDto.d.ts 

declare namespace Gordic.Rap.Interface {
    /**DBTABLE:Rapcstf*/
	interface RapcstfDto {
        /**DBCOLUMN:Rapcstf.stav_form*/
		stav_form?: number|null;
        /**DBCOLUMN:Rapcstf.stav_form_txt*/
		stav_form_txt?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\Gordic.Rap.Interface.RokFormulareDto.d.ts 

declare namespace Gordic.Rap.Interface {
    /**DBTABLE:RokFormulare*/
	interface RokFormulareDto {
        /**DBCOLUMN:RokFormulare.rok*/
		rok?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GRapcplmDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Příznak vložení plné moci*/
	interface GRapcplmDto {
		/**Příznak vložení plné moci - kód*/
		priz_plm?: number|null;
		/**Příznak vložení plné moci - popis*/
		priz_plm_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GRapcplmDtoNames { priz_plm = "priz_plm", priz_plm_txt = "priz_plm_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRapcplmDtoFragments { priz_plm = "*", priz_plm_txt = "*", k_v = "*", k_s = "*",}
	const enum GRapcplmDtoTypes { priz_plm = "number", priz_plm_txt = "string", k_v = "number", k_s = "string",}
	const enum GRapcplmDtoTypeLengths { priz_plm_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GRapcspnDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Stav požadavku na nahlížení na spis*/
	interface GRapcspnDto {
		/**Stav požadavku na prohlížení spisu - kód*/
		stav_spn?: number|null;
		/**Stav požadavku na prohlížení spisu - popis*/
		stav_spn_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GRapcspnDtoNames { stav_spn = "stav_spn", stav_spn_txt = "stav_spn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRapcspnDtoFragments { stav_spn = "*", stav_spn_txt = "*", k_v = "*", k_s = "*",}
	const enum GRapcspnDtoTypes { stav_spn = "number", stav_spn_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GRapctppDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Typ přístupu k nahlížení*/
	interface GRapctppDto {
		/**Typ přístupu - kód*/
		typ_prist_nah?: number|null;
		/**Typ přístupu - popis*/
		typ_prist_nah_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GRapctppDtoNames { typ_prist_nah = "typ_prist_nah", typ_prist_nah_txt = "typ_prist_nah_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRapctppDtoFragments { typ_prist_nah = "*", typ_prist_nah_txt = "*", k_v = "*", k_s = "*",}
	const enum GRapctppDtoTypes { typ_prist_nah = "number", typ_prist_nah_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GRapczpoDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Způsob ověření přístupu osob*/
	interface GRapczpoDto {
		/**Způsob ověření přístupu osob - kód*/
		zp_overeni?: number|null;
		/**Způsob ověření přístupu osob - popis*/
		zp_overeni_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GRapczpoDtoNames { zp_overeni = "zp_overeni", zp_overeni_txt = "zp_overeni_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRapczpoDtoFragments { zp_overeni = "*", zp_overeni_txt = "*", k_v = "*", k_s = "*",}
	const enum GRapczpoDtoTypes { zp_overeni = "number", zp_overeni_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GStrukturaPopisuZivotniSituaceDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Oblast, které se týká popis životní situace*/
	interface GStrukturaPopisuZivotniSituaceDto {
		/**Struktura popisu životní situace - kód*/
		kod_sps?: number|null;
		/**Struktura popisu životní situace - popisný text*/
		kod_sps_txt?: string|null;
	}
	const enum GStrukturaPopisuZivotniSituaceDtoNames { kod_sps = "kod_sps", kod_sps_txt = "kod_sps_txt",}
	const enum GStrukturaPopisuZivotniSituaceDtoFragments { kod_sps = "*", kod_sps_txt = "*",}
	const enum GStrukturaPopisuZivotniSituaceDtoTypes { kod_sps = "number", kod_sps_txt = "string",}
	const enum GStrukturaPopisuZivotniSituaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GVariantaZobrazeniZivotnichSituaciDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Varianta zobrazení životní situace*/
	interface GVariantaZobrazeniZivotnichSituaciDto {
		/**Varianta zobrazení životní situace - kód*/
		priz_var?: number|null;
		/**Číslo úlohy*/
		uloha_rap?: number|null;
		/**Varianta zobrazení životní situace - popisný text*/
		priz_var_txt?: string|null;
	}
	const enum GVariantaZobrazeniZivotnichSituaciDtoNames { priz_var = "priz_var", uloha_rap = "uloha_rap", priz_var_txt = "priz_var_txt",}
	const enum GVariantaZobrazeniZivotnichSituaciDtoFragments { priz_var = "*", uloha_rap = "*", priz_var_txt = "*",}
	const enum GVariantaZobrazeniZivotnichSituaciDtoTypes { priz_var = "number", uloha_rap = "number", priz_var_txt = "string",}
	const enum GVariantaZobrazeniZivotnichSituaciDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\DataSet\Cis\GZdrojKontaktnichUdajuDto.d.ts 

declare namespace Gordic.Rap.Interface {
	/**Zdroj kontaktního údaje*/
	interface GZdrojKontaktnichUdajuDto {
		/**Zdroj kontaktního údaje - kód*/
		zdroj_kou?: number|null;
		/**Zdroj kontaktního údaje - popisný text*/
		zdroj_kou_txt?: string|null;
	}
	const enum GZdrojKontaktnichUdajuDtoNames { zdroj_kou = "zdroj_kou", zdroj_kou_txt = "zdroj_kou_txt",}
	const enum GZdrojKontaktnichUdajuDtoFragments { zdroj_kou = "*", zdroj_kou_txt = "*",}
	const enum GZdrojKontaktnichUdajuDtoTypes { zdroj_kou = "number", zdroj_kou_txt = "string",}
	const enum GZdrojKontaktnichUdajuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGDashboardPopisOrganizace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Popis organizace na dashboardu
	* @domain PortalObcana
	* @businessObject OrganizacePopis
	*/
	interface OrganizacePopis {
		/**Read*/
		read(rq?:Gordic.Rap.Interface.GDashboardPopisOrganizaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>;
		/**Create*/
		create(rq?:Gordic.Rap.Interface.GDashboardPopisOrganizaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>;
		/**Update*/
		update(rq?:Gordic.Rap.Interface.GDashboardPopisOrganizaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>;
		/**Delete*/
		delete(rq?:Gordic.Rap.Interface.GDashboardPopisOrganizaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Rap.Interface.GDashboardPopisOrganizaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDashboardPopisOrganizaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OrganizacePopis: ServiceBase & Catalog.OrganizacePopis;
	}
	const OrganizacePopis: Client["OrganizacePopis"];
}
declare namespace Gordic.Rap.Interface {
	/**Popis organizace na dashboardu*/
	const enum GDashboardPopisOrganizaceFilter {
		/**ico*/
		ico,
		/**por_cislo*/
		por_cislo,
		/**ixs_esu*/
		ixs_esu,
		/**popis*/
		popis,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGDefiniceOmezenehoPristupu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Nahlížení na spis - definice omezení přístupu
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisPristup
	*/
	interface NahlizeniNaSpisPristup {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>,GServiceReadResponse<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GDefiniceOmezenehoPristupuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisPristup: ServiceBase & Catalog.NahlizeniNaSpisPristup;
	}
	const NahlizeniNaSpisPristup: Client["NahlizeniNaSpisPristup"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro definici omezení přístupu*/
	const enum GDefiniceOmezenehoPristupuFilter {
		/**Identifikátor definice omezení přístupu*/
		ixs_tpp,
		/**Název omezení přístupu*/
		nazev,
		/**Typ přístupu*/
		typ_prist_nah,
		/**Počet hodin do expirace přístupu, který se začíná počítat od prvního stažení souboru*/
		poc_hod_exp,
		/**Počet dní do expirace přístupu, který se začíná počítat od prvního stažení souboru*/
		poc_dni_exp,
		/**Počet hodin od zveřejnění, dokdy musí být soubor poprvé stažen, jinak dojde k expiraci*/
		poc_hod_exp_max,
		/**Počet dní od zveřejnění, dokdy musí být soubor poprvé stažen, jinak dojde k expiraci*/
		poc_dni_exp_max,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGFormulareTypuPohledavky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Formulář pro typ poplatku
	* @domain PortalObcana
	* @businessObject TypPoplatkuFormular
	*/
	interface TypPoplatkuFormular {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GFormulareTypuPohledavkyDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>,GServiceReadResponse<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GFormulareTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GFormulareTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GFormulareTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GFormulareTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareTypuPohledavkyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypPoplatkuFormular: ServiceBase & Catalog.TypPoplatkuFormular;
	}
	const TypPoplatkuFormular: Client["TypPoplatkuFormular"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - formulář pro typ poplatku*/
	const enum GFormulareTypuPohledavkyFilter {
		/**Typ pohledávky*/
		typ_phl,
		/**Identifikátor formuláře*/
		ixs_for,
		/**Počátek platnosti záznamu*/
		dat_od,
		/**Konec platnosti záznamu*/
		dat_do,
		/**Aktivita záznamu*/
		aktivita,
		/**Část organizace formuláře*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGFormulareZivotniSituace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Formulář pro životní situaci
	* @domain PortalObcana
	* @businessObject ZivotniSituaceFormular
	*/
	interface ZivotniSituaceFormular {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GFormulareZivotniSituaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GFormulareZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GFormulareZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GFormulareZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GFormulareZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituaceFormular: ServiceBase & Catalog.ZivotniSituaceFormular;
	}
	const ZivotniSituaceFormular: Client["ZivotniSituaceFormular"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - formulář pro životní situaci*/
	const enum GFormulareZivotniSituaceFilter {
		/**Identifikátor životní situace*/
		ixs_zis,
		/**Identifikátor formuláře*/
		ixs_for,
		/**URL - odkaz na další související informace*/
		url,
		/**Počátek platnosti záznamu*/
		dat_plat_od,
		/**Konec platnosti záznamu*/
		dat_plat_do,
		/**Aktivita záznamu - kód*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGHodnotaKontaktnihoUdaje.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kontaktní údaj
	* @domain PortalObcana
	* @businessObject Kontakt
	*/
	interface Kontakt {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>,GServiceReadResponse<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>,GServiceSaveResponse<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>,GServiceSaveResponse<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>,GServiceSaveResponse<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>,GServiceSaveResponse<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>>;
		/**Vrátí dohledanou hodnotu zástupného textu pro zadaný typ kontaktu*/
		getPlaceholderValueContact(rq?:CallParams<{idZzn:string,ixsKou:string,orgUrlRap:string}>): _Task<{idZzn:string,ixsKou:string,orgUrlRap:string},Gordic.Rap.Interface.GPlaceholderValueDto>;
		/**Vrátí dohledanou hodnotu zástupného textu pro zadanou životní situaci nebo formulář*/
		getPlaceholderValueSituation(rq?:CallParams<{idZzn:string,ixsZis:string,ixsFor:string,orgUrlRap:string}>): _Task<{idZzn:string,ixsZis:string,ixsFor:string,orgUrlRap:string},Gordic.Rap.Interface.GPlaceholderValueDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Kontakt: ServiceBase & Catalog.Kontakt;
	}
	const Kontakt: Client["Kontakt"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro kontakt*/
	const enum GHodnotaKontaktnihoUdajeFilter {
		/**Identifikátor typu kontaktu*/
		ixs_kou,
		/**Identifikátor zástupného textu*/
		id_zzn,
		/**Hodnota kontaktního údaje*/
		hodnota,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGKomentarKNahlizeniNaSpis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Nahlížení na spis - komentář
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisKomentar
	*/
	interface NahlizeniNaSpisKomentar {
		/**Vrátí komentář pro zadaný případ nahlížení a zdroj*/
		read(rq?:Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>,GServiceReadResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
		/**Vrátí seznam komentářů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
		/**Založí nový komentář*/
		create(rq?:Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
		/**Změní existující komentář pro zadaný případ nahlížení a zdroj*/
		update(rq?:Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
		/**Založí nový komentář, pokud ještě neexistuje pro zadaný případ nahlížení a zdroj. Pokud existuje, změní existující komentář.*/
		upsert(rq?:Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
		/**Odstraní existující komentář*/
		delete(rq?:Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
		/**Avizuje vložení komentáře na e-mailovou adresu funkce, která odpovídá správci případu*/
		notifyUserComment(rq?:Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto|CallParams<GServiceActionRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>): _Task<GServiceActionRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>,GServiceActionResponse<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisKomentar: ServiceBase & Catalog.NahlizeniNaSpisKomentar;
	}
	const NahlizeniNaSpisKomentar: Client["NahlizeniNaSpisKomentar"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro komentář k nahlížení na spis*/
	const enum GKomentarKNahlizeniNaSpisFilter {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns,
		/**Pořadí záznamu*/
		poradi,
		/**Text komentáře*/
		koment,
		/**Poznámka k záznamu*/
		poznamka,
		/**Aktivita záznamu - kód*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
		/**Zdroj: která strana je autorem komentáře (Oprávněná úřední osoba, Osoba žádající, nebo Osoba oprávněná k nahlížení)*/
		zdroj_koment,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGKontaktyFormulare.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kontakt pro formulář
	* @domain PortalObcana
	* @businessObject FormularKontakt
	*/
	interface FormularKontakt {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GKontaktyFormulareDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>,GServiceReadResponse<Gordic.Rap.Interface.GKontaktyFormulareDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GKontaktyFormulareDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GKontaktyFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyFormulareDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GKontaktyFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyFormulareDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GKontaktyFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyFormulareDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GKontaktyFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyFormulareDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FormularKontakt: ServiceBase & Catalog.FormularKontakt;
	}
	const FormularKontakt: Client["FormularKontakt"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - Kontakt pro formulář*/
	const enum GKontaktyFormulareFilter {
		/**Identifikátor typu kontaktu*/
		ixs_kou,
		/**Identifikátor formuláře*/
		ixs_for,
		/**Počátek platnosti záznamu*/
		dat_od,
		/**Konec platnosti záznamu*/
		dat_do,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGKontaktyZivotniSituace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kontakt pro životní situaci
	* @domain PortalObcana
	* @businessObject ZivotniSituaceKontakt
	*/
	interface ZivotniSituaceKontakt {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituaceKontakt: ServiceBase & Catalog.ZivotniSituaceKontakt;
	}
	const ZivotniSituaceKontakt: Client["ZivotniSituaceKontakt"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - Kontakt pro životní situaci*/
	const enum GKontaktyZivotniSituaceFilter {
		/**Identifikátor typu kontaktu*/
		ixs_kou,
		/**Identifikátor životní situace*/
		ixs_zis,
		/**Počátek platnosti záznamu*/
		dat_od,
		/**Konec platnosti záznamu*/
		dat_do,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGKontaktyZivotniSituaceFormulare.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kontakt pro životní situaci a formulář
	* @domain PortalObcana
	* @businessObject ZivotniSituaceFormularKontakt
	*/
	interface ZivotniSituaceFormularKontakt {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,GServiceReadResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclRelations(rq?:CallParams<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,rqHodnota:GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>[],rqZS:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>[],rqForm:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>[]}>): _Task<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>,rqHodnota:GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>[],rqZS:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>[],rqForm:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyFormulareDto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GKontaktyZivotniSituaceFormulareDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituaceFormularKontakt: ServiceBase & Catalog.ZivotniSituaceFormularKontakt;
	}
	const ZivotniSituaceFormularKontakt: Client["ZivotniSituaceFormularKontakt"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - Kontakt pro životní situaci a formulář*/
	const enum GKontaktyZivotniSituaceFormulareFilter {
		/**Identifikátor typu kontaktu*/
		ixs_kou,
		/**IČO organizace*/
		ico,
		/**Název typu kontaktu*/
		nazev,
		/**Zdroj kontaktu - kód (odkud se vezme hodnota kontaktu, např.: z externího subjektu, funkčního místa, atd.)*/
		zdroj_kou,
		/**Externí subjekt - identifikátor*/
		ixs_esu,
		/**Organizační jednotka - identifikátor*/
		ixs_orj,
		/**Funkční místo - identifikátor*/
		ixs_fun,
		/**Referent - identifikátor*/
		ixs_ref,
		/**AKtivita záznamu*/
		aktivita,
		/**Přebírá hodnotu vyplněné datové položky na základě zdroje kontaktu, pouze pro interní použití*/
		vyplneny_kontakt,
		/**Část RAP*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGLogNahlizeniNaSpis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie nahlížení na spis
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisHistorie
	*/
	interface NahlizeniNaSpisHistorie {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GLogNahlizeniNaSpisDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>,GServiceReadResponse<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GLogNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GLogNahlizeniNaSpisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisHistorie: ServiceBase & Catalog.NahlizeniNaSpisHistorie;
	}
	const NahlizeniNaSpisHistorie: Client["NahlizeniNaSpisHistorie"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - historie nahlížení na spis*/
	const enum GLogNahlizeniNaSpisFilter {
		/**Identifikátor případu nahlížení*/
		ixs_pns,
		/**Typ změny*/
		typ_zmeny,
		/**Pořadové číslo záznamu*/
		por_cislo,
		/**Popis změny*/
		text,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
		/**Identifikátor relace aplikace*/
		sxs_zme,
		/**Záznamy přihlášení, ke kterým neexistuje odpovídající záznam odhlášení*/
		prihlaseni_bez_odhlaseni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGNastaveniPohledavkyProRokUcs.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Nastavení typu poplatku pro rok a účetní středisko
	* @domain PortalObcana
	* @businessObject TypPoplatkuRokUcs
	*/
	interface TypPoplatkuRokUcs {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,GServiceReadResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclRelations(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,rqPopis:GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>[]}>): _Task<{rq:GServiceSaveRequest<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>,rqPopis:GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GNastaveniPohledavkyProRokUcsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypPoplatkuRokUcs: ServiceBase & Catalog.TypPoplatkuRokUcs;
	}
	const TypPoplatkuRokUcs: Client["TypPoplatkuRokUcs"];
}
declare namespace Gordic.Rap.Interface {
	/**Nastavení typu poplatku pro rok a ucs*/
	const enum GNastaveniPohledavkyProRokUcsFilter {
		/**Typ pohledávky*/
		typ_phl,
		/**Rok*/
		rok,
		/**IČO organizace*/
		ico,
		/**Účetní středisko organizace*/
		ucs,
		/**Částka slevy*/
		c_sleva,
		/**Procento slevy*/
		proc_sleva,
		/**Maximální částka slevy*/
		c_sleva_max,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGNemovitostiSubjektu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Nemovitosti subjektu
	* @domain PortalObcana
	* @businessObject Nemovitost
	*/
	interface Nemovitost {
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GNemovitostiSubjektuDto>>;
		/**Zjistí, zda je pro zadaný externí subjekt povoleno dohledávat údaje o nemovitostech*/
		accessAllowed(rq?:CallParams<{ixsEsu:string}>): _Task<{ixsEsu:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Nemovitost: ServiceBase & Catalog.Nemovitost;
	}
	const Nemovitost: Client["Nemovitost"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - nemovitosti subjektu*/
	const enum GNemovitostiSubjektuFilter {
		/**IČO*/
		iconum,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGOsobaOpravnenaKNahlizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Nahlížení na spis - Osoba oprávněná k nahlížení dle čísla OP
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisOpravnenaOsoba
	*/
	interface NahlizeniNaSpisOpravnenaOsoba {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>,GServiceReadResponse<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisOpravnenaOsoba: ServiceBase & Catalog.NahlizeniNaSpisOpravnenaOsoba;
	}
	const NahlizeniNaSpisOpravnenaOsoba: Client["NahlizeniNaSpisOpravnenaOsoba"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - osoba oprávněná k nahlížení dle čísla OP*/
	const enum GOsobaOpravnenaKNahlizeniFilter {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns,
		/**Pořadí záznamu*/
		poradi,
		/**Číslo občanského průkazu*/
		id_pruk,
		/**E-mailová adresa*/
		mail,
		/**Identifikátor datové schránky*/
		id_ds,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGPopisPohledavek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Společný popis pro typy poplatků
	* @domain PortalObcana
	* @businessObject TypPoplatkuPopis
	*/
	interface TypPoplatkuPopis {
		/**Vrátí popis pro zadané IČO a umístění textu*/
		read(rq?:Gordic.Rap.Interface.GPopisPohledavekDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GPopisPohledavekDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GPopisPohledavekDto>,GServiceReadResponse<Gordic.Rap.Interface.GPopisPohledavekDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GPopisPohledavekDto>>;
		/**Založí popis pro zadané IČO a umístění textu*/
		create(rq?:Gordic.Rap.Interface.GPopisPohledavekDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavekDto>>;
		/**Odstraní popis pro zadané IČO a umístění textu a následně založí nový*/
		update(rq?:Gordic.Rap.Interface.GPopisPohledavekDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavekDto>>;
		/**Odstraní popis pro zadané IČO a umístění textu*/
		delete(rq?:Gordic.Rap.Interface.GPopisPohledavekDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavekDto>>;
		/**Odstraní popis pro zadané IČO a umístění textu, pokud již existuje. Následně založí nový popis.*/
		upsert(rq?:Gordic.Rap.Interface.GPopisPohledavekDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavekDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypPoplatkuPopis: ServiceBase & Catalog.TypPoplatkuPopis;
	}
	const TypPoplatkuPopis: Client["TypPoplatkuPopis"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - společný popis pro typy poplatků*/
	const enum GPopisPohledavekFilter {
		/**Umístění textu - kód*/
		uut,
		/**IČO organizace*/
		ico,
		/**Pořadové číslo záznamu*/
		por_cislo,
		/**Popisný text*/
		popis,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGPopisPohledavkyProRokUcs.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Popis typu poplatku pro rok a ucs
	* @domain PortalObcana
	* @businessObject TypPoplatkuRokUcsPopis
	*/
	interface TypPoplatkuRokUcsPopis {
		/**Vrátí popis pro zadaný typ poplatku, účetní středisko, rok a umístění textu*/
		read(rq?:Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>,GServiceReadResponse<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>;
		/**Založí popis pro zadaný typ poplatku, účetní středisko, rok a umístění textu*/
		create(rq?:Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>;
		/**Odstraní popis pro zadaný typ poplatku, účetní středisko, rok a umístění textu a následně založí nový*/
		update(rq?:Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>;
		/**Odstraní popis pro zadaný typ poplatku, účetní středisko, rok a umístění textu*/
		delete(rq?:Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>;
		/**Odstraní popis pro zadaný typ poplatku, účetní středisko, rok a umístění textu, pokud již existuje. Následně založí nový popis.*/
		upsert(rq?:Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisPohledavkyProRokUcsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypPoplatkuRokUcsPopis: ServiceBase & Catalog.TypPoplatkuRokUcsPopis;
	}
	const TypPoplatkuRokUcsPopis: Client["TypPoplatkuRokUcsPopis"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - Popis typu poplatku pro rok a ucs*/
	const enum GPopisPohledavkyProRokUcsFilter {
		/**Typ poplatku*/
		typ_phl,
		/**Rok*/
		rok,
		/**IČO*/
		ico,
		/**Účetní středisko*/
		ucs,
		/**Pořadové číslo záznamu*/
		por_cislo,
		/**Popisný text*/
		popis,
		/**Umístění textu - kód*/
		uut,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGPopisZivotniSituace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Popis životní situace
	* @domain PortalObcana
	* @businessObject ZivotniSituacePopis
	*/
	interface ZivotniSituacePopis {
		/**Vrátí popis pro zadanou životní situaci a kód oblasti*/
		read(rq?:Gordic.Rap.Interface.GPopisZivotniSituaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>;
		/**Založí popis pro zadanou životní situaci a kód oblasti*/
		create(rq?:Gordic.Rap.Interface.GPopisZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>;
		/**Odstraní popis pro zadanou životní situaci a kód oblasti a následně založí nový*/
		update(rq?:Gordic.Rap.Interface.GPopisZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>;
		/**Odstraní popis pro zadanou životní situaci a kód oblasti*/
		delete(rq?:Gordic.Rap.Interface.GPopisZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>;
		/**Odstraní popis pro zadanou životní situaci a kód oblasti, pokud již existuje. Následně založí nový popis.*/
		upsert(rq?:Gordic.Rap.Interface.GPopisZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPopisZivotniSituaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituacePopis: ServiceBase & Catalog.ZivotniSituacePopis;
	}
	const ZivotniSituacePopis: Client["ZivotniSituacePopis"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - Popis životní situace*/
	const enum GPopisZivotniSituaceFilter {
		/**Identifikátor životní situace*/
		ixs_zis,
		/**Kód oblasti*/
		kod_sps,
		/**Pořadové číslo záznamu*/
		por_cislo,
		/**Popisný text*/
		popis,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGPozadavekNahlizeniNaSpis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Požadavek nahlížení na spis
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisPozadavek
	*/
	interface NahlizeniNaSpisPozadavek {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>,GServiceReadResponse<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisPozadavek: ServiceBase & Catalog.NahlizeniNaSpisPozadavek;
	}
	const NahlizeniNaSpisPozadavek: Client["NahlizeniNaSpisPozadavek"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - požadavek nahlížení na spis*/
	const enum GPozadavekNahlizeniNaSpisFilter {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns,
		/**Identifikátor požadavku*/
		ixp,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGPripadNahlizeniNaSpis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Případ nahlížení na spis
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpis
	*/
	interface NahlizeniNaSpis {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceReadResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Aktualizuje archiv souborů*/
		updateZip(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Smaže archiv souborů - smaže rapspns.ixb a odstraní zip z ELE*/
		deleteZip(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclRelations(rq?:CallParams<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,rqPozadavek:GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>[],rqOsoby:GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>[],rqSoubory:GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>[],rqKomentar:GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>[]}>): _Task<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,rqPozadavek:GServiceSaveRequest<Gordic.Rap.Interface.GPozadavekNahlizeniNaSpisDto>[],rqOsoby:GServiceSaveRequest<Gordic.Rap.Interface.GOsobaOpravnenaKNahlizeniDto>[],rqSoubory:GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>[],rqKomentar:GServiceSaveRequest<Gordic.Rap.Interface.GKomentarKNahlizeniNaSpisDto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Označí soubory spisu jako stažené. Jde-li o první stažení, nastaví zároveň definitivní datum expirace případu nahlížení.*/
		setDownloaded(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Pošle e-mail s avizací o stažení souboru spisu na adresu funkce správce případu nahlížení.*/
		notifyDownload(rq?:Gordic.Rap.Interface.GNotifikaceStazeniSouboruDto|CallParams<GServiceActionRequest<Gordic.Rap.Interface.GNotifikaceStazeniSouboruDto>>): _Task<GServiceActionRequest<Gordic.Rap.Interface.GNotifikaceStazeniSouboruDto>,GServiceActionResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Pošle avizační zprávu o zpřístupnění případu osobám oprávněným k nahlížení. 
		*     Zprávu pošle e-mailem nebo datovou schránkou, podle toho, který kontaktní údaj oprávněné osoby je vyplněný.
		*/
		notifyOpenup(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceActionRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceActionRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceActionResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Pošle e-mail s avizací o předání správce spisu na adresu funkce správce případu nahlížení.*/
		notifyTransfer(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceActionRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceActionRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceActionResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Uloží k případu příznak expirace, pokud vypršel čas pro přístup*/
		expire(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceSaveResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
		/**Připojí k případu nahlížení soubory ze spisu*/
		attachFiles(rq?:Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto|CallParams<GServiceActionRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>): _Task<GServiceActionRequest<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>,GServiceActionResponse<Gordic.Rap.Interface.GPripadNahlizeniNaSpisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpis: ServiceBase & Catalog.NahlizeniNaSpis;
	}
	const NahlizeniNaSpis: Client["NahlizeniNaSpis"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr pro případ nahlížení na spis*/
	const enum GPripadNahlizeniNaSpisFilter {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns,
		/**Číslo jednací*/
		cj,
		/**Stav případu nahlížení - kód*/
		stav_spn,
		/**Typ přístupu - kód*/
		typ_prist_nah,
		/**Způsob ověření - kód*/
		zp_overeni,
		/**Identifikátor definice omezení přístupu*/
		ixs_tpp,
		/**Nevyužívá se*/
		ixp,
		/**Správce případu nahlížení*/
		ixs_fun_akt,
		/**Datum vložení souborů*/
		dat_vloz,
		/**Datum počátku platnosti*/
		dat_od,
		/**Datum expirace*/
		dat_exp,
		/**Maximální datum expirace*/
		dat_exp_max,
		/**Identifikátor písemnosti pro archiv souborů*/
		ixb,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
		/**Identifikátor požadavku*/
		pozadavek_ixp,
		/**Probíhá přístup*/
		probihajici,
		/**Neprobíhá přístup*/
		neprobihajici,
		/**Odložené*/
		odlozene,
		/**Číslo OP oprávněné osoby*/
		id_pruk,
		/**IČO žadatele*/
		ico_zad,
		/**DIČ žadatele*/
		dic_zad,
		/**Název žadatele*/
		nazev_zad,
		/**Ulice žadatele*/
		ulice_zad,
		/**Číslo orientační žadatele*/
		cor_zad,
		/**Číslo popisné žadatele*/
		cpop_zad,
		/**Obec žadatele*/
		obec_zad,
		/**PSČ žadatele*/
		psc_zad,
		/**Příznak přílohy*/
		priz_plm,
		/**Příznak stažení*/
		priz_down,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGSkupinaPoctuOdeslani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Skupina pro omezení počtu odeslání formulářů
	* @domain PortalObcana
	* @businessObject SkupinaPocetOdeslani
	*/
	interface SkupinaPocetOdeslani {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,GServiceReadResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclSubLevels(rq?:CallParams<{rqL1:GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,rqL2:GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>[]}>): _Task<{rqL1:GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>,rqL2:GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaPoctuOdeslaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SkupinaPocetOdeslani: ServiceBase & Catalog.SkupinaPocetOdeslani;
	}
	const SkupinaPocetOdeslani: Client["SkupinaPocetOdeslani"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - skupina pro omezení počtu odeslání formulářů*/
	const enum GSkupinaPoctuOdeslaniFilter {
		/**Identifikátor skupiny*/
		ixs_opo,
		/**Název skupiny*/
		nazev,
		/**Počátek platnosti záznamu*/
		dat_od,
		/**Konec platnosti záznamu*/
		dat_do,
		/**Maximální počet odeslání*/
		pocet_dupl,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGSkupinaUlohyRap1.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Podúloha - 1. úroveň
	* @domain PortalObcana
	* @businessObject PodulohaUroven1
	*/
	interface PodulohaUroven1 {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap1Dto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,GServiceReadResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap1Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap1Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap1Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap1Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclSubLevels(rq?:CallParams<{rqL1:GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,rqL2:GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>[]}>): _Task<{rqL1:GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>,rqL2:GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap1Dto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PodulohaUroven1: ServiceBase & Catalog.PodulohaUroven1;
	}
	const PodulohaUroven1: Client["PodulohaUroven1"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - podúloha - 1. úroveň*/
	const enum GSkupinaUlohyRap1Filter {
		/**Identifikátor podúlohy 1. úrovně*/
		ixs_sk1,
		/**Kód úlohy*/
		uloha_rap,
		/**Varianta zobrazení*/
		priz_var,
		/**IČO*/
		ico,
		/**Název*/
		nazev,
		/**Název zobrazený uživateli*/
		nazev_uziv,
		/**Zkratka*/
		zkratka,
		/**Aktivita záznamu*/
		aktivita,
		/**Část RAP*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGSkupinaUlohyRap2.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Podúloha - 2. úroveň
	* @domain PortalObcana
	* @businessObject PodulohaUroven2
	*/
	interface PodulohaUroven2 {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap2Dto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>,GServiceReadResponse<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap2Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap2Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap2Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GSkupinaUlohyRap2Dto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>,GServiceSaveResponse<Gordic.Rap.Interface.GSkupinaUlohyRap2Dto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PodulohaUroven2: ServiceBase & Catalog.PodulohaUroven2;
	}
	const PodulohaUroven2: Client["PodulohaUroven2"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - Podúloha 2. úroveň*/
	const enum GSkupinaUlohyRap2Filter {
		/**Identifikátor podúlohy 2. úrovně*/
		ixs_sk2,
		/**Identifikátor podúlohy 1. úrovně*/
		ixs_sk1,
		/**Název*/
		nazev,
		/**Název zobrazený uživateli*/
		nazev_uziv,
		/**Zkratka*/
		zkratka,
		/**Aktivita záznamu*/
		aktivita,
		/**Kód úlohy*/
		uloha_rap,
		/**Část RAP*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGSouborPripaduNahlizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Soubor případu nahlížení
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisSoubor
	*/
	interface NahlizeniNaSpisSoubor {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GSouborPripaduNahlizeniDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>,GServiceReadResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GSouborPripaduNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GSouborPripaduNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GSouborPripaduNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GSouborPripaduNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
		/**Odstraní odpovídající soubory z elekronického úložiště*/
		deleteFromEle(rq?:Gordic.Rap.Interface.GSouborPripaduNahlizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouborPripaduNahlizeniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisSoubor: ServiceBase & Catalog.NahlizeniNaSpisSoubor;
	}
	const NahlizeniNaSpisSoubor: Client["NahlizeniNaSpisSoubor"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - soubor případu nahlížení*/
	const enum GSouborPripaduNahlizeniFilter {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns,
		/**Identifikátor písemnosti*/
		ixb,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
		/**Probíhající*/
		probihajici,
		/**Neprobíhající*/
		neprobihajici,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGSouvisejiciFormular.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Související formulář
	* @domain PortalObcana
	* @businessObject FormularSouvisejici
	*/
	interface FormularSouvisejici {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GSouvisejiciFormularDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>,GServiceReadResponse<Gordic.Rap.Interface.GSouvisejiciFormularDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GSouvisejiciFormularDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GSouvisejiciFormularDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciFormularDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GSouvisejiciFormularDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciFormularDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GSouvisejiciFormularDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciFormularDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GSouvisejiciFormularDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciFormularDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciFormularDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FormularSouvisejici: ServiceBase & Catalog.FormularSouvisejici;
	}
	const FormularSouvisejici: Client["FormularSouvisejici"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - souvisejicí formulář*/
	const enum GSouvisejiciFormularFilter {
		/**Identifikátor formuláře*/
		ixs_for,
		/**Identifikátor souvisejícího formuláře*/
		ixs_for_souv,
		/**Příznak oznámení*/
		priz_ozn,
		/**Typ akce*/
		form_akce,
		/**Pořadí zobrazenír*/
		poradi_zobr,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGSouvisejiciZivotniSituace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Související životní situace
	* @domain PortalObcana
	* @businessObject ZivotniSituaceSouvisejici
	*/
	interface ZivotniSituaceSouvisejici {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituaceSouvisejici: ServiceBase & Catalog.ZivotniSituaceSouvisejici;
	}
	const ZivotniSituaceSouvisejici: Client["ZivotniSituaceSouvisejici"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - související životní situace*/
	const enum GSouvisejiciZivotniSituaceFilter {
		/**Identifikátor životní situace*/
		ixs_zis,
		/**Identifikátor související životní situace*/
		ixs_zis1,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGStavPoplatkuMagBrno.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Zjištění stavu poplatku pro magistrát Brno
	* @domain PortalObcana
	* @businessObject PoplatekStavMagBrno
	*/
	interface PoplatekStavMagBrno {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PoplatekStavMagBrno: ServiceBase & Catalog.PoplatekStavMagBrno;
	}
	const PoplatekStavMagBrno: Client["PoplatekStavMagBrno"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGUcastnikRizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Účastník řízení
	* @domain PortalObcana
	* @businessObject NahlizeniNaSpisUcastnikRizeni
	*/
	interface NahlizeniNaSpisUcastnikRizeni {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GUcastnikRizeniDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>,GServiceReadResponse<Gordic.Rap.Interface.GUcastnikRizeniDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GUcastnikRizeniDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GUcastnikRizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GUcastnikRizeniDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GUcastnikRizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GUcastnikRizeniDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GUcastnikRizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GUcastnikRizeniDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GUcastnikRizeniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GUcastnikRizeniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GUcastnikRizeniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NahlizeniNaSpisUcastnikRizeni: ServiceBase & Catalog.NahlizeniNaSpisUcastnikRizeni;
	}
	const NahlizeniNaSpisUcastnikRizeni: Client["NahlizeniNaSpisUcastnikRizeni"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - účastník řízení*/
	const enum GUcastnikRizeniFilter {
		/**Identifikátor případu nahlížení na spis*/
		ixs_pns,
		/**Pořadí záznamu*/
		poradi,
		/**IČO*/
		ico_uca,
		/**DIČ*/
		dic_uca,
		/**Název*/
		nazev_uca,
		/**Ulice*/
		ulice_uca,
		/**Číslo orientační*/
		cor_uca,
		/**Číslo popisné*/
		cpop_uca,
		/**Obec*/
		obec_uca,
		/**PSČ*/
		psc_uca,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGVazbaFormulareNaSkupinuPoctuOdeslani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vazba fomrulářů na skupinu omezení
	* @domain PortalObcana
	* @businessObject FormularSkupinaPocetOdeslani
	*/
	interface FormularSkupinaPocetOdeslani {
		/**Read*/
		read(rq?:Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>,GServiceReadResponse<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>;
		/**Create*/
		create(rq?:Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>;
		/**Update*/
		update(rq?:Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>;
		/**Delete*/
		delete(rq?:Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaFormulareNaSkupinuPoctuOdeslaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FormularSkupinaPocetOdeslani: ServiceBase & Catalog.FormularSkupinaPocetOdeslani;
	}
	const FormularSkupinaPocetOdeslani: Client["FormularSkupinaPocetOdeslani"];
}
declare namespace Gordic.Rap.Interface {
	/**Vazba fomrulářů na skupinu omezení*/
	const enum GVazbaFormulareNaSkupinuPoctuOdeslaniFilter {
		/**ixs_opo*/
		ixs_opo,
		/**opo_nazev*/
		opo_nazev,
		/**ixs_for*/
		ixs_for,
		/**for_nazev*/
		for_nazev,
		/**aktivita*/
		aktivita,
		/**aktivita skupiny*/
		skupina_aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGVazbaZivotniSituaceNaSkupinu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vazba životní situace na skupinu životních situací
	* @domain PortalObcana
	* @businessObject ZivotniSituacePodulohaUroven2
	*/
	interface ZivotniSituacePodulohaUroven2 {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>,GServiceReadResponse<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituacePodulohaUroven2: ServiceBase & Catalog.ZivotniSituacePodulohaUroven2;
	}
	const ZivotniSituacePodulohaUroven2: Client["ZivotniSituacePodulohaUroven2"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - vazba životní situace na skupinu životních situací*/
	const enum GVazbaZivotniSituaceNaSkupinuFilter {
		/**Identifikátor životní situace*/
		ixs_zis,
		/**Identifikátor skupiny - podúloha 2. úrovně*/
		ixs_sk2,
		/**Aktivita záznamu*/
		aktivita,
		/**Aktivita životní situace*/
		zs_aktivita,
		/**Část RAP*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGZastupnyZnak.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Zástupný text
	* @domain PortalObcana
	* @businessObject ZastupnyText
	*/
	interface ZastupnyText {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GZastupnyZnakDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GZastupnyZnakDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,GServiceReadResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GZastupnyZnakDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GZastupnyZnakDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GZastupnyZnakDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GZastupnyZnakDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclRelations(rq?:CallParams<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,rqHodnota:GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>[]}>): _Task<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GZastupnyZnakDto>,rqHodnota:GServiceSaveRequest<Gordic.Rap.Interface.GHodnotaKontaktnihoUdajeDto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GZastupnyZnakDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZastupnyText: ServiceBase & Catalog.ZastupnyText;
	}
	const ZastupnyText: Client["ZastupnyText"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - zástupný text*/
	const enum GZastupnyZnakFilter {
		/**Identifikátor zástupného textu*/
		id_zzn,
		/**Název*/
		nazev,
		/**Jméno databázové tabulky*/
		tabname,
		/**Sloupec databázové tabulky*/
		colname,
		/**Poznámka*/
		poznamka,
		/**Aktivita záznamu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGZaznamHledaniPoplatku.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie hledání poplatku
	* @domain PortalObcana
	* @businessObject PoplatekHistorieHledani
	*/
	interface PoplatekHistorieHledani {
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GZaznamHledaniPoplatkuDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GZaznamHledaniPoplatkuDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZaznamHledaniPoplatkuDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZaznamHledaniPoplatkuDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZaznamHledaniPoplatkuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PoplatekHistorieHledani: ServiceBase & Catalog.PoplatekHistorieHledani;
	}
	const PoplatekHistorieHledani: Client["PoplatekHistorieHledani"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - historie hledání poplatku*/
	const enum GZaznamHledaniPoplatkuFilter {
		/**Licence*/
		lic,
		/**Pořadové číslo záznamu*/
		por_cislo,
		/**Pořadové číslo relace*/
		log_por_cislo,
		/**Identifikátor relace*/
		ixs_lpc,
		/**Datum a čas platby*/
		dat_plb,
		/**Identifikátor poplatníka*/
		id_popl,
		/**Jméno poplatníka*/
		jmeno,
		/**Příjmení poplatníka*/
		prijmeni,
		/**Název poplatníka*/
		nazev,
		/**E-mail poplatníka*/
		mail,
		/**Příznak souhlasu*/
		priz_souhlas,
		/**Ixp poplatníka*/
		ixp,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGZivotniSituace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Životní situace
	* @domain PortalObcana
	* @businessObject ZivotniSituace
	*/
	interface ZivotniSituace {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GZivotniSituaceDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GZivotniSituaceDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,GServiceReadResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GZivotniSituaceDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam. Zároveň založí vazby na související entity.*/
		upsertInclRelations(rq?:CallParams<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,rqSkp:GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>[],rqForm:GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>[],rqPopis:GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>[],rqKont:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>[],rqSouv:GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>[]}>): _Task<{rqDetail:GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceDto>,rqSkp:GServiceSaveRequest<Gordic.Rap.Interface.GVazbaZivotniSituaceNaSkupinuDto>[],rqForm:GServiceSaveRequest<Gordic.Rap.Interface.GFormulareZivotniSituaceDto>[],rqPopis:GServiceSaveRequest<Gordic.Rap.Interface.GPopisZivotniSituaceDto>[],rqKont:GServiceSaveRequest<Gordic.Rap.Interface.GKontaktyZivotniSituaceDto>[],rqSouv:GServiceSaveRequest<Gordic.Rap.Interface.GSouvisejiciZivotniSituaceDto>[]},GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituace: ServiceBase & Catalog.ZivotniSituace;
	}
	const ZivotniSituace: Client["ZivotniSituace"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - životní situace*/
	const enum GZivotniSituaceFilter {
		/**Identifikátor životní situace*/
		ixs_zis,
		/**IČO*/
		ico,
		/**Kód životní situace*/
		id_zis,
		/**Název*/
		nazev,
		/**Počátek platnosti*/
		dat_plat_od,
		/**Konec platnosti*/
		dat_plat_do,
		/**Datum právního stavu*/
		dat_prav_stav,
		/**Datum poslední aktualizace*/
		dat_akt,
		/**Aktivita záznamu*/
		aktivita,
		/**Část RAP*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGZivotniSituaceTypuPohledavky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Životní situace pro typ poplatku
	* @domain PortalObcana
	* @businessObject ZivotniSituaceTypPoplatku
	*/
	interface ZivotniSituaceTypPoplatku {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>,GServiceReadResponse<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZivotniSituaceTypuPohledavkyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZivotniSituaceTypPoplatku: ServiceBase & Catalog.ZivotniSituaceTypPoplatku;
	}
	const ZivotniSituaceTypPoplatku: Client["ZivotniSituaceTypPoplatku"];
}
declare namespace Gordic.Rap.Interface {
	/**Životní situace pro typ poplatku*/
	const enum GZivotniSituaceTypuPohledavkyFilter {
		/**Typ poplatku*/
		typ_phl,
		/**Identifikátor životní situace*/
		ixs_zis,
		/**Počátek platnosti záznamu*/
		dat_od,
		/**Konec platnosti záznamu*/
		dat_do,
		/**Aktivita záznamu*/
		aktivita,
		/**Část organizace*/
		cast_rap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rap.Interface\Rap\IGZpusobyPodaniFormulare.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Způsob podání formuláře
	* @domain PortalObcana
	* @businessObject FormularZpusobPodani
	*/
	interface FormularZpusobPodani {
		/**Vrátí detail záznamu*/
		read(rq?:Gordic.Rap.Interface.GZpusobyPodaniFormulareDto|CallParams<GServiceReadRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>): _Task<GServiceReadRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>,GServiceReadResponse<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>;
		/**Vrátí seznam záznamů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>;
		/**Založí nový záznam*/
		create(rq?:Gordic.Rap.Interface.GZpusobyPodaniFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>;
		/**Změní existující záznam*/
		update(rq?:Gordic.Rap.Interface.GZpusobyPodaniFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>;
		/**Založí nový záznam pokud ještě neexistuje. Pokud existuje, změní existující záznam.*/
		upsert(rq?:Gordic.Rap.Interface.GZpusobyPodaniFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>;
		/**Odstraní existující záznam*/
		delete(rq?:Gordic.Rap.Interface.GZpusobyPodaniFormulareDto|CallParams<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>): _Task<GServiceSaveRequest<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>,GServiceSaveResponse<Gordic.Rap.Interface.GZpusobyPodaniFormulareDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		FormularZpusobPodani: ServiceBase & Catalog.FormularZpusobPodani;
	}
	const FormularZpusobPodani: Client["FormularZpusobPodani"];
}
declare namespace Gordic.Rap.Interface {
	/**Filtr - způsob podání formuláře*/
	const enum GZpusobyPodaniFormulareFilter {
		/**Identifikátor formuláře*/
		ixs_for,
		/**Typ podání*/
		typ_poda,
		/**Příznak podpisu*/
		priz_sig,
		/**Příznak povinného podpisu*/
		priz_sig_pov,
		/**Aktivita záznamu*/
		aktivita,
		/**Datum a čas poslední změny záznamu*/
		dat_zmena,
		/**Identifikátor autora poslední změny záznamu*/
		zmenu_prov,
	}
}

//#endregion

