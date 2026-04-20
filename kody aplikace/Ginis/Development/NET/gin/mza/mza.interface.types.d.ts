/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       mza.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Mza.Interface\Gordic.Mza.Interface.csproj
*    created     2026-02-16 14:33:48
*    files       Dto\Gordic.Mza.Interface.GGinsdodDto.d.ts
*                Dto\Gordic.Mza.Interface.GGinsrefDto.d.ts
*                Dto\Gordic.Mza.Interface.GMzaPrvotniImportDto.d.ts
*                Dto\Gordic.Mza.Interface.GMzasoutStromDto.d.ts
*                Dto\Gordic.Mza.Interface.GMzaUkonyDto.d.ts
*                Filters\Gordic.Mza.Interface.GMzaFiltrDto.d.ts
*                Service\Gordic.Mza.Interface.IGMzaHledani.d.ts
*                Service\Gordic.Mza.Interface.IGMzaMonitorZakazek.d.ts
*                Service\Komunikace\Gordic.Mza.Interface.IGMzaKomunikace.d.ts
*                Service\Osoby\Gordic.Mza.Interface.IGMzaOsoby.d.ts
*                Service\Role\Gordic.Mza.Interface.IGMzaRole.d.ts
*                Service\Ukony\Gordic.Mza.Interface.IGMzaUkony.d.ts
*                Service\Utvary\Gordic.Mza.Interface.IGMzaUtvary.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Dto\Gordic.Mza.Interface.GGinsdodDto.d.ts 

