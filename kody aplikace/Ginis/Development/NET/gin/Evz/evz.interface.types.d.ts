/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       evz.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Evz.Interface\Gordic.Evz.Interface.csproj
*    created     2026-02-16 14:34:21
*    files       Dto\Gordic.Evz.Interface.DetailEvz.Dto.d.ts
*                Dto\Gordic.Evz.Interface.EvzspidDto.d.ts
*                Dto\Gordic.Evz.Interface.EvzspriDto.d.ts
*                Dto\Gordic.Evz.Interface.EvzvdofDto.d.ts
*                Dto\Gordic.Evz.Interface.GDetailEnableDto.d.ts
*                Dto\Gordic.Evz.Interface.GDetailLabelsDto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzcvriDto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzDokRestrikce.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzFrs.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzRestrikce.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzsesu.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzvkdnDto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzvkprDto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzvoks.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GEvzvvzc.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GGenerujCastiDto.d.ts
*                Dto\Gordic.Evz.Interface.GParamDetailDto.d.ts
*                Dto\Gordic.Evz.Interface.GParamsDetailDto.d.ts
*                Dto\Gordic.Evz.Interface.GPkrskmd.d.ts
*                Dto\Gordic.Evz.Interface.GSelEsu.Dto.d.ts
*                Dto\Gordic.Evz.Interface.GUchazeciDto.d.ts
*                Dto\Gordic.Evz.Interface.GVepsevzDto.d.ts
*                Dto\Gordic.Evz.Interface.GVyberKtgTypNovaVzDto.d.ts
*                Dto\Gordic.Evz.Interface.SeznamDokumentuEvzDto.d.ts
*                Dto\Gordic.Evz.Interface.SeznamEvzDto.d.ts
*                Dto\Const\Gordic.Evz.Interface.GCastiVZConstDto.d.ts
*                Dto\Const\Gordic.Evz.Interface.GDoporuceniConstDto.d.ts
*                Dto\Const\Gordic.Evz.Interface.GKategorieConstDto - Copy.d.ts
*                Dto\Const\Gordic.Evz.Interface.GKategorieConstDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcdzdDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcevsDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcjisDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzckriDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzclimDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcpruDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcregDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcspeDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcssoDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcstaDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcsvrDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcsvzDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzctksDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcuksDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzczozDto.d.ts
*                EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzczpoDto.d.ts
*                Filters\Gordic.Evz.Interface.GEvzFiltrDokDto.d.ts
*                Filters\Gordic.Evz.Interface.GEvzFiltrDto.d.ts
*                Filters\Gordic.Evz.Interface.GEvzFiltrUchazeciDto.d.ts
*                Filters\Gordic.Evz.Interface.GEvzFiltrVecnyProfil.d.ts
*                Filters\Gordic.Evz.Interface.IGEvzFilters.d.ts
*                Service\Gordic.Evz.Interface.EvzspidAllDokService.d.ts
*                Service\Gordic.Evz.Interface.EvzspidAllDokVZService.d.ts
*                Service\Gordic.Evz.Interface.EvzspidAllElDokService.d.ts
*                Service\Gordic.Evz.Interface.EvzspidAllElDokVZService.d.ts
*                Service\Gordic.Evz.Interface.IGHledani.d.ts
*                Service\Detail\CastiVZ\Gordic.Evz.Interface.IGCastiVZ.d.ts
*                Service\Detail\Detail\Gordic.Evz.Interface.IGDetailVZ.d.ts
*                Service\Detail\DetailVZ\Gordic.Evz.Interface.IGDetailVZ.d.ts
*                Service\Detail\Doporuceni\Gordic.Evz.Interface.IGCastiVZ.d.ts
*                Service\Detail\Kategorie\Gordic.Evz.Interface.IGEvzAddUpdKategorie.d.ts
*                Service\Detail\Kategorie\Gordic.Evz.Interface.IGKategorie.d.ts
*                Service\Detail\Komise\Gordic.Evz.Interface.IGEvzAddUpdKomise.d.ts
*                Service\Detail\Komise\Gordic.Evz.Interface.IGKategorie.d.ts
*                Service\Detail\KomoditniPlneni\Gordic.Evz.Interface.IGEvzKomPln.d.ts
*                Service\Detail\KomoditniPlneni\Gordic.Evz.Interface.IGKomodita.d.ts
*                Service\Detail\VecnyProfil\Gordic.Evz.Interface.IGVepsevz.d.ts
*                Service\HromadneOperace\Gordic.Evz.Interface.IGEvzHromadneOperace.d.ts
*                Service\Souteze\Gordic.Evz.Interface.IGEvzSouteze.d.ts
*                Service\Uchazeci\Gordic.Evz.Interface.IGUchazeci.d.ts
*                Service\VerejnaZakazka\Gordic.Evz.Interface.EvzspriService.d.ts
*                Service\VerejnaZakazka\SouvisejiciVZ\Gordic.Evz.Interface.IGVerejnaZakazkaSouvisejiciVZ.d.ts
*                Service\VerejnaZakazka\SouvisejiciZakazky\Gordic.Evz.Interface.IGVerejnaZakazkaSouvisejiciZakazky.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.DetailEvz.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:Detail*/
	interface DetailEvzDto {
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
		/**DBCOLUMN:Detail.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Detail.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Detail.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:Detail.s_vz_txt*/
		s_vz_txt?: string|null;
		/**DBCOLUMN:Detail.s_zv*/
		s_zv?: number|null;
		/**DBCOLUMN:Detail.soutez*/
		soutez?: string|null;
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
		/**DBCOLUMN:Detail.dat_zvz*/
		dat_zvz?: JsonDate|null;
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
		/**DBCOLUMN:Detail.regi_list*/
		regi_list?: number|null;
		/**DBCOLUMN:Detail.stan_jak*/
		stan_jak?: number|null;
		/**DBCOLUMN:Detail.stan_svr*/
		stan_svr?: number|null;
		/**DBCOLUMN:Detail.schv_spec*/
		schv_spec?: number|null;
		/**DBCOLUMN:Detail.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Detail.cj_vz*/
		cj_vz?: string|null;
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
		/**DBCOLUMN:Detail.ixp_den*/
		ixp_den_txt?: string|null;
		/**DBCOLUMN:Detail.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Detail.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:Detail.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Detail.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Detail.typ_fin*/
		kat_pru?: number|null;
		/**DBCOLUMN:Detail.cis_zakon*/
		cis_zakon?: number|null;
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
		/**DBCOLUMN:Detail.dat_pred_ozn*/
		dat_pred_ozn?: JsonDate|null;
		/**DBCOLUMN:Detail.priz_pred_ozn*/
		priz_pred_ozn?: number|null;
		/**DBCOLUMN:Detail.priz_zad*/
		priz_zad?: number|null;
		/**DBCOLUMN:Detail.zast_zad*/
		zast_zad?: string|null;
		/**DBCOLUMN:Detail.poc_vyz*/
		poc_vyz?: number|null;
		/**DBCOLUMN:Detail.vys_riz*/
		vys_riz?: number|null;
		/**DBCOLUMN:Detail.dru_riz*/
		dru_riz?: number|null;
		/**DBCOLUMN:Detail.ixs_aza*/
		ixs_aza?: string|null;
		/**DBCOLUMN:Detail.por_cis_aza*/
		por_cis_aza?: number|null;
		/**DBCOLUMN:Detail.priz_bloupd*/
		priz_bloupd?: number|null;
		/**DBCOLUMN:Detail.priz_rel_rlz*/
		priz_rel_rlz?: number|null;
		/**DBCOLUMN:Detail.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:Detail.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_plan_bez*/
		c_plan_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_sch_bez*/
		c_sch_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_uhr_bez*/
		c_uhr_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_nav_bez*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.ixs_pri_nad*/
		ixs_pri_nad?: string|null;
		/**DBCOLUMN:Detail.priz_bfin*/
		priz_bfin?: number|null;
		/**DBCOLUMN:Detail.priz_revo*/
		priz_revo?: number|null;
		/**DBCOLUMN:Detail.priz_kort*/
		priz_kort?: number|null;
		/**DBCOLUMN:Detail.priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**DBCOLUMN:Detail.priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**DBCOLUMN:Detail.priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**DBCOLUMN:Detail.priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**DBCOLUMN:Detail.vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**DBCOLUMN:Detail.vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**DBCOLUMN:Detail.vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**DBCOLUMN:Detail.vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**DBCOLUMN:Detail.priz_rs_nad*/
		priz_rs_nad?: number|null;
		/**DBCOLUMN:Detail.priz_rs_dil*/
		priz_rs_dil?: number|null;
		/**DBCOLUMN:Detail.priz_relcas_m*/
		priz_relcas_m?: number|null;
		/**DBCOLUMN:Detail.priz_relcas_c*/
		priz_relcas_c?: number|null;
		/**Detail.ixs_esu*/
		ixs_esu?: string|null;
		/**Detail.ixs_esu_opr*/
		ixs_esu_opr?: string|null;
		/**priz_sip*/
		priz_sip?: number|null;
		/**stav_txt*/
		stav_txt?: string|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**sout_upr_riz*/
		sout_upr_riz?: number|null;
		/**sout_upr_riz*/
		sout_txt_riz?: string|null;
	}
	const enum DetailEvzDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac_ver_zak = "ac_ver_zak", nazev = "nazev", s_vz = "s_vz", s_vz_txt = "s_vz_txt", s_zv = "s_zv", soutez = "soutez", cis_por = "cis_por", s_sou = "s_sou", rezim_pri = "rezim_pri", c = "c", dat_pri = "dat_pri", dat_zvz = "dat_zvz", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", regi_list = "regi_list", stan_jak = "stan_jak", stan_svr = "stan_svr", schv_spec = "schv_spec", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp = "ixp", cj_vz = "cj_vz", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", ac_ag = "ac_ag", priz_prip = "priz_prip", priz_view = "priz_view", typ_fin = "typ_fin", kat_pru = "kat_pru", cis_zakon = "cis_zakon", pred_urc = "pred_urc", lim_zac = "lim_zac", mena = "mena", c_mena = "c_mena", priz_cast = "priz_cast", dat_sch = "dat_sch", dat_pred_ozn = "dat_pred_ozn", priz_pred_ozn = "priz_pred_ozn", priz_zad = "priz_zad", zast_zad = "zast_zad", poc_vyz = "poc_vyz", vys_riz = "vys_riz", dru_riz = "dru_riz", ixs_aza = "ixs_aza", por_cis_aza = "por_cis_aza", priz_bloupd = "priz_bloupd", priz_rel_rlz = "priz_rel_rlz", dan_typ = "dan_typ", dan_proc = "dan_proc", c_plan_bez = "c_plan_bez", c_sch_bez = "c_sch_bez", c_uhr = "c_uhr", c_uhr_bez = "c_uhr_bez", c_nav_bez = "c_nav_bez", ixs_pri_nad = "ixs_pri_nad", priz_bfin = "priz_bfin", priz_revo = "priz_revo", priz_kort = "priz_kort", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", priz_zve_inen = "priz_zve_inen", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_inen = "vz_cislo_inen", priz_rs_nad = "priz_rs_nad", priz_rs_dil = "priz_rs_dil", priz_relcas_m = "priz_relcas_m", priz_relcas_c = "priz_relcas_c", ixs_esu = "ixs_esu", ixs_esu_opr = "ixs_esu_opr", priz_sip = "priz_sip", stav_txt = "stav_txt", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", sout_upr_riz = "sout_upr_riz", sout_txt_riz = "sout_txt_riz",}
	const enum DetailEvzDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", ac_ver_zak = "*", nazev = "*", s_vz = "*", s_vz_txt = "*", s_zv = "*", soutez = "*", cis_por = "*", s_sou = "*", rezim_pri = "*", c = "*", dat_pri = "*", dat_zvz = "*", dat_zad_p = "*", dat_zad_s = "*", dat_sml_p = "*", dat_sml_s = "*", dat_kos_p = "*", dat_kos_s = "*", dat_real_p = "*", dat_real_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", regi_list = "*", stan_jak = "*", stan_svr = "*", schv_spec = "*", dat_zmena = "*", zmenu_prov = "*", ixp = "*", cj_vz = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ixp_den_txt = "*", ac_ag = "*", priz_prip = "*", priz_view = "*", typ_fin = "*", kat_pru = "*", cis_zakon = "*", pred_urc = "*", lim_zac = "*", mena = "*", c_mena = "*", priz_cast = "*", dat_sch = "*", dat_pred_ozn = "*", priz_pred_ozn = "*", priz_zad = "*", zast_zad = "*", poc_vyz = "*", vys_riz = "*", dru_riz = "*", ixs_aza = "*", por_cis_aza = "*", priz_bloupd = "*", priz_rel_rlz = "*", dan_typ = "*", dan_proc = "*", c_plan_bez = "*", c_sch_bez = "*", c_uhr = "*", c_uhr_bez = "*", c_nav_bez = "*", ixs_pri_nad = "*", priz_bfin = "*", priz_revo = "*", priz_kort = "*", priz_zve_vevz = "*", priz_zve_prof = "*", priz_zve_etrz = "*", priz_zve_inen = "*", vz_cislo_vevz = "*", vz_cislo_prof = "*", vz_cislo_etrz = "*", vz_cislo_inen = "*", priz_rs_nad = "*", priz_rs_dil = "*", priz_relcas_m = "*", priz_relcas_c = "*", ixs_esu = "*", ixs_esu_opr = "*", priz_sip = "*", stav_txt = "*", ixs_typ = "*", ixs_typ_txt = "*", sout_upr_riz = "*", sout_txt_riz = "*",}
	const enum DetailEvzDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac_ver_zak = "string", nazev = "string", s_vz = "number", s_vz_txt = "string", s_zv = "number", soutez = "string", cis_por = "number", s_sou = "number", rezim_pri = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zvz = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", regi_list = "number", stan_jak = "number", stan_svr = "number", schv_spec = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp = "string", cj_vz = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ixp_den_txt = "string", ac_ag = "string", priz_prip = "number", priz_view = "number", typ_fin = "number", kat_pru = "number", cis_zakon = "number", pred_urc = "number", lim_zac = "number", mena = "number", c_mena = "JsonDecimal", priz_cast = "number", dat_sch = "JsonDate", dat_pred_ozn = "JsonDate", priz_pred_ozn = "number", priz_zad = "number", zast_zad = "string", poc_vyz = "number", vys_riz = "number", dru_riz = "number", ixs_aza = "string", por_cis_aza = "number", priz_bloupd = "number", priz_rel_rlz = "number", dan_typ = "number", dan_proc = "JsonDecimal", c_plan_bez = "JsonDecimal", c_sch_bez = "JsonDecimal", c_uhr = "JsonDecimal", c_uhr_bez = "JsonDecimal", c_nav_bez = "JsonDecimal", ixs_pri_nad = "string", priz_bfin = "number", priz_revo = "number", priz_kort = "number", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", priz_zve_inen = "number", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", vz_cislo_inen = "string", priz_rs_nad = "number", priz_rs_dil = "number", priz_relcas_m = "number", priz_relcas_c = "number", ixs_esu = "string", ixs_esu_opr = "string", priz_sip = "number", stav_txt = "string", ixs_typ = "string", ixs_typ_txt = "string", sout_upr_riz = "number", sout_txt_riz = "string",}
	const enum DetailEvzDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac_ver_zak = 30, nazev = 100, soutez = 30, zmenu_prov = 12, ixp = 12, cj_vz = 30, poznamka = 254, ixp_den = 12, ac_ag = 20, zast_zad = 150, ixs_aza = 12, ixs_pri_nad = 12, vz_cislo_vevz = 30, vz_cislo_prof = 30, vz_cislo_etrz = 30, vz_cislo_inen = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.EvzspidDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzspid*/
	interface EvzspidDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**Zda jde větví evidence dokladu*/
		evidence_dokladu?: boolean|null;
		/**vlastník - identifikátor*/
		vlastnikIdent?: string|null;
		/**DBCOLUMN:Seznam.priz_nabedo*/
		priz_nabedo?: number|null;
		/**vlastnik*/
		vlastnik?: boolean|null;
		/**vlastnik*/
		vlastnik_nazev?: string|null;
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
		/**count*/
		count?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_ob_v*/
		cis_ob_v?: string|null;
		/**DBCOLUMN:Seznam.centr_adr*/
		centr_adr?: string|null;
		/**DBCOLUMN:Seznam.dat_s_lhu*/
		dat_s_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_z_lhu*/
		dat_z_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**bu_vl_txt*/
		bu_vl_txt?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.ks*/
		ks?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.ss*/
		ss?: string|null;
		/**DBCOLUMN:Seznam.c_jistina*/
		c_jistina?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.prijal*/
		prijal?: string|null;
		/**DBCOLUMN:Seznam.evz_stav*/
		evz_stav?: number|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:Seznam.ukon_txt*/
		ukon_txt?: string|null;
		uzo?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_zve_txt*/
		cis_zve_txt?: string|null;
		/**DBCOLUMN:Seznam.regi_list_txt*/
		regi_list_txt?: string|null;
		/**DBCOLUMN:Seznam.stan_jak_txt*/
		stan_jak_txt?: string|null;
		/**DBCOLUMN:Seznam.stan_svr_txt*/
		stan_svr_txt?: string|null;
		/**DBCOLUMN:Seznam.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:Seznam.esu_naz*/
		esu_naz?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.evz_stav_txt*/
		evz_stav_txt?: string|null;
		/**stav_ixp*/
		stav_ixp?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		je_fin?: string|null;
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
		/**nazev_rf pro wflspid.ixs_fun_akt*/
		fun_naz?: string|null;
		/**nazev_rf pro wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**wflsepx.typ_elp*/
		priznak?: number|null;
		/**wflctel.typ_elp_txt*/
		priznak_txt?: string|null;
		/**wflsepx.s_sgn*/
		s_sgn_epx?: number|null;
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
		/**wflsepx.s_sgn*/
		priz_elp?: number|null;
		/**wflsixb.typ_soub*/
		typ_soub?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_evzspac*/
		ixp_den_evzspac?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:evzspid.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:evzspid.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:evzspid.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:evzspid.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:evzspid.regi_list*/
		regi_list?: number|null;
		/**DBCOLUMN:evzspid.stan_jak*/
		stan_jak?: number|null;
		/**DBCOLUMN:evzspid.stan_svr*/
		stan_svr?: number|null;
		/**DBCOLUMN:evzspid.schv_spec*/
		schv_spec?: number|null;
		/**DBCOLUMN:evzspid.ixp_pre*/
		ixp_pre?: string|null;
		/**DBCOLUMN:evzspid.s_jis*/
		s_jis?: number|null;
		/**DBCOLUMN:evzspid.dat_jis*/
		dat_jis?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_zvz*/
		dat_zvz?: JsonDate|null;
		/**DBCOLUMN:Detail.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:evzspid.cj_vz*/
		cj_vz?: string|null;
		/**DBCOLUMN:evzspid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:evzspid.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:evzspid.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:evzspid.ixs_esu_opr*/
		ixs_esu_opr?: string|null;
		/**DBCOLUMN:evzspid.c_elvz_min_nab*/
		c_elvz_min_nab?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_elvz_max_nab*/
		c_elvz_max_nab?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.mj_elvz*/
		mj_elvz?: string|null;
		/**DBCOLUMN:evzspid.m_elvz*/
		m_elvz?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.elvz_txt1*/
		elvz_txt1?: string|null;
		/**DBCOLUMN:evzspid.elvz_txt2*/
		elvz_txt2?: string|null;
		/**DBCOLUMN:evzspid.elvz_txt3*/
		elvz_txt3?: string|null;
		/**DBCOLUMN:evzspid.elvz_txt4*/
		elvz_txt4?: string|null;
		/**DBCOLUMN:evzspid.elvz_zastupujici*/
		elvz_zastupujici?: string|null;
		/**DBCOLUMN:evzspid.elvz_oduvodneni*/
		elvz_oduvodneni?: string|null;
		/**DBCOLUMN:evzspid.c_elvz_vyb_nab*/
		c_elvz_vyb_nab?: JsonDecimal|null;
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
		/**DBCOLUMN:evzspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:evzspid.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:evzspid.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:evzspid.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:evzspid.cis_zakon*/
		cis_zakon?: number|null;
		/**DBCOLUMN:evzspid.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:evzspid.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:evzspid.odu_zz*/
		odu_zz?: number|null;
		/**DBCOLUMN:evzspid.cis_dus*/
		cis_dus?: number|null;
		/**DBCOLUMN:evzspid.cis_kri*/
		cis_kri?: number|null;
		/**DBCOLUMN:evzspid.ac_ag_souv*/
		ac_ag_souv?: string|null;
		/**DBCOLUMN:evzspid.ixs_pri_souv*/
		ixs_pri_souv?: string|null;
		/**DBCOLUMN:evzspid.mena*/
		mena?: number|null;
		/**DBCOLUMN:evzspid.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.typ_kurz*/
		typ_kurz?: number|null;
		/**bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:evzspid.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:evzspid.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:evzspid.c_nav*/
		c_nav?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_nav_hist*/
		c_nav_hist?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.odu_krk*/
		odu_krk?: string|null;
		/**DBCOLUMN:evzspid.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:evzspid.dat_pred_ozn*/
		dat_pred_ozn?: JsonDate|null;
		/**DBCOLUMN:evzspid.priz_pred_ozn*/
		priz_pred_ozn?: number|null;
		/**DBCOLUMN:evzspid.dat_trm_pln_pl*/
		dat_trm_pln_pl?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_lhu_pod*/
		dat_lhu_pod?: JsonDate|null;
		/**DBCOLUMN:evzspid.misto_pod*/
		misto_pod?: string|null;
		/**DBCOLUMN:evzspid.zpu_pod*/
		zpu_pod?: number|null;
		/**DBCOLUMN:evzspid.dis_zad*/
		dis_zad?: number|null;
		/**DBCOLUMN:evzspid.c_dis_zad*/
		c_dis_zad?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.vs_dzd*/
		vs_dzd?: string|null;
		/**DBCOLUMN:evzspid.ss_dzd*/
		ss_dzd?: string|null;
		/**DBCOLUMN:evzspid.ozn_veu*/
		ozn_veu?: string|null;
		/**DBCOLUMN:evzspid.dat_veu*/
		dat_veu?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_vyhl*/
		dat_vyhl?: JsonDate|null;
		/**DBCOLUMN:evzspid.priz_zad*/
		priz_zad?: number|null;
		/**DBCOLUMN:evzspid.zast_zad*/
		zast_zad?: string|null;
		/**DBCOLUMN:evzspid.poc_vyz*/
		poc_vyz?: number|null;
		/**DBCOLUMN:evzspid.vys_riz*/
		vys_riz?: number|null;
		/**DBCOLUMN:evzspid.dru_riz*/
		dru_riz?: number|null;
		/**DBCOLUMN:evzspid.ixs_aza*/
		ixs_aza?: string|null;
		/**DBCOLUMN:evzspid.por_cis_aza*/
		por_cis_aza?: number|null;
		/**DBCOLUMN:evzspid.priz_bloupd*/
		priz_bloupd?: number|null;
		/**DBCOLUMN:evzspid.priz_rel_rlz*/
		priz_rel_rlz?: number|null;
		/**DBCOLUMN:evzspid.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:evzspid.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_plan_bez*/
		c_plan_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_sch_bez*/
		c_sch_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_uhr_bez*/
		c_uhr_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.c_nav_bez*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspid.ixs_pri_nad*/
		ixs_pri_nad?: string|null;
		/**DBCOLUMN:evzspid.ixs_pri_nad*/
		ac_ag_pri_nad?: string|null;
		/**DBCOLUMN:evzspid.priz_bfin*/
		priz_bfin?: number|null;
		/**DBCOLUMN:evzspid.priz_revo*/
		priz_revo?: number|null;
		/**DBCOLUMN:evzspid.priz_kort*/
		priz_kort?: number|null;
		/**DBCOLUMN:evzspid.dat_zad_p_n*/
		dat_zad_p_n?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_sml_p_n*/
		dat_sml_p_n?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_kos_p_n*/
		dat_kos_p_n?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_real_p_n*/
		dat_real_p_n?: JsonDate|null;
		/**DBCOLUMN:evzspid.dat_uza_p_n*/
		dat_uza_p_n?: JsonDate|null;
		/**DBCOLUMN:evzspid.priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**DBCOLUMN:evzspid.priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**DBCOLUMN:evzspid.priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**DBCOLUMN:evzspid.priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**DBCOLUMN:evzspid.vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**DBCOLUMN:evzspid.vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**DBCOLUMN:evzspid.vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**DBCOLUMN:evzspid.vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**DBCOLUMN:evzspid.priz_rs_nad*/
		priz_rs_nad?: number|null;
		/**DBCOLUMN:evzspid.priz_rs_dil*/
		priz_rs_dil?: number|null;
		/**DBCOLUMN:evzspid.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:evzspid.priz_relcas_m*/
		priz_relcas_m?: number|null;
		/**DBCOLUMN:evzspid.priz_relcas_c*/
		priz_relcas_c?: number|null;
		/**DBCOLUMN:evzspri.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:evzspri.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:evzspri.s_vz_txt*/
		s_vz_txt?: string|null;
		/**DBCOLUMN:evzspid.kat_pru*/
		kat_pru?: number|null;
		/**DBCOLUMN:číslo položky*/
		cislo?: string|null;
		/**DBCOLUMN:ixs_cia položky*/
		ixs_cia?: string|null;
		/**DBCOLUMN:rokMes*/
		rokMes?: string|null;
		/**DBCOLUMN:rokMes*/
		rokMesCdap?: string|null;
		/**kom_pcl*/
		kom_pcl?: number|null;
		/**kom_ppr*/
		kom_ppr?: number|null;
		/**kom_spr*/
		kom_spr?: string|null;
		/**kom_smp*/
		kom_smp?: string|null;
		/**id_tks*/
		id_tks?: number|null;
		/**sout_upr_riz*/
		sout_upr_riz?: number|null;
		/**sout_upr_riz*/
		sout_txt_riz?: string|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
	}
	const enum EvzspidDtoNames { vlastnosti = "vlastnosti", ixp = "ixp", evidence_dokladu = "evidence_dokladu", vlastnikIdent = "vlastnikIdent", priz_nabedo = "priz_nabedo", vlastnik = "vlastnik", vlastnik_nazev = "vlastnik_nazev", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", dat_prij_pod = "dat_prij_pod", ktg_typ = "ktg_typ", count = "count", ixs_typ = "ixs_typ", popis = "popis", dat_pis = "dat_pis", ixs_pri = "ixs_pri", ac_ver_zak = "ac_ver_zak", nazev = "nazev", soutez = "soutez", soutez_txt = "soutez_txt", cis_por = "cis_por", c = "c", ixs_krk = "ixs_krk", ukon = "ukon", dat_zad_p = "dat_zad_p", dat_sml_p = "dat_sml_p", dat_kos_p = "dat_kos_p", dat_real_p = "dat_real_p", dat_uza_p = "dat_uza_p", dat_zad_s = "dat_zad_s", dat_sml_s = "dat_sml_s", dat_kos_s = "dat_kos_s", dat_real_s = "dat_real_s", dat_uza_s = "dat_uza_s", cis_ob_v = "cis_ob_v", centr_adr = "centr_adr", dat_s_lhu = "dat_s_lhu", dat_z_lhu = "dat_z_lhu", dat_p_lhu = "dat_p_lhu", bu_vl = "bu_vl", bu_vl_txt = "bu_vl_txt", sk_vl = "sk_vl", ks = "ks", vs = "vs", ss = "ss", c_jistina = "c_jistina", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", por_cis_nab = "por_cis_nab", prijal = "prijal", evz_stav = "evz_stav", ac_ag = "ac_ag", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den = "ixp_den", zda_sml = "zda_sml", ukon_txt = "ukon_txt", uzo = "uzo", rezim_pri_txt = "rezim_pri_txt", pri_pri_txt = "pri_pri_txt", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", cis_zve_txt = "cis_zve_txt", regi_list_txt = "regi_list_txt", stan_jak_txt = "stan_jak_txt", stan_svr_txt = "stan_svr_txt", schv_spec_txt = "schv_spec_txt", esu_naz = "esu_naz", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", ixs_typ_txt = "ixs_typ_txt", evz_stav_txt = "evz_stav_txt", stav_ixp = "stav_ixp", je_fin = "je_fin", po_filuta = "po_filuta", ident_zpo = "ident_zpo", jmeno = "jmeno", prijmeni = "prijmeni", kont_osoba = "kont_osoba", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", s_ess = "s_ess", s_ess_txt = "s_ess_txt", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", ktg_dms = "ktg_dms", fun_naz = "fun_naz", ixs_fun_akt = "ixs_fun_akt", priznak = "priznak", priznak_txt = "priznak_txt", s_sgn_epx = "s_sgn_epx", soubor = "soubor", popis_wflsixb = "popis_wflsixb", velikost = "velikost", ixb = "ixb", dz_file = "dz_file", priz_elp = "priz_elp", typ_soub = "typ_soub", ixp_den_evzspac = "ixp_den_evzspac", ixp_den_nazev = "ixp_den_nazev", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", regi_list = "regi_list", stan_jak = "stan_jak", stan_svr = "stan_svr", schv_spec = "schv_spec", ixp_pre = "ixp_pre", s_jis = "s_jis", dat_jis = "dat_jis", dat_zvz = "dat_zvz", s_sou = "s_sou", cj_vz = "cj_vz", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixs_esu_opr = "ixs_esu_opr", c_elvz_min_nab = "c_elvz_min_nab", c_elvz_max_nab = "c_elvz_max_nab", mj_elvz = "mj_elvz", m_elvz = "m_elvz", elvz_txt1 = "elvz_txt1", elvz_txt2 = "elvz_txt2", elvz_txt3 = "elvz_txt3", elvz_txt4 = "elvz_txt4", elvz_zastupujici = "elvz_zastupujici", elvz_oduvodneni = "elvz_oduvodneni", c_elvz_vyb_nab = "c_elvz_vyb_nab", elvz_telefon = "elvz_telefon", elvz_nazev = "elvz_nazev", elvz_adresa = "elvz_adresa", elvz_subjekt = "elvz_subjekt", elvz_subjekt_sidlo = "elvz_subjekt_sidlo", priz_view = "priz_view", typ_fin = "typ_fin", lic_zast = "lic_zast", por_zast = "por_zast", cis_zakon = "cis_zakon", pred_urc = "pred_urc", lim_zac = "lim_zac", odu_zz = "odu_zz", cis_dus = "cis_dus", cis_kri = "cis_kri", ac_ag_souv = "ac_ag_souv", ixs_pri_souv = "ixs_pri_souv", mena = "mena", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", c_nav = "c_nav", c_nav_hist = "c_nav_hist", odu_krk = "odu_krk", priz_cast = "priz_cast", dat_pred_ozn = "dat_pred_ozn", priz_pred_ozn = "priz_pred_ozn", dat_trm_pln_pl = "dat_trm_pln_pl", dat_lhu_pod = "dat_lhu_pod", misto_pod = "misto_pod", zpu_pod = "zpu_pod", dis_zad = "dis_zad", c_dis_zad = "c_dis_zad", vs_dzd = "vs_dzd", ss_dzd = "ss_dzd", ozn_veu = "ozn_veu", dat_veu = "dat_veu", dat_vyhl = "dat_vyhl", priz_zad = "priz_zad", zast_zad = "zast_zad", poc_vyz = "poc_vyz", vys_riz = "vys_riz", dru_riz = "dru_riz", ixs_aza = "ixs_aza", por_cis_aza = "por_cis_aza", priz_bloupd = "priz_bloupd", priz_rel_rlz = "priz_rel_rlz", dan_typ = "dan_typ", dan_proc = "dan_proc", c_plan_bez = "c_plan_bez", c_sch_bez = "c_sch_bez", c_uhr = "c_uhr", c_uhr_bez = "c_uhr_bez", c_nav_bez = "c_nav_bez", ixs_pri_nad = "ixs_pri_nad", ac_ag_pri_nad = "ac_ag_pri_nad", priz_bfin = "priz_bfin", priz_revo = "priz_revo", priz_kort = "priz_kort", dat_zad_p_n = "dat_zad_p_n", dat_sml_p_n = "dat_sml_p_n", dat_kos_p_n = "dat_kos_p_n", dat_real_p_n = "dat_real_p_n", dat_uza_p_n = "dat_uza_p_n", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", priz_zve_inen = "priz_zve_inen", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_inen = "vz_cislo_inen", priz_rs_nad = "priz_rs_nad", priz_rs_dil = "priz_rs_dil", pr_forma = "pr_forma", priz_relcas_m = "priz_relcas_m", priz_relcas_c = "priz_relcas_c", dat_pri = "dat_pri", s_vz = "s_vz", s_vz_txt = "s_vz_txt", kat_pru = "kat_pru", cislo = "cislo", ixs_cia = "ixs_cia", rokMes = "rokMes", rokMesCdap = "rokMesCdap", kom_pcl = "kom_pcl", kom_ppr = "kom_ppr", kom_spr = "kom_spr", kom_smp = "kom_smp", id_tks = "id_tks", sout_upr_riz = "sout_upr_riz", sout_txt_riz = "sout_txt_riz", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum EvzspidDtoFragments { vlastnosti = "*", ixp = "common", evidence_dokladu = "*", vlastnikIdent = "common", priz_nabedo = "common", vlastnik = "minimum", vlastnik_nazev = "common", lic = "common", ico = "common", ucs = "common", rok_zal = "common", cis_real = "common", ixs_fun_komp = "common", dat_prij_pod = "common", ktg_typ = "common", count = "common", ixs_typ = "common", popis = "common", dat_pis = "common", ixs_pri = "common", ac_ver_zak = "common", nazev = "common", soutez = "common", soutez_txt = "common", cis_por = "common", c = "common", ixs_krk = "common", ukon = "common", dat_zad_p = "common", dat_sml_p = "common", dat_kos_p = "common", dat_real_p = "common", dat_uza_p = "common", dat_zad_s = "common", dat_sml_s = "common", dat_kos_s = "common", dat_real_s = "common", dat_uza_s = "common", cis_ob_v = "common", centr_adr = "common", dat_s_lhu = "common", dat_z_lhu = "common", dat_p_lhu = "common", bu_vl = "common", bu_vl_txt = "common", sk_vl = "common", ks = "common", vs = "common", ss = "common", c_jistina = "common", ixs_esu = "common", ixs_esu_txt = "common", por_cis_nab = "common", prijal = "common", evz_stav = "common", ac_ag = "common", dat_zmena = "common", zmenu_prov = "common", ixp_den = "common", zda_sml = "common", ukon_txt = "commonSeznam", uzo = "commonSeznam", rezim_pri_txt = "commonSeznam", pri_pri_txt = "commonSeznam", cis_duz_txt = "commonSeznam", cis_ner_txt = "commonSeznam", cis_zve_txt = "commonSeznam", regi_list_txt = "commonSeznam", stan_jak_txt = "commonSeznam", stan_svr_txt = "commonSeznam", schv_spec_txt = "commonSeznam", esu_naz = "commonSeznam", cis_real_nazev = "commonSeznam", nazev_rf = "commonSeznam", ixs_typ_txt = "commonSeznam", evz_stav_txt = "commonSeznam", stav_ixp = "commonSeznam", je_fin = "commonSeznam", po_filuta = "commonSeznam", ident_zpo = "commonSeznam", jmeno = "gindesu", prijmeni = "gindesu", kont_osoba = "gindesu", esu_ico = "ginsesu", esu_rc = "ginsesu", esu_dic = "ginsesu", s_ess = "s_ess", s_ess_txt = "s_ess", dat_zverejneni = "wfllpub", zverejnil = "wfllpub", ktg_dms = "wfllpub", fun_naz = "wflspid", ixs_fun_akt = "wflspid", priznak = "wflsepx", priznak_txt = "wflsepx", s_sgn_epx = "wflsepx", soubor = "wflsixb", popis_wflsixb = "wflsixb", velikost = "wflsixb", ixb = "wflsixb", dz_file = "wflsixb", priz_elp = "wflsixb", typ_soub = "wflsixb", ixp_den_evzspac = "wflsixb", ixp_den_nazev = "wflsixb", rezim_pri = "detail", cis_duz = "detail", cis_ner = "detail", pri_pri = "detail", regi_list = "detail", stan_jak = "*", stan_svr = "detail", schv_spec = "detail", ixp_pre = "detail", s_jis = "detail", dat_jis = "detail", dat_zvz = "detail", s_sou = "detail", cj_vz = "detail", poznamka = "detail", c_plan = "detail", c_sch = "detail", c_ps = "detail", fin_od = "detail", fin_do = "detail", ixs_esu_opr = "detail", c_elvz_min_nab = "detail", c_elvz_max_nab = "detail", mj_elvz = "detail", m_elvz = "detail", elvz_txt1 = "detail", elvz_txt2 = "detail", elvz_txt3 = "detail", elvz_txt4 = "detail", elvz_zastupujici = "detail", elvz_oduvodneni = "detail", c_elvz_vyb_nab = "detail", elvz_telefon = "detail", elvz_nazev = "detail", elvz_adresa = "detail", elvz_subjekt = "detail", elvz_subjekt_sidlo = "detail", priz_view = "detail", typ_fin = "detail", lic_zast = "detail", por_zast = "detail", cis_zakon = "detail", pred_urc = "detail", lim_zac = "detail", odu_zz = "detail", cis_dus = "detail", cis_kri = "detail", ac_ag_souv = "detail", ixs_pri_souv = "detail", mena = "detail", c_mena = "detail", kurz = "detail", m = "detail", typ_kurz = "detail", bu_ci_txt = "common", bu_ci = "detail", sk_ci = "detail", c_nav = "detail", c_nav_hist = "detail", odu_krk = "detail", priz_cast = "detail", dat_pred_ozn = "detail", priz_pred_ozn = "detail", dat_trm_pln_pl = "detail", dat_lhu_pod = "detail", misto_pod = "detail", zpu_pod = "detail", dis_zad = "detail", c_dis_zad = "detail", vs_dzd = "detail", ss_dzd = "detail", ozn_veu = "detail", dat_veu = "detail", dat_vyhl = "detail", priz_zad = "detail", zast_zad = "detail", poc_vyz = "detail", vys_riz = "detail", dru_riz = "detail", ixs_aza = "detail", por_cis_aza = "detail", priz_bloupd = "detail", priz_rel_rlz = "detail", dan_typ = "detail", dan_proc = "detail", c_plan_bez = "detail", c_sch_bez = "detail", c_uhr = "detail", c_uhr_bez = "detail", c_nav_bez = "detail", ixs_pri_nad = "detail", ac_ag_pri_nad = "detail", priz_bfin = "detail", priz_revo = "detail", priz_kort = "detail", dat_zad_p_n = "detail", dat_sml_p_n = "detail", dat_kos_p_n = "detail", dat_real_p_n = "detail", dat_uza_p_n = "detail", priz_zve_vevz = "detail", priz_zve_prof = "detail", priz_zve_etrz = "detail", priz_zve_inen = "detail", vz_cislo_vevz = "detail", vz_cislo_prof = "detail", vz_cislo_etrz = "detail", vz_cislo_inen = "detail", priz_rs_nad = "detail", priz_rs_dil = "detail", pr_forma = "detail", priz_relcas_m = "detail", priz_relcas_c = "detail", dat_pri = "detail", s_vz = "detail", s_vz_txt = "detail", kat_pru = "detail", cislo = "detail", ixs_cia = "detail", rokMes = "detail", rokMesCdap = "detail", kom_pcl = "detail", kom_ppr = "detail", kom_spr = "detail", kom_smp = "detail", id_tks = "detail", sout_upr_riz = "detail", sout_txt_riz = "detail", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum EvzspidDtoTypes { vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixp = "string", evidence_dokladu = "boolean", vlastnikIdent = "string", priz_nabedo = "number", vlastnik = "boolean", vlastnik_nazev = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", dat_prij_pod = "JsonDate", ktg_typ = "number", count = "number", ixs_typ = "string", popis = "string", dat_pis = "JsonDate", ixs_pri = "string", ac_ver_zak = "string", nazev = "string", soutez = "string", soutez_txt = "string", cis_por = "number", c = "JsonDecimal", ixs_krk = "string", ukon = "string", dat_zad_p = "JsonDate", dat_sml_p = "JsonDate", dat_kos_p = "JsonDate", dat_real_p = "JsonDate", dat_uza_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_s = "JsonDate", dat_kos_s = "JsonDate", dat_real_s = "JsonDate", dat_uza_s = "JsonDate", cis_ob_v = "string", centr_adr = "string", dat_s_lhu = "JsonDate", dat_z_lhu = "JsonDate", dat_p_lhu = "JsonDate", bu_vl = "string", bu_vl_txt = "string", sk_vl = "string", ks = "string", vs = "string", ss = "string", c_jistina = "JsonDecimal", ixs_esu = "string", ixs_esu_txt = "string", por_cis_nab = "number", prijal = "string", evz_stav = "number", ac_ag = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den = "string", zda_sml = "string", ukon_txt = "string", uzo = "string", rezim_pri_txt = "string", pri_pri_txt = "string", cis_duz_txt = "string", cis_ner_txt = "string", cis_zve_txt = "string", regi_list_txt = "string", stan_jak_txt = "string", stan_svr_txt = "string", schv_spec_txt = "string", esu_naz = "string", cis_real_nazev = "string", nazev_rf = "string", ixs_typ_txt = "string", evz_stav_txt = "string", stav_ixp = "string", je_fin = "string", po_filuta = "number", ident_zpo = "number", jmeno = "string", prijmeni = "string", kont_osoba = "string", esu_ico = "string", esu_rc = "string", esu_dic = "string", s_ess = "number", s_ess_txt = "string", dat_zverejneni = "JsonDate", zverejnil = "string", ktg_dms = "string", fun_naz = "string", ixs_fun_akt = "string", priznak = "number", priznak_txt = "string", s_sgn_epx = "number", soubor = "string", popis_wflsixb = "string", velikost = "number", ixb = "string", dz_file = "JsonDate", priz_elp = "number", typ_soub = "string", ixp_den_evzspac = "string", ixp_den_nazev = "string", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", regi_list = "number", stan_jak = "number", stan_svr = "number", schv_spec = "number", ixp_pre = "string", s_jis = "number", dat_jis = "JsonDate", dat_zvz = "JsonDate", s_sou = "number", cj_vz = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixs_esu_opr = "string", c_elvz_min_nab = "JsonDecimal", c_elvz_max_nab = "JsonDecimal", mj_elvz = "string", m_elvz = "JsonDecimal", elvz_txt1 = "string", elvz_txt2 = "string", elvz_txt3 = "string", elvz_txt4 = "string", elvz_zastupujici = "string", elvz_oduvodneni = "string", c_elvz_vyb_nab = "JsonDecimal", elvz_telefon = "string", elvz_nazev = "string", elvz_adresa = "string", elvz_subjekt = "string", elvz_subjekt_sidlo = "string", priz_view = "number", typ_fin = "number", lic_zast = "string", por_zast = "number", cis_zakon = "number", pred_urc = "number", lim_zac = "number", odu_zz = "number", cis_dus = "number", cis_kri = "number", ac_ag_souv = "string", ixs_pri_souv = "string", mena = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", c_nav = "JsonDecimal", c_nav_hist = "JsonDecimal", odu_krk = "string", priz_cast = "number", dat_pred_ozn = "JsonDate", priz_pred_ozn = "number", dat_trm_pln_pl = "JsonDate", dat_lhu_pod = "JsonDate", misto_pod = "string", zpu_pod = "number", dis_zad = "number", c_dis_zad = "JsonDecimal", vs_dzd = "string", ss_dzd = "string", ozn_veu = "string", dat_veu = "JsonDate", dat_vyhl = "JsonDate", priz_zad = "number", zast_zad = "string", poc_vyz = "number", vys_riz = "number", dru_riz = "number", ixs_aza = "string", por_cis_aza = "number", priz_bloupd = "number", priz_rel_rlz = "number", dan_typ = "number", dan_proc = "JsonDecimal", c_plan_bez = "JsonDecimal", c_sch_bez = "JsonDecimal", c_uhr = "JsonDecimal", c_uhr_bez = "JsonDecimal", c_nav_bez = "JsonDecimal", ixs_pri_nad = "string", ac_ag_pri_nad = "string", priz_bfin = "number", priz_revo = "number", priz_kort = "number", dat_zad_p_n = "JsonDate", dat_sml_p_n = "JsonDate", dat_kos_p_n = "JsonDate", dat_real_p_n = "JsonDate", dat_uza_p_n = "JsonDate", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", priz_zve_inen = "number", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", vz_cislo_inen = "string", priz_rs_nad = "number", priz_rs_dil = "number", pr_forma = "string", priz_relcas_m = "number", priz_relcas_c = "number", dat_pri = "JsonDate", s_vz = "number", s_vz_txt = "string", kat_pru = "number", cislo = "string", ixs_cia = "string", rokMes = "string", rokMesCdap = "string", kom_pcl = "number", kom_ppr = "number", kom_spr = "string", kom_smp = "string", id_tks = "number", sout_upr_riz = "number", sout_txt_riz = "string", el_obraz_typ = "string", el_obraz_soubor = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum EvzspidDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ixs_typ = 12, popis = 254, ixs_pri = 12, ac_ver_zak = 30, nazev = 100, soutez = 30, ixs_krk = 12, cis_ob_v = 12, centr_adr = 100, bu_vl = 34, sk_vl = 11, ks = 12, vs = 12, ss = 12, ixs_esu = 12, prijal = 30, ac_ag = 20, zmenu_prov = 12, ixp_den = 12, rezim_pri_txt = 50, cis_duz_txt = 50, cis_ner_txt = 50, cis_zve_txt = 50, regi_list_txt = 50, stan_jak_txt = 50, stan_svr_txt = 50, schv_spec_txt = 50, esu_naz = 254, nazev_rf = 50, evz_stav_txt = 50, jmeno = 24, prijmeni = 36, esu_ico = 10, esu_rc = 10, esu_dic = 15, zverejnil = 12, ktg_dms = 50, fun_naz = 50, soubor = 254, popis_wflsixb = 50, ixb = 12, ixp_den_evzspac = 12, ixp_den_nazev = 50, ixp_pre = 12, cj_vz = 30, poznamka = 254, ixs_esu_opr = 12, mj_elvz = 5, elvz_txt1 = 254, elvz_txt2 = 254, elvz_txt3 = 254, elvz_txt4 = 30, elvz_zastupujici = 254, elvz_oduvodneni = 254, lic_zast = 4, ac_ag_souv = 20, ixs_pri_souv = 12, bu_ci = 34, sk_ci = 11, odu_krk = 254, misto_pod = 150, vs_dzd = 12, ss_dzd = 12, ozn_veu = 100, zast_zad = 150, ixs_aza = 12, ixs_pri_nad = 12, ac_ag_pri_nad = 12, vz_cislo_vevz = 30, vz_cislo_prof = 30, vz_cislo_etrz = 30, vz_cislo_inen = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.EvzspriDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Evzspri*/
	interface EvzspriDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
		dataFrs?: Gordic.Evz.Interface.GEvzFrsDto[]|null;
		/**zobrazení dotazu*/
		dotaz_frs?: boolean|null;
		/**zobrazení dotazu*/
		poc_init_frs?: number|null;
		/**DBCOLUMN:Detail.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Detail.priz_nabedo*/
		priz_nabedo?: number|null;
		/**DBCOLUMN:Detail.priz_own_pri*/
		priz_own_pri?: number|null;
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
		/**DBCOLUMN:Detail.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnik?: boolean|null;
		/**DBCOLUMN:Seznam.vlastnikIdent*/
		vlastnikIdent?: string|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnik_nazev?: string|null;
		/**DBCOLUMN:Detail.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Detail.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:Detail.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Detail.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Detail.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Detail.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Detail.dat_zvz*/
		dat_zvz?: JsonDate|null;
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
		/**DBCOLUMN:Detail.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Detail.cj_vz*/
		cj_vz?: string|null;
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
		/**DBCOLUMN:Detail.cis_zakon*/
		cis_zakon?: number|null;
		/**DBCOLUMN:Detail.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:Detail.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:Detail.priz_revo*/
		priz_revo?: number|null;
		/**DBCOLUMN:Detail.priz_kort*/
		priz_kort?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Detail.zda_fk_pri*/
		zda_fk_pri?: string|null;
		uzo?: string|null;
		ixs_typ?: string|null;
		/**DBCOLUMN:Detail.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Detail.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Detail.priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**DBCOLUMN:Detail.priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**DBCOLUMN:Detail.priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**DBCOLUMN:Detail.priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**DBCOLUMN:Detail.vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**DBCOLUMN:Detail.vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**DBCOLUMN:Detail.vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**DBCOLUMN:Detail.vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**DBCOLUMN:evzspid.vz_cislo_ivz*/
		vz_cislo_ivz?: string|null;
		preevidence?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		ControlsSystemAggregated?: Gordic.Gin.Interface.GControlsSystemAggregatedDto|null;
		/**DBCOLUMN:SeznamEvz.cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:SeznamEvz.s_vz_txt*/
		s_vz_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.uvo*/
		uvo?: string|null;
		/**DBCOLUMN:SeznamEvz.aat*/
		aat?: string|null;
		/**DBCOLUMN:SeznamEvz.soutez_txt*/
		soutez_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.s_sou_txt*/
		s_sou_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.c_jistina*/
		c_jistina?: JsonDecimal|null;
		/**DBCOLUMN:SeznamEvz.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:SeznamEvz.poc_dokl*/
		poc_dokl?: number|null;
		/**DBCOLUMN:SeznamEvz.cis_dur_txt*/
		cis_dur_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.regi_list_txt*/
		regi_list_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.stan_jak_txt*/
		stan_jak_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.stan_svr_txt*/
		stan_svr_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:SeznamEvz.sta_sml*/
		sta_sml?: number|null;
		/**DBCOLUMN:SeznamEvz.priz_prip*/
		priz_prip_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.priz_view_txt*/
		priz_view_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.typ_fin_txt*/
		typ_fin_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_evzspac*/
		ixp_den_evzspac?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_evzspac_nazev*/
		ixp_den_evzspac_nazev?: string|null;
		/**DBCOLUMN:SeznamEvz.priz_view_all*/
		priz_view_all?: number|null;
		/**DBCOLUMN:SeznamEvz.stav_epk*/
		stav_epk?: number|null;
		/**DBCOLUMN:SeznamEvz.stav_nov*/
		stav_nov?: number|null;
		/**DBCOLUMN:SeznamEvz.zda_revo*/
		zda_revo?: string|null;
		/**DBCOLUMN:SeznamEvz.zda_revo_p*/
		zda_revo_p?: number|null;
		/**DBCOLUMN:SeznamEvz.zda_kort*/
		zda_kort?: string|null;
		/**znak_s*/
		znak_s?: string|null;
		/**DBCOLUMN:Detail.financovani 0/1/2*/
		financovani?: number|null;
		/**vazbyPP*/
		vazbyPP?: number|null;
		/**vazbyPPRok*/
		vazbyPPRok?: number|null;
		/**evz_stav*/
		evz_stav?: number|null;
		/**evz_stav_txt*/
		evz_stav_txt?: string|null;
		/**stav_ixp*/
		stav_ixp?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.kont_osoba*/
		kont_osoba?: string|null;
		/**esu_naz*/
		esu_naz?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**ukon_txt*/
		ukon_txt?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_dic*/
		esu_dic?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**s_ess*/
		s_ess?: number|null;
		/**s_ess_txt*/
		s_ess_txt?: string|null;
		/**jmeno*/
		jmeno?: string|null;
		/**prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**DBCOLUMN:SeznamEvz.lim_zac_txt*/
		lim_zac_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_zakon_txt*/
		cis_zakon_txt?: string|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		sta_uko?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt*/
		k_arch?: string|null;
		ac_sml?: string|null;
		/**DBCOLUMN:Detail.s_zv*/
		s_zv?: number|null;
		/**DBCOLUMN:Detail.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:Detail.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Detail.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:Detail.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:Detail.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:Detail.regi_list*/
		regi_list?: number|null;
		/**DBCOLUMN:Detail.stan_jak*/
		stan_jak?: number|null;
		/**DBCOLUMN:Detail.stan_svr*/
		stan_svr?: number|null;
		/**DBCOLUMN:Detail.schv_spec*/
		schv_spec?: number|null;
		/**DBCOLUMN:Detail.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Detail.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_sch*/
		c_sch?: JsonDecimal|null;
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
		/**DBCOLUMN:Detail.dat_pred_ozn*/
		dat_pred_ozn?: JsonDate|null;
		/**DBCOLUMN:Detail.priz_pred_ozn*/
		priz_pred_ozn?: number|null;
		/**DBCOLUMN:Detail.priz_zad*/
		priz_zad?: number|null;
		/**DBCOLUMN:Detail.zast_zad*/
		zast_zad?: string|null;
		/**DBCOLUMN:Detail.poc_vyz*/
		poc_vyz?: number|null;
		/**DBCOLUMN:Detail.vys_riz*/
		vys_riz?: number|null;
		/**DBCOLUMN:Detail.dru_riz*/
		dru_riz?: number|null;
		/**DBCOLUMN:Detail.ixs_aza*/
		ixs_aza?: string|null;
		/**DBCOLUMN:Detail.por_cis_aza*/
		por_cis_aza?: number|null;
		/**DBCOLUMN:Detail.priz_bloupd*/
		priz_bloupd?: number|null;
		/**DBCOLUMN:Detail.priz_rel_rlz*/
		priz_rel_rlz?: number|null;
		/**DBCOLUMN:Detail.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:Detail.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_plan_bez*/
		c_plan_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_sch_bez*/
		c_sch_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_uhr_bez*/
		c_uhr_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.c_nav_bez*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:Detail.ixs_pri_nad*/
		ixs_pri_nad?: string|null;
		/**DBCOLUMN:Detail.priz_bfin*/
		priz_bfin?: number|null;
		/**DBCOLUMN:Detail.priz_rs_nad*/
		priz_rs_nad?: number|null;
		/**DBCOLUMN:Detail.priz_rs_dil*/
		priz_rs_dil?: number|null;
		/**DBCOLUMN:Detail.priz_relcas_m*/
		priz_relcas_m?: number|null;
		/**DBCOLUMN:Detail.priz_relcas_c*/
		priz_relcas_c?: number|null;
		/**evzsesuCount*/
		evzsesuCount?: number|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**pro záložku související zakázky*/
		c_par?: JsonDecimal|null;
		/**stav finanční kontroly*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav účetní kontroly*/
		stav_uk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav průběžné kontroly*/
		stav_pk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
	}
	const enum EvzspriDtoNames { ixp = "ixp", dataFrs = "dataFrs", dotaz_frs = "dotaz_frs", poc_init_frs = "poc_init_frs", ixs_pri = "ixs_pri", priz_nabedo = "priz_nabedo", priz_own_pri = "priz_own_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac_ver_zak = "ac_ver_zak", vlastnik = "vlastnik", vlastnikIdent = "vlastnikIdent", vlastnik_nazev = "vlastnik_nazev", nazev = "nazev", s_vz = "s_vz", soutez = "soutez", cis_por = "cis_por", c = "c", dat_pri = "dat_pri", dat_zvz = "dat_zvz", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cj_vz = "cj_vz", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", ac_ag = "ac_ag", priz_prip = "priz_prip", priz_view = "priz_view", typ_fin = "typ_fin", cis_zakon = "cis_zakon", pred_urc = "pred_urc", lim_zac = "lim_zac", priz_revo = "priz_revo", priz_kort = "priz_kort", ktg_typ = "ktg_typ", zda_fk_pri = "zda_fk_pri", uzo = "uzo", ixs_typ = "ixs_typ", fin_od = "fin_od", fin_do = "fin_do", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", priz_zve_inen = "priz_zve_inen", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_inen = "vz_cislo_inen", vz_cislo_ivz = "vz_cislo_ivz", preevidence = "preevidence", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", vlastnosti = "vlastnosti", ControlsSystemAggregated = "ControlsSystemAggregated", cis_real_nazev = "cis_real_nazev", nazev_rf = "nazev_rf", nazev_ref = "nazev_ref", s_vz_txt = "s_vz_txt", uvo = "uvo", aat = "aat", soutez_txt = "soutez_txt", s_sou_txt = "s_sou_txt", rezim_pri_txt = "rezim_pri_txt", c_jistina = "c_jistina", dat_pis = "dat_pis", dat_prij_pod = "dat_prij_pod", m_vyber = "m_vyber", poc_dokl = "poc_dokl", cis_dur_txt = "cis_dur_txt", cis_ner_txt = "cis_ner_txt", pri_pri_txt = "pri_pri_txt", regi_list_txt = "regi_list_txt", stan_jak_txt = "stan_jak_txt", stan_svr_txt = "stan_svr_txt", schv_spec_txt = "schv_spec_txt", zda_sml = "zda_sml", sta_sml = "sta_sml", priz_prip_txt = "priz_prip_txt", priz_view_txt = "priz_view_txt", typ_fin_txt = "typ_fin_txt", ixp_den_evzspac = "ixp_den_evzspac", ixp_den_evzspac_nazev = "ixp_den_evzspac_nazev", priz_view_all = "priz_view_all", stav_epk = "stav_epk", stav_nov = "stav_nov", zda_revo = "zda_revo", zda_revo_p = "zda_revo_p", zda_kort = "zda_kort", znak_s = "znak_s", financovani = "financovani", vazbyPP = "vazbyPP", vazbyPPRok = "vazbyPPRok", evz_stav = "evz_stav", evz_stav_txt = "evz_stav_txt", stav_ixp = "stav_ixp", cis_duz_txt = "cis_duz_txt", kont_osoba = "kont_osoba", esu_naz = "esu_naz", ukon = "ukon", ukon_txt = "ukon_txt", esu_ico = "esu_ico", esu_dic = "esu_dic", esu_rc = "esu_rc", ixs_typ_txt = "ixs_typ_txt", s_ess = "s_ess", s_ess_txt = "s_ess_txt", jmeno = "jmeno", prijmeni = "prijmeni", ixs_krk = "ixs_krk", lim_zac_txt = "lim_zac_txt", cis_zakon_txt = "cis_zakon_txt", sta_uko = "sta_uko", k_arch = "k_arch", ac_sml = "ac_sml", s_zv = "s_zv", s_sou = "s_sou", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", regi_list = "regi_list", stan_jak = "stan_jak", stan_svr = "stan_svr", schv_spec = "schv_spec", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", mena = "mena", c_mena = "c_mena", priz_cast = "priz_cast", dat_sch = "dat_sch", dat_pred_ozn = "dat_pred_ozn", priz_pred_ozn = "priz_pred_ozn", priz_zad = "priz_zad", zast_zad = "zast_zad", poc_vyz = "poc_vyz", vys_riz = "vys_riz", dru_riz = "dru_riz", ixs_aza = "ixs_aza", por_cis_aza = "por_cis_aza", priz_bloupd = "priz_bloupd", priz_rel_rlz = "priz_rel_rlz", dan_typ = "dan_typ", dan_proc = "dan_proc", c_plan_bez = "c_plan_bez", c_sch_bez = "c_sch_bez", c_uhr = "c_uhr", c_uhr_bez = "c_uhr_bez", c_nav_bez = "c_nav_bez", ixs_pri_nad = "ixs_pri_nad", priz_bfin = "priz_bfin", priz_rs_nad = "priz_rs_nad", priz_rs_dil = "priz_rs_dil", priz_relcas_m = "priz_relcas_m", priz_relcas_c = "priz_relcas_c", evzsesuCount = "evzsesuCount", zmenu_prov_txt = "zmenu_prov_txt", ixs_fun_akt = "ixs_fun_akt", c_par = "c_par", stav_fk = "stav_fk", stav_uk = "stav_uk", stav_pk = "stav_pk", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum EvzspriDtoFragments { ixp = "common", dataFrs = "common", dotaz_frs = "common", poc_init_frs = "common", ixs_pri = "minimum", priz_nabedo = "common", priz_own_pri = "common", lic = "common", ico = "common", ucs = "common", rok_zal = "common", cis_real = "common", ixs_fun_komp = "common", ac_ver_zak = "minimum", vlastnik = "common", vlastnikIdent = "common", vlastnik_nazev = "common", nazev = "minimum", s_vz = "minimum", soutez = "minimum", cis_por = "common", c = "common", dat_pri = "minimum", dat_zvz = "common", dat_zad_p = "common", dat_zad_s = "common", dat_sml_p = "common", dat_sml_s = "common", dat_kos_p = "common", dat_kos_s = "common", dat_real_p = "common", dat_real_s = "common", dat_uza_p = "common", dat_uza_s = "common", dat_zmena = "common", zmenu_prov = "common", cj_vz = "common", ixp_den = "minimum", ixp_den_nazev = "minimum", ac_ag = "minimum", priz_prip = "common", priz_view = "common", typ_fin = "common", cis_zakon = "minimum", pred_urc = "common", lim_zac = "foreach", priz_revo = "common", priz_kort = "common", ktg_typ = "common", zda_fk_pri = "foreach", uzo = "common", ixs_typ = "common", fin_od = "common", fin_do = "common", priz_zve_vevz = "common", priz_zve_prof = "common", priz_zve_etrz = "common", priz_zve_inen = "common", vz_cislo_vevz = "common", vz_cislo_prof = "common", vz_cislo_etrz = "common", vz_cislo_inen = "common", vz_cislo_ivz = "common", preevidence = "preevidence", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", vlastnosti = "*", ControlsSystemAggregated = "DSG_FRAGMENT", cis_real_nazev = "seznam", nazev_rf = "seznam", nazev_ref = "seznam", s_vz_txt = "minimum", uvo = "seznam", aat = "seznam", soutez_txt = "minimum", s_sou_txt = "seznam", rezim_pri_txt = "seznam", c_jistina = "seznam", dat_pis = "seznam", dat_prij_pod = "seznam", m_vyber = "seznam", poc_dokl = "seznam", cis_dur_txt = "seznam", cis_ner_txt = "seznam", pri_pri_txt = "seznam", regi_list_txt = "seznam", stan_jak_txt = "seznam", stan_svr_txt = "seznam", schv_spec_txt = "seznam", zda_sml = "seznam", sta_sml = "seznam", priz_prip_txt = "seznam", priz_view_txt = "seznam", typ_fin_txt = "seznam", ixp_den_evzspac = "seznam", ixp_den_evzspac_nazev = "seznam", priz_view_all = "seznam", stav_epk = "seznam", stav_nov = "seznam", zda_revo = "foreach", zda_revo_p = "foreach", zda_kort = "seznam", znak_s = "seznam", financovani = "foreach", vazbyPP = "foreach", vazbyPPRok = "foreach", evz_stav = "seznam", evz_stav_txt = "seznam", stav_ixp = "seznam", cis_duz_txt = "seznam", kont_osoba = "seznam", esu_naz = "seznam", ukon = "seznam", ukon_txt = "seznam", esu_ico = "seznam", esu_dic = "seznam", esu_rc = "seznam", ixs_typ_txt = "seznam", s_ess = "seznam", s_ess_txt = "seznam", jmeno = "seznam", prijmeni = "seznam", ixs_krk = "seznam", lim_zac_txt = "foreach", cis_zakon_txt = "minimum", sta_uko = "seznam", k_arch = "seznam", ac_sml = "minimum", s_zv = "detail", s_sou = "detail", rezim_pri = "detail", cis_duz = "detail", cis_ner = "detail", pri_pri = "detail", regi_list = "detail", stan_jak = "detail", stan_svr = "detail", schv_spec = "detail", poznamka = "detail", c_plan = "detail", c_sch = "detail", c_ps = "detail", mena = "detail", c_mena = "detail", priz_cast = "detail", dat_sch = "detail", dat_pred_ozn = "detail", priz_pred_ozn = "detail", priz_zad = "detail", zast_zad = "detail", poc_vyz = "detail", vys_riz = "detail", dru_riz = "detail", ixs_aza = "detail", por_cis_aza = "detail", priz_bloupd = "detail", priz_rel_rlz = "detail", dan_typ = "detail", dan_proc = "detail", c_plan_bez = "detail", c_sch_bez = "detail", c_uhr = "detail", c_uhr_bez = "detail", c_nav_bez = "detail", ixs_pri_nad = "detail", priz_bfin = "detail", priz_rs_nad = "detail", priz_rs_dil = "detail", priz_relcas_m = "detail", priz_relcas_c = "detail", evzsesuCount = "detail", zmenu_prov_txt = "detail", ixs_fun_akt = "detail", c_par = "detail", stav_fk = "WFL_FK", stav_uk = "WFL_UK", stav_pk = "WFL_PK", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum EvzspriDtoTypes { ixp = "string", dataFrs = "Gordic.Evz.Interface.GEvzFrsDto[]", dotaz_frs = "boolean", poc_init_frs = "number", ixs_pri = "string", priz_nabedo = "number", priz_own_pri = "number", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac_ver_zak = "string", vlastnik = "boolean", vlastnikIdent = "string", vlastnik_nazev = "string", nazev = "string", s_vz = "number", soutez = "string", cis_por = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zvz = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", cj_vz = "string", ixp_den = "string", ixp_den_nazev = "string", ac_ag = "string", priz_prip = "number", priz_view = "number", typ_fin = "number", cis_zakon = "number", pred_urc = "number", lim_zac = "number", priz_revo = "number", priz_kort = "number", ktg_typ = "number", zda_fk_pri = "string", uzo = "string", ixs_typ = "string", fin_od = "number", fin_do = "number", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", priz_zve_inen = "number", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", vz_cislo_inen = "string", vz_cislo_ivz = "string", preevidence = "number", el_obraz_typ = "string", el_obraz_soubor = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", cis_real_nazev = "string", nazev_rf = "string", nazev_ref = "string", s_vz_txt = "string", uvo = "string", aat = "string", soutez_txt = "string", s_sou_txt = "string", rezim_pri_txt = "string", c_jistina = "JsonDecimal", dat_pis = "JsonDate", dat_prij_pod = "JsonDate", m_vyber = "number", poc_dokl = "number", cis_dur_txt = "string", cis_ner_txt = "string", pri_pri_txt = "string", regi_list_txt = "string", stan_jak_txt = "string", stan_svr_txt = "string", schv_spec_txt = "string", zda_sml = "string", sta_sml = "number", priz_prip_txt = "string", priz_view_txt = "string", typ_fin_txt = "string", ixp_den_evzspac = "string", ixp_den_evzspac_nazev = "string", priz_view_all = "number", stav_epk = "number", stav_nov = "number", zda_revo = "string", zda_revo_p = "number", zda_kort = "string", znak_s = "string", financovani = "number", vazbyPP = "number", vazbyPPRok = "number", evz_stav = "number", evz_stav_txt = "string", stav_ixp = "string", cis_duz_txt = "string", kont_osoba = "string", esu_naz = "string", ukon = "string", ukon_txt = "string", esu_ico = "string", esu_dic = "string", esu_rc = "string", ixs_typ_txt = "string", s_ess = "number", s_ess_txt = "string", jmeno = "string", prijmeni = "string", ixs_krk = "string", lim_zac_txt = "string", cis_zakon_txt = "string", sta_uko = "number", k_arch = "string", ac_sml = "string", s_zv = "number", s_sou = "number", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", regi_list = "number", stan_jak = "number", stan_svr = "number", schv_spec = "number", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", mena = "number", c_mena = "JsonDecimal", priz_cast = "number", dat_sch = "JsonDate", dat_pred_ozn = "JsonDate", priz_pred_ozn = "number", priz_zad = "number", zast_zad = "string", poc_vyz = "number", vys_riz = "number", dru_riz = "number", ixs_aza = "string", por_cis_aza = "number", priz_bloupd = "number", priz_rel_rlz = "number", dan_typ = "number", dan_proc = "JsonDecimal", c_plan_bez = "JsonDecimal", c_sch_bez = "JsonDecimal", c_uhr = "JsonDecimal", c_uhr_bez = "JsonDecimal", c_nav_bez = "JsonDecimal", ixs_pri_nad = "string", priz_bfin = "number", priz_rs_nad = "number", priz_rs_dil = "number", priz_relcas_m = "number", priz_relcas_c = "number", evzsesuCount = "number", zmenu_prov_txt = "string", ixs_fun_akt = "string", c_par = "JsonDecimal", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum EvzspriDtoTypeLengths { ixp = 12, ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac_ver_zak = 30, nazev = 100, soutez = 30, zmenu_prov = 12, cj_vz = 30, ixp_den = 12, ixp_den_nazev = 50, ac_ag = 20, vz_cislo_vevz = 30, vz_cislo_prof = 30, vz_cislo_etrz = 30, vz_cislo_inen = 30, vz_cislo_ivz = 30, cis_real_nazev = 50, nazev_rf = 50, nazev_ref = 50, s_vz_txt = 50, soutez_txt = 50, s_sou_txt = 50, rezim_pri_txt = 50, cis_dur_txt = 50, cis_ner_txt = 50, pri_pri_txt = 50, regi_list_txt = 50, stan_jak_txt = 50, stan_svr_txt = 50, schv_spec_txt = 50, priz_view_txt = 50, typ_fin_txt = 50, ixp_den_evzspac = 12, ixp_den_evzspac_nazev = 50, ixs_krk = 12, k_arch = 2, poznamka = 254, zast_zad = 150, ixs_aza = 12, ixs_pri_nad = 12, zmenu_prov_txt = 12, ixs_fun_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.EvzvdofDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzvdof*/
	interface GEvzvdofDto {
		/**DBCOLUMN:evzvdof.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:evzvdof.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:evzvdof.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:evzvdof.typ_for*/
		typ_for?: number|null;
		/**DBCOLUMN:evzvdof.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:evzvdof.s_for*/
		s_for?: number|null;
		/**DBCOLUMN:evzvdof.popis*/
		popis?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_01*/
		form_fill_01?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_02*/
		form_fill_02?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_03*/
		form_fill_03?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_04*/
		form_fill_04?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_05*/
		form_fill_05?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_06*/
		form_fill_06?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_07*/
		form_fill_07?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_08*/
		form_fill_08?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_09*/
		form_fill_09?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_10*/
		form_fill_10?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_11*/
		form_fill_11?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_12*/
		form_fill_12?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_13*/
		form_fill_13?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_14*/
		form_fill_14?: string|null;
		/**DBCOLUMN:evzvdof.form_fill_15*/
		form_fill_15?: string|null;
		/**DBCOLUMN:evzvdof.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:evzvdof.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzvdof.zmenu_prov*/
		zmenu_prov?: string|null;
		form_fill_01Dec?: JsonDecimal|null;
		form_fill_02Dec?: JsonDecimal|null;
		form_fill_03Dec?: JsonDecimal|null;
		form_fill_04Dec?: JsonDecimal|null;
		form_fill_05Dec?: JsonDecimal|null;
		form_fill_06Dec?: JsonDecimal|null;
		form_fill_07Dec?: JsonDecimal|null;
		form_fill_08Dec?: JsonDecimal|null;
		form_fill_09Dec?: JsonDecimal|null;
		form_fill_10Dec?: JsonDecimal|null;
		form_fill_11Dec?: JsonDecimal|null;
		form_fill_12Dec?: JsonDecimal|null;
		rok_1?: number|null;
		rok_2?: number|null;
		rok_3?: number|null;
		rok_4?: number|null;
		rok_5?: number|null;
		rok_6?: number|null;
	}
	const enum GEvzvdofDtoNames { ixs_pri = "ixs_pri", ixp = "ixp", ktg_typ = "ktg_typ", typ_for = "typ_for", por_cis = "por_cis", s_for = "s_for", popis = "popis", form_fill_01 = "form_fill_01", form_fill_02 = "form_fill_02", form_fill_03 = "form_fill_03", form_fill_04 = "form_fill_04", form_fill_05 = "form_fill_05", form_fill_06 = "form_fill_06", form_fill_07 = "form_fill_07", form_fill_08 = "form_fill_08", form_fill_09 = "form_fill_09", form_fill_10 = "form_fill_10", form_fill_11 = "form_fill_11", form_fill_12 = "form_fill_12", form_fill_13 = "form_fill_13", form_fill_14 = "form_fill_14", form_fill_15 = "form_fill_15", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", form_fill_01Dec = "form_fill_01Dec", form_fill_02Dec = "form_fill_02Dec", form_fill_03Dec = "form_fill_03Dec", form_fill_04Dec = "form_fill_04Dec", form_fill_05Dec = "form_fill_05Dec", form_fill_06Dec = "form_fill_06Dec", form_fill_07Dec = "form_fill_07Dec", form_fill_08Dec = "form_fill_08Dec", form_fill_09Dec = "form_fill_09Dec", form_fill_10Dec = "form_fill_10Dec", form_fill_11Dec = "form_fill_11Dec", form_fill_12Dec = "form_fill_12Dec", rok_1 = "rok_1", rok_2 = "rok_2", rok_3 = "rok_3", rok_4 = "rok_4", rok_5 = "rok_5", rok_6 = "rok_6",}
	const enum GEvzvdofDtoFragments { ixs_pri = "*", ixp = "*", ktg_typ = "*", typ_for = "*", por_cis = "*", s_for = "*", popis = "*", form_fill_01 = "*", form_fill_02 = "*", form_fill_03 = "*", form_fill_04 = "*", form_fill_05 = "*", form_fill_06 = "*", form_fill_07 = "*", form_fill_08 = "*", form_fill_09 = "*", form_fill_10 = "*", form_fill_11 = "*", form_fill_12 = "*", form_fill_13 = "*", form_fill_14 = "*", form_fill_15 = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", form_fill_01Dec = "*", form_fill_02Dec = "*", form_fill_03Dec = "*", form_fill_04Dec = "*", form_fill_05Dec = "*", form_fill_06Dec = "*", form_fill_07Dec = "*", form_fill_08Dec = "*", form_fill_09Dec = "*", form_fill_10Dec = "*", form_fill_11Dec = "*", form_fill_12Dec = "*", rok_1 = "*", rok_2 = "*", rok_3 = "*", rok_4 = "*", rok_5 = "*", rok_6 = "*",}
	const enum GEvzvdofDtoTypes { ixs_pri = "string", ixp = "string", ktg_typ = "number", typ_for = "number", por_cis = "number", s_for = "number", popis = "string", form_fill_01 = "string", form_fill_02 = "string", form_fill_03 = "string", form_fill_04 = "string", form_fill_05 = "string", form_fill_06 = "string", form_fill_07 = "string", form_fill_08 = "string", form_fill_09 = "string", form_fill_10 = "string", form_fill_11 = "string", form_fill_12 = "string", form_fill_13 = "string", form_fill_14 = "string", form_fill_15 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", form_fill_01Dec = "JsonDecimal", form_fill_02Dec = "JsonDecimal", form_fill_03Dec = "JsonDecimal", form_fill_04Dec = "JsonDecimal", form_fill_05Dec = "JsonDecimal", form_fill_06Dec = "JsonDecimal", form_fill_07Dec = "JsonDecimal", form_fill_08Dec = "JsonDecimal", form_fill_09Dec = "JsonDecimal", form_fill_10Dec = "JsonDecimal", form_fill_11Dec = "JsonDecimal", form_fill_12Dec = "JsonDecimal", rok_1 = "number", rok_2 = "number", rok_3 = "number", rok_4 = "number", rok_5 = "number", rok_6 = "number",}
	const enum GEvzvdofDtoTypeLengths { ixs_pri = 12, ixp = 12, popis = 254, form_fill_01 = 254, form_fill_02 = 254, form_fill_03 = 254, form_fill_04 = 254, form_fill_05 = 254, form_fill_06 = 254, form_fill_07 = 254, form_fill_08 = 254, form_fill_09 = 254, form_fill_10 = 254, form_fill_11 = 254, form_fill_12 = 254, form_fill_13 = 254, form_fill_14 = 254, form_fill_15 = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GDetailEnableDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DTO pro nastavení enable na detailu*/
	interface GDetailEnableDto {
		/**elvz*/
		readOnly_09?: boolean|null;
		readOnly_07_34615?: boolean|null;
		readOnly_07?: boolean|null;
		readOnly_10_fin?: boolean|null;
		readOnly_10_esu?: boolean|null;
		readOnly_12?: boolean|null;
		/**dat_kos_p_04*/
		dat_kos_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_sml_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_uza_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_real_p_04?: boolean|null;
		/**dat_kos_p_04*/
		dat_zad_p_04?: boolean|null;
		c_plan_03?: boolean|null;
		rezim_pri_03?: boolean|null;
		pri_pri_03?: boolean|null;
		cis_duz_03?: boolean|null;
		dat_zvz_03?: boolean|null;
		soutez_03?: boolean|null;
		priz_dzr_03?: boolean|null;
		cis_por_03?: boolean|null;
		s_vz_03?: boolean|null;
		cis_ner_03?: boolean|null;
		dat_vyhl_11?: boolean|null;
		dat_s_lhu_11?: boolean|null;
		centr_adr_11?: boolean|null;
		cis_kri_11?: boolean|null;
		cis_ob_v_11?: boolean|null;
		c_jistota_11?: boolean|null;
		mena_11?: boolean|null;
		c_mena_11?: boolean|null;
		ozn_veu_11?: boolean|null;
		bu_vl_11?: boolean|null;
		ks_11?: boolean|null;
		vs_11?: boolean|null;
		ss_11?: boolean|null;
		dat_veu_11?: boolean|null;
		c_dis_zad_11?: boolean|null;
		dat_pis_08?: boolean|null;
		dat_s_lhu_08?: boolean|null;
		dat_z_lhu_08?: boolean|null;
		dat_p_lhu_08?: boolean|null;
		centr_adr_08?: boolean|null;
		cis_ob_v_08?: boolean|null;
		c_jistota_08?: boolean|null;
		bu_vl_08?: boolean|null;
		ks_08?: boolean|null;
		vs_08?: boolean|null;
		ss_08?: boolean|null;
		ac_ag_zu?: boolean|null;
		ac_ver_zak_zu?: boolean|null;
		cis_real_zu?: boolean|null;
		ixs_fun_komp_zu?: boolean|null;
		s_vz_zu?: boolean|null;
		nazev_zu?: boolean|null;
		typ_fin_zu?: boolean|null;
		fin_od_zu?: boolean|null;
		fin_do_zu?: boolean|null;
		c_sch_zu?: boolean|null;
		dat_pri_zu?: boolean|null;
		priz_nabedo_zu?: boolean|null;
		elvz_oduvodneni_od?: boolean|null;
		odu_zz_od?: boolean|null;
		pred_urc_bu?: boolean|null;
		lim_zac_bu?: boolean|null;
		kat_pru_bu?: boolean|null;
		cislo_bu?: boolean|null;
		priz_cast_bu?: boolean|null;
		priz_bfin_bu?: boolean|null;
		priz_pred_ozn_bu?: boolean|null;
		dat_pred_ozn_bu?: boolean|null;
		poznamka_co?: boolean|null;
		por_cis_nab_05?: boolean|null;
		dat_pis_05?: boolean|null;
		prijal_05?: boolean|null;
		s_ess_05?: boolean|null;
		ixs_esu_05?: boolean|null;
		pr_forma_05?: boolean|null;
		bu_ci_txt_05?: boolean|null;
		s_jis_ou?: boolean|null;
		dat_jis_ou?: boolean|null;
		dat_vyhl_ou?: boolean|null;
		centr_adr_ou?: boolean|null;
		dat_lhu_pod_ou?: boolean|null;
		zpu_pod_ou?: boolean|null;
		misto_pod_ou?: boolean|null;
		c_nav_ou?: boolean|null;
		c_nav_hist_ou?: boolean|null;
		dat_trm_pln_pl_ou?: boolean|null;
		dis_zad_ou?: boolean|null;
		vs_dzd_ou?: boolean|null;
		ss_dzd_ou?: boolean|null;
		c_preblok_ou?: boolean|null;
		priz_hsp_ou?: boolean|null;
		popis_hl?: boolean|null;
	}
	const enum GDetailEnableDtoNames { readOnly_09 = "readOnly_09", readOnly_07_34615 = "readOnly_07_34615", readOnly_07 = "readOnly_07", readOnly_10_fin = "readOnly_10_fin", readOnly_10_esu = "readOnly_10_esu", readOnly_12 = "readOnly_12", dat_kos_p_04 = "dat_kos_p_04", dat_sml_p_04 = "dat_sml_p_04", dat_uza_p_04 = "dat_uza_p_04", dat_real_p_04 = "dat_real_p_04", dat_zad_p_04 = "dat_zad_p_04", c_plan_03 = "c_plan_03", rezim_pri_03 = "rezim_pri_03", pri_pri_03 = "pri_pri_03", cis_duz_03 = "cis_duz_03", dat_zvz_03 = "dat_zvz_03", soutez_03 = "soutez_03", priz_dzr_03 = "priz_dzr_03", cis_por_03 = "cis_por_03", s_vz_03 = "s_vz_03", cis_ner_03 = "cis_ner_03", dat_vyhl_11 = "dat_vyhl_11", dat_s_lhu_11 = "dat_s_lhu_11", centr_adr_11 = "centr_adr_11", cis_kri_11 = "cis_kri_11", cis_ob_v_11 = "cis_ob_v_11", c_jistota_11 = "c_jistota_11", mena_11 = "mena_11", c_mena_11 = "c_mena_11", ozn_veu_11 = "ozn_veu_11", bu_vl_11 = "bu_vl_11", ks_11 = "ks_11", vs_11 = "vs_11", ss_11 = "ss_11", dat_veu_11 = "dat_veu_11", c_dis_zad_11 = "c_dis_zad_11", dat_pis_08 = "dat_pis_08", dat_s_lhu_08 = "dat_s_lhu_08", dat_z_lhu_08 = "dat_z_lhu_08", dat_p_lhu_08 = "dat_p_lhu_08", centr_adr_08 = "centr_adr_08", cis_ob_v_08 = "cis_ob_v_08", c_jistota_08 = "c_jistota_08", bu_vl_08 = "bu_vl_08", ks_08 = "ks_08", vs_08 = "vs_08", ss_08 = "ss_08", ac_ag_zu = "ac_ag_zu", ac_ver_zak_zu = "ac_ver_zak_zu", cis_real_zu = "cis_real_zu", ixs_fun_komp_zu = "ixs_fun_komp_zu", s_vz_zu = "s_vz_zu", nazev_zu = "nazev_zu", typ_fin_zu = "typ_fin_zu", fin_od_zu = "fin_od_zu", fin_do_zu = "fin_do_zu", c_sch_zu = "c_sch_zu", dat_pri_zu = "dat_pri_zu", priz_nabedo_zu = "priz_nabedo_zu", elvz_oduvodneni_od = "elvz_oduvodneni_od", odu_zz_od = "odu_zz_od", pred_urc_bu = "pred_urc_bu", lim_zac_bu = "lim_zac_bu", kat_pru_bu = "kat_pru_bu", cislo_bu = "cislo_bu", priz_cast_bu = "priz_cast_bu", priz_bfin_bu = "priz_bfin_bu", priz_pred_ozn_bu = "priz_pred_ozn_bu", dat_pred_ozn_bu = "dat_pred_ozn_bu", poznamka_co = "poznamka_co", por_cis_nab_05 = "por_cis_nab_05", dat_pis_05 = "dat_pis_05", prijal_05 = "prijal_05", s_ess_05 = "s_ess_05", ixs_esu_05 = "ixs_esu_05", pr_forma_05 = "pr_forma_05", bu_ci_txt_05 = "bu_ci_txt_05", s_jis_ou = "s_jis_ou", dat_jis_ou = "dat_jis_ou", dat_vyhl_ou = "dat_vyhl_ou", centr_adr_ou = "centr_adr_ou", dat_lhu_pod_ou = "dat_lhu_pod_ou", zpu_pod_ou = "zpu_pod_ou", misto_pod_ou = "misto_pod_ou", c_nav_ou = "c_nav_ou", c_nav_hist_ou = "c_nav_hist_ou", dat_trm_pln_pl_ou = "dat_trm_pln_pl_ou", dis_zad_ou = "dis_zad_ou", vs_dzd_ou = "vs_dzd_ou", ss_dzd_ou = "ss_dzd_ou", c_preblok_ou = "c_preblok_ou", priz_hsp_ou = "priz_hsp_ou", popis_hl = "popis_hl",}
	const enum GDetailEnableDtoFragments { readOnly_09 = "*", readOnly_07_34615 = "*", readOnly_07 = "*", readOnly_10_fin = "*", readOnly_10_esu = "*", readOnly_12 = "*", dat_kos_p_04 = "*", dat_sml_p_04 = "*", dat_uza_p_04 = "*", dat_real_p_04 = "*", dat_zad_p_04 = "*", c_plan_03 = "*", rezim_pri_03 = "*", pri_pri_03 = "*", cis_duz_03 = "*", dat_zvz_03 = "*", soutez_03 = "*", priz_dzr_03 = "*", cis_por_03 = "*", s_vz_03 = "*", cis_ner_03 = "*", dat_vyhl_11 = "*", dat_s_lhu_11 = "*", centr_adr_11 = "*", cis_kri_11 = "*", cis_ob_v_11 = "*", c_jistota_11 = "*", mena_11 = "*", c_mena_11 = "*", ozn_veu_11 = "*", bu_vl_11 = "*", ks_11 = "*", vs_11 = "*", ss_11 = "*", dat_veu_11 = "*", c_dis_zad_11 = "*", dat_pis_08 = "*", dat_s_lhu_08 = "*", dat_z_lhu_08 = "*", dat_p_lhu_08 = "*", centr_adr_08 = "*", cis_ob_v_08 = "*", c_jistota_08 = "*", bu_vl_08 = "*", ks_08 = "*", vs_08 = "*", ss_08 = "*", ac_ag_zu = "*", ac_ver_zak_zu = "*", cis_real_zu = "*", ixs_fun_komp_zu = "*", s_vz_zu = "*", nazev_zu = "*", typ_fin_zu = "*", fin_od_zu = "*", fin_do_zu = "*", c_sch_zu = "*", dat_pri_zu = "*", priz_nabedo_zu = "*", elvz_oduvodneni_od = "*", odu_zz_od = "*", pred_urc_bu = "*", lim_zac_bu = "*", kat_pru_bu = "*", cislo_bu = "*", priz_cast_bu = "*", priz_bfin_bu = "*", priz_pred_ozn_bu = "*", dat_pred_ozn_bu = "*", poznamka_co = "*", por_cis_nab_05 = "*", dat_pis_05 = "*", prijal_05 = "*", s_ess_05 = "*", ixs_esu_05 = "*", pr_forma_05 = "*", bu_ci_txt_05 = "*", s_jis_ou = "*", dat_jis_ou = "*", dat_vyhl_ou = "*", centr_adr_ou = "*", dat_lhu_pod_ou = "*", zpu_pod_ou = "*", misto_pod_ou = "*", c_nav_ou = "*", c_nav_hist_ou = "*", dat_trm_pln_pl_ou = "*", dis_zad_ou = "*", vs_dzd_ou = "*", ss_dzd_ou = "*", c_preblok_ou = "*", priz_hsp_ou = "*", popis_hl = "*",}
	const enum GDetailEnableDtoTypes { readOnly_09 = "boolean", readOnly_07_34615 = "boolean", readOnly_07 = "boolean", readOnly_10_fin = "boolean", readOnly_10_esu = "boolean", readOnly_12 = "boolean", dat_kos_p_04 = "boolean", dat_sml_p_04 = "boolean", dat_uza_p_04 = "boolean", dat_real_p_04 = "boolean", dat_zad_p_04 = "boolean", c_plan_03 = "boolean", rezim_pri_03 = "boolean", pri_pri_03 = "boolean", cis_duz_03 = "boolean", dat_zvz_03 = "boolean", soutez_03 = "boolean", priz_dzr_03 = "boolean", cis_por_03 = "boolean", s_vz_03 = "boolean", cis_ner_03 = "boolean", dat_vyhl_11 = "boolean", dat_s_lhu_11 = "boolean", centr_adr_11 = "boolean", cis_kri_11 = "boolean", cis_ob_v_11 = "boolean", c_jistota_11 = "boolean", mena_11 = "boolean", c_mena_11 = "boolean", ozn_veu_11 = "boolean", bu_vl_11 = "boolean", ks_11 = "boolean", vs_11 = "boolean", ss_11 = "boolean", dat_veu_11 = "boolean", c_dis_zad_11 = "boolean", dat_pis_08 = "boolean", dat_s_lhu_08 = "boolean", dat_z_lhu_08 = "boolean", dat_p_lhu_08 = "boolean", centr_adr_08 = "boolean", cis_ob_v_08 = "boolean", c_jistota_08 = "boolean", bu_vl_08 = "boolean", ks_08 = "boolean", vs_08 = "boolean", ss_08 = "boolean", ac_ag_zu = "boolean", ac_ver_zak_zu = "boolean", cis_real_zu = "boolean", ixs_fun_komp_zu = "boolean", s_vz_zu = "boolean", nazev_zu = "boolean", typ_fin_zu = "boolean", fin_od_zu = "boolean", fin_do_zu = "boolean", c_sch_zu = "boolean", dat_pri_zu = "boolean", priz_nabedo_zu = "boolean", elvz_oduvodneni_od = "boolean", odu_zz_od = "boolean", pred_urc_bu = "boolean", lim_zac_bu = "boolean", kat_pru_bu = "boolean", cislo_bu = "boolean", priz_cast_bu = "boolean", priz_bfin_bu = "boolean", priz_pred_ozn_bu = "boolean", dat_pred_ozn_bu = "boolean", poznamka_co = "boolean", por_cis_nab_05 = "boolean", dat_pis_05 = "boolean", prijal_05 = "boolean", s_ess_05 = "boolean", ixs_esu_05 = "boolean", pr_forma_05 = "boolean", bu_ci_txt_05 = "boolean", s_jis_ou = "boolean", dat_jis_ou = "boolean", dat_vyhl_ou = "boolean", centr_adr_ou = "boolean", dat_lhu_pod_ou = "boolean", zpu_pod_ou = "boolean", misto_pod_ou = "boolean", c_nav_ou = "boolean", c_nav_hist_ou = "boolean", dat_trm_pln_pl_ou = "boolean", dis_zad_ou = "boolean", vs_dzd_ou = "boolean", ss_dzd_ou = "boolean", c_preblok_ou = "boolean", priz_hsp_ou = "boolean", popis_hl = "boolean",}
	const enum GDetailEnableDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GDetailLabelsDto.d.ts 

declare namespace Gordic.Evz.Interface {
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
	const enum GDetailLabelsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzcvriDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcvri*/
	interface GEvzcvriDto {
		/**DBCOLUMN:evzcvri.vys_riz*/
		vys_riz?: number|null;
		/**DBCOLUMN:evzcvri.vys_riz_txt*/
		vys_riz_txt?: string|null;
		/**DBCOLUMN:evzcvri.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcvri.k_s*/
		k_s?: string|null;
		/**cis_zakon*/
		cis_zakon?: number|null;
	}
	const enum GEvzcvriDtoNames { vys_riz = "vys_riz", vys_riz_txt = "vys_riz_txt", k_v = "k_v", k_s = "k_s", cis_zakon = "cis_zakon",}
	const enum GEvzcvriDtoFragments { vys_riz = "*", vys_riz_txt = "*", k_v = "*", k_s = "*", cis_zakon = "*",}
	const enum GEvzcvriDtoTypes { vys_riz = "number", vys_riz_txt = "string", k_v = "number", k_s = "string", cis_zakon = "number",}
	const enum GEvzcvriDtoTypeLengths { vys_riz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzDokRestrikce.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	interface GEvzDokRestrikceDto {
		restrikce?: Gordic.Pap.Interface.GRestrikceDto|null;
		filters?: Gordic.Evz.Interface.GEvzFiltrDokDto|null;
	}
	const enum GEvzDokRestrikceDtoNames { restrikce = "restrikce", filters = "filters",}
	const enum GEvzDokRestrikceDtoFragments { restrikce = "*", filters = "*",}
	const enum GEvzDokRestrikceDtoTypes { restrikce = "Gordic.Pap.Interface.GRestrikceDto", filters = "Gordic.Evz.Interface.GEvzFiltrDokDto",}
	const enum GEvzDokRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzFrs.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**parametry frs*/
	interface GEvzFrsDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri_nad?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		por_cis_nab?: number|null;
		cis_por?: number|null;
	}
	const enum GEvzFrsDtoNames { ixs_pri = "ixs_pri", ixs_pri_nad = "ixs_pri_nad", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", soutez = "soutez", por_cis_nab = "por_cis_nab", cis_por = "cis_por",}
	const enum GEvzFrsDtoFragments { ixs_pri = "*", ixs_pri_nad = "*", ixs_esu = "*", ixs_esu_txt = "*", soutez = "*", por_cis_nab = "*", cis_por = "*",}
	const enum GEvzFrsDtoTypes { ixs_pri = "string", ixs_pri_nad = "string", ixs_esu = "string", ixs_esu_txt = "string", soutez = "string", por_cis_nab = "number", cis_por = "number",}
	const enum GEvzFrsDtoTypeLengths { ixs_pri = 12, ixs_pri_nad = 12, ixs_esu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzRestrikce.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	interface GEvzRestrikceDto {
		restrikce?: Gordic.Pap.Interface.GRestrikceDto|null;
		filters?: Gordic.Evz.Interface.GEvzFiltrDto|null;
	}
	const enum GEvzRestrikceDtoNames { restrikce = "restrikce", filters = "filters",}
	const enum GEvzRestrikceDtoFragments { restrikce = "*", filters = "*",}
	const enum GEvzRestrikceDtoTypes { restrikce = "Gordic.Pap.Interface.GRestrikceDto", filters = "Gordic.Evz.Interface.GEvzFiltrDto",}
	const enum GEvzRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzsesu.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:Seznam*/
	interface GEvzsesuDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.dat_jis*/
		dat_jis?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pre_nab*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.s_jis_txt*/
		s_jis_txt?: string|null;
		s_vz?: number|null;
		s_vz_txt?: string|null;
		nazev?: string|null;
		ac_ag?: string|null;
		ac_ver_zak?: string|null;
		soutez?: string|null;
		soutez_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
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
		/**DBCOLUMN:Seznam.s_jis*/
		s_jis?: number|null;
		/**DBCOLUMN:Seznam.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.c_nav*/
		c_nav?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_lhu_pod*/
		dat_lhu_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.misto_pod*/
		misto_pod?: string|null;
		/**DBCOLUMN:Seznam.zpu_pod*/
		zpu_pod?: number|null;
		/**DBCOLUMN:Seznam.vs_dzd*/
		vs_dzd?: string|null;
		/**DBCOLUMN:Seznam.c_nav_bez*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.dis_zad*/
		dis_zad?: number|null;
		/**DBCOLUMN:Seznam.ss_dzd*/
		ss_dzd?: string|null;
		/**DBCOLUMN:Seznam.dan_typ*/
		dan_typ?: number|null;
	}
	const enum GEvzsesuDtoNames { ixs_pri = "ixs_pri", ixs_esu = "ixs_esu", dat_jis = "dat_jis", dat_pre_nab = "dat_pre_nab", por_cis_nab = "por_cis_nab", cis_por = "cis_por", nazev_rf = "nazev_rf", s_jis_txt = "s_jis_txt", s_vz = "s_vz", s_vz_txt = "s_vz_txt", nazev = "nazev", ac_ag = "ac_ag", ac_ver_zak = "ac_ver_zak", soutez = "soutez", soutez_txt = "soutez_txt", ixs_esu_txt = "ixs_esu_txt", s_ess_txt = "s_ess_txt", dat_vyz = "dat_vyz", dat_vys = "dat_vys", dat_zmena = "dat_zmena", ico_esu = "ico_esu", s_jis = "s_jis", s_ess = "s_ess", pr_forma = "pr_forma", lic_zast = "lic_zast", por_zast = "por_zast", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixp_nab = "ixp_nab", c_nav = "c_nav", dat_lhu_pod = "dat_lhu_pod", misto_pod = "misto_pod", zpu_pod = "zpu_pod", vs_dzd = "vs_dzd", c_nav_bez = "c_nav_bez", jmeno = "jmeno", prijmeni = "prijmeni", dis_zad = "dis_zad", ss_dzd = "ss_dzd", dan_typ = "dan_typ",}
	const enum GEvzsesuDtoFragments { ixs_pri = "common", ixs_esu = "common", dat_jis = "common", dat_pre_nab = "common", por_cis_nab = "common", cis_por = "common", nazev_rf = "common", s_jis_txt = "seznam", s_vz = "seznam", s_vz_txt = "seznam", nazev = "seznam", ac_ag = "seznam", ac_ver_zak = "seznam", soutez = "seznam", soutez_txt = "seznam", ixs_esu_txt = "seznam", s_ess_txt = "seznam", dat_vyz = "seznam", dat_vys = "seznam", dat_zmena = "seznam", ico_esu = "seznam", s_jis = "detail", s_ess = "detail", pr_forma = "detail", lic_zast = "detail", por_zast = "detail", bu_ci_txt = "detail", bu_ci = "detail", sk_ci = "detail", ixp_nab = "detail", c_nav = "detail", dat_lhu_pod = "detail", misto_pod = "detail", zpu_pod = "detail", vs_dzd = "detail", c_nav_bez = "detail", jmeno = "detail", prijmeni = "detail", dis_zad = "detail", ss_dzd = "detail", dan_typ = "detail",}
	const enum GEvzsesuDtoTypes { ixs_pri = "string", ixs_esu = "string", dat_jis = "JsonDate", dat_pre_nab = "JsonDate", por_cis_nab = "number", cis_por = "number", nazev_rf = "string", s_jis_txt = "string", s_vz = "number", s_vz_txt = "string", nazev = "string", ac_ag = "string", ac_ver_zak = "string", soutez = "string", soutez_txt = "string", ixs_esu_txt = "string", s_ess_txt = "string", dat_vyz = "JsonDate", dat_vys = "JsonDate", dat_zmena = "JsonDate", ico_esu = "string", s_jis = "number", s_ess = "number", pr_forma = "string", lic_zast = "string", por_zast = "number", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixp_nab = "string", c_nav = "JsonDecimal", dat_lhu_pod = "JsonDate", misto_pod = "string", zpu_pod = "number", vs_dzd = "string", c_nav_bez = "JsonDecimal", jmeno = "string", prijmeni = "string", dis_zad = "number", ss_dzd = "string", dan_typ = "number",}
	const enum GEvzsesuDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, s_jis_txt = 50, ixs_esu_txt = 254, s_ess_txt = 50, pr_forma = 3, lic_zast = 4, bu_ci = 34, sk_ci = 11, ixp_nab = 12, misto_pod = 150, vs_dzd = 12, jmeno = 24, prijmeni = 36, ss_dzd = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzvkdnDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzvkdn*/
	interface GEvzvkdnDto {
		/**DBCOLUMN:evzvkdn.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:evzvkdn.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:evzvkdn.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:evzvkdn.ixs_kdn*/
		ixs_kdn?: string|null;
		/**DBCOLUMN:evzvkdn.popis_kdn*/
		popis_kdn?: string|null;
		/**DBCOLUMN:evzvkdn.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:evzvkdn.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzvkdn.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**nazev_esu*/
		nazev_esu?: string|null;
		/**nazev_krk*/
		nazev_krk?: string|null;
		/**nazev_krk*/
		nazev_kdn?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:evzskdn.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:ixs_esu*/
		ixs_esu?: string|null;
	}
	const enum GEvzvkdnDtoNames { ixs_pri = "ixs_pri", ixp = "ixp", por_cis = "por_cis", ixs_kdn = "ixs_kdn", popis_kdn = "popis_kdn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", nazev_esu = "nazev_esu", nazev_krk = "nazev_krk", nazev_kdn = "nazev_kdn", por_cis_nab = "por_cis_nab", zkratka = "zkratka", dat_pri = "dat_pri", ixs_esu = "ixs_esu",}
	const enum GEvzvkdnDtoFragments { ixs_pri = "*", ixp = "*", por_cis = "*", ixs_kdn = "*", popis_kdn = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", nazev_esu = "*", nazev_krk = "*", nazev_kdn = "*", por_cis_nab = "*", zkratka = "*", dat_pri = "*", ixs_esu = "*",}
	const enum GEvzvkdnDtoTypes { ixs_pri = "string", ixp = "string", por_cis = "number", ixs_kdn = "string", popis_kdn = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", nazev_esu = "string", nazev_krk = "string", nazev_kdn = "string", por_cis_nab = "number", zkratka = "string", dat_pri = "JsonDate", ixs_esu = "string",}
	const enum GEvzvkdnDtoTypeLengths { ixs_pri = 12, ixp = 12, ixs_kdn = 12, popis_kdn = 254, zmenu_prov = 12, zkratka = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzvkprDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcvri*/
	interface GEvzvkprDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**id_kmd*/
		id_kmd?: string|null;
		/**id_kmd_nazev*/
		nazev_kmd?: string|null;
		/**popis*/
		popis?: string|null;
		/**mj*/
		mj?: string|null;
		/**pmj_sk*/
		mj_txt?: string|null;
		/**pmj_pl*/
		pmj_pl?: JsonDecimal|null;
		/**pmj_sk*/
		pmj_sk?: JsonDecimal|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GEvzvkprDtoNames { ixs_pri = "ixs_pri", id_kmd = "id_kmd", nazev_kmd = "nazev_kmd", popis = "popis", mj = "mj", mj_txt = "mj_txt", pmj_pl = "pmj_pl", pmj_sk = "pmj_sk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf",}
	const enum GEvzvkprDtoFragments { ixs_pri = "*", id_kmd = "*", nazev_kmd = "*", popis = "*", mj = "*", mj_txt = "*", pmj_pl = "*", pmj_sk = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*",}
	const enum GEvzvkprDtoTypes { ixs_pri = "string", id_kmd = "string", nazev_kmd = "string", popis = "string", mj = "string", mj_txt = "string", pmj_pl = "JsonDecimal", pmj_sk = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string",}
	const enum GEvzvkprDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzvoks.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:Seznam*/
	interface GEvzvoksDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.ixs_oko*/
		ixs_oko?: string|null;
		/**DBCOLUMN:Seznam.id_tks*/
		id_tks?: number|null;
		/**DBCOLUMN:Seznam.id_uks*/
		id_uks?: number|null;
		/**id_uks_txt*/
		id_uks_txt?: string|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
		/**DBCOLUMN:Seznam.popis_oks*/
		popis_oks?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zdu_vyr*/
		zdu_vyr?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**zmenu provedl*/
		nazev_rf?: string|null;
	}
	const enum GEvzvoksDtoNames { ixs_pri = "ixs_pri", ixp = "ixp", por_cis = "por_cis", ixs_oko = "ixs_oko", id_tks = "id_tks", id_uks = "id_uks", id_uks_txt = "id_uks_txt", priznak = "priznak", popis_oks = "popis_oks", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zdu_vyr = "zdu_vyr", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", nazev_rf = "nazev_rf",}
	const enum GEvzvoksDtoFragments { ixs_pri = "*", ixp = "*", por_cis = "*", ixs_oko = "*", id_tks = "*", id_uks = "*", id_uks_txt = "*", priznak = "*", popis_oks = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zdu_vyr = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", nazev_rf = "*",}
	const enum GEvzvoksDtoTypes { ixs_pri = "string", ixp = "string", por_cis = "number", ixs_oko = "string", id_tks = "number", id_uks = "number", id_uks_txt = "string", priznak = "number", popis_oks = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zdu_vyr = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", nazev_rf = "string",}
	const enum GEvzvoksDtoTypeLengths { ixs_pri = 12, ixp = 12, ixs_oko = 12, popis_oks = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, jmeno = 24, prijmeni = 36,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GEvzvvzc.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:Seznam*/
	interface GEvzvvzcZrusDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.ixs_pri_cast*/
		ixs_pri_cast?: string|null;
		/**DBCOLUMN:Seznam.c_cast*/
		c_cast?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_cast*/
		proc_cast?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.odu_cast*/
		odu_cast?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.ac_ag_pod*/
		ac_ag_pod?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GEvzvvzcZrusDtoNames { ixs_pri = "ixs_pri", por_cis = "por_cis", ixs_pri_cast = "ixs_pri_cast", c_cast = "c_cast", proc_cast = "proc_cast", odu_cast = "odu_cast", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poznamka = "poznamka", ac_ag_pod = "ac_ag_pod", ac_ag = "ac_ag", nazev_rf = "nazev_rf",}
	const enum GEvzvvzcZrusDtoFragments { ixs_pri = "*", por_cis = "*", ixs_pri_cast = "*", c_cast = "*", proc_cast = "*", odu_cast = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", poznamka = "*", ac_ag_pod = "*", ac_ag = "*", nazev_rf = "*",}
	const enum GEvzvvzcZrusDtoTypes { ixs_pri = "string", por_cis = "number", ixs_pri_cast = "string", c_cast = "JsonDecimal", proc_cast = "JsonDecimal", odu_cast = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poznamka = "string", ac_ag_pod = "string", ac_ag = "string", nazev_rf = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GGenerujCastiDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Generování částí VZ*/
	interface GGenerujCastiDto {
		ixs_pri?: string|null;
		/**sVz*/
		pocetCasti?: number|null;
	}
	const enum GGenerujCastiDtoNames { ixs_pri = "ixs_pri", pocetCasti = "pocetCasti",}
	const enum GGenerujCastiDtoFragments { ixs_pri = "*", pocetCasti = "*",}
	const enum GGenerujCastiDtoTypes { ixs_pri = "string", pocetCasti = "number",}
	const enum GGenerujCastiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GParamDetailDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Dto pro parametry detailu*/
	interface GParamDetailDto {
		/**parametry*/
		parametry?: Gordic.Evz.Interface.GParamsDetailDto|null;
		/**dto evzspid*/
		pidDto?: Gordic.Evz.Interface.EvzspidDto|null;
		prava?: Gordic.Pap.Interface.GPridelPravaDto|null;
		/**labels04*/
		labels04?: Gordic.Pap.Interface.GTab04VlastnostiDto|null;
		enabled?: Gordic.Evz.Interface.GDetailEnableDto|null;
		lab?: Gordic.Evz.Interface.GDetailLabelsDto|null;
		/**rozšířený profil*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		kpiData?: string[]|null;
		/**provést  mimo HO -1; kontrolu - 0, provést akci = 1;*/
		kontrolaHO?: number|null;
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GParamDetailDtoNames { parametry = "parametry", pidDto = "pidDto", prava = "prava", labels04 = "labels04", enabled = "enabled", lab = "lab", vlastnosti = "vlastnosti", kpiData = "kpiData", kontrolaHO = "kontrolaHO", dokument = "dokument",}
	const enum GParamDetailDtoFragments { parametry = "*", pidDto = "*", prava = "*", labels04 = "*", enabled = "*", lab = "*", vlastnosti = "*", kpiData = "*", kontrolaHO = "*", dokument = "*",}
	const enum GParamDetailDtoTypes { parametry = "Gordic.Evz.Interface.GParamsDetailDto", pidDto = "Gordic.Evz.Interface.EvzspidDto", prava = "Gordic.Pap.Interface.GPridelPravaDto", labels04 = "Gordic.Pap.Interface.GTab04VlastnostiDto", enabled = "Gordic.Evz.Interface.GDetailEnableDto", lab = "Gordic.Evz.Interface.GDetailLabelsDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", kpiData = "string[]", kontrolaHO = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GParamDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GParamsDetailDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Dto pro parametry detailu*/
	interface GParamsDetailDto {
		/**zákon*/
		cisZakSb?: number|null;
		/**ixs_soudgr*/
		ixs_soudgr?: string|null;
		/**nadtyp*/
		nadTyp1?: number|null;
		/**nadtyp*/
		nadTyp2?: number|null;
		/**nadtyp*/
		nadTyp3?: number|null;
		cbSch_visible?: boolean|null;
		/**kód otevřeného okna*/
		open?: string|null;
		/**kód otevřeného okna*/
		open2?: string|null;
		/**titulek*/
		title?: string|null;
		/**titulek*/
		titleNovy?: string|null;
		/**soutež*/
		sou_dgr?: string|null;
		/**txt*/
		sou_dgr_txt?: string|null;
		/**nazrozVisible*/
		nazrozVisible?: boolean|null;
		/**c_schvSave*/
		c_schvSave?: JsonDecimal|null;
		/**ixsPriNadSave*/
		ixsPriNadSave?: string|null;
		/**em_cVisible*/
		em_cVisible?: boolean|null;
		/**em_cVisible*/
		st_cVisible?: boolean|null;
		/**em_cEnable*/
		em_cEnabled?: boolean|null;
		/**em_cEnable*/
		st_cEnabled?: boolean|null;
		vlastnik?: string|null;
		/**editovatelné?*/
		readOnly?: boolean|null;
		/**stavPuv*/
		stavPuv?: number|null;
		/**nadtyp soutěže*/
		nadTypSou?: number|null;
		labelCNav05?: string|null;
		labelLhuPod05?: string|null;
		/**disableDatVyhl*/
		disableDatVyhl05?: boolean|null;
		/**disableCentrAdr*/
		disableCentrAdr05?: boolean|null;
		/**počet záznamů pro .....*/
		pro2625?: number|null;
		/**nevím, nějaká další sračka*/
		special_special?: boolean|null;
		/**stavButton*/
		stavButton?: number|null;
		/**na subjektu je vidět moje políčko ixsEsu stejně tak jakési st_kos*/
		ixsEsuVVisible?: boolean|null;
		/**příznak*/
		prizVyz?: boolean|null;
		/**nějaký Label - 2. datumové pole na subjektu*/
		text03?: string|null;
		/**dat_kos_sav*/
		dat_kos_sav?: JsonDate|null;
		/**dat_real_sav*/
		dat_real_sav?: JsonDate|null;
		/**dat_sml_sav*/
		dat_sml_sav?: JsonDate|null;
		/**dat_uza_sav*/
		dat_uza_sav?: JsonDate|null;
		/**dat_zad_sav*/
		dat_zad_sav?: JsonDate|null;
		/**dat_uzaS_sav*/
		dat_uzaS_sav?: JsonDate|null;
		/**příznak Frs*/
		prizFrs?: boolean|null;
		/**příznak needPop*/
		needPop?: boolean|null;
		/**limit pro dat_s_lhu a dat_z_lhu_*/
		dat_lhu_limit?: JsonDate|null;
		/**navýšení/snížení up/down*/
		dat_lhu_mod?: string|null;
		/**Částka c_neut*/
		c_esuNeut?: JsonDecimal|null;
		/**nastavit přeblokování*/
		nastavCPreblok?: boolean|null;
		/**nastavit hrom.schvál. položek*/
		priz_schHromPol?: boolean|null;
		/**Částka k přeblokování*/
		c_kprebl?: JsonDecimal|null;
		/**nastavit vyberEsu*/
		nastavVyberEsu?: boolean|null;
		/**seznam Esu*/
		vyberEsu?: Gordic.Evz.Interface.GSelEsuDto[]|null;
		/**zeptat se na části VZ?*/
		dotazCasti?: boolean|null;
		/**provést aktualizace částí VZ?*/
		provestCasti?: boolean|null;
		/**provést odschválení*/
		odschval?: boolean|null;
		/**stav před odschválení*/
		saveStav?: number|null;
		/**odu_visible*/
		zalozka_odu_visible?: boolean|null;
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
		/**readonly rozšířené informace*/
		readOnlyRI?: boolean|null;
		/**readonly identifikace VZ*/
		readOnlyIVZ?: boolean|null;
		/**priz_nabedo*/
		priz_nabedo?: number|null;
		/**duvodStorno*/
		duvodStorno?: string|null;
		/**akce*/
		akce?: string|null;
	}
	const enum GParamsDetailDtoNames { cisZakSb = "cisZakSb", ixs_soudgr = "ixs_soudgr", nadTyp1 = "nadTyp1", nadTyp2 = "nadTyp2", nadTyp3 = "nadTyp3", cbSch_visible = "cbSch_visible", open = "open", open2 = "open2", title = "title", titleNovy = "titleNovy", sou_dgr = "sou_dgr", sou_dgr_txt = "sou_dgr_txt", nazrozVisible = "nazrozVisible", c_schvSave = "c_schvSave", ixsPriNadSave = "ixsPriNadSave", em_cVisible = "em_cVisible", st_cVisible = "st_cVisible", em_cEnabled = "em_cEnabled", st_cEnabled = "st_cEnabled", vlastnik = "vlastnik", readOnly = "readOnly", stavPuv = "stavPuv", nadTypSou = "nadTypSou", labelCNav05 = "labelCNav05", labelLhuPod05 = "labelLhuPod05", disableDatVyhl05 = "disableDatVyhl05", disableCentrAdr05 = "disableCentrAdr05", pro2625 = "pro2625", special_special = "special_special", stavButton = "stavButton", ixsEsuVVisible = "ixsEsuVVisible", prizVyz = "prizVyz", text03 = "text03", dat_kos_sav = "dat_kos_sav", dat_real_sav = "dat_real_sav", dat_sml_sav = "dat_sml_sav", dat_uza_sav = "dat_uza_sav", dat_zad_sav = "dat_zad_sav", dat_uzaS_sav = "dat_uzaS_sav", prizFrs = "prizFrs", needPop = "needPop", dat_lhu_limit = "dat_lhu_limit", dat_lhu_mod = "dat_lhu_mod", c_esuNeut = "c_esuNeut", nastavCPreblok = "nastavCPreblok", priz_schHromPol = "priz_schHromPol", c_kprebl = "c_kprebl", nastavVyberEsu = "nastavVyberEsu", vyberEsu = "vyberEsu", dotazCasti = "dotazCasti", provestCasti = "provestCasti", odschval = "odschval", saveStav = "saveStav", zalozka_odu_visible = "zalozka_odu_visible", sablona = "sablona", acAgMaska = "acAgMaska", toolTipProPP = "toolTipProPP", savePP = "savePP", saveIxsCia = "saveIxsCia", readOnlyRI = "readOnlyRI", readOnlyIVZ = "readOnlyIVZ", priz_nabedo = "priz_nabedo", duvodStorno = "duvodStorno", akce = "akce",}
	const enum GParamsDetailDtoFragments { cisZakSb = "*", ixs_soudgr = "*", nadTyp1 = "*", nadTyp2 = "*", nadTyp3 = "*", cbSch_visible = "*", open = "*", open2 = "*", title = "*", titleNovy = "*", sou_dgr = "*", sou_dgr_txt = "*", nazrozVisible = "*", c_schvSave = "*", ixsPriNadSave = "*", em_cVisible = "*", st_cVisible = "*", em_cEnabled = "*", st_cEnabled = "*", vlastnik = "*", readOnly = "*", stavPuv = "*", nadTypSou = "*", labelCNav05 = "*", labelLhuPod05 = "*", disableDatVyhl05 = "*", disableCentrAdr05 = "*", pro2625 = "*", special_special = "*", stavButton = "*", ixsEsuVVisible = "*", prizVyz = "*", text03 = "*", dat_kos_sav = "*", dat_real_sav = "*", dat_sml_sav = "*", dat_uza_sav = "*", dat_zad_sav = "*", dat_uzaS_sav = "*", prizFrs = "*", needPop = "*", dat_lhu_limit = "*", dat_lhu_mod = "*", c_esuNeut = "*", nastavCPreblok = "*", priz_schHromPol = "*", c_kprebl = "*", nastavVyberEsu = "*", vyberEsu = "*", dotazCasti = "*", provestCasti = "*", odschval = "*", saveStav = "*", zalozka_odu_visible = "*", sablona = "*", acAgMaska = "*", toolTipProPP = "*", savePP = "*", saveIxsCia = "*", readOnlyRI = "*", readOnlyIVZ = "*", priz_nabedo = "*", duvodStorno = "*", akce = "*",}
	const enum GParamsDetailDtoTypes { cisZakSb = "number", ixs_soudgr = "string", nadTyp1 = "number", nadTyp2 = "number", nadTyp3 = "number", cbSch_visible = "boolean", open = "string", open2 = "string", title = "string", titleNovy = "string", sou_dgr = "string", sou_dgr_txt = "string", nazrozVisible = "boolean", c_schvSave = "JsonDecimal", ixsPriNadSave = "string", em_cVisible = "boolean", st_cVisible = "boolean", em_cEnabled = "boolean", st_cEnabled = "boolean", vlastnik = "string", readOnly = "boolean", stavPuv = "number", nadTypSou = "number", labelCNav05 = "string", labelLhuPod05 = "string", disableDatVyhl05 = "boolean", disableCentrAdr05 = "boolean", pro2625 = "number", special_special = "boolean", stavButton = "number", ixsEsuVVisible = "boolean", prizVyz = "boolean", text03 = "string", dat_kos_sav = "JsonDate", dat_real_sav = "JsonDate", dat_sml_sav = "JsonDate", dat_uza_sav = "JsonDate", dat_zad_sav = "JsonDate", dat_uzaS_sav = "JsonDate", prizFrs = "boolean", needPop = "boolean", dat_lhu_limit = "JsonDate", dat_lhu_mod = "string", c_esuNeut = "JsonDecimal", nastavCPreblok = "boolean", priz_schHromPol = "boolean", c_kprebl = "JsonDecimal", nastavVyberEsu = "boolean", vyberEsu = "Gordic.Evz.Interface.GSelEsuDto[]", dotazCasti = "boolean", provestCasti = "boolean", odschval = "boolean", saveStav = "number", zalozka_odu_visible = "boolean", sablona = "string", acAgMaska = "string", toolTipProPP = "string", savePP = "string", saveIxsCia = "string", readOnlyRI = "boolean", readOnlyIVZ = "boolean", priz_nabedo = "number", duvodStorno = "string", akce = "string",}
	const enum GParamsDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GPkrskmd.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:pkrskmd*/
	interface GPkrskmdDto {
		/**id_kmd*/
		id_kmd?: string|null;
		/**nazev_kmd*/
		nazev_kmd?: string|null;
		/**parentId*/
		parentId?: string|null;
		/**parentId*/
		dalsiUroven?: boolean|null;
		/**parentId*/
		Uroven?: number|null;
	}
	const enum GPkrskmdDtoNames { id_kmd = "id_kmd", nazev_kmd = "nazev_kmd", parentId = "parentId", dalsiUroven = "dalsiUroven", Uroven = "Uroven",}
	const enum GPkrskmdDtoFragments { id_kmd = "*", nazev_kmd = "*", parentId = "*", dalsiUroven = "*", Uroven = "*",}
	const enum GPkrskmdDtoTypes { id_kmd = "string", nazev_kmd = "string", parentId = "string", dalsiUroven = "boolean", Uroven = "number",}
	const enum GPkrskmdDtoTypeLengths { id_kmd = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GSelEsu.Dto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DTO pro výběr ixs_esu*/
	interface GSelEsuDto {
		/**por_cis_nab*/
		por_cis_nab?: number|null;
		/**ob_jmeno*/
		ob_jmeno?: string|null;
	}
	const enum GSelEsuDtoNames { por_cis_nab = "por_cis_nab", ob_jmeno = "ob_jmeno",}
	const enum GSelEsuDtoFragments { por_cis_nab = "*", ob_jmeno = "*",}
	const enum GSelEsuDtoTypes { por_cis_nab = "number", ob_jmeno = "string",}
	const enum GSelEsuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GUchazeciDto.d.ts 

declare namespace Gordic.Evz.Interface {
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
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Detail.priz_nabedo*/
		priz_nabedo?: number|null;
		/**název PO*/
		nazev?: string|null;
		/**DBCOLUMN:Detail.s_po*/
		s_vz?: number|null;
		/**s_po_txt PO*/
		s_vz_txt?: string|null;
		/**soutez*/
		soutez?: string|null;
		/**soutez_txt*/
		soutez_txt?: string|null;
		uzo?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac_ver_zak?: string|null;
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
		/**DBCOLUMN:popis*/
		s_jis?: number|null;
		/**DBCOLUMN:popis*/
		s_jis_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_jis*/
		dat_jis?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_lhu_pod*/
		dat_lhu_pod?: JsonDate|null;
		/**DBCOLUMN:misto_pod*/
		misto_pod?: string|null;
		/**DBCOLUMN:zpu_pod*/
		zpu_pod?: number|null;
		/**DBCOLUMN:zpu_pod_txt*/
		zpu_pod_txt?: string|null;
		/**DBCOLUMN:vs_dzd*/
		vs_dzd?: string|null;
		/**DBCOLUMN:vs_dzd*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:zpu_pod*/
		pocet?: number|null;
		rc?: string|null;
		dic?: string|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		dan_typ?: number|null;
		dan_typ_txt?: string|null;
		ixs_fun_akt?: string|null;
		vlastnik?: boolean|null;
	}
	const enum GUchazeciDtoNames { ixs_esu = "ixs_esu", dat_pre_nab = "dat_pre_nab", por_cis_nab = "por_cis_nab", nazev_rf = "nazev_rf", ixs_esu_txt = "ixs_esu_txt", ixs_pri = "ixs_pri", dat_pri = "dat_pri", priz_nabedo = "priz_nabedo", nazev = "nazev", s_vz = "s_vz", s_vz_txt = "s_vz_txt", soutez = "soutez", soutez_txt = "soutez_txt", uzo = "uzo", ac_ver_zak = "ac_ver_zak", ac_ag = "ac_ag", cis_por = "cis_por", s_ess_txt = "s_ess_txt", dat_vyz = "dat_vyz", dat_vys = "dat_vys", dat_zmena = "dat_zmena", ico_esu = "ico_esu", s_ess = "s_ess", pr_forma = "pr_forma", pr_forma_txt = "pr_forma_txt", bu_ci_txt = "bu_ci_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", ixp_nab = "ixp_nab", c_nav = "c_nav", jmeno = "jmeno", prijmeni = "prijmeni", popis = "popis", ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", rok_zal = "rok_zal", s_jis = "s_jis", s_jis_txt = "s_jis_txt", dat_jis = "dat_jis", dat_lhu_pod = "dat_lhu_pod", misto_pod = "misto_pod", zpu_pod = "zpu_pod", zpu_pod_txt = "zpu_pod_txt", vs_dzd = "vs_dzd", c_nav_bez = "c_nav_bez", pocet = "pocet", rc = "rc", dic = "dic", vlastnosti = "vlastnosti", dan_typ = "dan_typ", dan_typ_txt = "dan_typ_txt", ixs_fun_akt = "ixs_fun_akt", vlastnik = "vlastnik",}
	const enum GUchazeciDtoFragments { ixs_esu = "*", dat_pre_nab = "*", por_cis_nab = "*", nazev_rf = "*", ixs_esu_txt = "*", ixs_pri = "*", dat_pri = "*", priz_nabedo = "*", nazev = "*", s_vz = "*", s_vz_txt = "*", soutez = "*", soutez_txt = "*", uzo = "*", ac_ver_zak = "*", ac_ag = "*", cis_por = "*", s_ess_txt = "*", dat_vyz = "*", dat_vys = "*", dat_zmena = "*", ico_esu = "*", s_ess = "*", pr_forma = "*", pr_forma_txt = "*", bu_ci_txt = "*", bu_ci = "*", sk_ci = "*", ixp_nab = "*", c_nav = "*", jmeno = "*", prijmeni = "*", popis = "*", ixp_den = "*", ixp_den_txt = "*", rok_zal = "*", s_jis = "*", s_jis_txt = "*", dat_jis = "*", dat_lhu_pod = "*", misto_pod = "*", zpu_pod = "*", zpu_pod_txt = "*", vs_dzd = "*", c_nav_bez = "*", pocet = "*", rc = "*", dic = "*", vlastnosti = "*", dan_typ = "*", dan_typ_txt = "*", ixs_fun_akt = "*", vlastnik = "*",}
	const enum GUchazeciDtoTypes { ixs_esu = "string", dat_pre_nab = "JsonDate", por_cis_nab = "number", nazev_rf = "string", ixs_esu_txt = "string", ixs_pri = "string", dat_pri = "JsonDate", priz_nabedo = "number", nazev = "string", s_vz = "number", s_vz_txt = "string", soutez = "string", soutez_txt = "string", uzo = "string", ac_ver_zak = "string", ac_ag = "string", cis_por = "number", s_ess_txt = "string", dat_vyz = "JsonDate", dat_vys = "JsonDate", dat_zmena = "JsonDate", ico_esu = "string", s_ess = "number", pr_forma = "string", pr_forma_txt = "string", bu_ci_txt = "string", bu_ci = "string", sk_ci = "string", ixp_nab = "string", c_nav = "JsonDecimal", jmeno = "string", prijmeni = "string", popis = "string", ixp_den = "string", ixp_den_txt = "string", rok_zal = "number", s_jis = "number", s_jis_txt = "string", dat_jis = "JsonDate", dat_lhu_pod = "JsonDate", misto_pod = "string", zpu_pod = "number", zpu_pod_txt = "string", vs_dzd = "string", c_nav_bez = "JsonDecimal", pocet = "number", rc = "string", dic = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", dan_typ = "number", dan_typ_txt = "string", ixs_fun_akt = "string", vlastnik = "boolean",}
	const enum GUchazeciDtoTypeLengths { ixs_esu = 12, ixs_esu_txt = 254, ixs_pri = 12, ac_ver_zak = 20, ac_ag = 20, s_ess_txt = 50, pr_forma = 3, bu_ci = 34, sk_ci = 11, ixp_nab = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GVepsevzDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DTO pro Vepsevz*/
	interface GVepsevzDto {
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ico*/
		ico?: string|null;
		/**cislo*/
		cislo?: string|null;
		/**ixs_poz*/
		ixs_poz?: string|null;
		/**skp*/
		skp?: string|null;
		/**mat_cis*/
		mat_cis?: string|null;
		/**nazev_skp*/
		nazev_skp?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**mj*/
		mj?: string|null;
		/**vyr_cis*/
		vyr_cis?: string|null;
		/**kod_pol*/
		kod_pol?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**nks_zad*/
		nks_zad?: string|null;
		/**inv_cis*/
		inv_cis?: string|null;
		/**popis*/
		popis?: string|null;
		/**ixs_dup*/
		ixs_dup?: string|null;
		/**ixs_dup_txt*/
		ixs_dup_txt?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**rok*/
		rok?: number|null;
		/**skupina_id*/
		skupina_id?: number|null;
		/**drh_id*/
		drh_id?: number|null;
		/**duvod_poz*/
		duvod_poz?: number|null;
		/**drh_poz*/
		drh_poz?: number|null;
		/**znam*/
		znam?: number|null;
		/**vp_stav*/
		vp_stav?: number|null;
		/**vp_stav_nazev*/
		vp_stav_txt?: string|null;
		/**cis_plan*/
		cis_plan?: number|null;
		/**cis_vz*/
		cis_vz?: number|null;
		/**cis_poz*/
		cis_poz?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**m_vz_sml*/
		m_vz_sml?: JsonDecimal|null;
		/**m_vz*/
		mnozstvi?: JsonDecimal|null;
		/**m_vz_obj_sml*/
		m_vz_obj_sml?: JsonDecimal|null;
		/**m_fak*/
		m_fak?: JsonDecimal|null;
		/**m_maj*/
		m_maj?: JsonDecimal|null;
		/**c_vz_sml*/
		c_vz_sml?: JsonDecimal|null;
		/**c_vz*/
		castka?: JsonDecimal|null;
		/**c_vz_obj_sml*/
		c_vz_obj_sml?: JsonDecimal|null;
		/**c_fak*/
		c_fak?: JsonDecimal|null;
		/**c_maj*/
		c_maj?: JsonDecimal|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Evz.Interface.GVepsevzPermissions|null;
	}
	const enum GVepsevzDtoNames { zmenu_prov = "zmenu_prov", ixs_pri = "ixs_pri", ico = "ico", cislo = "cislo", ixs_poz = "ixs_poz", skp = "skp", mat_cis = "mat_cis", nazev_skp = "nazev_skp", nazev = "nazev", mj = "mj", vyr_cis = "vyr_cis", kod_pol = "kod_pol", ucs = "ucs", nks = "nks", nks_zad = "nks_zad", inv_cis = "inv_cis", popis = "popis", ixs_dup = "ixs_dup", ixs_dup_txt = "ixs_dup_txt", aktivita = "aktivita", rok = "rok", skupina_id = "skupina_id", drh_id = "drh_id", duvod_poz = "duvod_poz", drh_poz = "drh_poz", znam = "znam", vp_stav = "vp_stav", vp_stav_txt = "vp_stav_txt", cis_plan = "cis_plan", cis_vz = "cis_vz", cis_poz = "cis_poz", dat_zmena = "dat_zmena", m_vz_sml = "m_vz_sml", mnozstvi = "mnozstvi", m_vz_obj_sml = "m_vz_obj_sml", m_fak = "m_fak", m_maj = "m_maj", c_vz_sml = "c_vz_sml", castka = "castka", c_vz_obj_sml = "c_vz_obj_sml", c_fak = "c_fak", c_maj = "c_maj", Permissions = "Permissions",}
	const enum GVepsevzDtoFragments { zmenu_prov = "*", ixs_pri = "*", ico = "*", cislo = "*", ixs_poz = "*", skp = "*", mat_cis = "*", nazev_skp = "*", nazev = "*", mj = "*", vyr_cis = "*", kod_pol = "*", ucs = "*", nks = "*", nks_zad = "*", inv_cis = "*", popis = "*", ixs_dup = "*", ixs_dup_txt = "*", aktivita = "*", rok = "*", skupina_id = "*", drh_id = "*", duvod_poz = "*", drh_poz = "*", znam = "*", vp_stav = "*", vp_stav_txt = "*", cis_plan = "*", cis_vz = "*", cis_poz = "*", dat_zmena = "*", m_vz_sml = "*", mnozstvi = "*", m_vz_obj_sml = "*", m_fak = "*", m_maj = "*", c_vz_sml = "*", castka = "*", c_vz_obj_sml = "*", c_fak = "*", c_maj = "*", Permissions = "*",}
	const enum GVepsevzDtoTypes { zmenu_prov = "string", ixs_pri = "string", ico = "string", cislo = "string", ixs_poz = "string", skp = "string", mat_cis = "string", nazev_skp = "string", nazev = "string", mj = "string", vyr_cis = "string", kod_pol = "string", ucs = "string", nks = "string", nks_zad = "string", inv_cis = "string", popis = "string", ixs_dup = "string", ixs_dup_txt = "string", aktivita = "number", rok = "number", skupina_id = "number", drh_id = "number", duvod_poz = "number", drh_poz = "number", znam = "number", vp_stav = "number", vp_stav_txt = "string", cis_plan = "number", cis_vz = "number", cis_poz = "number", dat_zmena = "JsonDate", m_vz_sml = "JsonDecimal", mnozstvi = "JsonDecimal", m_vz_obj_sml = "JsonDecimal", m_fak = "JsonDecimal", m_maj = "JsonDecimal", c_vz_sml = "JsonDecimal", castka = "JsonDecimal", c_vz_obj_sml = "JsonDecimal", c_fak = "JsonDecimal", c_maj = "JsonDecimal", Permissions = "Gordic.Evz.Interface.GVepsevzPermissions",}
	const enum GVepsevzDtoTypeLengths {}
	/**Permissions pro věcný profil*/
	interface GVepsevzPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lzeNovy*/
		lzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**lzeEvidovat*/
		lzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**lzeSchvalit*/
		lzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**lzeStornovat*/
		lzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lzeZrusitStorno*/
		lzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**lzeDetail*/
		lzeDetail: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GVepsevzPermissionsNames { lzeNovy = "lzeNovy", lzeEvidovat = "lzeEvidovat", lzeSchvalit = "lzeSchvalit", lzeStornovat = "lzeStornovat", lzeZrusitStorno = "lzeZrusitStorno", lzeDetail = "lzeDetail",}
	const enum GVepsevzPermissionsFragments { lzeNovy = "*", lzeEvidovat = "*", lzeSchvalit = "*", lzeStornovat = "*", lzeZrusitStorno = "*", lzeDetail = "*",}
	const enum GVepsevzPermissionsTypes { lzeNovy = "Gordic.General.ApplicationInterface.GPermission", lzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", lzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", lzeStornovat = "Gordic.General.ApplicationInterface.GPermission", lzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", lzeDetail = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GVepsevzPermissionsTypeLengths {}
	/**Dto prohromadné úpravy VP*/
	interface GVepsevzMassUpsertDto {
		/**List s dto věcného profilu*/
		dtos?: Gordic.Evz.Interface.GVepsevzDto[]|null;
		/**Typ požadované operace - 30,90,91/schválit,stornovat,zrušitStorno*/
		operace?: number|null;
	}
	const enum GVepsevzMassUpsertDtoNames { dtos = "dtos", operace = "operace",}
	const enum GVepsevzMassUpsertDtoFragments { dtos = "*", operace = "*",}
	const enum GVepsevzMassUpsertDtoTypes { dtos = "Gordic.Evz.Interface.GVepsevzDto[]", operace = "number",}
	const enum GVepsevzMassUpsertDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.GVyberKtgTypNovaVzDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Dto pro výběr ktg_typ*/
	interface GVyberKtgTypNovaVZDto {
		dotaz?: string|null;
		/**ano*/
		ktgAno?: number|null;
		/**ne*/
		ktgNe?: number|null;
	}
	const enum GVyberKtgTypNovaVZDtoNames { dotaz = "dotaz", ktgAno = "ktgAno", ktgNe = "ktgNe",}
	const enum GVyberKtgTypNovaVZDtoFragments { dotaz = "*", ktgAno = "*", ktgNe = "*",}
	const enum GVyberKtgTypNovaVZDtoTypes { dotaz = "string", ktgAno = "number", ktgNe = "number",}
	const enum GVyberKtgTypNovaVZDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.SeznamDokumentuEvzDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:Seznam*/
	interface SeznamDokumentuEvzDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
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
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real_nazev?: string|null;
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
		/**DBCOLUMN:Seznam.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Seznam.priz_sip*/
		priz_sip?: number|null;
		/**DBCOLUMN:Seznam.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_sip_txt*/
		priz_sip_txt?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_zve_txt*/
		cis_zve_txt?: string|null;
		/**DBCOLUMN:Seznam.regi_list_txt*/
		regi_list_txt?: string|null;
		/**DBCOLUMN:Seznam.stan_jak_txt*/
		stan_jak_txt?: string|null;
		/**DBCOLUMN:Seznam.stan_svr_txt*/
		stan_svr_txt?: string|null;
		/**DBCOLUMN:Seznam.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_sslstyp*/
		nazev_sslstyp?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.cis_ob_v*/
		cis_ob_v?: string|null;
		/**DBCOLUMN:Seznam.centr_adr*/
		centr_adr?: string|null;
		/**DBCOLUMN:Seznam.dat_s_lhu*/
		dat_s_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_z_lhu*/
		dat_z_lhu?: JsonDate|null;
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
		/**DBCOLUMN:Seznam.c_jistina*/
		c_jistina?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.prijal*/
		prijal?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.evz_stav_txt*/
		evz_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ixp_den_evzspac*/
		ixp_den_evzspac?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.evz_stav*/
		evz_stav?: number|null;
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
		je_fin?: number|null;
		/**DBCOLUMN:Seznam.esu_ico*/
		esu_ico?: string|null;
		/**DBCOLUMN:Seznam.esu_rc*/
		esu_rc?: string|null;
		/**DBCOLUMN:Seznam.esu_dic*/
		esu_dic?: string|null;
		/**DBCOLUMN:Seznam.zda_sml*/
		zda_sml?: number|null;
		/**stav*/
		stav?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**kont_osoba*/
		kont_osoba?: string|null;
		/**DBCOLUMN:Seznam.e_ess*/
		e_ess?: number|null;
		/**DBCOLUMN:Seznam.e_ess_txt*/
		e_ess_txt?: string|null;
		/**priz_elp*/
		priz_elp?: number|null;
	}
	const enum SeznamDokumentuEvzDtoNames { ixp = "ixp", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", cis_real_nazev = "cis_real_nazev", ixs_fun_komp = "ixs_fun_komp", dat_prij_pod = "dat_prij_pod", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", popis = "popis", dat_pis = "dat_pis", ixs_pri = "ixs_pri", ac_ver_zak = "ac_ver_zak", nazev = "nazev", soutez = "soutez", cis_por = "cis_por", rezim_pri = "rezim_pri", priz_sip = "priz_sip", rezim_pri_txt = "rezim_pri_txt", pri_pri_txt = "pri_pri_txt", priz_sip_txt = "priz_sip_txt", c = "c", ixs_krk = "ixs_krk", dat_zad_p = "dat_zad_p", dat_sml_p = "dat_sml_p", dat_kos_p = "dat_kos_p", dat_real_p = "dat_real_p", dat_uza_p = "dat_uza_p", cis_duz_txt = "cis_duz_txt", cis_ner_txt = "cis_ner_txt", cis_zve_txt = "cis_zve_txt", regi_list_txt = "regi_list_txt", stan_jak_txt = "stan_jak_txt", stan_svr_txt = "stan_svr_txt", schv_spec_txt = "schv_spec_txt", nazev_sslstyp = "nazev_sslstyp", nazev_rf = "nazev_rf", cis_ob_v = "cis_ob_v", centr_adr = "centr_adr", dat_s_lhu = "dat_s_lhu", dat_z_lhu = "dat_z_lhu", dat_p_lhu = "dat_p_lhu", bu_vl = "bu_vl", sk_vl = "sk_vl", ks = "ks", vs = "vs", ss = "ss", c_jistina = "c_jistina", ixs_esu = "ixs_esu", por_cis_nab = "por_cis_nab", prijal = "prijal", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", evz_stav_txt = "evz_stav_txt", ixp_den = "ixp_den", ixp_den_evzspac = "ixp_den_evzspac", ac_ag = "ac_ag", evz_stav = "evz_stav", priznak = "priznak", soubor = "soubor", popis_wflsixb = "popis_wflsixb", velikost = "velikost", ixb = "ixb", dz_file = "dz_file", dat_modify = "dat_modify", tmp_file = "tmp_file", typ_otevreni = "typ_otevreni", dat_zverejneni = "dat_zverejneni", zverejnil = "zverejnil", ktg_dms = "ktg_dms", otevren = "otevren", zamcen = "zamcen", modifikovan = "modifikovan", m_zamek = "m_zamek", m_vyber = "m_vyber", esu_naz = "esu_naz", jmeno = "jmeno", prijmeni = "prijmeni", je_fin = "je_fin", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_dic = "esu_dic", zda_sml = "zda_sml", stav = "stav", ukon = "ukon", kont_osoba = "kont_osoba", e_ess = "e_ess", e_ess_txt = "e_ess_txt", priz_elp = "priz_elp", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum SeznamDokumentuEvzDtoFragments { ixp = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", cis_real_nazev = "*", ixs_fun_komp = "*", dat_prij_pod = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", popis = "*", dat_pis = "*", ixs_pri = "*", ac_ver_zak = "*", nazev = "*", soutez = "*", cis_por = "*", rezim_pri = "*", priz_sip = "*", rezim_pri_txt = "*", pri_pri_txt = "*", priz_sip_txt = "*", c = "*", ixs_krk = "*", dat_zad_p = "*", dat_sml_p = "*", dat_kos_p = "*", dat_real_p = "*", dat_uza_p = "*", cis_duz_txt = "*", cis_ner_txt = "*", cis_zve_txt = "*", regi_list_txt = "*", stan_jak_txt = "*", stan_svr_txt = "*", schv_spec_txt = "*", nazev_sslstyp = "*", nazev_rf = "*", cis_ob_v = "*", centr_adr = "*", dat_s_lhu = "*", dat_z_lhu = "*", dat_p_lhu = "*", bu_vl = "*", sk_vl = "*", ks = "*", vs = "*", ss = "*", c_jistina = "*", ixs_esu = "*", por_cis_nab = "*", prijal = "*", dat_zmena = "*", zmenu_prov = "*", evz_stav_txt = "*", ixp_den = "*", ixp_den_evzspac = "*", ac_ag = "*", evz_stav = "*", priznak = "*", soubor = "*", popis_wflsixb = "*", velikost = "*", ixb = "*", dz_file = "*", dat_modify = "*", tmp_file = "*", typ_otevreni = "*", dat_zverejneni = "*", zverejnil = "*", ktg_dms = "*", otevren = "*", zamcen = "*", modifikovan = "*", m_zamek = "*", m_vyber = "*", esu_naz = "*", jmeno = "*", prijmeni = "*", je_fin = "*", esu_ico = "*", esu_rc = "*", esu_dic = "*", zda_sml = "*", stav = "*", ukon = "*", kont_osoba = "*", e_ess = "*", e_ess_txt = "*", priz_elp = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum SeznamDokumentuEvzDtoTypes { ixp = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", cis_real_nazev = "string", ixs_fun_komp = "string", dat_prij_pod = "JsonDate", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", popis = "string", dat_pis = "JsonDate", ixs_pri = "string", ac_ver_zak = "string", nazev = "string", soutez = "string", cis_por = "number", rezim_pri = "number", priz_sip = "number", rezim_pri_txt = "string", pri_pri_txt = "string", priz_sip_txt = "string", c = "JsonDecimal", ixs_krk = "string", dat_zad_p = "JsonDate", dat_sml_p = "JsonDate", dat_kos_p = "JsonDate", dat_real_p = "JsonDate", dat_uza_p = "JsonDate", cis_duz_txt = "string", cis_ner_txt = "string", cis_zve_txt = "string", regi_list_txt = "string", stan_jak_txt = "string", stan_svr_txt = "string", schv_spec_txt = "string", nazev_sslstyp = "string", nazev_rf = "string", cis_ob_v = "string", centr_adr = "string", dat_s_lhu = "JsonDate", dat_z_lhu = "JsonDate", dat_p_lhu = "JsonDate", bu_vl = "string", sk_vl = "string", ks = "string", vs = "string", ss = "string", c_jistina = "JsonDecimal", ixs_esu = "string", por_cis_nab = "number", prijal = "string", dat_zmena = "JsonDate", zmenu_prov = "string", evz_stav_txt = "string", ixp_den = "string", ixp_den_evzspac = "string", ac_ag = "string", evz_stav = "number", priznak = "number", soubor = "string", popis_wflsixb = "string", velikost = "number", ixb = "string", dz_file = "JsonDate", dat_modify = "JsonDate", tmp_file = "string", typ_otevreni = "number", dat_zverejneni = "JsonDate", zverejnil = "string", ktg_dms = "string", otevren = "number", zamcen = "number", modifikovan = "number", m_zamek = "number", m_vyber = "number", esu_naz = "string", jmeno = "string", prijmeni = "string", je_fin = "number", esu_ico = "string", esu_rc = "string", esu_dic = "string", zda_sml = "number", stav = "string", ukon = "string", kont_osoba = "string", e_ess = "number", e_ess_txt = "string", priz_elp = "number", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum SeznamDokumentuEvzDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ixs_typ = 12, popis = 254, ixs_pri = 12, ac_ver_zak = 30, nazev = 100, soutez = 30, rezim_pri_txt = 50, priz_sip_txt = 50, ixs_krk = 12, cis_duz_txt = 50, cis_ner_txt = 50, cis_zve_txt = 50, regi_list_txt = 50, stan_jak_txt = 50, stan_svr_txt = 50, schv_spec_txt = 50, nazev_sslstyp = 50, nazev_rf = 50, cis_ob_v = 12, centr_adr = 100, bu_vl = 34, sk_vl = 11, ks = 12, vs = 12, ss = 12, ixs_esu = 12, prijal = 30, zmenu_prov = 12, evz_stav_txt = 50, ixp_den = 12, ixp_den_evzspac = 12, ac_ag = 20, soubor = 254, popis_wflsixb = 50, ixb = 12, zverejnil = 12, ktg_dms = 50, esu_naz = 254, jmeno = 24, prijmeni = 36, esu_ico = 10, esu_rc = 10, esu_dic = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Gordic.Evz.Interface.SeznamEvzDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:SeznamEvz*/
	interface SeznamEvzDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:SeznamEvz.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:SeznamEvz.lic*/
		lic?: string|null;
		/**DBCOLUMN:SeznamEvz.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamEvz.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamEvz.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:SeznamEvz.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_real_nazev*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:SeznamEvz.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:SeznamEvz.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:SeznamEvz.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamEvz.s_vz_txt*/
		s_vz_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:SeznamEvz.uvo*/
		uvo?: string|null;
		/**DBCOLUMN:SeznamEvz.aat*/
		aat?: string|null;
		/**DBCOLUMN:SeznamEvz.soutez_txt*/
		soutez_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:SeznamEvz.s_sou_txt*/
		s_sou_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamEvz.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:SeznamEvz.c_jistina*/
		c_jistina?: JsonDecimal|null;
		/**DBCOLUMN:SeznamEvz.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_zvz*/
		dat_zvz?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:SeznamEvz.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.m_zamek*/
		m_zamek?: number|null;
		/**DBCOLUMN:SeznamEvz.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.poc_dokl*/
		poc_dokl?: number|null;
		/**DBCOLUMN:SeznamEvz.cis_dur_txt*/
		cis_dur_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_ner_txt*/
		cis_ner_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.pri_pri_txt*/
		pri_pri_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.regi_list_txt*/
		regi_list_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.stan_jak_txt*/
		stan_jak_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.stan_svr_txt*/
		stan_svr_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamEvz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamEvz.cj_vz*/
		cj_vz?: string|null;
		/**DBCOLUMN:SeznamEvz.zda_sml*/
		zda_sml?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:SeznamEvz.sta_sml*/
		sta_sml?: number|null;
		/**DBCOLUMN:SeznamEvz.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:SeznamEvz.priz_prip*/
		priz_prip_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:SeznamEvz.priz_view_txt*/
		priz_view_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:SeznamEvz.typ_fin_txt*/
		typ_fin_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_evzspac*/
		ixp_den_evzspac?: string|null;
		/**DBCOLUMN:SeznamEvz.ixp_den_evzspac_nazev*/
		ixp_den_evzspac_nazev?: string|null;
		/**DBCOLUMN:SeznamEvz.priz_view_all*/
		priz_view_all?: number|null;
		/**DBCOLUMN:SeznamEvz.cis_zakon*/
		cis_zakon?: number|null;
		/**DBCOLUMN:SeznamEvz.cis_zakon*/
		cis_zakon_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:SeznamEvz.lim_zac*/
		lim_zac_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:SeznamEvz.stav_epk*/
		stav_epk?: number|null;
		/**DBCOLUMN:SeznamEvz.stav_nov*/
		stav_nov?: number|null;
		/**DBCOLUMN:SeznamEvz.priz_revo*/
		priz_revo?: number|null;
		/**DBCOLUMN:SeznamEvz.priz_kort*/
		priz_kort?: number|null;
		/**DBCOLUMN:SeznamEvz.zda_revo*/
		zda_revo?: string|null;
		/**DBCOLUMN:SeznamEvz.zda_revo_p*/
		zda_revo_p?: number|null;
		/**DBCOLUMN:SeznamEvz.zda_kort*/
		zda_kort?: string|null;
		/**znak_s*/
		znak_s?: string|null;
		/**evz_stav*/
		evz_stav?: number|null;
		/**evz_stav_txt*/
		evz_stav_txt?: string|null;
		/**stav_ixp*/
		stav_ixp?: string|null;
		/**DBCOLUMN:SeznamEvz.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**DBCOLUMN:SeznamEvz.kont_osoba*/
		kont_osoba?: string|null;
		/**esu_naz*/
		esu_naz?: string|null;
		/**ukon*/
		ukon?: string|null;
		/**ukon_txt*/
		ukon_txt?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_dic*/
		esu_dic?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**s_ess*/
		s_ess?: number|null;
		/**s_ess_txt*/
		s_ess_txt?: string|null;
		/**jmeno*/
		jmeno?: string|null;
		/**prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.ixs_krk*/
		ixs_krk?: string|null;
		/**ixp*/
		ixp?: string|null;
	}
	const enum SeznamEvzDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", cis_real_nazev = "cis_real_nazev", ixs_fun_komp = "ixs_fun_komp", nazev_rf = "nazev_rf", nazev_ref = "nazev_ref", ixp_den_nazev = "ixp_den_nazev", ac_ver_zak = "ac_ver_zak", ac_ag = "ac_ag", nazev = "nazev", s_vz_txt = "s_vz_txt", soutez = "soutez", uvo = "uvo", aat = "aat", soutez_txt = "soutez_txt", cis_por = "cis_por", s_sou_txt = "s_sou_txt", rezim_pri_txt = "rezim_pri_txt", c = "c", c_plan = "c_plan", c_jistina = "c_jistina", dat_pis = "dat_pis", dat_prij_pod = "dat_prij_pod", dat_pri = "dat_pri", dat_zvz = "dat_zvz", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", m_vyber = "m_vyber", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", m_zamek = "m_zamek", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", poc_dokl = "poc_dokl", cis_dur_txt = "cis_dur_txt", cis_ner_txt = "cis_ner_txt", pri_pri_txt = "pri_pri_txt", regi_list_txt = "regi_list_txt", stan_jak_txt = "stan_jak_txt", stan_svr_txt = "stan_svr_txt", schv_spec_txt = "schv_spec_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cj_vz = "cj_vz", zda_sml = "zda_sml", ixp_den = "ixp_den", sta_sml = "sta_sml", priz_prip = "priz_prip", priz_prip_txt = "priz_prip_txt", priz_view = "priz_view", priz_view_txt = "priz_view_txt", typ_fin = "typ_fin", typ_fin_txt = "typ_fin_txt", ixp_den_evzspac = "ixp_den_evzspac", ixp_den_evzspac_nazev = "ixp_den_evzspac_nazev", priz_view_all = "priz_view_all", cis_zakon = "cis_zakon", cis_zakon_txt = "cis_zakon_txt", lim_zac = "lim_zac", lim_zac_txt = "lim_zac_txt", s_vz = "s_vz", stav_epk = "stav_epk", stav_nov = "stav_nov", priz_revo = "priz_revo", priz_kort = "priz_kort", zda_revo = "zda_revo", zda_revo_p = "zda_revo_p", zda_kort = "zda_kort", znak_s = "znak_s", evz_stav = "evz_stav", evz_stav_txt = "evz_stav_txt", stav_ixp = "stav_ixp", cis_duz_txt = "cis_duz_txt", kont_osoba = "kont_osoba", esu_naz = "esu_naz", ukon = "ukon", ukon_txt = "ukon_txt", esu_ico = "esu_ico", esu_dic = "esu_dic", esu_rc = "esu_rc", ixs_typ_txt = "ixs_typ_txt", ktg_typ = "ktg_typ", s_ess = "s_ess", s_ess_txt = "s_ess_txt", jmeno = "jmeno", prijmeni = "prijmeni", ixs_krk = "ixs_krk", ixp = "ixp", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum SeznamEvzDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", cis_real_nazev = "*", ixs_fun_komp = "*", nazev_rf = "*", nazev_ref = "*", ixp_den_nazev = "*", ac_ver_zak = "*", ac_ag = "*", nazev = "*", s_vz_txt = "*", soutez = "*", uvo = "*", aat = "*", soutez_txt = "*", cis_por = "*", s_sou_txt = "*", rezim_pri_txt = "*", c = "*", c_plan = "*", c_jistina = "*", dat_pis = "*", dat_prij_pod = "*", dat_pri = "*", dat_zvz = "*", dat_zad_p = "*", dat_zad_s = "*", dat_sml_p = "*", dat_sml_s = "*", dat_kos_p = "*", dat_kos_s = "*", m_vyber = "*", dat_real_p = "*", dat_real_s = "*", m_zamek = "*", dat_uza_p = "*", dat_uza_s = "*", poc_dokl = "*", cis_dur_txt = "*", cis_ner_txt = "*", pri_pri_txt = "*", regi_list_txt = "*", stan_jak_txt = "*", stan_svr_txt = "*", schv_spec_txt = "*", dat_zmena = "*", zmenu_prov = "*", cj_vz = "*", zda_sml = "*", ixp_den = "*", sta_sml = "*", priz_prip = "*", priz_prip_txt = "*", priz_view = "*", priz_view_txt = "*", typ_fin = "*", typ_fin_txt = "*", ixp_den_evzspac = "*", ixp_den_evzspac_nazev = "*", priz_view_all = "*", cis_zakon = "*", cis_zakon_txt = "*", lim_zac = "*", lim_zac_txt = "*", s_vz = "*", stav_epk = "*", stav_nov = "*", priz_revo = "*", priz_kort = "*", zda_revo = "*", zda_revo_p = "*", zda_kort = "*", znak_s = "*", evz_stav = "*", evz_stav_txt = "*", stav_ixp = "*", cis_duz_txt = "*", kont_osoba = "*", esu_naz = "*", ukon = "*", ukon_txt = "*", esu_ico = "*", esu_dic = "*", esu_rc = "*", ixs_typ_txt = "*", ktg_typ = "*", s_ess = "*", s_ess_txt = "*", jmeno = "*", prijmeni = "*", ixs_krk = "*", ixp = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum SeznamEvzDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", cis_real_nazev = "string", ixs_fun_komp = "string", nazev_rf = "string", nazev_ref = "string", ixp_den_nazev = "string", ac_ver_zak = "string", ac_ag = "string", nazev = "string", s_vz_txt = "string", soutez = "string", uvo = "string", aat = "string", soutez_txt = "string", cis_por = "number", s_sou_txt = "string", rezim_pri_txt = "string", c = "JsonDecimal", c_plan = "JsonDecimal", c_jistina = "JsonDecimal", dat_pis = "JsonDate", dat_prij_pod = "JsonDate", dat_pri = "JsonDate", dat_zvz = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", m_vyber = "number", dat_real_p = "JsonDate", dat_real_s = "JsonDate", m_zamek = "number", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", poc_dokl = "number", cis_dur_txt = "string", cis_ner_txt = "string", pri_pri_txt = "string", regi_list_txt = "string", stan_jak_txt = "string", stan_svr_txt = "string", schv_spec_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", cj_vz = "string", zda_sml = "string", ixp_den = "string", sta_sml = "number", priz_prip = "number", priz_prip_txt = "string", priz_view = "number", priz_view_txt = "string", typ_fin = "number", typ_fin_txt = "string", ixp_den_evzspac = "string", ixp_den_evzspac_nazev = "string", priz_view_all = "number", cis_zakon = "number", cis_zakon_txt = "string", lim_zac = "number", lim_zac_txt = "string", s_vz = "number", stav_epk = "number", stav_nov = "number", priz_revo = "number", priz_kort = "number", zda_revo = "string", zda_revo_p = "number", zda_kort = "string", znak_s = "string", evz_stav = "number", evz_stav_txt = "string", stav_ixp = "string", cis_duz_txt = "string", kont_osoba = "string", esu_naz = "string", ukon = "string", ukon_txt = "string", esu_ico = "string", esu_dic = "string", esu_rc = "string", ixs_typ_txt = "string", ktg_typ = "number", s_ess = "number", s_ess_txt = "string", jmeno = "string", prijmeni = "string", ixs_krk = "string", ixp = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum SeznamEvzDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, cis_real_nazev = 50, ixs_fun_komp = 12, nazev_rf = 50, nazev_ref = 50, ixp_den_nazev = 50, ac_ver_zak = 30, nazev = 100, s_vz_txt = 50, soutez = 30, soutez_txt = 50, s_sou_txt = 50, rezim_pri_txt = 50, cis_dur_txt = 50, cis_ner_txt = 50, pri_pri_txt = 50, regi_list_txt = 50, stan_jak_txt = 50, stan_svr_txt = 50, schv_spec_txt = 50, zmenu_prov = 12, cj_vz = 30, ixp_den = 12, priz_view_txt = 50, typ_fin_txt = 50, ixp_den_evzspac = 12, ixp_den_evzspac_nazev = 50, ixs_krk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Const\Gordic.Evz.Interface.GCastiVZConstDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Konstanty casti VZ*/
	interface GCastiVZConstDto {
		/**vlastnik*/
		vlastnik?: string|null;
		/**ixsFun*/
		ixsFun?: string|null;
		/**realizátor*/
		cisReal?: string|null;
		/**sVz*/
		sVz?: number|null;
		/**počet částí*/
		pocCasti?: number|null;
		/**částka*/
		cPred?: JsonDecimal|null;
	}
	const enum GCastiVZConstDtoNames { vlastnik = "vlastnik", ixsFun = "ixsFun", cisReal = "cisReal", sVz = "sVz", pocCasti = "pocCasti", cPred = "cPred",}
	const enum GCastiVZConstDtoFragments { vlastnik = "*", ixsFun = "*", cisReal = "*", sVz = "*", pocCasti = "*", cPred = "*",}
	const enum GCastiVZConstDtoTypes { vlastnik = "string", ixsFun = "string", cisReal = "string", sVz = "number", pocCasti = "number", cPred = "JsonDecimal",}
	const enum GCastiVZConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Const\Gordic.Evz.Interface.GDoporuceniConstDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Konstanty doporučení*/
	interface GDoporuceniConstDto {
		/**vlastnik*/
		vlastnik?: string|null;
		/**ixsFun*/
		ixsFun?: string|null;
	}
	const enum GDoporuceniConstDtoNames { vlastnik = "vlastnik", ixsFun = "ixsFun",}
	const enum GDoporuceniConstDtoFragments { vlastnik = "*", ixsFun = "*",}
	const enum GDoporuceniConstDtoTypes { vlastnik = "string", ixsFun = "string",}
	const enum GDoporuceniConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Const\Gordic.Evz.Interface.GKategorieConstDto - Copy.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Konstanty pro komise*/
	interface GKomiseConstDto {
		/**vlastnik*/
		vlastnik?: string|null;
		/**ixsFun*/
		ixsFun?: string|null;
		/**jeVprc*/
		jeVprc?: string|null;
	}
	const enum GKomiseConstDtoNames { vlastnik = "vlastnik", ixsFun = "ixsFun", jeVprc = "jeVprc",}
	const enum GKomiseConstDtoFragments { vlastnik = "*", ixsFun = "*", jeVprc = "*",}
	const enum GKomiseConstDtoTypes { vlastnik = "string", ixsFun = "string", jeVprc = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Dto\Const\Gordic.Evz.Interface.GKategorieConstDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Konstanty pro kategorie*/
	interface GKategorieConstDto {
		/**vlastnik*/
		vlastnik?: string|null;
		/**ixsFun*/
		ixsFun?: string|null;
		/**jeVprc*/
		jeVprc?: string|null;
	}
	const enum GKategorieConstDtoNames { vlastnik = "vlastnik", ixsFun = "ixsFun", jeVprc = "jeVprc",}
	const enum GKategorieConstDtoFragments { vlastnik = "*", ixsFun = "*", jeVprc = "*",}
	const enum GKategorieConstDtoTypes { vlastnik = "string", ixsFun = "string", jeVprc = "string",}
	const enum GKategorieConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcdzdDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcdzd*/
	interface GEvzcdzdDto {
		/**dis_zad*/
		dis_zad?: number|null;
		/**dis_zad_txt*/
		dis_zad_txt?: string|null;
	}
	const enum GEvzcdzdDtoNames { dis_zad = "dis_zad", dis_zad_txt = "dis_zad_txt",}
	const enum GEvzcdzdDtoFragments { dis_zad = "*", dis_zad_txt = "*",}
	const enum GEvzcdzdDtoTypes { dis_zad = "number", dis_zad_txt = "string",}
	const enum GEvzcdzdDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcevsDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcevs*/
	interface GEvzcevsDto {
		/**DBCOLUMN:evzcevs.evz_stav*/
		evz_stav?: number|null;
		/**DBCOLUMN:evzcevs.evz_stav_txt*/
		evz_stav_txt?: string|null;
		/**DBCOLUMN:evzcevs.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcevs.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcevsDtoNames { evz_stav = "evz_stav", evz_stav_txt = "evz_stav_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcevsDtoFragments { evz_stav = "*", evz_stav_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcevsDtoTypes { evz_stav = "number", evz_stav_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcevsDtoTypeLengths { evz_stav_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcjisDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcjis*/
	interface GEvzcjisDto {
		/**DBCOLUMN:evzcjis.s_jis*/
		s_jis?: number|null;
		/**DBCOLUMN:evzcjis.s_jis_txt*/
		s_jis_txt?: string|null;
		/**DBCOLUMN:evzcjis.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcjis.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcjisDtoNames { s_jis = "s_jis", s_jis_txt = "s_jis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcjisDtoFragments { s_jis = "*", s_jis_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcjisDtoTypes { s_jis = "number", s_jis_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcjisDtoTypeLengths { s_jis_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzckriDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzckri*/
	interface GEvzckriDto {
		/**DBCOLUMN:evzckri.cis_kri*/
		cis_kri?: number|null;
		/**DBCOLUMN:evzckri.cis_kri_txt*/
		cis_kri_txt?: string|null;
		/**zakon*/
		zakon?: number|null;
		/**soutez*/
		soutez?: string|null;
	}
	const enum GEvzckriDtoNames { cis_kri = "cis_kri", cis_kri_txt = "cis_kri_txt", zakon = "zakon", soutez = "soutez",}
	const enum GEvzckriDtoFragments { cis_kri = "*", cis_kri_txt = "*", zakon = "*", soutez = "*",}
	const enum GEvzckriDtoTypes { cis_kri = "number", cis_kri_txt = "string", zakon = "number", soutez = "string",}
	const enum GEvzckriDtoTypeLengths { cis_kri_txt = 50, soutez = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzclimDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzclim*/
	interface GEvzclimDto {
		/**DBCOLUMN:evzclim.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:evzclim.lim_zac_txt*/
		lim_zac_txt?: string|null;
		/**cis_zakon*/
		cis_zakon?: number|null;
	}
	const enum GEvzclimDtoNames { lim_zac = "lim_zac", lim_zac_txt = "lim_zac_txt", cis_zakon = "cis_zakon",}
	const enum GEvzclimDtoFragments { lim_zac = "*", lim_zac_txt = "*", cis_zakon = "*",}
	const enum GEvzclimDtoTypes { lim_zac = "number", lim_zac_txt = "string", cis_zakon = "number",}
	const enum GEvzclimDtoTypeLengths { lim_zac_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcpruDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcpru*/
	interface GEvzcpruDto {
		/**DBCOLUMN:evzcpru.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:evzcpru.pred_urc_txt*/
		pred_urc_txt?: string|null;
		/**DBCOLUMN:evzcpru.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcpru.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:cis_zakon*/
		cis_zakon?: number|null;
	}
	const enum GEvzcpruDtoNames { pred_urc = "pred_urc", pred_urc_txt = "pred_urc_txt", k_v = "k_v", k_s = "k_s", cis_zakon = "cis_zakon",}
	const enum GEvzcpruDtoFragments { pred_urc = "*", pred_urc_txt = "*", k_v = "*", k_s = "*", cis_zakon = "*",}
	const enum GEvzcpruDtoTypes { pred_urc = "number", pred_urc_txt = "string", k_v = "number", k_s = "string", cis_zakon = "number",}
	const enum GEvzcpruDtoTypeLengths { pred_urc_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcregDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcreg*/
	interface GEvzcregDto {
		/**DBCOLUMN:evzcreg.regi_list*/
		regi_list?: number|null;
		/**DBCOLUMN:evzcreg.regi_list_txt*/
		regi_list_txt?: string|null;
		/**DBCOLUMN:evzcreg.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcreg.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcregDtoNames { regi_list = "regi_list", regi_list_txt = "regi_list_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcregDtoFragments { regi_list = "*", regi_list_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcregDtoTypes { regi_list = "number", regi_list_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcregDtoTypeLengths { regi_list_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcspeDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcspe*/
	interface GEvzcspeDto {
		/**DBCOLUMN:evzcspe.schv_spec*/
		schv_spec?: number|null;
		/**DBCOLUMN:evzcspe.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:evzcspe.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcspe.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcspeDtoNames { schv_spec = "schv_spec", schv_spec_txt = "schv_spec_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcspeDtoFragments { schv_spec = "*", schv_spec_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcspeDtoTypes { schv_spec = "number", schv_spec_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcspeDtoTypeLengths { schv_spec_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcssoDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcsso*/
	interface GEvzcssoDto {
		/**DBCOLUMN:evzcsso.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:evzcsso.s_sou_txt*/
		s_sou_txt?: string|null;
		/**DBCOLUMN:evzcsso.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcsso.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcssoDtoNames { s_sou = "s_sou", s_sou_txt = "s_sou_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcssoDtoFragments { s_sou = "*", s_sou_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcssoDtoTypes { s_sou = "number", s_sou_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcssoDtoTypeLengths { s_sou_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcstaDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcsta*/
	interface GEvzcstaDto {
		/**DBCOLUMN:evzcsta.stan_jak*/
		stan_jak?: number|null;
		/**DBCOLUMN:evzcsta.stan_jak_txt*/
		stan_jak_txt?: string|null;
		/**DBCOLUMN:evzcsta.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcsta.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcstaDtoNames { stan_jak = "stan_jak", stan_jak_txt = "stan_jak_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcstaDtoFragments { stan_jak = "*", stan_jak_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcstaDtoTypes { stan_jak = "number", stan_jak_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcstaDtoTypeLengths { stan_jak_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcsvrDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcsvr*/
	interface GEvzcsvrDto {
		/**DBCOLUMN:evzcsvr.stan_svr*/
		stan_svr?: number|null;
		/**DBCOLUMN:evzcsvr.stan_svr_txt*/
		stan_svr_txt?: string|null;
		/**DBCOLUMN:evzcsvr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcsvr.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcsvrDtoNames { stan_svr = "stan_svr", stan_svr_txt = "stan_svr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcsvrDtoFragments { stan_svr = "*", stan_svr_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcsvrDtoTypes { stan_svr = "number", stan_svr_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcsvrDtoTypeLengths { stan_svr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcsvzDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcsvz*/
	interface GEvzcsvzDto {
		/**DBCOLUMN:evzcsvz.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:evzcsvz.s_vz_txt*/
		s_vz_txt?: string|null;
		/**DBCOLUMN:evzcsvz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcsvz.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcsvzDtoNames { s_vz = "s_vz", s_vz_txt = "s_vz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcsvzDtoFragments { s_vz = "*", s_vz_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcsvzDtoTypes { s_vz = "number", s_vz_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcsvzDtoTypeLengths { s_vz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzctksDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzctks*/
	interface GEvzctksDto {
		/**id_tks*/
		id_tks?: number|null;
		/**id_tks_txt*/
		id_tks_txt?: string|null;
	}
	const enum GEvzctksDtoNames { id_tks = "id_tks", id_tks_txt = "id_tks_txt",}
	const enum GEvzctksDtoFragments { id_tks = "*", id_tks_txt = "*",}
	const enum GEvzctksDtoTypes { id_tks = "number", id_tks_txt = "string",}
	const enum GEvzctksDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzcuksDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzcsso*/
	interface GEvzcuksDto {
		/**id_uks*/
		id_uks?: number|null;
		/**id_uks_txt*/
		id_uks_txt?: string|null;
		/**DBCOLUMN:evzcsso.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzcsso.k_s*/
		k_s?: string|null;
	}
	const enum GEvzcuksDtoNames { id_uks = "id_uks", id_uks_txt = "id_uks_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzcuksDtoFragments { id_uks = "*", id_uks_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzcuksDtoTypes { id_uks = "number", id_uks_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzcuksDtoTypeLengths { id_uks_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzczozDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzczoz*/
	interface GEvzczozDto {
		/**DBCOLUMN:evzczoz.odu_zz*/
		odu_zz?: number|null;
		/**DBCOLUMN:evzczoz.odu_zz_txt*/
		odu_zz_txt?: string|null;
		/**DBCOLUMN:evzczoz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzczoz.k_s*/
		k_s?: string|null;
		cis_zakon?: number|null;
		soutez?: string|null;
	}
	const enum GEvzczozDtoNames { odu_zz = "odu_zz", odu_zz_txt = "odu_zz_txt", k_v = "k_v", k_s = "k_s", cis_zakon = "cis_zakon", soutez = "soutez",}
	const enum GEvzczozDtoFragments { odu_zz = "*", odu_zz_txt = "*", k_v = "*", k_s = "*", cis_zakon = "*", soutez = "*",}
	const enum GEvzczozDtoTypes { odu_zz = "number", odu_zz_txt = "string", k_v = "number", k_s = "string", cis_zakon = "number", soutez = "string",}
	const enum GEvzczozDtoTypeLengths { odu_zz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\EVZ\Controls\Dto\Gordic.Evz.Interface.GEvzczpoDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**DBTABLE:evzczpo*/
	interface GEvzczpoDto {
		/**DBCOLUMN:evzczpo.zpu_pod*/
		zpu_pod?: number|null;
		/**DBCOLUMN:evzczpo.zpu_pod_txt*/
		zpu_pod_txt?: string|null;
		/**DBCOLUMN:evzczpo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:evzczpo.k_s*/
		k_s?: string|null;
	}
	const enum GEvzczpoDtoNames { zpu_pod = "zpu_pod", zpu_pod_txt = "zpu_pod_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEvzczpoDtoFragments { zpu_pod = "*", zpu_pod_txt = "*", k_v = "*", k_s = "*",}
	const enum GEvzczpoDtoTypes { zpu_pod = "number", zpu_pod_txt = "string", k_v = "number", k_s = "string",}
	const enum GEvzczpoDtoTypeLengths { zpu_pod_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Filters\Gordic.Evz.Interface.GEvzFiltrDokDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Filtrovací dto pro dokumenty*/
	interface GEvzFiltrDokDto {
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
	const enum GEvzFiltrDokDtoNames { ixs_pri = "ixs_pri", ixs_esu = "ixs_esu", dat_pi = "dat_pi", ixs_typ = "ixs_typ", stav_pis = "stav_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", typ_esu = "typ_esu", typ_org = "typ_org", ixs_fun_vl = "ixs_fun_vl", kompl_z = "kompl_z", cb1 = "cb1", cb2 = "cb2", cb3 = "cb3", doplnit = "doplnit", vlastnosti = "vlastnosti",}
	const enum GEvzFiltrDokDtoFragments { ixs_pri = "*", ixs_esu = "*", dat_pi = "*", ixs_typ = "*", stav_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", typ_esu = "*", typ_org = "*", ixs_fun_vl = "*", kompl_z = "*", cb1 = "*", cb2 = "*", cb3 = "*", doplnit = "*", vlastnosti = "*",}
	const enum GEvzFiltrDokDtoTypes { ixs_pri = "string", ixs_esu = "string", dat_pi = "GIntervalDto<JsonDate>", ixs_typ = "string", stav_pis = "number", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", typ_esu = "number", typ_org = "number", ixs_fun_vl = "string", kompl_z = "boolean", cb1 = "boolean", cb2 = "boolean", cb3 = "boolean", doplnit = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]",}
	const enum GEvzFiltrDokDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Filters\Gordic.Evz.Interface.GEvzFiltrDto.d.ts 

declare namespace Gordic.Evz.Interface {
	interface GEvzFiltrDto {
		/**Evidenční číslo*/
		ac_ver_zak?: GIntervalDto<string>|null;
		/**Agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**realizátor*/
		cis_real?: string|null;
		/**název*/
		nazev_vz?: GBaseFilter<string>|null;
		/**oblast VZ*/
		s_vz?: number|null;
		/**VZ v přípravě*/
		s_vz_00?: boolean|null;
		/**VZ schválený*/
		s_vz_10?: boolean|null;
		/**VZ zahájený*/
		s_vz_20?: boolean|null;
		/**VZ v soutěži*/
		s_vz_30?: boolean|null;
		/**VZ částečně schváleno*/
		s_vz_35?: boolean|null;
		/**VZ zavedeno*/
		s_vz_40?: boolean|null;
		/**VZ ukončený*/
		s_vz_50?: boolean|null;
		/**VZ ukončený*/
		s_vz_60?: boolean|null;
		/**VZ zrušený*/
		s_vz_80?: boolean|null;
		/**VZ storno*/
		s_vz_90?: boolean|null;
		/**VZ storno*/
		s_vz_99?: boolean|null;
		/**kompetent*/
		ixs_fun_komp?: string|null;
		/**soutěž*/
		soutez?: string|null;
		/**blokovaná částka*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**předpokládaná částka*/
		c_plan?: GIntervalDto<JsonDecimal>|null;
		/**schválená částka*/
		c_sch?: GIntervalDto<JsonDecimal>|null;
		/**čj PO*/
		cj_vz?: GIntervalDto<string>|null;
		/**vlastník*/
		ixs_fun_vl?: string|null;
		/**historie*/
		hist?: boolean|null;
		/**založeni PO*/
		dat_pri?: GIntervalDto<JsonDate>|null;
		/**zrušeni PO*/
		dat_zvz?: GIntervalDto<JsonDate>|null;
		/**rok založení*/
		rok_zal?: GIntervalDto<number>|null;
		/**financování*/
		fin?: GIntervalDto<number>|null;
		/**priz_view*/
		priz_view?: number|null;
		/**typ_fin*/
		typ_fin?: number|null;
		/**připomínka VZ*/
		pripominka_VZ?: number|null;
		/**připomínka VZ*/
		priz_cast?: number|null;
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
		dat_kos_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_3*/
		dat_uza_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_4*/
		dat_sml_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_5*/
		dat_real_p?: GIntervalDto<JsonDate>|null;
		/**ter_pla_1*/
		dat_zad_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_2*/
		dat_kos_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_3*/
		dat_uza_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_4*/
		dat_sml_s?: GIntervalDto<JsonDate>|null;
		/**ter_pla_5*/
		dat_real_s?: GIntervalDto<JsonDate>|null;
		/**regi_list*/
		regi_list?: number|null;
		/**stan_jak*/
		stan_jak?: number|null;
		/**stan_svr*/
		stan_svr?: number|null;
		/**schv_spec*/
		schv_spec?: number|null;
		/**ostatní údaje	částka*/
		c_ps?: GIntervalDto<JsonDecimal>|null;
		/**režim po*/
		rezim_pri?: number|null;
		/**důvod zrušení*/
		cis_duz?: number|null;
		/**důvod nerealizace*/
		cis_ner?: number|null;
		/**priorita*/
		pri_pri?: number|null;
		/**případ komentář*/
		poznamka_vz?: GBaseFilter<string>|null;
		/**případ poznámka*/
		poznamka_wfl?: GBaseFilter<string>|null;
		/**dokument popis*/
		poznamka_pis?: GBaseFilter<string>|null;
		/**dokument poznámka*/
		pozn_wfl_pis?: GBaseFilter<string>|null;
		/**dokument poznámka*/
		elm?: Gordic.Pap.Interface.GPapCfuDto[]|null;
		dat_jis?: GIntervalDto<JsonDate>|null;
		dat_vyz?: GIntervalDto<JsonDate>|null;
		c_nav?: GIntervalDto<JsonDecimal>|null;
		c_nav_bez?: GIntervalDto<JsonDecimal>|null;
		/**misto_pod*/
		misto_pod?: string|null;
		/**vs_dzd*/
		vs_dzd?: string|null;
		/**ss_dzd*/
		ss_dzd?: string|null;
		/**bez_financovani*/
		bez_financovani?: boolean|null;
		/**bez_nasmlouvanosti*/
		bez_nasmlouvanosti?: boolean|null;
		/**bez_rezervaci*/
		bez_rezervaci?: boolean|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**doplnit*/
		doplnit?: boolean|null;
	}
	const enum GEvzFiltrDtoNames { ac_ver_zak = "ac_ver_zak", ac_ag = "ac_ag", cis_real = "cis_real", nazev_vz = "nazev_vz", s_vz = "s_vz", s_vz_00 = "s_vz_00", s_vz_10 = "s_vz_10", s_vz_20 = "s_vz_20", s_vz_30 = "s_vz_30", s_vz_35 = "s_vz_35", s_vz_40 = "s_vz_40", s_vz_50 = "s_vz_50", s_vz_60 = "s_vz_60", s_vz_80 = "s_vz_80", s_vz_90 = "s_vz_90", s_vz_99 = "s_vz_99", ixs_fun_komp = "ixs_fun_komp", soutez = "soutez", c = "c", c_plan = "c_plan", c_sch = "c_sch", cj_vz = "cj_vz", ixs_fun_vl = "ixs_fun_vl", hist = "hist", dat_pri = "dat_pri", dat_zvz = "dat_zvz", rok_zal = "rok_zal", fin = "fin", priz_view = "priz_view", typ_fin = "typ_fin", pripominka_VZ = "pripominka_VZ", priz_cast = "priz_cast", ixp = "ixp", cj_pis = "cj_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_zad_p = "dat_zad_p", dat_kos_p = "dat_kos_p", dat_uza_p = "dat_uza_p", dat_sml_p = "dat_sml_p", dat_real_p = "dat_real_p", dat_zad_s = "dat_zad_s", dat_kos_s = "dat_kos_s", dat_uza_s = "dat_uza_s", dat_sml_s = "dat_sml_s", dat_real_s = "dat_real_s", regi_list = "regi_list", stan_jak = "stan_jak", stan_svr = "stan_svr", schv_spec = "schv_spec", c_ps = "c_ps", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", poznamka_vz = "poznamka_vz", poznamka_wfl = "poznamka_wfl", poznamka_pis = "poznamka_pis", pozn_wfl_pis = "pozn_wfl_pis", elm = "elm", dat_jis = "dat_jis", dat_vyz = "dat_vyz", c_nav = "c_nav", c_nav_bez = "c_nav_bez", misto_pod = "misto_pod", vs_dzd = "vs_dzd", ss_dzd = "ss_dzd", bez_financovani = "bez_financovani", bez_nasmlouvanosti = "bez_nasmlouvanosti", bez_rezervaci = "bez_rezervaci", vlastnosti = "vlastnosti", doplnit = "doplnit",}
	const enum GEvzFiltrDtoFragments { ac_ver_zak = "*", ac_ag = "*", cis_real = "*", nazev_vz = "*", s_vz = "*", s_vz_00 = "*", s_vz_10 = "*", s_vz_20 = "*", s_vz_30 = "*", s_vz_35 = "*", s_vz_40 = "*", s_vz_50 = "*", s_vz_60 = "*", s_vz_80 = "*", s_vz_90 = "*", s_vz_99 = "*", ixs_fun_komp = "*", soutez = "*", c = "*", c_plan = "*", c_sch = "*", cj_vz = "*", ixs_fun_vl = "*", hist = "*", dat_pri = "*", dat_zvz = "*", rok_zal = "*", fin = "*", priz_view = "*", typ_fin = "*", pripominka_VZ = "*", priz_cast = "*", ixp = "*", cj_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_zad_p = "*", dat_kos_p = "*", dat_uza_p = "*", dat_sml_p = "*", dat_real_p = "*", dat_zad_s = "*", dat_kos_s = "*", dat_uza_s = "*", dat_sml_s = "*", dat_real_s = "*", regi_list = "*", stan_jak = "*", stan_svr = "*", schv_spec = "*", c_ps = "*", rezim_pri = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", poznamka_vz = "*", poznamka_wfl = "*", poznamka_pis = "*", pozn_wfl_pis = "*", elm = "*", dat_jis = "*", dat_vyz = "*", c_nav = "*", c_nav_bez = "*", misto_pod = "*", vs_dzd = "*", ss_dzd = "*", bez_financovani = "*", bez_nasmlouvanosti = "*", bez_rezervaci = "*", vlastnosti = "*", doplnit = "*",}
	const enum GEvzFiltrDtoTypes { ac_ver_zak = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", cis_real = "string", nazev_vz = "GBaseFilter<string>", s_vz = "number", s_vz_00 = "boolean", s_vz_10 = "boolean", s_vz_20 = "boolean", s_vz_30 = "boolean", s_vz_35 = "boolean", s_vz_40 = "boolean", s_vz_50 = "boolean", s_vz_60 = "boolean", s_vz_80 = "boolean", s_vz_90 = "boolean", s_vz_99 = "boolean", ixs_fun_komp = "string", soutez = "string", c = "GIntervalDto<JsonDecimal>", c_plan = "GIntervalDto<JsonDecimal>", c_sch = "GIntervalDto<JsonDecimal>", cj_vz = "GIntervalDto<string>", ixs_fun_vl = "string", hist = "boolean", dat_pri = "GIntervalDto<JsonDate>", dat_zvz = "GIntervalDto<JsonDate>", rok_zal = "GIntervalDto<number>", fin = "GIntervalDto<number>", priz_view = "number", typ_fin = "number", pripominka_VZ = "number", priz_cast = "number", ixp = "string", cj_pis = "GIntervalDto<string>", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_zad_p = "GIntervalDto<JsonDate>", dat_kos_p = "GIntervalDto<JsonDate>", dat_uza_p = "GIntervalDto<JsonDate>", dat_sml_p = "GIntervalDto<JsonDate>", dat_real_p = "GIntervalDto<JsonDate>", dat_zad_s = "GIntervalDto<JsonDate>", dat_kos_s = "GIntervalDto<JsonDate>", dat_uza_s = "GIntervalDto<JsonDate>", dat_sml_s = "GIntervalDto<JsonDate>", dat_real_s = "GIntervalDto<JsonDate>", regi_list = "number", stan_jak = "number", stan_svr = "number", schv_spec = "number", c_ps = "GIntervalDto<JsonDecimal>", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", poznamka_vz = "GBaseFilter<string>", poznamka_wfl = "GBaseFilter<string>", poznamka_pis = "GBaseFilter<string>", pozn_wfl_pis = "GBaseFilter<string>", elm = "Gordic.Pap.Interface.GPapCfuDto[]", dat_jis = "GIntervalDto<JsonDate>", dat_vyz = "GIntervalDto<JsonDate>", c_nav = "GIntervalDto<JsonDecimal>", c_nav_bez = "GIntervalDto<JsonDecimal>", misto_pod = "string", vs_dzd = "string", ss_dzd = "string", bez_financovani = "boolean", bez_nasmlouvanosti = "boolean", bez_rezervaci = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", doplnit = "boolean",}
	const enum GEvzFiltrDtoTypeLengths {}
	/**DTO ulozeneho filtru*/
	interface GSeznamDokladuFilterStoredDto extends Gordic.Evz.Interface.GEvzFiltrDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamDokladuFilterStoredDtoNames { id = "id", name = "name", description = "description", ac_ver_zak = "ac_ver_zak", ac_ag = "ac_ag", cis_real = "cis_real", nazev_vz = "nazev_vz", s_vz = "s_vz", s_vz_00 = "s_vz_00", s_vz_10 = "s_vz_10", s_vz_20 = "s_vz_20", s_vz_30 = "s_vz_30", s_vz_35 = "s_vz_35", s_vz_40 = "s_vz_40", s_vz_50 = "s_vz_50", s_vz_60 = "s_vz_60", s_vz_80 = "s_vz_80", s_vz_90 = "s_vz_90", s_vz_99 = "s_vz_99", ixs_fun_komp = "ixs_fun_komp", soutez = "soutez", c = "c", c_plan = "c_plan", c_sch = "c_sch", cj_vz = "cj_vz", ixs_fun_vl = "ixs_fun_vl", hist = "hist", dat_pri = "dat_pri", dat_zvz = "dat_zvz", rok_zal = "rok_zal", fin = "fin", priz_view = "priz_view", typ_fin = "typ_fin", pripominka_VZ = "pripominka_VZ", priz_cast = "priz_cast", ixp = "ixp", cj_pis = "cj_pis", ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_zad_p = "dat_zad_p", dat_kos_p = "dat_kos_p", dat_uza_p = "dat_uza_p", dat_sml_p = "dat_sml_p", dat_real_p = "dat_real_p", dat_zad_s = "dat_zad_s", dat_kos_s = "dat_kos_s", dat_uza_s = "dat_uza_s", dat_sml_s = "dat_sml_s", dat_real_s = "dat_real_s", regi_list = "regi_list", stan_jak = "stan_jak", stan_svr = "stan_svr", schv_spec = "schv_spec", c_ps = "c_ps", rezim_pri = "rezim_pri", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", poznamka_vz = "poznamka_vz", poznamka_wfl = "poznamka_wfl", poznamka_pis = "poznamka_pis", pozn_wfl_pis = "pozn_wfl_pis", elm = "elm", dat_jis = "dat_jis", dat_vyz = "dat_vyz", c_nav = "c_nav", c_nav_bez = "c_nav_bez", misto_pod = "misto_pod", vs_dzd = "vs_dzd", ss_dzd = "ss_dzd", bez_financovani = "bez_financovani", bez_nasmlouvanosti = "bez_nasmlouvanosti", bez_rezervaci = "bez_rezervaci", vlastnosti = "vlastnosti", doplnit = "doplnit",}
	const enum GSeznamDokladuFilterStoredDtoFragments { id = "*", name = "*", description = "*", ac_ver_zak = "*", ac_ag = "*", cis_real = "*", nazev_vz = "*", s_vz = "*", s_vz_00 = "*", s_vz_10 = "*", s_vz_20 = "*", s_vz_30 = "*", s_vz_35 = "*", s_vz_40 = "*", s_vz_50 = "*", s_vz_60 = "*", s_vz_80 = "*", s_vz_90 = "*", s_vz_99 = "*", ixs_fun_komp = "*", soutez = "*", c = "*", c_plan = "*", c_sch = "*", cj_vz = "*", ixs_fun_vl = "*", hist = "*", dat_pri = "*", dat_zvz = "*", rok_zal = "*", fin = "*", priz_view = "*", typ_fin = "*", pripominka_VZ = "*", priz_cast = "*", ixp = "*", cj_pis = "*", ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_zad_p = "*", dat_kos_p = "*", dat_uza_p = "*", dat_sml_p = "*", dat_real_p = "*", dat_zad_s = "*", dat_kos_s = "*", dat_uza_s = "*", dat_sml_s = "*", dat_real_s = "*", regi_list = "*", stan_jak = "*", stan_svr = "*", schv_spec = "*", c_ps = "*", rezim_pri = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", poznamka_vz = "*", poznamka_wfl = "*", poznamka_pis = "*", pozn_wfl_pis = "*", elm = "*", dat_jis = "*", dat_vyz = "*", c_nav = "*", c_nav_bez = "*", misto_pod = "*", vs_dzd = "*", ss_dzd = "*", bez_financovani = "*", bez_nasmlouvanosti = "*", bez_rezervaci = "*", vlastnosti = "*", doplnit = "*",}
	const enum GSeznamDokladuFilterStoredDtoTypes { id = "string", name = "string", description = "string", ac_ver_zak = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", cis_real = "string", nazev_vz = "GBaseFilter<string>", s_vz = "number", s_vz_00 = "boolean", s_vz_10 = "boolean", s_vz_20 = "boolean", s_vz_30 = "boolean", s_vz_35 = "boolean", s_vz_40 = "boolean", s_vz_50 = "boolean", s_vz_60 = "boolean", s_vz_80 = "boolean", s_vz_90 = "boolean", s_vz_99 = "boolean", ixs_fun_komp = "string", soutez = "string", c = "GIntervalDto<JsonDecimal>", c_plan = "GIntervalDto<JsonDecimal>", c_sch = "GIntervalDto<JsonDecimal>", cj_vz = "GIntervalDto<string>", ixs_fun_vl = "string", hist = "boolean", dat_pri = "GIntervalDto<JsonDate>", dat_zvz = "GIntervalDto<JsonDate>", rok_zal = "GIntervalDto<number>", fin = "GIntervalDto<number>", priz_view = "number", typ_fin = "number", pripominka_VZ = "number", priz_cast = "number", ixp = "string", cj_pis = "GIntervalDto<string>", ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_zad_p = "GIntervalDto<JsonDate>", dat_kos_p = "GIntervalDto<JsonDate>", dat_uza_p = "GIntervalDto<JsonDate>", dat_sml_p = "GIntervalDto<JsonDate>", dat_real_p = "GIntervalDto<JsonDate>", dat_zad_s = "GIntervalDto<JsonDate>", dat_kos_s = "GIntervalDto<JsonDate>", dat_uza_s = "GIntervalDto<JsonDate>", dat_sml_s = "GIntervalDto<JsonDate>", dat_real_s = "GIntervalDto<JsonDate>", regi_list = "number", stan_jak = "number", stan_svr = "number", schv_spec = "number", c_ps = "GIntervalDto<JsonDecimal>", rezim_pri = "number", cis_duz = "number", cis_ner = "number", pri_pri = "number", poznamka_vz = "GBaseFilter<string>", poznamka_wfl = "GBaseFilter<string>", poznamka_pis = "GBaseFilter<string>", pozn_wfl_pis = "GBaseFilter<string>", elm = "Gordic.Pap.Interface.GPapCfuDto[]", dat_jis = "GIntervalDto<JsonDate>", dat_vyz = "GIntervalDto<JsonDate>", c_nav = "GIntervalDto<JsonDecimal>", c_nav_bez = "GIntervalDto<JsonDecimal>", misto_pod = "string", vs_dzd = "string", ss_dzd = "string", bez_financovani = "boolean", bez_nasmlouvanosti = "boolean", bez_rezervaci = "boolean", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", doplnit = "boolean",}
	const enum GSeznamDokladuFilterStoredDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Filters\Gordic.Evz.Interface.GEvzFiltrUchazeciDto.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Filtrovací dto pro uchazeče*/
	interface GEvzFiltrUchazeciDto {
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
		nazev_vz?: GBaseFilter<string>|null;
		/**PO návrh*/
		s_vz_00?: boolean|null;
		/**PO schválený*/
		s_vz_10?: boolean|null;
		/**PO zahájený*/
		s_vz_20?: boolean|null;
		/**PO ukončený*/
		s_vz_50?: boolean|null;
		/**PO zrušený*/
		s_vz_80?: boolean|null;
		/**PO storno*/
		s_vz_90?: boolean|null;
		/**PO RZA*/
		s_vz_99?: boolean|null;
		/**typ*/
		typ?: string|null;
	}
	const enum GEvzFiltrUchazeciDtoNames { ico_esu = "ico_esu", dic = "dic", rc = "rc", pr_forma = "pr_forma", esu_txt = "esu_txt", dat_pre_nab = "dat_pre_nab", dat_zmena = "dat_zmena", typ_esu = "typ_esu", typ_org = "typ_org", ixs_fun_vl = "ixs_fun_vl", nazev_vz = "nazev_vz", s_vz_00 = "s_vz_00", s_vz_10 = "s_vz_10", s_vz_20 = "s_vz_20", s_vz_50 = "s_vz_50", s_vz_80 = "s_vz_80", s_vz_90 = "s_vz_90", s_vz_99 = "s_vz_99", typ = "typ",}
	const enum GEvzFiltrUchazeciDtoFragments { ico_esu = "*", dic = "*", rc = "*", pr_forma = "*", esu_txt = "*", dat_pre_nab = "*", dat_zmena = "*", typ_esu = "*", typ_org = "*", ixs_fun_vl = "*", nazev_vz = "*", s_vz_00 = "*", s_vz_10 = "*", s_vz_20 = "*", s_vz_50 = "*", s_vz_80 = "*", s_vz_90 = "*", s_vz_99 = "*", typ = "*",}
	const enum GEvzFiltrUchazeciDtoTypes { ico_esu = "string", dic = "string", rc = "string", pr_forma = "string", esu_txt = "GBaseFilter<string>", dat_pre_nab = "GIntervalDto<JsonDate>", dat_zmena = "GIntervalDto<JsonDate>", typ_esu = "number", typ_org = "number", ixs_fun_vl = "string", nazev_vz = "GBaseFilter<string>", s_vz_00 = "boolean", s_vz_10 = "boolean", s_vz_20 = "boolean", s_vz_50 = "boolean", s_vz_80 = "boolean", s_vz_90 = "boolean", s_vz_99 = "boolean", typ = "string",}
	const enum GEvzFiltrUchazeciDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Filters\Gordic.Evz.Interface.GEvzFiltrVecnyProfil.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Filtrovací dto pro věcný profil*/
	interface GEvzFiltrVecnyProfilDto {
		/**cis_vz*/
		cis_vz?: number|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**rok*/
		rok?: number|null;
		/**cislo*/
		cislo?: string|null;
		/**readOnly*/
		readOnly?: boolean|null;
	}
	const enum GEvzFiltrVecnyProfilDtoNames { cis_vz = "cis_vz", ixs_pri = "ixs_pri", rok = "rok", cislo = "cislo", readOnly = "readOnly",}
	const enum GEvzFiltrVecnyProfilDtoFragments { cis_vz = "*", ixs_pri = "*", rok = "*", cislo = "*", readOnly = "*",}
	const enum GEvzFiltrVecnyProfilDtoTypes { cis_vz = "number", ixs_pri = "string", rok = "number", cislo = "string", readOnly = "boolean",}
	const enum GEvzFiltrVecnyProfilDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Filters\Gordic.Evz.Interface.IGEvzFilters.d.ts 

declare namespace Gordic.Evz.Interface {
	/**Filtry evzsesu*/
	const enum FilEvzsesu {
		/**identifikátor*/
		ixs_pri,
		/**cis_por*/
		cis_por,
		/**ixs_esu*/
		ixs_esu,
		/**por_cis_nab*/
		por_cis_nab,
		/**vlastnik*/
		vlastnik,
		/**nabedo*/
		nabedo,
	}
	/**Filtry evzvkdn*/
	const enum FilEvzvkdn {
		/**identifikátor*/
		ixs_pri,
	}
	/**Filtry pkrskmd*/
	const enum FilPkrskmd {
		/**id_kmd*/
		id_kmd,
	}
	/**Filtry evzvkdn*/
	const enum FilEvzvkpr {
		/**identifikátor*/
		ixs_pri,
		/**id_kmd*/
		id_kmd,
	}
	/**Filtry evzvoks*/
	const enum FilEvzvoks {
		/**identifikátor případu*/
		ixs_pri,
		/**identifikátor VZ*/
		ixp,
		/**por_cis*/
		por_cis,
		/**ktg_typ*/
		ktg_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Gordic.Evz.Interface.EvzspidAllDokService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty evzspid
	* @domain VerZakazky
	*/
	interface EvzspidAllDokService {
		/**detail dokumentu*/
		list(rq?:Gordic.Evz.Interface.GEvzFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspidDto>>;
		/**Počet záznamů*/
		count(rq?:Gordic.Evz.Interface.GEvzFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		readPid(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Evz.Interface.EvzspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzspidAllDokService: ServiceBase & Catalog.EvzspidAllDokService;
	}
	const EvzspidAllDokService: Client["EvzspidAllDokService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Gordic.Evz.Interface.EvzspidAllDokVZService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty VZ
	* @domain VerZakazky
	*/
	interface EvzspidAllDokVZService {
		/**detail dokumentu*/
		list(rq?:Gordic.Evz.Interface.GEvzFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspidDto>>;
		/**počet dokladú daného případu*/
		count(rq?:Gordic.Evz.Interface.GEvzFiltrDokDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**schválení písemnosti*/
		schvalitPis(rq?:CallParams<{list:string[]}>): _Task<{list:string[]},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzspidAllDokVZService: ServiceBase & Catalog.EvzspidAllDokVZService;
	}
	const EvzspidAllDokVZService: Client["EvzspidAllDokVZService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Gordic.Evz.Interface.EvzspidAllElDokService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny dokumenty evzspid
	* @domain VerZakazky
	*/
	interface EvzspidAllElDokService {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspidDto>>;
		/**detail dokumentu*/
		count(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzspidAllElDokService: ServiceBase & Catalog.EvzspidAllElDokService;
	}
	const EvzspidAllElDokService: Client["EvzspidAllElDokService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Gordic.Evz.Interface.EvzspidAllElDokVZService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro všechny el. dokumenty VZ
	* @domain VerZakazky
	*/
	interface EvzspidAllElDokVZService {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzspidAllElDokVZService: ServiceBase & Catalog.EvzspidAllElDokVZService;
	}
	const EvzspidAllElDokVZService: Client["EvzspidAllElDokVZService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Gordic.Evz.Interface.IGHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání "pidu".
	* @domain VerZakazky
	*/
	interface HledaniEvz {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniEvz: ServiceBase & Catalog.HledaniEvz;
	}
	const HledaniEvz: Client["HledaniEvz"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\CastiVZ\Gordic.Evz.Interface.IGCastiVZ.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Části VZ
	* @domain VerZakazky
	*/
	interface EvzCastiVZ {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GEvzvvzcDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Pap.Interface.GEvzvvzcDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzvvzcDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzvvzcDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GEvzvvzcDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzvvzcDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzvvzcDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**seznam dokumentu pro volbu nová*/
		listNova(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspriDto>>;
		/**generování částí*/
		generuj(rq?:Gordic.Evz.Interface.GGenerujCastiDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GGenerujCastiDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GGenerujCastiDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzCastiVZ: ServiceBase & Catalog.EvzCastiVZ;
	}
	const EvzCastiVZ: Client["EvzCastiVZ"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\Detail\Gordic.Evz.Interface.IGDetailVZ.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Detail
	* @domain VerZakazky
	*/
	interface EvzDetailVZ {
		/**Uložení detailu*/
		update(rq?:Gordic.Evz.Interface.GParamDetailDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GParamDetailDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GParamDetailDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GPodaniDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPodaniDto>>;
		/**vložení záznamů*/
		insertPole(rq?:Gordic.Pap.Interface.GPodaniPoleDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniPoleDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniPoleDto>,Gordic.Pap.Interface.GCommonReturnDto>;
		/**Vrátí procenta daně*/
		vratDanProc(rq?:CallParams<{dan_typ:number,rokMes:string}>): _Task<{dan_typ:number,rokMes:string},JsonDecimal>;
		/**Naplnění parametrů pro formulář detailu*/
		naplnParam(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Evz.Interface.GParamDetailDto>>;
		/**Naplnění parametrů pro formulář detailu*/
		nactiNadrizeneVZ(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.DetailEvzDto>>;
		/**Naplnění dat pro tabulku SIP*/
		listSip(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.DetailEvzDto>>;
		/**Kontrola dat detailu*/
		kontrolaDat(rq?:Gordic.Evz.Interface.GParamDetailDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GParamDetailDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GParamDetailDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Kontrola pole datum vyhlášení*/
		kontrolaDatVyhl(rq?:Gordic.Pap.Interface.GDatVyhlInputDto|CallParams<GServiceActionRequest<Gordic.Pap.Interface.GDatVyhlInputDto>>): _Task<GServiceActionRequest<Gordic.Pap.Interface.GDatVyhlInputDto>,GServiceActionResponse<Gordic.Pap.Interface.GDatVyhlReturnDto>>;
		/**seznam esu pro jakési FRS*/
		listEsu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GSelEsuDto>>;
		/**detail evzsesu pro ixs_esu_v*/
		readEsuV(rq?:CallParams<{ixs_pri:string,cis_por:number,por_cis_nab:number,soutez:string}>): _Task<{ixs_pri:string,cis_por:number,por_cis_nab:number,soutez:string},GServiceReadResponse<Gordic.Evz.Interface.GEvzsesuDto>>;
		/**Kontrola na duplicitu ixs_esu*/
		kontrolaEsu(rq?:CallParams<{ixs_pri:string,ixs_esu:string,por_cis_nab:number,cis_por:number,ktg_typ:number,soutez:string}>): _Task<{ixs_pri:string,ixs_esu:string,por_cis_nab:number,cis_por:number,ktg_typ:number,soutez:string},GServiceReadResponse<Gordic.Pap.Interface.GEsuKontrolaDto>>;
		/**Hromadné operace*/
		hromadneUpdate(rq?:CallParams<{ixp:string,stav:number,kontrolaHO:number,paramIxsPri:string}>): _Task<{ixp:string,stav:number,kontrolaHO:number,paramIxsPri:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**Nějaké velkorypadlo*/
		obsluzInitDataFrs(rq?:CallParams<{param:Gordic.Evz.Interface.GEvzFrsDto}>): _Task<{param:Gordic.Evz.Interface.GEvzFrsDto},Gordic.Pap.Interface.GCommonReturnDto>;
		/**Kontrola před stornem*/
		kontrolaPredStornem(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzDetailVZ: ServiceBase & Catalog.EvzDetailVZ;
	}
	const EvzDetailVZ: Client["EvzDetailVZ"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\DetailVZ\Gordic.Evz.Interface.IGDetailVZ.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Plneni
	* @domain VerZakazky
	*/
	interface Evzvdof {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GEvzvdofDto>>;
		/**Insert/update*/
		insUpd(rq?:Gordic.Evz.Interface.GEvzvdofDto|CallParams<GServiceReadRequest<Gordic.Evz.Interface.GEvzvdofDto>>): _Task<GServiceReadRequest<Gordic.Evz.Interface.GEvzvdofDto>,GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Evzvdof: ServiceBase & Catalog.Evzvdof;
	}
	const Evzvdof: Client["Evzvdof"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\Doporuceni\Gordic.Evz.Interface.IGCastiVZ.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doporučení
	* @domain VerZakazky
	*/
	interface EvzDoporuceni {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxvpopDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzDoporuceni: ServiceBase & Catalog.EvzDoporuceni;
	}
	const EvzDoporuceni: Client["EvzDoporuceni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\Kategorie\Gordic.Evz.Interface.IGEvzAddUpdKategorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie číselník
	* @domain VerZakazky
	*/
	interface EvzAddUpdKategorie {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GEvzskdnDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Pap.Interface.GEvzskdnDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GEvzskdnDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**smazání záznamu*/
		delete(rq?:Gordic.Pap.Interface.GEvzskdnDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzAddUpdKategorie: ServiceBase & Catalog.EvzAddUpdKategorie;
	}
	const EvzAddUpdKategorie: Client["EvzAddUpdKategorie"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\Kategorie\Gordic.Evz.Interface.IGKategorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie vazba*/
	interface EvzKategorie {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GEvzvkdnDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Evz.Interface.GEvzvkdnDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkdnDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Evz.Interface.GEvzvkdnDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkdnDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzKategorie: ServiceBase & Catalog.EvzKategorie;
	}
	const EvzKategorie: Client["EvzKategorie"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\Komise\Gordic.Evz.Interface.IGEvzAddUpdKomise.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie číselník členů komise
	* @domain VerZakazky
	*/
	interface EvzAddUpdKomise {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GEvzsokoDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Pap.Interface.GEvzsokoDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GEvzsokoDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**smazání záznamu*/
		delete(rq?:Gordic.Pap.Interface.GEvzsokoDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzAddUpdKomise: ServiceBase & Catalog.EvzAddUpdKomise;
	}
	const EvzAddUpdKomise: Client["EvzAddUpdKomise"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\Komise\Gordic.Evz.Interface.IGKategorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Komise vazba
	* @domain VerZakazky
	*/
	interface EvzKomise {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GEvzvoksDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Evz.Interface.GEvzvoksDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvoksDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvoksDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení/úprava záznamu*/
		insUpd(rq?:Gordic.Evz.Interface.GEvzvoksDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvoksDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvoksDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzKomise: ServiceBase & Catalog.EvzKomise;
	}
	const EvzKomise: Client["EvzKomise"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\KomoditniPlneni\Gordic.Evz.Interface.IGEvzKomPln.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie vazba
	* @domain VerZakazky
	*/
	interface EvzKomPln {
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GEvzvkprDto>>;
		/**Nastavení aktivity*/
		update(rq?:Gordic.Evz.Interface.GEvzvkprDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkprDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkprDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Evz.Interface.GEvzvkprDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkprDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzvkprDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzKomPln: ServiceBase & Catalog.EvzKomPln;
	}
	const EvzKomPln: Client["EvzKomPln"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\KomoditniPlneni\Gordic.Evz.Interface.IGKomodita.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie vazba
	* @domain VerZakazky
	*/
	interface Komodita {
		/**seznam dokumentu*/
		list(rq?:CallParams<{zaznam:Gordic.Evz.Interface.GPkrskmdDto}>): _Task<{zaznam:Gordic.Evz.Interface.GPkrskmdDto},GServiceListResponse<Gordic.Evz.Interface.GPkrskmdDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Komodita: ServiceBase & Catalog.Komodita;
	}
	const Komodita: Client["Komodita"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Detail\VecnyProfil\Gordic.Evz.Interface.IGVepsevz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - věcný profil EVZ
	* @domain VerZakazky
	*/
	interface Vepsevz {
		/**Seznam věcný profil EVZ*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Insert a update dat - i hromadný*/
		upsert(rq?:Gordic.Evz.Interface.GVepsevzDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>,GServiceSaveResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Odstranění věcný profil EVZ*/
		delete(rq?:Gordic.Evz.Interface.GVepsevzDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>,GServiceSaveResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Zrušení Odstranění věcný profil EVZ*/
		undelete(rq?:Gordic.Evz.Interface.GVepsevzDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>,GServiceSaveResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Schvalit věcný profil EVZ*/
		schvalit(rq?:Gordic.Evz.Interface.GVepsevzDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GVepsevzDto>,GServiceSaveResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Vytvoření nové položky věcného profilu s Permissions*/
		createNewDefaultItem(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},GServiceReadResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Hromadná kontrola dat před zadanou operací*/
		checkMassPermissionsBeforeOperation(rq?:Gordic.Evz.Interface.GVepsevzMassUpsertDto|CallParams<GServiceGroupRequest<Gordic.Evz.Interface.GVepsevzMassUpsertDto>>): _Task<GServiceGroupRequest<Gordic.Evz.Interface.GVepsevzMassUpsertDto>,GServiceGroupResponse<Gordic.Evz.Interface.GVepsevzDto>>;
		/**Hromadná aktivní operace*/
		massOperation(rq?:Gordic.Evz.Interface.GVepsevzMassUpsertDto|CallParams<GServiceGroupRequest<Gordic.Evz.Interface.GVepsevzMassUpsertDto>>): _Task<GServiceGroupRequest<Gordic.Evz.Interface.GVepsevzMassUpsertDto>,GServiceGroupResponse<Gordic.Evz.Interface.GVepsevzDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Vepsevz: ServiceBase & Catalog.Vepsevz;
	}
	const Vepsevz: Client["Vepsevz"];
}
declare namespace Gordic.Evz.Interface {
	/**Filtr pro věcný profil EVZ*/
	const enum GVepsevzFilter {
		/**cis_vz*/
		cis_vz,
		/**readOnly*/
		readOnly,
		/**zmenu_prov*/
		zmenu_prov,
		/**ixs_pri*/
		ixs_pri,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_poz*/
		ixs_poz,
		/**skp*/
		skp,
		/**mat_cis*/
		mat_cis,
		/**nazev_skp*/
		nazev_skp,
		/**nazev*/
		nazev,
		/**mj*/
		mj,
		/**vyr_cis*/
		vyr_cis,
		/**kod_pol*/
		kod_pol,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**nks_zad*/
		nks_zad,
		/**inv_cis*/
		inv_cis,
		/**popis*/
		popis,
		/**ixs_dup*/
		ixs_dup,
		/**vp_stav_nazev*/
		vp_stav_nazev,
		/**aktivita*/
		aktivita,
		/**rok*/
		rok,
		/**skupina_id*/
		skupina_id,
		/**drh_id*/
		drh_id,
		/**duvod_poz*/
		duvod_poz,
		/**drh_poz*/
		drh_poz,
		/**znam*/
		znam,
		/**vp_stav*/
		vp_stav,
		/**cis_plan*/
		cis_plan,
		/**dat_zmena*/
		dat_zmena,
		/**m_vz_sml*/
		m_vz_sml,
		/**m_vz*/
		m_vz,
		/**m_vz_obj_sml*/
		m_vz_obj_sml,
		/**m_fak*/
		m_fak,
		/**m_maj*/
		m_maj,
		/**c_vz_sml*/
		c_vz_sml,
		/**c_vz*/
		c_vz,
		/**c_vz_obj_sml*/
		c_vz_obj_sml,
		/**c_fak*/
		c_fak,
		/**c_maj*/
		c_maj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\HromadneOperace\Gordic.Evz.Interface.IGEvzHromadneOperace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hromadné operace EVZ
	*     ///
	* @domain VerZakazky
	*/
	interface EvzHromadneOperace {
		/**Kontrola dat před spuštěním HO*/
		kontrolaHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string}>): _Task<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		provedeniHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string}>): _Task<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzHromadneOperace: ServiceBase & Catalog.EvzHromadneOperace;
	}
	const EvzHromadneOperace: Client["EvzHromadneOperace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Souteze\Gordic.Evz.Interface.IGEvzSouteze.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Soutěže VZ
	* @domain VerZakazky
	*/
	interface EvzSouteze {
		/**detail dokumentů*/
		read(rq?:Gordic.Evz.Interface.GEvzsesuDto|CallParams<GServiceReadRequest<Gordic.Evz.Interface.GEvzsesuDto>>): _Task<GServiceReadRequest<Gordic.Evz.Interface.GEvzsesuDto>,GServiceReadResponse<Gordic.Evz.Interface.GEvzsesuDto>>;
		/**seznam dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GEvzsesuDto>>;
		/**seznam dokumentu nabedo*/
		listNabedo(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GEvzsesuDto>>;
		/**insert/update*/
		insUpdNabedo(rq?:Gordic.Evz.Interface.GEvzsesuDto|CallParams<GServiceSaveRequest<Gordic.Evz.Interface.GEvzsesuDto>>): _Task<GServiceSaveRequest<Gordic.Evz.Interface.GEvzsesuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzSouteze: ServiceBase & Catalog.EvzSouteze;
	}
	const EvzSouteze: Client["EvzSouteze"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\Uchazeci\Gordic.Evz.Interface.IGUchazeci.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro uchazeče
	* @domain VerZakazky
	*/
	interface EvzUchazeci {
		/**detail dokumentu*/
		list(rq?:Gordic.Evz.Interface.GEvzFiltrUchazeciDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.GUchazeciDto>>;
		/**počet záznamů*/
		count(rq?:Gordic.Evz.Interface.GEvzFiltrUchazeciDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Provedení HO*/
		provedeniHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Evz.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto}>): _Task<{rq:GServiceReadRequest<Gordic.Evz.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Kontrola HO*/
		kontrolaHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Evz.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto}>): _Task<{rq:GServiceReadRequest<Gordic.Evz.Interface.GUchazeciDto>,akce:string,parametry:Gordic.Pap.Interface.GPapSpravaDto},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Shození filtru pro ess*/
		nastavEss(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzUchazeci: ServiceBase & Catalog.EvzUchazeci;
	}
	const EvzUchazeci: Client["EvzUchazeci"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\VerejnaZakazka\Gordic.Evz.Interface.EvzspriService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Dokument WFL
	* @domain VerZakazky
	*/
	interface EvzVerejnaZakazka {
		/**seznam dokumentů*/
		read(rq?:Gordic.Evz.Interface.EvzspriDto|CallParams<GServiceReadRequest<Gordic.Evz.Interface.EvzspriDto>>): _Task<GServiceReadRequest<Gordic.Evz.Interface.EvzspriDto>,GServiceReadResponse<Gordic.Evz.Interface.EvzspriDto>>;
		/**detail dokumentu*/
		list(rq?:Gordic.Evz.Interface.GEvzFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspriDto>>;
		/**Data pro Kpi*/
		nactiKpiData(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},JsonDecimal[]>;
		/**počet záznamů*/
		count(rq?:Gordic.Evz.Interface.GEvzFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Export VZ do NEN*/
		exportNen(rq?:CallParams<{}>): _Task<{},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzVerejnaZakazka: ServiceBase & Catalog.EvzVerejnaZakazka;
	}
	const EvzVerejnaZakazka: Client["EvzVerejnaZakazka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\VerejnaZakazka\SouvisejiciVZ\Gordic.Evz.Interface.IGVerejnaZakazkaSouvisejiciVZ.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Související zakázky
	* @domain VerZakazky
	*/
	interface EvzVerejnaZakazkaSouvisejiciVZ {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GEvzvvzcDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzVerejnaZakazkaSouvisejiciVZ: ServiceBase & Catalog.EvzVerejnaZakazkaSouvisejiciVZ;
	}
	const EvzVerejnaZakazkaSouvisejiciVZ: Client["EvzVerejnaZakazkaSouvisejiciVZ"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Evz.Interface\Service\VerejnaZakazka\SouvisejiciZakazky\Gordic.Evz.Interface.IGVerejnaZakazkaSouvisejiciZakazky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Související zakázky
	* @domain VerZakazky
	*/
	interface EvzVerejnaZakazkaSouvisejiciZakazky {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Evz.Interface.EvzspriDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		EvzVerejnaZakazkaSouvisejiciZakazky: ServiceBase & Catalog.EvzVerejnaZakazkaSouvisejiciZakazky;
	}
	const EvzVerejnaZakazkaSouvisejiciZakazky: Client["EvzVerejnaZakazkaSouvisejiciZakazky"];
}

//#endregion

