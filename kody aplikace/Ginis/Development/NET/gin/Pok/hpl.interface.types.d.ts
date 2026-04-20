/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       hpl.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Hpl.Interface\Gordic.Hpl.Interface.csproj
*    created     2026-02-16 14:33:53
*    files       Base\Gordic.Hpl.Interface.IGHplInterface.d.ts
*                Dto\GPokBankPlatbyDto.d.ts
*                Dto\GPokCeninyDto.d.ts
*                Dto\GPokDokladDto.d.ts
*                Dto\GPokdpetDto.d.ts
*                Dto\GPokEnabledDetailActionDto.d.ts
*                Dto\GPokHistPocStavuDto.d.ts
*                Dto\GPokHistUzaverekDto.d.ts
*                Dto\GPokKnihaDto.d.ts
*                Dto\GPokPlatbyKartouDto.d.ts
*                Dto\GPokPolozkyDto.d.ts
*                Dto\GPokPripadyDdpDto.d.ts
*                Dto\GPokskokDto.d.ts
*                Dto\GPokskonDto.d.ts
*                Dto\GPokspitDto.d.ts
*                Dto\GPokStavyDto.d.ts
*                Dto\GPokstkoDto.d.ts
*                Dto\GPokUcetTerminaluKnihyDto.d.ts
*                Dto\GPokvvkhDto.d.ts
*                Dto\GPokvzktDto.d.ts
*                Dto\GPokZalohyDto.d.ts
*                Dto\GPokZapisyDto.d.ts
*                Dto\Others\GPokAsyncCardStateInputDto.d.ts
*                Dto\Others\GPokAsyncCardStateOutputDto.d.ts
*                Dto\Others\GPokDokladFilterDto.d.ts
*                Dto\Others\GPokEkodmenDto.d.ts
*                Dto\Others\GPokHistorieKurzuDto.d.ts
*                Dto\Others\GPokKontrolyDto.d.ts
*                Dto\Others\GPokPohybyParovaniDto.d.ts
*                Dto\Others\GPokRadkyZpuZauctovaniDto.d.ts
*                Dto\Others\GPokZapisyParovaniDto.d.ts
*                LK\Isl\GPokBoolString.d.ts
*                LK\Isl\PokBankPlatby.d.ts
*                LK\Isl\PokDoklad.d.ts
*                LK\Isl\PokKniha.d.ts
*                LK\Isl\PokKontace.d.ts
*                LK\Isl\PokPolozka.d.ts
*                LK\Isl\PokSablona.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Base\Gordic.Hpl.Interface.IGHplInterface.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**výčet Fazí pokladny*/
	const enum GPokFaze {
		/**Jiná fáze*/
		Jina=999,
		/**POK (0)*/
		POK=0,
		/**PPD (10)*/
		PPD=10,
		/**SOC (20)*/
		SOC=20,
		/**WS PPD (30)*/
		WS_PPD=30,
		/**WS POK (0)*/
		WS_POK=0,
		/**RCN (40)*/
		RCN=40,
		/**REG (360)*/
		REG=360,
		/**PRR (410)*/
		PRR=410,
		/**MTK (450)*/
		MTK=450,
		/**SSO (495)*/
		SSO=495,
		/**SKO (600)*/
		SKO=600,
		/**SPR (660)*/
		SPR=660,
		/**POZ (860) (ginctag, pokctyp)*/
		POZ=860,
	}
	/**Výčet možných stavů aktivity (gincakt)*/
	const enum GPokAktivita {
		/**aktivní (100)*/
		aktivni=100,
		/**připraven (300)*/
		pripraven=300,
		/**neaktivni (500)*/
		neaktivni=500,
		/**návrh (600)*/
		navrh=600,
		/**zrušen (900)*/
		zrusen=900,
	}
	/**Výčet typů daně  (ekocdat)*/
	const enum GDanTypEnum {
		/**Bez DPH (0)*/
		bez_dph=0,
		/**Základní (10)*/
		zakladni=10,
		/**Snížená (20)*/
		snizena=20,
		/**druhá snížená*/
		druha_snizena=30,
		/**třetí snížená*/
		treti_snizena=40,
	}
	/**Výčet daňových skupin (pokcdas)*/
	const enum GPokDanSkup {
		/**běžná (0)*/
		bezna=0,
		/**osvobozeno (10)*/
		osvobozeno=10,
		/**výv. zboží (20)*/
		vyvozZbozi=20,
		/**výv. služeb (30)*/
		vyvozSluzeb=30,
		/**dovoz (40)*/
		dovoz=40,
		/**mez. přep. (50)*/
		mezPrep=50,
	}
	/**Stav uzávěrky agend*/
	const enum GPokEkocuza {
		/**neurčeno*/
		Neurceno=0,
		/**nuceně*/
		UzavrenaNucene=300,
		/**záv. zápisy*/
		ZaverecneZapisy=310,
		/**uzavřena*/
		Uzavrena=500,
		/**dodatečně - v číselníku ekocuza není (představuje nepřidaný řádek v ekocuza)*/
		Otevreno=100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokBankPlatbyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:BankPlatby*/
	interface GPokBankPlatbyDto {
		/**DBCOLUMN:BankPlatby.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:BankPlatby.vs*/
		vs?: string|null;
		/**DBCOLUMN:BankPlatby.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:BankPlatby.radek_uhr*/
		radek_uhr?: number|null;
		/**DBCOLUMN:BankPlatby.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:BankPlatby.c_par*/
		c_par?: JsonDecimal|null;
		/**DBCOLUMN:BankPlatby.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:BankPlatby.c_par_mena*/
		c_par_mena?: JsonDecimal|null;
		/**DBCOLUMN:BankPlatby.ks*/
		ks?: string|null;
		/**DBCOLUMN:BankPlatby.ss*/
		ss?: string|null;
		/**DBCOLUMN:BankPlatby.ac*/
		ac?: string|null;
		/**DBCOLUMN:BankPlatby.ico*/
		ico?: string|null;
		/**DBCOLUMN:BankPlatby.rc*/
		rc?: string|null;
		/**DBCOLUMN:BankPlatby.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:BankPlatby.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:BankPlatby.dat_nar*/
		dat_nar?: JsonDate|null;
		/**DBCOLUMN:BankPlatby.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:BankPlatby.dat_spl*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:BankPlatby.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:BankPlatby.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:BankPlatby.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:BankPlatby.typ_ag*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:BankPlatby.zp*/
		zp?: number|null;
		/**DBCOLUMN:BankPlatby.zp*/
		zp_txt?: string|null;
		/**DBCOLUMN:BankPlatby.mena*/
		mena?: number|null;
		/**DBCOLUMN:BankPlatby.mena*/
		mena_zkr?: string|null;
		/**DBCOLUMN:BankPlatby.phl_nazev*/
		phl_nazev?: string|null;
		/**DBCOLUMN:BankPlatby.saldo*/
		saldo?: JsonDecimal|null;
		/**DBCOLUMN:BankPlatby.jeplatce*/
		jeplatce?: number|null;
		/**DBCOLUMN:BankPlatby.dat_umrti*/
		dat_umrti?: JsonDate|null;
		/**DBCOLUMN:BankPlatby.nazev_predpisu*/
		nazev_predpisu?: string|null;
		/**DBCOLUMN:BankPlatby.typ_predpisu*/
		typ_predpisu?: number|null;
		/**DBCOLUMN:BankPlatby.pripad_popis*/
		pripad_popis?: string|null;
		/**DBCOLUMN:BankPlatby.wflspid_nazev*/
		wflspid_nazev?: string|null;
		/**
		*     seznam náhradních vs
		*     
		*/
		nahradni_vs?: string|null;
		/**
		*     Typ_esu GDPR
		*     
		*/
		typ_esu?: number|null;
	}
	const enum GPokBankPlatbyDtoNames { ixs_esu = "ixs_esu", vs = "vs", ixp = "ixp", radek_uhr = "radek_uhr", c = "c", c_par = "c_par", c_mena = "c_mena", c_par_mena = "c_par_mena", ks = "ks", ss = "ss", ac = "ac", ico = "ico", rc = "rc", nazev = "nazev", esu_txt = "esu_txt", dat_nar = "dat_nar", dat_spl = "dat_spl", dat_vzniku = "dat_vzniku", bu_vl = "bu_vl", sk_vl = "sk_vl", typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", zp = "zp", zp_txt = "zp_txt", mena = "mena", mena_zkr = "mena_zkr", phl_nazev = "phl_nazev", saldo = "saldo", jeplatce = "jeplatce", dat_umrti = "dat_umrti", nazev_predpisu = "nazev_predpisu", typ_predpisu = "typ_predpisu", pripad_popis = "pripad_popis", wflspid_nazev = "wflspid_nazev", nahradni_vs = "nahradni_vs", typ_esu = "typ_esu",}
	const enum GPokBankPlatbyDtoFragments { ixs_esu = "*", vs = "*", ixp = "*", radek_uhr = "*", c = "*", c_par = "*", c_mena = "*", c_par_mena = "*", ks = "*", ss = "*", ac = "*", ico = "*", rc = "*", nazev = "*", esu_txt = "*", dat_nar = "*", dat_spl = "*", dat_vzniku = "*", bu_vl = "*", sk_vl = "*", typ_ag = "*", typ_ag_txt = "*", zp = "*", zp_txt = "*", mena = "*", mena_zkr = "*", phl_nazev = "*", saldo = "*", jeplatce = "*", dat_umrti = "*", nazev_predpisu = "*", typ_predpisu = "*", pripad_popis = "*", wflspid_nazev = "*", nahradni_vs = "*", typ_esu = "*",}
	const enum GPokBankPlatbyDtoTypes { ixs_esu = "string", vs = "string", ixp = "string", radek_uhr = "number", c = "JsonDecimal", c_par = "JsonDecimal", c_mena = "JsonDecimal", c_par_mena = "JsonDecimal", ks = "string", ss = "string", ac = "string", ico = "string", rc = "string", nazev = "string", esu_txt = "string", dat_nar = "JsonDate", dat_spl = "JsonDate", dat_vzniku = "JsonDate", bu_vl = "string", sk_vl = "string", typ_ag = "number", typ_ag_txt = "string", zp = "number", zp_txt = "string", mena = "number", mena_zkr = "string", phl_nazev = "string", saldo = "JsonDecimal", jeplatce = "number", dat_umrti = "JsonDate", nazev_predpisu = "string", typ_predpisu = "number", pripad_popis = "string", wflspid_nazev = "string", nahradni_vs = "string", typ_esu = "number",}
	const enum GPokBankPlatbyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokCeninyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Ceniny DTO*/
	interface GPokCeninyDto {
		/**Hodnota*/
		mjm?: JsonDecimal|null;
		/**Množství*/
		m?: JsonDecimal|null;
		/**Celkem*/
		celkem?: JsonDecimal|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Aktivita txt*/
		aktivita_txt?: string|null;
		/**Změnu provedl*/
		ixs_fun_nazev?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**PID knihy*/
		ixp_den?: string|null;
		/**Kontrola na existenci hodnoty ceniny*/
		KontrolaExistujiciCeniny?: boolean|null;
		/**Zda přepsat existujícíc hodnotu cenin nebo*/
		PrepsatExistujiciCeniny?: boolean|null;
	}
	const enum GPokCeninyDtoNames { mjm = "mjm", m = "m", celkem = "celkem", aktivita = "aktivita", aktivita_txt = "aktivita_txt", ixs_fun_nazev = "ixs_fun_nazev", dat_zmena = "dat_zmena", ixp_den = "ixp_den", KontrolaExistujiciCeniny = "KontrolaExistujiciCeniny", PrepsatExistujiciCeniny = "PrepsatExistujiciCeniny",}
	const enum GPokCeninyDtoFragments { mjm = "*", m = "*", celkem = "*", aktivita = "*", aktivita_txt = "*", ixs_fun_nazev = "*", dat_zmena = "*", ixp_den = "*", KontrolaExistujiciCeniny = "*", PrepsatExistujiciCeniny = "*",}
	const enum GPokCeninyDtoTypes { mjm = "JsonDecimal", m = "JsonDecimal", celkem = "JsonDecimal", aktivita = "number", aktivita_txt = "string", ixs_fun_nazev = "string", dat_zmena = "JsonDate", ixp_den = "string", KontrolaExistujiciCeniny = "boolean", PrepsatExistujiciCeniny = "boolean",}
	const enum GPokCeninyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokDokladDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**
	*     DTO - Pokladní doklad
	*     
	*/
	interface GPokDokladDto {
		/**Autogenerated.*/
		ixp: string;
		/**Autogenerated.*/
		lic?: string|null;
		/**Autogenerated.*/
		druh_dok?: Gordic.Hpl.Interface.DruhDokladu|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		ucs?: string|null;
		/**Autogenerated.*/
		nks?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		arw?: number|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		ixp_den?: string|null;
		/**Autogenerated.*/
		ac?: string|null;
		/**Autogenerated.*/
		dat_vyst?: JsonDate|null;
		/**Autogenerated.*/
		dat_zdan?: JsonDate|null;
		/**Autogenerated.*/
		mena?: number|null;
		/**Zkratka meny.*/
		mena_zkr?: string|null;
		/**Autogenerated.*/
		s_zau?: number|null;
		/**Autogenerated.*/
		s_tis?: number|null;
		/**Autogenerated.*/
		s_sto?: Gordic.Hpl.Interface.StavStorna|null;
		/**
		*     Stav storna text
		*     
		*/
		s_sto_txt?: string|null;
		/**Autogenerated.*/
		ktg_typ?: Gordic.Hpl.Interface.KategorieTypu|null;
		/**Autogenerated.*/
		ixs_typ?: string|null;
		/**Autogenerated.*/
		eko_akt?: number|null;
		/**Autogenerated.*/
		dat_evid?: JsonDate|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		ixs_fun?: string|null;
		/**Autogenerated.*/
		ixs_fun_akt?: string|null;
		/**Kompetennt*/
		ixs_fun_vyriz?: string|null;
		/**Kompetennt.*/
		ixs_fun_vyriz_txt?: string|null;
		/**Autogenerated.*/
		ixs_su?: string|null;
		/**Autogenerated.*/
		s_fyz?: number|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		s_prij?: number|null;
		/**Autogenerated.*/
		rok_dph?: number|null;
		/**Autogenerated.*/
		mesic_dph?: number|null;
		/**Autogenerated.*/
		typ_pok?: number|null;
		/**Autogenerated.*/
		up_stav?: Gordic.Hpl.Interface.StavDokladu|null;
		/**Autogenerated.*/
		ktg_dok?: number|null;
		/**Autogenerated.*/
		priz_view?: number|null;
		/**Autogenerated.*/
		ac_ag?: string|null;
		/**Autogenerated.*/
		zpus_platby?: number|null;
		/**Autogenerated.*/
		rezervovano?: number|null;
		/**Autogenerated.*/
		cis_real?: string|null;
		/**Autogenerated.*/
		c_celkem_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_celkem_m_znamenko?: JsonDecimal|null;
		/**Autogenerated.*/
		c_celkem?: JsonDecimal|null;
		/**Autogenerated.*/
		c_celkem_znamenko?: JsonDecimal|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		esu_nazev?: string|null;
		esu_dic?: string|null;
		esu_ico?: string|null;
		esu_ob_jmeno?: string|null;
		/**
		*     Rodné číslo pro zástupky
		*     
		*/
		esu_rc?: string|null;
		/**
		*     Typ_esu - GDPR
		*     
		*/
		typ_esu?: number|null;
		/**Autogenerated.*/
		kontace?: string|null;
		/**Autogenerated.*/
		sloupecvs?: string|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		stav_dist?: number|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		s_odes?: number|null;
		/**Autogenerated.*/
		jearchivni?: number|null;
		/**Autogenerated.*/
		ixs_vazebniho?: string|null;
		/**Autogenerated.*/
		fuc_s_zau?: number|null;
		/**Autogenerated.*/
		dat_schvaleni?: JsonDate|null;
		/**Autogenerated.*/
		zdroj_faze?: string|null;
		/**Autogenerated.*/
		zp_prac?: number|null;
		/**Autogenerated.*/
		typ_zal?: number|null;
		/**Autogenerated.*/
		ixs_osz?: string|null;
		/**Autogenerated.*/
		up_stav_poz?: number|null;
		/**Autogenerated.*/
		dat_vyporadani?: JsonDate|null;
		/**Autogenerated.*/
		referent_nazev?: string|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**el. přílohy - počet příloh*/
		el_prilohy_pocet?: number|null;
		/**Autogenerated.*/
		ixs_fun_nazev_rf?: string|null;
		/**stav finanční kontroly*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav účetní kontroly*/
		stav_uk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**Autogenerated.*/
		s_schval?: number|null;
		/**Autogenerated.*/
		zaloha?: string|null;
		/**Autogenerated.*/
		kurz_doklad?: JsonDecimal|null;
		/**Autogenerated.*/
		kurz_listek?: JsonDecimal|null;
		/**Autogenerated.*/
		nazev_sablony?: string|null;
		/**Autogenerated.*/
		up_stav_poz_txt?: string|null;
		/**Autogenerated.*/
		ec_dd?: string|null;
		/**Autogenerated.*/
		int_dok?: number|null;
		/**Autogenerated.*/
		dat_evid_time?: JsonDate|null;
		/**Autogenerated.*/
		eet_stav?: number|null;
		/**
		*     Up_stav_txt
		*     
		*/
		up_stav_txt?: string|null;
		/**
		*     fuc_s_zau_txt
		*     
		*/
		fuc_s_zau_txt?: string|null;
		/**
		*     zpus_platby_txt
		*     
		*/
		zpus_platby_txt?: string|null;
		/**
		*     typ_pok_txt
		*     
		*/
		typ_pok_txt?: string|null;
		/**
		*     ktg_dok_txt
		*     
		*/
		ktg_dok_txt?: string|null;
		/**
		*     druh_dok_txt
		*     
		*/
		druh_dok_txt?: string|null;
		/**
		*     ixp_den_txt
		*     
		*/
		ixp_den_txt?: string|null;
		/**
		*     s_tis_txt
		*     
		*/
		s_tis_txt?: string|null;
		/**
		*     eet stav txt
		*     
		*/
		eet_stav_txt?: string|null;
		/**
		*     smlouv/objednavka
		*     
		*/
		ps_sml?: string|null;
		/**
		*     smlouv/objednavka
		*     
		*/
		ps_sml_ac?: string|null;
		/**
		*     Externí ID
		*     
		*/
		id_ext?: string|null;
		/**
		*     Prijmový/Vydajový - txt
		*     
		*/
		ktg_typ_txt?: string|null;
		/**
		*     Složitel
		*     
		*/
		slozitel?: string|null;
		/**
		*     Hromadné akce - chybové hlášení
		*     
		*/
		duct_txt_err?: string|null;
		/**
		*     Hromadné akce - příznak zaškrtnutí
		*     
		*/
		duct_check?: boolean|null;
		/**sloupec duct_uncheck (fucduct.uncheck)*/
		duct_kind?: number|null;
		/**
		*     Pokladní položky pokladního dokladu
		*     
		*/
		PokladniPolozky?: Gordic.Hpl.Interface.GPokPolozkyDto[]|null;
		/**
		*     Dokument
		*     
		*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**WFLSPID.uzo*/
		uzo?: string|null;
		/**
		*     vlastnictví dokladu
		*     
		*/
		vlastnictvi?: number|null;
		/**
		*     Vysledna Ikona po zavolani funkce IkonaTechnickeVlastnosti
		*     
		*/
		vlastnictvi_redistribuce_ico?: Gordic.Wfl.Interface.VlastnictviRedistribuceIco|null;
		ixp_spis?: string|null;
		ixp_top?: string|null;
		ixp_soucast?: string|null;
		/**
		*     Permissions
		*     
		*/
		Permissions?: Gordic.Hpl.Interface.LK.Isl.GPokDokladPermissions|null;
		/**
		*     Vybrany radek
		*     
		*/
		wiz_check?: boolean|null;
		/**
		*     Text chyby
		*     
		*/
		wiz_txt_err?: string|null;
		/**
		*     Vysledek akce
		*     
		*/
		wiz_kind?: number|null;
		/**
		*     Wizard - datum
		*     
		*/
		wiz_datum?: JsonDate|null;
		/**
		*     Wizard - číslo
		*     
		*/
		wiz_number?: JsonDecimal|null;
	}
	const enum GPokDokladDtoNames { ixp = "ixp", lic = "lic", druh_dok = "druh_dok", ixs_esu = "ixs_esu", ico = "ico", ucs = "ucs", nks = "nks", aktivita = "aktivita", arw = "arw", popis = "popis", ixp_den = "ixp_den", ac = "ac", dat_vyst = "dat_vyst", dat_zdan = "dat_zdan", mena = "mena", mena_zkr = "mena_zkr", s_zau = "s_zau", s_tis = "s_tis", s_sto = "s_sto", s_sto_txt = "s_sto_txt", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun", ixs_fun_akt = "ixs_fun_akt", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_su = "ixs_su", s_fyz = "s_fyz", s_ele = "s_ele", s_sgn = "s_sgn", s_prij = "s_prij", rok_dph = "rok_dph", mesic_dph = "mesic_dph", typ_pok = "typ_pok", up_stav = "up_stav", ktg_dok = "ktg_dok", priz_view = "priz_view", ac_ag = "ac_ag", zpus_platby = "zpus_platby", rezervovano = "rezervovano", cis_real = "cis_real", c_celkem_m = "c_celkem_m", c_celkem_m_znamenko = "c_celkem_m_znamenko", c_celkem = "c_celkem", c_celkem_znamenko = "c_celkem_znamenko", esu_txt = "esu_txt", esu_nazev = "esu_nazev", esu_dic = "esu_dic", esu_ico = "esu_ico", esu_ob_jmeno = "esu_ob_jmeno", esu_rc = "esu_rc", typ_esu = "typ_esu", kontace = "kontace", sloupecvs = "sloupecvs", typ_ag = "typ_ag", stav_dist = "stav_dist", priz_spis = "priz_spis", s_odes = "s_odes", jearchivni = "jearchivni", ixs_vazebniho = "ixs_vazebniho", fuc_s_zau = "fuc_s_zau", dat_schvaleni = "dat_schvaleni", zdroj_faze = "zdroj_faze", zp_prac = "zp_prac", typ_zal = "typ_zal", ixs_osz = "ixs_osz", up_stav_poz = "up_stav_poz", dat_vyporadani = "dat_vyporadani", referent_nazev = "referent_nazev", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", ixs_fun_nazev_rf = "ixs_fun_nazev_rf", stav_fk = "stav_fk", stav_uk = "stav_uk", s_schval = "s_schval", zaloha = "zaloha", kurz_doklad = "kurz_doklad", kurz_listek = "kurz_listek", nazev_sablony = "nazev_sablony", up_stav_poz_txt = "up_stav_poz_txt", ec_dd = "ec_dd", int_dok = "int_dok", dat_evid_time = "dat_evid_time", eet_stav = "eet_stav", up_stav_txt = "up_stav_txt", fuc_s_zau_txt = "fuc_s_zau_txt", zpus_platby_txt = "zpus_platby_txt", typ_pok_txt = "typ_pok_txt", ktg_dok_txt = "ktg_dok_txt", druh_dok_txt = "druh_dok_txt", ixp_den_txt = "ixp_den_txt", s_tis_txt = "s_tis_txt", eet_stav_txt = "eet_stav_txt", ps_sml = "ps_sml", ps_sml_ac = "ps_sml_ac", id_ext = "id_ext", ktg_typ_txt = "ktg_typ_txt", slozitel = "slozitel", duct_txt_err = "duct_txt_err", duct_check = "duct_check", duct_kind = "duct_kind", PokladniPolozky = "PokladniPolozky", dokument = "dokument", uzo = "uzo", vlastnictvi = "vlastnictvi", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", Permissions = "Permissions", wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", wiz_datum = "wiz_datum", wiz_number = "wiz_number",}
	const enum GPokDokladDtoFragments { ixp = "POKSPID", lic = "POKSPID", druh_dok = "POKSPID", ixs_esu = "POKSPID", ico = "POKSPID", ucs = "POKSPID", nks = "POKSPID", aktivita = "POKSPID", arw = "POKSPID", popis = "POKSPID", ixp_den = "POKSPID", ac = "POKSPID", dat_vyst = "POKSPID", dat_zdan = "POKSPID", mena = "POKSPID", mena_zkr = "POKSPID", s_zau = "POKSPID", s_tis = "POKSPID", s_sto = "POKSPID", s_sto_txt = "POKSPID", ktg_typ = "POKSPID", ixs_typ = "POKSPID", eko_akt = "POKSPID", dat_evid = "POKSPID", dat_zmena = "POKSPID", zmenu_prov = "POKSPID", ixs_fun = "WFLSPID", ixs_fun_akt = "POKSPID", ixs_fun_vyriz = "POKSPID", ixs_fun_vyriz_txt = "POKSPID", ixs_su = "WFLSPID", s_fyz = "WFLSPID", s_ele = "WFLSPID", s_sgn = "WFLSPID", s_prij = "WFLSPID", rok_dph = "POKSPID", mesic_dph = "POKSPID", typ_pok = "POKSPID", up_stav = "POKSPID", ktg_dok = "POKSPID", priz_view = "POKSPID", ac_ag = "POKSPID", zpus_platby = "POKSPID", rezervovano = "POKSPID", cis_real = "POKSPID", c_celkem_m = "POKSPID", c_celkem_m_znamenko = "ZNAMENKO", c_celkem = "POKSPID", c_celkem_znamenko = "ZNAMENKO", esu_txt = "GINSESU", esu_nazev = "GINSESU", esu_dic = "GINSESU", esu_ico = "GINSESU", esu_ob_jmeno = "GINSESU", esu_rc = "GINSESU", typ_esu = "GINSESU", kontace = "KONTACE", sloupecvs = "*", typ_ag = "WFLSPID", stav_dist = "WFLSPID", priz_spis = "WFLSPID", s_odes = "WFLSPID", jearchivni = "*", ixs_vazebniho = "*", fuc_s_zau = "POKSPID", dat_schvaleni = "POKSPID", zdroj_faze = "POKSPID", zp_prac = "*", typ_zal = "*", ixs_osz = "*", up_stav_poz = "*", dat_vyporadani = "*", referent_nazev = "*", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", ixs_fun_nazev_rf = "WFLSPID", stav_fk = "WFL_FK", stav_uk = "WFL_UK", s_schval = "POKSPID", zaloha = "POKSPID", kurz_doklad = "*", kurz_listek = "*", nazev_sablony = "*", up_stav_poz_txt = "*", ec_dd = "POKSPID", int_dok = "POKSPID", dat_evid_time = "POKSPID", eet_stav = "EET", up_stav_txt = "POKSPID", fuc_s_zau_txt = "POKSPID", zpus_platby_txt = "POKSPID", typ_pok_txt = "POKSPID", ktg_dok_txt = "POKSPID", druh_dok_txt = "POKSPID", ixp_den_txt = "POKSPID", s_tis_txt = "POKSPID", eet_stav_txt = "EET", ps_sml = "POKSPID", ps_sml_ac = "POKSPID", id_ext = "POKSPID", ktg_typ_txt = "POKSPID", slozitel = "POKSPID", duct_txt_err = "*", duct_check = "*", duct_kind = "*", PokladniPolozky = "*", dokument = "*", uzo = "WFLSPID", vlastnictvi = "*", vlastnictvi_redistribuce_ico = "WFLSPID", ixp_spis = "*", ixp_top = "*", ixp_soucast = "*", Permissions = "*", wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", wiz_datum = "*", wiz_number = "*",}
	const enum GPokDokladDtoTypes { ixp = "string", lic = "string", druh_dok = "Gordic.Hpl.Interface.DruhDokladu", ixs_esu = "string", ico = "string", ucs = "string", nks = "string", aktivita = "number", arw = "number", popis = "string", ixp_den = "string", ac = "string", dat_vyst = "JsonDate", dat_zdan = "JsonDate", mena = "number", mena_zkr = "string", s_zau = "number", s_tis = "number", s_sto = "Gordic.Hpl.Interface.StavStorna", s_sto_txt = "string", ktg_typ = "Gordic.Hpl.Interface.KategorieTypu", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun = "string", ixs_fun_akt = "string", ixs_fun_vyriz = "string", ixs_fun_vyriz_txt = "string", ixs_su = "string", s_fyz = "number", s_ele = "number", s_sgn = "number", s_prij = "number", rok_dph = "number", mesic_dph = "number", typ_pok = "number", up_stav = "Gordic.Hpl.Interface.StavDokladu", ktg_dok = "number", priz_view = "number", ac_ag = "string", zpus_platby = "number", rezervovano = "number", cis_real = "string", c_celkem_m = "JsonDecimal", c_celkem_m_znamenko = "JsonDecimal", c_celkem = "JsonDecimal", c_celkem_znamenko = "JsonDecimal", esu_txt = "string", esu_nazev = "string", esu_dic = "string", esu_ico = "string", esu_ob_jmeno = "string", esu_rc = "string", typ_esu = "number", kontace = "string", sloupecvs = "string", typ_ag = "number", stav_dist = "number", priz_spis = "number", s_odes = "number", jearchivni = "number", ixs_vazebniho = "string", fuc_s_zau = "number", dat_schvaleni = "JsonDate", zdroj_faze = "string", zp_prac = "number", typ_zal = "number", ixs_osz = "string", up_stav_poz = "number", dat_vyporadani = "JsonDate", referent_nazev = "string", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", ixs_fun_nazev_rf = "string", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", s_schval = "number", zaloha = "string", kurz_doklad = "JsonDecimal", kurz_listek = "JsonDecimal", nazev_sablony = "string", up_stav_poz_txt = "string", ec_dd = "string", int_dok = "number", dat_evid_time = "JsonDate", eet_stav = "number", up_stav_txt = "string", fuc_s_zau_txt = "string", zpus_platby_txt = "string", typ_pok_txt = "string", ktg_dok_txt = "string", druh_dok_txt = "string", ixp_den_txt = "string", s_tis_txt = "string", eet_stav_txt = "string", ps_sml = "string", ps_sml_ac = "string", id_ext = "string", ktg_typ_txt = "string", slozitel = "string", duct_txt_err = "string", duct_check = "boolean", duct_kind = "number", PokladniPolozky = "Gordic.Hpl.Interface.GPokPolozkyDto[]", dokument = "Gordic.Ssl.Interface.GDokumentDto", uzo = "string", vlastnictvi = "number", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", Permissions = "Gordic.Hpl.Interface.LK.Isl.GPokDokladPermissions", wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", wiz_datum = "JsonDate", wiz_number = "JsonDecimal",}
	const enum GPokDokladDtoTypeLengths { uzo = 1,}
	/**
	*     Druh pokladního dokladu
	*     
	*/
	const enum DruhDokladu {
		/**
		*     Daňový pokladní doklad
		*     
		*/
		danovy=0,
		/**
		*     Nedaňový pokladní doklad
		*     
		*/
		nedanovy=10,
		/**
		*     Zjednodušený daňový doklad
		*     
		*/
		zjednoduseny=20,
	}
	/**Číselník stavu storna dokladu.*/
	const enum StavStorna {
		/**storno (0)*/
		storno=0,
		/**nestornováno (10)*/
		nestornovano=10,
		/**stornovací (20)*/
		stornovaci=20,
	}
	/**
	*     Číselník přijmový/výdajový
	*     
	*/
	const enum KategorieTypu {
		/**
		*     Příjmový
		*     
		*/
		prijmovy=1500,
		/**
		*     Výdajový
		*     
		*/
		vydajovy=1510,
	}
	/**Číselník stavů pokladních dokladů(pokcups) - up_stav*/
	const enum StavDokladu {
		/**neurčeno (0)*/
		neurceno=0,
		/**návrh (10)*/
		navrh=10,
		/**připraveno (15)*/
		pripraveno=15,
		/**evidováno (20)*/
		evidovano=20,
		/**předáno (25)*/
		predano=25,
		/**schváleno (30)*/
		schvaleno=30,
		/**uzavřeno (38)*/
		uzavreno=38,
		/**zaúčtováno (40)*/
		zauctovano=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokdpetDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Řádky šablony pokladních dokladů*/
	interface GPokdpetDto {
		/**DBCOLUMN:pokdpep.ixp*/
		ixs_pit?: string|null;
		/**DBCOLUMN:pokdpep.radek*/
		radek: number;
		/**DBCOLUMN:pokdpep.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:pokdpep.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:pokdpep.ico*/
		ico?: string|null;
		/**DBCOLUMN:pokdpep.nks*/
		nks?: string|null;
		/**DBCOLUMN:pokdpep.dan_typ*/
		dan_typ: number;
		/**dan_typ_txt*/
		dan_typ_txt?: string|null;
		/**DBCOLUMN:pokdpep.c_dan*/
		c_dan: JsonDecimal;
		/**DBCOLUMN:pokdpep.mj*/
		mj?: string|null;
		/**DBCOLUMN:pokdpep.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.mjm*/
		mjm?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.dan_skup*/
		dan_skup?: number|null;
		/**Daňová skupina txt*/
		dan_skup_txt?: string|null;
		/**DBCOLUMN:pokdpep.kod_kon*/
		kod_kon?: string|null;
		/**DBCOLUMN:pokdpep.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:pokdpep.uea*/
		uea?: string|null;
		/**DBCOLUMN:pokdpep.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:pokdpep.uec*/
		uec?: string|null;
		/**DBCOLUMN:pokdpep.ued*/
		ued?: string|null;
		/**DBCOLUMN:pokdpep.uee*/
		uee?: string|null;
		/**DBCOLUMN:pokdpep.uef*/
		uef?: string|null;
		/**DBCOLUMN:pokdpep.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:pokdpep.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:pokdpep.uei*/
		uei?: string|null;
		/**DBCOLUMN:pokdpep.uej*/
		uej?: string|null;
		/**DBCOLUMN:pokdpep.te0*/
		te0?: string|null;
		/**DBCOLUMN:pokdpep.te0*/
		te0_2?: string|null;
		/**DBCOLUMN:pokdpep.te1*/
		te1?: string|null;
		/**DBCOLUMN:pokdpep.te2*/
		te2?: string|null;
		/**DBCOLUMN:pokdpep.te3*/
		te3?: string|null;
		/**DBCOLUMN:pokdpep.te4*/
		te4?: string|null;
		/**DBCOLUMN:pokdpep.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:pokdpep.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:pokdpep.te1_2*/
		te1_2?: string|null;
		/**DBCOLUMN:pokdpep.vs*/
		vs?: string|null;
		/**DBCOLUMN:pokdpep.c_zak*/
		c_zak: JsonDecimal;
		/**DBCOLUMN:pokdpep.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:pokdpep.c_celkem_m*/
		c_celkem_m: JsonDecimal;
		/**DBCOLUMN:pokdpep.c_celkem_m*/
		c_celkem: JsonDecimal;
		/**DBCOLUMN:pokdpep.ss*/
		ss?: string|null;
		/**DBCOLUMN:pokdpep.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:pokdpep.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:pokdpep.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:pokdpep.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:pokdpep.c_zak_m*/
		c_zak_m: JsonDecimal;
		/**DBCOLUMN:pokdpep.c_dan_m*/
		c_dan_m: JsonDecimal;
		/**DBCOLUMN:pokdpep.zp_vyp_dane*/
		zp_vyp_dane?: string|null;
		/**DBCOLUMN:pokdpep.vklad_castka*/
		vklad_castka?: string|null;
		/**DBCOLUMN:pokdpep.ixp_buc*/
		ixp_buc?: string|null;
		/**DBCOLUMN:pokdpep.radek_uhr_buc*/
		radek_uhr_buc?: number|null;
		/**DBCOLUMN:pokdpep.ext_id*/
		ext_id?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
		/**Daňové procento*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.mjm / 525XXX003x014*/
		mjm_czk?: JsonDecimal|null;
		/**Název kontace*/
		pokskon_nazev?: string|null;
	}
	const enum GPokdpetDtoNames { ixs_pit = "ixs_pit", radek = "radek", aktivita = "aktivita", nazev = "nazev", ico = "ico", nks = "nks", dan_typ = "dan_typ", dan_typ_txt = "dan_typ_txt", c_dan = "c_dan", mj = "mj", m = "m", mjm = "mjm", dan_skup = "dan_skup", dan_skup_txt = "dan_skup_txt", kod_kon = "kod_kon", ixs_kon = "ixs_kon", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te0_2 = "te0_2", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te1_2 = "te1_2", vs = "vs", c_zak = "c_zak", poznamka = "poznamka", c_celkem_m = "c_celkem_m", c_celkem = "c_celkem", ss = "ss", inv_cis = "inv_cis", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", c_zak_m = "c_zak_m", c_dan_m = "c_dan_m", zp_vyp_dane = "zp_vyp_dane", vklad_castka = "vklad_castka", ixp_buc = "ixp_buc", radek_uhr_buc = "radek_uhr_buc", ext_id = "ext_id", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", dan_proc = "dan_proc", kurz = "kurz", mjm_czk = "mjm_czk", pokskon_nazev = "pokskon_nazev",}
	const enum GPokdpetDtoFragments { ixs_pit = "POKDPET", radek = "POKDPET", aktivita = "POKDPET", nazev = "POKDPET", ico = "POKDPET", nks = "POKDPET", dan_typ = "POKDPET", dan_typ_txt = "POKDPET", c_dan = "POKDPET", mj = "POKDPET", m = "POKDPET", mjm = "POKDPET", dan_skup = "POKDPET", dan_skup_txt = "POKDPET", kod_kon = "POKDPET", ixs_kon = "POKDPET", uea = "POKDPET", ueb = "POKDPET", uec = "POKDPET", ued = "POKDPET", uee = "POKDPET", uef = "POKDPET", ueg = "POKDPET", ueh = "POKDPET", uei = "POKDPET", uej = "POKDPET", te0 = "POKDPET", te0_2 = "POKDPET", te1 = "POKDPET", te2 = "POKDPET", te3 = "POKDPET", te4 = "POKDPET", dat_zmena = "POKDPET", zmenu_prov = "POKDPET", te1_2 = "POKDPET", vs = "POKDPET", c_zak = "POKDPET", poznamka = "POKDPET", c_celkem_m = "POKDPET", c_celkem = "POKDPET", ss = "POKDPET", inv_cis = "POKDPET", ixp_sml = "POKDPET", rok_sml = "POKDPET", cislo_sml = "POKDPET", c_zak_m = "POKDPET", c_dan_m = "POKDPET", zp_vyp_dane = "POKDPET", vklad_castka = "POKDPET", ixp_buc = "POKDPET", radek_uhr_buc = "POKDPET", ext_id = "POKDPET", uek = "POKDPET", uel = "POKDPET", uem = "POKDPET", uen = "POKDPET", te5 = "POKDPET", te6 = "POKDPET", te7 = "POKDPET", te8 = "POKDPET", te9 = "POKDPET", dan_proc = "POKDPET", kurz = "POKDPET", mjm_czk = "POKDPET", pokskon_nazev = "POKDPET",}
	const enum GPokdpetDtoTypes { ixs_pit = "string", radek = "number", aktivita = "number", nazev = "string", ico = "string", nks = "string", dan_typ = "number", dan_typ_txt = "string", c_dan = "JsonDecimal", mj = "string", m = "JsonDecimal", mjm = "JsonDecimal", dan_skup = "number", dan_skup_txt = "string", kod_kon = "string", ixs_kon = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te0_2 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", te1_2 = "string", vs = "string", c_zak = "JsonDecimal", poznamka = "string", c_celkem_m = "JsonDecimal", c_celkem = "JsonDecimal", ss = "string", inv_cis = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", c_zak_m = "JsonDecimal", c_dan_m = "JsonDecimal", zp_vyp_dane = "string", vklad_castka = "string", ixp_buc = "string", radek_uhr_buc = "number", ext_id = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", dan_proc = "JsonDecimal", kurz = "JsonDecimal", mjm_czk = "JsonDecimal", pokskon_nazev = "string",}
	const enum GPokdpetDtoTypeLengths { ixs_pit = 12, nazev = 254, ico = 10, nks = 12, mj = 5, kod_kon = 30, ixs_kon = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te0_2 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, zmenu_prov = 12, te1_2 = 16, vs = 12, poznamka = 254, ss = 12, inv_cis = 12, ixp_sml = 12, zp_vyp_dane = 1, vklad_castka = 1, ixp_buc = 12, ext_id = 254, pokskon_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokEnabledDetailActionDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	interface GPokEnabledDetailActionDto {
		/**Test zda je doklad Editovatelný*/
		EditovatelnyDoklad: boolean;
		/**Tool tip zda je doklad editovatelný*/
		EditovatelnyDokladToolTip: string;
		/**Test zda je hlavička dokladu Editovatelná*/
		EditovatelnaHlavickaDokladu: boolean;
		/**Tool tip zda je hlavička odkladu editovatelná*/
		EditovatelnaHlavickaDokladuToolTip: string;
		/**Je doklad navázán na vyúčtování zálohy*/
		ControlVyuctovanimZalohy: boolean;
		/**Control kategorie dokladu visible*/
		ControlKategorieDokladuVisible: boolean;
		/**Control způsob úhrady visible*/
		ControlZpuUhradyVisible: boolean;
		/**Control datum vystavení - datum evidence*/
		ControlDatumVystaveno: boolean;
		/**Příznak plátce DPH*/
		EkoParamsDphPlatce: boolean;
	}
	const enum GPokEnabledDetailActionDtoNames { EditovatelnyDoklad = "EditovatelnyDoklad", EditovatelnyDokladToolTip = "EditovatelnyDokladToolTip", EditovatelnaHlavickaDokladu = "EditovatelnaHlavickaDokladu", EditovatelnaHlavickaDokladuToolTip = "EditovatelnaHlavickaDokladuToolTip", ControlVyuctovanimZalohy = "ControlVyuctovanimZalohy", ControlKategorieDokladuVisible = "ControlKategorieDokladuVisible", ControlZpuUhradyVisible = "ControlZpuUhradyVisible", ControlDatumVystaveno = "ControlDatumVystaveno", EkoParamsDphPlatce = "EkoParamsDphPlatce",}
	const enum GPokEnabledDetailActionDtoFragments { EditovatelnyDoklad = "*", EditovatelnyDokladToolTip = "*", EditovatelnaHlavickaDokladu = "*", EditovatelnaHlavickaDokladuToolTip = "*", ControlVyuctovanimZalohy = "*", ControlKategorieDokladuVisible = "*", ControlZpuUhradyVisible = "*", ControlDatumVystaveno = "*", EkoParamsDphPlatce = "*",}
	const enum GPokEnabledDetailActionDtoTypes { EditovatelnyDoklad = "boolean", EditovatelnyDokladToolTip = "string", EditovatelnaHlavickaDokladu = "boolean", EditovatelnaHlavickaDokladuToolTip = "string", ControlVyuctovanimZalohy = "boolean", ControlKategorieDokladuVisible = "boolean", ControlZpuUhradyVisible = "boolean", ControlDatumVystaveno = "boolean", EkoParamsDphPlatce = "boolean",}
	const enum GPokEnabledDetailActionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokHistPocStavuDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Histoire počítečních stavů DTO*/
	interface GPokHistPocStavuDto {
		/**Autogenerated.*/
		ixp_den?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		c_pocatek?: JsonDecimal|null;
		/**Autogenerated.*/
		c_pocatek_m?: JsonDecimal|null;
		/**Autogenerated.*/
		duvod?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Název referenta*/
		nazev_rf?: string|null;
	}
	const enum GPokHistPocStavuDtoNames { ixp_den = "ixp_den", por_cislo = "por_cislo", c_pocatek = "c_pocatek", c_pocatek_m = "c_pocatek_m", duvod = "duvod", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf",}
	const enum GPokHistPocStavuDtoFragments { ixp_den = "*", por_cislo = "*", c_pocatek = "*", c_pocatek_m = "*", duvod = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*",}
	const enum GPokHistPocStavuDtoTypes { ixp_den = "string", por_cislo = "number", c_pocatek = "JsonDecimal", c_pocatek_m = "JsonDecimal", duvod = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string",}
	const enum GPokHistPocStavuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokHistUzaverekDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Historie uzávěrek DTO*/
	interface GPokHistUzaverekDto {
		/**DBTABLE:HistUzav	DBCOLUMN:HistUzav.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:HistUzav.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:HistUzav.c_h_zustatek_m*/
		c_h_zustatek_m?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_h_vydej_m*/
		c_h_vydej_m?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_h_vydej*/
		c_h_vydej?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_h_prijem_m*/
		c_h_prijem_m?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_h_prijem*/
		c_h_prijem?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_h_zustatek*/
		c_h_zustatek?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_b_zustatek_m*/
		c_b_zustatek_m?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_b_vydej_m*/
		c_b_vydej_m?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_b_vydej*/
		c_b_vydej?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_b_prijem_m*/
		c_b_prijem_m?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_b_prijem*/
		c_b_prijem?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.c_b_zustatek*/
		c_b_zustatek?: JsonDecimal|null;
		/**DBCOLUMN:HistUzav.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:HistUzav.dat_uzaverka*/
		dat_uzaverka?: JsonDate|null;
		/**DBCOLUMN:HistUzav.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:HistUzav.typ_uz*/
		typ_uz?: number|null;
		/**Text typu závěrky*/
		typ_uz_txt?: string|null;
		/**zmenu porv txt*/
		nazev_rf?: string|null;
	}
	const enum GPokHistUzaverekDtoNames { ixp_den = "ixp_den", por_cislo = "por_cislo", c_h_zustatek_m = "c_h_zustatek_m", c_h_vydej_m = "c_h_vydej_m", c_h_vydej = "c_h_vydej", c_h_prijem_m = "c_h_prijem_m", c_h_prijem = "c_h_prijem", c_h_zustatek = "c_h_zustatek", c_b_zustatek_m = "c_b_zustatek_m", c_b_vydej_m = "c_b_vydej_m", c_b_vydej = "c_b_vydej", c_b_prijem_m = "c_b_prijem_m", c_b_prijem = "c_b_prijem", c_b_zustatek = "c_b_zustatek", zmenu_prov = "zmenu_prov", dat_uzaverka = "dat_uzaverka", dat_zmena = "dat_zmena", typ_uz = "typ_uz", typ_uz_txt = "typ_uz_txt", nazev_rf = "nazev_rf",}
	const enum GPokHistUzaverekDtoFragments { ixp_den = "*", por_cislo = "*", c_h_zustatek_m = "*", c_h_vydej_m = "*", c_h_vydej = "*", c_h_prijem_m = "*", c_h_prijem = "*", c_h_zustatek = "*", c_b_zustatek_m = "*", c_b_vydej_m = "*", c_b_vydej = "*", c_b_prijem_m = "*", c_b_prijem = "*", c_b_zustatek = "*", zmenu_prov = "*", dat_uzaverka = "*", dat_zmena = "*", typ_uz = "*", typ_uz_txt = "*", nazev_rf = "*",}
	const enum GPokHistUzaverekDtoTypes { ixp_den = "string", por_cislo = "number", c_h_zustatek_m = "JsonDecimal", c_h_vydej_m = "JsonDecimal", c_h_vydej = "JsonDecimal", c_h_prijem_m = "JsonDecimal", c_h_prijem = "JsonDecimal", c_h_zustatek = "JsonDecimal", c_b_zustatek_m = "JsonDecimal", c_b_vydej_m = "JsonDecimal", c_b_vydej = "JsonDecimal", c_b_prijem_m = "JsonDecimal", c_b_prijem = "JsonDecimal", c_b_zustatek = "JsonDecimal", zmenu_prov = "string", dat_uzaverka = "JsonDate", dat_zmena = "JsonDate", typ_uz = "number", typ_uz_txt = "string", nazev_rf = "string",}
	const enum GPokHistUzaverekDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokKnihaDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DTO pokladní knihy*/
	interface GPokKnihaDto {
		/**Autogenerated.*/
		ixp_den?: string|null;
		/**Autogenerated.*/
		lic?: string|null;
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
		nazev?: string|null;
		/**Autogenerated.*/
		rok?: number|null;
		/**Autogenerated.*/
		zkratka?: string|null;
		/**Autogenerated.*/
		dat_uz_hl?: JsonDate|null;
		/**Autogenerated.*/
		c_pri_hl_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_vyd_hl_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_zust_hl_m?: JsonDecimal|null;
		/**Autogenerated.*/
		dat_uz_den?: JsonDate|null;
		/**Autogenerated.*/
		c_pri_den_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_vyd_den_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_zust_den_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_pri_hl?: JsonDecimal|null;
		/**Autogenerated.*/
		c_vyd_hl?: JsonDecimal|null;
		/**Autogenerated.*/
		c_zust_hl?: JsonDecimal|null;
		/**Autogenerated.*/
		c_pri_den?: JsonDecimal|null;
		/**Autogenerated.*/
		c_vyd_den?: JsonDecimal|null;
		/**Autogenerated.*/
		c_zust_den?: JsonDecimal|null;
		/**Autogenerated.*/
		kurz?: JsonDecimal|null;
		/**Autogenerated.*/
		mena?: number|null;
		/**Autogenerated.*/
		mena_zkr?: string|null;
		/**Autogenerated.*/
		mena_txt?: string|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		por_cislo_max?: number|null;
		/**Autogenerated.*/
		subrada_max?: number|null;
		/**Autogenerated.*/
		ixs_vpk?: string|null;
		/**Autogenerated.*/
		ueb?: string|null;
		/**Autogenerated.*/
		c_pocatek_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_pocatek?: JsonDecimal|null;
		/**Autogenerated.*/
		c_zustatek_m?: JsonDecimal|null;
		/**Autogenerated.*/
		c_zustatek?: JsonDecimal|null;
		/**Autogenerated.*/
		uex?: string|null;
		/**Autogenerated.*/
		nks_implic?: string|null;
		/**Autogenerated.*/
		ixp_den_buc?: string|null;
		/**Autogenerated.*/
		subrada_duz?: number|null;
		/**Autogenerated.*/
		uus?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		ucs?: string|null;
		/**Autogenerated.*/
		typ_upr_vyd?: string|null;
		/**Autogenerated.*/
		typ_upr_pri?: string|null;
		/**Nazev sady kontací*/
		ixs_vpk_nazev?: string|null;
		/**zustatek k datu na okne GStavKnih*/
		c_zustatek_m_k_datu?: JsonDecimal|null;
		/**zustatek k datu na okne GStavKnih*/
		c_zustatek_k_datu?: JsonDecimal|null;
		/**Doplňkový údaj při editaci údajů o knize*/
		duvod_zmeny_zustatek?: string|null;
		/**STav pokladní knihy*/
		aktivita_txt?: string|null;
		/**Permissions*/
		Permissions?: Gordic.Hpl.Interface.LK.Isl.GPokKnihaPermissions|null;
		/**Počet návrh.*/
		dashboard_pocet_navrh?: number|null;
		/**Počet evidováno.*/
		dashboard_pocet_evidovano?: number|null;
		/**Počet předáno.*/
		dashboard_pocet_predano?: number|null;
		/**Počet scvháleno*/
		dashboard_pocet_schvaleno?: number|null;
		/**Počet zaúčtováno.*/
		dashboard_pocet_zauctovano?: number|null;
	}
	const enum GPokKnihaDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", rok = "rok", zkratka = "zkratka", dat_uz_hl = "dat_uz_hl", c_pri_hl_m = "c_pri_hl_m", c_vyd_hl_m = "c_vyd_hl_m", c_zust_hl_m = "c_zust_hl_m", dat_uz_den = "dat_uz_den", c_pri_den_m = "c_pri_den_m", c_vyd_den_m = "c_vyd_den_m", c_zust_den_m = "c_zust_den_m", c_pri_hl = "c_pri_hl", c_vyd_hl = "c_vyd_hl", c_zust_hl = "c_zust_hl", c_pri_den = "c_pri_den", c_vyd_den = "c_vyd_den", c_zust_den = "c_zust_den", kurz = "kurz", mena = "mena", mena_zkr = "mena_zkr", mena_txt = "mena_txt", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", ixs_vpk = "ixs_vpk", ueb = "ueb", c_pocatek_m = "c_pocatek_m", c_pocatek = "c_pocatek", c_zustatek_m = "c_zustatek_m", c_zustatek = "c_zustatek", uex = "uex", nks_implic = "nks_implic", ixp_den_buc = "ixp_den_buc", subrada_duz = "subrada_duz", uus = "uus", dat_zmena = "dat_zmena", ico = "ico", ucs = "ucs", typ_upr_vyd = "typ_upr_vyd", typ_upr_pri = "typ_upr_pri", ixs_vpk_nazev = "ixs_vpk_nazev", c_zustatek_m_k_datu = "c_zustatek_m_k_datu", c_zustatek_k_datu = "c_zustatek_k_datu", duvod_zmeny_zustatek = "duvod_zmeny_zustatek", aktivita_txt = "aktivita_txt", Permissions = "Permissions", dashboard_pocet_navrh = "dashboard_pocet_navrh", dashboard_pocet_evidovano = "dashboard_pocet_evidovano", dashboard_pocet_predano = "dashboard_pocet_predano", dashboard_pocet_schvaleno = "dashboard_pocet_schvaleno", dashboard_pocet_zauctovano = "dashboard_pocet_zauctovano",}
	const enum GPokKnihaDtoFragments { ixp_den = "POKSDEN", lic = "POKSDEN", aktivita = "POKSDEN", arw = "POKSDEN", poznamka = "POKSDEN", dat_od = "POKSDEN", dat_do = "POKSDEN", nazev = "POKSDEN", rok = "POKSDEN", zkratka = "POKSDEN", dat_uz_hl = "POKSDEN", c_pri_hl_m = "POKSDEN", c_vyd_hl_m = "POKSDEN", c_zust_hl_m = "POKSDEN", dat_uz_den = "POKSDEN", c_pri_den_m = "POKSDEN", c_vyd_den_m = "POKSDEN", c_zust_den_m = "POKSDEN", c_pri_hl = "POKSDEN", c_vyd_hl = "POKSDEN", c_zust_hl = "POKSDEN", c_pri_den = "POKSDEN", c_vyd_den = "POKSDEN", c_zust_den = "POKSDEN", kurz = "POKSDEN", mena = "POKSDEN", mena_zkr = "POKSDEN", mena_txt = "POKSDEN", zmenu_prov = "POKSDEN", por_cislo_max = "POKSDEN", subrada_max = "POKSDEN", ixs_vpk = "POKSDEN", ueb = "POKSDEN", c_pocatek_m = "POKSDEN", c_pocatek = "POKSDEN", c_zustatek_m = "POKSDEN", c_zustatek = "POKSDEN", uex = "POKSDEN", nks_implic = "POKSDEN", ixp_den_buc = "POKSDEN", subrada_duz = "POKSDEN", uus = "POKSDEN", dat_zmena = "POKSDEN", ico = "POKSDEN", ucs = "POKSDEN", typ_upr_vyd = "POKSDEN", typ_upr_pri = "POKSDEN", ixs_vpk_nazev = "*", c_zustatek_m_k_datu = "*", c_zustatek_k_datu = "*", duvod_zmeny_zustatek = "*", aktivita_txt = "*", Permissions = "*", dashboard_pocet_navrh = "DASHBOARD", dashboard_pocet_evidovano = "DASHBOARD", dashboard_pocet_predano = "DASHBOARD", dashboard_pocet_schvaleno = "DASHBOARD", dashboard_pocet_zauctovano = "DASHBOARD",}
	const enum GPokKnihaDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", rok = "number", zkratka = "string", dat_uz_hl = "JsonDate", c_pri_hl_m = "JsonDecimal", c_vyd_hl_m = "JsonDecimal", c_zust_hl_m = "JsonDecimal", dat_uz_den = "JsonDate", c_pri_den_m = "JsonDecimal", c_vyd_den_m = "JsonDecimal", c_zust_den_m = "JsonDecimal", c_pri_hl = "JsonDecimal", c_vyd_hl = "JsonDecimal", c_zust_hl = "JsonDecimal", c_pri_den = "JsonDecimal", c_vyd_den = "JsonDecimal", c_zust_den = "JsonDecimal", kurz = "JsonDecimal", mena = "number", mena_zkr = "string", mena_txt = "string", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", ixs_vpk = "string", ueb = "string", c_pocatek_m = "JsonDecimal", c_pocatek = "JsonDecimal", c_zustatek_m = "JsonDecimal", c_zustatek = "JsonDecimal", uex = "string", nks_implic = "string", ixp_den_buc = "string", subrada_duz = "number", uus = "string", dat_zmena = "JsonDate", ico = "string", ucs = "string", typ_upr_vyd = "string", typ_upr_pri = "string", ixs_vpk_nazev = "string", c_zustatek_m_k_datu = "JsonDecimal", c_zustatek_k_datu = "JsonDecimal", duvod_zmeny_zustatek = "string", aktivita_txt = "string", Permissions = "Gordic.Hpl.Interface.LK.Isl.GPokKnihaPermissions", dashboard_pocet_navrh = "number", dashboard_pocet_evidovano = "number", dashboard_pocet_predano = "number", dashboard_pocet_schvaleno = "number", dashboard_pocet_zauctovano = "number",}
	const enum GPokKnihaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokPlatbyKartouDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Poksplk*/
	interface GPokPlatbyKartouDto {
		/**DBCOLUMN:Poksplk.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Poksplk.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Poksplk.pos_id*/
		pos_id?: string|null;
		/**DBCOLUMN:Poksplk.resp_code*/
		resp_code?: number|null;
		/**DBCOLUMN:Poksplk.batch_id*/
		batch_id?: number|null;
		/**DBCOLUMN:Poksplk.trans_type*/
		trans_type?: number|null;
		/**DBCOLUMN:Poksplk.card_iss_id*/
		card_iss_id?: string|null;
		/**DBCOLUMN:Poksplk.card_no*/
		card_no?: string|null;
		/**DBCOLUMN:Poksplk.sys_trace_no*/
		sys_trace_no?: JsonDecimal|null;
		/**DBCOLUMN:Poksplk.auth_code*/
		auth_code?: string|null;
		/**DBCOLUMN:Poksplk.trans_date*/
		trans_date?: JsonDate|null;
		/**DBCOLUMN:Poksplk.amount*/
		amount?: JsonDecimal|null;
		/**DBCOLUMN:Poksplk.s_par*/
		s_par?: number|null;
		/**DBCOLUMN:Poksplk.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Poksplk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Poksplk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Poksplk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Poksplk.externa_id*/
		externa_id?: string|null;
		/**DBCOLUMN:Poksplk.orig_receipt_num*/
		orig_receipt_num?: JsonDecimal|null;
		/**DBCOLUMN:Poksplk.merchant_id*/
		merchant_id?: string|null;
		/**DBCOLUMN:Poksplk.sign_verif_req*/
		sign_verif_req?: JsonDecimal|null;
		/**DBCOLUMN:Poksplk.vendor_version_id*/
		vendor_version_id?: number|null;
		/**DBCOLUMN:Poksplk.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:Poksplk.ucet*/
		ucet?: string|null;
		/**DBCOLUMN:Poksplk.aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GPokPlatbyKartouDtoNames { ixp = "ixp", por_cislo = "por_cislo", pos_id = "pos_id", resp_code = "resp_code", batch_id = "batch_id", trans_type = "trans_type", card_iss_id = "card_iss_id", card_no = "card_no", sys_trace_no = "sys_trace_no", auth_code = "auth_code", trans_date = "trans_date", amount = "amount", s_par = "s_par", c = "c", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", externa_id = "externa_id", orig_receipt_num = "orig_receipt_num", merchant_id = "merchant_id", sign_verif_req = "sign_verif_req", vendor_version_id = "vendor_version_id", zmenu_prov_txt = "zmenu_prov_txt", ucet = "ucet", aktivita_txt = "aktivita_txt",}
	const enum GPokPlatbyKartouDtoFragments { ixp = "*", por_cislo = "*", pos_id = "*", resp_code = "*", batch_id = "*", trans_type = "*", card_iss_id = "*", card_no = "*", sys_trace_no = "*", auth_code = "*", trans_date = "*", amount = "*", s_par = "*", c = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", externa_id = "*", orig_receipt_num = "*", merchant_id = "*", sign_verif_req = "*", vendor_version_id = "*", zmenu_prov_txt = "*", ucet = "*", aktivita_txt = "*",}
	const enum GPokPlatbyKartouDtoTypes { ixp = "string", por_cislo = "number", pos_id = "string", resp_code = "number", batch_id = "number", trans_type = "number", card_iss_id = "string", card_no = "string", sys_trace_no = "JsonDecimal", auth_code = "string", trans_date = "JsonDate", amount = "JsonDecimal", s_par = "number", c = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", externa_id = "string", orig_receipt_num = "JsonDecimal", merchant_id = "string", sign_verif_req = "JsonDecimal", vendor_version_id = "number", zmenu_prov_txt = "string", ucet = "string", aktivita_txt = "string",}
	const enum GPokPlatbyKartouDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokPolozkyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:pokdpep*/
	interface GPokPolozkyDto {
		/**DBCOLUMN:pokdpep.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:pokdpep.radek*/
		radek: number;
		/**DBCOLUMN:pokdpep.lic*/
		lic?: string|null;
		/**DBCOLUMN:pokdpep.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:pokdpep.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:pokdpep.ico*/
		ico?: string|null;
		/**DBCOLUMN:pokdpep.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:pokdpep.nks*/
		nks?: string|null;
		/**DBCOLUMN:pokdpep.dan_typ*/
		dan_typ: number;
		/**dan_typ_txt*/
		dan_typ_txt?: string|null;
		/**DBCOLUMN:pokdpep.c_dan*/
		c_dan: JsonDecimal;
		/**DBCOLUMN:pokdpep.mj*/
		mj?: string|null;
		/**DBCOLUMN:pokdpep.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.mjm*/
		mjm?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.mjm / 525XXX003x014*/
		mjm_czk?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.dan_skup*/
		dan_skup?: number|null;
		/**Daňová skupina txt*/
		dan_skup_txt?: string|null;
		/**DBCOLUMN:pokdpep.kod_kon*/
		kod_kon?: string|null;
		/**DBCOLUMN:pokdpep.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:pokdpep.dat_zauc*/
		dat_zauc?: JsonDate|null;
		/**DBCOLUMN:pokdpep.uea*/
		uea?: string|null;
		/**DBCOLUMN:pokdpep.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:pokdpep.uec*/
		uec?: string|null;
		/**DBCOLUMN:pokdpep.ued*/
		ued?: string|null;
		/**DBCOLUMN:pokdpep.uee*/
		uee?: string|null;
		/**DBCOLUMN:pokdpep.uef*/
		uef?: string|null;
		/**DBCOLUMN:pokdpep.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:pokdpep.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:pokdpep.uei*/
		uei?: string|null;
		/**DBCOLUMN:pokdpep.uej*/
		uej?: string|null;
		/**DBCOLUMN:pokdpep.te0*/
		te0?: string|null;
		/**DBCOLUMN:pokdpep.te0_2*/
		te0_2?: string|null;
		/**DBCOLUMN:pokdpep.te1*/
		te1?: string|null;
		/**DBCOLUMN:pokdpep.te2*/
		te2?: string|null;
		/**DBCOLUMN:pokdpep.te3*/
		te3?: string|null;
		/**DBCOLUMN:pokdpep.te4*/
		te4?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
		/**DBCOLUMN:pokdpep.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:pokdpep.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:pokdpep.te1_2*/
		te1_2?: string|null;
		/**DBCOLUMN:pokdpep.vs*/
		vs?: string|null;
		/**DBCOLUMN:pokdpep.c_zak*/
		c_zak: JsonDecimal;
		/**DBCOLUMN:pokdpep.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:pokdpep.kurz*/
		kurz: JsonDecimal;
		/**DBCOLUMN:pokdpep.c_celkem_m*/
		c_celkem_m: JsonDecimal;
		/**DBCOLUMN:pokdpep.c_celkem*/
		c_celkem: JsonDecimal;
		/**DBCOLUMN:pokdpep.ss*/
		ss?: string|null;
		/**DBCOLUMN:pokdpep.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:pokdpep.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:pokdpep.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:pokdpep.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:pokdpep.rezerv_sml*/
		rezerv_sml?: number|null;
		/**DBCOLUMN:pokdpep.c_zak_m*/
		c_zak_m: JsonDecimal;
		/**DBCOLUMN:pokdpep.c_dan_m*/
		c_dan_m: JsonDecimal;
		/**DBCOLUMN:pokdpep.zp_vyp_dane*/
		zp_vyp_dane?: string|null;
		/**DBCOLUMN:pokdpep.vklad_castka*/
		vklad_castka?: string|null;
		/**DBCOLUMN:pokdpep.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:pokdpep.radek_upo_rez*/
		radek_upo_rez?: number|null;
		/**DBCOLUMN:pokdpep.ixp_buc*/
		ixp_buc?: string|null;
		/**DBCOLUMN:pokdpep.radek_uhr_buc*/
		radek_uhr_buc?: number|null;
		/**DBCOLUMN:pokdpep.typ_pol_dok*/
		typ_pol_dok?: number|null;
		/**DBCOLUMN:pokdpep.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:pokdpep.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:pokdpep.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:pokdpep.ext_id*/
		ext_id?: string|null;
		/**DBCOLUMN:pokdpep.radek_upo_prec*/
		radek_upo_prec?: number|null;
		/**DBCOLUMN:pokdpep.kurz_prec*/
		kurz_prec?: JsonDecimal|null;
		/**DBCOLUMN:pokdpep.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:pokdpep.ixp_maj*/
		ixp_maj?: string|null;
		/**DBCOLUMN:pokdpep.maj_popis*/
		maj_popis?: string|null;
		/**DBCOLUMN:pokdpep.maj_ser_cislo*/
		maj_ser_cislo?: number|null;
		/**Název kontace*/
		pokskon_nazev?: string|null;
		/**příznak smaž - metoda TK*/
		priz_smaz?: boolean|null;
		/**Stav v gridu (Nový,Szmazaný,Stávající)*/
		stav_grid: Gordic.Hpl.Interface.Enums.StavPolozkyDokladu;
		/**Řádek je načtený z db nebo nově přídán*/
		stav_add_grid: boolean;
		/**Daňové procento*/
		dan_proc: JsonDecimal;
		/**ac_sml from smlspid*/
		ac_sml?: string|null;
		/**ac from smlspid*/
		ac_smlspid?: string|null;
		/**Pomocná proměnná*/
		sml_stav?: number|null;
		/**Vlastnost pro pořizovač*/
		id_parent?: number|null;
		/**Esu očekávané platby - text dotažený z funkce*/
		esu_txt?: string|null;
		/**Esu očekávané platby*/
		ixs_esu?: string|null;
		/**Pro interní použití, nikdy nebude naplněno*/
		ixs_esu_buc1?: string|null;
		/**Pro interní použití, nikdy nebude naplněno*/
		ixs_esu_buc2?: string|null;
		/**Pro interní použití, nikdy nebude naplněno*/
		ixs_esu_buc3?: string|null;
	}
	const enum GPokPolozkyDtoNames { ixp = "ixp", radek = "radek", lic = "lic", aktivita = "aktivita", nazev = "nazev", ico = "ico", ucs = "ucs", nks = "nks", dan_typ = "dan_typ", dan_typ_txt = "dan_typ_txt", c_dan = "c_dan", mj = "mj", m = "m", mjm = "mjm", mjm_czk = "mjm_czk", dan_skup = "dan_skup", dan_skup_txt = "dan_skup_txt", kod_kon = "kod_kon", ixs_kon = "ixs_kon", dat_zauc = "dat_zauc", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te0_2 = "te0_2", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te1_2 = "te1_2", vs = "vs", c_zak = "c_zak", poznamka = "poznamka", kurz = "kurz", c_celkem_m = "c_celkem_m", c_celkem = "c_celkem", ss = "ss", inv_cis = "inv_cis", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", rezerv_sml = "rezerv_sml", c_zak_m = "c_zak_m", c_dan_m = "c_dan_m", zp_vyp_dane = "zp_vyp_dane", vklad_castka = "vklad_castka", radek_upo = "radek_upo", radek_upo_rez = "radek_upo_rez", ixp_buc = "ixp_buc", radek_uhr_buc = "radek_uhr_buc", typ_pol_dok = "typ_pol_dok", cs_nazev = "cs_nazev", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", ext_id = "ext_id", radek_upo_prec = "radek_upo_prec", kurz_prec = "kurz_prec", ixs_maj = "ixs_maj", ixp_maj = "ixp_maj", maj_popis = "maj_popis", maj_ser_cislo = "maj_ser_cislo", pokskon_nazev = "pokskon_nazev", priz_smaz = "priz_smaz", stav_grid = "stav_grid", stav_add_grid = "stav_add_grid", dan_proc = "dan_proc", ac_sml = "ac_sml", ac_smlspid = "ac_smlspid", sml_stav = "sml_stav", id_parent = "id_parent", esu_txt = "esu_txt", ixs_esu = "ixs_esu", ixs_esu_buc1 = "ixs_esu_buc1", ixs_esu_buc2 = "ixs_esu_buc2", ixs_esu_buc3 = "ixs_esu_buc3",}
	const enum GPokPolozkyDtoFragments { ixp = "POKDPEP", radek = "POKDPEP", lic = "POKDPEP", aktivita = "POKDPEP", nazev = "POKDPEP", ico = "POKDPEP", ucs = "POKDPEP", nks = "POKDPEP", dan_typ = "POKDPEP", dan_typ_txt = "*", c_dan = "POKDPEP", mj = "POKDPEP", m = "POKDPEP", mjm = "POKDPEP", mjm_czk = "POKDPEP", dan_skup = "POKDPEP", dan_skup_txt = "POKDPEP", kod_kon = "POKDPEP", ixs_kon = "POKDPEP", dat_zauc = "POKDPEP", uea = "POKDPEP", ueb = "POKDPEP", uec = "POKDPEP", ued = "POKDPEP", uee = "POKDPEP", uef = "POKDPEP", ueg = "POKDPEP", ueh = "POKDPEP", uei = "POKDPEP", uej = "POKDPEP", te0 = "POKDPEP", te0_2 = "POKDPEP", te1 = "POKDPEP", te2 = "POKDPEP", te3 = "POKDPEP", te4 = "POKDPEP", uek = "POKDPEP", uel = "POKDPEP", uem = "POKDPEP", uen = "POKDPEP", te5 = "POKDPEP", te6 = "POKDPEP", te7 = "POKDPEP", te8 = "POKDPEP", te9 = "POKDPEP", dat_zmena = "POKDPEP", zmenu_prov = "POKDPEP", te1_2 = "POKDPEP", vs = "POKDPEP", c_zak = "POKDPEP", poznamka = "POKDPEP", kurz = "POKDPEP", c_celkem_m = "POKDPEP", c_celkem = "POKDPEP", ss = "POKDPEP", inv_cis = "POKDPEP", ixp_sml = "POKDPEP", rok_sml = "POKDPEP", cislo_sml = "POKDPEP", rezerv_sml = "POKDPEP", c_zak_m = "POKDPEP", c_dan_m = "POKDPEP", zp_vyp_dane = "POKDPEP", vklad_castka = "POKDPEP", radek_upo = "POKDPEP", radek_upo_rez = "POKDPEP", ixp_buc = "POKDPEP", radek_uhr_buc = "POKDPEP", typ_pol_dok = "POKDPEP", cs_nazev = "*", id_hdr_ris = "POKDPEP", radek_hdr = "POKDPEP", ext_id = "POKDPEP", radek_upo_prec = "POKDPEP", kurz_prec = "POKDPEP", ixs_maj = "POKDPEP", ixp_maj = "POKDPEP", maj_popis = "POKDPEP", maj_ser_cislo = "POKDPEP", pokskon_nazev = "POKDPEP", priz_smaz = "*", stav_grid = "*", stav_add_grid = "*", dan_proc = "*", ac_sml = "POKDPEP", ac_smlspid = "POKDPEP", sml_stav = "*", id_parent = "*", esu_txt = "*", ixs_esu = "*", ixs_esu_buc1 = "*", ixs_esu_buc2 = "*", ixs_esu_buc3 = "*",}
	const enum GPokPolozkyDtoTypes { ixp = "string", radek = "number", lic = "string", aktivita = "number", nazev = "string", ico = "string", ucs = "string", nks = "string", dan_typ = "number", dan_typ_txt = "string", c_dan = "JsonDecimal", mj = "string", m = "JsonDecimal", mjm = "JsonDecimal", mjm_czk = "JsonDecimal", dan_skup = "number", dan_skup_txt = "string", kod_kon = "string", ixs_kon = "string", dat_zauc = "JsonDate", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te0_2 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", te1_2 = "string", vs = "string", c_zak = "JsonDecimal", poznamka = "string", kurz = "JsonDecimal", c_celkem_m = "JsonDecimal", c_celkem = "JsonDecimal", ss = "string", inv_cis = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", rezerv_sml = "number", c_zak_m = "JsonDecimal", c_dan_m = "JsonDecimal", zp_vyp_dane = "string", vklad_castka = "string", radek_upo = "number", radek_upo_rez = "number", ixp_buc = "string", radek_uhr_buc = "number", typ_pol_dok = "number", cs_nazev = "string", id_hdr_ris = "string", radek_hdr = "number", ext_id = "string", radek_upo_prec = "number", kurz_prec = "JsonDecimal", ixs_maj = "string", ixp_maj = "string", maj_popis = "string", maj_ser_cislo = "number", pokskon_nazev = "string", priz_smaz = "boolean", stav_grid = "Gordic.Hpl.Interface.Enums.StavPolozkyDokladu", stav_add_grid = "boolean", dan_proc = "JsonDecimal", ac_sml = "string", ac_smlspid = "string", sml_stav = "number", id_parent = "number", esu_txt = "string", ixs_esu = "string", ixs_esu_buc1 = "string", ixs_esu_buc2 = "string", ixs_esu_buc3 = "string",}
	const enum GPokPolozkyDtoTypeLengths { ixp = 12, lic = 4, nazev = 254, ico = 10, ucs = 10, nks = 12, mj = 5, kod_kon = 30, ixs_kon = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te0_2 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, te1_2 = 16, vs = 12, poznamka = 254, ss = 12, inv_cis = 50, ixp_sml = 12, zp_vyp_dane = 1, vklad_castka = 1, ixp_buc = 12, cs_nazev = 50, id_hdr_ris = 10, ext_id = 254, ixs_maj = 12, ixp_maj = 12, maj_popis = 12, pokskon_nazev = 254,}
}
declare namespace Gordic.Hpl.Interface.Enums {
	const enum StavPolozkyDokladu {
		Nic=0,
		Pridano=1,
		Smazano=2,
		Editovano=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokPripadyDdpDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:PripadyDdp*/
	interface GPokPripadyDdpDto {
		/**DBCOLUMN:PripadyDdp.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:PripadyDdp.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:PripadyDdp.ddpstpp_nazev*/
		ddpstpp_nazev?: string|null;
		/**DBCOLUMN:PripadyDdp.c_poc_stav*/
		c_poc_stav?: JsonDecimal|null;
		/**DBCOLUMN:PripadyDdp.dat_poc_stav*/
		dat_poc_stav?: JsonDate|null;
		/**DBCOLUMN:PripadyDdp.vs*/
		vs?: string|null;
		/**DBCOLUMN:PripadyDdp.ac*/
		ac?: string|null;
		/**DBCOLUMN:PripadyDdp.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:PripadyDdp.ddpsden_nazev*/
		ddpsden_nazev?: string|null;
		/**DBCOLUMN:PripadyDdp.c_pohl*/
		c_pohl?: JsonDecimal|null;
		/**DBCOLUMN:PripadyDdp.c_platby*/
		c_platby?: JsonDecimal|null;
		/**DBCOLUMN:PripadyDdp.c_saldo*/
		c_saldo?: JsonDecimal|null;
		/**DBCOLUMN:PripadyDdp.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:PripadyDdp.ss*/
		ss?: string|null;
		/**DBCOLUMN:PripadyDdp.c_saldo_ucetni*/
		c_saldo_ucetni?: JsonDecimal|null;
		/**DBCOLUMN:PripadyDdp.c_poc_stav_ucetni*/
		c_poc_stav_ucetni?: JsonDecimal|null;
		/**Esu text*/
		esu_txt?: string|null;
		/**DDp řádek název*/
		ddp_radek_nazev?: string|null;
		/**DDP čtvrť název*/
		ddp_ctvrt_nazev?: string|null;
		/**Datum do*/
		dat_do?: JsonDate|null;
		/**
		*     typ esu GDPR
		*     
		*/
		typ_esu?: number|null;
	}
	const enum GPokPripadyDdpDtoNames { ixp = "ixp", typ_phl = "typ_phl", ddpstpp_nazev = "ddpstpp_nazev", c_poc_stav = "c_poc_stav", dat_poc_stav = "dat_poc_stav", vs = "vs", ac = "ac", ixs_esu = "ixs_esu", ddpsden_nazev = "ddpsden_nazev", c_pohl = "c_pohl", c_platby = "c_platby", c_saldo = "c_saldo", dat_uzav = "dat_uzav", ss = "ss", c_saldo_ucetni = "c_saldo_ucetni", c_poc_stav_ucetni = "c_poc_stav_ucetni", esu_txt = "esu_txt", ddp_radek_nazev = "ddp_radek_nazev", ddp_ctvrt_nazev = "ddp_ctvrt_nazev", dat_do = "dat_do", typ_esu = "typ_esu",}
	const enum GPokPripadyDdpDtoFragments { ixp = "*", typ_phl = "*", ddpstpp_nazev = "*", c_poc_stav = "*", dat_poc_stav = "*", vs = "*", ac = "*", ixs_esu = "*", ddpsden_nazev = "*", c_pohl = "*", c_platby = "*", c_saldo = "*", dat_uzav = "*", ss = "*", c_saldo_ucetni = "*", c_poc_stav_ucetni = "*", esu_txt = "*", ddp_radek_nazev = "*", ddp_ctvrt_nazev = "*", dat_do = "*", typ_esu = "*",}
	const enum GPokPripadyDdpDtoTypes { ixp = "string", typ_phl = "string", ddpstpp_nazev = "string", c_poc_stav = "JsonDecimal", dat_poc_stav = "JsonDate", vs = "string", ac = "string", ixs_esu = "string", ddpsden_nazev = "string", c_pohl = "JsonDecimal", c_platby = "JsonDecimal", c_saldo = "JsonDecimal", dat_uzav = "JsonDate", ss = "string", c_saldo_ucetni = "JsonDecimal", c_poc_stav_ucetni = "JsonDecimal", esu_txt = "string", ddp_radek_nazev = "string", ddp_ctvrt_nazev = "string", dat_do = "JsonDate", typ_esu = "number",}
	const enum GPokPripadyDdpDtoTypeLengths { ss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokskokDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:VyberPredkontace*/
	interface GPokskokDto {
		/**DBCOLUMN:VyberPredkontace.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:VyberPredkontace.ixs_vpk*/
		ixs_vpk?: string|null;
		/**DBCOLUMN:VyberPredkontace.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:VyberPredkontace.radek*/
		radek?: number|null;
		/**DBCOLUMN:VyberPredkontace.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:VyberPredkontace.ginsfun_nazev_rf*/
		ixs_fun_nazev?: string|null;
		/**DBCOLUMN:VyberPredkontace.ginsfun_nazev_rf*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:VyberPredkontace.ginsfun_nazev_rf*/
		ixs_vpk_nazev?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
	}
	const enum GPokskokDtoNames { aktivita = "aktivita", ixs_vpk = "ixs_vpk", ixs_fun = "ixs_fun", radek = "radek", nazev = "nazev", ixs_fun_nazev = "ixs_fun_nazev", zmenu_prov_txt = "zmenu_prov_txt", ixs_vpk_nazev = "ixs_vpk_nazev", dat_zmena = "dat_zmena",}
	const enum GPokskokDtoFragments { aktivita = "POKSKOK", ixs_vpk = "POKSKOK", ixs_fun = "POKSKOK", radek = "POKSKOK", nazev = "POKSKOK", ixs_fun_nazev = "POKSKOK", zmenu_prov_txt = "POKSKOK", ixs_vpk_nazev = "POKSKOK", dat_zmena = "POKSKOK",}
	const enum GPokskokDtoTypes { aktivita = "number", ixs_vpk = "string", ixs_fun = "string", radek = "number", nazev = "string", ixs_fun_nazev = "string", zmenu_prov_txt = "string", ixs_vpk_nazev = "string", dat_zmena = "JsonDate",}
	const enum GPokskokDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokskonDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Pokskon*/
	interface GPokskonDto {
		/**DBCOLUMN:Pokskon.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Pokskon.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Pokskon.kod*/
		kod?: string|null;
		/**DBCOLUMN:Pokskon.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Pokskon.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Pokskon.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Pokskon.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Pokskon.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Pokskon.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Pokskon.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Pokskon.mj*/
		mj?: string|null;
		/**DBCOLUMN:Pokskon.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:Pokskon.mena*/
		mena?: number|null;
		/**DBCOLUMN:Pokskon.typ_kon*/
		typ_kon?: string|null;
		/**DBCOLUMN:Pokskon.ixs_zpz*/
		ixs_zpz?: string|null;
		/**DBCOLUMN:Pokskon.pov_vs*/
		pov_vs?: number|null;
		/**DBCOLUMN:pokcpvs.pov_vs_txt*/
		pov_vs_txt?: string|null;
		/**DBCOLUMN:Pokskon.typ_phl*/
		typ_phl?: string|null;
		/**Název typu pohledávky*/
		typ_phl_txt?: string|null;
		/**DBCOLUMN:Pokskon.ixs_kon_zal*/
		ixs_kon_zal?: string|null;
		/**DBCOLUMN:Pokskon.cmj*/
		cmj?: JsonDecimal|null;
		/**DBCOLUMN:Pokskon.ixs_zpz_bhp*/
		ixs_zpz_bhp?: string|null;
		/**DBCOLUMN:Pokskon.pov_dan*/
		pov_dan?: string|null;
		/**DBCOLUMN:Pokskon.priz_tzh*/
		priz_tzh?: number|null;
		/**DBCOLUMN:Pokskon.tzh_typ*/
		tzh_typ?: number|null;
		/**DBCOLUMN:ekoctzt.tzh_typ_txt*/
		tzh_typ_txt?: string|null;
		/**DBCOLUMN:Pokskon.ixs_typ*/
		ixs_typ?: string|null;
		/**Název ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Pokskon.ktg_typ*/
		ktg_typ?: number|null;
		/**Oblíbené*/
		oblibene?: number|null;
		/**Oblíbené kiha*/
		oblibeneKniha?: number|null;
		/**Typ kontace + kod kontace*/
		kod_kon?: string|null;
		/**Rzozšíření kvůli READERU, není plněno*/
		ixs_vpk?: string|null;
		/**Rozšíření kvůli rekapitulaci položek*/
		ixs_vpk_nazev?: string|null;
		/**Vlastnosti pokladních kontací*/
		Vlastnosti?: Gordic.Hpl.Interface.GPokvvkhDto[]|null;
	}
	const enum GPokskonDtoNames { ixs_kon = "ixs_kon", aktivita = "aktivita", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mj = "mj", dan_typ = "dan_typ", mena = "mena", typ_kon = "typ_kon", ixs_zpz = "ixs_zpz", pov_vs = "pov_vs", pov_vs_txt = "pov_vs_txt", typ_phl = "typ_phl", typ_phl_txt = "typ_phl_txt", ixs_kon_zal = "ixs_kon_zal", cmj = "cmj", ixs_zpz_bhp = "ixs_zpz_bhp", pov_dan = "pov_dan", priz_tzh = "priz_tzh", tzh_typ = "tzh_typ", tzh_typ_txt = "tzh_typ_txt", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", ktg_typ = "ktg_typ", oblibene = "oblibene", oblibeneKniha = "oblibeneKniha", kod_kon = "kod_kon", ixs_vpk = "ixs_vpk", ixs_vpk_nazev = "ixs_vpk_nazev", Vlastnosti = "Vlastnosti",}
	const enum GPokskonDtoFragments { ixs_kon = "*", aktivita = "*", kod = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", mj = "*", dan_typ = "*", mena = "*", typ_kon = "*", ixs_zpz = "*", pov_vs = "*", pov_vs_txt = "*", typ_phl = "*", typ_phl_txt = "*", ixs_kon_zal = "*", cmj = "*", ixs_zpz_bhp = "*", pov_dan = "*", priz_tzh = "*", tzh_typ = "*", tzh_typ_txt = "*", ixs_typ = "*", ixs_typ_txt = "*", ktg_typ = "*", oblibene = "*", oblibeneKniha = "*", kod_kon = "*", ixs_vpk = "*", ixs_vpk_nazev = "*", Vlastnosti = "*",}
	const enum GPokskonDtoTypes { ixs_kon = "string", aktivita = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", mj = "string", dan_typ = "number", mena = "number", typ_kon = "string", ixs_zpz = "string", pov_vs = "number", pov_vs_txt = "string", typ_phl = "string", typ_phl_txt = "string", ixs_kon_zal = "string", cmj = "JsonDecimal", ixs_zpz_bhp = "string", pov_dan = "string", priz_tzh = "number", tzh_typ = "number", tzh_typ_txt = "string", ixs_typ = "string", ixs_typ_txt = "string", ktg_typ = "number", oblibene = "number", oblibeneKniha = "number", kod_kon = "string", ixs_vpk = "string", ixs_vpk_nazev = "string", Vlastnosti = "Gordic.Hpl.Interface.GPokvvkhDto[]",}
	const enum GPokskonDtoTypeLengths { ixs_kon = 12, kod = 30, zkratka = 16, nazev = 50, poznamka = 50, zmenu_prov = 12, mj = 5, typ_kon = 5, ixs_zpz = 12, pov_vs_txt = 50, typ_phl = 4, ixs_kon_zal = 12, ixs_zpz_bhp = 12, pov_dan = 20, tzh_typ_txt = 50, ixs_typ = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokspitDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**
	*     Hlavička šablony pokladních dokladů
	*     
	*/
	interface GPokspitDto {
		ixs_pit?: string|null;
		ixs_fun?: string|null;
		nazev_sablony?: string|null;
		druh_dok?: Gordic.Hpl.Interface.DruhDokladu|null;
		ixs_esu?: string|null;
		typ_esu?: string|null;
		nks?: string|null;
		popis?: string|null;
		ixp_den?: string|null;
		zpus_platby?: number|null;
		ktg_typ?: number|null;
		ixs_typ?: string|null;
		ktg_dok?: number|null;
		c_celkem_m?: JsonDecimal|null;
		aktivita?: number|null;
		zmenu_prov?: string|null;
		dat_zmena?: JsonDate|null;
		ps_sml?: string|null;
		pokdpetDto?: Gordic.Hpl.Interface.GPokdpetDto[]|null;
		ixs_fun_txt?: string|null;
		ktg_typ_txt?: string|null;
		ktg_dok_txt?: string|null;
		druh_dok_txt?: string|null;
		zpus_platby_txt?: string|null;
		ps_sml_ac?: string|null;
		kontace?: string|null;
		esu_txt?: string|null;
		esu_nazev?: string|null;
		ixs_fun_nazev_rf?: string|null;
		vlastni?: boolean|null;
		ico?: string|null;
		/**
		*     Permissions
		*     
		*/
		Permissions?: Gordic.Hpl.Interface.LK.Isl.GPokSablonaPermissions|null;
	}
	const enum GPokspitDtoNames { ixs_pit = "ixs_pit", ixs_fun = "ixs_fun", nazev_sablony = "nazev_sablony", druh_dok = "druh_dok", ixs_esu = "ixs_esu", typ_esu = "typ_esu", nks = "nks", popis = "popis", ixp_den = "ixp_den", zpus_platby = "zpus_platby", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ktg_dok = "ktg_dok", c_celkem_m = "c_celkem_m", aktivita = "aktivita", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ps_sml = "ps_sml", pokdpetDto = "pokdpetDto", ixs_fun_txt = "ixs_fun_txt", ktg_typ_txt = "ktg_typ_txt", ktg_dok_txt = "ktg_dok_txt", druh_dok_txt = "druh_dok_txt", zpus_platby_txt = "zpus_platby_txt", ps_sml_ac = "ps_sml_ac", kontace = "kontace", esu_txt = "esu_txt", esu_nazev = "esu_nazev", ixs_fun_nazev_rf = "ixs_fun_nazev_rf", vlastni = "vlastni", ico = "ico", Permissions = "Permissions",}
	const enum GPokspitDtoFragments { ixs_pit = "POKSPIT", ixs_fun = "POKSPIT", nazev_sablony = "POKSPIT", druh_dok = "POKSPIT", ixs_esu = "POKSPIT", typ_esu = "POKSPIT", nks = "POKSPIT", popis = "POKSPIT", ixp_den = "POKSPIT", zpus_platby = "POKSPIT", ktg_typ = "POKSPIT", ixs_typ = "POKSPIT", ktg_dok = "POKSPIT", c_celkem_m = "POKSPIT", aktivita = "POKSPIT", zmenu_prov = "POKSPIT", dat_zmena = "POKSPIT", ps_sml = "POKSPIT", pokdpetDto = "POKDPET", ixs_fun_txt = "POKSPIT_TXT", ktg_typ_txt = "POKSPIT_TXT", ktg_dok_txt = "POKSPIT_TXT", druh_dok_txt = "POKSPIT_TXT", zpus_platby_txt = "POKSPIT_TXT", ps_sml_ac = "POKSPIT_TXT", kontace = "POKSPIT_TXT", esu_txt = "POKSPIT_TXT", esu_nazev = "POKSPIT_TXT", ixs_fun_nazev_rf = "POKSPIT_TXT", vlastni = "POKSPIT", ico = "POKSPIT", Permissions = "POKDPET",}
	const enum GPokspitDtoTypes { ixs_pit = "string", ixs_fun = "string", nazev_sablony = "string", druh_dok = "Gordic.Hpl.Interface.DruhDokladu", ixs_esu = "string", typ_esu = "string", nks = "string", popis = "string", ixp_den = "string", zpus_platby = "number", ktg_typ = "number", ixs_typ = "string", ktg_dok = "number", c_celkem_m = "JsonDecimal", aktivita = "number", zmenu_prov = "string", dat_zmena = "JsonDate", ps_sml = "string", pokdpetDto = "Gordic.Hpl.Interface.GPokdpetDto[]", ixs_fun_txt = "string", ktg_typ_txt = "string", ktg_dok_txt = "string", druh_dok_txt = "string", zpus_platby_txt = "string", ps_sml_ac = "string", kontace = "string", esu_txt = "string", esu_nazev = "string", ixs_fun_nazev_rf = "string", vlastni = "boolean", ico = "string", Permissions = "Gordic.Hpl.Interface.LK.Isl.GPokSablonaPermissions",}
	const enum GPokspitDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokStavyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Pomocné Dto pro plnění stavů POK*/
	interface GPokStavKnihyDto {
		/**Zůstatek v účentí měně aktualni*/
		c_zustatek_m_akt?: JsonDecimal|null;
		/**Zůstatek v měně aktualni*/
		c_zustatek_akt?: JsonDecimal|null;
		/**Chyb zaokrouhlení aktualni*/
		chyba_zaokrouhleni_akt?: JsonDecimal|null;
		/**Zůstatek v účentí měně k datu*/
		c_zustatek_m_dat?: JsonDecimal|null;
		/**Zůstatek v měně k datu*/
		c_zustatek_dat?: JsonDecimal|null;
		/**Chyb zaokrouhlení k datu*/
		chyba_zaokrouhleni_dat?: JsonDecimal|null;
		/**hotovostní příjem v měně*/
		prijem_h_m?: JsonDecimal|null;
		/**výdej hotovnostní v měně*/
		vydej_h_m?: JsonDecimal|null;
		/**zustatek hotovnostni mena*/
		zustatek_h_m?: JsonDecimal|null;
		/**hotovnostni prijem*/
		prijem_h?: JsonDecimal|null;
		/**hotovostni výdej*/
		vydej_h?: JsonDecimal|null;
		/**hotovostni zustatek*/
		zustatek_h?: JsonDecimal|null;
		/**bezhotovostní příjem v měně*/
		prijem_b_m?: JsonDecimal|null;
		/**výdej nezhotovnostní v měně*/
		vydej_b_m?: JsonDecimal|null;
		/**zustatek bezhotovnostni mena*/
		zustatek_b_m?: JsonDecimal|null;
		/**bezhotovnostni prijem*/
		prijem_b?: JsonDecimal|null;
		/**bezhotovostni výdej*/
		vydej_b?: JsonDecimal|null;
		/**bezhotovostni zustatek*/
		zustatek_b?: JsonDecimal|null;
		/**Chyba zaokrouhlení za období*/
		chyba_zaokrouhleni_obd?: JsonDecimal|null;
		/**příjem v měně evidovaných*/
		prijem_m_evid?: JsonDecimal|null;
		/**výdej  v měně evidovaných*/
		vydej_m_evid?: JsonDecimal|null;
		/**zustatek mena evidovaných*/
		zustatek_m_evid?: JsonDecimal|null;
		/**prijem evidovanych*/
		prijem_evid?: JsonDecimal|null;
		/**vydej hotovostnich*/
		vydej_evid?: JsonDecimal|null;
		/**zustatek evidovanych*/
		zustatek_evid?: JsonDecimal|null;
		/**Měna*/
		mena?: number|null;
		/**Zkratka meny*/
		mena_zkr?: string|null;
	}
	const enum GPokStavKnihyDtoNames { c_zustatek_m_akt = "c_zustatek_m_akt", c_zustatek_akt = "c_zustatek_akt", chyba_zaokrouhleni_akt = "chyba_zaokrouhleni_akt", c_zustatek_m_dat = "c_zustatek_m_dat", c_zustatek_dat = "c_zustatek_dat", chyba_zaokrouhleni_dat = "chyba_zaokrouhleni_dat", prijem_h_m = "prijem_h_m", vydej_h_m = "vydej_h_m", zustatek_h_m = "zustatek_h_m", prijem_h = "prijem_h", vydej_h = "vydej_h", zustatek_h = "zustatek_h", prijem_b_m = "prijem_b_m", vydej_b_m = "vydej_b_m", zustatek_b_m = "zustatek_b_m", prijem_b = "prijem_b", vydej_b = "vydej_b", zustatek_b = "zustatek_b", chyba_zaokrouhleni_obd = "chyba_zaokrouhleni_obd", prijem_m_evid = "prijem_m_evid", vydej_m_evid = "vydej_m_evid", zustatek_m_evid = "zustatek_m_evid", prijem_evid = "prijem_evid", vydej_evid = "vydej_evid", zustatek_evid = "zustatek_evid", mena = "mena", mena_zkr = "mena_zkr",}
	const enum GPokStavKnihyDtoFragments { c_zustatek_m_akt = "*", c_zustatek_akt = "*", chyba_zaokrouhleni_akt = "*", c_zustatek_m_dat = "*", c_zustatek_dat = "*", chyba_zaokrouhleni_dat = "*", prijem_h_m = "*", vydej_h_m = "*", zustatek_h_m = "*", prijem_h = "*", vydej_h = "*", zustatek_h = "*", prijem_b_m = "*", vydej_b_m = "*", zustatek_b_m = "*", prijem_b = "*", vydej_b = "*", zustatek_b = "*", chyba_zaokrouhleni_obd = "*", prijem_m_evid = "*", vydej_m_evid = "*", zustatek_m_evid = "*", prijem_evid = "*", vydej_evid = "*", zustatek_evid = "*", mena = "*", mena_zkr = "*",}
	const enum GPokStavKnihyDtoTypes { c_zustatek_m_akt = "JsonDecimal", c_zustatek_akt = "JsonDecimal", chyba_zaokrouhleni_akt = "JsonDecimal", c_zustatek_m_dat = "JsonDecimal", c_zustatek_dat = "JsonDecimal", chyba_zaokrouhleni_dat = "JsonDecimal", prijem_h_m = "JsonDecimal", vydej_h_m = "JsonDecimal", zustatek_h_m = "JsonDecimal", prijem_h = "JsonDecimal", vydej_h = "JsonDecimal", zustatek_h = "JsonDecimal", prijem_b_m = "JsonDecimal", vydej_b_m = "JsonDecimal", zustatek_b_m = "JsonDecimal", prijem_b = "JsonDecimal", vydej_b = "JsonDecimal", zustatek_b = "JsonDecimal", chyba_zaokrouhleni_obd = "JsonDecimal", prijem_m_evid = "JsonDecimal", vydej_m_evid = "JsonDecimal", zustatek_m_evid = "JsonDecimal", prijem_evid = "JsonDecimal", vydej_evid = "JsonDecimal", zustatek_evid = "JsonDecimal", mena = "number", mena_zkr = "string",}
	const enum GPokStavKnihyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokstkoDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Pokstko*/
	interface GPokstkoDto {
		/**DBCOLUMN:Pokstko.typ_kon*/
		typ_kon?: string|null;
		/**DBCOLUMN:Pokstko.typ_kon_txt*/
		typ_kon_txt?: string|null;
		/**DBCOLUMN:Pokstko.typ_kon_zkr*/
		typ_kon_zkr?: string|null;
		/**DBCOLUMN:Pokstko.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Pokstko.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Pokstko.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Pokstko.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Pokstko.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Kontace daného typu*/
		Kontace?: Gordic.Hpl.Interface.GPokskonDto[]|null;
		/**přiznak oblíbeného typu kontace*/
		oblibene?: number|null;
		/**přiznak oblíbeného typu kontace na knize*/
		oblibeneKniha?: number|null;
	}
	const enum GPokstkoDtoNames { typ_kon = "typ_kon", typ_kon_txt = "typ_kon_txt", typ_kon_zkr = "typ_kon_zkr", ktg_typ = "ktg_typ", k_v = "k_v", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Kontace = "Kontace", oblibene = "oblibene", oblibeneKniha = "oblibeneKniha",}
	const enum GPokstkoDtoFragments { typ_kon = "*", typ_kon_txt = "*", typ_kon_zkr = "*", ktg_typ = "*", k_v = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Kontace = "*", oblibene = "*", oblibeneKniha = "*",}
	const enum GPokstkoDtoTypes { typ_kon = "string", typ_kon_txt = "string", typ_kon_zkr = "string", ktg_typ = "number", k_v = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Kontace = "Gordic.Hpl.Interface.GPokskonDto[]", oblibene = "number", oblibeneKniha = "number",}
	const enum GPokstkoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokUcetTerminaluKnihyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:UcetTermKnihy*/
	interface GPokUcetTerminaluKnihyDto {
		/**DBCOLUMN:UcetTermKnihy.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:UcetTermKnihy.pos_id*/
		pos_id?: string|null;
		/**DBCOLUMN:UcetTermKnihy.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:UcetTermKnihy.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:UcetTermKnihy.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:UcetTermKnihy.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:UcetTermKnihy.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:UcetTermKnihy.ucet_nazev*/
		ucet_nazev?: string|null;
	}
	const enum GPokUcetTerminaluKnihyDtoNames { ixp_den = "ixp_den", pos_id = "pos_id", bu_vl = "bu_vl", sk_vl = "sk_vl", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ucet_nazev = "ucet_nazev",}
	const enum GPokUcetTerminaluKnihyDtoFragments { ixp_den = "*", pos_id = "*", bu_vl = "*", sk_vl = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ucet_nazev = "*",}
	const enum GPokUcetTerminaluKnihyDtoTypes { ixp_den = "string", pos_id = "string", bu_vl = "string", sk_vl = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ucet_nazev = "string",}
	const enum GPokUcetTerminaluKnihyDtoTypeLengths { ixp_den = 12, pos_id = 32, bu_vl = 34, sk_vl = 11, zmenu_prov = 12, ucet_nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokvvkhDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Pokvvkh*/
	interface GPokvvkhDto {
		/**DBCOLUMN:Pokvvkh.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Pokvvkh.vlk*/
		vlk?: number|null;
		/**název vlastnosti*/
		vlk_txt?: string|null;
		/**DBCOLUMN:Pokvvkh.hodnota*/
		hodnota?: number|null;
		/**Název nasytavené hodnoty*/
		hodnota_txt?: string|null;
		/**DBCOLUMN:Pokvvkh.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Pokvvkh.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Pokvvkh.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GPokvvkhDtoNames { ixs_kon = "ixs_kon", vlk = "vlk", vlk_txt = "vlk_txt", hodnota = "hodnota", hodnota_txt = "hodnota_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPokvvkhDtoFragments { ixs_kon = "*", vlk = "*", vlk_txt = "*", hodnota = "*", hodnota_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GPokvvkhDtoTypes { ixs_kon = "string", vlk = "number", vlk_txt = "string", hodnota = "number", hodnota_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPokvvkhDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokvzktDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:SablonyZkratky*/
	interface GPokvzktDto {
		/**DBCOLUMN:SablonyZkratky.ixs_pit*/
		ixs_pit?: string|null;
		/**DBCOLUMN:SablonyZkratky.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:SablonyZkratky.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:SablonyZkratky.zkratka*/
		zkratka?: number|null;
		/**DBCOLUMN:SablonyZkratky.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SablonyZkratky.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SablonyZkratky.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SablonyZkratky.nazev_sablony*/
		nazev_sablony?: string|null;
	}
	const enum GPokvzktDtoNames { ixs_pit = "ixs_pit", ixs_fun = "ixs_fun", ixp_den = "ixp_den", zkratka = "zkratka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_sablony = "nazev_sablony",}
	const enum GPokvzktDtoFragments { ixs_pit = "*", ixs_fun = "*", ixp_den = "*", zkratka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_sablony = "*",}
	const enum GPokvzktDtoTypes { ixs_pit = "string", ixs_fun = "string", ixp_den = "string", zkratka = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_sablony = "string",}
	const enum GPokvzktDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokZalohyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Zalohy*/
	interface GPokZalohyDto {
		/**DBCOLUMN:Zalohy.ixp*/
		ixp?: string|null;
		/**
		*     Ixs_esu
		*     
		*/
		ixs_esu?: string|null;
		/**
		*     Typ_esu
		*     
		*/
		typ_esu?: number|null;
		/**DBCOLUMN:Zalohy.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:Zalohy.ac*/
		ac?: string|null;
		/**DBCOLUMN:Zalohy.popis*/
		popis?: string|null;
		/**DBCOLUMN:Zalohy.c_celkem*/
		c_celkem?: JsonDecimal|null;
		/**DBCOLUMN:Zalohy.c_celkem_m*/
		c_celkem_m?: JsonDecimal|null;
		/**DBCOLUMN:Zalohy.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Zalohy.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Zalohy.nazev*/
		nazev?: string|null;
		/**
		*     název knihy
		*     
		*/
		nazev_knihy?: string|null;
		/**
		*     rok knihy
		*     
		*/
		rok_knihy?: string|null;
		/**
		*     ktg_typ_zkr
		*     
		*/
		ktg_typ_zkr?: string|null;
		/**
		*     Vybrany radek
		*     
		*/
		wiz_check?: boolean|null;
		/**
		*     Text chyby
		*     
		*/
		wiz_txt_err?: string|null;
		/**
		*     Vysledek akce
		*     
		*/
		wiz_kind?: number|null;
		/**
		*     Wizard - datum
		*     
		*/
		wiz_datum?: JsonDate|null;
		/**
		*     Wizard - číslo
		*     
		*/
		wiz_number?: JsonDecimal|null;
		/**
		*     Prijmový/Vydajový - txt
		*     
		*/
		ktg_typ_txt?: string|null;
	}
	const enum GPokZalohyDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", typ_esu = "typ_esu", dat_evid = "dat_evid", ac = "ac", popis = "popis", c_celkem = "c_celkem", c_celkem_m = "c_celkem_m", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", nazev = "nazev", nazev_knihy = "nazev_knihy", rok_knihy = "rok_knihy", ktg_typ_zkr = "ktg_typ_zkr", wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", wiz_datum = "wiz_datum", wiz_number = "wiz_number", ktg_typ_txt = "ktg_typ_txt",}
	const enum GPokZalohyDtoFragments { ixp = "*", ixs_esu = "*", typ_esu = "*", dat_evid = "*", ac = "*", popis = "*", c_celkem = "*", c_celkem_m = "*", ktg_typ = "*", ixs_typ = "*", nazev = "*", nazev_knihy = "*", rok_knihy = "*", ktg_typ_zkr = "*", wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", wiz_datum = "*", wiz_number = "*", ktg_typ_txt = "*",}
	const enum GPokZalohyDtoTypes { ixp = "string", ixs_esu = "string", typ_esu = "number", dat_evid = "JsonDate", ac = "string", popis = "string", c_celkem = "JsonDecimal", c_celkem_m = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", nazev = "string", nazev_knihy = "string", rok_knihy = "string", ktg_typ_zkr = "string", wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", wiz_datum = "JsonDate", wiz_number = "JsonDecimal", ktg_typ_txt = "string",}
	const enum GPokZalohyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\GPokZapisyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Seznam*/
	interface GPokZapisyDto {
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
		/**DBCOLUMN:Seznam.radek*/
		radek?: number|null;
		/**DBCOLUMN:Seznam.mesic_uej*/
		mesic_uej?: number|null;
		/**DBCOLUMN:Seznam.rok_uej*/
		rok_uej?: number|null;
		/**DBCOLUMN:Seznam.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:Seznam.radek_ag*/
		radek_ag?: number|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
	}
	const enum GPokZapisyDtoNames { ixp = "ixp", rok = "rok", ico = "ico", ac = "ac", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", typ_ag = "typ_ag", den = "den", mesic = "mesic", drd = "drd", radek_z = "radek_z", m0 = "m0", m1 = "m1", c1 = "c1", c0 = "c0", radek = "radek", mesic_uej = "mesic_uej", rok_uej = "rok_uej", radek_upo = "radek_upo", radek_ag = "radek_ag", radek_hdr = "radek_hdr", id_hdr_ris = "id_hdr_ris", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GPokZapisyDtoFragments { ixp = "*", rok = "*", ico = "*", ac = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", typ_ag = "*", den = "*", mesic = "*", drd = "*", radek_z = "*", m0 = "*", m1 = "*", c1 = "*", c0 = "*", radek = "*", mesic_uej = "*", rok_uej = "*", radek_upo = "*", radek_ag = "*", radek_hdr = "*", id_hdr_ris = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GPokZapisyDtoTypes { ixp = "string", rok = "number", ico = "string", ac = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", typ_ag = "number", den = "number", mesic = "number", drd = "number", radek_z = "number", m0 = "JsonDecimal", m1 = "JsonDecimal", c1 = "JsonDecimal", c0 = "JsonDecimal", radek = "number", mesic_uej = "number", rok_uej = "number", radek_upo = "number", radek_ag = "number", radek_hdr = "number", id_hdr_ris = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GPokZapisyDtoTypeLengths { ixp = 12, ico = 10, ac = 30, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokAsyncCardStateInputDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Pomocné DTo pro uplatby kartou*/
	interface GPokAsyncCardStateInputDto {
		/**Id požadavku platby*/
		Id?: string|null;
		/**Pid dokladu*/
		Ixp?: string|null;
		/**Pid knihy*/
		IxpDen?: string|null;
	}
	const enum GPokAsyncCardStateInputDtoNames { Id = "Id", Ixp = "Ixp", IxpDen = "IxpDen",}
	const enum GPokAsyncCardStateInputDtoFragments { Id = "*", Ixp = "*", IxpDen = "*",}
	const enum GPokAsyncCardStateInputDtoTypes { Id = "string", Ixp = "string", IxpDen = "string",}
	const enum GPokAsyncCardStateInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokAsyncCardStateOutputDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Pomocné DTo pro uplatby kartou*/
	interface GPokAsyncCardStateOutputDto {
		/**Id požadavku platby*/
		Id?: string|null;
		/**Status - 0 - OK / záporné - Chyba / kladné - dotaz*/
		Status?: number|null;
		/**Podrobnosti*/
		Message?: string|null;
	}
	const enum GPokAsyncCardStateOutputDtoNames { Id = "Id", Status = "Status", Message = "Message",}
	const enum GPokAsyncCardStateOutputDtoFragments { Id = "*", Status = "*", Message = "*",}
	const enum GPokAsyncCardStateOutputDtoTypes { Id = "string", Status = "number", Message = "string",}
	const enum GPokAsyncCardStateOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokDokladFilterDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DTO filtru pro seznam pokladních dokladů*/
	interface GPokDokladFilterDto {
		/**cfuDto*/
		cfuDto?: Gordic.Eko.Interface.GCfuFilterDto[]|null;
		/**pole RP*/
		rpp_text1?: string|null;
		/**pole RP*/
		rpp_text2?: string|null;
		/**pole RP*/
		rpp_text3?: string|null;
		/**pole RP*/
		rpp_text4?: string|null;
		/**pole RP*/
		rpp_text5?: string|null;
		/**pole RP*/
		rpp_vtext1?: string|null;
		/**pole RP*/
		rpp_vtext2?: string|null;
		/**pole RP*/
		rpp_vtext3?: string|null;
		/**pole RP*/
		rpp_vtext4?: string|null;
		/**pole RP*/
		rpp_vtext5?: string|null;
		/**pole RP*/
		rpp_int1?: string|null;
		/**pole RP*/
		rpp_int2?: string|null;
		/**pole RP*/
		rpp_int3?: string|null;
		/**pole RP*/
		rpp_int4?: string|null;
		/**pole RP*/
		rpp_c1?: string|null;
		/**pole RP*/
		rpp_c2?: string|null;
		/**pole RP*/
		rpp_c3?: string|null;
		/**pole RP*/
		rpp_c4?: string|null;
		/**pole RP*/
		rpp_dat1?: string|null;
		/**pole RP*/
		rpp_dat2?: string|null;
		/**pole RP*/
		rpp_dat3?: string|null;
		/**pole RP*/
		rpp_ixs_rpp?: string|null;
		/**zálohový doklad*/
		zaloha?: string|null;
		/**schválení hlavičky dokladu*/
		s_schval?: string|null;
		/**fulltext - text k hledání*/
		fulltext_text?: string|null;
		/**fulltext - oblast hledani*/
		fulltext_oblast?: string|null;
		/**fulltext - typ el. přílohy*/
		fulltext_typelp?: string|null;
		/**fulltext - pouze aktuální verze*/
		fulltext_pouzeAktualniVerze?: string|null;
		/**stav vyřízení finanční kontroly*/
		stav_fk?: string|null;
		/**stav vyřízení účetní kontroly*/
		stav_uk?: string|null;
		/**rozdíl u dokladů zaúčtovaných "po staru" a "po novu" (1 musí být v koncovém stavu, 0 nesmí být v koncovém stavu)*/
		koncovy_stav?: string|null;
		/**zobrazit jen omezený počet dokladů (nových)*/
		poslednichX?: number|null;
		/**zobrazit doklady za posledních X dnů*/
		zaPosledniXDnu?: string|null;
		/**true/false pouze vlastní doklady*/
		pouze_vlastni?: boolean|null;
		/**obecné seskupení*/
		ixs_ose?: string|null;
		/**Vrátí seznam dokladů patřících do knih, které jsou aktuálně povolené
		*     (pro pohled přes více knih)
		*/
		povolene_knihy?: string|null;
		ixp?: string|null;
		lic?: string|null;
		druh_dok?: string|null;
		ixs_esu?: string|null;
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		nks?: string|null;
		aktivita?: string|null;
		arw?: string|null;
		popis?: string|null;
		ixp_den?: string|null;
		ac?: GBaseFilter<string>|null;
		dat_vyst?: GBaseFilter<JsonDate>|null;
		/**datum splatnosti (bucdpep.dat_spl)*/
		dat_spl?: GBaseFilter<JsonDate>|null;
		dat_zdan?: GBaseFilter<JsonDate>|null;
		mena?: string|null;
		s_zau?: string|null;
		s_tis?: string|null;
		s_sto?: GBaseFilter<string>|null;
		ktg_typ?: string|null;
		ixs_typ?: string|null;
		eko_akt?: string|null;
		dat_evid?: GBaseFilter<JsonDate>|null;
		dat_zmena?: string|null;
		zmenu_prov?: string|null;
		/**vlastník dokladu*/
		ixs_fun?: string|null;
		/**historický vlastní rozličuje filtr ixs_fun_akt/ixs_fun_akt_hist*/
		vlastnik_hist?: string|null;
		rok_dph?: string|null;
		mesic_dph?: string|null;
		typ_pok?: string|null;
		up_stav?: GBaseFilter<string>|null;
		ktg_dok?: string|null;
		priz_view?: string|null;
		/**Číslo účetního dokladu*/
		ac_uctdokl?: GBaseFilter<string>|null;
		zpus_platby?: string|null;
		cis_real?: string|null;
		c_celkem_m?: GBaseFilter<number>|null;
		c_celkem?: GBaseFilter<number>|null;
		/**Filtr na stav zaúčtování ve FUC - FILTROVÁN na klientovi*/
		fuc_s_zau?: GBaseFilter<string>|null;
		/**Filtr na stav a druh insolvenčního řízení*/
		druh_stav_rizeni?: string|null;
		/**Stav párování*/
		s_par?: string|null;
		/**Příznak dokladu jako interni = 1*/
		priz_int_doklad?: string|null;
		/**pid hledaného esu*/
		esu_ixs_esu?: string|null;
		/**ekonomický subjekt*/
		esu_ekon_subjekt?: string|null;
		/**org. jed.*/
		esu_ixs_orj?: string|null;
		/**ičo externího subjektu*/
		esu_ico?: string|null;
		/**rodné číslo externího subjektu*/
		esu_rc?: string|null;
		/**osobční číslo esu*/
		esu_oc?: string|null;
		/**jméno esu*/
		esu_jmeno?: string|null;
		/**příjmení esu*/
		esu_prijmeni?: string|null;
		/**dic esu*/
		esu_dic?: string|null;
		/**název externího subjektu*/
		esu_cs_nazev?: string|null;
		/**Obchodní jméno externího subjektu*/
		esu_ob_jmeno?: string|null;
		/**ulice - externí subjekt*/
		esu_cs_ulice?: string|null;
		/**externí subjekt - číslo popisné*/
		esu_cpop?: string|null;
		/**externí subjekt - číslo orientační*/
		esu_cor?: string|null;
		/**část obce*/
		esu_cast_obce?: string|null;
		/**obec*/
		esu_cs_obec?: string|null;
		/**PSČ*/
		esu_psc?: string|null;
		/**stát (číslo z číselníku gincsta)*/
		esu_stat?: number|null;
		/**stav insolvence esu*/
		esu_insolvence_druh_stav_rizeni?: string|null;
		/**poznámky k dokladu*/
		wfldpoz_poznamka?: string|null;
		/**klic. slova*/
		wfliixp_kl_slovo?: GBaseFilter<string>|null;
		/**list pidů*/
		ixp_list?: string|null;
		/**rezerv_sml*/
		pokdpep_rezerv_sml?: number|null;
		/**stav zaúčtování druhého kroku*/
		s_upo_2_krok?: number|null;
		/**externí identifikátor*/
		pokdpep_ext_id?: string|null;
		/**pár. sym.*/
		pokdpep_vs?: string|null;
		/**pár. symbol prázdný*/
		pokdpep_vs_prazdny?: boolean|null;
		/**pár. symbol neprázdný*/
		pokdpep_vs_neprazdny?: boolean|null;
		/**název položky*/
		pokdpep_nazev?: string|null;
		/**poznámka položky*/
		pokdpep_poznamka?: string|null;
		/**typ+kod předkontace*/
		pokdpep_kod_kon?: GBaseFilter<string>|null;
		/**identifikátor předkontace položky dokladu*/
		pokdpep_ixs_kon?: string|null;
		/**položka smlouvy*/
		pokdpep_ixp_sml?: string|null;
		/**rok smlouvy*/
		pokdpep_rok_sml?: string|null;
		/**číslo smlouvy*/
		pokdpep_cislo_sml?: string|null;
		/**ač. sml*/
		pokdpep_ac_sml?: string|null;
		/**rádek hdr*/
		pokdpep_radek_hdr?: string|null;
		/**id hdr ris*/
		pokdpep_id_hdr_ris?: string|null;
		/**stav par zapisu*/
		pokdpep_stav_par_zapisu?: GBaseFilter<number>|null;
		/**obsahuje polozky napojene na maj*/
		pokdpep_napojeni_maj?: boolean|null;
		/**Množství*/
		pokdpep_m?: string|null;
		/**Cena za měrnou jednotku*/
		pokdpep_mjm?: string|null;
		/**datum vypořádání dokladu*/
		poz_dat_vyporadani?: string|null;
		/**zp. práce s dokladem*/
		poz_zp_prac?: string|null;
		/**typ zálohy*/
		poz_typ_zal?: string|null;
		/**referent*/
		poz_ixs_osz?: string|null;
		/**stav dokladu poz*/
		poz_up_stav?: string|null;
	}
	const enum GPokDokladFilterDtoNames { cfuDto = "cfuDto", rpp_text1 = "rpp_text1", rpp_text2 = "rpp_text2", rpp_text3 = "rpp_text3", rpp_text4 = "rpp_text4", rpp_text5 = "rpp_text5", rpp_vtext1 = "rpp_vtext1", rpp_vtext2 = "rpp_vtext2", rpp_vtext3 = "rpp_vtext3", rpp_vtext4 = "rpp_vtext4", rpp_vtext5 = "rpp_vtext5", rpp_int1 = "rpp_int1", rpp_int2 = "rpp_int2", rpp_int3 = "rpp_int3", rpp_int4 = "rpp_int4", rpp_c1 = "rpp_c1", rpp_c2 = "rpp_c2", rpp_c3 = "rpp_c3", rpp_c4 = "rpp_c4", rpp_dat1 = "rpp_dat1", rpp_dat2 = "rpp_dat2", rpp_dat3 = "rpp_dat3", rpp_ixs_rpp = "rpp_ixs_rpp", zaloha = "zaloha", s_schval = "s_schval", fulltext_text = "fulltext_text", fulltext_oblast = "fulltext_oblast", fulltext_typelp = "fulltext_typelp", fulltext_pouzeAktualniVerze = "fulltext_pouzeAktualniVerze", stav_fk = "stav_fk", stav_uk = "stav_uk", koncovy_stav = "koncovy_stav", poslednichX = "poslednichX", zaPosledniXDnu = "zaPosledniXDnu", pouze_vlastni = "pouze_vlastni", ixs_ose = "ixs_ose", povolene_knihy = "povolene_knihy", ixp = "ixp", lic = "lic", druh_dok = "druh_dok", ixs_esu = "ixs_esu", ico = "ico", ucs = "ucs", nks = "nks", aktivita = "aktivita", arw = "arw", popis = "popis", ixp_den = "ixp_den", ac = "ac", dat_vyst = "dat_vyst", dat_spl = "dat_spl", dat_zdan = "dat_zdan", mena = "mena", s_zau = "s_zau", s_tis = "s_tis", s_sto = "s_sto", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun", vlastnik_hist = "vlastnik_hist", rok_dph = "rok_dph", mesic_dph = "mesic_dph", typ_pok = "typ_pok", up_stav = "up_stav", ktg_dok = "ktg_dok", priz_view = "priz_view", ac_uctdokl = "ac_uctdokl", zpus_platby = "zpus_platby", cis_real = "cis_real", c_celkem_m = "c_celkem_m", c_celkem = "c_celkem", fuc_s_zau = "fuc_s_zau", druh_stav_rizeni = "druh_stav_rizeni", s_par = "s_par", priz_int_doklad = "priz_int_doklad", esu_ixs_esu = "esu_ixs_esu", esu_ekon_subjekt = "esu_ekon_subjekt", esu_ixs_orj = "esu_ixs_orj", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_oc = "esu_oc", esu_jmeno = "esu_jmeno", esu_prijmeni = "esu_prijmeni", esu_dic = "esu_dic", esu_cs_nazev = "esu_cs_nazev", esu_ob_jmeno = "esu_ob_jmeno", esu_cs_ulice = "esu_cs_ulice", esu_cpop = "esu_cpop", esu_cor = "esu_cor", esu_cast_obce = "esu_cast_obce", esu_cs_obec = "esu_cs_obec", esu_psc = "esu_psc", esu_stat = "esu_stat", esu_insolvence_druh_stav_rizeni = "esu_insolvence_druh_stav_rizeni", wfldpoz_poznamka = "wfldpoz_poznamka", wfliixp_kl_slovo = "wfliixp_kl_slovo", ixp_list = "ixp_list", pokdpep_rezerv_sml = "pokdpep_rezerv_sml", s_upo_2_krok = "s_upo_2_krok", pokdpep_ext_id = "pokdpep_ext_id", pokdpep_vs = "pokdpep_vs", pokdpep_vs_prazdny = "pokdpep_vs_prazdny", pokdpep_vs_neprazdny = "pokdpep_vs_neprazdny", pokdpep_nazev = "pokdpep_nazev", pokdpep_poznamka = "pokdpep_poznamka", pokdpep_kod_kon = "pokdpep_kod_kon", pokdpep_ixs_kon = "pokdpep_ixs_kon", pokdpep_ixp_sml = "pokdpep_ixp_sml", pokdpep_rok_sml = "pokdpep_rok_sml", pokdpep_cislo_sml = "pokdpep_cislo_sml", pokdpep_ac_sml = "pokdpep_ac_sml", pokdpep_radek_hdr = "pokdpep_radek_hdr", pokdpep_id_hdr_ris = "pokdpep_id_hdr_ris", pokdpep_stav_par_zapisu = "pokdpep_stav_par_zapisu", pokdpep_napojeni_maj = "pokdpep_napojeni_maj", pokdpep_m = "pokdpep_m", pokdpep_mjm = "pokdpep_mjm", poz_dat_vyporadani = "poz_dat_vyporadani", poz_zp_prac = "poz_zp_prac", poz_typ_zal = "poz_typ_zal", poz_ixs_osz = "poz_ixs_osz", poz_up_stav = "poz_up_stav",}
	const enum GPokDokladFilterDtoFragments { cfuDto = "*", rpp_text1 = "*", rpp_text2 = "*", rpp_text3 = "*", rpp_text4 = "*", rpp_text5 = "*", rpp_vtext1 = "*", rpp_vtext2 = "*", rpp_vtext3 = "*", rpp_vtext4 = "*", rpp_vtext5 = "*", rpp_int1 = "*", rpp_int2 = "*", rpp_int3 = "*", rpp_int4 = "*", rpp_c1 = "*", rpp_c2 = "*", rpp_c3 = "*", rpp_c4 = "*", rpp_dat1 = "*", rpp_dat2 = "*", rpp_dat3 = "*", rpp_ixs_rpp = "*", zaloha = "*", s_schval = "*", fulltext_text = "*", fulltext_oblast = "*", fulltext_typelp = "*", fulltext_pouzeAktualniVerze = "*", stav_fk = "*", stav_uk = "*", koncovy_stav = "*", poslednichX = "*", zaPosledniXDnu = "*", pouze_vlastni = "*", ixs_ose = "*", povolene_knihy = "*", ixp = "*", lic = "*", druh_dok = "*", ixs_esu = "*", ico = "*", ucs = "*", nks = "*", aktivita = "*", arw = "*", popis = "*", ixp_den = "*", ac = "*", dat_vyst = "*", dat_spl = "*", dat_zdan = "*", mena = "*", s_zau = "*", s_tis = "*", s_sto = "*", ktg_typ = "*", ixs_typ = "*", eko_akt = "*", dat_evid = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun = "*", vlastnik_hist = "*", rok_dph = "*", mesic_dph = "*", typ_pok = "*", up_stav = "*", ktg_dok = "*", priz_view = "*", ac_uctdokl = "*", zpus_platby = "*", cis_real = "*", c_celkem_m = "*", c_celkem = "*", fuc_s_zau = "*", druh_stav_rizeni = "*", s_par = "*", priz_int_doklad = "*", esu_ixs_esu = "*", esu_ekon_subjekt = "*", esu_ixs_orj = "*", esu_ico = "*", esu_rc = "*", esu_oc = "*", esu_jmeno = "*", esu_prijmeni = "*", esu_dic = "*", esu_cs_nazev = "*", esu_ob_jmeno = "*", esu_cs_ulice = "*", esu_cpop = "*", esu_cor = "*", esu_cast_obce = "*", esu_cs_obec = "*", esu_psc = "*", esu_stat = "*", esu_insolvence_druh_stav_rizeni = "*", wfldpoz_poznamka = "*", wfliixp_kl_slovo = "*", ixp_list = "*", pokdpep_rezerv_sml = "*", s_upo_2_krok = "*", pokdpep_ext_id = "*", pokdpep_vs = "*", pokdpep_vs_prazdny = "*", pokdpep_vs_neprazdny = "*", pokdpep_nazev = "*", pokdpep_poznamka = "*", pokdpep_kod_kon = "*", pokdpep_ixs_kon = "*", pokdpep_ixp_sml = "*", pokdpep_rok_sml = "*", pokdpep_cislo_sml = "*", pokdpep_ac_sml = "*", pokdpep_radek_hdr = "*", pokdpep_id_hdr_ris = "*", pokdpep_stav_par_zapisu = "*", pokdpep_napojeni_maj = "*", pokdpep_m = "*", pokdpep_mjm = "*", poz_dat_vyporadani = "*", poz_zp_prac = "*", poz_typ_zal = "*", poz_ixs_osz = "*", poz_up_stav = "*",}
	const enum GPokDokladFilterDtoTypes { cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", rpp_text1 = "string", rpp_text2 = "string", rpp_text3 = "string", rpp_text4 = "string", rpp_text5 = "string", rpp_vtext1 = "string", rpp_vtext2 = "string", rpp_vtext3 = "string", rpp_vtext4 = "string", rpp_vtext5 = "string", rpp_int1 = "string", rpp_int2 = "string", rpp_int3 = "string", rpp_int4 = "string", rpp_c1 = "string", rpp_c2 = "string", rpp_c3 = "string", rpp_c4 = "string", rpp_dat1 = "string", rpp_dat2 = "string", rpp_dat3 = "string", rpp_ixs_rpp = "string", zaloha = "string", s_schval = "string", fulltext_text = "string", fulltext_oblast = "string", fulltext_typelp = "string", fulltext_pouzeAktualniVerze = "string", stav_fk = "string", stav_uk = "string", koncovy_stav = "string", poslednichX = "number", zaPosledniXDnu = "string", pouze_vlastni = "boolean", ixs_ose = "string", povolene_knihy = "string", ixp = "string", lic = "string", druh_dok = "string", ixs_esu = "string", ico = "string", ucs = "string", nks = "string", aktivita = "string", arw = "string", popis = "string", ixp_den = "string", ac = "GBaseFilter<string>", dat_vyst = "GBaseFilter<JsonDate>", dat_spl = "GBaseFilter<JsonDate>", dat_zdan = "GBaseFilter<JsonDate>", mena = "string", s_zau = "string", s_tis = "string", s_sto = "GBaseFilter<string>", ktg_typ = "string", ixs_typ = "string", eko_akt = "string", dat_evid = "GBaseFilter<JsonDate>", dat_zmena = "string", zmenu_prov = "string", ixs_fun = "string", vlastnik_hist = "string", rok_dph = "string", mesic_dph = "string", typ_pok = "string", up_stav = "GBaseFilter<string>", ktg_dok = "string", priz_view = "string", ac_uctdokl = "GBaseFilter<string>", zpus_platby = "string", cis_real = "string", c_celkem_m = "GBaseFilter<number>", c_celkem = "GBaseFilter<number>", fuc_s_zau = "GBaseFilter<string>", druh_stav_rizeni = "string", s_par = "string", priz_int_doklad = "string", esu_ixs_esu = "string", esu_ekon_subjekt = "string", esu_ixs_orj = "string", esu_ico = "string", esu_rc = "string", esu_oc = "string", esu_jmeno = "string", esu_prijmeni = "string", esu_dic = "string", esu_cs_nazev = "string", esu_ob_jmeno = "string", esu_cs_ulice = "string", esu_cpop = "string", esu_cor = "string", esu_cast_obce = "string", esu_cs_obec = "string", esu_psc = "string", esu_stat = "number", esu_insolvence_druh_stav_rizeni = "string", wfldpoz_poznamka = "string", wfliixp_kl_slovo = "GBaseFilter<string>", ixp_list = "string", pokdpep_rezerv_sml = "number", s_upo_2_krok = "number", pokdpep_ext_id = "string", pokdpep_vs = "string", pokdpep_vs_prazdny = "boolean", pokdpep_vs_neprazdny = "boolean", pokdpep_nazev = "string", pokdpep_poznamka = "string", pokdpep_kod_kon = "GBaseFilter<string>", pokdpep_ixs_kon = "string", pokdpep_ixp_sml = "string", pokdpep_rok_sml = "string", pokdpep_cislo_sml = "string", pokdpep_ac_sml = "string", pokdpep_radek_hdr = "string", pokdpep_id_hdr_ris = "string", pokdpep_stav_par_zapisu = "GBaseFilter<number>", pokdpep_napojeni_maj = "boolean", pokdpep_m = "string", pokdpep_mjm = "string", poz_dat_vyporadani = "string", poz_zp_prac = "string", poz_typ_zal = "string", poz_ixs_osz = "string", poz_up_stav = "string",}
	const enum GPokDokladFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokEkodmenDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:PlatidlaMeny*/
	interface GPokEkodmenDto {
		/**DBCOLUMN:PlatidlaMeny.mena*/
		mena?: number|null;
		/**DBCOLUMN:PlatidlaMeny.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:PlatidlaMeny.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:PlatidlaMeny.typ_platidla*/
		typ_platidla?: number|null;
		/**DBCOLUMN:PlatidlaMeny.typ_platidla*/
		typ_platidla_txt?: string|null;
		/**Rozšáření pro výčetku, počet bankovek/mincí dané hodnoty*/
		pocet?: number|null;
		/**Rozšáření pro výčetku*/
		celkem?: JsonDecimal|null;
	}
	const enum GPokEkodmenDtoNames { mena = "mena", c = "c", aktivita = "aktivita", typ_platidla = "typ_platidla", typ_platidla_txt = "typ_platidla_txt", pocet = "pocet", celkem = "celkem",}
	const enum GPokEkodmenDtoFragments { mena = "*", c = "*", aktivita = "*", typ_platidla = "*", typ_platidla_txt = "*", pocet = "*", celkem = "*",}
	const enum GPokEkodmenDtoTypes { mena = "number", c = "JsonDecimal", aktivita = "number", typ_platidla = "number", typ_platidla_txt = "string", pocet = "number", celkem = "JsonDecimal",}
	const enum GPokEkodmenDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokHistorieKurzuDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:HistKurzu*/
	interface GPokHistorieKurzuDto {
		/**DBCOLUMN:HistKurzu.ixp_kur*/
		ixp_kur?: string|null;
		/**DBCOLUMN:HistKurzu.mena*/
		mena?: number|null;
		/**DBCOLUMN:HistKurzu.mena*/
		mena_zkr?: string|null;
		/**DBCOLUMN:HistKurzu.rada_kur*/
		rada_kur?: string|null;
		/**DBCOLUMN:HistKurzu.puvod_kur*/
		puvod_kur?: number|null;
		/**DBCOLUMN:HistKurzu.puvod_kur*/
		puvod_kur_txt?: string|null;
		/**DBCOLUMN:HistKurzu.cislo*/
		cislo?: number|null;
		/**DBCOLUMN:HistKurzu.rok*/
		rok?: number|null;
		/**DBCOLUMN:HistKurzu.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:HistKurzu.den*/
		den?: number|null;
		/**DBCOLUMN:HistKurzu.kurz_n*/
		kurz_n?: JsonDecimal|null;
		/**DBCOLUMN:HistKurzu.kurz_p*/
		kurz_p?: JsonDecimal|null;
		/**DBCOLUMN:HistKurzu.kurz_s*/
		kurz_s?: JsonDecimal|null;
		/**DBCOLUMN:HistKurzu.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:HistKurzu.dat_platnost_od*/
		dat_platnost_od?: JsonDate|null;
		/**DBCOLUMN:HistKurzu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:HistKurzu.nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GPokHistorieKurzuDtoNames { ixp_kur = "ixp_kur", mena = "mena", mena_zkr = "mena_zkr", rada_kur = "rada_kur", puvod_kur = "puvod_kur", puvod_kur_txt = "puvod_kur_txt", cislo = "cislo", rok = "rok", mesic = "mesic", den = "den", kurz_n = "kurz_n", kurz_p = "kurz_p", kurz_s = "kurz_s", m = "m", dat_platnost_od = "dat_platnost_od", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf",}
	const enum GPokHistorieKurzuDtoFragments { ixp_kur = "*", mena = "*", mena_zkr = "*", rada_kur = "*", puvod_kur = "*", puvod_kur_txt = "*", cislo = "*", rok = "*", mesic = "*", den = "*", kurz_n = "*", kurz_p = "*", kurz_s = "*", m = "*", dat_platnost_od = "*", dat_zmena = "*", nazev_rf = "*",}
	const enum GPokHistorieKurzuDtoTypes { ixp_kur = "string", mena = "number", mena_zkr = "string", rada_kur = "string", puvod_kur = "number", puvod_kur_txt = "string", cislo = "number", rok = "number", mesic = "number", den = "number", kurz_n = "JsonDecimal", kurz_p = "JsonDecimal", kurz_s = "JsonDecimal", m = "JsonDecimal", dat_platnost_od = "JsonDate", dat_zmena = "JsonDate", nazev_rf = "string",}
	const enum GPokHistorieKurzuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokKontrolyDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**Pomocné DTo pro uživatelské potvrzení*/
	interface GPokKontrolyDto {
		/**Kontrola1*/
		Kontrola1?: boolean|null;
		/**Kontrola2*/
		Kontrola2?: boolean|null;
		/**Kontrola3*/
		Kontrola3?: boolean|null;
		/**Kontrola3*/
		Kontrola4?: boolean|null;
		/**Kontrola3*/
		Kontrola5?: boolean|null;
		/**Kontrola3*/
		Kontrola6?: boolean|null;
		/**Kontrola3*/
		Kontrola7?: boolean|null;
		/**Kontrola3*/
		Kontrola8?: boolean|null;
		/**Kontrola3*/
		Kontrola9?: boolean|null;
		/**Kontrola3*/
		Kontrola10?: boolean|null;
	}
	const enum GPokKontrolyDtoNames { Kontrola1 = "Kontrola1", Kontrola2 = "Kontrola2", Kontrola3 = "Kontrola3", Kontrola4 = "Kontrola4", Kontrola5 = "Kontrola5", Kontrola6 = "Kontrola6", Kontrola7 = "Kontrola7", Kontrola8 = "Kontrola8", Kontrola9 = "Kontrola9", Kontrola10 = "Kontrola10",}
	const enum GPokKontrolyDtoFragments { Kontrola1 = "*", Kontrola2 = "*", Kontrola3 = "*", Kontrola4 = "*", Kontrola5 = "*", Kontrola6 = "*", Kontrola7 = "*", Kontrola8 = "*", Kontrola9 = "*", Kontrola10 = "*",}
	const enum GPokKontrolyDtoTypes { Kontrola1 = "boolean", Kontrola2 = "boolean", Kontrola3 = "boolean", Kontrola4 = "boolean", Kontrola5 = "boolean", Kontrola6 = "boolean", Kontrola7 = "boolean", Kontrola8 = "boolean", Kontrola9 = "boolean", Kontrola10 = "boolean",}
	const enum GPokKontrolyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokPohybyParovaniDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:PohybyPolozky*/
	interface GPokPohybyParovaniDto {
		/**DBCOLUMN:PohybyPolozky.ixp_upr*/
		ixp_upr?: string|null;
		/**DBCOLUMN:PohybyPolozky.ac*/
		ac?: string|null;
		/**DBCOLUMN:PohybyPolozky.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:PohybyPolozky.c_upo*/
		c_upo?: JsonDecimal|null;
		/**DBCOLUMN:PohybyPolozky.s_upo*/
		s_upo?: number|null;
		/**DBCOLUMN:PohybyPolozky.dat_upo*/
		dat_upo?: JsonDate|null;
		/**DBCOLUMN:PohybyPolozky.radek*/
		radek?: number|null;
		/**DBCOLUMN:PohybyPolozky.kod_kon*/
		kod_kon?: string|null;
		/**DBCOLUMN:PohybyPolozky.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:PohybyPolozky.popis*/
		popis?: string|null;
		/**DBCOLUMN:PohybyPolozky.vs*/
		vs?: string|null;
		/**DBCOLUMN:PohybyPolozky.ss*/
		ss?: string|null;
		/**DBCOLUMN:PohybyPolozky.c_celkem_m*/
		c_celkem_m?: string|null;
		/**s_upo textová hodnota*/
		s_upo_txt?: string|null;
	}
	const enum GPokPohybyParovaniDtoNames { ixp_upr = "ixp_upr", ac = "ac", radek_upo = "radek_upo", c_upo = "c_upo", s_upo = "s_upo", dat_upo = "dat_upo", radek = "radek", kod_kon = "kod_kon", nazev = "nazev", popis = "popis", vs = "vs", ss = "ss", c_celkem_m = "c_celkem_m", s_upo_txt = "s_upo_txt",}
	const enum GPokPohybyParovaniDtoFragments { ixp_upr = "*", ac = "*", radek_upo = "*", c_upo = "*", s_upo = "*", dat_upo = "*", radek = "*", kod_kon = "*", nazev = "*", popis = "*", vs = "*", ss = "*", c_celkem_m = "*", s_upo_txt = "*",}
	const enum GPokPohybyParovaniDtoTypes { ixp_upr = "string", ac = "string", radek_upo = "number", c_upo = "JsonDecimal", s_upo = "number", dat_upo = "JsonDate", radek = "number", kod_kon = "string", nazev = "string", popis = "string", vs = "string", ss = "string", c_celkem_m = "string", s_upo_txt = "string",}
	const enum GPokPohybyParovaniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokRadkyZpuZauctovaniDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:~*/
	interface GPokRadkyZpuZauctovaniDto {
		/**DBCOLUMN:Fucdzpz.ixs_zpz*/
		ixs_zpz?: string|null;
		/**DBCOLUMN:Fucdzpz.rok_ixe*/
		rok_ixe?: number|null;
		/**DBCOLUMN:Fucdzpz.radek*/
		radek?: number|null;
		/**DBCOLUMN:Fucdzpz.nks*/
		nks?: string|null;
		/**DBCOLUMN:Fucdzpz.uea*/
		uea?: string|null;
		/**DBCOLUMN:Fucdzpz.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Fucdzpz.uec*/
		uec?: string|null;
		/**DBCOLUMN:Fucdzpz.ued*/
		ued?: string|null;
		/**DBCOLUMN:Fucdzpz.uee*/
		uee?: string|null;
		/**DBCOLUMN:Fucdzpz.uef*/
		uef?: string|null;
		/**DBCOLUMN:Fucdzpz.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Fucdzpz.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Fucdzpz.uei*/
		uei?: string|null;
		/**DBCOLUMN:Fucdzpz.uej*/
		uej?: string|null;
		/**DBCOLUMN:Fucdzpz.te0*/
		te0?: string|null;
		/**DBCOLUMN:Fucdzpz.te1*/
		te1?: string|null;
		/**DBCOLUMN:Fucdzpz.te2*/
		te2?: string|null;
		/**DBCOLUMN:Fucdzpz.te3*/
		te3?: string|null;
		/**DBCOLUMN:Fucdzpz.te4*/
		te4?: string|null;
		/**DBCOLUMN:Fucdzpz.c0*/
		c0?: string|null;
		/**DBCOLUMN:Fucdzpz.c1*/
		c1?: string|null;
		/**DBCOLUMN:Fucdzpz.popis_t*/
		popis_t?: string|null;
		/**DBCOLUMN:Fucdzpz.kumulace*/
		kumulace?: number|null;
		/**DBCOLUMN:Fucdzpz.pokyn*/
		pokyn?: string|null;
		/**DBCOLUMN:Fucdzpz.priz_rez*/
		priz_rez?: number|null;
		/**DBCOLUMN:Fucdzpz.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Fucdzpz.radek_hdr*/
		radek_hdr?: number|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
	}
	const enum GPokRadkyZpuZauctovaniDtoNames { ixs_zpz = "ixs_zpz", rok_ixe = "rok_ixe", radek = "radek", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", c0 = "c0", c1 = "c1", popis_t = "popis_t", kumulace = "kumulace", pokyn = "pokyn", priz_rez = "priz_rez", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GPokRadkyZpuZauctovaniDtoFragments { ixs_zpz = "*", rok_ixe = "*", radek = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", c0 = "*", c1 = "*", popis_t = "*", kumulace = "*", pokyn = "*", priz_rez = "*", id_hdr_ris = "*", radek_hdr = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GPokRadkyZpuZauctovaniDtoTypes { ixs_zpz = "string", rok_ixe = "number", radek = "number", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", c0 = "string", c1 = "string", popis_t = "string", kumulace = "number", pokyn = "string", priz_rez = "number", id_hdr_ris = "string", radek_hdr = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GPokRadkyZpuZauctovaniDtoTypeLengths { id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\Dto\Others\GPokZapisyParovaniDto.d.ts 

declare namespace Gordic.Hpl.Interface {
	/**DBTABLE:Seznam*/
	interface GPokZapisyParovaniDto {
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
		/**DBCOLUMN:Seznam.radek*/
		radek?: number|null;
		/**DBCOLUMN:Seznam.mesic_uej*/
		mesic_uej?: number|null;
		/**DBCOLUMN:Seznam.rok_uej*/
		rok_uej?: number|null;
		/**DBCOLUMN:Seznam.radek_upo*/
		radek_upo?: number|null;
		/**DBCOLUMN:Seznam.radek_ag*/
		radek_ag?: number|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
	}
	const enum GPokZapisyParovaniDtoNames { ixp = "ixp", rok = "rok", ico = "ico", ac = "ac", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", typ_ag = "typ_ag", den = "den", mesic = "mesic", drd = "drd", radek_z = "radek_z", m0 = "m0", m1 = "m1", c1 = "c1", c0 = "c0", radek = "radek", mesic_uej = "mesic_uej", rok_uej = "rok_uej", radek_upo = "radek_upo", radek_ag = "radek_ag", radek_hdr = "radek_hdr", id_hdr_ris = "id_hdr_ris",}
	const enum GPokZapisyParovaniDtoFragments { ixp = "*", rok = "*", ico = "*", ac = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", typ_ag = "*", den = "*", mesic = "*", drd = "*", radek_z = "*", m0 = "*", m1 = "*", c1 = "*", c0 = "*", radek = "*", mesic_uej = "*", rok_uej = "*", radek_upo = "*", radek_ag = "*", radek_hdr = "*", id_hdr_ris = "*",}
	const enum GPokZapisyParovaniDtoTypes { ixp = "string", rok = "number", ico = "string", ac = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", typ_ag = "number", den = "number", mesic = "number", drd = "number", radek_z = "number", m0 = "JsonDecimal", m1 = "JsonDecimal", c1 = "JsonDecimal", c0 = "JsonDecimal", radek = "number", mesic_uej = "number", rok_uej = "number", radek_upo = "number", radek_ag = "number", radek_hdr = "number", id_hdr_ris = "string",}
	const enum GPokZapisyParovaniDtoTypeLengths { ixp = 12, ico = 10, ac = 30, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\GPokBoolString.d.ts 

declare namespace Gordic.Hpl.Interface {
    interface GPokBoolString {
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\PokBankPlatby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Bankovní - očekávané platby
	* @domain Pokladna
	* @businessObject Pokladní očekávané/bankovní platby
	*/
	interface PokBankPlatby {
		/**Seznam pokladních kontací*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokBankPlatbyDto>>;
		/**Seznam případů DDP*/
		listPripadyDdp(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokPripadyDdpDto>>;
		/**Dotažení názvu ESU očekávané platby*/
		esuPlatby(rq?:CallParams<{ixsEsu:string}>): _Task<{ixsEsu:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PokBankPlatby: ServiceBase & Catalog.PokBankPlatby;
	}
	const PokBankPlatby: Client["PokBankPlatby"];
}
declare namespace Gordic.Hpl.Interface.LK.Isl {
	/**Filtr případů DDP*/
	const enum GPokPripadyDdpFilter {
		/**pid případu*/
		ixp,
		/**typ pohledávky*/
		typ_phl,
		/**msk_vs*/
		vs,
		/**externí subjekt*/
		ixs_esu,
		/**včetně napojených přípaů*/
		napojene_pripady,
		/**Datum od počítání salda*/
		dat_od,
		/**Datum do počítání salda*/
		dat_do,
		/**Typ salda (Splátkové/Účetní)*/
		splatkove_saldo,
	}
	/**Filter bankovních plateb pro pokladnu - očekávané platby*/
	const enum GPokBankPlatbyFilter {
		/**kategorie platby (wflspid.ixs_typ = ? and wflspid.ixp = bucdpep.ixp - typ písemnosti)*/
		kat_platby,
		/**rodné číslo*/
		rc,
		/**ičo*/
		ico,
		/**název*/
		cs_nazev,
		/**agenda*/
		typ_ag,
		/**ulice*/
		cs_ulice,
		/**číslo popisné*/
		c_p,
		/**agendovoé číslo*/
		ac,
		/**typ pohledávky ddp*/
		typ_pohl,
		/**vs*/
		vs,
		/**ks*/
		ks,
		/**ss*/
		ss,
		/**datum splatnosti*/
		dat_spl,
		/**směr platby (100 = příjmové, 200 = výdajové)... směr platby nemá číselník v DB !!*/
		smer_platby,
		/**měna*/
		mena,
		/**způsob platby (bucdpep.zp)*/
		zp,
		/**nulove radky*/
		nulove_radky,
		/**nenulove radky*/
		nenulove_radky,
		/**identifikátor bankovního výpisu*/
		ixp,
		/**ddpdpep.popis*/
		ddpdpep_popis,
		/**ixp plátce*/
		ixp_pl,
		/**ixp plátce - profiltruje včetně s ixp_platce*/
		ixp_pl_vcetne,
		/**typ predpisu DDP*/
		ktg_upo,
		/**cislo orientacni*/
		cislo_orientacni,
		/**obec*/
		obec,
		/**cast obce*/
		cast_obce,
		/**pois případu DDP*/
		popis_ddpspid,
		/**Filtr na konkrétní esu , funguje v kombinaci pokud je zaškrtnuto Pro esu na pokladním dokladu, pokud ano, tak se esu doplní*/
		xxx_ixs_esu,
		/**Fltrovat dle esu na pokladní položce, pak se vyplní ixs_esu*/
		xxx_esu_pok_dok,
		/**Filtr ekonomické esu*/
		xxx_eko_esu,
		/**Filtr kumulovat ESU*/
		xxx_kumulovat_esu,
		/**Filtr neplatné esu*/
		xxx_neplatny_esu,
		/**Řádek uhrady*/
		radek_uhr,
		/**hledat aji v náhradních VS*/
		nahradni_vs,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\PokDoklad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pokladní doklad
	* @domain Pokladna
	* @businessObject Pokladní doklad
	*/
	interface PokDoklad {
		/**Seznam pokladních dokladů*/
		list(rq?:Gordic.Hpl.Interface.GPokDokladFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokDokladDto>>;
		/**Detail pokladního dokladu*/
		read(rq?:Gordic.Hpl.Interface.GPokDokladDto|CallParams<GServiceReadRequest<Gordic.Hpl.Interface.GPokDokladDto>>): _Task<GServiceReadRequest<Gordic.Hpl.Interface.GPokDokladDto>,GServiceReadResponse<Gordic.Hpl.Interface.GPokDokladDto>>;
		/**Schválení hlavičky pokladního dokladu*/
		schvalitHlavicku(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Odschválení hlavičky pokladního dokladu*/
		odschvalitHlavicku(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Zrušení pokladního dokladu*/
		zrusit(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Uzavření pokladního dokladu*/
		uzavrit(rq?:CallParams<{ixp:string,kontrolovatRozpocet:boolean}>): _Task<{ixp:string,kontrolovatRozpocet:boolean},void>;
		/**Změna kategorie pokladního dokladu*/
		zmenitKategorii(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Servis - Oprava BUC*/
		opravitBuc(rq?:CallParams<{ixp:string,datumOdp:JsonDate,datumPar:JsonDate}>): _Task<{ixp:string,datumOdp:JsonDate,datumPar:JsonDate},void>;
		/**Podání pokladního dokladu*/
		podani(rq?:CallParams<{kontrolaRok:boolean,predplnIxsEsu:string,generovatPid:boolean,ixp:string,predplnDruhDokladu:Gordic.Hpl.Interface.DruhDokladu,predplnKategorieDokladu:Gordic.Hpl.Interface.KategorieTypu,predplnitDoklad:boolean}>): _Task<{kontrolaRok:boolean,predplnIxsEsu:string,generovatPid:boolean,ixp:string,predplnDruhDokladu:Gordic.Hpl.Interface.DruhDokladu,predplnKategorieDokladu:Gordic.Hpl.Interface.KategorieTypu,predplnitDoklad:boolean},string>;
		/**Schválení dokladu*/
		schvalit(rq?:CallParams<{ixp:string,dat_par:JsonDate,konRezervace:boolean,konMetadata:boolean,dat_schvaleni:JsonDate}>): _Task<{ixp:string,dat_par:JsonDate,konRezervace:boolean,konMetadata:boolean,dat_schvaleni:JsonDate},string>;
		/**Vytvoří kopii zadaného dokladu a Nový zaeviduje.*/
		kopirovat(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Evidence pokladního dokladu*/
		evidovat(rq?:CallParams<{doklad:Gordic.Hpl.Interface.GPokDokladDto,kontroly:Gordic.Hpl.Interface.GPokKontrolyDto}>): _Task<{doklad:Gordic.Hpl.Interface.GPokDokladDto,kontroly:Gordic.Hpl.Interface.GPokKontrolyDto},string>;
		/**Odstorno pokladního dokladu*/
		odstorno(rq?:CallParams<{ixp:string,duvod:string,datPar:JsonDate,datOdu:JsonDate,dotaz:boolean}>): _Task<{ixp:string,duvod:string,datPar:JsonDate,datOdu:JsonDate,dotaz:boolean},void>;
		/**Oprava popisu LK*/
		zmenitPopis(rq?:CallParams<{ixp:string,popis:string}>): _Task<{ixp:string,popis:string},void>;
		/**Oprava EXT ID LK*/
		opravitExterniId(rq?:CallParams<{ixp:string,radek:number,extId:string}>): _Task<{ixp:string,radek:number,extId:string},void>;
		/**Oprava/Změna data evidence*/
		opravitDatumEvidence(rq?:CallParams<{ixp:string,kontrolovat:boolean,datum:JsonDate,dotaz:boolean}>): _Task<{ixp:string,kontrolovat:boolean,datum:JsonDate,dotaz:boolean},void>;
		/**Zrušení TZH*/
		zrusitTzh(rq?:CallParams<{ixp:string,radek:number}>): _Task<{ixp:string,radek:number},void>;
		/**Zpracování TZH*/
		zpracovatTzh(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Servis spárovat BUC*/
		sparovatBuc(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Servis odpárovat BUC*/
		odparovatBuc(rq?:CallParams<{ixp:string,datOdparovani:JsonDate}>): _Task<{ixp:string,datOdparovani:JsonDate},void>;
		/**Storno z LK*/
		storno(rq?:CallParams<{duvod:string,ixp:string,kontorlovatRok:boolean,datumOdparovani:JsonDate}>): _Task<{duvod:string,ixp:string,kontorlovatRok:boolean,datumOdparovani:JsonDate},string>;
		/**Vrátí všechny Permissions pokladního dokladu*/
		seznamPermissions(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Hpl.Interface.LK.Isl.GPokDokladPermissions>;
		/**Převzít pokladní doklad*/
		prevzit(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Předání dokladu do jiné pokladní knihy*/
		predatDoJineKnihy(rq?:CallParams<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixpDen:string}>): _Task<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixpDen:string},void>;
		/**Předání dokladu do jiné pokladní knihy*/
		predatDoPpd(rq?:CallParams<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixpDen:string,dotaz:boolean}>): _Task<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixpDen:string,dotaz:boolean},void>;
		/**Předání dokladu do jiné pokladní knihy*/
		predatDoPok(rq?:CallParams<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixpDen:string,dotaz:boolean}>): _Task<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixpDen:string,dotaz:boolean},void>;
		/**Podání pokladního dokladu ze šablony*/
		podaniSablona(rq?:CallParams<{ixsPit:string,kontrolaRok:boolean}>): _Task<{ixsPit:string,kontrolaRok:boolean},string>;
		/**Převezmi zpět do PPD*/
		prevzitZpetDoPpd(rq?:CallParams<{ixp:string,dotaz:boolean}>): _Task<{ixp:string,dotaz:boolean},void>;
		/**Vyúčtování zálohy*/
		vyuctovaniZalohy(rq?:CallParams<{ixp:string,kategorie:Gordic.Hpl.Interface.KategorieTypu,ixpNoveho:string}>): _Task<{ixp:string,kategorie:Gordic.Hpl.Interface.KategorieTypu,ixpNoveho:string},string[]>;
		/**Seznam pokladních záloh*/
		listZalohy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokZalohyDto>>;
		/**Zaúčtuje účetní případ pokladního dokladu*/
		zauctovat(rq?:CallParams<{ixp:string,kontrolaPol:boolean}>): _Task<{ixp:string,kontrolaPol:boolean},void>;
		/**Porovnání rezervačních zápisů s aktuálními ZPZ*/
		porovnatRezZapSAktkZpz(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Odúčtování pokladního dokladu*/
		oductovat(rq?:CallParams<{ixp:string,duvod:string,datOdparovani:JsonDate,datOductovani:JsonDate,dotaz:boolean}>): _Task<{ixp:string,duvod:string,datOdparovani:JsonDate,datOductovani:JsonDate,dotaz:boolean},void>;
		/**Odschválení pokladního dokladu*/
		odschvalit(rq?:CallParams<{ixp:string,duvod:string,datOdparovani:JsonDate,datOductovani:JsonDate,dotaz:boolean,kontUct:boolean}>): _Task<{ixp:string,duvod:string,datOdparovani:JsonDate,datOductovani:JsonDate,dotaz:boolean,kontUct:boolean},void>;
		/**Kontrola jestli je odklad schvalován podruhé a pokud ano musím vybrat datum schválení*/
		kontrolaOpetovnehoSchvaleni(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},boolean>;
		/**Vrácení do WFL*/
		vratitDoWfl(rq?:CallParams<{ixp:string,duvod:string}>): _Task<{ixp:string,duvod:string},void>;
		/**provedení rezervace dokladu*/
		rezervovat(rq?:CallParams<{ixp:string,dotaz:boolean}>): _Task<{ixp:string,dotaz:boolean},void>;
		/**Provedení odrezervace*/
		odrezervovat(rq?:CallParams<{ixp:string,dotaz:boolean,duvodOdrezer:string}>): _Task<{ixp:string,dotaz:boolean,duvodOdrezer:string},void>;
		/**Zrušení vazby k uvedenému dokladu*/
		odvazat(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Odpojení smlouvy z pokladní položky*/
		odpojitSmlouvu(rq?:CallParams<{ixp:string,radek:number}>): _Task<{ixp:string,radek:number},void>;
		/**Napojení smlouvy z pokladní položky*/
		napojitSmlouvu(rq?:CallParams<{ixp:string,radek:number,dotaz:boolean}>): _Task<{ixp:string,radek:number,dotaz:boolean},void>;
		/**Smazání smlouvy z pokladní položky*/
		smazSmlouvu(rq?:CallParams<{ixp:string,radek:number}>): _Task<{ixp:string,radek:number},void>;
		/**Načtení náhledu zaúčtování pokladního dokladu*/
		nahledZauctovani(rq?:CallParams<{ixp:string,kumulovane:boolean}>): _Task<{ixp:string,kumulovane:boolean},Gordic.Hpl.Interface.GPokRadkyZpuZauctovaniDto[]>;
		/**účetní zápisy párovacích zápisů*/
		ucetniZapisyParovani(rq?:CallParams<{ixpPok:string}>): _Task<{ixpPok:string},Gordic.Hpl.Interface.GPokZapisyParovaniDto[]>;
		/**účetní pohyby z párování*/
		ucetniPohybyParovani(rq?:CallParams<{ixpPok:string}>): _Task<{ixpPok:string},Gordic.Hpl.Interface.GPokPohybyParovaniDto[]>;
		/**Vrácí seznam párovacích zápisů pro daný PID pok dokladu.*/
		parovaciZapisy(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Buc.Interface.GBankovniVypisPolozkaDto[]>;
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
		/**Počet pokladních dokladů*/
		countList(rq?:Gordic.Hpl.Interface.GPokDokladFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Poslední editované doklady pro dashboard*/
		listPosledniZmenene(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Hpl.Interface.GPokDokladDto>>;
		/**Platba kartou*/
		platbaKartou(rq?:CallParams<{terminalId:string,castka:JsonDecimal}>): _Task<{terminalId:string,castka:JsonDecimal},string>;
		/**Platba kartou*/
		potvrzeniPlatby(rq?:CallParams<{id:string,potvrzeni:boolean}>): _Task<{id:string,potvrzeni:boolean},string>;
		/**Off-line platba platební karotu*/
		offLinePlatba(rq?:CallParams<{ixp:string,posId:string,kartaCislo:string,autorizacniKod:string,datumTransakce:JsonDate,cisloUctenky:string,castka:JsonDecimal}>): _Task<{ixp:string,posId:string,kartaCislo:string,autorizacniKod:string,datumTransakce:JsonDate,cisloUctenky:string,castka:JsonDecimal},void>;
		/**Změna kurzu na dokladu*/
		zmenitKurzBeznehoDokladu(rq?:CallParams<{dotazKontrolaRozpoctu:boolean,ixp:string,kurz:JsonDecimal,datOdp:JsonDate,datOdu:JsonDate}>): _Task<{dotazKontrolaRozpoctu:boolean,ixp:string,kurz:JsonDecimal,datOdp:JsonDate,datOdu:JsonDate},void>;
		/**Změna kurzu na dokladu*/
		zmenitKurzZalohyAVyuctovani(rq?:CallParams<{dotazKontrolaRozpoctu:boolean,ixpVyuctovani:string,ixpZaloha:string,kurzZaloha:JsonDecimal,kurzVyuctovani:JsonDecimal,datOdp:JsonDate,datOdu:JsonDate}>): _Task<{dotazKontrolaRozpoctu:boolean,ixpVyuctovani:string,ixpZaloha:string,kurzZaloha:JsonDecimal,kurzVyuctovani:JsonDecimal,datOdp:JsonDate,datOdu:JsonDate},void>;
		/**Přecenění zálohy*/
		precenZalohu(rq?:CallParams<{ixp:string,aktualniKurz:JsonDecimal}>): _Task<{ixp:string,aktualniKurz:JsonDecimal},boolean>;
		/**Načte rezervační zápisy dokladu*/
		listRezervacniZapisy(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Hpl.Interface.GPokZapisyDto[]>;
		/**Přepojení smlouvy pokladní položky*/
		prepojitSmlouvu(rq?:CallParams<{ixp:string,radek:number,dotaz:boolean,ixpSml:string,rokSml:number,cisloSml:number}>): _Task<{ixp:string,radek:number,dotaz:boolean,ixpSml:string,rokSml:number,cisloSml:number},void>;
		/**Přepojení smlouvy pokladní položky*/
		vyberSmlouva(rq?:CallParams<{ixp:string,radek:number,dotaz:boolean,ixpSml:string,rokSml:number,cisloSml:number}>): _Task<{ixp:string,radek:number,dotaz:boolean,ixpSml:string,rokSml:number,cisloSml:number},void>;
		/**Oprava VS, SS na pok. položce*/
		opravaParovacihoSymbolu(rq?:CallParams<{ixpDoklad:string,radekPolozky:number,noveVS:string,noveSS:string,noveIxpBuc:string,noveRadekUhr:number,datumOdparovani:JsonDate,datumParovani:JsonDate}>): _Task<{ixpDoklad:string,radekPolozky:number,noveVS:string,noveSS:string,noveIxpBuc:string,noveRadekUhr:number,datumOdparovani:JsonDate,datumParovani:JsonDate},void>;
		/**Śeznam plateb kartou*/
		listPlatbyKartou(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Hpl.Interface.GPokPlatbyKartouDto[]>;
		/**Převzetí pokladního dokladu*/
		pridelitDoklad(rq?:CallParams<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,duvod:string}>): _Task<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,duvod:string},void>;
		/**Předání pokladního dokladu*/
		predatDoklad(rq?:CallParams<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixsRefPrijemce:string,duvod:string}>): _Task<{ixp:string,ixsSuPrijemce:string,ixsFunPrijemce:string,ixsRefPrijemce:string,duvod:string},void>;
		/**Párování pokladního dokladu do BUC*/
		doparuj(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Změna způsobu úhrady po neúspěšné platbě kartou*/
		zmenZpusobUhrady(rq?:CallParams<{ixp:string,datOdparovani:JsonDate,datOductovani:JsonDate,dotaz:boolean,kontUct:boolean}>): _Task<{ixp:string,datOdparovani:JsonDate,datOductovani:JsonDate,dotaz:boolean,kontUct:boolean},void>;
		/**Vytěží data ze souboru pomocí AI*/
		aiVytezeniSouboru(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,GServiceActionResponse<Gordic.Eko.Interface.GAiRecognizerRecognizeExtendedResponseDto>>;
		/**Zjištění aktuálního ixs_ulo pro daný doklad*/
		zjistiIxsUlo(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,string>;
		/**Vrátí jedno požadované permission*/
		permission(rq?:CallParams<{doklad:Gordic.Hpl.Interface.GPokDokladDto,typPermision:Gordic.Hpl.Interface.LK.Isl.GPermissionEnum}>): _Task<{doklad:Gordic.Hpl.Interface.GPokDokladDto,typPermision:Gordic.Hpl.Interface.LK.Isl.GPermissionEnum},Gordic.General.ApplicationInterface.GPermission>;
		test(rq?:CallParams<{typtest:number}>): _Task<{typtest:number},Gordic.Gin.Interface.GAibConnectorInfoDto>;
		/**Hromadná duplikace pokldního dokladu, vrátí PID posledního vytvořeného dokladu*/
		hromadnaDuplikace(rq?:CallParams<{ixp:string,pocet:number}>): _Task<{ixp:string,pocet:number},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PokDoklad: ServiceBase & Catalog.PokDoklad;
	}
	const PokDoklad: Client["PokDoklad"];
}
declare namespace Gordic.Hpl.Interface.LK.Isl {
	const enum GPermissionEnum {
		/**Permission kontrolní chod*/
		LzeKontrolniChod,
	}
	/**Množina oprávnění pro PokDoklad*/
	interface GPokDokladPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Zda lze tisknout a zároveň doklad schválit*/
		LzeTisknoutSPredzpracovanim: Gordic.General.ApplicationInterface.GPermission;
		/**Schválení hlavičky pokladního dokladu*/
		LzeSchvalitHlavicku: Gordic.General.ApplicationInterface.GPermission;
		/**Odschválení hlavičky pokladního dokladu*/
		LzeOdschvalitHlavicku: Gordic.General.ApplicationInterface.GPermission;
		/**Změna kategorie pokladního dokladu*/
		LzeZmenitKategorii: Gordic.General.ApplicationInterface.GPermission;
		/**Servis - Opravit BUC*/
		LzeServisOpravitBuc: Gordic.General.ApplicationInterface.GPermission;
		/**Podání pokladního dokladu*/
		LzePodani: Gordic.General.ApplicationInterface.GPermission;
		/**Schválení pokladního dokladu*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze kopírovat pokladní doklad*/
		LzeKopirovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze evidovat pokladní doklad*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze odstornovat pokladní doklad*/
		LzeOdstorno: Gordic.General.ApplicationInterface.GPermission;
		/**Lze změnit popis pokladního dokladu*/
		LzeZmenitPopis: Gordic.General.ApplicationInterface.GPermission;
		/**Lze opravit externí ID na řádku pokladního dokladu*/
		LzeOpravitExterniId: Gordic.General.ApplicationInterface.GPermission;
		/**Opravit datum evidence pokladního dokladu*/
		LzeOpravitDatumEvidence: Gordic.General.ApplicationInterface.GPermission;
		/**Servis - Změnit datum evidence*/
		LzeServisZmenitDatumEvidence: Gordic.General.ApplicationInterface.GPermission;
		/**Servis - zpracování tzh*/
		LzeServisZpracovatTzh: Gordic.General.ApplicationInterface.GPermission;
		/**Storno pokladního dokladu*/
		LzeStorno: Gordic.General.ApplicationInterface.GPermission;
		/**Převzetí pokladního dokladu*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Předání do jiné knihy*/
		LzePredatDoJineKnihy: Gordic.General.ApplicationInterface.GPermission;
		/**Předání do PPD*/
		LzePredatDoPpd: Gordic.General.ApplicationInterface.GPermission;
		/**Předání do POK*/
		LzePredatDoPok: Gordic.General.ApplicationInterface.GPermission;
		/**Převzetí zpět do PPD*/
		LzePrevzitZpetPpd: Gordic.General.ApplicationInterface.GPermission;
		/**Vyúčtování zálohy*/
		LzeVyuctovanizaloha: Gordic.General.ApplicationInterface.GPermission;
		/**Označit jako interní*/
		LzeOznacitJakoInterni: Gordic.General.ApplicationInterface.GPermission;
		/**Účtování pokladního dokladu*/
		LzeZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Odschválení pokladního dokladu*/
		LzeOdschvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Odúčtování pokladního dokladu*/
		LzeOductovat: Gordic.General.ApplicationInterface.GPermission;
		/**Vrácení dokladu do WFL*/
		LzeVratitWfl: Gordic.General.ApplicationInterface.GPermission;
		/**Odvázání pokladního dokladu*/
		LzeOdvazat: Gordic.General.ApplicationInterface.GPermission;
		/**Odpojení smlouvy na pokladní položce*/
		LzeOdpojitSmlouvu: Gordic.General.ApplicationInterface.GPermission;
		/**Smazání smlouvy na pokladní položce*/
		LzeSmazatSmlouvu: Gordic.General.ApplicationInterface.GPermission;
		/**Výběr smlouvy na pokladní položce*/
		LzeVyberSmlouvu: Gordic.General.ApplicationInterface.GPermission;
		/**Napojení smlouvy na pokladní položce*/
		LzeNapojSmlouvu: Gordic.General.ApplicationInterface.GPermission;
		/**Přepojení smlouvy na pokladní položce*/
		LzePrepojSmlouvu: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uzavřít pokladní doklad;*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit pokladní doklad;*/
		LzeZrusit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze spustit kontrolní chod*/
		LzeKontrolniChod: Gordic.General.ApplicationInterface.GPermission;
		/**Lze podání pokladní šablony*/
		LzePodaniSablony: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uložit doklad jako pokladní šablonu*/
		LzeUlozitJakoSabona: Gordic.General.ApplicationInterface.GPermission;
		/**Lze opravit účetní pohyb*/
		LzeServisOpravaUcPohyb: Gordic.General.ApplicationInterface.GPermission;
		/**Lze pracovat se smlouvou v záložce servis*/
		LzeServisSmlouva: Gordic.General.ApplicationInterface.GPermission;
		/**Lze pracovat s porovnáním FP pol. SML. rez. pol. POK*/
		LzePorovnatSmlPok: Gordic.General.ApplicationInterface.GPermission;
		/**test hromadné duplikace*/
		LzeHromadneDuplikovat: Gordic.General.ApplicationInterface.GPermission;
		/**Test opravy VS/ Párovacího symbolu*/
		LzeOpravitVs: Gordic.General.ApplicationInterface.GPermission;
		/**test účetních zápisů*/
		LzeUcetniZapisy: Gordic.General.ApplicationInterface.GPermission;
		/**test tisku účetního dokladu*/
		LzeTiskUcetniDoklad: Gordic.General.ApplicationInterface.GPermission;
		/**Test tisku náhledu pkladního dokladu*/
		LzeTiskNahledDoklad: Gordic.General.ApplicationInterface.GPermission;
		/**Test controlingové likvidace*/
		LzeContLikvidace: Gordic.General.ApplicationInterface.GPermission;
		/**Test AI vytěžení*/
		LzeAiVytezeni: Gordic.General.ApplicationInterface.GPermission;
		/**test odeslání EET ručně*/
		LzeEetRucne: Gordic.General.ApplicationInterface.GPermission;
		/**test dostupnosti předpisu*/
		LzePredpis: Gordic.General.ApplicationInterface.GPermission;
		/**test opravy rozpočtové skladby*/
		LzeOpravaRS: Gordic.General.ApplicationInterface.GPermission;
		/**test debug modu*/
		LzeDebug: Gordic.General.ApplicationInterface.GPermission;
		/**Off-line platba*/
		LzeOffLinePlatba: Gordic.General.ApplicationInterface.GPermission;
		/**QR platba - pouze visible*/
		LzeQrPlatbaVisible: Gordic.General.ApplicationInterface.GPermission;
		/**Prodejní sklady - visible*/
		LzeProdejniSkladyVisible: Gordic.General.ApplicationInterface.GPermission;
		/**Platba kartou*/
		LzePlatbaKartou: Gordic.General.ApplicationInterface.GPermission;
		/**Platba kartou seznam*/
		LzeSeznamPlatbaKartou: Gordic.General.ApplicationInterface.GPermission;
		/**Předat doklad funcki*/
		LzePredatFunkci: Gordic.General.ApplicationInterface.GPermission;
		/**Přidělit doklad funkci*/
		LzePridelitFunkci: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPokDokladPermissionsNames { LzeTisknoutSPredzpracovanim = "LzeTisknoutSPredzpracovanim", LzeSchvalitHlavicku = "LzeSchvalitHlavicku", LzeOdschvalitHlavicku = "LzeOdschvalitHlavicku", LzeZmenitKategorii = "LzeZmenitKategorii", LzeServisOpravitBuc = "LzeServisOpravitBuc", LzePodani = "LzePodani", LzeSchvalit = "LzeSchvalit", LzeKopirovat = "LzeKopirovat", LzeEvidovat = "LzeEvidovat", LzeOdstorno = "LzeOdstorno", LzeZmenitPopis = "LzeZmenitPopis", LzeOpravitExterniId = "LzeOpravitExterniId", LzeOpravitDatumEvidence = "LzeOpravitDatumEvidence", LzeServisZmenitDatumEvidence = "LzeServisZmenitDatumEvidence", LzeServisZpracovatTzh = "LzeServisZpracovatTzh", LzeStorno = "LzeStorno", LzePrevzit = "LzePrevzit", LzePredatDoJineKnihy = "LzePredatDoJineKnihy", LzePredatDoPpd = "LzePredatDoPpd", LzePredatDoPok = "LzePredatDoPok", LzePrevzitZpetPpd = "LzePrevzitZpetPpd", LzeVyuctovanizaloha = "LzeVyuctovanizaloha", LzeOznacitJakoInterni = "LzeOznacitJakoInterni", LzeZauctovat = "LzeZauctovat", LzeOdschvalit = "LzeOdschvalit", LzeOductovat = "LzeOductovat", LzeVratitWfl = "LzeVratitWfl", LzeOdvazat = "LzeOdvazat", LzeOdpojitSmlouvu = "LzeOdpojitSmlouvu", LzeSmazatSmlouvu = "LzeSmazatSmlouvu", LzeVyberSmlouvu = "LzeVyberSmlouvu", LzeNapojSmlouvu = "LzeNapojSmlouvu", LzePrepojSmlouvu = "LzePrepojSmlouvu", LzeUzavrit = "LzeUzavrit", LzeZrusit = "LzeZrusit", LzeKontrolniChod = "LzeKontrolniChod", LzePodaniSablony = "LzePodaniSablony", LzeUlozitJakoSabona = "LzeUlozitJakoSabona", LzeServisOpravaUcPohyb = "LzeServisOpravaUcPohyb", LzeServisSmlouva = "LzeServisSmlouva", LzePorovnatSmlPok = "LzePorovnatSmlPok", LzeHromadneDuplikovat = "LzeHromadneDuplikovat", LzeOpravitVs = "LzeOpravitVs", LzeUcetniZapisy = "LzeUcetniZapisy", LzeTiskUcetniDoklad = "LzeTiskUcetniDoklad", LzeTiskNahledDoklad = "LzeTiskNahledDoklad", LzeContLikvidace = "LzeContLikvidace", LzeAiVytezeni = "LzeAiVytezeni", LzeEetRucne = "LzeEetRucne", LzePredpis = "LzePredpis", LzeOpravaRS = "LzeOpravaRS", LzeDebug = "LzeDebug", LzeOffLinePlatba = "LzeOffLinePlatba", LzeQrPlatbaVisible = "LzeQrPlatbaVisible", LzeProdejniSkladyVisible = "LzeProdejniSkladyVisible", LzePlatbaKartou = "LzePlatbaKartou", LzeSeznamPlatbaKartou = "LzeSeznamPlatbaKartou", LzePredatFunkci = "LzePredatFunkci", LzePridelitFunkci = "LzePridelitFunkci",}
	const enum GPokDokladPermissionsFragments { LzeTisknoutSPredzpracovanim = "*", LzeSchvalitHlavicku = "*", LzeOdschvalitHlavicku = "*", LzeZmenitKategorii = "*", LzeServisOpravitBuc = "*", LzePodani = "*", LzeSchvalit = "*", LzeKopirovat = "*", LzeEvidovat = "*", LzeOdstorno = "*", LzeZmenitPopis = "*", LzeOpravitExterniId = "*", LzeOpravitDatumEvidence = "*", LzeServisZmenitDatumEvidence = "*", LzeServisZpracovatTzh = "*", LzeStorno = "*", LzePrevzit = "*", LzePredatDoJineKnihy = "*", LzePredatDoPpd = "*", LzePredatDoPok = "*", LzePrevzitZpetPpd = "*", LzeVyuctovanizaloha = "*", LzeOznacitJakoInterni = "*", LzeZauctovat = "*", LzeOdschvalit = "*", LzeOductovat = "*", LzeVratitWfl = "*", LzeOdvazat = "*", LzeOdpojitSmlouvu = "*", LzeSmazatSmlouvu = "*", LzeVyberSmlouvu = "*", LzeNapojSmlouvu = "*", LzePrepojSmlouvu = "*", LzeUzavrit = "*", LzeZrusit = "*", LzeKontrolniChod = "*", LzePodaniSablony = "*", LzeUlozitJakoSabona = "*", LzeServisOpravaUcPohyb = "*", LzeServisSmlouva = "*", LzePorovnatSmlPok = "*", LzeHromadneDuplikovat = "*", LzeOpravitVs = "*", LzeUcetniZapisy = "*", LzeTiskUcetniDoklad = "*", LzeTiskNahledDoklad = "*", LzeContLikvidace = "*", LzeAiVytezeni = "*", LzeEetRucne = "*", LzePredpis = "*", LzeOpravaRS = "*", LzeDebug = "*", LzeOffLinePlatba = "*", LzeQrPlatbaVisible = "*", LzeProdejniSkladyVisible = "*", LzePlatbaKartou = "*", LzeSeznamPlatbaKartou = "*", LzePredatFunkci = "*", LzePridelitFunkci = "*",}
	const enum GPokDokladPermissionsTypes { LzeTisknoutSPredzpracovanim = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalitHlavicku = "Gordic.General.ApplicationInterface.GPermission", LzeOdschvalitHlavicku = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitKategorii = "Gordic.General.ApplicationInterface.GPermission", LzeServisOpravitBuc = "Gordic.General.ApplicationInterface.GPermission", LzePodani = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeKopirovat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdstorno = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitPopis = "Gordic.General.ApplicationInterface.GPermission", LzeOpravitExterniId = "Gordic.General.ApplicationInterface.GPermission", LzeOpravitDatumEvidence = "Gordic.General.ApplicationInterface.GPermission", LzeServisZmenitDatumEvidence = "Gordic.General.ApplicationInterface.GPermission", LzeServisZpracovatTzh = "Gordic.General.ApplicationInterface.GPermission", LzeStorno = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoJineKnihy = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoPpd = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoPok = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitZpetPpd = "Gordic.General.ApplicationInterface.GPermission", LzeVyuctovanizaloha = "Gordic.General.ApplicationInterface.GPermission", LzeOznacitJakoInterni = "Gordic.General.ApplicationInterface.GPermission", LzeZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdschvalit = "Gordic.General.ApplicationInterface.GPermission", LzeOductovat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitWfl = "Gordic.General.ApplicationInterface.GPermission", LzeOdvazat = "Gordic.General.ApplicationInterface.GPermission", LzeOdpojitSmlouvu = "Gordic.General.ApplicationInterface.GPermission", LzeSmazatSmlouvu = "Gordic.General.ApplicationInterface.GPermission", LzeVyberSmlouvu = "Gordic.General.ApplicationInterface.GPermission", LzeNapojSmlouvu = "Gordic.General.ApplicationInterface.GPermission", LzePrepojSmlouvu = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusit = "Gordic.General.ApplicationInterface.GPermission", LzeKontrolniChod = "Gordic.General.ApplicationInterface.GPermission", LzePodaniSablony = "Gordic.General.ApplicationInterface.GPermission", LzeUlozitJakoSabona = "Gordic.General.ApplicationInterface.GPermission", LzeServisOpravaUcPohyb = "Gordic.General.ApplicationInterface.GPermission", LzeServisSmlouva = "Gordic.General.ApplicationInterface.GPermission", LzePorovnatSmlPok = "Gordic.General.ApplicationInterface.GPermission", LzeHromadneDuplikovat = "Gordic.General.ApplicationInterface.GPermission", LzeOpravitVs = "Gordic.General.ApplicationInterface.GPermission", LzeUcetniZapisy = "Gordic.General.ApplicationInterface.GPermission", LzeTiskUcetniDoklad = "Gordic.General.ApplicationInterface.GPermission", LzeTiskNahledDoklad = "Gordic.General.ApplicationInterface.GPermission", LzeContLikvidace = "Gordic.General.ApplicationInterface.GPermission", LzeAiVytezeni = "Gordic.General.ApplicationInterface.GPermission", LzeEetRucne = "Gordic.General.ApplicationInterface.GPermission", LzePredpis = "Gordic.General.ApplicationInterface.GPermission", LzeOpravaRS = "Gordic.General.ApplicationInterface.GPermission", LzeDebug = "Gordic.General.ApplicationInterface.GPermission", LzeOffLinePlatba = "Gordic.General.ApplicationInterface.GPermission", LzeQrPlatbaVisible = "Gordic.General.ApplicationInterface.GPermission", LzeProdejniSkladyVisible = "Gordic.General.ApplicationInterface.GPermission", LzePlatbaKartou = "Gordic.General.ApplicationInterface.GPermission", LzeSeznamPlatbaKartou = "Gordic.General.ApplicationInterface.GPermission", LzePredatFunkci = "Gordic.General.ApplicationInterface.GPermission", LzePridelitFunkci = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPokDokladPermissionsTypeLengths {}
	/**Filter pokladních dokladů*/
	const enum GPokDokladFilter {
		/**pole RP*/
		rpp_text1,
		/**pole RP*/
		rpp_text2,
		/**pole RP*/
		rpp_text3,
		/**pole RP*/
		rpp_text4,
		/**pole RP*/
		rpp_text5,
		/**pole RP*/
		rpp_vtext1,
		/**pole RP*/
		rpp_vtext2,
		/**pole RP*/
		rpp_vtext3,
		/**pole RP*/
		rpp_vtext4,
		/**pole RP*/
		rpp_vtext5,
		/**pole RP*/
		rpp_int1,
		/**pole RP*/
		rpp_int2,
		/**pole RP*/
		rpp_int3,
		/**pole RP*/
		rpp_int4,
		/**pole RP*/
		rpp_c1,
		/**pole RP*/
		rpp_c2,
		/**pole RP*/
		rpp_c3,
		/**pole RP*/
		rpp_c4,
		/**pole RP*/
		rpp_dat1,
		/**pole RP*/
		rpp_dat2,
		/**pole RP*/
		rpp_dat3,
		/**pole RP*/
		rpp_ixs_rpp,
		/**zálohový doklad*/
		zaloha,
		/**schválení hlavičky dokladu*/
		s_schval,
		/**fulltext - text k hledání*/
		fulltext_text,
		/**fulltext - oblast hledani*/
		fulltext_oblast,
		/**fulltext - typ el. přílohy*/
		fulltext_typelp,
		/**fulltext - pouze aktuální verze*/
		fulltext_pouzeAktualniVerze,
		/**stav vyřízení finanční kontroly*/
		stav_fk,
		/**stav vyřízení účetní kontroly*/
		stav_uk,
		/**existence rezerv. pohybu (1 musí existovat, 0 nesmí existovat)*/
		existence_rez_pohybu,
		/**rozdíl u dokladů zaúčtovaných "po staru" a "po novu" (1 musí být v koncovém stavu, 0 nesmí být v koncovém stavu)*/
		koncovy_stav,
		/**zobrazit jen omezený počet dokladů (nových)*/
		poslednichX,
		/**zobrazit doklady za posledních X dnů*/
		zaPosledniXDnu,
		/**true/false pouze vlastní doklady*/
		pouze_vlastni,
		/**obecné seskupení*/
		ixs_ose,
		/**Vrátí seznam dokladů patřících do knih, které jsou aktuálně povolené
		*     (pro pohled přes více knih)
		*/
		povolene_knihy,
		ixp,
		lic,
		druh_dok,
		ixs_esu,
		ico,
		/**účetní středisko*/
		ucs,
		nks,
		aktivita,
		arw,
		popis,
		ixp_den,
		ac,
		dat_vyst,
		/**datum splatnosti (bucdpep.dat_spl)*/
		dat_spl,
		dat_zdan,
		mena,
		s_zau,
		s_tis,
		s_sto,
		ktg_typ,
		ixs_typ,
		eko_akt,
		dat_evid,
		dat_zmena,
		zmenu_prov,
		/**vlastník dokladu*/
		ixs_fun,
		/**historický vlastní rozličuje filtr ixs_fun_akt/ixs_fun_akt_hist*/
		vlastnik_hist,
		rok_dph,
		mesic_dph,
		typ_pok,
		up_stav,
		ktg_dok,
		priz_view,
		/**nepoužívá se*/
		ac_ag,
		/**Číslo účetního dokladu*/
		ac_uctdokl,
		zpus_platby,
		rezervovano,
		cis_real,
		c_celkem_m,
		c_celkem,
		/**Filtr na stav zaúčtování ve FUC - FILTROVÁN na klientovi*/
		fuc_s_zau,
		/**Filtr na stav a druh insolvenčního řízení*/
		druh_stav_rizeni,
		/**Stav párování*/
		s_par,
		/**Příznak dokladu jako interni = 1*/
		priz_int_doklad,
		/**pid hledaného esu*/
		esu_ixs_esu,
		/**ekonomický subjekt*/
		esu_ekon_subjekt,
		/**org. jed.*/
		esu_ixs_orj,
		/**ičo externího subjektu*/
		esu_ico,
		/**rodné číslo externího subjektu*/
		esu_rc,
		/**osobční číslo esu*/
		esu_oc,
		/**jméno esu*/
		esu_jmeno,
		/**příjmení esu*/
		esu_prijmeni,
		/**dic esu*/
		esu_dic,
		/**název externího subjektu*/
		esu_cs_nazev,
		/**Obchodní jméno externího subjektu*/
		esu_ob_jmeno,
		/**ulice - externí subjekt*/
		esu_cs_ulice,
		/**externí subjekt - číslo popisné*/
		esu_cpop,
		/**externí subjekt - číslo orientační*/
		esu_cor,
		/**část obce*/
		esu_cast_obce,
		/**obec*/
		esu_cs_obec,
		/**PSČ*/
		esu_psc,
		/**stát (číslo z číselníku gincsta)*/
		esu_stat,
		/**stav insolvence esu*/
		esu_insolvence_druh_stav_rizeni,
		/**poznámky k dokladu*/
		wfldpoz_poznamka,
		/**klic. slova*/
		wfliixp_kl_slovo,
		/**rezerv_sml*/
		pokdpep_rezerv_sml,
		/**stav zaúčtování druhého kroku*/
		s_upo_2_krok,
		/**externí identifikátor*/
		pokdpep_ext_id,
		/**pár. sym.*/
		pokdpep_vs,
		/**pár. symbol prázdný*/
		pokdpep_vs_prazdny,
		/**pár. symbol neprázdný*/
		pokdpep_vs_neprazdny,
		/**název položky*/
		pokdpep_nazev,
		/**poznámka položky*/
		pokdpep_poznamka,
		/**typ+kod předkontace*/
		pokdpep_kod_kon,
		/**identifikátor předkontace položky dokladu*/
		pokdpep_ixs_kon,
		/**položka smlouvy*/
		pokdpep_ixp_sml,
		/**rok smlouvy*/
		pokdpep_rok_sml,
		/**číslo smlouvy*/
		pokdpep_cislo_sml,
		/**ač. sml*/
		pokdpep_ac_sml,
		/**rádek hdr*/
		pokdpep_radek_hdr,
		/**id hdr ris*/
		pokdpep_id_hdr_ris,
		/**stav par zapisu*/
		pokdpep_stav_par_zapisu,
		/**obsahuje polozky napojene na maj*/
		pokdpep_napojeni_maj,
		/**Množství*/
		pokdpep_m,
		/**Cena za měrnou jednotku*/
		pokdpep_mjm,
		/**cftu*/
		cfuDto,
		/**datum vypořádání dokladu*/
		poz_dat_vyporadani,
		/**zp. práce s dokladem*/
		poz_zp_prac,
		/**typ zálohy*/
		poz_typ_zal,
		/**referent*/
		poz_ixs_osz,
		/**stav dokladu poz*/
		poz_up_stav,
		/**FIK dokladu*/
		eet_fik,
		/**Stav volání EET*/
		eet_stav,
		/**Smlouva/Objednávka*/
		ps_sml,
		/**List PIDu*/
		ixp_list,
	}
	/**Enum*/
	const enum GPokZalohyFilter {
		/**ixp*/
		ixp,
		/**ac*/
		ac,
		/**vs položky*/
		vs,
		/**popis dokladu*/
		popis,
		/**datum vystaveni od*/
		dat_od,
		/**datum vystaveni do*/
		dat_do,
		/**datum vystaveni ixs_esu*/
		ixs_esu,
		/**referent*/
		ixs_osz,
		/**typ zálohy*/
		typ_zal,
		/**pid knihy*/
		ixp_den,
		/**filter na minulé roky*/
		minuly_rok,
		/**filter ostatní knihy*/
		ostatni_knihy,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\PokKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Pokladní doklad
	*     
	* @domain Pokladna
	* @businessObject Pokladní kniha
	*/
	interface PokKniha {
		/**
		*     Seznam pokladních knih
		*     
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokKnihaDto>>;
		/**
		*     Výběr jedné pokladní položky
		*     
		*/
		read(rq?:Gordic.Hpl.Interface.GPokKnihaDto|CallParams<GServiceReadRequest<Gordic.Hpl.Interface.GPokKnihaDto>>): _Task<GServiceReadRequest<Gordic.Hpl.Interface.GPokKnihaDto>,GServiceReadResponse<Gordic.Hpl.Interface.GPokKnihaDto>>;
		/**
		*     Update pokladní knihy
		*     
		*/
		update(rq?:Gordic.Hpl.Interface.GPokKnihaDto|CallParams<GServiceSaveRequest<Gordic.Hpl.Interface.GPokKnihaDto>>): _Task<GServiceSaveRequest<Gordic.Hpl.Interface.GPokKnihaDto>,GServiceSaveResponse<Gordic.Hpl.Interface.GPokKnihaDto>>;
		/**
		*     Seznam cenin pokladní knihy
		*     
		*/
		seznamCenin(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokCeninyDto>>;
		/**
		*     Stav zůstatků knihy k datu
		*     
		*/
		stavKDatu(rq?:CallParams<{ixpDen:string,datum:JsonDate}>): _Task<{ixpDen:string,datum:JsonDate},GServiceReadResponse<Gordic.Hpl.Interface.GPokStavKnihyDto>>;
		/**
		*     Stav zůstatků knihy evidovaných
		*     
		*/
		stavEvidovanych(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},GServiceReadResponse<Gordic.Hpl.Interface.GPokStavKnihyDto>>;
		/**
		*     Stavy a pohyby knihy za období
		*     
		*/
		pohybZaObdobi(rq?:CallParams<{ixpDen:string,datum:GIntervalDto<JsonDate>}>): _Task<{ixpDen:string,datum:GIntervalDto<JsonDate>},GServiceReadResponse<Gordic.Hpl.Interface.GPokStavKnihyDto>>;
		/**
		*     Stav zůstatků knihy k denšnímu datu
		*     
		*/
		stavAktualni(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},GServiceReadResponse<Gordic.Hpl.Interface.GPokStavKnihyDto>>;
		/**
		*     Založí nebo upraví ceninu na knize
		*     
		*/
		zalozUpravCenina(rq?:Gordic.Hpl.Interface.GPokCeninyDto|CallParams<GServiceSaveRequest<Gordic.Hpl.Interface.GPokCeninyDto>>): _Task<GServiceSaveRequest<Gordic.Hpl.Interface.GPokCeninyDto>,GServiceSaveResponse<Gordic.Hpl.Interface.GPokCeninyDto>>;
		/**
		*     Připsání hodnoty cenin do poč. zůstatku cenin
		*     
		*/
		pridatPocZustatekZCenin(rq?:CallParams<{ixpDen:string,pripsat:boolean}>): _Task<{ixpDen:string,pripsat:boolean},void>;
		/**
		*     načtení seznamu historie počátečních stavů
		*     
		*/
		seznamHisPocStavu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},GServiceListResponse<Gordic.Hpl.Interface.GPokHistPocStavuDto>>;
		/**
		*     Metoda pro hlavní uzávěrku
		*     
		*/
		uzaverkaHlavni(rq?:CallParams<{ixpDen:string,datDo:JsonDate,kontrola:boolean}>): _Task<{ixpDen:string,datDo:JsonDate,kontrola:boolean},JsonDecimal>;
		/**
		*     Metoda pro dílčí uzávěrku
		*     
		*/
		uzaverkaDilci(rq?:CallParams<{ixpDen:string,datDo:JsonDate,kontrola:boolean}>): _Task<{ixpDen:string,datDo:JsonDate,kontrola:boolean},JsonDecimal>;
		/**
		*     Nucené uzavření agendy POK
		*     
		*/
		uzaverkaAgendy(rq?:CallParams<{}>): _Task<{},void>;
		/**
		*     Historie uzávěrek knihy
		*     
		*/
		historieUzaverek(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokHistUzaverekDto>>;
		/**
		*     Kontrola dat - Kontrola rezervačních pohybů
		*     
		*/
		kontrolaRezPohybu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - Kontrola účetních pohybů
		*     
		*/
		kontrolaUcPohybu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - Kontrola vyplnění vlastníka
		*     
		*/
		kontrolaVyplneniVlastnika(rq?:CallParams<{archiv:boolean,ixpDen:string}>): _Task<{archiv:boolean,ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - Oprava vyplnění vlastníka
		*     
		*/
		opravitVyplneniVlastnika(rq?:CallParams<{archiv:boolean,ixpDen:string}>): _Task<{archiv:boolean,ixpDen:string},void>;
		/**
		*     Kontrola dat - kontrola vyplnění měny dokladu
		*     
		*/
		kontrolaVyplneniMenyDokladu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - oprava vyplnění měny dokladu
		*     
		*/
		opravitVyplneniMenyDokladu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},void>;
		/**
		*     Kontrola dat - kontorla priznaku rezervace na dokladu
		*     
		*/
		kontrolaPriznakuRezervaceNaDokladu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - Oprvava příznaku rezervace na dokladu
		*     
		*/
		opravitPriznakRezervaceNaDokladu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},void>;
		/**
		*     Kontrola dat - kontrola součtu dokladu
		*     
		*/
		kontrolaSouctuDokladu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - oprava součtu dokladu
		*     
		*/
		opravitSouctyDokladu(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},void>;
		/**
		*     Kontrol dat - kontrola spisového uzlu
		*     
		*/
		kontrolaSuWflspid(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - oprava spisového uzlu
		*     
		*/
		opravitSuWflspid(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},void>;
		/**
		*     Kontrola dat - kontrola stavu zaúčtování
		*     
		*/
		kontrolaStavuZauctovani(rq?:CallParams<{archiv:boolean,ixpDen:string}>): _Task<{archiv:boolean,ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dat - oprava stavu zaúčtování
		*     
		*/
		opravitStavZauctovani(rq?:CallParams<{archiv:boolean,ixpDen:string}>): _Task<{archiv:boolean,ixpDen:string},void>;
		/**
		*     Roční uzávěrka knihy
		*     
		*/
		uzaverkaRocni(rq?:CallParams<{ixpDen:string,kontrolaRozpocet:boolean,kontroly:Gordic.Hpl.Interface.GPokKontrolyDto}>): _Task<{ixpDen:string,kontrolaRozpocet:boolean,kontroly:Gordic.Hpl.Interface.GPokKontrolyDto},string>;
		/**
		*     Převod zůstatku knihy po uzávěrce
		*     
		*/
		prenestZustatekPoUzaverce(rq?:CallParams<{ixpDenZustatek:string,ixpDenPuvodni:string}>): _Task<{ixpDenZustatek:string,ixpDenPuvodni:string},void>;
		/**
		*     Rekapitulace položek - 
		*     
		*/
		listPokskok(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokskokDto>>;
		/**
		*     Rekapitulace položek - smazání výběru
		*     
		*/
		smazPokskok(rq?:CallParams<{radek:number}>): _Task<{radek:number},void>;
		/**
		*     Rekapitulace položek - vložení nového výběru
		*     
		*/
		vlozPokskok(rq?:CallParams<{vyber:Gordic.Hpl.Interface.GPokskokDto}>): _Task<{vyber:Gordic.Hpl.Interface.GPokskokDto},Gordic.Hpl.Interface.GPokskokDto>;
		/**
		*     Rekapitulace položek - úprava nového výběru
		*     
		*/
		upravPokskok(rq?:CallParams<{vyber:Gordic.Hpl.Interface.GPokskokDto}>): _Task<{vyber:Gordic.Hpl.Interface.GPokskokDto},Gordic.Hpl.Interface.GPokskokDto>;
		/**
		*     Rekapitulace položek - vložení/uložení kontací výběru
		*     
		*/
		vlozPokdkok(rq?:CallParams<{radek:number,listKontace:Gordic.Hpl.Interface.GPokskonDto[]}>): _Task<{radek:number,listKontace:Gordic.Hpl.Interface.GPokskonDto[]},void>;
		/**
		*     Rekapitulace položek - výběr kontace
		*     
		*/
		rekapitulacePolozekKontace(rq?:CallParams<{knihy:Gordic.Hpl.Interface.GPokKnihaDto[]}>): _Task<{knihy:Gordic.Hpl.Interface.GPokKnihaDto[]},Gordic.Hpl.Interface.GPokskonDto[]>;
		/**
		*     Rekapitulace položek - seznam yvbraných kontací výběru
		*     
		*/
		rekapitulacePolozekVyber(rq?:CallParams<{radek:number}>): _Task<{radek:number},Gordic.Hpl.Interface.GPokskonDto[]>;
		/**
		*     Kontorla typu pohledavky vůči kontaci na pokladním dokladu
		*     
		*/
		kontrolaTypuPohledavky(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola dokladů bránící uźávěrce
		*     
		*/
		kontrolaBraniciUzaverce(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Kontrola schválených neevidovaných dokladů
		*     
		*/
		kontrolaSchvaleneNeevidovane(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Hpl.Interface.GPokBoolString>;
		/**
		*     Oprava schválených neevidovaných
		*     
		*/
		opravitSchvaleneNeevidovane(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},void>;
		/**
		*     Seznam platidel dané knihy
		*     
		*/
		platidlaKnihy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokEkodmenDto>>;
		/**
		*     Seznam historie kurzu
		*     
		*/
		historieKurzu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokHistorieKurzuDto>>;
		/**
		*     Vrátí datum posledně evidovaného dokladu
		*     
		*/
		datumPosledniEvidovany(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},JsonDate>;
		/**
		*     Taložení pokladního dokladu pro kurzový rozdíl
		*     
		*/
		opravitKurzRozdil(rq?:CallParams<{ixp:string,datEvid:JsonDate,kurz:JsonDecimal}>): _Task<{ixp:string,datEvid:JsonDate,kurz:JsonDecimal},void>;
		/**
		*     Dotažení kurzu pro přecenění
		*     
		*/
		detailKurzuProPreceneni(rq?:CallParams<{}>): _Task<{},Gordic.Hpl.Interface.GPokHistorieKurzuDto>;
		/**
		*     Seznam vazeb účtů a platebních terminálů pokladní knihy
		*     
		*/
		uctyTerminaluKnihy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokUcetTerminaluKnihyDto>>;
		/**
		*     Založí nebo upraví ceninu na knize
		*     
		*/
		editaceUcetTerminal(rq?:Gordic.Hpl.Interface.GPokUcetTerminaluKnihyDto|CallParams<GServiceSaveRequest<Gordic.Hpl.Interface.GPokUcetTerminaluKnihyDto>>): _Task<GServiceSaveRequest<Gordic.Hpl.Interface.GPokUcetTerminaluKnihyDto>,GServiceSaveResponse<Gordic.Hpl.Interface.GPokUcetTerminaluKnihyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PokKniha: ServiceBase & Catalog.PokKniha;
	}
	const PokKniha: Client["PokKniha"];
}
declare namespace Gordic.Hpl.Interface.LK.Isl {
	/**
	*     Množina oprávnění pro pokladní knihu
	*     
	*/
	interface GPokKnihaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**
		*     Read
		*     
		*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Edit
		*     
		*/
		CanEdit: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola zda podat pokladní doklad
		*     
		*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola zda podat pokladní doklad, ale daňový - stejné jako LzePodat plus kontrola na platce DPH
		*     
		*/
		LzePodatDanovy: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola na omezený přístup pokladní knihy
		*     
		*/
		LzePracovat: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola na akci Kontrola dat
		*     
		*/
		LzeKontrolaDat: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda predat doklad,akce na seznamu pokadních dokladů
		*     
		*/
		LzePredani: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda prideleni pokladni doklad,akce na seznamu pokladních dokladů
		*     
		*/
		LzePrideleni: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda je možné předání do PPD, akce na seznamu pokladních dokladů
		*     
		*/
		LzePredaniPpd: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda je možné předání do POK, akce na seznamu pokladních dokladů
		*     
		*/
		LzePredaniPok: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda je možné převzetí PPD, akce na seznamu pokladních dokladů
		*     
		*/
		LzePrevzitPpd: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda je možné předat do jiné knihy, akce na seznamu pokladních dokladů
		*     
		*/
		LzePredaniJinaKniha: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda je možné tisknout
		*     
		*/
		LzeTisk: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zde lze uzavřít knihu ročně
		*     
		*/
		LzeUzaverkaRocni: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda lze otevřít historii kurzů
		*     
		*/
		LzeHistorieKurzu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Kontrola, zda lze spustit kurzový rozdíl
		*     
		*/
		LzeKurzovyRozdil: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Hromadná změna kurzu nezaúčtovaných dokladů
		*     
		*/
		LzeHromadnaZmenaKurzu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Hromadné přecenění záloh
		*     
		*/
		LzeHromadnePreceneniZaloh: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Administrace terminálů knihy
		*     
		*/
		LzeAdministraceterminaluKnihy: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Lze podat doklad ze šablony
		*     
		*/
		LzePodaniSablona: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Lze účtovat v POK
		*     
		*/
		LzeUctovani: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPokKnihaPermissionsNames { CanRead = "CanRead", CanEdit = "CanEdit", LzePodat = "LzePodat", LzePodatDanovy = "LzePodatDanovy", LzePracovat = "LzePracovat", LzeKontrolaDat = "LzeKontrolaDat", LzePredani = "LzePredani", LzePrideleni = "LzePrideleni", LzePredaniPpd = "LzePredaniPpd", LzePredaniPok = "LzePredaniPok", LzePrevzitPpd = "LzePrevzitPpd", LzePredaniJinaKniha = "LzePredaniJinaKniha", LzeTisk = "LzeTisk", LzeUzaverkaRocni = "LzeUzaverkaRocni", LzeHistorieKurzu = "LzeHistorieKurzu", LzeKurzovyRozdil = "LzeKurzovyRozdil", LzeHromadnaZmenaKurzu = "LzeHromadnaZmenaKurzu", LzeHromadnePreceneniZaloh = "LzeHromadnePreceneniZaloh", LzeAdministraceterminaluKnihy = "LzeAdministraceterminaluKnihy", LzePodaniSablona = "LzePodaniSablona", LzeUctovani = "LzeUctovani",}
	const enum GPokKnihaPermissionsFragments { CanRead = "*", CanEdit = "*", LzePodat = "*", LzePodatDanovy = "*", LzePracovat = "*", LzeKontrolaDat = "*", LzePredani = "*", LzePrideleni = "*", LzePredaniPpd = "*", LzePredaniPok = "*", LzePrevzitPpd = "*", LzePredaniJinaKniha = "*", LzeTisk = "*", LzeUzaverkaRocni = "*", LzeHistorieKurzu = "*", LzeKurzovyRozdil = "*", LzeHromadnaZmenaKurzu = "*", LzeHromadnePreceneniZaloh = "*", LzeAdministraceterminaluKnihy = "*", LzePodaniSablona = "*", LzeUctovani = "*",}
	const enum GPokKnihaPermissionsTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanEdit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzePodatDanovy = "Gordic.General.ApplicationInterface.GPermission", LzePracovat = "Gordic.General.ApplicationInterface.GPermission", LzeKontrolaDat = "Gordic.General.ApplicationInterface.GPermission", LzePredani = "Gordic.General.ApplicationInterface.GPermission", LzePrideleni = "Gordic.General.ApplicationInterface.GPermission", LzePredaniPpd = "Gordic.General.ApplicationInterface.GPermission", LzePredaniPok = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitPpd = "Gordic.General.ApplicationInterface.GPermission", LzePredaniJinaKniha = "Gordic.General.ApplicationInterface.GPermission", LzeTisk = "Gordic.General.ApplicationInterface.GPermission", LzeUzaverkaRocni = "Gordic.General.ApplicationInterface.GPermission", LzeHistorieKurzu = "Gordic.General.ApplicationInterface.GPermission", LzeKurzovyRozdil = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnaZmenaKurzu = "Gordic.General.ApplicationInterface.GPermission", LzeHromadnePreceneniZaloh = "Gordic.General.ApplicationInterface.GPermission", LzeAdministraceterminaluKnihy = "Gordic.General.ApplicationInterface.GPermission", LzePodaniSablona = "Gordic.General.ApplicationInterface.GPermission", LzeUctovani = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPokKnihaPermissionsTypeLengths {}
	/**
	*     Filter pokladních ceniny
	*     
	*/
	const enum GPokCeninyFilter {
		/**
		*     PID pokladní knihy
		*     
		*/
		ixp_den,
		/**
		*     aktivita záznamu
		*     
		*/
		aktivita,
	}
	/**
	*     Filter pokladní knihy
	*     
	*/
	const enum GPokKnihaFilter {
		/**
		*     sada kontací
		*     
		*/
		ixs_vpk,
		/**
		*     typ účet. případu
		*     
		*/
		typ_upr_pri,
		/**
		*     typ upr výdajový
		*     
		*/
		typ_upr_vyd,
		/**
		*     pid knihy
		*     
		*/
		ixp_den,
		/**
		*     agenda hledaných knih
		*     
		*/
		faze,
		/**
		*     rok hledaných knih
		*     
		*/
		rok,
		/**
		*     aktivita knihy
		*     
		*/
		aktivita,
		/**
		*     funkce mající přístup k hledaným knihám
		*     
		*/
		pokvrfu_ixs_fun,
		/**
		*     ičo
		*     
		*/
		ico,
		/**
		*     účetní středisko
		*     
		*/
		ucs,
		/**
		*     sloupec subrada tabulky vas.pokvrfu
		*     
		*/
		pokvrfu_subrada,
		/**
		*     měna knihy
		*     
		*/
		mena,
		/**
		*     uus
		*     
		*/
		uus,
		/**
		*     název
		*     
		*/
		nazev,
	}
	/**
	*     filtr seznamu kurzů
	*     
	*/
	const enum GPokHistKurzuFilter {
		/**
		*     pid knihy
		*     
		*/
		ixp_den,
		/**
		*     Platnost kurzu
		*     
		*/
		platnost_interval,
	}
	/**
	*     filtr účty term knihy
	*     
	*/
	const enum GPokUctyTerminaluKnihyFilter {
		/**
		*     kniha
		*     
		*/
		ixp_den,
		/**
		*     id term
		*     
		*/
		pos_id,
		/**
		*     účet
		*     
		*/
		bu_vl,
		/**
		*     účet
		*     
		*/
		sk_vl,
		/**
		*     aktivita
		*     
		*/
		aktivita,
		/**
		*     dat zmena
		*     
		*/
		dat_zmena,
		/**
		*     změnu provedl
		*     
		*/
		zmenu_prov,
	}
	/**
	*     Filter pokladní knihy
	*     
	*/
	const enum GPokskokFilter {
		/**
		*     radek
		*     
		*/
		radek,
		/**
		*     aktivita
		*     
		*/
		aktivita,
		/**
		*     nazev
		*     
		*/
		nazev,
		/**
		*     funkce (ginsfun)
		*     
		*/
		ixs_fun,
		/**
		*     sada kontací (poksvpk)
		*     
		*/
		ixs_vpk,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\PokKontace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pokladní doklad
	* @domain Pokladna
	* @businessObject Pokladní kontace
	*/
	interface PokKontace {
		/**Seznam pokladních kontací*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokskonDto>>;
		/**Seznam typu pokladních kontací*/
		listTypKontace(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokstkoDto>>;
		/**Detail pokladní kontace*/
		read(rq?:Gordic.Hpl.Interface.GPokskonDto|CallParams<GServiceReadRequest<Gordic.Hpl.Interface.GPokskonDto>>): _Task<GServiceReadRequest<Gordic.Hpl.Interface.GPokskonDto>,GServiceReadResponse<Gordic.Hpl.Interface.GPokskonDto>>;
		/**Vlastnosti pokladních kontací*/
		vlastnosti(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokvvkhDto>>;
		/**Vrátí řádky způsobu zaúčtování podle zadané kontace,typu uč. případu a kategorie*/
		radkyZpuZauFuc(rq?:CallParams<{typUpr:string,ktgUpo:number,ixsKon:string}>): _Task<{typUpr:string,ktgUpo:number,ixsKon:string},Gordic.Hpl.Interface.GPokRadkyZpuZauctovaniDto[]>;
		/**Načtení náhledu zpz s doplněnými údaji z pok položky*/
		radkyZpuZauFucPolozky(rq?:CallParams<{typUpr:string,ktgUpo:number,ixp:string,radek:number}>): _Task<{typUpr:string,ktgUpo:number,ixp:string,radek:number},Gordic.Hpl.Interface.GPokRadkyZpuZauctovaniDto[]>;
		/**Přidání kontace do oblíbených*/
		pridatKontaciOblibene(rq?:CallParams<{ixsVpk:string,ixsKon:string,ixpDen:string}>): _Task<{ixsVpk:string,ixsKon:string,ixpDen:string},void>;
		/**Přidání kontace do oblíbených*/
		odebratKontaciOblibene(rq?:CallParams<{ixsVpk:string,ixsKon:string,ixpDen:string}>): _Task<{ixsVpk:string,ixsKon:string,ixpDen:string},void>;
		/**K daným kontacím uloží hodnoty daných vlastností*/
		ulozitVlastnostiKontaci(rq?:CallParams<{ixsKon:string[],vlk:number,hodnoty:number[]}>): _Task<{ixsKon:string[],vlk:number,hodnoty:number[]},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PokKontace: ServiceBase & Catalog.PokKontace;
	}
	const PokKontace: Client["PokKontace"];
}
declare namespace Gordic.Hpl.Interface.LK.Isl {
	/**Filter pokladních kontací*/
	const enum GPokKontaceFilter {
		/**filtr dle názvu kontace*/
		nazev,
		/**příznak fk*/
		priz_fk,
		/**pokstko.ktg_typ (podselect)*/
		ktg_typ,
		/**pokskon.ixs_typ*/
		ixs_typ,
		/**pokskon.typ_phl*/
		typ_phl,
		/**pokskon.ixs_kon*/
		ixs_kon,
		/**pokskon.typ_kon, pokstko.typ_kon (pk)*/
		typ_kon,
		/**pokskon.ixs_vpk*/
		ixs_vpk,
		/**pokskon.kod*/
		kod,
		/**pokskon - sloupce typ_kon + kod*/
		typ_kon__kod,
		/**vlastnost kontace*/
		vlk,
		/**aktivita pokskon*/
		aktivita_pokskon,
		/**aktivita pokstko*/
		aktivita_pokstko,
		/**pid platby*/
		platba_pid,
	}
	/**filtr seznamu pokstko*/
	const enum GPokKontaceTypFilter {
		/**pokstko.ktg_typ*/
		ktg_typ,
		/**pokskon.ixs_typ*/
		ixs_typ,
		/**pokskon.typ_phl*/
		typ_phl,
		/**pokskon.typ_kon, pokstko.typ_kon (pk)*/
		typ_kon,
		/**pokskon.ixs_vpk*/
		ixs_vpk,
		/**Pid pokladní knihy*/
		ixp_den,
	}
	/**Filter vlastností pokladních kontací*/
	const enum GPokKontaceVlastnostiFilter {
		/**kontace*/
		ixs_kon,
		/**vlastnosti kontace*/
		vlk,
		/**hodnota*/
		hodnota,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\PokPolozka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pokladní doklad
	* @domain Pokladna
	* @businessObject Pokladní doklad - položka
	*/
	interface PokPolozka {
		/**Seznam pokladních položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokPolozkyDto>>;
		/**Výběr jedné pokladní položky*/
		read(rq?:Gordic.Hpl.Interface.GPokPolozkyDto|CallParams<GServiceReadRequest<Gordic.Hpl.Interface.GPokPolozkyDto>>): _Task<GServiceReadRequest<Gordic.Hpl.Interface.GPokPolozkyDto>,GServiceReadResponse<Gordic.Hpl.Interface.GPokPolozkyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PokPolozka: ServiceBase & Catalog.PokPolozka;
	}
	const PokPolozka: Client["PokPolozka"];
}
declare namespace Gordic.Hpl.Interface.LK.Isl {
	/**Filter pokladních položek*/
	const enum GPokPolozkaFilter {
		/**PID pokladního dokladu položky*/
		ixp,
		/**Řádek položky pokladního dokladu*/
		radek,
		/**Aktivita položky pokladního dokladu*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Hpl.Interface\LK\Isl\PokSablona.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Šablona pokladních dokladů
	*     
	* @domain Pokladna
	* @businessObject Šablona pokladního dokladu
	*/
	interface PokSablona {
		/**
		*     Seznam šablon POK
		*     
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokspitDto>>;
		/**
		*     Smazání pokladní šablony
		*     
		*/
		smazat(rq?:CallParams<{ixsPit:string,konPrirazeniZkratce:boolean}>): _Task<{ixsPit:string,konPrirazeniZkratce:boolean},void>;
		/**
		*     Detail pokladní šablony
		*     
		*/
		read(rq?:Gordic.Hpl.Interface.GPokspitDto|CallParams<GServiceReadRequest<Gordic.Hpl.Interface.GPokspitDto>>): _Task<GServiceReadRequest<Gordic.Hpl.Interface.GPokspitDto>,GServiceReadResponse<Gordic.Hpl.Interface.GPokspitDto>>;
		/**
		*     Permissions
		*     
		*/
		seznamPermissions(rq?:CallParams<{}>): _Task<{},Gordic.Hpl.Interface.LK.Isl.GPokSablonaPermissions>;
		/**
		*     Převod pokladních šablon
		*     
		*/
		prevod(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**
		*     založení nové pokladní šablony
		*     
		*/
		create(rq?:Gordic.Hpl.Interface.GPokspitDto|CallParams<GServiceSaveRequest<Gordic.Hpl.Interface.GPokspitDto>>): _Task<GServiceSaveRequest<Gordic.Hpl.Interface.GPokspitDto>,GServiceSaveResponse<Gordic.Hpl.Interface.GPokspitDto>>;
		/**
		*     Editace stávající pokladní šablony
		*     
		*/
		update(rq?:Gordic.Hpl.Interface.GPokspitDto|CallParams<GServiceSaveRequest<Gordic.Hpl.Interface.GPokspitDto>>): _Task<GServiceSaveRequest<Gordic.Hpl.Interface.GPokspitDto>,GServiceSaveResponse<Gordic.Hpl.Interface.GPokspitDto>>;
		/**
		*     Seznam zkratek pokladních šablon
		*     
		*/
		listZkratky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Hpl.Interface.GPokvzktDto>>;
		/**
		*     Nastavení pokladní šablony na danou zkratku
		*     
		*/
		nastavitZkratku(rq?:CallParams<{ixsPit:string,zkratka:number}>): _Task<{ixsPit:string,zkratka:number},void>;
		/**
		*     Vymaže všechny přiřazené zkratky
		*     
		*/
		vymazatZkratky(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PokSablona: ServiceBase & Catalog.PokSablona;
	}
	const PokSablona: Client["PokSablona"];
}
declare namespace Gordic.Hpl.Interface.LK.Isl {
	/**
	*     Množina oprávnění pro pokladní knihu
	*     
	*/
	interface GPokSablonaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**
		*     Lze smazat pokladní šablonu
		*     
		*/
		LzeSmazat: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Lze převést pokladní šablony do jiné knihy
		*     
		*/
		LzePrevod: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Lze založit novou pokladní šablonu
		*     
		*/
		LzeZalozit: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Lze editovat pokladní šablonu
		*     
		*/
		LzeUpravit: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Lze použít pokladní šablonu (podat pokladní doklad)
		*     
		*/
		LzePouzit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPokSablonaPermissionsNames { LzeSmazat = "LzeSmazat", LzePrevod = "LzePrevod", LzeZalozit = "LzeZalozit", LzeUpravit = "LzeUpravit", LzePouzit = "LzePouzit",}
	const enum GPokSablonaPermissionsFragments { LzeSmazat = "*", LzePrevod = "*", LzeZalozit = "*", LzeUpravit = "*", LzePouzit = "*",}
	const enum GPokSablonaPermissionsTypes { LzeSmazat = "Gordic.General.ApplicationInterface.GPermission", LzePrevod = "Gordic.General.ApplicationInterface.GPermission", LzeZalozit = "Gordic.General.ApplicationInterface.GPermission", LzeUpravit = "Gordic.General.ApplicationInterface.GPermission", LzePouzit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPokSablonaPermissionsTypeLengths {}
	/**
	*     Filter pokladních šablon
	*     
	*/
	const enum GPokSablonaFilter {
		/**
		*     PID pokladní šablony
		*     
		*/
		ixs_pit,
		/**
		*     aktivita
		*     
		*/
		aktivita,
		/**
		*     kniha
		*     
		*/
		ixp_den,
		/**
		*     nazev sablony
		*     
		*/
		nazev_sablony,
		/**
		*     radek??? Designer?
		*     
		*/
		radek,
	}
}

//#endregion

