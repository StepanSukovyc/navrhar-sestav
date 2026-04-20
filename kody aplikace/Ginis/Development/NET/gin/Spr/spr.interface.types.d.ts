/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       spr.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Spr.Interface\Gordic.Spr.Interface.csproj
*    created     2026-02-16 14:33:52
*    files       Base\Gordic.Spr.Interface.GSprInterfaceCommon.d.ts
*                Controls\Dto\Gordic.Spr.Interface.GSprcstuDto.d.ts
*                Dto\GDetailTerminuDto.d.ts
*                Dto\GDetailUkonuDto.d.ts
*                Dto\GDokumentDto.d.ts
*                Dto\GDruhRizeniDto.d.ts
*                Dto\GHledaniESUDto.d.ts
*                Dto\GHledaniUTZDto.d.ts
*                Dto\GMoznostiAplikaceSprDto.d.ts
*                Dto\GNemovitostSpravnihoRizeniDto.d.ts
*                Dto\GPrehledRizeniDleVPrDto.d.ts
*                Dto\GSeznamDokumentuProVazbuCJDto.d.ts
*                Dto\GSeznamDotcenychOrganuDto.d.ts
*                Dto\GSeznamDotcSubjUkonuDto.d.ts
*                Dto\GSeznamDruhuRizeniProOuoDto.d.ts
*                Dto\GSeznamDruhuUkonuDto.d.ts
*                Dto\GSeznamOstatnichSubjektuDto.d.ts
*                Dto\GSeznamOuoProSprSpisDto.d.ts
*                Dto\GSeznamPopDto.d.ts
*                Dto\GSeznamSprSpisuDto.d.ts
*                Dto\GSeznamTerminuDto.d.ts
*                Dto\GSeznamUcastnikuDto.d.ts
*                Dto\GSeznamUkonuDto.d.ts
*                Dto\GSeznamVazebSubjektuDto.d.ts
*                Dto\GSeznamVprDto.d.ts
*                Dto\GSeznamVPrProSprSpisDto.d.ts
*                Dto\GSeznamZastupcuDto.d.ts
*                Dto\GSpravniRizeniDto.d.ts
*                Dto\GSprcdplDto.d.ts
*                Dto\GSprcdpzDto.d.ts
*                Dto\GSprcdsaDto.d.ts
*                Dto\GSprcdurDto.d.ts
*                Dto\GSprcmprDto.d.ts
*                Dto\GSprcpodDto.d.ts
*                Dto\GSprcpvdDto.d.ts
*                Dto\GSprcrciDto.d.ts
*                Dto\GSprcrslDto.d.ts
*                Dto\GSprcscjDto.d.ts
*                Dto\GSprcslhDto.d.ts
*                Dto\GSprcstaDto.d.ts
*                Dto\GSprctpzDto.d.ts
*                Dto\GSprctrmDto.d.ts
*                Dto\GSprctscDto.d.ts
*                Dto\GSprctzkDto.d.ts
*                Dto\GSprcuciDto.d.ts
*                Dto\GSprcucjDto.d.ts
*                Dto\GSprczarDto.d.ts
*                Dto\GSprczprDto.d.ts
*                Dto\GSprczpuDto.d.ts
*                Dto\GSprsdukProSprSpisDto.d.ts
*                Dto\GSprsouoAllDto.d.ts
*                Dto\GSprsouoDto.d.ts
*                Dto\GSprspsrDto.d.ts
*                Dto\GSprsvprDto.d.ts
*                Dto\GTiskParamsUkonDto.d.ts
*                Dto\GVypocetLhutyDto.d.ts
*                Dto\GWflsdvaSprDto.d.ts
*                Dto\BaseDto\GSprdtrmDto.d.ts
*                Dto\BaseDto\GSprsdukDto.d.ts
*                Dto\BaseDto\GSprsuknDto.d.ts
*                Dto\BaseDto\GSprvucuDto.d.ts
*                Dto\ExtendedDto\GSprDruhUkonuDto.d.ts
*                Dto\ExtendedDto\GSprTerminSpravnihoRizeniDto.d.ts
*                Dto\ExtendedDto\GSprUkonDto.d.ts
*                Dto\Permissions\GSprBaseDetailPermissions.d.ts
*                Permissions\GSpravniRizeniPermissions.d.ts
*                Permissions\GSprUkonPermissions.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Base\Gordic.Spr.Interface.GSprInterfaceCommon.d.ts 

