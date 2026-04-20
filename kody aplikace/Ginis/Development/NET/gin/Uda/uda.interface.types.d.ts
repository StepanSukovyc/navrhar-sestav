/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       uda.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Uda.Interface\Gordic.Uda.Interface.csproj
*    created     2026-02-16 14:33:49
*    files       DataSets\Gordic.Uda.Interface.CiselnikZdroju.Dto.d.ts
*                DataSets\Gordic.Uda.Interface.HistorieSeznam.Dto.d.ts
*                DataSets\Gordic.Uda.Interface.SeznamDokumentuUD.Dto.d.ts
*                DataSets\Gordic.Uda.Interface.SeznamDokumentuUDFilterDto.d.ts
*                DataSets\Gordic.Uda.Interface.SeznamPriloh.Dto.d.ts
*                Dto\GScoreDataDto.d.ts
*                Dto\GUdecszvDto.d.ts
*                Dto\GUdespskDto.d.ts
*                Dto\GUdeszudDto.d.ts
*                Dto\GUredniDeskaDto.d.ts
*                Dto\GUredniDeskaZaznamDto.d.ts
*                Dto\GWfldulzDto.d.ts
*                Dto\GZmenStavDto.d.ts
*                Enums\VysledekEnum.d.ts
*                Import\GImportKuzlDokumentDto.d.ts
*                Import\GImportKuzlDto.d.ts
*                Import\GImportKuzlKategorieDto.d.ts
*                Import\GImportKuzlKategorieItemDto.d.ts
*                Import\GImportKuzlOriginalDto.d.ts
*                Import\IGImportKuzl.d.ts
*                ISL\Gordic.Uda.Interface.GServiceSaveUdaSpecial.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaHistorieZaznamu.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaKalendar.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaKategorie.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaSoubory.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaUdalosti.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaZdroje.d.ts
*                ISL\Gordic.Uda.Interface.IGUdaZverejneniNaCUET.d.ts
*                ISL\Gordic.Uda.Interface.IGUredniDeska.d.ts
*                ISL\Gordic.Uda.Interface.IGUredniDeskaObsah.d.ts
*                Wfldude\Gordic.Uda.Interface.IGWfldudeEnum.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\DataSets\Gordic.Uda.Interface.CiselnikZdroju.Dto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:CiselnikZdroju*/
	interface CiselnikZdrojuDto {
		/**DBCOLUMN:CiselnikZdroju.ixs_zud*/
		ixs_zud?: string|null;
		/**DBCOLUMN:CiselnikZdroju.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:CiselnikZdroju.aktivita*/
		aktivita?: number|null;
	}
	const enum CiselnikZdrojuDtoNames { ixs_zud = "ixs_zud", nazev = "nazev", aktivita = "aktivita",}
	const enum CiselnikZdrojuDtoFragments { ixs_zud = "*", nazev = "*", aktivita = "*",}
	const enum CiselnikZdrojuDtoTypes { ixs_zud = "string", nazev = "string", aktivita = "number",}
	const enum CiselnikZdrojuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\DataSets\Gordic.Uda.Interface.HistorieSeznam.Dto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:HistorieSeznam*/
	interface HistorieSeznamDto {
		/**DBCOLUMN:HistorieSeznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:HistorieSeznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:HistorieSeznam.nazev_kat*/
		nazev_kat?: string|null;
		/**DBCOLUMN:HistorieSeznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:HistorieSeznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:HistorieSeznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:HistorieSeznam.s_ude*/
		s_ude?: number|null;
		/**DBCOLUMN:HistorieSeznam.stav*/
		stav?: string|null;
		/**DBCOLUMN:HistorieSeznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:HistorieSeznam.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:HistorieSeznam.ixs_zmp_schval*/
		ixs_zmp_schval?: string|null;
		/**DBCOLUMN:HistorieSeznam.dat_schval*/
		dat_schval?: JsonDate|null;
		/**DBCOLUMN:HistorieSeznam.ixs_zud*/
		ixs_zud?: string|null;
		/**DBCOLUMN:HistorieSeznam.nazev_zdroj*/
		nazev_zdroj?: string|null;
		/**DBCOLUMN:HistorieSeznam.cj*/
		cj?: string|null;
		/**DBCOLUMN:HistorieSeznam.ixp_wflspid*/
		ixp_wflspid?: string|null;
		/**DBCOLUMN:HistorieSeznam.cj_wflspid*/
		cj_wflspid?: string|null;
		/**DBCOLUMN:HistorieSeznam.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:HistorieSeznam.stav_ude*/
		stav_ude?: number|null;
		/**DBCOLUMN:HistorieSeznam.stav_por*/
		stav_por?: number|null;
	}
	const enum HistorieSeznamDtoNames { dat_od = "dat_od", dat_do = "dat_do", nazev_kat = "nazev_kat", nazev = "nazev", popis = "popis", poznamka = "poznamka", s_ude = "s_ude", stav = "stav", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", ixs_zmp_schval = "ixs_zmp_schval", dat_schval = "dat_schval", ixs_zud = "ixs_zud", nazev_zdroj = "nazev_zdroj", cj = "cj", ixp_wflspid = "ixp_wflspid", cj_wflspid = "cj_wflspid", ofic_nazev = "ofic_nazev", stav_ude = "stav_ude", stav_por = "stav_por",}
	const enum HistorieSeznamDtoFragments { dat_od = "*", dat_do = "*", nazev_kat = "*", nazev = "*", popis = "*", poznamka = "*", s_ude = "*", stav = "*", dat_zmena = "*", zmenu_prov_txt = "*", ixs_zmp_schval = "*", dat_schval = "*", ixs_zud = "*", nazev_zdroj = "*", cj = "*", ixp_wflspid = "*", cj_wflspid = "*", ofic_nazev = "*", stav_ude = "*", stav_por = "*",}
	const enum HistorieSeznamDtoTypes { dat_od = "JsonDate", dat_do = "JsonDate", nazev_kat = "string", nazev = "string", popis = "string", poznamka = "string", s_ude = "number", stav = "string", dat_zmena = "JsonDate", zmenu_prov_txt = "string", ixs_zmp_schval = "string", dat_schval = "JsonDate", ixs_zud = "string", nazev_zdroj = "string", cj = "string", ixp_wflspid = "string", cj_wflspid = "string", ofic_nazev = "string", stav_ude = "number", stav_por = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\DataSets\Gordic.Uda.Interface.SeznamDokumentuUD.Dto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:SeznamDokumentuUD*/
	interface SeznamDokumentuUDDto {
		/**DBCOLUMN:SeznamDokumentuUD.ixs_ulo*/
		ixs_ulo?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:SeznamDokumentuUD.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:SeznamDokumentuUD.nazev_kat*/
		nazev_kat?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.ktg_dms*/
		ktg_dms?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.ixs_ulz*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.s_ude*/
		s_ude?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.stav*/
		stav?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.ixs_fun_ozn*/
		ixs_fun_ozn?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamDokumentuUD.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.ixs_zmp_schval*/
		ixs_zmp_schval?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.dat_schval*/
		dat_schval?: JsonDate|null;
		/**DBCOLUMN:SeznamDokumentuUD.ixs_zud*/
		ixs_zud?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.nazev_zdroj*/
		nazev_zdroj?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.cj*/
		cj?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.ixp_wflspid*/
		ixp_wflspid?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.cj_wflspid*/
		cj_wflspid?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.stav_ude*/
		stav_ude?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.stav_por*/
		stav_por?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.pocet_priloh*/
		pocet_priloh?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokumentuUD.s_orig*/
		s_orig?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.por_cislo_kopie*/
		por_cislo_kopie?: number|null;
		/**DBCOLUMN:SeznamDokumentuUD.por_cislo_orig*/
		por_cislo_orig?: number|null;
	}
	const enum SeznamDokumentuUDDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", dat_od = "dat_od", dat_do = "dat_do", nazev_kat = "nazev_kat", ktg_dms = "ktg_dms", ixs_ulz = "ixs_ulz", nazev = "nazev", soubor = "soubor", popis = "popis", poznamka = "poznamka", s_ude = "s_ude", stav = "stav", ixs_fun_ozn = "ixs_fun_ozn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_zmp_schval = "ixs_zmp_schval", dat_schval = "dat_schval", ixs_zud = "ixs_zud", nazev_zdroj = "nazev_zdroj", cj = "cj", ixp_wflspid = "ixp_wflspid", cj_wflspid = "cj_wflspid", ofic_nazev = "ofic_nazev", stav_ude = "stav_ude", stav_por = "stav_por", pocet_priloh = "pocet_priloh", ico = "ico", s_orig = "s_orig", por_cislo_kopie = "por_cislo_kopie", por_cislo_orig = "por_cislo_orig",}
	const enum SeznamDokumentuUDDtoFragments { ixs_ulo = "*", por_cislo = "*", dat_od = "*", dat_do = "*", nazev_kat = "*", ktg_dms = "*", ixs_ulz = "*", nazev = "*", soubor = "*", popis = "*", poznamka = "*", s_ude = "*", stav = "*", ixs_fun_ozn = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_zmp_schval = "*", dat_schval = "*", ixs_zud = "*", nazev_zdroj = "*", cj = "*", ixp_wflspid = "*", cj_wflspid = "*", ofic_nazev = "*", stav_ude = "*", stav_por = "*", pocet_priloh = "*", ico = "*", s_orig = "*", por_cislo_kopie = "*", por_cislo_orig = "*",}
	const enum SeznamDokumentuUDDtoTypes { ixs_ulo = "string", por_cislo = "number", dat_od = "JsonDate", dat_do = "JsonDate", nazev_kat = "string", ktg_dms = "string", ixs_ulz = "string", nazev = "string", soubor = "string", popis = "string", poznamka = "string", s_ude = "number", stav = "string", ixs_fun_ozn = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_zmp_schval = "string", dat_schval = "JsonDate", ixs_zud = "string", nazev_zdroj = "string", cj = "string", ixp_wflspid = "string", cj_wflspid = "string", ofic_nazev = "string", stav_ude = "number", stav_por = "number", pocet_priloh = "number", ico = "string", s_orig = "number", por_cislo_kopie = "number", por_cislo_orig = "number",}
	const enum SeznamDokumentuUDDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\DataSets\Gordic.Uda.Interface.SeznamDokumentuUDFilterDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DTO filtračních kritérií pro filtr seznamu vyvěšení*/
	interface SeznamDokumentuUDFilterDto {
		/**ixs_ulo*/
		ixs_ulo?: GBaseFilter<string>|null;
		/**por_cislo*/
		por_cislo?: GBaseFilter<number>|null;
	}
	const enum SeznamDokumentuUDFilterDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo",}
	const enum SeznamDokumentuUDFilterDtoFragments { ixs_ulo = "*", por_cislo = "*",}
	const enum SeznamDokumentuUDFilterDtoTypes { ixs_ulo = "GBaseFilter<string>", por_cislo = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\DataSets\Gordic.Uda.Interface.SeznamPriloh.Dto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:SeznamPriloh*/
	interface SeznamPrilohDto {
		/**DBCOLUMN:SeznamPriloh.ixs_ulo*/
		ixs_ulo?: string|null;
		/**DBCOLUMN:SeznamPriloh.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:SeznamPriloh.ixs_ulo_pri*/
		ixs_ulo_pri?: string|null;
		/**DBCOLUMN:SeznamPriloh.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:SeznamPriloh.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:SeznamPriloh.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:SeznamPriloh.priz_el_obr*/
		priz_el_obr?: number|null;
		/**DBCOLUMN:SeznamPriloh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamPriloh.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamPriloh.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:SeznamPriloh.velikost*/
		velikost?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPriloh.velikost_txt*/
		velikost_txt?: string|null;
		/**DBCOLUMN:SeznamPriloh.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:SeznamPriloh.aktivita*/
		aktivita?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPriloh.podpis*/
		podpis?: number|null;
		/**DBCOLUMN:SeznamPriloh.ser_cislo*/
		ser_cislo?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPriloh.soubor_pri*/
		soubor_pri?: string|null;
		/**DBCOLUMN:SeznamPriloh.ixs_psk*/
		ixs_psk?: string|null;
	}
	const enum SeznamPrilohDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", ixs_ulo_pri = "ixs_ulo_pri", ixb = "ixb", poradi = "poradi", poznamka = "poznamka", priz_el_obr = "priz_el_obr", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", soubor = "soubor", velikost = "velikost", velikost_txt = "velikost_txt", aktivita_txt = "aktivita_txt", aktivita = "aktivita", podpis = "podpis", ser_cislo = "ser_cislo", soubor_pri = "soubor_pri", ixs_psk = "ixs_psk",}
	const enum SeznamPrilohDtoFragments { ixs_ulo = "*", por_cislo = "*", ixs_ulo_pri = "*", ixb = "*", poradi = "*", poznamka = "*", priz_el_obr = "*", dat_zmena = "*", nazev_rf = "*", soubor = "*", velikost = "*", velikost_txt = "*", aktivita_txt = "*", aktivita = "*", podpis = "*", ser_cislo = "*", soubor_pri = "*", ixs_psk = "*",}
	const enum SeznamPrilohDtoTypes { ixs_ulo = "string", por_cislo = "number", ixs_ulo_pri = "string", ixb = "string", poradi = "number", poznamka = "string", priz_el_obr = "number", dat_zmena = "JsonDate", nazev_rf = "string", soubor = "string", velikost = "JsonDecimal", velikost_txt = "string", aktivita_txt = "string", aktivita = "JsonDecimal", podpis = "number", ser_cislo = "JsonDecimal", soubor_pri = "string", ixs_psk = "string",}
	const enum SeznamPrilohDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GScoreDataDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Ukazatele na úvodní stránku*/
	interface GScoreDataDto {
		/**celekm*/
		celkem?: number|null;
		/**Návrh*/
		navrh?: number|null;
		/**Vyveseno*/
		vyveseno?: number|null;
		/**Sejmuto*/
		sejmuto?: number|null;
		/**Zruseno*/
		zruseno?: number|null;
		/**VYveseno pred terminem*/
		vyvesenoPredTerminem?: number|null;
		/**Vyveseno ted*/
		vyvesenoTed?: number|null;
		/**Počet dokumnetů do vyvěšení*/
		vyveseneDoVyveseni?: number|null;
		/**Počet dokumnetů do vyvěšení*/
		navrhyDoVyveseni?: number|null;
		/**vyveseneDoSejmuti*/
		vyveseneDoSejmuti?: number|null;
	}
	const enum GScoreDataDtoNames { celkem = "celkem", navrh = "navrh", vyveseno = "vyveseno", sejmuto = "sejmuto", zruseno = "zruseno", vyvesenoPredTerminem = "vyvesenoPredTerminem", vyvesenoTed = "vyvesenoTed", vyveseneDoVyveseni = "vyveseneDoVyveseni", navrhyDoVyveseni = "navrhyDoVyveseni", vyveseneDoSejmuti = "vyveseneDoSejmuti",}
	const enum GScoreDataDtoFragments { celkem = "*", navrh = "*", vyveseno = "*", sejmuto = "*", zruseno = "*", vyvesenoPredTerminem = "*", vyvesenoTed = "*", vyveseneDoVyveseni = "*", navrhyDoVyveseni = "*", vyveseneDoSejmuti = "*",}
	const enum GScoreDataDtoTypes { celkem = "number", navrh = "number", vyveseno = "number", sejmuto = "number", zruseno = "number", vyvesenoPredTerminem = "number", vyvesenoTed = "number", vyveseneDoVyveseni = "number", navrhyDoVyveseni = "number", vyveseneDoSejmuti = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GUdecszvDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:udecszv
	*      udecszv
	*/
	interface GUdecszvDto {
		s_zverej?: number|null;
		s_zverej_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GUdecszvDtoNames { s_zverej = "s_zverej", s_zverej_txt = "s_zverej_txt", k_v = "k_v", k_s = "k_s",}
	const enum GUdecszvDtoFragments { s_zverej = "*", s_zverej_txt = "*", k_v = "*", k_s = "*",}
	const enum GUdecszvDtoTypes { s_zverej = "number", s_zverej_txt = "string", k_v = "number", k_s = "string",}
	const enum GUdecszvDtoTypeLengths { s_zverej_txt = 100, k_s = 15,}
	/**Filter*/
	const enum GFilterUdecszv {
		/**Stav zveřejnění*/
		s_zverej,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GUdespskDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:udespsk
	*      udespsk
	*/
	interface GUdespskDto {
		ixs_psk?: string|null;
		zadost_id?: string|null;
		dokument_id?: string|null;
		s_zverej?: number|null;
		message_id?: string|null;
		correlation_id?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		s_zverej_txt_orig?: string|null;
	}
	const enum GUdespskDtoNames { ixs_psk = "ixs_psk", zadost_id = "zadost_id", dokument_id = "dokument_id", s_zverej = "s_zverej", message_id = "message_id", correlation_id = "correlation_id", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", s_zverej_txt_orig = "s_zverej_txt_orig",}
	const enum GUdespskDtoFragments { ixs_psk = "*", zadost_id = "*", dokument_id = "*", s_zverej = "*", message_id = "*", correlation_id = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", s_zverej_txt_orig = "*",}
	const enum GUdespskDtoTypes { ixs_psk = "string", zadost_id = "string", dokument_id = "string", s_zverej = "number", message_id = "string", correlation_id = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", s_zverej_txt_orig = "string",}
	const enum GUdespskDtoTypeLengths { ixs_psk = 12, zadost_id = 36, dokument_id = 36, message_id = 36, correlation_id = 36, zmenu_prov = 12, ixs_lpc = 12, s_zverej_txt_orig = 500,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GUdeszudDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:udeszud*/
	interface GUdeszudDto {
		/**DBCOLUMN:udeszud.ixs_zud*/
		ixs_zud?: string|null;
		/**DBCOLUMN:udeszud.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:udeszud.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:udeszud.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:udeszud.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GUdeszudDtoNames { ixs_zud = "ixs_zud", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUdeszudDtoFragments { ixs_zud = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUdeszudDtoTypes { ixs_zud = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GUdeszudDtoTypeLengths { ixs_zud = 12, nazev = 100, zmenu_prov = 12,}
	/**Filter*/
	const enum GFilterUdeszud {
		/**Primární klíč*/
		ixs_zud,
		/**aktivita*/
		aktivita,
		/**zmenu_prov*/
		zmenu_prov,
		/**dat_zmena*/
		dat_zmena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GUredniDeskaDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:wflsulz*/
	interface GUredniDeskaDto {
		/**Interní ID pro skupinu úložišť elektronických dokumentů*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:wflsulz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsulz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:wflsulz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsulz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsulz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Příznak, že tato skupina úložišť je určena pro publikování*/
		priz_pub?: number|null;
		/**Příznak, že tato skupina úložišť je určena pro úřední desku*/
		priz_ud?: number|null;
		/**Příznak, zda je tento záznam určen pro všechna střediska [0] nebo zda je určen pouze pro výčet středisek spisových uzlů [1]*/
		priz_vycet?: number|null;
	}
	const enum GUredniDeskaDtoNames { ixs_ulz = "ixs_ulz", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pub = "priz_pub", priz_ud = "priz_ud", priz_vycet = "priz_vycet",}
	const enum GUredniDeskaDtoFragments { ixs_ulz = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_pub = "*", priz_ud = "*", priz_vycet = "*",}
	const enum GUredniDeskaDtoTypes { ixs_ulz = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pub = "number", priz_ud = "number", priz_vycet = "number",}
	const enum GUredniDeskaDtoTypeLengths { ixs_ulz = 12, nazev = 50, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GUredniDeskaZaznamDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Rozšířený detail o referenty*/
	interface GUredniDeskaZaznamDto extends Gordic.Uda.Interface.SeznamDokumentuUDDto {
		/**Nazev referenta*/
		nazev_ref?: string|null;
		/**Kdo provedl změnu záznamu*/
		zmenu_prov_txt?: string|null;
		/**Kdo schálil zaznam*/
		zmp_schval_txt?: string|null;
		/**Příznak zda je favorite*/
		favorite_int?: number|null;
		/**Název úřední desky v čitelné podobě*/
		ixs_ulz_txt?: string|null;
		/**Důvod storna*/
		duvod_storno?: string|null;
	}
	const enum GUredniDeskaZaznamDtoNames { nazev_ref = "nazev_ref", zmenu_prov_txt = "zmenu_prov_txt", zmp_schval_txt = "zmp_schval_txt", favorite_int = "favorite_int", ixs_ulz_txt = "ixs_ulz_txt", duvod_storno = "duvod_storno", ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", dat_od = "dat_od", dat_do = "dat_do", nazev_kat = "nazev_kat", ktg_dms = "ktg_dms", ixs_ulz = "ixs_ulz", nazev = "nazev", soubor = "soubor", popis = "popis", poznamka = "poznamka", s_ude = "s_ude", stav = "stav", ixs_fun_ozn = "ixs_fun_ozn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_zmp_schval = "ixs_zmp_schval", dat_schval = "dat_schval", ixs_zud = "ixs_zud", nazev_zdroj = "nazev_zdroj", cj = "cj", ixp_wflspid = "ixp_wflspid", cj_wflspid = "cj_wflspid", ofic_nazev = "ofic_nazev", stav_ude = "stav_ude", stav_por = "stav_por", pocet_priloh = "pocet_priloh", ico = "ico", s_orig = "s_orig", por_cislo_kopie = "por_cislo_kopie", por_cislo_orig = "por_cislo_orig",}
	const enum GUredniDeskaZaznamDtoFragments { nazev_ref = "*", zmenu_prov_txt = "*", zmp_schval_txt = "*", favorite_int = "*", ixs_ulz_txt = "*", duvod_storno = "*", ixs_ulo = "*", por_cislo = "*", dat_od = "*", dat_do = "*", nazev_kat = "*", ktg_dms = "*", ixs_ulz = "*", nazev = "*", soubor = "*", popis = "*", poznamka = "*", s_ude = "*", stav = "*", ixs_fun_ozn = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_zmp_schval = "*", dat_schval = "*", ixs_zud = "*", nazev_zdroj = "*", cj = "*", ixp_wflspid = "*", cj_wflspid = "*", ofic_nazev = "*", stav_ude = "*", stav_por = "*", pocet_priloh = "*", ico = "*", s_orig = "*", por_cislo_kopie = "*", por_cislo_orig = "*",}
	const enum GUredniDeskaZaznamDtoTypes { nazev_ref = "string", zmenu_prov_txt = "string", zmp_schval_txt = "string", favorite_int = "number", ixs_ulz_txt = "string", duvod_storno = "string", ixs_ulo = "string", por_cislo = "number", dat_od = "JsonDate", dat_do = "JsonDate", nazev_kat = "string", ktg_dms = "string", ixs_ulz = "string", nazev = "string", soubor = "string", popis = "string", poznamka = "string", s_ude = "number", stav = "string", ixs_fun_ozn = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_zmp_schval = "string", dat_schval = "JsonDate", ixs_zud = "string", nazev_zdroj = "string", cj = "string", ixp_wflspid = "string", cj_wflspid = "string", ofic_nazev = "string", stav_ude = "number", stav_por = "number", pocet_priloh = "number", ico = "string", s_orig = "number", por_cislo_kopie = "number", por_cislo_orig = "number",}
	const enum GUredniDeskaZaznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GWfldulzDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**DBTABLE:wfldulz*/
	interface GWfldulzDto {
		/**DBCOLUMN:wfldulz.ixs_ulz*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:wfldulz.ktg_dms*/
		ktg_dms?: string|null;
		/**DBCOLUMN:wfldulz.ktg_dms_nad*/
		ktg_dms_nad?: string|null;
		/**DBCOLUMN:wfldulz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wfldulz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:wfldulz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wfldulz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wfldulz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wfldulz.ude_sejmuti_dne*/
		ude_sejmuti_dne?: number|null;
	}
	const enum GWfldulzDtoNames { ixs_ulz = "ixs_ulz", ktg_dms = "ktg_dms", ktg_dms_nad = "ktg_dms_nad", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ude_sejmuti_dne = "ude_sejmuti_dne",}
	const enum GWfldulzDtoFragments { ixs_ulz = "*", ktg_dms = "*", ktg_dms_nad = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ude_sejmuti_dne = "*",}
	const enum GWfldulzDtoTypes { ixs_ulz = "string", ktg_dms = "string", ktg_dms_nad = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ude_sejmuti_dne = "number",}
	const enum GWfldulzDtoTypeLengths { ixs_ulz = 12, ktg_dms = 50, ktg_dms_nad = 50, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Dto\GZmenStavDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Objekt pro převod starého změnového objektu do nového a naopak
	*     Typescript nepředává objekt s cizími klíči
	*/
	interface GZmenStavDto {
		/**PK - ixs_ulo*/
		ixs_ulo?: string|null;
		/**PK - por_cislo*/
		por_cislo?: number|null;
		/**zda nechat pozdější vyvěšeno dne*/
		nechatPozdejsiVyveseno?: boolean|null;
		/**při znovuvyvěšení ponechat jako návrh*/
		ulozitNavrh?: boolean|null;
		/**zda povolit Storno sejmutého záznamu*/
		povolitSejmutoZruseno?: boolean|null;
		/**výsledek operace*/
		vysledek?: Gordic.Uda.Interface.VysledekEnum|null;
		/**textový výsledek operace*/
		vysledekTxt?: string|null;
		/**výsledné s_ude*/
		new_s_ude?: number|null;
		/**výsledný dat_od*/
		new_dat_od?: JsonDate|null;
		/**výsledný dat_do*/
		new_dat_do?: JsonDate|null;
		/**Důvod storna*/
		duvod_storno?: string|null;
	}
	const enum GZmenStavDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", nechatPozdejsiVyveseno = "nechatPozdejsiVyveseno", ulozitNavrh = "ulozitNavrh", povolitSejmutoZruseno = "povolitSejmutoZruseno", vysledek = "vysledek", vysledekTxt = "vysledekTxt", new_s_ude = "new_s_ude", new_dat_od = "new_dat_od", new_dat_do = "new_dat_do", duvod_storno = "duvod_storno",}
	const enum GZmenStavDtoFragments { ixs_ulo = "*", por_cislo = "*", nechatPozdejsiVyveseno = "*", ulozitNavrh = "*", povolitSejmutoZruseno = "*", vysledek = "*", vysledekTxt = "*", new_s_ude = "*", new_dat_od = "*", new_dat_do = "*", duvod_storno = "*",}
	const enum GZmenStavDtoTypes { ixs_ulo = "string", por_cislo = "number", nechatPozdejsiVyveseno = "boolean", ulozitNavrh = "boolean", povolitSejmutoZruseno = "boolean", vysledek = "Gordic.Uda.Interface.VysledekEnum", vysledekTxt = "string", new_s_ude = "number", new_dat_od = "JsonDate", new_dat_do = "JsonDate", duvod_storno = "string",}
	const enum GZmenStavDtoTypeLengths {}
	/**Prázdn7 enum pro filter*/
	const enum GFilterZmenStav {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Enums\VysledekEnum.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Popisuje stav výsledku operace*/
	const enum VysledekEnum {
		/**vše OK*/
		OK,
		/**provedeno, ale s doprovodnou informací*/
		OK_Info,
		/**neprovedeno*/
		Cancel,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Import\GImportKuzlDokumentDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Dokument (soubor) vyvěšovaného záznamu, v XML je i VELIKOST, ale to si spočítáme sami*/
	interface GImportKuzlDokumentDto {
		/**Pořadové číslo souboru v XML (1..n)*/
		id?: number|null;
		/**Název souboru*/
		nazev?: string|null;
		/**URL*/
		url?: string|null;
		/**Originální jméno souboru*/
		fileName?: string|null;
		/**Lokální cesta po uložení na disk (obsahuje změněné jméno souboru)*/
		path?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**ixs_ulo*/
		ixs_ulo?: string|null;
		/**zda download dopadl*/
		isDownloaded?: boolean|null;
	}
	const enum GImportKuzlDokumentDtoNames { id = "id", nazev = "nazev", url = "url", fileName = "fileName", path = "path", ixb = "ixb", ixs_ulo = "ixs_ulo", isDownloaded = "isDownloaded",}
	const enum GImportKuzlDokumentDtoFragments { id = "*", nazev = "*", url = "*", fileName = "*", path = "*", ixb = "*", ixs_ulo = "*", isDownloaded = "*",}
	const enum GImportKuzlDokumentDtoTypes { id = "number", nazev = "string", url = "string", fileName = "string", path = "string", ixb = "string", ixs_ulo = "string", isDownloaded = "boolean",}
	const enum GImportKuzlDokumentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Import\GImportKuzlDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Odpověď na import, vyvěšený záznam je identifikován hodnotou ixs_ulo a por_cislo*/
	interface GImportKuzlDto {
		/**Pořadí záznamu v XML (1..n)*/
		id?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Kategorie - id*/
		ktg_dms?: string|null;
		/**Kategorie - název*/
		kategorie?: string|null;
		/**Datum vyvěšení*/
		datum_zverejneni?: JsonDate|null;
		/**Datum sejmutí*/
		datum_sejmuti?: JsonDate|null;
		/**Pořadové číslo*/
		cj?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Dokumenty (soubory)*/
		dokumenty?: Gordic.Uda.Interface.GImportKuzlDokumentDto[]|null;
		/**Pracovní adresář*/
		pracovni_adresar?: string|null;
		/**ID úřední desky*/
		ixs_ulz?: string|null;
	}
	const enum GImportKuzlDtoNames { id = "id", nazev = "nazev", ktg_dms = "ktg_dms", kategorie = "kategorie", datum_zverejneni = "datum_zverejneni", datum_sejmuti = "datum_sejmuti", cj = "cj", popis = "popis", dokumenty = "dokumenty", pracovni_adresar = "pracovni_adresar", ixs_ulz = "ixs_ulz",}
	const enum GImportKuzlDtoFragments { id = "*", nazev = "*", ktg_dms = "*", kategorie = "*", datum_zverejneni = "*", datum_sejmuti = "*", cj = "*", popis = "*", dokumenty = "*", pracovni_adresar = "*", ixs_ulz = "*",}
	const enum GImportKuzlDtoTypes { id = "number", nazev = "string", ktg_dms = "string", kategorie = "string", datum_zverejneni = "JsonDate", datum_sejmuti = "JsonDate", cj = "string", popis = "string", dokumenty = "Gordic.Uda.Interface.GImportKuzlDokumentDto[]", pracovni_adresar = "string", ixs_ulz = "string",}
	const enum GImportKuzlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Import\GImportKuzlKategorieDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Seznam kategorií v XML KUZL*/
	interface GImportKuzlKategorieDto {
		/**ID úřední desky*/
		ixs_ulz?: string|null;
		/**Seznam kategorií*/
		kategorieList?: Gordic.Uda.Interface.GImportKuzlKategorieItemDto[]|null;
	}
	const enum GImportKuzlKategorieDtoNames { ixs_ulz = "ixs_ulz", kategorieList = "kategorieList",}
	const enum GImportKuzlKategorieDtoFragments { ixs_ulz = "*", kategorieList = "*",}
	const enum GImportKuzlKategorieDtoTypes { ixs_ulz = "string", kategorieList = "Gordic.Uda.Interface.GImportKuzlKategorieItemDto[]",}
	const enum GImportKuzlKategorieDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Import\GImportKuzlKategorieItemDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Seznam kategorií v XML KUZL*/
	interface GImportKuzlKategorieItemDto {
		/**ID kategorie*/
		ktg_dms?: string|null;
		/**Název kategorie*/
		nazev?: string|null;
	}
	const enum GImportKuzlKategorieItemDtoNames { ktg_dms = "ktg_dms", nazev = "nazev",}
	const enum GImportKuzlKategorieItemDtoFragments { ktg_dms = "*", nazev = "*",}
	const enum GImportKuzlKategorieItemDtoTypes { ktg_dms = "string", nazev = "string",}
	const enum GImportKuzlKategorieItemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Import\GImportKuzlOriginalDto.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Položka importu (jeden vyvěšovaný záznam)*/
	interface GImportKuzlOriginalDto {
		/**Pořadí záznamu v XML (1..n)*/
		id?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Kategorie*/
		kategorie?: string|null;
		/**Datum vyvěšení ve formátu "dd.MM.yyyy HH:mm:ss", časová složka se bude ignorovat*/
		datum_zverejneni?: string|null;
		/**Datum sejmutí ve formátu "dd.MM.yyyy HH:mm:ss", časová složka se bude ignorovat*/
		datum_sejmuti?: string|null;
		/**Pořadové číslo*/
		poradove_cislo?: string|null;
		/**Popis*/
		anotace?: string|null;
		/**Dokumenty (soubory)*/
		dokumenty?: Gordic.Uda.Interface.GImportKuzlDokumentDto[]|null;
	}
	const enum GImportKuzlOriginalDtoNames { id = "id", nazev = "nazev", kategorie = "kategorie", datum_zverejneni = "datum_zverejneni", datum_sejmuti = "datum_sejmuti", poradove_cislo = "poradove_cislo", anotace = "anotace", dokumenty = "dokumenty",}
	const enum GImportKuzlOriginalDtoFragments { id = "*", nazev = "*", kategorie = "*", datum_zverejneni = "*", datum_sejmuti = "*", poradove_cislo = "*", anotace = "*", dokumenty = "*",}
	const enum GImportKuzlOriginalDtoTypes { id = "number", nazev = "string", kategorie = "string", datum_zverejneni = "string", datum_sejmuti = "string", poradove_cislo = "string", anotace = "string", dokumenty = "Gordic.Uda.Interface.GImportKuzlDokumentDto[]",}
	const enum GImportKuzlOriginalDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Import\IGImportKuzl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Import záznamů z XML KUZL
	* @domain UredniDeska
	*/
	interface ImportKuzl {
		/**Kontrola záznamů z XML KUZL*/
		transform(rq?:Gordic.Uda.Interface.GImportKuzlOriginalDto|CallParams<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlOriginalDto>>): _Task<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlOriginalDto>,GServiceActionResponse<Gordic.Uda.Interface.GImportKuzlDto>>;
		/**Download souborů dle XML KUZL*/
		download(rq?:Gordic.Uda.Interface.GImportKuzlDto|CallParams<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlDto>>): _Task<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlDto>,GServiceActionResponse<Gordic.Uda.Interface.GImportKuzlDto>>;
		/**Load kategorií*/
		loadKategorie(rq?:Gordic.Uda.Interface.GImportKuzlKategorieDto|CallParams<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlKategorieDto>>): _Task<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlKategorieDto>,GServiceActionResponse<Gordic.Uda.Interface.GImportKuzlKategorieDto>>;
		/**Import záznamů z XML KUZL*/
		loadToGinis(rq?:Gordic.Uda.Interface.GImportKuzlDto|CallParams<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlDto>>): _Task<GServiceActionRequest<Gordic.Uda.Interface.GImportKuzlDto>,GServiceActionResponse<Gordic.Uda.Interface.GImportKuzlDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ImportKuzl: ServiceBase & Catalog.ImportKuzl;
	}
	const ImportKuzl: Client["ImportKuzl"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.GServiceSaveUdaSpecial.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Speci8ln9 po6adavek pro save special*/
	interface GServiceSaveRequestUdaSpecial extends Gordic.Isl.GServiceSaveRequest<Gordic.Uda.Interface.GUredniDeskaZaznamDto> {
		/**Zda se má ukládat historie (slouží u znovuvyvěšení)*/
		SaveHistory?: boolean|null;
	}
	const enum GServiceSaveRequestUdaSpecialNames { SaveHistory = "SaveHistory", data = "data", context = "context",}
	const enum GServiceSaveRequestUdaSpecialFragments { SaveHistory = "*", data = "*", context = "*",}
	const enum GServiceSaveRequestUdaSpecialTypes { SaveHistory = "boolean", data = "Gordic.Uda.Interface.GUredniDeskaZaznamDto", context = "Gordic.General.ApplicationInterface.GRequestContext",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaHistorieZaznamu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro výpis
	* @domain UredniDeska
	*/
	interface UdaHistorieZaznamu {
		/**Metoda pro list*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.HistorieSeznamDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaHistorieZaznamu: ServiceBase & Catalog.UdaHistorieZaznamu;
	}
	const UdaHistorieZaznamu: Client["UdaHistorieZaznamu"];
}
declare namespace Gordic.Uda.Interface {
	/**Filter pro Historii zaznamu*/
	const enum GFilterHistorieSeznam {
		/**ixs_ulo*/
		ixs_ulo,
		/**por_cislo*/
		por_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaKalendar.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kalendářové operace pro úřední desku
	* @domain UredniDeska
	*/
	interface UdaKalendar {
		/**Podle zadaného data získá typ dne + dalších 10 dní pro případ kdy by den nebyl pracovní*/
		ziskatDnyPoDatu(rq?:CallParams<{datum:JsonDate}>): _Task<{datum:JsonDate},Gordic.Uda.Interface.GDenKalendar[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaKalendar: ServiceBase & Catalog.UdaKalendar;
	}
	const UdaKalendar: Client["UdaKalendar"];
}
declare namespace Gordic.Uda.Interface {
	/**Pomocný enum pro filter*/
	const enum GUdaKalendarFilter {
	}
	/**Kalendářní den*/
	interface GDenKalendar {
		/**Typ dne*/
		typ_dne?: Gordic.Uda.Interface.GTypDen|null;
		/**Datum*/
		datum?: JsonDate|null;
		/**Den v týdnu*/
		den_tyd?: number|null;
	}
	const enum GDenKalendarNames { typ_dne = "typ_dne", datum = "datum", den_tyd = "den_tyd",}
	const enum GDenKalendarFragments { typ_dne = "*", datum = "*", den_tyd = "*",}
	const enum GDenKalendarTypes { typ_dne = "Gordic.Uda.Interface.GTypDen", datum = "JsonDate", den_tyd = "number",}
	const enum GDenKalendarTypeLengths {}
	/**Typ dne*/
	const enum GTypDen {
		/**Neurčeno*/
		neurceno=0,
		/**Pracovní den*/
		pracovni=10,
		/**Pracovní volno*/
		pracovniVolno=20,
		/**Pracovní klid*/
		pracovniKlid=30,
		/**Státní svátek*/
		statniSvatek=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaKategorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro správu kategorií
	* @domain UredniDeska
	*/
	interface UdaKategorie {
		/**Upsert metoda*/
		upsert(rq?:Gordic.Uda.Interface.GWfldulzDto|CallParams<GServiceSaveRequest<Gordic.Uda.Interface.GWfldulzDto>>): _Task<GServiceSaveRequest<Gordic.Uda.Interface.GWfldulzDto>,GServiceSaveResponse<Gordic.Uda.Interface.GWfldulzDto>>;
		/**Upsert metoda*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.GWfldulzExtDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaKategorie: ServiceBase & Catalog.UdaKategorie;
	}
	const UdaKategorie: Client["UdaKategorie"];
}
declare namespace Gordic.Uda.Interface {
	/**Filter pro kategorie*/
	const enum GFilterUdaKategorie {
		/**Úložiště*/
		ixs_ulz,
		/**ktg_dms*/
		ktg_dms,
		/**aktivita*/
		aktivita,
	}
	/**Rozšíření základního objektu*/
	interface GWfldulzExtDto extends Gordic.Uda.Interface.GWfldulzDto {
		/**Textová reprezentace úložiště*/
		ixs_ulz_txt?: string|null;
	}
	const enum GWfldulzExtDtoNames { ixs_ulz_txt = "ixs_ulz_txt", ixs_ulz = "ixs_ulz", ktg_dms = "ktg_dms", ktg_dms_nad = "ktg_dms_nad", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ude_sejmuti_dne = "ude_sejmuti_dne",}
	const enum GWfldulzExtDtoFragments { ixs_ulz_txt = "*", ixs_ulz = "*", ktg_dms = "*", ktg_dms_nad = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ude_sejmuti_dne = "*",}
	const enum GWfldulzExtDtoTypes { ixs_ulz_txt = "string", ixs_ulz = "string", ktg_dms = "string", ktg_dms_nad = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ude_sejmuti_dne = "number",}
	const enum GWfldulzExtDtoTypeLengths { ixs_ulz = 12, ktg_dms = 50, ktg_dms_nad = 50, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaSoubory.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro pr8ci se soubory
	* @domain UredniDeska
	*/
	interface UdaSoubory {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.SeznamPrilohDto>>;
		/**ListHistory*/
		listHistory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.SeznamPrilohDto>>;
		/**Vrácení poštu změn v souborech (je potřeba při změně pořadí)*/
		getHistoryCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Posun prilohz nahoru a dolu*/
		updatePosun(rq?:CallParams<{prilohaUp:Gordic.Uda.Interface.SeznamPrilohDto,prilohaDown:Gordic.Uda.Interface.SeznamPrilohDto,history_count:number}>): _Task<{prilohaUp:Gordic.Uda.Interface.SeznamPrilohDto,prilohaDown:Gordic.Uda.Interface.SeznamPrilohDto,history_count:number},void>;
		/**Aktualizace poynámky*/
		updatePoznamka(rq?:CallParams<{priloha:Gordic.Uda.Interface.SeznamPrilohDto}>): _Task<{priloha:Gordic.Uda.Interface.SeznamPrilohDto},void>;
		/**Insert*/
		insert(rq?:Gordic.Uda.Interface.SeznamPrilohDto|CallParams<GServiceSaveRequest<Gordic.Uda.Interface.SeznamPrilohDto>>): _Task<GServiceSaveRequest<Gordic.Uda.Interface.SeznamPrilohDto>,GServiceSaveResponse<Gordic.Uda.Interface.SeznamPrilohDto>>;
		/**Remove*/
		remove(rq?:CallParams<{priloha:Gordic.Uda.Interface.SeznamPrilohDto,newZaznam:boolean}>): _Task<{priloha:Gordic.Uda.Interface.SeznamPrilohDto,newZaznam:boolean},void>;
		/**Získání maximaixs%ulo (především pro SSL, kdyřž se znovu vyvěšuje ze stejného dokumentu)*/
		getMaxPorCislo(rq?:CallParams<{priloha:Gordic.Uda.Interface.SeznamPrilohDto}>): _Task<{priloha:Gordic.Uda.Interface.SeznamPrilohDto},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaSoubory: ServiceBase & Catalog.UdaSoubory;
	}
	const UdaSoubory: Client["UdaSoubory"];
}
declare namespace Gordic.Uda.Interface {
	/**Filete*/
	const enum GFilterSeznamPriloh {
		/**ixs_ulo*/
		ixs_ulo,
		/**por_cislo*/
		por_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaUdalosti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro udalosti
	* @domain UredniDeska
	*/
	interface UdaUdalosti {
		/**Znovuvyvěšení dokumnetu*/
		znovuVyvesit(rq?:CallParams<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto}>): _Task<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto},Gordic.Uda.Interface.GZmenStavDto>;
		/**Vyveseni položky na úřední desku*/
		vyvesit(rq?:CallParams<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto}>): _Task<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto},Gordic.Uda.Interface.GZmenStavDto>;
		/**Vyveseni položek na úřední desku*/
		vyvesitHromadne(rq?:CallParams<{zmenStavArray:Gordic.Uda.Interface.GZmenStavDto[]}>): _Task<{zmenStavArray:Gordic.Uda.Interface.GZmenStavDto[]},Gordic.Uda.Interface.GZmenStavDto[]>;
		/**Sejmutí položky z úřední desky*/
		sejmout(rq?:CallParams<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto}>): _Task<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto},Gordic.Uda.Interface.GZmenStavDto>;
		/**Hromadné sejmutí položek z úřední desky*/
		sejmoutHromadne(rq?:CallParams<{zmenStavArray:Gordic.Uda.Interface.GZmenStavDto[]}>): _Task<{zmenStavArray:Gordic.Uda.Interface.GZmenStavDto[]},Gordic.Uda.Interface.GZmenStavDto[]>;
		/**Storno položky na úřední desce*/
		storno(rq?:CallParams<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto}>): _Task<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto},Gordic.Uda.Interface.GZmenStavDto>;
		/**Stormo hromadne*/
		stornoHromadne(rq?:CallParams<{zmenStavArray:Gordic.Uda.Interface.GZmenStavDto[]}>): _Task<{zmenStavArray:Gordic.Uda.Interface.GZmenStavDto[]},Gordic.Uda.Interface.GZmenStavDto[]>;
		/**Automatické sejmutí*/
		automatickeSejmuti(rq?:CallParams<{}>): _Task<{},void>;
		/**Dokončení připravy návrhu*/
		pripravitNavrh(rq?:CallParams<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto}>): _Task<{zmenStavDto:Gordic.Uda.Interface.GZmenStavDto},Gordic.Uda.Interface.GZmenStavDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaUdalosti: ServiceBase & Catalog.UdaUdalosti;
	}
	const UdaUdalosti: Client["UdaUdalosti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaZdroje.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro zdroje informací pro úřední desku
	* @domain UredniDeska
	*/
	interface UdaZdroje {
		/**Aktualizace nebo přidání nového zdroje pro úřední desku*/
		upsert(rq?:Gordic.Uda.Interface.CiselnikZdrojuDto|CallParams<GServiceSaveRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>>): _Task<GServiceSaveRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>,GServiceSaveResponse<Gordic.Uda.Interface.CiselnikZdrojuDto>>;
		/**Aktualizace nebo přidání nového zdroje pro úřední desku*/
		read(rq?:Gordic.Uda.Interface.CiselnikZdrojuDto|CallParams<GServiceReadRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>>): _Task<GServiceReadRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>,GServiceReadResponse<Gordic.Uda.Interface.CiselnikZdrojuDto>>;
		/**Zneaktivnění zdroje pro úřední desku*/
		delete(rq?:Gordic.Uda.Interface.CiselnikZdrojuDto|CallParams<GServiceSaveRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>>): _Task<GServiceSaveRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>,GServiceSaveRequest<Gordic.Uda.Interface.CiselnikZdrojuDto>>;
		/**Zneaktivnění zdroje pro úřední desku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.CiselnikZdrojuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaZdroje: ServiceBase & Catalog.UdaZdroje;
	}
	const UdaZdroje: Client["UdaZdroje"];
}
declare namespace Gordic.Uda.Interface {
	/**Filtrační parametr zdroje*/
	const enum GFilterUdaZdroje {
		/**ixs_zuud*/
		ixs_zud,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUdaZverejneniNaCUET.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro zveřejnění na CUET
	* @domain UredniDeska
	*/
	interface UdaZverejneniNaCUET {
		/**Upsert metoda*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.GUdaZverejneniNaCUETDto>>;
		/**Počet záznamů k zobrazení*/
		getCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Na4ten9 detailn9ch dat k zveřejnění na CUET*/
		read(rq?:Gordic.Uda.Interface.GUdaZverejneniNaCUETDto|CallParams<GServiceReadRequest<Gordic.Uda.Interface.GUdaZverejneniNaCUETDto>>): _Task<GServiceReadRequest<Gordic.Uda.Interface.GUdaZverejneniNaCUETDto>,GServiceReadResponse<Gordic.Uda.Interface.GUdaZverejneniNaCUETDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdaZverejneniNaCUET: ServiceBase & Catalog.UdaZverejneniNaCUET;
	}
	const UdaZverejneniNaCUET: Client["UdaZverejneniNaCUET"];
}
declare namespace Gordic.Uda.Interface {
	/**Dto pro zveřejnění na CUET*/
	interface GUdaZverejneniNaCUETDto extends Gordic.Uda.Interface.GUdespskDto {
		/**Identifikátor vyvěšení*/
		ixs_ulo?: string|null;
		/**Pořadové číslo zveřejnění*/
		por_cislo?: number|null;
		/**Nazev vyvěšení*/
		nazev_vyveseni?: string|null;
		/**Název souboru*/
		soubor?: string|null;
		/**Textová reprezentace stavu zveřejnění*/
		s_zverej_txt?: string|null;
		/**Textová reprrezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**IXP*/
		ixp?: string|null;
		/**Textová reprezentace úřední desky*/
		ixs_ulz_txt?: string|null;
	}
	const enum GUdaZverejneniNaCUETDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", nazev_vyveseni = "nazev_vyveseni", soubor = "soubor", s_zverej_txt = "s_zverej_txt", zmenu_prov_txt = "zmenu_prov_txt", ixp = "ixp", ixs_ulz_txt = "ixs_ulz_txt", ixs_psk = "ixs_psk", zadost_id = "zadost_id", dokument_id = "dokument_id", s_zverej = "s_zverej", message_id = "message_id", correlation_id = "correlation_id", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", s_zverej_txt_orig = "s_zverej_txt_orig",}
	const enum GUdaZverejneniNaCUETDtoFragments { ixs_ulo = "*", por_cislo = "*", nazev_vyveseni = "*", soubor = "*", s_zverej_txt = "*", zmenu_prov_txt = "*", ixp = "*", ixs_ulz_txt = "*", ixs_psk = "*", zadost_id = "*", dokument_id = "*", s_zverej = "*", message_id = "*", correlation_id = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", s_zverej_txt_orig = "*",}
	const enum GUdaZverejneniNaCUETDtoTypes { ixs_ulo = "string", por_cislo = "number", nazev_vyveseni = "string", soubor = "string", s_zverej_txt = "string", zmenu_prov_txt = "string", ixp = "string", ixs_ulz_txt = "string", ixs_psk = "string", zadost_id = "string", dokument_id = "string", s_zverej = "number", message_id = "string", correlation_id = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", s_zverej_txt_orig = "string",}
	const enum GUdaZverejneniNaCUETDtoTypeLengths { ixs_psk = 12, zadost_id = 36, dokument_id = 36, message_id = 36, correlation_id = 36, zmenu_prov = 12, ixs_lpc = 12, s_zverej_txt_orig = 500,}
	/**Filter pro kategorie*/
	const enum GUdaZverejneniNaCUETFilterEnum {
		/**Identifikátor zveřejnění na CUET*/
		ixs_psk,
		/**Stav zveřejnění*/
		s_zverej,
		/**Identifikátor úložiště*/
		ixs_ulz,
		/**Hledání podle názvu vyvěšení*/
		nazev_vyveseni,
		/**Hledání podle souboru*/
		soubor,
		/**Hledání podle id žádosti*/
		zadost_id,
		/**Hledání podle id datové zprávy*/
		message_id,
		/**HLedání podle id konverzace*/
		correlation_id,
		/**Pid dokumentu*/
		ixp,
		/**Datum změny od*/
		dat_zmena_od,
		/**Datum změny do*/
		dat_zmena_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUredniDeska.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Metody pro vyber uredni desky
	* @domain UredniDeska
	*/
	interface UredniDeska {
		/**Výpis dostupných úředních desek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.GUredniDeskaDto>>;
		/**Read*/
		read(rq?:Gordic.Uda.Interface.GUredniDeskaDto|CallParams<GServiceReadRequest<Gordic.Uda.Interface.GUredniDeskaDto>>): _Task<GServiceReadRequest<Gordic.Uda.Interface.GUredniDeskaDto>,GServiceReadResponse<Gordic.Uda.Interface.GUredniDeskaDto>>;
		/**Zda databáze povoluje znovuvyvěšení*/
		canRepeatVyveseni(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Zda je povoleno automatické vyvěšování ze SSL*/
		povolenoAutomatickeVyveseni(rq?:CallParams<{}>): _Task<{},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UredniDeska: ServiceBase & Catalog.UredniDeska;
	}
	const UredniDeska: Client["UredniDeska"];
}
declare namespace Gordic.Uda.Interface {
	/**GFilterUserniDeska*/
	const enum GFilterUserniDeska {
		/**ixs_ulz*/
		ixs_ulz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\ISL\Gordic.Uda.Interface.IGUredniDeskaObsah.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro obsah úřední desky
	* @domain UredniDeska
	*/
	interface UredniDeskaObsah {
		/**Výpis dokumentů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.GUredniDeskaZaznamDto>>;
		/**Posledně modifikované*/
		lastModified(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uda.Interface.GUredniDeskaZaznamDto>>;
		/**Ulození*/
		upsert(rq?:CallParams<{rq:Gordic.Uda.Interface.GServiceSaveRequestUdaSpecial}>): _Task<{rq:Gordic.Uda.Interface.GServiceSaveRequestUdaSpecial},GServiceSaveResponse<Gordic.Uda.Interface.GUredniDeskaZaznamDto>>;
		/**Read jeden záznam*/
		read(rq?:Gordic.Uda.Interface.GUredniDeskaZaznamDto|CallParams<GServiceReadRequest<Gordic.Uda.Interface.GUredniDeskaZaznamDto>>): _Task<GServiceReadRequest<Gordic.Uda.Interface.GUredniDeskaZaznamDto>,GServiceReadRequest<Gordic.Uda.Interface.GUredniDeskaZaznamDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UredniDeskaObsah: ServiceBase & Catalog.UredniDeskaObsah;
	}
	const UredniDeskaObsah: Client["UredniDeskaObsah"];
}
declare namespace Gordic.Uda.Interface {
	/**Filtrační parametry proobsah úřední desky*/
	const enum GFilterUredniDeskaObsah {
		/**soubor*/
		ixs_ulo,
		/**interní ID zásilky*/
		por_cislo,
		/**aktivita*/
		aktivita,
		/**úložiště*/
		ixs_ulz,
		/**datum od*/
		dat_od,
		/**datum do*/
		dat_do,
		/**stav dokumnetu na úřední desce*/
		s_ude,
		/**kategorie pro zveřejnění*/
		ktg_dms,
		/**název*/
		nazev,
		/**identifikátor dokumnetu*/
		ixp,
		/**identifikátor dokumnetu*/
		ixp_wflspid,
		/**zda je vyvěšeno na úření desku*/
		stav_ude,
		/**zda je vyvěšeno na portál veřejné správy*/
		stav_por,
		/**vypsat záznamy organizační jednotky*/
		ginszmp_ixs_orj_in,
		/**vypsat záznamy organizační jednotky přihlášené funkce*/
		ginszmp_ixs_orj,
		/**vypsat záznamy které vyvěsilo má funkční místo*/
		ixs_fun_ozn,
		/**přihodit smk*/
		prihod_sml,
		/**ICO smluvní strany*/
		ginsesu_ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.Interface\Wfldude\Gordic.Uda.Interface.IGWfldudeEnum.d.ts 

declare namespace Gordic.Uda.Interface {
	/**Hodnoty sloupce wfldude.s_ude*/
	const enum Wfldude_s_ude {
		/**Návrh = 0*/
		Navrh=0,
		/**Vyvěšeno = 10*/
		Vyveseno=10,
		/**Zrušeno = 20*/
		Zruseno=20,
		/**Sejmuto = 30*/
		Sejmuto=30,
	}
	/**Výčet filtračních kritérii*/
	const enum FilWfldudeEnum {
		/**varchar(12)*/
		ixs_ulo,
		/**int*/
		por_cislo,
		/**datetime*/
		dat_od,
		/**datetime*/
		dat_do,
		/**varchar(12)*/
		ixs_ulz,
		/**varchar(50)*/
		ktg_dms,
		/**varchar(254)*/
		nazev,
		/**varchar(254)*/
		soubor,
		/**varchar(254)*/
		popis,
		/**varchar(254)*/
		poznamka,
		/**smallint*/
		s_ude,
		/**varchar(12)*/
		ixs_fun_ozn,
		/**smallint*/
		aktivita,
		/**datetime*/
		dat_zmena,
		/**varchar(12)*/
		zmenu_prov,
		/**varchar(12)*/
		ixs_zmp_schval,
		/**datetime*/
		dat_schval,
		/**varchar(12)*/
		ixs_zud,
		/**varchar(50)*/
		cj,
		/**varchar(12)*/
		ixp,
		/**varchar(12)*/
		ixs_zmp_ozn,
		/**smallint - >zda vyvěšeno na uředni desku*/
		stav_ude,
		/**smallint - zda vyvěšeno na portál veř. správy*/
		stav_por,
		/**pro filtrování podle ginszmp.ixs_orj přes =*/
		ginszmp_ixs_orj,
		/**pro filtrování podle ginszmp.ixs_orj přes IN*/
		ginszmp_ixs_orj_IN,
		/**přihoď sml*/
		prihod_sml,
		/**ICO smluvní strany*/
		ginsesu_ico,
	}
	/**Tabulka vas.wfldude - sloupce*/
	const enum wfldude {
		/**varchar(12)*/
		ixs_ulo__varchar_12,
		/**int*/
		por_cislo__int,
		/**datetime*/
		dat_od__datetime,
		/**datetime*/
		dat_do__datetime,
		/**varchar(12)*/
		ixs_ulz__varchar_12,
		/**varchar(50)*/
		ktg_dms__varchar_50,
		/**varchar(254)*/
		nazev__varchar_254,
		/**varchar(254)*/
		soubor__varchar_254,
		/**varchar(254)*/
		popis__varchar_254,
		/**varchar(254)*/
		poznamka__varchar_254,
		/**smallint*/
		s_ude__smallint,
		/**varchar(12)*/
		ixs_fun_ozn__varchar_12,
		/**smallint*/
		aktivita__smallint,
		/**datetime*/
		dat_zmena__datetime,
		/**varchar(12)*/
		zmenu_prov__varchar_12,
		/**varchar(12)*/
		ixs_zmp_schval__varchar_12,
		/**datetime*/
		dat_schval__datetime,
		/**varchar(12)*/
		ixs_zud__varchar_12,
		/**varchar(50)*/
		cj__varchar_50,
		/**varchar(12)*/
		ixp__varchar_12,
		/**varchar(12)*/
		ixs_zmp_ozn__varchar_12,
		/**smallint*/
		stav_ude__smallint,
		/**smallint*/
		stav_por__smallint,
		/**varchar(12)*/
		ixp_zve__varchar_12,
		/**varchar(12)*/
		ixs_zve__varchar_12,
		/**smallint*/
		s_orig__smallint,
		/**int*/
		por_cislo_kopie__int,
		/**int*/
		por_cislo_orig__int,
		/**varchar(12)*/
		ixs_lpc__varchar_12,
		/**varchar(254)*/
		duvod_storno__varchar_254,
	}
}

//#endregion

