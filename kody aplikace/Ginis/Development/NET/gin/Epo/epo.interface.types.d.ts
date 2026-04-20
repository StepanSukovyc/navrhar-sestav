/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       epo.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Epo.Interface\Gordic.Epo.Interface.csproj
*    created     2026-02-16 14:34:15
*    files       Dto\Gordic.Epo.Interface.DetailEpoDto.d.ts
*                Dto\Gordic.Epo.Interface.EpospidDto.d.ts
*                Dto\Gordic.Epo.Interface.EpospriDto.d.ts
*                Dto\Gordic.Epo.Interface.GDetailEnableDto.d.ts
*                Dto\Gordic.Epo.Interface.GDetailLabelsDto.d.ts
*                Dto\Gordic.Epo.Interface.GEpoDokRestrikce.Dto.d.ts
*                Dto\Gordic.Epo.Interface.GEpoRestrikce.Dto.d.ts
*                Dto\Gordic.Epo.Interface.GEposesu.Dto.d.ts
*                Dto\Gordic.Epo.Interface.GEpovdatDto.d.ts
*                Dto\Gordic.Epo.Interface.GParamDetailDto.d.ts
*                Dto\Gordic.Epo.Interface.GParamsDetailDto.d.ts
*                Dto\Gordic.Epo.Interface.GUchazeciDto.d.ts
*                Dto\Gordic.Epo.Interface.SeznamDokumentuEpoDto.d.ts
*                Dto\Gordic.Epo.Interface.SeznamEpoDto.d.ts
*                Dto\Const\Gordic.Epo.Interface.GDatPrubehConstDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpocevsDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpockriDto .d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpoclimDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpocpruDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpocspoDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpocssoDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpoctdaDto.d.ts
*                EPO\Controls\Dto\Gordic.Epo.Interface.GEpossopDto.d.ts
*                Filters\Gordic.Epo.Interface.GEpoFiltrDokDto.d.ts
*                Filters\Gordic.Epo.Interface.GEpoFiltrDto.d.ts
*                Filters\Gordic.Epo.Interface.GEpoFiltrUchazeciDto.d.ts
*                Service\Gordic.Epo.Interface.EpospidAllDokPOService.d.ts
*                Service\Gordic.Epo.Interface.EpospidAllDokService.d.ts
*                Service\Gordic.Epo.Interface.EpospidAllElDokPOService.d.ts
*                Service\Gordic.Epo.Interface.EpospidAllElDokService.d.ts
*                Service\Gordic.Epo.Interface.EpospriService.d.ts
*                Service\Gordic.Epo.Interface.IGHledani.d.ts
*                Service\Detail\DatPrubeh\Gordic.Epo.Interface.IGDatPrubeh.d.ts
*                Service\Detail\Detail\Gordic.Epo.Interface.IGDetailPO.d.ts
*                Service\ProdejeOdprodeje\Gordic.Epo.Interface.IGProdejeOdprodeje.d.ts
*                Service\Souteze\Gordic.Epo.Interface.IGSouteze.d.ts
*                Service\Uchazeci\Gordic.Epo.Interface.IGUchazeci.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.DetailEpoDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:Detail*/
	interface DetailEpoDto {
		/**DBCOLUMN:Detail.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Detail.rok_zal*/
		priz_nabedo?: number|null;
		/**DBCOLUMN:Detail.lic*/
		lic?: string|null;
		/**DBCOLUMN:Detail.ico*/
		ico?: string|null;
		/**DBCOLUMN:Detail.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Detail.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:Detail.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Detail.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:Detail.ac*/
		ac?: string|null;
		/**DBCOLUMN:Detail.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Detail.s_po*/
		s_po?: number|null;
		/**DBCOLUMN:Detail.soutez_po*/
		soutez_po?: string|null;
		/**DBCOLUMN:Detail.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Detail.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:Detail.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Detail.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Detail.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zpo*/
		dat_zpo?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Detail.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:Detail.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:Detail.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:Detail.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Detail.cj_po*/
		cj_po?: string|null;
		/**DBCOLUMN:Detail.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Detail.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:Detail.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Detail.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Detail.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Detail.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Detail.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:Detail.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Detail.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Detail.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:Detail.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:Detail.mena*/
		mena?: number|null;
		/**DBCOLUMN:Detail.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Detail.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:Detail.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:Detail.typ_po*/
		typ_po?: number|null;
		/**DBCOLUMN:Detail.dat_ozn*/
		dat_ozn?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_vra*/
		dat_vra?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_uko*/
		dat_uko?: JsonDate|null;
	}
	const enum DetailEpoDtoNames { ixs_pri = "ixs_pri", priz_nabedo = "priz_nabedo", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", nazev = "nazev", s_po = "s_po", soutez_po = "soutez_po", cis_por = "cis_por", s_sou = "s_sou", rezim_pri = "rezim_pri", c = "c", dat_pri = "dat_pri", dat_zpo = "dat_zpo", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp = "ixp", cj_po = "cj_po", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ac_ag = "ac_ag", priz_prip = "priz_prip", priz_view = "priz_view", typ_fin = "typ_fin", pred_urc = "pred_urc", lim_zac = "lim_zac", mena = "mena", c_mena = "c_mena", priz_cast = "priz_cast", dat_sch = "dat_sch", typ_po = "typ_po", dat_ozn = "dat_ozn", dat_vra = "dat_vra", dat_uko = "dat_uko",}
	const enum DetailEpoDtoFragments { ixs_pri = "*", priz_nabedo = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", ac = "*", nazev = "*", s_po = "*", soutez_po = "*", cis_por = "*", s_sou = "*", rezim_pri = "*", c = "*", dat_pri = "*", dat_zpo = "*", dat_zad_p = "*", dat_zad_s = "*", dat_sml_p = "*", dat_sml_s = "*", dat_kos_p = "*", dat_kos_s = "*", dat_real_p = "*", dat_real_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", dat_zmena = "*", zmenu_prov = "*", ixp = "*", cj_po = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ac_ag = "*", priz_prip = "*", priz_view = "*", typ_fin = "*", pred_urc = "*", lim_zac = "*", mena = "*", c_mena = "*", priz_cast = "*", dat_sch = "*", typ_po = "*", dat_ozn = "*", dat_vra = "*", dat_uko = "*",}
	const enum DetailEpoDtoTypes { ixs_pri = "string", priz_nabedo = "number", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", nazev = "string", s_po = "number", soutez_po = "string", cis_por = "number", s_sou = "number", rezim_pri = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zpo = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp = "string", cj_po = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ac_ag = "string", priz_prip = "number", priz_view = "number", typ_fin = "number", pred_urc = "number", lim_zac = "number", mena = "number", c_mena = "JsonDecimal", priz_cast = "number", dat_sch = "JsonDate", typ_po = "number", dat_ozn = "JsonDate", dat_vra = "JsonDate", dat_uko = "JsonDate",}
	const enum DetailEpoDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, nazev = 100, soutez_po = 30, zmenu_prov = 12, ixp = 12, cj_po = 30, poznamka = 254, ixp_den = 12, ac_ag = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.EpospidDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epospid*/
	interface EpospidDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		ixp?: string|null;
		/**Zda jde větví evidence dokladu*/
		evidence_dokladu?: boolean|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnik?: boolean|null;
		/**DBCOLUMN:Seznam.priz_nabedo*/
		priz_nabedo?: number|null;
		vlastnikIdent?: string|null;
		/**vlastnik*/
		vlastnik_nazev?: string|null;
		/**počet záznamů*/
		count?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.s_po_txt*/
		s_po_txt?: string|null;
		/**DBCOLUMN:Seznam.s_po*/
		s_po?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zvz*/
		dat_zvz?: JsonDate|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Detail.soutez_po*/
		soutez_po?: string|null;
		/**DBCOLUMN:Detail.soutez_po_txt*/
		soutez_po_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_s_lhu*/
		dat_s_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_z_lhu*/
		dat_z_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.bu_vl_txt*/
		bu_vl_txt?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.ks*/
		ks?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.ss*/
		ss?: string|null;
		/**DBCOLUMN:Seznam.bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.cis_zve*/
		cis_zve?: string|null;
		/**DBCOLUMN:Seznam.prijal*/
		prijal?: string|null;
		/**epo_stav*/
		epo_stav?: number|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Seznam.stav_ixp*/
		stav_ixp?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		uzo?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.epo_stav_txt*/
		epo_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.esu_naz*/
		esu_naz?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.ukon_txt*/
		ukon_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		je_fin?: string|null;
		po_case?: number|null;
		po_filuta?: number|null;
		ident_zpo?: number|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**kont_osoba*/
		kont_osoba?: string|null;
		/**DBCOLUMN:Seznam.esu_ico*/
		esu_ico?: string|null;
		/**DBCOLUMN:Seznam.esu_rc*/
		esu_rc?: string|null;
		/**DBCOLUMN:Seznam.esu_dic*/
		esu_dic?: string|null;
		/**DBCOLUMN:Seznam.e_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.e_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_zverejneni*/
		dat_zverejneni?: JsonDate|null;
		/**DBCOLUMN:Seznam.zverejnil*/
		zverejnil?: string|null;
		/**DBCOLUMN:Seznam.ktg_dms*/
		ktg_dms?: string|null;
		/**nazev_rf pro wflspid.ixs_fun_akt_nazev*/
		fun_naz?: string|null;
		/**nazev_rf pro wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**wflsepx.typ_elp*/
		priznak?: number|null;
		/**wflctel.typ_elp_txt*/
		priznak_txt?: string|null;
		/**wflsepx.s_sgn*/
		s_sgn_epx?: number|null;
		/**popis_ixb*/
		popis_ixb?: string|null;
		/**soubor*/
		soubor?: string|null;
		/**DBCOLUMN:Seznam.popis_wflsixb*/
		popis_wflsixb?: string|null;
		/**DBCOLUMN:Seznam.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:Seznam.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Seznam.dz_file*/
		dz_file?: JsonDate|null;
		/**wflsepx.s_sgn*/
		priz_elp?: number|null;
		/**wflsixb.typ_soub*/
		typ_soub?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_epospac*/
		ixp_den_epospac?: string|null;
		/**DBCOLUMN:Seznamepo.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:vfpspid.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:vfpspid.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:vfpspid.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:epospid.ixp_pre*/
		ixp_pre?: string|null;
		/**DBCOLUMN:epospid.cj_po*/
		cj_po?: string|null;
		/**DBCOLUMN:epospid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:epospid.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:epospid.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:epospid.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:epospid.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:epospid.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:epospid.ixs_esu_opr*/
		ixs_esu_opr?: string|null;
		/**DBCOLUMN:epospid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:epospid.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:epospid.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:epospid.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:epospid.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:epospid.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:epospid.odu_zz*/
		odu_zz?: number|null;
		/**DBCOLUMN:epospid.cis_kri*/
		cis_kri?: number|null;
		/**DBCOLUMN:epospid.ac_ag_souv*/
		ac_ag_souv?: string|null;
		/**DBCOLUMN:epospid.ixs_pri_souv*/
		ixs_pri_souv?: string|null;
		/**DBCOLUMN:epospid.mena*/
		mena?: number|null;
		/**DBCOLUMN:epospid.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:epospid.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:epospid.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:epospid.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:epospid.c_nav*/
		c_nav?: JsonDecimal|null;
		/**DBCOLUMN:epospid.odu_krk*/
		odu_krk?: string|null;
		/**DBCOLUMN:epospid.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:epospid.typ_po*/
		typ_po?: number|null;
		/**DBCOLUMN:epospid.cis_inz*/
		cis_inz?: string|null;
		/**DBCOLUMN:epospid.c_vys*/
		c_vys?: JsonDecimal|null;
		pr_forma?: string|null;
		/**DBCOLUMN:číslo položky*/
		cislo?: string|null;
		/**DBCOLUMN:ixs_cia položky*/
		ixs_cia?: string|null;
		/**elvz_telefon*/
		elvz_telefon?: string|null;
		/**elvz_nazev*/
		elvz_nazev?: string|null;
		/**elvz_adresa*/
		elvz_adresa?: string|null;
		/**elvz_subjekt*/
		elvz_subjekt?: string|null;
		/**elvz_subjekt_sidlo*/
		elvz_subjekt_sidlo?: string|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
	}
	const enum EpospidDtoNames { vlastnosti = "vlastnosti", ixp = "ixp", evidence_dokladu = "evidence_dokladu", vlastnik = "vlastnik", priz_nabedo = "priz_nabedo", vlastnikIdent = "vlastnikIdent", vlastnik_nazev = "vlastnik_nazev", count = "count", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", popis = "popis", ixs_pri = "ixs_pri", ac = "ac", s_po_txt = "s_po_txt", s_po = "s_po", nazev = "nazev", dat_prij_pod = "dat_prij_pod", cis_por = "cis_por", dat_pis = "dat_pis", dat_zvz = "dat_zvz", c = "c", ixs_krk = "ixs_krk", dat_zad_p = "dat_zad_p", dat_uza_p = "dat_uza_p", dat_sml_p = "dat_sml_p", dat_kos_p = "dat_kos_p", dat_real_p = "dat_real_p", soutez_po = "soutez_po", soutez_po_txt = "soutez_po_txt", dat_p_lhu = "dat_p_lhu", dat_s_lhu = "dat_s_lhu", dat_z_lhu = "dat_z_lhu", bu_vl_txt = "bu_vl_txt", bu_vl = "bu_vl", sk_vl = "sk_vl", ks = "ks", vs = "vs", ss = "ss", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", por_cis_nab = "por_cis_nab", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cis_zve = "cis_zve", prijal = "prijal", epo_stav = "epo_stav", ixp_den = "ixp_den", ukon = "ukon", zda_sml = "zda_sml", ac_ag = "ac_ag", dat_pri = "dat_pri", stav_ixp = "stav_ixp", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", rezim_pri_txt = "rezim_pri_txt", cis_duz_txt = "cis_duz_txt", uzo = "uzo", cis_ner_txt = "cis_ner_txt", pri_pri_txt = "pri_pri_txt", epo_stav_txt = "epo_stav_txt", esu_naz = "esu_naz", ixs_typ_txt = "ixs_typ_txt", ukon_txt = "ukon_txt", je_fin = "je_fin", po_case = "po_case", po_filuta = "po_filuta", ident_zpo = "ident_zpo", jmeno = "jmeno", prijmeni = "prijmeni", kont_osoba = "kont_osoba", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", s_ess = "s_ess", s_ess_txt = "s_ess_txt", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", ktg_dms = "ktg_dms", fun_naz = "fun_naz", ixs_fun_akt = "ixs_fun_akt", priznak = "priznak", priznak_txt = "priznak_txt", s_sgn_epx = "s_sgn_epx", popis_ixb = "popis_ixb", soubor = "soubor", popis_wflsixb = "popis_wflsixb", velikost = "velikost", ixb = "ixb", dz_file = "dz_file", priz_elp = "priz_elp", typ_soub = "typ_soub", ixp_den_epospac = "ixp_den_epospac", ixp_den_nazev = "ixp_den_nazev", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", ixp_pre = "ixp_pre", cj_po = "cj_po", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixs_esu_opr = "ixs_esu_opr", priz_view = "priz_view", typ_fin = "typ_fin", lic_zast = "lic_zast", por_zast = "por_zast", pred_urc = "pred_urc", lim_zac = "lim_zac", odu_zz = "odu_zz", cis_kri = "cis_kri", ac_ag_souv = "ac_ag_souv", ixs_pri_souv = "ixs_pri_souv", mena = "mena", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", c_nav = "c_nav", odu_krk = "odu_krk", priz_cast = "priz_cast", typ_po = "typ_po", cis_inz = "cis_inz", c_vys = "c_vys", pr_forma = "pr_forma", cislo = "cislo", ixs_cia = "ixs_cia", elvz_telefon = "elvz_telefon", elvz_nazev = "elvz_nazev", elvz_adresa = "elvz_adresa", elvz_subjekt = "elvz_subjekt", elvz_subjekt_sidlo = "elvz_subjekt_sidlo", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum EpospidDtoFragments { vlastnosti = "*", ixp = "common", evidence_dokladu = "*", vlastnik = "common", priz_nabedo = "common", vlastnikIdent = "*", vlastnik_nazev = "common", count = "common", lic = "common", ico = "common", ucs = "common", rok_zal = "common", cis_real = "common", ixs_fun_komp = "common", ktg_typ = "common", ixs_typ = "common", popis = "common", ixs_pri = "common", ac = "common", s_po_txt = "common", s_po = "common", nazev = "common", dat_prij_pod = "common", cis_por = "common", dat_pis = "common", dat_zvz = "common", c = "common", ixs_krk = "common", dat_zad_p = "common", dat_uza_p = "common", dat_sml_p = "common", dat_kos_p = "common", dat_real_p = "common", soutez_po = "common", soutez_po_txt = "common", dat_p_lhu = "common", dat_s_lhu = "common", dat_z_lhu = "common", bu_vl_txt = "common", bu_vl = "common", sk_vl = "common", ks = "common", vs = "common", ss = "common", bu_ci_txt = "common", bu_ci = "common", sk_ci = "common", ixs_esu = "common", ixs_esu_txt = "common", por_cis_nab = "common", dat_zmena = "common", zmenu_prov = "common", cis_zve = "common", prijal = "common", epo_stav = "common", ixp_den = "common", ukon = "common", zda_sml = "common", ac_ag = "common", dat_pri = "common", stav_ixp = "commonSeznam", cis_real_nazev = "commonSeznam", nazev_rf = "commonSeznam", rezim_pri_txt = "commonSeznam", cis_duz_txt = "commonSeznam", uzo = "commonSeznam", cis_ner_txt = "commonSeznam", pri_pri_txt = "commonSeznam", epo_stav_txt = "commonSeznam", esu_naz = "commonSeznam", ixs_typ_txt = "commonSeznam", ukon_txt = "commonSeznam", je_fin = "commonSeznam", po_case = "commonSeznam", po_filuta = "commonSeznam", ident_zpo = "commonSeznam", jmeno = "gindesu", prijmeni = "gindesu", kont_osoba = "gindesu", esu_ico = "ginsesu", esu_rc = "ginsesu", esu_dic = "ginsesu", s_ess = "s_ess", s_ess_txt = "s_ess", dat_zverejneni = "wfllpub", zverejnil = "wfllpub", ktg_dms = "wfllpub", fun_naz = "wflIconCalculator", ixs_fun_akt = "wflIconCalculator", priznak = "wflsepx", priznak_txt = "wflsepx", s_sgn_epx = "wflsepx", popis_ixb = "wflsepx", soubor = "wflsixb", popis_wflsixb = "wflsixb", velikost = "wflsixb", ixb = "wflsixb", dz_file = "wflsixb", priz_elp = "wflsixb", typ_soub = "wflsixb", ixp_den_epospac = "wflsixb", ixp_den_nazev = "wflsixb", rezim_pri = "detail", cis_duz = "detail", cis_ner = "detail", pri_pri = "detail", ixp_pre = "detail", cj_po = "detail", poznamka = "detail", c_plan = "detail", c_sch = "detail", c_ps = "detail", fin_od = "detail", fin_do = "detail", ixs_esu_opr = "detail", priz_view = "detail", typ_fin = "detail", lic_zast = "detail", por_zast = "detail", pred_urc = "detail", lim_zac = "detail", odu_zz = "detail", cis_kri = "detail", ac_ag_souv = "detail", ixs_pri_souv = "detail", mena = "detail", c_mena = "detail", kurz = "detail", m = "detail", typ_kurz = "detail", c_nav = "detail", odu_krk = "detail", priz_cast = "detail", typ_po = "detail", cis_inz = "detail", c_vys = "detail", pr_forma = "detail", cislo = "detail", ixs_cia = "detail", elvz_telefon = "detail", elvz_nazev = "detail", elvz_adresa = "detail", elvz_subjekt = "detail", elvz_subjekt_sidlo = "detail", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum EpospidDtoTypes { vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixp = "string", evidence_dokladu = "boolean", vlastnik = "boolean", priz_nabedo = "number", vlastnikIdent = "string", vlastnik_nazev = "string", count = "number", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ktg_typ = "number", ixs_typ = "string", popis = "string", ixs_pri = "string", ac = "string", s_po_txt = "string", s_po = "number", nazev = "string", dat_prij_pod = "JsonDate", cis_por = "number", dat_pis = "JsonDate", dat_zvz = "JsonDate", c = "JsonDecimal", ixs_krk = "string", dat_zad_p = "JsonDate", dat_uza_p = "JsonDate", dat_sml_p = "JsonDate", dat_kos_p = "JsonDate", dat_real_p = "JsonDate", soutez_po = "string", soutez_po_txt = "string", dat_p_lhu = "JsonDate", dat_s_lhu = "JsonDate", dat_z_lhu = "JsonDate", bu_vl_txt = "string", bu_vl = "string", sk_vl = "string", ks = "string", vs = "string", ss = "string", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", ixs_esu_txt = "string", por_cis_nab = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cis_zve = "string", prijal = "string", epo_stav = "number", ixp_den = "string", ukon = "string", zda_sml = "string", ac_ag = "string", dat_pri = "JsonDate", stav_ixp = "string", cis_real_nazev = "string", nazev_rf = "string", rezim_pri_txt = "string", cis_duz_txt = "string", uzo = "string", cis_ner_txt = "string", pri_pri_txt = "string", epo_stav_txt = "string", esu_naz = "string", ixs_typ_txt = "string", ukon_txt = "string", je_fin = "string", po_case = "number", po_filuta = "number", ident_zpo = "number", jmeno = "string", prijmeni = "string", kont_osoba = "string", esu_ico = "string", esu_rc = "string", esu_dic = "string", s_ess = "number", s_ess_txt = "string", dat_zverejneni = "JsonDate", zverejnil = "string", ktg_dms = "string", fun_naz = "string", ixs_fun_akt = "string", priznak = "number", priznak_txt = "string", s_sgn_epx = "number", popis_ixb = "string", soubor = "string", popis_wflsixb = "string", velikost = "number", ixb = "string", dz_file = "JsonDate", priz_elp = "number", typ_soub = "string", ixp_den_epospac = "string", ixp_den_nazev = "string", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", ixp_pre = "string", cj_po = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixs_esu_opr = "string", priz_view = "number", typ_fin = "number", lic_zast = "string", por_zast = "number", pred_urc = "number", lim_zac = "number", odu_zz = "number", cis_kri = "number", ac_ag_souv = "string", ixs_pri_souv = "string", mena = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", c_nav = "JsonDecimal", odu_krk = "string", priz_cast = "number", typ_po = "number", cis_inz = "string", c_vys = "JsonDecimal", pr_forma = "string", cislo = "string", ixs_cia = "string", elvz_telefon = "string", elvz_nazev = "string", elvz_adresa = "string", elvz_subjekt = "string", elvz_subjekt_sidlo = "string", el_obraz_typ = "string", el_obraz_soubor = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum EpospidDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ixs_typ = 12, popis = 254, ixs_pri = 12, ac = 20, s_po_txt = 50, nazev = 100, ixs_krk = 12, soutez_po = 30, bu_vl = 34, sk_vl = 11, ks = 12, vs = 12, ss = 12, bu_ci = 34, sk_ci = 11, ixs_esu = 12, zmenu_prov = 12, ixp_den = 12, ac_ag = 20, nazev_rf = 50, cis_duz_txt = 50, cis_ner_txt = 50, pri_pri_txt = 50, epo_stav_txt = 50, esu_naz = 254, jmeno = 24, prijmeni = 36, esu_ico = 10, esu_rc = 10, esu_dic = 15, zverejnil = 12, ktg_dms = 50, soubor = 254, popis_wflsixb = 50, ixb = 12, ixp_den_epospac = 12, ixp_den_nazev = 50, ixp_pre = 12, cj_po = 30, poznamka = 254, ixs_esu_opr = 12, lic_zast = 4, ac_ag_souv = 20, ixs_pri_souv = 12, odu_krk = 254, cis_inz = 50, pr_forma = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.EpospriDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Epospri*/
	interface EpospriDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		ControlsSystemAggregated?: Gordic.Gin.Interface.GControlsSystemAggregatedDto|null;
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
		uzo?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Detail.priz_nabedo*/
		priz_nabedo?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnik?: boolean|null;
		/**vlastnik*/
		vlastnik_nazev?: string|null;
		/**vlastnik*/
		vlastnikIdent?: string|null;
		/**DBCOLUMN:Detail.s_po*/
		s_po?: number|null;
		/**DBCOLUMN:Detail.soutez_po*/
		soutez_po?: string|null;
		/**DBCOLUMN:Detail.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Detail.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:Detail.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Detail.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zpo*/
		dat_zpo?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Detail.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:Detail.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Detail.cj_po*/
		cj_po?: string|null;
		/**DBCOLUMN:Detail.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Detail.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Detail.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:Detail.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Detail.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Detail.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:Detail.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:Detail.typ_po*/
		typ_po?: number|null;
		/**DBCOLUMN:Detail.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Detail.fin_do*/
		fin_do?: number|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**DBCOLUMN:Seznam.cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.soutez_po_txt*/
		soutez_po_txt?: string|null;
		/**DBCOLUMN:Seznam.s_sou_txt*/
		s_sou_txt?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.sta_sml*/
		sta_sml?: number|null;
		/**DBCOLUMN:Seznam.priz_view_txt*/
		priz_view_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_fin_txt*/
		typ_fin_txt?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_epospac*/
		ixp_den_epospac?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_epospac_nazev*/
		ixp_den_epospac_nazev?: string|null;
		/**DBCOLUMN:Seznam.priz_view_all*/
		priz_view_all?: number|null;
		/**DBCOLUMN:Seznam.pred_urc_txt*/
		pred_urc_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_po_txt*/
		typ_po_txt?: string|null;
		/**s_po_txt*/
		s_po_txt?: string|null;
		/**lim_zac*/
		lim_zac_txt?: string|null;
		/**znak_s*/
		znak_s?: string|null;
		/**DBCOLUMN:Detail.financovani 0/1/2*/
		financovani?: number|null;
		/**vazbyPP*/
		vazbyPP?: number|null;
		/**vazbyPPRok*/
		vazbyPPRok?: number|null;
		/**zda_sml*/
		zda_sml?: string|null;
		/**poc_dokl*/
		poc_dokl?: number|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		sta_uko?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt*/
		k_arch?: string|null;
		/**rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Detail.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:Detail.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:Detail.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Detail.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:Detail.mena*/
		mena?: number|null;
		/**DBCOLUMN:Detail.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Detail.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:Detail.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_ozn*/
		dat_ozn?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_vra*/
		dat_vra?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_uko*/
		dat_uko?: JsonDate|null;
		/**eposesuCount*/
		eposesuCount?: number|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		preevidence?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
	}
	const enum EpospriDtoNames { ControlsSystemAggregated = "ControlsSystemAggregated", ixp = "ixp", uzo = "uzo", ixs_pri = "ixs_pri", priz_nabedo = "priz_nabedo", ixs_typ = "ixs_typ", c_sch = "c_sch", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", nazev = "nazev", vlastnik = "vlastnik", vlastnik_nazev = "vlastnik_nazev", vlastnikIdent = "vlastnikIdent", s_po = "s_po", soutez_po = "soutez_po", cis_por = "cis_por", s_sou = "s_sou", c = "c", dat_pri = "dat_pri", dat_zpo = "dat_zpo", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", pri_pri = "pri_pri", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cj_po = "cj_po", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", ac_ag = "ac_ag", priz_prip = "priz_prip", priz_view = "priz_view", typ_fin = "typ_fin", pred_urc = "pred_urc", lim_zac = "lim_zac", typ_po = "typ_po", fin_od = "fin_od", fin_do = "fin_do", vlastnosti = "vlastnosti", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", soutez_po_txt = "soutez_po_txt", s_sou_txt = "s_sou_txt", rezim_pri_txt = "rezim_pri_txt", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", sta_sml = "sta_sml", priz_view_txt = "priz_view_txt", typ_fin_txt = "typ_fin_txt", ixp_den_epospac = "ixp_den_epospac", ixp_den_epospac_nazev = "ixp_den_epospac_nazev", priz_view_all = "priz_view_all", pred_urc_txt = "pred_urc_txt", typ_po_txt = "typ_po_txt", s_po_txt = "s_po_txt", lim_zac_txt = "lim_zac_txt", znak_s = "znak_s", financovani = "financovani", vazbyPP = "vazbyPP", vazbyPPRok = "vazbyPPRok", zda_sml = "zda_sml", poc_dokl = "poc_dokl", pri_pri_txt = "pri_pri_txt", sta_uko = "sta_uko", k_arch = "k_arch", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", poznamka = "poznamka", c_plan = "c_plan", c_ps = "c_ps", mena = "mena", c_mena = "c_mena", priz_cast = "priz_cast", dat_sch = "dat_sch", dat_ozn = "dat_ozn", dat_vra = "dat_vra", dat_uko = "dat_uko", eposesuCount = "eposesuCount", zmenu_prov_txt = "zmenu_prov_txt", ixs_fun_akt = "ixs_fun_akt", preevidence = "preevidence", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum EpospriDtoFragments { ControlsSystemAggregated = "DSG_FRAGMENT", ixp = "common", uzo = "common", ixs_pri = "minimum", priz_nabedo = "common", ixs_typ = "common", c_sch = "minimum", lic = "common", ico = "common", ucs = "common", rok_zal = "common", cis_real = "common", ixs_fun_komp = "common", ac = "minimum", nazev = "minimum", vlastnik = "minimum", vlastnik_nazev = "common", vlastnikIdent = "common", s_po = "common", soutez_po = "common", cis_por = "common", s_sou = "common", c = "common", dat_pri = "minimum", dat_zpo = "common", dat_zad_p = "common", dat_zad_s = "common", dat_sml_p = "common", dat_sml_s = "common", dat_kos_p = "common", dat_kos_s = "common", dat_real_p = "common", dat_real_s = "common", dat_uza_p = "common", dat_uza_s = "common", pri_pri = "common", dat_zmena = "common", zmenu_prov = "common", cj_po = "common", ixp_den = "minimum", ixp_den_nazev = "minimum", ac_ag = "minimum", priz_prip = "common", priz_view = "common", typ_fin = "common", pred_urc = "common", lim_zac = "foreach", typ_po = "common", fin_od = "common", fin_do = "common", vlastnosti = "*", cis_real_nazev = "seznam", nazev_rf = "seznam", soutez_po_txt = "seznam", s_sou_txt = "seznam", rezim_pri_txt = "seznam", cis_duz_txt = "seznam", cis_ner_txt = "seznam", sta_sml = "seznam", priz_view_txt = "seznam", typ_fin_txt = "seznam", ixp_den_epospac = "seznam", ixp_den_epospac_nazev = "seznam", priz_view_all = "seznam", pred_urc_txt = "seznam", typ_po_txt = "seznam", s_po_txt = "minimum", lim_zac_txt = "foreach", znak_s = "foreach", financovani = "foreach", vazbyPP = "foreach", vazbyPPRok = "foreach", zda_sml = "seznam", poc_dokl = "foreach", pri_pri_txt = "seznam", sta_uko = "seznam", k_arch = "seznam", rezim_pri = "detail", cis_duz = "detail", cis_ner = "detail", poznamka = "detail", c_plan = "detail", c_ps = "detail", mena = "detail", c_mena = "detail", priz_cast = "detail", dat_sch = "detail", dat_ozn = "detail", dat_vra = "detail", dat_uko = "detail", eposesuCount = "detail", zmenu_prov_txt = "detail", ixs_fun_akt = "detail", preevidence = "preevidence", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum EpospriDtoTypes { ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", ixp = "string", uzo = "string", ixs_pri = "string", priz_nabedo = "number", ixs_typ = "string", c_sch = "JsonDecimal", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", nazev = "string", vlastnik = "boolean", vlastnik_nazev = "string", vlastnikIdent = "string", s_po = "number", soutez_po = "string", cis_por = "number", s_sou = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zpo = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", pri_pri = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cj_po = "string", ixp_den = "string", ixp_den_nazev = "string", ac_ag = "string", priz_prip = "number", priz_view = "number", typ_fin = "number", pred_urc = "number", lim_zac = "number", typ_po = "number", fin_od = "number", fin_do = "number", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", cis_real_nazev = "string", nazev_rf = "string", soutez_po_txt = "string", s_sou_txt = "string", rezim_pri_txt = "string", cis_duz_txt = "string", cis_ner_txt = "string", sta_sml = "number", priz_view_txt = "string", typ_fin_txt = "string", ixp_den_epospac = "string", ixp_den_epospac_nazev = "string", priz_view_all = "number", pred_urc_txt = "string", typ_po_txt = "string", s_po_txt = "string", lim_zac_txt = "string", znak_s = "string", financovani = "number", vazbyPP = "number", vazbyPPRok = "number", zda_sml = "string", poc_dokl = "number", pri_pri_txt = "string", sta_uko = "number", k_arch = "string", rezim_pri = "number", cis_duz = "number", cis_ner = "number", poznamka = "string", c_plan = "JsonDecimal", c_ps = "JsonDecimal", mena = "number", c_mena = "JsonDecimal", priz_cast = "number", dat_sch = "JsonDate", dat_ozn = "JsonDate", dat_vra = "JsonDate", dat_uko = "JsonDate", eposesuCount = "number", zmenu_prov_txt = "string", ixs_fun_akt = "string", preevidence = "number", el_obraz_typ = "string", el_obraz_soubor = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum EpospriDtoTypeLengths { ixp = 12, ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, nazev = 100, soutez_po = 30, zmenu_prov = 12, cj_po = 30, ixp_den = 12, ixp_den_nazev = 50, ac_ag = 20, cis_real_nazev = 50, nazev_rf = 50, soutez_po_txt = 100, s_sou_txt = 50, rezim_pri_txt = 50, cis_duz_txt = 50, cis_ner_txt = 50, priz_view_txt = 50, typ_fin_txt = 50, ixp_den_epospac = 12, ixp_den_epospac_nazev = 50, pred_urc_txt = 50, typ_po_txt = 50, pri_pri_txt = 50, k_arch = 2, poznamka = 254, ixs_fun_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GDetailEnableDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DTO pro nastavení enable na detailu*/
	interface GDetailEnableDto {
		/**dat_kos_p_04*/
		dat_kos_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_sml_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_real_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_zad_p_04?: boolean|null;
		/**dat_uza*/
		dat_uza_p_04?: boolean|null;
		popis_hl?: boolean|null;
		readOnly_financovani?: boolean|null;
		ac_ag_zu?: boolean|null;
		ac_zu?: boolean|null;
		cis_real_zu?: boolean|null;
		ixs_fun_komp_zu?: boolean|null;
		s_po_zu?: boolean|null;
		nazev_zu?: boolean|null;
		typ_fin_zu?: boolean|null;
		fin_od_zu?: boolean|null;
		fin_do_zu?: boolean|null;
		c_sch_zu?: boolean|null;
		dat_pri_zu?: boolean|null;
		priz_nabedo_zu?: boolean|null;
		readOnly_10_esu?: boolean|null;
		c_plan_03?: boolean|null;
		rezim_pri_03?: boolean|null;
		pri_pri_03?: boolean|null;
		cis_duz_03?: boolean|null;
		dat_zvz_03?: boolean|null;
		soutez_po_03?: boolean|null;
		priz_dzr_03?: boolean|null;
		cis_por_03?: boolean|null;
		s_sdg_03?: boolean|null;
		cis_ner_03?: boolean|null;
		cis_ucl_03?: boolean|null;
		oblast_dt_03?: boolean|null;
		dat_pis_08?: boolean|null;
		dat_s_lhu_08?: boolean|null;
		dat_z_lhu_08?: boolean|null;
		dat_p_lhu_08?: boolean|null;
		centr_adr_08?: boolean|null;
		c_jistota_08?: boolean|null;
		bu_vl_08?: boolean|null;
		ks_08?: boolean|null;
		vs_08?: boolean|null;
		ss_08?: boolean|null;
		dat_pis_11?: boolean|null;
		dat_s_lhu_11?: boolean|null;
		centr_adr_11?: boolean|null;
		cis_kri_11?: boolean|null;
		mena_11?: boolean|null;
		c_mena_11?: boolean|null;
		bu_vl_11?: boolean|null;
		ks_11?: boolean|null;
		vs_11?: boolean|null;
		ss_11?: boolean|null;
		poznamka_co?: boolean|null;
		por_cis_nab_05?: boolean|null;
		dat_pis_05?: boolean|null;
		c_nav_05?: boolean|null;
		s_ess_05?: boolean|null;
		ixs_esu_05?: boolean|null;
		pr_forma_05?: boolean|null;
		bu_ci_txt_05?: boolean|null;
	}
	const enum GDetailEnableDtoNames { dat_kos_p_04 = "dat_kos_p_04", dat_sml_p_04 = "dat_sml_p_04", dat_real_p_04 = "dat_real_p_04", dat_zad_p_04 = "dat_zad_p_04", dat_uza_p_04 = "dat_uza_p_04", popis_hl = "popis_hl", readOnly_financovani = "readOnly_financovani", ac_ag_zu = "ac_ag_zu", ac_zu = "ac_zu", cis_real_zu = "cis_real_zu", ixs_fun_komp_zu = "ixs_fun_komp_zu", s_po_zu = "s_po_zu", nazev_zu = "nazev_zu", typ_fin_zu = "typ_fin_zu", fin_od_zu = "fin_od_zu", fin_do_zu = "fin_do_zu", c_sch_zu = "c_sch_zu", dat_pri_zu = "dat_pri_zu", priz_nabedo_zu = "priz_nabedo_zu", readOnly_10_esu = "readOnly_10_esu", c_plan_03 = "c_plan_03", rezim_pri_03 = "rezim_pri_03", pri_pri_03 = "pri_pri_03", cis_duz_03 = "cis_duz_03", dat_zvz_03 = "dat_zvz_03", soutez_po_03 = "soutez_po_03", priz_dzr_03 = "priz_dzr_03", cis_por_03 = "cis_por_03", s_sdg_03 = "s_sdg_03", cis_ner_03 = "cis_ner_03", cis_ucl_03 = "cis_ucl_03", oblast_dt_03 = "oblast_dt_03", dat_pis_08 = "dat_pis_08", dat_s_lhu_08 = "dat_s_lhu_08", dat_z_lhu_08 = "dat_z_lhu_08", dat_p_lhu_08 = "dat_p_lhu_08", centr_adr_08 = "centr_adr_08", c_jistota_08 = "c_jistota_08", bu_vl_08 = "bu_vl_08", ks_08 = "ks_08", vs_08 = "vs_08", ss_08 = "ss_08", dat_pis_11 = "dat_pis_11", dat_s_lhu_11 = "dat_s_lhu_11", centr_adr_11 = "centr_adr_11", cis_kri_11 = "cis_kri_11", mena_11 = "mena_11", c_mena_11 = "c_mena_11", bu_vl_11 = "bu_vl_11", ks_11 = "ks_11", vs_11 = "vs_11", ss_11 = "ss_11", poznamka_co = "poznamka_co", por_cis_nab_05 = "por_cis_nab_05", dat_pis_05 = "dat_pis_05", c_nav_05 = "c_nav_05", s_ess_05 = "s_ess_05", ixs_esu_05 = "ixs_esu_05", pr_forma_05 = "pr_forma_05", bu_ci_txt_05 = "bu_ci_txt_05",}
	const enum GDetailEnableDtoFragments { dat_kos_p_04 = "*", dat_sml_p_04 = "*", dat_real_p_04 = "*", dat_zad_p_04 = "*", dat_uza_p_04 = "*", popis_hl = "*", readOnly_financovani = "*", ac_ag_zu = "*", ac_zu = "*", cis_real_zu = "*", ixs_fun_komp_zu = "*", s_po_zu = "*", nazev_zu = "*", typ_fin_zu = "*", fin_od_zu = "*", fin_do_zu = "*", c_sch_zu = "*", dat_pri_zu = "*", priz_nabedo_zu = "*", readOnly_10_esu = "*", c_plan_03 = "*", rezim_pri_03 = "*", pri_pri_03 = "*", cis_duz_03 = "*", dat_zvz_03 = "*", soutez_po_03 = "*", priz_dzr_03 = "*", cis_por_03 = "*", s_sdg_03 = "*", cis_ner_03 = "*", cis_ucl_03 = "*", oblast_dt_03 = "*", dat_pis_08 = "*", dat_s_lhu_08 = "*", dat_z_lhu_08 = "*", dat_p_lhu_08 = "*", centr_adr_08 = "*", c_jistota_08 = "*", bu_vl_08 = "*", ks_08 = "*", vs_08 = "*", ss_08 = "*", dat_pis_11 = "*", dat_s_lhu_11 = "*", centr_adr_11 = "*", cis_kri_11 = "*", mena_11 = "*", c_mena_11 = "*", bu_vl_11 = "*", ks_11 = "*", vs_11 = "*", ss_11 = "*", poznamka_co = "*", por_cis_nab_05 = "*", dat_pis_05 = "*", c_nav_05 = "*", s_ess_05 = "*", ixs_esu_05 = "*", pr_forma_05 = "*", bu_ci_txt_05 = "*",}
	const enum GDetailEnableDtoTypes { dat_kos_p_04 = "boolean", dat_sml_p_04 = "boolean", dat_real_p_04 = "boolean", dat_zad_p_04 = "boolean", dat_uza_p_04 = "boolean", popis_hl = "boolean", readOnly_financovani = "boolean", ac_ag_zu = "boolean", ac_zu = "boolean", cis_real_zu = "boolean", ixs_fun_komp_zu = "boolean", s_po_zu = "boolean", nazev_zu = "boolean", typ_fin_zu = "boolean", fin_od_zu = "boolean", fin_do_zu = "boolean", c_sch_zu = "boolean", dat_pri_zu = "boolean", priz_nabedo_zu = "boolean", readOnly_10_esu = "boolean", c_plan_03 = "boolean", rezim_pri_03 = "boolean", pri_pri_03 = "boolean", cis_duz_03 = "boolean", dat_zvz_03 = "boolean", soutez_po_03 = "boolean", priz_dzr_03 = "boolean", cis_por_03 = "boolean", s_sdg_03 = "boolean", cis_ner_03 = "boolean", cis_ucl_03 = "boolean", oblast_dt_03 = "boolean", dat_pis_08 = "boolean", dat_s_lhu_08 = "boolean", dat_z_lhu_08 = "boolean", dat_p_lhu_08 = "boolean", centr_adr_08 = "boolean", c_jistota_08 = "boolean", bu_vl_08 = "boolean", ks_08 = "boolean", vs_08 = "boolean", ss_08 = "boolean", dat_pis_11 = "boolean", dat_s_lhu_11 = "boolean", centr_adr_11 = "boolean", cis_kri_11 = "boolean", mena_11 = "boolean", c_mena_11 = "boolean", bu_vl_11 = "boolean", ks_11 = "boolean", vs_11 = "boolean", ss_11 = "boolean", poznamka_co = "boolean", por_cis_nab_05 = "boolean", dat_pis_05 = "boolean", c_nav_05 = "boolean", s_ess_05 = "boolean", ixs_esu_05 = "boolean", pr_forma_05 = "boolean", bu_ci_txt_05 = "boolean",}
	const enum GDetailEnableDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GDetailLabelsDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DTO pro nastavení labelů na detailu*/
	interface GDetailLabelsDto {
		c_plan_03?: string|null;
		soutez_03?: string|null;
		dat_pis_11?: string|null;
		dat_s_lhu_11?: string|null;
		dat_z_lhu_11?: string|null;
		cis_kri_11?: string|null;
		dat_pis_08?: string|null;
		dat_z_lhu_08?: string|null;
		dat_s_lhu_08?: string|null;
		dat_pri_zu?: string|null;
		dat_pri_su?: string|null;
		prijal_su?: string|null;
		pole1_hr?: string|null;
		pole2_hr?: string|null;
	}
	const enum GDetailLabelsDtoNames { c_plan_03 = "c_plan_03", soutez_03 = "soutez_03", dat_pis_11 = "dat_pis_11", dat_s_lhu_11 = "dat_s_lhu_11", dat_z_lhu_11 = "dat_z_lhu_11", cis_kri_11 = "cis_kri_11", dat_pis_08 = "dat_pis_08", dat_z_lhu_08 = "dat_z_lhu_08", dat_s_lhu_08 = "dat_s_lhu_08", dat_pri_zu = "dat_pri_zu", dat_pri_su = "dat_pri_su", prijal_su = "prijal_su", pole1_hr = "pole1_hr", pole2_hr = "pole2_hr",}
	const enum GDetailLabelsDtoFragments { c_plan_03 = "*", soutez_03 = "*", dat_pis_11 = "*", dat_s_lhu_11 = "*", dat_z_lhu_11 = "*", cis_kri_11 = "*", dat_pis_08 = "*", dat_z_lhu_08 = "*", dat_s_lhu_08 = "*", dat_pri_zu = "*", dat_pri_su = "*", prijal_su = "*", pole1_hr = "*", pole2_hr = "*",}
	const enum GDetailLabelsDtoTypes { c_plan_03 = "string", soutez_03 = "string", dat_pis_11 = "string", dat_s_lhu_11 = "string", dat_z_lhu_11 = "string", cis_kri_11 = "string", dat_pis_08 = "string", dat_z_lhu_08 = "string", dat_s_lhu_08 = "string", dat_pri_zu = "string", dat_pri_su = "string", prijal_su = "string", pole1_hr = "string", pole2_hr = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GEpoDokRestrikce.Dto.d.ts 

declare namespace Gordic.Epo.Interface {
	interface GEpoDokRestrikceDto {
		restrikce?: Gordic.Pap.Interface.GRestrikceDto|null;
		filters?: Gordic.Epo.Interface.GEpoFiltrDokDto|null;
	}
	const enum GEpoDokRestrikceDtoNames { restrikce = "restrikce", filters = "filters",}
	const enum GEpoDokRestrikceDtoFragments { restrikce = "*", filters = "*",}
	const enum GEpoDokRestrikceDtoTypes { restrikce = "Gordic.Pap.Interface.GRestrikceDto", filters = "Gordic.Epo.Interface.GEpoFiltrDokDto",}
	const enum GEpoDokRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GEpoRestrikce.Dto.d.ts 

declare namespace Gordic.Epo.Interface {
	interface GEpoRestrikceDto {
		restrikce?: Gordic.Pap.Interface.GRestrikceDto|null;
		filters?: Gordic.Epo.Interface.GEpoFiltrDto|null;
	}
	const enum GEpoRestrikceDtoNames { restrikce = "restrikce", filters = "filters",}
	const enum GEpoRestrikceDtoFragments { restrikce = "*", filters = "*",}
	const enum GEpoRestrikceDtoTypes { restrikce = "Gordic.Pap.Interface.GRestrikceDto", filters = "Gordic.Epo.Interface.GEpoFiltrDto",}
	const enum GEpoRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GEposesu.Dto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:Seznam*/
	interface GEposesuDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.dat_pre_nab*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		nazev?: string|null;
		ac_ag?: string|null;
		ac?: string|null;
		s_po?: number|null;
		s_po_txt?: string|null;
		soutez?: string|null;
		soutez_txt?: string|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_vyz*/
		dat_vyz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vys*/
		dat_vys?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.c_nav*/
		c_nav?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
	}
	const enum GEposesuDtoNames { ixs_pri = "ixs_pri", ixs_esu = "ixs_esu", dat_pre_nab = "dat_pre_nab", por_cis_nab = "por_cis_nab", cis_por = "cis_por", nazev_rf = "nazev_rf", ixs_esu_txt = "ixs_esu_txt", nazev = "nazev", ac_ag = "ac_ag", ac = "ac", s_po = "s_po", s_po_txt = "s_po_txt", soutez = "soutez", soutez_txt = "soutez_txt", s_ess_txt = "s_ess_txt", dat_vyz = "dat_vyz", dat_vys = "dat_vys", dat_zmena = "dat_zmena", ico_esu = "ico_esu", s_ess = "s_ess", pr_forma = "pr_forma", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixp_nab = "ixp_nab", c_nav = "c_nav", jmeno = "jmeno", prijmeni = "prijmeni", lic_zast = "lic_zast", por_zast = "por_zast",}
	const enum GEposesuDtoFragments { ixs_pri = "common", ixs_esu = "common", dat_pre_nab = "common", por_cis_nab = "common", cis_por = "common", nazev_rf = "common", ixs_esu_txt = "common", nazev = "seznam", ac_ag = "seznam", ac = "seznam", s_po = "seznam", s_po_txt = "seznam", soutez = "seznam", soutez_txt = "seznam", s_ess_txt = "seznam", dat_vyz = "seznam", dat_vys = "seznam", dat_zmena = "seznam", ico_esu = "seznam", s_ess = "detail", pr_forma = "detail", bu_ci_txt = "detail", bu_ci = "detail", sk_ci = "detail", ixp_nab = "detail", c_nav = "detail", jmeno = "detail", prijmeni = "detail", lic_zast = "ostatni", por_zast = "ostatni",}
	const enum GEposesuDtoTypes { ixs_pri = "string", ixs_esu = "string", dat_pre_nab = "JsonDate", por_cis_nab = "number", cis_por = "number", nazev_rf = "string", ixs_esu_txt = "string", nazev = "string", ac_ag = "string", ac = "string", s_po = "number", s_po_txt = "string", soutez = "string", soutez_txt = "string", s_ess_txt = "string", dat_vyz = "JsonDate", dat_vys = "JsonDate", dat_zmena = "JsonDate", ico_esu = "string", s_ess = "number", pr_forma = "string", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixp_nab = "string", c_nav = "JsonDecimal", jmeno = "string", prijmeni = "string", lic_zast = "string", por_zast = "number",}
	const enum GEposesuDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, ixs_esu_txt = 254, s_ess_txt = 50, pr_forma = 3, bu_ci = 34, sk_ci = 11, ixp_nab = 12, jmeno = 24, prijmeni = 36, lic_zast = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GEpovdatDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epovdat*/
	interface GEpovdatDto {
		/**DBCOLUMN:epovdat.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:epovdat.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:epovdat.typ_datum*/
		typ_datum?: string|null;
		/**DBCOLUMN:epovdat.dat_tda*/
		dat_tda?: JsonDate|null;
		/**DBCOLUMN:epovdat.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:epovdat.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:epovdat.zmenu_prov*/
		zmenu_prov?: string|null;
		/**typ_datum_txt*/
		typ_datum_txt?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GEpovdatDtoNames { ixs_pri = "ixs_pri", por_cis = "por_cis", typ_datum = "typ_datum", dat_tda = "dat_tda", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_datum_txt = "typ_datum_txt", nazev_rf = "nazev_rf",}
	const enum GEpovdatDtoFragments { ixs_pri = "*", por_cis = "*", typ_datum = "*", dat_tda = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_datum_txt = "*", nazev_rf = "*",}
	const enum GEpovdatDtoTypes { ixs_pri = "string", por_cis = "number", typ_datum = "string", dat_tda = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_datum_txt = "string", nazev_rf = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GParamDetailDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Dto pro parametry detailu*/
	interface GParamDetailDto {
		/**parametry*/
		parametry?: Gordic.Epo.Interface.GParamsDetailDto|null;
		/**dto evzspid*/
		pidDto?: Gordic.Epo.Interface.EpospidDto|null;
		prava?: Gordic.Pap.Interface.GPridelPravaDto|null;
		enabled?: Gordic.Epo.Interface.GDetailEnableDto|null;
		lab?: Gordic.Epo.Interface.GDetailLabelsDto|null;
		/**labels04*/
		labels04?: Gordic.Pap.Interface.GTab04VlastnostiDto|null;
		/**data pro esu hromadné*/
		esuHr?: Gordic.Pap.Interface.GXxxsesuHrDto[]|null;
		/**rozšířený profil*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		kpiData?: string[]|null;
		/**provést  mimo HO -1; kontrolu - 0, provést akci = 1;*/
		kontrolaHO?: number|null;
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GParamDetailDtoNames { parametry = "parametry", pidDto = "pidDto", prava = "prava", enabled = "enabled", lab = "lab", labels04 = "labels04", esuHr = "esuHr", vlastnosti = "vlastnosti", kpiData = "kpiData", kontrolaHO = "kontrolaHO", dokument = "dokument",}
	const enum GParamDetailDtoFragments { parametry = "*", pidDto = "*", prava = "*", enabled = "*", lab = "*", labels04 = "*", esuHr = "*", vlastnosti = "*", kpiData = "*", kontrolaHO = "*", dokument = "*",}
	const enum GParamDetailDtoTypes { parametry = "Gordic.Epo.Interface.GParamsDetailDto", pidDto = "Gordic.Epo.Interface.EpospidDto", prava = "Gordic.Pap.Interface.GPridelPravaDto", enabled = "Gordic.Epo.Interface.GDetailEnableDto", lab = "Gordic.Epo.Interface.GDetailLabelsDto", labels04 = "Gordic.Pap.Interface.GTab04VlastnostiDto", esuHr = "Gordic.Pap.Interface.GXxxsesuHrDto[]", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", kpiData = "string[]", kontrolaHO = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GParamDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GParamsDetailDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Dto pro parametry detailu*/
	interface GParamsDetailDto {
		buttonSchvalitVisible?: boolean|null;
		/**kód otevřeného okna*/
		open?: string|null;
		/**kód otevřeného okna*/
		open2?: string|null;
		/**zákon*/
		cisZakSb?: number|null;
		/**ixs_soudgr*/
		ixs_soudgr?: string|null;
		/**titulek okna*/
		title?: string|null;
		/**titulek nějakého okna*/
		titleNovy?: string|null;
		/**nějaké schované ixs_pri*/
		posledniIxpNaPri?: string|null;
		/**nadtyp*/
		nadTyp1?: number|null;
		/**nadtyp*/
		nadTyp2?: number|null;
		/**nadtyp*/
		nadTyp3?: number|null;
		/**stavPuv*/
		stavPuv?: number|null;
		nastavEss?: boolean|null;
		/**vlastnik*/
		vlastnik?: string|null;
		nazrozVisible?: boolean|null;
		/**původní c_schv*/
		c_schvSave?: JsonDecimal|null;
		/**původní zps_fin*/
		zps_finSave?: JsonDecimal|null;
		je_zpo?: boolean|null;
		readOnly?: boolean|null;
		zalozka_odu_visible?: boolean|null;
		typ_phl_visible?: boolean|null;
		/**na subjektu je vidět moje políčko ixsEsu*/
		ixsEsuVVisible?: boolean|null;
		/**na financování políčka AU-POL-Org*/
		rozpSkladbyVisible?: boolean|null;
		/**parametr pro hromadné operace*/
		xxxVieVicesu?: number|null;
		/**částka přeblokování*/
		c_preblok?: JsonDecimal|null;
		/**nastavit přeblokování*/
		nastavCPreblok?: boolean|null;
		/**DBCOLUMN:Seznam.spu_rs_2*/
		spuRs2Save?: string|null;
		/**nastavit cb*/
		cbSml?: boolean|null;
		/**nastavit cb*/
		cbStornoOrg?: boolean|null;
		/**nastavit cb*/
		cbSchvProst?: boolean|null;
		/**nastavit popis*/
		needPop?: boolean|null;
		/**odschválení*/
		odschval?: boolean|null;
		/**uchování stavu s_dgr*/
		saveStav?: number|null;
		/**akce*/
		akce?: string|null;
		/**duvodStorno*/
		duvodStorno?: string|null;
		/**nulák pro schvalHrompol*/
		nulak?: boolean|null;
		/**specil_special*/
		special_special?: boolean|null;
		/**limit pro dat_s_lhu a dat_z_lhu_*/
		dat_lhu_limit?: JsonDate|null;
		/**navýšení/snížení up/down*/
		dat_lhu_mod?: string|null;
		/**šablona pro masku*/
		sablona?: string|null;
		/**maska pro ac_ag*/
		acAgMaska?: string|null;
		/**tooltip pro položku plánu*/
		toolTipProPP?: string|null;
		/**save pro položku plánu*/
		savePP?: string|null;
		/**save pro ixs_cia*/
		saveIxsCia?: string|null;
		/**priz_nabedo*/
		priz_nabedo?: number|null;
	}
	const enum GParamsDetailDtoNames { buttonSchvalitVisible = "buttonSchvalitVisible", open = "open", open2 = "open2", cisZakSb = "cisZakSb", ixs_soudgr = "ixs_soudgr", title = "title", titleNovy = "titleNovy", posledniIxpNaPri = "posledniIxpNaPri", nadTyp1 = "nadTyp1", nadTyp2 = "nadTyp2", nadTyp3 = "nadTyp3", stavPuv = "stavPuv", nastavEss = "nastavEss", vlastnik = "vlastnik", nazrozVisible = "nazrozVisible", c_schvSave = "c_schvSave", zps_finSave = "zps_finSave", je_zpo = "je_zpo", readOnly = "readOnly", zalozka_odu_visible = "zalozka_odu_visible", typ_phl_visible = "typ_phl_visible", ixsEsuVVisible = "ixsEsuVVisible", rozpSkladbyVisible = "rozpSkladbyVisible", xxxVieVicesu = "xxxVieVicesu", c_preblok = "c_preblok", nastavCPreblok = "nastavCPreblok", spuRs2Save = "spuRs2Save", cbSml = "cbSml", cbStornoOrg = "cbStornoOrg", cbSchvProst = "cbSchvProst", needPop = "needPop", odschval = "odschval", saveStav = "saveStav", akce = "akce", duvodStorno = "duvodStorno", nulak = "nulak", special_special = "special_special", dat_lhu_limit = "dat_lhu_limit", dat_lhu_mod = "dat_lhu_mod", sablona = "sablona", acAgMaska = "acAgMaska", toolTipProPP = "toolTipProPP", savePP = "savePP", saveIxsCia = "saveIxsCia", priz_nabedo = "priz_nabedo",}
	const enum GParamsDetailDtoFragments { buttonSchvalitVisible = "*", open = "*", open2 = "*", cisZakSb = "*", ixs_soudgr = "*", title = "*", titleNovy = "*", posledniIxpNaPri = "*", nadTyp1 = "*", nadTyp2 = "*", nadTyp3 = "*", stavPuv = "*", nastavEss = "*", vlastnik = "*", nazrozVisible = "*", c_schvSave = "*", zps_finSave = "*", je_zpo = "*", readOnly = "*", zalozka_odu_visible = "*", typ_phl_visible = "*", ixsEsuVVisible = "*", rozpSkladbyVisible = "*", xxxVieVicesu = "*", c_preblok = "*", nastavCPreblok = "*", spuRs2Save = "*", cbSml = "*", cbStornoOrg = "*", cbSchvProst = "*", needPop = "*", odschval = "*", saveStav = "*", akce = "*", duvodStorno = "*", nulak = "*", special_special = "*", dat_lhu_limit = "*", dat_lhu_mod = "*", sablona = "*", acAgMaska = "*", toolTipProPP = "*", savePP = "*", saveIxsCia = "*", priz_nabedo = "*",}
	const enum GParamsDetailDtoTypes { buttonSchvalitVisible = "boolean", open = "string", open2 = "string", cisZakSb = "number", ixs_soudgr = "string", title = "string", titleNovy = "string", posledniIxpNaPri = "string", nadTyp1 = "number", nadTyp2 = "number", nadTyp3 = "number", stavPuv = "number", nastavEss = "boolean", vlastnik = "string", nazrozVisible = "boolean", c_schvSave = "JsonDecimal", zps_finSave = "JsonDecimal", je_zpo = "boolean", readOnly = "boolean", zalozka_odu_visible = "boolean", typ_phl_visible = "boolean", ixsEsuVVisible = "boolean", rozpSkladbyVisible = "boolean", xxxVieVicesu = "number", c_preblok = "JsonDecimal", nastavCPreblok = "boolean", spuRs2Save = "string", cbSml = "boolean", cbStornoOrg = "boolean", cbSchvProst = "boolean", needPop = "boolean", odschval = "boolean", saveStav = "number", akce = "string", duvodStorno = "string", nulak = "boolean", special_special = "boolean", dat_lhu_limit = "JsonDate", dat_lhu_mod = "string", sablona = "string", acAgMaska = "string", toolTipProPP = "string", savePP = "string", saveIxsCia = "string", priz_nabedo = "number",}
	const enum GParamsDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.GUchazeciDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Dto - uchazeči*/
	interface GUchazeciDto {
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.dat_pre_nab*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		ixs_pri?: string|null;
		/**DBCOLUMN:Detail.priz_nabedo*/
		priz_nabedo?: number|null;
		/**název PO*/
		nazev?: string|null;
		/**DBCOLUMN:Detail.s_po*/
		s_po?: number|null;
		/**s_po_txt PO*/
		s_po_txt?: string|null;
		/**soutez_po*/
		soutez_po?: string|null;
		uzo?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Detail.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_vyz*/
		dat_vyz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vys*/
		dat_vys?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma_txt?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.c_nav*/
		c_nav?: JsonDecimal|null;
		/**DBCOLUMN:jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:popis*/
		popis?: string|null;
		/**DBCOLUMN:popis*/
		ixp_den?: string|null;
		/**DBCOLUMN:popis*/
		ixp_den_txt?: string|null;
		/**DBCOLUMN:rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:zpu_pod*/
		pocet?: number|null;
		rc?: string|null;
		dic?: string|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
	}
	const enum GUchazeciDtoNames { ixs_esu = "ixs_esu", dat_pre_nab = "dat_pre_nab", por_cis_nab = "por_cis_nab", nazev_rf = "nazev_rf", ixs_esu_txt = "ixs_esu_txt", ixs_pri = "ixs_pri", priz_nabedo = "priz_nabedo", nazev = "nazev", s_po = "s_po", s_po_txt = "s_po_txt", soutez_po = "soutez_po", uzo = "uzo", ac = "ac", ac_ag = "ac_ag", cis_por = "cis_por", s_ess_txt = "s_ess_txt", dat_vyz = "dat_vyz", dat_vys = "dat_vys", dat_zmena = "dat_zmena", ico_esu = "ico_esu", s_ess = "s_ess", pr_forma = "pr_forma", pr_forma_txt = "pr_forma_txt", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixp_nab = "ixp_nab", c_nav = "c_nav", jmeno = "jmeno", prijmeni = "prijmeni", popis = "popis", ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", rok_zal = "rok_zal", pocet = "pocet", rc = "rc", dic = "dic", vlastnosti = "vlastnosti",}
	const enum GUchazeciDtoFragments { ixs_esu = "*", dat_pre_nab = "*", por_cis_nab = "*", nazev_rf = "*", ixs_esu_txt = "*", ixs_pri = "*", priz_nabedo = "*", nazev = "*", s_po = "*", s_po_txt = "*", soutez_po = "*", uzo = "*", ac = "*", ac_ag = "*", cis_por = "*", s_ess_txt = "*", dat_vyz = "*", dat_vys = "*", dat_zmena = "*", ico_esu = "*", s_ess = "*", pr_forma = "*", pr_forma_txt = "*", bu_ci_txt = "*", bu_ci = "*", sk_ci = "*", ixp_nab = "*", c_nav = "*", jmeno = "*", prijmeni = "*", popis = "*", ixp_den = "*", ixp_den_txt = "*", rok_zal = "*", pocet = "*", rc = "*", dic = "*", vlastnosti = "*",}
	const enum GUchazeciDtoTypes { ixs_esu = "string", dat_pre_nab = "JsonDate", por_cis_nab = "number", nazev_rf = "string", ixs_esu_txt = "string", ixs_pri = "string", priz_nabedo = "number", nazev = "string", s_po = "number", s_po_txt = "string", soutez_po = "string", uzo = "string", ac = "string", ac_ag = "string", cis_por = "number", s_ess_txt = "string", dat_vyz = "JsonDate", dat_vys = "JsonDate", dat_zmena = "JsonDate", ico_esu = "string", s_ess = "number", pr_forma = "string", pr_forma_txt = "string", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixp_nab = "string", c_nav = "JsonDecimal", jmeno = "string", prijmeni = "string", popis = "string", ixp_den = "string", ixp_den_txt = "string", rok_zal = "number", pocet = "number", rc = "string", dic = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto",}
	const enum GUchazeciDtoTypeLengths { ixs_esu = 12, ixs_esu_txt = 254, ixs_pri = 12, ac = 20, ac_ag = 20, s_ess_txt = 50, pr_forma = 3, bu_ci = 34, sk_ci = 11, ixp_nab = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.SeznamDokumentuEpoDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:Seznam*/
	interface SeznamDokumentuEpoDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_zve_txt*/
		cis_zve_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.ks*/
		ks?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.ss*/
		ss?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.epo_stav_txt*/
		epo_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_vfpspac*/
		ixp_den_epospac?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.vfp_stav*/
		epo_stav?: number|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
		/**DBCOLUMN:Seznam.priznak_txt*/
		priznak_txt?: string|null;
		/**DBCOLUMN:Seznam.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:Seznam.popis_wflsixb*/
		popis_wflsixb?: string|null;
		/**DBCOLUMN:Seznam.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:Seznam.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Seznam.dz_file*/
		dz_file?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_modify*/
		dat_modify?: JsonDate|null;
		/**DBCOLUMN:Seznam.tmp_file*/
		tmp_file?: string|null;
		/**DBCOLUMN:Seznam.typ_otevreni*/
		typ_otevreni?: number|null;
		/**DBCOLUMN:Seznam.dat_zverejneni*/
		dat_zverejneni?: JsonDate|null;
		/**DBCOLUMN:Seznam.zverejnil*/
		zverejnil?: string|null;
		/**DBCOLUMN:Seznam.ktg_dms*/
		ktg_dms?: string|null;
		/**DBCOLUMN:Seznam.otevren*/
		otevren?: number|null;
		/**DBCOLUMN:Seznam.zamcen*/
		zamcen?: number|null;
		/**DBCOLUMN:Seznam.modifikovan*/
		modifikovan?: number|null;
		/**DBCOLUMN:Seznam.m_zamek*/
		m_zamek?: number|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:Seznam.esu_naz*/
		esu_naz?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.je_fin*/
		je_fin?: string|null;
		po_case?: number|null;
		po_filuta?: number|null;
		ident_zpo?: number|null;
		/**DBCOLUMN:Seznam.esu_ico*/
		esu_ico?: string|null;
		/**DBCOLUMN:Seznam.esu_rc*/
		esu_rc?: string|null;
		/**DBCOLUMN:Seznam.esu_dic*/
		esu_dic?: string|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: string|null;
		/**stav*/
		stav?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**ukon_txt*/
		ukon_txt?: string|null;
		/**popis_wfl*/
		popis_ixb?: string|null;
		/**datum ukonu*/
		dat_ukon?: JsonDate|null;
		/**cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**pri_pri_txt*/
		pri_pri_txt?: string|null;
	}
	const enum SeznamDokumentuEpoDtoNames { ixp = "ixp", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", dat_prij_pod = "dat_prij_pod", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", popis = "popis", dat_pis = "dat_pis", ixs_pri = "ixs_pri", ac = "ac", nazev = "nazev", typ_dgr = "typ_dgr", cis_por = "cis_por", rezim_pri = "rezim_pri", rezim_pri_txt = "rezim_pri_txt", c = "c", ixs_krk = "ixs_krk", dat_zad_p = "dat_zad_p", dat_sml_p = "dat_sml_p", dat_real_p = "dat_real_p", dat_kos_p = "dat_kos_p", dat_uza_p = "dat_uza_p", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", cis_zve_txt = "cis_zve_txt", dat_p_lhu = "dat_p_lhu", bu_vl = "bu_vl", sk_vl = "sk_vl", ks = "ks", vs = "vs", ss = "ss", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", por_cis_nab = "por_cis_nab", epo_stav_txt = "epo_stav_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", ixp_den_epospac = "ixp_den_epospac", ac_ag = "ac_ag", epo_stav = "epo_stav", priznak = "priznak", priznak_txt = "priznak_txt", soubor = "soubor", popis_wflsixb = "popis_wflsixb", velikost = "velikost", ixb = "ixb", dz_file = "dz_file", dat_modify = "dat_modify", tmp_file = "tmp_file", typ_otevreni = "typ_otevreni", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", ktg_dms = "ktg_dms", otevren = "otevren", zamcen = "zamcen", modifikovan = "modifikovan", m_zamek = "m_zamek", m_vyber = "m_vyber", esu_naz = "esu_naz", jmeno = "jmeno", prijmeni = "prijmeni", je_fin = "je_fin", po_case = "po_case", po_filuta = "po_filuta", ident_zpo = "ident_zpo", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", zda_sml = "zda_sml", stav = "stav", ukon = "ukon", ukon_txt = "ukon_txt", popis_ixb = "popis_ixb", dat_ukon = "dat_ukon", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", pri_pri_txt = "pri_pri_txt", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum SeznamDokumentuEpoDtoFragments { ixp = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", dat_prij_pod = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", popis = "*", dat_pis = "*", ixs_pri = "*", ac = "*", nazev = "*", typ_dgr = "*", cis_por = "*", rezim_pri = "*", rezim_pri_txt = "*", c = "*", ixs_krk = "*", dat_zad_p = "*", dat_sml_p = "*", dat_real_p = "*", dat_kos_p = "*", dat_uza_p = "*", cis_duz_txt = "*", cis_ner_txt = "*", cis_zve_txt = "*", dat_p_lhu = "*", bu_vl = "*", sk_vl = "*", ks = "*", vs = "*", ss = "*", bu_ci = "*", sk_ci = "*", ixs_esu = "*", por_cis_nab = "*", epo_stav_txt = "*", dat_zmena = "*", zmenu_prov = "*", ixp_den = "*", ixp_den_nazev = "*", ixp_den_epospac = "*", ac_ag = "*", epo_stav = "*", priznak = "*", priznak_txt = "*", soubor = "*", popis_wflsixb = "*", velikost = "*", ixb = "*", dz_file = "*", dat_modify = "*", tmp_file = "*", typ_otevreni = "*", dat_zverejneni = "*", zverejnil = "*", ktg_dms = "*", otevren = "*", zamcen = "*", modifikovan = "*", m_zamek = "*", m_vyber = "*", esu_naz = "*", jmeno = "*", prijmeni = "*", je_fin = "*", po_case = "*", po_filuta = "*", ident_zpo = "*", esu_ico = "*", esu_rc = "*", esu_dic = "*", zda_sml = "*", stav = "*", ukon = "*", ukon_txt = "*", popis_ixb = "*", dat_ukon = "*", cis_real_nazev = "*", nazev_rf = "*", pri_pri_txt = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum SeznamDokumentuEpoDtoTypes { ixp = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", dat_prij_pod = "JsonDate", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", popis = "string", dat_pis = "JsonDate", ixs_pri = "string", ac = "string", nazev = "string", typ_dgr = "string", cis_por = "number", rezim_pri = "number", rezim_pri_txt = "string", c = "JsonDecimal", ixs_krk = "string", dat_zad_p = "JsonDate", dat_sml_p = "JsonDate", dat_real_p = "JsonDate", dat_kos_p = "JsonDate", dat_uza_p = "JsonDate", cis_duz_txt = "string", cis_ner_txt = "string", cis_zve_txt = "string", dat_p_lhu = "JsonDate", bu_vl = "string", sk_vl = "string", ks = "string", vs = "string", ss = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", por_cis_nab = "number", epo_stav_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den = "string", ixp_den_nazev = "string", ixp_den_epospac = "string", ac_ag = "string", epo_stav = "number", priznak = "number", priznak_txt = "string", soubor = "string", popis_wflsixb = "string", velikost = "number", ixb = "string", dz_file = "JsonDate", dat_modify = "JsonDate", tmp_file = "string", typ_otevreni = "number", dat_zverejneni = "JsonDate", zverejnil = "string", ktg_dms = "string", otevren = "number", zamcen = "number", modifikovan = "number", m_zamek = "number", m_vyber = "number", esu_naz = "string", jmeno = "string", prijmeni = "string", je_fin = "string", po_case = "number", po_filuta = "number", ident_zpo = "number", esu_ico = "string", esu_rc = "string", esu_dic = "string", zda_sml = "string", stav = "string", ukon = "string", ukon_txt = "string", popis_ixb = "string", dat_ukon = "JsonDate", cis_real_nazev = "string", nazev_rf = "string", pri_pri_txt = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Gordic.Epo.Interface.SeznamEpoDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:Seznam*/
	interface SeznamEpoDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.soutez_po*/
		soutez_po?: string|null;
		/**DBCOLUMN:Seznam.soutez_po_txt*/
		soutez_po_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.s_sou_txt*/
		s_sou_txt?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zpo*/
		dat_zpo?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri*/
		pri_pri?: string|null;
		/**DBCOLUMN:Seznam.pri_pri*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.cj_po*/
		cj_po?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Seznam.m_zamek*/
		m_zamek?: number|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:Seznam.sta_sml*/
		sta_sml?: number|null;
		/**DBCOLUMN:Seznam.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.priz_view_txt*/
		priz_view_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Seznam.typ_fin_txt*/
		typ_fin_txt?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_epospac*/
		ixp_den_epospac?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_epospac_nazev*/
		ixp_den_epospac_nazev?: string|null;
		/**DBCOLUMN:Seznam.priz_view_all*/
		priz_view_all?: number|null;
		/**DBCOLUMN:Seznam.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:Seznam.pred_urc_txt*/
		pred_urc_txt?: string|null;
		/**DBCOLUMN:Seznam.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:Seznam.lim_zac*/
		lim_zac_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_po*/
		typ_po?: number|null;
		/**DBCOLUMN:Seznam.typ_po_txt*/
		typ_po_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**ukon_txt*/
		ukon_txt?: string|null;
		/**DBCOLUMN:Seznam.uvo*/
		uvo?: string|null;
		/**DBCOLUMN:Seznam.aat*/
		aat?: string|null;
		/**s_po*/
		s_po?: number|null;
		/**s_po_txt*/
		s_po_txt?: string|null;
		/**zda_sml*/
		zda_sml?: string|null;
		/**znak_s*/
		znak_s?: string|null;
		/**poc_dokl*/
		poc_dokl?: number|null;
		/**s_sou*/
		s_sou?: number|null;
		/**epo_stav*/
		epo_stav?: number|null;
		/**epo_stav_txt*/
		epo_stav_txt?: string|null;
		/**stav_ixp*/
		stav_ixp?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**kont_osoba*/
		kont_osoba?: string|null;
		/**jmeno*/
		jmeno?: string|null;
		/**prijmeni*/
		prijmeni?: string|null;
		/**esu_naz*/
		esu_naz?: string|null;
		/**popis*/
		popis?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
		/**esu_dic*/
		esu_dic?: string|null;
		/**priznak*/
		priznak?: number|null;
		/**soubor*/
		soubor?: string|null;
		/**popis_ixb*/
		popis_ixb?: string|null;
		/**priznak_txt*/
		priznak_txt?: string|null;
		/**	DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_pis*/
		dat_pis?: JsonDate|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**velikost*/
		velikost?: number|null;
		/**DBCOLUMN:Seznam.dat_zverejneni*/
		dat_zverejneni?: JsonDate|null;
		/**DBCOLUMN:Seznam.zverejnil*/
		zverejnil?: string|null;
	}
	const enum SeznamEpoDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", cis_real_nazev = "cis_real_nazev", ixs_fun_komp = "ixs_fun_komp", nazev_rf = "nazev_rf", ac = "ac", nazev = "nazev", soutez_po = "soutez_po", soutez_po_txt = "soutez_po_txt", cis_por = "cis_por", s_sou_txt = "s_sou_txt", rezim_pri_txt = "rezim_pri_txt", c = "c", dat_pri = "dat_pri", dat_zpo = "dat_zpo", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", pri_pri = "pri_pri", pri_pri_txt = "pri_pri_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cj_po = "cj_po", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", m_zamek = "m_zamek", m_vyber = "m_vyber", sta_sml = "sta_sml", priz_prip = "priz_prip", ac_ag = "ac_ag", priz_view = "priz_view", priz_view_txt = "priz_view_txt", typ_fin = "typ_fin", typ_fin_txt = "typ_fin_txt", ixp_den_epospac = "ixp_den_epospac", ixp_den_epospac_nazev = "ixp_den_epospac_nazev", priz_view_all = "priz_view_all", pred_urc = "pred_urc", pred_urc_txt = "pred_urc_txt", lim_zac = "lim_zac", lim_zac_txt = "lim_zac_txt", typ_po = "typ_po", typ_po_txt = "typ_po_txt", ixs_krk = "ixs_krk", ukon = "ukon", ukon_txt = "ukon_txt", uvo = "uvo", aat = "aat", s_po = "s_po", s_po_txt = "s_po_txt", zda_sml = "zda_sml", znak_s = "znak_s", poc_dokl = "poc_dokl", s_sou = "s_sou", epo_stav = "epo_stav", epo_stav_txt = "epo_stav_txt", stav_ixp = "stav_ixp", ixp = "ixp", kont_osoba = "kont_osoba", jmeno = "jmeno", prijmeni = "prijmeni", esu_naz = "esu_naz", popis = "popis", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", priznak = "priznak", soubor = "soubor", popis_ixb = "popis_ixb", priznak_txt = "priznak_txt", dat_prij_pod = "dat_prij_pod", ixs_typ_txt = "ixs_typ_txt", dat_pis = "dat_pis", ktg_typ = "ktg_typ", velikost = "velikost", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum SeznamEpoDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", cis_real_nazev = "*", ixs_fun_komp = "*", nazev_rf = "*", ac = "*", nazev = "*", soutez_po = "*", soutez_po_txt = "*", cis_por = "*", s_sou_txt = "*", rezim_pri_txt = "*", c = "*", dat_pri = "*", dat_zpo = "*", dat_zad_p = "*", dat_zad_s = "*", dat_sml_p = "*", dat_sml_s = "*", dat_kos_p = "*", dat_kos_s = "*", dat_real_p = "*", dat_real_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz_txt = "*", cis_ner_txt = "*", pri_pri = "*", pri_pri_txt = "*", dat_zmena = "*", zmenu_prov = "*", cj_po = "*", ixp_den = "*", ixp_den_nazev = "*", m_zamek = "*", m_vyber = "*", sta_sml = "*", priz_prip = "*", ac_ag = "*", priz_view = "*", priz_view_txt = "*", typ_fin = "*", typ_fin_txt = "*", ixp_den_epospac = "*", ixp_den_epospac_nazev = "*", priz_view_all = "*", pred_urc = "*", pred_urc_txt = "*", lim_zac = "*", lim_zac_txt = "*", typ_po = "*", typ_po_txt = "*", ixs_krk = "*", ukon = "*", ukon_txt = "*", uvo = "*", aat = "*", s_po = "*", s_po_txt = "*", zda_sml = "*", znak_s = "*", poc_dokl = "*", s_sou = "*", epo_stav = "*", epo_stav_txt = "*", stav_ixp = "*", ixp = "*", kont_osoba = "*", jmeno = "*", prijmeni = "*", esu_naz = "*", popis = "*", esu_ico = "*", esu_rc = "*", esu_dic = "*", priznak = "*", soubor = "*", popis_ixb = "*", priznak_txt = "*", dat_prij_pod = "*", ixs_typ_txt = "*", dat_pis = "*", ktg_typ = "*", velikost = "*", dat_zverejneni = "*", zverejnil = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum SeznamEpoDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", cis_real_nazev = "string", ixs_fun_komp = "string", nazev_rf = "string", ac = "string", nazev = "string", soutez_po = "string", soutez_po_txt = "string", cis_por = "number", s_sou_txt = "string", rezim_pri_txt = "string", c = "JsonDecimal", dat_pri = "JsonDate", dat_zpo = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz_txt = "string", cis_ner_txt = "string", pri_pri = "string", pri_pri_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", cj_po = "string", ixp_den = "string", ixp_den_nazev = "string", m_zamek = "number", m_vyber = "number", sta_sml = "number", priz_prip = "number", ac_ag = "string", priz_view = "number", priz_view_txt = "string", typ_fin = "number", typ_fin_txt = "string", ixp_den_epospac = "string", ixp_den_epospac_nazev = "string", priz_view_all = "number", pred_urc = "number", pred_urc_txt = "string", lim_zac = "number", lim_zac_txt = "string", typ_po = "number", typ_po_txt = "string", ixs_krk = "string", ukon = "string", ukon_txt = "string", uvo = "string", aat = "string", s_po = "number", s_po_txt = "string", zda_sml = "string", znak_s = "string", poc_dokl = "number", s_sou = "number", epo_stav = "number", epo_stav_txt = "string", stav_ixp = "string", ixp = "string", kont_osoba = "string", jmeno = "string", prijmeni = "string", esu_naz = "string", popis = "string", esu_ico = "string", esu_rc = "string", esu_dic = "string", priznak = "number", soubor = "string", popis_ixb = "string", priznak_txt = "string", dat_prij_pod = "JsonDate", ixs_typ_txt = "string", dat_pis = "JsonDate", ktg_typ = "number", velikost = "number", dat_zverejneni = "JsonDate", zverejnil = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Dto\Const\Gordic.Epo.Interface.GDatPrubehConstDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Konstanty datový průběh*/
	interface GDatPrubehConstDto {
		/**vlastnik*/
		vlastnik?: string|null;
		/**ixsFun*/
		ixsFun?: string|null;
		/**jeVprc*/
		jeVprc?: string|null;
		/**dnes*/
		dnes?: JsonDate|null;
	}
	const enum GDatPrubehConstDtoNames { vlastnik = "vlastnik", ixsFun = "ixsFun", jeVprc = "jeVprc", dnes = "dnes",}
	const enum GDatPrubehConstDtoFragments { vlastnik = "*", ixsFun = "*", jeVprc = "*", dnes = "*",}
	const enum GDatPrubehConstDtoTypes { vlastnik = "string", ixsFun = "string", jeVprc = "string", dnes = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpocevsDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epocevs*/
	interface GEpocevsDto {
		/**DBCOLUMN:epocevs.epo_stav*/
		epo_stav?: number|null;
		/**DBCOLUMN:epocevs.epo_stav_txt*/
		epo_stav_txt?: string|null;
		/**DBCOLUMN:epocevs.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:epocevs.k_s*/
		k_s?: string|null;
	}
	const enum GEpocevsDtoNames { epo_stav = "epo_stav", epo_stav_txt = "epo_stav_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEpocevsDtoFragments { epo_stav = "*", epo_stav_txt = "*", k_v = "*", k_s = "*",}
	const enum GEpocevsDtoTypes { epo_stav = "number", epo_stav_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpockriDto .d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epockri*/
	interface GEpockriDto {
		/**cis_kri*/
		cis_kri?: number|null;
		/**cis_kri_txt*/
		cis_kri_txt?: string|null;
	}
	const enum GEpockriDtoNames { cis_kri = "cis_kri", cis_kri_txt = "cis_kri_txt",}
	const enum GEpockriDtoFragments { cis_kri = "*", cis_kri_txt = "*",}
	const enum GEpockriDtoTypes { cis_kri = "number", cis_kri_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpoclimDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epoclim*/
	interface GEpoclimDto {
		/**DBCOLUMN:epoclim.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:epoclim.lim_zac_txt*/
		lim_zac_txt?: string|null;
		/**DBCOLUMN:epoclim.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:epoclim.k_s*/
		k_s?: string|null;
	}
	const enum GEpoclimDtoNames { lim_zac = "lim_zac", lim_zac_txt = "lim_zac_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEpoclimDtoFragments { lim_zac = "*", lim_zac_txt = "*", k_v = "*", k_s = "*",}
	const enum GEpoclimDtoTypes { lim_zac = "number", lim_zac_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpocpruDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epocpru*/
	interface GEpocpruDto {
		/**DBCOLUMN:epocpru.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:epocpru.pred_urc_txt*/
		pred_urc_txt?: string|null;
		/**DBCOLUMN:epocpru.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:epocpru.k_s*/
		k_s?: string|null;
	}
	const enum GEpocpruDtoNames { pred_urc = "pred_urc", pred_urc_txt = "pred_urc_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEpocpruDtoFragments { pred_urc = "*", pred_urc_txt = "*", k_v = "*", k_s = "*",}
	const enum GEpocpruDtoTypes { pred_urc = "number", pred_urc_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpocspoDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epocspo*/
	interface GEpocspoDto {
		/**DBCOLUMN:epocspo.s_po*/
		s_po?: number|null;
		/**DBCOLUMN:epocspo.s_po_txt*/
		s_po_txt?: string|null;
		/**DBCOLUMN:epocspo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:epocspo.k_s*/
		k_s?: string|null;
	}
	const enum GEpocspoDtoNames { s_po = "s_po", s_po_txt = "s_po_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEpocspoDtoFragments { s_po = "*", s_po_txt = "*", k_v = "*", k_s = "*",}
	const enum GEpocspoDtoTypes { s_po = "number", s_po_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpocssoDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epocsso*/
	interface GEpocssoDto {
		/**DBCOLUMN:epocsso.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:epocsso.s_sou_txt*/
		s_sou_txt?: string|null;
		/**DBCOLUMN:epocsso.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:epocsso.k_s*/
		k_s?: string|null;
	}
	const enum GEpocssoDtoNames { s_sou = "s_sou", s_sou_txt = "s_sou_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEpocssoDtoFragments { s_sou = "*", s_sou_txt = "*", k_v = "*", k_s = "*",}
	const enum GEpocssoDtoTypes { s_sou = "number", s_sou_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpoctdaDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epoctda*/
	interface GEpoctdaDto {
		/**DBCOLUMN:epoctda.typ_datum*/
		typ_datum?: string|null;
		/**DBCOLUMN:epoctda.typ_datum_txt*/
		typ_datum_txt?: string|null;
		/**DBCOLUMN:epoctda.priz_td*/
		priz_td?: number|null;
		/**DBCOLUMN:epoctda.opak_typ*/
		opak_typ?: string|null;
		/**DBCOLUMN:epoctda.aktivita*/
		aktivita?: number|null;
	}
	const enum GEpoctdaDtoNames { typ_datum = "typ_datum", typ_datum_txt = "typ_datum_txt", priz_td = "priz_td", opak_typ = "opak_typ", aktivita = "aktivita",}
	const enum GEpoctdaDtoFragments { typ_datum = "*", typ_datum_txt = "*", priz_td = "*", opak_typ = "*", aktivita = "*",}
	const enum GEpoctdaDtoTypes { typ_datum = "string", typ_datum_txt = "string", priz_td = "number", opak_typ = "string", aktivita = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\EPO\Controls\Dto\Gordic.Epo.Interface.GEpossopDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**DBTABLE:epossop*/
	interface GEpossopDto {
		/**DBCOLUMN:epossop.soutez_po*/
		soutez_po?: string|null;
		/**DBCOLUMN:epossop.soutez_po_txt*/
		soutez_po_txt?: string|null;
		/**DBCOLUMN:epossop.typ_po*/
		typ_po?: number|null;
		/**DBCOLUMN:epossop.typ_po*/
		typ_po_txt?: string|null;
		/**DBCOLUMN:epossop.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:epossop.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:epossop.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:epossop.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:epossop.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:epossop.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:epossop.pred_urc*/
		pred_urc_txt?: string|null;
		/**DBCOLUMN:epossop.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:epossop.lim_zac*/
		lim_zac_txt?: string|null;
	}
	const enum GEpossopDtoNames { soutez_po = "soutez_po", soutez_po_txt = "soutez_po_txt", typ_po = "typ_po", typ_po_txt = "typ_po_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pred_urc = "pred_urc", pred_urc_txt = "pred_urc_txt", lim_zac = "lim_zac", lim_zac_txt = "lim_zac_txt",}
	const enum GEpossopDtoFragments { soutez_po = "*", soutez_po_txt = "*", typ_po = "*", typ_po_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", pred_urc = "*", pred_urc_txt = "*", lim_zac = "*", lim_zac_txt = "*",}
	const enum GEpossopDtoTypes { soutez_po = "string", soutez_po_txt = "string", typ_po = "number", typ_po_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", pred_urc = "number", pred_urc_txt = "string", lim_zac = "number", lim_zac_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Filters\Gordic.Epo.Interface.GEpoFiltrDokDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Filtrovací dto pro dokumenty*/
	interface GEpoFiltrDokDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		dat_pi?: GIntervalDto<JsonDate>|null;
		ixs_typ?: string|null;
		stav_pis?: number|null;
		/**ičo*/
		ico_esu?: string|null;
		/**dič*/
		dic?: string|null;
		/**rč*/
		rc?: string|null;
		/**právní forma*/
		pr_forma?: string|null;
		/**název subjektu*/
		esu_txt?: GBaseFilter<string>|null;
		/**datum převzetí nabídky*/
		dat_pre_nab?: GIntervalDto<JsonDate>|null;
		typ_esu?: number|null;
		typ_org?: number|null;
		ixs_fun_vl?: string|null;
		kompl_z?: boolean|null;
		cb1?: boolean|null;
		cb2?: boolean|null;
		cb3?: boolean|null;
		/**doplnit*/
		doplnit?: boolean|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
	}
	const enum GEpoFiltrDokDtoNames { ixs_pri = "ixs_pri", ixs_esu = "ixs_esu", dat_pi = "dat_pi", ixs_typ = "ixs_typ", stav_pis = "stav_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", typ_esu = "typ_esu", typ_org = "typ_org", ixs_fun_vl = "ixs_fun_vl", kompl_z = "kompl_z", cb1 = "cb1", cb2 = "cb2", cb3 = "cb3", doplnit = "doplnit", vlastnosti = "vlastnosti",}
	const enum GEpoFiltrDokDtoFragments { ixs_pri = "*", ixs_esu = "*", dat_pi = "*", ixs_typ = "*", stav_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", typ_esu = "*", typ_org = "*", ixs_fun_vl = "*", kompl_z = "*", cb1 = "*", cb2 = "*", cb3 = "*", doplnit = "*", vlastnosti = "*",}
	const enum GEpoFiltrDokDtoTypes { ixs_pri = "string", ixs_esu = "string", dat_pi = "GIntervalDto<JsonDate>", ixs_typ = "string", stav_pis = "number", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", typ_esu = "number", typ_org = "number", ixs_fun_vl = "string", kompl_z = "boolean", cb1 = "boolean", cb2 = "boolean", cb3 = "boolean", doplnit = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Filters\Gordic.Epo.Interface.GEpoFiltrDto.d.ts 

declare namespace Gordic.Epo.Interface {
	interface GEpoFiltrDto {
		/**Evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**Agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**realizátor*/
		cis_real?: string|null;
		/**název*/
		nazev_po?: GBaseFilter<string>|null;
		/**oblast PO*/
		s_po?: number|null;
		/**PO v přípravě*/
		s_po_00?: boolean|null;
		/**PO schválený*/
		s_po_10?: boolean|null;
		/**PO zahájený*/
		s_po_20?: boolean|null;
		/**PO ukončený*/
		s_po_50?: boolean|null;
		/**PO zrušený*/
		s_po_80?: boolean|null;
		/**PO storno*/
		s_po_90?: boolean|null;
		/**kompetent*/
		ixs_fun_komp?: string|null;
		/**soutěž PO*/
		soutez_po?: string|null;
		/**blokovaná částka*/
		c_plan?: GIntervalDto<JsonDecimal>|null;
		/**předpokládaná částka*/
		c_ps?: GIntervalDto<JsonDecimal>|null;
		/**schválená částka*/
		c_sch?: GIntervalDto<JsonDecimal>|null;
		/**čj PO*/
		cj_po?: GIntervalDto<string>|null;
		/**vlastník*/
		ixs_fun_vl?: string|null;
		/**historie*/
		hist?: boolean|null;
		/**založeni PO*/
		dat_pri?: GIntervalDto<JsonDate>|null;
		/**zrušeni PO*/
		dat_zpo?: GIntervalDto<JsonDate>|null;
		/**rok založení*/
		rok_zal?: GIntervalDto<number>|null;
		/**financování*/
		fin?: GIntervalDto<number>|null;
		/**priz_view*/
		priz_view?: number|null;
		/**typ_fin*/
		typ_fin?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**čj*/
		cj_pis?: GIntervalDto<string>|null;
		/**ičo*/
		ico_esu?: string|null;
		/**dič*/
		dic?: string|null;
		/**rč*/
		rc?: string|null;
		/**právní forma*/
		pr_forma?: string|null;
		/**název subjektu*/
		esu_txt?: GBaseFilter<string>|null;
		/**datum převzetí nabídky*/
		dat_pre_nab?: GIntervalDto<JsonDate>|null;
		/**ter_pla_1*/
		dat_zad_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_2*/
		dat_sml_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_3*/
		dat_kos_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_4*/
		dat_real_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_5*/
		dat_uza_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_1*/
		dat_zad_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_2*/
		dat_sml_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_3*/
		dat_kos_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_4*/
		dat_real_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_5*/
		dat_uza_s?: GIntervalDto<JsonDate>|null;
		/**ostatní údaje	částka*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**režim po*/
		rezim_pri?: number|null;
		/**důvod zrušení*/
		cis_duz?: number|null;
		/**důvod nerealizace*/
		cis_ner?: number|null;
		/**priorita*/
		pri_pri?: number|null;
		/**případ komentář*/
		poznamka_po?: GBaseFilter<string>|null;
		/**případ poznámka*/
		poznamka_wfl?: GBaseFilter<string>|null;
		/**dokument popis*/
		poznamka_pis?: GBaseFilter<string>|null;
		/**dokument poznámka*/
		pozn_wfl_pis?: GBaseFilter<string>|null;
		/**Stav insolvence*/
		elm?: Gordic.Pap.Interface.GPapCfuDto[]|null;
		/**bez_financovani*/
		bez_financovani?: boolean|null;
		/**bez_nasmlouvanosti*/
		bez_nasmlouvanosti?: boolean|null;
		/**bez_rezervaci*/
		bez_rezervaci?: boolean|null;
		dat_vys?: GIntervalDto<JsonDate>|null;
		dat_vyz?: GIntervalDto<JsonDate>|null;
		c_nav?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GEpoFiltrDtoNames { ac = "ac", ac_ag = "ac_ag", cis_real = "cis_real", nazev_po = "nazev_po", s_po = "s_po", s_po_00 = "s_po_00", s_po_10 = "s_po_10", s_po_20 = "s_po_20", s_po_50 = "s_po_50", s_po_80 = "s_po_80", s_po_90 = "s_po_90", ixs_fun_komp = "ixs_fun_komp", soutez_po = "soutez_po", c_plan = "c_plan", c_ps = "c_ps", c_sch = "c_sch", cj_po = "cj_po", ixs_fun_vl = "ixs_fun_vl", hist = "hist", dat_pri = "dat_pri", dat_zpo = "dat_zpo", rok_zal = "rok_zal", fin = "fin", priz_view = "priz_view", typ_fin = "typ_fin", ixp = "ixp", cj_pis = "cj_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_zad_p = "dat_zad_p", dat_sml_p = "dat_sml_p", dat_kos_p = "dat_kos_p", dat_real_p = "dat_real_p", dat_uza_p = "dat_uza_p", dat_zad_s = "dat_zad_s", dat_sml_s = "dat_sml_s", dat_kos_s = "dat_kos_s", dat_real_s = "dat_real_s", dat_uza_s = "dat_uza_s", c = "c", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", poznamka_po = "poznamka_po", poznamka_wfl = "poznamka_wfl", poznamka_pis = "poznamka_pis", pozn_wfl_pis = "pozn_wfl_pis", elm = "elm", bez_financovani = "bez_financovani", bez_nasmlouvanosti = "bez_nasmlouvanosti", bez_rezervaci = "bez_rezervaci", dat_vys = "dat_vys", dat_vyz = "dat_vyz", c_nav = "c_nav",}
	const enum GEpoFiltrDtoFragments { ac = "*", ac_ag = "*", cis_real = "*", nazev_po = "*", s_po = "*", s_po_00 = "*", s_po_10 = "*", s_po_20 = "*", s_po_50 = "*", s_po_80 = "*", s_po_90 = "*", ixs_fun_komp = "*", soutez_po = "*", c_plan = "*", c_ps = "*", c_sch = "*", cj_po = "*", ixs_fun_vl = "*", hist = "*", dat_pri = "*", dat_zpo = "*", rok_zal = "*", fin = "*", priz_view = "*", typ_fin = "*", ixp = "*", cj_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_zad_p = "*", dat_sml_p = "*", dat_kos_p = "*", dat_real_p = "*", dat_uza_p = "*", dat_zad_s = "*", dat_sml_s = "*", dat_kos_s = "*", dat_real_s = "*", dat_uza_s = "*", c = "*", rezim_pri = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", poznamka_po = "*", poznamka_wfl = "*", poznamka_pis = "*", pozn_wfl_pis = "*", elm = "*", bez_financovani = "*", bez_nasmlouvanosti = "*", bez_rezervaci = "*", dat_vys = "*", dat_vyz = "*", c_nav = "*",}
	const enum GEpoFiltrDtoTypes { ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", cis_real = "string", nazev_po = "GBaseFilter<string>", s_po = "number", s_po_00 = "boolean", s_po_10 = "boolean", s_po_20 = "boolean", s_po_50 = "boolean", s_po_80 = "boolean", s_po_90 = "boolean", ixs_fun_komp = "string", soutez_po = "string", c_plan = "GIntervalDto<JsonDecimal>", c_ps = "GIntervalDto<JsonDecimal>", c_sch = "GIntervalDto<JsonDecimal>", cj_po = "GIntervalDto<string>", ixs_fun_vl = "string", hist = "boolean", dat_pri = "GIntervalDto<JsonDate>", dat_zpo = "GIntervalDto<JsonDate>", rok_zal = "GIntervalDto<number>", fin = "GIntervalDto<number>", priz_view = "number", typ_fin = "number", ixp = "string", cj_pis = "GIntervalDto<string>", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_zad_p = "GIntervalDto<JsonDate>", dat_sml_p = "GIntervalDto<JsonDate>", dat_kos_p = "GIntervalDto<JsonDate>", dat_real_p = "GIntervalDto<JsonDate>", dat_uza_p = "GIntervalDto<JsonDate>", dat_zad_s = "GIntervalDto<JsonDate>", dat_sml_s = "GIntervalDto<JsonDate>", dat_kos_s = "GIntervalDto<JsonDate>", dat_real_s = "GIntervalDto<JsonDate>", dat_uza_s = "GIntervalDto<JsonDate>", c = "GIntervalDto<JsonDecimal>", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", poznamka_po = "GBaseFilter<string>", poznamka_wfl = "GBaseFilter<string>", poznamka_pis = "GBaseFilter<string>", pozn_wfl_pis = "GBaseFilter<string>", elm = "Gordic.Pap.Interface.GPapCfuDto[]", bez_financovani = "boolean", bez_nasmlouvanosti = "boolean", bez_rezervaci = "boolean", dat_vys = "GIntervalDto<JsonDate>", dat_vyz = "GIntervalDto<JsonDate>", c_nav = "GIntervalDto<JsonDecimal>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Filters\Gordic.Epo.Interface.GEpoFiltrUchazeciDto.d.ts 

declare namespace Gordic.Epo.Interface {
	/**Filtrovací dto pro uchazeče*/
	interface GEpoFiltrUchazeciDto {
		ico_esu?: string|null;
		/**dič*/
		dic?: string|null;
		/**rč*/
		rc?: string|null;
		/**právní forma*/
		pr_forma?: string|null;
		/**název subjektu*/
		esu_txt?: GBaseFilter<string>|null;
		/**datum převzetí nabídky*/
		dat_pre_nab?: GIntervalDto<JsonDate>|null;
		/**datum změny*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		typ_esu?: number|null;
		typ_org?: number|null;
		ixs_fun_vl?: string|null;
		/**název*/
		nazev_po?: GBaseFilter<string>|null;
		/**PO návrh*/
		s_po_00?: boolean|null;
		/**PO schválený*/
		s_po_10?: boolean|null;
		/**PO zahájený*/
		s_po_20?: boolean|null;
		/**PO ukončený*/
		s_po_50?: boolean|null;
		/**PO zrušený*/
		s_po_80?: boolean|null;
		/**PO storno*/
		s_po_90?: boolean|null;
		/**typ*/
		typ?: string|null;
	}
	const enum GEpoFiltrUchazeciDtoNames { ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_zmena = "dat_zmena", typ_esu = "typ_esu", typ_org = "typ_org", ixs_fun_vl = "ixs_fun_vl", nazev_po = "nazev_po", s_po_00 = "s_po_00", s_po_10 = "s_po_10", s_po_20 = "s_po_20", s_po_50 = "s_po_50", s_po_80 = "s_po_80", s_po_90 = "s_po_90", typ = "typ",}
	const enum GEpoFiltrUchazeciDtoFragments { ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_zmena = "*", typ_esu = "*", typ_org = "*", ixs_fun_vl = "*", nazev_po = "*", s_po_00 = "*", s_po_10 = "*", s_po_20 = "*", s_po_50 = "*", s_po_80 = "*", s_po_90 = "*", typ = "*",}
	const enum GEpoFiltrUchazeciDtoTypes { ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_zmena = "GIntervalDto<JsonDate>", typ_esu = "number", typ_org = "number", ixs_fun_vl = "string", nazev_po = "GBaseFilter<string>", s_po_00 = "boolean", s_po_10 = "boolean", s_po_20 = "boolean", s_po_50 = "boolean", s_po_80 = "boolean", s_po_90 = "boolean", typ = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Gordic.Epo.Interface.EpospidAllDokPOService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty PO
	* @domain PrevodyOdprodeje
	*/
	interface EpospidAllDokPOService {
		/**detail dokumentu*/
		list(rq?:Gordic.Epo.Interface.GEpoFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.EpospidDto>>;
		/**počet dokladú daného případu*/
		count(rq?:Gordic.Epo.Interface.GEpoFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**schválení písemnosti*/
		schvalitPis(rq?:CallParams<{list:string[]}>): _Task<{list:string[]},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpospidAllDokPOService: ServiceBase & Catalog.EpospidAllDokPOService;
	}
	const EpospidAllDokPOService: Client["EpospidAllDokPOService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Gordic.Epo.Interface.EpospidAllDokService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty Epospid
	* @domain PrevodyOdprodeje
	*/
	interface EpospidAllDokService {
		/**detail dokumentu*/
		list(rq?:Gordic.Epo.Interface.GEpoFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.EpospidDto>>;
		/**Počet záznamů*/
		count(rq?:Gordic.Epo.Interface.GEpoFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		readPid(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Epo.Interface.EpospidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpospidAllDokService: ServiceBase & Catalog.EpospidAllDokService;
	}
	const EpospidAllDokService: Client["EpospidAllDokService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Gordic.Epo.Interface.EpospidAllElDokPOService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny el. dokumenty PO
	* @domain PrevodyOdprodeje
	*/
	interface EpospidAllElDokPOService {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.EpospidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpospidAllElDokPOService: ServiceBase & Catalog.EpospidAllElDokPOService;
	}
	const EpospidAllElDokPOService: Client["EpospidAllElDokPOService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Gordic.Epo.Interface.EpospidAllElDokService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty Epospid
	* @domain PrevodyOdprodeje
	*/
	interface EpospidAllElDokService {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.EpospidDto>>;
		/**počet záznamů*/
		count(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpospidAllElDokService: ServiceBase & Catalog.EpospidAllElDokService;
	}
	const EpospidAllElDokService: Client["EpospidAllElDokService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Gordic.Epo.Interface.EpospriService.d.ts 

declare namespace Gordic.Isl {
    /**Dokument evzspri*/
	abstract class EpospriService extends ServiceBase {
        /**seznam dokumentů*/
		public static read(rq?:Gordic.Epo.Interface.EpospriDto|CallParams<GServiceReadRequest<Gordic.Epo.Interface.EpospriDto>>): _Task<GServiceReadRequest<Gordic.Epo.Interface.EpospriDto>,GServiceReadResponse<Gordic.Epo.Interface.EpospriDto>>;
        /**detail dokumentu*/
		public static list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.EpospriDto>>;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Gordic.Epo.Interface.IGHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání "pidu".
	* @domain PrevodyOdprodeje
	*/
	interface EpoHledani {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpoHledani: ServiceBase & Catalog.EpoHledani;
	}
	const EpoHledani: Client["EpoHledani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Detail\DatPrubeh\Gordic.Epo.Interface.IGDatPrubeh.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Části VZ
	* @domain PrevodyOdprodeje
	*/
	interface EpoDatPrubeh {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.GEpovdatDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Epo.Interface.GEpovdatDto|CallParams<GServiceSaveRequest<Gordic.Epo.Interface.GEpovdatDto>>): _Task<GServiceSaveRequest<Gordic.Epo.Interface.GEpovdatDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Epo.Interface.GEpovdatDto|CallParams<GServiceSaveRequest<Gordic.Epo.Interface.GEpovdatDto>>): _Task<GServiceSaveRequest<Gordic.Epo.Interface.GEpovdatDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpoDatPrubeh: ServiceBase & Catalog.EpoDatPrubeh;
	}
	const EpoDatPrubeh: Client["EpoDatPrubeh"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Detail\Detail\Gordic.Epo.Interface.IGDetailPO.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Detail
	* @domain PrevodyOdprodeje
	*/
	interface EpoDetailPO {
		/**Uložení detailu*/
		update(rq?:Gordic.Epo.Interface.GParamDetailDto|CallParams<GServiceSaveRequest<Gordic.Epo.Interface.GParamDetailDto>>): _Task<GServiceSaveRequest<Gordic.Epo.Interface.GParamDetailDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GPodaniDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPodaniDto>>;
		/**vložení záznamů*/
		insertPole(rq?:Gordic.Pap.Interface.GPodaniPoleDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniPoleDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniPoleDto>,Gordic.Pap.Interface.GCommonReturnDto>;
		/**Naplnění parametrů pro formulář detailu*/
		naplnParam(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Epo.Interface.GParamDetailDto>>;
		/**Kontrola dat detailu*/
		kontrolaDat(rq?:Gordic.Epo.Interface.GParamDetailDto|CallParams<GServiceSaveRequest<Gordic.Epo.Interface.GParamDetailDto>>): _Task<GServiceSaveRequest<Gordic.Epo.Interface.GParamDetailDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Kontrola pole datum vyhlášení*/
		kontrolaDatVyhl(rq?:Gordic.Pap.Interface.GDatVyhlInputDto|CallParams<GServiceActionRequest<Gordic.Pap.Interface.GDatVyhlInputDto>>): _Task<GServiceActionRequest<Gordic.Pap.Interface.GDatVyhlInputDto>,GServiceActionResponse<Gordic.Pap.Interface.GDatVyhlReturnDto>>;
		/**detail vfpsesu pro ixs_esu_v*/
		readEsuV(rq?:CallParams<{ixs_pri:string,cis_por:number,por_cis_nab:number,typ_dgr:string}>): _Task<{ixs_pri:string,cis_por:number,por_cis_nab:number,typ_dgr:string},GServiceReadResponse<Gordic.Epo.Interface.GEposesuDto>>;
		/**Kontrola na duplicitu ixs_esu*/
		kontrolaEsu(rq?:CallParams<{ixs_pri:string,ixs_esu:string,por_cis_nab:number,cis_por:number,ktg_typ:number,soutez:string}>): _Task<{ixs_pri:string,ixs_esu:string,por_cis_nab:number,cis_por:number,ktg_typ:number,soutez:string},GServiceReadResponse<Gordic.Pap.Interface.GEsuKontrolaDto>>;
		/**Hromadné operace*/
		hromadneUpdate(rq?:CallParams<{ixp:string,stav:number,kontrolaHO:number,paramIxsPri:string}>): _Task<{ixp:string,stav:number,kontrolaHO:number,paramIxsPri:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**Kontrola před stornem*/
		kontrolaPredStornem(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpoDetailPO: ServiceBase & Catalog.EpoDetailPO;
	}
	const EpoDetailPO: Client["EpoDetailPO"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\ProdejeOdprodeje\Gordic.Epo.Interface.IGProdejeOdprodeje.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Dokument evzspri*/
	interface EpoProdejeOdprodeje {
		/**seznam dokumentů*/
		read(rq?:Gordic.Epo.Interface.EpospriDto|CallParams<GServiceReadRequest<Gordic.Epo.Interface.EpospriDto>>): _Task<GServiceReadRequest<Gordic.Epo.Interface.EpospriDto>,GServiceReadResponse<Gordic.Epo.Interface.EpospriDto>>;
		/**detail dokumentu*/
		list(rq?:Gordic.Epo.Interface.GEpoFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.EpospriDto>>;
		/**Data pro Kpi*/
		nactiKpiData(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},JsonDecimal[]>;
		/**počet záznamů*/
		count(rq?:Gordic.Epo.Interface.GEpoFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpoProdejeOdprodeje: ServiceBase & Catalog.EpoProdejeOdprodeje;
	}
	const EpoProdejeOdprodeje: Client["EpoProdejeOdprodeje"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Souteze\Gordic.Epo.Interface.IGSouteze.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Soutěže EPO
	* @domain PrevodyOdprodeje
	*/
	interface EpoSouteze {
		/**detail dokumentů*/
		read(rq?:Gordic.Epo.Interface.GEposesuDto|CallParams<GServiceReadRequest<Gordic.Epo.Interface.GEposesuDto>>): _Task<GServiceReadRequest<Gordic.Epo.Interface.GEposesuDto>,GServiceReadResponse<Gordic.Epo.Interface.GEposesuDto>>;
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.GEposesuDto>>;
		/**seznam dokumentu nabedo*/
		listNabedo(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.GEposesuDto>>;
		/**insert/update*/
		insUpdNabedo(rq?:Gordic.Epo.Interface.GEposesuDto|CallParams<GServiceSaveRequest<Gordic.Epo.Interface.GEposesuDto>>): _Task<GServiceSaveRequest<Gordic.Epo.Interface.GEposesuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpoSouteze: ServiceBase & Catalog.EpoSouteze;
	}
	const EpoSouteze: Client["EpoSouteze"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Epo.Interface\Service\Uchazeci\Gordic.Epo.Interface.IGUchazeci.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro uchazeče
	* @domain PrevodyOdprodeje
	*/
	interface EpoUchazeci {
		/**detail dokumentu*/
		list(rq?:Gordic.Epo.Interface.GEpoFiltrUchazeciDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Epo.Interface.GUchazeciDto>>;
		/**počet záznamů*/
		count(rq?:Gordic.Epo.Interface.GEpoFiltrUchazeciDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		nastavEss(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		provedeniHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Epo.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto}>): _Task<{rq:GServiceReadRequest<Gordic.Epo.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Kontrola HO*/
		kontrolaHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Epo.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto}>): _Task<{rq:GServiceReadRequest<Gordic.Epo.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EpoUchazeci: ServiceBase & Catalog.EpoUchazeci;
	}
	const EpoUchazeci: Client["EpoUchazeci"];
}

//#endregion

