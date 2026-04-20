/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       isep.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Isep.Interface\Gordic.Isep.Interface.csproj
*    created     2026-02-16 14:33:50
*    files       DTO\GIsepIspsblkDto.d.ts
*                DTO\GIsepIspsopiDto.d.ts
*                DTO\GIsepIspsorgDto.d.ts
*                DTO\GIsepIspsosoDto.d.ts
*                DTO\GIsepIspsparDto.d.ts
*                DTO\GIsepIspsreqDto.d.ts
*                DTO\GIsepIspssnkDto.d.ts
*                DTO\GIsepOpisPrestupkuDto.d.ts
*                DTO\Request\GIsepOpisPrestupkuAifoRequestDto.d.ts
*                DTO\Request\GIsepOpisPrestupkuCizinecPravnickaRequestDto.d.ts
*                DTO\Request\GIsepOpisPrestupkuCizinecRequestDto.d.ts
*                DTO\Request\GIsepOpisPrestupkuEsuRequestDto.d.ts
*                DTO\Request\GIsepOpisPrestupkuIcoRequestDto.d.ts
*                DTO\Request\GIsepOpisPrestupkuZakladRequestDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspsblkDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:Ispsblk*/
	interface GIsepIspsblkDto {
		/**DBCOLUMN:Ispsblk.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispsblk.poradi_oso*/
		poradi_oso?: number|null;
		/**DBCOLUMN:Ispsblk.poradi_org*/
		poradi_org?: number|null;
		/**DBCOLUMN:Ispsblk.poradi_blk*/
		poradi_blk?: number|null;
		/**DBCOLUMN:Ispsblk.cislo_bloku*/
		cislo_bloku?: string|null;
		/**DBCOLUMN:Ispsblk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ispsblk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ispsblk.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GIsepIspsblkDtoNames { zprava_isep = "zprava_isep", poradi_oso = "poradi_oso", poradi_org = "poradi_org", poradi_blk = "poradi_blk", cislo_bloku = "cislo_bloku", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GIsepIspsblkDtoFragments { zprava_isep = "*", poradi_oso = "*", poradi_org = "*", poradi_blk = "*", cislo_bloku = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GIsepIspsblkDtoTypes { zprava_isep = "string", poradi_oso = "number", poradi_org = "number", poradi_blk = "number", cislo_bloku = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GIsepIspsblkDtoTypeLengths { zprava_isep = 36, cislo_bloku = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspsopiDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:Ispsopi*/
	interface GIsepIspsopiDto {
		/**DBCOLUMN:Ispsopi.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispsopi.poradi_oso*/
		poradi_oso?: number|null;
		/**DBCOLUMN:Ispsopi.poradi_org*/
		poradi_org?: number|null;
		/**DBCOLUMN:Ispsopi.poradi_par*/
		poradi_par?: number|null;
		/**DBCOLUMN:Ispsopi.zakon*/
		zakon?: string|null;
		/**DBCOLUMN:Ispsopi.paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:Ispsopi.odstavec*/
		odstavec?: number|null;
		/**DBCOLUMN:Ispsopi.pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:Ispsopi.typ_zav*/
		typ_zav?: number|null;
		/**DBCOLUMN:Ispsopi.typ_zav_txt*/
		typ_zav_txt?: string|null;
		/**DBCOLUMN:Ispsopi.prestupek_txt*/
		prestupek_txt?: string|null;
		/**DBCOLUMN:Ispsopi.dat_rozhodnuti*/
		dat_rozhodnuti?: JsonDate|null;
		/**DBCOLUMN:Ispsopi.dat_prm*/
		dat_prm?: JsonDate|null;
		/**DBCOLUMN:Ispsopi.org_oznaceni*/
		org_oznaceni?: string|null;
		/**DBCOLUMN:Ispsopi.org_sidlo*/
		org_sidlo?: string|null;
		/**DBCOLUMN:Ispsopi.sankce*/
		sankce?: string|null;
		/**DBCOLUMN:Ispsopi.typ_org_isep*/
		typ_org_isep?: number|null;
		/**DBCOLUMN:Ispsopi.typ_org_isep_txt*/
		typ_org_isep_txt?: string|null;
	}
	const enum GIsepIspsopiDtoNames { zprava_isep = "zprava_isep", poradi_oso = "poradi_oso", poradi_org = "poradi_org", poradi_par = "poradi_par", zakon = "zakon", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", typ_zav = "typ_zav", typ_zav_txt = "typ_zav_txt", prestupek_txt = "prestupek_txt", dat_rozhodnuti = "dat_rozhodnuti", dat_prm = "dat_prm", org_oznaceni = "org_oznaceni", org_sidlo = "org_sidlo", sankce = "sankce", typ_org_isep = "typ_org_isep", typ_org_isep_txt = "typ_org_isep_txt",}
	const enum GIsepIspsopiDtoFragments { zprava_isep = "*", poradi_oso = "*", poradi_org = "*", poradi_par = "*", zakon = "*", paragraf = "*", odstavec = "*", pismeno = "*", typ_zav = "*", typ_zav_txt = "*", prestupek_txt = "*", dat_rozhodnuti = "*", dat_prm = "*", org_oznaceni = "*", org_sidlo = "*", sankce = "*", typ_org_isep = "*", typ_org_isep_txt = "*",}
	const enum GIsepIspsopiDtoTypes { zprava_isep = "string", poradi_oso = "number", poradi_org = "number", poradi_par = "number", zakon = "string", paragraf = "string", odstavec = "number", pismeno = "string", typ_zav = "number", typ_zav_txt = "string", prestupek_txt = "string", dat_rozhodnuti = "JsonDate", dat_prm = "JsonDate", org_oznaceni = "string", org_sidlo = "string", sankce = "string", typ_org_isep = "number", typ_org_isep_txt = "string",}
	const enum GIsepIspsopiDtoTypeLengths { zprava_isep = 36, zakon = 100, paragraf = 4, pismeno = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspsorgDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:Ispsorg*/
	interface GIsepIspsorgDto {
		/**DBCOLUMN:Ispsorg.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispsorg.poradi_oso*/
		poradi_oso?: number|null;
		/**DBCOLUMN:Ispsorg.poradi_org*/
		poradi_org?: number|null;
		/**DBCOLUMN:Ispsorg.typ_org_isep*/
		typ_org_isep?: number|null;
		/**DBCOLUMN:Ispsorg.oznaceni*/
		oznaceni?: string|null;
		/**DBCOLUMN:Ispsorg.sidlo*/
		sidlo?: string|null;
		/**DBCOLUMN:Ispsorg.cj*/
		cj?: string|null;
		/**DBCOLUMN:Ispsorg.dat_rozhodnuti*/
		dat_rozhodnuti?: JsonDate|null;
		/**DBCOLUMN:Ispsorg.dat_prm*/
		dat_prm?: JsonDate|null;
		/**DBCOLUMN:Ispsorg.ure_jmeno*/
		ure_jmeno?: string|null;
		/**DBCOLUMN:Ispsorg.ure_prijmeni*/
		ure_prijmeni?: string|null;
		/**DBCOLUMN:Ispsorg.ure_cislo*/
		ure_cislo?: string|null;
		/**DBCOLUMN:Ispsorg.ure_funkce*/
		ure_funkce?: string|null;
		/**DBCOLUMN:Ispsorg.zaplaceno*/
		zaplaceno?: number|null;
		/**DBCOLUMN:Ispsorg.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ispsorg.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ispsorg.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GIsepIspsorgDtoNames { zprava_isep = "zprava_isep", poradi_oso = "poradi_oso", poradi_org = "poradi_org", typ_org_isep = "typ_org_isep", oznaceni = "oznaceni", sidlo = "sidlo", cj = "cj", dat_rozhodnuti = "dat_rozhodnuti", dat_prm = "dat_prm", ure_jmeno = "ure_jmeno", ure_prijmeni = "ure_prijmeni", ure_cislo = "ure_cislo", ure_funkce = "ure_funkce", zaplaceno = "zaplaceno", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GIsepIspsorgDtoFragments { zprava_isep = "*", poradi_oso = "*", poradi_org = "*", typ_org_isep = "*", oznaceni = "*", sidlo = "*", cj = "*", dat_rozhodnuti = "*", dat_prm = "*", ure_jmeno = "*", ure_prijmeni = "*", ure_cislo = "*", ure_funkce = "*", zaplaceno = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GIsepIspsorgDtoTypes { zprava_isep = "string", poradi_oso = "number", poradi_org = "number", typ_org_isep = "number", oznaceni = "string", sidlo = "string", cj = "string", dat_rozhodnuti = "JsonDate", dat_prm = "JsonDate", ure_jmeno = "string", ure_prijmeni = "string", ure_cislo = "string", ure_funkce = "string", zaplaceno = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GIsepIspsorgDtoTypeLengths { zprava_isep = 36, oznaceni = 254, sidlo = 100, cj = 100, ure_jmeno = 100, ure_prijmeni = 100, ure_cislo = 100, ure_funkce = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspsosoDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:Ispsoso*/
	interface GIsepIspsosoDto {
		/**DBCOLUMN:Ispsoso.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispsoso.poradi_oso*/
		poradi_oso?: number|null;
		/**DBCOLUMN:Ispsoso.aifo*/
		aifo?: string|null;
		/**DBCOLUMN:Ispsoso.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Ispsoso.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Ispsoso.rodne_prijmeni*/
		rodne_prijmeni?: string|null;
		/**DBCOLUMN:Ispsoso.rodne_cislo*/
		rodne_cislo?: string|null;
		/**DBCOLUMN:Ispsoso.datum_narozeni*/
		datum_narozeni?: JsonDate|null;
		/**DBCOLUMN:Ispsoso.mist_narokrtxt*/
		mist_narokrtxt?: string|null;
		/**DBCOLUMN:Ispsoso.mist_narokrkod*/
		mist_narokrkod?: number|null;
		/**DBCOLUMN:Ispsoso.mist_nar_kod*/
		mist_nar_kod?: number|null;
		/**DBCOLUMN:Ispsoso.mist_nar_txt*/
		mist_nar_txt?: string|null;
		/**DBCOLUMN:Ispsoso.mist_narstkod*/
		mist_narstkod?: number|null;
		/**DBCOLUMN:Ispsoso.mist_narsttxt*/
		mist_narsttxt?: string|null;
		/**DBCOLUMN:Ispsoso.obc_stat_kod*/
		obc_stat_kod?: number|null;
		/**DBCOLUMN:Ispsoso.obc_stat_txt*/
		obc_stat_txt?: string|null;
		/**DBCOLUMN:Ispsoso.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ispsoso.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ispsoso.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Ispsoso.s_prav*/
		s_prav?: number|null;
		/**DBCOLUMN:Ispsoso.ico*/
		ico?: number|null;
		/**DBCOLUMN:Ispsoso.nazev_osoby*/
		nazev_osoby?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_obec*/
		sidlo_obec?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_ulice*/
		sidlo_ulice?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_cp*/
		sidlo_cp?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_cor*/
		sidlo_cor?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_cor_p*/
		sidlo_cor_p?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_zip*/
		sidlo_zip?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_psc*/
		sidlo_psc?: string|null;
		/**DBCOLUMN:Ispsoso.sidlo_stat_kod*/
		sidlo_stat_kod?: number|null;
		/**DBCOLUMN:Ispsoso.sidlo_stat_txt*/
		sidlo_stat_txt?: string|null;
	}
	const enum GIsepIspsosoDtoNames { zprava_isep = "zprava_isep", poradi_oso = "poradi_oso", aifo = "aifo", jmeno = "jmeno", prijmeni = "prijmeni", rodne_prijmeni = "rodne_prijmeni", rodne_cislo = "rodne_cislo", datum_narozeni = "datum_narozeni", mist_narokrtxt = "mist_narokrtxt", mist_narokrkod = "mist_narokrkod", mist_nar_kod = "mist_nar_kod", mist_nar_txt = "mist_nar_txt", mist_narstkod = "mist_narstkod", mist_narsttxt = "mist_narsttxt", obc_stat_kod = "obc_stat_kod", obc_stat_txt = "obc_stat_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_prav = "s_prav", ico = "ico", nazev_osoby = "nazev_osoby", sidlo_obec = "sidlo_obec", sidlo_ulice = "sidlo_ulice", sidlo_cp = "sidlo_cp", sidlo_cor = "sidlo_cor", sidlo_cor_p = "sidlo_cor_p", sidlo_zip = "sidlo_zip", sidlo_psc = "sidlo_psc", sidlo_stat_kod = "sidlo_stat_kod", sidlo_stat_txt = "sidlo_stat_txt",}
	const enum GIsepIspsosoDtoFragments { zprava_isep = "*", poradi_oso = "*", aifo = "*", jmeno = "*", prijmeni = "*", rodne_prijmeni = "*", rodne_cislo = "*", datum_narozeni = "*", mist_narokrtxt = "*", mist_narokrkod = "*", mist_nar_kod = "*", mist_nar_txt = "*", mist_narstkod = "*", mist_narsttxt = "*", obc_stat_kod = "*", obc_stat_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", s_prav = "*", ico = "*", nazev_osoby = "*", sidlo_obec = "*", sidlo_ulice = "*", sidlo_cp = "*", sidlo_cor = "*", sidlo_cor_p = "*", sidlo_zip = "*", sidlo_psc = "*", sidlo_stat_kod = "*", sidlo_stat_txt = "*",}
	const enum GIsepIspsosoDtoTypes { zprava_isep = "string", poradi_oso = "number", aifo = "string", jmeno = "string", prijmeni = "string", rodne_prijmeni = "string", rodne_cislo = "string", datum_narozeni = "JsonDate", mist_narokrtxt = "string", mist_narokrkod = "number", mist_nar_kod = "number", mist_nar_txt = "string", mist_narstkod = "number", mist_narsttxt = "string", obc_stat_kod = "number", obc_stat_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_prav = "number", ico = "number", nazev_osoby = "string", sidlo_obec = "string", sidlo_ulice = "string", sidlo_cp = "string", sidlo_cor = "string", sidlo_cor_p = "string", sidlo_zip = "string", sidlo_psc = "string", sidlo_stat_kod = "number", sidlo_stat_txt = "string",}
	const enum GIsepIspsosoDtoTypeLengths { zprava_isep = 36, aifo = 24, jmeno = 100, prijmeni = 100, rodne_prijmeni = 100, rodne_cislo = 11, mist_narokrtxt = 100, mist_nar_txt = 100, mist_narsttxt = 100, obc_stat_txt = 100, zmenu_prov = 12, nazev_osoby = 2000, sidlo_obec = 100, sidlo_ulice = 100, sidlo_cp = 10, sidlo_cor = 10, sidlo_cor_p = 10, sidlo_zip = 10, sidlo_psc = 10, sidlo_stat_txt = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspsparDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:Ispspar*/
	interface GIsepIspsparDto {
		/**DBCOLUMN:Ispspar.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispspar.poradi_oso*/
		poradi_oso?: number|null;
		/**DBCOLUMN:Ispspar.poradi_org*/
		poradi_org?: number|null;
		/**DBCOLUMN:Ispspar.poradi_par*/
		poradi_par?: number|null;
		/**DBCOLUMN:Ispspar.zakon*/
		zakon?: string|null;
		/**DBCOLUMN:Ispspar.paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:Ispspar.odstavec*/
		odstavec?: number|null;
		/**DBCOLUMN:Ispspar.pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:Ispspar.typ_zav*/
		typ_zav?: number|null;
		/**DBCOLUMN:Ispspar.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ispspar.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ispspar.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Ispspar.novela_zakona*/
		novela_zakona?: string|null;
		/**DBCOLUMN:Ispspar.bod*/
		bod?: string|null;
	}
	const enum GIsepIspsparDtoNames { zprava_isep = "zprava_isep", poradi_oso = "poradi_oso", poradi_org = "poradi_org", poradi_par = "poradi_par", zakon = "zakon", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", typ_zav = "typ_zav", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", novela_zakona = "novela_zakona", bod = "bod",}
	const enum GIsepIspsparDtoFragments { zprava_isep = "*", poradi_oso = "*", poradi_org = "*", poradi_par = "*", zakon = "*", paragraf = "*", odstavec = "*", pismeno = "*", typ_zav = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", novela_zakona = "*", bod = "*",}
	const enum GIsepIspsparDtoTypes { zprava_isep = "string", poradi_oso = "number", poradi_org = "number", poradi_par = "number", zakon = "string", paragraf = "string", odstavec = "number", pismeno = "string", typ_zav = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", novela_zakona = "string", bod = "string",}
	const enum GIsepIspsparDtoTypeLengths { zprava_isep = 36, zakon = 100, paragraf = 4, pismeno = 3, zmenu_prov = 12, novela_zakona = 100, bod = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspsreqDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:Ispsreq*/
	interface GIsepIspsreqDto {
		/**DBCOLUMN:Ispsreq.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispsreq.cas_vytv_req*/
		cas_vytv_req?: JsonDate|null;
		/**DBCOLUMN:Ispsreq.agenda*/
		agenda?: string|null;
		/**DBCOLUMN:Ispsreq.agendova_role*/
		agendova_role?: string|null;
		/**DBCOLUMN:Ispsreq.ovm*/
		ovm?: string|null;
		/**DBCOLUMN:Ispsreq.uzivatel*/
		uzivatel?: string|null;
		/**DBCOLUMN:Ispsreq.duvod_ucel*/
		duvod_ucel?: string|null;
		/**DBCOLUMN:Ispsreq.typ_req*/
		typ_req?: number|null;
		/**DBCOLUMN:Ispsreq.pozadavek_uid*/
		pozadavek_uid?: string|null;
		/**DBCOLUMN:Ispsreq.prestupek_id*/
		prestupek_id?: string|null;
		/**DBCOLUMN:Ispsreq.evidencni_cislo*/
		evidencni_cislo?: string|null;
		/**DBCOLUMN:Ispsreq.cas_vytv_res*/
		cas_vytv_res?: JsonDate|null;
		/**DBCOLUMN:Ispsreq.typ_duv*/
		typ_duv?: number|null;
		/**DBCOLUMN:Ispsreq.s_blokace*/
		s_blokace?: number|null;
		/**DBCOLUMN:Ispsreq.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Ispsreq.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ispsreq.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ispsreq.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Ispsreq.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Ispsreq.ixp*/
		ixp?: string|null;
		/**pdf*/
		pdf?: byte[]|null;
		/**DBCOLUMN:Ispsreq.cislo_podani*/
		cislo_podani?: number|null;
		/**DBCOLUMN:Ispsreq.rok_podani*/
		rok_podani?: number|null;
		/**DBCOLUMN:Ispsreq.typ_duv_txt*/
		typ_duv_txt?: string|null;
	}
	const enum GIsepIspsreqDtoNames { zprava_isep = "zprava_isep", cas_vytv_req = "cas_vytv_req", agenda = "agenda", agendova_role = "agendova_role", ovm = "ovm", uzivatel = "uzivatel", duvod_ucel = "duvod_ucel", typ_req = "typ_req", pozadavek_uid = "pozadavek_uid", prestupek_id = "prestupek_id", evidencni_cislo = "evidencni_cislo", cas_vytv_res = "cas_vytv_res", typ_duv = "typ_duv", s_blokace = "s_blokace", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_esu = "ixs_esu", ixp = "ixp", pdf = "pdf", cislo_podani = "cislo_podani", rok_podani = "rok_podani", typ_duv_txt = "typ_duv_txt",}
	const enum GIsepIspsreqDtoFragments { zprava_isep = "*", cas_vytv_req = "*", agenda = "*", agendova_role = "*", ovm = "*", uzivatel = "*", duvod_ucel = "*", typ_req = "*", pozadavek_uid = "*", prestupek_id = "*", evidencni_cislo = "*", cas_vytv_res = "*", typ_duv = "*", s_blokace = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_esu = "*", ixp = "*", pdf = "*", cislo_podani = "*", rok_podani = "*", typ_duv_txt = "*",}
	const enum GIsepIspsreqDtoTypes { zprava_isep = "string", cas_vytv_req = "JsonDate", agenda = "string", agendova_role = "string", ovm = "string", uzivatel = "string", duvod_ucel = "string", typ_req = "number", pozadavek_uid = "string", prestupek_id = "string", evidencni_cislo = "string", cas_vytv_res = "JsonDate", typ_duv = "number", s_blokace = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_esu = "string", ixp = "string", pdf = "byte[]", cislo_podani = "number", rok_podani = "number", typ_duv_txt = "string",}
	const enum GIsepIspsreqDtoTypeLengths { zprava_isep = 36, agenda = 15, agendova_role = 15, ovm = 36, uzivatel = 100, duvod_ucel = 254, pozadavek_uid = 36, prestupek_id = 36, evidencni_cislo = 36, poznamka = 254, zmenu_prov = 12, ixs_esu = 12, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepIspssnkDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**DBTABLE:~*/
	interface GIsepIspssnkDto {
		/**DBCOLUMN:Ispssnk.zprava_isep*/
		zprava_isep?: string|null;
		/**DBCOLUMN:Ispssnk.poradi_oso*/
		poradi_oso?: number|null;
		/**DBCOLUMN:Ispssnk.poradi_org*/
		poradi_org?: number|null;
		/**DBCOLUMN:Ispssnk.poradi_snk*/
		poradi_snk?: number|null;
		/**DBCOLUMN:Ispssnk.typ_snk*/
		typ_snk?: number|null;
		/**DBCOLUMN:Ispssnk.dat_amnestie*/
		dat_amnestie?: JsonDate|null;
		/**DBCOLUMN:Ispssnk.castka*/
		castka?: JsonDecimal|null;
		/**DBCOLUMN:Ispssnk.druh_zakazu*/
		druh_zakazu?: string|null;
		/**DBCOLUMN:Ispssnk.pocet_jednotek*/
		pocet_jednotek?: number|null;
		/**DBCOLUMN:Ispssnk.typ_udj*/
		typ_udj?: number|null;
		/**DBCOLUMN:Ispssnk.dat_ukonceni*/
		dat_ukonceni?: JsonDate|null;
		/**DBCOLUMN:Ispssnk.dat_upusteno*/
		dat_upusteno?: JsonDate|null;
		/**DBCOLUMN:Ispssnk.misto_zakazu*/
		misto_zakazu?: string|null;
		/**DBCOLUMN:Ispssnk.omez_opatreni*/
		omez_opatreni?: string|null;
		/**DBCOLUMN:Ispssnk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Ispssnk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Ispssnk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Ispssnk.mena_sis_aaa*/
		mena_sis_aaa?: string|null;
	}
	const enum GIsepIspssnkDtoNames { zprava_isep = "zprava_isep", poradi_oso = "poradi_oso", poradi_org = "poradi_org", poradi_snk = "poradi_snk", typ_snk = "typ_snk", dat_amnestie = "dat_amnestie", castka = "castka", druh_zakazu = "druh_zakazu", pocet_jednotek = "pocet_jednotek", typ_udj = "typ_udj", dat_ukonceni = "dat_ukonceni", dat_upusteno = "dat_upusteno", misto_zakazu = "misto_zakazu", omez_opatreni = "omez_opatreni", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_sis_aaa = "mena_sis_aaa",}
	const enum GIsepIspssnkDtoFragments { zprava_isep = "*", poradi_oso = "*", poradi_org = "*", poradi_snk = "*", typ_snk = "*", dat_amnestie = "*", castka = "*", druh_zakazu = "*", pocet_jednotek = "*", typ_udj = "*", dat_ukonceni = "*", dat_upusteno = "*", misto_zakazu = "*", omez_opatreni = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", mena_sis_aaa = "*",}
	const enum GIsepIspssnkDtoTypes { zprava_isep = "string", poradi_oso = "number", poradi_org = "number", poradi_snk = "number", typ_snk = "number", dat_amnestie = "JsonDate", castka = "JsonDecimal", druh_zakazu = "string", pocet_jednotek = "number", typ_udj = "number", dat_ukonceni = "JsonDate", dat_upusteno = "JsonDate", misto_zakazu = "string", omez_opatreni = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_sis_aaa = "string",}
	const enum GIsepIspssnkDtoTypeLengths { zprava_isep = 36, druh_zakazu = 254, misto_zakazu = 254, omez_opatreni = 254, zmenu_prov = 12, mena_sis_aaa = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\GIsepOpisPrestupkuDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro ISEP OpisPrestup*/
	interface GIsepOpisPrestupkuDto {
		/**Ispsblk*/
		Ispsblk?: Gordic.Isep.Interface.GIsepIspsblkDto[]|null;
		/**Ispsopi*/
		Ispsopi?: Gordic.Isep.Interface.GIsepIspsopiDto[]|null;
		/**Ispsorg*/
		Ispsorg?: Gordic.Isep.Interface.GIsepIspsorgDto[]|null;
		/**Ispsoso*/
		Ispsoso?: Gordic.Isep.Interface.GIsepIspsosoDto[]|null;
		/**Ispspar*/
		Ispspar?: Gordic.Isep.Interface.GIsepIspsparDto[]|null;
		/**Ispsreq*/
		Ispsreq?: Gordic.Isep.Interface.GIsepIspsreqDto[]|null;
		/**Ispssnk*/
		Ispssnk?: Gordic.Isep.Interface.GIsepIspssnkDto[]|null;
	}
	const enum GIsepOpisPrestupkuDtoNames { Ispsblk = "Ispsblk", Ispsopi = "Ispsopi", Ispsorg = "Ispsorg", Ispsoso = "Ispsoso", Ispspar = "Ispspar", Ispsreq = "Ispsreq", Ispssnk = "Ispssnk",}
	const enum GIsepOpisPrestupkuDtoFragments { Ispsblk = "*", Ispsopi = "*", Ispsorg = "*", Ispsoso = "*", Ispspar = "*", Ispsreq = "*", Ispssnk = "*",}
	const enum GIsepOpisPrestupkuDtoTypes { Ispsblk = "Gordic.Isep.Interface.GIsepIspsblkDto[]", Ispsopi = "Gordic.Isep.Interface.GIsepIspsopiDto[]", Ispsorg = "Gordic.Isep.Interface.GIsepIspsorgDto[]", Ispsoso = "Gordic.Isep.Interface.GIsepIspsosoDto[]", Ispspar = "Gordic.Isep.Interface.GIsepIspsparDto[]", Ispsreq = "Gordic.Isep.Interface.GIsepIspsreqDto[]", Ispssnk = "Gordic.Isep.Interface.GIsepIspssnkDto[]",}
	const enum GIsepOpisPrestupkuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\Request\GIsepOpisPrestupkuAifoRequestDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro Opis přestupku - aifo*/
	interface GIsepOpisPrestupkuAifoRequestDto extends Gordic.Isep.Interface.GIsepOpisPrestupkuZakladRequestDto {
		/**AIFO*/
		aifo?: string|null;
	}
	const enum GIsepOpisPrestupkuAifoRequestDtoNames { aifo = "aifo", ixsEsu = "ixsEsu", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", Permissions = "Permissions",}
	const enum GIsepOpisPrestupkuAifoRequestDtoFragments { aifo = "*", ixsEsu = "*", spZn = "*", ixp = "*", vydejPdf = "*", Permissions = "*",}
	const enum GIsepOpisPrestupkuAifoRequestDtoTypes { aifo = "string", ixsEsu = "string", spZn = "string", ixp = "string", vydejPdf = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GIsepOpisPrestupkuAifoRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\Request\GIsepOpisPrestupkuCizinecPravnickaRequestDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro Opis přestupku - cizí právnická osoba*/
	interface GIsepOpisPrestupkuCizinecPravnickaRequestDto extends Gordic.Isep.Interface.GIsepOpisPrestupkuZakladRequestDto {
		/**Název osoby*/
		nazev?: string|null;
		/**Sídlo – obec*/
		obec?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo popisné*/
		cp?: string|null;
		/**ZIP kód*/
		zip?: string|null;
		/**Kód státu (stat_sis_nnn)*/
		statKod?: number|null;
	}
	const enum GIsepOpisPrestupkuCizinecPravnickaRequestDtoNames { nazev = "nazev", obec = "obec", ulice = "ulice", cp = "cp", zip = "zip", statKod = "statKod", ixsEsu = "ixsEsu", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", Permissions = "Permissions",}
	const enum GIsepOpisPrestupkuCizinecPravnickaRequestDtoFragments { nazev = "*", obec = "*", ulice = "*", cp = "*", zip = "*", statKod = "*", ixsEsu = "*", spZn = "*", ixp = "*", vydejPdf = "*", Permissions = "*",}
	const enum GIsepOpisPrestupkuCizinecPravnickaRequestDtoTypes { nazev = "string", obec = "string", ulice = "string", cp = "string", zip = "string", statKod = "number", ixsEsu = "string", spZn = "string", ixp = "string", vydejPdf = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GIsepOpisPrestupkuCizinecPravnickaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\Request\GIsepOpisPrestupkuCizinecRequestDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro Opis přestupku právnické osoby dle ICA*/
	interface GIsepOpisPrestupkuCizinecRequestDto {
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Datum narození*/
		datNarozeni?: JsonDate|null;
		/**Kód státu (gincsta.stat_sis_nnn)*/
		statKod?: number|null;
		/**Text státu*/
		statTxt?: string|null;
		/**Místo narození – text*/
		mistoNarTxt?: string|null;
		/**Kód státu narození (gincsta.stat_sis_nnn)*/
		statNarKod?: number|null;
		/**Text státu narození*/
		statNarTxt?: string|null;
		/**Kód okresu narození*/
		okresNarKod?: number|null;
		/**Text okresu narození (max 100)*/
		okresNarTxt?: string|null;
		/**Adresní lokalita narození (ruian)*/
		mistoNarKod?: number|null;
		/**Spisová značka*/
		spZn?: string|null;
		/**Identifikátor (IXP)*/
		ixp?: string|null;
		/**Výdej PDF*/
		vydejPdf?: boolean|null;
		Permissions?: Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions|null;
	}
	const enum GIsepOpisPrestupkuCizinecRequestDtoNames { jmeno = "jmeno", prijmeni = "prijmeni", datNarozeni = "datNarozeni", statKod = "statKod", statTxt = "statTxt", mistoNarTxt = "mistoNarTxt", statNarKod = "statNarKod", statNarTxt = "statNarTxt", okresNarKod = "okresNarKod", okresNarTxt = "okresNarTxt", mistoNarKod = "mistoNarKod", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", Permissions = "Permissions",}
	const enum GIsepOpisPrestupkuCizinecRequestDtoFragments { jmeno = "*", prijmeni = "*", datNarozeni = "*", statKod = "*", statTxt = "*", mistoNarTxt = "*", statNarKod = "*", statNarTxt = "*", okresNarKod = "*", okresNarTxt = "*", mistoNarKod = "*", spZn = "*", ixp = "*", vydejPdf = "*", Permissions = "*",}
	const enum GIsepOpisPrestupkuCizinecRequestDtoTypes { jmeno = "string", prijmeni = "string", datNarozeni = "JsonDate", statKod = "number", statTxt = "string", mistoNarTxt = "string", statNarKod = "number", statNarTxt = "string", okresNarKod = "number", okresNarTxt = "string", mistoNarKod = "number", spZn = "string", ixp = "string", vydejPdf = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GIsepOpisPrestupkuCizinecRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\Request\GIsepOpisPrestupkuEsuRequestDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro OpisPrestupkuEsu*/
	interface GIsepOpisPrestupkuEsuRequestDto extends Gordic.Isep.Interface.GIsepOpisPrestupkuZakladRequestDto {
	}
	const enum GIsepOpisPrestupkuEsuRequestDtoNames { ixsEsu = "ixsEsu", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", Permissions = "Permissions",}
	const enum GIsepOpisPrestupkuEsuRequestDtoFragments { ixsEsu = "*", spZn = "*", ixp = "*", vydejPdf = "*", Permissions = "*",}
	const enum GIsepOpisPrestupkuEsuRequestDtoTypes { ixsEsu = "string", spZn = "string", ixp = "string", vydejPdf = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GIsepOpisPrestupkuEsuRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\Request\GIsepOpisPrestupkuIcoRequestDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro Opis přestupku právnické osoby dle ICA*/
	interface GIsepOpisPrestupkuIcoRequestDto extends Gordic.Isep.Interface.GIsepOpisPrestupkuZakladRequestDto {
		/**IČO*/
		ico?: number|null;
	}
	const enum GIsepOpisPrestupkuIcoRequestDtoNames { ico = "ico", ixsEsu = "ixsEsu", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", Permissions = "Permissions",}
	const enum GIsepOpisPrestupkuIcoRequestDtoFragments { ico = "*", ixsEsu = "*", spZn = "*", ixp = "*", vydejPdf = "*", Permissions = "*",}
	const enum GIsepOpisPrestupkuIcoRequestDtoTypes { ico = "number", ixsEsu = "string", spZn = "string", ixp = "string", vydejPdf = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GIsepOpisPrestupkuIcoRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Isep.Interface\DTO\Request\GIsepOpisPrestupkuZakladRequestDto.d.ts 

declare namespace Gordic.Isep.Interface {
	/**Dto pro OpisPrestupkuZaklad*/
	interface GIsepOpisPrestupkuZakladRequestDto {
		/**Identifikátor ESU (může být GString.Null)*/
		ixsEsu?: string|null;
		/**SPZN*/
		spZn?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Zda se má získávat PDF*/
		vydejPdf?: boolean|null;
		Permissions?: Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions|null;
	}
	const enum GIsepOpisPrestupkuZakladRequestDtoNames { ixsEsu = "ixsEsu", spZn = "spZn", ixp = "ixp", vydejPdf = "vydejPdf", Permissions = "Permissions",}
	const enum GIsepOpisPrestupkuZakladRequestDtoFragments { ixsEsu = "*", spZn = "*", ixp = "*", vydejPdf = "*", Permissions = "*",}
	const enum GIsepOpisPrestupkuZakladRequestDtoTypes { ixsEsu = "string", spZn = "string", ixp = "string", vydejPdf = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GIsepOpisPrestupkuZakladRequestDtoTypeLengths {}
}

//#endregion

