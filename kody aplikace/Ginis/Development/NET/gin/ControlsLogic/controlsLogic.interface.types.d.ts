/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       controlsLogic.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gordic.ControlsLogic.Interface.csproj
*    created     2026-02-16 14:33:45
*    files       Bpl\Dto\GBplssteDto.d.ts
*                Buc\IGBuccdpd.d.ts
*                Buc\Dto\GBuccdpdDto.d.ts
*                Buc\Dto\GBuccpneDto.d.ts
*                Buc\Dto\GEkoczuhDto.d.ts
*                Cnt\Dto\GCntctymDto.d.ts
*                Eko\Dto\GEkocktdDto.d.ts
*                Eko\Dto\GEkoctspDto.d.ts
*                Eko\Dto\GEkosuci.Dto.d.ts
*                Esu\Dto\GReaderGinsesuDto.d.ts
*                Esu\Dto\GSzrsprfDto.d.ts
*                Gin\IGGinctedReader.d.ts
*                Gin\IGGinssfu.d.ts
*                Gin\IGReaderGinctps.d.ts
*                Gin\IGReaderGinsico.d.ts
*                Gin\DataSet\GGinsurp.Dto.d.ts
*                Gin\Dto\GGincfazDto.d.ts
*                Gin\Dto\GGincokrDto.d.ts
*                Gin\Dto\GGincoseDto.d.ts
*                Gin\Dto\GGincpanDto.d.ts
*                Gin\Dto\GGincpfoDto.d.ts
*                Gin\Dto\GGinsblgDto.d.ts
*                Gin\Dto\GGinsoapDto.d.ts
*                Gin\Dto\GGinspsoDto.d.ts
*                Gin\Dto\GGinsskrDto.d.ts
*                Gin\Dto\GGinsurlDto.d.ts
*                Gin\Dto\GGinsvskDto.d.ts
*                Gin\Dto\GGinvpsuDto.d.ts
*                Gin\Dto\GModuleDto.d.ts
*                Gin\Dto\GReaderGincaktDto.d.ts
*                Gin\Dto\GReaderGincblaDto.d.ts
*                Gin\Dto\GReaderGincpanDto.d.ts
*                Gin\Dto\GReaderGincstuDto.d.ts
*                Gin\Dto\GReaderGinctagDto.d.ts
*                Gin\Dto\GReaderGinctpsDto.d.ts
*                Gin\Dto\GReaderGinsfunDto.d.ts
*                Gin\Dto\GReaderGinsicoDto.d.ts
*                Gin\Dto\GReaderGinspodDto.d.ts
*                Gin\Dto\GReaderGinstreDto.d.ts
*                Maj\IGReaderMajcppr.d.ts
*                Maj\Dto\GReaderMajcpprDto.d.ts
*                Spi\DataSet\GSpisspi.Dto.d.ts
*                Ssl\DataSet\GSslstyp.Dto.d.ts
*                Ssl\Dto\GReaderSslcpdtDto.d.ts
*                Ssl\Dto\GReaderSslcspiDto.d.ts
*                Ssl\Dto\GReaderSslctvyDto.d.ts
*                Ssl\Dto\GReaderSslcvspDto.d.ts
*                Ssl\Dto\GReaderSslsspzDto.d.ts
*                Ssl\Dto\GReaderSslstypDto.d.ts
*                Ssl\Dto\GReaderSslsumiDto.d.ts
*                Ssl\Dto\GReaderSslszvsDto.d.ts
*                Wfl\DataSet\GWflcfor.Dto.d.ts
*                Wfl\DataSet\GWflcktp.Dto.d.ts
*                Wfl\DataSet\Wflcprt.Dto.d.ts
*                Wfl\Dto\GReaderWflcdrzDto.d.ts
*                Wfl\Dto\GReaderWflcdzzDto.d.ts
*                Wfl\Dto\GReaderWflcpcjDto.d.ts
*                Wfl\Dto\GReaderWflcproDto.d.ts
*                Wfl\Dto\GReaderWflcpuvDto.d.ts
*                Wfl\Dto\GReaderWflcstpDto.d.ts
*                Wfl\Dto\GReaderWflcstvDto.d.ts
*                Wfl\Dto\GReaderWflctduDto.d.ts
*                Wfl\Dto\GReaderWflctysDto.d.ts
*                Wfl\Dto\GReaderWflczipDto.d.ts
*                Wfl\Dto\GReaderWflczpdDto.d.ts
*                Wfl\Dto\GReaderWflscerDto.d.ts
*                Wfl\Dto\GReaderWflsserDto.d.ts
*                Wfl\Dto\GWflccskDto.d.ts
*                Wfl\Dto\GWflcepsReaderDto.d.ts
*                Wfl\Dto\GWflcfskReaderDto.d.ts
*                Wfl\Dto\GWflckdpDto.d.ts
*                Wfl\Dto\GWflcopaReaderDto.d.ts
*                Wfl\Dto\GWflcpetReaderDto.d.ts
*                Wfl\Dto\GWflcpokReaderDto.d.ts
*                Wfl\Dto\GWflcpubReaderDto.d.ts
*                Wfl\Dto\GWflcpudReaderDto.d.ts
*                Wfl\Dto\GWflcspuReaderDto.d.ts
*                Wfl\Dto\GWflctppReaderDto.d.ts
*                Wfl\Dto\GWflctsrReaderDto.d.ts
*                Wfl\Dto\GWflsgraReaderDto.d.ts
*                Wfl\Dto\GWflsstpReaderDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Bpl\Dto\GBplssteDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Datový objekt popisující skupiny šablon BPL.*/
	interface GBplssteDto {
		/**Identifikátor skupiny šablon*/
		ixs_ste?: string|null;
		/**Typ agendy BPL*/
		typ_ag?: string|null;
		/**Externí identifikátor*/
		id_ext?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Datum od*/
		dat_od?: JsonDate|null;
		/**Datum do*/
		dat_do?: JsonDate|null;
		/**Typ skupiny šablon*/
		typ_ste?: number|null;
		/**Příznak opakovatelného použití šablony*/
		s_opak?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Funkce*/
		ixs_fun?: string|null;
		/**IČO*/
		ico?: string|null;
	}
	const enum GBplssteDtoNames { ixs_ste = "ixs_ste", typ_ag = "typ_ag", id_ext = "id_ext", aktivita = "aktivita", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", typ_ste = "typ_ste", s_opak = "s_opak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun", ico = "ico",}
	const enum GBplssteDtoFragments { ixs_ste = "*", typ_ag = "*", id_ext = "*", aktivita = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", typ_ste = "*", s_opak = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun = "*", ico = "*",}
	const enum GBplssteDtoTypes { ixs_ste = "string", typ_ag = "string", id_ext = "string", aktivita = "number", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", typ_ste = "number", s_opak = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun = "string", ico = "string",}
	const enum GBplssteDtoTypeLengths { ixs_ste = 12, id_ext = 30, zkratka = 16, nazev = 50, poznamka = 50, zmenu_prov = 12, ixs_fun = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Buc\IGBuccdpd.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Filtr způsobů úhrady*/
	const enum FilterBuccdpd {
		/**Stav dávky příkazů*/
		s_dpb,
		/**Stav dávky příkazů - název*/
		s_dpb_txt,
		/**Stav dávky příkazů - zkratka*/
		s_dpb_zkr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Buc\Dto\GBuccdpdDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO pro Stav dávky příkazů*/
	interface GBuccdpdDto {
		/**Stav dávky příkazů - kód (cislo)*/
		s_dpb?: number|null;
		/**Stav dávky příkazů - text*/
		s_dpb_txt?: string|null;
		/**Stav dávky příkazů - zkratka*/
		s_dpb_zkr?: string|null;
		/**DBCOLUMN:buccdpd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:buccdpd.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:buccdpd.k_xml*/
		k_xml?: string|null;
	}
	const enum GBuccdpdDtoNames { s_dpb = "s_dpb", s_dpb_txt = "s_dpb_txt", s_dpb_zkr = "s_dpb_zkr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GBuccdpdDtoFragments { s_dpb = "*", s_dpb_txt = "*", s_dpb_zkr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GBuccdpdDtoTypes { s_dpb = "number", s_dpb_txt = "string", s_dpb_zkr = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GBuccdpdDtoTypeLengths { s_dpb_txt = 50, s_dpb_zkr = 16, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Buc\Dto\GBuccpneDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO pro Příznak nepárovat*/
	interface GBuccpneDto {
		/**Název příznaku nepárovat*/
		priz_nepar_txt?: string|null;
		/**Příznak nepárovat*/
		priz_nepar?: number|null;
	}
	const enum GBuccpneDtoNames { priz_nepar_txt = "priz_nepar_txt", priz_nepar = "priz_nepar",}
	const enum GBuccpneDtoFragments { priz_nepar_txt = "*", priz_nepar = "*",}
	const enum GBuccpneDtoTypes { priz_nepar_txt = "string", priz_nepar = "number",}
	const enum GBuccpneDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Buc\Dto\GEkoczuhDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO pro Způsob úhrady položky výpisu*/
	interface GEkoczuhDto {
		/**Způsob úhrady položky výpisu - text*/
		zu_txt?: string|null;
		/**Způsob úhrady položky výpisu - kod (cislo)*/
		zu?: number|null;
	}
	const enum GEkoczuhDtoNames { zu_txt = "zu_txt", zu = "zu",}
	const enum GEkoczuhDtoFragments { zu_txt = "*", zu = "*",}
	const enum GEkoczuhDtoTypes { zu_txt = "string", zu = "number",}
	const enum GEkoczuhDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Cnt\Dto\GCntctymDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:cntctym*/
	interface GCntctymDto {
		typ_masky?: number|null;
		typ_masky_zkr?: string|null;
		typ_masky_txt?: string|null;
		aktivita?: number|null;
		k_v?: number|null;
		k_s?: string|null;
	}
	const enum GCntctymDtoNames { typ_masky = "typ_masky", typ_masky_zkr = "typ_masky_zkr", typ_masky_txt = "typ_masky_txt", aktivita = "aktivita", k_v = "k_v", k_s = "k_s",}
	const enum GCntctymDtoFragments { typ_masky = "*", typ_masky_zkr = "*", typ_masky_txt = "*", aktivita = "*", k_v = "*", k_s = "*",}
	const enum GCntctymDtoTypes { typ_masky = "number", typ_masky_zkr = "string", typ_masky_txt = "string", aktivita = "number", k_v = "number", k_s = "string",}
	const enum GCntctymDtoTypeLengths { typ_masky_zkr = 10, typ_masky_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Eko\Dto\GEkocktdDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Kategorie daníku DTO*/
	interface GEkocktdDto {
		/**kategorie deniku*/
		ktg_den?: number|null;
		/**Kategorie deniku - text*/
		ktg_den_txt?: string|null;
		/**typ agendy*/
		typ_ag?: number|null;
		/**trideni*/
		k_v?: number|null;
	}
	const enum GEkocktdDtoNames { ktg_den = "ktg_den", ktg_den_txt = "ktg_den_txt", typ_ag = "typ_ag", k_v = "k_v",}
	const enum GEkocktdDtoFragments { ktg_den = "*", ktg_den_txt = "*", typ_ag = "*", k_v = "*",}
	const enum GEkocktdDtoTypes { ktg_den = "number", ktg_den_txt = "string", typ_ag = "number", k_v = "number",}
	const enum GEkocktdDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Eko\Dto\GEkoctspDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO Způsob výpočtu smluvní pokuty*/
	interface GEkoctspDto {
		/**Způsob výpočtu smluvní pokuty - text*/
		typ_spo_txt?: string|null;
		/**Způsob výpočtu smluvní pokuty - kod (cislo)*/
		typ_spo?: number|null;
	}
	const enum GEkoctspDtoNames { typ_spo_txt = "typ_spo_txt", typ_spo = "typ_spo",}
	const enum GEkoctspDtoFragments { typ_spo_txt = "*", typ_spo = "*",}
	const enum GEkoctspDtoTypes { typ_spo_txt = "string", typ_spo = "number",}
	const enum GEkoctspDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Eko\Dto\GEkosuci.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosuciDto {
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu_ban*/
		ixs_esu_ban?: string|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.iban*/
		iban?: string|null;
		/**DBCOLUMN:Seznam.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_ban*/
		nazev_ban?: string|null;
		/**DBCOLUMN:Seznam.esu_txt_ban*/
		esu_txt_ban?: string|null;
		/**DBCOLUMN:Seznam.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:Seznam.bic*/
		bic?: string|null;
		/**DBCOLUMN:Seznam.priz_uc_fu*/
		priz_uc_fu?: number|null;
		/**DBCOLUMN:Seznam.ode_sp*/
		ode_sp?: number|null;
	}
	const enum GEkosuciDtoNames { ixs_esu = "ixs_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", aktivita = "aktivita", ixs_esu_ban = "ixs_esu_ban", mena = "mena", iban = "iban", esu_txt = "esu_txt", nazev = "nazev", nazev_ban = "nazev_ban", esu_txt_ban = "esu_txt_ban", mena_zkr = "mena_zkr", bic = "bic", priz_uc_fu = "priz_uc_fu", ode_sp = "ode_sp",}
	const enum GEkosuciDtoFragments { ixs_esu = "*", bu_ci = "*", sk_ci = "*", aktivita = "*", ixs_esu_ban = "*", mena = "*", iban = "*", esu_txt = "*", nazev = "*", nazev_ban = "*", esu_txt_ban = "*", mena_zkr = "*", bic = "*", priz_uc_fu = "*", ode_sp = "*",}
	const enum GEkosuciDtoTypes { ixs_esu = "string", bu_ci = "string", sk_ci = "string", aktivita = "number", ixs_esu_ban = "string", mena = "number", iban = "string", esu_txt = "string", nazev = "string", nazev_ban = "string", esu_txt_ban = "string", mena_zkr = "string", bic = "string", priz_uc_fu = "number", ode_sp = "number",}
	const enum GEkosuciDtoTypeLengths { ixs_esu = 12, bu_ci = 34, sk_ci = 11, ixs_esu_ban = 12, iban = 34,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Esu\Dto\GReaderGinsesuDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - externí subjekty*/
	interface GReaderGinsesuDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		cs_nazev?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		oc?: string|null;
		/**Autogenerated.*/
		priz_int?: number|null;
	}
	const enum GReaderGinsesuDtoNames { ixs_esu = "ixs_esu", aktivita = "aktivita", nazev = "nazev", ico = "ico", cs_nazev = "cs_nazev", rc = "rc", oc = "oc", priz_int = "priz_int",}
	const enum GReaderGinsesuDtoFragments { ixs_esu = "*", aktivita = "*", nazev = "*", ico = "*", cs_nazev = "*", rc = "*", oc = "*", priz_int = "*",}
	const enum GReaderGinsesuDtoTypes { ixs_esu = "string", aktivita = "number", nazev = "string", ico = "string", cs_nazev = "string", rc = "string", oc = "string", priz_int = "number",}
	const enum GReaderGinsesuDtoTypeLengths { ixs_esu = 12, nazev = 100, ico = 14, cs_nazev = 100, rc = 10, oc = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Esu\Dto\GSzrsprfDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Právní formy ze SZR.
	*     DBTABLE:szrsprf
	*/
	interface GSzrsprfDto {
		/**DBCOLUMN:szrsprf.kod_pravni_formy*/
		kod_pravni_formy?: number|null;
		/**DBCOLUMN:szrsprf.nazev_prav_formy*/
		nazev_prav_formy?: string|null;
		/**DBCOLUMN:szrsprf.cas_odpovedi*/
		cas_odpovedi?: JsonDate|null;
		/**DBCOLUMN:szrsprf.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:szrsprf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:szrsprf.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:szrsprf.typ_org*/
		typ_org?: number|null;
	}
	const enum GSzrsprfDtoNames { kod_pravni_formy = "kod_pravni_formy", nazev_prav_formy = "nazev_prav_formy", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_org = "typ_org",}
	const enum GSzrsprfDtoFragments { kod_pravni_formy = "*", nazev_prav_formy = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_org = "*",}
	const enum GSzrsprfDtoTypes { kod_pravni_formy = "number", nazev_prav_formy = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_org = "number",}
	const enum GSzrsprfDtoTypeLengths { nazev_prav_formy = 240, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\IGGinctedReader.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:gincted*/
	interface GGinctedDto {
		/**DBCOLUMN:gincted.typ_ed*/
		typ_ed?: number|null;
		/**DBCOLUMN:gincted.typ_ed_txt*/
		typ_ed_txt?: string|null;
		/**DBCOLUMN:gincted.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincted.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincted.k_xml*/
		k_xml?: string|null;
	}
	const enum GGinctedDtoNames { typ_ed = "typ_ed", typ_ed_txt = "typ_ed_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GGinctedDtoFragments { typ_ed = "*", typ_ed_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GGinctedDtoTypes { typ_ed = "number", typ_ed_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GGinctedDtoTypeLengths { typ_ed_txt = 50, k_s = 15, k_xml = 254,}
	/**Sloupce DataTable pro doplnky spzn*/
	const enum ColGincted {
		/**typ_ed*/
		typ_ed,
		/**nazev*/
		typ_ed_txt,
		k_v,
		k_s,
		k_xml,
	}
	/**ENUM:gincted*/
	const enum GGinctedEnum {
		/**Neurčeno*/
		_0=0,
		/**e-faktura*/
		e_faktura=10,
		/**e-doručenka - ISDS*/
		e_dorucenky_ISDS=20,
		/**datová zpráva - ISDS*/
		e_datovazprava_ISDS=30,
		/**doručenka z ISRS*/
		e_datovazprava_ISDS_dorucenkazISRS=40,
		/**datová zpráva z ISRS*/
		e_datovazprava_ISDS_datovazpravazISRS=50,
		/**datová zpráva z HKP*/
		e_datovazprava_ISDS_datovyzpravazHKP=60,
		/**podání - UPVS*/
		e_podani_UPVS=100,
		/**dokument - UPVS*/
		e_dokument_UPVS=110,
		/**doručenka - UPVS*/
		e_dorucenka_UPVS=120,
		/**doručenka - kopie - UPVS*/
		e_dorucenka_kopie_UPVS=121,
		/**notifikace - UPVS*/
		e_notifikace_UPVS=130,
		/**chyba - UPVS*/
		e_chyba_UPVS=140,
		/**informace - UPVS*/
		e_informace_UPVS=150,
		/**Potvrzení o odeslaní el. podání-UPVS*/
		e_potv_pod_UPVS=160,
		/**Avizace doručování el. podání-UPVS*/
		e_aviz_pod_UPVS=165,
		/**Přijetí zprávy na zpracování v ÚPVS-UPVS*/
		e_zprac_na_UPVS=170,
		/**Info. o výsledku doruč. listinného rovnopisu*/
		e_deliv_re_UPVS=180,
		/**Info. o začatí doruč. listinného rovnopisu*/
		e_deliv_acc_UPVS=190,
		/**Info. o nedoručení zprávy*/
		e_nedorucn_UPVS=200,
		/**Ověření podpisů - UPVS*/
		e_overeni_podpisu_UPVS=210,
		/**Změna u doručené zpr.-UPVS*/
		DeliveryChangeInformation_UPVS=220,
		/**Změna u nedoručené zpr.-UPVS*/
		NotDeliveryChangeInformation_UPVS=230,
		/**Mep_Paymant-UPVS*/
		Mep_payment_UPVS=301,
		/**CUET notifikace přijetí na zpracovaní-UPVS*/
		NotificationRequestForEntering_UPVS=401,
		/**CUET zveřejnění dokumentu-UPVS*/
		NotificationDocumentPublished_UPVS=402,
		/**CUET konec zveřejnění dokumentu-UPVS*/
		NotificationDocumentEnd_UPVS=403,
		/**CUET notifikace o zprac. zrušení zve.-UPVS*/
		NotificationRequestForRevocation_UPVS=404,
		/**CUET zamétnutí žádosi-UPVS*/
		RequestReject_UPVS=405,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\IGGinssfu.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Autogenerated.*/
	const enum FilterGinssfu {
		/**Autogenerated.*/
		ixs_sfu,
		/**Autogenerated.*/
		nazev,
		/**Autogenerated.*/
		zkratka,
		/**Autogenerated.*/
		poznamka,
		/**Autogenerated.*/
		aktivita,
		/**Autogenerated.*/
		dat_zmena,
		/**Autogenerated.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\IGReaderGinctps.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	const enum GReaderFilterGinctps {
		/**Oprávnění ke skupině*/
		typ_prist_sfu,
		/**Oprávnění ke skupině*/
		typ_prist_sfu_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\IGReaderGinsico.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	const enum GReaderFilterGinsico {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico,
		/**Název subjektu*/
		nazev,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\DataSet\GGinsurp.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Ginsurp*/
	interface GGinsurpDto {
		/**DBCOLUMN:Ginsurp.ur_pri*/
		ur_pri?: number|null;
		/**DBCOLUMN:Ginsurp.ur_pri_txt*/
		ur_pri_txt?: string|null;
		/**DBCOLUMN:Ginsurp.popis*/
		popis?: string|null;
		/**DBCOLUMN:Ginsurp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Ginsurp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ginsurp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ginsurp.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGinsurpDtoNames { ur_pri = "ur_pri", ur_pri_txt = "ur_pri_txt", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsurpDtoFragments { ur_pri = "*", ur_pri_txt = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsurpDtoTypes { ur_pri = "number", ur_pri_txt = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsurpDtoTypeLengths { ur_pri_txt = 50, popis = 2000, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGincfazDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO pro výběr fáze*/
	interface GGincfazDto {
		/**Fáze*/
		faze?: string|null;
		/**Popis*/
		faze_txt?: string|null;
	}
	const enum GGincfazDtoNames { faze = "faze", faze_txt = "faze_txt",}
	const enum GGincfazDtoFragments { faze = "*", faze_txt = "*",}
	const enum GGincfazDtoTypes { faze = "string", faze_txt = "string",}
	const enum GGincfazDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGincokrDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:gincokr*/
	interface GGincokrDto {
		/**DBCOLUMN:gincokr.id_okres*/
		id_okres?: string|null;
		/**DBCOLUMN:gincokr.id_okres_txt*/
		id_okres_txt?: string|null;
		/**DBCOLUMN:gincokr.id_okres_zkr*/
		id_okres_zkr?: string|null;
		/**DBCOLUMN:gincokr.id_kraj*/
		id_kraj?: string|null;
		/**DBCOLUMN:gincokr.kod_okr*/
		kod_okr?: number|null;
		/**DBCOLUMN:gincokr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincokr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincokr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gincokr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincokr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincokr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGincokrDtoNames { id_okres = "id_okres", id_okres_txt = "id_okres_txt", id_okres_zkr = "id_okres_zkr", id_kraj = "id_kraj", kod_okr = "kod_okr", k_v = "k_v", k_s = "k_s", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGincokrDtoFragments { id_okres = "*", id_okres_txt = "*", id_okres_zkr = "*", id_kraj = "*", kod_okr = "*", k_v = "*", k_s = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGincokrDtoTypes { id_okres = "string", id_okres_txt = "string", id_okres_zkr = "string", id_kraj = "string", kod_okr = "number", k_v = "number", k_s = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGincokrDtoTypeLengths { id_okres = 6, id_okres_txt = 50, id_okres_zkr = 2, id_kraj = 5, k_s = 15, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGincoseDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:gincose
	*      gincose
	*/
	interface GGincoseDto {
		oauth_service?: number|null;
		oauth_service_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincoseDtoNames { oauth_service = "oauth_service", oauth_service_txt = "oauth_service_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincoseDtoFragments { oauth_service = "*", oauth_service_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincoseDtoTypes { oauth_service = "number", oauth_service_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincoseDtoTypeLengths { oauth_service_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGincpanDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - ano/ne*/
	interface GGincpanDto {
		/**Autogenerated.*/
		priz_an?: number|null;
		/**Autogenerated.*/
		priz_an_txt?: string|null;
		/**Autogenerated.*/
		priz_an_c1?: string|null;
		/**Autogenerated.*/
		priz_an_rsx?: number|null;
	}
	const enum GGincpanDtoNames { priz_an = "priz_an", priz_an_txt = "priz_an_txt", priz_an_c1 = "priz_an_c1", priz_an_rsx = "priz_an_rsx",}
	const enum GGincpanDtoFragments { priz_an = "*", priz_an_txt = "*", priz_an_c1 = "*", priz_an_rsx = "*",}
	const enum GGincpanDtoTypes { priz_an = "number", priz_an_txt = "string", priz_an_c1 = "string", priz_an_rsx = "number",}
	const enum GGincpanDtoTypeLengths { priz_an_txt = 50, priz_an_c1 = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGincpfoDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Právní forma organizace - DTO*/
	interface GGincpfoDto {
		pr_forma?: string|null;
		pr_forma_txt?: string|null;
		dat_od?: JsonDate|null;
		dat_akt?: JsonDate|null;
		pr_forma_def?: string|null;
	}
	const enum GGincpfoDtoNames { pr_forma = "pr_forma", pr_forma_txt = "pr_forma_txt", dat_od = "dat_od", dat_akt = "dat_akt", pr_forma_def = "pr_forma_def",}
	const enum GGincpfoDtoFragments { pr_forma = "*", pr_forma_txt = "*", dat_od = "*", dat_akt = "*", pr_forma_def = "*",}
	const enum GGincpfoDtoTypes { pr_forma = "string", pr_forma_txt = "string", dat_od = "JsonDate", dat_akt = "JsonDate", pr_forma_def = "string",}
	const enum GGincpfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinsblgDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginsblg*/
	interface GGinsblgDto {
		/**DBCOLUMN:ginsblg.ixs_blg*/
		ixs_blg?: string|null;
		/**DBCOLUMN:ginsblg.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsblg.typ_blg*/
		typ_blg?: number|null;
		/**DBCOLUMN:ginsblg.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsblg.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsblg.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsblg.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Čtenář*/
		ixs_fun?: string|null;
	}
	const enum GGinsblgDtoNames { ixs_blg = "ixs_blg", nazev = "nazev", typ_blg = "typ_blg", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun",}
	const enum GGinsblgDtoFragments { ixs_blg = "*", nazev = "*", typ_blg = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun = "*",}
	const enum GGinsblgDtoTypes { ixs_blg = "string", nazev = "string", typ_blg = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun = "string",}
	const enum GGinsblgDtoTypeLengths { ixs_blg = 12, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinsoapDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginsoap
	*      OAuth profily dto pro prefab
	*/
	interface GGinsoapDto {
		ixs_oap?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		tenant_id?: string|null;
		typ_cloudu?: number|null;
		clie_id?: string|null;
		cl_sec?: string|null;
		o365_url?: string|null;
		typ_aut_oauth?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinsoapDtoNames { ixs_oap = "ixs_oap", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", tenant_id = "tenant_id", typ_cloudu = "typ_cloudu", clie_id = "clie_id", cl_sec = "cl_sec", o365_url = "o365_url", typ_aut_oauth = "typ_aut_oauth", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsoapDtoFragments { ixs_oap = "*", nazev = "*", dat_od = "*", dat_do = "*", tenant_id = "*", typ_cloudu = "*", clie_id = "*", cl_sec = "*", o365_url = "*", typ_aut_oauth = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsoapDtoTypes { ixs_oap = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", tenant_id = "string", typ_cloudu = "number", clie_id = "string", cl_sec = "string", o365_url = "string", typ_aut_oauth = "number", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsoapDtoTypeLengths { ixs_oap = 12, nazev = 100, tenant_id = 254, clie_id = 254, cl_sec = 254, o365_url = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinspsoDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginspso*/
	interface GGinspsoDto {
		/**DBCOLUMN:ginspso.stat*/
		stat?: number|null;
		/**DBCOLUMN:ginspso.psc*/
		psc?: string|null;
		/**DBCOLUMN:ginspso.obec*/
		obec?: string|null;
		/**DBCOLUMN:Seznam.obec_kod*/
		obec_kod?: number|null;
		/**DBCOLUMN:ginspso.id_okres*/
		id_okres?: string|null;
		/**DBCOLUMN:ginspso.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginspso.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:ginspso.okres_txt*/
		okres_txt?: string|null;
	}
	const enum GGinspsoDtoNames { stat = "stat", psc = "psc", obec = "obec", obec_kod = "obec_kod", id_okres = "id_okres", aktivita = "aktivita", cast_obce = "cast_obce", okres_txt = "okres_txt",}
	const enum GGinspsoDtoFragments { stat = "*", psc = "*", obec = "*", obec_kod = "*", id_okres = "*", aktivita = "*", cast_obce = "*", okres_txt = "*",}
	const enum GGinspsoDtoTypes { stat = "number", psc = "string", obec = "string", obec_kod = "number", id_okres = "string", aktivita = "number", cast_obce = "string", okres_txt = "string",}
	const enum GGinspsoDtoTypeLengths { psc = 12, obec = 48, id_okres = 6, cast_obce = 48, okres_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinsskrDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginsskr*/
	interface GGinsskrDto {
		/**ID skartačního režimu*/
		ixs_skr?: string|null;
		/**DBCOLUMN:ginsskr.ixs_spu*/
		ixs_spu?: string|null;
		/**DBCOLUMN:ginsskr.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsskr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsskr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsskr.komentar*/
		komentar?: string|null;
		/**DBCOLUMN:ginsskr.oduvodneni*/
		oduvodneni?: string|null;
		/**DBCOLUMN:ginsskr.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:ginsskr.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:ginsskr.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsskr.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsskr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsskr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsskr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsskr.kontrolni_lhuta*/
		kontrolni_lhuta?: number|null;
		/**DBCOLUMN:ginsskr.rok_vyrazeni*/
		rok_vyrazeni?: number|null;
	}
	const enum GGinsskrDtoNames { ixs_skr = "ixs_skr", ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", komentar = "komentar", oduvodneni = "oduvodneni", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrolni_lhuta = "kontrolni_lhuta", rok_vyrazeni = "rok_vyrazeni",}
	const enum GGinsskrDtoFragments { ixs_skr = "*", ixs_spu = "*", zkratka = "*", nazev = "*", poznamka = "*", komentar = "*", oduvodneni = "*", skar_znak = "*", skar_lhuta = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kontrolni_lhuta = "*", rok_vyrazeni = "*",}
	const enum GGinsskrDtoTypes { ixs_skr = "string", ixs_spu = "string", zkratka = "string", nazev = "string", poznamka = "string", komentar = "string", oduvodneni = "string", skar_znak = "string", skar_lhuta = "number", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kontrolni_lhuta = "number", rok_vyrazeni = "number",}
	const enum GGinsskrDtoTypeLengths { ixs_skr = 12, ixs_spu = 12, zkratka = 16, nazev = 100, poznamka = 254, komentar = 254, oduvodneni = 254, skar_znak = 2, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinsurlDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginsurl*/
	interface GGinsurlDto {
		/**DBCOLUMN:ginsurl.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsurl.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginsurl.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:ginsurl.url*/
		url?: string|null;
		/**DBCOLUMN:ginsurl.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsurl.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsurl.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsurl.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsurl.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGinsurlDtoNames { lic = "lic", faze = "faze", por_cislo = "por_cislo", url = "url", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsurlDtoFragments { lic = "*", faze = "*", por_cislo = "*", url = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsurlDtoTypes { lic = "string", faze = "string", por_cislo = "number", url = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsurlDtoTypeLengths { lic = 4, faze = 8, url = 254, nazev = 50, poznamka = 254, zmenu_prov = 12,}
	interface GSlgItemDto {
		faze?: string|null;
		description?: string|null;
		shortcut?: string|null;
		icon?: string|null;
		url?: string|null;
		license?: string|null;
	}
	const enum GSlgItemDtoNames { faze = "faze", description = "description", shortcut = "shortcut", icon = "icon", url = "url", license = "license",}
	const enum GSlgItemDtoFragments { faze = "*", description = "*", shortcut = "*", icon = "*", url = "*", license = "*",}
	const enum GSlgItemDtoTypes { faze = "string", description = "string", shortcut = "string", icon = "string", url = "string", license = "string",}
	const enum GSlgItemDtoTypeLengths { shortcut = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinsvskDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginsvsk*/
	interface GGinsvskDto {
		/**DBCOLUMN:ginsvsk.ixs_vsk*/
		ixs_vsk?: string|null;
		/**DBCOLUMN:ginsvsk.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsvsk.faze*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsvsk.por_cislo*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsvsk.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:ginsvsk.spis_znak_short*/
		spis_znak_short?: string|null;
		/**DBCOLUMN:ginsvsk.ixs_vsk_nad*/
		ixs_vsk_nad?: string|null;
		/**DBCOLUMN:ginsvsk.ixs_vsk_next*/
		ixs_vsk_next?: string|null;
		/**DBCOLUMN:ginsvsk.ixs_skr*/
		ixs_skr?: string|null;
		/**DBCOLUMN:ginsvsk.urceni_spis_z*/
		urceni_spis_z?: number|null;
		/**DBCOLUMN:ginsvsk.priz_poz_skar*/
		priz_poz_skar?: number|null;
		/**DBCOLUMN:ginsvsk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsvsk.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsvsk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsvsk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsvsk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsvsk.priz_vazba_fun*/
		priz_vazba_fun?: number|null;
		/**aktivita v ginvvsk*/
		aktivita_vvsk?: number|null;
		/**aktivita v ginvvsr*/
		aktivita_vvsr?: number|null;
		/**DBCOLUMN:ginsvsk.cs2_spis_znak*/
		cs2_spis_znak?: string|null;
		/**DBCOLUMN:ginsvsk.cs2_spis_znak_shor*/
		cs2_spis_znak_shor?: string|null;
		/**DBCOLUMN:ginsskr.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:ginsskr.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:ginsspu.nazev_spu*/
		nazev_spu?: string|null;
		/**DBCOLUMN:ginsvsk.obd_vsk*/
		obd_vsk?: number|null;
		/**DBCOLUMN:ginsvsk.pocet_obd_vsk*/
		pocet_obd_vsk?: number|null;
		/**VskUserPermission*/
		VskUserPermission?: number|null;
	}
	const enum GGinsvskDtoNames { ixs_vsk = "ixs_vsk", ico = "ico", dat_od = "dat_od", dat_do = "dat_do", spis_znak = "spis_znak", spis_znak_short = "spis_znak_short", ixs_vsk_nad = "ixs_vsk_nad", ixs_vsk_next = "ixs_vsk_next", ixs_skr = "ixs_skr", urceni_spis_z = "urceni_spis_z", priz_poz_skar = "priz_poz_skar", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_vazba_fun = "priz_vazba_fun", aktivita_vvsk = "aktivita_vvsk", aktivita_vvsr = "aktivita_vvsr", cs2_spis_znak = "cs2_spis_znak", cs2_spis_znak_shor = "cs2_spis_znak_shor", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev_spu = "nazev_spu", obd_vsk = "obd_vsk", pocet_obd_vsk = "pocet_obd_vsk", VskUserPermission = "VskUserPermission",}
	const enum GGinsvskDtoFragments { ixs_vsk = "*", ico = "*", dat_od = "*", dat_do = "*", spis_znak = "*", spis_znak_short = "*", ixs_vsk_nad = "*", ixs_vsk_next = "*", ixs_skr = "*", urceni_spis_z = "*", priz_poz_skar = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_vazba_fun = "*", aktivita_vvsk = "*", aktivita_vvsr = "*", cs2_spis_znak = "*", cs2_spis_znak_shor = "*", skar_znak = "*", skar_lhuta = "*", nazev_spu = "*", obd_vsk = "*", pocet_obd_vsk = "*", VskUserPermission = "*",}
	const enum GGinsvskDtoTypes { ixs_vsk = "string", ico = "string", dat_od = "JsonDate", dat_do = "JsonDate", spis_znak = "string", spis_znak_short = "string", ixs_vsk_nad = "string", ixs_vsk_next = "string", ixs_skr = "string", urceni_spis_z = "number", priz_poz_skar = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_vazba_fun = "number", aktivita_vvsk = "number", aktivita_vvsr = "number", cs2_spis_znak = "string", cs2_spis_znak_shor = "string", skar_znak = "string", skar_lhuta = "number", nazev_spu = "string", obd_vsk = "number", pocet_obd_vsk = "number", VskUserPermission = "number",}
	const enum GGinsvskDtoTypeLengths { ixs_vsk = 12, ico = 10, spis_znak = 254, spis_znak_short = 50, ixs_vsk_nad = 12, ixs_vsk_next = 12, ixs_skr = 12, nazev = 100, poznamka = 254, zmenu_prov = 12, cs2_spis_znak = 254, cs2_spis_znak_shor = 254, skar_znak = 2, nazev_spu = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GGinvpsuDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Ginvpsu*/
	interface GGinvpsuDto {
		/**DBCOLUMN:Ginvpsu.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:Ginvpsu.cj_ext*/
		cj_ext?: string|null;
		/**DBCOLUMN:Ginvpsu.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Ginvpsu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ginvpsu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ginvpsu.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGinvpsuDtoNames { ixs_su = "ixs_su", cj_ext = "cj_ext", k_v = "k_v", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvpsuDtoFragments { ixs_su = "*", cj_ext = "*", k_v = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvpsuDtoTypes { ixs_su = "string", cj_ext = "string", k_v = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvpsuDtoTypeLengths { ixs_su = 12, cj_ext = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GModuleDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO pro načtení informací o modulu.*/
	interface GModuleDto {
		/**Název modulu.*/
		faze?: string|null;
		/**Popis modulu.*/
		description?: string|null;
		/**URL modulu.*/
		url?: string|null;
		/**Název instance modulu daný uživatelem.*/
		namedByUser?: string|null;
	}
	const enum GModuleDtoNames { faze = "faze", description = "description", url = "url", namedByUser = "namedByUser",}
	const enum GModuleDtoFragments { faze = "*", description = "*", url = "*", namedByUser = "*",}
	const enum GModuleDtoTypes { faze = "string", description = "string", url = "string", namedByUser = "string",}
	const enum GModuleDtoTypeLengths {}
	/**Filtr pro GModule*/
	const enum GModuleFilterEnum {
		faze,
		description,
		url,
		namedByUser,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGincaktDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:gincakt*/
	interface GReaderGincaktDto {
		/**DBCOLUMN:gincakt.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincakt.aktivita_txt - Aktivita textově*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:gincakt.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:gincakt.aktivita_rsx - ID lokalizačního textu*/
		aktivita_rsx?: number|null;
	}
	const enum GReaderGincaktDtoNames { aktivita = "aktivita", aktivita_txt = "aktivita_txt", k_v = "k_v", aktivita_rsx = "aktivita_rsx",}
	const enum GReaderGincaktDtoFragments { aktivita = "*", aktivita_txt = "*", k_v = "*", aktivita_rsx = "*",}
	const enum GReaderGincaktDtoTypes { aktivita = "number", aktivita_txt = "string", k_v = "number", aktivita_rsx = "number",}
	const enum GReaderGincaktDtoTypeLengths { aktivita_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGincblaDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:gincbla*/
	interface GReaderGincblaDto {
		/**DBCOLUMN:gincbla.priz_blg_all - Příznak přístupnosti*/
		priz_blg_all?: number|null;
		/**DBCOLUMN:gincbla.priz_blg_all_txt - Textový název přístupnosti*/
		priz_blg_all_txt?: string|null;
		/**DBCOLUMN:gincbla.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:gincbla.k_s - Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
		/**DBCOLUMN:gincbla.k_xml -*/
		k_xml?: string|null;
		/**DBCOLUMN:gincbla.priz_blg_all_rsx -*/
		priz_blg_all_rsx?: number|null;
	}
	const enum GReaderGincblaDtoNames { priz_blg_all = "priz_blg_all", priz_blg_all_txt = "priz_blg_all_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priz_blg_all_rsx = "priz_blg_all_rsx",}
	const enum GReaderGincblaDtoFragments { priz_blg_all = "*", priz_blg_all_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priz_blg_all_rsx = "*",}
	const enum GReaderGincblaDtoTypes { priz_blg_all = "number", priz_blg_all_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priz_blg_all_rsx = "number",}
	const enum GReaderGincblaDtoTypeLengths { priz_blg_all_txt = 100, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGincpanDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - ano/ne*/
	interface GReaderGincpanDto {
		/**Autogenerated.*/
		priz_an?: number|null;
		/**Autogenerated.*/
		priz_an_txt?: string|null;
		/**Autogenerated.*/
		priz_an_c1?: string|null;
		/**Autogenerated.*/
		priz_an_rsx?: number|null;
	}
	const enum GReaderGincpanDtoNames { priz_an = "priz_an", priz_an_txt = "priz_an_txt", priz_an_c1 = "priz_an_c1", priz_an_rsx = "priz_an_rsx",}
	const enum GReaderGincpanDtoFragments { priz_an = "*", priz_an_txt = "*", priz_an_c1 = "*", priz_an_rsx = "*",}
	const enum GReaderGincpanDtoTypes { priz_an = "number", priz_an_txt = "string", priz_an_c1 = "string", priz_an_rsx = "number",}
	const enum GReaderGincpanDtoTypeLengths { priz_an_txt = 50, priz_an_c1 = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGincstuDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - Přístup / stupeň utajení*/
	interface GReaderGincstuDto {
		/**Autogenerated.*/
		st_utaj_id?: number|null;
		/**Autogenerated.*/
		st_utaj_id_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		zkratka?: string|null;
		/**Autogenerated.*/
		st_utaj_id_orig?: number|null;
		/**Autogenerated.*/
		rezim_nakl?: number|null;
		/**Autogenerated.*/
		stupen_utaj?: number|null;
		/**Autogenerated.*/
		st_utaj_id_rsx?: number|null;
	}
	const enum GReaderGincstuDtoNames { st_utaj_id = "st_utaj_id", st_utaj_id_txt = "st_utaj_id_txt", k_v = "k_v", aktivita = "aktivita", zkratka = "zkratka", st_utaj_id_orig = "st_utaj_id_orig", rezim_nakl = "rezim_nakl", stupen_utaj = "stupen_utaj", st_utaj_id_rsx = "st_utaj_id_rsx",}
	const enum GReaderGincstuDtoFragments { st_utaj_id = "*", st_utaj_id_txt = "*", k_v = "*", aktivita = "*", zkratka = "*", st_utaj_id_orig = "*", rezim_nakl = "*", stupen_utaj = "*", st_utaj_id_rsx = "*",}
	const enum GReaderGincstuDtoTypes { st_utaj_id = "number", st_utaj_id_txt = "string", k_v = "number", aktivita = "number", zkratka = "string", st_utaj_id_orig = "number", rezim_nakl = "number", stupen_utaj = "number", st_utaj_id_rsx = "number",}
	const enum GReaderGincstuDtoTypeLengths { st_utaj_id_txt = 50, zkratka = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGinctagDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - typ agendy*/
	interface GReaderGinctagDto {
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		typ_ag_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		typ_uct?: number|null;
		/**Autogenerated.*/
		zkr_ag?: string|null;
		/**Autogenerated.*/
		ktg_ag?: number|null;
		/**Autogenerated.*/
		priz_ext?: number|null;
		/**Autogenerated.*/
		priz_ekovago?: number|null;
	}
	const enum GReaderGinctagDtoNames { typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", k_v = "k_v", typ_uct = "typ_uct", zkr_ag = "zkr_ag", ktg_ag = "ktg_ag", priz_ext = "priz_ext", priz_ekovago = "priz_ekovago",}
	const enum GReaderGinctagDtoFragments { typ_ag = "*", typ_ag_txt = "*", k_v = "*", typ_uct = "*", zkr_ag = "*", ktg_ag = "*", priz_ext = "*", priz_ekovago = "*",}
	const enum GReaderGinctagDtoTypes { typ_ag = "number", typ_ag_txt = "string", k_v = "number", typ_uct = "number", zkr_ag = "string", ktg_ag = "number", priz_ext = "number", priz_ekovago = "number",}
	const enum GReaderGinctagDtoTypeLengths { zkr_ag = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGinctpsDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginctps*/
	interface GReaderGinctpsDto {
		/**DBCOLUMN:ginctps.typ_prist_sfu - Oprávnění ke skupině*/
		typ_prist_sfu?: number|null;
		/**DBCOLUMN:ginctps.typ_prist_sfu_txt - Oprávnění ke skupině*/
		typ_prist_sfu_txt?: string|null;
	}
	const enum GReaderGinctpsDtoNames { typ_prist_sfu = "typ_prist_sfu", typ_prist_sfu_txt = "typ_prist_sfu_txt",}
	const enum GReaderGinctpsDtoFragments { typ_prist_sfu = "*", typ_prist_sfu_txt = "*",}
	const enum GReaderGinctpsDtoTypes { typ_prist_sfu = "number", typ_prist_sfu_txt = "string",}
	const enum GReaderGinctpsDtoTypeLengths { typ_prist_sfu_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGinsfunDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - funkční místo*/
	interface GReaderGinsfunDto {
		/**Autogenerated.*/
		ixs_fun?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		ixs_su?: string|null;
		/**Autogenerated.*/
		nazev_su?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		ixs_ref?: string|null;
		/**Autogenerated.*/
		nazev_ref?: string|null;
		/**Autogenerated.*/
		ixs_zmp?: string|null;
		/**Autogenerated.*/
		cs_nazev?: string|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		ixs_spi?: string|null;
		/**Autogenerated.*/
		nazev_spi?: string|null;
		/**Autogenerated.*/
		ixs_orj?: string|null;
		/**Autogenerated.*/
		nazev_orj?: string|null;
	}
	const enum GReaderGinsfunDtoNames { ixs_fun = "ixs_fun", aktivita = "aktivita", ixs_su = "ixs_su", nazev_su = "nazev_su", nazev = "nazev", ixs_ref = "ixs_ref", nazev_ref = "nazev_ref", ixs_zmp = "ixs_zmp", cs_nazev = "cs_nazev", nazev_rf = "nazev_rf", ixs_spi = "ixs_spi", nazev_spi = "nazev_spi", ixs_orj = "ixs_orj", nazev_orj = "nazev_orj",}
	const enum GReaderGinsfunDtoFragments { ixs_fun = "*", aktivita = "*", ixs_su = "*", nazev_su = "*", nazev = "*", ixs_ref = "*", nazev_ref = "*", ixs_zmp = "*", cs_nazev = "*", nazev_rf = "*", ixs_spi = "*", nazev_spi = "*", ixs_orj = "*", nazev_orj = "*",}
	const enum GReaderGinsfunDtoTypes { ixs_fun = "string", aktivita = "number", ixs_su = "string", nazev_su = "string", nazev = "string", ixs_ref = "string", nazev_ref = "string", ixs_zmp = "string", cs_nazev = "string", nazev_rf = "string", ixs_spi = "string", nazev_spi = "string", ixs_orj = "string", nazev_orj = "string",}
	const enum GReaderGinsfunDtoTypeLengths { ixs_fun = 12, ixs_su = 12, nazev_su = 25, nazev = 25, ixs_ref = 12, nazev_ref = 200, ixs_zmp = 12, cs_nazev = 25, nazev_rf = 200, ixs_spi = 12, nazev_spi = 50, ixs_orj = 12, nazev_orj = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGinsicoDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginsico*/
	interface GReaderGinsicoDto {
		/**DBCOLUMN:ginsico.ico - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**DBCOLUMN:ginsico.nazev - Název subjektu*/
		nazev?: string|null;
		/**DBCOLUMN:ginsico.ixs_isu - Interní subjekt*/
		ixs_isu?: string|null;
		/**DBCOLUMN:ginsico.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GReaderGinsicoDtoNames { ico = "ico", nazev = "nazev", ixs_isu = "ixs_isu", aktivita = "aktivita",}
	const enum GReaderGinsicoDtoFragments { ico = "*", nazev = "*", ixs_isu = "*", aktivita = "*",}
	const enum GReaderGinsicoDtoTypes { ico = "string", nazev = "string", ixs_isu = "string", aktivita = "number",}
	const enum GReaderGinsicoDtoTypeLengths { ico = 10, nazev = 100, ixs_isu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGinspodDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - spisový uzel*/
	interface GReaderGinspodDto {
		/**Autogenerated.*/
		ixs_su?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		zkratka?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		ofic_nazev?: string|null;
		/**Autogenerated.*/
		cs_nazev?: string|null;
	}
	const enum GReaderGinspodDtoNames { ixs_su = "ixs_su", aktivita = "aktivita", poznamka = "poznamka", zkratka = "zkratka", nazev = "nazev", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev",}
	const enum GReaderGinspodDtoFragments { ixs_su = "*", aktivita = "*", poznamka = "*", zkratka = "*", nazev = "*", ofic_nazev = "*", cs_nazev = "*",}
	const enum GReaderGinspodDtoTypes { ixs_su = "string", aktivita = "number", poznamka = "string", zkratka = "string", nazev = "string", ofic_nazev = "string", cs_nazev = "string",}
	const enum GReaderGinspodDtoTypeLengths { ixs_su = 12, poznamka = 254, zkratka = 16, nazev = 25, ofic_nazev = 100, cs_nazev = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Gin\Dto\GReaderGinstreDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:ginstre*/
	interface GReaderGinstreDto {
		/**DBCOLUMN:ginstre.ixs_tre - Středisko spisových uzlů*/
		ixs_tre?: string|null;
		/**DBCOLUMN:ginstre.zkratka - Zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginstre.nazev - Název*/
		nazev?: string|null;
		/**DBCOLUMN:ginstre.poznamka - Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginstre.dat_od - Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginstre.dat_do - Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginstre.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginstre.dat_zmena - Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginstre.zmenu_prov - Změnil*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginstre.ixs_lpc - ID přihlášení*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginstre.ixs_isu - Inetrní subjekt*/
		ixs_isu?: string|null;
		/**DBCOLUMN:ginstre.spis_pl - Spisový plán*/
		spis_pl?: string|null;
		/**DBCOLUMN:ginstre.spis_znak - Spisový znak pro Ad acta*/
		spis_znak?: string|null;
		/**DBCOLUMN:ginstre.spis_znak_spis - Spisový znak pro spisy*/
		spis_znak_spis?: string|null;
		/**DBCOLUMN:ginstre.spis_znak_kopie - Spisový znak pro kopie*/
		spis_znak_kopie?: string|null;
		/**DBCOLUMN:ginstre.ixs_su_pod - Spisový uzel pro MAS*/
		ixs_su_pod?: string|null;
		/**DBCOLUMN:ginstre.ixs_fun_pod - Pracovník pro MAS*/
		ixs_fun_pod?: string|null;
		/**DBCOLUMN:ginstre.spis_graf - Spisový graf*/
		spis_graf?: string|null;
		/**DBCOLUMN:ginstre.spis_graf_v - Výpravní graf*/
		spis_graf_v?: string|null;
		/**DBCOLUMN:ginstre.ico - IČO*/
		ico?: string|null;
		/**DBCOLUMN:ginstre.ixs_ext_ess - Externí systém*/
		ixs_ext_ess?: string|null;
	}
	const enum GReaderGinstreDtoNames { ixs_tre = "ixs_tre", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", ixs_isu = "ixs_isu", spis_pl = "spis_pl", spis_znak = "spis_znak", spis_znak_spis = "spis_znak_spis", spis_znak_kopie = "spis_znak_kopie", ixs_su_pod = "ixs_su_pod", ixs_fun_pod = "ixs_fun_pod", spis_graf = "spis_graf", spis_graf_v = "spis_graf_v", ico = "ico", ixs_ext_ess = "ixs_ext_ess",}
	const enum GReaderGinstreDtoFragments { ixs_tre = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", ixs_isu = "*", spis_pl = "*", spis_znak = "*", spis_znak_spis = "*", spis_znak_kopie = "*", ixs_su_pod = "*", ixs_fun_pod = "*", spis_graf = "*", spis_graf_v = "*", ico = "*", ixs_ext_ess = "*",}
	const enum GReaderGinstreDtoTypes { ixs_tre = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", ixs_isu = "string", spis_pl = "string", spis_znak = "string", spis_znak_spis = "string", spis_znak_kopie = "string", ixs_su_pod = "string", ixs_fun_pod = "string", spis_graf = "string", spis_graf_v = "string", ico = "string", ixs_ext_ess = "string",}
	const enum GReaderGinstreDtoTypeLengths { ixs_tre = 12, zkratka = 16, nazev = 50, poznamka = 254, zmenu_prov = 12, ixs_lpc = 12, ixs_isu = 12, spis_pl = 5, spis_znak = 50, spis_znak_spis = 50, spis_znak_kopie = 50, ixs_su_pod = 12, ixs_fun_pod = 12, spis_graf = 10, spis_graf_v = 10, ico = 10, ixs_ext_ess = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Maj\IGReaderMajcppr.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	const enum GReaderFilterMajcppr {
		/**Příznak prodejnosti majetku dané skupiny, druhu*/
		s_prodej,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Maj\Dto\GReaderMajcpprDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:majcppr*/
	interface GReaderMajcpprDto {
		/**DBCOLUMN:majcppr.s_prodej - Příznak prodejnosti majetku dané skupiny, druhu*/
		s_prodej?: number|null;
		/**DBCOLUMN:majcppr.s_prodej_txt -*/
		s_prodej_txt?: string|null;
		/**DBCOLUMN:majcppr.s_prodej_zkr -*/
		s_prodej_zkr?: string|null;
		/**DBCOLUMN:majcppr.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:majcppr.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderMajcpprDtoNames { s_prodej = "s_prodej", s_prodej_txt = "s_prodej_txt", s_prodej_zkr = "s_prodej_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderMajcpprDtoFragments { s_prodej = "*", s_prodej_txt = "*", s_prodej_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderMajcpprDtoTypes { s_prodej = "number", s_prodej_txt = "string", s_prodej_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderMajcpprDtoTypeLengths { s_prodej_txt = 50, s_prodej_zkr = 16, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Spi\DataSet\GSpisspi.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Seznam*/
	interface GSpisspiDto {
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:Seznam.typ_spi*/
		typ_spi?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.typ_spi_txt*/
		typ_spi_txt?: string|null;
	}
	const enum GSpisspiDtoNames { ixs_spi = "ixs_spi", zkratka = "zkratka", ixs_su = "ixs_su", typ_spi = "typ_spi", nazev = "nazev", aktivita = "aktivita", typ_spi_txt = "typ_spi_txt",}
	const enum GSpisspiDtoFragments { ixs_spi = "*", zkratka = "*", ixs_su = "*", typ_spi = "*", nazev = "*", aktivita = "*", typ_spi_txt = "*",}
	const enum GSpisspiDtoTypes { ixs_spi = "string", zkratka = "string", ixs_su = "string", typ_spi = "number", nazev = "string", aktivita = "number", typ_spi_txt = "string",}
	const enum GSpisspiDtoTypeLengths { ixs_spi = 12, zkratka = 5, ixs_su = 12, nazev = 50, typ_spi_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\DataSet\GSslstyp.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Seznam*/
	interface GSslstypDto {
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
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
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.st_utaj_id_txt*/
		st_utaj_id_txt?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.st_utaj_id*/
		st_utaj_id?: number|null;
		/**DBCOLUMN:Seznam.lhuta_vyr*/
		lhuta_vyr?: number|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulz*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:Seznam.aktivita_ssl*/
		aktivita_ssl?: number|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.s_gen_cj*/
		s_gen_cj?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.priz_rsp*/
		priz_rsp?: number|null;
		/**DBCOLUMN:Seznam.szr_agenda_count*/
		szr_agenda_count?: number|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.zakon_duvod_gdpr*/
		zakon_duvod_gdpr?: string|null;
		/**DBCOLUMN:Seznam.ixs_frm_gform*/
		ixs_frm_gform?: string|null;
		/**DBCOLUMN:Seznam.ixp_sablony*/
		ixp_sablony?: string|null;
		/**DBCOLUMN:Seznam.ixs_fsk*/
		ixs_fsk?: string|null;
		/**DBCOLUMN:Seznam.id_ext_alt*/
		id_ext_alt?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_dd*/
		priz_dd?: number|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev_spu*/
		nazev_spu?: string|null;
		/**DBCOLUMN:Seznam.ktg_spu*/
		ktg_spu?: number|null;
		/**DBCOLUMN:Seznam.ixs_skr*/
		ixs_skr?: string|null;
	}
	const enum GSslstypDtoNames { ixs_typ = "ixs_typ", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", st_utaj_id_txt = "st_utaj_id_txt", ktg_typ = "ktg_typ", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", priz_rsp = "priz_rsp", szr_agenda_count = "szr_agenda_count", popis = "popis", zakon_duvod_gdpr = "zakon_duvod_gdpr", ixs_frm_gform = "ixs_frm_gform", ixp_sablony = "ixp_sablony", ixs_fsk = "ixs_fsk", id_ext_alt = "id_ext_alt", ktg_typ_txt = "ktg_typ_txt", priz_dd = "priz_dd", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev_spu = "nazev_spu", ktg_spu = "ktg_spu", ixs_skr = "ixs_skr",}
	const enum GSslstypDtoFragments { ixs_typ = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", st_utaj_id_txt = "*", ktg_typ = "*", st_utaj_id = "*", lhuta_vyr = "*", zkratka = "*", ixs_ulz = "*", aktivita_ssl = "*", spis_pl = "*", spis_znak = "*", s_gen_cj = "*", ixs_esu = "*", priz_rsp = "*", szr_agenda_count = "*", popis = "*", zakon_duvod_gdpr = "*", ixs_frm_gform = "*", ixp_sablony = "*", ixs_fsk = "*", id_ext_alt = "*", ktg_typ_txt = "*", priz_dd = "*", skar_znak = "*", skar_lhuta = "*", nazev_spu = "*", ktg_spu = "*", ixs_skr = "*",}
	const enum GSslstypDtoTypes { ixs_typ = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", st_utaj_id_txt = "string", ktg_typ = "number", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", s_gen_cj = "number", ixs_esu = "string", priz_rsp = "number", szr_agenda_count = "number", popis = "string", zakon_duvod_gdpr = "string", ixs_frm_gform = "string", ixp_sablony = "string", ixs_fsk = "string", id_ext_alt = "string", ktg_typ_txt = "string", priz_dd = "number", skar_znak = "string", skar_lhuta = "number", nazev_spu = "string", ktg_spu = "number", ixs_skr = "string",}
	const enum GSslstypDtoTypeLengths { ixs_typ = 12, poznamka = 50, zmenu_prov = 12, nazev = 50, st_utaj_id_txt = 50, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ixs_esu = 12, popis = 254, zakon_duvod_gdpr = 1000, ixs_frm_gform = 12, ixp_sablony = 12, ixs_fsk = 12, id_ext_alt = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslcpdtDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:sslcpdt*/
	interface GReaderSslcpdtDto {
		/**DBCOLUMN:sslcpdt.priz_den_ts - Příznak deníku typových spisů*/
		priz_den_ts?: number|null;
		/**DBCOLUMN:sslcpdt.priz_den_ts_txt - popis*/
		priz_den_ts_txt?: string|null;
	}
	const enum GReaderSslcpdtDtoNames { priz_den_ts = "priz_den_ts", priz_den_ts_txt = "priz_den_ts_txt",}
	const enum GReaderSslcpdtDtoFragments { priz_den_ts = "*", priz_den_ts_txt = "*",}
	const enum GReaderSslcpdtDtoTypes { priz_den_ts = "number", priz_den_ts_txt = "string",}
	const enum GReaderSslcpdtDtoTypeLengths { priz_den_ts_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslcspiDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - Stav spisu*/
	interface GReaderSslcspiDto {
		/**Číselná hodnota*/
		stav_spis?: number|null;
		/**Textový popis*/
		stav_spis_txt?: string|null;
	}
	const enum GReaderSslcspiDtoNames { stav_spis = "stav_spis", stav_spis_txt = "stav_spis_txt",}
	const enum GReaderSslcspiDtoFragments { stav_spis = "*", stav_spis_txt = "*",}
	const enum GReaderSslcspiDtoTypes { stav_spis = "number", stav_spis_txt = "string",}
	const enum GReaderSslcspiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslctvyDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - typ vyřízení*/
	interface GReaderSslctvyDto {
		/**Autogenerated.*/
		typ_vyriz?: number|null;
		/**Autogenerated.*/
		typ_vyriz_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		typ_vyriz_rsx?: number|null;
	}
	const enum GReaderSslctvyDtoNames { typ_vyriz = "typ_vyriz", typ_vyriz_txt = "typ_vyriz_txt", k_v = "k_v", typ_vyriz_rsx = "typ_vyriz_rsx",}
	const enum GReaderSslctvyDtoFragments { typ_vyriz = "*", typ_vyriz_txt = "*", k_v = "*", typ_vyriz_rsx = "*",}
	const enum GReaderSslctvyDtoTypes { typ_vyriz = "number", typ_vyriz_txt = "string", k_v = "number", typ_vyriz_rsx = "number",}
	const enum GReaderSslctvyDtoTypeLengths { typ_vyriz_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslcvspDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - vztah ke spisu*/
	interface GReaderSslcvspDto {
		/**Autogenerated.*/
		vztah_spis?: number|null;
		/**Autogenerated.*/
		vztah_spis_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
	}
	const enum GReaderSslcvspDtoNames { vztah_spis = "vztah_spis", vztah_spis_txt = "vztah_spis_txt", k_v = "k_v",}
	const enum GReaderSslcvspDtoFragments { vztah_spis = "*", vztah_spis_txt = "*", k_v = "*",}
	const enum GReaderSslcvspDtoTypes { vztah_spis = "number", vztah_spis_txt = "string", k_v = "number",}
	const enum GReaderSslcvspDtoTypeLengths { vztah_spis_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslsspzDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - spisový znak*/
	interface GReaderSslsspzDto {
		/**Autogenerated.*/
		spis_pl?: string|null;
		/**Autogenerated.*/
		spis_znak?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		skar_znak?: string|null;
		/**Autogenerated.*/
		skar_lhuta?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		cs2_spis_znak?: string|null;
		/**Autogenerated.*/
		skar_lhuta_spra?: number|null;
		/**Autogenerated.*/
		skar_znak_zkr?: string|null;
		/**Autogenerated.*/
		spis_znak_nad?: string|null;
		/**Autogenerated.*/
		num_pod?: number|null;
		/**Autogenerated.*/
		skar_lhuta_txt?: string|null;
		/**Autogenerated.*/
		spis_plan_spis_znak?: string|null;
		/**Autogenerated.*/
		ixs_spu?: string|null;
		/**Autogenerated.*/
		typ_spis_z?: number|null;
		/**Autogenerated.*/
		spis_znak_comma?: string|null;
	}
	const enum GReaderSslsspzDtoNames { spis_pl = "spis_pl", spis_znak = "spis_znak", aktivita = "aktivita", nazev = "nazev", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", poznamka = "poznamka", popis = "popis", cs2_spis_znak = "cs2_spis_znak", skar_lhuta_spra = "skar_lhuta_spra", skar_znak_zkr = "skar_znak_zkr", spis_znak_nad = "spis_znak_nad", num_pod = "num_pod", skar_lhuta_txt = "skar_lhuta_txt", spis_plan_spis_znak = "spis_plan_spis_znak", ixs_spu = "ixs_spu", typ_spis_z = "typ_spis_z", spis_znak_comma = "spis_znak_comma",}
	const enum GReaderSslsspzDtoFragments { spis_pl = "*", spis_znak = "*", aktivita = "*", nazev = "*", skar_znak = "*", skar_lhuta = "*", poznamka = "*", popis = "*", cs2_spis_znak = "*", skar_lhuta_spra = "*", skar_znak_zkr = "*", spis_znak_nad = "*", num_pod = "*", skar_lhuta_txt = "*", spis_plan_spis_znak = "*", ixs_spu = "*", typ_spis_z = "*", spis_znak_comma = "*",}
	const enum GReaderSslsspzDtoTypes { spis_pl = "string", spis_znak = "string", aktivita = "number", nazev = "string", skar_znak = "string", skar_lhuta = "number", poznamka = "string", popis = "string", cs2_spis_znak = "string", skar_lhuta_spra = "number", skar_znak_zkr = "string", spis_znak_nad = "string", num_pod = "number", skar_lhuta_txt = "string", spis_plan_spis_znak = "string", ixs_spu = "string", typ_spis_z = "number", spis_znak_comma = "string",}
	const enum GReaderSslsspzDtoTypeLengths { spis_pl = 5, spis_znak = 50, nazev = 100, skar_znak = 2, popis = 254, cs2_spis_znak = 254, skar_znak_zkr = 2, spis_znak_nad = 50, spis_plan_spis_znak = 55, ixs_spu = 12, spis_znak_comma = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslstypDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - typ písemnosti*/
	interface GReaderSslstypDto {
		/**Autogenerated.*/
		ixs_typ?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		arw?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_do?: JsonDate|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		st_utaj_id_txt?: string|null;
		/**Autogenerated.*/
		ktg_typ?: number|null;
		/**Autogenerated.*/
		st_utaj_id?: number|null;
		/**Autogenerated.*/
		lhuta_vyr?: number|null;
		/**Autogenerated.*/
		zkratka?: string|null;
		/**Autogenerated.*/
		ixs_ulz?: string|null;
		/**Autogenerated.*/
		aktivita_ssl?: number|null;
		/**Autogenerated.*/
		spis_pl?: string|null;
		/**Autogenerated.*/
		spis_znak?: string|null;
		/**Autogenerated.*/
		s_gen_cj?: number|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		priz_rsp?: number|null;
		/**Autogenerated.*/
		szr_agenda_count?: number|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		zakon_duvod_gdpr?: string|null;
		/**Autogenerated.*/
		ixs_frm_gform?: string|null;
		/**Autogenerated.*/
		ixp_sablony?: string|null;
		/**Autogenerated.*/
		ixs_fsk?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_dd*/
		priz_dd?: number|null;
	}
	const enum GReaderSslstypDtoNames { ixs_typ = "ixs_typ", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", st_utaj_id_txt = "st_utaj_id_txt", ktg_typ = "ktg_typ", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", priz_rsp = "priz_rsp", szr_agenda_count = "szr_agenda_count", popis = "popis", zakon_duvod_gdpr = "zakon_duvod_gdpr", ixs_frm_gform = "ixs_frm_gform", ixp_sablony = "ixp_sablony", ixs_fsk = "ixs_fsk", ktg_typ_txt = "ktg_typ_txt", priz_dd = "priz_dd",}
	const enum GReaderSslstypDtoFragments { ixs_typ = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", st_utaj_id_txt = "*", ktg_typ = "*", st_utaj_id = "*", lhuta_vyr = "*", zkratka = "*", ixs_ulz = "*", aktivita_ssl = "*", spis_pl = "*", spis_znak = "*", s_gen_cj = "*", ixs_esu = "*", priz_rsp = "*", szr_agenda_count = "*", popis = "*", zakon_duvod_gdpr = "*", ixs_frm_gform = "*", ixp_sablony = "*", ixs_fsk = "*", ktg_typ_txt = "*", priz_dd = "*",}
	const enum GReaderSslstypDtoTypes { ixs_typ = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", st_utaj_id_txt = "string", ktg_typ = "number", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", s_gen_cj = "number", ixs_esu = "string", priz_rsp = "number", szr_agenda_count = "number", popis = "string", zakon_duvod_gdpr = "string", ixs_frm_gform = "string", ixp_sablony = "string", ixs_fsk = "string", ktg_typ_txt = "string", priz_dd = "number",}
	const enum GReaderSslstypDtoTypeLengths { ixs_typ = 12, poznamka = 50, zmenu_prov = 12, nazev = 50, st_utaj_id_txt = 50, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ixs_esu = 12, popis = 254, zakon_duvod_gdpr = 1000, ixs_frm_gform = 12, ixp_sablony = 12, ixs_fsk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslsumiDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - umístění*/
	interface GReaderSslsumiDto {
		/**Autogenerated.*/
		ixs_su?: string|null;
		/**Autogenerated.*/
		umisteni?: string|null;
		/**Autogenerated.*/
		umisteni_nad?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		umisteni_txt?: string|null;
		/**Autogenerated.*/
		priz_oper?: number|null;
		/**Autogenerated.*/
		ixs_fun_zodp?: string|null;
	}
	const enum GReaderSslsumiDtoNames { ixs_su = "ixs_su", umisteni = "umisteni", umisteni_nad = "umisteni_nad", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", umisteni_txt = "umisteni_txt", priz_oper = "priz_oper", ixs_fun_zodp = "ixs_fun_zodp",}
	const enum GReaderSslsumiDtoFragments { ixs_su = "*", umisteni = "*", umisteni_nad = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", umisteni_txt = "*", priz_oper = "*", ixs_fun_zodp = "*",}
	const enum GReaderSslsumiDtoTypes { ixs_su = "string", umisteni = "string", umisteni_nad = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", umisteni_txt = "string", priz_oper = "number", ixs_fun_zodp = "string",}
	const enum GReaderSslsumiDtoTypeLengths { ixs_su = 12, umisteni = 20, umisteni_nad = 20, poznamka = 254, zmenu_prov = 12, umisteni_txt = 50, ixs_fun_zodp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Ssl\Dto\GReaderSslszvsDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - způsob vyřízení spisu*/
	interface GReaderSslszvsDto {
		/**Autogenerated.*/
		zp_vyriz?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		zp_vyriz_txt?: string|null;
		/**Autogenerated.*/
		priz_cj_only?: number|null;
	}
	const enum GReaderSslszvsDtoNames { zp_vyriz = "zp_vyriz", aktivita = "aktivita", zp_vyriz_txt = "zp_vyriz_txt", priz_cj_only = "priz_cj_only",}
	const enum GReaderSslszvsDtoFragments { zp_vyriz = "*", aktivita = "*", zp_vyriz_txt = "*", priz_cj_only = "*",}
	const enum GReaderSslszvsDtoTypes { zp_vyriz = "string", aktivita = "number", zp_vyriz_txt = "string", priz_cj_only = "number",}
	const enum GReaderSslszvsDtoTypeLengths { zp_vyriz = 15, zp_vyriz_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\DataSet\GWflcfor.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Seznam*/
	interface GWflcforDto {
		/**DBCOLUMN:Seznam.forma_prilohy*/
		forma_prilohy?: number|null;
		/**DBCOLUMN:Seznam.forma_prilohy_txt*/
		forma_prilohy_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.typ_prilohy*/
		typ_prilohy?: number|null;
	}
	const enum GWflcforDtoNames { forma_prilohy = "forma_prilohy", forma_prilohy_txt = "forma_prilohy_txt", k_v = "k_v", typ_prilohy = "typ_prilohy",}
	const enum GWflcforDtoFragments { forma_prilohy = "*", forma_prilohy_txt = "*", k_v = "*", typ_prilohy = "*",}
	const enum GWflcforDtoTypes { forma_prilohy = "number", forma_prilohy_txt = "string", k_v = "number", typ_prilohy = "number",}
	const enum GWflcforDtoTypeLengths { forma_prilohy_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\DataSet\GWflcktp.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Seznam*/
	interface GWflcktpDto {
		/**DBCOLUMN:Seznam.ktg_typ_pri*/
		ktg_typ_pri?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ_pri_txt*/
		ktg_typ_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ_pri_rsx*/
		ktg_typ_pri_rsx?: number|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
	}
	const enum GWflcktpDtoNames { ktg_typ_pri = "ktg_typ_pri", ktg_typ_pri_txt = "ktg_typ_pri_txt", ktg_typ_pri_rsx = "ktg_typ_pri_rsx", k_v = "k_v", aktivita = "aktivita",}
	const enum GWflcktpDtoFragments { ktg_typ_pri = "*", ktg_typ_pri_txt = "*", ktg_typ_pri_rsx = "*", k_v = "*", aktivita = "*",}
	const enum GWflcktpDtoTypes { ktg_typ_pri = "number", ktg_typ_pri_txt = "string", ktg_typ_pri_rsx = "number", k_v = "number", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum",}
	const enum GWflcktpDtoTypeLengths { ktg_typ_pri_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\DataSet\Wflcprt.Dto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:Seznam*/
	interface GWflcprtDto {
		/**DBCOLUMN:Seznam.typ_prilohy*/
		typ_prilohy?: number|null;
		/**DBCOLUMN:Seznam.typ_prilohy_txt*/
		typ_prilohy_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
	}
	const enum GWflcprtDtoNames { typ_prilohy = "typ_prilohy", typ_prilohy_txt = "typ_prilohy_txt", k_v = "k_v",}
	const enum GWflcprtDtoFragments { typ_prilohy = "*", typ_prilohy_txt = "*", k_v = "*",}
	const enum GWflcprtDtoTypes { typ_prilohy = "number", typ_prilohy_txt = "string", k_v = "number",}
	const enum GWflcprtDtoTypeLengths { typ_prilohy_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcdrzDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - Druh zásilky*/
	interface GReaderWflcdrzDto {
		/**Autogenerated.*/
		druh_zas?: number|null;
		/**Autogenerated.*/
		druh_zas_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		k_xml?: string|null;
		/**Autogenerated.*/
		druh_zas_zkr?: string|null;
		/**Autogenerated.*/
		priz_zahr?: number|null;
		/**Autogenerated.*/
		priz_doruc?: number|null;
		/**Autogenerated.*/
		filtr_format?: string|null;
		/**Autogenerated.*/
		povol_sl?: string|null;
		/**Autogenerated.*/
		druh_zas_rsx?: number|null;
	}
	const enum GReaderWflcdrzDtoNames { druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", k_v = "k_v", aktivita = "aktivita", k_xml = "k_xml", druh_zas_zkr = "druh_zas_zkr", priz_zahr = "priz_zahr", priz_doruc = "priz_doruc", filtr_format = "filtr_format", povol_sl = "povol_sl", druh_zas_rsx = "druh_zas_rsx",}
	const enum GReaderWflcdrzDtoFragments { druh_zas = "*", druh_zas_txt = "*", k_v = "*", aktivita = "*", k_xml = "*", druh_zas_zkr = "*", priz_zahr = "*", priz_doruc = "*", filtr_format = "*", povol_sl = "*", druh_zas_rsx = "*",}
	const enum GReaderWflcdrzDtoTypes { druh_zas = "number", druh_zas_txt = "string", k_v = "number", aktivita = "number", k_xml = "string", druh_zas_zkr = "string", priz_zahr = "number", priz_doruc = "number", filtr_format = "string", povol_sl = "string", druh_zas_rsx = "number",}
	const enum GReaderWflcdrzDtoTypeLengths { druh_zas_txt = 50, k_xml = 254, druh_zas_zkr = 5, filtr_format = 50, povol_sl = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcdzzDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - Druh zacházení se zásilkou*/
	interface GReaderWflcdzzDto {
		/**Autogenerated.*/
		druh_zas_zach?: number|null;
		/**Autogenerated.*/
		druh_zas_zach_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		druh_zas_zach_rsx?: number|null;
	}
	const enum GReaderWflcdzzDtoNames { druh_zas_zach = "druh_zas_zach", druh_zas_zach_txt = "druh_zas_zach_txt", k_v = "k_v", aktivita = "aktivita", druh_zas_zach_rsx = "druh_zas_zach_rsx",}
	const enum GReaderWflcdzzDtoFragments { druh_zas_zach = "*", druh_zas_zach_txt = "*", k_v = "*", aktivita = "*", druh_zas_zach_rsx = "*",}
	const enum GReaderWflcdzzDtoTypes { druh_zas_zach = "number", druh_zas_zach_txt = "string", k_v = "number", aktivita = "number", druh_zas_zach_rsx = "number",}
	const enum GReaderWflcdzzDtoTypeLengths { druh_zas_zach_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcpcjDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - Vazba dokumentu na číslo jednací (čj)*/
	interface GReaderWflcpcjDto {
		/**Autogenerated.*/
		priz_cj?: number|null;
		/**Autogenerated.*/
		priz_cj_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
	}
	const enum GReaderWflcpcjDtoNames { priz_cj = "priz_cj", priz_cj_txt = "priz_cj_txt", k_v = "k_v",}
	const enum GReaderWflcpcjDtoFragments { priz_cj = "*", priz_cj_txt = "*", k_v = "*",}
	const enum GReaderWflcpcjDtoTypes { priz_cj = "number", priz_cj_txt = "string", k_v = "number",}
	const enum GReaderWflcpcjDtoTypeLengths { priz_cj_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcproDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcpro*/
	interface GReaderWflcproDto {
		/**DBCOLUMN:wflcpro.priz_ro - Přístup*/
		priz_ro?: number|null;
		/**DBCOLUMN:wflcpro.priz_ro_txt -*/
		priz_ro_txt?: string|null;
	}
	const enum GReaderWflcproDtoNames { priz_ro = "priz_ro", priz_ro_txt = "priz_ro_txt",}
	const enum GReaderWflcproDtoFragments { priz_ro = "*", priz_ro_txt = "*",}
	const enum GReaderWflcproDtoTypes { priz_ro = "number", priz_ro_txt = "string",}
	const enum GReaderWflcproDtoTypeLengths { priz_ro_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcpuvDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - původ dokumentu*/
	interface GReaderWflcpuvDto {
		/**Autogenerated.*/
		puvod?: number|null;
		/**Autogenerated.*/
		puvod_txt?: string|null;
		/**Autogenerated.*/
		puvod_rsx?: number|null;
		/**Autogenerated.*/
		k_v?: number|null;
	}
	const enum GReaderWflcpuvDtoNames { puvod = "puvod", puvod_txt = "puvod_txt", puvod_rsx = "puvod_rsx", k_v = "k_v",}
	const enum GReaderWflcpuvDtoFragments { puvod = "*", puvod_txt = "*", puvod_rsx = "*", k_v = "*",}
	const enum GReaderWflcpuvDtoTypes { puvod = "number", puvod_txt = "string", puvod_rsx = "number", k_v = "number",}
	const enum GReaderWflcpuvDtoTypeLengths { puvod_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcstpDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - Stav dokumentu*/
	interface GReaderWflcstpDto {
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		stav_pis_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		stav_pis_rsx?: number|null;
	}
	const enum GReaderWflcstpDtoNames { stav_pis = "stav_pis", stav_pis_txt = "stav_pis_txt", k_v = "k_v", stav_pis_rsx = "stav_pis_rsx",}
	const enum GReaderWflcstpDtoFragments { stav_pis = "*", stav_pis_txt = "*", k_v = "*", stav_pis_rsx = "*",}
	const enum GReaderWflcstpDtoTypes { stav_pis = "number", stav_pis_txt = "string", k_v = "number", stav_pis_rsx = "number",}
	const enum GReaderWflcstpDtoTypeLengths { stav_pis_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflcstvDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**stav schvalovacího předpisu*/
	interface GReaderWflcstvDto {
		/**Autogenerated.*/
		stav_vyriz?: number|null;
		/**Autogenerated.*/
		stav_vyriz_zkr?: string|null;
		/**Autogenerated.*/
		stav_vyriz_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
	}
	const enum GReaderWflcstvDtoNames { stav_vyriz = "stav_vyriz", stav_vyriz_zkr = "stav_vyriz_zkr", stav_vyriz_txt = "stav_vyriz_txt", k_v = "k_v", aktivita = "aktivita",}
	const enum GReaderWflcstvDtoFragments { stav_vyriz = "*", stav_vyriz_zkr = "*", stav_vyriz_txt = "*", k_v = "*", aktivita = "*",}
	const enum GReaderWflcstvDtoTypes { stav_vyriz = "number", stav_vyriz_zkr = "string", stav_vyriz_txt = "string", k_v = "number", aktivita = "number",}
	const enum GReaderWflcstvDtoTypeLengths { stav_vyriz_zkr = 3, stav_vyriz_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflctduDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflctdu*/
	interface GReaderWflctduDto {
		/**DBCOLUMN:wflctdu.duvod_prist -*/
		duvod_prist?: number|null;
		/**DBCOLUMN:wflctdu.duvod_prist_txt -*/
		duvod_prist_txt?: string|null;
	}
	const enum GReaderWflctduDtoNames { duvod_prist = "duvod_prist", duvod_prist_txt = "duvod_prist_txt",}
	const enum GReaderWflctduDtoFragments { duvod_prist = "*", duvod_prist_txt = "*",}
	const enum GReaderWflctduDtoTypes { duvod_prist = "number", duvod_prist_txt = "string",}
	const enum GReaderWflctduDtoTypeLengths { duvod_prist_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflctysDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - typové spisy*/
	interface GReaderWflctysDto {
		/**Autogenerated.*/
		typ_spis?: number|null;
		/**Autogenerated.*/
		typ_spis_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		k_s?: string|null;
	}
	const enum GReaderWflctysDtoNames { typ_spis = "typ_spis", typ_spis_txt = "typ_spis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderWflctysDtoFragments { typ_spis = "*", typ_spis_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderWflctysDtoTypes { typ_spis = "number", typ_spis_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderWflctysDtoTypeLengths { typ_spis_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflczipDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflczip*/
	interface GReaderWflczipDto {
		/**DBCOLUMN:wflczip.typ_zip - Způsob uložení*/
		typ_zip?: number|null;
		/**DBCOLUMN:wflczip.typ_zip_txt -*/
		typ_zip_txt?: string|null;
	}
	const enum GReaderWflczipDtoNames { typ_zip = "typ_zip", typ_zip_txt = "typ_zip_txt",}
	const enum GReaderWflczipDtoFragments { typ_zip = "*", typ_zip_txt = "*",}
	const enum GReaderWflczipDtoTypes { typ_zip = "number", typ_zip_txt = "string",}
	const enum GReaderWflczipDtoTypeLengths { typ_zip_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflczpdDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - způsob doručení*/
	interface GReaderWflczpdDto {
		/**Autogenerated.*/
		zpusob_dor?: number|null;
		/**Autogenerated.*/
		zpusob_dor_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		povol_sl?: string|null;
		/**Autogenerated.*/
		zpusob_dor_rsx?: number|null;
	}
	const enum GReaderWflczpdDtoNames { zpusob_dor = "zpusob_dor", zpusob_dor_txt = "zpusob_dor_txt", k_v = "k_v", aktivita = "aktivita", povol_sl = "povol_sl", zpusob_dor_rsx = "zpusob_dor_rsx",}
	const enum GReaderWflczpdDtoFragments { zpusob_dor = "*", zpusob_dor_txt = "*", k_v = "*", aktivita = "*", povol_sl = "*", zpusob_dor_rsx = "*",}
	const enum GReaderWflczpdDtoTypes { zpusob_dor = "number", zpusob_dor_txt = "string", k_v = "number", aktivita = "number", povol_sl = "string", zpusob_dor_rsx = "number",}
	const enum GReaderWflczpdDtoTypeLengths { zpusob_dor_txt = 50, povol_sl = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflscerDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DTO - certifikáty*/
	interface GReaderWflscerDto {
		/**Autogenerated.*/
		ixs_cer?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		stat?: string|null;
		/**Autogenerated.*/
		ulice?: string|null;
		/**Autogenerated.*/
		obec?: string|null;
		/**Autogenerated.*/
		firma?: string|null;
		/**Autogenerated.*/
		utvar?: string|null;
		/**Autogenerated.*/
		email?: string|null;
		/**Autogenerated.*/
		id_cert?: string|null;
		/**Autogenerated.*/
		otisk?: string|null;
		/**Autogenerated.*/
		ixs_cau?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_do?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		adresa?: string|null;
		/**Autogenerated.*/
		tel?: string|null;
		/**Autogenerated.*/
		bio?: JsonDecimal|null;
		/**Autogenerated.*/
		typ_cer?: number|null;
		/**Autogenerated.*/
		alg_h?: string|null;
		/**Autogenerated.*/
		jmeno_cau?: string|null;
		/**Autogenerated.*/
		jmeno_txt?: string|null;
	}
	const enum GReaderWflscerDtoNames { ixs_cer = "ixs_cer", jmeno = "jmeno", stat = "stat", ulice = "ulice", obec = "obec", firma = "firma", utvar = "utvar", email = "email", id_cert = "id_cert", otisk = "otisk", ixs_cau = "ixs_cau", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", adresa = "adresa", tel = "tel", bio = "bio", typ_cer = "typ_cer", alg_h = "alg_h", jmeno_cau = "jmeno_cau", jmeno_txt = "jmeno_txt",}
	const enum GReaderWflscerDtoFragments { ixs_cer = "*", jmeno = "*", stat = "*", ulice = "*", obec = "*", firma = "*", utvar = "*", email = "*", id_cert = "*", otisk = "*", ixs_cau = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", adresa = "*", tel = "*", bio = "*", typ_cer = "*", alg_h = "*", jmeno_cau = "*", jmeno_txt = "*",}
	const enum GReaderWflscerDtoTypes { ixs_cer = "string", jmeno = "string", stat = "string", ulice = "string", obec = "string", firma = "string", utvar = "string", email = "string", id_cert = "string", otisk = "string", ixs_cau = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", adresa = "string", tel = "string", bio = "JsonDecimal", typ_cer = "number", alg_h = "string", jmeno_cau = "string", jmeno_txt = "string",}
	const enum GReaderWflscerDtoTypeLengths { ixs_cer = 12, jmeno = 254, stat = 254, ulice = 254, obec = 254, firma = 254, utvar = 254, email = 254, id_cert = 254, otisk = 254, ixs_cau = 12, poznamka = 254, zmenu_prov = 12, adresa = 254, tel = 254, alg_h = 100, jmeno_cau = 254, jmeno_txt = 1024,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GReaderWflsserDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflsser*/
	interface GReaderWflsserDto {
		/**DBCOLUMN:wflsser.server_name - Jméno serveru elektronického úložiště*/
		server_name?: string|null;
		/**DBCOLUMN:wflsser.nazev - Název serveru*/
		nazev?: string|null;
	}
	const enum GReaderWflsserDtoNames { server_name = "server_name", nazev = "nazev",}
	const enum GReaderWflsserDtoFragments { server_name = "*", nazev = "*",}
	const enum GReaderWflsserDtoTypes { server_name = "string", nazev = "string",}
	const enum GReaderWflsserDtoTypeLengths { server_name = 30, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflccskDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**Dto druhu zprávy (určuje zda jde o podání / rozhodnutí / notifikaci / ...) odesílané pomocí eDesk.*/
	interface GWflccskDto {
		/**DBCOLUMN:wflccsk.id_csk*/
		id_csk?: number|null;
		/**DBCOLUMN:wflccsk.id_csk_txt*/
		id_csk_txt?: string|null;
		/**DBCOLUMN:wflccsk.csk_class*/
		csk_class?: string|null;
		/**DBCOLUMN:wflccsk.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflccsk.k_s*/
		k_s?: string|null;
	}
	const enum GWflccskDtoNames { id_csk = "id_csk", id_csk_txt = "id_csk_txt", csk_class = "csk_class", k_v = "k_v", k_s = "k_s",}
	const enum GWflccskDtoFragments { id_csk = "*", id_csk_txt = "*", csk_class = "*", k_v = "*", k_s = "*",}
	const enum GWflccskDtoTypes { id_csk = "number", id_csk_txt = "string", csk_class = "string", k_v = "number", k_s = "string",}
	const enum GWflccskDtoTypeLengths { id_csk_txt = 50, csk_class = 50, k_s = 15,}
	/**Enum druhu zprávy (určuje zda jde o podání / rozhodnutí / notifikaci / ...) odesílané pomocí eDesk.*/
	const enum GWflccskEnum {
		/**Podání*/
		Podani=0,
		/**Rozhodnutí*/
		Rozhodnuti=10,
		/**Notifikace*/
		Notifikace=20,
	}
	function GWflccskEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflccskEnum, Gordic.ControlsLogic.Interface.GWflccskDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcepsReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflceps*/
	interface GWflcepsReaderDto {
		/**DBCOLUMN:wflceps.typ_eps*/
		typ_eps?: number|null;
		/**DBCOLUMN:wflceps.typ_eps_txt*/
		typ_eps_txt?: string|null;
	}
	const enum GWflcepsReaderDtoNames { typ_eps = "typ_eps", typ_eps_txt = "typ_eps_txt",}
	const enum GWflcepsReaderDtoFragments { typ_eps = "*", typ_eps_txt = "*",}
	const enum GWflcepsReaderDtoTypes { typ_eps = "number", typ_eps_txt = "string",}
	const enum GWflcepsReaderDtoTypeLengths { typ_eps_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcfskReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcfsk*/
	interface GWflcfskReaderDto {
		/**DBCOLUMN:wflcfsk.typ_zarazeni*/
		typ_zarazeni?: number|null;
		/**DBCOLUMN:wflcfsk.typ_zarazeni_txt*/
		typ_zarazeni_txt?: string|null;
	}
	const enum GWflcfskReaderDtoNames { typ_zarazeni = "typ_zarazeni", typ_zarazeni_txt = "typ_zarazeni_txt",}
	const enum GWflcfskReaderDtoFragments { typ_zarazeni = "*", typ_zarazeni_txt = "*",}
	const enum GWflcfskReaderDtoTypes { typ_zarazeni = "number", typ_zarazeni_txt = "string",}
	const enum GWflcfskReaderDtoTypeLengths { typ_zarazeni_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflckdpDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflckdp*/
	interface GWflckdpDto {
		/**DBCOLUMN:wflckdp.ktg_duv_podp*/
		ktg_duv_podp?: number|null;
		/**DBCOLUMN:wflckdp.ktg_duv_podp_txt*/
		ktg_duv_podp_txt?: string|null;
		/**DBCOLUMN:wflckdp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflckdp.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:wflckdp.pri_multi*/
		pri_multi?: number|null;
		/**DBCOLUMN:wflckdp.ktg_duv_podp_rsx*/
		ktg_duv_podp_rsx?: number|null;
	}
	const enum GWflckdpDtoNames { ktg_duv_podp = "ktg_duv_podp", ktg_duv_podp_txt = "ktg_duv_podp_txt", k_v = "k_v", k_s = "k_s", pri_multi = "pri_multi", ktg_duv_podp_rsx = "ktg_duv_podp_rsx",}
	const enum GWflckdpDtoFragments { ktg_duv_podp = "*", ktg_duv_podp_txt = "*", k_v = "*", k_s = "*", pri_multi = "*", ktg_duv_podp_rsx = "*",}
	const enum GWflckdpDtoTypes { ktg_duv_podp = "number", ktg_duv_podp_txt = "string", k_v = "number", k_s = "string", pri_multi = "number", ktg_duv_podp_rsx = "number",}
	const enum GWflckdpDtoTypeLengths { ktg_duv_podp_txt = 100, k_s = 15,}
	/**ENUM:wflckdp*/
	const enum GWflckdpEnum {
		/**Podepsání/razítko při vložení el. dokumentu (přidání el. obrazu/přílohy)*/
		_10=10,
		/**Podepsání/razítko již existujícího el. dokumentu (běžné podepsání v modulu)*/
		_20=20,
		/**Podepsání/razítko pro potvrzení vidimace po naskenování dokumentu*/
		_30=30,
		/**Podepsání/razítko po konverzi do PDF*/
		_40=40,
		/**Systémové razítko při příjmu el. podání*/
		_50=50,
		/**Podepsání el. obrazu, příloh před odesláním z GINISu*/
		_60=60,
		/**Podepsání/razítko odpovědi na el. podání*/
		_70=70,
		/**Podepsání úkonu v EPK  (kval. certifikátem)*/
		_80=80,
		/**Podepsání/čas. razítko úkonu v EPK  (kval. certifikátem)*/
		_90=90,
		/**Podepsání  úkonu v EPK  (kval. certifikátem nebo systémovou značku )*/
		_100=100,
		/**Podepsání/čas. razítko úkonu v EPK  (kval. certifikátem nebo systémovou značku)*/
		_110=110,
		/**Podepsání/razítko při vložení el. dokumentu s konverzí (přidání el. obrazu/přílohy)*/
		_120=120,
		/**Podepisování dávek ČNB*/
		_130=130,
		/**Podepsání/razítko potvrzení příjmu el. podání*/
		_150=150,
		/**Podepsání/razítko sestav GRR*/
		_160=160,
		/**Přihlášení na CzechPOINT@office*/
		_170=170,
	}
	function GWflckdpEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflckdpEnum, Gordic.ControlsLogic.Interface.GWflckdpDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcopaReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcopa*/
	interface GWflcopaReaderDto {
		/**DBCOLUMN:wflcopa.priz_opa*/
		priz_opa?: number|null;
		/**DBCOLUMN:wflcopa.priz_opa_txt*/
		priz_opa_txt?: string|null;
	}
	const enum GWflcopaReaderDtoNames { priz_opa = "priz_opa", priz_opa_txt = "priz_opa_txt",}
	const enum GWflcopaReaderDtoFragments { priz_opa = "*", priz_opa_txt = "*",}
	const enum GWflcopaReaderDtoTypes { priz_opa = "number", priz_opa_txt = "string",}
	const enum GWflcopaReaderDtoTypeLengths { priz_opa_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcpetReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcpet*/
	interface GWflcpetReaderDto {
		/**DBCOLUMN:wflcpet.priz_edit_termin*/
		priz_edit_termin?: number|null;
		/**DBCOLUMN:wflcpet.priz_edit_termin_t*/
		priz_edit_termin_t?: string|null;
	}
	const enum GWflcpetReaderDtoNames { priz_edit_termin = "priz_edit_termin", priz_edit_termin_t = "priz_edit_termin_t",}
	const enum GWflcpetReaderDtoFragments { priz_edit_termin = "*", priz_edit_termin_t = "*",}
	const enum GWflcpetReaderDtoTypes { priz_edit_termin = "number", priz_edit_termin_t = "string",}
	const enum GWflcpetReaderDtoTypeLengths { priz_edit_termin_t = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcpokReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcpok*/
	interface GWflcpokReaderDto {
		/**DBCOLUMN:wflcpok.priz_opak*/
		priz_opak?: number|null;
		/**DBCOLUMN:wflcpok.priz_opak_txt*/
		priz_opak_txt?: string|null;
	}
	const enum GWflcpokReaderDtoNames { priz_opak = "priz_opak", priz_opak_txt = "priz_opak_txt",}
	const enum GWflcpokReaderDtoFragments { priz_opak = "*", priz_opak_txt = "*",}
	const enum GWflcpokReaderDtoTypes { priz_opak = "number", priz_opak_txt = "string",}
	const enum GWflcpokReaderDtoTypeLengths { priz_opak_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcpubReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcpub*/
	interface GWflcpubReaderDto {
		/**DBCOLUMN:wflcpub.priz_pub*/
		priz_pub?: number|null;
		/**DBCOLUMN:wflcpub.priz_pub_txt*/
		priz_pub_txt?: string|null;
	}
	const enum GWflcpubReaderDtoNames { priz_pub = "priz_pub", priz_pub_txt = "priz_pub_txt",}
	const enum GWflcpubReaderDtoFragments { priz_pub = "*", priz_pub_txt = "*",}
	const enum GWflcpubReaderDtoTypes { priz_pub = "number", priz_pub_txt = "string",}
	const enum GWflcpubReaderDtoTypeLengths { priz_pub_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcpudReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcpud*/
	interface GWflcpudReaderDto {
		/**DBCOLUMN:wflcpud.priz_ud*/
		priz_ud?: number|null;
		/**DBCOLUMN:wflcpud.priz_ud_txt*/
		priz_ud_txt?: string|null;
	}
	const enum GWflcpudReaderDtoNames { priz_ud = "priz_ud", priz_ud_txt = "priz_ud_txt",}
	const enum GWflcpudReaderDtoFragments { priz_ud = "*", priz_ud_txt = "*",}
	const enum GWflcpudReaderDtoTypes { priz_ud = "number", priz_ud_txt = "string",}
	const enum GWflcpudReaderDtoTypeLengths { priz_ud_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflcspuReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflcspu*/
	interface GWflcspuReaderDto {
		/**DBCOLUMN:wflcspu.sch_pov*/
		sch_pov?: number|null;
		/**DBCOLUMN:wflcspu.sch_pov_txt*/
		sch_pov_txt?: string|null;
	}
	const enum GWflcspuReaderDtoNames { sch_pov = "sch_pov", sch_pov_txt = "sch_pov_txt",}
	const enum GWflcspuReaderDtoFragments { sch_pov = "*", sch_pov_txt = "*",}
	const enum GWflcspuReaderDtoTypes { sch_pov = "number", sch_pov_txt = "string",}
	const enum GWflcspuReaderDtoTypeLengths { sch_pov_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflctppReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflctpp*/
	interface GWflctppReaderDto {
		/**DBCOLUMN:wflctpp.typ_pozad_pod*/
		typ_pozad_pod?: number|null;
		/**DBCOLUMN:wflctpp.typ_pozad_pod_txt*/
		typ_pozad_pod_txt?: string|null;
	}
	const enum GWflctppReaderDtoNames { typ_pozad_pod = "typ_pozad_pod", typ_pozad_pod_txt = "typ_pozad_pod_txt",}
	const enum GWflctppReaderDtoFragments { typ_pozad_pod = "*", typ_pozad_pod_txt = "*",}
	const enum GWflctppReaderDtoTypes { typ_pozad_pod = "number", typ_pozad_pod_txt = "string",}
	const enum GWflctppReaderDtoTypeLengths { typ_pozad_pod_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflctsrReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflctsr*/
	interface GWflctsrReaderDto {
		/**DBCOLUMN:wflctsr.typ_srv*/
		typ_srv?: number|null;
		/**DBCOLUMN:wflctsr.typ_srv_txt*/
		typ_srv_txt?: string|null;
	}
	const enum GWflctsrReaderDtoNames { typ_srv = "typ_srv", typ_srv_txt = "typ_srv_txt",}
	const enum GWflctsrReaderDtoFragments { typ_srv = "*", typ_srv_txt = "*",}
	const enum GWflctsrReaderDtoTypes { typ_srv = "number", typ_srv_txt = "string",}
	const enum GWflctsrReaderDtoTypeLengths { typ_srv_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflsgraReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflsgra*/
	interface GWflsgraReaderDto {
		/**DBCOLUMN:wflsgra.spis_graf*/
		spis_graf?: string|null;
		/**DBCOLUMN:wflsgra.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsgra.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsgra.typ_gra*/
		typ_gra?: number|null;
	}
	const enum GWflsgraReaderDtoNames { spis_graf = "spis_graf", aktivita = "aktivita", nazev = "nazev", typ_gra = "typ_gra",}
	const enum GWflsgraReaderDtoFragments { spis_graf = "*", aktivita = "*", nazev = "*", typ_gra = "*",}
	const enum GWflsgraReaderDtoTypes { spis_graf = "string", aktivita = "number", nazev = "string", typ_gra = "number",}
	const enum GWflsgraReaderDtoTypeLengths { spis_graf = 10, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.ControlsLogic.Interface\Wfl\Dto\GWflsstpReaderDto.d.ts 

declare namespace Gordic.ControlsLogic.Interface {
	/**DBTABLE:wflsstp*/
	interface GWflsstpReaderDto {
		/**DBCOLUMN:wflsstp.stav_schvproc*/
		stav_schvproc?: number|null;
		/**DBCOLUMN:wflsstp.nazev*/
		nazev?: string|null;
	}
	const enum GWflsstpReaderDtoNames { stav_schvproc = "stav_schvproc", nazev = "nazev",}
	const enum GWflsstpReaderDtoFragments { stav_schvproc = "*", nazev = "*",}
	const enum GWflsstpReaderDtoTypes { stav_schvproc = "number", nazev = "string",}
	const enum GWflsstpReaderDtoTypeLengths { nazev = 100,}
}

//#endregion

