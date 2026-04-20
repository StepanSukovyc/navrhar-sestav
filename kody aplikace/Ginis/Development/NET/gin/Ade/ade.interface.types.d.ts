/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ade.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ade.Interface\Gordic.Ade.Interface.csproj
*    created     2026-02-16 14:33:48
*    files       Ade\Eko\Dto\GAdeEkoskurDto.d.ts
*                Ade\Eko\Dto\GAdeEkosuvlDto.d.ts
*                Ade\Eko\Dto\GEkocakrDto.d.ts
*                Ade\Eko\Dto\GEkoskinDto.d.ts
*                Ade\Eko\Interface\IGAdeKonsolidacniPartner.d.ts
*                Ade\Fuc\Dto\GAdeFucstupDto.d.ts
*                Ade\Gin\Dto\GGinspodDto.d.ts
*                Ade\Mza\Dto\GMzacktdDto.d.ts
*                Ade\Mza\Dto\GMzasdenDto.d.ts
*                Ade\Mza\Dto\GMzavrfuDto.d.ts
*                Ade\Mza\Interface\IGAdeKnihaMza.d.ts
*                Ade\Mza\Interface\IGAdeKnihaMzaFunkcniMisto.d.ts
*                Ade\Pcn\Dto\GAdePsccktdDto.d.ts
*                Ade\Pcn\Dto\GAdePscctnaDto.d.ts
*                Ade\Pcn\Dto\GAdePscctypDto.d.ts
*                Ade\Pcn\Dto\GAdePscczpdDto.d.ts
*                Ade\Pcn\Dto\GAdePscczpvDto.d.ts
*                Ade\Pcn\Dto\GAdePscdcdeDto.d.ts
*                Ade\Pcn\Dto\GAdePscddvnDto.d.ts
*                Ade\Pcn\Dto\GAdePscdpvnDto.d.ts
*                Ade\Pcn\Dto\GAdePscrdacDto.d.ts
*                Ade\Pcn\Dto\GAdePscsbuvDto.d.ts
*                Ade\Pcn\Dto\GAdePscscfaDto.d.ts
*                Ade\Pcn\Dto\GAdePscscleDto.d.ts
*                Ade\Pcn\Dto\GAdePscsdenDto.d.ts
*                Ade\Pcn\Dto\GAdePscskhoDto.d.ts
*                Ade\Pcn\Dto\GAdePscskumDto.d.ts
*                Ade\Pcn\Dto\GAdePscslimDto.d.ts
*                Ade\Pcn\Dto\GAdePscsnkhDto.d.ts
*                Ade\Pcn\Dto\GAdePscstnaDto.d.ts
*                Ade\Pcn\Dto\GAdePscsvnaDto.d.ts
*                Ade\Pcn\Dto\GAdePscsvpkDto.d.ts
*                Ade\Pcn\Dto\GAdePscszpzDto.d.ts
*                Ade\Pcn\Dto\GAdePscvrfuDto.d.ts
*                Ade\Pcn\Interface\IGAdeAktivitaTrideniPcn.d.ts
*                Ade\Pcn\Interface\IGAdeBankovniUctyPcn.d.ts
*                Ade\Pcn\Interface\IGAdeCleneniPcn.d.ts
*                Ade\Pcn\Interface\IGAdeKalkulacniKurzyPcn.d.ts
*                Ade\Pcn\Interface\IGAdeKategorieHodnoceniPcn.d.ts
*                Ade\Pcn\Interface\IGAdeKategorieNahradPcn.d.ts
*                Ade\Pcn\Interface\IGAdeKnihaPcn.d.ts
*                Ade\Pcn\Interface\IGAdeKnihaPcnCleneni.d.ts
*                Ade\Pcn\Interface\IGAdeKnihaPcnFunkcniMisto.d.ts
*                Ade\Pcn\Interface\IGAdeKopirovaniCiselnikuMeziRokyPcn.d.ts
*                Ade\Pcn\Interface\IGAdeLimityOmezeniPcn.d.ts
*                Ade\Pcn\Interface\IGAdeNazevCisKategorieHodnoceniPcn.d.ts
*                Ade\Pcn\Interface\IGAdePevneDefinovaneNahradyPcn.d.ts
*                Ade\Pcn\Interface\IGAdePrumernaVyseNahradPcn.d.ts
*                Ade\Pcn\Interface\IGAdeTypNahradyPcn.d.ts
*                Ade\Pok\Dto\GAdePokskonDto.d.ts
*                Ade\Rcn\Dto\GAdeRcncdvnDto.d.ts
*                Ade\Rcn\Dto\GAdeRcncktdDto.d.ts
*                Ade\Rcn\Dto\GAdeRcncphmDto.d.ts
*                Ade\Rcn\Dto\GAdeRcncsasDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnctnaDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnctosDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnctpoDto.d.ts
*                Ade\Rcn\Dto\GAdeRcncurnDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnczpdDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndcdeDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndpfuDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndphmDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndppoDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndsadDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndsanDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndsasDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndsauDto.d.ts
*                Ade\Rcn\Dto\GAdeRcndzapDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnrdacDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnsdenDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnsdvnDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnskhoDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnsmsmDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnssnaDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnstnaDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnstorDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnstosDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnstpkDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnsurnDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnvrfuDto.d.ts
*                Ade\Rcn\Dto\GAdeRcnvtosDto.d.ts
*                Ade\Rcn\Interface\IGAdeCenaPalivaRcn.d.ts
*                Ade\Rcn\Interface\IGAdeDopravaRcn.d.ts
*                Ade\Rcn\Interface\IGAdeFinacniUctarnaRcn.d.ts
*                Ade\Rcn\Interface\IGAdeKategorieHodnoceniRcn.d.ts
*                Ade\Rcn\Interface\IGAdeKnihaRcn.d.ts
*                Ade\Rcn\Interface\IGAdeKnihaRcnCleneni.d.ts
*                Ade\Rcn\Interface\IGAdeKnihaRcnFunkcniMisto.d.ts
*                Ade\Rcn\Interface\IGAdeKopirovaniCiselnikuMeziRokyRcn.d.ts
*                Ade\Rcn\Interface\IGAdeMezinarodniSmlouvyRcn.d.ts
*                Ade\Rcn\Interface\IGAdeNavyseniNahradRcn.d.ts
*                Ade\Rcn\Interface\IGAdePokladnaPuvodniAlgoritmusRcn.d.ts
*                Ade\Rcn\Interface\IGAdePokladnaRcn.d.ts
*                Ade\Rcn\Interface\IGAdeRozliseniTypuOsobyRcn.d.ts
*                Ade\Rcn\Interface\IGAdeSadaNahradRcn.d.ts
*                Ade\Rcn\Interface\IGAdeSazbyNavstevRcn.d.ts
*                Ade\Rcn\Interface\IGAdeStravneRcn.d.ts
*                Ade\Rcn\Interface\IGAdeTypNahradyRcn.d.ts
*                Ade\Rcn\Interface\IGAdeTypOsobyRcn.d.ts
*                Ade\Rcn\Interface\IGAdeTypOsobyVazbaTypPozRcn.d.ts
*                Ade\Rcn\Interface\IGAdeTypPlatebniKartyRcn.d.ts
*                Ade\Rcn\Interface\IGAdeUbytovaniRcn.d.ts
*                Ade\Rcn\Interface\IGAdeUrovenNavstevyRcn.d.ts
*                Ade\Rza\Dto\GRzacktdDto.d.ts
*                Ade\Rza\Dto\GRzasdenDto.d.ts
*                Ade\Rza\Dto\GRzavrfuDto.d.ts
*                Ade\Rza\Interface\IGAdeKnihaRza.d.ts
*                Ade\Rza\Interface\IGAdeKnihaRzaFunkcniMisto.d.ts
*                Ade\Sml\Dto\GAdeSmlsdenDto.d.ts
*                Ade\Ssl\Dto\GAdeSslstypDto.d.ts
*                Ade\Uct\Dto\GAdeUctdddeDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Eko\Dto\GAdeEkoskurDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeEkoskurDto {
		/**Identifikátor kur.*/
		ixp_kur?: string|null;
		/**Rada kur.*/
		rada_kur?: string|null;
		/**Číslo.*/
		cislo?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Den.*/
		den?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Datum mpd.*/
		dat_mpd?: JsonDate|null;
		/**Datum platnost od.*/
		dat_platnost_od?: JsonDate|null;
		/**Prep zp.*/
		prep_zp?: number|null;
		/**Prep_zp_txt.*/
		prep_zp_txt?: string|null;
		/**Rada_kur_txt.*/
		rada_kur_txt?: string|null;
	}
	const enum GAdeEkoskurDtoNames { ixp_kur = "ixp_kur", rada_kur = "rada_kur", cislo = "cislo", rok = "rok", mesic = "mesic", den = "den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_mpd = "dat_mpd", dat_platnost_od = "dat_platnost_od", prep_zp = "prep_zp", prep_zp_txt = "prep_zp_txt", rada_kur_txt = "rada_kur_txt",}
	const enum GAdeEkoskurDtoFragments { ixp_kur = "main", rada_kur = "main", cislo = "main", rok = "main", mesic = "main", den = "main", dat_zmena = "main", zmenu_prov = "main", dat_mpd = "main", dat_platnost_od = "main", prep_zp = "main", prep_zp_txt = "prep_zp_txt", rada_kur_txt = "rada_kur_txt",}
	const enum GAdeEkoskurDtoTypes { ixp_kur = "string", rada_kur = "string", cislo = "number", rok = "number", mesic = "number", den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_mpd = "JsonDate", dat_platnost_od = "JsonDate", prep_zp = "number", prep_zp_txt = "string", rada_kur_txt = "string",}
	const enum GAdeEkoskurDtoTypeLengths { ixp_kur = 12, rada_kur = 5, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Eko\Dto\GAdeEkosuvlDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Bankovní účty vlastní.*/
	interface GAdeEkosuvlDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Bankovní účet vlastní.*/
		bu_vl?: string|null;
		/**Směrový kód vlastního účtu.*/
		sk_vl?: string|null;
		/**Bu txt.*/
		bu_txt?: string|null;
		/**Ktg bu.*/
		ktg_bu?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Uea lim.*/
		uea_lim?: string|null;
		/**Ueb lim.*/
		ueb_lim?: string|null;
		/**Identifikátor esu ban.*/
		ixs_esu_ban?: string|null;
		/**C lim.*/
		c_lim?: JsonDecimal|null;
		/**C kuhr.*/
		c_kuhr?: JsonDecimal|null;
		/**C uhr.*/
		c_uhr?: JsonDecimal|null;
		/**Typ bu.*/
		typ_bu?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Měna.*/
		mena?: number|null;
		/**Uea uc.*/
		uea_uc?: string|null;
		/**Ueb uc.*/
		ueb_uc?: string|null;
		/**Subrada duz.*/
		subrada_duz?: number|null;
		/**Priz up bu.*/
		priz_up_bu?: number|null;
		/**Kniha buc.*/
		ixp_den_buc?: string|null;
		/**Sbu.*/
		sbu?: number|null;
		/**Datum bvy.*/
		dat_bvy?: JsonDate|null;
		/**C ps.*/
		c_ps?: JsonDecimal|null;
		/**C rok db.*/
		c_rok_db?: JsonDecimal|null;
		/**C rok kr.*/
		c_rok_kr?: JsonDecimal|null;
		/**C zust.*/
		c_zust?: JsonDecimal|null;
		/**Druh bu.*/
		druh_bu?: number|null;
		/**Cis bvy.*/
		cis_bvy?: number|null;
		/**Identifikátor bvy.*/
		ixp_bvy?: string|null;
		/**C lim max.*/
		c_lim_max?: JsonDecimal|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Iban.*/
		iban?: string|null;
		/**Zc vyp.*/
		zc_vyp?: number|null;
		/**Per vyp.*/
		per_vyp?: number|null;
		/**Ur prist bu.*/
		ur_prist_bu?: number|null;
		/**Priz isprofin.*/
		priz_isprofin?: number|null;
		/**Kód vys.*/
		kod_vys?: string|null;
		/**Kon maxlim.*/
		kon_maxlim?: number|null;
		/**Par vyp.*/
		par_vyp?: number|null;
		/**C lim ban.*/
		c_lim_ban?: JsonDecimal|null;
		/**C zust ban.*/
		c_zust_ban?: JsonDecimal|null;
		/**Datum bvy ban.*/
		dat_bvy_ban?: JsonDate|null;
		/**Datum ttv.*/
		dat_ttv?: JsonDate|null;
		/**Priz sr.*/
		priz_sr?: number|null;
		/**Id hdr ris kr.*/
		id_hdr_ris_kr?: string|null;
		/**Radek hdr kr.*/
		radek_hdr_kr?: number|null;
		/**Priz rozp.*/
		priz_rozp?: number|null;
		/**Priz spol u.*/
		priz_spol_u?: number|null;
		/**Ode sp.*/
		ode_sp?: number|null;
		/**Ukl pri.*/
		ukl_pri?: number|null;
		/**Id nt max.*/
		id_nt_max?: string|null;
		/**Fidoo.*/
		fidoo?: number|null;
		/**Druh_bu_txt.*/
		druh_bu_txt?: string|null;
		/**Kod_vys_txt.*/
		kod_vys_txt?: string|null;
		/**Kon_maxlim_txt.*/
		kon_maxlim_txt?: string|null;
		/**Ktg_bu_txt.*/
		ktg_bu_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Ode_sp_txt.*/
		ode_sp_txt?: string|null;
		/**Par_vyp_txt.*/
		par_vyp_txt?: string|null;
		/**Per_vyp_txt.*/
		per_vyp_txt?: string|null;
		/**Priz_isprofin_txt.*/
		priz_isprofin_txt?: string|null;
		/**Priz_rozp_txt.*/
		priz_rozp_txt?: string|null;
		/**Priz_sr_txt.*/
		priz_sr_txt?: string|null;
		/**Priz_up_bu_txt.*/
		priz_up_bu_txt?: string|null;
		/**Typ_bu_txt.*/
		typ_bu_txt?: string|null;
		/**Ukl_pri_txt.*/
		ukl_pri_txt?: string|null;
		/**Zc_vyp_txt.*/
		zc_vyp_txt?: string|null;
	}
	const enum GAdeEkosuvlDtoNames { rok = "rok", ico = "ico", ucs = "ucs", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_txt = "bu_txt", ktg_bu = "ktg_bu", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", uea_lim = "uea_lim", ueb_lim = "ueb_lim", ixs_esu_ban = "ixs_esu_ban", c_lim = "c_lim", c_kuhr = "c_kuhr", c_uhr = "c_uhr", typ_bu = "typ_bu", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", zkratka = "zkratka", mena = "mena", uea_uc = "uea_uc", ueb_uc = "ueb_uc", subrada_duz = "subrada_duz", priz_up_bu = "priz_up_bu", ixp_den_buc = "ixp_den_buc", sbu = "sbu", dat_bvy = "dat_bvy", c_ps = "c_ps", c_rok_db = "c_rok_db", c_rok_kr = "c_rok_kr", c_zust = "c_zust", druh_bu = "druh_bu", cis_bvy = "cis_bvy", ixp_bvy = "ixp_bvy", c_lim_max = "c_lim_max", uus = "uus", iban = "iban", zc_vyp = "zc_vyp", per_vyp = "per_vyp", ur_prist_bu = "ur_prist_bu", priz_isprofin = "priz_isprofin", kod_vys = "kod_vys", kon_maxlim = "kon_maxlim", par_vyp = "par_vyp", c_lim_ban = "c_lim_ban", c_zust_ban = "c_zust_ban", dat_bvy_ban = "dat_bvy_ban", dat_ttv = "dat_ttv", priz_sr = "priz_sr", id_hdr_ris_kr = "id_hdr_ris_kr", radek_hdr_kr = "radek_hdr_kr", priz_rozp = "priz_rozp", priz_spol_u = "priz_spol_u", ode_sp = "ode_sp", ukl_pri = "ukl_pri", id_nt_max = "id_nt_max", fidoo = "fidoo", druh_bu_txt = "druh_bu_txt", kod_vys_txt = "kod_vys_txt", kon_maxlim_txt = "kon_maxlim_txt", ktg_bu_txt = "ktg_bu_txt", mena_txt = "mena_txt", ode_sp_txt = "ode_sp_txt", par_vyp_txt = "par_vyp_txt", per_vyp_txt = "per_vyp_txt", priz_isprofin_txt = "priz_isprofin_txt", priz_rozp_txt = "priz_rozp_txt", priz_sr_txt = "priz_sr_txt", priz_up_bu_txt = "priz_up_bu_txt", typ_bu_txt = "typ_bu_txt", ukl_pri_txt = "ukl_pri_txt", zc_vyp_txt = "zc_vyp_txt",}
	const enum GAdeEkosuvlDtoFragments { rok = "main", ico = "main", ucs = "main", bu_vl = "main", sk_vl = "main", bu_txt = "main", ktg_bu = "main", aktivita = "main", dat_od = "main", dat_do = "main", uea_lim = "main", ueb_lim = "main", ixs_esu_ban = "main", c_lim = "main", c_kuhr = "main", c_uhr = "main", typ_bu = "main", dat_zmena = "main", zmenu_prov = "main", nazev = "main", zkratka = "main", mena = "main", uea_uc = "main", ueb_uc = "main", subrada_duz = "main", priz_up_bu = "main", ixp_den_buc = "main", sbu = "main", dat_bvy = "main", c_ps = "main", c_rok_db = "main", c_rok_kr = "main", c_zust = "main", druh_bu = "main", cis_bvy = "main", ixp_bvy = "main", c_lim_max = "main", uus = "main", iban = "main", zc_vyp = "main", per_vyp = "main", ur_prist_bu = "main", priz_isprofin = "main", kod_vys = "main", kon_maxlim = "main", par_vyp = "main", c_lim_ban = "main", c_zust_ban = "main", dat_bvy_ban = "main", dat_ttv = "main", priz_sr = "main", id_hdr_ris_kr = "main", radek_hdr_kr = "main", priz_rozp = "main", priz_spol_u = "main", ode_sp = "main", ukl_pri = "main", id_nt_max = "main", fidoo = "main", druh_bu_txt = "druh_bu_txt", kod_vys_txt = "kod_vys_txt", kon_maxlim_txt = "kon_maxlim_txt", ktg_bu_txt = "ktg_bu_txt", mena_txt = "mena_txt", ode_sp_txt = "ode_sp_txt", par_vyp_txt = "par_vyp_txt", per_vyp_txt = "per_vyp_txt", priz_isprofin_txt = "priz_isprofin_txt", priz_rozp_txt = "priz_rozp_txt", priz_sr_txt = "priz_sr_txt", priz_up_bu_txt = "priz_up_bu_txt", typ_bu_txt = "typ_bu_txt", ukl_pri_txt = "ukl_pri_txt", zc_vyp_txt = "zc_vyp_txt",}
	const enum GAdeEkosuvlDtoTypes { rok = "number", ico = "string", ucs = "string", bu_vl = "string", sk_vl = "string", bu_txt = "string", ktg_bu = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", uea_lim = "string", ueb_lim = "string", ixs_esu_ban = "string", c_lim = "JsonDecimal", c_kuhr = "JsonDecimal", c_uhr = "JsonDecimal", typ_bu = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", zkratka = "string", mena = "number", uea_uc = "string", ueb_uc = "string", subrada_duz = "number", priz_up_bu = "number", ixp_den_buc = "string", sbu = "number", dat_bvy = "JsonDate", c_ps = "JsonDecimal", c_rok_db = "JsonDecimal", c_rok_kr = "JsonDecimal", c_zust = "JsonDecimal", druh_bu = "number", cis_bvy = "number", ixp_bvy = "string", c_lim_max = "JsonDecimal", uus = "string", iban = "string", zc_vyp = "number", per_vyp = "number", ur_prist_bu = "number", priz_isprofin = "number", kod_vys = "string", kon_maxlim = "number", par_vyp = "number", c_lim_ban = "JsonDecimal", c_zust_ban = "JsonDecimal", dat_bvy_ban = "JsonDate", dat_ttv = "JsonDate", priz_sr = "number", id_hdr_ris_kr = "string", radek_hdr_kr = "number", priz_rozp = "number", priz_spol_u = "number", ode_sp = "number", ukl_pri = "number", id_nt_max = "string", fidoo = "number", druh_bu_txt = "string", kod_vys_txt = "string", kon_maxlim_txt = "string", ktg_bu_txt = "string", mena_txt = "string", ode_sp_txt = "string", par_vyp_txt = "string", per_vyp_txt = "string", priz_isprofin_txt = "string", priz_rozp_txt = "string", priz_sr_txt = "string", priz_up_bu_txt = "string", typ_bu_txt = "string", ukl_pri_txt = "string", zc_vyp_txt = "string",}
	const enum GAdeEkosuvlDtoTypeLengths { ico = 10, ucs = 10, bu_vl = 34, sk_vl = 11, bu_txt = 46, uea_lim = 3, ueb_lim = 4, ixs_esu_ban = 12, zmenu_prov = 12, nazev = 50, zkratka = 16, uea_uc = 3, ueb_uc = 4, ixp_den_buc = 12, ixp_bvy = 12, uus = 10, iban = 34, kod_vys = 4, id_hdr_ris_kr = 10, id_nt_max = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Eko\Dto\GEkocakrDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:ekocakr
	*      Aktivity subřad agendového čísla
	*/
	interface GEkocakrDto {
		/**aktivita subřady*/
		akt_subrady?: number|null;
		/**Název aktivity subřady a.č.*/
		akt_subrady_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		k_xml?: string|null;
		akt_subrady_rsx?: number|null;
	}
	const enum GEkocakrDtoNames { akt_subrady = "akt_subrady", akt_subrady_txt = "akt_subrady_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", akt_subrady_rsx = "akt_subrady_rsx",}
	const enum GEkocakrDtoFragments { akt_subrady = "*", akt_subrady_txt = "*", k_v = "*", k_s = "*", k_xml = "*", akt_subrady_rsx = "*",}
	const enum GEkocakrDtoTypes { akt_subrady = "number", akt_subrady_txt = "string", k_v = "number", k_s = "string", k_xml = "string", akt_subrady_rsx = "number",}
	const enum GEkocakrDtoTypeLengths { akt_subrady_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Eko\Dto\GEkoskinDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:ekoskin*/
	interface GEkoskinDto {
		/**DBCOLUMN:ekoskin.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekoskin.rok*/
		rok?: number|null;
		/**DBCOLUMN:ekoskin.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekoskin.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ekoskin.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ekoskin.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekoskin.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekoskin.dat_mpd*/
		dat_mpd?: JsonDate|null;
	}
	const enum GEkoskinDtoNames { ico = "ico", rok = "rok", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", dat_mpd = "dat_mpd",}
	const enum GEkoskinDtoFragments { ico = "*", rok = "*", nazev = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", dat_mpd = "*",}
	const enum GEkoskinDtoTypes { ico = "string", rok = "number", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", dat_mpd = "JsonDate",}
	const enum GEkoskinDtoTypeLengths { ico = 10, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Eko\Interface\IGAdeKonsolidacniPartner.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Konsolidační partneři
	* @domain GinisAdmin
	* @businessObject AdeKonsolidacniPartner
	*/
	interface AdeKonsolidacniPartner {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKonsolidacniPartnerDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKonsolidacniPartner: ServiceBase & Catalog.AdeKonsolidacniPartner;
	}
	const AdeKonsolidacniPartner: Client["AdeKonsolidacniPartner"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKonsolidacniPartnerDto extends Gordic.Ade.Interface.GEkoskinDto {
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKonsolidacniPartnerDtoNames { Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", rok = "rok", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", dat_mpd = "dat_mpd",}
	const enum GAdeKonsolidacniPartnerDtoFragments { Permissions = "permissions", AdxInfoDto = "info", ico = "*", rok = "*", nazev = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", dat_mpd = "*",}
	const enum GAdeKonsolidacniPartnerDtoTypes { Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", rok = "number", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", dat_mpd = "JsonDate",}
	const enum GAdeKonsolidacniPartnerDtoTypeLengths { ico = 10, nazev = 254,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKonsolidacniPartnerFilterEnum {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Název.*/
		nazev,
		/**
		*     Datum od.
		*     
		*/
		dat_od,
		/**
		*     Datum do.
		*     
		*/
		dat_do,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Datum MPD.*/
		dat_mpd,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Fuc\Dto\GAdeFucstupDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Finanční účtárna.*/
	interface GAdeFucstupDto {
		/**Typ upr.*/
		typ_upr?: string|null;
		/**Název upr.*/
		nazev_upr?: string|null;
		/**Ktg tup.*/
		ktg_tup?: number|null;
		/**Typ zauc.*/
		typ_zauc?: number|null;
		/**Ktg Typ.*/
		ktg_typ?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Real upr.*/
		real_upr?: number|null;
		/**K v.*/
		k_v?: number|null;
		/**K k.*/
		k_k?: number|null;
		/**Cs název.*/
		cs_nazev?: string|null;
		/**Ktg_tup_txt.*/
		ktg_tup_txt?: string|null;
		/**Ktg_typ_txt.*/
		ktg_typ_txt?: string|null;
		/**Real_upr_txt.*/
		real_upr_txt?: string|null;
		/**Typ_zauc_txt.*/
		typ_zauc_txt?: string|null;
	}
	const enum GAdeFucstupDtoNames { typ_upr = "typ_upr", nazev_upr = "nazev_upr", ktg_tup = "ktg_tup", typ_zauc = "typ_zauc", ktg_typ = "ktg_typ", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", real_upr = "real_upr", k_v = "k_v", k_k = "k_k", cs_nazev = "cs_nazev", ktg_tup_txt = "ktg_tup_txt", ktg_typ_txt = "ktg_typ_txt", real_upr_txt = "real_upr_txt", typ_zauc_txt = "typ_zauc_txt",}
	const enum GAdeFucstupDtoFragments { typ_upr = "main", nazev_upr = "main", ktg_tup = "main", typ_zauc = "main", ktg_typ = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", real_upr = "main", k_v = "main", k_k = "main", cs_nazev = "main", ktg_tup_txt = "ktg_tup_txt", ktg_typ_txt = "ktg_typ_txt", real_upr_txt = "real_upr_txt", typ_zauc_txt = "typ_zauc_txt",}
	const enum GAdeFucstupDtoTypes { typ_upr = "string", nazev_upr = "string", ktg_tup = "number", typ_zauc = "number", ktg_typ = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", real_upr = "number", k_v = "number", k_k = "number", cs_nazev = "string", ktg_tup_txt = "string", ktg_typ_txt = "string", real_upr_txt = "string", typ_zauc_txt = "string",}
	const enum GAdeFucstupDtoTypeLengths { typ_upr = 15, nazev_upr = 254, zmenu_prov = 12, cs_nazev = 508,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Gin\Dto\GGinspodDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:ginspod
	*      Spisový uzel
	*/
	interface GGinspodDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Licence*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nepoužívá se*/
		arw?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Podatelna
		*      Příznak, že spisový uzel funguje jako podatelna
		*/
		priz_pod?: number|null;
		/**Výpravna
		*      Příznak, že spisový uzel funguje jako výpravna
		*/
		priz_vyp?: number|null;
		/**Nadříízený
		*      ID nadřízeného spisového uzlu. Uzly tvoří stromovou strukturu na jejímž vrcholu stojí hlavní podatelna a nad ní uzel Neurčeno.
		*/
		ixs_nad?: string|null;
		/**Licence uzlu
		*      Licence databáze ke které organizačně spisový uzel přísluší. Má význam pouze na MO ČR
		*/
		lic_adr?: string|null;
		/**Oficiální název*/
		ofic_nazev?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Počet podřízených
		*      Pomocný sloupec který se neukazuje. Obsahuje počet podřízených spisových uzlů. Průběžně se udržuje a pomáhá při vykreslení stromu spisových uzlů - tzv. podací graf
		*/
		num_pod?: number|null;
		/**Mail
		*      Kontaktní mail na spisový uzel
		*/
		mail?: string|null;
		/**URL*/
		url?: string|null;
		/**Kurýr
		*      Příznak, že se nejedná o skutečný spisový uzel ale pouze o skupiny kurýrů, kteří zajišťují přesun dokumentů mezi spisovými uzly. Nejsou logickou součástí podacího grafu a účastní se redistribucí ale tak, že nemění plánování tras.
		*/
		priz_kur?: number|null;
		/**Zodpovídá
		*      Funkční místo, které zodpovídá za spisový uzel z pohledu redistribuce dokumnetů. Často se jedná o sekretářku, která přerozděluje dokumenty v rámci uzlu a v některých případech vystupuje za celý uzel.
		*/
		ixs_fun?: string|null;
		/**Středisko
		*      Středisko spisových uzlů ke kterému spisový uzel náleží. Od střediska se odvozuje Interní subjekt a tím i organizace a IČO ke které uzel patří
		*/
		ixs_tre?: string|null;
		/**El.podatelna
		*      Příznak elektronické podatelny
		*/
		priz_evy?: number|null;
		/**Z interface
		*      Příznak, že záznam vznikl prostřednictvím interface.
		*/
		z_int?: number|null;
		/**Čas zápisu
		*      Čas vzniku záznamu.
		*/
		dat_mpd?: JsonDate|null;
		/**Průtokový
		*      Příznak, že v rámci redistribucí dokumentů je tento uzel průtokový. Tedy při výpočtu další trasy dokumentu tento uzel není do trasy zahrnut jako další cíl - je přeskakován.
		*/
		priz_prut?: number|null;
		/**Servisní
		*      Příznak, že se jedná o servisní uzel. Při redistribucích se uživatelům tento uzel nenabízí jako cíl pro předání. Jsou na něm umístěny uživatelů systémových služeb, např. ZUDu.
		*/
		priz_servis?: number|null;
		/**Telefon
		*      Kontaktní telefon na spisový uzel
		*/
		tel?: string|null;
		/**Fax
		*      Kontaktní fax na spisový uzel
		*/
		fax?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**IČO
		*      IČO interního subjeltu ke kterému spisový uzel přísluší
		*/
		ico?: string|null;
		/**Externí systém
		*      Externí systém typu AIS, na který se mají předat přes rozhraní dokumenty v případě, že je dokument předán a tento spisový uzel
		*/
		ixs_ext_ais?: string|null;
	}
	const enum GGinspodDtoNames { ixs_su = "ixs_su", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", priz_pod = "priz_pod", priz_vyp = "priz_vyp", ixs_nad = "ixs_nad", lic_adr = "lic_adr", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", url = "url", priz_kur = "priz_kur", ixs_fun = "ixs_fun", ixs_tre = "ixs_tre", priz_evy = "priz_evy", z_int = "z_int", dat_mpd = "dat_mpd", priz_prut = "priz_prut", priz_servis = "priz_servis", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", ixs_ext_ais = "ixs_ext_ais",}
	const enum GGinspodDtoFragments { ixs_su = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", priz_pod = "*", priz_vyp = "*", ixs_nad = "*", lic_adr = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", url = "*", priz_kur = "*", ixs_fun = "*", ixs_tre = "*", priz_evy = "*", z_int = "*", dat_mpd = "*", priz_prut = "*", priz_servis = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", ixs_ext_ais = "*",}
	const enum GGinspodDtoTypes { ixs_su = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", priz_pod = "number", priz_vyp = "number", ixs_nad = "string", lic_adr = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", url = "string", priz_kur = "number", ixs_fun = "string", ixs_tre = "string", priz_evy = "number", z_int = "number", dat_mpd = "JsonDate", priz_prut = "number", priz_servis = "number", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", ixs_ext_ais = "string",}
	const enum GGinspodDtoTypeLengths { ixs_su = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 25, ixs_nad = 12, lic_adr = 4, ofic_nazev = 100, cs_nazev = 25, mail = 254, url = 254, ixs_fun = 12, ixs_tre = 12, tel = 33, fax = 33, ixs_lpc = 12, ico = 10, ixs_ext_ais = 12,}
	/**GinspodEko - spisový uzel pro deníky EKO*/
	interface GGinspodEkoDto extends Gordic.Ade.Interface.GGinspodDto {
		/**Rok*/
		rok?: number|null;
		/**GString ico*/
		eko_ico?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
	}
	const enum GGinspodEkoDtoNames { rok = "rok", eko_ico = "eko_ico", ucs = "ucs", ixs_su = "ixs_su", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", priz_pod = "priz_pod", priz_vyp = "priz_vyp", ixs_nad = "ixs_nad", lic_adr = "lic_adr", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", url = "url", priz_kur = "priz_kur", ixs_fun = "ixs_fun", ixs_tre = "ixs_tre", priz_evy = "priz_evy", z_int = "z_int", dat_mpd = "dat_mpd", priz_prut = "priz_prut", priz_servis = "priz_servis", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", ixs_ext_ais = "ixs_ext_ais",}
	const enum GGinspodEkoDtoFragments { rok = "*", eko_ico = "*", ucs = "*", ixs_su = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", priz_pod = "*", priz_vyp = "*", ixs_nad = "*", lic_adr = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", url = "*", priz_kur = "*", ixs_fun = "*", ixs_tre = "*", priz_evy = "*", z_int = "*", dat_mpd = "*", priz_prut = "*", priz_servis = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", ixs_ext_ais = "*",}
	const enum GGinspodEkoDtoTypes { rok = "number", eko_ico = "string", ucs = "string", ixs_su = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", priz_pod = "number", priz_vyp = "number", ixs_nad = "string", lic_adr = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", url = "string", priz_kur = "number", ixs_fun = "string", ixs_tre = "string", priz_evy = "number", z_int = "number", dat_mpd = "JsonDate", priz_prut = "number", priz_servis = "number", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", ixs_ext_ais = "string",}
	const enum GGinspodEkoDtoTypeLengths { ixs_su = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 25, ixs_nad = 12, lic_adr = 4, ofic_nazev = 100, cs_nazev = 25, mail = 254, url = 254, ixs_fun = 12, ixs_tre = 12, tel = 33, fax = 33, ixs_lpc = 12, ico = 10, ixs_ext_ais = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Mza\Dto\GMzacktdDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:mzacktd
	*      Kategorie deníků
	*/
	interface GMzacktdDto {
		/**Typ deníku
		*      Typ deníku
		*/
		ktg_den?: number|null;
		/**Popis typu deníku
		*      Popis typu deníku
		*/
		ktg_den_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů
		*      Sloupec s možným využitím pro uložení číselných řadicích údajů
		*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů
		*      Sloupec s možným využitím pro uložení řetězcových řadicích údajů
		*/
		k_s?: string|null;
	}
	const enum GMzacktdDtoNames { ktg_den = "ktg_den", ktg_den_txt = "ktg_den_txt", k_v = "k_v", k_s = "k_s",}
	const enum GMzacktdDtoFragments { ktg_den = "*", ktg_den_txt = "*", k_v = "*", k_s = "*",}
	const enum GMzacktdDtoTypes { ktg_den = "number", ktg_den_txt = "string", k_v = "number", k_s = "string",}
	const enum GMzacktdDtoTypeLengths { ktg_den_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Mza\Dto\GMzasdenDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:mzasden
	*      Kniha MZA
	*/
	interface GMzasdenDto extends Gordic.Adx.Interface.GXxxsden {
	}
	const enum GMzasdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GMzasdenDtoFragments { ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GMzasdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GMzasdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Mza\Dto\GMzavrfuDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:mzavrfu
	*      Povolené řady pro funkci
	*/
	interface GMzavrfuDto extends Gordic.Adx.Interface.GXxxvrfu {
	}
	const enum GMzavrfuDtoNames { ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GMzavrfuDtoFragments { ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GMzavrfuDtoTypes { ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GMzavrfuDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Mza\Interface\IGAdeKnihaMza.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha MZA - mzasden
	* @businessObject AdeKnihaMza
	*/
	interface AdeKnihaMza {
		/**Read*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaMzaNewDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaMzaNewDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaMzaNewDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaMza: ServiceBase & Catalog.AdeKnihaMza;
	}
	const AdeKnihaMza: Client["AdeKnihaMza"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL pro zadání požadavku na READ - obsahuje pouze PK hodnty - Kniha RZA - rzasden*/
	interface GAdeKnihaMzaNewDto extends Gordic.Ade.Interface.GMzasdenDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Spisový uzel (txt)*/
		ixs_su_txt?: string|null;
		/**Začátek subřady*/
		ac_cislo_od?: number|null;
		/**Konec subřady*/
		ac_cislo_do?: number|null;
		/**Poslední použité číslo*/
		ac_cislo_max?: number|null;
		/**Začátek subřady*/
		akt_subrady?: number|null;
		/**Začátek subřady (txt)*/
		akt_subrady_txt?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Kategorie deníku (txt)*/
		ktg_den_txt?: string|null;
		/**Změnu provedl (txt)*/
		zmenu_prov_txt?: string|null;
		/**Příznak, zda kniha byla použita*/
		is_used?: boolean|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaMzaNewDtoNames { ixs_su = "ixs_su", ixs_su_txt = "ixs_su_txt", ac_cislo_od = "ac_cislo_od", ac_cislo_do = "ac_cislo_do", ac_cislo_max = "ac_cislo_max", akt_subrady = "akt_subrady", akt_subrady_txt = "akt_subrady_txt", zkratka = "zkratka", ktg_den_txt = "ktg_den_txt", zmenu_prov_txt = "zmenu_prov_txt", is_used = "is_used", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdeKnihaMzaNewDtoFragments { ixs_su = "*", ixs_su_txt = "*", ac_cislo_od = "*", ac_cislo_do = "*", ac_cislo_max = "*", akt_subrady = "*", akt_subrady_txt = "*", zkratka = "*", ktg_den_txt = "*", zmenu_prov_txt = "*", is_used = "*", Permissions = "permissions", AdxInfoDto = "info", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdeKnihaMzaNewDtoTypes { ixs_su = "string", ixs_su_txt = "string", ac_cislo_od = "number", ac_cislo_do = "number", ac_cislo_max = "number", akt_subrady = "number", akt_subrady_txt = "string", zkratka = "string", ktg_den_txt = "string", zmenu_prov_txt = "string", is_used = "boolean", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdeKnihaMzaNewDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdeKnihaMzaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Identifikátor knihy*/
		ixp_den,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Mza\Interface\IGAdeKnihaMzaFunkcniMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Povolené řady pro funkci - mzavrfu
	* @domain GinisAdmin
	* @businessObject AdeKnihaMzaFunkcniMisto
	*/
	interface AdeKnihaMzaFunkcniMisto {
		/**Read*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>>;
		/**Metoda pro ověření zda záznamy existují*/
		testExist(rq?:CallParams<{dtos:Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto[]}>): _Task<{dtos:Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxExistResultDto<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>[]>;
		/**Hromadné uložení dat*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto[]}>): _Task<{data:Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto>[]>;
		/**ReadListMetadata - na�ten� metadat o LISTu*/
		getDataListDescriptor(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.General.ApplicationInterface.GDataListDescription>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaMzaFunkcniMisto: ServiceBase & Catalog.AdeKnihaMzaFunkcniMisto;
	}
	const AdeKnihaMzaFunkcniMisto: Client["AdeKnihaMzaFunkcniMisto"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL pro zadání požadavku na READ - obsahuje pouze PK hodnty - Povolené řady pro funkci - rzavrfu*/
	interface GAdeKnihaMzaFunkcniMistoDto extends Gordic.Ade.Interface.GRzavrfuDto {
		/**Textová reprezentace deníku*/
		ixp_den_txt?: string|null;
		/**Textová reprezentace osoby*/
		ixs_ref_txt?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Středisko účtování*/
		ucs?: string|null;
		/**IČO deníku*/
		ico?: string|null;
		/**IČO funkčního místa*/
		ixs_fun_ico?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Textová reprezentace funkčního místa*/
		ixs_fun_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Metadata k datům detailu objektu
		*     Tím splňuje IAdmSubjectMetaDataIslDto
		*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaMzaFunkcniMistoDtoNames { ixp_den_txt = "ixp_den_txt", ixs_ref_txt = "ixs_ref_txt", rok = "rok", ucs = "ucs", ico = "ico", ixs_fun_ico = "ixs_fun_ico", zmenu_prov_txt = "zmenu_prov_txt", ixs_fun_txt = "ixs_fun_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeKnihaMzaFunkcniMistoDtoFragments { ixp_den_txt = "*", ixs_ref_txt = "*", rok = "*", ucs = "*", ico = "*", ixs_fun_ico = "*", zmenu_prov_txt = "*", ixs_fun_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdeKnihaMzaFunkcniMistoDtoTypes { ixp_den_txt = "string", ixs_ref_txt = "string", rok = "number", ucs = "string", ico = "string", ixs_fun_ico = "string", zmenu_prov_txt = "string", ixs_fun_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeKnihaMzaFunkcniMistoDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdeKnihaMzaFunkcniMistoFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Funkční místo*/
		ixs_fun,
		/**PK tabulky - Identifikátor knihy*/
		ixp_den,
		/**PK tabulky - Číslo subřady*/
		subrada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePsccktdDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha PCN.*/
	interface GAdePsccktdDto {
		/**Ktg den.*/
		ktg_den?: number|null;
		/**Ktg den txt.*/
		ktg_den_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdePsccktdDtoNames { ktg_den = "ktg_den", ktg_den_txt = "ktg_den_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdePsccktdDtoFragments { ktg_den = "main", ktg_den_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdePsccktdDtoTypes { ktg_den = "number", ktg_den_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdePsccktdDtoTypeLengths { ktg_den_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscctnaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kategorie náhrad.*/
	interface GAdePscctnaDto {
		/**Ktg tna.*/
		ktg_tna?: number|null;
		/**Ktg tna txt.*/
		ktg_tna_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdePscctnaDtoNames { ktg_tna = "ktg_tna", ktg_tna_txt = "ktg_tna_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdePscctnaDtoFragments { ktg_tna = "main", ktg_tna_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdePscctnaDtoTypes { ktg_tna = "number", ktg_tna_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdePscctnaDtoTypeLengths { ktg_tna_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscctypDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Stravné.*/
	interface GAdePscctypDto {
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Typ poz txt.*/
		typ_poz_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdePscctypDtoNames { typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdePscctypDtoFragments { typ_poz = "main", typ_poz_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdePscctypDtoTypes { typ_poz = "number", typ_poz_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdePscctypDtoTypeLengths { typ_poz_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscczpdDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Typ náhrady.*/
	interface GAdePscczpdDto {
		/**Zp dopr.*/
		zp_dopr?: number|null;
		/**Zp dopr txt.*/
		zp_dopr_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdePscczpdDtoNames { zp_dopr = "zp_dopr", zp_dopr_txt = "zp_dopr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdePscczpdDtoFragments { zp_dopr = "main", zp_dopr_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdePscczpdDtoTypes { zp_dopr = "number", zp_dopr_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdePscczpdDtoTypeLengths { zp_dopr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscczpvDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Způsoby výpočtu.*/
	interface GAdePscczpvDto {
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
	const enum GAdePscczpvDtoNames { zp_vyp = "zp_vyp", zp_vyp_txt = "zp_vyp_txt", k_v = "k_v", k_s = "k_s", typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt",}
	const enum GAdePscczpvDtoFragments { zp_vyp = "main", zp_vyp_txt = "main", k_v = "main", k_s = "main", typ_poz = "main", typ_poz_txt = "typ_poz_txt",}
	const enum GAdePscczpvDtoTypes { zp_vyp = "number", zp_vyp_txt = "string", k_v = "number", k_s = "string", typ_poz = "number", typ_poz_txt = "string",}
	const enum GAdePscczpvDtoTypeLengths { zp_vyp_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscdcdeDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Definice členění záznamů na deník PCN.*/
	interface GAdePscdcdeDto {
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Identifikátor cle.*/
		ixs_cle?: string|null;
		/**Identifikátor vpk.*/
		ixs_vpk?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixp_den_txt.*/
		ixp_den_txt?: string|null;
		/**Ixs_cle_txt.*/
		ixs_cle_txt?: string|null;
		/**Ixs_vpk_txt.*/
		ixs_vpk_txt?: string|null;
	}
	const enum GAdePscdcdeDtoNames { ixp_den = "ixp_den", ixs_cle = "ixs_cle", ixs_vpk = "ixs_vpk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdePscdcdeDtoFragments { ixp_den = "main", ixs_cle = "main", ixs_vpk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdePscdcdeDtoTypes { ixp_den = "string", ixs_cle = "string", ixs_vpk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den_txt = "string", ixs_cle_txt = "string", ixs_vpk_txt = "string",}
	const enum GAdePscdcdeDtoTypeLengths { ixp_den = 12, ixs_cle = 12, ixs_vpk = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscddvnDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Pevně definované náhrady.*/
	interface GAdePscddvnDto {
		/**Kód vna.*/
		kod_vna?: number|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Měna.*/
		mena?: number|null;
		/**C měna.*/
		c_mena?: JsonDecimal|null;
		/**C celkem.*/
		c_celkem?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Zp vyp.*/
		zp_vyp?: number|null;
		/**Typ náhrady.*/
		kod_vna_txt?: string|null;
		/**Měna.*/
		mena_txt?: string|null;
		/**Stát.*/
		stat_txt?: string|null;
		/**Způsob výpočtu.*/
		zp_vyp_txt?: string|null;
	}
	const enum GAdePscddvnDtoNames { kod_vna = "kod_vna", stat = "stat", rok = "rok", mena = "mena", c_mena = "c_mena", c_celkem = "c_celkem", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_vyp = "zp_vyp", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_vyp_txt = "zp_vyp_txt",}
	const enum GAdePscddvnDtoFragments { kod_vna = "main", stat = "main", rok = "main", mena = "main", c_mena = "main", c_celkem = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", zp_vyp = "main", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_vyp_txt = "zp_vyp_txt",}
	const enum GAdePscddvnDtoTypes { kod_vna = "number", stat = "number", rok = "number", mena = "number", c_mena = "JsonDecimal", c_celkem = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_vyp = "number", kod_vna_txt = "string", mena_txt = "string", stat_txt = "string", zp_vyp_txt = "string",}
	const enum GAdePscddvnDtoTypeLengths { zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscdpvnDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Průměrná výše nákladů.*/
	interface GAdePscdpvnDto {
		/**Kód vna.*/
		kod_vna?: number|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Měna.*/
		mena?: number|null;
		/**C měna.*/
		c_mena?: JsonDecimal|null;
		/**C celkem.*/
		c_celkem?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kod_vna_txt.*/
		kod_vna_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
	}
	const enum GAdePscdpvnDtoNames { kod_vna = "kod_vna", stat = "stat", rok = "rok", mena = "mena", c_mena = "c_mena", c_celkem = "c_celkem", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt",}
	const enum GAdePscdpvnDtoFragments { kod_vna = "main", stat = "main", rok = "main", mena = "main", c_mena = "main", c_celkem = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt",}
	const enum GAdePscdpvnDtoTypes { kod_vna = "number", stat = "number", rok = "number", mena = "number", c_mena = "JsonDecimal", c_celkem = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_vna_txt = "string", mena_txt = "string", stat_txt = "string",}
	const enum GAdePscdpvnDtoTypeLengths { zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscrdacDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha PCN.*/
	interface GAdePscrdacDto extends Gordic.Adx.Interface.GXxxrdac {
		/**Ixp_den_txt.*/
		ixp_den_txt?: string|null;
	}
	const enum GAdePscrdacDtoNames { ixp_den_txt = "ixp_den_txt", ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su",}
	const enum GAdePscrdacDtoFragments { ixp_den_txt = "ixp_den_txt", ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*",}
	const enum GAdePscrdacDtoTypes { ixp_den_txt = "string", ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string",}
	const enum GAdePscrdacDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscsbuvDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Bankovní účty pro PCN.*/
	interface GAdePscsbuvDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Bankovní účet vlastní.*/
		bu_vl?: string|null;
		/**Směrový kód vlastního účtu.*/
		sk_vl?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GAdePscsbuvDtoNames { rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", bu_vl = "bu_vl", sk_vl = "sk_vl", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdePscsbuvDtoFragments { rok = "main", ico = "main", ucs = "main", uus = "main", bu_vl = "main", sk_vl = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdePscsbuvDtoTypes { rok = "number", ico = "string", ucs = "string", uus = "string", bu_vl = "string", sk_vl = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdePscsbuvDtoTypeLengths { ico = 10, ucs = 10, uus = 10, bu_vl = 34, sk_vl = 11, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscscfaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Třídění/Aktivita (účel konání cesty a návštěvy).*/
	interface GAdePscscfaDto {
		/**Rok.*/
		rok?: number|null;
		/**Uex akt.*/
		uex_akt?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Identifikátor roz.*/
		ixs_roz?: string|null;
		/**Uroven kon.*/
		uroven_kon?: string|null;
		/**Xuete.*/
		xuete?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**C limit.*/
		c_limit?: JsonDecimal|null;
		/**Kontrola lim.*/
		kontrola_lim?: number|null;
		/**Poriz zam.*/
		poriz_zam?: number|null;
		/**Edit zam.*/
		edit_zam?: number|null;
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
	const enum GAdePscscfaDtoNames { rok = "rok", uex_akt = "uex_akt", nazev = "nazev", poznamka = "poznamka", ixs_roz = "ixs_roz", uroven_kon = "uroven_kon", xuete = "xuete", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_limit = "c_limit", kontrola_lim = "kontrola_lim", poriz_zam = "poriz_zam", edit_zam = "edit_zam", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GAdePscscfaDtoFragments { rok = "main", uex_akt = "main", nazev = "main", poznamka = "main", ixs_roz = "main", uroven_kon = "main", xuete = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c_limit = "main", kontrola_lim = "main", poriz_zam = "main", edit_zam = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main",}
	const enum GAdePscscfaDtoTypes { rok = "number", uex_akt = "string", nazev = "string", poznamka = "string", ixs_roz = "string", uroven_kon = "string", xuete = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_limit = "JsonDecimal", kontrola_lim = "number", poriz_zam = "number", edit_zam = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GAdePscscfaDtoTypeLengths { uex_akt = 16, nazev = 255, poznamka = 254, ixs_roz = 12, uroven_kon = 1, xuete = 286, zmenu_prov = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscscleDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Definice členění záznamů na deník PCN.*/
	interface GAdePscscleDto {
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
	}
	const enum GAdePscscleDtoNames { ixs_cle = "ixs_cle", nazev = "nazev", kod_cle = "kod_cle", poznamka = "poznamka", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GAdePscscleDtoFragments { ixs_cle = "main", nazev = "main", kod_cle = "main", poznamka = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main",}
	const enum GAdePscscleDtoTypes { ixs_cle = "string", nazev = "string", kod_cle = "string", poznamka = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GAdePscscleDtoTypeLengths { ixs_cle = 12, nazev = 100, kod_cle = 16, poznamka = 254, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscsdenDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha PCN.*/
	interface GAdePscsdenDto extends Gordic.Adx.Interface.GXxxsden {
		/**Subrada duz.*/
		subrada_duz?: number|null;
		/**Rok sberu.*/
		rok_sberu?: number|null;
		/**Priz plan.*/
		priz_plan?: number|null;
	}
	const enum GAdePscsdenDtoNames { subrada_duz = "subrada_duz", rok_sberu = "rok_sberu", priz_plan = "priz_plan", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdePscsdenDtoFragments { subrada_duz = "main", rok_sberu = "main", priz_plan = "main", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdePscsdenDtoTypes { subrada_duz = "number", rok_sberu = "number", priz_plan = "number", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdePscsdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscskhoDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kategorie hodnocení.*/
	interface GAdePscskhoDto {
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
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Typ_poz_txt.*/
		typ_poz_txt?: string|null;
	}
	const enum GAdePscskhoDtoNames { ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", filtr = "filtr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt",}
	const enum GAdePscskhoDtoFragments { ico = "main", rok = "main", kat_hod = "main", kat_hod_txt = "main", filtr = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_poz = "main", typ_poz_txt = "typ_poz_txt",}
	const enum GAdePscskhoDtoTypes { ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", filtr = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", typ_poz_txt = "string",}
	const enum GAdePscskhoDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, filtr = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscskumDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kalkulační kurzy.*/
	interface GAdePscskumDto {
		/**Rok.*/
		rok?: number|null;
		/**Měna.*/
		mena?: number|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
	}
	const enum GAdePscskumDtoNames { rok = "rok", mena = "mena", kurz = "kurz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_txt = "mena_txt",}
	const enum GAdePscskumDtoFragments { rok = "main", mena = "main", kurz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", mena_txt = "mena_txt",}
	const enum GAdePscskumDtoTypes { rok = "number", mena = "number", kurz = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_txt = "string",}
	const enum GAdePscskumDtoTypeLengths { zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscslimDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Limity, omezení.*/
	interface GAdePscslimDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**C limit.*/
		c_limit?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kontrola lim.*/
		kontrola_lim?: number|null;
		/**Poriz zam.*/
		poriz_zam?: number|null;
		/**Edit zam.*/
		edit_zam?: number|null;
	}
	const enum GAdePscslimDtoNames { rok = "rok", ico = "ico", nks = "nks", c_limit = "c_limit", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrola_lim = "kontrola_lim", poriz_zam = "poriz_zam", edit_zam = "edit_zam",}
	const enum GAdePscslimDtoFragments { rok = "main", ico = "main", nks = "main", c_limit = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kontrola_lim = "main", poriz_zam = "main", edit_zam = "main",}
	const enum GAdePscslimDtoTypes { rok = "number", ico = "string", nks = "string", c_limit = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kontrola_lim = "number", poriz_zam = "number", edit_zam = "number",}
	const enum GAdePscslimDtoTypeLengths { ico = 10, nks = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscsnkhDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Název číselníku kategorie hodnocení.*/
	interface GAdePscsnkhDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GAdePscsnkhDtoNames { ico = "ico", rok = "rok", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdePscsnkhDtoFragments { ico = "main", rok = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdePscsnkhDtoTypes { ico = "string", rok = "number", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdePscsnkhDtoTypeLengths { ico = 10, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscstnaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kategorie náhrad.*/
	interface GAdePscstnaDto {
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
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód tna.*/
		kod_tna?: string|null;
		/**Ixs_zpz_txt.*/
		ixs_zpz_txt?: string|null;
		/**Ktg_tna_txt.*/
		ktg_tna_txt?: string|null;
	}
	const enum GAdePscstnaDtoNames { ixs_tna = "ixs_tna", ktg_tna = "ktg_tna", ixs_zpz = "ixs_zpz", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_tna = "kod_tna", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdePscstnaDtoFragments { ixs_tna = "main", ktg_tna = "main", ixs_zpz = "main", nazev = "main", dat_od = "main", dat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kod_tna = "main", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdePscstnaDtoTypes { ixs_tna = "string", ktg_tna = "number", ixs_zpz = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_tna = "string", ixs_zpz_txt = "string", ktg_tna_txt = "string",}
	const enum GAdePscstnaDtoTypeLengths { ixs_tna = 12, ixs_zpz = 12, nazev = 50, zmenu_prov = 12, kod_tna = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscsvnaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Typ náhrady.*/
	interface GAdePscsvnaDto {
		/**Kód vna.*/
		kod_vna?: number|null;
		/**Identifikátor zpz.*/
		ixs_zpz?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Identifikátor tna.*/
		ixs_tna?: string|null;
		/**Zp dopr.*/
		zp_dopr?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Ixs_zpz_txt.*/
		ixs_zpz_txt?: string|null;
		/**Zp_dopr_txt.*/
		zp_dopr_txt?: string|null;
	}
	const enum GAdePscsvnaDtoNames { kod_vna = "kod_vna", ixs_zpz = "ixs_zpz", nazev = "nazev", ixs_tna = "ixs_tna", zp_dopr = "zp_dopr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tna_txt = "ixs_tna_txt", ixs_zpz_txt = "ixs_zpz_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdePscsvnaDtoFragments { kod_vna = "main", ixs_zpz = "main", nazev = "main", ixs_tna = "main", zp_dopr = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tna_txt = "ixs_tna_txt", ixs_zpz_txt = "ixs_zpz_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdePscsvnaDtoTypes { kod_vna = "number", ixs_zpz = "string", nazev = "string", ixs_tna = "string", zp_dopr = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tna_txt = "string", ixs_zpz_txt = "string", zp_dopr_txt = "string",}
	const enum GAdePscsvnaDtoTypeLengths { ixs_zpz = 12, nazev = 50, ixs_tna = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscsvpkDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Definice členění záznamů na deník PCN.*/
	interface GAdePscsvpkDto {
		/**Identifikátor vpk.*/
		ixs_vpk?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
	}
	const enum GAdePscsvpkDtoNames { ixs_vpk = "ixs_vpk", aktivita = "aktivita", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", ucs = "ucs",}
	const enum GAdePscsvpkDtoFragments { ixs_vpk = "main", aktivita = "main", nazev = "main", poznamka = "main", dat_od = "main", dat_do = "main", dat_zmena = "main", zmenu_prov = "main", ico = "main", ucs = "main",}
	const enum GAdePscsvpkDtoTypes { ixs_vpk = "string", aktivita = "number", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", ucs = "string",}
	const enum GAdePscsvpkDtoTypeLengths { ixs_vpk = 12, nazev = 50, poznamka = 254, zmenu_prov = 12, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscszpzDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Navýšení náhrad.*/
	interface GAdePscszpzDto {
		/**Identifikátor zpz.*/
		ixs_zpz?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Kod.*/
		kod?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**K v.*/
		k_v?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GAdePscszpzDtoNames { ixs_zpz = "ixs_zpz", aktivita = "aktivita", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", k_v = "k_v", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdePscszpzDtoFragments { ixs_zpz = "main", aktivita = "main", kod = "main", zkratka = "main", nazev = "main", poznamka = "main", dat_od = "main", dat_do = "main", k_v = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdePscszpzDtoTypes { ixs_zpz = "string", aktivita = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", k_v = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdePscszpzDtoTypeLengths { ixs_zpz = 12, kod = 30, zkratka = 16, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Dto\GAdePscvrfuDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha PCN.*/
	interface GAdePscvrfuDto extends Gordic.Adx.Interface.GXxxvrfu {
		/**Ixs_fun_txt.*/
		ixs_fun_txt?: string|null;
	}
	const enum GAdePscvrfuDtoNames { ixs_fun_txt = "ixs_fun_txt", ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdePscvrfuDtoFragments { ixs_fun_txt = "ixs_fun_txt", ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdePscvrfuDtoTypes { ixs_fun_txt = "string", ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdePscvrfuDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeAktivitaTrideniPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Třídění/Aktivita (účel konání cesty a návštěvy).
	* @domain GinisAdmin
	* @businessObject AdeAktivitaTrideniPcn
	*/
	interface AdeAktivitaTrideniPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeAktivitaTrideniPcn: ServiceBase & Catalog.AdeAktivitaTrideniPcn;
	}
	const AdeAktivitaTrideniPcn: Client["AdeAktivitaTrideniPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeAktivitaTrideniPcnDto extends Gordic.Ade.Interface.GAdePscscfaDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeAktivitaTrideniPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", rok = "rok", uex_akt = "uex_akt", nazev = "nazev", poznamka = "poznamka", ixs_roz = "ixs_roz", uroven_kon = "uroven_kon", xuete = "xuete", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_limit = "c_limit", kontrola_lim = "kontrola_lim", poriz_zam = "poriz_zam", edit_zam = "edit_zam", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GAdeAktivitaTrideniPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", rok = "main", uex_akt = "main", nazev = "main", poznamka = "main", ixs_roz = "main", uroven_kon = "main", xuete = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c_limit = "main", kontrola_lim = "main", poriz_zam = "main", edit_zam = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main",}
	const enum GAdeAktivitaTrideniPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", rok = "number", uex_akt = "string", nazev = "string", poznamka = "string", ixs_roz = "string", uroven_kon = "string", xuete = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_limit = "JsonDecimal", kontrola_lim = "number", poriz_zam = "number", edit_zam = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GAdeAktivitaTrideniPcnDtoTypeLengths { uex_akt = 16, nazev = 255, poznamka = 254, ixs_roz = 12, uroven_kon = 1, xuete = 286, zmenu_prov = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeAktivitaTrideniPcnFilterEnum {
		/**Rok.*/
		rok,
		/**Uex akt.*/
		uex_akt,
		/**Název.*/
		nazev,
		/**Poznámka.*/
		poznamka,
		/**Identifikátor roz.*/
		ixs_roz,
		/**Uroven kon.*/
		uroven_kon,
		/**Xuete.*/
		xuete,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Částka limit.*/
		c_limit,
		/**Kontrola lim.*/
		kontrola_lim,
		/**Poriz zam.*/
		poriz_zam,
		/**Edit zam.*/
		edit_zam,
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

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeBankovniUctyPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Bankovní účty pro PCN.
	* @domain GinisAdmin
	* @businessObject AdeBankovniUctyPcn
	*/
	interface AdeBankovniUctyPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeBankovniUctyPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeBankovniUctyPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeBankovniUctyPcn: ServiceBase & Catalog.AdeBankovniUctyPcn;
	}
	const AdeBankovniUctyPcn: Client["AdeBankovniUctyPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeBankovniUctyPcnDto extends Gordic.Ade.Interface.GAdePscsbuvDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeBankovniUctyPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", bu_vl = "bu_vl", sk_vl = "sk_vl", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeBankovniUctyPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", rok = "main", ico = "main", ucs = "main", uus = "main", bu_vl = "main", sk_vl = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdeBankovniUctyPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", rok = "number", ico = "string", ucs = "string", uus = "string", bu_vl = "string", sk_vl = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeBankovniUctyPcnDtoTypeLengths { ico = 10, ucs = 10, uus = 10, bu_vl = 34, sk_vl = 11, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeBankovniUctyPcnFilterEnum {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Bankovní účet vlastní.*/
		bu_vl,
		/**Směrový kód vlastního účtu.*/
		sk_vl,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeCleneniPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Členění.
	* @domain GinisAdmin
	* @businessObject AdeCleneniPcn
	*/
	interface AdeCleneniPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeCleneniPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeCleneniPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeCleneniPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeCleneniPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeCleneniPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeCleneniPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeCleneniPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeCleneniPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeCleneniPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeCleneniPcn: ServiceBase & Catalog.AdeCleneniPcn;
	}
	const AdeCleneniPcn: Client["AdeCleneniPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeCleneniPcnDto extends Gordic.Ade.Interface.GAdePscscleDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeCleneniPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_cle = "ixs_cle", nazev = "nazev", kod_cle = "kod_cle", poznamka = "poznamka", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GAdeCleneniPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_cle = "main", nazev = "main", kod_cle = "main", poznamka = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main",}
	const enum GAdeCleneniPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_cle = "string", nazev = "string", kod_cle = "string", poznamka = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string",}
	const enum GAdeCleneniPcnDtoTypeLengths { ixs_cle = 12, nazev = 100, kod_cle = 16, poznamka = 254, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeCleneniPcnFilterEnum {
		/**Identifikátor cle.*/
		ixs_cle,
		/**Název.*/
		nazev,
		/**Kód cle.*/
		kod_cle,
		/**Poznámka.*/
		poznamka,
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

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKalkulacniKurzyPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kalkulační kurzy.
	* @domain GinisAdmin
	* @businessObject AdeKalkulacniKurzyPcn
	*/
	interface AdeKalkulacniKurzyPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto>>;
		/**Vrátí pole měn dle FK kurzu, které lze v daném roce použít.*/
		poleMen(rq?:CallParams<{rok:number}>): _Task<{rok:number},GServiceListResponse<Gordic.Ade.Interface.GAdePscskumDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKalkulacniKurzyPcn: ServiceBase & Catalog.AdeKalkulacniKurzyPcn;
	}
	const AdeKalkulacniKurzyPcn: Client["AdeKalkulacniKurzyPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKalkulacniKurzyPcnDto extends Gordic.Ade.Interface.GAdePscskumDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKalkulacniKurzyPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", rok = "rok", mena = "mena", kurz = "kurz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_txt = "mena_txt",}
	const enum GAdeKalkulacniKurzyPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", rok = "main", mena = "main", kurz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", mena_txt = "mena_txt",}
	const enum GAdeKalkulacniKurzyPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", rok = "number", mena = "number", kurz = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_txt = "string",}
	const enum GAdeKalkulacniKurzyPcnDtoTypeLengths { zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKalkulacniKurzyPcnFilterEnum {
		/**Rok.*/
		rok,
		/**Měna.*/
		mena,
		/**Kurz.*/
		kurz,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKategorieHodnoceniPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie hodnocení.
	* @domain GinisAdmin
	* @businessObject AdeKategorieHodnoceniPcn
	*/
	interface AdeKategorieHodnoceniPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKategorieHodnoceniPcn: ServiceBase & Catalog.AdeKategorieHodnoceniPcn;
	}
	const AdeKategorieHodnoceniPcn: Client["AdeKategorieHodnoceniPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKategorieHodnoceniPcnDto extends Gordic.Ade.Interface.GAdePscskhoDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKategorieHodnoceniPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", filtr = "filtr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", typ_poz_txt = "typ_poz_txt",}
	const enum GAdeKategorieHodnoceniPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "main", rok = "main", kat_hod = "main", kat_hod_txt = "main", filtr = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_poz = "main", typ_poz_txt = "typ_poz_txt",}
	const enum GAdeKategorieHodnoceniPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", filtr = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", typ_poz_txt = "string",}
	const enum GAdeKategorieHodnoceniPcnDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, filtr = 254, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKategorieHodnoceniPcnFilterEnum {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Kat hod.*/
		kat_hod,
		/**Kat hod txt.*/
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
		/**Typ poz.*/
		typ_poz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKategorieNahradPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie náhrad.
	* @domain GinisAdmin
	* @businessObject AdeKategorieNahradPcn
	*/
	interface AdeKategorieNahradPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKategorieNahradPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKategorieNahradPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKategorieNahradPcn: ServiceBase & Catalog.AdeKategorieNahradPcn;
	}
	const AdeKategorieNahradPcn: Client["AdeKategorieNahradPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKategorieNahradPcnDto extends Gordic.Ade.Interface.GAdePscstnaDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKategorieNahradPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_tna = "ixs_tna", ktg_tna = "ktg_tna", ixs_zpz = "ixs_zpz", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_tna = "kod_tna", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdeKategorieNahradPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_tna = "main", ktg_tna = "main", ixs_zpz = "main", nazev = "main", dat_od = "main", dat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kod_tna = "main", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdeKategorieNahradPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_tna = "string", ktg_tna = "number", ixs_zpz = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_tna = "string", ixs_zpz_txt = "string", ktg_tna_txt = "string",}
	const enum GAdeKategorieNahradPcnDtoTypeLengths { ixs_tna = 12, ixs_zpz = 12, nazev = 50, zmenu_prov = 12, kod_tna = 16,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKategorieNahradPcnFilterEnum {
		/**Identifikátor tna.*/
		ixs_tna,
		/**Ktg tna.*/
		ktg_tna,
		/**Identifikátor zpz.*/
		ixs_zpz,
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
		/**Kód tna.*/
		kod_tna,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKnihaPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha PCN.
	* @domain GinisAdmin
	* @businessObject AdeKnihaPcn
	*/
	interface AdeKnihaPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaPcn: ServiceBase & Catalog.AdeKnihaPcn;
	}
	const AdeKnihaPcn: Client["AdeKnihaPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKnihaPcnDto extends Gordic.Ade.Interface.GAdePscsdenDto {
		/**Spisový uzel.*/
		ixs_su?: string|null;
		/**Spisový uzel (txt).*/
		ixs_su_txt?: string|null;
		/**Začátek subřady.*/
		ac_cislo_od?: number|null;
		/**Konec subřady.*/
		ac_cislo_do?: number|null;
		/**Poslední použité číslo.*/
		ac_cislo_max?: number|null;
		/**Začátek subřady.*/
		akt_subrady?: number|null;
		/**Začátek subřady (txt).*/
		akt_subrady_txt?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Příznak, zda kniha byla použita.*/
		is_used?: boolean|null;
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaPcnDtoNames { ixs_su = "ixs_su", ixs_su_txt = "ixs_su_txt", ac_cislo_od = "ac_cislo_od", ac_cislo_do = "ac_cislo_do", ac_cislo_max = "ac_cislo_max", akt_subrady = "akt_subrady", akt_subrady_txt = "akt_subrady_txt", zkratka = "zkratka", is_used = "is_used", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", subrada_duz = "subrada_duz", rok_sberu = "rok_sberu", priz_plan = "priz_plan", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdeKnihaPcnDtoFragments { ixs_su = "*", ixs_su_txt = "*", ac_cislo_od = "*", ac_cislo_do = "*", ac_cislo_max = "*", akt_subrady = "*", akt_subrady_txt = "*", zkratka = "*", is_used = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", subrada_duz = "main", rok_sberu = "main", priz_plan = "main", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdeKnihaPcnDtoTypes { ixs_su = "string", ixs_su_txt = "string", ac_cislo_od = "number", ac_cislo_do = "number", ac_cislo_max = "number", akt_subrady = "number", akt_subrady_txt = "string", zkratka = "string", is_used = "boolean", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", subrada_duz = "number", rok_sberu = "number", priz_plan = "number", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdeKnihaPcnDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKnihaPcnFilterEnum {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Lic.*/
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
		/**Typ den.*/
		typ_den,
		/**Ktg den.*/
		ktg_den,
		/**Por číslo max.*/
		por_cislo_max,
		/**Subrada max.*/
		subrada_max,
		/**Subrada duz.*/
		subrada_duz,
		/**Len ac.*/
		len_ac,
		/**Krok uza.*/
		krok_uza,
		/**Kniha old.*/
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
		/**Rok sberu.*/
		rok_sberu,
		/**Priz plan.*/
		priz_plan,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKnihaPcnCleneni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Definice členění záznamů na deník PCN.
	* @domain GinisAdmin
	* @businessObject AdeKnihaPcnCleneni
	*/
	interface AdeKnihaPcnCleneni {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaPcnCleneni: ServiceBase & Catalog.AdeKnihaPcnCleneni;
	}
	const AdeKnihaPcnCleneni: Client["AdeKnihaPcnCleneni"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKnihaPcnCleneniDto extends Gordic.Ade.Interface.GAdePscdcdeDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaPcnCleneniDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixp_den = "ixp_den", ixs_cle = "ixs_cle", ixs_vpk = "ixs_vpk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdeKnihaPcnCleneniDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixp_den = "main", ixs_cle = "main", ixs_vpk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdeKnihaPcnCleneniDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixp_den = "string", ixs_cle = "string", ixs_vpk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den_txt = "string", ixs_cle_txt = "string", ixs_vpk_txt = "string",}
	const enum GAdeKnihaPcnCleneniDtoTypeLengths { ixp_den = 12, ixs_cle = 12, ixs_vpk = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKnihaPcnCleneniFilterEnum {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Identifikátor cle.*/
		ixs_cle,
		/**Identifikátor vpk.*/
		ixs_vpk,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKnihaPcnFunkcniMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Povolené řady pro funkci.
	* @domain GinisAdmin
	* @businessObject AdeKnihaPcnFunkcniMisto
	*/
	interface AdeKnihaPcnFunkcniMisto {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>>;
		/**Metoda pro ověření zda záznamy existují.*/
		testExist(rq?:CallParams<{dtos:Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto[]}>): _Task<{dtos:Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxExistResultDto<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>[]>;
		/**Hromadné uložení dat.*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto[]}>): _Task<{data:Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto>[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaPcnFunkcniMisto: ServiceBase & Catalog.AdeKnihaPcnFunkcniMisto;
	}
	const AdeKnihaPcnFunkcniMisto: Client["AdeKnihaPcnFunkcniMisto"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKnihaPcnFunkcniMistoDto extends Gordic.Ade.Interface.GAdePscvrfuDto {
		/**Textová reprezentace deníku.*/
		ixp_den_txt?: string|null;
		/**Textová reprezentace osoby.*/
		ixs_ref_txt?: string|null;
		/**Rok deníku.*/
		rok?: number|null;
		/**Středisko účtování.*/
		ucs?: string|null;
		/**IČO deníku.*/
		ico?: string|null;
		/**IČO funkčního místa.*/
		ixs_fun_ico?: string|null;
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaPcnFunkcniMistoDtoNames { ixp_den_txt = "ixp_den_txt", ixs_ref_txt = "ixs_ref_txt", rok = "rok", ucs = "ucs", ico = "ico", ixs_fun_ico = "ixs_fun_ico", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeKnihaPcnFunkcniMistoDtoFragments { ixp_den_txt = "*", ixs_ref_txt = "*", rok = "*", ucs = "*", ico = "*", ixs_fun_ico = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdeKnihaPcnFunkcniMistoDtoTypes { ixp_den_txt = "string", ixs_ref_txt = "string", rok = "number", ucs = "string", ico = "string", ixs_fun_ico = "string", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeKnihaPcnFunkcniMistoDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKnihaPcnFunkcniMistoFilterEnum {
		/**Aktivita.*/
		aktivita,
		/**PK tabulky - Funkční místo.*/
		ixs_fun,
		/**PK tabulky - Identifikátor knihy.*/
		ixp_den,
		/**PK tabulky - Číslo subřady.*/
		subrada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeKopirovaniCiselnikuMeziRokyPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha PCN.
	* @domain GinisAdmin
	* @businessObject AdePcnKopirovani
	*/
	interface AdePcnKopirovani {
		/**Překopíruje číselníky třídění mezi zadanými roky.*/
		trideni(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky kurzů mezi zadanými roky.*/
		kurzy(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky názvů kategorií hodnocení mezi zadanými roky.*/
		nazvyKho(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky průměrných výší náhrad mezi zadanými roky.*/
		prumerneVyseNahrad(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky funkcí oprávněných měnit aktivity po uzávěrce mezi zadanými roky.*/
		funkceZmenaAktivit(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky pevně definovaných výší náhrad mezi zadanými roky.*/
		pevneDefVyseNahrad(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky kategorie hodnocení mezi zadanými roky.*/
		kategorieHodnoceni(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky ročních limitů NKS mezi zadanými roky.*/
		rocniLimitNks(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky definice bankovních účtů mezi zadanými roky.*/
		definiceBankUctu(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky funkcí oprávněných měnit limity NKS po uzávěrce mezi zadanými roky.*/
		funkceZmenaLimityNks(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdePcnKopirovani: ServiceBase & Catalog.AdePcnKopirovani;
	}
	const AdePcnKopirovani: Client["AdePcnKopirovani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeLimityOmezeniPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Limity, omezení.
	* @domain GinisAdmin
	* @businessObject AdeLimityOmezeniPcn
	*/
	interface AdeLimityOmezeniPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeLimityOmezeniPcn: ServiceBase & Catalog.AdeLimityOmezeniPcn;
	}
	const AdeLimityOmezeniPcn: Client["AdeLimityOmezeniPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeLimityOmezeniPcnDto extends Gordic.Ade.Interface.GAdePscslimDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeLimityOmezeniPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", rok = "rok", ico = "ico", nks = "nks", c_limit = "c_limit", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrola_lim = "kontrola_lim", poriz_zam = "poriz_zam", edit_zam = "edit_zam",}
	const enum GAdeLimityOmezeniPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", rok = "main", ico = "main", nks = "main", c_limit = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kontrola_lim = "main", poriz_zam = "main", edit_zam = "main",}
	const enum GAdeLimityOmezeniPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", rok = "number", ico = "string", nks = "string", c_limit = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kontrola_lim = "number", poriz_zam = "number", edit_zam = "number",}
	const enum GAdeLimityOmezeniPcnDtoTypeLengths { ico = 10, nks = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeLimityOmezeniPcnFilterEnum {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Nákladové středisko.*/
		nks,
		/**Částka limit.*/
		c_limit,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kontrola lim.*/
		kontrola_lim,
		/**Poriz zam.*/
		poriz_zam,
		/**Edit zam.*/
		edit_zam,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeNazevCisKategorieHodnoceniPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Název číselníku kategorie hodnocení.
	* @domain GinisAdmin
	* @businessObject AdeNazevCisKategorieHodnoceniPcn
	*/
	interface AdeNazevCisKategorieHodnoceniPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeNazevCisKategorieHodnoceniPcn: ServiceBase & Catalog.AdeNazevCisKategorieHodnoceniPcn;
	}
	const AdeNazevCisKategorieHodnoceniPcn: Client["AdeNazevCisKategorieHodnoceniPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeNazevCisKategorieHodnoceniPcnDto extends Gordic.Ade.Interface.GAdePscsnkhDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeNazevCisKategorieHodnoceniPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", rok = "rok", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeNazevCisKategorieHodnoceniPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "main", rok = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdeNazevCisKategorieHodnoceniPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", rok = "number", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeNazevCisKategorieHodnoceniPcnDtoTypeLengths { ico = 10, nazev = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeNazevCisKategorieHodnoceniPcnFilterEnum {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
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

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdePevneDefinovaneNahradyPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pevně definované náhrady.
	* @domain GinisAdmin
	* @businessObject AdePevneDefinovaneNahradyPcn
	*/
	interface AdePevneDefinovaneNahradyPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto>>;
		/**Vrátí seznam zpusobů výpočtů.*/
		listZpv(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdePscczpvDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdePevneDefinovaneNahradyPcn: ServiceBase & Catalog.AdePevneDefinovaneNahradyPcn;
	}
	const AdePevneDefinovaneNahradyPcn: Client["AdePevneDefinovaneNahradyPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdePevneDefinovaneNahradyPcnDto extends Gordic.Ade.Interface.GAdePscddvnDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdePevneDefinovaneNahradyPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", kod_vna = "kod_vna", stat = "stat", rok = "rok", mena = "mena", c_mena = "c_mena", c_celkem = "c_celkem", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_vyp = "zp_vyp", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_vyp_txt = "zp_vyp_txt",}
	const enum GAdePevneDefinovaneNahradyPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", kod_vna = "main", stat = "main", rok = "main", mena = "main", c_mena = "main", c_celkem = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", zp_vyp = "main", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_vyp_txt = "zp_vyp_txt",}
	const enum GAdePevneDefinovaneNahradyPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", kod_vna = "number", stat = "number", rok = "number", mena = "number", c_mena = "JsonDecimal", c_celkem = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_vyp = "number", kod_vna_txt = "string", mena_txt = "string", stat_txt = "string", zp_vyp_txt = "string",}
	const enum GAdePevneDefinovaneNahradyPcnDtoTypeLengths { zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdePevneDefinovaneNahradyPcnFilterEnum {
		/**Kód vna.*/
		kod_vna,
		/**Kód státu.*/
		stat,
		/**Rok.*/
		rok,
		/**Měna.*/
		mena,
		/**Částka měna.*/
		c_mena,
		/**Částka celkem.*/
		c_celkem,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Zp vyp.*/
		zp_vyp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdePrumernaVyseNahradPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Průměrná výše náhrad.
	* @domain GinisAdmin
	* @businessObject AdePrumernaVyseNahradPcn
	*/
	interface AdePrumernaVyseNahradPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdePrumernaVyseNahradPcn: ServiceBase & Catalog.AdePrumernaVyseNahradPcn;
	}
	const AdePrumernaVyseNahradPcn: Client["AdePrumernaVyseNahradPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdePrumernaVyseNahradPcnDto extends Gordic.Ade.Interface.GAdePscdpvnDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdePrumernaVyseNahradPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", kod_vna = "kod_vna", stat = "stat", rok = "rok", mena = "mena", c_mena = "c_mena", c_celkem = "c_celkem", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt",}
	const enum GAdePrumernaVyseNahradPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", kod_vna = "main", stat = "main", rok = "main", mena = "main", c_mena = "main", c_celkem = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", kod_vna_txt = "kod_vna_txt", mena_txt = "mena_txt", stat_txt = "stat_txt",}
	const enum GAdePrumernaVyseNahradPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", kod_vna = "number", stat = "number", rok = "number", mena = "number", c_mena = "JsonDecimal", c_celkem = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_vna_txt = "string", mena_txt = "string", stat_txt = "string",}
	const enum GAdePrumernaVyseNahradPcnDtoTypeLengths { zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdePrumernaVyseNahradPcnFilterEnum {
		/**Kód vna.*/
		kod_vna,
		/**Kód státu.*/
		stat,
		/**Rok.*/
		rok,
		/**Měna.*/
		mena,
		/**Částka měna.*/
		c_mena,
		/**Částka celkem.*/
		c_celkem,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pcn\Interface\IGAdeTypNahradyPcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ náhrady.
	* @domain GinisAdmin
	* @businessObject AdeTypNahradyPcn
	*/
	interface AdeTypNahradyPcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeTypNahradyPcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeTypNahradyPcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeTypNahradyPcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeTypNahradyPcn: ServiceBase & Catalog.AdeTypNahradyPcn;
	}
	const AdeTypNahradyPcn: Client["AdeTypNahradyPcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeTypNahradyPcnDto extends Gordic.Ade.Interface.GAdePscsvnaDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeTypNahradyPcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", kod_vna = "kod_vna", ixs_zpz = "ixs_zpz", nazev = "nazev", ixs_tna = "ixs_tna", zp_dopr = "zp_dopr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tna_txt = "ixs_tna_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdeTypNahradyPcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", kod_vna = "main", ixs_zpz = "main", nazev = "main", ixs_tna = "main", zp_dopr = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tna_txt = "ixs_tna_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdeTypNahradyPcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", kod_vna = "number", ixs_zpz = "string", nazev = "string", ixs_tna = "string", zp_dopr = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tna_txt = "string", zp_dopr_txt = "string",}
	const enum GAdeTypNahradyPcnDtoTypeLengths { ixs_zpz = 12, nazev = 50, ixs_tna = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeTypNahradyPcnFilterEnum {
		/**Kód vna.*/
		kod_vna,
		/**Identifikátor zpz.*/
		ixs_zpz,
		/**Název.*/
		nazev,
		/**Identifikátor tna.*/
		ixs_tna,
		/**Zp dopr.*/
		zp_dopr,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Pok\Dto\GAdePokskonDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Pokladna.*/
	interface GAdePokskonDto {
		/**Identifikátor kon.*/
		ixs_kon?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Kod.*/
		kod?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Mj.*/
		mj?: string|null;
		/**Dan Typ.*/
		dan_typ?: number|null;
		/**Měna.*/
		mena?: number|null;
		/**Typ kon.*/
		typ_kon?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**Identifikátor zpz.*/
		ixs_zpz?: string|null;
		/**Pov vs.*/
		pov_vs?: number|null;
		/**Typ phl.*/
		typ_phl?: string|null;
		/**Identifikátor kon zal.*/
		ixs_kon_zal?: string|null;
		/**Cmj.*/
		cmj?: JsonDecimal|null;
		/**Identifikátor zpz bhp.*/
		ixs_zpz_bhp?: string|null;
		/**Pov dan.*/
		pov_dan?: string|null;
		/**Priz tzh.*/
		priz_tzh?: number|null;
		/**Tzh Typ.*/
		tzh_typ?: number|null;
		/**Identifikátor Typ.*/
		ixs_typ?: string|null;
		/**Dan_typ_txt.*/
		dan_typ_txt?: string|null;
		/**Ixs_zpz_txt.*/
		ixs_zpz_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Mj_txt.*/
		mj_txt?: string|null;
		/**Pov_vs_txt.*/
		pov_vs_txt?: string|null;
		/**Typ_kon_txt.*/
		typ_kon_txt?: string|null;
		/**Tzh_typ_txt.*/
		tzh_typ_txt?: string|null;
		/**Ixs_zpz_bhp_txt.*/
		ixs_zpz_bhp_txt?: string|null;
		/**Kategorie knihy.*/
		ktg_den?: number|null;
		/**Rok.*/
		rok?: number|null;
	}
	const enum GAdePokskonDtoNames { ixs_kon = "ixs_kon", aktivita = "aktivita", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mj = "mj", dan_typ = "dan_typ", mena = "mena", typ_kon = "typ_kon", k_v = "k_v", ixs_zpz = "ixs_zpz", pov_vs = "pov_vs", typ_phl = "typ_phl", ixs_kon_zal = "ixs_kon_zal", cmj = "cmj", ixs_zpz_bhp = "ixs_zpz_bhp", pov_dan = "pov_dan", priz_tzh = "priz_tzh", tzh_typ = "tzh_typ", ixs_typ = "ixs_typ", dan_typ_txt = "dan_typ_txt", ixs_zpz_txt = "ixs_zpz_txt", mena_txt = "mena_txt", mj_txt = "mj_txt", pov_vs_txt = "pov_vs_txt", typ_kon_txt = "typ_kon_txt", tzh_typ_txt = "tzh_typ_txt", ixs_zpz_bhp_txt = "ixs_zpz_bhp_txt", ktg_den = "ktg_den", rok = "rok",}
	const enum GAdePokskonDtoFragments { ixs_kon = "main", aktivita = "main", kod = "main", zkratka = "main", nazev = "main", poznamka = "main", dat_od = "main", dat_do = "main", dat_zmena = "main", zmenu_prov = "main", mj = "main", dan_typ = "main", mena = "main", typ_kon = "main", k_v = "main", ixs_zpz = "main", pov_vs = "main", typ_phl = "main", ixs_kon_zal = "main", cmj = "main", ixs_zpz_bhp = "main", pov_dan = "main", priz_tzh = "main", tzh_typ = "main", ixs_typ = "main", dan_typ_txt = "dan_typ_txt", ixs_zpz_txt = "ixs_zpz_txt", mena_txt = "mena_txt", mj_txt = "mj_txt", pov_vs_txt = "pov_vs_txt", typ_kon_txt = "typ_kon_txt", tzh_typ_txt = "tzh_typ_txt", ixs_zpz_bhp_txt = "ixs_zpz_bhp_txt", ktg_den = "main", rok = "main",}
	const enum GAdePokskonDtoTypes { ixs_kon = "string", aktivita = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", mj = "string", dan_typ = "number", mena = "number", typ_kon = "string", k_v = "number", ixs_zpz = "string", pov_vs = "number", typ_phl = "string", ixs_kon_zal = "string", cmj = "JsonDecimal", ixs_zpz_bhp = "string", pov_dan = "string", priz_tzh = "number", tzh_typ = "number", ixs_typ = "string", dan_typ_txt = "string", ixs_zpz_txt = "string", mena_txt = "string", mj_txt = "string", pov_vs_txt = "string", typ_kon_txt = "string", tzh_typ_txt = "string", ixs_zpz_bhp_txt = "string", ktg_den = "number", rok = "number",}
	const enum GAdePokskonDtoTypeLengths { ixs_kon = 12, kod = 30, zkratka = 16, nazev = 254, poznamka = 50, zmenu_prov = 12, mj = 5, typ_kon = 5, ixs_zpz = 12, typ_phl = 4, ixs_kon_zal = 12, ixs_zpz_bhp = 12, pov_dan = 20, ixs_typ = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcncdvnDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Navýšení náhrad.*/
	interface GAdeRcncdvnDto {
		/**Dvn.*/
		dvn?: number|null;
		/**Dvn txt.*/
		dvn_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcncdvnDtoNames { dvn = "dvn", dvn_txt = "dvn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcncdvnDtoFragments { dvn = "main", dvn_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcncdvnDtoTypes { dvn = "number", dvn_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcncdvnDtoTypeLengths { dvn_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcncktdDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeRcncktdDto {
		/**Ktg den.*/
		ktg_den?: number|null;
		/**Ktg den txt.*/
		ktg_den_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcncktdDtoNames { ktg_den = "ktg_den", ktg_den_txt = "ktg_den_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcncktdDtoFragments { ktg_den = "main", ktg_den_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcncktdDtoTypes { ktg_den = "number", ktg_den_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcncktdDtoTypeLengths { ktg_den_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcncphmDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Cena paliva.*/
	interface GAdeRcncphmDto {
		/**Phm.*/
		phm?: number|null;
		/**Phm txt.*/
		phm_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcncphmDtoNames { phm = "phm", phm_txt = "phm_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcncphmDtoFragments { phm = "main", phm_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcncphmDtoTypes { phm = "number", phm_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcncphmDtoTypeLengths { phm_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcncsasDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Stravné.*/
	interface GAdeRcncsasDto {
		/**Usek.*/
		usek?: number|null;
		/**Usek txt.*/
		usek_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcncsasDtoNames { usek = "usek", usek_txt = "usek_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcncsasDtoFragments { usek = "main", usek_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcncsasDtoTypes { usek = "number", usek_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcncsasDtoTypeLengths { usek_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnctnaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Navýšení náhrad.*/
	interface GAdeRcnctnaDto {
		/**Ktg tna.*/
		ktg_tna?: number|null;
		/**Ktg tna txt.*/
		ktg_tna_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcnctnaDtoNames { ktg_tna = "ktg_tna", ktg_tna_txt = "ktg_tna_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcnctnaDtoFragments { ktg_tna = "main", ktg_tna_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcnctnaDtoTypes { ktg_tna = "number", ktg_tna_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcnctnaDtoTypeLengths { ktg_tna_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnctosDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Typ osoby.*/
	interface GAdeRcnctosDto {
		/**Typ dos.*/
		typ_dos?: number|null;
		/**Typ dos txt.*/
		typ_dos_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcnctosDtoNames { typ_dos = "typ_dos", typ_dos_txt = "typ_dos_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcnctosDtoFragments { typ_dos = "main", typ_dos_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcnctosDtoTypes { typ_dos = "number", typ_dos_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcnctosDtoTypeLengths { typ_dos_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnctpoDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující typ požadavku.*/
	interface GAdeRcnctpoDto {
		/**Typ požadavku.*/
		typ_pozt?: number|null;
		/**Typ požadavku txt.*/
		typ_pozt_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcnctpoDtoNames { typ_pozt = "typ_pozt", typ_pozt_txt = "typ_pozt_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcnctpoDtoFragments { typ_pozt = "main", typ_pozt_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcnctpoDtoTypes { typ_pozt = "number", typ_pozt_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcnctpoDtoTypeLengths { typ_pozt_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcncurnDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Úroveň návštěvy.*/
	interface GAdeRcncurnDto {
		/**Urn.*/
		urn?: number|null;
		/**Urn txt.*/
		urn_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcncurnDtoNames { urn = "urn", urn_txt = "urn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcncurnDtoFragments { urn = "main", urn_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcncurnDtoTypes { urn = "number", urn_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcncurnDtoTypeLengths { urn_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnczpdDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Doprava.*/
	interface GAdeRcnczpdDto {
		/**Zp dopr.*/
		zp_dopr?: number|null;
		/**Zp dopr txt.*/
		zp_dopr_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GAdeRcnczpdDtoNames { zp_dopr = "zp_dopr", zp_dopr_txt = "zp_dopr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GAdeRcnczpdDtoFragments { zp_dopr = "main", zp_dopr_txt = "main", k_v = "main", k_s = "main",}
	const enum GAdeRcnczpdDtoTypes { zp_dopr = "number", zp_dopr_txt = "string", k_v = "number", k_s = "string",}
	const enum GAdeRcnczpdDtoTypeLengths { zp_dopr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndcdeDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Definice členění  a varianty předkontací na knihu.*/
	interface GAdeRcndcdeDto {
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Identifikátor cle.*/
		ixs_cle?: string|null;
		/**Identifikátor vpk.*/
		ixs_vpk?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixp_den_txt.*/
		ixp_den_txt?: string|null;
		/**Ixs_cle_txt.*/
		ixs_cle_txt?: string|null;
		/**Ixs_vpk_txt.*/
		ixs_vpk_txt?: string|null;
	}
	const enum GAdeRcndcdeDtoNames { ixp_den = "ixp_den", ixs_cle = "ixs_cle", ixs_vpk = "ixs_vpk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdeRcndcdeDtoFragments { ixp_den = "main", ixs_cle = "main", ixs_vpk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdeRcndcdeDtoTypes { ixp_den = "string", ixs_cle = "string", ixs_vpk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den_txt = "string", ixs_cle_txt = "string", ixs_vpk_txt = "string",}
	const enum GAdeRcndcdeDtoTypeLengths { ixp_den = 12, ixs_cle = 12, ixs_vpk = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndpfuDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Finanční účtárna.*/
	interface GAdeRcndpfuDto {
		/**Ičo.*/
		ico?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Identifikátor tna.*/
		ixs_tna?: string|null;
		/**Typ dos.*/
		typ_dos?: number|null;
		/**Typ požadavku.*/
		typ_pozt?: number|null;
		/**Upr br pok.*/
		upr_br_pok?: string|null;
		/**Upr mr pok.*/
		upr_mr_pok?: string|null;
		/**Upr br plk.*/
		upr_br_plk?: string|null;
		/**Upr mr plk.*/
		upr_mr_plk?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Upr sr pok.*/
		upr_sr_pok?: string|null;
		/**Upr sr plk.*/
		upr_sr_plk?: string|null;
		/**Upr br bu.*/
		upr_br_bu?: string|null;
		/**Upr mr bu.*/
		upr_mr_bu?: string|null;
		/**Upr sr bu.*/
		upr_sr_bu?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Typ_dos_txt.*/
		typ_dos_txt?: string|null;
		/**Upr_br_bu_txt.*/
		upr_br_bu_txt?: string|null;
		/**Upr_br_plk_txt.*/
		upr_br_plk_txt?: string|null;
		/**Upr_br_pok_txt.*/
		upr_br_pok_txt?: string|null;
		/**Upr_mr_bu_txt.*/
		upr_mr_bu_txt?: string|null;
		/**Upr_mr_plk_txt.*/
		upr_mr_plk_txt?: string|null;
		/**Upr_mr_pok_txt.*/
		upr_mr_pok_txt?: string|null;
		/**Upr_sr_bu_txt.*/
		upr_sr_bu_txt?: string|null;
		/**Upr_sr_plk_txt.*/
		upr_sr_plk_txt?: string|null;
		/**Upr_sr_pok_txt.*/
		upr_sr_pok_txt?: string|null;
		/**typ_pozt_txt.*/
		typ_pozt_txt?: string|null;
		ixs_zpz?: string|null;
	}
	const enum GAdeRcndpfuDtoNames { ico = "ico", dat_od = "dat_od", dat_do = "dat_do", ixs_tna = "ixs_tna", typ_dos = "typ_dos", typ_pozt = "typ_pozt", upr_br_pok = "upr_br_pok", upr_mr_pok = "upr_mr_pok", upr_br_plk = "upr_br_plk", upr_mr_plk = "upr_mr_plk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", upr_sr_pok = "upr_sr_pok", upr_sr_plk = "upr_sr_plk", upr_br_bu = "upr_br_bu", upr_mr_bu = "upr_mr_bu", upr_sr_bu = "upr_sr_bu", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", upr_br_bu_txt = "upr_br_bu_txt", upr_br_plk_txt = "upr_br_plk_txt", upr_br_pok_txt = "upr_br_pok_txt", upr_mr_bu_txt = "upr_mr_bu_txt", upr_mr_plk_txt = "upr_mr_plk_txt", upr_mr_pok_txt = "upr_mr_pok_txt", upr_sr_bu_txt = "upr_sr_bu_txt", upr_sr_plk_txt = "upr_sr_plk_txt", upr_sr_pok_txt = "upr_sr_pok_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "ixs_zpz",}
	const enum GAdeRcndpfuDtoFragments { ico = "main", dat_od = "main", dat_do = "main", ixs_tna = "main", typ_dos = "main", typ_pozt = "main", upr_br_pok = "main", upr_mr_pok = "main", upr_br_plk = "main", upr_mr_plk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", upr_sr_pok = "main", upr_sr_plk = "main", upr_br_bu = "main", upr_mr_bu = "main", upr_sr_bu = "main", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", upr_br_bu_txt = "upr_br_bu_txt", upr_br_plk_txt = "upr_br_plk_txt", upr_br_pok_txt = "upr_br_pok_txt", upr_mr_bu_txt = "upr_mr_bu_txt", upr_mr_plk_txt = "upr_mr_plk_txt", upr_mr_pok_txt = "upr_mr_pok_txt", upr_sr_bu_txt = "upr_sr_bu_txt", upr_sr_plk_txt = "upr_sr_plk_txt", upr_sr_pok_txt = "upr_sr_pok_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "main",}
	const enum GAdeRcndpfuDtoTypes { ico = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_tna = "string", typ_dos = "number", typ_pozt = "number", upr_br_pok = "string", upr_mr_pok = "string", upr_br_plk = "string", upr_mr_plk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", upr_sr_pok = "string", upr_sr_plk = "string", upr_br_bu = "string", upr_mr_bu = "string", upr_sr_bu = "string", ixs_tna_txt = "string", typ_dos_txt = "string", upr_br_bu_txt = "string", upr_br_plk_txt = "string", upr_br_pok_txt = "string", upr_mr_bu_txt = "string", upr_mr_plk_txt = "string", upr_mr_pok_txt = "string", upr_sr_bu_txt = "string", upr_sr_plk_txt = "string", upr_sr_pok_txt = "string", typ_pozt_txt = "string", ixs_zpz = "string",}
	const enum GAdeRcndpfuDtoTypeLengths { ico = 10, ixs_tna = 12, upr_br_pok = 15, upr_mr_pok = 15, upr_br_plk = 15, upr_mr_plk = 15, zmenu_prov = 12, upr_sr_pok = 15, upr_sr_plk = 15, upr_br_bu = 15, upr_mr_bu = 15, upr_sr_bu = 15, ixs_zpz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndphmDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Cena paliva.*/
	interface GAdeRcndphmDto {
		/**Phm.*/
		phm?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Kód státu.*/
		stat?: number|null;
		/**C phm.*/
		c_phm?: JsonDecimal|null;
		/**Měna.*/
		mena?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Phm_txt.*/
		phm_txt?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
	}
	const enum GAdeRcndphmDtoNames { phm = "phm", rok = "rok", stat = "stat", c_phm = "c_phm", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_txt = "mena_txt", phm_txt = "phm_txt", stat_txt = "stat_txt",}
	const enum GAdeRcndphmDtoFragments { phm = "main", rok = "main", stat = "main", c_phm = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", mena_txt = "mena_txt", phm_txt = "phm_txt", stat_txt = "stat_txt",}
	const enum GAdeRcndphmDtoTypes { phm = "number", rok = "number", stat = "number", c_phm = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_txt = "string", phm_txt = "string", stat_txt = "string",}
	const enum GAdeRcndphmDtoTypeLengths { zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndppoDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Pokladna.*/
	interface GAdeRcndppoDto {
		/**Ičo.*/
		ico?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Identifikátor tna.*/
		ixs_tna?: string|null;
		/**Typ dos.*/
		typ_dos?: number|null;
		/**Typ požadavku.*/
		typ_pozt?: number|null;
		/**Identifikátor kon zal.*/
		ixs_kon_zal?: string|null;
		/**Identifikátor kon dhc.*/
		ixs_kon_dhc?: string|null;
		/**Identifikátor kon dhm.*/
		ixs_kon_dhm?: string|null;
		/**Identifikátor kon vhc.*/
		ixs_kon_vhc?: string|null;
		/**Identifikátor kon vhm.*/
		ixs_kon_vhm?: string|null;
		/**Identifikátor kon dkc.*/
		ixs_kon_dkc?: string|null;
		/**Identifikátor kon dkm.*/
		ixs_kon_dkm?: string|null;
		/**Identifikátor kon vkc.*/
		ixs_kon_vkc?: string|null;
		/**Identifikátor kon vkm.*/
		ixs_kon_vkm?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor kon lef.*/
		ixs_kon_lef?: string|null;
		/**Identifikátor kon poz zal.*/
		ixs_kon_poz_zal?: string|null;
		/**Identifikátor kon poz dhc.*/
		ixs_kon_poz_dhc?: string|null;
		/**Identifikátor kon poz dhm.*/
		ixs_kon_poz_dhm?: string|null;
		/**Identifikátor kon poz vhc.*/
		ixs_kon_poz_vhc?: string|null;
		/**Identifikátor kon poz vhm.*/
		ixs_kon_poz_vhm?: string|null;
		/**Identifikátor kon poz dkc.*/
		ixs_kon_poz_dkc?: string|null;
		/**Identifikátor kon poz dkm.*/
		ixs_kon_poz_dkm?: string|null;
		/**Identifikátor kon poz vkc.*/
		ixs_kon_poz_vkc?: string|null;
		/**Identifikátor kon poz vkm.*/
		ixs_kon_poz_vkm?: string|null;
		/**Ixs_kon_dhc_txt.*/
		ixs_kon_dhc_txt?: string|null;
		/**Ixs_kon_dhm_txt.*/
		ixs_kon_dhm_txt?: string|null;
		/**Ixs_kon_dkc_txt.*/
		ixs_kon_dkc_txt?: string|null;
		/**Ixs_kon_dkm_txt.*/
		ixs_kon_dkm_txt?: string|null;
		/**Ixs_kon_lef_txt.*/
		ixs_kon_lef_txt?: string|null;
		/**Ixs_kon_poz_dhc_txt.*/
		ixs_kon_poz_dhc_txt?: string|null;
		/**Ixs_kon_poz_dhm_txt.*/
		ixs_kon_poz_dhm_txt?: string|null;
		/**Ixs_kon_poz_dkc_txt.*/
		ixs_kon_poz_dkc_txt?: string|null;
		/**Ixs_kon_poz_dkm_txt.*/
		ixs_kon_poz_dkm_txt?: string|null;
		/**Ixs_kon_poz_vhc_txt.*/
		ixs_kon_poz_vhc_txt?: string|null;
		/**Ixs_kon_poz_vhm_txt.*/
		ixs_kon_poz_vhm_txt?: string|null;
		/**Ixs_kon_poz_vkc_txt.*/
		ixs_kon_poz_vkc_txt?: string|null;
		/**Ixs_kon_poz_vkm_txt.*/
		ixs_kon_poz_vkm_txt?: string|null;
		/**Ixs_kon_poz_zal_txt.*/
		ixs_kon_poz_zal_txt?: string|null;
		/**Ixs_kon_vhc_txt.*/
		ixs_kon_vhc_txt?: string|null;
		/**Ixs_kon_vhm_txt.*/
		ixs_kon_vhm_txt?: string|null;
		/**Ixs_kon_vkc_txt.*/
		ixs_kon_vkc_txt?: string|null;
		/**Ixs_kon_vkm_txt.*/
		ixs_kon_vkm_txt?: string|null;
		/**Ixs_kon_zal_txt.*/
		ixs_kon_zal_txt?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Typ_dos_txt.*/
		typ_dos_txt?: string|null;
		/**typ_pozt_txt.*/
		typ_pozt_txt?: string|null;
		ixs_zpz?: string|null;
	}
	const enum GAdeRcndppoDtoNames { ico = "ico", dat_od = "dat_od", dat_do = "dat_do", ixs_tna = "ixs_tna", typ_dos = "typ_dos", typ_pozt = "typ_pozt", ixs_kon_zal = "ixs_kon_zal", ixs_kon_dhc = "ixs_kon_dhc", ixs_kon_dhm = "ixs_kon_dhm", ixs_kon_vhc = "ixs_kon_vhc", ixs_kon_vhm = "ixs_kon_vhm", ixs_kon_dkc = "ixs_kon_dkc", ixs_kon_dkm = "ixs_kon_dkm", ixs_kon_vkc = "ixs_kon_vkc", ixs_kon_vkm = "ixs_kon_vkm", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_kon_lef = "ixs_kon_lef", ixs_kon_poz_zal = "ixs_kon_poz_zal", ixs_kon_poz_dhc = "ixs_kon_poz_dhc", ixs_kon_poz_dhm = "ixs_kon_poz_dhm", ixs_kon_poz_vhc = "ixs_kon_poz_vhc", ixs_kon_poz_vhm = "ixs_kon_poz_vhm", ixs_kon_poz_dkc = "ixs_kon_poz_dkc", ixs_kon_poz_dkm = "ixs_kon_poz_dkm", ixs_kon_poz_vkc = "ixs_kon_poz_vkc", ixs_kon_poz_vkm = "ixs_kon_poz_vkm", ixs_kon_dhc_txt = "ixs_kon_dhc_txt", ixs_kon_dhm_txt = "ixs_kon_dhm_txt", ixs_kon_dkc_txt = "ixs_kon_dkc_txt", ixs_kon_dkm_txt = "ixs_kon_dkm_txt", ixs_kon_lef_txt = "ixs_kon_lef_txt", ixs_kon_poz_dhc_txt = "ixs_kon_poz_dhc_txt", ixs_kon_poz_dhm_txt = "ixs_kon_poz_dhm_txt", ixs_kon_poz_dkc_txt = "ixs_kon_poz_dkc_txt", ixs_kon_poz_dkm_txt = "ixs_kon_poz_dkm_txt", ixs_kon_poz_vhc_txt = "ixs_kon_poz_vhc_txt", ixs_kon_poz_vhm_txt = "ixs_kon_poz_vhm_txt", ixs_kon_poz_vkc_txt = "ixs_kon_poz_vkc_txt", ixs_kon_poz_vkm_txt = "ixs_kon_poz_vkm_txt", ixs_kon_poz_zal_txt = "ixs_kon_poz_zal_txt", ixs_kon_vhc_txt = "ixs_kon_vhc_txt", ixs_kon_vhm_txt = "ixs_kon_vhm_txt", ixs_kon_vkc_txt = "ixs_kon_vkc_txt", ixs_kon_vkm_txt = "ixs_kon_vkm_txt", ixs_kon_zal_txt = "ixs_kon_zal_txt", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "ixs_zpz",}
	const enum GAdeRcndppoDtoFragments { ico = "main", dat_od = "main", dat_do = "main", ixs_tna = "main", typ_dos = "main", typ_pozt = "main", ixs_kon_zal = "main", ixs_kon_dhc = "main", ixs_kon_dhm = "main", ixs_kon_vhc = "main", ixs_kon_vhm = "main", ixs_kon_dkc = "main", ixs_kon_dkm = "main", ixs_kon_vkc = "main", ixs_kon_vkm = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_kon_lef = "main", ixs_kon_poz_zal = "main", ixs_kon_poz_dhc = "main", ixs_kon_poz_dhm = "main", ixs_kon_poz_vhc = "main", ixs_kon_poz_vhm = "main", ixs_kon_poz_dkc = "main", ixs_kon_poz_dkm = "main", ixs_kon_poz_vkc = "main", ixs_kon_poz_vkm = "main", ixs_kon_dhc_txt = "ixs_kon_dhc_txt", ixs_kon_dhm_txt = "ixs_kon_dhm_txt", ixs_kon_dkc_txt = "ixs_kon_dkc_txt", ixs_kon_dkm_txt = "ixs_kon_dkm_txt", ixs_kon_lef_txt = "ixs_kon_lef_txt", ixs_kon_poz_dhc_txt = "ixs_kon_poz_dhc_txt", ixs_kon_poz_dhm_txt = "ixs_kon_poz_dhm_txt", ixs_kon_poz_dkc_txt = "ixs_kon_poz_dkc_txt", ixs_kon_poz_dkm_txt = "ixs_kon_poz_dkm_txt", ixs_kon_poz_vhc_txt = "ixs_kon_poz_vhc_txt", ixs_kon_poz_vhm_txt = "ixs_kon_poz_vhm_txt", ixs_kon_poz_vkc_txt = "ixs_kon_poz_vkc_txt", ixs_kon_poz_vkm_txt = "ixs_kon_poz_vkm_txt", ixs_kon_poz_zal_txt = "ixs_kon_poz_zal_txt", ixs_kon_vhc_txt = "ixs_kon_vhc_txt", ixs_kon_vhm_txt = "ixs_kon_vhm_txt", ixs_kon_vkc_txt = "ixs_kon_vkc_txt", ixs_kon_vkm_txt = "ixs_kon_vkm_txt", ixs_kon_zal_txt = "ixs_kon_zal_txt", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "main",}
	const enum GAdeRcndppoDtoTypes { ico = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_tna = "string", typ_dos = "number", typ_pozt = "number", ixs_kon_zal = "string", ixs_kon_dhc = "string", ixs_kon_dhm = "string", ixs_kon_vhc = "string", ixs_kon_vhm = "string", ixs_kon_dkc = "string", ixs_kon_dkm = "string", ixs_kon_vkc = "string", ixs_kon_vkm = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_kon_lef = "string", ixs_kon_poz_zal = "string", ixs_kon_poz_dhc = "string", ixs_kon_poz_dhm = "string", ixs_kon_poz_vhc = "string", ixs_kon_poz_vhm = "string", ixs_kon_poz_dkc = "string", ixs_kon_poz_dkm = "string", ixs_kon_poz_vkc = "string", ixs_kon_poz_vkm = "string", ixs_kon_dhc_txt = "string", ixs_kon_dhm_txt = "string", ixs_kon_dkc_txt = "string", ixs_kon_dkm_txt = "string", ixs_kon_lef_txt = "string", ixs_kon_poz_dhc_txt = "string", ixs_kon_poz_dhm_txt = "string", ixs_kon_poz_dkc_txt = "string", ixs_kon_poz_dkm_txt = "string", ixs_kon_poz_vhc_txt = "string", ixs_kon_poz_vhm_txt = "string", ixs_kon_poz_vkc_txt = "string", ixs_kon_poz_vkm_txt = "string", ixs_kon_poz_zal_txt = "string", ixs_kon_vhc_txt = "string", ixs_kon_vhm_txt = "string", ixs_kon_vkc_txt = "string", ixs_kon_vkm_txt = "string", ixs_kon_zal_txt = "string", ixs_tna_txt = "string", typ_dos_txt = "string", typ_pozt_txt = "string", ixs_zpz = "string",}
	const enum GAdeRcndppoDtoTypeLengths { ico = 10, ixs_tna = 12, ixs_kon_zal = 12, ixs_kon_dhc = 12, ixs_kon_dhm = 12, ixs_kon_vhc = 12, ixs_kon_vhm = 12, ixs_kon_dkc = 12, ixs_kon_dkm = 12, ixs_kon_vkc = 12, ixs_kon_vkm = 12, zmenu_prov = 12, ixs_kon_lef = 12, ixs_kon_poz_zal = 12, ixs_kon_poz_dhc = 12, ixs_kon_poz_dhm = 12, ixs_kon_poz_vhc = 12, ixs_kon_poz_vhm = 12, ixs_kon_poz_dkc = 12, ixs_kon_poz_dkm = 12, ixs_kon_poz_vkc = 12, ixs_kon_poz_vkm = 12, ixs_zpz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndsadDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Doprava.*/
	interface GAdeRcndsadDto {
		/**Zp dopr.*/
		zp_dopr?: number|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Dvn.*/
		dvn?: number|null;
		/**Rokmes od.*/
		rokmes_od?: string|null;
		/**Rokmes do.*/
		rokmes_do?: string|null;
		/**C zakl.*/
		c_zakl?: JsonDecimal|null;
		/**C prives.*/
		c_prives?: JsonDecimal|null;
		/**Měna.*/
		mena?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Dvn_txt.*/
		dvn_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
		/**Zp_dopr_txt.*/
		zp_dopr_txt?: string|null;
	}
	const enum GAdeRcndsadDtoNames { zp_dopr = "zp_dopr", stat = "stat", dvn = "dvn", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c_zakl = "c_zakl", c_prives = "c_prives", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdeRcndsadDtoFragments { zp_dopr = "main", stat = "main", dvn = "main", rokmes_od = "main", rokmes_do = "main", c_zakl = "main", c_prives = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdeRcndsadDtoTypes { zp_dopr = "number", stat = "number", dvn = "number", rokmes_od = "string", rokmes_do = "string", c_zakl = "JsonDecimal", c_prives = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string", mena_txt = "string", stat_txt = "string", zp_dopr_txt = "string",}
	const enum GAdeRcndsadDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndsanDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Sazby návštěv.*/
	interface GAdeRcndsanDto {
		/**Identifikátor msm.*/
		ixs_msm?: string|null;
		/**Urn.*/
		urn?: number|null;
		/**Identifikátor tna.*/
		ixs_tna?: string|null;
		/**Rokmes od.*/
		rokmes_od?: string|null;
		/**Rokmes do.*/
		rokmes_do?: string|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixs_msm_txt.*/
		ixs_msm_txt?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Urn_txt.*/
		urn_txt?: string|null;
	}
	const enum GAdeRcndsanDtoNames { ixs_msm = "ixs_msm", urn = "urn", ixs_tna = "ixs_tna", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c = "c", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_msm_txt = "ixs_msm_txt", ixs_tna_txt = "ixs_tna_txt", urn_txt = "urn_txt",}
	const enum GAdeRcndsanDtoFragments { ixs_msm = "main", urn = "main", ixs_tna = "main", rokmes_od = "main", rokmes_do = "main", c = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_msm_txt = "ixs_msm_txt", ixs_tna_txt = "ixs_tna_txt", urn_txt = "urn_txt",}
	const enum GAdeRcndsanDtoTypes { ixs_msm = "string", urn = "number", ixs_tna = "string", rokmes_od = "string", rokmes_do = "string", c = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_msm_txt = "string", ixs_tna_txt = "string", urn_txt = "string",}
	const enum GAdeRcndsanDtoTypeLengths { ixs_msm = 12, ixs_tna = 12, rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndsasDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Stravné.*/
	interface GAdeRcndsasDto {
		/**Usek.*/
		usek?: number|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Dvn.*/
		dvn?: number|null;
		/**Rokmes od.*/
		rokmes_od?: string|null;
		/**Rokmes do.*/
		rokmes_do?: string|null;
		/**C strava.*/
		c_strava?: JsonDecimal|null;
		/**C kapes.*/
		c_kapes?: JsonDecimal|null;
		/**Měna.*/
		mena?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Dvn_txt.*/
		dvn_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
		/**Typ_poz_txt.*/
		typ_poz_txt?: string|null;
		/**Usek_txt.*/
		usek_txt?: string|null;
	}
	const enum GAdeRcndsasDtoNames { usek = "usek", stat = "stat", dvn = "dvn", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c_strava = "c_strava", c_kapes = "c_kapes", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", typ_poz_txt = "typ_poz_txt", usek_txt = "usek_txt",}
	const enum GAdeRcndsasDtoFragments { usek = "main", stat = "main", dvn = "main", rokmes_od = "main", rokmes_do = "main", c_strava = "main", c_kapes = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_poz = "main", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", typ_poz_txt = "typ_poz_txt", usek_txt = "usek_txt",}
	const enum GAdeRcndsasDtoTypes { usek = "number", stat = "number", dvn = "number", rokmes_od = "string", rokmes_do = "string", c_strava = "JsonDecimal", c_kapes = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", dvn_txt = "string", mena_txt = "string", stat_txt = "string", typ_poz_txt = "string", usek_txt = "string",}
	const enum GAdeRcndsasDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndsauDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Ubytování.*/
	interface GAdeRcndsauDto {
		/**Kód státu.*/
		stat?: number|null;
		/**Dvn.*/
		dvn?: number|null;
		/**Rokmes od.*/
		rokmes_od?: string|null;
		/**Rokmes do.*/
		rokmes_do?: string|null;
		/**C zakl.*/
		c_zakl?: JsonDecimal|null;
		/**Měna.*/
		mena?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Dvn_txt.*/
		dvn_txt?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
	}
	const enum GAdeRcndsauDtoNames { stat = "stat", dvn = "dvn", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c_zakl = "c_zakl", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt", stat_txt = "stat_txt", mena_txt = "mena_txt",}
	const enum GAdeRcndsauDtoFragments { stat = "main", dvn = "main", rokmes_od = "main", rokmes_do = "main", c_zakl = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt", stat_txt = "stat_txt", mena_txt = "mena_txt",}
	const enum GAdeRcndsauDtoTypes { stat = "number", dvn = "number", rokmes_od = "string", rokmes_do = "string", c_zakl = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string", stat_txt = "string", mena_txt = "string",}
	const enum GAdeRcndsauDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcndzapDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Pokladna původní algoritmus.*/
	interface GAdeRcndzapDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Identifikátor tna.*/
		ixs_tna?: string|null;
		/**Typ dos.*/
		typ_dos?: number|null;
		/**Identifikátor kon vyp zal.*/
		ixs_kon_vyp_zal?: string|null;
		/**Identifikátor kon vra zal.*/
		ixs_kon_vra_zal?: string|null;
		/**Identifikátor kon vyp vyd.*/
		ixs_kon_vyp_vyd?: string|null;
		/**Identifikátor kon pri hot.*/
		ixs_kon_pri_hot?: string|null;
		/**Identifikátor kon vyd hot.*/
		ixs_kon_vyd_hot?: string|null;
		/**Identifikátor kon pri plk.*/
		ixs_kon_pri_plk?: string|null;
		/**Identifikátor kon vyd plk.*/
		ixs_kon_vyd_plk?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ požadavku.*/
		typ_pozt?: number|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Ixs_kon_pri_hot_txt.*/
		ixs_kon_pri_hot_txt?: string|null;
		/**Ixs_kon_pri_plk_txt.*/
		ixs_kon_pri_plk_txt?: string|null;
		/**Typ_dos_txt.*/
		typ_dos_txt?: string|null;
		/**typ_pozt_txt.*/
		typ_pozt_txt?: string|null;
		/**Ixs_kon_vra_zal_txt.*/
		ixs_kon_vra_zal_txt?: string|null;
		/**Ixs_kon_vyd_hot_txt.*/
		ixs_kon_vyd_hot_txt?: string|null;
		/**Ixs_kon_vyd_plk_txt.*/
		ixs_kon_vyd_plk_txt?: string|null;
		/**Ixs_kon_vyp_vyd_txt.*/
		ixs_kon_vyp_vyd_txt?: string|null;
		/**Ixs_kon_vyp_zal_txt.*/
		ixs_kon_vyp_zal_txt?: string|null;
	}
	const enum GAdeRcndzapDtoNames { ico = "ico", rok = "rok", ixs_tna = "ixs_tna", typ_dos = "typ_dos", ixs_kon_vyp_zal = "ixs_kon_vyp_zal", ixs_kon_vra_zal = "ixs_kon_vra_zal", ixs_kon_vyp_vyd = "ixs_kon_vyp_vyd", ixs_kon_pri_hot = "ixs_kon_pri_hot", ixs_kon_vyd_hot = "ixs_kon_vyd_hot", ixs_kon_pri_plk = "ixs_kon_pri_plk", ixs_kon_vyd_plk = "ixs_kon_vyd_plk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_pozt = "typ_pozt", ixs_tna_txt = "ixs_tna_txt", ixs_kon_pri_hot_txt = "ixs_kon_pri_hot_txt", ixs_kon_pri_plk_txt = "ixs_kon_pri_plk_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_kon_vra_zal_txt = "ixs_kon_vra_zal_txt", ixs_kon_vyd_hot_txt = "ixs_kon_vyd_hot_txt", ixs_kon_vyd_plk_txt = "ixs_kon_vyd_plk_txt", ixs_kon_vyp_vyd_txt = "ixs_kon_vyp_vyd_txt", ixs_kon_vyp_zal_txt = "ixs_kon_vyp_zal_txt",}
	const enum GAdeRcndzapDtoFragments { ico = "main", rok = "main", ixs_tna = "main", typ_dos = "main", ixs_kon_vyp_zal = "main", ixs_kon_vra_zal = "main", ixs_kon_vyp_vyd = "main", ixs_kon_pri_hot = "main", ixs_kon_vyd_hot = "main", ixs_kon_pri_plk = "main", ixs_kon_vyd_plk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_pozt = "main", ixs_tna_txt = "ixs_tna_txt", ixs_kon_pri_hot_txt = "ixs_kon_pri_hot_txt", ixs_kon_pri_plk_txt = "ixs_kon_pri_plk_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_kon_vra_zal_txt = "ixs_kon_vra_zal_txt", ixs_kon_vyd_hot_txt = "ixs_kon_vyd_hot_txt", ixs_kon_vyd_plk_txt = "ixs_kon_vyd_plk_txt", ixs_kon_vyp_vyd_txt = "ixs_kon_vyp_vyd_txt", ixs_kon_vyp_zal_txt = "ixs_kon_vyp_zal_txt",}
	const enum GAdeRcndzapDtoTypes { ico = "string", rok = "number", ixs_tna = "string", typ_dos = "number", ixs_kon_vyp_zal = "string", ixs_kon_vra_zal = "string", ixs_kon_vyp_vyd = "string", ixs_kon_pri_hot = "string", ixs_kon_vyd_hot = "string", ixs_kon_pri_plk = "string", ixs_kon_vyd_plk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_pozt = "number", ixs_tna_txt = "string", ixs_kon_pri_hot_txt = "string", ixs_kon_pri_plk_txt = "string", typ_dos_txt = "string", typ_pozt_txt = "string", ixs_kon_vra_zal_txt = "string", ixs_kon_vyd_hot_txt = "string", ixs_kon_vyd_plk_txt = "string", ixs_kon_vyp_vyd_txt = "string", ixs_kon_vyp_zal_txt = "string",}
	const enum GAdeRcndzapDtoTypeLengths { ico = 10, ixs_tna = 12, ixs_kon_vyp_zal = 12, ixs_kon_vra_zal = 12, ixs_kon_vyp_vyd = 12, ixs_kon_pri_hot = 12, ixs_kon_vyd_hot = 12, ixs_kon_pri_plk = 12, ixs_kon_vyd_plk = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnrdacDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeRcnrdacDto extends Gordic.Adx.Interface.GXxxrdac {
		/**Ixp_den_txt.*/
		ixp_den_txt?: string|null;
	}
	const enum GAdeRcnrdacDtoNames { ixp_den_txt = "ixp_den_txt", ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su",}
	const enum GAdeRcnrdacDtoFragments { ixp_den_txt = "ixp_den_txt", ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*",}
	const enum GAdeRcnrdacDtoTypes { ixp_den_txt = "string", ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string",}
	const enum GAdeRcnrdacDtoTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnsdenDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeRcnsdenDto extends Gordic.Adx.Interface.GXxxsden {
		/**Subrada duz.*/
		subrada_duz?: number|null;
		/**Uex.*/
		uex?: string|null;
		/**Identifikátor kur.*/
		ixp_kur?: string|null;
		/**Kniha sml.*/
		ixp_den_sml?: string|null;
		/**Identifikátor Typ sml.*/
		ixs_typ_sml?: string|null;
	}
	const enum GAdeRcnsdenDtoNames { subrada_duz = "subrada_duz", uex = "uex", ixp_kur = "ixp_kur", ixp_den_sml = "ixp_den_sml", ixs_typ_sml = "ixs_typ_sml", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdeRcnsdenDtoFragments { subrada_duz = "main", uex = "main", ixp_kur = "main", ixp_den_sml = "main", ixs_typ_sml = "main", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdeRcnsdenDtoTypes { subrada_duz = "number", uex = "string", ixp_kur = "string", ixp_den_sml = "string", ixs_typ_sml = "string", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdeRcnsdenDtoTypeLengths { uex = 16, ixp_kur = 12, ixp_den_sml = 12, ixs_typ_sml = 12, ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnsdvnDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Navýšení náhrad.*/
	interface GAdeRcnsdvnDto {
		/**Dvn.*/
		dvn?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Kód dvn.*/
		kod_dvn?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Dvn_txt.*/
		dvn_txt?: string|null;
	}
	const enum GAdeRcnsdvnDtoNames { dvn = "dvn", rok = "rok", kod_dvn = "kod_dvn", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt",}
	const enum GAdeRcnsdvnDtoFragments { dvn = "main", rok = "main", kod_dvn = "main", nazev = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt",}
	const enum GAdeRcnsdvnDtoTypes { dvn = "number", rok = "number", kod_dvn = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string",}
	const enum GAdeRcnsdvnDtoTypeLengths { kod_dvn = 15, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnskhoDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kategorie hodnocení.*/
	interface GAdeRcnskhoDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Kat hod.*/
		kat_hod?: string|null;
		/**Kat hod txt.*/
		kat_hod_txt?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GAdeRcnskhoDtoNames { ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeRcnskhoDtoFragments { ico = "main", rok = "main", kat_hod = "main", kat_hod_txt = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdeRcnskhoDtoTypes { ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeRcnskhoDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnsmsmDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Mezinárodní smlouvy.*/
	interface GAdeRcnsmsmDto {
		/**Identifikátor msm.*/
		ixs_msm?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Kód ustan.*/
		kod_ustan?: string|null;
		/**Publikace.*/
		publikace?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
	}
	const enum GAdeRcnsmsmDtoNames { ixs_msm = "ixs_msm", stat = "stat", nazev = "nazev", kod_ustan = "kod_ustan", publikace = "publikace", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stat_txt = "stat_txt",}
	const enum GAdeRcnsmsmDtoFragments { ixs_msm = "main", stat = "main", nazev = "main", kod_ustan = "main", publikace = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", stat_txt = "stat_txt",}
	const enum GAdeRcnsmsmDtoTypes { ixs_msm = "string", stat = "number", nazev = "string", kod_ustan = "string", publikace = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stat_txt = "string",}
	const enum GAdeRcnsmsmDtoTypeLengths { ixs_msm = 12, nazev = 254, kod_ustan = 50, publikace = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnssnaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Navýšení náhrad.*/
	interface GAdeRcnssnaDto {
		/**Identifikátor sna.*/
		ixs_sna?: string|null;
		/**Kód sna.*/
		kod_sna?: string|null;
		/**Název sna.*/
		nazev_sna?: string|null;
		/**Identifikátor zpz.*/
		ixs_zpz?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixs_zpz_txt.*/
		ixs_zpz_txt?: string|null;
	}
	const enum GAdeRcnssnaDtoNames { ixs_sna = "ixs_sna", kod_sna = "kod_sna", nazev_sna = "nazev_sna", ixs_zpz = "ixs_zpz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_zpz_txt = "ixs_zpz_txt",}
	const enum GAdeRcnssnaDtoFragments { ixs_sna = "main", kod_sna = "main", nazev_sna = "main", ixs_zpz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_zpz_txt = "ixs_zpz_txt",}
	const enum GAdeRcnssnaDtoTypes { ixs_sna = "string", kod_sna = "string", nazev_sna = "string", ixs_zpz = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_zpz_txt = "string",}
	const enum GAdeRcnssnaDtoTypeLengths { ixs_sna = 12, kod_sna = 16, nazev_sna = 50, ixs_zpz = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnstnaDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Navýšení náhrad.*/
	interface GAdeRcnstnaDto {
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
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Priz nah.*/
		priz_nah?: number|null;
		/**Kód tna.*/
		kod_tna?: string|null;
		/**Identifikátor sna.*/
		ixs_sna?: string|null;
		/**Ixs_sna_txt.*/
		ixs_sna_txt?: string|null;
		/**Ixs_zpz_txt.*/
		ixs_zpz_txt?: string|null;
		/**Ktg_tna_txt.*/
		ktg_tna_txt?: string|null;
	}
	const enum GAdeRcnstnaDtoNames { ixs_tna = "ixs_tna", ktg_tna = "ktg_tna", ixs_zpz = "ixs_zpz", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_nah = "priz_nah", kod_tna = "kod_tna", ixs_sna = "ixs_sna", ixs_sna_txt = "ixs_sna_txt", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdeRcnstnaDtoFragments { ixs_tna = "main", ktg_tna = "main", ixs_zpz = "main", nazev = "main", dat_od = "main", dat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", priz_nah = "main", kod_tna = "main", ixs_sna = "main", ixs_sna_txt = "ixs_sna_txt", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdeRcnstnaDtoTypes { ixs_tna = "string", ktg_tna = "number", ixs_zpz = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_nah = "number", kod_tna = "string", ixs_sna = "string", ixs_sna_txt = "string", ixs_zpz_txt = "string", ktg_tna_txt = "string",}
	const enum GAdeRcnstnaDtoTypeLengths { ixs_tna = 12, ixs_zpz = 12, nazev = 50, zmenu_prov = 12, kod_tna = 16, ixs_sna = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnstorDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Rozlišení typu osoby.*/
	interface GAdeRcnstorDto {
		/**Identifikátor tor.*/
		ixs_tor?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Identifikátor tos.*/
		ixs_tos?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixs_tos_txt.*/
		ixs_tos_txt?: string|null;
	}
	const enum GAdeRcnstorDtoNames { ixs_tor = "ixs_tor", nazev = "nazev", ixs_tos = "ixs_tos", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tos_txt = "ixs_tos_txt",}
	const enum GAdeRcnstorDtoFragments { ixs_tor = "main", nazev = "main", ixs_tos = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tos_txt = "ixs_tos_txt",}
	const enum GAdeRcnstorDtoTypes { ixs_tor = "string", nazev = "string", ixs_tos = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tos_txt = "string",}
	const enum GAdeRcnstorDtoTypeLengths { ixs_tor = 12, nazev = 254, ixs_tos = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnstosDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Typ osoby.*/
	interface GAdeRcnstosDto {
		/**Identifikátor tos.*/
		ixs_tos?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Kód tos.*/
		kod_tos?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Typ dos.*/
		typ_dos?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Typ_dos_txt.*/
		typ_dos_txt?: string|null;
	}
	const enum GAdeRcnstosDtoNames { ixs_tos = "ixs_tos", nazev = "nazev", kod_tos = "kod_tos", poznamka = "poznamka", typ_dos = "typ_dos", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dos_txt = "typ_dos_txt",}
	const enum GAdeRcnstosDtoFragments { ixs_tos = "main", nazev = "main", kod_tos = "main", poznamka = "main", typ_dos = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_dos_txt = "typ_dos_txt",}
	const enum GAdeRcnstosDtoTypes { ixs_tos = "string", nazev = "string", kod_tos = "string", poznamka = "string", typ_dos = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dos_txt = "string",}
	const enum GAdeRcnstosDtoTypeLengths { ixs_tos = 12, nazev = 100, kod_tos = 16, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnstpkDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Typ platební karty.*/
	interface GAdeRcnstpkDto {
		/**Typ plk.*/
		typ_plk?: number|null;
		/**Typ plk txt.*/
		typ_plk_txt?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GAdeRcnstpkDtoNames { typ_plk = "typ_plk", typ_plk_txt = "typ_plk_txt", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeRcnstpkDtoFragments { typ_plk = "main", typ_plk_txt = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdeRcnstpkDtoTypes { typ_plk = "number", typ_plk_txt = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeRcnstpkDtoTypeLengths { typ_plk_txt = 50, popis = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnsurnDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Úroveň návštěvy.*/
	interface GAdeRcnsurnDto {
		/**Urn.*/
		urn?: number|null;
		/**Kód urn.*/
		kod_urn?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Urn_txt.*/
		urn_txt?: string|null;
	}
	const enum GAdeRcnsurnDtoNames { urn = "urn", kod_urn = "kod_urn", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", urn_txt = "urn_txt",}
	const enum GAdeRcnsurnDtoFragments { urn = "main", kod_urn = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", urn_txt = "urn_txt",}
	const enum GAdeRcnsurnDtoTypes { urn = "number", kod_urn = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", urn_txt = "string",}
	const enum GAdeRcnsurnDtoTypeLengths { kod_urn = 100, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnvrfuDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeRcnvrfuDto extends Gordic.Adx.Interface.GXxxvrfu {
		/**Ixs_fun_txt.*/
		ixs_fun_txt?: string|null;
	}
	const enum GAdeRcnvrfuDtoNames { ixs_fun_txt = "ixs_fun_txt", ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeRcnvrfuDtoFragments { ixs_fun_txt = "ixs_fun_txt", ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdeRcnvrfuDtoTypes { ixs_fun_txt = "string", ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeRcnvrfuDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Dto\GAdeRcnvtosDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Vazba typu osoby na typ požadavku.*/
	interface GAdeRcnvtosDto {
		/**Identifikátor tos.*/
		ixs_tos?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ixs_tos_txt.*/
		ixs_tos_txt?: string|null;
		/**Typ_poz_txt.*/
		typ_poz_txt?: string|null;
	}
	const enum GAdeRcnvtosDtoNames { ixs_tos = "ixs_tos", typ_poz = "typ_poz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tos_txt = "ixs_tos_txt", typ_poz_txt = "typ_poz_txt",}
	const enum GAdeRcnvtosDtoFragments { ixs_tos = "main", typ_poz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tos_txt = "ixs_tos_txt", typ_poz_txt = "typ_poz_txt",}
	const enum GAdeRcnvtosDtoTypes { ixs_tos = "string", typ_poz = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tos_txt = "string", typ_poz_txt = "string",}
	const enum GAdeRcnvtosDtoTypeLengths { ixs_tos = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeCenaPalivaRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Cena paliva.
	* @domain GinisAdmin
	* @businessObject AdeCenaPalivaRcn
	*/
	interface AdeCenaPalivaRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeCenaPalivaRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeCenaPalivaRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeCenaPalivaRcn: ServiceBase & Catalog.AdeCenaPalivaRcn;
	}
	const AdeCenaPalivaRcn: Client["AdeCenaPalivaRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeCenaPalivaRcnDto extends Gordic.Ade.Interface.GAdeRcndphmDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeCenaPalivaRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", phm = "phm", rok = "rok", stat = "stat", c_phm = "c_phm", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_txt = "mena_txt", phm_txt = "phm_txt", stat_txt = "stat_txt",}
	const enum GAdeCenaPalivaRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", phm = "main", rok = "main", stat = "main", c_phm = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", mena_txt = "mena_txt", phm_txt = "phm_txt", stat_txt = "stat_txt",}
	const enum GAdeCenaPalivaRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", phm = "number", rok = "number", stat = "number", c_phm = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_txt = "string", phm_txt = "string", stat_txt = "string",}
	const enum GAdeCenaPalivaRcnDtoTypeLengths { zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeCenaPalivaRcnFilterEnum {
		/**Phm.*/
		phm,
		/**Rok.*/
		rok,
		/**Kód státu.*/
		stat,
		/**Částka phm.*/
		c_phm,
		/**Měna.*/
		mena,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeDopravaRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doprava.
	* @domain GinisAdmin
	* @businessObject AdeDopravaRcn
	*/
	interface AdeDopravaRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeDopravaRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeDopravaRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeDopravaRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeDopravaRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeDopravaRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeDopravaRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeDopravaRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeDopravaRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeDopravaRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeDopravaRcn: ServiceBase & Catalog.AdeDopravaRcn;
	}
	const AdeDopravaRcn: Client["AdeDopravaRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeDopravaRcnDto extends Gordic.Ade.Interface.GAdeRcndsadDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeDopravaRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", zp_dopr = "zp_dopr", stat = "stat", dvn = "dvn", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c_zakl = "c_zakl", c_prives = "c_prives", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdeDopravaRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", zp_dopr = "main", stat = "main", dvn = "main", rokmes_od = "main", rokmes_do = "main", c_zakl = "main", c_prives = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_dopr_txt = "zp_dopr_txt",}
	const enum GAdeDopravaRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", zp_dopr = "number", stat = "number", dvn = "number", rokmes_od = "string", rokmes_do = "string", c_zakl = "JsonDecimal", c_prives = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string", mena_txt = "string", stat_txt = "string", zp_dopr_txt = "string",}
	const enum GAdeDopravaRcnDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeDopravaRcnFilterEnum {
		/**Zp dopr.*/
		zp_dopr,
		/**Kód státu.*/
		stat,
		/**Dvn.*/
		dvn,
		/**Rokmes od.*/
		rokmes_od,
		/**Rokmes do.*/
		rokmes_do,
		/**Částka zakl.*/
		c_zakl,
		/**Částka prives.*/
		c_prives,
		/**Měna.*/
		mena,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeFinacniUctarnaRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Finanční účtárna.
	* @domain GinisAdmin
	* @businessObject AdeFinacniUctarnaRcn
	*/
	interface AdeFinacniUctarnaRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeFinacniUctarnaRcn: ServiceBase & Catalog.AdeFinacniUctarnaRcn;
	}
	const AdeFinacniUctarnaRcn: Client["AdeFinacniUctarnaRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeFinacniUctarnaRcnDto extends Gordic.Ade.Interface.GAdeRcndpfuDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeFinacniUctarnaRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", dat_od = "dat_od", dat_do = "dat_do", ixs_tna = "ixs_tna", typ_dos = "typ_dos", typ_pozt = "typ_pozt", upr_br_pok = "upr_br_pok", upr_mr_pok = "upr_mr_pok", upr_br_plk = "upr_br_plk", upr_mr_plk = "upr_mr_plk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", upr_sr_pok = "upr_sr_pok", upr_sr_plk = "upr_sr_plk", upr_br_bu = "upr_br_bu", upr_mr_bu = "upr_mr_bu", upr_sr_bu = "upr_sr_bu", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", upr_br_bu_txt = "upr_br_bu_txt", upr_br_plk_txt = "upr_br_plk_txt", upr_br_pok_txt = "upr_br_pok_txt", upr_mr_bu_txt = "upr_mr_bu_txt", upr_mr_plk_txt = "upr_mr_plk_txt", upr_mr_pok_txt = "upr_mr_pok_txt", upr_sr_bu_txt = "upr_sr_bu_txt", upr_sr_plk_txt = "upr_sr_plk_txt", upr_sr_pok_txt = "upr_sr_pok_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "ixs_zpz",}
	const enum GAdeFinacniUctarnaRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "main", dat_od = "main", dat_do = "main", ixs_tna = "main", typ_dos = "main", typ_pozt = "main", upr_br_pok = "main", upr_mr_pok = "main", upr_br_plk = "main", upr_mr_plk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", upr_sr_pok = "main", upr_sr_plk = "main", upr_br_bu = "main", upr_mr_bu = "main", upr_sr_bu = "main", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", upr_br_bu_txt = "upr_br_bu_txt", upr_br_plk_txt = "upr_br_plk_txt", upr_br_pok_txt = "upr_br_pok_txt", upr_mr_bu_txt = "upr_mr_bu_txt", upr_mr_plk_txt = "upr_mr_plk_txt", upr_mr_pok_txt = "upr_mr_pok_txt", upr_sr_bu_txt = "upr_sr_bu_txt", upr_sr_plk_txt = "upr_sr_plk_txt", upr_sr_pok_txt = "upr_sr_pok_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "main",}
	const enum GAdeFinacniUctarnaRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_tna = "string", typ_dos = "number", typ_pozt = "number", upr_br_pok = "string", upr_mr_pok = "string", upr_br_plk = "string", upr_mr_plk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", upr_sr_pok = "string", upr_sr_plk = "string", upr_br_bu = "string", upr_mr_bu = "string", upr_sr_bu = "string", ixs_tna_txt = "string", typ_dos_txt = "string", upr_br_bu_txt = "string", upr_br_plk_txt = "string", upr_br_pok_txt = "string", upr_mr_bu_txt = "string", upr_mr_plk_txt = "string", upr_mr_pok_txt = "string", upr_sr_bu_txt = "string", upr_sr_plk_txt = "string", upr_sr_pok_txt = "string", typ_pozt_txt = "string", ixs_zpz = "string",}
	const enum GAdeFinacniUctarnaRcnDtoTypeLengths { ico = 10, ixs_tna = 12, upr_br_pok = 15, upr_mr_pok = 15, upr_br_plk = 15, upr_mr_plk = 15, zmenu_prov = 12, upr_sr_pok = 15, upr_sr_plk = 15, upr_br_bu = 15, upr_mr_bu = 15, upr_sr_bu = 15, ixs_zpz = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeFinacniUctarnaRcnFilterEnum {
		/**Ičo.*/
		ico,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Identifikátor tna.*/
		ixs_tna,
		/**Typ dos.*/
		typ_dos,
		/**Typ požadavku.*/
		typ_pozt,
		/**Upr br pok.*/
		upr_br_pok,
		/**Upr mr pok.*/
		upr_mr_pok,
		/**Upr br plk.*/
		upr_br_plk,
		/**Upr mr plk.*/
		upr_mr_plk,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Upr sr pok.*/
		upr_sr_pok,
		/**Upr sr plk.*/
		upr_sr_plk,
		/**Upr br bu.*/
		upr_br_bu,
		/**Upr mr bu.*/
		upr_mr_bu,
		/**Upr sr bu.*/
		upr_sr_bu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeKategorieHodnoceniRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kategorie hodnocení.
	* @domain GinisAdmin
	* @businessObject AdeKategorieHodnoceniRcn
	*/
	interface AdeKategorieHodnoceniRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKategorieHodnoceniRcn: ServiceBase & Catalog.AdeKategorieHodnoceniRcn;
	}
	const AdeKategorieHodnoceniRcn: Client["AdeKategorieHodnoceniRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKategorieHodnoceniRcnDto extends Gordic.Ade.Interface.GAdeRcnskhoDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKategorieHodnoceniRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeKategorieHodnoceniRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "main", rok = "main", kat_hod = "main", kat_hod_txt = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdeKategorieHodnoceniRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeKategorieHodnoceniRcnDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKategorieHodnoceniRcnFilterEnum {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Kat hod.*/
		kat_hod,
		/**Kat hod txt.*/
		kat_hod_txt,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeKnihaRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha RCN.
	* @domain GinisAdmin
	* @businessObject AdeKnihaRcn
	*/
	interface AdeKnihaRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaRcn: ServiceBase & Catalog.AdeKnihaRcn;
	}
	const AdeKnihaRcn: Client["AdeKnihaRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKnihaRcnDto extends Gordic.Ade.Interface.GAdeRcnsdenDto {
		/**Spisový uzel.*/
		ixs_su?: string|null;
		/**Spisový uzel (txt).*/
		ixs_su_txt?: string|null;
		/**Začátek subřady.*/
		ac_cislo_od?: number|null;
		/**Konec subřady.*/
		ac_cislo_do?: number|null;
		/**Poslední použité číslo.*/
		ac_cislo_max?: number|null;
		/**Začátek subřady.*/
		akt_subrady?: number|null;
		/**Začátek subřady (txt).*/
		akt_subrady_txt?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Příznak, zda kniha byla použita.*/
		is_used?: boolean|null;
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaRcnDtoNames { ixs_su = "ixs_su", ixs_su_txt = "ixs_su_txt", ac_cislo_od = "ac_cislo_od", ac_cislo_do = "ac_cislo_do", ac_cislo_max = "ac_cislo_max", akt_subrady = "akt_subrady", akt_subrady_txt = "akt_subrady_txt", zkratka = "zkratka", is_used = "is_used", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", subrada_duz = "subrada_duz", uex = "uex", ixp_kur = "ixp_kur", ixp_den_sml = "ixp_den_sml", ixs_typ_sml = "ixs_typ_sml", ixp_den_sml_txt = "ixp_den_sml_txt", ixp_kur_txt = "ixp_kur_txt", ixs_typ_sml_txt = "ixs_typ_sml_txt", ktg_den_txt = "ktg_den_txt", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdeKnihaRcnDtoFragments { ixs_su = "*", ixs_su_txt = "*", ac_cislo_od = "*", ac_cislo_do = "*", ac_cislo_max = "*", akt_subrady = "*", akt_subrady_txt = "*", zkratka = "*", is_used = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", subrada_duz = "main", uex = "main", ixp_kur = "main", ixp_den_sml = "main", ixs_typ_sml = "main", ixp_den_sml_txt = "ixp_den_sml_txt", ixp_kur_txt = "ixp_kur_txt", ixs_typ_sml_txt = "ixs_typ_sml_txt", ktg_den_txt = "ktg_den_txt", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdeKnihaRcnDtoTypes { ixs_su = "string", ixs_su_txt = "string", ac_cislo_od = "number", ac_cislo_do = "number", ac_cislo_max = "number", akt_subrady = "number", akt_subrady_txt = "string", zkratka = "string", is_used = "boolean", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", subrada_duz = "number", uex = "string", ixp_kur = "string", ixp_den_sml = "string", ixs_typ_sml = "string", ixp_den_sml_txt = "string", ixp_kur_txt = "string", ixs_typ_sml_txt = "string", ktg_den_txt = "string", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdeKnihaRcnDtoTypeLengths { uex = 16, ixp_kur = 12, ixp_den_sml = 12, ixs_typ_sml = 12, ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKnihaRcnFilterEnum {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Lic.*/
		lic,
		/**Aktivita.*/
		aktivita,
		/**Arw.*/
		arw,
		/**Poznámka.*/
		poznamka,
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
		/**Typ den.*/
		typ_den,
		/**Ktg den.*/
		ktg_den,
		/**Por číslo max.*/
		por_cislo_max,
		/**Subrada max.*/
		subrada_max,
		/**Subrada duz.*/
		subrada_duz,
		/**Len ac.*/
		len_ac,
		/**Krok uza.*/
		krok_uza,
		/**Kniha old.*/
		ixp_den_old,
		/**Účtárna.*/
		uus,
		/**Prefix.*/
		prefix,
		/**Suffix.*/
		suffix,
		/**Uex.*/
		uex,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor kur.*/
		ixp_kur,
		/**Kniha sml.*/
		ixp_den_sml,
		/**Identifikátor typ sml.*/
		ixs_typ_sml,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeKnihaRcnCleneni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Definice členění a varianty předkontací na knihu.
	* @domain GinisAdmin
	* @businessObject AdeKnihaRcnCleneni
	*/
	interface AdeKnihaRcnCleneni {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaRcnCleneni: ServiceBase & Catalog.AdeKnihaRcnCleneni;
	}
	const AdeKnihaRcnCleneni: Client["AdeKnihaRcnCleneni"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKnihaRcnCleneniDto extends Gordic.Ade.Interface.GAdeRcndcdeDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaRcnCleneniDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixp_den = "ixp_den", ixs_cle = "ixs_cle", ixs_vpk = "ixs_vpk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdeKnihaRcnCleneniDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixp_den = "main", ixs_cle = "main", ixs_vpk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_den_txt = "ixp_den_txt", ixs_cle_txt = "ixs_cle_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GAdeKnihaRcnCleneniDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixp_den = "string", ixs_cle = "string", ixs_vpk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den_txt = "string", ixs_cle_txt = "string", ixs_vpk_txt = "string",}
	const enum GAdeKnihaRcnCleneniDtoTypeLengths { ixp_den = 12, ixs_cle = 12, ixs_vpk = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKnihaRcnCleneniFilterEnum {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Identifikátor cle.*/
		ixs_cle,
		/**Identifikátor vpk.*/
		ixs_vpk,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeKnihaRcnFunkcniMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Povolené řady pro funkci.
	* @domain GinisAdmin
	* @businessObject AdeKnihaRcnFunkcniMisto
	*/
	interface AdeKnihaRcnFunkcniMisto {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>>;
		/**Metoda pro ověření zda záznamy existují.*/
		testExist(rq?:CallParams<{dtos:Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto[]}>): _Task<{dtos:Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxExistResultDto<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>[]>;
		/**Hromadné uložení dat.*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto[]}>): _Task<{data:Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto>[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaRcnFunkcniMisto: ServiceBase & Catalog.AdeKnihaRcnFunkcniMisto;
	}
	const AdeKnihaRcnFunkcniMisto: Client["AdeKnihaRcnFunkcniMisto"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeKnihaRcnFunkcniMistoDto extends Gordic.Ade.Interface.GAdeRcnvrfuDto {
		/**Textová reprezentace deníku.*/
		ixp_den_txt?: string|null;
		/**Textová reprezentace osoby.*/
		ixs_ref_txt?: string|null;
		/**Rok deníku.*/
		rok?: number|null;
		/**Středisko účtování.*/
		ucs?: string|null;
		/**IČO deníku.*/
		ico?: string|null;
		/**IČO funkčního místa.*/
		ixs_fun_ico?: string|null;
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaRcnFunkcniMistoDtoNames { ixp_den_txt = "ixp_den_txt", ixs_ref_txt = "ixs_ref_txt", rok = "rok", ucs = "ucs", ico = "ico", ixs_fun_ico = "ixs_fun_ico", zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_fun_txt = "ixs_fun_txt", ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeKnihaRcnFunkcniMistoDtoFragments { ixp_den_txt = "*", ixs_ref_txt = "*", rok = "*", ucs = "*", ico = "*", ixs_fun_ico = "*", zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_fun_txt = "ixs_fun_txt", ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdeKnihaRcnFunkcniMistoDtoTypes { ixp_den_txt = "string", ixs_ref_txt = "string", rok = "number", ucs = "string", ico = "string", ixs_fun_ico = "string", zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_fun_txt = "string", ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeKnihaRcnFunkcniMistoDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeKnihaRcnFunkcniMistoFilterEnum {
		/**Aktivita.*/
		aktivita,
		/**PK tabulky - Funkční místo.*/
		ixs_fun,
		/**PK tabulky - Identifikátor knihy.*/
		ixp_den,
		/**PK tabulky - Číslo subřady.*/
		subrada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeKopirovaniCiselnikuMeziRokyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha PCN.
	* @domain GinisAdmin
	* @businessObject AdeRcnKopirovani
	*/
	interface AdeRcnKopirovani {
		/**Překopíruje číselníky navýšení mezi zadanými roky.*/
		navyseni(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky ceny paliva mmezi zadanými roky.*/
		cenyPaliva(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky Definice vazeb na kontace pokladny mezi zadanými roky.*/
		vazbyKontacePok(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky Sazby stravného mezi zadanými roky.*/
		sazbyStravneho(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky Sazby dopravy mezi zadanými roky.*/
		sazbyDopravy(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
		/**Překopíruje číselníky Sazby vyúčtování mezi zadanými roky.*/
		sazbyVyuctovani(rq?:CallParams<{rokOld:number,rokNew:number}>): _Task<{rokOld:number,rokNew:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeRcnKopirovani: ServiceBase & Catalog.AdeRcnKopirovani;
	}
	const AdeRcnKopirovani: Client["AdeRcnKopirovani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeMezinarodniSmlouvyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Mezinárodní smlouvy.
	* @domain GinisAdmin
	* @businessObject AdeMezinarodniSmlouvyRcn
	*/
	interface AdeMezinarodniSmlouvyRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeMezinarodniSmlouvyRcn: ServiceBase & Catalog.AdeMezinarodniSmlouvyRcn;
	}
	const AdeMezinarodniSmlouvyRcn: Client["AdeMezinarodniSmlouvyRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeMezinarodniSmlouvyRcnDto extends Gordic.Ade.Interface.GAdeRcnsmsmDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeMezinarodniSmlouvyRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_msm = "ixs_msm", stat = "stat", nazev = "nazev", kod_ustan = "kod_ustan", publikace = "publikace", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stat_txt = "stat_txt",}
	const enum GAdeMezinarodniSmlouvyRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_msm = "main", stat = "main", nazev = "main", kod_ustan = "main", publikace = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", stat_txt = "stat_txt",}
	const enum GAdeMezinarodniSmlouvyRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_msm = "string", stat = "number", nazev = "string", kod_ustan = "string", publikace = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stat_txt = "string",}
	const enum GAdeMezinarodniSmlouvyRcnDtoTypeLengths { ixs_msm = 12, nazev = 254, kod_ustan = 50, publikace = 50, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeMezinarodniSmlouvyRcnFilterEnum {
		/**Identifikátor msm.*/
		ixs_msm,
		/**Kód státu.*/
		stat,
		/**Název.*/
		nazev,
		/**Kód ustan.*/
		kod_ustan,
		/**Publikace.*/
		publikace,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeNavyseniNahradRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Navýšení náhrad.
	* @domain GinisAdmin
	* @businessObject AdeNavyseniNahradRcn
	*/
	interface AdeNavyseniNahradRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeNavyseniNahradRcn: ServiceBase & Catalog.AdeNavyseniNahradRcn;
	}
	const AdeNavyseniNahradRcn: Client["AdeNavyseniNahradRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeNavyseniNahradRcnDto extends Gordic.Ade.Interface.GAdeRcnsdvnDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeNavyseniNahradRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", dvn = "dvn", rok = "rok", kod_dvn = "kod_dvn", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt",}
	const enum GAdeNavyseniNahradRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", dvn = "main", rok = "main", kod_dvn = "main", nazev = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt",}
	const enum GAdeNavyseniNahradRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", dvn = "number", rok = "number", kod_dvn = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string",}
	const enum GAdeNavyseniNahradRcnDtoTypeLengths { kod_dvn = 15, nazev = 100, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeNavyseniNahradRcnFilterEnum {
		/**Dvn.*/
		dvn,
		/**Rok.*/
		rok,
		/**Kód dvn.*/
		kod_dvn,
		/**Název.*/
		nazev,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdePokladnaPuvodniAlgoritmusRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pokladna původní algoritmus.
	* @domain GinisAdmin
	* @businessObject AdePokladnaPuvodniAlgoritmusRcn
	*/
	interface AdePokladnaPuvodniAlgoritmusRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdePokladnaPuvodniAlgoritmusRcn: ServiceBase & Catalog.AdePokladnaPuvodniAlgoritmusRcn;
	}
	const AdePokladnaPuvodniAlgoritmusRcn: Client["AdePokladnaPuvodniAlgoritmusRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdePokladnaPuvodniAlgoritmusRcnDto extends Gordic.Ade.Interface.GAdeRcndzapDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdePokladnaPuvodniAlgoritmusRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", rok = "rok", ixs_tna = "ixs_tna", typ_dos = "typ_dos", ixs_kon_vyp_zal = "ixs_kon_vyp_zal", ixs_kon_vra_zal = "ixs_kon_vra_zal", ixs_kon_vyp_vyd = "ixs_kon_vyp_vyd", ixs_kon_pri_hot = "ixs_kon_pri_hot", ixs_kon_vyd_hot = "ixs_kon_vyd_hot", ixs_kon_pri_plk = "ixs_kon_pri_plk", ixs_kon_vyd_plk = "ixs_kon_vyd_plk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_pozt = "typ_pozt", ixs_tna_txt = "ixs_tna_txt", ixs_kon_pri_hot_txt = "ixs_kon_pri_hot_txt", ixs_kon_pri_plk_txt = "ixs_kon_pri_plk_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_kon_vra_zal_txt = "ixs_kon_vra_zal_txt", ixs_kon_vyd_hot_txt = "ixs_kon_vyd_hot_txt", ixs_kon_vyd_plk_txt = "ixs_kon_vyd_plk_txt", ixs_kon_vyp_vyd_txt = "ixs_kon_vyp_vyd_txt", ixs_kon_vyp_zal_txt = "ixs_kon_vyp_zal_txt",}
	const enum GAdePokladnaPuvodniAlgoritmusRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "main", rok = "main", ixs_tna = "main", typ_dos = "main", ixs_kon_vyp_zal = "main", ixs_kon_vra_zal = "main", ixs_kon_vyp_vyd = "main", ixs_kon_pri_hot = "main", ixs_kon_vyd_hot = "main", ixs_kon_pri_plk = "main", ixs_kon_vyd_plk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_pozt = "main", ixs_tna_txt = "ixs_tna_txt", ixs_kon_pri_hot_txt = "ixs_kon_pri_hot_txt", ixs_kon_pri_plk_txt = "ixs_kon_pri_plk_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_kon_vra_zal_txt = "ixs_kon_vra_zal_txt", ixs_kon_vyd_hot_txt = "ixs_kon_vyd_hot_txt", ixs_kon_vyd_plk_txt = "ixs_kon_vyd_plk_txt", ixs_kon_vyp_vyd_txt = "ixs_kon_vyp_vyd_txt", ixs_kon_vyp_zal_txt = "ixs_kon_vyp_zal_txt",}
	const enum GAdePokladnaPuvodniAlgoritmusRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", rok = "number", ixs_tna = "string", typ_dos = "number", ixs_kon_vyp_zal = "string", ixs_kon_vra_zal = "string", ixs_kon_vyp_vyd = "string", ixs_kon_pri_hot = "string", ixs_kon_vyd_hot = "string", ixs_kon_pri_plk = "string", ixs_kon_vyd_plk = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_pozt = "number", ixs_tna_txt = "string", ixs_kon_pri_hot_txt = "string", ixs_kon_pri_plk_txt = "string", typ_dos_txt = "string", typ_pozt_txt = "string", ixs_kon_vra_zal_txt = "string", ixs_kon_vyd_hot_txt = "string", ixs_kon_vyd_plk_txt = "string", ixs_kon_vyp_vyd_txt = "string", ixs_kon_vyp_zal_txt = "string",}
	const enum GAdePokladnaPuvodniAlgoritmusRcnDtoTypeLengths { ico = 10, ixs_tna = 12, ixs_kon_vyp_zal = 12, ixs_kon_vra_zal = 12, ixs_kon_vyp_vyd = 12, ixs_kon_pri_hot = 12, ixs_kon_vyd_hot = 12, ixs_kon_pri_plk = 12, ixs_kon_vyd_plk = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdePokladnaPuvodniAlgoritmusRcnFilterEnum {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Identifikátor tna.*/
		ixs_tna,
		/**Typ dos.*/
		typ_dos,
		/**Identifikátor kon vyp zal.*/
		ixs_kon_vyp_zal,
		/**Identifikátor kon vra zal.*/
		ixs_kon_vra_zal,
		/**Identifikátor kon vyp vyd.*/
		ixs_kon_vyp_vyd,
		/**Identifikátor kon pri hot.*/
		ixs_kon_pri_hot,
		/**Identifikátor kon vyd hot.*/
		ixs_kon_vyd_hot,
		/**Identifikátor kon pri plk.*/
		ixs_kon_pri_plk,
		/**Identifikátor kon vyd plk.*/
		ixs_kon_vyd_plk,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Typ požadavku.*/
		typ_pozt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdePokladnaRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pokladna.
	* @domain GinisAdmin
	* @businessObject AdePokladnaRcn
	*/
	interface AdePokladnaRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdePokladnaRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdePokladnaRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdePokladnaRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdePokladnaRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdePokladnaRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdePokladnaRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdePokladnaRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdePokladnaRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdePokladnaRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdePokladnaRcn: ServiceBase & Catalog.AdePokladnaRcn;
	}
	const AdePokladnaRcn: Client["AdePokladnaRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdePokladnaRcnDto extends Gordic.Ade.Interface.GAdeRcndppoDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdePokladnaRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ico = "ico", dat_od = "dat_od", dat_do = "dat_do", ixs_tna = "ixs_tna", typ_dos = "typ_dos", typ_pozt = "typ_pozt", ixs_kon_zal = "ixs_kon_zal", ixs_kon_dhc = "ixs_kon_dhc", ixs_kon_dhm = "ixs_kon_dhm", ixs_kon_vhc = "ixs_kon_vhc", ixs_kon_vhm = "ixs_kon_vhm", ixs_kon_dkc = "ixs_kon_dkc", ixs_kon_dkm = "ixs_kon_dkm", ixs_kon_vkc = "ixs_kon_vkc", ixs_kon_vkm = "ixs_kon_vkm", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_kon_lef = "ixs_kon_lef", ixs_kon_poz_zal = "ixs_kon_poz_zal", ixs_kon_poz_dhc = "ixs_kon_poz_dhc", ixs_kon_poz_dhm = "ixs_kon_poz_dhm", ixs_kon_poz_vhc = "ixs_kon_poz_vhc", ixs_kon_poz_vhm = "ixs_kon_poz_vhm", ixs_kon_poz_dkc = "ixs_kon_poz_dkc", ixs_kon_poz_dkm = "ixs_kon_poz_dkm", ixs_kon_poz_vkc = "ixs_kon_poz_vkc", ixs_kon_poz_vkm = "ixs_kon_poz_vkm", ixs_kon_dhc_txt = "ixs_kon_dhc_txt", ixs_kon_dhm_txt = "ixs_kon_dhm_txt", ixs_kon_dkc_txt = "ixs_kon_dkc_txt", ixs_kon_dkm_txt = "ixs_kon_dkm_txt", ixs_kon_lef_txt = "ixs_kon_lef_txt", ixs_kon_poz_dhc_txt = "ixs_kon_poz_dhc_txt", ixs_kon_poz_dhm_txt = "ixs_kon_poz_dhm_txt", ixs_kon_poz_dkc_txt = "ixs_kon_poz_dkc_txt", ixs_kon_poz_dkm_txt = "ixs_kon_poz_dkm_txt", ixs_kon_poz_vhc_txt = "ixs_kon_poz_vhc_txt", ixs_kon_poz_vhm_txt = "ixs_kon_poz_vhm_txt", ixs_kon_poz_vkc_txt = "ixs_kon_poz_vkc_txt", ixs_kon_poz_vkm_txt = "ixs_kon_poz_vkm_txt", ixs_kon_poz_zal_txt = "ixs_kon_poz_zal_txt", ixs_kon_vhc_txt = "ixs_kon_vhc_txt", ixs_kon_vhm_txt = "ixs_kon_vhm_txt", ixs_kon_vkc_txt = "ixs_kon_vkc_txt", ixs_kon_vkm_txt = "ixs_kon_vkm_txt", ixs_kon_zal_txt = "ixs_kon_zal_txt", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "ixs_zpz",}
	const enum GAdePokladnaRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ico = "main", dat_od = "main", dat_do = "main", ixs_tna = "main", typ_dos = "main", typ_pozt = "main", ixs_kon_zal = "main", ixs_kon_dhc = "main", ixs_kon_dhm = "main", ixs_kon_vhc = "main", ixs_kon_vhm = "main", ixs_kon_dkc = "main", ixs_kon_dkm = "main", ixs_kon_vkc = "main", ixs_kon_vkm = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_kon_lef = "main", ixs_kon_poz_zal = "main", ixs_kon_poz_dhc = "main", ixs_kon_poz_dhm = "main", ixs_kon_poz_vhc = "main", ixs_kon_poz_vhm = "main", ixs_kon_poz_dkc = "main", ixs_kon_poz_dkm = "main", ixs_kon_poz_vkc = "main", ixs_kon_poz_vkm = "main", ixs_kon_dhc_txt = "ixs_kon_dhc_txt", ixs_kon_dhm_txt = "ixs_kon_dhm_txt", ixs_kon_dkc_txt = "ixs_kon_dkc_txt", ixs_kon_dkm_txt = "ixs_kon_dkm_txt", ixs_kon_lef_txt = "ixs_kon_lef_txt", ixs_kon_poz_dhc_txt = "ixs_kon_poz_dhc_txt", ixs_kon_poz_dhm_txt = "ixs_kon_poz_dhm_txt", ixs_kon_poz_dkc_txt = "ixs_kon_poz_dkc_txt", ixs_kon_poz_dkm_txt = "ixs_kon_poz_dkm_txt", ixs_kon_poz_vhc_txt = "ixs_kon_poz_vhc_txt", ixs_kon_poz_vhm_txt = "ixs_kon_poz_vhm_txt", ixs_kon_poz_vkc_txt = "ixs_kon_poz_vkc_txt", ixs_kon_poz_vkm_txt = "ixs_kon_poz_vkm_txt", ixs_kon_poz_zal_txt = "ixs_kon_poz_zal_txt", ixs_kon_vhc_txt = "ixs_kon_vhc_txt", ixs_kon_vhm_txt = "ixs_kon_vhm_txt", ixs_kon_vkc_txt = "ixs_kon_vkc_txt", ixs_kon_vkm_txt = "ixs_kon_vkm_txt", ixs_kon_zal_txt = "ixs_kon_zal_txt", ixs_tna_txt = "ixs_tna_txt", typ_dos_txt = "typ_dos_txt", typ_pozt_txt = "typ_pozt_txt", ixs_zpz = "main",}
	const enum GAdePokladnaRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ico = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_tna = "string", typ_dos = "number", typ_pozt = "number", ixs_kon_zal = "string", ixs_kon_dhc = "string", ixs_kon_dhm = "string", ixs_kon_vhc = "string", ixs_kon_vhm = "string", ixs_kon_dkc = "string", ixs_kon_dkm = "string", ixs_kon_vkc = "string", ixs_kon_vkm = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_kon_lef = "string", ixs_kon_poz_zal = "string", ixs_kon_poz_dhc = "string", ixs_kon_poz_dhm = "string", ixs_kon_poz_vhc = "string", ixs_kon_poz_vhm = "string", ixs_kon_poz_dkc = "string", ixs_kon_poz_dkm = "string", ixs_kon_poz_vkc = "string", ixs_kon_poz_vkm = "string", ixs_kon_dhc_txt = "string", ixs_kon_dhm_txt = "string", ixs_kon_dkc_txt = "string", ixs_kon_dkm_txt = "string", ixs_kon_lef_txt = "string", ixs_kon_poz_dhc_txt = "string", ixs_kon_poz_dhm_txt = "string", ixs_kon_poz_dkc_txt = "string", ixs_kon_poz_dkm_txt = "string", ixs_kon_poz_vhc_txt = "string", ixs_kon_poz_vhm_txt = "string", ixs_kon_poz_vkc_txt = "string", ixs_kon_poz_vkm_txt = "string", ixs_kon_poz_zal_txt = "string", ixs_kon_vhc_txt = "string", ixs_kon_vhm_txt = "string", ixs_kon_vkc_txt = "string", ixs_kon_vkm_txt = "string", ixs_kon_zal_txt = "string", ixs_tna_txt = "string", typ_dos_txt = "string", typ_pozt_txt = "string", ixs_zpz = "string",}
	const enum GAdePokladnaRcnDtoTypeLengths { ico = 10, ixs_tna = 12, ixs_kon_zal = 12, ixs_kon_dhc = 12, ixs_kon_dhm = 12, ixs_kon_vhc = 12, ixs_kon_vhm = 12, ixs_kon_dkc = 12, ixs_kon_dkm = 12, ixs_kon_vkc = 12, ixs_kon_vkm = 12, zmenu_prov = 12, ixs_kon_lef = 12, ixs_kon_poz_zal = 12, ixs_kon_poz_dhc = 12, ixs_kon_poz_dhm = 12, ixs_kon_poz_vhc = 12, ixs_kon_poz_vhm = 12, ixs_kon_poz_dkc = 12, ixs_kon_poz_dkm = 12, ixs_kon_poz_vkc = 12, ixs_kon_poz_vkm = 12, ixs_zpz = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdePokladnaRcnFilterEnum {
		/**Ičo.*/
		ico,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Identifikátor tna.*/
		ixs_tna,
		/**Typ dos.*/
		typ_dos,
		/**Typ požadavku.*/
		typ_pozt,
		/**Identifikátor kon zal.*/
		ixs_kon_zal,
		/**Identifikátor kon dhc.*/
		ixs_kon_dhc,
		/**Identifikátor kon dhm.*/
		ixs_kon_dhm,
		/**Identifikátor kon vhc.*/
		ixs_kon_vhc,
		/**Identifikátor kon vhm.*/
		ixs_kon_vhm,
		/**Identifikátor kon dkc.*/
		ixs_kon_dkc,
		/**Identifikátor kon dkm.*/
		ixs_kon_dkm,
		/**Identifikátor kon vkc.*/
		ixs_kon_vkc,
		/**Identifikátor kon vkm.*/
		ixs_kon_vkm,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor kon lef.*/
		ixs_kon_lef,
		/**Identifikátor kon poz zal.*/
		ixs_kon_poz_zal,
		/**Identifikátor kon poz dhc.*/
		ixs_kon_poz_dhc,
		/**Identifikátor kon poz dhm.*/
		ixs_kon_poz_dhm,
		/**Identifikátor kon poz vhc.*/
		ixs_kon_poz_vhc,
		/**Identifikátor kon poz vhm.*/
		ixs_kon_poz_vhm,
		/**Identifikátor kon poz dkc.*/
		ixs_kon_poz_dkc,
		/**Identifikátor kon poz dkm.*/
		ixs_kon_poz_dkm,
		/**Identifikátor kon poz vkc.*/
		ixs_kon_poz_vkc,
		/**Identifikátor kon poz vkm.*/
		ixs_kon_poz_vkm,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeRozliseniTypuOsobyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozlišení typu osoby.
	* @domain GinisAdmin
	* @businessObject AdeRozliseniTypuOsobyRcn
	*/
	interface AdeRozliseniTypuOsobyRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeRozliseniTypuOsobyRcn: ServiceBase & Catalog.AdeRozliseniTypuOsobyRcn;
	}
	const AdeRozliseniTypuOsobyRcn: Client["AdeRozliseniTypuOsobyRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeRozliseniTypuOsobyRcnDto extends Gordic.Ade.Interface.GAdeRcnstorDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeRozliseniTypuOsobyRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_tor = "ixs_tor", nazev = "nazev", ixs_tos = "ixs_tos", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tos_txt = "ixs_tos_txt",}
	const enum GAdeRozliseniTypuOsobyRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_tor = "main", nazev = "main", ixs_tos = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tos_txt = "ixs_tos_txt",}
	const enum GAdeRozliseniTypuOsobyRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_tor = "string", nazev = "string", ixs_tos = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tos_txt = "string",}
	const enum GAdeRozliseniTypuOsobyRcnDtoTypeLengths { ixs_tor = 12, nazev = 254, ixs_tos = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeRozliseniTypuOsobyRcnFilterEnum {
		/**Identifikátor tor.*/
		ixs_tor,
		/**Název.*/
		nazev,
		/**Identifikátor tos.*/
		ixs_tos,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeSadaNahradRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Sada náhrad.
	* @domain GinisAdmin
	* @businessObject AdeSadaNahradRcn
	*/
	interface AdeSadaNahradRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeSadaNahradRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeSadaNahradRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeSadaNahradRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeSadaNahradRcn: ServiceBase & Catalog.AdeSadaNahradRcn;
	}
	const AdeSadaNahradRcn: Client["AdeSadaNahradRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeSadaNahradRcnDto extends Gordic.Ade.Interface.GAdeRcnssnaDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeSadaNahradRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_sna = "ixs_sna", kod_sna = "kod_sna", nazev_sna = "nazev_sna", ixs_zpz = "ixs_zpz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_zpz_txt = "ixs_zpz_txt",}
	const enum GAdeSadaNahradRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_sna = "main", kod_sna = "main", nazev_sna = "main", ixs_zpz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_zpz_txt = "ixs_zpz_txt",}
	const enum GAdeSadaNahradRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_sna = "string", kod_sna = "string", nazev_sna = "string", ixs_zpz = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_zpz_txt = "string",}
	const enum GAdeSadaNahradRcnDtoTypeLengths { ixs_sna = 12, kod_sna = 16, nazev_sna = 50, ixs_zpz = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeSadaNahradRcnFilterEnum {
		/**Identifikátor sna.*/
		ixs_sna,
		/**Kód sna.*/
		kod_sna,
		/**Název sna.*/
		nazev_sna,
		/**Identifikátor zpz.*/
		ixs_zpz,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeSazbyNavstevRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Sazby návštěv.
	* @domain GinisAdmin
	* @businessObject AdeSazbyNavstevRcn
	*/
	interface AdeSazbyNavstevRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeSazbyNavstevRcn: ServiceBase & Catalog.AdeSazbyNavstevRcn;
	}
	const AdeSazbyNavstevRcn: Client["AdeSazbyNavstevRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeSazbyNavstevRcnDto extends Gordic.Ade.Interface.GAdeRcndsanDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeSazbyNavstevRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_msm = "ixs_msm", urn = "urn", ixs_tna = "ixs_tna", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c = "c", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_msm_txt = "ixs_msm_txt", ixs_tna_txt = "ixs_tna_txt", urn_txt = "urn_txt",}
	const enum GAdeSazbyNavstevRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_msm = "main", urn = "main", ixs_tna = "main", rokmes_od = "main", rokmes_do = "main", c = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_msm_txt = "ixs_msm_txt", ixs_tna_txt = "ixs_tna_txt", urn_txt = "urn_txt",}
	const enum GAdeSazbyNavstevRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_msm = "string", urn = "number", ixs_tna = "string", rokmes_od = "string", rokmes_do = "string", c = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_msm_txt = "string", ixs_tna_txt = "string", urn_txt = "string",}
	const enum GAdeSazbyNavstevRcnDtoTypeLengths { ixs_msm = 12, ixs_tna = 12, rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeSazbyNavstevRcnFilterEnum {
		/**Identifikátor msm.*/
		ixs_msm,
		/**Urn.*/
		urn,
		/**Identifikátor tna.*/
		ixs_tna,
		/**Rokmes od.*/
		rokmes_od,
		/**Rokmes do.*/
		rokmes_do,
		/**Částka.*/
		c,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeStravneRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Stravné.
	* @domain GinisAdmin
	* @businessObject AdeStravneRcn
	*/
	interface AdeStravneRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeStravneRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeStravneRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeStravneRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeStravneRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeStravneRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeStravneRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeStravneRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeStravneRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeStravneRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeStravneRcn: ServiceBase & Catalog.AdeStravneRcn;
	}
	const AdeStravneRcn: Client["AdeStravneRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeStravneRcnDto extends Gordic.Ade.Interface.GAdeRcndsasDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeStravneRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", usek = "usek", stat = "stat", dvn = "dvn", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c_strava = "c_strava", c_kapes = "c_kapes", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_poz = "typ_poz", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", typ_poz_txt = "typ_poz_txt", usek_txt = "usek_txt",}
	const enum GAdeStravneRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", usek = "main", stat = "main", dvn = "main", rokmes_od = "main", rokmes_do = "main", c_strava = "main", c_kapes = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_poz = "main", dvn_txt = "dvn_txt", mena_txt = "mena_txt", stat_txt = "stat_txt", typ_poz_txt = "typ_poz_txt", usek_txt = "usek_txt",}
	const enum GAdeStravneRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", usek = "number", stat = "number", dvn = "number", rokmes_od = "string", rokmes_do = "string", c_strava = "JsonDecimal", c_kapes = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_poz = "number", dvn_txt = "string", mena_txt = "string", stat_txt = "string", typ_poz_txt = "string", usek_txt = "string",}
	const enum GAdeStravneRcnDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeStravneRcnFilterEnum {
		/**Usek.*/
		usek,
		/**Kód státu.*/
		stat,
		/**Dvn.*/
		dvn,
		/**Rokmes od.*/
		rokmes_od,
		/**Rokmes do.*/
		rokmes_do,
		/**Částka strava.*/
		c_strava,
		/**Částka kapes.*/
		c_kapes,
		/**Měna.*/
		mena,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Typ poz.*/
		typ_poz,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeTypNahradyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typy náhrad.
	* @domain GinisAdmin
	* @businessObject AdeTypNahradyRcn
	*/
	interface AdeTypNahradyRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeTypNahradyRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeTypNahradyRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeTypNahradyRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeTypNahradyRcn: ServiceBase & Catalog.AdeTypNahradyRcn;
	}
	const AdeTypNahradyRcn: Client["AdeTypNahradyRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeTypNahradyRcnDto extends Gordic.Ade.Interface.GAdeRcnstnaDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeTypNahradyRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_tna = "ixs_tna", ktg_tna = "ktg_tna", ixs_zpz = "ixs_zpz", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_nah = "priz_nah", kod_tna = "kod_tna", ixs_sna = "ixs_sna", ixs_sna_txt = "ixs_sna_txt", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdeTypNahradyRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_tna = "main", ktg_tna = "main", ixs_zpz = "main", nazev = "main", dat_od = "main", dat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", priz_nah = "main", kod_tna = "main", ixs_sna = "main", ixs_sna_txt = "ixs_sna_txt", ixs_zpz_txt = "ixs_zpz_txt", ktg_tna_txt = "ktg_tna_txt",}
	const enum GAdeTypNahradyRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_tna = "string", ktg_tna = "number", ixs_zpz = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_nah = "number", kod_tna = "string", ixs_sna = "string", ixs_sna_txt = "string", ixs_zpz_txt = "string", ktg_tna_txt = "string",}
	const enum GAdeTypNahradyRcnDtoTypeLengths { ixs_tna = 12, ixs_zpz = 12, nazev = 50, zmenu_prov = 12, kod_tna = 16, ixs_sna = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeTypNahradyRcnFilterEnum {
		/**Identifikátor tna.*/
		ixs_tna,
		/**Ktg tna.*/
		ktg_tna,
		/**Identifikátor zpz.*/
		ixs_zpz,
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
		/**Priz nah.*/
		priz_nah,
		/**Kód tna.*/
		kod_tna,
		/**Identifikátor sna.*/
		ixs_sna,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeTypOsobyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ osoby.
	* @domain GinisAdmin
	* @businessObject AdeTypOsobyRcn
	*/
	interface AdeTypOsobyRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeTypOsobyRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeTypOsobyRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeTypOsobyRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeTypOsobyRcn: ServiceBase & Catalog.AdeTypOsobyRcn;
	}
	const AdeTypOsobyRcn: Client["AdeTypOsobyRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeTypOsobyRcnDto extends Gordic.Ade.Interface.GAdeRcnstosDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeTypOsobyRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_tos = "ixs_tos", nazev = "nazev", kod_tos = "kod_tos", poznamka = "poznamka", typ_dos = "typ_dos", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dos_txt = "typ_dos_txt",}
	const enum GAdeTypOsobyRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_tos = "main", nazev = "main", kod_tos = "main", poznamka = "main", typ_dos = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_dos_txt = "typ_dos_txt",}
	const enum GAdeTypOsobyRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_tos = "string", nazev = "string", kod_tos = "string", poznamka = "string", typ_dos = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dos_txt = "string",}
	const enum GAdeTypOsobyRcnDtoTypeLengths { ixs_tos = 12, nazev = 100, kod_tos = 16, poznamka = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeTypOsobyRcnFilterEnum {
		/**Identifikátor tos.*/
		ixs_tos,
		/**Název.*/
		nazev,
		/**Kód tos.*/
		kod_tos,
		/**Poznámka.*/
		poznamka,
		/**Typ dos.*/
		typ_dos,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeTypOsobyVazbaTypPozRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vazba typu osoby na typ požadavku.
	* @domain GinisAdmin
	* @businessObject AdeTypOsobyVazbaTypPozRcn
	*/
	interface AdeTypOsobyVazbaTypPozRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeTypOsobyVazbaTypPozRcn: ServiceBase & Catalog.AdeTypOsobyVazbaTypPozRcn;
	}
	const AdeTypOsobyVazbaTypPozRcn: Client["AdeTypOsobyVazbaTypPozRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeTypOsobyVazbaTypPozRcnDto extends Gordic.Ade.Interface.GAdeRcnvtosDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeTypOsobyVazbaTypPozRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_tos = "ixs_tos", typ_poz = "typ_poz", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdeTypOsobyVazbaTypPozRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_tos = "main", typ_poz = "main", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdeTypOsobyVazbaTypPozRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_tos = "string", typ_poz = "number", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdeTypOsobyVazbaTypPozRcnDtoTypeLengths { ixs_tos = 12, ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeTypOsobyVazbaTypPozRcnFilterEnum {
		/**Identifikátor tos.*/
		ixs_tos,
		/**Typ poz.*/
		typ_poz,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeTypPlatebniKartyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Typ platební karty.
	* @domain GinisAdmin
	* @businessObject AdeTypPlatebniKartyRcn
	*/
	interface AdeTypPlatebniKartyRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeTypPlatebniKartyRcn: ServiceBase & Catalog.AdeTypPlatebniKartyRcn;
	}
	const AdeTypPlatebniKartyRcn: Client["AdeTypPlatebniKartyRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeTypPlatebniKartyRcnDto extends Gordic.Ade.Interface.GAdeRcnstpkDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeTypPlatebniKartyRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", typ_plk = "typ_plk", typ_plk_txt = "typ_plk_txt", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeTypPlatebniKartyRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", typ_plk = "main", typ_plk_txt = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GAdeTypPlatebniKartyRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", typ_plk = "number", typ_plk_txt = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeTypPlatebniKartyRcnDtoTypeLengths { typ_plk_txt = 50, popis = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeTypPlatebniKartyRcnFilterEnum {
		/**Typ plk.*/
		typ_plk,
		/**Typ plk txt.*/
		typ_plk_txt,
		/**Popis.*/
		popis,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeUbytovaniRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Ubytování.
	* @domain GinisAdmin
	* @businessObject AdeUbytovaniRcn
	*/
	interface AdeUbytovaniRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeUbytovaniRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeUbytovaniRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeUbytovaniRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeUbytovaniRcn: ServiceBase & Catalog.AdeUbytovaniRcn;
	}
	const AdeUbytovaniRcn: Client["AdeUbytovaniRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeUbytovaniRcnDto extends Gordic.Ade.Interface.GAdeRcndsauDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeUbytovaniRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", stat = "stat", dvn = "dvn", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", c_zakl = "c_zakl", mena = "mena", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt", stat_txt = "stat_txt", mena_txt = "mena_txt",}
	const enum GAdeUbytovaniRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", stat = "main", dvn = "main", rokmes_od = "main", rokmes_do = "main", c_zakl = "main", mena = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt", stat_txt = "stat_txt", mena_txt = "mena_txt",}
	const enum GAdeUbytovaniRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", stat = "number", dvn = "number", rokmes_od = "string", rokmes_do = "string", c_zakl = "JsonDecimal", mena = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string", stat_txt = "string", mena_txt = "string",}
	const enum GAdeUbytovaniRcnDtoTypeLengths { rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeUbytovaniRcnFilterEnum {
		/**Kód státu.*/
		stat,
		/**Dvn.*/
		dvn,
		/**Rokmes od.*/
		rokmes_od,
		/**Rokmes do.*/
		rokmes_do,
		/**Částka zakl.*/
		c_zakl,
		/**Měna.*/
		mena,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rcn\Interface\IGAdeUrovenNavstevyRcn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Úroveň návštěvy.
	* @domain GinisAdmin
	* @businessObject AdeUrovenNavstevyRcn
	*/
	interface AdeUrovenNavstevyRcn {
		/**Read.*/
		read(rq?:Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>>;
		/**Založení nebo aktualizace.*/
		upsert(rq?:Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>>;
		/**List.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeUrovenNavstevyRcn: ServiceBase & Catalog.AdeUrovenNavstevyRcn;
	}
	const AdeUrovenNavstevyRcn: Client["AdeUrovenNavstevyRcn"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL k zadání požadavku na READ.*/
	interface GAdeUrovenNavstevyRcnDto extends Gordic.Ade.Interface.GAdeRcnsurnDto {
		/**Textová reprezentace změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**Práva k objektu.*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat.*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeUrovenNavstevyRcnDtoNames { zmenu_prov_txt = "zmenu_prov_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", urn = "urn", kod_urn = "kod_urn", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", urn_txt = "urn_txt",}
	const enum GAdeUrovenNavstevyRcnDtoFragments { zmenu_prov_txt = "*", Permissions = "permissions", AdxInfoDto = "info", urn = "main", kod_urn = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", urn_txt = "urn_txt",}
	const enum GAdeUrovenNavstevyRcnDtoTypes { zmenu_prov_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", urn = "number", kod_urn = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", urn_txt = "string",}
	const enum GAdeUrovenNavstevyRcnDtoTypeLengths { kod_urn = 100, nazev = 254, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu.*/
	const enum GAdeUrovenNavstevyRcnFilterEnum {
		/**Urn.*/
		urn,
		/**Kód urn.*/
		kod_urn,
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

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rza\Dto\GRzacktdDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:rzacktd
	*      Kategorie deníků
	*/
	interface GRzacktdDto {
		/**Typ deníku
		*      Typ deníku
		*/
		ktg_den?: number|null;
		/**Popis typu deníku
		*      Popis typu deníku
		*/
		ktg_den_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů
		*      Sloupec s možným využitím pro uložení číselných řadicích údajů
		*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů
		*      Sloupec s možným využitím pro uložení řetězcových řadicích údajů
		*/
		k_s?: string|null;
	}
	const enum GRzacktdDtoNames { ktg_den = "ktg_den", ktg_den_txt = "ktg_den_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacktdDtoFragments { ktg_den = "*", ktg_den_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacktdDtoTypes { ktg_den = "number", ktg_den_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacktdDtoTypeLengths { ktg_den_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rza\Dto\GRzasdenDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:rzasden
	*      Kniha RZA
	*/
	interface GRzasdenDto extends Gordic.Adx.Interface.GXxxsden {
	}
	const enum GRzasdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GRzasdenDtoFragments { ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GRzasdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GRzasdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rza\Dto\GRzavrfuDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**DBTABLE:rzavrfu
	*      Povolené řady pro funkci
	*/
	interface GRzavrfuDto extends Gordic.Adx.Interface.GXxxvrfu {
	}
	const enum GRzavrfuDtoNames { ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRzavrfuDtoFragments { ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRzavrfuDtoTypes { ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRzavrfuDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rza\Interface\IGAdeKnihaRza.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha RZA - rzasden
	* @businessObject AdeKnihaRza
	*/
	interface AdeKnihaRza {
		/**Read*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaRzaNewDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaRzaNewDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaRzaNewDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaRza: ServiceBase & Catalog.AdeKnihaRza;
	}
	const AdeKnihaRza: Client["AdeKnihaRza"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL pro zadání požadavku na READ - obsahuje pouze PK hodnty - Kniha RZA - rzasden*/
	interface GAdeKnihaRzaNewDto extends Gordic.Ade.Interface.GRzasdenDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Spisový uzel (txt)*/
		ixs_su_txt?: string|null;
		/**Začátek subřady*/
		ac_cislo_od?: number|null;
		/**Konec subřady*/
		ac_cislo_do?: number|null;
		/**Poslední použité číslo*/
		ac_cislo_max?: number|null;
		/**Začátek subřady*/
		akt_subrady?: number|null;
		/**Začátek subřady (txt)*/
		akt_subrady_txt?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Kategorie deníku (txt)*/
		ktg_den_txt?: string|null;
		/**Změnu provedl (txt)*/
		zmenu_prov_txt?: string|null;
		/**Příznak, zda kniha byla použita*/
		is_used?: boolean|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Informace důležité k načtení dat*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaRzaNewDtoNames { ixs_su = "ixs_su", ixs_su_txt = "ixs_su_txt", ac_cislo_od = "ac_cislo_od", ac_cislo_do = "ac_cislo_do", ac_cislo_max = "ac_cislo_max", akt_subrady = "akt_subrady", akt_subrady_txt = "akt_subrady_txt", zkratka = "zkratka", ktg_den_txt = "ktg_den_txt", zmenu_prov_txt = "zmenu_prov_txt", is_used = "is_used", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GAdeKnihaRzaNewDtoFragments { ixs_su = "*", ixs_su_txt = "*", ac_cislo_od = "*", ac_cislo_do = "*", ac_cislo_max = "*", akt_subrady = "*", akt_subrady_txt = "*", zkratka = "*", ktg_den_txt = "*", zmenu_prov_txt = "*", is_used = "*", Permissions = "permissions", AdxInfoDto = "info", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GAdeKnihaRzaNewDtoTypes { ixs_su = "string", ixs_su_txt = "string", ac_cislo_od = "number", ac_cislo_do = "number", ac_cislo_max = "number", akt_subrady = "number", akt_subrady_txt = "string", zkratka = "string", ktg_den_txt = "string", zmenu_prov_txt = "string", is_used = "boolean", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GAdeKnihaRzaNewDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdeKnihaRzaFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Identifikátor knihy*/
		ixp_den,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Rza\Interface\IGAdeKnihaRzaFunkcniMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Povolené řady pro funkci - rzavrfu
	* @domain GinisAdmin
	* @businessObject AdeKnihaRzaFunkcniMisto
	*/
	interface AdeKnihaRzaFunkcniMisto {
		/**Read*/
		read(rq?:Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto|CallParams<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>>): _Task<GServiceReadRequest<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>,GServiceReadResponse<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>>;
		/**Založení nebo aktualizace*/
		upsert(rq?:Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto|CallParams<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>>): _Task<GServiceSaveRequest<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>,GServiceSaveResponse<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>>;
		/**Metoda pro ověření zda záznamy existují*/
		testExist(rq?:CallParams<{dtos:Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto[]}>): _Task<{dtos:Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxExistResultDto<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>[]>;
		/**Hromadné uložení dat*/
		upsertHromadne(rq?:CallParams<{data:Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto[]}>): _Task<{data:Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto[]},Gordic.Adx.Interface.GAdxResultHromadnaOperace<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto>[]>;
		/**ReadListMetadata - na�ten� metadat o LISTu*/
		getDataListDescriptor(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.General.ApplicationInterface.GDataListDescription>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AdeKnihaRzaFunkcniMisto: ServiceBase & Catalog.AdeKnihaRzaFunkcniMisto;
	}
	const AdeKnihaRzaFunkcniMisto: Client["AdeKnihaRzaFunkcniMisto"];
}
declare namespace Gordic.Ade.Interface {
	/**DTO pro ISL pro zadání požadavku na READ - obsahuje pouze PK hodnty - Povolené řady pro funkci - rzavrfu*/
	interface GAdeKnihaRzaFunkcniMistoDto extends Gordic.Ade.Interface.GRzavrfuDto {
		/**Textová reprezentace deníku*/
		ixp_den_txt?: string|null;
		/**Textová reprezentace osoby*/
		ixs_ref_txt?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Středisko účtování*/
		ucs?: string|null;
		/**IČO deníku*/
		ico?: string|null;
		/**IČO funkčního místa*/
		ixs_fun_ico?: string|null;
		/**Textová reprezentace změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Textová reprezentace funkčního místa*/
		ixs_fun_txt?: string|null;
		/**Práva k objektu*/
		Permissions?: Gordic.Adx.Interface.GAdxSubjectPermissions|null;
		/**Metadata k datům detailu objektu
		*     Tím splňuje IAdmSubjectMetaDataIslDto
		*/
		AdxInfoDto?: Gordic.Adx.Interface.GAdxInformationDto|null;
	}
	const enum GAdeKnihaRzaFunkcniMistoDtoNames { ixp_den_txt = "ixp_den_txt", ixs_ref_txt = "ixs_ref_txt", rok = "rok", ucs = "ucs", ico = "ico", ixs_fun_ico = "ixs_fun_ico", zmenu_prov_txt = "zmenu_prov_txt", ixs_fun_txt = "ixs_fun_txt", Permissions = "Permissions", AdxInfoDto = "AdxInfoDto", ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdeKnihaRzaFunkcniMistoDtoFragments { ixp_den_txt = "*", ixs_ref_txt = "*", rok = "*", ucs = "*", ico = "*", ixs_fun_ico = "*", zmenu_prov_txt = "*", ixs_fun_txt = "*", Permissions = "permissions", AdxInfoDto = "info", ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdeKnihaRzaFunkcniMistoDtoTypes { ixp_den_txt = "string", ixs_ref_txt = "string", rok = "number", ucs = "string", ico = "string", ixs_fun_ico = "string", zmenu_prov_txt = "string", ixs_fun_txt = "string", Permissions = "Gordic.Adx.Interface.GAdxSubjectPermissions", AdxInfoDto = "Gordic.Adx.Interface.GAdxInformationDto", ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdeKnihaRzaFunkcniMistoDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
	/**Filtry pro požadavky na budování LISTu*/
	const enum GAdeKnihaRzaFunkcniMistoFilterEnum {
		/**Aktivita*/
		aktivita,
		/**PK tabulky - Funkční místo*/
		ixs_fun,
		/**PK tabulky - Identifikátor knihy*/
		ixp_den,
		/**PK tabulky - Číslo subřady*/
		subrada,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Sml\Dto\GAdeSmlsdenDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeSmlsdenDto {
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Lic.*/
		lic?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Arw.*/
		arw?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
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
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Por číslo max.*/
		por_cislo_max?: number|null;
		/**Subrada max.*/
		subrada_max?: number|null;
		/**Len ac.*/
		len_ac?: number|null;
		/**Krok uza.*/
		krok_uza?: number|null;
		/**Kniha old.*/
		ixp_den_old?: string|null;
		/**Prefix.*/
		prefix?: string|null;
		/**Suffix.*/
		suffix?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Aktivita_txt.*/
		aktivita_txt?: string|null;
		/**Ktg_den_txt.*/
		ktg_den_txt?: string|null;
		/**Typ_den_txt.*/
		typ_den_txt?: string|null;
	}
	const enum GAdeSmlsdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", prefix = "prefix", suffix = "suffix", uus = "uus", aktivita_txt = "aktivita_txt", ktg_den_txt = "ktg_den_txt", typ_den_txt = "typ_den_txt",}
	const enum GAdeSmlsdenDtoFragments { ixp_den = "main", lic = "main", aktivita = "main", arw = "main", poznamka = "main", dat_od = "main", dat_do = "main", ico = "main", ucs = "main", nazev = "main", rok = "main", typ_den = "main", ktg_den = "main", dat_zmena = "main", zmenu_prov = "main", por_cislo_max = "main", subrada_max = "main", len_ac = "main", krok_uza = "main", ixp_den_old = "main", prefix = "main", suffix = "main", uus = "main", aktivita_txt = "aktivita_txt", ktg_den_txt = "ktg_den_txt", typ_den_txt = "typ_den_txt",}
	const enum GAdeSmlsdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", prefix = "string", suffix = "string", uus = "string", aktivita_txt = "string", ktg_den_txt = "string", typ_den_txt = "string",}
	const enum GAdeSmlsdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, prefix = 30, suffix = 30, uus = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Ssl\Dto\GAdeSslstypDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Kniha RCN.*/
	interface GAdeSslstypDto {
		/**Identifikátor Typ.*/
		ixs_typ?: string|null;
		/**Lic.*/
		lic?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Arw.*/
		arw?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Ktg Typ.*/
		ktg_typ?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**St utaj id.*/
		st_utaj_id?: number|null;
		/**Lhuta vyr.*/
		lhuta_vyr?: number|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Identifikátor ulz.*/
		ixs_ulz?: string|null;
		/**Aktivita ssl.*/
		aktivita_ssl?: number|null;
		/**Spis pl.*/
		spis_pl?: string|null;
		/**Spis znak.*/
		spis_znak?: string|null;
		/**Ofic název.*/
		ofic_nazev?: string|null;
		/**S gen cj.*/
		s_gen_cj?: number|null;
		/**Identifikátor esu.*/
		ixs_esu?: string|null;
		/**Identifikátor lpc.*/
		ixs_lpc?: string|null;
		/**Z int.*/
		z_int?: number|null;
		/**Cs název.*/
		cs_nazev?: string|null;
		/**Priz vycet.*/
		priz_vycet?: number|null;
		/**Identifikátor cin.*/
		ixs_cin?: string|null;
		/**Počet dnu vyp dor.*/
		poc_dnu_vyp_dor?: number|null;
		/**Identifikátor Typ opr.*/
		ixs_typ_opr?: string|null;
		/**Priz rsp.*/
		priz_rsp?: number|null;
		/**Identifikátor frm gform.*/
		ixs_frm_gform?: string|null;
		/**Priz epk.*/
		priz_epk?: number|null;
		/**Predpl vec.*/
		predpl_vec?: string|null;
		/**Typ vazby.*/
		typ_vazby?: number|null;
		/**Identifikátor sablony.*/
		ixp_sablony?: string|null;
		/**Identifikátor frm gform spi.*/
		ixs_frm_gform_spi?: string|null;
		/**Priz dupli.*/
		priz_dupli?: number|null;
		/**Over duver.*/
		over_duver?: number|null;
		/**Zakon důvod gdpr.*/
		zakon_duvod_gdpr?: string|null;
		/**S dotaz irp.*/
		s_dotaz_irp?: number|null;
		/**Plan zve.*/
		plan_zve?: number|null;
		/**Priz fyz.*/
		priz_fyz?: number|null;
		/**Identifikátor zap.*/
		ixs_zap?: string|null;
		/**Identifikátor fsk.*/
		ixs_fsk?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Id ext alt.*/
		id_ext_alt?: string|null;
		/**Identifikátor skr.*/
		ixs_skr?: string|null;
		/**Ixs_cin_txt.*/
		ixs_cin_txt?: string|null;
		/**Ixs_fsk_txt.*/
		ixs_fsk_txt?: string|null;
		/**Ixs_skr_txt.*/
		ixs_skr_txt?: string|null;
		/**Ixs_ulz_txt.*/
		ixs_ulz_txt?: string|null;
		/**Ixs_zap_txt.*/
		ixs_zap_txt?: string|null;
		/**Ktg_typ_txt.*/
		ktg_typ_txt?: string|null;
		/**Plan_zve_txt.*/
		plan_zve_txt?: string|null;
		/**Priz_epk_txt.*/
		priz_epk_txt?: string|null;
		/**Priz_rsp_txt.*/
		priz_rsp_txt?: string|null;
		/**Priz_vycet_txt.*/
		priz_vycet_txt?: string|null;
		/**Priz_dupli_txt.*/
		priz_dupli_txt?: string|null;
		/**Priz_fyz_txt.*/
		priz_fyz_txt?: string|null;
		/**St_utaj_id_txt.*/
		st_utaj_id_txt?: string|null;
		/**Typ_vazby_txt.*/
		typ_vazby_txt?: string|null;
	}
	const enum GAdeSslstypDtoNames { ixs_typ = "ixs_typ", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ktg_typ = "ktg_typ", popis = "popis", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", ofic_nazev = "ofic_nazev", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", ixs_lpc = "ixs_lpc", z_int = "z_int", cs_nazev = "cs_nazev", priz_vycet = "priz_vycet", ixs_cin = "ixs_cin", poc_dnu_vyp_dor = "poc_dnu_vyp_dor", ixs_typ_opr = "ixs_typ_opr", priz_rsp = "priz_rsp", ixs_frm_gform = "ixs_frm_gform", priz_epk = "priz_epk", predpl_vec = "predpl_vec", typ_vazby = "typ_vazby", ixp_sablony = "ixp_sablony", ixs_frm_gform_spi = "ixs_frm_gform_spi", priz_dupli = "priz_dupli", over_duver = "over_duver", zakon_duvod_gdpr = "zakon_duvod_gdpr", s_dotaz_irp = "s_dotaz_irp", plan_zve = "plan_zve", priz_fyz = "priz_fyz", ixs_zap = "ixs_zap", ixs_fsk = "ixs_fsk", ico = "ico", id_ext_alt = "id_ext_alt", ixs_skr = "ixs_skr", ixs_cin_txt = "ixs_cin_txt", ixs_fsk_txt = "ixs_fsk_txt", ixs_skr_txt = "ixs_skr_txt", ixs_ulz_txt = "ixs_ulz_txt", ixs_zap_txt = "ixs_zap_txt", ktg_typ_txt = "ktg_typ_txt", plan_zve_txt = "plan_zve_txt", priz_epk_txt = "priz_epk_txt", priz_rsp_txt = "priz_rsp_txt", priz_vycet_txt = "priz_vycet_txt", priz_dupli_txt = "priz_dupli_txt", priz_fyz_txt = "priz_fyz_txt", st_utaj_id_txt = "st_utaj_id_txt", typ_vazby_txt = "typ_vazby_txt",}
	const enum GAdeSslstypDtoFragments { ixs_typ = "main", lic = "main", aktivita = "main", arw = "main", poznamka = "main", dat_od = "main", dat_do = "main", dat_zmena = "main", zmenu_prov = "main", nazev = "main", ktg_typ = "main", popis = "main", st_utaj_id = "main", lhuta_vyr = "main", zkratka = "main", ixs_ulz = "main", aktivita_ssl = "main", spis_pl = "main", spis_znak = "main", ofic_nazev = "main", s_gen_cj = "main", ixs_esu = "main", ixs_lpc = "main", z_int = "main", cs_nazev = "main", priz_vycet = "main", ixs_cin = "main", poc_dnu_vyp_dor = "main", ixs_typ_opr = "main", priz_rsp = "main", ixs_frm_gform = "main", priz_epk = "main", predpl_vec = "main", typ_vazby = "main", ixp_sablony = "main", ixs_frm_gform_spi = "main", priz_dupli = "main", over_duver = "main", zakon_duvod_gdpr = "main", s_dotaz_irp = "main", plan_zve = "main", priz_fyz = "main", ixs_zap = "main", ixs_fsk = "main", ico = "main", id_ext_alt = "main", ixs_skr = "main", ixs_cin_txt = "ixs_cin_txt", ixs_fsk_txt = "ixs_fsk_txt", ixs_skr_txt = "ixs_skr_txt", ixs_ulz_txt = "ixs_ulz_txt", ixs_zap_txt = "ixs_zap_txt", ktg_typ_txt = "ktg_typ_txt", plan_zve_txt = "plan_zve_txt", priz_epk_txt = "priz_epk_txt", priz_rsp_txt = "priz_rsp_txt", priz_vycet_txt = "priz_vycet_txt", priz_dupli_txt = "priz_dupli_txt", priz_fyz_txt = "priz_fyz_txt", st_utaj_id_txt = "st_utaj_id_txt", typ_vazby_txt = "typ_vazby_txt",}
	const enum GAdeSslstypDtoTypes { ixs_typ = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ktg_typ = "number", popis = "string", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", ofic_nazev = "string", s_gen_cj = "number", ixs_esu = "string", ixs_lpc = "string", z_int = "number", cs_nazev = "string", priz_vycet = "number", ixs_cin = "string", poc_dnu_vyp_dor = "number", ixs_typ_opr = "string", priz_rsp = "number", ixs_frm_gform = "string", priz_epk = "number", predpl_vec = "string", typ_vazby = "number", ixp_sablony = "string", ixs_frm_gform_spi = "string", priz_dupli = "number", over_duver = "number", zakon_duvod_gdpr = "string", s_dotaz_irp = "number", plan_zve = "number", priz_fyz = "number", ixs_zap = "string", ixs_fsk = "string", ico = "string", id_ext_alt = "string", ixs_skr = "string", ixs_cin_txt = "string", ixs_fsk_txt = "string", ixs_skr_txt = "string", ixs_ulz_txt = "string", ixs_zap_txt = "string", ktg_typ_txt = "string", plan_zve_txt = "string", priz_epk_txt = "string", priz_rsp_txt = "string", priz_vycet_txt = "string", priz_dupli_txt = "string", priz_fyz_txt = "string", st_utaj_id_txt = "string", typ_vazby_txt = "string",}
	const enum GAdeSslstypDtoTypeLengths { ixs_typ = 12, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ofic_nazev = 254, ixs_esu = 12, ixs_lpc = 12, cs_nazev = 100, ixs_cin = 12, ixs_typ_opr = 12, ixs_frm_gform = 12, predpl_vec = 100, ixp_sablony = 12, ixs_frm_gform_spi = 12, zakon_duvod_gdpr = 1000, ixs_zap = 12, ixs_fsk = 12, ico = 10, id_ext_alt = 200, ixs_skr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ade.Interface\Ade\Uct\Dto\GAdeUctdddeDto.d.ts 

declare namespace Gordic.Ade.Interface {
	/**Datový objekt popisující Deklarace subřad.*/
	interface GAdeUctdddeDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Subrada.*/
		subrada?: number|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Agendové číslo číslo do.*/
		ac_cislo_do?: number|null;
		/**Agendové číslo číslo od.*/
		ac_cislo_od?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Mesic od.*/
		mesic_od?: number|null;
	}
	const enum GAdeUctdddeDtoNames { rok = "rok", ico = "ico", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mesic_od = "mesic_od",}
	const enum GAdeUctdddeDtoFragments { rok = "main", ico = "main", subrada = "main", zkratka = "main", nazev = "main", aktivita = "main", ac_cislo_do = "main", ac_cislo_od = "main", dat_zmena = "main", zmenu_prov = "main", mesic_od = "main",}
	const enum GAdeUctdddeDtoTypes { rok = "number", ico = "string", subrada = "number", zkratka = "string", nazev = "string", aktivita = "number", ac_cislo_do = "number", ac_cislo_od = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mesic_od = "number",}
	const enum GAdeUctdddeDtoTypeLengths { ico = 10, zkratka = 16, nazev = 50, zmenu_prov = 12,}
}

//#endregion

