/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ado.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ado.Interface\Gordic.Ado.Interface.csproj
*    created     2026-02-16 14:37:12
*    files       Ado\Dtos\GEkocadoDto.d.ts
*                Ado\Dtos\GEkoctujDto.d.ts
*                Ado\Dtos\GEkohimrDto.d.ts
*                Ado\Dtos\GEkosokeDto.d.ts
*                Ado\Dtos\GEkosrarDto.d.ts
*                Ado\Dtos\GEkoszujDto.d.ts
*                Ado\Dtos\GEkovimrDto.d.ts
*                Ado\Dtos\GEkovrarDto.d.ts
*                Ado\Dtos\GGincdurDto.d.ts
*                Ado\Dtos\GNutsReaderDto.d.ts
*                Ado\Dtos\GVykcokeDto.d.ts
*                Ado\Interfaces\IGAdoMailCertOrganizace.d.ts
*                Ado\Interfaces\IGAdoMetodicky.d.ts
*                Ado\Interfaces\IGAdoOkecService.d.ts
*                Ado\Interfaces\IGAdoRegistrOrganizaci.d.ts
*                Ado\Interfaces\IGAdoZujeService.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkocadoDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekocado*/
	interface GEkocadoDto {
		/**DBCOLUMN:ekocado.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:ekocado.typ_org_txt*/
		typ_org_txt?: string|null;
		/**DBCOLUMN:ekocado.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekocado.k_s*/
		k_s?: string|null;
	}
	const enum GEkocadoDtoNames { typ_org = "typ_org", typ_org_txt = "typ_org_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkocadoDtoFragments { typ_org = "*", typ_org_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkocadoDtoTypes { typ_org = "number", typ_org_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkocadoDtoTypeLengths { typ_org_txt = 254, k_s = 15,}
	/**ENUM:ekocado*/
	const enum GEkocadoEnum {
		/**Neurčeno*/
		_0=0,
		/**Rozpočtová organizace*/
		_10=10,
		/**Příspěvková organizace*/
		_20=20,
		/**Městská část*/
		_90=90,
		/**Magistrát*/
		_150=150,
	}
	function GEkocadoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkocadoEnum, Gordic.Ado.Interface.GEkocadoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkoctujDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekoctuj*/
	interface GEkoctujDto {
		/**DBCOLUMN:ekoctuj.tuj*/
		tuj?: string|null;
		/**DBCOLUMN:ekoctuj.tuj_txt*/
		tuj_txt?: string|null;
		/**DBCOLUMN:ekoctuj.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekoctuj.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekoctuj.tuj_org*/
		tuj_org?: string|null;
	}
	const enum GEkoctujDtoNames { tuj = "tuj", tuj_txt = "tuj_txt", k_v = "k_v", k_s = "k_s", tuj_org = "tuj_org",}
	const enum GEkoctujDtoFragments { tuj = "*", tuj_txt = "*", k_v = "*", k_s = "*", tuj_org = "*",}
	const enum GEkoctujDtoTypes { tuj = "string", tuj_txt = "string", k_v = "number", k_s = "string", tuj_org = "string",}
	const enum GEkoctujDtoTypeLengths { tuj = 1, tuj_txt = 50, k_s = 15, tuj_org = 1,}
	/**ENUM:ekoctuj*/
	const enum GEkoctujEnum {
		/**ÚSC*/
		_0,
		/**OSS*/
		_1,
		/**Příspěvková organizace OSS*/
		_2,
		/**Příspěvková organizace ÚSC*/
		_3,
		/**Státní fond*/
		_4,
		/**Ostatní*/
		_9,
	}
	function GEkoctujEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkoctujEnum, Gordic.Ado.Interface.GEkoctujDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkohimrDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekohimr*/
	interface GEkohimrDto {
		/**DBCOLUMN:ekohimr.ixs_rar*/
		ixs_rar?: string|null;
		/**DBCOLUMN:ekohimr.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ekohimr.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ekohimr.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ekohimr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekohimr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekohimr.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkohimrDtoNames { ixs_rar = "ixs_rar", ixs_ref = "ixs_ref", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkohimrDtoFragments { ixs_rar = "*", ixs_ref = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkohimrDtoTypes { ixs_rar = "string", ixs_ref = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkohimrDtoTypeLengths { ixs_rar = 12, ixs_ref = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkosokeDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekosoke
	*      Odvětvová klasifikace ekonomických činností
	*/
	interface GEkosokeDto {
		/**
		*      CZ-NACE (OKEČ) 
		*     
		*/
		okec?: string|null;
		/**
		*      Název
		*     
		*/
		nazev?: string|null;
		/**
		*      Datum a čas poslední změny tohoto záznamu
		*     
		*/
		dat_zmena?: JsonDate|null;
		/**
		*      Autor poslední změny záznamu dle ginszmp
		*     
		*/
		zmenu_prov?: string|null;
		/**
		*      Sloupec s možným využitím pro uložení číselných řadicích údajů
		*     
		*/
		k_v?: number|null;
	}
	const enum GEkosokeDtoNames { okec = "okec", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v",}
	const enum GEkosokeDtoFragments { okec = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*",}
	const enum GEkosokeDtoTypes { okec = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number",}
	const enum GEkosokeDtoTypeLengths { okec = 6, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkosrarDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekosrar
	*      Registr organizací
	*/
    interface GEkosrarDto {
		ixs_rar?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Ulice*/
		ulice?: string|null;
		sidlo?: string|null;
		/**PSČ*/
		psc?: string|null;
		prac?: string|null;
		/**Telefon*/
		tel?: string|null;
		/**Fax*/
		fax?: string|null;
		ctvrt?: string|null;
		riz1?: string|null;
		riz2?: string|null;
		riz3?: string|null;
		vstup?: string|null;
		uctorg?: number|null;
		zue?: string|null;
		dor?: string|null;
		dur?: string|null;
		kao?: JsonDate|null;
		/**CZ-NACE (OKEČ)*/
		okec?: string|null;
		sorpvt?: string|null;
		sorsum?: string|null;
		sororg?: string|null;
		typro?: number|null;
		kop?: string|null;
		label?: string|null;
		zao?: JsonDate|null;
		pao?: JsonDate|null;
		zuje?: string|null;
		dfi?: string|null;
		dzm?: number|null;
		naop?: string|null;
		naz1?: string|null;
		naz2?: string|null;
		naz3?: string|null;
		orgnum?: number|null;
		/**Typ organizace*/
		typ_org?: number|null;
		nazev_pvt?: string|null;
		zod?: string|null;
		zko?: string|null;
		cfu?: string|null;
		tsr?: string|null;
		dri?: string|null;
		zfo?: string|null;
		hoc?: string|null;
		kapitola?: string|null;
		/**číslo odpovědného odboru*/
		orj?: string|null;
		/**identifikace organizace do ORG*/
		org?: string|null;
		/**úplný název dle zřizovací listiny*/
		ob_jmeno?: string|null;
		/**příjmení ředitele společnosti*/
		prijmeni_red?: string|null;
		/**jméno ředitele společnosti*/
		jmeno_red?: string|null;
		/**titul před jménem ředitele společnosti*/
		tit_pred_red?: string|null;
		/**titul za jménem ředitele společnosti*/
		tit_za_red?: string|null;
		/**telefon ředitele*/
		tel_red?: string|null;
		/**fax ředitele*/
		fax_red?: string|null;
		/**zřizovatel organizace*/
		zrizovatel?: string|null;
		/**IČO evidenčního střediska*/
		ico_stredisko?: string|null;
		/**evidenční středisko*/
		stredisko?: string|null;
		ico_vl_stredisko?: string|null;
		nuts?: string|null;
		sts?: string|null;
		ico_ginis?: string|null;
		ucs_ginis?: string|null;
		nks_ginis?: string|null;
		priz_kap?: string|null;
		kap?: string|null;
		cfs_orgnum?: number|null;
		abf_orgnum?: number|null;
		orgnum_n?: number|null;
		orgnum_t?: number|null;
		kl_slova?: string|null;
		/**místo podnikání*/
		ixs_esu_mistop?: string|null;
		/**právní forma*/
		prav_forma?: string|null;
		/**statutární zástupce*/
		stat_zastupce?: string|null;
		/**předmět podnikání hlavní činnost*/
		pp_hlavni_cin?: string|null;
		/**předmět podnikání vedlejší činnost*/
		pp_vedlejsi_cin?: string|null;
		/**WWW stránky organizace*/
		org_www?: string|null;
		/**osoba odpovědná za účetnictví*/
		ixs_esu_uct?: string|null;
		/**osoba odpovědná za rozpočet*/
		ixs_esu_roz?: string|null;
		/**osoba odpovědná za výkazy*/
		ixs_esu_vyk?: string|null;
		dor2?: string|null;
		tuj?: string|null;
		aktivita_skut?: number|null;
	}
	const enum GEkosrarDtoNames { ixs_rar = "ixs_rar", ico = "ico", ixs_esu = "ixs_esu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ulice = "ulice", sidlo = "sidlo", psc = "psc", prac = "prac", tel = "tel", fax = "fax", ctvrt = "ctvrt", riz1 = "riz1", riz2 = "riz2", riz3 = "riz3", vstup = "vstup", uctorg = "uctorg", zue = "zue", dor = "dor", dur = "dur", kao = "kao", okec = "okec", sorpvt = "sorpvt", sorsum = "sorsum", sororg = "sororg", typro = "typro", kop = "kop", label = "label", zao = "zao", pao = "pao", zuje = "zuje", dfi = "dfi", dzm = "dzm", naop = "naop", naz1 = "naz1", naz2 = "naz2", naz3 = "naz3", orgnum = "orgnum", typ_org = "typ_org", nazev_pvt = "nazev_pvt", zod = "zod", zko = "zko", cfu = "cfu", tsr = "tsr", dri = "dri", zfo = "zfo", hoc = "hoc", kapitola = "kapitola", orj = "orj", org = "org", ob_jmeno = "ob_jmeno", prijmeni_red = "prijmeni_red", jmeno_red = "jmeno_red", tit_pred_red = "tit_pred_red", tit_za_red = "tit_za_red", tel_red = "tel_red", fax_red = "fax_red", zrizovatel = "zrizovatel", ico_stredisko = "ico_stredisko", stredisko = "stredisko", ico_vl_stredisko = "ico_vl_stredisko", nuts = "nuts", sts = "sts", ico_ginis = "ico_ginis", ucs_ginis = "ucs_ginis", nks_ginis = "nks_ginis", priz_kap = "priz_kap", kap = "kap", cfs_orgnum = "cfs_orgnum", abf_orgnum = "abf_orgnum", orgnum_n = "orgnum_n", orgnum_t = "orgnum_t", kl_slova = "kl_slova", ixs_esu_mistop = "ixs_esu_mistop", prav_forma = "prav_forma", stat_zastupce = "stat_zastupce", pp_hlavni_cin = "pp_hlavni_cin", pp_vedlejsi_cin = "pp_vedlejsi_cin", org_www = "org_www", ixs_esu_uct = "ixs_esu_uct", ixs_esu_roz = "ixs_esu_roz", ixs_esu_vyk = "ixs_esu_vyk", dor2 = "dor2", tuj = "tuj", aktivita_skut = "aktivita_skut",}
	const enum GEkosrarDtoFragments { ixs_rar = "*", ico = "*", ixs_esu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ulice = "*", sidlo = "*", psc = "*", prac = "*", tel = "*", fax = "*", ctvrt = "*", riz1 = "*", riz2 = "*", riz3 = "*", vstup = "*", uctorg = "*", zue = "*", dor = "*", dur = "*", kao = "*", okec = "*", sorpvt = "*", sorsum = "*", sororg = "*", typro = "*", kop = "*", label = "*", zao = "*", pao = "*", zuje = "*", dfi = "*", dzm = "*", naop = "*", naz1 = "*", naz2 = "*", naz3 = "*", orgnum = "*", typ_org = "*", nazev_pvt = "*", zod = "*", zko = "*", cfu = "*", tsr = "*", dri = "*", zfo = "*", hoc = "*", kapitola = "*", orj = "*", org = "*", ob_jmeno = "*", prijmeni_red = "*", jmeno_red = "*", tit_pred_red = "*", tit_za_red = "*", tel_red = "*", fax_red = "*", zrizovatel = "*", ico_stredisko = "*", stredisko = "*", ico_vl_stredisko = "*", nuts = "*", sts = "*", ico_ginis = "*", ucs_ginis = "*", nks_ginis = "*", priz_kap = "*", kap = "*", cfs_orgnum = "*", abf_orgnum = "*", orgnum_n = "*", orgnum_t = "*", kl_slova = "*", ixs_esu_mistop = "*", prav_forma = "*", stat_zastupce = "*", pp_hlavni_cin = "*", pp_vedlejsi_cin = "*", org_www = "*", ixs_esu_uct = "*", ixs_esu_roz = "*", ixs_esu_vyk = "*", dor2 = "*", tuj = "*", aktivita_skut = "*",}
	const enum GEkosrarDtoTypes { ixs_rar = "string", ico = "string", ixs_esu = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ulice = "string", sidlo = "string", psc = "string", prac = "string", tel = "string", fax = "string", ctvrt = "string", riz1 = "string", riz2 = "string", riz3 = "string", vstup = "string", uctorg = "number", zue = "string", dor = "string", dur = "string", kao = "JsonDate", okec = "string", sorpvt = "string", sorsum = "string", sororg = "string", typro = "number", kop = "string", label = "string", zao = "JsonDate", pao = "JsonDate", zuje = "string", dfi = "string", dzm = "number", naop = "string", naz1 = "string", naz2 = "string", naz3 = "string", orgnum = "number", typ_org = "number", nazev_pvt = "string", zod = "string", zko = "string", cfu = "string", tsr = "string", dri = "string", zfo = "string", hoc = "string", kapitola = "string", orj = "string", org = "string", ob_jmeno = "string", prijmeni_red = "string", jmeno_red = "string", tit_pred_red = "string", tit_za_red = "string", tel_red = "string", fax_red = "string", zrizovatel = "string", ico_stredisko = "string", stredisko = "string", ico_vl_stredisko = "string", nuts = "string", sts = "string", ico_ginis = "string", ucs_ginis = "string", nks_ginis = "string", priz_kap = "string", kap = "string", cfs_orgnum = "number", abf_orgnum = "number", orgnum_n = "number", orgnum_t = "number", kl_slova = "string", ixs_esu_mistop = "string", prav_forma = "string", stat_zastupce = "string", pp_hlavni_cin = "string", pp_vedlejsi_cin = "string", org_www = "string", ixs_esu_uct = "string", ixs_esu_roz = "string", ixs_esu_vyk = "string", dor2 = "string", tuj = "string", aktivita_skut = "number",}
	const enum GEkosrarDtoTypeLengths { ixs_rar = 12, ico = 10, ixs_esu = 12, zmenu_prov = 12, nazev = 120, ulice = 50, sidlo = 50, psc = 12, prac = 20, tel = 33, fax = 33, ctvrt = 3, riz1 = 10, riz2 = 10, riz3 = 10, vstup = 1, zue = 1, dor = 1, dur = 2, okec = 6, sorpvt = 3, sorsum = 15, sororg = 40, kop = 7, label = 30, zuje = 6, dfi = 20, naop = 50, naz1 = 50, naz2 = 50, naz3 = 50, nazev_pvt = 23, zod = 1, zko = 4, cfu = 3, tsr = 1, dri = 1, zfo = 1, hoc = 1, kapitola = 3, orj = 20, org = 16, ob_jmeno = 2000, prijmeni_red = 100, jmeno_red = 100, tit_pred_red = 35, tit_za_red = 35, tel_red = 33, fax_red = 33, zrizovatel = 254, ico_stredisko = 10, stredisko = 12, ico_vl_stredisko = 10, nuts = 3, sts = 2, ico_ginis = 10, ucs_ginis = 10, nks_ginis = 12, priz_kap = 1, kap = 3, kl_slova = 254, ixs_esu_mistop = 12, prav_forma = 254, stat_zastupce = 254, pp_hlavni_cin = 254, pp_vedlejsi_cin = 254, org_www = 254, ixs_esu_uct = 12, ixs_esu_roz = 12, ixs_esu_vyk = 12, dor2 = 1, tuj = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkoszujDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekoszuj*/
	interface GEkoszujDto {
		/**DBCOLUMN:ekoszuj.zuje*/
		zuje?: string|null;
		/**DBCOLUMN:ekoszuj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekoszuj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekoszuj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekoszuj.k_v*/
		k_v?: number|null;
	}
	const enum GEkoszujDtoNames { zuje = "zuje", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v",}
	const enum GEkoszujDtoFragments { zuje = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*",}
	const enum GEkoszujDtoTypes { zuje = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number",}
	const enum GEkoszujDtoTypeLengths { zuje = 6, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkovimrDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekovimr
	*      Vazba ixs metodiček na IČO - ixs_ref
	*/
	interface GEkovimrDto {
		ixs_rar?: string|null;
		/**Osoba*/
		ixs_ref?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkovimrDtoNames { ixs_rar = "ixs_rar", ixs_ref = "ixs_ref", dat_od = "dat_od", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovimrDtoFragments { ixs_rar = "*", ixs_ref = "*", dat_od = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovimrDtoTypes { ixs_rar = "string", ixs_ref = "string", dat_od = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovimrDtoTypeLengths { ixs_rar = 12, ixs_ref = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GEkovrarDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:ekovrar*/
	interface GEkovrarDto {
		/**DBCOLUMN:ekovrar.ixs_rar*/
		ixs_rar?: string|null;
		/**DBCOLUMN:ekovrar.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:ekovrar.id_org*/
		id_org?: string|null;
		/**DBCOLUMN:ekovrar.typ_id_org*/
		typ_id_org?: number|null;
		/**DBCOLUMN:ekovrar.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovrar.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekovrar.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovrar.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkovrarDtoNames { ixs_rar = "ixs_rar", por_cislo = "por_cislo", id_org = "id_org", typ_id_org = "typ_id_org", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovrarDtoFragments { ixs_rar = "*", por_cislo = "*", id_org = "*", typ_id_org = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovrarDtoTypes { ixs_rar = "string", por_cislo = "number", id_org = "string", typ_id_org = "number", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovrarDtoTypeLengths { ixs_rar = 12, id_org = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GGincdurDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:gincdur*/
	interface GGincdurDto {
		/**DBCOLUMN:gincdur.dur*/
		dur?: number|null;
		/**DBCOLUMN:gincdur.dur_txt*/
		dur_txt?: string|null;
		/**DBCOLUMN:gincdur.zobrazovat*/
		zobrazovat?: number|null;
		/**DBCOLUMN:gincdur.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincdur.k_s*/
		k_s?: string|null;
	}
	const enum GGincdurDtoNames { dur = "dur", dur_txt = "dur_txt", zobrazovat = "zobrazovat", k_v = "k_v", k_s = "k_s",}
	const enum GGincdurDtoFragments { dur = "*", dur_txt = "*", zobrazovat = "*", k_v = "*", k_s = "*",}
	const enum GGincdurDtoTypes { dur = "number", dur_txt = "string", zobrazovat = "number", k_v = "number", k_s = "string",}
	const enum GGincdurDtoTypeLengths { dur_txt = 100, k_s = 15,}
	/**ENUM:gincdur*/
	const enum GGincdurEnum {
		/**OSS-pokud není správce kapitoly,PO*/
		_0=0,
		/**MHMP*/
		_1=1,
		/**podřízená MHMP*/
		_7=7,
		/**OSS-správce kapitoly*/
		_9=9,
		/**krajský úřad*/
		_10=10,
		/**magistrátní úřad*/
		_11=11,
		/**obvodní úřad městské části statutárního města,jehož ICL není MÚ-do roku 2000*/
		_20=20,
		/**okresní úřad*/
		_30=30,
		/**městský úřad statutárního města,který je i obcí s rozšířenou působností*/
		_41=41,
		/**městský úřad obce,jež není obcí s rozšířenou působností ani pověřeným OÚ*/
		_50=50,
		/**městský úřad obce,jež je obcí s rozšířenou působností*/
		_51=51,
		/**městský úřad obce,jež je pověřeným OÚ,ale není obcí s rozšířenou působnos*/
		_52=52,
		/**obecní úřad obce,jež není obcí s rozšířenou působností ani pověřeným OÚ*/
		_60=60,
		/**obecní úřad obce,jež je obcí s rozšířenou působností*/
		_61=61,
		/**obecní úřad obce,jež je pověřeným OÚ,ale není obcí s rozšířenou působností*/
		_62=62,
		/**obvodní úřad městské části statutárního města,jehož ICL je MÚ-do roku 2000*/
		_70=70,
		/**DSO-dobrovolný svazek obcí*/
		_80=80,
	}
	function GGincdurEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincdurEnum, Gordic.Ado.Interface.GGincdurDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GNutsReaderDto.d.ts 

declare namespace Gordic.Ado.Interface {
	interface GNutsReaderDto {
		nuts?: string|null;
		nuts_txt?: string|null;
		aktivita?: number|null;
	}
	const enum GNutsReaderDtoNames { nuts = "nuts", nuts_txt = "nuts_txt", aktivita = "aktivita",}
	const enum GNutsReaderDtoFragments { nuts = "*", nuts_txt = "*", aktivita = "*",}
	const enum GNutsReaderDtoTypes { nuts = "string", nuts_txt = "string", aktivita = "number",}
	const enum GNutsReaderDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Dtos\GVykcokeDto.d.ts 

declare namespace Gordic.Ado.Interface {
	/**DBTABLE:vykcoke*/
	interface GVykcokeDto {
		/**CZ-NACE (OKEČ) se vyplňují v ADO*/
		okec?: string|null;
		/**DBCOLUMN:vykcoke.okec_txt*/
		okec_txt?: string|null;
		/**DBCOLUMN:vykcoke.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:vykcoke.k_s*/
		k_s?: string|null;
	}
	const enum GVykcokeDtoNames { okec = "okec", okec_txt = "okec_txt", k_v = "k_v", k_s = "k_s",}
	const enum GVykcokeDtoFragments { okec = "*", okec_txt = "*", k_v = "*", k_s = "*",}
	const enum GVykcokeDtoTypes { okec = "string", okec_txt = "string", k_v = "number", k_s = "string",}
	const enum GVykcokeDtoTypeLengths { okec = 6, okec_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Interfaces\IGAdoMailCertOrganizace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain GinisAdmin
	* @businessObject AdoMailCertOrganizace
	*/
	interface AdoMailCertOrganizace {
		/**Read*/
		read(rq?:Gordic.Ado.Interface.GAdoMailCertOrganizaceDto|CallParams<GServiceReadRequest<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>>): _Task<GServiceReadRequest<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>,GServiceReadResponse<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ado.Interface.GAdoMailCertOrganizaceDto|CallParams<GServiceSaveRequest<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>>): _Task<GServiceSaveRequest<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>,GServiceSaveResponse<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ado.Interface.GAdoMailCertOrganizaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdoMailCertOrganizace: ServiceBase & Catalog.AdoMailCertOrganizace;
	}
	const AdoMailCertOrganizace: Client["AdoMailCertOrganizace"];
}
declare namespace Gordic.Ado.Interface {
	interface GAdoMailCertOrganizaceDto extends Gordic.Ado.Interface.GEkovrarDto {
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdoMailCertOrganizaceDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_rar = "ixs_rar", por_cislo = "por_cislo", id_org = "id_org", typ_id_org = "typ_id_org", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdoMailCertOrganizaceDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_rar = "*", por_cislo = "*", id_org = "*", typ_id_org = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdoMailCertOrganizaceDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_rar = "string", por_cislo = "number", id_org = "string", typ_id_org = "number", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdoMailCertOrganizaceDtoTypeLengths { ixs_rar = 12, id_org = 254, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdoMailCertOrganizaceFilterEnum {
		/**Aktivita*/
		aktivita,
		/**identifikátor*/
		ixs_rar,
		/**por_cislo*/
		por_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Interfaces\IGAdoMetodicky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain GinisAdmin
	* @businessObject AdoMetodicka
	*/
	interface AdoMetodicky {
		/**Read*/
		read(rq?:Gordic.Ado.Interface.GAdoMetodickyDto|CallParams<GServiceReadRequest<Gordic.Ado.Interface.GAdoMetodickyDto>>): _Task<GServiceReadRequest<Gordic.Ado.Interface.GAdoMetodickyDto>,GServiceReadResponse<Gordic.Ado.Interface.GAdoMetodickyDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ado.Interface.GAdoMetodickyDto|CallParams<GServiceSaveRequest<Gordic.Ado.Interface.GAdoMetodickyDto>>): _Task<GServiceSaveRequest<Gordic.Ado.Interface.GAdoMetodickyDto>,GServiceSaveResponse<Gordic.Ado.Interface.GAdoMetodickyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ado.Interface.GAdoMetodickyDto>>;
		listHistory(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ado.Interface.GAdoMetodickyHistoryDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdoMetodicky: ServiceBase & Catalog.AdoMetodicky;
	}
	const AdoMetodicky: Client["AdoMetodicky"];
}
declare namespace Gordic.Ado.Interface {
	interface GAdoMetodickyHistoryDto extends Gordic.Ado.Interface.GEkohimrDto {
		ixs_ref_txt?: string|null;
		orgnum?: number|null;
		naop?: string|null;
		nazev?: string|null;
		okec?: string|null;
		riz1?: string|null;
		ico?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdoMetodickyHistoryDtoNames { ixs_ref_txt = "ixs_ref_txt", orgnum = "orgnum", naop = "naop", nazev = "nazev", okec = "okec", riz1 = "riz1", ico = "ico", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_rar = "ixs_rar", ixs_ref = "ixs_ref", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdoMetodickyHistoryDtoFragments { ixs_ref_txt = "*", orgnum = "*", naop = "*", nazev = "*", okec = "*", riz1 = "*", ico = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_rar = "*", ixs_ref = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdoMetodickyHistoryDtoTypes { ixs_ref_txt = "string", orgnum = "number", naop = "string", nazev = "string", okec = "string", riz1 = "string", ico = "string", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_rar = "string", ixs_ref = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdoMetodickyHistoryDtoTypeLengths { ixs_rar = 12, ixs_ref = 12, zmenu_prov = 12,}
	const enum GAdoMetodickyHistoryFilterEnum {
		/**Aktivita*/
		aktivita,
		/**identifikátor*/
		ixs_rar,
		ixs_ref,
		dat_od,
	}
	interface GAdoMetodickyDto extends Gordic.Ado.Interface.GEkovimrDto {
		ixs_ref_txt?: string|null;
		dat_do?: JsonDate|null;
		orgnum?: number|null;
		naop?: string|null;
		nazev?: string|null;
		okec?: string|null;
		riz1?: string|null;
		ico?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdoMetodickyDtoNames { ixs_ref_txt = "ixs_ref_txt", dat_do = "dat_do", orgnum = "orgnum", naop = "naop", nazev = "nazev", okec = "okec", riz1 = "riz1", ico = "ico", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_rar = "ixs_rar", ixs_ref = "ixs_ref", dat_od = "dat_od", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdoMetodickyDtoFragments { ixs_ref_txt = "*", dat_do = "*", orgnum = "*", naop = "*", nazev = "*", okec = "*", riz1 = "*", ico = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_rar = "*", ixs_ref = "*", dat_od = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdoMetodickyDtoTypes { ixs_ref_txt = "string", dat_do = "JsonDate", orgnum = "number", naop = "string", nazev = "string", okec = "string", riz1 = "string", ico = "string", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_rar = "string", ixs_ref = "string", dat_od = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdoMetodickyDtoTypeLengths { ixs_rar = 12, ixs_ref = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdoMetodickyFilterEnum {
		/**Aktivita*/
		aktivita,
		/**identifikátor*/
		ixs_rar,
		/**Ičo?*/
		ixs_ref,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Interfaces\IGAdoOkecService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     CZ-NACE (OKEČ)  - vykcoke
	*     
	* @domain GinisAdmin
	* @businessObject AdoOkecService
	*/
	interface AdoOkecService {
		/**
		*     Read
		*     
		*/
		read(rq?:Gordic.Ado.Interface.GOkecDto|CallParams<GServiceReadRequest<Gordic.Ado.Interface.GOkecDto>>): _Task<GServiceReadRequest<Gordic.Ado.Interface.GOkecDto>,GServiceReadResponse<Gordic.Ado.Interface.GOkecDto>>;
		/**
		*     Založení nebo aktualizace
		*     
		*/
		upsert(rq?:Gordic.Ado.Interface.GOkecDto|CallParams<GServiceSaveRequest<Gordic.Ado.Interface.GOkecDto>>): _Task<GServiceSaveRequest<Gordic.Ado.Interface.GOkecDto>,GServiceSaveResponse<Gordic.Ado.Interface.GOkecDto>>;
		/**
		*     List
		*     
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ado.Interface.GOkecDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdoOkecService: ServiceBase & Catalog.AdoOkecService;
	}
	const AdoOkecService: Client["AdoOkecService"];
}
declare namespace Gordic.Ado.Interface {
	/**
	*     DTO pro ISL READ - CZ-NACE (OKEČ)  - vykcoke
	*     
	*/
	interface GOkecDto extends Gordic.Ado.Interface.GEkosokeDto {
		zmenu_prov_txt?: string|null;
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**
		*     Informace důležité k načtení dat 
		*     
		*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GOkecDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", okec = "okec", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v",}
	const enum GOkecDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", okec = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*",}
	const enum GOkecDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", okec = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number",}
	const enum GOkecDtoTypeLengths { okec = 6, nazev = 100, zmenu_prov = 12,}
	/**
	*     Filtry pro požadavky na budování LISTu 
	*     
	*/
	const enum GOkecDtoFilterEnum {
		/**
		*     PK tabulky - CZ-NACE (OKEČ) 
		*     
		*/
		okec,
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Interfaces\IGAdoRegistrOrganizaci.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	* @domain GinisAdmin
	* @businessObject AdoRegistrOrganizaci
	*/
	interface AdoRegistrOrganizaci {
		/**Read*/
		read(rq?:Gordic.Ado.Interface.GAdoRegirstOrganizaciDto|CallParams<GServiceReadRequest<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>>): _Task<GServiceReadRequest<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>,GServiceReadResponse<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ado.Interface.GAdoRegirstOrganizaciDto|CallParams<GServiceSaveRequest<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>>): _Task<GServiceSaveRequest<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>,GServiceSaveResponse<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdoRegistrOrganizaci: ServiceBase & Catalog.AdoRegistrOrganizaci;
	}
	const AdoRegistrOrganizaci: Client["AdoRegistrOrganizaci"];
}
declare namespace Gordic.Ado.Interface {
	interface GAdoRegirstOrganizaciDto extends Gordic.Ado.Interface.GEkosrarDto {
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		dor_txt?: string|null;
		dor_txt2?: string|null;
		dur_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdoRegirstOrganizaciDtoNames { zmenu_prov_txt = "zmenu_prov_txt", dor_txt = "dor_txt", dor_txt2 = "dor_txt2", dur_txt = "dur_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_rar = "ixs_rar", ico = "ico", ixs_esu = "ixs_esu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ulice = "ulice", sidlo = "sidlo", psc = "psc", prac = "prac", tel = "tel", fax = "fax", ctvrt = "ctvrt", riz1 = "riz1", riz2 = "riz2", riz3 = "riz3", vstup = "vstup", uctorg = "uctorg", zue = "zue", dor = "dor", dur = "dur", kao = "kao", okec = "okec", sorpvt = "sorpvt", sorsum = "sorsum", sororg = "sororg", typro = "typro", kop = "kop", label = "label", zao = "zao", pao = "pao", zuje = "zuje", dfi = "dfi", dzm = "dzm", naop = "naop", naz1 = "naz1", naz2 = "naz2", naz3 = "naz3", orgnum = "orgnum", typ_org = "typ_org", nazev_pvt = "nazev_pvt", zod = "zod", zko = "zko", cfu = "cfu", tsr = "tsr", dri = "dri", zfo = "zfo", hoc = "hoc", kapitola = "kapitola", orj = "orj", org = "org", ob_jmeno = "ob_jmeno", prijmeni_red = "prijmeni_red", jmeno_red = "jmeno_red", tit_pred_red = "tit_pred_red", tit_za_red = "tit_za_red", tel_red = "tel_red", fax_red = "fax_red", zrizovatel = "zrizovatel", ico_stredisko = "ico_stredisko", stredisko = "stredisko", ico_vl_stredisko = "ico_vl_stredisko", nuts = "nuts", sts = "sts", ico_ginis = "ico_ginis", ucs_ginis = "ucs_ginis", nks_ginis = "nks_ginis", priz_kap = "priz_kap", kap = "kap", cfs_orgnum = "cfs_orgnum", abf_orgnum = "abf_orgnum", orgnum_n = "orgnum_n", orgnum_t = "orgnum_t", kl_slova = "kl_slova", ixs_esu_mistop = "ixs_esu_mistop", prav_forma = "prav_forma", stat_zastupce = "stat_zastupce", pp_hlavni_cin = "pp_hlavni_cin", pp_vedlejsi_cin = "pp_vedlejsi_cin", org_www = "org_www", ixs_esu_uct = "ixs_esu_uct", ixs_esu_roz = "ixs_esu_roz", ixs_esu_vyk = "ixs_esu_vyk", dor2 = "dor2", tuj = "tuj", aktivita_skut = "aktivita_skut",}
	const enum GAdoRegirstOrganizaciDtoFragments { zmenu_prov_txt = "*", dor_txt = "*", dor_txt2 = "*", dur_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_rar = "*", ico = "*", ixs_esu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ulice = "*", sidlo = "*", psc = "*", prac = "*", tel = "*", fax = "*", ctvrt = "*", riz1 = "*", riz2 = "*", riz3 = "*", vstup = "*", uctorg = "*", zue = "*", dor = "*", dur = "*", kao = "*", okec = "*", sorpvt = "*", sorsum = "*", sororg = "*", typro = "*", kop = "*", label = "*", zao = "*", pao = "*", zuje = "*", dfi = "*", dzm = "*", naop = "*", naz1 = "*", naz2 = "*", naz3 = "*", orgnum = "*", typ_org = "*", nazev_pvt = "*", zod = "*", zko = "*", cfu = "*", tsr = "*", dri = "*", zfo = "*", hoc = "*", kapitola = "*", orj = "*", org = "*", ob_jmeno = "*", prijmeni_red = "*", jmeno_red = "*", tit_pred_red = "*", tit_za_red = "*", tel_red = "*", fax_red = "*", zrizovatel = "*", ico_stredisko = "*", stredisko = "*", ico_vl_stredisko = "*", nuts = "*", sts = "*", ico_ginis = "*", ucs_ginis = "*", nks_ginis = "*", priz_kap = "*", kap = "*", cfs_orgnum = "*", abf_orgnum = "*", orgnum_n = "*", orgnum_t = "*", kl_slova = "*", ixs_esu_mistop = "*", prav_forma = "*", stat_zastupce = "*", pp_hlavni_cin = "*", pp_vedlejsi_cin = "*", org_www = "*", ixs_esu_uct = "*", ixs_esu_roz = "*", ixs_esu_vyk = "*", dor2 = "*", tuj = "*", aktivita_skut = "*",}
	const enum GAdoRegirstOrganizaciDtoTypes { zmenu_prov_txt = "string", dor_txt = "string", dor_txt2 = "string", dur_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_rar = "string", ico = "string", ixs_esu = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ulice = "string", sidlo = "string", psc = "string", prac = "string", tel = "string", fax = "string", ctvrt = "string", riz1 = "string", riz2 = "string", riz3 = "string", vstup = "string", uctorg = "number", zue = "string", dor = "string", dur = "string", kao = "JsonDate", okec = "string", sorpvt = "string", sorsum = "string", sororg = "string", typro = "number", kop = "string", label = "string", zao = "JsonDate", pao = "JsonDate", zuje = "string", dfi = "string", dzm = "number", naop = "string", naz1 = "string", naz2 = "string", naz3 = "string", orgnum = "number", typ_org = "number", nazev_pvt = "string", zod = "string", zko = "string", cfu = "string", tsr = "string", dri = "string", zfo = "string", hoc = "string", kapitola = "string", orj = "string", org = "string", ob_jmeno = "string", prijmeni_red = "string", jmeno_red = "string", tit_pred_red = "string", tit_za_red = "string", tel_red = "string", fax_red = "string", zrizovatel = "string", ico_stredisko = "string", stredisko = "string", ico_vl_stredisko = "string", nuts = "string", sts = "string", ico_ginis = "string", ucs_ginis = "string", nks_ginis = "string", priz_kap = "string", kap = "string", cfs_orgnum = "number", abf_orgnum = "number", orgnum_n = "number", orgnum_t = "number", kl_slova = "string", ixs_esu_mistop = "string", prav_forma = "string", stat_zastupce = "string", pp_hlavni_cin = "string", pp_vedlejsi_cin = "string", org_www = "string", ixs_esu_uct = "string", ixs_esu_roz = "string", ixs_esu_vyk = "string", dor2 = "string", tuj = "string", aktivita_skut = "number",}
	const enum GAdoRegirstOrganizaciDtoTypeLengths { ixs_rar = 12, ico = 10, ixs_esu = 12, zmenu_prov = 12, nazev = 120, ulice = 50, sidlo = 50, psc = 12, prac = 20, tel = 33, fax = 33, ctvrt = 3, riz1 = 10, riz2 = 10, riz3 = 10, vstup = 1, zue = 1, dor = 1, dur = 2, okec = 6, sorpvt = 3, sorsum = 15, sororg = 40, kop = 7, label = 30, zuje = 6, dfi = 20, naop = 50, naz1 = 50, naz2 = 50, naz3 = 50, nazev_pvt = 23, zod = 1, zko = 4, cfu = 3, tsr = 1, dri = 1, zfo = 1, hoc = 1, kapitola = 3, orj = 20, org = 16, ob_jmeno = 2000, prijmeni_red = 100, jmeno_red = 100, tit_pred_red = 35, tit_za_red = 35, tel_red = 33, fax_red = 33, zrizovatel = 254, ico_stredisko = 10, stredisko = 12, ico_vl_stredisko = 10, nuts = 3, sts = 2, ico_ginis = 10, ucs_ginis = 10, nks_ginis = 12, priz_kap = 1, kap = 3, kl_slova = 254, ixs_esu_mistop = 12, prav_forma = 254, stat_zastupce = 254, pp_hlavni_cin = 254, pp_vedlejsi_cin = 254, org_www = 254, ixs_esu_uct = 12, ixs_esu_roz = 12, ixs_esu_vyk = 12, dor2 = 1, tuj = 1,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdoRegirstOrganizaciFilterEnum {
		orgnum_od,
		orgnum_do,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
		/**identifikátor*/
		ixs_rar,
		/**Název*/
		nazev,
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico,
		/**Identifikátor externího subjektu*/
		ixs_esu,
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena,
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov,
		/**Ulice*/
		ulice,
		/**Sídlо / obec*/
		sidlo,
		/**PSČ*/
		psc,
		/**Pracoviště*/
		prac,
		/**Telefon*/
		tel,
		/**Fax*/
		fax,
		/**Čtvrť*/
		ctvrt,
		/**riz1*/
		riz1,
		/**riz2*/
		riz2,
		/**riz3*/
		riz3,
		/**vstup*/
		vstup,
		/**účetní organizace*/
		uctorg,
		/**zue*/
		zue,
		/**dor*/
		dor,
		/**dur*/
		dur,
		/**kao*/
		kao,
		/**CZ-NACE (OKEČ)*/
		okec,
		/**sorpvt*/
		sorpvt,
		/**sorsum*/
		sorsum,
		/**sororg*/
		sororg,
		/**typro*/
		typro,
		/**kop*/
		kop,
		/**label*/
		label,
		/**zao*/
		zao,
		/**pao*/
		pao,
		/**zuje*/
		zuje,
		/**dfi*/
		dfi,
		/**dzm*/
		dzm,
		/**naop*/
		naop,
		/**naz1*/
		naz1,
		/**naz2*/
		naz2,
		/**naz3*/
		naz3,
		/**orgnum*/
		orgnum,
		/**Typ organizace*/
		typ_org,
		/**název_pvt*/
		nazev_pvt,
		/**zod*/
		zod,
		/**zko*/
		zko,
		/**cfu*/
		cfu,
		/**tsr*/
		tsr,
		/**dri*/
		dri,
		/**zfo*/
		zfo,
		/**hoc*/
		hoc,
		/**kap*/
		kapitola,
		/**číslo odpovědného odboru*/
		orj,
		/**identifikace organizace do ORG*/
		org,
		/**úplný název dle zřizovací listiny*/
		ob_jmeno,
		/**příjmení ředitele společnosti*/
		prijmeni_red,
		/**jméno ředitele společnosti*/
		jmeno_red,
		/**titul před jménem ředitele společnosti*/
		tit_pred_red,
		/**titul za jménem ředitele společnosti*/
		tit_za_red,
		/**telefon ředitele*/
		tel_red,
		/**fax ředitele*/
		fax_red,
		/**zřizovatel organizace*/
		zrizovatel,
		/**IČO evidenčního střediska*/
		ico_stredisko,
		/**evidenční středisko*/
		stredisko,
		/**ico_vl_stredisko*/
		ico_vl_stredisko,
		/**nuts*/
		nuts,
		/**sts*/
		sts,
		/**ico_ginis*/
		ico_ginis,
		/**ucs_ginis*/
		ucs_ginis,
		/**nks_ginis*/
		nks_ginis,
		/**priz_kap*/
		priz_kap,
		/**kap*/
		kap,
		/**cfs_orgnum*/
		cfs_orgnum,
		/**abf_orgnum*/
		abf_orgnum,
		/**orgnum_n*/
		orgnum_n,
		/**orgnum_t*/
		orgnum_t,
		/**klíčová slova*/
		kl_slova,
		/**místo podnikání*/
		ixs_esu_mistop,
		/**právní forma*/
		prav_forma,
		/**statutární zástupce*/
		stat_zastupce,
		/**předmět podnikání – hlavní činnost*/
		pp_hlavni_cin,
		/**předmět podnikání – vedlejší činnost*/
		pp_vedlejsi_cin,
		/**WWW stránky organizace*/
		org_www,
		/**osoba odpovědná za účetnictví*/
		ixs_esu_uct,
		/**osoba odpovědná za rozpočet*/
		ixs_esu_roz,
		/**osoba odpovědná za výkazy*/
		ixs_esu_vyk,
		/**dor2*/
		dor2,
		/**tuj*/
		tuj,
		/**Skutečná aktivita*/
		aktivita_skut,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ado.Interface\Ado\Interfaces\IGAdoZujeService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     CZ-NACE (OKEČ)  - vykcoke
	*     
	* @domain GinisAdmin
	* @businessObject AdoZujeService
	*/
	interface AdoZujeService {
		/**
		*     Read
		*     
		*/
		read(rq?:Gordic.Ado.Interface.GZujeDto|CallParams<GServiceReadRequest<Gordic.Ado.Interface.GZujeDto>>): _Task<GServiceReadRequest<Gordic.Ado.Interface.GZujeDto>,GServiceReadResponse<Gordic.Ado.Interface.GZujeDto>>;
		/**
		*     Založení nebo aktualizace
		*     
		*/
		upsert(rq?:Gordic.Ado.Interface.GZujeDto|CallParams<GServiceSaveRequest<Gordic.Ado.Interface.GZujeDto>>): _Task<GServiceSaveRequest<Gordic.Ado.Interface.GZujeDto>,GServiceSaveResponse<Gordic.Ado.Interface.GZujeDto>>;
		/**
		*     List
		*     
		*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ado.Interface.GZujeDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdoZujeService: ServiceBase & Catalog.AdoZujeService;
	}
	const AdoZujeService: Client["AdoZujeService"];
}
declare namespace Gordic.Ado.Interface {
	/**
	*     DTO pro ISL READ - Zuje
	*     
	*/
	interface GZujeDto extends Gordic.Ado.Interface.GEkoszujDto {
		zmenu_prov_txt?: string|null;
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**
		*     Informace důležité k načtení dat 
		*     
		*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GZujeDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", zuje = "zuje", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v",}
	const enum GZujeDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", zuje = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*",}
	const enum GZujeDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", zuje = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number",}
	const enum GZujeDtoTypeLengths { zuje = 6, nazev = 50, zmenu_prov = 12,}
	/**
	*     Filtry pro požadavky na budování LISTu 
	*     
	*/
	const enum GZujeDtoFilterEnum {
		/**
		*     PK tabulky - CZ-NACE (OKEČ) 
		*     
		*/
		zuje,
		nazev,
	}
}

//#endregion

