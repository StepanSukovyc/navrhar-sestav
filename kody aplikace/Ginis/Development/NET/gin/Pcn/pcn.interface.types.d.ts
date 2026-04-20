/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pcn.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pcn.Interface\Gordic.Pcn.Interface.csproj
*    created     2026-02-16 14:34:48
*    files       Dto\GPcnAdaDto.d.ts
*                Dto\GPcnCestaDto.d.ts
*                Dto\GPcnCestaEtapaDto.d.ts
*                Dto\GPcnCestaFinancovaniDto.d.ts
*                Dto\GPcnCestaRocniRozpisDto.d.ts
*                Dto\GPcnCestaUcastnikJmenoDto.d.ts
*                Dto\GPcnCestaUcastnikPocetDto.d.ts
*                Dto\GPcnCestaVydajDto.d.ts
*                Dto\GPcnCiloveMistoDto.d.ts
*                Dto\GPcnDefiniceZavaznehoUkazateleDto.d.ts
*                Dto\GPcnDodatekCNDto.d.ts
*                Dto\GPcnKategorieHodnoceniDto.d.ts
*                Dto\GPcnKnihaDto.d.ts
*                Dto\GPcnKontrolaLimituDto.d.ts
*                Dto\GPcnMenuCNDto.d.ts
*                Dto\GPcnMenuZmrDto.d.ts
*                Dto\GPcnOmezeniNksDto.d.ts
*                Dto\GPcnPodporaDto.d.ts
*                Dto\GPcnPrehledLimituDto.d.ts
*                Dto\GPcnPrehledVystupuBarDto.d.ts
*                Dto\GPcnPrintParamDto.d.ts
*                Dto\GPcnSmlDto.d.ts
*                Dto\GPcnSouhrnDto.d.ts
*                Dto\GPcnTempTabulkaDto.d.ts
*                Dto\GPcnTlacitkaDto.d.ts
*                Dto\GPcnWflProfilDto.d.ts
*                Dto\GPcnZabezpecujiciNksDto.d.ts
*                Dto\GPcnZmenoveRizeniDotcenePozDto.d.ts
*                Dto\GPcnZmenoveRizeniDto.d.ts
*                Dto\GPcnZmenoveRizeniFinancniProfilDto.d.ts
*                Dto\GPcnZmenoveRizeniRozDto.d.ts
*                Dto\GPcnZmenoveRizeniVazbaDto.d.ts
*                Dto\Cis\GPsccdosDto.d.ts
*                Dto\Cis\GPsccmisDto.d.ts
*                Dto\Cis\GPsccpscDto.d.ts
*                Dto\Cis\GPsccrecDto.d.ts
*                Dto\Cis\GPscctfzDto.d.ts
*                Dto\Cis\GPscctypDto.d.ts
*                Dto\Cis\GPscczmrDto.d.ts
*                Dto\Cis\GPscczpvDto.d.ts
*                Dto\Cis\GPsccztpDto.d.ts
*                Dto\Cis\GPscdkprDto.d.ts
*                Dto\Cis\GPscscleDto.d.ts
*                Dto\Cis\GPscsdenDto.d.ts
*                Dto\Cis\GPscsdodDto.d.ts
*                Dto\Cis\GPscskhoDto.d.ts
*                Dto\Cis\GPscskprDto.d.ts
*                Dto\Cis\GPscsmisDto.d.ts
*                Dto\Cis\GPscsnkhDto.d.ts
*                Dto\Cis\GPscstnaDto.d.ts
*                Isl\IGPcnAda.d.ts
*                Isl\IGPcnCesta.d.ts
*                Isl\IGPcnCestaEtapa.d.ts
*                Isl\IGPcnCestaFinancovani.d.ts
*                Isl\IGPcnCestaRocniRozpis.d.ts
*                Isl\IGPcnCestaUcastnikJmeno.d.ts
*                Isl\IGPcnCestaUcastnikPocet.d.ts
*                Isl\IGPcnCestaVydaj.d.ts
*                Isl\IGPcnCiloveMisto.d.ts
*                Isl\IGPcnDefiniceZavaznehoUkazatele.d.ts
*                Isl\IGPcnDodatekCN.d.ts
*                Isl\IGPcnKategorieHodnoceni.d.ts
*                Isl\IGPcnKniha.d.ts
*                Isl\IGPcnKontrolaLimitu.d.ts
*                Isl\IGPcnOmezeniNks.d.ts
*                Isl\IGPcnPodpora.d.ts
*                Isl\IGPcnPrehledVystupuBar.d.ts
*                Isl\IGPcnSml.d.ts
*                Isl\IGPcnSouhrn.d.ts
*                Isl\IGPcnTempTabulka.d.ts
*                Isl\IGPcnWflProfil.d.ts
*                Isl\IGPcnZabezpecujiciNks.d.ts
*                Isl\IGPcnZmenoveRizeni.d.ts
*                Isl\IGPcnZmenoveRizeniDotcenePoz.d.ts
*                Isl\IGPcnZmenoveRizeniFinancniProfil.d.ts
*                Isl\IGPcnZmenoveRizeniRoz.d.ts
*                Isl\IGPcnZmenoveRizeniVazba.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnAdaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující napojení na akci Ada.*/
	interface GPcnAdaDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Číslo.*/
		cislo?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Typ.*/
		typ?: number|null;
		/**Adresa1.*/
		adresa1?: string|null;
		/**Adresa2.*/
		adresa2?: string|null;
		/**Psc.*/
		psc?: string|null;
		/**Adresa3.*/
		adresa3?: string|null;
		/**Fin od.*/
		fin_od?: number|null;
		/**Fin do.*/
		fin_do?: number|null;
		/**Real od.*/
		real_od?: number|null;
		/**Real do.*/
		real_do?: number|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Os číslo.*/
		os_cislo?: string|null;
		/**Telefon.*/
		telefon?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ktg akce.*/
		ktg_akce?: number|null;
		/**Skp akce.*/
		skp_akce?: string|null;
		/**Psk akce.*/
		psk_akce?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Inv cis.*/
		inv_cis?: string|null;
		/**Mandatar.*/
		mandatar?: string|null;
		/**T nks.*/
		t_nks?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Xpf pf.*/
		xpf_pf?: string|null;
		/**Zad.*/
		zad?: string|null;
		/**Cevid.*/
		cevid?: string|null;
		/**Cpp.*/
		cpp?: string|null;
		/**Chp.*/
		chp?: string|null;
		/**Cip.*/
		cip?: string|null;
		/**C nato.*/
		c_nato?: JsonDecimal|null;
		/**C ipf.*/
		c_ipf?: JsonDecimal|null;
		/**Cpps01.*/
		cpps01?: string|null;
		/**Cpps02.*/
		cpps02?: string|null;
		/**Cpps03.*/
		cpps03?: string|null;
		/**Cpps04.*/
		cpps04?: string|null;
		/**Cpps05.*/
		cpps05?: string|null;
		/**Identifikátor pla.*/
		ixs_pla?: string|null;
		/**Mj.*/
		mj?: string|null;
		/**C pd.*/
		c_pd?: JsonDecimal|null;
		/**Číslo pd.*/
		cislo_pd?: string|null;
		/**Xpf nato.*/
		xpf_nato?: string|null;
		/**Cis real.*/
		cis_real?: string|null;
		/**Prij dot.*/
		prij_dot?: string|null;
		/**Skp.*/
		skp?: string|null;
		/**C celk.*/
		c_celk?: JsonDecimal|null;
		/**Identifikátor cia.*/
		ixs_cia?: string|null;
		/**Funkce akt.*/
		ixs_fun_akt?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Funkce zad.*/
		ixs_fun_zad?: string|null;
		/**Typ vzb.*/
		typ_vzb?: number|null;
		/**Datum mpd.*/
		dat_mpd?: JsonDate|null;
		/**Priz az.*/
		priz_az?: number|null;
		/**Stav inp.*/
		stav_inp?: number|null;
		/**Identifikátor csp.*/
		ixs_csp?: string|null;
		/**Skp akc.*/
		skp_akc?: string|null;
		/**Psk akc.*/
		psk_akc?: string|null;
		/**Upresneni.*/
		upresneni?: string|null;
		/**Priz ram doh.*/
		priz_ram_doh?: number|null;
		/**Identifikátor druh real.*/
		ixs_druh_real?: string|null;
		/**Rezim real.*/
		rezim_real?: number|null;
		/**Povol real.*/
		povol_real?: number|null;
		/**Priz fin.*/
		priz_fin?: number|null;
		/**Identifikátor csl.*/
		ixs_csl?: string|null;
		/**Stav real.*/
		stav_real?: number|null;
		/**Identifikátor prr.*/
		ixs_prr?: string|null;
		/**Typ akce sum.*/
		typ_akce_sum?: number|null;
		/**Stav az.*/
		stav_az?: number|null;
		/**Funkce az.*/
		ixs_fun_az?: string|null;
		/**Identifikátor tri.*/
		ixs_tri?: string|null;
		/**Org.*/
		te1?: string|null;
		/**Rok CIA pro výběr v RCN.*/
		rok_cia?: number|null;
		/**Ičo CIA pro výběr v RCN.*/
		ico_cia?: string|null;
		/**Číslo CIA pro výběr v RCN.*/
		cislo_cia?: string|null;
	}
	const enum GPcnAdaDtoNames { rok = "rok", ico = "ico", cislo = "cislo", nazev = "nazev", typ = "typ", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_akce = "ktg_akce", skp_akce = "skp_akce", psk_akce = "psk_akce", aktivita = "aktivita", inv_cis = "inv_cis", mandatar = "mandatar", t_nks = "t_nks", nks = "nks", xpf_pf = "xpf_pf", zad = "zad", cevid = "cevid", cpp = "cpp", chp = "chp", cip = "cip", c_nato = "c_nato", c_ipf = "c_ipf", cpps01 = "cpps01", cpps02 = "cpps02", cpps03 = "cpps03", cpps04 = "cpps04", cpps05 = "cpps05", ixs_pla = "ixs_pla", mj = "mj", c_pd = "c_pd", cislo_pd = "cislo_pd", xpf_nato = "xpf_nato", cis_real = "cis_real", prij_dot = "prij_dot", skp = "skp", c_celk = "c_celk", ixs_cia = "ixs_cia", ixs_fun_akt = "ixs_fun_akt", ucs = "ucs", ixs_fun_zad = "ixs_fun_zad", typ_vzb = "typ_vzb", dat_mpd = "dat_mpd", priz_az = "priz_az", stav_inp = "stav_inp", ixs_csp = "ixs_csp", skp_akc = "skp_akc", psk_akc = "psk_akc", upresneni = "upresneni", priz_ram_doh = "priz_ram_doh", ixs_druh_real = "ixs_druh_real", rezim_real = "rezim_real", povol_real = "povol_real", priz_fin = "priz_fin", ixs_csl = "ixs_csl", stav_real = "stav_real", ixs_prr = "ixs_prr", typ_akce_sum = "typ_akce_sum", stav_az = "stav_az", ixs_fun_az = "ixs_fun_az", ixs_tri = "ixs_tri", te1 = "te1", rok_cia = "rok_cia", ico_cia = "ico_cia", cislo_cia = "cislo_cia",}
	const enum GPcnAdaDtoFragments { rok = "main", ico = "main", cislo = "main", nazev = "main", typ = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", dat_zmena = "main", zmenu_prov = "main", ktg_akce = "main", skp_akce = "main", psk_akce = "main", aktivita = "main", inv_cis = "main", mandatar = "main", t_nks = "main", nks = "main", xpf_pf = "main", zad = "main", cevid = "main", cpp = "main", chp = "main", cip = "main", c_nato = "main", c_ipf = "main", cpps01 = "main", cpps02 = "main", cpps03 = "main", cpps04 = "main", cpps05 = "main", ixs_pla = "main", mj = "main", c_pd = "main", cislo_pd = "main", xpf_nato = "main", cis_real = "main", prij_dot = "main", skp = "main", c_celk = "main", ixs_cia = "main", ixs_fun_akt = "main", ucs = "main", ixs_fun_zad = "main", typ_vzb = "main", dat_mpd = "main", priz_az = "main", stav_inp = "main", ixs_csp = "main", skp_akc = "main", psk_akc = "main", upresneni = "main", priz_ram_doh = "main", ixs_druh_real = "main", rezim_real = "main", povol_real = "main", priz_fin = "main", ixs_csl = "main", stav_real = "main", ixs_prr = "main", typ_akce_sum = "main", stav_az = "main", ixs_fun_az = "main", ixs_tri = "main", te1 = "*", rok_cia = "main", ico_cia = "main", cislo_cia = "main",}
	const enum GPcnAdaDtoTypes { rok = "number", ico = "string", cislo = "string", nazev = "string", typ = "number", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_akce = "number", skp_akce = "string", psk_akce = "string", aktivita = "number", inv_cis = "string", mandatar = "string", t_nks = "string", nks = "string", xpf_pf = "string", zad = "string", cevid = "string", cpp = "string", chp = "string", cip = "string", c_nato = "JsonDecimal", c_ipf = "JsonDecimal", cpps01 = "string", cpps02 = "string", cpps03 = "string", cpps04 = "string", cpps05 = "string", ixs_pla = "string", mj = "string", c_pd = "JsonDecimal", cislo_pd = "string", xpf_nato = "string", cis_real = "string", prij_dot = "string", skp = "string", c_celk = "JsonDecimal", ixs_cia = "string", ixs_fun_akt = "string", ucs = "string", ixs_fun_zad = "string", typ_vzb = "number", dat_mpd = "JsonDate", priz_az = "number", stav_inp = "number", ixs_csp = "string", skp_akc = "string", psk_akc = "string", upresneni = "string", priz_ram_doh = "number", ixs_druh_real = "string", rezim_real = "number", povol_real = "number", priz_fin = "number", ixs_csl = "string", stav_real = "number", ixs_prr = "string", typ_akce_sum = "number", stav_az = "number", ixs_fun_az = "string", ixs_tri = "string", te1 = "string", rok_cia = "number", ico_cia = "string", cislo_cia = "string",}
	const enum GPcnAdaDtoTypeLengths { ico = 10, cislo = 16, nazev = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 100, jmeno = 100, os_cislo = 10, telefon = 254, zmenu_prov = 12, skp_akce = 6, psk_akce = 4, inv_cis = 12, mandatar = 5, t_nks = 50, nks = 12, xpf_pf = 63, zad = 35, cevid = 6, cpp = 6, chp = 6, cip = 13, cpps01 = 6, cpps02 = 6, cpps03 = 6, cpps04 = 6, cpps05 = 6, ixs_pla = 12, mj = 5, cislo_pd = 20, xpf_nato = 20, cis_real = 6, prij_dot = 254, skp = 15, ixs_cia = 12, ixs_fun_akt = 12, ucs = 10, ixs_fun_zad = 12, ixs_csp = 12, skp_akc = 20, psk_akc = 20, upresneni = 254, ixs_druh_real = 12, ixs_csl = 12, ixs_prr = 12, ixs_fun_az = 12, ixs_tri = 12, te1 = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující cestu nebo návštěvu.*/
	interface GPcnCestaDto {
		/**Identifikátor požadavku.*/
		ixp?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Stav požadavku.*/
		stav_psc?: number|null;
		/**Typ požadavku (cesty/návštěvy).*/
		typ_poz?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Třídění.*/
		uex_akt?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Datum počátku cesty.*/
		dat_poc?: JsonDate|null;
		/**Datum ukončení cesty.*/
		dat_konec?: JsonDate|null;
		/**Počet dnů.*/
		dnu?: number|null;
		/**Místo požadavku.*/
		misto?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Datum návrhu.*/
		dat_navrh?: JsonDate|null;
		/**Identifikátor funkce kompetenta.*/
		ixs_fun_komp?: string|null;
		/**Identifikátor funkce realizátora.*/
		ixs_fun_real?: string|null;
		/**Identifikátor funkce zadavatele.*/
		ixs_fun_zad?: string|null;
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt?: string|null;
		/**Počet účestníků.*/
		pmj?: number|null;
		/**Částka celkem.*/
		c_celk?: JsonDecimal|null;
		/**Kód způsobu výpočtu.*/
		zp_vyp?: number|null;
		/**Kód způsobu dopravy.*/
		zp_dopr?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Počet cest.*/
		pocet_cest?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Financující ičo.*/
		ico_fin?: string|null;
		/**Financující nákladové středisko.*/
		nks_fin?: string|null;
		/**Kód dopravního prostředku.*/
		dopr_pr?: number|null;
		/**Realizující ičo.*/
		ico_real?: string|null;
		/**Realizující nákladové středisko.*/
		nks_real?: string|null;
		/**Identifikátor na sloučenou cestu.*/
		ixp_prev?: string|null;
		/**Příznak zámku přepočtu výdaje.*/
		priz_zam?: number|null;
		/**Kód typu financování.*/
		kod_tfz?: number|null;
		/**Cs název.*/
		cs_nazev?: string|null;
		/**Příznak období plánování požadavků.*/
		druh_psc?: number|null;
		/**Org.*/
		org?: string|null;
		/**Identifikátor vlastníka (změnu provedl).*/
		ixs_zmp_akt?: string|null;
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad?: string|null;
		/**Rok ADA.*/
		rok_ada?: number|null;
		/**Ičo ADA.*/
		ico_ada?: string|null;
		/**Číslo ADA.*/
		cislo_ada?: string|null;
		/**Identifikátor cia ADA.*/
		ixs_cia_ada?: string|null;
		/**Příznak zákazu změnového řízení.*/
		priz_zak_zmr?: number|null;
		/**Identifikátor prvního změnového řízení.*/
		ixp_zmr_prvni?: string|null;
		/**Identifikátor smlouvy.*/
		ixp_sml?: string|null;
		/**Příznak nebalancovat.*/
		priz_nebalanc?: number|null;
		/**Identifikátor členění.*/
		ixs_cle?: string|null;
		/**Kód kategorie priorit.*/
		kat_pri?: number|null;
		/**Řádek kategorie priorit.*/
		radek_pop?: number|null;
		/**Nákladové středisko pro Org.*/
		hodnota_te1?: string|null;
		/**Priz view.*/
		priz_view?: number|null;
		/**Přeevidence (0 - v aktuální knize, 1 - předáno z jiné knihy, 2 - předáno do jiné knihy).*/
		preevidence?: number|null;
		/**Vlastnictví (0 - vlastní doklad, 1 - jiný zpracovatel).*/
		vlastnictvi?: number|null;
		/**El. obraz - typ souboru.*/
		el_obraz_typ?: string|null;
		/**El. obraz - název souboru.*/
		el_obraz_soubor?: string|null;
		/**El. přílohy - počet příloh.*/
		el_prilohy_pocet?: number|null;
		/**Barevný puntík.*/
		uzo?: string|null;
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Typ požadavku textově.*/
		typ_poz_txt?: string|null;
		/**Stav požadavku textově.*/
		stav_psc_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Způsob dopravy textově.*/
		zp_dopr_txt?: string|null;
		/**Kategorie - zařazení - seznam zkratek dělených čárkou získané DB funkcí.*/
		sez_kat_hod?: string|null;
		/**Funkce zadavatele.*/
		fun_zad?: string|null;
		/**Funkce vlastníka.*/
		fun_akt?: string|null;
		/**Příznak zákazu změnového řízení.*/
		readonly priz_zak_zmrB?: boolean|null;
		/**Příznak, zda požadavek vznikl sloučením.*/
		pozadavek_vznikly_sloucenim?: boolean|null;
		/**Kategorie hodnocení - zařazení.*/
		kat_hod?: string[]|null;
		/**Org.*/
		te1?: string|null;
		/**Počet poznámek.*/
		poc_poz?: number|null;
		/**Zkratka dopravního prostředku.*/
		zkr_dopr?: string|null;
		/**Identifikátor plánu pro výběr v RCN.*/
		ixp_pcn?: string|null;
	}
	const enum GPcnCestaDtoNames { ixp = "ixp", ixp_den = "ixp_den", ac = "ac", evi_cis = "evi_cis", stav_psc = "stav_psc", typ_poz = "typ_poz", rok = "rok", uex_akt = "uex_akt", nazev = "nazev", dat_poc = "dat_poc", dat_konec = "dat_konec", dnu = "dnu", misto = "misto", stat = "stat", dat_navrh = "dat_navrh", ixs_fun_komp = "ixs_fun_komp", ixs_fun_real = "ixs_fun_real", ixs_fun_zad = "ixs_fun_zad", ixs_fun_akt = "ixs_fun_akt", pmj = "pmj", c_celk = "c_celk", zp_vyp = "zp_vyp", zp_dopr = "zp_dopr", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", pocet_cest = "pocet_cest", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico_fin = "ico_fin", nks_fin = "nks_fin", dopr_pr = "dopr_pr", ico_real = "ico_real", nks_real = "nks_real", ixp_prev = "ixp_prev", priz_zam = "priz_zam", kod_tfz = "kod_tfz", cs_nazev = "cs_nazev", druh_psc = "druh_psc", org = "org", ixs_zmp_akt = "ixs_zmp_akt", ixs_zmp_zad = "ixs_zmp_zad", rok_ada = "rok_ada", ico_ada = "ico_ada", cislo_ada = "cislo_ada", ixs_cia_ada = "ixs_cia_ada", priz_zak_zmr = "priz_zak_zmr", ixp_zmr_prvni = "ixp_zmr_prvni", ixp_sml = "ixp_sml", priz_nebalanc = "priz_nebalanc", ixs_cle = "ixs_cle", kat_pri = "kat_pri", radek_pop = "radek_pop", hodnota_te1 = "hodnota_te1", priz_view = "priz_view", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", ixp_zmr = "ixp_zmr", pocet = "pocet", typ_poz_txt = "typ_poz_txt", stav_psc_txt = "stav_psc_txt", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt", sez_kat_hod = "sez_kat_hod", fun_zad = "fun_zad", fun_akt = "fun_akt", priz_zak_zmrB = "priz_zak_zmrB", pozadavek_vznikly_sloucenim = "pozadavek_vznikly_sloucenim", kat_hod = "kat_hod", te1 = "te1", poc_poz = "poc_poz", zkr_dopr = "zkr_dopr", ixp_pcn = "ixp_pcn",}
	const enum GPcnCestaDtoFragments { ixp = "main", ixp_den = "main", ac = "main", evi_cis = "main", stav_psc = "main", typ_poz = "main", rok = "main", uex_akt = "main", nazev = "main", dat_poc = "main", dat_konec = "main", dnu = "main", misto = "main", stat = "main", dat_navrh = "main", ixs_fun_komp = "main", ixs_fun_real = "main", ixs_fun_zad = "main", ixs_fun_akt = "main", pmj = "main", c_celk = "main", zp_vyp = "main", zp_dopr = "main", ico = "main", ucs = "main", uus = "main", nks = "main", pocet_cest = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ico_fin = "main", nks_fin = "main", dopr_pr = "main", ico_real = "main", nks_real = "main", ixp_prev = "main", priz_zam = "main", kod_tfz = "main", cs_nazev = "main", druh_psc = "main", org = "main", ixs_zmp_akt = "main", ixs_zmp_zad = "main", rok_ada = "main", ico_ada = "main", cislo_ada = "main", ixs_cia_ada = "main", priz_zak_zmr = "main", ixp_zmr_prvni = "main", ixp_sml = "main", priz_nebalanc = "main", ixs_cle = "main", kat_pri = "main", radek_pop = "main", hodnota_te1 = "main", priz_view = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", ixp_zmr = "*", pocet = "main", typ_poz_txt = "main", stav_psc_txt = "stav_psc_txt", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt", sez_kat_hod = "sez_kat_hod", fun_zad = "fun_zad", fun_akt = "fun_akt", priz_zak_zmrB = "main", pozadavek_vznikly_sloucenim = "main", kat_hod = "main", te1 = "main", poc_poz = "poc_poz", zkr_dopr = "zkr_dopr", ixp_pcn = "main",}
	const enum GPcnCestaDtoTypes { ixp = "string", ixp_den = "string", ac = "string", evi_cis = "string", stav_psc = "number", typ_poz = "number", rok = "number", uex_akt = "string", nazev = "string", dat_poc = "JsonDate", dat_konec = "JsonDate", dnu = "number", misto = "string", stat = "number", dat_navrh = "JsonDate", ixs_fun_komp = "string", ixs_fun_real = "string", ixs_fun_zad = "string", ixs_fun_akt = "string", pmj = "number", c_celk = "JsonDecimal", zp_vyp = "number", zp_dopr = "number", ico = "string", ucs = "string", uus = "string", nks = "string", pocet_cest = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico_fin = "string", nks_fin = "string", dopr_pr = "number", ico_real = "string", nks_real = "string", ixp_prev = "string", priz_zam = "number", kod_tfz = "number", cs_nazev = "string", druh_psc = "number", org = "string", ixs_zmp_akt = "string", ixs_zmp_zad = "string", rok_ada = "number", ico_ada = "string", cislo_ada = "string", ixs_cia_ada = "string", priz_zak_zmr = "number", ixp_zmr_prvni = "string", ixp_sml = "string", priz_nebalanc = "number", ixs_cle = "string", kat_pri = "number", radek_pop = "number", hodnota_te1 = "string", priz_view = "number", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", ixp_zmr = "string", pocet = "number", typ_poz_txt = "string", stav_psc_txt = "string", stat_txt = "string", zp_dopr_txt = "string", sez_kat_hod = "string", fun_zad = "string", fun_akt = "string", priz_zak_zmrB = "boolean", pozadavek_vznikly_sloucenim = "boolean", kat_hod = "string[]", te1 = "string", poc_poz = "number", zkr_dopr = "string", ixp_pcn = "string",}
	const enum GPcnCestaDtoTypeLengths { ixp = 12, ixp_den = 12, ac = 20, evi_cis = 30, uex_akt = 16, nazev = 254, misto = 50, ixs_fun_komp = 12, ixs_fun_real = 12, ixs_fun_zad = 12, ixs_fun_akt = 12, ico = 10, ucs = 10, uus = 10, nks = 12, zmenu_prov = 12, ico_fin = 10, nks_fin = 12, ico_real = 10, nks_real = 12, ixp_prev = 12, cs_nazev = 254, org = 16, ixs_zmp_akt = 12, ixs_zmp_zad = 12, ico_ada = 10, cislo_ada = 16, ixs_cia_ada = 12, ixp_zmr_prvni = 12, ixp_sml = 12, ixs_cle = 12, hodnota_te1 = 16, ixp_zmr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaEtapaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující etapu na cestě/návštěvě.*/
	interface GPcnCestaEtapaDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Řádek etapy.*/
		radek_pep?: number|null;
		/**Z místa.*/
		z_mista?: string|null;
		/**Do místa.*/
		do_mista?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Kód způsobu dopravy.*/
		zp_dopr?: number|null;
		/**Vzdálenost v km.*/
		km?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Průměrná spotřeba.*/
		prum_sp?: JsonDecimal|null;
		/**Kód dopravního prostředku.*/
		dopr_pr?: number|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Způsob dopravy textově.*/
		zp_dopr_txt?: string|null;
	}
	const enum GPcnCestaEtapaDtoNames { ixp = "ixp", radek_pep = "radek_pep", z_mista = "z_mista", do_mista = "do_mista", stat = "stat", dat_od = "dat_od", dat_do = "dat_do", zp_dopr = "zp_dopr", km = "km", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prum_sp = "prum_sp", dopr_pr = "dopr_pr", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GPcnCestaEtapaDtoFragments { ixp = "*", radek_pep = "*", z_mista = "*", do_mista = "*", stat = "*", dat_od = "*", dat_do = "*", zp_dopr = "*", km = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prum_sp = "*", dopr_pr = "*", stat_txt = "*", zp_dopr_txt = "*",}
	const enum GPcnCestaEtapaDtoTypes { ixp = "string", radek_pep = "number", z_mista = "string", do_mista = "string", stat = "number", dat_od = "JsonDate", dat_do = "JsonDate", zp_dopr = "number", km = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prum_sp = "JsonDecimal", dopr_pr = "number", stat_txt = "string", zp_dopr_txt = "string",}
	const enum GPcnCestaEtapaDtoTypeLengths { ixp = 12, z_mista = 30, do_mista = 30, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaFinancovaniDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující financování na cestě/návštěvě.*/
	interface GPcnCestaFinancovaniDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Řádek financování.*/
		radek_pol?: number|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Částka v korunách.*/
		c_celk?: JsonDecimal|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Kód příznaku reciprocity.*/
		priz_recip?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Příznak generováno.*/
		priz_gen?: number|null;
		/**Příznak započítávat do výdajů.*/
		priz_zapoc?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Kód typu cestujícího.*/
		typ_dos?: number|null;
		/**Identifikátor smlouvy.*/
		ixp_sml?: string|null;
		/**Agendové číslo smlouvy.*/
		ac_sml?: string|null;
		/**Příznak nebalancovat.*/
		priz_nebalanc?: number|null;
		/**Identifikátor definovaného typu osoby.*/
		ixs_tos?: string|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
	}
	const enum GPcnCestaFinancovaniDtoNames { ixp = "ixp", radek_pol = "radek_pol", ixs_tna = "ixs_tna", stat = "stat", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", priz_recip = "priz_recip", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_gen = "priz_gen", priz_zapoc = "priz_zapoc", poznamka = "poznamka", typ_dos = "typ_dos", ixp_sml = "ixp_sml", ac_sml = "ac_sml", priz_nebalanc = "priz_nebalanc", ixs_tos = "ixs_tos", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ixp_den = "ixp_den", evi_cis = "evi_cis",}
	const enum GPcnCestaFinancovaniDtoFragments { ixp = "main", radek_pol = "main", ixs_tna = "main", stat = "main", mena = "main", c_mena = "main", c_celk = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", priz_recip = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", priz_gen = "main", priz_zapoc = "main", poznamka = "main", typ_dos = "main", ixp_sml = "main", ac_sml = "main", priz_nebalanc = "main", ixs_tos = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", ixp_den = "*", evi_cis = "*",}
	const enum GPcnCestaFinancovaniDtoTypes { ixp = "string", radek_pol = "number", ixs_tna = "string", stat = "number", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", priz_recip = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_gen = "number", priz_zapoc = "number", poznamka = "string", typ_dos = "number", ixp_sml = "string", ac_sml = "string", priz_nebalanc = "number", ixs_tos = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", ixp_den = "string", evi_cis = "string",}
	const enum GPcnCestaFinancovaniDtoTypeLengths { ixp = 12, ixs_tna = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, poznamka = 254, ixp_sml = 12, ac_sml = 30, ixs_tos = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaRocniRozpisDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující roční rozpis na cestě/návštěvě.*/
	interface GPcnCestaRocniRozpisDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Třídění.*/
		uex_akt?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Dnů.*/
		dnu?: number|null;
		/**Počet cestujících.*/
		pmj?: number|null;
		/**Počet cest.*/
		pocet_cest?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód dopravního prostředku.*/
		dopr_pr?: number|null;
	}
	const enum GPcnCestaRocniRozpisDtoNames { ixp = "ixp", rok = "rok", uex_akt = "uex_akt", nazev = "nazev", dnu = "dnu", pmj = "pmj", pocet_cest = "pocet_cest", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dopr_pr = "dopr_pr",}
	const enum GPcnCestaRocniRozpisDtoFragments { ixp = "*", rok = "*", uex_akt = "*", nazev = "*", dnu = "*", pmj = "*", pocet_cest = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dopr_pr = "*",}
	const enum GPcnCestaRocniRozpisDtoTypes { ixp = "string", rok = "number", uex_akt = "string", nazev = "string", dnu = "number", pmj = "number", pocet_cest = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dopr_pr = "number",}
	const enum GPcnCestaRocniRozpisDtoTypeLengths { ixp = 12, uex_akt = 16, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaUcastnikJmenoDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující jmenný seznam účastníků.*/
	interface GPcnCestaUcastnikJmenoDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Pořadí osoby.*/
		por_oso?: number|null;
		/**Kód vztahu osoby k požadavku.*/
		stav_dos?: number|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Titul před.*/
		tit_pred?: string|null;
		/**Titul za.*/
		tit_za?: string|null;
		/**Identifikátor funkce.*/
		ixs_fun?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Osobní číslo.*/
		oc?: string|null;
		/**Vztahu osoby k požadavku textově.*/
		stav_dos_txt?: string|null;
	}
	const enum GPcnCestaUcastnikJmenoDtoNames { ixp = "ixp", por_oso = "por_oso", stav_dos = "stav_dos", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", ixs_fun = "ixs_fun", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", oc = "oc", stav_dos_txt = "stav_dos_txt",}
	const enum GPcnCestaUcastnikJmenoDtoFragments { ixp = "*", por_oso = "*", stav_dos = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", ixs_fun = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", oc = "*", stav_dos_txt = "*",}
	const enum GPcnCestaUcastnikJmenoDtoTypes { ixp = "string", por_oso = "number", stav_dos = "number", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", ixs_fun = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", oc = "string", stav_dos_txt = "string",}
	const enum GPcnCestaUcastnikJmenoDtoTypeLengths { ixp = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, ixs_fun = 12, poznamka = 254, zmenu_prov = 12, oc = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaUcastnikPocetDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující počty účastníků dle typu.*/
	interface GPcnCestaUcastnikPocetDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Kód typu účastníka.*/
		typ_dos?: number|null;
		/**Počet účastníků.*/
		pocet?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Financující nákladové středisko.*/
		nks_fin?: string|null;
		/**Identifikátor typu účastníka.*/
		ixs_tos?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Typ účastníka textově.*/
		typ_dos_txt?: string|null;
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
	}
	const enum GPcnCestaUcastnikPocetDtoNames { ixp = "ixp", rok = "rok", typ_dos = "typ_dos", pocet = "pocet", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nks_fin = "nks_fin", ixs_tos = "ixs_tos", ico = "ico", typ_dos_txt = "typ_dos_txt", ixp_zmr = "ixp_zmr",}
	const enum GPcnCestaUcastnikPocetDtoFragments { ixp = "*", rok = "*", typ_dos = "*", pocet = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nks_fin = "*", ixs_tos = "*", ico = "*", typ_dos_txt = "*", ixp_zmr = "*",}
	const enum GPcnCestaUcastnikPocetDtoTypes { ixp = "string", rok = "number", typ_dos = "number", pocet = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nks_fin = "string", ixs_tos = "string", ico = "string", typ_dos_txt = "string", ixp_zmr = "string",}
	const enum GPcnCestaUcastnikPocetDtoTypeLengths { ixp = 12, zmenu_prov = 12, nks_fin = 12, ixs_tos = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCestaVydajDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující výdaje na cestě/návštěvě.*/
	interface GPcnCestaVydajDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Řadek výdaje.*/
		radek_pol?: number|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Částka v CZK.*/
		c_celk?: JsonDecimal|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4*/
		te4?: string|null;
		/**Příznak reciprocity.*/
		priz_recip?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Příznak gennerovaného řádku výdaje.*/
		priz_gen?: number|null;
		/**Příznak započítávat do výdajů.*/
		priz_zapoc?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Kód typu účastníka.*/
		typ_dos?: number|null;
		/**Identifikátor smlouvy.*/
		ixp_sml?: string|null;
		/**Agendové číslo smlouvy.*/
		ac_sml?: string|null;
		/**Příznak nebalancovat.*/
		priz_nebalanc?: number|null;
		/**Identifikátor typu osoby.*/
		ixs_tos?: string|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Příznak započítávat do výdajů.*/
		priz_zapocB?: boolean|null;
		/**Příznak nebalancovatelnosti.*/
		priz_nebalancB?: boolean|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Zkratky měny.*/
		mena_zkr?: string|null;
		/**Příznak reciprocity txtextově.*/
		priz_recip_txt?: string|null;
		/**Název typu náhrady.*/
		nazev_tna?: string|null;
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
	}
	const enum GPcnCestaVydajDtoNames { ixp = "ixp", radek_pol = "radek_pol", ixs_tna = "ixs_tna", stat = "stat", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", priz_recip = "priz_recip", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_gen = "priz_gen", priz_zapoc = "priz_zapoc", poznamka = "poznamka", typ_dos = "typ_dos", ixp_sml = "ixp_sml", ac_sml = "ac_sml", priz_nebalanc = "priz_nebalanc", ixs_tos = "ixs_tos", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", priz_zapocB = "priz_zapocB", priz_nebalancB = "priz_nebalancB", stat_txt = "stat_txt", mena_zkr = "mena_zkr", priz_recip_txt = "priz_recip_txt", nazev_tna = "nazev_tna", ixp_zmr = "ixp_zmr",}
	const enum GPcnCestaVydajDtoFragments { ixp = "main", radek_pol = "main", ixs_tna = "main", stat = "main", mena = "main", c_mena = "main", c_celk = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "financovani", ueb = "financovani", uec = "financovani", ued = "financovani", uee = "financovani", uef = "financovani", ueg = "financovani", ueh = "financovani", uei = "financovani", uej = "financovani", te0 = "financovani", te1 = "financovani", te2 = "financovani", te3 = "financovani", te4 = "financovani", priz_recip = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", priz_gen = "main", priz_zapoc = "main", poznamka = "main", typ_dos = "main", ixp_sml = "main", ac_sml = "main", priz_nebalanc = "main", ixs_tos = "main", uek = "financovani", uel = "financovani", uem = "financovani", uen = "financovani", te5 = "financovani", te6 = "financovani", te7 = "financovani", te8 = "financovani", te9 = "financovani", priz_zapocB = "financovani", priz_nebalancB = "financovani", stat_txt = "stat_txt", mena_zkr = "main", priz_recip_txt = "priz_recip_txt", nazev_tna = "main", ixp_zmr = "*",}
	const enum GPcnCestaVydajDtoTypes { ixp = "string", radek_pol = "number", ixs_tna = "string", stat = "number", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", priz_recip = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_gen = "number", priz_zapoc = "number", poznamka = "string", typ_dos = "number", ixp_sml = "string", ac_sml = "string", priz_nebalanc = "number", ixs_tos = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", priz_zapocB = "boolean", priz_nebalancB = "boolean", stat_txt = "string", mena_zkr = "string", priz_recip_txt = "string", nazev_tna = "string", ixp_zmr = "string",}
	const enum GPcnCestaVydajDtoTypeLengths { ixp = 12, ixs_tna = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, poznamka = 254, ixp_sml = 12, ac_sml = 30, ixs_tos = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnCiloveMistoDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující číselník cílových míst.*/
	interface GPcnCiloveMistoDto {
		/**ID místa.*/
		id_misto?: number|null;
		/**Název místa.*/
		misto?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Viditelnost.*/
		viditelnost?: number|null;
		/**Viditelnost_txt.*/
		viditelnost_txt?: string|null;
	}
	const enum GPcnCiloveMistoDtoNames { id_misto = "id_misto", misto = "misto", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", viditelnost = "viditelnost", viditelnost_txt = "viditelnost_txt",}
	const enum GPcnCiloveMistoDtoFragments { id_misto = "main", misto = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", viditelnost = "main", viditelnost_txt = "viditelnost_txt",}
	const enum GPcnCiloveMistoDtoTypes { id_misto = "number", misto = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", viditelnost = "number", viditelnost_txt = "string",}
	const enum GPcnCiloveMistoDtoTypeLengths { misto = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnDefiniceZavaznehoUkazateleDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující definici závazného ukazatele.*/
	interface GPcnDefiniceZavaznehoUkazateleDto {
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Řádek ukazatele.*/
		radek_pol?: number|null;
		/**Identifikátor typu náhrad.*/
		ixs_tna?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Kód typu cestujícího.*/
		typ_dos?: number|null;
		/**Částka v CZK.*/
		c_celk?: JsonDecimal|null;
		/**Počet celkem.*/
		poc_celk?: number|null;
		/**Datum výpočtu.*/
		dat_vypoctu?: JsonDate|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Textový popis aktivity.*/
		aktivita_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
	}
	const enum GPcnDefiniceZavaznehoUkazateleDtoNames { ixp_den = "ixp_den", radek_pol = "radek_pol", ixs_tna = "ixs_tna", stat = "stat", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", typ_dos = "typ_dos", c_celk = "c_celk", poc_celk = "poc_celk", dat_vypoctu = "dat_vypoctu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", aktivita_txt = "aktivita_txt", stat_txt = "stat_txt",}
	const enum GPcnDefiniceZavaznehoUkazateleDtoFragments { ixp_den = "main", radek_pol = "main", ixs_tna = "main", stat = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", typ_dos = "main", c_celk = "main", poc_celk = "main", dat_vypoctu = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", aktivita_txt = "*", stat_txt = "*",}
	const enum GPcnDefiniceZavaznehoUkazateleDtoTypes { ixp_den = "string", radek_pol = "number", ixs_tna = "string", stat = "number", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", typ_dos = "number", c_celk = "JsonDecimal", poc_celk = "number", dat_vypoctu = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", aktivita_txt = "string", stat_txt = "string",}
	const enum GPcnDefiniceZavaznehoUkazateleDtoTypeLengths { ixp_den = 12, ixs_tna = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnDodatekCNDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující dodatek cest a návštěv.*/
	interface GPcnDodatekCNDto {
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Aktivita txt - popis aktivity.*/
		aktivita_txt?: string|null;
	}
	const enum GPcnDodatekCNDtoNames { ixp = "ixp", ixp_den = "ixp_den", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita_txt = "aktivita_txt",}
	const enum GPcnDodatekCNDtoFragments { ixp = "*", ixp_den = "*", nazev = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", aktivita_txt = "*",}
	const enum GPcnDodatekCNDtoTypes { ixp = "string", ixp_den = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita_txt = "string",}
	const enum GPcnDodatekCNDtoTypeLengths { ixp = 12, ixp_den = 12, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnKategorieHodnoceniDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující kategorii hodnocení.*/
	interface GPcnKategorieHodnoceniDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Kód kategorie hodnocení.*/
		kat_hod?: string|null;
		/**Kategorie hodnocení popis.*/
		kat_hod_txt?: string|null;
		/**Filtr.*/
		filtr?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód typu požadavku.*/
		typ_poz?: number|null;
		/**Typ požadavku textě.*/
		typ_poz_txt?: string|null;
	}
	const enum GPcnKategorieHodnoceniDtoNames { ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", filtr = "filtr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt",}
	const enum GPcnKategorieHodnoceniDtoFragments { ico = "*", rok = "*", kat_hod = "*", kat_hod_txt = "*", filtr = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_poz = "*", typ_poz_txt = "*",}
	const enum GPcnKategorieHodnoceniDtoTypes { ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", filtr = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", typ_poz_txt = "string",}
	const enum GPcnKategorieHodnoceniDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, filtr = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnKnihaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující knihu Pcn.*/
	interface GPcnKnihaDto extends Gordic.Eko.Interface.GEkosdenDto {
		/**Licence.*/
		lic?: string|null;
		/**Arw.*/
		arw?: number|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Pořadové číslo maximum.*/
		por_cislo_max?: number|null;
		/**Subřada maximum.*/
		subrada_max?: number|null;
		/**Subřada duz.*/
		subrada_duz?: number|null;
		/**Délka agendového čísla.*/
		len_ac?: number|null;
		/**Krok uzávěrky.*/
		krok_uza?: number|null;
		/**Identifikátor původní knihy.*/
		ixp_den_old?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Rok sběru dat.*/
		rok_sberu?: number|null;
		/**Příznak plánování (běžný rok/mimo plán).*/
		priz_plan?: number|null;
		/**Aktivita textově.*/
		aktivita_txt?: string|null;
	}
	const enum GPcnKnihaDtoNames { lic = "lic", arw = "arw", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rok_sberu = "rok_sberu", priz_plan = "priz_plan", aktivita_txt = "aktivita_txt", ixp_den = "ixp_den", aktivita = "aktivita", nazev = "nazev", rok = "rok", prefix = "prefix", suffix = "suffix", ktg_den = "ktg_den", typ_den = "typ_den", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", akt_subrady_txt = "akt_subrady_txt", typ_ag = "typ_ag", ixs_vpk = "ixs_vpk",}
	const enum GPcnKnihaDtoFragments { lic = "*", arw = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", por_cislo_max = "*", subrada_max = "*", subrada_duz = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", rok_sberu = "*", priz_plan = "*", aktivita_txt = "*", ixp_den = "*", aktivita = "*", nazev = "*", rok = "*", prefix = "*", suffix = "*", ktg_den = "*", typ_den = "*", zkratka = "*", subrada = "*", akt_subrady = "*", ktg_den_txt = "*", akt_subrady_txt = "*", typ_ag = "*", ixs_vpk = "*",}
	const enum GPcnKnihaDtoTypes { lic = "string", arw = "number", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", rok_sberu = "number", priz_plan = "number", aktivita_txt = "string", ixp_den = "string", aktivita = "number", nazev = "string", rok = "number", prefix = "string", suffix = "string", ktg_den = "number", typ_den = "number", zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", akt_subrady_txt = "string", typ_ag = "number", ixs_vpk = "string",}
	const enum GPcnKnihaDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ixp_den_old = 12, uus = 10, poznamka = 254, zmenu_prov = 12, ixp_den = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnKontrolaLimituDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující kontrolu limitů.*/
	interface GPcnKontrolaLimituDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Částka limitu.*/
		c_limit?: JsonDecimal|null;
		/**Částka limitu BAR.*/
		c_limit_bar?: JsonDecimal|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Nákladové středisko.*/
		ns?: string|null;
		/**Celkem plánováno.*/
		c_celk?: JsonDecimal|null;
		/**Limit zbývá.*/
		c_limit_zb?: JsonDecimal|null;
		/**Castka.*/
		castka?: JsonDecimal|null;
		nksnove?: string|null;
	}
	const enum GPcnKontrolaLimituDtoNames { rok = "rok", ico = "ico", nks = "nks", radek = "radek", c_limit = "c_limit", c_limit_bar = "c_limit_bar", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ns = "ns", c_celk = "c_celk", c_limit_zb = "c_limit_zb", castka = "castka", nksnove = "nksnove",}
	const enum GPcnKontrolaLimituDtoFragments { rok = "main", ico = "main", nks = "main", radek = "main", c_limit = "main", c_limit_bar = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", ns = "*", c_celk = "*", c_limit_zb = "*", castka = "*", nksnove = "*",}
	const enum GPcnKontrolaLimituDtoTypes { rok = "number", ico = "string", nks = "string", radek = "number", c_limit = "JsonDecimal", c_limit_bar = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", ns = "string", c_celk = "JsonDecimal", c_limit_zb = "JsonDecimal", castka = "JsonDecimal", nksnove = "string",}
	const enum GPcnKontrolaLimituDtoTypeLengths { ico = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
	/**Výstupy BAR do PCN.*/
	interface GVystupyBarPcnDto {
		/**Číslo výstupu.*/
		cislo_vystupu?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Načteno.*/
		nacteno?: number|null;
		/**Textový popis příznaku načteno.*/
		readonly nacteno_txt?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GVystupyBarPcnDtoNames { cislo_vystupu = "cislo_vystupu", popis = "popis", nacteno = "nacteno", nacteno_txt = "nacteno_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GVystupyBarPcnDtoFragments { cislo_vystupu = "*", popis = "*", nacteno = "*", nacteno_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GVystupyBarPcnDtoTypes { cislo_vystupu = "number", popis = "string", nacteno = "number", nacteno_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GVystupyBarPcnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnMenuCNDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt pro povolení menu CN.*/
	interface GPcnMenuCNDto {
		/**Možnost doporučit.*/
		doporucit?: boolean|null;
		/**Doporučit tooltip.*/
		doporucit_tooltip?: string|null;
		/**Editační režim.*/
		editacniRezim?: boolean|null;
		/**Editační režim tooltip.*/
		editacniRezim_tooltip?: string|null;
		/**Editace pole Ns pro Org.*/
		editacePoleNsProOrg?: boolean|null;
		/**Editace pole Ns pro Org tooltip.*/
		editacePoleNsProOrg_tooltip?: string|null;
		/**Možnost ověřit.*/
		overit?: boolean|null;
		/**Ověřit tooltip.*/
		overit_tooltip?: string|null;
		/**Pořízení nových.*/
		porizeniNovych?: boolean|null;
		/**Pořízení nových tooltip.*/
		porizeniNovych_tooltip?: string|null;
		/**Možnost předat.*/
		predat?: boolean|null;
		/**Možnost předat tooltip.*/
		predat_tooltip?: string|null;
		/**Možnost rozgenerovat.*/
		rozgenerovat?: boolean|null;
		/**Rozgenerovat tooltip.*/
		rozgenerovat_tooltip?: string|null;
		/**Možnost schválit.*/
		schvalit?: boolean|null;
		/**Schválit tooltip.*/
		schvalit_tooltip?: string|null;
		/**Možnost storno.*/
		storno?: boolean|null;
		/**Storno tooltip.*/
		storno_tooltip?: string|null;
		/**Možnost zrusit storno.*/
		zrusitStorno?: boolean|null;
		/**Zrusit storno tooltip.*/
		zrusitStorno_tooltip?: string|null;
		/**Možnost vrátit.*/
		vratit?: boolean|null;
		/**Vrátit tooltip.*/
		vratit_tooltip?: string|null;
		/**Možnost vrátit navrhovateli.*/
		vratitNavrhovateli?: boolean|null;
		/**Vrátit navrhovateli tooltip.*/
		vratitNavrhovateli_tooltip?: string|null;
		/**Možnost vypočítat.*/
		vypocitat?: boolean|null;
		/**Vypočítat tooltip.*/
		vypocitat_tooltip?: string|null;
		/**Správce plánu.*/
		spravcePlanu?: boolean|null;
		/**Správce plánu tooltip.*/
		spravcePlanu_tooltip?: string|null;
		/**Možnost sloučit.*/
		sloucit?: boolean|null;
		/**Možnost sloučit tooltip.*/
		sloucit_tooltip?: string|null;
		/**Možnost zaktivnit.*/
		zaktivnit?: boolean|null;
		/**Možnost zaktivnit tooltip.*/
		zaktivnit_tooltip?: string|null;
		/**Možnost zveřejnit.*/
		zverejnit?: boolean|null;
		/**Možnost zveřejnit tooltip.*/
		zverejnit_tooltip?: string|null;
		/**Možnost zakázat změnové řízení.*/
		zakazatZmr?: boolean|null;
		/**Možnost zakázat změnové řízení tooltip.*/
		zakazatZmr_tooltip?: string|null;
		/**Možnost povolit změnové rizeni.*/
		povolitZmr?: boolean|null;
		/**Možnost povolit zmenové řízení tooltip.*/
		povolitZmr_tooltip?: string|null;
		/**Možnost sjednotit pod jeden org.*/
		sjednotitPodJedenOrg?: boolean|null;
		/**Možnost sjednotit pod jeden org tooltip.*/
		sjednotitPodJedenOrg_tooltip?: string|null;
	}
	const enum GPcnMenuCNDtoNames { doporucit = "doporucit", doporucit_tooltip = "doporucit_tooltip", editacniRezim = "editacniRezim", editacniRezim_tooltip = "editacniRezim_tooltip", editacePoleNsProOrg = "editacePoleNsProOrg", editacePoleNsProOrg_tooltip = "editacePoleNsProOrg_tooltip", overit = "overit", overit_tooltip = "overit_tooltip", porizeniNovych = "porizeniNovych", porizeniNovych_tooltip = "porizeniNovych_tooltip", predat = "predat", predat_tooltip = "predat_tooltip", rozgenerovat = "rozgenerovat", rozgenerovat_tooltip = "rozgenerovat_tooltip", schvalit = "schvalit", schvalit_tooltip = "schvalit_tooltip", storno = "storno", storno_tooltip = "storno_tooltip", zrusitStorno = "zrusitStorno", zrusitStorno_tooltip = "zrusitStorno_tooltip", vratit = "vratit", vratit_tooltip = "vratit_tooltip", vratitNavrhovateli = "vratitNavrhovateli", vratitNavrhovateli_tooltip = "vratitNavrhovateli_tooltip", vypocitat = "vypocitat", vypocitat_tooltip = "vypocitat_tooltip", spravcePlanu = "spravcePlanu", spravcePlanu_tooltip = "spravcePlanu_tooltip", sloucit = "sloucit", sloucit_tooltip = "sloucit_tooltip", zaktivnit = "zaktivnit", zaktivnit_tooltip = "zaktivnit_tooltip", zverejnit = "zverejnit", zverejnit_tooltip = "zverejnit_tooltip", zakazatZmr = "zakazatZmr", zakazatZmr_tooltip = "zakazatZmr_tooltip", povolitZmr = "povolitZmr", povolitZmr_tooltip = "povolitZmr_tooltip", sjednotitPodJedenOrg = "sjednotitPodJedenOrg", sjednotitPodJedenOrg_tooltip = "sjednotitPodJedenOrg_tooltip",}
	const enum GPcnMenuCNDtoFragments { doporucit = "*", doporucit_tooltip = "*", editacniRezim = "*", editacniRezim_tooltip = "*", editacePoleNsProOrg = "*", editacePoleNsProOrg_tooltip = "*", overit = "*", overit_tooltip = "*", porizeniNovych = "*", porizeniNovych_tooltip = "*", predat = "*", predat_tooltip = "*", rozgenerovat = "*", rozgenerovat_tooltip = "*", schvalit = "*", schvalit_tooltip = "*", storno = "*", storno_tooltip = "*", zrusitStorno = "*", zrusitStorno_tooltip = "*", vratit = "*", vratit_tooltip = "*", vratitNavrhovateli = "*", vratitNavrhovateli_tooltip = "*", vypocitat = "*", vypocitat_tooltip = "*", spravcePlanu = "*", spravcePlanu_tooltip = "*", sloucit = "*", sloucit_tooltip = "*", zaktivnit = "*", zaktivnit_tooltip = "*", zverejnit = "*", zverejnit_tooltip = "*", zakazatZmr = "*", zakazatZmr_tooltip = "*", povolitZmr = "*", povolitZmr_tooltip = "*", sjednotitPodJedenOrg = "*", sjednotitPodJedenOrg_tooltip = "*",}
	const enum GPcnMenuCNDtoTypes { doporucit = "boolean", doporucit_tooltip = "string", editacniRezim = "boolean", editacniRezim_tooltip = "string", editacePoleNsProOrg = "boolean", editacePoleNsProOrg_tooltip = "string", overit = "boolean", overit_tooltip = "string", porizeniNovych = "boolean", porizeniNovych_tooltip = "string", predat = "boolean", predat_tooltip = "string", rozgenerovat = "boolean", rozgenerovat_tooltip = "string", schvalit = "boolean", schvalit_tooltip = "string", storno = "boolean", storno_tooltip = "string", zrusitStorno = "boolean", zrusitStorno_tooltip = "string", vratit = "boolean", vratit_tooltip = "string", vratitNavrhovateli = "boolean", vratitNavrhovateli_tooltip = "string", vypocitat = "boolean", vypocitat_tooltip = "string", spravcePlanu = "boolean", spravcePlanu_tooltip = "string", sloucit = "boolean", sloucit_tooltip = "string", zaktivnit = "boolean", zaktivnit_tooltip = "string", zverejnit = "boolean", zverejnit_tooltip = "string", zakazatZmr = "boolean", zakazatZmr_tooltip = "string", povolitZmr = "boolean", povolitZmr_tooltip = "string", sjednotitPodJedenOrg = "boolean", sjednotitPodJedenOrg_tooltip = "string",}
	const enum GPcnMenuCNDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnMenuZmrDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující pro povoleni menu ZMR.*/
	interface GPcnMenuZmrDto {
		/**Možnost storna.*/
		storno?: boolean|null;
		/**Možnost storna tooltip.*/
		storno_tooltip?: string|null;
		/**Možnost schválit.*/
		schvalit?: boolean|null;
		/**Možnost schválit tooltip.*/
		schvalit_tooltip?: string|null;
		/**Možnost odschválit.*/
		odschvalit?: boolean|null;
		/**Možnost odschválit tooltip.*/
		odschvalit_tooltip?: string|null;
		/**Možnost předat.*/
		predat?: boolean|null;
		/**Možnost předat tooltip.*/
		predat_tooltip?: string|null;
		/**Možnost exportovat do roz.*/
		exportRoz?: boolean|null;
		/**Možnost exportovat do roz tooltip.*/
		exportRoz_tooltip?: string|null;
		/**Možnost realizovat.*/
		realizovat?: boolean|null;
		/**Možnost realizovat tooltip.*/
		realizovat_tooltip?: string|null;
		/**Možnost nerealizovat.*/
		nerealizovat?: boolean|null;
		/**Možnost nerealizovat tooltip.*/
		nerealizovat_tooltip?: string|null;
		/**Editační režim.*/
		editacniRezim?: boolean|null;
		/**Editační režim tooltip.*/
		editacniRezim_tooltip?: string|null;
		/**Možnost podání.*/
		podani?: boolean|null;
		/**Možnost podání tooltip.*/
		podani_tooltip?: string|null;
	}
	const enum GPcnMenuZmrDtoNames { storno = "storno", storno_tooltip = "storno_tooltip", schvalit = "schvalit", schvalit_tooltip = "schvalit_tooltip", odschvalit = "odschvalit", odschvalit_tooltip = "odschvalit_tooltip", predat = "predat", predat_tooltip = "predat_tooltip", exportRoz = "exportRoz", exportRoz_tooltip = "exportRoz_tooltip", realizovat = "realizovat", realizovat_tooltip = "realizovat_tooltip", nerealizovat = "nerealizovat", nerealizovat_tooltip = "nerealizovat_tooltip", editacniRezim = "editacniRezim", editacniRezim_tooltip = "editacniRezim_tooltip", podani = "podani", podani_tooltip = "podani_tooltip",}
	const enum GPcnMenuZmrDtoFragments { storno = "*", storno_tooltip = "*", schvalit = "*", schvalit_tooltip = "*", odschvalit = "*", odschvalit_tooltip = "*", predat = "*", predat_tooltip = "*", exportRoz = "*", exportRoz_tooltip = "*", realizovat = "*", realizovat_tooltip = "*", nerealizovat = "*", nerealizovat_tooltip = "*", editacniRezim = "*", editacniRezim_tooltip = "*", podani = "*", podani_tooltip = "*",}
	const enum GPcnMenuZmrDtoTypes { storno = "boolean", storno_tooltip = "string", schvalit = "boolean", schvalit_tooltip = "string", odschvalit = "boolean", odschvalit_tooltip = "string", predat = "boolean", predat_tooltip = "string", exportRoz = "boolean", exportRoz_tooltip = "string", realizovat = "boolean", realizovat_tooltip = "string", nerealizovat = "boolean", nerealizovat_tooltip = "string", editacniRezim = "boolean", editacniRezim_tooltip = "string", podani = "boolean", podani_tooltip = "string",}
	const enum GPcnMenuZmrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnOmezeniNksDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující omezení dle Nks.*/
	interface GPcnOmezeniNksDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Částka limitu.*/
		c_limit?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kontrola limitu.*/
		kontrola_lim?: number|null;
		/**Zámek pořízení.*/
		poriz_zam?: number|null;
		/**Zámek editace.*/
		edit_zam?: number|null;
		/**Funkce.*/
		ixs_fun?: string|null;
		/**Zákaz pořízení.*/
		readonly poriz_zam_s?: string|null;
		/**Zákaz editace.*/
		readonly edit_zam_s?: string|null;
		/**Zákaz pořízení.*/
		poriz_zam_b?: boolean|null;
		/**Zákaz editace.*/
		edit_zam_b?: boolean|null;
		/**Ikc.*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GPcnOmezeniNksDtoNames { rok = "rok", ico = "ico", nks = "nks", c_limit = "c_limit", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrola_lim = "kontrola_lim", poriz_zam = "poriz_zam", edit_zam = "edit_zam", ixs_fun = "ixs_fun", poriz_zam_s = "poriz_zam_s", edit_zam_s = "edit_zam_s", poriz_zam_b = "poriz_zam_b", edit_zam_b = "edit_zam_b", ikc = "ikc",}
	const enum GPcnOmezeniNksDtoFragments { rok = "*", ico = "*", nks = "*", c_limit = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kontrola_lim = "*", poriz_zam = "*", edit_zam = "*", ixs_fun = "*", poriz_zam_s = "*", edit_zam_s = "*", poriz_zam_b = "*", edit_zam_b = "*", ikc = "*",}
	const enum GPcnOmezeniNksDtoTypes { rok = "number", ico = "string", nks = "string", c_limit = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kontrola_lim = "number", poriz_zam = "number", edit_zam = "number", ixs_fun = "string", poriz_zam_s = "string", edit_zam_s = "string", poriz_zam_b = "boolean", edit_zam_b = "boolean", ikc = "Gordic.General.GIkc",}
	const enum GPcnOmezeniNksDtoTypeLengths { ico = 10, nks = 12, zmenu_prov = 12,}
	/**DTO pro funkce bez omezení.*/
	interface GFceBezOmezeniDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Identifikátor funkce.*/
		ixs_fun?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Název referenta.*/
		nazev_ref?: string|null;
	}
	const enum GFceBezOmezeniDtoNames { rok = "rok", ico = "ico", nks = "nks", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", nazev_ref = "nazev_ref",}
	const enum GFceBezOmezeniDtoFragments { rok = "*", ico = "*", nks = "*", ixs_fun = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", nazev_ref = "*",}
	const enum GFceBezOmezeniDtoTypes { rok = "number", ico = "string", nks = "string", ixs_fun = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", nazev_ref = "string",}
	const enum GFceBezOmezeniDtoTypeLengths { ico = 10, nks = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnPodporaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující parametry pro podůrné metody.*/
	interface GPcnPodporaDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Zdrojový rok.*/
		rokZdroj?: number|null;
		/**Cílový rok.*/
		rokCil?: number|null;
	}
	const enum GPcnPodporaDtoNames { ixp = "ixp", rokZdroj = "rokZdroj", rokCil = "rokCil",}
	const enum GPcnPodporaDtoFragments { ixp = "*", rokZdroj = "*", rokCil = "*",}
	const enum GPcnPodporaDtoTypes { ixp = "string", rokZdroj = "number", rokCil = "number",}
	const enum GPcnPodporaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnPrehledLimituDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující přehled limitů.*/
	interface GPcnPrehledLimituDto {
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Třídění.*/
		uex_akt?: string|null;
		/**Limit.*/
		limit?: JsonDecimal|null;
		/**Vše.*/
		vse?: JsonDecimal|null;
		/**Schválené.*/
		schvalene?: JsonDecimal|null;
		/**Ičo.*/
		ico?: string|null;
	}
	const enum GPcnPrehledLimituDtoNames { nks = "nks", uex_akt = "uex_akt", limit = "limit", vse = "vse", schvalene = "schvalene", ico = "ico",}
	const enum GPcnPrehledLimituDtoFragments { nks = "*", uex_akt = "*", limit = "*", vse = "*", schvalene = "*", ico = "*",}
	const enum GPcnPrehledLimituDtoTypes { nks = "string", uex_akt = "string", limit = "JsonDecimal", vse = "JsonDecimal", schvalene = "JsonDecimal", ico = "string",}
	const enum GPcnPrehledLimituDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnPrehledVystupuBarDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující přehled výstupů Bar.*/
	interface GPcnPrehledVystupuBarDto {
		/**Pořadové číslo dávky.*/
		por_cis_d?: number|null;
		/**Řádek.*/
		radek?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Rok sběru.*/
		rok_sberu?: number|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Číslo akce.*/
		cislo_akce?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**C0.*/
		c0?: JsonDecimal|null;
		/**C1.*/
		c1?: JsonDecimal|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Ipf.*/
		ipf?: string|null;
		/**Dfs.*/
		dfs?: string|null;
		/**Komodita.*/
		komodita?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**C0 suma.*/
		c0_sum?: JsonDecimal|null;
		/**C1 suma.*/
		c1_sum?: JsonDecimal|null;
		/**Příznak nebalancovat.*/
		priz_nebalanc?: number|null;
		/**Identifikátor primárního dokladu.*/
		ixp_prim?: string|null;
		/**Příznak exportováno.*/
		priz_exp?: number|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Příznak exportováno textově.*/
		readonly priz_exp_txt?: string|null;
	}
	const enum GPcnPrehledVystupuBarDtoNames { por_cis_d = "por_cis_d", radek = "radek", rok = "rok", rok_sberu = "rok_sberu", ixp_den = "ixp_den", ixp = "ixp", cislo_akce = "cislo_akce", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", ipf = "ipf", dfs = "dfs", komodita = "komodita", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_sum = "c0_sum", c1_sum = "c1_sum", priz_nebalanc = "priz_nebalanc", ixp_prim = "ixp_prim", priz_exp = "priz_exp", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", priz_exp_txt = "priz_exp_txt",}
	const enum GPcnPrehledVystupuBarDtoFragments { por_cis_d = "main", radek = "main", rok = "main", rok_sberu = "main", ixp_den = "main", ixp = "main", cislo_akce = "main", ico = "main", ucs = "main", uus = "main", nks = "main", c0 = "main", c1 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", ipf = "main", dfs = "main", komodita = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c0_sum = "main", c1_sum = "main", priz_nebalanc = "main", ixp_prim = "main", priz_exp = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", priz_exp_txt = "*",}
	const enum GPcnPrehledVystupuBarDtoTypes { por_cis_d = "number", radek = "number", rok = "number", rok_sberu = "number", ixp_den = "string", ixp = "string", cislo_akce = "string", ico = "string", ucs = "string", uus = "string", nks = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", ipf = "string", dfs = "string", komodita = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c0_sum = "JsonDecimal", c1_sum = "JsonDecimal", priz_nebalanc = "number", ixp_prim = "string", priz_exp = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", priz_exp_txt = "string",}
	const enum GPcnPrehledVystupuBarDtoTypeLengths { ixp_den = 12, ixp = 12, cislo_akce = 16, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, ipf = 15, dfs = 15, komodita = 15, popis = 254, zmenu_prov = 12, ixp_prim = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnPrintParamDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující parametry tisku.*/
	interface GPcnPrintParamDto {
		/**Identifikátor dokladu.*/
		ixp?: string|null;
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Nákladové středisko.*/
		ns?: string|null;
	}
	const enum GPcnPrintParamDtoNames { ixp = "ixp", ixp_zmr = "ixp_zmr", ns = "ns",}
	const enum GPcnPrintParamDtoFragments { ixp = "*", ixp_zmr = "*", ns = "*",}
	const enum GPcnPrintParamDtoTypes { ixp = "string", ixp_zmr = "string", ns = "string",}
	const enum GPcnPrintParamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnSmlDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující podporu napojení na smlouvy.*/
	interface GPcnSmlDto {
		/**Identifikátor smlouvy.*/
		ixp_sml_pri?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Častka v CZK.*/
		c?: JsonDecimal|null;
		/**Částka položky.*/
		c_pol?: JsonDecimal|null;
		/**Částka fakturovaná.*/
		c_fak?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Kód kategorie smlouvy.*/
		ktg_sml?: number|null;
		/**Datum uzavření.*/
		dat_uzavreni?: JsonDate|null;
		/**Datum účinnosti.*/
		dat_ucinnost?: JsonDate|null;
		/**Datum platnosti.*/
		dat_platnost?: JsonDate|null;
		/**Identifikátor vyřizující funkce.*/
		ixs_fun_vyriz?: string|null;
		/**Identifikátor referenta funkce.*/
		ixs_fun_ref?: string|null;
		/**Číslo realizátora.*/
		cis_real?: string|null;
		/**Identifikátor případu blokační agendy.*/
		ixs_pri?: string|null;
		/**Identifikátor nabyvatele.*/
		ixp_nab?: string|null;
		/**Pořadové číslo nabyvatele.*/
		por_cislo_nab?: number|null;
		/**Typ agendového bloku.*/
		typ_ag_blok?: number|null;
		/**Financováno od.*/
		fin_od?: number|null;
		/**Financováno do.*/
		fin_do?: number|null;
		/**Kód stavu smlouvy.*/
		sml_stav?: number|null;
		/**Kód příznaku stavu.*/
		sgn_stav?: number|null;
		/**Typ ceny.*/
		typ_ceny?: number|null;
		/**Agendové číslo verze zakázky.*/
		ac_ver_zak?: string|null;
		/**Identifikátor typu.*/
		ixs_typ?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Agendové číslo smlouvy.*/
		ac_sml?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Příznak pzp.*/
		priz_pzp?: number|null;
		/**Částka v měně z osv.*/
		c_mena_z_osv?: JsonDecimal|null;
		/**Částka v měně z bd.*/
		c_mena_z_bd?: JsonDecimal|null;
		/**Částka v měně z ss.*/
		c_mena_z_ss?: JsonDecimal|null;
		/**Částka v měně z ns.*/
		c_mena_z_ns?: JsonDecimal|null;
		/**Částka v měně dph ss.*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**Částka v měně dph ns.*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**Částka v měně  ss.*/
		c_c_mena_ss?: JsonDecimal|null;
		/**Částka v měně  ns.*/
		c_c_mena_ns?: JsonDecimal|null;
		/**Částka v měně okr.*/
		c_c_mena_okr?: JsonDecimal|null;
		/**Typ phl.*/
		typ_phl?: string|null;
		/**Variabliní symbol.*/
		vs?: string|null;
		/**Částka v měně dph 3s.*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**Částka v měně dph 4s.*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**Částka v měně  z 3s.*/
		c_mena_z_3s?: JsonDecimal|null;
		/**Částka v měně z 4s.*/
		c_mena_z_4s?: JsonDecimal|null;
		/**Částka v měně 3s.*/
		c_c_mena_3s?: JsonDecimal|null;
		/**Částka v měně 4s.*/
		c_c_mena_4s?: JsonDecimal|null;
		/**Částka v měně doc.*/
		c_mena_doc?: JsonDecimal|null;
		/**Datum rad iissp.*/
		dat_rad_iissp?: JsonDate|null;
		/**Příznak opce.*/
		priz_opce?: number|null;
		/**Ixs_esu.*/
		ixs_esu?: string|null;
		/**Text esu.*/
		esu_txt?: string|null;
		/**Pid knihy.*/
		ixp_den?: string|null;
	}
	const enum GPcnSmlDtoNames { ixp_sml_pri = "ixp_sml_pri", ico = "ico", ucs = "ucs", nks = "nks", c_mena = "c_mena", c = "c", c_pol = "c_pol", c_fak = "c_fak", mena = "mena", ktg_sml = "ktg_sml", dat_uzavreni = "dat_uzavreni", dat_ucinnost = "dat_ucinnost", dat_platnost = "dat_platnost", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", cis_real = "cis_real", ixs_pri = "ixs_pri", ixp_nab = "ixp_nab", por_cislo_nab = "por_cislo_nab", typ_ag_blok = "typ_ag_blok", fin_od = "fin_od", fin_do = "fin_do", sml_stav = "sml_stav", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", ac_ver_zak = "ac_ver_zak", ixs_typ = "ixs_typ", popis = "popis", nazev = "nazev", ac_sml = "ac_sml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pzp = "priz_pzp", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", c_mena_doc = "c_mena_doc", dat_rad_iissp = "dat_rad_iissp", priz_opce = "priz_opce", ixs_esu = "ixs_esu", esu_txt = "esu_txt", ixp_den = "ixp_den",}
	const enum GPcnSmlDtoFragments { ixp_sml_pri = "*", ico = "*", ucs = "*", nks = "*", c_mena = "*", c = "*", c_pol = "*", c_fak = "*", mena = "*", ktg_sml = "*", dat_uzavreni = "*", dat_ucinnost = "*", dat_platnost = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", cis_real = "*", ixs_pri = "*", ixp_nab = "*", por_cislo_nab = "*", typ_ag_blok = "*", fin_od = "*", fin_do = "*", sml_stav = "*", sgn_stav = "*", typ_ceny = "*", ac_ver_zak = "*", ixs_typ = "*", popis = "*", nazev = "*", ac_sml = "*", dat_zmena = "*", zmenu_prov = "*", priz_pzp = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", typ_phl = "*", vs = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", c_mena_doc = "*", dat_rad_iissp = "*", priz_opce = "*", ixs_esu = "*", esu_txt = "*", ixp_den = "*",}
	const enum GPcnSmlDtoTypes { ixp_sml_pri = "string", ico = "string", ucs = "string", nks = "string", c_mena = "JsonDecimal", c = "JsonDecimal", c_pol = "JsonDecimal", c_fak = "JsonDecimal", mena = "number", ktg_sml = "number", dat_uzavreni = "JsonDate", dat_ucinnost = "JsonDate", dat_platnost = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", cis_real = "string", ixs_pri = "string", ixp_nab = "string", por_cislo_nab = "number", typ_ag_blok = "number", fin_od = "number", fin_do = "number", sml_stav = "number", sgn_stav = "number", typ_ceny = "number", ac_ver_zak = "string", ixs_typ = "string", popis = "string", nazev = "string", ac_sml = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pzp = "number", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", c_mena_doc = "JsonDecimal", dat_rad_iissp = "JsonDate", priz_opce = "number", ixs_esu = "string", esu_txt = "string", ixp_den = "string",}
	const enum GPcnSmlDtoTypeLengths { ixp_sml_pri = 12, ico = 10, ucs = 10, nks = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, cis_real = 6, ixs_pri = 12, ixp_nab = 12, ac_ver_zak = 30, ixs_typ = 12, popis = 254, nazev = 4000, ac_sml = 30, zmenu_prov = 12, typ_phl = 4, vs = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnSouhrnDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Dashboard.*/
	interface GPcnSouhrnDto {
		/**Funkce.*/
		funkce?: string|null;
		/**Navrhnuté cesty ve vlastnictví.*/
		cestyNavrhnuteVeVlastnictvi?: number|null;
		/**Navrhnuté cesty za NS.*/
		cestyNavrhnuteZaNs?: number|null;
		/**Navrhnuté cesty za podřízená NS.*/
		cestyNavrhnuteZaPodrizenaNs?: number|null;
		/**Schválené cesty ve vlastnictví.*/
		cestySchvaleneVeVlastnictvi?: number|null;
		/**Schválené cesty za NS.*/
		cestySchvaleneZaNs?: number|null;
		/**Schválené cesty za podřízená NS.*/
		cestySchvaleneZaPodrizenaNs?: number|null;
		/**Navrhnuté návštěvy ve vlastnictví.*/
		navstevyNavrhnuteVeVlastnictvi?: number|null;
		/**Navrhnuté návštěvy za NS.*/
		navstevyNavrhnuteZaNs?: number|null;
		/**Navrhnuté návštěvy za podřízená NS.*/
		navstevyNavrhnuteZaPodrizenaNs?: number|null;
		/**Schválené návštěvy ve vlastnictví.*/
		navstevySchvaleneVeVlastnictvi?: number|null;
		/**Schválené návštěvy za NS.*/
		navstevySchvaleneZaNs?: number|null;
		/**Schválené návštěvy za podřízené NS.*/
		navstevySchvaleneZaPodrizenaNs?: number|null;
		/**Celkem prostředků.*/
		celkemProstredku?: JsonDecimal|null;
		/**Čerpáno.*/
		cerpano?: JsonDecimal|null;
		/**Čerpáno procent.*/
		cerpanoProc?: JsonDecimal|null;
		/**Čerpáno za návštěvy.*/
		cerpanoNavstevy?: JsonDecimal|null;
		/**Čerpáno za cesty.*/
		cerpanoCesty?: JsonDecimal|null;
		/**Zbývá prostředků.*/
		zbyvaProstredku?: JsonDecimal|null;
		/**Omezení na NS.*/
		omezeniNs?: string|null;
	}
	const enum GPcnSouhrnDtoNames { funkce = "funkce", cestyNavrhnuteVeVlastnictvi = "cestyNavrhnuteVeVlastnictvi", cestyNavrhnuteZaNs = "cestyNavrhnuteZaNs", cestyNavrhnuteZaPodrizenaNs = "cestyNavrhnuteZaPodrizenaNs", cestySchvaleneVeVlastnictvi = "cestySchvaleneVeVlastnictvi", cestySchvaleneZaNs = "cestySchvaleneZaNs", cestySchvaleneZaPodrizenaNs = "cestySchvaleneZaPodrizenaNs", navstevyNavrhnuteVeVlastnictvi = "navstevyNavrhnuteVeVlastnictvi", navstevyNavrhnuteZaNs = "navstevyNavrhnuteZaNs", navstevyNavrhnuteZaPodrizenaNs = "navstevyNavrhnuteZaPodrizenaNs", navstevySchvaleneVeVlastnictvi = "navstevySchvaleneVeVlastnictvi", navstevySchvaleneZaNs = "navstevySchvaleneZaNs", navstevySchvaleneZaPodrizenaNs = "navstevySchvaleneZaPodrizenaNs", celkemProstredku = "celkemProstredku", cerpano = "cerpano", cerpanoProc = "cerpanoProc", cerpanoNavstevy = "cerpanoNavstevy", cerpanoCesty = "cerpanoCesty", zbyvaProstredku = "zbyvaProstredku", omezeniNs = "omezeniNs",}
	const enum GPcnSouhrnDtoFragments { funkce = "*", cestyNavrhnuteVeVlastnictvi = "*", cestyNavrhnuteZaNs = "*", cestyNavrhnuteZaPodrizenaNs = "*", cestySchvaleneVeVlastnictvi = "*", cestySchvaleneZaNs = "*", cestySchvaleneZaPodrizenaNs = "*", navstevyNavrhnuteVeVlastnictvi = "*", navstevyNavrhnuteZaNs = "*", navstevyNavrhnuteZaPodrizenaNs = "*", navstevySchvaleneVeVlastnictvi = "*", navstevySchvaleneZaNs = "*", navstevySchvaleneZaPodrizenaNs = "*", celkemProstredku = "*", cerpano = "*", cerpanoProc = "*", cerpanoNavstevy = "*", cerpanoCesty = "*", zbyvaProstredku = "*", omezeniNs = "*",}
	const enum GPcnSouhrnDtoTypes { funkce = "string", cestyNavrhnuteVeVlastnictvi = "number", cestyNavrhnuteZaNs = "number", cestyNavrhnuteZaPodrizenaNs = "number", cestySchvaleneVeVlastnictvi = "number", cestySchvaleneZaNs = "number", cestySchvaleneZaPodrizenaNs = "number", navstevyNavrhnuteVeVlastnictvi = "number", navstevyNavrhnuteZaNs = "number", navstevyNavrhnuteZaPodrizenaNs = "number", navstevySchvaleneVeVlastnictvi = "number", navstevySchvaleneZaNs = "number", navstevySchvaleneZaPodrizenaNs = "number", celkemProstredku = "JsonDecimal", cerpano = "JsonDecimal", cerpanoProc = "JsonDecimal", cerpanoNavstevy = "JsonDecimal", cerpanoCesty = "JsonDecimal", zbyvaProstredku = "JsonDecimal", omezeniNs = "string",}
	const enum GPcnSouhrnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnTempTabulkaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující temp tabulku pro hromadné operace a sestavy.*/
	interface GPcnTempTabulkaDto {
		/**Číslo přihlášení.*/
		log_por_cislo?: number|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Částka v CZK.*/
		c_celk?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Příznak zpracování.*/
		priz_zprac?: number|null;
		/**Příznak kumulace.*/
		priz_kum?: number|null;
		/**Příznak tisk.*/
		priz_tisk?: number|null;
		/**Ikc.*/
		ikc?: Gordic.General.GIkc|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
	}
	const enum GPcnTempTabulkaDtoNames { log_por_cislo = "log_por_cislo", ixp = "ixp", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", c_mena = "c_mena", c_celk = "c_celk", mena = "mena", kurz = "kurz", priz_zprac = "priz_zprac", priz_kum = "priz_kum", priz_tisk = "priz_tisk", ikc = "ikc", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GPcnTempTabulkaDtoFragments { log_por_cislo = "main", ixp = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", c_mena = "main", c_celk = "main", mena = "main", kurz = "main", priz_zprac = "main", priz_kum = "main", priz_tisk = "main", ikc = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main",}
	const enum GPcnTempTabulkaDtoTypes { log_por_cislo = "number", ixp = "string", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", c_mena = "JsonDecimal", c_celk = "JsonDecimal", mena = "number", kurz = "JsonDecimal", priz_zprac = "number", priz_kum = "number", priz_tisk = "number", ikc = "Gordic.General.GIkc", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GPcnTempTabulkaDtoTypeLengths { ixp = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnTlacitkaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt pro povolení tlačítek.*/
	interface GPcnTlacitkaDto {
		/**Detail.*/
		detail?: boolean|null;
		/**Detail tooltip.*/
		detail_tooltip?: string|null;
		/**Financování.*/
		financovani?: boolean|null;
		/**Financování tooltip.*/
		financovani_tooltip?: string|null;
		/**Hromadné funkce.*/
		hromadne_fce?: boolean|null;
		/**Hromadné funkce tooltip.*/
		hromadne_fce_tooltip?: string|null;
		/**Hromadné příznaky.*/
		hromadne_priznaky?: boolean|null;
		/**Hromadné příznaky tooltip.*/
		hromadne_priznaky_tooltip?: string|null;
		/**Nový.*/
		novy?: boolean|null;
		/**Nový tooltip.*/
		novy_tooltip?: string|null;
		/**Nový cíl.*/
		novyCil?: boolean|null;
		/**Nový cíl tooltip.*/
		novyCil_tooltip?: string|null;
		/**Nový zdroj.*/
		novyZdroj?: boolean|null;
		/**Nový zdroj tooltip.*/
		novyZdroj_tooltip?: string|null;
		/**Odstranit.*/
		odstranit?: boolean|null;
		/**Odstranit tooltip.*/
		odstranit_tooltip?: string|null;
		/**Detail/oprava.*/
		oprava?: boolean|null;
		/**Detail/oprava tooltip.*/
		oprava_tooltip?: string|null;
		/**Přehled.*/
		prehled?: boolean|null;
		/**Přehled tooltip.*/
		prehled_tooltip?: string|null;
		/**Zamknout.*/
		zamknout?: boolean|null;
		/**Zamknout tooltip.*/
		zamknout_tooltip?: string|null;
		/**Povolení naliti limitu z BAR.*/
		nalitiBar?: boolean|null;
		/**Povoleni naliti limitu z BAR tooltip.*/
		nalitiBar_tooltip?: string|null;
		/**Povolení nalití limitu z PKR.*/
		nalitiPkr?: boolean|null;
		/**Povolení nalití limitu z PKR tooltip.*/
		nalitiPkr_tooltip?: string|null;
		/**Je správce plánu.*/
		spravcePlanu?: boolean|null;
		/**Je správce plánu tooltip.*/
		spravcePlanu_tooltip?: string|null;
		/**Prohlížení kategorií hodnocení.*/
		prohlizeniKat?: boolean|null;
		/**Prohlížení kategorií hodnocení tooltip.*/
		prohlizeniKat_tooltip?: string|null;
		/**Prohlížení omezení dle NS.*/
		prohlizeniOmezNs?: boolean|null;
		/**Prohlížení omezení dle NS tooltip.*/
		prohlizeniOmezNs_tooltip?: string|null;
		/**Prohlížení zabezpečujících NS.*/
		prohlizeniZabNs?: boolean|null;
		/**Prohlížení zabezpečujících NS tooltip.*/
		prohlizeniZabNs_tooltip?: string|null;
		/**Prohlížení kontroly limitu.*/
		prohlizeniKonLim?: boolean|null;
		/**Prohlížení kontroly limitu tooltip.*/
		prohlizeniKonLim_tooltip?: string|null;
	}
	const enum GPcnTlacitkaDtoNames { detail = "detail", detail_tooltip = "detail_tooltip", financovani = "financovani", financovani_tooltip = "financovani_tooltip", hromadne_fce = "hromadne_fce", hromadne_fce_tooltip = "hromadne_fce_tooltip", hromadne_priznaky = "hromadne_priznaky", hromadne_priznaky_tooltip = "hromadne_priznaky_tooltip", novy = "novy", novy_tooltip = "novy_tooltip", novyCil = "novyCil", novyCil_tooltip = "novyCil_tooltip", novyZdroj = "novyZdroj", novyZdroj_tooltip = "novyZdroj_tooltip", odstranit = "odstranit", odstranit_tooltip = "odstranit_tooltip", oprava = "oprava", oprava_tooltip = "oprava_tooltip", prehled = "prehled", prehled_tooltip = "prehled_tooltip", zamknout = "zamknout", zamknout_tooltip = "zamknout_tooltip", nalitiBar = "nalitiBar", nalitiBar_tooltip = "nalitiBar_tooltip", nalitiPkr = "nalitiPkr", nalitiPkr_tooltip = "nalitiPkr_tooltip", spravcePlanu = "spravcePlanu", spravcePlanu_tooltip = "spravcePlanu_tooltip", prohlizeniKat = "prohlizeniKat", prohlizeniKat_tooltip = "prohlizeniKat_tooltip", prohlizeniOmezNs = "prohlizeniOmezNs", prohlizeniOmezNs_tooltip = "prohlizeniOmezNs_tooltip", prohlizeniZabNs = "prohlizeniZabNs", prohlizeniZabNs_tooltip = "prohlizeniZabNs_tooltip", prohlizeniKonLim = "prohlizeniKonLim", prohlizeniKonLim_tooltip = "prohlizeniKonLim_tooltip",}
	const enum GPcnTlacitkaDtoFragments { detail = "*", detail_tooltip = "*", financovani = "*", financovani_tooltip = "*", hromadne_fce = "*", hromadne_fce_tooltip = "*", hromadne_priznaky = "*", hromadne_priznaky_tooltip = "*", novy = "*", novy_tooltip = "*", novyCil = "*", novyCil_tooltip = "*", novyZdroj = "*", novyZdroj_tooltip = "*", odstranit = "*", odstranit_tooltip = "*", oprava = "*", oprava_tooltip = "*", prehled = "*", prehled_tooltip = "*", zamknout = "*", zamknout_tooltip = "*", nalitiBar = "*", nalitiBar_tooltip = "*", nalitiPkr = "*", nalitiPkr_tooltip = "*", spravcePlanu = "*", spravcePlanu_tooltip = "*", prohlizeniKat = "*", prohlizeniKat_tooltip = "*", prohlizeniOmezNs = "*", prohlizeniOmezNs_tooltip = "*", prohlizeniZabNs = "*", prohlizeniZabNs_tooltip = "*", prohlizeniKonLim = "*", prohlizeniKonLim_tooltip = "*",}
	const enum GPcnTlacitkaDtoTypes { detail = "boolean", detail_tooltip = "string", financovani = "boolean", financovani_tooltip = "string", hromadne_fce = "boolean", hromadne_fce_tooltip = "string", hromadne_priznaky = "boolean", hromadne_priznaky_tooltip = "string", novy = "boolean", novy_tooltip = "string", novyCil = "boolean", novyCil_tooltip = "string", novyZdroj = "boolean", novyZdroj_tooltip = "string", odstranit = "boolean", odstranit_tooltip = "string", oprava = "boolean", oprava_tooltip = "string", prehled = "boolean", prehled_tooltip = "string", zamknout = "boolean", zamknout_tooltip = "string", nalitiBar = "boolean", nalitiBar_tooltip = "string", nalitiPkr = "boolean", nalitiPkr_tooltip = "string", spravcePlanu = "boolean", spravcePlanu_tooltip = "string", prohlizeniKat = "boolean", prohlizeniKat_tooltip = "string", prohlizeniOmezNs = "boolean", prohlizeniOmezNs_tooltip = "string", prohlizeniZabNs = "boolean", prohlizeniZabNs_tooltip = "string", prohlizeniKonLim = "boolean", prohlizeniKonLim_tooltip = "string",}
	const enum GPcnTlacitkaDtoTypeLengths {}
	/**Konstanty pro tooltipy zakázaných akcí.*/
	const enum KonstantniHlaseni {
		/**Neurčeno.*/
		neurceno,
		/**Není vlastník.*/
		neniVlastnik,
		/**Není aktivní deník.*/
		nelzeZapsatDoDeniku,
		/**Deník není v režimu změnových řízení.*/
		denikNeniVeZmr,
		/**Nejsou povoleny aktivní operace menu.*/
		aktOperaceMenu,
		/**Nebylo možno jednoznačně dohledat knihu.*/
		neniKniha,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnWflProfilDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Wfl profil písemnosti.*/
	interface GPcnWflProfilDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Licence.*/
		lic?: string|null;
		/**Ixp_spis.*/
		ixp_spis?: string|null;
		/**Priz_spis.*/
		priz_spis?: number|null;
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt?: string|null;
		/**Identifikátor spisového uzlo vlastníka.*/
		ixs_su_akt?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Akt značka.*/
		akt_znacka?: string|null;
		/**Kód stavu písemnosti - distribuční.*/
		stav_dist?: number|null;
		/**Kód stavu písemnosti - obsloužení.*/
		stav_pis?: number|null;
		/**Typ agendy.*/
		typ_ag?: number|null;
		/**Kód kategorie typu písemnosti.*/
		ktg_typ?: number|null;
		/**Identifikátor typu písemnosti.*/
		ixs_typ?: string|null;
		/**S_prij.*/
		s_prij?: number|null;
		/**S_ssl.*/
		s_ssl?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**S_ele.*/
		s_ele?: number|null;
		/**S_fyz.*/
		s_fyz?: number|null;
		/**Místo vzniku.*/
		misto_vzniku?: string|null;
		/**S_sgn.*/
		s_sgn?: number|null;
		/**Datum pod.*/
		dat_pod?: JsonDate|null;
		/**Cs_akt_znacka.*/
		cs_akt_znacka?: string|null;
		/**Příznak zobrazení.*/
		priz_view_ssl?: number|null;
		/**Uzo.*/
		uzo?: string|null;
		/**Spisový plán.*/
		spis_pl?: string|null;
		/**Spisový znak.*/
		spis_znak?: string|null;
		/**Ixs_fun_wfl.*/
		ixs_fun_wfl?: string|null;
		/**S_uloz.*/
		s_uloz?: number|null;
		/**Datum uložení.*/
		dat_uloz?: JsonDate|null;
		/**Ixs_su_wfl.*/
		ixs_su_wfl?: string|null;
		/**S_odes.*/
		s_odes?: number|null;
		/**Datum mpd0.*/
		dat_mpd0?: JsonDate|null;
		/**Priz_cj.*/
		priz_cj?: number|null;
		/**Datum vyřízení.*/
		dat_vyriz?: JsonDate|null;
		/**Ixs_cj.*/
		ixs_cj?: string|null;
		/**Ixs_lpc.*/
		ixs_lpc?: string|null;
		/**Původ.*/
		puvod?: number|null;
		/**S_schval.*/
		s_schval?: number|null;
		/**Umístění.*/
		umisteni?: string|null;
		/**Kód stupně utajení.*/
		st_utaj_id?: number|null;
		/**Wfl přístup.*/
		wfl_pristup?: number|null;
		/**Skartační znak.*/
		skar_znak?: string|null;
		/**Skartační lhůta.*/
		skar_lhuta?: number|null;
		/**Rok_spo_uda.*/
		rok_spo_uda?: number|null;
		/**Ixp_top.*/
		ixp_top?: string|null;
		/**Typ_spis.*/
		typ_spis?: number|null;
		/**Barcode.*/
		barcode?: string|null;
		/**Skar_lhuta_spra.*/
		skar_lhuta_spra?: number|null;
		/**Ixs_ext.*/
		ixs_ext?: string|null;
		/**Rok skartace.*/
		rok_skartace?: number|null;
		/**Ixs_spu.*/
		ixs_spu?: string|null;
		/**Pocčet listů.*/
		poc_listu?: string|null;
		/**Počet stran.*/
		poc_stran?: number|null;
		/**Počet kopií.*/
		poc_kop?: number|null;
		/**Počet příloh.*/
		poc_priloh?: number|null;
		/**Počet listů příloh.*/
		poc_l_priloh?: string|null;
		/**Číslo jednací.*/
		cj?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Zkratka aplikace.*/
		zkr_ag?: string|null;
		/**Typ dokladu.*/
		typ_dokl?: string|null;
	}
	const enum GPcnWflProfilDtoNames { ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", zkr_ag = "zkr_ag", typ_dokl = "typ_dokl",}
	const enum GPcnWflProfilDtoFragments { ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*", zkr_ag = "*", typ_dokl = "*",}
	const enum GPcnWflProfilDtoTypes { ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string", zkr_ag = "string", typ_dokl = "string",}
	const enum GPcnWflProfilDtoTypeLengths { ixp = 12, lic = 4, ixp_spis = 12, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, akt_znacka = 50, ixs_typ = 12, zmenu_prov = 12, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_cj = 12, ixs_lpc = 12, umisteni = 20, skar_znak = 2, ixp_top = 12, barcode = 50, ixs_ext = 12, ixs_spu = 12, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnZabezpecujiciNksDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující zabezpečující Nks.*/
	interface GPcnZabezpecujiciNksDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Nks vaz. - pro pol.*/
		nks_vaz?: string|null;
		/**Název vaz. - pro pol.*/
		nazev_vaz?: string|null;
		/**Název referenta.*/
		nazev_rf?: string|null;
	}
	const enum GPcnZabezpecujiciNksDtoNames { rok = "rok", ico = "ico", nks = "nks", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nks_vaz = "nks_vaz", nazev_vaz = "nazev_vaz", nazev_rf = "nazev_rf",}
	const enum GPcnZabezpecujiciNksDtoFragments { rok = "*", ico = "*", nks = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nks_vaz = "*", nazev_vaz = "*", nazev_rf = "*",}
	const enum GPcnZabezpecujiciNksDtoTypes { rok = "number", ico = "string", nks = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nks_vaz = "string", nazev_vaz = "string", nazev_rf = "string",}
	const enum GPcnZabezpecujiciNksDtoTypeLengths { ico = 10, nks = 12, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnZmenoveRizeniDotcenePozDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující dotčené požadavky změnového řízení.*/
	interface GPcnZmenoveRizeniDotcenePozDto {
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Příznak primární položky.*/
		priz_prim?: number|null;
		/**Příznak změny.*/
		zmena?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Příznak nové položky.*/
		priz_new?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Typ požadavku.*/
		typ_poz?: number|null;
		/**Nákladové středisko financující.*/
		nks_fin?: string|null;
		/**Stav - dopočítaný sloupec.*/
		readonly zmena_txt?: string|null;
		/**Příznak primárního dokladu - dopočítaný sloupec.*/
		readonly priz_prim_txt?: string|null;
		/**Příznak nového dokladu - dopočítaný sloupec.*/
		readonly priz_new_txt?: string|null;
	}
	const enum GPcnZmenoveRizeniDotcenePozDtoNames { ixp_zmr = "ixp_zmr", ixp = "ixp", priz_prim = "priz_prim", zmena = "zmena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_new = "priz_new", nazev = "nazev", ac = "ac", evi_cis = "evi_cis", typ_poz = "typ_poz", nks_fin = "nks_fin", zmena_txt = "zmena_txt", priz_prim_txt = "priz_prim_txt", priz_new_txt = "priz_new_txt",}
	const enum GPcnZmenoveRizeniDotcenePozDtoFragments { ixp_zmr = "*", ixp = "*", priz_prim = "*", zmena = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_new = "*", nazev = "*", ac = "*", evi_cis = "*", typ_poz = "*", nks_fin = "*", zmena_txt = "*", priz_prim_txt = "*", priz_new_txt = "*",}
	const enum GPcnZmenoveRizeniDotcenePozDtoTypes { ixp_zmr = "string", ixp = "string", priz_prim = "number", zmena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_new = "number", nazev = "string", ac = "string", evi_cis = "string", typ_poz = "number", nks_fin = "string", zmena_txt = "string", priz_prim_txt = "string", priz_new_txt = "string",}
	const enum GPcnZmenoveRizeniDotcenePozDtoTypeLengths { ixp_zmr = 12, ixp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnZmenoveRizeniDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující změnové řízení.*/
	interface GPcnZmenoveRizeniDto {
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Kód stavu změnového řízení.*/
		stav_zmr?: number|null;
		/**Kód typu změnového řízení.*/
		typ_zmr?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Datum zadání.*/
		dat_zad?: JsonDate|null;
		/**Datum evidence.*/
		dat_evi?: JsonDate|null;
		/**Datum schválení.*/
		dat_sch?: JsonDate|null;
		/**Datum realizováno.*/
		dat_pra?: JsonDate|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změna.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor rozpočtu.*/
		ixp_roz?: string|null;
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_vla?: string|null;
		/**Identifikátor zadavatele(zmp).*/
		ixs_zmp_zad?: string|null;
		/**Priz view.*/
		priz_view?: number|null;
		/**Přeevidence (0 - v aktuální knize, 1 - předáno z jiné knihy, 2 - předáno do jiné knihy).*/
		preevidence?: number|null;
		/**Vlastnictví (0 - vlastní doklad, 1 - jiný zpracovatel).*/
		vlastnictvi?: number|null;
		/**El. obraz - typ souboru.*/
		el_obraz_typ?: string|null;
		/**El. obraz - název souboru.*/
		el_obraz_soubor?: string|null;
		/**El. přílohy - počet příloh.*/
		el_prilohy_pocet?: number|null;
		/**Barevný puntík.*/
		uzo?: string|null;
		/**Vlastník textově.*/
		ixs_fun_vla_txt?: string|null;
		/**Stav změnového řízení textově.*/
		stav_zmr_txt?: string|null;
		/**Typ změnového řízení textově.*/
		typ_zmr_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GPcnZmenoveRizeniDtoNames { ixp_zmr = "ixp_zmr", ixp_den = "ixp_den", ac = "ac", evi_cis = "evi_cis", stav_zmr = "stav_zmr", typ_zmr = "typ_zmr", popis = "popis", dat_zad = "dat_zad", dat_evi = "dat_evi", dat_sch = "dat_sch", dat_pra = "dat_pra", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_roz = "ixp_roz", ixs_fun_vla = "ixs_fun_vla", ixs_zmp_zad = "ixs_zmp_zad", priz_view = "priz_view", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", ixs_fun_vla_txt = "ixs_fun_vla_txt", stav_zmr_txt = "stav_zmr_txt", typ_zmr_txt = "typ_zmr_txt", pocet = "pocet",}
	const enum GPcnZmenoveRizeniDtoFragments { ixp_zmr = "main", ixp_den = "main", ac = "main", evi_cis = "main", stav_zmr = "main", typ_zmr = "main", popis = "main", dat_zad = "main", dat_evi = "main", dat_sch = "main", dat_pra = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_roz = "main", ixs_fun_vla = "main", ixs_zmp_zad = "main", priz_view = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", ixs_fun_vla_txt = "ixs_fun_vla_txt", stav_zmr_txt = "stav_zmr_txt", typ_zmr_txt = "typ_zmr_txt", pocet = "main",}
	const enum GPcnZmenoveRizeniDtoTypes { ixp_zmr = "string", ixp_den = "string", ac = "string", evi_cis = "string", stav_zmr = "number", typ_zmr = "number", popis = "string", dat_zad = "JsonDate", dat_evi = "JsonDate", dat_sch = "JsonDate", dat_pra = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_roz = "string", ixs_fun_vla = "string", ixs_zmp_zad = "string", priz_view = "number", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", ixs_fun_vla_txt = "string", stav_zmr_txt = "string", typ_zmr_txt = "string", pocet = "number",}
	const enum GPcnZmenoveRizeniDtoTypeLengths { ixp_zmr = 12, ixp_den = 12, ac = 20, evi_cis = 30, popis = 254, zmenu_prov = 12, ixp_roz = 12, ixs_fun_vla = 12, ixs_zmp_zad = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnZmenoveRizeniFinancniProfilDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující finanční profil změnového řízení.*/
	interface GPcnZmenoveRizeniFinancniProfilDto {
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Řádek.*/
		radek_zmr?: number|null;
		/**Kód typu požky.*/
		typ_pfp?: number|null;
		/**Identifikátor cesty/návštěvy.*/
		ixp?: string|null;
		/**Řádek položky výdaje cesty/návštěvy.*/
		radek_pol?: number|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Částka v CZK.*/
		c_celk?: JsonDecimal|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód typu cestujícího.*/
		typ_dos?: number|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Typ položky textově.*/
		typ_pfp_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Reciprocita.*/
		priz_recip_txt?: string|null;
		/**Má dáti.*/
		readonly md?: JsonDecimal|null;
		/**Dal.*/
		readonly d?: JsonDecimal|null;
	}
	const enum GPcnZmenoveRizeniFinancniProfilDtoNames { ixp_zmr = "ixp_zmr", radek_zmr = "radek_zmr", typ_pfp = "typ_pfp", ixp = "ixp", radek_pol = "radek_pol", ixs_tna = "ixs_tna", stat = "stat", c_celk = "c_celk", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dos = "typ_dos", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", typ_pfp_txt = "typ_pfp_txt", stat_txt = "stat_txt", mena_zkr = "mena_zkr", c_mena = "c_mena", priz_recip_txt = "priz_recip_txt", md = "md", d = "d",}
	const enum GPcnZmenoveRizeniFinancniProfilDtoFragments { ixp_zmr = "main", radek_zmr = "main", typ_pfp = "main", ixp = "main", radek_pol = "main", ixs_tna = "main", stat = "main", c_celk = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_dos = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", typ_pfp_txt = "*", stat_txt = "*", mena_zkr = "*", c_mena = "*", priz_recip_txt = "*", md = "*", d = "*",}
	const enum GPcnZmenoveRizeniFinancniProfilDtoTypes { ixp_zmr = "string", radek_zmr = "number", typ_pfp = "number", ixp = "string", radek_pol = "number", ixs_tna = "string", stat = "number", c_celk = "JsonDecimal", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dos = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", typ_pfp_txt = "string", stat_txt = "string", mena_zkr = "string", c_mena = "JsonDecimal", priz_recip_txt = "string", md = "JsonDecimal", d = "JsonDecimal",}
	const enum GPcnZmenoveRizeniFinancniProfilDtoTypeLengths { ixp_zmr = 12, ixp = 12, ixs_tna = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnZmenoveRizeniRozDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující export ROZ na změnovém řízení.*/
	interface GPcnZmenoveRizeniRozDto {
		/**Rok.*/
		rok?: number|null;
		/**Licence.*/
		lic?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Řádek z.*/
		radek_z?: number|null;
		/**Nakladové středisko.*/
		nks?: string|null;
		/**Identifikátor změnového řízení.*/
		ixp?: string|null;
		/**Částka v CZK.*/
		c_celk?: JsonDecimal|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Kód chyby.*/
		err_code?: number|null;
		/**Text chyby.*/
		txt_err?: string|null;
		/**Uek.*/
		uek?: string|null;
		/**Uel.*/
		uel?: string|null;
		/**Uem.*/
		uem?: string|null;
		/**Uen.*/
		uen?: string|null;
		/**Te5.*/
		te5?: string|null;
		/**Te6.*/
		te6?: string|null;
		/**Te7.*/
		te7?: string|null;
		/**Te8.*/
		te8?: string|null;
		/**Te9.*/
		te9?: string|null;
		/**Ixp_zmr.*/
		ixp_zmr?: string|null;
		/**Ixp_zmr.*/
		subrada?: string|null;
		/**Ixp_den.*/
		ixp_den?: string|null;
		/**Ixs_fun_akt.*/
		ixs_fun?: string|null;
		/**Ktg_typ.*/
		ktg_typ?: number|null;
		/**Ixs_typ.*/
		ixs_typ?: string|null;
		/**Jen_check_rzv.*/
		jen_check_rzv?: number|null;
		/**Mazat_log.*/
		mazat_log?: number|null;
		/**Popis chyby.*/
		readonly popis?: string|null;
	}
	const enum GPcnZmenoveRizeniRozDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", radek_z = "radek_z", nks = "nks", ixp = "ixp", c_celk = "c_celk", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", err_code = "err_code", txt_err = "txt_err", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ixp_zmr = "ixp_zmr", subrada = "subrada", ixp_den = "ixp_den", ixs_fun = "ixs_fun", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", jen_check_rzv = "jen_check_rzv", mazat_log = "mazat_log", popis = "popis",}
	const enum GPcnZmenoveRizeniRozDtoFragments { rok = "main", lic = "main", ico = "main", ucs = "main", radek_z = "main", nks = "main", ixp = "main", c_celk = "main", dat_zmena = "main", zmenu_prov = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", err_code = "main", txt_err = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", ixp_zmr = "*", subrada = "*", ixp_den = "*", ixs_fun = "*", ktg_typ = "*", ixs_typ = "*", jen_check_rzv = "*", mazat_log = "*", popis = "*",}
	const enum GPcnZmenoveRizeniRozDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", radek_z = "number", nks = "string", ixp = "string", c_celk = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", err_code = "number", txt_err = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", ixp_zmr = "string", subrada = "string", ixp_den = "string", ixs_fun = "string", ktg_typ = "number", ixs_typ = "string", jen_check_rzv = "number", mazat_log = "number", popis = "string",}
	const enum GPcnZmenoveRizeniRozDtoTypeLengths { lic = 4, ico = 10, ucs = 10, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, txt_err = 254, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, ixp_zmr = 12, subrada = 20, ixp_den = 12, ixs_fun = 12, ktg_typ = 12, ixs_typ = 12, jen_check_rzv = 12, mazat_log = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\GPcnZmenoveRizeniVazbaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující vazby změnového řízení.*/
	interface GPcnZmenoveRizeniVazbaDto {
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Agenda.*/
		ag?: string|null;
		/**Identifikátor dokladu.*/
		ixp?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Stav zaúčtování.*/
		s_zau_txt?: string|null;
		/**Stav pořízení.*/
		s_sto_txt?: string|null;
		/**Čáastka.*/
		c?: JsonDecimal|null;
		/**Datum evidence.*/
		dat_evid?: JsonDate|null;
		/**Kód stavu zaúčtování.*/
		s_zau?: number|null;
		/**Kód stavu pořízení.*/
		s_sto?: number|null;
		/**Aktivita ekonomického dokumentu.*/
		eko_akt?: number|null;
		/**Název rf.*/
		nazev_rf?: string|null;
	}
	const enum GPcnZmenoveRizeniVazbaDtoNames { ixp_zmr = "ixp_zmr", ag = "ag", ixp = "ixp", nazev = "nazev", ac = "ac", popis = "popis", s_zau_txt = "s_zau_txt", s_sto_txt = "s_sto_txt", c = "c", dat_evid = "dat_evid", s_zau = "s_zau", s_sto = "s_sto", eko_akt = "eko_akt", nazev_rf = "nazev_rf",}
	const enum GPcnZmenoveRizeniVazbaDtoFragments { ixp_zmr = "*", ag = "*", ixp = "*", nazev = "*", ac = "*", popis = "*", s_zau_txt = "*", s_sto_txt = "*", c = "*", dat_evid = "*", s_zau = "*", s_sto = "*", eko_akt = "*", nazev_rf = "*",}
	const enum GPcnZmenoveRizeniVazbaDtoTypes { ixp_zmr = "string", ag = "string", ixp = "string", nazev = "string", ac = "string", popis = "string", s_zau_txt = "string", s_sto_txt = "string", c = "JsonDecimal", dat_evid = "JsonDate", s_zau = "number", s_sto = "number", eko_akt = "number", nazev_rf = "string",}
	const enum GPcnZmenoveRizeniVazbaDtoTypeLengths { ixp_zmr = 12, ag = 3, ixp = 12, nazev = 50, ac = 20, popis = 254, s_zau_txt = 50, s_sto_txt = 50, nazev_rf = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPsccdosDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Vztah osoby k požadavku.*/
	interface GPsccdosDto {
		/**Stav dos.*/
		stav_dos?: number|null;
		/**Stav dos txt.*/
		stav_dos_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPsccdosDtoNames { stav_dos = "stav_dos", stav_dos_txt = "stav_dos_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPsccdosDtoFragments { stav_dos = "main", stav_dos_txt = "main", k_v = "main", k_s = "main",}
	const enum GPsccdosDtoTypes { stav_dos = "number", stav_dos_txt = "string", k_v = "number", k_s = "string",}
	const enum GPsccdosDtoTypeLengths { stav_dos_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPsccmisDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Viditelnost míst.*/
	interface GPsccmisDto {
		/**Viditelnost.*/
		viditelnost?: number|null;
		/**Viditelnost txt.*/
		viditelnost_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPsccmisDtoNames { viditelnost = "viditelnost", viditelnost_txt = "viditelnost_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPsccmisDtoFragments { viditelnost = "main", viditelnost_txt = "main", k_v = "main", k_s = "main",}
	const enum GPsccmisDtoTypes { viditelnost = "number", viditelnost_txt = "string", k_v = "number", k_s = "string",}
	const enum GPsccmisDtoTypeLengths { viditelnost_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPsccpscDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Stav požadavku.*/
	interface GPsccpscDto {
		/**Stav psc.*/
		stav_psc?: number|null;
		/**Stav psc txt.*/
		stav_psc_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPsccpscDtoNames { stav_psc = "stav_psc", stav_psc_txt = "stav_psc_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPsccpscDtoFragments { stav_psc = "main", stav_psc_txt = "main", k_v = "main", k_s = "main",}
	const enum GPsccpscDtoTypes { stav_psc = "number", stav_psc_txt = "string", k_v = "number", k_s = "string",}
	const enum GPsccpscDtoTypeLengths { stav_psc_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPsccrecDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Reciprocita nákladů.*/
	interface GPsccrecDto {
		/**Priz recip.*/
		priz_recip?: number|null;
		/**Priz recip txt.*/
		priz_recip_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPsccrecDtoNames { priz_recip = "priz_recip", priz_recip_txt = "priz_recip_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPsccrecDtoFragments { priz_recip = "main", priz_recip_txt = "main", k_v = "main", k_s = "main",}
	const enum GPsccrecDtoTypes { priz_recip = "number", priz_recip_txt = "string", k_v = "number", k_s = "string",}
	const enum GPsccrecDtoTypeLengths { priz_recip_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscctfzDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Typ financování.*/
	interface GPscctfzDto {
		/**Kód tfz.*/
		kod_tfz?: number|null;
		/**Kód tfz txt.*/
		kod_tfz_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPscctfzDtoNames { kod_tfz = "kod_tfz", kod_tfz_txt = "kod_tfz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPscctfzDtoFragments { kod_tfz = "main", kod_tfz_txt = "main", k_v = "main", k_s = "main",}
	const enum GPscctfzDtoTypes { kod_tfz = "number", kod_tfz_txt = "string", k_v = "number", k_s = "string",}
	const enum GPscctfzDtoTypeLengths { kod_tfz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscctypDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Typ požadavku plánu.*/
	interface GPscctypDto {
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Typ poz txt.*/
		typ_poz_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPscctypDtoNames { typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPscctypDtoFragments { typ_poz = "main", typ_poz_txt = "main", k_v = "main", k_s = "main",}
	const enum GPscctypDtoTypes { typ_poz = "number", typ_poz_txt = "string", k_v = "number", k_s = "string",}
	const enum GPscctypDtoTypeLengths { typ_poz_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscczmrDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Stav změnového řízení.*/
	interface GPscczmrDto {
		/**Stav zmr.*/
		stav_zmr?: number|null;
		/**Stav zmr txt.*/
		stav_zmr_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPscczmrDtoNames { stav_zmr = "stav_zmr", stav_zmr_txt = "stav_zmr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPscczmrDtoFragments { stav_zmr = "main", stav_zmr_txt = "main", k_v = "main", k_s = "main",}
	const enum GPscczmrDtoTypes { stav_zmr = "number", stav_zmr_txt = "string", k_v = "number", k_s = "string",}
	const enum GPscczmrDtoTypeLengths { stav_zmr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscczpvDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Způsob výpočtu.*/
	interface GPscczpvDto {
		/**Zp vyp.*/
		zp_vyp?: number|null;
		/**Zp vyp txt.*/
		zp_vyp_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Typ_poz_txt.*/
		typ_poz_txt?: string|null;
	}
	const enum GPscczpvDtoNames { zp_vyp = "zp_vyp", zp_vyp_txt = "zp_vyp_txt", k_v = "k_v", k_s = "k_s", typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt",}
	const enum GPscczpvDtoFragments { zp_vyp = "main", zp_vyp_txt = "main", k_v = "main", k_s = "main", typ_poz = "main", typ_poz_txt = "typ_poz_txt",}
	const enum GPscczpvDtoTypes { zp_vyp = "number", zp_vyp_txt = "string", k_v = "number", k_s = "string", typ_poz = "number", typ_poz_txt = "string",}
	const enum GPscczpvDtoTypeLengths { zp_vyp_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPsccztpDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Typ změnového řízení.*/
	interface GPsccztpDto {
		/**Typ zmr.*/
		typ_zmr?: number|null;
		/**Typ zmr txt.*/
		typ_zmr_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GPsccztpDtoNames { typ_zmr = "typ_zmr", typ_zmr_txt = "typ_zmr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GPsccztpDtoFragments { typ_zmr = "main", typ_zmr_txt = "main", k_v = "main", k_s = "main",}
	const enum GPsccztpDtoTypes { typ_zmr = "number", typ_zmr_txt = "string", k_v = "number", k_s = "string",}
	const enum GPsccztpDtoTypeLengths { typ_zmr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscdkprDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Popisy kategorie priorit.*/
	interface GPscdkprDto {
		/**Rok.*/
		rok?: number|null;
		/**Kat pri.*/
		kat_pri?: number|null;
		/**Radek.*/
		radek?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GPscdkprDtoNames { rok = "rok", kat_pri = "kat_pri", radek = "radek", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPscdkprDtoFragments { rok = "main", kat_pri = "main", radek = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GPscdkprDtoTypes { rok = "number", kat_pri = "number", radek = "number", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPscdkprDtoTypeLengths { popis = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscscleDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Členění záznamů.*/
	interface GPscscleDto {
		/**Identifikátor cle.*/
		ixs_cle?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Kód cle.*/
		kod_cle?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Uea.*/
		uea?: string|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Uec.*/
		uec?: string|null;
		/**Ued.*/
		ued?: string|null;
		/**Uee.*/
		uee?: string|null;
		/**Uef.*/
		uef?: string|null;
		/**Ueg.*/
		ueg?: string|null;
		/**Ueh.*/
		ueh?: string|null;
		/**Uei.*/
		uei?: string|null;
		/**Uej.*/
		uej?: string|null;
		/**Te0.*/
		te0?: string|null;
		/**Te1.*/
		te1?: string|null;
		/**Te2.*/
		te2?: string|null;
		/**Te3.*/
		te3?: string|null;
		/**Te4.*/
		te4?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Identifikátor vpk.*/
		ixs_vpk?: string|null;
		/**Typ poz txt.*/
		typ_poz_txt?: string|null;
	}
	const enum GPscscleDtoNames { ixs_cle = "ixs_cle", nazev = "nazev", kod_cle = "kod_cle", poznamka = "poznamka", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", ixp_den = "ixp_den", ixs_vpk = "ixs_vpk", typ_poz_txt = "typ_poz_txt",}
	const enum GPscscleDtoFragments { ixs_cle = "main", nazev = "main", kod_cle = "main", poznamka = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_poz = "main", ixp_den = "main", ixs_vpk = "main", typ_poz_txt = "main",}
	const enum GPscscleDtoTypes { ixs_cle = "string", nazev = "string", kod_cle = "string", poznamka = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", ixp_den = "string", ixs_vpk = "string", typ_poz_txt = "string",}
	const enum GPscscleDtoTypeLengths { ixs_cle = 12, nazev = 100, kod_cle = 16, poznamka = 254, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, zmenu_prov = 12, ixp_den = 12, ixs_vpk = 12, typ_poz_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscsdenDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Kniha PCN.*/
	interface GPscsdenDto {
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Lic.*/
		lic?: string|null;
		/**Arw.*/
		arw?: number|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Typ den.*/
		typ_den?: number|null;
		/**Ktg den.*/
		ktg_den?: number|null;
		/**Por číslo max.*/
		por_cislo_max?: number|null;
		/**Subrada max.*/
		subrada_max?: number|null;
		/**Subrada duz.*/
		subrada_duz?: number|null;
		/**Len ac.*/
		len_ac?: number|null;
		/**Krok uza.*/
		krok_uza?: number|null;
		/**Kniha old.*/
		ixp_den_old?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Prefix.*/
		prefix?: string|null;
		/**Suffix.*/
		suffix?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Rok sberu.*/
		rok_sberu?: number|null;
		/**Priz plan.*/
		priz_plan?: number|null;
		/**Ktg_den_txt.*/
		ktg_den_txt?: string|null;
	}
	const enum GPscsdenDtoNames { ixp_den = "ixp_den", lic = "lic", arw = "arw", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rok_sberu = "rok_sberu", priz_plan = "priz_plan", ktg_den_txt = "ktg_den_txt",}
	const enum GPscsdenDtoFragments { ixp_den = "main", lic = "main", arw = "main", dat_od = "main", dat_do = "main", ico = "main", ucs = "main", nazev = "main", rok = "main", typ_den = "main", ktg_den = "main", por_cislo_max = "main", subrada_max = "main", subrada_duz = "main", len_ac = "main", krok_uza = "main", ixp_den_old = "main", uus = "main", prefix = "main", suffix = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", rok_sberu = "main", priz_plan = "main", ktg_den_txt = "ktg_den_txt",}
	const enum GPscsdenDtoTypes { ixp_den = "string", lic = "string", arw = "number", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", rok_sberu = "number", priz_plan = "number", ktg_den_txt = "string",}
	const enum GPscsdenDtoTypeLengths { ixp_den = 12, lic = 4, ico = 10, ucs = 10, nazev = 50, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscsdodDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Dodatky.*/
	interface GPscsdodDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GPscsdodDtoNames { ixp = "ixp", ixp_den = "ixp_den", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPscsdodDtoFragments { ixp = "main", ixp_den = "main", nazev = "main", dat_od = "main", dat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GPscsdodDtoTypes { ixp = "string", ixp_den = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPscsdodDtoTypeLengths { ixp = 12, ixp_den = 12, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscskhoDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Kategorie hodnocení.*/
	interface GPscskhoDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Kat hod.*/
		kat_hod?: string|null;
		/**Kat hod txt.*/
		kat_hod_txt?: string|null;
		/**Filtr.*/
		filtr?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Typ_poz_txt.*/
		typ_poz_txt?: string|null;
	}
	const enum GPscskhoDtoNames { ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", filtr = "filtr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt",}
	const enum GPscskhoDtoFragments { ico = "main", rok = "main", kat_hod = "main", kat_hod_txt = "main", filtr = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_poz = "main", typ_poz_txt = "typ_poz_txt",}
	const enum GPscskhoDtoTypes { ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", filtr = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", typ_poz_txt = "string",}
	const enum GPscskhoDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, filtr = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscskprDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Kategorie priorit.*/
	interface GPscskprDto {
		/**Rok.*/
		rok?: number|null;
		/**Kat pri.*/
		kat_pri?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GPscskprDtoNames { rok = "rok", kat_pri = "kat_pri", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPscskprDtoFragments { rok = "main", kat_pri = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GPscskprDtoTypes { rok = "number", kat_pri = "number", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPscskprDtoTypeLengths { nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscsmisDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Cílová místa.*/
	interface GPscsmisDto {
		/**Id místo.*/
		id_misto?: number|null;
		/**Místo.*/
		misto?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Viditelnost.*/
		viditelnost?: number|null;
		/**Viditelnost_txt.*/
		viditelnost_txt?: string|null;
	}
	const enum GPscsmisDtoNames { id_misto = "id_misto", misto = "misto", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", viditelnost = "viditelnost", viditelnost_txt = "viditelnost_txt",}
	const enum GPscsmisDtoFragments { id_misto = "main", misto = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", viditelnost = "main", viditelnost_txt = "viditelnost_txt",}
	const enum GPscsmisDtoTypes { id_misto = "number", misto = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", viditelnost = "number", viditelnost_txt = "string",}
	const enum GPscsmisDtoTypeLengths { misto = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscsnkhDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Název kategorií hodnocení.*/
	interface GPscsnkhDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GPscsnkhDtoNames { ico = "ico", rok = "rok", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPscsnkhDtoFragments { ico = "main", rok = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GPscsnkhDtoTypes { ico = "string", rok = "number", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPscsnkhDtoTypeLengths { ico = 10, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Dto\Cis\GPscstnaDto.d.ts 

declare namespace Gordic.Pcn.Interface {
	/**Datový objekt popisující Typ náhrad.*/
	interface GPscstnaDto {
		/**Identifikátor tna.*/
		ixs_tna?: string|null;
		/**Ktg tna.*/
		ktg_tna?: number|null;
		/**Identifikátor zpz.*/
		ixs_zpz?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód tna.*/
		kod_tna?: string|null;
		/**Ixs_zpz_txt.*/
		ixs_zpz_txt?: string|null;
		/**Ktg_tna_txt.*/
		ktg_tna_txt?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
	}
	const enum GPscstnaDtoNames { ixs_tna = "ixs_tna", ktg_tna = "ktg_tna", ixs_zpz = "ixs_zpz", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_tna = "kod_tna", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt", typ_poz = "typ_poz",}
	const enum GPscstnaDtoFragments { ixs_tna = "main", ktg_tna = "main", ixs_zpz = "main", nazev = "main", dat_od = "main", dat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kod_tna = "main", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt", typ_poz = "main",}
	const enum GPscstnaDtoTypes { ixs_tna = "string", ktg_tna = "number", ixs_zpz = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_tna = "string", ixs_zpz_txt = "string", ktg_tna_txt = "string", typ_poz = "number",}
	const enum GPscstnaDtoTypeLengths { ixs_tna = 12, ixs_zpz = 12, nazev = 50, zmenu_prov = 12, kod_tna = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnAda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Akce ADA
	* @domain SluzCestyPlan
	* @businessObject PcnAda
	*/
	interface PcnAda {
		/**Seznam akcí ADA.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnAdaDto>>;
		/**Seznam akcí ADA včetně ORGu z srvdcia.*/
		listPlusOrg(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnAdaDto>>;
		/**Seznam Orgů ADA.*/
		seznamOrgu(rq?:CallParams<{rok:number,cislo:string}>): _Task<{rok:number,cislo:string},GServiceListResponse<Gordic.Pcn.Interface.GPcnAdaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnAda: ServiceBase & Catalog.PcnAda;
	}
	const PcnAda: Client["PcnAda"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro Akce ADA.*/
	const enum GPcnAdaFilter {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Číslo ADA.*/
		cislo,
		/**Název.*/
		nazev,
		/**Fin. od.*/
		fin_od,
		/**Fin. do.*/
		fin_do,
		/**Real. od.*/
		real_od,
		/**Real. do.*/
		real_do,
		/**Aktivita.*/
		aktivita,
		/**Nákladové středisko.*/
		nks,
		/**Xpf_pf.*/
		xpf_pf,
		/**Identifikátor pla.*/
		ixs_pla,
		/**Číslo realizátora.*/
		cis_real,
		/**Celková částka.*/
		c_celk,
		/**Identifikátor cia.*/
		ixs_cia,
		/**Identifikátor fce vlastníka.*/
		ixs_fun_akt,
		/**Identifikátor fce zadavatele.*/
		ixs_fun_zad,
		/**Org.*/
		te1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCesta.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Cesta.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCesta {
		/**Detail cesty/návštěvy.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Seznam cest a návštěv.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Počet cest a návštěv dle filtru.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Seznam cest a návštěv pro výběr v RCN05.*/
		listVyberPlanu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Založení cesty/návštěvy.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Oprava cesty včetně dokumentu.*/
		updateWithSsl(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>,rd:GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>}>): _Task<{rq:GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>,rd:GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Oprava cesty/návštěvy.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Oprava resp. založení cesty/návštěvy.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Odstranění cesty/návštěvy.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Změna stavu ve schvalovacím procesu.*/
		zmenaStavu(rq?:CallParams<{ixp:string,stav_psc:number}>): _Task<{ixp:string,stav_psc:number},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Zruší storno - vrátí do stavu navrhnuto.*/
		zrusitStorno(rq?:CallParams<{ixp:string,duvod:string}>): _Task<{ixp:string,duvod:string},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Seznam orgu cest dle výběru na psctpid-u.*/
		seznamOrguTpid(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Nastaví příznak priz_view - doklad zobrazen/přečten.*/
		oznacJakoPrecteny(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Nastavení příznaku zámku výpočtu.*/
		nastavZamekPrepocetNakladu(rq?:CallParams<{ixp:string,prizZam:number}>): _Task<{ixp:string,prizZam:number},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Rozgeneruje pozadavek dle NS na počtech účastníků.*/
		rozgenerovatPozadavek(rq?:CallParams<{ixp:string,ixp_zmr:string}>): _Task<{ixp:string,ixp_zmr:string},void>;
		/**Přidá požadavek do skupiny sloučených požadavků.*/
		pripojPozadavekDoSkupinySloucenychPozadavku(rq?:CallParams<{ixp:string,ixpSkupinySloucenych:string}>): _Task<{ixp:string,ixpSkupinySloucenych:string},void>;
		/**Odstraní požadavek ze skupiny sloučených požadavků.*/
		odstranitPozadavekZeSkupinySloucenychPozadavku(rq?:CallParams<{ixp:string,ixpSkupinySloucenych:string}>): _Task<{ixp:string,ixpSkupinySloucenych:string},void>;
		/**Předání požadavku na cestu nebo návštěvu jiné funkci.*/
		predaniPozadavkuFunkci(rq?:CallParams<{ixp:string,ixsFunNov:string,typ:number}>): _Task<{ixp:string,ixsFunNov:string,typ:number},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaDto>>;
		/**Výpočet nákladů požadavku.*/
		vypocetNakladuPozadavku(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Hromadné předání požadavků na cestu/návštěvu jiné funkci.*/
		hromadnePredaniPozadavkuFunkci(rq?:CallParams<{ixpArr:string[],ixsFunNov:string}>): _Task<{ixpArr:string[],ixsFunNov:string},any>;
		/**Hromadné předání požadavků na cestu/návštěvu jiné funkci.*/
		hromadnePredaniPozadavkuFunkci(rq?:CallParams<{ixpArr:string[],ixsFunNov:string,typ:number}>): _Task<{ixpArr:string[],ixsFunNov:string,typ:number},any>;
		/**Hromadné vrácení navrhovateli.*/
		hromadneVraceniNavrhovateli(rq?:CallParams<{ixpArr:string[],ixsFunNov:string}>): _Task<{ixpArr:string[],ixsFunNov:string},any>;
		/**Sloučení více požadavků.*/
		slouceniPozadavku(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},string>;
		/**Hromadné ověření požadavku.*/
		hromadneOvereniPozadavku(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},any>;
		/**Hromadné doporučení požadavku.*/
		hromadneDoporuceniPozadavku(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},any>;
		/**Hromadné schválení požadavku.*/
		hromadneSchvaleniPozadavku(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},any>;
		/**Hromadné zaktivnění požadavku.*/
		hromadneZaktivneniPozadavku(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},any>;
		/**Hromadné zveřejnění pole požadavků.*/
		hromadneZverejneniPozadavku(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},void>;
		/**Hromadné zakázání/povolení změnových řízení na požadavku plánu.*/
		hromadneZakPovZmr(rq?:CallParams<{ixpArr:string[],Zakazat:boolean}>): _Task<{ixpArr:string[],Zakazat:boolean},any>;
		/**Hromadné stornování požadavků.*/
		hromadneStornovaniPozadavku(rq?:CallParams<{ixpArr:string[],duvodStorna:string}>): _Task<{ixpArr:string[],duvodStorna:string},any>;
		/**Provede hromadné sjednocení požadavků pod jeden ORG.*/
		hromadneSjednotitPodJedenOrg(rq?:CallParams<{VychoziOrg:string}>): _Task<{VychoziOrg:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCesta: ServiceBase & Catalog.PcnCesta;
	}
	const PcnCesta: Client["PcnCesta"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro cestu/návštěvu.*/
	const enum GPcnCestaFilter {
		/**Identifikátor požadavku.*/
		ixp,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Stav požadavku.*/
		stav_psc,
		/**Typ požadavku (cesty/návštěvy).*/
		typ_poz,
		/**Rok.*/
		rok,
		/**Třídění.*/
		uex_akt,
		/**Název.*/
		nazev,
		/**Datum počátku cesty.*/
		dat_poc,
		/**Datum ukončení cesty.*/
		dat_konec,
		/**Počet dnů.*/
		dnu,
		/**Místo požadavku.*/
		misto,
		/**Kód státu.*/
		stat,
		/**Datum návrhu.*/
		dat_navrh,
		/**Identifikátor funkce kompetenta.*/
		ixs_fun_komp,
		/**Identifikátor funkce realizátora.*/
		ixs_fun_real,
		/**Identifikátor funkce zadavatele.*/
		ixs_fun_zad,
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt,
		/**Počet účestníků.*/
		pmj,
		/**Částka celkem.*/
		c_celk,
		/**Kód způsobu výpočtu.*/
		zp_vyp,
		/**Kód způsobu dopravy.*/
		zp_dopr,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Počet cest.*/
		pocet_cest,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Financující ičo.*/
		ico_fin,
		/**Financující nákladové středisko.*/
		nks_fin,
		/**Kód dopravního prostředku.*/
		dopr_pr,
		/**Realizující ičo.*/
		ico_real,
		/**Realizující nákladové středisko.*/
		nks_real,
		/**Identifikátor na sloučenou cestu.*/
		ixp_prev,
		/**Příznak zámku přepočtu výdaje.*/
		priz_zam,
		/**Kód typu financování.*/
		kod_tfz,
		/**Cs název.*/
		cs_nazev,
		/**Příznak období plánování požadavků.*/
		druh_psc,
		/**Org.*/
		org,
		/**Identifikátor vlastníka (změnu provedl).*/
		ixs_zmp_akt,
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad,
		/**Rok ADA.*/
		rok_ada,
		/**Ičo ADA.*/
		ico_ada,
		/**Číslo ADA.*/
		cislo_ada,
		/**Identifikátor cia ADA.*/
		ixs_cia_ada,
		/**Příznak zákazu změnového řízení.*/
		priz_zak_zmr,
		/**Identifikátor prvního změnového řízení.*/
		ixp_zmr_prvni,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Příznak nebalancovat.*/
		priz_nebalanc,
		/**Identifikátor členění.*/
		ixs_cle,
		/**Kód kategorie priorit.*/
		kat_pri,
		/**Řádek kategorie priorit.*/
		radek_pop,
		/**Seznam příjmení účastníků.*/
		ucastnici,
		/**Dle identifikátor typu náhrad.*/
		ixs_tna,
		/**Identifikátor dodatku.*/
		ixp_dod,
		/**Přínak zobrazení původního plánu.*/
		puv_plan,
		/**Viditelnost NS, je-li prázdné, dohledá se na serveru dle administrace.*/
		omezeniNs,
		/**Příznak zobrazení realizovaných požadavků.*/
		realizovano,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Uek.*/
		uek,
		/**Uel.*/
		uel,
		/**Uem.*/
		uem,
		/**Uen.*/
		uen,
		/**Te5.*/
		te5,
		/**Te6.*/
		te6,
		/**Te7.*/
		te7,
		/**Te8.*/
		te8,
		/**Te9.*/
		te9,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCestaEtapa.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - etapa cesty/návštěvy.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCestaEtapa {
		/**Detail etapy.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaEtapaDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>;
		/**Seznam etap.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>;
		/**Založení etapy.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>;
		/**Oprava etapa.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>;
		/**Oprava resp. založení etapy.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>;
		/**Odstranění etapy.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaEtapaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCestaEtapa: ServiceBase & Catalog.PcnCestaEtapa;
	}
	const PcnCestaEtapa: Client["PcnCestaEtapa"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro etapu.*/
	const enum GPcnCestaEtapaFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Řádek etapy.*/
		radek_pep,
		/**Z místa.*/
		z_mista,
		/**Do místa.*/
		do_mista,
		/**Kód státu.*/
		stat,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Kód způsobu dopravy.*/
		zp_dopr,
		/**Vzdálenost v km.*/
		km,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Průměrná spotřeba.*/
		prum_sp,
		/**Kód dopravního prostředku.*/
		dopr_pr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCestaFinancovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - financování na cestě/návštěvě.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCestaFinancovani {
		/**Detail financování.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaFinancovaniDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>;
		/**Seznam financování na cestě/návštěvě.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>;
		/**Seznam položek finančního profilu s možností filtrovat dle knihy.*/
		seznamPolozekFinProfilu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>;
		/**Oprava financování.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaFinancovaniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCestaFinancovani: ServiceBase & Catalog.PcnCestaFinancovani;
	}
	const PcnCestaFinancovani: Client["PcnCestaFinancovani"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro Financování pro C/N.*/
	const enum GPcnCestaFinancovaniFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Řádek financování.*/
		radek_pol,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Kód státu.*/
		stat,
		/**Kód měny.*/
		mena,
		/**Částka v měně.*/
		c_mena,
		/**Částka v korunách.*/
		c_celk,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Kód příznaku reciprocity.*/
		priz_recip,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Příznak generováno.*/
		priz_gen,
		/**Příznak započítávat do výdajů.*/
		priz_zapoc,
		/**Poznámka.*/
		poznamka,
		/**Kód typu cestujícího.*/
		typ_dos,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Agendové číslo smlouvy.*/
		ac_sml,
		/**Příznak nebalancovat.*/
		priz_nebalanc,
		/**Identifikátor definovaného typu osoby.*/
		ixs_tos,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Evidenční číslo.*/
		evi_cis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCestaRocniRozpis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - roční rozpis na cestě/návštěvě.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCestaRocniRozpis {
		/**Detail ročního rozpisu.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>;
		/**Seznam ročních rozpisů na cestě/návštěvě.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>;
		/**Založení ročního rozpisu.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>;
		/**Oprava ročního rozpisu.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>;
		/**Oprava resp. založení ročního rozpisu.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>;
		/**Odstranění ročního rozpisu.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaRocniRozpisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCestaRocniRozpis: ServiceBase & Catalog.PcnCestaRocniRozpis;
	}
	const PcnCestaRocniRozpis: Client["PcnCestaRocniRozpis"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro Roční rozpis pro C/N.*/
	const enum GPcnCestaRocniRozpisFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Rok.*/
		rok,
		/**Třídění.*/
		uex_akt,
		/**Název.*/
		nazev,
		/**Dnů.*/
		dnu,
		/**Ppočet cestujících.*/
		pmj,
		/**Počet cest.*/
		pocet_cest,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód dopravního prostředku.*/
		dopr_pr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCestaUcastnikJmeno.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - účastníci seznam osob.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCestaUcastnikJmeno {
		/**Detail účastníka.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>;
		/**Seznam účastníků na cestě/návštěvě.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>;
		/**Založení účastníka.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>;
		/**Oprava účastníka.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>;
		/**Oprava resp. založení účastníka.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>;
		/**Odstranění účastníka.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikJmenoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCestaUcastnikJmeno: ServiceBase & Catalog.PcnCestaUcastnikJmeno;
	}
	const PcnCestaUcastnikJmeno: Client["PcnCestaUcastnikJmeno"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro účastníky.*/
	const enum GPcnCestaUcastnikJmenoFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Pořadí osoby.*/
		por_oso,
		/**Kód vztahu osoby k požadavku.*/
		stav_dos,
		/**Jméno.*/
		jmeno,
		/**Příjmení.*/
		prijmeni,
		/**Titul před.*/
		tit_pred,
		/**Titul za.*/
		tit_za,
		/**Identifikátor funkce.*/
		ixs_fun,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Osobní číslo.*/
		oc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCestaUcastnikPocet.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - účastníci počet dle typu.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCestaUcastnikPocet {
		/**Detail počtů účastníka.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>;
		/**Seznam počtů účastníků dle typu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>;
		/**Založení počtů účastníka dle typu.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>;
		/**Oprava počtů účastníka dle typu.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>;
		/**Oprava resp. založení počtů účastníka dle typu.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>;
		/**Odstranění počtů účastníka dle typu.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaUcastnikPocetDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCestaUcastnikPocet: ServiceBase & Catalog.PcnCestaUcastnikPocet;
	}
	const PcnCestaUcastnikPocet: Client["PcnCestaUcastnikPocet"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro počty účastníků dle typu.*/
	const enum GPcnCestaUcastnikPocetFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Rok.*/
		rok,
		/**Kód typu účastníka.*/
		typ_dos,
		/**Počet účastníků.*/
		pocet,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Financující nákladové středisko.*/
		nks_fin,
		/**Identifikátor typu účastníka.*/
		ixs_tos,
		/**Identifikátor změnového řízení pro dotažení záznamů z časového razítka - před změnou.*/
		ixp_zmr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCestaVydaj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - výdaje na cestě/návštěvě.
	* @domain SluzCestyPlan
	* @businessObject PcnCesta
	*/
	interface PcnCestaVydaj {
		/**Detail výdaje.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCestaVydajDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCestaVydajDto>>;
		/**Seznam výdajů na cestě/návštěvě.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaVydajDto>>;
		/**Založení výdaje.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCestaVydajDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>,void>;
		/**Oprava výdaje.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCestaVydajDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>,void>;
		/**Oprava resp. založení výdaje.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCestaVydajDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>,void>;
		/**Odstranění výdaje.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCestaVydajDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCestaVydajDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCestaVydajDto>>;
		/**Pro hromadný výmaz výdajů dle seznamu řádků výdajů.*/
		deleteHrom(rq?:CallParams<{ixp:string,radkyPol:string}>): _Task<{ixp:string,radkyPol:string},void>;
		/**Zjistím, zda jsou validní data pro export do baru - pro povolení tlačítka.*/
		jeCoExportovatDoBaru(rq?:CallParams<{}>): _Task<{},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCestaVydaj: ServiceBase & Catalog.PcnCestaVydaj;
	}
	const PcnCestaVydaj: Client["PcnCestaVydaj"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro výdaje na cestě/návštěvě.*/
	const enum GPcnCestaVydajFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Řadek výdaje.*/
		radek_pol,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Kód státu.*/
		stat,
		/**Kód měny.*/
		mena,
		/**Částka v měně.*/
		c_mena,
		/**Částka v CZK.*/
		c_celk,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Příznak reciprocity.*/
		priz_recip,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Příznak gennerovaného řádku výdaje.*/
		priz_gen,
		/**Příznak započítávat do výdajů.*/
		priz_zapoc,
		/**Poznámka.*/
		poznamka,
		/**Kód typu účastníka.*/
		typ_dos,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Agendové číslo smlouvy.*/
		ac_sml,
		/**Příznak nebalancovat.*/
		priz_nebalanc,
		/**Identifikátor typu osoby.*/
		ixs_tos,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Identifikátor změnového řízení pro dotažení záznamů z časového razítka - před změnou.*/
		ixp_zmr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnCiloveMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - číselník cílových míst.
	* @domain SluzCestyPlan
	* @businessObject PcnCiloveMisto
	*/
	interface PcnCiloveMisto {
		/**Detail cílového místa.*/
		read(rq?:Gordic.Pcn.Interface.GPcnCiloveMistoDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>;
		/**Seznam cílových míst.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>;
		/**Založení cílového místa.*/
		create(rq?:Gordic.Pcn.Interface.GPcnCiloveMistoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>;
		/**Oprava cílového místa.*/
		update(rq?:Gordic.Pcn.Interface.GPcnCiloveMistoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>;
		/**Oprava resp. založení cílového místa.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnCiloveMistoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>;
		/**Odstranění cílového místa.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnCiloveMistoDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnCiloveMistoDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnCiloveMistoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnCiloveMisto: ServiceBase & Catalog.PcnCiloveMisto;
	}
	const PcnCiloveMisto: Client["PcnCiloveMisto"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro cílová místa.*/
	const enum GPcnCiloveMistoFilter {
		/**ID místa.*/
		id_misto,
		/**Název místa.*/
		misto,
		/**Viditelnost.*/
		viditelnost,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnDefiniceZavaznehoUkazatele.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - definice závazného ukazatele.
	* @domain SluzCestyPlan
	* @businessObject PcnDefiniceZavaznehoUkazatele
	*/
	interface PcnDefiniceZavaznehoUkazatele {
		/**Detail definice závazného ukazatele.*/
		read(rq?:Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>;
		/**Seznam definic dle závazného ukazatele.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>;
		/**Založení definice závazného ukazatele.*/
		create(rq?:Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>;
		/**Oprava definice závazného ukazatele.*/
		update(rq?:Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>;
		/**Oprava resp. založení definice závazného ukazatele.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>;
		/**Metoda provede změnu aktivity na závazném ukazateli dle řádku.*/
		zmenaAktivityZavaznehoUkazatele(rq?:CallParams<{ixpDen:string,radekPol:number}>): _Task<{ixpDen:string,radekPol:number},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDefiniceZavaznehoUkazateleDto>>;
		/**Kontrola závazných ukazatelů pro danou knihu.*/
		kontrolaZavaznychUkazateluPredExp(rq?:CallParams<{ixp_den:string}>): _Task<{ixp_den:string},boolean>;
		/**Přepočet částky a počtů na závazném ukazateli dle řádku.*/
		prepocetZavaznehoUkazatele(rq?:CallParams<{ixpDen:string,radekPol:number}>): _Task<{ixpDen:string,radekPol:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnDefiniceZavaznehoUkazatele: ServiceBase & Catalog.PcnDefiniceZavaznehoUkazatele;
	}
	const PcnDefiniceZavaznehoUkazatele: Client["PcnDefiniceZavaznehoUkazatele"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro definice závazného ukazatele.*/
	const enum GPcnDefiniceZavaznehoUkazateleFilter {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Řádek ukazatele.*/
		radek_pol,
		/**Identifikátor typu náhrad.*/
		ixs_tna,
		/**Kód státu.*/
		stat,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Kód typu cestujícího.*/
		typ_dos,
		/**Částka v CZK.*/
		c_celk,
		/**Počet celkem.*/
		poc_celk,
		/**Datum výpočtu.*/
		dat_vypoctu,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnDodatekCN.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - dodatek cest a návštěv.
	* @domain SluzCestyPlan
	* @businessObject PcnDodatekCN
	*/
	interface PcnDodatekCN {
		/**Detail dodatku.*/
		read(rq?:Gordic.Pcn.Interface.GPcnDodatekCNDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnDodatekCNDto>>;
		/**Seznam dodatků.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnDodatekCNDto>>;
		/**Založení dodatku.*/
		create(rq?:Gordic.Pcn.Interface.GPcnDodatekCNDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDodatekCNDto>>;
		/**Oprava dodatku.*/
		update(rq?:Gordic.Pcn.Interface.GPcnDodatekCNDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDodatekCNDto>>;
		/**Oprava resp. založení dodatku.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnDodatekCNDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnDodatekCNDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnDodatekCNDto>>;
		/**Změna aktivity dodatku.*/
		zmenaAktivity(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnDodatekCN: ServiceBase & Catalog.PcnDodatekCN;
	}
	const PcnDodatekCN: Client["PcnDodatekCN"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro dodatek.*/
	const enum GPcnDodatekCNFilter {
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Název.*/
		nazev,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnKategorieHodnoceni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - kategorie hodnocení.
	* @domain SluzCestyPlan
	* @businessObject PcnKategorieHodnoceni
	*/
	interface PcnKategorieHodnoceni {
		/**Detail kategorie hodnocení.*/
		read(rq?:Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>;
		/**Seznam kategorií hodnocení.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>;
		/**Založení kategorie hodnocení.*/
		create(rq?:Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>;
		/**Oprava kategorie hodnocení.*/
		update(rq?:Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>;
		/**Oprava resp. založení kategorie hodnocení.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnKategorieHodnoceniDto>>;
		/**Vrátí kategorii hodnocení pro cestu/návštěvu jako pole.*/
		kategorieZaznamuPole(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string[]>;
		/**Kategorie záznamu pro cestu/návštěvu jako pole.*/
		kategorieZaznamuPole(rq?:CallParams<{ixp:string,ico:string,rok:number,typPoz:number}>): _Task<{ixp:string,ico:string,rok:number,typPoz:number},string[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnKategorieHodnoceni: ServiceBase & Catalog.PcnKategorieHodnoceni;
	}
	const PcnKategorieHodnoceni: Client["PcnKategorieHodnoceni"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro kategorie hodnocení.*/
	const enum GPcnKategorieHodnoceniFilter {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Kód kategorie hodnocení.*/
		kat_hod,
		/**Kategorie hodnocení popis.*/
		kat_hod_txt,
		/**Filtr.*/
		filtr,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód typu požadavku.*/
		typ_poz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Kniha PCN.
	* @domain SluzCestyPlan
	* @businessObject PcnKniha
	*/
	interface PcnKniha {
		/**Pokusí se vrátit dto knihy - je-li v ekoparams, pak jej vrátí, jinak pro režim přes knihy roku pokud je v roce jediná kniha, vrátím její dto.*/
		vratKnihu(rq?:CallParams<{vypsatPripadneChyby:boolean}>): _Task<{vypsatPripadneChyby:boolean},Gordic.Pcn.Interface.GPcnKnihaDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnKniha: ServiceBase & Catalog.PcnKniha;
	}
	const PcnKniha: Client["PcnKniha"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro Kniha PCN.*/
	const enum GPcnKnihaFilter {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Licence.*/
		lic,
		/**Arw.*/
		arw,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Název.*/
		nazev,
		/**Rok.*/
		rok,
		/**Typ knihy.*/
		typ_den,
		/**Kategori knihy.*/
		ktg_den,
		/**Pořadové číslo maximum.*/
		por_cislo_max,
		/**Subřada maximum.*/
		subrada_max,
		/**Subřada duz.*/
		subrada_duz,
		/**Délka agendového čísla.*/
		len_ac,
		/**Krok uzávěrky.*/
		krok_uza,
		/**Identifikátor původní knihy.*/
		ixp_den_old,
		/**Účtárna.*/
		uus,
		/**Prefix.*/
		prefix,
		/**Suffix.*/
		suffix,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Rok sběru.*/
		rok_sberu,
		/**Příznak plánu.*/
		priz_plan,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnKontrolaLimitu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - kontrola limitů.
	* @domain SluzCestyPlan
	* @businessObject PcnKontrolaLimitu
	*/
	interface PcnKontrolaLimitu {
		/**Detail kontroly limitu.*/
		read(rq?:Gordic.Pcn.Interface.GPcnKontrolaLimituDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>>;
		/**Seznam kontrol limitů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>>;
		/**Oprava kontroly limitu.*/
		update(rq?:Gordic.Pcn.Interface.GPcnKontrolaLimituDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>>;
		/**Vrátí seznam hlaviček výstupu z BARu.*/
		seznamVystupuBar(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pcn.Interface.GVystupyBarPcnDto>>;
		/**Přehled zbývajících částek dle limitu NS.*/
		prehledLimituNs(rq?:CallParams<{nks:string}>): _Task<{nks:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnPrehledLimituDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnKontrolaLimitu: ServiceBase & Catalog.PcnKontrolaLimitu;
	}
	const PcnKontrolaLimitu: Client["PcnKontrolaLimitu"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro kontrolu limitů.*/
	const enum GPcnKontrolaLimituFilter {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Nákladové středisko.*/
		nks,
		/**Řádek.*/
		radek,
		/**Částka limitu.*/
		c_limit,
		/**Částka limitu BAR.*/
		c_limit_bar,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnOmezeniNks.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - roční limit resp. omezení dle Nks.
	* @domain SluzCestyPlan
	* @businessObject PcnOmezeniNks
	*/
	interface PcnOmezeniNks {
		/**Detail omezení.*/
		read(rq?:Gordic.Pcn.Interface.GPcnOmezeniNksDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>;
		/**Seznam omezení.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>;
		/**Založení omezení.*/
		create(rq?:Gordic.Pcn.Interface.GPcnOmezeniNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>;
		/**Oprava omezení.*/
		update(rq?:Gordic.Pcn.Interface.GPcnOmezeniNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>;
		/**Oprava resp. založení omezení.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnOmezeniNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>;
		/**Hromadná úprava příznaku limitu na vybraných položkách (PSCTPID).*/
		hromadUprPriz(rq?:CallParams<{kontrolaLim:boolean,porizZam:boolean,editZam:boolean,ikc:Gordic.General.GIkc}>): _Task<{kontrolaLim:boolean,porizZam:boolean,editZam:boolean,ikc:Gordic.General.GIkc},void>;
		/**Vloží funkci bez omezení pro dané NS.*/
		vlozFunkci(rq?:Gordic.Pcn.Interface.GPcnOmezeniNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>,void>;
		/**Odebere funkci bez omezení pro dané NS.*/
		odeberFunkci(rq?:Gordic.Pcn.Interface.GPcnOmezeniNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnOmezeniNksDto>,void>;
		/**Seznam funkcí bez omezení.*/
		seznamFciBezOmezeni(rq?:Gordic.Pcn.Interface.GFceBezOmezeniDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GFceBezOmezeniDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GFceBezOmezeniDto>,GServiceListResponse<Gordic.Pcn.Interface.GFceBezOmezeniDto>>;
		/**Metoda pro kopírování hodnot číselníku ze zdrojového roku do cílového.*/
		kopirovaniMeziRoky(rq?:CallParams<{rokZdroj:number,rokCil:number}>): _Task<{rokZdroj:number,rokCil:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnOmezeniNks: ServiceBase & Catalog.PcnOmezeniNks;
	}
	const PcnOmezeniNks: Client["PcnOmezeniNks"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro roční limit.*/
	const enum GPcnOmezeniNksFilter {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Nákladové středisko.*/
		nks,
		/**Částka limitu.*/
		c_limit,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kontrola limitu.*/
		kontrola_lim,
		/**Zámek pořízení.*/
		poriz_zam,
		/**Zámek editace.*/
		edit_zam,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnPodpora.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Poznámky pro cesty a příkazy.
	* @domain SluzCestyPlan
	* @businessObject PcnPodpora
	*/
	interface PcnPodpora {
		/**Viditelnost dle NS.*/
		vratSeznamNs(rq?:CallParams<{}>): _Task<{},string>;
		/**Viditelnost dle NS.*/
		vratSeznamNs(rq?:CallParams<{pridatApostrofy:boolean}>): _Task<{pridatApostrofy:boolean},string>;
		/**Vrátí dto se stavy pro menu na detailu C/N, editaci atd...*/
		menuStavyCN(rq?:CallParams<{ixp:string,zmenRiz:boolean}>): _Task<{ixp:string,zmenRiz:boolean},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuCNDto>>;
		/**Vrátí dto se stavy pro menu na detailu C/N, editaci atd...*/
		menuStavyCN(rq?:CallParams<{ixp:string,stavPsc:number,ixsFunAkt:string,nksFin:string,zpVyp:number,zmenRiz:boolean}>): _Task<{ixp:string,stavPsc:number,ixsFunAkt:string,nksFin:string,zpVyp:number,zmenRiz:boolean},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuCNDto>>;
		/**Vrátí dto se stavy pro menu na detailu C/N, editaci atd...*/
		menuStavyCN(rq?:CallParams<{ixp:string,ixpDen:string,stavPsc:number,ixsFunAkt:string,nksFin:string,zpVyp:number,zmenRiz:boolean}>): _Task<{ixp:string,ixpDen:string,stavPsc:number,ixsFunAkt:string,nksFin:string,zpVyp:number,zmenRiz:boolean},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuCNDto>>;
		/**Vrátí dto se stavy nad seznamem C/N.*/
		seznamStavyCN(rq?:CallParams<{nksFin:string}>): _Task<{nksFin:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuCNDto>>;
		/**Vrátí dto se stavy pro menu detailu ZMR, editaci atd...*/
		menuStavyZmr(rq?:CallParams<{ixpZmr:string}>): _Task<{ixpZmr:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuZmrDto>>;
		/**Vrátí dto se stavy pro menu detailu ZMR, editaci atd...*/
		menuStavyZmr(rq?:CallParams<{ixpZmr:string,typZmr:number,stavZmr:number,ixpDen:string}>): _Task<{ixpZmr:string,typZmr:number,stavZmr:number,ixpDen:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuZmrDto>>;
		/**Vrátí dto se stavy nad seznamem ZMR.*/
		seznamStavyZmr(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnMenuZmrDto>>;
		/**Povolení akcí na záložce účastníci (seznam i počty).*/
		povoleniAkciCnUcastnici(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na záložce etapy.*/
		povoleniAkciCnEtapy(rq?:CallParams<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string}>): _Task<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na záložce sloučené.*/
		povoleniAkciCnSlouceni(rq?:CallParams<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string}>): _Task<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na záložce výdaje.*/
		povoleniAkciCnVydaje(rq?:CallParams<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string}>): _Task<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na záložce roční rozpis.*/
		povoleniAkciCnRocniRozpis(rq?:CallParams<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string}>): _Task<{ixpDen:string,ixp:string,stavPsc:number,nksFin:string,ixsFunAkt:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na záložce dotčené požadavky.*/
		povoleniAkciZmrDotcenePoz(rq?:CallParams<{stavZmr:number}>): _Task<{stavZmr:number},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na záložce finanční profil.*/
		povoleniAkciZmrFinProfil(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na číselníku kategorií hodnocení.*/
		povoleniAkciCisKatHod(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na číselníku omezení NS.*/
		povoleniAkciCisOmezeniNs(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na číselníku zabezpečujících NS.*/
		povoleniAkciCisZabezpecujicichNs(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Povolení akcí na hlavním okně - jednotlivé úlohy.*/
		povoleniAkciMainTask(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnTlacitkaDto>>;
		/**Vystavení plánu správcem.*/
		vystavitPlan(rq?:CallParams<{}>): _Task<{},void>;
		/**Příprava skartace správcem.*/
		pripravaSkartace(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnPodpora: ServiceBase & Catalog.PcnPodpora;
	}
	const PcnPodpora: Client["PcnPodpora"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro poznámky na cesty.*/
	const enum GPcnPodporaFilter {
		/**Identifikátor.*/
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnPrehledVystupuBar.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - přehled výstupů BAR.
	* @domain SluzCestyPlan
	* @businessObject PcnPrehledVystupuBar
	*/
	interface PcnPrehledVystupuBar {
		/**Detail přehledu výstupů BAR.*/
		read(rq?:Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>>;
		/**Seznam přehledu výstupů BAR.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>>;
		/**Oprava přehledu výstupů BAR.*/
		update(rq?:Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnPrehledVystupuBarDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnPrehledVystupuBar: ServiceBase & Catalog.PcnPrehledVystupuBar;
	}
	const PcnPrehledVystupuBar: Client["PcnPrehledVystupuBar"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro přehled výstupů BAR.*/
	const enum GPcnPrehledVystupuBarFilter {
		/**Pořadové číslo dávky.*/
		por_cis_d,
		/**Řádek.*/
		radek,
		/**Rok.*/
		rok,
		/**Rok sběru.*/
		rok_sberu,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Identifikátor položky.*/
		ixp,
		/**Číslo akce.*/
		cislo_akce,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**C0.*/
		c0,
		/**C1.*/
		c1,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Ipf.*/
		ipf,
		/**Dfs.*/
		dfs,
		/**Komodita.*/
		komodita,
		/**Popis.*/
		popis,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**C0 sum.*/
		c0_sum,
		/**C1 sum.*/
		c1_sum,
		/**Příznak nebalancovat.*/
		priz_nebalanc,
		/**Identifikátor primárního dokladu.*/
		ixp_prim,
		/**Příznak exportováno.*/
		priz_exp,
		/**Rozpočtové položky.*/
		rpp,
		/**Jen položky pro úpravu.*/
		jen_polozky_pro_upravu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnSml.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - podpora napojení na SML.
	* @domain SluzCestyPlan
	* @businessObject PcnSml
	*/
	interface PcnSml {
		/**Detail napojení na smlouvu.*/
		read(rq?:Gordic.Pcn.Interface.GPcnSmlDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnSmlDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnSmlDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnSmlDto>>;
		/**Seznam napojení na smlouvu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnSmlDto>>;
		/**Vrátí agendové číslo smlouvy dle pidu.*/
		vratAcSmlDleIxp(rq?:CallParams<{ixpSml:string}>): _Task<{ixpSml:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnSml: ServiceBase & Catalog.PcnSml;
	}
	const PcnSml: Client["PcnSml"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro napojení na SML.*/
	const enum GPcnSmlFilter {
		/**Identifikátor smlouvy.*/
		ixp_sml_pri,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Nákladové středisko.*/
		nks,
		/**Částka v měně.*/
		c_mena,
		/**Častka v CZK.*/
		c,
		/**Částka položky.*/
		c_pol,
		/**Částka fakturovaná.*/
		c_fak,
		/**Kód měny.*/
		mena,
		/**Kód kategorie smlouvy.*/
		ktg_sml,
		/**Datum uzavření.*/
		dat_uzavreni,
		/**Datum účinnosti.*/
		dat_ucinnost,
		/**Datum platnosti.*/
		dat_platnost,
		/**Identifikátor vyřizující funkce.*/
		ixs_fun_vyriz,
		/**Identifikátor referenta funkce.*/
		ixs_fun_ref,
		/**Číslo realizátora.*/
		cis_real,
		/**Identifikátor případu blokační agendy.*/
		ixs_pri,
		/**Identifikátor nabyvatele.*/
		ixp_nab,
		/**Pořadové číslo nabyvatele.*/
		por_cislo_nab,
		/**Typ agendového bloku.*/
		typ_ag_blok,
		/**Financováno od.*/
		fin_od,
		/**Financováno do.*/
		fin_do,
		/**Kód stavu smlouvy.*/
		sml_stav,
		/**Kód příznaku stavu.*/
		sgn_stav,
		/**Typ ceny.*/
		typ_ceny,
		/**Agendové číslo verze zakázky.*/
		ac_ver_zak,
		/**Identifikátor typu.*/
		ixs_typ,
		/**Popis.*/
		popis,
		/**Název.*/
		nazev,
		/**Agendové číslo smlouvy.*/
		ac_sml,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Příznak pzp.*/
		priz_pzp,
		/**Částka v měně z osv.*/
		c_mena_z_osv,
		/**Částka v měně z bd.*/
		c_mena_z_bd,
		/**Částka v měně z ss.*/
		c_mena_z_ss,
		/**Částka v měně z ns.*/
		c_mena_z_ns,
		/**Částka v měně dph ss.*/
		c_mena_dph_ss,
		/**Částka v měně dph ns.*/
		c_mena_dph_ns,
		/**Částka v měně  ss.*/
		c_c_mena_ss,
		/**Částka v měně  ns.*/
		c_c_mena_ns,
		/**Částka v měně okr.*/
		c_c_mena_okr,
		/**Typ phl.*/
		typ_phl,
		/**Variabliní symbol.*/
		vs,
		/**Částka v měně dph 3s.*/
		c_mena_dph_3s,
		/**Částka v měně dph 4s.*/
		c_mena_dph_4s,
		/**Částka v měně  z 3s.*/
		c_mena_z_3s,
		/**Částka v měně z 4s.*/
		c_mena_z_4s,
		/**Částka v měně 3s.*/
		c_c_mena_3s,
		/**Částka v měně 4s.*/
		c_c_mena_4s,
		/**Částka v měně doc.*/
		c_mena_doc,
		/**Datum rad iissp.*/
		dat_rad_iissp,
		/**Příznak opce.*/
		priz_opce,
		/**Identifikátor knihy (smlspid).*/
		ixp_den,
		/**Identifikátor externího subjektu.*/
		ixs_esu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnSouhrn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - podpora pro Dashboard.
	* @domain SluzCestyPlan
	* @businessObject PcnSouhrn
	*/
	interface PcnSouhrn {
		/**Vrátí počty pro aktuální rok/knihu.*/
		poctyPozadavkuNaCestuANavstevu(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnSouhrnDto>>;
		/**Vrátí počty pro aktuální rok/knihu.*/
		poctyPozadavkuNaCestuANavstevu(rq?:CallParams<{pocty:boolean,financniPrehled:boolean}>): _Task<{pocty:boolean,financniPrehled:boolean},GServiceReadResponse<Gordic.Pcn.Interface.GPcnSouhrnDto>>;
		/**Vrátí seznam zbývajících limitů.*/
		zbyvajiciLimityList(rq?:CallParams<{filtrPoleNS:string[]}>): _Task<{filtrPoleNS:string[]},GServiceListResponse<Gordic.Pcn.Interface.GPcnKontrolaLimituDto>>;
		/**Vrátí seznam NS resp. omezení viditelnosti na ně.*/
		viditelnostNs(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Pcn.Interface.GPcnSouhrnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnSouhrn: ServiceBase & Catalog.PcnSouhrn;
	}
	const PcnSouhrn: Client["PcnSouhrn"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro souhrn.*/
	const enum GPcnSouhrnFilter {
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Nákladové středisko.*/
		nks,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Identifikátor externího subjektu.*/
		ixs_esu,
	}
	/**Typ požadavku*/
	const enum TypPozadavkuEnum {
		/**Cesta.*/
		Cesta,
		/**Návštěva.*/
		Navsteva,
	}
	/**Stav požadavku.*/
	const enum StavPozadavkuEnum {
		/**Všechny.*/
		Vse,
		/**Schválené.*/
		Schvaleno,
		/**Navrhnuté.*/
		Navrhnuto,
	}
	/**Filtrační subjekt.*/
	const enum FiltracniSubjektEnum {
		/**Funkce.*/
		Funkce,
		/**Nákladové středisko.*/
		Nks,
		/**Podřízená nákladová střediska.*/
		PodrizenaNks,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnTempTabulka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - temp tabulka pro hromadné operace a sestavy.
	* @domain SluzCestyPlan
	* @businessObject PcnTempTabulka
	*/
	interface PcnTempTabulka {
		/**Detail položky temp tabulky.*/
		read(rq?:Gordic.Pcn.Interface.GPcnTempTabulkaDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnTempTabulkaDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>;
		/**Seznam položek temp tabulky.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>;
		/**Založení položek do temp tabulky.*/
		create(rq?:Gordic.Pcn.Interface.GPcnTempTabulkaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnTempTabulkaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>;
		/**Do DB připraví seznam pidů dle aktuální masky resp. zobrazeného seznamu.*/
		pripravaTisku(rq?:CallParams<{pidy:string}>): _Task<{pidy:string},JsonDecimal>;
		/**Odstraní z DB seznam pidů k tisku dle LPC a IKC.*/
		cisteniPoTisku(rq?:CallParams<{ikc:JsonDecimal}>): _Task<{ikc:JsonDecimal},void>;
		/**Uloží seznam pidů.*/
		createPidy(rq?:CallParams<{polePidu:string[]}>): _Task<{polePidu:string[]},void>;
		/**Odstranění záznamů dle LPC případně i IKC.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnTempTabulkaDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnTempTabulkaDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnTempTabulkaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnTempTabulka: ServiceBase & Catalog.PcnTempTabulka;
	}
	const PcnTempTabulka: Client["PcnTempTabulka"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro temp tabulku.*/
	const enum GPcnTempTabulkaFilter {
		/**Log_por_cislo.*/
		log_por_cislo,
		/**Identifikátor.*/
		ixp,
		/**Ico.*/
		ico,
		/**Ucs.*/
		ucs,
		/**Uus.*/
		uus,
		/**Nks.*/
		nks,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Částka v měně.*/
		c_mena,
		/**Částka v CZK.*/
		c_celk,
		/**Kód měny.*/
		mena,
		/**Kurz.*/
		kurz,
		/**Příznak zpracování.*/
		priz_zprac,
		/**Příznak kum.*/
		priz_kum,
		/**Příznak tisku.*/
		priz_tisk,
		/**Ikc.*/
		ikc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnWflProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - WFL Profil.
	* @domain SluzCestyPlan
	* @businessObject PcnWflProfil
	*/
	interface PcnWflProfil {
		/**Detail písemnosti.*/
		read(rq?:Gordic.Pcn.Interface.GPcnWflProfilDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnWflProfilDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnWflProfilDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnWflProfilDto>>;
		/**Seznam písemností.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnWflProfilDto>>;
		/**Seznam písemností dle rychlého filtru.*/
		rychleHledani(rq?:CallParams<{hledanyText:string}>): _Task<{hledanyText:string},GServiceListResponse<Gordic.Pcn.Interface.GPcnWflProfilDto>>;
		/**Oprava písemnosti.*/
		update(rq?:Gordic.Pcn.Interface.GPcnWflProfilDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnWflProfilDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnWflProfilDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnWflProfilDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnWflProfil: ServiceBase & Catalog.PcnWflProfil;
	}
	const PcnWflProfil: Client["PcnWflProfil"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro písemnost.*/
	const enum GPcnWflProfilFilter {
		/**Identifikátor.*/
		ixp,
		/**Licence.*/
		lic,
		/**Ixp_spis.*/
		ixp_spis,
		/**Priz_spis.*/
		priz_spis,
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt,
		/**Identifikátor spisového uzlo vlastníka.*/
		ixs_su_akt,
		/**Název.*/
		nazev,
		/**Akt značka.*/
		akt_znacka,
		/**Kód stavu písemnosti - distribuční.*/
		stav_dist,
		/**Kód stavu písemnosti - obsloužení.*/
		stav_pis,
		/**Typ agendy.*/
		typ_ag,
		/**Kód kategorie typu písemnosti.*/
		ktg_typ,
		/**Identifikátor typu písemnosti.*/
		ixs_typ,
		/**S_prij.*/
		s_prij,
		/**S_ssl.*/
		s_ssl,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**S_ele.*/
		s_ele,
		/**S_fyz.*/
		s_fyz,
		/**Místo vzniku.*/
		misto_vzniku,
		/**S_sgn.*/
		s_sgn,
		/**Datum pod.*/
		dat_pod,
		/**Cs_akt_znacka.*/
		cs_akt_znacka,
		/**Příznak zobrazení.*/
		priz_view_ssl,
		/**Uzo.*/
		uzo,
		/**Spisový plán.*/
		spis_pl,
		/**Spisový znak.*/
		spis_znak,
		/**Ixs_fun_wfl.*/
		ixs_fun_wfl,
		/**S_uloz.*/
		s_uloz,
		/**Datum uložení.*/
		dat_uloz,
		/**Ixs_su_wfl.*/
		ixs_su_wfl,
		/**S_odes.*/
		s_odes,
		/**Datum mpd0.*/
		dat_mpd0,
		/**Priz_cj.*/
		priz_cj,
		/**Datum vyřízení.*/
		dat_vyriz,
		/**Ixs_cj.*/
		ixs_cj,
		/**Ixs_lpc.*/
		ixs_lpc,
		/**Původ.*/
		puvod,
		/**S_schval.*/
		s_schval,
		/**Umístění.*/
		umisteni,
		/**Kód stupně utajení.*/
		st_utaj_id,
		/**Wfl přístup.*/
		wfl_pristup,
		/**Skartační znak.*/
		skar_znak,
		/**Skartační lhůta.*/
		skar_lhuta,
		/**Rok_spo_uda.*/
		rok_spo_uda,
		/**Ixp_top.*/
		ixp_top,
		/**Typ_spis.*/
		typ_spis,
		/**Barcode.*/
		barcode,
		/**Skar_lhuta_spra.*/
		skar_lhuta_spra,
		/**Ixs_ext.*/
		ixs_ext,
		/**Rok skartace.*/
		rok_skartace,
		/**Ixs_spu.*/
		ixs_spu,
		/**Počet listů.*/
		poc_listu,
		/**Počet stran.*/
		poc_stran,
		/**Počet kopií.*/
		poc_kop,
		/**Počet příloh.*/
		poc_priloh,
		/**Počet listů příloh.*/
		poc_l_priloh,
		/**Číslo jednací.*/
		cj,
		/**Ičo.*/
		ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnZabezpecujiciNks.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - zabezpečující NKS.
	* @domain SluzCestyPlan
	* @businessObject PcnZabezpecujiciNks
	*/
	interface PcnZabezpecujiciNks {
		/**Detail zabezpečujícího NKS.*/
		read(rq?:Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Seznam zabezpečujících NKS.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Seznam položek.*/
		listPol(rq?:CallParams<{rok:number,ico:string,nks:string}>): _Task<{rok:number,ico:string,nks:string},GServiceListResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Založení zabezpečujícího NKS.*/
		create(rq?:Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Oprava zabezpečujícího NKS.*/
		update(rq?:Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Založení položky.*/
		createPol(rq?:Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Oprava položky.*/
		updatePol(rq?:Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZabezpecujiciNksDto>>;
		/**Metoda pro kopírování hodnot číselníku ze zdrojového roku do cílového.*/
		kopirovaniMeziRoky(rq?:CallParams<{rokZdroj:number,rokCil:number}>): _Task<{rokZdroj:number,rokCil:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnZabezpecujiciNks: ServiceBase & Catalog.PcnZabezpecujiciNks;
	}
	const PcnZabezpecujiciNks: Client["PcnZabezpecujiciNks"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro zabezpečující NKS.*/
	const enum GPcnZabezpecujiciNksFilter {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Nákladové středisko.*/
		nks,
		/**Název.*/
		nazev,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnZmenoveRizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - změnové řízení.
	* @domain SluzCestyPlan
	* @businessObject PcnZmenoveRizeni
	*/
	interface PcnZmenoveRizeni {
		/**Detail změnového řízení.*/
		read(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Seznam změnových řízení.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Počet změnových řízení.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Seznam navázaných cest/návštěv (ixp_zmr musí obsahovat IXP dané C/N).*/
		listNavazanychZmr(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Založení změnového řízení.*/
		create(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Oprava změnového řízení.*/
		update(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Oprava resp. založení změnového řízení.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Odstranění změnového řízení.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Změna stavu.*/
		zmenaStavu(rq?:CallParams<{ixpZmr:string,stavZmr:number}>): _Task<{ixpZmr:string,stavZmr:number},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Hromadné schválení.*/
		hromadneSchvaleni(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},any>;
		/**Hromadná realizace.*/
		hromadnaRealizace(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},any>;
		/**Nastaví příznak priz_view - doklad zobrazen/přečten.*/
		oznacJakoPrecteny(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Předání na jinou funkci.*/
		predani(rq?:CallParams<{ixpZmr:string,ixsFunDo:string}>): _Task<{ixpZmr:string,ixsFunDo:string},GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDto>>;
		/**Provede odpojení daného požadavku ze změnového řízení a obnoví původní data dle časového razítka.*/
		odstraneniDotcenehoPoz(rq?:CallParams<{ixpZmr:string,ixp:string}>): _Task<{ixpZmr:string,ixp:string},void>;
		/**Provede napojení daného požadavku na změnové řízení.*/
		pridaniDotcenehoPoz(rq?:CallParams<{ixpZmr:string,ixp:string,priz_prim:number,zmena:number,priz_new:number}>): _Task<{ixpZmr:string,ixp:string,priz_prim:number,zmena:number,priz_new:number},void>;
		/**Označí daný dotčený požadavek stavem změnami (pscvzmr).*/
		oznaceniDotPozZmen(rq?:CallParams<{ixpZmr:string,ixp:string}>): _Task<{ixpZmr:string,ixp:string},void>;
		/**Lze měnit dotčené požadavky.*/
		lzeMenitDotcenePoz(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},boolean>;
		/**Lze měnit finanční profil.*/
		lzeMenitFinProfil(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnZmenoveRizeni: ServiceBase & Catalog.PcnZmenoveRizeni;
	}
	const PcnZmenoveRizeni: Client["PcnZmenoveRizeni"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro změnové řízení.*/
	const enum GPcnZmenoveRizeniFilter {
		/**Identifikátor změnového řízení.*/
		ixp_zmr,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Kód stavu změnového řízení.*/
		stav_zmr,
		/**Kód typu změnového řízení.*/
		typ_zmr,
		/**Popis.*/
		popis,
		/**Datum zadání.*/
		dat_zad,
		/**Datum evidence.*/
		dat_evi,
		/**Datum schválení.*/
		dat_sch,
		/**Datum realizováno.*/
		dat_pra,
		/**Aktivita.*/
		aktivita,
		/**Datum změna.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor rozpočtu.*/
		ixp_roz,
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_vla,
		/**Identifikátor zadavatele(zmp).*/
		ixs_zmp_zad,
		/**Viditelnost NS, je-li prázdné, dohledá se na serveru dle administrace.*/
		seznamNs,
	}
	/**Filtr pro list navázaných.*/
	const enum GPcnZmenoveRizeniNavazaneFilter {
		/**Identifikátor.*/
		ixp_zmr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnZmenoveRizeniDotcenePoz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - dotčené požadavky změnového řízení.
	* @domain SluzCestyPlan
	* @businessObject PcnZmenoveRizeni
	*/
	interface PcnZmenoveRizeniDotcenePoz {
		/**Detail vazby dotčeného požadavku.*/
		read(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>;
		/**Seznam vazeb dotčených požadavků.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>;
		/**Založení vazby dotčeného požadavku.*/
		create(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>;
		/**Oprava vazby dotčeného požadavku.*/
		update(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>;
		/**Oprava resp. založení vazby dotčeného požadavku.*/
		upsert(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>;
		/**Odstranění vazby dotčeného požadavku.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniDotcenePozDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnZmenoveRizeniDotcenePoz: ServiceBase & Catalog.PcnZmenoveRizeniDotcenePoz;
	}
	const PcnZmenoveRizeniDotcenePoz: Client["PcnZmenoveRizeniDotcenePoz"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr pro vazby na dotčené požadavky změnového řízení.*/
	const enum GPcnZmenoveRizeniDotcenePozFilter {
		/**Identifikátor změnového řízení.*/
		ixp_zmr,
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Příznak primární položky.*/
		priz_prim,
		/**Příznak změny.*/
		zmena,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Příznak nové položky.*/
		priz_new,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnZmenoveRizeniFinancniProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - finanční profil změnového řízení.
	* @domain SluzCestyPlan
	* @businessObject PcnZmenoveRizeni
	*/
	interface PcnZmenoveRizeniFinancniProfil {
		/**Detail finančního profilu.*/
		read(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceReadRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>,GServiceReadResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>;
		/**Seznam finančních profilů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>;
		/**Seznam dočených zdrojů.*/
		listDotZdroje(rq?:CallParams<{ixpZmr:string}>): _Task<{ixpZmr:string},GServiceListResponse<Gordic.Pcn.Interface.GPcnCestaFinancovaniDto>>;
		/**Založení položky finančního profilu.*/
		create(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>;
		/**Odstranění položky finančního profilu.*/
		delete(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>,GServiceSaveResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>;
		/**Provede přidání nové položky do finančního profilu.*/
		pridaniPolFinProf(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniFinancniProfilDto>,void>;
		/**Provede přdání nové položky do finančního profilu na úkor jiné položky.*/
		pridaniPolFinProfOld(rq?:CallParams<{ixp_zmr:string,ixp_zdroj:string,radek_pol:number,c_celk:JsonDecimal}>): _Task<{ixp_zmr:string,ixp_zdroj:string,radek_pol:number,c_celk:JsonDecimal},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnZmenoveRizeniFinancniProfil: ServiceBase & Catalog.PcnZmenoveRizeniFinancniProfil;
	}
	const PcnZmenoveRizeniFinancniProfil: Client["PcnZmenoveRizeniFinancniProfil"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr položek finančního profilu.*/
	const enum GPcnZmenoveRizeniFinancniProfilFilter {
		/**Identifikátor změnového řízení.*/
		ixp_zmr,
		/**Řádek.*/
		radek_zmr,
		/**Kód typu požky.*/
		typ_pfp,
		/**Identifikátor cesty/návštěvy.*/
		ixp,
		/**Řádek položky výdaje cesty/návštěvy.*/
		radek_pol,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Kód státu.*/
		stat,
		/**Částka v CZK.*/
		c_celk,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód typu cestujícího.*/
		typ_dos,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnZmenoveRizeniRoz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - změnové řízení - export ROZ.
	* @domain SluzCestyPlan
	* @businessObject PcnZmenoveRizeni
	*/
	interface PcnZmenoveRizeniRoz {
		/**Seznam exportu ROZ.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto>>;
		/**Export do ROZ.*/
		export(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto>,void>;
		/**Hromadný export do ROZ.*/
		exportHromadny(rq?:Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto|CallParams<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto>>): _Task<GServiceSaveRequest<Gordic.Pcn.Interface.GPcnZmenoveRizeniRozDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnZmenoveRizeniRoz: ServiceBase & Catalog.PcnZmenoveRizeniRoz;
	}
	const PcnZmenoveRizeniRoz: Client["PcnZmenoveRizeniRoz"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr export ROZ.*/
	const enum GPcnZmenoveRizeniRozFilter {
		/**Identifikátor změnového řízení.*/
		ixp_zmr,
		/**Řádek.*/
		radek_zmr,
		/**Kód typu položky.*/
		typ_pfp,
		/**Identifikátor.*/
		ixp,
		/**Řádek položky.*/
		radek_pol,
		/**Identifikátor typu náhrad.*/
		ixs_tna,
		/**Kód státu.*/
		stat,
		/**Částka v CZK.*/
		c_celk,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Uea.*/
		uea,
		/**Ueb.*/
		ueb,
		/**Uec.*/
		uec,
		/**Ued.*/
		ued,
		/**Uee.*/
		uee,
		/**Uef.*/
		uef,
		/**Ueg.*/
		ueg,
		/**Ueh.*/
		ueh,
		/**Uei.*/
		uei,
		/**Uej.*/
		uej,
		/**Te0.*/
		te0,
		/**Te1.*/
		te1,
		/**Te2.*/
		te2,
		/**Te3.*/
		te3,
		/**Te4.*/
		te4,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód typu účastníka.*/
		typ_dos,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pcn.Interface\Isl\IGPcnZmenoveRizeniVazba.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - vazba změnového řízení.
	* @domain SluzCestyPlan
	* @businessObject PcnZmenoveRizeni
	*/
	interface PcnZmenoveRizeniVazba {
		/**Seznam vazeb změnového řízení.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pcn.Interface.GPcnZmenoveRizeniVazbaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PcnZmenoveRizeniVazba: ServiceBase & Catalog.PcnZmenoveRizeniVazba;
	}
	const PcnZmenoveRizeniVazba: Client["PcnZmenoveRizeniVazba"];
}
declare namespace Gordic.Pcn.Interface {
	/**Filtr vazby změnového řízení.*/
	const enum GPcnZmenoveRizeniVazbaFilter {
		/**Identifikátor změnového řízení.*/
		ixp_zmr,
		/**Agenda.*/
		ag,
		/**Identifikátor dokladu.*/
		ixp,
		/**Název.*/
		nazev,
		/**Agendové číslo.*/
		ac,
		/**Popis.*/
		popis,
		/**Stav zaúčtování.*/
		s_zau_txt,
		/**Stav pořízení.*/
		s_sto_txt,
		/**Částka.*/
		c,
		/**Datum evidence.*/
		dat_evid,
		/**Kód stavu zaúčtování.*/
		s_zau,
		/**Kód stavu pořízení.*/
		s_sto,
		/**Aktivita ekonomického dokumentu.*/
		eko_akt,
		/**Název rf.*/
		nazev_rf,
	}
}

//#endregion