declare namespace Gordic.Spr.Interface {
	/**Výčtový typ říkající zda lze povolit odstraneni*/
	const enum LzePovolitOdstraneniEnum {
		/**odstraneni lze povolit*/
		LzePovolit,
		/**odstraneni nelze povolit*/
		NelzePovolit,
	}
	/**Typy správních spisů*/
	const enum TypSprSpisuEnum {
		/**Identifikator spisu neni správní spis*/
		NeniSpravniSpis=0,
		/**Přípravné řízení*/
		PripravneRizeni=10,
		/**Nalézací řízení*/
		NalezaciRizeni=20,
		/**Řízení o prohlášení nicotnosti*/
		Nicotnost=30,
		/**Ochrana před nečinností*/
		OchranaPredNecinnosti=40,
		/**odvolací řízení v prvním stupni*/
		OdvolaciRizeniI=50,
		/**Přezkumné řízení*/
		OdvolaciRizeniII=60,
		/**přezkumné řízení*/
		PrezkumneRizeni=70,
		/**Obnova řízení*/
		ObnovaRizeni=80,
		/**Nové rozhodnutí*/
		NoveRozhodnuti=90,
		/**Exekuční řízení*/
		ExekucniRizeni=100,
		/**Stížnost*/
		Stiznost=110,
		/**Dožádání*/
		Dozadani=120,
		/**Řízení o správním administrativním (poo.) deliktu*/
		PoradkovyDelikt=130,
		/**Řízení o vydání opravného rozhodnutí*/
		OpravneRozhodnuti=140,
	}
	/**Stav správního spisu*/
	const enum StavSprSpisuEnum {
		/**neurčeno*/
		Neurceno=0,
		/**Probíhající*/
		Probihajici=10,
		/**Přerušeno*/
		Preruseno=20,
		/**Rozhodnuto*/
		Rozhodnuto=30,
		/**Nové rozhodnutí*/
		NoveRozhodnuti=40,
		/**Odvolání*/
		Odvolani=50,
	}
	/**Výčet typů dotčených subjektů spisu*/
	const enum TypSubjektuEnum {
		/**Obecná vazba*/
		ObecnaVazba=0,
		/**dotčený orgán ve SŘ*/
		DotcenyOrgan=30,
		/**účastník ve SŘ dle §27, odst 1*/
		Ucastnik1=40,
		/**zástupce*/
		Zastupce=50,
		/**ostatní subjekt ve SŘ*/
		Ostatni=60,
		/**účastník ve SŘ dle §27, odst 2*/
		Ucastnik2=80,
	}
	/**Výčet typů lhůt*/
	const enum TypLhutyEnum {
		/**neurčeno*/
		Neurceno=0,
		/**Bez lhůty*/
		BezLhuty=10,
		/**Lhůta pro vydání rozhodnutí*/
		LhutaProRozhodnuti=20,
		/**Doba přerušeného řízení*/
		PrerusenoDo=30,
		/**lhuta k úkonu*/
		LhutaKUkonu=40,
		/**Omezení platnosti rozhodnutí*/
		OmezeniPlatnostiRoz=50,
		/**lhůta pro odvolaní*/
		LhutaProOdvolani=60,
		/**Lhůta pro splnění povinnosti*/
		LhutaProSplneniPov=70,
		/**Lhůta pro zahájení řízení*/
		LhutaProZahajeni=80,
		/**Lhůta pro odpor*/
		LhutaProOdpor=90,
		/**Lhůta pro rozhodnutí o odvolání*/
		LhutaProRozhodnutiOOdvolani=100,
	}
	/**Výčet typů dotčených subjektů spisu*/
	const enum TypVecnaPrislusnost {
		/**Věcná příslušnost - obecná*/
		TypVpr0=0,
		/**Věcná příslušnost - zařízení*/
		TypVpr10=10,
		/**Věcná příslušnost - státní dozor*/
		TypVpr20=20,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Controls\Dto\Gordic.Spr.Interface.GSprcstuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcstu
	*      Stav úkonu
	*/
	interface GSprcstuDto {
		/**Kód stavu úkonu*/
		stav_ukn?: number|null;
		/**Stav úkonu*/
		stav_ukn_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
		k_xml?: string|null;
	}
	const enum GSprcstuDtoNames { stav_ukn = "stav_ukn", stav_ukn_txt = "stav_ukn_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcstuDtoFragments { stav_ukn = "*", stav_ukn_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcstuDtoTypes { stav_ukn = "number", stav_ukn_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcstuDtoTypeLengths { stav_ukn_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GDetailTerminuDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Profil rizeni - detail lhuty*/
	interface GDetailTerminuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		stav?: number|null;
        /**Autogenerated.*/
		stav_txt?: string|null;
        /**Autogenerated.*/
		zp_roz?: number|null;
        /**Autogenerated.*/
		zp_roz_txt?: string|null;
        /**Autogenerated.*/
		typ_term?: number|null;
        /**Autogenerated.*/
		typ_term_txt?: string|null;
        /**Autogenerated.*/
		dat_od?: JsonDate|null;
        /**Autogenerated.*/
		dat_do?: JsonDate|null;
        /**Autogenerated.*/
		ixp_ukon_zah?: string|null;
        /**Autogenerated.*/
		ixp_ukon_uza?: string|null;
        /**Autogenerated.*/
		stav_lh?: number|null;
        /**Autogenerated.*/
		stav_lh_txt?: string|null;
        /**Autogenerated.*/
		dat_konlh?: JsonDate|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GDetailTerminuDtoNames { ixp_spis = "ixp_spis", por_cislo = "por_cislo", stav = "stav", stav_txt = "stav_txt", zp_roz = "zp_roz", zp_roz_txt = "zp_roz_txt", typ_term = "typ_term", typ_term_txt = "typ_term_txt", dat_od = "dat_od", dat_do = "dat_do", ixp_ukon_zah = "ixp_ukon_zah", ixp_ukon_uza = "ixp_ukon_uza", stav_lh = "stav_lh", stav_lh_txt = "stav_lh_txt", dat_konlh = "dat_konlh", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDetailTerminuDtoFragments { ixp_spis = "*", por_cislo = "*", stav = "*", stav_txt = "*", zp_roz = "*", zp_roz_txt = "*", typ_term = "*", typ_term_txt = "*", dat_od = "*", dat_do = "*", ixp_ukon_zah = "*", ixp_ukon_uza = "*", stav_lh = "*", stav_lh_txt = "*", dat_konlh = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GDetailTerminuDtoTypes { ixp_spis = "string", por_cislo = "number", stav = "number", stav_txt = "string", zp_roz = "number", zp_roz_txt = "string", typ_term = "number", typ_term_txt = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixp_ukon_zah = "string", ixp_ukon_uza = "string", stav_lh = "number", stav_lh_txt = "string", dat_konlh = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GDetailUkonuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GDetailUkonuDto*/
	interface GDetailUkonuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixp_ukon?: string|null;
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_duk?: string|null;
		/**Autogenerated.*/
		stav_ukn?: number|null;
		/**Autogenerated.*/
		nazev_duk?: string|null;
		/**Autogenerated.*/
		vec?: string|null;
		/**Autogenerated.*/
		topic_pokyn?: string|null;
		/**Autogenerated.*/
		topic_vzor?: string|null;
		/**Autogenerated.*/
		topic_pozn?: string|null;
		/**Autogenerated.*/
		s_vyriz?: number|null;
		/**Autogenerated.*/
		ixs_str?: string|null;
		/**Autogenerated.*/
		dat_vzniku?: JsonDate|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_lhuta?: JsonDate|null;
		/**Autogenerated.*/
		lhuta_dni?: number|null;
		/**Autogenerated.*/
		delka_lh?: number|null;
		/**Autogenerated.*/
		misto_uj?: string|null;
		/**Autogenerated.*/
		s_vypraveno?: number|null;
		/**Autogenerated.*/
		dat_vypraveni?: JsonDate|null;
		/**Autogenerated.*/
		s_doruceno?: number|null;
		/**Autogenerated.*/
		dat_doruceni?: JsonDate|null;
		/**Autogenerated.*/
		s_odvolani?: number|null;
		/**Autogenerated.*/
		dat_odvolani?: JsonDate|null;
		/**Autogenerated.*/
		dat_vykonatel?: JsonDate|null;
		/**Autogenerated.*/
		doba_trvani?: number|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		cj_spis?: string|null;
		/**Autogenerated.*/
		wfl_ixp_init_init?: string|null;
		/**Autogenerated.*/
		wfl_ixp_init_vyriz?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		cj_dok?: string|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**ElektronickyObrazTitle*/
		ElektronickyObrazTitle?: string|null;
		/**VecSSL*/
		VecSSL?: string|null;
		/**DatPrMoc*/
		DatPrMoc?: JsonDate|null;
		/**novy_zaznam*/
		novy_zaznam?: boolean|null;
	}
	const enum GDetailUkonuDtoNames { ixp_ukon = "ixp_ukon", ixp_spis = "ixp_spis", ixs_duk = "ixs_duk", stav_ukn = "stav_ukn", nazev_duk = "nazev_duk", vec = "vec", topic_pokyn = "topic_pokyn", topic_vzor = "topic_vzor", topic_pozn = "topic_pozn", s_vyriz = "s_vyriz", ixs_str = "ixs_str", dat_vzniku = "dat_vzniku", dat_od = "dat_od", dat_lhuta = "dat_lhuta", lhuta_dni = "lhuta_dni", delka_lh = "delka_lh", misto_uj = "misto_uj", s_vypraveno = "s_vypraveno", dat_vypraveni = "dat_vypraveni", s_doruceno = "s_doruceno", dat_doruceni = "dat_doruceni", s_odvolani = "s_odvolani", dat_odvolani = "dat_odvolani", dat_vykonatel = "dat_vykonatel", doba_trvani = "doba_trvani", akt_znacka = "akt_znacka", cj_spis = "cj_spis", wfl_ixp_init_init = "wfl_ixp_init_init", wfl_ixp_init_vyriz = "wfl_ixp_init_vyriz", por_cislo = "por_cislo", cj_dok = "cj_dok", dat_pod = "dat_pod", priz_spis = "priz_spis", stav_pis = "stav_pis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ElektronickyObrazTitle = "ElektronickyObrazTitle", VecSSL = "VecSSL", DatPrMoc = "DatPrMoc", novy_zaznam = "novy_zaznam", Permissions = "Permissions",}
	const enum GDetailUkonuDtoFragments { ixp_ukon = "*", ixp_spis = "*", ixs_duk = "*", stav_ukn = "*", nazev_duk = "*", vec = "*", topic_pokyn = "*", topic_vzor = "*", topic_pozn = "*", s_vyriz = "*", ixs_str = "*", dat_vzniku = "*", dat_od = "*", dat_lhuta = "*", lhuta_dni = "*", delka_lh = "*", misto_uj = "*", s_vypraveno = "*", dat_vypraveni = "*", s_doruceno = "*", dat_doruceni = "*", s_odvolani = "*", dat_odvolani = "*", dat_vykonatel = "*", doba_trvani = "*", akt_znacka = "*", cj_spis = "*", wfl_ixp_init_init = "*", wfl_ixp_init_vyriz = "*", por_cislo = "*", cj_dok = "*", dat_pod = "*", priz_spis = "*", stav_pis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ElektronickyObrazTitle = "*", VecSSL = "*", DatPrMoc = "*", novy_zaznam = "*", Permissions = "*",}
	const enum GDetailUkonuDtoTypes { ixp_ukon = "string", ixp_spis = "string", ixs_duk = "string", stav_ukn = "number", nazev_duk = "string", vec = "string", topic_pokyn = "string", topic_vzor = "string", topic_pozn = "string", s_vyriz = "number", ixs_str = "string", dat_vzniku = "JsonDate", dat_od = "JsonDate", dat_lhuta = "JsonDate", lhuta_dni = "number", delka_lh = "number", misto_uj = "string", s_vypraveno = "number", dat_vypraveni = "JsonDate", s_doruceno = "number", dat_doruceni = "JsonDate", s_odvolani = "number", dat_odvolani = "JsonDate", dat_vykonatel = "JsonDate", doba_trvani = "number", akt_znacka = "string", cj_spis = "string", wfl_ixp_init_init = "string", wfl_ixp_init_vyriz = "string", por_cislo = "number", cj_dok = "string", dat_pod = "JsonDate", priz_spis = "number", stav_pis = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ElektronickyObrazTitle = "string", VecSSL = "string", DatPrMoc = "JsonDate", novy_zaznam = "boolean", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailUkonuDtoTypeLengths { poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GDokumentDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**DBTABLE:wflspid*/
	interface GDokumentDto {
        /**DBCOLUMN:wflspid.ixp*/
		ixp?: string|null;
        /**DBCOLUMN:wflspid.lic*/
		lic?: string|null;
        /**DBCOLUMN:wflspid.ixp_spis*/
		ixp_spis?: string|null;
        /**DBCOLUMN:wflspid.priz_spis*/
		priz_spis?: number|null;
        /**DBCOLUMN:wflspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
        /**DBCOLUMN:wflspid.ixs_su_akt*/
		ixs_su_akt?: string|null;
        /**DBCOLUMN:wflspid.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:wflspid.akt_znacka*/
		akt_znacka?: string|null;
        /**DBCOLUMN:wflspid.stav_dist*/
		stav_dist?: number|null;
        /**DBCOLUMN:wflspid.stav_pis*/
		stav_pis?: number|null;
        /**DBCOLUMN:wflspid.typ_ag*/
		typ_ag?: number|null;
        /**DBCOLUMN:wflspid.ktg_typ*/
		ktg_typ?: number|null;
        /**DBCOLUMN:wflspid.ixs_typ*/
		ixs_typ?: string|null;
        /**DBCOLUMN:wflspid.s_prij*/
		s_prij?: number|null;
        /**DBCOLUMN:wflspid.s_ssl*/
		s_ssl?: number|null;
        /**DBCOLUMN:wflspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:wflspid.zmenu_prov*/
		zmenu_prov?: string|null;
        /**DBCOLUMN:wflspid.s_ele*/
		s_ele?: number|null;
        /**DBCOLUMN:wflspid.s_fyz*/
		s_fyz?: number|null;
        /**DBCOLUMN:wflspid.misto_vzniku*/
		misto_vzniku?: string|null;
        /**DBCOLUMN:wflspid.s_sgn*/
		s_sgn?: number|null;
        /**DBCOLUMN:wflspid.dat_pod*/
		dat_pod?: JsonDate|null;
        /**DBCOLUMN:wflspid.cs_akt_znacka*/
		cs_akt_znacka?: string|null;
        /**DBCOLUMN:wflspid.priz_view_ssl*/
		priz_view_ssl?: number|null;
        /**DBCOLUMN:wflspid.uzo*/
		uzo?: string|null;
        /**DBCOLUMN:wflspid.spis_pl*/
		spis_pl?: string|null;
        /**DBCOLUMN:wflspid.spis_znak*/
		spis_znak?: string|null;
        /**DBCOLUMN:wflspid.ixs_fun_wfl*/
		ixs_fun_wfl?: string|null;
        /**DBCOLUMN:wflspid.s_uloz*/
		s_uloz?: number|null;
        /**DBCOLUMN:wflspid.dat_uloz*/
		dat_uloz?: JsonDate|null;
        /**DBCOLUMN:wflspid.ixs_su_wfl*/
		ixs_su_wfl?: string|null;
        /**DBCOLUMN:wflspid.s_odes*/
		s_odes?: number|null;
        /**DBCOLUMN:wflspid.dat_mpd0*/
		dat_mpd0?: JsonDate|null;
        /**DBCOLUMN:wflspid.priz_cj*/
		priz_cj?: number|null;
        /**DBCOLUMN:wflspid.dat_vyriz*/
		dat_vyriz?: JsonDate|null;
        /**DBCOLUMN:wflspid.ixs_cj*/
		ixs_cj?: string|null;
        /**DBCOLUMN:wflspid.ixs_lpc*/
		ixs_lpc?: string|null;
        /**DBCOLUMN:wflspid.puvod*/
		puvod?: number|null;
        /**DBCOLUMN:wflspid.s_schval*/
		s_schval?: number|null;
        /**DBCOLUMN:wflspid.umisteni*/
		umisteni?: string|null;
        /**DBCOLUMN:wflspid.st_utaj_id*/
		st_utaj_id?: number|null;
        /**DBCOLUMN:wflspid.wfl_pristup*/
		wfl_pristup?: number|null;
        /**DBCOLUMN:wflspid.skar_znak*/
		skar_znak?: string|null;
        /**DBCOLUMN:wflspid.skar_lhuta*/
		skar_lhuta?: number|null;
        /**DBCOLUMN:wflspid.rok_spo_uda*/
		rok_spo_uda?: number|null;
        /**DBCOLUMN:wflspid.ixp_top*/
		ixp_top?: string|null;
        /**DBCOLUMN:wflspid.typ_spis*/
		typ_spis?: number|null;
        /**DBCOLUMN:wflspid.barcode*/
		barcode?: string|null;
        /**DBCOLUMN:wflspid.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
        /**DBCOLUMN:wflspid.ixs_ext*/
		ixs_ext?: string|null;
        /**DBCOLUMN:wflspid.rok_skartace*/
		rok_skartace?: number|null;
        /**DBCOLUMN:wflspid.ixs_spu*/
		ixs_spu?: string|null;
        /**DBCOLUMN:wflspid.poc_listu*/
		poc_listu?: string|null;
        /**DBCOLUMN:wflspid.poc_stran*/
		poc_stran?: number|null;
        /**DBCOLUMN:wflspid.poc_kop*/
		poc_kop?: number|null;
        /**DBCOLUMN:wflspid.poc_priloh*/
		poc_priloh?: number|null;
        /**DBCOLUMN:wflspid.poc_l_priloh*/
		poc_l_priloh?: string|null;
        /**DBCOLUMN:wflspid.cj*/
		cj?: string|null;
        /**DBCOLUMN:wflspid.ico*/
		ico?: string|null;
	}
	const enum GDokumentDtoNames { ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico",}
	const enum GDokumentDtoFragments { ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*",}
	const enum GDokumentDtoTypes { ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GDruhRizeniDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsdsr*/
	interface GDruhRizeniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:sprsdsr.ixs_dsr*/
		ixs_dsr?: string|null;
		/**DBCOLUMN:sprsdsr.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sprsdsr.typ_sr*/
		typ_sr?: number|null;
		/**DBCOLUMN:sprsdsr.sslden*/
		sslden?: string|null;
		/**DBCOLUMN:sprsdsr.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sprsdsr.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sprsdsr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sprsdsr.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sprsdsr.lhuta_vyriz*/
		lhuta_vyriz?: number|null;
		/**DBCOLUMN:sprsdsr.obl_sr*/
		obl_sr?: number|null;
		/**DBCOLUMN:sprsdsr.vpr*/
		vpr?: string|null;
		/**DBCOLUMN:sprsdsr.mpr*/
		mpr?: number|null;
		/**DBCOLUMN:sprsdsr.ixs_ouo_pr_i*/
		ixs_ouo_pr_i?: string|null;
		/**DBCOLUMN:sprsdsr.ixs_ouo_pr_ii*/
		ixs_ouo_pr_ii?: string|null;
		/**DBCOLUMN:sprsdsr.ixs_dva_odes*/
		ixs_dva_odes?: string|null;
		/**DBCOLUMN:sprsdsr.s_z_uca1*/
		s_z_uca1?: number|null;
		/**DBCOLUMN:sprsdsr.s_z_uca2*/
		s_z_uca2?: number|null;
		/**DBCOLUMN:sprsdsr.s_z_dotco*/
		s_z_dotco?: number|null;
		/**DBCOLUMN:sprsdsr.s_z_ost*/
		s_z_ost?: number|null;
		/**DBCOLUMN:sprsdsr.s_mist_pr*/
		s_mist_pr?: number|null;
		/**DBCOLUMN:sprsdsr.s_vpr_dsr*/
		s_vpr_dsr?: number|null;
		/**DBCOLUMN:sprsdsr.s_cas_evid*/
		s_cas_evid?: number|null;
		/**DBCOLUMN:sprsdsr.s_ed_dat_z*/
		s_ed_dat_z?: number|null;
		/**DBCOLUMN:sprsdsr.s_rozklad*/
		s_rozklad?: number|null;
		/**DBCOLUMN:sprsdsr.s_ouo*/
		s_ouo?: number|null;
		/**DBCOLUMN:sprsdsr.ixs_ouo*/
		ixs_ouo?: string|null;
		/**DBCOLUMN:sprsdsr.s_z_vpr*/
		s_z_vpr?: number|null;
		/**DBCOLUMN:sprsdsr.s_z_platby*/
		s_z_platby?: number|null;
		/**DBCOLUMN:sprsdsr.ixs_dsr_rozkl*/
		ixs_dsr_rozkl?: string|null;
		/**DBCOLUMN:sprsdsr.zkr_odb*/
		zkr_odb?: string|null;
		/**DBCOLUMN:sprsdsr.zkr_odd*/
		zkr_odd?: string|null;
		/**DBCOLUMN:sprsdsr.popis*/
		popis?: string|null;
		/**DBCOLUMN:sprsdsr.zakl_met*/
		zakl_met?: number|null;
		/**DBCOLUMN:sprsdsr.s_aviz_lh*/
		s_aviz_lh?: number|null;
	}
	const enum GDruhRizeniDtoNames { ixs_dsr = "ixs_dsr", nazev = "nazev", typ_sr = "typ_sr", sslden = "sslden", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", lhuta_vyriz = "lhuta_vyriz", obl_sr = "obl_sr", vpr = "vpr", mpr = "mpr", ixs_ouo_pr_i = "ixs_ouo_pr_i", ixs_ouo_pr_ii = "ixs_ouo_pr_ii", ixs_dva_odes = "ixs_dva_odes", s_z_uca1 = "s_z_uca1", s_z_uca2 = "s_z_uca2", s_z_dotco = "s_z_dotco", s_z_ost = "s_z_ost", s_mist_pr = "s_mist_pr", s_vpr_dsr = "s_vpr_dsr", s_cas_evid = "s_cas_evid", s_ed_dat_z = "s_ed_dat_z", s_rozklad = "s_rozklad", s_ouo = "s_ouo", ixs_ouo = "ixs_ouo", s_z_vpr = "s_z_vpr", s_z_platby = "s_z_platby", ixs_dsr_rozkl = "ixs_dsr_rozkl", zkr_odb = "zkr_odb", zkr_odd = "zkr_odd", popis = "popis", zakl_met = "zakl_met", s_aviz_lh = "s_aviz_lh", Permissions = "Permissions",}
	const enum GDruhRizeniDtoFragments { ixs_dsr = "*", nazev = "*", typ_sr = "*", sslden = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", lhuta_vyriz = "*", obl_sr = "*", vpr = "*", mpr = "*", ixs_ouo_pr_i = "*", ixs_ouo_pr_ii = "*", ixs_dva_odes = "*", s_z_uca1 = "*", s_z_uca2 = "*", s_z_dotco = "*", s_z_ost = "*", s_mist_pr = "*", s_vpr_dsr = "*", s_cas_evid = "*", s_ed_dat_z = "*", s_rozklad = "*", s_ouo = "*", ixs_ouo = "*", s_z_vpr = "*", s_z_platby = "*", ixs_dsr_rozkl = "*", zkr_odb = "*", zkr_odd = "*", popis = "*", zakl_met = "*", s_aviz_lh = "*", Permissions = "*",}
	const enum GDruhRizeniDtoTypes { ixs_dsr = "string", nazev = "string", typ_sr = "number", sslden = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", lhuta_vyriz = "number", obl_sr = "number", vpr = "string", mpr = "number", ixs_ouo_pr_i = "string", ixs_ouo_pr_ii = "string", ixs_dva_odes = "string", s_z_uca1 = "number", s_z_uca2 = "number", s_z_dotco = "number", s_z_ost = "number", s_mist_pr = "number", s_vpr_dsr = "number", s_cas_evid = "number", s_ed_dat_z = "number", s_rozklad = "number", s_ouo = "number", ixs_ouo = "string", s_z_vpr = "number", s_z_platby = "number", ixs_dsr_rozkl = "string", zkr_odb = "string", zkr_odd = "string", popis = "string", zakl_met = "number", s_aviz_lh = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDruhRizeniDtoTypeLengths { ixs_dsr = 12, nazev = 254, sslden = 6, poznamka = 254, zmenu_prov = 12, vpr = 50, ixs_ouo_pr_i = 12, ixs_ouo_pr_ii = 12, ixs_dva_odes = 12, ixs_ouo = 12, ixs_dsr_rozkl = 12, zkr_odb = 10, zkr_odd = 10, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GHledaniESUDto.d.ts 

declare namespace Gordic.Spr.Interface.Dto {
    /**Dto pro hedani dle ucastniku SR*/
	interface GHledaniESUDto extends Gordic.Wfl.Interface.Hledani.HledaniBaseDto {
        /**Pridano pro vyhledavani*/
		lic_zast?: string|null;
        /**Pridano pro vyhledavani*/
		ixs_esu?: string|null;
        /**Pridano dle select na serveru*/
		akt_znacka?: string|null;
        /**Pridano dle select na serveru*/
		misto_vzniku?: string|null;
        /**Pridano dle select na serveru*/
		nazev?: string|null;
        /**Pridano dle select na serveru*/
		Vlastnik?: string|null;
        /**el_bitmap*/
		el_bitmap?: number|null;
        /**Img_vyr*/
		Img_vyr?: number|null;
        /**doctype_bitmap*/
		doctype_bitmap?: number|null;
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		dat_zap?: JsonDate|null;
        /**Autogenerated.*/
		dat_pod?: JsonDate|null;
        /**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
        /**Autogenerated.*/
		dat_lhuta?: JsonDate|null;
        /**Autogenerated.*/
		dat_pr_moc?: JsonDate|null;
        /**Autogenerated.*/
		typ_vazby_txt?: string|null;
        /**Autogenerated.*/
		ixs_dva_txt?: string|null;
	}
	const enum GHledaniESUDtoNames { lic_zast = "lic_zast", ixs_esu = "ixs_esu", akt_znacka = "akt_znacka", misto_vzniku = "misto_vzniku", nazev = "nazev", Vlastnik = "Vlastnik", el_bitmap = "el_bitmap", Img_vyr = "Img_vyr", doctype_bitmap = "doctype_bitmap", ixp_spis = "ixp_spis", dat_zap = "dat_zap", dat_pod = "dat_pod", dat_zahajeni = "dat_zahajeni", dat_lhuta = "dat_lhuta", dat_pr_moc = "dat_pr_moc", typ_vazby_txt = "typ_vazby_txt", ixs_dva_txt = "ixs_dva_txt", TypDatabase = "TypDatabase", DateInterval = "DateInterval",}
	const enum GHledaniESUDtoFragments { lic_zast = "*", ixs_esu = "*", akt_znacka = "*", misto_vzniku = "*", nazev = "*", Vlastnik = "*", el_bitmap = "*", Img_vyr = "*", doctype_bitmap = "*", ixp_spis = "*", dat_zap = "*", dat_pod = "*", dat_zahajeni = "*", dat_lhuta = "*", dat_pr_moc = "*", typ_vazby_txt = "*", ixs_dva_txt = "*", TypDatabase = "*", DateInterval = "*",}
	const enum GHledaniESUDtoTypes { lic_zast = "string", ixs_esu = "string", akt_znacka = "string", misto_vzniku = "string", nazev = "string", Vlastnik = "string", el_bitmap = "number", Img_vyr = "number", doctype_bitmap = "number", ixp_spis = "string", dat_zap = "JsonDate", dat_pod = "JsonDate", dat_zahajeni = "JsonDate", dat_lhuta = "JsonDate", dat_pr_moc = "JsonDate", typ_vazby_txt = "string", ixs_dva_txt = "string", TypDatabase = "number", DateInterval = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GHledaniUTZDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Dto pro hledani dle UTZ*/
	interface GHledaniUTZDto extends Gordic.Wfl.Interface.Hledani.HledaniBaseDto {
        /**Pridano pro vyhledavani*/
		lic_zast?: string|null;
        /**Pridano pro vyhledavani*/
		ixs_esu?: string|null;
        /**Pridano dle select na serveru*/
		akt_znacka?: string|null;
        /**Pridano dle select na serveru*/
		misto_vzniku?: string|null;
        /**Pridano dle select na serveru*/
		nazev?: string|null;
        /**Pridano dle select na serveru*/
		Vlastnik?: string|null;
        /**el_bitmap*/
		el_bitmap?: number|null;
        /**Img_vyr*/
		Img_vyr?: number|null;
        /**doctype_bitmap*/
		doctype_bitmap?: number|null;
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		dat_zap?: JsonDate|null;
        /**Autogenerated.*/
		dat_pod?: JsonDate|null;
        /**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
        /**Autogenerated.*/
		dat_lhuta?: JsonDate|null;
        /**Autogenerated.*/
		dat_pr_moc?: JsonDate|null;
        /**Autogenerated.*/
		evid_cis?: string|null;
	}
	const enum GHledaniUTZDtoNames { lic_zast = "lic_zast", ixs_esu = "ixs_esu", akt_znacka = "akt_znacka", misto_vzniku = "misto_vzniku", nazev = "nazev", Vlastnik = "Vlastnik", el_bitmap = "el_bitmap", Img_vyr = "Img_vyr", doctype_bitmap = "doctype_bitmap", ixp_spis = "ixp_spis", dat_zap = "dat_zap", dat_pod = "dat_pod", dat_zahajeni = "dat_zahajeni", dat_lhuta = "dat_lhuta", dat_pr_moc = "dat_pr_moc", evid_cis = "evid_cis", TypDatabase = "TypDatabase", DateInterval = "DateInterval",}
	const enum GHledaniUTZDtoFragments { lic_zast = "*", ixs_esu = "*", akt_znacka = "*", misto_vzniku = "*", nazev = "*", Vlastnik = "*", el_bitmap = "*", Img_vyr = "*", doctype_bitmap = "*", ixp_spis = "*", dat_zap = "*", dat_pod = "*", dat_zahajeni = "*", dat_lhuta = "*", dat_pr_moc = "*", evid_cis = "*", TypDatabase = "*", DateInterval = "*",}
	const enum GHledaniUTZDtoTypes { lic_zast = "string", ixs_esu = "string", akt_znacka = "string", misto_vzniku = "string", nazev = "string", Vlastnik = "string", el_bitmap = "number", Img_vyr = "number", doctype_bitmap = "number", ixp_spis = "string", dat_zap = "JsonDate", dat_pod = "JsonDate", dat_zahajeni = "JsonDate", dat_lhuta = "JsonDate", dat_pr_moc = "JsonDate", evid_cis = "string", TypDatabase = "number", DateInterval = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GMoznostiAplikaceSprDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**Dto pro moznosti aplikace*/
	interface GMoznostiAplikaceSprDto {
		/**Misto vzniku*/
		MistoVzniku?: string|null;
		/**Nazev uradu*/
		NazevUradu?: string|null;
		/**Sidlo uradu*/
		SidloUradu?: string|null;
		/**Nazev uradu 2.pad*/
		NazevUraduP2?: string|null;
		/**Sidlo uradu 6.pad*/
		SidloUraduP6?: string|null;
		/**Odbor sekce*/
		OdborSekce?: string|null;
		/**Adresa uradu*/
		AdresaUradu?: string|null;
		/**PSC*/
		PSC?: string|null;
		/**Odvolaci organ 6.pad*/
		OdvolaciOrganP3?: string|null;
		/**Omezovat spisy na denik*/
		OmezovatSpisyNaDenik?: boolean|null;
		/**Omezujici denik*/
		OmezujiciDenik?: string|null;
		/**Skryti seznamu pripravne*/
		SkrytSeznamPripravne?: boolean|null;
		/**Skryti seznamu nalezaci*/
		SkrytSeznamNalezaci?: boolean|null;
		/**Skryti seznamu prezkumne*/
		SkrytSeznamPrezkumne?: boolean|null;
		/**Skryti seznamu exekuce*/
		SkrytSeznamExekuce?: boolean|null;
		/**Skryti seznamu stiznosti*/
		SkrytSeznamStiznosti?: boolean|null;
		/**Skryti seznamu dozadani*/
		SkrytSeznamDozadani?: boolean|null;
		/**Skryti seznamu delikty*/
		SkrytSeznamPoradkoveDelikty?: boolean|null;
		/**Skryti seznamu rozhodnuti*/
		SkrytSeznamOpravneRozhodnuti?: boolean|null;
		/**Skryti seznamu rizeniIIst*/
		SkrytSeznamOdvolaciRizeniIIst?: boolean|null;
		/**Skryti seznamu rozklad*/
		SkrytSeznamRozklad?: boolean|null;
		/**Opravnena uredni osoba 1*/
		Ouo1?: string|null;
		/**Opravnena uredni osoba 2*/
		Ouo2?: string|null;
		/**Opravnena uredni osoba 3*/
		Ouo3?: string|null;
		/**Opravnena uredni osoba 4*/
		Ouo4?: string|null;
		/**Opravnena uredni osoba 5*/
		Ouo5?: string|null;
	}
	const enum GMoznostiAplikaceSprDtoNames { MistoVzniku = "MistoVzniku", NazevUradu = "NazevUradu", SidloUradu = "SidloUradu", NazevUraduP2 = "NazevUraduP2", SidloUraduP6 = "SidloUraduP6", OdborSekce = "OdborSekce", AdresaUradu = "AdresaUradu", PSC = "PSC", OdvolaciOrganP3 = "OdvolaciOrganP3", OmezovatSpisyNaDenik = "OmezovatSpisyNaDenik", OmezujiciDenik = "OmezujiciDenik", SkrytSeznamPripravne = "SkrytSeznamPripravne", SkrytSeznamNalezaci = "SkrytSeznamNalezaci", SkrytSeznamPrezkumne = "SkrytSeznamPrezkumne", SkrytSeznamExekuce = "SkrytSeznamExekuce", SkrytSeznamStiznosti = "SkrytSeznamStiznosti", SkrytSeznamDozadani = "SkrytSeznamDozadani", SkrytSeznamPoradkoveDelikty = "SkrytSeznamPoradkoveDelikty", SkrytSeznamOpravneRozhodnuti = "SkrytSeznamOpravneRozhodnuti", SkrytSeznamOdvolaciRizeniIIst = "SkrytSeznamOdvolaciRizeniIIst", SkrytSeznamRozklad = "SkrytSeznamRozklad", Ouo1 = "Ouo1", Ouo2 = "Ouo2", Ouo3 = "Ouo3", Ouo4 = "Ouo4", Ouo5 = "Ouo5",}
	const enum GMoznostiAplikaceSprDtoFragments { MistoVzniku = "*", NazevUradu = "*", SidloUradu = "*", NazevUraduP2 = "*", SidloUraduP6 = "*", OdborSekce = "*", AdresaUradu = "*", PSC = "*", OdvolaciOrganP3 = "*", OmezovatSpisyNaDenik = "*", OmezujiciDenik = "*", SkrytSeznamPripravne = "*", SkrytSeznamNalezaci = "*", SkrytSeznamPrezkumne = "*", SkrytSeznamExekuce = "*", SkrytSeznamStiznosti = "*", SkrytSeznamDozadani = "*", SkrytSeznamPoradkoveDelikty = "*", SkrytSeznamOpravneRozhodnuti = "*", SkrytSeznamOdvolaciRizeniIIst = "*", SkrytSeznamRozklad = "*", Ouo1 = "*", Ouo2 = "*", Ouo3 = "*", Ouo4 = "*", Ouo5 = "*",}
	const enum GMoznostiAplikaceSprDtoTypes { MistoVzniku = "string", NazevUradu = "string", SidloUradu = "string", NazevUraduP2 = "string", SidloUraduP6 = "string", OdborSekce = "string", AdresaUradu = "string", PSC = "string", OdvolaciOrganP3 = "string", OmezovatSpisyNaDenik = "boolean", OmezujiciDenik = "string", SkrytSeznamPripravne = "boolean", SkrytSeznamNalezaci = "boolean", SkrytSeznamPrezkumne = "boolean", SkrytSeznamExekuce = "boolean", SkrytSeznamStiznosti = "boolean", SkrytSeznamDozadani = "boolean", SkrytSeznamPoradkoveDelikty = "boolean", SkrytSeznamOpravneRozhodnuti = "boolean", SkrytSeznamOdvolaciRizeniIIst = "boolean", SkrytSeznamRozklad = "boolean", Ouo1 = "string", Ouo2 = "string", Ouo3 = "string", Ouo4 = "string", Ouo5 = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GNemovitostSpravnihoRizeniDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsnem*/
	interface GNemovitostSpravnihoRizeniDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor spisu správního řízení*/
		ixp_spis?: string|null;
		/**Pořadové číslo záznamu nemovitosti na spisu správního řízení*/
		por_cislo?: number|null;
		/**Identifikční popisný název nemovitosti*/
		nazev?: string|null;
		/**Typ nemovitosti na záznamu - parcela, budova, jednotka (, část budovy)*/
		typ_nem?: number|null;
		/**Identifikátor parcely v katastru nemovitostí - ISKN*/
		id_parcely?: string|null;
		/**Identifikátor budovy v katastru nemovitostí - ISKN*/
		id_budovy?: string|null;
		/**Typ budovy (budova s číslem donmovním nebo evidenčním)*/
		typ_budovy?: number|null;
		/**Číslo domovní*/
		cislo_domovni?: number|null;
		/**Identifikátor jednotky v katastru nemovitostí - ISKN*/
		id_jednotky?: string|null;
		/**Název obce*/
		obec_nazev?: string|null;
		/**Název katastrálního území*/
		kat_uzemi_nazev?: string|null;
		/**Číslo parcely složené i s uvedením druhu nebo poddělení*/
		cislo_par_nazev?: string|null;
		/**Název druhu pozemku*/
		druh_poz_nazev?: string|null;
		/**Výměra parcely*/
		vymera_par?: number|null;
		/**DBCOLUMN:sprsriz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sprsriz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sprsriz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sprsriz.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GNemovitostSpravnihoRizeniDtoNames { ixp_spis = "ixp_spis", por_cislo = "por_cislo", nazev = "nazev", typ_nem = "typ_nem", id_parcely = "id_parcely", id_budovy = "id_budovy", typ_budovy = "typ_budovy", cislo_domovni = "cislo_domovni", id_jednotky = "id_jednotky", obec_nazev = "obec_nazev", kat_uzemi_nazev = "kat_uzemi_nazev", cislo_par_nazev = "cislo_par_nazev", druh_poz_nazev = "druh_poz_nazev", vymera_par = "vymera_par", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GNemovitostSpravnihoRizeniDtoFragments { ixp_spis = "*", por_cislo = "*", nazev = "*", typ_nem = "*", id_parcely = "*", id_budovy = "*", typ_budovy = "*", cislo_domovni = "*", id_jednotky = "*", obec_nazev = "*", kat_uzemi_nazev = "*", cislo_par_nazev = "*", druh_poz_nazev = "*", vymera_par = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GNemovitostSpravnihoRizeniDtoTypes { ixp_spis = "string", por_cislo = "number", nazev = "string", typ_nem = "number", id_parcely = "string", id_budovy = "string", typ_budovy = "number", cislo_domovni = "number", id_jednotky = "string", obec_nazev = "string", kat_uzemi_nazev = "string", cislo_par_nazev = "string", druh_poz_nazev = "string", vymera_par = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GNemovitostSpravnihoRizeniDtoTypeLengths { ixp_spis = 12, nazev = 254, id_parcely = 30, id_budovy = 30, id_jednotky = 30, obec_nazev = 50, kat_uzemi_nazev = 50, cislo_par_nazev = 50, druh_poz_nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GPrehledRizeniDleVPrDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Dto pro Přehled řízení dle věcné příslušnosti*/
	interface GPrehledRizeniDleVPrDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		typ_sr?: number|null;
        /**Autogenerated.*/
		ixs_dsr?: string|null;
        /**Autogenerated.*/
		nazev_dsr?: string|null;
        /**Autogenerated.*/
		ixp_spis_p?: string|null;
        /**Autogenerated.*/
		dat_zap?: JsonDate|null;
        /**Autogenerated.*/
		dat_pod?: JsonDate|null;
        /**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
        /**Autogenerated.*/
		dat_lhuta?: JsonDate|null;
        /**Autogenerated.*/
		dat_pr_moc?: JsonDate|null;
        /**Autogenerated.*/
		dat_pr_moc_ssl?: JsonDate|null;
        /**Autogenerated.*/
		stav?: number|null;
        /**Autogenerated.*/
		stav_txt?: string|null;
        /**Autogenerated.*/
		dat_do?: JsonDate|null;
        /**Autogenerated.*/
		zakon_txt?: string|null;
        /**el_bitmap*/
		el_bitmap?: number|null;
        /**Img_vyr*/
		Img_vyr?: number|null;
        /**doctype_bitmap*/
		doctype_bitmap?: number|null;
        /**Pridano filtracni kriterium*/
		typ_datumu?: Gordic.Spr.Interface.TypDatumovehoRozsahu|null;
        /**Pridano filtracni kriterium*/
		dat_od?: JsonDate|null;
        /**identifikátor věcné příslušnosti*/
		ixsVpr?: string|null;
        /**Pridano dle Definice gridu*/
		dat_vyriz?: JsonDate|null;
        /**pridano dle select na serveru wfl*/
		vlastnik?: string|null;
        /**pridano dle select na serveru wfl*/
		nazev?: string|null;
        /**pridano dle select na serveru wfl*/
		misto_vzniku?: string|null;
        /**pridano dle select na serveru wfl*/
		akt_znacka?: string|null;
	}
	const enum GPrehledRizeniDleVPrDtoNames { ixp_spis = "ixp_spis", typ_sr = "typ_sr", ixs_dsr = "ixs_dsr", nazev_dsr = "nazev_dsr", ixp_spis_p = "ixp_spis_p", dat_zap = "dat_zap", dat_pod = "dat_pod", dat_zahajeni = "dat_zahajeni", dat_lhuta = "dat_lhuta", dat_pr_moc = "dat_pr_moc", dat_pr_moc_ssl = "dat_pr_moc_ssl", stav = "stav", stav_txt = "stav_txt", dat_do = "dat_do", zakon_txt = "zakon_txt", el_bitmap = "el_bitmap", Img_vyr = "Img_vyr", doctype_bitmap = "doctype_bitmap", typ_datumu = "typ_datumu", dat_od = "dat_od", ixsVpr = "ixsVpr", dat_vyriz = "dat_vyriz", vlastnik = "vlastnik", nazev = "nazev", misto_vzniku = "misto_vzniku", akt_znacka = "akt_znacka",}
	const enum GPrehledRizeniDleVPrDtoFragments { ixp_spis = "*", typ_sr = "*", ixs_dsr = "*", nazev_dsr = "*", ixp_spis_p = "*", dat_zap = "*", dat_pod = "*", dat_zahajeni = "*", dat_lhuta = "*", dat_pr_moc = "*", dat_pr_moc_ssl = "*", stav = "*", stav_txt = "*", dat_do = "*", zakon_txt = "*", el_bitmap = "*", Img_vyr = "*", doctype_bitmap = "*", typ_datumu = "*", dat_od = "*", ixsVpr = "*", dat_vyriz = "*", vlastnik = "*", nazev = "*", misto_vzniku = "*", akt_znacka = "*",}
	const enum GPrehledRizeniDleVPrDtoTypes { ixp_spis = "string", typ_sr = "number", ixs_dsr = "string", nazev_dsr = "string", ixp_spis_p = "string", dat_zap = "JsonDate", dat_pod = "JsonDate", dat_zahajeni = "JsonDate", dat_lhuta = "JsonDate", dat_pr_moc = "JsonDate", dat_pr_moc_ssl = "JsonDate", stav = "number", stav_txt = "string", dat_do = "JsonDate", zakon_txt = "string", el_bitmap = "number", Img_vyr = "number", doctype_bitmap = "number", typ_datumu = "Gordic.Spr.Interface.TypDatumovehoRozsahu", dat_od = "JsonDate", ixsVpr = "string", dat_vyriz = "JsonDate", vlastnik = "string", nazev = "string", misto_vzniku = "string", akt_znacka = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamDokumentuProVazbuCJDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**GSeznamDokumentuProVazbuCJDto*/
	interface GSeznamDokumentuProVazbuCJDto {
        /**Autogenerated.*/
		ixp?: string|null;
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		nazev?: string|null;
        /**Autogenerated.*/
		akt_znacka?: string|null;
        /**Autogenerated.*/
		misto_vzniku?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		dat_pod?: JsonDate|null;
        /**Autogenerated.*/
		cj?: string|null;
	}
	const enum GSeznamDokumentuProVazbuCJDtoNames { ixp = "ixp", ixp_spis = "ixp_spis", nazev = "nazev", akt_znacka = "akt_znacka", misto_vzniku = "misto_vzniku", por_cislo = "por_cislo", dat_pod = "dat_pod", cj = "cj",}
	const enum GSeznamDokumentuProVazbuCJDtoFragments { ixp = "*", ixp_spis = "*", nazev = "*", akt_znacka = "*", misto_vzniku = "*", por_cislo = "*", dat_pod = "*", cj = "*",}
	const enum GSeznamDokumentuProVazbuCJDtoTypes { ixp = "string", ixp_spis = "string", nazev = "string", akt_znacka = "string", misto_vzniku = "string", por_cislo = "number", dat_pod = "JsonDate", cj = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamDotcenychOrganuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamDotcenychOrganuDto*/
	interface GSeznamDotcenychOrganuDto {
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		lic_zast?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		text_zast?: string|null;
		/**Autogenerated.*/
		ixs_dva_nazev?: string|null;
		/**Autogenerated.*/
		ixs_esu_txt?: string|null;
		/**Autogenerated.*/
		ixs_prev?: string|null;
		/**Autogenerated.*/
		zmena_esu?: number|null;
		/**Autogenerated.*/
		zakon_do?: string|null;
		/**Autogenerated.*/
		typ_sc_txt?: number|null;
	}
	const enum GSeznamDotcenychOrganuDtoNames { ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", typ_vazby = "typ_vazby", lic_zast = "lic_zast", por_zast = "por_zast", text_zast = "text_zast", ixs_dva_nazev = "ixs_dva_nazev", ixs_esu_txt = "ixs_esu_txt", ixs_prev = "ixs_prev", zmena_esu = "zmena_esu", zakon_do = "zakon_do", typ_sc_txt = "typ_sc_txt",}
	const enum GSeznamDotcenychOrganuDtoFragments { ixp_spis = "*", ixs_esu = "*", typ_vazby = "*", lic_zast = "*", por_zast = "*", text_zast = "*", ixs_dva_nazev = "*", ixs_esu_txt = "*", ixs_prev = "*", zmena_esu = "*", zakon_do = "*", typ_sc_txt = "*",}
	const enum GSeznamDotcenychOrganuDtoTypes { ixp_spis = "string", ixs_esu = "string", typ_vazby = "number", lic_zast = "string", por_zast = "number", text_zast = "string", ixs_dva_nazev = "string", ixs_esu_txt = "string", ixs_prev = "string", zmena_esu = "number", zakon_do = "string", typ_sc_txt = "number",}
	const enum GSeznamDotcenychOrganuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamDotcSubjUkonuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamDotcenychOrganuDto*/
	interface GSeznamDotcSubjUkonuDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixp_ukon?: string|null;
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		lic_zast?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		ixs_dva_nazev?: string|null;
		/**Autogenerated.*/
		ixs_esu_txt?: string|null;
		/**Autogenerated.*/
		s_prim?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		s_odes?: number|null;
		/**Autogenerated.*/
		dat_odes?: JsonDate|null;
		/**Autogenerated.*/
		dat_potvrz?: JsonDate|null;
		/**Autogenerated.*/
		s_dor_txt?: string|null;
		/**Autogenerated.*/
		s_vypraveno?: number|null;
		/**Autogenerated.*/
		dat_vypraveni?: JsonDate|null;
		/**Autogenerated.*/
		s_doruceno?: number|null;
		/**Autogenerated.*/
		dat_doruceni?: JsonDate|null;
		/**Autogenerated.*/
		poznamka_dor?: string|null;
		/**Autogenerated.*/
		s_m_odv?: number|null;
		/**Autogenerated.*/
		dat_lh_odv?: JsonDate|null;
		/**Autogenerated.*/
		s_odv?: number|null;
		/**Autogenerated.*/
		s_po_lh?: number|null;
		/**Autogenerated.*/
		s_r_odv?: number|null;
		/**Autogenerated.*/
		vyr_odv?: string|null;
		/**aktivita*/
		aktivita?: number|null;
	}
	const enum GSeznamDotcSubjUkonuDtoNames { ixp_ukon = "ixp_ukon", ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", typ_vazby = "typ_vazby", lic_zast = "lic_zast", por_zast = "por_zast", ixs_dva_nazev = "ixs_dva_nazev", ixs_esu_txt = "ixs_esu_txt", s_prim = "s_prim", poznamka = "poznamka", s_odes = "s_odes", dat_odes = "dat_odes", dat_potvrz = "dat_potvrz", s_dor_txt = "s_dor_txt", s_vypraveno = "s_vypraveno", dat_vypraveni = "dat_vypraveni", s_doruceno = "s_doruceno", dat_doruceni = "dat_doruceni", poznamka_dor = "poznamka_dor", s_m_odv = "s_m_odv", dat_lh_odv = "dat_lh_odv", s_odv = "s_odv", s_po_lh = "s_po_lh", s_r_odv = "s_r_odv", vyr_odv = "vyr_odv", aktivita = "aktivita", Permissions = "Permissions",}
	const enum GSeznamDotcSubjUkonuDtoFragments { ixp_ukon = "*", ixp_spis = "*", ixs_esu = "*", typ_vazby = "*", lic_zast = "*", por_zast = "*", ixs_dva_nazev = "*", ixs_esu_txt = "*", s_prim = "*", poznamka = "*", s_odes = "*", dat_odes = "*", dat_potvrz = "*", s_dor_txt = "*", s_vypraveno = "*", dat_vypraveni = "*", s_doruceno = "*", dat_doruceni = "*", poznamka_dor = "*", s_m_odv = "*", dat_lh_odv = "*", s_odv = "*", s_po_lh = "*", s_r_odv = "*", vyr_odv = "*", aktivita = "*", Permissions = "*",}
	const enum GSeznamDotcSubjUkonuDtoTypes { ixp_ukon = "string", ixp_spis = "string", ixs_esu = "string", typ_vazby = "number", lic_zast = "string", por_zast = "number", ixs_dva_nazev = "string", ixs_esu_txt = "string", s_prim = "number", poznamka = "string", s_odes = "number", dat_odes = "JsonDate", dat_potvrz = "JsonDate", s_dor_txt = "string", s_vypraveno = "number", dat_vypraveni = "JsonDate", s_doruceno = "number", dat_doruceni = "JsonDate", poznamka_dor = "string", s_m_odv = "number", dat_lh_odv = "JsonDate", s_odv = "number", s_po_lh = "number", s_r_odv = "number", vyr_odv = "string", aktivita = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSeznamDotcSubjUkonuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamDruhuRizeniProOuoDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamDruhuRizeniProOuoDto*/
	interface GSeznamDruhuRizeniProOuoDto {
		/**Autogenerated.*/
		ixs_dsr?: string|null;
		/**Autogenerated.*/
		typ_sr?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		typ_sr_txt?: string|null;
	}
	const enum GSeznamDruhuRizeniProOuoDtoNames { ixs_dsr = "ixs_dsr", typ_sr = "typ_sr", nazev = "nazev", typ_sr_txt = "typ_sr_txt",}
	const enum GSeznamDruhuRizeniProOuoDtoFragments { ixs_dsr = "*", typ_sr = "*", nazev = "*", typ_sr_txt = "*",}
	const enum GSeznamDruhuRizeniProOuoDtoTypes { ixs_dsr = "string", typ_sr = "number", nazev = "string", typ_sr_txt = "string",}
	const enum GSeznamDruhuRizeniProOuoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamDruhuUkonuDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Seznam druhů úkonů Dto*/
	interface GSeznamDruhuUkonuDto {
        /**zda patří do oblíbených*/
		favorite?: boolean|null;
        /**Autogenerated.*/
		ixs_duk?: string|null;
        /**Autogenerated.*/
		nazev?: string|null;
        /**Autogenerated.*/
		zakon_txt?: string|null;
        /**Autogenerated.*/
		ktg_typ_txt?: string|null;
        /**Autogenerated.*/
		spis_pl?: string|null;
        /**Autogenerated.*/
		spis_znak?: string|null;
        /**Autogenerated.*/
		typ_ukn?: number|null;
        /**Autogenerated.*/
		typ_ukn_txt?: string|null;
        /**Autogenerated.*/
		typ_ukn_popis?: string|null;
        /**Autogenerated.*/
		skupina?: string|null;
        /**Autogenerated.*/
		podskupina?: string|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		aktivita_txt?: string|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		nazev_zmenu_prov?: string|null;
	}
	const enum GSeznamDruhuUkonuDtoNames { favorite = "favorite", ixs_duk = "ixs_duk", nazev = "nazev", zakon_txt = "zakon_txt", ktg_typ_txt = "ktg_typ_txt", spis_pl = "spis_pl", spis_znak = "spis_znak", typ_ukn = "typ_ukn", typ_ukn_txt = "typ_ukn_txt", typ_ukn_popis = "typ_ukn_popis", skupina = "skupina", podskupina = "podskupina", poznamka = "poznamka", aktivita = "aktivita", aktivita_txt = "aktivita_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_zmenu_prov = "nazev_zmenu_prov",}
	const enum GSeznamDruhuUkonuDtoFragments { favorite = "*", ixs_duk = "*", nazev = "*", zakon_txt = "*", ktg_typ_txt = "*", spis_pl = "*", spis_znak = "*", typ_ukn = "*", typ_ukn_txt = "*", typ_ukn_popis = "*", skupina = "*", podskupina = "*", poznamka = "*", aktivita = "*", aktivita_txt = "*", dat_zmena = "*", zmenu_prov = "*", nazev_zmenu_prov = "*",}
	const enum GSeznamDruhuUkonuDtoTypes { favorite = "boolean", ixs_duk = "string", nazev = "string", zakon_txt = "string", ktg_typ_txt = "string", spis_pl = "string", spis_znak = "string", typ_ukn = "number", typ_ukn_txt = "string", typ_ukn_popis = "string", skupina = "string", podskupina = "string", poznamka = "string", aktivita = "number", aktivita_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamOstatnichSubjektuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamOstatnichSubjektuDto*/
	interface GSeznamOstatnichSubjektuDto {
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		lic_zast?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		text_zast?: string|null;
		/**Autogenerated.*/
		ixs_dva?: string|null;
		/**Autogenerated.*/
		ixs_dva_nazev?: string|null;
		/**Autogenerated.*/
		ixs_esu_txt?: string|null;
		/**Autogenerated.*/
		ixs_prev?: string|null;
		/**Autogenerated.*/
		zmena_esu?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**zastupce*/
		zastupce?: string|null;
	}
	const enum GSeznamOstatnichSubjektuDtoNames { ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", typ_vazby = "typ_vazby", lic_zast = "lic_zast", por_zast = "por_zast", text_zast = "text_zast", ixs_dva = "ixs_dva", ixs_dva_nazev = "ixs_dva_nazev", ixs_esu_txt = "ixs_esu_txt", ixs_prev = "ixs_prev", zmena_esu = "zmena_esu", poznamka = "poznamka", zastupce = "zastupce",}
	const enum GSeznamOstatnichSubjektuDtoFragments { ixp_spis = "*", ixs_esu = "*", typ_vazby = "*", lic_zast = "*", por_zast = "*", text_zast = "*", ixs_dva = "*", ixs_dva_nazev = "*", ixs_esu_txt = "*", ixs_prev = "*", zmena_esu = "*", poznamka = "*", zastupce = "*",}
	const enum GSeznamOstatnichSubjektuDtoTypes { ixp_spis = "string", ixs_esu = "string", typ_vazby = "number", lic_zast = "string", por_zast = "number", text_zast = "string", ixs_dva = "string", ixs_dva_nazev = "string", ixs_esu_txt = "string", ixs_prev = "string", zmena_esu = "number", poznamka = "string", zastupce = "string",}
	const enum GSeznamOstatnichSubjektuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamOuoProSprSpisDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**GSeznamOuoProSprSpisDto*/
	interface GSeznamOuoProSprSpisDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		ixs_ouo?: string|null;
        /**Autogenerated.*/
		nazev_ouo?: string|null;
        /**Autogenerated.*/
		nazev_ref?: string|null;
        /**Autogenerated.*/
		nazev_fun?: string|null;
        /**Autogenerated.*/
		typ_ouo_txt?: string|null;
        /**Autogenerated.*/
		ucinnost_txt?: string|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Datum pověření*/
		dat_roz_pov?: JsonDate|null;
        /**Datum odvolání*/
		dat_roz_odv?: JsonDate|null;
	}
	const enum GSeznamOuoProSprSpisDtoNames { ixp_spis = "ixp_spis", ixs_ouo = "ixs_ouo", nazev_ouo = "nazev_ouo", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", typ_ouo_txt = "typ_ouo_txt", ucinnost_txt = "ucinnost_txt", poznamka = "poznamka", dat_roz_pov = "dat_roz_pov", dat_roz_odv = "dat_roz_odv",}
	const enum GSeznamOuoProSprSpisDtoFragments { ixp_spis = "*", ixs_ouo = "*", nazev_ouo = "*", nazev_ref = "*", nazev_fun = "*", typ_ouo_txt = "*", ucinnost_txt = "*", poznamka = "*", dat_roz_pov = "*", dat_roz_odv = "*",}
	const enum GSeznamOuoProSprSpisDtoTypes { ixp_spis = "string", ixs_ouo = "string", nazev_ouo = "string", nazev_ref = "string", nazev_fun = "string", typ_ouo_txt = "string", ucinnost_txt = "string", poznamka = "string", dat_roz_pov = "JsonDate", dat_roz_odv = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamPopDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**GSeznamPopDto*/
	interface GSeznamPopDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		radek_pop?: number|null;
        /**Autogenerated.*/
		kod_spo_txt?: string|null;
        /**Autogenerated.*/
		ixs_esu_txt?: string|null;
        /**Autogenerated.*/
		text_pop?: string|null;
        /**Autogenerated.*/
		c_pop?: JsonDecimal|null;
        /**Autogenerated.*/
		dat_zapl?: JsonDate|null;
        /**Autogenerated.*/
		s_pop_prominuti?: number|null;
        /**Autogenerated.*/
		zp?: number|null;
        /**Autogenerated.*/
		zp_txt?: string|null;
        /**Autogenerated.*/
		druh_pl?: number|null;
        /**Autogenerated.*/
		druh_pl_txt?: string|null;
        /**Autogenerated.*/
		druh_sa?: number|null;
        /**Autogenerated.*/
		druh_sa_txt?: string|null;
        /**Autogenerated.*/
		zpu_pl?: number|null;
        /**Autogenerated.*/
		zpu_pl_txt?: string|null;
        /**Autogenerated.*/
		typ_eko_txt?: string|null;
        /**Autogenerated.*/
		ixp_eko_dok?: string|null;
        /**Autogenerated.*/
		vs?: string|null;
        /**Autogenerated.*/
		dat_vyzvy?: JsonDate|null;
        /**Autogenerated.*/
		ixp_ukon?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		aktivita_txt?: string|null;
	}
	const enum GSeznamPopDtoNames { ixp_spis = "ixp_spis", radek_pop = "radek_pop", kod_spo_txt = "kod_spo_txt", ixs_esu_txt = "ixs_esu_txt", text_pop = "text_pop", c_pop = "c_pop", dat_zapl = "dat_zapl", s_pop_prominuti = "s_pop_prominuti", zp = "zp", zp_txt = "zp_txt", druh_pl = "druh_pl", druh_pl_txt = "druh_pl_txt", druh_sa = "druh_sa", druh_sa_txt = "druh_sa_txt", zpu_pl = "zpu_pl", zpu_pl_txt = "zpu_pl_txt", typ_eko_txt = "typ_eko_txt", ixp_eko_dok = "ixp_eko_dok", vs = "vs", dat_vyzvy = "dat_vyzvy", ixp_ukon = "ixp_ukon", aktivita = "aktivita", aktivita_txt = "aktivita_txt", Permissions = "Permissions",}
	const enum GSeznamPopDtoFragments { ixp_spis = "*", radek_pop = "*", kod_spo_txt = "*", ixs_esu_txt = "*", text_pop = "*", c_pop = "*", dat_zapl = "*", s_pop_prominuti = "*", zp = "*", zp_txt = "*", druh_pl = "*", druh_pl_txt = "*", druh_sa = "*", druh_sa_txt = "*", zpu_pl = "*", zpu_pl_txt = "*", typ_eko_txt = "*", ixp_eko_dok = "*", vs = "*", dat_vyzvy = "*", ixp_ukon = "*", aktivita = "*", aktivita_txt = "*", Permissions = "*",}
	const enum GSeznamPopDtoTypes { ixp_spis = "string", radek_pop = "number", kod_spo_txt = "string", ixs_esu_txt = "string", text_pop = "string", c_pop = "JsonDecimal", dat_zapl = "JsonDate", s_pop_prominuti = "number", zp = "number", zp_txt = "string", druh_pl = "number", druh_pl_txt = "string", druh_sa = "number", druh_sa_txt = "string", zpu_pl = "number", zpu_pl_txt = "string", typ_eko_txt = "string", ixp_eko_dok = "string", vs = "string", dat_vyzvy = "JsonDate", ixp_ukon = "string", aktivita = "number", aktivita_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamSprSpisuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamSprSpisuDto*/
	interface GSeznamSprSpisuDto {
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		typ_sr?: number|null;
		/**Autogenerated.*/
		ixs_dsr?: string|null;
		/**Autogenerated.*/
		nazev_dsr?: string|null;
		/**Autogenerated.*/
		ixp_spis_p?: string|null;
		/**Autogenerated.*/
		dat_zap?: JsonDate|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		dat_zahajeni?: JsonDate|null;
		/**Autogenerated.*/
		dat_vyriz?: JsonDate|null;
		/**Autogenerated.*/
		dat_lhuta?: JsonDate|null;
		/**Autogenerated.*/
		dat_rozh?: JsonDate|null;
		/**Poslední úkon ixp_ukon*/
		pu_ixp_ukon?: string|null;
		/**Poslední úkon pu_s_vypraveno*/
		pu_s_vypraveno?: number|null;
		/**Poslední úkon pu_dat_vypraveni*/
		pu_dat_vypraveni?: JsonDate|null;
		/**Poslední úkon pu_s_doruceno*/
		pu_s_doruceno?: number|null;
		/**Poslední úkon pu_dat_doruceni*/
		pu_dat_doruceni?: JsonDate|null;
		/**Autogenerated.*/
		dat_pr_moc?: JsonDate|null;
		/**Autogenerated.*/
		dat_pr_moc_ssl?: JsonDate|null;
		/**Autogenerated.*/
		stav?: number|null;
		/**Autogenerated.*/
		stav_txt?: string|null;
		/**Autogenerated.*/
		zp_roz?: number|null;
		/**Autogenerated.*/
		zp_roz_txt?: string|null;
		/**Autogenerated.*/
		typ_pod?: number|null;
		/**Autogenerated.*/
		typ_pod_txt?: string|null;
		/**Autogenerated.*/
		popis_pod?: string|null;
		/**Autogenerated.*/
		zdroj_pod?: string|null;
		/**Autogenerated.*/
		vpr?: string|null;
		/**Autogenerated.*/
		mpr?: number|null;
		/**Autogenerated.*/
		mpr_txt?: string|null;
		/**Autogenerated.*/
		esu_txt_zast?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Místo vzniku*/
		misto_vzniku?: string|null;
		/**Sp.Zn.*/
		akt_znacka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Vlastník*/
		vlastnik?: string|null;
		/**Datum vyřízení do*/
		dat_vyriz_do?: JsonDate|null;
		/**el_bitmap*/
		el_bitmap?: number|null;
		/**Img_vyr*/
		Img_vyr?: number|null;
		/**doctype_bitmap*/
		doctype_bitmap?: number|null;
		/**el_bitmap*/
		lhuta_dni?: number|null;
		/**trm_dat_od*/
		trm_dat_od?: JsonDate|null;
		/**trm_dat_od*/
		trm_dat_do?: JsonDate|null;
		/**trm_dat_konlh*/
		trm_dat_konlh?: JsonDate|null;
		/**trm_dat_lh_puv*/
		trm_dat_lh_puv?: JsonDate|null;
		/**trm_typ_term_txt*/
		trm_typ_term_txt?: string|null;
		/**trm_stav_lh_txt*/
		trm_stav_lh_txt?: string|null;
	}
	const enum GSeznamSprSpisuDtoNames { ixp_spis = "ixp_spis", typ_sr = "typ_sr", ixs_dsr = "ixs_dsr", nazev_dsr = "nazev_dsr", ixp_spis_p = "ixp_spis_p", dat_zap = "dat_zap", dat_pod = "dat_pod", dat_zahajeni = "dat_zahajeni", dat_vyriz = "dat_vyriz", dat_lhuta = "dat_lhuta", dat_rozh = "dat_rozh", pu_ixp_ukon = "pu_ixp_ukon", pu_s_vypraveno = "pu_s_vypraveno", pu_dat_vypraveni = "pu_dat_vypraveni", pu_s_doruceno = "pu_s_doruceno", pu_dat_doruceni = "pu_dat_doruceni", dat_pr_moc = "dat_pr_moc", dat_pr_moc_ssl = "dat_pr_moc_ssl", stav = "stav", stav_txt = "stav_txt", zp_roz = "zp_roz", zp_roz_txt = "zp_roz_txt", typ_pod = "typ_pod", typ_pod_txt = "typ_pod_txt", popis_pod = "popis_pod", zdroj_pod = "zdroj_pod", vpr = "vpr", mpr = "mpr", mpr_txt = "mpr_txt", esu_txt_zast = "esu_txt_zast", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", misto_vzniku = "misto_vzniku", akt_znacka = "akt_znacka", nazev = "nazev", vlastnik = "vlastnik", dat_vyriz_do = "dat_vyriz_do", el_bitmap = "el_bitmap", Img_vyr = "Img_vyr", doctype_bitmap = "doctype_bitmap", lhuta_dni = "lhuta_dni", trm_dat_od = "trm_dat_od", trm_dat_do = "trm_dat_do", trm_dat_konlh = "trm_dat_konlh", trm_dat_lh_puv = "trm_dat_lh_puv", trm_typ_term_txt = "trm_typ_term_txt", trm_stav_lh_txt = "trm_stav_lh_txt",}
	const enum GSeznamSprSpisuDtoFragments { ixp_spis = "*", typ_sr = "*", ixs_dsr = "*", nazev_dsr = "*", ixp_spis_p = "*", dat_zap = "*", dat_pod = "*", dat_zahajeni = "*", dat_vyriz = "*", dat_lhuta = "*", dat_rozh = "*", pu_ixp_ukon = "*", pu_s_vypraveno = "*", pu_dat_vypraveni = "*", pu_s_doruceno = "*", pu_dat_doruceni = "*", dat_pr_moc = "*", dat_pr_moc_ssl = "*", stav = "*", stav_txt = "*", zp_roz = "*", zp_roz_txt = "*", typ_pod = "*", typ_pod_txt = "*", popis_pod = "*", zdroj_pod = "*", vpr = "*", mpr = "*", mpr_txt = "*", esu_txt_zast = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", misto_vzniku = "*", akt_znacka = "*", nazev = "*", vlastnik = "*", dat_vyriz_do = "*", el_bitmap = "*", Img_vyr = "*", doctype_bitmap = "*", lhuta_dni = "*", trm_dat_od = "*", trm_dat_do = "*", trm_dat_konlh = "*", trm_dat_lh_puv = "*", trm_typ_term_txt = "*", trm_stav_lh_txt = "*",}
	const enum GSeznamSprSpisuDtoTypes { ixp_spis = "string", typ_sr = "number", ixs_dsr = "string", nazev_dsr = "string", ixp_spis_p = "string", dat_zap = "JsonDate", dat_pod = "JsonDate", dat_zahajeni = "JsonDate", dat_vyriz = "JsonDate", dat_lhuta = "JsonDate", dat_rozh = "JsonDate", pu_ixp_ukon = "string", pu_s_vypraveno = "number", pu_dat_vypraveni = "JsonDate", pu_s_doruceno = "number", pu_dat_doruceni = "JsonDate", dat_pr_moc = "JsonDate", dat_pr_moc_ssl = "JsonDate", stav = "number", stav_txt = "string", zp_roz = "number", zp_roz_txt = "string", typ_pod = "number", typ_pod_txt = "string", popis_pod = "string", zdroj_pod = "string", vpr = "string", mpr = "number", mpr_txt = "string", esu_txt_zast = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", misto_vzniku = "string", akt_znacka = "string", nazev = "string", vlastnik = "string", dat_vyriz_do = "JsonDate", el_bitmap = "number", Img_vyr = "number", doctype_bitmap = "number", lhuta_dni = "number", trm_dat_od = "JsonDate", trm_dat_do = "JsonDate", trm_dat_konlh = "JsonDate", trm_dat_lh_puv = "JsonDate", trm_typ_term_txt = "string", trm_stav_lh_txt = "string",}
	const enum GSeznamSprSpisuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamTerminuDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**GSeznamTerminuDto*/
	interface GSeznamTerminuDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		stav_txt?: string|null;
        /**Autogenerated.*/
		zp_roz_txt?: string|null;
        /**Autogenerated.*/
		typ_term_txt?: string|null;
        /**Autogenerated.*/
		dat_od?: JsonDate|null;
        /**Autogenerated.*/
		dat_do?: JsonDate|null;
        /**Autogenerated.*/
		stav_lh_txt?: string|null;
        /**Autogenerated.*/
		dat_konlh?: JsonDate|null;
        /**Autogenerated.*/
		ixp_ukon_zah?: string|null;
        /**Autogenerated.*/
		ixp_ukon_uza?: string|null;
        /**Autogenerated.*/
		nazev_ukon?: string|null;
        /**Autogenerated.*/
		nazev_ukon_uziv?: string|null;
	}
	const enum GSeznamTerminuDtoNames { ixp_spis = "ixp_spis", por_cislo = "por_cislo", stav_txt = "stav_txt", zp_roz_txt = "zp_roz_txt", typ_term_txt = "typ_term_txt", dat_od = "dat_od", dat_do = "dat_do", stav_lh_txt = "stav_lh_txt", dat_konlh = "dat_konlh", ixp_ukon_zah = "ixp_ukon_zah", ixp_ukon_uza = "ixp_ukon_uza", nazev_ukon = "nazev_ukon", nazev_ukon_uziv = "nazev_ukon_uziv",}
	const enum GSeznamTerminuDtoFragments { ixp_spis = "*", por_cislo = "*", stav_txt = "*", zp_roz_txt = "*", typ_term_txt = "*", dat_od = "*", dat_do = "*", stav_lh_txt = "*", dat_konlh = "*", ixp_ukon_zah = "*", ixp_ukon_uza = "*", nazev_ukon = "*", nazev_ukon_uziv = "*",}
	const enum GSeznamTerminuDtoTypes { ixp_spis = "string", por_cislo = "number", stav_txt = "string", zp_roz_txt = "string", typ_term_txt = "string", dat_od = "JsonDate", dat_do = "JsonDate", stav_lh_txt = "string", dat_konlh = "JsonDate", ixp_ukon_zah = "string", ixp_ukon_uza = "string", nazev_ukon = "string", nazev_ukon_uziv = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamUcastnikuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamUcastnikuDto*/
	interface GSeznamUcastnikuDto {
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		lic_zast?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		text_zast?: string|null;
		/**Autogenerated.*/
		ixs_dva_nazev?: string|null;
		/**Autogenerated.*/
		ixs_esu_txt?: string|null;
		/**Autogenerated.*/
		ixs_prev?: string|null;
		/**Autogenerated.*/
		zmena_esu?: number|null;
		/**Autogenerated.*/
		zastupce_txt?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
	}
	const enum GSeznamUcastnikuDtoNames { ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", typ_vazby = "typ_vazby", lic_zast = "lic_zast", por_zast = "por_zast", text_zast = "text_zast", ixs_dva_nazev = "ixs_dva_nazev", ixs_esu_txt = "ixs_esu_txt", ixs_prev = "ixs_prev", zmena_esu = "zmena_esu", zastupce_txt = "zastupce_txt", poznamka = "poznamka",}
	const enum GSeznamUcastnikuDtoFragments { ixp_spis = "*", ixs_esu = "*", typ_vazby = "*", lic_zast = "*", por_zast = "*", text_zast = "*", ixs_dva_nazev = "*", ixs_esu_txt = "*", ixs_prev = "*", zmena_esu = "*", zastupce_txt = "*", poznamka = "*",}
	const enum GSeznamUcastnikuDtoTypes { ixp_spis = "string", ixs_esu = "string", typ_vazby = "number", lic_zast = "string", por_zast = "number", text_zast = "string", ixs_dva_nazev = "string", ixs_esu_txt = "string", ixs_prev = "string", zmena_esu = "number", zastupce_txt = "string", poznamka = "string",}
	const enum GSeznamUcastnikuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamUkonuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamUkonuDto*/
	interface GSeznamUkonuDto {
		/**Autogenerated.*/
		ixp_ukon?: string|null;
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_duk?: string|null;
		/**Autogenerated.*/
		nazev_duk?: string|null;
		/**Autogenerated.*/
		nazev_uziv?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		cj_spis?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		cj_dok?: string|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		s_vypraveno?: number|null;
		/**Autogenerated.*/
		dat_vypraveni?: JsonDate|null;
		/**Autogenerated.*/
		s_doruceno?: number|null;
		/**Autogenerated.*/
		dat_doruceni?: JsonDate|null;
		/**Autogenerated.*/
		dat_pr_moc?: JsonDate|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSeznamUkonuDtoNames { ixp_ukon = "ixp_ukon", ixp_spis = "ixp_spis", ixs_duk = "ixs_duk", nazev_duk = "nazev_duk", nazev_uziv = "nazev_uziv", akt_znacka = "akt_znacka", cj_spis = "cj_spis", por_cislo = "por_cislo", cj_dok = "cj_dok", dat_pod = "dat_pod", s_vypraveno = "s_vypraveno", dat_vypraveni = "dat_vypraveni", s_doruceno = "s_doruceno", dat_doruceni = "dat_doruceni", dat_pr_moc = "dat_pr_moc", priz_spis = "priz_spis", stav_pis = "stav_pis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSeznamUkonuDtoFragments { ixp_ukon = "*", ixp_spis = "*", ixs_duk = "*", nazev_duk = "*", nazev_uziv = "*", akt_znacka = "*", cj_spis = "*", por_cislo = "*", cj_dok = "*", dat_pod = "*", s_vypraveno = "*", dat_vypraveni = "*", s_doruceno = "*", dat_doruceni = "*", dat_pr_moc = "*", priz_spis = "*", stav_pis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSeznamUkonuDtoTypes { ixp_ukon = "string", ixp_spis = "string", ixs_duk = "string", nazev_duk = "string", nazev_uziv = "string", akt_znacka = "string", cj_spis = "string", por_cislo = "number", cj_dok = "string", dat_pod = "JsonDate", s_vypraveno = "number", dat_vypraveni = "JsonDate", s_doruceno = "number", dat_doruceni = "JsonDate", dat_pr_moc = "JsonDate", priz_spis = "number", stav_pis = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSeznamUkonuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamVazebSubjektuDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**GSeznamVazebSubjektuDto*/
	interface GSeznamVazebSubjektuDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		ixs_esu_1?: string|null;
        /**Autogenerated.*/
		typ_vazby_1?: number|null;
        /**Autogenerated.*/
		lic_zast_1?: string|null;
        /**Autogenerated.*/
		por_zast_1?: number|null;
        /**Autogenerated.*/
		ixs_dva_1_nazev?: string|null;
        /**Autogenerated.*/
		ixs_esu_1_txt?: string|null;
        /**Autogenerated.*/
		ixs_esu_2?: string|null;
        /**Autogenerated.*/
		typ_vazby_2?: number|null;
        /**Autogenerated.*/
		lic_zast_2?: string|null;
        /**Autogenerated.*/
		por_zast_2?: number|null;
        /**Autogenerated.*/
		ixs_dva_2_nazev?: string|null;
        /**Autogenerated.*/
		ixs_esu_2_txt?: string|null;
        /**Autogenerated.*/
		poznamka?: string|null;
	}
	const enum GSeznamVazebSubjektuDtoNames { ixp_spis = "ixp_spis", ixs_esu_1 = "ixs_esu_1", typ_vazby_1 = "typ_vazby_1", lic_zast_1 = "lic_zast_1", por_zast_1 = "por_zast_1", ixs_dva_1_nazev = "ixs_dva_1_nazev", ixs_esu_1_txt = "ixs_esu_1_txt", ixs_esu_2 = "ixs_esu_2", typ_vazby_2 = "typ_vazby_2", lic_zast_2 = "lic_zast_2", por_zast_2 = "por_zast_2", ixs_dva_2_nazev = "ixs_dva_2_nazev", ixs_esu_2_txt = "ixs_esu_2_txt", poznamka = "poznamka",}
	const enum GSeznamVazebSubjektuDtoFragments { ixp_spis = "*", ixs_esu_1 = "*", typ_vazby_1 = "*", lic_zast_1 = "*", por_zast_1 = "*", ixs_dva_1_nazev = "*", ixs_esu_1_txt = "*", ixs_esu_2 = "*", typ_vazby_2 = "*", lic_zast_2 = "*", por_zast_2 = "*", ixs_dva_2_nazev = "*", ixs_esu_2_txt = "*", poznamka = "*",}
	const enum GSeznamVazebSubjektuDtoTypes { ixp_spis = "string", ixs_esu_1 = "string", typ_vazby_1 = "number", lic_zast_1 = "string", por_zast_1 = "number", ixs_dva_1_nazev = "string", ixs_esu_1_txt = "string", ixs_esu_2 = "string", typ_vazby_2 = "number", lic_zast_2 = "string", por_zast_2 = "number", ixs_dva_2_nazev = "string", ixs_esu_2_txt = "string", poznamka = "string",}
    /**Výčet možností typu vzájemné vazby*/
	const enum TypVzVazbyEnum {
        /**Zástupci*/
		Zastupci=0,
        /**Zastupovaní*/
		Zastupovani=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamVprDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Dto seznam věcných příslušností*/
	interface GSeznamVprDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Pridano pro moznost pridani ke spisu*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		ixs_vpr?: string|null;
        /**Autogenerated.*/
		zakon_txt?: string|null;
        /**Autogenerated.*/
		zakonik?: string|null;
        /**Autogenerated.*/
		paragraf?: string|null;
        /**Autogenerated.*/
		odstavec?: string|null;
        /**Autogenerated.*/
		pismeno?: string|null;
        /**Autogenerated.*/
		kategorie?: number|null;
        /**Autogenerated.*/
		poznamka?: string|null;
        /**Autogenerated.*/
		aktivita_txt?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		nazev_zmenu_prov?: string|null;
	}
	const enum GSeznamVprDtoNames { ixp_spis = "ixp_spis", ixs_vpr = "ixs_vpr", zakon_txt = "zakon_txt", zakonik = "zakonik", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", kategorie = "kategorie", poznamka = "poznamka", aktivita_txt = "aktivita_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_zmenu_prov = "nazev_zmenu_prov", Permissions = "Permissions",}
	const enum GSeznamVprDtoFragments { ixp_spis = "*", ixs_vpr = "*", zakon_txt = "*", zakonik = "*", paragraf = "*", odstavec = "*", pismeno = "*", kategorie = "*", poznamka = "*", aktivita_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_zmenu_prov = "*", Permissions = "*",}
	const enum GSeznamVprDtoTypes { ixp_spis = "string", ixs_vpr = "string", zakon_txt = "string", zakonik = "string", paragraf = "string", odstavec = "string", pismeno = "string", kategorie = "number", poznamka = "string", aktivita_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamVPrProSprSpisDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Dto pro seznam věcných příslušností pro správní spis*/
	interface GSeznamVPrProSprSpisDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
        /**Autogenerated.*/
		ixp_spis?: string|null;
        /**Autogenerated.*/
		ixs_vpr?: string|null;
        /**Autogenerated.*/
		zakon_txt?: string|null;
        /**Autogenerated.*/
		zakonik?: string|null;
        /**Autogenerated.*/
		paragraf?: string|null;
        /**Autogenerated.*/
		odstavec?: string|null;
        /**Autogenerated.*/
		pismeno?: string|null;
        /**Autogenerated.*/
		kategorie?: number|null;
        /**Autogenerated.*/
		poznamka?: string|null;
		aktivita?: number|null;
	}
	const enum GSeznamVPrProSprSpisDtoNames { ixp_spis = "ixp_spis", ixs_vpr = "ixs_vpr", zakon_txt = "zakon_txt", zakonik = "zakonik", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", kategorie = "kategorie", poznamka = "poznamka", aktivita = "aktivita", Permissions = "Permissions",}
	const enum GSeznamVPrProSprSpisDtoFragments { ixp_spis = "*", ixs_vpr = "*", zakon_txt = "*", zakonik = "*", paragraf = "*", odstavec = "*", pismeno = "*", kategorie = "*", poznamka = "*", aktivita = "*", Permissions = "*",}
	const enum GSeznamVPrProSprSpisDtoTypes { ixp_spis = "string", ixs_vpr = "string", zakon_txt = "string", zakonik = "string", paragraf = "string", odstavec = "string", pismeno = "string", kategorie = "number", poznamka = "string", aktivita = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSeznamZastupcuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSeznamZastupcuDto*/
	interface GSeznamZastupcuDto {
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		lic_zast?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		text_zast?: string|null;
		/**Autogenerated.*/
		ixs_dva_nazev?: string|null;
		/**Autogenerated.*/
		ixs_esu_txt?: string|null;
		/**Autogenerated.*/
		ixs_prev?: string|null;
		/**Autogenerated.*/
		zmena_esu?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
	}
	const enum GSeznamZastupcuDtoNames { ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", typ_vazby = "typ_vazby", lic_zast = "lic_zast", por_zast = "por_zast", text_zast = "text_zast", ixs_dva_nazev = "ixs_dva_nazev", ixs_esu_txt = "ixs_esu_txt", ixs_prev = "ixs_prev", zmena_esu = "zmena_esu", poznamka = "poznamka",}
	const enum GSeznamZastupcuDtoFragments { ixp_spis = "*", ixs_esu = "*", typ_vazby = "*", lic_zast = "*", por_zast = "*", text_zast = "*", ixs_dva_nazev = "*", ixs_esu_txt = "*", ixs_prev = "*", zmena_esu = "*", poznamka = "*",}
	const enum GSeznamZastupcuDtoTypes { ixp_spis = "string", ixs_esu = "string", typ_vazby = "number", lic_zast = "string", por_zast = "number", text_zast = "string", ixs_dva_nazev = "string", ixs_esu_txt = "string", ixs_prev = "string", zmena_esu = "number", poznamka = "string",}
	const enum GSeznamZastupcuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSpravniRizeniDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsriz*/
	interface GSpravniRizeniDto {
		/**Permissions*/
		Permissions?: Gordic.Spr.Interface.GSpravniRizeniPermissions|null;
		/**DBCOLUMN:sprsriz.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:sprsriz.typ_sr*/
		typ_sr?: number|null;
		/**DBCOLUMN:sprsriz.ixs_dsr*/
		ixs_dsr?: string|null;
		/**DBCOLUMN:sprsriz.ixp_spis_p*/
		ixp_spis_p?: string|null;
		/**DBCOLUMN:sprsriz.dat_zap*/
		dat_zap?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_zahajeni*/
		dat_zahajeni?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_lhuta*/
		dat_lhuta?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_lhuta*/
		lhuta_dni?: number|null;
		/**Počet změněných ESU (rozdílů proti aktuálním záznamům v kartotéce ESU)*/
		zmena_esu_pocet?: number|null;
		/**Poslední úkon pu_s_vypraveno*/
		pu_s_vypraveno?: number|null;
		/**Poslední úkon pu_dat_vypraveni*/
		pu_dat_vypraveni?: JsonDate|null;
		/**Poslední úkon pu_s_doruceno*/
		pu_s_doruceno?: number|null;
		/**Poslední úkon pu_dat_doruceni*/
		pu_dat_doruceni?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_pr_moc*/
		dat_pr_moc?: JsonDate|null;
		/**DBCOLUMN:sprsriz.stav*/
		stav?: number|null;
		/**DBCOLUMN:sprsriz.typ_pod*/
		typ_pod?: number|null;
		/**DBCOLUMN:sprsriz.popis_pod*/
		popis_pod?: string|null;
		/**DBCOLUMN:sprsriz.zdroj_pod*/
		zdroj_pod?: string|null;
		/**DBCOLUMN:sprsriz.vpr*/
		vpr?: string|null;
		/**DBCOLUMN:sprsriz.mpr*/
		mpr?: number|null;
		/**DBCOLUMN:sprsriz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sprsriz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sprsriz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sprsriz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**ixs_dva_odes*/
		ixs_dva_odes?: string|null;
		ixs_ouo?: string|null;
		ixs_ouo_pr?: string|null;
		MoznostiAplikaceSprDto?: Gordic.Spr.Interface.GMoznostiAplikaceSprDto|null;
		/**DBCOLUMN:sprsriz.zp_roz*/
		zp_roz?: number|null;
		/**DBCOLUMN:sprsriz.s_prevod*/
		s_prevod?: number|null;
		/**DBCOLUMN:sprsriz.s_prohl*/
		s_prohl?: number|null;
		/**DBCOLUMN:sprsriz.delka_lh*/
		delka_lh?: number|null;
		/**DBCOLUMN:sprsriz.ixs_psr*/
		ixs_psr?: string|null;
		/**DBCOLUMN:sprsriz.nazev_st*/
		nazev_st?: string|null;
		/**DBCOLUMN:sprsriz.misto_st*/
		misto_st?: string|null;
		/**DBCOLUMN:sprsriz.s_rekonstrukce*/
		s_rekonstrukce?: number|null;
		/**DBCOLUMN:sprsriz.c_rozpocet*/
		c_rozpocet?: JsonDecimal|null;
		/**Stavebník*/
		stavebnik_txt?: string|null;
		/**Identifijkátor externíhoi subjektu - stavebník*/
		ixs_esu_stav?: string|null;
		/**Datum předpokládaného zahájení stavby*/
		dat_pzah_stavby?: JsonDate|null;
		/**Datum předpokládaného ukončení stavby*/
		dat_pdokon_stavby?: JsonDate|null;
		/**Číslo jednací územního rozhodnutí/souhlasu stavby*/
		cj_uzem_rozhod?: string|null;
		/**Číslo jednací stavebního povolení*/
		cj_stav_povol?: string|null;
		/**Číslo jednací zkušebního provozu stavby*/
		cj_zkus_provoz?: string|null;
		/**DBCOLUMN:sprsriz.c_poplatek*/
		c_poplatek?: JsonDecimal|null;
		/**DBCOLUMN:sprsriz.dat_vyzvy*/
		dat_vyzvy?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_zapl*/
		dat_zapl?: JsonDate|null;
		/**DBCOLUMN:sprsriz.druh_zar*/
		druh_zar?: number|null;
		/**DBCOLUMN:sprsriz.nazev_zar*/
		nazev_zar?: string|null;
		/**DBCOLUMN:sprsriz.typ_zar*/
		typ_zar?: string|null;
		/**DBCOLUMN:sprsriz.vyr_cis*/
		vyr_cis?: string|null;
		/**DBCOLUMN:sprsriz.evid_cis*/
		evid_cis?: string|null;
		/**DBCOLUMN:sprsriz.rok_vyr*/
		rok_vyr?: number|null;
		/**DBCOLUMN:sprsriz.rozsah_cin*/
		rozsah_cin?: number|null;
		/**DBCOLUMN:sprsriz.vyrobce_zar*/
		vyrobce_zar?: string|null;
		/**DBCOLUMN:sprsriz.umist_zar*/
		umist_zar?: string|null;
		/**DBCOLUMN:sprsriz.rozsah_opr*/
		rozsah_opr?: string|null;
		/**DBCOLUMN:sprsriz.c_popl_ms*/
		c_popl_ms?: JsonDecimal|null;
		/**DBCOLUMN:sprsriz.pocet_pz*/
		pocet_pz?: number|null;
		/**DBCOLUMN:sprsriz.s_odvolani*/
		s_odvolani?: number|null;
		/**DBCOLUMN:sprsriz.typ_zk*/
		typ_zk?: number|null;
		/**DBCOLUMN:sprsriz.typ_pvd*/
		typ_pvd?: number|null;
		/**DBCOLUMN:sprsriz.rozsah_sl*/
		rozsah_sl?: number|null;
		/**DBCOLUMN:sprsriz.dat_pr*/
		dat_pr?: JsonDate|null;
		/**DBCOLUMN:sprsriz.druh_doz*/
		druh_doz?: number|null;
		/**DBCOLUMN:sprsriz.pocet_os*/
		pocet_os?: number|null;
		/**DBCOLUMN:sprsriz.pocet_sr*/
		pocet_sr?: number|null;
		/**DBCOLUMN:sprsriz.pocet_pok*/
		pocet_pok?: number|null;
		/**DBCOLUMN:sprsriz.pocet_odok*/
		pocet_odok?: number|null;
		/**DBCOLUMN:sprsriz.pocet_over*/
		pocet_over?: number|null;
		/**DBCOLUMN:sprsriz.s_soud*/
		s_soud?: number|null;
		/**DBCOLUMN:sprsriz.dat_rozh*/
		dat_rozh?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_dor_rozh*/
		dat_dor_rozh?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_odvolani*/
		dat_odvolani?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_vykonatel*/
		dat_vykonatel?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_predkl*/
		dat_predkl?: JsonDate|null;
		/**DBCOLUMN:sprsriz.dat_dor_rozh_ii*/
		dat_dor_rozh_ii?: JsonDate|null;
		/**DBCOLUMN:sprsriz.delka_rizeni*/
		delka_rizeni?: number|null;
		/**DBCOLUMN:sprsriz.s_aviz_lh*/
		s_aviz_lh?: number|null;
		/**DBCOLUMN:sprsriz.poznamka*/
		chyba_rozh?: string|null;
		/**DBCOLUMN:sprsriz.poznamka*/
		chyba_npm?: string|null;
		/**Navigacni vlastnost pro DruhRizeni (ixs_dsr)*/
		DruhRizeni?: Gordic.Spr.Interface.GDruhRizeniDto|null;
		/**Navigacni vlastnost pro Dokument (ixp_spis)*/
		Dokument?: Gordic.Spr.Interface.GDokumentDto|null;
		/**Autogenerated.*/
		nazev_dsr?: string|null;
		/**Autogenerated.*/
		obl_sr?: number|null;
		/**Autogenerated.*/
		dat_prij_pod_ssl?: JsonDate|null;
		/**Autogenerated.*/
		dat_vyriz_do_ssl?: JsonDate|null;
		/**Autogenerated.*/
		dat_vyriz_ssl?: JsonDate|null;
		/**Autogenerated.*/
		pr_moc_ssl?: number|null;
		/**Autogenerated.*/
		dat_pr_moc_ssl?: JsonDate|null;
		/**Autogenerated.*/
		dat_uzav_ssl?: JsonDate|null;
		/**Autogenerated.*/
		stav_txt?: string|null;
		/**Autogenerated.*/
		zp_roz_txt?: string|null;
		/**Autogenerated.*/
		typ_pod_txt?: string|null;
		/**Autogenerated.*/
		mpr_txt?: string|null;
		/**Autogenerated.*/
		vec?: string|null;
		/**Autogenerated.*/
		vec_podrobne?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		misto_vzniku?: string|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		ixs_su_akt?: string|null;
		/**Autogenerated.*/
		ixs_fun_akt?: string|null;
		/**Autogenerated.*/
		vlastnik?: string|null;
		/**Autogenerated.*/
		popis_st_zkr?: string|null;
		/**Autogenerated.*/
		nem_st_zkr?: string|null;
		/**Autogenerated.*/
		struktura_st_zkr?: string|null;
		/**Autogenerated.*/
		popis_drahy_zkr?: string|null;
		/**pocet_dnu_txt*/
		pocet_dnu_txt?: string|null;
		/**lhuta_vyriz_dsr*/
		lhuta_vyriz_dsr?: number|null;
		/**s_ed_dat_z_dsr*/
		s_ed_dat_z_dsr?: number|null;
	}
	const enum GSpravniRizeniDtoNames { Permissions = "Permissions", ixp_spis = "ixp_spis", typ_sr = "typ_sr", ixs_dsr = "ixs_dsr", ixp_spis_p = "ixp_spis_p", dat_zap = "dat_zap", dat_pod = "dat_pod", dat_zahajeni = "dat_zahajeni", dat_lhuta = "dat_lhuta", lhuta_dni = "lhuta_dni", zmena_esu_pocet = "zmena_esu_pocet", pu_s_vypraveno = "pu_s_vypraveno", pu_dat_vypraveni = "pu_dat_vypraveni", pu_s_doruceno = "pu_s_doruceno", pu_dat_doruceni = "pu_dat_doruceni", dat_pr_moc = "dat_pr_moc", stav = "stav", typ_pod = "typ_pod", popis_pod = "popis_pod", zdroj_pod = "zdroj_pod", vpr = "vpr", mpr = "mpr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_dva_odes = "ixs_dva_odes", ixs_ouo = "ixs_ouo", ixs_ouo_pr = "ixs_ouo_pr", MoznostiAplikaceSprDto = "MoznostiAplikaceSprDto", zp_roz = "zp_roz", s_prevod = "s_prevod", s_prohl = "s_prohl", delka_lh = "delka_lh", ixs_psr = "ixs_psr", nazev_st = "nazev_st", misto_st = "misto_st", s_rekonstrukce = "s_rekonstrukce", c_rozpocet = "c_rozpocet", stavebnik_txt = "stavebnik_txt", ixs_esu_stav = "ixs_esu_stav", dat_pzah_stavby = "dat_pzah_stavby", dat_pdokon_stavby = "dat_pdokon_stavby", cj_uzem_rozhod = "cj_uzem_rozhod", cj_stav_povol = "cj_stav_povol", cj_zkus_provoz = "cj_zkus_provoz", c_poplatek = "c_poplatek", dat_vyzvy = "dat_vyzvy", dat_zapl = "dat_zapl", druh_zar = "druh_zar", nazev_zar = "nazev_zar", typ_zar = "typ_zar", vyr_cis = "vyr_cis", evid_cis = "evid_cis", rok_vyr = "rok_vyr", rozsah_cin = "rozsah_cin", vyrobce_zar = "vyrobce_zar", umist_zar = "umist_zar", rozsah_opr = "rozsah_opr", c_popl_ms = "c_popl_ms", pocet_pz = "pocet_pz", s_odvolani = "s_odvolani", typ_zk = "typ_zk", typ_pvd = "typ_pvd", rozsah_sl = "rozsah_sl", dat_pr = "dat_pr", druh_doz = "druh_doz", pocet_os = "pocet_os", pocet_sr = "pocet_sr", pocet_pok = "pocet_pok", pocet_odok = "pocet_odok", pocet_over = "pocet_over", s_soud = "s_soud", dat_rozh = "dat_rozh", dat_dor_rozh = "dat_dor_rozh", dat_odvolani = "dat_odvolani", dat_vykonatel = "dat_vykonatel", dat_predkl = "dat_predkl", dat_dor_rozh_ii = "dat_dor_rozh_ii", delka_rizeni = "delka_rizeni", s_aviz_lh = "s_aviz_lh", chyba_rozh = "chyba_rozh", chyba_npm = "chyba_npm", DruhRizeni = "DruhRizeni", Dokument = "Dokument", nazev_dsr = "nazev_dsr", obl_sr = "obl_sr", dat_prij_pod_ssl = "dat_prij_pod_ssl", dat_vyriz_do_ssl = "dat_vyriz_do_ssl", dat_vyriz_ssl = "dat_vyriz_ssl", pr_moc_ssl = "pr_moc_ssl", dat_pr_moc_ssl = "dat_pr_moc_ssl", dat_uzav_ssl = "dat_uzav_ssl", stav_txt = "stav_txt", zp_roz_txt = "zp_roz_txt", typ_pod_txt = "typ_pod_txt", mpr_txt = "mpr_txt", vec = "vec", vec_podrobne = "vec_podrobne", akt_znacka = "akt_znacka", misto_vzniku = "misto_vzniku", stav_pis = "stav_pis", ixs_su_akt = "ixs_su_akt", ixs_fun_akt = "ixs_fun_akt", vlastnik = "vlastnik", popis_st_zkr = "popis_st_zkr", nem_st_zkr = "nem_st_zkr", struktura_st_zkr = "struktura_st_zkr", popis_drahy_zkr = "popis_drahy_zkr", pocet_dnu_txt = "pocet_dnu_txt", lhuta_vyriz_dsr = "lhuta_vyriz_dsr", s_ed_dat_z_dsr = "s_ed_dat_z_dsr",}
	const enum GSpravniRizeniDtoFragments { Permissions = "*", ixp_spis = "*", typ_sr = "*", ixs_dsr = "*", ixp_spis_p = "*", dat_zap = "*", dat_pod = "*", dat_zahajeni = "*", dat_lhuta = "*", lhuta_dni = "*", zmena_esu_pocet = "*", pu_s_vypraveno = "*", pu_dat_vypraveni = "*", pu_s_doruceno = "*", pu_dat_doruceni = "*", dat_pr_moc = "*", stav = "*", typ_pod = "*", popis_pod = "*", zdroj_pod = "*", vpr = "*", mpr = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_dva_odes = "*", ixs_ouo = "*", ixs_ouo_pr = "*", MoznostiAplikaceSprDto = "*", zp_roz = "*", s_prevod = "*", s_prohl = "*", delka_lh = "*", ixs_psr = "*", nazev_st = "*", misto_st = "*", s_rekonstrukce = "*", c_rozpocet = "*", stavebnik_txt = "*", ixs_esu_stav = "*", dat_pzah_stavby = "*", dat_pdokon_stavby = "*", cj_uzem_rozhod = "*", cj_stav_povol = "*", cj_zkus_provoz = "*", c_poplatek = "*", dat_vyzvy = "*", dat_zapl = "*", druh_zar = "*", nazev_zar = "*", typ_zar = "*", vyr_cis = "*", evid_cis = "*", rok_vyr = "*", rozsah_cin = "*", vyrobce_zar = "*", umist_zar = "*", rozsah_opr = "*", c_popl_ms = "*", pocet_pz = "*", s_odvolani = "*", typ_zk = "*", typ_pvd = "*", rozsah_sl = "*", dat_pr = "*", druh_doz = "*", pocet_os = "*", pocet_sr = "*", pocet_pok = "*", pocet_odok = "*", pocet_over = "*", s_soud = "*", dat_rozh = "*", dat_dor_rozh = "*", dat_odvolani = "*", dat_vykonatel = "*", dat_predkl = "*", dat_dor_rozh_ii = "*", delka_rizeni = "*", s_aviz_lh = "*", chyba_rozh = "*", chyba_npm = "*", DruhRizeni = "DruhRizeni", Dokument = "Dokument", nazev_dsr = "*", obl_sr = "*", dat_prij_pod_ssl = "*", dat_vyriz_do_ssl = "*", dat_vyriz_ssl = "*", pr_moc_ssl = "*", dat_pr_moc_ssl = "*", dat_uzav_ssl = "*", stav_txt = "*", zp_roz_txt = "*", typ_pod_txt = "*", mpr_txt = "*", vec = "*", vec_podrobne = "*", akt_znacka = "*", misto_vzniku = "*", stav_pis = "*", ixs_su_akt = "*", ixs_fun_akt = "*", vlastnik = "*", popis_st_zkr = "*", nem_st_zkr = "*", struktura_st_zkr = "*", popis_drahy_zkr = "*", pocet_dnu_txt = "*", lhuta_vyriz_dsr = "*", s_ed_dat_z_dsr = "*",}
	const enum GSpravniRizeniDtoTypes { Permissions = "Gordic.Spr.Interface.GSpravniRizeniPermissions", ixp_spis = "string", typ_sr = "number", ixs_dsr = "string", ixp_spis_p = "string", dat_zap = "JsonDate", dat_pod = "JsonDate", dat_zahajeni = "JsonDate", dat_lhuta = "JsonDate", lhuta_dni = "number", zmena_esu_pocet = "number", pu_s_vypraveno = "number", pu_dat_vypraveni = "JsonDate", pu_s_doruceno = "number", pu_dat_doruceni = "JsonDate", dat_pr_moc = "JsonDate", stav = "number", typ_pod = "number", popis_pod = "string", zdroj_pod = "string", vpr = "string", mpr = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_dva_odes = "string", ixs_ouo = "string", ixs_ouo_pr = "string", MoznostiAplikaceSprDto = "Gordic.Spr.Interface.GMoznostiAplikaceSprDto", zp_roz = "number", s_prevod = "number", s_prohl = "number", delka_lh = "number", ixs_psr = "string", nazev_st = "string", misto_st = "string", s_rekonstrukce = "number", c_rozpocet = "JsonDecimal", stavebnik_txt = "string", ixs_esu_stav = "string", dat_pzah_stavby = "JsonDate", dat_pdokon_stavby = "JsonDate", cj_uzem_rozhod = "string", cj_stav_povol = "string", cj_zkus_provoz = "string", c_poplatek = "JsonDecimal", dat_vyzvy = "JsonDate", dat_zapl = "JsonDate", druh_zar = "number", nazev_zar = "string", typ_zar = "string", vyr_cis = "string", evid_cis = "string", rok_vyr = "number", rozsah_cin = "number", vyrobce_zar = "string", umist_zar = "string", rozsah_opr = "string", c_popl_ms = "JsonDecimal", pocet_pz = "number", s_odvolani = "number", typ_zk = "number", typ_pvd = "number", rozsah_sl = "number", dat_pr = "JsonDate", druh_doz = "number", pocet_os = "number", pocet_sr = "number", pocet_pok = "number", pocet_odok = "number", pocet_over = "number", s_soud = "number", dat_rozh = "JsonDate", dat_dor_rozh = "JsonDate", dat_odvolani = "JsonDate", dat_vykonatel = "JsonDate", dat_predkl = "JsonDate", dat_dor_rozh_ii = "JsonDate", delka_rizeni = "number", s_aviz_lh = "number", chyba_rozh = "string", chyba_npm = "string", DruhRizeni = "Gordic.Spr.Interface.GDruhRizeniDto", Dokument = "Gordic.Spr.Interface.GDokumentDto", nazev_dsr = "string", obl_sr = "number", dat_prij_pod_ssl = "JsonDate", dat_vyriz_do_ssl = "JsonDate", dat_vyriz_ssl = "JsonDate", pr_moc_ssl = "number", dat_pr_moc_ssl = "JsonDate", dat_uzav_ssl = "JsonDate", stav_txt = "string", zp_roz_txt = "string", typ_pod_txt = "string", mpr_txt = "string", vec = "string", vec_podrobne = "string", akt_znacka = "string", misto_vzniku = "string", stav_pis = "number", ixs_su_akt = "string", ixs_fun_akt = "string", vlastnik = "string", popis_st_zkr = "string", nem_st_zkr = "string", struktura_st_zkr = "string", popis_drahy_zkr = "string", pocet_dnu_txt = "string", lhuta_vyriz_dsr = "number", s_ed_dat_z_dsr = "number",}
	const enum GSpravniRizeniDtoTypeLengths { ixp_spis = 12, ixs_dsr = 12, ixp_spis_p = 12, popis_pod = 254, zdroj_pod = 254, vpr = 50, poznamka = 254, zmenu_prov = 12, ixs_psr = 12, nazev_st = 254, misto_st = 254, stavebnik_txt = 254, ixs_esu_stav = 12, cj_uzem_rozhod = 50, cj_stav_povol = 50, cj_zkus_provoz = 50, nazev_zar = 254, typ_zar = 254, vyr_cis = 254, evid_cis = 254, vyrobce_zar = 254, umist_zar = 254, rozsah_opr = 254, chyba_rozh = 254, chyba_npm = 254,}
	/**Typ datumového rozsahu pro seznamy správních řízení*/
	const enum TypDatumovehoRozsahu {
		/**Datum změny profilu spisu SSL*/
		DatumZmenySpisuSSL=0,
		/**Datum podání iniciačního dokumentu - žádosti, podnětu*/
		DatumPodaniIniciacnihoDokumentu=1,
		/**Datum založení spisu SSL*/
		DatumZalozeniSpisuSSL=2,
		/**Datum založení správního řízení*/
		DatumZalozeniRizeni=3,
		/**Datum zahájení správního řízení*/
		DatumZahajeniRizeni=4,
		/**Datum rozhodnutí*/
		DatumRozhodnuti=5,
		/**Datum nabytí právní moci*/
		DatumNPM=6,
		/**Datum lhůty pro rozhodnutí*/
		DatumLhuty=7,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcdplDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcdpl*/
	interface GSprcdplDto {
		/**DBCOLUMN:sprcdpl.druh_pl -*/
		druh_pl?: number|null;
		/**DBCOLUMN:sprcdpl.druh_pl_txt -*/
		druh_pl_txt?: string|null;
		/**DBCOLUMN:sprcdpl.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcdpl.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcdpl.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcdplDtoNames { druh_pl = "druh_pl", druh_pl_txt = "druh_pl_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcdplDtoFragments { druh_pl = "*", druh_pl_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcdplDtoTypes { druh_pl = "number", druh_pl_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcdplDtoTypeLengths { druh_pl_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcdpzDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcdpz*/
	interface GSprcdpzDto {
		/**DBCOLUMN:sprcdpz.duv_dotc -*/
		duv_dotc?: number|null;
		/**DBCOLUMN:sprcdpz.duv_dotc_txt -*/
		duv_dotc_txt?: string|null;
		/**DBCOLUMN:sprcdpz.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcdpz.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcdpz.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcdpzDtoNames { duv_dotc = "duv_dotc", duv_dotc_txt = "duv_dotc_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcdpzDtoFragments { duv_dotc = "*", duv_dotc_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcdpzDtoTypes { duv_dotc = "number", duv_dotc_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcdpzDtoTypeLengths { duv_dotc_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcdsaDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcdsa*/
	interface GSprcdsaDto {
		/**DBCOLUMN:sprcdsa.druh_sa -*/
		druh_sa?: number|null;
		/**DBCOLUMN:sprcdsa.druh_sa_txt -*/
		druh_sa_txt?: string|null;
		/**DBCOLUMN:sprcdsa.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcdsa.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcdsa.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcdsaDtoNames { druh_sa = "druh_sa", druh_sa_txt = "druh_sa_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcdsaDtoFragments { druh_sa = "*", druh_sa_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcdsaDtoTypes { druh_sa = "number", druh_sa_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcdsaDtoTypeLengths { druh_sa_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcdurDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcdur*/
	interface GSprcdurDto {
		/**DBCOLUMN:sprcdur.duv_urc -*/
		duv_urc?: number|null;
		/**DBCOLUMN:sprcdur.duv_urc_txt -*/
		duv_urc_txt?: string|null;
		/**DBCOLUMN:sprcdur.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcdur.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcdur.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcdurDtoNames { duv_urc = "duv_urc", duv_urc_txt = "duv_urc_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcdurDtoFragments { duv_urc = "*", duv_urc_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcdurDtoTypes { duv_urc = "number", duv_urc_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcdurDtoTypeLengths { duv_urc_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcmprDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcmpr*/
	interface GSprcmprDto {
		/**DBCOLUMN:sprcmpr.mpr*/
		mpr?: number|null;
		/**DBCOLUMN:sprcmpr.mpr_txt*/
		mpr_txt?: string|null;
		/**DBCOLUMN:sprcmpr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sprcmpr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:sprcmpr.k_xml*/
		k_xml?: string|null;
	}
	const enum GSprcmprDtoNames { mpr = "mpr", mpr_txt = "mpr_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcmprDtoFragments { mpr = "*", mpr_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcmprDtoTypes { mpr = "number", mpr_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcmprDtoTypeLengths { mpr_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcpodDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcpod*/
	interface GSprcpodDto {
		/**DBCOLUMN:sprcpod.typ_pod*/
		typ_pod?: number|null;
		/**DBCOLUMN:sprcpod.typ_pod_txt*/
		typ_pod_txt?: string|null;
		/**DBCOLUMN:sprcpod.typ_sr*/
		typ_sr?: number|null;
		/**DBCOLUMN:sprcpod.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sprcpod.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:sprcpod.k_xml*/
		k_xml?: string|null;
	}
	const enum GSprcpodDtoNames { typ_pod = "typ_pod", typ_pod_txt = "typ_pod_txt", typ_sr = "typ_sr", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcpodDtoFragments { typ_pod = "*", typ_pod_txt = "*", typ_sr = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcpodDtoTypes { typ_pod = "number", typ_pod_txt = "string", typ_sr = "number", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcpodDtoTypeLengths { typ_pod_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcpvdDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcpvd*/
	interface GSprcpvdDto {
		/**DBCOLUMN:sprcpvd.typ_pvd -*/
		typ_pvd?: number|null;
		/**DBCOLUMN:sprcpvd.typ_pvd_txt -*/
		typ_pvd_txt?: string|null;
		/**DBCOLUMN:sprcpvd.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcpvd.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcpvd.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcpvdDtoNames { typ_pvd = "typ_pvd", typ_pvd_txt = "typ_pvd_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcpvdDtoFragments { typ_pvd = "*", typ_pvd_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcpvdDtoTypes { typ_pvd = "number", typ_pvd_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcpvdDtoTypeLengths { typ_pvd_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcrciDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcrci*/
	interface GSprcrciDto {
		/**DBCOLUMN:sprcrci.rozsah_cin -*/
		rozsah_cin?: number|null;
		/**DBCOLUMN:sprcrci.rozsah_cin_txt -*/
		rozsah_cin_txt?: string|null;
		/**DBCOLUMN:sprcrci.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcrci.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcrci.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcrciDtoNames { rozsah_cin = "rozsah_cin", rozsah_cin_txt = "rozsah_cin_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcrciDtoFragments { rozsah_cin = "*", rozsah_cin_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcrciDtoTypes { rozsah_cin = "number", rozsah_cin_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcrciDtoTypeLengths { rozsah_cin_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcrslDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcrsl*/
	interface GSprcrslDto {
		/**DBCOLUMN:sprcrsl.rozsah_sl -*/
		rozsah_sl?: number|null;
		/**DBCOLUMN:sprcrsl.rozsah_sl_txt -*/
		rozsah_sl_txt?: string|null;
		/**DBCOLUMN:sprcrsl.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcrsl.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcrsl.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcrslDtoNames { rozsah_sl = "rozsah_sl", rozsah_sl_txt = "rozsah_sl_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcrslDtoFragments { rozsah_sl = "*", rozsah_sl_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcrslDtoTypes { rozsah_sl = "number", rozsah_sl_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcrslDtoTypeLengths { rozsah_sl_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcscjDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcscj*/
	interface GSprcscjDto {
		/**DBCOLUMN:sprcscj.s_cj_jazyk -*/
		s_cj_jazyk?: number|null;
		/**DBCOLUMN:sprcscj.s_cj_jazyk_txt -*/
		s_cj_jazyk_txt?: string|null;
		/**DBCOLUMN:sprcscj.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcscj.k_s -*/
		k_s?: string|null;
	}
	const enum GSprcscjDtoNames { s_cj_jazyk = "s_cj_jazyk", s_cj_jazyk_txt = "s_cj_jazyk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSprcscjDtoFragments { s_cj_jazyk = "*", s_cj_jazyk_txt = "*", k_v = "*", k_s = "*",}
	const enum GSprcscjDtoTypes { s_cj_jazyk = "number", s_cj_jazyk_txt = "string", k_v = "number", k_s = "string",}
	const enum GSprcscjDtoTypeLengths { s_cj_jazyk_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcslhDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcslh*/
	interface GSprcslhDto {
		/**DBCOLUMN:sprcslh.stav_lh -*/
		stav_lh?: number|null;
		/**DBCOLUMN:sprcslh.stav_lh_txt -*/
		stav_lh_txt?: string|null;
		/**DBCOLUMN:sprcslh.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcslh.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcslh.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcslhDtoNames { stav_lh = "stav_lh", stav_lh_txt = "stav_lh_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcslhDtoFragments { stav_lh = "*", stav_lh_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcslhDtoTypes { stav_lh = "number", stav_lh_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcslhDtoTypeLengths { stav_lh_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcstaDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcsta*/
	interface GSprcstaDto {
		/**DBCOLUMN:sprcsta.stav*/
		stav?: number|null;
		/**DBCOLUMN:sprcsta.stav_txt*/
		stav_txt?: string|null;
		/**DBCOLUMN:sprcsta.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sprcsta.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:sprcsta.k_xml*/
		k_xml?: string|null;
	}
	const enum GSprcstaDtoNames { stav = "stav", stav_txt = "stav_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcstaDtoFragments { stav = "*", stav_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcstaDtoTypes { stav = "number", stav_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcstaDtoTypeLengths { stav_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:sprcsta*/
	const enum GSprcstaEnum {
		/**neurčeno*/
		neurceno=0,
		/**probíhající*/
		probihajici=10,
		/**přerušeno*/
		preruseno=20,
		/**rozhodnuto*/
		rozhodnuto=30,
		/**založeno (po PM)*/
		zalozeno_po_pm=40,
		/**u nadřízeného SÚ*/
		u_nadrizeneho_su=50,
		/**odvolání*/
		odvolani=60,
	}
	function GSprcstaEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSprcstaEnum, Gordic.Spr.Interface.GSprcstaDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprctpzDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprctpz*/
	interface GSprctpzDto {
		/**DBCOLUMN:sprctpz.typ_pz -*/
		typ_pz?: number|null;
		/**DBCOLUMN:sprctpz.typ_pz_txt -*/
		typ_pz_txt?: string|null;
		/**DBCOLUMN:sprctpz.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprctpz.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprctpz.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprctpzDtoNames { typ_pz = "typ_pz", typ_pz_txt = "typ_pz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprctpzDtoFragments { typ_pz = "*", typ_pz_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprctpzDtoTypes { typ_pz = "number", typ_pz_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprctpzDtoTypeLengths { typ_pz_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprctrmDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprctrm*/
	interface GSprctrmDto {
		/**DBCOLUMN:sprctrm.typ_term -*/
		typ_term?: number|null;
		/**DBCOLUMN:sprctrm.typ_term_txt -*/
		typ_term_txt?: string|null;
		/**DBCOLUMN:sprctrm.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprctrm.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprctrm.k_xml -*/
		k_xml?: string|null;
		/**DBCOLUMN:sprctrm.s_cas -*/
		s_cas?: number|null;
	}
	const enum GSprctrmDtoNames { typ_term = "typ_term", typ_term_txt = "typ_term_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", s_cas = "s_cas",}
	const enum GSprctrmDtoFragments { typ_term = "*", typ_term_txt = "*", k_v = "*", k_s = "*", k_xml = "*", s_cas = "*",}
	const enum GSprctrmDtoTypes { typ_term = "number", typ_term_txt = "string", k_v = "number", k_s = "string", k_xml = "string", s_cas = "number",}
	const enum GSprctrmDtoTypeLengths { typ_term_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprctscDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprctsc*/
	interface GSprctscDto {
		/**DBCOLUMN:sprctsc.typ_sc -*/
		typ_sc?: number|null;
		/**DBCOLUMN:sprctsc.typ_sc_txt -*/
		typ_sc_txt?: string|null;
		/**DBCOLUMN:sprctsc.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprctsc.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprctsc.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprctscDtoNames { typ_sc = "typ_sc", typ_sc_txt = "typ_sc_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprctscDtoFragments { typ_sc = "*", typ_sc_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprctscDtoTypes { typ_sc = "number", typ_sc_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprctscDtoTypeLengths { typ_sc_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprctzkDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprctzk*/
	interface GSprctzkDto {
		/**DBCOLUMN:sprctzk.typ_zk -*/
		typ_zk?: number|null;
		/**DBCOLUMN:sprctzk.typ_zk_txt -*/
		typ_zk_txt?: string|null;
		/**DBCOLUMN:sprctzk.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprctzk.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprctzk.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprctzkDtoNames { typ_zk = "typ_zk", typ_zk_txt = "typ_zk_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprctzkDtoFragments { typ_zk = "*", typ_zk_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprctzkDtoTypes { typ_zk = "number", typ_zk_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprctzkDtoTypeLengths { typ_zk_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcuciDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcuci*/
	interface GSprcuciDto {
		/**DBCOLUMN:sprcuci.ucinnost -*/
		ucinnost?: number|null;
		/**DBCOLUMN:sprcuci.ucinnost_txt -*/
		ucinnost_txt?: string|null;
		/**DBCOLUMN:sprcuci.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcuci.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcuci.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcuciDtoNames { ucinnost = "ucinnost", ucinnost_txt = "ucinnost_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcuciDtoFragments { ucinnost = "*", ucinnost_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcuciDtoTypes { ucinnost = "number", ucinnost_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcuciDtoTypeLengths { ucinnost_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprcucjDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprcucj*/
	interface GSprcucjDto {
		/**DBCOLUMN:sprcucj.typ_ucj -*/
		typ_ucj?: number|null;
		/**DBCOLUMN:sprcucj.typ_ucj_txt -*/
		typ_ucj_txt?: string|null;
		/**DBCOLUMN:sprcucj.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprcucj.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprcucj.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprcucjDtoNames { typ_ucj = "typ_ucj", typ_ucj_txt = "typ_ucj_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprcucjDtoFragments { typ_ucj = "*", typ_ucj_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprcucjDtoTypes { typ_ucj = "number", typ_ucj_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprcucjDtoTypeLengths { typ_ucj_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprczarDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprczar*/
	interface GSprczarDto {
		/**DBCOLUMN:sprczar.druh_zar -*/
		druh_zar?: number|null;
		/**DBCOLUMN:sprczar.druh_zar_txt -*/
		druh_zar_txt?: string|null;
		/**DBCOLUMN:sprczar.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprczar.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprczar.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprczarDtoNames { druh_zar = "druh_zar", druh_zar_txt = "druh_zar_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprczarDtoFragments { druh_zar = "*", druh_zar_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprczarDtoTypes { druh_zar = "number", druh_zar_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprczarDtoTypeLengths { druh_zar_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprczprDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprczpr*/
	interface GSprczprDto {
		/**DBCOLUMN:sprczpr.zp_roz*/
		zp_roz?: number|null;
		/**DBCOLUMN:sprczpr.zp_roz_txt*/
		zp_roz_txt?: string|null;
		/**DBCOLUMN:sprczpr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sprczpr.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:sprczpr.k_xml*/
		k_xml?: string|null;
	}
	const enum GSprczprDtoNames { zp_roz = "zp_roz", zp_roz_txt = "zp_roz_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprczprDtoFragments { zp_roz = "*", zp_roz_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprczprDtoTypes { zp_roz = "number", zp_roz_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprczprDtoTypeLengths { zp_roz_txt = 50, k_s = 15, k_xml = 254,}
	/**ENUM:sprczpr*/
	const enum GSprczprEnum {
		/**neuvedeno*/
		neuvedeno=0,
		/**nerozhodnuto*/
		nerozhodnuto=10,
		/**postoupeno*/
		postoupeno=20,
		/**odloženo*/
		odlozeno=30,
		/**zastaveno*/
		zastaveno=40,
		/**rozhodnuto ve věci*/
		rozhodnuto_ve_veci=50,
		/**spojeno do jiné věci*/
		spojeno_do_jine_veci=60,
		/**nové rozhodnutí ve věci*/
		nove_rozhodnuti_ve_veci=70,
		/**jinak*/
		jinak=80,
		/**zrušeno rozhodnutí (autoremedura)*/
		zruseno_rozhodnuti_autoremedura=90,
		/**změna rozhodnutí (autoremedura)*/
		zmena_rozhodnuti_autoremedura=100,
		/**zrušeno rozhodnutí a zastaveno*/
		zruseno_rozhodnuti_a_zastaveno=110,
		/**zrušeno rozhodnutí a vráceno*/
		zruseno_rozhodnuti_a_vraceno=120,
		/**změna rozhodnutí*/
		zmena_rozhodnuti=130,
		/**rozhodnutí potvrzeno*/
		rozhodnuti_potvrzeno=140,
		/**zamítnuto odvolání*/
		zamitnuto_odvolani=150,
		/**odvolání vráceno*/
		odvolani_vraceno=160,
	}
	function GSprczprEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSprczprEnum, Gordic.Spr.Interface.GSprczprDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprczpuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprczpu*/
	interface GSprczpuDto {
		/**DBCOLUMN:sprczpu.zpu_pl -*/
		zpu_pl?: number|null;
		/**DBCOLUMN:sprczpu.zpu_pl_txt -*/
		zpu_pl_txt?: string|null;
		/**DBCOLUMN:sprczpu.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:sprczpu.k_s -*/
		k_s?: string|null;
		/**DBCOLUMN:sprczpu.k_xml -*/
		k_xml?: string|null;
	}
	const enum GSprczpuDtoNames { zpu_pl = "zpu_pl", zpu_pl_txt = "zpu_pl_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSprczpuDtoFragments { zpu_pl = "*", zpu_pl_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSprczpuDtoTypes { zpu_pl = "number", zpu_pl_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSprczpuDtoTypeLengths { zpu_pl_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprsdukProSprSpisDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSprsdukProSprSpisDto*/
	interface GSprsdukProSprSpisDto {
		/**Autogenerated.*/
		ixs_duk?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		nazev_uziv?: string|null;
		/**Autogenerated.*/
		zakon_txt?: string|null;
		/**Autogenerated.*/
		typ_ukn?: number|null;
		/**Autogenerated.*/
		typ_ukn_txt?: string|null;
		/**Autogenerated.*/
		typ_ukn_popis?: string|null;
		/**Autogenerated.*/
		skupina?: string|null;
		/**Autogenerated.*/
		podskupina?: string|null;
		/**Autogenerated.*/
		topic_pokyn?: string|null;
		/**Autogenerated.*/
		topic_vzor?: string|null;
		/**Autogenerated.*/
		topic_pozn?: string|null;
		/**Autogenerated.*/
		s_lhuta?: number|null;
		/**Autogenerated.*/
		lhuta?: number|null;
		/**Autogenerated.*/
		s_vyriz?: number|null;
		typ_vyberu_druhu_ukonu?: number|null;
	}
	const enum GSprsdukProSprSpisDtoNames { ixs_duk = "ixs_duk", nazev = "nazev", nazev_uziv = "nazev_uziv", zakon_txt = "zakon_txt", typ_ukn = "typ_ukn", typ_ukn_txt = "typ_ukn_txt", typ_ukn_popis = "typ_ukn_popis", skupina = "skupina", podskupina = "podskupina", topic_pokyn = "topic_pokyn", topic_vzor = "topic_vzor", topic_pozn = "topic_pozn", s_lhuta = "s_lhuta", lhuta = "lhuta", s_vyriz = "s_vyriz", typ_vyberu_druhu_ukonu = "typ_vyberu_druhu_ukonu",}
	const enum GSprsdukProSprSpisDtoFragments { ixs_duk = "*", nazev = "*", nazev_uziv = "*", zakon_txt = "*", typ_ukn = "*", typ_ukn_txt = "*", typ_ukn_popis = "*", skupina = "*", podskupina = "*", topic_pokyn = "*", topic_vzor = "*", topic_pozn = "*", s_lhuta = "*", lhuta = "*", s_vyriz = "*", typ_vyberu_druhu_ukonu = "*",}
	const enum GSprsdukProSprSpisDtoTypes { ixs_duk = "string", nazev = "string", nazev_uziv = "string", zakon_txt = "string", typ_ukn = "number", typ_ukn_txt = "string", typ_ukn_popis = "string", skupina = "string", podskupina = "string", topic_pokyn = "string", topic_vzor = "string", topic_pozn = "string", s_lhuta = "number", lhuta = "number", s_vyriz = "number", typ_vyberu_druhu_ukonu = "number",}
	const enum GSprsdukProSprSpisDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprsouoAllDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsouo*/
	interface GSprsouoAllDto {
		/**DBCOLUMN:sprsouo.ixs_ouo - Identifikátor OÚO*/
		ixs_ouo?: string|null;
		/**DBCOLUMN:sprsouo.nazev - Název*/
		nazev?: string|null;
		/**DBCOLUMN:sprsouo.poznamka - Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**DBCOLUMN:sprsouo.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GSprsouoAllDtoNames { ixs_ouo = "ixs_ouo", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita",}
	const enum GSprsouoAllDtoFragments { ixs_ouo = "*", nazev = "*", poznamka = "*", aktivita = "*",}
	const enum GSprsouoAllDtoTypes { ixs_ouo = "string", nazev = "string", poznamka = "string", aktivita = "number",}
	const enum GSprsouoAllDtoTypeLengths { ixs_ouo = 12, nazev = 254, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprsouoDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSprsouoDto*/
	interface GSprsouoDto {
		/**Autogenerated.*/
		ixs_ouo?: string|null;
		ixs_dsr?: string|null;
		/**Autogenerated.*/
		nazev_ouo?: string|null;
		/**Autogenerated.*/
		ixs_ref?: string|null;
		/**Autogenerated.*/
		nazev_ref?: string|null;
		/**Autogenerated.*/
		ixs_fun?: string|null;
		/**Autogenerated.*/
		nazev_fun?: string|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		typ_ouo_txt?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
	}
	const enum GSprsouoDtoNames { ixs_ouo = "ixs_ouo", ixs_dsr = "ixs_dsr", nazev_ouo = "nazev_ouo", ixs_ref = "ixs_ref", nazev_ref = "nazev_ref", ixs_fun = "ixs_fun", nazev_fun = "nazev_fun", nazev_rf = "nazev_rf", typ_ouo_txt = "typ_ouo_txt", poznamka = "poznamka",}
	const enum GSprsouoDtoFragments { ixs_ouo = "*", ixs_dsr = "*", nazev_ouo = "*", ixs_ref = "*", nazev_ref = "*", ixs_fun = "*", nazev_fun = "*", nazev_rf = "*", typ_ouo_txt = "*", poznamka = "*",}
	const enum GSprsouoDtoTypes { ixs_ouo = "string", ixs_dsr = "string", nazev_ouo = "string", ixs_ref = "string", nazev_ref = "string", ixs_fun = "string", nazev_fun = "string", nazev_rf = "string", typ_ouo_txt = "string", poznamka = "string",}
	const enum GSprsouoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprspsrDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GSprspsrDto*/
	interface GSprspsrDto {
		/**Autogenerated.*/
		ixs_psr?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		typ_sr?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		nazev_4p?: string|null;
		/**Autogenerated.*/
		nazev_2p?: string|null;
		/**Autogenerated.*/
		ixs_dsr?: string|null;
	}
	const enum GSprspsrDtoNames { ixs_psr = "ixs_psr", nazev = "nazev", typ_sr = "typ_sr", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_4p = "nazev_4p", nazev_2p = "nazev_2p", ixs_dsr = "ixs_dsr",}
	const enum GSprspsrDtoFragments { ixs_psr = "*", nazev = "*", typ_sr = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_4p = "*", nazev_2p = "*", ixs_dsr = "*",}
	const enum GSprspsrDtoTypes { ixs_psr = "string", nazev = "string", typ_sr = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_4p = "string", nazev_2p = "string", ixs_dsr = "string",}
	const enum GSprspsrDtoTypeLengths { ixs_psr = 12, nazev = 254, poznamka = 254, zmenu_prov = 12, nazev_4p = 254, nazev_2p = 254, ixs_dsr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GSprsvprDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsvpr*/
	interface GSprsvprDto {
		/**DBCOLUMN:sprsvpr.ixs_vpr -*/
		ixs_vpr?: string|null;
		/**DBCOLUMN:sprsvpr.zakon_txt -*/
		zakon_txt?: string|null;
		/**DBCOLUMN:sprsvpr.zakonik -*/
		zakonik?: string|null;
		/**DBCOLUMN:sprsvpr.paragraf -*/
		paragraf?: string|null;
		/**DBCOLUMN:sprsvpr.odstavec -*/
		odstavec?: string|null;
		/**DBCOLUMN:sprsvpr.pismeno -*/
		pismeno?: string|null;
		/**DBCOLUMN:sprsvpr.poznamka - Poznámka*/
		poznamka?: string|null;
		/**DBCOLUMN:sprsvpr.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sprsvpr.dat_zmena - Změněno*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sprsvpr.zmenu_prov - Změnil*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sprsvpr.typ_vpr -*/
		typ_vpr?: number|null;
		/**DBCOLUMN:sprsvpr.kategorie -*/
		kategorie?: number|null;
	}
	const enum GSprsvprDtoNames { ixs_vpr = "ixs_vpr", zakon_txt = "zakon_txt", zakonik = "zakonik", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_vpr = "typ_vpr", kategorie = "kategorie",}
	const enum GSprsvprDtoFragments { ixs_vpr = "*", zakon_txt = "*", zakonik = "*", paragraf = "*", odstavec = "*", pismeno = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_vpr = "*", kategorie = "*",}
	const enum GSprsvprDtoTypes { ixs_vpr = "string", zakon_txt = "string", zakonik = "string", paragraf = "string", odstavec = "string", pismeno = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_vpr = "number", kategorie = "number",}
	const enum GSprsvprDtoTypeLengths { ixs_vpr = 12, zakon_txt = 254, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 2, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GTiskParamsUkonDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**DTO pro tisk úkonů*/
	interface GTiskParamsUkonDto {
        /**Úkon*/
		ixp_ukon?: string|null;
        /**Druh úkonu*/
		ixs_duk?: string|null;
        /**Druh řízení*/
		ixs_dsr?: string|null;
	}
	const enum GTiskParamsUkonDtoNames { ixp_ukon = "ixp_ukon", ixs_duk = "ixs_duk", ixs_dsr = "ixs_dsr",}
	const enum GTiskParamsUkonDtoFragments { ixp_ukon = "*", ixs_duk = "*", ixs_dsr = "*",}
	const enum GTiskParamsUkonDtoTypes { ixp_ukon = "string", ixs_duk = "string", ixs_dsr = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GVypocetLhutyDto.d.ts 

declare namespace Gordic.Spr.Interface {
    /**Výpočet lhůty Dto*/
	interface GVypocetLhutyDto {
        /**Datum zahájení*/
		dat_zahajeni?: JsonDate|null;
        /**Počet dnů*/
		pocet_dnu?: number|null;
        /**Datum lhůty*/
		dat_lhuta?: JsonDate|null;
        /**Datum právní moci*/
		dat_pr_moc_ssl?: JsonDate|null;
        /**Zobrazit tlačítko OK*/
		show_ok_button?: boolean|null;
	}
	const enum GVypocetLhutyDtoNames { dat_zahajeni = "dat_zahajeni", pocet_dnu = "pocet_dnu", dat_lhuta = "dat_lhuta", dat_pr_moc_ssl = "dat_pr_moc_ssl", show_ok_button = "show_ok_button",}
	const enum GVypocetLhutyDtoFragments { dat_zahajeni = "*", pocet_dnu = "*", dat_lhuta = "*", dat_pr_moc_ssl = "*", show_ok_button = "*",}
	const enum GVypocetLhutyDtoTypes { dat_zahajeni = "JsonDate", pocet_dnu = "number", dat_lhuta = "JsonDate", dat_pr_moc_ssl = "JsonDate", show_ok_button = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\GWflsdvaSprDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**GWflsdvaSprDto*/
	interface GWflsdvaSprDto {
		/**Autogenerated.*/
		ixs_dva?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
	}
	const enum GWflsdvaSprDtoNames { ixs_dva = "ixs_dva", nazev = "nazev", typ_vazby = "typ_vazby", aktivita = "aktivita",}
	const enum GWflsdvaSprDtoFragments { ixs_dva = "*", nazev = "*", typ_vazby = "*", aktivita = "*",}
	const enum GWflsdvaSprDtoTypes { ixs_dva = "string", nazev = "string", typ_vazby = "number", aktivita = "number",}
	const enum GWflsdvaSprDtoTypeLengths { ixs_dva = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\BaseDto\GSprdtrmDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprdtrm
	*      Termín ve správním řízení
	*/
	interface GSprdtrmDto {
		/**PID - identifikátor řízení*/
		ixp_spis?: string|null;
		/**Pořadové číslo termínu*/
		por_cislo?: number|null;
		/**Typ termínmu*/
		typ_term?: number|null;
		/**Stav řízení*/
		stav?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Identifikátor úkonu, který založil termín (zahájil stav)*/
		ixp_ukon_zah?: string|null;
		/**Identifikátor úkonu, který ukončil termín (ukončil stav)*/
		ixp_ukon_uza?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Stav lhůty*/
		stav_lh?: number|null;
		/**Datum konce lhůty*/
		dat_konlh?: JsonDate|null;
		/**Způsob rozhodnutí*/
		zp_roz?: number|null;
		/**Příznak převodu na nový systém evidence*/
		s_prevod?: number|null;
		/**Datum původní lhůty*/
		dat_lh_puv?: JsonDate|null;
		/**Délka běhu lhůty*/
		delka_behu?: number|null;
	}
	const enum GSprdtrmDtoNames { ixp_spis = "ixp_spis", por_cislo = "por_cislo", typ_term = "typ_term", stav = "stav", dat_od = "dat_od", dat_do = "dat_do", ixp_ukon_zah = "ixp_ukon_zah", ixp_ukon_uza = "ixp_ukon_uza", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_lh = "stav_lh", dat_konlh = "dat_konlh", zp_roz = "zp_roz", s_prevod = "s_prevod", dat_lh_puv = "dat_lh_puv", delka_behu = "delka_behu",}
	const enum GSprdtrmDtoFragments { ixp_spis = "Base", por_cislo = "Base", typ_term = "Base", stav = "Base", dat_od = "Base", dat_do = "Base", ixp_ukon_zah = "Base", ixp_ukon_uza = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", stav_lh = "Base", dat_konlh = "Base", zp_roz = "Base", s_prevod = "Base", dat_lh_puv = "Base", delka_behu = "Base",}
	const enum GSprdtrmDtoTypes { ixp_spis = "string", por_cislo = "number", typ_term = "number", stav = "number", dat_od = "JsonDate", dat_do = "JsonDate", ixp_ukon_zah = "string", ixp_ukon_uza = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_lh = "number", dat_konlh = "JsonDate", zp_roz = "number", s_prevod = "number", dat_lh_puv = "JsonDate", delka_behu = "number",}
	const enum GSprdtrmDtoTypeLengths { ixp_spis = 12, ixp_ukon_zah = 12, ixp_ukon_uza = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\BaseDto\GSprsdukDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsduk*/
	interface GSprsdukDto {
		/**DBCOLUMN:sprsduk.ixs_duk*/
		ixs_duk?: string|null;
		/**DBCOLUMN:sprsduk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:sprsduk.zakon_txt*/
		zakon_txt?: string|null;
		/**DBCOLUMN:sprsduk.zakonik*/
		zakonik?: string|null;
		/**DBCOLUMN:sprsduk.paragraf*/
		paragraf?: string|null;
		/**DBCOLUMN:sprsduk.odstavec*/
		odstavec?: string|null;
		/**DBCOLUMN:sprsduk.pismeno*/
		pismeno?: string|null;
		/**DBCOLUMN:sprsduk.topic_pokyn*/
		topic_pokyn?: string|null;
		/**DBCOLUMN:sprsduk.topic_vzor*/
		topic_vzor?: string|null;
		/**DBCOLUMN:sprsduk.topic_pozn*/
		topic_pozn?: string|null;
		/**DBCOLUMN:sprsduk.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:sprsduk.s_prvni*/
		s_prvni?: number|null;
		/**DBCOLUMN:sprsduk.s_term*/
		s_term?: number|null;
		/**DBCOLUMN:sprsduk.typ_term*/
		typ_term?: number|null;
		/**DBCOLUMN:sprsduk.stav*/
		stav?: number|null;
		/**DBCOLUMN:sprsduk.s_vznik*/
		s_vznik?: number|null;
		/**DBCOLUMN:sprsduk.s_lhuta*/
		s_lhuta?: number|null;
		/**DBCOLUMN:sprsduk.ixs_str*/
		ixs_str?: string|null;
		/**DBCOLUMN:sprsduk.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sprsduk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sprsduk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sprsduk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sprsduk.zp_roz*/
		zp_roz?: number|null;
		/**DBCOLUMN:sprsduk.s_prevod*/
		s_prevod?: number|null;
		/**DBCOLUMN:sprsduk.s_vyriz*/
		s_vyriz?: number|null;
		/**DBCOLUMN:sprsduk.zp_mansp*/
		zp_mansp?: number|null;
		/**DBCOLUMN:sprsduk.zp_vesu_p*/
		zp_vesu_p?: number|null;
		/**DBCOLUMN:sprsduk.typ_vazby_p*/
		typ_vazby_p?: number|null;
		/**DBCOLUMN:sprsduk.ixs_dva_p*/
		ixs_dva_p?: string|null;
		/**DBCOLUMN:sprsduk.s_prm*/
		s_prm?: number|null;
		/**DBCOLUMN:sprsduk.s_dor*/
		s_dor?: number|null;
		/**DBCOLUMN:sprsduk.s_odv*/
		s_odv?: number|null;
		/**DBCOLUMN:sprsduk.typ_odv*/
		typ_odv?: number|null;
		/**DBCOLUMN:sprsduk.lhuta*/
		lhuta?: number|null;
		/**DBCOLUMN:sprsduk.s_vypocet*/
		s_vypocet?: number|null;
		/**DBCOLUMN:sprsduk.zac_lh*/
		zac_lh?: number|null;
		/**DBCOLUMN:sprsduk.s_cas*/
		s_cas?: number|null;
		/**DBCOLUMN:sprsduk.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:sprsduk.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:sprsduk.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:sprsduk.typ_ukn*/
		typ_ukn?: number|null;
		/**DBCOLUMN:sprsduk.skupina*/
		skupina?: string|null;
		/**DBCOLUMN:sprsduk.podskupina*/
		podskupina?: string|null;
		/**DBCOLUMN:sprsduk.zakl_met*/
		zakl_met?: number|null;
		/**DBCOLUMN:sprsduk.nazev_uziv*/
		nazev_uziv?: string|null;
		/**DBCOLUMN:sprsduk.s_aviz_lh*/
		s_aviz_lh?: number|null;
		/**DBCOLUMN:sprsduk.s_isep*/
		s_isep?: number|null;
	}
	const enum GSprsdukDtoNames { ixs_duk = "ixs_duk", nazev = "nazev", zakon_txt = "zakon_txt", zakonik = "zakonik", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", topic_pokyn = "topic_pokyn", topic_vzor = "topic_vzor", topic_pozn = "topic_pozn", ktg_typ = "ktg_typ", s_prvni = "s_prvni", s_term = "s_term", typ_term = "typ_term", stav = "stav", s_vznik = "s_vznik", s_lhuta = "s_lhuta", ixs_str = "ixs_str", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_roz = "zp_roz", s_prevod = "s_prevod", s_vyriz = "s_vyriz", zp_mansp = "zp_mansp", zp_vesu_p = "zp_vesu_p", typ_vazby_p = "typ_vazby_p", ixs_dva_p = "ixs_dva_p", s_prm = "s_prm", s_dor = "s_dor", s_odv = "s_odv", typ_odv = "typ_odv", lhuta = "lhuta", s_vypocet = "s_vypocet", zac_lh = "zac_lh", s_cas = "s_cas", ixs_typ = "ixs_typ", spis_pl = "spis_pl", spis_znak = "spis_znak", typ_ukn = "typ_ukn", skupina = "skupina", podskupina = "podskupina", zakl_met = "zakl_met", nazev_uziv = "nazev_uziv", s_aviz_lh = "s_aviz_lh", s_isep = "s_isep",}
	const enum GSprsdukDtoFragments { ixs_duk = "*", nazev = "*", zakon_txt = "*", zakonik = "*", paragraf = "*", odstavec = "*", pismeno = "*", topic_pokyn = "*", topic_vzor = "*", topic_pozn = "*", ktg_typ = "*", s_prvni = "*", s_term = "*", typ_term = "*", stav = "*", s_vznik = "*", s_lhuta = "*", ixs_str = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zp_roz = "*", s_prevod = "*", s_vyriz = "*", zp_mansp = "*", zp_vesu_p = "*", typ_vazby_p = "*", ixs_dva_p = "*", s_prm = "*", s_dor = "*", s_odv = "*", typ_odv = "*", lhuta = "*", s_vypocet = "*", zac_lh = "*", s_cas = "*", ixs_typ = "*", spis_pl = "*", spis_znak = "*", typ_ukn = "*", skupina = "*", podskupina = "*", zakl_met = "*", nazev_uziv = "*", s_aviz_lh = "*", s_isep = "*",}
	const enum GSprsdukDtoTypes { ixs_duk = "string", nazev = "string", zakon_txt = "string", zakonik = "string", paragraf = "string", odstavec = "string", pismeno = "string", topic_pokyn = "string", topic_vzor = "string", topic_pozn = "string", ktg_typ = "number", s_prvni = "number", s_term = "number", typ_term = "number", stav = "number", s_vznik = "number", s_lhuta = "number", ixs_str = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_roz = "number", s_prevod = "number", s_vyriz = "number", zp_mansp = "number", zp_vesu_p = "number", typ_vazby_p = "number", ixs_dva_p = "string", s_prm = "number", s_dor = "number", s_odv = "number", typ_odv = "number", lhuta = "number", s_vypocet = "number", zac_lh = "number", s_cas = "number", ixs_typ = "string", spis_pl = "string", spis_znak = "string", typ_ukn = "number", skupina = "string", podskupina = "string", zakl_met = "number", nazev_uziv = "string", s_aviz_lh = "number", s_isep = "number",}
	const enum GSprsdukDtoTypeLengths { ixs_duk = 12, nazev = 254, zakon_txt = 50, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 2, topic_pokyn = 20, topic_vzor = 20, topic_pozn = 20, ixs_str = 12, poznamka = 254, zmenu_prov = 12, ixs_dva_p = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 10, skupina = 50, podskupina = 50, nazev_uziv = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\BaseDto\GSprsuknDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsukn
	*      Úkon ve správním řízení
	*/
	interface GSprsuknDto {
		/**Identifikátor úkonu*/
		ixp_ukon?: string|null;
		/**PID - prvotní identifikátor záznamu*/
		ixp_spis?: string|null;
		/**Identifikátor druhu úkonu*/
		ixs_duk?: string|null;
		/**Datum vzniku úkonu*/
		dat_vzniku?: JsonDate|null;
		/**Lhůta k provedení úkonu*/
		dat_lhuta?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Délka lhůty k úkonu*/
		delka_lh?: number|null;
		/**Místo ústního jednání*/
		misto_uj?: string|null;
		/**Příznak vypravení
		*      Příznak, že jsou zásilky úkonu vypraveny
		*/
		s_vypraveno?: number|null;
		/**Datum vypravení
		*      Poslední datum vypravení zásilek úkonu
		*/
		dat_vypraveni?: JsonDate|null;
		/**Příznak doručení
		*      Příznak, že jsou zásilky úkonu doručeny
		*/
		s_doruceno?: number|null;
		/**Datum doručení
		*      Poslední datum doručení zásilek úkonu
		*/
		dat_doruceni?: JsonDate|null;
		/**Příznak odvolání
		*      Příznak, že se odvolal některý z účastníků úkonu
		*/
		s_odvolani?: number|null;
		/**Datum odvolání
		*      Datum odvolání
		*/
		dat_odvolani?: JsonDate|null;
		/**Datum vykonatelnosti
		*      Datum vykonatelnosti rozhodnutí
		*/
		dat_vykonatel?: JsonDate|null;
		/**Doba trvání
		*      Doba trvání úkonu - určeno pro sledování pracovního vytížení
		*/
		doba_trvani?: number|null;
		/**Příznak avizace lhůty
		*      Příznak, zda se má avizovat lhůta
		*/
		s_aviz_lh?: number|null;
		/**Srav úkonu*/
		stav_ukn?: number|null;
		/**Příznak, zda byla provedena změna stavu řízení podle druhu úkonu*/
		s_zm_st_riz?: number|null;
		/**Přáznak, zda je úkon vykonatelný*/
		s_vykonatel?: number|null;
		/**Příznak, zda je úkon pravomocný*/
		s_pr_moc?: number|null;
		/**Datum nabytí právní moci*/
		dat_pr_moc?: JsonDate|null;
		/**Příznak, zda je vyznačeno nabytí právní moci*/
		s_vyz_npm?: number|null;
		/**Datum vyznačení nabytí právní moci*/
		dat_vyz_npm?: JsonDate|null;
		/**Identifikátor dokumentu doložky nabytí právní moci*/
		ixp_dol_npm?: string|null;
	}
	const enum GSprsuknDtoNames { ixp_ukon = "ixp_ukon", ixp_spis = "ixp_spis", ixs_duk = "ixs_duk", dat_vzniku = "dat_vzniku", dat_lhuta = "dat_lhuta", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_od = "dat_od", delka_lh = "delka_lh", misto_uj = "misto_uj", s_vypraveno = "s_vypraveno", dat_vypraveni = "dat_vypraveni", s_doruceno = "s_doruceno", dat_doruceni = "dat_doruceni", s_odvolani = "s_odvolani", dat_odvolani = "dat_odvolani", dat_vykonatel = "dat_vykonatel", doba_trvani = "doba_trvani", s_aviz_lh = "s_aviz_lh", stav_ukn = "stav_ukn", s_zm_st_riz = "s_zm_st_riz", s_vykonatel = "s_vykonatel", s_pr_moc = "s_pr_moc", dat_pr_moc = "dat_pr_moc", s_vyz_npm = "s_vyz_npm", dat_vyz_npm = "dat_vyz_npm", ixp_dol_npm = "ixp_dol_npm",}
	const enum GSprsuknDtoFragments { ixp_ukon = "Base", ixp_spis = "Base", ixs_duk = "Base", dat_vzniku = "Base", dat_lhuta = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_od = "Base", delka_lh = "Base", misto_uj = "Base", s_vypraveno = "Base", dat_vypraveni = "Base", s_doruceno = "Base", dat_doruceni = "Base", s_odvolani = "Base", dat_odvolani = "Base", dat_vykonatel = "Base", doba_trvani = "Base", s_aviz_lh = "Base", stav_ukn = "Base", s_zm_st_riz = "Base", s_vykonatel = "Base", s_pr_moc = "Base", dat_pr_moc = "Base", s_vyz_npm = "Base", dat_vyz_npm = "Base", ixp_dol_npm = "Base",}
	const enum GSprsuknDtoTypes { ixp_ukon = "string", ixp_spis = "string", ixs_duk = "string", dat_vzniku = "JsonDate", dat_lhuta = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_od = "JsonDate", delka_lh = "number", misto_uj = "string", s_vypraveno = "number", dat_vypraveni = "JsonDate", s_doruceno = "number", dat_doruceni = "JsonDate", s_odvolani = "number", dat_odvolani = "JsonDate", dat_vykonatel = "JsonDate", doba_trvani = "number", s_aviz_lh = "number", stav_ukn = "number", s_zm_st_riz = "number", s_vykonatel = "number", s_pr_moc = "number", dat_pr_moc = "JsonDate", s_vyz_npm = "number", dat_vyz_npm = "JsonDate", ixp_dol_npm = "string",}
	const enum GSprsuknDtoTypeLengths { ixp_ukon = 12, ixp_spis = 12, ixs_duk = 12, poznamka = 254, zmenu_prov = 12, misto_uj = 254, ixp_dol_npm = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\BaseDto\GSprvucuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprvucu
	*      Účastníci úkonu
	*/
	interface GSprvucuDto {
		/**Identifikátor úkonu*/
		ixp_ukon?: string|null;
		/**Identifikátor spisu*/
		ixp_spis?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Typ vazby dotčeného subjektu na spis*/
		typ_vazby?: number|null;
		/**Licence zástupné osoby*/
		lic_zast?: string|null;
		/**ID zástupné osoby*/
		por_zast?: number|null;
		/**Důvod vazby dotčeného subjektu na spis*/
		ixs_dva?: string|null;
		/**Příznak, zda je dotčený subjekt primárním subjektem úkonu*/
		s_prim?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Příznak, zda se má odesílat subjektu zásilka*/
		s_odes?: number|null;
		/**Příznak, zda má subjekt v daném úkonu právo odvolání*/
		s_m_odv?: number|null;
		/**Poslední den lhůty pro odvolání*/
		dat_lh_odv?: JsonDate|null;
		/**Příznak, zda se subjekt odvolal*/
		s_odv?: number|null;
		/**Příznak, zda bylo odvolání učiněno po lhůtě k odvolání*/
		s_po_lh?: number|null;
		/**Příznak, zda bylo odvolání učiněno jen proti části rozhodnutí*/
		s_r_odv?: number|null;
		/**Výrok, proti kterému se dotčený subjekt odvolal*/
		vyr_odv?: string|null;
		/**Příznak, zda se subjekt vzdal odvolání*/
		s_vzd_odv?: number|null;
		/**Datum, kdy se subjekt odvolal*/
		dat_odvolani?: JsonDate|null;
		/**Identifikátor dokumentu odvolání*/
		ixp_odvolani?: string|null;
		/**Příznak, zda byla vypravena zásilka dokumentu úkonu*/
		s_vypraveno?: number|null;
		/**Datum vypravení zásilky dotčenému subjektu*/
		dat_vypraveni?: JsonDate|null;
		/**Příznak, zda byla doručena zásilka dokumentu úkonu*/
		s_doruceno?: number|null;
		/**Datum doručení zásilky dotčenému subjektu*/
		dat_doruceni?: JsonDate|null;
		/**Příznak, zda byl úkon zapsán do ISEP*/
		s_isep?: number|null;
		/**Datum zapsání úkonu do ISEP*/
		dat_isep?: JsonDate|null;
		/**Zpráva zapsaná do ISEP*/
		zprava_isep?: string|null;
		s_vyz_npm_pv?: number|null;
		s_z_odvol?: number|null;
		dat_z_odvol?: JsonDate|null;
	}
	const enum GSprvucuDtoNames { ixp_ukon = "ixp_ukon", ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", typ_vazby = "typ_vazby", lic_zast = "lic_zast", por_zast = "por_zast", ixs_dva = "ixs_dva", s_prim = "s_prim", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_odes = "s_odes", s_m_odv = "s_m_odv", dat_lh_odv = "dat_lh_odv", s_odv = "s_odv", s_po_lh = "s_po_lh", s_r_odv = "s_r_odv", vyr_odv = "vyr_odv", s_vzd_odv = "s_vzd_odv", dat_odvolani = "dat_odvolani", ixp_odvolani = "ixp_odvolani", s_vypraveno = "s_vypraveno", dat_vypraveni = "dat_vypraveni", s_doruceno = "s_doruceno", dat_doruceni = "dat_doruceni", s_isep = "s_isep", dat_isep = "dat_isep", zprava_isep = "zprava_isep", s_vyz_npm_pv = "s_vyz_npm_pv", s_z_odvol = "s_z_odvol", dat_z_odvol = "dat_z_odvol",}
	const enum GSprvucuDtoFragments { ixp_ukon = "*", ixp_spis = "*", ixs_esu = "*", typ_vazby = "*", lic_zast = "*", por_zast = "*", ixs_dva = "*", s_prim = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", s_odes = "*", s_m_odv = "*", dat_lh_odv = "*", s_odv = "*", s_po_lh = "*", s_r_odv = "*", vyr_odv = "*", s_vzd_odv = "*", dat_odvolani = "*", ixp_odvolani = "*", s_vypraveno = "*", dat_vypraveni = "*", s_doruceno = "*", dat_doruceni = "*", s_isep = "*", dat_isep = "*", zprava_isep = "*", s_vyz_npm_pv = "*", s_z_odvol = "*", dat_z_odvol = "*",}
	const enum GSprvucuDtoTypes { ixp_ukon = "string", ixp_spis = "string", ixs_esu = "string", typ_vazby = "number", lic_zast = "string", por_zast = "number", ixs_dva = "string", s_prim = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_odes = "number", s_m_odv = "number", dat_lh_odv = "JsonDate", s_odv = "number", s_po_lh = "number", s_r_odv = "number", vyr_odv = "string", s_vzd_odv = "number", dat_odvolani = "JsonDate", ixp_odvolani = "string", s_vypraveno = "number", dat_vypraveni = "JsonDate", s_doruceno = "number", dat_doruceni = "JsonDate", s_isep = "number", dat_isep = "JsonDate", zprava_isep = "string", s_vyz_npm_pv = "number", s_z_odvol = "number", dat_z_odvol = "JsonDate",}
	const enum GSprvucuDtoTypeLengths { ixp_ukon = 12, ixp_spis = 12, ixs_esu = 12, lic_zast = 4, ixs_dva = 12, poznamka = 254, zmenu_prov = 12, vyr_odv = 254, ixp_odvolani = 12, zprava_isep = 36,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\ExtendedDto\GSprDruhUkonuDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsukn
	*      Druh úkonu správního řízení
	*/
	interface GSprDruhUkonuDto extends Gordic.Spr.Interface.GSprsdukDto {
		/**Permissions*/
		Permissions?: Gordic.Spr.Interface.GSprBaseDetailPermissions|null;
	}
	const enum GSprDruhUkonuDtoNames { Permissions = "Permissions", ixs_duk = "ixs_duk", nazev = "nazev", zakon_txt = "zakon_txt", zakonik = "zakonik", paragraf = "paragraf", odstavec = "odstavec", pismeno = "pismeno", topic_pokyn = "topic_pokyn", topic_vzor = "topic_vzor", topic_pozn = "topic_pozn", ktg_typ = "ktg_typ", s_prvni = "s_prvni", s_term = "s_term", typ_term = "typ_term", stav = "stav", s_vznik = "s_vznik", s_lhuta = "s_lhuta", ixs_str = "ixs_str", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_roz = "zp_roz", s_prevod = "s_prevod", s_vyriz = "s_vyriz", zp_mansp = "zp_mansp", zp_vesu_p = "zp_vesu_p", typ_vazby_p = "typ_vazby_p", ixs_dva_p = "ixs_dva_p", s_prm = "s_prm", s_dor = "s_dor", s_odv = "s_odv", typ_odv = "typ_odv", lhuta = "lhuta", s_vypocet = "s_vypocet", zac_lh = "zac_lh", s_cas = "s_cas", ixs_typ = "ixs_typ", spis_pl = "spis_pl", spis_znak = "spis_znak", typ_ukn = "typ_ukn", skupina = "skupina", podskupina = "podskupina", zakl_met = "zakl_met", nazev_uziv = "nazev_uziv", s_aviz_lh = "s_aviz_lh", s_isep = "s_isep",}
	const enum GSprDruhUkonuDtoFragments { Permissions = "*", ixs_duk = "*", nazev = "*", zakon_txt = "*", zakonik = "*", paragraf = "*", odstavec = "*", pismeno = "*", topic_pokyn = "*", topic_vzor = "*", topic_pozn = "*", ktg_typ = "*", s_prvni = "*", s_term = "*", typ_term = "*", stav = "*", s_vznik = "*", s_lhuta = "*", ixs_str = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zp_roz = "*", s_prevod = "*", s_vyriz = "*", zp_mansp = "*", zp_vesu_p = "*", typ_vazby_p = "*", ixs_dva_p = "*", s_prm = "*", s_dor = "*", s_odv = "*", typ_odv = "*", lhuta = "*", s_vypocet = "*", zac_lh = "*", s_cas = "*", ixs_typ = "*", spis_pl = "*", spis_znak = "*", typ_ukn = "*", skupina = "*", podskupina = "*", zakl_met = "*", nazev_uziv = "*", s_aviz_lh = "*", s_isep = "*",}
	const enum GSprDruhUkonuDtoTypes { Permissions = "Gordic.Spr.Interface.GSprBaseDetailPermissions", ixs_duk = "string", nazev = "string", zakon_txt = "string", zakonik = "string", paragraf = "string", odstavec = "string", pismeno = "string", topic_pokyn = "string", topic_vzor = "string", topic_pozn = "string", ktg_typ = "number", s_prvni = "number", s_term = "number", typ_term = "number", stav = "number", s_vznik = "number", s_lhuta = "number", ixs_str = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_roz = "number", s_prevod = "number", s_vyriz = "number", zp_mansp = "number", zp_vesu_p = "number", typ_vazby_p = "number", ixs_dva_p = "string", s_prm = "number", s_dor = "number", s_odv = "number", typ_odv = "number", lhuta = "number", s_vypocet = "number", zac_lh = "number", s_cas = "number", ixs_typ = "string", spis_pl = "string", spis_znak = "string", typ_ukn = "number", skupina = "string", podskupina = "string", zakl_met = "number", nazev_uziv = "string", s_aviz_lh = "number", s_isep = "number",}
	const enum GSprDruhUkonuDtoTypeLengths { ixs_duk = 12, nazev = 254, zakon_txt = 50, zakonik = 10, paragraf = 4, odstavec = 2, pismeno = 2, topic_pokyn = 20, topic_vzor = 20, topic_pozn = 20, ixs_str = 12, poznamka = 254, zmenu_prov = 12, ixs_dva_p = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 10, skupina = 50, podskupina = 50, nazev_uziv = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\ExtendedDto\GSprTerminSpravnihoRizeniDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsukn
	*      Termín správního řízení
	*/
	interface GSprTerminSpravnihoRizeniDto extends Gordic.Spr.Interface.GSprdtrmDto {
		/**Permissions*/
		Permissions?: Gordic.Spr.Interface.GSprBaseDetailPermissions|null;
	}
	const enum GSprTerminSpravnihoRizeniDtoNames { Permissions = "Permissions", ixp_spis = "ixp_spis", por_cislo = "por_cislo", typ_term = "typ_term", stav = "stav", dat_od = "dat_od", dat_do = "dat_do", ixp_ukon_zah = "ixp_ukon_zah", ixp_ukon_uza = "ixp_ukon_uza", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_lh = "stav_lh", dat_konlh = "dat_konlh", zp_roz = "zp_roz", s_prevod = "s_prevod", dat_lh_puv = "dat_lh_puv", delka_behu = "delka_behu",}
	const enum GSprTerminSpravnihoRizeniDtoFragments { Permissions = "*", ixp_spis = "*", por_cislo = "*", typ_term = "*", stav = "*", dat_od = "*", dat_do = "*", ixp_ukon_zah = "*", ixp_ukon_uza = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav_lh = "*", dat_konlh = "*", zp_roz = "*", s_prevod = "*", dat_lh_puv = "*", delka_behu = "*",}
	const enum GSprTerminSpravnihoRizeniDtoTypes { Permissions = "Gordic.Spr.Interface.GSprBaseDetailPermissions", ixp_spis = "string", por_cislo = "number", typ_term = "number", stav = "number", dat_od = "JsonDate", dat_do = "JsonDate", ixp_ukon_zah = "string", ixp_ukon_uza = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_lh = "number", dat_konlh = "JsonDate", zp_roz = "number", s_prevod = "number", dat_lh_puv = "JsonDate", delka_behu = "number",}
	const enum GSprTerminSpravnihoRizeniDtoTypeLengths { ixp_spis = 12, ixp_ukon_zah = 12, ixp_ukon_uza = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\ExtendedDto\GSprUkonDto.d.ts 

declare namespace Gordic.Spr.Interface {
	/**DBTABLE:sprsukn
	*      Úkon ve správním řízení
	*/
	interface GSprUkonDto extends Gordic.Spr.Interface.GSprsuknDto {
		/**Permissions*/
		Permissions?: Gordic.Spr.Interface.GSprUkonPermissions|null;
		/**Navigacni vlastnost pro DruhUkonu (ixs_duk)*/
		DruhUkonu?: Gordic.Spr.Interface.GSprDruhUkonuDto|null;
		/**Autogenerated.*/
		wfl_ixp_init_init?: string|null;
		/**Autogenerated.*/
		wfl_ixp_init_vyriz?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		cj_dok?: string|null;
		/**Autogenerated.*/
		duk_s_vyriz?: number|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		priz_cj?: number|null;
		/**Autogenerated.*/
		dat_zmena_wfl?: JsonDate|null;
		/**Identifikátor iniciačního dokumentu spisu*/
		ixp_init?: string|null;
		/**Číslo spisu*/
		cj_spis?: string|null;
		/**ElektronickyObrazTitle*/
		ElektronickyObrazTitle?: string|null;
		/**EleName*/
		EleName?: string|null;
		/**VecSSL*/
		VecSSL?: string|null;
		/**DatPrMoc*/
		DatPrMoc?: JsonDate|null;
		/**novy_zaznam*/
		novy_zaznam?: boolean|null;
	}
	const enum GSprUkonDtoNames { Permissions = "Permissions", DruhUkonu = "DruhUkonu", wfl_ixp_init_init = "wfl_ixp_init_init", wfl_ixp_init_vyriz = "wfl_ixp_init_vyriz", por_cislo = "por_cislo", cj_dok = "cj_dok", duk_s_vyriz = "duk_s_vyriz", dat_pod = "dat_pod", priz_spis = "priz_spis", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_zmena_wfl = "dat_zmena_wfl", ixp_init = "ixp_init", cj_spis = "cj_spis", ElektronickyObrazTitle = "ElektronickyObrazTitle", EleName = "EleName", VecSSL = "VecSSL", DatPrMoc = "DatPrMoc", novy_zaznam = "novy_zaznam", ixp_ukon = "ixp_ukon", ixp_spis = "ixp_spis", ixs_duk = "ixs_duk", dat_vzniku = "dat_vzniku", dat_lhuta = "dat_lhuta", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_od = "dat_od", delka_lh = "delka_lh", misto_uj = "misto_uj", s_vypraveno = "s_vypraveno", dat_vypraveni = "dat_vypraveni", s_doruceno = "s_doruceno", dat_doruceni = "dat_doruceni", s_odvolani = "s_odvolani", dat_odvolani = "dat_odvolani", dat_vykonatel = "dat_vykonatel", doba_trvani = "doba_trvani", s_aviz_lh = "s_aviz_lh", stav_ukn = "stav_ukn", s_zm_st_riz = "s_zm_st_riz", s_vykonatel = "s_vykonatel", s_pr_moc = "s_pr_moc", dat_pr_moc = "dat_pr_moc", s_vyz_npm = "s_vyz_npm", dat_vyz_npm = "dat_vyz_npm", ixp_dol_npm = "ixp_dol_npm",}
	const enum GSprUkonDtoFragments { Permissions = "*", DruhUkonu = "DRUHUKONU", wfl_ixp_init_init = "PROFIL_SSL", wfl_ixp_init_vyriz = "PROFIL_SSL", por_cislo = "PROFIL_SSL", cj_dok = "PROFIL_SSL", duk_s_vyriz = "PROFIL_DUK", dat_pod = "PROFIL_WFL", priz_spis = "PROFIL_WFL", stav_pis = "PROFIL_WFL", priz_cj = "PROFIL_WFL", dat_zmena_wfl = "PROFIL_WFL", ixp_init = "PROFIL_SSL", cj_spis = "PROFIL_SSL", ElektronickyObrazTitle = "PROFIL_SSL", EleName = "PROFIL_SSL", VecSSL = "PROFIL_SSL", DatPrMoc = "PROFIL_SSL", novy_zaznam = "*", ixp_ukon = "Base", ixp_spis = "Base", ixs_duk = "Base", dat_vzniku = "Base", dat_lhuta = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_od = "Base", delka_lh = "Base", misto_uj = "Base", s_vypraveno = "Base", dat_vypraveni = "Base", s_doruceno = "Base", dat_doruceni = "Base", s_odvolani = "Base", dat_odvolani = "Base", dat_vykonatel = "Base", doba_trvani = "Base", s_aviz_lh = "Base", stav_ukn = "Base", s_zm_st_riz = "Base", s_vykonatel = "Base", s_pr_moc = "Base", dat_pr_moc = "Base", s_vyz_npm = "Base", dat_vyz_npm = "Base", ixp_dol_npm = "Base",}
	const enum GSprUkonDtoTypes { Permissions = "Gordic.Spr.Interface.GSprUkonPermissions", DruhUkonu = "Gordic.Spr.Interface.GSprDruhUkonuDto", wfl_ixp_init_init = "string", wfl_ixp_init_vyriz = "string", por_cislo = "number", cj_dok = "string", duk_s_vyriz = "number", dat_pod = "JsonDate", priz_spis = "number", stav_pis = "number", priz_cj = "number", dat_zmena_wfl = "JsonDate", ixp_init = "string", cj_spis = "string", ElektronickyObrazTitle = "string", EleName = "string", VecSSL = "string", DatPrMoc = "JsonDate", novy_zaznam = "boolean", ixp_ukon = "string", ixp_spis = "string", ixs_duk = "string", dat_vzniku = "JsonDate", dat_lhuta = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_od = "JsonDate", delka_lh = "number", misto_uj = "string", s_vypraveno = "number", dat_vypraveni = "JsonDate", s_doruceno = "number", dat_doruceni = "JsonDate", s_odvolani = "number", dat_odvolani = "JsonDate", dat_vykonatel = "JsonDate", doba_trvani = "number", s_aviz_lh = "number", stav_ukn = "number", s_zm_st_riz = "number", s_vykonatel = "number", s_pr_moc = "number", dat_pr_moc = "JsonDate", s_vyz_npm = "number", dat_vyz_npm = "JsonDate", ixp_dol_npm = "string",}
	const enum GSprUkonDtoTypeLengths { ixp_ukon = 12, ixp_spis = 12, ixs_duk = 12, poznamka = 254, zmenu_prov = 12, misto_uj = 254, ixp_dol_npm = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Dto\Permissions\GSprBaseDetailPermissions.d.ts 

declare namespace Gordic.Spr.Interface {
	/**Základní Permissions pro Spr*/
	interface GSprBaseDetailPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
	}
	const enum GSprBaseDetailPermissionsNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GSprBaseDetailPermissionsFragments { CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GSprBaseDetailPermissionsTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSprBaseDetailPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Permissions\GSpravniRizeniPermissions.d.ts 

declare namespace Gordic.Spr.Interface {
	/**Oprávnění pro GSpravniRizeni*/
	interface GSpravniRizeniPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
		/**Příznak, že lze přerušit*/
		LzePrerusit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze pokračovat*/
		LzePokracovat: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zahájit správní řízení*/
		LzeZahajit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze rozhodnout správní řízení*/
		LzeRozhodnout: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze vyřídit záznam*/
		LzeVyridit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zrušit*/
		LzeZrusit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze předat řízení nadřízenému SÚ*/
		LzePredatNadrizenemuSU: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze vrátit řízení podřízenému SÚ*/
		LzeVratitPodrizenemuSU: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zrušit rozhodnutí*/
		LzeZrusitRozhodnuti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze provést odvolání*/
		LzeOdvolani: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze potvrdit rozhodnutí*/
		LzePotvrditRozhodnuti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze nabýt pravní moc*/
		LzeNabytPravniMocSpr: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSpravniRizeniPermissionsNames { LzePrerusit = "LzePrerusit", LzePokracovat = "LzePokracovat", LzeZahajit = "LzeZahajit", LzeRozhodnout = "LzeRozhodnout", LzeVyridit = "LzeVyridit", LzeZrusit = "LzeZrusit", LzePredatNadrizenemuSU = "LzePredatNadrizenemuSU", LzeVratitPodrizenemuSU = "LzeVratitPodrizenemuSU", LzeZrusitRozhodnuti = "LzeZrusitRozhodnuti", LzeOdvolani = "LzeOdvolani", LzePotvrditRozhodnuti = "LzePotvrditRozhodnuti", LzeNabytPravniMocSpr = "LzeNabytPravniMocSpr", LzeUzavrit = "LzeUzavrit", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GSpravniRizeniPermissionsFragments { LzePrerusit = "*", LzePokracovat = "*", LzeZahajit = "*", LzeRozhodnout = "*", LzeVyridit = "*", LzeZrusit = "*", LzePredatNadrizenemuSU = "*", LzeVratitPodrizenemuSU = "*", LzeZrusitRozhodnuti = "*", LzeOdvolani = "*", LzePotvrditRozhodnuti = "*", LzeNabytPravniMocSpr = "*", LzeUzavrit = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GSpravniRizeniPermissionsTypes { LzePrerusit = "Gordic.General.ApplicationInterface.GPermission", LzePokracovat = "Gordic.General.ApplicationInterface.GPermission", LzeZahajit = "Gordic.General.ApplicationInterface.GPermission", LzeRozhodnout = "Gordic.General.ApplicationInterface.GPermission", LzeVyridit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusit = "Gordic.General.ApplicationInterface.GPermission", LzePredatNadrizenemuSU = "Gordic.General.ApplicationInterface.GPermission", LzeVratitPodrizenemuSU = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitRozhodnuti = "Gordic.General.ApplicationInterface.GPermission", LzeOdvolani = "Gordic.General.ApplicationInterface.GPermission", LzePotvrditRozhodnuti = "Gordic.General.ApplicationInterface.GPermission", LzeNabytPravniMocSpr = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSpravniRizeniPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spr.Interface\Permissions\GSprUkonPermissions.d.ts 

declare namespace Gordic.Spr.Interface {
	/**Oprávnění pro GDetailUkonu*/
	interface GSprUkonPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
		/**Zda lze předat ke schválení*/
		CanKeSchvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze schválit*/
		CanSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze stornovat*/
		CanStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze nastavit lhůtu*/
		CanNastavitLhutu: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze nabyt pravni moc*/
		CanNabytPravniMoc: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze otevřít detail dokumentu*/
		CanDetailDokumentu: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze otevřít pokyny*/
		CanPokyny: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze otevřít vzor*/
		CanVzor: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze otevřít poznámku*/
		CanPoznamka: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze tisknout šablonu*/
		CanTiskSablony: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze odeslat*/
		CanOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vložit do spisu*/
		CanVlozitDoSpisu: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze přidat žádost o podpis*/
		LzePridatZadostOPodpis: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze zařadit do schvalovacího procesu*/
		LzeZaraditDoSchvalovacihoProcesu: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSprUkonPermissionsNames { CanKeSchvaleni = "CanKeSchvaleni", CanSchvalit = "CanSchvalit", CanStornovat = "CanStornovat", CanNastavitLhutu = "CanNastavitLhutu", CanNabytPravniMoc = "CanNabytPravniMoc", CanDetailDokumentu = "CanDetailDokumentu", CanPokyny = "CanPokyny", CanVzor = "CanVzor", CanPoznamka = "CanPoznamka", CanTiskSablony = "CanTiskSablony", CanOdeslat = "CanOdeslat", CanVlozitDoSpisu = "CanVlozitDoSpisu", LzePridatZadostOPodpis = "LzePridatZadostOPodpis", LzeZaraditDoSchvalovacihoProcesu = "LzeZaraditDoSchvalovacihoProcesu", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GSprUkonPermissionsFragments { CanKeSchvaleni = "*", CanSchvalit = "*", CanStornovat = "*", CanNastavitLhutu = "*", CanNabytPravniMoc = "*", CanDetailDokumentu = "*", CanPokyny = "*", CanVzor = "*", CanPoznamka = "*", CanTiskSablony = "*", CanOdeslat = "*", CanVlozitDoSpisu = "*", LzePridatZadostOPodpis = "*", LzeZaraditDoSchvalovacihoProcesu = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GSprUkonPermissionsTypes { CanKeSchvaleni = "Gordic.General.ApplicationInterface.GPermission", CanSchvalit = "Gordic.General.ApplicationInterface.GPermission", CanStornovat = "Gordic.General.ApplicationInterface.GPermission", CanNastavitLhutu = "Gordic.General.ApplicationInterface.GPermission", CanNabytPravniMoc = "Gordic.General.ApplicationInterface.GPermission", CanDetailDokumentu = "Gordic.General.ApplicationInterface.GPermission", CanPokyny = "Gordic.General.ApplicationInterface.GPermission", CanVzor = "Gordic.General.ApplicationInterface.GPermission", CanPoznamka = "Gordic.General.ApplicationInterface.GPermission", CanTiskSablony = "Gordic.General.ApplicationInterface.GPermission", CanOdeslat = "Gordic.General.ApplicationInterface.GPermission", CanVlozitDoSpisu = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostOPodpis = "Gordic.General.ApplicationInterface.GPermission", LzeZaraditDoSchvalovacihoProcesu = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSprUkonPermissionsTypeLengths {}
}

//#endregion

