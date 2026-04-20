/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       vfp.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Vfp.Interface\Gordic.Vfp.Interface.csproj
*    created     2026-02-16 14:36:37
*    files       Controls\Dto\GVfpcdgrDto.d.ts
*                Controls\Dto\GVfpcevsDto.d.ts
*                Controls\Dto\GVfpcpurDto.d.ts
*                Controls\Dto\GVfpcsdgDto.d.ts
*                Controls\Dto\GVfpczfiDto.d.ts
*                Controls\Dto\GVfpczpdDto.d.ts
*                DataSety\VFP\Gordic.Interface.GVfpsste.Dto.d.ts
*                Dto\Gordic.Vfp.Interface.DetailVfpDto.d.ts
*                Dto\Gordic.Vfp.Interface.GDetailEnableDto.d.ts
*                Dto\Gordic.Vfp.Interface.GDetailLabelsDto.d.ts
*                Dto\Gordic.Vfp.Interface.GLokality.Dto.d.ts
*                Dto\Gordic.Vfp.Interface.GParamDetailDto.d.ts
*                Dto\Gordic.Vfp.Interface.GParamPlneniDto.d.ts
*                Dto\Gordic.Vfp.Interface.GParamsDetailDto.d.ts
*                Dto\Gordic.Vfp.Interface.GPredvyhodnoceniListDto.d.ts
*                Dto\Gordic.Vfp.Interface.GUchazeciDto.d.ts
*                Dto\Gordic.Vfp.Interface.GVfpapza.Dto.d.ts
*                Dto\Gordic.Vfp.Interface.GVfpRestrikce.Dto - Copy.d.ts
*                Dto\Gordic.Vfp.Interface.GVfpRestrikce.Dto.d.ts
*                Dto\Gordic.Vfp.Interface.GVfpsesu.Dto.d.ts
*                Dto\Gordic.Vfp.Interface.GVfpXesoDto.d.ts
*                Dto\Gordic.Vfp.Interface.SeznamDokumentuVfpDto.d.ts
*                Dto\Gordic.Vfp.Interface.SeznamVfpDto.d.ts
*                Dto\Gordic.Vfp.Interface.VfpspidDto.d.ts
*                Dto\Gordic.Vfp.Interface.VfpspriDto.d.ts
*                Dto\Const\Gordic.Vfp.Interface.GLokalityConstDto.d.ts
*                Dto\Const\Gordic.Vfp.Interface.GPredvyhodnoceniConstDto.d.ts
*                Dto\Const\Gordic.Vfp.Interface.GProstredkyDto.d.ts
*                Filters\Gordic.Vfp.Interface.GVfpFiltrDokDto.d.ts
*                Filters\Gordic.Vfp.Interface.GVfpFiltrDto.d.ts
*                Filters\Gordic.Vfp.Interface.GVfpFiltrUchazeciDto.d.ts
*                Filters\Gordic.Vfp.Interface.IGVfpFilters.d.ts
*                Service\Gordic.Vfp.Interface.IGVfpAllDok.d.ts
*                Service\Gordic.Vfp.Interface.IGVfpAllElDok.d.ts
*                Service\Gordic.Vfp.Interface.IGVfpDTAllDok.d.ts
*                Service\Gordic.Vfp.Interface.IGVfpDTAllElDok.d.ts
*                Service\Gordic.Vfp.Interface.IGVfpHledani.d.ts
*                Service\Detail\Detail\Gordic.Vfp.Interface.IGVfpDetailDT.d.ts
*                Service\Detail\Lokality\Gordic.Vfp.Interface.IGLokality.d.ts
*                Service\Detail\Plneni\Gordic.Vfp.Interface.IGPlneni.d.ts
*                Service\Detail\Predvyhodnoceni\Gordic.Vfp.Interface.IGPredvyhodnoceni.d.ts
*                Service\Detail\Prostredky\Gordic.Vfp.Interface.IGProstredky.d.ts
*                Service\DotacniTitul\Gordic.Vfp.Interface.IGVfpDotacniTitul.d.ts
*                Service\HromadneOperace\Gordic.Vfp.Interface.IGVfpHromadneOperace.d.ts
*                Service\Uchazeci\Gordic.Vfp.Interface.IGVfpUchazeci.d.ts
*                Service\VS\Gordic.Vfp.Interface.IGVfpVS.d.ts
*                Service\Zadosti\Gordic.Vfp.Interface.IGZadosti.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Controls\Dto\GVfpcdgrDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**vfpcdgr*/
	interface GVfpcdgrDto {
		/**stav DT*/
		s_dgr?: number|null;
		/**nazev*/
		s_dgr_txt?: string|null;
	}
	const enum GVfpcdgrDtoNames { s_dgr = "s_dgr", s_dgr_txt = "s_dgr_txt",}
	const enum GVfpcdgrDtoFragments { s_dgr = "*", s_dgr_txt = "*",}
	const enum GVfpcdgrDtoTypes { s_dgr = "number", s_dgr_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Controls\Dto\GVfpcevsDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpcevs*/
	interface GVfpcevsDto {
		/**DBCOLUMN:vfpcevs.vfp_stav*/
		vfp_stav?: number|null;
		/**DBCOLUMN:vfpcevs.vfp_stav_txt*/
		vfp_stav_txt?: string|null;
	}
	const enum GVfpcevsDtoNames { vfp_stav = "vfp_stav", vfp_stav_txt = "vfp_stav_txt",}
	const enum GVfpcevsDtoFragments { vfp_stav = "*", vfp_stav_txt = "*",}
	const enum GVfpcevsDtoTypes { vfp_stav = "number", vfp_stav_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Controls\Dto\GVfpcpurDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpcpur*/
	interface GVfpcpurDto {
		/**DBCOLUMN:vfpcpur.pro_urc*/
		pro_urc?: number|null;
		/**DBCOLUMN:vfpcpur.pro_urc_txt*/
		pro_urc_txt?: string|null;
		/**DBCOLUMN:vfpcpur.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:vfpcpur.k_s*/
		k_s?: string|null;
	}
	const enum GVfpcpurDtoNames { pro_urc = "pro_urc", pro_urc_txt = "pro_urc_txt", k_v = "k_v", k_s = "k_s",}
	const enum GVfpcpurDtoFragments { pro_urc = "*", pro_urc_txt = "*", k_v = "*", k_s = "*",}
	const enum GVfpcpurDtoTypes { pro_urc = "number", pro_urc_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Controls\Dto\GVfpcsdgDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpcsdg*/
	interface GVfpcsdgDto {
		/**DBCOLUMN:vfpcsdg.s_sdg*/
		s_sdg?: number|null;
		/**DBCOLUMN:vfpcsdg.s_sdg_txt*/
		s_sdg_txt?: string|null;
	}
	const enum GVfpcsdgDtoNames { s_sdg = "s_sdg", s_sdg_txt = "s_sdg_txt",}
	const enum GVfpcsdgDtoFragments { s_sdg = "*", s_sdg_txt = "*",}
	const enum GVfpcsdgDtoTypes { s_sdg = "number", s_sdg_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Controls\Dto\GVfpczfiDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpczfi*/
	interface GVfpczfiDto {
		/**DBCOLUMN:vfpczfi.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:vfpczfi.zps_fin_txt*/
		zps_fin_txt?: string|null;
	}
	const enum GVfpczfiDtoNames { zps_fin = "zps_fin", zps_fin_txt = "zps_fin_txt",}
	const enum GVfpczfiDtoFragments { zps_fin = "*", zps_fin_txt = "*",}
	const enum GVfpczfiDtoTypes { zps_fin = "number", zps_fin_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Controls\Dto\GVfpczpdDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpczpd*/
	interface GVfpczpdDto {
		/**DBCOLUMN:vfpczpd.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:vfpczpd.zpus_pd_txt*/
		zpus_pd_txt?: string|null;
	}
	const enum GVfpczpdDtoNames { zpus_pd = "zpus_pd", zpus_pd_txt = "zpus_pd_txt",}
	const enum GVfpczpdDtoFragments { zpus_pd = "*", zpus_pd_txt = "*",}
	const enum GVfpczpdDtoTypes { zpus_pd = "number", zpus_pd_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\DataSety\VFP\Gordic.Interface.GVfpsste.Dto.d.ts 

declare namespace Gordic.Interface {
	/**DBTABLE:Seznam*/
	interface GVfpssteDto {
		/**DBCOLUMN:Seznam.ixs_ste*/
		ixs_ste?: string|null;
		/**DBCOLUMN:Seznam.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
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
		/**DBCOLUMN:Seznam.typ_ste*/
		typ_ste?: number|null;
		/**DBCOLUMN:Seznam.s_opak*/
		s_opak?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GVfpssteDtoNames { ixs_ste = "ixs_ste", id_ext = "id_ext", aktivita = "aktivita", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", typ_ste = "typ_ste", s_opak = "s_opak", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GVfpssteDtoFragments { ixs_ste = "*", id_ext = "*", aktivita = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", typ_ste = "*", s_opak = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GVfpssteDtoTypes { ixs_ste = "string", id_ext = "string", aktivita = "number", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", typ_ste = "number", s_opak = "number", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.DetailVfpDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:Detail*/
	interface DetailVfpDto {
		/**DBCOLUMN:Detail.ixs_pri*/
		ixs_pri?: string|null;
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
		/**DBCOLUMN:Detail.s_dgr*/
		s_dgr?: number|null;
		/**DBCOLUMN:Detail.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Detail.s_sdg*/
		s_sdg?: number|null;
		/**DBCOLUMN:Detail.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Detail.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Detail.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Detail.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zdg*/
		dat_zdg?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
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
		/**DBCOLUMN:Detail.stan_pig*/
		stan_pig?: number|null;
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Detail.cj_dgr*/
		cj_dgr?: string|null;
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
		/**DBCOLUMN:Detail.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Detail.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Detail.cis_prg*/
		cis_prg?: string|null;
		/**DBCOLUMN:Detail.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:Detail.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:Detail.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Detail.priz_ext_pri*/
		priz_ext_pri?: number|null;
		/**DBCOLUMN:Detail.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:Detail.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Detail.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:Detail.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Detail.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:Detail.cis_ucl*/
		cis_ucl?: string|null;
		/**DBCOLUMN:Detail.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:Detail.cislo_usn_dt*/
		cislo_usn_dt?: string|null;
		/**DBCOLUMN:Detail.druh_dtp*/
		druh_dtp?: number|null;
		/**DBCOLUMN:Detail.ixs_pri_dtp*/
		ixs_pri_dtp?: string|null;
		/**DBCOLUMN:Detail.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Detail.oblast_dt*/
		oblast_dt?: string|null;
		/**DBCOLUMN:Detail.typ_phl_pri*/
		typ_phl?: string|null;
	}
	const enum DetailVfpDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", nazev = "nazev", s_dgr = "s_dgr", cis_por = "cis_por", s_sdg = "s_sdg", c = "c", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", dat_pri = "dat_pri", dat_zdg = "dat_zdg", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", stan_pig = "stan_pig", ixp = "ixp", cj_dgr = "cj_dgr", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ac_ag = "ac_ag", priz_view = "priz_view", typ_fin = "typ_fin", cis_prg = "cis_prg", dat_p_lhu = "dat_p_lhu", zpus_pd = "zpus_pd", proc_max_spol = "proc_max_spol", priz_ext_pri = "priz_ext_pri", priz_isprofin = "priz_isprofin", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dgr = "typ_dgr", rezim_pri = "rezim_pri", zps_fin = "zps_fin", cis_ucl = "cis_ucl", dat_sch = "dat_sch", cislo_usn_dt = "cislo_usn_dt", druh_dtp = "druh_dtp", ixs_pri_dtp = "ixs_pri_dtp", priz_ext = "priz_ext", oblast_dt = "oblast_dt", typ_phl = "typ_phl",}
	const enum DetailVfpDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", ac = "*", nazev = "*", s_dgr = "*", cis_por = "*", s_sdg = "*", c = "*", ktg_typ = "*", ixs_typ = "*", dat_pri = "*", dat_zdg = "*", dat_zad_p = "*", dat_zad_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", stan_pig = "*", ixp = "*", cj_dgr = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ac_ag = "*", priz_view = "*", typ_fin = "*", cis_prg = "*", dat_p_lhu = "*", zpus_pd = "*", proc_max_spol = "*", priz_ext_pri = "*", priz_isprofin = "*", dat_zmena = "*", zmenu_prov = "*", typ_dgr = "*", rezim_pri = "*", zps_fin = "*", cis_ucl = "*", dat_sch = "*", cislo_usn_dt = "*", druh_dtp = "*", ixs_pri_dtp = "*", priz_ext = "*", oblast_dt = "*", typ_phl = "*",}
	const enum DetailVfpDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", nazev = "string", s_dgr = "number", cis_por = "number", s_sdg = "number", c = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", dat_pri = "JsonDate", dat_zdg = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", stan_pig = "number", ixp = "string", cj_dgr = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ac_ag = "string", priz_view = "number", typ_fin = "number", cis_prg = "string", dat_p_lhu = "JsonDate", zpus_pd = "number", proc_max_spol = "JsonDecimal", priz_ext_pri = "number", priz_isprofin = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dgr = "string", rezim_pri = "number", zps_fin = "number", cis_ucl = "string", dat_sch = "JsonDate", cislo_usn_dt = "string", druh_dtp = "number", ixs_pri_dtp = "string", priz_ext = "number", oblast_dt = "string", typ_phl = "string",}
	const enum DetailVfpDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, nazev = 100, ixs_typ = 12, ixp = 12, cj_dgr = 30, poznamka = 254, ixp_den = 12, ac_ag = 20, cis_prg = 20, zmenu_prov = 12, typ_dgr = 10, cis_ucl = 8, cislo_usn_dt = 50, ixs_pri_dtp = 12, oblast_dt = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GDetailEnableDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DTO pro nastavení enable na detailu*/
	interface GDetailEnableDto {
		readOnly_financovani?: boolean|null;
		/**dat_kos_p_04*/
		dat_zad_p_04?: boolean|null;
		/**dat_uza*/
		dat_uza_p_04?: boolean|null;
		/**dat_uza*/
		zpus_pd_04?: boolean|null;
		c_plan_03?: boolean|null;
		rezim_pri_03?: boolean|null;
		pri_pri_03?: boolean|null;
		cis_duz_03?: boolean|null;
		dat_zvz_03?: boolean|null;
		typ_dgr_03?: boolean|null;
		priz_dzr_03?: boolean|null;
		cis_por_03?: boolean|null;
		s_sdg_03?: boolean|null;
		cis_ner_03?: boolean|null;
		cis_ucl_03?: boolean|null;
		oblast_dt_03?: boolean|null;
		c_03?: boolean|null;
		ac_ag_zu?: boolean|null;
		ac_zu?: boolean|null;
		cis_real_zu?: boolean|null;
		ixs_fun_komp_zu?: boolean|null;
		s_dgr_zu?: boolean|null;
		nazev_zu?: boolean|null;
		typ_fin_zu?: boolean|null;
		fin_od_zu?: boolean|null;
		fin_do_zu?: boolean|null;
		c_sch_zu?: boolean|null;
		dat_pri_zu?: boolean|null;
		poznamka_co?: boolean|null;
		por_cis_nab_05?: boolean|null;
		dat_pis_05?: boolean|null;
		prijal_05?: boolean|null;
		s_ess_05?: boolean|null;
		ixs_esu_05?: boolean|null;
		pr_forma_05?: boolean|null;
		bu_ci_txt_05?: boolean|null;
		naz_prj_05?: boolean|null;
		c_dmi_05?: boolean|null;
		c_poz_05?: boolean|null;
		c_vyd_05?: boolean|null;
		c_real_05?: boolean|null;
		c_predp_05?: boolean|null;
		vs_s_05?: boolean|null;
		proc_max_spol_esu_05?: boolean|null;
		pravni_narok_05?: boolean|null;
		zrpo_05?: boolean|null;
		povinneCpoz?: boolean|null;
	}
	const enum GDetailEnableDtoNames { readOnly_financovani = "readOnly_financovani", dat_zad_p_04 = "dat_zad_p_04", dat_uza_p_04 = "dat_uza_p_04", zpus_pd_04 = "zpus_pd_04", c_plan_03 = "c_plan_03", rezim_pri_03 = "rezim_pri_03", pri_pri_03 = "pri_pri_03", cis_duz_03 = "cis_duz_03", dat_zvz_03 = "dat_zvz_03", typ_dgr_03 = "typ_dgr_03", priz_dzr_03 = "priz_dzr_03", cis_por_03 = "cis_por_03", s_sdg_03 = "s_sdg_03", cis_ner_03 = "cis_ner_03", cis_ucl_03 = "cis_ucl_03", oblast_dt_03 = "oblast_dt_03", c_03 = "c_03", ac_ag_zu = "ac_ag_zu", ac_zu = "ac_zu", cis_real_zu = "cis_real_zu", ixs_fun_komp_zu = "ixs_fun_komp_zu", s_dgr_zu = "s_dgr_zu", nazev_zu = "nazev_zu", typ_fin_zu = "typ_fin_zu", fin_od_zu = "fin_od_zu", fin_do_zu = "fin_do_zu", c_sch_zu = "c_sch_zu", dat_pri_zu = "dat_pri_zu", poznamka_co = "poznamka_co", por_cis_nab_05 = "por_cis_nab_05", dat_pis_05 = "dat_pis_05", prijal_05 = "prijal_05", s_ess_05 = "s_ess_05", ixs_esu_05 = "ixs_esu_05", pr_forma_05 = "pr_forma_05", bu_ci_txt_05 = "bu_ci_txt_05", naz_prj_05 = "naz_prj_05", c_dmi_05 = "c_dmi_05", c_poz_05 = "c_poz_05", c_vyd_05 = "c_vyd_05", c_real_05 = "c_real_05", c_predp_05 = "c_predp_05", vs_s_05 = "vs_s_05", proc_max_spol_esu_05 = "proc_max_spol_esu_05", pravni_narok_05 = "pravni_narok_05", zrpo_05 = "zrpo_05", povinneCpoz = "povinneCpoz",}
	const enum GDetailEnableDtoFragments { readOnly_financovani = "*", dat_zad_p_04 = "*", dat_uza_p_04 = "*", zpus_pd_04 = "*", c_plan_03 = "*", rezim_pri_03 = "*", pri_pri_03 = "*", cis_duz_03 = "*", dat_zvz_03 = "*", typ_dgr_03 = "*", priz_dzr_03 = "*", cis_por_03 = "*", s_sdg_03 = "*", cis_ner_03 = "*", cis_ucl_03 = "*", oblast_dt_03 = "*", c_03 = "*", ac_ag_zu = "*", ac_zu = "*", cis_real_zu = "*", ixs_fun_komp_zu = "*", s_dgr_zu = "*", nazev_zu = "*", typ_fin_zu = "*", fin_od_zu = "*", fin_do_zu = "*", c_sch_zu = "*", dat_pri_zu = "*", poznamka_co = "*", por_cis_nab_05 = "*", dat_pis_05 = "*", prijal_05 = "*", s_ess_05 = "*", ixs_esu_05 = "*", pr_forma_05 = "*", bu_ci_txt_05 = "*", naz_prj_05 = "*", c_dmi_05 = "*", c_poz_05 = "*", c_vyd_05 = "*", c_real_05 = "*", c_predp_05 = "*", vs_s_05 = "*", proc_max_spol_esu_05 = "*", pravni_narok_05 = "*", zrpo_05 = "*", povinneCpoz = "*",}
	const enum GDetailEnableDtoTypes { readOnly_financovani = "boolean", dat_zad_p_04 = "boolean", dat_uza_p_04 = "boolean", zpus_pd_04 = "boolean", c_plan_03 = "boolean", rezim_pri_03 = "boolean", pri_pri_03 = "boolean", cis_duz_03 = "boolean", dat_zvz_03 = "boolean", typ_dgr_03 = "boolean", priz_dzr_03 = "boolean", cis_por_03 = "boolean", s_sdg_03 = "boolean", cis_ner_03 = "boolean", cis_ucl_03 = "boolean", oblast_dt_03 = "boolean", c_03 = "boolean", ac_ag_zu = "boolean", ac_zu = "boolean", cis_real_zu = "boolean", ixs_fun_komp_zu = "boolean", s_dgr_zu = "boolean", nazev_zu = "boolean", typ_fin_zu = "boolean", fin_od_zu = "boolean", fin_do_zu = "boolean", c_sch_zu = "boolean", dat_pri_zu = "boolean", poznamka_co = "boolean", por_cis_nab_05 = "boolean", dat_pis_05 = "boolean", prijal_05 = "boolean", s_ess_05 = "boolean", ixs_esu_05 = "boolean", pr_forma_05 = "boolean", bu_ci_txt_05 = "boolean", naz_prj_05 = "boolean", c_dmi_05 = "boolean", c_poz_05 = "boolean", c_vyd_05 = "boolean", c_real_05 = "boolean", c_predp_05 = "boolean", vs_s_05 = "boolean", proc_max_spol_esu_05 = "boolean", pravni_narok_05 = "boolean", zrpo_05 = "boolean", povinneCpoz = "boolean",}
	const enum GDetailEnableDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GDetailLabelsDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DTO pro nastavení labelů na detailu*/
	interface GDetailLabelsDto {
		c_plan_03?: string|null;
		soutez_03?: string|null;
		dat_vyhl_11?: string|null;
		dat_s_lhu_11?: string|null;
		cis_kri_11?: string|null;
		dat_pis_08?: string|null;
		dat_z_lhu_08?: string|null;
		dat_s_lhu_08?: string|null;
		dat_pri_zu?: string|null;
		dat_pri_su?: string|null;
		prijal_su?: string|null;
	}
	const enum GDetailLabelsDtoNames { c_plan_03 = "c_plan_03", soutez_03 = "soutez_03", dat_vyhl_11 = "dat_vyhl_11", dat_s_lhu_11 = "dat_s_lhu_11", cis_kri_11 = "cis_kri_11", dat_pis_08 = "dat_pis_08", dat_z_lhu_08 = "dat_z_lhu_08", dat_s_lhu_08 = "dat_s_lhu_08", dat_pri_zu = "dat_pri_zu", dat_pri_su = "dat_pri_su", prijal_su = "prijal_su",}
	const enum GDetailLabelsDtoFragments { c_plan_03 = "*", soutez_03 = "*", dat_vyhl_11 = "*", dat_s_lhu_11 = "*", cis_kri_11 = "*", dat_pis_08 = "*", dat_z_lhu_08 = "*", dat_s_lhu_08 = "*", dat_pri_zu = "*", dat_pri_su = "*", prijal_su = "*",}
	const enum GDetailLabelsDtoTypes { c_plan_03 = "string", soutez_03 = "string", dat_vyhl_11 = "string", dat_s_lhu_11 = "string", cis_kri_11 = "string", dat_pis_08 = "string", dat_z_lhu_08 = "string", dat_s_lhu_08 = "string", dat_pri_zu = "string", dat_pri_su = "string", prijal_su = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GLokality.Dto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:Seznam*/
	interface GLokalityDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**okres*/
		id_okres?: string|null;
		/**kraj*/
		id_kraj?: string|null;
		/**okres_txt*/
		okres_txt?: string|null;
		/**kraj_txt*/
		kraj_txt?: string|null;
		/**DBCOLUMN:Seznam.xxx_dt*/
		xxx_dt?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**typ -1/2/3/4 = lokality/rozšířené/pověřené/doplňky*/
		typ?: number|null;
	}
	const enum GLokalityDtoNames { ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", id_okres = "id_okres", id_kraj = "id_kraj", okres_txt = "okres_txt", kraj_txt = "kraj_txt", xxx_dt = "xxx_dt", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", typ = "typ",}
	const enum GLokalityDtoFragments { ixs_pri = "*", ixp_nab = "*", id_okres = "*", id_kraj = "*", okres_txt = "*", kraj_txt = "*", xxx_dt = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", typ = "*",}
	const enum GLokalityDtoTypes { ixs_pri = "string", ixp_nab = "string", id_okres = "string", id_kraj = "string", okres_txt = "string", kraj_txt = "string", xxx_dt = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", typ = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GParamDetailDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Dto pro parametry detailu*/
	interface GParamDetailDto {
		/**parametry*/
		parametry?: Gordic.Vfp.Interface.GParamsDetailDto|null;
		/**dto evzspid*/
		pidDto?: Gordic.Vfp.Interface.VfpspidDto|null;
		prava?: Gordic.Pap.Interface.GPridelPravaDto|null;
		enabled?: Gordic.Vfp.Interface.GDetailEnableDto|null;
		lab?: Gordic.Vfp.Interface.GDetailLabelsDto|null;
		/**data pro esu hromadné*/
		esuHr?: Gordic.Pap.Interface.GXxxsesuHrDto[]|null;
		/**rozšířený profil*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		kpiData?: string[]|null;
		ixp?: string|null;
		/**provést  mimo HO -1; kontrolu - 0, provést akci = 1;*/
		kontrolaHO?: number|null;
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GParamDetailDtoNames { parametry = "parametry", pidDto = "pidDto", prava = "prava", enabled = "enabled", lab = "lab", esuHr = "esuHr", vlastnosti = "vlastnosti", kpiData = "kpiData", ixp = "ixp", kontrolaHO = "kontrolaHO", dokument = "dokument",}
	const enum GParamDetailDtoFragments { parametry = "*", pidDto = "*", prava = "*", enabled = "*", lab = "*", esuHr = "*", vlastnosti = "*", kpiData = "*", ixp = "*", kontrolaHO = "*", dokument = "*",}
	const enum GParamDetailDtoTypes { parametry = "Gordic.Vfp.Interface.GParamsDetailDto", pidDto = "Gordic.Vfp.Interface.VfpspidDto", prava = "Gordic.Pap.Interface.GPridelPravaDto", enabled = "Gordic.Vfp.Interface.GDetailEnableDto", lab = "Gordic.Vfp.Interface.GDetailLabelsDto", esuHr = "Gordic.Pap.Interface.GXxxsesuHrDto[]", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", kpiData = "string[]", ixp = "string", kontrolaHO = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GParamDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GParamPlneniDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Dto pro parametry plnění*/
	interface GParamPlneniDto {
		/**vlastnik*/
		vlastnik?: boolean|null;
		/**dto vfpseso*/
		vfpsesoDto?: Gordic.Vfp.Interface.GVfpXesoDto|null;
		/**dto vfpheso*/
		vfphesoDto?: Gordic.Vfp.Interface.GVfpXesoDto[]|null;
		/**dto vfpheso All*/
		vfphesoAllDto?: Gordic.Vfp.Interface.GVfpXesoDto[]|null;
	}
	const enum GParamPlneniDtoNames { vlastnik = "vlastnik", vfpsesoDto = "vfpsesoDto", vfphesoDto = "vfphesoDto", vfphesoAllDto = "vfphesoAllDto",}
	const enum GParamPlneniDtoFragments { vlastnik = "*", vfpsesoDto = "*", vfphesoDto = "*", vfphesoAllDto = "*",}
	const enum GParamPlneniDtoTypes { vlastnik = "boolean", vfpsesoDto = "Gordic.Vfp.Interface.GVfpXesoDto", vfphesoDto = "Gordic.Vfp.Interface.GVfpXesoDto[]", vfphesoAllDto = "Gordic.Vfp.Interface.GVfpXesoDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GParamsDetailDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Dto pro parametry detailu*/
	interface GParamsDetailDto {
		buttonSchvalitVisible?: boolean|null;
		/**
		*     kód otevřeného okna
		*     
		*/
		open?: string|null;
		/**
		*     kód otevřeného okna
		*     
		*/
		open2?: string|null;
		/**
		*     zákon
		*     
		*/
		cisZakSb?: number|null;
		/**
		*     ixs_soudgr
		*     
		*/
		ixs_soudgr?: string|null;
		/**
		*     titulek okna
		*     
		*/
		title?: string|null;
		/**
		*     titulek nějakého okna
		*     
		*/
		titleNovy?: string|null;
		/**
		*     nějaké schované ixs_pri
		*     
		*/
		posledniIxpNaPri?: string|null;
		/**
		*     nadtyp
		*     
		*/
		nadTyp1?: number|null;
		/**
		*     nadtyp
		*     
		*/
		nadTyp2?: number|null;
		/**
		*     nadtyp
		*     
		*/
		nadTyp3?: number|null;
		/**
		*     stavPuv
		*     
		*/
		stavPuv?: number|null;
		nastavEss?: boolean|null;
		/**
		*     vlastnik
		*     
		*/
		vlastnik?: string|null;
		nazrozVisible?: boolean|null;
		/**
		*      původní c_schv
		*     
		*/
		c_schvSave?: JsonDecimal|null;
		/**
		*      původní zps_fin
		*     
		*/
		zps_finSave?: JsonDecimal|null;
		je_zpo?: boolean|null;
		readOnly?: boolean|null;
		zalozka_odu_visible?: boolean|null;
		typ_phl_visible?: boolean|null;
		/**
		*     na subjektu je vidět moje políčko ixsEsu
		*     
		*/
		ixsEsuVVisible?: boolean|null;
		/**
		*     na financování políčka AU-POL-Org
		*     
		*/
		rozpSkladbyVisible?: boolean|null;
		/**
		*     parametr pro hromadné operace
		*     
		*/
		xxxVieVicesu?: number|null;
		/**
		*     částka přeblokování
		*     
		*/
		c_preblok?: JsonDecimal|null;
		/**
		*     nastavit přeblokování
		*     
		*/
		nastavCPreblok?: boolean|null;
		/**DBCOLUMN:Seznam.spu_rs_2*/
		spuRs2Save?: string|null;
		/**
		*     nastavit cb
		*     
		*/
		cbSml?: boolean|null;
		/**
		*     nastavit cb
		*     
		*/
		cbStornoOrg?: boolean|null;
		/**
		*     nastavit cb
		*     
		*/
		cbSchvProst?: boolean|null;
		/**
		*     nastavit popis
		*     
		*/
		needPop?: boolean|null;
		/**
		*     odschválení
		*     
		*/
		odschval?: boolean|null;
		/**
		*     uchování stavu s_dgr
		*     
		*/
		saveStav?: number|null;
		/**akce*/
		akce?: string|null;
		/**duvodStorno*/
		duvodStorno?: string|null;
		/**
		*     nulák pro schvalHrompol
		*     
		*/
		nulak?: boolean|null;
		/**
		*     nevím, nějaká další sračka
		*     
		*/
		special_special?: boolean|null;
		/**
		*     šablona pro masku
		*     
		*/
		sablona?: string|null;
		/**
		*     maska pro ac_ag
		*     
		*/
		acAgMaska?: string|null;
		/**
		*     tooltip pro položku plánu
		*     
		*/
		toolTipProPP?: string|null;
		/**
		*     save pro položku plánu
		*     
		*/
		savePP?: string|null;
		/**
		*     save pro ixs_cia
		*     
		*/
		saveIxsCia?: string|null;
	}
	const enum GParamsDetailDtoNames { buttonSchvalitVisible = "buttonSchvalitVisible", open = "open", open2 = "open2", cisZakSb = "cisZakSb", ixs_soudgr = "ixs_soudgr", title = "title", titleNovy = "titleNovy", posledniIxpNaPri = "posledniIxpNaPri", nadTyp1 = "nadTyp1", nadTyp2 = "nadTyp2", nadTyp3 = "nadTyp3", stavPuv = "stavPuv", nastavEss = "nastavEss", vlastnik = "vlastnik", nazrozVisible = "nazrozVisible", c_schvSave = "c_schvSave", zps_finSave = "zps_finSave", je_zpo = "je_zpo", readOnly = "readOnly", zalozka_odu_visible = "zalozka_odu_visible", typ_phl_visible = "typ_phl_visible", ixsEsuVVisible = "ixsEsuVVisible", rozpSkladbyVisible = "rozpSkladbyVisible", xxxVieVicesu = "xxxVieVicesu", c_preblok = "c_preblok", nastavCPreblok = "nastavCPreblok", spuRs2Save = "spuRs2Save", cbSml = "cbSml", cbStornoOrg = "cbStornoOrg", cbSchvProst = "cbSchvProst", needPop = "needPop", odschval = "odschval", saveStav = "saveStav", akce = "akce", duvodStorno = "duvodStorno", nulak = "nulak", special_special = "special_special", sablona = "sablona", acAgMaska = "acAgMaska", toolTipProPP = "toolTipProPP", savePP = "savePP", saveIxsCia = "saveIxsCia",}
	const enum GParamsDetailDtoFragments { buttonSchvalitVisible = "*", open = "*", open2 = "*", cisZakSb = "*", ixs_soudgr = "*", title = "*", titleNovy = "*", posledniIxpNaPri = "*", nadTyp1 = "*", nadTyp2 = "*", nadTyp3 = "*", stavPuv = "*", nastavEss = "*", vlastnik = "*", nazrozVisible = "*", c_schvSave = "*", zps_finSave = "*", je_zpo = "*", readOnly = "*", zalozka_odu_visible = "*", typ_phl_visible = "*", ixsEsuVVisible = "*", rozpSkladbyVisible = "*", xxxVieVicesu = "*", c_preblok = "*", nastavCPreblok = "*", spuRs2Save = "*", cbSml = "*", cbStornoOrg = "*", cbSchvProst = "*", needPop = "*", odschval = "*", saveStav = "*", akce = "*", duvodStorno = "*", nulak = "*", special_special = "*", sablona = "*", acAgMaska = "*", toolTipProPP = "*", savePP = "*", saveIxsCia = "*",}
	const enum GParamsDetailDtoTypes { buttonSchvalitVisible = "boolean", open = "string", open2 = "string", cisZakSb = "number", ixs_soudgr = "string", title = "string", titleNovy = "string", posledniIxpNaPri = "string", nadTyp1 = "number", nadTyp2 = "number", nadTyp3 = "number", stavPuv = "number", nastavEss = "boolean", vlastnik = "string", nazrozVisible = "boolean", c_schvSave = "JsonDecimal", zps_finSave = "JsonDecimal", je_zpo = "boolean", readOnly = "boolean", zalozka_odu_visible = "boolean", typ_phl_visible = "boolean", ixsEsuVVisible = "boolean", rozpSkladbyVisible = "boolean", xxxVieVicesu = "number", c_preblok = "JsonDecimal", nastavCPreblok = "boolean", spuRs2Save = "string", cbSml = "boolean", cbStornoOrg = "boolean", cbSchvProst = "boolean", needPop = "boolean", odschval = "boolean", saveStav = "number", akce = "string", duvodStorno = "string", nulak = "boolean", special_special = "boolean", sablona = "string", acAgMaska = "string", toolTipProPP = "string", savePP = "string", saveIxsCia = "string",}
	const enum GParamsDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GPredvyhodnoceniListDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Struktura pro hromadné podání*/
	interface GPredvyhodnoceniListDto {
		/**soubor záznamů pro podání*/
		List?: Gordic.Vfp.Interface.GVfpsesuDto[]|null;
	}
	const enum GPredvyhodnoceniListDtoNames { List = "List",}
	const enum GPredvyhodnoceniListDtoFragments { List = "*",}
	const enum GPredvyhodnoceniListDtoTypes { List = "Gordic.Vfp.Interface.GVfpsesuDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GUchazeciDto.d.ts 

declare namespace Gordic.Vfp.Interface {
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
		/**název PO*/
		nazev?: string|null;
		/**název PO*/
		naz_prj?: string|null;
		/**DBCOLUMN:Detail.s_po*/
		s_dgr?: number|null;
		/**s_po_txt PO*/
		s_dgr_txt?: string|null;
		/**s_po_txt PO*/
		typ_dgr?: string|null;
		uzo?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Detail.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.count*/
		count?: number|null;
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
		/**DBCOLUMN:Seznam.zamer_prj*/
		zamer_prj?: string|null;
		/**DBCOLUMN:Seznam.spu_rs_1*/
		spu_rs_1?: string|null;
		/**DBCOLUMN:Seznam.spu_rs_2*/
		spu_rs_2?: string|null;
		/**DBCOLUMN:Seznam.vs_s*/
		vs_s?: string|null;
		/**DBCOLUMN:Seznam.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dmi*/
		c_dmi?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_nakl*/
		c_nakl?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_prj_v*/
		c_prj_v?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_prj_o*/
		c_prj_o?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_usk_p*/
		dat_usk_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_usk_s*/
		dat_usk_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.mesic_prj_pp*/
		mesic_prj_pp?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_pp*/
		rok_prj_pp?: number|null;
		/**DBCOLUMN:Seznam.mesic_prj_zv*/
		mesic_prj_zv?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_zv*/
		rok_prj_zv?: number|null;
		/**DBCOLUMN:Seznam.dat_pzz*/
		dat_pzz?: JsonDate|null;
		/**DBCOLUMN:Seznam.ecis_prj*/
		ecis_prj?: string|null;
		/**DBCOLUMN:Seznam.bhod_prj*/
		bhod_prj?: number|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_vratk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_vyd?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_poz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_pokut*/
		c_pokut?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_penal*/
		c_penal?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_nedoc*/
		c_nedoc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.projednal*/
		projednal?: string|null;
		/**DBCOLUMN:Seznam.dat_jedn_pl*/
		dat_jedn_pl?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_jedn*/
		dat_jedn?: JsonDate|null;
		/**DBCOLUMN:Seznam.schvalil*/
		schvalil?: string|null;
		/**DBCOLUMN:Seznam.int_cis_zad*/
		int_cis_zad?: string|null;
		/**DBCOLUMN:Seznam.c_vratk_nas*/
		c_vratk_nas?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_vratk*/
		dat_vratk?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.typ_phl_txt*/
		typ_phl_txt?: string|null;
		/**DBCOLUMN:Seznam.kont_prj*/
		kont_prj?: string|null;
		/**DBCOLUMN:Seznam.oduv_prj*/
		oduv_prj?: string|null;
		lic_zast?: string|null;
		por_zast?: number|null;
		priz_gen_sml?: number|null;
		dat_pzz_t?: JsonDate|null;
		dat_vratk_nas?: JsonDate|null;
		poc_det?: number|null;
		poc_mla?: number|null;
		poc_duc?: number|null;
		poc_dos?: number|null;
		dat_reg_zad?: JsonDate|null;
		cis_reg_zad?: string|null;
		pro_urc?: number|null;
		pro_urc_txt?: string|null;
		priz_gvyh?: number|null;
		s_spis?: number|null;
		dat_ver_pod?: JsonDate|null;
		priz_ver_pod?: number|null;
		ver_pod?: number|null;
		priz_zud?: number|null;
		priz_ext?: number|null;
		nes_podg?: number|null;
		cislo_usn?: string|null;
		por_rk?: number|null;
		dat_sml2_v?: JsonDate|null;
		dat_sml2_o?: JsonDate|null;
		dat_sml1_v?: JsonDate|null;
		dat_sml1_o?: JsonDate|null;
		dat_uci_un?: JsonDate|null;
		kompl_z?: number|null;
		dor_z_pt?: number|null;
		dat_dor_z?: JsonDate|null;
		pocet?: number|null;
		rc?: string|null;
		dic?: string|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		ixs_fun_akt?: string|null;
		vlastnik?: boolean|null;
		okresy?: string|null;
		smlouvy?: string|null;
	}
	const enum GUchazeciDtoNames { ixs_esu = "ixs_esu", dat_pre_nab = "dat_pre_nab", por_cis_nab = "por_cis_nab", nazev_rf = "nazev_rf", ixs_esu_txt = "ixs_esu_txt", ixs_pri = "ixs_pri", nazev = "nazev", naz_prj = "naz_prj", s_dgr = "s_dgr", s_dgr_txt = "s_dgr_txt", typ_dgr = "typ_dgr", uzo = "uzo", ac = "ac", ac_ag = "ac_ag", cis_por = "cis_por", count = "count", s_ess_txt = "s_ess_txt", dat_vyz = "dat_vyz", dat_vys = "dat_vys", dat_zmena = "dat_zmena", ico_esu = "ico_esu", s_ess = "s_ess", pr_forma = "pr_forma", pr_forma_txt = "pr_forma_txt", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixp_nab = "ixp_nab", jmeno = "jmeno", prijmeni = "prijmeni", popis = "popis", ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", rok_zal = "rok_zal", zamer_prj = "zamer_prj", spu_rs_1 = "spu_rs_1", spu_rs_2 = "spu_rs_2", vs_s = "vs_s", proc_max_spol = "proc_max_spol", c_dmi = "c_dmi", c_nakl = "c_nakl", c_prj_v = "c_prj_v", c_prj_o = "c_prj_o", dat_usk_p = "dat_usk_p", dat_usk_s = "dat_usk_s", mesic_prj_pp = "mesic_prj_pp", rok_prj_pp = "rok_prj_pp", mesic_prj_zv = "mesic_prj_zv", rok_prj_zv = "rok_prj_zv", dat_pzz = "dat_pzz", ecis_prj = "ecis_prj", bhod_prj = "bhod_prj", c_vratk = "c_vratk", c_vyd = "c_vyd", c_poz = "c_poz", c_predp = "c_predp", c_real = "c_real", c_pokut = "c_pokut", c_penal = "c_penal", c_nedoc = "c_nedoc", projednal = "projednal", dat_jedn_pl = "dat_jedn_pl", dat_jedn = "dat_jedn", schvalil = "schvalil", int_cis_zad = "int_cis_zad", c_vratk_nas = "c_vratk_nas", dat_vratk = "dat_vratk", typ_phl = "typ_phl", typ_phl_txt = "typ_phl_txt", kont_prj = "kont_prj", oduv_prj = "oduv_prj", lic_zast = "lic_zast", por_zast = "por_zast", priz_gen_sml = "priz_gen_sml", dat_pzz_t = "dat_pzz_t", dat_vratk_nas = "dat_vratk_nas", poc_det = "poc_det", poc_mla = "poc_mla", poc_duc = "poc_duc", poc_dos = "poc_dos", dat_reg_zad = "dat_reg_zad", cis_reg_zad = "cis_reg_zad", pro_urc = "pro_urc", pro_urc_txt = "pro_urc_txt", priz_gvyh = "priz_gvyh", s_spis = "s_spis", dat_ver_pod = "dat_ver_pod", priz_ver_pod = "priz_ver_pod", ver_pod = "ver_pod", priz_zud = "priz_zud", priz_ext = "priz_ext", nes_podg = "nes_podg", cislo_usn = "cislo_usn", por_rk = "por_rk", dat_sml2_v = "dat_sml2_v", dat_sml2_o = "dat_sml2_o", dat_sml1_v = "dat_sml1_v", dat_sml1_o = "dat_sml1_o", dat_uci_un = "dat_uci_un", kompl_z = "kompl_z", dor_z_pt = "dor_z_pt", dat_dor_z = "dat_dor_z", pocet = "pocet", rc = "rc", dic = "dic", vlastnosti = "vlastnosti", ixs_fun_akt = "ixs_fun_akt", vlastnik = "vlastnik", okresy = "okresy", smlouvy = "smlouvy",}
	const enum GUchazeciDtoFragments { ixs_esu = "*", dat_pre_nab = "*", por_cis_nab = "*", nazev_rf = "*", ixs_esu_txt = "*", ixs_pri = "*", nazev = "*", naz_prj = "*", s_dgr = "*", s_dgr_txt = "*", typ_dgr = "*", uzo = "*", ac = "*", ac_ag = "*", cis_por = "*", count = "*", s_ess_txt = "*", dat_vyz = "*", dat_vys = "*", dat_zmena = "*", ico_esu = "*", s_ess = "*", pr_forma = "*", pr_forma_txt = "*", bu_ci_txt = "*", bu_ci = "*", sk_ci = "*", ixp_nab = "*", jmeno = "*", prijmeni = "*", popis = "*", ixp_den = "*", ixp_den_txt = "*", rok_zal = "*", zamer_prj = "*", spu_rs_1 = "*", spu_rs_2 = "*", vs_s = "*", proc_max_spol = "*", c_dmi = "*", c_nakl = "*", c_prj_v = "*", c_prj_o = "*", dat_usk_p = "*", dat_usk_s = "*", mesic_prj_pp = "*", rok_prj_pp = "*", mesic_prj_zv = "*", rok_prj_zv = "*", dat_pzz = "*", ecis_prj = "*", bhod_prj = "*", c_vratk = "*", c_vyd = "*", c_poz = "*", c_predp = "*", c_real = "*", c_pokut = "*", c_penal = "*", c_nedoc = "*", projednal = "*", dat_jedn_pl = "*", dat_jedn = "*", schvalil = "*", int_cis_zad = "*", c_vratk_nas = "*", dat_vratk = "*", typ_phl = "*", typ_phl_txt = "*", kont_prj = "*", oduv_prj = "*", lic_zast = "*", por_zast = "*", priz_gen_sml = "*", dat_pzz_t = "*", dat_vratk_nas = "*", poc_det = "*", poc_mla = "*", poc_duc = "*", poc_dos = "*", dat_reg_zad = "*", cis_reg_zad = "*", pro_urc = "*", pro_urc_txt = "*", priz_gvyh = "*", s_spis = "*", dat_ver_pod = "*", priz_ver_pod = "*", ver_pod = "*", priz_zud = "*", priz_ext = "*", nes_podg = "*", cislo_usn = "*", por_rk = "*", dat_sml2_v = "*", dat_sml2_o = "*", dat_sml1_v = "*", dat_sml1_o = "*", dat_uci_un = "*", kompl_z = "*", dor_z_pt = "*", dat_dor_z = "*", pocet = "*", rc = "*", dic = "*", vlastnosti = "*", ixs_fun_akt = "*", vlastnik = "*", okresy = "*", smlouvy = "*",}
	const enum GUchazeciDtoTypes { ixs_esu = "string", dat_pre_nab = "JsonDate", por_cis_nab = "number", nazev_rf = "string", ixs_esu_txt = "string", ixs_pri = "string", nazev = "string", naz_prj = "string", s_dgr = "number", s_dgr_txt = "string", typ_dgr = "string", uzo = "string", ac = "string", ac_ag = "string", cis_por = "number", count = "number", s_ess_txt = "string", dat_vyz = "JsonDate", dat_vys = "JsonDate", dat_zmena = "JsonDate", ico_esu = "string", s_ess = "number", pr_forma = "string", pr_forma_txt = "string", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixp_nab = "string", jmeno = "string", prijmeni = "string", popis = "string", ixp_den = "string", ixp_den_txt = "string", rok_zal = "number", zamer_prj = "string", spu_rs_1 = "string", spu_rs_2 = "string", vs_s = "string", proc_max_spol = "JsonDecimal", c_dmi = "JsonDecimal", c_nakl = "JsonDecimal", c_prj_v = "JsonDecimal", c_prj_o = "JsonDecimal", dat_usk_p = "JsonDate", dat_usk_s = "JsonDate", mesic_prj_pp = "number", rok_prj_pp = "number", mesic_prj_zv = "number", rok_prj_zv = "number", dat_pzz = "JsonDate", ecis_prj = "string", bhod_prj = "number", c_vratk = "JsonDecimal", c_vyd = "JsonDecimal", c_poz = "JsonDecimal", c_predp = "JsonDecimal", c_real = "JsonDecimal", c_pokut = "JsonDecimal", c_penal = "JsonDecimal", c_nedoc = "JsonDecimal", projednal = "string", dat_jedn_pl = "JsonDate", dat_jedn = "JsonDate", schvalil = "string", int_cis_zad = "string", c_vratk_nas = "JsonDecimal", dat_vratk = "JsonDate", typ_phl = "string", typ_phl_txt = "string", kont_prj = "string", oduv_prj = "string", lic_zast = "string", por_zast = "number", priz_gen_sml = "number", dat_pzz_t = "JsonDate", dat_vratk_nas = "JsonDate", poc_det = "number", poc_mla = "number", poc_duc = "number", poc_dos = "number", dat_reg_zad = "JsonDate", cis_reg_zad = "string", pro_urc = "number", pro_urc_txt = "string", priz_gvyh = "number", s_spis = "number", dat_ver_pod = "JsonDate", priz_ver_pod = "number", ver_pod = "number", priz_zud = "number", priz_ext = "number", nes_podg = "number", cislo_usn = "string", por_rk = "number", dat_sml2_v = "JsonDate", dat_sml2_o = "JsonDate", dat_sml1_v = "JsonDate", dat_sml1_o = "JsonDate", dat_uci_un = "JsonDate", kompl_z = "number", dor_z_pt = "number", dat_dor_z = "JsonDate", pocet = "number", rc = "string", dic = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixs_fun_akt = "string", vlastnik = "boolean", okresy = "string", smlouvy = "string",}
	const enum GUchazeciDtoTypeLengths { ixs_esu = 12, ixs_esu_txt = 254, ixs_pri = 12, ac = 20, ac_ag = 20, s_ess_txt = 50, pr_forma = 3, bu_ci = 34, sk_ci = 11, ixp_nab = 12, zamer_prj = 254, spu_rs_1 = 20, spu_rs_2 = 30, vs_s = 12, ecis_prj = 50, projednal = 50, schvalil = 100, int_cis_zad = 40, typ_phl = 4, kont_prj = 254, oduv_prj = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GVfpapza.Dto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:Seznam*/
	interface GVfpapzaDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.c_poz*/
		c_poz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vyd*/
		c_vyd?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_predp*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_real*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dmi*/
		c_dmi?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_bvy_eu*/
		c_bvy_eu?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vyp*/
		c_vyp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.popis_pza*/
		popis_pza?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zdu_vyr*/
		zdu_vyr?: string|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
	}
	const enum GVfpapzaDtoNames { ixs_pri = "ixs_pri", por_cis_nab = "por_cis_nab", por_cis = "por_cis", rok = "rok", c_poz = "c_poz", c_vyd = "c_vyd", c_predp = "c_predp", c_real = "c_real", c_dmi = "c_dmi", c_bvy_eu = "c_bvy_eu", c_vyp = "c_vyp", popis_pza = "popis_pza", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zdu_vyr = "zdu_vyr", priznak = "priznak",}
	const enum GVfpapzaDtoFragments { ixs_pri = "*", por_cis_nab = "*", por_cis = "*", rok = "*", c_poz = "*", c_vyd = "*", c_predp = "*", c_real = "*", c_dmi = "*", c_bvy_eu = "*", c_vyp = "*", popis_pza = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zdu_vyr = "*", priznak = "*",}
	const enum GVfpapzaDtoTypes { ixs_pri = "string", por_cis_nab = "number", por_cis = "number", rok = "number", c_poz = "JsonDecimal", c_vyd = "JsonDecimal", c_predp = "JsonDecimal", c_real = "JsonDecimal", c_dmi = "JsonDecimal", c_bvy_eu = "JsonDecimal", c_vyp = "JsonDecimal", popis_pza = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zdu_vyr = "string", priznak = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GVfpRestrikce.Dto - Copy.d.ts 

declare namespace Gordic.Vfp.Interface {
	interface GVfpDokRestrikceDto {
		restrikce?: Gordic.Pap.Interface.GRestrikceDto|null;
		filters?: Gordic.Vfp.Interface.GVfpFiltrDokDto|null;
	}
	const enum GVfpDokRestrikceDtoNames { restrikce = "restrikce", filters = "filters",}
	const enum GVfpDokRestrikceDtoFragments { restrikce = "*", filters = "*",}
	const enum GVfpDokRestrikceDtoTypes { restrikce = "Gordic.Pap.Interface.GRestrikceDto", filters = "Gordic.Vfp.Interface.GVfpFiltrDokDto",}
	const enum GVfpDokRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GVfpRestrikce.Dto.d.ts 

declare namespace Gordic.Vfp.Interface {
	interface GVfpRestrikceDto {
		restrikce?: Gordic.Pap.Interface.GRestrikceDto|null;
		filters?: Gordic.Vfp.Interface.GVfpFiltrDto|null;
	}
	const enum GVfpRestrikceDtoNames { restrikce = "restrikce", filters = "filters",}
	const enum GVfpRestrikceDtoFragments { restrikce = "*", filters = "*",}
	const enum GVfpRestrikceDtoTypes { restrikce = "Gordic.Pap.Interface.GRestrikceDto", filters = "Gordic.Vfp.Interface.GVfpFiltrDto",}
	const enum GVfpRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GVfpsesu.Dto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:Seznam*/
	interface GVfpsesuDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.c_poz*/
		c_poz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vyd*/
		c_vyd?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_predp*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_real*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.naz_prj*/
		naz_prj?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.zamer_prj*/
		zamer_prj?: string|null;
		/**DBCOLUMN:Seznam.spu_rs_1*/
		spu_rs_1?: string|null;
		/**DBCOLUMN:Seznam.spu_rs_2*/
		spu_rs_2?: string|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.vs_s*/
		vs_s?: string|null;
		/**DBCOLUMN:Seznam.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dmi*/
		c_dmi?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_nakl*/
		c_nakl?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_prj_v*/
		c_prj_v?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_prj_o*/
		c_prj_o?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_usk_p*/
		dat_usk_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_usk_s*/
		dat_usk_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.mesic_prj_pp*/
		mesic_prj_pp?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_pp*/
		rok_zal?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_pp*/
		rok_prj_pp?: number|null;
		/**DBCOLUMN:Seznam.mesic_prj_zv*/
		mesic_prj_zv?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_zv*/
		rok_prj_zv?: number|null;
		/**DBCOLUMN:Seznam.dat_pzz*/
		dat_pzz?: JsonDate|null;
		/**DBCOLUMN:Seznam.ecis_prj*/
		ecis_prj?: string|null;
		/**DBCOLUMN:Seznam.bhod_prj*/
		bhod_prj?: number|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_vratk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_pokut*/
		c_pokut?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_penal*/
		c_penal?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_nedoc*/
		c_nedoc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.projednal*/
		projednal?: string|null;
		/**DBCOLUMN:Seznam.dat_jedn_pl*/
		dat_jedn_pl?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_jedn*/
		dat_jedn?: JsonDate|null;
		/**DBCOLUMN:Seznam.schvalil*/
		schvalil?: string|null;
		/**DBCOLUMN:Seznam.int_cis_zad*/
		int_cis_zad?: string|null;
		/**DBCOLUMN:Seznam.c_vratk_nas*/
		c_vratk_nas?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_vratk*/
		dat_vratk?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.kont_prj*/
		kont_prj?: string|null;
		/**DBCOLUMN:Seznam.oduv_prj*/
		oduv_prj?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.dat_dor_z*/
		dat_dor_z?: JsonDate|null;
		/**DBCOLUMN:Seznam.dor_z_pt*/
		dor_z_pt?: number|null;
		/**DBCOLUMN:Seznam.s_ess_pid*/
		s_ess_pid?: number|null;
		/**DBCOLUMN:Seznam.dat_vyz*/
		dat_vyz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pre_nab*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vys*/
		dat_vys?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_kont*/
		ixs_esu_kont?: string|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.priz_gen_sml*/
		priz_gen_sml?: number|null;
		/**DBCOLUMN:Seznam.proc_max_spol_esu*/
		proc_max_spol_esu?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kompl_z*/
		kompl_z?: number|null;
		/**DBCOLUMN:Seznam.dat_uci_un*/
		dat_uci_un?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml1_o*/
		dat_sml1_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml1_v*/
		dat_sml1_v?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml2_o*/
		dat_sml2_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml2_v*/
		dat_sml2_v?: JsonDate|null;
		/**DBCOLUMN:Seznam.por_rk*/
		por_rk?: number|null;
		/**DBCOLUMN:Seznam.cislo_usn*/
		cislo_usn?: string|null;
		/**DBCOLUMN:Seznam.nes_podg*/
		nes_podg?: number|null;
		nes_podg_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_phl_esu*/
		typ_phl_esu?: string|null;
		/**DBCOLUMN:Seznam.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Seznam.priz_ext_esu*/
		priz_ext_esu?: number|null;
		/**DBCOLUMN:Seznam.priz_zud*/
		priz_zud?: number|null;
		/**DBCOLUMN:Seznam.ver_pod*/
		ver_pod?: number|null;
		/**DBCOLUMN:Seznam.priz_ver_pod*/
		priz_ver_pod?: number|null;
		/**DBCOLUMN:Seznam.dat_ver_pod*/
		dat_ver_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_spis*/
		s_spis?: number|null;
		/**DBCOLUMN:Seznam.priz_gvyh*/
		priz_gvyh?: number|null;
		/**DBCOLUMN:Seznam.pro_urc*/
		pro_urc?: number|null;
		/**DBCOLUMN:Seznam.cis_reg_zad*/
		cis_reg_zad?: string|null;
		/**DBCOLUMN:Seznam.dat_reg_zad*/
		dat_reg_zad?: JsonDate|null;
		/**DBCOLUMN:Seznam.poc_det*/
		poc_det?: number|null;
		/**DBCOLUMN:Seznam.poc_mla*/
		poc_mla?: number|null;
		/**DBCOLUMN:Seznam.poc_dos*/
		poc_dos?: number|null;
		/**DBCOLUMN:Seznam.poc_duc*/
		poc_duc?: number|null;
		/**DBCOLUMN:Seznam.dat_vratk_nas*/
		dat_vratk_nas?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pzz_t*/
		dat_pzz_t?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_ess_pid_txt*/
		s_ess_pid_txt?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.dic*/
		dic?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		funkce?: string|null;
		/**DBCOLUMN:Seznam.tel*/
		tel?: string|null;
		/**DBCOLUMN:Seznam.mail*/
		mail?: string|null;
		/**DBCOLUMN:Seznam.fax*/
		fax?: string|null;
		/**DBCOLUMN:Seznam.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:Seznam.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:Seznam.rc*/
		rc?: string|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
		/**DBCOLUMN:Seznam.pr_forma_txt*/
		pr_forma_txt?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.zdu_vyr*/
		zdu_vyr?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.vfp_stav*/
		vfp_stav?: number|null;
		/**ico/rč*/
		ic_rc?: string|null;
		nastavCPreblokEsu?: boolean|null;
		c_preblokEsu?: JsonDecimal|null;
	}
	const enum GVfpsesuDtoNames { ixs_pri = "ixs_pri", cis_por = "cis_por", ixs_esu = "ixs_esu", por_cis_nab = "por_cis_nab", c_poz = "c_poz", c_vyd = "c_vyd", c_predp = "c_predp", c_real = "c_real", nazev_rf = "nazev_rf", naz_prj = "naz_prj", dat_zmena = "dat_zmena", ixs_esu_txt = "ixs_esu_txt", ico_esu = "ico_esu", s_ess_txt = "s_ess_txt", popis = "popis", s_ess = "s_ess", pr_forma = "pr_forma", bu_ci = "bu_ci", sk_ci = "sk_ci", zamer_prj = "zamer_prj", spu_rs_1 = "spu_rs_1", spu_rs_2 = "spu_rs_2", ixp_nab = "ixp_nab", vs_s = "vs_s", proc_max_spol = "proc_max_spol", c_dmi = "c_dmi", c_nakl = "c_nakl", c_prj_v = "c_prj_v", c_prj_o = "c_prj_o", dat_usk_p = "dat_usk_p", dat_usk_s = "dat_usk_s", mesic_prj_pp = "mesic_prj_pp", rok_zal = "rok_zal", rok_prj_pp = "rok_prj_pp", mesic_prj_zv = "mesic_prj_zv", rok_prj_zv = "rok_prj_zv", dat_pzz = "dat_pzz", ecis_prj = "ecis_prj", bhod_prj = "bhod_prj", c_vratk = "c_vratk", c_pokut = "c_pokut", c_penal = "c_penal", c_nedoc = "c_nedoc", projednal = "projednal", dat_jedn_pl = "dat_jedn_pl", dat_jedn = "dat_jedn", schvalil = "schvalil", int_cis_zad = "int_cis_zad", c_vratk_nas = "c_vratk_nas", dat_vratk = "dat_vratk", typ_phl = "typ_phl", kont_prj = "kont_prj", oduv_prj = "oduv_prj", jmeno = "jmeno", prijmeni = "prijmeni", dat_dor_z = "dat_dor_z", dor_z_pt = "dor_z_pt", s_ess_pid = "s_ess_pid", dat_vyz = "dat_vyz", dat_pre_nab = "dat_pre_nab", dat_vys = "dat_vys", zmenu_prov = "zmenu_prov", ixs_esu_kont = "ixs_esu_kont", lic_zast = "lic_zast", por_zast = "por_zast", priz_gen_sml = "priz_gen_sml", proc_max_spol_esu = "proc_max_spol_esu", kompl_z = "kompl_z", dat_uci_un = "dat_uci_un", dat_sml1_o = "dat_sml1_o", dat_sml1_v = "dat_sml1_v", dat_sml2_o = "dat_sml2_o", dat_sml2_v = "dat_sml2_v", por_rk = "por_rk", cislo_usn = "cislo_usn", nes_podg = "nes_podg", nes_podg_txt = "nes_podg_txt", typ_phl_esu = "typ_phl_esu", priz_ext = "priz_ext", priz_ext_esu = "priz_ext_esu", priz_zud = "priz_zud", ver_pod = "ver_pod", priz_ver_pod = "priz_ver_pod", dat_ver_pod = "dat_ver_pod", s_spis = "s_spis", priz_gvyh = "priz_gvyh", pro_urc = "pro_urc", cis_reg_zad = "cis_reg_zad", dat_reg_zad = "dat_reg_zad", poc_det = "poc_det", poc_mla = "poc_mla", poc_dos = "poc_dos", poc_duc = "poc_duc", dat_vratk_nas = "dat_vratk_nas", dat_pzz_t = "dat_pzz_t", s_ess_pid_txt = "s_ess_pid_txt", ico = "ico", dic = "dic", funkce = "funkce", tel = "tel", mail = "mail", fax = "fax", tit_pred = "tit_pred", tit_za = "tit_za", rc = "rc", priznak = "priznak", pr_forma_txt = "pr_forma_txt", ac_ag = "ac_ag", zdu_vyr = "zdu_vyr", ixp = "ixp", dat_pis = "dat_pis", ktg_typ = "ktg_typ", ixs_krk = "ixs_krk", dat_prij_pod = "dat_prij_pod", vfp_stav = "vfp_stav", ic_rc = "ic_rc", nastavCPreblokEsu = "nastavCPreblokEsu", c_preblokEsu = "c_preblokEsu",}
	const enum GVfpsesuDtoFragments { ixs_pri = "common", cis_por = "common", ixs_esu = "common", por_cis_nab = "common", c_poz = "common", c_vyd = "common", c_predp = "common", c_real = "common", nazev_rf = "common", naz_prj = "common", dat_zmena = "common", ixs_esu_txt = "common", ico_esu = "seznam", s_ess_txt = "seznam", popis = "seznam", s_ess = "detail", pr_forma = "detail", bu_ci = "detail", sk_ci = "detail", zamer_prj = "detail", spu_rs_1 = "detail", spu_rs_2 = "detail", ixp_nab = "detail", vs_s = "detail", proc_max_spol = "detail", c_dmi = "detail", c_nakl = "detail", c_prj_v = "detail", c_prj_o = "detail", dat_usk_p = "detail", dat_usk_s = "detail", mesic_prj_pp = "detail", rok_zal = "detail", rok_prj_pp = "detail", mesic_prj_zv = "detail", rok_prj_zv = "detail", dat_pzz = "detail", ecis_prj = "detail", bhod_prj = "detail", c_vratk = "detail", c_pokut = "detail", c_penal = "detail", c_nedoc = "detail", projednal = "detail", dat_jedn_pl = "detail", dat_jedn = "detail", schvalil = "detail", int_cis_zad = "detail", c_vratk_nas = "detail", dat_vratk = "detail", typ_phl = "detail", kont_prj = "detail", oduv_prj = "detail", jmeno = "detail", prijmeni = "detail", dat_dor_z = "ostatni", dor_z_pt = "ostatni", s_ess_pid = "ostatni", dat_vyz = "ostatni", dat_pre_nab = "ostatni", dat_vys = "ostatni", zmenu_prov = "ostatni", ixs_esu_kont = "ostatni", lic_zast = "ostatni", por_zast = "ostatni", priz_gen_sml = "ostatni", proc_max_spol_esu = "ostatni", kompl_z = "ostatni", dat_uci_un = "ostatni", dat_sml1_o = "ostatni", dat_sml1_v = "ostatni", dat_sml2_o = "ostatni", dat_sml2_v = "ostatni", por_rk = "ostatni", cislo_usn = "ostatni", nes_podg = "ostatni", nes_podg_txt = "ostatni", typ_phl_esu = "ostatni", priz_ext = "ostatni", priz_ext_esu = "ostatni", priz_zud = "ostatni", ver_pod = "ostatni", priz_ver_pod = "ostatni", dat_ver_pod = "ostatni", s_spis = "ostatni", priz_gvyh = "ostatni", pro_urc = "ostatni", cis_reg_zad = "ostatni", dat_reg_zad = "ostatni", poc_det = "ostatni", poc_mla = "ostatni", poc_dos = "ostatni", poc_duc = "ostatni", dat_vratk_nas = "ostatni", dat_pzz_t = "ostatni", s_ess_pid_txt = "ostatni", ico = "ostatni", dic = "ostatni", funkce = "ostatni", tel = "ostatni", mail = "ostatni", fax = "ostatni", tit_pred = "ostatni", tit_za = "ostatni", rc = "ostatni", priznak = "ostatni", pr_forma_txt = "ostatni", ac_ag = "ostatni", zdu_vyr = "ostatni", ixp = "ostatni", dat_pis = "ostatni", ktg_typ = "ostatni", ixs_krk = "ostatni", dat_prij_pod = "ostatni", vfp_stav = "ostatni", ic_rc = "ostatni", nastavCPreblokEsu = "ostatni", c_preblokEsu = "ostatni",}
	const enum GVfpsesuDtoTypes { ixs_pri = "string", cis_por = "number", ixs_esu = "string", por_cis_nab = "number", c_poz = "JsonDecimal", c_vyd = "JsonDecimal", c_predp = "JsonDecimal", c_real = "JsonDecimal", nazev_rf = "string", naz_prj = "string", dat_zmena = "JsonDate", ixs_esu_txt = "string", ico_esu = "string", s_ess_txt = "string", popis = "string", s_ess = "number", pr_forma = "string", bu_ci = "string", sk_ci = "string", zamer_prj = "string", spu_rs_1 = "string", spu_rs_2 = "string", ixp_nab = "string", vs_s = "string", proc_max_spol = "JsonDecimal", c_dmi = "JsonDecimal", c_nakl = "JsonDecimal", c_prj_v = "JsonDecimal", c_prj_o = "JsonDecimal", dat_usk_p = "JsonDate", dat_usk_s = "JsonDate", mesic_prj_pp = "number", rok_zal = "number", rok_prj_pp = "number", mesic_prj_zv = "number", rok_prj_zv = "number", dat_pzz = "JsonDate", ecis_prj = "string", bhod_prj = "number", c_vratk = "JsonDecimal", c_pokut = "JsonDecimal", c_penal = "JsonDecimal", c_nedoc = "JsonDecimal", projednal = "string", dat_jedn_pl = "JsonDate", dat_jedn = "JsonDate", schvalil = "string", int_cis_zad = "string", c_vratk_nas = "JsonDecimal", dat_vratk = "JsonDate", typ_phl = "string", kont_prj = "string", oduv_prj = "string", jmeno = "string", prijmeni = "string", dat_dor_z = "JsonDate", dor_z_pt = "number", s_ess_pid = "number", dat_vyz = "JsonDate", dat_pre_nab = "JsonDate", dat_vys = "JsonDate", zmenu_prov = "string", ixs_esu_kont = "string", lic_zast = "string", por_zast = "number", priz_gen_sml = "number", proc_max_spol_esu = "JsonDecimal", kompl_z = "number", dat_uci_un = "JsonDate", dat_sml1_o = "JsonDate", dat_sml1_v = "JsonDate", dat_sml2_o = "JsonDate", dat_sml2_v = "JsonDate", por_rk = "number", cislo_usn = "string", nes_podg = "number", nes_podg_txt = "string", typ_phl_esu = "string", priz_ext = "number", priz_ext_esu = "number", priz_zud = "number", ver_pod = "number", priz_ver_pod = "number", dat_ver_pod = "JsonDate", s_spis = "number", priz_gvyh = "number", pro_urc = "number", cis_reg_zad = "string", dat_reg_zad = "JsonDate", poc_det = "number", poc_mla = "number", poc_dos = "number", poc_duc = "number", dat_vratk_nas = "JsonDate", dat_pzz_t = "JsonDate", s_ess_pid_txt = "string", ico = "string", dic = "string", funkce = "string", tel = "string", mail = "string", fax = "string", tit_pred = "string", tit_za = "string", rc = "string", priznak = "number", pr_forma_txt = "string", ac_ag = "string", zdu_vyr = "string", ixp = "string", dat_pis = "JsonDate", ktg_typ = "number", ixs_krk = "string", dat_prij_pod = "JsonDate", vfp_stav = "number", ic_rc = "string", nastavCPreblokEsu = "boolean", c_preblokEsu = "JsonDecimal",}
	const enum GVfpsesuDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, nazev_rf = 50, naz_prj = 254, pr_forma = 3, bu_ci = 34, sk_ci = 11, zamer_prj = 254, spu_rs_1 = 20, spu_rs_2 = 30, ixp_nab = 12, vs_s = 12, ecis_prj = 50, projednal = 50, schvalil = 100, int_cis_zad = 40, typ_phl = 4, kont_prj = 254, oduv_prj = 254, jmeno = 24, prijmeni = 36, zmenu_prov = 12, ixs_esu_kont = 12, lic_zast = 4, cislo_usn = 50, cis_reg_zad = 30, s_ess_pid_txt = 50, ico = 12, dic = 12, funkce = 50, tel = 33, mail = 254, fax = 33, tit_pred = 35, tit_za = 35, rc = 10, pr_forma_txt = 254, ac_ag = 20, ixp = 12, ixs_krk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.GVfpXesoDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpheso*/
	interface GVfpXesoDto {
		/**DBCOLUMN:vfpheso.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:vfpheso.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:vfpheso.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:vfpheso.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:vfpheso.ixp_def*/
		ixp_def?: string|null;
		/**DBCOLUMN:vfpheso.por_hist*/
		por_hist?: number|null;
		/**DBCOLUMN:vfpheso.pod_sml*/
		pod_sml?: number|null;
		/**DBCOLUMN:vfpheso.dat_pod_sml*/
		dat_pod_sml?: JsonDate|null;
		/**DBCOLUMN:vfpheso.pod_vyu*/
		pod_vyu?: number|null;
		/**DBCOLUMN:vfpheso.dat_pod_vyu*/
		dat_pod_vyu?: JsonDate|null;
		/**DBCOLUMN:vfpheso.pod_fin*/
		pod_fin?: number|null;
		/**DBCOLUMN:vfpheso.dat_pod_fin*/
		dat_pod_fin?: JsonDate|null;
		/**DBCOLUMN:vfpheso.popis_eso*/
		popis_eso?: string|null;
		/**DBCOLUMN:vfpheso.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:vfpheso.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:vfpheso.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**ac*/
		ac?: string|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
		stav_pod_sml?: string|null;
		stav_pod_vyu?: string|null;
		stav_pod_fin?: string|null;
	}
	const enum GVfpXesoDtoNames { ixs_pri = "ixs_pri", cis_por = "cis_por", ixs_esu = "ixs_esu", por_cis_nab = "por_cis_nab", ixp_def = "ixp_def", por_hist = "por_hist", pod_sml = "pod_sml", dat_pod_sml = "dat_pod_sml", pod_vyu = "pod_vyu", dat_pod_vyu = "dat_pod_vyu", pod_fin = "pod_fin", dat_pod_fin = "dat_pod_fin", popis_eso = "popis_eso", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", ac = "ac", ac_ag = "ac_ag", esu_txt = "esu_txt", stav_pod_sml = "stav_pod_sml", stav_pod_vyu = "stav_pod_vyu", stav_pod_fin = "stav_pod_fin",}
	const enum GVfpXesoDtoFragments { ixs_pri = "*", cis_por = "*", ixs_esu = "*", por_cis_nab = "*", ixp_def = "*", por_hist = "*", pod_sml = "*", dat_pod_sml = "*", pod_vyu = "*", dat_pod_vyu = "*", pod_fin = "*", dat_pod_fin = "*", popis_eso = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", ac = "*", ac_ag = "*", esu_txt = "*", stav_pod_sml = "*", stav_pod_vyu = "*", stav_pod_fin = "*",}
	const enum GVfpXesoDtoTypes { ixs_pri = "string", cis_por = "number", ixs_esu = "string", por_cis_nab = "number", ixp_def = "string", por_hist = "number", pod_sml = "number", dat_pod_sml = "JsonDate", pod_vyu = "number", dat_pod_vyu = "JsonDate", pod_fin = "number", dat_pod_fin = "JsonDate", popis_eso = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", ac = "string", ac_ag = "string", esu_txt = "string", stav_pod_sml = "string", stav_pod_vyu = "string", stav_pod_fin = "string",}
	const enum GVfpXesoDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, ixp_def = 12, popis_eso = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.SeznamDokumentuVfpDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:Seznam*/
	interface SeznamDokumentuVfpDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
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
		/**DBCOLUMN:Seznam.vfp_stav_txt*/
		vfp_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_vfpspac*/
		ixp_den_vfpspac?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den_vfpspac_nazev?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.vfp_stav*/
		vfp_stav?: number|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
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
		/**popis_wfl*/
		popis_ixb?: string|null;
		/**datum ukonu*/
		dat_ukon?: JsonDate|null;
		/**cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**kont_osoba*/
		kont_osoba?: string|null;
	}
	const enum SeznamDokumentuVfpDtoNames { ixp = "ixp", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", dat_prij_pod = "dat_prij_pod", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", popis = "popis", dat_pis = "dat_pis", ixs_pri = "ixs_pri", ac = "ac", nazev = "nazev", typ_dgr = "typ_dgr", cis_por = "cis_por", rezim_pri = "rezim_pri", rezim_pri_txt = "rezim_pri_txt", c = "c", ixs_krk = "ixs_krk", dat_zad_p = "dat_zad_p", dat_uza_p = "dat_uza_p", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", cis_zve_txt = "cis_zve_txt", dat_p_lhu = "dat_p_lhu", bu_vl = "bu_vl", sk_vl = "sk_vl", ks = "ks", vs = "vs", ss = "ss", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", por_cis_nab = "por_cis_nab", vfp_stav_txt = "vfp_stav_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", ixp_den_vfpspac = "ixp_den_vfpspac", ixp_den_vfpspac_nazev = "ixp_den_vfpspac_nazev", ac_ag = "ac_ag", vfp_stav = "vfp_stav", priznak = "priznak", soubor = "soubor", popis_wflsixb = "popis_wflsixb", velikost = "velikost", ixb = "ixb", dz_file = "dz_file", dat_modify = "dat_modify", tmp_file = "tmp_file", typ_otevreni = "typ_otevreni", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", ktg_dms = "ktg_dms", otevren = "otevren", zamcen = "zamcen", modifikovan = "modifikovan", m_zamek = "m_zamek", m_vyber = "m_vyber", esu_naz = "esu_naz", jmeno = "jmeno", prijmeni = "prijmeni", je_fin = "je_fin", po_case = "po_case", po_filuta = "po_filuta", ident_zpo = "ident_zpo", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", zda_sml = "zda_sml", stav = "stav", ukon = "ukon", popis_ixb = "popis_ixb", dat_ukon = "dat_ukon", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", kont_osoba = "kont_osoba", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum SeznamDokumentuVfpDtoFragments { ixp = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", dat_prij_pod = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", popis = "*", dat_pis = "*", ixs_pri = "*", ac = "*", nazev = "*", typ_dgr = "*", cis_por = "*", rezim_pri = "*", rezim_pri_txt = "*", c = "*", ixs_krk = "*", dat_zad_p = "*", dat_uza_p = "*", cis_duz_txt = "*", cis_ner_txt = "*", cis_zve_txt = "*", dat_p_lhu = "*", bu_vl = "*", sk_vl = "*", ks = "*", vs = "*", ss = "*", bu_ci = "*", sk_ci = "*", ixs_esu = "*", por_cis_nab = "*", vfp_stav_txt = "*", dat_zmena = "*", zmenu_prov = "*", ixp_den = "*", ixp_den_nazev = "*", ixp_den_vfpspac = "*", ixp_den_vfpspac_nazev = "*", ac_ag = "*", vfp_stav = "*", priznak = "*", soubor = "*", popis_wflsixb = "*", velikost = "*", ixb = "*", dz_file = "*", dat_modify = "*", tmp_file = "*", typ_otevreni = "*", dat_zverejneni = "*", zverejnil = "*", ktg_dms = "*", otevren = "*", zamcen = "*", modifikovan = "*", m_zamek = "*", m_vyber = "*", esu_naz = "*", jmeno = "*", prijmeni = "*", je_fin = "*", po_case = "*", po_filuta = "*", ident_zpo = "*", esu_ico = "*", esu_rc = "*", esu_dic = "*", zda_sml = "*", stav = "*", ukon = "*", popis_ixb = "*", dat_ukon = "*", cis_real_nazev = "*", nazev_rf = "*", kont_osoba = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum SeznamDokumentuVfpDtoTypes { ixp = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", dat_prij_pod = "JsonDate", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", popis = "string", dat_pis = "JsonDate", ixs_pri = "string", ac = "string", nazev = "string", typ_dgr = "string", cis_por = "number", rezim_pri = "number", rezim_pri_txt = "string", c = "JsonDecimal", ixs_krk = "string", dat_zad_p = "JsonDate", dat_uza_p = "JsonDate", cis_duz_txt = "string", cis_ner_txt = "string", cis_zve_txt = "string", dat_p_lhu = "JsonDate", bu_vl = "string", sk_vl = "string", ks = "string", vs = "string", ss = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", por_cis_nab = "number", vfp_stav_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den = "string", ixp_den_nazev = "string", ixp_den_vfpspac = "string", ixp_den_vfpspac_nazev = "string", ac_ag = "string", vfp_stav = "number", priznak = "number", soubor = "string", popis_wflsixb = "string", velikost = "number", ixb = "string", dz_file = "JsonDate", dat_modify = "JsonDate", tmp_file = "string", typ_otevreni = "number", dat_zverejneni = "JsonDate", zverejnil = "string", ktg_dms = "string", otevren = "number", zamcen = "number", modifikovan = "number", m_zamek = "number", m_vyber = "number", esu_naz = "string", jmeno = "string", prijmeni = "string", je_fin = "string", po_case = "number", po_filuta = "number", ident_zpo = "number", esu_ico = "string", esu_rc = "string", esu_dic = "string", zda_sml = "string", stav = "string", ukon = "string", popis_ixb = "string", dat_ukon = "JsonDate", cis_real_nazev = "string", nazev_rf = "string", kont_osoba = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.SeznamVfpDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**VFP seznam*/
	interface SeznamVfpDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
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
		/**DBCOLUMN:Seznam.s_dgr_txt*/
		s_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:Seznam.typ_dgr_txt*/
		typ_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.s_sdg_txt*/
		s_sdg_txt?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zdg*/
		dat_zdg?: JsonDate|null;
		/**DBCOLUMN:Seznam.poc_dokl*/
		poc_dokl?: number|null;
		/**DBCOLUMN:Seznam.poc_zado*/
		poc_zado?: number|null;
		/**DBCOLUMN:Seznam.c_poz_dt_celk*/
		c_poz_dt_celk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_predp_dt_celk*/
		c_predp_dt_celk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_real_dt_celk*/
		c_real_dt_celk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:Seznam.m_zamek*/
		m_zamek?: number|null;
		/**DBCOLUMN:Seznam.m_nic*/
		m_nic?: number|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.stan_pig*/
		stan_pig?: number|null;
		/**DBCOLUMN:Seznam.cis_prg*/
		cis_prg?: string|null;
		/**DBCOLUMN:Seznam.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:Seznam.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:Seznam.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:Seznam.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**datum změny ixp*/
		dz_file?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.cj_dgr*/
		cj_dgr?: string|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Seznam.sta_sml*/
		znak_s?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Seznam.ixp_den_vfpspac*/
		ixp_den_vfpspac?: string|null;
		/**DBCOLUMN:Seznam.priz_view_all*/
		priz_view_all?: number|null;
		/**DBCOLUMN:Seznam.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt*/
		oblast_dt?: string|null;
		/**DBCOLUMN:Seznam.oblast_dt_nazev*/
		oblast_dt_nazev?: string|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		sta_uko?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt*/
		k_arch?: string|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**datum ukonu*/
		dat_ukon?: JsonDate|null;
		/**kont. osoba*/
		kont_osoba?: string|null;
		/**jmeno*/
		jmeno?: string|null;
		/**prijmeni*/
		prijmeni?: string|null;
		/**lhůta*/
		dat_p_lhu?: JsonDate|null;
		/**dat_pis*/
		dat_pis?: JsonDate|null;
		/**dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**je_fin*/
		je_fin?: number|null;
		/**por_cis_nab*/
		por_cis_nab?: number|null;
		/**ixp*/
		ixp?: string|null;
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
		/**popis_ixb*/
		popis_ixb?: string|null;
		/**velikost*/
		velikost?: number|null;
		/**vfp_stav*/
		vfp_stav?: number|null;
		/**stav_ixp*/
		stav_ixp?: string|null;
		/**vlastník*/
		fun_naz?: string|null;
		/**stav žádosti*/
		s_ess?: number|null;
		/**stav žádosti*/
		s_ess_txt?: string|null;
		/**název projektu*/
		naz_prj?: string|null;
		/**soubor*/
		soubor?: string|null;
		/**příznak txt*/
		priznak_txt?: string|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**stav_epk*/
		stav_epk?: number|null;
	}
	const enum SeznamVfpDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", cis_real_nazev = "cis_real_nazev", ixs_fun_komp = "ixs_fun_komp", nazev_rf = "nazev_rf", ac = "ac", nazev = "nazev", s_dgr_txt = "s_dgr_txt", typ_dgr = "typ_dgr", typ_dgr_txt = "typ_dgr_txt", cis_por = "cis_por", s_sdg_txt = "s_sdg_txt", rezim_pri_txt = "rezim_pri_txt", c = "c", dat_pri = "dat_pri", dat_zdg = "dat_zdg", poc_dokl = "poc_dokl", poc_zado = "poc_zado", c_poz_dt_celk = "c_poz_dt_celk", c_predp_dt_celk = "c_predp_dt_celk", c_real_dt_celk = "c_real_dt_celk", m_vyber = "m_vyber", m_zamek = "m_zamek", m_nic = "m_nic", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", pri_pri_txt = "pri_pri_txt", stan_pig = "stan_pig", cis_prg = "cis_prg", zpus_pd = "zpus_pd", proc_max_spol = "proc_max_spol", priz_isprofin = "priz_isprofin", zps_fin = "zps_fin", c_sch = "c_sch", dat_zmena = "dat_zmena", dz_file = "dz_file", zmenu_prov = "zmenu_prov", cj_dgr = "cj_dgr", zda_sml = "zda_sml", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", znak_s = "znak_s", ac_ag = "ac_ag", priz_view = "priz_view", typ_fin = "typ_fin", ixp_den_vfpspac = "ixp_den_vfpspac", priz_view_all = "priz_view_all", priz_ext = "priz_ext", oblast_dt = "oblast_dt", oblast_dt_nazev = "oblast_dt_nazev", sta_uko = "sta_uko", k_arch = "k_arch", ixs_krk = "ixs_krk", ukon = "ukon", dat_ukon = "dat_ukon", kont_osoba = "kont_osoba", jmeno = "jmeno", prijmeni = "prijmeni", dat_p_lhu = "dat_p_lhu", dat_pis = "dat_pis", dat_prij_pod = "dat_prij_pod", je_fin = "je_fin", por_cis_nab = "por_cis_nab", ixp = "ixp", esu_naz = "esu_naz", popis = "popis", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", popis_ixb = "popis_ixb", velikost = "velikost", vfp_stav = "vfp_stav", stav_ixp = "stav_ixp", fun_naz = "fun_naz", s_ess = "s_ess", s_ess_txt = "s_ess_txt", naz_prj = "naz_prj", soubor = "soubor", priznak_txt = "priznak_txt", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", ktg_typ = "ktg_typ", ixs_fun_akt = "ixs_fun_akt", stav_epk = "stav_epk", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum SeznamVfpDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", cis_real_nazev = "*", ixs_fun_komp = "*", nazev_rf = "*", ac = "*", nazev = "*", s_dgr_txt = "*", typ_dgr = "*", typ_dgr_txt = "*", cis_por = "*", s_sdg_txt = "*", rezim_pri_txt = "*", c = "*", dat_pri = "*", dat_zdg = "*", poc_dokl = "*", poc_zado = "*", c_poz_dt_celk = "*", c_predp_dt_celk = "*", c_real_dt_celk = "*", m_vyber = "*", m_zamek = "*", m_nic = "*", dat_zad_p = "*", dat_zad_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz_txt = "*", cis_ner_txt = "*", pri_pri_txt = "*", stan_pig = "*", cis_prg = "*", zpus_pd = "*", proc_max_spol = "*", priz_isprofin = "*", zps_fin = "*", c_sch = "*", dat_zmena = "*", dz_file = "*", zmenu_prov = "*", cj_dgr = "*", zda_sml = "*", ixp_den = "*", ixp_den_nazev = "*", znak_s = "*", ac_ag = "*", priz_view = "*", typ_fin = "*", ixp_den_vfpspac = "*", priz_view_all = "*", priz_ext = "*", oblast_dt = "*", oblast_dt_nazev = "*", sta_uko = "*", k_arch = "*", ixs_krk = "*", ukon = "*", dat_ukon = "*", kont_osoba = "*", jmeno = "*", prijmeni = "*", dat_p_lhu = "*", dat_pis = "*", dat_prij_pod = "*", je_fin = "*", por_cis_nab = "*", ixp = "*", esu_naz = "*", popis = "*", esu_ico = "*", esu_rc = "*", esu_dic = "*", popis_ixb = "*", velikost = "*", vfp_stav = "*", stav_ixp = "*", fun_naz = "*", s_ess = "*", s_ess_txt = "*", naz_prj = "*", soubor = "*", priznak_txt = "*", ixs_typ = "*", ixs_typ_txt = "*", ktg_typ = "*", ixs_fun_akt = "*", stav_epk = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum SeznamVfpDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", cis_real_nazev = "string", ixs_fun_komp = "string", nazev_rf = "string", ac = "string", nazev = "string", s_dgr_txt = "string", typ_dgr = "string", typ_dgr_txt = "string", cis_por = "number", s_sdg_txt = "string", rezim_pri_txt = "string", c = "JsonDecimal", dat_pri = "JsonDate", dat_zdg = "JsonDate", poc_dokl = "number", poc_zado = "number", c_poz_dt_celk = "JsonDecimal", c_predp_dt_celk = "JsonDecimal", c_real_dt_celk = "JsonDecimal", m_vyber = "number", m_zamek = "number", m_nic = "number", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz_txt = "string", cis_ner_txt = "string", pri_pri_txt = "string", stan_pig = "number", cis_prg = "string", zpus_pd = "number", proc_max_spol = "JsonDecimal", priz_isprofin = "number", zps_fin = "number", c_sch = "JsonDecimal", dat_zmena = "JsonDate", dz_file = "JsonDate", zmenu_prov = "string", cj_dgr = "string", zda_sml = "string", ixp_den = "string", ixp_den_nazev = "string", znak_s = "string", ac_ag = "string", priz_view = "number", typ_fin = "number", ixp_den_vfpspac = "string", priz_view_all = "number", priz_ext = "number", oblast_dt = "string", oblast_dt_nazev = "string", sta_uko = "number", k_arch = "string", ixs_krk = "string", ukon = "string", dat_ukon = "JsonDate", kont_osoba = "string", jmeno = "string", prijmeni = "string", dat_p_lhu = "JsonDate", dat_pis = "JsonDate", dat_prij_pod = "JsonDate", je_fin = "number", por_cis_nab = "number", ixp = "string", esu_naz = "string", popis = "string", esu_ico = "string", esu_rc = "string", esu_dic = "string", popis_ixb = "string", velikost = "number", vfp_stav = "number", stav_ixp = "string", fun_naz = "string", s_ess = "number", s_ess_txt = "string", naz_prj = "string", soubor = "string", priznak_txt = "string", ixs_typ = "string", ixs_typ_txt = "string", ktg_typ = "number", ixs_fun_akt = "string", stav_epk = "number", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.VfpspidDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**DBTABLE:vfpspid*/
	interface VfpspidDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**
		*     Zda jde větví evidence dokladu
		*     
		*/
		evidence_dokladu?: boolean|null;
		/**DBCOLUMN:Seznam.ixp*/
		vlastnik?: boolean|null;
		/**DBCOLUMN:Seznam.ixp*/
		vlastnikIdent?: string|null;
		/**
		*     vlastnik
		*     
		*/
		vlastnik_nazev?: string|null;
		/**
		*     počet záznamů
		*     
		*/
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
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		nazev_pri?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.s_dgr_txt*/
		s_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.s_dgr*/
		s_dgr?: number|null;
		/**DBCOLUMN:Seznam.typ_dgr*/
		typ_dgr?: string|null;
		typ_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
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
		/**vfp_stav*/
		vfp_stav?: number|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.vfp_stav_txt*/
		vfp_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.esu_naz*/
		esu_naz?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		je_fin?: string|null;
		po_case?: number|null;
		po_filuta?: number|null;
		ident_zpo?: number|null;
		uzo?: string|null;
		/**
		*     vlastnosti
		*     
		*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
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
		/**DBCOLUMN:Seznam.ixp_den_evzspac*/
		ixp_den_vfpspac?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**naz_prj*/
		naz_prj?: string|null;
		/**priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Seznam.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:vfpspid.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:vfpspid.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:vfpspid.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:vfpspid.ixp_pre*/
		ixp_pre?: string|null;
		/**DBCOLUMN:vfpspid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:vfpspid.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_plan*/
		c_clepr?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:vfpspid.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:vfpspid.ixs_esu_opr*/
		ixs_esu_opr?: string|null;
		/**DBCOLUMN:vfpspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:vfpspid.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:vfpspid.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:vfpspid.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:vfpspid.mena*/
		mena?: number|null;
		/**DBCOLUMN:vfpspid.cis_prg*/
		cis_prg?: string|null;
		/**DBCOLUMN:vfpspid.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:vfpspid.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.proc_max_spol_esu*/
		proc_max_spol_esu?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.stan_pig*/
		stan_pig?: number|null;
		/**DBCOLUMN:vfpspid.cj_dgr*/
		cj_dgr?: string|null;
		/**DBCOLUMN:vfpspid.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:vfpspid.cis_ucl*/
		cis_ucl?: string|null;
		/**DBCOLUMN:vfpspid.ixs_esu_kont*/
		ixs_esu_kont?: string|null;
		/**DBCOLUMN:vfpspid.c_vyd*/
		c_vyd?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_predp*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_real*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_poz*/
		c_poz?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.vs_s*/
		vs_s?: string|null;
		/**DBCOLUMN:vfpspid.c_dmi*/
		c_dmi?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.zamer_prj*/
		zamer_prj?: string|null;
		/**DBCOLUMN:vfpspid.c_prj_v*/
		c_prj_v?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_prj_o*/
		c_prj_o?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_nakl*/
		c_nakl?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.dat_usk_p*/
		dat_usk_p?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dat_usk_s*/
		dat_usk_s?: JsonDate|null;
		/**DBCOLUMN:vfpspid.mesic_prj_pp*/
		mesic_prj_pp?: number|null;
		/**DBCOLUMN:vfpspid.rok_prj_pp*/
		rok_prj_pp?: number|null;
		/**DBCOLUMN:vfpspid.mesic_prj_zv*/
		mesic_prj_zv?: number|null;
		/**DBCOLUMN:vfpspid.rok_prj_zv*/
		rok_prj_zv?: number|null;
		/**DBCOLUMN:vfpspid.dat_pzz*/
		dat_pzz?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dat_dor_z*/
		dat_dor_z?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dor_z_pt*/
		dor_z_pt?: number|null;
		/**DBCOLUMN:vfpspid.kompl_z*/
		kompl_z?: number|null;
		/**DBCOLUMN:vfpspid.ecis_prj*/
		ecis_prj?: string|null;
		/**DBCOLUMN:vfpspid.dat_uci_un*/
		dat_uci_un?: JsonDate|null;
		/**DBCOLUMN:vfpspid.bhod_prj*/
		bhod_prj?: number|null;
		/**DBCOLUMN:vfpspid.dat_sml1_o*/
		dat_sml1_o?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dat_sml1_v*/
		dat_sml1_v?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dat_sml2_o*/
		dat_sml2_o?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dat_sml2_v*/
		dat_sml2_v?: JsonDate|null;
		/**DBCOLUMN:vfpspid.c_vratk*/
		c_vratk?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_pokut*/
		c_pokut?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.c_penal*/
		c_penal?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.por_rk*/
		por_rk?: number|null;
		/**DBCOLUMN:vfpspid.cislo_usn*/
		cislo_usn?: string|null;
		/**DBCOLUMN:vfpspid.c_nedoc*/
		c_nedoc?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.nes_podg*/
		nes_podg?: number|null;
		/**DBCOLUMN:vfpspid.cislo_usn_dt*/
		cislo_usn_dt?: string|null;
		/**DBCOLUMN:vfpspid.druh_dtp*/
		druh_dtp?: number|null;
		/**DBCOLUMN:vfpspid.ixs_pri_dtp*/
		ixs_pri_dtp?: string|null;
		/**DBCOLUMN:vfpspid.projednal*/
		projednal?: string|null;
		/**DBCOLUMN:vfpspid.dat_jedn_pl*/
		dat_jedn_pl?: JsonDate|null;
		/**DBCOLUMN:vfpspid.dat_jedn*/
		dat_jedn?: JsonDate|null;
		/**DBCOLUMN:vfpspid.spu_rs_1*/
		spu_rs_1?: string|null;
		/**DBCOLUMN:vfpspid.spu_rs_2*/
		spu_rs_2?: string|null;
		/**DBCOLUMN:vfpspid.int_cis_zad*/
		int_cis_zad?: string|null;
		/**DBCOLUMN:vfpspid.oblast_dt*/
		oblast_dt?: string|null;
		/**DBCOLUMN:vfpspid.schvalil*/
		schvalil?: string|null;
		/**DBCOLUMN:vfpspid.ver_pod*/
		ver_pod?: number|null;
		/**DBCOLUMN:vfpspid.priz_ver_pod*/
		priz_ver_pod?: number|null;
		/**DBCOLUMN:vfpspid.ver_pod*/
		ver_pod_txt?: string|null;
		/**DBCOLUMN:vfpspid.priz_ver_pod*/
		priz_ver_pod_txt?: string|null;
		/**DBCOLUMN:vfpspid.dat_ver_pod*/
		dat_ver_pod?: JsonDate|null;
		/**DBCOLUMN:vfpspid.s_spis*/
		s_spis?: number|null;
		/**DBCOLUMN:Detail.s_sdg*/
		s_sdg?: number|null;
		/**DBCOLUMN:vfpspid.c_vratk_nas*/
		c_vratk_nas?: JsonDecimal|null;
		/**DBCOLUMN:vfpspid.dat_vratk*/
		dat_vratk?: JsonDate|null;
		/**DBCOLUMN:vfpspid.pro_urc*/
		pro_urc?: number|null;
		/**DBCOLUMN:vfpspid.cis_reg_zad*/
		cis_reg_zad?: string|null;
		/**DBCOLUMN:vfpspid.dat_reg_zad*/
		dat_reg_zad?: JsonDate|null;
		/**DBCOLUMN:vfpspid.poc_det*/
		poc_det?: number|null;
		/**DBCOLUMN:vfpspid.poc_mla*/
		poc_mla?: number|null;
		/**DBCOLUMN:vfpspid.poc_dos*/
		poc_dos?: number|null;
		/**DBCOLUMN:vfpspid.poc_duc*/
		poc_duc?: number|null;
		/**DBCOLUMN:vfpspid.dat_vratk_nas*/
		dat_vratk_nas?: JsonDate|null;
		/**DBCOLUMN:vfpspid.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:vfpspid.typ_phl_pri*/
		typ_phl_pri?: string|null;
		/**DBCOLUMN:vfpspid.typ_phl_pri*/
		typ_phl_esu?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c_rez?: JsonDecimal|null;
		/**DBCOLUMN:číslo položky*/
		cislo?: string|null;
		/**DBCOLUMN:ixs_cia položky*/
		ixs_cia?: string|null;
		/**DBCOLUMN:ixs_esu*/
		ixs_esu_zrpo?: string|null;
		/**DBCOLUMN:příznak*/
		priz_zrpo?: number|null;
		/**DBCOLUMN:identifikace*/
		bu_ci_zrpo?: string|null;
		/**DBCOLUMN:identifikace*/
		sk_ci_zrpo?: string|null;
		/**DBCOLUMN:identifikace*/
		bu_ci_zrpo_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:Seznam.priz_ext_pri*/
		priz_ext_pri?: number|null;
		/**DBCOLUMN:Seznam.priz_ext_pid*/
		priz_ext_pid?: number|null;
		/**DBCOLUMN:Seznam.priz_cll*/
		priz_cll?: number|null;
		/**DBCOLUMN:Seznam.priz_ext_esu*/
		priz_ext_esu?: number|null;
		/**DBCOLUMN:Seznam.dat_pzz_t*/
		dat_pzz_t?: JsonDate|null;
		/**DBCOLUMN:Seznam.kont_prj*/
		kont_prj?: string|null;
		/**DBCOLUMN:Seznam.oduv_prj*/
		oduv_prj?: string|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		c_preblk?: JsonDecimal|null;
	}
	const enum VfpspidDtoNames { ixp = "ixp", evidence_dokladu = "evidence_dokladu", vlastnik = "vlastnik", vlastnikIdent = "vlastnikIdent", vlastnik_nazev = "vlastnik_nazev", count = "count", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", dat_prij_pod = "dat_prij_pod", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", popis = "popis", dat_pis = "dat_pis", dat_pri = "dat_pri", ixs_pri = "ixs_pri", nazev_pri = "nazev_pri", ac = "ac", nazev = "nazev", s_dgr_txt = "s_dgr_txt", s_dgr = "s_dgr", typ_dgr = "typ_dgr", typ_dgr_txt = "typ_dgr_txt", cis_por = "cis_por", c = "c", ixs_krk = "ixs_krk", dat_zad_p = "dat_zad_p", dat_uza_p = "dat_uza_p", dat_p_lhu = "dat_p_lhu", bu_vl_txt = "bu_vl_txt", bu_vl = "bu_vl", sk_vl = "sk_vl", ks = "ks", vs = "vs", ss = "ss", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", por_cis_nab = "por_cis_nab", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", vfp_stav = "vfp_stav", ixp_den = "ixp_den", ukon = "ukon", zda_sml = "zda_sml", ac_ag = "ac_ag", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", rezim_pri_txt = "rezim_pri_txt", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", pri_pri_txt = "pri_pri_txt", vfp_stav_txt = "vfp_stav_txt", esu_naz = "esu_naz", ixs_typ_txt = "ixs_typ_txt", je_fin = "je_fin", po_case = "po_case", po_filuta = "po_filuta", ident_zpo = "ident_zpo", uzo = "uzo", vlastnosti = "vlastnosti", jmeno = "jmeno", prijmeni = "prijmeni", kont_osoba = "kont_osoba", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", s_ess = "s_ess", s_ess_txt = "s_ess_txt", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", ktg_dms = "ktg_dms", fun_naz = "fun_naz", ixs_fun_akt = "ixs_fun_akt", priznak = "priznak", priznak_txt = "priznak_txt", s_sgn_epx = "s_sgn_epx", popis_ixb = "popis_ixb", soubor = "soubor", popis_wflsixb = "popis_wflsixb", velikost = "velikost", ixb = "ixb", dz_file = "dz_file", priz_elp = "priz_elp", typ_soub = "typ_soub", ixp_den_vfpspac = "ixp_den_vfpspac", ixp_den_nazev = "ixp_den_nazev", naz_prj = "naz_prj", priz_ext = "priz_ext", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", ixp_pre = "ixp_pre", poznamka = "poznamka", c_plan = "c_plan", c_clepr = "c_clepr", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixs_esu_opr = "ixs_esu_opr", priz_view = "priz_view", typ_fin = "typ_fin", lic_zast = "lic_zast", por_zast = "por_zast", mena = "mena", cis_prg = "cis_prg", zpus_pd = "zpus_pd", proc_max_spol = "proc_max_spol", proc_max_spol_esu = "proc_max_spol_esu", stan_pig = "stan_pig", cj_dgr = "cj_dgr", zps_fin = "zps_fin", cis_ucl = "cis_ucl", ixs_esu_kont = "ixs_esu_kont", c_vyd = "c_vyd", c_predp = "c_predp", c_real = "c_real", c_poz = "c_poz", vs_s = "vs_s", c_dmi = "c_dmi", zamer_prj = "zamer_prj", c_prj_v = "c_prj_v", c_prj_o = "c_prj_o", c_nakl = "c_nakl", dat_usk_p = "dat_usk_p", dat_usk_s = "dat_usk_s", mesic_prj_pp = "mesic_prj_pp", rok_prj_pp = "rok_prj_pp", mesic_prj_zv = "mesic_prj_zv", rok_prj_zv = "rok_prj_zv", dat_pzz = "dat_pzz", dat_dor_z = "dat_dor_z", dor_z_pt = "dor_z_pt", kompl_z = "kompl_z", ecis_prj = "ecis_prj", dat_uci_un = "dat_uci_un", bhod_prj = "bhod_prj", dat_sml1_o = "dat_sml1_o", dat_sml1_v = "dat_sml1_v", dat_sml2_o = "dat_sml2_o", dat_sml2_v = "dat_sml2_v", c_vratk = "c_vratk", c_pokut = "c_pokut", c_penal = "c_penal", por_rk = "por_rk", cislo_usn = "cislo_usn", c_nedoc = "c_nedoc", nes_podg = "nes_podg", cislo_usn_dt = "cislo_usn_dt", druh_dtp = "druh_dtp", ixs_pri_dtp = "ixs_pri_dtp", projednal = "projednal", dat_jedn_pl = "dat_jedn_pl", dat_jedn = "dat_jedn", spu_rs_1 = "spu_rs_1", spu_rs_2 = "spu_rs_2", int_cis_zad = "int_cis_zad", oblast_dt = "oblast_dt", schvalil = "schvalil", ver_pod = "ver_pod", priz_ver_pod = "priz_ver_pod", ver_pod_txt = "ver_pod_txt", priz_ver_pod_txt = "priz_ver_pod_txt", dat_ver_pod = "dat_ver_pod", s_spis = "s_spis", s_sdg = "s_sdg", c_vratk_nas = "c_vratk_nas", dat_vratk = "dat_vratk", pro_urc = "pro_urc", cis_reg_zad = "cis_reg_zad", dat_reg_zad = "dat_reg_zad", poc_det = "poc_det", poc_mla = "poc_mla", poc_dos = "poc_dos", poc_duc = "poc_duc", dat_vratk_nas = "dat_vratk_nas", typ_phl = "typ_phl", typ_phl_pri = "typ_phl_pri", typ_phl_esu = "typ_phl_esu", c_rez = "c_rez", cislo = "cislo", ixs_cia = "ixs_cia", ixs_esu_zrpo = "ixs_esu_zrpo", priz_zrpo = "priz_zrpo", bu_ci_zrpo = "bu_ci_zrpo", sk_ci_zrpo = "sk_ci_zrpo", bu_ci_zrpo_txt = "bu_ci_zrpo_txt", priz_isprofin = "priz_isprofin", pr_forma = "pr_forma", priz_ext_pri = "priz_ext_pri", priz_ext_pid = "priz_ext_pid", priz_cll = "priz_cll", priz_ext_esu = "priz_ext_esu", dat_pzz_t = "dat_pzz_t", kont_prj = "kont_prj", oduv_prj = "oduv_prj", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", c_preblk = "c_preblk", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum VfpspidDtoFragments { ixp = "common", evidence_dokladu = "*", vlastnik = "common", vlastnikIdent = "common", vlastnik_nazev = "common", count = "common", lic = "common", ico = "common", ucs = "common", rok_zal = "common", cis_real = "common", ixs_fun_komp = "common", dat_prij_pod = "common", ktg_typ = "common", ixs_typ = "common", popis = "common", dat_pis = "common", dat_pri = "common", ixs_pri = "common", nazev_pri = "common", ac = "common", nazev = "common", s_dgr_txt = "common", s_dgr = "common", typ_dgr = "common", typ_dgr_txt = "common", cis_por = "common", c = "common", ixs_krk = "common", dat_zad_p = "common", dat_uza_p = "common", dat_p_lhu = "common", bu_vl_txt = "common", bu_vl = "common", sk_vl = "common", ks = "common", vs = "common", ss = "common", bu_ci_txt = "common", bu_ci = "common", sk_ci = "common", ixs_esu = "common", ixs_esu_txt = "common", por_cis_nab = "common", dat_zmena = "common", zmenu_prov = "common", vfp_stav = "common", ixp_den = "common", ukon = "common", zda_sml = "common", ac_ag = "common", cis_real_nazev = "commonSeznam", nazev_rf = "commonSeznam", rezim_pri_txt = "commonSeznam", cis_duz_txt = "commonSeznam", cis_ner_txt = "commonSeznam", pri_pri_txt = "commonSeznam", vfp_stav_txt = "commonSeznam", esu_naz = "commonSeznam", ixs_typ_txt = "commonSeznam", je_fin = "commonSeznam", po_case = "commonSeznam", po_filuta = "commonSeznam", ident_zpo = "commonSeznam", uzo = "commonSeznam", vlastnosti = "*", jmeno = "gindesu", prijmeni = "gindesu", kont_osoba = "gindesu", esu_ico = "ginsesu", esu_rc = "ginsesu", esu_dic = "ginsesu", s_ess = "s_ess", s_ess_txt = "s_ess", dat_zverejneni = "wfllpub", zverejnil = "wfllpub", ktg_dms = "wfllpub", fun_naz = "wflIconCalculator", ixs_fun_akt = "wflIconCalculator", priznak = "wflsepx", priznak_txt = "wflsepx", s_sgn_epx = "wflsepx", popis_ixb = "wflsepx", soubor = "wflsixb", popis_wflsixb = "wflsixb", velikost = "wflsixb", ixb = "wflsixb", dz_file = "wflsixb", priz_elp = "wflsixb", typ_soub = "wflsixb", ixp_den_vfpspac = "wflsixb", ixp_den_nazev = "wflsixb", naz_prj = "sezDok", priz_ext = "sezDok", rezim_pri = "detail", cis_duz = "detail", cis_ner = "detail", pri_pri = "detail", ixp_pre = "detail", poznamka = "detail", c_plan = "detail", c_clepr = "common", c_sch = "detail", c_ps = "detail", fin_od = "detail", fin_do = "detail", ixs_esu_opr = "detail", priz_view = "detail", typ_fin = "detail", lic_zast = "detail", por_zast = "detail", mena = "detail", cis_prg = "detail", zpus_pd = "detail", proc_max_spol = "detail", proc_max_spol_esu = "detail", stan_pig = "detail", cj_dgr = "detail", zps_fin = "detail", cis_ucl = "detail", ixs_esu_kont = "detail", c_vyd = "detail", c_predp = "detail", c_real = "detail", c_poz = "detail", vs_s = "detail", c_dmi = "common", zamer_prj = "detail", c_prj_v = "detail", c_prj_o = "detail", c_nakl = "detail", dat_usk_p = "detail", dat_usk_s = "detail", mesic_prj_pp = "detail", rok_prj_pp = "detail", mesic_prj_zv = "detail", rok_prj_zv = "detail", dat_pzz = "detail", dat_dor_z = "detail", dor_z_pt = "detail", kompl_z = "detail", ecis_prj = "detail", dat_uci_un = "detail", bhod_prj = "detail", dat_sml1_o = "detail", dat_sml1_v = "detail", dat_sml2_o = "detail", dat_sml2_v = "detail", c_vratk = "detail", c_pokut = "detail", c_penal = "detail", por_rk = "detail", cislo_usn = "detail", c_nedoc = "detail", nes_podg = "detail", cislo_usn_dt = "detail", druh_dtp = "detail", ixs_pri_dtp = "detail", projednal = "detail", dat_jedn_pl = "detail", dat_jedn = "detail", spu_rs_1 = "detail", spu_rs_2 = "detail", int_cis_zad = "detail", oblast_dt = "detail", schvalil = "detail", ver_pod = "common", priz_ver_pod = "common", ver_pod_txt = "common", priz_ver_pod_txt = "common", dat_ver_pod = "detail", s_spis = "detail", s_sdg = "detail", c_vratk_nas = "detail", dat_vratk = "detail", pro_urc = "detail", cis_reg_zad = "detail", dat_reg_zad = "detail", poc_det = "detail", poc_mla = "detail", poc_dos = "detail", poc_duc = "detail", dat_vratk_nas = "detail", typ_phl = "detail", typ_phl_pri = "detail", typ_phl_esu = "detail", c_rez = "detail", cislo = "detail", ixs_cia = "detail", ixs_esu_zrpo = "detail", priz_zrpo = "*", bu_ci_zrpo = "detail", sk_ci_zrpo = "detail", bu_ci_zrpo_txt = "detail", priz_isprofin = "*", pr_forma = "*", priz_ext_pri = "*", priz_ext_pid = "*", priz_cll = "*", priz_ext_esu = "*", dat_pzz_t = "*", kont_prj = "detail", oduv_prj = "*", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", c_preblk = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum VfpspidDtoTypes { ixp = "string", evidence_dokladu = "boolean", vlastnik = "boolean", vlastnikIdent = "string", vlastnik_nazev = "string", count = "number", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", dat_prij_pod = "JsonDate", ktg_typ = "number", ixs_typ = "string", popis = "string", dat_pis = "JsonDate", dat_pri = "JsonDate", ixs_pri = "string", nazev_pri = "string", ac = "string", nazev = "string", s_dgr_txt = "string", s_dgr = "number", typ_dgr = "string", typ_dgr_txt = "string", cis_por = "number", c = "JsonDecimal", ixs_krk = "string", dat_zad_p = "JsonDate", dat_uza_p = "JsonDate", dat_p_lhu = "JsonDate", bu_vl_txt = "string", bu_vl = "string", sk_vl = "string", ks = "string", vs = "string", ss = "string", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", ixs_esu_txt = "string", por_cis_nab = "number", dat_zmena = "JsonDate", zmenu_prov = "string", vfp_stav = "number", ixp_den = "string", ukon = "string", zda_sml = "string", ac_ag = "string", cis_real_nazev = "string", nazev_rf = "string", rezim_pri_txt = "string", cis_duz_txt = "string", cis_ner_txt = "string", pri_pri_txt = "string", vfp_stav_txt = "string", esu_naz = "string", ixs_typ_txt = "string", je_fin = "string", po_case = "number", po_filuta = "number", ident_zpo = "number", uzo = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", jmeno = "string", prijmeni = "string", kont_osoba = "string", esu_ico = "string", esu_rc = "string", esu_dic = "string", s_ess = "number", s_ess_txt = "string", dat_zverejneni = "JsonDate", zverejnil = "string", ktg_dms = "string", fun_naz = "string", ixs_fun_akt = "string", priznak = "number", priznak_txt = "string", s_sgn_epx = "number", popis_ixb = "string", soubor = "string", popis_wflsixb = "string", velikost = "number", ixb = "string", dz_file = "JsonDate", priz_elp = "number", typ_soub = "string", ixp_den_vfpspac = "string", ixp_den_nazev = "string", naz_prj = "string", priz_ext = "number", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", ixp_pre = "string", poznamka = "string", c_plan = "JsonDecimal", c_clepr = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixs_esu_opr = "string", priz_view = "number", typ_fin = "number", lic_zast = "string", por_zast = "number", mena = "number", cis_prg = "string", zpus_pd = "number", proc_max_spol = "JsonDecimal", proc_max_spol_esu = "JsonDecimal", stan_pig = "number", cj_dgr = "string", zps_fin = "number", cis_ucl = "string", ixs_esu_kont = "string", c_vyd = "JsonDecimal", c_predp = "JsonDecimal", c_real = "JsonDecimal", c_poz = "JsonDecimal", vs_s = "string", c_dmi = "JsonDecimal", zamer_prj = "string", c_prj_v = "JsonDecimal", c_prj_o = "JsonDecimal", c_nakl = "JsonDecimal", dat_usk_p = "JsonDate", dat_usk_s = "JsonDate", mesic_prj_pp = "number", rok_prj_pp = "number", mesic_prj_zv = "number", rok_prj_zv = "number", dat_pzz = "JsonDate", dat_dor_z = "JsonDate", dor_z_pt = "number", kompl_z = "number", ecis_prj = "string", dat_uci_un = "JsonDate", bhod_prj = "number", dat_sml1_o = "JsonDate", dat_sml1_v = "JsonDate", dat_sml2_o = "JsonDate", dat_sml2_v = "JsonDate", c_vratk = "JsonDecimal", c_pokut = "JsonDecimal", c_penal = "JsonDecimal", por_rk = "number", cislo_usn = "string", c_nedoc = "JsonDecimal", nes_podg = "number", cislo_usn_dt = "string", druh_dtp = "number", ixs_pri_dtp = "string", projednal = "string", dat_jedn_pl = "JsonDate", dat_jedn = "JsonDate", spu_rs_1 = "string", spu_rs_2 = "string", int_cis_zad = "string", oblast_dt = "string", schvalil = "string", ver_pod = "number", priz_ver_pod = "number", ver_pod_txt = "string", priz_ver_pod_txt = "string", dat_ver_pod = "JsonDate", s_spis = "number", s_sdg = "number", c_vratk_nas = "JsonDecimal", dat_vratk = "JsonDate", pro_urc = "number", cis_reg_zad = "string", dat_reg_zad = "JsonDate", poc_det = "number", poc_mla = "number", poc_dos = "number", poc_duc = "number", dat_vratk_nas = "JsonDate", typ_phl = "string", typ_phl_pri = "string", typ_phl_esu = "string", c_rez = "JsonDecimal", cislo = "string", ixs_cia = "string", ixs_esu_zrpo = "string", priz_zrpo = "number", bu_ci_zrpo = "string", sk_ci_zrpo = "string", bu_ci_zrpo_txt = "string", priz_isprofin = "number", pr_forma = "string", priz_ext_pri = "number", priz_ext_pid = "number", priz_cll = "number", priz_ext_esu = "number", dat_pzz_t = "JsonDate", kont_prj = "string", oduv_prj = "string", el_obraz_typ = "string", el_obraz_soubor = "string", c_preblk = "JsonDecimal", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum VfpspidDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ixs_typ = 12, popis = 254, ixs_pri = 12, ac = 20, nazev = 100, s_dgr_txt = 50, typ_dgr = 10, ixs_krk = 12, bu_vl = 34, sk_vl = 11, ks = 12, vs = 12, ss = 12, bu_ci = 34, sk_ci = 11, ixs_esu = 12, zmenu_prov = 12, ixp_den = 12, ac_ag = 20, nazev_rf = 50, cis_duz_txt = 50, cis_ner_txt = 50, pri_pri_txt = 50, vfp_stav_txt = 50, esu_naz = 254, jmeno = 24, prijmeni = 36, esu_ico = 10, esu_rc = 10, esu_dic = 15, zverejnil = 12, ktg_dms = 50, soubor = 254, popis_wflsixb = 50, ixb = 12, ixp_den_vfpspac = 12, ixp_den_nazev = 50, ixp_pre = 12, poznamka = 254, ixs_esu_opr = 12, lic_zast = 4, ecis_prj = 50, cislo_usn = 50, cislo_usn_dt = 50, ixs_pri_dtp = 12, projednal = 50, spu_rs_1 = 20, spu_rs_2 = 30, int_cis_zad = 40, oblast_dt = 10, schvalil = 100, cis_reg_zad = 30, typ_phl = 4, typ_phl_pri = 4, typ_phl_esu = 4, pr_forma = 3, kont_prj = 254, oduv_prj = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Gordic.Vfp.Interface.VfpspriDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**vfpspri*/
	interface VfpspriDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		ControlsSystemAggregated?: Gordic.Gin.Interface.GControlsSystemAggregatedDto|null;
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		organizacni_jednotka?: string|null;
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
		/**DBCOLUMN:Seznam.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zdg*/
		dat_zdg?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Detail.stan_pig*/
		stan_pig?: number|null;
		/**DBCOLUMN:Detail.cj_dgr*/
		cj_dgr?: string|null;
		/**DBCOLUMN:Detail.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:Detail.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Detail.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Detail.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Detail.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Detail.cis_prg*/
		cis_prg?: string|null;
		/**DBCOLUMN:Detail.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:Detail.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:Detail.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Detail.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:Detail.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Detail.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:Detail.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Detail.oblast_dt*/
		oblast_dt?: string|null;
		/**DBCOLUMN:Seznam.sta_sml*/
		znak_s?: string|null;
		/**DBCOLUMN:Detail.financovani 0/1/2*/
		financovani?: number|null;
		/**vazbyPP*/
		vazbyPP?: number|null;
		/**vazbyPPRok*/
		vazbyPPRok?: number|null;
		/**DBCOLUMN:Seznam.c_poz_dt_celk*/
		c_poz_dt_celk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_predp_dt_celk*/
		c_predp_dt_celk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_real_dt_celk*/
		c_real_dt_celk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnik?: boolean|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnikIdent?: string|null;
		/**vlastnik*/
		vlastnik_nazev?: string|null;
		/**DBCOLUMN:Seznam.s_dgr*/
		s_dgr?: number|null;
		/**DBCOLUMN:Seznam.uzo*/
		uzo?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.mask_pgenvs*/
		mask_pgenvs?: string|null;
		/**vfpsesuCount*/
		typ_masky?: number|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**DBCOLUMN:Seznam.ser_cis_pgenvs*/
		ser_cis_pgenvs?: number|null;
		/**DBCOLUMN:Detail.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Detail.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.s_dgr_txt*/
		s_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_dgr_txt*/
		typ_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.s_sdg_txt*/
		s_sdg_txt?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.poc_dokl*/
		poc_dokl?: number|null;
		/**DBCOLUMN:Seznam.poc_zado*/
		poc_zado?: number|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_vfpspac*/
		ixp_den_vfpspac?: string|null;
		/**DBCOLUMN:Seznam.priz_view_all*/
		priz_view_all?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt_nazev*/
		oblast_dt_nazev?: string|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		sta_uko?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt*/
		k_arch?: string|null;
		/**DBCOLUMN:Seznam.s_sdg*/
		s_sdg?: number|null;
		/**DBCOLUMN:Seznam.s_dsg*/
		s_dsg?: number|null;
		/**DBCOLUMN:Seznam.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Detail.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:Detail.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:Detail.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:Detail.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Detail.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:Detail.cis_ucl*/
		cis_ucl?: string|null;
		/**DBCOLUMN:Detail.cislo_usn_dt*/
		cislo_usn_dt?: string|null;
		/**DBCOLUMN:Detail.druh_dtp*/
		druh_dtp?: number|null;
		/**DBCOLUMN:Detail.ixs_pri_dtp*/
		ixs_pri_dtp?: string|null;
		/**DBCOLUMN:wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**vfpsesuCount*/
		vfpsesuCount?: number|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		preevidence?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
	}
	const enum VfpspriDtoNames { ControlsSystemAggregated = "ControlsSystemAggregated", ixp = "ixp", ixs_pri = "ixs_pri", ac_sml = "ac_sml", organizacni_jednotka = "organizacni_jednotka", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", nazev = "nazev", typ_dgr = "typ_dgr", cis_por = "cis_por", c = "c", dat_pri = "dat_pri", dat_zdg = "dat_zdg", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", stan_pig = "stan_pig", cj_dgr = "cj_dgr", c_sch = "c_sch", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", ac_ag = "ac_ag", priz_view = "priz_view", typ_fin = "typ_fin", cis_prg = "cis_prg", dat_p_lhu = "dat_p_lhu", zpus_pd = "zpus_pd", proc_max_spol = "proc_max_spol", priz_isprofin = "priz_isprofin", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zps_fin = "zps_fin", priz_ext = "priz_ext", oblast_dt = "oblast_dt", znak_s = "znak_s", financovani = "financovani", vazbyPP = "vazbyPP", vazbyPPRok = "vazbyPPRok", c_poz_dt_celk = "c_poz_dt_celk", c_predp_dt_celk = "c_predp_dt_celk", c_real_dt_celk = "c_real_dt_celk", vlastnik = "vlastnik", vlastnikIdent = "vlastnikIdent", vlastnik_nazev = "vlastnik_nazev", s_dgr = "s_dgr", uzo = "uzo", ixs_typ = "ixs_typ", mask_pgenvs = "mask_pgenvs", typ_masky = "typ_masky", vlastnosti = "vlastnosti", ser_cis_pgenvs = "ser_cis_pgenvs", fin_od = "fin_od", fin_do = "fin_do", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", s_dgr_txt = "s_dgr_txt", typ_dgr_txt = "typ_dgr_txt", s_sdg_txt = "s_sdg_txt", rezim_pri_txt = "rezim_pri_txt", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", pri_pri_txt = "pri_pri_txt", poc_dokl = "poc_dokl", poc_zado = "poc_zado", zda_sml = "zda_sml", ixp_den_vfpspac = "ixp_den_vfpspac", priz_view_all = "priz_view_all", oblast_dt_nazev = "oblast_dt_nazev", sta_uko = "sta_uko", k_arch = "k_arch", s_sdg = "s_sdg", s_dsg = "s_dsg", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", poznamka = "poznamka", c_plan = "c_plan", c_ps = "c_ps", cis_ucl = "cis_ucl", cislo_usn_dt = "cislo_usn_dt", druh_dtp = "druh_dtp", ixs_pri_dtp = "ixs_pri_dtp", ixs_fun_akt = "ixs_fun_akt", vfpsesuCount = "vfpsesuCount", zmenu_prov_txt = "zmenu_prov_txt", preevidence = "preevidence", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum VfpspriDtoFragments { ControlsSystemAggregated = "DSG_FRAGMENT", ixp = "common", ixs_pri = "minimum", ac_sml = "minimum", organizacni_jednotka = "minimum", lic = "common", ico = "common", ucs = "common", rok_zal = "common", cis_real = "common", ixs_fun_komp = "common", ac = "minimum", nazev = "minimum", typ_dgr = "common", cis_por = "common", c = "common", dat_pri = "minimum", dat_zdg = "common", dat_zad_p = "common", dat_zad_s = "common", dat_uza_p = "common", dat_uza_s = "common", stan_pig = "common", cj_dgr = "common", c_sch = "common", ixp_den = "minimum", ixp_den_nazev = "minimum", ac_ag = "minimum", priz_view = "common", typ_fin = "common", cis_prg = "common", dat_p_lhu = "common", zpus_pd = "common", proc_max_spol = "common", priz_isprofin = "common", dat_zmena = "common", zmenu_prov = "common", zps_fin = "common", priz_ext = "common", oblast_dt = "common", znak_s = "common", financovani = "seznam", vazbyPP = "foreach", vazbyPPRok = "foreach", c_poz_dt_celk = "foreach", c_predp_dt_celk = "foreach", c_real_dt_celk = "foreach", vlastnik = "minimum", vlastnikIdent = "common", vlastnik_nazev = "minimum", s_dgr = "minimum", uzo = "common", ixs_typ = "common", mask_pgenvs = "common", typ_masky = "common", vlastnosti = "*", ser_cis_pgenvs = "common", fin_od = "common", fin_do = "common", cis_real_nazev = "seznam", nazev_rf = "seznam", s_dgr_txt = "minimum", typ_dgr_txt = "seznam", s_sdg_txt = "seznam", rezim_pri_txt = "seznam", cis_duz_txt = "seznam", cis_ner_txt = "seznam", pri_pri_txt = "seznam", poc_dokl = "foreach", poc_zado = "foreach", zda_sml = "seznam", ixp_den_vfpspac = "seznam", priz_view_all = "seznam", oblast_dt_nazev = "seznam", sta_uko = "foreach", k_arch = "foreach", s_sdg = "detail", s_dsg = "detail", rezim_pri = "detail", cis_duz = "detail", cis_ner = "detail", pri_pri = "detail", poznamka = "detail", c_plan = "detail", c_ps = "detail", cis_ucl = "detail", cislo_usn_dt = "detail", druh_dtp = "detail", ixs_pri_dtp = "detail", ixs_fun_akt = "detail", vfpsesuCount = "detail", zmenu_prov_txt = "detail", preevidence = "preevidence", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum VfpspriDtoTypes { ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", ixp = "string", ixs_pri = "string", ac_sml = "string", organizacni_jednotka = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", nazev = "string", typ_dgr = "string", cis_por = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zdg = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", stan_pig = "number", cj_dgr = "string", c_sch = "JsonDecimal", ixp_den = "string", ixp_den_nazev = "string", ac_ag = "string", priz_view = "number", typ_fin = "number", cis_prg = "string", dat_p_lhu = "JsonDate", zpus_pd = "number", proc_max_spol = "JsonDecimal", priz_isprofin = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zps_fin = "number", priz_ext = "number", oblast_dt = "string", znak_s = "string", financovani = "number", vazbyPP = "number", vazbyPPRok = "number", c_poz_dt_celk = "JsonDecimal", c_predp_dt_celk = "JsonDecimal", c_real_dt_celk = "JsonDecimal", vlastnik = "boolean", vlastnikIdent = "string", vlastnik_nazev = "string", s_dgr = "number", uzo = "string", ixs_typ = "string", mask_pgenvs = "string", typ_masky = "number", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ser_cis_pgenvs = "number", fin_od = "number", fin_do = "number", cis_real_nazev = "string", nazev_rf = "string", s_dgr_txt = "string", typ_dgr_txt = "string", s_sdg_txt = "string", rezim_pri_txt = "string", cis_duz_txt = "string", cis_ner_txt = "string", pri_pri_txt = "string", poc_dokl = "number", poc_zado = "number", zda_sml = "string", ixp_den_vfpspac = "string", priz_view_all = "number", oblast_dt_nazev = "string", sta_uko = "number", k_arch = "string", s_sdg = "number", s_dsg = "number", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", poznamka = "string", c_plan = "JsonDecimal", c_ps = "JsonDecimal", cis_ucl = "string", cislo_usn_dt = "string", druh_dtp = "number", ixs_pri_dtp = "string", ixs_fun_akt = "string", vfpsesuCount = "number", zmenu_prov_txt = "string", preevidence = "number", el_obraz_typ = "string", el_obraz_soubor = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum VfpspriDtoTypeLengths { ixp = 12, ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, nazev = 100, typ_dgr = 10, cj_dgr = 30, ixp_den = 12, ixp_den_nazev = 50, ac_ag = 20, cis_prg = 20, zmenu_prov = 12, oblast_dt = 10, cis_real_nazev = 50, nazev_rf = 50, s_dgr_txt = 50, typ_dgr_txt = 50, s_sdg_txt = 50, rezim_pri_txt = 50, cis_duz_txt = 50, cis_ner_txt = 50, pri_pri_txt = 50, ixp_den_vfpspac = 12, oblast_dt_nazev = 254, k_arch = 2, poznamka = 254, cis_ucl = 8, cislo_usn_dt = 50, ixs_pri_dtp = 12, ixs_fun_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Const\Gordic.Vfp.Interface.GLokalityConstDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Konstanty pro TS lokality*/
	interface GLokalityConstDto {
		/**enable lokality*/
		EnableLok?: boolean|null;
		/**enable rozšířené*/
		EnableRoz?: boolean|null;
		/**enable pověřené*/
		EnablePov?: boolean|null;
		/**enable doplňky*/
		EnableDop?: boolean|null;
		/**vlastník*/
		vlastnik?: boolean|null;
	}
	const enum GLokalityConstDtoNames { EnableLok = "EnableLok", EnableRoz = "EnableRoz", EnablePov = "EnablePov", EnableDop = "EnableDop", vlastnik = "vlastnik",}
	const enum GLokalityConstDtoFragments { EnableLok = "*", EnableRoz = "*", EnablePov = "*", EnableDop = "*", vlastnik = "*",}
	const enum GLokalityConstDtoTypes { EnableLok = "boolean", EnableRoz = "boolean", EnablePov = "boolean", EnableDop = "boolean", vlastnik = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Const\Gordic.Vfp.Interface.GPredvyhodnoceniConstDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Konstanty pro TS předvyhodnocení*/
	interface GPredvyhodnoceniConstDto {
		/**podani*/
		EnablePodani?: boolean|null;
	}
	const enum GPredvyhodnoceniConstDtoNames { EnablePodani = "EnablePodani",}
	const enum GPredvyhodnoceniConstDtoFragments { EnablePodani = "*",}
	const enum GPredvyhodnoceniConstDtoTypes { EnablePodani = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Dto\Const\Gordic.Vfp.Interface.GProstredkyDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Konstanty pro TS prostředky*/
	interface GProstredkyConstDto {
		/**vlastník*/
		vlastnik?: boolean|null;
		/**jeVprc*/
		jeVprc?: string|null;
	}
	const enum GProstredkyConstDtoNames { vlastnik = "vlastnik", jeVprc = "jeVprc",}
	const enum GProstredkyConstDtoFragments { vlastnik = "*", jeVprc = "*",}
	const enum GProstredkyConstDtoTypes { vlastnik = "boolean", jeVprc = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Filters\Gordic.Vfp.Interface.GVfpFiltrDokDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	interface GVfpFiltrDokDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		dat_prij_pod?: GIntervalDto<JsonDate>|null;
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
		stav_fin?: number|null;
		/**požadované prostředky*/
		c_poz?: GIntervalDto<JsonDecimal>|null;
		/**schválené prostředky*/
		c_real?: GIntervalDto<JsonDecimal>|null;
		/**prostředky navrhované*/
		c_vyd?: GIntervalDto<JsonDecimal>|null;
		/**předpokládané prostředky*/
		c_predp?: GIntervalDto<JsonDecimal>|null;
		cb1?: boolean|null;
		cb2?: boolean|null;
		cb3?: boolean|null;
		/**doplnit*/
		doplnit?: boolean|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
	}
	const enum GVfpFiltrDokDtoNames { ixs_pri = "ixs_pri", ixs_esu = "ixs_esu", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", stav_pis = "stav_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", typ_esu = "typ_esu", typ_org = "typ_org", ixs_fun_vl = "ixs_fun_vl", kompl_z = "kompl_z", stav_fin = "stav_fin", c_poz = "c_poz", c_real = "c_real", c_vyd = "c_vyd", c_predp = "c_predp", cb1 = "cb1", cb2 = "cb2", cb3 = "cb3", doplnit = "doplnit", vlastnosti = "vlastnosti",}
	const enum GVfpFiltrDokDtoFragments { ixs_pri = "*", ixs_esu = "*", dat_prij_pod = "*", ixs_typ = "*", stav_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", typ_esu = "*", typ_org = "*", ixs_fun_vl = "*", kompl_z = "*", stav_fin = "*", c_poz = "*", c_real = "*", c_vyd = "*", c_predp = "*", cb1 = "*", cb2 = "*", cb3 = "*", doplnit = "*", vlastnosti = "*",}
	const enum GVfpFiltrDokDtoTypes { ixs_pri = "string", ixs_esu = "string", dat_prij_pod = "GIntervalDto<JsonDate>", ixs_typ = "string", stav_pis = "number", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", typ_esu = "number", typ_org = "number", ixs_fun_vl = "string", kompl_z = "boolean", stav_fin = "number", c_poz = "GIntervalDto<JsonDecimal>", c_real = "GIntervalDto<JsonDecimal>", c_vyd = "GIntervalDto<JsonDecimal>", c_predp = "GIntervalDto<JsonDecimal>", cb1 = "boolean", cb2 = "boolean", cb3 = "boolean", doplnit = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Filters\Gordic.Vfp.Interface.GVfpFiltrDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	interface GVfpFiltrDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ixs_pri*/
		ixs_typ?: string|null;
		/**Evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**Agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**realizátor*/
		cis_real?: string|null;
		/**název*/
		nazev_dgr?: GBaseFilter<string>|null;
		/**oblast DT*/
		oblast_dt?: number|null;
		/**stav DT*/
		s_dgr?: number|null;
		/**DT v přípravě*/
		s_dgr_00?: boolean|null;
		/**DT schválený*/
		s_dgr_10?: boolean|null;
		/**DT zahájený*/
		s_dgr_20?: boolean|null;
		/**DT ukončený*/
		s_dgr_50?: boolean|null;
		/**DT zrušený*/
		s_dgr_80?: boolean|null;
		/**DT storno*/
		s_dgr_90?: boolean|null;
		/**kompetent*/
		ixs_fun_komp?: string|null;
		/**typ DT*/
		typ_dgr?: string|null;
		/**celková částka*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**blokovaná částka*/
		c_plan?: GIntervalDto<JsonDecimal>|null;
		/**předpokládaná částka*/
		c_ps?: GIntervalDto<JsonDecimal>|null;
		/**schválená částka*/
		c_sch?: GIntervalDto<JsonDecimal>|null;
		/**čj DT*/
		cj_dgr?: GIntervalDto<string>|null;
		/**vlastník*/
		ixs_fun_vl?: string|null;
		/**historie*/
		hist?: boolean|null;
		/**založeni DT*/
		dat_pri?: GIntervalDto<JsonDate>|null;
		/**zrušeni DT*/
		dat_zvz?: GIntervalDto<JsonDate>|null;
		/**rok založení*/
		rok_zal?: GIntervalDto<number>|null;
		/**financování*/
		fin?: GIntervalDto<number>|null;
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
		dat_prij_pod?: GIntervalDto<JsonDate>|null;
		/**evid číslo projektu*/
		ecis_prj?: string|null;
		/**interní číslo žádosti*/
		int_cis_zad?: string|null;
		/**bodové hodnocení*/
		bhod_prj?: GIntervalDto<number>|null;
		/**číslo usnesení*/
		cislo_usn?: string|null;
		/**projednal*/
		projednal?: string|null;
		/**schválil*/
		schvalil?: string|null;
		/**datum projednání plán*/
		dat_jedn_pl?: GIntervalDto<JsonDate>|null;
		/**datum projednání skut.*/
		dat_jedn?: GIntervalDto<JsonDate>|null;
		/**požadované prostředky*/
		c_poz?: GIntervalDto<JsonDecimal>|null;
		/**schválené prostředky*/
		c_real?: GIntervalDto<JsonDecimal>|null;
		/**případ komentář*/
		poznamka_dgr?: GBaseFilter<string>|null;
		/**případ poznámka*/
		poznamka_wfl?: GBaseFilter<string>|null;
		/**dokument popis*/
		poznamka_pis?: GBaseFilter<string>|null;
		/**dokument poznámka*/
		pozn_wfl_pis?: GBaseFilter<string>|null;
		/**CFU*/
		elm?: Gordic.Pap.Interface.GPapCfuDto[]|null;
		/**doplnit*/
		doplnit?: boolean|null;
		/**bez_financovani*/
		bez_financovani?: boolean|null;
		/**bez_nasmlouvanosti*/
		bez_nasmlouvanosti?: boolean|null;
		/**bez_rezervaci*/
		bez_rezervaci?: boolean|null;
		/**vlastnosti	vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
	}
	const enum GVfpFiltrDtoNames { ixs_pri = "ixs_pri", ixs_typ = "ixs_typ", ac = "ac", ac_ag = "ac_ag", cis_real = "cis_real", nazev_dgr = "nazev_dgr", oblast_dt = "oblast_dt", s_dgr = "s_dgr", s_dgr_00 = "s_dgr_00", s_dgr_10 = "s_dgr_10", s_dgr_20 = "s_dgr_20", s_dgr_50 = "s_dgr_50", s_dgr_80 = "s_dgr_80", s_dgr_90 = "s_dgr_90", ixs_fun_komp = "ixs_fun_komp", typ_dgr = "typ_dgr", c = "c", c_plan = "c_plan", c_ps = "c_ps", c_sch = "c_sch", cj_dgr = "cj_dgr", ixs_fun_vl = "ixs_fun_vl", hist = "hist", dat_pri = "dat_pri", dat_zvz = "dat_zvz", rok_zal = "rok_zal", fin = "fin", ixp = "ixp", cj_pis = "cj_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_prij_pod = "dat_prij_pod", ecis_prj = "ecis_prj", int_cis_zad = "int_cis_zad", bhod_prj = "bhod_prj", cislo_usn = "cislo_usn", projednal = "projednal", schvalil = "schvalil", dat_jedn_pl = "dat_jedn_pl", dat_jedn = "dat_jedn", c_poz = "c_poz", c_real = "c_real", poznamka_dgr = "poznamka_dgr", poznamka_wfl = "poznamka_wfl", poznamka_pis = "poznamka_pis", pozn_wfl_pis = "pozn_wfl_pis", elm = "elm", doplnit = "doplnit", bez_financovani = "bez_financovani", bez_nasmlouvanosti = "bez_nasmlouvanosti", bez_rezervaci = "bez_rezervaci", vlastnosti = "vlastnosti",}
	const enum GVfpFiltrDtoFragments { ixs_pri = "*", ixs_typ = "*", ac = "*", ac_ag = "*", cis_real = "*", nazev_dgr = "*", oblast_dt = "*", s_dgr = "*", s_dgr_00 = "*", s_dgr_10 = "*", s_dgr_20 = "*", s_dgr_50 = "*", s_dgr_80 = "*", s_dgr_90 = "*", ixs_fun_komp = "*", typ_dgr = "*", c = "*", c_plan = "*", c_ps = "*", c_sch = "*", cj_dgr = "*", ixs_fun_vl = "*", hist = "*", dat_pri = "*", dat_zvz = "*", rok_zal = "*", fin = "*", ixp = "*", cj_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_prij_pod = "*", ecis_prj = "*", int_cis_zad = "*", bhod_prj = "*", cislo_usn = "*", projednal = "*", schvalil = "*", dat_jedn_pl = "*", dat_jedn = "*", c_poz = "*", c_real = "*", poznamka_dgr = "*", poznamka_wfl = "*", poznamka_pis = "*", pozn_wfl_pis = "*", elm = "*", doplnit = "*", bez_financovani = "*", bez_nasmlouvanosti = "*", bez_rezervaci = "*", vlastnosti = "*",}
	const enum GVfpFiltrDtoTypes { ixs_pri = "string", ixs_typ = "string", ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", cis_real = "string", nazev_dgr = "GBaseFilter<string>", oblast_dt = "number", s_dgr = "number", s_dgr_00 = "boolean", s_dgr_10 = "boolean", s_dgr_20 = "boolean", s_dgr_50 = "boolean", s_dgr_80 = "boolean", s_dgr_90 = "boolean", ixs_fun_komp = "string", typ_dgr = "string", c = "GIntervalDto<JsonDecimal>", c_plan = "GIntervalDto<JsonDecimal>", c_ps = "GIntervalDto<JsonDecimal>", c_sch = "GIntervalDto<JsonDecimal>", cj_dgr = "GIntervalDto<string>", ixs_fun_vl = "string", hist = "boolean", dat_pri = "GIntervalDto<JsonDate>", dat_zvz = "GIntervalDto<JsonDate>", rok_zal = "GIntervalDto<number>", fin = "GIntervalDto<number>", ixp = "string", cj_pis = "GIntervalDto<string>", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_prij_pod = "GIntervalDto<JsonDate>", ecis_prj = "string", int_cis_zad = "string", bhod_prj = "GIntervalDto<number>", cislo_usn = "string", projednal = "string", schvalil = "string", dat_jedn_pl = "GIntervalDto<JsonDate>", dat_jedn = "GIntervalDto<JsonDate>", c_poz = "GIntervalDto<JsonDecimal>", c_real = "GIntervalDto<JsonDecimal>", poznamka_dgr = "GBaseFilter<string>", poznamka_wfl = "GBaseFilter<string>", poznamka_pis = "GBaseFilter<string>", pozn_wfl_pis = "GBaseFilter<string>", elm = "Gordic.Pap.Interface.GPapCfuDto[]", doplnit = "boolean", bez_financovani = "boolean", bez_nasmlouvanosti = "boolean", bez_rezervaci = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]",}
	const enum GVfpFiltrDtoTypeLengths {}
	/**DTO ulozeneho filtru*/
	interface GSeznamDokladuFilterStoredDto extends Gordic.Vfp.Interface.GVfpFiltrDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamDokladuFilterStoredDtoNames { id = "id", name = "name", description = "description", ixs_pri = "ixs_pri", ixs_typ = "ixs_typ", ac = "ac", ac_ag = "ac_ag", cis_real = "cis_real", nazev_dgr = "nazev_dgr", oblast_dt = "oblast_dt", s_dgr = "s_dgr", s_dgr_00 = "s_dgr_00", s_dgr_10 = "s_dgr_10", s_dgr_20 = "s_dgr_20", s_dgr_50 = "s_dgr_50", s_dgr_80 = "s_dgr_80", s_dgr_90 = "s_dgr_90", ixs_fun_komp = "ixs_fun_komp", typ_dgr = "typ_dgr", c = "c", c_plan = "c_plan", c_ps = "c_ps", c_sch = "c_sch", cj_dgr = "cj_dgr", ixs_fun_vl = "ixs_fun_vl", hist = "hist", dat_pri = "dat_pri", dat_zvz = "dat_zvz", rok_zal = "rok_zal", fin = "fin", ixp = "ixp", cj_pis = "cj_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_prij_pod = "dat_prij_pod", ecis_prj = "ecis_prj", int_cis_zad = "int_cis_zad", bhod_prj = "bhod_prj", cislo_usn = "cislo_usn", projednal = "projednal", schvalil = "schvalil", dat_jedn_pl = "dat_jedn_pl", dat_jedn = "dat_jedn", c_poz = "c_poz", c_real = "c_real", poznamka_dgr = "poznamka_dgr", poznamka_wfl = "poznamka_wfl", poznamka_pis = "poznamka_pis", pozn_wfl_pis = "pozn_wfl_pis", elm = "elm", doplnit = "doplnit", bez_financovani = "bez_financovani", bez_nasmlouvanosti = "bez_nasmlouvanosti", bez_rezervaci = "bez_rezervaci", vlastnosti = "vlastnosti",}
	const enum GSeznamDokladuFilterStoredDtoFragments { id = "*", name = "*", description = "*", ixs_pri = "*", ixs_typ = "*", ac = "*", ac_ag = "*", cis_real = "*", nazev_dgr = "*", oblast_dt = "*", s_dgr = "*", s_dgr_00 = "*", s_dgr_10 = "*", s_dgr_20 = "*", s_dgr_50 = "*", s_dgr_80 = "*", s_dgr_90 = "*", ixs_fun_komp = "*", typ_dgr = "*", c = "*", c_plan = "*", c_ps = "*", c_sch = "*", cj_dgr = "*", ixs_fun_vl = "*", hist = "*", dat_pri = "*", dat_zvz = "*", rok_zal = "*", fin = "*", ixp = "*", cj_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_prij_pod = "*", ecis_prj = "*", int_cis_zad = "*", bhod_prj = "*", cislo_usn = "*", projednal = "*", schvalil = "*", dat_jedn_pl = "*", dat_jedn = "*", c_poz = "*", c_real = "*", poznamka_dgr = "*", poznamka_wfl = "*", poznamka_pis = "*", pozn_wfl_pis = "*", elm = "*", doplnit = "*", bez_financovani = "*", bez_nasmlouvanosti = "*", bez_rezervaci = "*", vlastnosti = "*",}
	const enum GSeznamDokladuFilterStoredDtoTypes { id = "string", name = "string", description = "string", ixs_pri = "string", ixs_typ = "string", ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", cis_real = "string", nazev_dgr = "GBaseFilter<string>", oblast_dt = "number", s_dgr = "number", s_dgr_00 = "boolean", s_dgr_10 = "boolean", s_dgr_20 = "boolean", s_dgr_50 = "boolean", s_dgr_80 = "boolean", s_dgr_90 = "boolean", ixs_fun_komp = "string", typ_dgr = "string", c = "GIntervalDto<JsonDecimal>", c_plan = "GIntervalDto<JsonDecimal>", c_ps = "GIntervalDto<JsonDecimal>", c_sch = "GIntervalDto<JsonDecimal>", cj_dgr = "GIntervalDto<string>", ixs_fun_vl = "string", hist = "boolean", dat_pri = "GIntervalDto<JsonDate>", dat_zvz = "GIntervalDto<JsonDate>", rok_zal = "GIntervalDto<number>", fin = "GIntervalDto<number>", ixp = "string", cj_pis = "GIntervalDto<string>", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_prij_pod = "GIntervalDto<JsonDate>", ecis_prj = "string", int_cis_zad = "string", bhod_prj = "GIntervalDto<number>", cislo_usn = "string", projednal = "string", schvalil = "string", dat_jedn_pl = "GIntervalDto<JsonDate>", dat_jedn = "GIntervalDto<JsonDate>", c_poz = "GIntervalDto<JsonDecimal>", c_real = "GIntervalDto<JsonDecimal>", poznamka_dgr = "GBaseFilter<string>", poznamka_wfl = "GBaseFilter<string>", poznamka_pis = "GBaseFilter<string>", pozn_wfl_pis = "GBaseFilter<string>", elm = "Gordic.Pap.Interface.GPapCfuDto[]", doplnit = "boolean", bez_financovani = "boolean", bez_nasmlouvanosti = "boolean", bez_rezervaci = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]",}
	const enum GSeznamDokladuFilterStoredDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Filters\Gordic.Vfp.Interface.GVfpFiltrUchazeciDto.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Filtrovací dto pro uchazeče*/
	interface GVfpFiltrUchazeciDto {
		/**	název*/
		nazev_dgr?: GBaseFilter<string>|null;
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
		/**PO návrh*/
		s_dgr_00?: boolean|null;
		/**PO schválený*/
		s_dgr_10?: boolean|null;
		/**PO zahájený*/
		s_dgr_20?: boolean|null;
		/**PO ukončený*/
		s_dgr_50?: boolean|null;
		/**PO zrušený*/
		s_dgr_80?: boolean|null;
		/**PO storno*/
		s_dgr_90?: boolean|null;
		typ?: string|null;
		/**regi - Suma/detail*/
		sumarRegi?: boolean|null;
	}
	const enum GVfpFiltrUchazeciDtoNames { nazev_dgr = "nazev_dgr", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_zmena = "dat_zmena", typ_esu = "typ_esu", typ_org = "typ_org", ixs_fun_vl = "ixs_fun_vl", s_dgr_00 = "s_dgr_00", s_dgr_10 = "s_dgr_10", s_dgr_20 = "s_dgr_20", s_dgr_50 = "s_dgr_50", s_dgr_80 = "s_dgr_80", s_dgr_90 = "s_dgr_90", typ = "typ", sumarRegi = "sumarRegi",}
	const enum GVfpFiltrUchazeciDtoFragments { nazev_dgr = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_zmena = "*", typ_esu = "*", typ_org = "*", ixs_fun_vl = "*", s_dgr_00 = "*", s_dgr_10 = "*", s_dgr_20 = "*", s_dgr_50 = "*", s_dgr_80 = "*", s_dgr_90 = "*", typ = "*", sumarRegi = "*",}
	const enum GVfpFiltrUchazeciDtoTypes { nazev_dgr = "GBaseFilter<string>", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_zmena = "GIntervalDto<JsonDate>", typ_esu = "number", typ_org = "number", ixs_fun_vl = "string", s_dgr_00 = "boolean", s_dgr_10 = "boolean", s_dgr_20 = "boolean", s_dgr_50 = "boolean", s_dgr_80 = "boolean", s_dgr_90 = "boolean", typ = "string", sumarRegi = "boolean",}
	const enum GVfpFiltrUchazeciDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Filters\Gordic.Vfp.Interface.IGVfpFilters.d.ts 

declare namespace Gordic.Vfp.Interface {
	/**Filtry*/
	const enum FilVfpsesu {
		/**identifikátor*/
		ixs_pri,
		/**cis_por*/
		cis_por,
		/**ixs_esu*/
		ixs_esu,
		/**por_cis_nab*/
		por_cis_nab,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Gordic.Vfp.Interface.IGVfpAllDok.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty vfpspid
	* @domain Dotace
	*/
	interface VfpAllDok {
		/**seznam dokumentu*/
		list(rq?:Gordic.Vfp.Interface.GVfpFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.VfpspidDto>>;
		/**Počet záznamů*/
		count(rq?:Gordic.Vfp.Interface.GVfpFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		readPid(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Vfp.Interface.VfpspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpAllDok: ServiceBase & Catalog.VfpAllDok;
	}
	const VfpAllDok: Client["VfpAllDok"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Gordic.Vfp.Interface.IGVfpAllElDok.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty vfpspid
	* @domain Dotace
	*/
	interface VfpAllElDok {
		/**detail dokumentu*/
		list(rq?:Gordic.Vfp.Interface.GVfpFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.VfpspidDto>>;
		/**Počet záznamů*/
		count(rq?:Gordic.Vfp.Interface.GVfpFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpAllElDok: ServiceBase & Catalog.VfpAllElDok;
	}
	const VfpAllElDok: Client["VfpAllElDok"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Gordic.Vfp.Interface.IGVfpDTAllDok.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty DT
	* @domain Dotace
	*/
	interface VfpDTAllDok {
		/**detail dokumentu*/
		list(rq?:Gordic.Vfp.Interface.GVfpFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.VfpspidDto>>;
		/**počet dokladú daného případu*/
		count(rq?:Gordic.Vfp.Interface.GVfpFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**schválení písemnosti*/
		schvalitPis(rq?:CallParams<{list:string[]}>): _Task<{list:string[]},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpDTAllDok: ServiceBase & Catalog.VfpDTAllDok;
	}
	const VfpDTAllDok: Client["VfpDTAllDok"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Gordic.Vfp.Interface.IGVfpDTAllElDok.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny el. dokumenty DT
	* @domain Dotace
	*/
	interface VfpDTAllElDok {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.VfpspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpDTAllElDok: ServiceBase & Catalog.VfpDTAllElDok;
	}
	const VfpDTAllElDok: Client["VfpDTAllElDok"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Gordic.Vfp.Interface.IGVfpHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání "pidu".
	* @domain Dotace
	*/
	interface HledaniVfp {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniVfp: ServiceBase & Catalog.HledaniVfp;
	}
	const HledaniVfp: Client["HledaniVfp"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Detail\Detail\Gordic.Vfp.Interface.IGVfpDetailDT.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Detail
	* @domain Dotace
	*/
	interface VfpDetailDT {
		/**Kontrola dat pro iv_nTP1 = Gin.Konst.KTGTYP_nad_esu_hr - popis parametrů doplní PV*/
		algKontrola(rq?:CallParams<{hodnota1:JsonDecimal,hodnota2:JsonDecimal,priznak:string,rezim:number,ixs_pri:string,ixs_esu:string,hodnota3:JsonDecimal,anoDotaz:number}>): _Task<{hodnota1:JsonDecimal,hodnota2:JsonDecimal,priznak:string,rezim:number,ixs_pri:string,ixs_esu:string,hodnota3:JsonDecimal,anoDotaz:number},GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Uložení detailu*/
		update(rq?:Gordic.Vfp.Interface.GParamDetailDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GParamDetailDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GParamDetailDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GPodaniDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPodaniDto>>;
		/**vložení záznamů*/
		insertPole(rq?:Gordic.Pap.Interface.GPodaniPoleDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniPoleDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniPoleDto>,Gordic.Pap.Interface.GCommonReturnDto>;
		/**Naplnění parametrů pro formulář detailu*/
		naplnParam(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Vfp.Interface.GParamDetailDto>>;
		/**Kontrola dat detailu*/
		kontrolaDat(rq?:Gordic.Vfp.Interface.GParamDetailDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GParamDetailDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GParamDetailDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**detail vfpsesu pro ixs_esu_v*/
		readEsuV(rq?:CallParams<{ixs_pri:string,cis_por:number,por_cis_nab:number,typ_dgr:string}>): _Task<{ixs_pri:string,cis_por:number,por_cis_nab:number,typ_dgr:string},GServiceReadResponse<Gordic.Vfp.Interface.GVfpsesuDto>>;
		/**Kontrola na duplicitu ixs_esu*/
		kontrolaEsu(rq?:CallParams<{ixs_pri:string,ixs_esu:string,por_cis_nab:number,cis_por:number,ktg_typ:number,soutez:string}>): _Task<{ixs_pri:string,ixs_esu:string,por_cis_nab:number,cis_por:number,ktg_typ:number,soutez:string},GServiceReadResponse<Gordic.Pap.Interface.GEsuKontrolaDto>>;
		/**Hromadné operace*/
		hromadneUpdate(rq?:CallParams<{ixp:string,stav:number,kontrolaHO:number,paramIxsPri:string,akce:string}>): _Task<{ixp:string,stav:number,kontrolaHO:number,paramIxsPri:string,akce:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**Kontrola před stornem*/
		kontrolaPredStornem(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpDetailDT: ServiceBase & Catalog.VfpDetailDT;
	}
	const VfpDetailDT: Client["VfpDetailDT"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Detail\Lokality\Gordic.Vfp.Interface.IGLokality.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro lokality
	* @domain Dotace
	*/
	interface VfpLokality {
		/**seznam dokumentů pro předvyhodnocení*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.GLokalityDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Vfp.Interface.GLokalityDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GLokalityDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GLokalityDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Vložení nového záznamu*/
		insert(rq?:Gordic.Vfp.Interface.GLokalityDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GLokalityDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GLokalityDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpLokality: ServiceBase & Catalog.VfpLokality;
	}
	const VfpLokality: Client["VfpLokality"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Detail\Plneni\Gordic.Vfp.Interface.IGPlneni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro plnění
	* @domain Dotace
	*/
	interface VfpPlneni {
		/**seznam dokumentů pro předvyhodnocení*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Vfp.Interface.GParamPlneniDto>>;
		/**Oprava dat*/
		update(rq?:Gordic.Vfp.Interface.GVfpXesoDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GVfpXesoDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GVfpXesoDto>,GServiceReadResponse<Gordic.Vfp.Interface.GParamPlneniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpPlneni: ServiceBase & Catalog.VfpPlneni;
	}
	const VfpPlneni: Client["VfpPlneni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Detail\Predvyhodnoceni\Gordic.Vfp.Interface.IGPredvyhodnoceni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro předvyhodnocení
	* @domain Dotace
	*/
	interface VfpPredvyhodnoceni {
		/**seznam dokumentů pro předvyhodnocení*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.GVfpsesuDto>>;
		/**podání*/
		podani(rq?:Gordic.Vfp.Interface.GPredvyhodnoceniListDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GPredvyhodnoceniListDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GPredvyhodnoceniListDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpPredvyhodnoceni: ServiceBase & Catalog.VfpPredvyhodnoceni;
	}
	const VfpPredvyhodnoceni: Client["VfpPredvyhodnoceni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Detail\Prostredky\Gordic.Vfp.Interface.IGProstredky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro schv. prostředky
	* @domain Dotace
	*/
	interface VfpProstredky {
		/**seznam dokumentů pro protředky*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.GVfpapzaDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Vfp.Interface.GVfpapzaDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GVfpapzaDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GVfpapzaDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Vložení nového záznamu*/
		insert(rq?:Gordic.Vfp.Interface.GVfpapzaDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.GVfpapzaDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.GVfpapzaDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**zkontroluje rok u nově vkládaného záznamu*/
		kontrolaRoku(rq?:CallParams<{ixs_pri:string,por_cis_nab:number,rok:number}>): _Task<{ixs_pri:string,por_cis_nab:number,rok:number},GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpProstredky: ServiceBase & Catalog.VfpProstredky;
	}
	const VfpProstredky: Client["VfpProstredky"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\DotacniTitul\Gordic.Vfp.Interface.IGVfpDotacniTitul.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Dokument vfpspri
	* @domain Dotace
	*/
	interface VfpDotacniTitul {
		/**detail dokumentu*/
		read(rq?:Gordic.Vfp.Interface.VfpspriDto|CallParams<GServiceReadRequest<Gordic.Vfp.Interface.VfpspriDto>>): _Task<GServiceReadRequest<Gordic.Vfp.Interface.VfpspriDto>,GServiceReadResponse<Gordic.Vfp.Interface.VfpspriDto>>;
		/**seznam dokumentů*/
		list(rq?:Gordic.Vfp.Interface.GVfpFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.VfpspriDto>>;
		/**Data pro Kpi*/
		nactiKpiData(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},JsonDecimal[]>;
		/**Počet záznamů*/
		count(rq?:Gordic.Vfp.Interface.GVfpFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpDotacniTitul: ServiceBase & Catalog.VfpDotacniTitul;
	}
	const VfpDotacniTitul: Client["VfpDotacniTitul"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\HromadneOperace\Gordic.Vfp.Interface.IGVfpHromadneOperace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hromadné operace Vfp
	*     ///
	* @domain Dotace
	*/
	interface VfpHromadneOperace {
		/**Kontrola dat před spuštěním HO*/
		kontrolaHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string}>): _Task<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		provedeniHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string}>): _Task<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpHromadneOperace: ServiceBase & Catalog.VfpHromadneOperace;
	}
	const VfpHromadneOperace: Client["VfpHromadneOperace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Uchazeci\Gordic.Vfp.Interface.IGVfpUchazeci.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro uchazeče
	* @domain Dotace
	*/
	interface VfpUchazeci {
		/**doplnění dat*/
		doplnOkrSml(rq?:CallParams<{list:Gordic.Vfp.Interface.GUchazeciDto[]}>): _Task<{list:Gordic.Vfp.Interface.GUchazeciDto[]},GServiceListResponse<Gordic.Vfp.Interface.GUchazeciDto>>;
		/**detail dokumentu*/
		list(rq?:Gordic.Vfp.Interface.GVfpFiltrUchazeciDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.GUchazeciDto>>;
		/**Počet záznamů*/
		count(rq?:Gordic.Vfp.Interface.GVfpFiltrUchazeciDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Provedení HO*/
		provedeniHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Vfp.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto}>): _Task<{rq:GServiceReadRequest<Gordic.Vfp.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Kontrola HO*/
		kontrolaHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Vfp.Interface.GUchazeciDto>,akce:string,ktg_typ:number}>): _Task<{rq:GServiceReadRequest<Gordic.Vfp.Interface.GUchazeciDto>,akce:string,ktg_typ:number},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		nastavEss(rq?:CallParams<{ktg_typ:number}>): _Task<{ktg_typ:number},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpUchazeci: ServiceBase & Catalog.VfpUchazeci;
	}
	const VfpUchazeci: Client["VfpUchazeci"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\VS\Gordic.Vfp.Interface.IGVfpVS.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro údržbu VS
	* @domain Dotace
	*/
	interface VfpVSService {
		/**Generování VS*/
		generuj(rq?:Gordic.Vfp.Interface.VfpspriDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.VfpspriDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.VfpspriDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Uložení detailu*/
		update(rq?:Gordic.Vfp.Interface.VfpspriDto|CallParams<GServiceSaveRequest<Gordic.Vfp.Interface.VfpspriDto>>): _Task<GServiceSaveRequest<Gordic.Vfp.Interface.VfpspriDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpVSService: ServiceBase & Catalog.VfpVSService;
	}
	const VfpVSService: Client["VfpVSService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Vfp.Interface\Service\Zadosti\Gordic.Vfp.Interface.IGZadosti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Žádosti DT
	* @domain Dotace
	*/
	interface VfpZadosti {
		/**detail dokumentů*/
		read(rq?:Gordic.Vfp.Interface.GVfpsesuDto|CallParams<GServiceReadRequest<Gordic.Vfp.Interface.GVfpsesuDto>>): _Task<GServiceReadRequest<Gordic.Vfp.Interface.GVfpsesuDto>,GServiceReadResponse<Gordic.Vfp.Interface.GVfpsesuDto>>;
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Vfp.Interface.GVfpsesuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VfpZadosti: ServiceBase & Catalog.VfpZadosti;
	}
	const VfpZadosti: Client["VfpZadosti"];
}

//#endregion

