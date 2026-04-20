/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ren.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ren.Interface\Gordic.Ren.Interface.csproj
*    created     2026-02-16 14:35:21
*    files       Administrace\WSDP\GSestavaKatastruNemovitostiDto.d.ts
*                Controls\Dto\GNemcdavDto.d.ts
*                Controls\Dto\GNemsbuDto.d.ts
*                Controls\Dto\GNemsdpoDto.d.ts
*                Controls\Dto\GNemsjedDto.d.ts
*                Controls\Dto\GNemskatDto.d.ts
*                Controls\Dto\GNemsparDto.d.ts
*                Controls\Dto\GNemvkdpDto.d.ts
*                Controls\Dto\GUcelNahlizeniDto.d.ts
*                Detaily\Gordic.Ren.Interface.IGRenMaj.d.ts
*                Detaily\Gordic.Ren.Interface.IGVlastnictvi.d.ts
*                Detaily\Dto\GBudovaNaParceleDto.d.ts
*                Detaily\Dto\GDetailBudovyDto.d.ts
*                Detaily\Dto\GDetailJednotkyDto.d.ts
*                Detaily\Dto\GDetailNemsjedDto.d.ts
*                Detaily\Dto\GDetailParcelyDto.d.ts
*                Detaily\Dto\GNemsdavDto.d.ts
*                Detaily\Dto\GVlastnictviDto.d.ts
*                Detaily\Dto\DetailyBudovy\GDetailBudovySeznamCastiBudovDto.d.ts
*                Detaily\Dto\DetailyBudovy\GDetailBudovySeznamJednotekNahlizeniDto.d.ts
*                Detaily\Dto\DetailyBudovy\GDetailBudovySeznamParcelNahlizeniDto.d.ts
*                Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamJinePravniVztahyDto.d.ts
*                Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamListinyDto.d.ts
*                Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamRizeniDto.d.ts
*                Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamVlastniciDto.d.ts
*                Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamZaznamuDto.d.ts
*                Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamZONDto.d.ts
*                Detaily\Dto\DetailyParcely\GDetailParcelyMAJDto.d.ts
*                Detaily\Dto\DetailyParcely\GDetailParcelySeznamBDPDto.d.ts
*                Dto\ExtendedDto\GRenAdresaBudovyDto.d.ts
*                Dto\ExtendedDto\GRenAdresniMistoDto.d.ts
*                Dto\ExtendedDto\GRenBaseNemovitostDto.d.ts
*                Dto\ExtendedDto\GRenBonitniDilParcelyDto.d.ts
*                Dto\ExtendedDto\GRenBudovaDto.d.ts
*                Dto\ExtendedDto\GRenCastBudovyDto.d.ts
*                Dto\ExtendedDto\GRenCastObceDto.d.ts
*                Dto\ExtendedDto\GRenCharakteristikaOsDto.d.ts
*                Dto\ExtendedDto\GRenDavkaNemDto.d.ts
*                Dto\ExtendedDto\GRenDavkySouborDto.d.ts
*                Dto\ExtendedDto\GRenDruhCislovaniParcelyDto.d.ts
*                Dto\ExtendedDto\GRenDruhPozemkuDto.d.ts
*                Dto\ExtendedDto\GRenJednotkaDto.d.ts
*                Dto\ExtendedDto\GRenJinePravniVztahyDto.d.ts
*                Dto\ExtendedDto\GRenKatastralniUzemiDto.d.ts
*                Dto\ExtendedDto\GRenKrajDto.d.ts
*                Dto\ExtendedDto\GRenListinaDto.d.ts
*                Dto\ExtendedDto\GRenMajetkovyProfilDto.d.ts
*                Dto\ExtendedDto\GRenMapovyListDto.d.ts
*                Dto\ExtendedDto\GRenObecDto.d.ts
*                Dto\ExtendedDto\GRenObjektyRizeniDto.d.ts
*                Dto\ExtendedDto\GRenOkresDto.d.ts
*                Dto\ExtendedDto\GRenOpravnenySubjektDto.d.ts
*                Dto\ExtendedDto\GRenParcelaDto.d.ts
*                Dto\ExtendedDto\GRenPravoStavbyDto.d.ts
*                Dto\ExtendedDto\GRenPrirazeniZpusobuOchranyDto.d.ts
*                Dto\ExtendedDto\GRenProfilTextuZaznamuDto.d.ts
*                Dto\ExtendedDto\GRenRizeniDto.d.ts
*                Dto\ExtendedDto\GRenRizeniNemovitostiDto.d.ts
*                Dto\ExtendedDto\GRenRozsirenyMajetkovyProfilDto.d.ts
*                Dto\ExtendedDto\GRenTelesoDto.d.ts
*                Dto\ExtendedDto\GRenTempNemovitostDto.d.ts
*                Dto\ExtendedDto\GRenTypBudovyDto.d.ts
*                Dto\ExtendedDto\GRenTypJednotkyDto.d.ts
*                Dto\ExtendedDto\GRenTypListinyDto.d.ts
*                Dto\ExtendedDto\GRenTypParcelyDto.d.ts
*                Dto\ExtendedDto\GRenTypParcelyZeDto.d.ts
*                Dto\ExtendedDto\GRenTypPravnihoVztahuDto.d.ts
*                Dto\ExtendedDto\GRenTypPredmetuRizeniDto.d.ts
*                Dto\ExtendedDto\GRenTypZaznamuDto.d.ts
*                Dto\ExtendedDto\GRenUcastikRizeniAdresaDto.d.ts
*                Dto\ExtendedDto\GRenUcastikRizeniNemovitostiDto.d.ts
*                Dto\ExtendedDto\GRenVazbaNemLisRizDto.d.ts
*                Dto\ExtendedDto\GRenVlastnictviDto.d.ts
*                Dto\ExtendedDto\GRenZaznamKNemovitostiDto.d.ts
*                Dto\ExtendedDto\GRenZdrojParcelZeDto.d.ts
*                Dto\ExtendedDto\GRenZpusobOceneniNemovitostiDto.d.ts
*                Dto\ExtendedDto\GRenZpusobOchranyDto.d.ts
*                Dto\ExtendedDto\GRenZpusobUrceniVymeryDto.d.ts
*                Dto\ExtendedDto\GRenZpusobVyuzitiBudovyDto.d.ts
*                Dto\ExtendedDto\GRenZpusobVyuzitiJednotkyDto.d.ts
*                Dto\ExtendedDto\GRenZpusobVyuzitiPozemkuDto.d.ts
*                Dto\Permissions\GRenBasePermissions.d.ts
*                ISL\Gordic.Ren.Interface.IGRenMajetkovyProfil.d.ts
*                ISL\Import\Gordic.Ren.Interface.IGRenImportDavAsync.d.ts
*                Permissions\GNemsdavPermissions.d.ts
*                Permissions\GNemskatPermissions.d.ts
*                Permissions\GRenBaseDetailDto.d.ts
*                Permissions\GRenBaseDetailNemovitostiDto.d.ts
*                Permissions\GRenNemovitostPermissions.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Administrace\WSDP\GSestavaKatastruNemovitostiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Sestava katastru nemovitostí*/
	interface GSestavaKatastruNemovitostiDto {
		/**id_sestavy*/
		idSestavy?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**datumPozadavku*/
		datumPozadavku?: JsonDate|null;
		/**datumSpusteni*/
		datumSpusteni?: JsonDate|null;
		/**datumVytvoreni*/
		datumVytvoreni?: JsonDate|null;
		/**pocetJednotek*/
		pocetJednotek?: number|null;
		/**pocetStran*/
		pocetStran?: number|null;
		/**format*/
		format?: string|null;
		/**stav*/
		casoveRaziko?: string|null;
		/**stav*/
		elZnacka?: string|null;
		/**cena*/
		cena?: JsonDecimal|null;
		/**stav*/
		stav?: string|null;
		/**cisloJednaci*/
		cisloJednaci?: string|null;
		/**kodDuvodu*/
		kodDuvodu?: number|null;
		/**overovaciDolozka*/
		overovaciDolozka?: boolean|null;
		/**poradoveCislo*/
		poradoveCislo?: number|null;
		/**idLV*/
		idLV?: string|null;
		/**katastralniUzemiKod*/
		katastralniUzemiKod?: number|null;
		/**cisloListuVlastnictvi*/
		cisloListuVlastnictvi?: number|null;
		/**idOS*/
		idOS?: string|null;
		/**objektyId*/
		objektyId?: string[]|null;
		/**typObjektu*/
		typObjektu?: Gordic.Ren.Interface.GTypObjektuEnum|null;
		/**Kód části obce*/
		castObceKod?: number|null;
		/**Kód typu stavby 1,2*/
		typStavbyKod?: number|null;
		/**číslo domovní 1..9999*/
		cisloDomovni?: number|null;
		/**Typ sestavy nebo služby*/
		typSestavyASluzby?: Gordic.Ren.Interface.GTypSestavyASluzbyEnum|null;
	}
	const enum GSestavaKatastruNemovitostiDtoNames { idSestavy = "idSestavy", nazev = "nazev", datumPozadavku = "datumPozadavku", datumSpusteni = "datumSpusteni", datumVytvoreni = "datumVytvoreni", pocetJednotek = "pocetJednotek", pocetStran = "pocetStran", format = "format", casoveRaziko = "casoveRaziko", elZnacka = "elZnacka", cena = "cena", stav = "stav", cisloJednaci = "cisloJednaci", kodDuvodu = "kodDuvodu", overovaciDolozka = "overovaciDolozka", poradoveCislo = "poradoveCislo", idLV = "idLV", katastralniUzemiKod = "katastralniUzemiKod", cisloListuVlastnictvi = "cisloListuVlastnictvi", idOS = "idOS", objektyId = "objektyId", typObjektu = "typObjektu", castObceKod = "castObceKod", typStavbyKod = "typStavbyKod", cisloDomovni = "cisloDomovni", typSestavyASluzby = "typSestavyASluzby",}
	const enum GSestavaKatastruNemovitostiDtoFragments { idSestavy = "*", nazev = "*", datumPozadavku = "*", datumSpusteni = "*", datumVytvoreni = "*", pocetJednotek = "*", pocetStran = "*", format = "*", casoveRaziko = "*", elZnacka = "*", cena = "*", stav = "*", cisloJednaci = "*", kodDuvodu = "*", overovaciDolozka = "*", poradoveCislo = "*", idLV = "*", katastralniUzemiKod = "*", cisloListuVlastnictvi = "*", idOS = "*", objektyId = "*", typObjektu = "*", castObceKod = "*", typStavbyKod = "*", cisloDomovni = "*", typSestavyASluzby = "*",}
	const enum GSestavaKatastruNemovitostiDtoTypes { idSestavy = "string", nazev = "string", datumPozadavku = "JsonDate", datumSpusteni = "JsonDate", datumVytvoreni = "JsonDate", pocetJednotek = "number", pocetStran = "number", format = "string", casoveRaziko = "string", elZnacka = "string", cena = "JsonDecimal", stav = "string", cisloJednaci = "string", kodDuvodu = "number", overovaciDolozka = "boolean", poradoveCislo = "number", idLV = "string", katastralniUzemiKod = "number", cisloListuVlastnictvi = "number", idOS = "string", objektyId = "string[]", typObjektu = "Gordic.Ren.Interface.GTypObjektuEnum", castObceKod = "number", typStavbyKod = "number", cisloDomovni = "number", typSestavyASluzby = "Gordic.Ren.Interface.GTypSestavyASluzbyEnum",}
	const enum GSestavaKatastruNemovitostiDtoTypeLengths { idSestavy = 30, nazev = 254, format = 20, casoveRaziko = 3, elZnacka = 3, stav = 254, cisloJednaci = 50,}
	/**Výčet filtračních položek pro tabulku nemsjpv*/
	const enum GSestavaKatastruNemovitostiFilter {
		/**id_sestavy*/
		id_sestavy,
		/**datumPozadavku*/
		datumPozadavku,
		/**datumVytvoreni*/
		datumVytvoreni,
		/**nazev*/
		nazev,
	}
	/**Výčet filtračních položek pro tabulku nemsjpv*/
	const enum GTypSestavyASluzbyEnum {
		/**Sestava LV*/
		SestavaLV,
		/**Vyhledání oprávněného subjektu*/
		VyhledaniOpravnenehoSubjektu,
		/**Vyhledání parcely*/
		VyhledaniParcely,
		/**Vyhledání stavby*/
		VyhledaniStavby,
		/**Vyhledání jednotky*/
		VyhledaniJednotky,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemcdavDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemcdav*/
	interface GNemcdavDto {
		/**DBCOLUMN:nemcdav.typ_dav*/
		typ_dav?: number|null;
		/**DBCOLUMN:nemcdav.typ_dav_txt*/
		typ_dav_txt?: string|null;
		/**DBCOLUMN:nemcdav.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:nemcdav.k_s*/
		k_s?: string|null;
	}
	const enum GNemcdavDtoNames { typ_dav = "typ_dav", typ_dav_txt = "typ_dav_txt", k_v = "k_v", k_s = "k_s",}
	const enum GNemcdavDtoFragments { typ_dav = "*", typ_dav_txt = "*", k_v = "*", k_s = "*",}
	const enum GNemcdavDtoTypes { typ_dav = "number", typ_dav_txt = "string", k_v = "number", k_s = "string",}
	const enum GNemcdavDtoTypeLengths { typ_dav_txt = 50, k_s = 15,}
	/**Enum pro Nemcdav*/
	const enum GNemcdavEnum {
		/**Neurčeno*/
		_0=0,
		/**Záznam z dávky dat katastru nemovitostí*/
		_10=10,
		/**Záznam vložený uživatelem*/
		_20=20,
	}
	function GNemcdavEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GNemcdavEnum, Gordic.Ren.Interface.GNemcdavDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemsbuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBCOLUMN:nemsdpo.id_budovy	DBCOLUMN:nemsdpo.dat_vzniku	DBCOLUMN:nemsdpo.dat_zaniku	DBCOLUMN:nemsdpo.typ_budovy	DBCOLUMN:nemsdpo.kod_kat_uzemi	DBCOLUMN:nemsdpo.cislo_tel	DBCOLUMN:nemsdpo.cislo_domovni	DBCOLUMN:nemsdpo.id_telesa	DBCOLUMN:nemsdpo.aktivita	DBCOLUMN:nemsdpo.osu_rodne_cislo	DBCOLUMN:nemsdpo.osu_ico_num	DBCOLUMN:nemsdpo.osu_nazev_osu	DBCOLUMN:nemsdpo.osu_jmeno	DBCOLUMN:nemsdpo.osu_prijmeni	DBCOLUMN:nemsdpo.nazev_kat_uzemi	DBCOLUMN:nemsdpo.nazev_zp_vyuz_bud	DBCOLUMN:nemsdpo.nazev_typ_budovy	DBCOLUMN:nemsdpo.budova_nazev	DBCOLUMN:nemsdpo.nemscob_nazev_casti_obce	DBCOLUMN:nemsdpo.nemsobc_obec_nazev	DBCOLUMN:nemsdpo.c_cena_oc	DBCOLUMN:nemsdpo.tpv_typ_pr_vztahu	DBCOLUMN:nemsdpo.cos_nazev_charoprsubj	DBCOLUMN:nemsdpo.nemstza_nazev_tza	DBCOLUMN:nemsdpo.nemszaz_dat_zaz	DBCOLUMN:nemsdpo.nemstxt_obsah	DBCOLUMN:nemsdpo.s_vecne_bremeno	DBCOLUMN:nemsdpo.s_zastavni_pravo	DBCOLUMN:nemsdpo.majsprn_ixs_maj	DBCOLUMN:nemsdpo.majsprn_ser_cis	DBCOLUMN:nemsdpo.majsmaj_inv_cis	DBCOLUMN:nemsdpo.majsmaj_trida	DBCOLUMN:nemsdpo.majsmaj_dat_por	DBCOLUMN:nemsdpo.majsmaj_dat_zar	DBCOLUMN:nemsdpo.majsmaj_dat_vyr	DBCOLUMN:nemsdpo.majsmaj_c	DBCOLUMN:nemsdpo.majsmaj_mat_akt	DBCOLUMN:nemsdpo.majsprn_vymera_par	DBCOLUMN:nemsdpo.nemsvla_podil_citatel	DBCOLUMN:nemsdpo.nemsvla_podil_jmenov	DBCOLUMN:nemsdpo.nemsvla_podil	DBCOLUMN:nemsdpo.majsprn_podil_citatel	DBCOLUMN:nemsdpo.majsprn_podil_jmenov	DBCOLUMN:nemsdpo.majsprn_podil	DBCOLUMN:nemsdpo.majsprn_s_vecne_bremeno	DBCOLUMN:nemsdpo.majsprn_s_zastavni_pravo	DBCOLUMN:nemsdpo.majsprn_s_vecne_bremeno_txt	DBCOLUMN:nemsdpo.majsprn_s_zastavni_pravo_txt	DBCOLUMN:nemsdpo.s_vecne_bremeno_txt	DBCOLUMN:nemsdpo.s_zastavni_pravo_txt	DBCOLUMN:nemsdpo.maj_podil_rozdil	DBCOLUMN:nemsdpo.vecne_bremeno_rozdil	DBCOLUMN:nemsdpo.zastavni_pravo_rozdil*/
	interface GNemsbuDto {
		/**DBCOLUMN:nemsdpo.id_budovy*/
		id_budovy?: string|null;
		/**DBCOLUMN:nemsdpo.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.dat_zaniku*/
		dat_zaniku?: JsonDate|null;
		/**dopsane*/
		dat_por?: JsonDate|null;
		/**dopsane*/
		dat_zar?: JsonDate|null;
		/**dopsane*/
		dat_vyr?: JsonDate|null;
		/**dopsane*/
		dat_zahajeni?: JsonDate|null;
		/**dopsane*/
		dat_vkladu?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.typ_budovy*/
		typ_budovy?: number|null;
		/**DBCOLUMN:nemsdpo.kod_kat_uzemi*/
		kod_kat_uzemi?: number|null;
		/**DBCOLUMN:nemsdpo.cislo_tel*/
		cislo_tel?: number|null;
		/**DBCOLUMN:nemsdpo.cislo_domovni*/
		cislo_domovni?: number|null;
		/**DBCOLUMN:nemsdpo.id_telesa*/
		id_telesa?: string|null;
		/**DBCOLUMN:nemsdpo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsdpo.osu_rodne_cislo*/
		osu_rodne_cislo?: string|null;
		/**DBCOLUMN:nemsdpo.osu_ico_num*/
		osu_ico_num?: number|null;
		/**DBCOLUMN:nemsdpo.osu_nazev_osu*/
		osu_nazev_osu?: string|null;
		/**DBCOLUMN:nemsdpo.osu_jmeno*/
		osu_jmeno?: string|null;
		/**DBCOLUMN:nemsdpo.osu_prijmeni*/
		osu_prijmeni?: string|null;
		/**DBCOLUMN:nemsdpo.nazev_kat_uzemi*/
		nazev_kat_uzemi?: string|null;
		/**DBCOLUMN:nemsdpo.nazev_zp_vyuz_bud*/
		nazev_zp_vyuz_bud?: string|null;
		/**DBCOLUMN:nemsdpo.nazev_typ_budovy*/
		nazev_typ_budovy?: string|null;
		/**DBCOLUMN:nemsdpo.budova_nazev*/
		budova_nazev?: string|null;
		/**DBCOLUMN:nemsdpo.nemscob_nazev_casti_obce*/
		nemscob_nazev_casti_obce?: string|null;
		/**DBCOLUMN:nemsdpo.nemsobc_obec_nazev*/
		nemsobc_obec_nazev?: string|null;
		/**DBCOLUMN:nemsdpo.c_cena_oc*/
		c_cena_oc?: JsonDecimal|null;
		/**DBCOLUMN:nemsdpo.tpv_typ_pr_vztahu*/
		tpv_typ_pr_vztahu?: string|null;
		/**DBCOLUMN:nemsdpo.cos_nazev_charoprsubj*/
		cos_nazev_charoprsubj?: string|null;
		/**DBCOLUMN:nemsdpo.nemstza_nazev_tza*/
		nemstza_nazev_tza?: string|null;
		/**DBCOLUMN:nemsdpo.nemszaz_dat_zaz*/
		nemszaz_dat_zaz?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.nemstxt_obsah*/
		nemstxt_obsah?: string|null;
		/**DBCOLUMN:nemsdpo.s_vecne_bremeno*/
		s_vecne_bremeno?: number|null;
		/**DBCOLUMN:nemsdpo.s_zastavni_pravo*/
		s_zastavni_pravo?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_ixs_maj*/
		majsmaj_ixs_maj?: string|null;
		/**DBCOLUMN:nemsdpo.majsprn_ser_cis*/
		majsprn_ser_cis?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_inv_cis*/
		majsprn_inv_cis?: string|null;
		/**DBCOLUMN:nemsdpo.majsprn_ico*/
		majsprn_ico?: string|null;
		/**DBCOLUMN:nemsdpo.majsmaj_trida*/
		majsmaj_trida?: string|null;
		/**DBCOLUMN:nemsdpo.majsmaj_dat_por*/
		majsmaj_dat_por?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.majsmaj_dat_zar*/
		majsmaj_dat_zar?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.majsmaj_dat_vyr*/
		majsmaj_dat_vyr?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.majsmaj_c*/
		majsmaj_c?: JsonDecimal|null;
		/**DBCOLUMN:nemsdpo.majsmaj_mat_akt*/
		majsmaj_mat_akt?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_vymera_par*/
		majsprn_vymera_par?: number|null;
		/**DBCOLUMN:nemsdpo.nemsvla_podil_citatel*/
		nemsvla_podil_citatel?: number|null;
		/**DBCOLUMN:nemsdpo.nemsvla_podil_jmenov*/
		nemsvla_podil_jmenov?: number|null;
		/**DBCOLUMN:nemsdpo.nemsvla_podil*/
		nemsvla_podil?: string|null;
		/**DBCOLUMN:nemsdpo.majsprn_podil_citatel*/
		majsprn_podil_citatel?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_podil_jmenov*/
		majsprn_podil_jmenov?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_podil*/
		majsprn_podil?: string|null;
		/**DBCOLUMN:nemsdpo.majsprn_s_vecne_bremeno*/
		majsprn_s_vecne_bremeno?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_s_zastavni_pravo*/
		majsprn_s_zastavni_pravo?: number|null;
		/**DBCOLUMN:nemsdpo.majsprn_s_vecne_bremeno_txt*/
		majsprn_s_vecne_bremeno_txt?: string|null;
		/**DBCOLUMN:nemsdpo.majsprn_s_zastavni_pravo_txt*/
		majsprn_s_zastavni_pravo_txt?: string|null;
		/**DBCOLUMN:nemsdpo.s_vecne_bremeno_txt*/
		s_vecne_bremeno_txt?: string|null;
		/**DBCOLUMN:nemsdpo.s_zastavni_pravo_txt*/
		s_zastavni_pravo_txt?: string|null;
		/**DBCOLUMN:nemsdpo.maj_podil_rozdil*/
		maj_podil_rozdil?: number|null;
		/**DBCOLUMN:nemsdpo.vecne_bremeno_rozdil*/
		vecne_bremeno_rozdil?: number|null;
		/**DBCOLUMN:nemsdpo.zastavni_pravo_rozdil*/
		zastavni_pravo_rozdil?: number|null;
	}
	const enum GNemsbuDtoNames { id_budovy = "id_budovy", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", typ_budovy = "typ_budovy", kod_kat_uzemi = "kod_kat_uzemi", cislo_tel = "cislo_tel", cislo_domovni = "cislo_domovni", id_telesa = "id_telesa", aktivita = "aktivita", osu_rodne_cislo = "osu_rodne_cislo", osu_ico_num = "osu_ico_num", osu_nazev_osu = "osu_nazev_osu", osu_jmeno = "osu_jmeno", osu_prijmeni = "osu_prijmeni", nazev_kat_uzemi = "nazev_kat_uzemi", nazev_zp_vyuz_bud = "nazev_zp_vyuz_bud", nazev_typ_budovy = "nazev_typ_budovy", budova_nazev = "budova_nazev", nemscob_nazev_casti_obce = "nemscob_nazev_casti_obce", nemsobc_obec_nazev = "nemsobc_obec_nazev", c_cena_oc = "c_cena_oc", tpv_typ_pr_vztahu = "tpv_typ_pr_vztahu", cos_nazev_charoprsubj = "cos_nazev_charoprsubj", nemstza_nazev_tza = "nemstza_nazev_tza", nemszaz_dat_zaz = "nemszaz_dat_zaz", nemstxt_obsah = "nemstxt_obsah", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", majsmaj_ixs_maj = "majsmaj_ixs_maj", majsprn_ser_cis = "majsprn_ser_cis", majsprn_inv_cis = "majsprn_inv_cis", majsprn_ico = "majsprn_ico", majsmaj_trida = "majsmaj_trida", majsmaj_dat_por = "majsmaj_dat_por", majsmaj_dat_zar = "majsmaj_dat_zar", majsmaj_dat_vyr = "majsmaj_dat_vyr", majsmaj_c = "majsmaj_c", majsmaj_mat_akt = "majsmaj_mat_akt", majsprn_vymera_par = "majsprn_vymera_par", nemsvla_podil_citatel = "nemsvla_podil_citatel", nemsvla_podil_jmenov = "nemsvla_podil_jmenov", nemsvla_podil = "nemsvla_podil", majsprn_podil_citatel = "majsprn_podil_citatel", majsprn_podil_jmenov = "majsprn_podil_jmenov", majsprn_podil = "majsprn_podil", majsprn_s_vecne_bremeno = "majsprn_s_vecne_bremeno", majsprn_s_zastavni_pravo = "majsprn_s_zastavni_pravo", majsprn_s_vecne_bremeno_txt = "majsprn_s_vecne_bremeno_txt", majsprn_s_zastavni_pravo_txt = "majsprn_s_zastavni_pravo_txt", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil",}
	const enum GNemsbuDtoFragments { id_budovy = "*", dat_vzniku = "*", dat_zaniku = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", dat_zahajeni = "*", dat_vkladu = "*", typ_budovy = "*", kod_kat_uzemi = "*", cislo_tel = "*", cislo_domovni = "*", id_telesa = "*", aktivita = "*", osu_rodne_cislo = "*", osu_ico_num = "*", osu_nazev_osu = "*", osu_jmeno = "*", osu_prijmeni = "*", nazev_kat_uzemi = "*", nazev_zp_vyuz_bud = "*", nazev_typ_budovy = "*", budova_nazev = "*", nemscob_nazev_casti_obce = "*", nemsobc_obec_nazev = "*", c_cena_oc = "*", tpv_typ_pr_vztahu = "*", cos_nazev_charoprsubj = "*", nemstza_nazev_tza = "*", nemszaz_dat_zaz = "*", nemstxt_obsah = "*", s_vecne_bremeno = "*", s_zastavni_pravo = "*", majsmaj_ixs_maj = "*", majsprn_ser_cis = "*", majsprn_inv_cis = "*", majsprn_ico = "*", majsmaj_trida = "*", majsmaj_dat_por = "*", majsmaj_dat_zar = "*", majsmaj_dat_vyr = "*", majsmaj_c = "*", majsmaj_mat_akt = "*", majsprn_vymera_par = "*", nemsvla_podil_citatel = "*", nemsvla_podil_jmenov = "*", nemsvla_podil = "*", majsprn_podil_citatel = "*", majsprn_podil_jmenov = "*", majsprn_podil = "*", majsprn_s_vecne_bremeno = "*", majsprn_s_zastavni_pravo = "*", majsprn_s_vecne_bremeno_txt = "*", majsprn_s_zastavni_pravo_txt = "*", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*",}
	const enum GNemsbuDtoTypes { id_budovy = "string", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", typ_budovy = "number", kod_kat_uzemi = "number", cislo_tel = "number", cislo_domovni = "number", id_telesa = "string", aktivita = "number", osu_rodne_cislo = "string", osu_ico_num = "number", osu_nazev_osu = "string", osu_jmeno = "string", osu_prijmeni = "string", nazev_kat_uzemi = "string", nazev_zp_vyuz_bud = "string", nazev_typ_budovy = "string", budova_nazev = "string", nemscob_nazev_casti_obce = "string", nemsobc_obec_nazev = "string", c_cena_oc = "JsonDecimal", tpv_typ_pr_vztahu = "string", cos_nazev_charoprsubj = "string", nemstza_nazev_tza = "string", nemszaz_dat_zaz = "JsonDate", nemstxt_obsah = "string", s_vecne_bremeno = "number", s_zastavni_pravo = "number", majsmaj_ixs_maj = "string", majsprn_ser_cis = "number", majsprn_inv_cis = "string", majsprn_ico = "string", majsmaj_trida = "string", majsmaj_dat_por = "JsonDate", majsmaj_dat_zar = "JsonDate", majsmaj_dat_vyr = "JsonDate", majsmaj_c = "JsonDecimal", majsmaj_mat_akt = "number", majsprn_vymera_par = "number", nemsvla_podil_citatel = "number", nemsvla_podil_jmenov = "number", nemsvla_podil = "string", majsprn_podil_citatel = "number", majsprn_podil_jmenov = "number", majsprn_podil = "string", majsprn_s_vecne_bremeno = "number", majsprn_s_zastavni_pravo = "number", majsprn_s_vecne_bremeno_txt = "string", majsprn_s_zastavni_pravo_txt = "string", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number",}
	const enum GNemsbuDtoTypeLengths { id_budovy = 30, id_telesa = 30, osu_rodne_cislo = 10, osu_nazev_osu = 254, nazev_kat_uzemi = 48, nazev_zp_vyuz_bud = 60, nazev_typ_budovy = 60, budova_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemsdpoDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsdpo*/
	interface GNemsdpoDto {
		/**DBCOLUMN:nemsdpo.druh_poz*/
		druh_poz?: number|null;
		/**DBCOLUMN:nemsdpo.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:nemsdpo.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:nemsdpo.dat_platnost_od*/
		dat_platnost_od?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.dat_platnost_do*/
		dat_platnost_do?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.s_zemedel_kult*/
		s_zemedel_kult?: number|null;
		/**DBCOLUMN:nemsdpo.s_stavebni_par*/
		s_stavebni_par?: number|null;
		/**DBCOLUMN:nemsdpo.ixs_dav*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsdpo.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsdpo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsdpo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsdpo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:nemsdpo.dr_poz_oc*/
		dr_poz_oc?: number|null;
		/**DBCOLUMN:nemsdpo.c_cena_oc*/
		c_cena_oc?: JsonDecimal|null;
	}
	const enum GNemsdpoDtoNames { druh_poz = "druh_poz", nazev = "nazev", zkratka = "zkratka", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", s_zemedel_kult = "s_zemedel_kult", s_stavebni_par = "s_stavebni_par", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dr_poz_oc = "dr_poz_oc", c_cena_oc = "c_cena_oc",}
	const enum GNemsdpoDtoFragments { druh_poz = "*", nazev = "*", zkratka = "*", dat_platnost_od = "*", dat_platnost_do = "*", s_zemedel_kult = "*", s_stavebni_par = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dr_poz_oc = "*", c_cena_oc = "*",}
	const enum GNemsdpoDtoTypes { druh_poz = "number", nazev = "string", zkratka = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", s_zemedel_kult = "number", s_stavebni_par = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dr_poz_oc = "number", c_cena_oc = "JsonDecimal",}
	const enum GNemsdpoDtoTypeLengths { nazev = 60, zkratka = 9, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemsjedDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBCOLUMN:nemsjed.id_jednotky	DBCOLUMN:nemsjed.typ_jednotky	DBCOLUMN:nemsjed.cislo_jednotky	DBCOLUMN:nemsjed.cis_jed_part_cdom	DBCOLUMN:nemsjed.cis_jed_part_jed	DBCOLUMN:nemsjed.aktivita	DBCOLUMN:nemsjed.cislo_tel	DBCOLUMN:nemsjed.cislo_domovni	DBCOLUMN:nemsjed.id_telesa	DBCOLUMN:nemsjed.osu_rodne_cislo	DBCOLUMN:nemsjed.osu_ico_num	DBCOLUMN:nemsjed.osu_nazev_osu	DBCOLUMN:nemsjed.osu_jmeno	DBCOLUMN:nemsjed.osu_prijmeni	DBCOLUMN:nemsjed.nazev_kat_uzemi	DBCOLUMN:nemsjed.nazev_zp_vyuz_jed	DBCOLUMN:nemsjed.nazev_typ_jednotky	DBCOLUMN:nemsjed.jednotka_nazev	DBCOLUMN:nemsjed.dat_vzniku	DBCOLUMN:nemsjed.dat_zaniku	DBCOLUMN:nemsjed.kod_kat_uzemi	DBCOLUMN:nemsjed.nemsobc_obec_nazev	DBCOLUMN:nemsjed.nemscob_nazev_casti_obce	DBCOLUMN:nemsjed.cos_nazev_charoprsubj	DBCOLUMN:nemsjed.tpv_typ_pr_vztahu	DBCOLUMN:nemsjed.c_cena_oc	DBCOLUMN:nemsjed.nemstza_nazev_tza	DBCOLUMN:nemsjed.nemszaz_dat_zaz	DBCOLUMN:nemsjed.nemstxt_obsah	DBCOLUMN:nemsjed.s_vecne_bremeno	DBCOLUMN:nemsjed.s_zastavni_pravo	DBCOLUMN:nemsjed.majsprn_ixs_maj	DBCOLUMN:nemsjed.majsprn_ser_cis	DBCOLUMN:nemsjed.majsmaj_inv_cis	DBCOLUMN:nemsjed.majsmaj_trida	DBCOLUMN:nemsjed.majsmaj_dat_por	DBCOLUMN:nemsjed.majsmaj_dat_zar	DBCOLUMN:nemsjed.majsmaj_dat_vyr	DBCOLUMN:nemsjed.majsmaj_c	DBCOLUMN:nemsjed.majsmaj_mat_akt	DBCOLUMN:nemsjed.majsprn_vymera_par	DBCOLUMN:nemsjed.nemsvla_podil_citatel	DBCOLUMN:nemsjed.nemsvla_podil_jmenov	DBCOLUMN:nemsjed.nemsvla_podil	DBCOLUMN:nemsjed.majsprn_podil_citatel	DBCOLUMN:nemsjed.majsprn_podil_jmenov	DBCOLUMN:nemsjed.majsprn_podil	DBCOLUMN:nemsjed.majsprn_s_vecne_bremeno	DBCOLUMN:nemsjed.majsprn_s_zastavni_pravo	DBCOLUMN:nemsjed.majsprn_s_vecne_bremeno_txt	DBCOLUMN:nemsjed.majsprn_s_zastavni_pravo_txt	DBCOLUMN:nemsjed.s_vecne_bremeno_txt	DBCOLUMN:nemsjed.s_zastavni_pravo_txt	DBCOLUMN:nemsjed.maj_podil_rozdil	DBCOLUMN:nemsjed.vecne_bremeno_rozdil	DBCOLUMN:nemsjed.zastavni_pravo_rozdil*/
	interface GNemsjedDto {
		/**DBCOLUMN:nemsjed.id_jednotky*/
		id_jednotky?: string|null;
		/**DBCOLUMN:nemsjed.typ_jednotky*/
		typ_jednotky?: number|null;
		/**DBCOLUMN:nemsjed.cislo_jednotky*/
		cislo_jednotky?: JsonDecimal|null;
		/**DBCOLUMN:nemsjed.cis_jed_part_cdom*/
		cis_jed_part_cdom?: number|null;
		/**DBCOLUMN:nemsjed.cis_jed_part_jed*/
		cis_jed_part_jed?: number|null;
		/**DBCOLUMN:nemsjed.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsjed.cislo_tel*/
		cislo_tel?: number|null;
		/**DBCOLUMN:nemsjed.cislo_domovni*/
		cislo_domovni?: number|null;
		/**DBCOLUMN:nemsjed.id_telesa*/
		id_telesa?: string|null;
		/**DBCOLUMN:nemsjed.osu_rodne_cislo*/
		osu_rodne_cislo?: string|null;
		/**DBCOLUMN:nemsjed.osu_ico_num*/
		osu_ico_num?: number|null;
		/**DBCOLUMN:nemsjed.osu_nazev_osu*/
		osu_nazev_osu?: string|null;
		/**DBCOLUMN:nemsjed.osu_jmeno*/
		osu_jmeno?: string|null;
		/**DBCOLUMN:nemsjed.osu_prijmeni*/
		osu_prijmeni?: string|null;
		/**DBCOLUMN:nemsjed.nazev_kat_uzemi*/
		nazev_kat_uzemi?: string|null;
		/**DBCOLUMN:nemsjed.nazev_zp_vyuz_jed*/
		nazev_zp_vyuz_jed?: string|null;
		/**DBCOLUMN:nemsjed.nazev_typ_jednotky*/
		nazev_typ_jednotky?: string|null;
		/**DBCOLUMN:nemsjed.jednotka_nazev*/
		jednotka_nazev?: string|null;
		/**DBCOLUMN:nemsjed.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:nemsjed.dat_zaniku*/
		dat_zaniku?: JsonDate|null;
		/**dopsane*/
		dat_por?: JsonDate|null;
		/**dopsane*/
		dat_zar?: JsonDate|null;
		/**dopsane*/
		dat_vyr?: JsonDate|null;
		/**dopsane*/
		dat_zahajeni?: JsonDate|null;
		/**dopsane*/
		dat_vkladu?: JsonDate|null;
		/**DBCOLUMN:nemsjed.kod_kat_uzemi*/
		kod_kat_uzemi?: number|null;
		/**DBCOLUMN:nemsjed.nemsobc_obec_nazev*/
		nemsobc_obec_nazev?: string|null;
		/**DBCOLUMN:nemsjed.nemscob_nazev_casti_obce*/
		nemscob_nazev_casti_obce?: string|null;
		/**DBCOLUMN:nemsjed.cos_nazev_charoprsubj*/
		cos_nazev_charoprsubj?: string|null;
		/**DBCOLUMN:nemsjed.tpv_typ_pr_vztahu*/
		tpv_typ_pr_vztahu?: string|null;
		/**DBCOLUMN:nemsjed.c_cena_oc*/
		c_cena_oc?: JsonDecimal|null;
		/**DBCOLUMN:nemsjed.nemstza_nazev_tza*/
		nemstza_nazev_tza?: string|null;
		/**DBCOLUMN:nemsjed.nemszaz_dat_zaz*/
		nemszaz_dat_zaz?: JsonDate|null;
		/**DBCOLUMN:nemsjed.nemstxt_obsah*/
		nemstxt_obsah?: string|null;
		/**DBCOLUMN:nemsjed.s_vecne_bremeno*/
		s_vecne_bremeno?: number|null;
		/**DBCOLUMN:nemsjed.s_zastavni_pravo*/
		s_zastavni_pravo?: number|null;
		/**DBCOLUMN:nemsjed.majsmaj_ixs_maj*/
		majsmaj_ixs_maj?: string|null;
		/**DBCOLUMN:nemsjed.majsprn_ser_cis*/
		majsprn_ser_cis?: number|null;
		/**DBCOLUMN:nemsjed.majsprn_ico*/
		majsprn_ico?: string|null;
		/**DBCOLUMN:nemsjed.majsprn_inv_cis*/
		majsprn_inv_cis?: string|null;
		/**DBCOLUMN:nemsjed.majsmaj_trida*/
		majsmaj_trida?: string|null;
		/**DBCOLUMN:nemsjed.majsmaj_dat_por*/
		majsmaj_dat_por?: JsonDate|null;
		/**DBCOLUMN:nemsjed.majsmaj_dat_zar*/
		majsmaj_dat_zar?: JsonDate|null;
		/**DBCOLUMN:nemsjed.majsmaj_dat_vyr*/
		majsmaj_dat_vyr?: JsonDate|null;
		/**DBCOLUMN:nemsjed.majsmaj_c*/
		majsmaj_c?: JsonDecimal|null;
		/**DBCOLUMN:nemsjed.majsmaj_mat_akt*/
		majsmaj_mat_akt?: number|null;
		/**DBCOLUMN:nemsjed.majsprn_vymera_par*/
		majsprn_vymera_par?: number|null;
		/**DBCOLUMN:nemsjed.nemsvla_podil_citatel*/
		nemsvla_podil_citatel?: number|null;
		/**DBCOLUMN:nemsjed.nemsvla_podil_jmenov*/
		nemsvla_podil_jmenov?: number|null;
		/**DBCOLUMN:nemsjed.nemsvla_podil*/
		nemsvla_podil?: string|null;
		/**DBCOLUMN:nemsjed.majsprn_podil_citatel*/
		majsprn_podil_citatel?: number|null;
		/**DBCOLUMN:nemsjed.majsprn_podil_jmenov*/
		majsprn_podil_jmenov?: number|null;
		/**DBCOLUMN:nemsjed.majsprn_podil*/
		majsprn_podil?: string|null;
		/**DBCOLUMN:nemsjed.majsprn_s_vecne_bremeno*/
		majsprn_s_vecne_bremeno?: number|null;
		/**DBCOLUMN:nemsjed.majsprn_s_zastavni_pravo*/
		majsprn_s_zastavni_pravo?: number|null;
		/**DBCOLUMN:nemsjed.majsprn_s_vecne_bremeno_txt*/
		majsprn_s_vecne_bremeno_txt?: string|null;
		/**DBCOLUMN:nemsjed.majsprn_s_zastavni_pravo_txt*/
		majsprn_s_zastavni_pravo_txt?: string|null;
		/**DBCOLUMN:nemsjed.s_vecne_bremeno_txt*/
		s_vecne_bremeno_txt?: string|null;
		/**DBCOLUMN:nemsjed.s_zastavni_pravo_txt*/
		s_zastavni_pravo_txt?: string|null;
		/**DBCOLUMN:nemsjed.maj_podil_rozdil*/
		maj_podil_rozdil?: number|null;
		/**DBCOLUMN:nemsjed.vecne_bremeno_rozdil*/
		vecne_bremeno_rozdil?: number|null;
		/**DBCOLUMN:nemsjed.zastavni_pravo_rozdil*/
		zastavni_pravo_rozdil?: number|null;
	}
	const enum GNemsjedDtoNames { id_jednotky = "id_jednotky", typ_jednotky = "typ_jednotky", cislo_jednotky = "cislo_jednotky", cis_jed_part_cdom = "cis_jed_part_cdom", cis_jed_part_jed = "cis_jed_part_jed", aktivita = "aktivita", cislo_tel = "cislo_tel", cislo_domovni = "cislo_domovni", id_telesa = "id_telesa", osu_rodne_cislo = "osu_rodne_cislo", osu_ico_num = "osu_ico_num", osu_nazev_osu = "osu_nazev_osu", osu_jmeno = "osu_jmeno", osu_prijmeni = "osu_prijmeni", nazev_kat_uzemi = "nazev_kat_uzemi", nazev_zp_vyuz_jed = "nazev_zp_vyuz_jed", nazev_typ_jednotky = "nazev_typ_jednotky", jednotka_nazev = "jednotka_nazev", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", kod_kat_uzemi = "kod_kat_uzemi", nemsobc_obec_nazev = "nemsobc_obec_nazev", nemscob_nazev_casti_obce = "nemscob_nazev_casti_obce", cos_nazev_charoprsubj = "cos_nazev_charoprsubj", tpv_typ_pr_vztahu = "tpv_typ_pr_vztahu", c_cena_oc = "c_cena_oc", nemstza_nazev_tza = "nemstza_nazev_tza", nemszaz_dat_zaz = "nemszaz_dat_zaz", nemstxt_obsah = "nemstxt_obsah", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", majsmaj_ixs_maj = "majsmaj_ixs_maj", majsprn_ser_cis = "majsprn_ser_cis", majsprn_ico = "majsprn_ico", majsprn_inv_cis = "majsprn_inv_cis", majsmaj_trida = "majsmaj_trida", majsmaj_dat_por = "majsmaj_dat_por", majsmaj_dat_zar = "majsmaj_dat_zar", majsmaj_dat_vyr = "majsmaj_dat_vyr", majsmaj_c = "majsmaj_c", majsmaj_mat_akt = "majsmaj_mat_akt", majsprn_vymera_par = "majsprn_vymera_par", nemsvla_podil_citatel = "nemsvla_podil_citatel", nemsvla_podil_jmenov = "nemsvla_podil_jmenov", nemsvla_podil = "nemsvla_podil", majsprn_podil_citatel = "majsprn_podil_citatel", majsprn_podil_jmenov = "majsprn_podil_jmenov", majsprn_podil = "majsprn_podil", majsprn_s_vecne_bremeno = "majsprn_s_vecne_bremeno", majsprn_s_zastavni_pravo = "majsprn_s_zastavni_pravo", majsprn_s_vecne_bremeno_txt = "majsprn_s_vecne_bremeno_txt", majsprn_s_zastavni_pravo_txt = "majsprn_s_zastavni_pravo_txt", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil",}
	const enum GNemsjedDtoFragments { id_jednotky = "*", typ_jednotky = "*", cislo_jednotky = "*", cis_jed_part_cdom = "*", cis_jed_part_jed = "*", aktivita = "*", cislo_tel = "*", cislo_domovni = "*", id_telesa = "*", osu_rodne_cislo = "*", osu_ico_num = "*", osu_nazev_osu = "*", osu_jmeno = "*", osu_prijmeni = "*", nazev_kat_uzemi = "*", nazev_zp_vyuz_jed = "*", nazev_typ_jednotky = "*", jednotka_nazev = "*", dat_vzniku = "*", dat_zaniku = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", dat_zahajeni = "*", dat_vkladu = "*", kod_kat_uzemi = "*", nemsobc_obec_nazev = "*", nemscob_nazev_casti_obce = "*", cos_nazev_charoprsubj = "*", tpv_typ_pr_vztahu = "*", c_cena_oc = "*", nemstza_nazev_tza = "*", nemszaz_dat_zaz = "*", nemstxt_obsah = "*", s_vecne_bremeno = "*", s_zastavni_pravo = "*", majsmaj_ixs_maj = "*", majsprn_ser_cis = "*", majsprn_ico = "*", majsprn_inv_cis = "*", majsmaj_trida = "*", majsmaj_dat_por = "*", majsmaj_dat_zar = "*", majsmaj_dat_vyr = "*", majsmaj_c = "*", majsmaj_mat_akt = "*", majsprn_vymera_par = "*", nemsvla_podil_citatel = "*", nemsvla_podil_jmenov = "*", nemsvla_podil = "*", majsprn_podil_citatel = "*", majsprn_podil_jmenov = "*", majsprn_podil = "*", majsprn_s_vecne_bremeno = "*", majsprn_s_zastavni_pravo = "*", majsprn_s_vecne_bremeno_txt = "*", majsprn_s_zastavni_pravo_txt = "*", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*",}
	const enum GNemsjedDtoTypes { id_jednotky = "string", typ_jednotky = "number", cislo_jednotky = "JsonDecimal", cis_jed_part_cdom = "number", cis_jed_part_jed = "number", aktivita = "number", cislo_tel = "number", cislo_domovni = "number", id_telesa = "string", osu_rodne_cislo = "string", osu_ico_num = "number", osu_nazev_osu = "string", osu_jmeno = "string", osu_prijmeni = "string", nazev_kat_uzemi = "string", nazev_zp_vyuz_jed = "string", nazev_typ_jednotky = "string", jednotka_nazev = "string", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", kod_kat_uzemi = "number", nemsobc_obec_nazev = "string", nemscob_nazev_casti_obce = "string", cos_nazev_charoprsubj = "string", tpv_typ_pr_vztahu = "string", c_cena_oc = "JsonDecimal", nemstza_nazev_tza = "string", nemszaz_dat_zaz = "JsonDate", nemstxt_obsah = "string", s_vecne_bremeno = "number", s_zastavni_pravo = "number", majsmaj_ixs_maj = "string", majsprn_ser_cis = "number", majsprn_ico = "string", majsprn_inv_cis = "string", majsmaj_trida = "string", majsmaj_dat_por = "JsonDate", majsmaj_dat_zar = "JsonDate", majsmaj_dat_vyr = "JsonDate", majsmaj_c = "JsonDecimal", majsmaj_mat_akt = "number", majsprn_vymera_par = "number", nemsvla_podil_citatel = "number", nemsvla_podil_jmenov = "number", nemsvla_podil = "string", majsprn_podil_citatel = "number", majsprn_podil_jmenov = "number", majsprn_podil = "string", majsprn_s_vecne_bremeno = "number", majsprn_s_zastavni_pravo = "number", majsprn_s_vecne_bremeno_txt = "string", majsprn_s_zastavni_pravo_txt = "string", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number",}
	const enum GNemsjedDtoTypeLengths { id_jednotky = 30, id_telesa = 30, osu_rodne_cislo = 10, osu_nazev_osu = 254, nazev_kat_uzemi = 48, nazev_zp_vyuz_jed = 60, nazev_typ_jednotky = 60, jednotka_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemskatDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemskat*/
	interface GNemskatDto {
		/**DBCOLUMN:nemskat.kod_kat_uzemi*/
		kod_kat_uzemi?: number|null;
		/**DBCOLUMN:nemskat.kod_obce*/
		kod_obce?: number|null;
		/**DBCOLUMN:nemskat.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:nemskat.dat_platnost_od*/
		dat_platnost_od?: JsonDate|null;
		/**DBCOLUMN:nemskat.dat_platnost_do*/
		dat_platnost_do?: JsonDate|null;
		/**DBCOLUMN:nemskat.ixs_dav*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemskat.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemskat.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemskat.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemskat.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:nemskat.prac_cislo*/
		prac_cislo?: number|null;
		/**DBCOLUMN:nemskat.ciselna_rada*/
		ciselna_rada?: number|null;
		obec_nazev?: string|null;
		/**Oprávnění*/
		Permissions?: Gordic.Ren.Interface.GNemskatPermissions|null;
	}
	const enum GNemskatDtoNames { kod_kat_uzemi = "kod_kat_uzemi", kod_obce = "kod_obce", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prac_cislo = "prac_cislo", ciselna_rada = "ciselna_rada", obec_nazev = "obec_nazev", Permissions = "Permissions",}
	const enum GNemskatDtoFragments { kod_kat_uzemi = "*", kod_obce = "*", nazev = "*", dat_platnost_od = "*", dat_platnost_do = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prac_cislo = "*", ciselna_rada = "*", obec_nazev = "*", Permissions = "*",}
	const enum GNemskatDtoTypes { kod_kat_uzemi = "number", kod_obce = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prac_cislo = "number", ciselna_rada = "number", obec_nazev = "string", Permissions = "Gordic.Ren.Interface.GNemskatPermissions",}
	const enum GNemskatDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemsparDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBCOLUMN:nemspar.id_parcely	DBCOLUMN:nemspar.dat_vzniku	DBCOLUMN:nemspar.dat_zaniku	DBCOLUMN:nemspar.typ_parcely	DBCOLUMN:nemspar.kod_kat_uzemi	DBCOLUMN:nemspar.druh_cis_par	DBCOLUMN:nemspar.kmen_cislo_par	DBCOLUMN:nemspar.podd_cisla_par	DBCOLUMN:nemspar.dil_parcely	DBCOLUMN:nemspar.vymena_par	DBCOLUMN:nemspar.aktivita	DBCOLUMN:nemspar.c_cena_oc	DBCOLUMN:nemspar.osu_rodne_cislo	DBCOLUMN:nemspar.osu_ico_num	osu_nazev_osu	DBCOLUMN:nemspar.osu_jmeno	DBCOLUMN:nemspar.osu_prijmeni	DBCOLUMN:nemspar.tpv_typ_pr_vztahu	DBCOLUMN:nemspar.cos_nazev_charoprsubj	DBCOLUMN:nemspar.nazev_kat_uzemi	DBCOLUMN:nemspar.cislo_tel	DBCOLUMN:nemspar.nazev_zp_vyuz_poz	DBCOLUMN:nemspar.nazev_druh_poz	DBCOLUMN:nemspar.bud_cislo_domovni	DBCOLUMN:nemspar.nazev_zp_vyuz_bud	DBCOLUMN:nemspar.nemstza_nazev_tza	DBCOLUMN:nemspar.nemszaz_dat_zaz	DBCOLUMN:nemspar.nemstxt_obsah	DBCOLUMN:nemspar.s_vecne_bremeno	DBCOLUMN:nemspar.s_zastavni_pravo	DBCOLUMN:nemspar.majsprn_ixs_maj	DBCOLUMN:nemspar.majsprn_ser_cis	DBCOLUMN:nemspar.majsmaj_inv_cis	DBCOLUMN:nemspar.majsmaj_trida	DBCOLUMN:nemspar.majsmaj_dat_por	DBCOLUMN:nemspar.majsmaj_dat_zar	DBCOLUMN:nemspar.majsmaj_dat_vyr	DBCOLUMN:nemspar.majsmaj_c	DBCOLUMN:nemspar.majsmaj_mat_akt	DBCOLUMN:nemspar.majsprn_vymera_par	DBCOLUMN:nemspar.nemsvla_podil_citatel	DBCOLUMN:nemspar.nemsvla_podil_jmenov	DBCOLUMN:nemspar.nemsvla_podil	DBCOLUMN:nemspar.majsprn_podil_citatel	DBCOLUMN:nemspar.majsprn_podil_jmenov	DBCOLUMN:nemspar.majsprn_podil	DBCOLUMN:nemspar.majsprn_nazev_druh_poz	DBCOLUMN:nemspar.majsprn_s_vecne_bremeno	DBCOLUMN:nemspar.majsprn_s_zastavni_pravo	DBCOLUMN:nemspar.majsprn_s_vecne_bremeno_txt	DBCOLUMN:nemspar.majsprn_s_zastavni_pravo_txt	DBCOLUMN:nemspar.s_vecne_bremeno_txt	DBCOLUMN:nemspar.s_zastavni_pravo_txt	DBCOLUMN:nemspar.druh_poz	DBCOLUMN:nemspar.majsprn_druh_poz	DBCOLUMN:nemspar.druh_poz_rozdil	DBCOLUMN:nemspar.vymera_par_rozdil	DBCOLUMN:nemspar.maj_podil_rozdil	DBCOLUMN:nemspar.vecne_bremeno_rozdil	DBCOLUMN:nemspar.zastavni_pravo_rozdil	DBTABLE:nemspar*/
	interface GNemsparDto {
		/**Autogenerated.*/
		id_parcely?: string|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**dopsane*/
		dat_por?: JsonDate|null;
		/**dopsane*/
		dat_zar?: JsonDate|null;
		/**dopsane*/
		dat_vyr?: JsonDate|null;
		/**dopsane*/
		dat_zahajeni?: JsonDate|null;
		/**dopsane*/
		dat_vkladu?: JsonDate|null;
		/**Autogenerated.*/
		typ_parcely?: string|null;
		/**Autogenerated.*/
		kod_kat_uzemi?: number|null;
		/**Autogenerated.*/
		druh_cis_par?: number|null;
		/**Autogenerated.*/
		kmen_cislo_par?: number|null;
		/**Autogenerated.*/
		podd_cisla_par?: number|null;
		/**Autogenerated.*/
		dil_parcely?: number|null;
		/**Autogenerated.*/
		vymera_par?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		c_cena_oc?: JsonDecimal|null;
		/**Autogenerated.*/
		osu_rodne_cislo?: string|null;
		/**Autogenerated.*/
		osu_ico_num?: number|null;
		/**Autogenerated.*/
		osu_nazev_osu?: string|null;
		/**Název parcely*/
		parcela_nazev?: string|null;
		/**Autogenerated.*/
		osu_jmeno?: string|null;
		/**Autogenerated.*/
		osu_prijmeni?: string|null;
		/**Autogenerated.*/
		tpv_typ_pr_vztahu?: string|null;
		/**Autogenerated.*/
		cos_nazev_charoprsubj?: string|null;
		/**Autogenerated.*/
		nazev_kat_uzemi?: string|null;
		/**Autogenerated.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		nazev_zp_vyuz_poz?: string|null;
		/**Autogenerated.*/
		nazev_druh_poz?: string|null;
		/**Autogenerated.*/
		bud_cislo_domovni?: number|null;
		/**Autogenerated.*/
		nazev_zp_vyuz_bud?: string|null;
		/**Autogenerated.*/
		nemstza_nazev_tza?: string|null;
		/**Autogenerated.*/
		nemszaz_dat_zaz?: JsonDate|null;
		/**Autogenerated.*/
		nemstxt_obsah?: string|null;
		/**Autogenerated.*/
		s_vecne_bremeno?: number|null;
		/**Autogenerated.*/
		s_zastavni_pravo?: number|null;
		/**Autogenerated.*/
		majsmaj_ixs_maj?: string|null;
		/**Autogenerated.*/
		majsprn_ser_cis?: number|null;
		/**Autogenerated.*/
		majsprn_ico?: string|null;
		/**Autogenerated.*/
		majsprn_inv_cis?: string|null;
		/**Autogenerated.*/
		majsmaj_trida?: string|null;
		/**Autogenerated.*/
		majsmaj_dat_por?: JsonDate|null;
		/**Autogenerated.*/
		majsmaj_dat_zar?: JsonDate|null;
		/**Autogenerated.*/
		majsmaj_dat_vyr?: JsonDate|null;
		/**Autogenerated.*/
		majsmaj_c?: JsonDecimal|null;
		/**Autogenerated.*/
		majsmaj_mat_akt?: number|null;
		/**Autogenerated.*/
		majsprn_vymera_par?: number|null;
		/**Autogenerated.*/
		nemsvla_podil_citatel?: number|null;
		/**Autogenerated.*/
		nemsvla_podil_jmenov?: number|null;
		/**Autogenerated.*/
		nemsvla_podil?: string|null;
		/**Autogenerated.*/
		majsprn_podil_citatel?: number|null;
		/**Autogenerated.*/
		majsprn_podil_jmenov?: number|null;
		/**Autogenerated.*/
		majsprn_podil?: string|null;
		/**Autogenerated.*/
		majsprn_nazev_druh_poz?: string|null;
		/**Autogenerated.*/
		majsprn_s_vecne_bremeno?: number|null;
		/**Autogenerated.*/
		majsprn_s_zastavni_pravo?: number|null;
		/**Autogenerated.*/
		majsprn_s_vecne_bremeno_txt?: string|null;
		/**Autogenerated.*/
		majsprn_s_zastavni_pravo_txt?: string|null;
		/**Autogenerated.*/
		s_vecne_bremeno_txt?: string|null;
		/**Autogenerated.*/
		s_zastavni_pravo_txt?: string|null;
		/**Autogenerated.*/
		druh_poz?: number|null;
		/**Autogenerated.*/
		majsprn_druh_poz?: number|null;
		/**Autogenerated.*/
		druh_poz_rozdil?: number|null;
		/**Autogenerated.*/
		vymera_par_rozdil?: number|null;
		/**Autogenerated.*/
		maj_podil_rozdil?: number|null;
		/**Autogenerated.*/
		vecne_bremeno_rozdil?: number|null;
		/**Autogenerated.*/
		zastavni_pravo_rozdil?: number|null;
	}
	const enum GNemsparDtoNames { id_parcely = "id_parcely", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", typ_parcely = "typ_parcely", kod_kat_uzemi = "kod_kat_uzemi", druh_cis_par = "druh_cis_par", kmen_cislo_par = "kmen_cislo_par", podd_cisla_par = "podd_cisla_par", dil_parcely = "dil_parcely", vymera_par = "vymera_par", aktivita = "aktivita", c_cena_oc = "c_cena_oc", osu_rodne_cislo = "osu_rodne_cislo", osu_ico_num = "osu_ico_num", osu_nazev_osu = "osu_nazev_osu", parcela_nazev = "parcela_nazev", osu_jmeno = "osu_jmeno", osu_prijmeni = "osu_prijmeni", tpv_typ_pr_vztahu = "tpv_typ_pr_vztahu", cos_nazev_charoprsubj = "cos_nazev_charoprsubj", nazev_kat_uzemi = "nazev_kat_uzemi", cislo_tel = "cislo_tel", nazev_zp_vyuz_poz = "nazev_zp_vyuz_poz", nazev_druh_poz = "nazev_druh_poz", bud_cislo_domovni = "bud_cislo_domovni", nazev_zp_vyuz_bud = "nazev_zp_vyuz_bud", nemstza_nazev_tza = "nemstza_nazev_tza", nemszaz_dat_zaz = "nemszaz_dat_zaz", nemstxt_obsah = "nemstxt_obsah", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", majsmaj_ixs_maj = "majsmaj_ixs_maj", majsprn_ser_cis = "majsprn_ser_cis", majsprn_ico = "majsprn_ico", majsprn_inv_cis = "majsprn_inv_cis", majsmaj_trida = "majsmaj_trida", majsmaj_dat_por = "majsmaj_dat_por", majsmaj_dat_zar = "majsmaj_dat_zar", majsmaj_dat_vyr = "majsmaj_dat_vyr", majsmaj_c = "majsmaj_c", majsmaj_mat_akt = "majsmaj_mat_akt", majsprn_vymera_par = "majsprn_vymera_par", nemsvla_podil_citatel = "nemsvla_podil_citatel", nemsvla_podil_jmenov = "nemsvla_podil_jmenov", nemsvla_podil = "nemsvla_podil", majsprn_podil_citatel = "majsprn_podil_citatel", majsprn_podil_jmenov = "majsprn_podil_jmenov", majsprn_podil = "majsprn_podil", majsprn_nazev_druh_poz = "majsprn_nazev_druh_poz", majsprn_s_vecne_bremeno = "majsprn_s_vecne_bremeno", majsprn_s_zastavni_pravo = "majsprn_s_zastavni_pravo", majsprn_s_vecne_bremeno_txt = "majsprn_s_vecne_bremeno_txt", majsprn_s_zastavni_pravo_txt = "majsprn_s_zastavni_pravo_txt", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", druh_poz = "druh_poz", majsprn_druh_poz = "majsprn_druh_poz", druh_poz_rozdil = "druh_poz_rozdil", vymera_par_rozdil = "vymera_par_rozdil", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil",}
	const enum GNemsparDtoFragments { id_parcely = "*", dat_vzniku = "*", dat_zaniku = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", dat_zahajeni = "*", dat_vkladu = "*", typ_parcely = "*", kod_kat_uzemi = "*", druh_cis_par = "*", kmen_cislo_par = "*", podd_cisla_par = "*", dil_parcely = "*", vymera_par = "*", aktivita = "*", c_cena_oc = "*", osu_rodne_cislo = "*", osu_ico_num = "*", osu_nazev_osu = "*", parcela_nazev = "*", osu_jmeno = "*", osu_prijmeni = "*", tpv_typ_pr_vztahu = "*", cos_nazev_charoprsubj = "*", nazev_kat_uzemi = "*", cislo_tel = "*", nazev_zp_vyuz_poz = "*", nazev_druh_poz = "*", bud_cislo_domovni = "*", nazev_zp_vyuz_bud = "*", nemstza_nazev_tza = "*", nemszaz_dat_zaz = "*", nemstxt_obsah = "*", s_vecne_bremeno = "*", s_zastavni_pravo = "*", majsmaj_ixs_maj = "*", majsprn_ser_cis = "*", majsprn_ico = "*", majsprn_inv_cis = "*", majsmaj_trida = "*", majsmaj_dat_por = "*", majsmaj_dat_zar = "*", majsmaj_dat_vyr = "*", majsmaj_c = "*", majsmaj_mat_akt = "*", majsprn_vymera_par = "*", nemsvla_podil_citatel = "*", nemsvla_podil_jmenov = "*", nemsvla_podil = "*", majsprn_podil_citatel = "*", majsprn_podil_jmenov = "*", majsprn_podil = "*", majsprn_nazev_druh_poz = "*", majsprn_s_vecne_bremeno = "*", majsprn_s_zastavni_pravo = "*", majsprn_s_vecne_bremeno_txt = "*", majsprn_s_zastavni_pravo_txt = "*", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", druh_poz = "*", majsprn_druh_poz = "*", druh_poz_rozdil = "*", vymera_par_rozdil = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*",}
	const enum GNemsparDtoTypes { id_parcely = "string", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", typ_parcely = "string", kod_kat_uzemi = "number", druh_cis_par = "number", kmen_cislo_par = "number", podd_cisla_par = "number", dil_parcely = "number", vymera_par = "number", aktivita = "number", c_cena_oc = "JsonDecimal", osu_rodne_cislo = "string", osu_ico_num = "number", osu_nazev_osu = "string", parcela_nazev = "string", osu_jmeno = "string", osu_prijmeni = "string", tpv_typ_pr_vztahu = "string", cos_nazev_charoprsubj = "string", nazev_kat_uzemi = "string", cislo_tel = "number", nazev_zp_vyuz_poz = "string", nazev_druh_poz = "string", bud_cislo_domovni = "number", nazev_zp_vyuz_bud = "string", nemstza_nazev_tza = "string", nemszaz_dat_zaz = "JsonDate", nemstxt_obsah = "string", s_vecne_bremeno = "number", s_zastavni_pravo = "number", majsmaj_ixs_maj = "string", majsprn_ser_cis = "number", majsprn_ico = "string", majsprn_inv_cis = "string", majsmaj_trida = "string", majsmaj_dat_por = "JsonDate", majsmaj_dat_zar = "JsonDate", majsmaj_dat_vyr = "JsonDate", majsmaj_c = "JsonDecimal", majsmaj_mat_akt = "number", majsprn_vymera_par = "number", nemsvla_podil_citatel = "number", nemsvla_podil_jmenov = "number", nemsvla_podil = "string", majsprn_podil_citatel = "number", majsprn_podil_jmenov = "number", majsprn_podil = "string", majsprn_nazev_druh_poz = "string", majsprn_s_vecne_bremeno = "number", majsprn_s_zastavni_pravo = "number", majsprn_s_vecne_bremeno_txt = "string", majsprn_s_zastavni_pravo_txt = "string", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", druh_poz = "number", majsprn_druh_poz = "number", druh_poz_rozdil = "number", vymera_par_rozdil = "number", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number",}
	const enum GNemsparDtoTypeLengths { id_parcely = 30, typ_parcely = 10, osu_rodne_cislo = 10, osu_nazev_osu = 254, nazev_kat_uzemi = 48, nazev_zp_vyuz_poz = 60, nazev_druh_poz = 60,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GNemvkdpDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemvkdp*/
	interface GNemvkdpDto {
		/**DBCOLUMN:nemvkdp.kod_kat_uzemi*/
		kod_kat_uzemi?: number|null;
		/**DBCOLUMN:nemvkdp.druh_poz*/
		druh_poz?: number|null;
		/**DBCOLUMN:nemvkdp.c_cena_oc*/
		c_cena_oc?: JsonDecimal|null;
		/**DBCOLUMN:nemvkdp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemvkdp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemvkdp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemvkdp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_druh_poz*/
		nazev_druh_poz?: string|null;
		/**zkratka_druh_poz*/
		zkratka_druh_poz?: string|null;
	}
	const enum GNemvkdpDtoNames { kod_kat_uzemi = "kod_kat_uzemi", druh_poz = "druh_poz", c_cena_oc = "c_cena_oc", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_druh_poz = "nazev_druh_poz", zkratka_druh_poz = "zkratka_druh_poz",}
	const enum GNemvkdpDtoFragments { kod_kat_uzemi = "*", druh_poz = "*", c_cena_oc = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_druh_poz = "*", zkratka_druh_poz = "*",}
	const enum GNemvkdpDtoTypes { kod_kat_uzemi = "number", druh_poz = "number", c_cena_oc = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_druh_poz = "string", zkratka_druh_poz = "string",}
	const enum GNemvkdpDtoTypeLengths { poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Controls\Dto\GUcelNahlizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**WSDP Ciselnik - Účel nahlížení do katastru*/
	interface GUcelNahlizeniDto {
		/**KodUcelu*/
		kod_ucelu?: number|null;
		/**Název účelu*/
		nazev_ucelu?: string|null;
	}
	const enum GUcelNahlizeniDtoNames { kod_ucelu = "kod_ucelu", nazev_ucelu = "nazev_ucelu",}
	const enum GUcelNahlizeniDtoFragments { kod_ucelu = "*", nazev_ucelu = "*",}
	const enum GUcelNahlizeniDtoTypes { kod_ucelu = "number", nazev_ucelu = "string",}
	const enum GUcelNahlizeniDtoTypeLengths { nazev_ucelu = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Gordic.Ren.Interface.IGRenMaj.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Výčtový typ Typ Objektu*/
	const enum GTypObjektuEnum {
		/**Parcela*/
		Parcela=10,
		/**Budova*/
		Budova=20,
		/**Jednotka*/
		Jednotka=40,
		/**Právo stavby*/
		PravoStavby=50,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Gordic.Ren.Interface.IGVlastnictvi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interfce AL pro REN - Vlastnictví
	* @domain RegNemovitosti
	* @businessObject RenVlastnictvi
	*/
	interface Vlastnictvi {
		/**List - Načtení seznamu Vlastnictví*/
		listVlastnictviTelesaSVlastniky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ren.Interface.GVlastnictviDto>>;
		/**Read - Načtení detailu Vlastnictví*/
		read(rq?:Gordic.Ren.Interface.GVlastnictviDto|CallParams<GServiceReadRequest<Gordic.Ren.Interface.GVlastnictviDto>>): _Task<GServiceReadRequest<Gordic.Ren.Interface.GVlastnictviDto>,GServiceReadResponse<Gordic.Ren.Interface.GVlastnictviDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Vlastnictvi: ServiceBase & Catalog.Vlastnictvi;
	}
	const Vlastnictvi: Client["Vlastnictvi"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GBudovaNaParceleDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:~*/
	interface GBudovaNaParceleDto {
		/**nazev_obce*/
		nazev_obce?: string|null;
		/**cast obce / katastr*/
		cast_obce_katastr?: string|null;
		/**Identifikátor parcely v katastru nemovitostí*/
		id_parcely?: string|null;
		/**Typ parcely*/
		typ_parcely?: string|null;
		/**Kód katastrálního území*/
		kod_kat_uzemi?: number|null;
		/**Název katastrálního území*/
		nazev_kat_uzemi?: string|null;
		/**kod_obce_parcely*/
		kod_obce_parcely?: number|null;
		/**nazev_obce_parcely*/
		nazev_obce_parcely?: string|null;
		/**DBCOLUMN:nemspar.kmen_cislo_par*/
		kmen_cislo_par?: number|null;
		/**DBCOLUMN:nemspar.podd_cisla_par*/
		podd_cisla_par?: number|null;
		/**DBCOLUMN:nemspar.dil_parcely*/
		dil_parcely?: number|null;
		/**DBCOLUMN:nemspar.vymera_par*/
		vymera_par?: number|null;
		/**DBCOLUMN:nemspar.parcela_nazev*/
		parcela_nazev?: string|null;
		/**typ identifikace*/
		typ_identifikace?: string|null;
		/**identifikace_budovy*/
		identifikace_budovy?: string|null;
		/**DBCOLUMN:nemsbud.id_budovy*/
		id_budovy?: string|null;
		/**DBCOLUMN:nemsbud.typ_budovy*/
		typ_budovy?: number|null;
		/**nazev_typ_budovy*/
		nazev_typ_budovy?: string|null;
		/**DBCOLUMN:nemsbud.kod_casti_obce*/
		kod_casti_obce?: number|null;
		/**nazev_casti_obce*/
		nazev_casti_obce?: string|null;
		/**DBCOLUMN:nemscob.kod_obce*/
		kod_obce_budovy?: number|null;
		/**nazev_obce_budovy*/
		nazev_obce_budovy?: string|null;
		/**DBCOLUMN:nemsbud.cislo_domovni*/
		cislo_domovni?: number|null;
		/**DBCOLUMN:nemsbud.zp_vyuz_bud*/
		zp_vyuz_bud?: number|null;
		/**nazev_zp_vyuz_bud*/
		nazev_zp_vyuz_bud?: string|null;
		/**DBCOLUMN:nemsbud.budova_nazev*/
		budova_nazev?: string|null;
		/**vlastnictvi_podil_citatel*/
		vla_podil_citatel?: number|null;
		/**vlastnictvi_podil_citatel*/
		vla_podil_jmenovatel?: number|null;
		/**vlastnictvi_podil_zlomek*/
		vla_podil_zlomek?: string|null;
		/**DBCOLUMN:nemsbud.vlastnik_budovy_nazev*/
		vlastnik_budovy_nazev?: string|null;
		/**DBCOLUMN:nemsbud.vlastnik_parcely_nazev*/
		vlastnik_parcely_nazev?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj*/
		vla_id_opr_subj?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj_1*/
		vla_id_opr_subj_1?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj_2*/
		vla_id_opr_subj_2?: string|null;
		/**DBCOLUMN:nemsosu.typ_opr_subj*/
		vla_typ_opr_subj?: string|null;
		/**DBCOLUMN:nemsosu.ico_num*/
		vla_ico_num?: number|null;
		/**DBCOLUMN:nemsosu.nazev_osu*/
		vla_nazev_osu?: string|null;
		/**DBCOLUMN:nemsosu.titul_pred*/
		vla_titul_pred?: string|null;
		/**DBCOLUMN:nemsosu.jmeno*/
		vla_jmeno?: string|null;
		/**DBCOLUMN:nemsosu.prijmeni*/
		vla_prijmeni?: string|null;
		/**DBCOLUMN:nemsosu.titul_za*/
		vla_titul_za?: string|null;
		/**DBCOLUMN:nemsosu.cislo_domovni*/
		vla_cislo_domovni?: number|null;
		/**DBCOLUMN:nemsosu.cislo_orient*/
		vla_cislo_orient?: string|null;
		/**DBCOLUMN:nemsosu.nazev_ulice*/
		vla_nazev_ulice?: string|null;
		/**DBCOLUMN:nemsosu.cast_obce*/
		vla_cast_obce?: string|null;
		/**DBCOLUMN:nemsosu.obec*/
		vla_obec?: string|null;
		/**DBCOLUMN:nemsosu.okres*/
		vla_okres?: string|null;
		/**DBCOLUMN:nemsosu.stat*/
		vla_stat?: string|null;
		/**DBCOLUMN:nemsosu.psc*/
		vla_psc?: number|null;
		/**DBCOLUMN:nemsosu.mestska_cast*/
		vla_mestska_cast?: string|null;
		/**DBCOLUMN:nemsosu.cp_ce*/
		vla_cp_ce?: number|null;
		/**DBCOLUMN:nemsosu.id_opr_subj*/
		vla_1p_id_opr_subj?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj_1*/
		vla_1p_id_opr_subj_1?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj_2*/
		vla_1p_id_opr_subj_2?: string|null;
		/**DBCOLUMN:nemsosu.typ_opr_subj*/
		vla_1p_typ_opr_subj?: string|null;
		/**DBCOLUMN:nemsosu.ico_num*/
		vla_1p_ico_num?: number|null;
		/**DBCOLUMN:nemsosu.nazev_osu*/
		vla_1p_nazev_osu?: string|null;
		/**DBCOLUMN:nemsosu.titul_pred*/
		vla_1p_titul_pred?: string|null;
		/**DBCOLUMN:nemsosu.jmeno*/
		vla_1p_jmeno?: string|null;
		/**DBCOLUMN:nemsosu.prijmeni*/
		vla_1p_prijmeni?: string|null;
		/**DBCOLUMN:nemsosu.titul_za*/
		vla_1p_titul_za?: string|null;
		/**DBCOLUMN:nemsosu.cislo_domovni*/
		vla_1p_cislo_domovni?: number|null;
		/**DBCOLUMN:nemsosu.cislo_orient*/
		vla_1p_cislo_orient?: string|null;
		/**DBCOLUMN:nemsosu.nazev_ulice*/
		vla_1p_nazev_ulice?: string|null;
		/**DBCOLUMN:nemsosu.cast_obce*/
		vla_1p_cast_obce?: string|null;
		/**DBCOLUMN:nemsosu.obec*/
		vla_1p_obec?: string|null;
		/**DBCOLUMN:nemsosu.okres*/
		vla_1p_okres?: string|null;
		/**DBCOLUMN:nemsosu.stat*/
		vla_1p_stat?: string|null;
		/**DBCOLUMN:nemsosu.psc*/
		vla_1p_psc?: number|null;
		/**DBCOLUMN:nemsosu.mestska_cast*/
		vla_1p_mestska_cast?: string|null;
		/**DBCOLUMN:nemsosu.cp_ce*/
		vla_1p_cp_ce?: number|null;
		/**DBCOLUMN:nemsosu.id_opr_subj*/
		vla_2p_id_opr_subj?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj_1*/
		vla_2p_id_opr_subj_1?: string|null;
		/**DBCOLUMN:nemsosu.id_opr_subj_2*/
		vla_2p_id_opr_subj_2?: string|null;
		/**DBCOLUMN:nemsosu.typ_opr_subj*/
		vla_2p_typ_opr_subj?: string|null;
		/**DBCOLUMN:nemsosu.ico_num*/
		vla_2p_ico_num?: number|null;
		/**DBCOLUMN:nemsosu.nazev_osu*/
		vla_2p_nazev_osu?: string|null;
		/**DBCOLUMN:nemsosu.titul_pred*/
		vla_2p_titul_pred?: string|null;
		/**DBCOLUMN:nemsosu.jmeno*/
		vla_2p_jmeno?: string|null;
		/**DBCOLUMN:nemsosu.prijmeni*/
		vla_2p_prijmeni?: string|null;
		/**DBCOLUMN:nemsosu.titul_za*/
		vla_2p_titul_za?: string|null;
		/**DBCOLUMN:nemsosu.cislo_domovni*/
		vla_2p_cislo_domovni?: number|null;
		/**DBCOLUMN:nemsosu.cislo_orient*/
		vla_2p_cislo_orient?: string|null;
		/**DBCOLUMN:nemsosu.nazev_ulice*/
		vla_2p_nazev_ulice?: string|null;
		/**DBCOLUMN:nemsosu.cast_obce*/
		vla_2p_cast_obce?: string|null;
		/**DBCOLUMN:nemsosu.obec*/
		vla_2p_obec?: string|null;
		/**DBCOLUMN:nemsosu.okres*/
		vla_2p_okres?: string|null;
		/**DBCOLUMN:nemsosu.stat*/
		vla_2p_stat?: string|null;
		/**DBCOLUMN:nemsosu.psc*/
		vla_2p_psc?: number|null;
		/**DBCOLUMN:nemsosu.mestska_cast*/
		vla_2p_mestska_cast?: string|null;
		/**DBCOLUMN:nemsosu.cp_ce*/
		vla_2p_cp_ce?: number|null;
	}
	const enum GBudovaNaParceleDtoNames { nazev_obce = "nazev_obce", cast_obce_katastr = "cast_obce_katastr", id_parcely = "id_parcely", typ_parcely = "typ_parcely", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", kod_obce_parcely = "kod_obce_parcely", nazev_obce_parcely = "nazev_obce_parcely", kmen_cislo_par = "kmen_cislo_par", podd_cisla_par = "podd_cisla_par", dil_parcely = "dil_parcely", vymera_par = "vymera_par", parcela_nazev = "parcela_nazev", typ_identifikace = "typ_identifikace", identifikace_budovy = "identifikace_budovy", id_budovy = "id_budovy", typ_budovy = "typ_budovy", nazev_typ_budovy = "nazev_typ_budovy", kod_casti_obce = "kod_casti_obce", nazev_casti_obce = "nazev_casti_obce", kod_obce_budovy = "kod_obce_budovy", nazev_obce_budovy = "nazev_obce_budovy", cislo_domovni = "cislo_domovni", zp_vyuz_bud = "zp_vyuz_bud", nazev_zp_vyuz_bud = "nazev_zp_vyuz_bud", budova_nazev = "budova_nazev", vla_podil_citatel = "vla_podil_citatel", vla_podil_jmenovatel = "vla_podil_jmenovatel", vla_podil_zlomek = "vla_podil_zlomek", vlastnik_budovy_nazev = "vlastnik_budovy_nazev", vlastnik_parcely_nazev = "vlastnik_parcely_nazev", vla_id_opr_subj = "vla_id_opr_subj", vla_id_opr_subj_1 = "vla_id_opr_subj_1", vla_id_opr_subj_2 = "vla_id_opr_subj_2", vla_typ_opr_subj = "vla_typ_opr_subj", vla_ico_num = "vla_ico_num", vla_nazev_osu = "vla_nazev_osu", vla_titul_pred = "vla_titul_pred", vla_jmeno = "vla_jmeno", vla_prijmeni = "vla_prijmeni", vla_titul_za = "vla_titul_za", vla_cislo_domovni = "vla_cislo_domovni", vla_cislo_orient = "vla_cislo_orient", vla_nazev_ulice = "vla_nazev_ulice", vla_cast_obce = "vla_cast_obce", vla_obec = "vla_obec", vla_okres = "vla_okres", vla_stat = "vla_stat", vla_psc = "vla_psc", vla_mestska_cast = "vla_mestska_cast", vla_cp_ce = "vla_cp_ce", vla_1p_id_opr_subj = "vla_1p_id_opr_subj", vla_1p_id_opr_subj_1 = "vla_1p_id_opr_subj_1", vla_1p_id_opr_subj_2 = "vla_1p_id_opr_subj_2", vla_1p_typ_opr_subj = "vla_1p_typ_opr_subj", vla_1p_ico_num = "vla_1p_ico_num", vla_1p_nazev_osu = "vla_1p_nazev_osu", vla_1p_titul_pred = "vla_1p_titul_pred", vla_1p_jmeno = "vla_1p_jmeno", vla_1p_prijmeni = "vla_1p_prijmeni", vla_1p_titul_za = "vla_1p_titul_za", vla_1p_cislo_domovni = "vla_1p_cislo_domovni", vla_1p_cislo_orient = "vla_1p_cislo_orient", vla_1p_nazev_ulice = "vla_1p_nazev_ulice", vla_1p_cast_obce = "vla_1p_cast_obce", vla_1p_obec = "vla_1p_obec", vla_1p_okres = "vla_1p_okres", vla_1p_stat = "vla_1p_stat", vla_1p_psc = "vla_1p_psc", vla_1p_mestska_cast = "vla_1p_mestska_cast", vla_1p_cp_ce = "vla_1p_cp_ce", vla_2p_id_opr_subj = "vla_2p_id_opr_subj", vla_2p_id_opr_subj_1 = "vla_2p_id_opr_subj_1", vla_2p_id_opr_subj_2 = "vla_2p_id_opr_subj_2", vla_2p_typ_opr_subj = "vla_2p_typ_opr_subj", vla_2p_ico_num = "vla_2p_ico_num", vla_2p_nazev_osu = "vla_2p_nazev_osu", vla_2p_titul_pred = "vla_2p_titul_pred", vla_2p_jmeno = "vla_2p_jmeno", vla_2p_prijmeni = "vla_2p_prijmeni", vla_2p_titul_za = "vla_2p_titul_za", vla_2p_cislo_domovni = "vla_2p_cislo_domovni", vla_2p_cislo_orient = "vla_2p_cislo_orient", vla_2p_nazev_ulice = "vla_2p_nazev_ulice", vla_2p_cast_obce = "vla_2p_cast_obce", vla_2p_obec = "vla_2p_obec", vla_2p_okres = "vla_2p_okres", vla_2p_stat = "vla_2p_stat", vla_2p_psc = "vla_2p_psc", vla_2p_mestska_cast = "vla_2p_mestska_cast", vla_2p_cp_ce = "vla_2p_cp_ce",}
	const enum GBudovaNaParceleDtoFragments { nazev_obce = "*", cast_obce_katastr = "*", id_parcely = "*", typ_parcely = "*", kod_kat_uzemi = "*", nazev_kat_uzemi = "*", kod_obce_parcely = "*", nazev_obce_parcely = "*", kmen_cislo_par = "*", podd_cisla_par = "*", dil_parcely = "*", vymera_par = "*", parcela_nazev = "*", typ_identifikace = "*", identifikace_budovy = "*", id_budovy = "*", typ_budovy = "*", nazev_typ_budovy = "*", kod_casti_obce = "*", nazev_casti_obce = "*", kod_obce_budovy = "*", nazev_obce_budovy = "*", cislo_domovni = "*", zp_vyuz_bud = "*", nazev_zp_vyuz_bud = "*", budova_nazev = "*", vla_podil_citatel = "*", vla_podil_jmenovatel = "*", vla_podil_zlomek = "*", vlastnik_budovy_nazev = "*", vlastnik_parcely_nazev = "*", vla_id_opr_subj = "*", vla_id_opr_subj_1 = "*", vla_id_opr_subj_2 = "*", vla_typ_opr_subj = "*", vla_ico_num = "*", vla_nazev_osu = "*", vla_titul_pred = "*", vla_jmeno = "*", vla_prijmeni = "*", vla_titul_za = "*", vla_cislo_domovni = "*", vla_cislo_orient = "*", vla_nazev_ulice = "*", vla_cast_obce = "*", vla_obec = "*", vla_okres = "*", vla_stat = "*", vla_psc = "*", vla_mestska_cast = "*", vla_cp_ce = "*", vla_1p_id_opr_subj = "*", vla_1p_id_opr_subj_1 = "*", vla_1p_id_opr_subj_2 = "*", vla_1p_typ_opr_subj = "*", vla_1p_ico_num = "*", vla_1p_nazev_osu = "*", vla_1p_titul_pred = "*", vla_1p_jmeno = "*", vla_1p_prijmeni = "*", vla_1p_titul_za = "*", vla_1p_cislo_domovni = "*", vla_1p_cislo_orient = "*", vla_1p_nazev_ulice = "*", vla_1p_cast_obce = "*", vla_1p_obec = "*", vla_1p_okres = "*", vla_1p_stat = "*", vla_1p_psc = "*", vla_1p_mestska_cast = "*", vla_1p_cp_ce = "*", vla_2p_id_opr_subj = "*", vla_2p_id_opr_subj_1 = "*", vla_2p_id_opr_subj_2 = "*", vla_2p_typ_opr_subj = "*", vla_2p_ico_num = "*", vla_2p_nazev_osu = "*", vla_2p_titul_pred = "*", vla_2p_jmeno = "*", vla_2p_prijmeni = "*", vla_2p_titul_za = "*", vla_2p_cislo_domovni = "*", vla_2p_cislo_orient = "*", vla_2p_nazev_ulice = "*", vla_2p_cast_obce = "*", vla_2p_obec = "*", vla_2p_okres = "*", vla_2p_stat = "*", vla_2p_psc = "*", vla_2p_mestska_cast = "*", vla_2p_cp_ce = "*",}
	const enum GBudovaNaParceleDtoTypes { nazev_obce = "string", cast_obce_katastr = "string", id_parcely = "string", typ_parcely = "string", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", kod_obce_parcely = "number", nazev_obce_parcely = "string", kmen_cislo_par = "number", podd_cisla_par = "number", dil_parcely = "number", vymera_par = "number", parcela_nazev = "string", typ_identifikace = "string", identifikace_budovy = "string", id_budovy = "string", typ_budovy = "number", nazev_typ_budovy = "string", kod_casti_obce = "number", nazev_casti_obce = "string", kod_obce_budovy = "number", nazev_obce_budovy = "string", cislo_domovni = "number", zp_vyuz_bud = "number", nazev_zp_vyuz_bud = "string", budova_nazev = "string", vla_podil_citatel = "number", vla_podil_jmenovatel = "number", vla_podil_zlomek = "string", vlastnik_budovy_nazev = "string", vlastnik_parcely_nazev = "string", vla_id_opr_subj = "string", vla_id_opr_subj_1 = "string", vla_id_opr_subj_2 = "string", vla_typ_opr_subj = "string", vla_ico_num = "number", vla_nazev_osu = "string", vla_titul_pred = "string", vla_jmeno = "string", vla_prijmeni = "string", vla_titul_za = "string", vla_cislo_domovni = "number", vla_cislo_orient = "string", vla_nazev_ulice = "string", vla_cast_obce = "string", vla_obec = "string", vla_okres = "string", vla_stat = "string", vla_psc = "number", vla_mestska_cast = "string", vla_cp_ce = "number", vla_1p_id_opr_subj = "string", vla_1p_id_opr_subj_1 = "string", vla_1p_id_opr_subj_2 = "string", vla_1p_typ_opr_subj = "string", vla_1p_ico_num = "number", vla_1p_nazev_osu = "string", vla_1p_titul_pred = "string", vla_1p_jmeno = "string", vla_1p_prijmeni = "string", vla_1p_titul_za = "string", vla_1p_cislo_domovni = "number", vla_1p_cislo_orient = "string", vla_1p_nazev_ulice = "string", vla_1p_cast_obce = "string", vla_1p_obec = "string", vla_1p_okres = "string", vla_1p_stat = "string", vla_1p_psc = "number", vla_1p_mestska_cast = "string", vla_1p_cp_ce = "number", vla_2p_id_opr_subj = "string", vla_2p_id_opr_subj_1 = "string", vla_2p_id_opr_subj_2 = "string", vla_2p_typ_opr_subj = "string", vla_2p_ico_num = "number", vla_2p_nazev_osu = "string", vla_2p_titul_pred = "string", vla_2p_jmeno = "string", vla_2p_prijmeni = "string", vla_2p_titul_za = "string", vla_2p_cislo_domovni = "number", vla_2p_cislo_orient = "string", vla_2p_nazev_ulice = "string", vla_2p_cast_obce = "string", vla_2p_obec = "string", vla_2p_okres = "string", vla_2p_stat = "string", vla_2p_psc = "number", vla_2p_mestska_cast = "string", vla_2p_cp_ce = "number",}
	const enum GBudovaNaParceleDtoTypeLengths { id_parcely = 30, typ_parcely = 10, parcela_nazev = 100, typ_identifikace = 15, identifikace_budovy = 30, id_budovy = 30, nazev_typ_budovy = 60, nazev_casti_obce = 48, nazev_obce_budovy = 48, nazev_zp_vyuz_bud = 60, budova_nazev = 100, vlastnik_budovy_nazev = 254, vlastnik_parcely_nazev = 254, vla_id_opr_subj = 30, vla_id_opr_subj_1 = 30, vla_id_opr_subj_2 = 30, vla_typ_opr_subj = 10, vla_nazev_osu = 254, vla_titul_pred = 35, vla_jmeno = 100, vla_prijmeni = 100, vla_titul_za = 35, vla_cislo_orient = 4, vla_nazev_ulice = 48, vla_cast_obce = 48, vla_obec = 48, vla_okres = 48, vla_stat = 100, vla_mestska_cast = 48, vla_1p_id_opr_subj = 30, vla_1p_id_opr_subj_1 = 30, vla_1p_id_opr_subj_2 = 30, vla_1p_typ_opr_subj = 10, vla_1p_nazev_osu = 254, vla_1p_titul_pred = 35, vla_1p_jmeno = 100, vla_1p_prijmeni = 100, vla_1p_titul_za = 35, vla_1p_cislo_orient = 4, vla_1p_nazev_ulice = 48, vla_1p_cast_obce = 48, vla_1p_obec = 48, vla_1p_okres = 48, vla_1p_stat = 100, vla_1p_mestska_cast = 48, vla_2p_id_opr_subj = 30, vla_2p_id_opr_subj_1 = 30, vla_2p_id_opr_subj_2 = 30, vla_2p_typ_opr_subj = 10, vla_2p_nazev_osu = 254, vla_2p_titul_pred = 35, vla_2p_jmeno = 100, vla_2p_prijmeni = 100, vla_2p_titul_za = 35, vla_2p_cislo_orient = 4, vla_2p_nazev_ulice = 48, vla_2p_cast_obce = 48, vla_2p_obec = 48, vla_2p_okres = 48, vla_2p_stat = 100, vla_2p_mestska_cast = 48,}
	/**Filtr pro budovu na parcele*/
	const enum GBudovaNaParceleFilter {
		/**Katastr parcely*/
		parcela_kod_kat_uzemi,
		/**IČ vlastníka parcely*/
		parcela_vlastnik_ico_num,
		/**IČ vlastníka bodovy*/
		budova_vlastnik_ico_num,
		/**Způsob využití budovy*/
		zp_vyuz_bud,
		/**Velikost parcely*/
		vymera_par,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GDetailBudovyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Detail budovy Dto*/
	interface GDetailBudovyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		bud_kod_kat_uzemi?: number|null;
		/**Autogenerated.*/
		kod_kat_uzemi?: number|null;
		/**Autogenerated.*/
		nazev_kat_uzemi?: string|null;
		/**Autogenerated.*/
		kod_casti_obce?: number|null;
		/**Autogenerated.*/
		nazev_casti_obce?: string|null;
		/**Autogenerated.*/
		kod_obce?: number|null;
		/**Autogenerated.*/
		nazev_obce?: string|null;
		/**Autogenerated.*/
		kod_okresu?: number|null;
		/**Autogenerated.*/
		nazev_okresu?: string|null;
		/**Autogenerated.*/
		kod_kraje_n?: number|null;
		/**Autogenerated.*/
		nazev_kraje_n?: string|null;
		/**Autogenerated.*/
		kod_kat_uz_puv?: number|null;
		/**Autogenerated.*/
		zp_vyuz_bud?: number|null;
		/**Autogenerated.*/
		zp_vyuz_bud_nazev?: string|null;
		/**Autogenerated.*/
		c_cena_nem?: JsonDecimal|null;
		/**Autogenerated.*/
		defin_bod_par?: string|null;
		/**Autogenerated.*/
		id_telesa?: string|null;
		/**Autogenerated.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		typ_budovy?: number|null;
		/**Autogenerated.*/
		typ_budovy_nazev?: string|null;
		/**Autogenerated.*/
		cislo_domovni?: number|null;
		/**Autogenerated.*/
		c_cena_oc?: JsonDecimal|null;
		/**Autogenerated.*/
		dat_oc?: JsonDate|null;
		/**Autogenerated.*/
		popis_oc?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_nazev?: string|null;
		/**Autogenerated.*/
		zp_oc?: number|null;
		/**Autogenerated.*/
		typ_dat?: number|null;
		/**Autogenerated.*/
		id_budovy_orig?: string|null;
		/**Autogenerated.*/
		budova_nazev?: string|null;
		/**Autogenerated.*/
		st_soucasti?: number|null;
		/**Autogenerated.*/
		id_pr_sta?: string|null;
		/**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
		/**Autogenerated.*/
		dat_vkladu?: JsonDate|null;
		/**Autogenerated.*/
		doc_sta?: number|null;
		/**Autogenerated.*/
		par_pod_bud_txt?: string|null;
	}
	const enum GDetailBudovyDtoNames { id_budovy = "id_budovy", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", bud_kod_kat_uzemi = "bud_kod_kat_uzemi", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", kod_casti_obce = "kod_casti_obce", nazev_casti_obce = "nazev_casti_obce", kod_obce = "kod_obce", nazev_obce = "nazev_obce", kod_okresu = "kod_okresu", nazev_okresu = "nazev_okresu", kod_kraje_n = "kod_kraje_n", nazev_kraje_n = "nazev_kraje_n", kod_kat_uz_puv = "kod_kat_uz_puv", zp_vyuz_bud = "zp_vyuz_bud", zp_vyuz_bud_nazev = "zp_vyuz_bud_nazev", c_cena_nem = "c_cena_nem", defin_bod_par = "defin_bod_par", id_telesa = "id_telesa", cislo_tel = "cislo_tel", typ_budovy = "typ_budovy", typ_budovy_nazev = "typ_budovy_nazev", cislo_domovni = "cislo_domovni", c_cena_oc = "c_cena_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_nazev = "zmenu_prov_nazev", zp_oc = "zp_oc", typ_dat = "typ_dat", id_budovy_orig = "id_budovy_orig", budova_nazev = "budova_nazev", st_soucasti = "st_soucasti", id_pr_sta = "id_pr_sta", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", doc_sta = "doc_sta", par_pod_bud_txt = "par_pod_bud_txt", Permissions = "Permissions",}
	const enum GDetailBudovyDtoFragments { id_budovy = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", bud_kod_kat_uzemi = "*", kod_kat_uzemi = "*", nazev_kat_uzemi = "*", kod_casti_obce = "*", nazev_casti_obce = "*", kod_obce = "*", nazev_obce = "*", kod_okresu = "*", nazev_okresu = "*", kod_kraje_n = "*", nazev_kraje_n = "*", kod_kat_uz_puv = "*", zp_vyuz_bud = "*", zp_vyuz_bud_nazev = "*", c_cena_nem = "*", defin_bod_par = "*", id_telesa = "*", cislo_tel = "*", typ_budovy = "*", typ_budovy_nazev = "*", cislo_domovni = "*", c_cena_oc = "*", dat_oc = "*", popis_oc = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_nazev = "*", zp_oc = "*", typ_dat = "*", id_budovy_orig = "*", budova_nazev = "*", st_soucasti = "*", id_pr_sta = "*", dat_zahajeni = "*", dat_vkladu = "*", doc_sta = "*", par_pod_bud_txt = "*", Permissions = "*",}
	const enum GDetailBudovyDtoTypes { id_budovy = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", bud_kod_kat_uzemi = "number", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", kod_casti_obce = "number", nazev_casti_obce = "string", kod_obce = "number", nazev_obce = "string", kod_okresu = "number", nazev_okresu = "string", kod_kraje_n = "number", nazev_kraje_n = "string", kod_kat_uz_puv = "number", zp_vyuz_bud = "number", zp_vyuz_bud_nazev = "string", c_cena_nem = "JsonDecimal", defin_bod_par = "string", id_telesa = "string", cislo_tel = "number", typ_budovy = "number", typ_budovy_nazev = "string", cislo_domovni = "number", c_cena_oc = "JsonDecimal", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_nazev = "string", zp_oc = "number", typ_dat = "number", id_budovy_orig = "string", budova_nazev = "string", st_soucasti = "number", id_pr_sta = "string", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", doc_sta = "number", par_pod_bud_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailBudovyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GDetailJednotkyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**detail jednotky*/
	interface GDetailJednotkyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_jednotky?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		typ_jednotky?: number|null;
		/**Autogenerated.*/
		typ_jednotky_nazev?: string|null;
		/**Autogenerated.*/
		cislo_jednotky?: JsonDecimal|null;
		/**Autogenerated.*/
		cis_jed_part_cdom?: number|null;
		/**Autogenerated.*/
		cis_jed_part_jed?: number|null;
		/**Autogenerated.*/
		zp_vyuz_jed?: number|null;
		/**Autogenerated.*/
		zp_vyuz_jed_nazev?: string|null;
		/**Autogenerated.*/
		podil_citatel?: number|null;
		/**Autogenerated.*/
		podil_jmenov?: number|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		kod_kat_uzemi?: number|null;
		/**Autogenerated.*/
		nazev_kat_uzemi?: string|null;
		/**Autogenerated.*/
		kod_casti_obce?: number|null;
		/**Autogenerated.*/
		nazev_casti_obce?: string|null;
		/**Autogenerated.*/
		kod_obce?: number|null;
		/**Autogenerated.*/
		nazev_obce?: string|null;
		/**Autogenerated.*/
		kod_okresu?: number|null;
		/**Autogenerated.*/
		nazev_okresu?: string|null;
		/**Autogenerated.*/
		kod_kraje_n?: number|null;
		/**Autogenerated.*/
		nazev_kraje_n?: string|null;
		/**Autogenerated.*/
		kod_kat_uz_puv?: number|null;
		/**Autogenerated.*/
		zp_vyuz_bud?: number|null;
		/**Autogenerated.*/
		zp_vyuz_bud_nazev?: string|null;
		/**Autogenerated.*/
		c_cena_nem?: JsonDecimal|null;
		/**Autogenerated.*/
		defin_bod_par?: string|null;
		/**Autogenerated.*/
		id_telesa?: string|null;
		/**Autogenerated.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		typ_budovy?: number|null;
		/**Autogenerated.*/
		typ_budovy_nazev?: string|null;
		/**Autogenerated.*/
		cislo_domovni?: number|null;
		/**Autogenerated.*/
		c_cena_oc?: JsonDecimal|null;
		/**Autogenerated.*/
		dat_oc?: JsonDate|null;
		/**Autogenerated.*/
		popis_oc?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_nazev?: string|null;
		/**Autogenerated.*/
		zp_oc?: number|null;
		/**Autogenerated.*/
		typ_dat?: number|null;
		/**Autogenerated.*/
		id_jednotky_orig?: string|null;
		/**Autogenerated.*/
		jednotka_nazev?: string|null;
		/**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
		/**Autogenerated.*/
		dat_vkladu?: JsonDate|null;
		/**Vlastnický podíl*/
		readonly podil?: string|null;
	}
	const enum GDetailJednotkyDtoNames { id_jednotky = "id_jednotky", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_budovy = "id_budovy", typ_jednotky = "typ_jednotky", typ_jednotky_nazev = "typ_jednotky_nazev", cislo_jednotky = "cislo_jednotky", cis_jed_part_cdom = "cis_jed_part_cdom", cis_jed_part_jed = "cis_jed_part_jed", zp_vyuz_jed = "zp_vyuz_jed", zp_vyuz_jed_nazev = "zp_vyuz_jed_nazev", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", popis = "popis", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", kod_casti_obce = "kod_casti_obce", nazev_casti_obce = "nazev_casti_obce", kod_obce = "kod_obce", nazev_obce = "nazev_obce", kod_okresu = "kod_okresu", nazev_okresu = "nazev_okresu", kod_kraje_n = "kod_kraje_n", nazev_kraje_n = "nazev_kraje_n", kod_kat_uz_puv = "kod_kat_uz_puv", zp_vyuz_bud = "zp_vyuz_bud", zp_vyuz_bud_nazev = "zp_vyuz_bud_nazev", c_cena_nem = "c_cena_nem", defin_bod_par = "defin_bod_par", id_telesa = "id_telesa", cislo_tel = "cislo_tel", typ_budovy = "typ_budovy", typ_budovy_nazev = "typ_budovy_nazev", cislo_domovni = "cislo_domovni", c_cena_oc = "c_cena_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_nazev = "zmenu_prov_nazev", zp_oc = "zp_oc", typ_dat = "typ_dat", id_jednotky_orig = "id_jednotky_orig", jednotka_nazev = "jednotka_nazev", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", podil = "podil", Permissions = "Permissions",}
	const enum GDetailJednotkyDtoFragments { id_jednotky = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", id_budovy = "*", typ_jednotky = "*", typ_jednotky_nazev = "*", cislo_jednotky = "*", cis_jed_part_cdom = "*", cis_jed_part_jed = "*", zp_vyuz_jed = "*", zp_vyuz_jed_nazev = "*", podil_citatel = "*", podil_jmenov = "*", popis = "*", kod_kat_uzemi = "*", nazev_kat_uzemi = "*", kod_casti_obce = "*", nazev_casti_obce = "*", kod_obce = "*", nazev_obce = "*", kod_okresu = "*", nazev_okresu = "*", kod_kraje_n = "*", nazev_kraje_n = "*", kod_kat_uz_puv = "*", zp_vyuz_bud = "*", zp_vyuz_bud_nazev = "*", c_cena_nem = "*", defin_bod_par = "*", id_telesa = "*", cislo_tel = "*", typ_budovy = "*", typ_budovy_nazev = "*", cislo_domovni = "*", c_cena_oc = "*", dat_oc = "*", popis_oc = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_nazev = "*", zp_oc = "*", typ_dat = "*", id_jednotky_orig = "*", jednotka_nazev = "*", dat_zahajeni = "*", dat_vkladu = "*", podil = "*", Permissions = "*",}
	const enum GDetailJednotkyDtoTypes { id_jednotky = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_budovy = "string", typ_jednotky = "number", typ_jednotky_nazev = "string", cislo_jednotky = "JsonDecimal", cis_jed_part_cdom = "number", cis_jed_part_jed = "number", zp_vyuz_jed = "number", zp_vyuz_jed_nazev = "string", podil_citatel = "number", podil_jmenov = "number", popis = "string", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", kod_casti_obce = "number", nazev_casti_obce = "string", kod_obce = "number", nazev_obce = "string", kod_okresu = "number", nazev_okresu = "string", kod_kraje_n = "number", nazev_kraje_n = "string", kod_kat_uz_puv = "number", zp_vyuz_bud = "number", zp_vyuz_bud_nazev = "string", c_cena_nem = "JsonDecimal", defin_bod_par = "string", id_telesa = "string", cislo_tel = "number", typ_budovy = "number", typ_budovy_nazev = "string", cislo_domovni = "number", c_cena_oc = "JsonDecimal", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_nazev = "string", zp_oc = "number", typ_dat = "number", id_jednotky_orig = "string", jednotka_nazev = "string", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", podil = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailJednotkyDtoTypeLengths { id_jednotky = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_budovy = 30, popis = 254, defin_bod_par = 100, id_telesa = 30, popis_oc = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_jednotky_orig = 30, jednotka_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GDetailNemsjedDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Dto pro vklad parcely*/
	interface GDetailNemsjedDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_jednotky?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		typ_jednotky?: number|null;
		/**Autogenerated.*/
		cislo_jednotky?: JsonDecimal|null;
		/**Autogenerated.*/
		c_cena_nem?: JsonDecimal|null;
		/**Autogenerated.*/
		zp_vyuz_jed?: number|null;
		/**Autogenerated.*/
		id_telesa?: string|null;
		/**Autogenerated.*/
		podil_citatel?: number|null;
		/**Autogenerated.*/
		podil_jmenov?: number|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		c_cena_oc?: JsonDecimal|null;
		/**Autogenerated.*/
		dat_oc?: JsonDate|null;
		/**Autogenerated.*/
		popis_oc?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zp_oc?: number|null;
		/**Autogenerated.*/
		typ_dat?: number|null;
		/**Autogenerated.*/
		id_jednotky_orig?: string|null;
		/**Autogenerated.*/
		jednotka_nazev?: string|null;
		/**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
		/**Autogenerated.*/
		dat_vkladu?: JsonDate|null;
	}
	const enum GDetailNemsjedDtoNames { id_jednotky = "id_jednotky", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_budovy = "id_budovy", typ_jednotky = "typ_jednotky", cislo_jednotky = "cislo_jednotky", c_cena_nem = "c_cena_nem", zp_vyuz_jed = "zp_vyuz_jed", id_telesa = "id_telesa", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", popis = "popis", c_cena_oc = "c_cena_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_oc = "zp_oc", typ_dat = "typ_dat", id_jednotky_orig = "id_jednotky_orig", jednotka_nazev = "jednotka_nazev", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", Permissions = "Permissions",}
	const enum GDetailNemsjedDtoFragments { id_jednotky = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", id_budovy = "*", typ_jednotky = "*", cislo_jednotky = "*", c_cena_nem = "*", zp_vyuz_jed = "*", id_telesa = "*", podil_citatel = "*", podil_jmenov = "*", popis = "*", c_cena_oc = "*", dat_oc = "*", popis_oc = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zp_oc = "*", typ_dat = "*", id_jednotky_orig = "*", jednotka_nazev = "*", dat_zahajeni = "*", dat_vkladu = "*", Permissions = "*",}
	const enum GDetailNemsjedDtoTypes { id_jednotky = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_budovy = "string", typ_jednotky = "number", cislo_jednotky = "JsonDecimal", c_cena_nem = "JsonDecimal", zp_vyuz_jed = "number", id_telesa = "string", podil_citatel = "number", podil_jmenov = "number", popis = "string", c_cena_oc = "JsonDecimal", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_oc = "number", typ_dat = "number", id_jednotky_orig = "string", jednotka_nazev = "string", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemsjedDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GDetailParcelyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Detail Parcely*/
	interface GDetailParcelyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_parcely?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		id_parcely_pkn?: string|null;
		/**Autogenerated.*/
		typ_parcely?: string|null;
		/**Autogenerated.*/
		typ_parcely_popis?: string|null;
		/**Autogenerated.*/
		kod_kat_uzemi?: number|null;
		/**Autogenerated.*/
		nazev_kat_uzemi?: string|null;
		/**Autogenerated.*/
		kod_obce?: number|null;
		/**Autogenerated.*/
		nazev_obce?: string|null;
		/**Autogenerated.*/
		kod_okresu?: number|null;
		/**Autogenerated.*/
		nazev_okresu?: string|null;
		/**Autogenerated.*/
		kod_kraje_n?: number|null;
		/**Autogenerated.*/
		nazev_kraje_n?: string|null;
		/**Autogenerated.*/
		kod_kat_uz_puv?: number|null;
		/**Autogenerated.*/
		druh_cis_par?: number|null;
		/**Autogenerated.*/
		druh_cis_par_popis?: string|null;
		/**Autogenerated.*/
		kmen_cislo_par?: number|null;
		/**Autogenerated.*/
		zdroj_par_ze?: number|null;
		/**Autogenerated.*/
		zdroj_par_ze_nazev?: string|null;
		/**Autogenerated.*/
		podd_cisla_par?: number|null;
		/**Autogenerated.*/
		dil_parcely?: number|null;
		/**Autogenerated.*/
		map_list?: string|null;
		/**Autogenerated.*/
		ozn_map_listu?: string|null;
		/**Autogenerated.*/
		zp_urc_vym?: number|null;
		/**Autogenerated.*/
		zp_urc_vym_nazev?: string|null;
		/**Autogenerated.*/
		druh_poz?: number|null;
		/**Autogenerated.*/
		druh_poz_nazev?: string|null;
		/**Autogenerated.*/
		zp_vyuz_poz?: number|null;
		/**Autogenerated.*/
		zp_vyuz_poz_nazev?: string|null;
		/**Autogenerated.*/
		typ_par_ze?: number|null;
		/**Autogenerated.*/
		typ_par_ze_popis?: string|null;
		/**Autogenerated.*/
		vymera_par?: number|null;
		/**Autogenerated.*/
		c_cena_nem?: JsonDecimal|null;
		/**Autogenerated.*/
		defin_bod_par?: string|null;
		/**Autogenerated.*/
		id_telesa?: string|null;
		/**List vla.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		id_parcely_par?: string|null;
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		s_ident_bud?: number|null;
		/**Autogenerated.*/
		typ_budovy_nazev?: string|null;
		/**Autogenerated.*/
		cislo_domovni?: number|null;
		/**Autogenerated.*/
		zp_vyuz_bud_nazev?: string|null;
		/**Autogenerated.*/
		c_cena_oc?: JsonDecimal|null;
		/**Autogenerated.*/
		vymera_oc?: number|null;
		/**Autogenerated.*/
		dat_oc?: JsonDate|null;
		/**Autogenerated.*/
		popis_oc?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_nazev?: string|null;
		/**Autogenerated.*/
		zp_oc?: number|null;
		/**Autogenerated.*/
		c_cena_jedn?: JsonDecimal|null;
		/**Autogenerated.*/
		typ_dat?: number|null;
		/**Autogenerated.*/
		id_parcely_orig?: string|null;
		/**Autogenerated.*/
		parcela_nazev?: string|null;
		/**Autogenerated.*/
		s_soucasti?: number|null;
		/**Autogenerated.*/
		id_pr_sta?: string|null;
		/**Autogenerated.*/
		s_ident_ps?: number|null;
		/**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
		/**Autogenerated.*/
		dat_vkladu?: JsonDate|null;
		/**Autogenerated.*/
		parcela_txt?: string|null;
		/**Autogenerated.*/
		budova_txt?: string|null;
		/**Manual*/
		nazev_zp_vyuz_poz?: string|null;
		nazev_druh_poz?: string|null;
		bud_cislo_domovni?: number|null;
		osu_rodne_cislo?: number|null;
		majsmaj_c?: number|null;
		majsmaj_ueab_evi?: number|null;
		osu_ico_num?: number|null;
		majsmaj_inv_cis?: number|null;
		majsprn_vymera_par?: number|null;
		majsprn_nazev_druh_poz?: number|null;
		nazev_zp_vyuz_bud?: string|null;
		osu_nazev_osu?: string|null;
		cos_nazev_charoprsubj?: string|null;
		tpv_typ_pr_vztahu?: string|null;
		majsmaj_trida?: string|null;
		majsmaj_nks?: string|null;
		majsprn_podil?: string|null;
		majsmaj_dat_por?: JsonDate|null;
		majsmaj_dat_zar?: JsonDate|null;
		majsmaj_dat_vyr?: JsonDate|null;
		s_vecne_bremeno_txt?: string|null;
		majsprn_s_vecne_bremeno_txt?: string|null;
		s_zastavni_pravo_txt?: string|null;
		majsprn_s_zastavni_pravo_txt?: string|null;
	}
	const enum GDetailParcelyDtoNames { id_parcely = "id_parcely", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_parcely_pkn = "id_parcely_pkn", typ_parcely = "typ_parcely", typ_parcely_popis = "typ_parcely_popis", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", kod_obce = "kod_obce", nazev_obce = "nazev_obce", kod_okresu = "kod_okresu", nazev_okresu = "nazev_okresu", kod_kraje_n = "kod_kraje_n", nazev_kraje_n = "nazev_kraje_n", kod_kat_uz_puv = "kod_kat_uz_puv", druh_cis_par = "druh_cis_par", druh_cis_par_popis = "druh_cis_par_popis", kmen_cislo_par = "kmen_cislo_par", zdroj_par_ze = "zdroj_par_ze", zdroj_par_ze_nazev = "zdroj_par_ze_nazev", podd_cisla_par = "podd_cisla_par", dil_parcely = "dil_parcely", map_list = "map_list", ozn_map_listu = "ozn_map_listu", zp_urc_vym = "zp_urc_vym", zp_urc_vym_nazev = "zp_urc_vym_nazev", druh_poz = "druh_poz", druh_poz_nazev = "druh_poz_nazev", zp_vyuz_poz = "zp_vyuz_poz", zp_vyuz_poz_nazev = "zp_vyuz_poz_nazev", typ_par_ze = "typ_par_ze", typ_par_ze_popis = "typ_par_ze_popis", vymera_par = "vymera_par", c_cena_nem = "c_cena_nem", defin_bod_par = "defin_bod_par", id_telesa = "id_telesa", cislo_tel = "cislo_tel", id_parcely_par = "id_parcely_par", id_budovy = "id_budovy", s_ident_bud = "s_ident_bud", typ_budovy_nazev = "typ_budovy_nazev", cislo_domovni = "cislo_domovni", zp_vyuz_bud_nazev = "zp_vyuz_bud_nazev", c_cena_oc = "c_cena_oc", vymera_oc = "vymera_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_nazev = "zmenu_prov_nazev", zp_oc = "zp_oc", c_cena_jedn = "c_cena_jedn", typ_dat = "typ_dat", id_parcely_orig = "id_parcely_orig", parcela_nazev = "parcela_nazev", s_soucasti = "s_soucasti", id_pr_sta = "id_pr_sta", s_ident_ps = "s_ident_ps", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", parcela_txt = "parcela_txt", budova_txt = "budova_txt", nazev_zp_vyuz_poz = "nazev_zp_vyuz_poz", nazev_druh_poz = "nazev_druh_poz", bud_cislo_domovni = "bud_cislo_domovni", osu_rodne_cislo = "osu_rodne_cislo", majsmaj_c = "majsmaj_c", majsmaj_ueab_evi = "majsmaj_ueab_evi", osu_ico_num = "osu_ico_num", majsmaj_inv_cis = "majsmaj_inv_cis", majsprn_vymera_par = "majsprn_vymera_par", majsprn_nazev_druh_poz = "majsprn_nazev_druh_poz", nazev_zp_vyuz_bud = "nazev_zp_vyuz_bud", osu_nazev_osu = "osu_nazev_osu", cos_nazev_charoprsubj = "cos_nazev_charoprsubj", tpv_typ_pr_vztahu = "tpv_typ_pr_vztahu", majsmaj_trida = "majsmaj_trida", majsmaj_nks = "majsmaj_nks", majsprn_podil = "majsprn_podil", majsmaj_dat_por = "majsmaj_dat_por", majsmaj_dat_zar = "majsmaj_dat_zar", majsmaj_dat_vyr = "majsmaj_dat_vyr", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", majsprn_s_vecne_bremeno_txt = "majsprn_s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", majsprn_s_zastavni_pravo_txt = "majsprn_s_zastavni_pravo_txt", Permissions = "Permissions",}
	const enum GDetailParcelyDtoFragments { id_parcely = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", id_parcely_pkn = "*", typ_parcely = "*", typ_parcely_popis = "*", kod_kat_uzemi = "*", nazev_kat_uzemi = "*", kod_obce = "*", nazev_obce = "*", kod_okresu = "*", nazev_okresu = "*", kod_kraje_n = "*", nazev_kraje_n = "*", kod_kat_uz_puv = "*", druh_cis_par = "*", druh_cis_par_popis = "*", kmen_cislo_par = "*", zdroj_par_ze = "*", zdroj_par_ze_nazev = "*", podd_cisla_par = "*", dil_parcely = "*", map_list = "*", ozn_map_listu = "*", zp_urc_vym = "*", zp_urc_vym_nazev = "*", druh_poz = "*", druh_poz_nazev = "*", zp_vyuz_poz = "*", zp_vyuz_poz_nazev = "*", typ_par_ze = "*", typ_par_ze_popis = "*", vymera_par = "*", c_cena_nem = "*", defin_bod_par = "*", id_telesa = "*", cislo_tel = "*", id_parcely_par = "*", id_budovy = "*", s_ident_bud = "*", typ_budovy_nazev = "*", cislo_domovni = "*", zp_vyuz_bud_nazev = "*", c_cena_oc = "*", vymera_oc = "*", dat_oc = "*", popis_oc = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_nazev = "*", zp_oc = "*", c_cena_jedn = "*", typ_dat = "*", id_parcely_orig = "*", parcela_nazev = "*", s_soucasti = "*", id_pr_sta = "*", s_ident_ps = "*", dat_zahajeni = "*", dat_vkladu = "*", parcela_txt = "*", budova_txt = "*", nazev_zp_vyuz_poz = "*", nazev_druh_poz = "*", bud_cislo_domovni = "*", osu_rodne_cislo = "*", majsmaj_c = "*", majsmaj_ueab_evi = "*", osu_ico_num = "*", majsmaj_inv_cis = "*", majsprn_vymera_par = "*", majsprn_nazev_druh_poz = "*", nazev_zp_vyuz_bud = "*", osu_nazev_osu = "*", cos_nazev_charoprsubj = "*", tpv_typ_pr_vztahu = "*", majsmaj_trida = "*", majsmaj_nks = "*", majsprn_podil = "*", majsmaj_dat_por = "*", majsmaj_dat_zar = "*", majsmaj_dat_vyr = "*", s_vecne_bremeno_txt = "*", majsprn_s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", majsprn_s_zastavni_pravo_txt = "*", Permissions = "*",}
	const enum GDetailParcelyDtoTypes { id_parcely = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_parcely_pkn = "string", typ_parcely = "string", typ_parcely_popis = "string", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", kod_obce = "number", nazev_obce = "string", kod_okresu = "number", nazev_okresu = "string", kod_kraje_n = "number", nazev_kraje_n = "string", kod_kat_uz_puv = "number", druh_cis_par = "number", druh_cis_par_popis = "string", kmen_cislo_par = "number", zdroj_par_ze = "number", zdroj_par_ze_nazev = "string", podd_cisla_par = "number", dil_parcely = "number", map_list = "string", ozn_map_listu = "string", zp_urc_vym = "number", zp_urc_vym_nazev = "string", druh_poz = "number", druh_poz_nazev = "string", zp_vyuz_poz = "number", zp_vyuz_poz_nazev = "string", typ_par_ze = "number", typ_par_ze_popis = "string", vymera_par = "number", c_cena_nem = "JsonDecimal", defin_bod_par = "string", id_telesa = "string", cislo_tel = "number", id_parcely_par = "string", id_budovy = "string", s_ident_bud = "number", typ_budovy_nazev = "string", cislo_domovni = "number", zp_vyuz_bud_nazev = "string", c_cena_oc = "JsonDecimal", vymera_oc = "number", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_nazev = "string", zp_oc = "number", c_cena_jedn = "JsonDecimal", typ_dat = "number", id_parcely_orig = "string", parcela_nazev = "string", s_soucasti = "number", id_pr_sta = "string", s_ident_ps = "number", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", parcela_txt = "string", budova_txt = "string", nazev_zp_vyuz_poz = "string", nazev_druh_poz = "string", bud_cislo_domovni = "number", osu_rodne_cislo = "number", majsmaj_c = "number", majsmaj_ueab_evi = "number", osu_ico_num = "number", majsmaj_inv_cis = "number", majsprn_vymera_par = "number", majsprn_nazev_druh_poz = "number", nazev_zp_vyuz_bud = "string", osu_nazev_osu = "string", cos_nazev_charoprsubj = "string", tpv_typ_pr_vztahu = "string", majsmaj_trida = "string", majsmaj_nks = "string", majsprn_podil = "string", majsmaj_dat_por = "JsonDate", majsmaj_dat_zar = "JsonDate", majsmaj_dat_vyr = "JsonDate", s_vecne_bremeno_txt = "string", majsprn_s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", majsprn_s_zastavni_pravo_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailParcelyDtoTypeLengths { id_parcely = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_parcely_pkn = 30, typ_parcely = 10, map_list = 30, defin_bod_par = 100, id_telesa = 30, id_parcely_par = 30, id_budovy = 30, popis_oc = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_parcely_orig = 30, parcela_nazev = 100, id_pr_sta = 30, parcela_txt = 50, budova_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GNemsdavDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsdav*/
	interface GNemsdavDto {
		/**DBCOLUMN:nemsdav.ixs_dav*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsdav.popis*/
		popis?: string|null;
		/**DBCOLUMN:nemsdav.dat_porizeni*/
		dat_porizeni?: JsonDate|null;
		/**DBCOLUMN:nemsdav.dat_nacteni*/
		dat_nacteni?: JsonDate|null;
		/**DBCOLUMN:nemsdav.verze_vf*/
		verze_vf?: string|null;
		/**DBCOLUMN:nemsdav.dat_vytvoreni*/
		dat_vytvoreni?: JsonDate|null;
		/**DBCOLUMN:nemsdav.puvod*/
		puvod?: string|null;
		/**DBCOLUMN:nemsdav.vytvoril*/
		vytvoril?: string|null;
		/**DBCOLUMN:nemsdav.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:nemsdav.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:nemsdav.s_zmeny*/
		s_zmeny?: number|null;
		/**DBCOLUMN:nemsdav.s_navrhy*/
		s_navrhy?: number|null;
		/**DBCOLUMN:nemsdav.s_kat_uze*/
		s_kat_uze?: number|null;
		/**DBCOLUMN:nemsdav.s_opr_subj*/
		s_opr_subj?: number|null;
		/**DBCOLUMN:nemsdav.s_parcely*/
		s_parcely?: number|null;
		/**DBCOLUMN:nemsdav.s_polyg*/
		s_polyg?: number|null;
		/**DBCOLUMN:nemsdav.typ_dav*/
		typ_dav?: number|null;
		/**DBCOLUMN:nemsdav.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsdav.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsdav.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsdav.zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:nemsdav.ixs_dav_prev*/
		ixs_dav_prev?: string|null;
		/**DBCOLUMN:nemsdav.s_deakt_prev*/
		s_deakt_prev?: number|null;
		/**Oprávnění*/
		Permissions?: Gordic.Ren.Interface.GNemsdavPermissions|null;
	}
	const enum GNemsdavDtoNames { ixs_dav = "ixs_dav", popis = "popis", dat_porizeni = "dat_porizeni", dat_nacteni = "dat_nacteni", verze_vf = "verze_vf", dat_vytvoreni = "dat_vytvoreni", puvod = "puvod", vytvoril = "vytvoril", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", s_zmeny = "s_zmeny", s_navrhy = "s_navrhy", s_kat_uze = "s_kat_uze", s_opr_subj = "s_opr_subj", s_parcely = "s_parcely", s_polyg = "s_polyg", typ_dav = "typ_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ixs_dav_prev = "ixs_dav_prev", s_deakt_prev = "s_deakt_prev", Permissions = "Permissions",}
	const enum GNemsdavDtoFragments { ixs_dav = "*", popis = "*", dat_porizeni = "*", dat_nacteni = "*", verze_vf = "*", dat_vytvoreni = "*", puvod = "*", vytvoril = "*", dat_plat_od = "*", dat_plat_do = "*", s_zmeny = "*", s_navrhy = "*", s_kat_uze = "*", s_opr_subj = "*", s_parcely = "*", s_polyg = "*", typ_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", ixs_dav_prev = "*", s_deakt_prev = "*", Permissions = "*",}
	const enum GNemsdavDtoTypes { ixs_dav = "string", popis = "string", dat_porizeni = "JsonDate", dat_nacteni = "JsonDate", verze_vf = "string", dat_vytvoreni = "JsonDate", puvod = "string", vytvoril = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", s_zmeny = "number", s_navrhy = "number", s_kat_uze = "number", s_opr_subj = "number", s_parcely = "number", s_polyg = "number", typ_dav = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ixs_dav_prev = "string", s_deakt_prev = "number", Permissions = "Gordic.Ren.Interface.GNemsdavPermissions",}
	const enum GNemsdavDtoTypeLengths { ixs_dav = 12, popis = 254, verze_vf = 10, puvod = 254, vytvoril = 50, poznamka = 50, zmenu_prov = 12, zmenu_prov_txt = 254, ixs_dav_prev = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\GVlastnictviDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsvla*/
	interface GVlastnictviDto {
		/**DBCOLUMN:nemsvla.id_vlastnictvi*/
		id_vlastnictvi?: string|null;
		/**DBCOLUMN:nemsvla.stav_dat*/
		stav_dat?: number|null;
		/**DBCOLUMN:nemsvla.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:nemsvla.dat_zaniku*/
		dat_zaniku?: JsonDate|null;
		/**DBCOLUMN:nemsvla.id_pr_kontx*/
		id_pr_kontx?: number|null;
		/**DBCOLUMN:nemsvla.id_rizeni_vzn*/
		id_rizeni_vzn?: string|null;
		/**DBCOLUMN:nemsvla.id_rizeni_zan*/
		id_rizeni_zan?: string|null;
		/**DBCOLUMN:nemsvla.id_opr_subj*/
		id_opr_subj?: string|null;
		/**DBCOLUMN:nemsvla.typ_pr_vztahu*/
		typ_pr_vztahu?: string|null;
		/**DBCOLUMN:nemsvla.id_telesa*/
		id_telesa?: string|null;
		/**DBCOLUMN:nemsvla.podil_citatel*/
		podil_citatel?: number|null;
		/**DBCOLUMN:nemsvla.podil_jmenov*/
		podil_jmenov?: number|null;
		/**DBCOLUMN:nemsvla.ixs_dav*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsvla.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsvla.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsvla.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsvla.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:nemsvla.dat_vzniku2*/
		dat_vzniku2?: JsonDate|null;
		/**DBCOLUMN:nemsvla.id_rizeni_vzn2*/
		id_rizeni_vzn2?: string|null;
		/**DBCOLUMN:nemsvla.id_parcely*/
		id_parcely?: string|null;
		/**DBCOLUMN:nemsvla.id_budovy*/
		id_budovy?: string|null;
		/**DBCOLUMN:nemsvla.id_jednotky*/
		id_jednotky?: string|null;
		/**DBCOLUMN:nemsvla.id_pr_sta*/
		id_pr_sta?: string|null;
		/**List vlastnictví alias číslo tělesa*/
		cislo_tel?: number|null;
		/**Podíl vyjádřený zlomkem*/
		podil?: string|null;
		/**Typ právního vztahu*/
		typ_pr_vztahu_nazev?: string|null;
		/**IČO numericky*/
		ico_num?: number|null;
		/**Rodné číslo*/
		rodne_cislo?: string|null;
		/**Název oprávněného subjektu*/
		nazev?: string|null;
		/**Charakteristika oprávněného subjektu
		*     join: nemsosu.char_opr_subj=nemscos.char_opr_subj
		*/
		char_opr_subj_nazev?: string|null;
		/**1. partner v SJM
		*     join: nemsosu.char_opr_subj=?
		*           nemsosu.id_opr_subj_2=nemsosu.id_opr_subj
		*/
		sjm_partner_1?: string|null;
		/**2. partner v SJM
		*     join: nemsosu.char_opr_subj=?
		*           nemsosu.id_opr_subj_1=nemsosu.id_opr_subj
		*/
		sjm_partner_2?: string|null;
		/**OSU - id_opr_subj_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		id_opr_subj_0?: string|null;
		/**OSU - typ_opr_subj_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		typ_opr_subj_0?: string|null;
		/**OSU - rodne_cislo_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		rodne_cislo_0?: string|null;
		/**OSU - ico_num_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		ico_num_0?: number|null;
		/**OSU - nazev_osu_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		nazev_osu_0?: string|null;
		/**OSU - titul_pred_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		titul_pred_0?: string|null;
		/**OSU - jmeno_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		jmeno_0?: string|null;
		/**OSU - prijmeni_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		prijmeni_0?: string|null;
		/**OSU - titul_za_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		titul_za_0?: string|null;
		/**OSU - nazev_ulice_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		nazev_ulice_0?: string|null;
		/**OSU - cislo_domovni_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cislo_domovni_0?: string|null;
		/**OSU - cislo_orient_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cislo_orient_0?: string|null;
		/**OSU - cast_obce_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cast_obce_0?: string|null;
		/**OSU - psc_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		psc_0?: number|null;
		/**OSU - obec_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		obec_0?: string|null;
		/**OSU - okres_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		okres_0?: string|null;
		/**OSU - stat_0
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		stat_0?: string|null;
		/**OSU - id_opr_subj_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		id_opr_subj_1?: string|null;
		/**OSU - typ_opr_subj_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		typ_opr_subj_1?: string|null;
		/**OSU - rodne_cislo_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		rodne_cislo_1?: string|null;
		/**OSU - ico_num_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		ico_num_1?: number|null;
		/**OSU - nazev_osu_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		nazev_osu_1?: string|null;
		/**OSU - titul_pred_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		titul_pred_1?: string|null;
		/**OSU - jmeno_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		jmeno_1?: string|null;
		/**OSU - prijmeni_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		prijmeni_1?: string|null;
		/**OSU - titul_za_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		titul_za_1?: string|null;
		/**OSU - nazev_ulice_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		nazev_ulice_1?: string|null;
		/**OSU - cislo_domovni_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cislo_domovni_1?: string|null;
		/**OSU - cislo_orient_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cislo_orient_1?: string|null;
		/**OSU - cast_obce_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cast_obce_1?: string|null;
		/**OSU - psc_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		psc_1?: number|null;
		/**OSU - obec_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		obec_1?: string|null;
		/**OSU - okres_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		okres_1?: string|null;
		/**OSU - stat_1
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		stat_1?: string|null;
		/**OSU - id_opr_subj_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		id_opr_subj_2?: string|null;
		/**OSU - typ_opr_subj_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		typ_opr_subj_2?: string|null;
		/**OSU - rodne_cislo_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		rodne_cislo_2?: string|null;
		/**OSU - ico_num_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		ico_num_2?: number|null;
		/**OSU - nazev_osu_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		nazev_osu_2?: string|null;
		/**OSU - titul_pred_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		titul_pred_2?: string|null;
		/**OSU - jmeno_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		jmeno_2?: string|null;
		/**OSU - prijmeni_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		prijmeni_2?: string|null;
		/**OSU - titul_za_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		titul_za_2?: string|null;
		/**OSU - nazev_ulice_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		nazev_ulice_2?: string|null;
		/**OSU - cislo_domovni_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cislo_domovni_2?: string|null;
		/**OSU - cislo_orient_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cislo_orient_2?: string|null;
		/**OSU - cast_obce_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		cast_obce_2?: string|null;
		/**OSU - psc_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		psc_2?: number|null;
		/**OSU - obec_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		obec_2?: string|null;
		/**OSU - okres_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		okres_2?: string|null;
		/**OSU - stat_2
		*     join: nemsvla.id_opr_subj=nemsosu.id_opr_subj
		*/
		stat_2?: string|null;
	}
	const enum GVlastnictviDtoNames { id_vlastnictvi = "id_vlastnictvi", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_opr_subj = "id_opr_subj", typ_pr_vztahu = "typ_pr_vztahu", id_telesa = "id_telesa", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", id_pr_sta = "id_pr_sta", cislo_tel = "cislo_tel", podil = "podil", typ_pr_vztahu_nazev = "typ_pr_vztahu_nazev", ico_num = "ico_num", rodne_cislo = "rodne_cislo", nazev = "nazev", char_opr_subj_nazev = "char_opr_subj_nazev", sjm_partner_1 = "sjm_partner_1", sjm_partner_2 = "sjm_partner_2", id_opr_subj_0 = "id_opr_subj_0", typ_opr_subj_0 = "typ_opr_subj_0", rodne_cislo_0 = "rodne_cislo_0", ico_num_0 = "ico_num_0", nazev_osu_0 = "nazev_osu_0", titul_pred_0 = "titul_pred_0", jmeno_0 = "jmeno_0", prijmeni_0 = "prijmeni_0", titul_za_0 = "titul_za_0", nazev_ulice_0 = "nazev_ulice_0", cislo_domovni_0 = "cislo_domovni_0", cislo_orient_0 = "cislo_orient_0", cast_obce_0 = "cast_obce_0", psc_0 = "psc_0", obec_0 = "obec_0", okres_0 = "okres_0", stat_0 = "stat_0", id_opr_subj_1 = "id_opr_subj_1", typ_opr_subj_1 = "typ_opr_subj_1", rodne_cislo_1 = "rodne_cislo_1", ico_num_1 = "ico_num_1", nazev_osu_1 = "nazev_osu_1", titul_pred_1 = "titul_pred_1", jmeno_1 = "jmeno_1", prijmeni_1 = "prijmeni_1", titul_za_1 = "titul_za_1", nazev_ulice_1 = "nazev_ulice_1", cislo_domovni_1 = "cislo_domovni_1", cislo_orient_1 = "cislo_orient_1", cast_obce_1 = "cast_obce_1", psc_1 = "psc_1", obec_1 = "obec_1", okres_1 = "okres_1", stat_1 = "stat_1", id_opr_subj_2 = "id_opr_subj_2", typ_opr_subj_2 = "typ_opr_subj_2", rodne_cislo_2 = "rodne_cislo_2", ico_num_2 = "ico_num_2", nazev_osu_2 = "nazev_osu_2", titul_pred_2 = "titul_pred_2", jmeno_2 = "jmeno_2", prijmeni_2 = "prijmeni_2", titul_za_2 = "titul_za_2", nazev_ulice_2 = "nazev_ulice_2", cislo_domovni_2 = "cislo_domovni_2", cislo_orient_2 = "cislo_orient_2", cast_obce_2 = "cast_obce_2", psc_2 = "psc_2", obec_2 = "obec_2", okres_2 = "okres_2", stat_2 = "stat_2",}
	const enum GVlastnictviDtoFragments { id_vlastnictvi = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", id_opr_subj = "*", typ_pr_vztahu = "*", id_telesa = "*", podil_citatel = "*", podil_jmenov = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_vzniku2 = "*", id_rizeni_vzn2 = "*", id_parcely = "*", id_budovy = "*", id_jednotky = "*", id_pr_sta = "*", cislo_tel = "*", podil = "*", typ_pr_vztahu_nazev = "*", ico_num = "*", rodne_cislo = "*", nazev = "*", char_opr_subj_nazev = "*", sjm_partner_1 = "*", sjm_partner_2 = "*", id_opr_subj_0 = "*", typ_opr_subj_0 = "*", rodne_cislo_0 = "*", ico_num_0 = "*", nazev_osu_0 = "*", titul_pred_0 = "*", jmeno_0 = "*", prijmeni_0 = "*", titul_za_0 = "*", nazev_ulice_0 = "*", cislo_domovni_0 = "*", cislo_orient_0 = "*", cast_obce_0 = "*", psc_0 = "*", obec_0 = "*", okres_0 = "*", stat_0 = "*", id_opr_subj_1 = "*", typ_opr_subj_1 = "*", rodne_cislo_1 = "*", ico_num_1 = "*", nazev_osu_1 = "*", titul_pred_1 = "*", jmeno_1 = "*", prijmeni_1 = "*", titul_za_1 = "*", nazev_ulice_1 = "*", cislo_domovni_1 = "*", cislo_orient_1 = "*", cast_obce_1 = "*", psc_1 = "*", obec_1 = "*", okres_1 = "*", stat_1 = "*", id_opr_subj_2 = "*", typ_opr_subj_2 = "*", rodne_cislo_2 = "*", ico_num_2 = "*", nazev_osu_2 = "*", titul_pred_2 = "*", jmeno_2 = "*", prijmeni_2 = "*", titul_za_2 = "*", nazev_ulice_2 = "*", cislo_domovni_2 = "*", cislo_orient_2 = "*", cast_obce_2 = "*", psc_2 = "*", obec_2 = "*", okres_2 = "*", stat_2 = "*",}
	const enum GVlastnictviDtoTypes { id_vlastnictvi = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_opr_subj = "string", typ_pr_vztahu = "string", id_telesa = "string", podil_citatel = "number", podil_jmenov = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", id_pr_sta = "string", cislo_tel = "number", podil = "string", typ_pr_vztahu_nazev = "string", ico_num = "number", rodne_cislo = "string", nazev = "string", char_opr_subj_nazev = "string", sjm_partner_1 = "string", sjm_partner_2 = "string", id_opr_subj_0 = "string", typ_opr_subj_0 = "string", rodne_cislo_0 = "string", ico_num_0 = "number", nazev_osu_0 = "string", titul_pred_0 = "string", jmeno_0 = "string", prijmeni_0 = "string", titul_za_0 = "string", nazev_ulice_0 = "string", cislo_domovni_0 = "string", cislo_orient_0 = "string", cast_obce_0 = "string", psc_0 = "number", obec_0 = "string", okres_0 = "string", stat_0 = "string", id_opr_subj_1 = "string", typ_opr_subj_1 = "string", rodne_cislo_1 = "string", ico_num_1 = "number", nazev_osu_1 = "string", titul_pred_1 = "string", jmeno_1 = "string", prijmeni_1 = "string", titul_za_1 = "string", nazev_ulice_1 = "string", cislo_domovni_1 = "string", cislo_orient_1 = "string", cast_obce_1 = "string", psc_1 = "number", obec_1 = "string", okres_1 = "string", stat_1 = "string", id_opr_subj_2 = "string", typ_opr_subj_2 = "string", rodne_cislo_2 = "string", ico_num_2 = "number", nazev_osu_2 = "string", titul_pred_2 = "string", jmeno_2 = "string", prijmeni_2 = "string", titul_za_2 = "string", nazev_ulice_2 = "string", cislo_domovni_2 = "string", cislo_orient_2 = "string", cast_obce_2 = "string", psc_2 = "number", obec_2 = "string", okres_2 = "string", stat_2 = "string",}
	const enum GVlastnictviDtoTypeLengths { id_vlastnictvi = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_opr_subj = 30, typ_pr_vztahu = 4, id_telesa = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_rizeni_vzn2 = 30, id_parcely = 30, id_budovy = 30, id_jednotky = 30, id_pr_sta = 30, podil = 30, typ_pr_vztahu_nazev = 30, rodne_cislo = 10, nazev = 254, char_opr_subj_nazev = 60, sjm_partner_1 = 60, sjm_partner_2 = 60, id_opr_subj_0 = 30, typ_opr_subj_0 = 10, rodne_cislo_0 = 10, nazev_osu_0 = 254, titul_pred_0 = 35, jmeno_0 = 100, prijmeni_0 = 100, titul_za_0 = 35, nazev_ulice_0 = 48, cislo_domovni_0 = 48, cislo_orient_0 = 4, cast_obce_0 = 48, obec_0 = 48, okres_0 = 48, stat_0 = 100, id_opr_subj_1 = 30, typ_opr_subj_1 = 10, rodne_cislo_1 = 10, nazev_osu_1 = 254, titul_pred_1 = 35, jmeno_1 = 100, prijmeni_1 = 100, titul_za_1 = 35, nazev_ulice_1 = 48, cislo_domovni_1 = 48, cislo_orient_1 = 4, cast_obce_1 = 48, obec_1 = 48, okres_1 = 48, stat_1 = 100, id_opr_subj_2 = 30, typ_opr_subj_2 = 10, rodne_cislo_2 = 10, nazev_osu_2 = 254, titul_pred_2 = 35, jmeno_2 = 100, prijmeni_2 = 100, titul_za_2 = 35, nazev_ulice_2 = 48, cislo_domovni_2 = 48, cislo_orient_2 = 4, cast_obce_2 = 48, obec_2 = 48, okres_2 = 48, stat_2 = 100,}
	/**Výčet filtračních položek pro tabulku nemsvla*/
	const enum GVlastnictviFilter {
		/**DBCOLUMN:nemsvla.id_vlastnictvi*/
		id_vlastnictvi,
		/**DBCOLUMN:nemsvla.stav_dat*/
		stav_dat,
		/**DBCOLUMN:nemsvla.dat_vzniku*/
		dat_vzniku,
		/**DBCOLUMN:nemsvla.dat_zaniku*/
		dat_zaniku,
		/**DBCOLUMN:nemsvla.id_pr_kontx*/
		id_pr_kontx,
		/**DBCOLUMN:nemsvla.id_rizeni_vzn*/
		id_rizeni_vzn,
		/**DBCOLUMN:nemsvla.id_rizeni_zan*/
		id_rizeni_zan,
		/**DBCOLUMN:nemsvla.id_opr_subj*/
		id_opr_subj,
		/**DBCOLUMN:nemsvla.typ_pr_vztahu*/
		typ_pr_vztahu,
		/**DBCOLUMN:nemsvla.id_telesa*/
		id_telesa,
		/**DBCOLUMN:nemsvla.podil_citatel*/
		podil_citatel,
		/**DBCOLUMN:nemsvla.podil_jmenov*/
		podil_jmenov,
		/**DBCOLUMN:nemsvla.ixs_dav*/
		ixs_dav,
		/**DBCOLUMN:nemsvla.poznamka*/
		poznamka,
		/**DBCOLUMN:nemsvla.aktivita*/
		aktivita,
		/**DBCOLUMN:nemsvla.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:nemsvla.zmenu_prov*/
		zmenu_prov,
		/**DBCOLUMN:nemsvla.dat_vzniku2*/
		dat_vzniku2,
		/**DBCOLUMN:nemsvla.id_rizeni_vzn2*/
		id_rizeni_vzn2,
		/**DBCOLUMN:nemsvla.id_parcely*/
		id_parcely,
		/**DBCOLUMN:nemsvla.id_budovy*/
		id_budovy,
		/**DBCOLUMN:nemsvla.id_jednotky*/
		id_jednotky,
		/**DBCOLUMN:nemsvla.id_pr_sta*/
		id_pr_sta,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyBudovy\GDetailBudovySeznamCastiBudovDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**seznam casti budov*/
	interface GDetailBudovySeznamCastiBudovDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		typ_budovy?: number|null;
		/**Autogenerated.*/
		cislo_domovni?: number|null;
		/**Autogenerated.*/
		typ_budovy_nazev?: string|null;
	}
	const enum GDetailBudovySeznamCastiBudovDtoNames { id_budovy = "id_budovy", typ_budovy = "typ_budovy", cislo_domovni = "cislo_domovni", typ_budovy_nazev = "typ_budovy_nazev", Permissions = "Permissions",}
	const enum GDetailBudovySeznamCastiBudovDtoFragments { id_budovy = "*", typ_budovy = "*", cislo_domovni = "*", typ_budovy_nazev = "*", Permissions = "*",}
	const enum GDetailBudovySeznamCastiBudovDtoTypes { id_budovy = "string", typ_budovy = "number", cislo_domovni = "number", typ_budovy_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailBudovySeznamCastiBudovDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyBudovy\GDetailBudovySeznamJednotekNahlizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Seznam jednotek pro detail budovy*/
	interface GDetailBudovySeznamJednotekNahlizeniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_jednotky?: string|null;
		/**Autogenerated.*/
		typ_jednotky?: number|null;
		/**Autogenerated.*/
		cislo_jednotky?: JsonDecimal|null;
		/**Autogenerated.*/
		cis_jed_part_cdom?: number|null;
		/**Autogenerated.*/
		cis_jed_part_jed?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		cislo_domovni?: number|null;
		/**Autogenerated.*/
		id_telesa?: string|null;
		/**Autogenerated.*/
		osu_rodne_cislo?: string|null;
		/**Autogenerated.*/
		osu_ico_num?: number|null;
		/**Autogenerated.*/
		osu_nazev_osu?: string|null;
		/**Autogenerated.*/
		nazev_kat_uzemi?: string|null;
		/**Autogenerated.*/
		nazev_zp_vyuz_jed?: string|null;
		/**Autogenerated.*/
		nazev_typ_jednotky?: string|null;
		/**Autogenerated.*/
		jednotka_nazev?: string|null;
	}
	const enum GDetailBudovySeznamJednotekNahlizeniDtoNames { id_jednotky = "id_jednotky", typ_jednotky = "typ_jednotky", cislo_jednotky = "cislo_jednotky", cis_jed_part_cdom = "cis_jed_part_cdom", cis_jed_part_jed = "cis_jed_part_jed", aktivita = "aktivita", cislo_tel = "cislo_tel", cislo_domovni = "cislo_domovni", id_telesa = "id_telesa", osu_rodne_cislo = "osu_rodne_cislo", osu_ico_num = "osu_ico_num", osu_nazev_osu = "osu_nazev_osu", nazev_kat_uzemi = "nazev_kat_uzemi", nazev_zp_vyuz_jed = "nazev_zp_vyuz_jed", nazev_typ_jednotky = "nazev_typ_jednotky", jednotka_nazev = "jednotka_nazev", Permissions = "Permissions",}
	const enum GDetailBudovySeznamJednotekNahlizeniDtoFragments { id_jednotky = "*", typ_jednotky = "*", cislo_jednotky = "*", cis_jed_part_cdom = "*", cis_jed_part_jed = "*", aktivita = "*", cislo_tel = "*", cislo_domovni = "*", id_telesa = "*", osu_rodne_cislo = "*", osu_ico_num = "*", osu_nazev_osu = "*", nazev_kat_uzemi = "*", nazev_zp_vyuz_jed = "*", nazev_typ_jednotky = "*", jednotka_nazev = "*", Permissions = "*",}
	const enum GDetailBudovySeznamJednotekNahlizeniDtoTypes { id_jednotky = "string", typ_jednotky = "number", cislo_jednotky = "JsonDecimal", cis_jed_part_cdom = "number", cis_jed_part_jed = "number", aktivita = "number", cislo_tel = "number", cislo_domovni = "number", id_telesa = "string", osu_rodne_cislo = "string", osu_ico_num = "number", osu_nazev_osu = "string", nazev_kat_uzemi = "string", nazev_zp_vyuz_jed = "string", nazev_typ_jednotky = "string", jednotka_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailBudovySeznamJednotekNahlizeniDtoTypeLengths { id_jednotky = 30, id_telesa = 30, osu_rodne_cislo = 10, osu_nazev_osu = 254, nazev_kat_uzemi = 48, nazev_zp_vyuz_jed = 60, nazev_typ_jednotky = 60, jednotka_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyBudovy\GDetailBudovySeznamParcelNahlizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**parcely pod budovou*/
	interface GDetailBudovySeznamParcelNahlizeniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_parcely?: string|null;
		/**Autogenerated.*/
		typ_parcely?: string|null;
		/**Autogenerated.*/
		kod_kat_uzemi?: number|null;
		/**Autogenerated.*/
		druh_cis_par?: number|null;
		/**Autogenerated.*/
		kmen_cislo_par?: number|null;
		/**Autogenerated.*/
		podd_cisla_par?: number|null;
		/**Autogenerated.*/
		dil_parcely?: number|null;
		/**Autogenerated.*/
		vymera_par?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		osu_rodne_cislo?: string|null;
		/**Autogenerated.*/
		osu_ico_num?: number|null;
		/**Autogenerated.*/
		osu_nazev_osu?: string|null;
		/**Autogenerated.*/
		nazev_kat_uzemi?: string|null;
		/**Autogenerated.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		nazev_zp_vyuz_poz?: string|null;
		/**Autogenerated.*/
		nazev_druh_poz?: string|null;
	}
	const enum GDetailBudovySeznamParcelNahlizeniDtoNames { id_parcely = "id_parcely", typ_parcely = "typ_parcely", kod_kat_uzemi = "kod_kat_uzemi", druh_cis_par = "druh_cis_par", kmen_cislo_par = "kmen_cislo_par", podd_cisla_par = "podd_cisla_par", dil_parcely = "dil_parcely", vymera_par = "vymera_par", aktivita = "aktivita", osu_rodne_cislo = "osu_rodne_cislo", osu_ico_num = "osu_ico_num", osu_nazev_osu = "osu_nazev_osu", nazev_kat_uzemi = "nazev_kat_uzemi", cislo_tel = "cislo_tel", nazev_zp_vyuz_poz = "nazev_zp_vyuz_poz", nazev_druh_poz = "nazev_druh_poz", Permissions = "Permissions",}
	const enum GDetailBudovySeznamParcelNahlizeniDtoFragments { id_parcely = "*", typ_parcely = "*", kod_kat_uzemi = "*", druh_cis_par = "*", kmen_cislo_par = "*", podd_cisla_par = "*", dil_parcely = "*", vymera_par = "*", aktivita = "*", osu_rodne_cislo = "*", osu_ico_num = "*", osu_nazev_osu = "*", nazev_kat_uzemi = "*", cislo_tel = "*", nazev_zp_vyuz_poz = "*", nazev_druh_poz = "*", Permissions = "*",}
	const enum GDetailBudovySeznamParcelNahlizeniDtoTypes { id_parcely = "string", typ_parcely = "string", kod_kat_uzemi = "number", druh_cis_par = "number", kmen_cislo_par = "number", podd_cisla_par = "number", dil_parcely = "number", vymera_par = "number", aktivita = "number", osu_rodne_cislo = "string", osu_ico_num = "number", osu_nazev_osu = "string", nazev_kat_uzemi = "string", cislo_tel = "number", nazev_zp_vyuz_poz = "string", nazev_druh_poz = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailBudovySeznamParcelNahlizeniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamJinePravniVztahyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Jine pravni vztahy nemovitosti*/
	interface GDetailNemovitostiSeznamJinePravniVztahyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_ji_pr_vztahu?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		id_parcely_pro?: string|null;
		/**Autogenerated.*/
		id_budovy_pro?: string|null;
		/**Autogenerated.*/
		id_jednotky_pro?: string|null;
		/**Autogenerated.*/
		id_parcely_k?: string|null;
		/**Autogenerated.*/
		id_budovy_k?: string|null;
		/**Autogenerated.*/
		id_jednotky_k?: string|null;
		/**Autogenerated.*/
		typ_pr_vztahu?: string|null;
		/**Autogenerated.*/
		typ_pr_vztahu_nazev?: string|null;
		/**Autogenerated.*/
		popis_pr_vzt?: string|null;
		/**Autogenerated.*/
		id_telesa?: string|null;
		/**Autogenerated.*/
		id_opr_subj_pro?: string|null;
		/**Autogenerated.*/
		id_opr_subj_k?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		podil_phl?: string|null;
		/**Autogenerated.*/
		hjpv_id?: string|null;
		/**Autogenerated.*/
		dat_vzniku2?: JsonDate|null;
		/**Autogenerated.*/
		id_rizeni_vzn2?: string|null;
		/**Autogenerated.*/
		id_opr_subj_pro2?: string|null;
	}
	const enum GDetailNemovitostiSeznamJinePravniVztahyDtoNames { id_ji_pr_vztahu = "id_ji_pr_vztahu", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_parcely_pro = "id_parcely_pro", id_budovy_pro = "id_budovy_pro", id_jednotky_pro = "id_jednotky_pro", id_parcely_k = "id_parcely_k", id_budovy_k = "id_budovy_k", id_jednotky_k = "id_jednotky_k", typ_pr_vztahu = "typ_pr_vztahu", typ_pr_vztahu_nazev = "typ_pr_vztahu_nazev", popis_pr_vzt = "popis_pr_vzt", id_telesa = "id_telesa", id_opr_subj_pro = "id_opr_subj_pro", id_opr_subj_k = "id_opr_subj_k", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", podil_phl = "podil_phl", hjpv_id = "hjpv_id", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", id_opr_subj_pro2 = "id_opr_subj_pro2", Permissions = "Permissions",}
	const enum GDetailNemovitostiSeznamJinePravniVztahyDtoFragments { id_ji_pr_vztahu = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", id_parcely_pro = "*", id_budovy_pro = "*", id_jednotky_pro = "*", id_parcely_k = "*", id_budovy_k = "*", id_jednotky_k = "*", typ_pr_vztahu = "*", typ_pr_vztahu_nazev = "*", popis_pr_vzt = "*", id_telesa = "*", id_opr_subj_pro = "*", id_opr_subj_k = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", podil_phl = "*", hjpv_id = "*", dat_vzniku2 = "*", id_rizeni_vzn2 = "*", id_opr_subj_pro2 = "*", Permissions = "*",}
	const enum GDetailNemovitostiSeznamJinePravniVztahyDtoTypes { id_ji_pr_vztahu = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_parcely_pro = "string", id_budovy_pro = "string", id_jednotky_pro = "string", id_parcely_k = "string", id_budovy_k = "string", id_jednotky_k = "string", typ_pr_vztahu = "string", typ_pr_vztahu_nazev = "string", popis_pr_vzt = "string", id_telesa = "string", id_opr_subj_pro = "string", id_opr_subj_k = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", podil_phl = "string", hjpv_id = "string", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", id_opr_subj_pro2 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemovitostiSeznamJinePravniVztahyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamListinyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Seznam listiny*/
	interface GDetailNemovitostiSeznamListinyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_listiny?: string|null;
		/**Autogenerated.*/
		typ_listiny?: number|null;
		/**Autogenerated.*/
		typ_listiny_nazev?: string|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		s_obsah?: number|null;
		/**Autogenerated.*/
		stran?: number|null;
		/**Autogenerated.*/
		dat_vyhotov?: JsonDate|null;
		/**Autogenerated.*/
		zhotovitel?: string|null;
		/**Autogenerated.*/
		por_cis_zhotov?: string|null;
		/**Autogenerated.*/
		rok_zhotov?: JsonDate|null;
		/**Autogenerated.*/
		dopl_zhotov?: string|null;
		/**Autogenerated.*/
		zkratka?: string|null;
		/**Autogenerated.*/
		id_rizeni?: string|null;
		/**Autogenerated.*/
		s_zmena_pr_vzt?: number|null;
		/**Autogenerated.*/
		s_zmena_pr_vzt_txt?: string|null;
		/**Autogenerated.*/
		dat_prav_moci?: JsonDate|null;
		/**Autogenerated.*/
		dat_vykonatel?: JsonDate|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		datum_hist_od?: JsonDate|null;
		/**Autogenerated.*/
		datum_hist_do?: JsonDate|null;
	}
	const enum GDetailNemovitostiSeznamListinyDtoNames { id_listiny = "id_listiny", typ_listiny = "typ_listiny", typ_listiny_nazev = "typ_listiny_nazev", popis = "popis", s_obsah = "s_obsah", stran = "stran", dat_vyhotov = "dat_vyhotov", zhotovitel = "zhotovitel", por_cis_zhotov = "por_cis_zhotov", rok_zhotov = "rok_zhotov", dopl_zhotov = "dopl_zhotov", zkratka = "zkratka", id_rizeni = "id_rizeni", s_zmena_pr_vzt = "s_zmena_pr_vzt", s_zmena_pr_vzt_txt = "s_zmena_pr_vzt_txt", dat_prav_moci = "dat_prav_moci", dat_vykonatel = "dat_vykonatel", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", datum_hist_od = "datum_hist_od", datum_hist_do = "datum_hist_do", Permissions = "Permissions",}
	const enum GDetailNemovitostiSeznamListinyDtoFragments { id_listiny = "*", typ_listiny = "*", typ_listiny_nazev = "*", popis = "*", s_obsah = "*", stran = "*", dat_vyhotov = "*", zhotovitel = "*", por_cis_zhotov = "*", rok_zhotov = "*", dopl_zhotov = "*", zkratka = "*", id_rizeni = "*", s_zmena_pr_vzt = "*", s_zmena_pr_vzt_txt = "*", dat_prav_moci = "*", dat_vykonatel = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", datum_hist_od = "*", datum_hist_do = "*", Permissions = "*",}
	const enum GDetailNemovitostiSeznamListinyDtoTypes { id_listiny = "string", typ_listiny = "number", typ_listiny_nazev = "string", popis = "string", s_obsah = "number", stran = "number", dat_vyhotov = "JsonDate", zhotovitel = "string", por_cis_zhotov = "string", rok_zhotov = "JsonDate", dopl_zhotov = "string", zkratka = "string", id_rizeni = "string", s_zmena_pr_vzt = "number", s_zmena_pr_vzt_txt = "string", dat_prav_moci = "JsonDate", dat_vykonatel = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", datum_hist_od = "JsonDate", datum_hist_do = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemovitostiSeznamListinyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamRizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**seznam rizeni*/
	interface GDetailNemovitostiSeznamRizeniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_rizeni?: string|null;
		/**Autogenerated.*/
		typ_rizeni?: string|null;
		/**Autogenerated.*/
		typ_rizeni_nazev?: string|null;
		/**Autogenerated.*/
		typ_pred_rizeni_nazev?: string|null;
		/**Autogenerated.*/
		poradove_cislo?: number|null;
		/**Autogenerated.*/
		rok?: JsonDate|null;
		/**Autogenerated.*/
		stav?: string|null;
		/**Autogenerated.*/
		funkce_kod?: number|null;
		/**Autogenerated.*/
		typope_kod?: number|null;
		/**Autogenerated.*/
		funkce_kod_vyz?: number|null;
		/**Autogenerated.*/
		typope_kod_vyz?: number|null;
		/**Autogenerated.*/
		uzisys_username?: string|null;
		/**Autogenerated.*/
		uzirol_nazev?: string|null;
		/**Autogenerated.*/
		s_osvobozeno?: number|null;
		/**Autogenerated.*/
		hodnota_kolku?: number|null;
		/**Autogenerated.*/
		datum?: JsonDate|null;
		/**Autogenerated.*/
		datum2?: JsonDate|null;
		/**datum plomby*/
		dat_plomby?: JsonDate|null;
		/**Datum odstraneni plomby*/
		dat_odstr_pl?: JsonDate|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GDetailNemovitostiSeznamRizeniDtoNames { id_rizeni = "id_rizeni", typ_rizeni = "typ_rizeni", typ_rizeni_nazev = "typ_rizeni_nazev", typ_pred_rizeni_nazev = "typ_pred_rizeni_nazev", poradove_cislo = "poradove_cislo", rok = "rok", stav = "stav", funkce_kod = "funkce_kod", typope_kod = "typope_kod", funkce_kod_vyz = "funkce_kod_vyz", typope_kod_vyz = "typope_kod_vyz", uzisys_username = "uzisys_username", uzirol_nazev = "uzirol_nazev", s_osvobozeno = "s_osvobozeno", hodnota_kolku = "hodnota_kolku", datum = "datum", datum2 = "datum2", dat_plomby = "dat_plomby", dat_odstr_pl = "dat_odstr_pl", popis = "popis", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDetailNemovitostiSeznamRizeniDtoFragments { id_rizeni = "*", typ_rizeni = "*", typ_rizeni_nazev = "*", typ_pred_rizeni_nazev = "*", poradove_cislo = "*", rok = "*", stav = "*", funkce_kod = "*", typope_kod = "*", funkce_kod_vyz = "*", typope_kod_vyz = "*", uzisys_username = "*", uzirol_nazev = "*", s_osvobozeno = "*", hodnota_kolku = "*", datum = "*", datum2 = "*", dat_plomby = "*", dat_odstr_pl = "*", popis = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GDetailNemovitostiSeznamRizeniDtoTypes { id_rizeni = "string", typ_rizeni = "string", typ_rizeni_nazev = "string", typ_pred_rizeni_nazev = "string", poradove_cislo = "number", rok = "JsonDate", stav = "string", funkce_kod = "number", typope_kod = "number", funkce_kod_vyz = "number", typope_kod_vyz = "number", uzisys_username = "string", uzirol_nazev = "string", s_osvobozeno = "number", hodnota_kolku = "number", datum = "JsonDate", datum2 = "JsonDate", dat_plomby = "JsonDate", dat_odstr_pl = "JsonDate", popis = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemovitostiSeznamRizeniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamVlastniciDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**seznam vlastniku parcely*/
	interface GDetailNemovitostiSeznamVlastnikuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_vlastnictvi?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		dat_vzniku2?: JsonDate|null;
		/**Autogenerated.*/
		id_rizeni_vzn2?: string|null;
		/**Autogenerated.*/
		cislo_tel?: number|null;
		/**Autogenerated.*/
		typ_pr_vztahu?: string|null;
		/**Autogenerated.*/
		typ_pr_vztahu_nazev?: string|null;
		/**Autogenerated.*/
		podil_citatel?: number|null;
		/**Autogenerated.*/
		podil_jmenov?: number|null;
		/**Autogenerated.*/
		podil?: string|null;
		/**Autogenerated.*/
		char_opr_subj_nazev?: string|null;
		/**Autogenerated.*/
		sjm_partner_1?: string|null;
		/**Autogenerated.*/
		sjm_partner_2?: string|null;
		/**Autogenerated.*/
		id_opr_subj_0?: string|null;
		/**Autogenerated.*/
		typ_opr_subj_0?: string|null;
		/**Autogenerated.*/
		rodne_cislo_0?: string|null;
		/**Autogenerated.*/
		ico_num_0?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		nazev_osu_0?: string|null;
		/**Autogenerated.*/
		titul_pred_0?: string|null;
		/**Autogenerated.*/
		jmeno_0?: string|null;
		/**Autogenerated.*/
		prijmeni_0?: string|null;
		/**Autogenerated.*/
		titul_za_0?: string|null;
		/**Autogenerated.*/
		cislo_domovni_0?: number|null;
		/**Autogenerated.*/
		cislo_orient_0?: string|null;
		/**Autogenerated.*/
		nazev_ulice_0?: string|null;
		/**Autogenerated.*/
		cast_obce_0?: string|null;
		/**Autogenerated.*/
		psc_0?: number|null;
		/**Autogenerated.*/
		obec_0?: string|null;
		/**Autogenerated.*/
		okres_0?: string|null;
		/**Autogenerated.*/
		stat_0?: string|null;
		/**Autogenerated.*/
		mestska_cast_0?: string|null;
		/**Autogenerated.*/
		cp_ce_0?: number|null;
		/**Autogenerated.*/
		kod_adrm_0?: number|null;
		/**Autogenerated.*/
		id_opr_subj_1?: string|null;
		/**Autogenerated.*/
		typ_opr_subj_1?: string|null;
		/**Autogenerated.*/
		rodne_cislo_1?: string|null;
		/**Autogenerated.*/
		ico_num_1?: number|null;
		/**Autogenerated.*/
		nazev_osu_1?: string|null;
		/**Autogenerated.*/
		titul_pred_1?: string|null;
		/**Autogenerated.*/
		jmeno_1?: string|null;
		/**Autogenerated.*/
		prijmeni_1?: string|null;
		/**Autogenerated.*/
		titul_za_1?: string|null;
		/**Autogenerated.*/
		cislo_domovni_1?: number|null;
		/**Autogenerated.*/
		cislo_orient_1?: string|null;
		/**Autogenerated.*/
		nazev_ulice_1?: string|null;
		/**Autogenerated.*/
		cast_obce_1?: string|null;
		/**Autogenerated.*/
		psc_1?: number|null;
		/**Autogenerated.*/
		obec_1?: string|null;
		/**Autogenerated.*/
		okres_1?: string|null;
		/**Autogenerated.*/
		stat_1?: string|null;
		/**Autogenerated.*/
		mestska_cast_1?: string|null;
		/**Autogenerated.*/
		cp_ce_1?: number|null;
		/**Autogenerated.*/
		kod_adrm_1?: number|null;
		/**Autogenerated.*/
		id_opr_subj_2?: string|null;
		/**Autogenerated.*/
		typ_opr_subj_2?: string|null;
		/**Autogenerated.*/
		char_opr_subj_nazev_2?: string|null;
		/**Autogenerated.*/
		rodne_cislo_2?: string|null;
		/**Autogenerated.*/
		ico_num_2?: number|null;
		/**Autogenerated.*/
		nazev_osu_2?: string|null;
		/**Autogenerated.*/
		titul_pred_2?: string|null;
		/**Autogenerated.*/
		jmeno_2?: string|null;
		/**Autogenerated.*/
		prijmeni_2?: string|null;
		/**Autogenerated.*/
		titul_za_2?: string|null;
		/**Autogenerated.*/
		cislo_domovni_2?: number|null;
		/**Autogenerated.*/
		cislo_orient_2?: string|null;
		/**Autogenerated.*/
		nazev_ulice_2?: string|null;
		/**Autogenerated.*/
		cast_obce_2?: string|null;
		/**Autogenerated.*/
		psc_2?: number|null;
		/**Autogenerated.*/
		obec_2?: string|null;
		/**Autogenerated.*/
		okres_2?: string|null;
		/**Autogenerated.*/
		stat_2?: string|null;
		/**Autogenerated.*/
		mestska_cast_2?: string|null;
		/**Autogenerated.*/
		cp_ce_2?: number|null;
		/**Autogenerated.*/
		kod_adrm_2?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GDetailNemovitostiSeznamVlastnikuDtoNames { id_vlastnictvi = "id_vlastnictvi", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", cislo_tel = "cislo_tel", typ_pr_vztahu = "typ_pr_vztahu", typ_pr_vztahu_nazev = "typ_pr_vztahu_nazev", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", podil = "podil", char_opr_subj_nazev = "char_opr_subj_nazev", sjm_partner_1 = "sjm_partner_1", sjm_partner_2 = "sjm_partner_2", id_opr_subj_0 = "id_opr_subj_0", typ_opr_subj_0 = "typ_opr_subj_0", rodne_cislo_0 = "rodne_cislo_0", ico_num_0 = "ico_num_0", nazev = "nazev", nazev_osu_0 = "nazev_osu_0", titul_pred_0 = "titul_pred_0", jmeno_0 = "jmeno_0", prijmeni_0 = "prijmeni_0", titul_za_0 = "titul_za_0", cislo_domovni_0 = "cislo_domovni_0", cislo_orient_0 = "cislo_orient_0", nazev_ulice_0 = "nazev_ulice_0", cast_obce_0 = "cast_obce_0", psc_0 = "psc_0", obec_0 = "obec_0", okres_0 = "okres_0", stat_0 = "stat_0", mestska_cast_0 = "mestska_cast_0", cp_ce_0 = "cp_ce_0", kod_adrm_0 = "kod_adrm_0", id_opr_subj_1 = "id_opr_subj_1", typ_opr_subj_1 = "typ_opr_subj_1", rodne_cislo_1 = "rodne_cislo_1", ico_num_1 = "ico_num_1", nazev_osu_1 = "nazev_osu_1", titul_pred_1 = "titul_pred_1", jmeno_1 = "jmeno_1", prijmeni_1 = "prijmeni_1", titul_za_1 = "titul_za_1", cislo_domovni_1 = "cislo_domovni_1", cislo_orient_1 = "cislo_orient_1", nazev_ulice_1 = "nazev_ulice_1", cast_obce_1 = "cast_obce_1", psc_1 = "psc_1", obec_1 = "obec_1", okres_1 = "okres_1", stat_1 = "stat_1", mestska_cast_1 = "mestska_cast_1", cp_ce_1 = "cp_ce_1", kod_adrm_1 = "kod_adrm_1", id_opr_subj_2 = "id_opr_subj_2", typ_opr_subj_2 = "typ_opr_subj_2", char_opr_subj_nazev_2 = "char_opr_subj_nazev_2", rodne_cislo_2 = "rodne_cislo_2", ico_num_2 = "ico_num_2", nazev_osu_2 = "nazev_osu_2", titul_pred_2 = "titul_pred_2", jmeno_2 = "jmeno_2", prijmeni_2 = "prijmeni_2", titul_za_2 = "titul_za_2", cislo_domovni_2 = "cislo_domovni_2", cislo_orient_2 = "cislo_orient_2", nazev_ulice_2 = "nazev_ulice_2", cast_obce_2 = "cast_obce_2", psc_2 = "psc_2", obec_2 = "obec_2", okres_2 = "okres_2", stat_2 = "stat_2", mestska_cast_2 = "mestska_cast_2", cp_ce_2 = "cp_ce_2", kod_adrm_2 = "kod_adrm_2", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDetailNemovitostiSeznamVlastnikuDtoFragments { id_vlastnictvi = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", dat_vzniku2 = "*", id_rizeni_vzn2 = "*", cislo_tel = "*", typ_pr_vztahu = "*", typ_pr_vztahu_nazev = "*", podil_citatel = "*", podil_jmenov = "*", podil = "*", char_opr_subj_nazev = "*", sjm_partner_1 = "*", sjm_partner_2 = "*", id_opr_subj_0 = "*", typ_opr_subj_0 = "*", rodne_cislo_0 = "*", ico_num_0 = "*", nazev = "*", nazev_osu_0 = "*", titul_pred_0 = "*", jmeno_0 = "*", prijmeni_0 = "*", titul_za_0 = "*", cislo_domovni_0 = "*", cislo_orient_0 = "*", nazev_ulice_0 = "*", cast_obce_0 = "*", psc_0 = "*", obec_0 = "*", okres_0 = "*", stat_0 = "*", mestska_cast_0 = "*", cp_ce_0 = "*", kod_adrm_0 = "*", id_opr_subj_1 = "*", typ_opr_subj_1 = "*", rodne_cislo_1 = "*", ico_num_1 = "*", nazev_osu_1 = "*", titul_pred_1 = "*", jmeno_1 = "*", prijmeni_1 = "*", titul_za_1 = "*", cislo_domovni_1 = "*", cislo_orient_1 = "*", nazev_ulice_1 = "*", cast_obce_1 = "*", psc_1 = "*", obec_1 = "*", okres_1 = "*", stat_1 = "*", mestska_cast_1 = "*", cp_ce_1 = "*", kod_adrm_1 = "*", id_opr_subj_2 = "*", typ_opr_subj_2 = "*", char_opr_subj_nazev_2 = "*", rodne_cislo_2 = "*", ico_num_2 = "*", nazev_osu_2 = "*", titul_pred_2 = "*", jmeno_2 = "*", prijmeni_2 = "*", titul_za_2 = "*", cislo_domovni_2 = "*", cislo_orient_2 = "*", nazev_ulice_2 = "*", cast_obce_2 = "*", psc_2 = "*", obec_2 = "*", okres_2 = "*", stat_2 = "*", mestska_cast_2 = "*", cp_ce_2 = "*", kod_adrm_2 = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GDetailNemovitostiSeznamVlastnikuDtoTypes { id_vlastnictvi = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", cislo_tel = "number", typ_pr_vztahu = "string", typ_pr_vztahu_nazev = "string", podil_citatel = "number", podil_jmenov = "number", podil = "string", char_opr_subj_nazev = "string", sjm_partner_1 = "string", sjm_partner_2 = "string", id_opr_subj_0 = "string", typ_opr_subj_0 = "string", rodne_cislo_0 = "string", ico_num_0 = "number", nazev = "string", nazev_osu_0 = "string", titul_pred_0 = "string", jmeno_0 = "string", prijmeni_0 = "string", titul_za_0 = "string", cislo_domovni_0 = "number", cislo_orient_0 = "string", nazev_ulice_0 = "string", cast_obce_0 = "string", psc_0 = "number", obec_0 = "string", okres_0 = "string", stat_0 = "string", mestska_cast_0 = "string", cp_ce_0 = "number", kod_adrm_0 = "number", id_opr_subj_1 = "string", typ_opr_subj_1 = "string", rodne_cislo_1 = "string", ico_num_1 = "number", nazev_osu_1 = "string", titul_pred_1 = "string", jmeno_1 = "string", prijmeni_1 = "string", titul_za_1 = "string", cislo_domovni_1 = "number", cislo_orient_1 = "string", nazev_ulice_1 = "string", cast_obce_1 = "string", psc_1 = "number", obec_1 = "string", okres_1 = "string", stat_1 = "string", mestska_cast_1 = "string", cp_ce_1 = "number", kod_adrm_1 = "number", id_opr_subj_2 = "string", typ_opr_subj_2 = "string", char_opr_subj_nazev_2 = "string", rodne_cislo_2 = "string", ico_num_2 = "number", nazev_osu_2 = "string", titul_pred_2 = "string", jmeno_2 = "string", prijmeni_2 = "string", titul_za_2 = "string", cislo_domovni_2 = "number", cislo_orient_2 = "string", nazev_ulice_2 = "string", cast_obce_2 = "string", psc_2 = "number", obec_2 = "string", okres_2 = "string", stat_2 = "string", mestska_cast_2 = "string", cp_ce_2 = "number", kod_adrm_2 = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemovitostiSeznamVlastnikuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamZaznamuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Seznam zaznamu nemovitosti Dto*/
	interface GDetailNemovitostiSeznamZaznamuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixs_zaz?: string|null;
		/**Autogenerated.*/
		ixs_tza?: string|null;
		/**Autogenerated.*/
		ixs_tza_nazev?: string|null;
		/**Autogenerated.*/
		dat_zaz?: JsonDate|null;
		/**Autogenerated.*/
		text_zaz?: string|null;
		/**Autogenerated.*/
		obsah_zaz?: string|null;
		/**Autogenerated.*/
		id_parcely?: string|null;
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		id_jednotky?: string|null;
		/**Autogenerated.*/
		s_pri?: number|null;
		/**Autogenerated.*/
		popis_pri?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GDetailNemovitostiSeznamZaznamuDtoNames { ixs_zaz = "ixs_zaz", ixs_tza = "ixs_tza", ixs_tza_nazev = "ixs_tza_nazev", dat_zaz = "dat_zaz", text_zaz = "text_zaz", obsah_zaz = "obsah_zaz", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", s_pri = "s_pri", popis_pri = "popis_pri", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDetailNemovitostiSeznamZaznamuDtoFragments { ixs_zaz = "*", ixs_tza = "*", ixs_tza_nazev = "*", dat_zaz = "*", text_zaz = "*", obsah_zaz = "*", id_parcely = "*", id_budovy = "*", id_jednotky = "*", s_pri = "*", popis_pri = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GDetailNemovitostiSeznamZaznamuDtoTypes { ixs_zaz = "string", ixs_tza = "string", ixs_tza_nazev = "string", dat_zaz = "JsonDate", text_zaz = "string", obsah_zaz = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", s_pri = "number", popis_pri = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemovitostiSeznamZaznamuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyNemovitosti\GDetailNemovitostiSeznamZONDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Zpusob ochrany parcely dto*/
	interface GDetailNemovitostiSeznamZONDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_zp_ochrany?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		zp_ochrany?: number|null;
		/**Autogenerated.*/
		zp_ochrany_nazev?: string|null;
		/**Autogenerated.*/
		id_parcely?: string|null;
		/**Autogenerated.*/
		id_budovy?: string|null;
		/**Autogenerated.*/
		id_jednotky?: string|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GDetailNemovitostiSeznamZONDtoNames { id_zp_ochrany = "id_zp_ochrany", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", zp_ochrany = "zp_ochrany", zp_ochrany_nazev = "zp_ochrany_nazev", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDetailNemovitostiSeznamZONDtoFragments { id_zp_ochrany = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", zp_ochrany = "*", zp_ochrany_nazev = "*", id_parcely = "*", id_budovy = "*", id_jednotky = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GDetailNemovitostiSeznamZONDtoTypes { id_zp_ochrany = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", zp_ochrany = "number", zp_ochrany_nazev = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailNemovitostiSeznamZONDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyParcely\GDetailParcelyMAJDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**tab Karta DHM*/
	interface GDetaiParcelylMAJDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixs_maj?: string|null;
		/**Autogenerated.*/
		inv_cis?: string|null;
		/**Autogenerated.*/
		evi_cis?: string|null;
		/**Autogenerated.*/
		mat_cis?: string|null;
		/**Autogenerated.*/
		skp?: string|null;
		/**Autogenerated.*/
		nazev_skp?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		ueab_por?: string|null;
		/**Autogenerated.*/
		ueab_evi?: string|null;
		/**Autogenerated.*/
		pmj?: JsonDecimal|null;
		/**Autogenerated.*/
		c?: JsonDecimal|null;
		/**Autogenerated.*/
		dat_por?: JsonDate|null;
		/**Autogenerated.*/
		dat_zar?: JsonDate|null;
		/**Autogenerated.*/
		dat_vyr?: JsonDate|null;
		/**Autogenerated.*/
		nks?: string|null;
		/**Autogenerated.*/
		trida?: string|null;
		/**Autogenerated.*/
		drh_id?: number|null;
		/**Autogenerated.*/
		drh_id_txt?: string|null;
		/**Autogenerated.*/
		mj?: string|null;
		/**Autogenerated.*/
		stredisko?: string|null;
		/**Autogenerated.*/
		tev?: number|null;
		/**Autogenerated.*/
		dev?: number|null;
		/**Autogenerated.*/
		mat_akt?: number|null;
		/**Autogenerated.*/
		mat_akt_txt?: string|null;
	}
	const enum GDetaiParcelylMAJDtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis", evi_cis = "evi_cis", mat_cis = "mat_cis", skp = "skp", nazev_skp = "nazev_skp", nazev = "nazev", ueab_por = "ueab_por", ueab_evi = "ueab_evi", pmj = "pmj", c = "c", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", nks = "nks", trida = "trida", drh_id = "drh_id", drh_id_txt = "drh_id_txt", mj = "mj", stredisko = "stredisko", tev = "tev", dev = "dev", mat_akt = "mat_akt", mat_akt_txt = "mat_akt_txt", Permissions = "Permissions",}
	const enum GDetaiParcelylMAJDtoFragments { ixs_maj = "*", inv_cis = "*", evi_cis = "*", mat_cis = "*", skp = "*", nazev_skp = "*", nazev = "*", ueab_por = "*", ueab_evi = "*", pmj = "*", c = "*", dat_por = "*", dat_zar = "*", dat_vyr = "*", nks = "*", trida = "*", drh_id = "*", drh_id_txt = "*", mj = "*", stredisko = "*", tev = "*", dev = "*", mat_akt = "*", mat_akt_txt = "*", Permissions = "*",}
	const enum GDetaiParcelylMAJDtoTypes { ixs_maj = "string", inv_cis = "string", evi_cis = "string", mat_cis = "string", skp = "string", nazev_skp = "string", nazev = "string", ueab_por = "string", ueab_evi = "string", pmj = "JsonDecimal", c = "JsonDecimal", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", nks = "string", trida = "string", drh_id = "number", drh_id_txt = "string", mj = "string", stredisko = "string", tev = "number", dev = "number", mat_akt = "number", mat_akt_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetaiParcelylMAJDtoTypeLengths { ixs_maj = 12, inv_cis = 50, evi_cis = 40, skp = 15, nazev_skp = 254, nazev = 254, ueab_por = 7, ueab_evi = 7, nks = 12, trida = 4, mj = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Detaily\Dto\DetailyParcely\GDetailParcelySeznamBDPDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Bonitni dily parcel Dto*/
	interface GDetailParcelySeznamBDPDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		id_parcely?: string|null;
		/**Autogenerated.*/
		bonita?: string|null;
		/**Autogenerated.*/
		stav_dat?: number|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_zaniku?: JsonDate|null;
		/**Autogenerated.*/
		id_pr_kontx?: number|null;
		/**Autogenerated.*/
		id_rizeni_vzn?: string|null;
		/**Autogenerated.*/
		id_rizeni_zan?: string|null;
		/**Autogenerated.*/
		vymera?: number|null;
		/**Autogenerated.*/
		c_cena_jednotkova?: JsonDecimal|null;
		/**Autogenerated.*/
		c_cena_celkova?: JsonDecimal|null;
		/**Autogenerated.*/
		ixs_dav?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GDetailParcelySeznamBDPDtoNames { id_parcely = "id_parcely", bonita = "bonita", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", vymera = "vymera", c_cena_jednotkova = "c_cena_jednotkova", c_cena_celkova = "c_cena_celkova", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDetailParcelySeznamBDPDtoFragments { id_parcely = "*", bonita = "*", stav_dat = "*", dat_vzniku = "*", dat_zaniku = "*", id_pr_kontx = "*", id_rizeni_vzn = "*", id_rizeni_zan = "*", vymera = "*", c_cena_jednotkova = "*", c_cena_celkova = "*", ixs_dav = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GDetailParcelySeznamBDPDtoTypes { id_parcely = "string", bonita = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", vymera = "number", c_cena_jednotkova = "JsonDecimal", c_cena_celkova = "JsonDecimal", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailParcelySeznamBDPDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenAdresaBudovyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsbao
	*      Adresa budovy - Vazba mezi budovou a adresou
	*/
	interface GRenAdresaBudovyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		cisdom_hod?: number|null;
		/**Identifikátor budovy katastru nemovitostí*/
		id_budovy?: string|null;
		/**Vazba na část budovy nebo budovu (1 - Ano, 0 - Ne)*/
		s_cb_kn?: number|null;
		/**Kód objektu*/
		objekt_kod?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GRenAdresaBudovyDtoNames { cisdom_hod = "cisdom_hod", id_budovy = "id_budovy", s_cb_kn = "s_cb_kn", objekt_kod = "objekt_kod", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenAdresaBudovyDtoFragments { cisdom_hod = "Base", id_budovy = "Base", s_cb_kn = "Base", objekt_kod = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenAdresaBudovyDtoTypes { cisdom_hod = "number", id_budovy = "string", s_cb_kn = "number", objekt_kod = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenAdresaBudovyDtoTypeLengths { id_budovy = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenAdresniMistoDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsado
	*      Adresní místo
	*/
	interface GRenAdresniMistoDto extends GRenBaseDetailDto {
		/**Kód adresy*/
		adresa_kod?: number|null;
		/**Kód objektu*/
		objekt_kod?: number|null;
		/**Kód ulice*/
		ulice_kod?: number|null;
		/**Číslo orientační*/
		cis_orient?: string|null;
		/**Poštovní směrovací číslo*/
		psc?: number|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Název ulice*/
		ulice_nazev?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GRenAdresniMistoDtoNames { adresa_kod = "adresa_kod", objekt_kod = "objekt_kod", ulice_kod = "ulice_kod", cis_orient = "cis_orient", psc = "psc", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ulice_nazev = "ulice_nazev", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenAdresniMistoDtoFragments { adresa_kod = "Base", objekt_kod = "Base", ulice_kod = "Base", cis_orient = "Base", psc = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ulice_nazev = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenAdresniMistoDtoTypes { adresa_kod = "number", objekt_kod = "number", ulice_kod = "number", cis_orient = "string", psc = "number", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ulice_nazev = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenAdresniMistoDtoTypeLengths { cis_orient = 4, ulice_nazev = 48, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenBaseNemovitostDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DTO - BaseNemovitost*/
	interface GRenBaseNemovitostDto {
		/**Příznak, zda je načten majetkový profil*/
		readonly JeMajetkovyProfil?: boolean|null;
		/**Příznak, zda je načten majetkový profil*/
		CountMajetkovyProfil?: number|null;
		/**Identifikátor MAJ*/
		IxsMaj?: string|null;
		/**Majetkový profil nemovitosti*/
		DetailMAJ?: Gordic.Ren.Interface.GRenMajetkovyProfilDto|null;
		/**TypNemovitosti*/
		readonly TypNemovitosti?: Gordic.Ren.Interface.TypNemovitostiEnum|null;
		/**IdNemovitosti*/
		IdNemovitosti?: string|null;
		/**Lze povolit editaci*/
		LzePovolitEditacniRezim?: boolean|null;
		/**Oprávnění*/
		Permissions?: GRenBaseDetailDto|null;
	}
	const enum GRenBaseNemovitostDtoNames { JeMajetkovyProfil = "JeMajetkovyProfil", CountMajetkovyProfil = "CountMajetkovyProfil", IxsMaj = "IxsMaj", DetailMAJ = "DetailMAJ", TypNemovitosti = "TypNemovitosti", IdNemovitosti = "IdNemovitosti", LzePovolitEditacniRezim = "LzePovolitEditacniRezim", Permissions = "Permissions",}
	const enum GRenBaseNemovitostDtoFragments { JeMajetkovyProfil = "*", CountMajetkovyProfil = "*", IxsMaj = "*", DetailMAJ = "*", TypNemovitosti = "*", IdNemovitosti = "*", LzePovolitEditacniRezim = "*", Permissions = "Permissions",}
	const enum GRenBaseNemovitostDtoTypes { JeMajetkovyProfil = "boolean", CountMajetkovyProfil = "number", IxsMaj = "string", DetailMAJ = "Gordic.Ren.Interface.GRenMajetkovyProfilDto", TypNemovitosti = "Gordic.Ren.Interface.TypNemovitostiEnum", IdNemovitosti = "string", LzePovolitEditacniRezim = "boolean", Permissions = "GRenBaseDetailDto",}
	const enum GRenBaseNemovitostDtoTypeLengths {}
	/**Výčtový typ Typ Nemovitosti*/
	const enum TypNemovitostiEnum {
		/**Neuvedeno*/
		Neuvedeno=0,
		/**Parcela*/
		Parcela=10,
		/**Budova*/
		Budova=20,
		/**Jednotka*/
		Jednotka=40,
	}
	/**Výčtový typ pro obrázky na detailu*/
	const enum GDetailNemovitostiImageFilter {
		/**Parcela*/
		Parcela=1,
		/**Budova*/
		Budova=2,
		/**Jednotka*/
		Jednotka=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenBonitniDilParcelyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemvbdp*/
	interface GRenBonitniDilParcelyDto extends GRenBaseDetailDto {
		/**Identifikátor parcely v katastru nemovitostí*/
		id_parcely?: string|null;
		/**Kód bonitního dílu parcely*/
		bonita?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Výměra bonitního dílu*/
		vymera?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemvbdp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemvbdp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemvbdp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemvbdp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:nemsbon.c_cena_jednotkova*/
		c_cena_jednotkova?: JsonDecimal|null;
		/**DBCOLUMN:nemsbon.c_cena_celkova*/
		c_cena_celkova?: JsonDecimal|null;
		/**Bonita_txt.*/
		bonita_txt?: string|null;
		/**Ixs_dav_txt.*/
		ixs_dav_txt?: string|null;
		/**Id_parcely_txt.*/
		id_parcely_txt?: string|null;
		/**Id_pr_kontx_txt.*/
		id_pr_kontx_txt?: string|null;
		/**Stav_dat_txt.*/
		stav_dat_txt?: string|null;
	}
	const enum GRenBonitniDilParcelyDtoNames { id_parcely = "id_parcely", bonita = "bonita", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", vymera = "vymera", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_cena_jednotkova = "c_cena_jednotkova", c_cena_celkova = "c_cena_celkova", bonita_txt = "bonita_txt", ixs_dav_txt = "ixs_dav_txt", id_parcely_txt = "id_parcely_txt", id_pr_kontx_txt = "id_pr_kontx_txt", stav_dat_txt = "stav_dat_txt",}
	const enum GRenBonitniDilParcelyDtoFragments { id_parcely = "Base", bonita = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", vymera = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", c_cena_jednotkova = "Base", c_cena_celkova = "Base", bonita_txt = "bonita_txt", ixs_dav_txt = "ixs_dav_txt", id_parcely_txt = "id_parcely_txt", id_pr_kontx_txt = "id_pr_kontx_txt", stav_dat_txt = "stav_dat_txt",}
	const enum GRenBonitniDilParcelyDtoTypes { id_parcely = "string", bonita = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", vymera = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_cena_jednotkova = "JsonDecimal", c_cena_celkova = "JsonDecimal", bonita_txt = "string", ixs_dav_txt = "string", id_parcely_txt = "string", id_pr_kontx_txt = "string", stav_dat_txt = "string",}
	const enum GRenBonitniDilParcelyDtoTypeLengths { id_parcely = 30, bonita = 5, id_rizeni_vzn = 30, id_rizeni_zan = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenBudovaDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsbud*/
	interface GRenBudovaDto extends Gordic.Ren.Interface.GRenBaseDetailNemovitostiDto {
		/**Identifikátor budovy katastru nemovitostí*/
		id_budovy?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Typ budovy*/
		typ_budovy?: number|null;
		/**Kód části obce*/
		kod_casti_obce?: number|null;
		/**Číslo domovní*/
		cislo_domovni?: number|null;
		/**Cena nemovitosti*/
		c_cena_nem?: JsonDecimal|null;
		/**Způsob využití budovy*/
		zp_vyuz_bud?: number|null;
		/**Odkaz na unikátní generované číslo tělesa*/
		id_telesa?: string|null;
		/**Cena nemovitosti z ocenění v REN*/
		c_cena_oc?: JsonDecimal|null;
		/**Datum ocenění*/
		dat_oc?: JsonDate|null;
		/**Popis ocenění*/
		popis_oc?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Způsob ocenění nemovitosti*/
		zp_oc?: number|null;
		/**Typ dat*/
		typ_dat?: number|null;
		/**Identifikátor budovy z katastru nemovitostí (pokud byl záznam založen uživatelsky)*/
		id_budovy_orig?: string|null;
		/**Název budovy - uživatelský*/
		budova_nazev?: string|null;
		/**Kód katastrálního území*/
		kod_kat_uzemi?: number|null;
		/**Datum zahájení vkladu do katastru nemovitostí*/
		dat_zahajeni?: JsonDate|null;
		/**Datum vkladu do katastru nemovitostí*/
		dat_vkladu?: JsonDate|null;
		/**Dočasná stavba - příznak NE-ANO (0-1)*/
		doc_sta?: number|null;
		/**Indikátor stavby, je-li součástí pozemku*/
		st_soucasti?: number|null;
		/**Odkaz na unikátní generované číslo práva stavby*/
		id_pr_sta?: string|null;
		/**Parcely pod budovou textem*/
		par_pod_bud_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**majcdrm.drh_txt*/
		drh_id_txt?: string|null;
		/**majcakt.mat_akt_txt*/
		mat_akt_txt?: string|null;
		/**Navigační vlastnost pro Parcela*/
		Parcela?: Gordic.Ren.Interface.GRenParcelaDto|null;
		parcely_pod_budovou?: string|null;
		vymera_par_rozdil?: number|null;
		druh_poz_rozdil?: number|null;
	}
	const enum GRenBudovaDtoNames { id_budovy = "id_budovy", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", typ_budovy = "typ_budovy", kod_casti_obce = "kod_casti_obce", cislo_domovni = "cislo_domovni", c_cena_nem = "c_cena_nem", zp_vyuz_bud = "zp_vyuz_bud", id_telesa = "id_telesa", c_cena_oc = "c_cena_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_oc = "zp_oc", typ_dat = "typ_dat", id_budovy_orig = "id_budovy_orig", budova_nazev = "budova_nazev", kod_kat_uzemi = "kod_kat_uzemi", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", doc_sta = "doc_sta", st_soucasti = "st_soucasti", id_pr_sta = "id_pr_sta", par_pod_bud_txt = "par_pod_bud_txt", pocet = "pocet", drh_id_txt = "drh_id_txt", mat_akt_txt = "mat_akt_txt", Parcela = "Parcela", parcely_pod_budovou = "parcely_pod_budovou", vymera_par_rozdil = "vymera_par_rozdil", druh_poz_rozdil = "druh_poz_rozdil", Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", aktivita_ku = "aktivita_ku", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil", email_avizo_vklad_txt = "email_avizo_vklad_txt", Permissions = "Permissions",}
	const enum GRenBudovaDtoFragments { id_budovy = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", typ_budovy = "Base", kod_casti_obce = "Base", cislo_domovni = "Base", c_cena_nem = "Base", zp_vyuz_bud = "Base", id_telesa = "Base", c_cena_oc = "Base", dat_oc = "Base", popis_oc = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zp_oc = "Base", typ_dat = "Base", id_budovy_orig = "Base", budova_nazev = "Base", kod_kat_uzemi = "Base", dat_zahajeni = "Base", dat_vkladu = "Base", doc_sta = "Base", st_soucasti = "Base", id_pr_sta = "Base", par_pod_bud_txt = "Base", pocet = "main", drh_id_txt = "drh_id_txt", mat_akt_txt = "mat_akt_txt", Parcela = "Parcela", parcely_pod_budovou = "*", vymera_par_rozdil = "*", druh_poz_rozdil = "*", Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "Base", s_zastavni_pravo = "Base", aktivita_ku = "Extended", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*", email_avizo_vklad_txt = "*", Permissions = "*",}
	const enum GRenBudovaDtoTypes { id_budovy = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", typ_budovy = "number", kod_casti_obce = "number", cislo_domovni = "number", c_cena_nem = "JsonDecimal", zp_vyuz_bud = "number", id_telesa = "string", c_cena_oc = "JsonDecimal", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_oc = "number", typ_dat = "number", id_budovy_orig = "string", budova_nazev = "string", kod_kat_uzemi = "number", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", doc_sta = "number", st_soucasti = "number", id_pr_sta = "string", par_pod_bud_txt = "string", pocet = "number", drh_id_txt = "string", mat_akt_txt = "string", Parcela = "Gordic.Ren.Interface.GRenParcelaDto", parcely_pod_budovou = "string", vymera_par_rozdil = "number", druh_poz_rozdil = "number", Teleso = "Gordic.Ren.Interface.GRenTelesoDto", KatastralniUzemi = "Gordic.Ren.Interface.GRenKatastralniUzemiDto", ZpusobVyuzitiBudovy = "Gordic.Ren.Interface.GRenZpusobVyuzitiBudovyDto", CastObce = "Gordic.Ren.Interface.GRenCastObceDto", Okres = "Gordic.Ren.Interface.GRenOkresDto", Kraj = "Gordic.Ren.Interface.GRenKrajDto", Obec = "Gordic.Ren.Interface.GRenObecDto", TypBudovy = "Gordic.Ren.Interface.GRenTypBudovyDto", ZmenaProv = "Gordic.Gin.Interface.GGinszmpDto", Vlastnictvi = "Gordic.Ren.Interface.GRenVlastnictviDto", OpravnenySubjekt = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", CharakteristikaOs = "Gordic.Ren.Interface.GRenCharakteristikaOsDto", TypPravnihoVztahu = "Gordic.Ren.Interface.GRenTypPravnihoVztahuDto", MajetkovyProfil = "Gordic.Ren.Interface.GRenMajetkovyProfilDto", RozsirenyMajetkovyProfil = "Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto", ProfilTextuZaznamu = "Gordic.Ren.Interface.GRenProfilTextuZaznamuDto", ZaznamKNemovitosti = "Gordic.Ren.Interface.GRenZaznamKNemovitostiDto", TypZaznamu = "Gordic.Ren.Interface.GRenTypZaznamuDto", s_vecne_bremeno = "number", s_zastavni_pravo = "number", aktivita_ku = "number", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number", email_avizo_vklad_txt = "string", Permissions = "Gordic.Ren.Interface.GRenNemovitostPermissions",}
	const enum GRenBudovaDtoTypeLengths { id_budovy = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_telesa = 30, popis_oc = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_budovy_orig = 30, budova_nazev = 100, id_pr_sta = 30, par_pod_bud_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenCastBudovyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemscbu
	*      Část budovy
	*/
	interface GRenCastBudovyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor budovy v katastru nemovitostí*/
		id_budovy?: string|null;
		/**Typ budovy*/
		typ_budovy?: number|null;
		/**Číslo domovní*/
		cislo_domovni?: number|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Cena nemovitosti*/
		c_cena_nem?: JsonDecimal|null;
		/**Cena nemovitosti z ocenění v REN*/
		c_cena_oc?: JsonDecimal|null;
		/**Datum ocenění*/
		dat_oc?: JsonDate|null;
		/**Popis ocenění*/
		popis_oc?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka
		*      Všeobecná textová poznámka
		*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Způsob ocenění*/
		zp_oc?: number|null;
		/**Navigační vlastnost pro TypBudovy*/
		TypBudovy?: Gordic.Ren.Interface.GRenTypBudovyDto|null;
	}
	const enum GRenCastBudovyDtoNames { id_budovy = "id_budovy", typ_budovy = "typ_budovy", cislo_domovni = "cislo_domovni", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", c_cena_nem = "c_cena_nem", c_cena_oc = "c_cena_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_oc = "zp_oc", TypBudovy = "TypBudovy", Permissions = "Permissions",}
	const enum GRenCastBudovyDtoFragments { id_budovy = "Base", typ_budovy = "Base", cislo_domovni = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", c_cena_nem = "Base", c_cena_oc = "Base", dat_oc = "Base", popis_oc = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zp_oc = "Base", TypBudovy = "TypBudovy", Permissions = "*",}
	const enum GRenCastBudovyDtoTypes { id_budovy = "string", typ_budovy = "number", cislo_domovni = "number", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", c_cena_nem = "JsonDecimal", c_cena_oc = "JsonDecimal", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_oc = "number", TypBudovy = "Gordic.Ren.Interface.GRenTypBudovyDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenCastBudovyDtoTypeLengths { id_budovy = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, popis_oc = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenCastObceDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemscob
	*      Část obce katastru nemovitostí
	*/
	interface GRenCastObceDto extends GRenBaseDetailDto {
		/**Kód části obce*/
		kod_casti_obce?: number|null;
		/**Kód obce*/
		kod_obce?: number|null;
		/**Název části obce*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Navigační vlastnost pro Obec (kod_obce)*/
		Obec?: Gordic.Ren.Interface.GRenObecDto|null;
	}
	const enum GRenCastObceDtoNames { kod_casti_obce = "kod_casti_obce", kod_obce = "kod_obce", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Obec = "Obec",}
	const enum GRenCastObceDtoFragments { kod_casti_obce = "Base", kod_obce = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Obec = "Obec",}
	const enum GRenCastObceDtoTypes { kod_casti_obce = "number", kod_obce = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Obec = "Gordic.Ren.Interface.GRenObecDto",}
	const enum GRenCastObceDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenCharakteristikaOsDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemscos
	*      Centrálně udržovaný číselník bližší charakteristiky oprávněného subjektu - oprávněné osoby
	*/
	interface GRenCharakteristikaOsDto extends GRenBaseDetailDto {
		/**Kód rozlišení oprávněného subjektu*/
		char_opr_subj?: number|null;
		/**Název charakteristiky oprávněného subjektu*/
		nazev?: string|null;
		/**Typ oprávněného subjektu*/
		typ_opr_subj?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Zkratka charakteristiky OS*/
		zkratka?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Zkratka charakteristiky OS určená pro sekci A_LV*/
		zkratka_alv?: string|null;
	}
	const enum GRenCharakteristikaOsDtoNames { char_opr_subj = "char_opr_subj", nazev = "nazev", typ_opr_subj = "typ_opr_subj", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", zkratka = "zkratka", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka_alv = "zkratka_alv",}
	const enum GRenCharakteristikaOsDtoFragments { char_opr_subj = "Base", nazev = "Base", typ_opr_subj = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", zkratka = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zkratka_alv = "Base",}
	const enum GRenCharakteristikaOsDtoTypes { char_opr_subj = "number", nazev = "string", typ_opr_subj = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", zkratka = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka_alv = "string",}
	const enum GRenCharakteristikaOsDtoTypeLengths { nazev = 60, typ_opr_subj = 10, zkratka = 20, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, zkratka_alv = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenDavkaNemDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsdav*/
	interface GRenDavkaNemDto {
		/**DBCOLUMN:nemsdav.ixs_dav*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsdav.popis*/
		popis?: string|null;
		/**DBCOLUMN:nemsdav.dat_porizeni*/
		dat_porizeni?: JsonDate|null;
		/**DBCOLUMN:nemsdav.dat_nacteni*/
		dat_nacteni?: JsonDate|null;
		/**DBCOLUMN:nemsdav.verze_vf*/
		verze_vf?: string|null;
		/**DBCOLUMN:nemsdav.dat_vytvoreni*/
		dat_vytvoreni?: JsonDate|null;
		/**DBCOLUMN:nemsdav.puvod*/
		puvod?: string|null;
		/**DBCOLUMN:nemsdav.vytvoril*/
		vytvoril?: string|null;
		/**DBCOLUMN:nemsdav.dat_plat_od*/
		dat_plat_od?: JsonDate|null;
		/**DBCOLUMN:nemsdav.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:nemsdav.s_zmeny*/
		s_zmeny?: number|null;
		/**DBCOLUMN:nemsdav.s_navrhy*/
		s_navrhy?: number|null;
		/**DBCOLUMN:nemsdav.s_kat_uze*/
		s_kat_uze?: number|null;
		/**DBCOLUMN:nemsdav.s_opr_subj*/
		s_opr_subj?: number|null;
		/**DBCOLUMN:nemsdav.s_parcely*/
		s_parcely?: number|null;
		/**DBCOLUMN:nemsdav.s_polyg*/
		s_polyg?: number|null;
		/**DBCOLUMN:nemsdav.typ_dav*/
		typ_dav?: number|null;
		/**DBCOLUMN:nemsdav.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsdav.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsdav.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsdav.zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:nemsdav.ixs_dav_prev*/
		ixs_dav_prev?: string|null;
		/**DBCOLUMN:nemsdav.s_deakt_prev*/
		s_deakt_prev?: number|null;
		/**Navigační Autor změny dokumentu (dto) pres zmenu_prov*/
		ZmenaProv?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Oprávnění*/
		Permissions?: Gordic.Ren.Interface.GNemsdavPermissions|null;
	}
	const enum GRenDavkaNemDtoNames { ixs_dav = "ixs_dav", popis = "popis", dat_porizeni = "dat_porizeni", dat_nacteni = "dat_nacteni", verze_vf = "verze_vf", dat_vytvoreni = "dat_vytvoreni", puvod = "puvod", vytvoril = "vytvoril", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", s_zmeny = "s_zmeny", s_navrhy = "s_navrhy", s_kat_uze = "s_kat_uze", s_opr_subj = "s_opr_subj", s_parcely = "s_parcely", s_polyg = "s_polyg", typ_dav = "typ_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ixs_dav_prev = "ixs_dav_prev", s_deakt_prev = "s_deakt_prev", ZmenaProv = "ZmenaProv", Permissions = "Permissions",}
	const enum GRenDavkaNemDtoFragments { ixs_dav = "Base", popis = "Base", dat_porizeni = "Base", dat_nacteni = "Base", verze_vf = "Base", dat_vytvoreni = "Base", puvod = "Base", vytvoril = "Base", dat_plat_od = "Base", dat_plat_do = "Base", s_zmeny = "Base", s_navrhy = "Base", s_kat_uze = "Base", s_opr_subj = "Base", s_parcely = "Base", s_polyg = "Base", typ_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zmenu_prov_txt = "Base", ixs_dav_prev = "Base", s_deakt_prev = "Base", ZmenaProv = "ZmenaProv", Permissions = "*",}
	const enum GRenDavkaNemDtoTypes { ixs_dav = "string", popis = "string", dat_porizeni = "JsonDate", dat_nacteni = "JsonDate", verze_vf = "string", dat_vytvoreni = "JsonDate", puvod = "string", vytvoril = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", s_zmeny = "number", s_navrhy = "number", s_kat_uze = "number", s_opr_subj = "number", s_parcely = "number", s_polyg = "number", typ_dav = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ixs_dav_prev = "string", s_deakt_prev = "number", ZmenaProv = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Ren.Interface.GNemsdavPermissions",}
	const enum GRenDavkaNemDtoTypeLengths { ixs_dav = 12, popis = 254, verze_vf = 10, puvod = 254, vytvoril = 50, poznamka = 50, zmenu_prov = 12, zmenu_prov_txt = 254, ixs_dav_prev = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenDavkySouborDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Dto pro soubory dávek*/
	interface GRenDavkySouborDto {
	}
	const enum GRenDavkySouborDtoNames {}
	const enum GRenDavkySouborDtoFragments {}
	const enum GRenDavkySouborDtoTypes {}
	const enum GRenDavkySouborDtoTypeLengths {}
	interface GRenDavkyNacitaniResultDto {
		fullFilePath?: string|null;
		currentStateMessage?: string|null;
		currentStateLogMessage?: string|null;
	}
	const enum GRenDavkyNacitaniResultDtoNames { fullFilePath = "fullFilePath", currentStateMessage = "currentStateMessage", currentStateLogMessage = "currentStateLogMessage",}
	const enum GRenDavkyNacitaniResultDtoFragments { fullFilePath = "*", currentStateMessage = "*", currentStateLogMessage = "*",}
	const enum GRenDavkyNacitaniResultDtoTypes { fullFilePath = "string", currentStateMessage = "string", currentStateLogMessage = "string",}
	const enum GRenDavkyNacitaniResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenDruhCislovaniParcelyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsdcp
	*      Druh číslování parcel
	*/
	interface GRenDruhCislovaniParcelyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Kód druhu číslování parcel*/
		druh_cis_par?: number|null;
		/**Popis druhu číslování parcely*/
		popis?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenDruhCislovaniParcelyDtoNames { druh_cis_par = "druh_cis_par", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenDruhCislovaniParcelyDtoFragments { druh_cis_par = "Base", popis = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenDruhCislovaniParcelyDtoTypes { druh_cis_par = "number", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenDruhCislovaniParcelyDtoTypeLengths { popis = 254, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenDruhPozemkuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsdpo
	*      Druhy pozemků
	*/
	interface GRenDruhPozemkuDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Kód druhu pozemku*/
		druh_poz?: number|null;
		/**Název druhu pozemku*/
		nazev?: string|null;
		/**Zkratka druhu pozemku*/
		zkratka?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Zemědělská kultura
		*      Příznak, že se jedná o zemědělskou kulturu; 0=NE, 1=ANO
		*/
		s_zemedel_kult?: number|null;
		/**Stavební parcela
		*      Příznak, že se jedná o stavební parcelu; 0=NE, 1=ANO
		*/
		s_stavebni_par?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Druh pozemku pro účely ocenění*/
		dr_poz_oc?: number|null;
		/**Stanovená cena za m2 uvedeného druhu pozemku*/
		c_cena_oc?: JsonDecimal|null;
	}
	const enum GRenDruhPozemkuDtoNames { druh_poz = "druh_poz", nazev = "nazev", zkratka = "zkratka", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", s_zemedel_kult = "s_zemedel_kult", s_stavebni_par = "s_stavebni_par", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dr_poz_oc = "dr_poz_oc", c_cena_oc = "c_cena_oc", Permissions = "Permissions",}
	const enum GRenDruhPozemkuDtoFragments { druh_poz = "Base", nazev = "Base", zkratka = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", s_zemedel_kult = "Base", s_stavebni_par = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dr_poz_oc = "Base", c_cena_oc = "Base", Permissions = "*",}
	const enum GRenDruhPozemkuDtoTypes { druh_poz = "number", nazev = "string", zkratka = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", s_zemedel_kult = "number", s_stavebni_par = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dr_poz_oc = "number", c_cena_oc = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenDruhPozemkuDtoTypeLengths { nazev = 60, zkratka = 9, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenJednotkaDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsjed
	*      Jednotka katastru nemovitostí
	*/
	interface GRenJednotkaDto extends Gordic.Ren.Interface.GRenBaseDetailNemovitostiDto {
		/**Identifikátor jednotky katastru nemovitostí*/
		id_jednotky?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_zan?: string|null;
		/**Identifikátor budovy katastru nemovitostí*/
		id_budovy?: string|null;
		/**Typ jednotky*/
		typ_jednotky?: number|null;
		/**Číslo jednotky*/
		cislo_jednotky?: JsonDecimal|null;
		/**Cena nemovitosti*/
		c_cena_nem?: JsonDecimal|null;
		/**Způsob využití jednotky*/
		zp_vyuz_jed?: number|null;
		/**Odkaz na unikátní generované číslo tělesa*/
		id_telesa?: string|null;
		/**Podíl vlastnictví na KT - čitatel*/
		podil_citatel?: number|null;
		/**Podíl vlastnictví na KT - jmenovatel*/
		podil_jmenov?: number|null;
		/**Popis jednotky*/
		popis?: string|null;
		/**Cena nemovitosti z ocenění v REN*/
		c_cena_oc?: JsonDecimal|null;
		/**Datum ocenění*/
		dat_oc?: JsonDate|null;
		/**Popis ocenění*/
		popis_oc?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Způsob ocenění nemovitosti*/
		zp_oc?: number|null;
		/**Typ dat*/
		typ_dat?: number|null;
		/**Identifikátor jednotky z katastru nemovitostí (pokud byl záznam založen uživatelsky)*/
		id_jednotky_orig?: string|null;
		/**Název jednotky - uživatelský*/
		jednotka_nazev?: string|null;
		/**Datum zahájení vkladu do katastru nemovitostí*/
		dat_zahajeni?: JsonDate|null;
		/**Datum vkladu do katastru nemovitostí*/
		dat_vkladu?: JsonDate|null;
		/**cis_jed_part_cdom*/
		cis_jed_part_cdom?: number|null;
		/**cis_jed_part_jed*/
		cis_jed_part_jed?: number|null;
		/**Navigační vlastnost pro Typ Jednotky (typ_jednotky)*/
		TypJednotky?: Gordic.Ren.Interface.GRenTypJednotkyDto|null;
		/**Navigační vlastnost pro ZpusobVyuzitiJednotky (zp_vyuz_jed)*/
		ZpusobVyuzitiJednotky?: Gordic.Ren.Interface.GRenZpusobVyuzitiJednotkyDto|null;
		/**Navigační vlastnost pro Budovu (id_budovy)*/
		Budova?: Gordic.Ren.Interface.GRenBudovaDto|null;
		Parcela?: Gordic.Ren.Interface.GRenParcelaDto|null;
		parcely_pod_budovou?: string|null;
		vymera_par_rozdil?: number|null;
		druh_poz_rozdil?: number|null;
	}
	const enum GRenJednotkaDtoNames { id_jednotky = "id_jednotky", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_budovy = "id_budovy", typ_jednotky = "typ_jednotky", cislo_jednotky = "cislo_jednotky", c_cena_nem = "c_cena_nem", zp_vyuz_jed = "zp_vyuz_jed", id_telesa = "id_telesa", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", popis = "popis", c_cena_oc = "c_cena_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_oc = "zp_oc", typ_dat = "typ_dat", id_jednotky_orig = "id_jednotky_orig", jednotka_nazev = "jednotka_nazev", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", cis_jed_part_cdom = "cis_jed_part_cdom", cis_jed_part_jed = "cis_jed_part_jed", TypJednotky = "TypJednotky", ZpusobVyuzitiJednotky = "ZpusobVyuzitiJednotky", Budova = "Budova", Parcela = "Parcela", parcely_pod_budovou = "parcely_pod_budovou", vymera_par_rozdil = "vymera_par_rozdil", druh_poz_rozdil = "druh_poz_rozdil", Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", aktivita_ku = "aktivita_ku", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil", email_avizo_vklad_txt = "email_avizo_vklad_txt", Permissions = "Permissions",}
	const enum GRenJednotkaDtoFragments { id_jednotky = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_budovy = "Base", typ_jednotky = "Base", cislo_jednotky = "Base", c_cena_nem = "Base", zp_vyuz_jed = "Base", id_telesa = "Base", podil_citatel = "Base", podil_jmenov = "Base", popis = "Base", c_cena_oc = "Base", dat_oc = "Base", popis_oc = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zp_oc = "Base", typ_dat = "Base", id_jednotky_orig = "Base", jednotka_nazev = "Base", dat_zahajeni = "Base", dat_vkladu = "Base", cis_jed_part_cdom = "Base", cis_jed_part_jed = "Base", TypJednotky = "TypJednotky", ZpusobVyuzitiJednotky = "ZpusobVyuzitiJednotky", Budova = "Budova", Parcela = "Parcela", parcely_pod_budovou = "*", vymera_par_rozdil = "*", druh_poz_rozdil = "*", Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "Base", s_zastavni_pravo = "Base", aktivita_ku = "Extended", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*", email_avizo_vklad_txt = "*", Permissions = "*",}
	const enum GRenJednotkaDtoTypes { id_jednotky = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_budovy = "string", typ_jednotky = "number", cislo_jednotky = "JsonDecimal", c_cena_nem = "JsonDecimal", zp_vyuz_jed = "number", id_telesa = "string", podil_citatel = "number", podil_jmenov = "number", popis = "string", c_cena_oc = "JsonDecimal", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_oc = "number", typ_dat = "number", id_jednotky_orig = "string", jednotka_nazev = "string", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", cis_jed_part_cdom = "number", cis_jed_part_jed = "number", TypJednotky = "Gordic.Ren.Interface.GRenTypJednotkyDto", ZpusobVyuzitiJednotky = "Gordic.Ren.Interface.GRenZpusobVyuzitiJednotkyDto", Budova = "Gordic.Ren.Interface.GRenBudovaDto", Parcela = "Gordic.Ren.Interface.GRenParcelaDto", parcely_pod_budovou = "string", vymera_par_rozdil = "number", druh_poz_rozdil = "number", Teleso = "Gordic.Ren.Interface.GRenTelesoDto", KatastralniUzemi = "Gordic.Ren.Interface.GRenKatastralniUzemiDto", ZpusobVyuzitiBudovy = "Gordic.Ren.Interface.GRenZpusobVyuzitiBudovyDto", CastObce = "Gordic.Ren.Interface.GRenCastObceDto", Okres = "Gordic.Ren.Interface.GRenOkresDto", Kraj = "Gordic.Ren.Interface.GRenKrajDto", Obec = "Gordic.Ren.Interface.GRenObecDto", TypBudovy = "Gordic.Ren.Interface.GRenTypBudovyDto", ZmenaProv = "Gordic.Gin.Interface.GGinszmpDto", Vlastnictvi = "Gordic.Ren.Interface.GRenVlastnictviDto", OpravnenySubjekt = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", CharakteristikaOs = "Gordic.Ren.Interface.GRenCharakteristikaOsDto", TypPravnihoVztahu = "Gordic.Ren.Interface.GRenTypPravnihoVztahuDto", MajetkovyProfil = "Gordic.Ren.Interface.GRenMajetkovyProfilDto", RozsirenyMajetkovyProfil = "Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto", ProfilTextuZaznamu = "Gordic.Ren.Interface.GRenProfilTextuZaznamuDto", ZaznamKNemovitosti = "Gordic.Ren.Interface.GRenZaznamKNemovitostiDto", TypZaznamu = "Gordic.Ren.Interface.GRenTypZaznamuDto", s_vecne_bremeno = "number", s_zastavni_pravo = "number", aktivita_ku = "number", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number", email_avizo_vklad_txt = "string", Permissions = "Gordic.Ren.Interface.GRenNemovitostPermissions",}
	const enum GRenJednotkaDtoTypeLengths { id_jednotky = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_budovy = 30, id_telesa = 30, popis = 254, popis_oc = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_jednotky_orig = 30, jednotka_nazev = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenJinePravniVztahyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsjpv*/
	interface GRenJinePravniVztahyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Unikátní generované číslo jiného právního vztahu*/
		id_ji_pr_vztahu?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Odkaz na unikátní generované číslo parcely - oprávněné (ku prospěchu)*/
		id_parcely_pro?: string|null;
		/**Odkaz na unikátní generované číslo budovy - oprávněné (ku prospěchu)*/
		id_budovy_pro?: string|null;
		/**Odkaz na unikátní generované číslo jednotky - oprávněné (ku prospěchu)*/
		id_jednotky_pro?: string|null;
		/**Odkaz na unikátní generované číslo parcely - povinné (k tíži)*/
		id_parcely_k?: string|null;
		/**Odkaz na unikátní generované číslo budovy - povinné (k tíži)*/
		id_budovy_k?: string|null;
		/**Odkaz na unikátní generované číslo jednotky - povinné (k tíži)*/
		id_jednotky_k?: string|null;
		/**Typ právního vztahu*/
		typ_pr_vztahu?: string|null;
		/**Slovní popis právního vztahu*/
		popis_pr_vzt?: string|null;
		/**Odkaz na unikátní generované číslo tělesa*/
		id_telesa?: string|null;
		/**Identifikátor oprávněného subjektu - oprávněný (ku prospěchu)*/
		id_opr_subj_pro?: string|null;
		/**Identifikátor oprávněného subjektu - povinný (k tíži)*/
		id_opr_subj_k?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsjpv.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsjpv.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsjpv.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsjpv.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Podíl věřitele na pohledávce*/
		podil_phl?: string|null;
		/**Unikátní generované číslo seskupení jiného právního vztahu*/
		hjpv_id?: string|null;
		/**Časový údaj původního vzniku entity v systému*/
		dat_vzniku2?: JsonDate|null;
		/**Odkaz na unikátní generované číslo původního řízení vzniku*/
		id_rizeni_vzn2?: string|null;
		/**Identifikátor nadřízené právnické osoby*/
		id_opr_subj_pro2?: string|null;
		/**Identifikátor práva stavby - oprávněný (ku prospěchu)*/
		id_pr_sta_pro?: string|null;
		/**Identifikátor práva stavby - povinný (k tíži)*/
		id_pr_sta_k?: string|null;
		/**Doplňkový popis právního vztahu*/
		popis2?: string|null;
		/**Datum vyjadřující pořadí*/
		poradi_cas?: JsonDate|null;
		/**Text vyjadřující případné přednostní pořadí*/
		poradi_txt?: string|null;
		/**Obsahuje datum ukončení platnosti JPV*/
		dat_ukonceni?: JsonDate|null;
		/**Pseudonymizovaný identifikátor oprávněného subjektu - oprávněný (ku prospěchu)*/
		id_opr_subj_pro_p?: string|null;
		/**Pseudonymizovaný identifikátor oprávněného subjektu - povinný (k tíži)*/
		id_opr_subj_k_p?: string|null;
		/**Pseudonymizovaný identifikátor nadřízené právnické osoby*/
		id_opr_subj_pro2p?: string|null;
		/**nemstpv.nazev*/
		typ_pr_vztahu_nazev?: string|null;
		/**Navigační vlastnost pro TypPravnihoVztahu*/
		TypPravnihoVztahu?: Gordic.Ren.Interface.GRenTypPravnihoVztahuDto|null;
		/**Navigační vlastnost pro Budova*/
		BudovaK?: Gordic.Ren.Interface.GRenBudovaDto|null;
		/**Navigační vlastnost pro Budova*/
		BudovaPro?: Gordic.Ren.Interface.GRenBudovaDto|null;
		/**Navigační vlastnost pro Parcela*/
		ParcelaK?: Gordic.Ren.Interface.GRenParcelaDto|null;
		/**Navigační vlastnost pro Parcela*/
		ParcelaPro?: Gordic.Ren.Interface.GRenParcelaDto|null;
		/**Navigační vlastnost pro Jednotka*/
		JednotkaK?: Gordic.Ren.Interface.GRenJednotkaDto|null;
		/**Navigační vlastnost pro Jednotka*/
		JednotkaPro?: Gordic.Ren.Interface.GRenJednotkaDto|null;
		/**Navigační vlastnost pro OpravnenySubjekt*/
		OpravnenySubjektK?: Gordic.Ren.Interface.GRenOpravnenySubjektDto|null;
		/**Navigační vlastnost pro OpravnenySubjekt*/
		OpravnenySubjektPro?: Gordic.Ren.Interface.GRenOpravnenySubjektDto|null;
	}
	const enum GRenJinePravniVztahyDtoNames { id_ji_pr_vztahu = "id_ji_pr_vztahu", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_parcely_pro = "id_parcely_pro", id_budovy_pro = "id_budovy_pro", id_jednotky_pro = "id_jednotky_pro", id_parcely_k = "id_parcely_k", id_budovy_k = "id_budovy_k", id_jednotky_k = "id_jednotky_k", typ_pr_vztahu = "typ_pr_vztahu", popis_pr_vzt = "popis_pr_vzt", id_telesa = "id_telesa", id_opr_subj_pro = "id_opr_subj_pro", id_opr_subj_k = "id_opr_subj_k", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", podil_phl = "podil_phl", hjpv_id = "hjpv_id", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", id_opr_subj_pro2 = "id_opr_subj_pro2", id_pr_sta_pro = "id_pr_sta_pro", id_pr_sta_k = "id_pr_sta_k", popis2 = "popis2", poradi_cas = "poradi_cas", poradi_txt = "poradi_txt", dat_ukonceni = "dat_ukonceni", id_opr_subj_pro_p = "id_opr_subj_pro_p", id_opr_subj_k_p = "id_opr_subj_k_p", id_opr_subj_pro2p = "id_opr_subj_pro2p", typ_pr_vztahu_nazev = "typ_pr_vztahu_nazev", TypPravnihoVztahu = "TypPravnihoVztahu", BudovaK = "BudovaK", BudovaPro = "BudovaPro", ParcelaK = "ParcelaK", ParcelaPro = "ParcelaPro", JednotkaK = "JednotkaK", JednotkaPro = "JednotkaPro", OpravnenySubjektK = "OpravnenySubjektK", OpravnenySubjektPro = "OpravnenySubjektPro", Permissions = "Permissions",}
	const enum GRenJinePravniVztahyDtoFragments { id_ji_pr_vztahu = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_parcely_pro = "Base", id_budovy_pro = "Base", id_jednotky_pro = "Base", id_parcely_k = "Base", id_budovy_k = "Base", id_jednotky_k = "Base", typ_pr_vztahu = "Base", popis_pr_vzt = "Base", id_telesa = "Base", id_opr_subj_pro = "Base", id_opr_subj_k = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", podil_phl = "Base", hjpv_id = "Base", dat_vzniku2 = "Base", id_rizeni_vzn2 = "Base", id_opr_subj_pro2 = "Base", id_pr_sta_pro = "Base", id_pr_sta_k = "Base", popis2 = "*", poradi_cas = "Base", poradi_txt = "Base", dat_ukonceni = "Base", id_opr_subj_pro_p = "Base", id_opr_subj_k_p = "Base", id_opr_subj_pro2p = "Base", typ_pr_vztahu_nazev = "typ_pr_vztahu_nazev", TypPravnihoVztahu = "TypPravnihoVztahu", BudovaK = "BudovaK", BudovaPro = "BudovaPro", ParcelaK = "ParcelaK", ParcelaPro = "ParcelaPro", JednotkaK = "JednotkaK", JednotkaPro = "JednotkaPro", OpravnenySubjektK = "OpravnenySubjektK", OpravnenySubjektPro = "OpravnenySubjektPro", Permissions = "*",}
	const enum GRenJinePravniVztahyDtoTypes { id_ji_pr_vztahu = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_parcely_pro = "string", id_budovy_pro = "string", id_jednotky_pro = "string", id_parcely_k = "string", id_budovy_k = "string", id_jednotky_k = "string", typ_pr_vztahu = "string", popis_pr_vzt = "string", id_telesa = "string", id_opr_subj_pro = "string", id_opr_subj_k = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", podil_phl = "string", hjpv_id = "string", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", id_opr_subj_pro2 = "string", id_pr_sta_pro = "string", id_pr_sta_k = "string", popis2 = "string", poradi_cas = "JsonDate", poradi_txt = "string", dat_ukonceni = "JsonDate", id_opr_subj_pro_p = "string", id_opr_subj_k_p = "string", id_opr_subj_pro2p = "string", typ_pr_vztahu_nazev = "string", TypPravnihoVztahu = "Gordic.Ren.Interface.GRenTypPravnihoVztahuDto", BudovaK = "Gordic.Ren.Interface.GRenBudovaDto", BudovaPro = "Gordic.Ren.Interface.GRenBudovaDto", ParcelaK = "Gordic.Ren.Interface.GRenParcelaDto", ParcelaPro = "Gordic.Ren.Interface.GRenParcelaDto", JednotkaK = "Gordic.Ren.Interface.GRenJednotkaDto", JednotkaPro = "Gordic.Ren.Interface.GRenJednotkaDto", OpravnenySubjektK = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", OpravnenySubjektPro = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenJinePravniVztahyDtoTypeLengths { id_ji_pr_vztahu = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_parcely_pro = 30, id_budovy_pro = 30, id_jednotky_pro = 30, id_parcely_k = 30, id_budovy_k = 30, id_jednotky_k = 30, typ_pr_vztahu = 4, popis_pr_vzt = 254, id_telesa = 30, id_opr_subj_pro = 30, id_opr_subj_k = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, podil_phl = 60, hjpv_id = 30, id_rizeni_vzn2 = 30, id_opr_subj_pro2 = 30, id_pr_sta_pro = 30, id_pr_sta_k = 30, popis2 = 254, poradi_txt = 254, id_opr_subj_pro_p = 254, id_opr_subj_k_p = 254, id_opr_subj_pro2p = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenKatastralniUzemiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemskat
	*      Tabulka katastrálních území
	*/
	interface GRenKatastralniUzemiDto extends Gordic.Ren.Interface.GRenKatUzemiDetailPermissionsDto {
		/**Kód katastrálního území*/
		kod_kat_uzemi?: number|null;
		/**Kód obce*/
		kod_obce?: number|null;
		/**Název katastrálního území*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Pracovní číslo katastrálního území*/
		prac_cislo?: number|null;
		/**Označení číselné řady*/
		ciselna_rada?: number|null;
		/**Navigační vlastnost pro Obec (kod_obce)*/
		Obec?: Gordic.Ren.Interface.GRenObecDto|null;
	}
	const enum GRenKatastralniUzemiDtoNames { kod_kat_uzemi = "kod_kat_uzemi", kod_obce = "kod_obce", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prac_cislo = "prac_cislo", ciselna_rada = "ciselna_rada", Obec = "Obec", Permissions = "Permissions",}
	const enum GRenKatastralniUzemiDtoFragments { kod_kat_uzemi = "Base", kod_obce = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "*", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", prac_cislo = "Base", ciselna_rada = "Base", Obec = "Obec", Permissions = "*",}
	const enum GRenKatastralniUzemiDtoTypes { kod_kat_uzemi = "number", kod_obce = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prac_cislo = "number", ciselna_rada = "number", Obec = "Gordic.Ren.Interface.GRenObecDto", Permissions = "Gordic.Ren.Interface.GNemskatPermissions",}
	const enum GRenKatastralniUzemiDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenKrajDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemskrn
	*      Tabulka krajů katastru nemovitostí
	*/
	interface GRenKrajDto extends GRenBaseDetailDto {
		/**Kód kraje*/
		kod_kraje_n?: number|null;
		/**Název kraje*/
		nazev?: string|null;
		/**Nuts3*/
		nuts3?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenKrajDtoNames { kod_kraje_n = "kod_kraje_n", nazev = "nazev", nuts3 = "nuts3", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenKrajDtoFragments { kod_kraje_n = "Base", nazev = "Base", nuts3 = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenKrajDtoTypes { kod_kraje_n = "number", nazev = "string", nuts3 = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenKrajDtoTypeLengths { nazev = 32, nuts3 = 5, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenListinaDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemslis
	*      Listiny - obsahuje základní údaje charakterizující listinu jako podklad rozhodování a/nebo zápis do KN v rámci řízení
	*/
	interface GRenListinaDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor listiny*/
		id_listiny?: string|null;
		/**Kód typu listiny*/
		typ_listiny?: number|null;
		/**Popis listiny*/
		popis?: string|null;
		/**Příznak existence obsahu dokumentu*/
		s_obsah?: number|null;
		/**Počet stran*/
		stran?: number|null;
		/**Datum platnosti nebo nabytí právní moci*/
		dat_vyhotov?: JsonDate|null;
		/**Jméno zhotovitele listiny*/
		zhotovitel?: string|null;
		/**Pořadové číslo zhotovitele listiny*/
		por_cis_zhotov?: string|null;
		/**Rok vyhotovení listiny jako součást jednacího čísla zhotovi-tele*/
		rok_zhotov?: JsonDate|null;
		/**Doplnění jednacího čísla listiny zhotovitele*/
		dopl_zhotov?: string|null;
		/**Zkratka zhotovitele*/
		zkratka?: string|null;
		/**Identifikátor řízení*/
		id_rizeni?: string|null;
		/**Příznak, zda listina mění právní vztahy*/
		s_zmena_pr_vzt?: number|null;
		/**Datum nabytí právní moci*/
		dat_prav_moci?: JsonDate|null;
		/**Datum vykonatelnosti rozhodnutí*/
		dat_vykonatel?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum počátku platnosti záznamu*/
		datum_hist_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		datum_hist_do?: JsonDate|null;
		zmena_pr_vzt_txt?: string|null;
		obsah?: string|null;
		s_zmena_pr_vzt_txt?: string|null;
		typ_listiny_nazev?: string|null;
		/**Navigační vlastnost pro TypListiny*/
		TypListiny?: Gordic.Ren.Interface.GRenTypListinyDto|null;
		/**Navigační vlastnost pro VazbaNemLisRiz*/
		VazbaNemLisRiz?: Gordic.Ren.Interface.GRenVazbaNemLisRizDto|null;
	}
	const enum GRenListinaDtoNames { id_listiny = "id_listiny", typ_listiny = "typ_listiny", popis = "popis", s_obsah = "s_obsah", stran = "stran", dat_vyhotov = "dat_vyhotov", zhotovitel = "zhotovitel", por_cis_zhotov = "por_cis_zhotov", rok_zhotov = "rok_zhotov", dopl_zhotov = "dopl_zhotov", zkratka = "zkratka", id_rizeni = "id_rizeni", s_zmena_pr_vzt = "s_zmena_pr_vzt", dat_prav_moci = "dat_prav_moci", dat_vykonatel = "dat_vykonatel", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", datum_hist_od = "datum_hist_od", datum_hist_do = "datum_hist_do", zmena_pr_vzt_txt = "zmena_pr_vzt_txt", obsah = "obsah", s_zmena_pr_vzt_txt = "s_zmena_pr_vzt_txt", typ_listiny_nazev = "typ_listiny_nazev", TypListiny = "TypListiny", VazbaNemLisRiz = "VazbaNemLisRiz", Permissions = "Permissions",}
	const enum GRenListinaDtoFragments { id_listiny = "Base", typ_listiny = "Base", popis = "Base", s_obsah = "Base", stran = "Base", dat_vyhotov = "Base", zhotovitel = "Base", por_cis_zhotov = "Base", rok_zhotov = "Base", dopl_zhotov = "Base", zkratka = "Base", id_rizeni = "Base", s_zmena_pr_vzt = "Base", dat_prav_moci = "Base", dat_vykonatel = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", datum_hist_od = "Base", datum_hist_do = "Base", zmena_pr_vzt_txt = "*", obsah = "*", s_zmena_pr_vzt_txt = "*", typ_listiny_nazev = "*", TypListiny = "TypListiny", VazbaNemLisRiz = "VazbaNemLisRiz", Permissions = "*",}
	const enum GRenListinaDtoTypes { id_listiny = "string", typ_listiny = "number", popis = "string", s_obsah = "number", stran = "number", dat_vyhotov = "JsonDate", zhotovitel = "string", por_cis_zhotov = "string", rok_zhotov = "JsonDate", dopl_zhotov = "string", zkratka = "string", id_rizeni = "string", s_zmena_pr_vzt = "number", dat_prav_moci = "JsonDate", dat_vykonatel = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", datum_hist_od = "JsonDate", datum_hist_do = "JsonDate", zmena_pr_vzt_txt = "string", obsah = "string", s_zmena_pr_vzt_txt = "string", typ_listiny_nazev = "string", TypListiny = "Gordic.Ren.Interface.GRenTypListinyDto", VazbaNemLisRiz = "Gordic.Ren.Interface.GRenVazbaNemLisRizDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenListinaDtoTypeLengths { id_listiny = 30, popis = 254, zhotovitel = 60, por_cis_zhotov = 8, dopl_zhotov = 60, zkratka = 10, id_rizeni = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenMajetkovyProfilDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DTO - MajetkovyProfil*/
	interface GRenMajetkovyProfilDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor majetkové karty*/
		ixs_maj?: string|null;
		/**DBCOLUMN:majsmaj.lic*/
		lic?: string|null;
		/**Unikátní identifikátor unikátního majetku (zev=10) v rámci jedné organizace (IČO)*/
		inv_cis?: string|null;
		/**Sériové číslo majetku*/
		ser_cis?: string|null;
		/**Evidenční číslo majetku*/
		evi_cis?: string|null;
		/**Výrovní číslo majetku*/
		vyr_cis?: string|null;
		/**DBCOLUMN:majsmaj.rok_vyr*/
		rok_vyr?: number|null;
		/**Klasifikace majetku dle zákona o statistice. Může obsahovat údaje klasifikací spravovaných ČSÚ SKP, SZ-CC, CZ-CPA*/
		skp?: string|null;
		/**Název majetku převzatý z číselníku materiálových čísel.*/
		nazev_skp?: string|null;
		/**Název majetku definovatelný z úrovně uživatele*/
		nazev?: string|null;
		/**Vyjadřuje Su a Au, na který bude majetek zaúčtován v okamžiku účtování o jeho pořízení do organizace*/
		ueab_por?: string|null;
		/**Vyjadřuje Su a Au, na který bude majetek zaúčtován v okamžiku účtování o jeho oprávkách*/
		ueab_opr?: string|null;
		/**Vyjadřuje Su a Au, na který bude majetek zaúčtován v okamžiku účtování o jeho zařazení do užívání*/
		ueab_evi?: string|null;
		/**Její hodnota je dána podílem Účetní ceny a počtu měrných jednotek vedených na kartě*/
		cmj?: JsonDecimal|null;
		/**Vyjadřuje počet MJ vedených na kartě majetku. V případě unikátního majetku (zev=10) nabývá vždy hodnoty 1.*/
		pmj?: JsonDecimal|null;
		/**Představuje hodnotu majetku vedenou v účetním deníku na příslušném majetkovém účtu*/
		c?: JsonDecimal|null;
		/**Vyjadřuje minimální počet MJ, které lze na kartě vést pro případné notifikace poklesu počtu majetku pod tuto hranici*/
		pmj_min?: JsonDecimal|null;
		/**Datum pořízení majetku do organizace*/
		dat_por?: JsonDate|null;
		/**Datum zařazení majetku do užívání*/
		dat_zar?: JsonDate|null;
		/**DBCOLUMN:majsmaj.dat_vyr*/
		dat_vyr?: JsonDate|null;
		/**Technologický údaj vypovídající o datu vytvoření majetkové karty v MAJ*/
		dat_vznik?: JsonDate|null;
		/**DBCOLUMN:majsmaj.ico*/
		ico?: string|null;
		/**DBCOLUMN:majsmaj.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:majsmaj.nks*/
		nks?: string|null;
		/**Jeden z klasifikačních údajů popisujících majetek*/
		trida?: string|null;
		/**Toplogický údaj vypovídající o umístění majetku. V závislosti na režimu identifikace topologie (EVS) se může jednat o základní údaj oddělující majetek v rámci jednoho NKS*/
		stredisko?: string|null;
		/**Topologický údaj popisující, ve které budově je majetek umístěn*/
		budova_kod?: string|null;
		/**Topologický údaj popisující, ve které místnosti je majetek umístěn*/
		mistnost_kod?: string|null;
		/**Topologický údaj popisující, ve kteréorganizační jednotce je majetek veden*/
		ixs_orj?: string|null;
		/**Zodpovědná osoba za majetek*/
		ixs_ref?: string|null;
		/**Pokud se jedná o provek souboru, je zde uveden identifikátor karty souboru.*/
		ixs_maj_nad?: string|null;
		/**Údaj vypovídající o typu souboru. Jsou podporovány účetní a logistické typy souborů.*/
		typ_soubor?: number|null;
		/**Pojmenování souboru majetku*/
		jmeno_soubor?: string|null;
		/**Pokud se jedná o provek souboru, je zde uvedeno inventární číslo souboru*/
		inv_cis_soubor?: string|null;
		/**Členění majetku v rámci skupiny majetku. Představuje vazbu majetku na systém účtování o majetku.*/
		drh_id?: number|null;
		/**Základní klasifikační údaj majetku*/
		skupina_id?: number|null;
		/**Definice měrné jednotky, ve které je majetek na kartě veden.*/
		mj?: string|null;
		/**Nepoužíváno*/
		skupina_odp?: string|null;
		/**Nepoužíváno*/
		polozka_odp?: number|null;
		/**Rozlišuje účetní a operativní vedení majetku*/
		tev?: number|null;
		/**Definuje z jakých prostředků byl majetek pořízen a v jaké situaci životního cyklu se nachází*/
		dev?: number|null;
		/**Rozlišení karty ve vztahu k souborům majetku*/
		tka?: number|null;
		/**Rozlišuje majetek dle stavu*/
		mat_akt?: number|null;
		/**Kód pohybu, kterým byl majetek vyřazen z užívání*/
		kod_vyr?: number|null;
		/**Kód pohybu, kterým byl majetek zařazen do užívání*/
		kod_por?: number|null;
		/**Jeden z popisných údajů majetkové karty*/
		poznamka?: string|null;
		/**Příznak, zda byl ke kartě pomocí speciální sestavy vygenerován podkal pro tisk etikety/štítku s inventárním číslem*/
		tisk_eti?: number|null;
		/**Počet rezervovaných měrných jednotek na kartě*/
		pmj_res?: JsonDecimal|null;
		/**Příznak nesoucí údaj o tom, zda je majetková karta odepisována.*/
		priz_odp?: number|null;
		/**DBCOLUMN:majsmaj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:majsmaj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Vyjadřuje macimální počet MJ, které lze na kartě vést pro případné notifikace překročení počtu majetkunaod tuto hranici*/
		pmj_max?: JsonDecimal|null;
		/**Identifikace topologie – pojem, který definuje topologickou jednotku umístění majetku.*/
		id_top?: string|null;
		/**Nevyužito*/
		id_mnoz?: number|null;
		/**Základní klasifikační údaj majetku z pohledu typu. Číselníková hodnota spravovaná ÚJ.*/
		mat_cis?: string|null;
		/**Vypovídá o šarži, ve které je majetek vyroben*/
		sarze?: string|null;
		/**Definice vedení karty majetku s daným materiálovým číslem v dané skupině majetku*/
		zev?: number|null;
		/**Datum končící životnosti majetku*/
		expirace?: JsonDate|null;
		/**Kódové označení majetkové (skladové) karty definujíí konkrétní typ majetku. Převážně prezentované čárovým kódem ve formátu EAN*/
		ean?: string|null;
		/**DBCOLUMN:majsmaj.dp_ode*/
		dp_ode?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:majsmaj.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph*/
		c_c_dph?: JsonDecimal|null;
		/**Způsob využití majetku. Číselníková hodnota spravovaná ÚJ.*/
		kod_vyu?: number|null;
		/**Vypovídá o tom, v rámci jaké Akce byl majetek pořízen*/
		akce?: string|null;
		/**Topologický údaj popisují segment budovy, ve kterém je majetek umístěn. Číselníková hodnota spravovaná ÚJ.*/
		segment_kod?: string|null;
		/**Datum zaúčtování majetku na majetkové účty*/
		dat_uct_0123?: JsonDate|null;
		/**Typ dokladu, kterým byl majetek zařazen do kartotéky MAJ. Spolu s Kódem pořízení (kod_por) tvoří společný klíč*/
		typ_dok_por?: number|null;
		/**Typ dokladu, kterým byl majetek vyřazen. Spolu s Kódem vyřazení (kod_vyr) tvoří společný klíč*/
		typ_dok_vyr?: number|null;
		/**Vyjadřuje skutečnost, že majetek je v daném okamžiku inventarizován. Pokud ano, jsou blokovány veškeré aktivní operace s majetekm.*/
		inv_in?: number|null;
		/**Délka záruční lhůty v měsících*/
		lhuta_zaruka?: number|null;
		/**Topologický údaj popisující objekt, ve kterém je majetek umístěn. Číselníková hodnota spravovaná ÚJ.*/
		objekt?: string|null;
		/**Vypovídá o tom, ve kterém státě byl majetek vyroben*/
		stat_puvod?: number|null;
		/**Identifikace výrobce majetku*/
		ixs_esu_vyr?: string|null;
		/**Identifikace dodavatele majetku*/
		ixs_esu_dod?: string|null;
		/**Identifikace servisního zařízení majetku*/
		ixs_esu_servis?: string|null;
		/**Textový popis typu majetku*/
		typ_maj?: string|null;
		/**Číselníková hodnota spravovaná ÚJ.*/
		ktg_zar?: number|null;
		/**Hmotnost majetku*/
		hmotnost?: JsonDecimal|null;
		/**Číselníková hodnota spravovaná ÚJ.*/
		prev_stav?: number|null;
		/**Číselníková hodnota spravovaná ÚJ.*/
		mobilita?: number|null;
		/**Číselníková hodnota spravovaná ÚJ.*/
		trida_bezp?: number|null;
		/**Číselníková hodnota spravovaná ÚJ.*/
		riziko_por?: number|null;
		/**Údaj popisující rozměry majetku*/
		rozmer_l?: JsonDecimal|null;
		/**Údaj popisující rozměry majetku*/
		rozmer_w?: JsonDecimal|null;
		/**Údaj popisující rozměry majetku*/
		rozmer_h?: JsonDecimal|null;
		/**Výše uplatněného odpočtu DPH*/
		c_dph_odpocet?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.ixs_esu_vla*/
		ixs_esu_vla?: string|null;
		/**Topologický údaj o lokalizaci majetku v souřadném systému WGS84 (GPS)*/
		gps_sirka?: string|null;
		/**Topologický údaj o lokalizaci majetku v souřadném systému WGS84 (GPS)*/
		gps_delka?: string|null;
		/**Topologický údaj o lokalizaci majetku. Číselníková hodnota spravovaná ÚJ.*/
		ext_1?: number|null;
		/**Topologický údaj o lokalizaci majetku. Číselníková hodnota spravovaná ÚJ.*/
		ext_2?: number|null;
		/**Topologický údaj o lokalizaci majetku. Číselníková hodnota spravovaná ÚJ.*/
		ext_3?: number|null;
		/**Technologický údaj pro vedení infromace, v jakém stavu byl majetek pořízen do kartotéky. Umožňuje rozlišit stav Pořízení a Evidence*/
		stav_maj?: number|null;
		/**Nepoužito*/
		id_krt_dev?: string|null;
		/**Vyjadřuje cenu, za kterou byl majetek pořízen. Převážně se jedná nákupní či reprodukční cenu majetku*/
		c_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_poriz*/
		c_dph_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph_poriz*/
		c_c_dph_poriz?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_opr_pol*/
		c_opr_pol?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_opr_pol*/
		c_dph_opr_pol?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph_opr_pol*/
		c_c_dph_opr_pol?: JsonDecimal|null;
		/**Jedná se předpokládanou prodejní cenu majetku, který byl určen k prodeji.*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_dph_real*/
		c_dph_real?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.c_c_dph_real*/
		c_c_dph_real?: JsonDecimal|null;
		/**Jedná se o výši transferu (dotace), která byla ÚJ poskytnuta na pořízení majetku*/
		c_dotace?: JsonDecimal|null;
		/**Anaůlytika PAP/POR - Analytický údaj pro vytvoření statistických výkazů typu PAP.*/
		ke_pap?: string|null;
		/**Nevyužito*/
		kt_pap?: string|null;
		/**Datum uskutečnění účetního případu na kartě majetku vypovídá o datu, kdy byla provedena poslední manipulace k danou majetkovou kartou*/
		dat_uup?: JsonDate|null;
		/**Neměnný identifikátor majetku určený ke sdílení se systémy třetích stran*/
		id_maj?: string|null;
		/**Pokud je majetek zapsán do rejstříku kulturních památek, tento údaj rozlišuje o jakou kategorii se jedná.*/
		ktg_kp?: number|null;
		/**Číslo rejstříku kulturních památek, do kterého byl majetek zapsán jako KP, NKP*/
		cis_rejstrik_kp?: string|null;
		/**Identifikátor v rejstříku kulturních památek, do kterého je majetek zapsán*/
		id_rejstrik_kp?: string|null;
		/**Prodejní cena 1 vedená ka kartě majetku pro případný prodej*/
		cmj_pro1?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.cmj_pro2*/
		cmj_pro2?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.cmj_pro3*/
		cmj_pro3?: JsonDecimal|null;
		/**DBCOLUMN:majsmaj.ixs_elo*/
		ixs_elo?: string|null;
		/**DBCOLUMN:majsmaj.hlavni_cin_pod*/
		hlavni_cin_pod?: JsonDecimal|null;
		/**majcdrm.drh_txt*/
		drh_id_txt?: string|null;
		/**majcakt.mat_akt_txt*/
		mat_akt_txt?: string|null;
	}
	const enum GRenMajetkovyProfilDtoNames { ixs_maj = "ixs_maj", lic = "lic", inv_cis = "inv_cis", ser_cis = "ser_cis", evi_cis = "evi_cis", vyr_cis = "vyr_cis", rok_vyr = "rok_vyr", skp = "skp", nazev_skp = "nazev_skp", nazev = "nazev", ueab_por = "ueab_por", ueab_opr = "ueab_opr", ueab_evi = "ueab_evi", cmj = "cmj", pmj = "pmj", c = "c", pmj_min = "pmj_min", dat_por = "dat_por", dat_zar = "dat_zar", dat_vyr = "dat_vyr", dat_vznik = "dat_vznik", ico = "ico", ucs = "ucs", nks = "nks", trida = "trida", stredisko = "stredisko", budova_kod = "budova_kod", mistnost_kod = "mistnost_kod", ixs_orj = "ixs_orj", ixs_ref = "ixs_ref", ixs_maj_nad = "ixs_maj_nad", typ_soubor = "typ_soubor", jmeno_soubor = "jmeno_soubor", inv_cis_soubor = "inv_cis_soubor", drh_id = "drh_id", skupina_id = "skupina_id", mj = "mj", skupina_odp = "skupina_odp", polozka_odp = "polozka_odp", tev = "tev", dev = "dev", tka = "tka", mat_akt = "mat_akt", kod_vyr = "kod_vyr", kod_por = "kod_por", poznamka = "poznamka", tisk_eti = "tisk_eti", pmj_res = "pmj_res", priz_odp = "priz_odp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pmj_max = "pmj_max", id_top = "id_top", id_mnoz = "id_mnoz", mat_cis = "mat_cis", sarze = "sarze", zev = "zev", expirace = "expirace", ean = "ean", dp_ode = "dp_ode", dan_typ = "dan_typ", c_dph = "c_dph", c_c_dph = "c_c_dph", kod_vyu = "kod_vyu", akce = "akce", segment_kod = "segment_kod", dat_uct_0123 = "dat_uct_0123", typ_dok_por = "typ_dok_por", typ_dok_vyr = "typ_dok_vyr", inv_in = "inv_in", lhuta_zaruka = "lhuta_zaruka", objekt = "objekt", stat_puvod = "stat_puvod", ixs_esu_vyr = "ixs_esu_vyr", ixs_esu_dod = "ixs_esu_dod", ixs_esu_servis = "ixs_esu_servis", typ_maj = "typ_maj", ktg_zar = "ktg_zar", hmotnost = "hmotnost", prev_stav = "prev_stav", mobilita = "mobilita", trida_bezp = "trida_bezp", riziko_por = "riziko_por", rozmer_l = "rozmer_l", rozmer_w = "rozmer_w", rozmer_h = "rozmer_h", c_dph_odpocet = "c_dph_odpocet", ixs_esu_vla = "ixs_esu_vla", gps_sirka = "gps_sirka", gps_delka = "gps_delka", ext_1 = "ext_1", ext_2 = "ext_2", ext_3 = "ext_3", stav_maj = "stav_maj", id_krt_dev = "id_krt_dev", c_poriz = "c_poriz", c_dph_poriz = "c_dph_poriz", c_c_dph_poriz = "c_c_dph_poriz", c_opr_pol = "c_opr_pol", c_dph_opr_pol = "c_dph_opr_pol", c_c_dph_opr_pol = "c_c_dph_opr_pol", c_real = "c_real", c_dph_real = "c_dph_real", c_c_dph_real = "c_c_dph_real", c_dotace = "c_dotace", ke_pap = "ke_pap", kt_pap = "kt_pap", dat_uup = "dat_uup", id_maj = "id_maj", ktg_kp = "ktg_kp", cis_rejstrik_kp = "cis_rejstrik_kp", id_rejstrik_kp = "id_rejstrik_kp", cmj_pro1 = "cmj_pro1", cmj_pro2 = "cmj_pro2", cmj_pro3 = "cmj_pro3", ixs_elo = "ixs_elo", hlavni_cin_pod = "hlavni_cin_pod", drh_id_txt = "drh_id_txt", mat_akt_txt = "mat_akt_txt", Permissions = "Permissions",}
	const enum GRenMajetkovyProfilDtoFragments { ixs_maj = "Base", lic = "Base", inv_cis = "Base", ser_cis = "Base", evi_cis = "Base", vyr_cis = "Base", rok_vyr = "Base", skp = "Base", nazev_skp = "Base", nazev = "Base", ueab_por = "Base", ueab_opr = "Base", ueab_evi = "Base", cmj = "Base", pmj = "Base", c = "Base", pmj_min = "Base", dat_por = "Base", dat_zar = "Base", dat_vyr = "Base", dat_vznik = "Base", ico = "Base", ucs = "Base", nks = "Base", trida = "Base", stredisko = "Base", budova_kod = "Base", mistnost_kod = "Base", ixs_orj = "Base", ixs_ref = "Base", ixs_maj_nad = "Base", typ_soubor = "Base", jmeno_soubor = "Base", inv_cis_soubor = "Base", drh_id = "Base", skupina_id = "Base", mj = "Base", skupina_odp = "Base", polozka_odp = "Base", tev = "Base", dev = "Base", tka = "Base", mat_akt = "Base", kod_vyr = "Base", kod_por = "Base", poznamka = "Base", tisk_eti = "Base", pmj_res = "Base", priz_odp = "Base", dat_zmena = "Base", zmenu_prov = "Base", pmj_max = "Base", id_top = "Base", id_mnoz = "Base", mat_cis = "Base", sarze = "Base", zev = "Base", expirace = "Base", ean = "Base", dp_ode = "Base", dan_typ = "Base", c_dph = "Base", c_c_dph = "Base", kod_vyu = "Base", akce = "Base", segment_kod = "Base", dat_uct_0123 = "Base", typ_dok_por = "Base", typ_dok_vyr = "Base", inv_in = "Base", lhuta_zaruka = "Base", objekt = "Base", stat_puvod = "Base", ixs_esu_vyr = "Base", ixs_esu_dod = "Base", ixs_esu_servis = "Base", typ_maj = "Base", ktg_zar = "Base", hmotnost = "Base", prev_stav = "Base", mobilita = "Base", trida_bezp = "Base", riziko_por = "Base", rozmer_l = "Base", rozmer_w = "Base", rozmer_h = "Base", c_dph_odpocet = "Base", ixs_esu_vla = "Base", gps_sirka = "Base", gps_delka = "Base", ext_1 = "Base", ext_2 = "Base", ext_3 = "Base", stav_maj = "Base", id_krt_dev = "Base", c_poriz = "Base", c_dph_poriz = "Base", c_c_dph_poriz = "Base", c_opr_pol = "Base", c_dph_opr_pol = "Base", c_c_dph_opr_pol = "Base", c_real = "Base", c_dph_real = "Base", c_c_dph_real = "Base", c_dotace = "Base", ke_pap = "Base", kt_pap = "Base", dat_uup = "Base", id_maj = "Base", ktg_kp = "Base", cis_rejstrik_kp = "Base", id_rejstrik_kp = "Base", cmj_pro1 = "Base", cmj_pro2 = "Base", cmj_pro3 = "Base", ixs_elo = "Base", hlavni_cin_pod = "Base", drh_id_txt = "drh_id_txt", mat_akt_txt = "mat_akt_txt", Permissions = "*",}
	const enum GRenMajetkovyProfilDtoTypes { ixs_maj = "string", lic = "string", inv_cis = "string", ser_cis = "string", evi_cis = "string", vyr_cis = "string", rok_vyr = "number", skp = "string", nazev_skp = "string", nazev = "string", ueab_por = "string", ueab_opr = "string", ueab_evi = "string", cmj = "JsonDecimal", pmj = "JsonDecimal", c = "JsonDecimal", pmj_min = "JsonDecimal", dat_por = "JsonDate", dat_zar = "JsonDate", dat_vyr = "JsonDate", dat_vznik = "JsonDate", ico = "string", ucs = "string", nks = "string", trida = "string", stredisko = "string", budova_kod = "string", mistnost_kod = "string", ixs_orj = "string", ixs_ref = "string", ixs_maj_nad = "string", typ_soubor = "number", jmeno_soubor = "string", inv_cis_soubor = "string", drh_id = "number", skupina_id = "number", mj = "string", skupina_odp = "string", polozka_odp = "number", tev = "number", dev = "number", tka = "number", mat_akt = "number", kod_vyr = "number", kod_por = "number", poznamka = "string", tisk_eti = "number", pmj_res = "JsonDecimal", priz_odp = "number", dat_zmena = "JsonDate", zmenu_prov = "string", pmj_max = "JsonDecimal", id_top = "string", id_mnoz = "number", mat_cis = "string", sarze = "string", zev = "number", expirace = "JsonDate", ean = "string", dp_ode = "JsonDecimal", dan_typ = "number", c_dph = "JsonDecimal", c_c_dph = "JsonDecimal", kod_vyu = "number", akce = "string", segment_kod = "string", dat_uct_0123 = "JsonDate", typ_dok_por = "number", typ_dok_vyr = "number", inv_in = "number", lhuta_zaruka = "number", objekt = "string", stat_puvod = "number", ixs_esu_vyr = "string", ixs_esu_dod = "string", ixs_esu_servis = "string", typ_maj = "string", ktg_zar = "number", hmotnost = "JsonDecimal", prev_stav = "number", mobilita = "number", trida_bezp = "number", riziko_por = "number", rozmer_l = "JsonDecimal", rozmer_w = "JsonDecimal", rozmer_h = "JsonDecimal", c_dph_odpocet = "JsonDecimal", ixs_esu_vla = "string", gps_sirka = "string", gps_delka = "string", ext_1 = "number", ext_2 = "number", ext_3 = "number", stav_maj = "number", id_krt_dev = "string", c_poriz = "JsonDecimal", c_dph_poriz = "JsonDecimal", c_c_dph_poriz = "JsonDecimal", c_opr_pol = "JsonDecimal", c_dph_opr_pol = "JsonDecimal", c_c_dph_opr_pol = "JsonDecimal", c_real = "JsonDecimal", c_dph_real = "JsonDecimal", c_c_dph_real = "JsonDecimal", c_dotace = "JsonDecimal", ke_pap = "string", kt_pap = "string", dat_uup = "JsonDate", id_maj = "string", ktg_kp = "number", cis_rejstrik_kp = "string", id_rejstrik_kp = "string", cmj_pro1 = "JsonDecimal", cmj_pro2 = "JsonDecimal", cmj_pro3 = "JsonDecimal", ixs_elo = "string", hlavni_cin_pod = "JsonDecimal", drh_id_txt = "string", mat_akt_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenMajetkovyProfilDtoTypeLengths { ixs_maj = 12, lic = 4, inv_cis = 50, ser_cis = 40, evi_cis = 40, vyr_cis = 40, skp = 15, nazev_skp = 254, nazev = 2000, ueab_por = 7, ueab_opr = 7, ueab_evi = 7, ico = 10, ucs = 10, nks = 12, trida = 4, stredisko = 12, budova_kod = 8, mistnost_kod = 8, ixs_orj = 12, ixs_ref = 12, ixs_maj_nad = 12, jmeno_soubor = 50, inv_cis_soubor = 50, mj = 5, skupina_odp = 4, poznamka = 254, zmenu_prov = 12, id_top = 12, mat_cis = 20, sarze = 20, ean = 13, akce = 20, segment_kod = 8, objekt = 8, ixs_esu_vyr = 12, ixs_esu_dod = 12, ixs_esu_servis = 12, typ_maj = 50, ixs_esu_vla = 12, gps_sirka = 12, gps_delka = 12, id_krt_dev = 20, ke_pap = 5, kt_pap = 5, id_maj = 40, cis_rejstrik_kp = 20, id_rejstrik_kp = 12, ixs_elo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenMapovyListDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsmli
	*      Mapový list
	*/
	interface GRenMapovyListDto extends GRenBaseDetailDto {
		/**Číslo mapového listu*/
		map_list?: string|null;
		/**Označení mapového listu*/
		ozn_map_listu?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Mapa*/
		mapa?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenMapovyListDtoNames { map_list = "map_list", ozn_map_listu = "ozn_map_listu", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", mapa = "mapa", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenMapovyListDtoFragments { map_list = "Base", ozn_map_listu = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", mapa = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenMapovyListDtoTypes { map_list = "string", ozn_map_listu = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", mapa = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenMapovyListDtoTypeLengths { map_list = 30, ozn_map_listu = 100, mapa = 5, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenObecDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsobc
	*      Tabulka obcí katastru nemovitostí
	*/
	interface GRenObecDto extends GRenBaseDetailDto {
		/**Kód obce*/
		kod_obce?: number|null;
		/**Kód okresu*/
		kod_okresu?: number|null;
		/**Název obce*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Navigační vlastnost pro Okres (kod_okresu)*/
		Okres?: Gordic.Ren.Interface.GRenOkresDto|null;
		/**Navigační vlastnost pro Kraj (kod_kraje_n)*/
		Kraj?: Gordic.Ren.Interface.GRenKrajDto|null;
	}
	const enum GRenObecDtoNames { kod_obce = "kod_obce", kod_okresu = "kod_okresu", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Okres = "Okres", Kraj = "Kraj",}
	const enum GRenObecDtoFragments { kod_obce = "Base", kod_okresu = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Okres = "Okres", Kraj = "Kraj",}
	const enum GRenObecDtoTypes { kod_obce = "number", kod_okresu = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Okres = "Gordic.Ren.Interface.GRenOkresDto", Kraj = "Gordic.Ren.Interface.GRenKrajDto",}
	const enum GRenObecDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenObjektyRizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsori
	*      nemsori
	*/
	interface GRenObjektyRizeniDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		id_objriz?: string|null;
		id_rizeni?: string|null;
		id_parcely?: string|null;
		id_budovy?: string|null;
		id_jednotky?: string|null;
		dat_plomby?: JsonDate|null;
		dat_odstr_pl?: JsonDate|null;
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		datum_hist_od?: JsonDate|null;
		datum_hist_do?: JsonDate|null;
		id_pr_sta?: string|null;
		typ_rizeni_nazev?: string|null;
		typ_pred_rizeni_nazev?: string|null;
		/**Navigační vlastnost*/
		Rizeni?: Gordic.Ren.Interface.GRenRizeniDto|null;
		/**Navigační vlastnost*/
		TypPredmetuRizeni?: Gordic.Ren.Interface.GRenTypPredmetuRizeniDto|null;
	}
	const enum GRenObjektyRizeniDtoNames { id_objriz = "id_objriz", id_rizeni = "id_rizeni", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", dat_plomby = "dat_plomby", dat_odstr_pl = "dat_odstr_pl", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", datum_hist_od = "datum_hist_od", datum_hist_do = "datum_hist_do", id_pr_sta = "id_pr_sta", typ_rizeni_nazev = "typ_rizeni_nazev", typ_pred_rizeni_nazev = "typ_pred_rizeni_nazev", Rizeni = "Rizeni", TypPredmetuRizeni = "TypPredmetuRizeni", Permissions = "Permissions",}
	const enum GRenObjektyRizeniDtoFragments { id_objriz = "Base", id_rizeni = "Base", id_parcely = "Base", id_budovy = "Base", id_jednotky = "Base", dat_plomby = "Base", dat_odstr_pl = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", datum_hist_od = "Base", datum_hist_do = "Base", id_pr_sta = "Base", typ_rizeni_nazev = "Base", typ_pred_rizeni_nazev = "Base", Rizeni = "Rizeni", TypPredmetuRizeni = "TypPredmetuRizeni", Permissions = "*",}
	const enum GRenObjektyRizeniDtoTypes { id_objriz = "string", id_rizeni = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", dat_plomby = "JsonDate", dat_odstr_pl = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", datum_hist_od = "JsonDate", datum_hist_do = "JsonDate", id_pr_sta = "string", typ_rizeni_nazev = "string", typ_pred_rizeni_nazev = "string", Rizeni = "Gordic.Ren.Interface.GRenRizeniDto", TypPredmetuRizeni = "Gordic.Ren.Interface.GRenTypPredmetuRizeniDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenObjektyRizeniDtoTypeLengths { id_objriz = 30, id_rizeni = 30, id_parcely = 30, id_budovy = 30, id_jednotky = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_pr_sta = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenOkresDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsokr
	*      Tabulka okresůkatastru nemovitostí
	*/
	interface GRenOkresDto extends GRenBaseDetailDto {
		/**Kód okresu*/
		kod_okresu?: number|null;
		/**Kód kraje*/
		kod_kraje?: number|null;
		/**Název okresu*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Kód kraje Nový*/
		kod_kraje_n?: number|null;
		/**Nuts4*/
		nuts4?: string|null;
		/**Navigační vlastnost pro Kraj (kod_kraje_n)*/
		Kraj?: Gordic.Ren.Interface.GRenKrajDto|null;
	}
	const enum GRenOkresDtoNames { kod_okresu = "kod_okresu", kod_kraje = "kod_kraje", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_kraje_n = "kod_kraje_n", nuts4 = "nuts4", Kraj = "Kraj",}
	const enum GRenOkresDtoFragments { kod_okresu = "Base", kod_kraje = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", kod_kraje_n = "Base", nuts4 = "Base", Kraj = "Kraj",}
	const enum GRenOkresDtoTypes { kod_okresu = "number", kod_kraje = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kod_kraje_n = "number", nuts4 = "string", Kraj = "Gordic.Ren.Interface.GRenKrajDto",}
	const enum GRenOkresDtoTypeLengths { nazev = 32, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, nuts4 = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenOpravnenySubjektDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsosu*/
	interface GRenOpravnenySubjektDto extends GRenBaseDetailDto {
		/**Identifikátor oprávněného subjektu*/
		id_opr_subj?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Identifikátor oprávněného subjektu - 1. partner BSM*/
		id_opr_subj_1?: string|null;
		/**Identifikátor oprávněného subjektu - 2. partner BSM*/
		id_opr_subj_2?: string|null;
		/**identifikace na zdrojovém pracovišti*/
		id_zdroj?: string|null;
		/**Typ oprávněných subjektů*/
		typ_opr_subj?: string|null;
		/**Rozlišení oprávněného subjektu*/
		char_opr_subj?: number|null;
		/**IČ numericky*/
		ico_num?: number|null;
		/**Doplněk IČO*/
		doplnek_ico?: number|null;
		/**Obchodní jméno*/
		nazev_osu?: string|null;
		/**Obchodní jméno velkými písmeny*/
		nazev_u?: string|null;
		/**Rodné číslo*/
		rodne_cislo?: string|null;
		/**Titul před jménem*/
		titul_pred?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Jméno velkými písmeny*/
		jmeno_u?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Příjmení velkými písmeny*/
		prijmeni_u?: string|null;
		/**Titul za jménem*/
		titul_za?: string|null;
		/**Číslo popisné nebo číslo evidenční*/
		cislo_domovni?: number|null;
		/**Číslo orientační*/
		cislo_orient?: string|null;
		/**Název ulice nebo veřejného prostranství*/
		nazev_ulice?: string|null;
		/**Název části obce*/
		cast_obce?: string|null;
		/**Název obce*/
		obec?: string|null;
		/**Název okresu*/
		okres?: string|null;
		/**Název státu*/
		stat?: string|null;
		/**Poštovní směrovací číslo*/
		psc?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsosu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsosu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsosu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsosu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:nemsosu.mestska_cast*/
		mestska_cast?: string|null;
		/**Rozlišení č.p. a č.e*/
		cp_ce?: number|null;
		/**Časový údaj původního vzniku entity v systému*/
		dat_vzniku2?: JsonDate|null;
		/**Odkaz na unikátní generované číslo původního řízení vzniku*/
		id_rizeni_vzn2?: string|null;
		/**Odkaz na adresní místo RÚIAN*/
		kod_adrm?: number|null;
		/**Pseudonymizovaný identifikátor nadřízené právnické osoby*/
		id_opr_subj_nad?: string|null;
	}
	const enum GRenOpravnenySubjektDtoNames { id_opr_subj = "id_opr_subj", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_opr_subj_1 = "id_opr_subj_1", id_opr_subj_2 = "id_opr_subj_2", id_zdroj = "id_zdroj", typ_opr_subj = "typ_opr_subj", char_opr_subj = "char_opr_subj", ico_num = "ico_num", doplnek_ico = "doplnek_ico", nazev_osu = "nazev_osu", nazev_u = "nazev_u", rodne_cislo = "rodne_cislo", titul_pred = "titul_pred", jmeno = "jmeno", jmeno_u = "jmeno_u", prijmeni = "prijmeni", prijmeni_u = "prijmeni_u", titul_za = "titul_za", cislo_domovni = "cislo_domovni", cislo_orient = "cislo_orient", nazev_ulice = "nazev_ulice", cast_obce = "cast_obce", obec = "obec", okres = "okres", stat = "stat", psc = "psc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mestska_cast = "mestska_cast", cp_ce = "cp_ce", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", kod_adrm = "kod_adrm", id_opr_subj_nad = "id_opr_subj_nad",}
	const enum GRenOpravnenySubjektDtoFragments { id_opr_subj = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_opr_subj_1 = "Base", id_opr_subj_2 = "Base", id_zdroj = "Base", typ_opr_subj = "Base", char_opr_subj = "Base", ico_num = "Base", doplnek_ico = "Base", nazev_osu = "Base", nazev_u = "Base", rodne_cislo = "Base", titul_pred = "Base", jmeno = "Base", jmeno_u = "Base", prijmeni = "Base", prijmeni_u = "Base", titul_za = "Base", cislo_domovni = "Base", cislo_orient = "Base", nazev_ulice = "Base", cast_obce = "Base", obec = "Base", okres = "Base", stat = "Base", psc = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", mestska_cast = "Base", cp_ce = "Base", dat_vzniku2 = "Base", id_rizeni_vzn2 = "Base", kod_adrm = "Base", id_opr_subj_nad = "Base",}
	const enum GRenOpravnenySubjektDtoTypes { id_opr_subj = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_opr_subj_1 = "string", id_opr_subj_2 = "string", id_zdroj = "string", typ_opr_subj = "string", char_opr_subj = "number", ico_num = "number", doplnek_ico = "number", nazev_osu = "string", nazev_u = "string", rodne_cislo = "string", titul_pred = "string", jmeno = "string", jmeno_u = "string", prijmeni = "string", prijmeni_u = "string", titul_za = "string", cislo_domovni = "number", cislo_orient = "string", nazev_ulice = "string", cast_obce = "string", obec = "string", okres = "string", stat = "string", psc = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mestska_cast = "string", cp_ce = "number", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", kod_adrm = "number", id_opr_subj_nad = "string",}
	const enum GRenOpravnenySubjektDtoTypeLengths { id_opr_subj = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_opr_subj_1 = 30, id_opr_subj_2 = 30, id_zdroj = 30, typ_opr_subj = 10, nazev_osu = 254, nazev_u = 254, rodne_cislo = 10, titul_pred = 35, jmeno = 100, jmeno_u = 100, prijmeni = 100, prijmeni_u = 100, titul_za = 35, cislo_orient = 4, nazev_ulice = 48, cast_obce = 48, obec = 48, okres = 48, stat = 100, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, mestska_cast = 48, id_rizeni_vzn2 = 30, id_opr_subj_nad = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenParcelaDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemspar*/
	interface GRenParcelaDto extends Gordic.Ren.Interface.GRenBaseDetailNemovitostiDto {
		/**Identifikátor parcely v katastru nemovitostí*/
		id_parcely?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Odkaz na unikátní generované číslo [parcely]. Odkaz na parcelu KN, která leží „nad“ parcelou ZE*/
		id_parcely_pkn?: string|null;
		/**Typ parcely*/
		typ_parcely?: string|null;
		/**Kód katastrálního území*/
		kod_kat_uzemi?: number|null;
		/**Kód katastrálního území původní*/
		kod_kat_uz_puv?: number|null;
		/**Druh číslování parcel*/
		druh_cis_par?: number|null;
		/**Kmenové číslo parcely*/
		kmen_cislo_par?: number|null;
		/**Zdroj evidence parcel ve zjednodušené evidenci*/
		zdroj_par_ze?: number|null;
		/**Poddělení čísla parcely*/
		podd_cisla_par?: number|null;
		/**Číslo dílu parcely*/
		dil_parcely?: number|null;
		/**Odkaz na unikátní generované číslo mapového listu*/
		map_list?: string|null;
		/**Kód způsobu určení výměry*/
		zp_urc_vym?: number|null;
		/**Kód druhu pozemku.*/
		druh_poz?: number|null;
		/**Specifikace využití pozemku v rámci druhu pozemku*/
		zp_vyuz_poz?: number|null;
		/**Typ parcely ve zjednodušené evidenci určuje druh evidované parcely*/
		typ_par_ze?: number|null;
		/**Výměra parcely v metrech čtverečních*/
		vymera_par?: number|null;
		/**Cena nemovitosti ISKN*/
		c_cena_nem?: JsonDecimal|null;
		/**Definiční bod parcely*/
		defin_bod_par?: string|null;
		/**Odkaz na unikátní generované číslo tělesa*/
		id_telesa?: string|null;
		/**Odkaz na unikátní generované číslo parcely (vyplňuje se u dílů), odkaz na parcelu, jejíž součástí je tento díl*/
		id_parcely_par?: string|null;
		/**Odkaz na unikátní generované číslo budovy na parcele*/
		id_budovy?: string|null;
		/**Parcela identifikuje budovu*/
		s_ident_bud?: number|null;
		/**Cena nemovitosti z ocenění v REN*/
		c_cena_oc?: JsonDecimal|null;
		/**Oceněná výměra*/
		vymera_oc?: number|null;
		/**Datum ocenění*/
		dat_oc?: JsonDate|null;
		/**Popis ocenění*/
		popis_oc?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu*/
		zmenu_prov?: string|null;
		/**Způsob ocenění nemovitosti*/
		zp_oc?: number|null;
		/**Cena za jednotku*/
		c_cena_jedn?: JsonDecimal|null;
		/**Typ dat*/
		typ_dat?: number|null;
		/**Identifikátor parcely z katastru nemovitostí (pokud byl záznam založen uživatelsky)*/
		id_parcely_orig?: string|null;
		/**Název parcely - uživatelský*/
		parcela_nazev?: string|null;
		/**Příznak - Budova je součástí pozemku*/
		s_soucasti?: number|null;
		/**Odkaz na unikátní generované číslo práva stavby*/
		id_pr_sta?: string|null;
		/**Parcela identifikuje právo stavby*/
		s_ident_ps?: number|null;
		/**Datum zahájení vkladu do katastru nemovitostí*/
		dat_zahajeni?: JsonDate|null;
		/**Datum vkladu do katastru nemovitostí*/
		dat_vkladu?: JsonDate|null;
		/**Parcela textem*/
		parcela_txt?: string|null;
		/**Budova textem*/
		budova_txt?: string|null;
		/**Navigační vlastnost pro Budovu (id_budovy)*/
		Budova?: Gordic.Ren.Interface.GRenBudovaDto|null;
		/**Navigační vlastnost pro DruhPozemku (nemsdpo.nazev)*/
		DruhPozemku?: Gordic.Ren.Interface.GRenDruhPozemkuDto|null;
		/**Navigační vlastnost pro DruhPozemku (nemsdpo.nazev)*/
		DruhPozemkuMaj?: Gordic.Ren.Interface.GRenDruhPozemkuDto|null;
		/**Navigační vlastnost pro ZpusobVyuzitiPozemku (nemszvp.nazev)*/
		ZpusobVyuzitiPozemku?: Gordic.Ren.Interface.GRenZpusobVyuzitiPozemkuDto|null;
		/**Navigační vlastnost pro GGinszmpDto (.)*/
		ZmenuProvedl?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Navigační vlastnost pro ZpusobUrceniVymery (nemszuv.nazev)*/
		ZpusobUrceniVymery?: Gordic.Ren.Interface.GRenZpusobUrceniVymeryDto|null;
		/**Navigační vlastnost pro DruhCislovaniParcely (nemsdcp.popis)*/
		DruhCislovaniParcely?: Gordic.Ren.Interface.GRenDruhCislovaniParcelyDto|null;
		/**Navigační vlastnost pro TypParcely (nemstpa.popis)*/
		TypParcely?: Gordic.Ren.Interface.GRenTypParcelyDto|null;
		/**Navigační vlastnost pro MapovyList (nemsmli.ozn_map_listu)*/
		MapovyList?: Gordic.Ren.Interface.GRenMapovyListDto|null;
		/**Navigační vlastnost pro ZdrojParcelZe (nemszpz.nazev)*/
		ZdrojParcelZe?: Gordic.Ren.Interface.GRenZdrojParcelZeDto|null;
		popis_parcely?: string|null;
		parcely_pod_budovou?: string|null;
		vymera_par_rozdil?: number|null;
		druh_poz_rozdil?: number|null;
		teleso_aktivita?: number|null;
		vla_id_opr_subj?: string|null;
		/**nemstpa.popis*/
		typ_parcely_popis?: string|null;
		/**nemskat.nazev*/
		nazev_kat_uzemi?: string|null;
		/**nemsdcp.popis*/
		druh_cis_par_popis?: string|null;
		/**nemszpz.nazev*/
		zdroj_par_ze_nazev?: string|null;
		/**nemsmli.ozn_map_listu*/
		ozn_map_listu?: string|null;
		/**nemszuv.nazev*/
		zp_urc_vym_nazev?: string|null;
		/**nemsdpo.nazev*/
		druh_poz_nazev?: string|null;
		/**nemszvp.nazev.*/
		zp_vyuz_poz_nazev?: string|null;
		/**nemstpz.popis*/
		typ_par_ze_nazev?: string|null;
		/**nemvkdp.c_cena_oc*/
		c_cena_oc_glob?: JsonDecimal|null;
		/**nemsdpo.c_cena_oc*/
		c_cena_oc_kat?: JsonDecimal|null;
		/**nemczoc.zp_oc_txt*/
		zoc_zp_oc_txt?: string|null;
		/**nemspar.cena_pozemku*/
		cena_pozemku?: JsonDecimal|null;
		/**nemskat.kod_obce*/
		kod_obce?: number|null;
		/**nemsobc.nazev*/
		nazev_obce?: string|null;
		/**nemsobc.kod_okresu*/
		kod_okresu?: number|null;
		/**nemsokr.nazev*/
		nazev_okresu?: string|null;
		/**nemsokr.kod_kraje_n*/
		kod_kraje_n?: number|null;
		/**nemskrn.nazev*/
		nazev_kraje_n?: string|null;
		/**nemstbu.nazev*/
		typ_budovy_nazev?: string|null;
		/**nemsbud.cislo_domovni*/
		cislo_domovni?: number|null;
		/**nemstel.cislo_tel*/
		cislo_tel?: number|null;
		/**nemszvb.nazev*/
		zp_vyuz_bud_nazev?: string|null;
		/**ginszmp.nazev_rf*/
		zmenu_prov_nazev?: string|null;
		/**nemsosu.rodne_cislo*/
		osu_rodne_cislo?: string|null;
		/**nemsosu.ico_num*/
		osu_ico_num?: number|null;
		/**nemsosu.nazev_osu*/
		osu_nazev?: string|null;
		/**nemscos.nazev_cos*/
		nazev_cos?: string|null;
		/**nemstpv.nazev_tpv*/
		nazev_tpv?: string|null;
	}
	const enum GRenParcelaDtoNames { id_parcely = "id_parcely", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_parcely_pkn = "id_parcely_pkn", typ_parcely = "typ_parcely", kod_kat_uzemi = "kod_kat_uzemi", kod_kat_uz_puv = "kod_kat_uz_puv", druh_cis_par = "druh_cis_par", kmen_cislo_par = "kmen_cislo_par", zdroj_par_ze = "zdroj_par_ze", podd_cisla_par = "podd_cisla_par", dil_parcely = "dil_parcely", map_list = "map_list", zp_urc_vym = "zp_urc_vym", druh_poz = "druh_poz", zp_vyuz_poz = "zp_vyuz_poz", typ_par_ze = "typ_par_ze", vymera_par = "vymera_par", c_cena_nem = "c_cena_nem", defin_bod_par = "defin_bod_par", id_telesa = "id_telesa", id_parcely_par = "id_parcely_par", id_budovy = "id_budovy", s_ident_bud = "s_ident_bud", c_cena_oc = "c_cena_oc", vymera_oc = "vymera_oc", dat_oc = "dat_oc", popis_oc = "popis_oc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_oc = "zp_oc", c_cena_jedn = "c_cena_jedn", typ_dat = "typ_dat", id_parcely_orig = "id_parcely_orig", parcela_nazev = "parcela_nazev", s_soucasti = "s_soucasti", id_pr_sta = "id_pr_sta", s_ident_ps = "s_ident_ps", dat_zahajeni = "dat_zahajeni", dat_vkladu = "dat_vkladu", parcela_txt = "parcela_txt", budova_txt = "budova_txt", Budova = "Budova", DruhPozemku = "DruhPozemku", DruhPozemkuMaj = "DruhPozemkuMaj", ZpusobVyuzitiPozemku = "ZpusobVyuzitiPozemku", ZmenuProvedl = "ZmenuProvedl", ZpusobUrceniVymery = "ZpusobUrceniVymery", DruhCislovaniParcely = "DruhCislovaniParcely", TypParcely = "TypParcely", MapovyList = "MapovyList", ZdrojParcelZe = "ZdrojParcelZe", popis_parcely = "popis_parcely", parcely_pod_budovou = "parcely_pod_budovou", vymera_par_rozdil = "vymera_par_rozdil", druh_poz_rozdil = "druh_poz_rozdil", teleso_aktivita = "teleso_aktivita", vla_id_opr_subj = "vla_id_opr_subj", typ_parcely_popis = "typ_parcely_popis", nazev_kat_uzemi = "nazev_kat_uzemi", druh_cis_par_popis = "druh_cis_par_popis", zdroj_par_ze_nazev = "zdroj_par_ze_nazev", ozn_map_listu = "ozn_map_listu", zp_urc_vym_nazev = "zp_urc_vym_nazev", druh_poz_nazev = "druh_poz_nazev", zp_vyuz_poz_nazev = "zp_vyuz_poz_nazev", typ_par_ze_nazev = "typ_par_ze_nazev", c_cena_oc_glob = "c_cena_oc_glob", c_cena_oc_kat = "c_cena_oc_kat", zoc_zp_oc_txt = "zoc_zp_oc_txt", cena_pozemku = "cena_pozemku", kod_obce = "kod_obce", nazev_obce = "nazev_obce", kod_okresu = "kod_okresu", nazev_okresu = "nazev_okresu", kod_kraje_n = "kod_kraje_n", nazev_kraje_n = "nazev_kraje_n", typ_budovy_nazev = "typ_budovy_nazev", cislo_domovni = "cislo_domovni", cislo_tel = "cislo_tel", zp_vyuz_bud_nazev = "zp_vyuz_bud_nazev", zmenu_prov_nazev = "zmenu_prov_nazev", osu_rodne_cislo = "osu_rodne_cislo", osu_ico_num = "osu_ico_num", osu_nazev = "osu_nazev", nazev_cos = "nazev_cos", nazev_tpv = "nazev_tpv", Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", aktivita_ku = "aktivita_ku", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil", email_avizo_vklad_txt = "email_avizo_vklad_txt", Permissions = "Permissions",}
	const enum GRenParcelaDtoFragments { id_parcely = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_parcely_pkn = "Base", typ_parcely = "Base", kod_kat_uzemi = "Base", kod_kat_uz_puv = "Base", druh_cis_par = "Base", kmen_cislo_par = "Base", zdroj_par_ze = "Base", podd_cisla_par = "Base", dil_parcely = "Base", map_list = "Base", zp_urc_vym = "Base", druh_poz = "Base", zp_vyuz_poz = "Base", typ_par_ze = "Base", vymera_par = "Base", c_cena_nem = "Base", defin_bod_par = "Base", id_telesa = "Base", id_parcely_par = "Base", id_budovy = "Base", s_ident_bud = "Base", c_cena_oc = "Base", vymera_oc = "Base", dat_oc = "Base", popis_oc = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zp_oc = "Base", c_cena_jedn = "Base", typ_dat = "Base", id_parcely_orig = "Base", parcela_nazev = "Base", s_soucasti = "Base", id_pr_sta = "Base", s_ident_ps = "Base", dat_zahajeni = "Base", dat_vkladu = "Base", parcela_txt = "Base", budova_txt = "Base", Budova = "Budova", DruhPozemku = "DruhPozemku", DruhPozemkuMaj = "DruhPozemku", ZpusobVyuzitiPozemku = "ZpusobVyuzitiPozemku", ZmenuProvedl = "ZmenuProvedl", ZpusobUrceniVymery = "ZpusobUrceniVymery", DruhCislovaniParcely = "DruhCislovaniParcely", TypParcely = "TypParcely", MapovyList = "MapovyList", ZdrojParcelZe = "ZdrojParcelZe", popis_parcely = "*", parcely_pod_budovou = "*", vymera_par_rozdil = "*", druh_poz_rozdil = "*", teleso_aktivita = "teleso_aktivita", vla_id_opr_subj = "vla_id_opr_subj", typ_parcely_popis = "typ_parcely_popis", nazev_kat_uzemi = "nazev_kat_uzemi", druh_cis_par_popis = "druh_cis_par_popis", zdroj_par_ze_nazev = "zdroj_par_ze_nazev", ozn_map_listu = "ozn_map_listu", zp_urc_vym_nazev = "zp_urc_vym_nazev", druh_poz_nazev = "druh_poz_nazev", zp_vyuz_poz_nazev = "zp_vyuz_poz_nazev", typ_par_ze_nazev = "typ_par_ze_nazev", c_cena_oc_glob = "c_cena_oc_glob", c_cena_oc_kat = "c_cena_oc_kat", zoc_zp_oc_txt = "zoc_zp_oc_txt", cena_pozemku = "cena_pozemku", kod_obce = "Base", nazev_obce = "Base", kod_okresu = "Base", nazev_okresu = "Base", kod_kraje_n = "Base", nazev_kraje_n = "Base", typ_budovy_nazev = "Base", cislo_domovni = "Base", cislo_tel = "Base", zp_vyuz_bud_nazev = "Base", zmenu_prov_nazev = "Base", osu_rodne_cislo = "Base", osu_ico_num = "Base", osu_nazev = "Base", nazev_cos = "Base", nazev_tpv = "Base", Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "Base", s_zastavni_pravo = "Base", aktivita_ku = "Extended", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*", email_avizo_vklad_txt = "*", Permissions = "*",}
	const enum GRenParcelaDtoTypes { id_parcely = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_parcely_pkn = "string", typ_parcely = "string", kod_kat_uzemi = "number", kod_kat_uz_puv = "number", druh_cis_par = "number", kmen_cislo_par = "number", zdroj_par_ze = "number", podd_cisla_par = "number", dil_parcely = "number", map_list = "string", zp_urc_vym = "number", druh_poz = "number", zp_vyuz_poz = "number", typ_par_ze = "number", vymera_par = "number", c_cena_nem = "JsonDecimal", defin_bod_par = "string", id_telesa = "string", id_parcely_par = "string", id_budovy = "string", s_ident_bud = "number", c_cena_oc = "JsonDecimal", vymera_oc = "number", dat_oc = "JsonDate", popis_oc = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_oc = "number", c_cena_jedn = "JsonDecimal", typ_dat = "number", id_parcely_orig = "string", parcela_nazev = "string", s_soucasti = "number", id_pr_sta = "string", s_ident_ps = "number", dat_zahajeni = "JsonDate", dat_vkladu = "JsonDate", parcela_txt = "string", budova_txt = "string", Budova = "Gordic.Ren.Interface.GRenBudovaDto", DruhPozemku = "Gordic.Ren.Interface.GRenDruhPozemkuDto", DruhPozemkuMaj = "Gordic.Ren.Interface.GRenDruhPozemkuDto", ZpusobVyuzitiPozemku = "Gordic.Ren.Interface.GRenZpusobVyuzitiPozemkuDto", ZmenuProvedl = "Gordic.Gin.Interface.GGinszmpDto", ZpusobUrceniVymery = "Gordic.Ren.Interface.GRenZpusobUrceniVymeryDto", DruhCislovaniParcely = "Gordic.Ren.Interface.GRenDruhCislovaniParcelyDto", TypParcely = "Gordic.Ren.Interface.GRenTypParcelyDto", MapovyList = "Gordic.Ren.Interface.GRenMapovyListDto", ZdrojParcelZe = "Gordic.Ren.Interface.GRenZdrojParcelZeDto", popis_parcely = "string", parcely_pod_budovou = "string", vymera_par_rozdil = "number", druh_poz_rozdil = "number", teleso_aktivita = "number", vla_id_opr_subj = "string", typ_parcely_popis = "string", nazev_kat_uzemi = "string", druh_cis_par_popis = "string", zdroj_par_ze_nazev = "string", ozn_map_listu = "string", zp_urc_vym_nazev = "string", druh_poz_nazev = "string", zp_vyuz_poz_nazev = "string", typ_par_ze_nazev = "string", c_cena_oc_glob = "JsonDecimal", c_cena_oc_kat = "JsonDecimal", zoc_zp_oc_txt = "string", cena_pozemku = "JsonDecimal", kod_obce = "number", nazev_obce = "string", kod_okresu = "number", nazev_okresu = "string", kod_kraje_n = "number", nazev_kraje_n = "string", typ_budovy_nazev = "string", cislo_domovni = "number", cislo_tel = "number", zp_vyuz_bud_nazev = "string", zmenu_prov_nazev = "string", osu_rodne_cislo = "string", osu_ico_num = "number", osu_nazev = "string", nazev_cos = "string", nazev_tpv = "string", Teleso = "Gordic.Ren.Interface.GRenTelesoDto", KatastralniUzemi = "Gordic.Ren.Interface.GRenKatastralniUzemiDto", ZpusobVyuzitiBudovy = "Gordic.Ren.Interface.GRenZpusobVyuzitiBudovyDto", CastObce = "Gordic.Ren.Interface.GRenCastObceDto", Okres = "Gordic.Ren.Interface.GRenOkresDto", Kraj = "Gordic.Ren.Interface.GRenKrajDto", Obec = "Gordic.Ren.Interface.GRenObecDto", TypBudovy = "Gordic.Ren.Interface.GRenTypBudovyDto", ZmenaProv = "Gordic.Gin.Interface.GGinszmpDto", Vlastnictvi = "Gordic.Ren.Interface.GRenVlastnictviDto", OpravnenySubjekt = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", CharakteristikaOs = "Gordic.Ren.Interface.GRenCharakteristikaOsDto", TypPravnihoVztahu = "Gordic.Ren.Interface.GRenTypPravnihoVztahuDto", MajetkovyProfil = "Gordic.Ren.Interface.GRenMajetkovyProfilDto", RozsirenyMajetkovyProfil = "Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto", ProfilTextuZaznamu = "Gordic.Ren.Interface.GRenProfilTextuZaznamuDto", ZaznamKNemovitosti = "Gordic.Ren.Interface.GRenZaznamKNemovitostiDto", TypZaznamu = "Gordic.Ren.Interface.GRenTypZaznamuDto", s_vecne_bremeno = "number", s_zastavni_pravo = "number", aktivita_ku = "number", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number", email_avizo_vklad_txt = "string", Permissions = "Gordic.Ren.Interface.GRenNemovitostPermissions",}
	const enum GRenParcelaDtoTypeLengths { id_parcely = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_parcely_pkn = 30, typ_parcely = 10, map_list = 30, defin_bod_par = 100, id_telesa = 30, id_parcely_par = 30, id_budovy = 30, popis_oc = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_parcely_orig = 30, parcela_nazev = 100, id_pr_sta = 30, parcela_txt = 50, budova_txt = 50,}
	/**Třída obsahující parametry pro ocenění parcely dle druhu pozemku v kat. území*/
	interface GRenParcelaOcenDruhPozKatRequestDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		seznamParcelProOc?: Gordic.Ren.Interface.GRenParcelaOcDruhPozKatDto[]|null;
		chyby?: string|null;
	}
	const enum GRenParcelaOcenDruhPozKatRequestDtoNames { seznamParcelProOc = "seznamParcelProOc", chyby = "chyby", Permissions = "Permissions",}
	const enum GRenParcelaOcenDruhPozKatRequestDtoFragments { seznamParcelProOc = "*", chyby = "*", Permissions = "*",}
	const enum GRenParcelaOcenDruhPozKatRequestDtoTypes { seznamParcelProOc = "Gordic.Ren.Interface.GRenParcelaOcDruhPozKatDto[]", chyby = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenParcelaOcenDruhPozKatRequestDtoTypeLengths {}
	/**Třída obsahující parametry pro ocenění parcely dle druhu pozemku v kat. území*/
	interface GRenParcelaOcDruhPozKatDto {
		/**Identifikátor parcely*/
		readonly IdParcely?: string|null;
		/**Cena druhu pozemku obecně (globální)*/
		readonly CCenaOcJednotkova?: JsonDecimal|null;
		/**Oceněná cena*/
		readonly CCenaOc?: JsonDecimal|null;
		/**Způsob ocenění*/
		readonly ZpusobOceneni?: number|null;
		/**Cena druhu pozemku obecně (globální)*/
		readonly CCenaOcGlob?: JsonDecimal|null;
		/**Oceněná výměra parcely*/
		readonly VymeraParcelyOc?: number|null;
	}
	const enum GRenParcelaOcDruhPozKatDtoNames { IdParcely = "IdParcely", CCenaOcJednotkova = "CCenaOcJednotkova", CCenaOc = "CCenaOc", ZpusobOceneni = "ZpusobOceneni", CCenaOcGlob = "CCenaOcGlob", VymeraParcelyOc = "VymeraParcelyOc",}
	const enum GRenParcelaOcDruhPozKatDtoFragments { IdParcely = "*", CCenaOcJednotkova = "*", CCenaOc = "*", ZpusobOceneni = "*", CCenaOcGlob = "*", VymeraParcelyOc = "*",}
	const enum GRenParcelaOcDruhPozKatDtoTypes { IdParcely = "string", CCenaOcJednotkova = "JsonDecimal", CCenaOc = "JsonDecimal", ZpusobOceneni = "number", CCenaOcGlob = "JsonDecimal", VymeraParcelyOc = "number",}
	const enum GRenParcelaOcDruhPozKatDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenPravoStavbyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsprs
	*      Právo stavby
	*/
	interface GRenPravoStavbyDto extends GRenBaseDetailDto {
		/**Identifikátor práva stavby*/
		id_pr_sta?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Datum přijetí záznamu*/
		dat_prijeti?: JsonDate|null;
		/**Datum ukončení platnosti záznamu*/
		dat_ukonceni?: JsonDate|null;
		/**Identifikátor katastrálního tělesa*/
		id_telesa?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenPravoStavbyDtoNames { id_pr_sta = "id_pr_sta", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", dat_prijeti = "dat_prijeti", dat_ukonceni = "dat_ukonceni", id_telesa = "id_telesa", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenPravoStavbyDtoFragments { id_pr_sta = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", dat_prijeti = "Base", dat_ukonceni = "Base", id_telesa = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenPravoStavbyDtoTypes { id_pr_sta = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", dat_prijeti = "JsonDate", dat_ukonceni = "JsonDate", id_telesa = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenPravoStavbyDtoTypeLengths { id_pr_sta = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_telesa = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenPrirazeniZpusobuOchranyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszon
	*      Přiřazení způsobu ochrany nemovitosti
	*/
	interface GRenPrirazeniZpusobuOchranyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor přiřazení způsobu ochrany nemovitosti*/
		id_zp_ochrany?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Způsob ochrany nemovitosti
		*      Identifikátor parcely
		*/
		zp_ochrany?: number|null;
		/**Identifikátor parcely*/
		id_parcely?: string|null;
		/**Identifikátor budovy*/
		id_budovy?: string|null;
		/**Identifikátor jednotky*/
		id_jednotky?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Identifikátor práva stavby*/
		id_pr_sta?: string|null;
		/**Navigacni vlastnost pro Způsob ochrany nemovitosti (zp_ochrany)*/
		ZpusobOchrany?: Gordic.Ren.Interface.GRenZpusobOchranyDto|null;
	}
	const enum GRenPrirazeniZpusobuOchranyDtoNames { id_zp_ochrany = "id_zp_ochrany", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", zp_ochrany = "zp_ochrany", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_pr_sta = "id_pr_sta", ZpusobOchrany = "ZpusobOchrany", Permissions = "Permissions",}
	const enum GRenPrirazeniZpusobuOchranyDtoFragments { id_zp_ochrany = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", zp_ochrany = "Base", id_parcely = "Base", id_budovy = "Base", id_jednotky = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", id_pr_sta = "Base", ZpusobOchrany = "ZpusobOchrany", Permissions = "*",}
	const enum GRenPrirazeniZpusobuOchranyDtoTypes { id_zp_ochrany = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", zp_ochrany = "number", id_parcely = "string", id_budovy = "string", id_jednotky = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_pr_sta = "string", ZpusobOchrany = "Gordic.Ren.Interface.GRenZpusobOchranyDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenPrirazeniZpusobuOchranyDtoTypeLengths { id_zp_ochrany = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_parcely = 30, id_budovy = 30, id_jednotky = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_pr_sta = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenProfilTextuZaznamuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstxt
	*      Třída obsahující profil textu záznamu
	*/
	interface GRenProfilTextuZaznamuDto extends GRenBaseDetailDto {
		/**identifikátor*/
		ixs?: string|null;
		/**Typ textu záznamu*/
		typ_txt?: number|null;
		/**Por cislo*/
		por_cislo?: number|null;
		/**Obsah*/
		obsah?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenProfilTextuZaznamuDtoNames { ixs = "ixs", typ_txt = "typ_txt", por_cislo = "por_cislo", obsah = "obsah", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenProfilTextuZaznamuDtoFragments { ixs = "Base", typ_txt = "Base", por_cislo = "Base", obsah = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenProfilTextuZaznamuDtoTypes { ixs = "string", typ_txt = "number", por_cislo = "number", obsah = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenProfilTextuZaznamuDtoTypeLengths { ixs = 12, obsah = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenRizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsriz
	*      Řízení - Tabulka Řízení obsahuje údaje o hlavičce řízení (základní atributy každého říze-ní).
	*/
	interface GRenRizeniDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		id_rizeni?: string|null;
		typ_rizeni?: string|null;
		poradove_cislo?: number|null;
		/**Rok deníku*/
		rok?: JsonDate|null;
		stav?: string|null;
		funkce_kod?: number|null;
		typope_kod?: number|null;
		funkce_kod_vyz?: number|null;
		typope_kod_vyz?: number|null;
		uzisys_username?: string|null;
		uzirol_nazev?: string|null;
		s_osvobozeno?: number|null;
		hodnota_kolku?: number|null;
		datum?: JsonDate|null;
		datum2?: JsonDate|null;
		/**Popis*/
		popis?: string|null;
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		dat_uzavreni?: JsonDate|null;
		kod_prares?: number|null;
	}
	const enum GRenRizeniDtoNames { id_rizeni = "id_rizeni", typ_rizeni = "typ_rizeni", poradove_cislo = "poradove_cislo", rok = "rok", stav = "stav", funkce_kod = "funkce_kod", typope_kod = "typope_kod", funkce_kod_vyz = "funkce_kod_vyz", typope_kod_vyz = "typope_kod_vyz", uzisys_username = "uzisys_username", uzirol_nazev = "uzirol_nazev", s_osvobozeno = "s_osvobozeno", hodnota_kolku = "hodnota_kolku", datum = "datum", datum2 = "datum2", popis = "popis", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_uzavreni = "dat_uzavreni", kod_prares = "kod_prares", Permissions = "Permissions",}
	const enum GRenRizeniDtoFragments { id_rizeni = "Base", typ_rizeni = "Base", poradove_cislo = "Base", rok = "Base", stav = "Base", funkce_kod = "Base", typope_kod = "Base", funkce_kod_vyz = "Base", typope_kod_vyz = "Base", uzisys_username = "Base", uzirol_nazev = "Base", s_osvobozeno = "Base", hodnota_kolku = "Base", datum = "Base", datum2 = "Base", popis = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_uzavreni = "Base", kod_prares = "Base", Permissions = "*",}
	const enum GRenRizeniDtoTypes { id_rizeni = "string", typ_rizeni = "string", poradove_cislo = "number", rok = "JsonDate", stav = "string", funkce_kod = "number", typope_kod = "number", funkce_kod_vyz = "number", typope_kod_vyz = "number", uzisys_username = "string", uzirol_nazev = "string", s_osvobozeno = "number", hodnota_kolku = "number", datum = "JsonDate", datum2 = "JsonDate", popis = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_uzavreni = "JsonDate", kod_prares = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenRizeniDtoTypeLengths { id_rizeni = 30, typ_rizeni = 3, stav = 20, uzisys_username = 30, uzirol_nazev = 30, popis = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenRizeniNemovitostiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsori
	*      nemsori
	*/
	interface GRenRizeniNemovitostiDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		id_objriz?: string|null;
		id_rizeni?: string|null;
		id_parcely?: string|null;
		id_budovy?: string|null;
		id_jednotky?: string|null;
		dat_plomby?: JsonDate|null;
		dat_odstr_pl?: JsonDate|null;
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		datum_hist_od?: JsonDate|null;
		datum_hist_do?: JsonDate|null;
		id_pr_sta?: string|null;
		typ_rizeni_nazev?: string|null;
		typ_pred_rizeni_nazev?: string|null;
		/**Navigační vlastnost*/
		Rizeni?: Gordic.Ren.Interface.GRenRizeniDto|null;
		/**Navigační vlastnost*/
		TypPredmetuRizeni?: Gordic.Ren.Interface.GRenTypPredmetuRizeniDto|null;
	}
	const enum GRenRizeniNemovitostiDtoNames { id_objriz = "id_objriz", id_rizeni = "id_rizeni", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", dat_plomby = "dat_plomby", dat_odstr_pl = "dat_odstr_pl", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", datum_hist_od = "datum_hist_od", datum_hist_do = "datum_hist_do", id_pr_sta = "id_pr_sta", typ_rizeni_nazev = "typ_rizeni_nazev", typ_pred_rizeni_nazev = "typ_pred_rizeni_nazev", Rizeni = "Rizeni", TypPredmetuRizeni = "TypPredmetuRizeni", Permissions = "Permissions",}
	const enum GRenRizeniNemovitostiDtoFragments { id_objriz = "Base", id_rizeni = "Base", id_parcely = "Base", id_budovy = "Base", id_jednotky = "Base", dat_plomby = "Base", dat_odstr_pl = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", datum_hist_od = "Base", datum_hist_do = "Base", id_pr_sta = "Base", typ_rizeni_nazev = "Base", typ_pred_rizeni_nazev = "Base", Rizeni = "Rizeni", TypPredmetuRizeni = "TypPredmetuRizeni", Permissions = "*",}
	const enum GRenRizeniNemovitostiDtoTypes { id_objriz = "string", id_rizeni = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", dat_plomby = "JsonDate", dat_odstr_pl = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", datum_hist_od = "JsonDate", datum_hist_do = "JsonDate", id_pr_sta = "string", typ_rizeni_nazev = "string", typ_pred_rizeni_nazev = "string", Rizeni = "Gordic.Ren.Interface.GRenRizeniDto", TypPredmetuRizeni = "Gordic.Ren.Interface.GRenTypPredmetuRizeniDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenRizeniNemovitostiDtoTypeLengths { id_objriz = 30, id_rizeni = 30, id_parcely = 30, id_budovy = 30, id_jednotky = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_pr_sta = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenRozsirenyMajetkovyProfilDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:majsprn
	*      Rozšířený profil majetku - pozemky - vazba na registr nemovitostí REN02
	*/
	interface GRenRozsirenyMajetkovyProfilDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		ser_cislo?: number|null;
		/**Typu subjektu*/
		typ_obj?: number|null;
		id_parcely?: string|null;
		id_budovy?: string|null;
		typ_budovy?: number|null;
		cislo_domovni?: number|null;
		id_jednotky?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		c_m2?: JsonDecimal|null;
		/**Uživatel*/
		ixs_esu_uziv?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		sml_esu?: string|null;
		kmen_cislo_par?: number|null;
		podd_cisla_par?: number|null;
		dil_parcely?: number|null;
		vymera_par?: number|null;
		typ_parcely?: string|null;
		maj_podil?: JsonDecimal|null;
		podil_citatel?: number|null;
		podil_jmenovatel?: number|null;
		s_zastavni_pravo?: number|null;
		s_vecne_bremeno?: number|null;
		druh_poz?: number|null;
		inv_cis?: string|null;
		/**IČO*/
		ico?: string|null;
		s_zastavni_pravo_txt?: string|null;
		s_vecne_bremeno_txt?: string|null;
		podil?: string|null;
		maj_mat_akt?: number|null;
		/**Navigační vlastnost pro MajetkovyProfil*/
		MajetkovyProfil?: Gordic.Ren.Interface.GRenMajetkovyProfilDto|null;
	}
	const enum GRenRozsirenyMajetkovyProfilDtoNames { ser_cislo = "ser_cislo", typ_obj = "typ_obj", id_parcely = "id_parcely", id_budovy = "id_budovy", typ_budovy = "typ_budovy", cislo_domovni = "cislo_domovni", id_jednotky = "id_jednotky", dat_od = "dat_od", dat_do = "dat_do", c_m2 = "c_m2", ixs_esu_uziv = "ixs_esu_uziv", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sml_esu = "sml_esu", kmen_cislo_par = "kmen_cislo_par", podd_cisla_par = "podd_cisla_par", dil_parcely = "dil_parcely", vymera_par = "vymera_par", typ_parcely = "typ_parcely", maj_podil = "maj_podil", podil_citatel = "podil_citatel", podil_jmenovatel = "podil_jmenovatel", s_zastavni_pravo = "s_zastavni_pravo", s_vecne_bremeno = "s_vecne_bremeno", druh_poz = "druh_poz", inv_cis = "inv_cis", ico = "ico", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", podil = "podil", maj_mat_akt = "maj_mat_akt", MajetkovyProfil = "MajetkovyProfil", Permissions = "Permissions",}
	const enum GRenRozsirenyMajetkovyProfilDtoFragments { ser_cislo = "Base", typ_obj = "Base", id_parcely = "Base", id_budovy = "Base", typ_budovy = "Base", cislo_domovni = "Base", id_jednotky = "Base", dat_od = "Base", dat_do = "Base", c_m2 = "Base", ixs_esu_uziv = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", sml_esu = "Base", kmen_cislo_par = "Base", podd_cisla_par = "Base", dil_parcely = "Base", vymera_par = "Base", typ_parcely = "Base", maj_podil = "Base", podil_citatel = "Base", podil_jmenovatel = "Base", s_zastavni_pravo = "Base", s_vecne_bremeno = "Base", druh_poz = "Base", inv_cis = "Base", ico = "Base", s_zastavni_pravo_txt = "Extended", s_vecne_bremeno_txt = "Extended", podil = "Extended", maj_mat_akt = "Extended", MajetkovyProfil = "MajetkovyProfil", Permissions = "*",}
	const enum GRenRozsirenyMajetkovyProfilDtoTypes { ser_cislo = "number", typ_obj = "number", id_parcely = "string", id_budovy = "string", typ_budovy = "number", cislo_domovni = "number", id_jednotky = "string", dat_od = "JsonDate", dat_do = "JsonDate", c_m2 = "JsonDecimal", ixs_esu_uziv = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", sml_esu = "string", kmen_cislo_par = "number", podd_cisla_par = "number", dil_parcely = "number", vymera_par = "number", typ_parcely = "string", maj_podil = "JsonDecimal", podil_citatel = "number", podil_jmenovatel = "number", s_zastavni_pravo = "number", s_vecne_bremeno = "number", druh_poz = "number", inv_cis = "string", ico = "string", s_zastavni_pravo_txt = "string", s_vecne_bremeno_txt = "string", podil = "string", maj_mat_akt = "number", MajetkovyProfil = "Gordic.Ren.Interface.GRenMajetkovyProfilDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenRozsirenyMajetkovyProfilDtoTypeLengths { id_parcely = 30, id_budovy = 30, id_jednotky = 30, ixs_esu_uziv = 12, zmenu_prov = 12, sml_esu = 50, typ_parcely = 10, inv_cis = 50, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTelesoDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstel*/
	interface GRenTelesoDto extends GRenBaseDetailDto {
		/**Unikátní generované číslo tělesa*/
		id_telesa?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Kód katastrálního území*/
		kod_kat_uzemi?: number|null;
		/**Číslo listu vlastnictví*/
		cislo_tel?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemstel.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemstel.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemstel.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemstel.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GRenTelesoDtoNames { id_telesa = "id_telesa", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", kod_kat_uzemi = "kod_kat_uzemi", cislo_tel = "cislo_tel", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenTelesoDtoFragments { id_telesa = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", kod_kat_uzemi = "Base", cislo_tel = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenTelesoDtoTypes { id_telesa = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", kod_kat_uzemi = "number", cislo_tel = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenTelesoDtoTypeLengths { id_telesa = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTempNemovitostDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemtobj*/
	interface GRenTempNemovitostDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Unikátní generované číslo*/
		log_por_cislo?: number|null;
		/**Unikátní generované číslo*/
		por_cislo?: number|null;
		/**Typ objektu: typ nemovitosti*/
		typ_objektu?: number|null;
		/**ID parcely*/
		id_parcely?: string|null;
		/**ID budovy*/
		id_budovy?: string|null;
		/**Číslo domovní pro budovu*/
		cislo_domovni?: number|null;
		/**ID jednotky*/
		id_jednotky?: string|null;
		/**Cena*/
		c_cena?: JsonDecimal|null;
		/**Výměra*/
		vymera?: JsonDecimal|null;
		/**IKC*/
		ikc?: JsonDecimal|null;
		kod_kat_uzemi?: number|null;
		nazev_kat_uzemi?: string|null;
		cislo_tel?: number|null;
		typ_objektu_nazev?: string|null;
		popis?: string|null;
		typ_budovy?: number|null;
		nemspar_id_telesa?: string|null;
		nemsbud_id_telesa?: string|null;
		nemsjed_id_telesa?: string|null;
		typ_budovy_nazev?: string|null;
		nemsjed_zp_vyuz_jed?: string|null;
		nemspar_podd_cisla_par?: number|null;
		nemspar_kmen_cislo_par?: number|null;
		nemsjed_cislo_jednotky?: number|null;
		nemsjed_typ_budovy_nazev?: string|null;
	}
	const enum GRenTempNemovitostDtoNames { log_por_cislo = "log_por_cislo", por_cislo = "por_cislo", typ_objektu = "typ_objektu", id_parcely = "id_parcely", id_budovy = "id_budovy", cislo_domovni = "cislo_domovni", id_jednotky = "id_jednotky", c_cena = "c_cena", vymera = "vymera", ikc = "ikc", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", cislo_tel = "cislo_tel", typ_objektu_nazev = "typ_objektu_nazev", popis = "popis", typ_budovy = "typ_budovy", nemspar_id_telesa = "nemspar_id_telesa", nemsbud_id_telesa = "nemsbud_id_telesa", nemsjed_id_telesa = "nemsjed_id_telesa", typ_budovy_nazev = "typ_budovy_nazev", nemsjed_zp_vyuz_jed = "nemsjed_zp_vyuz_jed", nemspar_podd_cisla_par = "nemspar_podd_cisla_par", nemspar_kmen_cislo_par = "nemspar_kmen_cislo_par", nemsjed_cislo_jednotky = "nemsjed_cislo_jednotky", nemsjed_typ_budovy_nazev = "nemsjed_typ_budovy_nazev", Permissions = "Permissions",}
	const enum GRenTempNemovitostDtoFragments { log_por_cislo = "Base", por_cislo = "Base", typ_objektu = "Base", id_parcely = "Base", id_budovy = "Base", cislo_domovni = "Base", id_jednotky = "Base", c_cena = "Base", vymera = "Base", ikc = "Base", kod_kat_uzemi = "*", nazev_kat_uzemi = "*", cislo_tel = "*", typ_objektu_nazev = "*", popis = "*", typ_budovy = "*", nemspar_id_telesa = "*", nemsbud_id_telesa = "*", nemsjed_id_telesa = "*", typ_budovy_nazev = "*", nemsjed_zp_vyuz_jed = "*", nemspar_podd_cisla_par = "*", nemspar_kmen_cislo_par = "*", nemsjed_cislo_jednotky = "*", nemsjed_typ_budovy_nazev = "*", Permissions = "*",}
	const enum GRenTempNemovitostDtoTypes { log_por_cislo = "number", por_cislo = "number", typ_objektu = "number", id_parcely = "string", id_budovy = "string", cislo_domovni = "number", id_jednotky = "string", c_cena = "JsonDecimal", vymera = "JsonDecimal", ikc = "JsonDecimal", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", cislo_tel = "number", typ_objektu_nazev = "string", popis = "string", typ_budovy = "number", nemspar_id_telesa = "string", nemsbud_id_telesa = "string", nemsjed_id_telesa = "string", typ_budovy_nazev = "string", nemsjed_zp_vyuz_jed = "string", nemspar_podd_cisla_par = "number", nemspar_kmen_cislo_par = "number", nemsjed_cislo_jednotky = "number", nemsjed_typ_budovy_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenTempNemovitostDtoTypeLengths { log_por_cislo = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypBudovyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstbu
	*      Číselník typu budov
	*/
	interface GRenTypBudovyDto extends GRenBaseDetailDto {
		/**Kód typu budovy*/
		typ_budovy?: number|null;
		/**Název typu budovy*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Určení povinnosti zadání čísla domovního*/
		s_zadani_cd?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypBudovyDtoNames { typ_budovy = "typ_budovy", nazev = "nazev", zkratka = "zkratka", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", s_zadani_cd = "s_zadani_cd", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenTypBudovyDtoFragments { typ_budovy = "Base", nazev = "Base", zkratka = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", s_zadani_cd = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenTypBudovyDtoTypes { typ_budovy = "number", nazev = "string", zkratka = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", s_zadani_cd = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenTypBudovyDtoTypeLengths { nazev = 60, zkratka = 9, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypJednotkyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstje
	*      Typ jednotky
	*/
	interface GRenTypJednotkyDto extends GRenBaseDetailDto {
		/**Kód typu jednotky*/
		typ_jednotky?: number|null;
		/**Název typu jednotky*/
		nazev?: string|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Zkratka typu jednotky*/
		zkratka?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypJednotkyDtoNames { typ_jednotky = "typ_jednotky", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", zkratka = "zkratka", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenTypJednotkyDtoFragments { typ_jednotky = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", zkratka = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenTypJednotkyDtoTypes { typ_jednotky = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", zkratka = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenTypJednotkyDtoTypeLengths { nazev = 60, zkratka = 7, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypListinyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstli
	*      Typ listiny - číselník typu listin pro zařazení listin do kategorií dle použití, významu a právních úkonů spojených s listinami
	*/
	interface GRenTypListinyDto extends GRenBaseDetailDto {
		/**Kód typu listiny*/
		typ_listiny?: number|null;
		/**Název typu listiny*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Popis typu listiny*/
		popis?: string|null;
		/**Druh listiny*/
		druh_listiny?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypListinyDtoNames { typ_listiny = "typ_listiny", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", popis = "popis", druh_listiny = "druh_listiny", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenTypListinyDtoFragments { typ_listiny = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", popis = "Base", druh_listiny = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenTypListinyDtoTypes { typ_listiny = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", popis = "string", druh_listiny = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenTypListinyDtoTypeLengths { nazev = 60, popis = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypParcelyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstpa
	*      Číselník typů parcel
	*/
	interface GRenTypParcelyDto extends GRenBaseDetailDto {
		/**Typ parcely*/
		typ_parcely?: string|null;
		/**Popis typu parcely*/
		popis?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypParcelyDtoNames { typ_parcely = "typ_parcely", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenTypParcelyDtoFragments { typ_parcely = "Base", popis = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenTypParcelyDtoTypes { typ_parcely = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenTypParcelyDtoTypeLengths { typ_parcely = 10, popis = 254, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypParcelyZeDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstpz
	*      Číselník typů parcely ve zjednodušené evidenci
	*/
	interface GRenTypParcelyZeDto extends GRenBaseDetailDto {
		/**Kód typu parcely ve zjednodušené evidenci*/
		typ_par_ze?: number|null;
		/**Popis typu parcely ve zjednodušené evidenci*/
		popis?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypParcelyZeDtoNames { typ_par_ze = "typ_par_ze", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenTypParcelyZeDtoFragments { typ_par_ze = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRenTypParcelyZeDtoTypes { typ_par_ze = "number", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenTypParcelyZeDtoTypeLengths { popis = 254, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypPravnihoVztahuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstpv
	*      Centrálně spravovaný číselník typů právního vztahu
	*/
	interface GRenTypPravnihoVztahuDto extends GRenBaseDetailDto {
		/**Kód typu právního vztahu*/
		typ_pr_vztahu?: string|null;
		/**Kód typu předmětu řízení*/
		typ_pred_rizeni?: number|null;
		/**Název typu právního vztahu*/
		nazev?: string|null;
		/**Příznak, zda jde o právní vztah typu vlastnictví*/
		s_vlastnictvi?: number|null;
		/**Příznak ku prospěchu pro oprávněný subjerkt
		*      Příznak, zda právní vztah je určen ku prospěchu oprávněný subjektu
		*/
		s_pro_os?: number|null;
		s_k_os?: number|null;
		/**Příznak, zda právní vztah je ku prospěchu nemovitosti*/
		s_pro_nemovit?: number|null;
		/**Příznak, zda právní vztah je k tíži nemovitosti*/
		s_k_nemovit?: number|null;
		/**Sekce určující umístění instance na výpisu*/
		sekce?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Vlastnický vztah*/
		vlastn_vztah?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Možnost zapsat podíl věřitele*/
		s_podil_ver?: number|null;
		/**Příznak evidence pořadí na LV*/
		s_poradi?: number|null;
	}
	const enum GRenTypPravnihoVztahuDtoNames { typ_pr_vztahu = "typ_pr_vztahu", typ_pred_rizeni = "typ_pred_rizeni", nazev = "nazev", s_vlastnictvi = "s_vlastnictvi", s_pro_os = "s_pro_os", s_k_os = "s_k_os", s_pro_nemovit = "s_pro_nemovit", s_k_nemovit = "s_k_nemovit", sekce = "sekce", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", vlastn_vztah = "vlastn_vztah", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_podil_ver = "s_podil_ver", s_poradi = "s_poradi",}
	const enum GRenTypPravnihoVztahuDtoFragments { typ_pr_vztahu = "Base", typ_pred_rizeni = "Base", nazev = "Base", s_vlastnictvi = "Base", s_pro_os = "Base", s_k_os = "Base", s_pro_nemovit = "Base", s_k_nemovit = "Base", sekce = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", vlastn_vztah = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_podil_ver = "Base", s_poradi = "Base",}
	const enum GRenTypPravnihoVztahuDtoTypes { typ_pr_vztahu = "string", typ_pred_rizeni = "number", nazev = "string", s_vlastnictvi = "number", s_pro_os = "number", s_k_os = "number", s_pro_nemovit = "number", s_k_nemovit = "number", sekce = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", vlastn_vztah = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_podil_ver = "number", s_poradi = "number",}
	const enum GRenTypPravnihoVztahuDtoTypeLengths { typ_pr_vztahu = 4, nazev = 60, sekce = 1, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypPredmetuRizeniDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstpr
	*      Centrálně spravovaný číselník Typ předmětu řízení
	*/
	interface GRenTypPredmetuRizeniDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Kód typu předmětu řízení*/
		typ_pred_rizeni?: number|null;
		/**Název typu předmětu řízení*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Popis typu předmětu řízení*/
		popis?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypPredmetuRizeniDtoNames { typ_pred_rizeni = "typ_pred_rizeni", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", popis = "popis", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenTypPredmetuRizeniDtoFragments { typ_pred_rizeni = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", popis = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenTypPredmetuRizeniDtoTypes { typ_pred_rizeni = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", popis = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenTypPredmetuRizeniDtoTypeLengths { nazev = 60, popis = 254, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenTypZaznamuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemstza
	*      Typ záznamu k nemovitosti
	*/
	interface GRenTypZaznamuDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor typu záznamu*/
		ixs_tza?: string|null;
		/**Název typu záznamu*/
		nazev_tza?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenTypZaznamuDtoNames { ixs_tza = "ixs_tza", nazev_tza = "nazev_tza", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenTypZaznamuDtoFragments { ixs_tza = "Base", nazev_tza = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenTypZaznamuDtoTypes { ixs_tza = "string", nazev_tza = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenTypZaznamuDtoTypeLengths { ixs_tza = 12, nazev_tza = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenUcastikRizeniAdresaDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemvauc
	*      nemvauc
	*/
	interface GRenUcastikRizeniAdresaDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		id_ucastnika?: string|null;
		typ_adresy?: number|null;
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		cast_obce?: string|null;
		cislo_domovni?: number|null;
		nazev_ulice?: string|null;
		cislo_orient?: string|null;
		/**PSČ*/
		psc?: number|null;
		/**Stát*/
		stat?: string|null;
		telefon?: string|null;
		/**Fax*/
		fax?: string|null;
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		mestska_cast?: string|null;
		cp_ce?: number|null;
		kod_adrm?: number|null;
		typ_adresy_nazev?: string|null;
		cp_ce_nazev?: string|null;
		adresa_ucastnika?: string|null;
	}
	const enum GRenUcastikRizeniAdresaDtoNames { id_ucastnika = "id_ucastnika", typ_adresy = "typ_adresy", okres = "okres", obec = "obec", cast_obce = "cast_obce", cislo_domovni = "cislo_domovni", nazev_ulice = "nazev_ulice", cislo_orient = "cislo_orient", psc = "psc", stat = "stat", telefon = "telefon", fax = "fax", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mestska_cast = "mestska_cast", cp_ce = "cp_ce", kod_adrm = "kod_adrm", typ_adresy_nazev = "typ_adresy_nazev", cp_ce_nazev = "cp_ce_nazev", adresa_ucastnika = "adresa_ucastnika", Permissions = "Permissions",}
	const enum GRenUcastikRizeniAdresaDtoFragments { id_ucastnika = "Base", typ_adresy = "Base", okres = "Base", obec = "Base", cast_obce = "Base", cislo_domovni = "Base", nazev_ulice = "Base", cislo_orient = "Base", psc = "Base", stat = "Base", telefon = "Base", fax = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", mestska_cast = "Base", cp_ce = "Base", kod_adrm = "Base", typ_adresy_nazev = "Base", cp_ce_nazev = "Base", adresa_ucastnika = "*", Permissions = "*",}
	const enum GRenUcastikRizeniAdresaDtoTypes { id_ucastnika = "string", typ_adresy = "number", okres = "string", obec = "string", cast_obce = "string", cislo_domovni = "number", nazev_ulice = "string", cislo_orient = "string", psc = "number", stat = "string", telefon = "string", fax = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mestska_cast = "string", cp_ce = "number", kod_adrm = "number", typ_adresy_nazev = "string", cp_ce_nazev = "string", adresa_ucastnika = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenUcastikRizeniAdresaDtoTypeLengths { id_ucastnika = 30, okres = 48, obec = 48, cast_obce = 48, nazev_ulice = 48, cislo_orient = 4, stat = 100, telefon = 35, fax = 33, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, mestska_cast = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenUcastikRizeniNemovitostiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsuca
	*      nemsuca
	*/
	interface GRenUcastikRizeniNemovitostiDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		id_ucastnika?: string|null;
		id_rizeni?: string|null;
		druh_ucastnika?: number|null;
		/**Jméno*/
		jmeno?: string|null;
		jmeno_u?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		prijmeni_u?: string|null;
		rodne_prijmeni?: string|null;
		titul_pred?: string|null;
		titul_za?: string|null;
		rodne_cislo?: string|null;
		rod_stav?: number|null;
		obch_jmeno?: string|null;
		obch_jmeno_u?: string|null;
		dic?: string|null;
		ico_num?: number|null;
		doplnek_ico?: number|null;
		s_over_podpis?: number|null;
		over_ucast_rs?: number|null;
		over_ucast_os?: number|null;
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		typ_ucastnika_nazev?: string|null;
		typ_adresy_nazev?: string|null;
		druh_ucastnika_nazev?: string|null;
		rod_stav_nazev?: string|null;
		nazev_ucastnika?: string|null;
		adresa_ucastnika?: string|null;
		/**Navigační vlastnost pro UcastikRizeniAdresa*/
		UcastikRizeniAdresa?: Gordic.Ren.Interface.GRenUcastikRizeniAdresaDto|null;
	}
	const enum GRenUcastikRizeniNemovitostiDtoNames { id_ucastnika = "id_ucastnika", id_rizeni = "id_rizeni", druh_ucastnika = "druh_ucastnika", jmeno = "jmeno", jmeno_u = "jmeno_u", prijmeni = "prijmeni", prijmeni_u = "prijmeni_u", rodne_prijmeni = "rodne_prijmeni", titul_pred = "titul_pred", titul_za = "titul_za", rodne_cislo = "rodne_cislo", rod_stav = "rod_stav", obch_jmeno = "obch_jmeno", obch_jmeno_u = "obch_jmeno_u", dic = "dic", ico_num = "ico_num", doplnek_ico = "doplnek_ico", s_over_podpis = "s_over_podpis", over_ucast_rs = "over_ucast_rs", over_ucast_os = "over_ucast_os", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ucastnika_nazev = "typ_ucastnika_nazev", typ_adresy_nazev = "typ_adresy_nazev", druh_ucastnika_nazev = "druh_ucastnika_nazev", rod_stav_nazev = "rod_stav_nazev", nazev_ucastnika = "nazev_ucastnika", adresa_ucastnika = "adresa_ucastnika", UcastikRizeniAdresa = "UcastikRizeniAdresa", Permissions = "Permissions",}
	const enum GRenUcastikRizeniNemovitostiDtoFragments { id_ucastnika = "Base", id_rizeni = "Base", druh_ucastnika = "Base", jmeno = "Base", jmeno_u = "Base", prijmeni = "Base", prijmeni_u = "Base", rodne_prijmeni = "Base", titul_pred = "Base", titul_za = "Base", rodne_cislo = "Base", rod_stav = "Base", obch_jmeno = "Base", obch_jmeno_u = "Base", dic = "Base", ico_num = "Base", doplnek_ico = "Base", s_over_podpis = "Base", over_ucast_rs = "Base", over_ucast_os = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_ucastnika_nazev = "Base", typ_adresy_nazev = "Base", druh_ucastnika_nazev = "Base", rod_stav_nazev = "Base", nazev_ucastnika = "*", adresa_ucastnika = "*", UcastikRizeniAdresa = "UcastikRizeniAdresa", Permissions = "*",}
	const enum GRenUcastikRizeniNemovitostiDtoTypes { id_ucastnika = "string", id_rizeni = "string", druh_ucastnika = "number", jmeno = "string", jmeno_u = "string", prijmeni = "string", prijmeni_u = "string", rodne_prijmeni = "string", titul_pred = "string", titul_za = "string", rodne_cislo = "string", rod_stav = "number", obch_jmeno = "string", obch_jmeno_u = "string", dic = "string", ico_num = "number", doplnek_ico = "number", s_over_podpis = "number", over_ucast_rs = "number", over_ucast_os = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ucastnika_nazev = "string", typ_adresy_nazev = "string", druh_ucastnika_nazev = "string", rod_stav_nazev = "string", nazev_ucastnika = "string", adresa_ucastnika = "string", UcastikRizeniAdresa = "Gordic.Ren.Interface.GRenUcastikRizeniAdresaDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenUcastikRizeniNemovitostiDtoTypeLengths { id_ucastnika = 30, id_rizeni = 30, jmeno = 100, jmeno_u = 100, prijmeni = 100, prijmeni_u = 100, rodne_prijmeni = 100, titul_pred = 35, titul_za = 35, rodne_cislo = 10, obch_jmeno = 254, obch_jmeno_u = 254, dic = 16, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenVazbaNemLisRizDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsrli*/
	interface GRenVazbaNemLisRizDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor vazby mezi nemovitostmi, nabývacími tituly a řízeními*/
		id_r_list?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Identifikátor listiny*/
		id_listiny?: string|null;
		/**Odkaz na unikátní generované číslo [parcely].*/
		id_parcely?: string|null;
		/**Identifikátor budovy*/
		id_budovy?: string|null;
		/**Identifikátor jednotky*/
		id_jednotky?: string|null;
		/**Identifikátor oprávněného subjektu*/
		id_opr_subj?: string|null;
		/**Identifikátor jiného prívního vztahu*/
		id_ji_pr_vztahu?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Časový údaj původního vzniku entity v systému*/
		dat_vzniku2?: JsonDate|null;
		/**Odkaz na unikátní generované číslo původního řízení vzniku*/
		id_rizeni_vzn2?: string|null;
		/**Odkaz na unikátní generované číslo práva stavby*/
		id_pr_sta?: string|null;
		/**Identifikátor oprávněného subjektu - pseudonymizovaný*/
		id_opr_subj_p?: string|null;
	}
	const enum GRenVazbaNemLisRizDtoNames { id_r_list = "id_r_list", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_listiny = "id_listiny", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", id_opr_subj = "id_opr_subj", id_ji_pr_vztahu = "id_ji_pr_vztahu", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", id_pr_sta = "id_pr_sta", id_opr_subj_p = "id_opr_subj_p", Permissions = "Permissions",}
	const enum GRenVazbaNemLisRizDtoFragments { id_r_list = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_listiny = "Base", id_parcely = "Base", id_budovy = "Base", id_jednotky = "Base", id_opr_subj = "Base", id_ji_pr_vztahu = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_vzniku2 = "Base", id_rizeni_vzn2 = "Base", id_pr_sta = "Base", id_opr_subj_p = "Base", Permissions = "*",}
	const enum GRenVazbaNemLisRizDtoTypes { id_r_list = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_listiny = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", id_opr_subj = "string", id_ji_pr_vztahu = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", id_pr_sta = "string", id_opr_subj_p = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenVazbaNemLisRizDtoTypeLengths { id_r_list = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_listiny = 30, id_parcely = 30, id_budovy = 30, id_jednotky = 30, id_opr_subj = 30, id_ji_pr_vztahu = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_rizeni_vzn2 = 30, id_pr_sta = 30, id_opr_subj_p = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenVlastnictviDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsvla*/
	interface GRenVlastnictviDto extends GRenBaseDetailDto {
		/**Identifikátor vlastnictví*/
		id_vlastnictvi?: string|null;
		/**Stav aktuálnosti dat ISKN*/
		stav_dat?: number|null;
		/**Časový údaj prvního výskytu entity*/
		dat_vzniku?: JsonDate|null;
		/**Časový údaj konce platnosti výskytu entity v systému*/
		dat_zaniku?: JsonDate|null;
		/**Příznak kontextu*/
		id_pr_kontx?: number|null;
		/**Odkaz na unikátní generované číslo řízení vzniku*/
		id_rizeni_vzn?: string|null;
		/**Odkaz na unikátní generované číslo řízení zániku*/
		id_rizeni_zan?: string|null;
		/**Identifikátor oprávněného subjektu*/
		id_opr_subj?: string|null;
		/**Typ právního vztahu*/
		typ_pr_vztahu?: string|null;
		/**Odkaz na unikátní generované číslo tělesa*/
		id_telesa?: string|null;
		/**Čitatel podílu vlastnictví spoluvlastníka*/
		podil_citatel?: number|null;
		/**Jmenovatel podílu vlastnictví spoluvlastníka*/
		podil_jmenov?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**DBCOLUMN:nemsvla.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:nemsvla.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:nemsvla.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:nemsvla.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Časový údaj původního vzniku entity v systému*/
		dat_vzniku2?: JsonDate|null;
		/**Odkaz na unikátní generované číslo původního řízení vzniku*/
		id_rizeni_vzn2?: string|null;
		/**Odkaz na unikátní generované číslo parcely*/
		id_parcely?: string|null;
		/**Odkaz na unikátní generované číslo budovy*/
		id_budovy?: string|null;
		/**Odkaz na unikátní generované číslo jednotky*/
		id_jednotky?: string|null;
		/**Odkaz na unikátní generované číslo práva stavby*/
		id_pr_sta?: string|null;
		/**Identifikátor oprávněného subjektu pseudonymizovaný*/
		id_opr_subj_p?: string|null;
		podil_txt?: string|null;
		sjm_partner_1?: string|null;
		sjm_partner_2?: string|null;
		podil?: string|null;
		/**Navigační vlastnost pro OpravnenySubjekt pres id_opr_subj v nemsosu (od-> nemsvla od-> nemstel)*/
		OpravnenySubjekt?: Gordic.Ren.Interface.GRenOpravnenySubjektDto|null;
		/**Navigační vlastnost pro OpravnenySubjekt -> BSM pro SJM1*/
		OpravnenySubjektSjm1?: Gordic.Ren.Interface.GRenOpravnenySubjektDto|null;
		/**Navigační vlastnost pro OpravnenySubjekt -> BSM pro SJM2*/
		OpravnenySubjektSjm2?: Gordic.Ren.Interface.GRenOpravnenySubjektDto|null;
		/**Navigační vlastnost pro CharakteristikaOs pres id_opr_subj*/
		CharakteristikaOs?: Gordic.Ren.Interface.GRenCharakteristikaOsDto|null;
		/**Navigační vlastnost pro TypPravnihoVztahu*/
		TypPravnihoVztahu?: Gordic.Ren.Interface.GRenTypPravnihoVztahuDto|null;
		/**Navigační vlastnost pro Těleso (id_telesa)*/
		Teleso?: Gordic.Ren.Interface.GRenTelesoDto|null;
	}
	const enum GRenVlastnictviDtoNames { id_vlastnictvi = "id_vlastnictvi", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_opr_subj = "id_opr_subj", typ_pr_vztahu = "typ_pr_vztahu", id_telesa = "id_telesa", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", id_parcely = "id_parcely", id_budovy = "id_budovy", id_jednotky = "id_jednotky", id_pr_sta = "id_pr_sta", id_opr_subj_p = "id_opr_subj_p", podil_txt = "podil_txt", sjm_partner_1 = "sjm_partner_1", sjm_partner_2 = "sjm_partner_2", podil = "podil", OpravnenySubjekt = "OpravnenySubjekt", OpravnenySubjektSjm1 = "OpravnenySubjektSjm1", OpravnenySubjektSjm2 = "OpravnenySubjektSjm2", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", Teleso = "Teleso",}
	const enum GRenVlastnictviDtoFragments { id_vlastnictvi = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_opr_subj = "Base", typ_pr_vztahu = "Base", id_telesa = "Base", podil_citatel = "Base", podil_jmenov = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_vzniku2 = "Base", id_rizeni_vzn2 = "Base", id_parcely = "Base", id_budovy = "Base", id_jednotky = "Base", id_pr_sta = "Base", id_opr_subj_p = "Base", podil_txt = "*", sjm_partner_1 = "*", sjm_partner_2 = "*", podil = "*", OpravnenySubjekt = "OpravnenySubjekt", OpravnenySubjektSjm1 = "OpravnenySubjektSjm1", OpravnenySubjektSjm2 = "OpravnenySubjektSjm2", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", Teleso = "Teleso",}
	const enum GRenVlastnictviDtoTypes { id_vlastnictvi = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_opr_subj = "string", typ_pr_vztahu = "string", id_telesa = "string", podil_citatel = "number", podil_jmenov = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", id_parcely = "string", id_budovy = "string", id_jednotky = "string", id_pr_sta = "string", id_opr_subj_p = "string", podil_txt = "string", sjm_partner_1 = "string", sjm_partner_2 = "string", podil = "string", OpravnenySubjekt = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", OpravnenySubjektSjm1 = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", OpravnenySubjektSjm2 = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", CharakteristikaOs = "Gordic.Ren.Interface.GRenCharakteristikaOsDto", TypPravnihoVztahu = "Gordic.Ren.Interface.GRenTypPravnihoVztahuDto", Teleso = "Gordic.Ren.Interface.GRenTelesoDto",}
	const enum GRenVlastnictviDtoTypeLengths { id_vlastnictvi = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_opr_subj = 30, typ_pr_vztahu = 4, id_telesa = 30, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, id_rizeni_vzn2 = 30, id_parcely = 30, id_budovy = 30, id_jednotky = 30, id_pr_sta = 30, id_opr_subj_p = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZaznamKNemovitostiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszaz
	*      Záznam k nemovitosti
	*/
	interface GRenZaznamKNemovitostiDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Identifikátor záznamu*/
		ixs_zaz?: string|null;
		/**Identifikátor typu záznamu*/
		ixs_tza?: string|null;
		/**Datum záznamu*/
		dat_zaz?: JsonDate|null;
		/**Text záznamu*/
		text_zaz?: string|null;
		/**Příznak přílohy
		*      Příznak, zda k záznamu existuje elektronický dokument (příloha záznamu)
		*/
		s_pri?: number|null;
		/**Popis přílohy*/
		popis_pri?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Navigační vlastnost pro Typ Zaznamu (ixs_tza)*/
		TypZaznamu?: Gordic.Ren.Interface.GRenTypZaznamuDto|null;
		obsah_zaz?: string|null;
		id_nemovitosti?: string|null;
		typ_objektu?: number|null;
	}
	const enum GRenZaznamKNemovitostiDtoNames { ixs_zaz = "ixs_zaz", ixs_tza = "ixs_tza", dat_zaz = "dat_zaz", text_zaz = "text_zaz", s_pri = "s_pri", popis_pri = "popis_pri", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", TypZaznamu = "TypZaznamu", obsah_zaz = "obsah_zaz", id_nemovitosti = "id_nemovitosti", typ_objektu = "typ_objektu", Permissions = "Permissions",}
	const enum GRenZaznamKNemovitostiDtoFragments { ixs_zaz = "Base", ixs_tza = "Base", dat_zaz = "Base", text_zaz = "Base", s_pri = "Base", popis_pri = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", TypZaznamu = "TypZaznamu", obsah_zaz = "*", id_nemovitosti = "*", typ_objektu = "*", Permissions = "*",}
	const enum GRenZaznamKNemovitostiDtoTypes { ixs_zaz = "string", ixs_tza = "string", dat_zaz = "JsonDate", text_zaz = "string", s_pri = "number", popis_pri = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", TypZaznamu = "Gordic.Ren.Interface.GRenTypZaznamuDto", obsah_zaz = "string", id_nemovitosti = "string", typ_objektu = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenZaznamKNemovitostiDtoTypeLengths { ixs_zaz = 12, ixs_tza = 12, popis_pri = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZdrojParcelZeDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszpz
	*      Zdroj parcel ve zjednodušené evidenci
	*/
	interface GRenZdrojParcelZeDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Kód zdroje parcely ve zjednodušené evidenci*/
		zdroj_par_ze?: number|null;
		/**Název zdroje parcely ve zjednodušené evidenci*/
		nazev?: string|null;
		/**Zkratka zdroje parcely ve zjednodušené evidenci*/
		zkratka?: string|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenZdrojParcelZeDtoNames { zdroj_par_ze = "zdroj_par_ze", nazev = "nazev", zkratka = "zkratka", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenZdrojParcelZeDtoFragments { zdroj_par_ze = "Base", nazev = "Base", zkratka = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenZdrojParcelZeDtoTypes { zdroj_par_ze = "number", nazev = "string", zkratka = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenZdrojParcelZeDtoTypeLengths { nazev = 60, zkratka = 2, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZpusobOceneniNemovitostiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemczoc
	*      Číselník způsobů ocenění nemovitosti
	*/
	interface GRenZpusobOceneniNemovitostiDto extends GRenBaseDetailDto {
		/**Kód způsobu ocenění nemovitosti*/
		zp_oc?: number|null;
		/**Text způsobu ocenění nemovitosti*/
		zp_oc_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GRenZpusobOceneniNemovitostiDtoNames { zp_oc = "zp_oc", zp_oc_txt = "zp_oc_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRenZpusobOceneniNemovitostiDtoFragments { zp_oc = "*", zp_oc_txt = "*", k_v = "*", k_s = "*",}
	const enum GRenZpusobOceneniNemovitostiDtoTypes { zp_oc = "number", zp_oc_txt = "string", k_v = "number", k_s = "string",}
	const enum GRenZpusobOceneniNemovitostiDtoTypeLengths { zp_oc_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZpusobOchranyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemsoch
	*      Způsob ochrany nemovitosti
	*/
	interface GRenZpusobOchranyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Kód způsobu ochrany nemovitosti*/
		zp_ochrany?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Povolení použít způsob ochrany u pozemku*/
		s_pozemek?: number|null;
		/**Povolení použít způsob ochrany u budovy*/
		s_budova?: number|null;
		/**Povolení použít způsob ochrany u jednotky*/
		s_jednotka?: number|null;
		/**Ochrana nemovitosti*/
		nemochr?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenZpusobOchranyDtoNames { zp_ochrany = "zp_ochrany", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", s_pozemek = "s_pozemek", s_budova = "s_budova", s_jednotka = "s_jednotka", nemochr = "nemochr", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenZpusobOchranyDtoFragments { zp_ochrany = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", s_pozemek = "Base", s_budova = "Base", s_jednotka = "Base", nemochr = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenZpusobOchranyDtoTypes { zp_ochrany = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", s_pozemek = "number", s_budova = "number", s_jednotka = "number", nemochr = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenZpusobOchranyDtoTypeLengths { nazev = 60, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZpusobUrceniVymeryDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszuv
	*      Číselník způsobů určení výměry
	*/
	interface GRenZpusobUrceniVymeryDto extends GRenBaseDetailDto {
		/**Kód způsobu určená výměry*/
		zp_urc_vym?: number|null;
		/**Název způsobu určená výměry*/
		nazev?: string|null;
		/**Datum zahájení platnosti*/
		dat_platnost_od?: JsonDate|null;
		/**Datum ukončení platnosti*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenZpusobUrceniVymeryDtoNames { zp_urc_vym = "zp_urc_vym", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenZpusobUrceniVymeryDtoFragments { zp_urc_vym = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenZpusobUrceniVymeryDtoTypes { zp_urc_vym = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenZpusobUrceniVymeryDtoTypeLengths { nazev = 60, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZpusobVyuzitiBudovyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszvb
	*      Číselník způsobů využití budovy
	*/
	interface GRenZpusobVyuzitiBudovyDto extends Gordic.Ren.Interface.GRenBaseDetailDto {
		/**Kód způsobu využití budovy*/
		zp_vyuz_bud?: number|null;
		/**Název způsobu využití budovy*/
		nazev?: string|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Zkratka způsobu využití budovy*/
		zkratka?: string|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu*/
		zmenu_prov?: string|null;
	}
	const enum GRenZpusobVyuzitiBudovyDtoNames { zp_vyuz_bud = "zp_vyuz_bud", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", zkratka = "zkratka", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenZpusobVyuzitiBudovyDtoFragments { zp_vyuz_bud = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", zkratka = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenZpusobVyuzitiBudovyDtoTypes { zp_vyuz_bud = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", zkratka = "string", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenZpusobVyuzitiBudovyDtoTypeLengths { nazev = 60, zkratka = 8, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZpusobVyuzitiJednotkyDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszvj
	*      Způsob využití jednotky
	*/
	interface GRenZpusobVyuzitiJednotkyDto extends GRenBaseDetailDto {
		/**Kód způsobu využití jednotky*/
		zp_vyuz_jed?: number|null;
		/**Kód způsobu využití jednotky*/
		nazev?: string|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Zkratka způsobu využití jednotky*/
		zkratka?: string|null;
		/**Doplňkový kód*/
		doplkod?: number|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenZpusobVyuzitiJednotkyDtoNames { zp_vyuz_jed = "zp_vyuz_jed", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", zkratka = "zkratka", doplkod = "doplkod", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenZpusobVyuzitiJednotkyDtoFragments { zp_vyuz_jed = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", zkratka = "Base", doplkod = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenZpusobVyuzitiJednotkyDtoTypes { zp_vyuz_jed = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", zkratka = "string", doplkod = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenZpusobVyuzitiJednotkyDtoTypeLengths { nazev = 60, zkratka = 7, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\ExtendedDto\GRenZpusobVyuzitiPozemkuDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**DBTABLE:nemszvp
	*      Způsob využití pozemku
	*/
	interface GRenZpusobVyuzitiPozemkuDto extends GRenBaseDetailDto {
		/**Kód způsobu využití pozemku*/
		zp_vyuz_poz?: number|null;
		/**Název způsobu využití pozemku*/
		nazev?: string|null;
		/**Zkratka způsobu využití pozemku*/
		zkratka?: string|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Identifikátor načtené dávky dat katastru nemovitostí*/
		ixs_dav?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRenZpusobVyuzitiPozemkuDtoNames { zp_vyuz_poz = "zp_vyuz_poz", nazev = "nazev", zkratka = "zkratka", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRenZpusobVyuzitiPozemkuDtoFragments { zp_vyuz_poz = "Base", nazev = "Base", zkratka = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRenZpusobVyuzitiPozemkuDtoTypes { zp_vyuz_poz = "number", nazev = "string", zkratka = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRenZpusobVyuzitiPozemkuDtoTypeLengths { nazev = 60, zkratka = 16, ixs_dav = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Dto\Permissions\GRenBasePermissions.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Základní Permissions pro Rls*/
	interface GRenBasePermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
	}
	const enum GRenBasePermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRenBasePermissionsFragments { CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRenBasePermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRenBasePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\ISL\Gordic.Ren.Interface.IGRenMajetkovyProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - MajetkovyProfil.
	* @domain RegNemovitosti
	* @businessObject RenMajetkovyProfil
	*/
	interface RenMajetkovyProfil {
		/**Detail MajetkovyProfil.*/
		read(rq?:Gordic.Ren.Interface.GRenMajetkovyProfilDto|CallParams<GServiceReadRequest<Gordic.Ren.Interface.GRenMajetkovyProfilDto>>): _Task<GServiceReadRequest<Gordic.Ren.Interface.GRenMajetkovyProfilDto>,GServiceReadResponse<Gordic.Ren.Interface.GRenMajetkovyProfilDto>>;
		/**Seznam MajetkovyProfil.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ren.Interface.GRenMajetkovyProfilDto>>;
		/**Zjistit pocet maj zaznmamu, vrati pocet karet dhm pro poslane typ a id nemovitosti*/
		listCountMajProNemovitosti(rq?:Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto|CallParams<GServiceReadRequest<Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto>>): _Task<GServiceReadRequest<Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto>,GServiceReadRequest<Gordic.Ren.Interface.GResponceListMajCountDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RenMajetkovyProfil: ServiceBase & Catalog.RenMajetkovyProfil;
	}
	const RenMajetkovyProfil: Client["RenMajetkovyProfil"];
}
declare namespace Gordic.Ren.Interface {
	interface GResponceListMajCountDto {
		count?: number|null;
		chyby?: string|null;
	}
	const enum GResponceListMajCountDtoNames { count = "count", chyby = "chyby",}
	const enum GResponceListMajCountDtoFragments { count = "*", chyby = "*",}
	const enum GResponceListMajCountDtoTypes { count = "number", chyby = "string",}
	const enum GResponceListMajCountDtoTypeLengths {}
	/**Filtr pro MajetkovyProfil.*/
	const enum GRenMajetkovyProfilFilter {
		/**Identifikátor nemovitosti*/
		id_parcely,
		/**Identifikátor budovy*/
		id_budovy,
		/**Identifikátor jednotky*/
		id_jednotky,
		/**Identifikátor majetkové karty*/
		ixs_maj,
		/**DBCOLUMN:majsmaj.lic*/
		lic,
		/**Unikátní identifikátor unikátního majetku (zev=10) v rámci jedné organizace (IČO)*/
		inv_cis,
		/**Sériové číslo majetku*/
		ser_cis,
		/**Evidenční číslo majetku*/
		evi_cis,
		/**Výrovní číslo majetku*/
		vyr_cis,
		/**DBCOLUMN:majsmaj.rok_vyr*/
		rok_vyr,
		/**Klasifikace majetku dle zákona o statistice. Může obsahovat údaje klasifikací spravovaných ČSÚ SKP, SZ-CC, CZ-CPA*/
		skp,
		/**Název majetku převzatý z číselníku materiálových čísel.*/
		nazev_skp,
		/**Název majetku definovatelný z úrovně uživatele*/
		nazev,
		/**Vyjadřuje Su a Au, na který bude majetek zaúčtován v okamžiku účtování o jeho pořízení do organizace*/
		ueab_por,
		/**Vyjadřuje Su a Au, na který bude majetek zaúčtován v okamžiku účtování o jeho oprávkách*/
		ueab_opr,
		/**Vyjadřuje Su a Au, na který bude majetek zaúčtován v okamžiku účtování o jeho zařazení do užívání*/
		ueab_evi,
		/**Její hodnota je dána podílem Účetní ceny a počtu měrných jednotek vedených na kartě*/
		cmj,
		/**Vyjadřuje počet MJ vedených na kartě majetku. V případě unikátního majetku (zev=10) nabývá vždy hodnoty 1.*/
		pmj,
		/**Představuje hodnotu majetku vedenou v účetním deníku na příslušném majetkovém účtu*/
		c,
		/**Vyjadřuje minimální počet MJ, které lze na kartě vést pro případné notifikace poklesu počtu majetku pod tuto hranici*/
		pmj_min,
		/**Datum pořízení majetku do organizace*/
		dat_por,
		/**Datum zařazení majetku do užívání*/
		dat_zar,
		/**DBCOLUMN:majsmaj.dat_vyr*/
		dat_vyr,
		/**Technologický údaj vypovídající o datu vytvoření majetkové karty v MAJ*/
		dat_vznik,
		/**DBCOLUMN:majsmaj.ico*/
		ico,
		/**DBCOLUMN:majsmaj.ucs*/
		ucs,
		/**DBCOLUMN:majsmaj.nks*/
		nks,
		/**Jeden z klasifikačních údajů popisujících majetek*/
		trida,
		/**Toplogický údaj vypovídající o umístění majetku. V závislosti na režimu identifikace topologie (EVS) se může jednat o základní údaj oddělující majetek v rámci jednoho NKS*/
		stredisko,
		/**Topologický údaj popisující, ve které budově je majetek umístěn*/
		budova_kod,
		/**Topologický údaj popisující, ve které místnosti je majetek umístěn*/
		mistnost_kod,
		/**Topologický údaj popisující, ve kteréorganizační jednotce je majetek veden*/
		ixs_orj,
		/**Zodpovědná osoba za majetek*/
		ixs_ref,
		/**Pokud se jedná o provek souboru, je zde uveden identifikátor karty souboru.*/
		ixs_maj_nad,
		/**Údaj vypovídající o typu souboru. Jsou podporovány účetní a logistické typy souborů.*/
		typ_soubor,
		/**Pojmenování souboru majetku*/
		jmeno_soubor,
		/**Pokud se jedná o provek souboru, je zde uvedeno inventární číslo souboru*/
		inv_cis_soubor,
		/**Členění majetku v rámci skupiny majetku. Představuje vazbu majetku na systém účtování o majetku.*/
		drh_id,
		/**Základní klasifikační údaj majetku*/
		skupina_id,
		/**Definice měrné jednotky, ve které je majetek na kartě veden.*/
		mj,
		/**Nepoužíváno*/
		skupina_odp,
		/**Nepoužíváno*/
		polozka_odp,
		/**Rozlišuje účetní a operativní vedení majetku*/
		tev,
		/**Definuje z jakých prostředků byl majetek pořízen a v jaké situaci životního cyklu se nachází*/
		dev,
		/**Rozlišení karty ve vztahu k souborům majetku*/
		tka,
		/**Rozlišuje majetek dle stavu*/
		mat_akt,
		/**Kód pohybu, kterým byl majetek vyřazen z užívání*/
		kod_vyr,
		/**Kód pohybu, kterým byl majetek zařazen do užívání*/
		kod_por,
		/**Jeden z popisných údajů majetkové karty*/
		poznamka,
		/**Příznak, zda byl ke kartě pomocí speciální sestavy vygenerován podkal pro tisk etikety/štítku s inventárním číslem*/
		tisk_eti,
		/**Počet rezervovaných měrných jednotek na kartě*/
		pmj_res,
		/**Příznak nesoucí údaj o tom, zda je majetková karta odepisována.*/
		priz_odp,
		/**DBCOLUMN:majsmaj.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:majsmaj.zmenu_prov*/
		zmenu_prov,
		/**Vyjadřuje macimální počet MJ, které lze na kartě vést pro případné notifikace překročení počtu majetkunaod tuto hranici*/
		pmj_max,
		/**Identifikace topologie – pojem, který definuje topologickou jednotku umístění majetku.*/
		id_top,
		/**Nevyužito*/
		id_mnoz,
		/**Základní klasifikační údaj majetku z pohledu typu. Číselníková hodnota spravovaná ÚJ.*/
		mat_cis,
		/**Vypovídá o šarži, ve které je majetek vyroben*/
		sarze,
		/**Definice vedení karty majetku s daným materiálovým číslem v dané skupině majetku*/
		zev,
		/**Datum končící životnosti majetku*/
		expirace,
		/**Kódové označení majetkové (skladové) karty definujíí konkrétní typ majetku. Převážně prezentované čárovým kódem ve formátu EAN*/
		ean,
		/**DBCOLUMN:majsmaj.dp_ode*/
		dp_ode,
		/**DBCOLUMN:majsmaj.dan_typ*/
		dan_typ,
		/**DBCOLUMN:majsmaj.c_dph*/
		c_dph,
		/**DBCOLUMN:majsmaj.c_c_dph*/
		c_c_dph,
		/**Způsob využití majetku. Číselníková hodnota spravovaná ÚJ.*/
		kod_vyu,
		/**Vypovídá o tom, v rámci jaké Akce byl majetek pořízen*/
		akce,
		/**Topologický údaj popisují segment budovy, ve kterém je majetek umístěn. Číselníková hodnota spravovaná ÚJ.*/
		segment_kod,
		/**Datum zaúčtování majetku na majetkové účty*/
		dat_uct_0123,
		/**Typ dokladu, kterým byl majetek zařazen do kartotéky MAJ. Spolu s Kódem pořízení (kod_por) tvoří společný klíč*/
		typ_dok_por,
		/**Typ dokladu, kterým byl majetek vyřazen. Spolu s Kódem vyřazení (kod_vyr) tvoří společný klíč*/
		typ_dok_vyr,
		/**Vyjadřuje skutečnost, že majetek je v daném okamžiku inventarizován. Pokud ano, jsou blokovány veškeré aktivní operace s majetekm.*/
		inv_in,
		/**Délka záruční lhůty v měsících*/
		lhuta_zaruka,
		/**Topologický údaj popisující objekt, ve kterém je majetek umístěn. Číselníková hodnota spravovaná ÚJ.*/
		objekt,
		/**Vypovídá o tom, ve kterém státě byl majetek vyroben*/
		stat_puvod,
		/**Identifikace výrobce majetku*/
		ixs_esu_vyr,
		/**Identifikace dodavatele majetku*/
		ixs_esu_dod,
		/**Identifikace servisního zařízení majetku*/
		ixs_esu_servis,
		/**Textový popis typu majetku*/
		typ_maj,
		/**Číselníková hodnota spravovaná ÚJ.*/
		ktg_zar,
		/**Hmotnost majetku*/
		hmotnost,
		/**Číselníková hodnota spravovaná ÚJ.*/
		prev_stav,
		/**Číselníková hodnota spravovaná ÚJ.*/
		mobilita,
		/**Číselníková hodnota spravovaná ÚJ.*/
		trida_bezp,
		/**Číselníková hodnota spravovaná ÚJ.*/
		riziko_por,
		/**Údaj popisující rozměry majetku*/
		rozmer_l,
		/**Údaj popisující rozměry majetku*/
		rozmer_w,
		/**Údaj popisující rozměry majetku*/
		rozmer_h,
		/**Výše uplatněného odpočtu DPH*/
		c_dph_odpocet,
		/**DBCOLUMN:majsmaj.ixs_esu_vla*/
		ixs_esu_vla,
		/**Topologický údaj o lokalizaci majetku v souřadném systému WGS84 (GPS)*/
		gps_sirka,
		/**Topologický údaj o lokalizaci majetku v souřadném systému WGS84 (GPS)*/
		gps_delka,
		/**Topologický údaj o lokalizaci majetku. Číselníková hodnota spravovaná ÚJ.*/
		ext_1,
		/**Topologický údaj o lokalizaci majetku. Číselníková hodnota spravovaná ÚJ.*/
		ext_2,
		/**Topologický údaj o lokalizaci majetku. Číselníková hodnota spravovaná ÚJ.*/
		ext_3,
		/**Technologický údaj pro vedení infromace, v jakém stavu byl majetek pořízen do kartotéky. Umožňuje rozlišit stav Pořízení a Evidence*/
		stav_maj,
		/**Nepoužito*/
		id_krt_dev,
		/**Vyjadřuje cenu, za kterou byl majetek pořízen. Převážně se jedná nákupní či reprodukční cenu majetku*/
		c_poriz,
		/**DBCOLUMN:majsmaj.c_dph_poriz*/
		c_dph_poriz,
		/**DBCOLUMN:majsmaj.c_c_dph_poriz*/
		c_c_dph_poriz,
		/**DBCOLUMN:majsmaj.c_opr_pol*/
		c_opr_pol,
		/**DBCOLUMN:majsmaj.c_dph_opr_pol*/
		c_dph_opr_pol,
		/**DBCOLUMN:majsmaj.c_c_dph_opr_pol*/
		c_c_dph_opr_pol,
		/**Jedná se předpokládanou prodejní cenu majetku, který byl určen k prodeji.*/
		c_real,
		/**DBCOLUMN:majsmaj.c_dph_real*/
		c_dph_real,
		/**DBCOLUMN:majsmaj.c_c_dph_real*/
		c_c_dph_real,
		/**Jedná se o výši transferu (dotace), která byla ÚJ poskytnuta na pořízení majetku*/
		c_dotace,
		/**Anaůlytika PAP/POR - Analytický údaj pro vytvoření statistických výkazů typu PAP.*/
		ke_pap,
		/**Nevyužito*/
		kt_pap,
		/**Datum uskutečnění účetního případu na kartě majetku vypovídá o datu, kdy byla provedena poslední manipulace k danou majetkovou kartou*/
		dat_uup,
		/**Neměnný identifikátor majetku určený ke sdílení se systémy třetích stran*/
		id_maj,
		/**Pokud je majetek zapsán do rejstříku kulturních památek, tento údaj rozlišuje o jakou kategorii se jedná.*/
		ktg_kp,
		/**Číslo rejstříku kulturních památek, do kterého byl majetek zapsán jako KP, NKP*/
		cis_rejstrik_kp,
		/**Identifikátor v rejstříku kulturních památek, do kterého je majetek zapsán*/
		id_rejstrik_kp,
		/**Prodejní cena 1 vedená ka kartě majetku pro případný prodej*/
		cmj_pro1,
		/**DBCOLUMN:majsmaj.cmj_pro2*/
		cmj_pro2,
		/**DBCOLUMN:majsmaj.cmj_pro3*/
		cmj_pro3,
		/**DBCOLUMN:majsmaj.ixs_elo*/
		ixs_elo,
		/**DBCOLUMN:majsmaj.hlavni_cin_pod*/
		hlavni_cin_pod,
		typ_obj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\ISL\Import\Gordic.Ren.Interface.IGRenImportDavAsync.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Adresa budovy - Vazba mezi budovou a adresou
	* @domain RegNemovitosti
	* @businessObject RenImportDav
	*/
	interface RenImportDav {
		/**Aktualizace identifikace dávky po načtení VFK*/
		aktualizaceIdentifikaceDavky(rq?:Gordic.Ren.Interface.GRenDavkyNacitaniResultDto|CallParams<GServiceSaveRequest<Gordic.Ren.Interface.GRenDavkyNacitaniResultDto>>): _Task<GServiceSaveRequest<Gordic.Ren.Interface.GRenDavkyNacitaniResultDto>,GServiceSaveResponse<Gordic.Ren.Interface.GRenDavkyNacitaniResultDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RenImportDav: ServiceBase & Catalog.RenImportDav;
	}
	const RenImportDav: Client["RenImportDav"];
}
declare namespace Gordic.Ren.Interface {
	/**Filtr dto*/
	interface GRenImportDavAsyncFilter {
		volbaNemovitosti?: boolean|null;
		volbaNemovitostiVolitelne?: boolean|null;
		volbaJednotek?: boolean|null;
		volbaVlastnictvi?: boolean|null;
		volbaBonDiluParceluVolitelne?: boolean|null;
		volbaJinePravVztahyTyprav?: boolean|null;
		volbaJinePravVztahyJpv?: boolean|null;
		volbaBlokuAdresniMistoVolitelne?: boolean|null;
		zpusobNacteniWSDP?: number|null;
		nacteniVybranychIco?: string|null;
		ixs_dav?: string|null;
		povolitVyberZrusenychDavek?: boolean|null;
		posledniNactenaDavkaText?: string|null;
		posledniNactenaSouborDavkyText?: string|null;
		volbaRizeni?: boolean|null;
		volbaRizeniDUL?: boolean|null;
		volbaRizeniRIZENI?: boolean|null;
		volbaRizeniRIZKU?: boolean|null;
		volbaRizeniPRERIZ?: boolean|null;
		volbaRizeniUCAST?: boolean|null;
		volbaRizeniUCTYP?: boolean|null;
		volbaRizeniADRUC?: boolean|null;
		volbaRizeniOBJRIZ?: boolean|null;
		volbaRizeniRL?: boolean|null;
	}
	const enum GRenImportDavAsyncFilterNames { volbaNemovitosti = "volbaNemovitosti", volbaNemovitostiVolitelne = "volbaNemovitostiVolitelne", volbaJednotek = "volbaJednotek", volbaVlastnictvi = "volbaVlastnictvi", volbaBonDiluParceluVolitelne = "volbaBonDiluParceluVolitelne", volbaJinePravVztahyTyprav = "volbaJinePravVztahyTyprav", volbaJinePravVztahyJpv = "volbaJinePravVztahyJpv", volbaBlokuAdresniMistoVolitelne = "volbaBlokuAdresniMistoVolitelne", zpusobNacteniWSDP = "zpusobNacteniWSDP", nacteniVybranychIco = "nacteniVybranychIco", ixs_dav = "ixs_dav", povolitVyberZrusenychDavek = "povolitVyberZrusenychDavek", posledniNactenaDavkaText = "posledniNactenaDavkaText", posledniNactenaSouborDavkyText = "posledniNactenaSouborDavkyText", volbaRizeni = "volbaRizeni", volbaRizeniDUL = "volbaRizeniDUL", volbaRizeniRIZENI = "volbaRizeniRIZENI", volbaRizeniRIZKU = "volbaRizeniRIZKU", volbaRizeniPRERIZ = "volbaRizeniPRERIZ", volbaRizeniUCAST = "volbaRizeniUCAST", volbaRizeniUCTYP = "volbaRizeniUCTYP", volbaRizeniADRUC = "volbaRizeniADRUC", volbaRizeniOBJRIZ = "volbaRizeniOBJRIZ", volbaRizeniRL = "volbaRizeniRL",}
	const enum GRenImportDavAsyncFilterFragments { volbaNemovitosti = "*", volbaNemovitostiVolitelne = "*", volbaJednotek = "*", volbaVlastnictvi = "*", volbaBonDiluParceluVolitelne = "*", volbaJinePravVztahyTyprav = "*", volbaJinePravVztahyJpv = "*", volbaBlokuAdresniMistoVolitelne = "*", zpusobNacteniWSDP = "*", nacteniVybranychIco = "*", ixs_dav = "*", povolitVyberZrusenychDavek = "*", posledniNactenaDavkaText = "*", posledniNactenaSouborDavkyText = "*", volbaRizeni = "*", volbaRizeniDUL = "*", volbaRizeniRIZENI = "*", volbaRizeniRIZKU = "*", volbaRizeniPRERIZ = "*", volbaRizeniUCAST = "*", volbaRizeniUCTYP = "*", volbaRizeniADRUC = "*", volbaRizeniOBJRIZ = "*", volbaRizeniRL = "*",}
	const enum GRenImportDavAsyncFilterTypes { volbaNemovitosti = "boolean", volbaNemovitostiVolitelne = "boolean", volbaJednotek = "boolean", volbaVlastnictvi = "boolean", volbaBonDiluParceluVolitelne = "boolean", volbaJinePravVztahyTyprav = "boolean", volbaJinePravVztahyJpv = "boolean", volbaBlokuAdresniMistoVolitelne = "boolean", zpusobNacteniWSDP = "number", nacteniVybranychIco = "string", ixs_dav = "string", povolitVyberZrusenychDavek = "boolean", posledniNactenaDavkaText = "string", posledniNactenaSouborDavkyText = "string", volbaRizeni = "boolean", volbaRizeniDUL = "boolean", volbaRizeniRIZENI = "boolean", volbaRizeniRIZKU = "boolean", volbaRizeniPRERIZ = "boolean", volbaRizeniUCAST = "boolean", volbaRizeniUCTYP = "boolean", volbaRizeniADRUC = "boolean", volbaRizeniOBJRIZ = "boolean", volbaRizeniRL = "boolean",}
	const enum GRenImportDavAsyncFilterTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Permissions\GNemsdavPermissions.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Oprávnění pro GNemsdav*/
	interface GNemsdavPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Vytvoření*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprava*/
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GNemsdavPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate",}
	const enum GNemsdavPermissionsFragments { CanCreate = "*", CanUpdate = "*",}
	const enum GNemsdavPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GNemsdavPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Permissions\GNemskatPermissions.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Oprávnění pro GNemskat*/
	interface GNemskatPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Vytvoření*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprava*/
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GNemskatPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate",}
	const enum GNemskatPermissionsFragments { CanCreate = "*", CanUpdate = "*",}
	const enum GNemskatPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GNemskatPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Permissions\GRenBaseDetailDto.d.ts 

declare namespace Gordic.Ren.Interface {
	/**Základní Permissions pro Ren*/
	interface GRenBaseDetailDto {
		Permissions?: Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions|null;
	}
	const enum GRenBaseDetailDtoNames { Permissions = "Permissions",}
	const enum GRenBaseDetailDtoFragments { Permissions = "*",}
	const enum GRenBaseDetailDtoTypes { Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenBaseDetailDtoTypeLengths {}
	/**Permissions pro KatUzemi v Ren*/
	interface GRenKatUzemiDetailPermissionsDto {
		Permissions?: Gordic.Ren.Interface.GNemskatPermissions|null;
	}
	const enum GRenKatUzemiDetailPermissionsDtoNames { Permissions = "Permissions",}
	const enum GRenKatUzemiDetailPermissionsDtoFragments { Permissions = "*",}
	const enum GRenKatUzemiDetailPermissionsDtoTypes { Permissions = "Gordic.Ren.Interface.GNemskatPermissions",}
	const enum GRenKatUzemiDetailPermissionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Permissions\GRenBaseDetailNemovitostiDto.d.ts 

declare namespace Gordic.Ren.Interface {
	interface GRenBaseDetailNemovitostiDto {
		/**Navigační vlastnost pro Těleso (id_telesa)*/
		Teleso?: Gordic.Ren.Interface.GRenTelesoDto|null;
		/**Navigační vlastnost pro Katastrální území (kod_kat_uzemi)*/
		KatastralniUzemi?: Gordic.Ren.Interface.GRenKatastralniUzemiDto|null;
		/**Navigační vlastnost pro Kraj*/
		ZpusobVyuzitiBudovy?: Gordic.Ren.Interface.GRenZpusobVyuzitiBudovyDto|null;
		/**Navigační vlastnost pro CastObce (kod_casti_obce)*/
		CastObce?: Gordic.Ren.Interface.GRenCastObceDto|null;
		/**Navigační vlastnost pro Okres*/
		Okres?: Gordic.Ren.Interface.GRenOkresDto|null;
		/**Navigační vlastnost pro Kraj*/
		Kraj?: Gordic.Ren.Interface.GRenKrajDto|null;
		/**Navigační vlastnost pro Obec (z kat uzemi ktere v telese)*/
		Obec?: Gordic.Ren.Interface.GRenObecDto|null;
		/**Navigační vlastnost pro TypBudovy(Číselník typu budov) pres typ_budovy*/
		TypBudovy?: Gordic.Ren.Interface.GRenTypBudovyDto|null;
		/**Navigační Autor změny dokumentu (dto) pres zmenu_prov*/
		ZmenaProv?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Navigační vlastnost pro Vlastnik pres id_telesa v nemsvla a nemstel*/
		Vlastnictvi?: Gordic.Ren.Interface.GRenVlastnictviDto|null;
		/**Navigační vlastnost pro OpravnenySubjekt pres id_opr_subj v nemsosu (od-> nemsvla od-> nemstel)*/
		OpravnenySubjekt?: Gordic.Ren.Interface.GRenOpravnenySubjektDto|null;
		/**Navigační vlastnost pro CharakteristikaOs pres id_opr_subj*/
		CharakteristikaOs?: Gordic.Ren.Interface.GRenCharakteristikaOsDto|null;
		/**Navigační vlastnost pro TypPravnihoVztahu*/
		TypPravnihoVztahu?: Gordic.Ren.Interface.GRenTypPravnihoVztahuDto|null;
		/**Navigační vlastnost pro MajetkovyProfil*/
		MajetkovyProfil?: Gordic.Ren.Interface.GRenMajetkovyProfilDto|null;
		RozsirenyMajetkovyProfil?: Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto|null;
		/**Navigační vlastnost pro ProfilTextuZaznamu*/
		ProfilTextuZaznamu?: Gordic.Ren.Interface.GRenProfilTextuZaznamuDto|null;
		/**Navigační vlastnost pro ZaznamKNemovitosti*/
		ZaznamKNemovitosti?: Gordic.Ren.Interface.GRenZaznamKNemovitostiDto|null;
		/**Navigační vlastnost pro TypZaznamu*/
		TypZaznamu?: Gordic.Ren.Interface.GRenTypZaznamuDto|null;
		s_vecne_bremeno?: number|null;
		s_zastavni_pravo?: number|null;
		aktivita_ku?: number|null;
		s_vecne_bremeno_txt?: string|null;
		s_zastavni_pravo_txt?: string|null;
		maj_podil_rozdil?: number|null;
		vecne_bremeno_rozdil?: number|null;
		zastavni_pravo_rozdil?: number|null;
		email_avizo_vklad_txt?: string|null;
		Permissions?: Gordic.Ren.Interface.GRenNemovitostPermissions|null;
	}
	const enum GRenBaseDetailNemovitostiDtoNames { Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "s_vecne_bremeno", s_zastavni_pravo = "s_zastavni_pravo", aktivita_ku = "aktivita_ku", s_vecne_bremeno_txt = "s_vecne_bremeno_txt", s_zastavni_pravo_txt = "s_zastavni_pravo_txt", maj_podil_rozdil = "maj_podil_rozdil", vecne_bremeno_rozdil = "vecne_bremeno_rozdil", zastavni_pravo_rozdil = "zastavni_pravo_rozdil", email_avizo_vklad_txt = "email_avizo_vklad_txt", Permissions = "Permissions",}
	const enum GRenBaseDetailNemovitostiDtoFragments { Teleso = "Teleso", KatastralniUzemi = "KatastralniUzemi", ZpusobVyuzitiBudovy = "ZpusobVyuzitiBudovy", CastObce = "CastObce", Okres = "Okres", Kraj = "Kraj", Obec = "Obec", TypBudovy = "TypBudovy", ZmenaProv = "ZmenaProv", Vlastnictvi = "Vlastnictvi", OpravnenySubjekt = "OpravnenySubjekt", CharakteristikaOs = "CharakteristikaOs", TypPravnihoVztahu = "TypPravnihoVztahu", MajetkovyProfil = "MajetkovyProfil", RozsirenyMajetkovyProfil = "RozsirenyMajetkovyProfil", ProfilTextuZaznamu = "ProfilTextuZaznamu", ZaznamKNemovitosti = "ZaznamKNemovitosti", TypZaznamu = "TypZaznamu", s_vecne_bremeno = "Base", s_zastavni_pravo = "Base", aktivita_ku = "Extended", s_vecne_bremeno_txt = "*", s_zastavni_pravo_txt = "*", maj_podil_rozdil = "*", vecne_bremeno_rozdil = "*", zastavni_pravo_rozdil = "*", email_avizo_vklad_txt = "*", Permissions = "*",}
	const enum GRenBaseDetailNemovitostiDtoTypes { Teleso = "Gordic.Ren.Interface.GRenTelesoDto", KatastralniUzemi = "Gordic.Ren.Interface.GRenKatastralniUzemiDto", ZpusobVyuzitiBudovy = "Gordic.Ren.Interface.GRenZpusobVyuzitiBudovyDto", CastObce = "Gordic.Ren.Interface.GRenCastObceDto", Okres = "Gordic.Ren.Interface.GRenOkresDto", Kraj = "Gordic.Ren.Interface.GRenKrajDto", Obec = "Gordic.Ren.Interface.GRenObecDto", TypBudovy = "Gordic.Ren.Interface.GRenTypBudovyDto", ZmenaProv = "Gordic.Gin.Interface.GGinszmpDto", Vlastnictvi = "Gordic.Ren.Interface.GRenVlastnictviDto", OpravnenySubjekt = "Gordic.Ren.Interface.GRenOpravnenySubjektDto", CharakteristikaOs = "Gordic.Ren.Interface.GRenCharakteristikaOsDto", TypPravnihoVztahu = "Gordic.Ren.Interface.GRenTypPravnihoVztahuDto", MajetkovyProfil = "Gordic.Ren.Interface.GRenMajetkovyProfilDto", RozsirenyMajetkovyProfil = "Gordic.Ren.Interface.GRenRozsirenyMajetkovyProfilDto", ProfilTextuZaznamu = "Gordic.Ren.Interface.GRenProfilTextuZaznamuDto", ZaznamKNemovitosti = "Gordic.Ren.Interface.GRenZaznamKNemovitostiDto", TypZaznamu = "Gordic.Ren.Interface.GRenTypZaznamuDto", s_vecne_bremeno = "number", s_zastavni_pravo = "number", aktivita_ku = "number", s_vecne_bremeno_txt = "string", s_zastavni_pravo_txt = "string", maj_podil_rozdil = "number", vecne_bremeno_rozdil = "number", zastavni_pravo_rozdil = "number", email_avizo_vklad_txt = "string", Permissions = "Gordic.Ren.Interface.GRenNemovitostPermissions",}
	const enum GRenBaseDetailNemovitostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ren.Interface\Permissions\GRenNemovitostPermissions.d.ts 

declare namespace Gordic.Ren.Interface {
	interface GRenNemovitostPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
		CanBeEvaluated: Gordic.General.ApplicationInterface.GPermission;
		CanShowDHM: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRenNemovitostPermissionsNames { CanBeEvaluated = "CanBeEvaluated", CanShowDHM = "CanShowDHM", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRenNemovitostPermissionsFragments { CanBeEvaluated = "*", CanShowDHM = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRenNemovitostPermissionsTypes { CanBeEvaluated = "Gordic.General.ApplicationInterface.GPermission", CanShowDHM = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRenNemovitostPermissionsTypeLengths {}
}

//#endregion

