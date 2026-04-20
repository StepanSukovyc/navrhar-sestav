/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rza.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rza.Interface\Gordic.Rza.Interface.csproj
*    created     2026-02-16 14:35:49
*    files       Dto\Gordic.Rza.Interface.GKompetentiFilterDto.d.ts
*                Dto\Gordic.Rza.Interface.GParamDetailDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaDokDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaDokumentyAPFilterDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaHistorieFilterDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaHistPKSDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaHrOpStruDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzahzahDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaKompetentiDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaNovyKompetentDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzasesuDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaspidDto.d.ts
*                Dto\Gordic.Rza.Interface.GRzaSpisPomDto.d.ts
*                Dto\Controls\Gordic.Rza.Inteface.GRzacdriDto.d.ts
*                Dto\Controls\Gordic.Rza.Inteface.GRzacduzDto.d.ts
*                Dto\Controls\Gordic.Rza.Inteface.GRzacnerDto.d.ts
*                Dto\Controls\Gordic.Rza.Inteface.GRzacpriDto.d.ts
*                Dto\Controls\Gordic.Rza.Inteface.GRzactfiDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacdzdDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzaceshDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacesnDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacessDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacesvDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacfzcDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzackpzDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzaclegDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacsexDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacsjiDto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzacsza.Dto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzactza.Dto.d.ts
*                Dto\Controls\Gordic.Rza.Interface.GRzaczpoDto.d.ts
*                Filters\Gordic.Rza.Interface.GRzaFiltrDto.d.ts
*                Service\Rza\Gordic.Rza.Interface.IGRzaHledani.d.ts
*                Service\Rza\Gordic.Rza.Interface.IGRzaSeznam.d.ts
*                Service\Rza\Detail\Gordic.Rza.Interface.IGRzaDetail.d.ts
*                Service\Rza\Detail\Dokumenty\Gordi.Rza.Interface.IGDokumentyAP.d.ts
*                Service\Rza\Detail\Historie\Gordi.Rza.Interface.IGRzaSeznamHistorie.d.ts
*                Service\Rza\Detail\Kompetenti\Gordic.Rza.Interface.IGRzaKompetenti.d.ts
*                Service\Rza\Detail\Prilohy\Gordic.Rza.Interface.IGWflsesxRza.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GKompetentiFilterDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DTO na filtrovani kompetentů*/
	interface GRzaKompetentiFilterDto {
		/**DBCOLUMN:rok*/
		ixs_zak?: string|null;
		/**DBCOLUMN:ico*/
		por_cislo?: number|null;
		/**DBCOLUMN:ico*/
		zpracovatel?: boolean|null;
	}
	const enum GRzaKompetentiFilterDtoNames { ixs_zak = "ixs_zak", por_cislo = "por_cislo", zpracovatel = "zpracovatel",}
	const enum GRzaKompetentiFilterDtoFragments { ixs_zak = "*", por_cislo = "*", zpracovatel = "*",}
	const enum GRzaKompetentiFilterDtoTypes { ixs_zak = "string", por_cislo = "number", zpracovatel = "boolean",}
	const enum GRzaKompetentiFilterDtoTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilKompetenti {
		/**ixs_zak*/
		ixs_zak,
		/**por_cislo*/
		por_cislo,
		/**isZpracovatel*/
		zpracovatel,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GParamDetailDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**detailRza*/
	interface GParamDetailDto {
		/**případ*/
		priDto?: Gordic.Pap.Interface.GRzaspriDto|null;
		/**pole subjektů*/
		esuDto?: Gordic.Rza.Interface.GRzasesuDto[]|null;
		rzasleg?: Gordic.Pap.Interface.GRzaslegDto|null;
	}
	const enum GParamDetailDtoNames { priDto = "priDto", esuDto = "esuDto", rzasleg = "rzasleg",}
	const enum GParamDetailDtoFragments { priDto = "*", esuDto = "*", rzasleg = "*",}
	const enum GParamDetailDtoTypes { priDto = "Gordic.Pap.Interface.GRzaspriDto", esuDto = "Gordic.Rza.Interface.GRzasesuDto[]", rzasleg = "Gordic.Pap.Interface.GRzaslegDto",}
	const enum GParamDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaDokDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**Rza dokumenty*/
	interface GRzaDokDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:rzahzah.ixs_zak*/
		ixp?: string|null;
	}
	const enum GRzaDokDtoNames { ixp = "ixp", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GRzaDokDtoFragments { ixp = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GRzaDokDtoTypes { ixp = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GRzaDokDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaDokumentyAPFilterDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DTO na filtrovani dokladů historie*/
	interface GRzaHistorieFilterDto {
		/**DBCOLUMN:rok*/
		ixs_zak?: string|null;
		/**DBCOLUMN:ico*/
		por_cislo?: number|null;
	}
	const enum GRzaHistorieFilterDtoNames { ixs_zak = "ixs_zak", por_cislo = "por_cislo",}
	const enum GRzaHistorieFilterDtoFragments { ixs_zak = "*", por_cislo = "*",}
	const enum GRzaHistorieFilterDtoTypes { ixs_zak = "string", por_cislo = "number",}
	const enum GRzaHistorieFilterDtoTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilHistorie {
		/**ixs_zak*/
		ixs_zak,
		/**por_cislo*/
		por_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaHistorieFilterDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DTO na filtrovani dokumentů AP*/
	interface GRzaDokumentyFilterDto {
		/**DBCOLUMN:rok*/
		ixs_zak?: string|null;
		/**DBCOLUMN:rok*/
		ixp?: string|null;
	}
	const enum GRzaDokumentyFilterDtoNames { ixs_zak = "ixs_zak", ixp = "ixp",}
	const enum GRzaDokumentyFilterDtoFragments { ixs_zak = "*", ixp = "*",}
	const enum GRzaDokumentyFilterDtoTypes { ixs_zak = "string", ixp = "string",}
	const enum GRzaDokumentyFilterDtoTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilDokumenty {
		/**ixs_zak*/
		ixs_zak,
		/**ixp*/
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaHistPKSDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**Historie PKS*/
	interface GRzaHistPKSDto {
		ixp?: string|null;
		nazev?: string|null;
		akt_znacka?: string|null;
		dat_pod?: JsonDate|null;
	}
	const enum GRzaHistPKSDtoNames { ixp = "ixp", nazev = "nazev", akt_znacka = "akt_znacka", dat_pod = "dat_pod",}
	const enum GRzaHistPKSDtoFragments { ixp = "*", nazev = "*", akt_znacka = "*", dat_pod = "*",}
	const enum GRzaHistPKSDtoTypes { ixp = "string", nazev = "string", akt_znacka = "string", dat_pod = "JsonDate",}
	const enum GRzaHistPKSDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaHrOpStruDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**Pomocné Dto pro HO*/
	interface GRzaHrOpStruDto {
		/**ixp_pri pro schválení*/
		identifikator?: string|null;
		/**stav případu*/
		stav?: number|null;
		ac?: string|null;
		ac_ag?: string|null;
		nazev?: string|null;
		stav_txt?: string|null;
		vlastnik?: string|null;
		vlastnikIdent?: string|null;
		ixp_den?: string|null;
		/**ixp_den_txt*/
		ixp_den_txt?: string|null;
		/**zpracovatel*/
		zpracovatel?: string|null;
		/**zpracovatel*/
		zpracovatel_txt?: string|null;
		/**stav exportu*/
		sta_exp?: number|null;
		/**stav exportu*/
		sta_exp_txt?: string|null;
		/**stav exportu*/
		ixb?: string|null;
		/**stav exportu*/
		popis?: string|null;
		/**stav exportu*/
		soubor?: string|null;
		/**typ dokumentu*/
		typ_doza?: number|null;
		/**typ dokumentu*/
		typ_doza_txt?: string|null;
		/**Nen kód*/
		vz_cislo_inen?: string|null;
		/**typ dokumentu*/
		por_cis?: number|null;
		/**příznak zadávacího dokumentu*/
		priz_zd?: number|null;
		/**verse*/
		cis_ver?: number|null;
		/**verse*/
		dokumenty_pripadu?: boolean|null;
	}
	const enum GRzaHrOpStruDtoNames { identifikator = "identifikator", stav = "stav", ac = "ac", ac_ag = "ac_ag", nazev = "nazev", stav_txt = "stav_txt", vlastnik = "vlastnik", vlastnikIdent = "vlastnikIdent", ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", zpracovatel = "zpracovatel", zpracovatel_txt = "zpracovatel_txt", sta_exp = "sta_exp", sta_exp_txt = "sta_exp_txt", ixb = "ixb", popis = "popis", soubor = "soubor", typ_doza = "typ_doza", typ_doza_txt = "typ_doza_txt", vz_cislo_inen = "vz_cislo_inen", por_cis = "por_cis", priz_zd = "priz_zd", cis_ver = "cis_ver", dokumenty_pripadu = "dokumenty_pripadu",}
	const enum GRzaHrOpStruDtoFragments { identifikator = "*", stav = "*", ac = "*", ac_ag = "*", nazev = "*", stav_txt = "*", vlastnik = "*", vlastnikIdent = "*", ixp_den = "*", ixp_den_txt = "*", zpracovatel = "*", zpracovatel_txt = "*", sta_exp = "*", sta_exp_txt = "*", ixb = "*", popis = "*", soubor = "*", typ_doza = "*", typ_doza_txt = "*", vz_cislo_inen = "*", por_cis = "*", priz_zd = "*", cis_ver = "*", dokumenty_pripadu = "*",}
	const enum GRzaHrOpStruDtoTypes { identifikator = "string", stav = "number", ac = "string", ac_ag = "string", nazev = "string", stav_txt = "string", vlastnik = "string", vlastnikIdent = "string", ixp_den = "string", ixp_den_txt = "string", zpracovatel = "string", zpracovatel_txt = "string", sta_exp = "number", sta_exp_txt = "string", ixb = "string", popis = "string", soubor = "string", typ_doza = "number", typ_doza_txt = "string", vz_cislo_inen = "string", por_cis = "number", priz_zd = "number", cis_ver = "number", dokumenty_pripadu = "boolean",}
	const enum GRzaHrOpStruDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzahzahDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzahzah*/
	interface GRzahzahDto {
		/**DBCOLUMN:rzahzah.ixs_zak*/
		ixs_zak?: string|null;
		/**DBCOLUMN:rzahzah.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:rzahzah.popis*/
		zmena_txt?: string|null;
		/**DBCOLUMN:rzahzah.up_popis*/
		poznamka?: string|null;
		/**DBCOLUMN:rzahzah.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rzahzah.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzahzah.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rzahzah.nazef_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:rzahzah.kod_zmena_txt*/
		kod_zmena_txt?: string|null;
		puvod?: string|null;
	}
	const enum GRzahzahDtoNames { ixs_zak = "ixs_zak", por_cislo = "por_cislo", zmena_txt = "zmena_txt", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", kod_zmena_txt = "kod_zmena_txt", puvod = "puvod",}
	const enum GRzahzahDtoFragments { ixs_zak = "*", por_cislo = "*", zmena_txt = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", kod_zmena_txt = "*", puvod = "*",}
	const enum GRzahzahDtoTypes { ixs_zak = "string", por_cislo = "number", zmena_txt = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", kod_zmena_txt = "string", puvod = "string",}
	const enum GRzahzahDtoTypeLengths { ixs_zak = 12, zmena_txt = 254, poznamka = 254, zmenu_prov = 12, kod_zmena_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaKompetentiDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**Kompetenti RZA DTO*/
	interface GRzaKompetentiDto {
		/**DBCOLUMN:ixs_zak*/
		ixs_zak?: string|null;
		/**DBCOLUMN:SeznamKompetentu.ico*/
		ixs_fun?: string|null;
		/**Nový - 2, odstranit -3*/
		cisloAkce?: number|null;
		/**DBCOLUMN:SeznamKompetentu.ixs_fun_txt*/
		ixs_fun_txt?: string|null;
		/**DBCOLUMN:SeznamKompetentu.ico*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamKompetentu.cislo*/
		por_cis?: number|null;
		ixs_orj?: string|null;
		ixs_orj_nazev?: string|null;
		/**Typ 1 - kompetent, 2 - orj*/
		typ?: number|null;
		/**stupeň přístupu*/
		kod_tzp?: number|null;
	}
	const enum GRzaKompetentiDtoNames { ixs_zak = "ixs_zak", ixs_fun = "ixs_fun", cisloAkce = "cisloAkce", ixs_fun_txt = "ixs_fun_txt", cis_real = "cis_real", por_cis = "por_cis", ixs_orj = "ixs_orj", ixs_orj_nazev = "ixs_orj_nazev", typ = "typ", kod_tzp = "kod_tzp",}
	const enum GRzaKompetentiDtoFragments { ixs_zak = "*", ixs_fun = "*", cisloAkce = "*", ixs_fun_txt = "*", cis_real = "*", por_cis = "*", ixs_orj = "*", ixs_orj_nazev = "*", typ = "*", kod_tzp = "*",}
	const enum GRzaKompetentiDtoTypes { ixs_zak = "string", ixs_fun = "string", cisloAkce = "number", ixs_fun_txt = "string", cis_real = "string", por_cis = "number", ixs_orj = "string", ixs_orj_nazev = "string", typ = "number", kod_tzp = "number",}
	const enum GRzaKompetentiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaNovyKompetentDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**Kompetenti RZA DTO*/
	interface GRzaNovyKompetentDto {
		/**DBCOLUMN:ixs_zak*/
		ixs_fun?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**nazev_ref*/
		nazev_ref?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**nazev_su*/
		nazev_su?: string|null;
		/**nazev_orj*/
		nazev_orj?: string|null;
		/**cis_real*/
		cis_real?: string|null;
		/**num_komp*/
		num_komp?: string|null;
		/**nazev*/
		nazev_usr?: string|null;
		/**nazev*/
		nazev_ins?: string|null;
	}
	const enum GRzaNovyKompetentDtoNames { ixs_fun = "ixs_fun", nazev = "nazev", nazev_ref = "nazev_ref", nazev_rf = "nazev_rf", nazev_su = "nazev_su", nazev_orj = "nazev_orj", cis_real = "cis_real", num_komp = "num_komp", nazev_usr = "nazev_usr", nazev_ins = "nazev_ins",}
	const enum GRzaNovyKompetentDtoFragments { ixs_fun = "*", nazev = "*", nazev_ref = "*", nazev_rf = "*", nazev_su = "*", nazev_orj = "*", cis_real = "*", num_komp = "*", nazev_usr = "*", nazev_ins = "*",}
	const enum GRzaNovyKompetentDtoTypes { ixs_fun = "string", nazev = "string", nazev_ref = "string", nazev_rf = "string", nazev_su = "string", nazev_orj = "string", cis_real = "string", num_komp = "string", nazev_usr = "string", nazev_ins = "string",}
	const enum GRzaNovyKompetentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzasesuDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzasesu*/
	interface GRzasesuDto {
		/**DBCOLUMN:rzasesu.ixs_zak*/
		ixs_zak?: string|null;
		/**DBCOLUMN:rzasesu.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:rzasesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:rzasesu.ser_cis*/
		ser_cis?: number|null;
		/**DBCOLUMN:rzasesu.ixs_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:rzasesu.dat_pre_nab*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:rzasesu.sta_jis*/
		sta_jis?: number|null;
		/**DBCOLUMN:rzasesu.sta_jis*/
		sta_jis_txt?: string|null;
		/**DBCOLUMN:rzasesu.dat_jis*/
		dat_jis?: JsonDate|null;
		/**DBCOLUMN:rzasesu.dat_lhu_pod*/
		dat_lhu_pod?: JsonDate|null;
		/**DBCOLUMN:rzasesu.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:rzasesu.bu_ci_txt*/
		bu_ci_txt?: string|null;
		/**DBCOLUMN:rzasesu.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:rzasesu.dat_vyz*/
		dat_vyz?: JsonDate|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_esn?: number|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_esn_txt?: string|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_esv?: number|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_esv_txt?: string|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_esh?: number|null;
		/**DBCOLUMN:rzasesu.s_ess*/
		s_esh_txt?: string|null;
		/**DBCOLUMN:rzasesu.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:rzasesu.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:rzasesu.c_nav_bez*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:rzasesu.c_nav*/
		c_nav?: JsonDecimal|null;
		/**DBCOLUMN:rzasesu.dis_zad*/
		dis_zad?: number|null;
		/**DBCOLUMN:rzasesu.vs_dzd*/
		vs_dzd?: string|null;
		/**DBCOLUMN:rzasesu.ss_dzd*/
		ss_dzd?: string|null;
		/**DBCOLUMN:rzasesu.misto_pod*/
		misto_pod?: string|null;
		/**DBCOLUMN:rzasesu.zpu_pod*/
		zpu_pod?: number|null;
		/**DBCOLUMN:rzasesu.zpu_pod*/
		zpu_pod_txt?: string|null;
		/**DBCOLUMN:rzasesu.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:rzasesu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzasesu.zmenu_prov*/
		zmenu_prov?: string|null;
		zmenu_prov_txt?: string|null;
		isNovy?: boolean|null;
		priz_vaz_sml?: number|null;
		ixs_zak_cast?: string|null;
		por_cis_nab_cast?: number|null;
		ixs_esu_cast?: string|null;
	}
	const enum GRzasesuDtoNames { ixs_zak = "ixs_zak", por_cis_nab = "por_cis_nab", ixs_esu = "ixs_esu", ser_cis = "ser_cis", ixs_esu_txt = "ixs_esu_txt", dat_pre_nab = "dat_pre_nab", sta_jis = "sta_jis", sta_jis_txt = "sta_jis_txt", dat_jis = "dat_jis", dat_lhu_pod = "dat_lhu_pod", bu_ci = "bu_ci", bu_ci_txt = "bu_ci_txt", sk_ci = "sk_ci", dat_vyz = "dat_vyz", s_ess = "s_ess", s_ess_txt = "s_ess_txt", s_esn = "s_esn", s_esn_txt = "s_esn_txt", s_esv = "s_esv", s_esv_txt = "s_esv_txt", s_esh = "s_esh", s_esh_txt = "s_esh_txt", lic_zast = "lic_zast", por_zast = "por_zast", lic = "lic", c_nav_bez = "c_nav_bez", c_nav = "c_nav", dis_zad = "dis_zad", vs_dzd = "vs_dzd", ss_dzd = "ss_dzd", misto_pod = "misto_pod", zpu_pod = "zpu_pod", zpu_pod_txt = "zpu_pod_txt", ixp_nab = "ixp_nab", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", isNovy = "isNovy", priz_vaz_sml = "priz_vaz_sml", ixs_zak_cast = "ixs_zak_cast", por_cis_nab_cast = "por_cis_nab_cast", ixs_esu_cast = "ixs_esu_cast",}
	const enum GRzasesuDtoFragments { ixs_zak = "*", por_cis_nab = "*", ixs_esu = "*", ser_cis = "*", ixs_esu_txt = "*", dat_pre_nab = "*", sta_jis = "*", sta_jis_txt = "*", dat_jis = "*", dat_lhu_pod = "*", bu_ci = "*", bu_ci_txt = "*", sk_ci = "*", dat_vyz = "*", s_ess = "*", s_ess_txt = "*", s_esn = "*", s_esn_txt = "*", s_esv = "*", s_esv_txt = "*", s_esh = "*", s_esh_txt = "*", lic_zast = "*", por_zast = "*", lic = "*", c_nav_bez = "*", c_nav = "*", dis_zad = "*", vs_dzd = "*", ss_dzd = "*", misto_pod = "*", zpu_pod = "*", zpu_pod_txt = "*", ixp_nab = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", isNovy = "*", priz_vaz_sml = "*", ixs_zak_cast = "*", por_cis_nab_cast = "*", ixs_esu_cast = "*",}
	const enum GRzasesuDtoTypes { ixs_zak = "string", por_cis_nab = "number", ixs_esu = "string", ser_cis = "number", ixs_esu_txt = "string", dat_pre_nab = "JsonDate", sta_jis = "number", sta_jis_txt = "string", dat_jis = "JsonDate", dat_lhu_pod = "JsonDate", bu_ci = "string", bu_ci_txt = "string", sk_ci = "string", dat_vyz = "JsonDate", s_ess = "number", s_ess_txt = "string", s_esn = "number", s_esn_txt = "string", s_esv = "number", s_esv_txt = "string", s_esh = "number", s_esh_txt = "string", lic_zast = "string", por_zast = "number", lic = "string", c_nav_bez = "JsonDecimal", c_nav = "JsonDecimal", dis_zad = "number", vs_dzd = "string", ss_dzd = "string", misto_pod = "string", zpu_pod = "number", zpu_pod_txt = "string", ixp_nab = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", isNovy = "boolean", priz_vaz_sml = "number", ixs_zak_cast = "string", por_cis_nab_cast = "number", ixs_esu_cast = "string",}
	const enum GRzasesuDtoTypeLengths { ixs_zak = 12, ixs_esu = 12, bu_ci = 34, sk_ci = 11, lic_zast = 4, vs_dzd = 12, ss_dzd = 12, misto_pod = 150, ixp_nab = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaspidDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzaspid*/
	interface GRzaspidDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:rzaspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:rzaspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:rzaspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:rzaspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rzaspid.rok*/
		rok?: number|null;
		/**DBCOLUMN:schval_proc*/
		schval_proc?: number|null;
		/**DBCOLUMN:rzaspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:rzaspid.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:rzaspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:rzaspid.ktg_typ*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:rzaspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:rzaspid.ixs_typ*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:rzaspid.ixs_zak*/
		ixs_zak?: string|null;
		/**DBCOLUMN:rzaspid.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:rzaspid.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:rzaspid.leg_usm*/
		leg_usm?: number|null;
		/**DBCOLUMN:rzaspri.leg_usm*/
		leg_usm_txt?: string|null;
		/**DBCOLUMN:rzaspid.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:rzaspri.cis_real*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:rzaspid.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:rzaspid.def_fzc*/
		def_fzc?: number|null;
		/**DBCOLUMN:rzaspid.def_fzc*/
		zpu_rea?: number|null;
		/**DBCOLUMN:rzaspid.def_fzc*/
		s_zak?: number|null;
		/**DBCOLUMN:rzaspri.def_fzc*/
		def_fzc_txt?: string|null;
		/**DBCOLUMN:rzaspid.leg_usm_par*/
		leg_usm_par?: number|null;
		/**DBCOLUMN:rzaspri.leg_usm_par_txt*/
		leg_usm_par_txt?: string|null;
		/**DBCOLUMN:rzaspid.dat_pis*/
		dat_pis?: JsonDate|null;
		/**DBCOLUMN:rzaspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:rzaspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzaspid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rzaspri.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:rzaspid.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:rzaspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:rzaspid.ixs_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:rzaspid.prijal*/
		prijal?: string|null;
		/**DBCOLUMN:rzaspid.ixs_esu_opr*/
		ixs_esu_opr?: string|null;
		/**DBCOLUMN:rzaspid.ixs_esu*/
		ixs_esu_opr_txt?: string|null;
		/**DBCOLUMN:rzaspid.rza_stav*/
		rza_stav?: number|null;
		/**DBCOLUMN:rzaspid.rza_stav_txt*/
		rza_stav_txt?: string|null;
		/**DBCOLUMN:rzaspid.ser_cis_pri*/
		ser_cis_pri?: number|null;
		/**DBCOLUMN:rzaspid.ser_cis_esu*/
		ser_cis_esu?: number|null;
		/**DBCOLUMN:rzaspid.cj_rza*/
		cj_rza?: string|null;
		/**DBCOLUMN:rzaspid.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:rzaspid.priz_view*/
		priz_view?: number|null;
		readOnly?: boolean|null;
		/**DBCOLUMN:rzaspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:vfpspid.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:vfpspid.por_zast*/
		por_zast?: number|null;
	}
	const enum GRzaspidDtoNames { ixp = "ixp", nazev_rf = "nazev_rf", lic = "lic", ico = "ico", ucs = "ucs", rok = "rok", schval_proc = "schval_proc", ac = "ac", ac_ag = "ac_ag", ktg_typ = "ktg_typ", ktg_typ_txt = "ktg_typ_txt", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", ixs_zak = "ixs_zak", nazev = "nazev", dat_prij_pod = "dat_prij_pod", leg_usm = "leg_usm", leg_usm_txt = "leg_usm_txt", cis_real = "cis_real", cis_real_nazev = "cis_real_nazev", ixs_fun_komp = "ixs_fun_komp", def_fzc = "def_fzc", zpu_rea = "zpu_rea", s_zak = "s_zak", def_fzc_txt = "def_fzc_txt", leg_usm_par = "leg_usm_par", leg_usm_par_txt = "leg_usm_par_txt", dat_pis = "dat_pis", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", por_cis_nab = "por_cis_nab", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", prijal = "prijal", ixs_esu_opr = "ixs_esu_opr", ixs_esu_opr_txt = "ixs_esu_opr_txt", rza_stav = "rza_stav", rza_stav_txt = "rza_stav_txt", ser_cis_pri = "ser_cis_pri", ser_cis_esu = "ser_cis_esu", cj_rza = "cj_rza", poznamka = "poznamka", priz_view = "priz_view", readOnly = "readOnly", ixs_fun_akt = "ixs_fun_akt", lic_zast = "lic_zast", por_zast = "por_zast", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GRzaspidDtoFragments { ixp = "*", nazev_rf = "*", lic = "*", ico = "*", ucs = "*", rok = "*", schval_proc = "*", ac = "*", ac_ag = "*", ktg_typ = "*", ktg_typ_txt = "*", ixs_typ = "*", ixs_typ_txt = "*", ixs_zak = "*", nazev = "*", dat_prij_pod = "*", leg_usm = "*", leg_usm_txt = "*", cis_real = "*", cis_real_nazev = "*", ixs_fun_komp = "*", def_fzc = "*", zpu_rea = "*", s_zak = "*", def_fzc_txt = "*", leg_usm_par = "*", leg_usm_par_txt = "*", dat_pis = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", por_cis_nab = "*", ixs_esu = "*", ixs_esu_txt = "*", prijal = "*", ixs_esu_opr = "*", ixs_esu_opr_txt = "*", rza_stav = "*", rza_stav_txt = "*", ser_cis_pri = "*", ser_cis_esu = "*", cj_rza = "*", poznamka = "*", priz_view = "*", readOnly = "*", ixs_fun_akt = "*", lic_zast = "*", por_zast = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GRzaspidDtoTypes { ixp = "string", nazev_rf = "string", lic = "string", ico = "string", ucs = "string", rok = "number", schval_proc = "number", ac = "string", ac_ag = "string", ktg_typ = "number", ktg_typ_txt = "string", ixs_typ = "string", ixs_typ_txt = "string", ixs_zak = "string", nazev = "string", dat_prij_pod = "JsonDate", leg_usm = "number", leg_usm_txt = "string", cis_real = "string", cis_real_nazev = "string", ixs_fun_komp = "string", def_fzc = "number", zpu_rea = "number", s_zak = "number", def_fzc_txt = "string", leg_usm_par = "number", leg_usm_par_txt = "string", dat_pis = "JsonDate", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", por_cis_nab = "number", ixs_esu = "string", ixs_esu_txt = "string", prijal = "string", ixs_esu_opr = "string", ixs_esu_opr_txt = "string", rza_stav = "number", rza_stav_txt = "string", ser_cis_pri = "number", ser_cis_esu = "number", cj_rza = "string", poznamka = "string", priz_view = "number", readOnly = "boolean", ixs_fun_akt = "string", lic_zast = "string", por_zast = "number", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GRzaspidDtoTypeLengths { ixp = 12, nazev_rf = 50, lic = 4, ico = 10, ucs = 10, ac = 30, ac_ag = 20, ixs_typ = 12, ixs_zak = 12, cis_real = 6, ixs_fun_komp = 12, popis = 254, zmenu_prov = 12, ixs_esu = 12, prijal = 30, ixs_esu_opr = 12, cj_rza = 30, poznamka = 254, lic_zast = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Gordic.Rza.Interface.GRzaSpisPomDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**Pomocné Dto pro spis*/
	interface GRzaSpisPomDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:rzaspri.ixp*/
		ixp?: string|null;
	}
	const enum GRzaSpisPomDtoNames { ixp = "ixp", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GRzaSpisPomDtoFragments { ixp = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GRzaSpisPomDtoTypes { ixp = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GRzaSpisPomDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Inteface.GRzacdriDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacdri*/
	interface GRzacdriDto {
		/**DBCOLUMN:rzacdri.dri_pri*/
		dri_pri?: number|null;
		/**DBCOLUMN:rzacdri.dri_pri_txt*/
		dri_pri_txt?: string|null;
		/**DBCOLUMN:rzacdri.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacdri.k_s*/
		k_s?: string|null;
	}
	const enum GRzacdriDtoNames { dri_pri = "dri_pri", dri_pri_txt = "dri_pri_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacdriDtoFragments { dri_pri = "*", dri_pri_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacdriDtoTypes { dri_pri = "number", dri_pri_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacdriDtoTypeLengths { dri_pri_txt = 100, k_s = 15,}
	/**ENUM:rzacdri*/
	const enum GRzacdriEnum {
		/**Neurčeno*/
		_0=0,
		/**Uzavřená výzva*/
		_10=10,
		/**Otevřená výzva*/
		_20=20,
		/**Elektronická aukce*/
		_30=30,
		/**Minitendr na základě rámcové dohody*/
		_40=40,
	}
	function GRzacdriEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacdriEnum, Gordic.Rza.Interface.GRzacdriDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Inteface.GRzacduzDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacduz*/
	interface GRzacduzDto {
		/**DBCOLUMN:rzacduz.duz_zak*/
		duz_zak?: number|null;
		/**DBCOLUMN:rzacduz.duz_zak_txt*/
		duz_zak_txt?: string|null;
		/**DBCOLUMN:rzacduz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacduz.k_s*/
		k_s?: string|null;
	}
	const enum GRzacduzDtoNames { duz_zak = "duz_zak", duz_zak_txt = "duz_zak_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacduzDtoFragments { duz_zak = "*", duz_zak_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacduzDtoTypes { duz_zak = "number", duz_zak_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacduzDtoTypeLengths { duz_zak_txt = 100, k_s = 15,}
	/**ENUM:rzacduz*/
	const enum GRzacduzEnum {
		/**Neurčeno*/
		_0=0,
		/**Časové důvody (není dostatek času na realizaci)*/
		_10=10,
		/**Nedostatečné finanční krytí*/
		_20=20,
		/**Neexistuje dodavatel*/
		_30=30,
		/**Nepodání nabídek*/
		_40=40,
		/**Nepodána žádná nabídka*/
		_50=50,
		/**Nepředvídatelné okolnosti*/
		_60=60,
		/**Neuzavření smluv uchazeči*/
		_70=70,
		/**Neuzavření smlouvy zadavatelem*/
		_80=80,
		/**Neuzavřena smlouva s 3.pořadí*/
		_90=90,
		/**Odmítnutí nabídek*/
		_100=100,
		/**Odstoupení od smlouvy ze strany zadavatele*/
		_110=110,
		/**Odstoupení od smlouvy ze strany dodavatele*/
		_120=120,
		/**Podstatná změna okolností*/
		_130=130,
		/**Rozhodnutí zadavatele*/
		_140=140,
		/**Rozhodnutí ÚOHS*/
		_150=150,
		/**Vyloučení všech uchazečů*/
		_160=160,
		/**Zrušen uživatelem*/
		_170=170,
		/**Zrušena soutěž (zákonné důvody)*/
		_180=180,
		/**Jiný důvod*/
		_200=200,
	}
	function GRzacduzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacduzEnum, Gordic.Rza.Interface.GRzacduzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Inteface.GRzacnerDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacner*/
	interface GRzacnerDto {
		/**DBCOLUMN:rzacner.ner_zak*/
		ner_zak?: number|null;
		/**DBCOLUMN:rzacner.ner_zak_txt*/
		ner_zak_txt?: string|null;
		/**DBCOLUMN:rzacner.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacner.k_s*/
		k_s?: string|null;
	}
	const enum GRzacnerDtoNames { ner_zak = "ner_zak", ner_zak_txt = "ner_zak_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacnerDtoFragments { ner_zak = "*", ner_zak_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacnerDtoTypes { ner_zak = "number", ner_zak_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacnerDtoTypeLengths { ner_zak_txt = 100, k_s = 15,}
	/**ENUM:rzacner*/
	const enum GRzacnerEnum {
		/**Neurčeno*/
		_0=0,
		/**V realizaci*/
		_1=1,
		/**Spící zakázka (dosud nezaháj. práce na její real.)*/
		_2=2,
		/**Zrušena*/
		_3=3,
	}
	function GRzacnerEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacnerEnum, Gordic.Rza.Interface.GRzacnerDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Inteface.GRzacpriDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacpri*/
	interface GRzacpriDto {
		/**DBCOLUMN:rzacpri.pri_zak*/
		pri_zak?: number|null;
		/**DBCOLUMN:rzacpri.pri_zak_txt*/
		pri_zak_txt?: string|null;
		/**DBCOLUMN:rzacpri.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacpri.k_s*/
		k_s?: string|null;
	}
	const enum GRzacpriDtoNames { pri_zak = "pri_zak", pri_zak_txt = "pri_zak_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacpriDtoFragments { pri_zak = "*", pri_zak_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacpriDtoTypes { pri_zak = "number", pri_zak_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacpriDtoTypeLengths { pri_zak_txt = 100, k_s = 15,}
	/**ENUM:rzacpri*/
	const enum GRzacpriEnum {
		/**Priorita 0*/
		_0=0,
		/**Priorita 1*/
		_1=1,
		/**Priorita 2*/
		_2=2,
	}
	function GRzacpriEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacpriEnum, Gordic.Rza.Interface.GRzacpriDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Inteface.GRzactfiDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzactfi*/
	interface GRzactfiDto {
		/**DBCOLUMN:rzactfi.tfi_pri*/
		tfi_pri?: number|null;
		/**DBCOLUMN:rzactfi.tfi_pri_txt*/
		tfi_pri_txt?: string|null;
		/**DBCOLUMN:rzactfi.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzactfi.k_s*/
		k_s?: string|null;
	}
	const enum GRzactfiDtoNames { tfi_pri = "tfi_pri", tfi_pri_txt = "tfi_pri_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzactfiDtoFragments { tfi_pri = "*", tfi_pri_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzactfiDtoTypes { tfi_pri = "number", tfi_pri_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzactfiDtoTypeLengths { tfi_pri_txt = 100, k_s = 15,}
	/**ENUM:rzactfi*/
	const enum GRzactfiEnum {
		/**Neurčeno*/
		_0=0,
		/**Pevné financování*/
		_1=1,
		/**Volné financování*/
		_2=2,
	}
	function GRzactfiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzactfiEnum, Gordic.Rza.Interface.GRzactfiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacdzdDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacdzd*/
	interface GRzacdzdDto {
		/**DBCOLUMN:rzacdzd.dis_zad*/
		dis_zad?: number|null;
		/**DBCOLUMN:rzacdzd.dis_zad_txt*/
		dis_zad_txt?: string|null;
		/**DBCOLUMN:rzacdzd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacdzd.k_s*/
		k_s?: string|null;
	}
	const enum GRzacdzdDtoNames { dis_zad = "dis_zad", dis_zad_txt = "dis_zad_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacdzdDtoFragments { dis_zad = "*", dis_zad_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacdzdDtoTypes { dis_zad = "number", dis_zad_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacdzdDtoTypeLengths { dis_zad_txt = 50, k_s = 15,}
	/**ENUM:rzacdzd*/
	const enum GRzacdzdEnum {
		/**Neurčeno*/
		_0=0,
		/**Nespecifikováno*/
		_10=10,
		/**Přímý dálkový přístup*/
		_20=20,
		/**Předáno v listinné podobě*/
		_30=30,
		/**Zasláno v listinné podobě*/
		_40=40,
		/**Předáno v elektronické podobě*/
		_50=50,
		/**Zasláno v elektronické podobě*/
		_60=60,
	}
	function GRzacdzdEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacdzdEnum, Gordic.Rza.Interface.GRzacdzdDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzaceshDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacesh*/
	interface GRzaceshDto {
		/**DBCOLUMN:rzacesh.s_esh*/
		s_esh?: number|null;
		/**DBCOLUMN:rzacesh.s_esh_txt*/
		s_esh_txt?: string|null;
		/**DBCOLUMN:rzacesh.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacesh.k_s*/
		k_s?: string|null;
	}
	const enum GRzaceshDtoNames { s_esh = "s_esh", s_esh_txt = "s_esh_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzaceshDtoFragments { s_esh = "*", s_esh_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzaceshDtoTypes { s_esh = "number", s_esh_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzaceshDtoTypeLengths { s_esh_txt = 50, k_s = 15,}
	/**ENUM:rzacesh*/
	const enum GRzaceshEnum {
		/**Neurčeno*/
		_0=0,
		/**1. pořadí*/
		_40=40,
		/**Dílčí plnění*/
		_45=45,
		/**2. pořadí*/
		_60=60,
		/**3. pořadí*/
		_65=65,
		/**Další pořadí*/
		_70=70,
		/**Vyřazen*/
		_80=80,
	}
	function GRzaceshEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzaceshEnum, Gordic.Rza.Interface.GRzaceshDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacesnDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacesn*/
	interface GRzacesnDto {
		/**DBCOLUMN:rzacesn.s_esn*/
		s_esn?: number|null;
		/**DBCOLUMN:rzacesn.s_esn_txt*/
		s_esn_txt?: string|null;
		/**DBCOLUMN:rzacesn.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacesn.k_s*/
		k_s?: string|null;
	}
	const enum GRzacesnDtoNames { s_esn = "s_esn", s_esn_txt = "s_esn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacesnDtoFragments { s_esn = "*", s_esn_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacesnDtoTypes { s_esn = "number", s_esn_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacesnDtoTypeLengths { s_esn_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacessDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacess*/
	interface GRzacessDto {
		/**DBCOLUMN:rzacess.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:rzacess.s_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:rzacess.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacess.k_s*/
		k_s?: string|null;
	}
	const enum GRzacessDtoNames { s_ess = "s_ess", s_ess_txt = "s_ess_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacessDtoFragments { s_ess = "*", s_ess_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacessDtoTypes { s_ess = "number", s_ess_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacessDtoTypeLengths { s_ess_txt = 50, k_s = 15,}
	/**ENUM:rzacess*/
	const enum GRzacessEnum {
		/**Neurčeno*/
		_0=0,
		/**Návrh*/
		_5=5,
	}
	function GRzacessEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacessEnum, Gordic.Rza.Interface.GRzacessDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacesvDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacesv*/
	interface GRzacesvDto {
		/**DBCOLUMN:rzacesv.s_esv*/
		s_esv?: number|null;
		/**DBCOLUMN:rzacesv.s_esv_txt*/
		s_esv_txt?: string|null;
		/**DBCOLUMN:rzacesv.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacesv.k_s*/
		k_s?: string|null;
	}
	const enum GRzacesvDtoNames { s_esv = "s_esv", s_esv_txt = "s_esv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacesvDtoFragments { s_esv = "*", s_esv_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacesvDtoTypes { s_esv = "number", s_esv_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacesvDtoTypeLengths { s_esv_txt = 50, k_s = 15,}
	/**ENUM:rzacesv*/
	const enum GRzacesvEnum {
		/**Neurčeno*/
		_0=0,
		/**Vyzván*/
		_10=10,
		/**Nevyzván*/
		_13=13,
		/**Vyzván k jednání*/
		_15=15,
		/**Nevyzván k jednání*/
		_17=17,
	}
	function GRzacesvEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacesvEnum, Gordic.Rza.Interface.GRzacesvDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacfzcDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacfzc*/
	interface GRzacfzcDto {
		/**DBCOLUMN:rzacfzc.def_fzc*/
		def_fzc?: number|null;
		/**DBCOLUMN:rzacfzc.def_fzc_txt*/
		def_fzc_txt?: string|null;
		/**DBCOLUMN:rzacfzc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacfzc.k_s*/
		k_s?: string|null;
	}
	const enum GRzacfzcDtoNames { def_fzc = "def_fzc", def_fzc_txt = "def_fzc_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacfzcDtoFragments { def_fzc = "*", def_fzc_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacfzcDtoTypes { def_fzc = "number", def_fzc_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacfzcDtoTypeLengths { def_fzc_txt = 254, k_s = 15,}
	/**ENUM:rzacfzc*/
	const enum GRzacfzcEnum {
		/**Neurčeno*/
		_0=0,
		/**Příprava zakázky*/
		_1=1,
		/**Naplnění podmínek*/
		_2=2,
		/**Vyhlášení zakázky*/
		_3=3,
		/**Přijetí nabídek*/
		_4=4,
		/**Vyhodnocení nabídek*/
		_5=5,
		/**Vypořádání zakázky*/
		_6=6,
	}
	function GRzacfzcEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacfzcEnum, Gordic.Rza.Interface.GRzacfzcDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzackpzDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzackpz*/
	interface GRzackpzDto {
		/**DBCOLUMN:rzackpz.kat_pza*/
		kat_pza?: number|null;
		/**DBCOLUMN:rzackpz.kat_pza_txt*/
		kat_pza_txt?: string|null;
		/**DBCOLUMN:rzackpz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzackpz.k_s*/
		k_s?: string|null;
	}
	const enum GRzackpzDtoNames { kat_pza = "kat_pza", kat_pza_txt = "kat_pza_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzackpzDtoFragments { kat_pza = "*", kat_pza_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzackpzDtoTypes { kat_pza = "number", kat_pza_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzackpzDtoTypeLengths { kat_pza_txt = 254, k_s = 15,}
	/**ENUM:rzackpz*/
	const enum GRzackpzEnum {
		/**Neurčeno*/
		_0=0,
		/**Akviziční případ*/
		_10=10,
		/**Příjmový případ*/
		_20=20,
		/**Předběžná kategorie*/
		_30=30,
	}
	function GRzackpzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzackpzEnum, Gordic.Rza.Interface.GRzackpzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzaclegDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacleg*/
	interface GRzaclegDto {
		/**DBCOLUMN:rzacleg.leg_usm*/
		leg_usm?: number|null;
		/**DBCOLUMN:rzacleg.leg_usm_txt*/
		leg_usm_txt?: string|null;
		/**DBCOLUMN:rzacleg.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacleg.k_s*/
		k_s?: string|null;
	}
	const enum GRzaclegDtoNames { leg_usm = "leg_usm", leg_usm_txt = "leg_usm_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzaclegDtoFragments { leg_usm = "*", leg_usm_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzaclegDtoTypes { leg_usm = "number", leg_usm_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzaclegDtoTypeLengths { leg_usm_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacsexDto.d.ts 

declare namespace Gordic.Rza.Interface.Dto.Controls {
	/**DBTABLE:rzacsex*/
	interface GRzacsexDto {
		/**DBCOLUMN:rzacsex.sta_exp*/
		sta_exp?: number|null;
		/**DBCOLUMN:rzacsex.sta_exp_txt*/
		sta_exp_txt?: string|null;
		/**DBCOLUMN:rzacsex.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacsex.k_s*/
		k_s?: string|null;
	}
	const enum GRzacsexDtoNames { sta_exp = "sta_exp", sta_exp_txt = "sta_exp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacsexDtoFragments { sta_exp = "*", sta_exp_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacsexDtoTypes { sta_exp = "number", sta_exp_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacsexDtoTypeLengths { sta_exp_txt = 100, k_s = 15,}
	/**ENUM:rzacsex*/
	const enum GRzacsexEnum {
		/**Neurčeno*/
		_0=0,
		/**Neexportováno*/
		_1=1,
		/**Probíhá*/
		_2=2,
		/**Exportováno*/
		_3=3,
		/**Chyba*/
		_4=4,
	}
	function GRzacsexEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacsexEnum, Gordic.Rza.Interface.Dto.Controls.GRzacsexDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacsjiDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzacsji*/
	interface GRzacsjiDto {
		/**DBCOLUMN:rzacsji.sta_jis*/
		sta_jis?: number|null;
		/**DBCOLUMN:rzacsji.sta_jis_txt*/
		sta_jis_txt?: string|null;
		/**DBCOLUMN:rzacsji.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacsji.k_s*/
		k_s?: string|null;
	}
	const enum GRzacsjiDtoNames { sta_jis = "sta_jis", sta_jis_txt = "sta_jis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacsjiDtoFragments { sta_jis = "*", sta_jis_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacsjiDtoTypes { sta_jis = "number", sta_jis_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacsjiDtoTypeLengths { sta_jis_txt = 50, k_s = 15,}
	/**ENUM:rzacsji*/
	const enum GRzacsjiEnum {
		/**Neurčeno*/
		_0=0,
		/**Nesložena*/
		_10=10,
		/**Složena na účet*/
		_20=20,
		/**Poskytnuta záruka banky*/
		_30=30,
		/**Nepožadována*/
		_40=40,
	}
	function GRzacsjiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacsjiEnum, Gordic.Rza.Interface.GRzacsjiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzacsza.Dto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:Seznam*/
	interface GRzacszaDto {
		/**DBCOLUMN:Seznam.s_zak*/
		s_zak?: number|null;
		/**DBCOLUMN:Seznam.s_zak_txt*/
		s_zak_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
	}
	const enum GRzacszaDtoNames { s_zak = "s_zak", s_zak_txt = "s_zak_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacszaDtoFragments { s_zak = "*", s_zak_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacszaDtoTypes { s_zak = "number", s_zak_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacszaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzactza.Dto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:Seznam*/
	interface GRzactzaDto {
		/**DBCOLUMN:Seznam.s_zak*/
		pap_tza?: number|null;
		/**DBCOLUMN:Seznam.s_zak_txt*/
		pap_tza_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
	}
	const enum GRzactzaDtoNames { pap_tza = "pap_tza", pap_tza_txt = "pap_tza_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzactzaDtoFragments { pap_tza = "*", pap_tza_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzactzaDtoTypes { pap_tza = "number", pap_tza_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzactzaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Dto\Controls\Gordic.Rza.Interface.GRzaczpoDto.d.ts 

declare namespace Gordic.Rza.Interface {
	/**DBTABLE:rzaczpo*/
	interface GRzaczpoDto {
		/**DBCOLUMN:rzaczpo.zpu_pod*/
		zpu_pod?: number|null;
		/**DBCOLUMN:rzaczpo.zpu_pod_txt*/
		zpu_pod_txt?: string|null;
		/**DBCOLUMN:rzaczpo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzaczpo.k_s*/
		k_s?: string|null;
	}
	const enum GRzaczpoDtoNames { zpu_pod = "zpu_pod", zpu_pod_txt = "zpu_pod_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzaczpoDtoFragments { zpu_pod = "*", zpu_pod_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzaczpoDtoTypes { zpu_pod = "number", zpu_pod_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzaczpoDtoTypeLengths { zpu_pod_txt = 50, k_s = 15,}
	/**ENUM:rzaczpo*/
	const enum GRzaczpoEnum {
		/**Neurčeno*/
		_0=0,
		/**Pošta*/
		_10=10,
		/**Osobně*/
		_20=20,
		/**E-mail*/
		_30=30,
		/**Datová schránka*/
		_40=40,
	}
	function GRzaczpoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzaczpoEnum, Gordic.Rza.Interface.GRzaczpoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Filters\Gordic.Rza.Interface.GRzaFiltrDto.d.ts 

declare namespace Gordic.Rza.Interface {
	interface GRzaFiltrDto {
		/**ixs_fun_vl*/
		ixs_fun_vl?: string|null;
		/**por_cis_nab*/
		por_cis_nab?: number|null;
		/**ixs_zak*/
		ixs_zak?: string|null;
		/**ixs_pri_nad*/
		ixs_pri_nad?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**historie*/
		historie?: boolean|null;
		/**historie*/
		aktualizujIxsPriNad?: boolean|null;
		/**Evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**Agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**realizátor*/
		cis_real?: string|null;
		/**název*/
		nazev?: GBaseFilter<string>|null;
		/**ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**leg_usm*/
		leg_usm?: number|null;
		/**leg_usm_par*/
		leg_usm_par?: number|null;
		/**V přípravě*/
		s_zak_0?: boolean|null;
		/**Zahájeno*/
		s_zak_10?: boolean|null;
		/**Vyhlášeno*/
		s_zak_20?: boolean|null;
		/**Odesláno*/
		s_zak_15?: boolean|null;
		/**Zavedeno*/
		s_zak_21?: boolean|null;
		/**V soutěži*/
		s_zak_22?: boolean|null;
		/**Ke schválení*/
		s_zak_23?: boolean|null;
		/**Částečně schváleno*/
		s_zak_29?: boolean|null;
		/**Schváleno*/
		s_zak_30?: boolean|null;
		/**Ukončeno*/
		s_zak_50?: boolean|null;
		/**Zrušeno*/
		s_zak_80?: boolean|null;
		/**Storno*/
		s_zak_90?: boolean|null;
		/**zpu_rea*/
		zpu_rea?: number|null;
		/**kat_pza*/
		kat_pza?: number|null;
		/**pap_tza*/
		pap_tza?: number|null;
		/**def_fzc*/
		def_fzc?: number|null;
		/**fin_od*/
		fin_od?: GIntervalDto<number>|null;
		/**fin_do*/
		fin_do?: GIntervalDto<number>|null;
		/**dat_zal*/
		dat_zal?: GIntervalDto<JsonDate>|null;
		/**rok_zal*/
		rok_zal?: GIntervalDto<number>|null;
		/**c_predp_bez*/
		c_predp_bez?: GIntervalDto<JsonDecimal>|null;
		/**c_predp*/
		c_predp?: GIntervalDto<JsonDecimal>|null;
		/**pre_urc*/
		pre_urc?: number|null;
		/**lim_zak*/
		lim_zak?: number|null;
		/**rez_pri*/
		rez_pri?: number|null;
		/**vri_pri*/
		vri_pri?: number|null;
		/**dri_pri*/
		dri_pri?: number|null;
		/**pri_zak*/
		pri_zak?: number|null;
		/**ner_zak*/
		ner_zak?: number|null;
		/**duz_zak*/
		duz_zak?: number|null;
		/**kpr_urc*/
		kpr_urc?: number|null;
		/**dat_zru*/
		dat_zru?: GIntervalDto<JsonDate>|null;
		/**dat_tp1_p*/
		dat_tp1_p?: GIntervalDto<JsonDate>|null;
		/**dat_tp1_s*/
		dat_tp1_s?: GIntervalDto<JsonDate>|null;
		/**dat_tp2_p*/
		dat_tp2_p?: GIntervalDto<JsonDate>|null;
		/**dat_tp2_s*/
		dat_tp2_s?: GIntervalDto<JsonDate>|null;
		/**dat_tp3_p*/
		dat_tp3_p?: GIntervalDto<JsonDate>|null;
		/**dat_tp3_s*/
		dat_tp3_s?: GIntervalDto<JsonDate>|null;
		/**dat_tp4_p*/
		dat_tp4_p?: GIntervalDto<JsonDate>|null;
		/**dat_tp4_s*/
		dat_tp4_s?: GIntervalDto<JsonDate>|null;
		/**dat_tp5_p*/
		dat_tp5_p?: GIntervalDto<JsonDate>|null;
		/**dat_tp5_s*/
		dat_tp5_s?: GIntervalDto<JsonDate>|null;
		elm?: Gordic.Pap.Interface.GPapCfuDto[]|null;
		/**bez_financovani*/
		bez_financovani?: boolean|null;
		/**bez_nasmlouvanosti*/
		bez_nasmlouvanosti?: boolean|null;
		/**bez_rezervaci*/
		bez_rezervaci?: boolean|null;
		/**poznamka*/
		poznamka?: GBaseFilter<string>|null;
		dat_vys?: GIntervalDto<JsonDate>|null;
		dat_vyz?: GIntervalDto<JsonDate>|null;
		c_nav?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GRzaFiltrDtoNames { ixs_fun_vl = "ixs_fun_vl", por_cis_nab = "por_cis_nab", ixs_zak = "ixs_zak", ixs_pri_nad = "ixs_pri_nad", ixs_esu = "ixs_esu", historie = "historie", aktualizujIxsPriNad = "aktualizujIxsPriNad", ac = "ac", ac_ag = "ac_ag", cis_real = "cis_real", nazev = "nazev", ixs_fun_komp = "ixs_fun_komp", leg_usm = "leg_usm", leg_usm_par = "leg_usm_par", s_zak_0 = "s_zak_0", s_zak_10 = "s_zak_10", s_zak_20 = "s_zak_20", s_zak_15 = "s_zak_15", s_zak_21 = "s_zak_21", s_zak_22 = "s_zak_22", s_zak_23 = "s_zak_23", s_zak_29 = "s_zak_29", s_zak_30 = "s_zak_30", s_zak_50 = "s_zak_50", s_zak_80 = "s_zak_80", s_zak_90 = "s_zak_90", zpu_rea = "zpu_rea", kat_pza = "kat_pza", pap_tza = "pap_tza", def_fzc = "def_fzc", fin_od = "fin_od", fin_do = "fin_do", dat_zal = "dat_zal", rok_zal = "rok_zal", c_predp_bez = "c_predp_bez", c_predp = "c_predp", pre_urc = "pre_urc", lim_zak = "lim_zak", rez_pri = "rez_pri", vri_pri = "vri_pri", dri_pri = "dri_pri", pri_zak = "pri_zak", ner_zak = "ner_zak", duz_zak = "duz_zak", kpr_urc = "kpr_urc", dat_zru = "dat_zru", dat_tp1_p = "dat_tp1_p", dat_tp1_s = "dat_tp1_s", dat_tp2_p = "dat_tp2_p", dat_tp2_s = "dat_tp2_s", dat_tp3_p = "dat_tp3_p", dat_tp3_s = "dat_tp3_s", dat_tp4_p = "dat_tp4_p", dat_tp4_s = "dat_tp4_s", dat_tp5_p = "dat_tp5_p", dat_tp5_s = "dat_tp5_s", elm = "elm", bez_financovani = "bez_financovani", bez_nasmlouvanosti = "bez_nasmlouvanosti", bez_rezervaci = "bez_rezervaci", poznamka = "poznamka", dat_vys = "dat_vys", dat_vyz = "dat_vyz", c_nav = "c_nav",}
	const enum GRzaFiltrDtoFragments { ixs_fun_vl = "*", por_cis_nab = "*", ixs_zak = "*", ixs_pri_nad = "*", ixs_esu = "*", historie = "*", aktualizujIxsPriNad = "*", ac = "*", ac_ag = "*", cis_real = "*", nazev = "*", ixs_fun_komp = "*", leg_usm = "*", leg_usm_par = "*", s_zak_0 = "*", s_zak_10 = "*", s_zak_20 = "*", s_zak_15 = "*", s_zak_21 = "*", s_zak_22 = "*", s_zak_23 = "*", s_zak_29 = "*", s_zak_30 = "*", s_zak_50 = "*", s_zak_80 = "*", s_zak_90 = "*", zpu_rea = "*", kat_pza = "*", pap_tza = "*", def_fzc = "*", fin_od = "*", fin_do = "*", dat_zal = "*", rok_zal = "*", c_predp_bez = "*", c_predp = "*", pre_urc = "*", lim_zak = "*", rez_pri = "*", vri_pri = "*", dri_pri = "*", pri_zak = "*", ner_zak = "*", duz_zak = "*", kpr_urc = "*", dat_zru = "*", dat_tp1_p = "*", dat_tp1_s = "*", dat_tp2_p = "*", dat_tp2_s = "*", dat_tp3_p = "*", dat_tp3_s = "*", dat_tp4_p = "*", dat_tp4_s = "*", dat_tp5_p = "*", dat_tp5_s = "*", elm = "*", bez_financovani = "*", bez_nasmlouvanosti = "*", bez_rezervaci = "*", poznamka = "*", dat_vys = "*", dat_vyz = "*", c_nav = "*",}
	const enum GRzaFiltrDtoTypes { ixs_fun_vl = "string", por_cis_nab = "number", ixs_zak = "string", ixs_pri_nad = "string", ixs_esu = "string", historie = "boolean", aktualizujIxsPriNad = "boolean", ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", cis_real = "string", nazev = "GBaseFilter<string>", ixs_fun_komp = "string", leg_usm = "number", leg_usm_par = "number", s_zak_0 = "boolean", s_zak_10 = "boolean", s_zak_20 = "boolean", s_zak_15 = "boolean", s_zak_21 = "boolean", s_zak_22 = "boolean", s_zak_23 = "boolean", s_zak_29 = "boolean", s_zak_30 = "boolean", s_zak_50 = "boolean", s_zak_80 = "boolean", s_zak_90 = "boolean", zpu_rea = "number", kat_pza = "number", pap_tza = "number", def_fzc = "number", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", dat_zal = "GIntervalDto<JsonDate>", rok_zal = "GIntervalDto<number>", c_predp_bez = "GIntervalDto<JsonDecimal>", c_predp = "GIntervalDto<JsonDecimal>", pre_urc = "number", lim_zak = "number", rez_pri = "number", vri_pri = "number", dri_pri = "number", pri_zak = "number", ner_zak = "number", duz_zak = "number", kpr_urc = "number", dat_zru = "GIntervalDto<JsonDate>", dat_tp1_p = "GIntervalDto<JsonDate>", dat_tp1_s = "GIntervalDto<JsonDate>", dat_tp2_p = "GIntervalDto<JsonDate>", dat_tp2_s = "GIntervalDto<JsonDate>", dat_tp3_p = "GIntervalDto<JsonDate>", dat_tp3_s = "GIntervalDto<JsonDate>", dat_tp4_p = "GIntervalDto<JsonDate>", dat_tp4_s = "GIntervalDto<JsonDate>", dat_tp5_p = "GIntervalDto<JsonDate>", dat_tp5_s = "GIntervalDto<JsonDate>", elm = "Gordic.Pap.Interface.GPapCfuDto[]", bez_financovani = "boolean", bez_nasmlouvanosti = "boolean", bez_rezervaci = "boolean", poznamka = "GBaseFilter<string>", dat_vys = "GIntervalDto<JsonDate>", dat_vyz = "GIntervalDto<JsonDate>", c_nav = "GIntervalDto<JsonDecimal>",}
	const enum GRzaFiltrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Gordic.Rza.Interface.IGRzaHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání "pidu".
	* @domain Dotace
	*/
	interface HledaniRza {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniRza: ServiceBase & Catalog.HledaniRza;
	}
	const HledaniRza: Client["HledaniRza"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Gordic.Rza.Interface.IGRzaSeznam.d.ts 

declare namespace Gordic.Isl.Catalog {
	interface RzaSeznam {
		/**
		*     seznam dokumentů
		*     
		*/
		read(rq?:Gordic.Pap.Interface.GRzaspriDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GRzaspriDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GRzaspriDto>,GServiceReadResponse<Gordic.Rza.Interface.GParamDetailDto>>;
		/**
		*     detail dokumentu
		*     
		*/
		listNapoj(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GMzatzakDto>>;
		/**
		*     detail dokumentu
		*     
		*/
		list(rq?:Gordic.Rza.Interface.GRzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GRzaspriDto>>;
		/**
		*     historie případu
		*     
		*/
		listHist(rq?:Gordic.Rza.Interface.GRzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GRzaspriDto>>;
		/**
		*     historie TST
		*     
		*/
		listHistPKS(rq?:Gordic.Rza.Interface.GRzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rza.Interface.GRzaHistPKSDto>>;
		/**
		*     Seznam subjektů
		*     
		*/
		listEsu(rq?:Gordic.Rza.Interface.GRzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rza.Interface.GRzasesuDto>>;
		/**
		*     počet záznamů
		*     
		*/
		count(rq?:Gordic.Rza.Interface.GRzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     Insert/update záznamu subjektu
		*     
		*/
		upsertSubj(rq?:Gordic.Rza.Interface.GRzasesuDto|CallParams<GServiceSaveRequest<Gordic.Rza.Interface.GRzasesuDto>>): _Task<GServiceSaveRequest<Gordic.Rza.Interface.GRzasesuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**
		*     StornoSubjektu
		*     
		*/
		stornoSubj(rq?:CallParams<{zaznam:Gordic.Rza.Interface.GRzasesuDto}>): _Task<{zaznam:Gordic.Rza.Interface.GRzasesuDto},Gordic.Pap.Interface.GCommonReturnDto>;
		zjistiUcet(rq?:CallParams<{ixs_esu:string}>): _Task<{ixs_esu:string},string>;
		odpojeniPripojeniNEN(rq?:CallParams<{akce:string}>): _Task<{akce:string},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RzaSeznam: ServiceBase & Catalog.RzaSeznam;
	}
	const RzaSeznam: Client["RzaSeznam"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Detail\Gordic.Rza.Interface.IGRzaDetail.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Detail
	*     
	* @domain AkvizicniPripad
	*/
	interface RzaDetail {
		/**
		*     Uložení detailu
		*     
		*/
		update(rq?:Gordic.Pap.Interface.GRzaspriDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzaspriDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzaspriDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**
		*     vložení záznamu
		*     
		*/
		insert(rq?:Gordic.Pap.Interface.GPodaniDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPodaniDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPodaniDto>>;
		nactiKPI(rq?:CallParams<{ixs_zak:string}>): _Task<{ixs_zak:string},JsonDecimal>;
		/**
		*     Naplnění parametrů pro formulář detailu
		*     
		*/
		nactiNadrizeneVZ(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GRzaspriDto>>;
		priraditKeSpisu(rq?:CallParams<{ixs_zak:string,ixp:string}>): _Task<{ixs_zak:string,ixp:string},boolean>;
		/**
		*     Ukončení
		*     
		*/
		ukonceni(rq?:CallParams<{ixs_zak:string,akce:string}>): _Task<{ixs_zak:string,akce:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     Ukončení
		*     
		*/
		napoj(rq?:CallParams<{ixs_zak:string,id_cizi:string,id_nen_tsez:string}>): _Task<{ixs_zak:string,id_cizi:string,id_nen_tsez:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     Storno
		*     
		*/
		storno(rq?:CallParams<{ixs_zak:string,duvod:string,akce:string}>): _Task<{ixs_zak:string,duvod:string,akce:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     Storno
		*     
		*/
		zamek(rq?:CallParams<{ixs_zak:string,akce:string}>): _Task<{ixs_zak:string,akce:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     GenerujCasti
		*     
		*/
		generujCasti(rq?:CallParams<{zaznam:Gordic.Pap.Interface.GRzaspriDto,matka:string,pocet:number}>): _Task<{zaznam:Gordic.Pap.Interface.GRzaspriDto,matka:string,pocet:number},Gordic.Pap.Interface.GCommonReturnDto>;
		dokumenty(rq?:CallParams<{ixs_zak:string}>): _Task<{ixs_zak:string},GServiceListResponse<Gordic.Pap.Interface.GRzaseszDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RzaDetail: ServiceBase & Catalog.RzaDetail;
	}
	const RzaDetail: Client["RzaDetail"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Detail\Dokumenty\Gordi.Rza.Interface.IGDokumentyAP.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Dokumenty AP*/
	interface RzaDokumentyAP {
		/**Načte seznam zapisu historie akce vše*/
		list(rq?:Gordic.Rza.Interface.GRzaDokumentyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rza.Interface.GRzaspidDto>>;
		/**Zapíše nový dokument*/
		create(rq?:CallParams<{ixs_zak:string,ixp:string}>): _Task<{ixs_zak:string,ixp:string},boolean>;
		dataProDokument(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Pap.Interface.GRzaspriDto>;
		/**Detail dokumentu*/
		read(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Rza.Interface.GRzaspidDto>>;
		saveNovyTypDokumentuNen(rq?:CallParams<{ixs_zak:string,por_cis:number,typDokumentu:number}>): _Task<{ixs_zak:string,por_cis:number,typDokumentu:number},boolean>;
		saveNovyTypDokumentuNenPole(rq?:CallParams<{list:Gordic.Pap.Interface.GRzaseszDto[]}>): _Task<{list:Gordic.Pap.Interface.GRzaseszDto[]},boolean>;
		saveExportDokumentuNen(rq?:CallParams<{soubory:Gordic.Rza.Interface.GRzaHrOpStruDto[]}>): _Task<{soubory:Gordic.Rza.Interface.GRzaHrOpStruDto[]},Gordic.Pap.Interface.GCommonReturnDto>;
		/**Hromadné operace*/
		hromadneUpdate(rq?:CallParams<{zaznam:Gordic.Rza.Interface.GRzaspidDto,stav:number,paramIxsPri:string}>): _Task<{zaznam:Gordic.Rza.Interface.GRzaspidDto,stav:number,paramIxsPri:string},Gordic.Pap.Interface.GCommonReturnDto>;
		updateDetail(rq?:CallParams<{zaznam:Gordic.Rza.Interface.GRzaspidDto}>): _Task<{zaznam:Gordic.Rza.Interface.GRzaspidDto},boolean>;
		nactiKnihu(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		nactiKnihuPripadu(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RzaDokumentyAP: ServiceBase & Catalog.RzaDokumentyAP;
	}
	const RzaDokumentyAP: Client["RzaDokumentyAP"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Detail\Historie\Gordi.Rza.Interface.IGRzaSeznamHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Historie Rza*/
	interface RzaHistorie {
		/**Načte seznam zapisu historie akce vše*/
		list(rq?:Gordic.Rza.Interface.GRzaHistorieFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rza.Interface.GRzahzahDto>>;
		/**Zapíše nový řádek do historie*/
		create(rq?:CallParams<{ixs_zak:string,zmena_txt:string,poznamka:string}>): _Task<{ixs_zak:string,zmena_txt:string,poznamka:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RzaHistorie: ServiceBase & Catalog.RzaHistorie;
	}
	const RzaHistorie: Client["RzaHistorie"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Detail\Kompetenti\Gordic.Rza.Interface.IGRzaKompetenti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rza kompetenti*/
	interface RzaKompetenti {
		/**ISL List Seznam kompetentů akce*/
		list(rq?:Gordic.Rza.Interface.GRzaKompetentiFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rza.Interface.GRzaKompetentiDto>>;
		/**ISL Select Detailu kompetenta*/
		read(rq?:Gordic.Rza.Interface.GRzaKompetentiDto|CallParams<GServiceReadRequest<Gordic.Rza.Interface.GRzaKompetentiDto>>): _Task<GServiceReadRequest<Gordic.Rza.Interface.GRzaKompetentiDto>,GServiceReadResponse<Gordic.Rza.Interface.GRzaKompetentiDto>>;
		/**ISL create Detailu kompetenta*/
		create(rq?:Gordic.Rza.Interface.GRzaKompetentiDto|CallParams<GServiceSaveRequest<Gordic.Rza.Interface.GRzaKompetentiDto>>): _Task<GServiceSaveRequest<Gordic.Rza.Interface.GRzaKompetentiDto>,GServiceSaveResponse<Gordic.Rza.Interface.GRzaKompetentiDto>>;
		/**ISL Odstranění kompetenta*/
		delete(rq?:Gordic.Rza.Interface.GRzaKompetentiDto|CallParams<GServiceSaveRequest<Gordic.Rza.Interface.GRzaKompetentiDto>>): _Task<GServiceSaveRequest<Gordic.Rza.Interface.GRzaKompetentiDto>,GServiceSaveResponse<Gordic.Rza.Interface.GRzaKompetentiDto>>;
		listNovyKompetent(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rza.Interface.GRzaNovyKompetentDto>>;
		saveNovyKompetent(rq?:CallParams<{poleIxsFun:string[],ixs_zak:string,dokumentyPripadu:boolean}>): _Task<{poleIxsFun:string[],ixs_zak:string,dokumentyPripadu:boolean},Gordic.Rza.Interface.GRzaKompetentiDto[]>;
		saveNovyZpracovatel(rq?:CallParams<{ixsFun:string,poleIxsZak:string[],dokumentyPripadu:boolean}>): _Task<{ixsFun:string,poleIxsZak:string[],dokumentyPripadu:boolean},boolean>;
		prevzetiPripadu(rq?:CallParams<{ixsFun:string,poleIxsZak:string[],dokumentyPripadu:boolean}>): _Task<{ixsFun:string,poleIxsZak:string[],dokumentyPripadu:boolean},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RzaKompetenti: ServiceBase & Catalog.RzaKompetenti;
	}
	const RzaKompetenti: Client["RzaKompetenti"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rza.Interface\Service\Rza\Detail\Prilohy\Gordic.Rza.Interface.IGWflsesxRza.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**I(Isl)GWflsesx - Přílohy obecného subjektu.*/
	interface RzaPrilohy {
		/**Vrátí seznam historie písemnosti dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		read(rq?:Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		upsert(rq?:Gordic.Wfl.Interface.GAttachmentUploadDto|CallParams<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>>): _Task<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>,GServiceSaveResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		remove(rq?:Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		/**Seznam verzí přílohy obecného subjektu*/
		listVersions(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.GAttachmentVersionDto>>;
		/**Fyzicky smazat verze přílohy obecného subjektu*/
		removeVersions(rq?:Gordic.Wfl.Interface.GIxsAttachmentVersionRequestDto|CallParams<GServiceGroupRequest<Gordic.Wfl.Interface.GIxsAttachmentVersionRequestDto>>): _Task<GServiceGroupRequest<Gordic.Wfl.Interface.GIxsAttachmentVersionRequestDto>,GServiceGroupResponse<Gordic.Wfl.Interface.GAttachmentVersionDto>>;
		/**Zneaktivnit verze přílohy obecného subjektu*/
		deactivateVersions(rq?:Gordic.Wfl.Interface.GIxsAttachmentVersionRequestDto|CallParams<GServiceGroupRequest<Gordic.Wfl.Interface.GIxsAttachmentVersionRequestDto>>): _Task<GServiceGroupRequest<Gordic.Wfl.Interface.GIxsAttachmentVersionRequestDto>,GServiceGroupResponse<Gordic.Wfl.Interface.GAttachmentVersionDto>>;
		/**DownloadAll*/
		downloadAll(rq?:Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GDownloadAllAttachmentsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RzaPrilohy: ServiceBase & Catalog.RzaPrilohy;
	}
	const RzaPrilohy: Client["RzaPrilohy"];
}

//#endregion

