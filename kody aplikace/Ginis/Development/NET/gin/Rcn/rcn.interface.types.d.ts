/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rcn.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rcn.Interface\Gordic.Rcn.Interface.csproj
*    created     2026-02-16 14:36:08
*    files       Controls\Dto\GPoksdenDto.d.ts
*                Controls\Dto\GPoksosoDto.d.ts
*                Controls\Dto\GRcncadrDto.d.ts
*                Controls\Dto\GRcncdosDto.d.ts
*                Controls\Dto\GRcncdpaDto.d.ts
*                Controls\Dto\GRcncdrhDto.d.ts
*                Controls\Dto\GRcncdviDto.d.ts
*                Controls\Dto\GRcnckavDto.d.ts
*                Controls\Dto\GRcncktgDto.d.ts
*                Controls\Dto\GRcncphmDto.d.ts
*                Controls\Dto\GRcncpidDto.d.ts
*                Controls\Dto\GRcncplkDto.d.ts
*                Controls\Dto\GRcncrcnDto.d.ts
*                Controls\Dto\GRcncretDto.d.ts
*                Controls\Dto\GRcncrsvDto.d.ts
*                Controls\Dto\GRcncspaDto.d.ts
*                Controls\Dto\GRcnctpaDto.d.ts
*                Controls\Dto\GRcnczpkDto.d.ts
*                Controls\Dto\GRcnczuhDto.d.ts
*                Controls\Dto\GRcnczvvDto.d.ts
*                Controls\Dto\GRcnczzpDto.d.ts
*                Controls\Dto\GRcnsdvnDto.d.ts
*                Controls\Dto\GRcnsosrDto.d.ts
*                Controls\Dto\GRcnspasDto.d.ts
*                Controls\Dto\GRcnsplkDto.d.ts
*                Controls\Dto\GRcnsrcnDto.d.ts
*                Controls\Dto\GRcnstorDto.d.ts
*                Controls\Dto\GRcnstosDto.d.ts
*                Controls\Dto\GRcnstpkDto.d.ts
*                Controls\Dto\GRcnsurnDto.d.ts
*                Controls\Dto\GRcnsvknDto.d.ts
*                Dto\GRcnCestaDto.d.ts
*                Dto\GRcnCestaEtapaDto.d.ts
*                Dto\GRcnCestaEtapaKraceniStravnehoDto.d.ts
*                Dto\GRcnCestaEtapaLimitDto.d.ts
*                Dto\GRcnCestaEtapaVydajDto.d.ts
*                Dto\GRcnCestaFinProfilDto.d.ts
*                Dto\GRcnCestaFinProfilPrehledVyuzitiDto.d.ts
*                Dto\GRcnCestaFinProfilStavRppDto.d.ts
*                Dto\GRcnCestaUcastnikDto.d.ts
*                Dto\GRcnCestaVazbySouvisejiciVydajDto.d.ts
*                Dto\GRcnCestovniPojisteniDto.d.ts
*                Dto\GRcnHistorieDto.d.ts
*                Dto\GRcnKategorieHodnoceniDto.d.ts
*                Dto\GRcnKnihaDto.d.ts
*                Dto\GRcnLimPrislibDto.d.ts
*                Dto\GRcnLimPrislibPolDto.d.ts
*                Dto\GRcnMenuDto.d.ts
*                Dto\GRcnMenuRezervaceVozidlaDto.d.ts
*                Dto\GRcnMenuSluzebniVozidloDto.d.ts
*                Dto\GRcnOsobaDto.d.ts
*                Dto\GRcnOsobaRidicDto.d.ts
*                Dto\GRcnPasDto.d.ts
*                Dto\GRcnPlatebniKartaDto.d.ts
*                Dto\GRcnPlatebniKartaVyuzitiDto.d.ts
*                Dto\GRcnPlatebniKartaZadostDto.d.ts
*                Dto\GRcnPodporaDto.d.ts
*                Dto\GRcnPokDokladDto.d.ts
*                Dto\GRcnPoznamkaDto.d.ts
*                Dto\GRcnPreceneniFucDto.d.ts
*                Dto\GRcnPrehledRozpoctuDto.d.ts
*                Dto\GRcnPrikazDoprProstrDto.d.ts
*                Dto\GRcnPrikazDto.d.ts
*                Dto\GRcnPrikazEtapaDto.d.ts
*                Dto\GRcnPrikazEtapaKraceniStravnehoDto.d.ts
*                Dto\GRcnPrikazEtapaLimitDto.d.ts
*                Dto\GRcnPrikazEtapaVydajDto.d.ts
*                Dto\GRcnPrikazLikvidacniZaznamDto.d.ts
*                Dto\GRcnPrikazVybavenostDto.d.ts
*                Dto\GRcnPrikazVydajDto.d.ts
*                Dto\GRcnPrikazVyuctovaniDto.d.ts
*                Dto\GRcnPrikazVyuctovaniSumarDto.d.ts
*                Dto\GRcnPrikazZalohaDto.d.ts
*                Dto\GRcnPrikazZalohaExportDto.d.ts
*                Dto\GRcnPrikazZalohaPlnaMocDto.d.ts
*                Dto\GRcnPrikazZalohaVyuctovaniDto.d.ts
*                Dto\GRcnPrintParamDto.d.ts
*                Dto\GRcnRezervaceVozidlaDto.d.ts
*                Dto\GRcnRezervaceVozidlaUcastnikDto.d.ts
*                Dto\GRcnRozpoctovyZapisDto.d.ts
*                Dto\GRcnSluzebniVozidloDto.d.ts
*                Dto\GRcnSluzebniVozidloPojisteniDto.d.ts
*                Dto\GRcnSluzebniVozidloServisDto.d.ts
*                Dto\GRcnSluzebniVozidloSilnicniDanDto.d.ts
*                Dto\GRcnSouhrnDto.d.ts
*                Dto\GRcnTankovaniPhmDto.d.ts
*                Dto\GRcnTempTabulkaDto.d.ts
*                Dto\GRcnTlacitkaDto.d.ts
*                Dto\GRcnUzaverkaDto.d.ts
*                Dto\GRcnVazbyDto.d.ts
*                Dto\GRcnVizumDto.d.ts
*                Dto\GRcnZmenoveRizeniDto.d.ts
*                Dto\GRcnZmenoveRizeniFinancniProfilDto.d.ts
*                Dto\GRcnZpusobDopravyDto.d.ts
*                Dto\GRcnZpusobUhradyDto.d.ts
*                Dto\GWflProfilDto.d.ts
*                Isl\IGRcnCesta.d.ts
*                Isl\IGRcnCestaEtapa.d.ts
*                Isl\IGRcnCestaEtapaKraceniStravneho.d.ts
*                Isl\IGRcnCestaEtapaLimit.d.ts
*                Isl\IGRcnCestaEtapaVydaj.d.ts
*                Isl\IGRcnCestaFinProfil.d.ts
*                Isl\IGRcnCestaUcastnik.d.ts
*                Isl\IGRcnCestaVazbySouvisejiciVydaj.d.ts
*                Isl\IGRcnCestovniPojisteni.d.ts
*                Isl\IGRcnHistorie.d.ts
*                Isl\IGRcnKategorieHodnoceni.d.ts
*                Isl\IGRcnKniha.d.ts
*                Isl\IGRcnLimPrislib.d.ts
*                Isl\IGRcnOsoba.d.ts
*                Isl\IGRcnOsobaRidic.d.ts
*                Isl\IGRcnPas.d.ts
*                Isl\IGRcnPlatebniKarta.d.ts
*                Isl\IGRcnPlatebniKartaVyuziti.d.ts
*                Isl\IGRcnPlatebniKartaZadost.d.ts
*                Isl\IGRcnPodpora.d.ts
*                Isl\IGRcnPoznamka.d.ts
*                Isl\IGRcnPreceneniFuc.d.ts
*                Isl\IGRcnPrehledRozpoctu.d.ts
*                Isl\IGRcnPrikaz.d.ts
*                Isl\IGRcnPrikazDoprProstr.d.ts
*                Isl\IGRcnPrikazEtapa.d.ts
*                Isl\IGRcnPrikazEtapaKraceniStravneho.d.ts
*                Isl\IGRcnPrikazEtapaLimit.d.ts
*                Isl\IGRcnPrikazEtapaVydaj.d.ts
*                Isl\IGRcnPrikazLikvidacniZaznam.d.ts
*                Isl\IGRcnPrikazVybavenost.d.ts
*                Isl\IGRcnPrikazVydaj.d.ts
*                Isl\IGRcnPrikazVyuctovani.d.ts
*                Isl\IGRcnPrikazVyuctovaniSumar.d.ts
*                Isl\IGRcnPrikazZaloha.d.ts
*                Isl\IGRcnPrikazZalohaExport.d.ts
*                Isl\IGRcnPrikazZalohaPlnaMoc.d.ts
*                Isl\IGRcnPrikazZalohaVyuctovani.d.ts
*                Isl\IGRcnRezervaceVozidla.d.ts
*                Isl\IGRcnRezervaceVozidlaUcastnik.d.ts
*                Isl\IGRcnRozpoctovyZapis.d.ts
*                Isl\IGRcnSluzebniVozidlo.d.ts
*                Isl\IGRcnSluzebniVozidloPojisteni.d.ts
*                Isl\IGRcnSluzebniVozidloServis.d.ts
*                Isl\IGRcnSluzebniVozidloSilnicniDan.d.ts
*                Isl\IGRcnSouhrn.d.ts
*                Isl\IGRcnTankovaniPhm.d.ts
*                Isl\IGRcnTempTabulka.d.ts
*                Isl\IGRcnUzaverka.d.ts
*                Isl\IGRcnVazby.d.ts
*                Isl\IGRcnVizum.d.ts
*                Isl\IGRcnZmenoveRizeni.d.ts
*                Isl\IGRcnZmenoveRizeniFinancniProfil.d.ts
*                Isl\IGRcnZpusobDopravy.d.ts
*                Isl\IGRcnZpusobUhrady.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GPoksdenDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Pokladní kniha.*/
	interface GPoksdenDto {
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
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Por číslo max.*/
		por_cislo_max?: number|null;
		/**Subrada max.*/
		subrada_max?: number|null;
		/**Identifikátor vpk.*/
		ixs_vpk?: string|null;
		/**Subrada duz.*/
		subrada_duz?: number|null;
		/**Kniha buc.*/
		ixp_den_buc?: string|null;
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
		/**Uex.*/
		uex?: string|null;
		/**C pocatek.*/
		c_pocatek?: JsonDecimal|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Měna.*/
		mena?: number|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Ueb.*/
		ueb?: string|null;
		/**Datum uz den.*/
		dat_uz_den?: JsonDate|null;
		/**Datum uz hl.*/
		dat_uz_hl?: JsonDate|null;
		/**Stát.*/
		c_zustatek?: JsonDecimal|null;
		/**C zust den.*/
		c_zust_den?: JsonDecimal|null;
		/**C zust hl.*/
		c_zust_hl?: JsonDecimal|null;
		/**C pri den.*/
		c_pri_den?: JsonDecimal|null;
		/**C pri hl.*/
		c_pri_hl?: JsonDecimal|null;
		/**C vyd den.*/
		c_vyd_den?: JsonDecimal|null;
		/**C vyd hl.*/
		c_vyd_hl?: JsonDecimal|null;
		/**C pocatek m.*/
		c_pocatek_m?: JsonDecimal|null;
		/**Stát.*/
		c_zustatek_m?: JsonDecimal|null;
		/**C zust den m.*/
		c_zust_den_m?: JsonDecimal|null;
		/**C zust hl m.*/
		c_zust_hl_m?: JsonDecimal|null;
		/**C pri den m.*/
		c_pri_den_m?: JsonDecimal|null;
		/**C pri hl m.*/
		c_pri_hl_m?: JsonDecimal|null;
		/**C vyd den m.*/
		c_vyd_den_m?: JsonDecimal|null;
		/**C vyd hl m.*/
		c_vyd_hl_m?: JsonDecimal|null;
		/**Nks implic.*/
		nks_implic?: string|null;
		/**Datum prechod.*/
		dat_prechod?: JsonDate|null;
		/**Aktivita_txt.*/
		aktivita_txt?: string|null;
		/**Ixs_vpk_txt.*/
		ixs_vpk_txt?: string|null;
		/**Ktg_den_txt.*/
		ktg_den_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Typ_den_txt.*/
		typ_den_txt?: string|null;
	}
	const enum GPoksdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", ixs_vpk = "ixs_vpk", subrada_duz = "subrada_duz", ixp_den_buc = "ixp_den_buc", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", c_pocatek = "c_pocatek", zkratka = "zkratka", mena = "mena", kurz = "kurz", ueb = "ueb", dat_uz_den = "dat_uz_den", dat_uz_hl = "dat_uz_hl", c_zustatek = "c_zustatek", c_zust_den = "c_zust_den", c_zust_hl = "c_zust_hl", c_pri_den = "c_pri_den", c_pri_hl = "c_pri_hl", c_vyd_den = "c_vyd_den", c_vyd_hl = "c_vyd_hl", c_pocatek_m = "c_pocatek_m", c_zustatek_m = "c_zustatek_m", c_zust_den_m = "c_zust_den_m", c_zust_hl_m = "c_zust_hl_m", c_pri_den_m = "c_pri_den_m", c_pri_hl_m = "c_pri_hl_m", c_vyd_den_m = "c_vyd_den_m", c_vyd_hl_m = "c_vyd_hl_m", nks_implic = "nks_implic", dat_prechod = "dat_prechod", aktivita_txt = "aktivita_txt", ixs_vpk_txt = "ixs_vpk_txt", ktg_den_txt = "ktg_den_txt", mena_txt = "mena_txt", typ_den_txt = "typ_den_txt",}
	const enum GPoksdenDtoFragments { ixp_den = "main", lic = "main", aktivita = "main", arw = "main", poznamka = "main", dat_od = "main", dat_do = "main", ico = "main", ucs = "main", nazev = "main", rok = "main", typ_den = "main", ktg_den = "main", dat_zmena = "main", zmenu_prov = "main", por_cislo_max = "main", subrada_max = "main", ixs_vpk = "main", subrada_duz = "main", ixp_den_buc = "main", len_ac = "main", krok_uza = "main", ixp_den_old = "main", uus = "main", prefix = "main", suffix = "main", uex = "main", c_pocatek = "main", zkratka = "main", mena = "main", kurz = "main", ueb = "main", dat_uz_den = "main", dat_uz_hl = "main", c_zustatek = "main", c_zust_den = "main", c_zust_hl = "main", c_pri_den = "main", c_pri_hl = "main", c_vyd_den = "main", c_vyd_hl = "main", c_pocatek_m = "main", c_zustatek_m = "main", c_zust_den_m = "main", c_zust_hl_m = "main", c_pri_den_m = "main", c_pri_hl_m = "main", c_vyd_den_m = "main", c_vyd_hl_m = "main", nks_implic = "main", dat_prechod = "main", aktivita_txt = "aktivita_txt", ixs_vpk_txt = "ixs_vpk_txt", ktg_den_txt = "ktg_den_txt", mena_txt = "mena_txt", typ_den_txt = "typ_den_txt",}
	const enum GPoksdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", ixs_vpk = "string", subrada_duz = "number", ixp_den_buc = "string", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", c_pocatek = "JsonDecimal", zkratka = "string", mena = "number", kurz = "JsonDecimal", ueb = "string", dat_uz_den = "JsonDate", dat_uz_hl = "JsonDate", c_zustatek = "JsonDecimal", c_zust_den = "JsonDecimal", c_zust_hl = "JsonDecimal", c_pri_den = "JsonDecimal", c_pri_hl = "JsonDecimal", c_vyd_den = "JsonDecimal", c_vyd_hl = "JsonDecimal", c_pocatek_m = "JsonDecimal", c_zustatek_m = "JsonDecimal", c_zust_den_m = "JsonDecimal", c_zust_hl_m = "JsonDecimal", c_pri_den_m = "JsonDecimal", c_pri_hl_m = "JsonDecimal", c_vyd_den_m = "JsonDecimal", c_vyd_hl_m = "JsonDecimal", nks_implic = "string", dat_prechod = "JsonDate", aktivita_txt = "string", ixs_vpk_txt = "string", ktg_den_txt = "string", mena_txt = "string", typ_den_txt = "string",}
	const enum GPoksdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixs_vpk = 12, ixp_den_buc = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, zkratka = 16, ueb = 4, nks_implic = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GPoksosoDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Pokladník.*/
	interface GPoksosoDto {
		/**Rok.*/
		rok?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Funkce.*/
		ixs_fun?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Faze.*/
		faze?: string|null;
	}
	const enum GPoksosoDtoNames { rok = "rok", aktivita = "aktivita", ixp_den = "ixp_den", ixs_fun = "ixs_fun", nazev = "nazev", faze = "faze",}
	const enum GPoksosoDtoFragments { rok = "main", aktivita = "main", ixp_den = "main", ixs_fun = "main", nazev = "main", faze = "main",}
	const enum GPoksosoDtoTypes { rok = "number", aktivita = "number", ixp_den = "string", ixs_fun = "string", nazev = "string", faze = "string",}
	const enum GPoksosoDtoTypeLengths { ixp_den = 12, ixs_fun = 12, nazev = 200, faze = 8,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncadrDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**DTO pro rcncadr*/
	interface GRcncadrDto {
		/**drh_aus*/
		drh_aus?: number|null;
		/**drh_aus_txt*/
		drh_aus_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
	}
	const enum GRcncadrDtoNames { drh_aus = "drh_aus", drh_aus_txt = "drh_aus_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncadrDtoFragments { drh_aus = "*", drh_aus_txt = "*", k_v = "*", k_s = "*",}
	const enum GRcncadrDtoTypes { drh_aus = "number", drh_aus_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncadrDtoTypeLengths { drh_aus_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncdosDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Vztah osoby k cestě.*/
	interface GRcncdosDto {
		/**Stav dos.*/
		stav_dos?: number|null;
		/**Stav dos txt.*/
		stav_dos_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncdosDtoNames { stav_dos = "stav_dos", stav_dos_txt = "stav_dos_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncdosDtoFragments { stav_dos = "main", stav_dos_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncdosDtoTypes { stav_dos = "number", stav_dos_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncdosDtoTypeLengths { stav_dos_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncdpaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Druh pasu.*/
	interface GRcncdpaDto {
		/**Druh pas.*/
		druh_pas?: number|null;
		/**Druh pas txt.*/
		druh_pas_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncdpaDtoNames { druh_pas = "druh_pas", druh_pas_txt = "druh_pas_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncdpaDtoFragments { druh_pas = "main", druh_pas_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncdpaDtoTypes { druh_pas = "number", druh_pas_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncdpaDtoTypeLengths { druh_pas_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncdrhDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Druh cestovního příkazu.*/
	interface GRcncdrhDto {
		/**Druh rcn.*/
		druh_rcn?: number|null;
		/**Druh rcn txt.*/
		druh_rcn_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncdrhDtoNames { druh_rcn = "druh_rcn", druh_rcn_txt = "druh_rcn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncdrhDtoFragments { druh_rcn = "main", druh_rcn_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncdrhDtoTypes { druh_rcn = "number", druh_rcn_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncdrhDtoTypeLengths { druh_rcn_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncdviDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Druh víza.*/
	interface GRcncdviDto {
		/**Druh viza.*/
		druh_viza?: number|null;
		/**Druh viza txt.*/
		druh_viza_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncdviDtoNames { druh_viza = "druh_viza", druh_viza_txt = "druh_viza_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncdviDtoFragments { druh_viza = "main", druh_viza_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncdviDtoTypes { druh_viza = "number", druh_viza_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncdviDtoTypeLengths { druh_viza_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnckavDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**DTO pro rcnckav*/
	interface GRcnckavDto {
		/**kat_aus*/
		kat_aus?: number|null;
		/**kat_aus_txt*/
		kat_aus_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
	}
	const enum GRcnckavDtoNames { kat_aus = "kat_aus", kat_aus_txt = "kat_aus_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnckavDtoFragments { kat_aus = "*", kat_aus_txt = "*", k_v = "*", k_s = "*",}
	const enum GRcnckavDtoTypes { kat_aus = "number", kat_aus_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnckavDtoTypeLengths { kat_aus_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncktgDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Kategorie akce.*/
	interface GRcncktgDto {
		/**Ktg rcn.*/
		ktg_rcn?: number|null;
		/**Ktg rcn txt.*/
		ktg_rcn_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncktgDtoNames { ktg_rcn = "ktg_rcn", ktg_rcn_txt = "ktg_rcn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncktgDtoFragments { ktg_rcn = "main", ktg_rcn_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncktgDtoTypes { ktg_rcn = "number", ktg_rcn_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncktgDtoTypeLengths { ktg_rcn_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncphmDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Typy PHM.*/
	interface GRcncphmDto {
		/**Phm.*/
		phm?: number|null;
		/**Phm txt.*/
		phm_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncphmDtoNames { phm = "phm", phm_txt = "phm_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncphmDtoFragments { phm = "main", phm_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncphmDtoTypes { phm = "number", phm_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncphmDtoTypeLengths { phm_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncpidDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Stav cestovního příkazu.*/
	interface GRcncpidDto {
		/**Stav prik.*/
		stav_prik?: number|null;
		/**Stav prik txt.*/
		stav_prik_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncpidDtoNames { stav_prik = "stav_prik", stav_prik_txt = "stav_prik_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncpidDtoFragments { stav_prik = "main", stav_prik_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncpidDtoTypes { stav_prik = "number", stav_prik_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncpidDtoTypeLengths { stav_prik_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncplkDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Stav platební karty.*/
	interface GRcncplkDto {
		/**Stav plk.*/
		stav_plk?: number|null;
		/**Stav plk txt.*/
		stav_plk_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncplkDtoNames { stav_plk = "stav_plk", stav_plk_txt = "stav_plk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncplkDtoFragments { stav_plk = "main", stav_plk_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncplkDtoTypes { stav_plk = "number", stav_plk_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncplkDtoTypeLengths { stav_plk_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncrcnDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Stav cesty.*/
	interface GRcncrcnDto {
		/**Stav rcn.*/
		stav_rcn?: number|null;
		/**Stav rcn txt.*/
		stav_rcn_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncrcnDtoNames { stav_rcn = "stav_rcn", stav_rcn_txt = "stav_rcn_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncrcnDtoFragments { stav_rcn = "main", stav_rcn_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncrcnDtoTypes { stav_rcn = "number", stav_rcn_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncrcnDtoTypeLengths { stav_rcn_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncretDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**DTO pro rcncret*/
	interface GRcncretDto {
		/**typ_rsv*/
		typ_rsv?: number|null;
		/**typ_rsv_txt*/
		typ_rsv_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
	}
	const enum GRcncretDtoNames { typ_rsv = "typ_rsv", typ_rsv_txt = "typ_rsv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncretDtoFragments { typ_rsv = "*", typ_rsv_txt = "*", k_v = "*", k_s = "*",}
	const enum GRcncretDtoTypes { typ_rsv = "number", typ_rsv_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncretDtoTypeLengths { typ_rsv_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncrsvDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**DTO pro rcncrsv*/
	interface GRcncrsvDto {
		/**stav_rsv*/
		stav_rsv?: number|null;
		/**stav_rsv_txt*/
		stav_rsv_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
	}
	const enum GRcncrsvDtoNames { stav_rsv = "stav_rsv", stav_rsv_txt = "stav_rsv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncrsvDtoFragments { stav_rsv = "*", stav_rsv_txt = "*", k_v = "*", k_s = "*",}
	const enum GRcncrsvDtoTypes { stav_rsv = "number", stav_rsv_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncrsvDtoTypeLengths { stav_rsv_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcncspaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Stav pasu.*/
	interface GRcncspaDto {
		/**Stav pas.*/
		stav_pas?: number|null;
		/**Stav pas txt.*/
		stav_pas_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcncspaDtoNames { stav_pas = "stav_pas", stav_pas_txt = "stav_pas_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcncspaDtoFragments { stav_pas = "main", stav_pas_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcncspaDtoTypes { stav_pas = "number", stav_pas_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcncspaDtoTypeLengths { stav_pas_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnctpaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Typ pasu.*/
	interface GRcnctpaDto {
		/**Typ pas.*/
		typ_pas?: number|null;
		/**Typ pas txt.*/
		typ_pas_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcnctpaDtoNames { typ_pas = "typ_pas", typ_pas_txt = "typ_pas_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnctpaDtoFragments { typ_pas = "main", typ_pas_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcnctpaDtoTypes { typ_pas = "number", typ_pas_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnctpaDtoTypeLengths { typ_pas_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnczpkDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Způsob vyřízení žádosti o PLK.*/
	interface GRcnczpkDto {
		/**Zp vyriz.*/
		zp_vyriz?: number|null;
		/**Zp vyriz txt.*/
		zp_vyriz_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcnczpkDtoNames { zp_vyriz = "zp_vyriz", zp_vyriz_txt = "zp_vyriz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnczpkDtoFragments { zp_vyriz = "main", zp_vyriz_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcnczpkDtoTypes { zp_vyriz = "number", zp_vyriz_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnczpkDtoTypeLengths { zp_vyriz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnczuhDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Způsoby úhrady výdajů.*/
	interface GRcnczuhDto {
		/**Zp uhr.*/
		zp_uhr?: number|null;
		/**Zp uhr txt.*/
		zp_uhr_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcnczuhDtoNames { zp_uhr = "zp_uhr", zp_uhr_txt = "zp_uhr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnczuhDtoFragments { zp_uhr = "main", zp_uhr_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcnczuhDtoTypes { zp_uhr = "number", zp_uhr_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnczuhDtoTypeLengths { zp_uhr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnczvvDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Způsob vyřízení víza.*/
	interface GRcnczvvDto {
		/**Zp vyriz.*/
		zp_vyriz?: number|null;
		/**Zp vyriz txt.*/
		zp_vyriz_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcnczvvDtoNames { zp_vyriz = "zp_vyriz", zp_vyriz_txt = "zp_vyriz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnczvvDtoFragments { zp_vyriz = "main", zp_vyriz_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcnczvvDtoTypes { zp_vyriz = "number", zp_vyriz_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnczvvDtoTypeLengths { zp_vyriz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnczzpDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Způsob znehodnocení pasu.*/
	interface GRcnczzpDto {
		/**Zp zneh.*/
		zp_zneh?: number|null;
		/**Zp zneh txt.*/
		zp_zneh_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
	}
	const enum GRcnczzpDtoNames { zp_zneh = "zp_zneh", zp_zneh_txt = "zp_zneh_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnczzpDtoFragments { zp_zneh = "main", zp_zneh_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcnczzpDtoTypes { zp_zneh = "number", zp_zneh_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnczzpDtoTypeLengths { zp_zneh_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnsdvnDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Definice navýšení v roce.*/
	interface GRcnsdvnDto {
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
	const enum GRcnsdvnDtoNames { dvn = "dvn", rok = "rok", kod_dvn = "kod_dvn", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dvn_txt = "dvn_txt",}
	const enum GRcnsdvnDtoFragments { dvn = "main", rok = "main", kod_dvn = "main", nazev = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dvn_txt = "dvn_txt",}
	const enum GRcnsdvnDtoTypes { dvn = "number", rok = "number", kod_dvn = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dvn_txt = "string",}
	const enum GRcnsdvnDtoTypeLengths { kod_dvn = 15, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnsosrDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Osoby pro RCN.*/
	interface GRcnsosrDto {
		/**Identifikátor osr.*/
		ixs_osr?: string|null;
		/**Typ osr.*/
		typ_osr?: number|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Tit pred.*/
		tit_pred?: string|null;
		/**Tit za.*/
		tit_za?: string|null;
		/**Hodnost.*/
		hodnost?: string|null;
		/**Os číslo.*/
		os_cislo?: string|null;
		/**Identifikátor esu.*/
		ixs_esu?: string|null;
		/**Referent.*/
		ixs_ref?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Organizační jednotka.*/
		ixs_orj?: string|null;
		/**Adresa.*/
		adresa?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Vkn.*/
		vkn?: string|null;
		/**Typ dos.*/
		typ_dos?: number|null;
		/**Identifikátor tos.*/
		ixs_tos?: string|null;
		/**Stav dos.*/
		stav_dos?: number|null;
		/**Ixs_tos_txt.*/
		ixs_tos_txt?: string|null;
		/**Stav_dos_txt.*/
		stav_dos_txt?: string|null;
		/**Typ_dos_txt.*/
		typ_dos_txt?: string|null;
	}
	const enum GRcnsosrDtoNames { ixs_osr = "ixs_osr", typ_osr = "typ_osr", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", hodnost = "hodnost", os_cislo = "os_cislo", ixs_esu = "ixs_esu", ixs_ref = "ixs_ref", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ico = "ico", ucs = "ucs", uus = "uus", ixs_orj = "ixs_orj", adresa = "adresa", nks = "nks", vkn = "vkn", typ_dos = "typ_dos", ixs_tos = "ixs_tos", stav_dos = "stav_dos", ixs_tos_txt = "ixs_tos_txt", stav_dos_txt = "stav_dos_txt", typ_dos_txt = "typ_dos_txt",}
	const enum GRcnsosrDtoFragments { ixs_osr = "main", typ_osr = "main", jmeno = "main", prijmeni = "main", tit_pred = "main", tit_za = "main", hodnost = "main", os_cislo = "main", ixs_esu = "main", ixs_ref = "main", dat_od = "main", dat_do = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev = "main", ico = "main", ucs = "main", uus = "main", ixs_orj = "main", adresa = "main", nks = "main", vkn = "main", typ_dos = "main", ixs_tos = "main", stav_dos = "main", ixs_tos_txt = "ixs_tos_txt", stav_dos_txt = "stav_dos_txt", typ_dos_txt = "typ_dos_txt",}
	const enum GRcnsosrDtoTypes { ixs_osr = "string", typ_osr = "number", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", hodnost = "string", os_cislo = "string", ixs_esu = "string", ixs_ref = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ico = "string", ucs = "string", uus = "string", ixs_orj = "string", adresa = "string", nks = "string", vkn = "string", typ_dos = "number", ixs_tos = "string", stav_dos = "number", ixs_tos_txt = "string", stav_dos_txt = "string", typ_dos_txt = "string",}
	const enum GRcnsosrDtoTypeLengths { ixs_osr = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, hodnost = 15, os_cislo = 30, ixs_esu = 12, ixs_ref = 12, poznamka = 254, zmenu_prov = 12, nazev = 254, ico = 10, ucs = 10, uus = 10, ixs_orj = 12, adresa = 254, nks = 12, vkn = 20, ixs_tos = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnspasDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Pasy.*/
	interface GRcnspasDto {
		/**Identifikátor pas.*/
		ixp_pas?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Číslo pas.*/
		cislo_pas?: string|null;
		/**Druh pas.*/
		druh_pas?: number|null;
		/**Typ pas.*/
		typ_pas?: number|null;
		/**Stav pas.*/
		stav_pas?: number|null;
		/**Zp zneh.*/
		zp_zneh?: number|null;
		/**Datum platnost.*/
		dat_platnost?: JsonDate|null;
		/**Datum evi od.*/
		dat_evi_od?: JsonDate|null;
		/**Datum evi do.*/
		dat_evi_do?: JsonDate|null;
		/**Datum vyd oso.*/
		dat_vyd_oso?: JsonDate|null;
		/**Kontakt oso.*/
		kontakt_oso?: string|null;
		/**Datum nav oso.*/
		dat_nav_oso?: JsonDate|null;
		/**Datum vra.*/
		dat_vra?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Datum vyd do.*/
		dat_vyd_do?: JsonDate|null;
		/**Identifikátor osr.*/
		ixs_osr?: string|null;
		/**Druh_pas_txt.*/
		druh_pas_txt?: string|null;
		/**Ixp_den_txt.*/
		ixp_den_txt?: string|null;
		/**Stav_pas_txt.*/
		stav_pas_txt?: string|null;
		/**Typ_pas_txt.*/
		typ_pas_txt?: string|null;
		/**Zp_zneh_txt.*/
		zp_zneh_txt?: string|null;
		/**Ixs_osr_txt.*/
		ixs_osr_txt?: string|null;
	}
	const enum GRcnspasDtoNames { ixp_pas = "ixp_pas", ixp_den = "ixp_den", rok = "rok", ac = "ac", evi_cis = "evi_cis", cislo_pas = "cislo_pas", druh_pas = "druh_pas", typ_pas = "typ_pas", stav_pas = "stav_pas", zp_zneh = "zp_zneh", dat_platnost = "dat_platnost", dat_evi_od = "dat_evi_od", dat_evi_do = "dat_evi_do", dat_vyd_oso = "dat_vyd_oso", kontakt_oso = "kontakt_oso", dat_nav_oso = "dat_nav_oso", dat_vra = "dat_vra", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vyd_do = "dat_vyd_do", ixs_osr = "ixs_osr", druh_pas_txt = "druh_pas_txt", ixp_den_txt = "ixp_den_txt", stav_pas_txt = "stav_pas_txt", typ_pas_txt = "typ_pas_txt", zp_zneh_txt = "zp_zneh_txt", ixs_osr_txt = "ixs_osr_txt",}
	const enum GRcnspasDtoFragments { ixp_pas = "main", ixp_den = "main", rok = "main", ac = "main", evi_cis = "main", cislo_pas = "main", druh_pas = "main", typ_pas = "main", stav_pas = "main", zp_zneh = "main", dat_platnost = "main", dat_evi_od = "main", dat_evi_do = "main", dat_vyd_oso = "main", kontakt_oso = "main", dat_nav_oso = "main", dat_vra = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dat_vyd_do = "main", ixs_osr = "main", druh_pas_txt = "druh_pas_txt", ixp_den_txt = "ixp_den_txt", stav_pas_txt = "stav_pas_txt", typ_pas_txt = "typ_pas_txt", zp_zneh_txt = "zp_zneh_txt", ixs_osr_txt = "ixs_osr_txt",}
	const enum GRcnspasDtoTypes { ixp_pas = "string", ixp_den = "string", rok = "number", ac = "string", evi_cis = "string", cislo_pas = "string", druh_pas = "number", typ_pas = "number", stav_pas = "number", zp_zneh = "number", dat_platnost = "JsonDate", dat_evi_od = "JsonDate", dat_evi_do = "JsonDate", dat_vyd_oso = "JsonDate", kontakt_oso = "string", dat_nav_oso = "JsonDate", dat_vra = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vyd_do = "JsonDate", ixs_osr = "string", druh_pas_txt = "string", ixp_den_txt = "string", stav_pas_txt = "string", typ_pas_txt = "string", zp_zneh_txt = "string", ixs_osr_txt = "string",}
	const enum GRcnspasDtoTypeLengths { ixp_pas = 12, ixp_den = 12, ac = 20, evi_cis = 20, cislo_pas = 150, kontakt_oso = 150, poznamka = 254, zmenu_prov = 12, ixs_osr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnsplkDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Platební karty.*/
	interface GRcnsplkDto {
		/**Identifikátor plk.*/
		ixp_plk?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Číslo plk.*/
		cislo_plk?: string|null;
		/**Typ plk.*/
		typ_plk?: number|null;
		/**Stav plk.*/
		stav_plk?: number|null;
		/**Účet.*/
		ucet?: string|null;
		/**Banka.*/
		banka?: string|null;
		/**Datum platnost.*/
		dat_platnost?: JsonDate|null;
		/**C limit atm.*/
		c_limit_atm?: JsonDecimal|null;
		/**C limit cas.*/
		c_limit_cas?: JsonDecimal|null;
		/**C limit agr.*/
		c_limit_agr?: JsonDecimal|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Popis.*/
		popis?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor osr.*/
		ixs_osr?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Identifikátor aus.*/
		ixp_aus?: string|null;
		/**Ixp_aus_txt.*/
		ixp_aus_txt?: string|null;
		/**Stav_plk_txt.*/
		stav_plk_txt?: string|null;
		/**Typ_plk_txt.*/
		typ_plk_txt?: string|null;
	}
	const enum GRcnsplkDtoNames { ixp_plk = "ixp_plk", ixp_den = "ixp_den", rok = "rok", ac = "ac", evi_cis = "evi_cis", cislo_plk = "cislo_plk", typ_plk = "typ_plk", stav_plk = "stav_plk", ucet = "ucet", banka = "banka", dat_platnost = "dat_platnost", c_limit_atm = "c_limit_atm", c_limit_cas = "c_limit_cas", c_limit_agr = "c_limit_agr", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_osr = "ixs_osr", ico = "ico", ucs = "ucs", uus = "uus", ixp_aus = "ixp_aus", ixp_aus_txt = "ixp_aus_txt", stav_plk_txt = "stav_plk_txt", typ_plk_txt = "typ_plk_txt",}
	const enum GRcnsplkDtoFragments { ixp_plk = "main", ixp_den = "main", rok = "main", ac = "main", evi_cis = "main", cislo_plk = "main", typ_plk = "main", stav_plk = "main", ucet = "main", banka = "main", dat_platnost = "main", c_limit_atm = "main", c_limit_cas = "main", c_limit_agr = "main", dat_od = "main", dat_do = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_osr = "main", ico = "main", ucs = "main", uus = "main", ixp_aus = "main", ixp_aus_txt = "ixp_aus_txt", stav_plk_txt = "stav_plk_txt", typ_plk_txt = "typ_plk_txt",}
	const enum GRcnsplkDtoTypes { ixp_plk = "string", ixp_den = "string", rok = "number", ac = "string", evi_cis = "string", cislo_plk = "string", typ_plk = "number", stav_plk = "number", ucet = "string", banka = "string", dat_platnost = "JsonDate", c_limit_atm = "JsonDecimal", c_limit_cas = "JsonDecimal", c_limit_agr = "JsonDecimal", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_osr = "string", ico = "string", ucs = "string", uus = "string", ixp_aus = "string", ixp_aus_txt = "string", stav_plk_txt = "string", typ_plk_txt = "string",}
	const enum GRcnsplkDtoTypeLengths { ixp_plk = 12, ixp_den = 12, ac = 20, evi_cis = 20, cislo_plk = 30, ucet = 100, banka = 254, popis = 254, zmenu_prov = 12, ixs_osr = 12, ico = 10, ucs = 10, uus = 10, ixp_aus = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnsrcnDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Cesty.*/
	interface GRcnsrcnDto {
		/**Identifikátor rcn.*/
		ixs_rcn?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Identifikátor pcn.*/
		ixp_pcn?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Uex akt.*/
		uex_akt?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Stav rcn.*/
		stav_rcn?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Rozkaz.*/
		rozkaz?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Místo.*/
		misto?: string|null;
		/**Ucel.*/
		ucel?: string|null;
		/**Zkr dopr.*/
		zkr_dopr?: string|null;
		/**Místo n.*/
		misto_n?: string|null;
		/**Datum n.*/
		dat_n?: JsonDate|null;
		/**Místo u.*/
		misto_u?: string|null;
		/**Datum u.*/
		dat_u?: JsonDate|null;
		/**Místo hra1.*/
		misto_hra1?: string|null;
		/**Datum hra1.*/
		dat_hra1?: JsonDate|null;
		/**Místo hra2.*/
		misto_hra2?: string|null;
		/**Datum hra2.*/
		dat_hra2?: JsonDate|null;
		/**Podm uskut.*/
		podm_uskut?: string|null;
		/**Podm vypoc.*/
		podm_vypoc?: string|null;
		/**Ičo fin.*/
		ico_fin?: string|null;
		/**Nks fin.*/
		nks_fin?: string|null;
		/**Ičo sdr.*/
		ico_sdr?: string|null;
		/**Nks sdr.*/
		nks_sdr?: string|null;
		/**Ičo real.*/
		ico_real?: string|null;
		/**Nks real.*/
		nks_real?: string|null;
		/**Funkce real.*/
		ixs_fun_real?: string|null;
		/**Funkce zad.*/
		ixs_fun_zad?: string|null;
		/**Funkce akt.*/
		ixs_fun_akt?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor kur.*/
		ixp_kur?: string|null;
		/**Funkce komp.*/
		ixs_fun_komp?: string|null;
		/**Identifikátor sml.*/
		ixp_sml?: string|null;
		/**Ktg rcn.*/
		ktg_rcn?: number|null;
		/**Urn.*/
		urn?: number|null;
		/**Identifikátor zmp zad.*/
		ixs_zmp_zad?: string|null;
		/**Te1 p.*/
		te1_p?: string|null;
		/**Rok cia.*/
		rok_cia?: number|null;
		/**Ičo cia.*/
		ico_cia?: string|null;
		/**Číslo cia.*/
		cislo_cia?: string|null;
		/**Identifikátor cia.*/
		ixs_cia?: string|null;
		/**Typ zmr.*/
		typ_zmr?: number|null;
		/**Identifikátor zmr.*/
		ixp_zmr?: string|null;
		/**Identifikátor cle.*/
		ixs_cle?: string|null;
		/**Typ poz.*/
		typ_poz?: number|null;
		/**Hodnota te1.*/
		hodnota_te1?: string|null;
		/**Osob zahranici.*/
		osob_zahranici?: number|null;
		/**Osob doprovod.*/
		osob_doprovod?: number|null;
		/**Priz view.*/
		priz_view?: number|null;
		/**Ixp_kur_txt.*/
		ixp_kur_txt?: string|null;
		/**Ixp_sml_txt.*/
		ixp_sml_txt?: string|null;
		/**Ixp_zmr_txt.*/
		ixp_zmr_txt?: string|null;
		/**Ixs_cle_txt.*/
		ixs_cle_txt?: string|null;
		/**Ixs_fun_komp_txt.*/
		ixs_fun_komp_txt?: string|null;
		/**Ktg_rcn_txt.*/
		ktg_rcn_txt?: string|null;
		/**Stat_txt.*/
		stat_txt?: string|null;
		/**Stav_rcn_txt.*/
		stav_rcn_txt?: string|null;
		/**Typ_poz_txt.*/
		typ_poz_txt?: string|null;
		/**Typ_zmr_txt.*/
		typ_zmr_txt?: string|null;
		/**Urn_txt.*/
		urn_txt?: string|null;
		/**Ixs_zmp_zad_txt.*/
		ixs_zmp_zad_txt?: string|null;
	}
	const enum GRcnsrcnDtoNames { ixs_rcn = "ixs_rcn", ixp_den = "ixp_den", ixp_pcn = "ixp_pcn", rok = "rok", uex_akt = "uex_akt", ac = "ac", evi_cis = "evi_cis", stav_rcn = "stav_rcn", nazev = "nazev", rozkaz = "rozkaz", stat = "stat", misto = "misto", ucel = "ucel", zkr_dopr = "zkr_dopr", misto_n = "misto_n", dat_n = "dat_n", misto_u = "misto_u", dat_u = "dat_u", misto_hra1 = "misto_hra1", dat_hra1 = "dat_hra1", misto_hra2 = "misto_hra2", dat_hra2 = "dat_hra2", podm_uskut = "podm_uskut", podm_vypoc = "podm_vypoc", ico_fin = "ico_fin", nks_fin = "nks_fin", ico_sdr = "ico_sdr", nks_sdr = "nks_sdr", ico_real = "ico_real", nks_real = "nks_real", ixs_fun_real = "ixs_fun_real", ixs_fun_zad = "ixs_fun_zad", ixs_fun_akt = "ixs_fun_akt", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_kur = "ixp_kur", ixs_fun_komp = "ixs_fun_komp", ixp_sml = "ixp_sml", ktg_rcn = "ktg_rcn", urn = "urn", ixs_zmp_zad = "ixs_zmp_zad", te1_p = "te1_p", rok_cia = "rok_cia", ico_cia = "ico_cia", cislo_cia = "cislo_cia", ixs_cia = "ixs_cia", typ_zmr = "typ_zmr", ixp_zmr = "ixp_zmr", ixs_cle = "ixs_cle", typ_poz = "typ_poz", hodnota_te1 = "hodnota_te1", osob_zahranici = "osob_zahranici", osob_doprovod = "osob_doprovod", priz_view = "priz_view", ixp_kur_txt = "ixp_kur_txt", ixp_sml_txt = "ixp_sml_txt", ixp_zmr_txt = "ixp_zmr_txt", ixs_cle_txt = "ixs_cle_txt", ixs_fun_komp_txt = "ixs_fun_komp_txt", ktg_rcn_txt = "ktg_rcn_txt", stat_txt = "stat_txt", stav_rcn_txt = "stav_rcn_txt", typ_poz_txt = "typ_poz_txt", typ_zmr_txt = "typ_zmr_txt", urn_txt = "urn_txt", ixs_zmp_zad_txt = "ixs_zmp_zad_txt",}
	const enum GRcnsrcnDtoFragments { ixs_rcn = "main", ixp_den = "main", ixp_pcn = "main", rok = "main", uex_akt = "main", ac = "main", evi_cis = "main", stav_rcn = "main", nazev = "main", rozkaz = "main", stat = "main", misto = "main", ucel = "main", zkr_dopr = "main", misto_n = "main", dat_n = "main", misto_u = "main", dat_u = "main", misto_hra1 = "main", dat_hra1 = "main", misto_hra2 = "main", dat_hra2 = "main", podm_uskut = "main", podm_vypoc = "main", ico_fin = "main", nks_fin = "main", ico_sdr = "main", nks_sdr = "main", ico_real = "main", nks_real = "main", ixs_fun_real = "main", ixs_fun_zad = "main", ixs_fun_akt = "main", ico = "main", ucs = "main", uus = "main", nks = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_kur = "main", ixs_fun_komp = "main", ixp_sml = "main", ktg_rcn = "main", urn = "main", ixs_zmp_zad = "main", te1_p = "main", rok_cia = "main", ico_cia = "main", cislo_cia = "main", ixs_cia = "main", typ_zmr = "main", ixp_zmr = "main", ixs_cle = "main", typ_poz = "main", hodnota_te1 = "main", osob_zahranici = "main", osob_doprovod = "main", priz_view = "main", ixp_kur_txt = "ixp_kur_txt", ixp_sml_txt = "ixp_sml_txt", ixp_zmr_txt = "ixp_zmr_txt", ixs_cle_txt = "ixs_cle_txt", ixs_fun_komp_txt = "ixs_fun_komp_txt", ktg_rcn_txt = "ktg_rcn_txt", stat_txt = "stat_txt", stav_rcn_txt = "stav_rcn_txt", typ_poz_txt = "typ_poz_txt", typ_zmr_txt = "typ_zmr_txt", urn_txt = "urn_txt", ixs_zmp_zad_txt = "ixs_zmp_zad_txt",}
	const enum GRcnsrcnDtoTypes { ixs_rcn = "string", ixp_den = "string", ixp_pcn = "string", rok = "number", uex_akt = "string", ac = "string", evi_cis = "string", stav_rcn = "number", nazev = "string", rozkaz = "string", stat = "number", misto = "string", ucel = "string", zkr_dopr = "string", misto_n = "string", dat_n = "JsonDate", misto_u = "string", dat_u = "JsonDate", misto_hra1 = "string", dat_hra1 = "JsonDate", misto_hra2 = "string", dat_hra2 = "JsonDate", podm_uskut = "string", podm_vypoc = "string", ico_fin = "string", nks_fin = "string", ico_sdr = "string", nks_sdr = "string", ico_real = "string", nks_real = "string", ixs_fun_real = "string", ixs_fun_zad = "string", ixs_fun_akt = "string", ico = "string", ucs = "string", uus = "string", nks = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_kur = "string", ixs_fun_komp = "string", ixp_sml = "string", ktg_rcn = "number", urn = "number", ixs_zmp_zad = "string", te1_p = "string", rok_cia = "number", ico_cia = "string", cislo_cia = "string", ixs_cia = "string", typ_zmr = "number", ixp_zmr = "string", ixs_cle = "string", typ_poz = "number", hodnota_te1 = "string", osob_zahranici = "number", osob_doprovod = "number", priz_view = "number", ixp_kur_txt = "string", ixp_sml_txt = "string", ixp_zmr_txt = "string", ixs_cle_txt = "string", ixs_fun_komp_txt = "string", ktg_rcn_txt = "string", stat_txt = "string", stav_rcn_txt = "string", typ_poz_txt = "string", typ_zmr_txt = "string", urn_txt = "string", ixs_zmp_zad_txt = "string",}
	const enum GRcnsrcnDtoTypeLengths { ixs_rcn = 12, ixp_den = 12, ixp_pcn = 12, uex_akt = 16, ac = 20, evi_cis = 20, nazev = 254, rozkaz = 50, misto = 255, ucel = 100, zkr_dopr = 30, misto_n = 50, misto_u = 50, misto_hra1 = 50, misto_hra2 = 50, podm_uskut = 254, podm_vypoc = 254, ico_fin = 10, nks_fin = 12, ico_sdr = 10, nks_sdr = 12, ico_real = 10, nks_real = 12, ixs_fun_real = 12, ixs_fun_zad = 12, ixs_fun_akt = 12, ico = 10, ucs = 10, uus = 10, nks = 12, zmenu_prov = 12, ixp_kur = 12, ixs_fun_komp = 12, ixp_sml = 12, ixs_zmp_zad = 12, te1_p = 16, ico_cia = 10, cislo_cia = 16, ixs_cia = 12, ixp_zmr = 12, ixs_cle = 12, hodnota_te1 = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnstorDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující pro rozlišení typu osoby.*/
	interface GRcnstorDto {
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
	const enum GRcnstorDtoNames { ixs_tor = "ixs_tor", nazev = "nazev", ixs_tos = "ixs_tos", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tos_txt = "ixs_tos_txt",}
	const enum GRcnstorDtoFragments { ixs_tor = "main", nazev = "main", ixs_tos = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tos_txt = "ixs_tos_txt",}
	const enum GRcnstorDtoTypes { ixs_tor = "string", nazev = "string", ixs_tos = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tos_txt = "string",}
	const enum GRcnstorDtoTypeLengths { ixs_tor = 12, nazev = 254, ixs_tos = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnstosDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Uživatelsky definovaný typ osoby.*/
	interface GRcnstosDto {
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
		/**Typ_poz.*/
		typ_poz?: number|null;
	}
	const enum GRcnstosDtoNames { ixs_tos = "ixs_tos", nazev = "nazev", kod_tos = "kod_tos", poznamka = "poznamka", typ_dos = "typ_dos", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dos_txt = "typ_dos_txt", typ_poz = "typ_poz",}
	const enum GRcnstosDtoFragments { ixs_tos = "main", nazev = "main", kod_tos = "main", poznamka = "main", typ_dos = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_dos_txt = "typ_dos_txt", typ_poz = "main",}
	const enum GRcnstosDtoTypes { ixs_tos = "string", nazev = "string", kod_tos = "string", poznamka = "string", typ_dos = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dos_txt = "string", typ_poz = "number",}
	const enum GRcnstosDtoTypeLengths { ixs_tos = 12, nazev = 100, kod_tos = 16, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnstpkDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Typy platebních karet.*/
	interface GRcnstpkDto {
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
	const enum GRcnstpkDtoNames { typ_plk = "typ_plk", typ_plk_txt = "typ_plk_txt", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRcnstpkDtoFragments { typ_plk = "main", typ_plk_txt = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GRcnstpkDtoTypes { typ_plk = "number", typ_plk_txt = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRcnstpkDtoTypeLengths { typ_plk_txt = 50, popis = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnsurnDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Definice úrovně návštěvy.*/
	interface GRcnsurnDto {
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
	const enum GRcnsurnDtoNames { urn = "urn", kod_urn = "kod_urn", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", urn_txt = "urn_txt",}
	const enum GRcnsurnDtoFragments { urn = "main", kod_urn = "main", nazev = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", urn_txt = "urn_txt",}
	const enum GRcnsurnDtoTypes { urn = "number", kod_urn = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", urn_txt = "string",}
	const enum GRcnsurnDtoTypeLengths { kod_urn = 100, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Controls\Dto\GRcnsvknDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Výkon.*/
	interface GRcnsvknDto {
		/**Code.*/
		code?: string|null;
		/**Name.*/
		name?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nks.*/
		nks?: string|null;
		/**Pid rozpočtu.*/
		ixs_roz?: string|null;
	}
	const enum GRcnsvknDtoNames { code = "code", name = "name", ico = "ico", nks = "nks", ixs_roz = "ixs_roz",}
	const enum GRcnsvknDtoFragments { code = "main", name = "main", ico = "main", nks = "main", ixs_roz = "main",}
	const enum GRcnsvknDtoTypes { code = "string", name = "string", ico = "string", nks = "string", ixs_roz = "string",}
	const enum GRcnsvknDtoTypeLengths { code = 50, name = 250, ico = 10, nks = 20, ixs_roz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující služební cestu nebo návštěvu.*/
	interface GRcnCestaDto {
		/**Identifikátor cesty. Primární klíč.*/
		ixs_rcn?: string|null;
		/**Identifikátor knihy realizace cest, ve které je cesta evidována.*/
		ixp_den?: string|null;
		/**Identifikátor plánu cesty.*/
		ixp_pcn?: string|null;
		/**Rok uskutečnění cesty.*/
		rok?: number|null;
		/**Třídění.*/
		uex_akt?: string|null;
		/**Agendové číslo cesty.*/
		ac?: string|null;
		/**Evidenční číslo cesty.*/
		evi_cis?: string|null;
		/**Stav cesty (vazba na číselník).*/
		stav_rcn?: number|null;
		/**Název cesty.*/
		nazev?: string|null;
		/**Textový popis nařízení nebo rozkazu k cestě, popřípadě uvedení čísla rozkazu (podobné jako ČJ).*/
		rozkaz?: string|null;
		/**Kód státu, kam se uskuteční cesta.*/
		stat?: number|null;
		/**Místo, které je cílem cesty.*/
		misto?: string|null;
		/**Účel cesty.*/
		ucel?: string|null;
		/**Zkratka dopravních prostředků použitých na cestě (např. R,AUS, apod.).*/
		zkr_dopr?: string|null;
		/**Místo nástupu cesty.*/
		misto_n?: string|null;
		/**Datum nástupu cesty.*/
		dat_n?: JsonDate|null;
		/**Místo ukončení cesty.*/
		misto_u?: string|null;
		/**Datum ukončení cesty.*/
		dat_u?: JsonDate|null;
		/**Místo hranice 1.*/
		misto_hra1?: string|null;
		/**Datum hranice 1.*/
		dat_hra1?: JsonDate|null;
		/**Místo hranice 2.*/
		misto_hra2?: string|null;
		/**Datum hranice 2.*/
		dat_hra2?: JsonDate|null;
		/**Podmínky uskutečnění cesty.*/
		podm_uskut?: string|null;
		/**Podmínky výpočtu.*/
		podm_vypoc?: string|null;
		/**Ičo - identifikátor financující organizace.*/
		ico_fin?: string|null;
		/**Nákladové středisko financujícího útvaru.*/
		nks_fin?: string|null;
		/**Ičo správce dílčího rozpočtu.*/
		ico_sdr?: string|null;
		/**Nákladové středisko správce dílčího rozpočtu.*/
		nks_sdr?: string|null;
		/**Ičo realizátora cesty.*/
		ico_real?: string|null;
		/**Nákladové středisko realizátora cesty.*/
		nks_real?: string|null;
		/**Identifikátor funkce realizátora cesty.*/
		ixs_fun_real?: string|null;
		/**Identifikátor funkce zadavatele cesty.*/
		ixs_fun_zad?: string|null;
		/**Identifikátor funkce vlastníka cesty.*/
		ixs_fun_akt?: string|null;
		/**Ičo organizace.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor kurzovního lístku.*/
		ixp_kur?: string|null;
		/**Identifikátor funkce kompetenta.*/
		ixs_fun_komp?: string|null;
		/**Identifikátor smlouvy.*/
		ixp_sml?: string|null;
		/**Kód kategorie cesty (vazba na číselník).*/
		ktg_rcn?: number|null;
		/**Kód úrovně návštěvy (vazba na číselník).*/
		urn?: number|null;
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad?: string|null;
		/**Org - atribut rozpočtové věty.*/
		te1_p?: string|null;
		/**Rok číselníku akcí.*/
		rok_cia?: number|null;
		/**Ičo číselníku akcí.*/
		ico_cia?: string|null;
		/**Číslo číselníku akcí.*/
		cislo_cia?: string|null;
		/**Identifikátor číselníku akcí.*/
		ixs_cia?: string|null;
		/**Typ změnového řízení (vazba na číselník).*/
		typ_zmr?: number|null;
		/**Identifikátor změnového řízení (pokud byla cesta upravena mimo plán).*/
		ixp_zmr?: string|null;
		/**Identifikátor členění (vazba na číselník).*/
		ixs_cle?: string|null;
		/**Typ požadavku (vazba na číselník).*/
		typ_poz?: number|null;
		/**Ns pro Org.*/
		hodnota_te1?: string|null;
		/**Osob zahranici.*/
		osob_zahranici?: number|null;
		/**Osob doprovod.*/
		osob_doprovod?: number|null;
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
		/**Stav cesty textově.*/
		stav_rcn_txt?: string|null;
		/**Typ požadavku textově.*/
		typ_poz_txt?: string|null;
		/**Kategorie cesty textově.*/
		ktg_rcn_txt?: string|null;
		/**Úroveň návštěvy textově.*/
		urn_txt?: string|null;
		/**Název státu.*/
		stat_txt?: string|null;
		/**Funkce realizátora textově.*/
		fun_real?: string|null;
		/**Funkce zadavatele textově.*/
		fun_zad?: string|null;
		/**Zadavatel textově(změnu provedl).*/
		zmp_zad?: string|null;
		/**Funkce vlastníka textově.*/
		fun_akt?: string|null;
		/**Název členění.*/
		nazev_cle?: string|null;
		/**Počet položek(pouze při zjišťování počtů).*/
		pocet?: number|null;
		/**Mimo plán.*/
		mimo_plan?: number|null;
		/**Důvod storna.*/
		duvodStorna?: string|null;
		/**Souvisejicí výdaje.*/
		sv?: string|null;
		/**Další podmínky uskutečnění.*/
		PodmUskut?: string|null;
		/**Údaje pro výpočet náhrad.*/
		PodmVypoc?: string|null;
		/**Ostatní údaje.*/
		PodmOst?: string|null;
		/**Příznak kontroly profil/cestující.*/
		prizUca?: number|null;
		/**Příznak rozdílu mezi PCN a RCN.*/
		prizRozdil?: number|null;
		/**Textový popis rozdílů.*/
		rozdil?: string|null;
		/**Zařazení (vazba na kategorii hodnocení).*/
		kat_hod?: string[]|null;
		/**Datum exportu.*/
		dat_exp?: JsonDate|null;
	}
	const enum GRcnCestaDtoNames { ixs_rcn = "ixs_rcn", ixp_den = "ixp_den", ixp_pcn = "ixp_pcn", rok = "rok", uex_akt = "uex_akt", ac = "ac", evi_cis = "evi_cis", stav_rcn = "stav_rcn", nazev = "nazev", rozkaz = "rozkaz", stat = "stat", misto = "misto", ucel = "ucel", zkr_dopr = "zkr_dopr", misto_n = "misto_n", dat_n = "dat_n", misto_u = "misto_u", dat_u = "dat_u", misto_hra1 = "misto_hra1", dat_hra1 = "dat_hra1", misto_hra2 = "misto_hra2", dat_hra2 = "dat_hra2", podm_uskut = "podm_uskut", podm_vypoc = "podm_vypoc", ico_fin = "ico_fin", nks_fin = "nks_fin", ico_sdr = "ico_sdr", nks_sdr = "nks_sdr", ico_real = "ico_real", nks_real = "nks_real", ixs_fun_real = "ixs_fun_real", ixs_fun_zad = "ixs_fun_zad", ixs_fun_akt = "ixs_fun_akt", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_kur = "ixp_kur", ixs_fun_komp = "ixs_fun_komp", ixp_sml = "ixp_sml", ktg_rcn = "ktg_rcn", urn = "urn", ixs_zmp_zad = "ixs_zmp_zad", te1_p = "te1_p", rok_cia = "rok_cia", ico_cia = "ico_cia", cislo_cia = "cislo_cia", ixs_cia = "ixs_cia", typ_zmr = "typ_zmr", ixp_zmr = "ixp_zmr", ixs_cle = "ixs_cle", typ_poz = "typ_poz", hodnota_te1 = "hodnota_te1", osob_zahranici = "osob_zahranici", osob_doprovod = "osob_doprovod", priz_view = "priz_view", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", stav_rcn_txt = "stav_rcn_txt", typ_poz_txt = "typ_poz_txt", ktg_rcn_txt = "ktg_rcn_txt", urn_txt = "urn_txt", stat_txt = "stat_txt", fun_real = "fun_real", fun_zad = "fun_zad", zmp_zad = "zmp_zad", fun_akt = "fun_akt", nazev_cle = "nazev_cle", pocet = "pocet", mimo_plan = "mimo_plan", duvodStorna = "duvodStorna", sv = "sv", PodmUskut = "PodmUskut", PodmVypoc = "PodmVypoc", PodmOst = "PodmOst", prizUca = "prizUca", prizRozdil = "prizRozdil", rozdil = "rozdil", kat_hod = "kat_hod", dat_exp = "dat_exp",}
	const enum GRcnCestaDtoFragments { ixs_rcn = "main", ixp_den = "main", ixp_pcn = "main", rok = "main", uex_akt = "main", ac = "main", evi_cis = "main", stav_rcn = "main", nazev = "main", rozkaz = "main", stat = "main", misto = "main", ucel = "main", zkr_dopr = "main", misto_n = "main", dat_n = "main", misto_u = "main", dat_u = "main", misto_hra1 = "main", dat_hra1 = "main", misto_hra2 = "main", dat_hra2 = "main", podm_uskut = "main", podm_vypoc = "main", ico_fin = "main", nks_fin = "main", ico_sdr = "main", nks_sdr = "main", ico_real = "main", nks_real = "main", ixs_fun_real = "main", ixs_fun_zad = "main", ixs_fun_akt = "main", ico = "main", ucs = "main", uus = "main", nks = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_kur = "main", ixs_fun_komp = "main", ixp_sml = "main", ktg_rcn = "main", urn = "main", ixs_zmp_zad = "main", te1_p = "main", rok_cia = "main", ico_cia = "main", cislo_cia = "main", ixs_cia = "main", typ_zmr = "main", ixp_zmr = "main", ixs_cle = "main", typ_poz = "main", hodnota_te1 = "main", osob_zahranici = "main", osob_doprovod = "main", priz_view = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", stav_rcn_txt = "stav_rcn_txt", typ_poz_txt = "typ_poz_txt", ktg_rcn_txt = "ktg_rcn_txt", urn_txt = "urn_txt", stat_txt = "stat_txt", fun_real = "fun_real", fun_zad = "fun_zad", zmp_zad = "zmp_zad", fun_akt = "fun_akt", nazev_cle = "nazev_cle", pocet = "main", mimo_plan = "*", duvodStorna = "*", sv = "main", PodmUskut = "*", PodmVypoc = "*", PodmOst = "*", prizUca = "*", prizRozdil = "*", rozdil = "*", kat_hod = "*", dat_exp = "*",}
	const enum GRcnCestaDtoTypes { ixs_rcn = "string", ixp_den = "string", ixp_pcn = "string", rok = "number", uex_akt = "string", ac = "string", evi_cis = "string", stav_rcn = "number", nazev = "string", rozkaz = "string", stat = "number", misto = "string", ucel = "string", zkr_dopr = "string", misto_n = "string", dat_n = "JsonDate", misto_u = "string", dat_u = "JsonDate", misto_hra1 = "string", dat_hra1 = "JsonDate", misto_hra2 = "string", dat_hra2 = "JsonDate", podm_uskut = "string", podm_vypoc = "string", ico_fin = "string", nks_fin = "string", ico_sdr = "string", nks_sdr = "string", ico_real = "string", nks_real = "string", ixs_fun_real = "string", ixs_fun_zad = "string", ixs_fun_akt = "string", ico = "string", ucs = "string", uus = "string", nks = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_kur = "string", ixs_fun_komp = "string", ixp_sml = "string", ktg_rcn = "number", urn = "number", ixs_zmp_zad = "string", te1_p = "string", rok_cia = "number", ico_cia = "string", cislo_cia = "string", ixs_cia = "string", typ_zmr = "number", ixp_zmr = "string", ixs_cle = "string", typ_poz = "number", hodnota_te1 = "string", osob_zahranici = "number", osob_doprovod = "number", priz_view = "number", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", stav_rcn_txt = "string", typ_poz_txt = "string", ktg_rcn_txt = "string", urn_txt = "string", stat_txt = "string", fun_real = "string", fun_zad = "string", zmp_zad = "string", fun_akt = "string", nazev_cle = "string", pocet = "number", mimo_plan = "number", duvodStorna = "string", sv = "string", PodmUskut = "string", PodmVypoc = "string", PodmOst = "string", prizUca = "number", prizRozdil = "number", rozdil = "string", kat_hod = "string[]", dat_exp = "JsonDate",}
	const enum GRcnCestaDtoTypeLengths { ixs_rcn = 12, ixp_den = 12, ixp_pcn = 12, uex_akt = 16, ac = 20, evi_cis = 20, nazev = 254, rozkaz = 50, misto = 255, ucel = 100, zkr_dopr = 30, misto_n = 50, misto_u = 50, misto_hra1 = 50, misto_hra2 = 50, podm_uskut = 254, podm_vypoc = 254, ico_fin = 10, nks_fin = 12, ico_sdr = 10, nks_sdr = 12, ico_real = 10, nks_real = 12, ixs_fun_real = 12, ixs_fun_zad = 12, ixs_fun_akt = 12, ico = 10, ucs = 10, uus = 10, nks = 12, zmenu_prov = 12, ixp_kur = 12, ixs_fun_komp = 12, ixp_sml = 12, ixs_zmp_zad = 12, te1_p = 16, ico_cia = 10, cislo_cia = 16, ixs_cia = 12, ixp_zmr = 12, ixs_cle = 12, hodnota_te1 = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaEtapaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující etapu na cestě.*/
	interface GRcnCestaEtapaDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**řádek etapy.*/
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
		/**Kód definice navýšení náhrad.*/
		dvn?: number|null;
		/**Částka stravného krácená.*/
		c_strava_kr?: JsonDecimal|null;
		/**Procento stravného kráceno.*/
		proc_strava_kr?: JsonDecimal|null;
		/**Částka stravného.*/
		c_strava?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Číslo etapy.*/
		cislo_eta?: number|null;
		/**Den od.*/
		den_od?: number|null;
		/**Kód stavu etapy.*/
		stav_eta?: number|null;
		/**Částka kapesné kráceno.*/
		c_kapes_kr?: JsonDecimal|null;
		/**Procento kapesné kráceno.*/
		proc_kapes_kr?: JsonDecimal|null;
		/**Příznak přerušení etapy.*/
		preruseni?: number|null;
		/**Navýšení textově.*/
		dvn_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Stav etapy textově.*/
		stav_eta_txt?: string|null;
		/**Stav etapy zkratka.*/
		stav_eta_zkr?: string|null;
		/**Kód dvn.*/
		kod_dvn?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Zkratky jednotlivých doprav etapy dělené čárkou.*/
		zkr_dopr?: string|null;
		/**Příznak přerušení etapy pro checkbox.*/
		preruseniB?: boolean|null;
		/**Přerušení textově pro seznam.*/
		readonly preruseni_txt?: string|null;
	}
	const enum GRcnCestaEtapaDtoNames { ixs_rcn = "ixs_rcn", radek_pep = "radek_pep", z_mista = "z_mista", do_mista = "do_mista", stat = "stat", dat_od = "dat_od", dat_do = "dat_do", dvn = "dvn", c_strava_kr = "c_strava_kr", proc_strava_kr = "proc_strava_kr", c_strava = "c_strava", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_eta = "cislo_eta", den_od = "den_od", stav_eta = "stav_eta", c_kapes_kr = "c_kapes_kr", proc_kapes_kr = "proc_kapes_kr", preruseni = "preruseni", dvn_txt = "dvn_txt", stat_txt = "stat_txt", stav_eta_txt = "stav_eta_txt", stav_eta_zkr = "stav_eta_zkr", kod_dvn = "kod_dvn", rok = "rok", ixp = "ixp", zkr_dopr = "zkr_dopr", preruseniB = "preruseniB", preruseni_txt = "preruseni_txt",}
	const enum GRcnCestaEtapaDtoFragments { ixs_rcn = "main", radek_pep = "main", z_mista = "main", do_mista = "main", stat = "main", dat_od = "main", dat_do = "main", dvn = "main", c_strava_kr = "main", proc_strava_kr = "main", c_strava = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", cislo_eta = "main", den_od = "main", stav_eta = "main", c_kapes_kr = "main", proc_kapes_kr = "main", preruseni = "main", dvn_txt = "dvn_txt", stat_txt = "stat_txt", stav_eta_txt = "stav_eta_txt", stav_eta_zkr = "stav_eta_zkr", kod_dvn = "kod_dvn", rok = "*", ixp = "*", zkr_dopr = "zkr_dopr", preruseniB = "*", preruseni_txt = "*",}
	const enum GRcnCestaEtapaDtoTypes { ixs_rcn = "string", radek_pep = "number", z_mista = "string", do_mista = "string", stat = "number", dat_od = "JsonDate", dat_do = "JsonDate", dvn = "number", c_strava_kr = "JsonDecimal", proc_strava_kr = "JsonDecimal", c_strava = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_eta = "number", den_od = "number", stav_eta = "number", c_kapes_kr = "JsonDecimal", proc_kapes_kr = "JsonDecimal", preruseni = "number", dvn_txt = "string", stat_txt = "string", stav_eta_txt = "string", stav_eta_zkr = "string", kod_dvn = "string", rok = "number", ixp = "string", zkr_dopr = "string", preruseniB = "boolean", preruseni_txt = "string",}
	const enum GRcnCestaEtapaDtoTypeLengths { ixs_rcn = 12, z_mista = 30, do_mista = 30, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaEtapaKraceniStravnehoDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující krácení stravného na etapách služební cesty.*/
	interface GRcnCestaEtapaKraceniStravnehoDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Řádek krácení.*/
		radek?: number|null;
		/**Datum.*/
		datum?: JsonDate|null;
		/**Procento stravného.*/
		proc_strava?: JsonDecimal|null;
		/**Procento kapesného.*/
		proc_kapes?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Procento krácení tuzemského stravného.*/
		proc_tuzem?: JsonDecimal|null;
		/**Příznak ubytování.*/
		priz_ubyt?: number|null;
		/**Tuzemské stravné - snídaně, oběd, večeře (101).*/
		strava_tuz?: string|null;
		/**Zahraniční stravné - snídaně, oběd, večeře (101).*/
		strava_zah?: string|null;
		/**Datum_do.*/
		datum_do?: JsonDate|null;
		/**Priznak ubytovani txt.*/
		readonly priz_ubyt_txt?: string|null;
		/**Priznak pro bezplatne ubytovani.*/
		bezplatneUbytovani?: boolean|null;
		/**Zatržítko pro zahraniční stravné - snídaně.*/
		zs_snidane?: boolean|null;
		/**Zatržítko pro zahraniční stravné - oběd.*/
		zs_obed?: boolean|null;
		/**Zatržítko pro zahraniční stravné - večeře.*/
		zs_vecere?: boolean|null;
		/**Zatržítko pro tuzemské stravné - snídaně.*/
		ts_snidane?: boolean|null;
		/**Zatržítko pro tuzemské stravné - oběd.*/
		ts_obed?: boolean|null;
		/**Zatržítko pro tuzemské stravné - večeře.*/
		ts_vecere?: boolean|null;
	}
	const enum GRcnCestaEtapaKraceniStravnehoDtoNames { ixs_rcn = "ixs_rcn", radek = "radek", datum = "datum", proc_strava = "proc_strava", proc_kapes = "proc_kapes", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", proc_tuzem = "proc_tuzem", priz_ubyt = "priz_ubyt", strava_tuz = "strava_tuz", strava_zah = "strava_zah", datum_do = "datum_do", priz_ubyt_txt = "priz_ubyt_txt", bezplatneUbytovani = "bezplatneUbytovani", zs_snidane = "zs_snidane", zs_obed = "zs_obed", zs_vecere = "zs_vecere", ts_snidane = "ts_snidane", ts_obed = "ts_obed", ts_vecere = "ts_vecere",}
	const enum GRcnCestaEtapaKraceniStravnehoDtoFragments { ixs_rcn = "*", radek = "*", datum = "*", proc_strava = "*", proc_kapes = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", proc_tuzem = "*", priz_ubyt = "*", strava_tuz = "*", strava_zah = "*", datum_do = "*", priz_ubyt_txt = "*", bezplatneUbytovani = "*", zs_snidane = "*", zs_obed = "*", zs_vecere = "*", ts_snidane = "*", ts_obed = "*", ts_vecere = "*",}
	const enum GRcnCestaEtapaKraceniStravnehoDtoTypes { ixs_rcn = "string", radek = "number", datum = "JsonDate", proc_strava = "JsonDecimal", proc_kapes = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", proc_tuzem = "JsonDecimal", priz_ubyt = "number", strava_tuz = "string", strava_zah = "string", datum_do = "JsonDate", priz_ubyt_txt = "string", bezplatneUbytovani = "boolean", zs_snidane = "boolean", zs_obed = "boolean", zs_vecere = "boolean", ts_snidane = "boolean", ts_obed = "boolean", ts_vecere = "boolean",}
	const enum GRcnCestaEtapaKraceniStravnehoDtoTypeLengths { ixs_rcn = 12, zmenu_prov = 12, strava_tuz = 10, strava_zah = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaEtapaLimitDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující závazné limity pro etapu cesty.*/
	interface GRcnCestaEtapaLimitDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Vzdálenost celkem v km.*/
		km_celkem?: JsonDecimal|null;
		/**Pohonné hmoty celkem.*/
		phm_celkem?: JsonDecimal|null;
		/**Vzdálenost v km v cizině.*/
		km_valuta?: JsonDecimal|null;
		/**Pohonné hmoty v cizině.*/
		phm_valuta?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GRcnCestaEtapaLimitDtoNames { ixs_rcn = "ixs_rcn", km_celkem = "km_celkem", phm_celkem = "phm_celkem", km_valuta = "km_valuta", phm_valuta = "phm_valuta", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRcnCestaEtapaLimitDtoFragments { ixs_rcn = "*", km_celkem = "*", phm_celkem = "*", km_valuta = "*", phm_valuta = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRcnCestaEtapaLimitDtoTypes { ixs_rcn = "string", km_celkem = "JsonDecimal", phm_celkem = "JsonDecimal", km_valuta = "JsonDecimal", phm_valuta = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRcnCestaEtapaLimitDtoTypeLengths { ixs_rcn = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaEtapaVydajDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující výdaje pro konkrétní průběh cesty.*/
	interface GRcnCestaEtapaVydajDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Řádek etapy.*/
		radek_pep?: number|null;
		/**Pořadí výdaje.*/
		poradi?: number|null;
		/**Kód způsobu dopravy.*/
		zp_dopr?: number|null;
		/**Příznak zálohy.*/
		priz_zaloha?: number|null;
		/**Vzdálenost v km.*/
		km?: JsonDecimal|null;
		/**Průměrná spotřeba.*/
		prum_spotr?: JsonDecimal|null;
		/**Cena pohonných hmot.*/
		c_phm?: JsonDecimal|null;
		/**Tankováno.*/
		tankovano?: JsonDecimal|null;
		/**Typ prostředku - tovární značka, model.*/
		typ_prostr?: string|null;
		/**Spz.*/
		spz?: string|null;
		/**Číslo technického průkazu.*/
		cislo_tp?: string|null;
		/**Havarijní pojištění.*/
		hav_poj?: string|null;
		/**Objem válců.*/
		objem_val?: JsonDecimal|null;
		/**Příznak přívěsu.*/
		priz_prives?: number|null;
		/**Příznak jízdenka.*/
		priz_jizdenka?: number|null;
		/**Objednávka.*/
		objednavka?: string|null;
		/**Faktura vlastní.*/
		faktura_vl?: string|null;
		/**Faktura dodavatelská.*/
		faktura_dod?: string|null;
		/**Spojovací zařízení.*/
		spoj?: string|null;
		/**Dodavatel.*/
		dodavatel?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Doklady.*/
		doklady?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Kód typu pohonné hmoty.*/
		phm?: number|null;
		/**Kód způsobu úhrady.*/
		zp_uhr?: number|null;
		/**Krácení v zahraničí.*/
		kr_zahr?: string|null;
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Počet osob.*/
		poc_oso?: string|null;
		/**Ixp_aus_txt.*/
		ixp_aus_txt?: string|null;
		/**Ixp_plk_txt.*/
		ixp_plk_txt?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Phm_txt.*/
		phm_txt?: string|null;
		/**Zp_dopr_txt.*/
		zp_dopr_txt?: string|null;
		/**Zp_uhr_txt.*/
		zp_uhr_txt?: string|null;
		/**Doprava.*/
		doprava?: number|null;
		/**Priz_zaloha.*/
		priz_zalohaB?: boolean|null;
		/**Priz_prives.*/
		priz_privesB?: boolean|null;
		/**Priz_jizdenka.*/
		priz_jizdenkaB?: boolean|null;
		/**Specielní filtr pro dopravu ((zp_dopr != 0) OR (zp_dopr = 0 AND zp_uhr = 0)).*/
		filtrProDopravu?: boolean|null;
	}
	const enum GRcnCestaEtapaVydajDtoNames { ixs_rcn = "ixs_rcn", radek_pep = "radek_pep", poradi = "poradi", zp_dopr = "zp_dopr", priz_zaloha = "priz_zaloha", km = "km", prum_spotr = "prum_spotr", c_phm = "c_phm", tankovano = "tankovano", typ_prostr = "typ_prostr", spz = "spz", cislo_tp = "cislo_tp", hav_poj = "hav_poj", objem_val = "objem_val", priz_prives = "priz_prives", priz_jizdenka = "priz_jizdenka", objednavka = "objednavka", faktura_vl = "faktura_vl", faktura_dod = "faktura_dod", spoj = "spoj", dodavatel = "dodavatel", c_mena = "c_mena", mena = "mena", doklady = "doklady", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tna = "ixs_tna", phm = "phm", zp_uhr = "zp_uhr", kr_zahr = "kr_zahr", ixp_aus = "ixp_aus", ixp_plk = "ixp_plk", poc_oso = "poc_oso", ixp_aus_txt = "ixp_aus_txt", ixp_plk_txt = "ixp_plk_txt", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", phm_txt = "phm_txt", zp_dopr_txt = "zp_dopr_txt", zp_uhr_txt = "zp_uhr_txt", doprava = "doprava", priz_zalohaB = "priz_zalohaB", priz_privesB = "priz_privesB", priz_jizdenkaB = "priz_jizdenkaB", filtrProDopravu = "filtrProDopravu",}
	const enum GRcnCestaEtapaVydajDtoFragments { ixs_rcn = "main", radek_pep = "main", poradi = "main", zp_dopr = "main", priz_zaloha = "main", km = "main", prum_spotr = "main", c_phm = "main", tankovano = "main", typ_prostr = "main", spz = "main", cislo_tp = "main", hav_poj = "main", objem_val = "main", priz_prives = "main", priz_jizdenka = "main", objednavka = "main", faktura_vl = "main", faktura_dod = "main", spoj = "main", dodavatel = "main", c_mena = "main", mena = "main", doklady = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tna = "main", phm = "main", zp_uhr = "main", kr_zahr = "main", ixp_aus = "main", ixp_plk = "main", poc_oso = "main", ixp_aus_txt = "ixp_aus_txt", ixp_plk_txt = "ixp_plk_txt", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", phm_txt = "phm_txt", zp_dopr_txt = "zp_dopr_txt", zp_uhr_txt = "zp_uhr_txt", doprava = "*", priz_zalohaB = "*", priz_privesB = "*", priz_jizdenkaB = "*", filtrProDopravu = "*",}
	const enum GRcnCestaEtapaVydajDtoTypes { ixs_rcn = "string", radek_pep = "number", poradi = "number", zp_dopr = "number", priz_zaloha = "number", km = "JsonDecimal", prum_spotr = "JsonDecimal", c_phm = "JsonDecimal", tankovano = "JsonDecimal", typ_prostr = "string", spz = "string", cislo_tp = "string", hav_poj = "string", objem_val = "JsonDecimal", priz_prives = "number", priz_jizdenka = "number", objednavka = "string", faktura_vl = "string", faktura_dod = "string", spoj = "string", dodavatel = "string", c_mena = "JsonDecimal", mena = "number", doklady = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tna = "string", phm = "number", zp_uhr = "number", kr_zahr = "string", ixp_aus = "string", ixp_plk = "string", poc_oso = "string", ixp_aus_txt = "string", ixp_plk_txt = "string", ixs_tna_txt = "string", mena_txt = "string", phm_txt = "string", zp_dopr_txt = "string", zp_uhr_txt = "string", doprava = "number", priz_zalohaB = "boolean", priz_privesB = "boolean", priz_jizdenkaB = "boolean", filtrProDopravu = "boolean",}
	const enum GRcnCestaEtapaVydajDtoTypeLengths { ixs_rcn = 12, typ_prostr = 50, spz = 20, cislo_tp = 30, hav_poj = 30, objednavka = 50, faktura_vl = 50, faktura_dod = 50, spoj = 50, dodavatel = 254, doklady = 254, poznamka = 254, zmenu_prov = 12, ixs_tna = 12, kr_zahr = 3, ixp_aus = 12, ixp_plk = 12, poc_oso = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaFinProfilDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující finanční profil (Předpisy krytí).*/
	interface GRcnCestaFinProfilDto {
		/**Identifikátor cesty.*/
		ixp?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Číslo položky.*/
		cislo?: number|null;
		/**Licence.*/
		lic?: string|null;
		/**Identifikátor položky plánu.*/
		ixp_pla?: string|null;
		/**Číslo položky plánu.*/
		cis_pol_pla?: string|null;
		/**Identifikátor funkce.*/
		ixs_fun?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Kód stavu zaúčtování.*/
		up_stav?: number|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Datum plnění.*/
		dat_plneni?: JsonDate|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
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
		/**Směrový kód vlastního účtu.*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní.*/
		bu_vl?: string|null;
		/**Částka fin.*/
		c_fin?: JsonDecimal|null;
		/**Datum vzniku.*/
		dat_vznik?: JsonDate|null;
		/**Typ agendy fin.*/
		typ_ag_fin?: number|null;
		/**Druh dokladu.*/
		drd?: number|null;
		/**Uea_rr.*/
		uea_rr?: string|null;
		/**Ueb_rr.*/
		ueb_rr?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor smlouvy.*/
		ixp_sml?: string|null;
		/**Rok smlouvy.*/
		rok_sml?: number|null;
		/**Číslo smlouvy.*/
		cislo_sml?: number|null;
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
		/**Up_stav_txt.*/
		up_stav_txt?: string|null;
		/**Ac_sml.*/
		ac_sml?: string|null;
		/**Zda je editace resp. zakladani noveho zaznamu.*/
		jeEditace?: boolean|null;
	}
	const enum GRcnCestaFinProfilDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", ixp_pla = "ixp_pla", cis_pol_pla = "cis_pol_pla", ixs_fun = "ixs_fun", nazev = "nazev", up_stav = "up_stav", c = "c", dat_plneni = "dat_plneni", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fin = "c_fin", dat_vznik = "dat_vznik", typ_ag_fin = "typ_ag_fin", drd = "drd", uea_rr = "uea_rr", ueb_rr = "ueb_rr", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", up_stav_txt = "up_stav_txt", ac_sml = "ac_sml", jeEditace = "jeEditace",}
	const enum GRcnCestaFinProfilDtoFragments { ixp = "main", rok = "main", cislo = "main", lic = "main", ixp_pla = "main", cis_pol_pla = "main", ixs_fun = "main", nazev = "main", up_stav = "main", c = "main", dat_plneni = "main", ico = "main", ucs = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", sk_vl = "main", bu_vl = "main", c_fin = "main", dat_vznik = "main", typ_ag_fin = "main", drd = "main", uea_rr = "main", ueb_rr = "main", dat_zmena = "main", zmenu_prov = "main", ixp_sml = "main", rok_sml = "main", cislo_sml = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", up_stav_txt = "up_stav_txt", ac_sml = "ac_sml", jeEditace = "*",}
	const enum GRcnCestaFinProfilDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", ixp_pla = "string", cis_pol_pla = "string", ixs_fun = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", dat_plneni = "JsonDate", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", sk_vl = "string", bu_vl = "string", c_fin = "JsonDecimal", dat_vznik = "JsonDate", typ_ag_fin = "number", drd = "number", uea_rr = "string", ueb_rr = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", up_stav_txt = "string", ac_sml = "string", jeEditace = "boolean",}
	const enum GRcnCestaFinProfilDtoTypeLengths { ixp = 12, lic = 4, ixp_pla = 12, cis_pol_pla = 16, ixs_fun = 12, nazev = 254, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, sk_vl = 11, bu_vl = 34, uea_rr = 3, ueb_rr = 4, zmenu_prov = 12, ixp_sml = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaFinProfilPrehledVyuzitiDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Přehled využití nad detailem finančního profilu.*/
	interface GRcnCestaFinProfilPrehledVyuzitiDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Agendové číslo Sc.*/
		ac_sc?: string|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Agendové číslo Cp.*/
		ac_cp?: string|null;
		/**Částka kalkulováno.*/
		c_kalkulovano?: JsonDecimal|null;
		/**Částka záloha.*/
		c_zaloha?: JsonDecimal|null;
		/**Částka vyúčtování.*/
		c_vyuctovani?: JsonDecimal|null;
		/**Částka rezervace.*/
		c_rezervace?: JsonDecimal|null;
		/**Částka využito.*/
		readonly c_vyuzito?: JsonDecimal|null;
	}
	const enum GRcnCestaFinProfilPrehledVyuzitiDtoNames { ixs_rcn = "ixs_rcn", ac_sc = "ac_sc", ixp = "ixp", ac_cp = "ac_cp", c_kalkulovano = "c_kalkulovano", c_zaloha = "c_zaloha", c_vyuctovani = "c_vyuctovani", c_rezervace = "c_rezervace", c_vyuzito = "c_vyuzito",}
	const enum GRcnCestaFinProfilPrehledVyuzitiDtoFragments { ixs_rcn = "main", ac_sc = "main", ixp = "main", ac_cp = "main", c_kalkulovano = "main", c_zaloha = "main", c_vyuctovani = "main", c_rezervace = "main", c_vyuzito = "*",}
	const enum GRcnCestaFinProfilPrehledVyuzitiDtoTypes { ixs_rcn = "string", ac_sc = "string", ixp = "string", ac_cp = "string", c_kalkulovano = "JsonDecimal", c_zaloha = "JsonDecimal", c_vyuctovani = "JsonDecimal", c_rezervace = "JsonDecimal", c_vyuzito = "JsonDecimal",}
	const enum GRcnCestaFinProfilPrehledVyuzitiDtoTypeLengths { ixs_rcn = 12, ac_sc = 20, ixp = 12, ac_cp = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaFinProfilStavRppDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující finanční profil - stav dle RPP (sumář).*/
	interface GRcnCestaFinProfilstavRppDto {
		/**Rozpočtováno.*/
		rozpoctovano?: JsonDecimal|null;
		/**Kalkulováno.*/
		kalkulovano?: JsonDecimal|null;
		/**Kalkulováno ostatní.*/
		kalkulovano_ost?: JsonDecimal|null;
		/**Použito.*/
		pouzito?: JsonDecimal|null;
		/**Blokováno sml.*/
		blokovano_sml?: JsonDecimal|null;
		/**Blokováno na kontě.*/
		blokovano_na_konte?: JsonDecimal|null;
		/**Rezervováno sml.*/
		rezervovano_sml?: JsonDecimal|null;
		/**Rezervováno na kontě.*/
		rezervovano_na_konte?: JsonDecimal|null;
		/**Čerpáno.*/
		cerpano?: JsonDecimal|null;
	}
	const enum GRcnCestaFinProfilstavRppDtoNames { rozpoctovano = "rozpoctovano", kalkulovano = "kalkulovano", kalkulovano_ost = "kalkulovano_ost", pouzito = "pouzito", blokovano_sml = "blokovano_sml", blokovano_na_konte = "blokovano_na_konte", rezervovano_sml = "rezervovano_sml", rezervovano_na_konte = "rezervovano_na_konte", cerpano = "cerpano",}
	const enum GRcnCestaFinProfilstavRppDtoFragments { rozpoctovano = "*", kalkulovano = "*", kalkulovano_ost = "*", pouzito = "*", blokovano_sml = "*", blokovano_na_konte = "*", rezervovano_sml = "*", rezervovano_na_konte = "*", cerpano = "*",}
	const enum GRcnCestaFinProfilstavRppDtoTypes { rozpoctovano = "JsonDecimal", kalkulovano = "JsonDecimal", kalkulovano_ost = "JsonDecimal", pouzito = "JsonDecimal", blokovano_sml = "JsonDecimal", blokovano_na_konte = "JsonDecimal", rezervovano_sml = "JsonDecimal", rezervovano_na_konte = "JsonDecimal", cerpano = "JsonDecimal",}
	const enum GRcnCestaFinProfilstavRppDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaUcastnikDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující účastníka na cestě.*/
	interface GRcnCestaUcastnikDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Pořadí účastníka.*/
		por_oso?: number|null;
		/**Kód vztahu osoby k akci.*/
		stav_dos?: number|null;
		/**Kód typu účastníka.*/
		typ_dos?: number|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Titul před.*/
		tit_pred?: string|null;
		/**Titul za.*/
		tit_za?: string|null;
		/**Osobní číslo.*/
		os_cislo?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Identifikátor organizační jednotky.*/
		ixs_orj?: string|null;
		/**Identifikátor typu osoby.*/
		ixs_tos?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Výkon.*/
		vkn?: string|null;
		/**Hodnost.*/
		hodnost?: string|null;
		/**Identifikátor rozlišení osoby.*/
		ixs_tor?: string|null;
		/**Typ osoby textově(uživatelsky definované).*/
		ixs_tos_txt?: string|null;
		/**Vztah osoby k akci textově.*/
		stav_dos_txt?: string|null;
		/**Typ osoby textově.*/
		typ_dos_txt?: string|null;
		/**Účtárna textově.*/
		uus_txt?: string|null;
		/**Organizační jednotka textově.*/
		ixs_orj_txt?: string|null;
		/**Identifikátor externího subjektu.*/
		ixs_esu?: string|null;
		/**Číslo platební karty.*/
		cislo_plk?: string|null;
		/**Rozlišení typu osoby textově(uživatelsky definované).*/
		ixs_tor_txt?: string|null;
	}
	const enum GRcnCestaUcastnikDtoNames { ixs_rcn = "ixs_rcn", por_oso = "por_oso", stav_dos = "stav_dos", typ_dos = "typ_dos", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", os_cislo = "os_cislo", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_osr = "ixs_osr", ico = "ico", ucs = "ucs", uus = "uus", ixs_orj = "ixs_orj", ixs_tos = "ixs_tos", nks = "nks", vkn = "vkn", hodnost = "hodnost", ixs_tor = "ixs_tor", ixs_tos_txt = "ixs_tos_txt", stav_dos_txt = "stav_dos_txt", typ_dos_txt = "typ_dos_txt", uus_txt = "uus_txt", ixs_orj_txt = "ixs_orj_txt", ixs_esu = "ixs_esu", cislo_plk = "cislo_plk", ixs_tor_txt = "ixs_tor_txt",}
	const enum GRcnCestaUcastnikDtoFragments { ixs_rcn = "main", por_oso = "main", stav_dos = "main", typ_dos = "main", jmeno = "main", prijmeni = "main", tit_pred = "main", tit_za = "main", os_cislo = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_osr = "main", ico = "main", ucs = "main", uus = "main", ixs_orj = "main", ixs_tos = "main", nks = "main", vkn = "main", hodnost = "main", ixs_tor = "main", ixs_tos_txt = "ixs_tos_txt", stav_dos_txt = "stav_dos_txt", typ_dos_txt = "typ_dos_txt", uus_txt = "uus_txt", ixs_orj_txt = "ixs_orj_txt", ixs_esu = "ixs_esu", cislo_plk = "cislo_plk", ixs_tor_txt = "ixs_tor_txt",}
	const enum GRcnCestaUcastnikDtoTypes { ixs_rcn = "string", por_oso = "number", stav_dos = "number", typ_dos = "number", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", os_cislo = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_osr = "string", ico = "string", ucs = "string", uus = "string", ixs_orj = "string", ixs_tos = "string", nks = "string", vkn = "string", hodnost = "string", ixs_tor = "string", ixs_tos_txt = "string", stav_dos_txt = "string", typ_dos_txt = "string", uus_txt = "string", ixs_orj_txt = "string", ixs_esu = "string", cislo_plk = "string", ixs_tor_txt = "string",}
	const enum GRcnCestaUcastnikDtoTypeLengths { ixs_rcn = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, os_cislo = 30, zmenu_prov = 12, ixs_osr = 12, ico = 10, ucs = 10, uus = 10, ixs_orj = 12, ixs_tos = 12, nks = 12, vkn = 20, hodnost = 15, ixs_tor = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestaVazbySouvisejiciVydajDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující související výdaj na vazbách cesty.*/
	interface GRcnCestaVazbySouvisejiciVydajDto {
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Řádek výdaje.*/
		radek_svy?: number|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Typ agendy kód.*/
		typ_ag?: number|null;
		/**Identifikátor ext.*/
		ixp_ext?: string|null;
		/**Měna kód.*/
		mena?: number|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Částka celkem.*/
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
		/**Aktivita kód.*/
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
		/**Název typu náhrady.*/
		ixs_tna_txt?: string|null;
		/**Měna zkratka.*/
		mena_txt?: string|null;
		/**Typ agendy zkratka.*/
		typ_ag_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnCestaVazbySouvisejiciVydajDtoNames { ixs_rcn = "ixs_rcn", radek_svy = "radek_svy", ixs_tna = "ixs_tna", typ_ag = "typ_ag", ixp_ext = "ixp_ext", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", typ_ag_txt = "typ_ag_txt", pocet = "pocet",}
	const enum GRcnCestaVazbySouvisejiciVydajDtoFragments { ixs_rcn = "main", radek_svy = "main", ixs_tna = "main", typ_ag = "main", ixp_ext = "main", mena = "main", c_mena = "main", c_celk = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", typ_ag_txt = "typ_ag_txt", pocet = "main",}
	const enum GRcnCestaVazbySouvisejiciVydajDtoTypes { ixs_rcn = "string", radek_svy = "number", ixs_tna = "string", typ_ag = "number", ixp_ext = "string", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", ixs_tna_txt = "string", mena_txt = "string", typ_ag_txt = "string", pocet = "number",}
	const enum GRcnCestaVazbySouvisejiciVydajDtoTypeLengths { ixs_rcn = 12, ixs_tna = 12, ixp_ext = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnCestovniPojisteniDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující cestovní pojištění.*/
	interface GRcnCestovniPojisteniDto {
		/**Identifikátor cestovního pojištění.*/
		ixp_cpo?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Číslo pojištění.*/
		cislo_poj?: string|null;
		/**Ústav.*/
		ustav?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Částka pojištění.*/
		c_poj?: JsonDecimal|null;
		/**Kód měny pojištění.*/
		mena_poj?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
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
		/**Kniha textově.*/
		ixp_den_txt?: string|null;
		/**Osoba textově.*/
		ixs_osr_txt?: string|null;
		/**Měna pojištění textově.*/
		mena_poj_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnCestovniPojisteniDtoNames { ixp_cpo = "ixp_cpo", ixp_den = "ixp_den", ac = "ac", evi_cis = "evi_cis", cislo_poj = "cislo_poj", ustav = "ustav", nazev = "nazev", ixs_osr = "ixs_osr", dat_od = "dat_od", dat_do = "dat_do", stat = "stat", c_poj = "c_poj", mena_poj = "mena_poj", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", ixp_den_txt = "ixp_den_txt", ixs_osr_txt = "ixs_osr_txt", mena_poj_txt = "mena_poj_txt", stat_txt = "stat_txt", pocet = "pocet",}
	const enum GRcnCestovniPojisteniDtoFragments { ixp_cpo = "main", ixp_den = "main", ac = "main", evi_cis = "main", cislo_poj = "main", ustav = "main", nazev = "main", ixs_osr = "main", dat_od = "main", dat_do = "main", stat = "main", c_poj = "main", mena_poj = "main", popis = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", ixp_den_txt = "ixp_den_txt", ixs_osr_txt = "ixs_osr_txt", mena_poj_txt = "mena_poj_txt", stat_txt = "stat_txt", pocet = "main",}
	const enum GRcnCestovniPojisteniDtoTypes { ixp_cpo = "string", ixp_den = "string", ac = "string", evi_cis = "string", cislo_poj = "string", ustav = "string", nazev = "string", ixs_osr = "string", dat_od = "JsonDate", dat_do = "JsonDate", stat = "number", c_poj = "JsonDecimal", mena_poj = "number", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", ixp_den_txt = "string", ixs_osr_txt = "string", mena_poj_txt = "string", stat_txt = "string", pocet = "number",}
	const enum GRcnCestovniPojisteniDtoTypeLengths { ixp_cpo = 12, ixp_den = 12, ac = 20, evi_cis = 20, cislo_poj = 50, ustav = 254, nazev = 254, ixs_osr = 12, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnHistorieDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Historie změn dokladu.*/
	interface GRcnHistorieDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Pořadové číslo.*/
		por_cislo?: number|null;
		/**Kód změny.*/
		zmena?: number|null;
		/**Změna textově.*/
		zmena_txt?: string|null;
		/**Kategorie změny.*/
		zmena_ktg?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Typ agendy.*/
		typ_ag?: number|null;
		/**Ixx.*/
		ixx?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Změnu provedl popis.*/
		zmenu_prov_txt?: string|null;
	}
	const enum GRcnHistorieDtoNames { ixp = "ixp", por_cislo = "por_cislo", zmena = "zmena", zmena_txt = "zmena_txt", zmena_ktg = "zmena_ktg", poznamka = "poznamka", typ_ag = "typ_ag", ixx = "ixx", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pocet = "pocet", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GRcnHistorieDtoFragments { ixp = "main", por_cislo = "main", zmena = "main", zmena_txt = "main", zmena_ktg = "main", poznamka = "main", typ_ag = "main", ixx = "main", dat_zmena = "main", zmenu_prov = "main", pocet = "main", zmenu_prov_txt = "main",}
	const enum GRcnHistorieDtoTypes { ixp = "string", por_cislo = "number", zmena = "number", zmena_txt = "string", zmena_ktg = "number", poznamka = "string", typ_ag = "number", ixx = "string", dat_zmena = "JsonDate", zmenu_prov = "string", pocet = "number", zmenu_prov_txt = "string",}
	const enum GRcnHistorieDtoTypeLengths { ixp = 12, zmena_txt = 160, poznamka = 254, ixx = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnKategorieHodnoceniDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující kategorie hodnocení.*/
	interface GRcnKategorieHodnoceniDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Zkratka kategorie hodnocení.*/
		kat_hod?: string|null;
		/**Popis kategorie hodnocení.*/
		kat_hod_txt?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Příznak zařazení - pro zobrazení na detailu cesty.*/
		priz_zaraz?: number|null;
	}
	const enum GRcnKategorieHodnoceniDtoNames { ico = "ico", rok = "rok", kat_hod = "kat_hod", kat_hod_txt = "kat_hod_txt", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_zaraz = "priz_zaraz",}
	const enum GRcnKategorieHodnoceniDtoFragments { ico = "*", rok = "*", kat_hod = "*", kat_hod_txt = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_zaraz = "*",}
	const enum GRcnKategorieHodnoceniDtoTypes { ico = "string", rok = "number", kat_hod = "string", kat_hod_txt = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_zaraz = "number",}
	const enum GRcnKategorieHodnoceniDtoTypeLengths { ico = 10, kat_hod = 15, kat_hod_txt = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnKnihaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující knihu realizace.*/
	interface GRcnKnihaDto extends Gordic.Eko.Interface.GEkosdenDto {
		/**Licence.*/
		lic?: string|null;
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
		/**Pořadové číslo max.*/
		por_cislo_max?: number|null;
		/**Subřada max.*/
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
		/**Uex.*/
		uex?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor kurzovního lístku.*/
		ixp_kur?: string|null;
		/**Identifikátor knihy smluv.*/
		ixp_den_sml?: string|null;
		/**Identifikátor typu smluv.*/
		ixs_typ_sml?: string|null;
	}
	const enum GRcnKnihaDtoNames { lic = "lic", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", uex = "uex", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_kur = "ixp_kur", ixp_den_sml = "ixp_den_sml", ixs_typ_sml = "ixs_typ_sml", ixp_den = "ixp_den", aktivita = "aktivita", nazev = "nazev", rok = "rok", prefix = "prefix", suffix = "suffix", ktg_den = "ktg_den", typ_den = "typ_den", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", akt_subrady_txt = "akt_subrady_txt", typ_ag = "typ_ag", ixs_vpk = "ixs_vpk",}
	const enum GRcnKnihaDtoFragments { lic = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", por_cislo_max = "*", subrada_max = "*", subrada_duz = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", uex = "*", dat_zmena = "*", zmenu_prov = "*", ixp_kur = "*", ixp_den_sml = "*", ixs_typ_sml = "*", ixp_den = "*", aktivita = "*", nazev = "*", rok = "*", prefix = "*", suffix = "*", ktg_den = "*", typ_den = "*", zkratka = "*", subrada = "*", akt_subrady = "*", ktg_den_txt = "*", akt_subrady_txt = "*", typ_ag = "*", ixs_vpk = "*",}
	const enum GRcnKnihaDtoTypes { lic = "string", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", uex = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_kur = "string", ixp_den_sml = "string", ixs_typ_sml = "string", ixp_den = "string", aktivita = "number", nazev = "string", rok = "number", prefix = "string", suffix = "string", ktg_den = "number", typ_den = "number", zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", akt_subrady_txt = "string", typ_ag = "number", ixs_vpk = "string",}
	const enum GRcnKnihaDtoTypeLengths { lic = 4, poznamka = 50, ico = 10, ucs = 10, ixp_den_old = 12, uus = 10, uex = 16, zmenu_prov = 12, ixp_kur = 12, ixp_den_sml = 12, ixs_typ_sml = 12, ixp_den = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnLimPrislibDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující limitovaný příslib.*/
	interface GRcnLimPrislibDto {
		/**Identifikátor smlouvy.*/
		ixp?: string|null;
		/**Licence.*/
		lic?: string|null;
		/**Identifikátor externího subjektu.*/
		ixs_esu?: string|null;
		/**Ičo externího subjektu.*/
		ico_esu?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Agendové číslo externího subjektu.*/
		ac_esu?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Směrový kód vlastního účtu.*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní.*/
		bu_vl?: string|null;
		/**Směrový kód cizího účtu.*/
		sk_ci?: string|null;
		/**Bankovní účet cizí.*/
		bu_ci?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Agendové číslo smluv.*/
		ac_sml?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Subřada.*/
		subrada?: number|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Kód kategorie typu písemnosti.*/
		ktg_typ?: number|null;
		/**Identifikátor typu písemnosti.*/
		ixs_typ?: string|null;
		/**Eko aktivita.*/
		eko_akt?: number|null;
		/**Kód stavu smlouvy.*/
		sml_stav?: number|null;
		/**Datum uzavření.*/
		dat_uzavreni?: JsonDate|null;
		/**Datum platnosti.*/
		dat_platnost?: JsonDate|null;
		/**Datum prij pod.*/
		dat_prij_pod?: JsonDate|null;
		/**Zadavatel.*/
		zadavatel?: string|null;
		/**Identifikátor vyřizující funkce.*/
		ixs_fun_vyriz?: string|null;
		/**Identifikátor funkce referenta.*/
		ixs_fun_ref?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Soutěž.*/
		soutez?: string|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Kategori smluv.*/
		ktg_sml?: number|null;
		/**Datum  změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Částka položek.*/
		c_pol?: JsonDecimal|null;
		/**Částka dod.*/
		c_dod?: JsonDecimal|null;
		/**Typ platnost.*/
		typ_platnost?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Agendové číslo ver zak.*/
		ac_ver_zak?: string|null;
		/**Agendové číslo dok 1.*/
		ac_dok_1?: string|null;
		/**Agendové číslo dok 2.*/
		ac_dok_2?: string|null;
		/**Účinnost.*/
		ucinnost?: string|null;
		/**Identifikátor organizační jednotky.*/
		ixs_orj?: string|null;
		/**Číslo realizátora.*/
		cis_real?: string|null;
		/**Identifikátor smlouvy.*/
		ixp_sml?: string|null;
		/**Agendové číslo nadřazené.*/
		ac_nad?: string|null;
		/**Agendové číslo smlouvy nadřazené.*/
		ac_sml_nad?: string|null;
		/**Identifikátor pri.*/
		ixs_pri?: string|null;
		/**Num obj.*/
		num_obj?: number|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Množství.*/
		m?: JsonDecimal|null;
		/**Typ kurzu.*/
		typ_kurz?: number|null;
		/**Datum účinnosti.*/
		dat_ucinnost?: JsonDate|null;
		/**Finance od.*/
		fin_od?: number|null;
		/**Finance do.*/
		fin_do?: number|null;
		/**Sgn_stav.*/
		sgn_stav?: number|null;
		/**Příznak zobrazení.*/
		priz_view?: number|null;
		/**Typ ceny.*/
		typ_ceny?: number|null;
		/**Pořoadové číslo nabyvatele.*/
		por_cislo_nab?: number|null;
		/**Typ blokační agendy.*/
		typ_ag_blok?: number|null;
		/**Identifikátor nabyvatele.*/
		ixp_nab?: string|null;
		/**Identifikátor referenta zastupující.*/
		ixs_ref_zast?: string|null;
		/**Licence zastupujícího externího subjektu.*/
		lic_zast_esu?: string|null;
		/**Pořadí zastupujícího externího subjektu.*/
		por_zast_esu?: number|null;
		/**Datum dok 1.*/
		dat_dok_1?: JsonDate|null;
		/**Datum dok 2.*/
		dat_dok_2?: JsonDate|null;
		/**Identifikátor zuk.*/
		ixs_zuk?: string|null;
		/**Kategorie zuk.*/
		ktg_zuk?: number|null;
		/**Datum ukončení.*/
		dat_uko?: JsonDate|null;
		/**Identifikátor externího subjektu zastupující.*/
		ixs_esu_zast?: string|null;
		/**Částka sazba penalizace.*/
		c_sazba_pen?: JsonDecimal|null;
		/**Procentní sazba penalizace.*/
		proc_sazba_pen?: JsonDecimal|null;
		/**Typ penalizace.*/
		typ_pen?: number|null;
		/**Zak upr.*/
		zak_upr?: number|null;
		/**Příznak spo.*/
		priz_spo?: number|null;
		/**Typ spo.*/
		typ_spo?: number|null;
		/**Částka spo.*/
		c_spo?: JsonDecimal|null;
		/**Procentuelní spo.*/
		proc_spo?: JsonDecimal|null;
		/**Příznak úročení.*/
		priz_uroc?: number|null;
		/**Num dod.*/
		num_dod?: number|null;
		/**Číslo dodatku.*/
		cislo_dod?: number|null;
		/**Zp_def_ceny.*/
		zp_def_ceny?: number|null;
		/**Identifikátor smlouvy pri.*/
		ixp_sml_pri?: string|null;
		/**Příznak pzp.*/
		priz_pzp?: number|null;
		/**Datum dph od.*/
		dat_dph_od?: JsonDate|null;
		/**Datum dph do.*/
		dat_dph_do?: JsonDate|null;
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
		/**Částka celkem měna ss.*/
		c_c_mena_ss?: JsonDecimal|null;
		/**Částka celkem měna ns.*/
		c_c_mena_ns?: JsonDecimal|null;
		/**Částka celkem měna okr.*/
		c_c_mena_okr?: JsonDecimal|null;
		/**Typ pohledávky.*/
		typ_phl?: string|null;
		/**Vs.*/
		vs?: string|null;
		/**Částka v měně dph 3s.*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**Částka v měně dph 4s.*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**Částka v měně z 3s.*/
		c_mena_z_3s?: JsonDecimal|null;
		/**Částka v měně z 4s.*/
		c_mena_z_4s?: JsonDecimal|null;
		/**Částka celkem v měně 3s.*/
		c_c_mena_3s?: JsonDecimal|null;
		/**Částka celkem v měně 4s.*/
		c_c_mena_4s?: JsonDecimal|null;
		/**Datum sgn.*/
		dat_sgn?: JsonDate|null;
		/**Datum sgn ext.*/
		dat_sgn_ext?: JsonDate|null;
		/**Částka v měně doc.*/
		c_mena_doc?: JsonDecimal|null;
		/**Datum rad iissp.*/
		dat_rad_iissp?: JsonDate|null;
		/**Příznak opce.*/
		priz_opce?: number|null;
		/**Chytry filtr - dle polozek.*/
		chytryFiltr?: boolean|null;
		/**Ixp_txt.*/
		ixp_txt?: string|null;
		/**Ixs_esu_txt.*/
		ixs_esu_txt?: string|null;
		/**Ixs_fun_vyriz_txt.*/
		ixs_fun_vyriz_txt?: string|null;
		/**Ixs_fun_ref_txt.*/
		ixs_fun_ref_txt?: string|null;
		/**Ixs_typ_txt.*/
		ixs_typ_txt?: string|null;
		/**Ixs_zuk_txt.*/
		ixs_zuk_txt?: string|null;
		/**Ktg_sml_txt.*/
		ktg_sml_txt?: string|null;
		/**Ktg_zuk_txt.*/
		ktg_zuk_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Priz_pzp_txt.*/
		priz_pzp_txt?: string|null;
		/**Priz_view_txt.*/
		priz_view_txt?: string|null;
		/**Priz_opce_txt.*/
		priz_opce_txt?: string|null;
		/**Sgn_stav_txt.*/
		sgn_stav_txt?: string|null;
		/**Sml_stav_txt.*/
		sml_stav_txt?: string|null;
		/**Typ_ceny_txt.*/
		typ_ceny_txt?: string|null;
		/**Typ_kurz_txt.*/
		typ_kurz_txt?: string|null;
		/**Typ_platnost_txt.*/
		typ_platnost_txt?: string|null;
	}
	const enum GRcnLimPrislibDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", ixp_den = "ixp_den", subrada = "subrada", c = "c", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", sml_stav = "sml_stav", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", zadavatel = "zadavatel", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", rok = "rok", poznamka = "poznamka", soutez = "soutez", mena = "mena", ktg_sml = "ktg_sml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_pol = "c_pol", c_dod = "c_dod", typ_platnost = "typ_platnost", nazev = "nazev", ac_ver_zak = "ac_ver_zak", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", cis_real = "cis_real", ixp_sml = "ixp_sml", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ixs_pri = "ixs_pri", num_obj = "num_obj", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", priz_view = "priz_view", typ_ceny = "typ_ceny", por_cislo_nab = "por_cislo_nab", typ_ag_blok = "typ_ag_blok", ixp_nab = "ixp_nab", ixs_ref_zast = "ixs_ref_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", ixs_esu_zast = "ixs_esu_zast", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", zak_upr = "zak_upr", priz_spo = "priz_spo", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo", priz_uroc = "priz_uroc", num_dod = "num_dod", cislo_dod = "cislo_dod", zp_def_ceny = "zp_def_ceny", ixp_sml_pri = "ixp_sml_pri", priz_pzp = "priz_pzp", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", c_mena_doc = "c_mena_doc", dat_rad_iissp = "dat_rad_iissp", priz_opce = "priz_opce", chytryFiltr = "chytryFiltr", ixp_txt = "ixp_txt", ixs_esu_txt = "ixs_esu_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", ixs_typ_txt = "ixs_typ_txt", ixs_zuk_txt = "ixs_zuk_txt", ktg_sml_txt = "ktg_sml_txt", ktg_zuk_txt = "ktg_zuk_txt", mena_txt = "mena_txt", priz_pzp_txt = "priz_pzp_txt", priz_view_txt = "priz_view_txt", priz_opce_txt = "priz_opce_txt", sgn_stav_txt = "sgn_stav_txt", sml_stav_txt = "sml_stav_txt", typ_ceny_txt = "typ_ceny_txt", typ_kurz_txt = "typ_kurz_txt", typ_platnost_txt = "typ_platnost_txt",}
	const enum GRcnLimPrislibDtoFragments { ixp = "main", lic = "main", ixs_esu = "main", ico_esu = "main", ico = "main", ucs = "main", nks = "main", ac_esu = "main", popis = "main", sk_vl = "main", bu_vl = "main", sk_ci = "main", bu_ci = "main", ac = "main", ac_sml = "main", ixp_den = "main", subrada = "main", c = "main", ktg_typ = "main", ixs_typ = "main", eko_akt = "main", sml_stav = "main", dat_uzavreni = "main", dat_platnost = "main", dat_prij_pod = "main", zadavatel = "main", ixs_fun_vyriz = "main", ixs_fun_ref = "main", rok = "main", poznamka = "main", soutez = "main", mena = "main", ktg_sml = "main", dat_zmena = "main", zmenu_prov = "main", c_pol = "main", c_dod = "main", typ_platnost = "main", nazev = "main", ac_ver_zak = "main", ac_dok_1 = "main", ac_dok_2 = "main", ucinnost = "main", ixs_orj = "main", cis_real = "main", ixp_sml = "main", ac_nad = "main", ac_sml_nad = "main", ixs_pri = "main", num_obj = "main", c_mena = "main", kurz = "main", m = "main", typ_kurz = "main", dat_ucinnost = "main", fin_od = "main", fin_do = "main", sgn_stav = "main", priz_view = "main", typ_ceny = "main", por_cislo_nab = "main", typ_ag_blok = "main", ixp_nab = "main", ixs_ref_zast = "main", lic_zast_esu = "main", por_zast_esu = "main", dat_dok_1 = "main", dat_dok_2 = "main", ixs_zuk = "main", ktg_zuk = "main", dat_uko = "main", ixs_esu_zast = "main", c_sazba_pen = "main", proc_sazba_pen = "main", typ_pen = "main", zak_upr = "main", priz_spo = "main", typ_spo = "main", c_spo = "main", proc_spo = "main", priz_uroc = "main", num_dod = "main", cislo_dod = "main", zp_def_ceny = "main", ixp_sml_pri = "main", priz_pzp = "main", dat_dph_od = "main", dat_dph_do = "main", c_mena_z_osv = "main", c_mena_z_bd = "main", c_mena_z_ss = "main", c_mena_z_ns = "main", c_mena_dph_ss = "main", c_mena_dph_ns = "main", c_c_mena_ss = "main", c_c_mena_ns = "main", c_c_mena_okr = "main", typ_phl = "main", vs = "main", c_mena_dph_3s = "main", c_mena_dph_4s = "main", c_mena_z_3s = "main", c_mena_z_4s = "main", c_c_mena_3s = "main", c_c_mena_4s = "main", dat_sgn = "main", dat_sgn_ext = "main", c_mena_doc = "main", dat_rad_iissp = "main", priz_opce = "main", chytryFiltr = "*", ixp_txt = "ixp_txt", ixs_esu_txt = "ixs_esu_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", ixs_fun_ref_txt = "ixs_fun_ref_txt", ixs_typ_txt = "ixs_typ_txt", ixs_zuk_txt = "ixs_zuk_txt", ktg_sml_txt = "ktg_sml_txt", ktg_zuk_txt = "ktg_zuk_txt", mena_txt = "mena_txt", priz_pzp_txt = "priz_pzp_txt", priz_view_txt = "priz_view_txt", priz_opce_txt = "priz_opce_txt", sgn_stav_txt = "sgn_stav_txt", sml_stav_txt = "sml_stav_txt", typ_ceny_txt = "typ_ceny_txt", typ_kurz_txt = "typ_kurz_txt", typ_platnost_txt = "typ_platnost_txt",}
	const enum GRcnLimPrislibDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", ixp_den = "string", subrada = "number", c = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", sml_stav = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", zadavatel = "string", ixs_fun_vyriz = "string", ixs_fun_ref = "string", rok = "number", poznamka = "string", soutez = "string", mena = "number", ktg_sml = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_pol = "JsonDecimal", c_dod = "JsonDecimal", typ_platnost = "number", nazev = "string", ac_ver_zak = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", cis_real = "string", ixp_sml = "string", ac_nad = "string", ac_sml_nad = "string", ixs_pri = "string", num_obj = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", priz_view = "number", typ_ceny = "number", por_cislo_nab = "number", typ_ag_blok = "number", ixp_nab = "string", ixs_ref_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", ixs_esu_zast = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", zak_upr = "number", priz_spo = "number", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal", priz_uroc = "number", num_dod = "number", cislo_dod = "number", zp_def_ceny = "number", ixp_sml_pri = "string", priz_pzp = "number", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", c_mena_doc = "JsonDecimal", dat_rad_iissp = "JsonDate", priz_opce = "number", chytryFiltr = "boolean", ixp_txt = "string", ixs_esu_txt = "string", ixs_fun_vyriz_txt = "string", ixs_fun_ref_txt = "string", ixs_typ_txt = "string", ixs_zuk_txt = "string", ktg_sml_txt = "string", ktg_zuk_txt = "string", mena_txt = "string", priz_pzp_txt = "string", priz_view_txt = "string", priz_opce_txt = "string", sgn_stav_txt = "string", sml_stav_txt = "string", typ_ceny_txt = "string", typ_kurz_txt = "string", typ_platnost_txt = "string",}
	const enum GRcnLimPrislibDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnLimPrislibPolDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující položku limitovaného příslibu.*/
	interface GRcnLimPrislibPolDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Číslo.*/
		cislo?: number|null;
		/**Licence.*/
		lic?: string|null;
		/**Číslo pol pla.*/
		cis_pol_pla?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Up stav.*/
		up_stav?: number|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
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
		/**Směrový kód vlastního účtu.*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní.*/
		bu_vl?: string|null;
		/**Částka faktury.*/
		c_fak?: JsonDecimal|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Datum vzniku.*/
		dat_vznik?: JsonDate|null;
		/**Částka obj sml.*/
		c_obj_sml?: JsonDecimal|null;
		/**Druh dokladu.*/
		drd?: number|null;
		/**Identifikáto smlouvy.*/
		ixp_sml?: string|null;
		/**Rok sml.*/
		rok_sml?: number|null;
		/**Číslo sml.*/
		cislo_sml?: number|null;
		/**Uea_rr.*/
		uea_rr?: string|null;
		/**Ueb_rr.*/
		ueb_rr?: string|null;
		/**Identifikátor pri.*/
		ixs_pri?: string|null;
		/**Pořadové číslo.*/
		por_cis?: number|null;
		/**Typ blokační agendy.*/
		typ_ag_blok?: number|null;
		/**Znam.*/
		znam?: number|null;
		/**Xuete.*/
		xuete?: string|null;
		/**Příznak zaz.*/
		priz_zaz?: number|null;
		/**Eds dok.*/
		eds_dok?: string|null;
		/**Id hdr.*/
		id_hdr?: number|null;
		/**Řádek hdr.*/
		radek_hdr?: number|null;
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
		/**Název smluvního případu.*/
		ixp_txt?: string|null;
		/**Příznak záznamu textově.*/
		priz_zaz_txt?: string|null;
		/**Up stav textově.*/
		up_stav_txt?: string|null;
		/**Částka za DRD18.*/
		c_drd18?: JsonDecimal|null;
		/**Částka za RCN.*/
		c_rcn?: JsonDecimal|null;
	}
	const enum GRcnLimPrislibPolDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", cis_pol_pla = "cis_pol_pla", nazev = "nazev", up_stav = "up_stav", c = "c", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vznik = "dat_vznik", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", xuete = "xuete", priz_zaz = "priz_zaz", eds_dok = "eds_dok", id_hdr = "id_hdr", radek_hdr = "radek_hdr", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ixp_txt = "ixp_txt", priz_zaz_txt = "priz_zaz_txt", up_stav_txt = "up_stav_txt", c_drd18 = "c_drd18", c_rcn = "c_rcn",}
	const enum GRcnLimPrislibPolDtoFragments { ixp = "main", rok = "main", cislo = "main", lic = "main", cis_pol_pla = "main", nazev = "main", up_stav = "main", c = "main", ico = "main", ucs = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", sk_vl = "main", bu_vl = "main", c_fak = "main", dat_zmena = "main", zmenu_prov = "main", dat_vznik = "main", c_obj_sml = "main", drd = "main", ixp_sml = "main", rok_sml = "main", cislo_sml = "main", uea_rr = "main", ueb_rr = "main", ixs_pri = "main", por_cis = "main", typ_ag_blok = "main", znam = "main", xuete = "main", priz_zaz = "main", eds_dok = "main", id_hdr = "main", radek_hdr = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", ixp_txt = "ixp_txt", priz_zaz_txt = "priz_zaz_txt", up_stav_txt = "up_stav_txt", c_drd18 = "*", c_rcn = "*",}
	const enum GRcnLimPrislibPolDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", cis_pol_pla = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", sk_vl = "string", bu_vl = "string", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vznik = "JsonDate", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", xuete = "string", priz_zaz = "number", eds_dok = "string", id_hdr = "number", radek_hdr = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", ixp_txt = "string", priz_zaz_txt = "string", up_stav_txt = "string", c_drd18 = "JsonDecimal", c_rcn = "JsonDecimal",}
	const enum GRcnLimPrislibPolDtoTypeLengths { ixp = 12, lic = 4, cis_pol_pla = 16, nazev = 254, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, sk_vl = 11, bu_vl = 34, zmenu_prov = 12, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, xuete = 286, eds_dok = 16, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnMenuDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt obsahující povolení akcí menu na cestě/příkazu.*/
	interface GRcnMenuDto {
		/**Odschválit.*/
		editace?: boolean|null;
		/**Editace tooltip.*/
		editace_tooltip?: string|null;
		/**Lze měnit stát.*/
		menitStat?: boolean|null;
		/**Lze měnit stát tooltip.*/
		menitStat_tooltip?: string|null;
		/**Odschválit.*/
		odschvalit?: boolean|null;
		/**Odschválit tooltip.*/
		odschvalit_tooltip?: string|null;
		/**Předat.*/
		predat?: boolean|null;
		/**Předat tooltip.*/
		predat_tooltip?: string|null;
		/**Rezervace.*/
		rezervace?: boolean|null;
		/**Rezervace tooltip.*/
		rezervace_tooltip?: string|null;
		/**Potvrzení tisku schvalovacího procesue.*/
		potvrzeniTiskuSP?: boolean|null;
		/**Potvrzení tisku schvalovacího procesu tooltip.*/
		potvrzeniTiskuSP_tooltip?: string|null;
		/**Schválit.*/
		schvalit?: boolean|null;
		/**Schválit tooltip.*/
		schvalit_tooltip?: string|null;
		/**Možnost stornovat.*/
		stornovat?: boolean|null;
		/**Možnost stornovat tooltip.*/
		stornovat_tooltip?: string|null;
		/**Vazba na ADA.*/
		vazbaAda?: boolean|null;
		/**Vazba na PCN tooltip.*/
		vazbaAda_tooltip?: string|null;
		/**Vazba na PCN.*/
		vazbaPcn?: boolean|null;
		/**Vazba na PCN tooltip.*/
		vazbaPcn_tooltip?: string|null;
		/**Možnost zrušit storno.*/
		zrusitStorno?: boolean|null;
		/**Možnost zrušit storno tooltip.*/
		zrusitStorno_tooltip?: string|null;
		/**Zlikvidovat.*/
		zlikvidovat?: boolean|null;
		/**Zlikvidovat tooltip.*/
		zlikvidovat_tooltip?: string|null;
		/**Zrušení zlikvidování.*/
		zrusit_zlikvidovani?: boolean|null;
		/**Zrušení zlikvidování tooltip.*/
		zrusit_zlikvidovani_tooltip?: string|null;
		/**Vrátit.*/
		vratit?: boolean|null;
		/**Vrátit tooltip.*/
		vratit_tooltip?: string|null;
		/**Vyúčtování.*/
		vyuctovani?: boolean|null;
		/**Vyúčtování tooltip.*/
		vyuctovani_tooltip?: string|null;
		/**Finanční kontrola.*/
		financniKontrola?: boolean|null;
		/**Finanční kontrola tooltip.*/
		financniKontrola_tooltip?: string|null;
		/**Lze měnit osobu na příkazu.*/
		lzeZmenitOsobuRcnNaPrikazu?: boolean|null;
		/**Lze měnit osobu na příkazu tooltip.*/
		lzeZmenitOsobuRcnNaPrikazu_tooltip?: string|null;
		/**Uzavřít mimo modul.*/
		uzaMimoModul?: boolean|null;
		/**Uzavřít mimo modul tooltip.*/
		uzaMimoModul_tooltip?: string|null;
		/**Do vyúčtování bez záloh.*/
		doVyuctBezZaloh?: boolean|null;
		/**Do vyúčtování bez záloh tooltip.*/
		doVyuctBezZaloh_tooltip?: string|null;
		/**Vrátit před vyúčtování.*/
		vratitPreVyuct?: boolean|null;
		/**Vrátit před vyúčtování tooltip.*/
		vratitPreVyuct_tooltip?: string|null;
		/**Opravný doklad.*/
		opravnyDoklad?: boolean|null;
		/**Opravný doklad tooltip.*/
		opravnyDoklad_tooltip?: string|null;
	}
	const enum GRcnMenuDtoNames { editace = "editace", editace_tooltip = "editace_tooltip", menitStat = "menitStat", menitStat_tooltip = "menitStat_tooltip", odschvalit = "odschvalit", odschvalit_tooltip = "odschvalit_tooltip", predat = "predat", predat_tooltip = "predat_tooltip", rezervace = "rezervace", rezervace_tooltip = "rezervace_tooltip", potvrzeniTiskuSP = "potvrzeniTiskuSP", potvrzeniTiskuSP_tooltip = "potvrzeniTiskuSP_tooltip", schvalit = "schvalit", schvalit_tooltip = "schvalit_tooltip", stornovat = "stornovat", stornovat_tooltip = "stornovat_tooltip", vazbaAda = "vazbaAda", vazbaAda_tooltip = "vazbaAda_tooltip", vazbaPcn = "vazbaPcn", vazbaPcn_tooltip = "vazbaPcn_tooltip", zrusitStorno = "zrusitStorno", zrusitStorno_tooltip = "zrusitStorno_tooltip", zlikvidovat = "zlikvidovat", zlikvidovat_tooltip = "zlikvidovat_tooltip", zrusit_zlikvidovani = "zrusit_zlikvidovani", zrusit_zlikvidovani_tooltip = "zrusit_zlikvidovani_tooltip", vratit = "vratit", vratit_tooltip = "vratit_tooltip", vyuctovani = "vyuctovani", vyuctovani_tooltip = "vyuctovani_tooltip", financniKontrola = "financniKontrola", financniKontrola_tooltip = "financniKontrola_tooltip", lzeZmenitOsobuRcnNaPrikazu = "lzeZmenitOsobuRcnNaPrikazu", lzeZmenitOsobuRcnNaPrikazu_tooltip = "lzeZmenitOsobuRcnNaPrikazu_tooltip", uzaMimoModul = "uzaMimoModul", uzaMimoModul_tooltip = "uzaMimoModul_tooltip", doVyuctBezZaloh = "doVyuctBezZaloh", doVyuctBezZaloh_tooltip = "doVyuctBezZaloh_tooltip", vratitPreVyuct = "vratitPreVyuct", vratitPreVyuct_tooltip = "vratitPreVyuct_tooltip", opravnyDoklad = "opravnyDoklad", opravnyDoklad_tooltip = "opravnyDoklad_tooltip",}
	const enum GRcnMenuDtoFragments { editace = "*", editace_tooltip = "*", menitStat = "*", menitStat_tooltip = "*", odschvalit = "*", odschvalit_tooltip = "*", predat = "*", predat_tooltip = "*", rezervace = "*", rezervace_tooltip = "*", potvrzeniTiskuSP = "*", potvrzeniTiskuSP_tooltip = "*", schvalit = "*", schvalit_tooltip = "*", stornovat = "*", stornovat_tooltip = "*", vazbaAda = "*", vazbaAda_tooltip = "*", vazbaPcn = "*", vazbaPcn_tooltip = "*", zrusitStorno = "*", zrusitStorno_tooltip = "*", zlikvidovat = "*", zlikvidovat_tooltip = "*", zrusit_zlikvidovani = "*", zrusit_zlikvidovani_tooltip = "*", vratit = "*", vratit_tooltip = "*", vyuctovani = "*", vyuctovani_tooltip = "*", financniKontrola = "*", financniKontrola_tooltip = "*", lzeZmenitOsobuRcnNaPrikazu = "*", lzeZmenitOsobuRcnNaPrikazu_tooltip = "*", uzaMimoModul = "*", uzaMimoModul_tooltip = "*", doVyuctBezZaloh = "*", doVyuctBezZaloh_tooltip = "*", vratitPreVyuct = "*", vratitPreVyuct_tooltip = "*", opravnyDoklad = "*", opravnyDoklad_tooltip = "*",}
	const enum GRcnMenuDtoTypes { editace = "boolean", editace_tooltip = "string", menitStat = "boolean", menitStat_tooltip = "string", odschvalit = "boolean", odschvalit_tooltip = "string", predat = "boolean", predat_tooltip = "string", rezervace = "boolean", rezervace_tooltip = "string", potvrzeniTiskuSP = "boolean", potvrzeniTiskuSP_tooltip = "string", schvalit = "boolean", schvalit_tooltip = "string", stornovat = "boolean", stornovat_tooltip = "string", vazbaAda = "boolean", vazbaAda_tooltip = "string", vazbaPcn = "boolean", vazbaPcn_tooltip = "string", zrusitStorno = "boolean", zrusitStorno_tooltip = "string", zlikvidovat = "boolean", zlikvidovat_tooltip = "string", zrusit_zlikvidovani = "boolean", zrusit_zlikvidovani_tooltip = "string", vratit = "boolean", vratit_tooltip = "string", vyuctovani = "boolean", vyuctovani_tooltip = "string", financniKontrola = "boolean", financniKontrola_tooltip = "string", lzeZmenitOsobuRcnNaPrikazu = "boolean", lzeZmenitOsobuRcnNaPrikazu_tooltip = "string", uzaMimoModul = "boolean", uzaMimoModul_tooltip = "string", doVyuctBezZaloh = "boolean", doVyuctBezZaloh_tooltip = "string", vratitPreVyuct = "boolean", vratitPreVyuct_tooltip = "string", opravnyDoklad = "boolean", opravnyDoklad_tooltip = "string",}
	const enum GRcnMenuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnMenuRezervaceVozidlaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt obsahující povolení akcí menu rezervace vozidla.*/
	interface GRcnMenuRezervaceVozidlaDto {
		/**Pouze ke čtení.*/
		readOnly?: boolean|null;
		/**Možnost předat ke schválení.*/
		predatKeSchvaleni?: boolean|null;
		/**Schválit.*/
		schvalit?: boolean|null;
		/**Zamítnout.*/
		zamitnout?: boolean|null;
		/**Možnost stornovat.*/
		stornovat?: boolean|null;
		/**Sloučit rezervace.*/
		sloucit?: boolean|null;
		/**Nový účastník.*/
		ucastnikNovy?: boolean|null;
		/**Odstranit účastníka.*/
		ucastnikOdstranit?: boolean|null;
		/**Kopírovat účcastníka.*/
		ucastnikKopirovat?: boolean|null;
	}
	const enum GRcnMenuRezervaceVozidlaDtoNames { readOnly = "readOnly", predatKeSchvaleni = "predatKeSchvaleni", schvalit = "schvalit", zamitnout = "zamitnout", stornovat = "stornovat", sloucit = "sloucit", ucastnikNovy = "ucastnikNovy", ucastnikOdstranit = "ucastnikOdstranit", ucastnikKopirovat = "ucastnikKopirovat",}
	const enum GRcnMenuRezervaceVozidlaDtoFragments { readOnly = "*", predatKeSchvaleni = "*", schvalit = "*", zamitnout = "*", stornovat = "*", sloucit = "*", ucastnikNovy = "*", ucastnikOdstranit = "*", ucastnikKopirovat = "*",}
	const enum GRcnMenuRezervaceVozidlaDtoTypes { readOnly = "boolean", predatKeSchvaleni = "boolean", schvalit = "boolean", zamitnout = "boolean", stornovat = "boolean", sloucit = "boolean", ucastnikNovy = "boolean", ucastnikOdstranit = "boolean", ucastnikKopirovat = "boolean",}
	const enum GRcnMenuRezervaceVozidlaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnMenuSluzebniVozidloDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující povolení akcí menu služebního vozidla.*/
	interface GRcnMenuSluzebniVozidloDto {
		/**Možnost schválit.*/
		schvalit?: boolean|null;
		/**Viditelnost seznamu bez omezení.*/
		videtSeznamAusBezOmezeni?: boolean|null;
		/**Zařazení dle NKS(jinak ORJ).*/
		zarazeniDleNks?: boolean|null;
		/**Možnost storna.*/
		storno?: boolean|null;
		/**Editační režim.*/
		editacniRezim?: boolean|null;
		/**Pořízení nových.*/
		porizeniNovych?: boolean|null;
	}
	const enum GRcnMenuSluzebniVozidloDtoNames { schvalit = "schvalit", videtSeznamAusBezOmezeni = "videtSeznamAusBezOmezeni", zarazeniDleNks = "zarazeniDleNks", storno = "storno", editacniRezim = "editacniRezim", porizeniNovych = "porizeniNovych",}
	const enum GRcnMenuSluzebniVozidloDtoFragments { schvalit = "*", videtSeznamAusBezOmezeni = "*", zarazeniDleNks = "*", storno = "*", editacniRezim = "*", porizeniNovych = "*",}
	const enum GRcnMenuSluzebniVozidloDtoTypes { schvalit = "boolean", videtSeznamAusBezOmezeni = "boolean", zarazeniDleNks = "boolean", storno = "boolean", editacniRezim = "boolean", porizeniNovych = "boolean",}
	const enum GRcnMenuSluzebniVozidloDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnOsobaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující osoby RCN.*/
	interface GRcnOsobaDto {
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Kód typu osoby.*/
		typ_osr?: number|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Titul před.*/
		tit_pred?: string|null;
		/**Titul za.*/
		tit_za?: string|null;
		/**Hodnost.*/
		hodnost?: string|null;
		/**Osobní číslo.*/
		os_cislo?: string|null;
		/**Identifikátor externího subjektu.*/
		ixs_esu?: string|null;
		/**Identifikátor referenta.*/
		ixs_ref?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Identifikátor organizační jednotky.*/
		ixs_orj?: string|null;
		/**Adresa.*/
		adresa?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Výkon.*/
		vkn?: string|null;
		/**Kód typu osoby.*/
		typ_dos?: number|null;
		/**Identifikátor typu osoby.*/
		ixs_tos?: string|null;
		/**Kód vztahu osoby k akci.*/
		stav_dos?: number|null;
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
		/**Účtárna textově.*/
		uus_txt?: string|null;
		/**Organizační jednotka textově.*/
		ixs_orj_txt?: string|null;
		/**Platební karty.*/
		plkarty?: string|null;
		/**Typ osoby textově.*/
		readonly typ_osr_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Typ seznamu.*/
		typ_sez?: number|null;
		/**Původní identifikáotr zdroje osoby.*/
		ixs_puv?: string|null;
		/**Psč.*/
		psc?: string|null;
		/**Obec.*/
		obec?: string|null;
		/**Část obce.*/
		cast_obce?: string|null;
		/**Ulice.*/
		ulice?: string|null;
		/**Čor.*/
		cor?: string|null;
		/**Čpop.*/
		cpop?: string|null;
		/**Adresa.*/
		readonly adresa_txt?: string|null;
	}
	const enum GRcnOsobaDtoNames { ixs_osr = "ixs_osr", typ_osr = "typ_osr", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", hodnost = "hodnost", os_cislo = "os_cislo", ixs_esu = "ixs_esu", ixs_ref = "ixs_ref", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ico = "ico", ucs = "ucs", uus = "uus", ixs_orj = "ixs_orj", adresa = "adresa", nks = "nks", vkn = "vkn", typ_dos = "typ_dos", ixs_tos = "ixs_tos", stav_dos = "stav_dos", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", uus_txt = "uus_txt", ixs_orj_txt = "ixs_orj_txt", plkarty = "plkarty", typ_osr_txt = "typ_osr_txt", pocet = "pocet", typ_sez = "typ_sez", ixs_puv = "ixs_puv", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", adresa_txt = "adresa_txt",}
	const enum GRcnOsobaDtoFragments { ixs_osr = "main", typ_osr = "main", jmeno = "main", prijmeni = "main", tit_pred = "main", tit_za = "main", hodnost = "main", os_cislo = "main", ixs_esu = "main", ixs_ref = "main", dat_od = "main", dat_do = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev = "main", ico = "main", ucs = "main", uus = "main", ixs_orj = "main", adresa = "main", nks = "main", vkn = "main", typ_dos = "main", ixs_tos = "main", stav_dos = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", uus_txt = "uus_txt", ixs_orj_txt = "ixs_orj_txt", plkarty = "plkarty", typ_osr_txt = "main", pocet = "main", typ_sez = "main", ixs_puv = "main", psc = "main", obec = "main", cast_obce = "main", ulice = "main", cor = "main", cpop = "main", adresa_txt = "main",}
	const enum GRcnOsobaDtoTypes { ixs_osr = "string", typ_osr = "number", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", hodnost = "string", os_cislo = "string", ixs_esu = "string", ixs_ref = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ico = "string", ucs = "string", uus = "string", ixs_orj = "string", adresa = "string", nks = "string", vkn = "string", typ_dos = "number", ixs_tos = "string", stav_dos = "number", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", uus_txt = "string", ixs_orj_txt = "string", plkarty = "string", typ_osr_txt = "string", pocet = "number", typ_sez = "number", ixs_puv = "string", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", adresa_txt = "string",}
	const enum GRcnOsobaDtoTypeLengths { ixs_osr = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, hodnost = 15, os_cislo = 30, ixs_esu = 12, ixs_ref = 12, poznamka = 254, zmenu_prov = 12, nazev = 254, ico = 10, ucs = 10, uus = 10, ixs_orj = 12, adresa = 254, nks = 12, vkn = 20, ixs_tos = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnOsobaRidicDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující řidiče na osobě.*/
	interface GRcnOsobaRidicDto {
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Datum akce.*/
		dat_akce?: JsonDate|null;
		/**Datum platnosti do.*/
		dat_plat_do?: JsonDate|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název osoby.*/
		ixs_osr_txt?: string|null;
	}
	const enum GRcnOsobaRidicDtoNames { ixs_osr = "ixs_osr", radek = "radek", popis = "popis", poznamka = "poznamka", dat_akce = "dat_akce", dat_plat_do = "dat_plat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_osr_txt = "ixs_osr_txt",}
	const enum GRcnOsobaRidicDtoFragments { ixs_osr = "main", radek = "main", popis = "main", poznamka = "main", dat_akce = "main", dat_plat_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_osr_txt = "ixs_osr_txt",}
	const enum GRcnOsobaRidicDtoTypes { ixs_osr = "string", radek = "number", popis = "string", poznamka = "string", dat_akce = "JsonDate", dat_plat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_osr_txt = "string",}
	const enum GRcnOsobaRidicDtoTypeLengths { ixs_osr = 12, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPasDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující pas.*/
	interface GRcnPasDto {
		/**Identifikátor pasu.*/
		ixp_pas?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Číslo pasu.*/
		cislo_pas?: string|null;
		/**Kód druhu pasu.*/
		druh_pas?: number|null;
		/**Kód typu pasu.*/
		typ_pas?: number|null;
		/**Kód stavu pasu.*/
		stav_pas?: number|null;
		/**Kód způsobu znehodnocení.*/
		zp_zneh?: number|null;
		/**Datum platnosti.*/
		dat_platnost?: JsonDate|null;
		/**Datum evidence od.*/
		dat_evi_od?: JsonDate|null;
		/**Datum evidence do.*/
		dat_evi_do?: JsonDate|null;
		/**Datum vydání osobě.*/
		dat_vyd_oso?: JsonDate|null;
		/**Kontakt osoby.*/
		kontakt_oso?: string|null;
		/**Datum vrácení.*/
		dat_nav_oso?: JsonDate|null;
		/**Datum vyřazení.*/
		dat_vra?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Vydáno do.*/
		dat_vyd_do?: JsonDate|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
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
		/**Druh pasu textově.*/
		druh_pas_txt?: string|null;
		/**Kniha textově.*/
		ixp_den_txt?: string|null;
		/**Stav pasu textově.*/
		stav_pas_txt?: string|null;
		/**Typ pasu textově.*/
		typ_pas_txt?: string|null;
		/**Způsob znehodnocení textově.*/
		zp_zneh_txt?: string|null;
		/**Název osoby.*/
		ixs_osr_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnPasDtoNames { ixp_pas = "ixp_pas", ixp_den = "ixp_den", rok = "rok", ac = "ac", evi_cis = "evi_cis", cislo_pas = "cislo_pas", druh_pas = "druh_pas", typ_pas = "typ_pas", stav_pas = "stav_pas", zp_zneh = "zp_zneh", dat_platnost = "dat_platnost", dat_evi_od = "dat_evi_od", dat_evi_do = "dat_evi_do", dat_vyd_oso = "dat_vyd_oso", kontakt_oso = "kontakt_oso", dat_nav_oso = "dat_nav_oso", dat_vra = "dat_vra", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vyd_do = "dat_vyd_do", ixs_osr = "ixs_osr", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", druh_pas_txt = "druh_pas_txt", ixp_den_txt = "ixp_den_txt", stav_pas_txt = "stav_pas_txt", typ_pas_txt = "typ_pas_txt", zp_zneh_txt = "zp_zneh_txt", ixs_osr_txt = "ixs_osr_txt", pocet = "pocet",}
	const enum GRcnPasDtoFragments { ixp_pas = "main", ixp_den = "main", rok = "main", ac = "main", evi_cis = "main", cislo_pas = "main", druh_pas = "main", typ_pas = "main", stav_pas = "main", zp_zneh = "main", dat_platnost = "main", dat_evi_od = "main", dat_evi_do = "main", dat_vyd_oso = "main", kontakt_oso = "main", dat_nav_oso = "main", dat_vra = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", dat_vyd_do = "main", ixs_osr = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", druh_pas_txt = "druh_pas_txt", ixp_den_txt = "ixp_den_txt", stav_pas_txt = "stav_pas_txt", typ_pas_txt = "typ_pas_txt", zp_zneh_txt = "zp_zneh_txt", ixs_osr_txt = "ixs_osr_txt", pocet = "main",}
	const enum GRcnPasDtoTypes { ixp_pas = "string", ixp_den = "string", rok = "number", ac = "string", evi_cis = "string", cislo_pas = "string", druh_pas = "number", typ_pas = "number", stav_pas = "number", zp_zneh = "number", dat_platnost = "JsonDate", dat_evi_od = "JsonDate", dat_evi_do = "JsonDate", dat_vyd_oso = "JsonDate", kontakt_oso = "string", dat_nav_oso = "JsonDate", dat_vra = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vyd_do = "JsonDate", ixs_osr = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", druh_pas_txt = "string", ixp_den_txt = "string", stav_pas_txt = "string", typ_pas_txt = "string", zp_zneh_txt = "string", ixs_osr_txt = "string", pocet = "number",}
	const enum GRcnPasDtoTypeLengths { ixp_pas = 12, ixp_den = 12, ac = 20, evi_cis = 20, cislo_pas = 30, kontakt_oso = 150, poznamka = 254, zmenu_prov = 12, ixs_osr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPlatebniKartaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující platební kartu.*/
	interface GRcnPlatebniKartaDto {
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Číslo karty.*/
		cislo_plk?: string|null;
		/**Kód typu karty.*/
		typ_plk?: number|null;
		/**Kód stavu karty.*/
		stav_plk?: number|null;
		/**Účet.*/
		ucet?: string|null;
		/**Banka.*/
		banka?: string|null;
		/**Datum platnosti.*/
		dat_platnost?: JsonDate|null;
		/**Částka limit atm.*/
		c_limit_atm?: JsonDecimal|null;
		/**Částka limit hotovosti.*/
		c_limit_cas?: JsonDecimal|null;
		/**Částka limit agregovaný.*/
		c_limit_agr?: JsonDecimal|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Popis.*/
		popis?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
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
		/**Bankovní účet vlastní.*/
		readonly bu_vl?: string|null;
		/**Směrový kód vlastního účtu.*/
		readonly sk_vl?: string|null;
		/**Název vozidla.*/
		ixp_aus_txt?: string|null;
		/**Stav karty textově.*/
		stav_plk_txt?: string|null;
		/**Typ karty textově.*/
		typ_plk_txt?: string|null;
		/**Název osoby.*/
		ixs_osr_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnPlatebniKartaDtoNames { ixp_plk = "ixp_plk", ixp_den = "ixp_den", rok = "rok", ac = "ac", evi_cis = "evi_cis", cislo_plk = "cislo_plk", typ_plk = "typ_plk", stav_plk = "stav_plk", ucet = "ucet", banka = "banka", dat_platnost = "dat_platnost", c_limit_atm = "c_limit_atm", c_limit_cas = "c_limit_cas", c_limit_agr = "c_limit_agr", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_osr = "ixs_osr", ico = "ico", ucs = "ucs", uus = "uus", ixp_aus = "ixp_aus", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", bu_vl = "bu_vl", sk_vl = "sk_vl", ixp_aus_txt = "ixp_aus_txt", stav_plk_txt = "stav_plk_txt", typ_plk_txt = "typ_plk_txt", ixs_osr_txt = "ixs_osr_txt", pocet = "pocet",}
	const enum GRcnPlatebniKartaDtoFragments { ixp_plk = "main", ixp_den = "main", rok = "main", ac = "main", evi_cis = "main", cislo_plk = "main", typ_plk = "main", stav_plk = "main", ucet = "main", banka = "main", dat_platnost = "main", c_limit_atm = "main", c_limit_cas = "main", c_limit_agr = "main", dat_od = "main", dat_do = "main", popis = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_osr = "main", ico = "main", ucs = "main", uus = "main", ixp_aus = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", bu_vl = "*", sk_vl = "*", ixp_aus_txt = "ixp_aus_txt", stav_plk_txt = "stav_plk_txt", typ_plk_txt = "typ_plk_txt", ixs_osr_txt = "ixs_osr_txt", pocet = "main",}
	const enum GRcnPlatebniKartaDtoTypes { ixp_plk = "string", ixp_den = "string", rok = "number", ac = "string", evi_cis = "string", cislo_plk = "string", typ_plk = "number", stav_plk = "number", ucet = "string", banka = "string", dat_platnost = "JsonDate", c_limit_atm = "JsonDecimal", c_limit_cas = "JsonDecimal", c_limit_agr = "JsonDecimal", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_osr = "string", ico = "string", ucs = "string", uus = "string", ixp_aus = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", bu_vl = "string", sk_vl = "string", ixp_aus_txt = "string", stav_plk_txt = "string", typ_plk_txt = "string", ixs_osr_txt = "string", pocet = "number",}
	const enum GRcnPlatebniKartaDtoTypeLengths { ixp_plk = 12, ixp_den = 12, ac = 20, evi_cis = 20, cislo_plk = 30, ucet = 100, banka = 254, popis = 254, zmenu_prov = 12, ixs_osr = 12, ico = 10, ucs = 10, uus = 10, ixp_aus = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPlatebniKartaVyuzitiDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující využití platební karty.*/
	interface GRcnPlatebniKartaVyuzitiDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Stav příkazu textově.*/
		stav_prik_txt?: string|null;
		/**Název osoby.*/
		ixs_osr_txt?: string|null;
		/**Popis zálohy.*/
		popis_zal?: string|null;
		/**Zkratka příznaku zálohy.*/
		priz_zal_zkr?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Častka v CZK.*/
		c?: JsonDecimal|null;
		/**Datum nástupu na příkaze.*/
		dat_n?: JsonDate|null;
		/**Datum ukončení na příkaze.*/
		dat_u?: JsonDate|null;
		/**Stát textově.*/
		stat_txt?: string|null;
	}
	const enum GRcnPlatebniKartaVyuzitiDtoNames { ixp = "ixp", ixp_plk = "ixp_plk", stav_prik_txt = "stav_prik_txt", ixs_osr_txt = "ixs_osr_txt", popis_zal = "popis_zal", priz_zal_zkr = "priz_zal_zkr", c_mena = "c_mena", mena_zkr = "mena_zkr", c = "c", dat_n = "dat_n", dat_u = "dat_u", stat_txt = "stat_txt",}
	const enum GRcnPlatebniKartaVyuzitiDtoFragments { ixp = "main", ixp_plk = "main", stav_prik_txt = "main", ixs_osr_txt = "main", popis_zal = "main", priz_zal_zkr = "main", c_mena = "main", mena_zkr = "main", c = "main", dat_n = "main", dat_u = "main", stat_txt = "main",}
	const enum GRcnPlatebniKartaVyuzitiDtoTypes { ixp = "string", ixp_plk = "string", stav_prik_txt = "string", ixs_osr_txt = "string", popis_zal = "string", priz_zal_zkr = "string", c_mena = "JsonDecimal", mena_zkr = "string", c = "JsonDecimal", dat_n = "JsonDate", dat_u = "JsonDate", stat_txt = "string",}
	const enum GRcnPlatebniKartaVyuzitiDtoTypeLengths { ixp = 12, ixp_plk = 12, stav_prik_txt = 50, ixs_osr_txt = 254, popis_zal = 50, priz_zal_zkr = 15, mena_zkr = 16, stat_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPlatebniKartaZadostDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující žádost o vydání platební karty.*/
	interface GRcnPlatebniKartaZadostDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Pořadí.*/
		poradi?: number|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Datum žádosti.*/
		dat_zadost?: JsonDate|null;
		/**Idenmtifikátor funkce zadavatele.*/
		ixs_fun_zad?: string|null;
		/**Datum vyřízení.*/
		dat_vyrizeni?: JsonDate|null;
		/**Kód způsobu vyřízení.*/
		zp_vyriz?: number|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**Popis vyřízení.*/
		popis_vyriz?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název příkazu.*/
		ixp_txt?: string|null;
		/**Číslo platební karty.*/
		ixp_plk_txt?: string|null;
		/**Funkce zadavatele textově.*/
		ixs_fun_zad_txt?: string|null;
		/**Způsob vyřízení textově.*/
		zp_vyriz_txt?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Název osoby.*/
		ixs_osr_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnPlatebniKartaZadostDtoNames { ixp = "ixp", poradi = "poradi", ixp_plk = "ixp_plk", dat_zadost = "dat_zadost", ixs_fun_zad = "ixs_fun_zad", dat_vyrizeni = "dat_vyrizeni", zp_vyriz = "zp_vyriz", dat_do = "dat_do", popis_vyriz = "popis_vyriz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_txt = "ixp_txt", ixp_plk_txt = "ixp_plk_txt", ixs_fun_zad_txt = "ixs_fun_zad_txt", zp_vyriz_txt = "zp_vyriz_txt", ixs_osr = "ixs_osr", ixs_osr_txt = "ixs_osr_txt", pocet = "pocet",}
	const enum GRcnPlatebniKartaZadostDtoFragments { ixp = "main", poradi = "main", ixp_plk = "main", dat_zadost = "main", ixs_fun_zad = "main", dat_vyrizeni = "main", zp_vyriz = "main", dat_do = "main", popis_vyriz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_txt = "ixp_txt", ixp_plk_txt = "ixp_plk_txt", ixs_fun_zad_txt = "ixs_fun_zad_txt", zp_vyriz_txt = "zp_vyriz_txt", ixs_osr = "*", ixs_osr_txt = "*", pocet = "main",}
	const enum GRcnPlatebniKartaZadostDtoTypes { ixp = "string", poradi = "number", ixp_plk = "string", dat_zadost = "JsonDate", ixs_fun_zad = "string", dat_vyrizeni = "JsonDate", zp_vyriz = "number", dat_do = "JsonDate", popis_vyriz = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_txt = "string", ixp_plk_txt = "string", ixs_fun_zad_txt = "string", zp_vyriz_txt = "string", ixs_osr = "string", ixs_osr_txt = "string", pocet = "number",}
	const enum GRcnPlatebniKartaZadostDtoTypeLengths { ixp = 12, ixp_plk = 12, ixs_fun_zad = 12, popis_vyriz = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPodporaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt pro podpůrné metody RCN.*/
	interface GRcnPodporaDto {
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
	}
	const enum GRcnPodporaDtoNames { ixp = "ixp", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks",}
	const enum GRcnPodporaDtoFragments { ixp = "*", ico = "*", ucs = "*", uus = "*", nks = "*",}
	const enum GRcnPodporaDtoTypes { ixp = "string", ico = "string", ucs = "string", uus = "string", nks = "string",}
	const enum GRcnPodporaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPokDokladDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující pokladní doklad na záloze příkazu.*/
	interface GRcnPokDokladDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Kód kontace.*/
		kod_kon?: string|null;
		/**Částka celkem v měně.*/
		c_celkem_m?: JsonDecimal|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Částka celkem v CZK.*/
		c_celkem?: JsonDecimal|null;
		/**Druh dokladu.*/
		druh_dok?: number|null;
		/**Zkratka měny.*/
		mena_txt?: string|null;
		/**Kód měny.*/
		mena?: number|null;
	}
	const enum GRcnPokDokladDtoNames { ixp = "ixp", radek = "radek", ac = "ac", nks = "nks", nazev = "nazev", kod_kon = "kod_kon", c_celkem_m = "c_celkem_m", kurz = "kurz", c_celkem = "c_celkem", druh_dok = "druh_dok", mena_txt = "mena_txt", mena = "mena",}
	const enum GRcnPokDokladDtoFragments { ixp = "*", radek = "*", ac = "*", nks = "*", nazev = "*", kod_kon = "*", c_celkem_m = "*", kurz = "*", c_celkem = "*", druh_dok = "*", mena_txt = "*", mena = "*",}
	const enum GRcnPokDokladDtoTypes { ixp = "string", radek = "number", ac = "string", nks = "string", nazev = "string", kod_kon = "string", c_celkem_m = "JsonDecimal", kurz = "JsonDecimal", c_celkem = "JsonDecimal", druh_dok = "number", mena_txt = "string", mena = "number",}
	const enum GRcnPokDokladDtoTypeLengths { ixp = 12, ac = 20, nks = 12, nazev = 254, kod_kon = 30, mena_txt = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPoznamkaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující poznámky pro cesty a příkazy.*/
	interface GRcnPoznamkaDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Typ poznámky.*/
		typ_rcndpoz?: number|null;
		/**Pořadové číslo.*/
		por_cislo?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Subřádek.*/
		sub_radek?: number|null;
		/**Pro create - prvotní výmaz.*/
		prizFirst?: number|null;
		/**Změnu proved textově.*/
		zmenu_prov_txt?: string|null;
	}
	const enum GRcnPoznamkaDtoNames { ixp = "ixp", typ_rcndpoz = "typ_rcndpoz", por_cislo = "por_cislo", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sub_radek = "sub_radek", prizFirst = "prizFirst", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GRcnPoznamkaDtoFragments { ixp = "*", typ_rcndpoz = "*", por_cislo = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", sub_radek = "*", prizFirst = "*", zmenu_prov_txt = "*",}
	const enum GRcnPoznamkaDtoTypes { ixp = "string", typ_rcndpoz = "number", por_cislo = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", sub_radek = "number", prizFirst = "number", zmenu_prov_txt = "string",}
	const enum GRcnPoznamkaDtoTypeLengths { ixp = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPreceneniFucDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující Přecenění záloh založených jako případ do FUC.*/
	interface GRcnPreceneniFucDto {
		/**Rok.*/
		rok?: number|null;
		/**Identifikátor upr.*/
		ixp_upr?: string|null;
		/**Ktg Typ.*/
		ktg_typ?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**C celk.*/
		c_celk?: JsonDecimal|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
	}
	const enum GRcnPreceneniFucDtoNames { rok = "rok", ixp_upr = "ixp_upr", ktg_typ = "ktg_typ", ac = "ac", popis = "popis", c_celk = "c_celk", dat_zmena = "dat_zmena",}
	const enum GRcnPreceneniFucDtoFragments { rok = "main", ixp_upr = "main", ktg_typ = "main", ac = "main", popis = "main", c_celk = "main", dat_zmena = "main",}
	const enum GRcnPreceneniFucDtoTypes { rok = "number", ixp_upr = "string", ktg_typ = "number", ac = "string", popis = "string", c_celk = "JsonDecimal", dat_zmena = "JsonDate",}
	const enum GRcnPreceneniFucDtoTypeLengths { ixp_upr = 25, ac = 61, popis = 509,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrehledRozpoctuDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující přehled rozpočtu.*/
	interface GRcnPrehledRozpoctuDto {
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Xuete.*/
		xuete?: string|null;
		/**Druh dokladu.*/
		drd?: number|null;
		/**Měsíc.*/
		mesic?: number|null;
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
		/**Kc0.*/
		kc0?: JsonDecimal|null;
		/**Kc1.*/
		kc1?: JsonDecimal|null;
		/**Sm0.*/
		sm0?: JsonDecimal|null;
		/**Sm1.*/
		sm1?: JsonDecimal|null;
		/**Km0.*/
		km0?: JsonDecimal|null;
		/**Km1.*/
		km1?: JsonDecimal|null;
		/**Mj.*/
		mj?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**C0_23.*/
		c0_23?: JsonDecimal|null;
		/**C1_23.*/
		c1_23?: JsonDecimal|null;
		/**C0_13.*/
		c0_13?: JsonDecimal|null;
		/**C1_13.*/
		c1_13?: JsonDecimal|null;
		/**C0_14.*/
		c0_14?: JsonDecimal|null;
		/**C1_14.*/
		c1_14?: JsonDecimal|null;
		/**C0_24.*/
		c0_24?: JsonDecimal|null;
		/**C1_24.*/
		c1_24?: JsonDecimal|null;
		/**C0_25.*/
		c0_25?: JsonDecimal|null;
		/**C1_25.*/
		c1_25?: JsonDecimal|null;
		/**C0_26.*/
		c0_26?: JsonDecimal|null;
		/**C1_26.*/
		c1_26?: JsonDecimal|null;
		/**C0_30.*/
		c0_30?: JsonDecimal|null;
		/**C1_30.*/
		c1_30?: JsonDecimal|null;
		/**C0_31.*/
		c0_31?: JsonDecimal|null;
		/**C1_31.*/
		c1_31?: JsonDecimal|null;
		/**C0_0.*/
		c0_0?: JsonDecimal|null;
		/**C1_0.*/
		c1_0?: JsonDecimal|null;
		/**C0_2.*/
		c0_2?: JsonDecimal|null;
		/**C1_2.*/
		c1_2?: JsonDecimal|null;
		/**C0_3.*/
		c0_3?: JsonDecimal|null;
		/**C1_3.*/
		c1_3?: JsonDecimal|null;
		/**C0_6.*/
		c0_6?: JsonDecimal|null;
		/**C1_6.*/
		c1_6?: JsonDecimal|null;
		/**C0_7.*/
		c0_7?: JsonDecimal|null;
		/**C1_7.*/
		c1_7?: JsonDecimal|null;
		/**C0_8.*/
		c0_8?: JsonDecimal|null;
		/**C1_8.*/
		c1_8?: JsonDecimal|null;
		/**C0_10.*/
		c0_10?: JsonDecimal|null;
		/**C1_10.*/
		c1_10?: JsonDecimal|null;
		/**C0_11.*/
		c0_11?: JsonDecimal|null;
		/**C1_11.*/
		c1_11?: JsonDecimal|null;
		/**C0_12.*/
		c0_12?: JsonDecimal|null;
		/**C1_12.*/
		c1_12?: JsonDecimal|null;
		/**C0_15.*/
		c0_15?: JsonDecimal|null;
		/**C1_15.*/
		c1_15?: JsonDecimal|null;
		/**C0_16.*/
		c0_16?: JsonDecimal|null;
		/**C1_16.*/
		c1_16?: JsonDecimal|null;
		/**C0_17.*/
		c0_17?: JsonDecimal|null;
		/**C1_17.*/
		c1_17?: JsonDecimal|null;
		/**C0_18.*/
		c0_18?: JsonDecimal|null;
		/**C1_18.*/
		c1_18?: JsonDecimal|null;
		/**C0_22.*/
		c0_22?: JsonDecimal|null;
		/**C1_22.*/
		c1_22?: JsonDecimal|null;
		/**Ca_0.*/
		ca_0?: JsonDecimal|null;
		/**Cb_0.*/
		cb_0?: JsonDecimal|null;
		/**Ca_6.*/
		ca_6?: JsonDecimal|null;
		/**Cb_6.*/
		cb_6?: JsonDecimal|null;
		/**Ca_18.*/
		ca_18?: JsonDecimal|null;
		/**Cb_18.*/
		cb_18?: JsonDecimal|null;
		/**Příznak char.*/
		priz_char?: number|null;
		/**Druh char.*/
		druh_char?: number|null;
		/**C0_21.*/
		c0_21?: JsonDecimal|null;
		/**C1_21.*/
		c1_21?: JsonDecimal|null;
		/**C0_34.*/
		c0_34?: JsonDecimal|null;
		/**C1_34.*/
		c1_34?: JsonDecimal|null;
		/**C0_54.*/
		c0_54?: JsonDecimal|null;
		/**C1_54.*/
		c1_54?: JsonDecimal|null;
		/**C0_66.*/
		c0_66?: JsonDecimal|null;
		/**C1_66.*/
		c1_66?: JsonDecimal|null;
		/**C0_62.*/
		c0_62?: JsonDecimal|null;
		/**C1_62.*/
		c1_62?: JsonDecimal|null;
		/**C0_63.*/
		c0_63?: JsonDecimal|null;
		/**C1_63.*/
		c1_63?: JsonDecimal|null;
		/**C0_67.*/
		c0_67?: JsonDecimal|null;
		/**C1_67.*/
		c1_67?: JsonDecimal|null;
		/**C0_68.*/
		c0_68?: JsonDecimal|null;
		/**C1_68.*/
		c1_68?: JsonDecimal|null;
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
		/**Rozpočet.*/
		readonly rozpocet?: JsonDecimal|null;
		/**Blokace.*/
		readonly blokace?: JsonDecimal|null;
		/**Rezervace.*/
		readonly rezervace?: JsonDecimal|null;
		/**Čerpání.*/
		readonly cerpani?: JsonDecimal|null;
		/**Volné.*/
		readonly volne?: JsonDecimal|null;
		/**Kalkulace.*/
		kalkulace?: JsonDecimal|null;
		/**Rozpočtováno.*/
		c_kc?: JsonDecimal|null;
		/**Blokováno.*/
		c_vz?: JsonDecimal|null;
		/**Rezervováno.*/
		c_fak?: JsonDecimal|null;
		/**Identifikátor plánu.*/
		ixs_pla?: string|null;
		/**Číslo plánu.*/
		cislo?: string|null;
		/**Identifikátor funkce.*/
		ixs_fun?: string|null;
		/**Název funkce.*/
		ixs_fun_txt?: string|null;
		/**Název.*/
		nazev?: string|null;
	}
	const enum GRcnPrehledRozpoctuDtoNames { ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", xuete = "xuete", drd = "drd", mesic = "mesic", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", kc0 = "kc0", kc1 = "kc1", sm0 = "sm0", sm1 = "sm1", km0 = "km0", km1 = "km1", mj = "mj", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_23 = "c0_23", c1_23 = "c1_23", c0_13 = "c0_13", c1_13 = "c1_13", c0_14 = "c0_14", c1_14 = "c1_14", c0_24 = "c0_24", c1_24 = "c1_24", c0_25 = "c0_25", c1_25 = "c1_25", c0_26 = "c0_26", c1_26 = "c1_26", c0_30 = "c0_30", c1_30 = "c1_30", c0_31 = "c0_31", c1_31 = "c1_31", c0_0 = "c0_0", c1_0 = "c1_0", c0_2 = "c0_2", c1_2 = "c1_2", c0_3 = "c0_3", c1_3 = "c1_3", c0_6 = "c0_6", c1_6 = "c1_6", c0_7 = "c0_7", c1_7 = "c1_7", c0_8 = "c0_8", c1_8 = "c1_8", c0_10 = "c0_10", c1_10 = "c1_10", c0_11 = "c0_11", c1_11 = "c1_11", c0_12 = "c0_12", c1_12 = "c1_12", c0_15 = "c0_15", c1_15 = "c1_15", c0_16 = "c0_16", c1_16 = "c1_16", c0_17 = "c0_17", c1_17 = "c1_17", c0_18 = "c0_18", c1_18 = "c1_18", c0_22 = "c0_22", c1_22 = "c1_22", ca_0 = "ca_0", cb_0 = "cb_0", ca_6 = "ca_6", cb_6 = "cb_6", ca_18 = "ca_18", cb_18 = "cb_18", priz_char = "priz_char", druh_char = "druh_char", c0_21 = "c0_21", c1_21 = "c1_21", c0_34 = "c0_34", c1_34 = "c1_34", c0_54 = "c0_54", c1_54 = "c1_54", c0_66 = "c0_66", c1_66 = "c1_66", c0_62 = "c0_62", c1_62 = "c1_62", c0_63 = "c0_63", c1_63 = "c1_63", c0_67 = "c0_67", c1_67 = "c1_67", c0_68 = "c0_68", c1_68 = "c1_68", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", rozpocet = "rozpocet", blokace = "blokace", rezervace = "rezervace", cerpani = "cerpani", volne = "volne", kalkulace = "kalkulace", c_kc = "c_kc", c_vz = "c_vz", c_fak = "c_fak", ixs_pla = "ixs_pla", cislo = "cislo", ixs_fun = "ixs_fun", ixs_fun_txt = "ixs_fun_txt", nazev = "nazev",}
	const enum GRcnPrehledRozpoctuDtoFragments { ico = "main", ucs = "main", nks = "main", rok = "main", xuete = "main", drd = "main", mesic = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", kc0 = "main", kc1 = "main", sm0 = "main", sm1 = "main", km0 = "main", km1 = "main", mj = "main", dat_zmena = "main", zmenu_prov = "main", c0_23 = "main", c1_23 = "main", c0_13 = "main", c1_13 = "main", c0_14 = "main", c1_14 = "main", c0_24 = "main", c1_24 = "main", c0_25 = "main", c1_25 = "main", c0_26 = "main", c1_26 = "main", c0_30 = "main", c1_30 = "main", c0_31 = "main", c1_31 = "main", c0_0 = "main", c1_0 = "main", c0_2 = "main", c1_2 = "main", c0_3 = "main", c1_3 = "main", c0_6 = "main", c1_6 = "main", c0_7 = "main", c1_7 = "main", c0_8 = "main", c1_8 = "main", c0_10 = "main", c1_10 = "main", c0_11 = "main", c1_11 = "main", c0_12 = "main", c1_12 = "main", c0_15 = "main", c1_15 = "main", c0_16 = "main", c1_16 = "main", c0_17 = "main", c1_17 = "main", c0_18 = "main", c1_18 = "main", c0_22 = "main", c1_22 = "main", ca_0 = "main", cb_0 = "main", ca_6 = "main", cb_6 = "main", ca_18 = "main", cb_18 = "main", priz_char = "main", druh_char = "main", c0_21 = "main", c1_21 = "main", c0_34 = "main", c1_34 = "main", c0_54 = "main", c1_54 = "main", c0_66 = "main", c1_66 = "main", c0_62 = "main", c1_62 = "main", c0_63 = "main", c1_63 = "main", c0_67 = "main", c1_67 = "main", c0_68 = "main", c1_68 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", rozpocet = "rozpocet", blokace = "blokace", rezervace = "rezervace", cerpani = "cerpani", volne = "volne", kalkulace = "kalkulace", c_kc = "*", c_vz = "*", c_fak = "*", ixs_pla = "*", cislo = "*", ixs_fun = "*", ixs_fun_txt = "*", nazev = "*",}
	const enum GRcnPrehledRozpoctuDtoTypes { ico = "string", ucs = "string", nks = "string", rok = "number", xuete = "string", drd = "number", mesic = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", kc0 = "JsonDecimal", kc1 = "JsonDecimal", sm0 = "JsonDecimal", sm1 = "JsonDecimal", km0 = "JsonDecimal", km1 = "JsonDecimal", mj = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c0_23 = "JsonDecimal", c1_23 = "JsonDecimal", c0_13 = "JsonDecimal", c1_13 = "JsonDecimal", c0_14 = "JsonDecimal", c1_14 = "JsonDecimal", c0_24 = "JsonDecimal", c1_24 = "JsonDecimal", c0_25 = "JsonDecimal", c1_25 = "JsonDecimal", c0_26 = "JsonDecimal", c1_26 = "JsonDecimal", c0_30 = "JsonDecimal", c1_30 = "JsonDecimal", c0_31 = "JsonDecimal", c1_31 = "JsonDecimal", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c0_2 = "JsonDecimal", c1_2 = "JsonDecimal", c0_3 = "JsonDecimal", c1_3 = "JsonDecimal", c0_6 = "JsonDecimal", c1_6 = "JsonDecimal", c0_7 = "JsonDecimal", c1_7 = "JsonDecimal", c0_8 = "JsonDecimal", c1_8 = "JsonDecimal", c0_10 = "JsonDecimal", c1_10 = "JsonDecimal", c0_11 = "JsonDecimal", c1_11 = "JsonDecimal", c0_12 = "JsonDecimal", c1_12 = "JsonDecimal", c0_15 = "JsonDecimal", c1_15 = "JsonDecimal", c0_16 = "JsonDecimal", c1_16 = "JsonDecimal", c0_17 = "JsonDecimal", c1_17 = "JsonDecimal", c0_18 = "JsonDecimal", c1_18 = "JsonDecimal", c0_22 = "JsonDecimal", c1_22 = "JsonDecimal", ca_0 = "JsonDecimal", cb_0 = "JsonDecimal", ca_6 = "JsonDecimal", cb_6 = "JsonDecimal", ca_18 = "JsonDecimal", cb_18 = "JsonDecimal", priz_char = "number", druh_char = "number", c0_21 = "JsonDecimal", c1_21 = "JsonDecimal", c0_34 = "JsonDecimal", c1_34 = "JsonDecimal", c0_54 = "JsonDecimal", c1_54 = "JsonDecimal", c0_66 = "JsonDecimal", c1_66 = "JsonDecimal", c0_62 = "JsonDecimal", c1_62 = "JsonDecimal", c0_63 = "JsonDecimal", c1_63 = "JsonDecimal", c0_67 = "JsonDecimal", c1_67 = "JsonDecimal", c0_68 = "JsonDecimal", c1_68 = "JsonDecimal", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", rozpocet = "JsonDecimal", blokace = "JsonDecimal", rezervace = "JsonDecimal", cerpani = "JsonDecimal", volne = "JsonDecimal", kalkulace = "JsonDecimal", c_kc = "JsonDecimal", c_vz = "JsonDecimal", c_fak = "JsonDecimal", ixs_pla = "string", cislo = "string", ixs_fun = "string", ixs_fun_txt = "string", nazev = "string",}
	const enum GRcnPrehledRozpoctuDtoTypeLengths { ico = 10, ucs = 10, nks = 12, xuete = 286, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, mj = 5, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazDoprProstrDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující dopravní prostředky na příkaze.*/
	interface GRcnPrikazDoprProstrDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Řádek položky.*/
		radek_pep?: number|null;
		/**Číslo etapy.*/
		cislo_eta?: number|null;
		/**Z místa.*/
		z_mista?: string|null;
		/**Do místa.*/
		do_mista?: string|null;
		/**Kód způsobu dopravy.*/
		zp_dopr?: number|null;
		/**Způsob dopravy textově.*/
		zp_dopr_txt?: string|null;
		/**Typp prostředků.*/
		typ_prostr?: string|null;
		/**Spz.*/
		spz?: string|null;
		/**Číslo tp.*/
		cislo_tp?: string|null;
		/**Havarijní pojištění.*/
		hav_poj?: string|null;
		/**Vzdálenost km.*/
		km?: JsonDecimal|null;
		/**Průměrná spotřeba.*/
		prum_spotr?: JsonDecimal|null;
		/**Tankováno.*/
		tankovano?: JsonDecimal|null;
	}
	const enum GRcnPrikazDoprProstrDtoNames { ixp = "ixp", radek_pep = "radek_pep", cislo_eta = "cislo_eta", z_mista = "z_mista", do_mista = "do_mista", zp_dopr = "zp_dopr", zp_dopr_txt = "zp_dopr_txt", typ_prostr = "typ_prostr", spz = "spz", cislo_tp = "cislo_tp", hav_poj = "hav_poj", km = "km", prum_spotr = "prum_spotr", tankovano = "tankovano",}
	const enum GRcnPrikazDoprProstrDtoFragments { ixp = "*", radek_pep = "*", cislo_eta = "*", z_mista = "*", do_mista = "*", zp_dopr = "*", zp_dopr_txt = "*", typ_prostr = "*", spz = "*", cislo_tp = "*", hav_poj = "*", km = "*", prum_spotr = "*", tankovano = "*",}
	const enum GRcnPrikazDoprProstrDtoTypes { ixp = "string", radek_pep = "number", cislo_eta = "number", z_mista = "string", do_mista = "string", zp_dopr = "number", zp_dopr_txt = "string", typ_prostr = "string", spz = "string", cislo_tp = "string", hav_poj = "string", km = "JsonDecimal", prum_spotr = "JsonDecimal", tankovano = "JsonDecimal",}
	const enum GRcnPrikazDoprProstrDtoTypeLengths { ixp = 12, z_mista = 30, do_mista = 30, zp_dopr_txt = 15, typ_prostr = 50, spz = 20, cislo_tp = 30, hav_poj = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující příkaz k cestě a zabezpečení návštěv.*/
	interface GRcnPrikazDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Třídění.*/
		uex_akt?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Kód stavu příkazu.*/
		stav_prik?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Rozkaz.*/
		rozkaz?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Místo nástupu.*/
		misto_n?: string|null;
		/**Datum nástupu.*/
		dat_n?: JsonDate|null;
		/**Místo ukončení.*/
		misto_u?: string|null;
		/**Datum ukončení.*/
		dat_u?: JsonDate|null;
		/**Místo hranice 1.*/
		misto_hra1?: string|null;
		/**Datum hranice 1.*/
		dat_hra1?: JsonDate|null;
		/**Místo hranice 2.*/
		misto_hra2?: string|null;
		/**Datum hranice 2.*/
		dat_hra2?: JsonDate|null;
		/**Podmmínky uskutečnění.*/
		podm_uskut?: string|null;
		/**Podmínky výpočtu.*/
		podm_vypoc?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Identifikátor fuknce zadavatele.*/
		ixs_fun_zad?: string|null;
		/**Identifikátor fuknkce vlastníka.*/
		ixs_fun_akt?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód typu cestujícího.*/
		typ_dos?: number|null;
		/**Kategorie akce.*/
		ktg_rcn?: number|null;
		/**Kód úrovně návštěvy.*/
		urn?: number|null;
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Datum schválení záloh.*/
		dat_schv_zal?: JsonDate|null;
		/**Datum schválení vyúčtování.*/
		dat_schv_vyu?: JsonDate|null;
		/**Druh příkazu.*/
		druh_rcn?: number|null;
		/**Kód typu vyúčtování.*/
		typ_vyu?: number|null;
		/**Identifikátor prev.*/
		ixp_prev?: string|null;
		/**Typ algoritmu vyúčtování.*/
		typ_alg_vyu?: number|null;
		/**Identifikátor členění.*/
		ixs_cle?: string|null;
		/**Kód typu požadavku.*/
		typ_poz?: number|null;
		/**Identifikátor typu účastníka.*/
		ixs_tos?: string|null;
		/**Zkratka dopravního prostředku.*/
		zkr_dopr?: string|null;
		/**Identifikátor uza.*/
		ixp_uza?: string|null;
		/**Výkon.*/
		vkn?: string|null;
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
		/**Identifikátor plánu.*/
		ixp_pcn?: string|null;
		/**Číslo číselníku akcí.*/
		cislo_cia?: string|null;
		/**Nákladové středisko financující.*/
		nks_fin?: string|null;
		/**Ičo financující.*/
		ico_fin?: string|null;
		/**Nákladové středisko sdružující.*/
		nks_sdr?: string|null;
		/**Ičo sdružující.*/
		ico_sdr?: string|null;
		/**Nákladové středisko realizující.*/
		nks_real?: string|null;
		/**Ičo realizující.*/
		ico_real?: string|null;
		/**Realizující fce.*/
		ixs_fun_real?: string|null;
		/**Místo.*/
		misto?: string|null;
		/**Účel.*/
		ucel?: string|null;
		/**Org - atribut rozpočtové věty.*/
		te1_p?: string|null;
		/**Identifikátor organizační jednotky pro hledání dle osoby.*/
		ixs_orj?: string|null;
		/**Druh příkazu textově.*/
		druh_rcn_txt?: string|null;
		/**Název příkazu uza.*/
		ixp_uza_txt?: string|null;
		/**Členění textově.*/
		ixs_cle_txt?: string|null;
		/**Definovaný typ účastníka textově.*/
		ixs_tos_txt?: string|null;
		/**Zadavatel textově.*/
		ixs_zmp_zad_txt?: string|null;
		/**Kategorie textově.*/
		ktg_rcn_txt?: string|null;
		/**Stav příkazu textově.*/
		stav_prik_txt?: string|null;
		/**Typ účastníka textově.*/
		typ_dos_txt?: string|null;
		/**Typ požadavku textově.*/
		typ_poz_txt?: string|null;
		/**Typ vyúčtování textově.*/
		typ_vyu_txt?: string|null;
		/**Úroveň návštěvy textově.*/
		urn_txt?: string|null;
		/**Stav cesty textově.*/
		stav_rcn_txt?: string|null;
		/**Název osoby.*/
		osr?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Funkce realizátora textově.*/
		fun_real?: string|null;
		/**Funkce zadavatele textově.*/
		fun_zad?: string|null;
		/**Zadavatel textově (změnu provedl).*/
		zmp_zad?: string|null;
		/**Funkce vlastníka textově.*/
		fun_akt?: string|null;
		/**Název knihy.*/
		ixp_den_nazev?: string|null;
		/**Stav finanční kontroly.*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav EKO schvalovacího procesu*/
		stav_eko_schval?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Název typu osoby.*/
		nazev_tos?: string|null;
		/**Název členění.*/
		nazev_cle?: string|null;
		/**Důvod storna.*/
		duvod_storna?: string|null;
		/**Další podmínky uskutečnění.*/
		PodmUskut?: string|null;
		/**Údaje pro výpočet náhrad.*/
		PodmVypoc?: string|null;
		/**Ostatní údaje.*/
		PodmOst?: string|null;
		/**Vyúčtování.*/
		vyuctovani?: string|null;
		/**Zařazení.*/
		kat_hod?: string[]|null;
		/**Příznak, zda je doklad validní pro schvalovací proces resp. FK.*/
		validni?: boolean|null;
		/**Stav finanční kontroly textově.*/
		stav_fik_txt?: string|null;
		/**Stav finanční kontroly kód.*/
		stav_fik?: number|null;
		/**Tooltip.*/
		tooltip?: string|null;
		/**Pro filtr - doklady bez FK.*/
		bez_fin_kon?: number|null;
		/**Pro filtr - doklady s FK se stavem vyřízení.*/
		stav_vyriz?: number|null;
	}
	const enum GRcnPrikazDtoNames { ixp = "ixp", ixp_den = "ixp_den", ixs_rcn = "ixs_rcn", rok = "rok", uex_akt = "uex_akt", ac = "ac", evi_cis = "evi_cis", stav_prik = "stav_prik", nazev = "nazev", rozkaz = "rozkaz", stat = "stat", misto_n = "misto_n", dat_n = "dat_n", misto_u = "misto_u", dat_u = "dat_u", misto_hra1 = "misto_hra1", dat_hra1 = "dat_hra1", misto_hra2 = "misto_hra2", dat_hra2 = "dat_hra2", podm_uskut = "podm_uskut", podm_vypoc = "podm_vypoc", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", ixs_fun_zad = "ixs_fun_zad", ixs_fun_akt = "ixs_fun_akt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dos = "typ_dos", ktg_rcn = "ktg_rcn", urn = "urn", ixs_zmp_zad = "ixs_zmp_zad", ixs_osr = "ixs_osr", dat_schv_zal = "dat_schv_zal", dat_schv_vyu = "dat_schv_vyu", druh_rcn = "druh_rcn", typ_vyu = "typ_vyu", ixp_prev = "ixp_prev", typ_alg_vyu = "typ_alg_vyu", ixs_cle = "ixs_cle", typ_poz = "typ_poz", ixs_tos = "ixs_tos", zkr_dopr = "zkr_dopr", ixp_uza = "ixp_uza", vkn = "vkn", priz_view = "priz_view", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", ixp_pcn = "ixp_pcn", cislo_cia = "cislo_cia", nks_fin = "nks_fin", ico_fin = "ico_fin", nks_sdr = "nks_sdr", ico_sdr = "ico_sdr", nks_real = "nks_real", ico_real = "ico_real", ixs_fun_real = "ixs_fun_real", misto = "misto", ucel = "ucel", te1_p = "te1_p", ixs_orj = "ixs_orj", druh_rcn_txt = "druh_rcn_txt", ixp_uza_txt = "ixp_uza_txt", ixs_cle_txt = "ixs_cle_txt", ixs_tos_txt = "ixs_tos_txt", ixs_zmp_zad_txt = "ixs_zmp_zad_txt", ktg_rcn_txt = "ktg_rcn_txt", stav_prik_txt = "stav_prik_txt", typ_dos_txt = "typ_dos_txt", typ_poz_txt = "typ_poz_txt", typ_vyu_txt = "typ_vyu_txt", urn_txt = "urn_txt", stav_rcn_txt = "stav_rcn_txt", osr = "osr", stat_txt = "stat_txt", fun_real = "fun_real", fun_zad = "fun_zad", zmp_zad = "zmp_zad", fun_akt = "fun_akt", ixp_den_nazev = "ixp_den_nazev", stav_fk = "stav_fk", stav_eko_schval = "stav_eko_schval", pocet = "pocet", nazev_tos = "nazev_tos", nazev_cle = "nazev_cle", duvod_storna = "duvod_storna", PodmUskut = "PodmUskut", PodmVypoc = "PodmVypoc", PodmOst = "PodmOst", vyuctovani = "vyuctovani", kat_hod = "kat_hod", validni = "validni", stav_fik_txt = "stav_fik_txt", stav_fik = "stav_fik", tooltip = "tooltip", bez_fin_kon = "bez_fin_kon", stav_vyriz = "stav_vyriz",}
	const enum GRcnPrikazDtoFragments { ixp = "main", ixp_den = "main", ixs_rcn = "main", rok = "main", uex_akt = "main", ac = "main", evi_cis = "main", stav_prik = "main", nazev = "main", rozkaz = "main", stat = "main", misto_n = "main", dat_n = "main", misto_u = "main", dat_u = "main", misto_hra1 = "main", dat_hra1 = "main", misto_hra2 = "main", dat_hra2 = "main", podm_uskut = "main", podm_vypoc = "main", ico = "main", ucs = "main", uus = "main", nks = "main", ixs_fun_zad = "main", ixs_fun_akt = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_dos = "main", ktg_rcn = "main", urn = "main", ixs_zmp_zad = "main", ixs_osr = "main", dat_schv_zal = "main", dat_schv_vyu = "main", druh_rcn = "main", typ_vyu = "main", ixp_prev = "main", typ_alg_vyu = "main", ixs_cle = "main", typ_poz = "main", ixs_tos = "main", zkr_dopr = "main", ixp_uza = "main", vkn = "main", priz_view = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", ixp_pcn = "main", cislo_cia = "main", nks_fin = "main", ico_fin = "main", nks_sdr = "main", ico_sdr = "*", nks_real = "main", ico_real = "main", ixs_fun_real = "main", misto = "main", ucel = "main", te1_p = "main", ixs_orj = "*", druh_rcn_txt = "druh_rcn_txt", ixp_uza_txt = "ixp_uza_txt", ixs_cle_txt = "ixs_cle_txt", ixs_tos_txt = "ixs_tos_txt", ixs_zmp_zad_txt = "ixs_zmp_zad_txt", ktg_rcn_txt = "ktg_rcn_txt", stav_prik_txt = "stav_prik_txt", typ_dos_txt = "typ_dos_txt", typ_poz_txt = "typ_poz_txt", typ_vyu_txt = "typ_vyu_txt", urn_txt = "urn_txt", stav_rcn_txt = "stav_rcn_txt", osr = "osr", stat_txt = "stat_txt", fun_real = "fun_real", fun_zad = "fun_zad", zmp_zad = "zmp_zad", fun_akt = "fun_akt", ixp_den_nazev = "ixp_den_nazev", stav_fk = "WFL_FK", stav_eko_schval = "EKO_SCHVAL", pocet = "main", nazev_tos = "*", nazev_cle = "*", duvod_storna = "*", PodmUskut = "*", PodmVypoc = "*", PodmOst = "*", vyuctovani = "*", kat_hod = "*", validni = "*", stav_fik_txt = "*", stav_fik = "*", tooltip = "*", bez_fin_kon = "*", stav_vyriz = "*",}
	const enum GRcnPrikazDtoTypes { ixp = "string", ixp_den = "string", ixs_rcn = "string", rok = "number", uex_akt = "string", ac = "string", evi_cis = "string", stav_prik = "number", nazev = "string", rozkaz = "string", stat = "number", misto_n = "string", dat_n = "JsonDate", misto_u = "string", dat_u = "JsonDate", misto_hra1 = "string", dat_hra1 = "JsonDate", misto_hra2 = "string", dat_hra2 = "JsonDate", podm_uskut = "string", podm_vypoc = "string", ico = "string", ucs = "string", uus = "string", nks = "string", ixs_fun_zad = "string", ixs_fun_akt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dos = "number", ktg_rcn = "number", urn = "number", ixs_zmp_zad = "string", ixs_osr = "string", dat_schv_zal = "JsonDate", dat_schv_vyu = "JsonDate", druh_rcn = "number", typ_vyu = "number", ixp_prev = "string", typ_alg_vyu = "number", ixs_cle = "string", typ_poz = "number", ixs_tos = "string", zkr_dopr = "string", ixp_uza = "string", vkn = "string", priz_view = "number", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", ixp_pcn = "string", cislo_cia = "string", nks_fin = "string", ico_fin = "string", nks_sdr = "string", ico_sdr = "string", nks_real = "string", ico_real = "string", ixs_fun_real = "string", misto = "string", ucel = "string", te1_p = "string", ixs_orj = "string", druh_rcn_txt = "string", ixp_uza_txt = "string", ixs_cle_txt = "string", ixs_tos_txt = "string", ixs_zmp_zad_txt = "string", ktg_rcn_txt = "string", stav_prik_txt = "string", typ_dos_txt = "string", typ_poz_txt = "string", typ_vyu_txt = "string", urn_txt = "string", stav_rcn_txt = "string", osr = "string", stat_txt = "string", fun_real = "string", fun_zad = "string", zmp_zad = "string", fun_akt = "string", ixp_den_nazev = "string", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_eko_schval = "Gordic.Wfl.Interface.GWflvdfkDto", pocet = "number", nazev_tos = "string", nazev_cle = "string", duvod_storna = "string", PodmUskut = "string", PodmVypoc = "string", PodmOst = "string", vyuctovani = "string", kat_hod = "string[]", validni = "boolean", stav_fik_txt = "string", stav_fik = "number", tooltip = "string", bez_fin_kon = "number", stav_vyriz = "number",}
	const enum GRcnPrikazDtoTypeLengths { ixp = 12, ixp_den = 12, ixs_rcn = 12, uex_akt = 16, ac = 20, evi_cis = 20, nazev = 254, rozkaz = 50, misto_n = 50, misto_u = 50, misto_hra1 = 50, misto_hra2 = 50, podm_uskut = 254, podm_vypoc = 254, ico = 10, ucs = 10, uus = 10, nks = 12, ixs_fun_zad = 12, ixs_fun_akt = 12, zmenu_prov = 12, ixs_zmp_zad = 12, ixs_osr = 12, ixp_prev = 12, ixs_cle = 12, ixs_tos = 12, zkr_dopr = 30, ixp_uza = 12, vkn = 20, cislo_cia = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazEtapaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující etapu cestovního příkazu.*/
	interface GRcnPrikazEtapaDto {
		/**Identifikátor příkazu.*/
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
		/**Kód navýšení.*/
		dvn?: number|null;
		/**Částka krácení stravného.*/
		c_strava_kr?: JsonDecimal|null;
		/**Procento krácení stravného.*/
		proc_strava_kr?: JsonDecimal|null;
		/**Částka stravného.*/
		c_strava?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Číslo etapy.*/
		cislo_eta?: number|null;
		/**Den od.*/
		den_od?: number|null;
		/**Kód stavu etapy.*/
		stav_eta?: number|null;
		/**Částka krácení kapesné.*/
		c_kapes_kr?: JsonDecimal|null;
		/**Procento krácení kapesné.*/
		proc_kapes_kr?: JsonDecimal|null;
		/**Příznak přerušení etapy.*/
		preruseni?: number|null;
		/**Navýšení textově.*/
		dvn_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Stav etapy textově.*/
		stav_eta_txt?: string|null;
		/**Stav etapy zkratka.*/
		stav_eta_zkr?: string|null;
		/**Kód dvn.*/
		kod_dvn?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Zkratky jednotlivých doprav etapy dělené čárkou.*/
		zkr_dopr?: string|null;
		/**Příznak přerušení etapy pro checkbox.*/
		preruseniB?: boolean|null;
		/**Přerušení textově pro seznam.*/
		readonly preruseni_txt?: string|null;
	}
	const enum GRcnPrikazEtapaDtoNames { ixp = "ixp", radek_pep = "radek_pep", z_mista = "z_mista", do_mista = "do_mista", stat = "stat", dat_od = "dat_od", dat_do = "dat_do", dvn = "dvn", c_strava_kr = "c_strava_kr", proc_strava_kr = "proc_strava_kr", c_strava = "c_strava", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_eta = "cislo_eta", den_od = "den_od", stav_eta = "stav_eta", c_kapes_kr = "c_kapes_kr", proc_kapes_kr = "proc_kapes_kr", preruseni = "preruseni", dvn_txt = "dvn_txt", stat_txt = "stat_txt", stav_eta_txt = "stav_eta_txt", stav_eta_zkr = "stav_eta_zkr", kod_dvn = "kod_dvn", rok = "rok", ixs_rcn = "ixs_rcn", zkr_dopr = "zkr_dopr", preruseniB = "preruseniB", preruseni_txt = "preruseni_txt",}
	const enum GRcnPrikazEtapaDtoFragments { ixp = "main", radek_pep = "main", z_mista = "main", do_mista = "main", stat = "main", dat_od = "main", dat_do = "main", dvn = "main", c_strava_kr = "main", proc_strava_kr = "main", c_strava = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", cislo_eta = "main", den_od = "main", stav_eta = "main", c_kapes_kr = "main", proc_kapes_kr = "main", preruseni = "main", dvn_txt = "dvn_txt", stat_txt = "stat_txt", stav_eta_txt = "stav_eta_txt", stav_eta_zkr = "stav_eta_zkr", kod_dvn = "kod_dvn", rok = "*", ixs_rcn = "*", zkr_dopr = "zkr_dopr", preruseniB = "*", preruseni_txt = "*",}
	const enum GRcnPrikazEtapaDtoTypes { ixp = "string", radek_pep = "number", z_mista = "string", do_mista = "string", stat = "number", dat_od = "JsonDate", dat_do = "JsonDate", dvn = "number", c_strava_kr = "JsonDecimal", proc_strava_kr = "JsonDecimal", c_strava = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_eta = "number", den_od = "number", stav_eta = "number", c_kapes_kr = "JsonDecimal", proc_kapes_kr = "JsonDecimal", preruseni = "number", dvn_txt = "string", stat_txt = "string", stav_eta_txt = "string", stav_eta_zkr = "string", kod_dvn = "string", rok = "number", ixs_rcn = "string", zkr_dopr = "string", preruseniB = "boolean", preruseni_txt = "string",}
	const enum GRcnPrikazEtapaDtoTypeLengths { ixp = 12, z_mista = 30, do_mista = 30, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazEtapaKraceniStravnehoDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující krácení stravného na etapách příkazu.*/
	interface GRcnPrikazEtapaKraceniStravnehoDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Datum.*/
		datum?: JsonDate|null;
		/**Procto strava.*/
		proc_strava?: JsonDecimal|null;
		/**Procento kapesné.*/
		proc_kapes?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Procento tuzemské stravné.*/
		proc_tuzem?: JsonDecimal|null;
		/**Příznak ubytování.*/
		priz_ubyt?: number|null;
		/**Tuzemské stravné řetezec automaticky skládaný dle zatržítek ts_snidane, ts_obed, ts_vecere.*/
		strava_tuz?: string|null;
		/**Tuzemské stravné řetezec automaticky skládaný dle zatržítek zs_snidane, zs_obed, zs_vecere.*/
		strava_zah?: string|null;
		/**Datum_do.*/
		datum_do?: JsonDate|null;
		/**Priznak ubytovani txt.*/
		readonly priz_ubyt_txt?: string|null;
		/**Priznak pro bezplatne ubytovani.*/
		bezplatneUbytovani?: boolean|null;
		/**Zatržítko pro zahraniční stravné - snídaně.*/
		zs_snidane?: boolean|null;
		/**Zatržítko pro zahraniční stravné - oběd.*/
		zs_obed?: boolean|null;
		/**Zatržítko pro zahraniční stravné - večeře.*/
		zs_vecere?: boolean|null;
		/**Zatržítko pro tuzemské stravné - snídaně.*/
		ts_snidane?: boolean|null;
		/**Zatržítko pro tuzemské stravné - oběd.*/
		ts_obed?: boolean|null;
		/**Zatržítko pro tuzemské stravné - večeře.*/
		ts_vecere?: boolean|null;
	}
	const enum GRcnPrikazEtapaKraceniStravnehoDtoNames { ixp = "ixp", radek = "radek", datum = "datum", proc_strava = "proc_strava", proc_kapes = "proc_kapes", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", proc_tuzem = "proc_tuzem", priz_ubyt = "priz_ubyt", strava_tuz = "strava_tuz", strava_zah = "strava_zah", datum_do = "datum_do", priz_ubyt_txt = "priz_ubyt_txt", bezplatneUbytovani = "bezplatneUbytovani", zs_snidane = "zs_snidane", zs_obed = "zs_obed", zs_vecere = "zs_vecere", ts_snidane = "ts_snidane", ts_obed = "ts_obed", ts_vecere = "ts_vecere",}
	const enum GRcnPrikazEtapaKraceniStravnehoDtoFragments { ixp = "*", radek = "*", datum = "*", proc_strava = "*", proc_kapes = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", proc_tuzem = "*", priz_ubyt = "*", strava_tuz = "*", strava_zah = "*", datum_do = "*", priz_ubyt_txt = "*", bezplatneUbytovani = "*", zs_snidane = "*", zs_obed = "*", zs_vecere = "*", ts_snidane = "*", ts_obed = "*", ts_vecere = "*",}
	const enum GRcnPrikazEtapaKraceniStravnehoDtoTypes { ixp = "string", radek = "number", datum = "JsonDate", proc_strava = "JsonDecimal", proc_kapes = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", proc_tuzem = "JsonDecimal", priz_ubyt = "number", strava_tuz = "string", strava_zah = "string", datum_do = "JsonDate", priz_ubyt_txt = "string", bezplatneUbytovani = "boolean", zs_snidane = "boolean", zs_obed = "boolean", zs_vecere = "boolean", ts_snidane = "boolean", ts_obed = "boolean", ts_vecere = "boolean",}
	const enum GRcnPrikazEtapaKraceniStravnehoDtoTypeLengths { ixp = 12, zmenu_prov = 12, strava_tuz = 10, strava_zah = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazEtapaLimitDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující závazné limity pro etapu příkazu.*/
	interface GRcnPrikazEtapaLimitDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Vzdálenost celkem.*/
		km_celkem?: JsonDecimal|null;
		/**Pohonné hmoty celkem.*/
		phm_celkem?: JsonDecimal|null;
		/**Vzdálenost v cizině.*/
		km_valuta?: JsonDecimal|null;
		/**Pohonné hmoty v cizině.*/
		phm_valuta?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GRcnPrikazEtapaLimitDtoNames { ixp = "ixp", km_celkem = "km_celkem", phm_celkem = "phm_celkem", km_valuta = "km_valuta", phm_valuta = "phm_valuta", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRcnPrikazEtapaLimitDtoFragments { ixp = "*", km_celkem = "*", phm_celkem = "*", km_valuta = "*", phm_valuta = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRcnPrikazEtapaLimitDtoTypes { ixp = "string", km_celkem = "JsonDecimal", phm_celkem = "JsonDecimal", km_valuta = "JsonDecimal", phm_valuta = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRcnPrikazEtapaLimitDtoTypeLengths { ixp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazEtapaVydajDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující výdaje pro konkrétní průběh cesty (na etapě příkazu).*/
	interface GRcnPrikazEtapaVydajDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Řádek etapy.*/
		radek_pep?: number|null;
		/**Pořadí.*/
		poradi?: number|null;
		/**Kód způsobu dopravy.*/
		zp_dopr?: number|null;
		/**Příznak zálohy.*/
		priz_zaloha?: number|null;
		/**Vzdálenost.*/
		km?: JsonDecimal|null;
		/**Průměrná spotřeba.*/
		prum_spotr?: JsonDecimal|null;
		/**Částka pohonných hmot.*/
		c_phm?: JsonDecimal|null;
		/**Tankováno.*/
		tankovano?: JsonDecimal|null;
		/**Typ prostředku.*/
		typ_prostr?: string|null;
		/**Spz.*/
		spz?: string|null;
		/**Číslo tp.*/
		cislo_tp?: string|null;
		/**Havarijní pojištění.*/
		hav_poj?: string|null;
		/**Objem motoru.*/
		objem_val?: JsonDecimal|null;
		/**Přízna přívěs.*/
		priz_prives?: number|null;
		/**Příznak jízdenka.*/
		priz_jizdenka?: number|null;
		/**Objednávka.*/
		objednavka?: string|null;
		/**Faktura vlastní.*/
		faktura_vl?: string|null;
		/**Faktura dodavatelská.*/
		faktura_dod?: string|null;
		/**Spoj.*/
		spoj?: string|null;
		/**Dodavatel.*/
		dodavatel?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Doklady.*/
		doklady?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor typu náhrad.*/
		ixs_tna?: string|null;
		/**Kód typu pohonné hmoty.*/
		phm?: number|null;
		/**Kód způsobu úhrady.*/
		zp_uhr?: number|null;
		/**Zahraniční krácení.*/
		kr_zahr?: string|null;
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Počet osob (např: 2+1).*/
		poc_oso?: string|null;
		/**Ixp_aus_txt.*/
		ixp_aus_txt?: string|null;
		/**Ixp_plk_txt.*/
		ixp_plk_txt?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Phm_txt.*/
		phm_txt?: string|null;
		/**Zp_dopr_txt.*/
		zp_dopr_txt?: string|null;
		/**Zp_uhr_txt.*/
		zp_uhr_txt?: string|null;
		/**Doprava.*/
		doprava?: number|null;
		/**Priz_zaloha.*/
		priz_zalohaB?: boolean|null;
		/**Priz_prives.*/
		priz_privesB?: boolean|null;
		/**Priz_jizdenka.*/
		priz_jizdenkaB?: boolean|null;
		/**Specielní filtr pro dopravu ((zp_dopr != 0) OR (zp_dopr = 0 AND zp_uhr = 0)).*/
		filtrProDopravu?: boolean|null;
	}
	const enum GRcnPrikazEtapaVydajDtoNames { ixp = "ixp", radek_pep = "radek_pep", poradi = "poradi", zp_dopr = "zp_dopr", priz_zaloha = "priz_zaloha", km = "km", prum_spotr = "prum_spotr", c_phm = "c_phm", tankovano = "tankovano", typ_prostr = "typ_prostr", spz = "spz", cislo_tp = "cislo_tp", hav_poj = "hav_poj", objem_val = "objem_val", priz_prives = "priz_prives", priz_jizdenka = "priz_jizdenka", objednavka = "objednavka", faktura_vl = "faktura_vl", faktura_dod = "faktura_dod", spoj = "spoj", dodavatel = "dodavatel", c_mena = "c_mena", mena = "mena", doklady = "doklady", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tna = "ixs_tna", phm = "phm", zp_uhr = "zp_uhr", kr_zahr = "kr_zahr", ixp_aus = "ixp_aus", ixp_plk = "ixp_plk", poc_oso = "poc_oso", ixp_aus_txt = "ixp_aus_txt", ixp_plk_txt = "ixp_plk_txt", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", phm_txt = "phm_txt", zp_dopr_txt = "zp_dopr_txt", zp_uhr_txt = "zp_uhr_txt", doprava = "doprava", priz_zalohaB = "priz_zalohaB", priz_privesB = "priz_privesB", priz_jizdenkaB = "priz_jizdenkaB", filtrProDopravu = "filtrProDopravu",}
	const enum GRcnPrikazEtapaVydajDtoFragments { ixp = "main", radek_pep = "main", poradi = "main", zp_dopr = "main", priz_zaloha = "main", km = "main", prum_spotr = "main", c_phm = "main", tankovano = "main", typ_prostr = "main", spz = "main", cislo_tp = "main", hav_poj = "main", objem_val = "main", priz_prives = "main", priz_jizdenka = "main", objednavka = "main", faktura_vl = "main", faktura_dod = "main", spoj = "main", dodavatel = "main", c_mena = "main", mena = "main", doklady = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_tna = "main", phm = "main", zp_uhr = "main", kr_zahr = "main", ixp_aus = "main", ixp_plk = "main", poc_oso = "main", ixp_aus_txt = "ixp_aus_txt", ixp_plk_txt = "ixp_plk_txt", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", phm_txt = "phm_txt", zp_dopr_txt = "zp_dopr_txt", zp_uhr_txt = "zp_uhr_txt", doprava = "*", priz_zalohaB = "*", priz_privesB = "*", priz_jizdenkaB = "*", filtrProDopravu = "*",}
	const enum GRcnPrikazEtapaVydajDtoTypes { ixp = "string", radek_pep = "number", poradi = "number", zp_dopr = "number", priz_zaloha = "number", km = "JsonDecimal", prum_spotr = "JsonDecimal", c_phm = "JsonDecimal", tankovano = "JsonDecimal", typ_prostr = "string", spz = "string", cislo_tp = "string", hav_poj = "string", objem_val = "JsonDecimal", priz_prives = "number", priz_jizdenka = "number", objednavka = "string", faktura_vl = "string", faktura_dod = "string", spoj = "string", dodavatel = "string", c_mena = "JsonDecimal", mena = "number", doklady = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tna = "string", phm = "number", zp_uhr = "number", kr_zahr = "string", ixp_aus = "string", ixp_plk = "string", poc_oso = "string", ixp_aus_txt = "string", ixp_plk_txt = "string", ixs_tna_txt = "string", mena_txt = "string", phm_txt = "string", zp_dopr_txt = "string", zp_uhr_txt = "string", doprava = "number", priz_zalohaB = "boolean", priz_privesB = "boolean", priz_jizdenkaB = "boolean", filtrProDopravu = "boolean",}
	const enum GRcnPrikazEtapaVydajDtoTypeLengths { ixp = 12, typ_prostr = 50, spz = 20, cislo_tp = 30, hav_poj = 30, objednavka = 50, faktura_vl = 50, faktura_dod = 50, spoj = 50, dodavatel = 254, doklady = 254, poznamka = 254, zmenu_prov = 12, ixs_tna = 12, kr_zahr = 3, ixp_aus = 12, ixp_plk = 12, poc_oso = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazLikvidacniZaznamDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující likvidační záznam na příkaze.*/
	interface GRcnPrikazLikvidacniZaznamDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Kód typu likvidačního záznamu.*/
		typ_liz?: number|null;
		/**Kód způsobu úhrady.*/
		zp_uhr?: number|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Částka.*/
		castka?: JsonDecimal|null;
		/**Částka v CZK.*/
		castka_czk?: JsonDecimal|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Rok.*/
		rok?: number|null;
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
		/**Sériové číslo.*/
		ser_cislo?: number|null;
		/**Příznak kurzu.*/
		priz_kurz?: number|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Kód měny zálohy.*/
		mena_zal?: number|null;
		/**Identifikátor sady náhrad.*/
		ixs_sna?: string|null;
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
		/**Typ likvidačního záznamu textově.*/
		typ_liz_txt?: string|null;
		/**Způsob úhrady textově.*/
		zp_uhr_txt?: string|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Suma za RPP.*/
		sumaZaRpp?: JsonDecimal|null;
		/**Uea.*/
		readonly old_uea?: string|null;
		/**Ueb.*/
		readonly old_ueb?: string|null;
		/**Uec.*/
		readonly old_uec?: string|null;
		/**Ued.*/
		readonly old_ued?: string|null;
		/**Uee.*/
		readonly old_uee?: string|null;
		/**Uef.*/
		readonly old_uef?: string|null;
		/**Ueg.*/
		readonly old_ueg?: string|null;
		/**Ueh.*/
		readonly old_ueh?: string|null;
		/**Uei.*/
		readonly old_uei?: string|null;
		/**Uej.*/
		readonly old_uej?: string|null;
		/**Te0.*/
		readonly old_te0?: string|null;
		/**Te1.*/
		readonly old_te1?: string|null;
		/**Te2.*/
		readonly old_te2?: string|null;
		/**Te3.*/
		readonly old_te3?: string|null;
		/**Te4.*/
		readonly old_te4?: string|null;
	}
	const enum GRcnPrikazLikvidacniZaznamDtoNames { ixp = "ixp", typ_liz = "typ_liz", zp_uhr = "zp_uhr", mena = "mena", castka = "castka", castka_czk = "castka_czk", kurz = "kurz", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ser_cislo = "ser_cislo", priz_kurz = "priz_kurz", ixp_plk = "ixp_plk", mena_zal = "mena_zal", ixs_sna = "ixs_sna", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", typ_liz_txt = "typ_liz_txt", zp_uhr_txt = "zp_uhr_txt", mena_zkr = "mena_zkr", sumaZaRpp = "sumaZaRpp", old_uea = "old_uea", old_ueb = "old_ueb", old_uec = "old_uec", old_ued = "old_ued", old_uee = "old_uee", old_uef = "old_uef", old_ueg = "old_ueg", old_ueh = "old_ueh", old_uei = "old_uei", old_uej = "old_uej", old_te0 = "old_te0", old_te1 = "old_te1", old_te2 = "old_te2", old_te3 = "old_te3", old_te4 = "old_te4",}
	const enum GRcnPrikazLikvidacniZaznamDtoFragments { ixp = "main", typ_liz = "main", zp_uhr = "main", mena = "main", castka = "main", castka_czk = "main", kurz = "main", rok = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ser_cislo = "main", priz_kurz = "main", ixp_plk = "main", mena_zal = "main", ixs_sna = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", typ_liz_txt = "*", zp_uhr_txt = "*", mena_zkr = "*", sumaZaRpp = "*", old_uea = "*", old_ueb = "*", old_uec = "*", old_ued = "*", old_uee = "*", old_uef = "*", old_ueg = "*", old_ueh = "*", old_uei = "*", old_uej = "*", old_te0 = "*", old_te1 = "*", old_te2 = "*", old_te3 = "*", old_te4 = "*",}
	const enum GRcnPrikazLikvidacniZaznamDtoTypes { ixp = "string", typ_liz = "number", zp_uhr = "number", mena = "number", castka = "JsonDecimal", castka_czk = "JsonDecimal", kurz = "JsonDecimal", rok = "number", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ser_cislo = "number", priz_kurz = "number", ixp_plk = "string", mena_zal = "number", ixs_sna = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", typ_liz_txt = "string", zp_uhr_txt = "string", mena_zkr = "string", sumaZaRpp = "JsonDecimal", old_uea = "string", old_ueb = "string", old_uec = "string", old_ued = "string", old_uee = "string", old_uef = "string", old_ueg = "string", old_ueh = "string", old_uei = "string", old_uej = "string", old_te0 = "string", old_te1 = "string", old_te2 = "string", old_te3 = "string", old_te4 = "string",}
	const enum GRcnPrikazLikvidacniZaznamDtoTypeLengths { ixp = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, ixp_plk = 12, ixs_sna = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazVybavenostDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující vybavenost na příkaze.*/
	interface GRcnPrikazVybavenostDto {
		/**Nadpis.*/
		nadpis?: string|null;
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Typ.*/
		typ?: string|null;
		/**Druh.*/
		druh?: string|null;
		/**Datum platnosti.*/
		dat_platnost?: JsonDate|null;
		/**Účet.*/
		ucet?: string|null;
		/**Banka.*/
		banka?: string|null;
		/**Částka limit atm.*/
		c_limit_atm?: number|null;
		/**Částka limit hotovosti.*/
		c_limit_cas?: number|null;
		/**Částka limit agregovaný.*/
		c_limit_agr?: number|null;
		/**Datum vydání osobě.*/
		dat_vyd_oso?: JsonDate|null;
		/**Datum platnosti od.*/
		dat_plat_od?: JsonDate|null;
		/**Datum platnosti do.*/
		dat_plat_do?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
	}
	const enum GRcnPrikazVybavenostDtoNames { nadpis = "nadpis", ixp = "ixp", popis = "popis", evi_cis = "evi_cis", typ = "typ", druh = "druh", dat_platnost = "dat_platnost", ucet = "ucet", banka = "banka", c_limit_atm = "c_limit_atm", c_limit_cas = "c_limit_cas", c_limit_agr = "c_limit_agr", dat_vyd_oso = "dat_vyd_oso", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", poznamka = "poznamka",}
	const enum GRcnPrikazVybavenostDtoFragments { nadpis = "*", ixp = "*", popis = "*", evi_cis = "*", typ = "*", druh = "*", dat_platnost = "*", ucet = "*", banka = "*", c_limit_atm = "*", c_limit_cas = "*", c_limit_agr = "*", dat_vyd_oso = "*", dat_plat_od = "*", dat_plat_do = "*", poznamka = "*",}
	const enum GRcnPrikazVybavenostDtoTypes { nadpis = "string", ixp = "string", popis = "string", evi_cis = "string", typ = "string", druh = "string", dat_platnost = "JsonDate", ucet = "string", banka = "string", c_limit_atm = "number", c_limit_cas = "number", c_limit_agr = "number", dat_vyd_oso = "JsonDate", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", poznamka = "string",}
	const enum GRcnPrikazVybavenostDtoTypeLengths { nadpis = 12, ixp = 12, popis = 150, evi_cis = 20, typ = 50, druh = 50, ucet = 3, banka = 3, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazVydajDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující výdaj na příkaze.*/
	interface GRcnPrikazVydajDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Řádek výdaje.*/
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
		/**Te4.*/
		te4?: string|null;
		/**Příznak generovaného záznamu.*/
		priz_gen?: number|null;
		/**Příznak započítávat do výdajů.*/
		priz_zapoc?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Číslo etapy.*/
		cislo_eta?: number|null;
		/**Datum etapy.*/
		datum_eta?: JsonDate|null;
		/**Příznak nah.*/
		priz_nah?: number|null;
		/**Kód způsobu úhrady.*/
		zp_uhr?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
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
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Způsob úhrady textově.*/
		zp_uhr_txt?: string|null;
		/**Číslo platební karty.*/
		cislo_plk?: string|null;
		/**Datum kurzu.*/
		datumKurz?: JsonDate|null;
		/**Idnetifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Uea_n.*/
		uea_n?: string|null;
		/**Ueb_n.*/
		ueb_n?: string|null;
		/**Uec_n.*/
		uec_n?: string|null;
		/**Ued_n.*/
		ued_n?: string|null;
		/**Uee_n.*/
		uee_n?: string|null;
		/**Uef_n.*/
		uef_n?: string|null;
		/**Ueg_n.*/
		ueg_n?: string|null;
		/**Ueh_n.*/
		ueh_n?: string|null;
		/**Uei_n.*/
		uei_n?: string|null;
		/**Uej_n.*/
		uej_n?: string|null;
		/**Te0_n.*/
		te0_n?: string|null;
		/**Te1_n.*/
		te1_n?: string|null;
		/**Te2_n.*/
		te2_n?: string|null;
		/**Te3_n.*/
		te3_n?: string|null;
		/**Te4_n.*/
		te4_n?: string|null;
		/**Uek.*/
		uek_n?: string|null;
		/**Uel.*/
		uel_n?: string|null;
		/**Uem.*/
		uem_n?: string|null;
		/**Uen.*/
		uen_n?: string|null;
		/**Te5.*/
		te5_n?: string|null;
		/**Te6.*/
		te6_n?: string|null;
		/**Te7.*/
		te7_n?: string|null;
		/**Te8.*/
		te8_n?: string|null;
		/**Te9.*/
		te9_n?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Kategorie náhrad.*/
		ktg_tna?: string|null;
		/**Identifikátor způsobu zaúčtování.*/
		ixs_zpz_tna?: string|null;
		/**Název typu náhrady.*/
		nazev_tna?: string|null;
		/**Datum od (typ náhrad).*/
		dat_od_tna?: JsonDate|null;
		/**Datum do (typ náhrad).*/
		dat_do_tna?: JsonDate|null;
		/**Aktivita (typ náhrad).*/
		aktivita_tna?: string|null;
		/**Příznak, zda se v RPP vyskytuje X.*/
		readonly priz_val?: number|null;
		/**Používá se pro hromadnou úpravu výdajů/náhrad, obsahuje seznam atributu radek_pol oddělených čárkou.*/
		ostatniRadkyPol?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnPrikazVydajDtoNames { ixp = "ixp", radek_pol = "radek_pol", ixs_tna = "ixs_tna", stat = "stat", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", priz_gen = "priz_gen", priz_zapoc = "priz_zapoc", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_eta = "cislo_eta", datum_eta = "datum_eta", priz_nah = "priz_nah", zp_uhr = "zp_uhr", rok = "rok", ixp_plk = "ixp_plk", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", stat_txt = "stat_txt", mena_zkr = "mena_zkr", zp_uhr_txt = "zp_uhr_txt", cislo_plk = "cislo_plk", datumKurz = "datumKurz", ixs_rcn = "ixs_rcn", uea_n = "uea_n", ueb_n = "ueb_n", uec_n = "uec_n", ued_n = "ued_n", uee_n = "uee_n", uef_n = "uef_n", ueg_n = "ueg_n", ueh_n = "ueh_n", uei_n = "uei_n", uej_n = "uej_n", te0_n = "te0_n", te1_n = "te1_n", te2_n = "te2_n", te3_n = "te3_n", te4_n = "te4_n", uek_n = "uek_n", uel_n = "uel_n", uem_n = "uem_n", uen_n = "uen_n", te5_n = "te5_n", te6_n = "te6_n", te7_n = "te7_n", te8_n = "te8_n", te9_n = "te9_n", poznamka = "poznamka", ktg_tna = "ktg_tna", ixs_zpz_tna = "ixs_zpz_tna", nazev_tna = "nazev_tna", dat_od_tna = "dat_od_tna", dat_do_tna = "dat_do_tna", aktivita_tna = "aktivita_tna", priz_val = "priz_val", ostatniRadkyPol = "ostatniRadkyPol", pocet = "pocet",}
	const enum GRcnPrikazVydajDtoFragments { ixp = "main", radek_pol = "main", ixs_tna = "main", stat = "main", mena = "main", c_mena = "main", c_celk = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", priz_gen = "main", priz_zapoc = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", cislo_eta = "main", datum_eta = "main", priz_nah = "main", zp_uhr = "main", rok = "main", ixp_plk = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", stat_txt = "*", mena_zkr = "*", zp_uhr_txt = "*", cislo_plk = "*", datumKurz = "*", ixs_rcn = "*", uea_n = "*", ueb_n = "*", uec_n = "*", ued_n = "*", uee_n = "*", uef_n = "*", ueg_n = "*", ueh_n = "*", uei_n = "*", uej_n = "*", te0_n = "*", te1_n = "*", te2_n = "*", te3_n = "*", te4_n = "*", uek_n = "*", uel_n = "*", uem_n = "*", uen_n = "*", te5_n = "*", te6_n = "*", te7_n = "*", te8_n = "*", te9_n = "*", poznamka = "*", ktg_tna = "*", ixs_zpz_tna = "*", nazev_tna = "*", dat_od_tna = "*", dat_do_tna = "*", aktivita_tna = "*", priz_val = "*", ostatniRadkyPol = "*", pocet = "main",}
	const enum GRcnPrikazVydajDtoTypes { ixp = "string", radek_pol = "number", ixs_tna = "string", stat = "number", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", priz_gen = "number", priz_zapoc = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_eta = "number", datum_eta = "JsonDate", priz_nah = "number", zp_uhr = "number", rok = "number", ixp_plk = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", stat_txt = "string", mena_zkr = "string", zp_uhr_txt = "string", cislo_plk = "string", datumKurz = "JsonDate", ixs_rcn = "string", uea_n = "string", ueb_n = "string", uec_n = "string", ued_n = "string", uee_n = "string", uef_n = "string", ueg_n = "string", ueh_n = "string", uei_n = "string", uej_n = "string", te0_n = "string", te1_n = "string", te2_n = "string", te3_n = "string", te4_n = "string", uek_n = "string", uel_n = "string", uem_n = "string", uen_n = "string", te5_n = "string", te6_n = "string", te7_n = "string", te8_n = "string", te9_n = "string", poznamka = "string", ktg_tna = "string", ixs_zpz_tna = "string", nazev_tna = "string", dat_od_tna = "JsonDate", dat_do_tna = "JsonDate", aktivita_tna = "string", priz_val = "number", ostatniRadkyPol = "string", pocet = "number",}
	const enum GRcnPrikazVydajDtoTypeLengths { ixp = 12, ixs_tna = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, ixp_plk = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea_n = 3, ueb_n = 4, uec_n = 12, ued_n = 12, uee_n = 12, uef_n = 3, ueg_n = 16, ueh_n = 4, uei_n = 4, uej_n = 12, te0_n = 16, te1_n = 16, te2_n = 16, te3_n = 6, te4_n = 12, uek_n = 6, uel_n = 10, uem_n = 10, uen_n = 6, te5_n = 30, te6_n = 12, te7_n = 20, te8_n = 12, te9_n = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazVyuctovaniDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující vyúčtování.*/
	interface GRcnPrikazVyuctovaniDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Kód stavu vyúčtování cestujícího.*/
		stav_vyc?: number|null;
		/**Identifikátor zálohy.*/
		ixp_zal?: string|null;
		/**Identifikátor pokladního dokladu.*/
		ixp_pok?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok?: string|null;
		/**Identifikátor pokladní kontace.*/
		ixs_kon_pok?: string|null;
		/**Částka nárok.*/
		c_zal_narok?: JsonDecimal|null;
		/**Kód měna nároku.*/
		mena_zal_narok?: number|null;
		/**Částka dohody.*/
		c_zal_dohoda?: JsonDecimal|null;
		/**Kód měny dohody.*/
		mena_zal_dohoda?: number|null;
		/**Částka v CZK.*/
		c_zal_czk?: JsonDecimal|null;
		/**Popis zálohy.*/
		popis_zal?: string|null;
		/**Částka vypočtená v měně.*/
		c_vypoc_mena?: JsonDecimal|null;
		/**Měna vypočtené částky.*/
		mena_vypoc?: number|null;
		/**Částka vypočtená v CZK.*/
		c_vypoc_czk?: JsonDecimal|null;
		/**Rok.*/
		rok?: number|null;
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
		/**Částka doúčtování v měně.*/
		c_douct_mena?: JsonDecimal|null;
		/**Částka čerpání v měně.*/
		c_cerppk_mena?: JsonDecimal|null;
		/**Částka vyúčtování v měně.*/
		c_vyuct_mena?: JsonDecimal|null;
		/**Identifikátor typu náhrad.*/
		ixs_tna?: string|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Částka v měně.*/
		c_mena?: JsonDecimal|null;
		/**Částka vypočteno upraveno v měně.*/
		c_vypup_mena?: JsonDecimal|null;
		/**Kód měny vypočteno upraveno.*/
		mena_vypup?: number|null;
		/**Částka vypočteno upraveno v CZK.*/
		c_vypup_czk?: JsonDecimal|null;
		/**Kurz vypočteno upraveno.*/
		kurz_vypup?: JsonDecimal|null;
		/**Kód způsobu úhrady.*/
		zp_uhr?: number|null;
		/**Kód typu zálohy.*/
		typ_zal?: number|null;
		/**Příznak směny.*/
		priz_smena?: number|null;
		/**Příznak RPP.*/
		priz_rpp?: number|null;
		/**Částka vlastní.*/
		c_vlastni?: JsonDecimal|null;
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
		/**Sender - cesta(SC), příkaz (CP).*/
		sender?: string|null;
		/**Číslo příkazu.*/
		cislo_cp?: string|null;
		/**Název osoby.*/
		osoba_txt?: string|null;
		/**Stav_vyc_zkr.*/
		stav_vyc_zkr?: string|null;
		/**Číslo platební karty.*/
		cislo_plk?: string|null;
		/**Zkratka měny vypočteno.*/
		mena_vypoc_zkr?: string|null;
		/**Zkratka měny nároku zálohy.*/
		mena_zal_nar_zkr?: string|null;
		/**Zkratka měny dohody zálohy.*/
		mena_zal_doh_zkr?: string|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Počet záznamů.*/
		pocetzaznamu?: number|null;
		/**Zkratka měny vypočteno upraveno.*/
		mena_vypup_zkr?: string|null;
		/**Způsob úhrady textově.*/
		zp_uhr_txt?: string|null;
		/**Příznak vyúčtování.*/
		readonly priz_vyuct?: string|null;
		/**Částka k vrácení.*/
		readonly c_kvraceni?: JsonDecimal|null;
		/**Částka k doplacení.*/
		readonly c_kdoplaceni?: JsonDecimal|null;
		/**Zkratka měny směny.*/
		readonly mena_smena_zkr?: string|null;
		/**Zkratka měny vyúčtování.*/
		readonly mena_vyuct_zkr?: string|null;
	}
	const enum GRcnPrikazVyuctovaniDtoNames { ixp = "ixp", radek = "radek", stav_vyc = "stav_vyc", ixp_zal = "ixp_zal", ixp_pok = "ixp_pok", ixp_plk = "ixp_plk", ixp_den_pok = "ixp_den_pok", ixs_kon_pok = "ixs_kon_pok", c_zal_narok = "c_zal_narok", mena_zal_narok = "mena_zal_narok", c_zal_dohoda = "c_zal_dohoda", mena_zal_dohoda = "mena_zal_dohoda", c_zal_czk = "c_zal_czk", popis_zal = "popis_zal", c_vypoc_mena = "c_vypoc_mena", mena_vypoc = "mena_vypoc", c_vypoc_czk = "c_vypoc_czk", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_douct_mena = "c_douct_mena", c_cerppk_mena = "c_cerppk_mena", c_vyuct_mena = "c_vyuct_mena", ixs_tna = "ixs_tna", c = "c", mena = "mena", kurz = "kurz", poznamka = "poznamka", c_mena = "c_mena", c_vypup_mena = "c_vypup_mena", mena_vypup = "mena_vypup", c_vypup_czk = "c_vypup_czk", kurz_vypup = "kurz_vypup", zp_uhr = "zp_uhr", typ_zal = "typ_zal", priz_smena = "priz_smena", priz_rpp = "priz_rpp", c_vlastni = "c_vlastni", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", sender = "sender", cislo_cp = "cislo_cp", osoba_txt = "osoba_txt", stav_vyc_zkr = "stav_vyc_zkr", cislo_plk = "cislo_plk", mena_vypoc_zkr = "mena_vypoc_zkr", mena_zal_nar_zkr = "mena_zal_nar_zkr", mena_zal_doh_zkr = "mena_zal_doh_zkr", mena_zkr = "mena_zkr", pocetzaznamu = "pocetzaznamu", mena_vypup_zkr = "mena_vypup_zkr", zp_uhr_txt = "zp_uhr_txt", priz_vyuct = "priz_vyuct", c_kvraceni = "c_kvraceni", c_kdoplaceni = "c_kdoplaceni", mena_smena_zkr = "mena_smena_zkr", mena_vyuct_zkr = "mena_vyuct_zkr",}
	const enum GRcnPrikazVyuctovaniDtoFragments { ixp = "main", radek = "main", stav_vyc = "main", ixp_zal = "main", ixp_pok = "main", ixp_plk = "main", ixp_den_pok = "main", ixs_kon_pok = "main", c_zal_narok = "main", mena_zal_narok = "main", c_zal_dohoda = "main", mena_zal_dohoda = "main", c_zal_czk = "main", popis_zal = "main", c_vypoc_mena = "main", mena_vypoc = "main", c_vypoc_czk = "main", rok = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c_douct_mena = "main", c_cerppk_mena = "main", c_vyuct_mena = "main", ixs_tna = "main", c = "main", mena = "main", kurz = "main", poznamka = "main", c_mena = "main", c_vypup_mena = "main", mena_vypup = "main", c_vypup_czk = "main", kurz_vypup = "main", zp_uhr = "main", typ_zal = "main", priz_smena = "main", priz_rpp = "main", c_vlastni = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", sender = "*", cislo_cp = "*", osoba_txt = "*", stav_vyc_zkr = "*", cislo_plk = "*", mena_vypoc_zkr = "*", mena_zal_nar_zkr = "*", mena_zal_doh_zkr = "*", mena_zkr = "*", pocetzaznamu = "*", mena_vypup_zkr = "*", zp_uhr_txt = "*", priz_vyuct = "*", c_kvraceni = "*", c_kdoplaceni = "*", mena_smena_zkr = "*", mena_vyuct_zkr = "*",}
	const enum GRcnPrikazVyuctovaniDtoTypes { ixp = "string", radek = "number", stav_vyc = "number", ixp_zal = "string", ixp_pok = "string", ixp_plk = "string", ixp_den_pok = "string", ixs_kon_pok = "string", c_zal_narok = "JsonDecimal", mena_zal_narok = "number", c_zal_dohoda = "JsonDecimal", mena_zal_dohoda = "number", c_zal_czk = "JsonDecimal", popis_zal = "string", c_vypoc_mena = "JsonDecimal", mena_vypoc = "number", c_vypoc_czk = "JsonDecimal", rok = "number", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_douct_mena = "JsonDecimal", c_cerppk_mena = "JsonDecimal", c_vyuct_mena = "JsonDecimal", ixs_tna = "string", c = "JsonDecimal", mena = "number", kurz = "JsonDecimal", poznamka = "string", c_mena = "JsonDecimal", c_vypup_mena = "JsonDecimal", mena_vypup = "number", c_vypup_czk = "JsonDecimal", kurz_vypup = "JsonDecimal", zp_uhr = "number", typ_zal = "number", priz_smena = "number", priz_rpp = "number", c_vlastni = "JsonDecimal", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", sender = "string", cislo_cp = "string", osoba_txt = "string", stav_vyc_zkr = "string", cislo_plk = "string", mena_vypoc_zkr = "string", mena_zal_nar_zkr = "string", mena_zal_doh_zkr = "string", mena_zkr = "string", pocetzaznamu = "number", mena_vypup_zkr = "string", zp_uhr_txt = "string", priz_vyuct = "string", c_kvraceni = "JsonDecimal", c_kdoplaceni = "JsonDecimal", mena_smena_zkr = "string", mena_vyuct_zkr = "string",}
	const enum GRcnPrikazVyuctovaniDtoTypeLengths { ixp = 12, ixp_zal = 12, ixp_pok = 12, ixp_plk = 12, ixp_den_pok = 12, ixs_kon_pok = 12, popis_zal = 50, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, ixs_tna = 12, poznamka = 254, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazVyuctovaniSumarDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující sumář vyúčtování cestujícího.*/
	interface GRcnPrikazVyuctovaniSumarDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Identifikátor pokladního dokladu.*/
		ixp_pok?: string|null;
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok?: string|null;
		/**Rok.*/
		rok?: number|null;
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
		/**Příznak pk.*/
		priz_pk?: number|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Identifikátor funkce POK.*/
		ixs_fun_pok?: string|null;
		/**Příznak typu dokumentu.*/
		priz_typ_dok?: number|null;
		/**Řádek pokladní položky.*/
		radek_pok?: number|null;
		/**Příznak zálohy.*/
		priz_zaloha?: number|null;
		/**Částka upraveno.*/
		c_upr?: JsonDecimal|null;
		/**Kód měny upraveno.*/
		mena_upr?: number|null;
		/**Kurz upraveno.*/
		kurz_upr?: JsonDecimal|null;
		/**Příznak upraveno.*/
		priz_upr?: number|null;
		/**Datum kurzu.*/
		dat_kurz?: JsonDate|null;
		/**Částka upraveno zaokrouhleno.*/
		c_upr_zao?: JsonDecimal|null;
		/**Úroveň sum.*/
		uroven_sum?: number|null;
		/**Částka lokální evidence financování.*/
		c_lef?: JsonDecimal|null;
		/**Kód způsobu úpravy.*/
		zp_uhr?: number|null;
		/**Kód způsobu úpravy původní.*/
		zp_uhr_puv?: number|null;
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
		/**Bu ci.*/
		bu_ci?: string|null;
		/**Sk ci.*/
		sk_ci?: string|null;
		/**Název pokladní knihy.*/
		ixp_den_pok_txt?: string|null;
		/**Ixp_txt.*/
		ixp_txt?: string|null;
		/**Ixs_fun_pok_txt.*/
		ixs_fun_pok_txt?: string|null;
		/**Ixs_tna_txt.*/
		ixs_tna_txt?: string|null;
		/**Mena_txt.*/
		mena_txt?: string|null;
		/**Mena_upr_txt.*/
		mena_upr_txt?: string|null;
		/**Zp_uhr_puv_txt.*/
		zp_uhr_puv_txt?: string|null;
		/**Způsob úhrady textově.*/
		zp_uhr_txt?: string|null;
		/**Sender - cesta(SC), příkaz (CP).*/
		sender?: string|null;
		/**Příznak že byla záporná částka - pro uložení, částky zobrazuji na detailu v absolutní hodnotě.*/
		zaporna_castka?: boolean|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Funkce pokladny.*/
		fun_pok?: string|null;
		/**Přepínač způsobu úhrady.*/
		vyu_pres?: number|null;
		/**Částka vráceno.*/
		readonly c_vrac?: JsonDecimal|null;
		/**Částka vyplaceno.*/
		readonly c_vypl?: JsonDecimal|null;
		/**Částka zaokrouhleno v pokladně.*/
		readonly c_zao_pok?: JsonDecimal|null;
		/**Kód měny lokální evidence financí.*/
		readonly mena_lef?: number|null;
	}
	const enum GRcnPrikazVyuctovaniSumarDtoNames { ixp = "ixp", radek = "radek", c = "c", mena = "mena", ixp_pok = "ixp_pok", ixp_den_pok = "ixp_den_pok", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pk = "priz_pk", ixs_tna = "ixs_tna", ixs_fun_pok = "ixs_fun_pok", priz_typ_dok = "priz_typ_dok", radek_pok = "radek_pok", priz_zaloha = "priz_zaloha", c_upr = "c_upr", mena_upr = "mena_upr", kurz_upr = "kurz_upr", priz_upr = "priz_upr", dat_kurz = "dat_kurz", c_upr_zao = "c_upr_zao", uroven_sum = "uroven_sum", c_lef = "c_lef", zp_uhr = "zp_uhr", zp_uhr_puv = "zp_uhr_puv", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", bu_ci = "bu_ci", sk_ci = "sk_ci", ixp_den_pok_txt = "ixp_den_pok_txt", ixp_txt = "ixp_txt", ixs_fun_pok_txt = "ixs_fun_pok_txt", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", mena_upr_txt = "mena_upr_txt", zp_uhr_puv_txt = "zp_uhr_puv_txt", zp_uhr_txt = "zp_uhr_txt", sender = "sender", zaporna_castka = "zaporna_castka", mena_zkr = "mena_zkr", fun_pok = "fun_pok", vyu_pres = "vyu_pres", c_vrac = "c_vrac", c_vypl = "c_vypl", c_zao_pok = "c_zao_pok", mena_lef = "mena_lef",}
	const enum GRcnPrikazVyuctovaniSumarDtoFragments { ixp = "main", radek = "main", c = "main", mena = "main", ixp_pok = "main", ixp_den_pok = "main", rok = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", priz_pk = "main", ixs_tna = "main", ixs_fun_pok = "main", priz_typ_dok = "main", radek_pok = "main", priz_zaloha = "main", c_upr = "main", mena_upr = "main", kurz_upr = "main", priz_upr = "main", dat_kurz = "main", c_upr_zao = "main", uroven_sum = "main", c_lef = "main", zp_uhr = "main", zp_uhr_puv = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", bu_ci = "main", sk_ci = "main", ixp_den_pok_txt = "ixp_den_pok_txt", ixp_txt = "ixp_txt", ixs_fun_pok_txt = "ixs_fun_pok_txt", ixs_tna_txt = "ixs_tna_txt", mena_txt = "mena_txt", mena_upr_txt = "mena_upr_txt", zp_uhr_puv_txt = "zp_uhr_puv_txt", zp_uhr_txt = "zp_uhr_txt", sender = "*", zaporna_castka = "*", mena_zkr = "*", fun_pok = "*", vyu_pres = "*", c_vrac = "*", c_vypl = "*", c_zao_pok = "*", mena_lef = "*",}
	const enum GRcnPrikazVyuctovaniSumarDtoTypes { ixp = "string", radek = "number", c = "JsonDecimal", mena = "number", ixp_pok = "string", ixp_den_pok = "string", rok = "number", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pk = "number", ixs_tna = "string", ixs_fun_pok = "string", priz_typ_dok = "number", radek_pok = "number", priz_zaloha = "number", c_upr = "JsonDecimal", mena_upr = "number", kurz_upr = "JsonDecimal", priz_upr = "number", dat_kurz = "JsonDate", c_upr_zao = "JsonDecimal", uroven_sum = "number", c_lef = "JsonDecimal", zp_uhr = "number", zp_uhr_puv = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", bu_ci = "string", sk_ci = "string", ixp_den_pok_txt = "string", ixp_txt = "string", ixs_fun_pok_txt = "string", ixs_tna_txt = "string", mena_txt = "string", mena_upr_txt = "string", zp_uhr_puv_txt = "string", zp_uhr_txt = "string", sender = "string", zaporna_castka = "boolean", mena_zkr = "string", fun_pok = "string", vyu_pres = "number", c_vrac = "JsonDecimal", c_vypl = "JsonDecimal", c_zao_pok = "JsonDecimal", mena_lef = "number",}
	const enum GRcnPrikazVyuctovaniSumarDtoTypeLengths { ixp = 12, ixp_pok = 12, ixp_den_pok = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, ixs_tna = 12, ixs_fun_pok = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, bu_ci = 34, sk_ci = 11,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazZalohaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující zálohu na příkaze.*/
	interface GRcnPrikazZalohaDto {
		/**Identifikátor zálohy.*/
		ixp_zal?: string|null;
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Identifikátor pok.*/
		ixp_pok?: string|null;
		/**Částka nárok.*/
		c_narok?: JsonDecimal|null;
		/**Částka dohoda.*/
		c_dohoda?: JsonDecimal|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Příznak generovaného záznamu.*/
		priz_gen?: number|null;
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
		/**Kód měny nároku.*/
		mena_narok?: number|null;
		/**Kód měny dohody.*/
		mena_dohoda?: number|null;
		/**Kód stavu zálohy.*/
		priz_zal?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Příznak pred.*/
		priz_pred?: number|null;
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok?: string|null;
		/**Identifikátor pokladní kontace.*/
		ixs_kon_pok?: string|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Identifikátor vlastníka v POK.*/
		ixs_fun_pok?: string|null;
		/**Řádek POK.*/
		radek_pok?: number|null;
		/**Kód typu zálohy.*/
		typ_zal?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Částka vyúčtování.*/
		c_vyuct?: JsonDecimal|null;
		/**Identifikátor zal puv.*/
		ixp_zal_puv?: string|null;
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
		/**Bu ci.*/
		bu_ci?: string|null;
		/**Sk ci.*/
		sk_ci?: string|null;
		/**Cislo_plk.*/
		cislo_plk?: string|null;
		/**Cislo_pok.*/
		cislo_pok?: string|null;
		/**Fun_pok.*/
		fun_pok?: string|null;
		/**Mena_narok_zkr.*/
		mena_narok_zkr?: string|null;
		/**Mena_dohoda_zkr.*/
		mena_dohoda_zkr?: string|null;
		/**Priz_zal_txt.*/
		priz_zal_txt?: string|null;
		/**Ixp_den.*/
		ixp_den?: string|null;
		/**Typ zalohy.*/
		readonly typ_zal_txt?: string|null;
		/**Ixp_filtr - pid z filtru.*/
		ixp_filtr?: string|null;
		/**Plna moc.*/
		readonly priz_pm?: string|null;
	}
	const enum GRcnPrikazZalohaDtoNames { ixp_zal = "ixp_zal", ixp = "ixp", ixp_plk = "ixp_plk", ixp_pok = "ixp_pok", c_narok = "c_narok", c_dohoda = "c_dohoda", c = "c", poznamka = "poznamka", popis = "popis", priz_gen = "priz_gen", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", mena_narok = "mena_narok", mena_dohoda = "mena_dohoda", priz_zal = "priz_zal", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pred = "priz_pred", ixp_den_pok = "ixp_den_pok", ixs_kon_pok = "ixs_kon_pok", ixs_tna = "ixs_tna", ixs_fun_pok = "ixs_fun_pok", radek_pok = "radek_pok", typ_zal = "typ_zal", rok = "rok", c_vyuct = "c_vyuct", ixp_zal_puv = "ixp_zal_puv", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", bu_ci = "bu_ci", sk_ci = "sk_ci", cislo_plk = "cislo_plk", cislo_pok = "cislo_pok", fun_pok = "fun_pok", mena_narok_zkr = "mena_narok_zkr", mena_dohoda_zkr = "mena_dohoda_zkr", priz_zal_txt = "priz_zal_txt", ixp_den = "ixp_den", typ_zal_txt = "typ_zal_txt", ixp_filtr = "ixp_filtr", priz_pm = "priz_pm",}
	const enum GRcnPrikazZalohaDtoFragments { ixp_zal = "main", ixp = "main", ixp_plk = "main", ixp_pok = "main", c_narok = "main", c_dohoda = "main", c = "main", poznamka = "main", popis = "main", priz_gen = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", mena_narok = "main", mena_dohoda = "main", priz_zal = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", priz_pred = "main", ixp_den_pok = "main", ixs_kon_pok = "main", ixs_tna = "main", ixs_fun_pok = "main", radek_pok = "main", typ_zal = "main", rok = "main", c_vyuct = "main", ixp_zal_puv = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", bu_ci = "main", sk_ci = "main", cislo_plk = "*", cislo_pok = "*", fun_pok = "*", mena_narok_zkr = "*", mena_dohoda_zkr = "*", priz_zal_txt = "*", ixp_den = "*", typ_zal_txt = "*", ixp_filtr = "*", priz_pm = "*",}
	const enum GRcnPrikazZalohaDtoTypes { ixp_zal = "string", ixp = "string", ixp_plk = "string", ixp_pok = "string", c_narok = "JsonDecimal", c_dohoda = "JsonDecimal", c = "JsonDecimal", poznamka = "string", popis = "string", priz_gen = "number", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", mena_narok = "number", mena_dohoda = "number", priz_zal = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pred = "number", ixp_den_pok = "string", ixs_kon_pok = "string", ixs_tna = "string", ixs_fun_pok = "string", radek_pok = "number", typ_zal = "number", rok = "number", c_vyuct = "JsonDecimal", ixp_zal_puv = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", bu_ci = "string", sk_ci = "string", cislo_plk = "string", cislo_pok = "string", fun_pok = "string", mena_narok_zkr = "string", mena_dohoda_zkr = "string", priz_zal_txt = "string", ixp_den = "string", typ_zal_txt = "string", ixp_filtr = "string", priz_pm = "string",}
	const enum GRcnPrikazZalohaDtoTypeLengths { ixp_zal = 12, ixp = 12, ixp_plk = 12, ixp_pok = 12, poznamka = 254, popis = 60, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, ixp_den_pok = 12, ixs_kon_pok = 12, ixs_tna = 12, ixs_fun_pok = 12, ixp_zal_puv = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, bu_ci = 34, sk_ci = 11,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazZalohaExportDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující export záloh na příkaze*/
	interface GRcnPrikazZalohaExportDto {
		/**identifikátor*/
		ixp?: string|null;
		/**řádek*/
		radek?: number|null;
		/**kód typu vazby dokladu*/
		typ_vpp?: number|null;
		/**kód stavu exportu*/
		typ_sex?: number|null;
		/**kategorie typu písemnosti*/
		ktg_typ?: number|null;
		/**identifikátor typu písemnosti*/
		ixs_typ?: string|null;
		/**identifikáítor externího subjektu*/
		ixs_esu?: string|null;
		/**typ_upr*/
		typ_upr?: string|null;
		/**druh dokladu*/
		drd?: number|null;
		/**variabilní symbol*/
		vs?: string|null;
		/**konstantní symbol*/
		ks?: string|null;
		/**specifický symbol*/
		ss?: string|null;
		/**směrový kód vlastního účtu*/
		sk_vl?: string|null;
		/**bankovní účet vlastní*/
		bu_vl?: string|null;
		/**směrový kód cizího účtu*/
		sk_ci?: string|null;
		/**bankovní účet cizí*/
		bu_ci?: string|null;
		/**agendové číslo*/
		ac_ag?: string|null;
		/**identifikátor funkce*/
		ixs_fun?: string|null;
		/**rok*/
		rok?: number|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**nákladové středisko*/
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
		/**částka v měně*/
		c_mena?: JsonDecimal|null;
		/**kód měny*/
		mena?: number|null;
		/**čáastka v CZK*/
		c_czk?: JsonDecimal|null;
		/**popis*/
		popis?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**číslo*/
		cislo?: number|null;
		/**identifikátor zálohy*/
		ixp_zal?: string|null;
		/**kód kategorie účetního pohybu*/
		ktg_upo?: number|null;
		/**subřada duz*/
		subrada_duz?: number|null;
		/**datum upo*/
		dat_upo?: JsonDate|null;
		/**identifikátor účetního pohybu*/
		ixp_upr?: string|null;
		/**řádek pohybu*/
		radek_upo?: number|null;
		/**identifikátor smlouvy*/
		ixp_sml?: string|null;
		/**rok smlouvy*/
		rok_sml?: number|null;
		/**číslo smlouvy*/
		cislo_sml?: number|null;
		/**kód typu účetního pohybu*/
		typ_upo?: number|null;
		/**řádek rezervace*/
		radek_rez?: number|null;
		/**číslo rezervace*/
		cislo_rez?: number|null;
		/**licence*/
		lic?: string|null;
		/**druh dokladu*/
		druh_dok?: number|null;
		/**arw*/
		arw?: number|null;
		/**identifikátor knihy*/
		ixp_den?: string|null;
		/**agendové čísloc*/
		ac?: string|null;
		/**datum vystavení*/
		dat_vyst?: JsonDate|null;
		/**datum zdanitelného plnění*/
		dat_zdan?: JsonDate|null;
		/**kód stavu zaúčtování*/
		s_zau?: number|null;
		/**kód stavu tisku*/
		s_tis?: number|null;
		/**kód stavu pořízení*/
		s_sto?: number|null;
		/**eko aktivita*/
		eko_akt?: number|null;
		/**datum evidence*/
		dat_evid?: JsonDate|null;
		/**identifikátor funkce vlastníka*/
		ixs_fun_akt?: string|null;
		/**rok dph*/
		rok_dph?: number|null;
		/**měsíc dph*/
		mesic_dph?: number|null;
		/**kód zdrojové agendy dokladu*/
		typ_pok?: number|null;
		/**kód stavu pokladního dokladu*/
		up_stav?: number|null;
		/**kód kategorie pokladního dokladu*/
		ktg_dok?: number|null;
		/**příznak zobrazení*/
		priz_view?: number|null;
		/**kód způsobu platby*/
		zpus_platby?: number|null;
		/**rezervováno*/
		rezervovano?: number|null;
		/**číslo realizátora*/
		cis_real?: string|null;
		/**částka celkem v měně*/
		c_celkem_m?: JsonDecimal|null;
		/**částka celkem*/
		c_celkem?: JsonDecimal|null;
		/**zdrojová fáze*/
		zdroj_faze?: string|null;
		/**datum schválení*/
		dat_schvaleni?: JsonDate|null;
		/**cs popis*/
		cs_popis?: string|null;
		/**FUC stav zaúčtování*/
		fuc_s_zau?: number|null;
		/**stav schvalovatele*/
		s_schval?: number|null;
		/**záloha*/
		zaloha?: string|null;
		/**ec dd*/
		ec_dd?: string|null;
		/**int dok*/
		int_dok?: number|null;
		/**datum evididence*/
		dat_evid_time?: JsonDate|null;
		/**ps_sml*/
		ps_sml?: string|null;
		/**složitel*/
		slozitel?: string|null;
		/**identifikátor vyřizující funkce*/
		ixs_fun_vyriz?: string|null;
		/**kód kontace*/
		kod_kon?: string|null;
		/**identifikátor kontace*/
		ixs_kon?: string|null;
		/**te1_2*/
		te1_2?: string|null;
		/**bankovní účet vlastní textově*/
		bu_vl_txt?: string|null;
		/**bankovní účet cizí textově*/
		bu_txt_ci?: string|null;
		/**Identifikátor ppv.*/
		ixs_ppv?: string|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Oc.*/
		oc?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Druh ppv.*/
		druh_ppv?: number|null;
		/**Druh ppv txt.*/
		druh_ppv_txt?: string|null;
		/**Datum od.*/
		dat_od?: JsonDate|null;
		/**Datum do.*/
		dat_do?: JsonDate|null;
		/**typu vazby dokladu textově*/
		typ_vpp_txt?: string|null;
		/**stavu exportu textově*/
		typ_sex_txt?: string|null;
		/**název pokladní knihy*/
		den_pok_txt?: string|null;
		/**název funkce POK*/
		fun_pok_txt?: string|null;
		/**kategorie typu písemnosti textově*/
		ktg_typ_txt?: string|null;
		/**název písemnosti*/
		ixs_typ_txt?: string|null;
		/**měna textově*/
		mena_txt?: string|null;
		/**název*/
		nazev_upr?: string|null;
		/**název funkce FUC*/
		fun_fuc_txt?: string|null;
		/**zálohy*/
		zalohy?: boolean|null;
		/**typu účetního pohybu*/
		typUpo?: number|null;
	}
	const enum GRcnPrikazZalohaExportDtoNames { ixp = "ixp", radek = "radek", typ_vpp = "typ_vpp", typ_sex = "typ_sex", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_esu = "ixs_esu", typ_upr = "typ_upr", drd = "drd", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", ac_ag = "ac_ag", ixs_fun = "ixs_fun", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_mena = "c_mena", mena = "mena", c_czk = "c_czk", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_spl = "dat_spl", cislo = "cislo", ixp_zal = "ixp_zal", ktg_upo = "ktg_upo", subrada_duz = "subrada_duz", dat_upo = "dat_upo", ixp_upr = "ixp_upr", radek_upo = "radek_upo", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", typ_upo = "typ_upo", radek_rez = "radek_rez", cislo_rez = "cislo_rez", lic = "lic", druh_dok = "druh_dok", arw = "arw", ixp_den = "ixp_den", ac = "ac", dat_vyst = "dat_vyst", dat_zdan = "dat_zdan", s_zau = "s_zau", s_tis = "s_tis", s_sto = "s_sto", eko_akt = "eko_akt", dat_evid = "dat_evid", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", typ_pok = "typ_pok", up_stav = "up_stav", ktg_dok = "ktg_dok", priz_view = "priz_view", zpus_platby = "zpus_platby", rezervovano = "rezervovano", cis_real = "cis_real", c_celkem_m = "c_celkem_m", c_celkem = "c_celkem", zdroj_faze = "zdroj_faze", dat_schvaleni = "dat_schvaleni", cs_popis = "cs_popis", fuc_s_zau = "fuc_s_zau", s_schval = "s_schval", zaloha = "zaloha", ec_dd = "ec_dd", int_dok = "int_dok", dat_evid_time = "dat_evid_time", ps_sml = "ps_sml", slozitel = "slozitel", ixs_fun_vyriz = "ixs_fun_vyriz", kod_kon = "kod_kon", ixs_kon = "ixs_kon", te1_2 = "te1_2", bu_vl_txt = "bu_vl_txt", bu_txt_ci = "bu_txt_ci", ixs_ppv = "ixs_ppv", mesic = "mesic", oc = "oc", nazev = "nazev", druh_ppv = "druh_ppv", druh_ppv_txt = "druh_ppv_txt", dat_od = "dat_od", dat_do = "dat_do", typ_vpp_txt = "typ_vpp_txt", typ_sex_txt = "typ_sex_txt", den_pok_txt = "den_pok_txt", fun_pok_txt = "fun_pok_txt", ktg_typ_txt = "ktg_typ_txt", ixs_typ_txt = "ixs_typ_txt", mena_txt = "mena_txt", nazev_upr = "nazev_upr", fun_fuc_txt = "fun_fuc_txt", zalohy = "zalohy", typUpo = "typUpo",}
	const enum GRcnPrikazZalohaExportDtoFragments { ixp = "*", radek = "*", typ_vpp = "*", typ_sex = "*", ktg_typ = "*", ixs_typ = "*", ixs_esu = "*", typ_upr = "*", drd = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", ac_ag = "*", ixs_fun = "*", rok = "*", ico = "*", ucs = "*", uus = "*", nks = "*", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", c_mena = "*", mena = "*", c_czk = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_spl = "*", cislo = "*", ixp_zal = "*", ktg_upo = "*", subrada_duz = "*", dat_upo = "*", ixp_upr = "*", radek_upo = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", typ_upo = "*", radek_rez = "*", cislo_rez = "*", lic = "*", druh_dok = "*", arw = "*", ixp_den = "*", ac = "*", dat_vyst = "*", dat_zdan = "*", s_zau = "*", s_tis = "*", s_sto = "*", eko_akt = "*", dat_evid = "*", ixs_fun_akt = "*", rok_dph = "*", mesic_dph = "*", typ_pok = "*", up_stav = "*", ktg_dok = "*", priz_view = "*", zpus_platby = "*", rezervovano = "*", cis_real = "*", c_celkem_m = "*", c_celkem = "*", zdroj_faze = "*", dat_schvaleni = "*", cs_popis = "*", fuc_s_zau = "*", s_schval = "*", zaloha = "*", ec_dd = "*", int_dok = "*", dat_evid_time = "*", ps_sml = "*", slozitel = "*", ixs_fun_vyriz = "*", kod_kon = "*", ixs_kon = "*", te1_2 = "*", bu_vl_txt = "*", bu_txt_ci = "*", ixs_ppv = "main", mesic = "main", oc = "main", nazev = "main", druh_ppv = "main", druh_ppv_txt = "main", dat_od = "main", dat_do = "main", typ_vpp_txt = "*", typ_sex_txt = "*", den_pok_txt = "*", fun_pok_txt = "*", ktg_typ_txt = "*", ixs_typ_txt = "*", mena_txt = "*", nazev_upr = "*", fun_fuc_txt = "*", zalohy = "*", typUpo = "*",}
	const enum GRcnPrikazZalohaExportDtoTypes { ixp = "string", radek = "number", typ_vpp = "number", typ_sex = "number", ktg_typ = "number", ixs_typ = "string", ixs_esu = "string", typ_upr = "string", drd = "number", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", ac_ag = "string", ixs_fun = "string", rok = "number", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c_mena = "JsonDecimal", mena = "number", c_czk = "JsonDecimal", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_spl = "JsonDate", cislo = "number", ixp_zal = "string", ktg_upo = "number", subrada_duz = "number", dat_upo = "JsonDate", ixp_upr = "string", radek_upo = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", typ_upo = "number", radek_rez = "number", cislo_rez = "number", lic = "string", druh_dok = "number", arw = "number", ixp_den = "string", ac = "string", dat_vyst = "JsonDate", dat_zdan = "JsonDate", s_zau = "number", s_tis = "number", s_sto = "number", eko_akt = "number", dat_evid = "JsonDate", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", typ_pok = "number", up_stav = "number", ktg_dok = "number", priz_view = "number", zpus_platby = "number", rezervovano = "number", cis_real = "string", c_celkem_m = "JsonDecimal", c_celkem = "JsonDecimal", zdroj_faze = "string", dat_schvaleni = "JsonDate", cs_popis = "string", fuc_s_zau = "number", s_schval = "number", zaloha = "string", ec_dd = "string", int_dok = "number", dat_evid_time = "JsonDate", ps_sml = "string", slozitel = "string", ixs_fun_vyriz = "string", kod_kon = "string", ixs_kon = "string", te1_2 = "string", bu_vl_txt = "string", bu_txt_ci = "string", ixs_ppv = "string", mesic = "number", oc = "string", nazev = "string", druh_ppv = "number", druh_ppv_txt = "string", dat_od = "JsonDate", dat_do = "JsonDate", typ_vpp_txt = "string", typ_sex_txt = "string", den_pok_txt = "string", fun_pok_txt = "string", ktg_typ_txt = "string", ixs_typ_txt = "string", mena_txt = "string", nazev_upr = "string", fun_fuc_txt = "string", zalohy = "boolean", typUpo = "number",}
	const enum GRcnPrikazZalohaExportDtoTypeLengths { ixp = 12, ixs_typ = 12, ixs_esu = 12, typ_upr = 15, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ac_ag = 20, ixs_fun = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis = 254, zmenu_prov = 12, ixp_zal = 12, ixp_upr = 12, ixp_sml = 12, lic = 4, ixp_den = 12, ac = 20, ixs_fun_akt = 12, cis_real = 6, zdroj_faze = 8, cs_popis = 254, zaloha = 12, ec_dd = 60, ps_sml = 12, slozitel = 254, ixs_fun_vyriz = 12, kod_kon = 30, ixs_kon = 12, te1_2 = 16, bu_vl_txt = 46, bu_txt_ci = 46, ixs_ppv = 12, oc = 30, nazev = 50, druh_ppv_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazZalohaPlnaMocDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující plnou moc na vyplácení záloh.*/
	interface GRcnPrikazZalohaPlnaMocDto {
		/**Identifikátor původní položky.*/
		ixp_pol_puv?: string|null;
		/**Identifikátor cílové položky.*/
		ixp_pol_dest?: string|null;
		/**Identifikátor zálohy.*/
		ixp_zal?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Zmocněnec.*/
		zmocnenec?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Číslo původní položky.*/
		cis_pol_puv?: string|null;
		/**Číslo cílové položky.*/
		cis_pol_dest?: string|null;
		/**Referent cílové položky.*/
		ref_pol_dest?: string|null;
		/**Vlastník.*/
		vlastnik?: string|null;
	}
	const enum GRcnPrikazZalohaPlnaMocDtoNames { ixp_pol_puv = "ixp_pol_puv", ixp_pol_dest = "ixp_pol_dest", ixp_zal = "ixp_zal", poznamka = "poznamka", zmocnenec = "zmocnenec", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_osr = "ixs_osr", cis_pol_puv = "cis_pol_puv", cis_pol_dest = "cis_pol_dest", ref_pol_dest = "ref_pol_dest", vlastnik = "vlastnik",}
	const enum GRcnPrikazZalohaPlnaMocDtoFragments { ixp_pol_puv = "*", ixp_pol_dest = "*", ixp_zal = "*", poznamka = "*", zmocnenec = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_osr = "*", cis_pol_puv = "*", cis_pol_dest = "*", ref_pol_dest = "*", vlastnik = "*",}
	const enum GRcnPrikazZalohaPlnaMocDtoTypes { ixp_pol_puv = "string", ixp_pol_dest = "string", ixp_zal = "string", poznamka = "string", zmocnenec = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_osr = "string", cis_pol_puv = "string", cis_pol_dest = "string", ref_pol_dest = "string", vlastnik = "string",}
	const enum GRcnPrikazZalohaPlnaMocDtoTypeLengths { ixp_pol_puv = 12, ixp_pol_dest = 12, ixp_zal = 12, poznamka = 254, zmocnenec = 150, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrikazZalohaVyuctovaniDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující vyúčtování zálohy.*/
	interface GRcnPrikazZalohaVyuctovaniDto {
		/**Identifikátor zálohy.*/
		ixp_zal?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Částka vyúčtování.*/
		c_vyuct?: JsonDecimal|null;
		/**Kód měny vyúčtování.*/
		mena_vyuct?: number|null;
		/**Identifikátor kurzu.*/
		ixp_kur?: string|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok?: string|null;
		/**Identifikátor funkce POK.*/
		ixs_fun_pok?: string|null;
		/**Částka směny.*/
		c_smena?: JsonDecimal|null;
		/**Kód měny směny.*/
		mena_smena?: number|null;
		/**Kurz směny.*/
		kurz_smena?: JsonDecimal|null;
		/**Částka po směně.*/
		c_posmene?: JsonDecimal|null;
		/**Poznámka směny.*/
		pozn_smena?: string|null;
		/**Datum směny.*/
		dat_smena?: JsonDate|null;
		/**Pořadí směny.*/
		por_smena?: number|null;
		/**Částka zpracováno.*/
		c_zprac?: JsonDecimal|null;
		/**Částka vlastní.*/
		c_vlastni?: JsonDecimal|null;
		/**Částka dohody.*/
		c_dohoda?: JsonDecimal|null;
		/**Kód měny dohody.*/
		mena_dohoda?: number|null;
		/**Zkratka měny směny.*/
		mena_smena_zkr?: string|null;
		/**Zkratka měny vyúčtování.*/
		mena_vyuct_zkr?: string|null;
		/**Název pokladní knihy.*/
		nazev_pok_den?: string|null;
		/**Funkce POK.*/
		fun_pok?: string|null;
	}
	const enum GRcnPrikazZalohaVyuctovaniDtoNames { ixp_zal = "ixp_zal", radek = "radek", c_vyuct = "c_vyuct", mena_vyuct = "mena_vyuct", ixp_kur = "ixp_kur", kurz = "kurz", c = "c", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", ixp_den_pok = "ixp_den_pok", ixs_fun_pok = "ixs_fun_pok", c_smena = "c_smena", mena_smena = "mena_smena", kurz_smena = "kurz_smena", c_posmene = "c_posmene", pozn_smena = "pozn_smena", dat_smena = "dat_smena", por_smena = "por_smena", c_zprac = "c_zprac", c_vlastni = "c_vlastni", c_dohoda = "c_dohoda", mena_dohoda = "mena_dohoda", mena_smena_zkr = "mena_smena_zkr", mena_vyuct_zkr = "mena_vyuct_zkr", nazev_pok_den = "nazev_pok_den", fun_pok = "fun_pok",}
	const enum GRcnPrikazZalohaVyuctovaniDtoFragments { ixp_zal = "*", radek = "*", c_vyuct = "*", mena_vyuct = "*", ixp_kur = "*", kurz = "*", c = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", rok = "*", ico = "*", ucs = "*", uus = "*", nks = "*", ixp_den_pok = "*", ixs_fun_pok = "*", c_smena = "*", mena_smena = "*", kurz_smena = "*", c_posmene = "*", pozn_smena = "*", dat_smena = "*", por_smena = "*", c_zprac = "*", c_vlastni = "*", c_dohoda = "*", mena_dohoda = "*", mena_smena_zkr = "*", mena_vyuct_zkr = "*", nazev_pok_den = "*", fun_pok = "*",}
	const enum GRcnPrikazZalohaVyuctovaniDtoTypes { ixp_zal = "string", radek = "number", c_vyuct = "JsonDecimal", mena_vyuct = "number", ixp_kur = "string", kurz = "JsonDecimal", c = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", rok = "number", ico = "string", ucs = "string", uus = "string", nks = "string", ixp_den_pok = "string", ixs_fun_pok = "string", c_smena = "JsonDecimal", mena_smena = "number", kurz_smena = "JsonDecimal", c_posmene = "JsonDecimal", pozn_smena = "string", dat_smena = "JsonDate", por_smena = "number", c_zprac = "JsonDecimal", c_vlastni = "JsonDecimal", c_dohoda = "JsonDecimal", mena_dohoda = "number", mena_smena_zkr = "string", mena_vyuct_zkr = "string", nazev_pok_den = "string", fun_pok = "string",}
	const enum GRcnPrikazZalohaVyuctovaniDtoTypeLengths { ixp_zal = 12, ixp_kur = 12, poznamka = 254, zmenu_prov = 12, ico = 10, ucs = 10, uus = 10, nks = 12, ixp_den_pok = 12, ixs_fun_pok = 12, pozn_smena = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnPrintParamDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující parametry pro tisk.*/
	interface GRcnPrintParamDto {
		/**Identifikátor příkazu.*/
		ixp?: string|null;
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Identifikátor pasu.*/
		ixp_pas?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Identifikátor cestovního pojištění.*/
		ixp_cpo?: string|null;
		/**Identifikátor rezervace vozidla.*/
		ixs_rsv?: string|null;
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Identifikátor víza.*/
		ixp_viz?: string|null;
		/**Nákladové středisko.*/
		ns?: string|null;
	}
	const enum GRcnPrintParamDtoNames { ixp = "ixp", ixs_rcn = "ixs_rcn", ixs_osr = "ixs_osr", ixp_pas = "ixp_pas", ixp_plk = "ixp_plk", ixp_cpo = "ixp_cpo", ixs_rsv = "ixs_rsv", ixp_aus = "ixp_aus", ixp_viz = "ixp_viz", ns = "ns",}
	const enum GRcnPrintParamDtoFragments { ixp = "*", ixs_rcn = "*", ixs_osr = "*", ixp_pas = "*", ixp_plk = "*", ixp_cpo = "*", ixs_rsv = "*", ixp_aus = "*", ixp_viz = "*", ns = "*",}
	const enum GRcnPrintParamDtoTypes { ixp = "string", ixs_rcn = "string", ixs_osr = "string", ixp_pas = "string", ixp_plk = "string", ixp_cpo = "string", ixs_rsv = "string", ixp_aus = "string", ixp_viz = "string", ns = "string",}
	const enum GRcnPrintParamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnRezervaceVozidlaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující rezervaci vozidla.*/
	interface GRcnRezervaceVozidlaDto {
		/**Identifikátor rezervace.*/
		ixs_rsv?: string|null;
		/**Kód typu rezervace.*/
		typ_rsv?: number|null;
		/**Kód stavu rezervace.*/
		stav_rsv?: number|null;
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Místo nástupu.*/
		misto_n?: string|null;
		/**Datum nástupu.*/
		dat_n?: JsonDate|null;
		/**Místo ukončení.*/
		misto_u?: string|null;
		/**Datum ukončení.*/
		dat_u?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Identifikátor funkce zadavatele.*/
		ixs_fun_zad?: string|null;
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt?: string|null;
		/**Identifikátor primární rezervace (sloučení).*/
		ixs_rsv_prim?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Místo.*/
		misto?: string|null;
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
		/**Název knihy.*/
		ixp_den_txt?: string|null;
		/**Číslo platební karty.*/
		ixp_plk_txt?: string|null;
		/**Název cesty.*/
		ixs_rcn_txt?: string|null;
		/**Stav rezervace textově.*/
		stav_rsv_txt?: string|null;
		/**Typ rezervace textově.*/
		typ_rsv_txt?: string|null;
		/**Popis vozidla (typ, značka vozidla).*/
		aus_txt?: string|null;
		/**Stav navázané cesty.*/
		stav_rcn_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnRezervaceVozidlaDtoNames { ixs_rsv = "ixs_rsv", typ_rsv = "typ_rsv", stav_rsv = "stav_rsv", ixs_rcn = "ixs_rcn", ixp_aus = "ixp_aus", ixp_plk = "ixp_plk", ac = "ac", evi_cis = "evi_cis", nazev = "nazev", misto_n = "misto_n", dat_n = "dat_n", misto_u = "misto_u", dat_u = "dat_u", poznamka = "poznamka", ixs_fun_zad = "ixs_fun_zad", ixs_fun_akt = "ixs_fun_akt", ixs_rsv_prim = "ixs_rsv_prim", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_den = "ixp_den", misto = "misto", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", ixp_den_txt = "ixp_den_txt", ixp_plk_txt = "ixp_plk_txt", ixs_rcn_txt = "ixs_rcn_txt", stav_rsv_txt = "stav_rsv_txt", typ_rsv_txt = "typ_rsv_txt", aus_txt = "aus_txt", stav_rcn_txt = "stav_rcn_txt", pocet = "pocet",}
	const enum GRcnRezervaceVozidlaDtoFragments { ixs_rsv = "main", typ_rsv = "main", stav_rsv = "main", ixs_rcn = "main", ixp_aus = "main", ixp_plk = "main", ac = "main", evi_cis = "main", nazev = "main", misto_n = "main", dat_n = "main", misto_u = "main", dat_u = "main", poznamka = "main", ixs_fun_zad = "main", ixs_fun_akt = "main", ixs_rsv_prim = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_den = "main", misto = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", ixp_den_txt = "ixp_den_txt", ixp_plk_txt = "ixp_plk_txt", ixs_rcn_txt = "ixs_rcn_txt", stav_rsv_txt = "stav_rsv_txt", typ_rsv_txt = "typ_rsv_txt", aus_txt = "aus_txt", stav_rcn_txt = "stav_rcn_txt", pocet = "main",}
	const enum GRcnRezervaceVozidlaDtoTypes { ixs_rsv = "string", typ_rsv = "number", stav_rsv = "number", ixs_rcn = "string", ixp_aus = "string", ixp_plk = "string", ac = "string", evi_cis = "string", nazev = "string", misto_n = "string", dat_n = "JsonDate", misto_u = "string", dat_u = "JsonDate", poznamka = "string", ixs_fun_zad = "string", ixs_fun_akt = "string", ixs_rsv_prim = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_den = "string", misto = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", ixp_den_txt = "string", ixp_plk_txt = "string", ixs_rcn_txt = "string", stav_rsv_txt = "string", typ_rsv_txt = "string", aus_txt = "string", stav_rcn_txt = "string", pocet = "number",}
	const enum GRcnRezervaceVozidlaDtoTypeLengths { ixs_rsv = 12, ixs_rcn = 12, ixp_aus = 12, ixp_plk = 12, ac = 20, evi_cis = 20, nazev = 50, misto_n = 50, misto_u = 50, poznamka = 254, ixs_fun_zad = 12, ixs_fun_akt = 12, ixs_rsv_prim = 12, zmenu_prov = 12, ixp_den = 12, misto = 255,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnRezervaceVozidlaUcastnikDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující účastníka na rezervaci vozidla.*/
	interface GRcnRezervaceVozidlaUcastnikDto {
		/**Identifikátor rezervace.*/
		ixs_rsv?: string|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
		/**Jméno osoby.*/
		jmeno_osr?: string|null;
		/**Příjmení osoby.*/
		prijmeni_osr?: string|null;
		/**Titul před.*/
		tit_pred?: string|null;
		/**Titul za.*/
		tit_za?: string|null;
		/**Osobní číslo.*/
		os_cislo?: string|null;
		/**Hodnost.*/
		hodnost?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód vztahu účastníka.*/
		stav_dos?: number|null;
		/**Vztah účastníka textově.*/
		stav_dos_txt?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
	}
	const enum GRcnRezervaceVozidlaUcastnikDtoNames { ixs_rsv = "ixs_rsv", ixs_osr = "ixs_osr", jmeno_osr = "jmeno_osr", prijmeni_osr = "prijmeni_osr", tit_pred = "tit_pred", tit_za = "tit_za", os_cislo = "os_cislo", hodnost = "hodnost", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_dos = "stav_dos", stav_dos_txt = "stav_dos_txt", poznamka = "poznamka",}
	const enum GRcnRezervaceVozidlaUcastnikDtoFragments { ixs_rsv = "main", ixs_osr = "main", jmeno_osr = "main", prijmeni_osr = "main", tit_pred = "main", tit_za = "main", os_cislo = "main", hodnost = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", stav_dos = "main", stav_dos_txt = "stav_dos_txt", poznamka = "main",}
	const enum GRcnRezervaceVozidlaUcastnikDtoTypes { ixs_rsv = "string", ixs_osr = "string", jmeno_osr = "string", prijmeni_osr = "string", tit_pred = "string", tit_za = "string", os_cislo = "string", hodnost = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_dos = "number", stav_dos_txt = "string", poznamka = "string",}
	const enum GRcnRezervaceVozidlaUcastnikDtoTypeLengths { ixs_rsv = 12, ixs_osr = 12, zmenu_prov = 12, poznamka = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnRozpoctovyZapisDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující rozpočtový zápis.*/
	interface GRcnRozpoctovyZapisDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Variabilní symbol.*/
		vs?: string|null;
		/**Typ agendy (kód).*/
		typ_ag?: number|null;
		/**Zkratka agendy.*/
		zkr_ag?: string|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**Počet dokladů využívajících danou RPP.*/
		pocet_pouzitych?: number|null;
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
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
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnRozpoctovyZapisDtoNames { ixp = "ixp", ac = "ac", popis = "popis", vs = "vs", typ_ag = "typ_ag", zkr_ag = "zkr_ag", c = "c", pocet_pouzitych = "pocet_pouzitych", rok = "rok", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", pocet = "pocet",}
	const enum GRcnRozpoctovyZapisDtoFragments { ixp = "main", ac = "main", popis = "main", vs = "main", typ_ag = "main", zkr_ag = "main", c = "main", pocet_pouzitych = "main", rok = "main", ico = "main", ucs = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", pocet = "main",}
	const enum GRcnRozpoctovyZapisDtoTypes { ixp = "string", ac = "string", popis = "string", vs = "string", typ_ag = "number", zkr_ag = "string", c = "JsonDecimal", pocet_pouzitych = "number", rok = "number", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", pocet = "number",}
	const enum GRcnRozpoctovyZapisDtoTypeLengths { ixp = 12, ac = 20, popis = 254, vs = 12, zkr_ag = 50, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnSluzebniVozidloDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující služební vozidlo.*/
	interface GRcnSluzebniVozidloDto {
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Druh vozidla.*/
		druh_aus?: string|null;
		/**Typ vozidla.*/
		typ_aus?: string|null;
		/**Popis.*/
		popis_aus?: string|null;
		/**Identifikační číslo vozidla.*/
		vin?: string|null;
		/**Rok výroby.*/
		rok_vyroby?: number|null;
		/**Obsah.*/
		obsah?: JsonDecimal|null;
		/**Kód typu pohonné hmoty.*/
		phm?: number|null;
		/**Barva.*/
		barva?: string|null;
		/**Počt míst.*/
		poc_mist?: number|null;
		/**Spojovací zařízení.*/
		spoj_zar?: string|null;
		/**Spz.*/
		spz?: string|null;
		/**Číslo tp.*/
		cislo_tp?: string|null;
		/**Číslo otp.*/
		cislo_otp?: string|null;
		/**Datum stk.*/
		dat_stk?: JsonDate|null;
		/**Datum měření emisí.*/
		dat_me?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Spotřeba 1.*/
		spotreba_phm1?: JsonDecimal|null;
		/**Spotřeba 2.*/
		spotreba_phm2?: JsonDecimal|null;
		/**Spotřeba 3.*/
		spotreba_phm3?: JsonDecimal|null;
		/**Spotřeba průměr.*/
		spotreba_prum?: JsonDecimal|null;
		/**Identifikátor funkce kompetenta.*/
		ixs_fun_kom?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Identifikátor organizační jednotky.*/
		ixs_orj?: string|null;
		/**Kód druhu vozidla.*/
		drh_aus?: number|null;
		/**Kód kategorie vozidla.*/
		kat_aus?: number|null;
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
		/**Druh vozidla textově.*/
		drh_aus_txt?: string|null;
		/**Kategorie vozidla textově.*/
		kat_aus_txt?: string|null;
		/**Typ pohonných hmot textově.*/
		phm_txt?: string|null;
		/**Funkce kompetenta.*/
		fun_kom_txt?: string|null;
		/**Organizační jednotka.*/
		orj_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Datum nástupu cesty - pro filtr křížení.*/
		dat_n?: JsonDate|null;
		/**Datum ukončení cesty - pro filtr křížení.*/
		dat_u?: JsonDate|null;
		/**Rezervace vozidel - pro kontrolu křížení resp. vyřazení aktuální rezervace z filtru.*/
		ixs_rsv?: string|null;
	}
	const enum GRcnSluzebniVozidloDtoNames { ixp_aus = "ixp_aus", ixp_den = "ixp_den", ac = "ac", evi_cis = "evi_cis", druh_aus = "druh_aus", typ_aus = "typ_aus", popis_aus = "popis_aus", vin = "vin", rok_vyroby = "rok_vyroby", obsah = "obsah", phm = "phm", barva = "barva", poc_mist = "poc_mist", spoj_zar = "spoj_zar", spz = "spz", cislo_tp = "cislo_tp", cislo_otp = "cislo_otp", dat_stk = "dat_stk", dat_me = "dat_me", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", spotreba_phm1 = "spotreba_phm1", spotreba_phm2 = "spotreba_phm2", spotreba_phm3 = "spotreba_phm3", spotreba_prum = "spotreba_prum", ixs_fun_kom = "ixs_fun_kom", ico = "ico", nks = "nks", ixs_orj = "ixs_orj", drh_aus = "drh_aus", kat_aus = "kat_aus", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", drh_aus_txt = "drh_aus_txt", kat_aus_txt = "kat_aus_txt", phm_txt = "phm_txt", fun_kom_txt = "fun_kom_txt", orj_txt = "orj_txt", pocet = "pocet", dat_n = "dat_n", dat_u = "dat_u", ixs_rsv = "ixs_rsv",}
	const enum GRcnSluzebniVozidloDtoFragments { ixp_aus = "main", ixp_den = "main", ac = "main", evi_cis = "main", druh_aus = "main", typ_aus = "main", popis_aus = "main", vin = "main", rok_vyroby = "main", obsah = "main", phm = "main", barva = "main", poc_mist = "main", spoj_zar = "main", spz = "main", cislo_tp = "main", cislo_otp = "main", dat_stk = "main", dat_me = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", spotreba_phm1 = "main", spotreba_phm2 = "main", spotreba_phm3 = "main", spotreba_prum = "main", ixs_fun_kom = "main", ico = "main", nks = "main", ixs_orj = "main", drh_aus = "main", kat_aus = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", drh_aus_txt = "drh_aus_txt", kat_aus_txt = "kat_aus_txt", phm_txt = "phm_txt", fun_kom_txt = "*", orj_txt = "orj_txt", pocet = "main", dat_n = "main", dat_u = "main", ixs_rsv = "main",}
	const enum GRcnSluzebniVozidloDtoTypes { ixp_aus = "string", ixp_den = "string", ac = "string", evi_cis = "string", druh_aus = "string", typ_aus = "string", popis_aus = "string", vin = "string", rok_vyroby = "number", obsah = "JsonDecimal", phm = "number", barva = "string", poc_mist = "number", spoj_zar = "string", spz = "string", cislo_tp = "string", cislo_otp = "string", dat_stk = "JsonDate", dat_me = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", spotreba_phm1 = "JsonDecimal", spotreba_phm2 = "JsonDecimal", spotreba_phm3 = "JsonDecimal", spotreba_prum = "JsonDecimal", ixs_fun_kom = "string", ico = "string", nks = "string", ixs_orj = "string", drh_aus = "number", kat_aus = "number", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", drh_aus_txt = "string", kat_aus_txt = "string", phm_txt = "string", fun_kom_txt = "string", orj_txt = "string", pocet = "number", dat_n = "JsonDate", dat_u = "JsonDate", ixs_rsv = "string",}
	const enum GRcnSluzebniVozidloDtoTypeLengths { ixp_aus = 12, ixp_den = 12, ac = 20, evi_cis = 20, druh_aus = 100, typ_aus = 200, popis_aus = 254, vin = 30, barva = 50, spoj_zar = 50, spz = 10, cislo_tp = 20, cislo_otp = 20, poznamka = 254, zmenu_prov = 12, ixs_fun_kom = 12, ico = 10, nks = 12, ixs_orj = 12, ixs_rsv = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnSluzebniVozidloPojisteniDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující pojištění vozidla.*/
	interface GRcnSluzebniVozidloPojisteniDto {
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Číslo pojištění.*/
		cislo_poj?: string|null;
		/**Ústav.*/
		ustav?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Částka.*/
		castka?: JsonDecimal|null;
		/**Datum platnosti od.*/
		dat_plat_od?: JsonDate|null;
		/**Datum platnosti do.*/
		dat_plat_do?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GRcnSluzebniVozidloPojisteniDtoNames { ixp_aus = "ixp_aus", radek = "radek", cislo_poj = "cislo_poj", ustav = "ustav", nazev = "nazev", castka = "castka", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRcnSluzebniVozidloPojisteniDtoFragments { ixp_aus = "*", radek = "*", cislo_poj = "*", ustav = "*", nazev = "*", castka = "*", dat_plat_od = "*", dat_plat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRcnSluzebniVozidloPojisteniDtoTypes { ixp_aus = "string", radek = "number", cislo_poj = "string", ustav = "string", nazev = "string", castka = "JsonDecimal", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRcnSluzebniVozidloPojisteniDtoTypeLengths { ixp_aus = 12, cislo_poj = 30, ustav = 50, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnSluzebniVozidloServisDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující servis vozidla.*/
	interface GRcnSluzebniVozidloServisDto {
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Částka.*/
		castka?: JsonDecimal|null;
		/**Datum servisu.*/
		dat_servis?: JsonDate|null;
		/**Datum platnosti do.*/
		dat_plat_do?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Popis.*/
		popis?: string|null;
	}
	const enum GRcnSluzebniVozidloServisDtoNames { ixp_aus = "ixp_aus", radek = "radek", castka = "castka", dat_servis = "dat_servis", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis = "popis",}
	const enum GRcnSluzebniVozidloServisDtoFragments { ixp_aus = "*", radek = "*", castka = "*", dat_servis = "*", dat_plat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", popis = "*",}
	const enum GRcnSluzebniVozidloServisDtoTypes { ixp_aus = "string", radek = "number", castka = "JsonDecimal", dat_servis = "JsonDate", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", popis = "string",}
	const enum GRcnSluzebniVozidloServisDtoTypeLengths { ixp_aus = 12, poznamka = 254, zmenu_prov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnSluzebniVozidloSilnicniDanDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující silniční daň vozidla.*/
	interface GRcnSluzebniVozidloSilnicniDanDto {
		/**Identifikátor vozidla.*/
		ixp_aus?: string|null;
		/**Řádek.*/
		radek?: number|null;
		/**Částka.*/
		castka?: JsonDecimal|null;
		/**Datum první registrace.*/
		dat_prv_reg?: JsonDate|null;
		/**Datum platnosti do.*/
		dat_plat_do?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Popis.*/
		popis?: string|null;
	}
	const enum GRcnSluzebniVozidloSilnicniDanDtoNames { ixp_aus = "ixp_aus", radek = "radek", castka = "castka", dat_prv_reg = "dat_prv_reg", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis = "popis",}
	const enum GRcnSluzebniVozidloSilnicniDanDtoFragments { ixp_aus = "*", radek = "*", castka = "*", dat_prv_reg = "*", dat_plat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", popis = "*",}
	const enum GRcnSluzebniVozidloSilnicniDanDtoTypes { ixp_aus = "string", radek = "number", castka = "JsonDecimal", dat_prv_reg = "JsonDate", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", popis = "string",}
	const enum GRcnSluzebniVozidloSilnicniDanDtoTypeLengths { ixp_aus = 12, poznamka = 254, zmenu_prov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnSouhrnDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt obsahující atributy pro Souhrn.*/
	interface GRcnSouhrnDto {
		/**Příkazy v návrhu.*/
		prikazyVnavrhu?: number|null;
		/**Schválené příkazy.*/
		prikazySchvaleno?: number|null;
		/**Připravená záloha na příkaze.*/
		prikazyPripravenaZaloha?: number|null;
		/**Příkazy ve vyúčtování.*/
		prikazyVeVyuctovani?: number|null;
		/**Příkazy před termínem.*/
		prikazyPredTerminem?: number|null;
		/**Příkazy vyúčtované.*/
		prikazyVyuctovano?: number|null;
		/**Příkazy k vyjádření před odjezdem.*/
		prikazyVyjadreniPredOdjezdem?: number|null;
		/**Příkazy k vyjádření po příjezdu.*/
		prikazyVyjadreniPoPrijezdu?: number|null;
		/**Příkazy k vyjádření po termínu.*/
		prikazyVyjadreniPredTerminem?: number|null;
		/**Cesty před realizací.*/
		cestyPredRealizaci?: number|null;
		/**Realizované cesty.*/
		cestyRealizovano?: number|null;
		/**Cesty ve vyúčtování.*/
		cestyVeVyuctovani?: number|null;
		/**Vyúčované cesty.*/
		cestyVyuctovano?: number|null;
		/**Uhrazené cesty.*/
		cestyUhrazeno?: number|null;
		/**Zlikvidované cesty.*/
		cestyZlikvodovano?: number|null;
		/**Zrušené cesty.*/
		cestyZrusene?: number|null;
		/**Platební karty v evidenci.*/
		plkEvidence?: number|null;
		/**Platební karty vydáno.*/
		plkVydano?: number|null;
		/**Platební karty v depozitu.*/
		plkVDepozitu?: number|null;
		/**Platební karty znehodnoceno.*/
		plkZnehodnoceno?: number|null;
		/**Žádost o vydání platební karty k vyřízení.*/
		plkZadostKVyrizeni?: number|null;
		/**Žádost o vydání platební karty vyřízeno.*/
		plkZadostVyrizeno?: number|null;
		/**Žádost o vydání platební karty zamítnuto.*/
		plkZadostZamitnuto?: number|null;
		/**Pasy v evidenci.*/
		pasEvidence?: number|null;
		/**Pasy vydáno.*/
		pasVydano?: number|null;
		/**Pasy k vrácení.*/
		pasKVraceni?: number|null;
		/**Pasy v depozitu.*/
		pasDepozit?: number|null;
		/**Pasy znehodnoceno.*/
		pasZnehodnoceno?: number|null;
		/**Pasy vyřazeno.*/
		pasVyrazeno?: number|null;
		/**Víz platných.*/
		vizaPlatna?: number|null;
		/**Víz expirovaných.*/
		vizaExpirovana?: number|null;
		/**Evidované osoby.*/
		osobyEvidovane?: number|null;
		/**Pojištění osob.*/
		osobyPojisteni?: number|null;
		/**Aktivní vozidla.*/
		vozidlaAktivni?: number|null;
		/**Neaktivní vozidla.*/
		vozidlaNeaktivni?: number|null;
		/**Zrušená vozidla.*/
		vozidlaZrusena?: number|null;
		/**Navrhnuté rezervace vozidel.*/
		rezervaceVozidelNavrhnute?: number|null;
		/**Schválené rezervace vozidel.*/
		rezervaceVozidelSchvalene?: number|null;
		/**Zamítnuté rezervace vozidel.*/
		rezervaceVozidelZamitnute?: number|null;
		/**Stornované rezervace vozidel.*/
		rezervaceVozidelStornovane?: number|null;
	}
	const enum GRcnSouhrnDtoNames { prikazyVnavrhu = "prikazyVnavrhu", prikazySchvaleno = "prikazySchvaleno", prikazyPripravenaZaloha = "prikazyPripravenaZaloha", prikazyVeVyuctovani = "prikazyVeVyuctovani", prikazyPredTerminem = "prikazyPredTerminem", prikazyVyuctovano = "prikazyVyuctovano", prikazyVyjadreniPredOdjezdem = "prikazyVyjadreniPredOdjezdem", prikazyVyjadreniPoPrijezdu = "prikazyVyjadreniPoPrijezdu", prikazyVyjadreniPredTerminem = "prikazyVyjadreniPredTerminem", cestyPredRealizaci = "cestyPredRealizaci", cestyRealizovano = "cestyRealizovano", cestyVeVyuctovani = "cestyVeVyuctovani", cestyVyuctovano = "cestyVyuctovano", cestyUhrazeno = "cestyUhrazeno", cestyZlikvodovano = "cestyZlikvodovano", cestyZrusene = "cestyZrusene", plkEvidence = "plkEvidence", plkVydano = "plkVydano", plkVDepozitu = "plkVDepozitu", plkZnehodnoceno = "plkZnehodnoceno", plkZadostKVyrizeni = "plkZadostKVyrizeni", plkZadostVyrizeno = "plkZadostVyrizeno", plkZadostZamitnuto = "plkZadostZamitnuto", pasEvidence = "pasEvidence", pasVydano = "pasVydano", pasKVraceni = "pasKVraceni", pasDepozit = "pasDepozit", pasZnehodnoceno = "pasZnehodnoceno", pasVyrazeno = "pasVyrazeno", vizaPlatna = "vizaPlatna", vizaExpirovana = "vizaExpirovana", osobyEvidovane = "osobyEvidovane", osobyPojisteni = "osobyPojisteni", vozidlaAktivni = "vozidlaAktivni", vozidlaNeaktivni = "vozidlaNeaktivni", vozidlaZrusena = "vozidlaZrusena", rezervaceVozidelNavrhnute = "rezervaceVozidelNavrhnute", rezervaceVozidelSchvalene = "rezervaceVozidelSchvalene", rezervaceVozidelZamitnute = "rezervaceVozidelZamitnute", rezervaceVozidelStornovane = "rezervaceVozidelStornovane",}
	const enum GRcnSouhrnDtoFragments { prikazyVnavrhu = "*", prikazySchvaleno = "*", prikazyPripravenaZaloha = "*", prikazyVeVyuctovani = "*", prikazyPredTerminem = "*", prikazyVyuctovano = "*", prikazyVyjadreniPredOdjezdem = "*", prikazyVyjadreniPoPrijezdu = "*", prikazyVyjadreniPredTerminem = "*", cestyPredRealizaci = "*", cestyRealizovano = "*", cestyVeVyuctovani = "*", cestyVyuctovano = "*", cestyUhrazeno = "*", cestyZlikvodovano = "*", cestyZrusene = "*", plkEvidence = "*", plkVydano = "*", plkVDepozitu = "*", plkZnehodnoceno = "*", plkZadostKVyrizeni = "*", plkZadostVyrizeno = "*", plkZadostZamitnuto = "*", pasEvidence = "*", pasVydano = "*", pasKVraceni = "*", pasDepozit = "*", pasZnehodnoceno = "*", pasVyrazeno = "*", vizaPlatna = "*", vizaExpirovana = "*", osobyEvidovane = "*", osobyPojisteni = "*", vozidlaAktivni = "*", vozidlaNeaktivni = "*", vozidlaZrusena = "*", rezervaceVozidelNavrhnute = "*", rezervaceVozidelSchvalene = "*", rezervaceVozidelZamitnute = "*", rezervaceVozidelStornovane = "*",}
	const enum GRcnSouhrnDtoTypes { prikazyVnavrhu = "number", prikazySchvaleno = "number", prikazyPripravenaZaloha = "number", prikazyVeVyuctovani = "number", prikazyPredTerminem = "number", prikazyVyuctovano = "number", prikazyVyjadreniPredOdjezdem = "number", prikazyVyjadreniPoPrijezdu = "number", prikazyVyjadreniPredTerminem = "number", cestyPredRealizaci = "number", cestyRealizovano = "number", cestyVeVyuctovani = "number", cestyVyuctovano = "number", cestyUhrazeno = "number", cestyZlikvodovano = "number", cestyZrusene = "number", plkEvidence = "number", plkVydano = "number", plkVDepozitu = "number", plkZnehodnoceno = "number", plkZadostKVyrizeni = "number", plkZadostVyrizeno = "number", plkZadostZamitnuto = "number", pasEvidence = "number", pasVydano = "number", pasKVraceni = "number", pasDepozit = "number", pasZnehodnoceno = "number", pasVyrazeno = "number", vizaPlatna = "number", vizaExpirovana = "number", osobyEvidovane = "number", osobyPojisteni = "number", vozidlaAktivni = "number", vozidlaNeaktivni = "number", vozidlaZrusena = "number", rezervaceVozidelNavrhnute = "number", rezervaceVozidelSchvalene = "number", rezervaceVozidelZamitnute = "number", rezervaceVozidelStornovane = "number",}
	const enum GRcnSouhrnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnTankovaniPhmDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující tankování pohonných hmot.*/
	interface GRcnTankovaniPhmDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Řádek etapy.*/
		radek_pep?: number|null;
		/**Pořadí.*/
		poradi?: number|null;
		/**Číslo.*/
		cislo?: number|null;
		/**Phm.*/
		phm?: number|null;
		/**Částka phm.*/
		c_phm?: JsonDecimal|null;
		/**Měna phm.*/
		mena_phm?: number|null;
		/**Množství.*/
		mnozstvi?: JsonDecimal|null;
		/**Kurz.*/
		kurz?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Měna zalohy.*/
		mena_zal?: number|null;
		/**Částka celkem.*/
		c_celkem?: JsonDecimal|null;
		/**Způsob úhrady.*/
		zp_uhr?: number|null;
		/**Identifikátor platební karty.*/
		ixp_plk?: string|null;
		/**Měna za pohonné hmoty textově.*/
		mena_phm_txt?: string|null;
		/**Měna záloh textově.*/
		mena_zal_txt?: string|null;
		/**Phm_txt.*/
		phm_txt?: string|null;
		/**Způsob úhrady textově.*/
		zp_uhr_txt?: string|null;
	}
	const enum GRcnTankovaniPhmDtoNames { ixp = "ixp", radek_pep = "radek_pep", poradi = "poradi", cislo = "cislo", phm = "phm", c_phm = "c_phm", mena_phm = "mena_phm", mnozstvi = "mnozstvi", kurz = "kurz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena_zal = "mena_zal", c_celkem = "c_celkem", zp_uhr = "zp_uhr", ixp_plk = "ixp_plk", mena_phm_txt = "mena_phm_txt", mena_zal_txt = "mena_zal_txt", phm_txt = "phm_txt", zp_uhr_txt = "zp_uhr_txt",}
	const enum GRcnTankovaniPhmDtoFragments { ixp = "main", radek_pep = "main", poradi = "main", cislo = "main", phm = "main", c_phm = "main", mena_phm = "main", mnozstvi = "main", kurz = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", mena_zal = "main", c_celkem = "main", zp_uhr = "main", ixp_plk = "main", mena_phm_txt = "mena_phm_txt", mena_zal_txt = "mena_zal_txt", phm_txt = "phm_txt", zp_uhr_txt = "zp_uhr_txt",}
	const enum GRcnTankovaniPhmDtoTypes { ixp = "string", radek_pep = "number", poradi = "number", cislo = "number", phm = "number", c_phm = "JsonDecimal", mena_phm = "number", mnozstvi = "JsonDecimal", kurz = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mena_zal = "number", c_celkem = "JsonDecimal", zp_uhr = "number", ixp_plk = "string", mena_phm_txt = "string", mena_zal_txt = "string", phm_txt = "string", zp_uhr_txt = "string",}
	const enum GRcnTankovaniPhmDtoTypeLengths { ixp = 12, zmenu_prov = 12, ixp_plk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnTempTabulkaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující temp tabulku pro hromadné operace a sestavy.*/
	interface GRcnTempTabulkaDto {
		/**Pořadové číslo přihlášení.*/
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
		/**Příznak tisku.*/
		priz_tisk?: number|null;
		/**Ikc.*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GRcnTempTabulkaDtoNames { log_por_cislo = "log_por_cislo", ixp = "ixp", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_mena = "c_mena", c_celk = "c_celk", mena = "mena", kurz = "kurz", priz_zprac = "priz_zprac", priz_kum = "priz_kum", priz_tisk = "priz_tisk", ikc = "ikc",}
	const enum GRcnTempTabulkaDtoFragments { log_por_cislo = "*", ixp = "*", ico = "*", ucs = "*", uus = "*", nks = "*", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", c_mena = "*", c_celk = "*", mena = "*", kurz = "*", priz_zprac = "*", priz_kum = "*", priz_tisk = "*", ikc = "*",}
	const enum GRcnTempTabulkaDtoTypes { log_por_cislo = "number", ixp = "string", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c_mena = "JsonDecimal", c_celk = "JsonDecimal", mena = "number", kurz = "JsonDecimal", priz_zprac = "number", priz_kum = "number", priz_tisk = "number", ikc = "Gordic.General.GIkc",}
	const enum GRcnTempTabulkaDtoTypeLengths { ixp = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnTlacitkaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující nastavení tlačítek na záložkách.*/
	interface GRcnTlacitkaDto {
		/**Činnosti.*/
		cinnosti?: boolean|null;
		/**Činnosti tooltip.*/
		cinnosti_tooltip?: string|null;
		/**Controling.*/
		controling?: boolean|null;
		/**Controling tooltip.*/
		controling_tooltip?: string|null;
		/**Detail.*/
		detail?: boolean|null;
		/**Detail tooltip.*/
		detail_tooltip?: string|null;
		/**Detail výběru plk.*/
		detail_plk?: boolean|null;
		/**Detail výběru plk. tooltip.*/
		detail_plk_tooltip?: string|null;
		/**Editační režim.*/
		editacniRezim?: boolean|null;
		/**Editační režim tooltip.*/
		editacniRezim_tooltip?: string|null;
		/**Export.*/
		export?: boolean|null;
		/**Export tooltip.*/
		export_tooltip?: string|null;
		/**Generovat.*/
		generovat?: boolean|null;
		/**Generovat tooltip.*/
		generovat_tooltip?: string|null;
		/**Identifikace osoby.*/
		identifikaceOsoby?: number|null;
		/**Kontrola.*/
		kontrola?: boolean|null;
		/**Kontrola tooltip.*/
		kontrola_tooltip?: string|null;
		/**Kopírovat všem.*/
		kopirovatVsem?: boolean|null;
		/**Kopírovat všem tooltip.*/
		kopirovatVsem_tooltip?: string|null;
		/**Nutná hodnota IxsEsu.*/
		nutnaHodnotaIxsEsu?: boolean|null;
		/**Nutná hodnota IxsEsu tooltip.*/
		nutnaHodnotaIxsEsu_tooltip?: string|null;
		/**Limity.*/
		limity?: boolean|null;
		/**Limity tooltip.*/
		limity_tooltip?: string|null;
		/**Navázat.*/
		navazat?: boolean|null;
		/**Navázat tooltip.*/
		navazat_tooltip?: string|null;
		/**Návrh krytí.*/
		navrhKryti?: boolean|null;
		/**Návrh krytí tooltip.*/
		navrhKryti_tooltip?: string|null;
		/**Nový.*/
		novy?: boolean|null;
		/**Nový tooltip.*/
		novy_tooltip?: string|null;
		/**Odschválit.*/
		odschvalit?: boolean|null;
		/**Odschválit tooltip.*/
		odschvalit_tooltip?: string|null;
		/**Odstranit.*/
		odstranit?: boolean|null;
		/**Odstranit tooltip.*/
		odstranit_tooltip?: string|null;
		/**Opravit.*/
		opravit?: boolean|null;
		/**Opravit tooltip.*/
		opravit_tooltip?: string|null;
		/**Plná moc.*/
		plna_moc?: boolean|null;
		/**Plná moc tooltip.*/
		plna_moc_tooltip?: string|null;
		/**Pokladna.*/
		pokladna?: boolean|null;
		/**Pokladna tooltip.*/
		pokladna_tooltip?: string|null;
		/**Požádat.*/
		pozadat?: boolean|null;
		/**Požádat tooltip.*/
		pozadat_tooltip?: string|null;
		/**Přecenění.*/
		preceneni?: boolean|null;
		/**Přecenění tooltip.*/
		preceneni_tooltip?: string|null;
		/**Předat.*/
		predat?: boolean|null;
		/**Předat tooltip.*/
		predat_tooltip?: string|null;
		/**Předplnit.*/
		predplnit?: boolean|null;
		/**Předplnit tooltip.*/
		predplnit_tooltip?: string|null;
		/**Přehled.*/
		prehled?: boolean|null;
		/**Přehled tooltip.*/
		prehled_tooltip?: string|null;
		/**Příprava.*/
		priprava?: boolean|null;
		/**Příprava tooltip.*/
		priprava_tooltip?: string|null;
		/**Prohlížení služebních cest.*/
		prohlizeniSC?: boolean|null;
		/**Prohlížení služebních cest tooltip.*/
		prohlizeniSC_tooltip?: string|null;
		/**Prohlížení cestovních příkazů.*/
		prohlizeniCP?: boolean|null;
		/**Prohlížení cestovních příkazů tooltip.*/
		prohlizeniCP_tooltip?: string|null;
		/**Prohlížení platebních karet.*/
		prohlizeniPlk?: boolean|null;
		/**Prohlížení platebních karet tooltip.*/
		prohlizeniPlk_tooltip?: string|null;
		/**Prohlížení pasů a víz.*/
		prohlizeniPV?: boolean|null;
		/**Prohlížení pasů a víz tooltip.*/
		prohlizeniPV_tooltip?: string|null;
		/**Prohlížení osob.*/
		prohlizeniOsob?: boolean|null;
		/**Prohlížení osob tooltip.*/
		prohlizeniOsob_tooltip?: string|null;
		/**Prohlížení pojištění.*/
		prohlizeniPojisteni?: boolean|null;
		/**Prohlížení pojištění tooltip.*/
		prohlizeniPojisteni_tooltip?: string|null;
		/**Prohlížení vozidel.*/
		prohlizeniVoz?: boolean|null;
		/**Prohlížení vozidel tooltip.*/
		prohlizeniVoz_tooltip?: string|null;
		/**Prohlížení rezervací vozidel.*/
		prohlizeniRez?: boolean|null;
		/**Prohlížení rezervací vozidel tooltip.*/
		prohlizeniRez_tooltip?: string|null;
		/**Schválit.*/
		schvalit?: boolean|null;
		/**Schválit tooltip.*/
		schvalit_tooltip?: string|null;
		/**Sloučit.*/
		sloucit?: boolean|null;
		/**Sloučit tooltip.*/
		sloucit_tooltip?: string|null;
		/**Směna.*/
		smena?: boolean|null;
		/**Směna tooltip.*/
		smena_tooltip?: string|null;
		/**Správce aplikace.*/
		spravceAplikace?: boolean|null;
		/**Správce aplikace tooltip.*/
		spravceAplikace_tooltip?: string|null;
		/**Storno.*/
		storno?: boolean|null;
		/**Storno tooltip.*/
		storno_tooltip?: string|null;
		/**Storno plk.*/
		storno_plk?: boolean|null;
		/**Storno plk. tooltip.*/
		storno_plk_tooltip?: string|null;
		/**Text - popis "Důvod neaktivnosti (resx 28100380)".*/
		text_duvod_neaktivnosti?: string|null;
		/**Uvolnit.*/
		uvolnit?: boolean|null;
		/**Uvolnit tooltip.*/
		uvolnit_tooltip?: string|null;
		/**Upravit.*/
		upravit?: boolean|null;
		/**Upravit tooltip.*/
		upravit_tooltip?: string|null;
		/**Uzávěrka.*/
		uzaverka?: boolean|null;
		/**Uzávěrka tooltip.*/
		uzaverka_tooltip?: string|null;
		/**Uzavřít mimo modul.*/
		uzaMimoModul?: boolean|null;
		/**Uzavřít mimo modul tooltip.*/
		uzaMimoModul_tooltip?: string|null;
		/**Vrátit do návrhu.*/
		vratit_do_navrhu?: boolean|null;
		/**Vrátit do návrhu tooltip.*/
		vratit_do_navrhu_tooltip?: string|null;
		/**Výběr.*/
		vyber?: boolean|null;
		/**Výběr tooltip.*/
		vyber_tooltip?: string|null;
		/**Výběr uus.*/
		vyber_uus?: boolean|null;
		/**Výběr uus tooltip.*/
		vyber_uus_tooltip?: string|null;
		/**Vypočítat.*/
		vypocitat?: boolean|null;
		/**Vypočítat tooltip.*/
		vypocitat_tooltip?: string|null;
		/**Vyúčtování.*/
		vyuctovani?: boolean|null;
		/**Vyuctování tooltip.*/
		vyuctovani_tooltip?: string|null;
		/**Založit.*/
		zalozit?: boolean|null;
		/**Založit tooltip.*/
		zalozit_tooltip?: string|null;
		/**Zamítnout.*/
		zamitnout?: boolean|null;
		/**Zamítnout tooltip.*/
		zamitnout_tooltip?: string|null;
		/**Zařazení dle nks.*/
		zarazeniDleNks?: boolean|null;
		/**Zařazení dle nks tooltip.*/
		zarazeniDleNks_tooltip?: string|null;
		/**zlikvidovat.*/
		zlikvidovat?: boolean|null;
		/**zlikvidovat tooltip.*/
		zlikvidovat_tooltip?: string|null;
	}
	const enum GRcnTlacitkaDtoNames { cinnosti = "cinnosti", cinnosti_tooltip = "cinnosti_tooltip", controling = "controling", controling_tooltip = "controling_tooltip", detail = "detail", detail_tooltip = "detail_tooltip", detail_plk = "detail_plk", detail_plk_tooltip = "detail_plk_tooltip", editacniRezim = "editacniRezim", editacniRezim_tooltip = "editacniRezim_tooltip", export = "export", export_tooltip = "export_tooltip", generovat = "generovat", generovat_tooltip = "generovat_tooltip", identifikaceOsoby = "identifikaceOsoby", kontrola = "kontrola", kontrola_tooltip = "kontrola_tooltip", kopirovatVsem = "kopirovatVsem", kopirovatVsem_tooltip = "kopirovatVsem_tooltip", nutnaHodnotaIxsEsu = "nutnaHodnotaIxsEsu", nutnaHodnotaIxsEsu_tooltip = "nutnaHodnotaIxsEsu_tooltip", limity = "limity", limity_tooltip = "limity_tooltip", navazat = "navazat", navazat_tooltip = "navazat_tooltip", navrhKryti = "navrhKryti", navrhKryti_tooltip = "navrhKryti_tooltip", novy = "novy", novy_tooltip = "novy_tooltip", odschvalit = "odschvalit", odschvalit_tooltip = "odschvalit_tooltip", odstranit = "odstranit", odstranit_tooltip = "odstranit_tooltip", opravit = "opravit", opravit_tooltip = "opravit_tooltip", plna_moc = "plna_moc", plna_moc_tooltip = "plna_moc_tooltip", pokladna = "pokladna", pokladna_tooltip = "pokladna_tooltip", pozadat = "pozadat", pozadat_tooltip = "pozadat_tooltip", preceneni = "preceneni", preceneni_tooltip = "preceneni_tooltip", predat = "predat", predat_tooltip = "predat_tooltip", predplnit = "predplnit", predplnit_tooltip = "predplnit_tooltip", prehled = "prehled", prehled_tooltip = "prehled_tooltip", priprava = "priprava", priprava_tooltip = "priprava_tooltip", prohlizeniSC = "prohlizeniSC", prohlizeniSC_tooltip = "prohlizeniSC_tooltip", prohlizeniCP = "prohlizeniCP", prohlizeniCP_tooltip = "prohlizeniCP_tooltip", prohlizeniPlk = "prohlizeniPlk", prohlizeniPlk_tooltip = "prohlizeniPlk_tooltip", prohlizeniPV = "prohlizeniPV", prohlizeniPV_tooltip = "prohlizeniPV_tooltip", prohlizeniOsob = "prohlizeniOsob", prohlizeniOsob_tooltip = "prohlizeniOsob_tooltip", prohlizeniPojisteni = "prohlizeniPojisteni", prohlizeniPojisteni_tooltip = "prohlizeniPojisteni_tooltip", prohlizeniVoz = "prohlizeniVoz", prohlizeniVoz_tooltip = "prohlizeniVoz_tooltip", prohlizeniRez = "prohlizeniRez", prohlizeniRez_tooltip = "prohlizeniRez_tooltip", schvalit = "schvalit", schvalit_tooltip = "schvalit_tooltip", sloucit = "sloucit", sloucit_tooltip = "sloucit_tooltip", smena = "smena", smena_tooltip = "smena_tooltip", spravceAplikace = "spravceAplikace", spravceAplikace_tooltip = "spravceAplikace_tooltip", storno = "storno", storno_tooltip = "storno_tooltip", storno_plk = "storno_plk", storno_plk_tooltip = "storno_plk_tooltip", text_duvod_neaktivnosti = "text_duvod_neaktivnosti", uvolnit = "uvolnit", uvolnit_tooltip = "uvolnit_tooltip", upravit = "upravit", upravit_tooltip = "upravit_tooltip", uzaverka = "uzaverka", uzaverka_tooltip = "uzaverka_tooltip", uzaMimoModul = "uzaMimoModul", uzaMimoModul_tooltip = "uzaMimoModul_tooltip", vratit_do_navrhu = "vratit_do_navrhu", vratit_do_navrhu_tooltip = "vratit_do_navrhu_tooltip", vyber = "vyber", vyber_tooltip = "vyber_tooltip", vyber_uus = "vyber_uus", vyber_uus_tooltip = "vyber_uus_tooltip", vypocitat = "vypocitat", vypocitat_tooltip = "vypocitat_tooltip", vyuctovani = "vyuctovani", vyuctovani_tooltip = "vyuctovani_tooltip", zalozit = "zalozit", zalozit_tooltip = "zalozit_tooltip", zamitnout = "zamitnout", zamitnout_tooltip = "zamitnout_tooltip", zarazeniDleNks = "zarazeniDleNks", zarazeniDleNks_tooltip = "zarazeniDleNks_tooltip", zlikvidovat = "zlikvidovat", zlikvidovat_tooltip = "zlikvidovat_tooltip",}
	const enum GRcnTlacitkaDtoFragments { cinnosti = "*", cinnosti_tooltip = "*", controling = "*", controling_tooltip = "*", detail = "*", detail_tooltip = "*", detail_plk = "*", detail_plk_tooltip = "*", editacniRezim = "*", editacniRezim_tooltip = "*", export = "*", export_tooltip = "*", generovat = "*", generovat_tooltip = "*", identifikaceOsoby = "*", kontrola = "*", kontrola_tooltip = "*", kopirovatVsem = "*", kopirovatVsem_tooltip = "*", nutnaHodnotaIxsEsu = "*", nutnaHodnotaIxsEsu_tooltip = "*", limity = "*", limity_tooltip = "*", navazat = "*", navazat_tooltip = "*", navrhKryti = "*", navrhKryti_tooltip = "*", novy = "*", novy_tooltip = "*", odschvalit = "*", odschvalit_tooltip = "*", odstranit = "*", odstranit_tooltip = "*", opravit = "*", opravit_tooltip = "*", plna_moc = "*", plna_moc_tooltip = "*", pokladna = "*", pokladna_tooltip = "*", pozadat = "*", pozadat_tooltip = "*", preceneni = "*", preceneni_tooltip = "*", predat = "*", predat_tooltip = "*", predplnit = "*", predplnit_tooltip = "*", prehled = "*", prehled_tooltip = "*", priprava = "*", priprava_tooltip = "*", prohlizeniSC = "*", prohlizeniSC_tooltip = "*", prohlizeniCP = "*", prohlizeniCP_tooltip = "*", prohlizeniPlk = "*", prohlizeniPlk_tooltip = "*", prohlizeniPV = "*", prohlizeniPV_tooltip = "*", prohlizeniOsob = "*", prohlizeniOsob_tooltip = "*", prohlizeniPojisteni = "*", prohlizeniPojisteni_tooltip = "*", prohlizeniVoz = "*", prohlizeniVoz_tooltip = "*", prohlizeniRez = "*", prohlizeniRez_tooltip = "*", schvalit = "*", schvalit_tooltip = "*", sloucit = "*", sloucit_tooltip = "*", smena = "*", smena_tooltip = "*", spravceAplikace = "*", spravceAplikace_tooltip = "*", storno = "*", storno_tooltip = "*", storno_plk = "*", storno_plk_tooltip = "*", text_duvod_neaktivnosti = "*", uvolnit = "*", uvolnit_tooltip = "*", upravit = "*", upravit_tooltip = "*", uzaverka = "*", uzaverka_tooltip = "*", uzaMimoModul = "*", uzaMimoModul_tooltip = "*", vratit_do_navrhu = "*", vratit_do_navrhu_tooltip = "*", vyber = "*", vyber_tooltip = "*", vyber_uus = "*", vyber_uus_tooltip = "*", vypocitat = "*", vypocitat_tooltip = "*", vyuctovani = "*", vyuctovani_tooltip = "*", zalozit = "*", zalozit_tooltip = "*", zamitnout = "*", zamitnout_tooltip = "*", zarazeniDleNks = "*", zarazeniDleNks_tooltip = "*", zlikvidovat = "*", zlikvidovat_tooltip = "*",}
	const enum GRcnTlacitkaDtoTypes { cinnosti = "boolean", cinnosti_tooltip = "string", controling = "boolean", controling_tooltip = "string", detail = "boolean", detail_tooltip = "string", detail_plk = "boolean", detail_plk_tooltip = "string", editacniRezim = "boolean", editacniRezim_tooltip = "string", export = "boolean", export_tooltip = "string", generovat = "boolean", generovat_tooltip = "string", identifikaceOsoby = "number", kontrola = "boolean", kontrola_tooltip = "string", kopirovatVsem = "boolean", kopirovatVsem_tooltip = "string", nutnaHodnotaIxsEsu = "boolean", nutnaHodnotaIxsEsu_tooltip = "string", limity = "boolean", limity_tooltip = "string", navazat = "boolean", navazat_tooltip = "string", navrhKryti = "boolean", navrhKryti_tooltip = "string", novy = "boolean", novy_tooltip = "string", odschvalit = "boolean", odschvalit_tooltip = "string", odstranit = "boolean", odstranit_tooltip = "string", opravit = "boolean", opravit_tooltip = "string", plna_moc = "boolean", plna_moc_tooltip = "string", pokladna = "boolean", pokladna_tooltip = "string", pozadat = "boolean", pozadat_tooltip = "string", preceneni = "boolean", preceneni_tooltip = "string", predat = "boolean", predat_tooltip = "string", predplnit = "boolean", predplnit_tooltip = "string", prehled = "boolean", prehled_tooltip = "string", priprava = "boolean", priprava_tooltip = "string", prohlizeniSC = "boolean", prohlizeniSC_tooltip = "string", prohlizeniCP = "boolean", prohlizeniCP_tooltip = "string", prohlizeniPlk = "boolean", prohlizeniPlk_tooltip = "string", prohlizeniPV = "boolean", prohlizeniPV_tooltip = "string", prohlizeniOsob = "boolean", prohlizeniOsob_tooltip = "string", prohlizeniPojisteni = "boolean", prohlizeniPojisteni_tooltip = "string", prohlizeniVoz = "boolean", prohlizeniVoz_tooltip = "string", prohlizeniRez = "boolean", prohlizeniRez_tooltip = "string", schvalit = "boolean", schvalit_tooltip = "string", sloucit = "boolean", sloucit_tooltip = "string", smena = "boolean", smena_tooltip = "string", spravceAplikace = "boolean", spravceAplikace_tooltip = "string", storno = "boolean", storno_tooltip = "string", storno_plk = "boolean", storno_plk_tooltip = "string", text_duvod_neaktivnosti = "string", uvolnit = "boolean", uvolnit_tooltip = "string", upravit = "boolean", upravit_tooltip = "string", uzaverka = "boolean", uzaverka_tooltip = "string", uzaMimoModul = "boolean", uzaMimoModul_tooltip = "string", vratit_do_navrhu = "boolean", vratit_do_navrhu_tooltip = "string", vyber = "boolean", vyber_tooltip = "string", vyber_uus = "boolean", vyber_uus_tooltip = "string", vypocitat = "boolean", vypocitat_tooltip = "string", vyuctovani = "boolean", vyuctovani_tooltip = "string", zalozit = "boolean", zalozit_tooltip = "string", zamitnout = "boolean", zamitnout_tooltip = "string", zarazeniDleNks = "boolean", zarazeniDleNks_tooltip = "string", zlikvidovat = "boolean", zlikvidovat_tooltip = "string",}
	const enum GRcnTlacitkaDtoTypeLengths {}
	/**Konstanty pro tooltipy zakázaných akcí.*/
	const enum KonstantniHlaseni {
		/**Neurčeno.*/
		neurceno,
		/**Není vlastník.*/
		neniVlastnik,
		/**Není vlastník ani správce.*/
		neniVlastnikSpravce,
		/**Není vlastník, správce, druh je opravovaný doklad.*/
		neniVlastnikSpravceDruh15,
		/**Není aktivní deník.*/
		nelzeZapsatDoDeniku,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnUzaverkaDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující záznamy o uzávěrce.*/
	interface GRcnUzaverkaDto {
		/**Rok.*/
		rok?: number|null;
		/**Pořadí.*/
		poradi?: number|null;
		/**Kód.*/
		kod?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GRcnUzaverkaDtoNames { rok = "rok", poradi = "poradi", kod = "kod", popis = "popis", ixp = "ixp", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRcnUzaverkaDtoFragments { rok = "main", poradi = "main", kod = "main", popis = "main", ixp = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GRcnUzaverkaDtoTypes { rok = "number", poradi = "number", kod = "string", popis = "string", ixp = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRcnUzaverkaDtoTypeLengths { kod = 15, popis = 254, ixp = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnVazbyDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující vazby - navázané doklady.*/
	interface GRcnVazbyDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Název knihy.*/
		ixp_den_txt?: string|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Datum vystavení.*/
		dat_vyst?: JsonDate|null;
		/**Datum evidence.*/
		dat_evid?: JsonDate|null;
		/**Kód stavu dokladu.*/
		up_stav?: number|null;
		/**Stav dokladu textově.*/
		up_stav_txt?: string|null;
		/**Kód stavu pořízení.*/
		s_sto?: number|null;
		/**Stav pořízení textově.*/
		s_sto_txt?: string|null;
		/**Kód stavu zaúčtování.*/
		s_zau?: number|null;
		/**Text stavu dokladu včetně zaúčtování.*/
		readonly stav_dok_txt?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Typ dokladu.*/
		typ_dokl?: string|null;
		/**Částka celkem v měně.*/
		c_celkem_m?: JsonDecimal|null;
		/**Kód měny.*/
		mena?: number|null;
		/**Zkratka měny.*/
		mena_zkr?: string|null;
		/**Částka celkem CZK.*/
		c_celkem?: JsonDecimal|null;
		/**Typ agendy textově.*/
		typ_ag_txt?: string|null;
		/**Aktivita textově.*/
		aktivita_txt?: string|null;
	}
	const enum GRcnVazbyDtoNames { ixp = "ixp", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", ac = "ac", dat_vyst = "dat_vyst", dat_evid = "dat_evid", up_stav = "up_stav", up_stav_txt = "up_stav_txt", s_sto = "s_sto", s_sto_txt = "s_sto_txt", s_zau = "s_zau", stav_dok_txt = "stav_dok_txt", aktivita = "aktivita", typ_dokl = "typ_dokl", c_celkem_m = "c_celkem_m", mena = "mena", mena_zkr = "mena_zkr", c_celkem = "c_celkem", typ_ag_txt = "typ_ag_txt", aktivita_txt = "aktivita_txt",}
	const enum GRcnVazbyDtoFragments { ixp = "main", ico = "main", ucs = "main", nks = "main", ixp_den = "main", ixp_den_txt = "ixp_den_txt", ac = "main", dat_vyst = "main", dat_evid = "main", up_stav = "main", up_stav_txt = "up_stav_txt", s_sto = "main", s_sto_txt = "s_sto_txt", s_zau = "s_zau", stav_dok_txt = "up_stav_txt", aktivita = "main", typ_dokl = "typ_dokl", c_celkem_m = "main", mena = "main", mena_zkr = "mena_zkr", c_celkem = "main", typ_ag_txt = "main", aktivita_txt = "aktivita_txt",}
	const enum GRcnVazbyDtoTypes { ixp = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ixp_den_txt = "string", ac = "string", dat_vyst = "JsonDate", dat_evid = "JsonDate", up_stav = "number", up_stav_txt = "string", s_sto = "number", s_sto_txt = "string", s_zau = "number", stav_dok_txt = "string", aktivita = "number", typ_dokl = "string", c_celkem_m = "JsonDecimal", mena = "number", mena_zkr = "string", c_celkem = "JsonDecimal", typ_ag_txt = "string", aktivita_txt = "string",}
	const enum GRcnVazbyDtoTypeLengths { ixp = 12, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ixp_den_txt = 50, ac = 30, up_stav_txt = 50, s_sto_txt = 50, typ_dokl = 50, mena_zkr = 16, typ_ag_txt = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnVizumDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující vízum.*/
	interface GRcnVizumDto {
		/**Identifikátor víza.*/
		ixp_viz?: string|null;
		/**Identifikátor knihy.*/
		ixp_den?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Evidenční číslo.*/
		evi_cis?: string|null;
		/**Kód druhu víza.*/
		druh_viza?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Datum platnosti od.*/
		dat_plat_od?: JsonDate|null;
		/**Datum platnosti do.*/
		dat_plat_do?: JsonDate|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Měna.*/
		mena?: number|null;
		/**Identifikátor pasu.*/
		ixp_pas?: string|null;
		/**Identifikátor cesty.*/
		ixs_rcn?: string|null;
		/**Důvod cesty.*/
		duvod_ces?: string|null;
		/**Kód způsobu vyřízení.*/
		zp_vyriz?: number|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Částka poplatku.*/
		c_popl?: JsonDecimal|null;
		/**Identifikátor osoby.*/
		ixs_osr?: string|null;
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
		/**Druh víza textově.*/
		druh_viza_txt?: string|null;
		/**Číslo pasu.*/
		cislo_pas?: string|null;
		/**Evidenční číslo RCN.*/
		evi_cis_rcn?: string|null;
		/**Měna těxtově.*/
		mena_txt?: string|null;
		/**Stát textově.*/
		stat_txt?: string|null;
		/**Způsob vyřízení textově.*/
		zp_vyriz_txt?: string|null;
		/**Identifikátor textově.*/
		ixs_osr_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GRcnVizumDtoNames { ixp_viz = "ixp_viz", ixp_den = "ixp_den", rok = "rok", ac = "ac", evi_cis = "evi_cis", druh_viza = "druh_viza", popis = "popis", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", stat = "stat", mena = "mena", ixp_pas = "ixp_pas", ixs_rcn = "ixs_rcn", duvod_ces = "duvod_ces", zp_vyriz = "zp_vyriz", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_popl = "c_popl", ixs_osr = "ixs_osr", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", uzo = "uzo", druh_viza_txt = "druh_viza_txt", cislo_pas = "cislo_pas", evi_cis_rcn = "evi_cis_rcn", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_vyriz_txt = "zp_vyriz_txt", ixs_osr_txt = "ixs_osr_txt", pocet = "pocet",}
	const enum GRcnVizumDtoFragments { ixp_viz = "main", ixp_den = "main", rok = "main", ac = "main", evi_cis = "main", druh_viza = "main", popis = "main", dat_plat_od = "main", dat_plat_do = "main", stat = "main", mena = "main", ixp_pas = "main", ixs_rcn = "main", duvod_ces = "main", zp_vyriz = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c_popl = "main", ixs_osr = "main", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", uzo = "WFL", druh_viza_txt = "druh_viza_txt", cislo_pas = "cislo_pas", evi_cis_rcn = "evi_cis_rcn", mena_txt = "mena_txt", stat_txt = "stat_txt", zp_vyriz_txt = "zp_vyriz_txt", ixs_osr_txt = "ixs_osr_txt", pocet = "main",}
	const enum GRcnVizumDtoTypes { ixp_viz = "string", ixp_den = "string", rok = "number", ac = "string", evi_cis = "string", druh_viza = "number", popis = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", stat = "number", mena = "number", ixp_pas = "string", ixs_rcn = "string", duvod_ces = "string", zp_vyriz = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_popl = "JsonDecimal", ixs_osr = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", uzo = "string", druh_viza_txt = "string", cislo_pas = "string", evi_cis_rcn = "string", mena_txt = "string", stat_txt = "string", zp_vyriz_txt = "string", ixs_osr_txt = "string", pocet = "number",}
	const enum GRcnVizumDtoTypeLengths { ixp_viz = 12, ixp_den = 12, ac = 20, evi_cis = 20, popis = 254, ixp_pas = 12, ixs_rcn = 12, duvod_ces = 100, poznamka = 254, zmenu_prov = 12, ixs_osr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnZmenoveRizeniDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující změnové řízení.*/
	interface GRcnZmenoveRizeniDto {
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
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Identifikátor rozpočtu.*/
		ixp_roz?: string|null;
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_vla?: string|null;
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad?: string|null;
		/**Stav změnového řízení textově.*/
		stav_zmr_txt?: string|null;
		/**Typ změnového řízení textově.*/
		typ_zmr_txt?: string|null;
	}
	const enum GRcnZmenoveRizeniDtoNames { ixp_zmr = "ixp_zmr", ixp_den = "ixp_den", ac = "ac", evi_cis = "evi_cis", stav_zmr = "stav_zmr", typ_zmr = "typ_zmr", popis = "popis", dat_zad = "dat_zad", dat_evi = "dat_evi", dat_sch = "dat_sch", dat_pra = "dat_pra", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_roz = "ixp_roz", ixs_fun_vla = "ixs_fun_vla", ixs_zmp_zad = "ixs_zmp_zad", stav_zmr_txt = "stav_zmr_txt", typ_zmr_txt = "typ_zmr_txt",}
	const enum GRcnZmenoveRizeniDtoFragments { ixp_zmr = "main", ixp_den = "main", ac = "main", evi_cis = "main", stav_zmr = "main", typ_zmr = "main", popis = "main", dat_zad = "main", dat_evi = "main", dat_sch = "main", dat_pra = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixp_roz = "main", ixs_fun_vla = "main", ixs_zmp_zad = "main", stav_zmr_txt = "stav_zmr_txt", typ_zmr_txt = "typ_zmr_txt",}
	const enum GRcnZmenoveRizeniDtoTypes { ixp_zmr = "string", ixp_den = "string", ac = "string", evi_cis = "string", stav_zmr = "number", typ_zmr = "number", popis = "string", dat_zad = "JsonDate", dat_evi = "JsonDate", dat_sch = "JsonDate", dat_pra = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_roz = "string", ixs_fun_vla = "string", ixs_zmp_zad = "string", stav_zmr_txt = "string", typ_zmr_txt = "string",}
	const enum GRcnZmenoveRizeniDtoTypeLengths { ixp_zmr = 12, ixp_den = 12, ac = 20, evi_cis = 30, popis = 254, zmenu_prov = 12, ixp_roz = 12, ixs_fun_vla = 12, ixs_zmp_zad = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnZmenoveRizeniFinancniProfilDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující finanční profil změnového řízení.*/
	interface GRcnZmenoveRizeniFinancniProfilDto {
		/**Identifikátor změnového řízení.*/
		ixp_zmr?: string|null;
		/**Řádek položky finančního profilu.*/
		radek_zmr?: number|null;
		/**Kód typu položky finančního profilu.*/
		typ_pfp?: number|null;
		/**Identifikátor cesty.*/
		ixp?: string|null;
		/**Řádek položky.*/
		radek_pol?: number|null;
		/**Identifikátor typu náhrad.*/
		ixs_tna?: string|null;
		/**Kód státu.*/
		stat?: number|null;
		/**Částka celkem v CZK.*/
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
		/**Kód typu účastníka.*/
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
		/**Částka má dáti.*/
		readonly c_md?: JsonDecimal|null;
		/**Částka dal.*/
		readonly c_dal?: JsonDecimal|null;
		/**Typ náhrady textově.*/
		ixs_tna_txt?: string|null;
		/**Typ položky finančního profilu textově.*/
		typ_pfp_txt?: string|null;
	}
	const enum GRcnZmenoveRizeniFinancniProfilDtoNames { ixp_zmr = "ixp_zmr", radek_zmr = "radek_zmr", typ_pfp = "typ_pfp", ixp = "ixp", radek_pol = "radek_pol", ixs_tna = "ixs_tna", stat = "stat", c_celk = "c_celk", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dos = "typ_dos", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_md = "c_md", c_dal = "c_dal", ixs_tna_txt = "ixs_tna_txt", typ_pfp_txt = "typ_pfp_txt",}
	const enum GRcnZmenoveRizeniFinancniProfilDtoFragments { ixp_zmr = "main", radek_zmr = "main", typ_pfp = "main", ixp = "main", radek_pol = "main", ixs_tna = "main", stat = "main", c_celk = "main", ico = "main", ucs = "main", uus = "main", nks = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", typ_dos = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", c_md = "main", c_dal = "main", ixs_tna_txt = "ixs_tna_txt", typ_pfp_txt = "typ_pfp_txt",}
	const enum GRcnZmenoveRizeniFinancniProfilDtoTypes { ixp_zmr = "string", radek_zmr = "number", typ_pfp = "number", ixp = "string", radek_pol = "number", ixs_tna = "string", stat = "number", c_celk = "JsonDecimal", ico = "string", ucs = "string", uus = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dos = "number", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c_md = "JsonDecimal", c_dal = "JsonDecimal", ixs_tna_txt = "string", typ_pfp_txt = "string",}
	const enum GRcnZmenoveRizeniFinancniProfilDtoTypeLengths { ixp_zmr = 12, ixp = 12, ixs_tna = 12, ico = 10, ucs = 10, uus = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnZpusobDopravyDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující způsob dopravy.*/
	interface GRcnZpusobDopravyDto {
		/**Kód způsobu dopravy.*/
		zp_dopr?: number|null;
		/**Způsob dopravy textově.*/
		zp_dopr_txt?: string|null;
		/**Doplňující číselná informace.*/
		k_v?: number|null;
		/**Doplňující textová informace.*/
		k_s?: string|null;
	}
	const enum GRcnZpusobDopravyDtoNames { zp_dopr = "zp_dopr", zp_dopr_txt = "zp_dopr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRcnZpusobDopravyDtoFragments { zp_dopr = "main", zp_dopr_txt = "main", k_v = "main", k_s = "main",}
	const enum GRcnZpusobDopravyDtoTypes { zp_dopr = "number", zp_dopr_txt = "string", k_v = "number", k_s = "string",}
	const enum GRcnZpusobDopravyDtoTypeLengths { zp_dopr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GRcnZpusobUhradyDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**Datový objekt popisující způsob úhrady výdaje.*/
	interface GRcnZpusobUhradyDto {
		/**Identifkátor dokladu.*/
		ixp?: string|null;
		/**Identifikátor typu náhrady.*/
		ixs_tna?: string|null;
		/**Kód způsobu úhrady.*/
		zp_uhr?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Název typu náhrady.*/
		ixs_tna_txt?: string|null;
		/**Způsob úhrady textově.*/
		zp_uhr_txt?: string|null;
	}
	const enum GRcnZpusobUhradyDtoNames { ixp = "ixp", ixs_tna = "ixs_tna", zp_uhr = "zp_uhr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_tna_txt = "ixs_tna_txt", zp_uhr_txt = "zp_uhr_txt",}
	const enum GRcnZpusobUhradyDtoFragments { ixp = "*", ixs_tna = "*", zp_uhr = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_tna_txt = "*", zp_uhr_txt = "*",}
	const enum GRcnZpusobUhradyDtoTypes { ixp = "string", ixs_tna = "string", zp_uhr = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_tna_txt = "string", zp_uhr_txt = "string",}
	const enum GRcnZpusobUhradyDtoTypeLengths { ixp = 12, ixs_tna = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Dto\GWflProfilDto.d.ts 

declare namespace Gordic.Rcn.Interface {
	/**DTO pro WflProfil*/
	interface GWflProfilDto {
		/**ixp*/
		ixp?: string|null;
		/**lic*/
		lic?: string|null;
		/**ixp_spis*/
		ixp_spis?: string|null;
		/**priz_spis*/
		priz_spis?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**akt_znacka*/
		akt_znacka?: string|null;
		/**stav_dist*/
		stav_dist?: number|null;
		/**stav_pis*/
		stav_pis?: number|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**s_prij*/
		s_prij?: number|null;
		/**s_ssl*/
		s_ssl?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**s_ele*/
		s_ele?: number|null;
		/**s_fyz*/
		s_fyz?: number|null;
		/**misto_vzniku*/
		misto_vzniku?: string|null;
		/**s_sgn*/
		s_sgn?: number|null;
		/**dat_pod*/
		dat_pod?: JsonDate|null;
		/**cs_akt_znacka*/
		cs_akt_znacka?: string|null;
		/**priz_view_ssl*/
		priz_view_ssl?: number|null;
		/**uzo*/
		uzo?: string|null;
		/**spis_pl*/
		spis_pl?: string|null;
		/**spis_znak*/
		spis_znak?: string|null;
		/**ixs_fun_wfl*/
		ixs_fun_wfl?: string|null;
		/**s_uloz*/
		s_uloz?: number|null;
		/**dat_uloz*/
		dat_uloz?: JsonDate|null;
		/**ixs_su_wfl*/
		ixs_su_wfl?: string|null;
		/**s_odes*/
		s_odes?: number|null;
		/**dat_mpd0*/
		dat_mpd0?: JsonDate|null;
		/**priz_cj*/
		priz_cj?: number|null;
		/**dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**ixs_cj*/
		ixs_cj?: string|null;
		/**ixs_lpc*/
		ixs_lpc?: string|null;
		/**puvod*/
		puvod?: number|null;
		/**s_schval*/
		s_schval?: number|null;
		/**umisteni*/
		umisteni?: string|null;
		/**st_utaj_id*/
		st_utaj_id?: number|null;
		/**wfl_pristup*/
		wfl_pristup?: number|null;
		/**skar_znak*/
		skar_znak?: string|null;
		/**skar_lhuta*/
		skar_lhuta?: number|null;
		/**rok_spo_uda*/
		rok_spo_uda?: number|null;
		/**ixp_top*/
		ixp_top?: string|null;
		/**typ_spis*/
		typ_spis?: number|null;
		/**barcode*/
		barcode?: string|null;
		/**skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**ixs_ext*/
		ixs_ext?: string|null;
		/**rok_skartace*/
		rok_skartace?: number|null;
		/**ixs_spu*/
		ixs_spu?: string|null;
		/**poc_listu*/
		poc_listu?: string|null;
		/**poc_stran*/
		poc_stran?: number|null;
		/**poc_kop*/
		poc_kop?: number|null;
		/**poc_priloh*/
		poc_priloh?: number|null;
		/**poc_l_priloh*/
		poc_l_priloh?: string|null;
		/**cj*/
		cj?: string|null;
		/**ico*/
		ico?: string|null;
	}
	const enum GWflProfilDtoNames { ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico",}
	const enum GWflProfilDtoFragments { ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*",}
	const enum GWflProfilDtoTypes { ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCesta.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní pro evidenci a zpracování služebních cest a návštěv(akcí).
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCesta {
		/**Detail služební cesty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Seznam služebních cest.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Počet služebních cest.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení služební cesty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Oprava cesty včetně dokumentu.*/
		updateWithSsl(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,rd:GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>}>): _Task<{rq:GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,rd:GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Oprava služební cesty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Oprava resp. založení služební cesty.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Odstranění služební cesty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Zruší storno - vrátí do stavu navrhnuto.*/
		zrusitStorno(rq?:CallParams<{ixsRcn:string,duvod:string}>): _Task<{ixsRcn:string,duvod:string},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Hromadné schválení cestovních příkazů k cestě.*/
		hromadneSchvaleniCp(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,void>;
		/**Předání služební cesty jinému funkčnímu místu.*/
		predaniFunkci(rq?:CallParams<{ixsRcn:string,ixsFunNov:string,zpracovatel:number,vlastnik:number}>): _Task<{ixsRcn:string,ixsFunNov:string,zpracovatel:number,vlastnik:number},void>;
		/**Kontrola cesty vůči profilu plánu (PCN).*/
		kontrolaProfiluVuciPcn(rq?:Gordic.Rcn.Interface.GRcnCestaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaDto>>;
		/**Vygeneruje cestovní příkazy pro osoby na akci.*/
		generujCp(rq?:CallParams<{ixsRcn:string,prizZmr:number,kontrola:number,ixpDen:string}>): _Task<{ixsRcn:string,prizZmr:number,kontrola:number,ixpDen:string},void>;
		/**Předání všech cestovních příkazů na služební cestě funkci.*/
		predaniVsechCpFunkci(rq?:CallParams<{ixsRcn:string,ixsFunNov:string,zpracovatel:number,vlastnik:number}>): _Task<{ixsRcn:string,ixsFunNov:string,zpracovatel:number,vlastnik:number},void>;
		/**Hromadné zlikvidování cest.*/
		hromadneZlikvidovani(rq?:CallParams<{pidy:string}>): _Task<{pidy:string},Gordic.General.ApplicationInterface.GGroupResult>;
		/**Ukončení služební cesty.*/
		zlikvidovatSc(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},void>;
		/**Obnova zlikvidované cesty - změna stavu do uhrazeno.*/
		zrusitZlikvidovaniSc(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},void>;
		/**Dle identifikátoru plánu zjistí org.*/
		zjistiOrgZPcn(rq?:CallParams<{ixpPcn:string}>): _Task<{ixpPcn:string},string>;
		/**Nastaví příznak priz_view - doklad zobrazen/přečten.*/
		oznacJakoPrecteny(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCesta: ServiceBase & Catalog.RcnCesta;
	}
	const RcnCesta: Client["RcnCesta"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro Cestu.*/
	const enum GRcnCestaFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Identifikátor plánu.*/
		ixp_pcn,
		/**Rok.*/
		rok,
		/**Třídění.*/
		uex_akt,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Stav cesty.*/
		stav_rcn,
		/**Název.*/
		nazev,
		/**Rozkaz.*/
		rozkaz,
		/**Kód státu.*/
		stat,
		/**Místo.*/
		misto,
		/**Účel.*/
		ucel,
		/**Zkratka dopravních prostředků.*/
		zkr_dopr,
		/**Místo nástupu.*/
		misto_n,
		/**Datum nástupu.*/
		dat_n,
		/**Místo ukončení.*/
		misto_u,
		/**Datum ukončení.*/
		dat_u,
		/**Místo hranice 1.*/
		misto_hra1,
		/**Datum hranice 1.*/
		dat_hra1,
		/**Místo hranice 2.*/
		misto_hra2,
		/**Datum hranice 2.*/
		dat_hra2,
		/**Podmínky uskutečnění.*/
		podm_uskut,
		/**Podmínky výpočtu.*/
		podm_vypoc,
		/**Ičo financující.*/
		ico_fin,
		/**Nákladové středisko financující.*/
		nks_fin,
		/**Ičo správce dílčího rozpočtu.*/
		ico_sdr,
		/**Nákladové středisko správce dílčího rozpočtu.*/
		nks_sdr,
		/**Ičo realizátora.*/
		ico_real,
		/**Nákladové středisko realizátora.*/
		nks_real,
		/**Identifikátor funkce realizátora.*/
		ixs_fun_real,
		/**Identifikátor funkce zadavatele.*/
		ixs_fun_zad,
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Aktivita záznamu.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor kurzovního lístku.*/
		ixp_kur,
		/**Identifikátor funkce kompetenta.*/
		ixs_fun_komp,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Kód kategorie cesty.*/
		ktg_rcn,
		/**Kód úrovně návštěvy.*/
		urn,
		/**Identifikátor zadavatele(změnu provedl).*/
		ixs_zmp_zad,
		/**Org.*/
		te1_p,
		/**Rok číselníku akcí.*/
		rok_cia,
		/**Ičo číselníku akcí.*/
		ico_cia,
		/**Číslo číselníku akcí.*/
		cislo_cia,
		/**Identifikátor číselníku akcí.*/
		ixs_cia,
		/**Typ změnového řízení.*/
		typ_zmr,
		/**Identifikátor změnového řízení.*/
		ixp_zmr,
		/**Identifikátor členění.*/
		ixs_cle,
		/**Typ požadavku.*/
		typ_poz,
		/**Datum exportu.*/
		dat_exp,
		/**Viditelnost NS, je-li prázdné, dohledá se na serveru dle administrace.*/
		omezeniNs,
		/**Načíst i související výdaje.*/
		sv,
		/**Agendové číslo smluv.*/
		ac_sml,
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

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaEtapa.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - etapa služební cesty.
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaEtapa {
		/**Detail etapy služební cesty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Seznam etap služební cesty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Založení etapy služební cesty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Oprava etapy služební cesty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Oprava resp. založení etapy služební cesty.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Odstranění etapy služební cesty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Kopie etap mezi příazy ve vyúčtování.*/
		kopirovatEtapy(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaDto>>;
		/**Zkontroluje časovou návaznost etap.*/
		kontrolaNavaznostiEtap(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},void>;
		/**Schválení etap.*/
		schvalitEtapy(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaEtapa: ServiceBase & Catalog.RcnCestaEtapa;
	}
	const RcnCestaEtapa: Client["RcnCestaEtapa"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro etapy služební cesty.*/
	const enum GRcnCestaEtapaFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
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
		/**Kód definice navýšení náhrad.*/
		dvn,
		/**Částka stravného krácená.*/
		c_strava_kr,
		/**Procento stravného kráceno.*/
		proc_strava_kr,
		/**Částka stravného.*/
		c_strava,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Dat_zmena.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Číslo etapy.*/
		cislo_eta,
		/**Den od.*/
		den_od,
		/**Kód stavu etapy.*/
		stav_eta,
		/**Částka kapesné kráceno.*/
		c_kapes_kr,
		/**Procento kapesné kráceno.*/
		proc_kapes_kr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaEtapaKraceniStravneho.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - krácení stravného na etapách cesty.
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaEtapaKraceniStravneho {
		/**Detail krácení stravného na etapě cesty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>;
		/**Seznam krácení stravného na etapě cesty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>;
		/**Založení krácení stravného na etapě cesty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>;
		/**Oprava krácení stravného na etapě cesty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>;
		/**Oprava resp. založení krácení stravného na etapě cesty.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>;
		/**Odstranění krácení stravného na etapě cesty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaKraceniStravnehoDto>>;
		/**Hromadné odstranění krácení stravného na etapě cesty.*/
		hromadnyDelete(rq?:CallParams<{ixp:string,radky:string}>): _Task<{ixp:string,radky:string},void>;
		/**Vrátí sazbu krácení dle druhu stravy.*/
		vratSazbuKraceni(rq?:CallParams<{druh_str:number}>): _Task<{druh_str:number},JsonDecimal>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaEtapaKraceniStravneho: ServiceBase & Catalog.RcnCestaEtapaKraceniStravneho;
	}
	const RcnCestaEtapaKraceniStravneho: Client["RcnCestaEtapaKraceniStravneho"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro krácení stravného na etapě cesty.*/
	const enum GRcnCestaEtapaKraceniStravnehoFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Řádek krácení.*/
		radek,
		/**Datum.*/
		datum,
		/**Procento stravného.*/
		proc_strava,
		/**Procento kapesného.*/
		proc_kapes,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Procento krácení tuzemského stravného.*/
		proc_tuzem,
		/**Příznak ubytování.*/
		priz_ubyt,
		/**Tuzemské stravné - snídaně, oběd, večeře (101).*/
		strava_tuz,
		/**Zahraniční stravné - snídaně, oběd, večeře (101).*/
		strava_zah,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaEtapaLimit.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - závazné limity pro etapu cesty.
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaEtapaLimit {
		/**Detail závazného limitu pro etapu cesty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>;
		/**Seznam závazných limitů pro etapu cesty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>;
		/**Založení závazného limitu pro etapu cesty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>;
		/**Odstranění závazného limitu pro etapu cesty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaLimitDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaEtapaLimit: ServiceBase & Catalog.RcnCestaEtapaLimit;
	}
	const RcnCestaEtapaLimit: Client["RcnCestaEtapaLimit"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr závazných limitu pro etapu cesty.*/
	const enum GRcnCestaEtapaLimitFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Vzdálenost celkem v km.*/
		km_celkem,
		/**Pohonné hmoty celkem.*/
		phm_celkem,
		/**Vzdálenost v km v cizině.*/
		km_valuta,
		/**Pohonné hmoty v cizině.*/
		phm_valuta,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaEtapaVydaj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - výdaje pro konkrétní průběh cesty (na etapě služební cesty).
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaEtapaVydaj {
		/**Detail výdaje pro konkrétní průběh cesty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
		/**Seznam výdajů pro konkrétní průběh cesty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
		/**Založení výdaje pro konkrétní průběh cesty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
		/**Oprava výdaje pro konkrétní průběh cesty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
		/**Oprava resp. založení výdaje pro konkrétní průběh cesty.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
		/**Odstranění výdaje pro konkrétní průběh cesty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
		/**Kopie výdajů z předchozí etapy.*/
		kopieVydaje(rq?:Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaEtapaVydajDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaEtapaVydaj: ServiceBase & Catalog.RcnCestaEtapaVydaj;
	}
	const RcnCestaEtapaVydaj: Client["RcnCestaEtapaVydaj"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - výdaje pro konkrétní průběh cesty.*/
	const enum GRcnCestaEtapaVydajFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Řádek etapy.*/
		radek_pep,
		/**Pořadí výdaje.*/
		poradi,
		/**Kód způsobu dopravy.*/
		zp_dopr,
		/**Příznak zálohy.*/
		priz_zaloha,
		/**Vzdálenost v km.*/
		km,
		/**Průměrná spotřeba.*/
		prum_spotr,
		/**Cena pohonných hmot.*/
		c_phm,
		/**Tankováno.*/
		tankovano,
		/**Typ prostředku - tovární značka, model.*/
		typ_prostr,
		/**Spz.*/
		spz,
		/**Číslo technického průkazu.*/
		cislo_tp,
		/**Havarijní pojištění.*/
		hav_poj,
		/**Objem válců.*/
		objem_val,
		/**Příznak přívěsu.*/
		priz_prives,
		/**Příznak jízdenka.*/
		priz_jizdenka,
		/**Objednávka.*/
		objednavka,
		/**Faktura vlastní.*/
		faktura_vl,
		/**Faktura dodavatelská.*/
		faktura_dod,
		/**Spojovací zařízení.*/
		spoj,
		/**Dodavatel.*/
		dodavatel,
		/**Částka v měně.*/
		c_mena,
		/**Kód měny.*/
		mena,
		/**Doklady.*/
		doklady,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Kód typu pohonné hmoty.*/
		phm,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Krácení v zahraničí.*/
		kr_zahr,
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Počet osob.*/
		poc_oso,
		/**Specielní filtr pro dopravu ((zp_dopr != 0) OR (zp_dopr = 0 AND zp_uhr = 0)).*/
		filtrProDopravu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaFinProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - finanční profil (Předpisy krytí).
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaFinProfil {
		/**Detail finančního profilu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>;
		/**Seznam položek finančního profilu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>;
		/**Založení položky finančního profilu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>;
		/**Oprava položky finančního profilu.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>;
		/**Oprava resp. založení položky finančního profilu.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>;
		/**Odstranění finančního profilu.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>;
		/**Schvalí finanční profil daná cesty/návštěvy.*/
		schvalit(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},void>;
		/**Zjistí stav/sumář finančního profilu dle Rpp.*/
		zjistiStavRpp(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilstavRppDto>>;
		/**Vrátí volné prostředky.*/
		vratVolneProstredky(rq?:Gordic.Rcn.Interface.GRcnCestaFinProfilDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaFinProfilDto>,JsonDecimal>;
		/**Položky limitovaného příslibu.*/
		prehledVyuzitiSpol(rq?:CallParams<{ixpSml:string,rokSml:number,cisloSml:number,ixsRcn:string}>): _Task<{ixpSml:string,rokSml:number,cisloSml:number,ixsRcn:string},GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaFinProfilPrehledVyuzitiDto>>;
		/**Uvolní finanční prostředky.*/
		uvolnitProstredky(rq?:CallParams<{ixp:string,rok:number,cislo:number,novaCastka:JsonDecimal,jeSpravce:boolean}>): _Task<{ixp:string,rok:number,cislo:number,novaCastka:JsonDecimal,jeSpravce:boolean},void>;
		/**Hromadné uvolnění blokace.*/
		uvolnitProstredkyHromadne(rq?:CallParams<{ixsRcns:string}>): _Task<{ixsRcns:string},void>;
		/**Zjištění částky pro Rpp.*/
		navrhCastkyRpp(rq?:CallParams<{ixsRcn:string,rok:number,cislo:number,uea:string,ueb:string}>): _Task<{ixsRcn:string,rok:number,cislo:number,uea:string,ueb:string},JsonDecimal>;
		/**Založení položek finančního profilu ze SML.*/
		createFpSml(rq?:CallParams<{ixsRcn:string,seznamSml:string[]}>): _Task<{ixsRcn:string,seznamSml:string[]},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaFinProfil: ServiceBase & Catalog.RcnCestaFinProfil;
	}
	const RcnCestaFinProfil: Client["RcnCestaFinProfil"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr -finanční profil (Předpisy krytí).*/
	const enum GRcnCestaFinProfilFilter {
		/**Identifikátor cesty.*/
		ixp,
		/**Rok.*/
		rok,
		/**Číslo položky.*/
		cislo,
		/**Licence.*/
		lic,
		/**Identifikátor položky plánu.*/
		ixp_pla,
		/**Číslo položky plánu.*/
		cis_pol_pla,
		/**Identifikátor funkce.*/
		ixs_fun,
		/**Název.*/
		nazev,
		/**Kód stavu zaúčtování.*/
		up_stav,
		/**Částka.*/
		c,
		/**Datum plnění.*/
		dat_plneni,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
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
		/**Směrový kód vlastního účtu.*/
		sk_vl,
		/**Bankovní účet vlastní.*/
		bu_vl,
		/**Částka fin.*/
		c_fin,
		/**Datum vzniku.*/
		dat_vznik,
		/**Typ agendy fin.*/
		typ_ag_fin,
		/**Druh dokladu.*/
		drd,
		/**Uea_rr.*/
		uea_rr,
		/**Ueb_rr.*/
		ueb_rr,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Rok smlouvy.*/
		rok_sml,
		/**Číslo smlouvy.*/
		cislo_sml,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaUcastnik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - účastník na cestě.
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaUcastnik {
		/**Detail účastníka na cestě.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaUcastnikDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>;
		/**Seznam účastníků na cestě.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>;
		/**Založení účastníka na cestě.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>;
		/**Oprava účastníka na cestě.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>;
		/**Oprava resp. založení účastníka na cestě.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>;
		/**Odstranění účastníka na cestě.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaUcastnikDto>>;
		/**Vygeneruje cestovní příkazy pro osoby na akci.*/
		generujCp(rq?:CallParams<{ixsRcn:string,prizZmr:number}>): _Task<{ixsRcn:string,prizZmr:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaUcastnik: ServiceBase & Catalog.RcnCestaUcastnik;
	}
	const RcnCestaUcastnik: Client["RcnCestaUcastnik"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr účastníka na cestě.*/
	const enum GRcnCestaUcastnikFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Pořadí účastníka.*/
		por_oso,
		/**Kód vztahu osoby k akci.*/
		stav_dos,
		/**Kód typu účastníka.*/
		typ_dos,
		/**Jméno.*/
		jmeno,
		/**Příjmení.*/
		prijmeni,
		/**Titul před.*/
		tit_pred,
		/**Titul za.*/
		tit_za,
		/**Osobní číslo.*/
		os_cislo,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Identifikátor organizační jednotky.*/
		ixs_orj,
		/**Identifikátor typu osoby.*/
		ixs_tos,
		/**Nákladové středisko.*/
		nks,
		/**Výkon.*/
		vkn,
		/**Hodnost.*/
		hodnost,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestaVazbySouvisejiciVydaj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Související výdaje na vazbách cesty.
	* @domain SluzCestyReal
	* @businessObject RcnCesta
	*/
	interface RcnCestaVazbySouvisejiciVydaj {
		/**Detail Související výdaje na vazbách cesty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>;
		/**Seznam Související výdaje na vazbách cesty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>;
		/**Počet Související výdaje na vazbách cesty.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Související výdaje na vazbách cesty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>;
		/**Oprava Související výdaje na vazbách cesty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>;
		/**Oprava resp. založení Související výdaje na vazbách cesty.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>;
		/**Odstranění Související výdaje na vazbách cesty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestaVazbySouvisejiciVydajDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestaVazbySouvisejiciVydaj: ServiceBase & Catalog.RcnCestaVazbySouvisejiciVydaj;
	}
	const RcnCestaVazbySouvisejiciVydaj: Client["RcnCestaVazbySouvisejiciVydaj"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro Související výdaje na vazbách cesty.*/
	const enum GRcnCestaVazbySouvisejiciVydajFilter {
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Řádek výdaje.*/
		radek_svy,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Typ agendy kód.*/
		typ_ag,
		/**Identifikátor ext.*/
		ixp_ext,
		/**Měna kód.*/
		mena,
		/**Částka v měně.*/
		c_mena,
		/**Částka celkem.*/
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
		/**Aktivita kód.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnCestovniPojisteni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - cestovní pojištění.
	* @domain SluzCestyReal
	* @businessObject RcnCestovniPojisteni
	*/
	interface RcnCestovniPojisteni {
		/**Detail cestovního pojištění.*/
		read(rq?:Gordic.Rcn.Interface.GRcnCestovniPojisteniDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>;
		/**Seznam cestovních pojištění.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>;
		/**Počet cestovních pojištění.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení cestovního pojištění.*/
		create(rq?:Gordic.Rcn.Interface.GRcnCestovniPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>;
		/**Oprava cestovního pojištění.*/
		update(rq?:Gordic.Rcn.Interface.GRcnCestovniPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>;
		/**Oprava resp. založení cestovního pojištění.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnCestovniPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>;
		/**Odstranění cestovního pojištění.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnCestovniPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnCestovniPojisteniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnCestovniPojisteni: ServiceBase & Catalog.RcnCestovniPojisteni;
	}
	const RcnCestovniPojisteni: Client["RcnCestovniPojisteni"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr cestovních pojištění.*/
	const enum GRcnCestovniPojisteniFilter {
		/**Identifikátor cestovního pojištění.*/
		ixp_cpo,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Číslo pojištění.*/
		cislo_poj,
		/**Ústav.*/
		ustav,
		/**Název.*/
		nazev,
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Kód státu.*/
		stat,
		/**Částka pojištění.*/
		c_poj,
		/**Kód měny pojištění.*/
		mena_poj,
		/**Popis.*/
		popis,
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

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Historie změn dokladu.
	* @domain SluzCestyReal
	* @businessObject RcnHistorie
	*/
	interface RcnHistorie {
		/**Detail Historie změn dokladu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnHistorieDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnHistorieDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnHistorieDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnHistorieDto>>;
		/**Seznam Historie změn dokladu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnHistorieDto>>;
		/**Počet Historie změn dokladu.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Historie změn dokladu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnHistorieDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnHistorieDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnHistorieDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnHistorieDto>>;
		/**Oprava Historie změn dokladu.*/
		update(rq?:Gordic.Rcn.Interface.GRcnHistorieDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnHistorieDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnHistorieDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnHistorieDto>>;
		/**Oprava resp. založení Historie změn dokladu.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnHistorieDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnHistorieDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnHistorieDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnHistorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnHistorie: ServiceBase & Catalog.RcnHistorie;
	}
	const RcnHistorie: Client["RcnHistorie"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro Historie změn dokladu.*/
	const enum GRcnHistorieFilter {
		/**Identifikátor.*/
		ixp,
		/**Pořadové číslo.*/
		por_cislo,
		/**Kód změny.*/
		zmena,
		/**Změna textově.*/
		zmena_txt,
		/**Kategorie změny.*/
		zmena_ktg,
		/**Poznámka.*/
		poznamka,
		/**Typ agendy.*/
		typ_ag,
		/**Ixx.*/
		ixx,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnKategorieHodnoceni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - kategorie hodnocení.
	* @domain SluzCestyReal
	* @businessObject RcnKategorieHodnoceni
	*/
	interface RcnKategorieHodnoceni {
		/**Detail kategorie hodnocení.*/
		read(rq?:Gordic.Rcn.Interface.GRcnKategorieHodnoceniDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnKategorieHodnoceniDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnKategorieHodnoceniDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnKategorieHodnoceniDto>>;
		/**Seznam kategorií hodnocení.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnKategorieHodnoceniDto>>;
		/**Kategorie hodnocení na akci.*/
		kategorieZaznamu(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceListResponse<Gordic.Rcn.Interface.GRcnKategorieHodnoceniDto>>;
		/**Zkratky kategorií hodnocení na akci v textovém poli.*/
		kategorieZaznamuPole(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string[]>;
		/**Aktualizace kategorií hodnocení na akci.*/
		aktualizujKategorieZaznamu(rq?:CallParams<{ixp:string,seznamVybranychKategorii:string[]}>): _Task<{ixp:string,seznamVybranychKategorii:string[]},void>;
		/**Kopírování kategorií z PCN do RCN - pouze nové záznamy.*/
		kopirujKatHodPcn(rq?:CallParams<{rok:number}>): _Task<{rok:number},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnKategorieHodnoceni: ServiceBase & Catalog.RcnKategorieHodnoceni;
	}
	const RcnKategorieHodnoceni: Client["RcnKategorieHodnoceni"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr kategorie hodnocení.*/
	const enum GRcnKategorieHodnoceniFilter {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Zkratka kategorie hodnocení.*/
		kat_hod,
		/**Popis kategorie hodnocení.*/
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

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - kniha RCN.
	* @domain SluzCestyReal
	* @businessObject RcnKniha
	*/
	interface RcnKniha {
		/**Lze do knihy zapsat - není uzavřena ?.*/
		lzeZapsatDoDeniku(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnKniha: ServiceBase & Catalog.RcnKniha;
	}
	const RcnKniha: Client["RcnKniha"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr knih RCN.*/
	const enum GRcnKnihaFilter {
		/**Identifikátor knihy.*/
		ixp_den,
		/**Licence.*/
		lic,
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
		/**Pořadové číslo max.*/
		por_cislo_max,
		/**Subřada max.*/
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
		/**Uex.*/
		uex,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor kurzovního lístku.*/
		ixp_kur,
		/**Identifikátor knihy smluv.*/
		ixp_den_sml,
		/**Identifikátor typu smluv.*/
		ixs_typ_sml,
		/**Aktivita.*/
		aktivita,
		/**Název.*/
		nazev,
		/**Rok.*/
		rok,
		/**Typ knihy.*/
		typ_den,
		/**Kategorie knihy.*/
		ktg_den,
		/**Prefix.*/
		prefix,
		/**Suffix.*/
		suffix,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnLimPrislib.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Limitovaný příslib.
	* @domain SluzCestyReal
	* @businessObject RcnLimPrislib
	*/
	interface RcnLimPrislib {
		/**Seznam limitovaných příslibů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnLimPrislibDto>>;
		/**Seznam položek příslibu.*/
		listPol(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnLimPrislibPolDto>>;
		/**Seznam záznamů blokace.*/
		listBlokace(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},GServiceListResponse<Gordic.Rcn.Interface.GRcnTempTabulkaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnLimPrislib: ServiceBase & Catalog.RcnLimPrislib;
	}
	const RcnLimPrislib: Client["RcnLimPrislib"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro Limitovaný příslib.*/
	const enum GRcnLimPrislibFilter {
		/**Identifikátor smlouvy.*/
		ixp,
		/**Licence.*/
		lic,
		/**Identifikátor externího subjektu.*/
		ixs_esu,
		/**Ičo externího subjektu.*/
		ico_esu,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Nákladové středisko.*/
		nks,
		/**Agendové číslo externího subjektu.*/
		ac_esu,
		/**Popis.*/
		popis,
		/**Směrový kód vlastního účtu.*/
		sk_vl,
		/**Bankovní účet vlastní.*/
		bu_vl,
		/**Směrový kód cizího účtu.*/
		sk_ci,
		/**Bankovní účet cizí.*/
		bu_ci,
		/**Agendové číslo.*/
		ac,
		/**Agendové číslo smluv.*/
		ac_sml,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Subřada.*/
		subrada,
		/**Částka.*/
		c,
		/**Kód kategorie typu písemnosti.*/
		ktg_typ,
		/**Identifikátor typu písemnosti.*/
		ixs_typ,
		/**Eko aktivita.*/
		eko_akt,
		/**Kód stavu smlouvy.*/
		sml_stav,
		/**Datum uzavření.*/
		dat_uzavreni,
		/**Datum platnosti.*/
		dat_platnost,
		/**Datum prij pod.*/
		dat_prij_pod,
		/**Zadavatel.*/
		zadavatel,
		/**Identifikátor vyřizující funkce.*/
		ixs_fun_vyriz,
		/**Identifikátor funkce referenta.*/
		ixs_fun_ref,
		/**Rok.*/
		rok,
		/**Poznámka.*/
		poznamka,
		/**Soutěž.*/
		soutez,
		/**Kód měny.*/
		mena,
		/**Kategori smluv.*/
		ktg_sml,
		/**Datum  změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Částka položek.*/
		c_pol,
		/**Částka dod.*/
		c_dod,
		/**Typ platnost.*/
		typ_platnost,
		/**Název.*/
		nazev,
		/**Agendové číslo ver zak.*/
		ac_ver_zak,
		/**Agendové číslo dok 1.*/
		ac_dok_1,
		/**Agendové číslo dok 2.*/
		ac_dok_2,
		/**Účinnost.*/
		ucinnost,
		/**Identifikátor organizační jednotky.*/
		ixs_orj,
		/**Číslo realizátora.*/
		cis_real,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Agendové číslo nadřazené.*/
		ac_nad,
		/**Agendvé číslo smlouvy nadřazené.*/
		ac_sml_nad,
		/**Identifikátor pri.*/
		ixs_pri,
		/**Num obj.*/
		num_obj,
		/**Částka v měně.*/
		c_mena,
		/**Kurz.*/
		kurz,
		/**M.*/
		m,
		/**Typ kurzu.*/
		typ_kurz,
		/**Datum účinnosti.*/
		dat_ucinnost,
		/**Finance od.*/
		fin_od,
		/**Finance do.*/
		fin_do,
		/**Sgn_stav.*/
		sgn_stav,
		/**Příznak zobrazení.*/
		priz_view,
		/**Typ ceny.*/
		typ_ceny,
		/**Pořoadové číslo nabyvatele.*/
		por_cislo_nab,
		/**Typ agendového bloku.*/
		typ_ag_blok,
		/**Identifikátor nabyvatele.*/
		ixp_nab,
		/**Identifikátor referenta zastupující.*/
		ixs_ref_zast,
		/**Licence zastupujícího externího subjektu.*/
		lic_zast_esu,
		/**Pořadí zastupujícího externího subjektu.*/
		por_zast_esu,
		/**Datum dok 1.*/
		dat_dok_1,
		/**Datum dok 2.*/
		dat_dok_2,
		/**Identifikátor zuk.*/
		ixs_zuk,
		/**Kategorie zuk.*/
		ktg_zuk,
		/**Datum ukončení.*/
		dat_uko,
		/**Identifikátor externího subjektu zastupující.*/
		ixs_esu_zast,
		/**Částka sazba penalizace.*/
		c_sazba_pen,
		/**Procentní sazba penalizace.*/
		proc_sazba_pen,
		/**Typ penalizace.*/
		typ_pen,
		/**Zak upr.*/
		zak_upr,
		/**Příznak spo.*/
		priz_spo,
		/**Typ spo.*/
		typ_spo,
		/**Částka spo.*/
		c_spo,
		/**Procentuelní spo.*/
		proc_spo,
		/**Příznak úročení.*/
		priz_uroc,
		/**Num dod.*/
		num_dod,
		/**Číslo dodatku.*/
		cislo_dod,
		/**Zp_def_ceny.*/
		zp_def_ceny,
		/**Identifikátor smlouvy pri.*/
		ixp_sml_pri,
		/**Příznak pzp.*/
		priz_pzp,
		/**Datum dph od.*/
		dat_dph_od,
		/**Datum dph do.*/
		dat_dph_do,
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
		/**Částka celkem měna ss.*/
		c_c_mena_ss,
		/**Částka celkem měna ns.*/
		c_c_mena_ns,
		/**Částka celkem měna okr.*/
		c_c_mena_okr,
		/**Typ pohledávky.*/
		typ_phl,
		/**Vs.*/
		vs,
		/**Částka v měně dph 3s.*/
		c_mena_dph_3s,
		/**Částka v měně dph 4s.*/
		c_mena_dph_4s,
		/**Částka v měně z 3s.*/
		c_mena_z_3s,
		/**Částka v měně z 4s.*/
		c_mena_z_4s,
		/**Částka celkem v měně  3s.*/
		c_c_mena_3s,
		/**Částka celkem v měně  4s.*/
		c_c_mena_4s,
		/**Datum sgn.*/
		dat_sgn,
		/**Datum sgn ext.*/
		dat_sgn_ext,
		/**Částka v měně doc.*/
		c_mena_doc,
		/**Datum rad iissp.*/
		dat_rad_iissp,
		/**Příznak opce.*/
		priz_opce,
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Chytrý filtr dle položek.*/
		chytryFiltr,
	}
	/**Filtr pro Limitovaný příslib položky.*/
	const enum GRcnLimPrislibPolFilter {
		/**Identifikátor.*/
		ixp,
		/**Rok.*/
		rok,
		/**Číslo.*/
		cislo,
		/**Licence.*/
		lic,
		/**Číslo položky pla.*/
		cis_pol_pla,
		/**Název.*/
		nazev,
		/**Up stav.*/
		up_stav,
		/**Částka.*/
		c,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
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
		/**Směrový kód vlastního účtu.*/
		sk_vl,
		/**Bankovní účet vlastní.*/
		bu_vl,
		/**Částka faktury.*/
		c_fak,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Datum vzniku.*/
		dat_vznik,
		/**Částka obj sml.*/
		c_obj_sml,
		/**Druh dokladu.*/
		drd,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Rok sml.*/
		rok_sml,
		/**Číslo sml.*/
		cislo_sml,
		/**Uea_rr.*/
		uea_rr,
		/**Ueb_rr.*/
		ueb_rr,
		/**Identifikátor pri.*/
		ixs_pri,
		/**Pořadové číslo.*/
		por_cis,
		/**Typ blokační agendy.*/
		typ_ag_blok,
		/**Znam.*/
		znam,
		/**Xuete.*/
		xuete,
		/**Příznak zaz.*/
		priz_zaz,
		/**Eds dok.*/
		eds_dok,
		/**Id hdr.*/
		id_hdr,
		/**Řádek hdr.*/
		radek_hdr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnOsoba.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - osoba RCN.
	* @domain SluzCestyReal
	* @businessObject RcnOsoba
	*/
	interface RcnOsoba {
		/**Detail osoby.*/
		read(rq?:Gordic.Rcn.Interface.GRcnOsobaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnOsobaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnOsobaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnOsobaDto>>;
		/**Seznam osob.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnOsobaDto>>;
		/**Počet osob.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení osoby.*/
		create(rq?:Gordic.Rcn.Interface.GRcnOsobaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaDto>>;
		/**Oprava osoby.*/
		update(rq?:Gordic.Rcn.Interface.GRcnOsobaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaDto>>;
		/**Oprava resp. založení nové osoby, pokud daný PID není vyplněn.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnOsobaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaDto>>;
		/**Odstranění osoby.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnOsobaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnOsoba: ServiceBase & Catalog.RcnOsoba;
	}
	const RcnOsoba: Client["RcnOsoba"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr seznam osob.*/
	const enum GRcnOsobaFilter {
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Kód typu osoby.*/
		typ_osr,
		/**Jméno.*/
		jmeno,
		/**Příjmení.*/
		prijmeni,
		/**Titul před.*/
		tit_pred,
		/**Titul za.*/
		tit_za,
		/**Hodnost.*/
		hodnost,
		/**Osobní číslo.*/
		os_cislo,
		/**Identifikátor externího subjektu.*/
		ixs_esu,
		/**Identifikátor referenta.*/
		ixs_ref,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Název.*/
		nazev,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Identifikátor organizační jednotky.*/
		ixs_orj,
		/**Adresa.*/
		adresa,
		/**Nákladové středisko.*/
		nks,
		/**Výkon.*/
		vkn,
		/**Typ seznamu.*/
		typ_sez,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnOsobaRidic.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - řidič na osobě.
	* @domain SluzCestyReal
	* @businessObject RcnOsoba
	*/
	interface RcnOsobaRidic {
		/**Detail řidiče.*/
		read(rq?:Gordic.Rcn.Interface.GRcnOsobaRidicDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>;
		/**Seznam řidičů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>;
		/**Založení řidiče.*/
		create(rq?:Gordic.Rcn.Interface.GRcnOsobaRidicDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>;
		/**Oprava řidiče.*/
		update(rq?:Gordic.Rcn.Interface.GRcnOsobaRidicDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>;
		/**Oprava resp. založení řidiče.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnOsobaRidicDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>;
		/**Odstranění řidiče.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnOsobaRidicDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnOsobaRidicDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnOsobaRidicDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnOsobaRidic: ServiceBase & Catalog.RcnOsobaRidic;
	}
	const RcnOsobaRidic: Client["RcnOsobaRidic"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - řidič na osobě.*/
	const enum GRcnOsobaRidicFilter {
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Řádek.*/
		radek,
		/**Popis.*/
		popis,
		/**Poznámka.*/
		poznamka,
		/**Datum akce.*/
		dat_akce,
		/**Datum platnosti do.*/
		dat_plat_do,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPas.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - pas.
	* @domain SluzCestyReal
	* @businessObject RcnPas
	*/
	interface RcnPas {
		/**Detail pasu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPasDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPasDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPasDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPasDto>>;
		/**Seznam pasů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPasDto>>;
		/**Počet pasů.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení pasu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPasDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPasDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPasDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPasDto>>;
		/**Oprava pasu.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPasDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPasDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPasDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPasDto>>;
		/**Oprava resp. založení pasu.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPasDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPasDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPasDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPasDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPas: ServiceBase & Catalog.RcnPas;
	}
	const RcnPas: Client["RcnPas"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro pasy.*/
	const enum GRcnPasFilter {
		/**Identifikátor pasu.*/
		ixp_pas,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Rok.*/
		rok,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Číslo pasu.*/
		cislo_pas,
		/**Kód druhu pasu.*/
		druh_pas,
		/**Kód typu pasu.*/
		typ_pas,
		/**Kód stavu pasu.*/
		stav_pas,
		/**Kód způsobu znehodnocení.*/
		zp_zneh,
		/**Datum platnosti.*/
		dat_platnost,
		/**Datum evidence od.*/
		dat_evi_od,
		/**Datum evidence do.*/
		dat_evi_do,
		/**Datum vydání osobě.*/
		dat_vyd_oso,
		/**Kontakt osoby.*/
		kontakt_oso,
		/**Datum vrácení.*/
		dat_nav_oso,
		/**Datum vyřazení.*/
		dat_vra,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Vydáno do.*/
		dat_vyd_do,
		/**Identifikátor osoby.*/
		ixs_osr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPlatebniKarta.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - platební karta.
	* @domain SluzCestyReal
	* @businessObject RcnPlatebniKarta
	*/
	interface RcnPlatebniKarta {
		/**Detail platební karty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>;
		/**Seznam platebních karet.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>;
		/**Počet platebních karet.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení platební karty.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>;
		/**Oprava platební karty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>;
		/**Oprava resp. založení platební karty.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>;
		/**Odstranění platební karty.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaDto>>;
		/**Dohledám název banky z externích subjektů.*/
		dohledejBanku(rq?:CallParams<{ixsEsu:string}>): _Task<{ixsEsu:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPlatebniKarta: ServiceBase & Catalog.RcnPlatebniKarta;
	}
	const RcnPlatebniKarta: Client["RcnPlatebniKarta"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr platební karty.*/
	const enum GRcnPlatebniKartaFilter {
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Rok.*/
		rok,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Číslo karty.*/
		cislo_plk,
		/**Kód typu karty.*/
		typ_plk,
		/**Kód stavu karty.*/
		stav_plk,
		/**Účet.*/
		ucet,
		/**Banka.*/
		banka,
		/**Datum platnosti.*/
		dat_platnost,
		/**Částka limit atm.*/
		c_limit_atm,
		/**Částka limit hotovosti.*/
		c_limit_cas,
		/**Částka limit agregovaný.*/
		c_limit_agr,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Popis.*/
		popis,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Identifikátor vozidla.*/
		ixp_aus,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPlatebniKartaVyuziti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - využití platební karty.
	* @domain SluzCestyReal
	* @businessObject RcnPlatebniKarta
	*/
	interface RcnPlatebniKartaVyuziti {
		/**Seznam využití platební karty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaVyuzitiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPlatebniKartaVyuziti: ServiceBase & Catalog.RcnPlatebniKartaVyuziti;
	}
	const RcnPlatebniKartaVyuziti: Client["RcnPlatebniKartaVyuziti"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr využití platební karty.*/
	const enum GRcnPlatebniKartaVyuzitiFilter {
		/**Identifikátor karty.*/
		ixp_plk,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPlatebniKartaZadost.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - žádost o vydání platební karty.
	* @domain SluzCestyReal
	* @businessObject RcnPlatebni
	*/
	interface RcnPlatebniKartaZadost {
		/**Detail žádosti o vydání platební karty.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>>;
		/**Seznam žádostí o vydání platební karty.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>>;
		/**Počet žádostí o vydání platební karty.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení žádosti o vydání platební karty.*/
		create(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Oprava žádosti o vydání platební karty.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPlatebniKartaZadostDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPlatebniKartaZadost: ServiceBase & Catalog.RcnPlatebniKartaZadost;
	}
	const RcnPlatebniKartaZadost: Client["RcnPlatebniKartaZadost"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr žádosti o vydání platební karty.*/
	const enum GRcnPlatebniKartaZadostFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Pořadí.*/
		poradi,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Datum žádosti.*/
		dat_zadost,
		/**Idenmtifikátor funkce zadavatele.*/
		ixs_fun_zad,
		/**Datum vyřízení.*/
		dat_vyrizeni,
		/**Kód způsobu vyřízení.*/
		zp_vyriz,
		/**Datum do.*/
		dat_do,
		/**Popis vyřízení.*/
		popis_vyriz,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPodpora.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - podpůrné metody pro RCN a funkce v menu správa aplikace.
	* @domain SluzCestyReal
	* @businessObject RcnPodpora
	*/
	interface RcnPodpora {
		/**Viditelnost dle NS.*/
		vratSeznamNs(rq?:CallParams<{noTrans:boolean}>): _Task<{noTrans:boolean},string>;
		/**Provede přípravu skartace na zvolené knize.*/
		pripravaSkartace(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},void>;
		/**Vrátí seznam nákladových středisek spadajících k dané účtárně.*/
		sezNksDleUus(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPodporaDto>>;
		/**Vrátí příznak, zda je vazba na finanční kontrolu.*/
		jeVazbaNaFik(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Vrátí předchozího vlastníka dokumentu.*/
		vratPredchozihoVlastnika(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Nastaví příznak s_prij ve WFL.*/
		oznacJakoPrecteny(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Duplikování příloh*/
		duplikovaniPriloh(rq?:CallParams<{ixpPuv:string,ixpNew:string}>): _Task<{ixpPuv:string,ixpNew:string},string>;
		/**Povolení akcí na účastnících.*/
		povoleniAkciUcastnici(rq?:CallParams<{stavRcn:number,ixsFunAkt:string}>): _Task<{stavRcn:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na etapách.*/
		povoleniAkciEtapy(rq?:CallParams<{sender:string,stav:number,ixsFunAkt:string}>): _Task<{sender:string,stav:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na seznamu tankování.*/
		povoleniAkciZalozkyEtap(rq?:CallParams<{ixp:string,sender:string}>): _Task<{ixp:string,sender:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na seznamu tankování.*/
		povoleniAkciTankovani(rq?:CallParams<{stavPrik:number}>): _Task<{stavPrik:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na způsobu úhrady.*/
		povoleniAkciZpUhrady(rq?:CallParams<{sender:string,stav:number,ixsFunAkt:string}>): _Task<{sender:string,stav:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na krácení.*/
		povoleniAkciKraceni(rq?:CallParams<{sender:string,stav:number,ixsFunAkt:string}>): _Task<{sender:string,stav:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na seznamu cestovních příkazů.*/
		povoleniAkciCestovniPrikazy(rq?:CallParams<{stav:number,ixsFunAkt:string}>): _Task<{stav:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na finanční profil.*/
		povoleniAkciFinProfil(rq?:CallParams<{stav:number,ixsFunAkt:string}>): _Task<{stav:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na změnovém řízení.*/
		povoleniAkciZmenRiz(rq?:CallParams<{ixpZmr:string}>): _Task<{ixpZmr:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro záložku výbava.*/
		povoleniAkciVybava(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na zálohy.*/
		povoleniAkciZalohy(rq?:CallParams<{stav:number,ixsFunAkt:string,druhRcn:number,typPoz:number}>): _Task<{stav:number,ixsFunAkt:string,druhRcn:number,typPoz:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akce export na přehledu exportů.*/
		povoleniExportu(rq?:CallParams<{ixp:string,zaloha:boolean}>): _Task<{ixp:string,zaloha:boolean},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akce export na přehledu exportů.*/
		povoleniHromadnehoExportu(rq?:CallParams<{ixps:string,zaloha:boolean}>): _Task<{ixps:string,zaloha:boolean},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Nastavení akcí "příprava a storno" na přehledu exportu záloh.*/
		povoleniAkciPrehledExportuZalohy(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na náhrady.*/
		povoleniAkciNahrady(rq?:CallParams<{stav:number,ixsFunAkt:string,druhRcn:number}>): _Task<{stav:number,ixsFunAkt:string,druhRcn:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro financování.*/
		povoleniAkciFinancovani(rq?:CallParams<{stav:number,ixsFunAkt:string,druhRcn:number}>): _Task<{stav:number,ixsFunAkt:string,druhRcn:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro vyúčtování na finanční rekapitulaci.*/
		povoleniAkciFinRekapVyuctovani(rq?:CallParams<{sender:string,stav:number,ixsFunAkt:string,druhRcn:number}>): _Task<{sender:string,stav:number,ixsFunAkt:string,druhRcn:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro souhrn na finanční rekapitulaci.*/
		povoleniAkciFinRekapSouhrn(rq?:CallParams<{sender:string,stav:number,ixsFunAkt:string,druhRcn:number}>): _Task<{sender:string,stav:number,ixsFunAkt:string,druhRcn:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro likvidační záznam na finanční rekapitulaci.*/
		povoleniAkciFinRekapLikZaz(rq?:CallParams<{sender:string,stav:number}>): _Task<{sender:string,stav:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro poznámky na finanční rekapitulaci.*/
		povoleniAkciFinRekapPoznamky(rq?:CallParams<{sender:string,stav:number,typPoz:number}>): _Task<{sender:string,stav:number,typPoz:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí pro seznam souvisejících na záložce vazby.*/
		povoleniAkciVazbySouvisejici(rq?:CallParams<{sender:string,ixsFunAkt:string}>): _Task<{sender:string,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na seznamu cest a navštěv.*/
		povoleniAkciSeznamCN(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Vrátí dto se stavy pro menu na detailu C/N, editaci atd...*/
		menuStavyCN(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnMenuDto>>;
		/**Vrátí dto se stavy pro menu na novou C/N, editaci atd...*/
		menuStavyCNNova(rq?:CallParams<{stav:number,ixsFunAkt:string}>): _Task<{stav:number,ixsFunAkt:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnMenuDto>>;
		/**Povolení akcí na seznamu příkazů.*/
		povoleniAkciSeznamPrikazu(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Vrátí dto se stavy pro menu na detailu příkazu, editaci atd...*/
		menuStavyPrikazy(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnMenuDto>>;
		/**Povolení akcí na platebních kartách.*/
		povoleniAkciPlatebniKarty(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na žádosti o platební kartu.*/
		povoleniAkciZadostiPlatebniKarty(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na pasy.*/
		povoleniAkciPasy(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na víza.*/
		povoleniAkciViza(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na osobě RCN.*/
		povoleniAkciOsoby(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na cestovní pojištění.*/
		povoleniAkciCestPojisteni(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na vozovém parku.*/
		povoleniAkciVozovyPark(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na rezervaci vozidel.*/
		povoleniAkciRezervaceVozidel(rq?:CallParams<{stav:number,ixsFunAkt:string,ixsRsv:string}>): _Task<{stav:number,ixsFunAkt:string,ixsRsv:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na záložce účastníci na rezervaci vozidel.*/
		povoleniAkciRezervaceVozidelUcastnici(rq?:CallParams<{stav:number,ixsFunAkt:string,ixsRcn:string}>): _Task<{stav:number,ixsFunAkt:string,ixsRcn:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Povolení akcí na Main okně - task úloh.*/
		povoleniAkciMainTask(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnTlacitkaDto>>;
		/**Vrátí hodnotu parametru rcn_rad_vazpla - RCN - ŘP - Vazba na plán ADA, PCN...(pokud tento nový parametr nebyl nastaven, řeší předchozí hodnoty původních slučovaných parametrů)*/
		vazbaNaPlan(rq?:CallParams<{}>): _Task<{},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPodpora: ServiceBase & Catalog.RcnPodpora;
	}
	const RcnPodpora: Client["RcnPodpora"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro seznam NS.*/
	const enum GRcnPodporaFilter {
		/**Identifikátor.*/
		ixp,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPoznamka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - poznámka pro cesty a příkazy.
	* @domain SluzCestyReal
	* @businessObject RcnPoznamka
	*/
	interface RcnPoznamka {
		/**Seznam poznámek.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPoznamkaDto>>;
		/**Založení/oprava poznámky.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPoznamkaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPoznamkaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPoznamkaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPoznamkaDto>>;
		/**Odstranění poznámky.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPoznamkaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPoznamkaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPoznamkaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPoznamkaDto>>;
		/**Vrátí celou hodnotu daného typu poznámky pro zadaný pid (pro poznámky resp. další údaje za profilem - textově).*/
		vratPoznamku(rq?:CallParams<{ixp:string,typPoznamky:Gordic.Rcn.Interface.GRcnTypPoznamky}>): _Task<{ixp:string,typPoznamky:Gordic.Rcn.Interface.GRcnTypPoznamky},string>;
		/**Vrátí celou hodnotu daného typu poznámky pro zadaný pid (pro poznámku vyúčtování - řeší se i dané pořadové číslo - kompletní DTO).*/
		vratPoznamkuKomplet(rq?:CallParams<{ixp:string,typPoznamky:Gordic.Rcn.Interface.GRcnTypPoznamky,porCislo:number}>): _Task<{ixp:string,typPoznamky:Gordic.Rcn.Interface.GRcnTypPoznamky,porCislo:number},GServiceReadResponse<Gordic.Rcn.Interface.GRcnPoznamkaDto>>;
		/**Uložení tří typů poznámek najednou.*/
		ulozPoznamkyDalsiUdaje(rq?:CallParams<{ixp:string,podmUskut:string,podmVypoc:string,podmOst:string}>): _Task<{ixp:string,podmUskut:string,podmVypoc:string,podmOst:string},void>;
		/**Uloží novou nebo v případe, že parametr porCislo není null provede opravu poznámky vyúčtování.*/
		ulozPoznamkuVyuctovani(rq?:CallParams<{ixp:string,poznVyuct:string,porCislo:number}>): _Task<{ixp:string,poznVyuct:string,porCislo:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPoznamka: ServiceBase & Catalog.RcnPoznamka;
	}
	const RcnPoznamka: Client["RcnPoznamka"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - poznámky pro cesty a příkazy.*/
	const enum GRcnPoznamkaFilter {
		/**Identifikátor.*/
		ixp,
		/**Kód typu poznámky.*/
		typ_rcndpoz,
		/**Pořadové číslo.*/
		por_cislo,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Subřádek.*/
		sub_radek,
	}
	/**Typ poznámky.*/
	const enum GRcnTypPoznamky {
		/**Další podmínky uskutečnění služební cesty.*/
		dalsiPodminkyUskutecneni=0,
		/**Údaje pro výpočet náhrad.*/
		udajeProVypocetNahrad=1,
		/**Ostatní údaje, poznámky, kontakty (telefon, mail, fax, mobil) - netiskne se na příkaze.*/
		ostatniUdaje=2,
		/**Poznámky vyúčctování.*/
		vyuctovani=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPreceneniFuc.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Přecenění záloh založených jako případ do FUC.
	* @domain SluzCestyReal
	* @businessObject RcnPreceneniFuc
	*/
	interface RcnPreceneniFuc {
		/**Detail Přecenění záloh založených jako případ do FUC.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPreceneniFucDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPreceneniFucDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPreceneniFucDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPreceneniFucDto>>;
		/**Seznam Přecenění záloh založených jako případ do FUC.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPreceneniFucDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPreceneniFuc: ServiceBase & Catalog.RcnPreceneniFuc;
	}
	const RcnPreceneniFuc: Client["RcnPreceneniFuc"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro Přecenění záloh založených jako případ do FUC.*/
	const enum GRcnPreceneniFucFilter {
		/**Rok.*/
		rok,
		/**Identifikátor upr.*/
		ixp_upr,
		/**Ktg Typ.*/
		ktg_typ,
		/**Agendové číslo.*/
		ac,
		/**Popis.*/
		popis,
		/**C celk.*/
		c_celk,
		/**Datum změny.*/
		dat_zmena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrehledRozpoctu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - přehled rozpočtu.
	* @domain SluzCestyReal
	* @businessObject RcnPrehledRozpoctu
	*/
	interface RcnPrehledRozpoctu {
		/**Detail položky přehledu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrehledRozpoctuDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrehledRozpoctuDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrehledRozpoctuDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrehledRozpoctuDto>>;
		/**Seznam položek přehledu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrehledRozpoctuDto>>;
		/**Seznam položek pro rozpis plánu.*/
		listRozpisPlanu(rq?:CallParams<{ueaRr:string,uebRr:string,cisloAkce:string,te1:string,ixsRcn:string,omezitVyber:boolean}>): _Task<{ueaRr:string,uebRr:string,cisloAkce:string,te1:string,ixsRcn:string,omezitVyber:boolean},GServiceListResponse<Gordic.Rcn.Interface.GRcnPrehledRozpoctuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrehledRozpoctu: ServiceBase & Catalog.RcnPrehledRozpoctu;
	}
	const RcnPrehledRozpoctu: Client["RcnPrehledRozpoctu"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - přehled rozpočtu.*/
	const enum GRcnPrehledRozpoctuFilter {
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Nákladové středisko.*/
		nks,
		/**Rok.*/
		rok,
		/**Xuete.*/
		xuete,
		/**Druh dokladu.*/
		drd,
		/**Měsíc.*/
		mesic,
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
		/**Kc0.*/
		kc0,
		/**Kc1.*/
		kc1,
		/**Sm0.*/
		sm0,
		/**Sm1.*/
		sm1,
		/**Km0.*/
		km0,
		/**Km1.*/
		km1,
		/**Mj.*/
		mj,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**C0_23.*/
		c0_23,
		/**C1_23.*/
		c1_23,
		/**C0_13.*/
		c0_13,
		/**C1_13.*/
		c1_13,
		/**C0_14.*/
		c0_14,
		/**C1_14.*/
		c1_14,
		/**C0_24.*/
		c0_24,
		/**C1_24.*/
		c1_24,
		/**C0_25.*/
		c0_25,
		/**C1_25.*/
		c1_25,
		/**C0_26.*/
		c0_26,
		/**C1_26.*/
		c1_26,
		/**C0_30.*/
		c0_30,
		/**C1_30.*/
		c1_30,
		/**C0_31.*/
		c0_31,
		/**C1_31.*/
		c1_31,
		/**C0_0.*/
		c0_0,
		/**C1_0.*/
		c1_0,
		/**C0_2.*/
		c0_2,
		/**C1_2.*/
		c1_2,
		/**C0_3.*/
		c0_3,
		/**C1_3.*/
		c1_3,
		/**C0_6.*/
		c0_6,
		/**C1_6.*/
		c1_6,
		/**C0_7.*/
		c0_7,
		/**C1_7.*/
		c1_7,
		/**C0_8.*/
		c0_8,
		/**C1_8.*/
		c1_8,
		/**C0_10.*/
		c0_10,
		/**C1_10.*/
		c1_10,
		/**C0_11.*/
		c0_11,
		/**C1_11.*/
		c1_11,
		/**C0_12.*/
		c0_12,
		/**C1_12.*/
		c1_12,
		/**C0_15.*/
		c0_15,
		/**C1_15.*/
		c1_15,
		/**C0_16.*/
		c0_16,
		/**C1_16.*/
		c1_16,
		/**C0_17.*/
		c0_17,
		/**C1_17.*/
		c1_17,
		/**C0_18.*/
		c0_18,
		/**C1_18.*/
		c1_18,
		/**C0_22.*/
		c0_22,
		/**C1_22.*/
		c1_22,
		/**Ca_0.*/
		ca_0,
		/**Cb_0.*/
		cb_0,
		/**Ca_6.*/
		ca_6,
		/**Cb_6.*/
		cb_6,
		/**Ca_18.*/
		ca_18,
		/**Cb_18.*/
		cb_18,
		/**Příznak char.*/
		priz_char,
		/**Druh char.*/
		druh_char,
		/**C0_21.*/
		c0_21,
		/**C1_21.*/
		c1_21,
		/**C0_34.*/
		c0_34,
		/**C1_34.*/
		c1_34,
		/**C0_54.*/
		c0_54,
		/**C1_54.*/
		c1_54,
		/**C0_66.*/
		c0_66,
		/**C1_66.*/
		c1_66,
		/**C0_62.*/
		c0_62,
		/**C1_62.*/
		c1_62,
		/**C0_63.*/
		c0_63,
		/**C1_63.*/
		c1_63,
		/**C0_67.*/
		c0_67,
		/**C1_67.*/
		c1_67,
		/**C0_68.*/
		c0_68,
		/**C1_68.*/
		c1_68,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikaz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - příkaz k cestě a zabezpečení návštěv.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikaz {
		/**Detail příkazu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Seznam příkazů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Počet příkazů.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení příkazu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Oprava příkazu včetně dokumentu.*/
		updateWithSsl(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,rd:GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>}>): _Task<{rq:GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,rd:GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Oprava příkazu.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Oprava resp. založení příkazu.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPrikazDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Odstranění příkazu.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Provede validaci příkazů pro hromadný schvalovací proces resp. FK.*/
		validovatDoklady(rq?:CallParams<{dataDok:Gordic.Rcn.Interface.GRcnPrikazDto[],validovatFK:boolean}>): _Task<{dataDok:Gordic.Rcn.Interface.GRcnPrikazDto[],validovatFK:boolean},Gordic.Rcn.Interface.GRcnPrikazDto[]>;
		/**Zruší storno - vrátí do stavu navrhnuto.*/
		zrusitStorno(rq?:CallParams<{ixp:string,duvod:string}>): _Task<{ixp:string,duvod:string},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Ruční zlikvidování příkazu.*/
		zlikvidovatRucne(rq?:CallParams<{ixp:string,duvod:string}>): _Task<{ixp:string,duvod:string},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Předání příkazu jiné funkci.*/
		predaniPrikazuFunkci(rq?:CallParams<{ixp:string,ixsFunNov:string,zpracovatel:number,vlastnik:number}>): _Task<{ixp:string,ixsFunNov:string,zpracovatel:number,vlastnik:number},void>;
		/**Hromadné zlikvidování příkazů.*/
		hromadneZlikvidovani(rq?:CallParams<{pidy:string,duvod:string}>): _Task<{pidy:string,duvod:string},Gordic.General.ApplicationInterface.GGroupResult>;
		/**Schválení příkazu.*/
		schvaleniCestPrik(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Odschválení příkazu.*/
		odSchvaleniCestPrik(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Připraví příkaz pro vyúčtování.*/
		nastavVyuctovaniCp(rq?:CallParams<{ixp:string,smazatZalohy:boolean}>): _Task<{ixp:string,smazatZalohy:boolean},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Vrácení příkazu zpět z vyúčtování.*/
		zrusVyuctovaniCp(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazDto>>;
		/**Uložení tří typů poznámek na příkazu.*/
		ulozPoznamky(rq?:CallParams<{ixp:string,podmUskut:string,podmVypoc:string,podmOst:string}>): _Task<{ixp:string,podmUskut:string,podmVypoc:string,podmOst:string},void>;
		/**Uložení poznámky.*/
		nactiPoznamky(rq?:CallParams<{ixp:string,typPoznam:number}>): _Task<{ixp:string,typPoznam:number},string>;
		/**Provede kontrolu, zda byla provedena příprava exportu vyúčtování.*/
		kontrolaPredExpVyuct(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},boolean>;
		/**Kontrola na LEF - zda je pouze LEF pro dané ixp.*/
		kontrolaLef(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},boolean>;
		/**Uložení poznámky vyúčtování.*/
		ulozPoznamkuVyuct(rq?:CallParams<{ixp:string,poznVyuct:string}>): _Task<{ixp:string,poznVyuct:string},void>;
		/**Uloží novou nebo v případě, že parametr porCislo není null provede opravu poznámky vyúčtování.*/
		ulozPoznamkuVyuctovani(rq?:CallParams<{ixp:string,poznVyuct:string,porCislo:number}>): _Task<{ixp:string,poznVyuct:string,porCislo:number},void>;
		/**Přepni stav Cp po tisku.*/
		prepniStavTisteno(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Vystavení opravného dokladu*/
		opravnyDoklad(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Zruší opravný doklad a opravovaný nastaví na řádný.*/
		zrusitOpravnyDoklad(rq?:CallParams<{ixps:string}>): _Task<{ixps:string},void>;
		/**Kopírování dat mezi příkazy (Etapy, zálohy...).*/
		kopirovaniDatMeziPrikazy(rq?:CallParams<{ixpZdroj:string,ixpCil:string,pouzeKontrola:boolean}>): _Task<{ixpZdroj:string,ixpCil:string,pouzeKontrola:boolean},string>;
		/**Pro identifikátor příkazu dohledám ESU na navázané osobě*/
		vratEsuOsoby(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Nastaví příznak priz_view - doklad zobrazen/přečten.*/
		oznacJakoPrecteny(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Hromadné přiřazení pokladní knihy a pokladníka do souhrnu/sumáře finanční rekapitulace po výpočtu vyúčtování.*/
		hromadnePrirazeniPok(rq?:CallParams<{ixpArr:string[],mena:number,ixpDenPok:string,ixsFunPok:string}>): _Task<{ixpArr:string[],mena:number,ixpDenPok:string,ixsFunPok:string},Gordic.General.ApplicationInterface.GGroupResult>;
		/**Hromadné schválení finanční rekapitulace.*/
		hromadneSchvaleniFinRekap(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},Gordic.General.ApplicationInterface.GGroupResult>;
		/**Hromadná úprava profilu.*/
		hromadnaUpravaProfilu(rq?:CallParams<{ixpArr:string[],datVypZal:JsonDate,kopirovatHranice:boolean}>): _Task<{ixpArr:string[],datVypZal:JsonDate,kopirovatHranice:boolean},Gordic.General.ApplicationInterface.GGroupResult>;
		/**Hromadná kontrola přípravy PDM pro export pod jednu soupisku.*/
		hromadnaKontrolaPripravyPdm(rq?:CallParams<{ixpArr:string[]}>): _Task<{ixpArr:string[]},Gordic.General.ApplicationInterface.GGroupResult>;
		/**V závislosti na hodnotě parametru pouzeKontorla provede kontrolu nebo i změnu stavu na "Schváleno, vytištěno ZAL".*/
		potvrzeniTiskuSP(rq?:CallParams<{ixp:string,pouzeKontrola:boolean}>): _Task<{ixp:string,pouzeKontrola:boolean},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikaz: ServiceBase & Catalog.RcnPrikaz;
	}
	const RcnPrikaz: Client["RcnPrikaz"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro příkazy k cestě a zabezpečení návštěv.*/
	const enum GRcnPrikazFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Rok.*/
		rok,
		/**Třídění.*/
		uex_akt,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Kód stavu příkazu.*/
		stav_prik,
		/**Název.*/
		nazev,
		/**Rozkaz.*/
		rozkaz,
		/**Kód státu.*/
		stat,
		/**Místo nástupu.*/
		misto_n,
		/**Datum nástupu.*/
		dat_n,
		/**Místo ukončení.*/
		misto_u,
		/**Datum ukončení.*/
		dat_u,
		/**Místo hranice 1.*/
		misto_hra1,
		/**Datum hranice 1.*/
		dat_hra1,
		/**Místo hranice 2.*/
		misto_hra2,
		/**Datum hranice 2.*/
		dat_hra2,
		/**Podmmínky uskutečnění.*/
		podm_uskut,
		/**Podmínky výpočtu.*/
		podm_vypoc,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Identifikátor fuknce zadavatele.*/
		ixs_fun_zad,
		/**Identifikátor fuknkce vlastníka.*/
		ixs_fun_akt,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód typu cestujícího.*/
		typ_dos,
		/**Kategorie akce.*/
		ktg_rcn,
		/**Kód úrovně návštěvy.*/
		urn,
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad,
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Datum schválení záloh.*/
		dat_schv_zal,
		/**Datum schválení vyúčtování.*/
		dat_schv_vyu,
		/**Druh příkazu.*/
		druh_rcn,
		/**Kód typu vyúčtování.*/
		typ_vyu,
		/**Identifikátor prev.*/
		ixp_prev,
		/**Typ algoritmu vyúčtování.*/
		typ_alg_vyu,
		/**Identifikátor členění.*/
		ixs_cle,
		/**Kód typu požadavku.*/
		typ_poz,
		/**Identifikátor typu účastníka.*/
		ixs_tos,
		/**Zkratka dopravního prostředku.*/
		zkr_dopr,
		/**Identifikátor uza.*/
		ixp_uza,
		/**Výkon.*/
		vkn,
		/**Identifikátor plánu.*/
		ixp_pcn,
		/**Název osoby.*/
		osr,
		/**Místo.*/
		misto,
		/**Účel.*/
		ucel,
		/**Nákladové středisko financující.*/
		nks_fin,
		/**Nákladové středisko sdružující.*/
		nks_sdr,
		/**Nákladové středisko realizující.*/
		nks_real,
		/**Identifikátor funkce realizátora.*/
		ixs_fun_real,
		/**Org.*/
		org,
		/**Agendové číslo smlouvy.*/
		ac_sml,
		/**Identifikátor organizační jednotky pro hledání dle osoby.*/
		ixs_orj,
		/**Viditelnost NS, je-li prázdné, dohledá se na serveru dle administrace.*/
		omezeniNs,
		/**Ue.*/
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
		/**Náhrady.*/
		nahrady,
		/**Stav vyřízení FK.*/
		stav_vyriz,
		/**Bez finanční kontroly.*/
		bez_fin_kon,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazDoprProstr.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - dopravní prostředky na příkaze.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazDoprProstr {
		/**Seznam dopravních prostředků.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazDoprProstrDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazDoprProstr: ServiceBase & Catalog.RcnPrikazDoprProstr;
	}
	const RcnPrikazDoprProstr: Client["RcnPrikazDoprProstr"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - dopravní prostředky na příkaze.*/
	const enum GRcnPrikazDoprProstrFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Řádek položky.*/
		radek_pep,
		/**Číslo etapy.*/
		cislo_eta,
		/**Z místa.*/
		z_mista,
		/**Do místa.*/
		do_mista,
		/**Kód způsobu dopravy.*/
		zp_dopr,
		/**Stát.*/
		stat,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Navýšení.*/
		dvn,
		/**Částka strava krácení.*/
		c_strava_kr,
		/**Procent krácen ístravného.*/
		proc_strava_kr,
		/**Částka strava.*/
		c_strava,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Den od.*/
		den_od,
		/**Stav etapy.*/
		stav_eta,
		/**Částka kapesné krácení.*/
		c_kapes_kr,
		/**Procento krácení kapesného.*/
		proc_kapes_kr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazEtapa.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - etapa cestovního příkazu.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazEtapa {
		/**Detail etapy.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Seznam etap.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Založení etapy.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Oprava etapy.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Oprava resp. založení etapy.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Odstranění etapy.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Kopie etap mezi příkazy ve vyúčtování.*/
		kopirovatEtapy(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaDto>>;
		/**Zkontroluje časovou návaznost etap.*/
		kontrolaNavaznostiEtap(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Schválení etap.*/
		schvalitEtapy(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazEtapa: ServiceBase & Catalog.RcnPrikazEtapa;
	}
	const RcnPrikazEtapa: Client["RcnPrikazEtapa"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr etap cestovního příkazu.*/
	const enum GRcnPrikazEtapaFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Řádek etapy.*/
		radek_pep,
		/**Z místa.*/
		z_mista,
		/**Do místa.*/
		do_mista,
		/**Stát.*/
		stat,
		/**Datum od.*/
		dat_od,
		/**Datum do.*/
		dat_do,
		/**Kód nyvýšení.*/
		dvn,
		/**Částka krácení stravného.*/
		c_strava_kr,
		/**Procento krácení stravného.*/
		proc_strava_kr,
		/**Částka stravného.*/
		c_strava,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Číslo etapy.*/
		cislo_eta,
		/**Den od.*/
		den_od,
		/**Kód stavu etapy.*/
		stav_eta,
		/**Částka krácení kapesné.*/
		c_kapes_kr,
		/**Procento krácení kapesné.*/
		proc_kapes_kr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazEtapaKraceniStravneho.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - krácení stravného na etapách příkazu.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazEtapaKraceniStravneho {
		/**Detail krácení stravného.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>;
		/**Seznam krácení stravného.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>;
		/**Založení krácení stravného.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>;
		/**Oprava krácení stravného.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>;
		/**Oprava resp. založení krácení stravného.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>;
		/**Odstranění krácení stravného.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaKraceniStravnehoDto>>;
		/**Hromadné odstranění krácení stravného na etapě příkazu.*/
		hromadnyDelete(rq?:CallParams<{ixp:string,radky:string}>): _Task<{ixp:string,radky:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazEtapaKraceniStravneho: ServiceBase & Catalog.RcnPrikazEtapaKraceniStravneho;
	}
	const RcnPrikazEtapaKraceniStravneho: Client["RcnPrikazEtapaKraceniStravneho"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr krácení stravného na etapách příkazu.*/
	const enum GRcnPrikazEtapaKraceniStravnehoFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Řádek.*/
		radek,
		/**Datum.*/
		datum,
		/**Procto strava.*/
		proc_strava,
		/**Procento kapesné.*/
		proc_kapes,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Procento tuzemské stravné.*/
		proc_tuzem,
		/**Příznak ubytování.*/
		priz_ubyt,
		/**Tuzemské stravné řetezec automaticky skládaný dle zatržítek ts_snidane, ts_obed, ts_vecere.*/
		strava_tuz,
		/**Tuzemské stravné řetezec automaticky skládaný dle zatržítek zs_snidane, zs_obed, zs_vecere.*/
		strava_zah,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazEtapaLimit.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - závazné limity pro etapu příkazu.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazEtapaLimit {
		/**Detail závazného limitu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>;
		/**Seznam závazných limitů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>;
		/**Založení závazného limitu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>;
		/**Odstranění závazného limitu.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaLimitDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazEtapaLimit: ServiceBase & Catalog.RcnPrikazEtapaLimit;
	}
	const RcnPrikazEtapaLimit: Client["RcnPrikazEtapaLimit"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr závazných limitů pro etapu příkazu.*/
	const enum GRcnPrikazEtapaLimitFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Vzdálenost celkem.*/
		km_celkem,
		/**Pohonné hmoty celkem.*/
		phm_celkem,
		/**Vzdálenost v cizině.*/
		km_valuta,
		/**Pohonné hmoty v cizině.*/
		phm_valuta,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazEtapaVydaj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - výdaje pro konkrétní průběh cesty (na etapě příkazu).
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazEtapaVydaj {
		/**Detail výdaje na etapě příkazu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
		/**Seznam výdajů na etapě příkazu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
		/**Založení výdaje na etapě příkazu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
		/**Oprava výdaje na etapě příkazu.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
		/**Oprava resp. založení výdaje na etapě příkazu.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
		/**Odstranění výdaje na etapě příkazu.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
		/**Kopie výdajů z předchozí etapy.*/
		kopieVydaje(rq?:Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazEtapaVydajDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazEtapaVydaj: ServiceBase & Catalog.RcnPrikazEtapaVydaj;
	}
	const RcnPrikazEtapaVydaj: Client["RcnPrikazEtapaVydaj"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - výdaje na etapě příkazu.*/
	const enum GRcnPrikazEtapaVydajFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Řádek etapy.*/
		radek_pep,
		/**Pořadí.*/
		poradi,
		/**Kód způsobu dopravy.*/
		zp_dopr,
		/**Příznak zálohy.*/
		priz_zaloha,
		/**Vzdálenost.*/
		km,
		/**Průměrná spotřeba.*/
		prum_spotr,
		/**Částka pohonných hmot.*/
		c_phm,
		/**Tankováno.*/
		tankovano,
		/**Typ prostředku.*/
		typ_prostr,
		/**Spz.*/
		spz,
		/**Číslo tp.*/
		cislo_tp,
		/**Havarijní pojištění.*/
		hav_poj,
		/**Objem motoru.*/
		objem_val,
		/**Přízna přívěs.*/
		priz_prives,
		/**Příznak jízdenka.*/
		priz_jizdenka,
		/**Objednávka.*/
		objednavka,
		/**Faktura vlastní.*/
		faktura_vl,
		/**Faktura dodavatelská.*/
		faktura_dod,
		/**Spoj.*/
		spoj,
		/**Dodavatel.*/
		dodavatel,
		/**Částka v měně.*/
		c_mena,
		/**Kód měny.*/
		mena,
		/**Doklady.*/
		doklady,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor typu náhrad.*/
		ixs_tna,
		/**Kód typu pohonné hmoty.*/
		phm,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Zahraniční krácení.*/
		kr_zahr,
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Počet osob (např: 2+1).*/
		poc_oso,
		/**Specielní filtr pro dopravu ((zp_dopr != 0) OR (zp_dopr = 0 AND zp_uhr = 0)).*/
		filtrProDopravu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazLikvidacniZaznam.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - likvidační záznam na příkaze.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazLikvidacniZaznam {
		/**Detail likvidačního záznamu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>>;
		/**Seznam likvidačních záznamů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>>;
		/**Vrátí sumu za RPP z likvidačního záznamu.*/
		sumaLzDleRpp(rq?:Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>,JsonDecimal>;
		/**Rozdělení výdajů LZ na jiné konto.*/
		rozdeleniLz(rq?:Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazLikvidacniZaznamDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazLikvidacniZaznam: ServiceBase & Catalog.RcnPrikazLikvidacniZaznam;
	}
	const RcnPrikazLikvidacniZaznam: Client["RcnPrikazLikvidacniZaznam"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - likvidační záznam na příkaze.*/
	const enum GRcnPrikazLikvidacniZaznamFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Kód typu likvidačního záznamu.*/
		typ_liz,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Kód měny.*/
		mena,
		/**Částka.*/
		castka,
		/**Částka v CZK.*/
		castka_czk,
		/**Kurz.*/
		kurz,
		/**Rok.*/
		rok,
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
		/**Sériové číslo.*/
		ser_cislo,
		/**Příznak kurzu.*/
		priz_kurz,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Kód měny zálohy.*/
		mena_zal,
		/**Identifikátor sady náhrad.*/
		ixs_sna,
		/**Identifikátor cesty - pro pohled přes všechny příkazy cesty.*/
		ixs_rcn,
		/**Včetně kurzových rozdílů.*/
		vcetneKurzovychRozdilu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazVybavenost.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - vybavenost na příkaze.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazVybavenost {
		/**Seznam vybavenosti na příkaze.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazVybavenostDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazVybavenost: ServiceBase & Catalog.RcnPrikazVybavenost;
	}
	const RcnPrikazVybavenost: Client["RcnPrikazVybavenost"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - vybavenost na příkaze.*/
	const enum GRcnPrikazVybavenostFilter {
		/**Nadpis.*/
		nadpis,
		/**Identifikátor příkazu.*/
		ixp,
		/**Popis.*/
		popis,
		/**Evidenční číslo.*/
		evi_cis,
		/**Typ.*/
		typ,
		/**Druh.*/
		druh,
		/**Datum platnosti.*/
		dat_platnost,
		/**Účet.*/
		ucet,
		/**Banka.*/
		banka,
		/**Částka limit atm.*/
		c_limit_atm,
		/**Částka limit hotovosti.*/
		c_limit_cas,
		/**Částka limit agregovaný.*/
		c_limit_agr,
		/**Datum vydání osobě.*/
		dat_vyd_oso,
		/**Datum evidence od.*/
		dat_evi_od,
		/**Datum evidence do.*/
		dat_evi_do,
		/**Poznámka.*/
		poznamka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazVydaj.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - výdaj na příkaze.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazVydaj {
		/**Detail výdaje.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazVydajDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazVydajDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>;
		/**Seznam výdajů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>;
		/**Počet výdajů.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Seznam skupiny výdajů.*/
		listGroup(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>;
		/**Oprava výdaje.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVydajDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>;
		/**Oprava rozpočtových položek výdaje.*/
		updateRpp(rq?:Gordic.Rcn.Interface.GRcnPrikazVydajDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVydajDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVydajDto>,number>;
		/**Přepočet po úpravě náhrad.*/
		prepocetPoUpraveNahrad(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Výpočet vyúčtování cesty.*/
		vypocetVyuctovaniCesty(rq?:CallParams<{ixp:string,ixpDen:string,bezRealizace:number}>): _Task<{ixp:string,ixpDen:string,bezRealizace:number},number>;
		/**Výpočet vyúčtování návštěvy.*/
		vypocetVyuctovaniNavstevy(rq?:CallParams<{ixp:string,ixpDen:string,bezRealizace:number}>): _Task<{ixp:string,ixpDen:string,bezRealizace:number},number>;
		/**Vrátí kurz pro směnu.*/
		vratKurzProSmenu(rq?:CallParams<{ixp:string,menaPuv:number,menaNova:number,datum:JsonDate}>): _Task<{ixp:string,menaPuv:number,menaNova:number,datum:JsonDate},JsonDecimal>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazVydaj: ServiceBase & Catalog.RcnPrikazVydaj;
	}
	const RcnPrikazVydaj: Client["RcnPrikazVydaj"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr - výdaj na příkaze.*/
	const enum GRcnPrikazVydajFilter {
		/**Identifikátor příkazu.*/
		ixp,
		/**Řádek výdaje.*/
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
		/**Příznak generovaného záznamu.*/
		priz_gen,
		/**Příznak započítávat do výdajů.*/
		priz_zapoc,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Číslo etapy.*/
		cislo_eta,
		/**Datum etapy.*/
		datum_eta,
		/**Příznak nah.*/
		priz_nah,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Rok.*/
		rok,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Identifikátor cesty.*/
		ixs_rcn,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazVyuctovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - vyúčtování.
	* @domain SluzCestyReal
	* @businessObject RcnPrikazVyuctovani
	*/
	interface RcnPrikazVyuctovani {
		/**Detail vyúčtování.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>>;
		/**Seznam vyúčtování.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>>;
		/**Oprava vyúčtování.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniDto>>;
		/**Výpočet vyúčtování.*/
		vypocetVyuctovani(rq?:CallParams<{ixp:string,typZaznamu:string,bezRealizace:number}>): _Task<{ixp:string,typZaznamu:string,bezRealizace:number},number>;
		/**Schválení finanční rekapitulace.*/
		schvalit(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Příprava exportu.*/
		pripravaExportu(rq?:CallParams<{ixp:string,datSplat:JsonDate,ixpDen:string,ixsPPV:string}>): _Task<{ixp:string,datSplat:JsonDate,ixpDen:string,ixsPPV:string},void>;
		/**Hromadná příprava exportu.*/
		hromPripravaExportu(rq?:CallParams<{ixps:string,datSplat:JsonDate,ixpDen:string,ixsPPV:string}>): _Task<{ixps:string,datSplat:JsonDate,ixpDen:string,ixsPPV:string},void>;
		/**Spuštění exportu.*/
		spusteniExportu(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Hromadné spuštění exportu.*/
		hromSpusteniExportu(rq?:CallParams<{ixps:string}>): _Task<{ixps:string},void>;
		/**Vrátí kurz pro křížový přepočet měn.*/
		vratKurzProVyuctovani(rq?:CallParams<{ixp:string,menaPuv:number,menaNova:number}>): _Task<{ixp:string,menaPuv:number,menaNova:number},JsonDecimal>;
		/**Hromadná příprava exportu pro PDM z wizardu, již musela být jedna příprava udělána, přeberu z ni ixsPPV.*/
		hromPripravaExportuPdm(rq?:CallParams<{ixps:string[]}>): _Task<{ixps:string[]},Gordic.General.ApplicationInterface.GGroupResult>;
		/**Hromadné spuštění exportu do PDM pod jednu soupisku.*/
		hromSpusteniExportuPdm(rq?:CallParams<{ixpArr:string[],rok:number,mesic:number}>): _Task<{ixpArr:string[],rok:number,mesic:number},Gordic.General.ApplicationInterface.GGroupResult>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazVyuctovani: ServiceBase & Catalog.RcnPrikazVyuctovani;
	}
	const RcnPrikazVyuctovani: Client["RcnPrikazVyuctovani"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro vyúčtování.*/
	const enum GRcnPrikazVyuctovaniFilter {
		/**Identifikátor.*/
		ixp,
		/**Řádek.*/
		radek,
		/**Kód stavu vyúčtování cestujícího.*/
		stav_vyc,
		/**Identifikátor zálohy.*/
		ixp_zal,
		/**Identifikátor pokladního dokladu.*/
		ixp_pok,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok,
		/**Identifikátor pokladní kontace.*/
		ixs_kon_pok,
		/**Částka nárok.*/
		c_zal_narok,
		/**Kód měna nároku.*/
		mena_zal_narok,
		/**Částka dohody.*/
		c_zal_dohoda,
		/**Kód měny dohody.*/
		mena_zal_dohoda,
		/**Částka v CZK.*/
		c_zal_czk,
		/**Popis zálohy.*/
		popis_zal,
		/**Částka vypočtená v měně.*/
		c_vypoc_mena,
		/**Měna vypočtené částky.*/
		mena_vypoc,
		/**Částka vypočtená v CZK.*/
		c_vypoc_czk,
		/**Rok.*/
		rok,
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
		/**Částka doúčtování v měně.*/
		c_douct_mena,
		/**Částka čerpání v měně.*/
		c_cerppk_mena,
		/**Částka vyúčtování v měně.*/
		c_vyuct_mena,
		/**Identifikátor typu náhrad.*/
		ixs_tna,
		/**Částka.*/
		c,
		/**Kód měny.*/
		mena,
		/**Kurz.*/
		kurz,
		/**Poznámka.*/
		poznamka,
		/**Částka v měně.*/
		c_mena,
		/**Částka vypočteno upraveno v měně.*/
		c_vypup_mena,
		/**Kód měny vypočteno upraveno.*/
		mena_vypup,
		/**Částka vypočteno upraveno v CZK.*/
		c_vypup_czk,
		/**Kurz vypočteno upraveno.*/
		kurz_vypup,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Kód typu zálohy.*/
		typ_zal,
		/**Příznak směny.*/
		priz_smena,
		/**Příznak RPP.*/
		priz_rpp,
		/**Částka vlastní.*/
		c_vlastni,
		/**Sender - cesta(SC), příkaz (CP).*/
		sender,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazVyuctovaniSumar.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - sumář vyúčtování cestujícího.
	* @domain SluzCestyReal
	* @businessObject RcnPrikazVyuctovaniSumar
	*/
	interface RcnPrikazVyuctovaniSumar {
		/**Detail sumáře vyúčtování cestujícího.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>>;
		/**Seznam sumářů vyúčtování cestujícího.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>>;
		/**Oprava sumáře vyúčtování cestujícího.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazVyuctovaniSumarDto>>;
		/**Přepočet sumáře po směně.*/
		prepocitatSumarPoSmene(rq?:CallParams<{ixp:string,ixpDen:string}>): _Task<{ixp:string,ixpDen:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazVyuctovaniSumar: ServiceBase & Catalog.RcnPrikazVyuctovaniSumar;
	}
	const RcnPrikazVyuctovaniSumar: Client["RcnPrikazVyuctovaniSumar"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro sumář vyúčtování cestujícího.*/
	const enum GRcnPrikazVyuctovaniSumarFilter {
		/**Identifikátor.*/
		ixp,
		/**Řádek.*/
		radek,
		/**Částka.*/
		c,
		/**Kód měny.*/
		mena,
		/**Identifikátor pokladního dokladu.*/
		ixp_pok,
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok,
		/**Rok.*/
		rok,
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
		/**Příznak pk.*/
		priz_pk,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Identifikátor funkce POK.*/
		ixs_fun_pok,
		/**Příznak typu dokumentu.*/
		priz_typ_dok,
		/**Řádek pokladní položky.*/
		radek_pok,
		/**Příznak zálohy.*/
		priz_zaloha,
		/**Částka upraveno.*/
		c_upr,
		/**Kód měny upraveno.*/
		mena_upr,
		/**Kurz upraveno.*/
		kurz_upr,
		/**Příznak upraveno.*/
		priz_upr,
		/**Datum kurzu.*/
		dat_kurz,
		/**Částka upraveno zaokrouhleno.*/
		c_upr_zao,
		/**Úroveň sum.*/
		uroven_sum,
		/**Částka lokální evidence financování.*/
		c_lef,
		/**Kód způsobu úpravy.*/
		zp_uhr,
		/**Sender - cesta(SC), příkaz (CP).*/
		sender,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazZaloha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - záloha na příkaze.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazZaloha {
		/**Detail zálohy.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Seznam záloh.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Seznam navázaných pokladních dokladů.*/
		listPokNavazane(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPokDokladDto>>;
		/**Seznam pokladních dokladů pro navázání.*/
		listPokProNavazani(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPokDokladDto>>;
		/**Oprava zálohy.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Odstranění zálohy.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Provede hromadnou opravu položek záloh dle vybrané.*/
		hromadnaZmena(rq?:CallParams<{ixpZal:string,ixpZalVseOst:string}>): _Task<{ixpZal:string,ixpZalVseOst:string},void>;
		/**Schválení záloh.*/
		schvaleni(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Výběr z platební karty.*/
		novyVyberZKarty(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Oprava výběru z platební karty.*/
		opravaVyberuZKarty(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Oprava ROZ věty.*/
		updateRoz(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Výpočet záloh pro cestu.*/
		vypocetZaloh(rq?:CallParams<{ixp:string,typPoz:number,ixpDen:string}>): _Task<{ixp:string,typPoz:number,ixpDen:string},number>;
		/**Vrátí identifikátor osoby (IXS_OSR) pro daný příkaz.*/
		vratReferentaDleCp(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Vrátí příkaz pro daného referenta a cestu.*/
		vratCpDleReferenta(rq?:CallParams<{ixsRef:string,ixsRcn:string}>): _Task<{ixsRef:string,ixsRcn:string},string>;
		/**Vrátí cestu, do které spadá daný příkaz.*/
		vratScDleCp(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Naváže na zálohu pokladní položku.*/
		navazZalohuNaPok(rq?:CallParams<{ixpZal:string,ixpPok:string,radekPok:number}>): _Task<{ixpZal:string,ixpPok:string,radekPok:number},void>;
		/**Přepočet částky zálohy mezi měnami.*/
		prepocitejCastky(rq?:CallParams<{castka:JsonDecimal,puvodniMena:number,novaMena:number,ixpDen:string}>): _Task<{castka:JsonDecimal,puvodniMena:number,novaMena:number,ixpDen:string},JsonDecimal>;
		/**Zjištění položek rozpočtové věty dle identifikátoru typu náhrad.*/
		vratRpolDleTna(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaDto>>;
		/**Přecenění nevyúčtovaných záloh.*/
		preceneniZaloh(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**Vrátí celkovou částku záloh za zvolenou měnu - pro kontrolu překročení směny.*/
		celkemZalohZaMenu(rq?:CallParams<{ixp:string,mena:number}>): _Task<{ixp:string,mena:number},JsonDecimal>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazZaloha: ServiceBase & Catalog.RcnPrikazZaloha;
	}
	const RcnPrikazZaloha: Client["RcnPrikazZaloha"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr záloh na příkaze.*/
	const enum GRcnPrikazZalohaFilter {
		/**Identifikátor zálohy.*/
		ixp_zal,
		/**Identifikátor příkazu.*/
		ixp,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Identifikátor pok.*/
		ixp_pok,
		/**Částka nárok.*/
		c_narok,
		/**Částka dohoda.*/
		c_dohoda,
		/**Částka.*/
		c,
		/**Poznámka.*/
		poznamka,
		/**Popis.*/
		popis,
		/**Příznak generovaného záznamu.*/
		priz_gen,
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
		/**Kód měny nároku.*/
		mena_narok,
		/**Kód měny dohody.*/
		mena_dohoda,
		/**Kód stavu zálohy.*/
		priz_zal,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Příznak pred.*/
		priz_pred,
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok,
		/**Identifikátor pokladní kontace.*/
		ixs_kon_pok,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Identifikátor vlastníka v POK.*/
		ixs_fun_pok,
		/**Řádek POK.*/
		radek_pok,
		/**Kód typu zálohy.*/
		typ_zal,
		/**Rok.*/
		rok,
		/**Částka vyúčtování.*/
		c_vyuct,
	}
	/**Filtr pro pokladní doklady.*/
	const enum GRcnPokDokladFilter {
		/**Identifikátor pokladního dokladu.*/
		ixp,
		/**Agendové číslo.*/
		ac,
		/**Měna.*/
		mena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazZalohaExport.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - export záloh na příkaze.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazZalohaExport {
		/**Seznam hlaviček pokladních dokladů vystavených z RCN.*/
		listHlaPok(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Seznam položek pokladních dokladů vystavených z RCN.*/
		listPolPok(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Seznam hlaviček účetních případů FUC vystavené z RCN.*/
		listHlaFuc(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Seznam položek účetních případů FUC vystavené z RCN.*/
		listPolFuc(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Seznam předpisů BUC vystavených z RCN.*/
		listHlaBuc(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Seznam PDM hlaviček.*/
		listHlaPdm(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Seznam PDM položek.*/
		listPolPdm(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaExportDto>>;
		/**Příprava exportu.*/
		pripravaExportu(rq?:CallParams<{ixp:string,datSplat:JsonDate,ixpDen:string}>): _Task<{ixp:string,datSplat:JsonDate,ixpDen:string},void>;
		/**Hromadná příprava exportu.*/
		hromPripravaExportu(rq?:CallParams<{ixps:string,datSplat:JsonDate,ixpDen:string}>): _Task<{ixps:string,datSplat:JsonDate,ixpDen:string},void>;
		/**Spuštění exportu.*/
		spusteniExportu(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},void>;
		/**Hromadné spuštění exportu.*/
		hromSpusteniExportu(rq?:CallParams<{ixps:string}>): _Task<{ixps:string},void>;
		/**Zrušení exportu.*/
		zrusitExport(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Zjisti, zda je již exportováno.*/
		jeJizExportovano(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazZalohaExport: ServiceBase & Catalog.RcnPrikazZalohaExport;
	}
	const RcnPrikazZalohaExport: Client["RcnPrikazZalohaExport"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr exportu záloh na příkaze.*/
	const enum GRcnPrikazZalohaExportFilter {
		/**Identifikátor.*/
		ixp,
		/**Řádek.*/
		radek,
		/**Kód typu vazby dokladu.*/
		typ_vpp,
		/**Kód stavu exportu.*/
		typ_sex,
		/**Kategorie typu písemnosti.*/
		ktg_typ,
		/**Identifikátor typu písemnosti.*/
		ixs_typ,
		/**Identifikáítor externího subjektu.*/
		ixs_esu,
		/**Typ_upr.*/
		typ_upr,
		/**Druh dokladu.*/
		drd,
		/**Variabilní symbol.*/
		vs,
		/**Konstantní symbol.*/
		ks,
		/**Specifický symbol.*/
		ss,
		/**Směrový kód vlastního účtu.*/
		sk_vl,
		/**Bankovní účet vlastní.*/
		bu_vl,
		/**Směrový kód cizího účtu.*/
		sk_ci,
		/**Bankovní účet cizí.*/
		bu_ci,
		/**Agendové číslo.*/
		ac_ag,
		/**Identifikátor funkce.*/
		ixs_fun,
		/**Rok.*/
		rok,
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
		/**Částka v měně.*/
		c_mena,
		/**Kód měny.*/
		mena,
		/**Čáastka v CZK.*/
		c_czk,
		/**Popis.*/
		popis,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Datum splatnosti.*/
		dat_spl,
		/**Číslo.*/
		cislo,
		/**Identifikátor zálohy.*/
		ixp_zal,
		/**Kód kategorie účetního pohybu.*/
		ktg_upo,
		/**Subřada duz.*/
		subrada_duz,
		/**Datum upo.*/
		dat_upo,
		/**Identifikátor účetního pohybu.*/
		ixp_upr,
		/**Řádek pohybu.*/
		radek_upo,
		/**Identifikátor smlouvy.*/
		ixp_sml,
		/**Rok smlouvy.*/
		rok_sml,
		/**Číslo smlouvy.*/
		cislo_sml,
		/**Kód typu účetního pohybu.*/
		typ_upo,
		/**Řádek rezervace.*/
		radek_rez,
		/**Číslo rezervace.*/
		cislo_rez,
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok,
		/**Identifikátor funkce POK.*/
		ixs_fun_pok,
		/**Typ agendy.*/
		typ_ag,
		/**Příznak opravy dokladu.*/
		priz_opr_dok,
		/**Kód kontace.*/
		kod_kon,
		/**Identifikátor kontace.*/
		ixs_kon,
		/**Te1_2.*/
		te1_2,
		/**Zda ze záloh nebo vyúčtování.*/
		zalohy,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazZalohaPlnaMoc.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - plná moc na vyplácení záloh.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazZalohaPlnaMoc {
		/**Detail plné moci.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>;
		/**Seznam plné moci.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>;
		/**Založení plné moci.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>;
		/**Odstranění plné moci.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaPlnaMocDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazZalohaPlnaMoc: ServiceBase & Catalog.RcnPrikazZalohaPlnaMoc;
	}
	const RcnPrikazZalohaPlnaMoc: Client["RcnPrikazZalohaPlnaMoc"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr plné moci na vyplácení záloh.*/
	const enum GRcnPrikazZalohaPlnaMocFilter {
		/**Identifikátor původní položky.*/
		ixp_pol_puv,
		/**Identifikátor cílové položky.*/
		ixp_pol_dest,
		/**Identifikátor zálohy.*/
		ixp_zal,
		/**Poznámka.*/
		poznamka,
		/**Zmocněnec.*/
		zmocnenec,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnPrikazZalohaVyuctovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - vyúčtování zálohy.
	* @domain SluzCestyReal
	* @businessObject RcnPrikaz
	*/
	interface RcnPrikazZalohaVyuctovani {
		/**Detail vyúčtování zálohy.*/
		read(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>;
		/**Seznam vyúčtování záloh.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>;
		/**Založení vyúčtování zálohy.*/
		create(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>;
		/**Oprava vyúčtování zálohy.*/
		update(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>;
		/**Oprava resp. založení vyúčtování zálohy.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>;
		/**Odstranění vyúčtování zálohy.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnPrikazZalohaVyuctovaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnPrikazZalohaVyuctovani: ServiceBase & Catalog.RcnPrikazZalohaVyuctovani;
	}
	const RcnPrikazZalohaVyuctovani: Client["RcnPrikazZalohaVyuctovani"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro vyúčtování záloh.*/
	const enum GRcnPrikazZalohaVyuctovaniFilter {
		/**Identifikátor zálohy.*/
		ixp_zal,
		/**Řádek.*/
		radek,
		/**Částka vyúčtování.*/
		c_vyuct,
		/**Kód měny vyúčtování.*/
		mena_vyuct,
		/**Identifikátor kurzu.*/
		ixp_kur,
		/**Kurz.*/
		kurz,
		/**Částka.*/
		c,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
		/**Účtárna.*/
		uus,
		/**Nákladové středisko.*/
		nks,
		/**Identifikátor pokladní knihy.*/
		ixp_den_pok,
		/**Identifikátor funkce POK.*/
		ixs_fun_pok,
		/**Částka směny.*/
		c_smena,
		/**Kód měny směny.*/
		mena_smena,
		/**Kurz směny.*/
		kurz_smena,
		/**Částka po směně.*/
		c_posmene,
		/**Poznámka směny.*/
		pozn_smena,
		/**Datum směny.*/
		dat_smena,
		/**Pořadí směny.*/
		por_smena,
		/**Částka zpracováno.*/
		c_zprac,
		/**Částka vlastní.*/
		c_vlastni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnRezervaceVozidla.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - rezervace vozidla.
	* @domain SluzCestyReal
	* @businessObject RcnRezervaceVozidla
	*/
	interface RcnRezervaceVozidla {
		/**Detail rezervace vozidla.*/
		read(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Seznam rezervací vozidla.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Počet rezervací vozidla.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení rezervace vozidla.*/
		create(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Oprava rezervace vozidla.*/
		update(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Oprava resp. založení nové rezervace vozidla, pokud daný PID není vyplněn.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Odstranění rezervace vozidla.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Změna stavu rezervace vozidla.*/
		zmenaStavu(rq?:CallParams<{ixsRsv:string,stavRsv:number,ixsRsvPrim:string}>): _Task<{ixsRsv:string,stavRsv:number,ixsRsvPrim:string},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>>;
		/**Vrátí dto se stavy pro akce menu na detailu rezervace vozidla.*/
		menuStavy(rq?:CallParams<{ixsFunAkt:string,ixsRcn:string,stavRsv:number}>): _Task<{ixsFunAkt:string,ixsRcn:string,stavRsv:number},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnMenuRezervaceVozidlaDto>>;
		/**
		*     Hlavička tabulky měsíčního přehledu.
		*     
		*/
		mesicniPrehledHlavicka(rq?:CallParams<{dat_od:JsonDate,dat_do:JsonDate,nazev_vozidla:boolean}>): _Task<{dat_od:JsonDate,dat_do:JsonDate,nazev_vozidla:boolean},any>;
		/**Data měsíčního přehledu.*/
		mesicniPrehled(rq?:CallParams<{dat_od:JsonDate,dat_do:JsonDate}>): _Task<{dat_od:JsonDate,dat_do:JsonDate},any>;
		/**Hlavička tabulky podrobného měsíčního přehledu.*/
		mesicniPrehledPodrobneHlavicka(rq?:CallParams<{dat_od:JsonDate,dat_do:JsonDate}>): _Task<{dat_od:JsonDate,dat_do:JsonDate},any>;
		/**
		*     Data podrobného měsíčního přehledu.
		*     
		*/
		mesicniPrehledPodrobne(rq?:CallParams<{dat_od:JsonDate,dat_do:JsonDate,nazev_vozidla:boolean}>): _Task<{dat_od:JsonDate,dat_do:JsonDate,nazev_vozidla:boolean},any>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnRezervaceVozidla: ServiceBase & Catalog.RcnRezervaceVozidla;
	}
	const RcnRezervaceVozidla: Client["RcnRezervaceVozidla"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr rezervací vizidla.*/
	const enum GRcnRezervaceVozidlaFilter {
		/**Identifikátor rezervace.*/
		ixs_rsv,
		/**Kód typu rezervace.*/
		typ_rsv,
		/**Kód stavu rezervace.*/
		stav_rsv,
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Identifikátor platební karty.*/
		ixp_plk,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Název.*/
		nazev,
		/**Místo nástupu.*/
		misto_n,
		/**Datum nástupu.*/
		dat_n,
		/**Místo ukončení.*/
		misto_u,
		/**Datum ukončení.*/
		dat_u,
		/**Poznámka.*/
		poznamka,
		/**Identifikátor funkce zadavatele.*/
		ixs_fun_zad,
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_akt,
		/**Identifikátor primární rezervace (sloučení).*/
		ixs_rsv_prim,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor knihy.*/
		ixp_den,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnRezervaceVozidlaUcastnik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - účastník na rezervaci vozidla.
	* @domain SluzCestyReal
	* @businessObject RcnRezervaceVozidla
	*/
	interface RcnRezervaceVozidlaUcastnik {
		/**Detail účastníka.*/
		read(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>;
		/**Seznam účastníků.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>;
		/**Založení účastníka.*/
		create(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>;
		/**Oprava účastníka.*/
		update(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>;
		/**Oprava resp. založení/navázání nového účastníka.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>;
		/**Odstranění účastníka.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnRezervaceVozidlaUcastnikDto>>;
		/**Kopíruje účastníky z cesty na rezervaci.*/
		kopirovat(rq?:CallParams<{ixsRcn:string,ixsRsv:string}>): _Task<{ixsRcn:string,ixsRsv:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnRezervaceVozidlaUcastnik: ServiceBase & Catalog.RcnRezervaceVozidlaUcastnik;
	}
	const RcnRezervaceVozidlaUcastnik: Client["RcnRezervaceVozidlaUcastnik"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro účastníky na rezervaci vozidla.*/
	const enum GRcnRezervaceVozidlaUcastnikFilter {
		/**Identifikátor rezervace.*/
		ixs_rsv,
		/**Identifikátor osoby.*/
		ixs_osr,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód vztahu účastníka.*/
		stav_dos,
		/**Poznámka.*/
		poznamka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnRozpoctovyZapis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Rozpočtový zápis.
	* @domain SluzCestyReal
	* @businessObject RcnRozpoctovyZapis
	*/
	interface RcnRozpoctovyZapis {
		/**Detail Rozpočtový zápis.*/
		read(rq?:Gordic.Rcn.Interface.GRcnRozpoctovyZapisDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnRozpoctovyZapisDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnRozpoctovyZapisDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnRozpoctovyZapisDto>>;
		/**Seznam Rozpočtový zápis.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnRozpoctovyZapisDto>>;
		/**Počet Rozpočtový zápis.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnRozpoctovyZapis: ServiceBase & Catalog.RcnRozpoctovyZapis;
	}
	const RcnRozpoctovyZapis: Client["RcnRozpoctovyZapis"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro Rozpočtový zápis.*/
	const enum GRcnRozpoctovyZapisFilter {
		/**Identifikátor.*/
		ixp,
		/**Agendové číslo.*/
		ac,
		/**Popis.*/
		popis,
		/**Variabilní symbol.*/
		vs,
		/**Částka.*/
		c,
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Účetní středisko.*/
		ucs,
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
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnSluzebniVozidlo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - služební vozidlo.
	* @domain SluzCestyReal
	* @businessObject RcnSluzebniVozidlo
	*/
	interface RcnSluzebniVozidlo {
		/**Detail vozidla.*/
		read(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>;
		/**Seznam vozidel.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>;
		/**Počet vozidel.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení vozidla.*/
		create(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>;
		/**Oprava vozidla.*/
		update(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>;
		/**Oprava resp. založení nového vozidla, pokud daný PID není vyplněn.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>;
		/**Odstranění vozidla.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>>;
		/**Vrátí dto se stavy pro akce menu na detailu služebního vozidla.*/
		menuStavy(rq?:CallParams<{}>): _Task<{},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnMenuSluzebniVozidloDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnSluzebniVozidlo: ServiceBase & Catalog.RcnSluzebniVozidlo;
	}
	const RcnSluzebniVozidlo: Client["RcnSluzebniVozidlo"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro služební vozidla.*/
	const enum GRcnSluzebniVozidloFilter {
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Druh vozidla.*/
		druh_aus,
		/**Typ vozidla.*/
		typ_aus,
		/**Popis.*/
		popis_aus,
		/**Identifikační číslo vozidla.*/
		vin,
		/**Rok výroby.*/
		rok_vyroby,
		/**Obsah.*/
		obsah,
		/**Kód typu pohonné hmoty.*/
		phm,
		/**Barva.*/
		barva,
		/**Počt míst.*/
		poc_mist,
		/**Spojovací zařízení.*/
		spoj_zar,
		/**Spz.*/
		spz,
		/**Číslo tp.*/
		cislo_tp,
		/**Číslo otp.*/
		cislo_otp,
		/**Datum stk.*/
		dat_stk,
		/**Datum měření emisí.*/
		dat_me,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Spotřeba 1.*/
		spotreba_phm1,
		/**Spotřeba 2.*/
		spotreba_phm2,
		/**Spotřeba 3.*/
		spotreba_phm3,
		/**Spotřeba průměr.*/
		spotreba_prum,
		/**Identifikátor funkce kompetenta.*/
		ixs_fun_kom,
		/**Ičo.*/
		ico,
		/**Nákladové středisko.*/
		nks,
		/**Identifikátor organizační jednotky.*/
		ixs_orj,
		/**Kód druhu vozidla.*/
		drh_aus,
		/**Kód kategorie vozidla.*/
		kat_aus,
		/**Datum nástupu cesty - pro filtr křížení.*/
		dat_n,
		/**Datum ukončení cesty - pro filtr křížení.*/
		dat_u,
		/**Rezervace vozidel - pro kontrolu křížení resp. vyřazení aktuální rezervace z filtru.*/
		ixs_rsv,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnSluzebniVozidloPojisteni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - pojištění vozidla.
	* @domain SluzCestyReal
	* @businessObject RcnSluzebniVozidlo
	*/
	interface RcnSluzebniVozidloPojisteni {
		/**Detail pojištění vozidla.*/
		read(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>;
		/**Seznam pojištění vozidla.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>;
		/**Založení pojištění vozidla.*/
		create(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>;
		/**Oprava pojištění vozidla.*/
		update(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>;
		/**Oprava resp. založení pojištění vozidla.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>;
		/**Odstranění pojištění vozidla.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloPojisteniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnSluzebniVozidloPojisteni: ServiceBase & Catalog.RcnSluzebniVozidloPojisteni;
	}
	const RcnSluzebniVozidloPojisteni: Client["RcnSluzebniVozidloPojisteni"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro pojištění vozidla.*/
	const enum GRcnSluzebniVozidloPojisteniFilter {
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Řádek.*/
		radek,
		/**Číslo pojištění.*/
		cislo_poj,
		/**Ústav.*/
		ustav,
		/**Název.*/
		nazev,
		/**Částka.*/
		castka,
		/**Datum platnosti od.*/
		dat_plat_od,
		/**Datum platnosti do.*/
		dat_plat_do,
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

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnSluzebniVozidloServis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - servis vozidla.
	* @domain SluzCestyReal
	* @businessObject RcnSluzebniVozidlo
	*/
	interface RcnSluzebniVozidloServis {
		/**Detail servisu vozidla.*/
		read(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>;
		/**Seznam servisů vozidel.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>;
		/**Založení servisu vozidla.*/
		create(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>;
		/**Oprava servisu vozidla.*/
		update(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>;
		/**Oprava resp. založení servisu vozidla.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>;
		/**Odstranění servisu vozidla.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloServisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnSluzebniVozidloServis: ServiceBase & Catalog.RcnSluzebniVozidloServis;
	}
	const RcnSluzebniVozidloServis: Client["RcnSluzebniVozidloServis"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro servis vozidla.*/
	const enum GRcnSluzebniVozidloServisFilter {
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Řádek.*/
		radek,
		/**Částka.*/
		castka,
		/**Datum servisu.*/
		dat_servis,
		/**Datum platnosti do.*/
		dat_plat_do,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Popis.*/
		popis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnSluzebniVozidloSilnicniDan.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - silniční daň vozidla.
	* @domain SluzCestyReal
	* @businessObject RcnSluzebniVozidlo
	*/
	interface RcnSluzebniVozidloSilnicniDan {
		/**Detail silniční daně.*/
		read(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>;
		/**Seznam silničních daní.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>;
		/**Založení silniční daně.*/
		create(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>;
		/**Oprava silniční daně.*/
		update(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>;
		/**Oprava resp. založení silniční daně.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>;
		/**Odstranění silniční daně.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnSluzebniVozidloSilnicniDanDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnSluzebniVozidloSilnicniDan: ServiceBase & Catalog.RcnSluzebniVozidloSilnicniDan;
	}
	const RcnSluzebniVozidloSilnicniDan: Client["RcnSluzebniVozidloSilnicniDan"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro silniční daň vozidla.*/
	const enum GRcnSluzebniVozidloSilnicniDanFilter {
		/**Identifikátor vozidla.*/
		ixp_aus,
		/**Řádek.*/
		radek,
		/**Částka.*/
		castka,
		/**Datum první registrace.*/
		dat_prv_reg,
		/**Datum platnosti do.*/
		dat_plat_do,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Popis.*/
		popis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnSouhrn.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - podpora pro Dashboard.
	* @domain SluzCestyReal
	* @businessObject RcnSouhrn
	*/
	interface RcnSouhrn {
		/**Vrátí počty cest/příkazů pro aktuální rok/knihu.*/
		poctyPozadavku(rq?:CallParams<{cesty:boolean,prikazy:boolean}>): _Task<{cesty:boolean,prikazy:boolean},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
		/**Vrátí počty platebních karet.*/
		poctyPlatebnichKaret(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
		/**Vrátí počty pasů.*/
		poctyPasu(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
		/**Vrátí počty víz.*/
		poctyViz(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
		/**Vrátí počty osob.*/
		poctyOsob(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
		/**Vrátí počty služebních vozidel vozového parku.*/
		poctySluzebnichVozidel(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
		/**Vrátí počty rezervací služebních vozidel vozového parku.*/
		poctyRezervaciSluzebnichVozidel(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Rcn.Interface.GRcnSouhrnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnSouhrn: ServiceBase & Catalog.RcnSouhrn;
	}
	const RcnSouhrn: Client["RcnSouhrn"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro souhrn.*/
	const enum GRcnSouhrnFilter {
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
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnTankovaniPhm.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - tankování pohonných hmot.
	* @domain SluzCestyReal
	* @businessObject RcnTankovaniPhm
	*/
	interface RcnTankovaniPhm {
		/**Detail tankování.*/
		read(rq?:Gordic.Rcn.Interface.GRcnTankovaniPhmDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>;
		/**Seznam tankování.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>;
		/**Založení tankování.*/
		create(rq?:Gordic.Rcn.Interface.GRcnTankovaniPhmDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>;
		/**Oprava tankování.*/
		update(rq?:Gordic.Rcn.Interface.GRcnTankovaniPhmDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>;
		/**Oprava resp. založení tankování.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnTankovaniPhmDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>;
		/**Odstranění tankování.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnTankovaniPhmDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnTankovaniPhmDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnTankovaniPhm: ServiceBase & Catalog.RcnTankovaniPhm;
	}
	const RcnTankovaniPhm: Client["RcnTankovaniPhm"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro tankování pohonných hmot.*/
	const enum GRcnTankovaniPhmFilter {
		/**Identifikátor.*/
		ixp,
		/**Řádek pep.*/
		radek_pep,
		/**Pořadí.*/
		poradi,
		/**Číslo.*/
		cislo,
		/**Kód typu pohonných hmot.*/
		phm,
		/**Částka pohonných hmot.*/
		c_phm,
		/**Mena_phm.*/
		mena_phm,
		/**Množství.*/
		mnozstvi,
		/**Kurz.*/
		kurz,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Měna záaoh.*/
		mena_zal,
		/**Částka celkem.*/
		c_celkem,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Identifikátor platební karty.*/
		ixp_plk,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnTempTabulka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - temp tabulka pro hromadné operace a sestavy.
	* @domain SluzCestyReal
	* @businessObject RcnTempTabulka
	*/
	interface RcnTempTabulka {
		/**Detail záznamu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnTempTabulkaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnTempTabulkaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnTempTabulkaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnTempTabulkaDto>>;
		/**Seznam záznamů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnTempTabulkaDto>>;
		/**Založení záznamu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnTempTabulkaDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTempTabulkaDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnTempTabulkaDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnTempTabulkaDto>>;
		/**Do DB připraví seznam pidů dle aktuální masky resp. zobrazeného seznamu.*/
		pripravaTisku(rq?:CallParams<{pidy:string}>): _Task<{pidy:string},JsonDecimal>;
		/**Odstraní z DB seznam pidů k tisku dle LPC a IKC.*/
		cisteniPoTisku(rq?:CallParams<{ikc:JsonDecimal}>): _Task<{ikc:JsonDecimal},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnTempTabulka: ServiceBase & Catalog.RcnTempTabulka;
	}
	const RcnTempTabulka: Client["RcnTempTabulka"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro záznamy temp tabulky.*/
	const enum GRcnTempTabulkaFilter {
		/**Pořadové číslo přihlášení.*/
		log_por_cislo,
		/**Identifikátor.*/
		ixp,
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
		/**Příznak kumulace.*/
		priz_kum,
		/**Příznak tisku.*/
		priz_tisk,
		/**Ikc.*/
		ikc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnUzaverka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - uzávěrka.
	* @domain SluzCestyReal
	* @businessObject RcnUzaverka
	*/
	interface RcnUzaverka {
		/**Detail uzávěrky.*/
		read(rq?:Gordic.Rcn.Interface.GRcnUzaverkaDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnUzaverkaDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnUzaverkaDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnUzaverkaDto>>;
		/**Seznam uzávěrky.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnUzaverkaDto>>;
		/**Spustí kontrolní chod.*/
		kontrolniChod(rq?:CallParams<{priz_test:number}>): _Task<{priz_test:number},number>;
		/**Uzávěrka.*/
		uzaverka(rq?:CallParams<{}>): _Task<{},number>;
		/**Vrátí stav uzávěrky z knihy realizace.*/
		vratStavUzaverky(rq?:CallParams<{}>): _Task<{},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnUzaverka: ServiceBase & Catalog.RcnUzaverka;
	}
	const RcnUzaverka: Client["RcnUzaverka"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro uzávěrku.*/
	const enum GRcnUzaverkaFilter {
		/**Rok.*/
		rok,
		/**Pořadí.*/
		poradi,
		/**Kód.*/
		kod,
		/**Popis.*/
		popis,
		/**Identifikátor.*/
		ixp,
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

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnVazby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - vazby - navázané doklady.
	* @domain SluzCestyReal
	* @businessObject RcnVazby
	*/
	interface RcnVazby {
		/**Seznam navázaných dokladů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnVazbyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnVazby: ServiceBase & Catalog.RcnVazby;
	}
	const RcnVazby: Client["RcnVazby"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro vazby - navázané doklady.*/
	const enum GRcnVazbyFilter {
		/**Identifikátor.*/
		ixp,
		/**Příznak zda se jedná o vazby na cestě(SC) nebo na příkaze (CP).*/
		sender,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnVizum.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - vízum.
	* @domain SluzCestyReal
	* @businessObject RcnVizum
	*/
	interface RcnVizum {
		/**Detail víza.*/
		read(rq?:Gordic.Rcn.Interface.GRcnVizumDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnVizumDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnVizumDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnVizumDto>>;
		/**Seznam víz.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnVizumDto>>;
		/**Počet víz.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení víza.*/
		create(rq?:Gordic.Rcn.Interface.GRcnVizumDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnVizumDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnVizumDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnVizumDto>>;
		/**Oprava víza.*/
		update(rq?:Gordic.Rcn.Interface.GRcnVizumDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnVizumDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnVizumDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnVizumDto>>;
		/**Oprava resp. založení Víza.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnVizumDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnVizumDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnVizumDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnVizumDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnVizum: ServiceBase & Catalog.RcnVizum;
	}
	const RcnVizum: Client["RcnVizum"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro víza.*/
	const enum GRcnVizumFilter {
		/**Identifikátor víza.*/
		ixp_viz,
		/**Identifikátor knihy.*/
		ixp_den,
		/**Rok.*/
		rok,
		/**Agendové číslo.*/
		ac,
		/**Evidenční číslo.*/
		evi_cis,
		/**Kód druhu víza.*/
		druh_viza,
		/**Popis.*/
		popis,
		/**Datum platnosti od.*/
		dat_plat_od,
		/**Datum platnosti do.*/
		dat_plat_do,
		/**Kód státu.*/
		stat,
		/**Měna.*/
		mena,
		/**Identifikátor pasu.*/
		ixp_pas,
		/**Identifikátor cesty.*/
		ixs_rcn,
		/**Důvod cesty.*/
		duvod_ces,
		/**Kód způsobu vyřízení.*/
		zp_vyriz,
		/**Poznámka.*/
		poznamka,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Částka poplatku.*/
		c_popl,
		/**Identifikátor osoby.*/
		ixs_osr,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnZmenoveRizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - změnové řízení.
	* @domain SluzCestyReal
	* @businessObject RcnZmenoveRizeni
	*/
	interface RcnZmenoveRizeni {
		/**Detail změnového řízení.*/
		read(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},GServiceReadResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniDto>>;
		/**Seznam změnových řízení.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniDto>>;
		/**Založení změnového řízení.*/
		create(rq?:CallParams<{ixsRcn:string}>): _Task<{ixsRcn:string},GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnZmenoveRizeni: ServiceBase & Catalog.RcnZmenoveRizeni;
	}
	const RcnZmenoveRizeni: Client["RcnZmenoveRizeni"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro změnové řízení.*/
	const enum GRcnZmenoveRizeniFilter {
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
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Identifikátor rozpočtu.*/
		ixp_roz,
		/**Identifikátor funkce vlastníka.*/
		ixs_fun_vla,
		/**Identifikátor zadavatele (změnu provedl).*/
		ixs_zmp_zad,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnZmenoveRizeniFinancniProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - finanční profil změnového řízení.
	* @domain SluzCestyReal
	* @businessObject RcnZmenoveRizeni
	*/
	interface RcnZmenoveRizeniFinancniProfil {
		/**Detail finančního profilu.*/
		read(rq?:Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>;
		/**Seznam finančních profilů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>;
		/**Založení finančního profilu.*/
		create(rq?:Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>;
		/**Oprava finančního profilu.*/
		update(rq?:Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZmenoveRizeniFinancniProfilDto>>;
		/**Odstranění finančního profilu.*/
		delete(rq?:CallParams<{ixpZmr:string,radekZmr:number}>): _Task<{ixpZmr:string,radekZmr:number},void>;
		/**Návrh cílových položek.*/
		naplnFinancniPozadavky(rq?:CallParams<{ixsRcn:string,ixpZmr:string}>): _Task<{ixsRcn:string,ixpZmr:string},void>;
		/**Návrh zdrojových položek.*/
		naplnNavrhKryti(rq?:CallParams<{ixsRcn:string,ixpZmr:string}>): _Task<{ixsRcn:string,ixpZmr:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnZmenoveRizeniFinancniProfil: ServiceBase & Catalog.RcnZmenoveRizeniFinancniProfil;
	}
	const RcnZmenoveRizeniFinancniProfil: Client["RcnZmenoveRizeniFinancniProfil"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro finanční profil změnového řízení.*/
	const enum GRcnZmenoveRizeniFinancniProfilFilter {
		/**Identifkátor změnového řízení.*/
		ixp_zmr,
		/**Řádek položky finančního profilu.*/
		radek_zmr,
		/**Kód typu položky finančního profilu.*/
		typ_pfp,
		/**Identifikátor cesty.*/
		ixp,
		/**Řádek položky.*/
		radek_pol,
		/**Identifikátor typu náhrad.*/
		ixs_tna,
		/**Kód státu.*/
		stat,
		/**Částka celkem v CZK.*/
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

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnZpusobDopravy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - způsob dopravy.
	* @domain SluzCestyReal
	* @businessObject RcnZpusobDopravy
	*/
	interface RcnZpusobDopravy {
		/**Detail způsobu dopravy.*/
		read(rq?:Gordic.Rcn.Interface.GRcnZpusobDopravyDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnZpusobDopravyDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnZpusobDopravyDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnZpusobDopravyDto>>;
		/**Seznam způsobů dopravy.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnZpusobDopravyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnZpusobDopravy: ServiceBase & Catalog.RcnZpusobDopravy;
	}
	const RcnZpusobDopravy: Client["RcnZpusobDopravy"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro způsob dopravy.*/
	const enum GRcnZpusobDopravyFilter {
		/**Kód způsobu dopravy.*/
		zp_dopr,
		/**Způsob dopravy textově.*/
		zp_dopr_txt,
		/**Doplňující číselná informace.*/
		k_v,
		/**Doplňující textová informace.*/
		k_s,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rcn.Interface\Isl\IGRcnZpusobUhrady.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - způsob úhrady výdaje.
	* @domain SluzCestyReal
	* @businessObject RcnZpusobUhrady
	*/
	interface RcnZpusobUhrady {
		/**Detail způsobu úhrady výdaje.*/
		read(rq?:Gordic.Rcn.Interface.GRcnZpusobUhradyDto|CallParams<GServiceReadRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>): _Task<GServiceReadRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>,GServiceReadResponse<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>;
		/**Seznam způsobů úhrady výdaje.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>;
		/**Založení způsob úhrady výdaje.*/
		create(rq?:Gordic.Rcn.Interface.GRcnZpusobUhradyDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>;
		/**Oprava způsobu úhrady výdaje.*/
		update(rq?:Gordic.Rcn.Interface.GRcnZpusobUhradyDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>;
		/**Oprava resp. založení způsobu úhrady výdaje.*/
		upsert(rq?:Gordic.Rcn.Interface.GRcnZpusobUhradyDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>;
		/**Odstranění způsobu úhrady výdaje.*/
		delete(rq?:Gordic.Rcn.Interface.GRcnZpusobUhradyDto|CallParams<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>): _Task<GServiceSaveRequest<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>,GServiceSaveResponse<Gordic.Rcn.Interface.GRcnZpusobUhradyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RcnZpusobUhrady: ServiceBase & Catalog.RcnZpusobUhrady;
	}
	const RcnZpusobUhrady: Client["RcnZpusobUhrady"];
}
declare namespace Gordic.Rcn.Interface {
	/**Filtr pro způsob úhrady výdaje.*/
	const enum GRcnZpusobUhradyFilter {
		/**Identifkátor dokladu.*/
		ixp,
		/**Identifikátor typu náhrady.*/
		ixs_tna,
		/**Kód způsobu úhrady.*/
		zp_uhr,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

