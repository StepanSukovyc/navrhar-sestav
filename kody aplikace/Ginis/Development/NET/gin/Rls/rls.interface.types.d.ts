/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rls.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rls.Interface\Gordic.Rls.Interface.csproj
*    created     2026-02-16 14:35:42
*    files       DTO\GAdresareOrezavatkoDto.d.ts
*                DTO\GAkceLicenceDto.d.ts
*                DTO\GDruhVozidlaDto.d.ts
*                DTO\GDruhVozidlaPrukazDto.d.ts
*                DTO\GExterniSubjektDto.d.ts
*                DTO\GFotografiePodpisDto.d.ts
*                DTO\GHistorieLicenceDto.d.ts
*                DTO\GKatZelDrahyDto.d.ts
*                DTO\GKontrolaDto.d.ts
*                DTO\GLanovaDrahaDto.d.ts
*                DTO\GLanovaDrahaPrukazDto.d.ts
*                DTO\GLicenceDto.d.ts
*                DTO\GLogLicenceDto.d.ts
*                DTO\GObjednavkaDto.d.ts
*                DTO\GOrezavatkoDto.d.ts
*                DTO\GPrestupkyDto.d.ts
*                DTO\GPripojitSpisDto.d.ts
*                DTO\GSpisLicenceDto.d.ts
*                DTO\GSubjektZkouskyDto.d.ts
*                DTO\GVzdelaniDto.d.ts
*                DTO\GZadostFormularDto.d.ts
*                DTO\BaseDto\GGinsesuDto.d.ts
*                DTO\BaseDto\GRlscspzDto.d.ts
*                DTO\BaseDto\GRlscszkDto.d.ts
*                DTO\BaseDto\GRlsdkzkDto.d.ts
*                DTO\BaseDto\GRlsdzzkDto.d.ts
*                DTO\BaseDto\GRlsskzkDto.d.ts
*                DTO\BaseDto\GRlsstzkDto.d.ts
*                DTO\BaseDto\GRlsszzkDto.d.ts
*                DTO\BaseDto\GRlsvkpzDto.d.ts
*                DTO\ExtendedDto\GRlsExterniSubjektDto.d.ts
*                DTO\ExtendedDto\GRlsKategorieZkouskyDto.d.ts
*                DTO\ExtendedDto\GRlsNominacePokusAbsolvovaniTerminuDto.d.ts
*                DTO\ExtendedDto\GRlsPodanaZadostOVykonaniZkouskyDto.d.ts
*                DTO\ExtendedDto\GRlsPodkategorieZkouskyDto.d.ts
*                DTO\ExtendedDto\GRlsStavPokusuOZkouskuDto.d.ts
*                DTO\ExtendedDto\GRlsStavZadostiOZkouskuDto.d.ts
*                DTO\ExtendedDto\GRlsTerminZkouskyDto.d.ts
*                DTO\ExtendedDto\GRlsVybranePodkategorieDto.d.ts
*                DTO\ExtendedDto\GRlsVybranePodkategorieHromadneDto.d.ts
*                DTO\ExtendedDto\GRlsZadostOVykonaniZkouskyDto.d.ts
*                DTO\ExtendedDto\GRlsZkouskyRecordsCountsDto.d.ts
*                DTO\Filters\GAkceLicenceFilterDto.d.ts
*                DTO\Filters\GHistorieLicenceFilterDto.d.ts
*                DTO\Filters\GKontrolaFilterDto.d.ts
*                DTO\Filters\GLanovaDrahaFilterDto.d.ts
*                DTO\Filters\GLicenceFilterDto.d.ts
*                DTO\Filters\GLogLicenceFilterDto.d.ts
*                DTO\Filters\GObjednavkaFilterDto.d.ts
*                DTO\Filters\GSubjektZkouskyFilterDto.d.ts
*                DTO\Filters\GVzdelaniFilterDto.d.ts
*                DTO\Permissions\GRlsBaseDetailPermissions.d.ts
*                DTO\Permissions\GRlsPokusyNominaceAbsolvovaniPermissions.d.ts
*                DTO\Permissions\GRlsZadostOVykonaniZkouskyPermissions.d.ts
*                DTO\Readers\GReaderRlscakcDto.d.ts
*                DTO\Readers\GReaderRlscktdDto.d.ts
*                DTO\Readers\GReaderRlscspzDto.d.ts
*                DTO\Readers\GReaderRlscstkDto.d.ts
*                DTO\Readers\GReaderRlscstlDto.d.ts
*                DTO\Readers\GReaderRlscstoDto.d.ts
*                DTO\Readers\GReaderRlscstpDto.d.ts
*                DTO\Readers\GReaderRlscszkDto.d.ts
*                DTO\Readers\GReaderRlsctkoDto.d.ts
*                DTO\Readers\GReaderRlscvmiDto.d.ts
*                DTO\Readers\GReaderRlscvzdDto.d.ts
*                DTO\Readers\GReaderRlsczvyDto.d.ts
*                DTO\Readers\GReaderRlsskzkDto.d.ts
*                DTO\Readers\GReaderRlsstzkDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GAdresareOrezavatkoDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO s adresáři pro ořezávátko*/
	interface GAdresareOrezavatkoDto {
		/**Adresář "zadosti"*/
		adresarZadosti?: string|null;
		/**Adresář s náhledy*/
		adresarNahledy?: string|null;
		/**Adresář kopírka*/
		adresarKopirka?: string|null;
		/**Adresář zpracováno*/
		adresarZpracovano?: string|null;
		/**Adresář vstup*/
		adresarVstup?: string|null;
		/**Adresář vstup*/
		adresarTiskarna?: string|null;
		/**Adresář pro přílohy*/
		adresarElePrilohy?: string|null;
		/**Adresář pro náhledy z elektronické přílohy*/
		adresarNahledyElePrilohy?: string|null;
		/**Adresář proi zpracované elektronické přílohy*/
		adresarZpracovanoEle?: string|null;
	}
	const enum GAdresareOrezavatkoDtoNames { adresarZadosti = "adresarZadosti", adresarNahledy = "adresarNahledy", adresarKopirka = "adresarKopirka", adresarZpracovano = "adresarZpracovano", adresarVstup = "adresarVstup", adresarTiskarna = "adresarTiskarna", adresarElePrilohy = "adresarElePrilohy", adresarNahledyElePrilohy = "adresarNahledyElePrilohy", adresarZpracovanoEle = "adresarZpracovanoEle",}
	const enum GAdresareOrezavatkoDtoFragments { adresarZadosti = "*", adresarNahledy = "*", adresarKopirka = "*", adresarZpracovano = "*", adresarVstup = "*", adresarTiskarna = "*", adresarElePrilohy = "*", adresarNahledyElePrilohy = "*", adresarZpracovanoEle = "*",}
	const enum GAdresareOrezavatkoDtoTypes { adresarZadosti = "string", adresarNahledy = "string", adresarKopirka = "string", adresarZpracovano = "string", adresarVstup = "string", adresarTiskarna = "string", adresarElePrilohy = "string", adresarNahledyElePrilohy = "string", adresarZpracovanoEle = "string",}
	const enum GAdresareOrezavatkoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GAkceLicenceDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO pro akce licence*/
	interface GAkceLicenceDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixs_als?: string|null;
		/**Autogenerated.*/
		ixs_lst?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		druh_akce?: number|null;
		/**Autogenerated.*/
		datum?: JsonDate|null;
		/**Autogenerated.*/
		datum_od?: JsonDate|null;
		/**Autogenerated.*/
		datum_do?: JsonDate|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		duvod?: string|null;
		/**Autogenerated.*/
		ixs_hli?: string|null;
		/**Autogenerated.*/
		ixp_spi?: string|null;
		/**Autogenerated.*/
		ixp_spr?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		druh_akce_txt?: string|null;
		/**Autogenerated.*/
		pocet_spr?: number|null;
	}
	const enum GAkceLicenceDtoNames { ixs_als = "ixs_als", ixs_lst = "ixs_lst", por_cislo = "por_cislo", druh_akce = "druh_akce", datum = "datum", datum_od = "datum_od", datum_do = "datum_do", popis = "popis", duvod = "duvod", ixs_hli = "ixs_hli", ixp_spi = "ixp_spi", ixp_spr = "ixp_spr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", druh_akce_txt = "druh_akce_txt", pocet_spr = "pocet_spr", Permissions = "Permissions",}
	const enum GAkceLicenceDtoFragments { ixs_als = "*", ixs_lst = "*", por_cislo = "*", druh_akce = "*", datum = "*", datum_od = "*", datum_do = "*", popis = "*", duvod = "*", ixs_hli = "*", ixp_spi = "*", ixp_spr = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", druh_akce_txt = "*", pocet_spr = "*", Permissions = "*",}
	const enum GAkceLicenceDtoTypes { ixs_als = "string", ixs_lst = "string", por_cislo = "number", druh_akce = "number", datum = "JsonDate", datum_od = "JsonDate", datum_do = "JsonDate", popis = "string", duvod = "string", ixs_hli = "string", ixp_spi = "string", ixp_spr = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", druh_akce_txt = "string", pocet_spr = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GDruhVozidlaDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro druh vozidla*/
	interface GDruhVozidlaDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		druh_hv?: number|null;
        /**Autogenerated.*/
		druh_hv_txt?: string|null;
        /**Autogenerated.*/
		druh_hv_zkratka?: string|null;
        /**Autogenerated.*/
		k_v?: number|null;
        /**Autogenerated.*/
		k_s?: string|null;
	}
	const enum GDruhVozidlaDtoNames { druh_hv = "druh_hv", druh_hv_txt = "druh_hv_txt", druh_hv_zkratka = "druh_hv_zkratka", k_v = "k_v", k_s = "k_s", Permissions = "Permissions",}
	const enum GDruhVozidlaDtoFragments { druh_hv = "*", druh_hv_txt = "*", druh_hv_zkratka = "*", k_v = "*", k_s = "*", Permissions = "*",}
	const enum GDruhVozidlaDtoTypes { druh_hv = "number", druh_hv_txt = "string", druh_hv_zkratka = "string", k_v = "number", k_s = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GDruhVozidlaPrukazDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro druh vozidla na průkazu*/
	interface GDruhVozidlaPrukazDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_lst?: string|null;
        /**Autogenerated.*/
		druh_hv?: number|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		druh_hv_txt?: string|null;
        /**Autogenerated.*/
		druh_hv_zkratka?: string|null;
	}
	const enum GDruhVozidlaPrukazDtoNames { ixs_lst = "ixs_lst", druh_hv = "druh_hv", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", druh_hv_txt = "druh_hv_txt", druh_hv_zkratka = "druh_hv_zkratka", Permissions = "Permissions",}
	const enum GDruhVozidlaPrukazDtoFragments { ixs_lst = "*", druh_hv = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", druh_hv_txt = "*", druh_hv_zkratka = "*", Permissions = "*",}
	const enum GDruhVozidlaPrukazDtoTypes { ixs_lst = "string", druh_hv = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", druh_hv_txt = "string", druh_hv_zkratka = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GExterniSubjektDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO pro ESU*/
	interface GExterniSubjektDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		stat?: number|null;
		/**Autogenerated.*/
		psc?: string|null;
		/**Autogenerated.*/
		obec?: string|null;
		/**Autogenerated.*/
		cast_obce?: string|null;
		/**Autogenerated.*/
		ulice?: string|null;
		/**Autogenerated.*/
		cor?: string|null;
		/**Autogenerated.*/
		cpop?: string|null;
		/**Autogenerated.*/
		tel?: string|null;
		/**Autogenerated.*/
		mail?: string|null;
		/**Autogenerated.*/
		fax?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		tit_pred?: string|null;
		/**Autogenerated.*/
		tit_za?: string|null;
		/**Autogenerated.*/
		dat_nar?: JsonDate|null;
		/**Autogenerated.*/
		pohlavi?: number|null;
		/**Autogenerated.*/
		misto_nar?: string|null;
		/**Autogenerated.*/
		stat_sp?: number|null;
	}
	const enum GExterniSubjektDtoNames { ixs_esu = "ixs_esu", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", tel = "tel", mail = "mail", fax = "fax", rc = "rc", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", dat_nar = "dat_nar", pohlavi = "pohlavi", misto_nar = "misto_nar", stat_sp = "stat_sp", Permissions = "Permissions",}
	const enum GExterniSubjektDtoFragments { ixs_esu = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", tel = "*", mail = "*", fax = "*", rc = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", dat_nar = "*", pohlavi = "*", misto_nar = "*", stat_sp = "*", Permissions = "*",}
	const enum GExterniSubjektDtoTypes { ixs_esu = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", tel = "string", mail = "string", fax = "string", rc = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", dat_nar = "JsonDate", pohlavi = "number", misto_nar = "string", stat_sp = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GFotografiePodpisDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro fotografii a podpis*/
	interface GFotografiePodpisDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**MimeType fotografie*/
		mimeFotografie?: string|null;
        /**Base64 fotografie*/
		dataFotografie?: string|null;
        /**MimeType podpis*/
		mimePodpis?: string|null;
        /**Base64 podpis*/
		dataPodpis?: string|null;
	}
	const enum GFotografiePodpisDtoNames { mimeFotografie = "mimeFotografie", dataFotografie = "dataFotografie", mimePodpis = "mimePodpis", dataPodpis = "dataPodpis", Permissions = "Permissions",}
	const enum GFotografiePodpisDtoFragments { mimeFotografie = "*", dataFotografie = "*", mimePodpis = "*", dataPodpis = "*", Permissions = "*",}
	const enum GFotografiePodpisDtoTypes { mimeFotografie = "string", dataFotografie = "string", mimePodpis = "string", dataPodpis = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GHistorieLicenceDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro historie licence*/
	interface GHistorieLicenceDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_lst?: string|null;
        /**Autogenerated.*/
		zmena?: string|null;
        /**Autogenerated.*/
		editace?: number|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		nazev_ref?: string|null;
        /**Autogenerated.*/
		nazev_fun?: string|null;
        /**Autogenerated.*/
		nazev_su?: string|null;
        /**Autogenerated.*/
		readonly editace_txt?: string|null;
	}
	const enum GHistorieLicenceDtoNames { ixs_lst = "ixs_lst", zmena = "zmena", editace = "editace", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", nazev_su = "nazev_su", editace_txt = "editace_txt", Permissions = "Permissions",}
	const enum GHistorieLicenceDtoFragments { ixs_lst = "*", zmena = "*", editace = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", nazev_fun = "*", nazev_su = "*", editace_txt = "*", Permissions = "*",}
	const enum GHistorieLicenceDtoTypes { ixs_lst = "string", zmena = "string", editace = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", nazev_fun = "string", nazev_su = "string", editace_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GKatZelDrahyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO pro kategorii železniční dráhy*/
	interface GKatZelDrahyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		kat_dokladu?: number|null;
		/**Autogenerated.*/
		kat_dokladu_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		k_s?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Původní kód vzdělání kvůli poznání editace*/
		kat_dokladu_puv?: number|null;
	}
	const enum GKatZelDrahyDtoNames { kat_dokladu = "kat_dokladu", kat_dokladu_txt = "kat_dokladu_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kat_dokladu_puv = "kat_dokladu_puv", Permissions = "Permissions",}
	const enum GKatZelDrahyDtoFragments { kat_dokladu = "*", kat_dokladu_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kat_dokladu_puv = "*", Permissions = "*",}
	const enum GKatZelDrahyDtoTypes { kat_dokladu = "number", kat_dokladu_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kat_dokladu_puv = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GKatZelDrahyDtoTypeLengths { kat_dokladu_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GKontrolaDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro kontroly*/
	interface GKontrolaDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_lst?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		typ_kontr?: number|null;
        /**Autogenerated.*/
		datum?: JsonDate|null;
        /**Autogenerated.*/
		platnost_od?: JsonDate|null;
        /**Autogenerated.*/
		platnost_do?: JsonDate|null;
        /**Autogenerated.*/
		ixs_als?: string|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		typ_kontr_txt?: string|null;
        /**Autogenerated.*/
		cislo_licence?: string|null;
        /**Autogenerated.*/
		prijmeni?: string|null;
        /**Autogenerated.*/
		jmeno?: string|null;
        /**Autogenerated.*/
		dat_nar?: JsonDate|null;
	}
	const enum GKontrolaDtoNames { ixs_lst = "ixs_lst", por_cislo = "por_cislo", typ_kontr = "typ_kontr", datum = "datum", platnost_od = "platnost_od", platnost_do = "platnost_do", ixs_als = "ixs_als", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_kontr_txt = "typ_kontr_txt", cislo_licence = "cislo_licence", prijmeni = "prijmeni", jmeno = "jmeno", dat_nar = "dat_nar", Permissions = "Permissions",}
	const enum GKontrolaDtoFragments { ixs_lst = "*", por_cislo = "*", typ_kontr = "*", datum = "*", platnost_od = "*", platnost_do = "*", ixs_als = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_kontr_txt = "*", cislo_licence = "*", prijmeni = "*", jmeno = "*", dat_nar = "*", Permissions = "*",}
	const enum GKontrolaDtoTypes { ixs_lst = "string", por_cislo = "number", typ_kontr = "number", datum = "JsonDate", platnost_od = "JsonDate", platnost_do = "JsonDate", ixs_als = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_kontr_txt = "string", cislo_licence = "string", prijmeni = "string", jmeno = "string", dat_nar = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GLanovaDrahaDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro lanovou dráhu*/
	interface GLanovaDrahaDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_dld?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		model?: string|null;
        /**Autogenerated.*/
		vyrobce?: string|null;
        /**Autogenerated.*/
		ev_cislo?: string|null;
        /**Autogenerated.*/
		umisteni?: string|null;
        /**Autogenerated.*/
		platnost?: number|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GLanovaDrahaDtoNames { ixs_dld = "ixs_dld", por_cislo = "por_cislo", model = "model", vyrobce = "vyrobce", ev_cislo = "ev_cislo", umisteni = "umisteni", platnost = "platnost", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GLanovaDrahaDtoFragments { ixs_dld = "*", por_cislo = "*", model = "*", vyrobce = "*", ev_cislo = "*", umisteni = "*", platnost = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GLanovaDrahaDtoTypes { ixs_dld = "string", por_cislo = "number", model = "string", vyrobce = "string", ev_cislo = "string", umisteni = "string", platnost = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GLanovaDrahaPrukazDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro lanovou dráhu na průkazu*/
	interface GLanovaDrahaPrukazDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_lst?: string|null;
        /**Autogenerated.*/
		ixs_dld?: string|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		model?: string|null;
        /**Autogenerated.*/
		vyrobce?: string|null;
        /**Autogenerated.*/
		ev_cislo?: string|null;
        /**Autogenerated.*/
		umisteni?: string|null;
	}
	const enum GLanovaDrahaPrukazDtoNames { ixs_lst = "ixs_lst", ixs_dld = "ixs_dld", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", model = "model", vyrobce = "vyrobce", ev_cislo = "ev_cislo", umisteni = "umisteni", Permissions = "Permissions",}
	const enum GLanovaDrahaPrukazDtoFragments { ixs_lst = "*", ixs_dld = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", model = "*", vyrobce = "*", ev_cislo = "*", umisteni = "*", Permissions = "*",}
	const enum GLanovaDrahaPrukazDtoTypes { ixs_lst = "string", ixs_dld = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", model = "string", vyrobce = "string", ev_cislo = "string", umisteni = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GLicenceDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO pro licenci/PZ*/
	interface GLicenceDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixs_lst?: string|null;
		/**Autogenerated.*/
		cislo_licence?: string|null;
		/**Autogenerated.*/
		stav_licence?: number|null;
		/**Autogenerated.*/
		kat_dokladu?: number|null;
		/**Autogenerated.*/
		stav_karty?: number|null;
		/**Autogenerated.*/
		duvod_odebrani?: string|null;
		/**Autogenerated.*/
		datum_vydani?: JsonDate|null;
		/**Autogenerated.*/
		datum_uplynuti?: JsonDate|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		licenci_vydal?: string|null;
		/**Autogenerated.*/
		cislo_strojved?: string|null;
		/**Autogenerated.*/
		puvodni_pz?: string|null;
		/**Autogenerated.*/
		matersky_jazyk?: string|null;
		/**Autogenerated.*/
		stat_naroz?: number|null;
		/**Autogenerated.*/
		vnitrost_predpis?: string|null;
		/**Autogenerated.*/
		bryle?: number|null;
		/**Autogenerated.*/
		sluchove_pomucky?: number|null;
		/**Autogenerated.*/
		vzdel?: number|null;
		/**Autogenerated.*/
		vydejni_misto?: number|null;
		/**Autogenerated.*/
		kolek?: JsonDecimal|null;
		/**Autogenerated.*/
		evidencni_cislo?: string|null;
		/**Autogenerated.*/
		typ_lanovky?: string|null;
		/**Autogenerated.*/
		umisteni_lan?: string|null;
		/**Autogenerated.*/
		ixb_fot?: string|null;
		/**Autogenerated.*/
		ixb_pod?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		stav_pz?: number|null;
		/**Autogenerated.*/
		zpusob_vyroz?: number|null;
		/**Autogenerated.*/
		druhy_hv?: string|null;
		/**Autogenerated.*/
		dat_podani?: JsonDate|null;
		/**Autogenerated.*/
		dat_podani_pz?: JsonDate|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		stav_karty_txt?: string|null;
		/**Autogenerated.*/
		stav_licence_txt?: string|null;
		/**Autogenerated.*/
		stav_pz_txt?: string|null;
		/**Autogenerated.*/
		kat_dokladu_txt?: string|null;
		/**Autogenerated.*/
		typ_esu?: number|null;
		/**Autogenerated.*/
		vydejni_misto_txt?: string|null;
		/**Autogenerated.*/
		zpusob_vyroz_txt?: string|null;
		/**Zda se jedná o aktualizaci licence*/
		aktualizace_licence?: boolean|null;
		/**Datum aktualizace*/
		dat_aktualizace?: JsonDate|null;
		/**Důvod aktualizace*/
		duvod_aktualizace?: string|null;
		/**Datum zamítnutí*/
		dat_zamitnuti?: JsonDate|null;
		/**Důvod zamítnutí*/
		duvod_zamitnuti?: string|null;
		/**Datum pozastavení*/
		dat_pozastaveni?: JsonDate|null;
		/**Datum pozastavení od*/
		dat_pozastaveni_od?: JsonDate|null;
		/**Datum zadání*/
		dat_zadani?: JsonDate|null;
		/**Datum odebrání*/
		dat_odebrani?: JsonDate|null;
		/**Datum oznámení*/
		dat_oznameni?: JsonDate|null;
		/**Datum vydání duplikátu*/
		dat_vydani_duplikat?: JsonDate|null;
		/**Důvod vydání duplikátu*/
		duvod_vydani_duplikat?: string|null;
		/**Typ nepřevzetí karty*/
		typ_neprevzeti?: number|null;
		/**Jiný důvod nepřevzetí*/
		jiny_duvod_neprevzeti?: string|null;
		/**Datum ukončení pozastavení*/
		dat_ukonceni_pozastaveni?: JsonDate|null;
		/**Datum odebrání licence*/
		datum_odebrani?: JsonDate|null;
		/**Datum zákaz řízení do*/
		datum_zakaz_do?: JsonDate|null;
		/**Identifikátor licence*/
		datum_pozastaveni?: JsonDate|null;
		/**Brýle - bool*/
		pom_bryle?: boolean|null;
		/**Brýle - bool*/
		pom_sluchove_pomucky?: boolean|null;
		/**Fotka - bool*/
		readonly fotka?: boolean|null;
		/**Podpis - bool*/
		readonly podpis?: boolean|null;
		/**Pole pro číslo licence a PZ*/
		readonly cislo_lic_pz?: string|null;
		/**Pole pro stav licence a PZ*/
		readonly stav_lic_pz?: string|null;
		/**Externí subjekt*/
		externiSubjektDto?: Gordic.Rls.Interface.GExterniSubjektDto|null;
		/**Zda je povoleno editovat číslo licence*/
		editaceCislaLicence?: boolean|null;
		/**Zda je povoleno editovat stav licence*/
		editaceStavuLicence?: boolean|null;
		/**Zda je povoleno editovat stav karty*/
		editaceStavuKarty?: boolean|null;
		/**Zda je povoleno editovat evidenční číslo*/
		editaceEvidencniCislo?: boolean|null;
		/**Zda je povoleno editovat kategorii dráhy (dokladu)*/
		editaceKategorieDokladu?: boolean|null;
		/**zda je v příloze nalezena fotka či podpis*/
		prilohaFoto?: boolean|null;
		/**Obraz fotky Base64*/
		foto64?: string|null;
		/**Obraz podpis Base64*/
		podpis64?: string|null;
	}
	const enum GLicenceDtoNames { ixs_lst = "ixs_lst", cislo_licence = "cislo_licence", stav_licence = "stav_licence", kat_dokladu = "kat_dokladu", stav_karty = "stav_karty", duvod_odebrani = "duvod_odebrani", datum_vydani = "datum_vydani", datum_uplynuti = "datum_uplynuti", ixs_esu = "ixs_esu", licenci_vydal = "licenci_vydal", cislo_strojved = "cislo_strojved", puvodni_pz = "puvodni_pz", matersky_jazyk = "matersky_jazyk", stat_naroz = "stat_naroz", vnitrost_predpis = "vnitrost_predpis", bryle = "bryle", sluchove_pomucky = "sluchove_pomucky", vzdel = "vzdel", vydejni_misto = "vydejni_misto", kolek = "kolek", evidencni_cislo = "evidencni_cislo", typ_lanovky = "typ_lanovky", umisteni_lan = "umisteni_lan", ixb_fot = "ixb_fot", ixb_pod = "ixb_pod", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_pz = "stav_pz", zpusob_vyroz = "zpusob_vyroz", druhy_hv = "druhy_hv", dat_podani = "dat_podani", dat_podani_pz = "dat_podani_pz", jmeno = "jmeno", prijmeni = "prijmeni", rc = "rc", stav_karty_txt = "stav_karty_txt", stav_licence_txt = "stav_licence_txt", stav_pz_txt = "stav_pz_txt", kat_dokladu_txt = "kat_dokladu_txt", typ_esu = "typ_esu", vydejni_misto_txt = "vydejni_misto_txt", zpusob_vyroz_txt = "zpusob_vyroz_txt", aktualizace_licence = "aktualizace_licence", dat_aktualizace = "dat_aktualizace", duvod_aktualizace = "duvod_aktualizace", dat_zamitnuti = "dat_zamitnuti", duvod_zamitnuti = "duvod_zamitnuti", dat_pozastaveni = "dat_pozastaveni", dat_pozastaveni_od = "dat_pozastaveni_od", dat_zadani = "dat_zadani", dat_odebrani = "dat_odebrani", dat_oznameni = "dat_oznameni", dat_vydani_duplikat = "dat_vydani_duplikat", duvod_vydani_duplikat = "duvod_vydani_duplikat", typ_neprevzeti = "typ_neprevzeti", jiny_duvod_neprevzeti = "jiny_duvod_neprevzeti", dat_ukonceni_pozastaveni = "dat_ukonceni_pozastaveni", datum_odebrani = "datum_odebrani", datum_zakaz_do = "datum_zakaz_do", datum_pozastaveni = "datum_pozastaveni", pom_bryle = "pom_bryle", pom_sluchove_pomucky = "pom_sluchove_pomucky", fotka = "fotka", podpis = "podpis", cislo_lic_pz = "cislo_lic_pz", stav_lic_pz = "stav_lic_pz", externiSubjektDto = "externiSubjektDto", editaceCislaLicence = "editaceCislaLicence", editaceStavuLicence = "editaceStavuLicence", editaceStavuKarty = "editaceStavuKarty", editaceEvidencniCislo = "editaceEvidencniCislo", editaceKategorieDokladu = "editaceKategorieDokladu", prilohaFoto = "prilohaFoto", foto64 = "foto64", podpis64 = "podpis64", Permissions = "Permissions",}
	const enum GLicenceDtoFragments { ixs_lst = "*", cislo_licence = "*", stav_licence = "*", kat_dokladu = "*", stav_karty = "*", duvod_odebrani = "*", datum_vydani = "*", datum_uplynuti = "*", ixs_esu = "*", licenci_vydal = "*", cislo_strojved = "*", puvodni_pz = "*", matersky_jazyk = "*", stat_naroz = "*", vnitrost_predpis = "*", bryle = "*", sluchove_pomucky = "*", vzdel = "*", vydejni_misto = "*", kolek = "*", evidencni_cislo = "*", typ_lanovky = "*", umisteni_lan = "*", ixb_fot = "*", ixb_pod = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav_pz = "*", zpusob_vyroz = "*", druhy_hv = "*", dat_podani = "*", dat_podani_pz = "*", jmeno = "*", prijmeni = "*", rc = "*", stav_karty_txt = "*", stav_licence_txt = "*", stav_pz_txt = "*", kat_dokladu_txt = "*", typ_esu = "*", vydejni_misto_txt = "*", zpusob_vyroz_txt = "*", aktualizace_licence = "*", dat_aktualizace = "*", duvod_aktualizace = "*", dat_zamitnuti = "*", duvod_zamitnuti = "*", dat_pozastaveni = "*", dat_pozastaveni_od = "*", dat_zadani = "*", dat_odebrani = "*", dat_oznameni = "*", dat_vydani_duplikat = "*", duvod_vydani_duplikat = "*", typ_neprevzeti = "*", jiny_duvod_neprevzeti = "*", dat_ukonceni_pozastaveni = "*", datum_odebrani = "*", datum_zakaz_do = "*", datum_pozastaveni = "*", pom_bryle = "*", pom_sluchove_pomucky = "*", fotka = "*", podpis = "*", cislo_lic_pz = "*", stav_lic_pz = "*", externiSubjektDto = "*", editaceCislaLicence = "*", editaceStavuLicence = "*", editaceStavuKarty = "*", editaceEvidencniCislo = "*", editaceKategorieDokladu = "*", prilohaFoto = "*", foto64 = "*", podpis64 = "*", Permissions = "*",}
	const enum GLicenceDtoTypes { ixs_lst = "string", cislo_licence = "string", stav_licence = "number", kat_dokladu = "number", stav_karty = "number", duvod_odebrani = "string", datum_vydani = "JsonDate", datum_uplynuti = "JsonDate", ixs_esu = "string", licenci_vydal = "string", cislo_strojved = "string", puvodni_pz = "string", matersky_jazyk = "string", stat_naroz = "number", vnitrost_predpis = "string", bryle = "number", sluchove_pomucky = "number", vzdel = "number", vydejni_misto = "number", kolek = "JsonDecimal", evidencni_cislo = "string", typ_lanovky = "string", umisteni_lan = "string", ixb_fot = "string", ixb_pod = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_pz = "number", zpusob_vyroz = "number", druhy_hv = "string", dat_podani = "JsonDate", dat_podani_pz = "JsonDate", jmeno = "string", prijmeni = "string", rc = "string", stav_karty_txt = "string", stav_licence_txt = "string", stav_pz_txt = "string", kat_dokladu_txt = "string", typ_esu = "number", vydejni_misto_txt = "string", zpusob_vyroz_txt = "string", aktualizace_licence = "boolean", dat_aktualizace = "JsonDate", duvod_aktualizace = "string", dat_zamitnuti = "JsonDate", duvod_zamitnuti = "string", dat_pozastaveni = "JsonDate", dat_pozastaveni_od = "JsonDate", dat_zadani = "JsonDate", dat_odebrani = "JsonDate", dat_oznameni = "JsonDate", dat_vydani_duplikat = "JsonDate", duvod_vydani_duplikat = "string", typ_neprevzeti = "number", jiny_duvod_neprevzeti = "string", dat_ukonceni_pozastaveni = "JsonDate", datum_odebrani = "JsonDate", datum_zakaz_do = "JsonDate", datum_pozastaveni = "JsonDate", pom_bryle = "boolean", pom_sluchove_pomucky = "boolean", fotka = "boolean", podpis = "boolean", cislo_lic_pz = "string", stav_lic_pz = "string", externiSubjektDto = "Gordic.Rls.Interface.GExterniSubjektDto", editaceCislaLicence = "boolean", editaceStavuLicence = "boolean", editaceStavuKarty = "boolean", editaceEvidencniCislo = "boolean", editaceKategorieDokladu = "boolean", prilohaFoto = "boolean", foto64 = "string", podpis64 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GLicenceDtoTypeLengths { ixs_lst = 12, cislo_licence = 12, duvod_odebrani = 254, ixs_esu = 12, evidencni_cislo = 20, ixb_fot = 12, ixb_pod = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GLogLicenceDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro log licence*/
	interface GLogLicenceDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		typ_akce_rls?: number|null;
        /**Autogenerated.*/
		ixs_lst?: string|null;
        /**Autogenerated.*/
		popis?: string|null;
        /**Autogenerated.*/
		pocet?: number|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		typ_akce_rls_txt?: string|null;
        /**Autogenerated.*/
		nazev_fun?: string|null;
        /**Autogenerated.*/
		nazev_ref?: string|null;
        /**Autogenerated.*/
		cislo_licence?: string|null;
	}
	const enum GLogLicenceDtoNames { typ_akce_rls = "typ_akce_rls", ixs_lst = "ixs_lst", popis = "popis", pocet = "pocet", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_akce_rls_txt = "typ_akce_rls_txt", nazev_fun = "nazev_fun", nazev_ref = "nazev_ref", cislo_licence = "cislo_licence", Permissions = "Permissions",}
	const enum GLogLicenceDtoFragments { typ_akce_rls = "*", ixs_lst = "*", popis = "*", pocet = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", typ_akce_rls_txt = "*", nazev_fun = "*", nazev_ref = "*", cislo_licence = "*", Permissions = "*",}
	const enum GLogLicenceDtoTypes { typ_akce_rls = "number", ixs_lst = "string", popis = "string", pocet = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_akce_rls_txt = "string", nazev_fun = "string", nazev_ref = "string", cislo_licence = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GObjednavkaDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro objednávky*/
	interface GObjednavkaDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_okl?: string|null;
        /**Autogenerated.*/
		cislo_objednavky?: string|null;
        /**Autogenerated.*/
		stav_obj?: number|null;
        /**Autogenerated.*/
		datum_vytvoreni?: JsonDate|null;
        /**Autogenerated.*/
		datum_odeslani?: JsonDate|null;
        /**Autogenerated.*/
		datum_potvrzeni?: JsonDate|null;
        /**Autogenerated.*/
		datum_doruceni?: JsonDate|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**stav_obj_txt*/
		stav_obj_txt?: string|null;
        /**pocet_licenci*/
		pocet_licenci?: number|null;
	}
	const enum GObjednavkaDtoNames { ixs_okl = "ixs_okl", cislo_objednavky = "cislo_objednavky", stav_obj = "stav_obj", datum_vytvoreni = "datum_vytvoreni", datum_odeslani = "datum_odeslani", datum_potvrzeni = "datum_potvrzeni", datum_doruceni = "datum_doruceni", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_obj_txt = "stav_obj_txt", pocet_licenci = "pocet_licenci", Permissions = "Permissions",}
	const enum GObjednavkaDtoFragments { ixs_okl = "*", cislo_objednavky = "*", stav_obj = "*", datum_vytvoreni = "*", datum_odeslani = "*", datum_potvrzeni = "*", datum_doruceni = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav_obj_txt = "*", pocet_licenci = "*", Permissions = "*",}
	const enum GObjednavkaDtoTypes { ixs_okl = "string", cislo_objednavky = "string", stav_obj = "number", datum_vytvoreni = "JsonDate", datum_odeslani = "JsonDate", datum_potvrzeni = "JsonDate", datum_doruceni = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_obj_txt = "string", pocet_licenci = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GOrezavatkoDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro ořezávátko*/
	interface GOrezavatkoDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Image žádost*/
		imageZadost?: string|null;
        /**Název žádost*/
		nazevZadost?: string|null;
        /**Šířka obrázku*/
		sirkaObrazku?: number|null;
        /**Výška obrázku*/
		vyskaObrazku?: number|null;
        /**Base64 fotografie*/
		dataFotografie?: string|null;
        /**Base64 podpis*/
		dataPodpis?: string|null;
        /**Zda je vyplněna fotografie a podpis*/
		jeFotografiePodpis?: boolean|null;
        /**ramecekFotkaSirkaMin*/
		ramecekFotkaSirkaMin?: number|null;
        /**ramecekFotkaSirka*/
		ramecekFotkaSirka?: number|null;
        /**ramecekFotkaVyskaMin*/
		ramecekFotkaVyskaMin?: number|null;
        /**ramecekFotkaVyska*/
		ramecekFotkaVyska?: number|null;
        /**ramecekFotkaX*/
		ramecekFotkaX?: number|null;
        /**ramecekFotkaY*/
		ramecekFotkaY?: number|null;
        /**ramecekPodpisSirkaMin*/
		ramecekPodpisSirkaMin?: number|null;
        /**ramecekPodpisSirka*/
		ramecekPodpisSirka?: number|null;
        /**ramecekPodpisVyskaMin*/
		ramecekPodpisVyskaMin?: number|null;
        /**ramecekPodpisVyska*/
		ramecekPodpisVyska?: number|null;
        /**ramecekPodpisX*/
		ramecekPodpisX?: number|null;
        /**ramecekPodpisY*/
		ramecekPodpisY?: number|null;
	}
	const enum GOrezavatkoDtoNames { imageZadost = "imageZadost", nazevZadost = "nazevZadost", sirkaObrazku = "sirkaObrazku", vyskaObrazku = "vyskaObrazku", dataFotografie = "dataFotografie", dataPodpis = "dataPodpis", jeFotografiePodpis = "jeFotografiePodpis", ramecekFotkaSirkaMin = "ramecekFotkaSirkaMin", ramecekFotkaSirka = "ramecekFotkaSirka", ramecekFotkaVyskaMin = "ramecekFotkaVyskaMin", ramecekFotkaVyska = "ramecekFotkaVyska", ramecekFotkaX = "ramecekFotkaX", ramecekFotkaY = "ramecekFotkaY", ramecekPodpisSirkaMin = "ramecekPodpisSirkaMin", ramecekPodpisSirka = "ramecekPodpisSirka", ramecekPodpisVyskaMin = "ramecekPodpisVyskaMin", ramecekPodpisVyska = "ramecekPodpisVyska", ramecekPodpisX = "ramecekPodpisX", ramecekPodpisY = "ramecekPodpisY", Permissions = "Permissions",}
	const enum GOrezavatkoDtoFragments { imageZadost = "*", nazevZadost = "*", sirkaObrazku = "*", vyskaObrazku = "*", dataFotografie = "*", dataPodpis = "*", jeFotografiePodpis = "*", ramecekFotkaSirkaMin = "*", ramecekFotkaSirka = "*", ramecekFotkaVyskaMin = "*", ramecekFotkaVyska = "*", ramecekFotkaX = "*", ramecekFotkaY = "*", ramecekPodpisSirkaMin = "*", ramecekPodpisSirka = "*", ramecekPodpisVyskaMin = "*", ramecekPodpisVyska = "*", ramecekPodpisX = "*", ramecekPodpisY = "*", Permissions = "*",}
	const enum GOrezavatkoDtoTypes { imageZadost = "string", nazevZadost = "string", sirkaObrazku = "number", vyskaObrazku = "number", dataFotografie = "string", dataPodpis = "string", jeFotografiePodpis = "boolean", ramecekFotkaSirkaMin = "number", ramecekFotkaSirka = "number", ramecekFotkaVyskaMin = "number", ramecekFotkaVyska = "number", ramecekFotkaX = "number", ramecekFotkaY = "number", ramecekPodpisSirkaMin = "number", ramecekPodpisSirka = "number", ramecekPodpisVyskaMin = "number", ramecekPodpisVyska = "number", ramecekPodpisX = "number", ramecekPodpisY = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GPrestupkyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**Dto pro prestupky*/
	interface GPrestupkyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**identifikator licence*/
		ixs_lst?: string|null;
		/**typ prestupku*/
		typ_prestupku?: number|null;
		/**datum spachani*/
		datum_spachani?: JsonDate|null;
		/**poznamka*/
		poznamka?: string|null;
		/**stav*/
		stav?: number|null;
		/**datumy spachani predchozich*/
		datumy_spachani?: string|null;
		/**sloucene poznamky*/
		poznamky?: string|null;
	}
	const enum GPrestupkyDtoNames { ixs_lst = "ixs_lst", typ_prestupku = "typ_prestupku", datum_spachani = "datum_spachani", poznamka = "poznamka", stav = "stav", datumy_spachani = "datumy_spachani", poznamky = "poznamky", Permissions = "Permissions",}
	const enum GPrestupkyDtoFragments { ixs_lst = "*", typ_prestupku = "*", datum_spachani = "*", poznamka = "*", stav = "*", datumy_spachani = "*", poznamky = "*", Permissions = "*",}
	const enum GPrestupkyDtoTypes { ixs_lst = "string", typ_prestupku = "number", datum_spachani = "JsonDate", poznamka = "string", stav = "number", datumy_spachani = "string", poznamky = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrestupkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GPripojitSpisDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro připojení spisu*/
	interface GPripojitSpisDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Identifikátor spisu*/
		ixp?: string|null;
        /**Identifikátor licence*/
		ixs_lst?: string|null;
        /**Číslo licence*/
		cislo_licence?: string|null;
        /**Druh akce*/
		druh_akce?: number|null;
        /**Datum akce*/
		datum_akce?: JsonDate|null;
        /**Rodné číslo*/
		rodne_cislo?: string|null;
        /**Příjmení*/
		prijmeni?: string|null;
        /**Jméno*/
		jmeno?: string|null;
        /**Počet nalezených záznamů*/
		pocet?: number|null;
        /**Zda existuje SPR řízení*/
		je_spr_rizeni?: boolean|null;
	}
	const enum GPripojitSpisDtoNames { ixp = "ixp", ixs_lst = "ixs_lst", cislo_licence = "cislo_licence", druh_akce = "druh_akce", datum_akce = "datum_akce", rodne_cislo = "rodne_cislo", prijmeni = "prijmeni", jmeno = "jmeno", pocet = "pocet", je_spr_rizeni = "je_spr_rizeni", Permissions = "Permissions",}
	const enum GPripojitSpisDtoFragments { ixp = "*", ixs_lst = "*", cislo_licence = "*", druh_akce = "*", datum_akce = "*", rodne_cislo = "*", prijmeni = "*", jmeno = "*", pocet = "*", je_spr_rizeni = "*", Permissions = "*",}
	const enum GPripojitSpisDtoTypes { ixp = "string", ixs_lst = "string", cislo_licence = "string", druh_akce = "number", datum_akce = "JsonDate", rodne_cislo = "string", prijmeni = "string", jmeno = "string", pocet = "number", je_spr_rizeni = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GSpisLicenceDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO pro spis licence*/
	interface GSpisLicenceDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		misto_vzniku?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		vlastnik?: string|null;
		/**Autogenerated.*/
		doctype_bitmap?: number|null;
	}
	const enum GSpisLicenceDtoNames { ixp = "ixp", akt_znacka = "akt_znacka", misto_vzniku = "misto_vzniku", nazev = "nazev", dat_pod = "dat_pod", vlastnik = "vlastnik", doctype_bitmap = "doctype_bitmap", Permissions = "Permissions",}
	const enum GSpisLicenceDtoFragments { ixp = "*", akt_znacka = "*", misto_vzniku = "*", nazev = "*", dat_pod = "*", vlastnik = "*", doctype_bitmap = "*", Permissions = "*",}
	const enum GSpisLicenceDtoTypes { ixp = "string", akt_znacka = "string", misto_vzniku = "string", nazev = "string", dat_pod = "JsonDate", vlastnik = "string", doctype_bitmap = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GSubjektZkouskyDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro subjekt pro zkoušky*/
	interface GSubjektZkouskyDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixs_skz?: string|null;
        /**Autogenerated.*/
		ixs_esu?: string|null;
        /**Autogenerated.*/
		popis?: string|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		prijmeni?: string|null;
        /**Autogenerated.*/
		jmeno?: string|null;
	}
	const enum GSubjektZkouskyDtoNames { ixs_skz = "ixs_skz", ixs_esu = "ixs_esu", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prijmeni = "prijmeni", jmeno = "jmeno", Permissions = "Permissions",}
	const enum GSubjektZkouskyDtoFragments { ixs_skz = "*", ixs_esu = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prijmeni = "*", jmeno = "*", Permissions = "*",}
	const enum GSubjektZkouskyDtoTypes { ixs_skz = "string", ixs_esu = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prijmeni = "string", jmeno = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GVzdelaniDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DTO pro vzdělání*/
	interface GVzdelaniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		vzdel?: number|null;
		/**Autogenerated.*/
		vzdel_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		k_s?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Původní kód vzdělání kvůli poznání editace*/
		vzdel_puv?: number|null;
	}
	const enum GVzdelaniDtoNames { vzdel = "vzdel", vzdel_txt = "vzdel_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", vzdel_puv = "vzdel_puv", Permissions = "Permissions",}
	const enum GVzdelaniDtoFragments { vzdel = "*", vzdel_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", vzdel_puv = "*", Permissions = "*",}
	const enum GVzdelaniDtoTypes { vzdel = "number", vzdel_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", vzdel_puv = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GVzdelaniDtoTypeLengths { vzdel_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\GZadostFormularDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DTO pro formuláře žádostí*/
	interface GZadostFormularDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Image žádost*/
		imageZadost?: string|null;
        /**Název žádost*/
		nazevZadost?: string|null;
	}
	const enum GZadostFormularDtoNames { imageZadost = "imageZadost", nazevZadost = "nazevZadost", Permissions = "Permissions",}
	const enum GZadostFormularDtoFragments { imageZadost = "*", nazevZadost = "*", Permissions = "*",}
	const enum GZadostFormularDtoTypes { imageZadost = "string", nazevZadost = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GGinsesuDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:ginsesu
	*      Externí subjekt
	*/
	interface GGinsesuDto {
		/**Externí subjekt*/
		ixs_esu?: string|null;
		/**Licence databáze kde byl záznam založen*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Historický pozůstatek, má vždy hodnotu 111*/
		arw?: number|null;
		/**Poznámka k externímu subjektu*/
		poznamka?: string|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Zkratka 
		*      Zkratka externího subjektu používaná při vyhledávání
		*/
		zkratka?: string|null;
		/**Název subjektu*/
		nazev?: string|null;
		/**Obchodníá jméno*/
		ob_jmeno?: string|null;
		/**Typ subjektu*/
		typ_esu?: number|null;
		/**Úroveň ověření*/
		stupen_ver?: number|null;
		/**Nadřízený*/
		ixs_nad?: string|null;
		/**Stát
		*      Stát
		*/
		stat?: number|null;
		/**PSČ*/
		psc?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		cast_obce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cor?: string|null;
		/**Číslo popisné*/
		cpop?: string|null;
		/**IČO*/
		ico?: string|null;
		/**DIČ*/
		dic?: string|null;
		/**Telefon*/
		tel?: string|null;
		/**Mailová adresa*/
		mail?: string|null;
		/**Fax*/
		fax?: string|null;
		/**Identifikátor spisového uzlu, který pořídil záznam*/
		ixs_su?: string|null;
		/**Nepoužívá se*/
		priz_eko?: number|null;
		/**Interní subjekt*/
		priz_int?: number|null;
		/**Počet podřízených externích subjektů*/
		num_pod?: number|null;
		/**Počet zástupných osob v tabulce gindesu*/
		num_zast?: number|null;
		/**Sloupec s názvem pro české hledání*/
		cs_nazev?: string|null;
		/**Sloupec se zkratkou pro české hledání*/
		cs_zkratka?: string|null;
		/**Typ organizace*/
		typ_org?: number|null;
		/**Aplikačně neplnit, souvisí s replikacemi*/
		dat_mpd?: JsonDate|null;
		/**Sloupec s ulicí pro české hledání*/
		cs_ulice?: string|null;
		/**Sloupec s obcí pro české hledání*/
		cs_obec?: string|null;
		/**Skládaný tvar externího subjektu získaný pomocí procedury xsp_get_esu_txt*/
		esu_txt?: string|null;
		/**Rodné číslo pro fyzickou osobu*/
		rc?: string|null;
		/**Identifikátor aktuální verze externího subjektu
		*      Pokud je záznam aktivní obsahuje ixs_esu, pokud je napojen na jiný externí subjekt, obsahuje jeho ixs_esu a jeho aktivita je 500 (používá se při napojování nepoužívaných nebo duplicitně pořízených záznamů). Použití v aplikacích. 
		*      Tento sloupec v tabulce slouží k napojování záznamů v tabulce externích subjektů, u nichž je zřejmé, že jde o jeden externí
		*      subjekt(adresát se přestěhoval, adresa není validně naplněna a podobně).
		*      Dále je tento sloupec použit, když je při opravě externího subjektu zásadně změněna adresa.
		*/
		ixs_prev?: string|null;
		/**Jméno pro fyzickou osobu*/
		jmeno?: string|null;
		/**Příjmení pro fyzickou osobu*/
		prijmeni?: string|null;
		/**Titul před jménem pro fyzickou osobu*/
		tit_pred?: string|null;
		/**Titul za jménem pro fyzickou osobu*/
		tit_za?: string|null;
		/**Popis POBoxu*/
		pobox?: string|null;
		/**Řádek obálkové adresy*/
		st1?: string|null;
		/**Řádek obálkové adresy*/
		st2?: string|null;
		/**Řádek obálkové adresy*/
		st3?: string|null;
		/**Řádek obálkové adresy*/
		st4?: string|null;
		/**Řádek obálkové adresy*/
		st5?: string|null;
		/**Řádek obálkové adresy*/
		st6?: string|null;
		/**Řádek obálkové adresy*/
		st7?: string|null;
		/**Odkaz na subjekt, ze kterého vznikl. Použití v aplikacích
		*      Slouží k vysledování provedených změn na externím subjektu (pokud byl opravován). Má hodnotu ixs_esu subjektu, z něhož vznikl.
		*/
		ixs_puv?: string|null;
		ixs_obj?: string|null;
		ixs_adr?: string|null;
		ixs_org?: string|null;
		ixs_oso?: string|null;
		/**Identifikátor ekonomického subjektu
		*      Externí subjekty, které považujeme za jeden ekonomický budou mít ixs_eko stejný, naplněný identifikátorem
		*       "nejnosnějšího nebo nejhlavnějšího".
		*     Při ekonomickém „napojování“ externích subjektů se updatují jejich ixs_eko na hodnotu ixs_eko subjektu na nějž
		*      jsou napojovány.
		*     Při vytváření subjektu se zkontroluje, zda neexistuje IČO (nebo RČ) v databázi – pokud ano, bude ixs_eko naplněn
		*     hodnotou jakou mají ostatní subjekty se stejným IČO (nebo RČ), pokud není naplněno IČO má vytvářený subjekt
		*     ixs_eko = ixs_esu.
		*     Při klasickém napojování (napojení pomocí ixs_prev modulem ADK, opravě subjektu, ... ) je provedeno vždy i ekonomické
		*     napojení.
		*     Kontrolní chod (ADT script) může provede spojení externích subjektů, které mají stejné IČO (nebo RČ) pomocí ixs_eko.
		*/
		ixs_eko?: string|null;
		/**Úroveň přístupu k ESU
		*      Slouží k oddělení množin ESU. Tím je myšleno nastavení viditelnosti a editovatelnosti ESU pro jednotlivé agendy. Použití může být
		*      následující:
		*                    Personalisté chtějí vidět ESU s ur_pri = 1 nebo ur_pri = 0 a opravovat(a vytvářet) subjekty s ur_pri = 1 a ur_pri = 0.
		*      Spisovkáři smějí vidět ESU s ur_pri = 1 a smějí opravovat ESU s ur_pri = 1 - tzn.nevidí ESU pořízené PER(a nemohou je opravovat).
		*      Administrátor smí vidět ESU s ur_pri = 1 a ur_pri = 0 a opravovat smí jen s ur_pri = 1.
		*      Při klasickém napojování(napojení pomocí ixs_prev modulem ADK, opravě subjektu, ... ) je provedeno vždy i ekonomické
		*      napojení.
		*      Kontrolní chod (ADT script) může provede spojení externích subjektů, které mají stejné IČO (nebo RČ) pomocí ixs_eko.
		*      Tato funkčnost je řízena parametry:
		*      gin_rad_esusaGIN ESU - Úroveň přístupu k externím subjektům (editace) gin_rad_esusapGIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení)
		*      Šlo jenom o jednoduchý způsob použití, nastavení parametrů je možno kombinovat tím zabezpečit obsluhu na míru jednotlivým organizacím.
		*      Kromě těchto parametrů, je možné nastavit i parametr pro Externí systém (v modulu INT) pro dávky ESU - nově vytvořené ESU budou mít
		*      potom úroveň přístupu uvedenou v tomto parametru.
		*/
		ur_pri?: number|null;
		/**Identifikace v rámci UIR (územně identifikačního registru)*/
		adresa_kod?: string|null;
		/**Příznak plátce DPH*/
		priz_dph?: number|null;
		/**Řádek obálkové adresy*/
		st0?: string|null;
		/**Počítačové číslo osoby*/
		pco?: number|null;
		/**Příznak, že byl ESU založen INTem*/
		z_int?: number|null;
		/**Typ agendy, která subjekt založila*/
		typ_ag?: number|null;
		/**Příznak, že se při opravě subjektu nemá aktualizovat obálková adresa*/
		neakt_oba_int?: number|null;
		/**Datum narození fyzické osoby
		*      Sloupec je vypočítávaný z hodnoty sloupce rc.
		*/
		dat_nar?: JsonDate|null;
		/**Bezvýznamový identifikátor
		*      Používá prozatím modul POD v souvislosti s elektronickým podáním.
		*/
		bio?: JsonDecimal|null;
		/**URL*/
		url?: string|null;
		typ_upadku?: number|null;
		dat_akt_rob?: JsonDate|null;
		kod_o?: number|null;
		stat_sp?: number|null;
		gps_sirka?: string|null;
		gps_delka?: string|null;
		priz_umrti?: number|null;
		dat_umrti?: JsonDate|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Osobní číslo*/
		oc?: string|null;
		pohlavi?: number|null;
		rod_stav?: number|null;
		/**Typ adresy*/
		typ_adr?: number|null;
		s_pruk?: number|null;
		rod_prijmeni?: string|null;
		misto_nar?: string|null;
		prezdivka?: string|null;
		ixs_esu_zam?: string|null;
		/**ID datové schránky*/
		id_ds?: string|null;
		/**ID schránky GEX (obdoba datových schránek, používá jen určitá množina VIP zákazníků)*/
		id_gex?: string|null;
		partner_uct?: string|null;
		mi_jmeno?: string|null;
		mi_prijmeni?: string|null;
		up_nazev?: string|null;
		up_prijmeni?: string|null;
		/**EUID
		*      identifikační kód uvedený v čl. 3 odst. 1 směrnice Evropského parlamentu a Rady 2009/101/ES (1);
		*/
		euid?: string|null;
		/**LEI
		*      identifikační kód právnické osoby uvedený v prováděcím nařízení Komise (EU) č. 1247/2012 (2);
		*/
		lei?: string|null;
		/**EORI
		*      registrační a identifikační číslo hospodářských subjektů (EORI) uvedené v prováděcím nařízení Komise (EU) č. 1352/2013 (3);
		*/
		eori?: string|null;
		/**SEEDID
		*      číslo pro účely spotřebních daní stanovené v čl. 2 bodu 12 nařízení Rady (ES) č. 389/2012 (4).
		*/
		seed_id?: string|null;
		/**SK_EDESK_ID
		*      Slovenské datové schránky - ID schránky (mají 2 ID - RČ/IČ a toto ID) - hodnota např. E0005188929
		*/
		sk_edesk_id?: string|null;
		/**ID_EU
		*      ID EU / BSI – Bezvýznamový směrový identifikátor - identifikátor pro přeshraniční komunikaci, obvykle neměnný např. CZ/ES/b5e81148-2bd1-4f44-ba75-0c0359d3be7d
		*/
		id_eu?: string|null;
	}
	const enum GGinsesuDtoNames { ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixs_lpc = "ixs_lpc", oc = "oc", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", s_pruk = "s_pruk", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_ds = "id_ds", id_gex = "id_gex", partner_uct = "partner_uct", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", up_nazev = "up_nazev", up_prijmeni = "up_prijmeni", euid = "euid", lei = "lei", eori = "eori", seed_id = "seed_id", sk_edesk_id = "sk_edesk_id", id_eu = "id_eu",}
	const enum GGinsesuDtoFragments { ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", ixs_lpc = "*", oc = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", s_pruk = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_ds = "*", id_gex = "*", partner_uct = "*", mi_jmeno = "*", mi_prijmeni = "*", up_nazev = "*", up_prijmeni = "*", euid = "*", lei = "*", eori = "*", seed_id = "*", sk_edesk_id = "*", id_eu = "*",}
	const enum GGinsesuDtoTypes { ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", ixs_lpc = "string", oc = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", s_pruk = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_ds = "string", id_gex = "string", partner_uct = "string", mi_jmeno = "string", mi_prijmeni = "string", up_nazev = "string", up_prijmeni = "string", euid = "string", lei = "string", eori = "string", seed_id = "string", sk_edesk_id = "string", id_eu = "string",}
	const enum GGinsesuDtoTypeLengths { ixs_esu = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, ob_jmeno = 2000, ixs_nad = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, tel = 33, mail = 254, fax = 33, ixs_su = 12, cs_nazev = 100, cs_zkratka = 16, cs_ulice = 48, cs_obec = 48, esu_txt = 254, rc = 10, ixs_prev = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, pobox = 8, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, ixs_puv = 12, ixs_obj = 12, ixs_adr = 12, ixs_org = 12, ixs_oso = 12, ixs_eko = 12, adresa_kod = 10, st0 = 50, url = 254, gps_sirka = 12, gps_delka = 12, ixs_lpc = 12, oc = 30, rod_prijmeni = 100, misto_nar = 48, prezdivka = 254, ixs_esu_zam = 12, id_ds = 100, id_gex = 100, partner_uct = 10, mi_jmeno = 100, mi_prijmeni = 100, up_nazev = 100, up_prijmeni = 100, euid = 20, lei = 30, eori = 20, seed_id = 20, sk_edesk_id = 12, id_eu = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlscspzDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscspz
	*      Stav pokusu o zkoušku
	*/
	interface GRlscspzDto {
		/**Identifikátor*/
		stav_spz?: number|null;
		/**stav_spz_txt*/
		stav_spz_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
		/**k_xml*/
		k_xml?: string|null;
	}
	const enum GRlscspzDtoNames { stav_spz = "stav_spz", stav_spz_txt = "stav_spz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GRlscspzDtoFragments { stav_spz = "Base", stav_spz_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base",}
	const enum GRlscspzDtoTypes { stav_spz = "number", stav_spz_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GRlscspzDtoTypeLengths { stav_spz_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlscszkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscszk
	*      Stav žádosti o zkoušku
	*/
	interface GRlscszkDto {
		/**Identifikátor*/
		stav_zzk?: number|null;
		/**stav_zzk_txt*/
		stav_zzk_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
		/**k_xml*/
		k_xml?: string|null;
	}
	const enum GRlscszkDtoNames { stav_zzk = "stav_zzk", stav_zzk_txt = "stav_zzk_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GRlscszkDtoFragments { stav_zzk = "Base", stav_zzk_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base",}
	const enum GRlscszkDtoTypes { stav_zzk = "number", stav_zzk_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GRlscszkDtoTypeLengths { stav_zzk_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlsdkzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsdkzk
	*      Podkategorie zkoušek
	*/
	interface GRlsdkzkDto {
		/**Identifikátor*/
		ixs_kzk?: string|null;
		/**por_cis_kzk*/
		por_cis_kzk?: number|null;
		/**kod*/
		kod?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Datum platnosti*/
		dat_plat_od?: JsonDate|null;
		/**Datum platnosti*/
		dat_plat_do?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRlsdkzkDtoNames { ixs_kzk = "ixs_kzk", por_cis_kzk = "por_cis_kzk", kod = "kod", nazev = "nazev", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsdkzkDtoFragments { ixs_kzk = "Base", por_cis_kzk = "Base", kod = "Base", nazev = "Base", dat_plat_od = "Base", dat_plat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsdkzkDtoTypes { ixs_kzk = "string", por_cis_kzk = "number", kod = "string", nazev = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsdkzkDtoTypeLengths { ixs_kzk = 12, kod = 20, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlsdzzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsdzzk
	*      Nominace, pokusy a absolvování termínu zkoušky
	*/
	interface GRlsdzzkDto {
		/**Identifikátor*/
		ixs_zzk?: string|null;
		/**por_cis_zzk*/
		por_cis_zzk?: number|null;
		/**ixp_zad*/
		ixp_zad?: string|null;
		/**stav_spz*/
		stav_spz?: number|null;
		/**ixs_tzk*/
		ixs_tzk?: string|null;
		/**Datum platnosti*/
		dat_plat_do?: JsonDate|null;
		/**s_tp_nom*/
		s_tp_nom?: number|null;
		/**s_tu_nom*/
		s_tu_nom?: number|null;
		/**s_pra_nom*/
		s_pra_nom?: number|null;
		/**tp_body*/
		tp_body?: number|null;
		/**tp_body_max*/
		tp_body_max?: number|null;
		/**s_usp_tp*/
		s_usp_tp?: number|null;
		/**tu_zadani1*/
		tu_zadani1?: string|null;
		/**tu_body1*/
		tu_body1?: number|null;
		/**tu_zadani2*/
		tu_zadani2?: string|null;
		/**tu_body2*/
		tu_body2?: number|null;
		/**tu_zadani3*/
		tu_zadani3?: string|null;
		/**tu_body3*/
		tu_body3?: number|null;
		/**tu_body_max*/
		tu_body_max?: number|null;
		/**s_usp_tu*/
		s_usp_tu?: number|null;
		/**s_pra*/
		s_pra?: number|null;
		/**s_usp_celk*/
		s_usp_celk?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ixp_vysl*/
		ixp_vysl?: string|null;
	}
	const enum GRlsdzzkDtoNames { ixs_zzk = "ixs_zzk", por_cis_zzk = "por_cis_zzk", ixp_zad = "ixp_zad", stav_spz = "stav_spz", ixs_tzk = "ixs_tzk", dat_plat_do = "dat_plat_do", s_tp_nom = "s_tp_nom", s_tu_nom = "s_tu_nom", s_pra_nom = "s_pra_nom", tp_body = "tp_body", tp_body_max = "tp_body_max", s_usp_tp = "s_usp_tp", tu_zadani1 = "tu_zadani1", tu_body1 = "tu_body1", tu_zadani2 = "tu_zadani2", tu_body2 = "tu_body2", tu_zadani3 = "tu_zadani3", tu_body3 = "tu_body3", tu_body_max = "tu_body_max", s_usp_tu = "s_usp_tu", s_pra = "s_pra", s_usp_celk = "s_usp_celk", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_vysl = "ixp_vysl",}
	const enum GRlsdzzkDtoFragments { ixs_zzk = "Base", por_cis_zzk = "Base", ixp_zad = "Base", stav_spz = "Base", ixs_tzk = "Base", dat_plat_do = "Base", s_tp_nom = "Base", s_tu_nom = "Base", s_pra_nom = "Base", tp_body = "Base", tp_body_max = "Base", s_usp_tp = "Base", tu_zadani1 = "Base", tu_body1 = "Base", tu_zadani2 = "Base", tu_body2 = "Base", tu_zadani3 = "Base", tu_body3 = "Base", tu_body_max = "Base", s_usp_tu = "Base", s_pra = "Base", s_usp_celk = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixp_vysl = "Base",}
	const enum GRlsdzzkDtoTypes { ixs_zzk = "string", por_cis_zzk = "number", ixp_zad = "string", stav_spz = "number", ixs_tzk = "string", dat_plat_do = "JsonDate", s_tp_nom = "number", s_tu_nom = "number", s_pra_nom = "number", tp_body = "number", tp_body_max = "number", s_usp_tp = "number", tu_zadani1 = "string", tu_body1 = "number", tu_zadani2 = "string", tu_body2 = "number", tu_zadani3 = "string", tu_body3 = "number", tu_body_max = "number", s_usp_tu = "number", s_pra = "number", s_usp_celk = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_vysl = "string",}
	const enum GRlsdzzkDtoTypeLengths { ixs_zzk = 12, ixp_zad = 12, ixs_tzk = 12, tu_zadani1 = 254, tu_zadani2 = 254, tu_zadani3 = 254, poznamka = 254, zmenu_prov = 12, ixp_vysl = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlsskzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsskzk
	*      Kategorie zkoušek
	*/
	interface GRlsskzkDto {
		/**Identifikátor kategorie zkoušky*/
		ixs_kzk?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Název zkr*/
		nazev_zkr?: string|null;
		/**Zakon txt*/
		zakon_txt?: string|null;
		/**Datum platnosti*/
		dat_plat_od?: JsonDate|null;
		/**Datum platnosti*/
		dat_plat_do?: JsonDate|null;
		/**Odbornost*/
		s_odbornost?: number|null;
		/**Příznak, zda obsahuje teoretickou písemnou část zkoušky*/
		s_tp_obs?: number|null;
		/**Příznak, zda je povinné absolvování teoretické písemné části zkoušky v rámci jednoho pokusu*/
		s_tp_pov?: number|null;
		/**Maximální počet bodů teoretické písemné části zkoušky*/
		s_tp_max_b?: number|null;
		/**Minimální počet bodů teoretické písemné části zkoušky*/
		s_tp_min_b?: number|null;
		/**Minimální procentuální úspěšnost teoretické písemné části zkoušky*/
		s_tp_min_p?: number|null;
		/**Příznak, zda obsahuje teoretickou ústní část zkoušky*/
		s_tu_obs?: number|null;
		/**Příznak, zda je povinné absolvování teoretické ústní části zkoušky v rámci jednoho pokusu*/
		s_tu_pov?: number|null;
		/**Maximální počet bodů teoretické ústní části zkoušky*/
		s_tu_max_b?: number|null;
		/**Minimální počet bodů teoretické ústní části zkoušky*/
		s_tu_min_b?: number|null;
		/**Minimální procentuální úspěšnost teoretické ústní části zkoušky*/
		s_tu_min_p?: number|null;
		/**Příznak, zda je povinné absolvování teoretické písemné i teoretické ústní části zkoušky zároveň v rámci jednoho pokusu*/
		s_tpu_pov?: number|null;
		/**Příznak, zda obsahuje praktickou část zkoušky*/
		s_pra_obs?: number|null;
		/**Příznak, zda je povinné absolvování praktické části zkoušky v rámci jednoho pokusu*/
		s_pra_pov?: number|null;
		/**Identifikátor druhu úkonu správního řízení*/
		ixs_duk?: string|null;
		/**Identifikátor formuláře tiskové sestavy protokolu o absolvování zkoušky*/
		ixs_frm?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRlsskzkDtoNames { ixs_kzk = "ixs_kzk", nazev = "nazev", nazev_zkr = "nazev_zkr", zakon_txt = "zakon_txt", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", s_odbornost = "s_odbornost", s_tp_obs = "s_tp_obs", s_tp_pov = "s_tp_pov", s_tp_max_b = "s_tp_max_b", s_tp_min_b = "s_tp_min_b", s_tp_min_p = "s_tp_min_p", s_tu_obs = "s_tu_obs", s_tu_pov = "s_tu_pov", s_tu_max_b = "s_tu_max_b", s_tu_min_b = "s_tu_min_b", s_tu_min_p = "s_tu_min_p", s_tpu_pov = "s_tpu_pov", s_pra_obs = "s_pra_obs", s_pra_pov = "s_pra_pov", ixs_duk = "ixs_duk", ixs_frm = "ixs_frm", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsskzkDtoFragments { ixs_kzk = "Base", nazev = "Base", nazev_zkr = "Base", zakon_txt = "Base", dat_plat_od = "Base", dat_plat_do = "Base", s_odbornost = "Base", s_tp_obs = "Base", s_tp_pov = "Base", s_tp_max_b = "Base", s_tp_min_b = "Base", s_tp_min_p = "Base", s_tu_obs = "Base", s_tu_pov = "Base", s_tu_max_b = "Base", s_tu_min_b = "Base", s_tu_min_p = "Base", s_tpu_pov = "Base", s_pra_obs = "Base", s_pra_pov = "Base", ixs_duk = "Base", ixs_frm = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsskzkDtoTypes { ixs_kzk = "string", nazev = "string", nazev_zkr = "string", zakon_txt = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", s_odbornost = "number", s_tp_obs = "number", s_tp_pov = "number", s_tp_max_b = "number", s_tp_min_b = "number", s_tp_min_p = "number", s_tu_obs = "number", s_tu_pov = "number", s_tu_max_b = "number", s_tu_min_b = "number", s_tu_min_p = "number", s_tpu_pov = "number", s_pra_obs = "number", s_pra_pov = "number", ixs_duk = "string", ixs_frm = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsskzkDtoTypeLengths { ixs_kzk = 12, nazev = 254, nazev_zkr = 100, zakon_txt = 254, ixs_duk = 12, ixs_frm = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlsstzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsstzk
	*      Termíny zkoušek
	*/
	interface GRlsstzkDto {
		/**Identifikátor*/
		ixs_tzk?: string|null;
		/**ixs_kzk*/
		ixs_kzk?: string|null;
		/**Datum termin*/
		dat_termin?: JsonDate|null;
		/**Příznak, zda je termín již publikován*/
		s_publ?: number|null;
		/**Místo konání*/
		misto?: string|null;
		/**Kapacita*/
		kapacita?: number|null;
		/**ixs_esu_pre*/
		ixs_esu_pre?: string|null;
		/**predseda*/
		predseda?: string|null;
		/**username*/
		username?: string|null;
		/**clen1*/
		clen1?: string|null;
		/**clen2*/
		clen2?: string|null;
		/**PID Dokumentu jmenovani komise*/
		ixp_jmko?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRlsstzkDtoNames { ixs_tzk = "ixs_tzk", ixs_kzk = "ixs_kzk", dat_termin = "dat_termin", s_publ = "s_publ", misto = "misto", kapacita = "kapacita", ixs_esu_pre = "ixs_esu_pre", predseda = "predseda", username = "username", clen1 = "clen1", clen2 = "clen2", ixp_jmko = "ixp_jmko", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsstzkDtoFragments { ixs_tzk = "Base", ixs_kzk = "Base", dat_termin = "Base", s_publ = "Base", misto = "Base", kapacita = "Base", ixs_esu_pre = "Base", predseda = "Base", username = "Base", clen1 = "Base", clen2 = "Base", ixp_jmko = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsstzkDtoTypes { ixs_tzk = "string", ixs_kzk = "string", dat_termin = "JsonDate", s_publ = "number", misto = "string", kapacita = "number", ixs_esu_pre = "string", predseda = "string", username = "string", clen1 = "string", clen2 = "string", ixp_jmko = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsstzkDtoTypeLengths { ixs_tzk = 12, ixs_kzk = 12, misto = 254, ixs_esu_pre = 12, predseda = 100, username = 100, clen1 = 100, clen2 = 100, ixp_jmko = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlsszzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsszzk
	*      Žádost o vykonání zkoušky
	*/
	interface GRlsszzkDto {
		/**Identifikátor*/
		ixs_zzk?: string|null;
		/**ixp_zad*/
		ixp_zad?: string|null;
		/**ixp_spis*/
		ixp_spis?: string|null;
		/**stav_zzk*/
		stav_zzk?: number|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**ixs_kzk*/
		ixs_kzk?: string|null;
		/**username*/
		username?: string|null;
		/**Datum platnosti*/
		dat_plat_do?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**s_ucet*/
		s_ucet?: number|null;
	}
	const enum GRlsszzkDtoNames { ixs_zzk = "ixs_zzk", ixp_zad = "ixp_zad", ixp_spis = "ixp_spis", stav_zzk = "stav_zzk", ixs_esu = "ixs_esu", ixs_kzk = "ixs_kzk", username = "username", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ucet = "s_ucet",}
	const enum GRlsszzkDtoFragments { ixs_zzk = "Base", ixp_zad = "Base", ixp_spis = "Base", stav_zzk = "Base", ixs_esu = "Base", ixs_kzk = "Base", username = "Base", dat_plat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_ucet = "Base",}
	const enum GRlsszzkDtoTypes { ixs_zzk = "string", ixp_zad = "string", ixp_spis = "string", stav_zzk = "number", ixs_esu = "string", ixs_kzk = "string", username = "string", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ucet = "number",}
	const enum GRlsszzkDtoTypeLengths { ixs_zzk = 12, ixp_zad = 12, ixp_spis = 12, ixs_esu = 12, ixs_kzk = 12, username = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\BaseDto\GRlsvkpzDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsvkpz
	*      Vazba kategorie a podkategorií zkoušek na žádost o zkoušku
	*/
	interface GRlsvkpzDto {
		/**Identifikátor*/
		ixs_zzk?: string|null;
		/**ixs_kzk*/
		ixs_kzk?: string|null;
		/**por_cis_kzk*/
		por_cis_kzk?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRlsvkpzDtoNames { ixs_zzk = "ixs_zzk", ixs_kzk = "ixs_kzk", por_cis_kzk = "por_cis_kzk", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsvkpzDtoFragments { ixs_zzk = "Base", ixs_kzk = "Base", por_cis_kzk = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsvkpzDtoTypes { ixs_zzk = "string", ixs_kzk = "string", por_cis_kzk = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsvkpzDtoTypeLengths { ixs_zzk = 12, ixs_kzk = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsExterniSubjektDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:ginsesu
	*     GRlsExterniSubjektDto
	*/
	interface GRlsExterniSubjektDto extends Gordic.Rls.Interface.GGinsesuDto {
	}
	const enum GRlsExterniSubjektDtoNames { ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixs_lpc = "ixs_lpc", oc = "oc", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", s_pruk = "s_pruk", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_ds = "id_ds", id_gex = "id_gex", partner_uct = "partner_uct", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", up_nazev = "up_nazev", up_prijmeni = "up_prijmeni", euid = "euid", lei = "lei", eori = "eori", seed_id = "seed_id", sk_edesk_id = "sk_edesk_id", id_eu = "id_eu", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRlsExterniSubjektDtoFragments { ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", ixs_lpc = "*", oc = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", s_pruk = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_ds = "*", id_gex = "*", partner_uct = "*", mi_jmeno = "*", mi_prijmeni = "*", up_nazev = "*", up_prijmeni = "*", euid = "*", lei = "*", eori = "*", seed_id = "*", sk_edesk_id = "*", id_eu = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRlsExterniSubjektDtoTypes { ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", ixs_lpc = "string", oc = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", s_pruk = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_ds = "string", id_gex = "string", partner_uct = "string", mi_jmeno = "string", mi_prijmeni = "string", up_nazev = "string", up_prijmeni = "string", euid = "string", lei = "string", eori = "string", seed_id = "string", sk_edesk_id = "string", id_eu = "string", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRlsExterniSubjektDtoTypeLengths { ixs_esu = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, ob_jmeno = 2000, ixs_nad = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, tel = 33, mail = 254, fax = 33, ixs_su = 12, cs_nazev = 100, cs_zkratka = 16, cs_ulice = 48, cs_obec = 48, esu_txt = 254, rc = 10, ixs_prev = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, pobox = 8, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, ixs_puv = 12, ixs_obj = 12, ixs_adr = 12, ixs_org = 12, ixs_oso = 12, ixs_eko = 12, adresa_kod = 10, st0 = 50, url = 254, gps_sirka = 12, gps_delka = 12, ixs_lpc = 12, oc = 30, rod_prijmeni = 100, misto_nar = 48, prezdivka = 254, ixs_esu_zam = 12, id_ds = 100, id_gex = 100, partner_uct = 10, mi_jmeno = 100, mi_prijmeni = 100, up_nazev = 100, up_prijmeni = 100, euid = 20, lei = 30, eori = 20, seed_id = 20, sk_edesk_id = 12, id_eu = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsKategorieZkouskyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsskzk
	*      Kategorie zkoušek
	*/
	interface GRlsKategorieZkouskyDto extends Gordic.Rls.Interface.GRlsskzkDto {
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Oprávnění*/
		Permissions?: Gordic.Rls.Interface.GRlsBaseDetailPermissions|null;
	}
	const enum GRlsKategorieZkouskyDtoNames { Zmena = "Zmena", Permissions = "Permissions", ixs_kzk = "ixs_kzk", nazev = "nazev", nazev_zkr = "nazev_zkr", zakon_txt = "zakon_txt", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", s_odbornost = "s_odbornost", s_tp_obs = "s_tp_obs", s_tp_pov = "s_tp_pov", s_tp_max_b = "s_tp_max_b", s_tp_min_b = "s_tp_min_b", s_tp_min_p = "s_tp_min_p", s_tu_obs = "s_tu_obs", s_tu_pov = "s_tu_pov", s_tu_max_b = "s_tu_max_b", s_tu_min_b = "s_tu_min_b", s_tu_min_p = "s_tu_min_p", s_tpu_pov = "s_tpu_pov", s_pra_obs = "s_pra_obs", s_pra_pov = "s_pra_pov", ixs_duk = "ixs_duk", ixs_frm = "ixs_frm", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsKategorieZkouskyDtoFragments { Zmena = "ZMENA", Permissions = "Permissions", ixs_kzk = "Base", nazev = "Base", nazev_zkr = "Base", zakon_txt = "Base", dat_plat_od = "Base", dat_plat_do = "Base", s_odbornost = "Base", s_tp_obs = "Base", s_tp_pov = "Base", s_tp_max_b = "Base", s_tp_min_b = "Base", s_tp_min_p = "Base", s_tu_obs = "Base", s_tu_pov = "Base", s_tu_max_b = "Base", s_tu_min_b = "Base", s_tu_min_p = "Base", s_tpu_pov = "Base", s_pra_obs = "Base", s_pra_pov = "Base", ixs_duk = "Base", ixs_frm = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsKategorieZkouskyDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Rls.Interface.GRlsBaseDetailPermissions", ixs_kzk = "string", nazev = "string", nazev_zkr = "string", zakon_txt = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", s_odbornost = "number", s_tp_obs = "number", s_tp_pov = "number", s_tp_max_b = "number", s_tp_min_b = "number", s_tp_min_p = "number", s_tu_obs = "number", s_tu_pov = "number", s_tu_max_b = "number", s_tu_min_b = "number", s_tu_min_p = "number", s_tpu_pov = "number", s_pra_obs = "number", s_pra_pov = "number", ixs_duk = "string", ixs_frm = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsKategorieZkouskyDtoTypeLengths { ixs_kzk = 12, nazev = 254, nazev_zkr = 100, zakon_txt = 254, ixs_duk = 12, ixs_frm = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsNominacePokusAbsolvovaniTerminuDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsdzzk
	*      Nominace, pokusy a absolvování termínu zkoušky
	*/
	interface GRlsNominacePokusAbsolvovaniTerminuDto extends Gordic.Rls.Interface.GRlsdzzkDto {
		/**Navigacni vlastnost pro ZadostOVykonaniZkousky (ixs_zzk)*/
		ZadostOVykonaniZkousky?: Gordic.Rls.Interface.GRlsZadostOVykonaniZkouskyDto|null;
		/**Navigacni vlastnost pro StavPokusuOZkousku (stav_spz)*/
		StavPokusuOZkousku?: Gordic.Rls.Interface.GRlsStavPokusuOZkouskuDto|null;
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Navigacni vlastnost pro TerminZkousky (ixs_tzk)*/
		TerminZkousky?: Gordic.Rls.Interface.GRlsTerminZkouskyDto|null;
		/**Navigacni vlastnost pro DokumentZadost (ixp_zad)*/
		DokumentZadost?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Navigacni vlastnost pro DokumentProtokol (ixp_vysl)*/
		DokumentProtokol?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Soubor dokumentu protokolu*/
		SouborProtokol?: string|null;
		/**Identifikátor ALF souboru sestavy protokolu*/
		IxsFrm?: string|null;
		/**Oprávnění*/
		Permissions?: Gordic.Rls.Interface.GRlsPokusyNominaceAbsolvovaniPermissions|null;
	}
	const enum GRlsNominacePokusAbsolvovaniTerminuDtoNames { ZadostOVykonaniZkousky = "ZadostOVykonaniZkousky", StavPokusuOZkousku = "StavPokusuOZkousku", Zmena = "Zmena", TerminZkousky = "TerminZkousky", DokumentZadost = "DokumentZadost", DokumentProtokol = "DokumentProtokol", SouborProtokol = "SouborProtokol", IxsFrm = "IxsFrm", Permissions = "Permissions", ixs_zzk = "ixs_zzk", por_cis_zzk = "por_cis_zzk", ixp_zad = "ixp_zad", stav_spz = "stav_spz", ixs_tzk = "ixs_tzk", dat_plat_do = "dat_plat_do", s_tp_nom = "s_tp_nom", s_tu_nom = "s_tu_nom", s_pra_nom = "s_pra_nom", tp_body = "tp_body", tp_body_max = "tp_body_max", s_usp_tp = "s_usp_tp", tu_zadani1 = "tu_zadani1", tu_body1 = "tu_body1", tu_zadani2 = "tu_zadani2", tu_body2 = "tu_body2", tu_zadani3 = "tu_zadani3", tu_body3 = "tu_body3", tu_body_max = "tu_body_max", s_usp_tu = "s_usp_tu", s_pra = "s_pra", s_usp_celk = "s_usp_celk", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp_vysl = "ixp_vysl",}
	const enum GRlsNominacePokusAbsolvovaniTerminuDtoFragments { ZadostOVykonaniZkousky = "ZADOSTOVYKONANIZKOUSKY", StavPokusuOZkousku = "STAVPOKUSUOZKOUSKU", Zmena = "ZMENA", TerminZkousky = "TERMINZKOUSKY", DokumentZadost = "DOKUMENTZADOST", DokumentProtokol = "DOKUMENTPROTOKOL", SouborProtokol = "SOUBORPROTOKOL", IxsFrm = "IXSFRM", Permissions = "Permissions", ixs_zzk = "Base", por_cis_zzk = "Base", ixp_zad = "Base", stav_spz = "Base", ixs_tzk = "Base", dat_plat_do = "Base", s_tp_nom = "Base", s_tu_nom = "Base", s_pra_nom = "Base", tp_body = "Base", tp_body_max = "Base", s_usp_tp = "Base", tu_zadani1 = "Base", tu_body1 = "Base", tu_zadani2 = "Base", tu_body2 = "Base", tu_zadani3 = "Base", tu_body3 = "Base", tu_body_max = "Base", s_usp_tu = "Base", s_pra = "Base", s_usp_celk = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixp_vysl = "Base",}
	const enum GRlsNominacePokusAbsolvovaniTerminuDtoTypes { ZadostOVykonaniZkousky = "Gordic.Rls.Interface.GRlsZadostOVykonaniZkouskyDto", StavPokusuOZkousku = "Gordic.Rls.Interface.GRlsStavPokusuOZkouskuDto", Zmena = "Gordic.Gin.Interface.GGinszmpDto", TerminZkousky = "Gordic.Rls.Interface.GRlsTerminZkouskyDto", DokumentZadost = "Gordic.Spr.Interface.GDokumentDto", DokumentProtokol = "Gordic.Spr.Interface.GDokumentDto", SouborProtokol = "string", IxsFrm = "string", Permissions = "Gordic.Rls.Interface.GRlsPokusyNominaceAbsolvovaniPermissions", ixs_zzk = "string", por_cis_zzk = "number", ixp_zad = "string", stav_spz = "number", ixs_tzk = "string", dat_plat_do = "JsonDate", s_tp_nom = "number", s_tu_nom = "number", s_pra_nom = "number", tp_body = "number", tp_body_max = "number", s_usp_tp = "number", tu_zadani1 = "string", tu_body1 = "number", tu_zadani2 = "string", tu_body2 = "number", tu_zadani3 = "string", tu_body3 = "number", tu_body_max = "number", s_usp_tu = "number", s_pra = "number", s_usp_celk = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp_vysl = "string",}
	const enum GRlsNominacePokusAbsolvovaniTerminuDtoTypeLengths { ixs_zzk = 12, ixp_zad = 12, ixs_tzk = 12, tu_zadani1 = 254, tu_zadani2 = 254, tu_zadani3 = 254, poznamka = 254, zmenu_prov = 12, ixp_vysl = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsPodanaZadostOVykonaniZkouskyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:wflspid
	*      DTO - Podaná nezaevidovaná žádost o vykonání zkoušky
	*/
	interface GRlsPodanaZadostOVykonaniZkouskyDto extends Gordic.Spr.Interface.GDokumentDto {
		/**Navigacni vlastnost pro Spis (ixp_spis)*/
		Spis?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Navigacni vlastnost pro Esu (ixs_esu)*/
		Esu?: Gordic.Rls.Interface.GRlsExterniSubjektDto|null;
	}
	const enum GRlsPodanaZadostOVykonaniZkouskyDtoNames { Spis = "Spis", Zmena = "Zmena", Esu = "Esu", ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico",}
	const enum GRlsPodanaZadostOVykonaniZkouskyDtoFragments { Spis = "SPIS", Zmena = "ZMENA", Esu = "ESU", ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*",}
	const enum GRlsPodanaZadostOVykonaniZkouskyDtoTypes { Spis = "Gordic.Spr.Interface.GDokumentDto", Zmena = "Gordic.Gin.Interface.GGinszmpDto", Esu = "Gordic.Rls.Interface.GRlsExterniSubjektDto", ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string",}
	const enum GRlsPodanaZadostOVykonaniZkouskyDtoTypeLengths { ixp = 12, lic = 4, ixp_spis = 12, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, akt_znacka = 50, ixs_typ = 12, zmenu_prov = 12, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_cj = 12, ixs_lpc = 12, umisteni = 20, skar_znak = 2, ixp_top = 12, barcode = 50, ixs_ext = 12, ixs_spu = 12, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsPodkategorieZkouskyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsdkzk
	*      Podkategorie zkoušek
	*/
	interface GRlsPodkategorieZkouskyDto extends Gordic.Rls.Interface.GRlsdkzkDto {
		/**Navigacni vlastnost pro KategorieZkousky (ixs_kzk)*/
		KategorieZkousky?: Gordic.Rls.Interface.GRlsKategorieZkouskyDto|null;
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Oprávnění*/
		Permissions?: Gordic.Rls.Interface.GRlsBaseDetailPermissions|null;
	}
	const enum GRlsPodkategorieZkouskyDtoNames { KategorieZkousky = "KategorieZkousky", Zmena = "Zmena", Permissions = "Permissions", ixs_kzk = "ixs_kzk", por_cis_kzk = "por_cis_kzk", kod = "kod", nazev = "nazev", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsPodkategorieZkouskyDtoFragments { KategorieZkousky = "KATEGORIEZKOUSKY", Zmena = "ZMENA", Permissions = "Permissions", ixs_kzk = "Base", por_cis_kzk = "Base", kod = "Base", nazev = "Base", dat_plat_od = "Base", dat_plat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsPodkategorieZkouskyDtoTypes { KategorieZkousky = "Gordic.Rls.Interface.GRlsKategorieZkouskyDto", Zmena = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Rls.Interface.GRlsBaseDetailPermissions", ixs_kzk = "string", por_cis_kzk = "number", kod = "string", nazev = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsPodkategorieZkouskyDtoTypeLengths { ixs_kzk = 12, kod = 20, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsStavPokusuOZkouskuDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscspz
	*      Stav pokusu o zkoušku
	*/
	interface GRlsStavPokusuOZkouskuDto extends Gordic.Rls.Interface.GRlscspzDto {
	}
	const enum GRlsStavPokusuOZkouskuDtoNames { stav_spz = "stav_spz", stav_spz_txt = "stav_spz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRlsStavPokusuOZkouskuDtoFragments { stav_spz = "Base", stav_spz_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRlsStavPokusuOZkouskuDtoTypes { stav_spz = "number", stav_spz_txt = "string", k_v = "number", k_s = "string", k_xml = "string", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRlsStavPokusuOZkouskuDtoTypeLengths { stav_spz_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsStavZadostiOZkouskuDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscszk
	*      Stav žádosti o zkoušku
	*/
	interface GRlsStavZadostiOZkouskuDto extends Gordic.Rls.Interface.GRlscszkDto {
	}
	const enum GRlsStavZadostiOZkouskuDtoNames { stav_zzk = "stav_zzk", stav_zzk_txt = "stav_zzk_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRlsStavZadostiOZkouskuDtoFragments { stav_zzk = "Base", stav_zzk_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRlsStavZadostiOZkouskuDtoTypes { stav_zzk = "number", stav_zzk_txt = "string", k_v = "number", k_s = "string", k_xml = "string", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRlsStavZadostiOZkouskuDtoTypeLengths { stav_zzk_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsTerminZkouskyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsstzk
	*      Termíny zkoušek
	*/
	interface GRlsTerminZkouskyDto extends Gordic.Rls.Interface.GRlsstzkDto {
		/**Navigacni vlastnost pro KategorieZkousky (ixs_kzk)*/
		KategorieZkousky?: Gordic.Rls.Interface.GRlsKategorieZkouskyDto|null;
		/**Identifikátor spisu pro dokumenty jmenování komise*/
		IxpSpis?: string|null;
		/**Sp. zn. spisu pro dokumenty jmenování komise*/
		CjSpis?: string|null;
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Navigacni vlastnost pro DokumentZadost (ixp_jmko) - wflspid.ixp*/
		DokumentJmenKomise?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Oprávnění*/
		Permissions?: Gordic.Rls.Interface.GRlsBaseDetailPermissions|null;
	}
	const enum GRlsTerminZkouskyDtoNames { KategorieZkousky = "KategorieZkousky", IxpSpis = "IxpSpis", CjSpis = "CjSpis", Zmena = "Zmena", DokumentJmenKomise = "DokumentJmenKomise", Permissions = "Permissions", ixs_tzk = "ixs_tzk", ixs_kzk = "ixs_kzk", dat_termin = "dat_termin", s_publ = "s_publ", misto = "misto", kapacita = "kapacita", ixs_esu_pre = "ixs_esu_pre", predseda = "predseda", username = "username", clen1 = "clen1", clen2 = "clen2", ixp_jmko = "ixp_jmko", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsTerminZkouskyDtoFragments { KategorieZkousky = "KATEGORIEZKOUSKY", IxpSpis = "IXPSPIS", CjSpis = "CJSPIS", Zmena = "ZMENA", DokumentJmenKomise = "DOKUMENTJMENKOMISE", Permissions = "Permissions", ixs_tzk = "Base", ixs_kzk = "Base", dat_termin = "Base", s_publ = "Base", misto = "Base", kapacita = "Base", ixs_esu_pre = "Base", predseda = "Base", username = "Base", clen1 = "Base", clen2 = "Base", ixp_jmko = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsTerminZkouskyDtoTypes { KategorieZkousky = "Gordic.Rls.Interface.GRlsKategorieZkouskyDto", IxpSpis = "string", CjSpis = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", DokumentJmenKomise = "Gordic.Spr.Interface.GDokumentDto", Permissions = "Gordic.Rls.Interface.GRlsBaseDetailPermissions", ixs_tzk = "string", ixs_kzk = "string", dat_termin = "JsonDate", s_publ = "number", misto = "string", kapacita = "number", ixs_esu_pre = "string", predseda = "string", username = "string", clen1 = "string", clen2 = "string", ixp_jmko = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsTerminZkouskyDtoTypeLengths { ixs_tzk = 12, ixs_kzk = 12, misto = 254, ixs_esu_pre = 12, predseda = 100, username = 100, clen1 = 100, clen2 = 100, ixp_jmko = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsVybranePodkategorieDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsvkpz
	*      Vazba kategorie a podkategorií zkoušek na žádost o zkoušku
	*/
	interface GRlsVybranePodkategorieDto extends Gordic.Rls.Interface.GRlsvkpzDto {
		/**Navigacni vlastnost pro ZadostOVykonaniZkousky (ixs_zzk)*/
		ZadostOVykonaniZkousky?: Gordic.Rls.Interface.GRlsZadostOVykonaniZkouskyDto|null;
		/**Navigacni vlastnost pro KategorieZkousky (ixs_kzk)*/
		KategorieZkousky?: Gordic.Rls.Interface.GRlsKategorieZkouskyDto|null;
		/**Navigacni vlastnost pro PodkategorieZkousky (ixs_kzk,por_cis_kzk)*/
		PodkategorieZkousky?: Gordic.Rls.Interface.GRlsPodkategorieZkouskyDto|null;
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Oprávnění*/
		Permissions?: Gordic.Rls.Interface.GRlsBaseDetailPermissions|null;
	}
	const enum GRlsVybranePodkategorieDtoNames { ZadostOVykonaniZkousky = "ZadostOVykonaniZkousky", KategorieZkousky = "KategorieZkousky", PodkategorieZkousky = "PodkategorieZkousky", Zmena = "Zmena", Permissions = "Permissions", ixs_zzk = "ixs_zzk", ixs_kzk = "ixs_kzk", por_cis_kzk = "por_cis_kzk", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsVybranePodkategorieDtoFragments { ZadostOVykonaniZkousky = "ZADOSTOVYKONANIZKOUSKY", KategorieZkousky = "KATEGORIEZKOUSKY", PodkategorieZkousky = "PODKATEGORIEZKOUSKY", Zmena = "ZMENA", Permissions = "Permissions", ixs_zzk = "Base", ixs_kzk = "Base", por_cis_kzk = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsVybranePodkategorieDtoTypes { ZadostOVykonaniZkousky = "Gordic.Rls.Interface.GRlsZadostOVykonaniZkouskyDto", KategorieZkousky = "Gordic.Rls.Interface.GRlsKategorieZkouskyDto", PodkategorieZkousky = "Gordic.Rls.Interface.GRlsPodkategorieZkouskyDto", Zmena = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Rls.Interface.GRlsBaseDetailPermissions", ixs_zzk = "string", ixs_kzk = "string", por_cis_kzk = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsVybranePodkategorieDtoTypeLengths { ixs_zzk = 12, ixs_kzk = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsVybranePodkategorieHromadneDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsvkpz
	*      Vazba kategorie a podkategorií zkoušek na žádost o zkoušku
	*/
	interface GRlsVybranePodkategorieHromadneDto extends Gordic.Rls.Interface.GRlsvkpzDto {
		/**Navigacni vlastnost pro Vybrané podkategorie zkousky pro uložení (ixs_kzk,por_cis_kzk)*/
		SeznamZvolenychPodkategoriiZkouskyProUlozeni?: Gordic.Rls.Interface.GRlsPodkategorieZkouskyDto[]|null;
	}
	const enum GRlsVybranePodkategorieHromadneDtoNames { SeznamZvolenychPodkategoriiZkouskyProUlozeni = "SeznamZvolenychPodkategoriiZkouskyProUlozeni", ixs_zzk = "ixs_zzk", ixs_kzk = "ixs_kzk", por_cis_kzk = "por_cis_kzk", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRlsVybranePodkategorieHromadneDtoFragments { SeznamZvolenychPodkategoriiZkouskyProUlozeni = "ZVOLENEPODKATEGORIEZKOUSKY", ixs_zzk = "Base", ixs_kzk = "Base", por_cis_kzk = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GRlsVybranePodkategorieHromadneDtoTypes { SeznamZvolenychPodkategoriiZkouskyProUlozeni = "Gordic.Rls.Interface.GRlsPodkategorieZkouskyDto[]", ixs_zzk = "string", ixs_kzk = "string", por_cis_kzk = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRlsVybranePodkategorieHromadneDtoTypeLengths { ixs_zzk = 12, ixs_kzk = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsZadostOVykonaniZkouskyDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsszzk
	*      Žádost o vykonání zkoušky
	*/
	interface GRlsZadostOVykonaniZkouskyDto extends Gordic.Rls.Interface.GRlsszzkDto {
		/**Navigacni vlastnost pro DokumentZadost (ixp_zad)*/
		DokumentZadost?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Navigacni vlastnost pro Spis (ixp_spis)*/
		Spis?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Kdo provedl změnu (zmenu_prov)*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Navigacni vlastnost pro StavZadostiOZkousku (stav_zzk)*/
		StavZadostiOZkousku?: Gordic.Rls.Interface.GRlsStavZadostiOZkouskuDto|null;
		/**Navigacni vlastnost pro KategorieZkousky (ixs_kzk)*/
		KategorieZkousky?: Gordic.Rls.Interface.GRlsKategorieZkouskyDto|null;
		/**Navigacni vlastnost pro Esu (ixs_esu)*/
		Esu?: Gordic.Rls.Interface.GRlsExterniSubjektDto|null;
		/**Navigacni vlastnost pro Vybrané podkategorie zkousky pro uložení (ixs_kzk,por_cis_kzk)*/
		SeznamZvolenychPodkategoriiZkousky?: Gordic.Rls.Interface.GRlsPodkategorieZkouskyDto[]|null;
		/**Oprávnění*/
		Permissions?: Gordic.Rls.Interface.GRlsZadostOVykonaniZkouskyPermissions|null;
	}
	const enum GRlsZadostOVykonaniZkouskyDtoNames { DokumentZadost = "DokumentZadost", Spis = "Spis", Zmena = "Zmena", StavZadostiOZkousku = "StavZadostiOZkousku", KategorieZkousky = "KategorieZkousky", Esu = "Esu", SeznamZvolenychPodkategoriiZkousky = "SeznamZvolenychPodkategoriiZkousky", Permissions = "Permissions", ixs_zzk = "ixs_zzk", ixp_zad = "ixp_zad", ixp_spis = "ixp_spis", stav_zzk = "stav_zzk", ixs_esu = "ixs_esu", ixs_kzk = "ixs_kzk", username = "username", dat_plat_do = "dat_plat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ucet = "s_ucet",}
	const enum GRlsZadostOVykonaniZkouskyDtoFragments { DokumentZadost = "DOKUMENTZADOST", Spis = "SPIS", Zmena = "ZMENA", StavZadostiOZkousku = "STAVZADOSTIOZKOUSKU", KategorieZkousky = "KATEGORIEZKOUSKY", Esu = "ESU", SeznamZvolenychPodkategoriiZkousky = "ZVOLENEPODKATEGORIEZKOUSKY", Permissions = "Permissions", ixs_zzk = "Base", ixp_zad = "Base", ixp_spis = "Base", stav_zzk = "Base", ixs_esu = "Base", ixs_kzk = "Base", username = "Base", dat_plat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_ucet = "Base",}
	const enum GRlsZadostOVykonaniZkouskyDtoTypes { DokumentZadost = "Gordic.Spr.Interface.GDokumentDto", Spis = "Gordic.Spr.Interface.GDokumentDto", Zmena = "Gordic.Gin.Interface.GGinszmpDto", StavZadostiOZkousku = "Gordic.Rls.Interface.GRlsStavZadostiOZkouskuDto", KategorieZkousky = "Gordic.Rls.Interface.GRlsKategorieZkouskyDto", Esu = "Gordic.Rls.Interface.GRlsExterniSubjektDto", SeznamZvolenychPodkategoriiZkousky = "Gordic.Rls.Interface.GRlsPodkategorieZkouskyDto[]", Permissions = "Gordic.Rls.Interface.GRlsZadostOVykonaniZkouskyPermissions", ixs_zzk = "string", ixp_zad = "string", ixp_spis = "string", stav_zzk = "number", ixs_esu = "string", ixs_kzk = "string", username = "string", dat_plat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ucet = "number",}
	const enum GRlsZadostOVykonaniZkouskyDtoTypeLengths { ixs_zzk = 12, ixp_zad = 12, ixp_spis = 12, ixs_esu = 12, ixs_kzk = 12, username = 100, poznamka = 254, zmenu_prov = 12,}
	/**Typ datumového rozsahu pro seznamy žádostí*/
	const enum TypDatumovehoRozsahuZadosti {
		/**Datum změny profilu dokumentu/žádosti*/
		DatumZmenyDokumentu=0,
		/**Datum podání dokumentu - žádosti*/
		DatumPodaniDokumentu=1,
		/**Datum platnosti žádosti*/
		DatumPlatnosti=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\ExtendedDto\GRlsZkouskyRecordsCountsDto.d.ts 

declare namespace Gordic.Rls.Interface {
	interface GRlsZkouskyRecordsCountsDto {
		pocetNezaevidovanychZadosti?: number|null;
		pocetNevyrizenychZadosti?: number|null;
	}
	const enum GRlsZkouskyRecordsCountsDtoNames { pocetNezaevidovanychZadosti = "pocetNezaevidovanychZadosti", pocetNevyrizenychZadosti = "pocetNevyrizenychZadosti",}
	const enum GRlsZkouskyRecordsCountsDtoFragments { pocetNezaevidovanychZadosti = "*", pocetNevyrizenychZadosti = "*",}
	const enum GRlsZkouskyRecordsCountsDtoTypes { pocetNezaevidovanychZadosti = "number", pocetNevyrizenychZadosti = "number",}
	const enum GRlsZkouskyRecordsCountsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GAkceLicenceFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro akce licence*/
	interface GAkceLicenceFilterDto {
        /**Identifikátor licence*/
		ixs_lst?: GBaseFilter<string>|null;
	}
	const enum GAkceLicenceFilterDtoNames { ixs_lst = "ixs_lst",}
	const enum GAkceLicenceFilterDtoFragments { ixs_lst = "*",}
	const enum GAkceLicenceFilterDtoTypes { ixs_lst = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GHistorieLicenceFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro historii licence*/
	interface GHistorieLicenceFilterDto {
        /**Identifikátor licence*/
		ixs_lst?: GBaseFilter<string>|null;
	}
	const enum GHistorieLicenceFilterDtoNames { ixs_lst = "ixs_lst",}
	const enum GHistorieLicenceFilterDtoFragments { ixs_lst = "*",}
	const enum GHistorieLicenceFilterDtoTypes { ixs_lst = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GKontrolaFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**Filtr pro kontroly*/
	interface GKontrolaFilterDto {
		/**Identifikátor licence*/
		ixs_lst?: GBaseFilter<string>|null;
		/**Platnost od*/
		platnost_od?: GBaseFilter<JsonDate>|null;
		/**Platnost do*/
		platnost_do?: GBaseFilter<JsonDate>|null;
		/**Typ kontroly*/
		typ_kontr?: GBaseFilter<number>|null;
		/**Stav licence*/
		stav_licence?: GBaseFilter<number>|null;
	}
	const enum GKontrolaFilterDtoNames { ixs_lst = "ixs_lst", platnost_od = "platnost_od", platnost_do = "platnost_do", typ_kontr = "typ_kontr", stav_licence = "stav_licence",}
	const enum GKontrolaFilterDtoFragments { ixs_lst = "*", platnost_od = "*", platnost_do = "*", typ_kontr = "*", stav_licence = "*",}
	const enum GKontrolaFilterDtoTypes { ixs_lst = "GBaseFilter<string>", platnost_od = "GBaseFilter<JsonDate>", platnost_do = "GBaseFilter<JsonDate>", typ_kontr = "GBaseFilter<number>", stav_licence = "GBaseFilter<number>",}
	const enum GKontrolaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GLanovaDrahaFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro lanové dráhy*/
	interface GLanovaDrahaFilterDto {
	}
	const enum GLanovaDrahaFilterDtoNames {}
	const enum GLanovaDrahaFilterDtoFragments {}
	const enum GLanovaDrahaFilterDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GLicenceFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro licence/pz*/
	interface GLicenceFilterDto {
        /**Datum žádosti*/
		datum_zadosti?: GBaseFilter<JsonDate>|null;
        /**Datum vydání*/
		datum_vydani?: GBaseFilter<JsonDate>|null;
        /**Datum konce platnosti*/
		datum_uplynuti?: GBaseFilter<JsonDate>|null;
        /**Číslo licence*/
		cislo_licence?: GBaseFilter<string>|null;
        /**Evidenční číslo*/
		evidencni_cislo?: GBaseFilter<string>|null;
        /**Stav licence*/
		stav_licence?: GBaseFilter<number>|null;
        /**Stav PZ*/
		stav_pz?: GBaseFilter<number>|null;
        /**Stav karty*/
		stav_karty?: GBaseFilter<number>|null;
        /**Pohlaví*/
		pohlavi?: GBaseFilter<number>|null;
        /**Kategorie dokladu*/
		kat_dokladu?: GBaseFilter<number>|null;
        /**Rodné číslo*/
		rc?: GBaseFilter<string>|null;
        /**Příjmení*/
		prijmeni?: GBaseFilter<string>|null;
        /**Jméno*/
		jmeno?: GBaseFilter<string>|null;
	}
	const enum GLicenceFilterDtoNames { datum_zadosti = "datum_zadosti", datum_vydani = "datum_vydani", datum_uplynuti = "datum_uplynuti", cislo_licence = "cislo_licence", evidencni_cislo = "evidencni_cislo", stav_licence = "stav_licence", stav_pz = "stav_pz", stav_karty = "stav_karty", pohlavi = "pohlavi", kat_dokladu = "kat_dokladu", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno",}
	const enum GLicenceFilterDtoFragments { datum_zadosti = "*", datum_vydani = "*", datum_uplynuti = "*", cislo_licence = "*", evidencni_cislo = "*", stav_licence = "*", stav_pz = "*", stav_karty = "*", pohlavi = "*", kat_dokladu = "*", rc = "*", prijmeni = "*", jmeno = "*",}
	const enum GLicenceFilterDtoTypes { datum_zadosti = "GBaseFilter<JsonDate>", datum_vydani = "GBaseFilter<JsonDate>", datum_uplynuti = "GBaseFilter<JsonDate>", cislo_licence = "GBaseFilter<string>", evidencni_cislo = "GBaseFilter<string>", stav_licence = "GBaseFilter<number>", stav_pz = "GBaseFilter<number>", stav_karty = "GBaseFilter<number>", pohlavi = "GBaseFilter<number>", kat_dokladu = "GBaseFilter<number>", rc = "GBaseFilter<string>", prijmeni = "GBaseFilter<string>", jmeno = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GLogLicenceFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro logy licence*/
	interface GLogLicenceFilterDto {
        /**Identifikátor licence*/
		ixs_lst?: GBaseFilter<string>|null;
        /**Datum změny*/
		dat_zmena?: GBaseFilter<JsonDate>|null;
        /**Typ akce*/
		typ_akce_rls?: GBaseFilter<number>|null;
        /**Identifikátor funkce*/
		ixs_fun?: GBaseFilter<string>|null;
	}
	const enum GLogLicenceFilterDtoNames { ixs_lst = "ixs_lst", dat_zmena = "dat_zmena", typ_akce_rls = "typ_akce_rls", ixs_fun = "ixs_fun",}
	const enum GLogLicenceFilterDtoFragments { ixs_lst = "*", dat_zmena = "*", typ_akce_rls = "*", ixs_fun = "*",}
	const enum GLogLicenceFilterDtoTypes { ixs_lst = "GBaseFilter<string>", dat_zmena = "GBaseFilter<JsonDate>", typ_akce_rls = "GBaseFilter<number>", ixs_fun = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GObjednavkaFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro objednávky*/
	interface GObjednavkaFilterDto {
        /**Stav objednávky*/
		stav_obj?: GBaseFilter<number>|null;
	}
	const enum GObjednavkaFilterDtoNames { stav_obj = "stav_obj",}
	const enum GObjednavkaFilterDtoFragments { stav_obj = "*",}
	const enum GObjednavkaFilterDtoTypes { stav_obj = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GSubjektZkouskyFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro subjekty pro zkousky*/
	interface GSubjektZkouskyFilterDto {
	}
	const enum GSubjektZkouskyFilterDtoNames {}
	const enum GSubjektZkouskyFilterDtoFragments {}
	const enum GSubjektZkouskyFilterDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Filters\GVzdelaniFilterDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**Filtr pro vzdělání*/
	interface GVzdelaniFilterDto {
	}
	const enum GVzdelaniFilterDtoNames {}
	const enum GVzdelaniFilterDtoFragments {}
	const enum GVzdelaniFilterDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Permissions\GRlsBaseDetailPermissions.d.ts 

declare namespace Gordic.Rls.Interface {
	/**Základní Permissions pro Rls*/
	interface GRlsBaseDetailPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
	}
	const enum GRlsBaseDetailPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRlsBaseDetailPermissionsFragments { CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRlsBaseDetailPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRlsBaseDetailPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Permissions\GRlsPokusyNominaceAbsolvovaniPermissions.d.ts 

declare namespace Gordic.Rls.Interface {
	/**RLS Permissions pro detail Pokusy, Nominace, Absolvování*/
	interface GRlsPokusyNominaceAbsolvovaniPermissions extends Gordic.Rls.Interface.GRlsBaseDetailPermissions {
		/**Lze nominovat*/
		LzeNominovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze absolvovat*/
		LzeAbsolvovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze absolvovat - manuálním zásahem bez LMS*/
		LzeAbsolvovatManualne: Gordic.General.ApplicationInterface.GPermission;
		/**Lze opravit absolvování - manuálním zásahem bez vyhodnocení NARELIS*/
		LzeOpravitAbsolvovani: Gordic.General.ApplicationInterface.GPermission;
		/**Lze absolvovat*/
		LzeTisknoutProtokol: Gordic.General.ApplicationInterface.GPermission;
		/**Lze otevřít dokument protokolu*/
		LzeOtevritDokumentProtokolu: Gordic.General.ApplicationInterface.GPermission;
		/**Lze konvertovat dokument protokolu*/
		LzeKonvertovatDokumentProtokolu: Gordic.General.ApplicationInterface.GPermission;
		/**Lze absolvovat*/
		LzeOdeslatProtokol: Gordic.General.ApplicationInterface.GPermission;
		/**Lze další pokus*/
		LzeDalsiPokus: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRlsPokusyNominaceAbsolvovaniPermissionsNames { LzeNominovat = "LzeNominovat", LzeAbsolvovat = "LzeAbsolvovat", LzeAbsolvovatManualne = "LzeAbsolvovatManualne", LzeOpravitAbsolvovani = "LzeOpravitAbsolvovani", LzeTisknoutProtokol = "LzeTisknoutProtokol", LzeOtevritDokumentProtokolu = "LzeOtevritDokumentProtokolu", LzeKonvertovatDokumentProtokolu = "LzeKonvertovatDokumentProtokolu", LzeOdeslatProtokol = "LzeOdeslatProtokol", LzeDalsiPokus = "LzeDalsiPokus", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRlsPokusyNominaceAbsolvovaniPermissionsFragments { LzeNominovat = "*", LzeAbsolvovat = "*", LzeAbsolvovatManualne = "*", LzeOpravitAbsolvovani = "*", LzeTisknoutProtokol = "*", LzeOtevritDokumentProtokolu = "*", LzeKonvertovatDokumentProtokolu = "*", LzeOdeslatProtokol = "*", LzeDalsiPokus = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRlsPokusyNominaceAbsolvovaniPermissionsTypes { LzeNominovat = "Gordic.General.ApplicationInterface.GPermission", LzeAbsolvovat = "Gordic.General.ApplicationInterface.GPermission", LzeAbsolvovatManualne = "Gordic.General.ApplicationInterface.GPermission", LzeOpravitAbsolvovani = "Gordic.General.ApplicationInterface.GPermission", LzeTisknoutProtokol = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritDokumentProtokolu = "Gordic.General.ApplicationInterface.GPermission", LzeKonvertovatDokumentProtokolu = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatProtokol = "Gordic.General.ApplicationInterface.GPermission", LzeDalsiPokus = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRlsPokusyNominaceAbsolvovaniPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Permissions\GRlsZadostOVykonaniZkouskyPermissions.d.ts 

declare namespace Gordic.Rls.Interface {
	/**RLS Permissions pro Žádost o vykonání zkoušky*/
	interface GRlsZadostOVykonaniZkouskyPermissions extends Gordic.Rls.Interface.GRlsBaseDetailPermissions {
		/**Lze vytvořit účet v LMS*/
		LzeVytvoritUcetLMS: Gordic.General.ApplicationInterface.GPermission;
		/**Lze založit nominaci*/
		LzeZalozitNominaci: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze založit první pokus*/
		LzePrvniPokus: Gordic.General.ApplicationInterface.GPermission;
		/**Lze další pokus*/
		LzeDalsiPokus: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRlsZadostOVykonaniZkouskyPermissionsNames { LzeVytvoritUcetLMS = "LzeVytvoritUcetLMS", LzeZalozitNominaci = "LzeZalozitNominaci", LzeUzavrit = "LzeUzavrit", LzePrvniPokus = "LzePrvniPokus", LzeDalsiPokus = "LzeDalsiPokus", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GRlsZadostOVykonaniZkouskyPermissionsFragments { LzeVytvoritUcetLMS = "*", LzeZalozitNominaci = "*", LzeUzavrit = "*", LzePrvniPokus = "*", LzeDalsiPokus = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GRlsZadostOVykonaniZkouskyPermissionsTypes { LzeVytvoritUcetLMS = "Gordic.General.ApplicationInterface.GPermission", LzeZalozitNominaci = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzePrvniPokus = "Gordic.General.ApplicationInterface.GPermission", LzeDalsiPokus = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRlsZadostOVykonaniZkouskyPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscakcDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscakc*/
	interface GReaderRlscakcDto {
		/**DBCOLUMN:rlscakc.typ_akce_rls -*/
		typ_akce_rls?: number|null;
		/**DBCOLUMN:rlscakc.typ_akce_rls_txt -*/
		typ_akce_rls_txt?: string|null;
		/**DBCOLUMN:rlscakc.k_v -*/
		k_v?: number|null;
		/**DBCOLUMN:rlscakc.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscakcDtoNames { typ_akce_rls = "typ_akce_rls", typ_akce_rls_txt = "typ_akce_rls_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscakcDtoFragments { typ_akce_rls = "*", typ_akce_rls_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscakcDtoTypes { typ_akce_rls = "number", typ_akce_rls_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderRlscakcDtoTypeLengths { typ_akce_rls_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscktdDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscktd*/
	interface GReaderRlscktdDto {
		/**DBCOLUMN:rlscktd.kat_dokladu -*/
		kat_dokladu?: number|null;
		/**DBCOLUMN:rlscktd.kat_dokladu_txt -*/
		kat_dokladu_txt?: string|null;
		/**DBCOLUMN:rlscktd.k_v -*/
		k_v?: number|null;
		/**DBCOLUMN:rlscktd.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:rlscktd.aktivita -*/
		aktivita?: number|null;
	}
	const enum GReaderRlscktdDtoNames { kat_dokladu = "kat_dokladu", kat_dokladu_txt = "kat_dokladu_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita",}
	const enum GReaderRlscktdDtoFragments { kat_dokladu = "*", kat_dokladu_txt = "*", k_v = "*", k_s = "*", aktivita = "*",}
	const enum GReaderRlscktdDtoTypes { kat_dokladu = "number", kat_dokladu_txt = "string", k_v = "number", k_s = "string", aktivita = "number",}
	const enum GReaderRlscktdDtoTypeLengths { kat_dokladu_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscspzDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscstp*/
	interface GReaderRlscspzDto {
		/**DBCOLUMN:rlscspz.stav_spz -*/
		stav_spz?: number|null;
		/**DBCOLUMN:rlscstp.stav_spz_txt -*/
		stav_spz_txt?: string|null;
		/**DBCOLUMN:rlscspz.k_v -*/
		k_v?: number|null;
		/**DBCOLUMN:rlscspz.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscspzDtoNames { stav_spz = "stav_spz", stav_spz_txt = "stav_spz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscspzDtoFragments { stav_spz = "*", stav_spz_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscspzDtoTypes { stav_spz = "number", stav_spz_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderRlscspzDtoTypeLengths { stav_spz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscstkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscstk*/
	interface GReaderRlscstkDto {
		/**DBCOLUMN:rlscstk.stav_karty -*/
		stav_karty?: number|null;
		/**DBCOLUMN:rlscstk.stav_karty_txt -*/
		stav_karty_txt?: string|null;
		/**DBCOLUMN:rlscstk.k_v -*/
		k_v?: number|null;
		/**DBCOLUMN:rlscstk.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:rlscvzd.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rlscvzd.dat_zmena - Změněno*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rlscvzd.zmenu_prov - Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GReaderRlscstkDtoNames { stav_karty = "stav_karty", stav_karty_txt = "stav_karty_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GReaderRlscstkDtoFragments { stav_karty = "*", stav_karty_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GReaderRlscstkDtoTypes { stav_karty = "number", stav_karty_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GReaderRlscstkDtoTypeLengths { stav_karty_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscstlDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlscstl*/
	interface GReaderRlscstlDto {
        /**DBCOLUMN:rlscstl.stav_licence -*/
		stav_licence?: number|null;
        /**DBCOLUMN:rlscstl.stav_licence_txt -*/
		stav_licence_txt?: string|null;
        /**DBCOLUMN:rlscstl.k_v -*/
		k_v?: number|null;
        /**DBCOLUMN:rlscstl.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscstlDtoNames { stav_licence = "stav_licence", stav_licence_txt = "stav_licence_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscstlDtoFragments { stav_licence = "*", stav_licence_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscstlDtoTypes { stav_licence = "number", stav_licence_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscstoDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlscsto*/
	interface GReaderRlscstoDto {
        /**DBCOLUMN:rlscsto.stav_obj -*/
		stav_obj?: number|null;
        /**DBCOLUMN:rlscsto.stav_obj_txt -*/
		stav_obj_txt?: string|null;
        /**DBCOLUMN:rlscsto.k_v -*/
		k_v?: number|null;
        /**DBCOLUMN:rlscsto.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscstoDtoNames { stav_obj = "stav_obj", stav_obj_txt = "stav_obj_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscstoDtoFragments { stav_obj = "*", stav_obj_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscstoDtoTypes { stav_obj = "number", stav_obj_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscstpDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlscstp*/
	interface GReaderRlscstpDto {
        /**DBCOLUMN:rlscstp.stav_pz -*/
		stav_pz?: number|null;
        /**DBCOLUMN:rlscstp.stav_pz_txt -*/
		stav_pz_txt?: string|null;
        /**DBCOLUMN:rlscstp.k_v -*/
		k_v?: number|null;
        /**DBCOLUMN:rlscstp.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscstpDtoNames { stav_pz = "stav_pz", stav_pz_txt = "stav_pz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscstpDtoFragments { stav_pz = "*", stav_pz_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscstpDtoTypes { stav_pz = "number", stav_pz_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscszkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlscstp*/
	interface GReaderRlscszkDto {
		/**DBCOLUMN:rlscszk.stav_spz -*/
		stav_zzk?: number|null;
		/**DBCOLUMN:rlscszk.stav_zzk_txt -*/
		stav_zzk_txt?: string|null;
		/**DBCOLUMN:rlscszk.k_v -*/
		k_v?: number|null;
		/**DBCOLUMN:rlscszk.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscszkDtoNames { stav_zzk = "stav_zzk", stav_zzk_txt = "stav_zzk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscszkDtoFragments { stav_zzk = "*", stav_zzk_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscszkDtoTypes { stav_zzk = "number", stav_zzk_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderRlscszkDtoTypeLengths { stav_zzk_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlsctkoDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlsctko*/
	interface GReaderRlsctkoDto {
        /**DBCOLUMN:rlsctko.typ_kontr -*/
		typ_kontr?: number|null;
        /**DBCOLUMN:rlsctko.typ_kontr_txt -*/
		typ_kontr_txt?: string|null;
        /**DBCOLUMN:rlsctko.k_v - Váha pro třídění*/
		k_v?: number|null;
        /**DBCOLUMN:rlsctko.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlsctkoDtoNames { typ_kontr = "typ_kontr", typ_kontr_txt = "typ_kontr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlsctkoDtoFragments { typ_kontr = "*", typ_kontr_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlsctkoDtoTypes { typ_kontr = "number", typ_kontr_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscvmiDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlscvmi*/
	interface GReaderRlscvmiDto {
        /**DBCOLUMN:rlscvmi.vydejni_misto -*/
		vydejni_misto?: number|null;
        /**DBCOLUMN:rlscvmi.vydejni_misto_txt -*/
		vydejni_misto_txt?: string|null;
        /**DBCOLUMN:rlscvmi.k_v -*/
		k_v?: number|null;
        /**DBCOLUMN:rlscvmi.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlscvmiDtoNames { vydejni_misto = "vydejni_misto", vydejni_misto_txt = "vydejni_misto_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlscvmiDtoFragments { vydejni_misto = "*", vydejni_misto_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlscvmiDtoTypes { vydejni_misto = "number", vydejni_misto_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlscvzdDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlscvzd*/
	interface GReaderRlscvzdDto {
        /**DBCOLUMN:rlscvzd.vzdel -*/
		vzdel?: number|null;
        /**DBCOLUMN:rlscvzd.vzdel_txt -*/
		vzdel_txt?: string|null;
        /**DBCOLUMN:rlscvzd.k_v -*/
		k_v?: number|null;
        /**DBCOLUMN:rlscvzd.k_s -*/
		k_s?: string|null;
        /**DBCOLUMN:rlscvzd.aktivita - Aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:rlscvzd.dat_zmena - Změněno*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:rlscvzd.zmenu_prov - Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GReaderRlscvzdDtoNames { vzdel = "vzdel", vzdel_txt = "vzdel_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GReaderRlscvzdDtoFragments { vzdel = "*", vzdel_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GReaderRlscvzdDtoTypes { vzdel = "number", vzdel_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlsczvyDto.d.ts 

declare namespace Gordic.Rls.Interface {
    /**DBTABLE:rlsczvy*/
	interface GReaderRlsczvyDto {
        /**DBCOLUMN:rlsczvy.zpusob_vyroz -*/
		zpusob_vyroz?: number|null;
        /**DBCOLUMN:rlsczvy.zpusob_vyroz_txt -*/
		zpusob_vyroz_txt?: string|null;
        /**DBCOLUMN:rlsczvy.k_v -*/
		k_v?: number|null;
        /**DBCOLUMN:rlsczvy.k_s -*/
		k_s?: string|null;
	}
	const enum GReaderRlsczvyDtoNames { zpusob_vyroz = "zpusob_vyroz", zpusob_vyroz_txt = "zpusob_vyroz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderRlsczvyDtoFragments { zpusob_vyroz = "*", zpusob_vyroz_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderRlsczvyDtoTypes { zpusob_vyroz = "number", zpusob_vyroz_txt = "string", k_v = "number", k_s = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlsskzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsskzk*/
	interface GReaderRlsskzkDto {
		/**Identifikátor kategorie zkoušky*/
		ixs_kzk?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Název zkr*/
		nazev_zkr?: string|null;
		/**Zakon txt*/
		zakon_txt?: string|null;
		/**Datum platnosti*/
		dat_plat_od?: JsonDate|null;
		/**Datum platnosti*/
		dat_plat_do?: JsonDate|null;
		/**Odbornost*/
		s_odbornost?: number|null;
		/**s_tp_obs*/
		s_tp_obs?: number|null;
		/**s_tp_pov*/
		s_tp_pov?: number|null;
		/**s_tp_max_b*/
		s_tp_max_b?: number|null;
		/**s_tp_min_b*/
		s_tp_min_b?: number|null;
		/**s_tp_min_p*/
		s_tp_min_p?: number|null;
		/**s_tu_obs*/
		s_tu_obs?: number|null;
		/**s_tu_pov*/
		s_tu_pov?: number|null;
		/**s_tu_max_b*/
		s_tu_max_b?: number|null;
		/**s_tu_min_b*/
		s_tu_min_b?: number|null;
		/**s_tu_min_p*/
		s_tu_min_p?: number|null;
		/**s_tpu_pov*/
		s_tpu_pov?: number|null;
		/**s_pra_obs*/
		s_pra_obs?: number|null;
		/**s_pra_pov*/
		s_pra_pov?: number|null;
		/**ixs_duk*/
		ixs_duk?: string|null;
		/**ixs_frm*/
		ixs_frm?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GReaderRlsskzkDtoNames { ixs_kzk = "ixs_kzk", nazev = "nazev", nazev_zkr = "nazev_zkr", zakon_txt = "zakon_txt", dat_plat_od = "dat_plat_od", dat_plat_do = "dat_plat_do", s_odbornost = "s_odbornost", s_tp_obs = "s_tp_obs", s_tp_pov = "s_tp_pov", s_tp_max_b = "s_tp_max_b", s_tp_min_b = "s_tp_min_b", s_tp_min_p = "s_tp_min_p", s_tu_obs = "s_tu_obs", s_tu_pov = "s_tu_pov", s_tu_max_b = "s_tu_max_b", s_tu_min_b = "s_tu_min_b", s_tu_min_p = "s_tu_min_p", s_tpu_pov = "s_tpu_pov", s_pra_obs = "s_pra_obs", s_pra_pov = "s_pra_pov", ixs_duk = "ixs_duk", ixs_frm = "ixs_frm", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GReaderRlsskzkDtoFragments { ixs_kzk = "*", nazev = "*", nazev_zkr = "*", zakon_txt = "*", dat_plat_od = "*", dat_plat_do = "*", s_odbornost = "*", s_tp_obs = "*", s_tp_pov = "*", s_tp_max_b = "*", s_tp_min_b = "*", s_tp_min_p = "*", s_tu_obs = "*", s_tu_pov = "*", s_tu_max_b = "*", s_tu_min_b = "*", s_tu_min_p = "*", s_tpu_pov = "*", s_pra_obs = "*", s_pra_pov = "*", ixs_duk = "*", ixs_frm = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GReaderRlsskzkDtoTypes { ixs_kzk = "string", nazev = "string", nazev_zkr = "string", zakon_txt = "string", dat_plat_od = "JsonDate", dat_plat_do = "JsonDate", s_odbornost = "number", s_tp_obs = "number", s_tp_pov = "number", s_tp_max_b = "number", s_tp_min_b = "number", s_tp_min_p = "number", s_tu_obs = "number", s_tu_pov = "number", s_tu_max_b = "number", s_tu_min_b = "number", s_tu_min_p = "number", s_tpu_pov = "number", s_pra_obs = "number", s_pra_pov = "number", ixs_duk = "string", ixs_frm = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GReaderRlsskzkDtoTypeLengths { ixs_kzk = 12, nazev = 254, nazev_zkr = 100, zakon_txt = 254, ixs_duk = 12, ixs_frm = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rls.Interface\DTO\Readers\GReaderRlsstzkDto.d.ts 

declare namespace Gordic.Rls.Interface {
	/**DBTABLE:rlsskzk*/
	interface GReaderRlsstzkDto {
		/**Identifikátor*/
		ixs_tzk?: string|null;
		/**ixs_kzk*/
		ixs_kzk?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**Datum termin*/
		dat_termin?: JsonDate|null;
		/**Příznak, zda je termín již publikován*/
		s_publ?: number|null;
		/**Místo konání*/
		misto?: string|null;
		/**Kapacita*/
		kapacita?: number|null;
		/**ixs_esu_pre*/
		ixs_esu_pre?: string|null;
		/**predseda*/
		predseda?: string|null;
		/**username*/
		username?: string|null;
		/**clen1*/
		clen1?: string|null;
		/**clen2*/
		clen2?: string|null;
		/**PID Dokumentu jmenovani komise*/
		ixp_jmko?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GReaderRlsstzkDtoNames { ixs_tzk = "ixs_tzk", ixs_kzk = "ixs_kzk", nazev = "nazev", dat_termin = "dat_termin", s_publ = "s_publ", misto = "misto", kapacita = "kapacita", ixs_esu_pre = "ixs_esu_pre", predseda = "predseda", username = "username", clen1 = "clen1", clen2 = "clen2", ixp_jmko = "ixp_jmko", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GReaderRlsstzkDtoFragments { ixs_tzk = "Base", ixs_kzk = "Base", nazev = "Base", dat_termin = "Base", s_publ = "Base", misto = "Base", kapacita = "Base", ixs_esu_pre = "Base", predseda = "Base", username = "Base", clen1 = "Base", clen2 = "Base", ixp_jmko = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base",}
	const enum GReaderRlsstzkDtoTypes { ixs_tzk = "string", ixs_kzk = "string", nazev = "string", dat_termin = "JsonDate", s_publ = "number", misto = "string", kapacita = "number", ixs_esu_pre = "string", predseda = "string", username = "string", clen1 = "string", clen2 = "string", ixp_jmko = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GReaderRlsstzkDtoTypeLengths { ixs_tzk = 12, ixs_kzk = 12, nazev = 254, misto = 254, ixs_esu_pre = 12, predseda = 100, username = 100, clen1 = 100, clen2 = 100, ixp_jmko = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

