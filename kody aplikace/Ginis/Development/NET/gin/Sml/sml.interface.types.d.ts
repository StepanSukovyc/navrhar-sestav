/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       sml.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Sml.Interface\Gordic.Sml.Interface.csproj
*    created     2026-02-16 14:33:44
*    files       GEkocizpDto.d.ts
*                Controls\Dto\Gordic.Sml.Interface.GSmlcprzDto.d.ts
*                Controls\Dto\Gordic.Sml.Interface.GSmlcstaDto.d.ts
*                Controls\Dto\GSmlcpopDto.d.ts
*                Controls\Dto\GSmlcstsDto.d.ts
*                Controls\Dto\GSmlctycDto.d.ts
*                Controls\Dto\GSmlctykDto.d.ts
*                Controls\Dto\GSmlczukDto.d.ts
*                Controls\Dto\GSmlRefAllDto.d.ts
*                Controls\Dto\GSmlSoutezDto.d.ts
*                Doklad\Gordic.Sml.Interface.IGDokladSml.d.ts
*                Doklad\Controls\Gordic.Sml.Interface.IGSmlEsuVerZak.d.ts
*                Doklad\Dto\Gordic.Sml.Inerface.GSmlDetailRozpisDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDaneDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDdpsiabDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDdpspidDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDetailListDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDokladSmlDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDokladSmlFilterDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GDphListDto .d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GEkocdapDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GEkodpdpDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GMajInfoDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GMaskyVlastnostiDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GRezIisspDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GRezIisspHromDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlAccessDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlBlkDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlddodDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlddorDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlDetailCommonDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlDetailEnableDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlDodCommonDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmldvadDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlEsuDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlFinCommonDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlFinFpCommonDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlFinXxxDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlIisspDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlIxpSmlList.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlMaskyDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlPlaPidDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlPlaRozCommonDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlPlaRozDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlPlaRozpisDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlPolFinXxxDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlRetDecInt32Dto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlRezervaceDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlsdenDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlVzEsuDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlVzInfo.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlWflpidCommonDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSmlWflTopDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GSrvsplaDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GUctVetaNazvyDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GVlastnostiDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GWflsdvaDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GWflsIxpDto.d.ts
*                Doklad\Dto\Gordic.Sml.Interface.GWflvdfkSmlDto.d.ts
*                Doklad\Dto\GSmlDetailOldDto.d.ts
*                Doklad\Dto\GSmlDodavateleDto.d.ts
*                Doklad\Dto\GSmlSeznamDokladuDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GFuccupoDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GGindesuDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GGinsorjDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlctplDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlFunVyrizDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlKnihaDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlKompDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlPresunIxpCilDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlszukDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GSslstypDto.d.ts
*                Doklad\Dto\Controls\Gordic.Sml.Interface.GVepsdupDto.d.ts
*                Doklad\Dto\FP\Gordic.Sml.Interface.GSmlEnableShowDetailListDto.d.ts
*                Doklad\Dto\FP\Gordic.Sml.Interface.GSmlFpCheckPolDto.d.ts
*                Doklad\Dto\FP\Gordic.Sml.Interface.GSmlFpSumaDto.d.ts
*                Doklad\Dto\FP\Gordic.Sml.Interface.GSmlInsertListDto .d.ts
*                Doklad\Dto\FP\Gordic.Sml.Interface.GSmlIxsFunDto.d.ts
*                Doklad\Dto\FP\Gordic.Sml.Interface.GSmlNactiDetailDto.d.ts
*                Init\Gordic.Sml.Interface.IGSmlGlobals.d.ts
*                Init\Dto\Gordic.Sml.Interface.GSmlSeznamDto.d.ts
*                Init\Dto\Gordic.Sml.Interface.GSmlSeznamWflDto.d.ts
*                Ostatni\Gordic.Sml.Interface.IGAgenda.d.ts
*                Ostatni\Gordic.Sml.Interface.IGHledani.d.ts
*                Ostatni\Gordic.Sml.Interface.IGKniha.d.ts
*                Ostatni\Gordic.Sml.Interface.IGPomocne.d.ts
*                Pripad\Gordic.Sml.Interface.IGPripadSml.d.ts
*                Pripad\Dto\Gordic.Sml.Interface.GPripadSmlDto.d.ts
*                Pripad\Dto\Gordic.Sml.Interface.GPripadSmlFilterDto.d.ts
*                Sml\GSmlEnums.d.ts
*                Sml\Dto\GDdpstppDto.d.ts
*                Sml\Dto\GDetailRezervaceDto.d.ts
*                Sml\Dto\GDokladyDto.d.ts
*                Sml\Dto\GDokladyListFilterDto.d.ts
*                Sml\Dto\GEsuVerejneZakazceDto.d.ts
*                Sml\Dto\GGindesuDto.d.ts
*                Sml\Dto\GGinsdenDto.d.ts
*                Sml\Dto\GGinsesuDto.d.ts
*                Sml\Dto\GOstatniUdajeDto.d.ts
*                Sml\Dto\GPredpPohDto.d.ts
*                Sml\Dto\GReaderCisRealDto.d.ts
*                Sml\Dto\GReaderEkovabuDto.d.ts
*                Sml\Dto\GReaderMajsmajSmlDto.d.ts
*                Sml\Dto\GReaderMatskcmDto.d.ts
*                Sml\Dto\GReaderMatsmajDto.d.ts
*                Sml\Dto\GReaderSmlKalIxsEsuSmlDto.d.ts
*                Sml\Dto\GReaderSmlVlastnikDto.d.ts
*                Sml\Dto\GReaderVepssmoDto.d.ts
*                Sml\Dto\GReaderVyberPolozkyDto.d.ts
*                Sml\Dto\GReaderVyberUkazateleDto.d.ts
*                Sml\Dto\GRozaaatDto.d.ts
*                Sml\Dto\GRozdxmaDto.d.ts
*                Sml\Dto\GSetLabelTabDto.d.ts
*                Sml\Dto\GSmlAcVerZakDto.d.ts
*                Sml\Dto\GSmlapidDto.d.ts
*                Sml\Dto\GSmlcpopDto.d.ts
*                Sml\Dto\GSmlctplDto.d.ts
*                Sml\Dto\GSmldkalDto.d.ts
*                Sml\Dto\GSmldpolDto.d.ts
*                Sml\Dto\GSmldrokDto.d.ts
*                Sml\Dto\GSmlEkoParamsDto.d.ts
*                Sml\Dto\GSmlEsuVerZakDto.d.ts
*                Sml\Dto\GSmlFinancniKontrolaDto.d.ts
*                Sml\Dto\GSmlFinPresunDto.d.ts
*                Sml\Dto\GSmlGlobalsDto.d.ts
*                Sml\Dto\GSmlhdphDto.d.ts
*                Sml\Dto\GSmlHromOperaceDto.d.ts
*                Sml\Dto\GSmlInfoDto.d.ts
*                Sml\Dto\GSmlMakeCopyDto.d.ts
*                Sml\Dto\GSmlMakeObjDto.d.ts
*                Sml\Dto\GSmlsesuDto.d.ts
*                Sml\Dto\GSmlsiabDto.d.ts
*                Sml\Dto\GSmlskalDto.d.ts
*                Sml\Dto\GSmlspacDto.d.ts
*                Sml\Dto\GSmlspidDto.d.ts
*                Sml\Dto\GSmlspolDto.d.ts
*                Sml\Dto\GSmlspzpDto.d.ts
*                Sml\Dto\GSmlsrokDto.d.ts
*                Sml\Dto\GSmlssteDto.d.ts
*                Sml\Dto\GSmlszukDto.d.ts
*                Sml\Dto\GSmltmp1Dto.d.ts
*                Sml\Dto\GSmlvlrrDto.d.ts
*                Sml\Dto\GSmlvvadDto.d.ts
*                Sml\Dto\GSmlVZDto.d.ts
*                Sml\Dto\GSml_DetailDto.d.ts
*                Sml\Dto\GSpolecneDto.d.ts
*                Sml\Dto\GSslstypDto.d.ts
*                Sml\Dto\GVepssmoDto.d.ts
*                Sml\Dto\GWflspidDto.d.ts
*                Sml\Dto\HlaskyResultDto.d.ts
*                Sml\Dto\TempDto\GTempDto.d.ts
*                Sml\ISL\IGDetailDokladu.d.ts
*                Sml\ISL\IGDetailRezervace.d.ts
*                Sml\ISL\IGDoklady.d.ts
*                Sml\ISL\IGOstatniUdaje.d.ts
*                Sml\ISL\IGRozaaat.d.ts
*                Sml\ISL\IGSmlAcVerZak.d.ts
*                Sml\ISL\IGSmlFinancniKontrola.d.ts
*                Sml\ISL\IGSmlFinancovaniPripad.d.ts
*                Sml\ISL\IGSmlFinPolozkyFPDoklad.d.ts
*                Sml\ISL\IGSmlFinPolozkyFPPripad.d.ts
*                Sml\ISL\IGSmlFinPresun.d.ts
*                Sml\ISL\IGSmlFinRozpisDoklad.d.ts
*                Sml\ISL\IGSmlFinRozpisLimitReal.d.ts
*                Sml\ISL\IGSmlhdph.d.ts
*                Sml\ISL\IGSmlHromOperace.d.ts
*                Sml\ISL\IGSmlInfo.d.ts
*                Sml\ISL\IGSmlMakeCopy.d.ts
*                Sml\ISL\IGSmlMakeObj.d.ts
*                Sml\ISL\IGSmlPolFin.d.ts
*                Sml\ISL\IGSmlpzp.d.ts
*                Sml\ISL\IGSmlsesu.d.ts
*                Sml\ISL\IGSmlsiab.d.ts
*                Sml\ISL\IGSmlskal.d.ts
*                Sml\ISL\IGSmlspid.d.ts
*                Sml\ISL\IGSmlUvolneni.d.ts
*                Sml\ISL\IGSmlVZ.d.ts
*                Sml\ISL\IGSmlZapisy.d.ts
*                Sml\ISL\IGVepssmo.d.ts
*                Sml\ISL\Obejkty\BackEnd.d.ts
*                Sml\Readers\IGReaderSmlKalIxsEsuSml.d.ts
*                Sml\Readers\IGReaderSmlsesu.d.ts
*                Sml\Readers\IGSmlTypDokladu.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\GEkocizpDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ekocizp*/
	interface GEkocizpDto {
		/**DBCOLUMN:ekocizp.zp*/
		zp?: number|null;
		/**DBCOLUMN:ekocizp.zp_txt*/
		zp_txt?: string|null;
	}
	const enum GEkocizpDtoNames { zp = "zp", zp_txt = "zp_txt",}
	const enum GEkocizpDtoFragments { zp = "*", zp_txt = "*",}
	const enum GEkocizpDtoTypes { zp = "number", zp_txt = "string",}
	const enum GEkocizpDtoTypeLengths { zp_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\Gordic.Sml.Interface.GSmlcprzDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Číselník typů operací*/
	interface GSmlcprzDto {
		/**typ operace*/
		priz_zaz?: number|null;
		/**název typu operace*/
		priz_zaz_txt?: string|null;
	}
	const enum GSmlcprzDtoNames { priz_zaz = "priz_zaz", priz_zaz_txt = "priz_zaz_txt",}
	const enum GSmlcprzDtoFragments { priz_zaz = "*", priz_zaz_txt = "*",}
	const enum GSmlcprzDtoTypes { priz_zaz = "number", priz_zaz_txt = "string",}
	const enum GSmlcprzDtoTypeLengths { priz_zaz_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\Gordic.Sml.Interface.GSmlcstaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Číselník stavů dokladu*/
	interface GSmlcstaDto {
		/**stav dokladu*/
		sml_stav?: number|null;
		/**název stavu dokladu*/
		sml_stav_txt?: string|null;
		/**zkratka stavu dokladu*/
		sml_stav_zkr?: string|null;
	}
	const enum GSmlcstaDtoNames { sml_stav = "sml_stav", sml_stav_txt = "sml_stav_txt", sml_stav_zkr = "sml_stav_zkr",}
	const enum GSmlcstaDtoFragments { sml_stav = "*", sml_stav_txt = "*", sml_stav_zkr = "*",}
	const enum GSmlcstaDtoTypes { sml_stav = "number", sml_stav_txt = "string", sml_stav_zkr = "string",}
	const enum GSmlcstaDtoTypeLengths { sml_stav_txt = 50, sml_stav_zkr = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlcpopDto.d.ts 

declare namespace Gordic.Sml.Interface {
    /**DBTABLE:smlcpop*/
	interface GSmlcpopDto {
        /**DBCOLUMN:smlcpop.priz_opce*/
		priz_opce?: number|null;
        /**DBCOLUMN:smlcpop.priz_opce_txt*/
		priz_opce_txt?: string|null;
        /**DBCOLUMN:smlcpop.priz_opce_zkr*/
		priz_opce_zkr?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlcstsDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlcsts Ciselnik Stav podpisu smlouvy*/
	interface GSmlcstsDto {
		/**DBCOLUMN:smlcsts.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:smlcsts.sgn_stav_txt*/
		sgn_stav_txt?: string|null;
		/**DBCOLUMN:smlcsts.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlcsts.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:smlcsts.k_xml*/
		k_xml?: string|null;
	}
	const enum GSmlcstsDtoNames { sgn_stav = "sgn_stav", sgn_stav_txt = "sgn_stav_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSmlcstsDtoFragments { sgn_stav = "*", sgn_stav_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSmlcstsDtoTypes { sgn_stav = "number", sgn_stav_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSmlcstsDtoTypeLengths { sgn_stav_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlctycDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlctyc Ciselnik Typ ceny smlouvy*/
	interface GSmlctycDto {
		/**DBCOLUMN:smlctyc.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlctyc.typ_ceny_txt*/
		typ_ceny_txt?: string|null;
		/**DBCOLUMN:smlctyc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlctyc.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:smlctyc.k_xml*/
		k_xml?: string|null;
	}
	const enum GSmlctycDtoNames { typ_ceny = "typ_ceny", typ_ceny_txt = "typ_ceny_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSmlctycDtoFragments { typ_ceny = "*", typ_ceny_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSmlctycDtoTypes { typ_ceny = "number", typ_ceny_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSmlctycDtoTypeLengths { typ_ceny_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlctykDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlctyk Typ kurzu*/
	interface GSmlctykDto {
		/**DBCOLUMN:smlctyk.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:smlctyk.typ_kurz_txt*/
		typ_kurz_txt?: string|null;
		/**DBCOLUMN:smlctyk.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlctyk.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:smlctyk.k_xml*/
		k_xml?: string|null;
	}
	const enum GSmlctykDtoNames { typ_kurz = "typ_kurz", typ_kurz_txt = "typ_kurz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSmlctykDtoFragments { typ_kurz = "*", typ_kurz_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSmlctykDtoTypes { typ_kurz = "number", typ_kurz_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSmlctykDtoTypeLengths { typ_kurz_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlczukDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlczuk*/
	interface GSmlczukDto {
		/**DBCOLUMN:smlczuk.ktg_zuk*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:smlczuk.ktg_zuk_txt*/
		ktg_zuk_txt?: string|null;
		/**DBCOLUMN:smlczuk.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlczuk.k_s*/
		k_s?: string|null;
	}
	const enum GSmlczukDtoNames { ktg_zuk = "ktg_zuk", ktg_zuk_txt = "ktg_zuk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSmlczukDtoFragments { ktg_zuk = "*", ktg_zuk_txt = "*", k_v = "*", k_s = "*",}
	const enum GSmlczukDtoTypes { ktg_zuk = "number", ktg_zuk_txt = "string", k_v = "number", k_s = "string",}
	const enum GSmlczukDtoTypeLengths { ktg_zuk_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlRefAllDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**výběr ginsref*/
	interface GSmlRefAllDto {
		/**kód*/
		ixs_ref?: string|null;
		/**jméno*/
		nazev?: string|null;
	}
	const enum GSmlRefAllDtoNames { ixs_ref = "ixs_ref", nazev = "nazev",}
	const enum GSmlRefAllDtoFragments { ixs_ref = "*", nazev = "*",}
	const enum GSmlRefAllDtoTypes { ixs_ref = "string", nazev = "string",}
	const enum GSmlRefAllDtoTypeLengths { nazev = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Controls\Dto\GSmlSoutezDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**výběr soutěže*/
	interface GSmlSoutezDto {
		/**soutez*/
		soutez?: string|null;
		/**soutez_txt*/
		soutez_txt?: string|null;
		/**typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
	}
	const enum GSmlSoutezDtoNames { soutez = "soutez", soutez_txt = "soutez_txt", typ_ag_blok = "typ_ag_blok", dat_ucinnost = "dat_ucinnost",}
	const enum GSmlSoutezDtoFragments { soutez = "*", soutez_txt = "*", typ_ag_blok = "*", dat_ucinnost = "*",}
	const enum GSmlSoutezDtoTypes { soutez = "string", soutez_txt = "string", typ_ag_blok = "number", dat_ucinnost = "JsonDate",}
	const enum GSmlSoutezDtoTypeLengths { soutez_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Gordic.Sml.Interface.IGDokladSml.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Společný předek pro doklad SML
	*     
	* @domain Smlouvy
	*/
	interface DokladSml {
		/**
		*     Inicializace DTO dokladu SML
		*     
		*/
		init(rq?:CallParams<{}>): _Task<{},Gordic.Sml.Interface.GDokladSmlDto>;
		/**
		*     Načtení defaultních hodnot
		*     
		*/
		readDefaults(rq?:Gordic.Sml.Interface.GDokladSmlDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GDokladSmlDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GDokladSmlDto>,GServiceReadResponse<Gordic.Sml.Interface.GDokladSmlDto>>;
		/**
		*     Načte detail dokladu SML
		*     
		*/
		read(rq?:Gordic.Sml.Interface.GDokladSmlDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GDokladSmlDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GDokladSmlDto>,GServiceReadResponse<Gordic.Sml.Interface.GDokladSmlDto>>;
		/**
		*     Načte seznam dokladů SML
		*     
		*/
		list(rq?:Gordic.Sml.Interface.GDokladSmlFilterDto|CallParams<GServiceListRequestWithOrder<Gordic.Sml.Interface.GDokladSmlOrderBy>>): _Task<GServiceListRequestWithOrder<Gordic.Sml.Interface.GDokladSmlOrderBy>,GServiceListResponse<Gordic.Sml.Interface.GDokladSmlDto>>;
		/**
		*     Načte seznam všech dokladů SML jednoho případu SML. Vazby jsou řešeny přes ixp a ixp_nad (může být tedy plněno jinak než v metodě List). Doklady jsou seřazeny podle jednotlivých úrovní, od nejvyšší po nejnižší
		*     
		*/
		listDokladyPripadu(rq?:Gordic.Sml.Interface.GDokladSmlFilterDto|CallParams<GServiceListRequestWithOrder<Gordic.Sml.Interface.GDokladSmlOrderBy>>): _Task<GServiceListRequestWithOrder<Gordic.Sml.Interface.GDokladSmlOrderBy>,GServiceListResponse<Gordic.Sml.Interface.GDokladSmlDto>>;
		/**
		*     Zjistí počet dokladů SML
		*     
		*/
		listCount(rq?:Gordic.Sml.Interface.GDokladSmlFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     Podání dokladu
		*     
		*/
		create(rq?:Gordic.Sml.Interface.GDokladSmlDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GDokladSmlDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GDokladSmlDto>,GServiceSaveResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Evidence (uložení) dokladu
		*     
		*/
		update(rq?:Gordic.Sml.Interface.GDokladSmlDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GDokladSmlDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GDokladSmlDto>,GServiceSaveResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola předaných dokladů před schválením / zrušením schválení
		*     
		*/
		zkontrolujPredSchvalenim(rq?:Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Schválení / zrušení schválení dokladu
		*     
		*/
		schval(rq?:Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné schválení / zrušení schválení předaných dokladů
		*     
		*/
		hromadneSchval(rq?:Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola předaných dokladů před schválením položek FP
		*     
		*/
		zkontrolujPredSchvalenimPolozekFP(rq?:Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Schválení položek FP dokladu
		*     
		*/
		schvalPolozkyFP(rq?:Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné schválení položek FP předaných dokladů
		*     
		*/
		hromadneSchvalPolozkyFP(rq?:Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlSchvaleniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola předaných dokladů před podepsáním / zrušením podepsání
		*     
		*/
		zkontrolujPredPodepsanim(rq?:Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Podepsání / zrušení podepsání dokladu
		*     
		*/
		podepis(rq?:Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné podepsání / zrušení podepsání předaných dokladů
		*     
		*/
		hromadnePodepis(rq?:Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlPodepsaniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola předaných dokladů před ukončením / zrušením ukončení
		*     
		*/
		zkontrolujPredUkoncenim(rq?:Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Ukončení / zrušení ukončení dokladu
		*     
		*/
		ukonci(rq?:Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné ukončení / zrušení ukončení předaných dokladů
		*     
		*/
		hromadneUkonci(rq?:Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlUkonceniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola předaných dokladů před stornem / zrušením storna
		*     
		*/
		zkontrolujPredStornem(rq?:Gordic.Sml.Interface.GDokladSmlStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlStornoOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Storno / zrušení storna dokladu
		*     
		*/
		stornuj(rq?:Gordic.Sml.Interface.GDokladSmlStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlStornoOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné storno / zrušení storna předaných dokladů
		*     
		*/
		hromadneStornuj(rq?:Gordic.Sml.Interface.GDokladSmlStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlStornoOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola předaných dokladů před rezervací v IISSP
		*     
		*/
		zkontrolujPredRezervaciVIissp(rq?:Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Rezervace v IISSP
		*     
		*/
		rezervujVIissp(rq?:Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadná rezervace v IISSP
		*     
		*/
		hromadneRezervujVIissp(rq?:Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GDokladSmlRezervaceVIisspOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před předáním
		*     
		*/
		zkontrolujPredPredanim(rq?:Gordic.Sml.Interface.GDokladSmlPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPredaniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Předání dokladu
		*     
		*/
		predej(rq?:Gordic.Sml.Interface.GDokladSmlPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPredaniOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné předání dokladů
		*     
		*/
		hromadnePredej(rq?:Gordic.Sml.Interface.GDokladSmlPredaniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPredaniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPredaniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před převzetím
		*     
		*/
		zkontrolujPredPrevzetim(rq?:Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Převzetí dokladu
		*     
		*/
		prevezmi(rq?:Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné převzetí dokladů
		*     
		*/
		hromadnePrevezmi(rq?:Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrevzetiOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před přidělením
		*     
		*/
		zkontrolujPredPridelenim(rq?:Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Přidělení dokladu
		*     
		*/
		pridel(rq?:Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné přidělení dokladů
		*     
		*/
		hromadnePridel(rq?:Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPrideleniOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před přeevidováním
		*     
		*/
		zkontrolujPredPreevidovanim(rq?:Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Přeevidování dokladu
		*     
		*/
		preeviduj(rq?:Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné přeevidování dokladů
		*     
		*/
		hromadnePreeviduj(rq?:Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlPreevidenceOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před vrácením do WFL
		*     
		*/
		zkontrolujPredVracenimDoWfl(rq?:Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Vrácení dokladu do WFL
		*     
		*/
		vratDoWfl(rq?:Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné vrácení dokladů do WFL
		*     
		*/
		hromadneVratDoWfl(rq?:Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlVraceniDoWflOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Načtení defaultních hodnot pro generování poukazu
		*     
		*/
		readDefaultsForGenerujPoukaz(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>>;
		/**
		*     Kontrola dokladů před generováním poukazu
		*     
		*/
		zkontrolujPredGenerovanimPoukazu(rq?:Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Generování poukazu
		*     
		*/
		generujPoukaz(rq?:Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné generování poukazu
		*     
		*/
		hromadneGenerujPoukaz(rq?:Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPoukazuOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před generováním pohledávky
		*     
		*/
		zkontrolujPredGenerovanimPohledavky(rq?:Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Generování pohledávky
		*     
		*/
		generujPohledavku(rq?:Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto>,GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné generování pohledávky
		*     
		*/
		hromadneGenerujPohledavku(rq?:Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlGenerovaniPohledavkyOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Kontrola dokladů před vygenerováním el. obrazu a odesláním do výpravny
		*     
		*/
		zkontrolujPredOdeslanimDoVypravny(rq?:Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Příprava dat pro vygenerování el. obrazu a odeslání do výpravny
		*     
		*/
		pripravaOdeslaniDoVypravny(rq?:CallParams<{rq:GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto>,row_counter:number}>): _Task<{rq:GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto>,row_counter:number},GServiceActionResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Hromadné příprava dat pro vygenerování el. obrazu a odeslání do výpravny
		*     
		*/
		hromadnePripravOdeslaniDoVypravny(rq?:Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GDokladSmlOdeslaniDoVypravnyOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlPkDto>>;
		/**
		*     Načte seznam subjektů k dokladům SML
		*     
		*/
		listSubjektu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSubjektDokladuSmlDto>>;
		/**
		*     Načte seznam rezervací k dokladům SML
		*     
		*/
		listRezervaci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GRezervaceDokladuSmlDto>>;
		/**
		*     Načte seznam pohledávek k dokladům SML
		*     
		*/
		listPohledavek(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GPohledavkyDokladuSmlDto>>;
		/**
		*     Uložení jednoho subjektu
		*     
		*/
		upsertSubjektu(rq?:CallParams<{insert:boolean,data:Gordic.Sml.Interface.GSubjektDokladuSmlDto}>): _Task<{insert:boolean,data:Gordic.Sml.Interface.GSubjektDokladuSmlDto},void>;
		/**
		*     Odstranění jednoho subjektu
		*     
		*/
		deleteSubjektu(rq?:CallParams<{data:Gordic.Sml.Interface.GSubjektDokladuSmlDto}>): _Task<{data:Gordic.Sml.Interface.GSubjektDokladuSmlDto},void>;
		/**
		*     Vrátí oprávnění dokladů SML (společné pro celý seznam)
		*     
		*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Sml.Interface.GDokladSmlServicePermission>;
		/**
		*     Kontrola na první doklad v knize
		*     
		*/
		zkontrolujNaPrvniDokladVKnize(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**
		*     Kontrola počtu dokladů zadaných v jednom dni
		*     
		*/
		zkontrolujSubjektyZaDen(rq?:CallParams<{ixsEsu:string,ixsOrj:string,ixpDen:string}>): _Task<{ixsEsu:string,ixsOrj:string,ixpDen:string},boolean>;
		/**
		*     Zjistí aktuální kurz
		*     
		*/
		zjistiAktualniKurz(rq?:CallParams<{mena:number}>): _Task<{mena:number},Gordic.Sml.Interface.GKurzovyListek>;
		/**
		*     Kontrola možnosti změnit typ ceny dokladu
		*     
		*/
		zkontrolujZmenuTypuCeny(rq?:CallParams<{ixp:string,ixpSmlPri:string,typCenyPuvodni:number,ktgTyp:number,smlStav:number,typCeny:number,typPlatnost:number}>): _Task<{ixp:string,ixpSmlPri:string,typCenyPuvodni:number,ktgTyp:number,smlStav:number,typCeny:number,typPlatnost:number},string>;
		/**
		*     Zjistí cenu dokladu z celkové částky financování
		*     
		*/
		zjistiCenuDokladuDodatku(rq?:CallParams<{ixpSmlPri:string,cisloDod:number,cMena:JsonDecimal}>): _Task<{ixpSmlPri:string,cisloDod:number,cMena:JsonDecimal},JsonDecimal>;
		/**
		*     Zjistí celkovou částku pro dodatek z celkové smluvní
		*     
		*/
		zjistiCelkovouCastkuDodatku(rq?:CallParams<{ixpSmlPri:string,cisloDod:number,cMenaDoc:JsonDecimal}>): _Task<{ixpSmlPri:string,cisloDod:number,cMenaDoc:JsonDecimal},JsonDecimal>;
		/**
		*     Kontrola částky objednávky proti smlouvě
		*     
		*/
		zkontrolujCastkuObjednavkyProtiSmlouve(rq?:CallParams<{ixp:string,ixpSml:string,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,cMena:JsonDecimal,cMenaDoc:JsonDecimal,ktgTyp:number,typAgBlok:number,ixsPri:string,rezim:number}>): _Task<{ixp:string,ixpSml:string,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,cMena:JsonDecimal,cMenaDoc:JsonDecimal,ktgTyp:number,typAgBlok:number,ixsPri:string,rezim:number},string>;
		/**
		*     Kontrola celkové částky smlouvy vůči VZ
		*     
		*/
		zkontrolujCastkuSmlouvyProtiVZ(rq?:CallParams<{ixp:string,ixsPri:string,ixpNab:string,ixsEsu:string,porCisloNab:number,typAgBlok:number,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,cMena:JsonDecimal,cMenaDoc:JsonDecimal,ixpSmlPri:string,ktgSml:number,rezim:number}>): _Task<{ixp:string,ixsPri:string,ixpNab:string,ixsEsu:string,porCisloNab:number,typAgBlok:number,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,cMena:JsonDecimal,cMenaDoc:JsonDecimal,ixpSmlPri:string,ktgSml:number,rezim:number},string>;
		/**
		*     Kontrola celkové částky dodatku vůči případu
		*     
		*/
		zkontrolujCastkuDodatkuProtiPripadu(rq?:CallParams<{ixp:string,ixpSml:string,cMena:JsonDecimal,cMenaDoc:JsonDecimal,rezim:number,ixsPri:string,ixpSmlPri:string,ixpNab:string,ixsEsu:string,porCisloNab:number,typAgBlok:number,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,ktgSml:number,ixpDen:string}>): _Task<{ixp:string,ixpSml:string,cMena:JsonDecimal,cMenaDoc:JsonDecimal,rezim:number,ixsPri:string,ixpSmlPri:string,ixpNab:string,ixsEsu:string,porCisloNab:number,typAgBlok:number,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,ktgSml:number,ixpDen:string},string>;
		/**
		*     Kontrolu podtečení sumy navázaných objednávek/smluv - pro doklady, na které lze vázat
		*     
		*/
		zkontrolujPodteceniSumyObjednavekASmluv(rq?:CallParams<{ktgTyp:number,ixpSmlPri:string,cMenaDoc:JsonDecimal}>): _Task<{ktgTyp:number,ixpSmlPri:string,cMenaDoc:JsonDecimal},string>;
		/**
		*     Kontrolu vůči platebnímu kalendáři
		*     
		*/
		zkontrolujProtiPlatebnimuKalendari(rq?:CallParams<{ixp:string,ixpSmlPri:string,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,cMena:JsonDecimal}>): _Task<{ixp:string,ixpSmlPri:string,mena:number,typKurz:number,kurz:JsonDecimal,m:JsonDecimal,cMena:JsonDecimal},string>;
		/**
		*     Vrácení všech typů dokumentů ke kategoriím typu dokumentů
		*     
		*/
		vratVsechnyIxsTyp(rq?:CallParams<{ktgTyp:number[]}>): _Task<{ktgTyp:number[]},string[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DokladSml: ServiceBase & Catalog.DokladSml;
	}
	const DokladSml: Client["DokladSml"];
}
declare namespace Gordic.Sml.Interface {
	/**
	*     Oprávnění pro jeden doklad SML
	*     
	*/
	interface GDokladSmlPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze editovat*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit*/
		LzeHromadneSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit schválení*/
		LzeHromadneZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitPodepsani: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit*/
		LzeHromadnePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit schválení*/
		LzeHromadneZrusitPodepsani: Gordic.General.ApplicationInterface.GPermission;
		/**lze ukončit*/
		LzeUkoncit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit ukončení*/
		LzeZrusitUkonceni: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně ukončit*/
		LzeHromadneUkoncit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit ukončení*/
		LzeHromadneZrusitUkonceni: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně stornovat*/
		LzeHromadneStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit storno*/
		LzeHromadneZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze rezervovat v IISSP*/
		LzeRezervovatIissp: Gordic.General.ApplicationInterface.GPermission;
		/**lze zveřejnit*/
		LzeZverejnit: Gordic.General.ApplicationInterface.GPermission;
		/**lze uvolnit*/
		LzeUvolnit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně uvolnit*/
		LzeHromadneUvolnit: Gordic.General.ApplicationInterface.GPermission;
		/**lze pracovat s položkami finančního profilu*/
		LzePolozkyFP: Gordic.General.ApplicationInterface.GPermission;
		/**lze pracovat s položkami účetního profilu*/
		LzePolozkyUP: Gordic.General.ApplicationInterface.GPermission;
		/**lze pracovat s položkami věcného profilu*/
		LzePolozkyVP: Gordic.General.ApplicationInterface.GPermission;
		/**lze pracovat s platebním kalendářem*/
		LzePlatebniKalendar: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit kopii*/
		LzeVytvoritKopii: Gordic.General.ApplicationInterface.GPermission;
		/**lze vytvořit objednávku*/
		LzeVytvoritObjednavku: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat poukaz*/
		LzeGenerovatPoukaz: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat pohledávku*/
		LzeGenerovatPohledavku: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně předat*/
		LzeHromadnePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně převzít*/
		LzeHromadnePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně přidělit*/
		LzeHromadnePridelit: Gordic.General.ApplicationInterface.GPermission;
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
		/**lze přidat nový subjekt*/
		LzePridatSubjekt: Gordic.General.ApplicationInterface.GPermission;
		/**lze editovat existující subjekt*/
		LzeEditovatSubjekt: Gordic.General.ApplicationInterface.GPermission;
		/**lze odstranit subjekt*/
		LzeOdstranitSubjekt: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadne odeslat do vypravny*/
		LzeHromadneOdeslatDoVypravny: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDokladSmlPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEditovat = "LzeEditovat", LzeEvidovat = "LzeEvidovat", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeHromadneSchvalit = "LzeHromadneSchvalit", LzeHromadneZrusitSchvaleni = "LzeHromadneZrusitSchvaleni", LzePodepsat = "LzePodepsat", LzeZrusitPodepsani = "LzeZrusitPodepsani", LzeHromadnePodepsat = "LzeHromadnePodepsat", LzeHromadneZrusitPodepsani = "LzeHromadneZrusitPodepsani", LzeUkoncit = "LzeUkoncit", LzeZrusitUkonceni = "LzeZrusitUkonceni", LzeHromadneUkoncit = "LzeHromadneUkoncit", LzeHromadneZrusitUkonceni = "LzeHromadneZrusitUkonceni", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeHromadneStornovat = "LzeHromadneStornovat", LzeHromadneZrusitStorno = "LzeHromadneZrusitStorno", LzeRezervovatIissp = "LzeRezervovatIissp", LzeZverejnit = "LzeZverejnit", LzeUvolnit = "LzeUvolnit", LzeHromadneUvolnit = "LzeHromadneUvolnit", LzePolozkyFP = "LzePolozkyFP", LzePolozkyUP = "LzePolozkyUP", LzePolozkyVP = "LzePolozkyVP", LzePlatebniKalendar = "LzePlatebniKalendar", LzeVytvoritKopii = "LzeVytvoritKopii", LzeVytvoritObjednavku = "LzeVytvoritObjednavku", LzeGenerovatPoukaz = "LzeGenerovatPoukaz", LzeGenerovatPohledavku = "LzeGenerovatPohledavku", LzePredat = "LzePredat", LzeHromadnePredat = "LzeHromadnePredat", LzePrevzit = "LzePrevzit", LzeHromadnePrevzit = "LzeHromadnePrevzit", LzePridelit = "LzePridelit", LzeHromadnePridelit = "LzeHromadnePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout", LzeDiagnostika = "LzeDiagnostika", LzePridatSubjekt = "LzePridatSubjekt", LzeEditovatSubjekt = "LzeEditovatSubjekt", LzeOdstranitSubjekt = "LzeOdstranitSubjekt", LzeHromadneOdeslatDoVypravny = "LzeHromadneOdeslatDoVypravny",}
	const enum GDokladSmlPermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEditovat = "*", LzeEvidovat = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeHromadneSchvalit = "*", LzeHromadneZrusitSchvaleni = "*", LzePodepsat = "*", LzeZrusitPodepsani = "*", LzeHromadnePodepsat = "*", LzeHromadneZrusitPodepsani = "*", LzeUkoncit = "*", LzeZrusitUkonceni = "*", LzeHromadneUkoncit = "*", LzeHromadneZrusitUkonceni = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeHromadneStornovat = "*", LzeHromadneZrusitStorno = "*", LzeRezervovatIissp = "*", LzeZverejnit = "*", LzeUvolnit = "*", LzeHromadneUvolnit = "*", LzePolozkyFP = "*", LzePolozkyUP = "*", LzePolozkyVP = "*", LzePlatebniKalendar = "*", LzeVytvoritKopii = "*", LzeVytvoritObjednavku = "*", LzeGenerovatPoukaz = "*", LzeGenerovatPohledavku = "*", LzePredat = "*", LzeHromadnePredat = "*", LzePrevzit = "*", LzeHromadnePrevzit = "*", LzePridelit = "*", LzeHromadnePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*", LzeDiagnostika = "*", LzePridatSubjekt = "*", LzeEditovatSubjekt = "*", LzeOdstranitSubjekt = "*", LzeHromadneOdeslatDoVypravny = "*",}
	const enum GDokladSmlPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitPodepsani = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitPodepsani = "Gordic.General.ApplicationInterface.GPermission", LzeUkoncit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUkonceni = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneUkoncit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitUkonceni = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeRezervovatIissp = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnit = "Gordic.General.ApplicationInterface.GPermission", LzeUvolnit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneUvolnit = "Gordic.General.ApplicationInterface.GPermission", LzePolozkyFP = "Gordic.General.ApplicationInterface.GPermission", LzePolozkyUP = "Gordic.General.ApplicationInterface.GPermission", LzePolozkyVP = "Gordic.General.ApplicationInterface.GPermission", LzePlatebniKalendar = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritKopii = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritObjednavku = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatPoukaz = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatPohledavku = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeDiagnostika = "Gordic.General.ApplicationInterface.GPermission", LzePridatSubjekt = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSubjekt = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitSubjekt = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneOdeslatDoVypravny = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDokladSmlPermissionTypeLengths {}
	/**
	*     Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)
	*     
	*/
	interface GDokladSmlPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GDokladSmlPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GDokladSmlPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GDokladSmlPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GDokladSmlPermissionRequiredFragmentsTypeLengths {}
	/**
	*     Oprávnění pro jeden subjekt dokladu
	*     
	*/
	interface GSubjektDokladuSmlPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze editovat existující subjekt*/
		LzeEditovatSubjekt: Gordic.General.ApplicationInterface.GPermission;
		/**lze odstranit subjekt*/
		LzeOdstranitSubjekt: Gordic.General.ApplicationInterface.GPermission;
		/**lze změnit subjekt na primární*/
		LzeZmenitSubjektNaPrimarni: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSubjektDokladuSmlPermissionNames { LzeEditovatSubjekt = "LzeEditovatSubjekt", LzeOdstranitSubjekt = "LzeOdstranitSubjekt", LzeZmenitSubjektNaPrimarni = "LzeZmenitSubjektNaPrimarni",}
	const enum GSubjektDokladuSmlPermissionFragments { LzeEditovatSubjekt = "*", LzeOdstranitSubjekt = "*", LzeZmenitSubjektNaPrimarni = "*",}
	const enum GSubjektDokladuSmlPermissionTypes { LzeEditovatSubjekt = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitSubjekt = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitSubjektNaPrimarni = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSubjektDokladuSmlPermissionTypeLengths {}
	/**
	*     Oprávnění pro práci nad doklady SML
	*     
	*/
	interface GDokladSmlServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit*/
		LzeHromadneSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit schválení*/
		LzeHromadneZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit schválení*/
		LzeZrusitPodepsani: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit*/
		LzeHromadnePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit schválení*/
		LzeHromadneZrusitPodepsani: Gordic.General.ApplicationInterface.GPermission;
		/**lze ukončit*/
		LzeUkoncit: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit ukončení*/
		LzeZrusitUkonceni: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně ukončit*/
		LzeHromadneUkoncit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit ukončení*/
		LzeHromadneZrusitUkonceni: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně stornovat*/
		LzeHromadneStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně zrušit storno*/
		LzeHromadneZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lze rezervovat v IISSP*/
		LzeRezervovatIissp: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně změnit údaje*/
		LzeHromadneZmenitUdaje: Gordic.General.ApplicationInterface.GPermission;
		/**lze zveřejnit*/
		LzeZverejnit: Gordic.General.ApplicationInterface.GPermission;
		/**lze uvolnit*/
		LzeUvolnit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně uvolnit*/
		LzeHromadneUvolnit: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat poukaz*/
		LzeGenerovatPoukaz: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat pohledávku*/
		LzeGenerovatPohledavku: Gordic.General.ApplicationInterface.GPermission;
		/**lze schválit položky FP*/
		LzeSchvalitPolozkyFP: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně schválit položky FP*/
		LzeHromadneSchvalitPolozkyFP: Gordic.General.ApplicationInterface.GPermission;
		/**lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně předat*/
		LzeHromadnePredat: Gordic.General.ApplicationInterface.GPermission;
		/**lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně převzít*/
		LzeHromadnePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně přidělit*/
		LzeHromadnePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze vrátit do WFL*/
		LzeVratitDoWfl: Gordic.General.ApplicationInterface.GPermission;
		/**lze zkontrolovat metadata*/
		LzeZkontrolovatMetadata: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout (návrh nebo oznámení)*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**lze hromadně odeslat do výpravny*/
		LzeHromadneOdeslatDoVypravny: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDokladSmlServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeHromadneSchvalit = "LzeHromadneSchvalit", LzeHromadneZrusitSchvaleni = "LzeHromadneZrusitSchvaleni", LzePodepsat = "LzePodepsat", LzeZrusitPodepsani = "LzeZrusitPodepsani", LzeHromadnePodepsat = "LzeHromadnePodepsat", LzeHromadneZrusitPodepsani = "LzeHromadneZrusitPodepsani", LzeUkoncit = "LzeUkoncit", LzeZrusitUkonceni = "LzeZrusitUkonceni", LzeHromadneUkoncit = "LzeHromadneUkoncit", LzeHromadneZrusitUkonceni = "LzeHromadneZrusitUkonceni", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeHromadneStornovat = "LzeHromadneStornovat", LzeHromadneZrusitStorno = "LzeHromadneZrusitStorno", LzeRezervovatIissp = "LzeRezervovatIissp", LzeHromadneZmenitUdaje = "LzeHromadneZmenitUdaje", LzeZverejnit = "LzeZverejnit", LzeUvolnit = "LzeUvolnit", LzeHromadneUvolnit = "LzeHromadneUvolnit", LzeGenerovatPoukaz = "LzeGenerovatPoukaz", LzeGenerovatPohledavku = "LzeGenerovatPohledavku", LzeSchvalitPolozkyFP = "LzeSchvalitPolozkyFP", LzeHromadneSchvalitPolozkyFP = "LzeHromadneSchvalitPolozkyFP", LzePredat = "LzePredat", LzeHromadnePredat = "LzeHromadnePredat", LzePrevzit = "LzePrevzit", LzeHromadnePrevzit = "LzeHromadnePrevzit", LzePridelit = "LzePridelit", LzeHromadnePridelit = "LzeHromadnePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout", LzeHromadneOdeslatDoVypravny = "LzeHromadneOdeslatDoVypravny",}
	const enum GDokladSmlServicePermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeHromadneSchvalit = "*", LzeHromadneZrusitSchvaleni = "*", LzePodepsat = "*", LzeZrusitPodepsani = "*", LzeHromadnePodepsat = "*", LzeHromadneZrusitPodepsani = "*", LzeUkoncit = "*", LzeZrusitUkonceni = "*", LzeHromadneUkoncit = "*", LzeHromadneZrusitUkonceni = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeHromadneStornovat = "*", LzeHromadneZrusitStorno = "*", LzeRezervovatIissp = "*", LzeHromadneZmenitUdaje = "*", LzeZverejnit = "*", LzeUvolnit = "*", LzeHromadneUvolnit = "*", LzeGenerovatPoukaz = "*", LzeGenerovatPohledavku = "*", LzeSchvalitPolozkyFP = "*", LzeHromadneSchvalitPolozkyFP = "*", LzePredat = "*", LzeHromadnePredat = "*", LzePrevzit = "*", LzeHromadnePrevzit = "*", LzePridelit = "*", LzeHromadnePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*", LzeHromadneOdeslatDoVypravny = "*",}
	const enum GDokladSmlServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitPodepsani = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitPodepsani = "Gordic.General.ApplicationInterface.GPermission", LzeUkoncit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUkonceni = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneUkoncit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitUkonceni = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeRezervovatIissp = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneZmenitUdaje = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnit = "Gordic.General.ApplicationInterface.GPermission", LzeUvolnit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneUvolnit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatPoukaz = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatPohledavku = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalitPolozkyFP = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneSchvalitPolozkyFP = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneOdeslatDoVypravny = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDokladSmlServicePermissionTypeLengths {}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu dokladů SML
	*     
	*/
	const enum GDokladSmlFilter {
		/**PID knihy dokladů SML*/
		ixp_den,
		/**rok knih dokladů SML (pro všechny knihy roku)*/
		rok_den,
		/**kategorie knih dokladů SML*/
		ktg_den,
		/**PID dokladu SML*/
		ixp,
		/**PID nadřazené smlouvy k objednávce*/
		ixp_sml,
		/**PID nadřazeného dokladu SML*/
		ixp_sml_pri,
		/**aktuální funkce*/
		ixs_fun_akt,
		/**kompetent*/
		ixs_fun_vyriz,
		/**stav*/
		sml_stav,
		/**stav podpisu*/
		sgn_stav,
		/**popis*/
		popis,
		/**úplný název*/
		nazev,
		/**poznámka*/
		poznamka,
		/**agendové číslo*/
		ac_sml,
		/**evidenční číslo*/
		ac,
		/**kategorie typu dokladu*/
		ktg_typ,
		/**kategorie smlouvy*/
		ktg_sml,
		/**typ dokladu*/
		ixs_typ,
		/**omezení výběru dokladů pomocí řídící tabulky přípustných vazeb dokladů ginvtyp*/
		ixs_typ_fce,
		/**PID externího subjektu*/
		ixs_esu,
		/**měna*/
		mena,
		/**cena dokladu*/
		c_mena_doc,
		/**datum evidence*/
		dat_prij_pod,
		/**datum uzavření*/
		dat_uzavreni,
		/**datum konce platnosti*/
		dat_platnost,
		/**datum účinnosti*/
		dat_ucinnost,
		/**datum podpisu protistranou*/
		dat_sgn_ext,
		/**datum podpisu*/
		dat_sgn,
		/**datum ukončení*/
		dat_uko,
		/**související doklad 1*/
		ac_dok_1,
		/**datum souvisejícího dokladu 1*/
		dat_dok_1,
		/**související doklad 2*/
		ac_dok_2,
		/**datum souvisejícího dokladu 2*/
		dat_dok_2,
		/**datum financování od*/
		fin_od,
		/**datum financování do*/
		fin_do,
		/**celková částka*/
		c_mena,
		/**vazba dokladu na případ BLK*/
		sml_blk,
		/**vazba dokladu na nadřazenou smlouvu*/
		sml_nad_sml,
		/**vazba dokladu na podřízenou objednávku*/
		sml_obj,
		/**dodatek ke smlouvě*/
		sml_dod,
		/**doklad je nadřazeným případem*/
		sml_nad_pri,
		/**k dokladu existují zprávy dohledového systému*/
		sml_doc_dsg,
		/**k dokladu existuje elektronický obraz/příloha*/
		s_ele,
		/**vazba dokladu na majetkové karty*/
		sml_maj,
		/**disponibilita*/
		disp,
		/**typ blokační agendy*/
		typ_ag_blok,
		/**soutěž*/
		soutez,
		/**účtování o PZ/P*/
		priz_pzp,
		/**stav předběžné finanční kontroly*/
		stav_pfk,
		/**stav řízeného schvalovacího procesu*/
		stav_rsp,
		/**způsob ukončení*/
		ixs_zuk,
		/**možnost opce*/
		priz_opce,
		/**agendové číslo*/
		pri_ac_sml,
		/**popis*/
		pri_popis,
		/**položky FP se zadanou větou*/
		fp_pol,
		/**výběr dokladů ve vztahu k položkám FP*/
		fp_typ_vyb,
		/**období k výběru dokladů ve vztahu k položkám FP (pro fp_typ_vyb = 40 položky FP neexistují v období)*/
		fp_obd,
		/**vztah platebního kalendáře a dokladu*/
		plk_typ_vyb,
		/**období k výběru dokladů ve vztahu platebního kalendáře a dokladu (pro plk_typ_vyb = 40 platební kalendář neexistuje v období)*/
		plk_obd,
		/**vztah rozpisu a dokladu*/
		rozpis_typ_vyb,
		/**období k výběru dokladů ve vztahu rozpisu a dokladu (pro rozpis_typ_vyb = 40 celková částka není rozepsána v období)*/
		rozpis_obd,
		/**vztah dodatku a dokladu*/
		dod_typ_vyb,
		/**období k výběru dokladu ve vztahu dodatku a dokladu (pro dod_typ_vyb = 40 mění celkovou částku v období)*/
		dod_obd,
		/**období k výběru dokladu ve vztahu dodatku a dokladu (pro dod_typ_vyb = 50 datum uzavření)*/
		dod_dat_uza,
		/**stav zveřejnění*/
		stav_zpv,
		/**způsob zveřejnění*/
		ixs_zpv,
		/**nutnost zveřejnění*/
		priz_pov_zve,
		/**plán zveřejnění*/
		plan_zve,
		/**existence el obrazu/přílohy určené ke zveřejnění*/
		s_ele_zve,
		/**datum zveřejnění*/
		dat_zve,
		/**identifikátor zveřejnění*/
		id_zve,
		/**pouze doklady určené ke zveřejnění*/
		plan_zve_d,
		/**částka*/
		vep_c_sml,
		/**množství*/
		vep_m_sml,
		/**klasifikace*/
		vep_skp,
		/**materiálové číslo / KČM*/
		vep_mat_cis,
		/**název položky VP*/
		vep_nazev,
		/**skupina*/
		vep_skupina_id,
		/**druh*/
		vep_drh_id,
		/**MJ*/
		vep_mj,
		/**výrobní číslo*/
		vep_vyr_cis,
		/**inventární číslo*/
		vep_inv_cis,
		/**popis*/
		vep_popis,
		/**typ položky VP*/
		vep_ixs_dup,
		/**evidenční číslo*/
		vep_evi_cis,
		/**sériové číslo*/
		vep_ser_cis,
		/**šarže*/
		vep_sarze,
		/**vazba položky VP na doklad*/
		vp_typ_vyb,
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
		/**existence v tabulce wfltpre*/
		tpre_ano,
		/**IKC v tabulce wfltpre*/
		tpre_ikc,
		/**příznak vyškrtnutého pohybu v tabulce wfltpre*/
		tpre_uncheck,
		/**pomocná vazba na tabulku wfltpre místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_tpre,
	}
	/**
	*     Výčet sloupců pro řazení
	*     
	*/
	const enum GDokladSmlOrderBy {
		/**datum poslední změny*/
		dat_zmena,
	}
	/**
	*     Parametry schválení / zrušení schválení dokladů
	*     
	*/
	interface GDokladSmlSchvaleniOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = schválení, false = zrušení schválení)*/
		schvalit?: boolean|null;
		/**schválit, i když neeexistuje elektronický obraz (pouze pro schvalit = true)?*/
		i_bez_el_obrazu?: boolean|null;
		/**schválit, i když nebyl doklad zveřejněn (pouze pro schvalit = true)?*/
		i_bez_zverejneni?: boolean|null;
	}
	const enum GDokladSmlSchvaleniOperationDtoNames { schvalit = "schvalit", i_bez_el_obrazu = "i_bez_el_obrazu", i_bez_zverejneni = "i_bez_zverejneni", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlSchvaleniOperationDtoFragments { schvalit = "*", i_bez_el_obrazu = "*", i_bez_zverejneni = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlSchvaleniOperationDtoTypes { schvalit = "boolean", i_bez_el_obrazu = "boolean", i_bez_zverejneni = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlSchvaleniOperationDtoTypeLengths {}
	/**
	*     Parametry podepsání / zrušení podepsání dokladů
	*     
	*/
	interface GDokladSmlPodepsaniOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = podepsání, false = zrušení podepsání)*/
		podepsat?: boolean|null;
	}
	const enum GDokladSmlPodepsaniOperationDtoNames { podepsat = "podepsat", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlPodepsaniOperationDtoFragments { podepsat = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlPodepsaniOperationDtoTypes { podepsat = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlPodepsaniOperationDtoTypeLengths {}
	/**
	*     Parametry ukončení / zrušení ukončení dokladů
	*     
	*/
	interface GDokladSmlUkonceniOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = ukončení, false = zrušení ukončení)*/
		ukoncit?: boolean|null;
		/**ukončit, i kdy doklad není prozatím vázán na doklady realizující čerpání prostředků (pouze pro ukoncit = true)?*/
		i_bez_vazby_na_doklad_cerpani?: boolean|null;
		/**ukončit, i když jsou problémy při kontrole metadat (pouze pro ukoncit = true)?*/
		i_pri_chybnych_metadatech?: boolean|null;
	}
	const enum GDokladSmlUkonceniOperationDtoNames { ukoncit = "ukoncit", i_bez_vazby_na_doklad_cerpani = "i_bez_vazby_na_doklad_cerpani", i_pri_chybnych_metadatech = "i_pri_chybnych_metadatech", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlUkonceniOperationDtoFragments { ukoncit = "*", i_bez_vazby_na_doklad_cerpani = "*", i_pri_chybnych_metadatech = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlUkonceniOperationDtoTypes { ukoncit = "boolean", i_bez_vazby_na_doklad_cerpani = "boolean", i_pri_chybnych_metadatech = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlUkonceniOperationDtoTypeLengths {}
	/**
	*     Parametry storna / zrušení storna dokladů
	*     
	*/
	interface GDokladSmlStornoOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladSmlStornoOperationDtoNames { stornovat = "stornovat", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlStornoOperationDtoFragments { stornovat = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlStornoOperationDtoTypes { stornovat = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlStornoOperationDtoTypeLengths {}
	/**
	*     Parametry rezervace v IISSP dokladů
	*     
	*/
	interface GDokladSmlRezervaceVIisspOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = rezervace)*/
		rezervovat?: boolean|null;
		/**referent*/
		ixs_ref?: string|null;
		/**rok*/
		rok?: number|null;
	}
	const enum GDokladSmlRezervaceVIisspOperationDtoNames { rezervovat = "rezervovat", ixs_ref = "ixs_ref", rok = "rok", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlRezervaceVIisspOperationDtoFragments { rezervovat = "*", ixs_ref = "*", rok = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlRezervaceVIisspOperationDtoTypes { rezervovat = "boolean", ixs_ref = "string", rok = "number", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlRezervaceVIisspOperationDtoTypeLengths {}
	/**
	*     Parametry předání dokladů
	*     
	*/
	interface GDokladSmlPredaniOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = předat)*/
		predat?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**změnit kompetenta?*/
		zmenit_kompetenta?: boolean|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**realizátor*/
		cis_real?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladSmlPredaniOperationDtoNames { predat = "predat", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", zmenit_kompetenta = "zmenit_kompetenta", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlPredaniOperationDtoFragments { predat = "*", ixs_su = "*", ixs_fun_akt = "*", zmenit_kompetenta = "*", ixs_fun_vyriz = "*", cis_real = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlPredaniOperationDtoTypes { predat = "boolean", ixs_su = "string", ixs_fun_akt = "string", zmenit_kompetenta = "boolean", ixs_fun_vyriz = "string", cis_real = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlPredaniOperationDtoTypeLengths {}
	/**
	*     Parametry převzetí dokladů
	*     
	*/
	interface GDokladSmlPrevzetiOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = převzít)*/
		prevzit?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**změnit kompetenta?*/
		zmenit_kompetenta?: boolean|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**realizátor*/
		cis_real?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladSmlPrevzetiOperationDtoNames { prevzit = "prevzit", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", zmenit_kompetenta = "zmenit_kompetenta", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlPrevzetiOperationDtoFragments { prevzit = "*", ixs_su = "*", ixs_fun_akt = "*", zmenit_kompetenta = "*", ixs_fun_vyriz = "*", cis_real = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlPrevzetiOperationDtoTypes { prevzit = "boolean", ixs_su = "string", ixs_fun_akt = "string", zmenit_kompetenta = "boolean", ixs_fun_vyriz = "string", cis_real = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlPrevzetiOperationDtoTypeLengths {}
	/**
	*     Parametry přidělení dokladů
	*     
	*/
	interface GDokladSmlPrideleniOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = přidělit)*/
		pridelit?: boolean|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladSmlPrideleniOperationDtoNames { pridelit = "pridelit", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlPrideleniOperationDtoFragments { pridelit = "*", ixs_su = "*", ixs_fun_akt = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlPrideleniOperationDtoTypes { pridelit = "boolean", ixs_su = "string", ixs_fun_akt = "string", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlPrideleniOperationDtoTypeLengths {}
	/**
	*     Parametry přeevidence dokladů
	*     
	*/
	interface GDokladSmlPreevidenceOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = přidělit)*/
		preevidovat?: boolean|null;
		/**kniha*/
		ixp_den?: string|null;
		/**subřada*/
		subrada?: number|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**vlastník (zpracovatel)*/
		ixs_fun_akt?: string|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**realizátor*/
		cis_real?: string|null;
		/**důvod operace*/
		duvod?: string|null;
		/**uvolnění prostředků - upravit celkovou částku*/
		uvoln_celk_c?: boolean|null;
		/**uvolnění prostředků - upravit rozpis částky*/
		uvoln_rozpis_c?: boolean|null;
		/**uvolnění prostředků - stornovat doklad pfk*/
		uvoln_storno_pfk?: boolean|null;
	}
	const enum GDokladSmlPreevidenceOperationDtoNames { preevidovat = "preevidovat", ixp_den = "ixp_den", subrada = "subrada", ixs_su = "ixs_su", ixs_fun_akt = "ixs_fun_akt", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", duvod = "duvod", uvoln_celk_c = "uvoln_celk_c", uvoln_rozpis_c = "uvoln_rozpis_c", uvoln_storno_pfk = "uvoln_storno_pfk", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlPreevidenceOperationDtoFragments { preevidovat = "*", ixp_den = "*", subrada = "*", ixs_su = "*", ixs_fun_akt = "*", ixs_fun_vyriz = "*", cis_real = "*", duvod = "*", uvoln_celk_c = "*", uvoln_rozpis_c = "*", uvoln_storno_pfk = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlPreevidenceOperationDtoTypes { preevidovat = "boolean", ixp_den = "string", subrada = "number", ixs_su = "string", ixs_fun_akt = "string", ixs_fun_vyriz = "string", cis_real = "string", duvod = "string", uvoln_celk_c = "boolean", uvoln_rozpis_c = "boolean", uvoln_storno_pfk = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlPreevidenceOperationDtoTypeLengths {}
	/**
	*     Parametry vrácení dokladů do WFL
	*     
	*/
	interface GDokladSmlVraceniDoWflOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = vrátit)*/
		vratit?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDokladSmlVraceniDoWflOperationDtoNames { vratit = "vratit", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlVraceniDoWflOperationDtoFragments { vratit = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlVraceniDoWflOperationDtoTypes { vratit = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlVraceniDoWflOperationDtoTypeLengths {}
	/**
	*     Parametry generování poukazu
	*     
	*/
	interface GDokladSmlGenerovaniPoukazuOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = generovat poukaz)*/
		generovat?: boolean|null;
		/**skupina šablon POU*/
		ixs_ste?: string|null;
		/**kniha POU*/
		ixp_den?: string|null;
		/**typ dokladu*/
		ixs_typ?: string|null;
		/**KS*/
		ks?: string|null;
		/**SS*/
		ss?: string|null;
		/**kumulovat položky FP dle vlastního BÚ?*/
		bu_vl_grp?: boolean|null;
	}
	const enum GDokladSmlGenerovaniPoukazuOperationDtoNames { generovat = "generovat", ixs_ste = "ixs_ste", ixp_den = "ixp_den", ixs_typ = "ixs_typ", ks = "ks", ss = "ss", bu_vl_grp = "bu_vl_grp", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlGenerovaniPoukazuOperationDtoFragments { generovat = "*", ixs_ste = "*", ixp_den = "*", ixs_typ = "*", ks = "*", ss = "*", bu_vl_grp = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlGenerovaniPoukazuOperationDtoTypes { generovat = "boolean", ixs_ste = "string", ixp_den = "string", ixs_typ = "string", ks = "string", ss = "string", bu_vl_grp = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlGenerovaniPoukazuOperationDtoTypeLengths {}
	/**
	*     Parametry generování pohledávky
	*     
	*/
	interface GDokladSmlGenerovaniPohledavkyOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**požadovaná operace (true = generovat pohledávku)*/
		generovat?: boolean|null;
	}
	const enum GDokladSmlGenerovaniPohledavkyOperationDtoNames { generovat = "generovat", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlGenerovaniPohledavkyOperationDtoFragments { generovat = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlGenerovaniPohledavkyOperationDtoTypes { generovat = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlGenerovaniPohledavkyOperationDtoTypeLengths {}
	/**
	*     Parametry odeslání dokladů do výpravny
	*     
	*/
	interface GDokladSmlOdeslaniDoVypravnyOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GDokladSmlDto> {
		/**
		*     PID vybraného tisku
		*     
		*/
		reportId?: string|null;
	}
	const enum GDokladSmlOdeslaniDoVypravnyOperationDtoNames { reportId = "reportId", ikc = "ikc", rows = "rows",}
	const enum GDokladSmlOdeslaniDoVypravnyOperationDtoFragments { reportId = "*", ikc = "*", rows = "*",}
	const enum GDokladSmlOdeslaniDoVypravnyOperationDtoTypes { reportId = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GDokladSmlDto[]",}
	const enum GDokladSmlOdeslaniDoVypravnyOperationDtoTypeLengths {}
	/**
	*     Informace z kurzového lístku
	*     
	*/
	interface GKurzovyListek {
		/**kurz*/
		kurz_s?: JsonDecimal|null;
		/**množství*/
		m?: JsonDecimal|null;
	}
	const enum GKurzovyListekNames { kurz_s = "kurz_s", m = "m",}
	const enum GKurzovyListekFragments { kurz_s = "*", m = "*",}
	const enum GKurzovyListekTypes { kurz_s = "JsonDecimal", m = "JsonDecimal",}
	const enum GKurzovyListekTypeLengths {}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu subjektů dokladů SML
	*     
	*/
	const enum GSubjektDokladuSmlFilter {
		/**PID dokladu SML*/
		ixp,
		/**PID nadřazeného dokladu SML*/
		ixp_sml_pri,
		/**aktivita*/
		aktivita,
	}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu rezervací dokladů SML
	*     
	*/
	const enum GRezervaceDokladuSmlFilter {
		/**agenda*/
		agenda,
		/**PID dokladu SML*/
		ixp_sml_pri,
		/**kategorie smlouvy*/
		ktg_sml,
		ixp,
	}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu pohledávek dokladů SML
	*     
	*/
	const enum GPohledavkyDokladuSmlFilter {
		/**PID dokladu SML*/
		ixp,
		/**žádosti o založení pohledávky*/
		zadosti,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Controls\Gordic.Sml.Interface.IGSmlEsuVerZak.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Subjekty k veřejné zakázce
	* @domain Smlouvy
	*/
	interface SmlEsuVerZak {
		/**Načtení seznamu pro výběr subjektů k veřejné zakázce*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlEsuVerZakDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlEsuVerZak: ServiceBase & Catalog.SmlEsuVerZak;
	}
	const SmlEsuVerZak: Client["SmlEsuVerZak"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro seznam výběru subjektu k veřejné zakázce*/
	const enum GSmlEsuVerZakFilter {
		/**Identifikátor dokladu (pro logování GDPR)*/
		ixp,
		/**Identifikátor VZ, DT*/
		ixs_pri,
		/**Typ blokační agendy*/
		typ_ag_blok,
		/**Číslo veřejné zakázky, dotačního titulu*/
		ac_ver_zak,
		ixs_esu,
		ixp_nab,
		por_cis_nab,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Inerface.GSmlDetailRozpisDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Detail dokladu pro rozpis*/
	interface GSmlDetailRozpisDto {
		/**ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlspid.cislo_dod*/
		cislo_dod?: number|null;
		/**DBCOLUMN:smlspid.ktg_typ*/
		ktg_typ?: number|null;
		/**ktg_sml*/
		ktg_sml?: number|null;
	}
	const enum GSmlDetailRozpisDtoNames { ixp = "ixp", cislo_dod = "cislo_dod", ktg_typ = "ktg_typ", ktg_sml = "ktg_sml",}
	const enum GSmlDetailRozpisDtoFragments { ixp = "*", cislo_dod = "*", ktg_typ = "*", ktg_sml = "*",}
	const enum GSmlDetailRozpisDtoTypes { ixp = "string", cislo_dod = "number", ktg_typ = "number", ktg_sml = "number",}
	const enum GSmlDetailRozpisDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDaneDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**struktura pro záložku daně*/
	interface GDaneDto {
		disabled?: boolean|null;
		/**název*/
		label?: string|null;
		/**základ*/
		zaklad?: JsonDecimal|null;
		/**daň*/
		dan?: JsonDecimal|null;
		/**celkem*/
		celkem?: JsonDecimal|null;
	}
	const enum GDaneDtoNames { disabled = "disabled", label = "label", zaklad = "zaklad", dan = "dan", celkem = "celkem",}
	const enum GDaneDtoFragments { disabled = "*", label = "*", zaklad = "*", dan = "*", celkem = "*",}
	const enum GDaneDtoTypes { disabled = "boolean", label = "string", zaklad = "JsonDecimal", dan = "JsonDecimal", celkem = "JsonDecimal",}
	const enum GDaneDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDdpsiabDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**údaje o žádostech na založení pohledávky*/
	interface GDdpsiabDto {
		/**ixp*/
		ixp?: string|null;
		/**ddp_ctvrt*/
		ddp_ctvrt?: number|null;
		/**ddp_radek*/
		ddp_radek?: number|null;
		/**vs*/
		vs?: string|null;
		/**ss*/
		ss?: string|null;
		/**typ_phl_txt*/
		typ_phl_txt?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**por_cislo*/
		por_cislo?: number|null;
		/**typ_poz_txt*/
		typ_poz_txt?: string|null;
		/**stav_dok_txt*/
		stav_dok_txt?: string|null;
	}
	const enum GDdpsiabDtoNames { ixp = "ixp", ddp_ctvrt = "ddp_ctvrt", ddp_radek = "ddp_radek", vs = "vs", ss = "ss", typ_phl_txt = "typ_phl_txt", esu_txt = "esu_txt", por_cislo = "por_cislo", typ_poz_txt = "typ_poz_txt", stav_dok_txt = "stav_dok_txt",}
	const enum GDdpsiabDtoFragments { ixp = "*", ddp_ctvrt = "*", ddp_radek = "*", vs = "*", ss = "*", typ_phl_txt = "*", esu_txt = "*", por_cislo = "*", typ_poz_txt = "*", stav_dok_txt = "*",}
	const enum GDdpsiabDtoTypes { ixp = "string", ddp_ctvrt = "number", ddp_radek = "number", vs = "string", ss = "string", typ_phl_txt = "string", esu_txt = "string", por_cislo = "number", typ_poz_txt = "string", stav_dok_txt = "string",}
	const enum GDdpsiabDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDdpspidDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**údaje o navázaných pohledávkách*/
	interface GDdpspidDto {
		/**ixp*/
		ixp?: string|null;
		/**vs*/
		vs?: string|null;
		/**ss*/
		ss?: string|null;
		/**typ_phl*/
		typ_phl?: string|null;
		/**ddp_ctvrt*/
		ddp_ctvrt?: number|null;
		/**ddp_radek*/
		ddp_radek?: number|null;
		/**typ_phl_txt*/
		typ_phl_txt?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**ddp_radek_txt*/
		ddp_radek_txt?: string|null;
		/**ddp_ctvrt_txt*/
		ddp_ctvrt_txt?: string|null;
	}
	const enum GDdpspidDtoNames { ixp = "ixp", vs = "vs", ss = "ss", typ_phl = "typ_phl", ddp_ctvrt = "ddp_ctvrt", ddp_radek = "ddp_radek", typ_phl_txt = "typ_phl_txt", esu_txt = "esu_txt", ddp_radek_txt = "ddp_radek_txt", ddp_ctvrt_txt = "ddp_ctvrt_txt",}
	const enum GDdpspidDtoFragments { ixp = "*", vs = "*", ss = "*", typ_phl = "*", ddp_ctvrt = "*", ddp_radek = "*", typ_phl_txt = "*", esu_txt = "*", ddp_radek_txt = "*", ddp_ctvrt_txt = "*",}
	const enum GDdpspidDtoTypes { ixp = "string", vs = "string", ss = "string", typ_phl = "string", ddp_ctvrt = "number", ddp_radek = "number", typ_phl_txt = "string", esu_txt = "string", ddp_radek_txt = "string", ddp_ctvrt_txt = "string",}
	const enum GDdpspidDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDetailListDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Seznam Dto pro detail*/
	interface GDetailListDto {
		/**ZaznamSmlDetail - smlpid*/
		ZaznamSmlDetail: Gordic.Sml.Interface.GSmlDetailOldDto;
		/**Obecné údaje o detailu*/
		ZaznamSmlDetailCommon: Gordic.Sml.Interface.GSmlDetailCommonDto;
		/**ZaznamSankce*/
		ZaznamSankce: Gordic.Sml.Interface.GSmlSankceDto;
		/**ZaznamFinDocSmlDetail - findoc*/
		ZaznamFinDocSmlDetail: Gordic.Sml.Interface.GSmlFinXxxDto;
		/**ZaznamFinDocSmlBlk - findoc*/
		ZaznamFinDocSmlBlk: Gordic.Sml.Interface.GSmlBlkDto;
		/**ZaznamWflspid*/
		ZaznamWflspid: Gordic.Wfl.Interface.GWflspidDto;
		/**ZaznamWflsixp*/
		ZaznamWflsixp: Gordic.Sml.Interface.GWflsixpDto;
		/**ZaznamWflPristupInfo*/
		ZaznamWflPristupInfo: Gordic.Wfl.Interface.GWflPristupInfo;
		/**ZaznamSmlsden*/
		ZaznamSmlsden: Gordic.Sml.Interface.GSmlsdenDto;
		/**ZaznamFinPripadSmlDetail - finpripad*/
		ZaznamFinPripadSmlDetail: Gordic.Sml.Interface.GSmlFinXxxDto;
		/**ZaznamFinDocSmlBlk - finpripad*/
		ZaznamFinPripadSmlBlk: Gordic.Sml.Interface.GSmlBlkDto;
		/**ZaznamFinPripadSmlsrok - finpripad*/
		ZaznamFinPripadSmlsrok: Gordic.Sml.Interface.GSmlsrokDto;
		/**ZaznamFinDocSmlsrok - findoc*/
		ZaznamFinDocSmlsrok: Gordic.Sml.Interface.GSmlsrokDto;
		/**ZaznamFinDocCommon*/
		ZaznamFinDocCommon: Gordic.Sml.Interface.GSmlFinCommonDto;
		/**ZaznamFinPripadCommon*/
		ZaznamFinPripadCommon: Gordic.Sml.Interface.GSmlFinCommonDto;
		/**ZaznamFK - finanční kontrola*/
		ZaznamFK: Gordic.Sml.Interface.GWflvdfkSmlDto;
		/**Záznam informací o rezervacích v iissp*/
		ZaznamIissp: Gordic.Sml.Interface.GSmlIisspDto;
		/**Záznam informací o zveřejnění*/
		ZaznamIisspPublic: Gordic.Sml.Interface.GSmlIisspDto;
		/**nápočet limitů realizátorů/rok	nápočet limitů realizátorů/rok*/
		ZaznamLimitRealRok: Gordic.Sml.Interface.GSmlsrokDto;
		/**obecné instance wflpid*/
		ZaznamWflspidCommon: Gordic.Sml.Interface.GSmlWflspidCommonDto;
		/**zatím nevím, k čemu to je*/
		ZaznamWflTop: Gordic.Sml.Interface.GSmlWflTopDto;
	}
	const enum GDetailListDtoNames { ZaznamSmlDetail = "ZaznamSmlDetail", ZaznamSmlDetailCommon = "ZaznamSmlDetailCommon", ZaznamSankce = "ZaznamSankce", ZaznamFinDocSmlDetail = "ZaznamFinDocSmlDetail", ZaznamFinDocSmlBlk = "ZaznamFinDocSmlBlk", ZaznamWflspid = "ZaznamWflspid", ZaznamWflsixp = "ZaznamWflsixp", ZaznamWflPristupInfo = "ZaznamWflPristupInfo", ZaznamSmlsden = "ZaznamSmlsden", ZaznamFinPripadSmlDetail = "ZaznamFinPripadSmlDetail", ZaznamFinPripadSmlBlk = "ZaznamFinPripadSmlBlk", ZaznamFinPripadSmlsrok = "ZaznamFinPripadSmlsrok", ZaznamFinDocSmlsrok = "ZaznamFinDocSmlsrok", ZaznamFinDocCommon = "ZaznamFinDocCommon", ZaznamFinPripadCommon = "ZaznamFinPripadCommon", ZaznamFK = "ZaznamFK", ZaznamIissp = "ZaznamIissp", ZaznamIisspPublic = "ZaznamIisspPublic", ZaznamLimitRealRok = "ZaznamLimitRealRok", ZaznamWflspidCommon = "ZaznamWflspidCommon", ZaznamWflTop = "ZaznamWflTop",}
	const enum GDetailListDtoFragments { ZaznamSmlDetail = "*", ZaznamSmlDetailCommon = "*", ZaznamSankce = "*", ZaznamFinDocSmlDetail = "*", ZaznamFinDocSmlBlk = "*", ZaznamWflspid = "*", ZaznamWflsixp = "*", ZaznamWflPristupInfo = "*", ZaznamSmlsden = "*", ZaznamFinPripadSmlDetail = "*", ZaznamFinPripadSmlBlk = "*", ZaznamFinPripadSmlsrok = "*", ZaznamFinDocSmlsrok = "*", ZaznamFinDocCommon = "*", ZaznamFinPripadCommon = "*", ZaznamFK = "*", ZaznamIissp = "*", ZaznamIisspPublic = "*", ZaznamLimitRealRok = "*", ZaznamWflspidCommon = "*", ZaznamWflTop = "*",}
	const enum GDetailListDtoTypes { ZaznamSmlDetail = "Gordic.Sml.Interface.GSmlDetailOldDto", ZaznamSmlDetailCommon = "Gordic.Sml.Interface.GSmlDetailCommonDto", ZaznamSankce = "Gordic.Sml.Interface.GSmlSankceDto", ZaznamFinDocSmlDetail = "Gordic.Sml.Interface.GSmlFinXxxDto", ZaznamFinDocSmlBlk = "Gordic.Sml.Interface.GSmlBlkDto", ZaznamWflspid = "Gordic.Wfl.Interface.GWflspidDto", ZaznamWflsixp = "Gordic.Sml.Interface.GWflsixpDto", ZaznamWflPristupInfo = "Gordic.Wfl.Interface.GWflPristupInfo", ZaznamSmlsden = "Gordic.Sml.Interface.GSmlsdenDto", ZaznamFinPripadSmlDetail = "Gordic.Sml.Interface.GSmlFinXxxDto", ZaznamFinPripadSmlBlk = "Gordic.Sml.Interface.GSmlBlkDto", ZaznamFinPripadSmlsrok = "Gordic.Sml.Interface.GSmlsrokDto", ZaznamFinDocSmlsrok = "Gordic.Sml.Interface.GSmlsrokDto", ZaznamFinDocCommon = "Gordic.Sml.Interface.GSmlFinCommonDto", ZaznamFinPripadCommon = "Gordic.Sml.Interface.GSmlFinCommonDto", ZaznamFK = "Gordic.Sml.Interface.GWflvdfkSmlDto", ZaznamIissp = "Gordic.Sml.Interface.GSmlIisspDto", ZaznamIisspPublic = "Gordic.Sml.Interface.GSmlIisspDto", ZaznamLimitRealRok = "Gordic.Sml.Interface.GSmlsrokDto", ZaznamWflspidCommon = "Gordic.Sml.Interface.GSmlWflspidCommonDto", ZaznamWflTop = "Gordic.Sml.Interface.GSmlWflTopDto",}
	const enum GDetailListDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDokladSmlDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Doklad SML*/
	interface GDokladSmlDto extends Gordic.Sml.Interface.GSmlSeznamWflDto {
		/**PID dokladu SML*/
		ixp?: string|null;
		/**licence*/
		lic?: string|null;
		/**datum podání*/
		dat_prij_pod?: JsonDate|null;
		/**deník*/
		ixp_den?: string|null;
		/**subřada*/
		subrada?: number|null;
		/**externí subjekt*/
		ixs_esu?: string|null;
		/**číslo smlouvy externího subjektu*/
		ac_esu?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**jméno soutěže ke smlouvě*/
		soutez?: string|null;
		/**kód banky k cizímu účtu*/
		sk_ci?: string|null;
		/**cizí bankovní účet*/
		bu_ci?: string|null;
		/**evidenční číslo*/
		ac?: string|null;
		/**agendové číslo*/
		ac_sml?: string|null;
		/**cena za dodatky*/
		c_dod?: JsonDecimal|null;
		/**kategorie typu smlouvy*/
		ktg_typ?: number|null;
		/**aktivita*/
		eko_akt?: number|null;
		/**platnost (doba určitá, neurčitá, ...)*/
		typ_platnost?: number|null;
		/**související dokument 1*/
		ac_dok_1?: string|null;
		/**související dokument 2*/
		ac_dok_2?: string|null;
		/**účinnost smlouvy - datum nebo text  doručením, ...*/
		ucinnost?: string|null;
		/**ORJ vázané ke smlouvě - pro jaké ORJ je určena*/
		ixs_orj?: string|null;
		/**kurs střed z kursovního lístku*/
		kurz_s?: JsonDecimal|null;
		/**stav položek smlouvy*/
		up_stav?: number|null;
		/**počet pseudo dodatků smlouvy - odsouzeno k zániku*/
		num_dod_old?: number|null;
		/**ixs_orj kompetenta*/
		ixs_orj_komp?: string|null;
		/**předpona ac_sml*/
		rcp_prefix?: string|null;
		/**přípona ac_sml*/
		rcp_suffix?: string|null;
		/**identifikace vázané smlouvy k objednávce; Rámcové smlouvy k prováděcí smlouvě*/
		ixp_sml?: string|null;
		/**identifikátor případu; v případě mateřského dokladu prozatím platí ixp = ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**evidenční číslo vázaného dokladu*/
		ac_nad?: string|null;
		/**agendové číslo vázaného dokladu*/
		ac_sml_nad?: string|null;
		/**kategorie nadřazeného dokladu*/
		ktg_typ_nad?: number|null;
		/**kategorie nadřazeného dokladu (vždy přímého nadřazeného dokladu)*/
		ktg_typ_nad_pr?: number|null;
		/**kniha nadřazeného dokladu (vždy přímého nadřazeného dokladu)*/
		ixp_den_nad_pr?: string|null;
		/**typ dokladu nadřazeného dokladu*/
		ixs_typ_nad?: string|null;
		/**čítač počtu navázaných objednávek na smlouvu (SML - pokud je > 0, pak na smlouvu jsou vázány obj; OBJ - pokud je -1, pak obj již provedla inkrement čítače na smlouvě*/
		num_obj?: number|null;
		/**hodnota kurzu v případě typu = pevný smluvní, pevný systémový*/
		kurz?: JsonDecimal|null;
		/**množství měny v kursovním lístku*/
		m?: JsonDecimal|null;
		/**typ kurz*/
		typ_kurz?: number|null;
		/**příznak přečtení dokladu*/
		priz_view?: number|null;
		/**identifikátor žádosti o založení dokladu*/
		ixp_ext?: string|null;
		/**důvod storna dokladu*/
		storno_duvod?: string|null;
		/**zastupující osoba vlastní strany*/
		ixs_ref_zast?: string|null;
		/**zastupující osoba druhé strany*/
		ixs_esu_zast?: string|null;
		/**zastupující osoba druhé strany*/
		lic_zast_esu?: string|null;
		/**zastupující osoba druhé strany*/
		por_zast_esu?: number|null;
		/**datum souvisejícího dokladu 1*/
		dat_dok_1?: JsonDate|null;
		/**datum souvisejícího dokladu 2*/
		dat_dok_2?: JsonDate|null;
		/**způsob ukončení*/
		ixs_zuk?: string|null;
		/**kategorie ukončení*/
		ktg_zuk?: number|null;
		/**datum ukončení*/
		dat_uko?: JsonDate|null;
		/**popis vlastní org*/
		isu_txt?: string|null;
		/**datum odeslání*/
		dat_odes?: JsonDate|null;
		/**stav doručení*/
		s_dor?: number|null;
		/**textově stav doručení*/
		text_odes?: string|null;
		/**čítač počtu navázaných dodatků na smlouvu: SML - pokud je > 0, pak na smlouvu jsou vázány dod; DOD - pokud je -1,pak dodatek již provedl inkrement čítače na smlouvě*/
		num_dod?: number|null;
		/**způsob definice ceny - absolutní či inkrementální*/
		zp_def_ceny?: number|null;
		/**číslo dodatku vázaného na smlouvu. Na smlouvě nabývá hodnoty 0, na dodatku kladných*/
		cislo_dod?: number|null;
		/**datum podpisu vlastní stranou*/
		dat_sgn?: JsonDate|null;
		/**datum podpisu protistranou*/
		dat_sgn_ext?: JsonDate|null;
		/**ixp_sml_nad - určeno pro obsluhu dodatku objednávky*/
		ixp_sml_nad?: string|null;
		/**ixp_nad - určeno pro obsluhu dodatku objednávky*/
		ixp_nad?: string|null;
		/**příznak, že se jedná o dodatek objednávky*/
		dod_obj?: number|null;
		/**id případu BLK nadřazeného dokladu*/
		ixs_pri_nad?: string|null;
		/**aktuální funkce (vlastník)*/
		ixs_fun_akt?: string|null;
		/**typ dokladu*/
		typ_dok?: number|null;
		/**režim dokladu*/
		mode_dok?: number|null;
		/**IČO*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**kategorie smlouvy*/
		ktg_sml?: number|null;
		/**stav dokladu/případu*/
		sml_stav?: number|null;
		/**popis*/
		popis?: string|null;
		/**typ smlouvy*/
		ixs_typ?: string|null;
		/**přesný název smlouvy*/
		nazev?: string|null;
		/**celková částka financování v měně dokladu*/
		c_mena?: JsonDecimal|null;
		/**celková smluvní cena v měně*/
		c_mena_doc?: JsonDecimal|null;
		/**cena bez DPH*/
		c_mena_doc_bez_dph?: JsonDecimal|null;
		/**DPH*/
		c_mena_doc_dph?: JsonDecimal|null;
		/**cena s DPH*/
		c_mena_doc_s_dph?: JsonDecimal|null;
		/**celkový rozpis částky na roky v CZK*/
		c?: JsonDecimal|null;
		/**celkový součet částek položek FP v CZK*/
		c_pol?: JsonDecimal|null;
		/**měna*/
		mena?: number|null;
		/**datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**vyřizující referent*/
		ixs_fun_ref?: string|null;
		/**číslo realizátora*/
		cis_real?: string|null;
		/**financování od*/
		fin_od?: number|null;
		/**financování do*/
		fin_do?: number|null;
		/**stav podepsání nebo-li formalizace*/
		sgn_stav?: number|null;
		/**typ ceny (pevná, volná)*/
		typ_ceny?: number|null;
		/**rok uzavření smlouvy*/
		rok?: number|null;
		/**počet položek*/
		num_pol?: number|null;
		/**počet schválených položek*/
		num_pol_sch?: number|null;
		/**počet roků smlouvy*/
		num_rok?: number|null;
		/**celková částka rozpisu smlouvy na roky v dané měně*/
		c_mena_rok_sum?: JsonDecimal|null;
		/**maximální rok financování = zadaných položek*/
		max_rok_pol?: number|null;
		/**suma částky rozepsané platebním kalendářem*/
		c_kal?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu*/
		c_vz?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu*/
		c_obj?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu*/
		c_dod_bnd?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ*/
		c_sml?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu v dané měně*/
		c_obj_mena?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu v dané měně*/
		c_dod_bnd_mena?: JsonDecimal|null;
		/**suma smluv vázaných na rámcovou smlouvu*/
		c_smlrs_bnd?: JsonDecimal|null;
		/**suma smluv vázaných na rámcovou smlouvu v dané měně*/
		c_smlrs_bnd_mena?: JsonDecimal|null;
		/**počet vázaných smluv na RS*/
		num_smlrs_bnd?: number|null;
		/**počet navázaných dokladů*/
		num_nav_dok?: number|null;
		/**číslo veřejné zakázky, dotačního titulu*/
		ac_ver_zak?: string|null;
		/**příznak účtování o podmíněných závazcích/pohledávkách*/
		priz_pzp?: boolean|null;
		/**dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**typ pohledávky*/
		typ_phl?: string|null;
		/**variabilní symbol*/
		vs?: string|null;
		/**c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**číslo maximálního dodatku smlouvy*/
		cislo_dod_max?: number|null;
		/**datum rezervace rozpočtových prostředků v IISSP*/
		dat_rad_iissp?: JsonDate|null;
		/**příznak opce*/
		priz_opce?: number|null;
		/**vazba případu na případ blokační agendy*/
		ixs_pri?: string|null;
		/**vazba případu nabídku blokační agendy*/
		ixp_nab?: string|null;
		/**typ blokační agendy EVZ, VFP, EPO, RZA*/
		typ_ag_blok?: number|null;
		/**vazba na RZA*/
		por_cislo_nab?: number|null;
		/**počet položek financovaných z rozpočtových účtů*/
		fin_from_roz?: number|null;
		/**počet subjektů*/
		pocet_subjektu?: number|null;
		/**PID nadřazeného dokladu - zatím jen na test*/
		ixp_doklad_nad?: string|null;
		/**počet realizovaného zákonného zveřejnění*/
		pocet_zve?: number|null;
		/**počet označení jako nezveřejňovaný dokument u zákonného zveřejnění*/
		pocet_pla?: number|null;
		/**datum zveřejnění*/
		dat_zve?: JsonDate|null;
		/**plán zveřejnění*/
		plan_zve?: number|null;
		/**stav zveřejnění - vychází se z toho, že zákonný způsob zveřejnění může být pouze jeden*/
		stav_zpv?: number|null;
		/**stav zveřejnění textově*/
		stav_zpv_txt?: string|null;
		/**typ_pen*/
		typ_pen?: number|null;
		/**proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**zak_upr*/
		zak_upr?: number|null;
		/**typ_alg*/
		typ_alg?: number|null;
		/**priz_spo*/
		priz_spo?: boolean|null;
		/**priz_uroc*/
		priz_uroc?: boolean|null;
		/**typ_spo*/
		typ_spo?: number|null;
		/**c_spo*/
		c_spo?: JsonDecimal|null;
		/**proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**příznak pro řízení funkcí v sp - např stornování PFK*/
		typ_cmd?: number|null;
		/**datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**stav EKO schvalovacího procesu*/
		stav_eko_schval?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav řízeného schvalovacího procesu*/
		stav_rsp?: number|null;
		/**účetní kód*/
		ucetni_kod?: JsonDecimal|null;
		/**kategorie knihy (jen pro detail)*/
		ktg_den?: number|null;
		/**stav zpracování v agendě*/
		stav_sda?: number|null;
		/**název knihy*/
		ixp_den_txt?: string|null;
		/**název stavu*/
		sml_stav_txt?: string|null;
		/**zkratka stavu*/
		sml_stav_zkr?: string|null;
		/**název kategorie typu dokladu*/
		ktg_typ_txt?: string|null;
		/**název typu dokladu*/
		ixs_typ_txt?: string|null;
		/**název realizítora*/
		cis_real_txt?: string|null;
		/**název organizační jednotky*/
		ixs_orj_txt?: string|null;
		/**název typu ceny*/
		typ_ceny_txt?: string|null;
		/**název typu platnosti*/
		typ_platnost_txt?: string|null;
		/**zkratka měny*/
		mena_zkr?: string|null;
		/**zkratka příznaku opce*/
		priz_opce_zkr?: string|null;
		/**název typu platnosti*/
		ixs_zuk_txt?: string|null;
		/**název zástupce vlastní strany*/
		ixs_ref_zast_txt?: string|null;
		/**název zástupce protistrany*/
		ixs_esu_zast_txt?: string|null;
		/**upravený nazev do jednoho řádku (do seznamu)*/
		nazev_zkr?: string|null;
		/**jeden rok smluvního případu - aktuální účetní období*/
		smlrok?: Gordic.Sml.Interface.GCastkaSmlRokDto|null;
		/**navigační vlastnost pro případ (ixp_sml_pri)*/
		pripad?: Gordic.Sml.Interface.GPripadSmlDto|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_akt)*/
		vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_ref)*/
		referent?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**navigační vlastnost pro vlastníka (ixs_fun_vyriz)*/
		kompetent?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**přístup k dokumentu*/
		pristup?: Gordic.Wfl.Interface.GWflPristupInfo|null;
		/**navigační vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**navigační vlastnost pro subjekt (ixs_esu)*/
		subjekt?: Gordic.Sml.Interface.GExterniSubjektDto|null;
		/**navigační vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Imformace pro server, že uživatel byl informavám o dokladu PFK*/
		serverMessageDokladPfk?: boolean|null;
		/**Je doklad veden v jiné agendě?*/
		readonly JeVJineAgende?: boolean|null;
		/**Je doklad podaný?*/
		readonly JePodany?: boolean|null;
		/**Je doklad evidovaný?*/
		readonly JeEvidovany?: boolean|null;
		/**Je doklad schválený?*/
		readonly JeSchvaleny?: boolean|null;
		/**Je doklad podepsaný?*/
		readonly JePodepsany?: boolean|null;
		/**Je doklad ukončený?*/
		readonly JeUkonceny?: boolean|null;
		/**Je doklad stornovaný?*/
		readonly JeStornovany?: boolean|null;
		/**Je doklad/případ výdajový?*/
		readonly JeVydaj?: boolean|null;
		/**Je doklad/případ příjmový?*/
		readonly JePrijem?: boolean|null;
		/**Je doklad rámcovou smlouvou?*/
		readonly JeRamcovaSmlouva?: boolean|null;
		/**Je doklad smlouvou?*/
		readonly JeSmlouva?: boolean|null;
		/**Je doklad objednávkou?*/
		readonly JeObjednavka?: boolean|null;
		/**Je doklad dodatkem?*/
		readonly JeDodatek?: boolean|null;
		/**Má doklad dodatky?*/
		readonly MaDodatky?: boolean|null;
		/**Má doklad objednávky?*/
		readonly MaObjednavky?: boolean|null;
		/**Je doklad rozdílný od případu?*/
		readonly JePripad?: boolean|null;
		/**Je doklad s finančním profilem?*/
		readonly JeFinancniProfil?: boolean|null;
		/**Je nadřízený doklad s finančním profilem?*/
		readonly JeFinancniProfilNad?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Sml.Interface.GDokladSmlPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GDokladSmlDtoNames { ixp = "ixp", lic = "lic", dat_prij_pod = "dat_prij_pod", ixp_den = "ixp_den", subrada = "subrada", ixs_esu = "ixs_esu", ac_esu = "ac_esu", poznamka = "poznamka", soutez = "soutez", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", c_dod = "c_dod", ktg_typ = "ktg_typ", eko_akt = "eko_akt", typ_platnost = "typ_platnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", kurz_s = "kurz_s", up_stav = "up_stav", num_dod_old = "num_dod_old", ixs_orj_komp = "ixs_orj_komp", rcp_prefix = "rcp_prefix", rcp_suffix = "rcp_suffix", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ktg_typ_nad = "ktg_typ_nad", ktg_typ_nad_pr = "ktg_typ_nad_pr", ixp_den_nad_pr = "ixp_den_nad_pr", ixs_typ_nad = "ixs_typ_nad", num_obj = "num_obj", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", priz_view = "priz_view", ixp_ext = "ixp_ext", storno_duvod = "storno_duvod", ixs_ref_zast = "ixs_ref_zast", ixs_esu_zast = "ixs_esu_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", isu_txt = "isu_txt", dat_odes = "dat_odes", s_dor = "s_dor", text_odes = "text_odes", num_dod = "num_dod", zp_def_ceny = "zp_def_ceny", cislo_dod = "cislo_dod", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", ixp_sml_nad = "ixp_sml_nad", ixp_nad = "ixp_nad", dod_obj = "dod_obj", ixs_pri_nad = "ixs_pri_nad", ixs_fun_akt = "ixs_fun_akt", typ_dok = "typ_dok", mode_dok = "mode_dok", ico = "ico", ucs = "ucs", nks = "nks", ktg_sml = "ktg_sml", sml_stav = "sml_stav", popis = "popis", ixs_typ = "ixs_typ", nazev = "nazev", c_mena = "c_mena", c_mena_doc = "c_mena_doc", c_mena_doc_bez_dph = "c_mena_doc_bez_dph", c_mena_doc_dph = "c_mena_doc_dph", c_mena_doc_s_dph = "c_mena_doc_s_dph", c = "c", c_pol = "c_pol", mena = "mena", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", rok = "rok", num_pol = "num_pol", num_pol_sch = "num_pol_sch", num_rok = "num_rok", c_mena_rok_sum = "c_mena_rok_sum", max_rok_pol = "max_rok_pol", c_kal = "c_kal", c_vz = "c_vz", c_obj = "c_obj", c_dod_bnd = "c_dod_bnd", c_sml = "c_sml", c_obj_mena = "c_obj_mena", c_dod_bnd_mena = "c_dod_bnd_mena", c_smlrs_bnd = "c_smlrs_bnd", c_smlrs_bnd_mena = "c_smlrs_bnd_mena", num_smlrs_bnd = "num_smlrs_bnd", num_nav_dok = "num_nav_dok", ac_ver_zak = "ac_ver_zak", priz_pzp = "priz_pzp", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", cislo_dod_max = "cislo_dod_max", dat_rad_iissp = "dat_rad_iissp", priz_opce = "priz_opce", ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", typ_ag_blok = "typ_ag_blok", por_cislo_nab = "por_cislo_nab", fin_from_roz = "fin_from_roz", pocet_subjektu = "pocet_subjektu", ixp_doklad_nad = "ixp_doklad_nad", pocet_zve = "pocet_zve", pocet_pla = "pocet_pla", dat_zve = "dat_zve", plan_zve = "plan_zve", stav_zpv = "stav_zpv", stav_zpv_txt = "stav_zpv_txt", typ_pen = "typ_pen", proc_sazba_pen = "proc_sazba_pen", c_sazba_pen = "c_sazba_pen", zak_upr = "zak_upr", typ_alg = "typ_alg", priz_spo = "priz_spo", priz_uroc = "priz_uroc", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo", typ_cmd = "typ_cmd", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_eko_schval = "stav_eko_schval", stav_rsp = "stav_rsp", ucetni_kod = "ucetni_kod", ktg_den = "ktg_den", stav_sda = "stav_sda", ixp_den_txt = "ixp_den_txt", sml_stav_txt = "sml_stav_txt", sml_stav_zkr = "sml_stav_zkr", ktg_typ_txt = "ktg_typ_txt", ixs_typ_txt = "ixs_typ_txt", cis_real_txt = "cis_real_txt", ixs_orj_txt = "ixs_orj_txt", typ_ceny_txt = "typ_ceny_txt", typ_platnost_txt = "typ_platnost_txt", mena_zkr = "mena_zkr", priz_opce_zkr = "priz_opce_zkr", ixs_zuk_txt = "ixs_zuk_txt", ixs_ref_zast_txt = "ixs_ref_zast_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", nazev_zkr = "nazev_zkr", smlrok = "smlrok", pripad = "pripad", vlastnik = "vlastnik", referent = "referent", kompetent = "kompetent", pristup = "pristup", dokument = "dokument", subjekt = "subjekt", vlastnosti = "vlastnosti", serverMessageDokladPfk = "serverMessageDokladPfk", JeVJineAgende = "JeVJineAgende", JePodany = "JePodany", JeEvidovany = "JeEvidovany", JeSchvaleny = "JeSchvaleny", JePodepsany = "JePodepsany", JeUkonceny = "JeUkonceny", JeStornovany = "JeStornovany", JeVydaj = "JeVydaj", JePrijem = "JePrijem", JeRamcovaSmlouva = "JeRamcovaSmlouva", JeSmlouva = "JeSmlouva", JeObjednavka = "JeObjednavka", JeDodatek = "JeDodatek", MaDodatky = "MaDodatky", MaObjednavky = "MaObjednavky", JePripad = "JePripad", JeFinancniProfil = "JeFinancniProfil", JeFinancniProfilNad = "JeFinancniProfilNad", Permissions = "Permissions", PrimaryKey = "PrimaryKey", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GDokladSmlDtoFragments { ixp = "Base", lic = "Base", dat_prij_pod = "Base", ixp_den = "Base", subrada = "Base", ixs_esu = "Base", ac_esu = "Base", poznamka = "Base", soutez = "Base", sk_ci = "Base", bu_ci = "Base", ac = "Base", ac_sml = "Base", c_dod = "Base", ktg_typ = "Base", eko_akt = "Base", typ_platnost = "Base", ac_dok_1 = "Base", ac_dok_2 = "Base", ucinnost = "Base", ixs_orj = "Base", kurz_s = "main2", up_stav = "main2", num_dod_old = "main2", ixs_orj_komp = "main2", rcp_prefix = "main2", rcp_suffix = "main2", ixp_sml = "Base", ixp_sml_pri = "Base", ac_nad = "Base", ac_sml_nad = "Base", ktg_typ_nad = "Base", ktg_typ_nad_pr = "Base", ixp_den_nad_pr = "Base", ixs_typ_nad = "Base", num_obj = "Base", kurz = "Base", m = "Base", typ_kurz = "Base", priz_view = "Base", ixp_ext = "main2", storno_duvod = "main2", ixs_ref_zast = "Base", ixs_esu_zast = "Base", lic_zast_esu = "Base", por_zast_esu = "Base", dat_dok_1 = "Base", dat_dok_2 = "Base", ixs_zuk = "Base", ktg_zuk = "Base", dat_uko = "Base", isu_txt = "isu", dat_odes = "main2", s_dor = "main2", text_odes = "main2", num_dod = "Base", zp_def_ceny = "Base", cislo_dod = "Base", dat_sgn = "Base", dat_sgn_ext = "Base", ixp_sml_nad = "main2", ixp_nad = "main2", dod_obj = "main2", ixs_pri_nad = "Base", ixs_fun_akt = "Base", typ_dok = "Base", mode_dok = "Base", ico = "Base", ucs = "Base", nks = "Base", ktg_sml = "Base", sml_stav = "Base", popis = "Base", ixs_typ = "Base", nazev = "Base", c_mena = "Base", c_mena_doc = "Base", c_mena_doc_bez_dph = "c_bez_dph", c_mena_doc_dph = "c_dph", c_mena_doc_s_dph = "c_s_dph", c = "Base", c_pol = "Base", mena = "Base", dat_uzavreni = "Base", dat_platnost = "Base", dat_ucinnost = "Base", ixs_fun_vyriz = "Base", ixs_fun_ref = "Base", cis_real = "Base", fin_od = "Base", fin_do = "Base", sgn_stav = "Base", typ_ceny = "Base", rok = "Base", num_pol = "Base", num_pol_sch = "Base", num_rok = "num_rok", c_mena_rok_sum = "c_mena_rok_sum", max_rok_pol = "max_rok_pol", c_kal = "main2", c_vz = "main2", c_obj = "main2", c_dod_bnd = "main2", c_sml = "main2", c_obj_mena = "main2", c_dod_bnd_mena = "main2", c_smlrs_bnd = "info_rs", c_smlrs_bnd_mena = "info_rs", num_smlrs_bnd = "info_rs", num_nav_dok = "num_nav_dok", ac_ver_zak = "Base", priz_pzp = "Base", dat_dph_od = "Base", dat_dph_do = "Base", c_mena_z_osv = "Base", c_mena_z_bd = "Base", c_mena_z_ss = "Base", c_mena_z_ns = "Base", c_mena_dph_ss = "Base", c_mena_dph_ns = "Base", c_c_mena_ss = "Base", c_c_mena_ns = "Base", c_c_mena_okr = "Base", typ_phl = "Base", vs = "Base", c_mena_dph_3s = "Base", c_mena_dph_4s = "Base", c_mena_z_3s = "Base", c_mena_z_4s = "Base", c_c_mena_3s = "Base", c_c_mena_4s = "Base", cislo_dod_max = "cislo_dod_max", dat_rad_iissp = "Base", priz_opce = "Base", ixs_pri = "Base", ixp_nab = "Base", typ_ag_blok = "Base", por_cislo_nab = "Base", fin_from_roz = "main2", pocet_subjektu = "pocet_subjektu", ixp_doklad_nad = "Base", pocet_zve = "public", pocet_pla = "public", dat_zve = "public", plan_zve = "public", stav_zpv = "public", stav_zpv_txt = "public", typ_pen = "Base", proc_sazba_pen = "Base", c_sazba_pen = "Base", zak_upr = "Base", typ_alg = "main2", priz_spo = "Base", priz_uroc = "Base", typ_spo = "Base", c_spo = "Base", proc_spo = "Base", typ_cmd = "main2", dat_zmena = "Base", zmenu_prov = "Base", stav_eko_schval = "EKO_SCHVAL", stav_rsp = "WFL_RSP", ucetni_kod = "ucetni_kod", ktg_den = "ktg_den", stav_sda = "stav_sda", ixp_den_txt = "kniha", sml_stav_txt = "stav", sml_stav_zkr = "stav", ktg_typ_txt = "kategorie_dokladu", ixs_typ_txt = "typ_dokladu", cis_real_txt = "realizator", ixs_orj_txt = "organizacni_jednotka", typ_ceny_txt = "typ_ceny", typ_platnost_txt = "typ_platnost", mena_zkr = "mena", priz_opce_zkr = "priz_opce", ixs_zuk_txt = "zpusob_ukonceni", ixs_ref_zast_txt = "zastupce_vl_strany", ixs_esu_zast_txt = "zastupce_protistrany", nazev_zkr = "Base", smlrok = "smlrok", pripad = "pripad", vlastnik = "vlastnik", referent = "referent", kompetent = "kompetent", pristup = "pristup", dokument = "dokument", subjekt = "subjekt", vlastnosti = "vlastnosti", serverMessageDokladPfk = "*", JeVJineAgende = "*", JePodany = "*", JeEvidovany = "*", JeSchvaleny = "*", JePodepsany = "*", JeUkonceny = "*", JeStornovany = "*", JeVydaj = "*", JePrijem = "*", JeRamcovaSmlouva = "*", JeSmlouva = "*", JeObjednavka = "*", JeDodatek = "*", MaDodatky = "*", MaObjednavky = "*", JePripad = "*", JeFinancniProfil = "*", JeFinancniProfilNad = "*", Permissions = "Permissions", PrimaryKey = "*", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", PrimaryKeyInFilters = "*",}
	const enum GDokladSmlDtoTypes { ixp = "string", lic = "string", dat_prij_pod = "JsonDate", ixp_den = "string", subrada = "number", ixs_esu = "string", ac_esu = "string", poznamka = "string", soutez = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", c_dod = "JsonDecimal", ktg_typ = "number", eko_akt = "number", typ_platnost = "number", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", kurz_s = "JsonDecimal", up_stav = "number", num_dod_old = "number", ixs_orj_komp = "string", rcp_prefix = "string", rcp_suffix = "string", ixp_sml = "string", ixp_sml_pri = "string", ac_nad = "string", ac_sml_nad = "string", ktg_typ_nad = "number", ktg_typ_nad_pr = "number", ixp_den_nad_pr = "string", ixs_typ_nad = "string", num_obj = "number", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", priz_view = "number", ixp_ext = "string", storno_duvod = "string", ixs_ref_zast = "string", ixs_esu_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", isu_txt = "string", dat_odes = "JsonDate", s_dor = "number", text_odes = "string", num_dod = "number", zp_def_ceny = "number", cislo_dod = "number", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", ixp_sml_nad = "string", ixp_nad = "string", dod_obj = "number", ixs_pri_nad = "string", ixs_fun_akt = "string", typ_dok = "number", mode_dok = "number", ico = "string", ucs = "string", nks = "string", ktg_sml = "number", sml_stav = "number", popis = "string", ixs_typ = "string", nazev = "string", c_mena = "JsonDecimal", c_mena_doc = "JsonDecimal", c_mena_doc_bez_dph = "JsonDecimal", c_mena_doc_dph = "JsonDecimal", c_mena_doc_s_dph = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", mena = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", rok = "number", num_pol = "number", num_pol_sch = "number", num_rok = "number", c_mena_rok_sum = "JsonDecimal", max_rok_pol = "number", c_kal = "JsonDecimal", c_vz = "JsonDecimal", c_obj = "JsonDecimal", c_dod_bnd = "JsonDecimal", c_sml = "JsonDecimal", c_obj_mena = "JsonDecimal", c_dod_bnd_mena = "JsonDecimal", c_smlrs_bnd = "JsonDecimal", c_smlrs_bnd_mena = "JsonDecimal", num_smlrs_bnd = "number", num_nav_dok = "number", ac_ver_zak = "string", priz_pzp = "boolean", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", cislo_dod_max = "number", dat_rad_iissp = "JsonDate", priz_opce = "number", ixs_pri = "string", ixp_nab = "string", typ_ag_blok = "number", por_cislo_nab = "number", fin_from_roz = "number", pocet_subjektu = "number", ixp_doklad_nad = "string", pocet_zve = "number", pocet_pla = "number", dat_zve = "JsonDate", plan_zve = "number", stav_zpv = "number", stav_zpv_txt = "string", typ_pen = "number", proc_sazba_pen = "JsonDecimal", c_sazba_pen = "JsonDecimal", zak_upr = "number", typ_alg = "number", priz_spo = "boolean", priz_uroc = "boolean", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal", typ_cmd = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_eko_schval = "Gordic.Wfl.Interface.GWflvdfkDto", stav_rsp = "number", ucetni_kod = "JsonDecimal", ktg_den = "number", stav_sda = "number", ixp_den_txt = "string", sml_stav_txt = "string", sml_stav_zkr = "string", ktg_typ_txt = "string", ixs_typ_txt = "string", cis_real_txt = "string", ixs_orj_txt = "string", typ_ceny_txt = "string", typ_platnost_txt = "string", mena_zkr = "string", priz_opce_zkr = "string", ixs_zuk_txt = "string", ixs_ref_zast_txt = "string", ixs_esu_zast_txt = "string", nazev_zkr = "string", smlrok = "Gordic.Sml.Interface.GCastkaSmlRokDto", pripad = "Gordic.Sml.Interface.GPripadSmlDto", vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", referent = "Gordic.Gin.Interface.GFunkcniMistoDto", kompetent = "Gordic.Gin.Interface.GFunkcniMistoDto", pristup = "Gordic.Wfl.Interface.GWflPristupInfo", dokument = "Gordic.Ssl.Interface.GDokumentDto", subjekt = "Gordic.Sml.Interface.GExterniSubjektDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", serverMessageDokladPfk = "boolean", JeVJineAgende = "boolean", JePodany = "boolean", JeEvidovany = "boolean", JeSchvaleny = "boolean", JePodepsany = "boolean", JeUkonceny = "boolean", JeStornovany = "boolean", JeVydaj = "boolean", JePrijem = "boolean", JeRamcovaSmlouva = "boolean", JeSmlouva = "boolean", JeObjednavka = "boolean", JeDodatek = "boolean", MaDodatky = "boolean", MaObjednavky = "boolean", JePripad = "boolean", JeFinancniProfil = "boolean", JeFinancniProfilNad = "boolean", Permissions = "Gordic.Sml.Interface.GDokladSmlPermission", PrimaryKey = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", PrimaryKeyInFilters = "string",}
	const enum GDokladSmlDtoTypeLengths { ixp = 12, lic = 4, ixp_den = 12, ixs_esu = 12, ac_esu = 60, poznamka = 500, soutez = 30, sk_ci = 11, bu_ci = 34, ac = 30, ac_sml = 30, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12, ixs_orj_komp = 12, rcp_prefix = 20, rcp_suffix = 20, ixp_sml = 12, ixp_sml_pri = 12, ac_nad = 30, ac_sml_nad = 30, ixp_den_nad_pr = 12, ixs_typ_nad = 12, ixp_ext = 12, storno_duvod = 254, ixs_ref_zast = 12, ixs_esu_zast = 12, lic_zast_esu = 4, ixs_zuk = 12, isu_txt = 254, text_odes = 12, ixp_sml_nad = 12, ixp_nad = 12, ixs_pri_nad = 12, ixs_fun_akt = 12, ico = 10, ucs = 10, nks = 12, popis = 254, ixs_typ = 12, nazev = 4000, ixs_fun_vyriz = 12, ixs_fun_ref = 12, cis_real = 6, ac_ver_zak = 30, typ_phl = 4, vs = 12, ixs_pri = 12, ixp_nab = 12, ixp_doklad_nad = 12, stav_zpv_txt = 254, zmenu_prov = 12, ixp_den_txt = 50, typ_ceny_txt = 50, typ_platnost_txt = 50, ixs_zuk_txt = 50, ixs_ref_zast_txt = 100, ixs_esu_zast_txt = 100,}
	/**Subjektu dokladu SML*/
	interface GSubjektDokladuSmlDto {
		/**PID dokladu SML*/
		ixp?: string|null;
		/**identifikátor případu*/
		ixp_sml_pri?: string|null;
		/**externí subjekt*/
		ixs_esu?: string|null;
		/**typ subjektu*/
		typ_esu?: number|null;
		/**číslo smlouvy externího subjektu*/
		ac_esu?: string|null;
		/**kód banky k cizímu účtu*/
		sk_ci?: string|null;
		/**cizí bankovní účet*/
		bu_ci?: string|null;
		/**typ vazby*/
		typ_vazby?: number|null;
		/**id vazby*/
		ixs_dva?: string|null;
		/**zastupující osoba*/
		ixs_esu_zast?: string|null;
		/**licence zastupující osoby*/
		lic_zast_esu?: string|null;
		/**pořadí zastupované osoby*/
		por_zast_esu?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**název kategorie typu dokladu*/
		typ_vazby_txt?: string|null;
		/**název zastupující osoby*/
		ixs_esu_zast_txt?: string|null;
		/**název subjektu*/
		ixs_esu_txt?: string|null;
		/**IČO externího subjektu*/
		ico_esu?: string|null;
		/**RČ externího subjektu*/
		rc_esu?: string|null;
		/**agendové číslo dokladu*/
		ac_sml?: string|null;
		/**kategorie smlouvy*/
		ktg_sml?: number|null;
		/**původní subjekt (jen při změnách subjektu při volání serverových metod)*/
		ixs_esu_old?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Sml.Interface.GSubjektDokladuSmlPermission|null;
		/**Je to primární subjekt?*/
		readonly JePrimarni?: boolean|null;
		/**Je to dílčí dodavatel/odběratel?*/
		readonly JeDilci?: boolean|null;
	}
	const enum GSubjektDokladuSmlDtoNames { ixp = "ixp", ixp_sml_pri = "ixp_sml_pri", ixs_esu = "ixs_esu", typ_esu = "typ_esu", ac_esu = "ac_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", typ_vazby = "typ_vazby", ixs_dva = "ixs_dva", ixs_esu_zast = "ixs_esu_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", aktivita = "aktivita", typ_vazby_txt = "typ_vazby_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", ixs_esu_txt = "ixs_esu_txt", ico_esu = "ico_esu", rc_esu = "rc_esu", ac_sml = "ac_sml", ktg_sml = "ktg_sml", ixs_esu_old = "ixs_esu_old", Permissions = "Permissions", JePrimarni = "JePrimarni", JeDilci = "JeDilci",}
	const enum GSubjektDokladuSmlDtoFragments { ixp = "Base", ixp_sml_pri = "Base", ixs_esu = "Base", typ_esu = "Base", ac_esu = "Base", sk_ci = "Base", bu_ci = "Base", typ_vazby = "Base", ixs_dva = "Base", ixs_esu_zast = "Base", lic_zast_esu = "Base", por_zast_esu = "Base", aktivita = "Base", typ_vazby_txt = "typ_vazby", ixs_esu_zast_txt = "zastupce", ixs_esu_txt = "subjekt", ico_esu = "subjekt_ico", rc_esu = "subjekt_rc", ac_sml = "doklad", ktg_sml = "Base", ixs_esu_old = "Base", Permissions = "Permissions", JePrimarni = "*", JeDilci = "*",}
	const enum GSubjektDokladuSmlDtoTypes { ixp = "string", ixp_sml_pri = "string", ixs_esu = "string", typ_esu = "number", ac_esu = "string", sk_ci = "string", bu_ci = "string", typ_vazby = "number", ixs_dva = "string", ixs_esu_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", aktivita = "number", typ_vazby_txt = "string", ixs_esu_zast_txt = "string", ixs_esu_txt = "string", ico_esu = "string", rc_esu = "string", ac_sml = "string", ktg_sml = "number", ixs_esu_old = "string", Permissions = "Gordic.Sml.Interface.GSubjektDokladuSmlPermission", JePrimarni = "boolean", JeDilci = "boolean",}
	const enum GSubjektDokladuSmlDtoTypeLengths { ixp = 12, ixp_sml_pri = 12, ixs_esu = 12, ac_esu = 60, sk_ci = 11, bu_ci = 34, ixs_dva = 12, ixs_esu_zast = 12, lic_zast_esu = 4, ico_esu = 14, rc_esu = 10, ac_sml = 30, ixs_esu_old = 12,}
	/**Rezervace dokladů SML*/
	interface GRezervaceDokladuSmlDto {
		/**PID*/
		ixp?: string|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**Zkratka agendy*/
		zkr_ag?: string|null;
		/**S*/
		s?: string|null;
		/**Stav*/
		stav?: string|null;
		/**Rok*/
		rok_sml?: number|null;
		/**Číslo*/
		cislo_sml?: number|null;
		/**Evidenční číslo*/
		ac?: string|null;
		/**Agendové číslo*/
		ac_ag?: string|null;
		/**IČO*/
		ico_esu?: string|null;
		/**Název subjektu*/
		nazev_esu?: string|null;
		/**Číslo dodavatele*/
		ac_esu?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Datum evidence*/
		dat_evid?: JsonDate|null;
		/**Datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**Datum úhrady*/
		dat_uhr?: JsonDate|null;
		/**Datum účtování*/
		dat_zau?: JsonDate|null;
		/**Částka v CZK*/
		c_celkem?: JsonDecimal|null;
		/**Rezervováno*/
		c_rez?: JsonDecimal|null;
		/**Kontace*/
		kod_kon?: string|null;
		/**Řádek*/
		radek?: number|null;
		/**VS*/
		vs?: string|null;
		/**KS*/
		ks?: string|null;
		/**SS*/
		ss?: string|null;
		/**vlastní BÚ*/
		bu_vl?: string|null;
		/**směrový kód vlastního BÚ*/
		sk_vl?: string|null;
		/**pomocný sloupec pro složený bankovní účet vlastní*/
		bu_vl_txt?: string|null;
		/**cizí BÚ*/
		bu_ci?: string|null;
		/**směrový kód cizího BÚ*/
		sk_ci?: string|null;
		/**pomocný sloupec pro složený bankovní účet cizí*/
		bu_ci_txt?: string|null;
		/**Způsob platby*/
		zp_zkr?: string|null;
		/**Kniha*/
		ixp_den_txt?: string|null;
		/**Referent*/
		ixs_fun_akt_txt?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**kategorie typu dokladu*/
		ktg_typ?: number|null;
		/**zkratka kategorie typu dokladu*/
		ktg_typ_zkr?: string|null;
		/**stav storna*/
		s_sto?: number|null;
	}
	const enum GRezervaceDokladuSmlDtoNames { ixp = "ixp", typ_ag = "typ_ag", zkr_ag = "zkr_ag", s = "s", stav = "stav", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ac = "ac", ac_ag = "ac_ag", ico_esu = "ico_esu", nazev_esu = "nazev_esu", ac_esu = "ac_esu", popis = "popis", dat_evid = "dat_evid", dat_spl = "dat_spl", dat_uhr = "dat_uhr", dat_zau = "dat_zau", c_celkem = "c_celkem", c_rez = "c_rez", kod_kon = "kod_kon", radek = "radek", vs = "vs", ks = "ks", ss = "ss", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_vl_txt = "bu_vl_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", bu_ci_txt = "bu_ci_txt", zp_zkr = "zp_zkr", ixp_den_txt = "ixp_den_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", dat_zmena = "dat_zmena", ktg_typ = "ktg_typ", ktg_typ_zkr = "ktg_typ_zkr", s_sto = "s_sto",}
	const enum GRezervaceDokladuSmlDtoFragments { ixp = "Base", typ_ag = "Base", zkr_ag = "zkr_ag", s = "Base", stav = "stav", rok_sml = "Base", cislo_sml = "Base", ac = "Base", ac_ag = "Base", ico_esu = "subjekt_ico", nazev_esu = "subjekt_nazev", ac_esu = "subjekt_ac", popis = "Base", dat_evid = "Base", dat_spl = "Base", dat_uhr = "Base", dat_zau = "Base", c_celkem = "Base", c_rez = "Base", kod_kon = "Base", radek = "Base", vs = "Base", ks = "Base", ss = "Base", bu_vl = "Base", sk_vl = "Base", bu_vl_txt = "Base", bu_ci = "Base", sk_ci = "Base", bu_ci_txt = "Base", zp_zkr = "zp", ixp_den_txt = "kniha", ixs_fun_akt_txt = "referent", dat_zmena = "Base", ktg_typ = "Base", ktg_typ_zkr = "ktg_typ_zkr", s_sto = "Base",}
	const enum GRezervaceDokladuSmlDtoTypes { ixp = "string", typ_ag = "number", zkr_ag = "string", s = "string", stav = "string", rok_sml = "number", cislo_sml = "number", ac = "string", ac_ag = "string", ico_esu = "string", nazev_esu = "string", ac_esu = "string", popis = "string", dat_evid = "JsonDate", dat_spl = "JsonDate", dat_uhr = "JsonDate", dat_zau = "JsonDate", c_celkem = "JsonDecimal", c_rez = "JsonDecimal", kod_kon = "string", radek = "number", vs = "string", ks = "string", ss = "string", bu_vl = "string", sk_vl = "string", bu_vl_txt = "string", bu_ci = "string", sk_ci = "string", bu_ci_txt = "string", zp_zkr = "string", ixp_den_txt = "string", ixs_fun_akt_txt = "string", dat_zmena = "JsonDate", ktg_typ = "number", ktg_typ_zkr = "string", s_sto = "number",}
	const enum GRezervaceDokladuSmlDtoTypeLengths { ixp = 12, zkr_ag = 3, kod_kon = 30, vs = 12, ks = 12, ss = 12, bu_vl = 34, sk_vl = 11, bu_ci = 34, sk_ci = 11,}
	/**Pohledávky dokladů SML*/
	interface GPohledavkyDokladuSmlDto {
		/**PID*/
		ixp?: string|null;
		/**příznak žádosti (0 = pohledávka, >0 = žádost)*/
		zadost?: number|null;
		/**typ pohledávky*/
		typ_phl?: string|null;
		/**řádek*/
		ddp_radek?: number|null;
		/**čtvrť*/
		ddp_ctvrt?: number|null;
		/**VS*/
		vs?: string|null;
		/**SS*/
		ss?: string|null;
		/**název typu pohledávky*/
		typ_phl_txt?: string|null;
		/**poplatník*/
		esu_txt?: string|null;
		/**pořadové číslo*/
		por_cislo?: number|null;
		/**název typu požadavku*/
		typ_poz_txt?: string|null;
		/**název stavu*/
		stav_dok_txt?: string|null;
		/**název řádku*/
		ddp_radek_txt?: string|null;
		/**název čtvrti*/
		ddp_ctvrt_txt?: string|null;
	}
	const enum GPohledavkyDokladuSmlDtoNames { ixp = "ixp", zadost = "zadost", typ_phl = "typ_phl", ddp_radek = "ddp_radek", ddp_ctvrt = "ddp_ctvrt", vs = "vs", ss = "ss", typ_phl_txt = "typ_phl_txt", esu_txt = "esu_txt", por_cislo = "por_cislo", typ_poz_txt = "typ_poz_txt", stav_dok_txt = "stav_dok_txt", ddp_radek_txt = "ddp_radek_txt", ddp_ctvrt_txt = "ddp_ctvrt_txt",}
	const enum GPohledavkyDokladuSmlDtoFragments { ixp = "Base", zadost = "Base", typ_phl = "Base", ddp_radek = "Base", ddp_ctvrt = "Base", vs = "Base", ss = "Base", typ_phl_txt = "typ_phl_txt", esu_txt = "esu_txt", por_cislo = "Base", typ_poz_txt = "typ_poz_txt", stav_dok_txt = "stav_dok_txt", ddp_radek_txt = "ddp_radek_txt", ddp_ctvrt_txt = "ddp_ctvrt_txt",}
	const enum GPohledavkyDokladuSmlDtoTypes { ixp = "string", zadost = "number", typ_phl = "string", ddp_radek = "number", ddp_ctvrt = "number", vs = "string", ss = "string", typ_phl_txt = "string", esu_txt = "string", por_cislo = "number", typ_poz_txt = "string", stav_dok_txt = "string", ddp_radek_txt = "string", ddp_ctvrt_txt = "string",}
	const enum GPohledavkyDokladuSmlDtoTypeLengths { ixp = 12, typ_phl = 4, vs = 12, ss = 12, typ_phl_txt = 50, esu_txt = 254, typ_poz_txt = 50, stav_dok_txt = 50, ddp_radek_txt = 50, ddp_ctvrt_txt = 50,}
	/**Částka smlouvy pro jeden rok*/
	interface GCastkaSmlRokDto {
		/**rok smluvního případu*/
		rok?: number|null;
		/**identifikace plánu*/
		ixp_pla?: string|null;
		/**kurs na měnu*/
		kurz?: JsonDecimal|null;
		/**množství měny*/
		m?: JsonDecimal|null;
		/**typ měny*/
		mena?: number|null;
		/**cena v cizí měně*/
		c_mena?: JsonDecimal|null;
		/**cena v Kč*/
		c?: JsonDecimal|null;
		/**cena položek pro daný rok v Kč*/
		c_pol?: JsonDecimal|null;
		/**stav rozpisu v daném roce*/
		sml_stav?: number|null;
		/**vlastní BÚ - pouze kvůli SP*/
		bu_vl?: string|null;
		/**směrový kód vlastního BÚ - pouze kvůli SP*/
		sk_vl?: string|null;
		/**suma vázaných objednávek na smlouvu za daný rok*/
		c_obj?: JsonDecimal|null;
		/**cena za vázané faktury na smlouvu v Kč za daný rok*/
		c_fak?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu za daný rok*/
		c_vz?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ za daný rok*/
		c_sml?: JsonDecimal|null;
		/**částka objednávek vázaných na smlouvu v Kč za daný rok*/
		c_objsml?: JsonDecimal|null;
		/**počet položek smlouvy za daný rok*/
		num_pol?: number|null;
		/**cena platebního kalndáře za období*/
		c_kal?: JsonDecimal|null;
		/**cena platebního kalndáře za období v dané měně*/
		c_mena_kal?: JsonDecimal|null;
		/**součet položek odpovídajících typu dokladu = krytí*/
		c_pol_norm?: JsonDecimal|null;
		/**součet rezervace položek odpovídajících typu dokladu = krytí*/
		c_fak_norm?: JsonDecimal|null;
		/**součet položek odpovídajících typu dokladu = vratky*/
		c_pol_anti?: JsonDecimal|null;
		/**součet rezervace položek odpovídajících typu dokladu = vratky*/
		c_fak_anti?: JsonDecimal|null;
		/**částka za smlouvy vázané na rámcovou smlouvu za daný rok*/
		c_smlRS_bnd?: JsonDecimal|null;
		/**disponibilní částka*/
		c_disp?: JsonDecimal|null;
	}
	const enum GCastkaSmlRokDtoNames { rok = "rok", ixp_pla = "ixp_pla", kurz = "kurz", m = "m", mena = "mena", c_mena = "c_mena", c = "c", c_pol = "c_pol", sml_stav = "sml_stav", bu_vl = "bu_vl", sk_vl = "sk_vl", c_obj = "c_obj", c_fak = "c_fak", c_vz = "c_vz", c_sml = "c_sml", c_objsml = "c_objsml", num_pol = "num_pol", c_kal = "c_kal", c_mena_kal = "c_mena_kal", c_pol_norm = "c_pol_norm", c_fak_norm = "c_fak_norm", c_pol_anti = "c_pol_anti", c_fak_anti = "c_fak_anti", c_smlRS_bnd = "c_smlRS_bnd", c_disp = "c_disp",}
	const enum GCastkaSmlRokDtoFragments { rok = "Base", ixp_pla = "Base", kurz = "Base", m = "Base", mena = "Base", c_mena = "Base", c = "Base", c_pol = "Base", sml_stav = "Base", bu_vl = "Base", sk_vl = "Base", c_obj = "Base", c_fak = "Base", c_vz = "Base", c_sml = "Base", c_objsml = "Base", num_pol = "Base", c_kal = "Base", c_mena_kal = "Base", c_pol_norm = "Base", c_fak_norm = "Base", c_pol_anti = "Base", c_fak_anti = "Base", c_smlRS_bnd = "Base", c_disp = "Base",}
	const enum GCastkaSmlRokDtoTypes { rok = "number", ixp_pla = "string", kurz = "JsonDecimal", m = "JsonDecimal", mena = "number", c_mena = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", sml_stav = "number", bu_vl = "string", sk_vl = "string", c_obj = "JsonDecimal", c_fak = "JsonDecimal", c_vz = "JsonDecimal", c_sml = "JsonDecimal", c_objsml = "JsonDecimal", num_pol = "number", c_kal = "JsonDecimal", c_mena_kal = "JsonDecimal", c_pol_norm = "JsonDecimal", c_fak_norm = "JsonDecimal", c_pol_anti = "JsonDecimal", c_fak_anti = "JsonDecimal", c_smlRS_bnd = "JsonDecimal", c_disp = "JsonDecimal",}
	const enum GCastkaSmlRokDtoTypeLengths { ixp_pla = 12, bu_vl = 34, sk_vl = 11,}
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
	/**Primární klíč dokladu SML*/
	interface GDokladSmlPkDto {
		/**PID dokladu SML*/
		ixp?: string|null;
	}
	const enum GDokladSmlPkDtoNames { ixp = "ixp",}
	const enum GDokladSmlPkDtoFragments { ixp = "*",}
	const enum GDokladSmlPkDtoTypes { ixp = "string",}
	const enum GDokladSmlPkDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDokladSmlFilterDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Filtr seznamu dokladů SML*/
	interface GDokladSmlFilterDto {
		/**PID knihy dokladů SML*/
		ixp_den?: string|null;
		/**rok knih dokladů SML (pro všechny knihy roku)*/
		rok_den?: number|null;
		/**kategorie knih dokladů SML*/
		ktg_den?: GBaseFilter<number>|null;
		/**PID dokladu SML*/
		ixp?: GBaseFilter<string>|null;
		/**PID nadřazené smlouvy k objednávce*/
		ixp_sml?: GBaseFilter<string>|null;
		/**PID nadřazeného dokladu SML*/
		ixp_sml_pri?: GBaseFilter<string>|null;
		/**aktuální funkce*/
		ixs_fun_akt?: string|null;
		/**stav*/
		sml_stav?: GBaseFilter<number>|null;
		/**stav podpisu*/
		sgn_stav?: GBaseFilter<number>|null;
		/**popis*/
		popis?: GBaseFilter<string>|null;
		/**úplný název*/
		nazev?: GBaseFilter<string>|null;
		/**poznámka*/
		poznamka?: GBaseFilter<string>|null;
		/**agendové číslo*/
		ac_sml?: GIntervalDto<string>|null;
		/**evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**kategorie typu dokladu*/
		ktg_typ?: GBaseFilter<number>|null;
		/**kategorie smlouvy*/
		ktg_sml?: GBaseFilter<number>|null;
		/**typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**omezení výběru dokladů pomocí řídící tabulky přípustných vazeb dokladů ginvtyp*/
		ixs_typ_fce?: GBaseFilter<string>|null;
		/**PID externího subjektu*/
		ixs_esu?: GBaseFilter<string>|null;
		/**měna*/
		mena?: GBaseFilter<number>|null;
		/**cena dokladu*/
		c_mena_doc?: GIntervalDto<JsonDecimal>|null;
		/**datum evidence*/
		dat_prij_pod?: GIntervalDto<JsonDate>|null;
		/**datum uzavření*/
		dat_uzavreni?: GIntervalDto<JsonDate>|null;
		/**datum konce platnosti*/
		dat_platnost?: GIntervalDto<JsonDate>|null;
		/**datum účinnosti*/
		dat_ucinnost?: GIntervalDto<JsonDate>|null;
		/**datum podpisu protistranou*/
		dat_sgn_ext?: GIntervalDto<JsonDate>|null;
		/**datum podpisu*/
		dat_sgn?: GIntervalDto<JsonDate>|null;
		/**datum ukončení*/
		dat_uko?: GIntervalDto<JsonDate>|null;
		/**související doklad 1*/
		ac_dok_1?: GBaseFilter<string>|null;
		/**datum souvisejícího dokladu 1*/
		dat_dok_1?: GIntervalDto<JsonDate>|null;
		/**související doklad 2*/
		ac_dok_2?: GBaseFilter<string>|null;
		/**datum souvisejícího dokladu 2*/
		dat_dok_2?: GIntervalDto<JsonDate>|null;
		/**datum financování od*/
		fin_od?: GIntervalDto<number>|null;
		/**datum financování do*/
		fin_do?: GIntervalDto<number>|null;
		/**celková částka*/
		c_mena?: GIntervalDto<JsonDecimal>|null;
		/**vazba dokladu na případ BLK*/
		sml_blk?: GBaseFilter<number>|null;
		/**vazba dokladu na nadřazenou smlouvu*/
		sml_nad_sml?: GBaseFilter<number>|null;
		/**vazba dokladu na podřízenou objednávku*/
		sml_obj?: GBaseFilter<number>|null;
		/**dodatek ke smlouvě*/
		sml_dod?: GBaseFilter<number>|null;
		/**doklad je nadřazeným případem*/
		sml_nad_pri?: GBaseFilter<number>|null;
		/**k dokladu existují zprávy dohledového systému*/
		sml_doc_dsg?: GBaseFilter<number>|null;
		/**k dokladu existuje elektronický obraz/příloha*/
		s_ele?: GBaseFilter<number>|null;
		/**vazba dokladu na majetkové karty*/
		sml_maj?: GBaseFilter<number>|null;
		/**disponibilita*/
		disp?: GBaseFilter<number>|null;
		/**typ blokační agendy*/
		typ_ag_blok?: GBaseFilter<number>|null;
		/**soutěž*/
		soutez?: GBaseFilter<string>|null;
		/**účtování o PZ/P*/
		priz_pzp?: GBaseFilter<number>|null;
		/**stav předběžné finanční kontroly*/
		stav_pfk?: GBaseFilter<number>|null;
		/**stav řízeného schvalovacího procesu*/
		stav_rsp?: GBaseFilter<number>|null;
		/**způsob ukončení*/
		ixs_zuk?: GBaseFilter<string>|null;
		/**možnost opce*/
		priz_opce?: GBaseFilter<number>|null;
		/**agendové číslo*/
		pri_ac_sml?: GIntervalDto<string>|null;
		/**popis*/
		pri_popis?: GBaseFilter<string>|null;
		/**položky FP se zadanou větou*/
		fp_pol?: Gordic.Sml.Interface.GSmlCfuFilterDto[]|null;
		/**výběr dokladů ve vztahu k položkám FP*/
		fp_typ_vyb?: GBaseFilter<number>|null;
		/**období k výběru dokladů ve vztahu k položkám FP (pro fp_typ_vyb = 40 položky FP neexistují v období)*/
		fp_obd?: GBaseFilter<number>|null;
		/**vztah platebního kalendáře a dokladu*/
		plk_typ_vyb?: GBaseFilter<number>|null;
		/**období k výběru dokladů ve vztahu platebního kalendáře a dokladu (pro plk_typ_vyb = 40 platební kalendář neexistuje v období)*/
		plk_obd?: GBaseFilter<number>|null;
		/**vztah rozpisu a dokladu*/
		rozpis_typ_vyb?: GBaseFilter<number>|null;
		/**období k výběru dokladů ve vztahu rozpisu a dokladu (pro rozpis_typ_vyb = 40 celková částka není rozepsána v období)*/
		rozpis_obd?: GBaseFilter<number>|null;
		/**vztah dodatku a dokladu*/
		dod_typ_vyb?: GBaseFilter<number>|null;
		/**období k výběru dokladu ve vztahu dodatku a dokladu (pro dod_typ_vyb = 40 mění celkovou částku v období)*/
		dod_obd?: GBaseFilter<number>|null;
		/**období k výběru dokladu ve vztahu dodatku a dokladu (pro dod_typ_vyb = 50 datum uzavření)*/
		dod_dat_uza?: GIntervalDto<JsonDate>|null;
		/**stav zveřejnění*/
		stav_zpv?: GBaseFilter<number>|null;
		/**způsob zveřejnění*/
		ixs_zpv?: GBaseFilter<string>|null;
		/**nutnost zveřejnění*/
		priz_pov_zve?: GBaseFilter<number>|null;
		/**plán zveřejnění*/
		plan_zve?: GBaseFilter<number>|null;
		/**existence el obrazu/přílohy určené ke zveřejnění*/
		s_ele_zve?: GBaseFilter<number>|null;
		/**datum zveřejnění*/
		dat_zve?: GIntervalDto<JsonDate>|null;
		/**identifikátor zveřejnění*/
		id_zve?: GBaseFilter<string>|null;
		/**pouze doklady určené ke zveřejnění*/
		plan_zve_d?: GBaseFilter<number>|null;
		/**částka*/
		vep_c_sml?: GIntervalDto<JsonDecimal>|null;
		/**množství*/
		vep_m_sml?: GIntervalDto<JsonDecimal>|null;
		/**klasifikace*/
		vep_skp?: GBaseFilter<string>|null;
		/**materiálové číslo / KČM*/
		vep_mat_cis?: GBaseFilter<string>|null;
		/**název položky VP*/
		vep_nazev?: GBaseFilter<string>|null;
		/**skupina*/
		vep_skupina_id?: GBaseFilter<number>|null;
		/**druh*/
		vep_drh_id?: GBaseFilter<number>|null;
		/**MJ*/
		vep_mj?: GBaseFilter<string>|null;
		/**výrobní číslo*/
		vep_vyr_cis?: GBaseFilter<string>|null;
		/**inventární číslo*/
		vep_inv_cis?: GBaseFilter<string>|null;
		/**popis*/
		vep_popis?: GBaseFilter<string>|null;
		/**typ položky VP*/
		vep_ixs_dup?: GBaseFilter<string>|null;
		/**evidenční číslo*/
		vep_evi_cis?: GBaseFilter<string>|null;
		/**sériové číslo*/
		vep_ser_cis?: GBaseFilter<string>|null;
		/**šarže*/
		vep_sarze?: GBaseFilter<string>|null;
		/**vazba položky VP na doklad*/
		vp_typ_vyb?: GBaseFilter<number>|null;
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
		/**existence v tabulce wfltpre*/
		tpre_ano?: number|null;
		/**IKC v tabulce wfltpre*/
		tpre_ikc?: Gordic.General.GIkc|null;
		/**příznak vyškrtnutého pohybu v tabulce wfltpre*/
		tpre_uncheck?: number|null;
	}
	const enum GDokladSmlFilterDtoNames { ixp_den = "ixp_den", rok_den = "rok_den", ktg_den = "ktg_den", ixp = "ixp", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ixs_fun_akt = "ixs_fun_akt", sml_stav = "sml_stav", sgn_stav = "sgn_stav", popis = "popis", nazev = "nazev", poznamka = "poznamka", ac_sml = "ac_sml", ac = "ac", ktg_typ = "ktg_typ", ktg_sml = "ktg_sml", ixs_typ = "ixs_typ", ixs_typ_fce = "ixs_typ_fce", ixs_esu = "ixs_esu", mena = "mena", c_mena_doc = "c_mena_doc", dat_prij_pod = "dat_prij_pod", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", dat_sgn_ext = "dat_sgn_ext", dat_sgn = "dat_sgn", dat_uko = "dat_uko", ac_dok_1 = "ac_dok_1", dat_dok_1 = "dat_dok_1", ac_dok_2 = "ac_dok_2", dat_dok_2 = "dat_dok_2", fin_od = "fin_od", fin_do = "fin_do", c_mena = "c_mena", sml_blk = "sml_blk", sml_nad_sml = "sml_nad_sml", sml_obj = "sml_obj", sml_dod = "sml_dod", sml_nad_pri = "sml_nad_pri", sml_doc_dsg = "sml_doc_dsg", s_ele = "s_ele", sml_maj = "sml_maj", disp = "disp", typ_ag_blok = "typ_ag_blok", soutez = "soutez", priz_pzp = "priz_pzp", stav_pfk = "stav_pfk", stav_rsp = "stav_rsp", ixs_zuk = "ixs_zuk", priz_opce = "priz_opce", pri_ac_sml = "pri_ac_sml", pri_popis = "pri_popis", fp_pol = "fp_pol", fp_typ_vyb = "fp_typ_vyb", fp_obd = "fp_obd", plk_typ_vyb = "plk_typ_vyb", plk_obd = "plk_obd", rozpis_typ_vyb = "rozpis_typ_vyb", rozpis_obd = "rozpis_obd", dod_typ_vyb = "dod_typ_vyb", dod_obd = "dod_obd", dod_dat_uza = "dod_dat_uza", stav_zpv = "stav_zpv", ixs_zpv = "ixs_zpv", priz_pov_zve = "priz_pov_zve", plan_zve = "plan_zve", s_ele_zve = "s_ele_zve", dat_zve = "dat_zve", id_zve = "id_zve", plan_zve_d = "plan_zve_d", vep_c_sml = "vep_c_sml", vep_m_sml = "vep_m_sml", vep_skp = "vep_skp", vep_mat_cis = "vep_mat_cis", vep_nazev = "vep_nazev", vep_skupina_id = "vep_skupina_id", vep_drh_id = "vep_drh_id", vep_mj = "vep_mj", vep_vyr_cis = "vep_vyr_cis", vep_inv_cis = "vep_inv_cis", vep_popis = "vep_popis", vep_ixs_dup = "vep_ixs_dup", vep_evi_cis = "vep_evi_cis", vep_ser_cis = "vep_ser_cis", vep_sarze = "vep_sarze", vp_typ_vyb = "vp_typ_vyb", wfl_kl_slovo = "wfl_kl_slovo", vlastnosti_r = "vlastnosti_r", vlastnosti_s = "vlastnosti_s", dokument_ixp_spis = "dokument_ixp_spis", dokument_priz_spis = "dokument_priz_spis", dokument_ixs_su_akt = "dokument_ixs_su_akt", dokument_nazev = "dokument_nazev", dokument_akt_znacka = "dokument_akt_znacka", dokument_stav_dist = "dokument_stav_dist", dokument_stav_pis = "dokument_stav_pis", dokument_s_prij = "dokument_s_prij", dokument_s_ssl = "dokument_s_ssl", dokument_dat_zmena = "dokument_dat_zmena", dokument_zmenu_prov = "dokument_zmenu_prov", dokument_s_ele = "dokument_s_ele", dokument_s_fyz = "dokument_s_fyz", dokument_uzo = "dokument_uzo", dokument_spis_pl = "dokument_spis_pl", dokument_spis_znak = "dokument_spis_znak", dokument_ixs_fun_wfl = "dokument_ixs_fun_wfl", dokument_ixs_su_wfl = "dokument_ixs_su_wfl", dokument_dat_vyriz = "dokument_dat_vyriz", dokument_s_schval = "dokument_s_schval", dokument_skar_znak = "dokument_skar_znak", dokument_skar_lhuta = "dokument_skar_lhuta", dokument_rok_spo_uda = "dokument_rok_spo_uda", dokument_rok_skartace = "dokument_rok_skartace", dokument_poc_listu = "dokument_poc_listu", dokument_poc_stran = "dokument_poc_stran", dokument_poc_kop = "dokument_poc_kop", dokument_poc_priloh = "dokument_poc_priloh", dokument_poc_l_priloh = "dokument_poc_l_priloh", dokument_cj = "dokument_cj", dokument_priz_cj = "dokument_priz_cj", dokument_PrizVBaliku = "dokument_PrizVBaliku", dokument_ixs_zup = "dokument_ixs_zup", dokument_PrizPozSkar = "dokument_PrizPozSkar", tpre_ano = "tpre_ano", tpre_ikc = "tpre_ikc", tpre_uncheck = "tpre_uncheck",}
	const enum GDokladSmlFilterDtoFragments { ixp_den = "*", rok_den = "*", ktg_den = "*", ixp = "*", ixp_sml = "*", ixp_sml_pri = "*", ixs_fun_akt = "*", sml_stav = "*", sgn_stav = "*", popis = "*", nazev = "*", poznamka = "*", ac_sml = "*", ac = "*", ktg_typ = "*", ktg_sml = "*", ixs_typ = "*", ixs_typ_fce = "*", ixs_esu = "*", mena = "*", c_mena_doc = "*", dat_prij_pod = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", dat_sgn_ext = "*", dat_sgn = "*", dat_uko = "*", ac_dok_1 = "*", dat_dok_1 = "*", ac_dok_2 = "*", dat_dok_2 = "*", fin_od = "*", fin_do = "*", c_mena = "*", sml_blk = "*", sml_nad_sml = "*", sml_obj = "*", sml_dod = "*", sml_nad_pri = "*", sml_doc_dsg = "*", s_ele = "*", sml_maj = "*", disp = "*", typ_ag_blok = "*", soutez = "*", priz_pzp = "*", stav_pfk = "*", stav_rsp = "*", ixs_zuk = "*", priz_opce = "*", pri_ac_sml = "*", pri_popis = "*", fp_pol = "*", fp_typ_vyb = "*", fp_obd = "*", plk_typ_vyb = "*", plk_obd = "*", rozpis_typ_vyb = "*", rozpis_obd = "*", dod_typ_vyb = "*", dod_obd = "*", dod_dat_uza = "*", stav_zpv = "*", ixs_zpv = "*", priz_pov_zve = "*", plan_zve = "*", s_ele_zve = "*", dat_zve = "*", id_zve = "*", plan_zve_d = "*", vep_c_sml = "*", vep_m_sml = "*", vep_skp = "*", vep_mat_cis = "*", vep_nazev = "*", vep_skupina_id = "*", vep_drh_id = "*", vep_mj = "*", vep_vyr_cis = "*", vep_inv_cis = "*", vep_popis = "*", vep_ixs_dup = "*", vep_evi_cis = "*", vep_ser_cis = "*", vep_sarze = "*", vp_typ_vyb = "*", wfl_kl_slovo = "*", vlastnosti_r = "*", vlastnosti_s = "*", dokument_ixp_spis = "*", dokument_priz_spis = "*", dokument_ixs_su_akt = "*", dokument_nazev = "*", dokument_akt_znacka = "*", dokument_stav_dist = "*", dokument_stav_pis = "*", dokument_s_prij = "*", dokument_s_ssl = "*", dokument_dat_zmena = "*", dokument_zmenu_prov = "*", dokument_s_ele = "*", dokument_s_fyz = "*", dokument_uzo = "*", dokument_spis_pl = "*", dokument_spis_znak = "*", dokument_ixs_fun_wfl = "*", dokument_ixs_su_wfl = "*", dokument_dat_vyriz = "*", dokument_s_schval = "*", dokument_skar_znak = "*", dokument_skar_lhuta = "*", dokument_rok_spo_uda = "*", dokument_rok_skartace = "*", dokument_poc_listu = "*", dokument_poc_stran = "*", dokument_poc_kop = "*", dokument_poc_priloh = "*", dokument_poc_l_priloh = "*", dokument_cj = "*", dokument_priz_cj = "*", dokument_PrizVBaliku = "*", dokument_ixs_zup = "*", dokument_PrizPozSkar = "*", tpre_ano = "*", tpre_ikc = "*", tpre_uncheck = "*",}
	const enum GDokladSmlFilterDtoTypes { ixp_den = "string", rok_den = "number", ktg_den = "GBaseFilter<number>", ixp = "GBaseFilter<string>", ixp_sml = "GBaseFilter<string>", ixp_sml_pri = "GBaseFilter<string>", ixs_fun_akt = "string", sml_stav = "GBaseFilter<number>", sgn_stav = "GBaseFilter<number>", popis = "GBaseFilter<string>", nazev = "GBaseFilter<string>", poznamka = "GBaseFilter<string>", ac_sml = "GIntervalDto<string>", ac = "GIntervalDto<string>", ktg_typ = "GBaseFilter<number>", ktg_sml = "GBaseFilter<number>", ixs_typ = "GBaseFilter<string>", ixs_typ_fce = "GBaseFilter<string>", ixs_esu = "GBaseFilter<string>", mena = "GBaseFilter<number>", c_mena_doc = "GIntervalDto<JsonDecimal>", dat_prij_pod = "GIntervalDto<JsonDate>", dat_uzavreni = "GIntervalDto<JsonDate>", dat_platnost = "GIntervalDto<JsonDate>", dat_ucinnost = "GIntervalDto<JsonDate>", dat_sgn_ext = "GIntervalDto<JsonDate>", dat_sgn = "GIntervalDto<JsonDate>", dat_uko = "GIntervalDto<JsonDate>", ac_dok_1 = "GBaseFilter<string>", dat_dok_1 = "GIntervalDto<JsonDate>", ac_dok_2 = "GBaseFilter<string>", dat_dok_2 = "GIntervalDto<JsonDate>", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", c_mena = "GIntervalDto<JsonDecimal>", sml_blk = "GBaseFilter<number>", sml_nad_sml = "GBaseFilter<number>", sml_obj = "GBaseFilter<number>", sml_dod = "GBaseFilter<number>", sml_nad_pri = "GBaseFilter<number>", sml_doc_dsg = "GBaseFilter<number>", s_ele = "GBaseFilter<number>", sml_maj = "GBaseFilter<number>", disp = "GBaseFilter<number>", typ_ag_blok = "GBaseFilter<number>", soutez = "GBaseFilter<string>", priz_pzp = "GBaseFilter<number>", stav_pfk = "GBaseFilter<number>", stav_rsp = "GBaseFilter<number>", ixs_zuk = "GBaseFilter<string>", priz_opce = "GBaseFilter<number>", pri_ac_sml = "GIntervalDto<string>", pri_popis = "GBaseFilter<string>", fp_pol = "Gordic.Sml.Interface.GSmlCfuFilterDto[]", fp_typ_vyb = "GBaseFilter<number>", fp_obd = "GBaseFilter<number>", plk_typ_vyb = "GBaseFilter<number>", plk_obd = "GBaseFilter<number>", rozpis_typ_vyb = "GBaseFilter<number>", rozpis_obd = "GBaseFilter<number>", dod_typ_vyb = "GBaseFilter<number>", dod_obd = "GBaseFilter<number>", dod_dat_uza = "GIntervalDto<JsonDate>", stav_zpv = "GBaseFilter<number>", ixs_zpv = "GBaseFilter<string>", priz_pov_zve = "GBaseFilter<number>", plan_zve = "GBaseFilter<number>", s_ele_zve = "GBaseFilter<number>", dat_zve = "GIntervalDto<JsonDate>", id_zve = "GBaseFilter<string>", plan_zve_d = "GBaseFilter<number>", vep_c_sml = "GIntervalDto<JsonDecimal>", vep_m_sml = "GIntervalDto<JsonDecimal>", vep_skp = "GBaseFilter<string>", vep_mat_cis = "GBaseFilter<string>", vep_nazev = "GBaseFilter<string>", vep_skupina_id = "GBaseFilter<number>", vep_drh_id = "GBaseFilter<number>", vep_mj = "GBaseFilter<string>", vep_vyr_cis = "GBaseFilter<string>", vep_inv_cis = "GBaseFilter<string>", vep_popis = "GBaseFilter<string>", vep_ixs_dup = "GBaseFilter<string>", vep_evi_cis = "GBaseFilter<string>", vep_ser_cis = "GBaseFilter<string>", vep_sarze = "GBaseFilter<string>", vp_typ_vyb = "GBaseFilter<number>", wfl_kl_slovo = "GBaseFilter<string>", vlastnosti_r = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", vlastnosti_s = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", dokument_ixp_spis = "GBaseFilter<string>", dokument_priz_spis = "GBaseFilter<number>", dokument_ixs_su_akt = "GBaseFilter<string>", dokument_nazev = "GBaseFilter<string>", dokument_akt_znacka = "GBaseFilter<string>", dokument_stav_dist = "GBaseFilter<number>", dokument_stav_pis = "GBaseFilter<number>", dokument_s_prij = "GBaseFilter<number>", dokument_s_ssl = "GBaseFilter<number>", dokument_dat_zmena = "GIntervalDto<JsonDate>", dokument_zmenu_prov = "GBaseFilter<string>", dokument_s_ele = "GBaseFilter<number>", dokument_s_fyz = "GBaseFilter<number>", dokument_uzo = "GBaseFilter<string>", dokument_spis_pl = "GBaseFilter<string>", dokument_spis_znak = "GBaseFilter<string>", dokument_ixs_fun_wfl = "GBaseFilter<string>", dokument_ixs_su_wfl = "GBaseFilter<string>", dokument_dat_vyriz = "GIntervalDto<JsonDate>", dokument_s_schval = "GBaseFilter<number>", dokument_skar_znak = "GBaseFilter<string>", dokument_skar_lhuta = "GBaseFilter<number>", dokument_rok_spo_uda = "GBaseFilter<number>", dokument_rok_skartace = "GBaseFilter<number>", dokument_poc_listu = "GBaseFilter<string>", dokument_poc_stran = "GBaseFilter<number>", dokument_poc_kop = "GBaseFilter<number>", dokument_poc_priloh = "GBaseFilter<number>", dokument_poc_l_priloh = "GBaseFilter<string>", dokument_cj = "GBaseFilter<string>", dokument_priz_cj = "GBaseFilter<number>", dokument_PrizVBaliku = "GBaseFilter<number>", dokument_ixs_zup = "GBaseFilter<string>", dokument_PrizPozSkar = "GBaseFilter<number>", tpre_ano = "number", tpre_ikc = "Gordic.General.GIkc", tpre_uncheck = "number",}
	const enum GDokladSmlFilterDtoTypeLengths {}
	/**
	*     filtr seznamu položek FP
	*     
	*/
	interface GSmlCfuFilterDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**rok*/
		rok?: GIntervalDto<number>|null;
		/**číslo položky plánu / číslo akce*/
		cis_pol_pla?: GIntervalDto<string>|null;
		/**NKS*/
		nks?: GIntervalDto<string>|null;
		/**vlastní bankovního účtu*/
		bu_vl_txt?: GIntervalDto<string>|null;
		/**typ operace*/
		priz_zaz?: GBaseFilter<number>|null;
		/**typ operace*/
		priz_zaz_txt?: GBaseFilter<string>|null;
		/**částka*/
		c?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GSmlCfuFilterDtoNames { rok = "rok", cis_pol_pla = "cis_pol_pla", nks = "nks", bu_vl_txt = "bu_vl_txt", priz_zaz = "priz_zaz", priz_zaz_txt = "priz_zaz_txt", c = "c", cfu = "cfu",}
	const enum GSmlCfuFilterDtoFragments { rok = "*", cis_pol_pla = "*", nks = "*", bu_vl_txt = "*", priz_zaz = "*", priz_zaz_txt = "*", c = "*", cfu = "*",}
	const enum GSmlCfuFilterDtoTypes { rok = "GIntervalDto<number>", cis_pol_pla = "GIntervalDto<string>", nks = "GIntervalDto<string>", bu_vl_txt = "GIntervalDto<string>", priz_zaz = "GBaseFilter<number>", priz_zaz_txt = "GBaseFilter<string>", c = "GIntervalDto<JsonDecimal>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GSmlCfuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GDphListDto .d.ts 

declare namespace Gordic.Sml.Interface {
	/**Seznam Dto pro dph*/
	interface GDphListDto {
		/**ZaznamSmlDetail - smlpid*/
		ZaznamObdPlatDph?: Gordic.Sml.Interface.GEkodpdpDto|null;
		/**hláška*/
		hlaska?: string|null;
	}
	const enum GDphListDtoNames { ZaznamObdPlatDph = "ZaznamObdPlatDph", hlaska = "hlaska",}
	const enum GDphListDtoFragments { ZaznamObdPlatDph = "*", hlaska = "*",}
	const enum GDphListDtoTypes { ZaznamObdPlatDph = "Gordic.Sml.Interface.GEkodpdpDto", hlaska = "string",}
	const enum GDphListDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GEkocdapDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ekocdap*/
	interface GEkocdapDto {
		/**DBCOLUMN:ekocdap.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:ekocdap.rokmes_od*/
		rokmes_od?: string|null;
		/**DBCOLUMN:ekocdap.rokmes_do*/
		rokmes_do?: string|null;
		/**DBCOLUMN:ekocdap.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:ekocdap.dan_typ_txt*/
		dan_typ_txt?: string|null;
		/**DBCOLUMN:ekocdap.dan_typ_zkr*/
		dan_typ_zkr?: string|null;
		/**DBCOLUMN:ekocdap.dan_typ_upl*/
		dan_typ_upl?: string|null;
	}
	const enum GEkocdapDtoNames { dan_typ = "dan_typ", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", dan_proc = "dan_proc", dan_typ_txt = "dan_typ_txt", dan_typ_zkr = "dan_typ_zkr", dan_typ_upl = "dan_typ_upl",}
	const enum GEkocdapDtoFragments { dan_typ = "*", rokmes_od = "*", rokmes_do = "*", dan_proc = "*", dan_typ_txt = "*", dan_typ_zkr = "*", dan_typ_upl = "*",}
	const enum GEkocdapDtoTypes { dan_typ = "number", rokmes_od = "string", rokmes_do = "string", dan_proc = "JsonDecimal", dan_typ_txt = "string", dan_typ_zkr = "string", dan_typ_upl = "string",}
	const enum GEkocdapDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, dan_typ_txt = 50, dan_typ_zkr = 16, dan_typ_upl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GEkodpdpDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ekodpdp*/
	interface GEkodpdpDto {
		/**DBCOLUMN:ekodpdp.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ekodpdp.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ekodpdp.platce_dph*/
		platce_dph?: number|null;
	}
	const enum GEkodpdpDtoNames { dat_od = "dat_od", dat_do = "dat_do", platce_dph = "platce_dph",}
	const enum GEkodpdpDtoFragments { dat_od = "*", dat_do = "*", platce_dph = "*",}
	const enum GEkodpdpDtoTypes { dat_od = "JsonDate", dat_do = "JsonDate", platce_dph = "number",}
	const enum GEkodpdpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GMajInfoDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:majsmaj*/
	interface GMajInfoDto {
		/**DBCOLUMN:majsmaj.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:majsmaj.lic*/
		lic?: string|null;
		/**DBCOLUMN:majsmaj.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:majsmaj.ser_cis*/
		ser_cis?: string|null;
		/**DBCOLUMN:majsmaj.evi_cis*/
		evi_cis?: string|null;
		/**DBCOLUMN:majsmaj.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:majsmaj.rok_vyr*/
		rok_vyr?: number|null;
		/**DBCOLUMN:majsmaj.skp*/
		skp?: string|null;
		/**DBCOLUMN:majsmaj.nazev_skp*/
		nazev_skp?: string|null;
		/**DBCOLUMN:majsmaj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:majsmaj.ueab_por*/
		ueab_por?: string|null;
		/**DBCOLUMN:majsmaj.ueab_opr*/
		ueab_opr?: string|null;
		/**DBCOLUMN:majsmaj.ueab_evi*/
		ueab_evi?: string|null;
		/**DBCOLUMN:majsmaj.cmj*/
		cmj?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.pmj*/
		pmj?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.pmj_min*/
		pmj_min?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.dat_por*/
		dat_por?: JsonDate|null;
		/**DBCOLUMN:majsmaj.dat_zar*/
		dat_zar?: JsonDate|null;
		/**DBCOLUMN:majsmaj.dat_vyr*/
		dat_vyr?: JsonDate|null;
		/**DBCOLUMN:majsmaj.dat_vznik*/
		dat_vznik?: JsonDate|null;
		/**DBCOLUMN:majsmaj.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsmaj.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:majsmaj.nks*/
		nks?: string|null;
		/**DBCOLUMN:majsmaj.trida*/
		trida?: string|null;
		/**DBCOLUMN:majsmaj.stredisko*/
		stredisko?: string|null;
		/**DBCOLUMN:majsmaj.budova_kod*/
		budova_kod?: string|null;
		/**DBCOLUMN:majsmaj.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:majsmaj.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:majsmaj.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:majsmaj.ixs_maj_nad*/
		ixs_maj_nad?: string|null;
		/**DBCOLUMN:majsmaj.typ_soubor*/
		typ_soubor?: number|null;
		/**DBCOLUMN:majsmaj.jmeno_soubor*/
		jmeno_soubor?: string|null;
		/**DBCOLUMN:majsmaj.inv_cis_soubor*/
		inv_cis_soubor?: string|null;
		/**DBCOLUMN:majsmaj.drh_id*/
		drh_id?: number|null;
		/**DBCOLUMN:majsmaj.skupina_id*/
		skupina_id?: number|null;
		/**DBCOLUMN:majsmaj.mj*/
		mj?: string|null;
		/**DBCOLUMN:majsmaj.skupina_odp*/
		skupina_odp?: string|null;
		/**DBCOLUMN:majsmaj.polozka_odp*/
		polozka_odp?: number|null;
		/**DBCOLUMN:majsmaj.tev*/
		tev?: number|null;
		/**DBCOLUMN:majsmaj.dev*/
		dev?: number|null;
		/**DBCOLUMN:majsmaj.tka*/
		tka?: number|null;
		/**DBCOLUMN:majsmaj.mat_akt*/
		mat_akt?: number|null;
		/**DBCOLUMN:majsmaj.kod_vyr*/
		kod_vyr?: number|null;
		/**DBCOLUMN:majsmaj.kod_por*/
		kod_por?: number|null;
		/**DBCOLUMN:majsmaj.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:majsmaj.tisk_eti*/
		tisk_eti?: number|null;
		/**DBCOLUMN:majsmaj.pmj_res*/
		pmj_res?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.priz_odp*/
		priz_odp?: number|null;
		/**DBCOLUMN:majsmaj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsmaj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:majsmaj.pmj_max*/
		pmj_max?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.id_top*/
		id_top?: string|null;
		/**DBCOLUMN:majsmaj.id_mnoz*/
		id_mnoz?: number|null;
		/**DBCOLUMN:majsmaj.mat_cis*/
		mat_cis?: string|null;
		/**DBCOLUMN:majsmaj.sarze*/
		sarze?: string|null;
		/**DBCOLUMN:majsmaj.zev*/
		zev?: number|null;
		/**DBCOLUMN:majsmaj.expirace*/
		expirace?: JsonDate|null;
		/**DBCOLUMN:majsmaj.ean*/
		ean?: string|null;
		/**DBCOLUMN:majsmaj.dp_ode*/
		dp_ode?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:majsmaj.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph*/
		c_c_dph?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.kod_vyu*/
		kod_vyu?: number|null;
		/**DBCOLUMN:majsmaj.akce*/
		akce?: string|null;
		/**DBCOLUMN:majsmaj.segment_kod*/
		segment_kod?: string|null;
		/**DBCOLUMN:majsmaj.dat_uct_0123*/
		dat_uct_0123?: JsonDate|null;
		/**DBCOLUMN:majsmaj.typ_dok_por*/
		typ_dok_por?: number|null;
		/**DBCOLUMN:majsmaj.typ_dok_vyr*/
		typ_dok_vyr?: number|null;
		/**DBCOLUMN:majsmaj.inv_in*/
		inv_in?: number|null;
		/**DBCOLUMN:majsmaj.lhuta_zaruka*/
		lhuta_zaruka?: number|null;
		/**DBCOLUMN:majsmaj.objekt*/
		objekt?: string|null;
		/**DBCOLUMN:majsmaj.stat_puvod*/
		stat_puvod?: number|null;
		/**DBCOLUMN:majsmaj.ixs_esu_vyr*/
		ixs_esu_vyr?: string|null;
		/**DBCOLUMN:majsmaj.ixs_esu_dod*/
		ixs_esu_dod?: string|null;
		/**DBCOLUMN:majsmaj.ixs_esu_servis*/
		ixs_esu_servis?: string|null;
		/**DBCOLUMN:majsmaj.typ_maj*/
		typ_maj?: string|null;
		/**DBCOLUMN:majsmaj.ktg_zar*/
		ktg_zar?: number|null;
		/**DBCOLUMN:majsmaj.hmotnost*/
		hmotnost?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.prev_stav*/
		prev_stav?: number|null;
		/**DBCOLUMN:majsmaj.mobilita*/
		mobilita?: number|null;
		/**DBCOLUMN:majsmaj.trida_bezp*/
		trida_bezp?: number|null;
		/**DBCOLUMN:majsmaj.riziko_por*/
		riziko_por?: number|null;
		/**DBCOLUMN:majsmaj.rozmer_l*/
		rozmer_l?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.rozmer_w*/
		rozmer_w?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.rozmer_h*/
		rozmer_h?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_odpocet*/
		c_dph_odpocet?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.ixs_esu_vla*/
		ixs_esu_vla?: string|null;
		/**DBCOLUMN:majsmaj.gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:majsmaj.gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:majsmaj.ext_1*/
		ext_1?: number|null;
		/**DBCOLUMN:majsmaj.ext_2*/
		ext_2?: number|null;
		/**DBCOLUMN:majsmaj.ext_3*/
		ext_3?: number|null;
		/**DBCOLUMN:majsmaj.stav_maj*/
		stav_maj?: number|null;
		/**DBCOLUMN:majsmaj.id_krt_dev*/
		id_krt_dev?: string|null;
		/**DBCOLUMN:majsmaj.c_poriz*/
		c_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_poriz*/
		c_dph_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph_poriz*/
		c_c_dph_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_opr_pol*/
		c_opr_pol?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_opr_pol*/
		c_dph_opr_pol?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph_opr_pol*/
		c_c_dph_opr_pol?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_real*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_real*/
		c_dph_real?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph_real*/
		c_c_dph_real?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dotace*/
		c_dotace?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.ke_pap*/
		ke_pap?: string|null;
		/**DBCOLUMN:majsmaj.kt_pap*/
		kt_pap?: string|null;
		/**DBCOLUMN:majsmaj.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:majsmaj.id_maj*/
		id_maj?: string|null;
		/**DBCOLUMN:majsmaj.ktg_kp*/
		ktg_kp?: number|null;
		/**DBCOLUMN:majsmaj.cis_rejstrik_kp*/
		cis_rejstrik_kp?: string|null;
		/**DBCOLUMN:majsmaj.id_rejstrik_kp*/
		id_rejstrik_kp?: string|null;
		/**DBCOLUMN:majsmaj.cmj_pro1*/
		cmj_pro1?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.cmj_pro2*/
		cmj_pro2?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.cmj_pro3*/
		cmj_pro3?: JsonDecimal|null;
		/**gincsta.stat_txt*/
		stat_txt?: string|null;
		/**ixs_esu_vyr_txt*/
		ixs_esu_vyr_txt?: string|null;
		/**ixs_esu_dod_txt*/
		ixs_esu_dod_txt?: string|null;
		/**ixs_esu_servis_txt*/
		ixs_esu_servis_txt?: string|null;
		/**ktg_zar_txt*/
		ktg_zar_txt?: string|null;
		/**prev_stav_txt*/
		prev_stav_txt?: string|null;
		/**mobilita_txt*/
		mobilita_txt?: string|null;
		/**trida_bezp_txt*/
		trida_bezp_txt?: string|null;
		/**riziko_por_txt*/
		riziko_por_txt?: string|null;
		/**ixs_esu_vla_txt*/
		ixs_esu_vla_txt?: string|null;
		/**ext_1_txt*/
		ext_1_txt?: string|null;
		/**ext_2_txt*/
		ext_2_txt?: string|null;
		/**skupina_zkr*/
		skupina_zkr?: string|null;
		/**drh_zkr*/
		drh_zkr?: string|null;
		/**ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**ixs_ref_txt*/
		ixs_ref_txt?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**dev_txt*/
		dev_txt?: string|null;
		/**mat_akt_txt*/
		mat_akt_txt?: string|null;
		/**tev_txt*/
		tev_txt?: string|null;
		/**tka_txt*/
		tka_txt?: string|null;
		/**exists_rpren*/
		exists_rpren?: number|null;
		/**s_prodej_skm*/
		s_prodej_skm?: number|null;
		/**s_prodej_drm*/
		s_prodej_drm?: number|null;
		/**pocet*/
		pocet?: number|null;
		/**c_vstup_u*/
		c_vstup_u?: JsonDecimal|null;
		/**c_opr_u*/
		c_opr_u?: JsonDecimal|null;
		/**c_zust_u*/
		c_zust_u?: JsonDecimal|null;
		/**c_vstup_d*/
		c_vstup_d?: JsonDecimal|null;
		/**c_opr_d*/
		c_opr_d?: JsonDecimal|null;
		/**c_zust_d*/
		c_zust_d?: JsonDecimal|null;
		/**rokobd_odp_u*/
		rokobd_odp_u?: number|null;
		/**ktg_kp_txt*/
		ktg_kp_txt?: string|null;
	}
	const enum GMajInfoDtoNames { ixs_maj = "ixs_maj", lic = "lic", inv_cis = "inv_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", vyr_cis = "vyr_cis", rok_vyr = "rok_vyr", skp = "skp", nazev_skp = "nazev_skp", nazev = "nazev", ueab_por = "ueab_por", ueab_opr = "ueab_opr", ueab_evi = "ueab_evi", cmj = "cmj", pmj = "pmj", c = "c", pmj_min = "pmj_min", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", dat_vznik = "dat_vznik", ico = "ico", ucs = "ucs", nks = "nks", trida = "trida", stredisko = "stredisko", budova_kod = "budova_kod", mistnost_kod = "mistnost_kod", ixs_orj = "ixs_orj", ixs_ref = "ixs_ref", ixs_maj_nad = "ixs_maj_nad", typ_soubor = "typ_soubor", jmeno_soubor = "jmeno_soubor", inv_cis_soubor = "inv_cis_soubor", drh_id = "drh_id", skupina_id = "skupina_id", mj = "mj", skupina_odp = "skupina_odp", polozka_odp = "polozka_odp", tev = "tev", dev = "dev", tka = "tka", mat_akt = "mat_akt", kod_vyr = "kod_vyr", kod_por = "kod_por", poznamka = "poznamka", tisk_eti = "tisk_eti", pmj_res = "pmj_res", priz_odp = "priz_odp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pmj_max = "pmj_max", id_top = "id_top", id_mnoz = "id_mnoz", mat_cis = "mat_cis", sarze = "sarze", zev = "zev", expirace = "expirace", ean = "ean", dp_ode = "dp_ode", dan_typ = "dan_typ", c_dph = "c_dph", c_c_dph = "c_c_dph", kod_vyu = "kod_vyu", akce = "akce", segment_kod = "segment_kod", dat_uct_0123 = "dat_uct_0123", typ_dok_por = "typ_dok_por", typ_dok_vyr = "typ_dok_vyr", inv_in = "inv_in", lhuta_zaruka = "lhuta_zaruka", objekt = "objekt", stat_puvod = "stat_puvod", ixs_esu_vyr = "ixs_esu_vyr", ixs_esu_dod = "ixs_esu_dod", ixs_esu_servis = "ixs_esu_servis", typ_maj = "typ_maj", ktg_zar = "ktg_zar", hmotnost = "hmotnost", prev_stav = "prev_stav", mobilita = "mobilita", trida_bezp = "trida_bezp", riziko_por = "riziko_por", rozmer_l = "rozmer_l", rozmer_w = "rozmer_w", rozmer_h = "rozmer_h", c_dph_odpocet = "c_dph_odpocet", ixs_esu_vla = "ixs_esu_vla", gps_sirka = "gps_sirka", gps_delka = "gps_delka", ext_1 = "ext_1", ext_2 = "ext_2", ext_3 = "ext_3", stav_maj = "stav_maj", id_krt_dev = "id_krt_dev", c_poriz = "c_poriz", c_dph_poriz = "c_dph_poriz", c_c_dph_poriz = "c_c_dph_poriz", c_opr_pol = "c_opr_pol", c_dph_opr_pol = "c_dph_opr_pol", c_c_dph_opr_pol = "c_c_dph_opr_pol", c_real = "c_real", c_dph_real = "c_dph_real", c_c_dph_real = "c_c_dph_real", c_dotace = "c_dotace", ke_pap = "ke_pap", kt_pap = "kt_pap", dat_uup = "dat_uup", id_maj = "id_maj", ktg_kp = "ktg_kp", cis_rejstrik_kp = "cis_rejstrik_kp", id_rejstrik_kp = "id_rejstrik_kp", cmj_pro1 = "cmj_pro1", cmj_pro2 = "cmj_pro2", cmj_pro3 = "cmj_pro3", stat_txt = "stat_txt", ixs_esu_vyr_txt = "ixs_esu_vyr_txt", ixs_esu_dod_txt = "ixs_esu_dod_txt", ixs_esu_servis_txt = "ixs_esu_servis_txt", ktg_zar_txt = "ktg_zar_txt", prev_stav_txt = "prev_stav_txt", mobilita_txt = "mobilita_txt", trida_bezp_txt = "trida_bezp_txt", riziko_por_txt = "riziko_por_txt", ixs_esu_vla_txt = "ixs_esu_vla_txt", ext_1_txt = "ext_1_txt", ext_2_txt = "ext_2_txt", skupina_zkr = "skupina_zkr", drh_zkr = "drh_zkr", ixs_orj_txt = "ixs_orj_txt", ixs_ref_txt = "ixs_ref_txt", zmenu_prov_txt = "zmenu_prov_txt", dev_txt = "dev_txt", mat_akt_txt = "mat_akt_txt", tev_txt = "tev_txt", tka_txt = "tka_txt", exists_rpren = "exists_rpren", s_prodej_skm = "s_prodej_skm", s_prodej_drm = "s_prodej_drm", pocet = "pocet", c_vstup_u = "c_vstup_u", c_opr_u = "c_opr_u", c_zust_u = "c_zust_u", c_vstup_d = "c_vstup_d", c_opr_d = "c_opr_d", c_zust_d = "c_zust_d", rokobd_odp_u = "rokobd_odp_u", ktg_kp_txt = "ktg_kp_txt",}
	const enum GMajInfoDtoFragments { ixs_maj = "*", lic = "*", inv_cis = "*", ser_cis = "*", evi_cis = "*", vyr_cis = "*", rok_vyr = "*", skp = "*", nazev_skp = "*", nazev = "*", ueab_por = "*", ueab_opr = "*", ueab_evi = "*", cmj = "*", pmj = "*", c = "*", pmj_min = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", dat_vznik = "*", ico = "*", ucs = "*", nks = "*", trida = "*", stredisko = "*", budova_kod = "*", mistnost_kod = "*", ixs_orj = "*", ixs_ref = "*", ixs_maj_nad = "*", typ_soubor = "*", jmeno_soubor = "*", inv_cis_soubor = "*", drh_id = "*", skupina_id = "*", mj = "*", skupina_odp = "*", polozka_odp = "*", tev = "*", dev = "*", tka = "*", mat_akt = "*", kod_vyr = "*", kod_por = "*", poznamka = "*", tisk_eti = "*", pmj_res = "*", priz_odp = "*", dat_zmena = "*", zmenu_prov = "*", pmj_max = "*", id_top = "*", id_mnoz = "*", mat_cis = "*", sarze = "*", zev = "*", expirace = "*", ean = "*", dp_ode = "*", dan_typ = "*", c_dph = "*", c_c_dph = "*", kod_vyu = "*", akce = "*", segment_kod = "*", dat_uct_0123 = "*", typ_dok_por = "*", typ_dok_vyr = "*", inv_in = "*", lhuta_zaruka = "*", objekt = "*", stat_puvod = "*", ixs_esu_vyr = "*", ixs_esu_dod = "*", ixs_esu_servis = "*", typ_maj = "*", ktg_zar = "*", hmotnost = "*", prev_stav = "*", mobilita = "*", trida_bezp = "*", riziko_por = "*", rozmer_l = "*", rozmer_w = "*", rozmer_h = "*", c_dph_odpocet = "*", ixs_esu_vla = "*", gps_sirka = "*", gps_delka = "*", ext_1 = "*", ext_2 = "*", ext_3 = "*", stav_maj = "*", id_krt_dev = "*", c_poriz = "*", c_dph_poriz = "*", c_c_dph_poriz = "*", c_opr_pol = "*", c_dph_opr_pol = "*", c_c_dph_opr_pol = "*", c_real = "*", c_dph_real = "*", c_c_dph_real = "*", c_dotace = "*", ke_pap = "*", kt_pap = "*", dat_uup = "*", id_maj = "*", ktg_kp = "*", cis_rejstrik_kp = "*", id_rejstrik_kp = "*", cmj_pro1 = "*", cmj_pro2 = "*", cmj_pro3 = "*", stat_txt = "*", ixs_esu_vyr_txt = "*", ixs_esu_dod_txt = "*", ixs_esu_servis_txt = "*", ktg_zar_txt = "*", prev_stav_txt = "*", mobilita_txt = "*", trida_bezp_txt = "*", riziko_por_txt = "*", ixs_esu_vla_txt = "*", ext_1_txt = "*", ext_2_txt = "*", skupina_zkr = "*", drh_zkr = "*", ixs_orj_txt = "*", ixs_ref_txt = "*", zmenu_prov_txt = "*", dev_txt = "*", mat_akt_txt = "*", tev_txt = "*", tka_txt = "*", exists_rpren = "*", s_prodej_skm = "*", s_prodej_drm = "*", pocet = "*", c_vstup_u = "*", c_opr_u = "*", c_zust_u = "*", c_vstup_d = "*", c_opr_d = "*", c_zust_d = "*", rokobd_odp_u = "*", ktg_kp_txt = "*",}
	const enum GMajInfoDtoTypes { ixs_maj = "string", lic = "string", inv_cis = "string", ser_cis = "string", evi_cis = "string", vyr_cis = "string", rok_vyr = "number", skp = "string", nazev_skp = "string", nazev = "string", ueab_por = "string", ueab_opr = "string", ueab_evi = "string", cmj = "JsonDecimal", pmj = "JsonDecimal", c = "JsonDecimal", pmj_min = "JsonDecimal", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", dat_vznik = "JsonDate", ico = "string", ucs = "string", nks = "string", trida = "string", stredisko = "string", budova_kod = "string", mistnost_kod = "string", ixs_orj = "string", ixs_ref = "string", ixs_maj_nad = "string", typ_soubor = "number", jmeno_soubor = "string", inv_cis_soubor = "string", drh_id = "number", skupina_id = "number", mj = "string", skupina_odp = "string", polozka_odp = "number", tev = "number", dev = "number", tka = "number", mat_akt = "number", kod_vyr = "number", kod_por = "number", poznamka = "string", tisk_eti = "number", pmj_res = "JsonDecimal", priz_odp = "number", dat_zmena = "JsonDate", zmenu_prov = "string", pmj_max = "JsonDecimal", id_top = "string", id_mnoz = "number", mat_cis = "string", sarze = "string", zev = "number", expirace = "JsonDate", ean = "string", dp_ode = "JsonDecimal", dan_typ = "number", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", kod_vyu = "number", akce = "string", segment_kod = "string", dat_uct_0123 = "JsonDate", typ_dok_por = "number", typ_dok_vyr = "number", inv_in = "number", lhuta_zaruka = "number", objekt = "string", stat_puvod = "number", ixs_esu_vyr = "string", ixs_esu_dod = "string", ixs_esu_servis = "string", typ_maj = "string", ktg_zar = "number", hmotnost = "JsonDecimal", prev_stav = "number", mobilita = "number", trida_bezp = "number", riziko_por = "number", rozmer_l = "JsonDecimal", rozmer_w = "JsonDecimal", rozmer_h = "JsonDecimal", c_dph_odpocet = "JsonDecimal", ixs_esu_vla = "string", gps_sirka = "string", gps_delka = "string", ext_1 = "number", ext_2 = "number", ext_3 = "number", stav_maj = "number", id_krt_dev = "string", c_poriz = "JsonDecimal", c_dph_poriz = "JsonDecimal", c_c_dph_poriz = "JsonDecimal", c_opr_pol = "JsonDecimal", c_dph_opr_pol = "JsonDecimal", c_c_dph_opr_pol = "JsonDecimal", c_real = "JsonDecimal", c_dph_real = "JsonDecimal", c_c_dph_real = "JsonDecimal", c_dotace = "JsonDecimal", ke_pap = "string", kt_pap = "string", dat_uup = "JsonDate", id_maj = "string", ktg_kp = "number", cis_rejstrik_kp = "string", id_rejstrik_kp = "string", cmj_pro1 = "JsonDecimal", cmj_pro2 = "JsonDecimal", cmj_pro3 = "JsonDecimal", stat_txt = "string", ixs_esu_vyr_txt = "string", ixs_esu_dod_txt = "string", ixs_esu_servis_txt = "string", ktg_zar_txt = "string", prev_stav_txt = "string", mobilita_txt = "string", trida_bezp_txt = "string", riziko_por_txt = "string", ixs_esu_vla_txt = "string", ext_1_txt = "string", ext_2_txt = "string", skupina_zkr = "string", drh_zkr = "string", ixs_orj_txt = "string", ixs_ref_txt = "string", zmenu_prov_txt = "string", dev_txt = "string", mat_akt_txt = "string", tev_txt = "string", tka_txt = "string", exists_rpren = "number", s_prodej_skm = "number", s_prodej_drm = "number", pocet = "number", c_vstup_u = "JsonDecimal", c_opr_u = "JsonDecimal", c_zust_u = "JsonDecimal", c_vstup_d = "JsonDecimal", c_opr_d = "JsonDecimal", c_zust_d = "JsonDecimal", rokobd_odp_u = "number", ktg_kp_txt = "string",}
	const enum GMajInfoDtoTypeLengths { ixs_maj = 12, lic = 4, inv_cis = 12, ser_cis = 40, evi_cis = 40, vyr_cis = 40, skp = 15, nazev_skp = 254, nazev = 254, ueab_por = 7, ueab_opr = 7, ueab_evi = 7, ico = 10, ucs = 10, nks = 12, trida = 4, stredisko = 6, budova_kod = 8, mistnost_kod = 8, ixs_orj = 12, ixs_ref = 12, ixs_maj_nad = 12, jmeno_soubor = 50, inv_cis_soubor = 12, mj = 5, skupina_odp = 4, poznamka = 50, zmenu_prov = 12, id_top = 12, mat_cis = 20, sarze = 20, ean = 13, akce = 20, segment_kod = 8, objekt = 8, ixs_esu_vyr = 12, ixs_esu_dod = 12, ixs_esu_servis = 12, typ_maj = 50, ixs_esu_vla = 12, gps_sirka = 12, gps_delka = 12, id_krt_dev = 20, ke_pap = 5, kt_pap = 5, id_maj = 40, cis_rejstrik_kp = 20, id_rejstrik_kp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GMaskyVlastnostiDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro masku vlastností*/
	interface GMaskyVlastnostiDto {
		/**DBCOLUMN:ginvtvl.ixs*/
		ixs_vla?: string|null;
		/**název vlastnosti*/
		ixs_vla_txt?: string|null;
		/**profil*/
		ixs_pro?: string|null;
		/**struktura vlastnosti*/
		ixs_stv?: string|null;
		/**hodnota vlastnosti*/
		hovla?: string|null;
	}
	const enum GMaskyVlastnostiDtoNames { ixs_vla = "ixs_vla", ixs_vla_txt = "ixs_vla_txt", ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", hovla = "hovla",}
	const enum GMaskyVlastnostiDtoFragments { ixs_vla = "*", ixs_vla_txt = "*", ixs_pro = "*", ixs_stv = "*", hovla = "*",}
	const enum GMaskyVlastnostiDtoTypes { ixs_vla = "string", ixs_vla_txt = "string", ixs_pro = "string", ixs_stv = "string", hovla = "string",}
	const enum GMaskyVlastnostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GRezIisspDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:sspdppr*/
	interface GRezIisspDtoDto {
		/**DBCOLUMN:sspdppr.ixs_hpr*/
		ixs_hpr?: string|null;
		/**DBCOLUMN:sspdppr.radek_gin*/
		radek_gin?: number|null;
		/**DBCOLUMN:sspdppr.subradek_gin*/
		subradek_gin?: number|null;
		/**DBCOLUMN:sspdppr.id_hdr*/
		id_hdr?: string|null;
		/**DBCOLUMN:sspdppr.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:sspdppr.id_hdr_vcl*/
		id_hdr_vcl?: number|null;
		/**DBCOLUMN:sspdppr.radek_hdr_vcl*/
		radek_hdr_vcl?: number|null;
		/**DBCOLUMN:sspdppr.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:sspdppr.c_rsp*/
		c_rsp?: JsonDecimal|null;
		/**DBCOLUMN:sspdppr.popis*/
		popis?: string|null;
		/**DBCOLUMN:sspdppr.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:sspdppr.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:sspdppr.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:sspdppr.isp_pol*/
		isp_pol?: string|null;
		/**DBCOLUMN:sspdppr.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:sspdppr.eds_dok*/
		eds_dok?: string|null;
		/**DBCOLUMN:sspdppr.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:sspdppr.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:sspdppr.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:sspdppr.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:sspdppr.isp_uz*/
		isp_uz?: string|null;
		/**DBCOLUMN:sspdppr.s_rezsp*/
		s_rezsp?: number|null;
		/**DBCOLUMN:sspdppr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sspdppr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sspdppr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sspdppr.s_rezsp_x*/
		s_rezsp_x?: number|null;
		/**DBCOLUMN:sspdppr.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**DBCOLUMN:sspdppr.radek_hdr_tmp*/
		radek_hdr_tmp?: number|null;
		/**DBCOLUMN:sspdppr.dat_vyriz_zal*/
		dat_vyriz_zal?: JsonDate|null;
		/**DBCOLUMN:sspdppr.dat_vyriz_akt*/
		dat_vyriz_akt?: JsonDate|null;
		/**DBCOLUMN:sspdppr.dat_rad_min*/
		dat_rad_min?: JsonDate|null;
		/**DBCOLUMN:sspdppr.dat_rad_max*/
		dat_rad_max?: JsonDate|null;
		/**DBCOLUMN:sspdppr.c_rsp_ris*/
		c_rsp_ris?: JsonDecimal|null;
		/**sspshdr.rok*/
		rok?: number|null;
		/**sspshdr.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:sspdppr.s_rezsp_x*/
		s_rezsp_txt?: number|null;
		/**DBCOLUMN:sspdppr.isp_uj*/
		isp_kap?: string|null;
	}
	const enum GRezIisspDtoDtoNames { ixs_hpr = "ixs_hpr", radek_gin = "radek_gin", subradek_gin = "subradek_gin", id_hdr = "id_hdr", radek_hdr = "radek_hdr", id_hdr_vcl = "id_hdr_vcl", radek_hdr_vcl = "radek_hdr_vcl", dat_spl = "dat_spl", c_rsp = "c_rsp", popis = "popis", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", eds_dok = "eds_dok", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", s_rezsp = "s_rezsp", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_rezsp_x = "s_rezsp_x", radek_hdr_ris = "radek_hdr_ris", radek_hdr_tmp = "radek_hdr_tmp", dat_vyriz_zal = "dat_vyriz_zal", dat_vyriz_akt = "dat_vyriz_akt", dat_rad_min = "dat_rad_min", dat_rad_max = "dat_rad_max", c_rsp_ris = "c_rsp_ris", rok = "rok", id_hdr_ris = "id_hdr_ris", s_rezsp_txt = "s_rezsp_txt", isp_kap = "isp_kap",}
	const enum GRezIisspDtoDtoFragments { ixs_hpr = "*", radek_gin = "*", subradek_gin = "*", id_hdr = "*", radek_hdr = "*", id_hdr_vcl = "*", radek_hdr_vcl = "*", dat_spl = "*", c_rsp = "*", popis = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", eds_dok = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", s_rezsp = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", s_rezsp_x = "*", radek_hdr_ris = "*", radek_hdr_tmp = "*", dat_vyriz_zal = "*", dat_vyriz_akt = "*", dat_rad_min = "*", dat_rad_max = "*", c_rsp_ris = "*", rok = "*", id_hdr_ris = "*", s_rezsp_txt = "*", isp_kap = "*",}
	const enum GRezIisspDtoDtoTypes { ixs_hpr = "string", radek_gin = "number", subradek_gin = "number", id_hdr = "string", radek_hdr = "number", id_hdr_vcl = "number", radek_hdr_vcl = "number", dat_spl = "JsonDate", c_rsp = "JsonDecimal", popis = "string", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", eds_dok = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", s_rezsp = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_rezsp_x = "number", radek_hdr_ris = "number", radek_hdr_tmp = "number", dat_vyriz_zal = "JsonDate", dat_vyriz_akt = "JsonDate", dat_rad_min = "JsonDate", dat_rad_max = "JsonDate", c_rsp_ris = "JsonDecimal", rok = "number", id_hdr_ris = "string", s_rezsp_txt = "number", isp_kap = "string",}
	const enum GRezIisspDtoDtoTypeLengths { ixs_hpr = 12, id_hdr = 10, popis = 60, isp_fim = 16, isp_zdr = 10, isp_par = 16, isp_pol = 24, isp_eds = 15, eds_dok = 30, isp_pvs = 10, isp_ucl = 9, isp_zj = 3, isp_uj = 6, isp_uz = 7, zmenu_prov = 12, isp_kap = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GRezIisspHromDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:sspshdr*/
	interface GRezIisspHromDto {
		/**DBCOLUMN:sspshdr.ixs_hpr*/
		ixs_hpr?: string|null;
		/**DBCOLUMN:sspshdr.id_hdr*/
		id_hdr?: number|null;
		/**DBCOLUMN:sspshdr.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:sspshdr.dokl_id_volani*/
		dokl_id_volani?: number|null;
		/**ac_sml*/
		ac_sml?: string|null;
		/**stav_rezervace*/
		stav_rezervace?: string|null;
		/**stav*/
		stav?: string|null;
		/**ginis_kom_chyba*/
		ginis_kom_chyba?: string|null;
	}
	const enum GRezIisspHromDtoNames { ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", id_hdr_ris = "id_hdr_ris", dokl_id_volani = "dokl_id_volani", ac_sml = "ac_sml", stav_rezervace = "stav_rezervace", stav = "stav", ginis_kom_chyba = "ginis_kom_chyba",}
	const enum GRezIisspHromDtoFragments { ixs_hpr = "*", id_hdr = "*", id_hdr_ris = "*", dokl_id_volani = "*", ac_sml = "*", stav_rezervace = "*", stav = "*", ginis_kom_chyba = "*",}
	const enum GRezIisspHromDtoTypes { ixs_hpr = "string", id_hdr = "number", id_hdr_ris = "string", dokl_id_volani = "number", ac_sml = "string", stav_rezervace = "string", stav = "string", ginis_kom_chyba = "string",}
	const enum GRezIisspHromDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlAccessDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto parametrů pro detail smlouvy*/
	interface GSmlAccessDto {
		/**param*/
		sml_rad_dokpod?: boolean|null;
		/**param*/
		sml_rad_dokevi?: boolean|null;
		/**param*/
		sml_rad_dokval?: boolean|null;
		/**param*/
		sml_rad_doksto?: boolean|null;
		/**param*/
		sml_rad_dokuzav?: boolean|null;
		/**param*/
		sml_rad_dokclsa?: boolean|null;
		/**param*/
		sml_rad_dokprd?: boolean|null;
		/**param*/
		sml_rad_accmode?: boolean|null;
		/**param*/
		sml_rad_dokfree?: boolean|null;
		/**param*/
		sml_rad_doksgn?: boolean|null;
		/**param*/
		sml_rad_doksuza?: boolean|null;
		/**param*/
		sml_rad_dokusgn?: boolean|null;
		/**param*/
		sml_rad_doksval?: boolean|null;
		/**param*/
		sml_rad_dokssto?: boolean|null;
		/**param*/
		sml_rad_dokvyp?: boolean|null;
		/**param*/
		sml_rad_dokprv?: boolean|null;
		/**param*/
		sml_rad_dokpri?: boolean|null;
		/**param*/
		sml_rad_blkchng?: boolean|null;
		/**param*/
		gin_rad_epkpri?: boolean|null;
		/**param*/
		gin_epk_schval?: boolean|null;
		/**param*/
		checkPolLicCertificate?: boolean|null;
		/**param*/
		sml_rad_chgacag?: boolean|null;
		/**param*/
		ssl_pridel_zru?: boolean|null;
		/**param*/
		sml_rad_iissact?: boolean|null;
		/**param*/
		sml_rad_publdoc?: boolean|null;
	}
	const enum GSmlAccessDtoNames { sml_rad_dokpod = "sml_rad_dokpod", sml_rad_dokevi = "sml_rad_dokevi", sml_rad_dokval = "sml_rad_dokval", sml_rad_doksto = "sml_rad_doksto", sml_rad_dokuzav = "sml_rad_dokuzav", sml_rad_dokclsa = "sml_rad_dokclsa", sml_rad_dokprd = "sml_rad_dokprd", sml_rad_accmode = "sml_rad_accmode", sml_rad_dokfree = "sml_rad_dokfree", sml_rad_doksgn = "sml_rad_doksgn", sml_rad_doksuza = "sml_rad_doksuza", sml_rad_dokusgn = "sml_rad_dokusgn", sml_rad_doksval = "sml_rad_doksval", sml_rad_dokssto = "sml_rad_dokssto", sml_rad_dokvyp = "sml_rad_dokvyp", sml_rad_dokprv = "sml_rad_dokprv", sml_rad_dokpri = "sml_rad_dokpri", sml_rad_blkchng = "sml_rad_blkchng", gin_rad_epkpri = "gin_rad_epkpri", gin_epk_schval = "gin_epk_schval", checkPolLicCertificate = "checkPolLicCertificate", sml_rad_chgacag = "sml_rad_chgacag", ssl_pridel_zru = "ssl_pridel_zru", sml_rad_iissact = "sml_rad_iissact", sml_rad_publdoc = "sml_rad_publdoc",}
	const enum GSmlAccessDtoFragments { sml_rad_dokpod = "*", sml_rad_dokevi = "*", sml_rad_dokval = "*", sml_rad_doksto = "*", sml_rad_dokuzav = "*", sml_rad_dokclsa = "*", sml_rad_dokprd = "*", sml_rad_accmode = "*", sml_rad_dokfree = "*", sml_rad_doksgn = "*", sml_rad_doksuza = "*", sml_rad_dokusgn = "*", sml_rad_doksval = "*", sml_rad_dokssto = "*", sml_rad_dokvyp = "*", sml_rad_dokprv = "*", sml_rad_dokpri = "*", sml_rad_blkchng = "*", gin_rad_epkpri = "*", gin_epk_schval = "*", checkPolLicCertificate = "*", sml_rad_chgacag = "*", ssl_pridel_zru = "*", sml_rad_iissact = "*", sml_rad_publdoc = "*",}
	const enum GSmlAccessDtoTypes { sml_rad_dokpod = "boolean", sml_rad_dokevi = "boolean", sml_rad_dokval = "boolean", sml_rad_doksto = "boolean", sml_rad_dokuzav = "boolean", sml_rad_dokclsa = "boolean", sml_rad_dokprd = "boolean", sml_rad_accmode = "boolean", sml_rad_dokfree = "boolean", sml_rad_doksgn = "boolean", sml_rad_doksuza = "boolean", sml_rad_dokusgn = "boolean", sml_rad_doksval = "boolean", sml_rad_dokssto = "boolean", sml_rad_dokvyp = "boolean", sml_rad_dokprv = "boolean", sml_rad_dokpri = "boolean", sml_rad_blkchng = "boolean", gin_rad_epkpri = "boolean", gin_epk_schval = "boolean", checkPolLicCertificate = "boolean", sml_rad_chgacag = "boolean", ssl_pridel_zru = "boolean", sml_rad_iissact = "boolean", sml_rad_publdoc = "boolean",}
	const enum GSmlAccessDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlBlkDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**zaznam blk*/
	interface GSmlBlkDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ixp_nab*/
		ixp_nab?: string|null;
		/**typ_pen*/
		typ_ag_blok?: number|null;
		/**vys_riz*/
		vys_riz?: number|null;
		/**s_ess*/
		s_ess?: number|null;
		/**rza*/
		por_cislo_nab?: number|null;
	}
	const enum GSmlBlkDtoNames { ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", typ_ag_blok = "typ_ag_blok", vys_riz = "vys_riz", s_ess = "s_ess", por_cislo_nab = "por_cislo_nab",}
	const enum GSmlBlkDtoFragments { ixs_pri = "*", ixp_nab = "*", typ_ag_blok = "*", vys_riz = "*", s_ess = "*", por_cislo_nab = "*",}
	const enum GSmlBlkDtoTypes { ixs_pri = "string", ixp_nab = "string", typ_ag_blok = "number", vys_riz = "number", s_ess = "number", por_cislo_nab = "number",}
	const enum GSmlBlkDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlddodDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlddod*/
	interface GSmlddodDto {
		/**DBCOLUMN:smlddod.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlddod.cislo*/
		cislo?: number|null;
		/**DBCOLUMN:smlddod.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlddod.rok*/
		rok?: number|null;
		/**DBCOLUMN:smlddod.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlddod.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlddod.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:smlddod.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:smlddod.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:smlddod.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlddod.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:smlddod.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlddod.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlddod.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:smlddod.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:smlddod.cislo_pol*/
		cislo_pol?: number|null;
		/**DBCOLUMN:smlddod.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlddod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:smlddod.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:smlddod.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:smlddod.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:smlddod.mena*/
		mena?: number|null;
		/**DBCOLUMN:smlddod.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:smlddod.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:smlddod.ktg_dod*/
		ktg_dod?: number|null;
		/**DBCOLUMN:smlddod.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:smlddod.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlddod.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:smlddod.sk_vl*/
		sk_vl?: string|null;
		/**max_rok_pol*/
		max_rok_pol?: number|null;
		/**pid_ixs_fun_vyriz*/
		pid_ixs_fun_vyriz?: string|null;
		/**pid_ixs_fun_ref*/
		pid_ixs_fun_ref?: string|null;
		/**pid_popis*/
		pid_popis?: string|null;
		/**pid_poznamka*/
		pid_poznamka?: string|null;
		/**dat_platnost_pid*/
		dat_platnost_pid?: JsonDate|null;
		/**pid_ktg_typ*/
		pid_ktg_typ?: number|null;
		/**pid_ixs_typ*/
		pid_ixs_typ?: string|null;
		/**počet roků platnosti smlouvy*/
		num_rok_pid?: number|null;
		/**počet roků platnosti dodatku*/
		num_rok?: number|null;
		/**pid_bu_ci*/
		pid_bu_ci?: string|null;
		/**pid_sk_ci*/
		pid_sk_ci?: string|null;
		/**mena_zkr*/
		mena_zkr?: string|null;
		/**ixs_fun_vyriz_nazev*/
		ixs_fun_vyriz_nazev?: string|null;
		/**ixs_fun_vyriz_nazev*/
		ixs_fun_ref_nazev?: string|null;
		/**ssl_typ_nazev*/
		ssl_typ_nazev?: string|null;
		/**pocet_smlddor*/
		pocet_smlddor?: number|null;
	}
	const enum GSmlddodDtoNames { ixp = "ixp", cislo = "cislo", ac_sml = "ac_sml", rok = "rok", c = "c", ixs_fun_vyriz = "ixs_fun_vyriz", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", popis = "popis", poznamka = "poznamka", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", sml_stav = "sml_stav", ixs_fun_ref = "ixs_fun_ref", cislo_pol = "cislo_pol", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_mena = "c_mena", m = "m", kurz = "kurz", mena = "mena", fin_od = "fin_od", fin_do = "fin_do", ktg_dod = "ktg_dod", bu_ci = "bu_ci", sk_ci = "sk_ci", bu_vl = "bu_vl", sk_vl = "sk_vl", max_rok_pol = "max_rok_pol", pid_ixs_fun_vyriz = "pid_ixs_fun_vyriz", pid_ixs_fun_ref = "pid_ixs_fun_ref", pid_popis = "pid_popis", pid_poznamka = "pid_poznamka", dat_platnost_pid = "dat_platnost_pid", pid_ktg_typ = "pid_ktg_typ", pid_ixs_typ = "pid_ixs_typ", num_rok_pid = "num_rok_pid", num_rok = "num_rok", pid_bu_ci = "pid_bu_ci", pid_sk_ci = "pid_sk_ci", mena_zkr = "mena_zkr", ixs_fun_vyriz_nazev = "ixs_fun_vyriz_nazev", ixs_fun_ref_nazev = "ixs_fun_ref_nazev", ssl_typ_nazev = "ssl_typ_nazev", pocet_smlddor = "pocet_smlddor",}
	const enum GSmlddodDtoFragments { ixp = "*", cislo = "*", ac_sml = "*", rok = "*", c = "*", ixs_fun_vyriz = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", popis = "*", poznamka = "*", ktg_typ = "*", ixs_typ = "*", sml_stav = "*", ixs_fun_ref = "*", cislo_pol = "*", dat_zmena = "*", zmenu_prov = "*", c_mena = "*", m = "*", kurz = "*", mena = "*", fin_od = "*", fin_do = "*", ktg_dod = "*", bu_ci = "*", sk_ci = "*", bu_vl = "*", sk_vl = "*", max_rok_pol = "*", pid_ixs_fun_vyriz = "*", pid_ixs_fun_ref = "*", pid_popis = "*", pid_poznamka = "*", dat_platnost_pid = "*", pid_ktg_typ = "*", pid_ixs_typ = "*", num_rok_pid = "*", num_rok = "*", pid_bu_ci = "*", pid_sk_ci = "*", mena_zkr = "*", ixs_fun_vyriz_nazev = "*", ixs_fun_ref_nazev = "*", ssl_typ_nazev = "*", pocet_smlddor = "*",}
	const enum GSmlddodDtoTypes { ixp = "string", cislo = "number", ac_sml = "string", rok = "number", c = "JsonDecimal", ixs_fun_vyriz = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", popis = "string", poznamka = "string", ktg_typ = "number", ixs_typ = "string", sml_stav = "number", ixs_fun_ref = "string", cislo_pol = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_mena = "JsonDecimal", m = "JsonDecimal", kurz = "JsonDecimal", mena = "number", fin_od = "number", fin_do = "number", ktg_dod = "number", bu_ci = "string", sk_ci = "string", bu_vl = "string", sk_vl = "string", max_rok_pol = "number", pid_ixs_fun_vyriz = "string", pid_ixs_fun_ref = "string", pid_popis = "string", pid_poznamka = "string", dat_platnost_pid = "JsonDate", pid_ktg_typ = "number", pid_ixs_typ = "string", num_rok_pid = "number", num_rok = "number", pid_bu_ci = "string", pid_sk_ci = "string", mena_zkr = "string", ixs_fun_vyriz_nazev = "string", ixs_fun_ref_nazev = "string", ssl_typ_nazev = "string", pocet_smlddor = "number",}
	const enum GSmlddodDtoTypeLengths { ixp = 12, ac_sml = 30, ixs_fun_vyriz = 12, popis = 254, poznamka = 500, ixs_typ = 12, ixs_fun_ref = 12, zmenu_prov = 12, bu_ci = 34, sk_ci = 11, bu_vl = 34, sk_vl = 11,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlddorDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlddor*/
	interface GSmlddorDto {
		/**DBCOLUMN:smlddor.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlddor.cislo*/
		cislo?: number|null;
		/**DBCOLUMN:smlddor.rok*/
		rok?: number|null;
		/**DBCOLUMN:smlddor.mena*/
		mena?: number|null;
		/**DBCOLUMN:smlddor.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:smlddor.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:smlddor.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:smlddor.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlddor.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:smlddor.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlddor.zmenu_prov*/
		zmenu_prov?: string|null;
		/**mena_zkr*/
		mena_zkr?: string|null;
	}
	const enum GSmlddorDtoNames { ixp = "ixp", cislo = "cislo", rok = "rok", mena = "mena", c_mena = "c_mena", m = "m", kurz = "kurz", c = "c", sml_stav = "sml_stav", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_zkr = "mena_zkr",}
	const enum GSmlddorDtoFragments { ixp = "*", cislo = "*", rok = "*", mena = "*", c_mena = "*", m = "*", kurz = "*", c = "*", sml_stav = "*", dat_zmena = "*", zmenu_prov = "*", mena_zkr = "*",}
	const enum GSmlddorDtoTypes { ixp = "string", cislo = "number", rok = "number", mena = "number", c_mena = "JsonDecimal", m = "JsonDecimal", kurz = "JsonDecimal", c = "JsonDecimal", sml_stav = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_zkr = "string",}
	const enum GSmlddorDtoTypeLengths { ixp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlDetailCommonDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Společné údaje pro detail*/
	interface GSmlDetailCommonDto {
		/**Typ dokladu*/
		TypDok?: number|null;
		/**Mod dokladu*/
		ModeDok?: number|null;
		/**příznak, že případ rezervace v IISSP je ve stavu Odesláno - zmrazí úpravu financování*/
		RezIISSPOdeslano?: number|null;
		/**Datum odeslání*/
		DatOdes?: JsonDate|null;
		/**Stav doručení*/
		SDor?: number|null;
		/**Název stavu doručení*/
		SDorTxt?: string|null;
		/**kurs střed z kursovního lístku*/
		KurzStred?: JsonDecimal|null;
		/**typ dokladu nadřazené smlouvy*/
		IxsTypNad?: string|null;
		/**kategorie nadřazené smlouvy*/
		KtgTypNad?: number|null;
		/**stav položek smlouvy*/
		UpStav?: number|null;
		/**důvod storna*/
		StornoDuvod?: string|null;
		/**identifikátor žádosti o založení dokladu*/
		IxpExt?: string|null;
		/**prefix*/
		RcpPrefix?: string|null;
		/**suffix*/
		RcpSuffix?: string|null;
		/**NSmlRadaAcSml*/
		NSmlRadaAcSml?: number|null;
		/**počet dodatků smlouvy*/
		NumDodOld?: number|null;
		/**IxsOrjKomp*/
		IxsOrjKomp?: string|null;
	}
	const enum GSmlDetailCommonDtoNames { TypDok = "TypDok", ModeDok = "ModeDok", RezIISSPOdeslano = "RezIISSPOdeslano", DatOdes = "DatOdes", SDor = "SDor", SDorTxt = "SDorTxt", KurzStred = "KurzStred", IxsTypNad = "IxsTypNad", KtgTypNad = "KtgTypNad", UpStav = "UpStav", StornoDuvod = "StornoDuvod", IxpExt = "IxpExt", RcpPrefix = "RcpPrefix", RcpSuffix = "RcpSuffix", NSmlRadaAcSml = "NSmlRadaAcSml", NumDodOld = "NumDodOld", IxsOrjKomp = "IxsOrjKomp",}
	const enum GSmlDetailCommonDtoFragments { TypDok = "*", ModeDok = "*", RezIISSPOdeslano = "*", DatOdes = "*", SDor = "*", SDorTxt = "*", KurzStred = "*", IxsTypNad = "*", KtgTypNad = "*", UpStav = "*", StornoDuvod = "*", IxpExt = "*", RcpPrefix = "*", RcpSuffix = "*", NSmlRadaAcSml = "*", NumDodOld = "*", IxsOrjKomp = "*",}
	const enum GSmlDetailCommonDtoTypes { TypDok = "number", ModeDok = "number", RezIISSPOdeslano = "number", DatOdes = "JsonDate", SDor = "number", SDorTxt = "string", KurzStred = "JsonDecimal", IxsTypNad = "string", KtgTypNad = "number", UpStav = "number", StornoDuvod = "string", IxpExt = "string", RcpPrefix = "string", RcpSuffix = "string", NSmlRadaAcSml = "number", NumDodOld = "number", IxsOrjKomp = "string",}
	const enum GSmlDetailCommonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlDetailEnableDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro umožnění přístupu k různé funkcionalitě na detailu*/
	interface GSmlDetailEnableDto {
		/**location*/
		location?: boolean|null;
		/**agenda*/
		agenda?: boolean|null;
		/**parametr*/
		new_dok?: boolean|null;
		/**parametr*/
		evid?: boolean|null;
		/**parametr*/
		validate?: boolean|null;
		/**parametr*/
		storno_dok?: boolean|null;
		/**parametr*/
		close?: boolean|null;
		/**parametr*/
		change_loc?: boolean|null;
		/**parametr*/
		pol?: boolean|null;
		/**parametr*/
		dod?: boolean|null;
		/**parametr*/
		plk?: boolean|null;
		/**parametr*/
		info?: boolean|null;
		/**parametr*/
		print?: boolean|null;
		/**parametr*/
		free?: boolean|null;
		/**parametr*/
		sign?: boolean|null;
		/**parametr*/
		fin?: boolean|null;
		/**parametr*/
		storno_close?: boolean|null;
		/**parametr*/
		blok?: boolean|null;
		/**parametr*/
		storno_sgn?: boolean|null;
		/**parametr*/
		storno_validate?: boolean|null;
		/**parametr*/
		storno_storno?: boolean|null;
		/**parametr*/
		pol_vp?: boolean|null;
		/**parametr*/
		copy?: boolean|null;
		/**parametr*/
		odeslat?: boolean|null;
		/**parametr*/
		predat?: boolean|null;
		/**parametr*/
		prevzit?: boolean|null;
		/**parametr*/
		pridelit?: boolean|null;
		/**parametr*/
		show_ele?: boolean|null;
		/**parametr*/
		edit_ele?: boolean|null;
		/**parametr*/
		insert_ele?: boolean|null;
		/**parametr*/
		pol_pzp?: boolean|null;
		/**parametr*/
		change_blk?: boolean|null;
		/**parametr*/
		noact_ele?: boolean|null;
		/**parametr*/
		delete_ele?: boolean|null;
		/**parametr*/
		ins_epk?: boolean|null;
		/**parametr*/
		schval_proces?: boolean|null;
		/**parametr*/
		fin_kontrola?: boolean|null;
		/**parametr*/
		chg_ac_sml?: boolean|null;
		/**parametr*/
		iissp?: boolean|null;
		/**parametr*/
		zrusit_pridelit?: boolean|null;
		/**parametr*/
		iissp_prep?: boolean|null;
		/**parametr*/
		public_doc?: boolean|null;
		/**parametr*/
		typ_no_eko_fin?: boolean|null;
		/**parametr*/
		typ_no_eko_pol?: boolean|null;
	}
	const enum GSmlDetailEnableDtoNames { location = "location", agenda = "agenda", new_dok = "new_dok", evid = "evid", validate = "validate", storno_dok = "storno_dok", close = "close", change_loc = "change_loc", pol = "pol", dod = "dod", plk = "plk", info = "info", print = "print", free = "free", sign = "sign", fin = "fin", storno_close = "storno_close", blok = "blok", storno_sgn = "storno_sgn", storno_validate = "storno_validate", storno_storno = "storno_storno", pol_vp = "pol_vp", copy = "copy", odeslat = "odeslat", predat = "predat", prevzit = "prevzit", pridelit = "pridelit", show_ele = "show_ele", edit_ele = "edit_ele", insert_ele = "insert_ele", pol_pzp = "pol_pzp", change_blk = "change_blk", noact_ele = "noact_ele", delete_ele = "delete_ele", ins_epk = "ins_epk", schval_proces = "schval_proces", fin_kontrola = "fin_kontrola", chg_ac_sml = "chg_ac_sml", iissp = "iissp", zrusit_pridelit = "zrusit_pridelit", iissp_prep = "iissp_prep", public_doc = "public_doc", typ_no_eko_fin = "typ_no_eko_fin", typ_no_eko_pol = "typ_no_eko_pol",}
	const enum GSmlDetailEnableDtoFragments { location = "*", agenda = "*", new_dok = "*", evid = "*", validate = "*", storno_dok = "*", close = "*", change_loc = "*", pol = "*", dod = "*", plk = "*", info = "*", print = "*", free = "*", sign = "*", fin = "*", storno_close = "*", blok = "*", storno_sgn = "*", storno_validate = "*", storno_storno = "*", pol_vp = "*", copy = "*", odeslat = "*", predat = "*", prevzit = "*", pridelit = "*", show_ele = "*", edit_ele = "*", insert_ele = "*", pol_pzp = "*", change_blk = "*", noact_ele = "*", delete_ele = "*", ins_epk = "*", schval_proces = "*", fin_kontrola = "*", chg_ac_sml = "*", iissp = "*", zrusit_pridelit = "*", iissp_prep = "*", public_doc = "*", typ_no_eko_fin = "*", typ_no_eko_pol = "*",}
	const enum GSmlDetailEnableDtoTypes { location = "boolean", agenda = "boolean", new_dok = "boolean", evid = "boolean", validate = "boolean", storno_dok = "boolean", close = "boolean", change_loc = "boolean", pol = "boolean", dod = "boolean", plk = "boolean", info = "boolean", print = "boolean", free = "boolean", sign = "boolean", fin = "boolean", storno_close = "boolean", blok = "boolean", storno_sgn = "boolean", storno_validate = "boolean", storno_storno = "boolean", pol_vp = "boolean", copy = "boolean", odeslat = "boolean", predat = "boolean", prevzit = "boolean", pridelit = "boolean", show_ele = "boolean", edit_ele = "boolean", insert_ele = "boolean", pol_pzp = "boolean", change_blk = "boolean", noact_ele = "boolean", delete_ele = "boolean", ins_epk = "boolean", schval_proces = "boolean", fin_kontrola = "boolean", chg_ac_sml = "boolean", iissp = "boolean", zrusit_pridelit = "boolean", iissp_prep = "boolean", public_doc = "boolean", typ_no_eko_fin = "boolean", typ_no_eko_pol = "boolean",}
	const enum GSmlDetailEnableDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlDodCommonDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Společné údaje pro smldod*/
	interface GSmlDodCommonDto {
		/**předdefinovaný typ dolkladu*/
		ixs_orj_komp?: string|null;
		/**fin_od*/
		fin_od?: number|null;
		/**fin_do*/
		fin_do?: number|null;
		typ_fin?: number|null;
		/**zkratka měny*/
		mena_zkr?: string|null;
	}
	const enum GSmlDodCommonDtoNames { ixs_orj_komp = "ixs_orj_komp", fin_od = "fin_od", fin_do = "fin_do", typ_fin = "typ_fin", mena_zkr = "mena_zkr",}
	const enum GSmlDodCommonDtoFragments { ixs_orj_komp = "*", fin_od = "*", fin_do = "*", typ_fin = "*", mena_zkr = "*",}
	const enum GSmlDodCommonDtoTypes { ixs_orj_komp = "string", fin_od = "number", fin_do = "number", typ_fin = "number", mena_zkr = "string",}
	const enum GSmlDodCommonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmldvadDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smldvad*/
	interface GSmldvadDto {
		/**DBCOLUMN:smldvad.ixs_vad*/
		ixs_vad?: string|null;
		/**DBCOLUMN:smldvad.pol_id*/
		pol_id?: number|null;
		/**DBCOLUMN:smldvad.db_nazev*/
		db_nazev?: string|null;
		/**DBCOLUMN:smldvad.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:smldvad.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:smldvad.priz_pov*/
		priz_pov?: number|null;
		/**DBCOLUMN:smldvad.priz_vid*/
		priz_vid?: number|null;
		/**DBCOLUMN:smldvad.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smldvad.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSmldvadDtoNames { ixs_vad = "ixs_vad", pol_id = "pol_id", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", priz_pov = "priz_pov", priz_vid = "priz_vid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSmldvadDtoFragments { ixs_vad = "*", pol_id = "*", db_nazev = "*", nazev = "*", zkratka = "*", priz_pov = "*", priz_vid = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSmldvadDtoTypes { ixs_vad = "string", pol_id = "number", db_nazev = "string", nazev = "string", zkratka = "string", priz_pov = "number", priz_vid = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSmldvadDtoTypeLengths { ixs_vad = 12, db_nazev = 20, nazev = 20, zkratka = 16, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlEsuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**zaznam ESU*/
	interface GSmlEsuDto {
		/**ixp*/
		ixp?: string|null;
		/**ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**externí subjekt*/
		ixs_esu?: string|null;
		/**externí subjekt*/
		ixs_esu_old?: string|null;
		/**IČO externího subjektu*/
		ico_esu?: string|null;
		/**IČO*/
		ico?: string|null;
		/**číslo smlouvy ext.subjektu*/
		ac_esu?: string|null;
		/**kód banky k cizímu účtu*/
		sk_ci?: string|null;
		/**cizí bankovní účet*/
		bu_ci?: string|null;
		/**zastupující osoba druhé strany - složeno ixs_esu, lic_zast_esu, por_zast_esu*/
		ixs_esu_zast?: string|null;
		/**zastupující osoba druhé strany - složeno ixs_esu, lic_zast_esu, por_zast_esu*/
		lic_zast_esu?: string|null;
		/**zastupující osoba druhé strany*/
		por_zast_esu?: number|null;
		/**typ vazby na doklad*/
		typ_vazby?: number|null;
		/**typ vazby na doklad txt*/
		typ_vazby_txt?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**ix typu vazby*/
		ixs_dva?: string|null;
		/**rc_esu*/
		rc_esu?: string|null;
		/**ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		/**ixs_esu_txt*/
		ixs_esu_zast_txt?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
	}
	const enum GSmlEsuDtoNames { ixp = "ixp", ixp_sml_pri = "ixp_sml_pri", ixs_esu = "ixs_esu", ixs_esu_old = "ixs_esu_old", ico_esu = "ico_esu", ico = "ico", ac_esu = "ac_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", ixs_esu_zast = "ixs_esu_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", typ_vazby = "typ_vazby", typ_vazby_txt = "typ_vazby_txt", aktivita = "aktivita", ixs_dva = "ixs_dva", rc_esu = "rc_esu", ixs_esu_txt = "ixs_esu_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", esu_txt = "esu_txt",}
	const enum GSmlEsuDtoFragments { ixp = "*", ixp_sml_pri = "*", ixs_esu = "*", ixs_esu_old = "*", ico_esu = "*", ico = "*", ac_esu = "*", sk_ci = "*", bu_ci = "*", ixs_esu_zast = "*", lic_zast_esu = "*", por_zast_esu = "*", typ_vazby = "*", typ_vazby_txt = "*", aktivita = "*", ixs_dva = "*", rc_esu = "*", ixs_esu_txt = "*", ixs_esu_zast_txt = "*", esu_txt = "*",}
	const enum GSmlEsuDtoTypes { ixp = "string", ixp_sml_pri = "string", ixs_esu = "string", ixs_esu_old = "string", ico_esu = "string", ico = "string", ac_esu = "string", sk_ci = "string", bu_ci = "string", ixs_esu_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", typ_vazby = "number", typ_vazby_txt = "string", aktivita = "number", ixs_dva = "string", rc_esu = "string", ixs_esu_txt = "string", ixs_esu_zast_txt = "string", esu_txt = "string",}
	const enum GSmlEsuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlFinCommonDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Instance SmlFin - pro doklad i případ*/
	interface GSmlFinCommonDto {
		/**počet položek schválených*/
		NumPolSch?: number|null;
		/**počet položek FP případu v daném roce, které jsou či mají být rezervovány v IISSP*/
		NumPolIissp?: number|null;
		/**počet roků smlouvy - pro potřeby inicializace počtu roků rozpisu smlouvy*/
		NumRok?: number|null;
		/**c_mena_rok_sum	!celková částka rozpisu smlouvy na roky v dané měně*/
		CMenaRokSum?: JsonDecimal|null;
		/**maximální rok financování zadaných položek*/
		MaxPolRok?: number|null;
		/**suma objednávek vázaných na smlouvu v Kč*/
		CObj?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu v měně*/
		CObjMena?: JsonDecimal|null;
		/**NumSmlRsBnd*/
		NumSmlRsBnd?: number|null;
		/**suma smluv vázaných na rámcovou smlouvu*/
		CSmlRsBnd?: JsonDecimal|null;
		/**CSmlRsBndMena*/
		CSmlRsBndMena?: JsonDecimal|null;
		/**Počet položek financovaných z rozpočtových účtů*/
		FinFromRoz?: number|null;
		/**suma částky rozepsané do platebního kalendáře*/
		CKal?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ*/
		CSml?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu*/
		CVz?: JsonDecimal|null;
		/**ceny položek věcného profilu*/
		CSmlVp?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu*/
		CDodBnd?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu v měně*/
		CDodBndMena?: JsonDecimal|null;
	}
	const enum GSmlFinCommonDtoNames { NumPolSch = "NumPolSch", NumPolIissp = "NumPolIissp", NumRok = "NumRok", CMenaRokSum = "CMenaRokSum", MaxPolRok = "MaxPolRok", CObj = "CObj", CObjMena = "CObjMena", NumSmlRsBnd = "NumSmlRsBnd", CSmlRsBnd = "CSmlRsBnd", CSmlRsBndMena = "CSmlRsBndMena", FinFromRoz = "FinFromRoz", CKal = "CKal", CSml = "CSml", CVz = "CVz", CSmlVp = "CSmlVp", CDodBnd = "CDodBnd", CDodBndMena = "CDodBndMena",}
	const enum GSmlFinCommonDtoFragments { NumPolSch = "*", NumPolIissp = "*", NumRok = "*", CMenaRokSum = "*", MaxPolRok = "*", CObj = "*", CObjMena = "*", NumSmlRsBnd = "*", CSmlRsBnd = "*", CSmlRsBndMena = "*", FinFromRoz = "*", CKal = "*", CSml = "*", CVz = "*", CSmlVp = "*", CDodBnd = "*", CDodBndMena = "*",}
	const enum GSmlFinCommonDtoTypes { NumPolSch = "number", NumPolIissp = "number", NumRok = "number", CMenaRokSum = "JsonDecimal", MaxPolRok = "number", CObj = "JsonDecimal", CObjMena = "JsonDecimal", NumSmlRsBnd = "number", CSmlRsBnd = "JsonDecimal", CSmlRsBndMena = "JsonDecimal", FinFromRoz = "number", CKal = "JsonDecimal", CSml = "JsonDecimal", CVz = "JsonDecimal", CSmlVp = "JsonDecimal", CDodBnd = "JsonDecimal", CDodBndMena = "JsonDecimal",}
	const enum GSmlFinCommonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlFinFpCommonDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**record obecných hodnot pro položky a stav položky FP*/
	interface GSmlFinFpCommonDto {
		/**UeaUc*/
		UeaUc?: string|null;
		/**UebUc*/
		UebUc?: string|null;
		/**IxsFun*/
		IxsFun?: string|null;
		/**Přístup k položce plánu*/
		AccesCpp?: boolean|null;
		/**Počet položek*/
		NumPol?: number|null;
	}
	const enum GSmlFinFpCommonDtoNames { UeaUc = "UeaUc", UebUc = "UebUc", IxsFun = "IxsFun", AccesCpp = "AccesCpp", NumPol = "NumPol",}
	const enum GSmlFinFpCommonDtoFragments { UeaUc = "*", UebUc = "*", IxsFun = "*", AccesCpp = "*", NumPol = "*",}
	const enum GSmlFinFpCommonDtoTypes { UeaUc = "string", UebUc = "string", IxsFun = "string", AccesCpp = "boolean", NumPol = "number",}
	const enum GSmlFinFpCommonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlFinXxxDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Data pro financování dokladu a případu*/
	interface GSmlFinXxxDto {
		/**DBCOLUMN:smlspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlspid.ixp*/
		ixs_pri?: string|null;
		/**DBCOLUMN:smlspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smlspid.nks*/
		nks?: string|null;
		/**DBCOLUMN:smlspid.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_doc*/
		c_mena_doc?: JsonDecimal|null;
		/**c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.mena*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.mena*/
		mena?: number|null;
		/**DBCOLUMN:smlspid.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:smlspid.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlspid.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:smlspid.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:smlspid.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:smlspid.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:smlspid.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:smlspid.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlspid.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:smlspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlspid.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:smlspid.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlspid.priz_pzp*/
		priz_pzp?: number|null;
		/**DBCOLUMN:smlspid.c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:smlspid.vs*/
		vs?: string|null;
		/**DBCOLUMN:smlspid.c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.rok*/
		rok?: number|null;
		/**dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**existuje*/
		existuje?: number|null;
		/**max číslo dodatku*/
		cislo_dod_max?: number|null;
		/**sml_stav*/
		sml_stav?: number|null;
		/**num_rok*/
		num_rok?: number|null;
		/**mena_zkr*/
		mena_zkr?: string|null;
		/**num_pol*/
		num_pol?: number|null;
		/**priz_opce*/
		priz_opce?: number|null;
		/**priz_opce_txt*/
		priz_opce_txt?: string|null;
		/**dat_rad_iissp*/
		dat_rad_iissp?: JsonDate|null;
	}
	const enum GSmlFinXxxDtoNames { ixp = "ixp", ixs_pri = "ixs_pri", ico = "ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c = "c", c_mena_doc = "c_mena_doc", c_fak = "c_fak", c_pol = "c_pol", mena = "mena", ktg_sml = "ktg_sml", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", popis = "popis", nazev = "nazev", ixs_typ = "ixs_typ", ac_ver_zak = "ac_ver_zak", ac_sml = "ac_sml", priz_pzp = "priz_pzp", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", rok = "rok", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", existuje = "existuje", cislo_dod_max = "cislo_dod_max", sml_stav = "sml_stav", num_rok = "num_rok", mena_zkr = "mena_zkr", num_pol = "num_pol", priz_opce = "priz_opce", priz_opce_txt = "priz_opce_txt", dat_rad_iissp = "dat_rad_iissp",}
	const enum GSmlFinXxxDtoFragments { ixp = "*", ixs_pri = "*", ico = "*", ucs = "*", nks = "*", c_mena = "*", c = "*", c_mena_doc = "*", c_fak = "*", c_pol = "*", mena = "*", ktg_sml = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", cis_real = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", typ_ceny = "*", popis = "*", nazev = "*", ixs_typ = "*", ac_ver_zak = "*", ac_sml = "*", priz_pzp = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", typ_phl = "*", vs = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", rok = "*", dat_dph_od = "*", dat_dph_do = "*", existuje = "*", cislo_dod_max = "*", sml_stav = "*", num_rok = "*", mena_zkr = "*", num_pol = "*", priz_opce = "*", priz_opce_txt = "*", dat_rad_iissp = "*",}
	const enum GSmlFinXxxDtoTypes { ixp = "string", ixs_pri = "string", ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c = "JsonDecimal", c_mena_doc = "JsonDecimal", c_fak = "JsonDecimal", c_pol = "JsonDecimal", mena = "number", ktg_sml = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", popis = "string", nazev = "string", ixs_typ = "string", ac_ver_zak = "string", ac_sml = "string", priz_pzp = "number", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", rok = "number", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", existuje = "number", cislo_dod_max = "number", sml_stav = "number", num_rok = "number", mena_zkr = "string", num_pol = "number", priz_opce = "number", priz_opce_txt = "string", dat_rad_iissp = "JsonDate",}
	const enum GSmlFinXxxDtoTypeLengths { ixp = 12, ixs_pri = 12, ico = 10, ucs = 10, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, cis_real = 6, popis = 254, nazev = 4000, ixs_typ = 12, ac_ver_zak = 30, ac_sml = 30, typ_phl = 4, vs = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlIisspDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**record pro proměnné obsluhy rezervace v IISSP*/
	interface GSmlIisspDto {
		/**počet aktivních rezervačních dokladů případu*/
		pocet?: number|null;
		/**počet aktivních rezervačních dokladů případu připravených k rezervaci*/
		pripraveno?: number|null;
		/**počet aktivních odeslaných rezervačních dokladů případu*/
		odeslano?: number|null;
		/**počet aktivních schválených rezervačních dokladů případu*/
		schvaleno?: number|null;
		/**počet aktivních s výhradou schválených rezervačních dokladů případu*/
		schval_vyh?: number|null;
		/**počet aktivních zamítnutých rezervačních dokladů případu*/
		zamitnuto?: number|null;
		/**stav případu*/
		stav_pripadu?: string|null;
		/**atribut sspshpr.priz_rezsp*/
		priz_rezsp?: number|null;
		/**počet položek připravených k rezervaci*/
		pocet_pol_pripraveno_rez?: number|null;
		/**datumová proměnná pro volné použití*/
		dat_xxx?: JsonDate|null;
	}
	const enum GSmlIisspDtoNames { pocet = "pocet", pripraveno = "pripraveno", odeslano = "odeslano", schvaleno = "schvaleno", schval_vyh = "schval_vyh", zamitnuto = "zamitnuto", stav_pripadu = "stav_pripadu", priz_rezsp = "priz_rezsp", pocet_pol_pripraveno_rez = "pocet_pol_pripraveno_rez", dat_xxx = "dat_xxx",}
	const enum GSmlIisspDtoFragments { pocet = "*", pripraveno = "*", odeslano = "*", schvaleno = "*", schval_vyh = "*", zamitnuto = "*", stav_pripadu = "*", priz_rezsp = "*", pocet_pol_pripraveno_rez = "*", dat_xxx = "*",}
	const enum GSmlIisspDtoTypes { pocet = "number", pripraveno = "number", odeslano = "number", schvaleno = "number", schval_vyh = "number", zamitnuto = "number", stav_pripadu = "string", priz_rezsp = "number", pocet_pol_pripraveno_rez = "number", dat_xxx = "JsonDate",}
	const enum GSmlIisspDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlIxpSmlList.d.ts 

declare namespace Gordic.Sml.Interface {
	/**List Dto po přečtení smlouvy*/
	interface GSmlIxpSmlList {
		/**detail*/
		l_DetailListDto?: Gordic.Sml.Interface.GDetailListDto|null;
		/**detail hlp*/
		l_HlpDetailListDto?: Gordic.Sml.Interface.GDetailListDto|null;
		/**veřejné zakázky	true/false našel/nenašel*/
		ok?: boolean|null;
	}
	const enum GSmlIxpSmlListNames { l_DetailListDto = "l_DetailListDto", l_HlpDetailListDto = "l_HlpDetailListDto", ok = "ok",}
	const enum GSmlIxpSmlListFragments { l_DetailListDto = "*", l_HlpDetailListDto = "*", ok = "*",}
	const enum GSmlIxpSmlListTypes { l_DetailListDto = "Gordic.Sml.Interface.GDetailListDto", l_HlpDetailListDto = "Gordic.Sml.Interface.GDetailListDto", ok = "boolean",}
	const enum GSmlIxpSmlListTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlMaskyDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**parametry pro masky*/
	interface GSmlMaskyDto {
		/**Kategorie deníku (knihy)*/
		KtgDen?: number|null;
		/**Typ kategorie*/
		KtgTyp?: number|null;
		/**Hledání fulltextem*/
		SearchFullText?: number|null;
		SearchFTKumulIxp?: number|null;
		/**Deník*/
		IxpDen?: string|null;
		/**StavAkt*/
		StavAkt?: number|null;
		/**Typ platnosti*/
		TypPlatnosti?: number|null;
		/**Dodatečné podmínka řízení přístupu k dokladům*/
		SmlDokAcc?: number|null;
		/**Účinnost*/
		Ucinnost?: string|null;
		/**Příznak fultext*/
		PrizFtx?: number|null;
		/**výběr dle položek účetního profilu*/
		UpTypVyb?: number|null;
		/**kategorie smlouvy*/
		KtgSml?: number|null;
		/**režim provozu*/
		RezimProvozuSml?: number|null;
		/**stav evidence*/
		StavEvi?: number|null;
		/**subřada*/
		Subrada?: number|null;
		/**rokden*/
		RokDen?: number|null;
		/**kategorie knihy smluv : ng_ktgdenKDS, ng_ktgdenKOS, ... POVINNÝ*/
		KnihaMD?: number|null;
		/**typ okna pro registr oken -  odpovídá kategorii okna - pro neukončené = ktg_den + 1, po termínu = ktg_den + 2 POVINNÝ*/
		WindowTyp?: number|null;
		/**režim pohledu - kniha nebo neukončené  = pohled přes více knih, POVINNÝ*/
		View?: number|null;
	}
	const enum GSmlMaskyDtoNames { KtgDen = "KtgDen", KtgTyp = "KtgTyp", SearchFullText = "SearchFullText", SearchFTKumulIxp = "SearchFTKumulIxp", IxpDen = "IxpDen", StavAkt = "StavAkt", TypPlatnosti = "TypPlatnosti", SmlDokAcc = "SmlDokAcc", Ucinnost = "Ucinnost", PrizFtx = "PrizFtx", UpTypVyb = "UpTypVyb", KtgSml = "KtgSml", RezimProvozuSml = "RezimProvozuSml", StavEvi = "StavEvi", Subrada = "Subrada", RokDen = "RokDen", KnihaMD = "KnihaMD", WindowTyp = "WindowTyp", View = "View",}
	const enum GSmlMaskyDtoFragments { KtgDen = "*", KtgTyp = "*", SearchFullText = "*", SearchFTKumulIxp = "*", IxpDen = "*", StavAkt = "*", TypPlatnosti = "*", SmlDokAcc = "*", Ucinnost = "*", PrizFtx = "*", UpTypVyb = "*", KtgSml = "*", RezimProvozuSml = "*", StavEvi = "*", Subrada = "*", RokDen = "*", KnihaMD = "*", WindowTyp = "*", View = "*",}
	const enum GSmlMaskyDtoTypes { KtgDen = "number", KtgTyp = "number", SearchFullText = "number", SearchFTKumulIxp = "number", IxpDen = "string", StavAkt = "number", TypPlatnosti = "number", SmlDokAcc = "number", Ucinnost = "string", PrizFtx = "number", UpTypVyb = "number", KtgSml = "number", RezimProvozuSml = "number", StavEvi = "number", Subrada = "number", RokDen = "number", KnihaMD = "number", WindowTyp = "number", View = "number",}
	const enum GSmlMaskyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlPlaPidDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**plán IV,PV*/
	interface GSmlPlaPidDto {
		/**DBCOLUMN:srvspla.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:srvspla.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvspla.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvspla.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:srvspla.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:srvspla.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:srvspla.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:srvspla.ktg_akce*/
		ktg_akce?: number|null;
		/**cena položky plánu*/
		c?: JsonDecimal|null;
		/**cena smluv na položce plánu*/
		c_sml?: JsonDecimal|null;
		/**nevím*/
		kc0_1?: JsonDecimal|null;
		/**cena položky smlouvy*/
		c_pol?: JsonDecimal|null;
		/**číslo položky plánu*/
		cislo?: string|null;
		/**kompetent, na kterého je rozepsán plán*/
		ixs_fun_komp?: string|null;
	}
	const enum GSmlPlaPidDtoNames { ixs_pla = "ixs_pla", rok = "rok", ico = "ico", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", ktg_akce = "ktg_akce", c = "c", c_sml = "c_sml", kc0_1 = "kc0_1", c_pol = "c_pol", cislo = "cislo", ixs_fun_komp = "ixs_fun_komp",}
	const enum GSmlPlaPidDtoFragments { ixs_pla = "*", rok = "*", ico = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", ktg_akce = "*", c = "*", c_sml = "*", kc0_1 = "*", c_pol = "*", cislo = "*", ixs_fun_komp = "*",}
	const enum GSmlPlaPidDtoTypes { ixs_pla = "string", rok = "number", ico = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", ktg_akce = "number", c = "JsonDecimal", c_sml = "JsonDecimal", kc0_1 = "JsonDecimal", c_pol = "JsonDecimal", cislo = "string", ixs_fun_komp = "string",}
	const enum GSmlPlaPidDtoTypeLengths { ixs_pla = 12, ico = 10, nazev = 50, zkratka = 16, poznamka = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlPlaRozCommonDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**srvscia*/
	interface GSmlPlaRozCommonDto {
		/**realizátor*/
		cis_real?: string|null;
		/**ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**mode_dok_obj_sml*/
		mode_dok_obj_sml?: boolean|null;
		/**mode_dok_obj_sml*/
		mode_dok_bnd_blk?: boolean|null;
		/**WhereUea*/
		WhereUea?: string|null;
		/**Where*/
		Where?: string|null;
		/**WhereUka*/
		WhereUka?: string|null;
	}
	const enum GSmlPlaRozCommonDtoNames { cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", mode_dok_obj_sml = "mode_dok_obj_sml", mode_dok_bnd_blk = "mode_dok_bnd_blk", WhereUea = "WhereUea", Where = "Where", WhereUka = "WhereUka",}
	const enum GSmlPlaRozCommonDtoFragments { cis_real = "*", ixs_fun_vyriz = "*", mode_dok_obj_sml = "*", mode_dok_bnd_blk = "*", WhereUea = "*", Where = "*", WhereUka = "*",}
	const enum GSmlPlaRozCommonDtoTypes { cis_real = "string", ixs_fun_vyriz = "string", mode_dok_obj_sml = "boolean", mode_dok_bnd_blk = "boolean", WhereUea = "string", Where = "string", WhereUka = "string",}
	const enum GSmlPlaRozCommonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlPlaRozDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**srvscia*/
	interface GSmlPlaRozDto {
		/**DBCOLUMN:srvscia.ixs_pla*/
		ixs_pla?: string|null;
		/**číslo položky plánu*/
		cislo?: string|null;
		/**DBCOLUMN:srvscia.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvscia.nazev*/
		nazev?: string|null;
		/**cena položky plánu*/
		c?: JsonDecimal|null;
		/**realizátor*/
		cis_real?: string|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**ičo*/
		ico?: string|null;
		/**c_10*/
		c_10?: JsonDecimal|null;
		/**c_6*/
		c_6?: JsonDecimal|null;
		/**c_18*/
		c_18?: JsonDecimal|null;
		/**c_0*/
		c_0?: JsonDecimal|null;
		/**c_12*/
		c_12?: JsonDecimal|null;
		/**c_16*/
		c_16?: JsonDecimal|null;
		/**c_15*/
		c_15?: JsonDecimal|null;
		/**c_17*/
		c_17?: JsonDecimal|null;
		/**c_11*/
		c_11?: JsonDecimal|null;
		/**c_sml_roz_disp*/
		c_sml_roz_disp?: JsonDecimal|null;
		/**c_sml_blk_disp*/
		c_sml_blk_disp?: JsonDecimal|null;
		/**c_obj_sml_disp*/
		c_obj_sml_disp?: JsonDecimal|null;
		/**c_rez_sml_disp*/
		c_rez_sml_disp?: JsonDecimal|null;
	}
	const enum GSmlPlaRozDtoNames { ixs_pla = "ixs_pla", cislo = "cislo", rok = "rok", nazev = "nazev", c = "c", cis_real = "cis_real", ixs_cia = "ixs_cia", ico = "ico", c_10 = "c_10", c_6 = "c_6", c_18 = "c_18", c_0 = "c_0", c_12 = "c_12", c_16 = "c_16", c_15 = "c_15", c_17 = "c_17", c_11 = "c_11", c_sml_roz_disp = "c_sml_roz_disp", c_sml_blk_disp = "c_sml_blk_disp", c_obj_sml_disp = "c_obj_sml_disp", c_rez_sml_disp = "c_rez_sml_disp",}
	const enum GSmlPlaRozDtoFragments { ixs_pla = "*", cislo = "*", rok = "*", nazev = "*", c = "*", cis_real = "*", ixs_cia = "*", ico = "*", c_10 = "*", c_6 = "*", c_18 = "*", c_0 = "*", c_12 = "*", c_16 = "*", c_15 = "*", c_17 = "*", c_11 = "*", c_sml_roz_disp = "*", c_sml_blk_disp = "*", c_obj_sml_disp = "*", c_rez_sml_disp = "*",}
	const enum GSmlPlaRozDtoTypes { ixs_pla = "string", cislo = "string", rok = "number", nazev = "string", c = "JsonDecimal", cis_real = "string", ixs_cia = "string", ico = "string", c_10 = "JsonDecimal", c_6 = "JsonDecimal", c_18 = "JsonDecimal", c_0 = "JsonDecimal", c_12 = "JsonDecimal", c_16 = "JsonDecimal", c_15 = "JsonDecimal", c_17 = "JsonDecimal", c_11 = "JsonDecimal", c_sml_roz_disp = "JsonDecimal", c_sml_blk_disp = "JsonDecimal", c_obj_sml_disp = "JsonDecimal", c_rez_sml_disp = "JsonDecimal",}
	const enum GSmlPlaRozDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlPlaRozpisDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:srvdroz*/
	interface GSmlPlaRozpisDto {
		/**rok plánu*/
		rok?: number|null;
		/**číslo*/
		cislo?: string|null;
		/**IXS referenta vlastnící položku plánu*/
		ixs_fun?: string|null;
		/**původní referent vlastnící položku plánu*/
		ixs_fun_old?: string|null;
		/**referent vlastnící položku plánu*/
		ixs_fun_txt?: string|null;
		/**položka plánu*/
		ixs_pla?: string|null;
		/**IČO*/
		ico?: string|null;
	}
	const enum GSmlPlaRozpisDtoNames { rok = "rok", cislo = "cislo", ixs_fun = "ixs_fun", ixs_fun_old = "ixs_fun_old", ixs_fun_txt = "ixs_fun_txt", ixs_pla = "ixs_pla", ico = "ico",}
	const enum GSmlPlaRozpisDtoFragments { rok = "*", cislo = "*", ixs_fun = "*", ixs_fun_old = "*", ixs_fun_txt = "*", ixs_pla = "*", ico = "*",}
	const enum GSmlPlaRozpisDtoTypes { rok = "number", cislo = "string", ixs_fun = "string", ixs_fun_old = "string", ixs_fun_txt = "string", ixs_pla = "string", ico = "string",}
	const enum GSmlPlaRozpisDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlPolFinXxxDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smldpol*/
	interface GSmlPolFinXxxDto {
		/**DBCOLUMN:smldpol.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smldpol.rok*/
		rok?: number|null;
		/**DBCOLUMN:smldpol.cislo*/
		cislo?: number|null;
		/**DBCOLUMN:smldpol.lic*/
		lic?: string|null;
		/**DBCOLUMN:smldpol.ixp_pla*/
		ixp_pla?: string|null;
		/**DBCOLUMN:smldpol.cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**DBCOLUMN:smldpol.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:smldpol.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:smldpol.up_stav*/
		up_stav?: number|null;
		/**up_stav_txt*/
		up_stav_txt?: string|null;
		/**DBCOLUMN:smldpol.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.vratka*/
		c_vratka?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.mj*/
		mj?: string|null;
		/**mj_txt*/
		mj_txt?: string|null;
		/**DBCOLUMN:smldpol.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.ico*/
		ico?: string|null;
		/**DBCOLUMN:smldpol.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smldpol.nks*/
		nks?: string|null;
		/**DBCOLUMN:smldpol.uea*/
		uea?: string|null;
		/**DBCOLUMN:smldpol.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:smldpol.uea*/
		uea_uc?: string|null;
		/**DBCOLUMN:smldpol.ueb*/
		ueb_uc?: string|null;
		/**DBCOLUMN:smldpol.uec*/
		uec?: string|null;
		/**DBCOLUMN:smldpol.ued*/
		ued?: string|null;
		/**DBCOLUMN:smldpol.uee*/
		uee?: string|null;
		/**DBCOLUMN:smldpol.uef*/
		uef?: string|null;
		/**DBCOLUMN:smldpol.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:smldpol.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:smldpol.uei*/
		uei?: string|null;
		/**DBCOLUMN:smldpol.uej*/
		uej?: string|null;
		/**DBCOLUMN:smldpol.te0*/
		te0?: string|null;
		/**DBCOLUMN:smldpol.te1*/
		te1?: string|null;
		/**DBCOLUMN:smldpol.te2*/
		te2?: string|null;
		/**DBCOLUMN:smldpol.te3*/
		te3?: string|null;
		/**DBCOLUMN:smldpol.te4*/
		te4?: string|null;
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**DBCOLUMN:smldpol.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:smldpol.bu_vl*/
		bu_vl?: string|null;
		/**bu_vl_txt*/
		bu_vl_txt?: string|null;
		/**DBCOLUMN:smldpol.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.dat_vznik*/
		dat_vznik?: JsonDate|null;
		/**DBCOLUMN:smldpol.typ_ag_fak*/
		typ_ag_fak?: number|null;
		/**DBCOLUMN:smldpol.c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.drd*/
		drd?: number|null;
		/**DBCOLUMN:smldpol.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:smldpol.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:smldpol.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:smldpol.uea_rr*/
		uea_rr?: string|null;
		/**DBCOLUMN:smldpol.ueb_rr*/
		ueb_rr?: string|null;
		/**DBCOLUMN:smldpol.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:smldpol.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:smldpol.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:smldpol.znam*/
		znam?: number|null;
		/**DBCOLUMN:smldpol.priz_zaz*/
		priz_zaz?: number|null;
		/**priz_zaz_txt*/
		priz_zaz_txt?: number|null;
		/**priz_zaz_txt_grid*/
		priz_zaz_txt_grid?: string|null;
		/**DBCOLUMN:smldpol.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smldpol.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smldpol.zmenu_prov*/
		zmenu_prov?: string|null;
		/**smlspol.id_hdr*/
		id_hdr?: number|null;
		/**smlspol.radek_hdr*/
		radek_hdr?: number|null;
		/**id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**ktg_bu*/
		ktg_bu?: number|null;
		/**typ_bu*/
		typ_bu?: number|null;
		/**num_bu*/
		num_bu?: number|null;
		/**kategorie smlouvy*/
		ktg_sml?: number|null;
		/**max_rok_pol*/
		max_rok_pol?: number|null;
		/**bu_exist_aktobd*/
		bu_exist_aktobd?: boolean|null;
		/**příznak stavu řádku 0 - nový řádek - není v DB*/
		flag?: number|null;
		/**typ_ceny*/
		typ_ceny?: number|null;
		/**typ_kurz*/
		typ_kurz?: number|null;
		acces_cpp?: boolean|null;
		/**c_pri*/
		c_pri?: JsonDecimal|null;
	}
	const enum GSmlPolFinXxxDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", ixp_pla = "ixp_pla", cis_pol_pla = "cis_pol_pla", ixs_fun = "ixs_fun", nazev = "nazev", up_stav = "up_stav", up_stav_txt = "up_stav_txt", c = "c", c_vratka = "c_vratka", mj = "mj", mj_txt = "mj_txt", m = "m", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_vl_txt = "bu_vl_txt", c_fak = "c_fak", dat_vznik = "dat_vznik", typ_ag_fak = "typ_ag_fak", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", priz_zaz = "priz_zaz", priz_zaz_txt = "priz_zaz_txt", priz_zaz_txt_grid = "priz_zaz_txt_grid", ixp_sml_pri = "ixp_sml_pri", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_hdr = "id_hdr", radek_hdr = "radek_hdr", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", ktg_bu = "ktg_bu", typ_bu = "typ_bu", num_bu = "num_bu", ktg_sml = "ktg_sml", max_rok_pol = "max_rok_pol", bu_exist_aktobd = "bu_exist_aktobd", flag = "flag", typ_ceny = "typ_ceny", typ_kurz = "typ_kurz", acces_cpp = "acces_cpp", c_pri = "c_pri",}
	const enum GSmlPolFinXxxDtoFragments { ixp = "*", rok = "*", cislo = "*", lic = "*", ixp_pla = "*", cis_pol_pla = "*", ixs_fun = "*", nazev = "*", up_stav = "*", up_stav_txt = "*", c = "*", c_vratka = "*", mj = "*", mj_txt = "*", m = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uea_uc = "*", ueb_uc = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", sk_vl = "*", bu_vl = "*", bu_vl_txt = "*", c_fak = "*", dat_vznik = "*", typ_ag_fak = "*", c_obj_sml = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", typ_ag_blok = "*", znam = "*", priz_zaz = "*", priz_zaz_txt = "*", priz_zaz_txt_grid = "*", ixp_sml_pri = "*", dat_zmena = "*", zmenu_prov = "*", id_hdr = "*", radek_hdr = "*", id_hdr_ris = "*", radek_hdr_ris = "*", ktg_bu = "*", typ_bu = "*", num_bu = "*", ktg_sml = "*", max_rok_pol = "*", bu_exist_aktobd = "*", flag = "*", typ_ceny = "*", typ_kurz = "*", acces_cpp = "*", c_pri = "*",}
	const enum GSmlPolFinXxxDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", ixp_pla = "string", cis_pol_pla = "string", ixs_fun = "string", nazev = "string", up_stav = "number", up_stav_txt = "string", c = "JsonDecimal", c_vratka = "JsonDecimal", mj = "string", mj_txt = "string", m = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uea_uc = "string", ueb_uc = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", sk_vl = "string", bu_vl = "string", bu_vl_txt = "string", c_fak = "JsonDecimal", dat_vznik = "JsonDate", typ_ag_fak = "number", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", priz_zaz = "number", priz_zaz_txt = "number", priz_zaz_txt_grid = "string", ixp_sml_pri = "string", dat_zmena = "JsonDate", zmenu_prov = "string", id_hdr = "number", radek_hdr = "number", id_hdr_ris = "string", radek_hdr_ris = "number", ktg_bu = "number", typ_bu = "number", num_bu = "number", ktg_sml = "number", max_rok_pol = "number", bu_exist_aktobd = "boolean", flag = "number", typ_ceny = "number", typ_kurz = "number", acces_cpp = "boolean", c_pri = "JsonDecimal",}
	const enum GSmlPolFinXxxDtoTypeLengths { ixp = 12, lic = 4, ixp_pla = 12, cis_pol_pla = 16, ixs_fun = 12, nazev = 254, mj = 5, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uea_uc = 3, ueb_uc = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, sk_vl = 11, bu_vl = 34, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, ixp_sml_pri = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlRetDecInt32Dto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**návrat různých hodnot do js*/
	interface GSmlRetDecInt32Dto {
		/**GDecimal - většinou c_mena*/
		GDec_0?: JsonDecimal|null;
		/**GDecimal -  - většinou c_mena_doc*/
		GDec_1?: JsonDecimal|null;
		/**GInt32*/
		GInt32_0?: number|null;
		/**GInt32*/
		GInt32_1?: number|null;
		/**GInt32*/
		GInt32_2?: number|null;
		/**GInt32*/
		GInt32_3?: number|null;
		/**navrat*/
		navrat?: boolean|null;
		/**ktg_sml_text*/
		ktg_sml_text?: string|null;
		/**ac_ag_blok_text*/
		ac_ag_blok_text?: string|null;
	}
	const enum GSmlRetDecInt32DtoNames { GDec_0 = "GDec_0", GDec_1 = "GDec_1", GInt32_0 = "GInt32_0", GInt32_1 = "GInt32_1", GInt32_2 = "GInt32_2", GInt32_3 = "GInt32_3", navrat = "navrat", ktg_sml_text = "ktg_sml_text", ac_ag_blok_text = "ac_ag_blok_text",}
	const enum GSmlRetDecInt32DtoFragments { GDec_0 = "*", GDec_1 = "*", GInt32_0 = "*", GInt32_1 = "*", GInt32_2 = "*", GInt32_3 = "*", navrat = "*", ktg_sml_text = "*", ac_ag_blok_text = "*",}
	const enum GSmlRetDecInt32DtoTypes { GDec_0 = "JsonDecimal", GDec_1 = "JsonDecimal", GInt32_0 = "number", GInt32_1 = "number", GInt32_2 = "number", GInt32_3 = "number", navrat = "boolean", ktg_sml_text = "string", ac_ag_blok_text = "string",}
	const enum GSmlRetDecInt32DtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlRezervaceDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Data pro záložku detail rezervace*/
	interface GSmlRezervaceDto {
		/**stav*/
		s?: string|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**číslo smlouvy*/
		cislo_sml?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**ac*/
		ac?: string|null;
		/**agendové číslo*/
		ac_ag?: string|null;
		/**agendové esu*/
		ac_esu?: string|null;
		/**ico esu*/
		ico_esu?: string|null;
		/**název esu*/
		esu_txt?: string|null;
		/**popis*/
		popis?: string|null;
		/**datum*/
		dat_evid?: JsonDate|null;
		/**částka celkem*/
		c_celkem?: JsonDecimal|null;
		/**kod_kon*/
		kod_kon?: string|null;
		/**var. symbol*/
		vs?: string|null;
		/**spec. symbol*/
		ss?: string|null;
		/**konst.symbol*/
		ks?: string|null;
		/**zp_zkr*/
		zp_zkr?: string|null;
		/**název deníku*/
		nazev_den?: string|null;
		/**název ref*/
		nazev_ref?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**kategorie*/
		ktg_typ?: number|null;
		/**stav storna*/
		s_sto?: number|null;
		/**částka rez*/
		c_rez?: JsonDecimal|null;
		/**datum*/
		dat_spl?: JsonDate|null;
		/**datum*/
		dat_uhr?: JsonDate|null;
		/**datum*/
		dat_zau?: JsonDate|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**agenda*/
		agd?: string|null;
		/**stav*/
		stav?: string|null;
		/**zkatka agendy*/
		agd_txt?: string|null;
	}
	const enum GSmlRezervaceDtoNames { s = "s", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixp = "ixp", ac = "ac", ac_ag = "ac_ag", ac_esu = "ac_esu", ico_esu = "ico_esu", esu_txt = "esu_txt", popis = "popis", dat_evid = "dat_evid", c_celkem = "c_celkem", kod_kon = "kod_kon", vs = "vs", ss = "ss", ks = "ks", zp_zkr = "zp_zkr", nazev_den = "nazev_den", nazev_ref = "nazev_ref", dat_zmena = "dat_zmena", ktg_typ = "ktg_typ", s_sto = "s_sto", c_rez = "c_rez", dat_spl = "dat_spl", dat_uhr = "dat_uhr", dat_zau = "dat_zau", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_ci = "bu_ci", sk_ci = "sk_ci", agd = "agd", stav = "stav", agd_txt = "agd_txt",}
	const enum GSmlRezervaceDtoFragments { s = "*", rok_sml = "*", cislo_sml = "*", ixp = "*", ac = "*", ac_ag = "*", ac_esu = "*", ico_esu = "*", esu_txt = "*", popis = "*", dat_evid = "*", c_celkem = "*", kod_kon = "*", vs = "*", ss = "*", ks = "*", zp_zkr = "*", nazev_den = "*", nazev_ref = "*", dat_zmena = "*", ktg_typ = "*", s_sto = "*", c_rez = "*", dat_spl = "*", dat_uhr = "*", dat_zau = "*", bu_vl = "*", sk_vl = "*", bu_ci = "*", sk_ci = "*", agd = "*", stav = "*", agd_txt = "*",}
	const enum GSmlRezervaceDtoTypes { s = "string", rok_sml = "number", cislo_sml = "string", ixp = "string", ac = "string", ac_ag = "string", ac_esu = "string", ico_esu = "string", esu_txt = "string", popis = "string", dat_evid = "JsonDate", c_celkem = "JsonDecimal", kod_kon = "string", vs = "string", ss = "string", ks = "string", zp_zkr = "string", nazev_den = "string", nazev_ref = "string", dat_zmena = "JsonDate", ktg_typ = "number", s_sto = "number", c_rez = "JsonDecimal", dat_spl = "JsonDate", dat_uhr = "JsonDate", dat_zau = "JsonDate", bu_vl = "string", sk_vl = "string", bu_ci = "string", sk_ci = "string", agd = "string", stav = "string", agd_txt = "string",}
	const enum GSmlRezervaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlsdenDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlsden*/
	interface GSmlsdenDto {
		/**DBCOLUMN:smlsden.nazev*/
		ixp_den_txt?: string|null;
		/**DBCOLUMN:smlsden.rok*/
		rok_den?: number|null;
		/**DBCOLUMN:smlsden.ktg_den*/
		ktg_den?: number|null;
	}
	const enum GSmlsdenDtoNames { ixp_den_txt = "ixp_den_txt", rok_den = "rok_den", ktg_den = "ktg_den",}
	const enum GSmlsdenDtoFragments { ixp_den_txt = "*", rok_den = "*", ktg_den = "*",}
	const enum GSmlsdenDtoTypes { ixp_den_txt = "string", rok_den = "number", ktg_den = "number",}
	const enum GSmlsdenDtoTypeLengths { ixp_den_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlVzEsuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**zaznam esu vázaného na VZ*/
	interface GSmlVzEsuDto {
		/**ičo*/
		ico?: string|null;
		/**dič*/
		dic?: string|null;
		/**název*/
		nazev?: string|null;
		/**obec*/
		obec?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**kód banky k cizímu účtu*/
		sk_ci?: string|null;
		/**cizí bankovní účet*/
		bu_ci?: string|null;
		/**ixp_nab*/
		ixp_nab?: string|null;
		/**rc*/
		rc?: string|null;
		/**stupen_ver*/
		stupen_ver?: number|null;
		/**typ_esu*/
		typ_esu?: number|null;
		/**por_cis_nab*/
		por_cis_nab?: number|null;
		/**naz_prj*/
		naz_prj?: string|null;
		/**cizí bankovní účet txt*/
		bu_ci_txt?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
	}
	const enum GSmlVzEsuDtoNames { ico = "ico", dic = "dic", nazev = "nazev", obec = "obec", zkratka = "zkratka", ixs_esu = "ixs_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", ixp_nab = "ixp_nab", rc = "rc", stupen_ver = "stupen_ver", typ_esu = "typ_esu", por_cis_nab = "por_cis_nab", naz_prj = "naz_prj", bu_ci_txt = "bu_ci_txt", esu_txt = "esu_txt",}
	const enum GSmlVzEsuDtoFragments { ico = "*", dic = "*", nazev = "*", obec = "*", zkratka = "*", ixs_esu = "*", sk_ci = "*", bu_ci = "*", ixp_nab = "*", rc = "*", stupen_ver = "*", typ_esu = "*", por_cis_nab = "*", naz_prj = "*", bu_ci_txt = "*", esu_txt = "*",}
	const enum GSmlVzEsuDtoTypes { ico = "string", dic = "string", nazev = "string", obec = "string", zkratka = "string", ixs_esu = "string", sk_ci = "string", bu_ci = "string", ixp_nab = "string", rc = "string", stupen_ver = "number", typ_esu = "number", por_cis_nab = "number", naz_prj = "string", bu_ci_txt = "string", esu_txt = "string",}
	const enum GSmlVzEsuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlVzInfo.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Data pro VZ info    ///*/
	interface GVzInfoDto {
		/**ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**dat_pri*/
		dat_pri?: JsonDate|null;
		/**c*/
		c?: JsonDecimal|null;
		/**c_sch*/
		c_sch?: JsonDecimal|null;
		/**s_vz_txt*/
		s_vz_txt?: string|null;
		/**vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**soutez_txt*/
		soutez_txt?: string|null;
	}
	const enum GVzInfoDtoNames { ac_ver_zak = "ac_ver_zak", ac_ag = "ac_ag", nazev = "nazev", dat_pri = "dat_pri", c = "c", c_sch = "c_sch", s_vz_txt = "s_vz_txt", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", soutez_txt = "soutez_txt",}
	const enum GVzInfoDtoFragments { ac_ver_zak = "*", ac_ag = "*", nazev = "*", dat_pri = "*", c = "*", c_sch = "*", s_vz_txt = "*", vz_cislo_vevz = "*", vz_cislo_prof = "*", vz_cislo_etrz = "*", soutez_txt = "*",}
	const enum GVzInfoDtoTypes { ac_ver_zak = "string", ac_ag = "string", nazev = "string", dat_pri = "JsonDate", c = "JsonDecimal", c_sch = "JsonDecimal", s_vz_txt = "string", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", soutez_txt = "string",}
	const enum GVzInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlWflpidCommonDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Společné údaje pro wflspid*/
	interface GSmlWflspidCommonDto {
		/**předdefinovaný typ dolkladu*/
		IxsTypDef?: string|null;
		/**Kategorie dokladu*/
		KtgTyp?: number|null;
	}
	const enum GSmlWflspidCommonDtoNames { IxsTypDef = "IxsTypDef", KtgTyp = "KtgTyp",}
	const enum GSmlWflspidCommonDtoFragments { IxsTypDef = "*", KtgTyp = "*",}
	const enum GSmlWflspidCommonDtoTypes { IxsTypDef = "string", KtgTyp = "number",}
	const enum GSmlWflspidCommonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSmlWflTopDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**GSmlWflTopDto*/
	interface GSmlWflTopDto {
		/**ixp*/
		ixp?: string|null;
		/**nabývá hodnot ng_typRedistPredani, ng_typRedistPrideleni*/
		typ_redist?: number|null;
		/**ixs_fun_start*/
		ixs_fun_start?: string|null;
		/**ixs_su_start*/
		ixs_su_start?: string|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**ixs_su_do*/
		ixs_su_do?: string|null;
		/**ixs_fun_cil*/
		ixs_fun_cil?: string|null;
		/**ixs_su_cil*/
		ixs_su_cil?: string|null;
		/**ixs_fun_cil*/
		ixs_fun_wfl?: string|null;
		/**ixs_su_cil*/
		ixs_su_wfl?: string|null;
		/**ucel_dist_txt*/
		ucel_dist_txt?: string|null;
		/**datum změny*/
		sdat_zmena?: JsonDate|null;
		/**typ_vlast*/
		typ_vlast?: number|null;
		/**ixs_ref_cil*/
		ixs_ref_cil?: string|null;
		/**ixs_ref_start*/
		ixs_ref_start?: string|null;
		/**stop_dist*/
		stop_dist?: number|null;
		/**zapis_hst*/
		zapis_hst?: number|null;
		/**ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**cis_real*/
		cis_real?: string|null;
		/**ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**rezim_ref*/
		rezim_ref?: number|null;
	}
	const enum GSmlWflTopDtoNames { ixp = "ixp", typ_redist = "typ_redist", ixs_fun_start = "ixs_fun_start", ixs_su_start = "ixs_su_start", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", ixs_su_do = "ixs_su_do", ixs_fun_cil = "ixs_fun_cil", ixs_su_cil = "ixs_su_cil", ixs_fun_wfl = "ixs_fun_wfl", ixs_su_wfl = "ixs_su_wfl", ucel_dist_txt = "ucel_dist_txt", sdat_zmena = "sdat_zmena", typ_vlast = "typ_vlast", ixs_ref_cil = "ixs_ref_cil", ixs_ref_start = "ixs_ref_start", stop_dist = "stop_dist", zapis_hst = "zapis_hst", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", ixs_fun_ref = "ixs_fun_ref", rezim_ref = "rezim_ref",}
	const enum GSmlWflTopDtoFragments { ixp = "*", typ_redist = "*", ixs_fun_start = "*", ixs_su_start = "*", ixs_fun_akt = "*", ixs_su_akt = "*", ixs_su_do = "*", ixs_fun_cil = "*", ixs_su_cil = "*", ixs_fun_wfl = "*", ixs_su_wfl = "*", ucel_dist_txt = "*", sdat_zmena = "*", typ_vlast = "*", ixs_ref_cil = "*", ixs_ref_start = "*", stop_dist = "*", zapis_hst = "*", ixs_fun_vyriz = "*", cis_real = "*", ixs_fun_ref = "*", rezim_ref = "*",}
	const enum GSmlWflTopDtoTypes { ixp = "string", typ_redist = "number", ixs_fun_start = "string", ixs_su_start = "string", ixs_fun_akt = "string", ixs_su_akt = "string", ixs_su_do = "string", ixs_fun_cil = "string", ixs_su_cil = "string", ixs_fun_wfl = "string", ixs_su_wfl = "string", ucel_dist_txt = "string", sdat_zmena = "JsonDate", typ_vlast = "number", ixs_ref_cil = "string", ixs_ref_start = "string", stop_dist = "number", zapis_hst = "number", ixs_fun_vyriz = "string", cis_real = "string", ixs_fun_ref = "string", rezim_ref = "number",}
	const enum GSmlWflTopDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GSrvsplaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:srvspla*/
	interface GSrvsplaDto {
		/**DBCOLUMN:srvspla.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:srvspla.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:srvspla.ktg_akce*/
		ktg_akce?: number|null;
		/**DBCOLUMN:srvspla.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:srvspla.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvspla.aktivita*/
		aktivita?: number|null;
	}
	const enum GSrvsplaDtoNames { ixs_pla = "ixs_pla", nazev = "nazev", ktg_akce = "ktg_akce", zkratka = "zkratka", rok = "rok", aktivita = "aktivita",}
	const enum GSrvsplaDtoFragments { ixs_pla = "*", nazev = "*", ktg_akce = "*", zkratka = "*", rok = "*", aktivita = "*",}
	const enum GSrvsplaDtoTypes { ixs_pla = "string", nazev = "string", ktg_akce = "number", zkratka = "string", rok = "number", aktivita = "number",}
	const enum GSrvsplaDtoTypeLengths { ixs_pla = 12, nazev = 50, zkratka = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GUctVetaNazvyDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Názvy položek účetní věty*/
	interface GUctVetaNazvyDto {
		/**nazev uea*/
		nazev_uea?: string|null;
		/**nazev ueb*/
		nazev_ueb?: string|null;
		/**nazev uec*/
		nazev_uec?: string|null;
		/**nazev ued*/
		nazev_ued?: string|null;
		/**nazev uee*/
		nazev_uee?: string|null;
		/**nazev uef*/
		nazev_uef?: string|null;
		/**nazev ueg*/
		nazev_ueg?: string|null;
		/**nazev ueh*/
		nazev_ueh?: string|null;
		/**nazev uei*/
		nazev_uei?: string|null;
		/**nazev uej*/
		nazev_uej?: string|null;
		/**nazev te0*/
		nazev_te0?: string|null;
		/**nazev te1*/
		nazev_te1?: string|null;
		/**nazev te2*/
		nazev_te2?: string|null;
		/**nazev te3*/
		nazev_te3?: string|null;
		/**nazev te4*/
		nazev_te4?: string|null;
		/**nazev uek*/
		nazev_uek?: string|null;
		/**nazev uel*/
		nazev_uel?: string|null;
		/**nazev uem*/
		nazev_uem?: string|null;
		/**nazev uen*/
		nazev_uen?: string|null;
		/**nazev te5*/
		nazev_te5?: string|null;
		/**nazev te6*/
		nazev_te6?: string|null;
		/**nazev te7*/
		nazev_te7?: string|null;
		/**nazev te8*/
		nazev_te8?: string|null;
		/**nazev te9*/
		nazev_te9?: string|null;
	}
	const enum GUctVetaNazvyDtoNames { nazev_uea = "nazev_uea", nazev_ueb = "nazev_ueb", nazev_uec = "nazev_uec", nazev_ued = "nazev_ued", nazev_uee = "nazev_uee", nazev_uef = "nazev_uef", nazev_ueg = "nazev_ueg", nazev_ueh = "nazev_ueh", nazev_uei = "nazev_uei", nazev_uej = "nazev_uej", nazev_te0 = "nazev_te0", nazev_te1 = "nazev_te1", nazev_te2 = "nazev_te2", nazev_te3 = "nazev_te3", nazev_te4 = "nazev_te4", nazev_uek = "nazev_uek", nazev_uel = "nazev_uel", nazev_uem = "nazev_uem", nazev_uen = "nazev_uen", nazev_te5 = "nazev_te5", nazev_te6 = "nazev_te6", nazev_te7 = "nazev_te7", nazev_te8 = "nazev_te8", nazev_te9 = "nazev_te9",}
	const enum GUctVetaNazvyDtoFragments { nazev_uea = "*", nazev_ueb = "*", nazev_uec = "*", nazev_ued = "*", nazev_uee = "*", nazev_uef = "*", nazev_ueg = "*", nazev_ueh = "*", nazev_uei = "*", nazev_uej = "*", nazev_te0 = "*", nazev_te1 = "*", nazev_te2 = "*", nazev_te3 = "*", nazev_te4 = "*", nazev_uek = "*", nazev_uel = "*", nazev_uem = "*", nazev_uen = "*", nazev_te5 = "*", nazev_te6 = "*", nazev_te7 = "*", nazev_te8 = "*", nazev_te9 = "*",}
	const enum GUctVetaNazvyDtoTypes { nazev_uea = "string", nazev_ueb = "string", nazev_uec = "string", nazev_ued = "string", nazev_uee = "string", nazev_uef = "string", nazev_ueg = "string", nazev_ueh = "string", nazev_uei = "string", nazev_uej = "string", nazev_te0 = "string", nazev_te1 = "string", nazev_te2 = "string", nazev_te3 = "string", nazev_te4 = "string", nazev_uek = "string", nazev_uel = "string", nazev_uem = "string", nazev_uen = "string", nazev_te5 = "string", nazev_te6 = "string", nazev_te7 = "string", nazev_te8 = "string", nazev_te9 = "string",}
	const enum GUctVetaNazvyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GVlastnostiDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**struktura pro vlastnosti detailu*/
	interface GVlastnostiDto {
		/**název*/
		nazev?: string|null;
		/**Povinné*/
		povinne?: boolean|null;
		/**index*/
		index?: number|null;
	}
	const enum GVlastnostiDtoNames { nazev = "nazev", povinne = "povinne", index = "index",}
	const enum GVlastnostiDtoFragments { nazev = "*", povinne = "*", index = "*",}
	const enum GVlastnostiDtoTypes { nazev = "string", povinne = "boolean", index = "number",}
	const enum GVlastnostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GWflsdvaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:wflsdva*/
	interface GWflsdvaDto {
		/**DBCOLUMN:wflsdva.ixs_dva*/
		ixs_dva?: string|null;
		/**DBCOLUMN:wflsdva.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsdva.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:typ_vazby_txt*/
		typ_vazby_txt?: string|null;
	}
	const enum GWflsdvaDtoNames { ixs_dva = "ixs_dva", nazev = "nazev", typ_vazby = "typ_vazby", typ_vazby_txt = "typ_vazby_txt",}
	const enum GWflsdvaDtoFragments { ixs_dva = "*", nazev = "*", typ_vazby = "*", typ_vazby_txt = "*",}
	const enum GWflsdvaDtoTypes { ixs_dva = "string", nazev = "string", typ_vazby = "number", typ_vazby_txt = "string",}
	const enum GWflsdvaDtoTypeLengths { ixs_dva = 12, nazev = 100, typ_vazby_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GWflsIxpDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:wflsixp*/
	interface GWflsixpDto {
		/**DBCOLUMN:wflsixp.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:wflsixp.lic*/
		lic?: string|null;
		/**DBCOLUMN:wflsixp.rok*/
		rok?: number|null;
		/**DBCOLUMN:wflsixp.status_pis*/
		status_pis?: number|null;
		/**akt_znacka*/
		akt_znacka?: string|null;
		/**nazev - nenašel jsem v DB*/
		nazev?: string|null;
	}
	const enum GWflsixpDtoNames { ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", akt_znacka = "akt_znacka", nazev = "nazev",}
	const enum GWflsixpDtoFragments { ixp = "*", lic = "*", rok = "*", status_pis = "*", akt_znacka = "*", nazev = "*",}
	const enum GWflsixpDtoTypes { ixp = "string", lic = "string", rok = "number", status_pis = "number", akt_znacka = "string", nazev = "string",}
	const enum GWflsixpDtoTypeLengths { ixp = 12, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Gordic.Sml.Interface.GWflvdfkSmlDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Record pro PFK*/
	interface GWflvdfkSmlDto {
		/**pid dokladu PFK*/
		ixp?: string|null;
		/**stav_vyriz - stav schválení*/
		stav_vyriz?: number|null;
		/**počet aktivních dokladů PFK*/
		num_akt?: number|null;
		/**existence ele. přílohy*/
		s_ele?: number|null;
	}
	const enum GWflvdfkSmlDtoNames { ixp = "ixp", stav_vyriz = "stav_vyriz", num_akt = "num_akt", s_ele = "s_ele",}
	const enum GWflvdfkSmlDtoFragments { ixp = "*", stav_vyriz = "*", num_akt = "*", s_ele = "*",}
	const enum GWflvdfkSmlDtoTypes { ixp = "string", stav_vyriz = "number", num_akt = "number", s_ele = "number",}
	const enum GWflvdfkSmlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\GSmlDetailOldDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Detailu dokladu pres DTO*/
	interface GSmlDetailOldDto {
		/**ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlspid.ixs_esu	DBCOLUMN:smlspid.ico_esu*/
		ico_esu?: string|null;
		/**smlspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlspid.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlspid.bu_ci*/
		bu_ci?: string|null;
		/**bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:smlspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:smlspid.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:smlspid.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:smlspid.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:smlspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:smlspid.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:smlspid.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:smlspid.zadavatel*/
		zadavatel?: string|null;
		/**DBCOLUMN:smlspid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:smlspid.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:smlspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlspid.c_dod*/
		c_dod?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:smlspid.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:smlspid.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:smlspid.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:smlspid.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:smlspid.ixs_orj_fun*/
		ixs_orj_fun?: string|null;
		/**DBCOLUMN:smlspid.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:smlspid.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlspid.ac_nad*/
		ac_nad?: string|null;
		/**DBCOLUMN:smlspid.ac_sml_nad*/
		ac_sml_nad?: string|null;
		/**DBCOLUMN:smlspid.num_obj*/
		num_obj?: number|null;
		/**DBCOLUMN:smlspid.num_dod*/
		num_dod?: number|null;
		/**DBCOLUMN:smlspid.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:smlspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:smlspid.ixs_ref_zast*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:smlspid.ixs_esu_zast*/
		ixs_esu_zast?: string|null;
		/**DBCOLUMN:smlspid.lic_zast_esu*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:smlspid.por_zast_esu*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:smlspid.dat_dok_1*/
		dat_dok_1?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_dok_2*/
		dat_dok_2?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_zuk*/
		ixs_zuk?: string|null;
		/**DBCOLUMN:smlspid.ktg_zuk*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:smlspid.dat_uko*/
		dat_uko?: JsonDate|null;
		/**DBCOLUMN:smlspid.zp_def_ceny*/
		zp_def_ceny?: number|null;
		/**DBCOLUMN:smlspid.cislo_dod*/
		cislo_dod?: number|null;
		/**DBCOLUMN:smlspid.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
		/**dic_esu*/
		dic_esu?: string|null;
		/**nazev_esu*/
		nazev_esu?: string|null;
		/**rc_esu*/
		rc_esu?: string|null;
		/**stupen_ver*/
		stupen_ver?: number|null;
		/**popis vlastní org*/
		isu_txt?: string|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ktg_sml*/
		ktg_sml?: number|null;
		/**popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamDokladu.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.mena_txt*/
		mena_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_vyriz_txt*/
		ixs_fun_vyriz_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_ref_txt*/
		ixs_fun_ref_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_txt*/
		ixs_fun_akt_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.ktg_typ_nad*/
		ktg_typ_nad?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_pol*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_platnost_txt*/
		typ_platnost_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladu.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:SeznamDokladu.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:SeznamDokladu.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:SeznamDokladu.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:SeznamDokladu.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:SeznamDokladu.s_sgn*/
		s_sgn?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_dist*/
		stav_dist?: number|null;
		/**DBCOLUMN:SeznamDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:SeznamDokladu.pid_ixp_den*/
		pid_ixp_den?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:SeznamDokladu.vs*/
		vs?: string|null;
		/**DBCOLUMN:SeznamDokladu.poc_epri*/
		poc_epri?: number|null;
		/**DBCOLUMN:SeznamDokladu.num_pol*/
		num_pol?: number|null;
		/**DBCOLUMN:SeznamDokladu.num_pol_sch*/
		num_pol_sch?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_ref_zast_txt*/
		ixs_ref_zast_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_zuk_txt*/
		ixs_zuk_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_esu_zast_txt*/
		ixs_esu_zast_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_rok_rok*/
		c_rok_rok?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_pol_rok*/
		c_pol_rok?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.xxxxx*/
		xxxxx?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_fk*/
		stav_fk?: number|null;
		/**DBCOLUMN:SeznamDokladu.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.preevid*/
		preevid?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_fak_rok*/
		c_fak_rok?: string|null;
		/**následující číslo dokladu*/
		cislo_dod_next?: number|null;
		/**typ příkazu*/
		typ_cmd?: number|null;
		/**důvod storna*/
		storno_duvod?: string|null;
		/**typ esu*/
		typ_esu?: number|null;
	}
	const enum GSmlDetailOldDtoNames { ixp = "ixp", ico_esu = "ico_esu", ixs_esu = "ixs_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_ci_txt = "bu_ci_txt", ac = "ac", ac_esu = "ac_esu", ac_sml = "ac_sml", ixp_den = "ixp_den", subrada = "subrada", ktg_typ = "ktg_typ", eko_akt = "eko_akt", sml_stav = "sml_stav", dat_prij_pod = "dat_prij_pod", zadavatel = "zadavatel", poznamka = "poznamka", soutez = "soutez", dat_zmena = "dat_zmena", c_dod = "c_dod", typ_platnost = "typ_platnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", ixs_orj_fun = "ixs_orj_fun", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", num_obj = "num_obj", num_dod = "num_dod", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", priz_view = "priz_view", ixs_ref_zast = "ixs_ref_zast", ixs_esu_zast = "ixs_esu_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", zp_def_ceny = "zp_def_ceny", cislo_dod = "cislo_dod", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", dic_esu = "dic_esu", nazev_esu = "nazev_esu", rc_esu = "rc_esu", stupen_ver = "stupen_ver", isu_txt = "isu_txt", ixs_pri = "ixs_pri", ktg_sml = "ktg_sml", popis = "popis", c = "c", c_mena = "c_mena", mena_txt = "mena_txt", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", ixs_typ_txt = "ixs_typ_txt", ixs_esu_txt = "ixs_esu_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", nks = "nks", ktg_typ_nad = "ktg_typ_nad", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", c_pol = "c_pol", nazev = "nazev", ac_ver_zak = "ac_ver_zak", typ_platnost_txt = "typ_platnost_txt", ixs_orj_txt = "ixs_orj_txt", dat_ucinnost = "dat_ucinnost", ico = "ico", ucs = "ucs", c_fak = "c_fak", c_obj_sml = "c_obj_sml", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", s_ele = "s_ele", s_fyz = "s_fyz", s_sgn = "s_sgn", stav_dist = "stav_dist", rok = "rok", typ_ceny = "typ_ceny", pid_ixp_den = "pid_ixp_den", typ_phl = "typ_phl", vs = "vs", poc_epri = "poc_epri", num_pol = "num_pol", num_pol_sch = "num_pol_sch", ixs_ref_zast_txt = "ixs_ref_zast_txt", ixs_zuk_txt = "ixs_zuk_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", c_rok_rok = "c_rok_rok", c_pol_rok = "c_pol_rok", xxxxx = "xxxxx", stav_fk = "stav_fk", dat_vyst = "dat_vyst", preevid = "preevid", ixs_fun_akt = "ixs_fun_akt", c_fak_rok = "c_fak_rok", cislo_dod_next = "cislo_dod_next", typ_cmd = "typ_cmd", storno_duvod = "storno_duvod", typ_esu = "typ_esu",}
	const enum GSmlDetailOldDtoFragments { ixp = "*", ico_esu = "*", ixs_esu = "*", sk_ci = "*", bu_ci = "*", bu_ci_txt = "*", ac = "*", ac_esu = "*", ac_sml = "*", ixp_den = "*", subrada = "*", ktg_typ = "*", eko_akt = "*", sml_stav = "*", dat_prij_pod = "*", zadavatel = "*", poznamka = "*", soutez = "*", dat_zmena = "*", c_dod = "*", typ_platnost = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", ixs_orj_fun = "*", ixp_sml = "*", ixp_sml_pri = "*", ac_nad = "*", ac_sml_nad = "*", num_obj = "*", num_dod = "*", kurz = "*", m = "*", typ_kurz = "*", priz_view = "*", ixs_ref_zast = "*", ixs_esu_zast = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", zp_def_ceny = "*", cislo_dod = "*", dat_sgn = "*", dat_sgn_ext = "*", dic_esu = "*", nazev_esu = "*", rc_esu = "*", stupen_ver = "*", isu_txt = "*", ixs_pri = "*", ktg_sml = "*", popis = "*", c = "*", c_mena = "*", mena_txt = "*", dat_uzavreni = "*", dat_platnost = "*", ixs_typ_txt = "*", ixs_esu_txt = "*", ixs_fun_vyriz_txt = "*", ixs_fun_ref_txt = "*", ixs_fun_akt_txt = "*", nks = "*", ktg_typ_nad = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", c_pol = "*", nazev = "*", ac_ver_zak = "*", typ_platnost_txt = "*", ixs_orj_txt = "*", dat_ucinnost = "*", ico = "*", ucs = "*", c_fak = "*", c_obj_sml = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", s_ele = "*", s_fyz = "*", s_sgn = "*", stav_dist = "*", rok = "*", typ_ceny = "*", pid_ixp_den = "*", typ_phl = "*", vs = "*", poc_epri = "*", num_pol = "*", num_pol_sch = "*", ixs_ref_zast_txt = "*", ixs_zuk_txt = "*", ixs_esu_zast_txt = "*", c_rok_rok = "*", c_pol_rok = "*", xxxxx = "*", stav_fk = "*", dat_vyst = "*", preevid = "*", ixs_fun_akt = "*", c_fak_rok = "*", cislo_dod_next = "*", typ_cmd = "*", storno_duvod = "*", typ_esu = "*",}
	const enum GSmlDetailOldDtoTypes { ixp = "string", ico_esu = "string", ixs_esu = "string", sk_ci = "string", bu_ci = "string", bu_ci_txt = "string", ac = "string", ac_esu = "string", ac_sml = "string", ixp_den = "string", subrada = "number", ktg_typ = "number", eko_akt = "number", sml_stav = "number", dat_prij_pod = "JsonDate", zadavatel = "string", poznamka = "string", soutez = "string", dat_zmena = "JsonDate", c_dod = "JsonDecimal", typ_platnost = "number", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", ixs_orj_fun = "string", ixp_sml = "string", ixp_sml_pri = "string", ac_nad = "string", ac_sml_nad = "string", num_obj = "number", num_dod = "number", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", priz_view = "number", ixs_ref_zast = "string", ixs_esu_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", zp_def_ceny = "number", cislo_dod = "number", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", dic_esu = "string", nazev_esu = "string", rc_esu = "string", stupen_ver = "number", isu_txt = "string", ixs_pri = "string", ktg_sml = "number", popis = "string", c = "JsonDecimal", c_mena = "JsonDecimal", mena_txt = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", ixs_typ_txt = "string", ixs_esu_txt = "string", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", ixs_fun_akt_txt = "string", nks = "string", ktg_typ_nad = "number", ixs_fun_vyriz = "string", ixs_fun_ref = "string", c_pol = "JsonDecimal", nazev = "string", ac_ver_zak = "string", typ_platnost_txt = "string", ixs_orj_txt = "string", dat_ucinnost = "JsonDate", ico = "string", ucs = "string", c_fak = "JsonDecimal", c_obj_sml = "JsonDecimal", fin_od = "number", fin_do = "number", sgn_stav = "number", s_ele = "number", s_fyz = "number", s_sgn = "number", stav_dist = "number", rok = "number", typ_ceny = "number", pid_ixp_den = "string", typ_phl = "string", vs = "string", poc_epri = "number", num_pol = "number", num_pol_sch = "number", ixs_ref_zast_txt = "string", ixs_zuk_txt = "string", ixs_esu_zast_txt = "string", c_rok_rok = "JsonDecimal", c_pol_rok = "JsonDecimal", xxxxx = "number", stav_fk = "number", dat_vyst = "JsonDate", preevid = "number", ixs_fun_akt = "string", c_fak_rok = "string", cislo_dod_next = "number", typ_cmd = "number", storno_duvod = "string", typ_esu = "number",}
	const enum GSmlDetailOldDtoTypeLengths { ixp = 12, ico_esu = 10, ixs_esu = 12, sk_ci = 11, bu_ci = 34, ac = 30, ac_esu = 20, ac_sml = 30, ixp_den = 12, zadavatel = 30, poznamka = 500, soutez = 30, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12, ixp_sml = 12, ixp_sml_pri = 12, ac_nad = 30, ac_sml_nad = 30, ixs_ref_zast = 12, ixs_esu_zast = 12, lic_zast_esu = 4, ixs_zuk = 12, popis = 254, mena_txt = 12, ixs_typ_txt = 50, ixs_esu_txt = 254, ixs_fun_vyriz_txt = 50, ixs_fun_ref_txt = 50, ixs_fun_akt_txt = 50, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, nazev = 4000, ac_ver_zak = 30, typ_platnost_txt = 20, ixs_orj_txt = 25, ico = 10, ucs = 10, pid_ixp_den = 12, typ_phl = 4, vs = 12, ixs_ref_zast_txt = 50, ixs_zuk_txt = 12, ixs_esu_zast_txt = 12, ixs_fun_akt = 12, c_fak_rok = 20, storno_duvod = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\GSmlDodavateleDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Sezanam dodavatelu pro detail  Dto*/
	interface GSmlDodavateleDto {
		/**DBCOLUMN:smlsesu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlsesu.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:smlsesu.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:smlsesu.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlsesu.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:smlsesu.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:smlsesu.ixs_esu_zast*/
		ixs_esu_zast?: string|null;
		/**DBCOLUMN:smlsesu.lic_zast_esu*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:smlsesu.por_zast_esu*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:smlsesu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:smlsesu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlsesu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:smlsesu.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:ginsesu.rc*/
		rc_esu?: string|null;
		/**DBCOLUMN:gindesu.prijmeni,jmeno*/
		ixs_esu_zast_txt?: string|null;
		/**DBCOLUMN:ginsesu.esu_txt*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:wflctyv.wflctyv*/
		typ_vazby_txt?: string|null;
	}
	const enum GSmlDodavateleDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ac_esu = "ac_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", typ_vazby = "typ_vazby", ixs_esu_zast = "ixs_esu_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_sml_pri = "ixp_sml_pri", rc_esu = "rc_esu", ixs_esu_zast_txt = "ixs_esu_zast_txt", ixs_esu_txt = "ixs_esu_txt", typ_vazby_txt = "typ_vazby_txt",}
	const enum GSmlDodavateleDtoFragments { ixp = "*", ixs_esu = "*", ico_esu = "*", ac_esu = "*", sk_ci = "*", bu_ci = "*", typ_vazby = "*", ixs_esu_zast = "*", lic_zast_esu = "*", por_zast_esu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixp_sml_pri = "*", rc_esu = "*", ixs_esu_zast_txt = "*", ixs_esu_txt = "*", typ_vazby_txt = "*",}
	const enum GSmlDodavateleDtoTypes { ixp = "string", ixs_esu = "string", ico_esu = "string", ac_esu = "string", sk_ci = "string", bu_ci = "string", typ_vazby = "number", ixs_esu_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_sml_pri = "string", rc_esu = "string", ixs_esu_zast_txt = "string", ixs_esu_txt = "string", typ_vazby_txt = "string",}
	const enum GSmlDodavateleDtoTypeLengths { ixp = 12, ixs_esu = 12, ico_esu = 10, ac_esu = 20, sk_ci = 11, bu_ci = 34, ixs_esu_zast = 12, lic_zast_esu = 4, zmenu_prov = 12, ixp_sml_pri = 12, rc_esu = 10, ixs_esu_zast_txt = 50, ixs_esu_txt = 254, typ_vazby_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\GSmlSeznamDokladuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**GSmlSeznamDokladuDto*/
	interface GSmlSeznamDokladuDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:SeznamDokladu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamDokladu.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:SeznamDokladu.ac*/
		ac?: string|null;
		/**DBCOLUMN:SeznamDokladu.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamDokladu.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_mena_doc*/
		c_mena_doc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.mena_txt*/
		mena_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.rc_esu*/
		rc_esu?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_vyriz_txt*/
		ixs_fun_vyriz_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_ref_txt*/
		ixs_fun_ref_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_txt*/
		ixs_fun_akt_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.ktg_den*/
		ktg_den?: number|null;
		/**DBCOLUMN:SeznamDokladu.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:SeznamDokladu.ktg_typ_nad*/
		ktg_typ_nad?: number|null;
		/**DBCOLUMN:SeznamDokladu.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_pol*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_dod*/
		c_dod?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.soutez*/
		soutez?: string|null;
		/**soutez_txt*/
		soutez_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:SeznamDokladu.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:SeznamDokladu.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:SeznamDokladu.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_platnost_txt*/
		typ_platnost_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladu.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:SeznamDokladu.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:SeznamDokladu.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:SeznamDokladu.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:SeznamDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:SeznamDokladu.bu_ci*/
		bu_ci?: string|null;
		/**bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_ceny*/
		typ_ceny?: number|null;
		/**typ_ceny_txt*/
		typ_ceny_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.pid_ixp_den*/
		pid_ixp_den?: string|null;
		/**DBCOLUMN:SeznamDokladu.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:SeznamDokladu.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_ref_zast*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_esu_zast*/
		ixs_esu_zast?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:SeznamDokladu.lic_zast_esu*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:SeznamDokladu.por_zast_esu*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:SeznamDokladu.dat_dok_1*/
		dat_dok_1?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.dat_dok_2*/
		dat_dok_2?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.ixs_zuk*/
		ixs_zuk?: string|null;
		/**DBCOLUMN:SeznamDokladu.ktg_zuk*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:SeznamDokladu.dat_uko*/
		dat_uko?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:SeznamDokladu.vs*/
		vs?: string|null;
		/**DBCOLUMN:SeznamDokladu.poc_epri*/
		poc_epri?: number|null;
		/**DBCOLUMN:SeznamDokladu.num_pol*/
		num_pol?: number|null;
		/**DBCOLUMN:SeznamDokladu.num_pol_sch*/
		num_pol_sch?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_ref_zast_txt*/
		ixs_ref_zast_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_zuk_txt*/
		ixs_zuk_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_esu_zast_txt*/
		ixs_esu_zast_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_rok_rok*/
		c_rok_rok?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_pol_rok*/
		c_pol_rok?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.xxxxx*/
		xxxxx?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_fk*/
		stav_fk?: number|null;
		/**DBCOLUMN:SeznamDokladu.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.preevid*/
		preevid?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_fak_rok*/
		c_fak_rok?: JsonDecimal|null;
		/**c_mena_doc_bez_dph*/
		c_mena_doc_bez_dph?: JsonDecimal|null;
		/**c_mena_doc_dph*/
		c_mena_doc_dph?: JsonDecimal|null;
		/**c_mena_doc_s_dph*/
		c_mena_doc_s_dph?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.rok_den*/
		rok_den?: number|null;
		/**priz_opce*/
		priz_opce?: number|null;
		/**priz_opce_zkr*/
		priz_opce_zkr?: string|null;
	}
	const enum GSmlSeznamDokladuDtoNames { ixp = "ixp", ac_sml = "ac_sml", ac = "ac", popis = "popis", c = "c", c_mena = "c_mena", c_mena_doc = "c_mena_doc", mena_txt = "mena_txt", dat_prij_pod = "dat_prij_pod", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", poznamka = "poznamka", ixs_typ_txt = "ixs_typ_txt", rc_esu = "rc_esu", ixs_esu_txt = "ixs_esu_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", nks = "nks", ktg_den = "ktg_den", ktg_typ = "ktg_typ", ktg_typ_nad = "ktg_typ_nad", sml_stav = "sml_stav", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", c_pol = "c_pol", c_dod = "c_dod", nazev = "nazev", soutez = "soutez", soutez_txt = "soutez_txt", ac_ver_zak = "ac_ver_zak", ucinnost = "ucinnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", typ_platnost = "typ_platnost", typ_platnost_txt = "typ_platnost_txt", ixs_orj = "ixs_orj", ixs_orj_txt = "ixs_orj_txt", dat_ucinnost = "dat_ucinnost", ico = "ico", ucs = "ucs", c_fak = "c_fak", c_obj_sml = "c_obj_sml", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", ixs_pri = "ixs_pri", ixp_den = "ixp_den", subrada = "subrada", rok = "rok", ico_esu = "ico_esu", bu_ci = "bu_ci", bu_ci_txt = "bu_ci_txt", sk_ci = "sk_ci", typ_ceny = "typ_ceny", typ_ceny_txt = "typ_ceny_txt", pid_ixp_den = "pid_ixp_den", priz_view = "priz_view", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ktg_sml = "ktg_sml", ixs_ref_zast = "ixs_ref_zast", ixs_esu_zast = "ixs_esu_zast", ixs_esu = "ixs_esu", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", typ_phl = "typ_phl", vs = "vs", poc_epri = "poc_epri", num_pol = "num_pol", num_pol_sch = "num_pol_sch", ixs_ref_zast_txt = "ixs_ref_zast_txt", ixs_zuk_txt = "ixs_zuk_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", c_rok_rok = "c_rok_rok", c_pol_rok = "c_pol_rok", xxxxx = "xxxxx", stav_fk = "stav_fk", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", dat_vyst = "dat_vyst", preevid = "preevid", ixs_fun_akt = "ixs_fun_akt", c_fak_rok = "c_fak_rok", c_mena_doc_bez_dph = "c_mena_doc_bez_dph", c_mena_doc_dph = "c_mena_doc_dph", c_mena_doc_s_dph = "c_mena_doc_s_dph", rok_den = "rok_den", priz_opce = "priz_opce", priz_opce_zkr = "priz_opce_zkr", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GSmlSeznamDokladuDtoFragments { ixp = "*", ac_sml = "*", ac = "*", popis = "*", c = "*", c_mena = "*", c_mena_doc = "*", mena_txt = "*", dat_prij_pod = "*", dat_uzavreni = "*", dat_platnost = "*", poznamka = "*", ixs_typ_txt = "*", rc_esu = "*", ixs_esu_txt = "*", ixs_fun_vyriz_txt = "*", ixs_fun_ref_txt = "*", ixs_fun_akt_txt = "*", nks = "*", ktg_den = "*", ktg_typ = "*", ktg_typ_nad = "*", sml_stav = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", c_pol = "*", c_dod = "*", nazev = "*", soutez = "*", soutez_txt = "*", ac_ver_zak = "*", ucinnost = "*", ac_dok_1 = "*", ac_dok_2 = "*", typ_platnost = "*", typ_platnost_txt = "*", ixs_orj = "*", ixs_orj_txt = "*", dat_ucinnost = "*", ico = "*", ucs = "*", c_fak = "*", c_obj_sml = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", ixs_pri = "*", ixp_den = "*", subrada = "*", rok = "*", ico_esu = "*", bu_ci = "*", bu_ci_txt = "*", sk_ci = "*", typ_ceny = "*", typ_ceny_txt = "*", pid_ixp_den = "*", priz_view = "*", ixp_sml = "*", ixp_sml_pri = "*", ktg_sml = "*", ixs_ref_zast = "*", ixs_esu_zast = "*", ixs_esu = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", typ_phl = "*", vs = "*", poc_epri = "*", num_pol = "*", num_pol_sch = "*", ixs_ref_zast_txt = "*", ixs_zuk_txt = "*", ixs_esu_zast_txt = "*", c_rok_rok = "*", c_pol_rok = "*", xxxxx = "*", stav_fk = "*", dat_sgn = "*", dat_sgn_ext = "*", dat_vyst = "*", preevid = "*", ixs_fun_akt = "*", c_fak_rok = "*", c_mena_doc_bez_dph = "*", c_mena_doc_dph = "*", c_mena_doc_s_dph = "*", rok_den = "*", priz_opce = "*", priz_opce_zkr = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GSmlSeznamDokladuDtoTypes { ixp = "string", ac_sml = "string", ac = "string", popis = "string", c = "JsonDecimal", c_mena = "JsonDecimal", c_mena_doc = "JsonDecimal", mena_txt = "string", dat_prij_pod = "JsonDate", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", poznamka = "string", ixs_typ_txt = "string", rc_esu = "string", ixs_esu_txt = "string", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", ixs_fun_akt_txt = "string", nks = "string", ktg_den = "number", ktg_typ = "number", ktg_typ_nad = "number", sml_stav = "number", ixs_fun_vyriz = "string", ixs_fun_ref = "string", c_pol = "JsonDecimal", c_dod = "JsonDecimal", nazev = "string", soutez = "string", soutez_txt = "string", ac_ver_zak = "string", ucinnost = "string", ac_dok_1 = "string", ac_dok_2 = "string", typ_platnost = "number", typ_platnost_txt = "string", ixs_orj = "string", ixs_orj_txt = "string", dat_ucinnost = "JsonDate", ico = "string", ucs = "string", c_fak = "JsonDecimal", c_obj_sml = "JsonDecimal", fin_od = "number", fin_do = "number", sgn_stav = "number", ixs_pri = "string", ixp_den = "string", subrada = "number", rok = "number", ico_esu = "string", bu_ci = "string", bu_ci_txt = "string", sk_ci = "string", typ_ceny = "number", typ_ceny_txt = "string", pid_ixp_den = "string", priz_view = "number", ixp_sml = "string", ixp_sml_pri = "string", ktg_sml = "number", ixs_ref_zast = "string", ixs_esu_zast = "string", ixs_esu = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", typ_phl = "string", vs = "string", poc_epri = "number", num_pol = "number", num_pol_sch = "number", ixs_ref_zast_txt = "string", ixs_zuk_txt = "string", ixs_esu_zast_txt = "string", c_rok_rok = "JsonDecimal", c_pol_rok = "JsonDecimal", xxxxx = "number", stav_fk = "number", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", dat_vyst = "JsonDate", preevid = "number", ixs_fun_akt = "string", c_fak_rok = "JsonDecimal", c_mena_doc_bez_dph = "JsonDecimal", c_mena_doc_dph = "JsonDecimal", c_mena_doc_s_dph = "JsonDecimal", rok_den = "number", priz_opce = "number", priz_opce_zkr = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GSmlSeznamDokladuDtoTypeLengths { ixp = 12, ac_sml = 30, ac = 30, popis = 254, mena_txt = 12, poznamka = 500, ixs_typ_txt = 50, rc_esu = 34, ixs_esu_txt = 254, ixs_fun_vyriz_txt = 50, ixs_fun_ref_txt = 50, ixs_fun_akt_txt = 50, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, nazev = 4000, soutez = 30, ac_ver_zak = 30, ucinnost = 20, ac_dok_1 = 25, ac_dok_2 = 25, typ_platnost_txt = 20, ixs_orj = 12, ixs_orj_txt = 25, ico = 10, ucs = 10, ixs_pri = 12, ixp_den = 12, ico_esu = 10, bu_ci = 34, sk_ci = 11, pid_ixp_den = 12, ixp_sml = 12, ixp_sml_pri = 12, ixs_ref_zast = 12, ixs_esu_zast = 12, ixs_esu = 12, lic_zast_esu = 4, ixs_zuk = 12, typ_phl = 4, vs = 12, ixs_ref_zast_txt = 50, ixs_zuk_txt = 12, ixs_esu_zast_txt = 12, ixs_fun_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GFuccupoDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:fuccupo*/
	interface GFuccupoDto {
		/**DBCOLUMN:fuccupo.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:fuccupo.ktg_upo_txt*/
		ktg_upo_txt?: string|null;
		/**DBCOLUMN:fuccupo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:fuccupo.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:fuccupo.priz_dd*/
		priz_dd?: number|null;
		/**DBCOLUMN:fuccupo.druh_upo*/
		druh_upo?: number|null;
		/**DBCOLUMN:fuccupo.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:fuccupo.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:fuccupo.priz_uz_upo*/
		priz_uz_upo?: number|null;
		/**DBCOLUMN:fuccupo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:fuccupo.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GFuccupoDtoNames { ktg_upo = "ktg_upo", ktg_upo_txt = "ktg_upo_txt", k_v = "k_v", k_s = "k_s", priz_dd = "priz_dd", druh_upo = "druh_upo", k_xml = "k_xml", cs_nazev = "cs_nazev", priz_uz_upo = "priz_uz_upo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GFuccupoDtoFragments { ktg_upo = "*", ktg_upo_txt = "*", k_v = "*", k_s = "*", priz_dd = "*", druh_upo = "*", k_xml = "*", cs_nazev = "*", priz_uz_upo = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GFuccupoDtoTypes { ktg_upo = "number", ktg_upo_txt = "string", k_v = "number", k_s = "string", priz_dd = "number", druh_upo = "number", k_xml = "string", cs_nazev = "string", priz_uz_upo = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GFuccupoDtoTypeLengths { ktg_upo_txt = 50, k_s = 15, k_xml = 254, cs_nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GGindesuDto.d.ts 

declare namespace Gordic.Sml.Interface {
    /**DBTABLE:gindesu*/
	interface GGindesuDto {
        /**DBCOLUMN:gindesu.ixs_esu*/
		ixs_esu?: string|null;
        /**DBCOLUMN:gindesu.lic*/
		lic?: string|null;
        /**DBCOLUMN:gindesu.por_zast*/
		por_zast?: number|null;
        /**DBCOLUMN:gindesu.prijmeni*/
		prijmeni?: string|null;
        /**DBCOLUMN:gindesu.jmeno*/
		jmeno?: string|null;
        /**DBCOLUMN:gindesu.funkce*/
		funkce?: string|null;
        /**DBCOLUMN:gindesu.tit_pred*/
		tit_pred?: string|null;
        /**DBCOLUMN:gindesu.tit_za*/
		tit_za?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GGinsorjDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ginsorj*/
	interface GGinsorjDto {
		/**DBCOLUMN:ginsorj.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:ginsorj.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsorj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsorj.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsorj.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsorj.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsorj.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsorj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsorj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsorj.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsorj.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsorj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsorj.uroven_orj*/
		uroven_orj?: number|null;
		/**DBCOLUMN:ginsorj.ixs_nad*/
		ixs_nad?: string|null;
		/**DBCOLUMN:ginsorj.kod_orj*/
		kod_orj?: string|null;
		/**DBCOLUMN:ginsorj.ixs_isu*/
		ixs_isu?: string|null;
		/**DBCOLUMN:ginsorj.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginsorj.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:ginsorj.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsorj.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:ginsorj.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsorj.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsorj.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsorj.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsorj.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsorj.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsorj.ico*/
		ico?: string|null;
	}
	const enum GGinsorjDtoNames { ixs_orj = "ixs_orj", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", uroven_orj = "uroven_orj", ixs_nad = "ixs_nad", kod_orj = "kod_orj", ixs_isu = "ixs_isu", ixs_fun = "ixs_fun", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", z_int = "z_int", dat_mpd = "dat_mpd", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico",}
	const enum GGinsorjDtoFragments { ixs_orj = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", uroven_orj = "*", ixs_nad = "*", kod_orj = "*", ixs_isu = "*", ixs_fun = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", z_int = "*", dat_mpd = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*",}
	const enum GGinsorjDtoTypes { ixs_orj = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", uroven_orj = "number", ixs_nad = "string", kod_orj = "string", ixs_isu = "string", ixs_fun = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", z_int = "number", dat_mpd = "JsonDate", tel = "string", fax = "string", ixs_lpc = "string", ico = "string",}
	const enum GGinsorjDtoTypeLengths { ixs_orj = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 25, ixs_nad = 12, kod_orj = 30, ixs_isu = 12, ixs_fun = 12, ofic_nazev = 100, cs_nazev = 25, mail = 254, tel = 33, fax = 33, ixs_lpc = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlctplDto.d.ts 

declare namespace Gordic.Sml.Interface {
    /**DBTABLE:smlctpl*/
	interface GSmlctplDto {
        /**DBCOLUMN:smlctpl.typ_platnost*/
		typ_platnost?: number|null;
        /**DBCOLUMN:smlctpl.typ_platnost_txt*/
		typ_platnost_txt?: string|null;
        /**DBCOLUMN:smlctpl.typ_platnost_zkr*/
		typ_platnost_zkr?: string|null;
        /**DBCOLUMN:smlctpl.k_v*/
		k_v?: number|null;
        /**DBCOLUMN:smlctpl.k_s*/
		k_s?: string|null;
        /**DBCOLUMN:smlctpl.k_xml*/
		k_xml?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlFunVyrizDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr vyřizujícího referenta*/
	interface GSmlFunVyrizDto {
		/**ixs_fun*/
		ixs_fun?: string|null;
		/**nazev_ref*/
		nazev_ref?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**cs_nazev*/
		cs_nazev?: string|null;
	}
	const enum GSmlFunVyrizDtoNames { ixs_fun = "ixs_fun", nazev_ref = "nazev_ref", nazev = "nazev", nazev_rf = "nazev_rf", cs_nazev = "cs_nazev",}
	const enum GSmlFunVyrizDtoFragments { ixs_fun = "*", nazev_ref = "*", nazev = "*", nazev_rf = "*", cs_nazev = "*",}
	const enum GSmlFunVyrizDtoTypes { ixs_fun = "string", nazev_ref = "string", nazev = "string", nazev_rf = "string", cs_nazev = "string",}
	const enum GSmlFunVyrizDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlKnihaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr knihy*/
	interface GSmlKnihaDto {
		/**ixp*/
		ixp?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**nazev*/
		id?: string|null;
		/**rok*/
		rok?: number|null;
		/**smlsden.ktg_den*/
		ktg_den?: number|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**subrada*/
		subrada?: number|null;
	}
	const enum GSmlKnihaDtoNames { ixp = "ixp", nazev = "nazev", id = "id", rok = "rok", ktg_den = "ktg_den", ixp_den = "ixp_den", subrada = "subrada",}
	const enum GSmlKnihaDtoFragments { ixp = "*", nazev = "*", id = "*", rok = "*", ktg_den = "*", ixp_den = "*", subrada = "*",}
	const enum GSmlKnihaDtoTypes { ixp = "string", nazev = "string", id = "string", rok = "number", ktg_den = "number", ixp_den = "string", subrada = "number",}
	const enum GSmlKnihaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlKompDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr kompetenta*/
	interface GSmlKompDto {
		/**ixs_fun*/
		ixs_fun?: string|null;
		/**ixs_fun*/
		nazev_rf?: string|null;
		/**nazev realizatora*/
		nazev?: string|null;
		/**ixs_fun*/
		ixs_orj?: string|null;
		/**ico komponenta*/
		ico?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**cis_real*/
		cis_real?: string|null;
		/**cis_real_txt*/
		cis_real_txt?: string|null;
		/**aktivita_ekoskom*/
		aktivita_ekoskom?: string|null;
		/**priz_kom*/
		priz_kom?: number|null;
		/**nazev_rf_cs_n*/
		cs_n?: string|null;
		/**ixs fun komp*/
		ixs_fun_komp?: string|null;
		/**ixs fun komp*/
		ixs_fun_vyriz?: string|null;
	}
	const enum GSmlKompDtoNames { ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", nazev = "nazev", ixs_orj = "ixs_orj", ico = "ico", aktivita = "aktivita", cis_real = "cis_real", cis_real_txt = "cis_real_txt", aktivita_ekoskom = "aktivita_ekoskom", priz_kom = "priz_kom", cs_n = "cs_n", ixs_fun_komp = "ixs_fun_komp", ixs_fun_vyriz = "ixs_fun_vyriz",}
	const enum GSmlKompDtoFragments { ixs_fun = "*", nazev_rf = "*", nazev = "*", ixs_orj = "*", ico = "*", aktivita = "*", cis_real = "*", cis_real_txt = "*", aktivita_ekoskom = "*", priz_kom = "*", cs_n = "*", ixs_fun_komp = "*", ixs_fun_vyriz = "*",}
	const enum GSmlKompDtoTypes { ixs_fun = "string", nazev_rf = "string", nazev = "string", ixs_orj = "string", ico = "string", aktivita = "number", cis_real = "string", cis_real_txt = "string", aktivita_ekoskom = "string", priz_kom = "number", cs_n = "string", ixs_fun_komp = "string", ixs_fun_vyriz = "string",}
	const enum GSmlKompDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlPresunIxpCilDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr ixp pro přesun částky FP*/
	interface GSmlPresunIxpCilDto {
		/**ixp*/
		ixp?: string|null;
		/**ac*/
		ac?: string|null;
		/**ac_sml*/
		ac_sml?: string|null;
		/**popis*/
		popis?: string|null;
		/**c_rok*/
		c_rok?: JsonDecimal|null;
		/**cislo*/
		cislo?: number|null;
		/**c*/
		c?: JsonDecimal|null;
	}
	const enum GSmlPresunIxpCilDtoNames { ixp = "ixp", ac = "ac", ac_sml = "ac_sml", popis = "popis", c_rok = "c_rok", cislo = "cislo", c = "c",}
	const enum GSmlPresunIxpCilDtoFragments { ixp = "*", ac = "*", ac_sml = "*", popis = "*", c_rok = "*", cislo = "*", c = "*",}
	const enum GSmlPresunIxpCilDtoTypes { ixp = "string", ac = "string", ac_sml = "string", popis = "string", c_rok = "JsonDecimal", cislo = "number", c = "JsonDecimal",}
	const enum GSmlPresunIxpCilDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSmlszukDto.d.ts 

declare namespace Gordic.Sml.Interface {
    /**DBTABLE:smlszuk*/
	interface GSmlszukDto {
        /**DBCOLUMN:smlszuk.ixs_zuk*/
		ixs_zuk?: string|null;
        /**DBCOLUMN:smlszuk.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:smlszuk.zkratka*/
		zkratka?: string|null;
        /**DBCOLUMN:smlszuk.ktg_zuk*/
		ktg_zuk?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GSslstypDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:sslstyp*/
	interface GSslstypDto {
		/**DBCOLUMN:sslstyp.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:sslstyp.ktg_typ*/
		ktg_den?: number|null;
		/**DBCOLUMN:sslstyp.lic*/
		lic?: string|null;
		/**DBCOLUMN:sslstyp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sslstyp.arw*/
		arw?: number|null;
		/**DBCOLUMN:sslstyp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sslstyp.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:sslstyp.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:sslstyp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslstyp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sslstyp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sslstyp.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:sslstyp.popis*/
		popis?: string|null;
		/**DBCOLUMN:sslstyp.st_utaj_id*/
		st_utaj_id?: number|null;
		/**DBCOLUMN:sslstyp.lhuta_vyr*/
		lhuta_vyr?: number|null;
		/**DBCOLUMN:sslstyp.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:sslstyp.ixs_ulz*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:sslstyp.aktivita_ssl*/
		aktivita_ssl?: number|null;
		/**DBCOLUMN:sslstyp.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:sslstyp.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:sslstyp.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:sslstyp.s_gen_cj*/
		s_gen_cj?: number|null;
		/**DBCOLUMN:sslstyp.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:sslstyp.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:sslstyp.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:sslstyp.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:sslstyp.priz_vycet*/
		priz_vycet?: number|null;
		/**DBCOLUMN:sslstyp.ixs_cin*/
		ixs_cin?: string|null;
		/**DBCOLUMN:sslstyp.poc_dnu_vyp_dor*/
		poc_dnu_vyp_dor?: number|null;
		/**DBCOLUMN:sslstyp.ixs_typ_opr*/
		ixs_typ_opr?: string|null;
		/**DBCOLUMN:sslstyp.priz_rsp*/
		priz_rsp?: number|null;
		/**DBCOLUMN:sslstyp.ixs_frm_gform*/
		ixs_frm_gform?: string|null;
		/**DBCOLUMN:sslstyp.priz_epk*/
		priz_epk?: number|null;
		/**DBCOLUMN:sslstyp.predpl_vec*/
		predpl_vec?: string|null;
		/**DBCOLUMN:sslstyp.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:sslstyp.ixp_sablony*/
		ixp_sablony?: string|null;
		/**DBCOLUMN:sslstyp.ixs_frm_gform_spi*/
		ixs_frm_gform_spi?: string|null;
		/**DBCOLUMN:sslstyp.priz_dupli*/
		priz_dupli?: number|null;
	}
	const enum GSslstypDtoNames { ixs_typ = "ixs_typ", ktg_den = "ktg_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ktg_typ = "ktg_typ", popis = "popis", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", ofic_nazev = "ofic_nazev", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", ixs_lpc = "ixs_lpc", z_int = "z_int", cs_nazev = "cs_nazev", priz_vycet = "priz_vycet", ixs_cin = "ixs_cin", poc_dnu_vyp_dor = "poc_dnu_vyp_dor", ixs_typ_opr = "ixs_typ_opr", priz_rsp = "priz_rsp", ixs_frm_gform = "ixs_frm_gform", priz_epk = "priz_epk", predpl_vec = "predpl_vec", typ_vazby = "typ_vazby", ixp_sablony = "ixp_sablony", ixs_frm_gform_spi = "ixs_frm_gform_spi", priz_dupli = "priz_dupli",}
	const enum GSslstypDtoFragments { ixs_typ = "*", ktg_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ktg_typ = "*", popis = "*", st_utaj_id = "*", lhuta_vyr = "*", zkratka = "*", ixs_ulz = "*", aktivita_ssl = "*", spis_pl = "*", spis_znak = "*", ofic_nazev = "*", s_gen_cj = "*", ixs_esu = "*", ixs_lpc = "*", z_int = "*", cs_nazev = "*", priz_vycet = "*", ixs_cin = "*", poc_dnu_vyp_dor = "*", ixs_typ_opr = "*", priz_rsp = "*", ixs_frm_gform = "*", priz_epk = "*", predpl_vec = "*", typ_vazby = "*", ixp_sablony = "*", ixs_frm_gform_spi = "*", priz_dupli = "*",}
	const enum GSslstypDtoTypes { ixs_typ = "string", ktg_den = "number", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ktg_typ = "number", popis = "string", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", ofic_nazev = "string", s_gen_cj = "number", ixs_esu = "string", ixs_lpc = "string", z_int = "number", cs_nazev = "string", priz_vycet = "number", ixs_cin = "string", poc_dnu_vyp_dor = "number", ixs_typ_opr = "string", priz_rsp = "number", ixs_frm_gform = "string", priz_epk = "number", predpl_vec = "string", typ_vazby = "number", ixp_sablony = "string", ixs_frm_gform_spi = "string", priz_dupli = "number",}
	const enum GSslstypDtoTypeLengths { ixs_typ = 12, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ofic_nazev = 254, ixs_esu = 12, ixs_lpc = 12, cs_nazev = 50, ixs_cin = 12, ixs_typ_opr = 12, ixs_frm_gform = 12, predpl_vec = 100, ixp_sablony = 12, ixs_frm_gform_spi = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\Controls\Gordic.Sml.Interface.GVepsdupDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:vepsdup*/
	interface GVepsdupDto {
		/**DBCOLUMN:vepsdup.ixs_dup*/
		ixs_dup?: string|null;
		/**DBCOLUMN:vepsdup.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:vepsdup.ktg_poz*/
		ktg_poz?: number|null;
		/**DBCOLUMN:vepsdup.znam*/
		znam?: number|null;
		/**DBCOLUMN:vepsdup.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:vepsdup.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:vepsdup.zmenu_prov*/
		zmenu_prov?: string|null;
		/**ktg_poz_txt*/
		ktg_poz_txt?: string|null;
	}
	const enum GVepsdupDtoNames { ixs_dup = "ixs_dup", nazev = "nazev", ktg_poz = "ktg_poz", znam = "znam", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_poz_txt = "ktg_poz_txt",}
	const enum GVepsdupDtoFragments { ixs_dup = "*", nazev = "*", ktg_poz = "*", znam = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ktg_poz_txt = "*",}
	const enum GVepsdupDtoTypes { ixs_dup = "string", nazev = "string", ktg_poz = "number", znam = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_poz_txt = "string",}
	const enum GVepsdupDtoTypeLengths { ixs_dup = 12, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\FP\Gordic.Sml.Interface.GSmlEnableShowDetailListDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Návratová struktura pro přístup ke smlouvě*/
	interface GSmlEnableShowDetailListDto {
		/**návratová struktura*/
		l_GSmlFpCheckPolDto?: Gordic.Sml.Interface.GSmlFpCheckPolDto|null;
		/**struktura detailu*/
		ZaznamWflspid?: Gordic.Sml.Interface.GWflspidDto|null;
		/**struktura detailu hlp*/
		ZaznamWflPristupInfo?: Gordic.Wfl.Interface.GWflPristupInfo|null;
	}
	const enum GSmlEnableShowDetailListDtoNames { l_GSmlFpCheckPolDto = "l_GSmlFpCheckPolDto", ZaznamWflspid = "ZaznamWflspid", ZaznamWflPristupInfo = "ZaznamWflPristupInfo",}
	const enum GSmlEnableShowDetailListDtoFragments { l_GSmlFpCheckPolDto = "*", ZaznamWflspid = "*", ZaznamWflPristupInfo = "*",}
	const enum GSmlEnableShowDetailListDtoTypes { l_GSmlFpCheckPolDto = "Gordic.Sml.Interface.GSmlFpCheckPolDto", ZaznamWflspid = "Gordic.Sml.Interface.GWflspidDto", ZaznamWflPristupInfo = "Gordic.Wfl.Interface.GWflPristupInfo",}
	const enum GSmlEnableShowDetailListDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\FP\Gordic.Sml.Interface.GSmlFpCheckPolDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Ošetření dotazu Ano/Ne v metodě CheckPol*/
	interface GSmlFpCheckPolDto {
		/**úspěch/neúspěch - true/false*/
		navrat?: boolean|null;
		/**hlaska*/
		hlaska?: string|null;
		/**hlaska_err*/
		hlaska_err?: string|null;
		/**c_nove*/
		c_nove?: JsonDecimal|null;
		/**c_puvodni*/
		c_puvodni?: JsonDecimal|null;
		/**c_rozp_max*/
		c_rozp_max?: JsonDecimal|null;
		/**c_disp*/
		c_disp?: JsonDecimal|null;
		/**c_sch*/
		sgn?: number|null;
		/**up_stav*/
		up_stav?: number|null;
		/**číslo obsluhující metody*/
		cislo_metody?: number|null;
		/**odpověď na dotaz - ano/ne*/
		odpoved?: string|null;
		/**odpověď na dotaz, po které následuje volání metody OsetriDotaz(...)*/
		odpoved_pro_dalsi_zpracovani?: string|null;
		/**datum změny dokladu*/
		datumZmena?: JsonDate|null;
		/**obecné dec*/
		dec1?: JsonDecimal|null;
		/**obecné dec*/
		dec2?: JsonDecimal|null;
		/**chyba*/
		chyba?: number|null;
		/**chyba_sql*/
		chyba_sql?: number|null;
		/**ac*/
		ac?: string|null;
		/**ac_sml*/
		ac_sml?: string|null;
		/**ixp*/
		ixp?: string|null;
	}
	const enum GSmlFpCheckPolDtoNames { navrat = "navrat", hlaska = "hlaska", hlaska_err = "hlaska_err", c_nove = "c_nove", c_puvodni = "c_puvodni", c_rozp_max = "c_rozp_max", c_disp = "c_disp", sgn = "sgn", up_stav = "up_stav", cislo_metody = "cislo_metody", odpoved = "odpoved", odpoved_pro_dalsi_zpracovani = "odpoved_pro_dalsi_zpracovani", datumZmena = "datumZmena", dec1 = "dec1", dec2 = "dec2", chyba = "chyba", chyba_sql = "chyba_sql", ac = "ac", ac_sml = "ac_sml", ixp = "ixp",}
	const enum GSmlFpCheckPolDtoFragments { navrat = "*", hlaska = "*", hlaska_err = "*", c_nove = "*", c_puvodni = "*", c_rozp_max = "*", c_disp = "*", sgn = "*", up_stav = "*", cislo_metody = "*", odpoved = "*", odpoved_pro_dalsi_zpracovani = "*", datumZmena = "*", dec1 = "*", dec2 = "*", chyba = "*", chyba_sql = "*", ac = "*", ac_sml = "*", ixp = "*",}
	const enum GSmlFpCheckPolDtoTypes { navrat = "boolean", hlaska = "string", hlaska_err = "string", c_nove = "JsonDecimal", c_puvodni = "JsonDecimal", c_rozp_max = "JsonDecimal", c_disp = "JsonDecimal", sgn = "number", up_stav = "number", cislo_metody = "number", odpoved = "string", odpoved_pro_dalsi_zpracovani = "string", datumZmena = "JsonDate", dec1 = "JsonDecimal", dec2 = "JsonDecimal", chyba = "number", chyba_sql = "number", ac = "string", ac_sml = "string", ixp = "string",}
	const enum GSmlFpCheckPolDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\FP\Gordic.Sml.Interface.GSmlFpSumaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Součet na dokladové záložce FP*/
	interface GSmlFpSumaDto {
		/**c_sch*/
		celkem_rok?: JsonDecimal|null;
		/**c_sch*/
		celkem?: JsonDecimal|null;
		/**c_sch*/
		zbytek?: JsonDecimal|null;
	}
	const enum GSmlFpSumaDtoNames { celkem_rok = "celkem_rok", celkem = "celkem", zbytek = "zbytek",}
	const enum GSmlFpSumaDtoFragments { celkem_rok = "*", celkem = "*", zbytek = "*",}
	const enum GSmlFpSumaDtoTypes { celkem_rok = "JsonDecimal", celkem = "JsonDecimal", zbytek = "JsonDecimal",}
	const enum GSmlFpSumaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\FP\Gordic.Sml.Interface.GSmlInsertListDto .d.ts 

declare namespace Gordic.Sml.Interface {
	/**Návratová struktura po serverové SetInsertProc*/
	interface GSmlInsertListDto {
		/**návratová struktura*/
		l_GSmlFpCheckPolDto?: Gordic.Sml.Interface.GSmlFpCheckPolDto|null;
		/**struktura detailu*/
		l_DetailListDto?: Gordic.Sml.Interface.GDetailListDto|null;
		/**struktura detailu hlp*/
		l_HlpListDto?: Gordic.Sml.Interface.GDetailListDto|null;
	}
	const enum GSmlInsertListDtoNames { l_GSmlFpCheckPolDto = "l_GSmlFpCheckPolDto", l_DetailListDto = "l_DetailListDto", l_HlpListDto = "l_HlpListDto",}
	const enum GSmlInsertListDtoFragments { l_GSmlFpCheckPolDto = "*", l_DetailListDto = "*", l_HlpListDto = "*",}
	const enum GSmlInsertListDtoTypes { l_GSmlFpCheckPolDto = "Gordic.Sml.Interface.GSmlFpCheckPolDto", l_DetailListDto = "Gordic.Sml.Interface.GDetailListDto", l_HlpListDto = "Gordic.Sml.Interface.GDetailListDto",}
	const enum GSmlInsertListDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\FP\Gordic.Sml.Interface.GSmlIxsFunDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Data pro výběr IxsFun*/
	interface GSmlIxsFunDto {
		/**ixs_fun*/
		ixs_fun?: string|null;
		/**ixs_fun_txt*/
		ixs_fun_txt?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**cis_real*/
		cis_real?: string|null;
	}
	const enum GSmlIxsFunDtoNames { ixs_fun = "ixs_fun", ixs_fun_txt = "ixs_fun_txt", nazev = "nazev", cis_real = "cis_real",}
	const enum GSmlIxsFunDtoFragments { ixs_fun = "*", ixs_fun_txt = "*", nazev = "*", cis_real = "*",}
	const enum GSmlIxsFunDtoTypes { ixs_fun = "string", ixs_fun_txt = "string", nazev = "string", cis_real = "string",}
	const enum GSmlIxsFunDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Doklad\Dto\FP\Gordic.Sml.Interface.GSmlNactiDetailDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro načtení detailu*/
	interface GSmlNactiDetailDto {
		/**Hlaska*/
		hlaska?: string|null;
		/**DetailDokladu*/
		listDto?: Gordic.Sml.Interface.GDetailListDto|null;
		/**param1*/
		param1?: number|null;
		/**param2*/
		param2?: number|null;
		/**paramBool1*/
		paramBool1?: boolean|null;
		/**paramGInt1*/
		paramGInt1?: number|null;
	}
	const enum GSmlNactiDetailDtoNames { hlaska = "hlaska", listDto = "listDto", param1 = "param1", param2 = "param2", paramBool1 = "paramBool1", paramGInt1 = "paramGInt1",}
	const enum GSmlNactiDetailDtoFragments { hlaska = "*", listDto = "*", param1 = "*", param2 = "*", paramBool1 = "*", paramGInt1 = "*",}
	const enum GSmlNactiDetailDtoTypes { hlaska = "string", listDto = "Gordic.Sml.Interface.GDetailListDto", param1 = "number", param2 = "number", paramBool1 = "boolean", paramGInt1 = "number",}
	const enum GSmlNactiDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Init\Gordic.Sml.Interface.IGSmlGlobals.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Konstanty*/
	interface GSmlInitConsts {
		/**Klíč pro uložení globálních proměnných do cache*/
		m_csCacheKey?: string|null;
	}
	const enum GSmlInitConstsNames { m_csCacheKey = "m_csCacheKey",}
	const enum GSmlInitConstsFragments { m_csCacheKey = "*",}
	const enum GSmlInitConstsTypes { m_csCacheKey = "string",}
	const enum GSmlInitConstsTypeLengths {}
}
declare namespace Gordic.Isl.Catalog {
	/**Globální proměnné SML*/
	interface SmlGlobals {
		/**Načtení globálních proměnných*/
		getGlobals(rq?:CallParams<{}>): _Task<{},Gordic.Sml.Interface.GSmlGlobalsDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlGlobals: ServiceBase & Catalog.SmlGlobals;
	}
	const SmlGlobals: Client["SmlGlobals"];
}
declare namespace Gordic.Sml.Interface {
	/**Konfigurace polí/sloupců dokladu*/
	interface GSmlvadDto {
		/**id*/
		pol_id?: number|null;
		/**distribuovaný název*/
		db_nazev?: string|null;
		/**název definovaný uživatelem*/
		nazev?: string|null;
		/**zkratka definovaná uživatelem*/
		zkratka?: string|null;
		/**povinnost (podle typu dokladu)*/
		priz_pov?: number|null;
		/**viditelnost (podle typu dokladu)*/
		priz_vid?: number|null;
	}
	const enum GSmlvadDtoNames { pol_id = "pol_id", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", priz_pov = "priz_pov", priz_vid = "priz_vid",}
	const enum GSmlvadDtoFragments { pol_id = "*", db_nazev = "*", nazev = "*", zkratka = "*", priz_pov = "*", priz_vid = "*",}
	const enum GSmlvadDtoTypes { pol_id = "number", db_nazev = "string", nazev = "string", zkratka = "string", priz_pov = "number", priz_vid = "number",}
	const enum GSmlvadDtoTypeLengths {}
	/**Id polí pro konfiguraci polí dokladu*/
	const enum GSmlvadId {
		/**popis*/
		Popis=1,
		/**název*/
		Nazev=2,
		/**způsob ukončení*/
		IxsZuk=3,
		/**dodavatelský doklad - naše strana*/
		DodMy=4,
		/**dodavatelský doklad - cizí strana*/
		DodOni=5,
		/**číslo dodavatele*/
		DodCis=6,
		/**odběratelský doklad - naše strana*/
		OdbMy=7,
		/**odběratelský doklad - cizí strana*/
		OdbOni=8,
		/**číslo odběratele*/
		OdbCis=9,
		/**celková částka*/
		CCelk=10,
		/**základ bez daně*/
		CZaklBezDane=11,
		/**datum uzavření*/
		DatUzavreni=12,
		/**datum platnosti*/
		DatPlatnost=13,
		/**zastoupený*/
		IxsRefZast=14,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Init\Dto\Gordic.Sml.Interface.GSmlSeznamDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Společný předek seznamového DTO*/
	interface GSmlSeznamDto {
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
		/**Primární klíč tabulky v položkách filtrů (sloupce oddělené čárkami)*/
		readonly PrimaryKeyInFilters?: string|null;
	}
	const enum GSmlSeznamDtoNames { PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GSmlSeznamDtoFragments { PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GSmlSeznamDtoTypes { PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GSmlSeznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Init\Dto\Gordic.Sml.Interface.GSmlSeznamWflDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Společný předek seznamového DTO rozšířený o sloupce WFL*/
	interface GSmlSeznamWflDto extends Gordic.Sml.Interface.GSmlSeznamDto {
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
	const enum GSmlSeznamWflDtoNames { ixp = "ixp", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GSmlSeznamWflDtoFragments { ixp = "*", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GSmlSeznamWflDtoTypes { ixp = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GSmlSeznamWflDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Ostatni\Gordic.Sml.Interface.IGAgenda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Agenda
	* @domain Smlouvy
	*/
	interface AgendaSml {
		/**Načte seznam agend*/
		list(rq?:Gordic.Eko.Interface.GEkoAgendaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Kontrola agend před uzavřením / otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Sml.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GAgendaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Uzavření / otevření agendy*/
		uzavri(rq?:Gordic.Sml.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GAgendaUzavreniOperationDto>,GServiceActionResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Hromadné uzavření / zrušení uzavření předaných agend*/
		hromadneUzavri(rq?:Gordic.Sml.Interface.GAgendaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GAgendaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GAgendaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Vrátí oprávnění uzávěrky agendy (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
		/**Vrátí oprávnění uzávěrky agendy*/
		getPermissions(rq?:CallParams<{typAg:number}>): _Task<{typAg:number},Gordic.Eko.Interface.GEkoAgendaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AgendaSml: ServiceBase & Catalog.AgendaSml;
	}
	const AgendaSml: Client["AgendaSml"];
}
declare namespace Gordic.Sml.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Ostatni\Gordic.Sml.Interface.IGHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání záznamů
	* @domain Smlouvy
	*/
	interface HledaniSml {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniSml: ServiceBase & Catalog.HledaniSml;
	}
	const HledaniSml: Client["HledaniSml"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Ostatni\Gordic.Sml.Interface.IGKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha
	* @domain Smlouvy
	*/
	interface KnihaSml {
		/**Načte seznam knih*/
		list(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoKnihaDto>>;
		/**Kontrola knih před uzavřením / otevřením*/
		zkontrolujPredUzavrenim(rq?:Gordic.Sml.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GKnihaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Uzavření / otevření knihy*/
		uzavri(rq?:Gordic.Sml.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceActionRequest<Gordic.Sml.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceActionRequest<Gordic.Sml.Interface.GKnihaUzavreniOperationDto>,GServiceActionResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Hromadné uzavření / zrušení uzavření předaných knih*/
		hromadneUzavri(rq?:Gordic.Sml.Interface.GKnihaUzavreniOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GKnihaUzavreniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GKnihaUzavreniOperationDto>,GServiceGroupResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Vrátí oprávnění uzávěrky knih (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoKnihaPermissions>;
		/**Vrátí oprávnění uzávěrky knihy*/
		getPermissions(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Eko.Interface.GEkoKnihaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		KnihaSml: ServiceBase & Catalog.KnihaSml;
	}
	const KnihaSml: Client["KnihaSml"];
}
declare namespace Gordic.Sml.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Ostatni\Gordic.Sml.Interface.IGPomocne.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pomocné metody
	* @domain Smlouvy
	*/
	interface PomocneSml {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PomocneSml: ServiceBase & Catalog.PomocneSml;
	}
	const PomocneSml: Client["PomocneSml"];
}
declare namespace Gordic.Sml.Interface {
	/**Společné parametry (hromadné) SML operace*/
	interface GSmlOperationDto<TDto> {
		/**aktuální IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: TDto[]|null;
	}
	const enum GSmlOperationDtoNames { ikc = "ikc", rows = "rows",}
	const enum GSmlOperationDtoFragments { ikc = "*", rows = "*",}
	const enum GSmlOperationDtoTypes { ikc = "Gordic.General.GIkc", rows = "TDto[]",}
	const enum GSmlOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Pripad\Gordic.Sml.Interface.IGPripadSml.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Společný předek pro případ SML
	*     
	* @domain Smlouvy
	*/
	interface PripadSml {
		/**
		*     Inicializace DTO případu SML
		*     
		*/
		init(rq?:CallParams<{}>): _Task<{},Gordic.Sml.Interface.GPripadSmlDto>;
		/**
		*     Načte detail případu SML
		*     
		*/
		read(rq?:Gordic.Sml.Interface.GPripadSmlDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GPripadSmlDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GPripadSmlDto>,GServiceReadResponse<Gordic.Sml.Interface.GPripadSmlDto>>;
		/**
		*     Načte seznam případů SML
		*     
		*/
		list(rq?:Gordic.Sml.Interface.GPripadSmlFilterDto|CallParams<GServiceListRequestWithOrder<Gordic.Sml.Interface.GPripadSmlOrderBy>>): _Task<GServiceListRequestWithOrder<Gordic.Sml.Interface.GPripadSmlOrderBy>,GServiceListResponse<Gordic.Sml.Interface.GPripadSmlDto>>;
		/**
		*     Zjistí počet případů SML
		*     
		*/
		listCount(rq?:Gordic.Sml.Interface.GPripadSmlFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     Kontrola předaných případů před finanční kontrolou
		*     
		*/
		zkontrolujPredFinancniKontrolou(rq?:Gordic.Sml.Interface.GPripadSmlFinancniKontrolaOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GPripadSmlFinancniKontrolaOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GPripadSmlFinancniKontrolaOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GPripadSmlPkDto>>;
		/**
		*     Vrátí oprávnění případů SML (společné pro celý seznam)
		*     
		*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Sml.Interface.GPripadSmlServicePermission>;
		/**
		*     Vrácení všech typů dokumentů ke kategoriím typu dokumentů
		*     
		*/
		vratVsechnyIxsTyp(rq?:CallParams<{ktgTyp:number[]}>): _Task<{ktgTyp:number[]},string[]>;
		/**
		*     Vrácení další číslo dodatku případu
		*     
		*/
		vratDalsiCisloDodatku(rq?:CallParams<{ixpSmlPri:string}>): _Task<{ixpSmlPri:string},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PripadSml: ServiceBase & Catalog.PripadSml;
	}
	const PripadSml: Client["PripadSml"];
}
declare namespace Gordic.Sml.Interface {
	/**
	*     Oprávnění pro jeden případ SML
	*     
	*/
	interface GPripadSmlPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat finanční kontrolu*/
		LzePodatFK: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat finanční kontrolu*/
		LzeStornovatFK: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout finanční kontrolu*/
		LzeTisknoutFK: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat průběžnou kontrolu*/
		LzePodatPK: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat průběžnou kontrolu*/
		LzeStornovatPK: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout průběžnou kontrolu*/
		LzeTisknoutPK: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat účetní kontrolu*/
		LzePodatUK: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat účetní kontrolu*/
		LzeStornovatUK: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout účetní kontrolu*/
		LzeTisknoutUK: Gordic.General.ApplicationInterface.GPermission;
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
	}
	const enum GPripadSmlPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzePodatFK = "LzePodatFK", LzeStornovatFK = "LzeStornovatFK", LzeTisknoutFK = "LzeTisknoutFK", LzePodatPK = "LzePodatPK", LzeStornovatPK = "LzeStornovatPK", LzeTisknoutPK = "LzeTisknoutPK", LzePodatUK = "LzePodatUK", LzeStornovatUK = "LzeStornovatUK", LzeTisknoutUK = "LzeTisknoutUK", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout", LzeDiagnostika = "LzeDiagnostika",}
	const enum GPripadSmlPermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzePodatFK = "*", LzeStornovatFK = "*", LzeTisknoutFK = "*", LzePodatPK = "*", LzeStornovatPK = "*", LzeTisknoutPK = "*", LzePodatUK = "*", LzeStornovatUK = "*", LzeTisknoutUK = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*", LzeDiagnostika = "*",}
	const enum GPripadSmlPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzePodatFK = "Gordic.General.ApplicationInterface.GPermission", LzeStornovatFK = "Gordic.General.ApplicationInterface.GPermission", LzeTisknoutFK = "Gordic.General.ApplicationInterface.GPermission", LzePodatPK = "Gordic.General.ApplicationInterface.GPermission", LzeStornovatPK = "Gordic.General.ApplicationInterface.GPermission", LzeTisknoutPK = "Gordic.General.ApplicationInterface.GPermission", LzePodatUK = "Gordic.General.ApplicationInterface.GPermission", LzeStornovatUK = "Gordic.General.ApplicationInterface.GPermission", LzeTisknoutUK = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeDiagnostika = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPripadSmlPermissionTypeLengths {}
	/**
	*     Fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)
	*     
	*/
	interface GPripadSmlPermissionRequiredFragments {
		/**fragmenty potřebné pro konkrétní oprávnění (pouze pro fragmenty jiné než je základní Base)*/
		FragmentsForPermissions?: any|null;
	}
	const enum GPripadSmlPermissionRequiredFragmentsNames { FragmentsForPermissions = "FragmentsForPermissions",}
	const enum GPripadSmlPermissionRequiredFragmentsFragments { FragmentsForPermissions = "*",}
	const enum GPripadSmlPermissionRequiredFragmentsTypes { FragmentsForPermissions = "any",}
	const enum GPripadSmlPermissionRequiredFragmentsTypeLengths {}
	/**
	*     Oprávnění pro práci nad případy SML
	*     
	*/
	interface GPripadSmlServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**lze podat finanční kontrolu*/
		LzePodatFK: Gordic.General.ApplicationInterface.GPermission;
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
	const enum GPripadSmlServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzePodatFK = "LzePodatFK", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzeVratitDoWfl = "LzeVratitDoWfl", LzeZkontrolovatMetadata = "LzeZkontrolovatMetadata", LzeTisknout = "LzeTisknout",}
	const enum GPripadSmlServicePermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzePodatFK = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzePreevidovat = "*", LzeVratitDoWfl = "*", LzeZkontrolovatMetadata = "*", LzeTisknout = "*",}
	const enum GPripadSmlServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzePodatFK = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeZkontrolovatMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPripadSmlServicePermissionTypeLengths {}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu případů SML
	*     
	*/
	const enum GPripadSmlFilter {
		/**PID případu SML*/
		ixp_sml_pri,
		/**kategorie*/
		ktg_sml,
		/**stav*/
		sml_stav,
		/**popis*/
		popis,
		/**úplný název*/
		nazev,
		/**agendové číslo*/
		ac_sml,
		/**kategorie typu dokladu*/
		ktg_typ,
		/**typ dokladu*/
		ixs_typ,
		/**existence v tabulce wfltpre*/
		tpre_ano,
		/**IKC v tabulce wfltpre*/
		tpre_ikc,
		/**příznak vyškrtnutého pohybu v tabulce wfltpre*/
		tpre_uncheck,
		/**pomocná vazba na tabulku wfltpre místo hodnot primárního klíče (na klientu se nesmí používat)*/
		server_ikc_tpre,
	}
	/**
	*     Výčet sloupců pro řazení
	*     
	*/
	const enum GPripadSmlOrderBy {
		/**datum poslední změny*/
		dat_zmena,
	}
	/**
	*     Parametry schválení / zrušení schválení dokladů
	*     
	*/
	interface GPripadSmlFinancniKontrolaOperationDto extends Gordic.Sml.Interface.GSmlOperationDto<Gordic.Sml.Interface.GPripadSmlDto> {
		/**požadovaná operace (true = podání)*/
		podat?: boolean|null;
	}
	const enum GPripadSmlFinancniKontrolaOperationDtoNames { podat = "podat", ikc = "ikc", rows = "rows",}
	const enum GPripadSmlFinancniKontrolaOperationDtoFragments { podat = "*", ikc = "*", rows = "*",}
	const enum GPripadSmlFinancniKontrolaOperationDtoTypes { podat = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Sml.Interface.GPripadSmlDto[]",}
	const enum GPripadSmlFinancniKontrolaOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Pripad\Dto\Gordic.Sml.Interface.GPripadSmlDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Případ SML*/
	interface GPripadSmlDto extends Gordic.Sml.Interface.GSmlSeznamDto {
		/**PID případu*/
		ixp_sml_pri?: string|null;
		/**agendové číslo*/
		ac_sml?: string|null;
		/**IČO*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**celková částka financování v měně dokladu*/
		c_mena?: JsonDecimal|null;
		/**celková smluvní částka v měně*/
		c_mena_doc?: JsonDecimal|null;
		/**celkový rozpis částky na roky v CZK*/
		c?: JsonDecimal|null;
		/**celkový součet částek položek FP v CZK*/
		c_pol?: JsonDecimal|null;
		/**měna*/
		mena?: number|null;
		/**kategorie smlouvy*/
		ktg_sml?: number|null;
		/**datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**vyřizující referent*/
		ixs_fun_ref?: string|null;
		/**číslo realizátora*/
		cis_real?: string|null;
		/**vazba případu na případ blokační agendy*/
		ixs_pri?: string|null;
		/**vazba případu nabídku blokační agendy*/
		ixp_nab?: string|null;
		/**typ blokační agendy EVZ, VFP, EPO, RZA*/
		typ_ag_blok?: number|null;
		/**vazba na RZA*/
		por_cislo_nab?: number|null;
		/**financování od*/
		fin_od?: number|null;
		/**financování do*/
		fin_do?: number|null;
		/**stav podepsání nebo-li formalizace*/
		sgn_stav?: number|null;
		/**typ ceny (pevná, volná)*/
		typ_ceny?: number|null;
		/**rok uzavření smlouvy*/
		rok?: number|null;
		/**počet položek*/
		num_pol?: number|null;
		/**počet schválených položek*/
		num_pol_sch?: number|null;
		/**počet položek FP případu v daném roce, které jsou či mají být rezervovány v IISSP*/
		num_pol_iissp?: number|null;
		/**stav rezervace v IISSP*/
		stav_rez_iissp?: number|null;
		/**název stavu rezervace v IISSP*/
		stav_rez_iissp_txt?: string|null;
		/**počet roků smlouvy*/
		num_rok?: number|null;
		/**celková částka rozpisu smlouvy na roky v dané měně*/
		c_mena_rok_sum?: JsonDecimal|null;
		/**maximální rok financování = zadaných položek*/
		max_rok_pol?: number|null;
		/**c_kal*/
		c_kal?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu*/
		c_vz?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu*/
		c_obj?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu*/
		c_dod_bnd?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ*/
		c_sml?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu v dané měně*/
		c_obj_mena?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu v dané měně*/
		c_dod_bnd_mena?: JsonDecimal|null;
		/**suma smluv vázaných na rámcovou smlouvu*/
		c_smlrs_bnd?: JsonDecimal|null;
		/**suma smluv vázaných na rámcovou smlouvu v dané měně*/
		c_smlrs_bnd_mena?: JsonDecimal|null;
		/**počet vázaných smluv na RS*/
		num_smlrs_bnd?: number|null;
		/**popis*/
		popis?: string|null;
		/**cena rezervací vázaných na doklad v Kč*/
		c_fak?: JsonDecimal|null;
		/**objednáno SML případu*/
		c_obj_sml?: JsonDecimal|null;
		/**disponibilita*/
		c_disp?: JsonDecimal|null;
		/**rozpis případu v aktuálním období v Kč*/
		c_rok_rok?: JsonDecimal|null;
		/**položky FP přpadu v aktuálním období v Kč*/
		c_pol_rok?: JsonDecimal|null;
		/**očekávané čerpání případem v aktuálním období v Kč*/
		c_fak_rok?: JsonDecimal|null;
		/**typ smlouvy*/
		ixs_typ?: string|null;
		/**přesný název smlouvy*/
		nazev?: string|null;
		/**číslo veřejné zakázky, dotačního titulu*/
		ac_ver_zak?: string|null;
		/**cena položek věcného profilu případu*/
		c_sml_vp?: JsonDecimal|null;
		/**cena položek věcného profilu případu v měně*/
		c_sml_mena_vp?: JsonDecimal|null;
		/**příznak účtování o podmíněných závazcích/pohledávkách*/
		priz_pzp?: number|null;
		/**dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**typ pohledávky*/
		typ_phl?: string|null;
		/**variabilní symbol*/
		vs?: string|null;
		/**c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**číslo maximálního dodatku smlouvy*/
		cislo_dod_max?: number|null;
		/**stav rozpisu v daném roce*/
		sml_stav?: number|null;
		/**počet položek financovaných z rozpočtových účtů*/
		fin_from_roz?: number|null;
		/**datum rezervace rozpočtových prostředků v IISSP*/
		dat_rad_iissp?: JsonDate|null;
		/**příznak opce*/
		priz_opce?: number|null;
		/**kategorie typu smlouvy*/
		ktg_typ?: number|null;
		/**kombinovaný stav finanční a průběžné kontroly*/
		stav_fk_pk?: number|null;
		/**rez_iissp_odeslano*/
		rez_iissp_odeslano?: boolean|null;
		/**datum poslední změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**název stavu*/
		sml_stav_txt?: string|null;
		/**zkratka stavu*/
		sml_stav_zkr?: string|null;
		/**název kategorie typu dokladu*/
		ktg_typ_txt?: string|null;
		/**název typu dokladu*/
		ixs_typ_txt?: string|null;
		/**název kompetenta*/
		ixs_fun_vyriz_txt?: string|null;
		/**název realizítora*/
		cis_real_txt?: string|null;
		/**jeden rok smluvního případu - aktuální účetní období*/
		smlrok?: Gordic.Sml.Interface.GCastkaPripadSmlRokDto|null;
		/**finanční kontrola*/
		pfk?: Gordic.Sml.Interface.GKontrolaPripadSmlDto|null;
		/**průběžná kontrola*/
		prk?: Gordic.Sml.Interface.GKontrolaPripadSmlDto|null;
		/**účetní kontrola*/
		uk?: Gordic.Sml.Interface.GKontrolaPripadSmlDto|null;
		/**státní pokladna*/
		iissp?: Gordic.Sml.Interface.GIisspPripadSmlDto|null;
		/**vyhodnocení finanční kontroly v kombinaci s průběžnou*/
		pfrk_stav?: boolean|null;
		/**Je doklad podaný?*/
		readonly JePodan?: boolean|null;
		/**Je případ výdajový?*/
		readonly JeVydaj?: boolean|null;
		/**Je případ příjmový?*/
		readonly JePrijem?: boolean|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Sml.Interface.GPripadSmlPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GPripadSmlDtoNames { ixp_sml_pri = "ixp_sml_pri", ac_sml = "ac_sml", ico = "ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c_mena_doc = "c_mena_doc", c = "c", c_pol = "c_pol", mena = "mena", ktg_sml = "ktg_sml", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", typ_ag_blok = "typ_ag_blok", por_cislo_nab = "por_cislo_nab", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", rok = "rok", num_pol = "num_pol", num_pol_sch = "num_pol_sch", num_pol_iissp = "num_pol_iissp", stav_rez_iissp = "stav_rez_iissp", stav_rez_iissp_txt = "stav_rez_iissp_txt", num_rok = "num_rok", c_mena_rok_sum = "c_mena_rok_sum", max_rok_pol = "max_rok_pol", c_kal = "c_kal", c_vz = "c_vz", c_obj = "c_obj", c_dod_bnd = "c_dod_bnd", c_sml = "c_sml", c_obj_mena = "c_obj_mena", c_dod_bnd_mena = "c_dod_bnd_mena", c_smlrs_bnd = "c_smlrs_bnd", c_smlrs_bnd_mena = "c_smlrs_bnd_mena", num_smlrs_bnd = "num_smlrs_bnd", popis = "popis", c_fak = "c_fak", c_obj_sml = "c_obj_sml", c_disp = "c_disp", c_rok_rok = "c_rok_rok", c_pol_rok = "c_pol_rok", c_fak_rok = "c_fak_rok", ixs_typ = "ixs_typ", nazev = "nazev", ac_ver_zak = "ac_ver_zak", c_sml_vp = "c_sml_vp", c_sml_mena_vp = "c_sml_mena_vp", priz_pzp = "priz_pzp", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", cislo_dod_max = "cislo_dod_max", sml_stav = "sml_stav", fin_from_roz = "fin_from_roz", dat_rad_iissp = "dat_rad_iissp", priz_opce = "priz_opce", ktg_typ = "ktg_typ", stav_fk_pk = "stav_fk_pk", rez_iissp_odeslano = "rez_iissp_odeslano", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sml_stav_txt = "sml_stav_txt", sml_stav_zkr = "sml_stav_zkr", ktg_typ_txt = "ktg_typ_txt", ixs_typ_txt = "ixs_typ_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", cis_real_txt = "cis_real_txt", smlrok = "smlrok", pfk = "pfk", prk = "prk", uk = "uk", iissp = "iissp", pfrk_stav = "pfrk_stav", JePodan = "JePodan", JeVydaj = "JeVydaj", JePrijem = "JePrijem", Permissions = "Permissions", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GPripadSmlDtoFragments { ixp_sml_pri = "Base", ac_sml = "Base", ico = "Base", ucs = "Base", nks = "Base", c_mena = "Base", c_mena_doc = "Base", c = "Base", c_pol = "c_pol", mena = "Base", ktg_sml = "Base", dat_uzavreni = "Base", dat_platnost = "Base", dat_ucinnost = "Base", ixs_fun_vyriz = "Base", ixs_fun_ref = "Base", cis_real = "Base", ixs_pri = "Base", ixp_nab = "Base", typ_ag_blok = "Base", por_cislo_nab = "Base", fin_od = "Base", fin_do = "Base", sgn_stav = "Base", typ_ceny = "Base", rok = "main2", num_pol = "num_pol", num_pol_sch = "num_pol_sch", num_pol_iissp = "main2", stav_rez_iissp = "stav_rez_iissp", stav_rez_iissp_txt = "stav_rez_iissp", num_rok = "num_rok", c_mena_rok_sum = "c_mena_rok_sum", max_rok_pol = "max_rok_pol", c_kal = "main2", c_vz = "main2", c_obj = "main2", c_dod_bnd = "main2", c_sml = "main2", c_obj_mena = "main2", c_dod_bnd_mena = "main2", c_smlrs_bnd = "main2", c_smlrs_bnd_mena = "main2", num_smlrs_bnd = "main2", popis = "Base", c_fak = "c_fak", c_obj_sml = "c_obj_sml", c_disp = "c_disp", c_rok_rok = "c_rok_rok", c_pol_rok = "c_pol_rok", c_fak_rok = "c_fak_rok", ixs_typ = "Base", nazev = "Base", ac_ver_zak = "Base", c_sml_vp = "vp", c_sml_mena_vp = "vp", priz_pzp = "Base", dat_dph_od = "main2", dat_dph_do = "main2", c_mena_z_osv = "Base", c_mena_z_bd = "Base", c_mena_z_ss = "Base", c_mena_z_ns = "Base", c_mena_dph_ss = "Base", c_mena_dph_ns = "Base", c_c_mena_ss = "Base", c_c_mena_ns = "Base", c_c_mena_okr = "Base", typ_phl = "Base", vs = "Base", c_mena_dph_3s = "Base", c_mena_dph_4s = "Base", c_mena_z_3s = "Base", c_mena_z_4s = "Base", c_c_mena_3s = "Base", c_c_mena_4s = "Base", cislo_dod_max = "main2", sml_stav = "Base", fin_from_roz = "main2", dat_rad_iissp = "Base", priz_opce = "Base", ktg_typ = "Base", stav_fk_pk = "WFL_FK_PK", rez_iissp_odeslano = "iissp", dat_zmena = "Base", zmenu_prov = "Base", sml_stav_txt = "stav", sml_stav_zkr = "stav", ktg_typ_txt = "kategorie_dokladu", ixs_typ_txt = "typ_dokladu", ixs_fun_vyriz_txt = "kompetent", cis_real_txt = "realizator", smlrok = "smlrok", pfk = "WFL_FK_PK", prk = "WFL_FK_PK", uk = "uc_kontrola", iissp = "iissp", pfrk_stav = "WFL_FK_PK", JePodan = "*", JeVydaj = "*", JePrijem = "*", Permissions = "Permissions", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GPripadSmlDtoTypes { ixp_sml_pri = "string", ac_sml = "string", ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c_mena_doc = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", mena = "number", ktg_sml = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", ixs_pri = "string", ixp_nab = "string", typ_ag_blok = "number", por_cislo_nab = "number", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", rok = "number", num_pol = "number", num_pol_sch = "number", num_pol_iissp = "number", stav_rez_iissp = "number", stav_rez_iissp_txt = "string", num_rok = "number", c_mena_rok_sum = "JsonDecimal", max_rok_pol = "number", c_kal = "JsonDecimal", c_vz = "JsonDecimal", c_obj = "JsonDecimal", c_dod_bnd = "JsonDecimal", c_sml = "JsonDecimal", c_obj_mena = "JsonDecimal", c_dod_bnd_mena = "JsonDecimal", c_smlrs_bnd = "JsonDecimal", c_smlrs_bnd_mena = "JsonDecimal", num_smlrs_bnd = "number", popis = "string", c_fak = "JsonDecimal", c_obj_sml = "JsonDecimal", c_disp = "JsonDecimal", c_rok_rok = "JsonDecimal", c_pol_rok = "JsonDecimal", c_fak_rok = "JsonDecimal", ixs_typ = "string", nazev = "string", ac_ver_zak = "string", c_sml_vp = "JsonDecimal", c_sml_mena_vp = "JsonDecimal", priz_pzp = "number", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", cislo_dod_max = "number", sml_stav = "number", fin_from_roz = "number", dat_rad_iissp = "JsonDate", priz_opce = "number", ktg_typ = "number", stav_fk_pk = "number", rez_iissp_odeslano = "boolean", dat_zmena = "JsonDate", zmenu_prov = "string", sml_stav_txt = "string", sml_stav_zkr = "string", ktg_typ_txt = "string", ixs_typ_txt = "string", ixs_fun_vyriz_txt = "string", cis_real_txt = "string", smlrok = "Gordic.Sml.Interface.GCastkaPripadSmlRokDto", pfk = "Gordic.Sml.Interface.GKontrolaPripadSmlDto", prk = "Gordic.Sml.Interface.GKontrolaPripadSmlDto", uk = "Gordic.Sml.Interface.GKontrolaPripadSmlDto", iissp = "Gordic.Sml.Interface.GIisspPripadSmlDto", pfrk_stav = "boolean", JePodan = "boolean", JeVydaj = "boolean", JePrijem = "boolean", Permissions = "Gordic.Sml.Interface.GPripadSmlPermission", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GPripadSmlDtoTypeLengths { ixp_sml_pri = 12, ac_sml = 30, ico = 10, ucs = 10, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, cis_real = 6, ixs_pri = 12, ixp_nab = 12, stav_rez_iissp = 254, stav_rez_iissp_txt = 254, popis = 254, ixs_typ = 12, nazev = 4000, ac_ver_zak = 30, typ_phl = 4, vs = 12, zmenu_prov = 12,}
	/**Primární klíč případu SML*/
	interface GPripadSmlPkDto {
		/**PID případu SML*/
		ixp_sml_pri?: string|null;
	}
	const enum GPripadSmlPkDtoNames { ixp_sml_pri = "ixp_sml_pri",}
	const enum GPripadSmlPkDtoFragments { ixp_sml_pri = "*",}
	const enum GPripadSmlPkDtoTypes { ixp_sml_pri = "string",}
	const enum GPripadSmlPkDtoTypeLengths { ixp_sml_pri = 12,}
	/**
	*     Částka případu pro jeden rok
	*     
	*/
	interface GCastkaPripadSmlRokDto {
		/**rok smluvního případu*/
		rok?: number|null;
		/**identifikace plánu*/
		ixp_pla?: string|null;
		/**typ měny*/
		mena?: number|null;
		/**cena v cizí měně*/
		c_mena?: JsonDecimal|null;
		/**cena v Kč*/
		c?: JsonDecimal|null;
		/**cena položek pro daný rok v Kč*/
		c_pol?: JsonDecimal|null;
		/**stav rozpisu v daném roce*/
		sml_stav?: number|null;
		/**vlastní BÚ - pouze kvůli SP*/
		bu_vl?: string|null;
		/**směrový kód vlastního BÚ - pouze kvůli SP*/
		sk_vl?: string|null;
		/**suma vázaných objednávek na smlouvu za daný rok*/
		c_obj?: JsonDecimal|null;
		/**cena za vázané faktury na smlouvu v Kč za daný rok*/
		c_fak?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu za daný rok*/
		c_vz?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ za daný rok*/
		c_sml?: JsonDecimal|null;
		/**částka objednávek vázaných na smlouvu v Kč za daný rok*/
		c_objsml?: JsonDecimal|null;
		/**počet položek smlouvy za daný rok*/
		num_pol?: number|null;
		/**cena platebního kalndáře za období*/
		c_kal?: JsonDecimal|null;
		/**cena platebního kalndáře za období v dané měně*/
		c_mena_kal?: JsonDecimal|null;
		/**součet položek odpovídajících typu dokladu = krytí*/
		c_pol_norm?: JsonDecimal|null;
		/**součet rezervace položek odpovídajících typu dokladu = krytí*/
		c_fak_norm?: JsonDecimal|null;
		/**součet položek odpovídajících typu dokladu = vratky*/
		c_pol_anti?: JsonDecimal|null;
		/**součet rezervace položek odpovídajících typu dokladu = vratky*/
		c_fak_anti?: JsonDecimal|null;
		/**částka za smlouvy vázané na rámcovou smlouvu za daný rok*/
		c_smlRS_bnd?: JsonDecimal|null;
		/**disponibilní částka*/
		c_disp?: JsonDecimal|null;
		/**nápočet limitů realizátorů - cena*/
		c_limit_real?: JsonDecimal|null;
		/**nápočet limitů realizátorů - cena za vázané faktury*/
		c_fak_limit_real?: JsonDecimal|null;
	}
	const enum GCastkaPripadSmlRokDtoNames { rok = "rok", ixp_pla = "ixp_pla", mena = "mena", c_mena = "c_mena", c = "c", c_pol = "c_pol", sml_stav = "sml_stav", bu_vl = "bu_vl", sk_vl = "sk_vl", c_obj = "c_obj", c_fak = "c_fak", c_vz = "c_vz", c_sml = "c_sml", c_objsml = "c_objsml", num_pol = "num_pol", c_kal = "c_kal", c_mena_kal = "c_mena_kal", c_pol_norm = "c_pol_norm", c_fak_norm = "c_fak_norm", c_pol_anti = "c_pol_anti", c_fak_anti = "c_fak_anti", c_smlRS_bnd = "c_smlRS_bnd", c_disp = "c_disp", c_limit_real = "c_limit_real", c_fak_limit_real = "c_fak_limit_real",}
	const enum GCastkaPripadSmlRokDtoFragments { rok = "Base", ixp_pla = "Base", mena = "Base", c_mena = "Base", c = "Base", c_pol = "Base", sml_stav = "Base", bu_vl = "Base", sk_vl = "Base", c_obj = "Base", c_fak = "Base", c_vz = "Base", c_sml = "Base", c_objsml = "Base", num_pol = "Base", c_kal = "Base", c_mena_kal = "Base", c_pol_norm = "Base", c_fak_norm = "Base", c_pol_anti = "Base", c_fak_anti = "Base", c_smlRS_bnd = "Base", c_disp = "Base", c_limit_real = "limt_real", c_fak_limit_real = "limt_real",}
	const enum GCastkaPripadSmlRokDtoTypes { rok = "number", ixp_pla = "string", mena = "number", c_mena = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", sml_stav = "number", bu_vl = "string", sk_vl = "string", c_obj = "JsonDecimal", c_fak = "JsonDecimal", c_vz = "JsonDecimal", c_sml = "JsonDecimal", c_objsml = "JsonDecimal", num_pol = "number", c_kal = "JsonDecimal", c_mena_kal = "JsonDecimal", c_pol_norm = "JsonDecimal", c_fak_norm = "JsonDecimal", c_pol_anti = "JsonDecimal", c_fak_anti = "JsonDecimal", c_smlRS_bnd = "JsonDecimal", c_disp = "JsonDecimal", c_limit_real = "JsonDecimal", c_fak_limit_real = "JsonDecimal",}
	const enum GCastkaPripadSmlRokDtoTypeLengths { ixp_pla = 12, bu_vl = 34, sk_vl = 11,}
	/**
	*     Finanční / průběžná / účetní kontrola případu
	*     
	*/
	interface GKontrolaPripadSmlDto {
		/**období, ve kterém je kontrola vedena*/
		rok?: number|null;
		/**PID dokladu kontroly*/
		ixp?: string|null;
		/**počet aktivních dokladů PFK vázaných na případ*/
		num_akt?: number|null;
		/**stav schválení žádosti*/
		stav_vyriz?: number|null;
		/**příznak existence el.obrazu dokumentu PFK*/
		s_ele?: number|null;
	}
	const enum GKontrolaPripadSmlDtoNames { rok = "rok", ixp = "ixp", num_akt = "num_akt", stav_vyriz = "stav_vyriz", s_ele = "s_ele",}
	const enum GKontrolaPripadSmlDtoFragments { rok = "Base", ixp = "Base", num_akt = "Base", stav_vyriz = "Base", s_ele = "Base",}
	const enum GKontrolaPripadSmlDtoTypes { rok = "number", ixp = "string", num_akt = "number", stav_vyriz = "number", s_ele = "number",}
	const enum GKontrolaPripadSmlDtoTypeLengths { ixp = 12,}
	/**
	*     Inforamce o rezervacích ve státní pokladně
	*     
	*/
	interface GIisspPripadSmlDto {
		/**počet aktivních rezervačních dokladů případu*/
		pocet?: number|null;
		/**počet aktivních rezervačních dokladů případu připravených k rezervaci*/
		pripraveno?: number|null;
		/**počet aktivních odeslaných rezervačních dokladů případu*/
		odeslano?: number|null;
		/**počet aktivních schválených rezervačních dokladů případu*/
		schvaleno?: number|null;
		/**počet aktivních s výhradou schválených rezervačních dokladů případu*/
		schval_vyh?: number|null;
		/**počet aktivních zamítnutých rezervačních dokladů případu*/
		zamitnuto?: number|null;
		/**stav případu textově*/
		stav_pripadu?: string|null;
		/**stav případu*/
		priz_rezsp?: number|null;
		/**počet položek připravených k rezervaci*/
		pocet_pol_pripraveno_rez?: number|null;
	}
	const enum GIisspPripadSmlDtoNames { pocet = "pocet", pripraveno = "pripraveno", odeslano = "odeslano", schvaleno = "schvaleno", schval_vyh = "schval_vyh", zamitnuto = "zamitnuto", stav_pripadu = "stav_pripadu", priz_rezsp = "priz_rezsp", pocet_pol_pripraveno_rez = "pocet_pol_pripraveno_rez",}
	const enum GIisspPripadSmlDtoFragments { pocet = "Base", pripraveno = "Base", odeslano = "Base", schvaleno = "Base", schval_vyh = "Base", zamitnuto = "Base", stav_pripadu = "Base", priz_rezsp = "Base", pocet_pol_pripraveno_rez = "Base",}
	const enum GIisspPripadSmlDtoTypes { pocet = "number", pripraveno = "number", odeslano = "number", schvaleno = "number", schval_vyh = "number", zamitnuto = "number", stav_pripadu = "string", priz_rezsp = "number", pocet_pol_pripraveno_rez = "number",}
	const enum GIisspPripadSmlDtoTypeLengths { stav_pripadu = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Pripad\Dto\Gordic.Sml.Interface.GPripadSmlFilterDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Filtr seznamu případů SML*/
	interface GPripadSmlFilterDto {
		/**PID případu SML*/
		ixp_sml_pri?: GBaseFilter<string>|null;
		/**kategorie*/
		ktg_sml?: GBaseFilter<number>|null;
		/**stav*/
		sml_stav?: GBaseFilter<number>|null;
		/**popis*/
		popis?: GBaseFilter<string>|null;
		/**úplný název*/
		nazev?: GBaseFilter<string>|null;
		/**agendové číslo*/
		ac_sml?: GIntervalDto<string>|null;
		/**kategorie typu dokladu*/
		ktg_typ?: GBaseFilter<number>|null;
		/**typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**existence v tabulce wfltpre*/
		tpre_ano?: number|null;
		/**IKC v tabulce wfltpre*/
		tpre_ikc?: Gordic.General.GIkc|null;
		/**příznak vyškrtnutého pohybu v tabulce wfltpre*/
		tpre_uncheck?: number|null;
	}
	const enum GPripadSmlFilterDtoNames { ixp_sml_pri = "ixp_sml_pri", ktg_sml = "ktg_sml", sml_stav = "sml_stav", popis = "popis", nazev = "nazev", ac_sml = "ac_sml", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", tpre_ano = "tpre_ano", tpre_ikc = "tpre_ikc", tpre_uncheck = "tpre_uncheck",}
	const enum GPripadSmlFilterDtoFragments { ixp_sml_pri = "*", ktg_sml = "*", sml_stav = "*", popis = "*", nazev = "*", ac_sml = "*", ktg_typ = "*", ixs_typ = "*", tpre_ano = "*", tpre_ikc = "*", tpre_uncheck = "*",}
	const enum GPripadSmlFilterDtoTypes { ixp_sml_pri = "GBaseFilter<string>", ktg_sml = "GBaseFilter<number>", sml_stav = "GBaseFilter<number>", popis = "GBaseFilter<string>", nazev = "GBaseFilter<string>", ac_sml = "GIntervalDto<string>", ktg_typ = "GBaseFilter<number>", ixs_typ = "GBaseFilter<string>", tpre_ano = "number", tpre_ikc = "Gordic.General.GIkc", tpre_uncheck = "number",}
	const enum GPripadSmlFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\GSmlEnums.d.ts 

declare namespace Gordic.Sml.Interface {
	/**kategorie běžného účtu*/
	const enum TypBeznyUcet {
		/**typ běžného účtu*/
		ng_typbuOut=10,
		/**příjmový účet*/
		ng_typbuIn=20,
	}
	/**příznak, jak vzniknul záznam položky FP
	*     doplnění likvidací
	*/
	const enum VznikPolozky {
		/**!záznam vzniknul ze SML*/
		ng_prizzazSmlKryti=0,
		/**záznam vzniknul jako vratka z jiné agendy (BPL, HPL)*/
		ng_prizzazVratkaKryti=10,
		/**záznam vzniknul ze SML*/
		ng_prizzazSmlLikvidace=100,
		/**záznam vzniknul jako vratka z jiné agendy (BPL, HPL)*/
		ng_prizzazVratkaLikvidace=110,
		/**372.14 12.08.14 vratky příjmu, vratky výdaje*/
		ng_prizzazVratkaKrytiVP=12,
		/**záznam vzniknul jako vratka z jiné agendy (BPL, HPL) -  vratky příjmu, výdaje*/
		ng_prizzazVratkaLikvidaceVP=112,
	}
	/**354.12 22.11.05 typy generování předpisů pohledávek*/
	const enum TypGenerovaniPredpisu {
		/**!neurčeno*/
		ng_typgenNone=-1,
		/**!předpis je vytvořen na základě pravidel aných cizí agendou*/
		ng_typgenAgExt=0,
		/**předpis je vytvořen na základě platebního kalendáře*/
		ng_typgenRozpis=1,
		/**předpis je vytvořen na základě pravidel na typu pohledávky*/
		ng_typgenPrepocet=2,
	}
	/**Kategorie faktur doslych*/
	const enum KategorieFakturDoslych {
		/**KDF_FA*/
		KDF_FA=1300,
		/**KDF_ZAL_DPH*/
		KDF_ZAL_DPH=1305,
		/**KDF_OPR_DPH*/
		KDF_OPR_DPH=1306,
		/**DF_EU_DPH*/
		DF_EU_DPH=1307,
		/**KDF_DO*/
		KDF_DO=1310,
		/**KDF_IN*/
		KDF_IN=1320,
		/**KDF_PRO*/
		KDF_PRO=1330,
		/**KDF_PROK*/
		KDF_PROK=1340,
		/**KDF_PROK_D*/
		KDF_PROK_D=1341,
		/**KDF_PROK_P*/
		KDF_PROK_P=1342,
		/**KDF_ZAL*/
		KDF_ZAL=1350,
		/**KDF_ZALK*/
		KDF_ZALK=1360,
		/**KDF_ZALK_D*/
		KDF_ZALK_D=1361,
		/**KDF_ZALK_P*/
		KDF_ZALK_P=1362,
		/**KDF_LIK*/
		KDF_LIK=1370,
		/**KDF_PEN*/
		KDF_PEN=1371,
		/**KDF_FA_HR*/
		KDF_FA_HR=1374,
	}
	/**Kategorie faktur odeslanych*/
	const enum KategorieFakturOdeslanych {
		/**KOF_FA*/
		KOF_FA=1400,
		/**KOF_ZAL_DPH*/
		KOF_ZAL_DPH=1405,
		/**KOF_OPR_DPH*/
		KOF_OPR_DPH=1406,
		/**KOF_DO*/
		KOF_DO=1410,
		/**KOF_IN*/
		KOF_IN=1420,
		/**KOF_PRO*/
		KOF_PRO=1430,
		/**KOF_PROK*/
		KOF_PROK=1490,
		/**KOF_PROK_D*/
		KOF_PROK_D=1491,
		/**KOF_PROK_P*/
		KOF_PROK_P=1492,
		/**KOF_ZAL*/
		KOF_ZAL=1440,
		/**KOF_ZALK*/
		KOF_ZALK=1480,
		/**KOF_ZALK_D*/
		KOF_ZALK_D=1481,
		/**KOF_ZALK_P*/
		KOF_ZALK_P=1482,
		/**KOF_FA_HR*/
		KOF_FA_HR=1484,
		/**KOF_LIK*/
		KOF_LIK=1450,
		/**KOF_UPO*/
		KOF_UPO=1460,
		/**KOF_PEN*/
		KOF_PEN=1470,
		/**KOF_SPO*/
		KOF_SPO=1471,
	}
	/**Kategorie poukazu*/
	const enum KategoriePouzkazu {
		/**POU_DEB*/
		POU_DEB=1380,
		/**POU_KRE*/
		POU_KRE=1381,
		/**POU_PDEB*/
		POU_PDEB=1382,
		/**POU_PKRE*/
		POU_PKRE=1383,
		/**POU_DEB_HR*/
		POU_DEB_HR=1384,
		/**POU_LIM*/
		POU_LIM=1390,
	}
	/**konstanty pro aktivitu*/
	const enum Aktivita_ {
		/**Aktivní*/
		ng_aktAktivni=100,
		/**Připraven*/
		ng_aktPripraven=300,
		/**Neaktivní*/
		ng_aktNeaktivni=500,
		/**Návrh*/
		ng_aktNavrh=600,
		/**Zrušen*/
		ng_aktZrusen=900,
	}
	/**úrovně sloupců rozpočtové skladby*/
	const enum UrovenSloupcuRozpoctoveSkladby {
		/**ng_colUea*/
		ng_colUea=0,
		/**ng_colUeb*/
		ng_colUeb=1,
		/**ng_colUec*/
		ng_colUec=2,
		/**ng_colUed*/
		ng_colUed=3,
		/**ng_colUee*/
		ng_colUee=4,
		/**ng_colUef*/
		ng_colUef=5,
		/**ng_colUeg*/
		ng_colUeg=6,
		/**ng_colUeh*/
		ng_colUeh=7,
		/**ng_colUei*/
		ng_colUei=8,
		/**ng_colUej*/
		ng_colUej=9,
		/**ng_colTe0*/
		ng_colTe0=10,
		/**ng_colTe1*/
		ng_colTe1=11,
		/**ng_colTe2*/
		ng_colTe2=12,
		/**ng_colTe3*/
		ng_colTe3=13,
		/**ng_colTe4*/
		ng_colTe4=14,
		/**ng_colUek*/
		ng_colUek=15,
		/**ng_colUel*/
		ng_colUel=16,
		/**ng_colUem*/
		ng_colUem=17,
		/**ng_colUen*/
		ng_colUen=18,
		/**ng_colTe5*/
		ng_colTe5=19,
		/**ng_colTe6*/
		ng_colTe6=20,
		/**ng_colTe7*/
		ng_colTe7=21,
		/**ng_colTe8*/
		ng_colTe8=22,
		/**ng_colTe9*/
		ng_colTe9=23,
	}
	/**flag řádku ve vztahu k DB*/
	const enum FlagRadek {
		/**řádek není v DB*/
		ng_fgNoDB=0,
		/**řádek je v DB*/
		ng_fgDB=10,
	}
	/**Příznak kompetenta*/
	const enum PriznakKompetent {
		/**ng_prizkomNo*/
		ng_prizkomNo=0,
		/**ng_prizkomKomp*/
		ng_prizkomKomp=10,
	}
	/**Typ instalace*/
	const enum TypInstalace {
		/**Acr*/
		ng_tyiAcr=10,
		/**MHMP*/
		ng_tyiMhmp=20,
		/**BIS*/
		ng_tyiBis=30,
		/**ÚP*/
		ng_tyiUp=40,
		/**OkÚ*/
		ng_tyiOku=50,
	}
	/**Stav vyřízení (asi schvalovací proces)*/
	const enum StavVyrizeni {
		/**!finanční kontrola - návrh*/
		ng_stavvyrizNavrh=0,
		/**!schvalovací proces probíhá*/
		ng_stavvyrizProbiha=5,
		/**vyřízen schvalovací proces*/
		ng_stavvyrizVyrizeno=10,
		/**schvalovací proces zamítnut*/
		ng_stavvyrizZamitnuto=20,
	}
	/**Příznak aktivity subřady deníku*/
	const enum AktivitaSubradyDeniku {
		/**subřada deníku je otevřena*/
		ng_aktsubOpen=100,
		/**subřada deníku je připravena k uzavření*/
		ng_aktsubPrepClose=300,
		/**subřada deníku je uzavřena a neodlita - znemožnit pořizování nových dokladů do tohoto deníku*/
		ng_aktsubCloseNoCast=400,
		/**subřada deníku je uzavřena a odlita - znemožnit pořizování nových dokladů do tohoto deníku*/
		ng_aktsubClose=500,
	}
	/**režimy práce s položkama smlouvy*/
	const enum RezimPracePolozky {
		/**!návrh položek smlouvy*/
		ng_modeNavrh=0,
		/**!položky k existující smlouvě*/
		ng_modeSml=10,
	}
	/**Příznak vazby rozvrhu*/
	const enum VazaniRozvrhu {
		/**rozvrh vázán na UCS*/
		ng_prizrozUcs=0,
		/**rozvrh vázán na NKS*/
		ng_prizrozNks=10,
	}
	/**druhy zápisů*/
	const enum DruhyZapisu {
		/**!smlouva vázaná přímo na rozpočet*/
		ng_drdSmlRoz=10,
		/**smlouva vázaná na blokační agendu*/
		ng_drdSmlBlk=11,
		/**objednávka vázaná přímo na rozpočet*/
		ng_drdObjRoz=15,
		/**objednávka vázaná na smlouvu*/
		ng_drdObjSml=16,
		/**objednávka vázaná na blokační agendu*/
		ng_drdObjBlk=17,
	}
	/**stav podepsání(formalizace )*/
	const enum StavPodepsani {
		/**neurčeno*/
		ng_sgnstavNone=-1,
		/**Ne*/
		ng_sgnstavNo=0,
		/**Podepsáno*/
		ng_sgnstavYes=10,
	}
	/**345.3 24.09.02 stav elektronické podoby*/
	const enum StavElePod {
		/**písemnost nemá elektronickou podobu - -default*/
		ng_seleNo=0,
		/**písemnost má elektronickou podobu*/
		ng_seleYes=1,
	}
	/**Typy smluv*/
	const enum KategorieTypuSmluv {
		/**dodavatelské smlouvy*/
		ng_ktgtypKDS=1600,
		/**dodavatelské smlouvy splátkové*/
		ng_ktgtypKDSSpl=1605,
		/**dodavatelské smlouvy jednorázové*/
		ng_ktgtypKDSJedn=1610,
		/**rámcová dodavatelská smlouva*/
		ng_ktgtypKDSRS=1615,
		/**dodavatelské smlouvy bez fin. profilu*/
		ng_ktgtypKDSNoEko=1620,
		/**dodavatelské objednávky*/
		ng_ktgtypKDSObj=1622,
		/**dodavatelské objednávky bez FP*/
		ng_ktgtypKDSObjNoEko=1624,
		/**odběratelské smlouvy*/
		ng_ktgtypKOS=1630,
		/**odběratelské smlouvy splátkové*/
		ng_ktgtypKOSSpl=1635,
		/**odběratelské smlouvy jednorázové*/
		ng_ktgtypKOSJedn=1640,
		/**rámcová odběratelská smlouva*/
		ng_ktgtypKOSRS=1645,
		/**odběratelské smlouvy bez fin. profilu*/
		ng_ktgtypKOSNoEko=1650,
		/**odběratelské objednávky*/
		ng_ktgtypKOSObj=1652,
		/**odběratelské objednávky bez FP*/
		ng_ktgtypKOSObjNoEko=1654,
		/**jiný (očekávaný) příjem*/
		ng_ktgtypJinyPrijemLim=1684,
		/**Individuální jiný příjem*/
		ng_ktgtypJinyPrijemInd=1685,
		/**limitovaný příslib*/
		ng_ktgtypLimPrislib=1690,
		/**individuální příslib*/
		ng_ktgtypIndPrislib=1691,
		/**dodatek smlouvy*/
		ng_ktgtypSmlAcc=1692,
	}
	/**výběr dokladů dle kategorií*/
	const enum DokladDleKategorie {
		/**dodavatelské sml*/
		ng_ktgtypfindKDSSml=10,
		/**odběratelské SML*/
		ng_ktgtypfindKOSSml=20,
		/**dodavatelské obj*/
		ng_ktgtypfindKDSObj=30,
		/**odběratelské obj*/
		ng_ktgtypfindKOSObj=40,
		/**dodavatelské RS sml*/
		ng_ktgtypfindKDSSmlRS=12,
		/**odběratelské RS sml*/
		ng_ktgtypfindKOSSmlRS=22,
	}
	/**kategorie způsobu ukončení*/
	const enum KategorieZpusobuUkonceni {
		/**!neurčeno*/
		ng_ktgzukNone=0,
		/**!splněním*/
		ng_ktgzukSplneni=10,
		/**!dohodou*/
		ng_ktgzukDohoda=20,
		/**!odstoupenim*/
		ng_ktgzukOdstoupeni=30,
		/**Výpověď*/
		ng_ktgzukVypoved=40,
	}
	/**typ ceny dokladu*/
	const enum TypCeny {
		/**Neučeno*/
		ng_typcenyNone=0,
		/**pevná cena*/
		ng_typcenyPevna=10,
		/**volná cena*/
		ng_typcenyVolna=20,
	}
	/**Režim obsluhy detailu dokladu*/
	const enum RezimObsluhyDetailDoklad {
		/**zobrazení detailu dokladu na základě žádosti*/
		ng_modeporShowRequest=3,
		/**převzetí dokladu z WFL*/
		ng_modeporInsertWflDoc=4,
	}
	/**distribuční stavy*/
	const enum DistribucniStavy {
		/**!Má vlastníka - není v redistribuci*/
		ng_stavdistNo=0,
		/**!Je přidělena*/
		ng_stavdistPrideleno=10,
		/**!Je v redistribuci*/
		ng_stavdistRedist=20,
		/**!Konec redistribuce - čeká na osobní převzetí*/
		ng_stavdistWait=30,
	}
	/**STAVY PÍSEMNOSTI*/
	const enum StavyPisemnosti {
		/**!podána, nevlastněna*/
		ng_stavpisPodatelna=0,
		/**podána, je znám vlastník*/
		ng_stavpisPodano=10,
		/**Vyrizeni*/
		ng_stavpisVyrizeno=20,
		/**Uzavřeno*/
		ng_stavpisUzavreno=30,
		/**Ulozeno*/
		ng_stavpisUlozeno=40,
		/**Vypraveno*/
		ng_stavpisVypraveno=50,
		/**Storno*/
		ng_stavpisStorno=60,
	}
	/**Stav fyzické podoby*/
	const enum StavFyzPodoby {
		/**písemnost nemá fyzickou podobu*/
		ng_sfyzNo=0,
		/**!písemnost má fyzickou podobu - -default*/
		ng_sfyzYes=1,
		/**!písemnost má fyzickou podobu a je originálem*/
		ng_sfyzYesOrig=2,
	}
	/**stav elektronické podoby*/
	const enum StavElPodoby {
		/**!písemnost nemá elektronickou podobu - -default*/
		ng_seleNo=0,
		/**písemnost má elektronickou podobu*/
		ng_seleYes=1,
		/**písemnost má elektronickou podobu a je originálem*/
		ng_seleYesOrig=2,
	}
	/**stav podpisu el.souboru*/
	const enum StavPodpisuElSouboru {
		/**písemnost má elektronickou podobu nepodepsanou -- default*/
		ng_ssgnNo=0,
		/**písemnost má elektronickou podobu podepsanou*/
		ng_ssgnYes=1,
		/**písemnost má elektronickou podobu podepsanou a opatřenou časovým razítkem*/
		ng_ssgnYesTimeS=2,
		/**písemnost má elektronickou podobu opatřenou pouze časovým razítkem*/
		ng_ssgnNoTimeS=3,
	}
	/**úrovně závislosti DB paramerů*/
	const enum UrovenZavislostiDBParam {
		/**!realizátor*/
		ng_urovencfgAcReal=3100,
		/**!org.jednotka*/
		ng_urovencfgAcOrj=3101,
	}
	/**příznak vlastního a přijatého dokumentu*/
	const enum Priznak_Vlast_Prij_Dokumentu {
		/**Vlastní dokument*/
		ng_sprijNo=0,
		/**Externá dookument*/
		ng_sprijYes=1,
	}
	/**Stupeň utajeni*/
	const enum StupenUtajeni {
		/**!dokument není publikovatelný - inicializační hodnota*/
		ng_stutajidNone=-1,
		/**!dokument je publikovatelný*/
		ng_stutajidPublic=0,
		/**!dokument je běžný*/
		ng_stutajidNormal=10,
		/**!dokument je neveřejný*/
		ng_stutajidNonPublic=20,
		/**!k dokumentu jsou řízená přístupová práva*/
		ng_stutajidRizeny=40,
	}
	/**původ dokumentu*/
	const enum PuvodDokumentu {
		/**!ruční podání*/
		ng_puvodManPodani=0,
		/**!elektronické podání*/
		ng_puvodElePodani=10,
		/**!datová schránka*/
		ng_puvodDatSch=20,
		/**!interface*/
		ng_puvodInterface=30,
	}
	/**Uzamření elektrického obrazu (asi)*/
	const enum EleUzamceni {
		/**!soubor je RW*/
		ng_prizroNo=0,
		/**soubor je RO*/
		ng_prizroYes=1,
	}
	/**Stav zpracování v agendě*/
	const enum StavZpracovani {
		/**!zpracováváno*/
		ng_stavsdaZpracov=0,
		/**ukončeno*/
		ng_stavsdaUkonceno=10,
		/**odlito*/
		ng_stavsdaOdlito=20,
	}
	/**konstanty na uzamnutí dokumentu*/
	const enum KonstantyNaUzamceniDokumentu {
		/**uzamknuto*/
		ng_checkOut=1,
		/**odemknuto*/
		ng_checkIn=0,
		/**uzamknuto vlastní fcí*/
		ng_checkOutMyFunc=10,
		/**uzamknuto cizí fcí*/
		ng_checkOutOtherFunc=11,
	}
	/**příznak příslušnosti dokumentu ke spisu*/
	const enum PriznakPrislusnostiDokumentuKeSpisu {
		/**!dokument není zařazen ve spisu*/
		ng_sspisNo=0,
		/**!dokument je vložen do spisu*/
		ng_sspisYes=1,
		/**!dokument je vložen do spisu*/
		ng_sspisIn=2,
	}
	/**Typ pohledu na knihu dokladů*/
	const enum RezimPohledKniha {
		/**ng_viewBook*/
		ng_viewBook=0,
		/**ng_viewWork*/
		ng_viewWork=10,
	}
	/**Příznak pro hledání*/
	const enum searchFT {
		/**Ne*/
		ng_searchFTNo=0,
		/**Ano*/
		ng_searchFTYes=1,
	}
	/**Aktivita*/
	const enum Aktivita {
		/**Aktivní*/
		ng_aktAkt=100,
		/**Aktivní bez storna*/
		ng_aktAktNoSt=120,
		/**Neaktivní*/
		ng_aktNoAkt=500,
		/**The ng akt storno*/
		ng_aktStorno=800,
		/**Všechna vyjma stavu návrh*/
		ng_aktNoNavrh=810,
		/**Zrušeno*/
		ng_aktDestroy=900,
	}
	/**stavy evidence v knize*/
	const enum StavEvidKniha {
		/**Evidované*/
		ng_staveviEvidovane=10,
		/**Neevidované*/
		ng_staveviNeevidovane=20,
		/**aktuálně evidované*/
		ng_staveviAktualEvidovane=30,
		/**přeevidované z*/
		ng_staveviPreevidovaneZ=40,
		/**přeevidované do*/
		ng_staveviPreevidovaneDo=50,
		/**The ng stavevi puvodni*/
		ng_staveviPuvodni=60,
	}
	/**Nulové indentifikátory k různým účelům*/
	interface NuloveIdentifikatory {
		/**Hodnota nuláku*/
		Value?: string|null;
		/**Nulák IXP*/
		readonly sg_NullIxp?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**- typ požadavku - nulák*/
		readonly sg_nullIxsDup?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Inicializace Su*/
		readonly sg_ueaNull?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák spisového uzlu*/
		readonly sg_NullSu?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák uložného místa*/
		readonly sg_NullUlm?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák funkčního místa*/
		readonly sg_NullFun?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák referenta*/
		readonly sg_NullRef?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák organizační jednotky*/
		readonly sg_NullOrj?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Neidentifikovaný nulák*/
		readonly sg_NullSpz?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák typu písemnosti*/
		readonly sg_NullTyp?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Neidentifikovaný nulák*/
		readonly sg_NullJec?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák externího subjektu*/
		readonly sg_NullEsu?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
		/**Nulák způsobu ukončení*/
		readonly sg_nullIxsZuk?: Gordic.Sml.Interface.NuloveIdentifikatory|null;
	}
	const enum NuloveIdentifikatoryNames { Value = "Value", sg_NullIxp = "sg_NullIxp", sg_nullIxsDup = "sg_nullIxsDup", sg_ueaNull = "sg_ueaNull", sg_NullSu = "sg_NullSu", sg_NullUlm = "sg_NullUlm", sg_NullFun = "sg_NullFun", sg_NullRef = "sg_NullRef", sg_NullOrj = "sg_NullOrj", sg_NullSpz = "sg_NullSpz", sg_NullTyp = "sg_NullTyp", sg_NullJec = "sg_NullJec", sg_NullEsu = "sg_NullEsu", sg_nullIxsZuk = "sg_nullIxsZuk",}
	const enum NuloveIdentifikatoryFragments { Value = "*", sg_NullIxp = "*", sg_nullIxsDup = "*", sg_ueaNull = "*", sg_NullSu = "*", sg_NullUlm = "*", sg_NullFun = "*", sg_NullRef = "*", sg_NullOrj = "*", sg_NullSpz = "*", sg_NullTyp = "*", sg_NullJec = "*", sg_NullEsu = "*", sg_nullIxsZuk = "*",}
	const enum NuloveIdentifikatoryTypes { Value = "string", sg_NullIxp = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_nullIxsDup = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_ueaNull = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullSu = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullUlm = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullFun = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullRef = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullOrj = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullSpz = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullTyp = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullJec = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_NullEsu = "Gordic.Sml.Interface.NuloveIdentifikatory", sg_nullIxsZuk = "Gordic.Sml.Interface.NuloveIdentifikatory",}
	const enum NuloveIdentifikatoryTypeLengths {}
	/**Nulové indentifikátory k různým účelům*/
	interface TypKurzListek {
		/**Hodnota nuláku*/
		Value?: string|null;
		/**Nulák IXP*/
		readonly sg_kurLstConst?: Gordic.Sml.Interface.TypKurzListek|null;
		/**Inicializace Su*/
		readonly sg_kurLstFlow?: Gordic.Sml.Interface.TypKurzListek|null;
	}
	const enum TypKurzListekNames { Value = "Value", sg_kurLstConst = "sg_kurLstConst", sg_kurLstFlow = "sg_kurLstFlow",}
	const enum TypKurzListekFragments { Value = "*", sg_kurLstConst = "*", sg_kurLstFlow = "*",}
	const enum TypKurzListekTypes { Value = "string", sg_kurLstConst = "Gordic.Sml.Interface.TypKurzListek", sg_kurLstFlow = "Gordic.Sml.Interface.TypKurzListek",}
	const enum TypKurzListekTypeLengths {}
	/**Způsob definice ac_sml*/
	interface ZpusobDefiniceACSML {
		/**Hodnota nuláku*/
		Value?: string|null;
		/**Nulák IXP*/
		readonly sg_defacsmlMan?: Gordic.Sml.Interface.ZpusobDefiniceACSML|null;
		/**Gets the sg defacsml rada.*/
		readonly sg_defacsmlRada?: Gordic.Sml.Interface.ZpusobDefiniceACSML|null;
		/**Gets the sg defacsml ac.*/
		readonly sg_defacsmlAc?: Gordic.Sml.Interface.ZpusobDefiniceACSML|null;
	}
	const enum ZpusobDefiniceACSMLNames { Value = "Value", sg_defacsmlMan = "sg_defacsmlMan", sg_defacsmlRada = "sg_defacsmlRada", sg_defacsmlAc = "sg_defacsmlAc",}
	const enum ZpusobDefiniceACSMLFragments { Value = "*", sg_defacsmlMan = "*", sg_defacsmlRada = "*", sg_defacsmlAc = "*",}
	const enum ZpusobDefiniceACSMLTypes { Value = "string", sg_defacsmlMan = "Gordic.Sml.Interface.ZpusobDefiniceACSML", sg_defacsmlRada = "Gordic.Sml.Interface.ZpusobDefiniceACSML", sg_defacsmlAc = "Gordic.Sml.Interface.ZpusobDefiniceACSML",}
	const enum ZpusobDefiniceACSMLTypeLengths {}
	/**Typy knih*/
	const enum KategorieKnih {
		/**kniha dodavatelských smluv*/
		ng_ktgdenKDS=1600,
		/**kniha dodavatelských objednávek*/
		ng_ktgdenKDSObj=1625,
		/**kniha odběratelských smluv*/
		ng_ktgdenKOS=1630,
		/**kniha odběratelských objednávek*/
		ng_ktgdenKOSObj=1645,
		/**kniha smluv bez fin. profilu*/
		ng_ktgdenSMLNoEko=1650,
		/**kniha smluv bez rozlišení*/
		ng_ktgdenSML=1670,
		/**kniha objednávek bez rozlišení*/
		ng_ktgdenOBJ=1675,
		/**kniha objednávek bez fin. profilu*/
		ng_ktgdenOBJNoEko=1680,
		/**kniha jiných (očekávaných) příjmů*/
		ng_ktgdenJinyPrijemLim=1684,
		/**kniha individuálních jiných příjmů*/
		ng_ktgdenJinyPrijemInd=1685,
		/**kniha limitovaných příslibů*/
		ng_ktgdenLimPrislib=1690,
		/**kniha individuálních příslibů*/
		ng_ktgdenIndPrislib=1691,
		/**všechny knihy SML bez rozlišení*/
		ng_ktgdenAll=1699,
	}
	/**Typ měny*/
	const enum TypMeny {
		/**CZK*/
		ng_menaCZK=0,
	}
	/**Režim provozu*/
	const enum RezimProvozu {
		/**!režim provozu = Realizátor - možno volit z nabídky kompertentů bez ohledu na realizátora- default*/
		ng_smlrezprovozReal=0,
		/**!režim provozu = Kompetent - uživatel musí být kompetent*/
		ng_smlrezprovozKomp=1,
		/**!režim provozu = Hlavní kompetent - možno volit z nabídky kompertentů daného realizátora*/
		ng_smlrezprovozHKomp=2,
		/**!režim provozu = Kompetent daný příslušností aktuální fce k ORJ- k uživateli musí být dohledán kompetent*/
		ng_smlrezprovozKompOrj=3,
	}
	/**Řízení předpolnění rozpisu na roky*/
	const enum RizeniPredplneniRozpisuNaRoky {
		/**Ne*/
		ng_fillrcrNo=0,
		/**Ano*/
		ng_fillrcrYes=1,
	}
	/**Generování id dokladu*/
	const enum GenerovaniIdDokladu {
		/**Negeneruje*/
		ng_genPidNo=0,
		/**generuje*/
		ng_genPidYes=1,
	}
	/**Režim referent*/
	const enum RezimReferent {
		/**režim referenta - možno volit z nabídky - default*/
		ng_smlusrrefNo=0,
		/**režim referenta  - referent = kompetent*/
		ng_smlusrrefYes=1,
	}
	/**Vazba na vlastní BÚ*/
	const enum VazbaNaVlastniBU {
		/**vazba na UCS default*/
		ng_smlpbuvlUcs=0,
		/**Vazba na knihu*/
		ng_smlpbuvlBook=1,
	}
	/**Inicializační hodnoty pro číselníky*/
	const enum InicialCiselnik {
		/**Číselně neurčeno*/
		ng_CisNull=0,
	}
	/**Režim pohledu na knihy*/
	const enum RezimPohleduNaKnihy {
		/**Pohled na vybranou knihu*/
		ng_viewbookAktual=0,
		/**POhled na všechny knihy*/
		ng_viewbookAll=10,
		/**POhled na všechny knihy aktualního roku*/
		ng_viewbookAllActYear=12,
	}
	/**Druhy masky při práci s knihou*/
	const enum DruhyMasky {
		/**režim neurčeno - ignoruje režim knih*/
		ng_druhmaskyNone=-1,
		/**vybraná kniha*/
		ng_druhmaskyKniha=0,
		/**vlastní knihy*/
		ng_druhmaskyKnihy=10,
	}
	/**Rozhodnutí o účtování*/
	const enum AkceUctovani {
		/**nebude se účtovavat o PZ/P*/
		ng_prizpzpNo=0,
		/**bude se účtovavat o PZ/P*/
		ng_prizpzpYes=10,
	}
	/**Typy kategorií smluv*/
	const enum KategorieDokladu {
		/**dodavatelské smlouvy*/
		ng_ktgsmlDod=10,
		/**odběratelské smlouvy*/
		ng_ktgsmlOdb=20,
		/**smlouva bez eko profilu*/
		ng_ktgsmlNoEko=30,
		/**dodavatelské objednávky*/
		ng_ktgsmlDodObj=50,
		/**odběratelské objednávky*/
		ng_ktgsmlOdbObj=60,
		/**jiný (očekávaný) příjem*/
		ng_ktgsmlJinyPrijemLim=84,
		/**Individuální příjem*/
		ng_ktgsmlJinyPrijemInd=85,
		/**limitovaný příslib*/
		ng_ktgsmlLimPrislib=90,
		/**individuální příslib*/
		ng_ktgsmlIndPrislib=91,
		/**dodavatelské smlouvy + limitovaný příslib*/
		ng_ktgsmlDodLimPrislib=190,
		/**smlouvy bez dalšího rozlišení*/
		ng_ktgsmlSml=123,
	}
	/**stavy dokladu, položky, pohybu*/
	const enum Stavy {
		/**návrh dokladu*/
		ng_sdNavrh=10,
		/**evidence dokladu*/
		ng_sdEvidence=20,
		/**doklad připraven k proúčtování*/
		ng_sdBeforeUct=30,
		/**doklad proúčtování*/
		ng_sdAfterUct=40,
		/**doklad proúčtování*/
		ng_sdClose=50,
		/**doklad stornován*/
		ng_sdStorno=90,
	}
	/**Typy aktivit smluv*/
	const enum AktivitaSmluv {
		/**aktivní*/
		ng_aktAkt=100,
		/**aktivní bez storna*/
		ng_aktAktNoSt=120,
		/**neaktivní*/
		ng_aktNoAkt=500,
		/**storno*/
		ng_aktStorno=800,
		/**zrušeno*/
		ng_aktDestroy=900,
		/**všechno vyjma stavu návrh*/
		ng_aktNoNavrh=810,
	}
	/**348.20 18.03.04 - typ bokační agendy*/
	const enum TypBlokacniAgendy {
		/**nic*/
		ng_typagblokNone=0,
		/**EVZ*/
		ng_typagblokEVZ=510,
		/**RZA*/
		ng_typagblokRZA=520,
		/**VFP*/
		ng_typagblokVFP=580,
		/**EPO*/
		ng_typagblokEPO=620,
	}
	/**! typ platnosti smlouvy*/
	const enum TypPlatnostSmlouvy {
		/**neurčeno*/
		ng_typplatnostNone=0,
		/**doba určitá*/
		ng_typplatnostUrcita=10,
		/**doba neurčitá*/
		ng_typplatnostNeurcita=20,
		/**do vyčerpání částky*/
		ng_typplatnostDo0C=30,
	}
	/**příznak chyby pro logiku aplikace*/
	const enum ErrorDokladu {
		/**doklad byl modifikován jiným uživatelem*/
		ng_err_1=65525,
		/**modifikováno jiným uživatelem*/
		ng_errDokEdit=-39999,
		/**pokus přeevidovat doklad*/
		ng_errReEdit=40,
	}
	/**Typy stav smluv*/
	const enum StavDokladu {
		/**podáno*/
		ng_stavNavrh=10,
		/**evidováno*/
		ng_stavEvidence=20,
		/**schváleno*/
		ng_stavValidate=30,
		/**podepsáno*/
		ng_stavSign=40,
		/**uzavřeno*/
		ng_stavClose=50,
		/**storno*/
		ng_stavStorno=90,
	}
	/**Stav rezervace na IISSP*/
	const enum StavRezervaceIISSP {
		/**!neurčeno*/
		ng_stavreziisspNone=-1,
		/**!připraveno*/
		ng_stavreziisspPripraveno=0,
		/**..*/
		ng_stavreziisspOdeslano=10,
		/**..*/
		ng_stavreziisspSchvaleno=20,
		/**..*/
		ng_stavreziisspSchvalenoVyhrada=30,
		/**!schváleno + schváleno s výhradou*/
		ng_stavreziisspSchvalenoAll=23,
		/**zamitnuto*/
		ng_stavreziisspZamitnuto=40,
	}
	/**příznak komunikace s IISSP*/
	const enum KomunikaceIISSP {
		/**nekomunikujeme s IISSP*/
		ng_priziisspNo=0,
		/**komunikujeme s IISSP - pasivní varianta EDS/SMVS*/
		ng_priziisspYesPasivEDS=1,
		/**komunikujeme s IISSP - aktivní varianta EDS/SMVS*/
		ng_priziisspYesAktivEDS=2,
	}
	/**režim rezervací v IISSP*/
	const enum RezimRezervaceIISSP {
		/**jednoleté rezervace*/
		ng_prizrspvclOne=0,
		/**víceleté rezervace*/
		ng_prizrspvclMany=10,
	}
	/**typ výběru dle položek účetního profilu*/
	const enum TypVyberPolozekUcetProfil {
		/**neurčeno*/
		ng_uptypvybNone=0,
		/**neexistují*/
		ng_uptypvybNeni=10,
		/**neexistují, ale mají existovat*/
		ng_uptypvybMaNeni=20,
		/**existují*/
		ng_uptypvybJe=30,
		/**existují, všechny schválené*/
		ng_uptypvybSchal=40,
		/**neexistují v daném období*/
		ng_uptypvybNeniObd=50,
	}
	/**typ výběru dle polžek věcného profilu*/
	const enum VyberPolozekVecnyProfil {
		/**neurčeno*/
		ng_vptypvybNone=0,
		/**neexistuje*/
		ng_vptypvybNeni=10,
		/**existuje*/
		ng_vptypvybJe=12,
	}
	/**typ výběru vztahu platebního kalendáře a dokladu*/
	const enum TypVyberVztahPlatebniKalendarDoklad {
		/**neurčeno*/
		ng_plktypvybNone=0,
		/**neexistuje*/
		ng_plktypvybNeni=10,
		/**existuje*/
		ng_plktypvybJe=12,
		/**částečný rozpis celkové částky*/
		ng_plktypvybCastecny=20,
		/**není rozpis na roky v nějakém období financování*/
		ng_plktypvybNeniIntObd=30,
		/**není rozepsáno v daném období*/
		ng_plktypvybNeniObd=40,
	}
	/**typ výběru vztahu dodatku a dokladu*/
	const enum TypVyberVztahDodatekDoklad {
		/**neurčeno*/
		ng_dodtypvybNone=0,
		/**neexistuje*/
		ng_dodtypvybNeni=10,
		/**existuje*/
		ng_dodtypvybJe=20,
		/**mění cenu v nějakém období financování*/
		ng_dodtypvybZmenaCeny=30,
		/**změna ceny v daném období*/
		ng_dodtypvybZmenaCenyObd=40,
		/**datum uzavření dodatku*/
		ng_dodtypvybDatUza=50,
	}
	/**typ výběru vzthau položek FP a dokladu*/
	const enum TypVyberVztahuPolozekFPDoklad {
		/**neurčeno*/
		ng_fptypvybNone=0,
		/**neexistuje*/
		ng_fptypvybNeni=10,
		/**neúplný fp oproti rozpisu částek na roky*/
		ng_fptypvybCastecny=20,
		/**není fp v období financování*/
		ng_fptypvybNeniObd=40,
		/**všechny pol fp jsou schválené*/
		ng_fptypvybSchval=50,
		/**existují  neschválené pol fp*/
		ng_fptypvybNoSchval=55,
	}
	/**typ výběru vzthau rozpisu částky na roky a dokladu*/
	const enum TypVyberuVztahuRozpisCastkyNaRokyDoklad {
		/**neurčeno*/
		ng_rozpistypvybNone=0,
		/**neexistuje*/
		ng_rozpistypvybNeni=10,
		/**částečný rozpis celkové částky*/
		ng_rozpistypvybCastecny=20,
		/**není rozpis na roky v nějakém období financování*/
		ng_rozpistypvybNeniIntObd=30,
		/**není rozepsáno v daném období*/
		ng_rozpistypvybNeniObd=40,
	}
	/**345.1 14.08.02 kategorie dodatku*/
	const enum KategorieDodatku {
		/**neurčeno*/
		ng_ktgdodNone=0,
		/**dodatek*/
		ng_ktgdodDod=10,
		/**modifikace*/
		ng_ktgdodModif=20,
		/**!sledovaná změna profilu dokladu*/
		ng_ktgdodModifSl=22,
	}
	/**Stav doladu*/
	const enum StavPolozky {
		/**!návrh*/
		ng_upsNavrh=10,
		/**!evidence položky*/
		ng_upsEvidence=20,
		/**!evidence dokladu, schválené položky*/
		ng_upsEvidenceValidate=23,
		/**!schváleno*/
		ng_upsValidate=30,
		/**!uzavřeno*/
		ng_upsClose=50,
		/**!storno*/
		ng_upsStorno=90,
	}
	/**Enum pro typ objednávek*/
	const enum TypObjednavek {
		/**dodavatelské smlouvy*/
		ng_ktgsmlDod=10,
		/**odběratelské smlouvy*/
		ng_ktgsmlOdb=20,
		/**smlouva bez eko profilu*/
		ng_ktgsmlNoEko=30,
		/**dodavatelské objednávky*/
		ng_ktgsmlDodObj=50,
		/**odběratelské objednávky*/
		ng_ktgsmlOdbObj=60,
		/**jiný (očekávaný) příjem*/
		ng_ktgsmlJinyPrijemLim=84,
		/**Individuální příjem*/
		ng_ktgsmlJinyPrijemInd=85,
		/**limitovaný příslib*/
		ng_ktgsmlLimPrislib=90,
		/**individuální příslib*/
		ng_ktgsmlIndPrislib=91,
		/**dodavatelské smlouvy + limitovaný příslib*/
		ng_ktgsmlDodLimPrislib=190,
		/**smlouvy bez dalšího rozlišení*/
		ng_ktgsmlSml=123,
	}
	/**typy el. dokumentů*/
	const enum TypElDokumentu {
		/**originál*/
		ng_typelpOrig=0,
		/**příloha*/
		ng_typelpAttach=20,
		/**podpis*/
		ng_typelpSign=30,
		/**tisk*/
		ng_typelpPrint=40,
		/**časové razítko*/
		ng_typelpTimeStamp=50,
	}
	/**hodnoty konfigurace fulltextového vyhledávání*/
	const enum HodnotyKonfiguraceFulltextVyhl {
		/**None*/
		ng_prizftxNone=0,
		/**DMS*/
		ng_prizftxDMS=1,
		/**MSSQL*/
		ng_prizftxMSSQL=2,
	}
	/**režim požadovaného tvaru hodnoty DATETIME*/
	const enum RezimHodnotyDateTime {
		/**datetime + fraction pro Informix, datetime pro Oracle*/
		ng_fmtdateDTF=3,
		/**date pro Informix, datetime pro Oracle*/
		ng_fmtdateDT=0,
		/**date pro Informix, date pro Oracle*/
		ng_fmtdateD=-1,
	}
	/**stav rezervace dokladů*/
	const enum StavRezervace {
		/**neurčeno*/
		ng_stavrezNone=-1,
		/**nerezervováno*/
		ng_stavrezNull=0,
		/**částečně*/
		ng_stavrezPart=1,
		/**úplně*/
		ng_stavrezFull=2,
	}
	/**Příznaky přečtení dokladu*/
	const enum PriznakPrecteniDokladu {
		/**!neurčeno*/
		ng_prizviewNone=-1,
		/**!default*/
		ng_prizviewYes=0,
		/**!nepřečteno aktuálním vlastníkem*/
		ng_prizviewNo=10,
	}
	/**Typy kurzu*/
	const enum TypKurzu {
		/**!neurčeno*/
		ng_typkurzNone=0,
		/**!pevný smluvní*/
		ng_typkurzPevnySml=10,
		/**!pevný systémový*/
		ng_typkurzPevnySyst=20,
		/**roční smluvní*/
		ng_typkurzRokSml=30,
		/**!roční systémový*/
		ng_typkurzRokSyst=40,
	}
	/**Způsob definice ceny*/
	const enum ZpusobDefiniceCeny {
		/**!absolutní*/
		ng_zpdefcenyAbs=0,
		/**!přírůstkový*/
		ng_zpdefcenyInc=10,
	}
	/**Příznak archivní db*/
	const enum PriznakArchivniDB {
		/**živá DB*/
		ng_praLife=10,
		/**Archivní DB - zákaz modifikace*/
		ng_praArc=20,
	}
	/**v jakém režimu je doklad*/
	const enum RezimDokladu {
		/**!normální režim*/
		ng_modedokNormal=0,
		/**!režim vazby smlouvy na blokační agendu*/
		ng_modedokSmlBlk=10,
		/**!režim vazby smlouvy na rámcovou smlouvu*/
		ng_modedokSmlSmlRS=14,
		/**!režim vazby smlouvy na rámcovou smlouvu vázanou na BLK*/
		ng_modedokSmlSmlRSBlk=16,
		/**!režim vazby obj. na sml*/
		ng_modedokObjSml=20,
		/**!režim vazby obj. na blokační agendu*/
		ng_modedokObjBlk=22,
		/**!režim vazby objednávky na rámcovou smlouvu*/
		ng_modedokObjSmlRS=24,
		/**!režim vazby objednávky na rámcovou smlouvu vázanou na BLK*/
		ng_modedokObjSmlRSBlk=26,
		/**režim vazby dodatku na sml*/
		ng_modedokSmlAcc=30,
		/**režim vazby dodatku na sml a blk*/
		ng_modedokSmlAccBlk=32,
		/**režim vazby dodatku na rámcovou smlouvu*/
		ng_modedokSmlRSAcc=34,
		/**režim vazby dodatku na rámcovou smlouvu vázanou na BLK*/
		ng_modedokSmlRSAccBlk=36,
	}
	/**Zjištění zda se jedná o smlouvu, obj, příslip, dodatek*/
	const enum TypDokladu {
		/**smlouvy*/
		ng_typdokSml=0,
		/**objednávka*/
		ng_typdokObj=10,
		/**limitovaný příslib*/
		ng_typdokLim=20,
		/**individuální příslib*/
		ng_typdokInd=22,
		/**dodatek smlouvy*/
		ng_typdokSmlAcc=30,
		/**jiný příjem*/
		ng_typdokJinyPrijemLim=40,
		/**Individuální příjem*/
		ng_typdokJinyPrijemInd=42,
		/**smlouvy + objednávky*/
		ng_typdokSml_Obj=110,
	}
	/**řízení předplnění rozpisu částky na roky*/
	const enum RozeniPredplRozpis {
		/**Ne*/
		ng_fillrcrNo=0,
		/**Ano*/
		ng_fillrcrYes=1,
	}
	/**Typ financování blokační agendy*/
	const enum TypFinancovaniBlk {
		/**Volné financování*/
		ng_typfinblkFree=10,
	}
	/**definice vazby na evz*/
	const enum VazbaNaEvz {
		/**!bez vazby*/
		ng_bndsmlblokNo=0,
		/**!volná vazba*/
		ng_bndsmlblokFree=10,
		/**!volná vazba bez možnosti editace*/
		ng_bndsmlblokFreeNoEdit=12,
		/**!povinná vazba*/
		ng_bndsmlblokMust=20,
	}
	/**364.1 06.11.09 kategorie účetního případu - nutno občerstvit dle doplnění číselníku FUCCUPR*/
	const enum KategorieUcetnihoPripadu {
		/**podmíněný závazek*/
		ng_ktguprPZ=70,
		/**podmíněná pohledávka*/
		ng_ktguprPP=60,
		/**366.1 06.10.10 obojí - PZ i PP*/
		ng_ktguprPZPP=76,
	}
	/**364.1 09.11.09 
	*     Kategorie Účetního pohybu
	*/
	const enum KategorieUcetnihoPohybu {
		/**Předpis podmíněné pohledávky*/
		ng_ktgupoPPP=103,
		/**Odpis podmíněné pohledávky*/
		ng_ktgupoOPP=153,
		/**Předpis podmíněného závazku*/
		ng_ktgupoPPZ=203,
		/**Odpis podmíněného závazku*/
		ng_ktgupoOPZ=253,
	}
	/**345.1 05.09.02 důvody akvizice
	*     356.2 13.02.07 - důvody zrušeny - nahrazeny kategorií
	*/
	const enum KategorieAkvizice {
		/**Neurčeno*/
		ng_ktgpozNone=0,
		/**Nákup*/
		ng_ktgpozNakup=10,
		/**Nákup majetku, služeb pro stávající majetku*/
		ng_ktgpozNakupExistMaj=15,
		/**Pronájem cizího majetku*/
		ng_ktgpozNajemCizi=20,
		/**Prodej*/
		ng_ktgpozProdej=50,
		/**Pronájem vlastního majetku*/
		ng_ktgpozNajemVlastni=60,
	}
	/**347.1 01.04.03 druh požadavku - technologická identifikace vp*/
	const enum DruhPozadavku {
		/**neurčeno*/
		ng_drhpozNone=0,
		/**smlouva*/
		ng_drhpozSml=10,
		/**smlouva vázaná na VZ*/
		ng_drhpozVzSml=11,
		/**VZ*/
		ng_drhpozVz=12,
		/**objednávka*/
		ng_drhpozObj=15,
		/**objednávka vázaná na smlouvu*/
		ng_drhpozObjSml=16,
		/**faktura*/
		ng_drhpozKdf=60,
		/**poukaz*/
		ng_drhpozPou=61,
		/**pokladní doklad*/
		ng_drhpozPok=65,
		/**požadavek*/
		ng_drhpozPoz=70,
		/**plán*/
		ng_drhpozPla=80,
		/**dodací list*/
		ng_drhpozDod=90,
		/**dodací list*/
		ng_drhpozMaj=100,
	}
	/**Stav položky VP*/
	const enum StavPolozkyVP {
		/**Návrh*/
		ng_vpstavNavrh=10,
		/**Evidence*/
		ng_vpstavEvidence=20,
		/**Schválení*/
		ng_vpstavValidate=30,
		/**Storno*/
		ng_vpstavStorno=90,
	}
	/**366.19 19.12.11 vlastnosti položek dokladu*/
	const enum VlastnostiPolozekDokladu {
		/**položky odkazující na atributy dokladu*/
		ng_polidPopis=1,
		/**ng_polidNazev*/
		ng_polidNazev=2,
		/**ng_polidIxsZuk*/
		ng_polidIxsZuk=3,
		/**dodavatelský doklad - naše strana*/
		ng_polidDodMy=4,
		/**dodavatelský doklad - cizí strana*/
		ng_polidDodOni=5,
		/**ng_polidDodCis*/
		ng_polidDodCis=6,
		/**odběratelský doklad - naše strana*/
		ng_polidOdbMy=7,
		/**odběratelský doklad - cizí strana*/
		ng_polidOdbOni=8,
		ng_polidOdbCis=9,
		/**celková částka*/
		ng_polidCCelk=10,
		/**ng_polidDatUzavreni*/
		ng_polidDatUzavreni=12,
		/**ng_polidDatPlatnost*/
		ng_polidDatPlatnost=13,
		/**ng_polidIxsRefZast*/
		ng_polidIxsRefZast=14,
	}
	/**348.21 01.04.04 stavy vyřízení žádosti*/
	const enum StavVyrizZadosti {
		/**Žádost*/
		ng_stavreqReq=0,
		/**Vyřízeno*/
		ng_stavreqOk=10,
		/**Odmítnuto*/
		ng_stavreqNoOk=20,
	}
	/**347.1 12.08.03 - režim definice funkce vyhledávání přes vlastníka - vztah ke knize*/
	const enum RezimKnihy {
		/**konktrétní kniha*/
		ng_vdrezimknihaOne=0,
		/**všechny knihy*/
		ng_vdrezimknihaAll=1,
	}
	/**347.1 12.08.03 - režim definice funkce vyhledávání přes vlastníka - vztah k historii*/
	const enum RezimHist {
		/**aktuální stav*/
		ng_vdrezimhistYes=0,
		/**historický stav*/
		ng_vdrezimhistNo=1,
	}
	/**354.13 21.12.05 status platby*/
	const enum StatusPlatby {
		ng_statusplatbyNone=0,
		ng_statusplatbyReal=10,
	}
	/**354.12 14.12.05 kategorie platby*/
	const enum KategoriePlatby {
		ng_ktgplatbyNone=0,
		/**poukaz*/
		ng_ktgplatbyPou=10,
		/**pohledávka*/
		ng_ktgplatbyPoh=20,
	}
	/**Stavy rezervací IISSP*/
	const enum StavyRezervaceIISSP {
		/**Rezervace v IISSP je ve stavu připraveno k rezervaci*/
		ng_prizrezspRezervovat=10,
		/**Rezervace v IISSP je ve stavu možno odeslat*/
		ng_prizrezspOdeslat=20,
		/**Rezervace v IISSP je ve stavu odesláno - zmrazí se obsluha FP*/
		ng_prizrezspOdeslano=30,
		/**Rezervace v IISSP je ve stavu rezervovano*/
		ng_prizrezspRezervovano=40,
	}
	/**361.1 27.08.09 typ RR*/
	const enum TypSa {
		/**neurčeno*/
		ng_typsaNone=0,
		/**ng_typsaPrijmy*/
		ng_typsaPrijmy=10,
		/**ng_typsaVydaje*/
		ng_typsaVydaje=15,
		/**ng_typsaVynosy*/
		ng_typsaVynosy=20,
		/**ng_typsaNaklady*/
		ng_typsaNaklady=25,
		/**ng_typsaTvorbaFondu*/
		ng_typsaTvorbaFondu=30,
		/**ng_typsaVyuzitiFondu*/
		ng_typsaVyuzitiFondu=35,
	}
	/**Typ bankovního účtu*/
	const enum TypBankovnihoUctu {
		/**výdajový účet*/
		ng_typbuOut=10,
		/**příjmový účet*/
		ng_typbuIn=20,
		/**neurčeno*/
		ng_typbuAll=0,
		/**nedefinováno*/
		ng_typbuNone=-1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GDdpstppDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ddpstpp - Typ pohledávky*/
	interface GDdpstppDto {
		/**DBCOLUMN:ddpstpp.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:ddpstpp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ddpstpp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ddpstpp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ddpstpp.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ddpstpp.naz_text0*/
		naz_text0?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text1*/
		naz_text1?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text2*/
		naz_text2?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text3*/
		naz_text3?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text4*/
		naz_text4?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text5*/
		naz_text5?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text6*/
		naz_text6?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text7*/
		naz_text7?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text8*/
		naz_text8?: string|null;
		/**DBCOLUMN:ddpstpp.naz_text9*/
		naz_text9?: string|null;
		/**DBCOLUMN:ddpstpp.znam*/
		znam?: number|null;
		/**DBCOLUMN:ddpstpp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ddpstpp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ddpstpp.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov0*/
		text_pov0?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov1*/
		text_pov1?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov2*/
		text_pov2?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov3*/
		text_pov3?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov4*/
		text_pov4?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov5*/
		text_pov5?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov6*/
		text_pov6?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov7*/
		text_pov7?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov8*/
		text_pov8?: number|null;
		/**DBCOLUMN:ddpstpp.text_pov9*/
		text_pov9?: number|null;
		/**DBCOLUMN:ddpstpp.priz_nepar*/
		priz_nepar?: number|null;
		/**DBCOLUMN:ddpstpp.priz_dph2*/
		priz_dph2?: number|null;
		/**DBCOLUMN:ddpstpp.priz_osvob*/
		priz_osvob?: number|null;
		/**DBCOLUMN:ddpstpp.priz_dph_zakl*/
		priz_dph_zakl?: number|null;
		/**DBCOLUMN:ddpstpp.priz_dph_sniz*/
		priz_dph_sniz?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text0*/
		typ_text0?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text1*/
		typ_text1?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text2*/
		typ_text2?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text3*/
		typ_text3?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text4*/
		typ_text4?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text5*/
		typ_text5?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text6*/
		typ_text6?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text7*/
		typ_text7?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text8*/
		typ_text8?: number|null;
		/**DBCOLUMN:ddpstpp.typ_text9*/
		typ_text9?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text0*/
		priz_duv_text0?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text1*/
		priz_duv_text1?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text2*/
		priz_duv_text2?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text3*/
		priz_duv_text3?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text4*/
		priz_duv_text4?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text5*/
		priz_duv_text5?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text6*/
		priz_duv_text6?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text7*/
		priz_duv_text7?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text8*/
		priz_duv_text8?: number|null;
		/**DBCOLUMN:ddpstpp.priz_duv_text9*/
		priz_duv_text9?: number|null;
		/**DBCOLUMN:ddpstpp.vice_vs*/
		vice_vs?: number|null;
		/**DBCOLUMN:ddpstpp.dat_vyp_stav*/
		dat_vyp_stav?: JsonDate|null;
		/**DBCOLUMN:ddpstpp.typ_vyp_stav*/
		typ_vyp_stav?: number|null;
		/**DBCOLUMN:ddpstpp.rez_vyp*/
		rez_vyp?: number|null;
		/**DBCOLUMN:ddpstpp.priz_rzv*/
		priz_rzv?: number|null;
		/**DBCOLUMN:ddpstpp.gen_opr*/
		gen_opr?: number|null;
		/**DBCOLUMN:ddpstpp.zprac_poz*/
		zprac_poz?: number|null;
		/**DBCOLUMN:ddpstpp.priz_napvra*/
		priz_napvra?: number|null;
		/**DBCOLUMN:ddpstpp.typ_phl_exe*/
		typ_phl_exe?: string|null;
		/**DBCOLUMN:ddpstpp.priz_verejny*/
		priz_verejny?: number|null;
		/**DBCOLUMN:ddpstpp.priz_avizace*/
		priz_avizace?: number|null;
		/**DBCOLUMN:ddpstpp.priz_par*/
		priz_par?: number|null;
		/**DBCOLUMN:ddpstpp.priz_dph_sniz2*/
		priz_dph_sniz2?: number|null;
		/**DBCOLUMN:ddpstpp.priz_dph_sniz3*/
		priz_dph_sniz3?: number|null;
		/**DBCOLUMN:ddpstpp.typ_phl_ins*/
		typ_phl_ins?: string|null;
		/**DBCOLUMN:ddpstpp.dat_opr*/
		dat_opr?: JsonDate|null;
		/**DBCOLUMN:ddpstpp.typ_phl_php*/
		typ_phl_php?: string|null;
		/**DBCOLUMN:ddpstpp.zp_uhr*/
		zp_uhr?: number|null;
		/**DBCOLUMN:ddpstpp.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:ddpstpp.ixs_typ_vra*/
		ixs_typ_vra?: string|null;
		/**DBCOLUMN:ddpstpp.priz_kpsd*/
		priz_kpsd?: number|null;
	}
	const enum GDdpstppDtoNames { typ_phl = "typ_phl", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", typ_ag = "typ_ag", naz_text0 = "naz_text0", naz_text1 = "naz_text1", naz_text2 = "naz_text2", naz_text3 = "naz_text3", naz_text4 = "naz_text4", naz_text5 = "naz_text5", naz_text6 = "naz_text6", naz_text7 = "naz_text7", naz_text8 = "naz_text8", naz_text9 = "naz_text9", znam = "znam", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_dph = "priz_dph", text_pov0 = "text_pov0", text_pov1 = "text_pov1", text_pov2 = "text_pov2", text_pov3 = "text_pov3", text_pov4 = "text_pov4", text_pov5 = "text_pov5", text_pov6 = "text_pov6", text_pov7 = "text_pov7", text_pov8 = "text_pov8", text_pov9 = "text_pov9", priz_nepar = "priz_nepar", priz_dph2 = "priz_dph2", priz_osvob = "priz_osvob", priz_dph_zakl = "priz_dph_zakl", priz_dph_sniz = "priz_dph_sniz", typ_text0 = "typ_text0", typ_text1 = "typ_text1", typ_text2 = "typ_text2", typ_text3 = "typ_text3", typ_text4 = "typ_text4", typ_text5 = "typ_text5", typ_text6 = "typ_text6", typ_text7 = "typ_text7", typ_text8 = "typ_text8", typ_text9 = "typ_text9", priz_duv_text0 = "priz_duv_text0", priz_duv_text1 = "priz_duv_text1", priz_duv_text2 = "priz_duv_text2", priz_duv_text3 = "priz_duv_text3", priz_duv_text4 = "priz_duv_text4", priz_duv_text5 = "priz_duv_text5", priz_duv_text6 = "priz_duv_text6", priz_duv_text7 = "priz_duv_text7", priz_duv_text8 = "priz_duv_text8", priz_duv_text9 = "priz_duv_text9", vice_vs = "vice_vs", dat_vyp_stav = "dat_vyp_stav", typ_vyp_stav = "typ_vyp_stav", rez_vyp = "rez_vyp", priz_rzv = "priz_rzv", gen_opr = "gen_opr", zprac_poz = "zprac_poz", priz_napvra = "priz_napvra", typ_phl_exe = "typ_phl_exe", priz_verejny = "priz_verejny", priz_avizace = "priz_avizace", priz_par = "priz_par", priz_dph_sniz2 = "priz_dph_sniz2", priz_dph_sniz3 = "priz_dph_sniz3", typ_phl_ins = "typ_phl_ins", dat_opr = "dat_opr", typ_phl_php = "typ_phl_php", zp_uhr = "zp_uhr", ixs_typ = "ixs_typ", ixs_typ_vra = "ixs_typ_vra", priz_kpsd = "priz_kpsd",}
	const enum GDdpstppDtoFragments { typ_phl = "*", nazev = "*", poznamka = "*", aktivita = "*", typ_ag = "*", naz_text0 = "*", naz_text1 = "*", naz_text2 = "*", naz_text3 = "*", naz_text4 = "*", naz_text5 = "*", naz_text6 = "*", naz_text7 = "*", naz_text8 = "*", naz_text9 = "*", znam = "*", dat_zmena = "*", zmenu_prov = "*", priz_dph = "*", text_pov0 = "*", text_pov1 = "*", text_pov2 = "*", text_pov3 = "*", text_pov4 = "*", text_pov5 = "*", text_pov6 = "*", text_pov7 = "*", text_pov8 = "*", text_pov9 = "*", priz_nepar = "*", priz_dph2 = "*", priz_osvob = "*", priz_dph_zakl = "*", priz_dph_sniz = "*", typ_text0 = "*", typ_text1 = "*", typ_text2 = "*", typ_text3 = "*", typ_text4 = "*", typ_text5 = "*", typ_text6 = "*", typ_text7 = "*", typ_text8 = "*", typ_text9 = "*", priz_duv_text0 = "*", priz_duv_text1 = "*", priz_duv_text2 = "*", priz_duv_text3 = "*", priz_duv_text4 = "*", priz_duv_text5 = "*", priz_duv_text6 = "*", priz_duv_text7 = "*", priz_duv_text8 = "*", priz_duv_text9 = "*", vice_vs = "*", dat_vyp_stav = "*", typ_vyp_stav = "*", rez_vyp = "*", priz_rzv = "*", gen_opr = "*", zprac_poz = "*", priz_napvra = "*", typ_phl_exe = "*", priz_verejny = "*", priz_avizace = "*", priz_par = "*", priz_dph_sniz2 = "*", priz_dph_sniz3 = "*", typ_phl_ins = "*", dat_opr = "*", typ_phl_php = "*", zp_uhr = "*", ixs_typ = "*", ixs_typ_vra = "*", priz_kpsd = "*",}
	const enum GDdpstppDtoTypes { typ_phl = "string", nazev = "string", poznamka = "string", aktivita = "number", typ_ag = "number", naz_text0 = "string", naz_text1 = "string", naz_text2 = "string", naz_text3 = "string", naz_text4 = "string", naz_text5 = "string", naz_text6 = "string", naz_text7 = "string", naz_text8 = "string", naz_text9 = "string", znam = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_dph = "number", text_pov0 = "number", text_pov1 = "number", text_pov2 = "number", text_pov3 = "number", text_pov4 = "number", text_pov5 = "number", text_pov6 = "number", text_pov7 = "number", text_pov8 = "number", text_pov9 = "number", priz_nepar = "number", priz_dph2 = "number", priz_osvob = "number", priz_dph_zakl = "number", priz_dph_sniz = "number", typ_text0 = "number", typ_text1 = "number", typ_text2 = "number", typ_text3 = "number", typ_text4 = "number", typ_text5 = "number", typ_text6 = "number", typ_text7 = "number", typ_text8 = "number", typ_text9 = "number", priz_duv_text0 = "number", priz_duv_text1 = "number", priz_duv_text2 = "number", priz_duv_text3 = "number", priz_duv_text4 = "number", priz_duv_text5 = "number", priz_duv_text6 = "number", priz_duv_text7 = "number", priz_duv_text8 = "number", priz_duv_text9 = "number", vice_vs = "number", dat_vyp_stav = "JsonDate", typ_vyp_stav = "number", rez_vyp = "number", priz_rzv = "number", gen_opr = "number", zprac_poz = "number", priz_napvra = "number", typ_phl_exe = "string", priz_verejny = "number", priz_avizace = "number", priz_par = "number", priz_dph_sniz2 = "number", priz_dph_sniz3 = "number", typ_phl_ins = "string", dat_opr = "JsonDate", typ_phl_php = "string", zp_uhr = "number", ixs_typ = "string", ixs_typ_vra = "string", priz_kpsd = "number",}
	const enum GDdpstppDtoTypeLengths { typ_phl = 4, nazev = 50, poznamka = 50, naz_text0 = 50, naz_text1 = 50, naz_text2 = 50, naz_text3 = 50, naz_text4 = 50, naz_text5 = 50, naz_text6 = 50, naz_text7 = 50, naz_text8 = 50, naz_text9 = 50, zmenu_prov = 12, typ_phl_exe = 4, typ_phl_ins = 4, typ_phl_php = 4, ixs_typ = 12, ixs_typ_vra = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GDetailRezervaceDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Slovník pro grid rezervace na detailu dokladu*/
	interface GDetailRezervaceDto {
		col_s?: string|null;
		/**Stav*/
		col_stav?: string|null;
		/**Rok SML*/
		col_rok_sml?: string|null;
		/**Cislo SML*/
		col_cislo_sml?: string|null;
		/**IXP*/
		col_ixp?: string|null;
		/**Evidenční č.*/
		col_ac?: string|null;
		/**Evid. číslo. agendy*/
		col_ac_ag?: string|null;
		/**ac esu*/
		col_ac_esu?: string|null;
		/**IČO esu*/
		col_ico_esu?: string|null;
		/**ESU název txt*/
		col_esu_txt?: string|null;
		/**Částka*/
		col_c?: JsonDecimal|null;
		/**Částka celkem*/
		col_c_celkem?: JsonDecimal|null;
		/**Částka rezervace*/
		col_c_rez?: JsonDecimal|null;
		/**Popis*/
		col_popis?: string|null;
		/**Datum splatnosti*/
		col_dat_spl?: JsonDate|null;
		/**Datum úhrady*/
		col_dat_uhr?: JsonDate|null;
		/**Dat zaučtování*/
		col_dat_zau?: JsonDate|null;
		/**Variabilní symbol*/
		col_vs?: string|null;
		/**Konstantní symbol*/
		col_ks?: string|null;
		/**Specifický symbol*/
		col_ss?: string|null;
		/**Vlastní účet*/
		col_bu_vl?: string|null;
		/**směrovačí číslo učtu*/
		col_sk_vl?: string|null;
		/**číslo účtu cizí*/
		col_bu_ci?: string|null;
		/**směrovací číslo cizí*/
		col_sk_ci?: string|null;
		/**způsob úhrady zkratka*/
		col_zp_zkr?: string|null;
		/**název knihy ?*/
		col_nazev_den?: string|null;
		/**název referenta*/
		col_nazev_ref?: string|null;
		/**datum změny*/
		col_dat_zmena?: JsonDate|null;
		/**datum evidence*/
		col_dat_evid?: JsonDate|null;
		/**Kategorie typu*/
		col_ktg_typ?: number|null;
		/**Agenda*/
		col_agd?: string|null;
		/**IXP knihy*/
		col_ixp_den_txt?: string|null;
		/**Zpracovatel*/
		col_ixs_fun_akt_txt?: string|null;
		col_kod_kon?: string|null;
		col_s_sto?: number|null;
	}
	const enum GDetailRezervaceDtoNames { col_s = "col_s", col_stav = "col_stav", col_rok_sml = "col_rok_sml", col_cislo_sml = "col_cislo_sml", col_ixp = "col_ixp", col_ac = "col_ac", col_ac_ag = "col_ac_ag", col_ac_esu = "col_ac_esu", col_ico_esu = "col_ico_esu", col_esu_txt = "col_esu_txt", col_c = "col_c", col_c_celkem = "col_c_celkem", col_c_rez = "col_c_rez", col_popis = "col_popis", col_dat_spl = "col_dat_spl", col_dat_uhr = "col_dat_uhr", col_dat_zau = "col_dat_zau", col_vs = "col_vs", col_ks = "col_ks", col_ss = "col_ss", col_bu_vl = "col_bu_vl", col_sk_vl = "col_sk_vl", col_bu_ci = "col_bu_ci", col_sk_ci = "col_sk_ci", col_zp_zkr = "col_zp_zkr", col_nazev_den = "col_nazev_den", col_nazev_ref = "col_nazev_ref", col_dat_zmena = "col_dat_zmena", col_dat_evid = "col_dat_evid", col_ktg_typ = "col_ktg_typ", col_agd = "col_agd", col_ixp_den_txt = "col_ixp_den_txt", col_ixs_fun_akt_txt = "col_ixs_fun_akt_txt", col_kod_kon = "col_kod_kon", col_s_sto = "col_s_sto",}
	const enum GDetailRezervaceDtoFragments { col_s = "*", col_stav = "*", col_rok_sml = "*", col_cislo_sml = "*", col_ixp = "*", col_ac = "*", col_ac_ag = "*", col_ac_esu = "*", col_ico_esu = "*", col_esu_txt = "*", col_c = "*", col_c_celkem = "*", col_c_rez = "*", col_popis = "*", col_dat_spl = "*", col_dat_uhr = "*", col_dat_zau = "*", col_vs = "*", col_ks = "*", col_ss = "*", col_bu_vl = "*", col_sk_vl = "*", col_bu_ci = "*", col_sk_ci = "*", col_zp_zkr = "*", col_nazev_den = "*", col_nazev_ref = "*", col_dat_zmena = "*", col_dat_evid = "*", col_ktg_typ = "*", col_agd = "*", col_ixp_den_txt = "*", col_ixs_fun_akt_txt = "*", col_kod_kon = "*", col_s_sto = "*",}
	const enum GDetailRezervaceDtoTypes { col_s = "string", col_stav = "string", col_rok_sml = "string", col_cislo_sml = "string", col_ixp = "string", col_ac = "string", col_ac_ag = "string", col_ac_esu = "string", col_ico_esu = "string", col_esu_txt = "string", col_c = "JsonDecimal", col_c_celkem = "JsonDecimal", col_c_rez = "JsonDecimal", col_popis = "string", col_dat_spl = "JsonDate", col_dat_uhr = "JsonDate", col_dat_zau = "JsonDate", col_vs = "string", col_ks = "string", col_ss = "string", col_bu_vl = "string", col_sk_vl = "string", col_bu_ci = "string", col_sk_ci = "string", col_zp_zkr = "string", col_nazev_den = "string", col_nazev_ref = "string", col_dat_zmena = "JsonDate", col_dat_evid = "JsonDate", col_ktg_typ = "number", col_agd = "string", col_ixp_den_txt = "string", col_ixs_fun_akt_txt = "string", col_kod_kon = "string", col_s_sto = "number",}
	const enum GDetailRezervaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GDokladyDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Hlavní seznam dokladů*/
	interface GDokladyDto {
		/**Základní identrifikátor dokladu*/
		ixp?: string|null;
		/**DBCOLUMN:smlspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:smlspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlspid.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:smlspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smlspid.nks*/
		nks?: string|null;
		/**DBCOLUMN:smlspid.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:smlspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlspid.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:smlspid.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:smlspid.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlspid.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:smlspid.bu_ci*/
		bu_protiucet?: string|null;
		/**DBCOLUMN:smlspid.ac*/
		ac?: string|null;
		/**Neměnný identifikátor dokladu bez ohledu na knihu*/
		ac_sml?: string|null;
		ac_sml_nad?: string|null;
		/**DBCOLUMN:smlspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:smlspid.subrada*/
		subrada?: number|null;
		/**The mena text*/
		mena_txt?: string|null;
		/**The rc esu*/
		rc_esu?: string|null;
		/**The ixs esu text*/
		ixs_esu_txt?: string|null;
		/**The typ esu*/
		typ_esu?: string|null;
		/**The ixs fun vyriz text*/
		ixs_fun_vyriz_txt?: string|null;
		/**The ixs fun reference text*/
		ixs_fun_ref_txt?: string|null;
		/**The ixs fun akt text*/
		ixs_fun_akt_txt?: string|null;
		/**The priz opce ZKR*/
		priz_opce_zkr?: string|null;
		/**The KTG typ nad*/
		ktg_typ_nad?: string|null;
		/**The typ platnost text*/
		typ_platnost_txt?: string|null;
		/**The ixs orj*/
		ixs_orj?: string|null;
		/**The ixs orj*/
		ixs_typ?: string|null;
		/**The ixs orj text*/
		ixs_orj_txt?: string|null;
		/**The c fak*/
		c_fak?: JsonDecimal|null;
		/**The c object SML*/
		c_obj_sml?: JsonDecimal|null;
		/**The poc epri*/
		poc_epri?: string|null;
		/**The pic stav RSP*/
		pic_stavRsp?: string|null;
		/**The number pol*/
		num_pol?: string|null;
		/**The number pol SCH*/
		num_pol_sch?: string|null;
		/**The ixs reference zast text*/
		ixs_ref_zast_txt?: string|null;
		/**The ixs zuk text*/
		ixs_zuk_txt?: string|null;
		/**The ixs esu zast text*/
		ixs_esu_zast_txt?: string|null;
		/**The c rok rok*/
		c_rok_rok?: string|null;
		/**The c pol rok*/
		c_pol_rok?: string|null;
		/**The c fak rok*/
		c_fak_rok?: string|null;
		/**The dat zve*/
		dat_zve?: JsonDate|null;
		/**The plan zve*/
		plan_zve?: string|null;
		/**The plan zve*/
		ac_sml_pri?: string|null;
		/**The preevid*/
		preevid?: string|null;
		/**DBCOLUMN:smlspid.dat_sgn -*/
		dat_sgn?: JsonDate|null;
		/**Množinový údaj charakterizující doklad z hlediska jeho kategore typů dokladu*/
		ktg_sml?: number|null;
		/**DBCOLUMN:smlspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlspid.c - Celková částka dokladu v CZK rozepsaná na účetní obodbí*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.sml_stav - Stav dokladu*/
		sml_stav?: number|null;
		/**DBCOLUMN:smlspid.dat_uzavreni - Datum uzavření/vystavení*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_platnost - Datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_prij_pod - Datum podání dokladu*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_fun_vyriz - Kompetent*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlspid.ixs_fun_ref - vyřizující referent*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:smlspid.rok - rok uzavření smlouvy*/
		rok?: number|null;
		/**DBCOLUMN:smlspid.poznamka - Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**DBCOLUMN:smlspid.soutez - Soutěž*/
		soutez?: string|null;
		/**DBCOLUMN:smlspid.c_pol - Částka položek*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_dod - Částka dodatků*/
		c_dod?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_platnost - Typ platnosti*/
		typ_platnost?: number|null;
		/**DBCOLUMN:smlspid.fin_od - Financování od*/
		fin_od?: number|null;
		/**DBCOLUMN:smlspid.fin_do - Financování do*/
		fin_do?: number|null;
		/**DBCOLUMN:smlspid.nazev - Úplný název smlouvy*/
		nazev?: string|null;
		/**DBCOLUMN:smlspid.ac_ver_zak - Agendové číslo případu BLK*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:smlspid.ac_dok_1 - číslo souvisejícího dokumentu ( usnesení )*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:smlspid.ac_dok_2 - číslo souvisejícího dokumentu ( usnesení )*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:smlspid.ixp_sml - Identifikátor nadřazeného případu*/
		ixp_sml?: string|null;
		/**DBCOLUMN:smlspid.ixs_pri - Identifikátor případu blůokační agendy*/
		ixs_pri?: string|null;
		/**DBCOLUMN:smlspid.c_mena - Celková částka v měně*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_doc -*/
		c_mena_doc?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_doc -*/
		c_mena_doc_bez_dph?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_doc -*/
		c_mena_doc_dph?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_doc -*/
		c_mena_doc_s_dph?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.dat_ucinnost - Datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:smlspid.ucinnost - účinnost smlouvy*/
		ucinnost?: string|null;
		/**DBCOLUMN:smlspid.sgn_stav -*/
		sgn_stav?: number|null;
		/**DBCOLUMN:smlspid.priz_view -*/
		priz_view?: number|null;
		/**DBCOLUMN:smlspid.typ_ceny -*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlspid.ixs_ref_zast -*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:smlspid.lic_zast_esu -*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:smlspid.por_zast_esu -*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:smlspid.dat_dok_1 -*/
		dat_dok_1?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_dok_2 -*/
		dat_dok_2?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_zuk -*/
		ixs_zuk?: string|null;
		/**DBCOLUMN:smlspid.ktg_zuk -*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:smlspid.dat_uko -*/
		dat_uko?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_esu_zast -*/
		ixs_esu_zast?: string|null;
		/**DBCOLUMN:smlspid.ixs_esu_zast -*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:smlspid.dat_sgn_ext -*/
		dat_sgn_ext?: JsonDate|null;
		/**DBCOLUMN:smlspid.cis_real - Realizátor*/
		cis_real_txt?: string|null;
		/**DBCOLUMN:smlspid.ixp_sml_pri -*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlspid.typ_phl - Typ pohledávky*/
		typ_phl?: string|null;
		/**DBCOLUMN:smlspid.vs - VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs?: string|null;
		/**DBCOLUMN:smlspid.priz_opce -*/
		priz_opce?: number|null;
		/**The stav preevid
		*     Přejmenováno stav_preevid na preevidence z důvodu společné definování sloupečků
		*/
		preevidence?: string|null;
		/**The stav preevid*/
		sml_stav_txt?: string|null;
		/**The stav preevid*/
		poradi?: number|null;
		/**The wflspid*/
		wflspid?: Gordic.Sml.Interface.GWflspidDto|null;
		/**The smlspac*/
		smlspac?: Gordic.Sml.Interface.GSmlspacDto|null;
		/**rozpis v měně*/
		c_mena_roz?: string|null;
		/**Data navázaného dokumentu.*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**stav finanční kontroly*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav účetní kontroly*/
		stav_uk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav průběžné kontroly*/
		stav_pk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
	}
	const enum GDokladyDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_protiucet = "bu_protiucet", ac = "ac", ac_sml = "ac_sml", ac_sml_nad = "ac_sml_nad", ixp_den = "ixp_den", subrada = "subrada", mena_txt = "mena_txt", rc_esu = "rc_esu", ixs_esu_txt = "ixs_esu_txt", typ_esu = "typ_esu", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", priz_opce_zkr = "priz_opce_zkr", ktg_typ_nad = "ktg_typ_nad", typ_platnost_txt = "typ_platnost_txt", ixs_orj = "ixs_orj", ixs_typ = "ixs_typ", ixs_orj_txt = "ixs_orj_txt", c_fak = "c_fak", c_obj_sml = "c_obj_sml", poc_epri = "poc_epri", pic_stavRsp = "pic_stavRsp", num_pol = "num_pol", num_pol_sch = "num_pol_sch", ixs_ref_zast_txt = "ixs_ref_zast_txt", ixs_zuk_txt = "ixs_zuk_txt", ixs_esu_zast_txt = "ixs_esu_zast_txt", c_rok_rok = "c_rok_rok", c_pol_rok = "c_pol_rok", c_fak_rok = "c_fak_rok", dat_zve = "dat_zve", plan_zve = "plan_zve", ac_sml_pri = "ac_sml_pri", preevid = "preevid", dat_sgn = "dat_sgn", ktg_sml = "ktg_sml", ktg_typ = "ktg_typ", c = "c", sml_stav = "sml_stav", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", rok = "rok", poznamka = "poznamka", soutez = "soutez", c_pol = "c_pol", c_dod = "c_dod", typ_platnost = "typ_platnost", fin_od = "fin_od", fin_do = "fin_do", nazev = "nazev", ac_ver_zak = "ac_ver_zak", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ixp_sml = "ixp_sml", ixs_pri = "ixs_pri", c_mena = "c_mena", c_mena_doc = "c_mena_doc", c_mena_doc_bez_dph = "c_mena_doc_bez_dph", c_mena_doc_dph = "c_mena_doc_dph", c_mena_doc_s_dph = "c_mena_doc_s_dph", dat_ucinnost = "dat_ucinnost", ucinnost = "ucinnost", sgn_stav = "sgn_stav", priz_view = "priz_view", typ_ceny = "typ_ceny", ixs_ref_zast = "ixs_ref_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", ixs_esu_zast = "ixs_esu_zast", ixs_typ_txt = "ixs_typ_txt", dat_sgn_ext = "dat_sgn_ext", cis_real_txt = "cis_real_txt", ixp_sml_pri = "ixp_sml_pri", typ_phl = "typ_phl", vs = "vs", priz_opce = "priz_opce", preevidence = "preevidence", sml_stav_txt = "sml_stav_txt", poradi = "poradi", wflspid = "wflspid", smlspac = "smlspac", c_mena_roz = "c_mena_roz", dokument = "dokument", stav_fk = "stav_fk", stav_uk = "stav_uk", stav_pk = "stav_pk",}
	const enum GDokladyDtoFragments { ixp = "*", lic = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", bu_protiucet = "*", ac = "*", ac_sml = "*", ac_sml_nad = "*", ixp_den = "*", subrada = "*", mena_txt = "*", rc_esu = "*", ixs_esu_txt = "*", typ_esu = "*", ixs_fun_vyriz_txt = "*", ixs_fun_ref_txt = "*", ixs_fun_akt_txt = "*", priz_opce_zkr = "*", ktg_typ_nad = "*", typ_platnost_txt = "*", ixs_orj = "*", ixs_typ = "*", ixs_orj_txt = "*", c_fak = "*", c_obj_sml = "*", poc_epri = "*", pic_stavRsp = "*", num_pol = "*", num_pol_sch = "*", ixs_ref_zast_txt = "*", ixs_zuk_txt = "*", ixs_esu_zast_txt = "*", c_rok_rok = "*", c_pol_rok = "*", c_fak_rok = "*", dat_zve = "*", plan_zve = "*", ac_sml_pri = "*", preevid = "*", dat_sgn = "*", ktg_sml = "*", ktg_typ = "*", c = "*", sml_stav = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", rok = "*", poznamka = "*", soutez = "*", c_pol = "*", c_dod = "*", typ_platnost = "*", fin_od = "*", fin_do = "*", nazev = "*", ac_ver_zak = "*", ac_dok_1 = "*", ac_dok_2 = "*", ixp_sml = "*", ixs_pri = "*", c_mena = "*", c_mena_doc = "*", c_mena_doc_bez_dph = "*", c_mena_doc_dph = "*", c_mena_doc_s_dph = "*", dat_ucinnost = "*", ucinnost = "*", sgn_stav = "*", priz_view = "*", typ_ceny = "*", ixs_ref_zast = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", ixs_esu_zast = "*", ixs_typ_txt = "*", dat_sgn_ext = "*", cis_real_txt = "*", ixp_sml_pri = "*", typ_phl = "*", vs = "*", priz_opce = "*", preevidence = "*", sml_stav_txt = "*", poradi = "*", wflspid = "*", smlspac = "*", c_mena_roz = "*", dokument = "WflSloupce", stav_fk = "WFL_FK", stav_uk = "WFL_UK", stav_pk = "WFL_PK",}
	const enum GDokladyDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", bu_protiucet = "string", ac = "string", ac_sml = "string", ac_sml_nad = "string", ixp_den = "string", subrada = "number", mena_txt = "string", rc_esu = "string", ixs_esu_txt = "string", typ_esu = "string", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", ixs_fun_akt_txt = "string", priz_opce_zkr = "string", ktg_typ_nad = "string", typ_platnost_txt = "string", ixs_orj = "string", ixs_typ = "string", ixs_orj_txt = "string", c_fak = "JsonDecimal", c_obj_sml = "JsonDecimal", poc_epri = "string", pic_stavRsp = "string", num_pol = "string", num_pol_sch = "string", ixs_ref_zast_txt = "string", ixs_zuk_txt = "string", ixs_esu_zast_txt = "string", c_rok_rok = "string", c_pol_rok = "string", c_fak_rok = "string", dat_zve = "JsonDate", plan_zve = "string", ac_sml_pri = "string", preevid = "string", dat_sgn = "JsonDate", ktg_sml = "number", ktg_typ = "number", c = "JsonDecimal", sml_stav = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", rok = "number", poznamka = "string", soutez = "string", c_pol = "JsonDecimal", c_dod = "JsonDecimal", typ_platnost = "number", fin_od = "number", fin_do = "number", nazev = "string", ac_ver_zak = "string", ac_dok_1 = "string", ac_dok_2 = "string", ixp_sml = "string", ixs_pri = "string", c_mena = "JsonDecimal", c_mena_doc = "JsonDecimal", c_mena_doc_bez_dph = "JsonDecimal", c_mena_doc_dph = "JsonDecimal", c_mena_doc_s_dph = "JsonDecimal", dat_ucinnost = "JsonDate", ucinnost = "string", sgn_stav = "number", priz_view = "number", typ_ceny = "number", ixs_ref_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", ixs_esu_zast = "string", ixs_typ_txt = "string", dat_sgn_ext = "JsonDate", cis_real_txt = "string", ixp_sml_pri = "string", typ_phl = "string", vs = "string", priz_opce = "number", preevidence = "string", sml_stav_txt = "string", poradi = "number", wflspid = "Gordic.Sml.Interface.GWflspidDto", smlspac = "Gordic.Sml.Interface.GSmlspacDto", c_mena_roz = "string", dokument = "Gordic.Ssl.Interface.GDokumentDto", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto",}
	const enum GDokladyDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 60, popis = 254, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, bu_protiucet = 34, ac = 30, ac_sml = 30, ac_sml_nad = 30, ixp_den = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka = 500, soutez = 30, nazev = 4000, ac_ver_zak = 30, ac_dok_1 = 25, ac_dok_2 = 25, ixp_sml = 12, ixs_pri = 12, ucinnost = 20, ixs_ref_zast = 12, lic_zast_esu = 4, ixs_zuk = 12, ixs_esu_zast = 12, ixs_typ_txt = 12, cis_real_txt = 6, ixp_sml_pri = 12, typ_phl = 4, vs = 12,}
	/**Dto pro typ kategorie dokladu*/
	interface TypKategorieDokladuDto {
		/**The typ*/
		typ?: number[]|null;
	}
	const enum TypKategorieDokladuDtoNames { typ = "typ",}
	const enum TypKategorieDokladuDtoFragments { typ = "*",}
	const enum TypKategorieDokladuDtoTypes { typ = "number[]",}
	const enum TypKategorieDokladuDtoTypeLengths {}
	/**Dto pro polička na detailu dokladu*/
	interface PolickaNaDetailuDokladu {
		/**The smlspid*/
		smlspid?: Gordic.Sml.Interface.GSmlspidDto|null;
		/**Identifikátor enabled*/
		ixp_Enabled?: boolean|null;
		/**Identifikátor value*/
		ixp_Value?: string|null;
		/**Agendové číslo enabled*/
		ac_sml_Enabled?: boolean|null;
		/**Agendové číslo value*/
		ac_sml_Value?: string|null;
		/**Evidenční číslo enabled*/
		ac_Enabled?: boolean|null;
		/**Evidenční číslo value*/
		ac_Value?: string|null;
		/**Datum evidence enabled*/
		dat_prij_pod_Enabled?: boolean|null;
		/**Datum evidence value*/
		dat_prij_pod_Value?: string|null;
		/**Zpracovatel Enabled*/
		ixs_fun_akt_Enabled?: boolean|null;
		/**Zpracovatel value*/
		ixs_fun_akt_Value?: string|null;
		/**Typ dokladu enabled*/
		ixs_typ_Enabled?: boolean|null;
		/**Typ dokladu value*/
		ixs_typ_Value?: string|null;
		/**Identifikátor případu NAD enabled*/
		ixp_sml_Enabled?: boolean|null;
		/**Identifikátor případu NAD value*/
		ixp_sml_Value?: string|null;
		/**Agendové číslo případu NAD enabled*/
		ac_sml_nad_Enabled?: boolean|null;
		/**Agendové číslo případu NAD value*/
		ac_sml_nad_Value?: string|null;
		/**Evidenční číslo případu NAD enabled*/
		ac_nad_Enabled?: boolean|null;
		/**Evidenční číslo případu NAD value*/
		ac_nad_Value?: string|null;
		/**Číslo dodatku enabled*/
		cislo_dod_Enabled?: boolean|null;
		/**Číslo dodatku value*/
		cislo_dod_Value?: string|null;
		/**Kompetent enabled*/
		ixs_fun_vyriz_Enabled?: boolean|null;
		/**Kompetent value*/
		ixs_fun_vyriz_Value?: string|null;
		/**Vyřizující referent enabled*/
		ixs_fun_ref_Enabled?: boolean|null;
		/**Vyřizující referent value*/
		ixs_fun_ref_Value?: string|null;
		/**Organizační jednotka enabled*/
		orj_Enabled?: boolean|null;
		/**Organizační jednotka value*/
		orj_Value?: string|null;
		/**Realizátor enabled*/
		cis_real_Enabled?: boolean|null;
		/**Realizátor value*/
		cis_real_Value?: string|null;
		/**Číslo blokační agendy enabled – ac_ver_zak*/
		ac_ver_zak_Enabled?: boolean|null;
		/**Číslo blokační agendy value – ac_ver_zak*/
		ac_ver_zak_Value?: string|null;
		/**Typ ceny enabled*/
		typ_ceny_Enabled?: boolean|null;
		/**Typ ceny value*/
		typ_ceny_Value?: string|null;
		/**Externí subjekt enabled – ixs_esu*/
		ixs_esu_Enabled?: boolean|null;
		/**Externí subjekt Value – ixs_esu*/
		ixs_esu_Value?: boolean|null;
		/**Externí subjekt value IČO – ixs_esu*/
		ixs_esu_ico_Value?: string|null;
		/**Externí subjekt value NAME – ixs_esu_txt*/
		ixs_esu_Value_txt?: string|null;
		/**The ac esu value*/
		ac_esu_Value?: string|null;
		/**The popis value*/
		popis_Value?: string|null;
		/**The sk ci value*/
		sk_ci_Value?: string|null;
		/**The bu ci value*/
		bu_ci_Value?: string|null;
		/**The c value*/
		c_Value?: string|null;
		/**The KTG typ value*/
		ktg_typ_Value?: number|null;
		/**The dat uzavreni value*/
		dat_uzavreni_Value?: JsonDate|null;
		/**The dat platnost value*/
		dat_platnost_Value?: JsonDate|null;
		/**The poznamka value*/
		poznamka_Value?: number|null;
		/**The soutez value*/
		soutez_Value?: number|null;
		/**The KTG SML value*/
		ktg_sml_Value?: number|null;
		/**The typ platnost value*/
		typ_platnost_Value?: string|null;
		/**The c mena value*/
		c_mena_Value?: JsonDecimal|null;
	}
	const enum PolickaNaDetailuDokladuNames { smlspid = "smlspid", ixp_Enabled = "ixp_Enabled", ixp_Value = "ixp_Value", ac_sml_Enabled = "ac_sml_Enabled", ac_sml_Value = "ac_sml_Value", ac_Enabled = "ac_Enabled", ac_Value = "ac_Value", dat_prij_pod_Enabled = "dat_prij_pod_Enabled", dat_prij_pod_Value = "dat_prij_pod_Value", ixs_fun_akt_Enabled = "ixs_fun_akt_Enabled", ixs_fun_akt_Value = "ixs_fun_akt_Value", ixs_typ_Enabled = "ixs_typ_Enabled", ixs_typ_Value = "ixs_typ_Value", ixp_sml_Enabled = "ixp_sml_Enabled", ixp_sml_Value = "ixp_sml_Value", ac_sml_nad_Enabled = "ac_sml_nad_Enabled", ac_sml_nad_Value = "ac_sml_nad_Value", ac_nad_Enabled = "ac_nad_Enabled", ac_nad_Value = "ac_nad_Value", cislo_dod_Enabled = "cislo_dod_Enabled", cislo_dod_Value = "cislo_dod_Value", ixs_fun_vyriz_Enabled = "ixs_fun_vyriz_Enabled", ixs_fun_vyriz_Value = "ixs_fun_vyriz_Value", ixs_fun_ref_Enabled = "ixs_fun_ref_Enabled", ixs_fun_ref_Value = "ixs_fun_ref_Value", orj_Enabled = "orj_Enabled", orj_Value = "orj_Value", cis_real_Enabled = "cis_real_Enabled", cis_real_Value = "cis_real_Value", ac_ver_zak_Enabled = "ac_ver_zak_Enabled", ac_ver_zak_Value = "ac_ver_zak_Value", typ_ceny_Enabled = "typ_ceny_Enabled", typ_ceny_Value = "typ_ceny_Value", ixs_esu_Enabled = "ixs_esu_Enabled", ixs_esu_Value = "ixs_esu_Value", ixs_esu_ico_Value = "ixs_esu_ico_Value", ixs_esu_Value_txt = "ixs_esu_Value_txt", ac_esu_Value = "ac_esu_Value", popis_Value = "popis_Value", sk_ci_Value = "sk_ci_Value", bu_ci_Value = "bu_ci_Value", c_Value = "c_Value", ktg_typ_Value = "ktg_typ_Value", dat_uzavreni_Value = "dat_uzavreni_Value", dat_platnost_Value = "dat_platnost_Value", poznamka_Value = "poznamka_Value", soutez_Value = "soutez_Value", ktg_sml_Value = "ktg_sml_Value", typ_platnost_Value = "typ_platnost_Value", c_mena_Value = "c_mena_Value",}
	const enum PolickaNaDetailuDokladuFragments { smlspid = "*", ixp_Enabled = "*", ixp_Value = "*", ac_sml_Enabled = "*", ac_sml_Value = "*", ac_Enabled = "*", ac_Value = "*", dat_prij_pod_Enabled = "*", dat_prij_pod_Value = "*", ixs_fun_akt_Enabled = "*", ixs_fun_akt_Value = "*", ixs_typ_Enabled = "*", ixs_typ_Value = "*", ixp_sml_Enabled = "*", ixp_sml_Value = "*", ac_sml_nad_Enabled = "*", ac_sml_nad_Value = "*", ac_nad_Enabled = "*", ac_nad_Value = "*", cislo_dod_Enabled = "*", cislo_dod_Value = "*", ixs_fun_vyriz_Enabled = "*", ixs_fun_vyriz_Value = "*", ixs_fun_ref_Enabled = "*", ixs_fun_ref_Value = "*", orj_Enabled = "*", orj_Value = "*", cis_real_Enabled = "*", cis_real_Value = "*", ac_ver_zak_Enabled = "*", ac_ver_zak_Value = "*", typ_ceny_Enabled = "*", typ_ceny_Value = "*", ixs_esu_Enabled = "*", ixs_esu_Value = "*", ixs_esu_ico_Value = "*", ixs_esu_Value_txt = "*", ac_esu_Value = "*", popis_Value = "*", sk_ci_Value = "*", bu_ci_Value = "*", c_Value = "*", ktg_typ_Value = "*", dat_uzavreni_Value = "*", dat_platnost_Value = "*", poznamka_Value = "*", soutez_Value = "*", ktg_sml_Value = "*", typ_platnost_Value = "*", c_mena_Value = "*",}
	const enum PolickaNaDetailuDokladuTypes { smlspid = "Gordic.Sml.Interface.GSmlspidDto", ixp_Enabled = "boolean", ixp_Value = "string", ac_sml_Enabled = "boolean", ac_sml_Value = "string", ac_Enabled = "boolean", ac_Value = "string", dat_prij_pod_Enabled = "boolean", dat_prij_pod_Value = "string", ixs_fun_akt_Enabled = "boolean", ixs_fun_akt_Value = "string", ixs_typ_Enabled = "boolean", ixs_typ_Value = "string", ixp_sml_Enabled = "boolean", ixp_sml_Value = "string", ac_sml_nad_Enabled = "boolean", ac_sml_nad_Value = "string", ac_nad_Enabled = "boolean", ac_nad_Value = "string", cislo_dod_Enabled = "boolean", cislo_dod_Value = "string", ixs_fun_vyriz_Enabled = "boolean", ixs_fun_vyriz_Value = "string", ixs_fun_ref_Enabled = "boolean", ixs_fun_ref_Value = "string", orj_Enabled = "boolean", orj_Value = "string", cis_real_Enabled = "boolean", cis_real_Value = "string", ac_ver_zak_Enabled = "boolean", ac_ver_zak_Value = "string", typ_ceny_Enabled = "boolean", typ_ceny_Value = "string", ixs_esu_Enabled = "boolean", ixs_esu_Value = "boolean", ixs_esu_ico_Value = "string", ixs_esu_Value_txt = "string", ac_esu_Value = "string", popis_Value = "string", sk_ci_Value = "string", bu_ci_Value = "string", c_Value = "string", ktg_typ_Value = "number", dat_uzavreni_Value = "JsonDate", dat_platnost_Value = "JsonDate", poznamka_Value = "number", soutez_Value = "number", ktg_sml_Value = "number", typ_platnost_Value = "string", c_mena_Value = "JsonDecimal",}
	const enum PolickaNaDetailuDokladuTypeLengths {}
	/**Parametry dostupné z detailu dokladu v .ts*/
	interface GSmlDetailParametryDto {
		/**Parameter*/
		sml_rad_tempddp?: number|null;
		/**Parameter*/
		sml_rad_vyd2ddp?: number|null;
		/**Parameter*/
		sml_rad_sezhgep?: number|null;
		/**Parameter*/
		sml_bnd_smlevz?: number|null;
		/**Parameter*/
		sml_zav_nreforj?: number|null;
		/**Parameter*/
		sml_rad_aktci?: number|null;
		/**Parameter*/
		sml_def_acsml?: string|null;
		/**Parameter*/
		sml_def_acsmlno?: string|null;
		/**Parameter*/
		sml_dok_fillrcr?: number|null;
	}
	const enum GSmlDetailParametryDtoNames { sml_rad_tempddp = "sml_rad_tempddp", sml_rad_vyd2ddp = "sml_rad_vyd2ddp", sml_rad_sezhgep = "sml_rad_sezhgep", sml_bnd_smlevz = "sml_bnd_smlevz", sml_zav_nreforj = "sml_zav_nreforj", sml_rad_aktci = "sml_rad_aktci", sml_def_acsml = "sml_def_acsml", sml_def_acsmlno = "sml_def_acsmlno", sml_dok_fillrcr = "sml_dok_fillrcr",}
	const enum GSmlDetailParametryDtoFragments { sml_rad_tempddp = "*", sml_rad_vyd2ddp = "*", sml_rad_sezhgep = "*", sml_bnd_smlevz = "*", sml_zav_nreforj = "*", sml_rad_aktci = "*", sml_def_acsml = "*", sml_def_acsmlno = "*", sml_dok_fillrcr = "*",}
	const enum GSmlDetailParametryDtoTypes { sml_rad_tempddp = "number", sml_rad_vyd2ddp = "number", sml_rad_sezhgep = "number", sml_bnd_smlevz = "number", sml_zav_nreforj = "number", sml_rad_aktci = "number", sml_def_acsml = "string", sml_def_acsmlno = "string", sml_dok_fillrcr = "number",}
	const enum GSmlDetailParametryDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GDokladyListFilterDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Proměnné pro filter na seznamu dokladů*/
	interface GDokladyListFilterDto {
		/**ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**cis_real*/
		cis_real?: string|null;
		/**sgn_stav*/
		sgn_stav?: string|null;
		/**type_sort*/
		type_sort?: string|null;
		/**typ_platnost*/
		typ_platnost?: number|null;
		/**view*/
		view?: number|null;
		/**searchFT*/
		searchFT?: number|null;
		/**stav_evi*/
		stav_evi?: number|null;
		/**stav_rez*/
		stav_rez?: number|null;
		/**log_por_cislo*/
		log_por_cislo?: number|null;
		/**stav_rez_iissp*/
		stav_rez_iissp?: number|null;
		/**vp_typ_vyb*/
		vp_typ_vyb?: number|null;
		/**typ_ceny*/
		typ_ceny?: number|null;
		/**priz_view*/
		priz_view?: number|null;
		/**stav_pfk*/
		stav_pfk?: number|null;
		/**stav_rsp*/
		stav_rsp?: number|null;
		/**priz_opce*/
		priz_opce?: number|null;
		/**ico*/
		ico?: string|null;
		/**cis_real_edit*/
		cis_real_edit?: boolean|null;
		/**num_row*/
		num_row?: number|null;
	}
	const enum GDokladyListFilterDtoNames { ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", sgn_stav = "sgn_stav", type_sort = "type_sort", typ_platnost = "typ_platnost", view = "view", searchFT = "searchFT", stav_evi = "stav_evi", stav_rez = "stav_rez", log_por_cislo = "log_por_cislo", stav_rez_iissp = "stav_rez_iissp", vp_typ_vyb = "vp_typ_vyb", typ_ceny = "typ_ceny", priz_view = "priz_view", stav_pfk = "stav_pfk", stav_rsp = "stav_rsp", priz_opce = "priz_opce", ico = "ico", cis_real_edit = "cis_real_edit", num_row = "num_row",}
	const enum GDokladyListFilterDtoFragments { ixs_fun_ref = "*", cis_real = "*", sgn_stav = "*", type_sort = "*", typ_platnost = "*", view = "*", searchFT = "*", stav_evi = "*", stav_rez = "*", log_por_cislo = "*", stav_rez_iissp = "*", vp_typ_vyb = "*", typ_ceny = "*", priz_view = "*", stav_pfk = "*", stav_rsp = "*", priz_opce = "*", ico = "*", cis_real_edit = "*", num_row = "*",}
	const enum GDokladyListFilterDtoTypes { ixs_fun_ref = "string", cis_real = "string", sgn_stav = "string", type_sort = "string", typ_platnost = "number", view = "number", searchFT = "number", stav_evi = "number", stav_rez = "number", log_por_cislo = "number", stav_rez_iissp = "number", vp_typ_vyb = "number", typ_ceny = "number", priz_view = "number", stav_pfk = "number", stav_rsp = "number", priz_opce = "number", ico = "string", cis_real_edit = "boolean", num_row = "number",}
	const enum GDokladyListFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GEsuVerejneZakazceDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Výběr esu veřejné zakázky*/
	interface GEsuVerejneZakazceDto {
		/**DBCOLUMN:ico*/
		ico?: string|null;
		/**DBCOLUMN:dic*/
		dic?: string|null;
		/**DBCOLUMN:esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:obec*/
		obec?: string|null;
		/**DBCOLUMN:zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:rc*/
		rc?: string|null;
		/**DBCOLUMN:stupen_ver*/
		stupen_ver?: number|null;
		/**DBCOLUMN:typ_esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:naz_prj*/
		naz_prj?: number|null;
		/**typ_ag_blok_p - parametr ve fce*/
		typ_ag_blok_p?: number|null;
		/**ixp parametr ve funkci*/
		ixp_p?: string|null;
		/**ixs_pri jako parametr ve funkci*/
		ixs_pri_p?: string|null;
	}
	const enum GEsuVerejneZakazceDtoNames { ico = "ico", dic = "dic", esu_txt = "esu_txt", cs_nazev = "cs_nazev", obec = "obec", zkratka = "zkratka", ixs_esu = "ixs_esu", ixp_nab = "ixp_nab", bu_ci = "bu_ci", sk_ci = "sk_ci", rc = "rc", stupen_ver = "stupen_ver", typ_esu = "typ_esu", por_cis_nab = "por_cis_nab", naz_prj = "naz_prj", typ_ag_blok_p = "typ_ag_blok_p", ixp_p = "ixp_p", ixs_pri_p = "ixs_pri_p",}
	const enum GEsuVerejneZakazceDtoFragments { ico = "*", dic = "*", esu_txt = "*", cs_nazev = "*", obec = "*", zkratka = "*", ixs_esu = "*", ixp_nab = "*", bu_ci = "*", sk_ci = "*", rc = "*", stupen_ver = "*", typ_esu = "*", por_cis_nab = "*", naz_prj = "*", typ_ag_blok_p = "*", ixp_p = "*", ixs_pri_p = "*",}
	const enum GEsuVerejneZakazceDtoTypes { ico = "string", dic = "string", esu_txt = "string", cs_nazev = "string", obec = "string", zkratka = "string", ixs_esu = "string", ixp_nab = "string", bu_ci = "string", sk_ci = "string", rc = "string", stupen_ver = "number", typ_esu = "number", por_cis_nab = "number", naz_prj = "number", typ_ag_blok_p = "number", ixp_p = "string", ixs_pri_p = "string",}
	const enum GEsuVerejneZakazceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GGindesuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:gindesu - další podrobnosti o esu*/
	interface GGindesuDto {
		/**DBCOLUMN:gindesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:gindesu.lic*/
		lic?: string|null;
		/**DBCOLUMN:gindesu.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:gindesu.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:gindesu.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:gindesu.funkce*/
		funkce?: string|null;
		/**DBCOLUMN:gindesu.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:gindesu.tit_za*/
		tit_za?: string|null;
	}
	const enum GGindesuDtoNames { ixs_esu = "ixs_esu", lic = "lic", por_zast = "por_zast", prijmeni = "prijmeni", jmeno = "jmeno", funkce = "funkce", tit_pred = "tit_pred", tit_za = "tit_za",}
	const enum GGindesuDtoFragments { ixs_esu = "*", lic = "*", por_zast = "*", prijmeni = "*", jmeno = "*", funkce = "*", tit_pred = "*", tit_za = "*",}
	const enum GGindesuDtoTypes { ixs_esu = "string", lic = "string", por_zast = "number", prijmeni = "string", jmeno = "string", funkce = "string", tit_pred = "string", tit_za = "string",}
	const enum GGindesuDtoTypeLengths { ixs_esu = 12, lic = 4, prijmeni = 36, jmeno = 24, funkce = 50, tit_pred = 35, tit_za = 35,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GGinsdenDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ginsden - informace o knize*/
	interface GGinsdenDto {
		/**DBCOLUMN:ginsden.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:ginsden.ixs_typ_def*/
		ixs_typ_def?: string|null;
		/**DBCOLUMN:ginsden.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ginsden.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsden.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsden.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsden.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsden.ixs_kom_def*/
		ixs_kom_def?: string|null;
		/**DBCOLUMN:ginsden.cis_real_def*/
		cis_real_def?: string|null;
		/**DBCOLUMN:ginsden.ixs_orj_def*/
		ixs_orj_def?: string|null;
		/**DBCOLUMN:ginsden.ixs_fun_akt_def*/
		ixs_fun_akt_def?: string|null;
		/**DBCOLUMN:ginsden.ixs_fun_wfl_def*/
		ixs_fun_wfl_def?: string|null;
		/**DBCOLUMN:ginsden.nks_def*/
		nks_def?: string|null;
	}
	const enum GGinsdenDtoNames { ixp_den = "ixp_den", ixs_typ_def = "ixs_typ_def", typ_ag = "typ_ag", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_kom_def = "ixs_kom_def", cis_real_def = "cis_real_def", ixs_orj_def = "ixs_orj_def", ixs_fun_akt_def = "ixs_fun_akt_def", ixs_fun_wfl_def = "ixs_fun_wfl_def", nks_def = "nks_def",}
	const enum GGinsdenDtoFragments { ixp_den = "*", ixs_typ_def = "*", typ_ag = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", ixs_kom_def = "*", cis_real_def = "*", ixs_orj_def = "*", ixs_fun_akt_def = "*", ixs_fun_wfl_def = "*", nks_def = "*",}
	const enum GGinsdenDtoTypes { ixp_den = "string", ixs_typ_def = "string", typ_ag = "number", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_kom_def = "string", cis_real_def = "string", ixs_orj_def = "string", ixs_fun_akt_def = "string", ixs_fun_wfl_def = "string", nks_def = "string",}
	const enum GGinsdenDtoTypeLengths { ixp_den = 12, ixs_typ_def = 12, poznamka = 50, zmenu_prov = 12, ixs_kom_def = 12, cis_real_def = 6, ixs_orj_def = 12, ixs_fun_akt_def = 12, ixs_fun_wfl_def = 12, nks_def = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GGinsesuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ginsesu - externí subjekt*/
	interface GGinsesuDto {
		/**DBCOLUMN:ginsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsesu.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsesu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsesu.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsesu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsesu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsesu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Zkratka externího subjektu používaná při vyhledávání*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsesu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsesu.ob_jmeno*/
		ob_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.typ_esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:ginsesu.stupen_ver*/
		stupen_ver?: number|null;
		/**DBCOLUMN:ginsesu.ixs_nad*/
		ixs_nad?: string|null;
		/**Stát*/
		stat?: number|null;
		/**DBCOLUMN:ginsesu.psc*/
		psc?: string|null;
		/**DBCOLUMN:ginsesu.obec*/
		obec?: string|null;
		/**DBCOLUMN:ginsesu.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:ginsesu.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:ginsesu.cor*/
		cor?: string|null;
		/**DBCOLUMN:ginsesu.cpop*/
		cpop?: string|null;
		/**DBCOLUMN:ginsesu.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsesu.dic*/
		dic?: string|null;
		/**DBCOLUMN:ginsesu.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsesu.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsesu.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsesu.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsesu.priz_eko*/
		priz_eko?: number|null;
		/**DBCOLUMN:ginsesu.priz_int*/
		priz_int?: number|null;
		/**DBCOLUMN:ginsesu.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:ginsesu.num_zast*/
		num_zast?: number|null;
		/**DBCOLUMN:ginsesu.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsesu.cs_zkratka*/
		cs_zkratka?: string|null;
		/**DBCOLUMN:ginsesu.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:ginsesu.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsesu.cs_ulice*/
		cs_ulice?: string|null;
		/**DBCOLUMN:ginsesu.cs_obec*/
		cs_obec?: string|null;
		/**DBCOLUMN:ginsesu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:ginsesu.rc*/
		rc?: string|null;
		ixs_prev?: string|null;
		/**DBCOLUMN:ginsesu.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:ginsesu.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:ginsesu.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:ginsesu.pobox*/
		pobox?: string|null;
		/**DBCOLUMN:ginsesu.st1*/
		st1?: string|null;
		/**DBCOLUMN:ginsesu.st2*/
		st2?: string|null;
		/**DBCOLUMN:ginsesu.st3*/
		st3?: string|null;
		/**DBCOLUMN:ginsesu.st4*/
		st4?: string|null;
		/**DBCOLUMN:ginsesu.st5*/
		st5?: string|null;
		/**DBCOLUMN:ginsesu.st6*/
		st6?: string|null;
		/**DBCOLUMN:ginsesu.st7*/
		st7?: string|null;
		/**Slouží k vysledování provedených změn na externím subjektu (pokud byl opravován). Má hodnotu ixs_esu subjektu, z něhož vznikl.*/
		ixs_puv?: string|null;
		/**DBCOLUMN:ginsesu.ixs_obj*/
		ixs_obj?: string|null;
		/**DBCOLUMN:ginsesu.ixs_adr*/
		ixs_adr?: string|null;
		/**DBCOLUMN:ginsesu.ixs_org*/
		ixs_org?: string|null;
		/**DBCOLUMN:ginsesu.ixs_oso*/
		ixs_oso?: string|null;
		ixs_eko?: string|null;
		ur_pri?: number|null;
		/**DBCOLUMN:ginsesu.adresa_kod*/
		adresa_kod?: string|null;
		/**DBCOLUMN:ginsesu.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:ginsesu.st0*/
		st0?: string|null;
		/**DBCOLUMN:ginsesu.pco*/
		pco?: number|null;
		/**DBCOLUMN:ginsesu.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsesu.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ginsesu.neakt_oba_int*/
		neakt_oba_int?: number|null;
		/**Sloupec je vypočítávaný z hodnoty sloupce rc.*/
		dat_nar?: JsonDate|null;
		/**Používá prozatím modul POD v souvislosti s elektronickým podáním.*/
		bio?: JsonDecimal|null;
		/**DBCOLUMN:ginsesu.url*/
		url?: string|null;
		/**DBCOLUMN:ginsesu.typ_upadku*/
		typ_upadku?: number|null;
		/**DBCOLUMN:ginsesu.dat_akt_rob*/
		dat_akt_rob?: JsonDate|null;
		/**DBCOLUMN:ginsesu.kod_o*/
		kod_o?: number|null;
		/**DBCOLUMN:ginsesu.stat_sp*/
		stat_sp?: number|null;
		/**DBCOLUMN:ginsesu.gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:ginsesu.gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:ginsesu.priz_umrti*/
		priz_umrti?: number|null;
		/**DBCOLUMN:ginsesu.dat_umrti*/
		dat_umrti?: JsonDate|null;
		/**DBCOLUMN:ginsesu.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsesu.oc*/
		oc?: string|null;
		/**DBCOLUMN:ginsesu.pohlavi*/
		pohlavi?: number|null;
		/**DBCOLUMN:ginsesu.rod_stav*/
		rod_stav?: number|null;
		/**DBCOLUMN:ginsesu.typ_adr*/
		typ_adr?: number|null;
		/**DBCOLUMN:ginsesu.s_pruk*/
		s_pruk?: number|null;
		/**DBCOLUMN:ginsesu.rod_prijmeni*/
		rod_prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.misto_nar*/
		misto_nar?: string|null;
		/**DBCOLUMN:ginsesu.prezdivka*/
		prezdivka?: string|null;
		/**DBCOLUMN:ginsesu.ixs_esu_zam*/
		ixs_esu_zam?: string|null;
		/**DBCOLUMN:ginsesu.id_ds*/
		id_ds?: string|null;
		/**DBCOLUMN:ginsesu.id_gex*/
		id_gex?: string|null;
		/**DBCOLUMN:ginsesu.partner_uct*/
		partner_uct?: string|null;
		/**DBCOLUMN:ginsesu.mi_jmeno*/
		mi_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.mi_prijmeni*/
		mi_prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.up_nazev*/
		up_nazev?: string|null;
		/**DBCOLUMN:ginsesu.up_prijmeni*/
		up_prijmeni?: string|null;
	}
	const enum GGinsesuDtoNames { ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixs_lpc = "ixs_lpc", oc = "oc", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", s_pruk = "s_pruk", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_ds = "id_ds", id_gex = "id_gex", partner_uct = "partner_uct", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", up_nazev = "up_nazev", up_prijmeni = "up_prijmeni",}
	const enum GGinsesuDtoFragments { ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", ixs_lpc = "*", oc = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", s_pruk = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_ds = "*", id_gex = "*", partner_uct = "*", mi_jmeno = "*", mi_prijmeni = "*", up_nazev = "*", up_prijmeni = "*",}
	const enum GGinsesuDtoTypes { ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", ixs_lpc = "string", oc = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", s_pruk = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_ds = "string", id_gex = "string", partner_uct = "string", mi_jmeno = "string", mi_prijmeni = "string", up_nazev = "string", up_prijmeni = "string",}
	const enum GGinsesuDtoTypeLengths { ixs_esu = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, ob_jmeno = 254, ixs_nad = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, tel = 33, mail = 254, fax = 33, ixs_su = 12, cs_nazev = 100, cs_zkratka = 16, cs_ulice = 48, cs_obec = 48, esu_txt = 254, rc = 10, ixs_prev = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, pobox = 8, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, ixs_puv = 12, ixs_obj = 12, ixs_adr = 12, ixs_org = 12, ixs_oso = 12, ixs_eko = 12, adresa_kod = 10, st0 = 50, url = 254, gps_sirka = 12, gps_delka = 12, ixs_lpc = 12, oc = 30, rod_prijmeni = 100, misto_nar = 48, prezdivka = 254, ixs_esu_zam = 12, id_ds = 100, id_gex = 100, partner_uct = 10, mi_jmeno = 100, mi_prijmeni = 100, up_nazev = 100, up_prijmeni = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GOstatniUdajeDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Změna ostatních udajů na detailu dokladu (ouško)*/
	interface GOstatniUdajeDto {
		/**Typ pohledávky - zadána nová hodnota*/
		typ_phl_new?: string|null;
	}
	const enum GOstatniUdajeDtoNames { typ_phl_new = "typ_phl_new",}
	const enum GOstatniUdajeDtoFragments { typ_phl_new = "*",}
	const enum GOstatniUdajeDtoTypes { typ_phl_new = "string",}
	const enum GOstatniUdajeDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GPredpPohDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Předpis pohledávek*/
	interface GPredpPohDto {
		/**Pořadí*/
		poradi?: number|null;
		/**Kategorie upo jako číslo*/
		ktg_upo?: number|null;
		/**Kategorie upo jako text*/
		ktg_upo_txt?: string|null;
		/**Datum vzniku*/
		dat_vznik?: JsonDate|null;
		/**Datum splatnosti*/
		dat_splatnost?: JsonDate|null;
		/**c_mena*/
		c_mena?: JsonDate|null;
		/**c*/
		c?: JsonDate|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**cislo_sml*/
		cislo_sml?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**flag*/
		flag?: number|null;
		/**popis*/
		popis?: string|null;
	}
	const enum GPredpPohDtoNames { poradi = "poradi", ktg_upo = "ktg_upo", ktg_upo_txt = "ktg_upo_txt", dat_vznik = "dat_vznik", dat_splatnost = "dat_splatnost", c_mena = "c_mena", c = "c", rok_sml = "rok_sml", cislo_sml = "cislo_sml", aktivita = "aktivita", flag = "flag", popis = "popis",}
	const enum GPredpPohDtoFragments { poradi = "*", ktg_upo = "*", ktg_upo_txt = "*", dat_vznik = "*", dat_splatnost = "*", c_mena = "*", c = "*", rok_sml = "*", cislo_sml = "*", aktivita = "*", flag = "*", popis = "*",}
	const enum GPredpPohDtoTypes { poradi = "number", ktg_upo = "number", ktg_upo_txt = "string", dat_vznik = "JsonDate", dat_splatnost = "JsonDate", c_mena = "JsonDate", c = "JsonDate", rok_sml = "number", cislo_sml = "number", aktivita = "number", flag = "number", popis = "string",}
	const enum GPredpPohDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderCisRealDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro reader pro výběr realizátorů*/
	interface GReaderCisRealDto {
		/**DBCOLUMN:smlvavk.ixs_sml_pri -*/
		ixs_sml_pri?: string|null;
		/**DBCOLUMN:smlvavk.ixs_fun_vyriz -*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlvavk.ico - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**DBCOLUMN:smlvavk.cis_real -*/
		cis_real?: string|null;
		/**DBCOLUMN:smlvavk.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:smlvavk.dat_zmena - Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlvavk.zmenu_prov - Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Textový název realizátora*/
		nazev?: string|null;
	}
	const enum GReaderCisRealDtoNames { ixs_sml_pri = "ixs_sml_pri", ixs_fun_vyriz = "ixs_fun_vyriz", ico = "ico", cis_real = "cis_real", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev",}
	const enum GReaderCisRealDtoFragments { ixs_sml_pri = "*", ixs_fun_vyriz = "*", ico = "*", cis_real = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*",}
	const enum GReaderCisRealDtoTypes { ixs_sml_pri = "string", ixs_fun_vyriz = "string", ico = "string", cis_real = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string",}
	const enum GReaderCisRealDtoTypeLengths { ixs_sml_pri = 12, ixs_fun_vyriz = 12, ico = 10, cis_real = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderEkovabuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:ekovabu*/
	interface GReaderEkovabuDto {
		/**DBCOLUMN:ekovabu.rok - Rok deníku*/
		rok?: number|null;
		/**DBCOLUMN:ekovabu.ico - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**DBCOLUMN:ekovabu.ucs - UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**DBCOLUMN:ekovabu.uea_uc -*/
		uea_uc?: string|null;
		/**DBCOLUMN:ekovabu.ueb_uc -*/
		ueb_uc?: string|null;
		/**DBCOLUMN:ekovabu.uea - SU - Syntetický účet*/
		uea?: string|null;
		/**DBCOLUMN:ekovabu.ueb - AU - Analytický účet*/
		ueb?: string|null;
		/**DBCOLUMN:ekovabu.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovabu.dat_zmena - Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovabu.zmenu_prov - Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekovabu.typ_sa - Typ SuAu*/
		typ_sa?: number|null;
		/**DBCOLUMN:ekovabu.popis - Popis*/
		popis?: string|null;
		/**Typ SuAu textově*/
		typ_sa_txt?: string|null;
	}
	const enum GReaderEkovabuDtoNames { rok = "rok", ico = "ico", ucs = "ucs", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uea = "uea", ueb = "ueb", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_sa = "typ_sa", popis = "popis", typ_sa_txt = "typ_sa_txt",}
	const enum GReaderEkovabuDtoFragments { rok = "*", ico = "*", ucs = "*", uea_uc = "*", ueb_uc = "*", uea = "*", ueb = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_sa = "*", popis = "*", typ_sa_txt = "*",}
	const enum GReaderEkovabuDtoTypes { rok = "number", ico = "string", ucs = "string", uea_uc = "string", ueb_uc = "string", uea = "string", ueb = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_sa = "number", popis = "string", typ_sa_txt = "string",}
	const enum GReaderEkovabuDtoTypeLengths { ico = 10, ucs = 10, uea_uc = 3, ueb_uc = 4, uea = 3, ueb = 4, zmenu_prov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderMajsmajSmlDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:majsmaj*/
	interface GReaderMajsmajSmlDto {
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
	const enum GReaderMajsmajSmlDtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", vyr_cis = "vyr_cis", skp = "skp", nazev_skp = "nazev_skp", nazev = "nazev", drh_id = "drh_id", skupina_id = "skupina_id", mj = "mj", tev = "tev", tka = "tka", mat_akt = "mat_akt", mat_cis = "mat_cis", sarze = "sarze", zev = "zev",}
	const enum GReaderMajsmajSmlDtoFragments { ixs_maj = "*", inv_cis = "*", ser_cis = "*", evi_cis = "*", vyr_cis = "*", skp = "*", nazev_skp = "*", nazev = "*", drh_id = "*", skupina_id = "*", mj = "*", tev = "*", tka = "*", mat_akt = "*", mat_cis = "*", sarze = "*", zev = "*",}
	const enum GReaderMajsmajSmlDtoTypes { ixs_maj = "string", inv_cis = "string", ser_cis = "string", evi_cis = "string", vyr_cis = "string", skp = "string", nazev_skp = "string", nazev = "string", drh_id = "number", skupina_id = "number", mj = "string", tev = "number", tka = "number", mat_akt = "number", mat_cis = "string", sarze = "string", zev = "number",}
	const enum GReaderMajsmajSmlDtoTypeLengths { ixs_maj = 12, inv_cis = 50, ser_cis = 40, evi_cis = 40, vyr_cis = 40, skp = 15, nazev_skp = 254, nazev = 254, mj = 5, mat_cis = 20, sarze = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderMatskcmDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:matskcm*/
	interface GReaderMatskcmDto {
		/**DBCOLUMN:matskcm.idk - KČM*/
		idk?: string|null;
		/**DBCOLUMN:matskcm.ids - SKP*/
		ids?: string|null;
		/**DBCOLUMN:matskcm.kod_druh - Způsob sledování (tabulkový, sledovaný, ... )*/
		kod_druh?: string|null;
		/**DBCOLUMN:matskcm.mat_usk - status položky katalogu*/
		mat_usk?: string|null;
		/**DBCOLUMN:matskcm.mj - měrná jednotka*/
		mj?: string|null;
		/**DBCOLUMN:matskcm.zkratka - Zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:matskcm.status_nsn - Způsob evidence ( evidenčním číslem, sériovým, KČM, ... )*/
		status_nsn?: string|null;
		/**DBCOLUMN:matskcm.nsc -*/
		nsc?: string|null;
		/**DBCOLUMN:matskcm.ziv_cyklus -*/
		ziv_cyklus?: string|null;
		/**DBCOLUMN:matskcm.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GReaderMatskcmDtoNames { idk = "idk", ids = "ids", kod_druh = "kod_druh", mat_usk = "mat_usk", mj = "mj", zkratka = "zkratka", status_nsn = "status_nsn", nsc = "nsc", ziv_cyklus = "ziv_cyklus", aktivita = "aktivita",}
	const enum GReaderMatskcmDtoFragments { idk = "*", ids = "*", kod_druh = "*", mat_usk = "*", mj = "*", zkratka = "*", status_nsn = "*", nsc = "*", ziv_cyklus = "*", aktivita = "*",}
	const enum GReaderMatskcmDtoTypes { idk = "string", ids = "string", kod_druh = "string", mat_usk = "string", mj = "string", zkratka = "string", status_nsn = "string", nsc = "string", ziv_cyklus = "string", aktivita = "number",}
	const enum GReaderMatskcmDtoTypeLengths { idk = 13, ids = 8, kod_druh = 1, mat_usk = 6, mj = 5, zkratka = 24, status_nsn = 1, nsc = 4, ziv_cyklus = 2,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderMatsmajDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:matsmaj*/
	interface GReaderMatsmajDto {
		/**DBCOLUMN:matsmaj.ixs_maj -*/
		ixs_maj?: string|null;
		/**DBCOLUMN:matsmaj.nazev - název*/
		nazev?: string|null;
		/**DBCOLUMN:matsmaj.inv_cis - inventární číslo*/
		inv_cis?: string|null;
		/**DBCOLUMN:matsmaj.vyr_cis - výrobní číslo*/
		vyr_cis?: string|null;
		/**DBCOLUMN:matsmaj.idk - katalog*/
		idk?: string|null;
		/**DBCOLUMN:matsmaj.idk_kat -*/
		idk_kat?: string|null;
		/**DBCOLUMN:matsmaj.ueab_evi - SU/AU evidence*/
		ueab_evi?: string|null;
		/**DBCOLUMN:matsmaj.cmj - cena za mernou jednotku*/
		cmj?: JsonDecimal|null;
		/**DBCOLUMN:matsmaj.pmj - počet měrných jednotek*/
		pmj?: JsonDecimal|null;
		/**DBCOLUMN:matsmaj.c - Pořizovací cena = vstupní cena*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:matsmaj.ico - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**DBCOLUMN:matsmaj.ucs - UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**DBCOLUMN:matsmaj.nks - NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**DBCOLUMN:matsmaj.drh_id - Druh majetku*/
		drh_id?: number|null;
		/**DBCOLUMN:matsmaj.skupina_id - Skupina majetku*/
		skupina_id?: number|null;
		/**DBCOLUMN:matsmaj.tev - Typ evidence  (účetní,operativní,...)*/
		tev?: number|null;
		/**DBCOLUMN:matsmaj.tka - Typ karty ( samostatná, souprava, obsah,.. )*/
		tka?: number|null;
		/**DBCOLUMN:matsmaj.mat_akt - Aktivita majetku*/
		mat_akt?: number|null;
		/**DBCOLUMN:matsmaj.mj - měrná jednotka*/
		mj?: string|null;
		/**DBCOLUMN:matsmaj.dev -*/
		dev?: number|null;
		/**DBCOLUMN:matsmaj.uus - UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
	}
	const enum GReaderMatsmajDtoNames { ixs_maj = "ixs_maj", nazev = "nazev", inv_cis = "inv_cis", vyr_cis = "vyr_cis", idk = "idk", idk_kat = "idk_kat", ueab_evi = "ueab_evi", cmj = "cmj", pmj = "pmj", c = "c", ico = "ico", ucs = "ucs", nks = "nks", drh_id = "drh_id", skupina_id = "skupina_id", tev = "tev", tka = "tka", mat_akt = "mat_akt", mj = "mj", dev = "dev", uus = "uus",}
	const enum GReaderMatsmajDtoFragments { ixs_maj = "*", nazev = "*", inv_cis = "*", vyr_cis = "*", idk = "*", idk_kat = "*", ueab_evi = "*", cmj = "*", pmj = "*", c = "*", ico = "*", ucs = "*", nks = "*", drh_id = "*", skupina_id = "*", tev = "*", tka = "*", mat_akt = "*", mj = "*", dev = "*", uus = "*",}
	const enum GReaderMatsmajDtoTypes { ixs_maj = "string", nazev = "string", inv_cis = "string", vyr_cis = "string", idk = "string", idk_kat = "string", ueab_evi = "string", cmj = "JsonDecimal", pmj = "JsonDecimal", c = "JsonDecimal", ico = "string", ucs = "string", nks = "string", drh_id = "number", skupina_id = "number", tev = "number", tka = "number", mat_akt = "number", mj = "string", dev = "number", uus = "string",}
	const enum GReaderMatsmajDtoTypeLengths { ixs_maj = 12, nazev = 50, inv_cis = 12, vyr_cis = 20, idk = 13, idk_kat = 13, ueab_evi = 7, ico = 10, ucs = 10, nks = 12, mj = 5, uus = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderSmlKalIxsEsuSmlDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Externí subjekt v platebním kalendáři - pro reader*/
	interface GReaderSmlKalIxsEsuSmlDto {
		/**Název esu*/
		esu_txt?: string|null;
		/**ičo*/
		ico?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**identifikátor esu*/
		ixs_esu?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**Identifikátor ke komu je přiřazen esu (asi)*/
		ixp_sml_pri?: string|null;
	}
	const enum GReaderSmlKalIxsEsuSmlDtoNames { esu_txt = "esu_txt", ico = "ico", ixp = "ixp", ixs_esu = "ixs_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", ixp_sml_pri = "ixp_sml_pri",}
	const enum GReaderSmlKalIxsEsuSmlDtoFragments { esu_txt = "*", ico = "*", ixp = "*", ixs_esu = "*", sk_ci = "*", bu_ci = "*", ixp_sml_pri = "*",}
	const enum GReaderSmlKalIxsEsuSmlDtoTypes { esu_txt = "string", ico = "string", ixp = "string", ixs_esu = "string", sk_ci = "string", bu_ci = "string", ixp_sml_pri = "string",}
	const enum GReaderSmlKalIxsEsuSmlDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderSmlVlastnikDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro reader sml Vlastník*/
	interface GReaderSmlVlastnikDto {
		/**DBCOLUMN:ginsfun.ixs_fun - Funkční místo*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginsfun.nazev_rf - Osoba, funkce*/
		nazev_rf?: string|null;
		/**DBCOLUMN:ginsref.cs_nazev - CS název*/
		cs_nazev?: string|null;
		/**DBCOLUMN:smlvrfu.ixp_den - Identifikátor knihy*/
		ixp_den?: string|null;
	}
	const enum GReaderSmlVlastnikDtoNames { ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", cs_nazev = "cs_nazev", ixp_den = "ixp_den",}
	const enum GReaderSmlVlastnikDtoFragments { ixs_fun = "*", nazev_rf = "*", cs_nazev = "*", ixp_den = "*",}
	const enum GReaderSmlVlastnikDtoTypes { ixs_fun = "string", nazev_rf = "string", cs_nazev = "string", ixp_den = "string",}
	const enum GReaderSmlVlastnikDtoTypeLengths { ixs_fun = 12, nazev_rf = 200, cs_nazev = 200, ixp_den = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderVepssmoDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:vepssmo*/
	interface GReaderVepssmoDto {
		/**DBCOLUMN:vepssmo.ixp_smo -*/
		ixp_smo?: string|null;
		/**DBCOLUMN:vepssmo.cis_smo -*/
		cis_smo?: number|null;
		/**DBCOLUMN:vepssmo.m_sml -*/
		m_sml?: JsonDecimal|null;
		/**DBCOLUMN:vepssmo.m_obj_sml -*/
		m_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:vepssmo.m_maj -*/
		m_maj?: JsonDecimal|null;
		/**DBCOLUMN:vepssmo.c_sml -*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:vepssmo.c_obj_sml -*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:vepssmo.c_maj -*/
		c_maj?: JsonDecimal|null;
		/**DBCOLUMN:vepssmo.nazev - Název defnovaný uživatelem*/
		nazev?: string|null;
		/**DBCOLUMN:vepssmo.popis - Popis*/
		popis?: string|null;
		/**DBCOLUMN:vepssmo.ixp_sml_pri -*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:vepssmo.c_sml_mena_z -*/
		c_sml_mena_z?: JsonDecimal|null;
		/**cis_smo_sml*/
		cis_smo_sml?: number|null;
		/**mena_zkr*/
		mena_zkr?: string|null;
		/**nazev_typ*/
		nazev_typ?: string|null;
		/**vp_stav*/
		vp_stav?: number|null;
	}
	const enum GReaderVepssmoDtoNames { ixp_smo = "ixp_smo", cis_smo = "cis_smo", m_sml = "m_sml", m_obj_sml = "m_obj_sml", m_maj = "m_maj", c_sml = "c_sml", c_obj_sml = "c_obj_sml", c_maj = "c_maj", nazev = "nazev", popis = "popis", ixp_sml_pri = "ixp_sml_pri", c_sml_mena_z = "c_sml_mena_z", cis_smo_sml = "cis_smo_sml", mena_zkr = "mena_zkr", nazev_typ = "nazev_typ", vp_stav = "vp_stav",}
	const enum GReaderVepssmoDtoFragments { ixp_smo = "*", cis_smo = "*", m_sml = "*", m_obj_sml = "*", m_maj = "*", c_sml = "*", c_obj_sml = "*", c_maj = "*", nazev = "*", popis = "*", ixp_sml_pri = "*", c_sml_mena_z = "*", cis_smo_sml = "*", mena_zkr = "*", nazev_typ = "*", vp_stav = "*",}
	const enum GReaderVepssmoDtoTypes { ixp_smo = "string", cis_smo = "number", m_sml = "JsonDecimal", m_obj_sml = "JsonDecimal", m_maj = "JsonDecimal", c_sml = "JsonDecimal", c_obj_sml = "JsonDecimal", c_maj = "JsonDecimal", nazev = "string", popis = "string", ixp_sml_pri = "string", c_sml_mena_z = "JsonDecimal", cis_smo_sml = "number", mena_zkr = "string", nazev_typ = "string", vp_stav = "number",}
	const enum GReaderVepssmoDtoTypeLengths { ixp_smo = 12, nazev = 254, popis = 1000, ixp_sml_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderVyberPolozkyDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr cílového dokladu a položky FP*/
	interface GReaderVyberPolozkyDto {
		/**DBCOLUMN:smlspid.ixp - Identifikátor dokumentu*/
		ixp?: string|null;
		/**DBCOLUMN:smldpol.rok - Rok deníku*/
		rok?: number|null;
		/**DBCOLUMN:smldpol.cislo - Číslo položky*/
		cislo?: number|null;
		/**DBCOLUMN:smlspid.ac - Evidenční číslo dokladu*/
		ac?: string|null;
		/**DBCOLUMN:smlspid.ac_sml - Agendové číslo*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlspid.popis - Popis*/
		popis?: string|null;
		/**DBCOLUMN:smldrok.c - Cena*/
		c_rok?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.c - Částka financování*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smldpol.cis_pol_pla - Číslo položky plánu/Akce*/
		cis_pol_pla?: string|null;
		/**DBCOLUMN:smldpol.ixs_fun - Funkce kompetenta*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smldpol.ico - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**DBCOLUMN:smldpol.ucs - UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**DBCOLUMN:smldpol.nks - NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**DBCOLUMN:smldpol.uea - SU - Syntetický účet vlastního BÚ*/
		uea?: string|null;
		/**DBCOLUMN:smldpol.ueb - AU - Analytický účet vlastního BÚ*/
		ueb?: string|null;
		/**DBCOLUMN:smldpol.uec - ZDR - Zdroj*/
		uec?: string|null;
		/**DBCOLUMN:smldpol.ued - ODPA - Paragraf*/
		ued?: string|null;
		/**DBCOLUMN:smldpol.uee - POL - Položka*/
		uee?: string|null;
		/**DBCOLUMN:smldpol.uef - ZJ - Záznamová jednotka*/
		uef?: string|null;
		/**DBCOLUMN:smldpol.ueg - UZ - Účelový znak*/
		ueg?: string|null;
		/**DBCOLUMN:smldpol.ueh - POPA - Podpararagraf*/
		ueh?: string|null;
		/**DBCOLUMN:smldpol.uei - FIN - Financování*/
		uei?: string|null;
		/**DBCOLUMN:smldpol.uej - PRJ - Projekt*/
		uej?: string|null;
		/**DBCOLUMN:smldpol.te0 - ORJ - ORJ*/
		te0?: string|null;
		/**DBCOLUMN:smldpol.te1 - ORG - ORG*/
		te1?: string|null;
		/**DBCOLUMN:smldpol.te2 - COR - Cílově orientované rozpočtování*/
		te2?: string|null;
		/**DBCOLUMN:smldpol.te3 - KZ - Konsolidační záznam*/
		te3?: string|null;
		/**DBCOLUMN:smldpol.te4 - UKO - Úkol*/
		te4?: string|null;
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**DBCOLUMN:smldpol.drd - Druh dokladu*/
		drd?: number|null;
		/**DBCOLUMN:smldpol.ixp_sml - Identifikátor případu nadřazené položky financování*/
		ixp_sml?: string|null;
		/**DBCOLUMN:smldpol.rok_sml - Rok financování případu nadřazené položky financování*/
		rok_sml?: number|null;
		/**DBCOLUMN:smldpol.cislo_sml - Číslo položky případu nadřazené položky financování*/
		cislo_sml?: number|null;
		/**DBCOLUMN:smldpol.uea_rr - Su Rozpočtového reprezentanta*/
		uea_rr?: string|null;
		/**DBCOLUMN:smldpol.ueb_rr - Au Rozpočtového reprezentanta*/
		ueb_rr?: string|null;
		/**DBCOLUMN:smldpol.ixs_pri - Identifikátor případu BLK*/
		ixs_pri?: string|null;
		/**DBCOLUMN:smldpol.por_cis - Nevyužito*/
		por_cis?: number|null;
		/**DBCOLUMN:smldpol.priz_zaz - Příznak záznamu*/
		priz_zaz?: number|null;
		/**DBCOLUMN:smlspid.cis_real - Realizátor*/
		cis_real?: string|null;
	}
	const enum GReaderVyberPolozkyDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", ac = "ac", ac_sml = "ac_sml", popis = "popis", c_rok = "c_rok", c = "c", cis_pol_pla = "cis_pol_pla", ixs_fun_vyriz = "ixs_fun_vyriz", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", priz_zaz = "priz_zaz", cis_real = "cis_real",}
	const enum GReaderVyberPolozkyDtoFragments { ixp = "*", rok = "*", cislo = "*", ac = "*", ac_sml = "*", popis = "*", c_rok = "*", c = "*", cis_pol_pla = "*", ixs_fun_vyriz = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", priz_zaz = "*", cis_real = "*",}
	const enum GReaderVyberPolozkyDtoTypes { ixp = "string", rok = "number", cislo = "number", ac = "string", ac_sml = "string", popis = "string", c_rok = "JsonDecimal", c = "JsonDecimal", cis_pol_pla = "string", ixs_fun_vyriz = "string", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", priz_zaz = "number", cis_real = "string",}
	const enum GReaderVyberPolozkyDtoTypeLengths { ixp = 12, ac = 30, ac_sml = 30, popis = 254, cis_pol_pla = 16, ixs_fun_vyriz = 12, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, cis_real = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GReaderVyberUkazateleDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto povolené ukazatele pro funkci*/
	interface GReaderVyberUkazateleDto {
		/**DBCOLUMN:ekovfuk.ixs_uka - Identifikátor ukazatele*/
		ixs_uka?: string|null;
		/**DBCOLUMN:ekovfuk.ixs_fun - Funkční místo*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ekovfuk.stup_opr -*/
		stup_opr?: number|null;
		/**DBCOLUMN:ekovfuk.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovfuk.dat_zmena - Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovfuk.zmenu_prov - Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název ukazatele*/
		nazev?: string|null;
	}
	const enum GReaderVyberUkazateleDtoNames { ixs_uka = "ixs_uka", ixs_fun = "ixs_fun", stup_opr = "stup_opr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev",}
	const enum GReaderVyberUkazateleDtoFragments { ixs_uka = "*", ixs_fun = "*", stup_opr = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*",}
	const enum GReaderVyberUkazateleDtoTypes { ixs_uka = "string", ixs_fun = "string", stup_opr = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string",}
	const enum GReaderVyberUkazateleDtoTypeLengths { ixs_uka = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GRozaaatDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:rozaaat - výběr čísla položky plánu u položek FP*/
	interface GRozaaatDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		xuete?: string|null;
		drd?: number|null;
		mesic?: number|null;
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		kc0?: JsonDecimal|null;
		kc1?: JsonDecimal|null;
		sm0?: JsonDecimal|null;
		sm1?: JsonDecimal|null;
		km0?: JsonDecimal|null;
		km1?: JsonDecimal|null;
		mj?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		c0_23?: JsonDecimal|null;
		c1_23?: JsonDecimal|null;
		c0_13?: JsonDecimal|null;
		c1_13?: JsonDecimal|null;
		c0_14?: JsonDecimal|null;
		c1_14?: JsonDecimal|null;
		c0_24?: JsonDecimal|null;
		c1_24?: JsonDecimal|null;
		c0_25?: JsonDecimal|null;
		c1_25?: JsonDecimal|null;
		c0_26?: JsonDecimal|null;
		c1_26?: JsonDecimal|null;
		c0_30?: JsonDecimal|null;
		c1_30?: JsonDecimal|null;
		c0_31?: JsonDecimal|null;
		c1_31?: JsonDecimal|null;
		c0_0?: JsonDecimal|null;
		c1_0?: JsonDecimal|null;
		c0_2?: JsonDecimal|null;
		c1_2?: JsonDecimal|null;
		c0_3?: JsonDecimal|null;
		c1_3?: JsonDecimal|null;
		c0_6?: JsonDecimal|null;
		c1_6?: JsonDecimal|null;
		c0_7?: JsonDecimal|null;
		c1_7?: JsonDecimal|null;
		c0_8?: JsonDecimal|null;
		c1_8?: JsonDecimal|null;
		c0_10?: JsonDecimal|null;
		c1_10?: JsonDecimal|null;
		c0_11?: JsonDecimal|null;
		c1_11?: JsonDecimal|null;
		c0_12?: JsonDecimal|null;
		c1_12?: JsonDecimal|null;
		c0_15?: JsonDecimal|null;
		c1_15?: JsonDecimal|null;
		c0_16?: JsonDecimal|null;
		c1_16?: JsonDecimal|null;
		c0_17?: JsonDecimal|null;
		c1_17?: JsonDecimal|null;
		c0_18?: JsonDecimal|null;
		c1_18?: JsonDecimal|null;
		c0_22?: JsonDecimal|null;
		c1_22?: JsonDecimal|null;
		ca_0?: JsonDecimal|null;
		cb_0?: JsonDecimal|null;
		ca_6?: JsonDecimal|null;
		cb_6?: JsonDecimal|null;
		ca_18?: JsonDecimal|null;
		cb_18?: JsonDecimal|null;
		priz_char?: number|null;
		druh_char?: number|null;
		c0_21?: JsonDecimal|null;
		c1_21?: JsonDecimal|null;
		c0_34?: JsonDecimal|null;
		c1_34?: JsonDecimal|null;
		c0_54?: JsonDecimal|null;
		c1_54?: JsonDecimal|null;
		c0_66?: JsonDecimal|null;
		c1_66?: JsonDecimal|null;
		c0_62?: JsonDecimal|null;
		c1_62?: JsonDecimal|null;
		c0_63?: JsonDecimal|null;
		c1_63?: JsonDecimal|null;
		c0_67?: JsonDecimal|null;
		c1_67?: JsonDecimal|null;
		c0_68?: JsonDecimal|null;
		c1_68?: JsonDecimal|null;
		/**kompetent ze zakázky?*/
		ixs_fun?: string|null;
		/**Název zakázky?*/
		nazev?: string|null;
		/**ixp_sml*/
		ixp_sml?: string|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**cislo_sml*/
		cislo_sml?: number|null;
		/**kc0_0_1_*/
		kc0_0_1_?: JsonDecimal|null;
		/**c0__10_*/
		c0__10_?: JsonDecimal|null;
		/**c0__6_*/
		c0__6_?: JsonDecimal|null;
		/**c0__18_*/
		c0__18_?: JsonDecimal|null;
		/**c0__12_*/
		c0__12_?: JsonDecimal|null;
		/**c0__11_*/
		c0__11_?: JsonDecimal|null;
		/**c0__15_*/
		c0__15_?: JsonDecimal|null;
		/**c0__16_*/
		c0__16_?: JsonDecimal|null;
		/**c0__17_*/
		c0__17_?: JsonDecimal|null;
		/**c0__0_*/
		c0__0_?: JsonDecimal|null;
		/**kc1_0_1_*/
		kc1_0_1_?: JsonDecimal|null;
		/**c1__10_*/
		c1__10_?: JsonDecimal|null;
		/**c1__6_ (přejmenováno kvůli readeru GRozaaat)*/
		c1__6_00?: JsonDecimal|null;
		/**c1__18_*/
		c1__18_?: JsonDecimal|null;
		/**c1__12_*/
		c1__12_?: JsonDecimal|null;
		/**c1__11_*/
		c1__11_?: JsonDecimal|null;
		/**c1__15_*/
		c1__15_?: JsonDecimal|null;
		/**c1__16_*/
		c1__16_?: JsonDecimal|null;
		/**c1__17_*/
		c1__17_?: JsonDecimal|null;
		/**c1__0_*/
		c1__0_?: JsonDecimal|null;
		/**c0__rozpep_*/
		c0__rozpep_?: JsonDecimal|null;
		/**c1__rozpep_*/
		c1__rozpep_?: JsonDecimal|null;
		/**nazev_rozpep*/
		nazev_rozpep?: string|null;
		/**Počet použítí řádku/záznamu v dokladu*/
		count_doc?: JsonDecimal|null;
		/**Počet použítí řádku/záznamu v případu - v případě dodatku*/
		count_pri?: number|null;
		/**Uea reprezentanta*/
		uea_rr?: string|null;
		/**Ueb reprezentanta*/
		ueb_rr?: string|null;
		/**cislo*/
		cislo?: string|null;
		/**ixs_pla*/
		ixs_pla?: string|null;
		/**c_*/
		c_?: JsonDecimal|null;
		/**c_12*/
		c_12?: JsonDecimal|null;
		/**c_12_*/
		c_12_?: JsonDecimal|null;
		/**c_11*/
		c_11?: JsonDecimal|null;
		/**c_11_*/
		c_11_?: JsonDecimal|null;
		/**c_10*/
		c_10?: JsonDecimal|null;
		/**c_10_ (přejmenováno kvůli readeru GRozaaat)*/
		c_10_0?: JsonDecimal|null;
		/**c_15*/
		c_15?: JsonDecimal|null;
		/**c_15_*/
		c_15_?: JsonDecimal|null;
		/**c_16*/
		c_16?: JsonDecimal|null;
		/**c_16_ (přejmenováno kvůli readeru GRozaaat)*/
		c_16_0?: JsonDecimal|null;
		/**c_17*/
		c_17?: JsonDecimal|null;
		/**c_17_*/
		c_17_?: JsonDecimal|null;
		/**c_6*/
		c_6?: JsonDecimal|null;
		/**c_6_ (přejmenováno kvůli readeru GRozaaat)*/
		c_6_0?: JsonDecimal|null;
		/**c_18*/
		c_18?: JsonDecimal|null;
		/**c_18_*/
		c_18_?: JsonDecimal|null;
		/**c_0*/
		c_0?: JsonDecimal|null;
		/**c_0_*/
		c_0_?: JsonDecimal|null;
		/**c_sml_roz_disp*/
		c_sml_roz_disp?: JsonDecimal|null;
		/**c_sml_blk_disp*/
		c_sml_blk_disp?: JsonDecimal|null;
		/**c_obj_sml_disp*/
		c_obj_sml_disp?: JsonDecimal|null;
		/**c_rez_sml_disp*/
		c_rez_sml_disp?: JsonDecimal|null;
		/**kc0_1*/
		kc0_1?: JsonDecimal|null;
		/**kc0_1_ (přejmenováno kvůli readeru GRozaaat)*/
		kc0_1_0?: JsonDecimal|null;
		/**priz_zaz*/
		priz_zaz?: number|null;
		/**Výsledné uea_uc*/
		uea_uc?: string|null;
		/**Výsledné uea_uc*/
		ueb_uc?: string|null;
		/**Příznak zda jde o plánovanou či neplánovanou akci*/
		is_plan?: boolean|null;
		/**Identifikátor dokladu*/
		ixp?: string|null;
		/**Identifikátor rozpočtového opatření z filtr panelu*/
		ixp_rozpep?: string|null;
		/**Pomocné proměnné pro práci*/
		pom?: Gordic.Sml.Interface.GRozaaatPomocneDto|null;
		/**Typ navázání akce záznamu*/
		navazanost?: Gordic.Sml.Interface.NavazanostAkce|null;
	}
	const enum GRozaaatDtoNames { ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", xuete = "xuete", drd = "drd", mesic = "mesic", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", kc0 = "kc0", kc1 = "kc1", sm0 = "sm0", sm1 = "sm1", km0 = "km0", km1 = "km1", mj = "mj", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_23 = "c0_23", c1_23 = "c1_23", c0_13 = "c0_13", c1_13 = "c1_13", c0_14 = "c0_14", c1_14 = "c1_14", c0_24 = "c0_24", c1_24 = "c1_24", c0_25 = "c0_25", c1_25 = "c1_25", c0_26 = "c0_26", c1_26 = "c1_26", c0_30 = "c0_30", c1_30 = "c1_30", c0_31 = "c0_31", c1_31 = "c1_31", c0_0 = "c0_0", c1_0 = "c1_0", c0_2 = "c0_2", c1_2 = "c1_2", c0_3 = "c0_3", c1_3 = "c1_3", c0_6 = "c0_6", c1_6 = "c1_6", c0_7 = "c0_7", c1_7 = "c1_7", c0_8 = "c0_8", c1_8 = "c1_8", c0_10 = "c0_10", c1_10 = "c1_10", c0_11 = "c0_11", c1_11 = "c1_11", c0_12 = "c0_12", c1_12 = "c1_12", c0_15 = "c0_15", c1_15 = "c1_15", c0_16 = "c0_16", c1_16 = "c1_16", c0_17 = "c0_17", c1_17 = "c1_17", c0_18 = "c0_18", c1_18 = "c1_18", c0_22 = "c0_22", c1_22 = "c1_22", ca_0 = "ca_0", cb_0 = "cb_0", ca_6 = "ca_6", cb_6 = "cb_6", ca_18 = "ca_18", cb_18 = "cb_18", priz_char = "priz_char", druh_char = "druh_char", c0_21 = "c0_21", c1_21 = "c1_21", c0_34 = "c0_34", c1_34 = "c1_34", c0_54 = "c0_54", c1_54 = "c1_54", c0_66 = "c0_66", c1_66 = "c1_66", c0_62 = "c0_62", c1_62 = "c1_62", c0_63 = "c0_63", c1_63 = "c1_63", c0_67 = "c0_67", c1_67 = "c1_67", c0_68 = "c0_68", c1_68 = "c1_68", ixs_fun = "ixs_fun", nazev = "nazev", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", kc0_0_1_ = "kc0_0_1_", c0__10_ = "c0__10_", c0__6_ = "c0__6_", c0__18_ = "c0__18_", c0__12_ = "c0__12_", c0__11_ = "c0__11_", c0__15_ = "c0__15_", c0__16_ = "c0__16_", c0__17_ = "c0__17_", c0__0_ = "c0__0_", kc1_0_1_ = "kc1_0_1_", c1__10_ = "c1__10_", c1__6_00 = "c1__6_00", c1__18_ = "c1__18_", c1__12_ = "c1__12_", c1__11_ = "c1__11_", c1__15_ = "c1__15_", c1__16_ = "c1__16_", c1__17_ = "c1__17_", c1__0_ = "c1__0_", c0__rozpep_ = "c0__rozpep_", c1__rozpep_ = "c1__rozpep_", nazev_rozpep = "nazev_rozpep", count_doc = "count_doc", count_pri = "count_pri", uea_rr = "uea_rr", ueb_rr = "ueb_rr", cislo = "cislo", ixs_pla = "ixs_pla", c_ = "c_", c_12 = "c_12", c_12_ = "c_12_", c_11 = "c_11", c_11_ = "c_11_", c_10 = "c_10", c_10_0 = "c_10_0", c_15 = "c_15", c_15_ = "c_15_", c_16 = "c_16", c_16_0 = "c_16_0", c_17 = "c_17", c_17_ = "c_17_", c_6 = "c_6", c_6_0 = "c_6_0", c_18 = "c_18", c_18_ = "c_18_", c_0 = "c_0", c_0_ = "c_0_", c_sml_roz_disp = "c_sml_roz_disp", c_sml_blk_disp = "c_sml_blk_disp", c_obj_sml_disp = "c_obj_sml_disp", c_rez_sml_disp = "c_rez_sml_disp", kc0_1 = "kc0_1", kc0_1_0 = "kc0_1_0", priz_zaz = "priz_zaz", uea_uc = "uea_uc", ueb_uc = "ueb_uc", is_plan = "is_plan", ixp = "ixp", ixp_rozpep = "ixp_rozpep", pom = "pom", navazanost = "navazanost",}
	const enum GRozaaatDtoFragments { ico = "*", ucs = "*", nks = "*", rok = "*", xuete = "*", drd = "*", mesic = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", kc0 = "*", kc1 = "*", sm0 = "*", sm1 = "*", km0 = "*", km1 = "*", mj = "*", dat_zmena = "*", zmenu_prov = "*", c0_23 = "*", c1_23 = "*", c0_13 = "*", c1_13 = "*", c0_14 = "*", c1_14 = "*", c0_24 = "*", c1_24 = "*", c0_25 = "*", c1_25 = "*", c0_26 = "*", c1_26 = "*", c0_30 = "*", c1_30 = "*", c0_31 = "*", c1_31 = "*", c0_0 = "*", c1_0 = "*", c0_2 = "*", c1_2 = "*", c0_3 = "*", c1_3 = "*", c0_6 = "*", c1_6 = "*", c0_7 = "*", c1_7 = "*", c0_8 = "*", c1_8 = "*", c0_10 = "*", c1_10 = "*", c0_11 = "*", c1_11 = "*", c0_12 = "*", c1_12 = "*", c0_15 = "*", c1_15 = "*", c0_16 = "*", c1_16 = "*", c0_17 = "*", c1_17 = "*", c0_18 = "*", c1_18 = "*", c0_22 = "*", c1_22 = "*", ca_0 = "*", cb_0 = "*", ca_6 = "*", cb_6 = "*", ca_18 = "*", cb_18 = "*", priz_char = "*", druh_char = "*", c0_21 = "*", c1_21 = "*", c0_34 = "*", c1_34 = "*", c0_54 = "*", c1_54 = "*", c0_66 = "*", c1_66 = "*", c0_62 = "*", c1_62 = "*", c0_63 = "*", c1_63 = "*", c0_67 = "*", c1_67 = "*", c0_68 = "*", c1_68 = "*", ixs_fun = "*", nazev = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", kc0_0_1_ = "*", c0__10_ = "*", c0__6_ = "*", c0__18_ = "*", c0__12_ = "*", c0__11_ = "*", c0__15_ = "*", c0__16_ = "*", c0__17_ = "*", c0__0_ = "*", kc1_0_1_ = "*", c1__10_ = "*", c1__6_00 = "*", c1__18_ = "*", c1__12_ = "*", c1__11_ = "*", c1__15_ = "*", c1__16_ = "*", c1__17_ = "*", c1__0_ = "*", c0__rozpep_ = "*", c1__rozpep_ = "*", nazev_rozpep = "*", count_doc = "*", count_pri = "*", uea_rr = "*", ueb_rr = "*", cislo = "*", ixs_pla = "*", c_ = "*", c_12 = "*", c_12_ = "*", c_11 = "*", c_11_ = "*", c_10 = "*", c_10_0 = "*", c_15 = "*", c_15_ = "*", c_16 = "*", c_16_0 = "*", c_17 = "*", c_17_ = "*", c_6 = "*", c_6_0 = "*", c_18 = "*", c_18_ = "*", c_0 = "*", c_0_ = "*", c_sml_roz_disp = "*", c_sml_blk_disp = "*", c_obj_sml_disp = "*", c_rez_sml_disp = "*", kc0_1 = "*", kc0_1_0 = "*", priz_zaz = "*", uea_uc = "*", ueb_uc = "*", is_plan = "*", ixp = "*", ixp_rozpep = "*", pom = "*", navazanost = "*",}
	const enum GRozaaatDtoTypes { ico = "string", ucs = "string", nks = "string", rok = "number", xuete = "string", drd = "number", mesic = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", kc0 = "JsonDecimal", kc1 = "JsonDecimal", sm0 = "JsonDecimal", sm1 = "JsonDecimal", km0 = "JsonDecimal", km1 = "JsonDecimal", mj = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c0_23 = "JsonDecimal", c1_23 = "JsonDecimal", c0_13 = "JsonDecimal", c1_13 = "JsonDecimal", c0_14 = "JsonDecimal", c1_14 = "JsonDecimal", c0_24 = "JsonDecimal", c1_24 = "JsonDecimal", c0_25 = "JsonDecimal", c1_25 = "JsonDecimal", c0_26 = "JsonDecimal", c1_26 = "JsonDecimal", c0_30 = "JsonDecimal", c1_30 = "JsonDecimal", c0_31 = "JsonDecimal", c1_31 = "JsonDecimal", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c0_2 = "JsonDecimal", c1_2 = "JsonDecimal", c0_3 = "JsonDecimal", c1_3 = "JsonDecimal", c0_6 = "JsonDecimal", c1_6 = "JsonDecimal", c0_7 = "JsonDecimal", c1_7 = "JsonDecimal", c0_8 = "JsonDecimal", c1_8 = "JsonDecimal", c0_10 = "JsonDecimal", c1_10 = "JsonDecimal", c0_11 = "JsonDecimal", c1_11 = "JsonDecimal", c0_12 = "JsonDecimal", c1_12 = "JsonDecimal", c0_15 = "JsonDecimal", c1_15 = "JsonDecimal", c0_16 = "JsonDecimal", c1_16 = "JsonDecimal", c0_17 = "JsonDecimal", c1_17 = "JsonDecimal", c0_18 = "JsonDecimal", c1_18 = "JsonDecimal", c0_22 = "JsonDecimal", c1_22 = "JsonDecimal", ca_0 = "JsonDecimal", cb_0 = "JsonDecimal", ca_6 = "JsonDecimal", cb_6 = "JsonDecimal", ca_18 = "JsonDecimal", cb_18 = "JsonDecimal", priz_char = "number", druh_char = "number", c0_21 = "JsonDecimal", c1_21 = "JsonDecimal", c0_34 = "JsonDecimal", c1_34 = "JsonDecimal", c0_54 = "JsonDecimal", c1_54 = "JsonDecimal", c0_66 = "JsonDecimal", c1_66 = "JsonDecimal", c0_62 = "JsonDecimal", c1_62 = "JsonDecimal", c0_63 = "JsonDecimal", c1_63 = "JsonDecimal", c0_67 = "JsonDecimal", c1_67 = "JsonDecimal", c0_68 = "JsonDecimal", c1_68 = "JsonDecimal", ixs_fun = "string", nazev = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", kc0_0_1_ = "JsonDecimal", c0__10_ = "JsonDecimal", c0__6_ = "JsonDecimal", c0__18_ = "JsonDecimal", c0__12_ = "JsonDecimal", c0__11_ = "JsonDecimal", c0__15_ = "JsonDecimal", c0__16_ = "JsonDecimal", c0__17_ = "JsonDecimal", c0__0_ = "JsonDecimal", kc1_0_1_ = "JsonDecimal", c1__10_ = "JsonDecimal", c1__6_00 = "JsonDecimal", c1__18_ = "JsonDecimal", c1__12_ = "JsonDecimal", c1__11_ = "JsonDecimal", c1__15_ = "JsonDecimal", c1__16_ = "JsonDecimal", c1__17_ = "JsonDecimal", c1__0_ = "JsonDecimal", c0__rozpep_ = "JsonDecimal", c1__rozpep_ = "JsonDecimal", nazev_rozpep = "string", count_doc = "JsonDecimal", count_pri = "number", uea_rr = "string", ueb_rr = "string", cislo = "string", ixs_pla = "string", c_ = "JsonDecimal", c_12 = "JsonDecimal", c_12_ = "JsonDecimal", c_11 = "JsonDecimal", c_11_ = "JsonDecimal", c_10 = "JsonDecimal", c_10_0 = "JsonDecimal", c_15 = "JsonDecimal", c_15_ = "JsonDecimal", c_16 = "JsonDecimal", c_16_0 = "JsonDecimal", c_17 = "JsonDecimal", c_17_ = "JsonDecimal", c_6 = "JsonDecimal", c_6_0 = "JsonDecimal", c_18 = "JsonDecimal", c_18_ = "JsonDecimal", c_0 = "JsonDecimal", c_0_ = "JsonDecimal", c_sml_roz_disp = "JsonDecimal", c_sml_blk_disp = "JsonDecimal", c_obj_sml_disp = "JsonDecimal", c_rez_sml_disp = "JsonDecimal", kc0_1 = "JsonDecimal", kc0_1_0 = "JsonDecimal", priz_zaz = "number", uea_uc = "string", ueb_uc = "string", is_plan = "boolean", ixp = "string", ixp_rozpep = "string", pom = "Gordic.Sml.Interface.GRozaaatPomocneDto", navazanost = "Gordic.Sml.Interface.NavazanostAkce",}
	const enum GRozaaatDtoTypeLengths { ico = 10, ucs = 10, nks = 12, xuete = 286, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, mj = 5, zmenu_prov = 12,}
	/**Dto s pomocnými proměnnými pro práci s výběrem čísla akce*/
	interface GRozaaatPomocneDto {
		/**Příznak vazby dokladu na RS, která výže na BLK*/
		l_modedokBndRSBlk?: boolean|null;
		/**Příznak vazby objednávky na nadřazenou smlouvu s finančním profilem*/
		l_modedokObjSml?: boolean|null;
		/**Příznak vazby objednávky na nadřazenou smlouvu bez finančního profiu a s vazbou na blk*/
		l_modedokObjSmlNoFpBlk?: boolean|null;
		/**Příznak režimu vazby dokladu na BLK*/
		l_modedokBndBlk?: boolean|null;
		/**Kompetent*/
		ixs_fun_vyriz?: string|null;
		/**Číslo realizátora smlouvy*/
		cis_real?: string|null;
		/**Vazba dokladu na nadřazený případ*/
		ixp_sml?: string|null;
		/**Typ instalace*/
		typ_inst?: number|null;
		/**ICO*/
		ico?: string|null;
		/**Nákladové středisko*/
		nks?: string|null;
		/**ORG vyplněné nulami podle délky z CFU*/
		te1_zeros?: string|null;
		/**DB parametr - Způsob řízení přístupu kompetenta k položkám plánu (akcím)*/
		sml_typ_ackppla?: number|null;
		/**DB parametr - Úroveň přístupu k položkám plánu (akcím) dle topologie - UCS, NKS*/
		sml_top_ackppla?: number|null;
	}
	const enum GRozaaatPomocneDtoNames { l_modedokBndRSBlk = "l_modedokBndRSBlk", l_modedokObjSml = "l_modedokObjSml", l_modedokObjSmlNoFpBlk = "l_modedokObjSmlNoFpBlk", l_modedokBndBlk = "l_modedokBndBlk", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", ixp_sml = "ixp_sml", typ_inst = "typ_inst", ico = "ico", nks = "nks", te1_zeros = "te1_zeros", sml_typ_ackppla = "sml_typ_ackppla", sml_top_ackppla = "sml_top_ackppla",}
	const enum GRozaaatPomocneDtoFragments { l_modedokBndRSBlk = "*", l_modedokObjSml = "*", l_modedokObjSmlNoFpBlk = "*", l_modedokBndBlk = "*", ixs_fun_vyriz = "*", cis_real = "*", ixp_sml = "*", typ_inst = "*", ico = "*", nks = "*", te1_zeros = "*", sml_typ_ackppla = "*", sml_top_ackppla = "*",}
	const enum GRozaaatPomocneDtoTypes { l_modedokBndRSBlk = "boolean", l_modedokObjSml = "boolean", l_modedokObjSmlNoFpBlk = "boolean", l_modedokBndBlk = "boolean", ixs_fun_vyriz = "string", cis_real = "string", ixp_sml = "string", typ_inst = "number", ico = "string", nks = "string", te1_zeros = "string", sml_typ_ackppla = "number", sml_top_ackppla = "number",}
	const enum GRozaaatPomocneDtoTypeLengths {}
	/**Druhy navázonosti akce v číselníku Výběr akce*/
	const enum NavazanostAkce {
		/**Není navázáno*/
		nenavazano=0,
		/**Navázáno na dokladu*/
		navazanDoklad=1,
		/**Navázáno na případu (u dodatků)*/
		navazanPripad=2,
		/**Navázáno na dokladu a případu (u dodatků)*/
		navazanDokladAPripad=3,
	}
	/**Dto s vybraným BU a položkou plánu pro generování*/
	interface GRozaaatBuDto extends Gordic.Sml.Interface.GRozaaatDto {
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
	}
	const enum GRozaaatBuDtoNames { sk_vl = "sk_vl", bu_vl = "bu_vl", ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", xuete = "xuete", drd = "drd", mesic = "mesic", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", kc0 = "kc0", kc1 = "kc1", sm0 = "sm0", sm1 = "sm1", km0 = "km0", km1 = "km1", mj = "mj", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_23 = "c0_23", c1_23 = "c1_23", c0_13 = "c0_13", c1_13 = "c1_13", c0_14 = "c0_14", c1_14 = "c1_14", c0_24 = "c0_24", c1_24 = "c1_24", c0_25 = "c0_25", c1_25 = "c1_25", c0_26 = "c0_26", c1_26 = "c1_26", c0_30 = "c0_30", c1_30 = "c1_30", c0_31 = "c0_31", c1_31 = "c1_31", c0_0 = "c0_0", c1_0 = "c1_0", c0_2 = "c0_2", c1_2 = "c1_2", c0_3 = "c0_3", c1_3 = "c1_3", c0_6 = "c0_6", c1_6 = "c1_6", c0_7 = "c0_7", c1_7 = "c1_7", c0_8 = "c0_8", c1_8 = "c1_8", c0_10 = "c0_10", c1_10 = "c1_10", c0_11 = "c0_11", c1_11 = "c1_11", c0_12 = "c0_12", c1_12 = "c1_12", c0_15 = "c0_15", c1_15 = "c1_15", c0_16 = "c0_16", c1_16 = "c1_16", c0_17 = "c0_17", c1_17 = "c1_17", c0_18 = "c0_18", c1_18 = "c1_18", c0_22 = "c0_22", c1_22 = "c1_22", ca_0 = "ca_0", cb_0 = "cb_0", ca_6 = "ca_6", cb_6 = "cb_6", ca_18 = "ca_18", cb_18 = "cb_18", priz_char = "priz_char", druh_char = "druh_char", c0_21 = "c0_21", c1_21 = "c1_21", c0_34 = "c0_34", c1_34 = "c1_34", c0_54 = "c0_54", c1_54 = "c1_54", c0_66 = "c0_66", c1_66 = "c1_66", c0_62 = "c0_62", c1_62 = "c1_62", c0_63 = "c0_63", c1_63 = "c1_63", c0_67 = "c0_67", c1_67 = "c1_67", c0_68 = "c0_68", c1_68 = "c1_68", ixs_fun = "ixs_fun", nazev = "nazev", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", kc0_0_1_ = "kc0_0_1_", c0__10_ = "c0__10_", c0__6_ = "c0__6_", c0__18_ = "c0__18_", c0__12_ = "c0__12_", c0__11_ = "c0__11_", c0__15_ = "c0__15_", c0__16_ = "c0__16_", c0__17_ = "c0__17_", c0__0_ = "c0__0_", kc1_0_1_ = "kc1_0_1_", c1__10_ = "c1__10_", c1__6_00 = "c1__6_00", c1__18_ = "c1__18_", c1__12_ = "c1__12_", c1__11_ = "c1__11_", c1__15_ = "c1__15_", c1__16_ = "c1__16_", c1__17_ = "c1__17_", c1__0_ = "c1__0_", c0__rozpep_ = "c0__rozpep_", c1__rozpep_ = "c1__rozpep_", nazev_rozpep = "nazev_rozpep", count_doc = "count_doc", count_pri = "count_pri", uea_rr = "uea_rr", ueb_rr = "ueb_rr", cislo = "cislo", ixs_pla = "ixs_pla", c_ = "c_", c_12 = "c_12", c_12_ = "c_12_", c_11 = "c_11", c_11_ = "c_11_", c_10 = "c_10", c_10_0 = "c_10_0", c_15 = "c_15", c_15_ = "c_15_", c_16 = "c_16", c_16_0 = "c_16_0", c_17 = "c_17", c_17_ = "c_17_", c_6 = "c_6", c_6_0 = "c_6_0", c_18 = "c_18", c_18_ = "c_18_", c_0 = "c_0", c_0_ = "c_0_", c_sml_roz_disp = "c_sml_roz_disp", c_sml_blk_disp = "c_sml_blk_disp", c_obj_sml_disp = "c_obj_sml_disp", c_rez_sml_disp = "c_rez_sml_disp", kc0_1 = "kc0_1", kc0_1_0 = "kc0_1_0", priz_zaz = "priz_zaz", uea_uc = "uea_uc", ueb_uc = "ueb_uc", is_plan = "is_plan", ixp = "ixp", ixp_rozpep = "ixp_rozpep", pom = "pom", navazanost = "navazanost",}
	const enum GRozaaatBuDtoFragments { sk_vl = "*", bu_vl = "*", ico = "*", ucs = "*", nks = "*", rok = "*", xuete = "*", drd = "*", mesic = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", kc0 = "*", kc1 = "*", sm0 = "*", sm1 = "*", km0 = "*", km1 = "*", mj = "*", dat_zmena = "*", zmenu_prov = "*", c0_23 = "*", c1_23 = "*", c0_13 = "*", c1_13 = "*", c0_14 = "*", c1_14 = "*", c0_24 = "*", c1_24 = "*", c0_25 = "*", c1_25 = "*", c0_26 = "*", c1_26 = "*", c0_30 = "*", c1_30 = "*", c0_31 = "*", c1_31 = "*", c0_0 = "*", c1_0 = "*", c0_2 = "*", c1_2 = "*", c0_3 = "*", c1_3 = "*", c0_6 = "*", c1_6 = "*", c0_7 = "*", c1_7 = "*", c0_8 = "*", c1_8 = "*", c0_10 = "*", c1_10 = "*", c0_11 = "*", c1_11 = "*", c0_12 = "*", c1_12 = "*", c0_15 = "*", c1_15 = "*", c0_16 = "*", c1_16 = "*", c0_17 = "*", c1_17 = "*", c0_18 = "*", c1_18 = "*", c0_22 = "*", c1_22 = "*", ca_0 = "*", cb_0 = "*", ca_6 = "*", cb_6 = "*", ca_18 = "*", cb_18 = "*", priz_char = "*", druh_char = "*", c0_21 = "*", c1_21 = "*", c0_34 = "*", c1_34 = "*", c0_54 = "*", c1_54 = "*", c0_66 = "*", c1_66 = "*", c0_62 = "*", c1_62 = "*", c0_63 = "*", c1_63 = "*", c0_67 = "*", c1_67 = "*", c0_68 = "*", c1_68 = "*", ixs_fun = "*", nazev = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", kc0_0_1_ = "*", c0__10_ = "*", c0__6_ = "*", c0__18_ = "*", c0__12_ = "*", c0__11_ = "*", c0__15_ = "*", c0__16_ = "*", c0__17_ = "*", c0__0_ = "*", kc1_0_1_ = "*", c1__10_ = "*", c1__6_00 = "*", c1__18_ = "*", c1__12_ = "*", c1__11_ = "*", c1__15_ = "*", c1__16_ = "*", c1__17_ = "*", c1__0_ = "*", c0__rozpep_ = "*", c1__rozpep_ = "*", nazev_rozpep = "*", count_doc = "*", count_pri = "*", uea_rr = "*", ueb_rr = "*", cislo = "*", ixs_pla = "*", c_ = "*", c_12 = "*", c_12_ = "*", c_11 = "*", c_11_ = "*", c_10 = "*", c_10_0 = "*", c_15 = "*", c_15_ = "*", c_16 = "*", c_16_0 = "*", c_17 = "*", c_17_ = "*", c_6 = "*", c_6_0 = "*", c_18 = "*", c_18_ = "*", c_0 = "*", c_0_ = "*", c_sml_roz_disp = "*", c_sml_blk_disp = "*", c_obj_sml_disp = "*", c_rez_sml_disp = "*", kc0_1 = "*", kc0_1_0 = "*", priz_zaz = "*", uea_uc = "*", ueb_uc = "*", is_plan = "*", ixp = "*", ixp_rozpep = "*", pom = "*", navazanost = "*",}
	const enum GRozaaatBuDtoTypes { sk_vl = "string", bu_vl = "string", ico = "string", ucs = "string", nks = "string", rok = "number", xuete = "string", drd = "number", mesic = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", kc0 = "JsonDecimal", kc1 = "JsonDecimal", sm0 = "JsonDecimal", sm1 = "JsonDecimal", km0 = "JsonDecimal", km1 = "JsonDecimal", mj = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c0_23 = "JsonDecimal", c1_23 = "JsonDecimal", c0_13 = "JsonDecimal", c1_13 = "JsonDecimal", c0_14 = "JsonDecimal", c1_14 = "JsonDecimal", c0_24 = "JsonDecimal", c1_24 = "JsonDecimal", c0_25 = "JsonDecimal", c1_25 = "JsonDecimal", c0_26 = "JsonDecimal", c1_26 = "JsonDecimal", c0_30 = "JsonDecimal", c1_30 = "JsonDecimal", c0_31 = "JsonDecimal", c1_31 = "JsonDecimal", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c0_2 = "JsonDecimal", c1_2 = "JsonDecimal", c0_3 = "JsonDecimal", c1_3 = "JsonDecimal", c0_6 = "JsonDecimal", c1_6 = "JsonDecimal", c0_7 = "JsonDecimal", c1_7 = "JsonDecimal", c0_8 = "JsonDecimal", c1_8 = "JsonDecimal", c0_10 = "JsonDecimal", c1_10 = "JsonDecimal", c0_11 = "JsonDecimal", c1_11 = "JsonDecimal", c0_12 = "JsonDecimal", c1_12 = "JsonDecimal", c0_15 = "JsonDecimal", c1_15 = "JsonDecimal", c0_16 = "JsonDecimal", c1_16 = "JsonDecimal", c0_17 = "JsonDecimal", c1_17 = "JsonDecimal", c0_18 = "JsonDecimal", c1_18 = "JsonDecimal", c0_22 = "JsonDecimal", c1_22 = "JsonDecimal", ca_0 = "JsonDecimal", cb_0 = "JsonDecimal", ca_6 = "JsonDecimal", cb_6 = "JsonDecimal", ca_18 = "JsonDecimal", cb_18 = "JsonDecimal", priz_char = "number", druh_char = "number", c0_21 = "JsonDecimal", c1_21 = "JsonDecimal", c0_34 = "JsonDecimal", c1_34 = "JsonDecimal", c0_54 = "JsonDecimal", c1_54 = "JsonDecimal", c0_66 = "JsonDecimal", c1_66 = "JsonDecimal", c0_62 = "JsonDecimal", c1_62 = "JsonDecimal", c0_63 = "JsonDecimal", c1_63 = "JsonDecimal", c0_67 = "JsonDecimal", c1_67 = "JsonDecimal", c0_68 = "JsonDecimal", c1_68 = "JsonDecimal", ixs_fun = "string", nazev = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", kc0_0_1_ = "JsonDecimal", c0__10_ = "JsonDecimal", c0__6_ = "JsonDecimal", c0__18_ = "JsonDecimal", c0__12_ = "JsonDecimal", c0__11_ = "JsonDecimal", c0__15_ = "JsonDecimal", c0__16_ = "JsonDecimal", c0__17_ = "JsonDecimal", c0__0_ = "JsonDecimal", kc1_0_1_ = "JsonDecimal", c1__10_ = "JsonDecimal", c1__6_00 = "JsonDecimal", c1__18_ = "JsonDecimal", c1__12_ = "JsonDecimal", c1__11_ = "JsonDecimal", c1__15_ = "JsonDecimal", c1__16_ = "JsonDecimal", c1__17_ = "JsonDecimal", c1__0_ = "JsonDecimal", c0__rozpep_ = "JsonDecimal", c1__rozpep_ = "JsonDecimal", nazev_rozpep = "string", count_doc = "JsonDecimal", count_pri = "number", uea_rr = "string", ueb_rr = "string", cislo = "string", ixs_pla = "string", c_ = "JsonDecimal", c_12 = "JsonDecimal", c_12_ = "JsonDecimal", c_11 = "JsonDecimal", c_11_ = "JsonDecimal", c_10 = "JsonDecimal", c_10_0 = "JsonDecimal", c_15 = "JsonDecimal", c_15_ = "JsonDecimal", c_16 = "JsonDecimal", c_16_0 = "JsonDecimal", c_17 = "JsonDecimal", c_17_ = "JsonDecimal", c_6 = "JsonDecimal", c_6_0 = "JsonDecimal", c_18 = "JsonDecimal", c_18_ = "JsonDecimal", c_0 = "JsonDecimal", c_0_ = "JsonDecimal", c_sml_roz_disp = "JsonDecimal", c_sml_blk_disp = "JsonDecimal", c_obj_sml_disp = "JsonDecimal", c_rez_sml_disp = "JsonDecimal", kc0_1 = "JsonDecimal", kc0_1_0 = "JsonDecimal", priz_zaz = "number", uea_uc = "string", ueb_uc = "string", is_plan = "boolean", ixp = "string", ixp_rozpep = "string", pom = "Gordic.Sml.Interface.GRozaaatPomocneDto", navazanost = "Gordic.Sml.Interface.NavazanostAkce",}
	const enum GRozaaatBuDtoTypeLengths { sk_vl = 11, bu_vl = 34, ico = 10, ucs = 10, nks = 12, xuete = 286, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, mj = 5, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GRozdxmaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:rozdxma
	*      Dto Rozpočtové zápisy - měsíční
	*/
	interface GRozdxmaDto {
		/**Rok deníku*/
		rok?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		mesic?: number|null;
		ac?: string|null;
		radek_z?: number|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		drd?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		den?: number|null;
		c0?: JsonDecimal|null;
		c1?: JsonDecimal|null;
		m0?: JsonDecimal|null;
		m1?: JsonDecimal|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**stav kontrolního chodu*/
		stav_kch?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**Popis*/
		popis?: string|null;
		s_prep?: number|null;
		xuete?: string|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**Stav odúčtování*/
		s_odu?: number|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		uea_uc?: string|null;
		ueb_uc?: string|null;
		uec_uc?: string|null;
		ued_uc?: string|null;
		uee_uc?: string|null;
		uef_uc?: string|null;
		ueg_uc?: string|null;
		ueh_uc?: string|null;
		uei_uc?: string|null;
		uej_uc?: string|null;
		te0_uc?: string|null;
		te1_uc?: string|null;
		te2_uc?: string|null;
		te3_uc?: string|null;
		te4_uc?: string|null;
		/**MU*/
		uek_uc?: string|null;
		/**IČO*/
		uel_uc?: string|null;
		/**ÚČEL*/
		uem_uc?: string|null;
		/**ÚJ*/
		uen_uc?: string|null;
		/**PS*/
		te5_uc?: string|null;
		/**REZ1*/
		te6_uc?: string|null;
		/**REZ2*/
		te7_uc?: string|null;
		/**REZ3*/
		te8_uc?: string|null;
		/**REZ4*/
		te9_uc?: string|null;
		priz_char?: number|null;
		druh_char?: number|null;
		ixp_den_ag?: string|null;
		radek_ag?: number|null;
		ixp_sml?: string|null;
		rok_sml?: number|null;
		cislo_sml?: number|null;
		nks_uc?: string|null;
		id_hdr_ris?: string|null;
		radek_hdr?: number|null;
	}
	const enum GRozdxmaDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", m0 = "m0", m1 = "m1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", s_prep = "s_prep", xuete = "xuete", dat_mpd = "dat_mpd", s_odu = "s_odu", uus = "uus", ixs_esu = "ixs_esu", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uec_uc = "uec_uc", ued_uc = "ued_uc", uee_uc = "uee_uc", uef_uc = "uef_uc", ueg_uc = "ueg_uc", ueh_uc = "ueh_uc", uei_uc = "uei_uc", uej_uc = "uej_uc", te0_uc = "te0_uc", te1_uc = "te1_uc", te2_uc = "te2_uc", te3_uc = "te3_uc", te4_uc = "te4_uc", uek_uc = "uek_uc", uel_uc = "uel_uc", uem_uc = "uem_uc", uen_uc = "uen_uc", te5_uc = "te5_uc", te6_uc = "te6_uc", te7_uc = "te7_uc", te8_uc = "te8_uc", te9_uc = "te9_uc", priz_char = "priz_char", druh_char = "druh_char", ixp_den_ag = "ixp_den_ag", radek_ag = "radek_ag", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", nks_uc = "nks_uc", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr",}
	const enum GRozdxmaDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", m0 = "*", m1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", popis = "*", s_prep = "*", xuete = "*", dat_mpd = "*", s_odu = "*", uus = "*", ixs_esu = "*", uea_uc = "*", ueb_uc = "*", uec_uc = "*", ued_uc = "*", uee_uc = "*", uef_uc = "*", ueg_uc = "*", ueh_uc = "*", uei_uc = "*", uej_uc = "*", te0_uc = "*", te1_uc = "*", te2_uc = "*", te3_uc = "*", te4_uc = "*", uek_uc = "*", uel_uc = "*", uem_uc = "*", uen_uc = "*", te5_uc = "*", te6_uc = "*", te7_uc = "*", te8_uc = "*", te9_uc = "*", priz_char = "*", druh_char = "*", ixp_den_ag = "*", radek_ag = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", nks_uc = "*", id_hdr_ris = "*", radek_hdr = "*",}
	const enum GRozdxmaDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", m0 = "JsonDecimal", m1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", s_prep = "number", xuete = "string", dat_mpd = "JsonDate", s_odu = "number", uus = "string", ixs_esu = "string", uea_uc = "string", ueb_uc = "string", uec_uc = "string", ued_uc = "string", uee_uc = "string", uef_uc = "string", ueg_uc = "string", ueh_uc = "string", uei_uc = "string", uej_uc = "string", te0_uc = "string", te1_uc = "string", te2_uc = "string", te3_uc = "string", te4_uc = "string", uek_uc = "string", uel_uc = "string", uem_uc = "string", uen_uc = "string", te5_uc = "string", te6_uc = "string", te7_uc = "string", te8_uc = "string", te9_uc = "string", priz_char = "number", druh_char = "number", ixp_den_ag = "string", radek_ag = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", nks_uc = "string", id_hdr_ris = "string", radek_hdr = "number",}
	const enum GRozdxmaDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis = 254, xuete = 286, uus = 10, ixs_esu = 12, uea_uc = 3, ueb_uc = 4, uec_uc = 12, ued_uc = 12, uee_uc = 12, uef_uc = 3, ueg_uc = 16, ueh_uc = 4, uei_uc = 4, uej_uc = 16, te0_uc = 20, te1_uc = 16, te2_uc = 20, te3_uc = 6, te4_uc = 12, uek_uc = 6, uel_uc = 10, uem_uc = 10, uen_uc = 6, te5_uc = 30, te6_uc = 12, te7_uc = 20, te8_uc = 12, te9_uc = 20, ixp_den_ag = 12, ixp_sml = 12, nks_uc = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSetLabelTabDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Nastavení záložek a labelů políček*/
	interface GSetLabelTabDto {
		lbl_dat_uzavreni?: string|null;
		lbl_dat_platnost?: string|null;
		lbl_bind?: string|null;
		ng_tabkrtSmlObj?: string|null;
		lbl_soutez?: string|null;
		label?: string|null;
		lbl_ac_ver_zak?: string|null;
	}
	const enum GSetLabelTabDtoNames { lbl_dat_uzavreni = "lbl_dat_uzavreni", lbl_dat_platnost = "lbl_dat_platnost", lbl_bind = "lbl_bind", ng_tabkrtSmlObj = "ng_tabkrtSmlObj", lbl_soutez = "lbl_soutez", label = "label", lbl_ac_ver_zak = "lbl_ac_ver_zak",}
	const enum GSetLabelTabDtoFragments { lbl_dat_uzavreni = "*", lbl_dat_platnost = "*", lbl_bind = "*", ng_tabkrtSmlObj = "*", lbl_soutez = "*", label = "*", lbl_ac_ver_zak = "*",}
	const enum GSetLabelTabDtoTypes { lbl_dat_uzavreni = "string", lbl_dat_platnost = "string", lbl_bind = "string", ng_tabkrtSmlObj = "string", lbl_soutez = "string", label = "string", lbl_ac_ver_zak = "string",}
	const enum GSetLabelTabDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlAcVerZakDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr veřejné zakázky*/
	interface GSmlAcVerZakDto {
		/**Identifikátor veřejné zakázky*/
		ixs_pri?: string|null;
		/**Typ blokační agendy EVZ, VFP, EPO*/
		typ_ag_blok?: number|null;
		/**číslo veřejné zakázky*/
		ac_ver_zak?: string|null;
		/**Název*/
		nazev?: string|null;
		soutez?: string|null;
		c_sch?: JsonDecimal|null;
		fin_od?: number|null;
		fin_do?: number|null;
		typ_po?: number|null;
		typ_fin?: number|null;
		ac_ag?: string|null;
		/**Rok*/
		rok?: number|null;
		ktg_sml?: number|null;
		ixs_fun_vyriz?: string|null;
		cis_real?: string|null;
		/**Typ smlouvy*/
		ixs_typ?: string|null;
		ixp_sml_pri?: string|null;
		/**zkratka typu agendy*/
		typ_ag_zkr?: string|null;
		/**Textový název soutěže*/
		soutez_txt?: string|null;
	}
	const enum GSmlAcVerZakDtoNames { ixs_pri = "ixs_pri", typ_ag_blok = "typ_ag_blok", ac_ver_zak = "ac_ver_zak", nazev = "nazev", soutez = "soutez", c_sch = "c_sch", fin_od = "fin_od", fin_do = "fin_do", typ_po = "typ_po", typ_fin = "typ_fin", ac_ag = "ac_ag", rok = "rok", ktg_sml = "ktg_sml", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", ixs_typ = "ixs_typ", ixp_sml_pri = "ixp_sml_pri", typ_ag_zkr = "typ_ag_zkr", soutez_txt = "soutez_txt",}
	const enum GSmlAcVerZakDtoFragments { ixs_pri = "*", typ_ag_blok = "*", ac_ver_zak = "*", nazev = "*", soutez = "*", c_sch = "*", fin_od = "*", fin_do = "*", typ_po = "*", typ_fin = "*", ac_ag = "*", rok = "*", ktg_sml = "*", ixs_fun_vyriz = "*", cis_real = "*", ixs_typ = "*", ixp_sml_pri = "*", typ_ag_zkr = "*", soutez_txt = "*",}
	const enum GSmlAcVerZakDtoTypes { ixs_pri = "string", typ_ag_blok = "number", ac_ver_zak = "string", nazev = "string", soutez = "string", c_sch = "JsonDecimal", fin_od = "number", fin_do = "number", typ_po = "number", typ_fin = "number", ac_ag = "string", rok = "number", ktg_sml = "number", ixs_fun_vyriz = "string", cis_real = "string", ixs_typ = "string", ixp_sml_pri = "string", typ_ag_zkr = "string", soutez_txt = "string",}
	const enum GSmlAcVerZakDtoTypeLengths { ixs_pri = 12, ac_ver_zak = 30, nazev = 100, ac_ag = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlapidDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlapid - případ dokladu*/
	interface GSmlapidDto {
		/**DBCOLUMN:smlapid.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlapid.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlapid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smlapid.nks*/
		nks?: string|null;
		/**DBCOLUMN:smlapid.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_pol*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.mena*/
		mena?: number|null;
		/**DBCOLUMN:smlapid.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:smlapid.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:smlapid.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:smlapid.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:smlapid.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlapid.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:smlapid.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:smlapid.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:smlapid.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:smlapid.por_cislo_nab*/
		por_cislo_nab?: number|null;
		/**DBCOLUMN:smlapid.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:smlapid.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:smlapid.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:smlapid.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:smlapid.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:smlapid.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlapid.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:smlapid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlapid.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlapid.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:smlapid.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlapid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlapid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:smlapid.priz_pzp*/
		priz_pzp?: number|null;
		/**DBCOLUMN:smlapid.c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:smlapid.vs*/
		vs?: string|null;
		/**DBCOLUMN:smlapid.c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.c_mena_doc*/
		c_mena_doc?: JsonDecimal|null;
		/**DBCOLUMN:smlapid.dat_rad_iissp*/
		dat_rad_iissp?: JsonDate|null;
		/**DBCOLUMN:smlapid.priz_opce*/
		priz_opce?: number|null;
	}
	const enum GSmlapidDtoNames { ixp_sml_pri = "ixp_sml_pri", ico = "ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c = "c", c_pol = "c_pol", c_fak = "c_fak", mena = "mena", ktg_sml = "ktg_sml", dat_uzavreni = "dat_uzavreni", dat_ucinnost = "dat_ucinnost", dat_platnost = "dat_platnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", por_cislo_nab = "por_cislo_nab", typ_ag_blok = "typ_ag_blok", fin_od = "fin_od", fin_do = "fin_do", sml_stav = "sml_stav", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", ac_ver_zak = "ac_ver_zak", ixs_typ = "ixs_typ", popis = "popis", nazev = "nazev", ac_sml = "ac_sml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pzp = "priz_pzp", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", c_mena_doc = "c_mena_doc", dat_rad_iissp = "dat_rad_iissp", priz_opce = "priz_opce",}
	const enum GSmlapidDtoFragments { ixp_sml_pri = "SMLAPID", ico = "SMLAPID", ucs = "SMLAPID", nks = "SMLAPID", c_mena = "SMLAPID", c = "SMLAPID", c_pol = "SMLAPID", c_fak = "SMLAPID", mena = "SMLAPID", ktg_sml = "SMLAPID", dat_uzavreni = "SMLAPID", dat_ucinnost = "SMLAPID", dat_platnost = "SMLAPID", ixs_fun_vyriz = "SMLAPID", ixs_fun_ref = "SMLAPID", cis_real = "SMLAPID", ixs_pri = "SMLAPID", ixp_nab = "SMLAPID", por_cislo_nab = "SMLAPID", typ_ag_blok = "SMLAPID", fin_od = "SMLAPID", fin_do = "SMLAPID", sml_stav = "SMLAPID", sgn_stav = "SMLAPID", typ_ceny = "SMLAPID", ac_ver_zak = "SMLAPID", ixs_typ = "SMLAPID", popis = "SMLAPID", nazev = "SMLAPID", ac_sml = "SMLAPID", dat_zmena = "SMLAPID", zmenu_prov = "SMLAPID", priz_pzp = "SMLAPID", c_mena_z_osv = "SMLAPID", c_mena_z_bd = "SMLAPID", c_mena_z_ss = "SMLAPID", c_mena_z_ns = "SMLAPID", c_mena_dph_ss = "SMLAPID", c_mena_dph_ns = "SMLAPID", c_c_mena_ss = "SMLAPID", c_c_mena_ns = "SMLAPID", c_c_mena_okr = "SMLAPID", typ_phl = "SMLAPID", vs = "SMLAPID", c_mena_dph_3s = "SMLAPID", c_mena_dph_4s = "SMLAPID", c_mena_z_3s = "SMLAPID", c_mena_z_4s = "SMLAPID", c_c_mena_3s = "SMLAPID", c_c_mena_4s = "SMLAPID", c_mena_doc = "SMLAPID", dat_rad_iissp = "SMLAPID", priz_opce = "SMLAPID",}
	const enum GSmlapidDtoTypes { ixp_sml_pri = "string", ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", c_fak = "JsonDecimal", mena = "number", ktg_sml = "number", dat_uzavreni = "JsonDate", dat_ucinnost = "JsonDate", dat_platnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", ixs_pri = "string", ixp_nab = "string", por_cislo_nab = "number", typ_ag_blok = "number", fin_od = "number", fin_do = "number", sml_stav = "number", sgn_stav = "number", typ_ceny = "number", ac_ver_zak = "string", ixs_typ = "string", popis = "string", nazev = "string", ac_sml = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pzp = "number", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", c_mena_doc = "JsonDecimal", dat_rad_iissp = "JsonDate", priz_opce = "number",}
	const enum GSmlapidDtoTypeLengths { ixp_sml_pri = 12, ico = 10, ucs = 10, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, cis_real = 6, ixs_pri = 12, ixp_nab = 12, ac_ver_zak = 30, ixs_typ = 12, popis = 254, nazev = 4000, ac_sml = 30, zmenu_prov = 12, typ_phl = 4, vs = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlcpopDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlcpop*/
	interface GSmlcpopDto {
		/**DBCOLUMN:smlcpop.priz_opce*/
		priz_opce?: number|null;
		/**DBCOLUMN:smlcpop.priz_opce_txt*/
		priz_opce_txt?: string|null;
		/**DBCOLUMN:smlcpop.priz_opce_zkr*/
		priz_opce_zkr?: string|null;
		/**DBCOLUMN:smlcpop.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlcpop.k_s*/
		k_s?: string|null;
	}
	const enum GSmlcpopDtoNames { priz_opce = "priz_opce", priz_opce_txt = "priz_opce_txt", priz_opce_zkr = "priz_opce_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GSmlcpopDtoFragments { priz_opce = "*", priz_opce_txt = "*", priz_opce_zkr = "*", k_v = "*", k_s = "*",}
	const enum GSmlcpopDtoTypes { priz_opce = "number", priz_opce_txt = "string", priz_opce_zkr = "string", k_v = "number", k_s = "string",}
	const enum GSmlcpopDtoTypeLengths { priz_opce_txt = 100, priz_opce_zkr = 16, k_s = 15,}
	/**ENUM:smlcpop*/
	const enum GSmlcpopEnum {
		/**Ne*/
		_0=0,
		/**Ano*/
		_10=10,
	}
	function GSmlcpopEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSmlcpopEnum, Gordic.Sml.Interface.GSmlcpopDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlctplDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlctpl*/
	interface GSmlctplDto {
		/**DBCOLUMN:smlctpl.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:smlctpl.typ_platnost_txt*/
		typ_platnost_txt?: string|null;
		/**DBCOLUMN:smlctpl.typ_platnost_zkr*/
		typ_platnost_zkr?: string|null;
		/**DBCOLUMN:smlctpl.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlctpl.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:smlctpl.k_xml*/
		k_xml?: string|null;
	}
	const enum GSmlctplDtoNames { typ_platnost = "typ_platnost", typ_platnost_txt = "typ_platnost_txt", typ_platnost_zkr = "typ_platnost_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSmlctplDtoFragments { typ_platnost = "*", typ_platnost_txt = "*", typ_platnost_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSmlctplDtoTypes { typ_platnost = "number", typ_platnost_txt = "string", typ_platnost_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSmlctplDtoTypeLengths { typ_platnost_txt = 50, typ_platnost_zkr = 16, k_s = 15, k_xml = 254,}
	/**ENUM:smlctpl*/
	const enum GSmlctplEnum {
		/**Neurčeno*/
		neurceno=0,
		/**Doba určitá*/
		doba_urcita=10,
		/**Doba neurčitá*/
		doba_neurcita=20,
		/**Do vyčerpání částky*/
		do_vycerpani_castky=30,
	}
	function GSmlctplEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSmlctplEnum, Gordic.Sml.Interface.GSmlctplDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmldkalDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smldkal - Podklady pro předpisy pohledávek*/
	interface GSmldkalDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		cis_platby?: number|null;
		/**Pořadí*/
		poradi?: number|null;
		ktg_upo?: number|null;
		/**ktg upo jako text*/
		ktg_upo_txt?: string|null;
		dat_vznik?: JsonDate|null;
		dat_splatnost?: JsonDate|null;
		c_mena?: JsonDecimal|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
		dat_zdan?: JsonDate|null;
		rok_dph?: number|null;
		mesic_dph?: number|null;
		/**Částka bez DPH*/
		c_z0?: JsonDecimal|null;
		/**Částka osvobozena od DPH*/
		c_d0?: JsonDecimal|null;
		/**Částka základu pro výpočet snížené sazby DPH*/
		c_z1?: JsonDecimal|null;
		/**Částka daně pro výpočet snížené sazby DPH*/
		c_d1?: JsonDecimal|null;
		/**Částka základu pro výpočet základní sazby DPH*/
		c_z2?: JsonDecimal|null;
		/**Částka daně pro výpočet základní sazby DPH*/
		c_d2?: JsonDecimal|null;
		/**Částka zaokrouhlení předpisu DPH*/
		c_zao?: JsonDecimal|null;
		status_platby?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		ixp_sml?: string|null;
		rok_sml?: number|null;
		cislo_sml?: number|null;
		ixp_sml_pri?: string|null;
		/**Příznak, zda je záznam uložen v db*/
		flag_DB?: boolean|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmlskalPermissions|null;
	}
	const enum GSmldkalDtoNames { ixp = "ixp", cis_platby = "cis_platby", poradi = "poradi", ktg_upo = "ktg_upo", ktg_upo_txt = "ktg_upo_txt", dat_vznik = "dat_vznik", dat_splatnost = "dat_splatnost", c_mena = "c_mena", c = "c", popis = "popis", dat_zdan = "dat_zdan", rok_dph = "rok_dph", mesic_dph = "mesic_dph", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_zao = "c_zao", status_platby = "status_platby", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixp_sml_pri = "ixp_sml_pri", flag_DB = "flag_DB", Permissions = "Permissions",}
	const enum GSmldkalDtoFragments { ixp = "*", cis_platby = "*", poradi = "*", ktg_upo = "*", ktg_upo_txt = "*", dat_vznik = "*", dat_splatnost = "*", c_mena = "*", c = "*", popis = "*", dat_zdan = "*", rok_dph = "*", mesic_dph = "*", c_z0 = "*", c_d0 = "*", c_z1 = "*", c_d1 = "*", c_z2 = "*", c_d2 = "*", c_zao = "*", status_platby = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", ixp_sml_pri = "*", flag_DB = "*", Permissions = "Permissions",}
	const enum GSmldkalDtoTypes { ixp = "string", cis_platby = "number", poradi = "number", ktg_upo = "number", ktg_upo_txt = "string", dat_vznik = "JsonDate", dat_splatnost = "JsonDate", c_mena = "JsonDecimal", c = "JsonDecimal", popis = "string", dat_zdan = "JsonDate", rok_dph = "number", mesic_dph = "number", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_zao = "JsonDecimal", status_platby = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", ixp_sml_pri = "string", flag_DB = "boolean", Permissions = "Gordic.Sml.Interface.GSmlskalPermissions",}
	const enum GSmldkalDtoTypeLengths { ixp = 12, popis = 50, ixp_sml = 12, ixp_sml_pri = 12,}
	/**Filter pro předpis pohledávek platebního kalendáře pro odběratelské doklady*/
	const enum GSmldkalFilter {
		/**ixp - 1.key*/
		ixp,
		/**cis_platby - 2.key*/
		cis_platby,
		/**poradi - 3.key*/
		poradi,
		/**ixp_sml_pri - 4.key*/
		ixp_sml_pri,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmldpolDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smldpol
	*      Položka finančního profilu FP dokladu - předpis krytí
	*/
	interface GSmldpolDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Číslo položky
		*      Pořadové číslo položky financování
		*/
		cislo?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		ixp_pla?: string|null;
		/**Číslo položky plánu/Akce
		*      Odkaz na položku plánu/akci, ze které je položky FP financována v případě čerpání prostředků přímo z rozpočtu
		*/
		cis_pol_pla?: string|null;
		/**Funkce kompetenta*/
		ixs_fun?: string|null;
		/**Název*/
		nazev?: string|null;
		up_stav?: number|null;
		/**Částka financování*/
		c?: JsonDecimal|null;
		/**Měrná jednotka
		*      Nemá praktický význam
		*/
		mj?: string|null;
		/**Množství*/
		m?: JsonDecimal|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**SU - Syntetický účet vlastního BÚ*/
		uea?: string|null;
		/**AU - Analytický účet vlastního BÚ*/
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**Nevyužito*/
		c_fak?: JsonDecimal|null;
		dat_vznik?: JsonDate|null;
		/**Nevyužito*/
		typ_ag_fak?: number|null;
		/**Nevyužito*/
		c_obj_sml?: JsonDecimal|null;
		/**Druh dokladu*/
		drd?: number|null;
		/**Identifikátor případu nadřazené položky financování*/
		ixp_sml?: string|null;
		/**Rok financování případu nadřazené položky financování*/
		rok_sml?: number|null;
		/**Číslo položky případu nadřazené položky financování*/
		cislo_sml?: number|null;
		/**Su Rozpočtového reprezentanta*/
		uea_rr?: string|null;
		/**Au Rozpočtového reprezentanta*/
		ueb_rr?: string|null;
		/**Identifikátor případu BLK*/
		ixs_pri?: string|null;
		/**Nevyužito*/
		por_cis?: number|null;
		/**Typ agendy BLK, na kterou váže doklad*/
		typ_ag_blok?: number|null;
		/**Znaménko
		*      Matematicky prezentuje debit nebo kredit financování
		*/
		znam?: number|null;
		/**Příznak záznamu*/
		priz_zaz?: number|null;
		/**Identifikátor případu*/
		ixp_sml_pri?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Textová zkratka stavu*/
		up_stav_zkr?: string|null;
		/**Celý text stavu*/
		up_stav_txt?: string|null;
		/**Textově složený bankovní účet*/
		bu_vl_txt?: string|null;
		/**Typ operace textově*/
		priz_zaz_txt?: string|null;
		/**uea_uc*/
		uea_uc?: string|null;
		/**ueb_uc*/
		ueb_uc?: string|null;
		/**c_fak_obj*/
		c_fak_obj?: JsonDecimal|null;
		/**c_rcn*/
		c_rcn?: JsonDecimal|null;
		/**c_vratka*/
		c_vratka?: JsonDecimal|null;
		/**Měrná jednotka textově*/
		mj_txt?: string|null;
		/**Typ běžného ůčtu (ekosuvl)*/
		ktg_bu?: number|null;
		/**Typ běžného ůčtu (ekosuvl)*/
		typ_bu?: number|null;
		/**Xuete akce*/
		xuete_akce?: string|null;
		/**Příznak, zda je záznam uložen v DB*/
		flagDB?: boolean|null;
		/**Pomocné proměnné pro povolení akcí, povolení polí, ...*/
		pom?: Gordic.Sml.Interface.GSmlFinPolozkyFPDokladPomocneDto|null;
		/**Pomocné proměnné s povolenými a zakázanými poli*/
		fields?: Gordic.Sml.Interface.GSmlFinPolozkyFPDokladFieldsEnabled|null;
		/**Položky dokladu*/
		findoc?: Gordic.Sml.Interface.GSmlPolFinDto|null;
		/**Položky stavu případu*/
		finpripad?: Gordic.Sml.Interface.GSmlPolFinDto|null;
		/**Datum plnění?*/
		dat_plneni?: JsonDate|null;
		/**Datum změny dokladu*/
		dat_zmena_doklad?: JsonDate|null;
		/**Stav rozp. krytí*/
		stav_rkp?: number|null;
		/**Drd pro kontrolu rozpočtu*/
		drd_roz?: number|null;
		/**Identifikátor rozvrhu*/
		ixs_roz?: string|null;
		/**Identifikátor vázané faktury*/
		ixp_fak?: string|null;
		/**Řádek krytí*/
		radek_kry?: number|null;
		/**kategorie smlouvy*/
		ktg_sml?: number|null;
		/**typ ceny*/
		typ_ceny?: number|null;
		/**typ kurzu*/
		typ_kurz?: number|null;
		/**maximální rok pořízených položek*/
		max_rok_pol?: number|null;
		zd?: number|null;
		n1?: number|null;
		n2?: number|null;
		c_fak_obec?: number|null;
		s1?: string|null;
		s2?: string|null;
		/**příznak, že se jedná o práci s dokladem, u kterého je nutné pracovat s případem*/
		is_pripad?: boolean|null;
		/**!příznak, že se jedná o plánovanou položku*/
		is_plan?: boolean|null;
		/**!0 = poriz, 1 = kch, 2 = ext*/
		kontrol_typ?: number|null;
		/**!40 = veškeré účtování, 50 = rozpočet*/
		typ_ag?: number|null;
		n3?: JsonDecimal|null;
		n4?: JsonDecimal|null;
		/**korekce výše částky položky vůči disponibilitě = částka, o kterou je nutné snížit požadovanou hodnotu položky FP*/
		c_pol_dif?: JsonDecimal|null;
		/**identifikátor rozpočtového opatření*/
		ixp_rozpep?: string|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmlFinPolozkyFPDokladPermissions|null;
	}
	const enum GSmldpolDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", ixp_pla = "ixp_pla", cis_pol_pla = "cis_pol_pla", ixs_fun = "ixs_fun", nazev = "nazev", up_stav = "up_stav", c = "c", mj = "mj", m = "m", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fak = "c_fak", dat_vznik = "dat_vznik", typ_ag_fak = "typ_ag_fak", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", priz_zaz = "priz_zaz", ixp_sml_pri = "ixp_sml_pri", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", up_stav_zkr = "up_stav_zkr", up_stav_txt = "up_stav_txt", bu_vl_txt = "bu_vl_txt", priz_zaz_txt = "priz_zaz_txt", uea_uc = "uea_uc", ueb_uc = "ueb_uc", c_fak_obj = "c_fak_obj", c_rcn = "c_rcn", c_vratka = "c_vratka", mj_txt = "mj_txt", ktg_bu = "ktg_bu", typ_bu = "typ_bu", xuete_akce = "xuete_akce", flagDB = "flagDB", pom = "pom", fields = "fields", findoc = "findoc", finpripad = "finpripad", dat_plneni = "dat_plneni", dat_zmena_doklad = "dat_zmena_doklad", stav_rkp = "stav_rkp", drd_roz = "drd_roz", ixs_roz = "ixs_roz", ixp_fak = "ixp_fak", radek_kry = "radek_kry", ktg_sml = "ktg_sml", typ_ceny = "typ_ceny", typ_kurz = "typ_kurz", max_rok_pol = "max_rok_pol", zd = "zd", n1 = "n1", n2 = "n2", c_fak_obec = "c_fak_obec", s1 = "s1", s2 = "s2", is_pripad = "is_pripad", is_plan = "is_plan", kontrol_typ = "kontrol_typ", typ_ag = "typ_ag", n3 = "n3", n4 = "n4", c_pol_dif = "c_pol_dif", ixp_rozpep = "ixp_rozpep", Permissions = "Permissions",}
	const enum GSmldpolDtoFragments { ixp = "*", rok = "*", cislo = "*", lic = "*", ixp_pla = "*", cis_pol_pla = "*", ixs_fun = "*", nazev = "*", up_stav = "*", c = "*", mj = "*", m = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", sk_vl = "*", bu_vl = "*", c_fak = "*", dat_vznik = "*", typ_ag_fak = "*", c_obj_sml = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", typ_ag_blok = "*", znam = "*", priz_zaz = "*", ixp_sml_pri = "*", dat_zmena = "*", zmenu_prov = "*", up_stav_zkr = "*", up_stav_txt = "*", bu_vl_txt = "*", priz_zaz_txt = "*", uea_uc = "*", ueb_uc = "*", c_fak_obj = "*", c_rcn = "*", c_vratka = "*", mj_txt = "*", ktg_bu = "*", typ_bu = "*", xuete_akce = "*", flagDB = "*", pom = "*", fields = "*", findoc = "*", finpripad = "*", dat_plneni = "*", dat_zmena_doklad = "*", stav_rkp = "*", drd_roz = "*", ixs_roz = "*", ixp_fak = "*", radek_kry = "*", ktg_sml = "*", typ_ceny = "*", typ_kurz = "*", max_rok_pol = "*", zd = "*", n1 = "*", n2 = "*", c_fak_obec = "*", s1 = "*", s2 = "*", is_pripad = "*", is_plan = "*", kontrol_typ = "*", typ_ag = "*", n3 = "*", n4 = "*", c_pol_dif = "*", ixp_rozpep = "*", Permissions = "Permissions",}
	const enum GSmldpolDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", ixp_pla = "string", cis_pol_pla = "string", ixs_fun = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", mj = "string", m = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", sk_vl = "string", bu_vl = "string", c_fak = "JsonDecimal", dat_vznik = "JsonDate", typ_ag_fak = "number", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", priz_zaz = "number", ixp_sml_pri = "string", dat_zmena = "JsonDate", zmenu_prov = "string", up_stav_zkr = "string", up_stav_txt = "string", bu_vl_txt = "string", priz_zaz_txt = "string", uea_uc = "string", ueb_uc = "string", c_fak_obj = "JsonDecimal", c_rcn = "JsonDecimal", c_vratka = "JsonDecimal", mj_txt = "string", ktg_bu = "number", typ_bu = "number", xuete_akce = "string", flagDB = "boolean", pom = "Gordic.Sml.Interface.GSmlFinPolozkyFPDokladPomocneDto", fields = "Gordic.Sml.Interface.GSmlFinPolozkyFPDokladFieldsEnabled", findoc = "Gordic.Sml.Interface.GSmlPolFinDto", finpripad = "Gordic.Sml.Interface.GSmlPolFinDto", dat_plneni = "JsonDate", dat_zmena_doklad = "JsonDate", stav_rkp = "number", drd_roz = "number", ixs_roz = "string", ixp_fak = "string", radek_kry = "number", ktg_sml = "number", typ_ceny = "number", typ_kurz = "number", max_rok_pol = "number", zd = "number", n1 = "number", n2 = "number", c_fak_obec = "number", s1 = "string", s2 = "string", is_pripad = "boolean", is_plan = "boolean", kontrol_typ = "number", typ_ag = "number", n3 = "JsonDecimal", n4 = "JsonDecimal", c_pol_dif = "JsonDecimal", ixp_rozpep = "string", Permissions = "Gordic.Sml.Interface.GSmlFinPolozkyFPDokladPermissions",}
	const enum GSmldpolDtoTypeLengths { ixp = 12, lic = 4, ixp_pla = 12, cis_pol_pla = 16, ixs_fun = 12, nazev = 254, mj = 5, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, sk_vl = 11, bu_vl = 34, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, ixp_sml_pri = 12, zmenu_prov = 12, uea_uc = 3, ueb_uc = 4, xuete_akce = 286,}
	/**Položky finančního profilu - obecné pomocné proměnné dto*/
	interface GSmlFinPolozkyFPDokladPomocneObecneDto {
		/**Drd dle kategorie dokladu*/
		drd?: Gordic.Sml.Interface.DruhyZapisu|null;
		/**Příznak, zda souhlasí drdy*/
		b_drd?: boolean|null;
		/**Příznak pro řízení přístupnosti tlačítek při vytvoření (rozdíl??)*/
		create_disable?: boolean|null;
		/**Příznak pro řízení přístupnosti tlačítek dynamicky s ohledem na záznam (rozdíl??)*/
		hide_enable?: boolean|null;
		/**Příznak vazby objednávky na nadřazenou smlouvu s finančním profilem*/
		l_modedokObjSml?: boolean|null;
		/**Příznak vazby objednávky na nadřazenou smlouvu bez finančního profiu a s vazbou na blk*/
		l_modedokObjSmlNoFpBlk?: boolean|null;
		/**Příznak režimu vazby na BLK*/
		l_modedokBlk?: boolean|null;
		/**Příznak režimu chování pri existenci RR nebo bez něj (pouze obecný bez vztahu k položce)*/
		rezim_rr_obecny?: boolean|null;
		/**Příznak, že existuje záznam platebního kalendáře se způsobem platby = inkaso*/
		b_inkaso?: boolean|null;
		ixs_fun_vyriz?: string|null;
		cis_real?: string|null;
		/**Příznak, zda je záložka Struktura v IISSP povolena*/
		iissp_enabled?: boolean|null;
	}
	const enum GSmlFinPolozkyFPDokladPomocneObecneDtoNames { drd = "drd", b_drd = "b_drd", create_disable = "create_disable", hide_enable = "hide_enable", l_modedokObjSml = "l_modedokObjSml", l_modedokObjSmlNoFpBlk = "l_modedokObjSmlNoFpBlk", l_modedokBlk = "l_modedokBlk", rezim_rr_obecny = "rezim_rr_obecny", b_inkaso = "b_inkaso", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", iissp_enabled = "iissp_enabled",}
	const enum GSmlFinPolozkyFPDokladPomocneObecneDtoFragments { drd = "*", b_drd = "*", create_disable = "*", hide_enable = "*", l_modedokObjSml = "*", l_modedokObjSmlNoFpBlk = "*", l_modedokBlk = "*", rezim_rr_obecny = "*", b_inkaso = "*", ixs_fun_vyriz = "*", cis_real = "*", iissp_enabled = "*",}
	const enum GSmlFinPolozkyFPDokladPomocneObecneDtoTypes { drd = "Gordic.Sml.Interface.DruhyZapisu", b_drd = "boolean", create_disable = "boolean", hide_enable = "boolean", l_modedokObjSml = "boolean", l_modedokObjSmlNoFpBlk = "boolean", l_modedokBlk = "boolean", rezim_rr_obecny = "boolean", b_inkaso = "boolean", ixs_fun_vyriz = "string", cis_real = "string", iissp_enabled = "boolean",}
	const enum GSmlFinPolozkyFPDokladPomocneObecneDtoTypeLengths {}
	/**Položky finančního profilu - pomocné proměnné dto k záznamu*/
	interface GSmlFinPolozkyFPDokladPomocneDto {
		/**Příznak pro řízení přístupnosti tlačítek dynamicky s ohledem na záznam*/
		hide_enable?: boolean|null;
		/**Příznak režimu chování pri existenci RR nebo bez něj*/
		rezim_rr?: boolean|null;
		/**stav_enable*/
		stav_enable?: boolean|null;
		/**access_cpp*/
		access_cpp?: boolean|null;
	}
	const enum GSmlFinPolozkyFPDokladPomocneDtoNames { hide_enable = "hide_enable", rezim_rr = "rezim_rr", stav_enable = "stav_enable", access_cpp = "access_cpp",}
	const enum GSmlFinPolozkyFPDokladPomocneDtoFragments { hide_enable = "*", rezim_rr = "*", stav_enable = "*", access_cpp = "*",}
	const enum GSmlFinPolozkyFPDokladPomocneDtoTypes { hide_enable = "boolean", rezim_rr = "boolean", stav_enable = "boolean", access_cpp = "boolean",}
	const enum GSmlFinPolozkyFPDokladPomocneDtoTypeLengths {}
	/**Položky finančního profilu - povolené a zakázané pole pro editaci*/
	interface GSmlFinPolozkyFPDokladFieldsEnabled {
		/**Pole nks + účetní věta*/
		nks_uea?: boolean|null;
		/**Pole Číslo akce*/
		cis_pol_pla?: boolean|null;
		/**Pole Bankovní účet vlastní*/
		bu_vl?: boolean|null;
		/**Pole Typ operace*/
		priz_zaz?: boolean|null;
		/**Pole Částka*/
		c?: boolean|null;
		/**Pole Množství*/
		m?: boolean|null;
		/**Pole Měrná jednotka*/
		mj?: boolean|null;
		/**Pole Název*/
		nazev?: boolean|null;
	}
	const enum GSmlFinPolozkyFPDokladFieldsEnabledNames { nks_uea = "nks_uea", cis_pol_pla = "cis_pol_pla", bu_vl = "bu_vl", priz_zaz = "priz_zaz", c = "c", m = "m", mj = "mj", nazev = "nazev",}
	const enum GSmlFinPolozkyFPDokladFieldsEnabledFragments { nks_uea = "*", cis_pol_pla = "*", bu_vl = "*", priz_zaz = "*", c = "*", m = "*", mj = "*", nazev = "*",}
	const enum GSmlFinPolozkyFPDokladFieldsEnabledTypes { nks_uea = "boolean", cis_pol_pla = "boolean", bu_vl = "boolean", priz_zaz = "boolean", c = "boolean", m = "boolean", mj = "boolean", nazev = "boolean",}
	const enum GSmlFinPolozkyFPDokladFieldsEnabledTypeLengths {}
	/**Dto pro hromadné vytvoření nových položek podle rozpisu*/
	interface GSmlFinPolozkyFPDokladMassNewDto {
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**Su Rozpočtového reprezentanta*/
		uea_rr?: string|null;
		/**Au Rozpočtového reprezentanta*/
		ueb_rr?: string|null;
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**sloupec c0, c1 rozdpep - částky rozpočtového opatření*/
		c0_rozpep?: JsonDecimal|null;
		/**sloupec c0, c1 rozdpep - částky rozpočtového opatření*/
		c1_rozpep?: JsonDecimal|null;
		/**Identifikátor rozpočtového opatření z filtr panelu*/
		ixp_rozpep?: string|null;
		/**uea_uc*/
		uea_uc?: string|null;
		/**ueb_uc*/
		ueb_uc?: string|null;
		/**cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**ixs_pla z položky plánu*/
		ixp_pla?: string|null;
		/**ixs_fun z položky plánu*/
		ixs_fun?: string|null;
		/**priz_zaz z položky plánu*/
		priz_zaz?: number|null;
	}
	const enum GSmlFinPolozkyFPDokladMassNewDtoNames { nks = "nks", uea_rr = "uea_rr", ueb_rr = "ueb_rr", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c0_rozpep = "c0_rozpep", c1_rozpep = "c1_rozpep", ixp_rozpep = "ixp_rozpep", uea_uc = "uea_uc", ueb_uc = "ueb_uc", cis_pol_pla = "cis_pol_pla", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", ixp_pla = "ixp_pla", ixs_fun = "ixs_fun", priz_zaz = "priz_zaz",}
	const enum GSmlFinPolozkyFPDokladMassNewDtoFragments { nks = "*", uea_rr = "*", ueb_rr = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c0_rozpep = "*", c1_rozpep = "*", ixp_rozpep = "*", uea_uc = "*", ueb_uc = "*", cis_pol_pla = "*", nazev = "*", sk_vl = "*", bu_vl = "*", ixp_pla = "*", ixs_fun = "*", priz_zaz = "*",}
	const enum GSmlFinPolozkyFPDokladMassNewDtoTypes { nks = "string", uea_rr = "string", ueb_rr = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c0_rozpep = "JsonDecimal", c1_rozpep = "JsonDecimal", ixp_rozpep = "string", uea_uc = "string", ueb_uc = "string", cis_pol_pla = "string", nazev = "string", sk_vl = "string", bu_vl = "string", ixp_pla = "string", ixs_fun = "string", priz_zaz = "number",}
	const enum GSmlFinPolozkyFPDokladMassNewDtoTypeLengths { nks = 12, uea_rr = 3, ueb_rr = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, ixp_rozpep = 12, uea_uc = 3, ueb_uc = 4, cis_pol_pla = 16, nazev = 254, sk_vl = 11, bu_vl = 34, ixp_pla = 12,}
	/**Record částek financování*/
	interface cfc_FinDto {
		/**částka položky smlouvy*/
		c?: JsonDecimal|null;
		/**rozpočtované prostředky*/
		c_roz?: JsonDecimal|null;
		/**rezervované prostředky*/
		c_6?: JsonDecimal|null;
		/**nasmlouvané prostředky*/
		c_10?: JsonDecimal|null;
		/**blokované prostředky*/
		c_12?: JsonDecimal|null;
		/**objem smluv realizovaných na dané VZ*/
		c_11?: JsonDecimal|null;
		/**objednané prostředky*/
		c_15?: JsonDecimal|null;
		/**objem objednávek realizovaných na dané smlouvě*/
		c_16?: JsonDecimal|null;
		/**objem objednávek realizovaných na dané smlouvě*/
		c_17?: JsonDecimal|null;
		/**objem rezervací vázaných na blokační agendu*/
		c_18?: JsonDecimal|null;
		/**objem navázaných cestovních příkazů*/
		c_psc?: JsonDecimal|null;
		/**sloupec c0, c1 rozdpep - částky rozpočtového opatření*/
		c_rozpep?: JsonDecimal|null;
	}
	const enum cfc_FinDtoNames { c = "c", c_roz = "c_roz", c_6 = "c_6", c_10 = "c_10", c_12 = "c_12", c_11 = "c_11", c_15 = "c_15", c_16 = "c_16", c_17 = "c_17", c_18 = "c_18", c_psc = "c_psc", c_rozpep = "c_rozpep",}
	const enum cfc_FinDtoFragments { c = "*", c_roz = "*", c_6 = "*", c_10 = "*", c_12 = "*", c_11 = "*", c_15 = "*", c_16 = "*", c_17 = "*", c_18 = "*", c_psc = "*", c_rozpep = "*",}
	const enum cfc_FinDtoTypes { c = "JsonDecimal", c_roz = "JsonDecimal", c_6 = "JsonDecimal", c_10 = "JsonDecimal", c_12 = "JsonDecimal", c_11 = "JsonDecimal", c_15 = "JsonDecimal", c_16 = "JsonDecimal", c_17 = "JsonDecimal", c_18 = "JsonDecimal", c_psc = "JsonDecimal", c_rozpep = "JsonDecimal",}
	const enum cfc_FinDtoTypeLengths {}
	/**Record proměnných položky a stavu položky FP*/
	interface GSmlPolFinDto {
		/**Identifikátor dokladu/případu*/
		ixp?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Číslo položky*/
		cislo?: number|null;
		/**Číslo položky plánu*/
		cis_pol_pla?: string|null;
		up_stav?: number|null;
		/**Nazev*/
		nazev?: string|null;
		/**ICO*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**SU - Syntetický účet vlastního BÚ*/
		uea?: string|null;
		/**AU - Analytický účet vlastního BÚ*/
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**XUETE*/
		xuete?: string|null;
		/**drd zápisu do ROZDXMA*/
		drd?: number|null;
		/**částky položky finančního profilu*/
		polfp?: Gordic.Sml.Interface.cfc_FinDto|null;
		/**částky rozpočtu*/
		rozp?: Gordic.Sml.Interface.cfc_FinDto|null;
		/**částky rozpočtu na straně MD 374.10 26.01.15*/
		rozp0?: Gordic.Sml.Interface.cfc_FinDto|null;
		/**částky rozpočtu na starně Dal 374.10 26.01.15*/
		rozp1?: Gordic.Sml.Interface.cfc_FinDto|null;
		/**částky blokační agendy*/
		blok?: Gordic.Sml.Interface.cfc_FinDto|null;
		/**částky položky sml navázané na obj*/
		smlfp?: Gordic.Sml.Interface.cfc_FinDto|null;
		/**identifikace VZ*/
		ixs_pri?: string|null;
		/**položka smlouvy vázaná na položku obj*/
		ixp_sml?: string|null;
		/**položka smlouvy vázaná na položku obj*/
		rok_sml?: number|null;
		/**položka smlouvy vázaná na položku obj*/
		cislo_sml?: number|null;
		/**SU rozpočtového kompetenta*/
		uea_rr?: string|null;
		/**AU rozpočtového kompetenta*/
		ueb_rr?: string|null;
		/**SU běžného účtu*/
		uea_uc?: string|null;
		/**AU běžného účtu*/
		ueb_uc?: string|null;
		/**vlastní BÚ*/
		bu_vl?: string|null;
		/**směrový kód vlastního BÚ*/
		sk_vl?: string|null;
		/**příznak existence vastního BÚ pro aktuální období*/
		bu_exist_aktobd?: boolean|null;
		/**kategorie účtu*/
		ktg_bu?: number|null;
		/**typ vlastního bankovního účtu*/
		typ_bu?: number|null;
		/**pomocná proměnná na definici počtu BÚ dle daného kritéria*/
		num_bu?: number|null;
		typ_ag_blok?: number|null;
		/**znaménko operace*/
		znam?: number|null;
		/**pořadí položky FP blokační agendy*/
		por_cis?: number|null;
		/**identifikátor plánu*/
		ixp_pla?: string|null;
		ixs_fun?: string|null;
		/**Měrná jednotka*/
		mj?: string|null;
		/**Množství*/
		m?: JsonDecimal|null;
		/**typ agendy, která provedla rezervaci na položce*/
		typ_ag_fak?: number|null;
		/**příznak, jak byla vytvořena položka FP  - ze smluv=0 nebo vratka=10*/
		priz_zaz?: number|null;
		/**jméno tabulky s položkama FP*/
		table_pol_fp?: string|null;
		num_pol?: number|null;
		l_num?: number|null;
		/**přístup k položce plánu*/
		acces_cpp?: boolean|null;
	}
	const enum GSmlPolFinDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", cis_pol_pla = "cis_pol_pla", up_stav = "up_stav", nazev = "nazev", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", xuete = "xuete", drd = "drd", polfp = "polfp", rozp = "rozp", rozp0 = "rozp0", rozp1 = "rozp1", blok = "blok", smlfp = "smlfp", ixs_pri = "ixs_pri", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", uea_uc = "uea_uc", ueb_uc = "ueb_uc", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_exist_aktobd = "bu_exist_aktobd", ktg_bu = "ktg_bu", typ_bu = "typ_bu", num_bu = "num_bu", typ_ag_blok = "typ_ag_blok", znam = "znam", por_cis = "por_cis", ixp_pla = "ixp_pla", ixs_fun = "ixs_fun", mj = "mj", m = "m", typ_ag_fak = "typ_ag_fak", priz_zaz = "priz_zaz", table_pol_fp = "table_pol_fp", num_pol = "num_pol", l_num = "l_num", acces_cpp = "acces_cpp",}
	const enum GSmlPolFinDtoFragments { ixp = "*", rok = "*", cislo = "*", cis_pol_pla = "*", up_stav = "*", nazev = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", xuete = "*", drd = "*", polfp = "*", rozp = "*", rozp0 = "*", rozp1 = "*", blok = "*", smlfp = "*", ixs_pri = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", uea_uc = "*", ueb_uc = "*", bu_vl = "*", sk_vl = "*", bu_exist_aktobd = "*", ktg_bu = "*", typ_bu = "*", num_bu = "*", typ_ag_blok = "*", znam = "*", por_cis = "*", ixp_pla = "*", ixs_fun = "*", mj = "*", m = "*", typ_ag_fak = "*", priz_zaz = "*", table_pol_fp = "*", num_pol = "*", l_num = "*", acces_cpp = "*",}
	const enum GSmlPolFinDtoTypes { ixp = "string", rok = "number", cislo = "number", cis_pol_pla = "string", up_stav = "number", nazev = "string", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", xuete = "string", drd = "number", polfp = "Gordic.Sml.Interface.cfc_FinDto", rozp = "Gordic.Sml.Interface.cfc_FinDto", rozp0 = "Gordic.Sml.Interface.cfc_FinDto", rozp1 = "Gordic.Sml.Interface.cfc_FinDto", blok = "Gordic.Sml.Interface.cfc_FinDto", smlfp = "Gordic.Sml.Interface.cfc_FinDto", ixs_pri = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", uea_uc = "string", ueb_uc = "string", bu_vl = "string", sk_vl = "string", bu_exist_aktobd = "boolean", ktg_bu = "number", typ_bu = "number", num_bu = "number", typ_ag_blok = "number", znam = "number", por_cis = "number", ixp_pla = "string", ixs_fun = "string", mj = "string", m = "JsonDecimal", typ_ag_fak = "number", priz_zaz = "number", table_pol_fp = "string", num_pol = "number", l_num = "number", acces_cpp = "boolean",}
	const enum GSmlPolFinDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmldrokDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smldrok - Rozpis částky financování na roky konkrétního dokladu*/
	interface GSmldrokDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Kód měny dle ekocmen*/
		mena?: number|null;
		/**c_mena*/
		c_mena?: JsonDecimal|null;
		/**m*/
		m?: JsonDecimal|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**sml_stav*/
		sml_stav?: number|null;
		/**ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Částka za případ v měně*/
		c_mena_pri?: JsonDecimal|null;
		/**Částka za případ v CZK*/
		c_pri?: JsonDecimal|null;
		/**The c pol*/
		c_pol?: JsonDecimal|null;
		/**The c pol vyd*/
		c_pol_vyd?: JsonDecimal|null;
		/**The c pol pri*/
		c_pol_pri?: JsonDecimal|null;
		/**Agendové číslo dokladu*/
		ac_sml?: string|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmldrokPermissions|null;
	}
	const enum GSmldrokDtoNames { ixp = "ixp", rok = "rok", mena = "mena", c_mena = "c_mena", m = "m", kurz = "kurz", c = "c", sml_stav = "sml_stav", ixp_sml_pri = "ixp_sml_pri", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_mena_pri = "c_mena_pri", c_pri = "c_pri", c_pol = "c_pol", c_pol_vyd = "c_pol_vyd", c_pol_pri = "c_pol_pri", ac_sml = "ac_sml", Permissions = "Permissions",}
	const enum GSmldrokDtoFragments { ixp = "*", rok = "*", mena = "*", c_mena = "*", m = "*", kurz = "*", c = "*", sml_stav = "*", ixp_sml_pri = "*", dat_zmena = "*", zmenu_prov = "*", c_mena_pri = "*", c_pri = "*", c_pol = "*", c_pol_vyd = "*", c_pol_pri = "*", ac_sml = "*", Permissions = "Permissions",}
	const enum GSmldrokDtoTypes { ixp = "string", rok = "number", mena = "number", c_mena = "JsonDecimal", m = "JsonDecimal", kurz = "JsonDecimal", c = "JsonDecimal", sml_stav = "number", ixp_sml_pri = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c_mena_pri = "JsonDecimal", c_pri = "JsonDecimal", c_pol = "JsonDecimal", c_pol_vyd = "JsonDecimal", c_pol_pri = "JsonDecimal", ac_sml = "string", Permissions = "Gordic.Sml.Interface.GSmldrokPermissions",}
	const enum GSmldrokDtoTypeLengths { ixp = 12, ixp_sml_pri = 12, zmenu_prov = 12,}
	/**Rozpis částky financování na roky konkrétního dokladu - ukládací dto*/
	interface GSmldrokUpdateDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Částka v měně*/
		c_mena?: JsonDecimal|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Datum a čas poslední změny dokladu (smlspid)*/
		sdat_zmena?: JsonDate|null;
	}
	const enum GSmldrokUpdateDtoNames { ixp = "ixp", rok = "rok", c_mena = "c_mena", kurz = "kurz", dat_zmena = "dat_zmena", sdat_zmena = "sdat_zmena",}
	const enum GSmldrokUpdateDtoFragments { ixp = "*", rok = "*", c_mena = "*", kurz = "*", dat_zmena = "*", sdat_zmena = "*",}
	const enum GSmldrokUpdateDtoTypes { ixp = "string", rok = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", dat_zmena = "JsonDate", sdat_zmena = "JsonDate",}
	const enum GSmldrokUpdateDtoTypeLengths { ixp = 12,}
	/**Rozpis částky financování na roky konkrétního dokladu - Dto pro přepočet částky rozpisu na roky dle ročního systémového kurzu*/
	interface GSmldrokCPrepocetDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Režim přepočtu: 0 = pouze pro aktuální rok, 1 = pro aktuální a následující roky*/
		rezim?: number|null;
	}
	const enum GSmldrokCPrepocetDtoNames { ixp = "ixp", rok = "rok", rezim = "rezim",}
	const enum GSmldrokCPrepocetDtoFragments { ixp = "*", rok = "*", rezim = "*",}
	const enum GSmldrokCPrepocetDtoTypes { ixp = "string", rok = "number", rezim = "number",}
	const enum GSmldrokCPrepocetDtoTypeLengths { ixp = 12,}
	/**Dto s identifikátorem dokladu, jeho kategorií a číslem dodatku*/
	interface GSmlFinRozpisDokladDto {
		/**Identifikátor dokladu*/
		ixp?: string|null;
		/**Kategorie typu dokladu*/
		ktg_typ?: number|null;
		/**Číslo dodatku*/
		cislo_dod?: number|null;
	}
	const enum GSmlFinRozpisDokladDtoNames { ixp = "ixp", ktg_typ = "ktg_typ", cislo_dod = "cislo_dod",}
	const enum GSmlFinRozpisDokladDtoFragments { ixp = "*", ktg_typ = "*", cislo_dod = "*",}
	const enum GSmlFinRozpisDokladDtoTypes { ixp = "string", ktg_typ = "number", cislo_dod = "number",}
	const enum GSmlFinRozpisDokladDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlEkoParamsDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**GSmlEkoparams - Slovník pro důležité parametry z ekoparams a z sessionInfo, musí se naplnit při použití*/
	interface GSmlEkoSessionParamsDto {
		Rok?: number|null;
		RokDen?: number|null;
		Ico?: string|null;
		Ucs?: string|null;
		KtgDen?: number|null;
		IxsFun?: string|null;
		IxsRef?: string|null;
		IxpDen?: string|null;
	}
	const enum GSmlEkoSessionParamsDtoNames { Rok = "Rok", RokDen = "RokDen", Ico = "Ico", Ucs = "Ucs", KtgDen = "KtgDen", IxsFun = "IxsFun", IxsRef = "IxsRef", IxpDen = "IxpDen",}
	const enum GSmlEkoSessionParamsDtoFragments { Rok = "*", RokDen = "*", Ico = "*", Ucs = "*", KtgDen = "*", IxsFun = "*", IxsRef = "*", IxpDen = "*",}
	const enum GSmlEkoSessionParamsDtoTypes { Rok = "number", RokDen = "number", Ico = "string", Ucs = "string", KtgDen = "number", IxsFun = "string", IxsRef = "string", IxpDen = "string",}
	const enum GSmlEkoSessionParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlEsuVerZakDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro výběr subjektů (a účtů) k veřejné zakázce*/
	interface GSmlEsuVerZakDto {
		ico?: string|null;
		dic?: string|null;
		nazev?: string|null;
		obec?: string|null;
		zkratka?: string|null;
		ixs_esu?: string|null;
		ixp_nab?: string|null;
		bu_ci?: string|null;
		sk_ci?: string|null;
		bu_txt?: string|null;
		rc?: string|null;
		stupen_ver?: number|null;
		typ_esu?: number|null;
		por_cis_nab?: number|null;
		naz_prj?: string|null;
		ixp?: string|null;
		ixs_pri?: string|null;
		typ_ag_blok?: number|null;
	}
	const enum GSmlEsuVerZakDtoNames { ico = "ico", dic = "dic", nazev = "nazev", obec = "obec", zkratka = "zkratka", ixs_esu = "ixs_esu", ixp_nab = "ixp_nab", bu_ci = "bu_ci", sk_ci = "sk_ci", bu_txt = "bu_txt", rc = "rc", stupen_ver = "stupen_ver", typ_esu = "typ_esu", por_cis_nab = "por_cis_nab", naz_prj = "naz_prj", ixp = "ixp", ixs_pri = "ixs_pri", typ_ag_blok = "typ_ag_blok",}
	const enum GSmlEsuVerZakDtoFragments { ico = "*", dic = "*", nazev = "*", obec = "*", zkratka = "*", ixs_esu = "*", ixp_nab = "*", bu_ci = "*", sk_ci = "*", bu_txt = "*", rc = "*", stupen_ver = "*", typ_esu = "*", por_cis_nab = "*", naz_prj = "*", ixp = "*", ixs_pri = "*", typ_ag_blok = "*",}
	const enum GSmlEsuVerZakDtoTypes { ico = "string", dic = "string", nazev = "string", obec = "string", zkratka = "string", ixs_esu = "string", ixp_nab = "string", bu_ci = "string", sk_ci = "string", bu_txt = "string", rc = "string", stupen_ver = "number", typ_esu = "number", por_cis_nab = "number", naz_prj = "string", ixp = "string", ixs_pri = "string", typ_ag_blok = "number",}
	const enum GSmlEsuVerZakDtoTypeLengths { ico = 14, dic = 15, nazev = 100, obec = 48, zkratka = 16, ixs_esu = 30, ixp_nab = 30, bu_ci = 34, sk_ci = 11, bu_txt = 46, rc = 10, naz_prj = 254, ixp = 12, ixs_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlFinancniKontrolaDto.d.ts 

declare namespace Gordic.Sml.Interface {
	interface GEnableDto {
		s_description?: string|null;
		b_value?: boolean|null;
	}
	const enum GEnableDtoNames { s_description = "s_description", b_value = "b_value",}
	const enum GEnableDtoFragments { s_description = "*", b_value = "*",}
	const enum GEnableDtoTypes { s_description = "string", b_value = "boolean",}
	const enum GEnableDtoTypeLengths {}
	/**Financovní kontrola - Parametry pro naplnění Fiannční kontroly ( s FK u P. Smejkala nemá nic společného)*/
	interface GSmlFinancniKontrolaDto {
		enable_pfk_stav?: boolean|null;
		s_description?: string|null;
		ktg_pfk?: number|null;
		enable_prk_stav?: boolean|null;
		enable_prk_podani?: boolean|null;
		enable_pfk_storno?: boolean|null;
		enable_prk_storno?: boolean|null;
		TEMA?: string|null;
		KTGFILTER?: GBaseFilter<number>|null;
		PODANIPK?: boolean|null;
		STORNO_VYRIZ_PK?: boolean|null;
		KTG_TYP?: number|null;
		ROK?: number|null;
		STORNO_VYRIZ?: boolean|null;
		STORNO_VYRIZ_FK?: boolean|null;
		PODANIFK?: boolean|null;
		UPD_c_sch?: JsonDecimal|null;
		UPD_mena?: number|null;
		UPD_c_mena?: JsonDecimal|null;
		UPD_popis?: string|null;
		UPD_ixs_esu?: string|null;
		UPD_ixs_typ?: string|null;
		UPD_ac_ag?: string|null;
		UPD_c_celk?: JsonDecimal|null;
		X0009?: string|null;
		X0002?: string|null;
	}
	const enum GSmlFinancniKontrolaDtoNames { enable_pfk_stav = "enable_pfk_stav", s_description = "s_description", ktg_pfk = "ktg_pfk", enable_prk_stav = "enable_prk_stav", enable_prk_podani = "enable_prk_podani", enable_pfk_storno = "enable_pfk_storno", enable_prk_storno = "enable_prk_storno", TEMA = "TEMA", KTGFILTER = "KTGFILTER", PODANIPK = "PODANIPK", STORNO_VYRIZ_PK = "STORNO_VYRIZ_PK", KTG_TYP = "KTG_TYP", ROK = "ROK", STORNO_VYRIZ = "STORNO_VYRIZ", STORNO_VYRIZ_FK = "STORNO_VYRIZ_FK", PODANIFK = "PODANIFK", UPD_c_sch = "UPD_c_sch", UPD_mena = "UPD_mena", UPD_c_mena = "UPD_c_mena", UPD_popis = "UPD_popis", UPD_ixs_esu = "UPD_ixs_esu", UPD_ixs_typ = "UPD_ixs_typ", UPD_ac_ag = "UPD_ac_ag", UPD_c_celk = "UPD_c_celk", X0009 = "X0009", X0002 = "X0002",}
	const enum GSmlFinancniKontrolaDtoFragments { enable_pfk_stav = "*", s_description = "*", ktg_pfk = "*", enable_prk_stav = "*", enable_prk_podani = "*", enable_pfk_storno = "*", enable_prk_storno = "*", TEMA = "*", KTGFILTER = "*", PODANIPK = "*", STORNO_VYRIZ_PK = "*", KTG_TYP = "*", ROK = "*", STORNO_VYRIZ = "*", STORNO_VYRIZ_FK = "*", PODANIFK = "*", UPD_c_sch = "*", UPD_mena = "*", UPD_c_mena = "*", UPD_popis = "*", UPD_ixs_esu = "*", UPD_ixs_typ = "*", UPD_ac_ag = "*", UPD_c_celk = "*", X0009 = "*", X0002 = "*",}
	const enum GSmlFinancniKontrolaDtoTypes { enable_pfk_stav = "boolean", s_description = "string", ktg_pfk = "number", enable_prk_stav = "boolean", enable_prk_podani = "boolean", enable_pfk_storno = "boolean", enable_prk_storno = "boolean", TEMA = "string", KTGFILTER = "GBaseFilter<number>", PODANIPK = "boolean", STORNO_VYRIZ_PK = "boolean", KTG_TYP = "number", ROK = "number", STORNO_VYRIZ = "boolean", STORNO_VYRIZ_FK = "boolean", PODANIFK = "boolean", UPD_c_sch = "JsonDecimal", UPD_mena = "number", UPD_c_mena = "JsonDecimal", UPD_popis = "string", UPD_ixs_esu = "string", UPD_ixs_typ = "string", UPD_ac_ag = "string", UPD_c_celk = "JsonDecimal", X0009 = "string", X0002 = "string",}
	const enum GSmlFinancniKontrolaDtoTypeLengths {}
	interface GSmlFinKonEnableDto {
		b_value?: boolean|null;
		s_description?: string|null;
	}
	const enum GSmlFinKonEnableDtoNames { b_value = "b_value", s_description = "s_description",}
	const enum GSmlFinKonEnableDtoFragments { b_value = "*", s_description = "*",}
	const enum GSmlFinKonEnableDtoTypes { b_value = "boolean", s_description = "string",}
	const enum GSmlFinKonEnableDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlFinPresunDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro přesun prostředků položky FP na jinou (detail info)*/
	interface GSmlFinPresunDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Číslo položky
		*      Pořadové číslo položky financování
		*/
		cislo?: number|null;
		/**Číslo položky plánu/Akce
		*      Odkaz na položku plánu/akci, ze které je položky FP financována v případě čerpání prostředků přímo z rozpočtu
		*/
		cis_pol_pla?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**SU - Syntetický účet vlastního BÚ*/
		uea?: string|null;
		/**AU - Analytický účet vlastního BÚ*/
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**Xuete*/
		xuete?: string|null;
		/**Druh dokladu*/
		drd?: number|null;
		/**Identifikátor případu nadřazené položky financování*/
		ixp_sml?: string|null;
		/**Rok financování případu nadřazené položky financování*/
		rok_sml?: number|null;
		/**Číslo položky případu nadřazené položky financování*/
		cislo_sml?: number|null;
		/**Su Rozpočtového reprezentanta*/
		uea_rr?: string|null;
		/**Au Rozpočtového reprezentanta*/
		ueb_rr?: string|null;
		/**Su běžného účtu*/
		uea_uc?: string|null;
		/**Au běžného účtu*/
		ueb_uc?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Znaménko
		*      Matematicky prezentuje debit nebo kredit financování
		*/
		znam?: number|null;
		/**Příznak záznamu*/
		priz_zaz?: number|null;
		/**Částka financování*/
		c?: JsonDecimal|null;
		/**Částka*/
		c_pri?: JsonDecimal|null;
		/**Částka*/
		c_rok?: JsonDecimal|null;
		/**Nevyužito*/
		c_fak?: JsonDecimal|null;
		/**Částka*/
		c_obj_sml?: JsonDecimal|null;
		/**Identifikátor případu BLK*/
		ixs_pri?: string|null;
		/**Nevyužito*/
		por_cis?: number|null;
		/**Stav položky*/
		up_stav?: number|null;
		ixs_fun_vyriz?: string|null;
		cis_real?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
	}
	const enum GSmlFinPresunDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", cis_pol_pla = "cis_pol_pla", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", xuete = "xuete", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", uea_uc = "uea_uc", ueb_uc = "ueb_uc", bu_vl = "bu_vl", sk_vl = "sk_vl", znam = "znam", priz_zaz = "priz_zaz", c = "c", c_pri = "c_pri", c_rok = "c_rok", c_fak = "c_fak", c_obj_sml = "c_obj_sml", ixs_pri = "ixs_pri", por_cis = "por_cis", up_stav = "up_stav", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", dat_zmena = "dat_zmena",}
	const enum GSmlFinPresunDtoFragments { ixp = "*", rok = "*", cislo = "*", cis_pol_pla = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", xuete = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", uea_uc = "*", ueb_uc = "*", bu_vl = "*", sk_vl = "*", znam = "*", priz_zaz = "*", c = "*", c_pri = "*", c_rok = "*", c_fak = "*", c_obj_sml = "*", ixs_pri = "*", por_cis = "*", up_stav = "*", ixs_fun_vyriz = "*", cis_real = "*", dat_zmena = "*",}
	const enum GSmlFinPresunDtoTypes { ixp = "string", rok = "number", cislo = "number", cis_pol_pla = "string", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", xuete = "string", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", uea_uc = "string", ueb_uc = "string", bu_vl = "string", sk_vl = "string", znam = "number", priz_zaz = "number", c = "JsonDecimal", c_pri = "JsonDecimal", c_rok = "JsonDecimal", c_fak = "JsonDecimal", c_obj_sml = "JsonDecimal", ixs_pri = "string", por_cis = "number", up_stav = "number", ixs_fun_vyriz = "string", cis_real = "string", dat_zmena = "JsonDate",}
	const enum GSmlFinPresunDtoTypeLengths { ixp = 12, cis_pol_pla = 16, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, xuete = 286, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, uea_uc = 3, ueb_uc = 4, bu_vl = 34, sk_vl = 11, ixs_pri = 12,}
	/**Dto pro přesun prostředků položky FP na jinou (uložení)*/
	interface GSmlFinPresunSaveDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Číslo položky
		*      Pořadové číslo položky financování
		*/
		cislo?: number|null;
		/**Identifikátor cílového dokladu*/
		ixp_cil?: string|null;
		/**Číslo cílové položky
		*      Pořadové číslo položky financování
		*/
		cislo_cil?: number|null;
		/**Převáděná částka*/
		c_pol_prev?: JsonDecimal|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
	}
	const enum GSmlFinPresunSaveDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", ixp_cil = "ixp_cil", cislo_cil = "cislo_cil", c_pol_prev = "c_pol_prev", dat_zmena = "dat_zmena",}
	const enum GSmlFinPresunSaveDtoFragments { ixp = "*", rok = "*", cislo = "*", ixp_cil = "*", cislo_cil = "*", c_pol_prev = "*", dat_zmena = "*",}
	const enum GSmlFinPresunSaveDtoTypes { ixp = "string", rok = "number", cislo = "number", ixp_cil = "string", cislo_cil = "number", c_pol_prev = "JsonDecimal", dat_zmena = "JsonDate",}
	const enum GSmlFinPresunSaveDtoTypeLengths { ixp = 12, ixp_cil = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlGlobalsDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Globals - globální parametry*/
	interface GSmlGlobalsDto {
		/**příznak, že funkce je opravdu kompetent*/
		b_usr_komp: boolean;
		/**příznak, že funkce má definovaného realizátora*/
		b_usr_real: boolean;
		/**aktuální kompetent dle režimu provozu*/
		ixs_fun_komp: string;
		/**globální číslo realizátora - je známo, pokud je režim sml_rez_provoz = Kompetent, Hlavní kompetent*/
		cis_real: string;
		/**aktuální kurzový lístek*/
		ixp_kur: string;
		/**lze editovat?*/
		levelRWBase?: boolean|null;
		/**je aktivní submodel DDP?*/
		submodel_ddp_akt?: boolean|null;
		/**je aktivní submodel PSC?*/
		submodel_psc_akt?: boolean|null;
		/**je aktivní fáze EVZ?*/
		faze_evz_akt?: boolean|null;
		/**je aktivní fáze VFP?*/
		faze_vfp_akt?: boolean|null;
		/**je aktivní fáze EPO?*/
		faze_epo_akt?: boolean|null;
		/**je aktivní fáze RZA?*/
		faze_rza_akt?: boolean|null;
		/**jde o AČR?*/
		isACR?: boolean|null;
		/**maska čísla plánu ve sloupci TE1*/
		te1_msk?: string|null;
		/**příznak, že maska TE1_MSK odpovídá plné délce TE1 - číslo plánu = TE1*/
		b_te1_msk_full?: boolean|null;
		/**start masky čísla plánu v TE1*/
		te1_msk_start?: number|null;
		/**konec masky čísla plánu v TE1*/
		te1_msk_stop?: number|null;
		vad?: Gordic.Sml.Interface.GSmlvadDto[]|null;
		/**licenční certifikát k průběžné finanční kontrole*/
		polLicPFK?: boolean|null;
		/**licenční certifikát k řízenému schvalovacímu procesu*/
		polLicRSP?: boolean|null;
		/**licenční certifikát k financování RZA ze SML*/
		polLicRZA?: boolean|null;
		/**licenční certifikát ke zprávám DSG*/
		polLicDSG?: boolean|null;
		cfc_DocItemsSet?: Gordic.Sml.Interface.GSmlvvadDto|null;
		sml_rez_kur?: string|null;
		priz_iissp?: number|null;
		blok_iissp?: number|null;
		where_Uka?: string|null;
		enable_ddp?: boolean|null;
		datumKurzListek?: JsonDate|null;
		/**definice předpony čísla případu*/
		rcp_prefix: string;
		/**definice přípony čísla případu*/
		rcp_suffix: string;
		/**příznak, zda v definici formátu AC existuje ORJ*/
		rcp_existsORJ: number;
		sml_rad_valpub?: string|null;
		sml_rad_valele?: string|null;
		sml_bnd_smlevz?: string|null;
		dbms?: Gordic.Sml.Interface.BackEnd|null;
		Ikc?: string|null;
	}
	const enum GSmlGlobalsDtoNames { b_usr_komp = "b_usr_komp", b_usr_real = "b_usr_real", ixs_fun_komp = "ixs_fun_komp", cis_real = "cis_real", ixp_kur = "ixp_kur", levelRWBase = "levelRWBase", submodel_ddp_akt = "submodel_ddp_akt", submodel_psc_akt = "submodel_psc_akt", faze_evz_akt = "faze_evz_akt", faze_vfp_akt = "faze_vfp_akt", faze_epo_akt = "faze_epo_akt", faze_rza_akt = "faze_rza_akt", isACR = "isACR", te1_msk = "te1_msk", b_te1_msk_full = "b_te1_msk_full", te1_msk_start = "te1_msk_start", te1_msk_stop = "te1_msk_stop", vad = "vad", polLicPFK = "polLicPFK", polLicRSP = "polLicRSP", polLicRZA = "polLicRZA", polLicDSG = "polLicDSG", cfc_DocItemsSet = "cfc_DocItemsSet", sml_rez_kur = "sml_rez_kur", priz_iissp = "priz_iissp", blok_iissp = "blok_iissp", where_Uka = "where_Uka", enable_ddp = "enable_ddp", datumKurzListek = "datumKurzListek", rcp_prefix = "rcp_prefix", rcp_suffix = "rcp_suffix", rcp_existsORJ = "rcp_existsORJ", sml_rad_valpub = "sml_rad_valpub", sml_rad_valele = "sml_rad_valele", sml_bnd_smlevz = "sml_bnd_smlevz", dbms = "dbms", Ikc = "Ikc",}
	const enum GSmlGlobalsDtoFragments { b_usr_komp = "*", b_usr_real = "*", ixs_fun_komp = "*", cis_real = "*", ixp_kur = "*", levelRWBase = "*", submodel_ddp_akt = "*", submodel_psc_akt = "*", faze_evz_akt = "*", faze_vfp_akt = "*", faze_epo_akt = "*", faze_rza_akt = "*", isACR = "*", te1_msk = "*", b_te1_msk_full = "*", te1_msk_start = "*", te1_msk_stop = "*", vad = "*", polLicPFK = "*", polLicRSP = "*", polLicRZA = "*", polLicDSG = "*", cfc_DocItemsSet = "*", sml_rez_kur = "*", priz_iissp = "*", blok_iissp = "*", where_Uka = "*", enable_ddp = "*", datumKurzListek = "*", rcp_prefix = "*", rcp_suffix = "*", rcp_existsORJ = "*", sml_rad_valpub = "*", sml_rad_valele = "*", sml_bnd_smlevz = "*", dbms = "*", Ikc = "*",}
	const enum GSmlGlobalsDtoTypes { b_usr_komp = "boolean", b_usr_real = "boolean", ixs_fun_komp = "string", cis_real = "string", ixp_kur = "string", levelRWBase = "boolean", submodel_ddp_akt = "boolean", submodel_psc_akt = "boolean", faze_evz_akt = "boolean", faze_vfp_akt = "boolean", faze_epo_akt = "boolean", faze_rza_akt = "boolean", isACR = "boolean", te1_msk = "string", b_te1_msk_full = "boolean", te1_msk_start = "number", te1_msk_stop = "number", vad = "Gordic.Sml.Interface.GSmlvadDto[]", polLicPFK = "boolean", polLicRSP = "boolean", polLicRZA = "boolean", polLicDSG = "boolean", cfc_DocItemsSet = "Gordic.Sml.Interface.GSmlvvadDto", sml_rez_kur = "string", priz_iissp = "number", blok_iissp = "number", where_Uka = "string", enable_ddp = "boolean", datumKurzListek = "JsonDate", rcp_prefix = "string", rcp_suffix = "string", rcp_existsORJ = "number", sml_rad_valpub = "string", sml_rad_valele = "string", sml_bnd_smlevz = "string", dbms = "Gordic.Sml.Interface.BackEnd", Ikc = "string",}
	const enum GSmlGlobalsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlhdphDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlhdph
	*      Historie hodnot DPH
	*/
	interface GSmlhdphDto {
		ixp_sml_pri?: string|null;
		dat_dph_od?: JsonDate|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		dat_dph_do?: JsonDate|null;
		c_mena_z_osv?: JsonDecimal|null;
		c_mena_z_bd?: JsonDecimal|null;
		c_mena_z_ss?: JsonDecimal|null;
		c_mena_z_ns?: JsonDecimal|null;
		c_mena_dph_ss?: JsonDecimal|null;
		c_mena_dph_ns?: JsonDecimal|null;
		c_c_mena_ss?: JsonDecimal|null;
		c_c_mena_ns?: JsonDecimal|null;
		c_c_mena_okr?: JsonDecimal|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		c_mena_dph_3s?: JsonDecimal|null;
		c_mena_dph_4s?: JsonDecimal|null;
		c_mena_z_3s?: JsonDecimal|null;
		c_mena_z_4s?: JsonDecimal|null;
		c_c_mena_3s?: JsonDecimal|null;
		c_c_mena_4s?: JsonDecimal|null;
		c_mena_z_c?: JsonDecimal|null;
		c_mena_dph_c?: JsonDecimal|null;
		c_c_mena_c?: JsonDecimal|null;
	}
	const enum GSmlhdphDtoNames { ixp_sml_pri = "ixp_sml_pri", dat_dph_od = "dat_dph_od", ixp = "ixp", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", c_mena_z_c = "c_mena_z_c", c_mena_dph_c = "c_mena_dph_c", c_c_mena_c = "c_c_mena_c",}
	const enum GSmlhdphDtoFragments { ixp_sml_pri = "*", dat_dph_od = "*", ixp = "*", dat_dph_do = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", dat_zmena = "*", zmenu_prov = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", c_mena_z_c = "*", c_mena_dph_c = "*", c_c_mena_c = "*",}
	const enum GSmlhdphDtoTypes { ixp_sml_pri = "string", dat_dph_od = "JsonDate", ixp = "string", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", c_mena_z_c = "JsonDecimal", c_mena_dph_c = "JsonDecimal", c_c_mena_c = "JsonDecimal",}
	const enum GSmlhdphDtoTypeLengths { ixp_sml_pri = 12, ixp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlHromOperaceDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro různé hromadné operace*/
	interface GSmlHromZmenaUdajuDto {
		/**Seznam dokladů pro změnu údajů*/
		ixps?: string[]|null;
		/**popis*/
		popis?: string|null;
		/**platnost (doba určitá, neurčitá, ...)*/
		typ_platnost?: number|null;
		/**datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**datum ukončení*/
		dat_uko?: JsonDate|null;
		/**související dokument 1*/
		ac_dok_1?: string|null;
		/**související dokument 2*/
		ac_dok_2?: string|null;
		/**účinnost smlouvy - datum nebo text  doručením, ...*/
		ucinnost?: string|null;
		/**ORJ vázané ke smlouvě - pro jaké ORJ je určena*/
		ixs_orj?: string|null;
	}
	const enum GSmlHromZmenaUdajuDtoNames { ixps = "ixps", popis = "popis", typ_platnost = "typ_platnost", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", dat_uko = "dat_uko", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj",}
	const enum GSmlHromZmenaUdajuDtoFragments { ixps = "*", popis = "*", typ_platnost = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", dat_uko = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*",}
	const enum GSmlHromZmenaUdajuDtoTypes { ixps = "string[]", popis = "string", typ_platnost = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", dat_uko = "JsonDate", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string",}
	const enum GSmlHromZmenaUdajuDtoTypeLengths { popis = 254, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12,}
	/**Výstupní dto pro hromadnou změnu údajů dokladů*/
	interface GSmlHromZmenaUdajuResDto {
		/**Identifikátor dokladu*/
		ixp?: string|null;
	}
	const enum GSmlHromZmenaUdajuResDtoNames { ixp = "ixp",}
	const enum GSmlHromZmenaUdajuResDtoFragments { ixp = "*",}
	const enum GSmlHromZmenaUdajuResDtoTypes { ixp = "string",}
	const enum GSmlHromZmenaUdajuResDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlInfoDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Souhrnné dto pro Info o dokladu*/
	interface GSmlInfoDto {
		/**Titulek dialogu*/
		title?: string|null;
		/**Typ dokladu*/
		typ_dok?: number|null;
		/**Textová zkratka měny*/
		mena_zkr?: string|null;
		/**l_ac_sml*/
		l_ac_sml?: string|null;
		/**ktg_sml*/
		ktg_sml?: number|null;
		/**Dto s info pro případ*/
		pripad?: Gordic.Sml.Interface.GSmlInfoStavPripadDto|null;
		/**Dto s info pro doklad*/
		doklad?: Gordic.Sml.Interface.GSmlInfoStavDocDto|null;
	}
	const enum GSmlInfoDtoNames { title = "title", typ_dok = "typ_dok", mena_zkr = "mena_zkr", l_ac_sml = "l_ac_sml", ktg_sml = "ktg_sml", pripad = "pripad", doklad = "doklad",}
	const enum GSmlInfoDtoFragments { title = "*", typ_dok = "*", mena_zkr = "*", l_ac_sml = "*", ktg_sml = "*", pripad = "*", doklad = "*",}
	const enum GSmlInfoDtoTypes { title = "string", typ_dok = "number", mena_zkr = "string", l_ac_sml = "string", ktg_sml = "number", pripad = "Gordic.Sml.Interface.GSmlInfoStavPripadDto", doklad = "Gordic.Sml.Interface.GSmlInfoStavDocDto",}
	const enum GSmlInfoDtoTypeLengths {}
	/**Dto pro Info s daty o případu*/
	interface GSmlInfoStavPripadDto {
		/**Celková částka v měně*/
		p_c_mena?: JsonDecimal|null;
		/**Cena v měně*/
		p_c_mena_doc?: JsonDecimal|null;
		/**Rozpis částky v měně*/
		p_c_mena_roz?: JsonDecimal|null;
		/**Rozpis částky v CZK*/
		p_c_rozpis?: JsonDecimal|null;
		/**Částka položek FP*/
		p_c_pol?: JsonDecimal|null;
		/**Výdaje položek FP v CZK*/
		p_c_pol_vyd?: JsonDecimal|null;
		/**Příjmy položek FP v CZK*/
		p_c_pol_pri?: JsonDecimal|null;
		/**Částka dodatků I*/
		p_c_dod_old?: JsonDecimal|null;
		/**Očekávané čerpání*/
		p_c_fak?: JsonDecimal|null;
		/**Čerpání*/
		p_c_uhr?: JsonDecimal|null;
		/**K převzetí*/
		p_c_diff?: JsonDecimal|null;
		/**Nasmlouváno, objednáno*/
		p_c_pol_akt?: JsonDecimal|null;
		/**Očekávané čerpání*/
		p_c_fak_akt?: JsonDecimal|null;
		/**K uvolnění*/
		p_c_diff_akt?: JsonDecimal|null;
	}
	const enum GSmlInfoStavPripadDtoNames { p_c_mena = "p_c_mena", p_c_mena_doc = "p_c_mena_doc", p_c_mena_roz = "p_c_mena_roz", p_c_rozpis = "p_c_rozpis", p_c_pol = "p_c_pol", p_c_pol_vyd = "p_c_pol_vyd", p_c_pol_pri = "p_c_pol_pri", p_c_dod_old = "p_c_dod_old", p_c_fak = "p_c_fak", p_c_uhr = "p_c_uhr", p_c_diff = "p_c_diff", p_c_pol_akt = "p_c_pol_akt", p_c_fak_akt = "p_c_fak_akt", p_c_diff_akt = "p_c_diff_akt",}
	const enum GSmlInfoStavPripadDtoFragments { p_c_mena = "*", p_c_mena_doc = "*", p_c_mena_roz = "*", p_c_rozpis = "*", p_c_pol = "*", p_c_pol_vyd = "*", p_c_pol_pri = "*", p_c_dod_old = "*", p_c_fak = "*", p_c_uhr = "*", p_c_diff = "*", p_c_pol_akt = "*", p_c_fak_akt = "*", p_c_diff_akt = "*",}
	const enum GSmlInfoStavPripadDtoTypes { p_c_mena = "JsonDecimal", p_c_mena_doc = "JsonDecimal", p_c_mena_roz = "JsonDecimal", p_c_rozpis = "JsonDecimal", p_c_pol = "JsonDecimal", p_c_pol_vyd = "JsonDecimal", p_c_pol_pri = "JsonDecimal", p_c_dod_old = "JsonDecimal", p_c_fak = "JsonDecimal", p_c_uhr = "JsonDecimal", p_c_diff = "JsonDecimal", p_c_pol_akt = "JsonDecimal", p_c_fak_akt = "JsonDecimal", p_c_diff_akt = "JsonDecimal",}
	const enum GSmlInfoStavPripadDtoTypeLengths {}
	/**Dto pro Info s daty o dokladu*/
	interface GSmlInfoStavDocDto {
		/**Celková částka financování v měně*/
		d_c_mena?: JsonDecimal|null;
		/**Celková částka v měně*/
		d_c_mena_doc?: JsonDecimal|null;
		/**Rozpis částky v měně*/
		d_c_mena_roz?: JsonDecimal|null;
		/**Rozpis částky v CZK*/
		d_c_rozpis?: JsonDecimal|null;
		/**Částka položek FP*/
		d_c_pol?: JsonDecimal|null;
		/**Výdaje položek FP v CZK*/
		d_c_pol_vyd?: JsonDecimal|null;
		/**Příjmy položek FP v CZK*/
		d_c_pol_pri?: JsonDecimal|null;
		/**Částka dodatků I*/
		d_c_dod_old?: JsonDecimal|null;
		/**Majetkové plnění celkem*/
		m_c_pol?: JsonDecimal|null;
	}
	const enum GSmlInfoStavDocDtoNames { d_c_mena = "d_c_mena", d_c_mena_doc = "d_c_mena_doc", d_c_mena_roz = "d_c_mena_roz", d_c_rozpis = "d_c_rozpis", d_c_pol = "d_c_pol", d_c_pol_vyd = "d_c_pol_vyd", d_c_pol_pri = "d_c_pol_pri", d_c_dod_old = "d_c_dod_old", m_c_pol = "m_c_pol",}
	const enum GSmlInfoStavDocDtoFragments { d_c_mena = "*", d_c_mena_doc = "*", d_c_mena_roz = "*", d_c_rozpis = "*", d_c_pol = "*", d_c_pol_vyd = "*", d_c_pol_pri = "*", d_c_dod_old = "*", m_c_pol = "*",}
	const enum GSmlInfoStavDocDtoTypes { d_c_mena = "JsonDecimal", d_c_mena_doc = "JsonDecimal", d_c_mena_roz = "JsonDecimal", d_c_rozpis = "JsonDecimal", d_c_pol = "JsonDecimal", d_c_pol_vyd = "JsonDecimal", d_c_pol_pri = "JsonDecimal", d_c_dod_old = "JsonDecimal", m_c_pol = "JsonDecimal",}
	const enum GSmlInfoStavDocDtoTypeLengths {}
	/**Dto pro seznam financování případu v dialogu Info*/
	interface GSmlInfoFinancovaniPripaduDto {
		/**Rok*/
		rok?: number|null;
		/**Nákladové středisko*/
		nks?: string|null;
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
		/**c_10 - pol*/
		c_10?: JsonDecimal|null;
		/**c_16 - obj_sml*/
		c_16?: JsonDecimal|null;
		/**c_18 - res*/
		c_18?: JsonDecimal|null;
		/**c_0*/
		c_0?: JsonDecimal|null;
		/**c_fak_obj*/
		c_fak_obj?: JsonDecimal|null;
		/**c_15*/
		c_15?: JsonDecimal|null;
		/**c_11*/
		c_11?: JsonDecimal|null;
	}
	const enum GSmlInfoFinancovaniPripaduDtoNames { rok = "rok", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_10 = "c_10", c_16 = "c_16", c_18 = "c_18", c_0 = "c_0", c_fak_obj = "c_fak_obj", c_15 = "c_15", c_11 = "c_11",}
	const enum GSmlInfoFinancovaniPripaduDtoFragments { rok = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c_10 = "*", c_16 = "*", c_18 = "*", c_0 = "*", c_fak_obj = "*", c_15 = "*", c_11 = "*",}
	const enum GSmlInfoFinancovaniPripaduDtoTypes { rok = "number", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c_10 = "JsonDecimal", c_16 = "JsonDecimal", c_18 = "JsonDecimal", c_0 = "JsonDecimal", c_fak_obj = "JsonDecimal", c_15 = "JsonDecimal", c_11 = "JsonDecimal",}
	const enum GSmlInfoFinancovaniPripaduDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlMakeCopyDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro vytvoření kopie dokladu*/
	interface GSmlMakeCopyDto {
		/**Identifikátor dokladu pro kopii*/
		ixp?: string|null;
		/**Způsob generování kopie*/
		zpusobGenerovani?: number|null;
		/**Kniha*/
		ixp_den?: string|null;
		/**Agendové číslo*/
		ac_sml?: string|null;
		/**datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**Financování od*/
		fin_od?: number|null;
		/**Financování do*/
		fin_do?: number|null;
		/**Vytvořit nulové záznamy rozpisu na částky na období*/
		cb_rozpis?: boolean|null;
		/**Vytvořit nulové položky finančního profilu*/
		cb_pol_fp?: boolean|null;
		/**Vytvořit nulové položky věcného profilu*/
		cb_pol_vp?: boolean|null;
		/**Vytvořit vazbu na původní případ*/
		cb_bnd_sml?: boolean|null;
	}
	const enum GSmlMakeCopyDtoNames { ixp = "ixp", zpusobGenerovani = "zpusobGenerovani", ixp_den = "ixp_den", ac_sml = "ac_sml", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", cb_rozpis = "cb_rozpis", cb_pol_fp = "cb_pol_fp", cb_pol_vp = "cb_pol_vp", cb_bnd_sml = "cb_bnd_sml",}
	const enum GSmlMakeCopyDtoFragments { ixp = "*", zpusobGenerovani = "*", ixp_den = "*", ac_sml = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", cb_rozpis = "*", cb_pol_fp = "*", cb_pol_vp = "*", cb_bnd_sml = "*",}
	const enum GSmlMakeCopyDtoTypes { ixp = "string", zpusobGenerovani = "number", ixp_den = "string", ac_sml = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", cb_rozpis = "boolean", cb_pol_fp = "boolean", cb_pol_vp = "boolean", cb_bnd_sml = "boolean",}
	const enum GSmlMakeCopyDtoTypeLengths { ixp = 12, ixp_den = 12, ac_sml = 30,}
	/**Výstupní dto pro vytvoření kopie dokladu*/
	interface GSmlMakeCopyResDto {
		/**Identifikátor nového dokladu*/
		ixp?: string|null;
	}
	const enum GSmlMakeCopyResDtoNames { ixp = "ixp",}
	const enum GSmlMakeCopyResDtoFragments { ixp = "*",}
	const enum GSmlMakeCopyResDtoTypes { ixp = "string",}
	const enum GSmlMakeCopyResDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlMakeObjDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro vytvoření podřízené objednávky k dokladu*/
	interface GSmlMakeObjDto {
		/**Identifikátor dokladu pro kopii*/
		ixp?: string|null;
		/**Způsob generování kopie*/
		zpusobGenerovani?: number|null;
		/**Kniha*/
		ixp_den?: string|null;
		/**Agendové číslo*/
		ac_sml?: string|null;
		/**Typ smlouvy*/
		ixs_typ?: string|null;
		/**Kategorie typu smlouvy*/
		ktg_typ?: number|null;
		/**Datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**Datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**Datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**Financování od*/
		fin_od?: number|null;
		/**Financování do*/
		fin_do?: number|null;
		/**Celková smluvní cena v měně*/
		c_mena_doc?: JsonDecimal|null;
		/**Celková částka financování v měně dokladu*/
		c_mena?: JsonDecimal|null;
		/**Vytvořit nulové záznamy rozpisu na částky na období*/
		cb_rozpis?: boolean|null;
		/**Vytvořit nulové položky finančního profilu*/
		cb_pol_fp?: boolean|null;
		/**Vytvořit nulové položky věcného profilu*/
		cb_pol_vp?: boolean|null;
	}
	const enum GSmlMakeObjDtoNames { ixp = "ixp", zpusobGenerovani = "zpusobGenerovani", ixp_den = "ixp_den", ac_sml = "ac_sml", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", c_mena_doc = "c_mena_doc", c_mena = "c_mena", cb_rozpis = "cb_rozpis", cb_pol_fp = "cb_pol_fp", cb_pol_vp = "cb_pol_vp",}
	const enum GSmlMakeObjDtoFragments { ixp = "*", zpusobGenerovani = "*", ixp_den = "*", ac_sml = "*", ixs_typ = "*", ktg_typ = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", c_mena_doc = "*", c_mena = "*", cb_rozpis = "*", cb_pol_fp = "*", cb_pol_vp = "*",}
	const enum GSmlMakeObjDtoTypes { ixp = "string", zpusobGenerovani = "number", ixp_den = "string", ac_sml = "string", ixs_typ = "string", ktg_typ = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", c_mena_doc = "JsonDecimal", c_mena = "JsonDecimal", cb_rozpis = "boolean", cb_pol_fp = "boolean", cb_pol_vp = "boolean",}
	const enum GSmlMakeObjDtoTypeLengths { ixp = 12, ixp_den = 12, ac_sml = 30, ixs_typ = 12,}
	/**Výstupní dto pro vytvoření podřízené objednávky k dokladu*/
	interface GSmlMakeObjResDto {
		/**Identifikátor nového dokladu*/
		ixp?: string|null;
	}
	const enum GSmlMakeObjResDtoNames { ixp = "ixp",}
	const enum GSmlMakeObjResDtoFragments { ixp = "*",}
	const enum GSmlMakeObjResDtoTypes { ixp = "string",}
	const enum GSmlMakeObjResDtoTypeLengths { ixp = 12,}
	/**Vstupní dto pro zjištění disponibilních částek*/
	interface GSmlMakeObjDispReqDto {
		/**Identifikátor dokladu pro vytvoření objednávky*/
		ixp?: string|null;
		/**Částka objednávky*/
		c_mena_doc?: JsonDecimal|null;
		/**Celková částka*/
		c_mena?: JsonDecimal|null;
		/**Režim kontroly (0=mění se cena dokladu, 1=mění se částka dokladu, 2=?)*/
		rezim?: number|null;
	}
	const enum GSmlMakeObjDispReqDtoNames { ixp = "ixp", c_mena_doc = "c_mena_doc", c_mena = "c_mena", rezim = "rezim",}
	const enum GSmlMakeObjDispReqDtoFragments { ixp = "*", c_mena_doc = "*", c_mena = "*", rezim = "*",}
	const enum GSmlMakeObjDispReqDtoTypes { ixp = "string", c_mena_doc = "JsonDecimal", c_mena = "JsonDecimal", rezim = "number",}
	const enum GSmlMakeObjDispReqDtoTypeLengths { ixp = 12,}
	/**Výstupní dto s disponibilními částkami*/
	interface GSmlMakeObjDispResDto {
		/**Disponibilní částka na objednávku*/
		c_mena_doc_disp?: JsonDecimal|null;
		/**Disponibilní celková částka*/
		c_mena_disp?: JsonDecimal|null;
	}
	const enum GSmlMakeObjDispResDtoNames { c_mena_doc_disp = "c_mena_doc_disp", c_mena_disp = "c_mena_disp",}
	const enum GSmlMakeObjDispResDtoFragments { c_mena_doc_disp = "*", c_mena_disp = "*",}
	const enum GSmlMakeObjDispResDtoTypes { c_mena_doc_disp = "JsonDecimal", c_mena_disp = "JsonDecimal",}
	const enum GSmlMakeObjDispResDtoTypeLengths {}
	/**Vstupní dto pro zjištění disponibilních částek*/
	interface GSmlMakeObjGuessIxpDenReqDto {
		/**Ktg_den knihy dokladu*/
		ktg_den?: number|null;
		/**Rok knihy dokladu*/
		rok?: JsonDecimal|null;
	}
	const enum GSmlMakeObjGuessIxpDenReqDtoNames { ktg_den = "ktg_den", rok = "rok",}
	const enum GSmlMakeObjGuessIxpDenReqDtoFragments { ktg_den = "*", rok = "*",}
	const enum GSmlMakeObjGuessIxpDenReqDtoTypes { ktg_den = "number", rok = "JsonDecimal",}
	const enum GSmlMakeObjGuessIxpDenReqDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlsesuDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlsesu - externí subjekt z smlsesu*/
	interface GSmlsesuDto {
		/**DBCOLUMN:smlsesu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlsesu.ixs_esu*/
		ixs_esu_old?: string|null;
		/**DBCOLUMN:smlsesu.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:smlsesu.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:smlsesu.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlsesu.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:smlsesu.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:smlsesu.ixs_esu_zast*/
		ixs_esu_zast?: string|null;
		/**DBCOLUMN:smlsesu.lic_zast_esu*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:smlsesu.por_zast_esu*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:smlsesu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:smlsesu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlsesu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:smlsesu.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlsesu.ixs_dva*/
		ixs_dva?: string|null;
		/**DBCOLUMN:smlsesu.sk_ci*/
		bank_ucet?: string|null;
		/**Vazba na tabulku Ginsesu*/
		GinsEsu?: Gordic.Sml.Interface.GGinsesuDto|null;
		/**Zastoupený*/
		ixs_esu_zast_txt?: string|null;
		/**The ixs esu zast jmeno text*/
		ixs_esu_zast_jmeno_txt?: string|null;
		/**The ixs esu zast prijmeni text*/
		ixs_esu_zast_prijmeni_txt?: string|null;
	}
	const enum GSmlsesuDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", ixs_esu_old = "ixs_esu_old", ico_esu = "ico_esu", ac_esu = "ac_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", typ_vazby = "typ_vazby", ixs_esu_zast = "ixs_esu_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_sml_pri = "ixp_sml_pri", ixs_dva = "ixs_dva", bank_ucet = "bank_ucet", GinsEsu = "GinsEsu", ixs_esu_zast_txt = "ixs_esu_zast_txt", ixs_esu_zast_jmeno_txt = "ixs_esu_zast_jmeno_txt", ixs_esu_zast_prijmeni_txt = "ixs_esu_zast_prijmeni_txt",}
	const enum GSmlsesuDtoFragments { ixp = "*", ixs_esu = "*", ixs_esu_old = "*", ico_esu = "*", ac_esu = "*", sk_ci = "*", bu_ci = "*", typ_vazby = "*", ixs_esu_zast = "*", lic_zast_esu = "*", por_zast_esu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixp_sml_pri = "*", ixs_dva = "*", bank_ucet = "*", GinsEsu = "*", ixs_esu_zast_txt = "*", ixs_esu_zast_jmeno_txt = "*", ixs_esu_zast_prijmeni_txt = "*",}
	const enum GSmlsesuDtoTypes { ixp = "string", ixs_esu = "string", ixs_esu_old = "string", ico_esu = "string", ac_esu = "string", sk_ci = "string", bu_ci = "string", typ_vazby = "number", ixs_esu_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_sml_pri = "string", ixs_dva = "string", bank_ucet = "string", GinsEsu = "Gordic.Sml.Interface.GGinsesuDto", ixs_esu_zast_txt = "string", ixs_esu_zast_jmeno_txt = "string", ixs_esu_zast_prijmeni_txt = "string",}
	const enum GSmlsesuDtoTypeLengths { ixp = 12, ixs_esu = 12, ixs_esu_old = 12, ico_esu = 10, ac_esu = 60, sk_ci = 11, bu_ci = 34, ixs_esu_zast = 12, lic_zast_esu = 4, zmenu_prov = 12, ixp_sml_pri = 12, ixs_dva = 12,}
	/**GReaderSmlsesuDto*/
	interface GReaderSmlsesuDto {
		/**DBCOLUMN:smlsesu.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlsesu.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:smlsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlsesu.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlsesu.bu_ci*/
		bu_ci?: string|null;
		/**Název esu*/
		ixs_esu_txt?: string|null;
		/**Typ esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:smlsesu.ixp*/
		ixp?: string|null;
	}
	const enum GReaderSmlsesuDtoNames { ixp_sml_pri = "ixp_sml_pri", ico_esu = "ico_esu", ixs_esu = "ixs_esu", sk_ci = "sk_ci", bu_ci = "bu_ci", ixs_esu_txt = "ixs_esu_txt", typ_esu = "typ_esu", ixp = "ixp",}
	const enum GReaderSmlsesuDtoFragments { ixp_sml_pri = "*", ico_esu = "*", ixs_esu = "*", sk_ci = "*", bu_ci = "*", ixs_esu_txt = "*", typ_esu = "*", ixp = "*",}
	const enum GReaderSmlsesuDtoTypes { ixp_sml_pri = "string", ico_esu = "string", ixs_esu = "string", sk_ci = "string", bu_ci = "string", ixs_esu_txt = "string", typ_esu = "number", ixp = "string",}
	const enum GReaderSmlsesuDtoTypeLengths { ixp_sml_pri = 12, ico_esu = 10, ixs_esu = 12, sk_ci = 11, bu_ci = 34, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlsiabDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlsiab - žádosti na založení dokladů v SML*/
	interface GSmlsiabDto {
		/**DBCOLUMN:smlsiab.ixp_ext*/
		ixp_ext?: string|null;
		/**DBCOLUMN:smlsiab.typ_ag_ext*/
		typ_ag_ext?: number|null;
		/**DBCOLUMN:smlsiab.stav_dok*/
		stav_dok?: number|null;
		/**DBCOLUMN:smlsiab.ixp_den_p*/
		ixp_den_p?: string|null;
		/**DBCOLUMN:smlsiab.subrada_p*/
		subrada_p?: number|null;
		/**DBCOLUMN:smlsiab.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlsiab.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:smlsiab.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlsiab.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smlsiab.nks*/
		nks?: string|null;
		/**DBCOLUMN:smlsiab.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:smlsiab.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlsiab.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlsiab.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:smlsiab.ac*/
		ac?: string|null;
		/**DBCOLUMN:smlsiab.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlsiab.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlsiab.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlsiab.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:smlsiab.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:smlsiab.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:smlsiab.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlsiab.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:smlsiab.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:smlsiab.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:smlsiab.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:smlsiab.mena*/
		mena?: number|null;
		/**DBCOLUMN:smlsiab.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:smlsiab.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:smlsiab.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:smlsiab.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:smlsiab.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:smlsiab.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:smlsiab.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:smlsiab.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:smlsiab.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:smlsiab.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:smlsiab.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:smlsiab.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:smlsiab.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:smlsiab.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:smlsiab.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:smlsiab.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlsiab.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:smlsiab.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:smlsiab.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:smlsiab.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:smlsiab.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlsiab.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:smlsiab.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:smlsiab.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:smlsiab.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlsiab.c_rok*/
		c_rok?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**DBCOLUMN:smlsiab.dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**DBCOLUMN:smlsiab.c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:smlsiab.vs*/
		vs?: string|null;
		/**DBCOLUMN:smlsiab.c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlsiab.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:smlsiab.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
		/**DBCOLUMN:smlsiab.c_mena_doc*/
		c_mena_doc?: JsonDecimal|null;
		/**Stav dokladu textově*/
		stav_dok_txt?: string|null;
		/**Kniha textově*/
		ixp_den_txt?: string|null;
		/**ESU textově*/
		ixs_esu_txt?: string|null;
		/**typ_esu*/
		typ_esu?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**ixs_fun_vyriz_txt*/
		ixs_fun_vyriz_txt?: string|null;
		/**ixs_fun_ref_txt*/
		ixs_fun_ref_txt?: string|null;
		/**mena_txt*/
		mena_txt?: string|null;
		/**typ_platnost_txt*/
		typ_platnost_txt?: string|null;
		/**ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**ixs_fun_akt_txt*/
		ixs_fun_akt_txt?: string|null;
		/**typ_ceny_txt*/
		typ_ceny_txt?: string|null;
		/**typ_ag_ext_txt*/
		typ_ag_ext_txt?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Sloupec Typ entity (grid)*/
		typ_entity_ico?: Gordic.Wfl.Interface.TypEntityIco|null;
		/**s_fyz*/
		s_fyz?: number|null;
		/**s_ele*/
		s_ele?: number|null;
		/**typ_spis*/
		typ_spis?: number|null;
		/**s_prij*/
		s_prij?: number|null;
		/**priz_cj*/
		priz_cj?: number|null;
		/**puvod*/
		puvod?: number|null;
		/**priz_spis*/
		priz_spis?: number|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**stav_pis*/
		stav_pis?: number|null;
	}
	const enum GSmlsiabDtoNames { ixp_ext = "ixp_ext", typ_ag_ext = "typ_ag_ext", stav_dok = "stav_dok", ixp_den_p = "ixp_den_p", subrada_p = "subrada_p", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", poznamka = "poznamka", soutez = "soutez", ktg_sml = "ktg_sml", mena = "mena", typ_platnost = "typ_platnost", nazev = "nazev", ac_ver_zak = "ac_ver_zak", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", cis_real = "cis_real", ixp_sml = "ixp_sml", ixs_pri = "ixs_pri", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", typ_ag_blok = "typ_ag_blok", por_cis_nab = "por_cis_nab", ixp_nab = "ixp_nab", ixs_fun_akt = "ixs_fun_akt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sk_vl = "sk_vl", bu_vl = "bu_vl", ixp = "ixp", c_rok = "c_rok", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", c_mena_doc = "c_mena_doc", stav_dok_txt = "stav_dok_txt", ixp_den_txt = "ixp_den_txt", ixs_esu_txt = "ixs_esu_txt", typ_esu = "typ_esu", ixs_typ_txt = "ixs_typ_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", mena_txt = "mena_txt", typ_platnost_txt = "typ_platnost_txt", ixs_orj_txt = "ixs_orj_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", typ_ceny_txt = "typ_ceny_txt", typ_ag_ext_txt = "typ_ag_ext_txt", ixb = "ixb", bu_ci_txt = "bu_ci_txt", dokument = "dokument", typ_entity_ico = "typ_entity_ico", s_fyz = "s_fyz", s_ele = "s_ele", typ_spis = "typ_spis", s_prij = "s_prij", priz_cj = "priz_cj", puvod = "puvod", priz_spis = "priz_spis", typ_ag = "typ_ag", stav_pis = "stav_pis",}
	const enum GSmlsiabDtoFragments { ixp_ext = "*", typ_ag_ext = "*", stav_dok = "*", ixp_den_p = "*", subrada_p = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", sk_ci = "*", bu_ci = "*", ac = "*", ac_sml = "*", ktg_typ = "*", ixs_typ = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", poznamka = "*", soutez = "*", ktg_sml = "*", mena = "*", typ_platnost = "*", nazev = "*", ac_ver_zak = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", cis_real = "*", ixp_sml = "*", ixs_pri = "*", c_mena = "*", kurz = "*", m = "*", typ_kurz = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", typ_ceny = "*", typ_ag_blok = "*", por_cis_nab = "*", ixp_nab = "*", ixs_fun_akt = "*", dat_zmena = "*", zmenu_prov = "*", sk_vl = "*", bu_vl = "*", ixp = "*", c_rok = "*", dat_dph_od = "*", dat_dph_do = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", typ_phl = "*", vs = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", dat_sgn = "*", dat_sgn_ext = "*", c_mena_doc = "*", stav_dok_txt = "*", ixp_den_txt = "*", ixs_esu_txt = "*", typ_esu = "*", ixs_typ_txt = "*", ixs_fun_vyriz_txt = "*", ixs_fun_ref_txt = "*", mena_txt = "*", typ_platnost_txt = "*", ixs_orj_txt = "*", ixs_fun_akt_txt = "*", typ_ceny_txt = "*", typ_ag_ext_txt = "*", ixb = "*", bu_ci_txt = "*", dokument = "dokument", typ_entity_ico = "*", s_fyz = "*", s_ele = "*", typ_spis = "*", s_prij = "*", priz_cj = "*", puvod = "*", priz_spis = "*", typ_ag = "*", stav_pis = "*",}
	const enum GSmlsiabDtoTypes { ixp_ext = "string", typ_ag_ext = "number", stav_dok = "number", ixp_den_p = "string", subrada_p = "number", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", ktg_typ = "number", ixs_typ = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", poznamka = "string", soutez = "string", ktg_sml = "number", mena = "number", typ_platnost = "number", nazev = "string", ac_ver_zak = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", cis_real = "string", ixp_sml = "string", ixs_pri = "string", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", typ_ag_blok = "number", por_cis_nab = "number", ixp_nab = "string", ixs_fun_akt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", sk_vl = "string", bu_vl = "string", ixp = "string", c_rok = "JsonDecimal", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", c_mena_doc = "JsonDecimal", stav_dok_txt = "string", ixp_den_txt = "string", ixs_esu_txt = "string", typ_esu = "string", ixs_typ_txt = "string", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", mena_txt = "string", typ_platnost_txt = "string", ixs_orj_txt = "string", ixs_fun_akt_txt = "string", typ_ceny_txt = "string", typ_ag_ext_txt = "string", ixb = "string", bu_ci_txt = "string", dokument = "Gordic.Ssl.Interface.GDokumentDto", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", s_fyz = "number", s_ele = "number", typ_spis = "number", s_prij = "number", priz_cj = "number", puvod = "number", priz_spis = "number", typ_ag = "number", stav_pis = "number",}
	const enum GSmlsiabDtoTypeLengths { ixp_ext = 12, ixp_den_p = 12, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 60, popis = 254, sk_ci = 11, bu_ci = 34, ac = 30, ac_sml = 30, ixs_typ = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka = 500, soutez = 50, nazev = 4000, ac_ver_zak = 30, ac_dok_1 = 20, ac_dok_2 = 20, ucinnost = 20, ixs_orj = 12, cis_real = 6, ixp_sml = 12, ixs_pri = 12, ixp_nab = 12, ixs_fun_akt = 12, zmenu_prov = 12, sk_vl = 11, bu_vl = 34, ixp = 12, typ_phl = 4, vs = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlskalDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlskal - Platební kalendář*/
	interface GSmlskalDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**cis_platby*/
		cis_platby?: number|null;
		/**dat_platby*/
		dat_platby?: JsonDate|null;
		/**Popis*/
		popis?: string|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**status_platby*/
		status_platby?: number|null;
		/**KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		ks?: string|null;
		/**VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs?: string|null;
		/**SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		ss?: string|null;
		/**Způsob platby, používá se k rozlišení jak bude uhrazena očekávaná platba*/
		zp?: number|null;
		/**Bankovní účet cizí - číslo účtu externího subjektu*/
		bu_ci?: string|null;
		/**Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu*/
		sk_ci?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**ktg_platby*/
		ktg_platby?: number|null;
		/**ixs_ste*/
		ixs_ste?: string|null;
		/**dat_vzniku_f*/
		dat_vzniku_f?: JsonDate|null;
		/**dat_splatnost_f*/
		dat_splatnost_f?: JsonDate|null;
		/**dat_vzniku_l*/
		dat_vzniku_l?: JsonDate|null;
		/**dat_splatnost_l*/
		dat_splatnost_l?: JsonDate|null;
		/**c_mena*/
		c_mena?: JsonDecimal|null;
		/**c_predp*/
		c_predp?: JsonDecimal|null;
		/**c_predp_f*/
		c_predp_f?: JsonDecimal|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**ixp_dok*/
		ixp_dok?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**ixp_sml*/
		ixp_sml?: string|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**cislo_sml*/
		cislo_sml?: number|null;
		ixp_sml_pri?: string|null;
		/**Textově způsob platby*/
		zp_txt?: string|null;
		/**Textově externí subjekt*/
		ixs_esu_txt?: string|null;
		/**Textově ktg_platby*/
		ktg_platby_txt?: string|null;
		/**typ_esu*/
		typ_esu?: string|null;
		/**Příznak, zda je záznam uložen v db*/
		flag_DB?: boolean|null;
		/**Počet položek FP pro filtrování zp (Způsob úhrady)*/
		num_pol?: number|null;
		/**Textově ixs_ste*/
		ixs_ste_txt?: string|null;
		/**příznak počtu žádostí*/
		num_poh?: number|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmlskalPermissions|null;
	}
	const enum GSmlskalDtoNames { ixp = "ixp", cis_platby = "cis_platby", dat_platby = "dat_platby", popis = "popis", c = "c", status_platby = "status_platby", ks = "ks", vs = "vs", ss = "ss", zp = "zp", bu_ci = "bu_ci", sk_ci = "sk_ci", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_esu = "ixs_esu", ktg_platby = "ktg_platby", ixs_ste = "ixs_ste", dat_vzniku_f = "dat_vzniku_f", dat_splatnost_f = "dat_splatnost_f", dat_vzniku_l = "dat_vzniku_l", dat_splatnost_l = "dat_splatnost_l", c_mena = "c_mena", c_predp = "c_predp", c_predp_f = "c_predp_f", dat_od = "dat_od", dat_do = "dat_do", ixp_dok = "ixp_dok", aktivita = "aktivita", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixp_sml_pri = "ixp_sml_pri", zp_txt = "zp_txt", ixs_esu_txt = "ixs_esu_txt", ktg_platby_txt = "ktg_platby_txt", typ_esu = "typ_esu", flag_DB = "flag_DB", num_pol = "num_pol", ixs_ste_txt = "ixs_ste_txt", num_poh = "num_poh", Permissions = "Permissions",}
	const enum GSmlskalDtoFragments { ixp = "*", cis_platby = "*", dat_platby = "*", popis = "*", c = "*", status_platby = "*", ks = "*", vs = "*", ss = "*", zp = "*", bu_ci = "*", sk_ci = "*", dat_zmena = "*", zmenu_prov = "*", ixs_esu = "*", ktg_platby = "*", ixs_ste = "*", dat_vzniku_f = "*", dat_splatnost_f = "*", dat_vzniku_l = "*", dat_splatnost_l = "*", c_mena = "*", c_predp = "*", c_predp_f = "*", dat_od = "*", dat_do = "*", ixp_dok = "*", aktivita = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", ixp_sml_pri = "*", zp_txt = "*", ixs_esu_txt = "*", ktg_platby_txt = "*", typ_esu = "*", flag_DB = "*", num_pol = "*", ixs_ste_txt = "*", num_poh = "*", Permissions = "Permissions",}
	const enum GSmlskalDtoTypes { ixp = "string", cis_platby = "number", dat_platby = "JsonDate", popis = "string", c = "JsonDecimal", status_platby = "number", ks = "string", vs = "string", ss = "string", zp = "number", bu_ci = "string", sk_ci = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_esu = "string", ktg_platby = "number", ixs_ste = "string", dat_vzniku_f = "JsonDate", dat_splatnost_f = "JsonDate", dat_vzniku_l = "JsonDate", dat_splatnost_l = "JsonDate", c_mena = "JsonDecimal", c_predp = "JsonDecimal", c_predp_f = "JsonDecimal", dat_od = "JsonDate", dat_do = "JsonDate", ixp_dok = "string", aktivita = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", ixp_sml_pri = "string", zp_txt = "string", ixs_esu_txt = "string", ktg_platby_txt = "string", typ_esu = "string", flag_DB = "boolean", num_pol = "number", ixs_ste_txt = "string", num_poh = "number", Permissions = "Gordic.Sml.Interface.GSmlskalPermissions",}
	const enum GSmlskalDtoTypeLengths { ixp = 12, popis = 50, ks = 12, vs = 12, ss = 12, bu_ci = 34, sk_ci = 11, zmenu_prov = 12, ixs_esu = 12, ixs_ste = 12, ixp_dok = 12, ixp_sml = 12, ixp_sml_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlspacDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlspac - souvisí s přeevidencí*/
	interface GSmlspacDto {
		/**DBCOLUMN:smlspac.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:smlspac.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:smlspac.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlspac.ac*/
		ac?: string|null;
		/**DBCOLUMN:smlspac.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:smlspac.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:smlspac.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlspac.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSmlspacDtoNames { ixp_den = "ixp_den", por_cislo = "por_cislo", ixp = "ixp", ac = "ac", dat_evid = "dat_evid", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSmlspacDtoFragments { ixp_den = "*", por_cislo = "*", ixp = "*", ac = "*", dat_evid = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSmlspacDtoTypes { ixp_den = "string", por_cislo = "number", ixp = "string", ac = "string", dat_evid = "JsonDate", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSmlspacDtoTypeLengths { ixp_den = 12, ixp = 12, ac = 30, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlspidDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Sankce pro smlspid*/
	interface GSmlSankceDto {
		/**The ixp*/
		ixp?: string|null;
		/**The typ pen*/
		typ_pen?: number|null;
		/**The proc sazba pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**The c sazba pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**The zak upr*/
		zak_upr?: number|null;
		/**The typ alg*/
		typ_alg?: number|null;
		/**The priz spo*/
		priz_spo?: number|null;
		/**The priz uroc*/
		priz_uroc?: number|null;
		/**The typ spo*/
		typ_spo?: number|null;
		/**The c spo*/
		c_spo?: JsonDecimal|null;
		/**The proc spo*/
		proc_spo?: JsonDecimal|null;
	}
	const enum GSmlSankceDtoNames { ixp = "ixp", typ_pen = "typ_pen", proc_sazba_pen = "proc_sazba_pen", c_sazba_pen = "c_sazba_pen", zak_upr = "zak_upr", typ_alg = "typ_alg", priz_spo = "priz_spo", priz_uroc = "priz_uroc", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo",}
	const enum GSmlSankceDtoFragments { ixp = "*", typ_pen = "*", proc_sazba_pen = "*", c_sazba_pen = "*", zak_upr = "*", typ_alg = "*", priz_spo = "*", priz_uroc = "*", typ_spo = "*", c_spo = "*", proc_spo = "*",}
	const enum GSmlSankceDtoTypes { ixp = "string", typ_pen = "number", proc_sazba_pen = "JsonDecimal", c_sazba_pen = "JsonDecimal", zak_upr = "number", typ_alg = "number", priz_spo = "number", priz_uroc = "number", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal",}
	const enum GSmlSankceDtoTypeLengths {}
	/**Dto rok smluvního případu*/
	interface GSml_RokDto {
		/**rok smluvního případu*/
		rok?: number|null;
		/**identifikace plánu*/
		ixp_pla?: string|null;
		/**The kurz na měnu*/
		kurz?: JsonDecimal|null;
		/**množství měny*/
		m?: JsonDecimal|null;
		/**Typ měny*/
		mena?: number|null;
		/**Cena v cizí měně*/
		c_mena?: JsonDecimal|null;
		/**Cena v Kč*/
		c?: JsonDecimal|null;
		/**cena položek pro daný rok v Kč*/
		c_pol?: JsonDecimal|null;
		/**stav rozpisu v daném roce*/
		sml_stav?: number|null;
		/**vlastní BÚ - pouze kvůli SP*/
		bu_vl?: string|null;
		/**směrový kód vlastního BÚ - pouze kvůli SP*/
		sk_vl?: string|null;
		/**suma vázaných objednávek na smlouvu za daný rok*/
		c_obj?: JsonDecimal|null;
		/**cena za vázané faktury na smlouvu v Kč za daný rok*/
		c_fak?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu za daný rok*/
		c_vz?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ za daný rok*/
		c_sml?: JsonDecimal|null;
		/**částka objednávek vázaných na smlouvu v Kč za daný rok*/
		c_objsml?: JsonDecimal|null;
		/**počet položek smlouvy za daný rok*/
		num_pol?: number|null;
		/**cena platebního kalndáře za období*/
		c_kal?: JsonDecimal|null;
		/**cena platebního kalndáře za období v dané měně*/
		c_mena_kal?: JsonDecimal|null;
		/**součet položek odpovídajících typu dokladu = krytí*/
		c_pol_norm?: JsonDecimal|null;
		/**součet rezervace položek odpovídajících typu dokladu = krytí*/
		c_fak_norm?: JsonDecimal|null;
		/**součet položek odpovídajících typu dokladu = vratky*/
		c_pol_anti?: JsonDecimal|null;
		/**součet rezervace položek odpovídajících typu dokladu = vratky*/
		c_fak_anti?: JsonDecimal|null;
		/**částka za smlouvy vázané na rámcovou smlouvu za daný rok*/
		c_smlRS_bnd?: JsonDecimal|null;
		/**disponibilní částka*/
		c_disp?: JsonDecimal|null;
	}
	const enum GSml_RokDtoNames { rok = "rok", ixp_pla = "ixp_pla", kurz = "kurz", m = "m", mena = "mena", c_mena = "c_mena", c = "c", c_pol = "c_pol", sml_stav = "sml_stav", bu_vl = "bu_vl", sk_vl = "sk_vl", c_obj = "c_obj", c_fak = "c_fak", c_vz = "c_vz", c_sml = "c_sml", c_objsml = "c_objsml", num_pol = "num_pol", c_kal = "c_kal", c_mena_kal = "c_mena_kal", c_pol_norm = "c_pol_norm", c_fak_norm = "c_fak_norm", c_pol_anti = "c_pol_anti", c_fak_anti = "c_fak_anti", c_smlRS_bnd = "c_smlRS_bnd", c_disp = "c_disp",}
	const enum GSml_RokDtoFragments { rok = "*", ixp_pla = "*", kurz = "*", m = "*", mena = "*", c_mena = "*", c = "*", c_pol = "*", sml_stav = "*", bu_vl = "*", sk_vl = "*", c_obj = "*", c_fak = "*", c_vz = "*", c_sml = "*", c_objsml = "*", num_pol = "*", c_kal = "*", c_mena_kal = "*", c_pol_norm = "*", c_fak_norm = "*", c_pol_anti = "*", c_fak_anti = "*", c_smlRS_bnd = "*", c_disp = "*",}
	const enum GSml_RokDtoTypes { rok = "number", ixp_pla = "string", kurz = "JsonDecimal", m = "JsonDecimal", mena = "number", c_mena = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", sml_stav = "number", bu_vl = "string", sk_vl = "string", c_obj = "JsonDecimal", c_fak = "JsonDecimal", c_vz = "JsonDecimal", c_sml = "JsonDecimal", c_objsml = "JsonDecimal", num_pol = "number", c_kal = "JsonDecimal", c_mena_kal = "JsonDecimal", c_pol_norm = "JsonDecimal", c_fak_norm = "JsonDecimal", c_pol_anti = "JsonDecimal", c_fak_anti = "JsonDecimal", c_smlRS_bnd = "JsonDecimal", c_disp = "JsonDecimal",}
	const enum GSml_RokDtoTypeLengths {}
	/**Vazba případu na blokační agendy*/
	interface GSml_BlkDto {
		/**vazba případu na případ blokační agendy*/
		ixs_pri?: string|null;
		/**vazba případu nabídku blokační agendy*/
		ixp_nab?: string|null;
		/**typ blokační agendy EVZ, VFP, EPO ( ng_typagblokEVZ, ... )*/
		typ_ag_blok?: number|null;
		/**The vys riz*/
		vys_riz?: number|null;
		/**The s ess*/
		s_ess?: number|null;
	}
	const enum GSml_BlkDtoNames { ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", typ_ag_blok = "typ_ag_blok", vys_riz = "vys_riz", s_ess = "s_ess",}
	const enum GSml_BlkDtoFragments { ixs_pri = "*", ixp_nab = "*", typ_ag_blok = "*", vys_riz = "*", s_ess = "*",}
	const enum GSml_BlkDtoTypes { ixs_pri = "string", ixp_nab = "string", typ_ag_blok = "number", vys_riz = "number", s_ess = "number",}
	const enum GSml_BlkDtoTypeLengths {}
	/**/// Financování smluvního případu*/
	interface GSml_FinDto {
		/**Agendové číslo případu*/
		ac_sml?: string|null;
		/**The ico*/
		ico?: string|null;
		/**The ico*/
		ixs_esu_ico?: string|null;
		/**The ucs*/
		ucs?: string|null;
		/**The NKS*/
		nks?: string|null;
		/**Celková částka financování v měně dokladu*/
		c_mena?: JsonDecimal|null;
		/**celková smluvní částka  v měně*/
		c_mena_doc?: JsonDecimal|null;
		/**celkový rozpis částky na roky v CZK*/
		c?: JsonDecimal|null;
		/**Celkový součet částek položek  FP v CZK*/
		c_pol?: JsonDecimal|null;
		/**typ měny*/
		mena?: number|null;
		/**kategorie smlouvy*/
		ktg_sml?: number|null;
		/**Datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**Datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**Datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**kompetent smlouvy*/
		ixs_fun_vyriz?: string|null;
		/**vyřizující referent*/
		ixs_fun_ref?: string|null;
		/**číslo realizátora smlouvy*/
		cis_real?: string|null;
		/**proměnné vazby na BLK přesunuty do recordu*/
		smlblk?: Gordic.Sml.Interface.GSml_BlkDto|null;
		/**Financování od*/
		fin_od?: number|null;
		/**Financování do*/
		fin_do?: number|null;
		/**stav podepsání nebo-li formalizace*/
		sgn_stav?: number|null;
		/**pevná, volná*/
		typ_ceny?: number|null;
		/**rok uzavření smlouvy*/
		rok?: number|null;
		/**jeden rok smluvního případu - aktuální účetní období*/
		smlrok?: Gordic.Sml.Interface.GSml_RokDto|null;
		/**TODO*/
		sdat_uzavreni?: string|null;
		/**TODO*/
		sdat_platnost?: string|null;
		/**TODO*/
		sdat_ucinnost?: string|null;
		/**TODO*/
		num_pol?: number|null;
		/**TODO*/
		num_pol_sch?: number|null;
		/**počet položek FP případu v daném roce, které jsou či mají být rezervovány v IISSP*/
		num_pol_iissp?: number|null;
		/**počet roků smlouvy - pro potřeby inicializace počtu roků rozpisu smlouvy*/
		num_rok?: number|null;
		/**celková částka rozpisu smlouvy na roky v dané měně*/
		c_mena_rok_sum?: JsonDecimal|null;
		/**maximální rok financování = zadaných položek*/
		max_rok_pol?: number|null;
		c_kal?: JsonDecimal|null;
		/**suma prostředků VZ vázané na smlouvu*/
		c_vz?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu*/
		c_obj?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu*/
		c_dod_bnd?: JsonDecimal|null;
		/**cena za smlouvy vázané na VZ*/
		c_sml?: JsonDecimal|null;
		/**suma objednávek vázaných na smlouvu v dané měně*/
		c_obj_mena?: JsonDecimal|null;
		/**suma dodatků vázaných na smlouvu v dané měně*/
		c_dod_bnd_mena?: JsonDecimal|null;
		/**suma smluv vázaných na rámcovou smlouvu*/
		c_smlRS_bnd?: JsonDecimal|null;
		/**suma smluv vázaných na rámcovou smlouvu v dané měně*/
		c_smlRS_bnd_mena?: JsonDecimal|null;
		/**počet vázaných smluv na RS*/
		num_smlRS_bnd?: number|null;
		popis?: string|null;
		/**cena rezervací vázaných na doklad v Kč*/
		c_fak?: JsonDecimal|null;
		/**typ smlouvy*/
		ixs_typ?: string|null;
		/**přesný název smlouvy 359.1 změna z nazev_sml na nazev*/
		nazev?: string|null;
		/**číslo veřejné zakázky, dotačního titulu*/
		ac_ver_zak?: string|null;
		/**cena položek věcného profilu případu*/
		c_sml_vp?: JsonDecimal|null;
		/**cena položek věcného profilu případu v měně - 384.7*/
		c_sml_mena_vp?: JsonDecimal|null;
		/**příznak účtování o podmíněných Závazcích/Pohledávkách - ng_prizpzpNo, ng_prizpzpYes*/
		priz_pzp?: number|null;
		/**TODO*/
		dat_dph_od?: JsonDate|null;
		/**TODO*/
		dat_dph_do?: JsonDate|null;
		/**TODO*/
		c_mena_z_osv?: JsonDecimal|null;
		/**TODO*/
		c_mena_z_bd?: JsonDecimal|null;
		/**TODO*/
		c_mena_z_ss?: JsonDecimal|null;
		/**TODO*/
		c_mena_z_ns?: JsonDecimal|null;
		/**TODO*/
		c_mena_dph_ss?: JsonDecimal|null;
		c_mena_dph_ns?: JsonDecimal|null;
		/**TODO*/
		c_c_mena_ss?: JsonDecimal|null;
		/**TODO*/
		c_c_mena_ns?: JsonDecimal|null;
		/**TODO*/
		c_c_mena_okr?: JsonDecimal|null;
		/**TODO*/
		sdat_dph_od?: string|null;
		/**TODO*/
		sdat_dph_do?: string|null;
		/**typ pohledávky*/
		typ_phl?: string|null;
		/**vyriabilní symbol*/
		vs?: string|null;
		/**podpora 3. a 4. sazby DPH*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**podpora 3. a 4. sazby DPH*/
		c_mena_dph_4s?: JsonDecimal|null;
		c_mena_z_3s?: JsonDecimal|null;
		/**TODO*/
		c_mena_z_4s?: JsonDecimal|null;
		/**TODO*/
		c_c_mena_3s?: JsonDecimal|null;
		/**TODO*/
		c_c_mena_4s?: JsonDecimal|null;
		/**číslo maximálního dodatku smlouvy*/
		cislo_dod_max?: number|null;
		/**stav dokladu/případu*/
		sml_stav?: number|null;
		/**TODO*/
		exists?: number|null;
		/**počet položek financovaných z rozpočtových účtů*/
		finFromRoz?: number|null;
		/**identifikátor dokladu nebo případu*/
		ixp_?: string|null;
		/**jméno tabulky s finančním profilem*/
		table_doc_?: string|null;
		/**jméno tabulky s rozpisem na roky*/
		table_rok_?: string|null;
		/**jméno tabulky s položkama FP*/
		table_pol_fp_?: string|null;
		/**jméno tabulky s platebním kalendářem*/
		table_kal_?: string|null;
		/**nápočet limitů realizátorů*/
		limit_real?: Gordic.Sml.Interface.GSml_RokDto|null;
		/**nápočet limitů realizátorů*/
		limit_real_rok?: Gordic.Sml.Interface.GSml_RokDto|null;
		/**TODO*/
		dat_rad_iissp?: JsonDate|null;
		/**TODO*/
		sdat_rad_iissp?: string|null;
		/**Příznak pro OPCE*/
		priz_opce?: number|null;
	}
	const enum GSml_FinDtoNames { ac_sml = "ac_sml", ico = "ico", ixs_esu_ico = "ixs_esu_ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c_mena_doc = "c_mena_doc", c = "c", c_pol = "c_pol", mena = "mena", ktg_sml = "ktg_sml", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", smlblk = "smlblk", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", rok = "rok", smlrok = "smlrok", sdat_uzavreni = "sdat_uzavreni", sdat_platnost = "sdat_platnost", sdat_ucinnost = "sdat_ucinnost", num_pol = "num_pol", num_pol_sch = "num_pol_sch", num_pol_iissp = "num_pol_iissp", num_rok = "num_rok", c_mena_rok_sum = "c_mena_rok_sum", max_rok_pol = "max_rok_pol", c_kal = "c_kal", c_vz = "c_vz", c_obj = "c_obj", c_dod_bnd = "c_dod_bnd", c_sml = "c_sml", c_obj_mena = "c_obj_mena", c_dod_bnd_mena = "c_dod_bnd_mena", c_smlRS_bnd = "c_smlRS_bnd", c_smlRS_bnd_mena = "c_smlRS_bnd_mena", num_smlRS_bnd = "num_smlRS_bnd", popis = "popis", c_fak = "c_fak", ixs_typ = "ixs_typ", nazev = "nazev", ac_ver_zak = "ac_ver_zak", c_sml_vp = "c_sml_vp", c_sml_mena_vp = "c_sml_mena_vp", priz_pzp = "priz_pzp", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", sdat_dph_od = "sdat_dph_od", sdat_dph_do = "sdat_dph_do", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", cislo_dod_max = "cislo_dod_max", sml_stav = "sml_stav", exists = "exists", finFromRoz = "finFromRoz", ixp_ = "ixp_", table_doc_ = "table_doc_", table_rok_ = "table_rok_", table_pol_fp_ = "table_pol_fp_", table_kal_ = "table_kal_", limit_real = "limit_real", limit_real_rok = "limit_real_rok", dat_rad_iissp = "dat_rad_iissp", sdat_rad_iissp = "sdat_rad_iissp", priz_opce = "priz_opce",}
	const enum GSml_FinDtoFragments { ac_sml = "*", ico = "*", ixs_esu_ico = "*", ucs = "*", nks = "*", c_mena = "*", c_mena_doc = "*", c = "*", c_pol = "*", mena = "*", ktg_sml = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", cis_real = "*", smlblk = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", typ_ceny = "*", rok = "*", smlrok = "*", sdat_uzavreni = "*", sdat_platnost = "*", sdat_ucinnost = "*", num_pol = "*", num_pol_sch = "*", num_pol_iissp = "*", num_rok = "*", c_mena_rok_sum = "*", max_rok_pol = "*", c_kal = "*", c_vz = "*", c_obj = "*", c_dod_bnd = "*", c_sml = "*", c_obj_mena = "*", c_dod_bnd_mena = "*", c_smlRS_bnd = "*", c_smlRS_bnd_mena = "*", num_smlRS_bnd = "*", popis = "*", c_fak = "*", ixs_typ = "*", nazev = "*", ac_ver_zak = "*", c_sml_vp = "*", c_sml_mena_vp = "*", priz_pzp = "*", dat_dph_od = "*", dat_dph_do = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", sdat_dph_od = "*", sdat_dph_do = "*", typ_phl = "*", vs = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", cislo_dod_max = "*", sml_stav = "*", exists = "*", finFromRoz = "*", ixp_ = "*", table_doc_ = "*", table_rok_ = "*", table_pol_fp_ = "*", table_kal_ = "*", limit_real = "*", limit_real_rok = "*", dat_rad_iissp = "*", sdat_rad_iissp = "*", priz_opce = "*",}
	const enum GSml_FinDtoTypes { ac_sml = "string", ico = "string", ixs_esu_ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c_mena_doc = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", mena = "number", ktg_sml = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", smlblk = "Gordic.Sml.Interface.GSml_BlkDto", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", rok = "number", smlrok = "Gordic.Sml.Interface.GSml_RokDto", sdat_uzavreni = "string", sdat_platnost = "string", sdat_ucinnost = "string", num_pol = "number", num_pol_sch = "number", num_pol_iissp = "number", num_rok = "number", c_mena_rok_sum = "JsonDecimal", max_rok_pol = "number", c_kal = "JsonDecimal", c_vz = "JsonDecimal", c_obj = "JsonDecimal", c_dod_bnd = "JsonDecimal", c_sml = "JsonDecimal", c_obj_mena = "JsonDecimal", c_dod_bnd_mena = "JsonDecimal", c_smlRS_bnd = "JsonDecimal", c_smlRS_bnd_mena = "JsonDecimal", num_smlRS_bnd = "number", popis = "string", c_fak = "JsonDecimal", ixs_typ = "string", nazev = "string", ac_ver_zak = "string", c_sml_vp = "JsonDecimal", c_sml_mena_vp = "JsonDecimal", priz_pzp = "number", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", sdat_dph_od = "string", sdat_dph_do = "string", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", cislo_dod_max = "number", sml_stav = "number", exists = "number", finFromRoz = "number", ixp_ = "string", table_doc_ = "string", table_rok_ = "string", table_pol_fp_ = "string", table_kal_ = "string", limit_real = "Gordic.Sml.Interface.GSml_RokDto", limit_real_rok = "Gordic.Sml.Interface.GSml_RokDto", dat_rad_iissp = "JsonDate", sdat_rad_iissp = "string", priz_opce = "number",}
	const enum GSml_FinDtoTypeLengths {}
	/**Wflpid pro Sml*/
	interface GWflpidDto {
		/**The ixp*/
		ixp?: string|null;
		/**The lic*/
		lic?: string|null;
		/**The ixs fun akt*/
		ixs_fun_akt?: string|null;
		/**The ixs su akt*/
		ixs_su_akt?: string|null;
		/**The nazev*/
		nazev?: string|null;
		/**The akt znacka*/
		akt_znacka?: string|null;
		/**stav distribuce dokumentu*/
		stav_dist?: number|null;
		/**The stav pis*/
		stav_pis?: number|null;
		/**The typ ag*/
		typ_ag?: number|null;
		/**příznak, zda písemnost má el. podobu*/
		s_ele?: number|null;
		/**příznak, zda pís. má fyzickou podobu*/
		s_fyz?: number|null;
		/**příznak, že se jedná o přijatou či vlastní písemnost*/
		s_prij?: number|null;
		/**příznak, zda je el. písenost podepsaná*/
		s_sgn?: number|null;
		/**The uzo*/
		uzo?: string|null;
		/**spisový plán*/
		spis_pl?: string|null;
		/**The spis znak*/
		spis_znak?: string|null;
		/**The ixs fun WFL*/
		ixs_fun_wfl?: string|null;
		/**The ixs su WFL*/
		ixs_su_wfl?: string|null;
		/**příznak režimu přístupu k dokumentu*/
		st_utaj_id?: number|null;
		/**příznak čtení el. dok*/
		ele_read?: number|null;
		/**příznak zápisu el. dok*/
		ele_write?: number|null;
		/**příznak možnosti změny oprávnění*/
		ele_zmena_opr?: number|null;
		/**typ přístupu k el. dok*/
		ele_typ_pristup?: number|null;
		/**ident. el. obrazu*/
		ixb?: string|null;
		/**The COM mode*/
		com_mode?: number|null;
		/**Typ dokladu*/
		ktg_typ?: number|null;
		/**Předdefinovaný typ dokladu*/
		ixs_typ_def?: string|null;
		/**Příznak původu dokumentu - 0=ruční podání, 10=elektronické podání,20=datová schránka,30=interface*/
		puvod?: number|null;
		/**příznak, že záznam s daným IXP již byl přečten. Inicializace na FALSe v _init, TRUE nastaví select*/
		is_selected?: boolean|null;
		/**příznak, zda je ele dokument uzamčen*/
		priz_ro?: number|null;
		/**The stav sda*/
		stav_sda?: number|null;
		/**The priz check*/
		priz_check?: number|null;
		/**The ixs fun check*/
		ixs_fun_check?: string|null;
		/**příznak, že doklad je kopie*/
		s_kopie?: number|null;
		/**příznak stavu dokumentu ve spisu*/
		priz_spis?: number|null;
		/**The n1*/
		n1?: number|null;
		/**The dat zmena*/
		dat_zmena?: JsonDate|null;
		/**The sdat zmena*/
		sdat_zmena?: string|null;
		/**příznak schválení, od verze 360XXX006x37*/
		s_schval?: number|null;
		/**wflspid.umisteni, odkaz do SSLSUMP, případně SSLSUMI (vazba umístění na SU) - pokud je null, je naplněno konstantou '0000AWM00000'
		*      364.1 record pro řízení přístupu k detaili dokladu a el. dokumentům k němu vázaným
		*/
		umisteni?: string|null;
		/**record pro řízení přístupu k detaili dokladu a el. dokumentům k němu vázaným*/
		acc?: Gordic.Sml.Interface.GSml_WflAccessDto|null;
		/**publikována aktuální verze el. obrazu*/
		pub_akt?: number|null;
		/**publikována některá z minulých verzí el. obrazu*/
		pub_hst?: number|null;
		/**Počet zveřejnění*/
		num_zverejneni?: number|null;
		/**počet nevyřízených dokumentů v EPK*/
		epk_nevyriz?: number|null;
		/**počet žádostí EPK vrácených k přepracování*/
		epk_vrac?: number|null;
		/**The poc listu*/
		poc_listu?: string|null;
		/**The poc stran*/
		poc_stran?: number|null;
		/**The poc kop*/
		poc_kop?: number|null;
		/**The poc priloh*/
		poc_priloh?: number|null;
		/**The poc l priloh*/
		poc_l_priloh?: string|null;
		/**Značka*/
		cj?: string|null;
		/**ID externího systému*/
		ixs_ext?: string|null;
		/**The ico*/
		ico?: string|null;
		/**Příznak že dokument je v balíku*/
		priz_zup?: number|null;
		/**The rok skartace*/
		rok_skartace?: number|null;
		/**popis spouštěcí události wfldpsu*/
		popis_spo_uda?: string|null;
		/**rok spouštěcí události wflspid*/
		rok_spo_uda?: number|null;
		/**ID spouštěcí události wlfspid*/
		ixs_spu?: string|null;
		/**pozastavení skartační operace a důvod  - wflvpso*/
		priz_poz_skar?: number|null;
		/**The duvod poz skar*/
		duvod_poz_skar?: string|null;
		/**The skar znak*/
		skar_znak?: string|null;
		/**The skar lhuta*/
		skar_lhuta?: number|null;
		/**The ixs typ*/
		ixs_typ?: string|null;
		/**The dat vyriz*/
		dat_vyriz?: JsonDate|null;
		/**The sdat vyriz*/
		sdat_vyriz?: string|null;
		/**The misto vzniku*/
		misto_vzniku?: string|null;
		/**hrubá kategorizace typu změny při zápisu do historie u prováděné operace - wflczkt.zmena_ktg*/
		zmena_ktg?: number|null;
		/**The plan zve*/
		plan_zve?: number|null;
		/**382.7 31.05.19 - rok, dokdy je pozastavena skartace*/
		rok_do_skar?: number|null;
		/**382.9 24.07.19 přednastavený spisový plán a znak*/
		spis_pl_pre?: string|null;
		/**The spis znak pre*/
		spis_znak_pre?: string|null;
		/**The s text*/
		s_txt?: string|null;
		/**384.9 03.03.20 text informace související s nemožností přístupu k dokumentu*/
		warning_wfl_pristup?: string|null;
		/**(IXP ke kterému spisu je dokument přiřazen ) bude naplněno v případě, že je dokument přiřazen do spisu. Pokud nebude přiřazen, bude ve sloupci null.*/
		ixp_spis_prir?: string|null;
		/**wflsixp.status_pis - 0=aktivní dokument*/
		status_pis?: number|null;
		/**!spisová značka, ke ketrému je přiřazen nebo kam je vložen spis*/
		spis_zn?: string|null;
		/**ixp spisu*/
		ixp_spis?: string|null;
		/**The log por cislo*/
		log_por_cislo?: number|null;
	}
	const enum GWflpidDtoNames { ixp = "ixp", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", s_ele = "s_ele", s_fyz = "s_fyz", s_prij = "s_prij", s_sgn = "s_sgn", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", ixs_su_wfl = "ixs_su_wfl", st_utaj_id = "st_utaj_id", ele_read = "ele_read", ele_write = "ele_write", ele_zmena_opr = "ele_zmena_opr", ele_typ_pristup = "ele_typ_pristup", ixb = "ixb", com_mode = "com_mode", ktg_typ = "ktg_typ", ixs_typ_def = "ixs_typ_def", puvod = "puvod", is_selected = "is_selected", priz_ro = "priz_ro", stav_sda = "stav_sda", priz_check = "priz_check", ixs_fun_check = "ixs_fun_check", s_kopie = "s_kopie", priz_spis = "priz_spis", n1 = "n1", dat_zmena = "dat_zmena", sdat_zmena = "sdat_zmena", s_schval = "s_schval", umisteni = "umisteni", acc = "acc", pub_akt = "pub_akt", pub_hst = "pub_hst", num_zverejneni = "num_zverejneni", epk_nevyriz = "epk_nevyriz", epk_vrac = "epk_vrac", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ixs_ext = "ixs_ext", ico = "ico", priz_zup = "priz_zup", rok_skartace = "rok_skartace", popis_spo_uda = "popis_spo_uda", rok_spo_uda = "rok_spo_uda", ixs_spu = "ixs_spu", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", ixs_typ = "ixs_typ", dat_vyriz = "dat_vyriz", sdat_vyriz = "sdat_vyriz", misto_vzniku = "misto_vzniku", zmena_ktg = "zmena_ktg", plan_zve = "plan_zve", rok_do_skar = "rok_do_skar", spis_pl_pre = "spis_pl_pre", spis_znak_pre = "spis_znak_pre", s_txt = "s_txt", warning_wfl_pristup = "warning_wfl_pristup", ixp_spis_prir = "ixp_spis_prir", status_pis = "status_pis", spis_zn = "spis_zn", ixp_spis = "ixp_spis", log_por_cislo = "log_por_cislo",}
	const enum GWflpidDtoFragments { ixp = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", s_ele = "*", s_fyz = "*", s_prij = "*", s_sgn = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", ixs_su_wfl = "*", st_utaj_id = "*", ele_read = "*", ele_write = "*", ele_zmena_opr = "*", ele_typ_pristup = "*", ixb = "*", com_mode = "*", ktg_typ = "*", ixs_typ_def = "*", puvod = "*", is_selected = "*", priz_ro = "*", stav_sda = "*", priz_check = "*", ixs_fun_check = "*", s_kopie = "*", priz_spis = "*", n1 = "*", dat_zmena = "*", sdat_zmena = "*", s_schval = "*", umisteni = "*", acc = "*", pub_akt = "*", pub_hst = "*", num_zverejneni = "*", epk_nevyriz = "*", epk_vrac = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ixs_ext = "*", ico = "*", priz_zup = "*", rok_skartace = "*", popis_spo_uda = "*", rok_spo_uda = "*", ixs_spu = "*", priz_poz_skar = "*", duvod_poz_skar = "*", skar_znak = "*", skar_lhuta = "*", ixs_typ = "*", dat_vyriz = "*", sdat_vyriz = "*", misto_vzniku = "*", zmena_ktg = "*", plan_zve = "*", rok_do_skar = "*", spis_pl_pre = "*", spis_znak_pre = "*", s_txt = "*", warning_wfl_pristup = "*", ixp_spis_prir = "*", status_pis = "*", spis_zn = "*", ixp_spis = "*", log_por_cislo = "*",}
	const enum GWflpidDtoTypes { ixp = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", s_ele = "number", s_fyz = "number", s_prij = "number", s_sgn = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", ixs_su_wfl = "string", st_utaj_id = "number", ele_read = "number", ele_write = "number", ele_zmena_opr = "number", ele_typ_pristup = "number", ixb = "string", com_mode = "number", ktg_typ = "number", ixs_typ_def = "string", puvod = "number", is_selected = "boolean", priz_ro = "number", stav_sda = "number", priz_check = "number", ixs_fun_check = "string", s_kopie = "number", priz_spis = "number", n1 = "number", dat_zmena = "JsonDate", sdat_zmena = "string", s_schval = "number", umisteni = "string", acc = "Gordic.Sml.Interface.GSml_WflAccessDto", pub_akt = "number", pub_hst = "number", num_zverejneni = "number", epk_nevyriz = "number", epk_vrac = "number", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ixs_ext = "string", ico = "string", priz_zup = "number", rok_skartace = "number", popis_spo_uda = "string", rok_spo_uda = "number", ixs_spu = "string", priz_poz_skar = "number", duvod_poz_skar = "string", skar_znak = "string", skar_lhuta = "number", ixs_typ = "string", dat_vyriz = "JsonDate", sdat_vyriz = "string", misto_vzniku = "string", zmena_ktg = "number", plan_zve = "number", rok_do_skar = "number", spis_pl_pre = "string", spis_znak_pre = "string", s_txt = "string", warning_wfl_pristup = "string", ixp_spis_prir = "string", status_pis = "number", spis_zn = "string", ixp_spis = "string", log_por_cislo = "number",}
	const enum GWflpidDtoTypeLengths {}
	interface GSmlTopDto extends Gordic.Sml.Interface.GSml_WflTopDto {
	}
	const enum GSmlTopDtoNames { ixp = "ixp", lic = "lic", ucel_dist_txt = "ucel_dist_txt", ixs_fun_start = "ixs_fun_start", ixs_su_start = "ixs_su_start", ixs_fun_cil = "ixs_fun_cil", ixs_su_cil = "ixs_su_cil", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", pkg_name = "pkg_name", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", zmenu_prov = "zmenu_prov", ixs_fun_ref = "ixs_fun_ref", rezim_ref = "rezim_ref", ixs_fun_wfl = "ixs_fun_wfl", ixs_su_wfl = "ixs_su_wfl", com_mode = "com_mode", typ_vlast = "typ_vlast", ixs_ref_start = "ixs_ref_start", ixs_ref_cil = "ixs_ref_cil", stop_dist = "stop_dist", zapis_hst = "zapis_hst", dat_zmena = "dat_zmena", sdat_zmena = "sdat_zmena", typ_redist = "typ_redist", ixs_su_do = "ixs_su_do", lpc = "lpc",}
	const enum GSmlTopDtoFragments { ixp = "*", lic = "*", ucel_dist_txt = "*", ixs_fun_start = "*", ixs_su_start = "*", ixs_fun_cil = "*", ixs_su_cil = "*", ixs_fun_akt = "*", ixs_su_akt = "*", pkg_name = "*", ixs_fun_vyriz = "*", cis_real = "*", zmenu_prov = "*", ixs_fun_ref = "*", rezim_ref = "*", ixs_fun_wfl = "*", ixs_su_wfl = "*", com_mode = "*", typ_vlast = "*", ixs_ref_start = "*", ixs_ref_cil = "*", stop_dist = "*", zapis_hst = "*", dat_zmena = "*", sdat_zmena = "*", typ_redist = "*", ixs_su_do = "*", lpc = "*",}
	const enum GSmlTopDtoTypes { ixp = "string", lic = "string", ucel_dist_txt = "string", ixs_fun_start = "string", ixs_su_start = "string", ixs_fun_cil = "string", ixs_su_cil = "string", ixs_fun_akt = "string", ixs_su_akt = "string", pkg_name = "string", ixs_fun_vyriz = "string", cis_real = "string", zmenu_prov = "string", ixs_fun_ref = "string", rezim_ref = "number", ixs_fun_wfl = "string", ixs_su_wfl = "string", com_mode = "number", typ_vlast = "number", ixs_ref_start = "string", ixs_ref_cil = "string", stop_dist = "number", zapis_hst = "number", dat_zmena = "JsonDate", sdat_zmena = "string", typ_redist = "number", ixs_su_do = "string", lpc = "number",}
	const enum GSmlTopDtoTypeLengths {}
	interface GSml_WflAccessDto {
		/**čtení evidenční karty z pohledu WFL*/
		karta_cte?: number|null;
		/**editace evidenční karty z pohledu WFL*/
		karta_edi?: number|null;
		/**oprávnění k evidenční kartě z pohledu WFL(povolení tl. pro změnu oprávnění na detailu oprávnění k dokumentu)*/
		karta_opr?: number|null;
		/**vlastník dokumentu OK pro čtení el.obrazu/příloh*/
		vlastni_cte?: number|null;
		/**vlastník dokumentu OK při editaci el. obrazu/příloh*/
		vlastni_edit?: number|null;
		/**můžu číst el.obrazu/příloh*/
		lze_el_cteni?: number|null;
		/**lze el. editovat (bez kontroly na stav dokumentu vyřízeno a uzavřeno) - používá se pouze pro povolení konverze do PDF*/
		lzeeledit1?: number|null;
		/**lze.el.editovat - používá se pro*/
		lzeeledit2?: number|null;
		/**lze číst/otevřít el.obraz -- odpovídá hodnotě cfc_Wflpid.ele_read*/
		lze_cte_obr?: number|null;
		/**lze vložit el.obraz*/
		lze_vlo_obr?: number|null;
		/**lze editovat el.obraz*/
		lze_edi_obr?: number|null;
		/**lze znovuvložit el.obraz*/
		lze_zvl_obr?: number|null;
		/**lze zneaktivnit el.obraz*/
		lze_zne_obr?: number|null;
		/**lze odstranit el.obraz*/
		lze_ods_obr?: number|null;
		/**lze změnit oprávnění na el.obrazu (má smysl pouze pro param: gin_ele_pristup = "1") - odpovídá hodnotě cfc_Wflpid.ele_zmena_opr*/
		lze_opr_obr?: number|null;
		/**lze přidat el.přílohu*/
		lze_pri_pri?: number|null;
		/**lze číst/otevřít el.přílohu*/
		lze_cte_pri?: number|null;
		/**lze editovat el.přílohu*/
		lze_edi_pri?: number|null;
		/**lze zneaktivnit el.přílohu*/
		lze_zne_pri?: number|null;
		/**lze odstranit el.přílohu*/
		lze_ods_pri?: number|null;
		/**textově proč nelze číst el.obraz*/
		popis_cteni?: string|null;
		/**lze el. editovat (bez kontroly na stav dokumentu vyøízeno a uzavøeno) - používá se pouze pro povolení*/
		lzeeledit1_bezro?: number|null;
		/**lze.el.editovat(s kontrolou na stav)na klientské úrovni je potřeba pro každou přílohu ještě zkontrolovat její priz_ro*/
		lzeeledit2_bezro?: number|null;
		/**textovì proè nelze èíst el.obraz - zobrazitelné uživateli – zatím není plněno*/
		popis_cteni2?: string|null;
		/**textovì proè nelze èíst el.obraz - zobrazitelné uživateli – zatím není plněno*/
		popis_edit2?: string|null;
		/**textově proč nelze vidět kartu dokumentu*/
		text_hlasky?: string|null;
		/**!textově proč nelze vidět kartu dokumentu rozšířený pro debug nebo zapnuté logování*/
		text_debug?: string|null;
		/**příznak, že record pro řízení údajů byl načten pomocí spg_wfl_pristup*/
		is_active?: boolean|null;
	}
	const enum GSml_WflAccessDtoNames { karta_cte = "karta_cte", karta_edi = "karta_edi", karta_opr = "karta_opr", vlastni_cte = "vlastni_cte", vlastni_edit = "vlastni_edit", lze_el_cteni = "lze_el_cteni", lzeeledit1 = "lzeeledit1", lzeeledit2 = "lzeeledit2", lze_cte_obr = "lze_cte_obr", lze_vlo_obr = "lze_vlo_obr", lze_edi_obr = "lze_edi_obr", lze_zvl_obr = "lze_zvl_obr", lze_zne_obr = "lze_zne_obr", lze_ods_obr = "lze_ods_obr", lze_opr_obr = "lze_opr_obr", lze_pri_pri = "lze_pri_pri", lze_cte_pri = "lze_cte_pri", lze_edi_pri = "lze_edi_pri", lze_zne_pri = "lze_zne_pri", lze_ods_pri = "lze_ods_pri", popis_cteni = "popis_cteni", lzeeledit1_bezro = "lzeeledit1_bezro", lzeeledit2_bezro = "lzeeledit2_bezro", popis_cteni2 = "popis_cteni2", popis_edit2 = "popis_edit2", text_hlasky = "text_hlasky", text_debug = "text_debug", is_active = "is_active",}
	const enum GSml_WflAccessDtoFragments { karta_cte = "*", karta_edi = "*", karta_opr = "*", vlastni_cte = "*", vlastni_edit = "*", lze_el_cteni = "*", lzeeledit1 = "*", lzeeledit2 = "*", lze_cte_obr = "*", lze_vlo_obr = "*", lze_edi_obr = "*", lze_zvl_obr = "*", lze_zne_obr = "*", lze_ods_obr = "*", lze_opr_obr = "*", lze_pri_pri = "*", lze_cte_pri = "*", lze_edi_pri = "*", lze_zne_pri = "*", lze_ods_pri = "*", popis_cteni = "*", lzeeledit1_bezro = "*", lzeeledit2_bezro = "*", popis_cteni2 = "*", popis_edit2 = "*", text_hlasky = "*", text_debug = "*", is_active = "*",}
	const enum GSml_WflAccessDtoTypes { karta_cte = "number", karta_edi = "number", karta_opr = "number", vlastni_cte = "number", vlastni_edit = "number", lze_el_cteni = "number", lzeeledit1 = "number", lzeeledit2 = "number", lze_cte_obr = "number", lze_vlo_obr = "number", lze_edi_obr = "number", lze_zvl_obr = "number", lze_zne_obr = "number", lze_ods_obr = "number", lze_opr_obr = "number", lze_pri_pri = "number", lze_cte_pri = "number", lze_edi_pri = "number", lze_zne_pri = "number", lze_ods_pri = "number", popis_cteni = "string", lzeeledit1_bezro = "number", lzeeledit2_bezro = "number", popis_cteni2 = "string", popis_edit2 = "string", text_hlasky = "string", text_debug = "string", is_active = "boolean",}
	const enum GSml_WflAccessDtoTypeLengths {}
	interface GSml_WflTopDto {
		ixp?: string|null;
		lic?: string|null;
		ucel_dist_txt?: string|null;
		ixs_fun_start?: string|null;
		ixs_su_start?: string|null;
		ixs_fun_cil?: string|null;
		ixs_su_cil?: string|null;
		ixs_fun_akt?: string|null;
		ixs_su_akt?: string|null;
		/**jméno PKG v ORA pro uložení předání*/
		pkg_name?: string|null;
		/**přidány proměnné pro kompetenta a realizátora*/
		ixs_fun_vyriz?: string|null;
		cis_real?: string|null;
		zmenu_prov?: string|null;
		ixs_fun_ref?: string|null;
		rezim_ref?: number|null;
		/**! 353.3 08.08.05 - oddělení vlastnictví - Zpracovatel(ixs_fun_akt ) + Vlastník(ixs_fun_wfl )*/
		ixs_fun_wfl?: string|null;
		ixs_su_wfl?: string|null;
		com_mode?: number|null;
		/**typ změny při předání - nabývá hodnot ng_typvlast*/
		typ_vlast?: number|null;
		/**identifikátor referenta - pokud je null, je to jednoduché předání(bez ohledu na zástupy)*/
		ixs_ref_start?: string|null;
		/**identifikátor referenta*/
		ixs_ref_cil?: string|null;
		/**Příznak, že v případě že je rozeběhlá distribuce, tak se má násilně ukončit.Nepovinná hodnota.*/
		stop_dist?: number|null;
		/**Příznak, zda tato SP má realizovat zápis do textové historie dokumentu.Nepovinná hodnota.*/
		zapis_hst?: number|null;
		dat_zmena?: JsonDate|null;
		sdat_zmena?: string|null;
		/**nabývá hodnot ng_typRedistPredani, ng_typRedistPrideleni*/
		typ_redist?: number|null;
		/**uzel, kam míří dokument při redistribuci*/
		ixs_su_do?: string|null;
		/**The LPC*/
		lpc?: number|null;
	}
	const enum GSml_WflTopDtoNames { ixp = "ixp", lic = "lic", ucel_dist_txt = "ucel_dist_txt", ixs_fun_start = "ixs_fun_start", ixs_su_start = "ixs_su_start", ixs_fun_cil = "ixs_fun_cil", ixs_su_cil = "ixs_su_cil", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", pkg_name = "pkg_name", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", zmenu_prov = "zmenu_prov", ixs_fun_ref = "ixs_fun_ref", rezim_ref = "rezim_ref", ixs_fun_wfl = "ixs_fun_wfl", ixs_su_wfl = "ixs_su_wfl", com_mode = "com_mode", typ_vlast = "typ_vlast", ixs_ref_start = "ixs_ref_start", ixs_ref_cil = "ixs_ref_cil", stop_dist = "stop_dist", zapis_hst = "zapis_hst", dat_zmena = "dat_zmena", sdat_zmena = "sdat_zmena", typ_redist = "typ_redist", ixs_su_do = "ixs_su_do", lpc = "lpc",}
	const enum GSml_WflTopDtoFragments { ixp = "*", lic = "*", ucel_dist_txt = "*", ixs_fun_start = "*", ixs_su_start = "*", ixs_fun_cil = "*", ixs_su_cil = "*", ixs_fun_akt = "*", ixs_su_akt = "*", pkg_name = "*", ixs_fun_vyriz = "*", cis_real = "*", zmenu_prov = "*", ixs_fun_ref = "*", rezim_ref = "*", ixs_fun_wfl = "*", ixs_su_wfl = "*", com_mode = "*", typ_vlast = "*", ixs_ref_start = "*", ixs_ref_cil = "*", stop_dist = "*", zapis_hst = "*", dat_zmena = "*", sdat_zmena = "*", typ_redist = "*", ixs_su_do = "*", lpc = "*",}
	const enum GSml_WflTopDtoTypes { ixp = "string", lic = "string", ucel_dist_txt = "string", ixs_fun_start = "string", ixs_su_start = "string", ixs_fun_cil = "string", ixs_su_cil = "string", ixs_fun_akt = "string", ixs_su_akt = "string", pkg_name = "string", ixs_fun_vyriz = "string", cis_real = "string", zmenu_prov = "string", ixs_fun_ref = "string", rezim_ref = "number", ixs_fun_wfl = "string", ixs_su_wfl = "string", com_mode = "number", typ_vlast = "number", ixs_ref_start = "string", ixs_ref_cil = "string", stop_dist = "number", zapis_hst = "number", dat_zmena = "JsonDate", sdat_zmena = "string", typ_redist = "number", ixs_su_do = "string", lpc = "number",}
	const enum GSml_WflTopDtoTypeLengths {}
	/**record pro PFK*/
	interface GSmlPfkDto {
		/**počet aktivních dokladů PFK vázaných na případ*/
		num_akt?: number|null;
		/**stav schválení žádosti*/
		stav_vyriz?: number|null;
		/**příznak existence el.obrazu dokumentu PFK*/
		s_ele?: number|null;
		/**pid dokladu PFK*/
		ixp?: string|null;
		/**období, ve kterém je kontrola vedena*/
		rok?: number|null;
	}
	const enum GSmlPfkDtoNames { num_akt = "num_akt", stav_vyriz = "stav_vyriz", s_ele = "s_ele", ixp = "ixp", rok = "rok",}
	const enum GSmlPfkDtoFragments { num_akt = "*", stav_vyriz = "*", s_ele = "*", ixp = "*", rok = "*",}
	const enum GSmlPfkDtoTypes { num_akt = "number", stav_vyriz = "number", s_ele = "number", ixp = "string", rok = "number",}
	const enum GSmlPfkDtoTypeLengths {}
	/**DBTABLE:smlspid*/
	interface GSmlspidDto {
		/**Základní identrifikátor dokladu*/
		ixp?: string|null;
		/**DBCOLUMN:smlspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:smlspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlspid.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:smlspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smlspid.nks*/
		nks?: string|null;
		/**DBCOLUMN:smlspid.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:smlspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlspid.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:smlspid.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:smlspid.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:smlspid.bu_ci*/
		bu_ci?: string|null;
		/**Ručně přidán sloupec bu_protiúčet	měl by být naplněn bu_ci + "/" + sk_ci*/
		bu_protiucet?: string|null;
		/**DBCOLUMN:smlspid.ac*/
		ac?: string|null;
		/**Neměnný identifikátor dokladu bez ohledu na knihu*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:smlspid.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:smlspid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:smlspid.sml_stav*/
		sml_stav?: number|null;
		sml_stav_txt?: string|null;
		/**DBCOLUMN:smlspid.sml_stav*/
		sml_stav_objekt?: Gordic.Sml.Interface.GSmlcstaDto|null;
		/**Datum uzavření v rámci smluv, u ostatních dokaldů Datum vystavení*/
		dat_uzavreni?: JsonDate|null;
		/**Datum, do kdy je doklad platný*/
		dat_platnost?: JsonDate|null;
		/**Datum podání dokladu do tabulky smlspid*/
		dat_prij_pod?: JsonDate|null;
		/**Nepoužito*/
		zadavatel?: string|null;
		/**Smluvní kompetent*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:smlspid.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:smlspid.rok*/
		rok?: number|null;
		/**DBCOLUMN:smlspid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:smlspid.soutez*/
		soutez?: string|null;
		/**Měna*/
		mena?: number|null;
		/**Množinový údaj charakterizující doklad z hlediska jeho kategore typů dokladu*/
		ktg_sml?: number|null;
		/**DBCOLUMN:smlspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlspid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**The zmenu prov funkce*/
		zmenu_prov_funkce?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Suma položek FP vedená k dokladu*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_dod*/
		c_dod?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:smlspid.nazev*/
		nazev?: string|null;
		/**V závislosti na navázaném typu agendy blokačného případu se názvosloví měni*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:smlspid.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:smlspid.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:smlspid.ucinnost*/
		ucinnost?: string|null;
		/**Organizační jednotka*/
		ixs_orj?: string|null;
		/**DBCOLUMN:smlspid.cis_real*/
		cis_real?: string|null;
		/**Obsluha vzájemných vazeb dokladů SML*/
		ixp_sml?: string|null;
		/**DBCOLUMN:smlspid.ac_nad*/
		ac_nad?: string|null;
		/**DBCOLUMN:smlspid.ac_sml_nad*/
		ac_sml_nad?: string|null;
		/**Odkaz na případ BLK*/
		ixs_pri?: string|null;
		/**Čítač počtu objednávek, které jsou vázány na smlouvu.*/
		num_obj?: number|null;
		/**Celková částka financování v měně*/
		c_mena?: JsonDecimal|null;
		/**Kurz pro přepočet cizí měny na CUK pro doklad v případě v závislosti na Typu kurzu*/
		kurz?: JsonDecimal|null;
		/**Množství jednotek pro přepočet částky v cizí měně na CZK*/
		m?: JsonDecimal|null;
		/**Ovlivňuje hodnotu Kurzu pro přepočet částek v cizí měně na CZK v rámci dokladu*/
		typ_kurz?: number|null;
		/**Definuje datum účinnosti smlouvy*/
		dat_ucinnost?: JsonDate|null;
		/**Dolní hranice intervalu, ve kterém je financován doklad*/
		fin_od?: number|null;
		/**Horní  hranice intervalu, ve kterém je financován doklad*/
		fin_do?: number|null;
		/**DBCOLUMN:smlspid.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:smlspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:smlspid.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlspid.por_cislo_nab*/
		por_cislo_nab?: number|null;
		/**DBCOLUMN:smlspid.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:smlspid.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:smlspid.ixs_ref_zast*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:smlspid.lic_zast_esu*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:smlspid.por_zast_esu*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:smlspid.dat_dok_1*/
		dat_dok_1?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_dok_2*/
		dat_dok_2?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_zuk*/
		ixs_zuk?: string|null;
		/**DBCOLUMN:smlspid.ktg_zuk*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:smlspid.dat_uko*/
		dat_uko?: JsonDate|null;
		/**DBCOLUMN:smlspid.ixs_esu_zast*/
		ixs_esu_zast?: string|null;
		/**Ručně přidán ixs_esu_zast_txt*/
		ixs_esu_zast_txt?: string|null;
		/**DBCOLUMN:smlspid.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:smlspid.zak_upr*/
		zak_upr?: number|null;
		/**DBCOLUMN:smlspid.priz_spo*/
		priz_spo?: number|null;
		/**DBCOLUMN:smlspid.typ_spo*/
		typ_spo?: number|null;
		/**DBCOLUMN:smlspid.c_spo*/
		c_spo?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.priz_uroc*/
		priz_uroc?: number|null;
		/**DBCOLUMN:smlspid.num_dod*/
		num_dod?: number|null;
		/**DBCOLUMN:smlspid.cislo_dod*/
		cislo_dod?: number|null;
		/**DBCOLUMN:smlspid.zp_def_ceny*/
		zp_def_ceny?: number|null;
		/**DBCOLUMN:smlspid.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlspid.priz_pzp*/
		priz_pzp?: number|null;
		/**DBCOLUMN:smlspid.dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**DBCOLUMN:smlspid.c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:smlspid.vs*/
		vs?: string|null;
		/**DBCOLUMN:smlspid.c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**ručně připadá vlastnost, c_mena_z_dph se skládá z c_mena_z_bd, ss, ns, 3s, 4s*/
		c_mena_z_dph?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:smlspid.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
		/**DBCOLUMN:smlspid.c_mena_doc*/
		c_mena_doc?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.dat_rad_iissp*/
		dat_rad_iissp?: JsonDate|null;
		/**DBCOLUMN:smlspid.priz_opce*/
		priz_opce?: number|null;
		/**Ručně přidán zpracovatel*/
		ixs_fun_akt?: string|null;
		/**The smlapid*/
		smlapid?: Gordic.Sml.Interface.GSmlapidDto|null;
		/**The castka dodatek*/
		CastkaDodatek?: JsonDecimal|null;
		/**The castka objednavky*/
		c_obj?: JsonDecimal|null;
		/**ixs esu interního subjektu*/
		ixs_esu_ico?: string|null;
	}
	const enum GSmlspidDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_protiucet = "bu_protiucet", ac = "ac", ac_sml = "ac_sml", ixp_den = "ixp_den", subrada = "subrada", c = "c", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", sml_stav = "sml_stav", sml_stav_txt = "sml_stav_txt", sml_stav_objekt = "sml_stav_objekt", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", zadavatel = "zadavatel", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", rok = "rok", poznamka = "poznamka", soutez = "soutez", mena = "mena", ktg_sml = "ktg_sml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_funkce = "zmenu_prov_funkce", c_pol = "c_pol", c_dod = "c_dod", typ_platnost = "typ_platnost", nazev = "nazev", ac_ver_zak = "ac_ver_zak", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", cis_real = "cis_real", ixp_sml = "ixp_sml", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ixs_pri = "ixs_pri", num_obj = "num_obj", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", priz_view = "priz_view", typ_ceny = "typ_ceny", por_cislo_nab = "por_cislo_nab", typ_ag_blok = "typ_ag_blok", ixp_nab = "ixp_nab", ixs_ref_zast = "ixs_ref_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", ixs_esu_zast = "ixs_esu_zast", ixs_esu_zast_txt = "ixs_esu_zast_txt", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", zak_upr = "zak_upr", priz_spo = "priz_spo", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo", priz_uroc = "priz_uroc", num_dod = "num_dod", cislo_dod = "cislo_dod", zp_def_ceny = "zp_def_ceny", ixp_sml_pri = "ixp_sml_pri", priz_pzp = "priz_pzp", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", c_mena_z_dph = "c_mena_z_dph", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", c_mena_doc = "c_mena_doc", dat_rad_iissp = "dat_rad_iissp", priz_opce = "priz_opce", ixs_fun_akt = "ixs_fun_akt", smlapid = "smlapid", CastkaDodatek = "CastkaDodatek", c_obj = "c_obj", ixs_esu_ico = "ixs_esu_ico",}
	const enum GSmlspidDtoFragments { ixp = "SMLSPID", lic = "SMLSPID", ixs_esu = "SMLSPID", ico_esu = "SMLSPID", ico = "SMLSPID", ucs = "SMLSPID", nks = "SMLSPID", ac_esu = "SMLSPID", popis = "SMLSPID", sk_vl = "SMLSPID", bu_vl = "SMLSPID", sk_ci = "SMLSPID", bu_ci = "SMLSPID", bu_protiucet = "SMLSPID", ac = "SMLSPID", ac_sml = "SMLSPID", ixp_den = "SMLSPID", subrada = "SMLSPID", c = "SMLSPID", ktg_typ = "SMLSPID", ixs_typ = "SMLSPID", eko_akt = "SMLSPID", sml_stav = "SMLSPID", sml_stav_txt = "*", sml_stav_objekt = "SMLSPID", dat_uzavreni = "SMLSPID", dat_platnost = "SMLSPID", dat_prij_pod = "SMLSPID", zadavatel = "SMLSPID", ixs_fun_vyriz = "SMLSPID", ixs_fun_ref = "SMLSPID", rok = "SMLSPID", poznamka = "SMLSPID", soutez = "SMLSPID", mena = "SMLSPID", ktg_sml = "SMLSPID", dat_zmena = "SMLSPID", zmenu_prov = "SMLSPID", zmenu_prov_funkce = "SMLSPID", c_pol = "SMLSPID", c_dod = "SMLSPID", typ_platnost = "SMLSPID", nazev = "SMLSPID", ac_ver_zak = "SMLSPID", ac_dok_1 = "SMLSPID", ac_dok_2 = "SMLSPID", ucinnost = "SMLSPID", ixs_orj = "SMLSPID", cis_real = "SMLSPID", ixp_sml = "SMLSPID", ac_nad = "SMLSPID", ac_sml_nad = "SMLSPID", ixs_pri = "SMLSPID", num_obj = "SMLSPID", c_mena = "SMLSPID", kurz = "SMLSPID", m = "SMLSPID", typ_kurz = "SMLSPID", dat_ucinnost = "SMLSPID", fin_od = "SMLSPID", fin_do = "SMLSPID", sgn_stav = "SMLSPID", priz_view = "SMLSPID", typ_ceny = "SMLSPID", por_cislo_nab = "SMLSPID", typ_ag_blok = "SMLSPID", ixp_nab = "SMLSPID", ixs_ref_zast = "SMLSPID", lic_zast_esu = "SMLSPID", por_zast_esu = "SMLSPID", dat_dok_1 = "SMLSPID", dat_dok_2 = "SMLSPID", ixs_zuk = "SMLSPID", ktg_zuk = "SMLSPID", dat_uko = "SMLSPID", ixs_esu_zast = "SMLSPID", ixs_esu_zast_txt = "SMLSPID", c_sazba_pen = "SMLSPID", proc_sazba_pen = "SMLSPID", typ_pen = "SMLSPID", zak_upr = "SMLSPID", priz_spo = "SMLSPID", typ_spo = "SMLSPID", c_spo = "SMLSPID", proc_spo = "SMLSPID", priz_uroc = "SMLSPID", num_dod = "SMLSPID", cislo_dod = "SMLSPID", zp_def_ceny = "SMLSPID", ixp_sml_pri = "SMLSPID", priz_pzp = "SMLSPID", dat_dph_od = "SMLSPID", dat_dph_do = "SMLSPID", c_mena_z_osv = "SMLSPID", c_mena_z_bd = "SMLSPID", c_mena_z_ss = "SMLSPID", c_mena_z_ns = "SMLSPID", c_mena_dph_ss = "SMLSPID", c_mena_dph_ns = "SMLSPID", c_c_mena_ss = "SMLSPID", c_c_mena_ns = "SMLSPID", c_c_mena_okr = "SMLSPID", typ_phl = "SMLSPID", vs = "SMLSPID", c_mena_dph_3s = "SMLSPID", c_mena_dph_4s = "SMLSPID", c_mena_z_3s = "SMLSPID", c_mena_z_4s = "SMLSPID", c_c_mena_3s = "SMLSPID", c_c_mena_4s = "SMLSPID", c_mena_z_dph = "SMLSPID", dat_sgn = "SMLSPID", dat_sgn_ext = "SMLSPID", c_mena_doc = "SMLSPID", dat_rad_iissp = "SMLSPID", priz_opce = "SMLSPID", ixs_fun_akt = "SMLSPID", smlapid = "SMLSPID", CastkaDodatek = "SMLSPID", c_obj = "SMLSPID", ixs_esu_ico = "SMLSPID",}
	const enum GSmlspidDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", bu_protiucet = "string", ac = "string", ac_sml = "string", ixp_den = "string", subrada = "number", c = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", sml_stav = "number", sml_stav_txt = "string", sml_stav_objekt = "Gordic.Sml.Interface.GSmlcstaDto", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", zadavatel = "string", ixs_fun_vyriz = "string", ixs_fun_ref = "string", rok = "number", poznamka = "string", soutez = "string", mena = "number", ktg_sml = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_funkce = "Gordic.Gin.Interface.GGinszmpDto", c_pol = "JsonDecimal", c_dod = "JsonDecimal", typ_platnost = "number", nazev = "string", ac_ver_zak = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", cis_real = "string", ixp_sml = "string", ac_nad = "string", ac_sml_nad = "string", ixs_pri = "string", num_obj = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", priz_view = "number", typ_ceny = "number", por_cislo_nab = "number", typ_ag_blok = "number", ixp_nab = "string", ixs_ref_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", ixs_esu_zast = "string", ixs_esu_zast_txt = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", zak_upr = "number", priz_spo = "number", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal", priz_uroc = "number", num_dod = "number", cislo_dod = "number", zp_def_ceny = "number", ixp_sml_pri = "string", priz_pzp = "number", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", c_mena_z_dph = "JsonDecimal", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", c_mena_doc = "JsonDecimal", dat_rad_iissp = "JsonDate", priz_opce = "number", ixs_fun_akt = "string", smlapid = "Gordic.Sml.Interface.GSmlapidDto", CastkaDodatek = "JsonDecimal", c_obj = "JsonDecimal", ixs_esu_ico = "string",}
	const enum GSmlspidDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 60, popis = 254, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, bu_protiucet = 34, ac = 30, ac_sml = 30, ixp_den = 12, ixs_typ = 12, zadavatel = 30, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka = 500, soutez = 30, zmenu_prov = 12, nazev = 4000, ac_ver_zak = 30, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12, cis_real = 6, ixp_sml = 12, ac_nad = 30, ac_sml_nad = 30, ixs_pri = 12, ixp_nab = 12, ixs_ref_zast = 12, lic_zast_esu = 4, ixs_zuk = 12, ixs_esu_zast = 12, ixp_sml_pri = 12, typ_phl = 4, vs = 12, ixs_fun_akt = 12, ixs_esu_ico = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlspolDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlspol
	*      Předpisy krytí dto - Položky FP - Případ
	*/
	interface GSmlspolDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**cislo*/
		cislo?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**Název*/
		nazev?: string|null;
		/**up_stav*/
		up_stav?: number|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**c_fak*/
		c_fak?: JsonDecimal|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**dat_vznik*/
		dat_vznik?: JsonDate|null;
		/**c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**drd*/
		drd?: number|null;
		/**ixp_sml*/
		ixp_sml?: string|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**cislo_sml*/
		cislo_sml?: number|null;
		/**uea_rr*/
		uea_rr?: string|null;
		/**ueb_rr*/
		ueb_rr?: string|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**por_cis*/
		por_cis?: number|null;
		/**typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**znam*/
		znam?: number|null;
		/**xuete*/
		xuete?: string|null;
		/**priz_zaz*/
		priz_zaz?: number|null;
		/**eds_dok*/
		eds_dok?: string|null;
		/**id_hdr*/
		id_hdr?: number|null;
		/**radek_hdr*/
		radek_hdr?: number|null;
		/**Textová zkratka stavu*/
		up_stav_zkr?: string|null;
		/**Celý text stavu*/
		up_stav_txt?: string|null;
		/**Textově složený bankovní účet*/
		bu_vl_txt?: string|null;
		/**Typ operace textově*/
		priz_zaz_txt?: string|null;
		/**uea_uc*/
		uea_uc?: string|null;
		/**ueb_uc*/
		ueb_uc?: string|null;
		/**id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**c_fak_obj*/
		c_fak_obj?: JsonDecimal|null;
		/**c_rcn*/
		c_rcn?: JsonDecimal|null;
		/**c_vratka*/
		c_vratka?: JsonDecimal|null;
		/**Napočítávaný disponibilní zůstatek*/
		c_disp?: JsonDecimal|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmlFinPolozkyFPPripadPermissions|null;
	}
	const enum GSmlspolDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", cis_pol_pla = "cis_pol_pla", nazev = "nazev", up_stav = "up_stav", c = "c", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vznik = "dat_vznik", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", xuete = "xuete", priz_zaz = "priz_zaz", eds_dok = "eds_dok", id_hdr = "id_hdr", radek_hdr = "radek_hdr", up_stav_zkr = "up_stav_zkr", up_stav_txt = "up_stav_txt", bu_vl_txt = "bu_vl_txt", priz_zaz_txt = "priz_zaz_txt", uea_uc = "uea_uc", ueb_uc = "ueb_uc", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", c_fak_obj = "c_fak_obj", c_rcn = "c_rcn", c_vratka = "c_vratka", c_disp = "c_disp", Permissions = "Permissions",}
	const enum GSmlspolDtoFragments { ixp = "*", rok = "*", cislo = "*", lic = "*", cis_pol_pla = "*", nazev = "*", up_stav = "*", c = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", sk_vl = "*", bu_vl = "*", c_fak = "*", dat_zmena = "*", zmenu_prov = "*", dat_vznik = "*", c_obj_sml = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", typ_ag_blok = "*", znam = "*", xuete = "*", priz_zaz = "*", eds_dok = "*", id_hdr = "*", radek_hdr = "*", up_stav_zkr = "*", up_stav_txt = "*", bu_vl_txt = "*", priz_zaz_txt = "*", uea_uc = "*", ueb_uc = "*", id_hdr_ris = "*", radek_hdr_ris = "*", c_fak_obj = "*", c_rcn = "*", c_vratka = "*", c_disp = "*", Permissions = "Permissions",}
	const enum GSmlspolDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", cis_pol_pla = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", sk_vl = "string", bu_vl = "string", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vznik = "JsonDate", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", xuete = "string", priz_zaz = "number", eds_dok = "string", id_hdr = "number", radek_hdr = "number", up_stav_zkr = "string", up_stav_txt = "string", bu_vl_txt = "string", priz_zaz_txt = "string", uea_uc = "string", ueb_uc = "string", id_hdr_ris = "string", radek_hdr_ris = "number", c_fak_obj = "JsonDecimal", c_rcn = "JsonDecimal", c_vratka = "JsonDecimal", c_disp = "JsonDecimal", Permissions = "Gordic.Sml.Interface.GSmlFinPolozkyFPPripadPermissions",}
	const enum GSmlspolDtoTypeLengths { ixp = 12, lic = 4, cis_pol_pla = 16, nazev = 254, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, sk_vl = 11, bu_vl = 34, zmenu_prov = 12, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, xuete = 286, eds_dok = 16, uea_uc = 3, ueb_uc = 4,}
	/**Enum s možnými subtasky Položek FP*/
	const enum GSMLPolozkyFPSubtaskEnum {
		/**Záložka Případ*/
		Pripad,
		/**Záložka Doklad*/
		Doklad,
		/**Záložka Požadavky příštích období*/
		Pozadavky,
		/**Záložka Struktura IISSP*/
		StrukturaIISSP,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlspzpDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**SmlspzpDto tabulky smlspzp*/
	interface GSmlspzpDto {
		/**DBCOLUMN:smlspzp.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:smlspzp.rok_sml_pri*/
		rok_sml_pri?: number|null;
		/**DBCOLUMN:smlspzp.cislo_sml_pri*/
		cislo_sml_pri?: number|null;
		/**DBCOLUMN:smlspzp.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlspzp.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlspzp.ktg_upr*/
		ktg_upr?: number|null;
		/**DBCOLUMN:smlspzp.typ_upr*/
		typ_upr?: string|null;
		/**DBCOLUMN:smlspzp.ktg_upo*/
		ktg_upo?: number|null;
		/**DBCOLUMN:smlspzp.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:smlspzp.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:smlspzp.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:smlspzp.pzp_stav*/
		pzp_stav?: number|null;
		/**DBCOLUMN:smlspzp.pzp_stav_txt*/
		pzp_stav_txt?: string|null;
		/**DBCOLUMN:smlspzp.c_up
		*     částka podmíněného Z/P
		*/
		c_up?: JsonDecimal|null;
		/**DBCOLUMN:smlspzp.c_up_rez
		*      nápočet snižování podmíněného Z/P rezervační agendou
		*/
		c_up_rez?: JsonDecimal|null;
		/**DBCOLUMN:smlspzp.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlspzp.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlspzp.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:smlspzp.uus*/
		uus?: string|null;
		/**DBCOLUMN:smlspzp.nks
		*      konto RS
		*/
		nks?: string|null;
		/**DBCOLUMN:smlspzp.uea*/
		uea?: string|null;
		/**DBCOLUMN:smlspzp.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:smlspzp.uec*/
		uec?: string|null;
		/**DBCOLUMN:smlspzp.ued*/
		ued?: string|null;
		/**DBCOLUMN:smlspzp.uee*/
		uee?: string|null;
		/**DBCOLUMN:smlspzp.uef*/
		uef?: string|null;
		/**DBCOLUMN:smlspzp.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:smlspzp.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:smlspzp.uei*/
		uei?: string|null;
		/**DBCOLUMN:smlspzp.uej*/
		uej?: string|null;
		/**DBCOLUMN:smlspzp.te0*/
		te0?: string|null;
		/**DBCOLUMN:smlspzp.te1*/
		te1?: string|null;
		/**DBCOLUMN:smlspzp.te2*/
		te2?: string|null;
		/**DBCOLUMN:smlspzp.te3*/
		te3?: string|null;
		/**DBCOLUMN:smlspzp.te4*/
		te4?: string|null;
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**DBCOLUMN:smlspzp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlspzp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:smlspzp.ixs_esu
		*      380.12 31.08.18 přidáno rozlišení protistrany + typ esu kvůli GDPR
		*/
		ixs_esu?: string|null;
		/**ixs_esu_txt
		*     380.12 31.08.18 přidáno rozlišení protistrany
		*/
		ixs_esu_txt?: string|null;
		/**typ_esu
		*     380.12 31.08.18 přidáno rozlišení protistrany + typ esu kvůli GDPR
		*/
		typ_esu?: number|null;
		/**s_upo (FUC)
		*     stav zaúčtování UPO
		*/
		s_upo?: number|null;
		/**s_sto (FUC)
		*     stav stornování UPO
		*/
		s_sto?: number|null;
		/**ktg_typ_txt (FUC)
		*     kategorie typu - fucckat.ktg_typ - výběr omezen katagorií dokladu SML . Pro dodavatelské doklady (výdajové) použít závazky, pro odběratelské (příjmové) použít pohledávky
		*     definice přímo pomocí typu
		*/
		ktg_typ_txt?: string|null;
		/**ktg_upo_txt (FUC)
		*     364.8 29.04.10 možnost zadat kategorii UPO
		*/
		ktg_upo_txt?: string|null;
		/**typ_upr_txt (FUC)
		*     charakter PZ/P - fucstup.typ_upr - výběr omezen na základě zvolené kategorie typu - FUCSTUP.KTG_TYP = FUCCKAT.KTG_TYP
		*/
		typ_upr_txt?: string|null;
		/**Stav s_upo*/
		s_upo_txt?: string|null;
		/**Identifikátor způsobu zaúčtování*/
		ixs_zpz?: string|null;
		/**Příznak, zda je záznam v databázi*/
		flag_DB?: boolean|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmlspzpPermissions|null;
	}
	const enum GSmlspzpDtoNames { ixp_sml_pri = "ixp_sml_pri", rok_sml_pri = "rok_sml_pri", cislo_sml_pri = "cislo_sml_pri", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ktg_upr = "ktg_upr", typ_upr = "typ_upr", ktg_upo = "ktg_upo", radek_upo = "radek_upo", dat_uup = "dat_uup", dat_spl = "dat_spl", pzp_stav = "pzp_stav", pzp_stav_txt = "pzp_stav_txt", c_up = "c_up", c_up_rez = "c_up_rez", popis = "popis", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", typ_esu = "typ_esu", s_upo = "s_upo", s_sto = "s_sto", ktg_typ_txt = "ktg_typ_txt", ktg_upo_txt = "ktg_upo_txt", typ_upr_txt = "typ_upr_txt", s_upo_txt = "s_upo_txt", ixs_zpz = "ixs_zpz", flag_DB = "flag_DB", Permissions = "Permissions",}
	const enum GSmlspzpDtoFragments { ixp_sml_pri = "*", rok_sml_pri = "*", cislo_sml_pri = "*", ktg_typ = "*", ixs_typ = "*", ktg_upr = "*", typ_upr = "*", ktg_upo = "*", radek_upo = "*", dat_uup = "*", dat_spl = "*", pzp_stav = "*", pzp_stav_txt = "*", c_up = "*", c_up_rez = "*", popis = "*", ico = "*", ucs = "*", uus = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", dat_zmena = "*", zmenu_prov = "*", ixs_esu = "*", ixs_esu_txt = "*", typ_esu = "*", s_upo = "*", s_sto = "*", ktg_typ_txt = "*", ktg_upo_txt = "*", typ_upr_txt = "*", s_upo_txt = "*", ixs_zpz = "*", flag_DB = "*", Permissions = "Permissions",}
	const enum GSmlspzpDtoTypes { ixp_sml_pri = "string", rok_sml_pri = "number", cislo_sml_pri = "number", ktg_typ = "number", ixs_typ = "string", ktg_upr = "number", typ_upr = "string", ktg_upo = "number", radek_upo = "number", dat_uup = "JsonDate", dat_spl = "JsonDate", pzp_stav = "number", pzp_stav_txt = "string", c_up = "JsonDecimal", c_up_rez = "JsonDecimal", popis = "string", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_esu = "string", ixs_esu_txt = "string", typ_esu = "number", s_upo = "number", s_sto = "number", ktg_typ_txt = "string", ktg_upo_txt = "string", typ_upr_txt = "string", s_upo_txt = "string", ixs_zpz = "string", flag_DB = "boolean", Permissions = "Gordic.Sml.Interface.GSmlspzpPermissions",}
	const enum GSmlspzpDtoTypeLengths { ixp_sml_pri = 12, ixs_typ = 12, typ_upr = 15, popis = 254, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, zmenu_prov = 12, ixs_esu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlsrokDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlsrok - Rozpis částek na roky*/
	interface GSmlsrokDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**ixp_pla*/
		ixp_pla?: string|null;
		/**Kód měny dle ekocmen*/
		mena?: number|null;
		/**c_mena*/
		c_mena?: JsonDecimal|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**sml_stav*/
		sml_stav?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Položky FP CZK*/
		c_pol?: JsonDecimal|null;
		/**Příjmy CZK*/
		c_pol_pri?: JsonDecimal|null;
		/**Výdaje CZK*/
		c_pol_vyd?: JsonDecimal|null;
		/**c_plan*/
		c_plan?: JsonDecimal|null;
		/**c_rozdil*/
		c_rozdil?: JsonDecimal|null;
	}
	const enum GSmlsrokDtoNames { ixp = "ixp", rok = "rok", ixp_pla = "ixp_pla", mena = "mena", c_mena = "c_mena", c = "c", sml_stav = "sml_stav", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", bu_vl = "bu_vl", sk_vl = "sk_vl", c_pol = "c_pol", c_pol_pri = "c_pol_pri", c_pol_vyd = "c_pol_vyd", c_plan = "c_plan", c_rozdil = "c_rozdil",}
	const enum GSmlsrokDtoFragments { ixp = "*", rok = "*", ixp_pla = "*", mena = "*", c_mena = "*", c = "*", sml_stav = "*", dat_zmena = "*", zmenu_prov = "*", bu_vl = "*", sk_vl = "*", c_pol = "*", c_pol_pri = "*", c_pol_vyd = "*", c_plan = "*", c_rozdil = "*",}
	const enum GSmlsrokDtoTypes { ixp = "string", rok = "number", ixp_pla = "string", mena = "number", c_mena = "JsonDecimal", c = "JsonDecimal", sml_stav = "number", dat_zmena = "JsonDate", zmenu_prov = "string", bu_vl = "string", sk_vl = "string", c_pol = "JsonDecimal", c_pol_pri = "JsonDecimal", c_pol_vyd = "JsonDecimal", c_plan = "JsonDecimal", c_rozdil = "JsonDecimal",}
	const enum GSmlsrokDtoTypeLengths { ixp = 12, ixp_pla = 12, zmenu_prov = 12, bu_vl = 34, sk_vl = 11,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlssteDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlsste*/
	interface GSmlssteDto {
		/**šablona*/
		ixs_ste?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Typ pohledávky*/
		typ_phl?: string|null;
		/**Způsob platby, používá se k rozlišení jak bude uhrazena očekávaná platba*/
		zp?: number|null;
		poc_splatek?: number|null;
		typ_gen?: number|null;
		priz_per?: number|null;
		ktg_upo?: number|null;
		posun_dat_spl?: number|null;
		priz_zaok?: number|null;
		perioda?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSmlssteDtoNames { ixs_ste = "ixs_ste", aktivita = "aktivita", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", typ_phl = "typ_phl", zp = "zp", poc_splatek = "poc_splatek", typ_gen = "typ_gen", priz_per = "priz_per", ktg_upo = "ktg_upo", posun_dat_spl = "posun_dat_spl", priz_zaok = "priz_zaok", perioda = "perioda", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSmlssteDtoFragments { ixs_ste = "*", aktivita = "*", zkratka = "*", nazev = "*", poznamka = "*", typ_phl = "*", zp = "*", poc_splatek = "*", typ_gen = "*", priz_per = "*", ktg_upo = "*", posun_dat_spl = "*", priz_zaok = "*", perioda = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSmlssteDtoTypes { ixs_ste = "string", aktivita = "number", zkratka = "string", nazev = "string", poznamka = "string", typ_phl = "string", zp = "number", poc_splatek = "number", typ_gen = "number", priz_per = "number", ktg_upo = "number", posun_dat_spl = "number", priz_zaok = "number", perioda = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSmlssteDtoTypeLengths { ixs_ste = 12, zkratka = 16, nazev = 50, poznamka = 254, typ_phl = 4, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlszukDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlszuk - Způsob ukončení (používáno třeba u platebního kalendáře)*/
	interface GSmlszukDto {
		/**DBCOLUMN:smlszuk.ixs_zuk*/
		ixs_zuk?: string|null;
		/**DBCOLUMN:smlszuk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:smlszuk.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:smlszuk.ktg_zuk*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:smlszuk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:smlszuk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:smlszuk.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSmlszukDtoNames { ixs_zuk = "ixs_zuk", nazev = "nazev", zkratka = "zkratka", ktg_zuk = "ktg_zuk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSmlszukDtoFragments { ixs_zuk = "*", nazev = "*", zkratka = "*", ktg_zuk = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSmlszukDtoTypes { ixs_zuk = "string", nazev = "string", zkratka = "string", ktg_zuk = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSmlszukDtoTypeLengths { ixs_zuk = 12, nazev = 50, zkratka = 16, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmltmp1Dto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**TMP tabulka (např. pro Info, Položky FP Rezervace, ...)*/
	interface GSmltmp1Dto {
		/**Identifikátor databázového připojení*/
		log_por_cislo?: number|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
		/**Položka*/
		pol?: JsonDecimal|null;
		res?: JsonDecimal|null;
		obj_sml?: JsonDecimal|null;
		/**Rok deníku*/
		rok?: number|null;
		cislo?: number|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		up_stav?: number|null;
		/**Název*/
		nazev?: string|null;
		ac?: string|null;
		ac_ag?: string|null;
		znam?: number|null;
		txt_1?: string|null;
		txt_2?: string|null;
		ikc?: JsonDecimal|null;
	}
	const enum GSmltmp1DtoNames { log_por_cislo = "log_por_cislo", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", pol = "pol", res = "res", obj_sml = "obj_sml", rok = "rok", cislo = "cislo", ixp = "ixp", up_stav = "up_stav", nazev = "nazev", ac = "ac", ac_ag = "ac_ag", znam = "znam", txt_1 = "txt_1", txt_2 = "txt_2", ikc = "ikc",}
	const enum GSmltmp1DtoFragments { log_por_cislo = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", pol = "*", res = "*", obj_sml = "*", rok = "*", cislo = "*", ixp = "*", up_stav = "*", nazev = "*", ac = "*", ac_ag = "*", znam = "*", txt_1 = "*", txt_2 = "*", ikc = "*",}
	const enum GSmltmp1DtoTypes { log_por_cislo = "number", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", pol = "JsonDecimal", res = "JsonDecimal", obj_sml = "JsonDecimal", rok = "number", cislo = "number", ixp = "string", up_stav = "number", nazev = "string", ac = "string", ac_ag = "string", znam = "number", txt_1 = "string", txt_2 = "string", ikc = "JsonDecimal",}
	const enum GSmltmp1DtoTypeLengths { nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, ixp = 12, nazev = 254, ac = 40, ac_ag = 40, txt_1 = 254, txt_2 = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlvlrrDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlvlrr
	*      Dto - Limity realizátorů
	*/
	interface GSmlvlrrDto {
		/**Identifikátor případu*/
		ixp_sml_pri?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Číslo realizátora*/
		cis_real?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**c_rok_real*/
		c_rok_real?: JsonDecimal|null;
		/**c_rok_real_rez*/
		c_rok_real_rez?: JsonDecimal|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Textový název realizátora*/
		cis_real_txt?: string|null;
		/**Příznak, zda je záznam uložen v db (slouží pro určení Insert/Update)*/
		flag_DB?: boolean|null;
		/**Textově vyjádřený stav záznamu (aktivní/stornován)*/
		stav_txt?: string|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GSmlvlrrPermissions|null;
	}
	const enum GSmlvlrrDtoNames { ixp_sml_pri = "ixp_sml_pri", rok = "rok", cis_real = "cis_real", ico = "ico", c_rok_real = "c_rok_real", c_rok_real_rez = "c_rok_real_rez", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cis_real_txt = "cis_real_txt", flag_DB = "flag_DB", stav_txt = "stav_txt", Permissions = "Permissions",}
	const enum GSmlvlrrDtoFragments { ixp_sml_pri = "*", rok = "*", cis_real = "*", ico = "*", c_rok_real = "*", c_rok_real_rez = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cis_real_txt = "*", flag_DB = "*", stav_txt = "*", Permissions = "Permissions",}
	const enum GSmlvlrrDtoTypes { ixp_sml_pri = "string", rok = "number", cis_real = "string", ico = "string", c_rok_real = "JsonDecimal", c_rok_real_rez = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cis_real_txt = "string", flag_DB = "boolean", stav_txt = "string", Permissions = "Gordic.Sml.Interface.GSmlvlrrPermissions",}
	const enum GSmlvlrrDtoTypeLengths { ixp_sml_pri = 12, cis_real = 6, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlvvadDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:smlvvad - Vazba varianty vlastností položek dokladu na ico,ucs*/
	interface GSmlvvadDto {
		/**šablona*/
		ixs_vad?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		items?: Gordic.Sml.Interface.GCfc_itemSettingsDocDto[]|null;
	}
	const enum GSmlvvadDtoNames { ixs_vad = "ixs_vad", ico = "ico", ucs = "ucs", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", items = "items",}
	const enum GSmlvvadDtoFragments { ixs_vad = "*", ico = "*", ucs = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", items = "*",}
	const enum GSmlvvadDtoTypes { ixs_vad = "string", ico = "string", ucs = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", items = "Gordic.Sml.Interface.GCfc_itemSettingsDocDto[]",}
	const enum GSmlvvadDtoTypeLengths { ixs_vad = 12, ico = 10, ucs = 10, zmenu_prov = 12,}
	interface GCfc_itemSettingsDocDto {
		/**!číslo položky karty*/
		pol_id?: number|null;
		/**!distribuovaný název položky*/
		db_nazev?: string|null;
		/**název položky definovaný uživatelem*/
		nazev?: string|null;
		/**!zkratka položky definovaná uživatelem*/
		zkratka?: string|null;
		/**! následující atributy jsou skládány logickým OR podle typu skupiny
		*     !povinná
		*/
		priz_pov?: number|null;
		/**!viditelnost*/
		priz_vid?: number|null;
	}
	const enum GCfc_itemSettingsDocDtoNames { pol_id = "pol_id", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", priz_pov = "priz_pov", priz_vid = "priz_vid",}
	const enum GCfc_itemSettingsDocDtoFragments { pol_id = "*", db_nazev = "*", nazev = "*", zkratka = "*", priz_pov = "*", priz_vid = "*",}
	const enum GCfc_itemSettingsDocDtoTypes { pol_id = "number", db_nazev = "string", nazev = "string", zkratka = "string", priz_pov = "number", priz_vid = "number",}
	const enum GCfc_itemSettingsDocDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSmlVZDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Slovník pro content Veřejné Zakázky - ouško na detailu dokladu*/
	interface GSmlVZDto {
		ac_ver_zak?: string|null;
		ac_ag?: string|null;
		nazev?: string|null;
		dat_pri?: string|null;
		c?: JsonDecimal|null;
		c_sch?: JsonDecimal|null;
		s_vz_txt?: string|null;
		soutez_txt?: string|null;
		vz_cislo_vevz?: string|null;
		vz_cislo_prof?: string|null;
		vz_cislo_etrz?: string|null;
		vz_cislo_inen?: string|null;
	}
	const enum GSmlVZDtoNames { ac_ver_zak = "ac_ver_zak", ac_ag = "ac_ag", nazev = "nazev", dat_pri = "dat_pri", c = "c", c_sch = "c_sch", s_vz_txt = "s_vz_txt", soutez_txt = "soutez_txt", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_inen = "vz_cislo_inen",}
	const enum GSmlVZDtoFragments { ac_ver_zak = "*", ac_ag = "*", nazev = "*", dat_pri = "*", c = "*", c_sch = "*", s_vz_txt = "*", soutez_txt = "*", vz_cislo_vevz = "*", vz_cislo_prof = "*", vz_cislo_etrz = "*", vz_cislo_inen = "*",}
	const enum GSmlVZDtoTypes { ac_ver_zak = "string", ac_ag = "string", nazev = "string", dat_pri = "string", c = "JsonDecimal", c_sch = "JsonDecimal", s_vz_txt = "string", soutez_txt = "string", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", vz_cislo_inen = "string",}
	const enum GSmlVZDtoTypeLengths {}
	interface GRozaaatFinancniStavDto {
		/**DBCOLUMN:rozaaat.rok*/
		rok?: number|null;
		/**DBCOLUMN:rozaaat.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c_sml*/
		c_vz_sml?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c_sml*/
		c_12?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c_sml*/
		c_18?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:rozaaat.ico*/
		ico?: string|null;
		/**DBCOLUMN:rozaaat.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rozaaat.nks*/
		nks?: string|null;
		/**DBCOLUMN:rozaaat.uea*/
		uea?: string|null;
		/**DBCOLUMN:rozaaat.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:rozaaat.uec*/
		uec?: string|null;
		/**DBCOLUMN:rozaaat.ued*/
		ued?: string|null;
		/**DBCOLUMN:rozaaat.uee*/
		uee?: string|null;
		/**DBCOLUMN:rozaaat.uef*/
		uef?: string|null;
		/**DBCOLUMN:rozaaat.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:rozaaat.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:rozaaat.uei*/
		uei?: string|null;
		/**DBCOLUMN:rozaaat.uej*/
		uej?: string|null;
		/**DBCOLUMN:rozaaat.te0*/
		te0?: string|null;
		/**DBCOLUMN:rozaaat.te1*/
		te1?: string|null;
		/**DBCOLUMN:rozaaat.te2*/
		te2?: string|null;
		/**DBCOLUMN:rozaaat.te3*/
		te3?: string|null;
		/**DBCOLUMN:rozaaat.te4*/
		te4?: string|null;
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
	}
	const enum GRozaaatFinancniStavDtoNames { rok = "rok", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_12 = "c_12", c_18 = "c_18", c = "c", c_fak = "c_fak", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GRozaaatFinancniStavDtoFragments { rok = "*", c_sml = "*", c_vz_sml = "*", c_12 = "*", c_18 = "*", c = "*", c_fak = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GRozaaatFinancniStavDtoTypes { rok = "number", c_sml = "JsonDecimal", c_vz_sml = "JsonDecimal", c_12 = "JsonDecimal", c_18 = "JsonDecimal", c = "JsonDecimal", c_fak = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GRozaaatFinancniStavDtoTypeLengths { ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
	interface GSmlVZDetailDto {
		ixs_pri?: string|null;
		ixp_nab?: string|null;
		typ_ag_blok?: number|null;
	}
	const enum GSmlVZDetailDtoNames { ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", typ_ag_blok = "typ_ag_blok",}
	const enum GSmlVZDetailDtoFragments { ixs_pri = "*", ixp_nab = "*", typ_ag_blok = "*",}
	const enum GSmlVZDetailDtoTypes { ixs_pri = "string", ixp_nab = "string", typ_ag_blok = "number",}
	const enum GSmlVZDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSml_DetailDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Dto pro detail dokladu, vlastnosti z gupty - hlavní model. Smlpid v Guptě*/
	interface GSml_DetailDto {
		/**Důležité vlastnosti o okně/dokladu apod.*/
		SmlAtributy?: Gordic.Sml.Interface.GSmlAtributy|null;
		SmlValidators?: Gordic.Sml.Interface.GSmlValidatorsBools|null;
		/**The ixp*/
		ixp?: string|null;
		/**hodnoty financí závislé na dokladu*/
		findoc?: Gordic.Sml.Interface.GSml_FinDto|null;
		/**hodnoty financí závislé na případu*/
		finpripad?: Gordic.Sml.Interface.GSml_FinDto|null;
		lic?: string|null;
		/**datum podání*/
		dat_prij_pod?: JsonDate|null;
		/**deník*/
		ixp_den?: string|null;
		/**subřada*/
		subrada?: number|null;
		/**externí subjekt*/
		ixs_esu?: string|null;
		/**IČO externího subjektu*/
		ico_esu?: string|null;
		/**číslo smlouvy ext. subjektu*/
		ac_esu?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**jméno soutěže ke smlouvě*/
		soutez?: string|null;
		/**kód banky k cizímu účtu*/
		sk_ci?: string|null;
		/**cizí bankovní účet*/
		bu_ci?: string|null;
		/**AČ smlouvy*/
		ac?: string|null;
		/**AČ smlouvy zadané uživatelem AlterKey*/
		ac_sml?: string|null;
		/**cena za dodatky*/
		c_dod?: JsonDecimal|null;
		/**kategorie typu smlouvy*/
		ktg_typ?: number|null;
		/**stav smlouvy*/
		sml_stav?: number|null;
		/**aktivita*/
		eko_akt?: number|null;
		/**poznámka*/
		zadavatel?: string|null;
		/**datum změny timestamp*/
		dat_zmena?: JsonDate|null;
		/**doba určitá, neurčitá, ...*/
		typ_platnost?: number|null;
		/**související dokument 1*/
		ac_dok_1?: string|null;
		/**související dokument 2*/
		ac_dok_2?: string|null;
		/**účinnost smlouvy - datum nebo text  doručením, ...*/
		ucinnost?: string|null;
		/**ORJ vázané ke smlouvě - kdo jí vyhotovil*/
		ixs_orj?: string|null;
		/**DIČ externího subjektu*/
		dic_esu?: string|null;
		/**RČ externího subjektu*/
		rc_esu?: string|null;
		/**název externího subjektu*/
		nazev_esu?: string|null;
		/**kurz střed z kursovního lístku*/
		kurz_s?: JsonDecimal|null;
		/**stav položek smlouvy*/
		up_stav?: number|null;
		/**počet dodatků smlouvy*/
		num_dod_old?: number|null;
		ixs_orj_komp?: string|null;
		/**The sdat zmena*/
		sdat_zmena?: JsonDate|null;
		/**The sdat dok 1*/
		sdat_dok_1?: string|null;
		/**The sdat dok 2*/
		sdat_dok_2?: string|null;
		/**The sdat uko*/
		sdat_uko?: string|null;
		/**The ixprec*/
		ixprec?: Gordic.Sml.Interface.GWflsixpDto|null;
		/**The pid*/
		pid?: Gordic.Sml.Interface.GWflpidDto|null;
		top?: Gordic.Sml.Interface.GSmlTopDto|null;
		/**pomocná proměnná na select subřady*/
		sConfig?: string|null;
		/**předpona ac_sml*/
		rcp_prefix?: string|null;
		/**přípona ac_sml*/
		rcp_suffix?: string|null;
		/**identifikace vázané smlouvy k objednávce*/
		ixp_sml?: string|null;
		/**identifikace vázané smlouvy k dodatku - 358.20 04.04.08*/
		ixp_sml_pri?: string|null;
		/**ac vázané smlouvy*/
		ac_nad?: string|null;
		/**ac_sml vázané smlouvy*/
		ac_sml_nad?: string|null;
		/**kategorie nadřazené smlouvy*/
		ktg_typ_nad?: number|null;
		/**typ dokaldu nadřazené smlouvy*/
		ixs_typ_nad?: string|null;
		/**příznak, zda je doklad smlouva či objednávka*/
		typ_dok?: number|null;
		/**příznak, v jakém režimu je doklad - vazba obj na sml, vazba sml na blokační agendu, vazba dodatku na sml*/
		mode_dok?: number|null;
		/**čítač počtu navázaných objednávek na smlouvu 
		*     SML - pokud je > 0, pak na smlouvu jsou vázány obj
		*     OBJ - pokud je -1, pak obj již provedla inkrement čítače na smlouvě
		*/
		num_obj?: number|null;
		/**hodnota kurzu v případě typu = pevný smluvní, pevný systémový*/
		kurz?: JsonDecimal|null;
		/**množství měny v kursovním lístku*/
		m?: JsonDecimal|null;
		/**typ kurz - ng_typkurzXXX*/
		typ_kurz?: number|null;
		/**The sdat ucinnost*/
		sdat_ucinnost?: string|null;
		/**název knihy - do titulku detailu*/
		ixp_den_txt?: string|null;
		/**kategorie knihy  - naplní ho funkce _selectKniha*/
		ktg_den?: number|null;
		/**období knihy  - naplní ho funkce _selectKniha*/
		rok_den?: number|null;
		/**příznak přístupu funkce ke knize - naplní ho funkce _selectKniha*/
		pristup_den?: number|null;
		/**příznak přečtení dokladu*/
		priz_view?: number|null;
		/**The ixp ext*/
		ixp_ext?: string|null;
		/**důvod storna dokladu*/
		storno_duvod?: string|null;
		/**proměnná pro univerzální použití*/
		l_num_dec?: JsonDecimal|null;
		/**proměnná pro univerzální použití*/
		l_num2_dec?: JsonDecimal|null;
		/**proměnná pro univerzální použití*/
		l_num_int?: number|null;
		/**proměnná pro univerzální použití*/
		l_num2_int?: number|null;
		/**zastupující osoba vlastní strany*/
		ixs_ref_zast?: string|null;
		/**zastupující osoba druhé strany - složeno ixs_esu, lic_zast_esu, por_zast_esu*/
		ixs_esu_zast?: string|null;
		ixs_esu_zast_txt?: string|null;
		/**zastupující osoba druhé strany - složeno ixs_esu, lic_zast_esu, por_zast_esu*/
		lic_zast_esu?: string|null;
		/**zastupující osoba druhé strany*/
		por_zast_esu?: number|null;
		/**zastupující osoba druhé strany*/
		dat_dok_1?: JsonDate|null;
		/**datum souvisejícího dokladu 2*/
		dat_dok_2?: JsonDate|null;
		/**způsob ukončení*/
		ixs_zuk?: string|null;
		/**kategorie ukončení*/
		ktg_zuk?: number|null;
		/**datum ukončení*/
		dat_uko?: JsonDate|null;
		/**popis vlastní org*/
		isu_txt?: string|null;
		/**The smlesu*/
		smlesu?: Gordic.Sml.Interface.GSmlsesuDto|null;
		/**The sankce*/
		sankce?: Gordic.Sml.Interface.GSmlSankceDto|null;
		/**datum odeslání*/
		dat_odes?: JsonDate|null;
		/**stav doručení*/
		s_dor?: number|null;
		/**textově stav doručení*/
		text_odes?: string|null;
		/**čítač počtu navázaných dodatků na smlouvu  SML - pokud je > 0, pak na smlouvu jsou vázány dod; DOD - pokud je -1,pak dodatek již provedl inkrement čítače na smlouvě*/
		num_dod?: number|null;
		/**způsob definice ceny - absolutní či inkrementální*/
		zp_def_ceny?: number|null;
		/**číslo dodatku vázaného na smlouvu. Na smlouvě nabývá hodnoty 0, na dodatku kladných*/
		cislo_dod?: number|null;
		/**The sdat prij pod*/
		sdat_prij_pod?: string|null;
		/**The PFK*/
		pfk?: Gordic.Sml.Interface.GSmlPfkDto|null;
		/**The issp*/
		issp?: Gordic.Sml.Interface.GSmlIisspDto|null;
		/**příznak, že případ rezervace v IISSP je ve stavu Odesláno - zmrazí úpravu financování*/
		brezIISSPOdeslano?: boolean|null;
		/**příznak pro řízení funkcí v sp - např stornování PFK*/
		typ_cmd?: number|null;
		/**The number SML2RS*/
		num_sml2rs?: number|null;
		/**stupeň verifikace ESU*/
		stupen_ver?: number|null;
		/**The dat SGN*/
		dat_sgn?: JsonDate|null;
		/**The dat SGN ext*/
		dat_sgn_ext?: JsonDate|null;
		/**The sdat SGN*/
		sdat_sgn?: string|null;
		/**The sdat SGN ext*/
		sdat_sgn_ext?: string|null;
		/**The n SML rada acsml*/
		n_sml_rada_acsml?: number|null;
		/**vyhodnocení zveřejňování*/
		public_?: Gordic.Sml.Interface.GSmlIisspDto|null;
		/**The typ esu*/
		typ_esu?: number|null;
		/**record pro Účetní kontrolu UK*/
		uk?: Gordic.Sml.Interface.GSmlPfkDto|null;
		/**record pro průběžnou kontrolu*/
		prk?: Gordic.Sml.Interface.GSmlPfkDto|null;
		sml_stav_txt?: string|null;
		dod_obj?: number|null;
		/**stav FK kombinovaný s PK*/
		stav_pfk_prk?: number|null;
		Dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GSml_DetailDtoNames { SmlAtributy = "SmlAtributy", SmlValidators = "SmlValidators", ixp = "ixp", findoc = "findoc", finpripad = "finpripad", lic = "lic", dat_prij_pod = "dat_prij_pod", ixp_den = "ixp_den", subrada = "subrada", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ac_esu = "ac_esu", poznamka = "poznamka", soutez = "soutez", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", c_dod = "c_dod", ktg_typ = "ktg_typ", sml_stav = "sml_stav", eko_akt = "eko_akt", zadavatel = "zadavatel", dat_zmena = "dat_zmena", typ_platnost = "typ_platnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", dic_esu = "dic_esu", rc_esu = "rc_esu", nazev_esu = "nazev_esu", kurz_s = "kurz_s", up_stav = "up_stav", num_dod_old = "num_dod_old", ixs_orj_komp = "ixs_orj_komp", sdat_zmena = "sdat_zmena", sdat_dok_1 = "sdat_dok_1", sdat_dok_2 = "sdat_dok_2", sdat_uko = "sdat_uko", ixprec = "ixprec", pid = "pid", top = "top", sConfig = "sConfig", rcp_prefix = "rcp_prefix", rcp_suffix = "rcp_suffix", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ktg_typ_nad = "ktg_typ_nad", ixs_typ_nad = "ixs_typ_nad", typ_dok = "typ_dok", mode_dok = "mode_dok", num_obj = "num_obj", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", sdat_ucinnost = "sdat_ucinnost", ixp_den_txt = "ixp_den_txt", ktg_den = "ktg_den", rok_den = "rok_den", pristup_den = "pristup_den", priz_view = "priz_view", ixp_ext = "ixp_ext", storno_duvod = "storno_duvod", l_num_dec = "l_num_dec", l_num2_dec = "l_num2_dec", l_num_int = "l_num_int", l_num2_int = "l_num2_int", ixs_ref_zast = "ixs_ref_zast", ixs_esu_zast = "ixs_esu_zast", ixs_esu_zast_txt = "ixs_esu_zast_txt", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", isu_txt = "isu_txt", smlesu = "smlesu", sankce = "sankce", dat_odes = "dat_odes", s_dor = "s_dor", text_odes = "text_odes", num_dod = "num_dod", zp_def_ceny = "zp_def_ceny", cislo_dod = "cislo_dod", sdat_prij_pod = "sdat_prij_pod", pfk = "pfk", issp = "issp", brezIISSPOdeslano = "brezIISSPOdeslano", typ_cmd = "typ_cmd", num_sml2rs = "num_sml2rs", stupen_ver = "stupen_ver", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", sdat_sgn = "sdat_sgn", sdat_sgn_ext = "sdat_sgn_ext", n_sml_rada_acsml = "n_sml_rada_acsml", public_ = "public_", typ_esu = "typ_esu", uk = "uk", prk = "prk", sml_stav_txt = "sml_stav_txt", dod_obj = "dod_obj", stav_pfk_prk = "stav_pfk_prk", Dokument = "Dokument",}
	const enum GSml_DetailDtoFragments { SmlAtributy = "*", SmlValidators = "*", ixp = "*", findoc = "*", finpripad = "*", lic = "*", dat_prij_pod = "*", ixp_den = "*", subrada = "*", ixs_esu = "*", ico_esu = "*", ac_esu = "*", poznamka = "*", soutez = "*", sk_ci = "*", bu_ci = "*", ac = "*", ac_sml = "*", c_dod = "*", ktg_typ = "*", sml_stav = "*", eko_akt = "*", zadavatel = "*", dat_zmena = "*", typ_platnost = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", dic_esu = "*", rc_esu = "*", nazev_esu = "*", kurz_s = "*", up_stav = "*", num_dod_old = "*", ixs_orj_komp = "*", sdat_zmena = "*", sdat_dok_1 = "*", sdat_dok_2 = "*", sdat_uko = "*", ixprec = "*", pid = "*", top = "*", sConfig = "*", rcp_prefix = "*", rcp_suffix = "*", ixp_sml = "*", ixp_sml_pri = "*", ac_nad = "*", ac_sml_nad = "*", ktg_typ_nad = "*", ixs_typ_nad = "*", typ_dok = "*", mode_dok = "*", num_obj = "*", kurz = "*", m = "*", typ_kurz = "*", sdat_ucinnost = "*", ixp_den_txt = "*", ktg_den = "*", rok_den = "*", pristup_den = "*", priz_view = "*", ixp_ext = "*", storno_duvod = "*", l_num_dec = "*", l_num2_dec = "*", l_num_int = "*", l_num2_int = "*", ixs_ref_zast = "*", ixs_esu_zast = "*", ixs_esu_zast_txt = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", isu_txt = "*", smlesu = "*", sankce = "*", dat_odes = "*", s_dor = "*", text_odes = "*", num_dod = "*", zp_def_ceny = "*", cislo_dod = "*", sdat_prij_pod = "*", pfk = "*", issp = "*", brezIISSPOdeslano = "*", typ_cmd = "*", num_sml2rs = "*", stupen_ver = "*", dat_sgn = "*", dat_sgn_ext = "*", sdat_sgn = "*", sdat_sgn_ext = "*", n_sml_rada_acsml = "*", public_ = "*", typ_esu = "*", uk = "*", prk = "*", sml_stav_txt = "*", dod_obj = "*", stav_pfk_prk = "*", Dokument = "*",}
	const enum GSml_DetailDtoTypes { SmlAtributy = "Gordic.Sml.Interface.GSmlAtributy", SmlValidators = "Gordic.Sml.Interface.GSmlValidatorsBools", ixp = "string", findoc = "Gordic.Sml.Interface.GSml_FinDto", finpripad = "Gordic.Sml.Interface.GSml_FinDto", lic = "string", dat_prij_pod = "JsonDate", ixp_den = "string", subrada = "number", ixs_esu = "string", ico_esu = "string", ac_esu = "string", poznamka = "string", soutez = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", c_dod = "JsonDecimal", ktg_typ = "number", sml_stav = "number", eko_akt = "number", zadavatel = "string", dat_zmena = "JsonDate", typ_platnost = "number", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", dic_esu = "string", rc_esu = "string", nazev_esu = "string", kurz_s = "JsonDecimal", up_stav = "number", num_dod_old = "number", ixs_orj_komp = "string", sdat_zmena = "JsonDate", sdat_dok_1 = "string", sdat_dok_2 = "string", sdat_uko = "string", ixprec = "Gordic.Sml.Interface.GWflsixpDto", pid = "Gordic.Sml.Interface.GWflpidDto", top = "Gordic.Sml.Interface.GSmlTopDto", sConfig = "string", rcp_prefix = "string", rcp_suffix = "string", ixp_sml = "string", ixp_sml_pri = "string", ac_nad = "string", ac_sml_nad = "string", ktg_typ_nad = "number", ixs_typ_nad = "string", typ_dok = "number", mode_dok = "number", num_obj = "number", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", sdat_ucinnost = "string", ixp_den_txt = "string", ktg_den = "number", rok_den = "number", pristup_den = "number", priz_view = "number", ixp_ext = "string", storno_duvod = "string", l_num_dec = "JsonDecimal", l_num2_dec = "JsonDecimal", l_num_int = "number", l_num2_int = "number", ixs_ref_zast = "string", ixs_esu_zast = "string", ixs_esu_zast_txt = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", isu_txt = "string", smlesu = "Gordic.Sml.Interface.GSmlsesuDto", sankce = "Gordic.Sml.Interface.GSmlSankceDto", dat_odes = "JsonDate", s_dor = "number", text_odes = "string", num_dod = "number", zp_def_ceny = "number", cislo_dod = "number", sdat_prij_pod = "string", pfk = "Gordic.Sml.Interface.GSmlPfkDto", issp = "Gordic.Sml.Interface.GSmlIisspDto", brezIISSPOdeslano = "boolean", typ_cmd = "number", num_sml2rs = "number", stupen_ver = "number", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", sdat_sgn = "string", sdat_sgn_ext = "string", n_sml_rada_acsml = "number", public_ = "Gordic.Sml.Interface.GSmlIisspDto", typ_esu = "number", uk = "Gordic.Sml.Interface.GSmlPfkDto", prk = "Gordic.Sml.Interface.GSmlPfkDto", sml_stav_txt = "string", dod_obj = "number", stav_pfk_prk = "number", Dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GSml_DetailDtoTypeLengths {}
	interface GSmlAtributy {
		dat_zmena?: JsonDate|null;
		hlppid?: Gordic.Sml.Interface.GSml_DetailDto|null;
		aktpid?: Gordic.Sml.Interface.GSml_DetailDto|null;
	}
	const enum GSmlAtributyNames { dat_zmena = "dat_zmena", hlppid = "hlppid", aktpid = "aktpid",}
	const enum GSmlAtributyFragments { dat_zmena = "*", hlppid = "*", aktpid = "*",}
	const enum GSmlAtributyTypes { dat_zmena = "JsonDate", hlppid = "Gordic.Sml.Interface.GSml_DetailDto", aktpid = "Gordic.Sml.Interface.GSml_DetailDto",}
	const enum GSmlAtributyTypeLengths {}
	interface GSmlValidatorsBools {
		ac_sml?: boolean|null;
		c_mena_doc?: boolean|null;
		fin_od?: boolean|null;
		fin_do?: boolean|null;
	}
	const enum GSmlValidatorsBoolsNames { ac_sml = "ac_sml", c_mena_doc = "c_mena_doc", fin_od = "fin_od", fin_do = "fin_do",}
	const enum GSmlValidatorsBoolsFragments { ac_sml = "*", c_mena_doc = "*", fin_od = "*", fin_do = "*",}
	const enum GSmlValidatorsBoolsTypes { ac_sml = "boolean", c_mena_doc = "boolean", fin_od = "boolean", fin_do = "boolean",}
	const enum GSmlValidatorsBoolsTypeLengths {}
	interface GSmlCheckValidField {
		dataForValidate?: Gordic.Sml.Interface.GSml_DetailDto|null;
		CheckField?: Gordic.Sml.Interface.GSmlValidatorsBools|null;
	}
	const enum GSmlCheckValidFieldNames { dataForValidate = "dataForValidate", CheckField = "CheckField",}
	const enum GSmlCheckValidFieldFragments { dataForValidate = "*", CheckField = "*",}
	const enum GSmlCheckValidFieldTypes { dataForValidate = "Gordic.Sml.Interface.GSml_DetailDto", CheckField = "Gordic.Sml.Interface.GSmlValidatorsBools",}
	const enum GSmlCheckValidFieldTypeLengths {}
	interface GFinPolozky_DetailDoklad {
		/**ng_modeNavrh, ng_modeSml*/
		rezimPol?: number|null;
		/**ixp smlouvy*/
		ixp_p?: string|null;
		/**ac smlouvy*/
		ac_p?: string|null;
		smlpid?: Gordic.Sml.Interface.GSml_DetailDto|null;
	}
	const enum GFinPolozky_DetailDokladNames { rezimPol = "rezimPol", ixp_p = "ixp_p", ac_p = "ac_p", smlpid = "smlpid",}
	const enum GFinPolozky_DetailDokladFragments { rezimPol = "*", ixp_p = "*", ac_p = "*", smlpid = "*",}
	const enum GFinPolozky_DetailDokladTypes { rezimPol = "number", ixp_p = "string", ac_p = "string", smlpid = "Gordic.Sml.Interface.GSml_DetailDto",}
	const enum GFinPolozky_DetailDokladTypeLengths {}
	interface GSml_DetailBoolDto {
		dto?: Gordic.Sml.Interface.GSml_DetailDto|null;
		boolValue?: boolean|null;
	}
	const enum GSml_DetailBoolDtoNames { dto = "dto", boolValue = "boolValue",}
	const enum GSml_DetailBoolDtoFragments { dto = "*", boolValue = "*",}
	const enum GSml_DetailBoolDtoTypes { dto = "Gordic.Sml.Interface.GSml_DetailDto", boolValue = "boolean",}
	const enum GSml_DetailBoolDtoTypeLengths {}
	interface GSmlDetailKontrolaCastkyDto extends Gordic.Sml.Interface.GSml_DetailDto {
		/**nová částka v políčku c_mena*/
		new_c_mena?: JsonDecimal|null;
		/**nová částka v políčku c_mena*/
		new_c_mena_doc?: JsonDecimal|null;
	}
	const enum GSmlDetailKontrolaCastkyDtoNames { new_c_mena = "new_c_mena", new_c_mena_doc = "new_c_mena_doc", SmlAtributy = "SmlAtributy", SmlValidators = "SmlValidators", ixp = "ixp", findoc = "findoc", finpripad = "finpripad", lic = "lic", dat_prij_pod = "dat_prij_pod", ixp_den = "ixp_den", subrada = "subrada", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ac_esu = "ac_esu", poznamka = "poznamka", soutez = "soutez", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", c_dod = "c_dod", ktg_typ = "ktg_typ", sml_stav = "sml_stav", eko_akt = "eko_akt", zadavatel = "zadavatel", dat_zmena = "dat_zmena", typ_platnost = "typ_platnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", dic_esu = "dic_esu", rc_esu = "rc_esu", nazev_esu = "nazev_esu", kurz_s = "kurz_s", up_stav = "up_stav", num_dod_old = "num_dod_old", ixs_orj_komp = "ixs_orj_komp", sdat_zmena = "sdat_zmena", sdat_dok_1 = "sdat_dok_1", sdat_dok_2 = "sdat_dok_2", sdat_uko = "sdat_uko", ixprec = "ixprec", pid = "pid", top = "top", sConfig = "sConfig", rcp_prefix = "rcp_prefix", rcp_suffix = "rcp_suffix", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ktg_typ_nad = "ktg_typ_nad", ixs_typ_nad = "ixs_typ_nad", typ_dok = "typ_dok", mode_dok = "mode_dok", num_obj = "num_obj", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", sdat_ucinnost = "sdat_ucinnost", ixp_den_txt = "ixp_den_txt", ktg_den = "ktg_den", rok_den = "rok_den", pristup_den = "pristup_den", priz_view = "priz_view", ixp_ext = "ixp_ext", storno_duvod = "storno_duvod", l_num_dec = "l_num_dec", l_num2_dec = "l_num2_dec", l_num_int = "l_num_int", l_num2_int = "l_num2_int", ixs_ref_zast = "ixs_ref_zast", ixs_esu_zast = "ixs_esu_zast", ixs_esu_zast_txt = "ixs_esu_zast_txt", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", isu_txt = "isu_txt", smlesu = "smlesu", sankce = "sankce", dat_odes = "dat_odes", s_dor = "s_dor", text_odes = "text_odes", num_dod = "num_dod", zp_def_ceny = "zp_def_ceny", cislo_dod = "cislo_dod", sdat_prij_pod = "sdat_prij_pod", pfk = "pfk", issp = "issp", brezIISSPOdeslano = "brezIISSPOdeslano", typ_cmd = "typ_cmd", num_sml2rs = "num_sml2rs", stupen_ver = "stupen_ver", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", sdat_sgn = "sdat_sgn", sdat_sgn_ext = "sdat_sgn_ext", n_sml_rada_acsml = "n_sml_rada_acsml", public_ = "public_", typ_esu = "typ_esu", uk = "uk", prk = "prk", sml_stav_txt = "sml_stav_txt", dod_obj = "dod_obj", stav_pfk_prk = "stav_pfk_prk", Dokument = "Dokument",}
	const enum GSmlDetailKontrolaCastkyDtoFragments { new_c_mena = "*", new_c_mena_doc = "*", SmlAtributy = "*", SmlValidators = "*", ixp = "*", findoc = "*", finpripad = "*", lic = "*", dat_prij_pod = "*", ixp_den = "*", subrada = "*", ixs_esu = "*", ico_esu = "*", ac_esu = "*", poznamka = "*", soutez = "*", sk_ci = "*", bu_ci = "*", ac = "*", ac_sml = "*", c_dod = "*", ktg_typ = "*", sml_stav = "*", eko_akt = "*", zadavatel = "*", dat_zmena = "*", typ_platnost = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", dic_esu = "*", rc_esu = "*", nazev_esu = "*", kurz_s = "*", up_stav = "*", num_dod_old = "*", ixs_orj_komp = "*", sdat_zmena = "*", sdat_dok_1 = "*", sdat_dok_2 = "*", sdat_uko = "*", ixprec = "*", pid = "*", top = "*", sConfig = "*", rcp_prefix = "*", rcp_suffix = "*", ixp_sml = "*", ixp_sml_pri = "*", ac_nad = "*", ac_sml_nad = "*", ktg_typ_nad = "*", ixs_typ_nad = "*", typ_dok = "*", mode_dok = "*", num_obj = "*", kurz = "*", m = "*", typ_kurz = "*", sdat_ucinnost = "*", ixp_den_txt = "*", ktg_den = "*", rok_den = "*", pristup_den = "*", priz_view = "*", ixp_ext = "*", storno_duvod = "*", l_num_dec = "*", l_num2_dec = "*", l_num_int = "*", l_num2_int = "*", ixs_ref_zast = "*", ixs_esu_zast = "*", ixs_esu_zast_txt = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", isu_txt = "*", smlesu = "*", sankce = "*", dat_odes = "*", s_dor = "*", text_odes = "*", num_dod = "*", zp_def_ceny = "*", cislo_dod = "*", sdat_prij_pod = "*", pfk = "*", issp = "*", brezIISSPOdeslano = "*", typ_cmd = "*", num_sml2rs = "*", stupen_ver = "*", dat_sgn = "*", dat_sgn_ext = "*", sdat_sgn = "*", sdat_sgn_ext = "*", n_sml_rada_acsml = "*", public_ = "*", typ_esu = "*", uk = "*", prk = "*", sml_stav_txt = "*", dod_obj = "*", stav_pfk_prk = "*", Dokument = "*",}
	const enum GSmlDetailKontrolaCastkyDtoTypes { new_c_mena = "JsonDecimal", new_c_mena_doc = "JsonDecimal", SmlAtributy = "Gordic.Sml.Interface.GSmlAtributy", SmlValidators = "Gordic.Sml.Interface.GSmlValidatorsBools", ixp = "string", findoc = "Gordic.Sml.Interface.GSml_FinDto", finpripad = "Gordic.Sml.Interface.GSml_FinDto", lic = "string", dat_prij_pod = "JsonDate", ixp_den = "string", subrada = "number", ixs_esu = "string", ico_esu = "string", ac_esu = "string", poznamka = "string", soutez = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", c_dod = "JsonDecimal", ktg_typ = "number", sml_stav = "number", eko_akt = "number", zadavatel = "string", dat_zmena = "JsonDate", typ_platnost = "number", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", dic_esu = "string", rc_esu = "string", nazev_esu = "string", kurz_s = "JsonDecimal", up_stav = "number", num_dod_old = "number", ixs_orj_komp = "string", sdat_zmena = "JsonDate", sdat_dok_1 = "string", sdat_dok_2 = "string", sdat_uko = "string", ixprec = "Gordic.Sml.Interface.GWflsixpDto", pid = "Gordic.Sml.Interface.GWflpidDto", top = "Gordic.Sml.Interface.GSmlTopDto", sConfig = "string", rcp_prefix = "string", rcp_suffix = "string", ixp_sml = "string", ixp_sml_pri = "string", ac_nad = "string", ac_sml_nad = "string", ktg_typ_nad = "number", ixs_typ_nad = "string", typ_dok = "number", mode_dok = "number", num_obj = "number", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", sdat_ucinnost = "string", ixp_den_txt = "string", ktg_den = "number", rok_den = "number", pristup_den = "number", priz_view = "number", ixp_ext = "string", storno_duvod = "string", l_num_dec = "JsonDecimal", l_num2_dec = "JsonDecimal", l_num_int = "number", l_num2_int = "number", ixs_ref_zast = "string", ixs_esu_zast = "string", ixs_esu_zast_txt = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", isu_txt = "string", smlesu = "Gordic.Sml.Interface.GSmlsesuDto", sankce = "Gordic.Sml.Interface.GSmlSankceDto", dat_odes = "JsonDate", s_dor = "number", text_odes = "string", num_dod = "number", zp_def_ceny = "number", cislo_dod = "number", sdat_prij_pod = "string", pfk = "Gordic.Sml.Interface.GSmlPfkDto", issp = "Gordic.Sml.Interface.GSmlIisspDto", brezIISSPOdeslano = "boolean", typ_cmd = "number", num_sml2rs = "number", stupen_ver = "number", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", sdat_sgn = "string", sdat_sgn_ext = "string", n_sml_rada_acsml = "number", public_ = "Gordic.Sml.Interface.GSmlIisspDto", typ_esu = "number", uk = "Gordic.Sml.Interface.GSmlPfkDto", prk = "Gordic.Sml.Interface.GSmlPfkDto", sml_stav_txt = "string", dod_obj = "number", stav_pfk_prk = "number", Dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GSmlDetailKontrolaCastkyDtoTypeLengths {}
	interface GSmlDetailSubradaCiselDto {
		dto?: Gordic.Sml.Interface.GSml_DetailDto|null;
		msg_p?: boolean|null;
	}
	const enum GSmlDetailSubradaCiselDtoNames { dto = "dto", msg_p = "msg_p",}
	const enum GSmlDetailSubradaCiselDtoFragments { dto = "*", msg_p = "*",}
	const enum GSmlDetailSubradaCiselDtoTypes { dto = "Gordic.Sml.Interface.GSml_DetailDto", msg_p = "boolean",}
	const enum GSmlDetailSubradaCiselDtoTypeLengths {}
	/**Dto, které slouží pro uložení částky v rozpisu v záložce financování
	*     Obsahuje celý detail a také buňky v gridu
	*/
	interface GSml_Detail_RozpisDto extends Gordic.Sml.Interface.GSml_DetailDto {
		/**Sloupeček rok v rozpisu v záložce financování*/
		Column_Rok?: number|null;
		/**Sloupeček kurz v rozpisu v záložce financování*/
		Column_Kurz?: JsonDecimal|null;
		/**Sloupeček m v rozpisu v záložce financování*/
		Column_m?: JsonDecimal|null;
		/**Sloupeček c v rozpisu v záložce financování*/
		Column_c?: JsonDecimal|null;
		/**Sloupeček c_mena v rozpisu v záložce financování*/
		Column_c_mena?: JsonDecimal|null;
		/**Sloupeček mena v rozpisu v záložce financování, cena položek za daný rok*/
		Column_mena?: number|null;
		/**Sloupeček c_pol v rozpisu v záložce financování*/
		Column_c_pol?: JsonDecimal|null;
		/**Pracovní hdonotal_c_mena*/
		l_c_mena?: JsonDecimal|null;
		detail?: Gordic.Sml.Interface.GSml_DetailDto|null;
	}
	const enum GSml_Detail_RozpisDtoNames { Column_Rok = "Column_Rok", Column_Kurz = "Column_Kurz", Column_m = "Column_m", Column_c = "Column_c", Column_c_mena = "Column_c_mena", Column_mena = "Column_mena", Column_c_pol = "Column_c_pol", l_c_mena = "l_c_mena", detail = "detail", SmlAtributy = "SmlAtributy", SmlValidators = "SmlValidators", ixp = "ixp", findoc = "findoc", finpripad = "finpripad", lic = "lic", dat_prij_pod = "dat_prij_pod", ixp_den = "ixp_den", subrada = "subrada", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ac_esu = "ac_esu", poznamka = "poznamka", soutez = "soutez", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", c_dod = "c_dod", ktg_typ = "ktg_typ", sml_stav = "sml_stav", eko_akt = "eko_akt", zadavatel = "zadavatel", dat_zmena = "dat_zmena", typ_platnost = "typ_platnost", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", dic_esu = "dic_esu", rc_esu = "rc_esu", nazev_esu = "nazev_esu", kurz_s = "kurz_s", up_stav = "up_stav", num_dod_old = "num_dod_old", ixs_orj_komp = "ixs_orj_komp", sdat_zmena = "sdat_zmena", sdat_dok_1 = "sdat_dok_1", sdat_dok_2 = "sdat_dok_2", sdat_uko = "sdat_uko", ixprec = "ixprec", pid = "pid", top = "top", sConfig = "sConfig", rcp_prefix = "rcp_prefix", rcp_suffix = "rcp_suffix", ixp_sml = "ixp_sml", ixp_sml_pri = "ixp_sml_pri", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ktg_typ_nad = "ktg_typ_nad", ixs_typ_nad = "ixs_typ_nad", typ_dok = "typ_dok", mode_dok = "mode_dok", num_obj = "num_obj", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", sdat_ucinnost = "sdat_ucinnost", ixp_den_txt = "ixp_den_txt", ktg_den = "ktg_den", rok_den = "rok_den", pristup_den = "pristup_den", priz_view = "priz_view", ixp_ext = "ixp_ext", storno_duvod = "storno_duvod", l_num_dec = "l_num_dec", l_num2_dec = "l_num2_dec", l_num_int = "l_num_int", l_num2_int = "l_num2_int", ixs_ref_zast = "ixs_ref_zast", ixs_esu_zast = "ixs_esu_zast", ixs_esu_zast_txt = "ixs_esu_zast_txt", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", isu_txt = "isu_txt", smlesu = "smlesu", sankce = "sankce", dat_odes = "dat_odes", s_dor = "s_dor", text_odes = "text_odes", num_dod = "num_dod", zp_def_ceny = "zp_def_ceny", cislo_dod = "cislo_dod", sdat_prij_pod = "sdat_prij_pod", pfk = "pfk", issp = "issp", brezIISSPOdeslano = "brezIISSPOdeslano", typ_cmd = "typ_cmd", num_sml2rs = "num_sml2rs", stupen_ver = "stupen_ver", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", sdat_sgn = "sdat_sgn", sdat_sgn_ext = "sdat_sgn_ext", n_sml_rada_acsml = "n_sml_rada_acsml", public_ = "public_", typ_esu = "typ_esu", uk = "uk", prk = "prk", sml_stav_txt = "sml_stav_txt", dod_obj = "dod_obj", stav_pfk_prk = "stav_pfk_prk", Dokument = "Dokument",}
	const enum GSml_Detail_RozpisDtoFragments { Column_Rok = "*", Column_Kurz = "*", Column_m = "*", Column_c = "*", Column_c_mena = "*", Column_mena = "*", Column_c_pol = "*", l_c_mena = "*", detail = "*", SmlAtributy = "*", SmlValidators = "*", ixp = "*", findoc = "*", finpripad = "*", lic = "*", dat_prij_pod = "*", ixp_den = "*", subrada = "*", ixs_esu = "*", ico_esu = "*", ac_esu = "*", poznamka = "*", soutez = "*", sk_ci = "*", bu_ci = "*", ac = "*", ac_sml = "*", c_dod = "*", ktg_typ = "*", sml_stav = "*", eko_akt = "*", zadavatel = "*", dat_zmena = "*", typ_platnost = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", dic_esu = "*", rc_esu = "*", nazev_esu = "*", kurz_s = "*", up_stav = "*", num_dod_old = "*", ixs_orj_komp = "*", sdat_zmena = "*", sdat_dok_1 = "*", sdat_dok_2 = "*", sdat_uko = "*", ixprec = "*", pid = "*", top = "*", sConfig = "*", rcp_prefix = "*", rcp_suffix = "*", ixp_sml = "*", ixp_sml_pri = "*", ac_nad = "*", ac_sml_nad = "*", ktg_typ_nad = "*", ixs_typ_nad = "*", typ_dok = "*", mode_dok = "*", num_obj = "*", kurz = "*", m = "*", typ_kurz = "*", sdat_ucinnost = "*", ixp_den_txt = "*", ktg_den = "*", rok_den = "*", pristup_den = "*", priz_view = "*", ixp_ext = "*", storno_duvod = "*", l_num_dec = "*", l_num2_dec = "*", l_num_int = "*", l_num2_int = "*", ixs_ref_zast = "*", ixs_esu_zast = "*", ixs_esu_zast_txt = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", isu_txt = "*", smlesu = "*", sankce = "*", dat_odes = "*", s_dor = "*", text_odes = "*", num_dod = "*", zp_def_ceny = "*", cislo_dod = "*", sdat_prij_pod = "*", pfk = "*", issp = "*", brezIISSPOdeslano = "*", typ_cmd = "*", num_sml2rs = "*", stupen_ver = "*", dat_sgn = "*", dat_sgn_ext = "*", sdat_sgn = "*", sdat_sgn_ext = "*", n_sml_rada_acsml = "*", public_ = "*", typ_esu = "*", uk = "*", prk = "*", sml_stav_txt = "*", dod_obj = "*", stav_pfk_prk = "*", Dokument = "*",}
	const enum GSml_Detail_RozpisDtoTypes { Column_Rok = "number", Column_Kurz = "JsonDecimal", Column_m = "JsonDecimal", Column_c = "JsonDecimal", Column_c_mena = "JsonDecimal", Column_mena = "number", Column_c_pol = "JsonDecimal", l_c_mena = "JsonDecimal", detail = "Gordic.Sml.Interface.GSml_DetailDto", SmlAtributy = "Gordic.Sml.Interface.GSmlAtributy", SmlValidators = "Gordic.Sml.Interface.GSmlValidatorsBools", ixp = "string", findoc = "Gordic.Sml.Interface.GSml_FinDto", finpripad = "Gordic.Sml.Interface.GSml_FinDto", lic = "string", dat_prij_pod = "JsonDate", ixp_den = "string", subrada = "number", ixs_esu = "string", ico_esu = "string", ac_esu = "string", poznamka = "string", soutez = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", c_dod = "JsonDecimal", ktg_typ = "number", sml_stav = "number", eko_akt = "number", zadavatel = "string", dat_zmena = "JsonDate", typ_platnost = "number", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", dic_esu = "string", rc_esu = "string", nazev_esu = "string", kurz_s = "JsonDecimal", up_stav = "number", num_dod_old = "number", ixs_orj_komp = "string", sdat_zmena = "JsonDate", sdat_dok_1 = "string", sdat_dok_2 = "string", sdat_uko = "string", ixprec = "Gordic.Sml.Interface.GWflsixpDto", pid = "Gordic.Sml.Interface.GWflpidDto", top = "Gordic.Sml.Interface.GSmlTopDto", sConfig = "string", rcp_prefix = "string", rcp_suffix = "string", ixp_sml = "string", ixp_sml_pri = "string", ac_nad = "string", ac_sml_nad = "string", ktg_typ_nad = "number", ixs_typ_nad = "string", typ_dok = "number", mode_dok = "number", num_obj = "number", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", sdat_ucinnost = "string", ixp_den_txt = "string", ktg_den = "number", rok_den = "number", pristup_den = "number", priz_view = "number", ixp_ext = "string", storno_duvod = "string", l_num_dec = "JsonDecimal", l_num2_dec = "JsonDecimal", l_num_int = "number", l_num2_int = "number", ixs_ref_zast = "string", ixs_esu_zast = "string", ixs_esu_zast_txt = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", isu_txt = "string", smlesu = "Gordic.Sml.Interface.GSmlsesuDto", sankce = "Gordic.Sml.Interface.GSmlSankceDto", dat_odes = "JsonDate", s_dor = "number", text_odes = "string", num_dod = "number", zp_def_ceny = "number", cislo_dod = "number", sdat_prij_pod = "string", pfk = "Gordic.Sml.Interface.GSmlPfkDto", issp = "Gordic.Sml.Interface.GSmlIisspDto", brezIISSPOdeslano = "boolean", typ_cmd = "number", num_sml2rs = "number", stupen_ver = "number", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", sdat_sgn = "string", sdat_sgn_ext = "string", n_sml_rada_acsml = "number", public_ = "Gordic.Sml.Interface.GSmlIisspDto", typ_esu = "number", uk = "Gordic.Sml.Interface.GSmlPfkDto", prk = "Gordic.Sml.Interface.GSmlPfkDto", sml_stav_txt = "string", dod_obj = "number", stav_pfk_prk = "number", Dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GSml_Detail_RozpisDtoTypeLengths {}
	interface SetTypCenyDto {
		/**DBCOLUMN:smlspid.typ_ceny -*/
		typ_ceny?: number|null;
		/**Základní identrifikátor dokladu*/
		ixp?: string|null;
		/**Dto modelu*/
		smlpid?: Gordic.Sml.Interface.GSml_DetailDto|null;
	}
	const enum SetTypCenyDtoNames { typ_ceny = "typ_ceny", ixp = "ixp", smlpid = "smlpid",}
	const enum SetTypCenyDtoFragments { typ_ceny = "*", ixp = "*", smlpid = "*",}
	const enum SetTypCenyDtoTypes { typ_ceny = "number", ixp = "string", smlpid = "Gordic.Sml.Interface.GSml_DetailDto",}
	const enum SetTypCenyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSpolecneDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Společné metody*/
	interface GSpolecneDto {
	}
	const enum GSpolecneDtoNames {}
	const enum GSpolecneDtoFragments {}
	const enum GSpolecneDtoTypes {}
	const enum GSpolecneDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GSslstypDto.d.ts 

declare namespace Gordic.ControlsLogic.Server {
	/**DBTABLE:sslstyp - zkratka typu dokladu*/
	interface GSslstypDto {
		/**DBCOLUMN:sslstyp.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:sslstyp.lic*/
		lic?: string|null;
		/**DBCOLUMN:sslstyp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sslstyp.arw*/
		arw?: number|null;
		/**DBCOLUMN:sslstyp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sslstyp.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:sslstyp.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:sslstyp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslstyp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Název typu dokumentů%tt*/
		nazev?: string|null;
		/**Kategorie typu písemnosti*/
		ktg_typ?: number|null;
		/**DBCOLUMN:sslstyp.popis*/
		popis?: string|null;
		/**Výchozí stupen utajení/zveřejnění pro nově podávané dokumenty se zadaným typem dokumentu.*/
		st_utaj_id?: number|null;
		/**Lhůta pro vyřízení*/
		lhuta_vyr?: number|null;
		/**DBCOLUMN:sslstyp.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:sslstyp.ixs_ulz*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:sslstyp.aktivita_ssl*/
		aktivita_ssl?: number|null;
		/**DBCOLUMN:sslstyp.spis_pl*/
		spis_pl?: string|null;
		/**Výchozí spisový znak pro podání dokumentů s tímto typem dokumentu.*/
		spis_znak?: string|null;
		/**DBCOLUMN:sslstyp.ofic_nazev*/
		ofic_nazev?: string|null;
		/**Příznak generovat ČJ*/
		s_gen_cj?: number|null;
		/**V rámci SSL se tato položka přenese při podání automaticky jako dotčený subjekt dokumentu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:sslstyp.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:sslstyp.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:sslstyp.cs_nazev*/
		cs_nazev?: string|null;
		/**Příznak, zda se typ dokumentu má používat pouze u středisek uvedených výčtem. 0-platí pro všechna střediska.*/
		priz_vycet?: number|null;
		/**DBCOLUMN:sslstyp.ixs_cin*/
		ixs_cin?: string|null;
		/**DBCOLUMN:sslstyp.poc_dnu_vyp_dor*/
		poc_dnu_vyp_dor?: number|null;
		/**DBCOLUMN:sslstyp.ixs_typ_opr*/
		ixs_typ_opr?: string|null;
		/**DBCOLUMN:sslstyp.priz_rsp*/
		priz_rsp?: number|null;
		/**DBCOLUMN:sslstyp.ixs_frm_gform*/
		ixs_frm_gform?: string|null;
		/**DBCOLUMN:sslstyp.priz_epk*/
		priz_epk?: number|null;
		/**DBCOLUMN:sslstyp.predpl_vec*/
		predpl_vec?: string|null;
		/**DBCOLUMN:sslstyp.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:sslstyp.ixp_sablony*/
		ixp_sablony?: string|null;
		/**DBCOLUMN:sslstyp.ixs_frm_gform_spi*/
		ixs_frm_gform_spi?: string|null;
		/**DBCOLUMN:sslstyp.priz_dupli*/
		priz_dupli?: number|null;
		/**DBCOLUMN:sslstyp.over_duver*/
		over_duver?: number|null;
		/**DBCOLUMN:sslstyp.zakon_duvod_gdpr*/
		zakon_duvod_gdpr?: string|null;
		/**DBCOLUMN:sslstyp.s_dotaz_irp*/
		s_dotaz_irp?: number|null;
		/**DBCOLUMN:sslstyp.plan_zve*/
		plan_zve?: number|null;
		/**DBCOLUMN:sslstyp.priz_fyz*/
		priz_fyz?: number|null;
		/**Je sice NULL, ale v ADM ji vyžaduji jako povinnou*/
		ixs_zap?: string|null;
		/**DBCOLUMN:sslstyp.ixs_fsk*/
		ixs_fsk?: string|null;
		/**DBCOLUMN:sslstyp.ico*/
		ico?: string|null;
		/**DBCOLUMN:sslstyp.id_ext_alt*/
		id_ext_alt?: string|null;
	}
	const enum GSslstypDtoNames { ixs_typ = "ixs_typ", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ktg_typ = "ktg_typ", popis = "popis", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", ofic_nazev = "ofic_nazev", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", ixs_lpc = "ixs_lpc", z_int = "z_int", cs_nazev = "cs_nazev", priz_vycet = "priz_vycet", ixs_cin = "ixs_cin", poc_dnu_vyp_dor = "poc_dnu_vyp_dor", ixs_typ_opr = "ixs_typ_opr", priz_rsp = "priz_rsp", ixs_frm_gform = "ixs_frm_gform", priz_epk = "priz_epk", predpl_vec = "predpl_vec", typ_vazby = "typ_vazby", ixp_sablony = "ixp_sablony", ixs_frm_gform_spi = "ixs_frm_gform_spi", priz_dupli = "priz_dupli", over_duver = "over_duver", zakon_duvod_gdpr = "zakon_duvod_gdpr", s_dotaz_irp = "s_dotaz_irp", plan_zve = "plan_zve", priz_fyz = "priz_fyz", ixs_zap = "ixs_zap", ixs_fsk = "ixs_fsk", ico = "ico", id_ext_alt = "id_ext_alt",}
	const enum GSslstypDtoFragments { ixs_typ = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ktg_typ = "*", popis = "*", st_utaj_id = "*", lhuta_vyr = "*", zkratka = "*", ixs_ulz = "*", aktivita_ssl = "*", spis_pl = "*", spis_znak = "*", ofic_nazev = "*", s_gen_cj = "*", ixs_esu = "*", ixs_lpc = "*", z_int = "*", cs_nazev = "*", priz_vycet = "*", ixs_cin = "*", poc_dnu_vyp_dor = "*", ixs_typ_opr = "*", priz_rsp = "*", ixs_frm_gform = "*", priz_epk = "*", predpl_vec = "*", typ_vazby = "*", ixp_sablony = "*", ixs_frm_gform_spi = "*", priz_dupli = "*", over_duver = "*", zakon_duvod_gdpr = "*", s_dotaz_irp = "*", plan_zve = "*", priz_fyz = "*", ixs_zap = "*", ixs_fsk = "*", ico = "*", id_ext_alt = "*",}
	const enum GSslstypDtoTypes { ixs_typ = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ktg_typ = "number", popis = "string", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", ofic_nazev = "string", s_gen_cj = "number", ixs_esu = "string", ixs_lpc = "string", z_int = "number", cs_nazev = "string", priz_vycet = "number", ixs_cin = "string", poc_dnu_vyp_dor = "number", ixs_typ_opr = "string", priz_rsp = "number", ixs_frm_gform = "string", priz_epk = "number", predpl_vec = "string", typ_vazby = "number", ixp_sablony = "string", ixs_frm_gform_spi = "string", priz_dupli = "number", over_duver = "number", zakon_duvod_gdpr = "string", s_dotaz_irp = "number", plan_zve = "number", priz_fyz = "number", ixs_zap = "string", ixs_fsk = "string", ico = "string", id_ext_alt = "string",}
	const enum GSslstypDtoTypeLengths { ixs_typ = 12, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ofic_nazev = 254, ixs_esu = 12, ixs_lpc = 12, cs_nazev = 50, ixs_cin = 12, ixs_typ_opr = 12, ixs_frm_gform = 12, predpl_vec = 100, ixp_sablony = 12, ixs_frm_gform_spi = 12, zakon_duvod_gdpr = 1000, ixs_zap = 12, ixs_fsk = 12, ico = 10, id_ext_alt = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GVepssmoDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:vepssmo
	*      Smlouvy, objednávky - Položky VP
	*/
	interface GVepssmoDto {
		/**ixp_smo*/
		ixp_smo?: string|null;
		/**cis_smo*/
		cis_smo?: number|null;
		/**ixp_sml*/
		ixp_sml?: string|null;
		/**cis_sml*/
		cis_sml?: number|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**cis_vz*/
		cis_vz?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**cislo*/
		cislo?: string|null;
		/**cis_plan*/
		cis_plan?: number|null;
		/**identifik. požadavku*/
		ixs_poz?: string|null;
		/**cis_poz*/
		cis_poz?: number|null;
		/**m_sml*/
		m_sml?: JsonDecimal|null;
		/**m_obj_sml*/
		m_obj_sml?: JsonDecimal|null;
		/**m_fak*/
		m_fak?: JsonDecimal|null;
		/**m_maj*/
		m_maj?: JsonDecimal|null;
		/**c_sml*/
		c_sml?: JsonDecimal|null;
		/**c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**c_fak*/
		c_fak?: JsonDecimal|null;
		/**c_maj*/
		c_maj?: JsonDecimal|null;
		/**Standardní klasifikace produkce*/
		skp?: string|null;
		/**Materálové číslo, popř. IDK*/
		mat_cis?: string|null;
		/**Název dle SKP*/
		nazev_skp?: string|null;
		/**Název defnovaný uživatelem*/
		nazev?: string|null;
		/**Cílová skupina majetku*/
		skupina_id?: number|null;
		/**Cílový druh majetku*/
		drh_id?: number|null;
		/**měrná jednotka*/
		mj?: string|null;
		/**vyr_cis*/
		vyr_cis?: string|null;
		/**kod_pol*/
		kod_pol?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**nks zadavatele*/
		nks_zad?: string|null;
		/**Druh požadavku*/
		drh_poz?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**inv_cis*/
		inv_cis?: string|null;
		/**Popis*/
		popis?: string|null;
		/**ixs_dup*/
		ixs_dup?: string|null;
		/**typ položk z hlediska výdaje (-1 ) a příjmu (1)*/
		znam?: number|null;
		/**vp_stav*/
		vp_stav?: number|null;
		ixp_sml_pri?: string|null;
		/**evi_cis*/
		evi_cis?: string|null;
		/**ser_cis*/
		ser_cis?: string|null;
		/**sarze*/
		sarze?: string|null;
		/**Kód měny dle ekocmen*/
		mena?: number|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**m_kurz*/
		m_kurz?: JsonDecimal|null;
		/**c_sml_dph*/
		c_sml_dph?: JsonDecimal|null;
		/**c_c_sml_dph*/
		c_c_sml_dph?: JsonDecimal|null;
		/**c_sml_mena_z*/
		c_sml_mena_z?: JsonDecimal|null;
		/**c_c_sml_mena_dph*/
		c_c_sml_mena_dph?: JsonDecimal|null;
		/**c_sml_mena_dph*/
		c_sml_mena_dph?: JsonDecimal|null;
		/**dan_typ*/
		dan_typ?: number|null;
		/**ixp_smo_sml*/
		ixp_smo_sml?: string|null;
		/**cis_smo_sml*/
		cis_smo_sml?: number|null;
		/**ixp_sml_pri_sml*/
		ixp_sml_pri_sml?: string|null;
		/**mena_zkr*/
		mena_zkr?: string|null;
		/**ixs_dup_txt*/
		ixs_dup_txt?: string|null;
		/**vp_stav_txt*/
		vp_stav_txt?: string|null;
		/**ac_sml*/
		ac_sml?: string|null;
		/**ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**356.3 16.04.07 - znaménko množství a cen v závislosti na kategorii, stavu, atd...*/
		sign_m?: number|null;
		/**Příznak, zda je záznam v databázi*/
		flag_DB?: boolean|null;
		/**n0*/
		n0?: number|null;
		/**ktg_poz Typu požadavku*/
		ktg_poz?: number|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Sml.Interface.GVepssmoPermissions|null;
	}
	const enum GVepssmoDtoNames { ixp_smo = "ixp_smo", cis_smo = "cis_smo", ixp_sml = "ixp_sml", cis_sml = "cis_sml", ixs_pri = "ixs_pri", cis_vz = "cis_vz", ico = "ico", rok = "rok", cislo = "cislo", cis_plan = "cis_plan", ixs_poz = "ixs_poz", cis_poz = "cis_poz", m_sml = "m_sml", m_obj_sml = "m_obj_sml", m_fak = "m_fak", m_maj = "m_maj", c_sml = "c_sml", c_obj_sml = "c_obj_sml", c_fak = "c_fak", c_maj = "c_maj", skp = "skp", mat_cis = "mat_cis", nazev_skp = "nazev_skp", nazev = "nazev", skupina_id = "skupina_id", drh_id = "drh_id", mj = "mj", vyr_cis = "vyr_cis", kod_pol = "kod_pol", ucs = "ucs", nks = "nks", nks_zad = "nks_zad", drh_poz = "drh_poz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", inv_cis = "inv_cis", popis = "popis", ixs_dup = "ixs_dup", znam = "znam", vp_stav = "vp_stav", ixp_sml_pri = "ixp_sml_pri", evi_cis = "evi_cis", ser_cis = "ser_cis", sarze = "sarze", mena = "mena", kurz = "kurz", m_kurz = "m_kurz", c_sml_dph = "c_sml_dph", c_c_sml_dph = "c_c_sml_dph", c_sml_mena_z = "c_sml_mena_z", c_c_sml_mena_dph = "c_c_sml_mena_dph", c_sml_mena_dph = "c_sml_mena_dph", dan_typ = "dan_typ", ixp_smo_sml = "ixp_smo_sml", cis_smo_sml = "cis_smo_sml", ixp_sml_pri_sml = "ixp_sml_pri_sml", mena_zkr = "mena_zkr", ixs_dup_txt = "ixs_dup_txt", vp_stav_txt = "vp_stav_txt", ac_sml = "ac_sml", ac_ver_zak = "ac_ver_zak", sign_m = "sign_m", flag_DB = "flag_DB", n0 = "n0", ktg_poz = "ktg_poz", Permissions = "Permissions",}
	const enum GVepssmoDtoFragments { ixp_smo = "*", cis_smo = "*", ixp_sml = "*", cis_sml = "*", ixs_pri = "*", cis_vz = "*", ico = "*", rok = "*", cislo = "*", cis_plan = "*", ixs_poz = "*", cis_poz = "*", m_sml = "*", m_obj_sml = "*", m_fak = "*", m_maj = "*", c_sml = "*", c_obj_sml = "*", c_fak = "*", c_maj = "*", skp = "*", mat_cis = "*", nazev_skp = "*", nazev = "*", skupina_id = "*", drh_id = "*", mj = "*", vyr_cis = "*", kod_pol = "*", ucs = "*", nks = "*", nks_zad = "*", drh_poz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", inv_cis = "*", popis = "*", ixs_dup = "*", znam = "*", vp_stav = "*", ixp_sml_pri = "*", evi_cis = "*", ser_cis = "*", sarze = "*", mena = "*", kurz = "*", m_kurz = "*", c_sml_dph = "*", c_c_sml_dph = "*", c_sml_mena_z = "*", c_c_sml_mena_dph = "*", c_sml_mena_dph = "*", dan_typ = "*", ixp_smo_sml = "*", cis_smo_sml = "*", ixp_sml_pri_sml = "*", mena_zkr = "*", ixs_dup_txt = "*", vp_stav_txt = "*", ac_sml = "*", ac_ver_zak = "*", sign_m = "*", flag_DB = "*", n0 = "*", ktg_poz = "*", Permissions = "*",}
	const enum GVepssmoDtoTypes { ixp_smo = "string", cis_smo = "number", ixp_sml = "string", cis_sml = "number", ixs_pri = "string", cis_vz = "number", ico = "string", rok = "number", cislo = "string", cis_plan = "number", ixs_poz = "string", cis_poz = "number", m_sml = "JsonDecimal", m_obj_sml = "JsonDecimal", m_fak = "JsonDecimal", m_maj = "JsonDecimal", c_sml = "JsonDecimal", c_obj_sml = "JsonDecimal", c_fak = "JsonDecimal", c_maj = "JsonDecimal", skp = "string", mat_cis = "string", nazev_skp = "string", nazev = "string", skupina_id = "number", drh_id = "number", mj = "string", vyr_cis = "string", kod_pol = "string", ucs = "string", nks = "string", nks_zad = "string", drh_poz = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", inv_cis = "string", popis = "string", ixs_dup = "string", znam = "number", vp_stav = "number", ixp_sml_pri = "string", evi_cis = "string", ser_cis = "string", sarze = "string", mena = "number", kurz = "JsonDecimal", m_kurz = "JsonDecimal", c_sml_dph = "JsonDecimal", c_c_sml_dph = "JsonDecimal", c_sml_mena_z = "JsonDecimal", c_c_sml_mena_dph = "JsonDecimal", c_sml_mena_dph = "JsonDecimal", dan_typ = "number", ixp_smo_sml = "string", cis_smo_sml = "number", ixp_sml_pri_sml = "string", mena_zkr = "string", ixs_dup_txt = "string", vp_stav_txt = "string", ac_sml = "string", ac_ver_zak = "string", sign_m = "number", flag_DB = "boolean", n0 = "number", ktg_poz = "number", Permissions = "Gordic.Sml.Interface.GVepssmoPermissions",}
	const enum GVepssmoDtoTypeLengths { ixp_smo = 12, ixp_sml = 12, ixs_pri = 12, ico = 10, cislo = 16, ixs_poz = 12, skp = 15, mat_cis = 20, nazev_skp = 254, nazev = 254, mj = 5, vyr_cis = 40, kod_pol = 20, ucs = 10, nks = 12, nks_zad = 12, zmenu_prov = 12, inv_cis = 50, popis = 1000, ixs_dup = 12, ixp_sml_pri = 12, evi_cis = 40, ser_cis = 40, sarze = 40, ixp_smo_sml = 12, ixp_sml_pri_sml = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\GWflspidDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**DBTABLE:wflspid*/
	interface GWflspidDto {
		/**DBCOLUMN:wflspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:wflspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:wflspid.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:wflspid.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:wflspid.ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**DBCOLUMN:wflspid.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflspid.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:wflspid.stav_dist*/
		stav_dist?: number|null;
		/**DBCOLUMN:wflspid.stav_pis*/
		stav_pis?: number|null;
		/**DBCOLUMN:wflspid.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:wflspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:wflspid.ixs_typ*/
		ixs_typ?: string|null;
		/**Příznak, že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		s_prij?: number|null;
		/**DBCOLUMN:wflspid.s_ssl*/
		s_ssl?: number|null;
		/**DBCOLUMN:wflspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflspid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflspid.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:wflspid.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:wflspid.misto_vzniku*/
		misto_vzniku?: string|null;
		/**příznak že je el. soubor/komponenta podepsán (0-ne,1-podpis,2-podpis a razítko,3- jen razítko viz. číselník)*/
		s_sgn?: number|null;
		/**DBCOLUMN:wflspid.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:wflspid.cs_akt_znacka*/
		cs_akt_znacka?: string|null;
		/**DBCOLUMN:wflspid.priz_view_ssl*/
		priz_view_ssl?: number|null;
		/**Uživatelská barva připojená k dokumentu/spisu*/
		uzo?: string|null;
		/**DBCOLUMN:wflspid.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:wflspid.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:wflspid.ixs_fun_wfl*/
		ixs_fun_wfl?: string|null;
		/**DBCOLUMN:wflspid.s_uloz*/
		s_uloz?: number|null;
		/**DBCOLUMN:wflspid.dat_uloz*/
		dat_uloz?: JsonDate|null;
		/**DBCOLUMN:wflspid.ixs_su_wfl*/
		ixs_su_wfl?: string|null;
		/**DBCOLUMN:wflspid.s_odes*/
		s_odes?: number|null;
		/**DBCOLUMN:wflspid.dat_mpd0*/
		dat_mpd0?: JsonDate|null;
		/**DBCOLUMN:wflspid.priz_cj*/
		priz_cj?: number|null;
		/**DBCOLUMN:wflspid.dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**DBCOLUMN:wflspid.ixs_cj*/
		ixs_cj?: string|null;
		/**DBCOLUMN:wflspid.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:wflspid.puvod*/
		puvod?: number|null;
		/**DBCOLUMN:wflspid.s_schval*/
		s_schval?: number|null;
		/**DBCOLUMN:wflspid.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:wflspid.st_utaj_id*/
		st_utaj_id?: number|null;
		/**DBCOLUMN:wflspid.wfl_pristup*/
		wfl_pristup?: number|null;
		/**DBCOLUMN:wflspid.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:wflspid.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:wflspid.rok_spo_uda*/
		rok_spo_uda?: number|null;
		/**odkaz na nejvyšší entitu např. typový spis*/
		ixp_top?: string|null;
		/**DBCOLUMN:wflspid.typ_spis*/
		typ_spis?: number|null;
		/**DBCOLUMN:wflspid.barcode*/
		barcode?: string|null;
		/**DBCOLUMN:wflspid.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:wflspid.ixs_ext*/
		ixs_ext?: string|null;
		/**DBCOLUMN:wflspid.rok_skartace*/
		rok_skartace?: number|null;
		/**DBCOLUMN:wflspid.ixs_spu*/
		ixs_spu?: string|null;
		/**DBCOLUMN:wflspid.poc_listu*/
		poc_listu?: string|null;
		/**DBCOLUMN:wflspid.poc_stran*/
		poc_stran?: number|null;
		/**DBCOLUMN:wflspid.poc_kop*/
		poc_kop?: number|null;
		/**DBCOLUMN:wflspid.poc_priloh*/
		poc_priloh?: number|null;
		/**DBCOLUMN:wflspid.poc_l_priloh*/
		poc_l_priloh?: string|null;
		/**DBCOLUMN:wflspid.cj*/
		cj?: string|null;
		/**DBCOLUMN:wflspid.ico*/
		ico?: string|null;
	}
	const enum GWflspidDtoNames { ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico",}
	const enum GWflspidDtoFragments { ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*",}
	const enum GWflspidDtoTypes { ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string",}
	const enum GWflspidDtoTypeLengths { ixp = 12, lic = 4, ixp_spis = 12, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, akt_znacka = 50, ixs_typ = 12, zmenu_prov = 12, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_cj = 12, ixs_lpc = 12, umisteni = 20, skar_znak = 2, ixp_top = 12, barcode = 50, ixs_ext = 12, ixs_spu = 12, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\HlaskyResultDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Objekt pro vrácení stavu z ISL metod*/
	interface HlaskyResultDto {
		State?: string|null;
		Message?: string|null;
		Question?: string|null;
		QuestionName?: string|null;
	}
	const enum HlaskyResultDtoNames { State = "State", Message = "Message", Question = "Question", QuestionName = "QuestionName",}
	const enum HlaskyResultDtoFragments { State = "*", Message = "*", Question = "*", QuestionName = "*",}
	const enum HlaskyResultDtoTypes { State = "string", Message = "string", Question = "string", QuestionName = "string",}
	const enum HlaskyResultDtoTypeLengths {}
	interface ChybovyStavDto {
		/**Gets or sets the state. - Stav chyby, nějaké číslo.
		*     0 - NENÍ CHYBA
		*     1 - CHYBA
		*     2 a dál - vyjímečný stav
		*/
		State?: number|null;
		/**Gets or sets the message. - Nějaká zpráva chyby*/
		Message?: string|null;
		/**Gets or sets the SQL error. - sqlError chyby*/
		sqlError?: string|null;
		/**Gets or sets the help value. - Pomocná vlastnost typu decimal*/
		HelpValueDecimalOne?: JsonDecimal|null;
		HelpValueStringOne?: string|null;
		/**Gets or sets the help value. - Pomocná vlastnost typu decimal*/
		HelpValueDecimalTwo?: JsonDecimal|null;
		/**Gets or sets the help value. - Pomocná vlastnost typu decimal*/
		HelpValueDate?: JsonDate|null;
		Data?: object|null;
		PomocnaData?: object|null;
	}
	const enum ChybovyStavDtoNames { State = "State", Message = "Message", sqlError = "sqlError", HelpValueDecimalOne = "HelpValueDecimalOne", HelpValueStringOne = "HelpValueStringOne", HelpValueDecimalTwo = "HelpValueDecimalTwo", HelpValueDate = "HelpValueDate", Data = "Data", PomocnaData = "PomocnaData",}
	const enum ChybovyStavDtoFragments { State = "*", Message = "*", sqlError = "*", HelpValueDecimalOne = "*", HelpValueStringOne = "*", HelpValueDecimalTwo = "*", HelpValueDate = "*", Data = "*", PomocnaData = "*",}
	const enum ChybovyStavDtoTypes { State = "number", Message = "string", sqlError = "string", HelpValueDecimalOne = "JsonDecimal", HelpValueStringOne = "string", HelpValueDecimalTwo = "JsonDecimal", HelpValueDate = "JsonDate", Data = "object", PomocnaData = "object",}
	const enum ChybovyStavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Dto\TempDto\GTempDto.d.ts 

declare namespace Gordic.Sml.Interface {
	/**TODO: Asi se využívá pouze pro GetMenaZkr a to se používá ve věcném profilu*/
	interface GTemp02Dto {
		/**?*/
		l?: string|null;
	}
	const enum GTemp02DtoNames { l = "l",}
	const enum GTemp02DtoFragments { l = "*",}
	const enum GTemp02DtoTypes { l = "string",}
	const enum GTemp02DtoTypeLengths {}
	/**TODO: Adam dříve využíval, ale asi už nebude potřeba?*/
	interface GTemp06Dto {
		temp1?: JsonDecimal|null;
		temp2?: JsonDecimal|null;
	}
	const enum GTemp06DtoNames { temp1 = "temp1", temp2 = "temp2",}
	const enum GTemp06DtoFragments { temp1 = "*", temp2 = "*",}
	const enum GTemp06DtoTypes { temp1 = "JsonDecimal", temp2 = "JsonDecimal",}
	const enum GTemp06DtoTypeLengths {}
	/**TODO: Adam dříve využíval, ale asi už nebude potřeba?*/
	interface GTemp07Dto {
		temp1?: string|null;
		temp2?: string|null;
	}
	const enum GTemp07DtoNames { temp1 = "temp1", temp2 = "temp2",}
	const enum GTemp07DtoFragments { temp1 = "*", temp2 = "*",}
	const enum GTemp07DtoTypes { temp1 = "string", temp2 = "string",}
	const enum GTemp07DtoTypeLengths {}
	/**TODO: Adam dříve využíval, ale asi už nebude potřeba?*/
	interface GTemp08Dto {
		temp1?: number|null;
		temp2?: JsonDecimal|null;
		temp3?: JsonDecimal|null;
	}
	const enum GTemp08DtoNames { temp1 = "temp1", temp2 = "temp2", temp3 = "temp3",}
	const enum GTemp08DtoFragments { temp1 = "*", temp2 = "*", temp3 = "*",}
	const enum GTemp08DtoTypes { temp1 = "number", temp2 = "JsonDecimal", temp3 = "JsonDecimal",}
	const enum GTemp08DtoTypeLengths {}
	/**TODO: Adam dříve využíval, ale asi už nebude potřeba?*/
	interface GTemp09Dto {
		l?: number|null;
	}
	const enum GTemp09DtoNames { l = "l",}
	const enum GTemp09DtoFragments { l = "*",}
	const enum GTemp09DtoTypes { l = "number",}
	const enum GTemp09DtoTypeLengths {}
	/**TODO: Adam dříve využíval, ale asi už nebude potřeba?*/
	interface GTemp10Dto {
		tempDate?: JsonDate|null;
		tempInt32?: number|null;
	}
	const enum GTemp10DtoNames { tempDate = "tempDate", tempInt32 = "tempInt32",}
	const enum GTemp10DtoFragments { tempDate = "*", tempInt32 = "*",}
	const enum GTemp10DtoTypes { tempDate = "JsonDate", tempInt32 = "number",}
	const enum GTemp10DtoTypeLengths {}
	/**TODO: Adam dříve využíval, ale asi už nebude potřeba?*/
	interface GTemp11Dto {
		l?: JsonDecimal|null;
	}
	const enum GTemp11DtoNames { l = "l",}
	const enum GTemp11DtoFragments { l = "*",}
	const enum GTemp11DtoTypes { l = "JsonDecimal",}
	const enum GTemp11DtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGDetailDokladu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Operace s detailem dokladu*/
	interface DetailDokladu {
		/**Přečti doklad*/
		read(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,GServiceReadResponse<Gordic.Sml.Interface.GSml_DetailDto>>;
		/**Podej doklad*/
		podani(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,void>;
		/**Zaeviduje doklad*/
		evidence(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,void>;
		/**Schválení dokladu*/
		schvaleni(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,void>;
		/**Podepsání dokladu*/
		podepsani(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,void>;
		/**validace smlouvy - update smlpid a všech položek na stav Validate*/
		setValidateProc(rq?:CallParams<{data:Gordic.Sml.Interface.GSml_DetailDto}>): _Task<{data:Gordic.Sml.Interface.GSml_DetailDto},void>;
		/**obsluha kontroly celkové částky financování*/
		validateCMena(rq?:Gordic.Sml.Interface.GSmlDetailKontrolaCastkyDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlDetailKontrolaCastkyDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlDetailKontrolaCastkyDto>,Gordic.Sml.Interface.ChybovyStavDto>;
		stornoSchvaleni(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,void>;
		stornoPodepsani(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,void>;
		setTypCeny(rq?:Gordic.Sml.Interface.SetTypCenyDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.SetTypCenyDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.SetTypCenyDto>,GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>;
		validovaniDetailuDokladu(rq?:Gordic.Sml.Interface.GSmlCheckValidField|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlCheckValidField>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlCheckValidField>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DetailDokladu: ServiceBase & Catalog.DetailDokladu;
	}
	const DetailDokladu: Client["DetailDokladu"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated*/
	const enum GDetailDokladuFilter {
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGDetailRezervace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Rezervace na detailu dokladu (ouško)*/
	interface DetailRezervace {
		/**Vrátí list vyfiltrovaných dat*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GDetailRezervaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DetailRezervace: ServiceBase & Catalog.DetailRezervace;
	}
	const DetailRezervace: Client["DetailRezervace"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated*/
	const enum GDetailRezervaceFilter {
		ixp,
		tab,
		ixp_sml,
		ktg_sml,
		ktg_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGDoklady.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Seznam smluv*/
	interface Doklady {
		/**Vrátí list vyfiltrovaných dat*/
		listNew(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GDokladyDto>>;
		/**Vrátí list dodatků k dokladu*/
		detailDodatkyDoklad(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GDokladyDto>>;
		/**Vrátí list smluv a objednávek k dokladu*/
		detailSmlObjDoklad(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GDokladyDto>>;
		/**Vrátí jeden záznam dokladu*/
		read(rq?:Gordic.Sml.Interface.GDokladyDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GDokladyDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GDokladyDto>,GServiceReadResponse<Gordic.Sml.Interface.GDokladyDto>>;
		/**Vrátí jeden záznam dokladu*/
		getTypKategorieDokladuDleKnih(rq?:Gordic.Sml.Interface.TypKategorieDokladuDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.TypKategorieDokladuDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.TypKategorieDokladuDto>,GServiceReadResponse<Gordic.Sml.Interface.TypKategorieDokladuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Doklady: ServiceBase & Catalog.Doklady;
	}
	const Doklady: Client["Doklady"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GDokladyFilter {
		ixp,
		ktg_sml,
		ktg_den,
		/**The nazev rf*/
		nazev_rf,
		/**The smlspid ucs*/
		smlspid_ucs,
		/**The smlspid icon*/
		smlspid_ico,
		/**The smlspid rok*/
		smlspid_rok,
		/**The smlspid KTG SML*/
		smlspid_ktg_sml,
		/**The smlspid KTG den*/
		smlspid_ktg_den,
		/**The smlspid SML stav*/
		smlspid_sml_stav,
		/**The smlspid SML stav*/
		smlspac_ixp_den,
		/**WFLSPID FILTRY
		*     
		*     Identifikátor pidu
		*/
		wflspid_ixp,
		/**The ixp SML pri*/
		ixp_sml_pri,
		/**The ixp SML*/
		ixp_sml,
		/**The ac*/
		ac,
		/**The ac SML*/
		ac_sml,
		/**The ixs typ*/
		ixs_typ,
		/**The KTG typ*/
		ktg_typ,
		fin_od,
		fin_do,
		dat_prij_pod,
		dat_uzav,
		dat_platnost,
		dat_sgn,
		dat_sgn_ext,
		dat_ucinnost,
		priz_view,
		druh_stav_rizeni,
		typ_org,
		ico_esu,
		ac_ver_zak,
		sml_stav,
		sgn_stav,
		priz_pzp,
		ixs_fun_akt,
		ico,
		cis_real,
		ixs_fun_vyriz,
		ixs_fun_ref,
		ixs_orj,
		nazev,
		popis,
		cis_real_txt,
		ixs_fun_vyriz_txt,
		ixs_fun_ref_txt,
		c_mena_doc,
		c_mena,
		c,
		stav_rez,
		stav_rez_iissp,
		id_hdr_ris,
		dat_dok_1,
		dat_dok_2,
		ixs_zuk,
		dat_uko,
		sml_blk,
		sml_nad_sml,
		sml_obj,
		sml_dod,
		sml_nad_pri,
		sml_doc_dsg,
		s_ele,
		ixs_zpv,
		priz_pov_zve,
		plan_zve,
		s_ele_zve,
		dat_zve,
		id_zve,
		vp_typ_vyb,
		vp_ixs_dup,
		vp_nazev_skp,
		vp_evi_cis,
		vp_vyr_cis,
		vp_ser_cis,
		vp_skp,
		vp_sarze,
		vp_skupina_id,
		vp_drh_id,
		vp_popis,
		poznamka,
		ac_dok_1,
		ac_dok_2,
		typ_ceny,
		vp_inv_cis,
		typ_dok,
		ac_odDo,
		ac_sml_nad,
		stav_evi,
		typ_view,
		ac_sml_pri,
		num_row,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGOstatniUdaje.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Ostatni Udaje*/
	interface OstatniUdaje {
		/**Procedura po změně typu pohledávky*/
		changeTypPhl(rq?:Gordic.Sml.Interface.GOstatniUdajeDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GOstatniUdajeDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GOstatniUdajeDto>,GServiceReadResponse<Gordic.Sml.Interface.ChybovyStavDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OstatniUdaje: ServiceBase & Catalog.OstatniUdaje;
	}
	const OstatniUdaje: Client["OstatniUdaje"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GOstatniUdajeFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGRozaaat.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Číslo akce (výběr čísla akce)
	* @domain Smlouvy
	*/
	interface Rozaaat {
		/**Načtení seznamu pro výběr čísla akce*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GRozaaatDto>>;
		/**Načtení pomocných proměnných pro práci s výběrem čísla akce*/
		loadPomocnePromenne(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Sml.Interface.GRozaaatPomocneDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Rozaaat: ServiceBase & Catalog.Rozaaat;
	}
	const Rozaaat: Client["Rozaaat"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro seznam výběru čísla akce*/
	const enum GRozaaatFilter {
		/**Povinný identifikátor pracovního dokladu*/
		ixp,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**rok*/
		rok,
		/**xuete*/
		xuete,
		/**drd*/
		drd,
		/**cislo*/
		cislo,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uea_uc*/
		uea_uc,
		/**ueb_uc*/
		ueb_uc,
		/**uea_rr*/
		uea_rr,
		/**ueb_rr*/
		ueb_rr,
		/**is_plan*/
		is_plan,
		/**ktg_bu*/
		ktg_bu,
		/**typ_bu*/
		typ_bu,
		/**bu_vl*/
		bu_vl,
		/**sk_vl*/
		sk_vl,
		/**Rozpočtováno je různé od nuly*/
		no_zero,
		/**Filtr na identifikátor rozpočtového dokladu*/
		ixp_roz,
		/**Identifikátoru ukazatele - pouze při určité hodnotě db parametru (sml_typ_ackppla)*/
		ixs_uka,
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
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlAcVerZak.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Veřejné zakázky (výběr veřejné zakázky)
	* @domain Smlouvy
	*/
	interface SmlAcVerZak {
		/**Načtení seznamu pro výběr veřejné zakázky*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlAcVerZakDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlAcVerZak: ServiceBase & Catalog.SmlAcVerZak;
	}
	const SmlAcVerZak: Client["SmlAcVerZak"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro seznam výběru veřejné zakázky*/
	const enum GSmlAcVerZakFilter {
		/**Identifikátor veřejné zakázky*/
		ixs_pri,
		/**Typ blokační agendy*/
		typ_ag_blok,
		/**Kategorie smlouvy*/
		ktg_sml,
		ixs_fun_vyriz,
		cis_real,
		ixs_typ,
		ixp_sml_pri,
		/**Agendové číslo*/
		ac_ag,
		/**Rok*/
		rok,
		/**Název*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinancniKontrola.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Finanční kontrola - parametry (nemá nic společného s FK od P.Smejkala)*/
	interface SmlFinancniKontrola {
		/**Zjisti ktg_pfk a stav zapnutí finanční kontroly a popis v případě vypnutí*/
		checkEnableFK(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlFinancniKontrolaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinancniKontrola: ServiceBase & Catalog.SmlFinancniKontrola;
	}
	const SmlFinancniKontrola: Client["SmlFinancniKontrola"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GSmlFinancniKontrolaFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinancovaniPripad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Rozpis - rozpis částek na roky pro případ
	* @domain Smlouvy
	*/
	interface SmlFinRozpisPripad {
		/**Načtení seznamu rozpisu částek na roky pro případ*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlsrokDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinRozpisPripad: ServiceBase & Catalog.SmlFinRozpisPripad;
	}
	const SmlFinRozpisPripad: Client["SmlFinRozpisPripad"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro rozpis částek na roky pro případ*/
	const enum GSmlFinancovaniPripadFilter {
		/**ixp*/
		ixp,
		/**rok*/
		rok,
		/**sml_stav*/
		sml_stav,
		/**ixp_sml_pri*/
		ixp_sml_pri,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinPolozkyFPDoklad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Finanční položky - práce s dokladem
	* @domain Smlouvy
	*/
	interface SmlFinPolozkyFPDoklad {
		/**Načtení záznamu položky FP dokladu*/
		read(rq?:Gordic.Sml.Interface.GSmldpolDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmldpolDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmldpolDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmldpolDto>>;
		/**Načtení seznamu položek FP dokladu*/
		list(rq?:CallParams<{rq:GServiceListRequest,ixp:string}>): _Task<{rq:GServiceListRequest,ixp:string},GServiceListResponse<Gordic.Sml.Interface.GSmldpolDto>>;
		/**Načtení pomocných proměnných pro práci s Položkami FP*/
		loadPomocnePromenne(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Sml.Interface.GSmlFinPolozkyFPDokladPomocneObecneDto>;
		/**Vytvoření nového defaultní Dto položky FP*/
		createNewDefaultDto(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GSmldpolDto>>;
		/**Vytvoření nové položky Finančního profilu dokladu*/
		upsert(rq?:Gordic.Sml.Interface.GSmldpolDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmldpolDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmldpolDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmldpolDto>>;
		/**Hromadná kontrola záznamů pro zadanou operaci*/
		checkMassPermissionsBeforeOperation(rq?:Gordic.Sml.Interface.GSmldpolMassOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmldpolMassOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmldpolMassOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmldpolDto>>;
		/**Hromadné vykonání zadané operace nad záznamy*/
		massOperation(rq?:Gordic.Sml.Interface.GSmldpolMassOperationDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmldpolMassOperationDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmldpolMassOperationDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmldpolDto>>;
		/**Hromadné vytvoření nových položek podle vybraných položek plánu z jednoho rozpisu*/
		massNew(rq?:CallParams<{ixp:string,list:Gordic.Sml.Interface.GSmlFinPolozkyFPDokladMassNewDto[]}>): _Task<{ixp:string,list:Gordic.Sml.Interface.GSmlFinPolozkyFPDokladMassNewDto[]},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinPolozkyFPDoklad: ServiceBase & Catalog.SmlFinPolozkyFPDoklad;
	}
	const SmlFinPolozkyFPDoklad: Client["SmlFinPolozkyFPDoklad"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated*/
	const enum GSmlFinPolozkyFPDokladFilter {
		/**ixp*/
		ixp,
		/**rok*/
		rok,
		/**cislo*/
		cislo,
		/**sml_stav*/
		sml_stav,
		/**Typ dokumentu pro úpravu selectu*/
		typ_dok,
	}
	/**ServicePermissions pro Položky FP - Doklad*/
	interface GSmldpolServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno vytvořit nový záznam*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno schválit záznam (částečné pro klienta)*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit schválení záznamu (částečné pro klienta)*/
		LzeZrusitSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat záznam (částečné pro klienta)*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit storno záznamu (částečné pro klienta)*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmldpolServicePermissionsNames { LzeNovy = "LzeNovy", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleni = "LzeZrusitSchvaleni", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno",}
	const enum GSmldpolServicePermissionsFragments { LzeNovy = "*", LzeSchvalit = "*", LzeZrusitSchvaleni = "*", LzeStornovat = "*", LzeZrusitStorno = "*",}
	const enum GSmldpolServicePermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleni = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmldpolServicePermissionsTypeLengths {}
	/**Permissions pro Položku FP - Doklad*/
	interface GSmlFinPolozkyFPDokladPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat záznam*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno přesunout částku záznamu*/
		LzePresunCastky: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlFinPolozkyFPDokladPermissionsNames { LzeEditovat = "LzeEditovat", LzePresunCastky = "LzePresunCastky",}
	const enum GSmlFinPolozkyFPDokladPermissionsFragments { LzeEditovat = "*", LzePresunCastky = "*",}
	const enum GSmlFinPolozkyFPDokladPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzePresunCastky = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlFinPolozkyFPDokladPermissionsTypeLengths {}
	/**Výčet druhů hromadných operací*/
	const enum GSmldpolMassOperation {
		/**Neurčeno (default)*/
		neurceno,
		/**Schválení Položky FP*/
		schvalit,
		/**Zrušení schválení Položky FP*/
		zrusitSchvaleni,
		/**Storno Položky FP*/
		storno,
		/**Zrušení storna Položky FP*/
		zrusitStorno,
	}
	/**Dto pro hromadné operace nad Položkami FP*/
	interface GSmldpolMassOperationDto {
		/**Seznam položek FP*/
		dtos?: Gordic.Sml.Interface.GSmldpolDto[]|null;
		/**Typ požadované operace*/
		operace?: Gordic.Sml.Interface.GSmldpolMassOperation|null;
	}
	const enum GSmldpolMassOperationDtoNames { dtos = "dtos", operace = "operace",}
	const enum GSmldpolMassOperationDtoFragments { dtos = "*", operace = "*",}
	const enum GSmldpolMassOperationDtoTypes { dtos = "Gordic.Sml.Interface.GSmldpolDto[]", operace = "Gordic.Sml.Interface.GSmldpolMassOperation",}
	const enum GSmldpolMassOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinPolozkyFPPripad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Finanční položky - práce s případem
	* @domain Smlouvy
	*/
	interface SmlFinPolozkyFPPripad {
		/**Načtení seznamu položek FP případu*/
		list(rq?:CallParams<{rq:GServiceListRequest,ixp:string}>): _Task<{rq:GServiceListRequest,ixp:string},GServiceListResponse<Gordic.Sml.Interface.GSmlspolDto>>;
		/**Načtení seznamu rezervací pro položku FP případu*/
		listRezervace(rq?:CallParams<{ixp:string,rok:number,cislo:number}>): _Task<{ixp:string,rok:number,cislo:number},GServiceListResponse<Gordic.Sml.Interface.GSmltmp1Dto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinPolozkyFPPripad: ServiceBase & Catalog.SmlFinPolozkyFPPripad;
	}
	const SmlFinPolozkyFPPripad: Client["SmlFinPolozkyFPPripad"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro List finačních položek případu*/
	const enum GSmlFinPolozkyFPPripadFilter {
		/**ixp*/
		ixp,
		/**rok*/
		rok,
		/**cislo*/
		cislo,
		/**sml_stav*/
		sml_stav,
		/**Typ dokumentu pro úpravu selectu*/
		typ_dok,
	}
	/**Permissions pro položky FP - případ*/
	interface GSmlFinPolozkyFPPripadPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno uvolnit prostředky záznamu*/
		LzeUvolnit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlFinPolozkyFPPripadPermissionsNames { LzeUvolnit = "LzeUvolnit",}
	const enum GSmlFinPolozkyFPPripadPermissionsFragments { LzeUvolnit = "*",}
	const enum GSmlFinPolozkyFPPripadPermissionsTypes { LzeUvolnit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlFinPolozkyFPPripadPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinPresun.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Finanční položky - Přesun prostředků mezi položky
	* @domain Smlouvy
	*/
	interface SmlFinPresun {
		/**Načtení záznamu pro přesun prostředků*/
		read(rq?:Gordic.Sml.Interface.GSmlFinPresunDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlFinPresunDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlFinPresunDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlFinPresunDto>>;
		/**Přesun částky položky na jinou položku jiného dokladu*/
		presunCastky(rq?:Gordic.Sml.Interface.GSmlFinPresunSaveDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlFinPresunSaveDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlFinPresunSaveDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinPresun: ServiceBase & Catalog.SmlFinPresun;
	}
	const SmlFinPresun: Client["SmlFinPresun"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr Isl pro přesun prostředků*/
	const enum GSmlFinPresunFilter {
		/**ixp*/
		ixp,
		/**rok*/
		rok,
		/**cislo*/
		cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinRozpisDoklad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Rozpis - rozpis částek na roky pro doklad
	* @domain Smlouvy
	*/
	interface SmlFinRozpisDoklad {
		/**Vrátí jeden záznam dokladu*/
		read(rq?:Gordic.Sml.Interface.GSmldrokDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmldrokDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmldrokDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmldrokDto>>;
		/**Načtení seznamu rozpisu částek na roky pro doklad*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmldrokDto>>;
		/**Načtení seznamu dokladů případu pro vytvoření tabů Rozpisu*/
		listDokladyPripadu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlFinRozpisDokladDto>>;
		/**Aktualizace rozpisu částky po rocích*/
		update(rq?:Gordic.Sml.Interface.GSmldrokUpdateDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmldrokUpdateDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmldrokUpdateDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmldrokDto>>;
		/**Přepočet částky dle ročního kurzu*/
		rokCPrepocet(rq?:Gordic.Sml.Interface.GSmldrokCPrepocetDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmldrokCPrepocetDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmldrokCPrepocetDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinRozpisDoklad: ServiceBase & Catalog.SmlFinRozpisDoklad;
	}
	const SmlFinRozpisDoklad: Client["SmlFinRozpisDoklad"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro rozpis částek na roky pro doklad*/
	const enum GSmlFinancovaniDokladFilter {
		/**ixp*/
		ixp,
		/**rok*/
		rok,
		/**sml_stav*/
		sml_stav,
		/**ixp_sml_pri*/
		ixp_sml_pri,
		/**ktg_typ*/
		ktg_typ,
	}
	/**Permissions pro rozpis částek na roky pro doklad*/
	interface GSmldrokPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat záznam*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno přepočítat částky dle ročního systémového kurzu pro aktuální období*/
		LzePrepocetAkt: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno přepočítat částky dle ročního systémového kurzu pro aktuální a následující období*/
		LzePrepocetAktANasl: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmldrokPermissionsNames { LzeEditovat = "LzeEditovat", LzePrepocetAkt = "LzePrepocetAkt", LzePrepocetAktANasl = "LzePrepocetAktANasl",}
	const enum GSmldrokPermissionsFragments { LzeEditovat = "*", LzePrepocetAkt = "*", LzePrepocetAktANasl = "*",}
	const enum GSmldrokPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzePrepocetAkt = "Gordic.General.ApplicationInterface.GPermission", LzePrepocetAktANasl = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmldrokPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlFinRozpisLimitReal.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Rozpis - práce s limity realizátorů
	* @domain Smlouvy
	*/
	interface SmlFinRozpisLimitReal {
		/**Načtení záznamu limitu realizátora*/
		read(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Sml.Interface.GSmlvlrrDto>,ixp:string}>): _Task<{rq:GServiceReadRequest<Gordic.Sml.Interface.GSmlvlrrDto>,ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GSmlvlrrDto>>;
		/**Načtení seznamu limitů realizátorů*/
		list(rq?:CallParams<{rq:GServiceListRequest,ixp:string}>): _Task<{rq:GServiceListRequest,ixp:string},GServiceListResponse<Gordic.Sml.Interface.GSmlvlrrDto>>;
		/**Vytvoření nového defaultní dto limitu realizátora včetně práv*/
		createNewDefaultDto(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GSmlvlrrDto>>;
		/**Vytvoření nového limitu pro realizátora*/
		upsert(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Sml.Interface.GSmlvlrrDto>,ixp:string}>): _Task<{rq:GServiceSaveRequest<Gordic.Sml.Interface.GSmlvlrrDto>,ixp:string},GServiceSaveResponse<Gordic.Sml.Interface.GSmlvlrrDto>>;
		/**Odstranění limitu realizátora*/
		delete(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Sml.Interface.GSmlvlrrDto>,ixp:string}>): _Task<{rq:GServiceSaveRequest<Gordic.Sml.Interface.GSmlvlrrDto>,ixp:string},GServiceSaveResponse<Gordic.Sml.Interface.GSmlvlrrDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlFinRozpisLimitReal: ServiceBase & Catalog.SmlFinRozpisLimitReal;
	}
	const SmlFinRozpisLimitReal: Client["SmlFinRozpisLimitReal"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro limity realizátorů*/
	const enum GSmlFinancovaniLimitRealFilter {
		/**ixp_sml_pri*/
		ixp_sml_pri,
		/**rok*/
		rok,
		/**cis_real*/
		cis_real,
		/**ico*/
		ico,
		/**aktivita*/
		aktivita,
	}
	/**Permissions pro limity realizátorů*/
	interface GSmlvlrrPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat záznam*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat záznam*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlvlrrPermissionsNames { LzeEditovat = "LzeEditovat", LzeStornovat = "LzeStornovat",}
	const enum GSmlvlrrPermissionsFragments { LzeEditovat = "*", LzeStornovat = "*",}
	const enum GSmlvlrrPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlvlrrPermissionsTypeLengths {}
	/**Permissions pro limity realizátorů*/
	interface GSmlvlrrServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno vytvořit nový záznam*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlvlrrServicePermissionsNames { LzeNovy = "LzeNovy",}
	const enum GSmlvlrrServicePermissionsFragments { LzeNovy = "*",}
	const enum GSmlvlrrServicePermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlvlrrServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlhdph.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie hodnot DPH - smlhdph
	* @businessObject Smlouvy
	*/
	interface Smlhdph {
		/**Načtení historie dph*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlhdphDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Smlhdph: ServiceBase & Catalog.Smlhdph;
	}
	const Smlhdph: Client["Smlhdph"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtry pro historii DPH*/
	const enum GSmlhdphFilter {
		/**PK tabulky -*/
		ixp_sml_pri,
		/**PK tabulky -*/
		dat_dph_od,
		/**PK tabulky - Identifikátor dokumentu*/
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlHromOperace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Různé hromadné operace
	* @domain Smlouvy
	*/
	interface SmlHromOperace {
		/**Hromadná kontrola před změnou údajů dokladů*/
		checkMassPermissionsBeforeZmenaUdaju(rq?:Gordic.Sml.Interface.GSmlHromZmenaUdajuDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlHromZmenaUdajuDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlHromZmenaUdajuDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlHromZmenaUdajuResDto>>;
		/**Hromadné změna údajů dokladů*/
		massZmenaUdaju(rq?:Gordic.Sml.Interface.GSmlHromZmenaUdajuDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlHromZmenaUdajuDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlHromZmenaUdajuDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlHromZmenaUdajuResDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlHromOperace: ServiceBase & Catalog.SmlHromOperace;
	}
	const SmlHromOperace: Client["SmlHromOperace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlInfo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Info o dokladu (souhrnné informace)
	* @domain Smlouvy
	*/
	interface SmlInfo {
		/**Načtení informací pro Info o dokladu*/
		readInfo(rq?:CallParams<{ixp_sml_pri:string,ixp:string,ktg_typ:number}>): _Task<{ixp_sml_pri:string,ixp:string,ktg_typ:number},GServiceReadResponse<Gordic.Sml.Interface.GSmlInfoDto>>;
		/**Načtení seznamu financování případu*/
		financovaniPripadu(rq?:CallParams<{typ_dok:number,ktg_sml:number,ixs_pri:string}>): _Task<{typ_dok:number,ktg_sml:number,ixs_pri:string},GServiceListResponse<Gordic.Sml.Interface.GSmlInfoFinancovaniPripaduDto>>;
		/**Vymazání temporárních tabulek*/
		deleteTmpData(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlInfo: ServiceBase & Catalog.SmlInfo;
	}
	const SmlInfo: Client["SmlInfo"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlMakeCopy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Vytvoření kopie dokladu
	* @domain Smlouvy
	*/
	interface SmlMakeCopy {
		/**Vytvoření kopie dokladu*/
		makeCopy(rq?:Gordic.Sml.Interface.GSmlMakeCopyDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlMakeCopyDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlMakeCopyDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlMakeCopyResDto>>;
		/**Zjistění údajů o knize*/
		getBookInfo(rq?:CallParams<{ixp_den:string}>): _Task<{ixp_den:string},Gordic.Eko.Interface.GEkosdenDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlMakeCopy: ServiceBase & Catalog.SmlMakeCopy;
	}
	const SmlMakeCopy: Client["SmlMakeCopy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlMakeObj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Vytvoření podřízené objednávky k dokladu
	* @domain Smlouvy
	*/
	interface SmlMakeObj {
		/**Vytvoření kopie dokladu*/
		makeObj(rq?:Gordic.Sml.Interface.GSmlMakeObjDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlMakeObjDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlMakeObjDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlMakeObjResDto>>;
		/**Zjištění disponibility mateřského dokladu*/
		getSmlDisp(rq?:Gordic.Sml.Interface.GSmlMakeObjDispReqDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlMakeObjDispReqDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlMakeObjDispReqDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlMakeObjDispResDto>>;
		/**Pokus o odhad cílové knihy objednávky*/
		tryGetGuessBook(rq?:Gordic.Sml.Interface.GSmlMakeObjGuessIxpDenReqDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlMakeObjGuessIxpDenReqDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlMakeObjGuessIxpDenReqDto>,string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlMakeObj: ServiceBase & Catalog.SmlMakeObj;
	}
	const SmlMakeObj: Client["SmlMakeObj"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlPolFin.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vrací seznam buď objednávky či dodatky - ouška na detailu dokladu*/
	interface SmlPolFin {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlPolFin: ServiceBase & Catalog.SmlPolFin;
	}
	const SmlPolFin: Client["SmlPolFin"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GSmlPolFinFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlpzp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL Interface - smlspzp (Položky účetního profilu)
	* @domain Smlouvy
	*/
	interface Smlpzp {
		/**Načtení položky účetního profilu*/
		read(rq?:Gordic.Sml.Interface.GSmlspzpDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlspzpDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlspzpDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**List dat položek účetního profilu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**načtení údajů RS k typu účetního případu*/
		getTypUprRs(rq?:Gordic.Sml.Interface.GSmlspzpDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlspzpDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlspzpDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**Insert a update dat účetního profilu*/
		upsert(rq?:Gordic.Sml.Interface.GSmlspzpUpsertDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlspzpUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlspzpUpsertDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**Hromadná kontrola dat před zadanou operací*/
		checkMassPermissionsBeforeOperation(rq?:Gordic.Sml.Interface.GSmlspzpMassUpsertDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlspzpMassUpsertDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlspzpMassUpsertDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**Hromadná aktivní operace*/
		massOperation(rq?:Gordic.Sml.Interface.GSmlspzpMassUpsertDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlspzpMassUpsertDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlspzpMassUpsertDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**Vytvoření nového základu položky účetního profilu s Permissions*/
		createNewDefaultDto(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GSmlspzpDto>>;
		/**Získání příznaku, zda jsou všechny položky schválené nebo všechny stornované*/
		areAllItemsEnabledOrCancelled(rq?:CallParams<{ixp_sml_pri:string}>): _Task<{ixp_sml_pri:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Smlpzp: ServiceBase & Catalog.Smlpzp;
	}
	const Smlpzp: Client["Smlpzp"];
}
declare namespace Gordic.Sml.Interface {
	/**Filter pro smlspzp*/
	const enum GSmlspzpFilter {
		/**ixp_sml_pri - 1.key*/
		ixp_sml_pri,
		/**rok_sml_pri - 2.key*/
		rok_sml_pri,
		/**cislo_sml_pri - 3.key*/
		cislo_sml_pri,
		/**GCheck - aktuální období*/
		act_obd,
	}
	/**Dto pro upsert dat*/
	interface GSmlspzpUpsertDto {
		/**Dto smlspzp*/
		dto?: Gordic.Sml.Interface.GSmlspzpDto|null;
		/**Typ požadované operace*/
		operace?: Gordic.Sml.Interface.GSmlspzpUpsertOperace|null;
		/**Ixp smlouvy*/
		ixp?: string|null;
	}
	const enum GSmlspzpUpsertDtoNames { dto = "dto", operace = "operace", ixp = "ixp",}
	const enum GSmlspzpUpsertDtoFragments { dto = "*", operace = "*", ixp = "*",}
	const enum GSmlspzpUpsertDtoTypes { dto = "Gordic.Sml.Interface.GSmlspzpDto", operace = "Gordic.Sml.Interface.GSmlspzpUpsertOperace", ixp = "string",}
	const enum GSmlspzpUpsertDtoTypeLengths {}
	/**Dto pro hromadný upsert dat*/
	interface GSmlspzpMassUpsertDto {
		/**Seznam dto smlspzp*/
		dtos?: Gordic.Sml.Interface.GSmlspzpDto[]|null;
		/**Typ požadované operace*/
		operace?: Gordic.Sml.Interface.GSmlspzpUpsertOperace|null;
		/**Ixp smlouvy*/
		ixp?: string|null;
	}
	const enum GSmlspzpMassUpsertDtoNames { dtos = "dtos", operace = "operace", ixp = "ixp",}
	const enum GSmlspzpMassUpsertDtoFragments { dtos = "*", operace = "*", ixp = "*",}
	const enum GSmlspzpMassUpsertDtoTypes { dtos = "Gordic.Sml.Interface.GSmlspzpDto[]", operace = "Gordic.Sml.Interface.GSmlspzpUpsertOperace", ixp = "string",}
	const enum GSmlspzpMassUpsertDtoTypeLengths {}
	/**Dto pro kontrolu přístupnosti změny kategorie položky PZ/P*/
	interface GSmlspzpCheckKtgTypDto {
		/**ixp_upr*/
		ixp_upr?: string|null;
		/**radek_upo*/
		radek_upo?: number|null;
		/**s_sto*/
		s_sto?: number|null;
		/**ktg_upo*/
		ktg_upo?: number|null;
	}
	const enum GSmlspzpCheckKtgTypDtoNames { ixp_upr = "ixp_upr", radek_upo = "radek_upo", s_sto = "s_sto", ktg_upo = "ktg_upo",}
	const enum GSmlspzpCheckKtgTypDtoFragments { ixp_upr = "*", radek_upo = "*", s_sto = "*", ktg_upo = "*",}
	const enum GSmlspzpCheckKtgTypDtoTypes { ixp_upr = "string", radek_upo = "number", s_sto = "number", ktg_upo = "number",}
	const enum GSmlspzpCheckKtgTypDtoTypeLengths {}
	/**Dto pro údaje RS k typu účetního případu*/
	interface GSmlspzpRSDto {
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
		/**MU*/
		uek?: string|null;
		/**IČO*/
		uel?: string|null;
		/**ÚČEL*/
		uem?: string|null;
		/**ÚJ*/
		uen?: string|null;
		/**PS*/
		te5?: string|null;
		/**REZ1*/
		te6?: string|null;
		/**REZ2*/
		te7?: string|null;
		/**REZ3*/
		te8?: string|null;
		/**REZ4*/
		te9?: string|null;
	}
	const enum GSmlspzpRSDtoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GSmlspzpRSDtoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GSmlspzpRSDtoTypes { uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GSmlspzpRSDtoTypeLengths { uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
	/**Možné operace nad záznamy*/
	const enum GSmlspzpUpsertOperace {
		/**Insert a update dat*/
		upsert=20,
		/**Schválení*/
		validate=30,
		/**Zrušení schválení*/
		zrusitValidate=21,
		/**Storno*/
		storno=90,
		/**Zrušení storna*/
		zrusitStorno=22,
	}
	/**Permissions pro položky věcného profilu*/
	interface GSmlspzpServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno založit nový záznam*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno otevřít účetní kontrolu*/
		LzeUcetniKontrola: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlspzpServicePermissionsNames { LzeNovy = "LzeNovy", LzeUcetniKontrola = "LzeUcetniKontrola",}
	const enum GSmlspzpServicePermissionsFragments { LzeNovy = "*", LzeUcetniKontrola = "*",}
	const enum GSmlspzpServicePermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission", LzeUcetniKontrola = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlspzpServicePermissionsTypeLengths {}
	/**Permissions pro položky věcného profilu*/
	interface GSmlspzpPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat záznam*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno schválit záznam*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit schválení záznamu*/
		LzeZrusitSchvaleno: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat záznam*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit storno záznamu*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlspzpPermissionsNames { LzeEvidovat = "LzeEvidovat", LzeSchvalit = "LzeSchvalit", LzeZrusitSchvaleno = "LzeZrusitSchvaleno", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno",}
	const enum GSmlspzpPermissionsFragments { LzeEvidovat = "*", LzeSchvalit = "*", LzeZrusitSchvaleno = "*", LzeStornovat = "*", LzeZrusitStorno = "*",}
	const enum GSmlspzpPermissionsTypes { LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitSchvaleno = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlspzpPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlsesu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Smlsesu*/
	interface Smlsesu {
		/**Vrátí jeden záznam smlsesu*/
		read(rq?:Gordic.Sml.Interface.GSmlsesuDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlsesuDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlsesuDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlsesuDto>>;
		/**Vrátí list vyfiltrovaných dat*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlsesuDto>>;
		/**Úprava nebo vytvoření záznamu smlsesu*/
		upsert(rq?:Gordic.Sml.Interface.GSmlsesuDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlsesuDto>>;
		/**Vytvoření jednoho záznamu smlsesu*/
		create(rq?:Gordic.Sml.Interface.GSmlsesuDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlsesuDto>>;
		/**Update jednoho záznamu smlsesu*/
		update(rq?:Gordic.Sml.Interface.GSmlsesuDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlsesuDto>>;
		/**Delete jednoho záznamu smlsesu*/
		delete(rq?:Gordic.Sml.Interface.GSmlsesuDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsesuDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlsesuDto>>;
		/**Sets the save esu.*/
		setSaveEsu(rq?:CallParams<{ixp_sml_pri:string,ixp:string,ktg_sml:number,ZaznamSmlEsu:Gordic.Sml.Interface.GSmlEsuDto}>): _Task<{ixp_sml_pri:string,ixp:string,ktg_sml:number,ZaznamSmlEsu:Gordic.Sml.Interface.GSmlEsuDto},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Smlsesu: ServiceBase & Catalog.Smlsesu;
	}
	const Smlsesu: Client["Smlsesu"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GSmlsesuFilter {
		/**The ixp*/
		ixp,
		/**The aktivita*/
		aktivita,
		/**The ixp SML pri - případ smluvního dokladu*/
		ixp_sml_pri,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlsiab.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - GSmlsiab - Žádosti o založení z jiných agend
	* @domain Smlouvy
	*/
	interface Smlsiab {
		/**Načtení žádosti o založení z jiných agend*/
		read(rq?:Gordic.Sml.Interface.GSmlsiabDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlsiabDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlsiabDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Vrátí seznam žádostí o založení z jiných agend*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Získání ktg_den podle ixp_den*/
		getKtgDen(rq?:CallParams<{ixp_den:string}>): _Task<{ixp_den:string},number>;
		/**Hromadná kontrola dat před upravením žádostí*/
		checkMassPermissionsBeforeModify(rq?:Gordic.Sml.Interface.GSmlsiabMassModifyReqDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassModifyReqDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassModifyReqDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Hromadná kontrola dat před odstraněním žádostí*/
		checkMassPermissionsBeforeDelete(rq?:Gordic.Sml.Interface.GSmlsiabMassDeleteDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassDeleteDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassDeleteDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Hromadná kontrola dat před převzetím žádosti*/
		checkMassPermissionsBeforeGetRequests(rq?:Gordic.Sml.Interface.GSmlsiabMassGetRequestsDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassGetRequestsDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassGetRequestsDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Hromadná úprava dat žádostí*/
		massModify(rq?:Gordic.Sml.Interface.GSmlsiabMassModifyReqDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassModifyReqDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassModifyReqDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Hromadné odstranění žádostí*/
		massDelete(rq?:Gordic.Sml.Interface.GSmlsiabMassDeleteDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassDeleteDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassDeleteDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Hromadné převzetí žádostí*/
		massGetRequests(rq?:Gordic.Sml.Interface.GSmlsiabMassGetRequestsDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassGetRequestsDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlsiabMassGetRequestsDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlsiabDto>>;
		/**Uložení agendového čísla a identifikátoru*/
		updateAgIxp(rq?:Gordic.Sml.Interface.GSmlsiabUpdateAgIxpReqDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsiabUpdateAgIxpReqDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlsiabUpdateAgIxpReqDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlsiabUpdateAgIxpResDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Smlsiab: ServiceBase & Catalog.Smlsiab;
	}
	const Smlsiab: Client["Smlsiab"];
}
declare namespace Gordic.Sml.Interface {
	/**Fitlr pro list žádostí o založení z jiných agend*/
	const enum GSmlsiabFilter {
		/**Identifikátor žádosti*/
		ixp_ext,
		/**Vlastník*/
		ixs_fun_akt,
		/**Účetní středisko*/
		ucs,
		/**Nákladové středisko*/
		nks,
	}
	/**Dto pro úpravu žádosti*/
	interface GSmlsiabModifyReqDto {
		/**Identifikátor žádosti*/
		ixp_ext?: string|null;
		/**Dto s daty pro uložení*/
		saveDto?: Gordic.Sml.Interface.GSmlsiabModifySaveDto|null;
		/**Kategorie knihy*/
		ktg_den?: number|null;
		/**Příznak, zda se ixp generuje (0) nebo sejmává (1)*/
		zpusobGenerovani?: number|null;
	}
	const enum GSmlsiabModifyReqDtoNames { ixp_ext = "ixp_ext", saveDto = "saveDto", ktg_den = "ktg_den", zpusobGenerovani = "zpusobGenerovani",}
	const enum GSmlsiabModifyReqDtoFragments { ixp_ext = "*", saveDto = "*", ktg_den = "*", zpusobGenerovani = "*",}
	const enum GSmlsiabModifyReqDtoTypes { ixp_ext = "string", saveDto = "Gordic.Sml.Interface.GSmlsiabModifySaveDto", ktg_den = "number", zpusobGenerovani = "number",}
	const enum GSmlsiabModifyReqDtoTypeLengths { ixp_ext = 12,}
	/**Dto pro hromadnou úpravu žádostí*/
	interface GSmlsiabMassModifyReqDto {
		/**Seznam identifikátorů žádostí*/
		ixp_exts?: string[]|null;
		/**Dto s daty pro uložení*/
		saveDto?: Gordic.Sml.Interface.GSmlsiabModifyDto|null;
		/**Příznak, zda se ixp generuje (0) nebo sejmává (1)*/
		zpusobGenerovani?: number|null;
	}
	const enum GSmlsiabMassModifyReqDtoNames { ixp_exts = "ixp_exts", saveDto = "saveDto", zpusobGenerovani = "zpusobGenerovani",}
	const enum GSmlsiabMassModifyReqDtoFragments { ixp_exts = "*", saveDto = "*", zpusobGenerovani = "*",}
	const enum GSmlsiabMassModifyReqDtoTypes { ixp_exts = "string[]", saveDto = "Gordic.Sml.Interface.GSmlsiabModifyDto", zpusobGenerovani = "number",}
	const enum GSmlsiabMassModifyReqDtoTypeLengths {}
	/**Dto s údaji pro modifikaci žádostí (vstupní)*/
	interface GSmlsiabModifyDto {
		/**popis*/
		popis?: string|null;
		/**platnost (doba určitá, neurčitá, ...)*/
		typ_platnost?: number|null;
		/**datum uzavření*/
		dat_uzavreni?: JsonDate|null;
		/**datum platnosti*/
		dat_platnost?: JsonDate|null;
		/**datum účinnosti*/
		dat_ucinnost?: JsonDate|null;
		/**přesný název smlouvy*/
		nazev?: string|null;
		/**poznámka*/
		poznamka?: string|null;
		/**související dokument 1*/
		ac_dok_1?: string|null;
		/**související dokument 2*/
		ac_dok_2?: string|null;
		/**účinnost smlouvy - datum nebo text  doručením, ...*/
		ucinnost?: string|null;
		/**ORJ vázané ke smlouvě - pro jaké ORJ je určena*/
		ixs_orj?: string|null;
		/**kompetent*/
		ixs_fun_vyriz?: string|null;
		/**vyřizující referent*/
		ixs_fun_ref?: string|null;
		/**aktuální funkce (vlastník)*/
		ixs_fun_akt?: string|null;
		/**deník*/
		ixp_den?: string|null;
		/**typ smlouvy*/
		ixs_typ?: string|null;
		/**kategorie typu smlouvy*/
		ktg_typ?: number|null;
	}
	const enum GSmlsiabModifyDtoNames { popis = "popis", typ_platnost = "typ_platnost", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", nazev = "nazev", poznamka = "poznamka", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", ixs_fun_akt = "ixs_fun_akt", ixp_den = "ixp_den", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ",}
	const enum GSmlsiabModifyDtoFragments { popis = "*", typ_platnost = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", nazev = "*", poznamka = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", ixs_fun_akt = "*", ixp_den = "*", ixs_typ = "*", ktg_typ = "*",}
	const enum GSmlsiabModifyDtoTypes { popis = "string", typ_platnost = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", nazev = "string", poznamka = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", ixs_fun_vyriz = "string", ixs_fun_ref = "string", ixs_fun_akt = "string", ixp_den = "string", ixs_typ = "string", ktg_typ = "number",}
	const enum GSmlsiabModifyDtoTypeLengths { popis = 254, nazev = 4000, poznamka = 500, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, ixs_fun_akt = 12, ixp_den = 12, ixs_typ = 12,}
	/**Dto s údaji pro modifikaci žádostí (s doplněnými údaji)*/
	interface GSmlsiabModifySaveDto extends Gordic.Sml.Interface.GSmlsiabModifyDto {
		/**číslo realizátora*/
		cis_real?: string|null;
		/**subřada*/
		subrada?: number|null;
	}
	const enum GSmlsiabModifySaveDtoNames { cis_real = "cis_real", subrada = "subrada", popis = "popis", typ_platnost = "typ_platnost", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_ucinnost = "dat_ucinnost", nazev = "nazev", poznamka = "poznamka", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", ixs_fun_akt = "ixs_fun_akt", ixp_den = "ixp_den", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ",}
	const enum GSmlsiabModifySaveDtoFragments { cis_real = "*", subrada = "*", popis = "*", typ_platnost = "*", dat_uzavreni = "*", dat_platnost = "*", dat_ucinnost = "*", nazev = "*", poznamka = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", ixs_fun_akt = "*", ixp_den = "*", ixs_typ = "*", ktg_typ = "*",}
	const enum GSmlsiabModifySaveDtoTypes { cis_real = "string", subrada = "number", popis = "string", typ_platnost = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_ucinnost = "JsonDate", nazev = "string", poznamka = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", ixs_fun_vyriz = "string", ixs_fun_ref = "string", ixs_fun_akt = "string", ixp_den = "string", ixs_typ = "string", ktg_typ = "number",}
	const enum GSmlsiabModifySaveDtoTypeLengths { cis_real = 6, popis = 254, nazev = 4000, poznamka = 500, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, ixs_fun_akt = 12, ixp_den = 12, ixs_typ = 12,}
	/**Dto pro hromadné odstranění*/
	interface GSmlsiabMassDeleteDto {
		/**Seznam identifikátorů žádostí*/
		ixp_exts?: string[]|null;
	}
	const enum GSmlsiabMassDeleteDtoNames { ixp_exts = "ixp_exts",}
	const enum GSmlsiabMassDeleteDtoFragments { ixp_exts = "*",}
	const enum GSmlsiabMassDeleteDtoTypes { ixp_exts = "string[]",}
	const enum GSmlsiabMassDeleteDtoTypeLengths {}
	/**Dto pro převzetí žádostí*/
	interface GSmlsiabGetRequestDto {
		/**Identifikátor žádosti*/
		ixp_ext?: string|null;
		/**Příznak, zda se ixp generuje (0) nebo sejmává (1)*/
		zpusobGenerovani?: number|null;
	}
	const enum GSmlsiabGetRequestDtoNames { ixp_ext = "ixp_ext", zpusobGenerovani = "zpusobGenerovani",}
	const enum GSmlsiabGetRequestDtoFragments { ixp_ext = "*", zpusobGenerovani = "*",}
	const enum GSmlsiabGetRequestDtoTypes { ixp_ext = "string", zpusobGenerovani = "number",}
	const enum GSmlsiabGetRequestDtoTypeLengths { ixp_ext = 12,}
	/**Dto pro hromadné převzetí žádostí*/
	interface GSmlsiabMassGetRequestsDto {
		/**Seznam identifikátorů žádostí*/
		ixp_exts?: string[]|null;
		/**Příznak, zda se ixp generuje (0) nebo sejmává (1)*/
		zpusobGenerovani?: number|null;
	}
	const enum GSmlsiabMassGetRequestsDtoNames { ixp_exts = "ixp_exts", zpusobGenerovani = "zpusobGenerovani",}
	const enum GSmlsiabMassGetRequestsDtoFragments { ixp_exts = "*", zpusobGenerovani = "*",}
	const enum GSmlsiabMassGetRequestsDtoTypes { ixp_exts = "string[]", zpusobGenerovani = "number",}
	const enum GSmlsiabMassGetRequestsDtoTypeLengths {}
	/**Dto pro převzetí žádostí*/
	interface GSmlsiabUpdateAgIxpReqDto {
		/**Identifikátor žádosti*/
		ixp_ext?: string|null;
		/**Nový identifikátor dokladu*/
		ixp?: string|null;
		/**Nové agendové čislo*/
		ac_sml?: string|null;
	}
	const enum GSmlsiabUpdateAgIxpReqDtoNames { ixp_ext = "ixp_ext", ixp = "ixp", ac_sml = "ac_sml",}
	const enum GSmlsiabUpdateAgIxpReqDtoFragments { ixp_ext = "*", ixp = "*", ac_sml = "*",}
	const enum GSmlsiabUpdateAgIxpReqDtoTypes { ixp_ext = "string", ixp = "string", ac_sml = "string",}
	const enum GSmlsiabUpdateAgIxpReqDtoTypeLengths { ixp_ext = 12,}
	/**Dto pro převzetí žádostí*/
	interface GSmlsiabUpdateAgIxpResDto {
		/**Seznam dto žádostí*/
		dto?: Gordic.Sml.Interface.GSmlsiabDto|null;
		/**Text chyby, pokud nebyl update povolen*/
		errorMessage?: string|null;
	}
	const enum GSmlsiabUpdateAgIxpResDtoNames { dto = "dto", errorMessage = "errorMessage",}
	const enum GSmlsiabUpdateAgIxpResDtoFragments { dto = "*", errorMessage = "*",}
	const enum GSmlsiabUpdateAgIxpResDtoTypes { dto = "Gordic.Sml.Interface.GSmlsiabDto", errorMessage = "string",}
	const enum GSmlsiabUpdateAgIxpResDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlskal.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL Interface - smlskal (Platební kalendář)
	* @domain Smlouvy
	*/
	interface Smlskal {
		/**Načtení platby z platebního kalendáře pro dodavatelský doklad*/
		readDod(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Seznam plateb platebního kalendáře pro dodavatelský doklad*/
		listDod(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Seznam pro roční rozpis plánu plateb (dodavatelský doklad)*/
		listRozpis(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlsrokDto>>;
		/**Vytvoření nového defaultní Dto platby včetně práv*/
		createNewDefaultDto(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Vytvoření platby platebního kalendáře pro dodavatelský doklad*/
		createDod(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Aktualizace platby platebního kalendáře pro dodavatelský doklad*/
		updateDod(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Storno platby platebního kalendáře pro dodavatelský doklad*/
		stornoDod(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Získání počtu položek případu v daném roce*/
		getNumPolForYear(rq?:CallParams<{ixp_sml_pri:string,year:number}>): _Task<{ixp_sml_pri:string,year:number},number>;
		/**Načtení platby z platebního kalendáře pro odběratelský doklad*/
		readOdb(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Seznam plateb platebního kalendáře pro odběratelský doklad*/
		listOdb(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Načtení platby z platebního kalendáře pro odběratelský doklad - detail pohledávky*/
		readPoh(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Vytvoření platby platebního kalendáře pro odběratelský doklad*/
		createPoh(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Aktualizace platby platebního kalendáře pro odběratelský doklad*/
		updatePoh(rq?:Gordic.Sml.Interface.GSmlskalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlskalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Vytvoření nového defaultní Dto pohledávky včetně práv*/
		createNewDefaultPohDto(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GSmlskalDto>>;
		/**Načtení předpisu pohledávky platby platebního kalendáře pro odběratelský doklad*/
		readPredpisPoh(rq?:Gordic.Sml.Interface.GSmldkalDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmldkalDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmldkalDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmldkalDto>>;
		/**Seznam předpisů pohledávek platby platebního kalendáře pro odběratelský doklad*/
		listPredpisPoh(rq?:CallParams<{rq:GServiceListRequest,ixp:string}>): _Task<{rq:GServiceListRequest,ixp:string},GServiceListResponse<Gordic.Sml.Interface.GSmldkalDto>>;
		/**Vytvoření předpisu pohledávky platby platebního kalendáře pro odběratelský doklad*/
		createPredpisPoh(rq?:Gordic.Sml.Interface.GSmldkalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmldkalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmldkalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmldkalDto>>;
		/**Aktualizace předpisu pohledávky platby platebního kalendáře pro odběratelský doklad*/
		updatePredpisPoh(rq?:Gordic.Sml.Interface.GSmldkalDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmldkalDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmldkalDto>,GServiceSaveResponse<Gordic.Sml.Interface.GSmldkalDto>>;
		/**Vytvoření nového defaultní Dto pro předpisu pohledávky včetně práv*/
		createPredpisPohNewDefaultDto(rq?:CallParams<{ixp:string,cis_platby:number,ixp_sml_pri:string}>): _Task<{ixp:string,cis_platby:number,ixp_sml_pri:string},GServiceReadResponse<Gordic.Sml.Interface.GSmldkalDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Smlskal: ServiceBase & Catalog.Smlskal;
	}
	const Smlskal: Client["Smlskal"];
}
declare namespace Gordic.Sml.Interface {
	/**Filter pro platební kalendář*/
	const enum GSmlskalFilter {
		/**ixp - 1.key*/
		ixp,
		/**cis_platby - 2.key*/
		cis_platby,
		/**ixp_sml_pri - 3.key*/
		ixp_sml_pri,
	}
	/**Filter pro platební kalendář - roční rozpis plánů plateb*/
	const enum GSmlsrokFilter {
		/**ixp - 1.key*/
		ixp,
		/**sml_stav*/
		sml_stav,
		rok,
	}
	/**Permissions pro platební kalendář dodavatelských dokladů*/
	interface GSmlskalPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno založit novou platbu*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat platbu*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat platbu*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSmlskalPermissionsNames { LzeNovy = "LzeNovy", LzeEditovat = "LzeEditovat", LzeStornovat = "LzeStornovat",}
	const enum GSmlskalPermissionsFragments { LzeNovy = "*", LzeEditovat = "*", LzeStornovat = "*",}
	const enum GSmlskalPermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSmlskalPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlspid.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - GSmlspid*/
	interface Smlspid {
		/**Vrátí jeden záznam přečtení*/
		read(rq?:Gordic.Sml.Interface.GSmlspidDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlspidDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlspidDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlspidDto>>;
		/**Vrátí list vyfiltrovaných dat*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlspidDto>>;
		/**Vrátí list modifikovaných dat*/
		listNaposledyModifikovaneDokumenty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlspidDto>>;
		/**zjištění subřady AČ - důsledek zavedení úrovně Realizátor*/
		getSubradaAcAg_(rq?:Gordic.Sml.Interface.GSmlDetailSubradaCiselDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlDetailSubradaCiselDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlDetailSubradaCiselDto>,GServiceReadResponse<Gordic.Sml.Interface.GSml_DetailDto>>;
		getKurz(rq?:Gordic.Sml.Interface.GSml_DetailDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSml_DetailDto>,GServiceReadResponse<Gordic.Sml.Interface.GSml_DetailDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Smlspid: ServiceBase & Catalog.Smlspid;
	}
	const Smlspid: Client["Smlspid"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GSmlspidFilter {
		/**The ixp*/
		ixp,
		/**The ixp SML pri*/
		ixp_sml_pri,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlUvolneni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL Interface - Uvolnění prostředků
	* @domain Smlouvy
	*/
	interface SmlUvolneni {
		/**Načtení potřebných dat pro uvolňování prostředků*/
		read(rq?:Gordic.Sml.Interface.GSmlUvolneniReadReqDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GSmlUvolneniReadReqDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GSmlUvolneniReadReqDto>,GServiceReadResponse<Gordic.Sml.Interface.GSmlUvolneniReadResDto>>;
		/**Uvolnění prostředků položky nebo dokladu na úroveň rezervovaných či zadaných uživatelem*/
		free(rq?:Gordic.Sml.Interface.GSmlUvolneniFreeReqDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GSmlUvolneniFreeReqDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GSmlUvolneniFreeReqDto>,void>;
		/**Hromadná kontrola před uvolněním prostředků*/
		checkMassPermissionsBeforeFree(rq?:Gordic.Sml.Interface.GSmlUvolneniMassFreeReqDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlUvolneniMassFreeReqDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlUvolneniMassFreeReqDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlUvolneniMassFreeResDto>>;
		/**Hromadné uvolnění prostředků*/
		massFree(rq?:Gordic.Sml.Interface.GSmlUvolneniMassFreeReqDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GSmlUvolneniMassFreeReqDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GSmlUvolneniMassFreeReqDto>,GServiceGroupResponse<Gordic.Sml.Interface.GSmlUvolneniMassFreeResDto>>;
		/**Zjištění zda lze uvolnit vzhledem ke Státní pokladně*/
		iisspLzeUvolnit(rq?:CallParams<{ixs_hpr:string}>): _Task<{ixs_hpr:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlUvolneni: ServiceBase & Catalog.SmlUvolneni;
	}
	const SmlUvolneni: Client["SmlUvolneni"];
}
declare namespace Gordic.Sml.Interface {
	/**Vstupní dto pro načtení potřebných dat pro uvolňování prostředků*/
	interface GSmlUvolneniReadReqDto {
		/**Případ*/
		ixp_sml_pri?: string|null;
		/**Číslo položky FP*/
		cislo?: number|null;
	}
	const enum GSmlUvolneniReadReqDtoNames { ixp_sml_pri = "ixp_sml_pri", cislo = "cislo",}
	const enum GSmlUvolneniReadReqDtoFragments { ixp_sml_pri = "*", cislo = "*",}
	const enum GSmlUvolneniReadReqDtoTypes { ixp_sml_pri = "string", cislo = "number",}
	const enum GSmlUvolneniReadReqDtoTypeLengths { ixp_sml_pri = 12,}
	/**Výstupní dto pro načtení potřebných dat pro uvolňování prostředků*/
	interface GSmlUvolneniReadResDto {
		/**Částka případu*/
		c_mena?: JsonDecimal|null;
		/**Rozpis případu*/
		c?: JsonDecimal|null;
		/**Textová zkratka měny*/
		mena_zkr?: string|null;
		/**Částka rozpisu za dané období*/
		c_mena_roz?: JsonDecimal|null;
		/**Částka rozpisu za dané období*/
		c_roz?: JsonDecimal|null;
		/**Suma položek FP za dané období*/
		c_pol?: JsonDecimal|null;
		/**Suma c_fak - c_obj_sml položek FP za dané období = očekávané plnění*/
		c_fak?: JsonDecimal|null;
		/**Suma rezervačních zápisů DRD18 vázanách na položky případu za dané období*/
		c_drd18?: JsonDecimal|null;
		/**Suma platebního kalendáře za dané období*/
		c_kal?: JsonDecimal|null;
		/**Suma platebního kalendáře - všechny aktivní řádky, které již byly uplatněny (např. předání žádosti na vygenerování pohledávek)*/
		c_kal_blok?: JsonDecimal|null;
		/**Suma položek PSC vázaných na položky SML za dané období*/
		c_psc?: JsonDecimal|null;
		/**Suma limitů realizátorů načte rezervované přostředky pro všechny aktivní realizátory vázané na doklad*/
		c_rok_real?: JsonDecimal|null;
		/**Suma limitů realizátorů - již rezervované prostředky*/
		c_rok_real_rez?: JsonDecimal|null;
	}
	const enum GSmlUvolneniReadResDtoNames { c_mena = "c_mena", c = "c", mena_zkr = "mena_zkr", c_mena_roz = "c_mena_roz", c_roz = "c_roz", c_pol = "c_pol", c_fak = "c_fak", c_drd18 = "c_drd18", c_kal = "c_kal", c_kal_blok = "c_kal_blok", c_psc = "c_psc", c_rok_real = "c_rok_real", c_rok_real_rez = "c_rok_real_rez",}
	const enum GSmlUvolneniReadResDtoFragments { c_mena = "*", c = "*", mena_zkr = "*", c_mena_roz = "*", c_roz = "*", c_pol = "*", c_fak = "*", c_drd18 = "*", c_kal = "*", c_kal_blok = "*", c_psc = "*", c_rok_real = "*", c_rok_real_rez = "*",}
	const enum GSmlUvolneniReadResDtoTypes { c_mena = "JsonDecimal", c = "JsonDecimal", mena_zkr = "string", c_mena_roz = "JsonDecimal", c_roz = "JsonDecimal", c_pol = "JsonDecimal", c_fak = "JsonDecimal", c_drd18 = "JsonDecimal", c_kal = "JsonDecimal", c_kal_blok = "JsonDecimal", c_psc = "JsonDecimal", c_rok_real = "JsonDecimal", c_rok_real_rez = "JsonDecimal",}
	const enum GSmlUvolneniReadResDtoTypeLengths {}
	/**Vstupní dto s požadavkem pro uvolňovění prostředků*/
	interface GSmlUvolneniFreeReqDto {
		/**Případ*/
		ixp_sml_pri?: string|null;
		/**Číslo položky FP*/
		cislo?: number|null;
		/**Částka položky*/
		c?: JsonDecimal|null;
		/**Objednané prostředky*/
		c_15?: JsonDecimal|null;
		/**Blokované prostředky*/
		c_12?: JsonDecimal|null;
		/**Objem smluv realizovaných na daném VZ*/
		c_11?: JsonDecimal|null;
		/**Rozpočtované prostředky*/
		c_roz?: JsonDecimal|null;
		/**Pomocná proměnná na definici počtu BÚ dle daného kritéria*/
		num_bu?: number|null;
	}
	const enum GSmlUvolneniFreeReqDtoNames { ixp_sml_pri = "ixp_sml_pri", cislo = "cislo", c = "c", c_15 = "c_15", c_12 = "c_12", c_11 = "c_11", c_roz = "c_roz", num_bu = "num_bu",}
	const enum GSmlUvolneniFreeReqDtoFragments { ixp_sml_pri = "*", cislo = "*", c = "*", c_15 = "*", c_12 = "*", c_11 = "*", c_roz = "*", num_bu = "*",}
	const enum GSmlUvolneniFreeReqDtoTypes { ixp_sml_pri = "string", cislo = "number", c = "JsonDecimal", c_15 = "JsonDecimal", c_12 = "JsonDecimal", c_11 = "JsonDecimal", c_roz = "JsonDecimal", num_bu = "number",}
	const enum GSmlUvolneniFreeReqDtoTypeLengths { ixp_sml_pri = 12,}
	/**Vstupní dto pro hromadné uvolnění prostředků dokladů*/
	interface GSmlUvolneniMassFreeReqDto {
		/**Doklady*/
		ixps?: string[]|null;
		/**Režim práce 0=uvolnění, 1 =ukončení, 2 = přeevidence*/
		mode?: number|null;
		/**Příznak upravení celkové částky*/
		make?: boolean|null;
		/**Příznak upravení rozpisu částky*/
		make_rozpis?: boolean|null;
		/**Příznak stornovování dokladu PFK*/
		make_storno_pfk?: boolean|null;
	}
	const enum GSmlUvolneniMassFreeReqDtoNames { ixps = "ixps", mode = "mode", make = "make", make_rozpis = "make_rozpis", make_storno_pfk = "make_storno_pfk",}
	const enum GSmlUvolneniMassFreeReqDtoFragments { ixps = "*", mode = "*", make = "*", make_rozpis = "*", make_storno_pfk = "*",}
	const enum GSmlUvolneniMassFreeReqDtoTypes { ixps = "string[]", mode = "number", make = "boolean", make_rozpis = "boolean", make_storno_pfk = "boolean",}
	const enum GSmlUvolneniMassFreeReqDtoTypeLengths {}
	/**Výstupní dto pro hromadné uvolnění prostředků dokladů*/
	interface GSmlUvolneniMassFreeResDto {
		/**Doklad*/
		ixp?: string|null;
	}
	const enum GSmlUvolneniMassFreeResDtoNames { ixp = "ixp",}
	const enum GSmlUvolneniMassFreeResDtoFragments { ixp = "*",}
	const enum GSmlUvolneniMassFreeResDtoTypes { ixp = "string",}
	const enum GSmlUvolneniMassFreeResDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlVZ.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - SmlVZ - ouško Veřejné zakázky*/
	interface SmlVZ {
		/**Přečti VZ dle ixs_pri*/
		listVZDetail(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GSmlVZDto>>;
		/**Přečti finanční stav dle ixs_pri*/
		listVZFinancniStav(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GRozaaatFinancniStavDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlVZ: ServiceBase & Catalog.SmlVZ;
	}
	const SmlVZ: Client["SmlVZ"];
}
declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum GSmlVZFilter {
		typ_ag_blok,
		ixs_pri,
		ixp_nab,
		rok,
		ucs,
		nks,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGSmlZapisy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL - Interface - Rozpočtové zápisy
	* @domain Smlouvy
	*/
	interface SmlZapisy {
		/**Načtení seznamu rozpočtových zápisů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GRozdxmaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmlZapisy: ServiceBase & Catalog.SmlZapisy;
	}
	const SmlZapisy: Client["SmlZapisy"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtr pro List zápisů*/
	const enum GSmlZapisyFilter {
		/**Identifikátor případu*/
		ixp_sml_pri,
		/**Číslo položky*/
		radek_ag,
		rok,
		lic,
		ico,
		ucs,
		mesic,
		ac,
		radek_z,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\IGVepssmo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Isl - Smlouvy, objednávky - vepssmo - Položky VP
	* @domain Smlouvy
	*/
	interface Vepssmo {
		/**Načtení položky věcného profilu*/
		read(rq?:Gordic.Sml.Interface.GVepssmoDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GVepssmoDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GVepssmoDto>,GServiceReadResponse<Gordic.Sml.Interface.GVepssmoDto>>;
		/**Načtení seznamu věcného profilu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sml.Interface.GVepssmoDto>>;
		/**Insert a update dat - i hromadný*/
		upsert(rq?:Gordic.Sml.Interface.GVepssmoUpsertDto|CallParams<GServiceSaveRequest<Gordic.Sml.Interface.GVepssmoUpsertDto>>): _Task<GServiceSaveRequest<Gordic.Sml.Interface.GVepssmoUpsertDto>,GServiceSaveResponse<Gordic.Sml.Interface.GVepssmoDto>>;
		/**Kontrola možnosti provést storno v kontextu navázaných položek podřízených objednávek*/
		checkStorno(rq?:CallParams<{ixp_smo_sml:string,cis_smo_sml:number,ixp_sml_pri_sml:string}>): _Task<{ixp_smo_sml:string,cis_smo_sml:number,ixp_sml_pri_sml:string},boolean>;
		/**Získání ceny a množství nadřazené smlouvy*/
		getParentContract(rq?:Gordic.Sml.Interface.GVepssmoDto|CallParams<GServiceReadRequest<Gordic.Sml.Interface.GVepssmoDto>>): _Task<GServiceReadRequest<Gordic.Sml.Interface.GVepssmoDto>,GServiceReadResponse<Gordic.Sml.Interface.GVepssmoDto>>;
		/**Načtení Fin případu smlouvy (napočtení navázaného vp)*/
		getVPWithnoutMyself(rq?:CallParams<{smlpid:Gordic.Sml.Interface.GDokladSmlDto,cis_smo:number}>): _Task<{smlpid:Gordic.Sml.Interface.GDokladSmlDto,cis_smo:number},Gordic.Sml.Interface.GDokladSmlDto>;
		/**Hromadná kontrola dat před zadanou operací*/
		checkMassPermissionsBeforeOperation(rq?:Gordic.Sml.Interface.GVepssmoMassUpsertDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GVepssmoMassUpsertDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GVepssmoMassUpsertDto>,GServiceGroupResponse<Gordic.Sml.Interface.GVepssmoDto>>;
		/**Hromadná aktivní operace*/
		massOperation(rq?:Gordic.Sml.Interface.GVepssmoMassUpsertDto|CallParams<GServiceGroupRequest<Gordic.Sml.Interface.GVepssmoMassUpsertDto>>): _Task<GServiceGroupRequest<Gordic.Sml.Interface.GVepssmoMassUpsertDto>,GServiceGroupResponse<Gordic.Sml.Interface.GVepssmoDto>>;
		/**Vytvoření nové položky věcného profilu s Permissions*/
		createNewDefaultItem(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Sml.Interface.GVepssmoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Vepssmo: ServiceBase & Catalog.Vepssmo;
	}
	const Vepssmo: Client["Vepssmo"];
}
declare namespace Gordic.Sml.Interface {
	/**Filtry pro požadavky na budování LISTu*/
	const enum GVepssmoFilter {
		/**PK tabulky -*/
		ixp_smo,
		/**PK tabulky -*/
		cis_smo,
		/**PK tabulky -*/
		ixp_sml_pri,
	}
	/**Dto pro upsert dat*/
	interface GVepssmoUpsertDto {
		/**Dto věcného profilu*/
		dto?: Gordic.Sml.Interface.GVepssmoDto|null;
		/**Typ požadované operace*/
		operace?: Gordic.Sml.Interface.GVepssmoUpsertOperace|null;
		/**Ixp aktuálního dokladu*/
		ixp?: string|null;
	}
	const enum GVepssmoUpsertDtoNames { dto = "dto", operace = "operace", ixp = "ixp",}
	const enum GVepssmoUpsertDtoFragments { dto = "*", operace = "*", ixp = "*",}
	const enum GVepssmoUpsertDtoTypes { dto = "Gordic.Sml.Interface.GVepssmoDto", operace = "Gordic.Sml.Interface.GVepssmoUpsertOperace", ixp = "string",}
	const enum GVepssmoUpsertDtoTypeLengths {}
	/**Dto pro hromadný upsert dat*/
	interface GVepssmoMassUpsertDto {
		/**List s dto věcného profilu*/
		dtos?: Gordic.Sml.Interface.GVepssmoDto[]|null;
		/**Typ požadované operace*/
		operace?: Gordic.Sml.Interface.GVepssmoUpsertOperace|null;
		/**Ixp aktuálního dokladu*/
		ixp?: string|null;
	}
	const enum GVepssmoMassUpsertDtoNames { dtos = "dtos", operace = "operace", ixp = "ixp",}
	const enum GVepssmoMassUpsertDtoFragments { dtos = "*", operace = "*", ixp = "*",}
	const enum GVepssmoMassUpsertDtoTypes { dtos = "Gordic.Sml.Interface.GVepssmoDto[]", operace = "Gordic.Sml.Interface.GVepssmoUpsertOperace", ixp = "string",}
	const enum GVepssmoMassUpsertDtoTypeLengths {}
	/**Možné operace nad záznamy*/
	const enum GVepssmoUpsertOperace {
		/**Insert a update dat*/
		upsert=20,
		/**Schválení*/
		validate=30,
		/**Storno*/
		storno=90,
		/**Zrušení storna*/
		zrusitStorno=91,
	}
	/**Permissions pro věcný profil*/
	interface GVepssmoPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno založit nový záznam*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat záznam*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno schválit záznam*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat záznam*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit storno záznamu*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GVepssmoPermissionsNames { LzeNovy = "LzeNovy", LzeEvidovat = "LzeEvidovat", LzeSchvalit = "LzeSchvalit", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno",}
	const enum GVepssmoPermissionsFragments { LzeNovy = "*", LzeEvidovat = "*", LzeSchvalit = "*", LzeStornovat = "*", LzeZrusitStorno = "*",}
	const enum GVepssmoPermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GVepssmoPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\ISL\Obejkty\BackEnd.d.ts 

declare namespace Gordic.Sml.Interface {
	/**342.15 12.12.01 - ODBC je vlastně MS SQL Server - doplněna podpora
	*     344.6 04.06.02 - zaveden prefixTmpTable pro ODBC - vas.#
	*     360.19 23.10.09 metody určené pro fulltextové vyhledávání v MSS jsou přesunuty do cfc_EkoInit(GINECL01)
	*     typické vlastnosti pro jednotlivé stroječky
	*     oddělení outer proměnných pro Informix a Oracle
	*/
	interface BackEnd {
		/**!typ RDBMS*/
		nBackEnd?: number|null;
		/**číslo verze*/
		sVersion?: string|null;
		/**údaj pro aktuální časový údaj - @now, current, ... pro select*/
		sTimeSel?: string|null;
		/**údaj pro akt.datettime při DML - insert, update*/
		sTimeDml?: string|null;
		/**údaj pro práci s upcase v DB*/
		sUpper?: string|null;
		/**trimovací funkce stroje*/
		sTrim?: string|null;
		/**outer join pro syntaxi Informixu*/
		sInfOuter?: string|null;
		/**outer join pro syntaxi Oracle*/
		sOraOuter?: string|null;
		/**hodnota null sloupce pro inicializaci a selecty*/
		sNull?: string|null;
		/**jméno funkce DATE - vrací datum z hodnoty DATETIME*/
		f_date?: string|null;
		/**jméno TMP tbl*/
		tmpTablePrd?: string|null;
		/**vlastník + jméno TMP tbl 360.20 08.12.09*/
		tmpTablePrdComp?: string|null;
		/**odlišení vlastníka tmp tbl - u Oracle = vas*/
		prefixTmpTable?: string|null;
		/**inicializace hodnoty serial v tbl*/
		serialNull?: string|null;
		/**ukončení trimovací funkce stroje*/
		sTrimEnd?: string|null;
		/**součet dvou řetezců*/
		sSqlPlus?: string|null;
		/**typ DB znakově*/
		sDBType?: string|null;
		/**nvl, isnull*/
		sNvl?: string|null;
		/**jméno funkce DB stroje pro substring*/
		Substr?: string|null;
		/**jméno funkce DB stroje pro délku řetězce*/
		Length?: string|null;
		/**dočasní tabulka na db parametry*/
		tmpTableGintcft?: string|null;
	}
	const enum BackEndNames { nBackEnd = "nBackEnd", sVersion = "sVersion", sTimeSel = "sTimeSel", sTimeDml = "sTimeDml", sUpper = "sUpper", sTrim = "sTrim", sInfOuter = "sInfOuter", sOraOuter = "sOraOuter", sNull = "sNull", f_date = "f_date", tmpTablePrd = "tmpTablePrd", tmpTablePrdComp = "tmpTablePrdComp", prefixTmpTable = "prefixTmpTable", serialNull = "serialNull", sTrimEnd = "sTrimEnd", sSqlPlus = "sSqlPlus", sDBType = "sDBType", sNvl = "sNvl", Substr = "Substr", Length = "Length", tmpTableGintcft = "tmpTableGintcft",}
	const enum BackEndFragments { nBackEnd = "*", sVersion = "*", sTimeSel = "*", sTimeDml = "*", sUpper = "*", sTrim = "*", sInfOuter = "*", sOraOuter = "*", sNull = "*", f_date = "*", tmpTablePrd = "*", tmpTablePrdComp = "*", prefixTmpTable = "*", serialNull = "*", sTrimEnd = "*", sSqlPlus = "*", sDBType = "*", sNvl = "*", Substr = "*", Length = "*", tmpTableGintcft = "*",}
	const enum BackEndTypes { nBackEnd = "number", sVersion = "string", sTimeSel = "string", sTimeDml = "string", sUpper = "string", sTrim = "string", sInfOuter = "string", sOraOuter = "string", sNull = "string", f_date = "string", tmpTablePrd = "string", tmpTablePrdComp = "string", prefixTmpTable = "string", serialNull = "string", sTrimEnd = "string", sSqlPlus = "string", sDBType = "string", sNvl = "string", Substr = "string", Length = "string", tmpTableGintcft = "string",}
	const enum BackEndTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Readers\IGReaderSmlKalIxsEsuSml.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum ReaderSmlKalIxsEsuSmlFilter {
		/**ixs_esu*/
		ixs_esu,
		/**ixp_sml_pri*/
		ixp_sml_pri,
		esu_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Readers\IGReaderSmlsesu.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Autogenerated.*/
	const enum ReaderSmlsesuFilter {
		/**ixp_sml_pri*/
		ixp_sml_pri,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Interface\Sml\Readers\IGSmlTypDokladu.d.ts 

declare namespace Gordic.Sml.Interface {
	/**Filtry pro políčko typ dokladu*/
	const enum GSmlTypDokladuFilter {
		ktg_den,
		ixp_den,
		ixs_typ,
	}
}

//#endregion