declare namespace Gordic.Mza.Interface {
	/**DBTABLE:ginsref*/
	interface GGinsdodDto {
		/**Interní identifikátor osoby*/
		ixs_esu?: string|null;
		ob_jmeno?: string|null;
		zkratka?: string|null;
		obec?: string|null;
		cast_obce?: string|null;
		ulice?: string|null;
		cor?: string|null;
		cop?: string|null;
		ico?: string|null;
		dic?: string|null;
		aktualni?: boolean|null;
	}
	const enum GGinsdodDtoNames { ixs_esu = "ixs_esu", ob_jmeno = "ob_jmeno", zkratka = "zkratka", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cop = "cop", ico = "ico", dic = "dic", aktualni = "aktualni",}
	const enum GGinsdodDtoFragments { ixs_esu = "*", ob_jmeno = "*", zkratka = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cop = "*", ico = "*", dic = "*", aktualni = "*",}
	const enum GGinsdodDtoTypes { ixs_esu = "string", ob_jmeno = "string", zkratka = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cop = "string", ico = "string", dic = "string", aktualni = "boolean",}
	const enum GGinsdodDtoTypeLengths { ixs_esu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Dto\Gordic.Mza.Interface.GGinsrefDto.d.ts 

declare namespace Gordic.Mza.Interface {
	/**DBTABLE:ginsref*/
	interface GGinsrefDto {
		/**Interní identifikátor osoby*/
		ixs_ref?: string|null;
		/**Spisový uzel ke kterémů osoba přísluší - tato vazba určuje také příslušnost k IČO*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsref.zkratka*/
		zkratka?: string|null;
		/**Složený text jména a příjmení + titul*/
		nazev?: string|null;
		/**DBCOLUMN:ginsref.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:ginsref.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:ginsref.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:ginsref.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:ginsref.mail_public*/
		mail_public?: string|null;
		/**DBCOLUMN:ginsref.mail_public*/
		mail?: string|null;
		aktualni?: boolean|null;
		aktivita?: number|null;
	}
	const enum GGinsrefDtoNames { ixs_ref = "ixs_ref", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", mail_public = "mail_public", mail = "mail", aktualni = "aktualni", aktivita = "aktivita",}
	const enum GGinsrefDtoFragments { ixs_ref = "*", ixs_su = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", mail_public = "*", mail = "*", aktualni = "*", aktivita = "*",}
	const enum GGinsrefDtoTypes { ixs_ref = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", mail_public = "string", mail = "string", aktualni = "boolean", aktivita = "number",}
	const enum GGinsrefDtoTypeLengths { ixs_ref = 12, ixs_su = 12, zkratka = 16, nazev = 200, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, mail_public = 254, mail = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Dto\Gordic.Mza.Interface.GMzaPrvotniImportDto.d.ts 

declare namespace Gordic.Mza.Interface {
	interface GMzaPrvotniImportDto {
		pocet?: number|null;
		rok?: number|null;
	}
	const enum GMzaPrvotniImportDtoNames { pocet = "pocet", rok = "rok",}
	const enum GMzaPrvotniImportDtoFragments { pocet = "*", rok = "*",}
	const enum GMzaPrvotniImportDtoTypes { pocet = "number", rok = "number",}
	const enum GMzaPrvotniImportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Dto\Gordic.Mza.Interface.GMzasoutStromDto.d.ts 

declare namespace Gordic.Mza.Interface {
	/**DBTABLE:mzasout*/
	interface GMzasoutStromDto {
		/**DBCOLUMN:mzasout.id_out_ci*/
		id_out_ci?: string|null;
		/**DBCOLUMN:mzasout.id_out_ci*/
		id_out_go?: string|null;
		/**DBCOLUMN:mzasout.nazev*/
		stupen0?: string|null;
		/**DBCOLUMN:mzasout.nazev*/
		stupen1?: string|null;
		/**DBCOLUMN:mzasout.nazev*/
		stupen2?: string|null;
		/**DBCOLUMN:mzasout.nazev*/
		stupen3?: string|null;
		/**DBCOLUMN:mzasout.nazev*/
		stupen4?: string|null;
	}
	const enum GMzasoutStromDtoNames { id_out_ci = "id_out_ci", id_out_go = "id_out_go", stupen0 = "stupen0", stupen1 = "stupen1", stupen2 = "stupen2", stupen3 = "stupen3", stupen4 = "stupen4",}
	const enum GMzasoutStromDtoFragments { id_out_ci = "*", id_out_go = "*", stupen0 = "*", stupen1 = "*", stupen2 = "*", stupen3 = "*", stupen4 = "*",}
	const enum GMzasoutStromDtoTypes { id_out_ci = "string", id_out_go = "string", stupen0 = "string", stupen1 = "string", stupen2 = "string", stupen3 = "string", stupen4 = "string",}
	const enum GMzasoutStromDtoTypeLengths { id_out_ci = 50, id_out_go = 50, stupen0 = 254, stupen1 = 254, stupen2 = 254, stupen3 = 254, stupen4 = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Dto\Gordic.Mza.Interface.GMzaUkonyDto.d.ts 

declare namespace Gordic.Mza.Interface {
	interface GMzaUkonyDto {
		rok?: number|null;
		mesic?: number|null;
	}
	const enum GMzaUkonyDtoNames { rok = "rok", mesic = "mesic",}
	const enum GMzaUkonyDtoFragments { rok = "*", mesic = "*",}
	const enum GMzaUkonyDtoTypes { rok = "number", mesic = "number",}
	const enum GMzaUkonyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Filters\Gordic.Mza.Interface.GMzaFiltrDto.d.ts 

declare namespace Gordic.Mza.Interface {
	interface GMzaFiltrDto {
		/**Název*/
		nazev?: GBaseFilter<string>|null;
		/**rozpracována*/
		s_vz_10?: boolean|null;
		/**zadána*/
		s_vz_20?: boolean|null;
		/**zrušena*/
		s_vz_30?: boolean|null;
		s_vz_40?: boolean|null;
		/**VZ ukončený*/
		ixs_fun_komp?: string|null;
		ixs_zak?: string|null;
		id_zak_ci?: string|null;
		id_zak_go?: string|null;
		stav_zak?: string|null;
		postup_zad?: string|null;
		druh_zad_riz?: number|null;
		kod_vz_profil?: string|null;
		evi_cislo_vevz?: string|null;
		evi_cislo_ted?: string|null;
		evi_cislo_int?: string|null;
		syst_cislo_ien?: string|null;
		typ_ez?: number|null;
		typ_ram_sml?: number|null;
		vz_obr_bezp?: number|null;
		druh_zak?: number|null;
		typ_poza?: number|null;
		zpus_zah?: number|null;
		lhu_pod_nab?: GIntervalDto<JsonDate>|null;
		dat_ote_nab?: GIntervalDto<JsonDate>|null;
		variant_nab?: string|null;
		popis_predmet?: string|null;
		hlavni_cpv?: string|null;
		hlavni_nipez?: string|null;
		mist_pln?: string|null;
		c_predp_bez?: GIntervalDto<JsonDecimal>|null;
		evi_cislo_rs?: string|null;
		c_predp_s?: GIntervalDto<JsonDecimal>|null;
		kriter_hodnoc?: string|null;
		dat_uve?: GIntervalDto<JsonDate>|null;
		dat_zmena?: GIntervalDto<JsonDate>|null;
		zmenu_prov?: string|null;
		/**priz_cast_go*/
		priz_cast_go?: number|null;
		id_nen_tsez?: string|null;
	}
	const enum GMzaFiltrDtoNames { nazev = "nazev", s_vz_10 = "s_vz_10", s_vz_20 = "s_vz_20", s_vz_30 = "s_vz_30", s_vz_40 = "s_vz_40", ixs_fun_komp = "ixs_fun_komp", ixs_zak = "ixs_zak", id_zak_ci = "id_zak_ci", id_zak_go = "id_zak_go", stav_zak = "stav_zak", postup_zad = "postup_zad", druh_zad_riz = "druh_zad_riz", kod_vz_profil = "kod_vz_profil", evi_cislo_vevz = "evi_cislo_vevz", evi_cislo_ted = "evi_cislo_ted", evi_cislo_int = "evi_cislo_int", syst_cislo_ien = "syst_cislo_ien", typ_ez = "typ_ez", typ_ram_sml = "typ_ram_sml", vz_obr_bezp = "vz_obr_bezp", druh_zak = "druh_zak", typ_poza = "typ_poza", zpus_zah = "zpus_zah", lhu_pod_nab = "lhu_pod_nab", dat_ote_nab = "dat_ote_nab", variant_nab = "variant_nab", popis_predmet = "popis_predmet", hlavni_cpv = "hlavni_cpv", hlavni_nipez = "hlavni_nipez", mist_pln = "mist_pln", c_predp_bez = "c_predp_bez", evi_cislo_rs = "evi_cislo_rs", c_predp_s = "c_predp_s", kriter_hodnoc = "kriter_hodnoc", dat_uve = "dat_uve", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_cast_go = "priz_cast_go", id_nen_tsez = "id_nen_tsez",}
	const enum GMzaFiltrDtoFragments { nazev = "*", s_vz_10 = "*", s_vz_20 = "*", s_vz_30 = "*", s_vz_40 = "*", ixs_fun_komp = "*", ixs_zak = "*", id_zak_ci = "*", id_zak_go = "*", stav_zak = "*", postup_zad = "*", druh_zad_riz = "*", kod_vz_profil = "*", evi_cislo_vevz = "*", evi_cislo_ted = "*", evi_cislo_int = "*", syst_cislo_ien = "*", typ_ez = "*", typ_ram_sml = "*", vz_obr_bezp = "*", druh_zak = "*", typ_poza = "*", zpus_zah = "*", lhu_pod_nab = "*", dat_ote_nab = "*", variant_nab = "*", popis_predmet = "*", hlavni_cpv = "*", hlavni_nipez = "*", mist_pln = "*", c_predp_bez = "*", evi_cislo_rs = "*", c_predp_s = "*", kriter_hodnoc = "*", dat_uve = "*", dat_zmena = "*", zmenu_prov = "*", priz_cast_go = "*", id_nen_tsez = "*",}
	const enum GMzaFiltrDtoTypes { nazev = "GBaseFilter<string>", s_vz_10 = "boolean", s_vz_20 = "boolean", s_vz_30 = "boolean", s_vz_40 = "boolean", ixs_fun_komp = "string", ixs_zak = "string", id_zak_ci = "string", id_zak_go = "string", stav_zak = "string", postup_zad = "string", druh_zad_riz = "number", kod_vz_profil = "string", evi_cislo_vevz = "string", evi_cislo_ted = "string", evi_cislo_int = "string", syst_cislo_ien = "string", typ_ez = "number", typ_ram_sml = "number", vz_obr_bezp = "number", druh_zak = "number", typ_poza = "number", zpus_zah = "number", lhu_pod_nab = "GIntervalDto<JsonDate>", dat_ote_nab = "GIntervalDto<JsonDate>", variant_nab = "string", popis_predmet = "string", hlavni_cpv = "string", hlavni_nipez = "string", mist_pln = "string", c_predp_bez = "GIntervalDto<JsonDecimal>", evi_cislo_rs = "string", c_predp_s = "GIntervalDto<JsonDecimal>", kriter_hodnoc = "string", dat_uve = "GIntervalDto<JsonDate>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "string", priz_cast_go = "number", id_nen_tsez = "string",}
	const enum GMzaFiltrDtoTypeLengths {}
	/**DTO ulozeneho filtru*/
	interface GSeznamDokladuFilterStoredDto extends Gordic.Mza.Interface.GMzaFiltrDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamDokladuFilterStoredDtoNames { id = "id", name = "name", description = "description", nazev = "nazev", s_vz_10 = "s_vz_10", s_vz_20 = "s_vz_20", s_vz_30 = "s_vz_30", s_vz_40 = "s_vz_40", ixs_fun_komp = "ixs_fun_komp", ixs_zak = "ixs_zak", id_zak_ci = "id_zak_ci", id_zak_go = "id_zak_go", stav_zak = "stav_zak", postup_zad = "postup_zad", druh_zad_riz = "druh_zad_riz", kod_vz_profil = "kod_vz_profil", evi_cislo_vevz = "evi_cislo_vevz", evi_cislo_ted = "evi_cislo_ted", evi_cislo_int = "evi_cislo_int", syst_cislo_ien = "syst_cislo_ien", typ_ez = "typ_ez", typ_ram_sml = "typ_ram_sml", vz_obr_bezp = "vz_obr_bezp", druh_zak = "druh_zak", typ_poza = "typ_poza", zpus_zah = "zpus_zah", lhu_pod_nab = "lhu_pod_nab", dat_ote_nab = "dat_ote_nab", variant_nab = "variant_nab", popis_predmet = "popis_predmet", hlavni_cpv = "hlavni_cpv", hlavni_nipez = "hlavni_nipez", mist_pln = "mist_pln", c_predp_bez = "c_predp_bez", evi_cislo_rs = "evi_cislo_rs", c_predp_s = "c_predp_s", kriter_hodnoc = "kriter_hodnoc", dat_uve = "dat_uve", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_cast_go = "priz_cast_go", id_nen_tsez = "id_nen_tsez",}
	const enum GSeznamDokladuFilterStoredDtoFragments { id = "*", name = "*", description = "*", nazev = "*", s_vz_10 = "*", s_vz_20 = "*", s_vz_30 = "*", s_vz_40 = "*", ixs_fun_komp = "*", ixs_zak = "*", id_zak_ci = "*", id_zak_go = "*", stav_zak = "*", postup_zad = "*", druh_zad_riz = "*", kod_vz_profil = "*", evi_cislo_vevz = "*", evi_cislo_ted = "*", evi_cislo_int = "*", syst_cislo_ien = "*", typ_ez = "*", typ_ram_sml = "*", vz_obr_bezp = "*", druh_zak = "*", typ_poza = "*", zpus_zah = "*", lhu_pod_nab = "*", dat_ote_nab = "*", variant_nab = "*", popis_predmet = "*", hlavni_cpv = "*", hlavni_nipez = "*", mist_pln = "*", c_predp_bez = "*", evi_cislo_rs = "*", c_predp_s = "*", kriter_hodnoc = "*", dat_uve = "*", dat_zmena = "*", zmenu_prov = "*", priz_cast_go = "*", id_nen_tsez = "*",}
	const enum GSeznamDokladuFilterStoredDtoTypes { id = "string", name = "string", description = "string", nazev = "GBaseFilter<string>", s_vz_10 = "boolean", s_vz_20 = "boolean", s_vz_30 = "boolean", s_vz_40 = "boolean", ixs_fun_komp = "string", ixs_zak = "string", id_zak_ci = "string", id_zak_go = "string", stav_zak = "string", postup_zad = "string", druh_zad_riz = "number", kod_vz_profil = "string", evi_cislo_vevz = "string", evi_cislo_ted = "string", evi_cislo_int = "string", syst_cislo_ien = "string", typ_ez = "number", typ_ram_sml = "number", vz_obr_bezp = "number", druh_zak = "number", typ_poza = "number", zpus_zah = "number", lhu_pod_nab = "GIntervalDto<JsonDate>", dat_ote_nab = "GIntervalDto<JsonDate>", variant_nab = "string", popis_predmet = "string", hlavni_cpv = "string", hlavni_nipez = "string", mist_pln = "string", c_predp_bez = "GIntervalDto<JsonDecimal>", evi_cislo_rs = "string", c_predp_s = "GIntervalDto<JsonDecimal>", kriter_hodnoc = "string", dat_uve = "GIntervalDto<JsonDate>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "string", priz_cast_go = "number", id_nen_tsez = "string",}
	const enum GSeznamDokladuFilterStoredDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Gordic.Mza.Interface.IGMzaHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání "pidu".
	* @domain MonitorZakazek
	*/
	interface HledaniMza {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		HledaniMza: ServiceBase & Catalog.HledaniMza;
	}
	const HledaniMza: Client["HledaniMza"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Gordic.Mza.Interface.IGMzaMonitorZakazek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**MzatZak - obsluha
	* @domain VerZakazky
	*/
	interface MzaMonitorZakazek {
		/**zakázka*/
		read(rq?:Gordic.Pap.Interface.GMzatzakDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GMzatzakDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GMzatzakDto>,GServiceReadResponse<Gordic.Pap.Interface.GMzatzakDto>>;
		/**detail dokumentu*/
		list(rq?:Gordic.Mza.Interface.GMzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzatzakDto>>;
		/**počet záznamů*/
		count(rq?:Gordic.Mza.Interface.GMzaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Seznam dokumentu*/
		listBezKnihy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzatzakDto>>;
		/**počet záznamů*/
		countBezKnihy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**zakázka*/
		detail(rq?:Gordic.Pap.Interface.GMzatzakDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GMzatzakDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GMzatzakDto>,GServiceReadResponse<Gordic.Pap.Interface.GDetailDto>>;
		/**smlouvy*/
		nactiSmlouvy(rq?:CallParams<{ixs_zak:string}>): _Task<{ixs_zak:string},GServiceListResponse<Gordic.Pap.Interface.GMzatsmlDto>>;
		nactiDetailSmlouvy(rq?:CallParams<{ixs_sml:string}>): _Task<{ixs_sml:string},GServiceReadResponse<Gordic.Pap.Interface.GDetailSmlouvyDto>>;
		doplnKnihu(rq?:CallParams<{poleVZ:string[],kniha:string}>): _Task<{poleVZ:string[],kniha:string},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MzaMonitorZakazek: ServiceBase & Catalog.MzaMonitorZakazek;
	}
	const MzaMonitorZakazek: Client["MzaMonitorZakazek"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Komunikace\Gordic.Mza.Interface.IGMzaKomunikace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Dodavatele
	* @domain MonitorZakazek
	*/
	interface MzaKomunikace {
		/**seznam komunikace*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzaskozDto>>;
		/**detail dokumentu*/
		listDok(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzatdonDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MzaKomunikace: ServiceBase & Catalog.MzaKomunikace;
	}
	const MzaKomunikace: Client["MzaKomunikace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Osoby\Gordic.Mza.Interface.IGMzaOsoby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Osoby
	* @domain MonitorZakazek
	*/
	interface MzaOsoba {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzasosbDto>>;
		/**párování Ginis/NEN*/
		parovani(rq?:CallParams<{vse:boolean}>): _Task<{vse:boolean},Gordic.Pap.Interface.GCommonReturnDto>;
		/**detail dokumentu*/
		listRef(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mza.Interface.GGinsrefDto>>;
		/**update mzasosb*/
		update(rq?:Gordic.Pap.Interface.GMzasosbDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GMzasosbDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GMzasosbDto>,GServiceSaveResponse<Gordic.Pap.Interface.GMzasosbDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MzaOsoba: ServiceBase & Catalog.MzaOsoba;
	}
	const MzaOsoba: Client["MzaOsoba"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Role\Gordic.Mza.Interface.IGMzaRole.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Role
	* @domain MonitorZakazek
	*/
	interface MzaRole {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzasrolDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MzaRole: ServiceBase & Catalog.MzaRole;
	}
	const MzaRole: Client["MzaRole"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Ukony\Gordic.Mza.Interface.IGMzaUkony.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Ukony
	* @domain MonitorZakazek
	*/
	interface MzaUkon {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzavzccDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MzaUkon: ServiceBase & Catalog.MzaUkon;
	}
	const MzaUkon: Client["MzaUkon"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mza.Interface\Service\Utvary\Gordic.Mza.Interface.IGMzaUtvary.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Útvary
	* @domain MonitorZakazek
	*/
	interface MzaUtvar {
		/**seznam utvaru*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzasoutDto>>;
		/**seznam utvaru strom*/
		listStrom(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mza.Interface.GMzasoutStromDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MzaUtvar: ServiceBase & Catalog.MzaUtvar;
	}
	const MzaUtvar: Client["MzaUtvar"];
}

//#endregion

