/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       uko.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Uko.Interface\Gordic.Uko.Interface.csproj
*    created     2026-02-16 14:33:50
*    files       Gordic.Uko.Interface.IGUkoBase.d.ts
*                GUkoEnums.d.ts
*                Dto\GCopyParamsDto.d.ts
*                Dto\GDetailKontrTermDto.d.ts
*                Dto\GDetailSodDto.d.ts
*                Dto\GDetailSodSplneniDto.d.ts
*                Dto\GDetailUkoDto.d.ts
*                Dto\GMoznostiAplikaceUkoDto.d.ts
*                Dto\GSeznamGenezeTreeDto.d.ts
*                Dto\GSeznamKontrTermDto.d.ts
*                Dto\GSeznamSodUkoDto.d.ts
*                Dto\GUkodpidDto.d.ts
*                Dto\GUkolyKontrolniObdobiDto.d.ts
*                Dto\GUkolyKPrevzetiDto.d.ts
*                Dto\GUkolyKPrideleniDto.d.ts
*                Dto\GUkolyNesplneneDto.d.ts
*                Dto\GUkosrioDto.d.ts
*                Dto\Filters\GDateIntervalFilterDto.d.ts
*                Dto\Filters\GHledaniFilterDto.d.ts
*                Dto\Filters\GObecneHledaniFilterDto.d.ts
*                Dto\Filters\GSeznamDokOdvozeneFilterDto.d.ts
*                Dto\Filters\GSeznamNesplneneFilterDto.d.ts
*                Dto\Filters\GSeznamPrehledyFilterDto.d.ts
*                Dto\Filters\GSeznamTerminyFilterDto.d.ts
*                Dto\Filters\GSubjektFilterDto.d.ts
*                Dto\Filters\GUkolyKontrolniObdobiFilterDto.d.ts
*                Isl\IGUkol.d.ts
*                Permissions\GDetailKontrTermPermissions.d.ts
*                Permissions\GDetailUkoluPermissions.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Gordic.Uko.Interface.IGUkoBase.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Výčet typů kategorií úkolů*/
	const enum TypKategorie {
		/**Úkol (3000)*/
		Ukol=3000,
		/**Úkol - operativní (3001)*/
		UkolOperativni=3001,
		/**Hlášení o převzetí úkolu (3010)*/
		Prevzeti=3010,
		/**Hlášení o odmítnutí úkolu (3020)*/
		Odmitnuti=3020,
		/**Sdělení k úkolu (3030)*/
		Sdeleni=3030,
		/**Avízo termínu úkolu (3040)*/
		Avizo=3040,
		/**Urgence splnění úkolu (3050)*/
		Urgence=3050,
		/**Hlášení o splnění úkolu (3060)*/
		Splneni=3060,
		/**Hlášení o plnění (3065)*/
		Plneni=3065,
	}
	/**Výčet typů kategorií úkolů*/
	interface CisTypKategorie {
		/**Úkol (3000)*/
		UKOL?: number|null;
		/**Úkol - operativní (3001)*/
		UKOL_OPERATIVNI?: number|null;
		/**Hlášení o převzetí úkolu (3010)*/
		PREVZETI?: number|null;
		/**Hlášení o odmítnutí úkolu (3020)*/
		ODMITNUTI?: number|null;
		/**Sdělení k úkolu (3030)*/
		SDELENI?: number|null;
		/**Avízo termínu úkolu (3040)*/
		AVIZO?: number|null;
		/**Urgence splnění úkolu (3050)*/
		URGENCE?: number|null;
		/**Hlášení o splnění úkolu (3060)*/
		SPLNENI?: number|null;
		/**Hlášení o plnění (3065)*/
		PLNENI?: number|null;
	}
	const enum CisTypKategorieNames { UKOL = "UKOL", UKOL_OPERATIVNI = "UKOL_OPERATIVNI", PREVZETI = "PREVZETI", ODMITNUTI = "ODMITNUTI", SDELENI = "SDELENI", AVIZO = "AVIZO", URGENCE = "URGENCE", SPLNENI = "SPLNENI", PLNENI = "PLNENI",}
	const enum CisTypKategorieFragments { UKOL = "*", UKOL_OPERATIVNI = "*", PREVZETI = "*", ODMITNUTI = "*", SDELENI = "*", AVIZO = "*", URGENCE = "*", SPLNENI = "*", PLNENI = "*",}
	const enum CisTypKategorieTypes { UKOL = "number", UKOL_OPERATIVNI = "number", PREVZETI = "number", ODMITNUTI = "number", SDELENI = "number", AVIZO = "number", URGENCE = "number", SPLNENI = "number", PLNENI = "number",}
	const enum CisTypKategorieTypeLengths {}
	/**Stav aktivity*/
	interface CisAktivita {
		/**Aktivní (100)*/
		AKTIVNI?: number|null;
		/**Zrušen (900)*/
		ZRUSEN?: number|null;
	}
	const enum CisAktivitaNames { AKTIVNI = "AKTIVNI", ZRUSEN = "ZRUSEN",}
	const enum CisAktivitaFragments { AKTIVNI = "*", ZRUSEN = "*",}
	const enum CisAktivitaTypes { AKTIVNI = "number", ZRUSEN = "number",}
	const enum CisAktivitaTypeLengths {}
	/**Třída pro výčet typů ixs kategorií úkolů*/
	interface IxsKategorie {
		/**Úkol (000004030001)*/
		Ukol?: string|null;
		/**Úkol - operativní (00000403001W)*/
		UkolOperativni?: string|null;
		/**Hlášení o převzetí úkolu (00000403010U)*/
		Prevzeti?: string|null;
		/**Hlášení o odmítnutí úkolu (00000403020N)*/
		Odmitnuti?: string|null;
		/**Sdělení k úkolu (00000403030G)*/
		Sdeleni?: string|null;
		/**Avízo termínu úkolu (000004030409)*/
		Avizo?: string|null;
		/**Urgence splnění úkolu (000004030502)*/
		Urgence?: string|null;
		/**Hlášení o splnění úkolu (00000403060V)*/
		Splneni?: string|null;
		/**Hlášení o plnění (000004030656)*/
		Plneni?: string|null;
	}
	const enum IxsKategorieNames { Ukol = "Ukol", UkolOperativni = "UkolOperativni", Prevzeti = "Prevzeti", Odmitnuti = "Odmitnuti", Sdeleni = "Sdeleni", Avizo = "Avizo", Urgence = "Urgence", Splneni = "Splneni", Plneni = "Plneni",}
	const enum IxsKategorieFragments { Ukol = "*", UkolOperativni = "*", Prevzeti = "*", Odmitnuti = "*", Sdeleni = "*", Avizo = "*", Urgence = "*", Splneni = "*", Plneni = "*",}
	const enum IxsKategorieTypes { Ukol = "string", UkolOperativni = "string", Prevzeti = "string", Odmitnuti = "string", Sdeleni = "string", Avizo = "string", Urgence = "string", Splneni = "string", Plneni = "string",}
	const enum IxsKategorieTypeLengths {}
	/**Třída s čísly revizí db pro vyjímky v kódu*/
	interface DbVersionExceptions {
		/**Do UKOSPID doplněn příznak tiché procedury*/
		REV_TICHA_PROC?: string|null;
		/**Do UKOSPID doplněna vazba na navrhovaného nového nositele*/
		REV_IXS_FUN_NAV?: string|null;
	}
	const enum DbVersionExceptionsNames { REV_TICHA_PROC = "REV_TICHA_PROC", REV_IXS_FUN_NAV = "REV_IXS_FUN_NAV",}
	const enum DbVersionExceptionsFragments { REV_TICHA_PROC = "*", REV_IXS_FUN_NAV = "*",}
	const enum DbVersionExceptionsTypes { REV_TICHA_PROC = "string", REV_IXS_FUN_NAV = "string",}
	const enum DbVersionExceptionsTypeLengths {}
	/**Nuláky pro vazební odkazy*/
	interface CisNullak {
		/**IXS_FUN ("0000SF00000Z")*/
		IXS_FUN?: string|null;
		/**IXS_ZMP ("0000SZ000007")*/
		IXS_ZMP?: string|null;
	}
	const enum CisNullakNames { IXS_FUN = "IXS_FUN", IXS_ZMP = "IXS_ZMP",}
	const enum CisNullakFragments { IXS_FUN = "*", IXS_ZMP = "*",}
	const enum CisNullakTypes { IXS_FUN = "string", IXS_ZMP = "string",}
	const enum CisNullakTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\GUkoEnums.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Výčet všech možných bitmap v seznamových sloupcích zásilek*/
	const enum SeznamBitmap {
		/**žádná bitmapa*/
		NoBitmap=0,
		/**Těsně před termínem - modré hodiny*/
		UkoPredTerminem=10,
		/**Po termínu - červené hodiny*/
		UkoPoTerminu=20,
		/**Po termínu - červený kříž*/
		KontrPoTerminu=30,
		/**Splněný termín - modrý fajfka*/
		KontrSplnTermin=31,
		/**Příznak SOD přečteno*/
		SodPrecteno=40,
		/**Příznak SOD nepřečteno*/
		SodNeprecteno=50,
		/**Příznak SOD odeslán*/
		SodOdeslan=60,
		/**Příznak SOD přijat*/
		SodPrijat=70,
		/**Příznak SOD uložen*/
		SodUlozen=80,
		/**Příznak SOD přijat*/
		Nehodnoceno=90,
		/**Příznak SOD přijat*/
		Kvalita15=100,
		/**Příznak SOD přijat*/
		Kvalita30=110,
		/**Příznak SOD přijat*/
		Kvalita45=120,
		/**Příznak SOD přijat*/
		Kvalita60=130,
		/**Příznak SOD přijat*/
		Kvalita75=140,
		/**Příznak SOD přijat*/
		Kvalita90=150,
		/**Příznak SOD přijat*/
		Kvalita99=160,
		/**Příznak SOD přijat*/
		Kvalita100=170,
		/**Příznak SOD přijat*/
		Uplnost15=180,
		/**Příznak SOD přijat*/
		Uplnost30=190,
		/**Příznak SOD přijat*/
		Uplnost45=200,
		/**Příznak SOD přijat*/
		Uplnost60=210,
		/**Příznak SOD přijat*/
		Uplnost75=220,
		/**Příznak SOD přijat*/
		Uplnost90=230,
		/**Příznak SOD přijat*/
		Uplnost99=240,
		/**Příznak SOD přijat*/
		Uplnost100=250,
		/**ádná bitmapa 16*/
		NoBitmap16=260,
		/**Příznak SOD přečten 16*/
		SodPrecteno16=270,
		/**Příznak SOD nepřečten 16*/
		SodNeprecteno16=280,
		/**Příznak SOD odeslánu 16*/
		SodOdeslan16=290,
		/**Příznak SOD přijat 16*/
		SodPrijat16=300,
		/**Příznak SOD uložen 16*/
		SodUloz16=310,
		/**Příznak SOD stornován 16*/
		SodStorno16=320,
		/**Příznak SOD ostatní 16*/
		SodOstatni16=330,
		/**Úkol v seznamu základní*/
		UkoList=340,
		/**Úkol v seznamu z písemnosti*/
		UkoListPis=350,
		/**Úkol v seznamu z ostatní aplikace*/
		UkoListGin=360,
		/**Úkol v seznamu z vlastního uzlu*/
		UkoListUzel=370,
		/**Příznak SOD uložen i odeslán*/
		SodOdeslanPrijat=380,
	}
	/**Typ zobrazení detailu ověření*/
	const enum TypZobrazeniDetailuUko {
		/**Nový úkol*/
		Novy=10,
		/**Nový úkol*/
		NovyExterne=20,
		/**Nový úkol, kopie*/
		NovyKopie=30,
		/**Nový podřízený úkol*/
		NovyPodrizeny=40,
		/**Nový úkol z dokumentu*/
		NovyZDokumentu=50,
		/**Zobrazit detail*/
		Detail=60,
		/**Zobrazit detail odvozeného dokumentu*/
		DetailOdvozenyDokument=63,
		/**Zobrazit detail pouze pro čtení*/
		DetailReadOnly=66,
		/**Editovat detail*/
		Editace=70,
		/**Zobrazeni při akci odmítnout*/
		Odmitnuti=80,
		/**Zobrazeni při akci převzít*/
		Prevzeti=90,
		/**Zobrazeni při akci splnit*/
		Splneni=100,
		/**Zobrazeni při akci nový kontrolní termín*/
		NovyKontrolniTermin=110,
		/**Zobrazeni při akci hodnotit kontrolní termín*/
		HodnoceniTerminu=120,
		/**Zobrazení při akci nový odvozený dokument*/
		NovyOdvozenyDokument=130,
		/**Zobrazení při akci úprava odvozeného dokumentu*/
		UpravaOdvozenehoDokumentu=140,
		/**Zobrazení při akci zamítnout*/
		ZamitnutiSOD=150,
		/**Zobrazení při akci předání nositeli*/
		PredaniNositeli=160,
		/**Zobrazení při akci oprava názvu*/
		SupervisorOpravaNazvu=900,
		/**Zobrazení při akci oprava profilu*/
		SupervisorOpravaProfilu=901,
		/**Zobrazení při akci oprava pracnosti*/
		SupervisorOpravaPracnosti=902,
		/**Zobrazení při akci oprava zdroje*/
		SupervisorOpravaZdroje=903,
		/**Zobrazení při akci oprava SODu*/
		SupervisorOpravaSodu=904,
		/**Zobrazení při akci oprava stavu úkolu*/
		SupervisorOpravaStavuUkolu=905,
		/**Zobrazení při akci oprava zadavatele úkolu*/
		SupervisorOpravaZadavatele=906,
		/**Prázdná hodnota*/
		Null,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GCopyParamsDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Dto pro parametry kopie úkolu*/
	interface GCopyParamsDto {
		/**Název úkolu*/
		nazevUko?: boolean|null;
		/**Profil úkolu*/
		profilUko?: boolean|null;
		/**Pracnost*/
		pracnost?: boolean|null;
		/**Typ zdroje*/
		typZdroje?: boolean|null;
		/**Číslo zdroje*/
		cisloZdroje?: boolean|null;
		/**Místo vzniku zdroje*/
		mistoZdroje?: boolean|null;
		/**Datum vzniku zdroje*/
		datVznikuZdroje?: boolean|null;
		/**Spolupracující osoby*/
		spolOso?: boolean|null;
		/**Informované osoby*/
		infOso?: boolean|null;
		/**Přílohy*/
		prilohy?: boolean|null;
		/**Kontrolní termíny*/
		kontTermin?: boolean|null;
		/**Kopie jako související úkol*/
		kopieSouvisejici?: boolean|null;
		/**Tichá procedura*/
		tichaProcedura?: boolean|null;
		/**Deník*/
		ukoden?: string|null;
	}
	const enum GCopyParamsDtoNames { nazevUko = "nazevUko", profilUko = "profilUko", pracnost = "pracnost", typZdroje = "typZdroje", cisloZdroje = "cisloZdroje", mistoZdroje = "mistoZdroje", datVznikuZdroje = "datVznikuZdroje", spolOso = "spolOso", infOso = "infOso", prilohy = "prilohy", kontTermin = "kontTermin", kopieSouvisejici = "kopieSouvisejici", tichaProcedura = "tichaProcedura", ukoden = "ukoden",}
	const enum GCopyParamsDtoFragments { nazevUko = "*", profilUko = "*", pracnost = "*", typZdroje = "*", cisloZdroje = "*", mistoZdroje = "*", datVznikuZdroje = "*", spolOso = "*", infOso = "*", prilohy = "*", kontTermin = "*", kopieSouvisejici = "*", tichaProcedura = "*", ukoden = "*",}
	const enum GCopyParamsDtoTypes { nazevUko = "boolean", profilUko = "boolean", pracnost = "boolean", typZdroje = "boolean", cisloZdroje = "boolean", mistoZdroje = "boolean", datVznikuZdroje = "boolean", spolOso = "boolean", infOso = "boolean", prilohy = "boolean", kontTermin = "boolean", kopieSouvisejici = "boolean", tichaProcedura = "boolean", ukoden = "string",}
	const enum GCopyParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GDetailKontrTermDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**GDetailKontrTermDto*/
	interface GDetailKontrTermDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		dat_kontr?: JsonDate|null;
		/**Autogenerated.*/
		dat_spln_kontr?: JsonDate|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		priz_spln_kontr?: number|null;
		/**Autogenerated.*/
		hodn_uko?: number|null;
		/**Autogenerated.*/
		hodn_uko_text?: string|null;
		/**Autogenerated.*/
		plneni_uko?: number|null;
	}
	const enum GDetailKontrTermDtoNames { ixp_uko = "ixp_uko", por_cislo = "por_cislo", dat_kontr = "dat_kontr", dat_spln_kontr = "dat_spln_kontr", poznamka = "poznamka", priz_spln_kontr = "priz_spln_kontr", hodn_uko = "hodn_uko", hodn_uko_text = "hodn_uko_text", plneni_uko = "plneni_uko", Permissions = "Permissions",}
	const enum GDetailKontrTermDtoFragments { ixp_uko = "*", por_cislo = "*", dat_kontr = "*", dat_spln_kontr = "*", poznamka = "*", priz_spln_kontr = "*", hodn_uko = "*", hodn_uko_text = "*", plneni_uko = "*", Permissions = "*",}
	const enum GDetailKontrTermDtoTypes { ixp_uko = "string", por_cislo = "number", dat_kontr = "JsonDate", dat_spln_kontr = "JsonDate", poznamka = "string", priz_spln_kontr = "number", hodn_uko = "number", hodn_uko_text = "string", plneni_uko = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDetailKontrTermDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GDetailSodDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Nadstavba detailu úkolu pro SOD*/
	interface GDetailSodDto extends Gordic.Uko.Interface.GDetailUkoDto {
		/**Filtr na typ SOD*/
		FilterTypSod?: number|null;
		ixs_fun_nos_multi?: string[]|null;
	}
	const enum GDetailSodDtoNames { FilterTypSod = "FilterTypSod", ixs_fun_nos_multi = "ixs_fun_nos_multi", ixp_uko = "ixp_uko", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", uko_nazev = "uko_nazev", stav_uko = "stav_uko", stav_uko_txt = "stav_uko_txt", cj_uko = "cj_uko", cj_num = "cj_num", rok = "rok", cj_uko_gen = "cj_uko_gen", ixp_src = "ixp_src", ixs_typ_src = "ixs_typ_src", ktg_typ_src = "ktg_typ_src", ssl_nazev = "ssl_nazev", src_nazev = "src_nazev", dat_ze_dne_src = "dat_ze_dne_src", cj_uko_src = "cj_uko_src", misto_vzniku = "misto_vzniku", ixs_fun_zad = "ixs_fun_zad", ixs_fun_nos = "ixs_fun_nos", dat_vytvor = "dat_vytvor", dat_prid = "dat_prid", dat_prevz = "dat_prevz", dat_vyriz = "dat_vyriz", dat_termin = "dat_termin", s_sod = "s_sod", precteno = "precteno", priz_ele = "priz_ele", aktivita = "aktivita", dat_zmena = "dat_zmena", ixs_fun_akt = "ixs_fun_akt", ixs_zmp_zad = "ixs_zmp_zad", ixs_zmp_nos = "ixs_zmp_nos", s_hodn = "s_hodn", hodn_ukov = "hodn_ukov", hodn_ukov_txt = "hodn_ukov_txt", plneni_uko = "plneni_uko", pracnost_plan = "pracnost_plan", pracnost_skut = "pracnost_skut", mer_prac = "mer_prac", email_zad = "email_zad", email_nos = "email_nos", StavSplneni = "StavSplneni", StavPodrizeni = "StavPodrizeni", StavNadrizeni = "StavNadrizeni", NazevZad = "NazevZad", NazevNos = "NazevNos", IxsOrjZad = "IxsOrjZad", IxsOrjNos = "IxsOrjNos", ExistSpolInf = "ExistSpolInf", IxpUkoPis = "IxpUkoPis", PristupUko = "PristupUko", priloha = "priloha", pracnost_skut_podrizeni = "pracnost_skut_podrizeni", poznamka = "poznamka", obsah = "obsah", ukoden = "ukoden", kopirovat_prilohy = "kopirovat_prilohy", s_ticha_proc = "s_ticha_proc", ixs_fun_nav = "ixs_fun_nav", ixs_zmp_nav = "ixs_zmp_nav", ixs_rio = "ixs_rio", ukosrio_nazev = "ukosrio_nazev", StavSod = "StavSod", StavPrecteno = "StavPrecteno", Permissions = "Permissions", detailSod = "detailSod", nazev_rf_zad = "nazev_rf_zad", nazev_rf_nos = "nazev_rf_nos", nazev = "nazev",}
	const enum GDetailSodDtoFragments { FilterTypSod = "*", ixs_fun_nos_multi = "*", ixp_uko = "*", ixs_typ = "*", ktg_typ = "*", uko_nazev = "*", stav_uko = "*", stav_uko_txt = "*", cj_uko = "*", cj_num = "*", rok = "*", cj_uko_gen = "*", ixp_src = "*", ixs_typ_src = "*", ktg_typ_src = "*", ssl_nazev = "*", src_nazev = "*", dat_ze_dne_src = "*", cj_uko_src = "*", misto_vzniku = "*", ixs_fun_zad = "*", ixs_fun_nos = "*", dat_vytvor = "*", dat_prid = "*", dat_prevz = "*", dat_vyriz = "*", dat_termin = "*", s_sod = "*", precteno = "*", priz_ele = "*", aktivita = "*", dat_zmena = "*", ixs_fun_akt = "*", ixs_zmp_zad = "*", ixs_zmp_nos = "*", s_hodn = "*", hodn_ukov = "*", hodn_ukov_txt = "*", plneni_uko = "*", pracnost_plan = "*", pracnost_skut = "*", mer_prac = "*", email_zad = "*", email_nos = "*", StavSplneni = "*", StavPodrizeni = "*", StavNadrizeni = "*", NazevZad = "*", NazevNos = "*", IxsOrjZad = "*", IxsOrjNos = "*", ExistSpolInf = "*", IxpUkoPis = "*", PristupUko = "*", priloha = "*", pracnost_skut_podrizeni = "*", poznamka = "*", obsah = "*", ukoden = "*", kopirovat_prilohy = "*", s_ticha_proc = "*", ixs_fun_nav = "*", ixs_zmp_nav = "*", ixs_rio = "*", ukosrio_nazev = "*", StavSod = "*", StavPrecteno = "*", Permissions = "*", detailSod = "*", nazev_rf_zad = "*", nazev_rf_nos = "*", nazev = "*",}
	const enum GDetailSodDtoTypes { FilterTypSod = "number", ixs_fun_nos_multi = "string[]", ixp_uko = "string", ixs_typ = "string", ktg_typ = "number", uko_nazev = "string", stav_uko = "number", stav_uko_txt = "string", cj_uko = "string", cj_num = "number", rok = "number", cj_uko_gen = "string", ixp_src = "string", ixs_typ_src = "string", ktg_typ_src = "number", ssl_nazev = "string", src_nazev = "string", dat_ze_dne_src = "JsonDate", cj_uko_src = "string", misto_vzniku = "string", ixs_fun_zad = "string", ixs_fun_nos = "string", dat_vytvor = "JsonDate", dat_prid = "JsonDate", dat_prevz = "JsonDate", dat_vyriz = "JsonDate", dat_termin = "JsonDate", s_sod = "number", precteno = "number", priz_ele = "number", aktivita = "number", dat_zmena = "JsonDate", ixs_fun_akt = "string", ixs_zmp_zad = "string", ixs_zmp_nos = "string", s_hodn = "number", hodn_ukov = "number", hodn_ukov_txt = "string", plneni_uko = "number", pracnost_plan = "JsonDecimal", pracnost_skut = "JsonDecimal", mer_prac = "number", email_zad = "string", email_nos = "string", StavSplneni = "string", StavPodrizeni = "string", StavNadrizeni = "string", NazevZad = "string", NazevNos = "string", IxsOrjZad = "string", IxsOrjNos = "string", ExistSpolInf = "string", IxpUkoPis = "string", PristupUko = "string", priloha = "string", pracnost_skut_podrizeni = "JsonDecimal", poznamka = "string", obsah = "Gordic.Uko.Interface.GUkodpidDto", ukoden = "string", kopirovat_prilohy = "boolean", s_ticha_proc = "number", ixs_fun_nav = "string", ixs_zmp_nav = "string", ixs_rio = "string", ukosrio_nazev = "string", StavSod = "Gordic.Uko.Interface.SeznamBitmap", StavPrecteno = "Gordic.Uko.Interface.SeznamBitmap", Permissions = "Gordic.Uko.Interface.GDetailUkoluPermissions", detailSod = "Gordic.Uko.Interface.GDetailSodDto", nazev_rf_zad = "string", nazev_rf_nos = "string", nazev = "string",}
	const enum GDetailSodDtoTypeLengths { uko_nazev = 254, cj_uko_src = 254, misto_vzniku = 50, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GDetailSodSplneniDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Nadstavba detailu úkolu pro SOD*/
	interface GDetailSodSplneniDto {
		/**Autogenerated.*/
		sod_ixp_uko?: string|null;
		/**Autogenerated.*/
		sod_ixs_typ?: string|null;
		/**Autogenerated.*/
		sod_ktg_typ?: number|null;
		/**Autogenerated.*/
		sod_uko_nazev?: string|null;
		/**Autogenerated.*/
		sod_cj_uko?: string|null;
		/**Autogenerated.*/
		sod_ixs_fun_zad?: string|null;
		/**Autogenerated.*/
		sod_ixs_fun_nos?: string|null;
		/**Autogenerated.*/
		sod_dat_vytvor?: JsonDate|null;
		/**Autogenerated.*/
		sod_dat_vyriz?: JsonDate|null;
		/**Autogenerated.*/
		sod_ixs_zmp_zad?: string|null;
		/**Autogenerated.*/
		sod_ixs_zmp_nos?: string|null;
		/**Autogenerated.*/
		sodNazevZad?: string|null;
		/**Autogenerated.*/
		sodNazevNos?: string|null;
		/**Autogenerated.*/
		sodIxsOrjZad?: string|null;
		/**Autogenerated.*/
		sodIxsOrjNos?: string|null;
		/**profil ukolu - obsah*/
		sodObsah?: Gordic.Uko.Interface.GUkodpidDto|null;
	}
	const enum GDetailSodSplneniDtoNames { sod_ixp_uko = "sod_ixp_uko", sod_ixs_typ = "sod_ixs_typ", sod_ktg_typ = "sod_ktg_typ", sod_uko_nazev = "sod_uko_nazev", sod_cj_uko = "sod_cj_uko", sod_ixs_fun_zad = "sod_ixs_fun_zad", sod_ixs_fun_nos = "sod_ixs_fun_nos", sod_dat_vytvor = "sod_dat_vytvor", sod_dat_vyriz = "sod_dat_vyriz", sod_ixs_zmp_zad = "sod_ixs_zmp_zad", sod_ixs_zmp_nos = "sod_ixs_zmp_nos", sodNazevZad = "sodNazevZad", sodNazevNos = "sodNazevNos", sodIxsOrjZad = "sodIxsOrjZad", sodIxsOrjNos = "sodIxsOrjNos", sodObsah = "sodObsah",}
	const enum GDetailSodSplneniDtoFragments { sod_ixp_uko = "*", sod_ixs_typ = "*", sod_ktg_typ = "*", sod_uko_nazev = "*", sod_cj_uko = "*", sod_ixs_fun_zad = "*", sod_ixs_fun_nos = "*", sod_dat_vytvor = "*", sod_dat_vyriz = "*", sod_ixs_zmp_zad = "*", sod_ixs_zmp_nos = "*", sodNazevZad = "*", sodNazevNos = "*", sodIxsOrjZad = "*", sodIxsOrjNos = "*", sodObsah = "*",}
	const enum GDetailSodSplneniDtoTypes { sod_ixp_uko = "string", sod_ixs_typ = "string", sod_ktg_typ = "number", sod_uko_nazev = "string", sod_cj_uko = "string", sod_ixs_fun_zad = "string", sod_ixs_fun_nos = "string", sod_dat_vytvor = "JsonDate", sod_dat_vyriz = "JsonDate", sod_ixs_zmp_zad = "string", sod_ixs_zmp_nos = "string", sodNazevZad = "string", sodNazevNos = "string", sodIxsOrjZad = "string", sodIxsOrjNos = "string", sodObsah = "Gordic.Uko.Interface.GUkodpidDto",}
	const enum GDetailSodSplneniDtoTypeLengths { sod_uko_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GDetailUkoDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Detail úkolu Dto*/
	interface GDetailUkoDto {
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		ixs_typ?: string|null;
		/**Autogenerated.*/
		ktg_typ?: number|null;
		/**Autogenerated.*/
		uko_nazev?: string|null;
		/**Autogenerated.*/
		stav_uko?: number|null;
		/**Autogenerated.*/
		stav_uko_txt?: string|null;
		/**Autogenerated.*/
		cj_uko?: string|null;
		/**Autogenerated.*/
		cj_num?: number|null;
		/**Autogenerated.*/
		rok?: number|null;
		/**Autogenerated.*/
		cj_uko_gen?: string|null;
		/**Autogenerated.*/
		ixp_src?: string|null;
		/**Autogenerated.*/
		ixs_typ_src?: string|null;
		/**Autogenerated.*/
		ktg_typ_src?: number|null;
		/**Autogenerated.*/
		ssl_nazev?: string|null;
		/**Autogenerated.*/
		src_nazev?: string|null;
		/**Autogenerated.*/
		dat_ze_dne_src?: JsonDate|null;
		/**Autogenerated.*/
		cj_uko_src?: string|null;
		/**Autogenerated.*/
		misto_vzniku?: string|null;
		/**Autogenerated.*/
		ixs_fun_zad?: string|null;
		/**Autogenerated.*/
		ixs_fun_nos?: string|null;
		/**Autogenerated.*/
		dat_vytvor?: JsonDate|null;
		/**Autogenerated.*/
		dat_prid?: JsonDate|null;
		/**Autogenerated.*/
		dat_prevz?: JsonDate|null;
		/**Autogenerated.*/
		dat_vyriz?: JsonDate|null;
		/**Autogenerated.*/
		dat_termin?: JsonDate|null;
		/**Autogenerated.*/
		s_sod?: number|null;
		/**Autogenerated.*/
		precteno?: number|null;
		/**Autogenerated.*/
		priz_ele?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		ixs_fun_akt?: string|null;
		/**Autogenerated.*/
		ixs_zmp_zad?: string|null;
		/**Autogenerated.*/
		ixs_zmp_nos?: string|null;
		/**Autogenerated.*/
		s_hodn?: number|null;
		/**Autogenerated.*/
		hodn_ukov?: number|null;
		/**Autogenerated.*/
		hodn_ukov_txt?: string|null;
		/**Autogenerated.*/
		plneni_uko?: number|null;
		/**Autogenerated.*/
		pracnost_plan?: JsonDecimal|null;
		/**Autogenerated.*/
		pracnost_skut?: JsonDecimal|null;
		/**Autogenerated.*/
		mer_prac?: number|null;
		/**Autogenerated.*/
		email_zad?: string|null;
		/**Autogenerated.*/
		email_nos?: string|null;
		/**Autogenerated.*/
		StavSplneni?: string|null;
		/**Autogenerated.*/
		StavPodrizeni?: string|null;
		/**Autogenerated.*/
		StavNadrizeni?: string|null;
		/**Autogenerated.*/
		NazevZad?: string|null;
		/**Autogenerated.*/
		NazevNos?: string|null;
		/**Autogenerated.*/
		IxsOrjZad?: string|null;
		/**Autogenerated.*/
		IxsOrjNos?: string|null;
		/**Autogenerated.*/
		ExistSpolInf?: string|null;
		/**Autogenerated.*/
		IxpUkoPis?: string|null;
		/**Autogenerated.*/
		PristupUko?: string|null;
		/**Autogenerated.*/
		priloha?: string|null;
		/**Autogenerated.*/
		pracnost_skut_podrizeni?: JsonDecimal|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**profil ukolu - obsah*/
		obsah?: Gordic.Uko.Interface.GUkodpidDto|null;
		/**deník*/
		ukoden?: string|null;
		/**kopirovat_prilohy*/
		kopirovat_prilohy?: boolean|null;
		/**s_ticha_proc*/
		s_ticha_proc?: number|null;
		/**ixs_fun_nav*/
		ixs_fun_nav?: string|null;
		/**ixs_fun_nav*/
		ixs_zmp_nav?: string|null;
		/**identifikátor priority*/
		ixs_rio?: string|null;
		/**Priorita - název*/
		ukosrio_nazev?: string|null;
		/**StavSod*/
		StavSod?: Gordic.Uko.Interface.SeznamBitmap|null;
		/**StavSod*/
		StavPrecteno?: Gordic.Uko.Interface.SeznamBitmap|null;
		Permissions?: Gordic.Uko.Interface.GDetailUkoluPermissions|null;
		detailSod?: Gordic.Uko.Interface.GDetailSodDto|null;
		/**Název zadavatele úkolu*/
		nazev_rf_zad?: string|null;
		/**Název nositele úkolu*/
		nazev_rf_nos?: string|null;
		/**Název úkolu*/
		nazev?: string|null;
		/**Pořadí, ve kterém se mají vykreslit řádky*/
		poradi?: number|null;
		/**Označení pro tisk*/
		s_tisk?: number|null;
		/**Zda má být pole datum vzniku povinné (při zakládání nového úkolu)*/
		dat_vzniku_req?: boolean|null;
		/**Zda má být pole datum vzniku povinné (při zakládání nového úkolu)*/
		plan_plneni?: boolean|null;
	}
	const enum GDetailUkoDtoNames { ixp_uko = "ixp_uko", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", uko_nazev = "uko_nazev", stav_uko = "stav_uko", stav_uko_txt = "stav_uko_txt", cj_uko = "cj_uko", cj_num = "cj_num", rok = "rok", cj_uko_gen = "cj_uko_gen", ixp_src = "ixp_src", ixs_typ_src = "ixs_typ_src", ktg_typ_src = "ktg_typ_src", ssl_nazev = "ssl_nazev", src_nazev = "src_nazev", dat_ze_dne_src = "dat_ze_dne_src", cj_uko_src = "cj_uko_src", misto_vzniku = "misto_vzniku", ixs_fun_zad = "ixs_fun_zad", ixs_fun_nos = "ixs_fun_nos", dat_vytvor = "dat_vytvor", dat_prid = "dat_prid", dat_prevz = "dat_prevz", dat_vyriz = "dat_vyriz", dat_termin = "dat_termin", s_sod = "s_sod", precteno = "precteno", priz_ele = "priz_ele", aktivita = "aktivita", dat_zmena = "dat_zmena", ixs_fun_akt = "ixs_fun_akt", ixs_zmp_zad = "ixs_zmp_zad", ixs_zmp_nos = "ixs_zmp_nos", s_hodn = "s_hodn", hodn_ukov = "hodn_ukov", hodn_ukov_txt = "hodn_ukov_txt", plneni_uko = "plneni_uko", pracnost_plan = "pracnost_plan", pracnost_skut = "pracnost_skut", mer_prac = "mer_prac", email_zad = "email_zad", email_nos = "email_nos", StavSplneni = "StavSplneni", StavPodrizeni = "StavPodrizeni", StavNadrizeni = "StavNadrizeni", NazevZad = "NazevZad", NazevNos = "NazevNos", IxsOrjZad = "IxsOrjZad", IxsOrjNos = "IxsOrjNos", ExistSpolInf = "ExistSpolInf", IxpUkoPis = "IxpUkoPis", PristupUko = "PristupUko", priloha = "priloha", pracnost_skut_podrizeni = "pracnost_skut_podrizeni", poznamka = "poznamka", obsah = "obsah", ukoden = "ukoden", kopirovat_prilohy = "kopirovat_prilohy", s_ticha_proc = "s_ticha_proc", ixs_fun_nav = "ixs_fun_nav", ixs_zmp_nav = "ixs_zmp_nav", ixs_rio = "ixs_rio", ukosrio_nazev = "ukosrio_nazev", StavSod = "StavSod", StavPrecteno = "StavPrecteno", Permissions = "Permissions", detailSod = "detailSod", nazev_rf_zad = "nazev_rf_zad", nazev_rf_nos = "nazev_rf_nos", nazev = "nazev", poradi = "poradi", s_tisk = "s_tisk", dat_vzniku_req = "dat_vzniku_req", plan_plneni = "plan_plneni",}
	const enum GDetailUkoDtoFragments { ixp_uko = "*", ixs_typ = "*", ktg_typ = "*", uko_nazev = "*", stav_uko = "*", stav_uko_txt = "*", cj_uko = "*", cj_num = "*", rok = "*", cj_uko_gen = "*", ixp_src = "*", ixs_typ_src = "*", ktg_typ_src = "*", ssl_nazev = "*", src_nazev = "*", dat_ze_dne_src = "*", cj_uko_src = "*", misto_vzniku = "*", ixs_fun_zad = "*", ixs_fun_nos = "*", dat_vytvor = "*", dat_prid = "*", dat_prevz = "*", dat_vyriz = "*", dat_termin = "*", s_sod = "*", precteno = "*", priz_ele = "*", aktivita = "*", dat_zmena = "*", ixs_fun_akt = "*", ixs_zmp_zad = "*", ixs_zmp_nos = "*", s_hodn = "*", hodn_ukov = "*", hodn_ukov_txt = "*", plneni_uko = "*", pracnost_plan = "*", pracnost_skut = "*", mer_prac = "*", email_zad = "*", email_nos = "*", StavSplneni = "*", StavPodrizeni = "*", StavNadrizeni = "*", NazevZad = "*", NazevNos = "*", IxsOrjZad = "*", IxsOrjNos = "*", ExistSpolInf = "*", IxpUkoPis = "*", PristupUko = "*", priloha = "*", pracnost_skut_podrizeni = "*", poznamka = "*", obsah = "*", ukoden = "*", kopirovat_prilohy = "*", s_ticha_proc = "*", ixs_fun_nav = "*", ixs_zmp_nav = "*", ixs_rio = "*", ukosrio_nazev = "*", StavSod = "*", StavPrecteno = "*", Permissions = "*", detailSod = "*", nazev_rf_zad = "*", nazev_rf_nos = "*", nazev = "*", poradi = "*", s_tisk = "*", dat_vzniku_req = "*", plan_plneni = "*",}
	const enum GDetailUkoDtoTypes { ixp_uko = "string", ixs_typ = "string", ktg_typ = "number", uko_nazev = "string", stav_uko = "number", stav_uko_txt = "string", cj_uko = "string", cj_num = "number", rok = "number", cj_uko_gen = "string", ixp_src = "string", ixs_typ_src = "string", ktg_typ_src = "number", ssl_nazev = "string", src_nazev = "string", dat_ze_dne_src = "JsonDate", cj_uko_src = "string", misto_vzniku = "string", ixs_fun_zad = "string", ixs_fun_nos = "string", dat_vytvor = "JsonDate", dat_prid = "JsonDate", dat_prevz = "JsonDate", dat_vyriz = "JsonDate", dat_termin = "JsonDate", s_sod = "number", precteno = "number", priz_ele = "number", aktivita = "number", dat_zmena = "JsonDate", ixs_fun_akt = "string", ixs_zmp_zad = "string", ixs_zmp_nos = "string", s_hodn = "number", hodn_ukov = "number", hodn_ukov_txt = "string", plneni_uko = "number", pracnost_plan = "JsonDecimal", pracnost_skut = "JsonDecimal", mer_prac = "number", email_zad = "string", email_nos = "string", StavSplneni = "string", StavPodrizeni = "string", StavNadrizeni = "string", NazevZad = "string", NazevNos = "string", IxsOrjZad = "string", IxsOrjNos = "string", ExistSpolInf = "string", IxpUkoPis = "string", PristupUko = "string", priloha = "string", pracnost_skut_podrizeni = "JsonDecimal", poznamka = "string", obsah = "Gordic.Uko.Interface.GUkodpidDto", ukoden = "string", kopirovat_prilohy = "boolean", s_ticha_proc = "number", ixs_fun_nav = "string", ixs_zmp_nav = "string", ixs_rio = "string", ukosrio_nazev = "string", StavSod = "Gordic.Uko.Interface.SeznamBitmap", StavPrecteno = "Gordic.Uko.Interface.SeznamBitmap", Permissions = "Gordic.Uko.Interface.GDetailUkoluPermissions", detailSod = "Gordic.Uko.Interface.GDetailSodDto", nazev_rf_zad = "string", nazev_rf_nos = "string", nazev = "string", poradi = "number", s_tisk = "number", dat_vzniku_req = "boolean", plan_plneni = "boolean",}
	const enum GDetailUkoDtoTypeLengths { uko_nazev = 254, cj_uko_src = 254, misto_vzniku = 50, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GMoznostiAplikaceUkoDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Dto pro moznosti aplikace*/
	interface GMoznostiAplikaceUkoDto {
		/**RozbalitStrom*/
		RozbalitStrom?: boolean|null;
		/**Denik*/
		Denik?: string|null;
		/**DatumovyRozsah*/
		DatumovyRozsah?: number|null;
		/**UpozNaTermSpl*/
		UpozNaTermSpl?: number|null;
		/**ZvyrazneniTlacitek*/
		ZvyrazneniTlacitek?: boolean|null;
		/**ZobrazeniPuvodniFunkce*/
		ZobrazeniPuvodniFunkce?: boolean|null;
		/**TiskKontrTerm*/
		TiskKontrTerm?: boolean|null;
		/**TiskSpoluprac*/
		TiskSpoluprac?: boolean|null;
		/**TiskJenOznacene*/
		TiskJenOznacene?: boolean|null;
		/**DotazKopiePrilohy*/
		DotazKopiePrilohy?: boolean|null;
		/**KopiePrilohy*/
		KopiePrilohy?: boolean|null;
		/**PridelenyZobrazovatNadrizeny*/
		PridelenyZobrazovatNadrizeny?: boolean|null;
		/**PridelenyZobrazovatPodrizeny*/
		PridelenyZobrazovatPodrizeny?: boolean|null;
		/**PrevzateZobrazovatNadrizeny*/
		PrevzateZobrazovatNadrizeny?: boolean|null;
		/**PrevzateZobrazovatPodrizeny*/
		PrevzateZobrazovatPodrizeny?: boolean|null;
		/**PrehledyBarvy*/
		PrehledyBarvy?: boolean|null;
		/**NenacitatSeznam*/
		NenacitatSeznam?: boolean|null;
	}
	const enum GMoznostiAplikaceUkoDtoNames { RozbalitStrom = "RozbalitStrom", Denik = "Denik", DatumovyRozsah = "DatumovyRozsah", UpozNaTermSpl = "UpozNaTermSpl", ZvyrazneniTlacitek = "ZvyrazneniTlacitek", ZobrazeniPuvodniFunkce = "ZobrazeniPuvodniFunkce", TiskKontrTerm = "TiskKontrTerm", TiskSpoluprac = "TiskSpoluprac", TiskJenOznacene = "TiskJenOznacene", DotazKopiePrilohy = "DotazKopiePrilohy", KopiePrilohy = "KopiePrilohy", PridelenyZobrazovatNadrizeny = "PridelenyZobrazovatNadrizeny", PridelenyZobrazovatPodrizeny = "PridelenyZobrazovatPodrizeny", PrevzateZobrazovatNadrizeny = "PrevzateZobrazovatNadrizeny", PrevzateZobrazovatPodrizeny = "PrevzateZobrazovatPodrizeny", PrehledyBarvy = "PrehledyBarvy", NenacitatSeznam = "NenacitatSeznam",}
	const enum GMoznostiAplikaceUkoDtoFragments { RozbalitStrom = "*", Denik = "*", DatumovyRozsah = "*", UpozNaTermSpl = "*", ZvyrazneniTlacitek = "*", ZobrazeniPuvodniFunkce = "*", TiskKontrTerm = "*", TiskSpoluprac = "*", TiskJenOznacene = "*", DotazKopiePrilohy = "*", KopiePrilohy = "*", PridelenyZobrazovatNadrizeny = "*", PridelenyZobrazovatPodrizeny = "*", PrevzateZobrazovatNadrizeny = "*", PrevzateZobrazovatPodrizeny = "*", PrehledyBarvy = "*", NenacitatSeznam = "*",}
	const enum GMoznostiAplikaceUkoDtoTypes { RozbalitStrom = "boolean", Denik = "string", DatumovyRozsah = "number", UpozNaTermSpl = "number", ZvyrazneniTlacitek = "boolean", ZobrazeniPuvodniFunkce = "boolean", TiskKontrTerm = "boolean", TiskSpoluprac = "boolean", TiskJenOznacene = "boolean", DotazKopiePrilohy = "boolean", KopiePrilohy = "boolean", PridelenyZobrazovatNadrizeny = "boolean", PridelenyZobrazovatPodrizeny = "boolean", PrevzateZobrazovatNadrizeny = "boolean", PrevzateZobrazovatPodrizeny = "boolean", PrehledyBarvy = "boolean", NenacitatSeznam = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GSeznamGenezeTreeDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**GSeznamGenezeTreeDto*/
	interface GSeznamGenezeTreeDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		cj_uko?: string|null;
		/**Autogenerated.*/
		text?: string|null;
		/**Autogenerated.*/
		ixp_src?: string|null;
		/**Autogenerated.*/
		stav_uko?: number|null;
		/**Autogenerated.*/
		priznak_pristupu?: string|null;
	}
	const enum GSeznamGenezeTreeDtoNames { ixp_uko = "ixp_uko", cj_uko = "cj_uko", text = "text", ixp_src = "ixp_src", stav_uko = "stav_uko", priznak_pristupu = "priznak_pristupu", Permissions = "Permissions",}
	const enum GSeznamGenezeTreeDtoFragments { ixp_uko = "*", cj_uko = "*", text = "*", ixp_src = "*", stav_uko = "*", priznak_pristupu = "*", Permissions = "*",}
	const enum GSeznamGenezeTreeDtoTypes { ixp_uko = "string", cj_uko = "string", text = "string", ixp_src = "string", stav_uko = "number", priznak_pristupu = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GSeznamKontrTermDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**GSeznamKontrTermDto*/
	interface GSeznamKontrTermDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		dat_kontr?: JsonDate|null;
		/**Autogenerated.*/
		dat_spln_kontr?: JsonDate|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		priz_spln_kontr?: number|null;
		/**Autogenerated.*/
		hodn_uko?: number|null;
		/**Autogenerated.*/
		hodn_uko_txt?: string|null;
		/**Autogenerated.*/
		plneni_uko?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
	}
	const enum GSeznamKontrTermDtoNames { ixp_uko = "ixp_uko", por_cislo = "por_cislo", dat_kontr = "dat_kontr", dat_spln_kontr = "dat_spln_kontr", poznamka = "poznamka", priz_spln_kontr = "priz_spln_kontr", hodn_uko = "hodn_uko", hodn_uko_txt = "hodn_uko_txt", plneni_uko = "plneni_uko", aktivita = "aktivita", Permissions = "Permissions",}
	const enum GSeznamKontrTermDtoFragments { ixp_uko = "*", por_cislo = "*", dat_kontr = "*", dat_spln_kontr = "*", poznamka = "*", priz_spln_kontr = "*", hodn_uko = "*", hodn_uko_txt = "*", plneni_uko = "*", aktivita = "*", Permissions = "*",}
	const enum GSeznamKontrTermDtoTypes { ixp_uko = "string", por_cislo = "number", dat_kontr = "JsonDate", dat_spln_kontr = "JsonDate", poznamka = "string", priz_spln_kontr = "number", hodn_uko = "number", hodn_uko_txt = "string", plneni_uko = "number", aktivita = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSeznamKontrTermDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GSeznamSodUkoDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**DBTABLE:SeznamSODUko*/
	interface SeznamSODUkoDto {
		/**DBCOLUMN:SeznamSODUko.StavSod*/
		StavSod?: number|null;
		/**DBCOLUMN:SeznamSODUko.StavPrecteno*/
		StavPrecteno?: number|null;
		/**DBCOLUMN:SeznamSODUko.aktivita_look*/
		aktivita_look?: string|null;
		/**DBCOLUMN:SeznamSODUko.dat_vytvor*/
		dat_vytvor?: JsonDate|null;
		/**DBCOLUMN:SeznamSODUko.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamSODUko.precteno*/
		precteno?: number|null;
		/**DBCOLUMN:SeznamSODUko.ixp_uko*/
		ixp_uko?: string|null;
		/**DBCOLUMN:SeznamSODUko.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamSODUko.s_tisk*/
		s_tisk?: number|null;
		/**DBCOLUMN:SeznamSODUko.ixp_src*/
		ixp_src?: string|null;
		/**DBCOLUMN:SeznamSODUko.ixs_fun_zad*/
		ixs_fun_zad?: string|null;
		/**DBCOLUMN:SeznamSODUko.ixs_fun_nos*/
		ixs_fun_nos?: string|null;
	}
	const enum SeznamSODUkoDtoNames { StavSod = "StavSod", StavPrecteno = "StavPrecteno", aktivita_look = "aktivita_look", dat_vytvor = "dat_vytvor", nazev = "nazev", precteno = "precteno", ixp_uko = "ixp_uko", aktivita = "aktivita", s_tisk = "s_tisk", ixp_src = "ixp_src", ixs_fun_zad = "ixs_fun_zad", ixs_fun_nos = "ixs_fun_nos",}
	const enum SeznamSODUkoDtoFragments { StavSod = "*", StavPrecteno = "*", aktivita_look = "*", dat_vytvor = "*", nazev = "*", precteno = "*", ixp_uko = "*", aktivita = "*", s_tisk = "*", ixp_src = "*", ixs_fun_zad = "*", ixs_fun_nos = "*",}
	const enum SeznamSODUkoDtoTypes { StavSod = "number", StavPrecteno = "number", aktivita_look = "string", dat_vytvor = "JsonDate", nazev = "string", precteno = "number", ixp_uko = "string", aktivita = "number", s_tisk = "number", ixp_src = "string", ixs_fun_zad = "string", ixs_fun_nos = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GUkodpidDto.d.ts 

declare namespace Gordic.Uko.Interface {
    /**Dto pro obsah ukolu*/
	interface GUkodpidDto {
        /**Autogenerated.*/
		ixp_uko?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		obsah_text?: string|null;
        /**Autogenerated.*/
		aktivita?: number|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		zmenu_prov?: string|null;
        /**Autogenerated.*/
		obsah_fullText?: string|null;
	}
	const enum GUkodpidDtoNames { ixp_uko = "ixp_uko", por_cislo = "por_cislo", obsah_text = "obsah_text", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", obsah_fullText = "obsah_fullText",}
	const enum GUkodpidDtoFragments { ixp_uko = "*", por_cislo = "*", obsah_text = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", obsah_fullText = "*",}
	const enum GUkodpidDtoTypes { ixp_uko = "string", por_cislo = "number", obsah_text = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", obsah_fullText = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GUkolyKontrolniObdobiDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**DBTABLE:ukospid
	*      Profil úkolových dokumentů
	*/
	interface GUkolyKontrolniObdobiDto {
		/**Identifikátor úkolu*/
		ixp_uko?: string|null;
		/**Identifikátor typu úkolu*/
		ixs_typ?: string|null;
		/**Kategorie typu dokumentu*/
		ktg_typ?: number|null;
		/**Název úkolu dokumentu*/
		nazev?: string|null;
		/**Identifikátor zadavatele*/
		ixs_fun_zad?: string|null;
		/**Identifikátor nositele*/
		ixs_fun_nos?: string|null;
		cj_num?: number|null;
		/**Rok*/
		rok?: number|null;
		cj_uko_gen?: string|null;
		cj_uko?: string|null;
		/**Identifikátor typu zdroje*/
		ixs_typ_src?: string|null;
		/**Identifikátor zdroje*/
		ixp_src?: string|null;
		/**Číslo jednací zdroje*/
		cj_uko_src?: string|null;
		/**Datum ze dne zdroje*/
		dat_ze_dne_src?: JsonDate|null;
		/**Místo vzniku*/
		misto_vzniku?: string|null;
		/**Stav úkolu*/
		stav_uko?: number|null;
		/**Datum přidělení*/
		dat_prid?: JsonDate|null;
		/**Datum převzetí*/
		dat_prevz?: JsonDate|null;
		/**Datum vyřízení*/
		dat_vyriz?: JsonDate|null;
		/**Datum termínu*/
		dat_termin?: JsonDate|null;
		/**Datum vytvoření*/
		dat_vytvor?: JsonDate|null;
		s_sod?: number|null;
		/**Příznak přečtení*/
		precteno?: number|null;
		priz_ele?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		ixs_fun_akt?: string|null;
		s_tisk?: number|null;
		/**Identifikátor poslední změny nositel*/
		ixs_zmp_nos?: string|null;
		/**Identifikátor poslední změny zadavatel*/
		ixs_zmp_zad?: string|null;
		dat_navrh?: JsonDate|null;
		s_hodn?: number|null;
		hodn_ukov?: number|null;
		plneni_uko?: number|null;
		pracnost_proc?: JsonDecimal|null;
		pracnost_hod?: JsonDecimal|null;
		dat_kspln?: JsonDate|null;
		pracnost_plan?: JsonDecimal|null;
		pracnost_skut?: JsonDecimal|null;
		mer_prac?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Příznak tiché procedury*/
		s_ticha_proc?: number|null;
		ixs_fun_nav?: string|null;
		ixs_zmp_nav?: string|null;
		ixs_rio?: string|null;
		/**Deník úkolu*/
		ukoden?: string|null;
		nazev_rf_nos_zmp?: string|null;
		nazev_rf_zad_zmp?: string|null;
		nazev_rf_nos?: string|null;
		nazev_rf_zad?: string|null;
		stav_uko_txt?: string|null;
		ukosrio_stupen?: number|null;
		ukosrio_nazev?: string|null;
		priznak_pristupu?: string|null;
	}
	const enum GUkolyKontrolniObdobiDtoNames { ixp_uko = "ixp_uko", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", nazev = "nazev", ixs_fun_zad = "ixs_fun_zad", ixs_fun_nos = "ixs_fun_nos", cj_num = "cj_num", rok = "rok", cj_uko_gen = "cj_uko_gen", cj_uko = "cj_uko", ixs_typ_src = "ixs_typ_src", ixp_src = "ixp_src", cj_uko_src = "cj_uko_src", dat_ze_dne_src = "dat_ze_dne_src", misto_vzniku = "misto_vzniku", stav_uko = "stav_uko", dat_prid = "dat_prid", dat_prevz = "dat_prevz", dat_vyriz = "dat_vyriz", dat_termin = "dat_termin", dat_vytvor = "dat_vytvor", s_sod = "s_sod", precteno = "precteno", priz_ele = "priz_ele", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun_akt = "ixs_fun_akt", s_tisk = "s_tisk", ixs_zmp_nos = "ixs_zmp_nos", ixs_zmp_zad = "ixs_zmp_zad", dat_navrh = "dat_navrh", s_hodn = "s_hodn", hodn_ukov = "hodn_ukov", plneni_uko = "plneni_uko", pracnost_proc = "pracnost_proc", pracnost_hod = "pracnost_hod", dat_kspln = "dat_kspln", pracnost_plan = "pracnost_plan", pracnost_skut = "pracnost_skut", mer_prac = "mer_prac", poznamka = "poznamka", ico = "ico", s_ticha_proc = "s_ticha_proc", ixs_fun_nav = "ixs_fun_nav", ixs_zmp_nav = "ixs_zmp_nav", ixs_rio = "ixs_rio", ukoden = "ukoden", nazev_rf_nos_zmp = "nazev_rf_nos_zmp", nazev_rf_zad_zmp = "nazev_rf_zad_zmp", nazev_rf_nos = "nazev_rf_nos", nazev_rf_zad = "nazev_rf_zad", stav_uko_txt = "stav_uko_txt", ukosrio_stupen = "ukosrio_stupen", ukosrio_nazev = "ukosrio_nazev", priznak_pristupu = "priznak_pristupu",}
	const enum GUkolyKontrolniObdobiDtoFragments { ixp_uko = "*", ixs_typ = "*", ktg_typ = "*", nazev = "*", ixs_fun_zad = "*", ixs_fun_nos = "*", cj_num = "*", rok = "*", cj_uko_gen = "*", cj_uko = "*", ixs_typ_src = "*", ixp_src = "*", cj_uko_src = "*", dat_ze_dne_src = "*", misto_vzniku = "*", stav_uko = "*", dat_prid = "*", dat_prevz = "*", dat_vyriz = "*", dat_termin = "*", dat_vytvor = "*", s_sod = "*", precteno = "*", priz_ele = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun_akt = "*", s_tisk = "*", ixs_zmp_nos = "*", ixs_zmp_zad = "*", dat_navrh = "*", s_hodn = "*", hodn_ukov = "*", plneni_uko = "*", pracnost_proc = "*", pracnost_hod = "*", dat_kspln = "*", pracnost_plan = "*", pracnost_skut = "*", mer_prac = "*", poznamka = "*", ico = "*", s_ticha_proc = "*", ixs_fun_nav = "*", ixs_zmp_nav = "*", ixs_rio = "*", ukoden = "*", nazev_rf_nos_zmp = "*", nazev_rf_zad_zmp = "*", nazev_rf_nos = "*", nazev_rf_zad = "*", stav_uko_txt = "*", ukosrio_stupen = "*", ukosrio_nazev = "*", priznak_pristupu = "*",}
	const enum GUkolyKontrolniObdobiDtoTypes { ixp_uko = "string", ixs_typ = "string", ktg_typ = "number", nazev = "string", ixs_fun_zad = "string", ixs_fun_nos = "string", cj_num = "number", rok = "number", cj_uko_gen = "string", cj_uko = "string", ixs_typ_src = "string", ixp_src = "string", cj_uko_src = "string", dat_ze_dne_src = "JsonDate", misto_vzniku = "string", stav_uko = "number", dat_prid = "JsonDate", dat_prevz = "JsonDate", dat_vyriz = "JsonDate", dat_termin = "JsonDate", dat_vytvor = "JsonDate", s_sod = "number", precteno = "number", priz_ele = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun_akt = "string", s_tisk = "number", ixs_zmp_nos = "string", ixs_zmp_zad = "string", dat_navrh = "JsonDate", s_hodn = "number", hodn_ukov = "number", plneni_uko = "number", pracnost_proc = "JsonDecimal", pracnost_hod = "JsonDecimal", dat_kspln = "JsonDate", pracnost_plan = "JsonDecimal", pracnost_skut = "JsonDecimal", mer_prac = "number", poznamka = "string", ico = "string", s_ticha_proc = "number", ixs_fun_nav = "string", ixs_zmp_nav = "string", ixs_rio = "string", ukoden = "string", nazev_rf_nos_zmp = "string", nazev_rf_zad_zmp = "string", nazev_rf_nos = "string", nazev_rf_zad = "string", stav_uko_txt = "string", ukosrio_stupen = "number", ukosrio_nazev = "string", priznak_pristupu = "string",}
	const enum GUkolyKontrolniObdobiDtoTypeLengths { ixp_uko = 12, ixs_typ = 12, nazev = 254, ixs_fun_zad = 12, ixs_fun_nos = 12, cj_uko_gen = 20, cj_uko = 30, ixs_typ_src = 12, ixp_src = 12, cj_uko_src = 254, misto_vzniku = 50, zmenu_prov = 12, ixs_fun_akt = 12, ixs_zmp_nos = 12, ixs_zmp_zad = 12, poznamka = 254, ico = 10, ixs_fun_nav = 12, ixs_zmp_nav = 12, ixs_rio = 12, ukoden = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GUkolyKPrevzetiDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Dto pro ukoly k prevzeti*/
	interface GUkolyKPrevzetiDto {
		/**Autogenerated.*/
		dat_vytvor_txt?: string|null;
		/**Autogenerated.*/
		dat_prid_txt?: string|null;
		/**Autogenerated.*/
		dat_termin_txt?: string|null;
		/**Autogenerated.*/
		priznak_pristupu?: string|null;
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		cj_uko?: string|null;
		/**Autogenerated.*/
		cj_num?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		dat_vytvor?: JsonDate|null;
		/**Autogenerated.*/
		dat_prid?: JsonDate|null;
		/**Autogenerated.*/
		dat_termin?: JsonDate|null;
		/**Autogenerated.*/
		cj_uko_gen?: string|null;
		/**Autogenerated.*/
		nazev_rf_zad?: string|null;
		/**Autogenerated.*/
		nazev_rf_zad_zmp?: string|null;
		/**Autogenerated.*/
		ktg_typ?: number|null;
		/**Autogenerated.*/
		s_ticha_proc?: number|null;
		/**Priorita úkolu - název*/
		ukosrio_nazev?: string|null;
		/**Priorita úkolu - stupen*/
		ukosrio_stupen?: number|null;
	}
	const enum GUkolyKPrevzetiDtoNames { dat_vytvor_txt = "dat_vytvor_txt", dat_prid_txt = "dat_prid_txt", dat_termin_txt = "dat_termin_txt", priznak_pristupu = "priznak_pristupu", ixp_uko = "ixp_uko", cj_uko = "cj_uko", cj_num = "cj_num", nazev = "nazev", dat_vytvor = "dat_vytvor", dat_prid = "dat_prid", dat_termin = "dat_termin", cj_uko_gen = "cj_uko_gen", nazev_rf_zad = "nazev_rf_zad", nazev_rf_zad_zmp = "nazev_rf_zad_zmp", ktg_typ = "ktg_typ", s_ticha_proc = "s_ticha_proc", ukosrio_nazev = "ukosrio_nazev", ukosrio_stupen = "ukosrio_stupen",}
	const enum GUkolyKPrevzetiDtoFragments { dat_vytvor_txt = "*", dat_prid_txt = "*", dat_termin_txt = "*", priznak_pristupu = "*", ixp_uko = "*", cj_uko = "*", cj_num = "*", nazev = "*", dat_vytvor = "*", dat_prid = "*", dat_termin = "*", cj_uko_gen = "*", nazev_rf_zad = "*", nazev_rf_zad_zmp = "*", ktg_typ = "*", s_ticha_proc = "*", ukosrio_nazev = "*", ukosrio_stupen = "*",}
	const enum GUkolyKPrevzetiDtoTypes { dat_vytvor_txt = "string", dat_prid_txt = "string", dat_termin_txt = "string", priznak_pristupu = "string", ixp_uko = "string", cj_uko = "string", cj_num = "number", nazev = "string", dat_vytvor = "JsonDate", dat_prid = "JsonDate", dat_termin = "JsonDate", cj_uko_gen = "string", nazev_rf_zad = "string", nazev_rf_zad_zmp = "string", ktg_typ = "number", s_ticha_proc = "number", ukosrio_nazev = "string", ukosrio_stupen = "number",}
	const enum GUkolyKPrevzetiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GUkolyKPrideleniDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Dto pro ukoly k prideleni*/
	interface GUkolyKPrideleniDto {
		/**Autogenerated.*/
		dat_vytvor_txt?: string|null;
		/**Autogenerated.*/
		dat_termin_txt?: string|null;
		/**Autogenerated.*/
		priznak_pristupu?: string|null;
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		cj_uko?: string|null;
		/**Autogenerated.*/
		cj_num?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		dat_vytvor?: JsonDate|null;
		/**Autogenerated.*/
		dat_termin?: JsonDate|null;
		/**Autogenerated.*/
		cj_uko_gen?: string|null;
		/**Autogenerated.*/
		nazev_rf_nos?: string|null;
		/**Autogenerated.*/
		nazev_rf_nos_zmp?: string|null;
		/**Autogenerated.*/
		ktg_typ?: number|null;
		/**Autogenerated.*/
		s_ticha_proc?: number|null;
		/**Priorita úkolu - název*/
		ukosrio_nazev?: string|null;
		/**Id zdroj. úkolu*/
		ixp_src?: string|null;
		/**Priorita úkolu - stupen*/
		ukosrio_stupen?: number|null;
	}
	const enum GUkolyKPrideleniDtoNames { dat_vytvor_txt = "dat_vytvor_txt", dat_termin_txt = "dat_termin_txt", priznak_pristupu = "priznak_pristupu", ixp_uko = "ixp_uko", cj_uko = "cj_uko", cj_num = "cj_num", nazev = "nazev", dat_vytvor = "dat_vytvor", dat_termin = "dat_termin", cj_uko_gen = "cj_uko_gen", nazev_rf_nos = "nazev_rf_nos", nazev_rf_nos_zmp = "nazev_rf_nos_zmp", ktg_typ = "ktg_typ", s_ticha_proc = "s_ticha_proc", ukosrio_nazev = "ukosrio_nazev", ixp_src = "ixp_src", ukosrio_stupen = "ukosrio_stupen",}
	const enum GUkolyKPrideleniDtoFragments { dat_vytvor_txt = "*", dat_termin_txt = "*", priznak_pristupu = "*", ixp_uko = "*", cj_uko = "*", cj_num = "*", nazev = "*", dat_vytvor = "*", dat_termin = "*", cj_uko_gen = "*", nazev_rf_nos = "*", nazev_rf_nos_zmp = "*", ktg_typ = "*", s_ticha_proc = "*", ukosrio_nazev = "*", ixp_src = "*", ukosrio_stupen = "*",}
	const enum GUkolyKPrideleniDtoTypes { dat_vytvor_txt = "string", dat_termin_txt = "string", priznak_pristupu = "string", ixp_uko = "string", cj_uko = "string", cj_num = "number", nazev = "string", dat_vytvor = "JsonDate", dat_termin = "JsonDate", cj_uko_gen = "string", nazev_rf_nos = "string", nazev_rf_nos_zmp = "string", ktg_typ = "number", s_ticha_proc = "number", ukosrio_nazev = "string", ixp_src = "string", ukosrio_stupen = "number",}
	const enum GUkolyKPrideleniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GUkolyNesplneneDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**GUkolyNesplneneDto - DTO*/
	interface GUkolyNesplneneDto {
		/**Autogenerated.*/
		Img_vyr_bitmap?: number|null;
		/**Autogenerated.*/
		Img_kvalita_bitmap?: number|null;
		/**Autogenerated.*/
		Img_uplnost_bitmap?: number|null;
		/**Autogenerated.*/
		dat_vytvor_txt?: string|null;
		/**Autogenerated.*/
		dat_termin_txt?: string|null;
		/**Autogenerated.*/
		dat_ze_dne_src_txt?: string|null;
		/**Autogenerated.*/
		vyrizeni_look?: string|null;
		/**Autogenerated.*/
		priznak_pristupu?: string|null;
		/**Autogenerated.*/
		ixp_uko?: string|null;
		/**Autogenerated.*/
		cj_uko?: string|null;
		/**Autogenerated.*/
		cj_num?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		dat_vytvor?: JsonDate|null;
		/**Autogenerated.*/
		dat_termin?: JsonDate|null;
		/**Autogenerated.*/
		rok?: number|null;
		/**Autogenerated.*/
		cj_uko_gen?: string|null;
		/**Autogenerated.*/
		nazev_rf_zad?: string|null;
		/**Autogenerated.*/
		misto_vzniku?: string|null;
		/**Autogenerated.*/
		cj_uko_src?: string|null;
		/**Autogenerated.*/
		dat_ze_dne_src?: JsonDate|null;
		/**Autogenerated.*/
		hodn_ukov?: number|null;
		/**Autogenerated.*/
		plneni_uko?: number|null;
		/**Autogenerated.*/
		zad_ixs_su?: string|null;
		/**Autogenerated.*/
		nos_ixs_su?: string|null;
		/**Autogenerated.*/
		typ_ag_src?: number|null;
		/**Autogenerated.*/
		ixs_fun_zad?: string|null;
		/**Autogenerated.*/
		ixs_fun_nos?: string|null;
		/**Autogenerated.*/
		priloha?: string|null;
		/**Autogenerated.*/
		nazev_rf_zad_zmp?: string|null;
		/**Autogenerated.*/
		ktg_typ?: number|null;
		/**Autogenerated.*/
		s_ticha_proc?: number|null;
		/**Podúkol - pokud úkol obsahuje podúkol 1, jinak 0*/
		ma_podukol?: number|null;
		/**Priorita úkolu - název*/
		ukosrio_nazev?: string|null;
		/**Priorita úkolu - stupen*/
		ukosrio_stupen?: number|null;
	}
	const enum GUkolyNesplneneDtoNames { Img_vyr_bitmap = "Img_vyr_bitmap", Img_kvalita_bitmap = "Img_kvalita_bitmap", Img_uplnost_bitmap = "Img_uplnost_bitmap", dat_vytvor_txt = "dat_vytvor_txt", dat_termin_txt = "dat_termin_txt", dat_ze_dne_src_txt = "dat_ze_dne_src_txt", vyrizeni_look = "vyrizeni_look", priznak_pristupu = "priznak_pristupu", ixp_uko = "ixp_uko", cj_uko = "cj_uko", cj_num = "cj_num", nazev = "nazev", dat_vytvor = "dat_vytvor", dat_termin = "dat_termin", rok = "rok", cj_uko_gen = "cj_uko_gen", nazev_rf_zad = "nazev_rf_zad", misto_vzniku = "misto_vzniku", cj_uko_src = "cj_uko_src", dat_ze_dne_src = "dat_ze_dne_src", hodn_ukov = "hodn_ukov", plneni_uko = "plneni_uko", zad_ixs_su = "zad_ixs_su", nos_ixs_su = "nos_ixs_su", typ_ag_src = "typ_ag_src", ixs_fun_zad = "ixs_fun_zad", ixs_fun_nos = "ixs_fun_nos", priloha = "priloha", nazev_rf_zad_zmp = "nazev_rf_zad_zmp", ktg_typ = "ktg_typ", s_ticha_proc = "s_ticha_proc", ma_podukol = "ma_podukol", ukosrio_nazev = "ukosrio_nazev", ukosrio_stupen = "ukosrio_stupen",}
	const enum GUkolyNesplneneDtoFragments { Img_vyr_bitmap = "*", Img_kvalita_bitmap = "*", Img_uplnost_bitmap = "*", dat_vytvor_txt = "*", dat_termin_txt = "*", dat_ze_dne_src_txt = "*", vyrizeni_look = "*", priznak_pristupu = "*", ixp_uko = "*", cj_uko = "*", cj_num = "*", nazev = "*", dat_vytvor = "*", dat_termin = "*", rok = "*", cj_uko_gen = "*", nazev_rf_zad = "*", misto_vzniku = "*", cj_uko_src = "*", dat_ze_dne_src = "*", hodn_ukov = "*", plneni_uko = "*", zad_ixs_su = "*", nos_ixs_su = "*", typ_ag_src = "*", ixs_fun_zad = "*", ixs_fun_nos = "*", priloha = "*", nazev_rf_zad_zmp = "*", ktg_typ = "*", s_ticha_proc = "*", ma_podukol = "*", ukosrio_nazev = "*", ukosrio_stupen = "*",}
	const enum GUkolyNesplneneDtoTypes { Img_vyr_bitmap = "number", Img_kvalita_bitmap = "number", Img_uplnost_bitmap = "number", dat_vytvor_txt = "string", dat_termin_txt = "string", dat_ze_dne_src_txt = "string", vyrizeni_look = "string", priznak_pristupu = "string", ixp_uko = "string", cj_uko = "string", cj_num = "number", nazev = "string", dat_vytvor = "JsonDate", dat_termin = "JsonDate", rok = "number", cj_uko_gen = "string", nazev_rf_zad = "string", misto_vzniku = "string", cj_uko_src = "string", dat_ze_dne_src = "JsonDate", hodn_ukov = "number", plneni_uko = "number", zad_ixs_su = "string", nos_ixs_su = "string", typ_ag_src = "number", ixs_fun_zad = "string", ixs_fun_nos = "string", priloha = "string", nazev_rf_zad_zmp = "string", ktg_typ = "number", s_ticha_proc = "number", ma_podukol = "number", ukosrio_nazev = "string", ukosrio_stupen = "number",}
	const enum GUkolyNesplneneDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\GUkosrioDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Priorita*/
	interface GUkosrioDto {
		/**Identifikátor priority*/
		ixs_rio?: string|null;
		/**Stupeń*/
		stupen?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Změnu provedl*/
		zmenu_prov?: string|null;
	}
	const enum GUkosrioDtoNames { ixs_rio = "ixs_rio", stupen = "stupen", nazev = "nazev", zkratka = "zkratka", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUkosrioDtoFragments { ixs_rio = "*", stupen = "*", nazev = "*", zkratka = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUkosrioDtoTypes { ixs_rio = "string", stupen = "number", nazev = "string", zkratka = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GUkosrioDtoTypeLengths { ixs_rio = 12, nazev = 254, zkratka = 50, popis = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GDateIntervalFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro datumový interval*/
	interface GDateIntervalFilterDto {
		/**Datum od*/
		datumOd?: JsonDate|null;
		/**Datum do*/
		datumDo?: JsonDate|null;
		/**Podle filtru určuje pro jaké datum bude hodnota použita*/
		typDatumu?: number|null;
	}
	const enum GDateIntervalFilterDtoNames { datumOd = "datumOd", datumDo = "datumDo", typDatumu = "typDatumu",}
	const enum GDateIntervalFilterDtoFragments { datumOd = "*", datumDo = "*", typDatumu = "*",}
	const enum GDateIntervalFilterDtoTypes { datumOd = "JsonDate", datumDo = "JsonDate", typDatumu = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GHledaniFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro hledání úkolů*/
	interface GRychleHledaniFilterDto {
		/**Identifikátor úkolu*/
		ixp_uko?: string|null;
		/**Označení deníku*/
		denik?: string|null;
		/**Číslo úkolu*/
		cj_num?: number|null;
		/**Geneze úkolu*/
		cj_uko_gen?: string|null;
		/**Rok vzniku úkolu*/
		rok?: number|null;
	}
	const enum GRychleHledaniFilterDtoNames { ixp_uko = "ixp_uko", denik = "denik", cj_num = "cj_num", cj_uko_gen = "cj_uko_gen", rok = "rok",}
	const enum GRychleHledaniFilterDtoFragments { ixp_uko = "*", denik = "*", cj_num = "*", cj_uko_gen = "*", rok = "*",}
	const enum GRychleHledaniFilterDtoTypes { ixp_uko = "string", denik = "string", cj_num = "number", cj_uko_gen = "string", rok = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GObecneHledaniFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Podrobný filtr pro hledání úkolů*/
	interface GObecneHledaniFilterDto {
		/**Identifikátor úkolu*/
		ixp_uko?: string|null;
		nazev_sestavy?: string|null;
		cj_uko?: string|null;
		cj_uko_obsahuje?: number|null;
		stav_uko?: number|null;
		stav_uko_vytvoren?: boolean|null;
		stav_uko_pridelen?: boolean|null;
		stav_uko_prevzat?: boolean|null;
		stav_uko_splnen?: boolean|null;
		stav_uko_stornovan?: boolean|null;
		stav_uko_pozastaven?: boolean|null;
		nazev?: string|null;
		nazev_obsahuje?: number|null;
		profil?: string|null;
		fun_zad?: string|null;
		fun_nos?: string|null;
		fun_spol?: string|null;
		fun_inf?: string|null;
		su_zad?: string|null;
		su_nos?: string|null;
		su_spol?: string|null;
		su_inf?: string|null;
		orj_zad?: string|null;
		orj_nos?: string|null;
		orj_spol?: string|null;
		orj_inf?: string|null;
		dat_vytvor_for?: JsonDate|null;
		dat_vytvor_to?: JsonDate|null;
		ter_spln_for?: JsonDate|null;
		ter_spln_to?: JsonDate|null;
		dat_spln_for?: JsonDate|null;
		dat_spln_to?: JsonDate|null;
		kont_term_for?: JsonDate|null;
		kont_term_to?: JsonDate|null;
		ixp_src?: string|null;
		typ_pis?: string|null;
		typ_pis_txt?: string|null;
		cis_zdroje?: string|null;
		cis_zdroje_obsahuje?: number|null;
		misto_vzniku?: string|null;
		misto_vzniku_obsahuje?: number|null;
		datum_vzniku_for?: JsonDate|null;
		datum_vzniku_to?: JsonDate|null;
		fun_zad_txt?: string|null;
		fun_nos_txt?: string|null;
		ixp_uko_souvisejici?: string|null;
		/**Nositel úkolu*/
		nositel?: Gordic.Uko.Interface.GSubjektFilterDto|null;
	}
	const enum GObecneHledaniFilterDtoNames { ixp_uko = "ixp_uko", nazev_sestavy = "nazev_sestavy", cj_uko = "cj_uko", cj_uko_obsahuje = "cj_uko_obsahuje", stav_uko = "stav_uko", stav_uko_vytvoren = "stav_uko_vytvoren", stav_uko_pridelen = "stav_uko_pridelen", stav_uko_prevzat = "stav_uko_prevzat", stav_uko_splnen = "stav_uko_splnen", stav_uko_stornovan = "stav_uko_stornovan", stav_uko_pozastaven = "stav_uko_pozastaven", nazev = "nazev", nazev_obsahuje = "nazev_obsahuje", profil = "profil", fun_zad = "fun_zad", fun_nos = "fun_nos", fun_spol = "fun_spol", fun_inf = "fun_inf", su_zad = "su_zad", su_nos = "su_nos", su_spol = "su_spol", su_inf = "su_inf", orj_zad = "orj_zad", orj_nos = "orj_nos", orj_spol = "orj_spol", orj_inf = "orj_inf", dat_vytvor_for = "dat_vytvor_for", dat_vytvor_to = "dat_vytvor_to", ter_spln_for = "ter_spln_for", ter_spln_to = "ter_spln_to", dat_spln_for = "dat_spln_for", dat_spln_to = "dat_spln_to", kont_term_for = "kont_term_for", kont_term_to = "kont_term_to", ixp_src = "ixp_src", typ_pis = "typ_pis", typ_pis_txt = "typ_pis_txt", cis_zdroje = "cis_zdroje", cis_zdroje_obsahuje = "cis_zdroje_obsahuje", misto_vzniku = "misto_vzniku", misto_vzniku_obsahuje = "misto_vzniku_obsahuje", datum_vzniku_for = "datum_vzniku_for", datum_vzniku_to = "datum_vzniku_to", fun_zad_txt = "fun_zad_txt", fun_nos_txt = "fun_nos_txt", ixp_uko_souvisejici = "ixp_uko_souvisejici", nositel = "nositel",}
	const enum GObecneHledaniFilterDtoFragments { ixp_uko = "*", nazev_sestavy = "*", cj_uko = "*", cj_uko_obsahuje = "*", stav_uko = "*", stav_uko_vytvoren = "*", stav_uko_pridelen = "*", stav_uko_prevzat = "*", stav_uko_splnen = "*", stav_uko_stornovan = "*", stav_uko_pozastaven = "*", nazev = "*", nazev_obsahuje = "*", profil = "*", fun_zad = "*", fun_nos = "*", fun_spol = "*", fun_inf = "*", su_zad = "*", su_nos = "*", su_spol = "*", su_inf = "*", orj_zad = "*", orj_nos = "*", orj_spol = "*", orj_inf = "*", dat_vytvor_for = "*", dat_vytvor_to = "*", ter_spln_for = "*", ter_spln_to = "*", dat_spln_for = "*", dat_spln_to = "*", kont_term_for = "*", kont_term_to = "*", ixp_src = "*", typ_pis = "*", typ_pis_txt = "*", cis_zdroje = "*", cis_zdroje_obsahuje = "*", misto_vzniku = "*", misto_vzniku_obsahuje = "*", datum_vzniku_for = "*", datum_vzniku_to = "*", fun_zad_txt = "*", fun_nos_txt = "*", ixp_uko_souvisejici = "*", nositel = "*",}
	const enum GObecneHledaniFilterDtoTypes { ixp_uko = "string", nazev_sestavy = "string", cj_uko = "string", cj_uko_obsahuje = "number", stav_uko = "number", stav_uko_vytvoren = "boolean", stav_uko_pridelen = "boolean", stav_uko_prevzat = "boolean", stav_uko_splnen = "boolean", stav_uko_stornovan = "boolean", stav_uko_pozastaven = "boolean", nazev = "string", nazev_obsahuje = "number", profil = "string", fun_zad = "string", fun_nos = "string", fun_spol = "string", fun_inf = "string", su_zad = "string", su_nos = "string", su_spol = "string", su_inf = "string", orj_zad = "string", orj_nos = "string", orj_spol = "string", orj_inf = "string", dat_vytvor_for = "JsonDate", dat_vytvor_to = "JsonDate", ter_spln_for = "JsonDate", ter_spln_to = "JsonDate", dat_spln_for = "JsonDate", dat_spln_to = "JsonDate", kont_term_for = "JsonDate", kont_term_to = "JsonDate", ixp_src = "string", typ_pis = "string", typ_pis_txt = "string", cis_zdroje = "string", cis_zdroje_obsahuje = "number", misto_vzniku = "string", misto_vzniku_obsahuje = "number", datum_vzniku_for = "JsonDate", datum_vzniku_to = "JsonDate", fun_zad_txt = "string", fun_nos_txt = "string", ixp_uko_souvisejici = "string", nositel = "Gordic.Uko.Interface.GSubjektFilterDto",}
	const enum GObecneHledaniFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GSeznamDokOdvozeneFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro seznamy odvozených dokumentů*/
	interface GSeznamDokOdvozeneFilterDto extends Gordic.Uko.Interface.GDateIntervalFilterDto {
		/**Stav dokumentu - přečtené*/
		stavPrectene?: boolean|null;
		/**Stav dokumentu - nepřečtené*/
		stavNeprectene?: boolean|null;
		/**Typ hlášení - avíza*/
		typHlAviza?: boolean|null;
		/**Typ hlášení - sdělení*/
		typHlSdeleni?: boolean|null;
		/**Typ hlášení - splnění*/
		typHlSplneni?: boolean|null;
		/**Typ hlášení - urgence*/
		typHlUrgence?: boolean|null;
		/**Typ hlášení - převzetí*/
		typHlPrevzeti?: boolean|null;
		/**Typ hlášení - odmítnutí*/
		typHlOdmitnuti?: boolean|null;
	}
	const enum GSeznamDokOdvozeneFilterDtoNames { stavPrectene = "stavPrectene", stavNeprectene = "stavNeprectene", typHlAviza = "typHlAviza", typHlSdeleni = "typHlSdeleni", typHlSplneni = "typHlSplneni", typHlUrgence = "typHlUrgence", typHlPrevzeti = "typHlPrevzeti", typHlOdmitnuti = "typHlOdmitnuti", datumOd = "datumOd", datumDo = "datumDo", typDatumu = "typDatumu",}
	const enum GSeznamDokOdvozeneFilterDtoFragments { stavPrectene = "*", stavNeprectene = "*", typHlAviza = "*", typHlSdeleni = "*", typHlSplneni = "*", typHlUrgence = "*", typHlPrevzeti = "*", typHlOdmitnuti = "*", datumOd = "*", datumDo = "*", typDatumu = "*",}
	const enum GSeznamDokOdvozeneFilterDtoTypes { stavPrectene = "boolean", stavNeprectene = "boolean", typHlAviza = "boolean", typHlSdeleni = "boolean", typHlSplneni = "boolean", typHlUrgence = "boolean", typHlPrevzeti = "boolean", typHlOdmitnuti = "boolean", datumOd = "JsonDate", datumDo = "JsonDate", typDatumu = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GSeznamNesplneneFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro seznamy nesplněných úkolů*/
	interface GSeznamNesplneneFilterDto extends Gordic.Uko.Interface.GDateIntervalFilterDto {
		/**Typ hlášení splnění*/
		typHlaseni?: number|null;
		/**Přiřzen k úkolu jako osoba spolupracující*/
		spol?: boolean|null;
		/**Přiřzen k úkolu jako osoba informovaná*/
		info?: boolean|null;
	}
	const enum GSeznamNesplneneFilterDtoNames { typHlaseni = "typHlaseni", spol = "spol", info = "info", datumOd = "datumOd", datumDo = "datumDo", typDatumu = "typDatumu",}
	const enum GSeznamNesplneneFilterDtoFragments { typHlaseni = "*", spol = "*", info = "*", datumOd = "*", datumDo = "*", typDatumu = "*",}
	const enum GSeznamNesplneneFilterDtoTypes { typHlaseni = "number", spol = "boolean", info = "boolean", datumOd = "JsonDate", datumDo = "JsonDate", typDatumu = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GSeznamPrehledyFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro seznamy přehledů úkolů*/
	interface GSeznamPrehledyFilterDto extends Gordic.Uko.Interface.GDateIntervalFilterDto {
		/**Identifikátor funkčního místa*/
		IxsFun?: string|null;
		/**Stav úkolu - přidělen*/
		stavUkoPridelen?: boolean|null;
		/**Stav úkolu - splněn*/
		stavUkoSplnen?: boolean|null;
		/**Stav úkolu - převzat*/
		stavUkoPrevzat?: boolean|null;
		/**Stav úkolu - pozastaven*/
		stavUkoPozastaven?: boolean|null;
		/**Stav spolupráce - spolupracující osoba*/
		splupracujici?: boolean|null;
		/**Stav spolupráce - informovaná osoba*/
		informovana?: boolean|null;
	}
	const enum GSeznamPrehledyFilterDtoNames { IxsFun = "IxsFun", stavUkoPridelen = "stavUkoPridelen", stavUkoSplnen = "stavUkoSplnen", stavUkoPrevzat = "stavUkoPrevzat", stavUkoPozastaven = "stavUkoPozastaven", splupracujici = "splupracujici", informovana = "informovana", datumOd = "datumOd", datumDo = "datumDo", typDatumu = "typDatumu",}
	const enum GSeznamPrehledyFilterDtoFragments { IxsFun = "*", stavUkoPridelen = "*", stavUkoSplnen = "*", stavUkoPrevzat = "*", stavUkoPozastaven = "*", splupracujici = "*", informovana = "*", datumOd = "*", datumDo = "*", typDatumu = "*",}
	const enum GSeznamPrehledyFilterDtoTypes { IxsFun = "string", stavUkoPridelen = "boolean", stavUkoSplnen = "boolean", stavUkoPrevzat = "boolean", stavUkoPozastaven = "boolean", splupracujici = "boolean", informovana = "boolean", datumOd = "JsonDate", datumDo = "JsonDate", typDatumu = "number",}
	const enum GSeznamPrehledyFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GSeznamTerminyFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro seznamy přehledů termínů*/
	interface GSeznamTerminyFilterDto extends Gordic.Uko.Interface.GDateIntervalFilterDto {
		/**Identifikátor funkčního místa*/
		ixsFun?: string|null;
		/**Identifikátor funkčního místa nositele úkolu*/
		IxsFunNos?: string|null;
		/**Stav termínu - trvající*/
		stavTerTrvajci?: boolean|null;
		/**Stav termínu - splněn*/
		stavTerSplnen?: boolean|null;
		/**Stav termínu - nesplněn*/
		stavTerNesplnen?: boolean|null;
	}
	const enum GSeznamTerminyFilterDtoNames { ixsFun = "ixsFun", IxsFunNos = "IxsFunNos", stavTerTrvajci = "stavTerTrvajci", stavTerSplnen = "stavTerSplnen", stavTerNesplnen = "stavTerNesplnen", datumOd = "datumOd", datumDo = "datumDo", typDatumu = "typDatumu",}
	const enum GSeznamTerminyFilterDtoFragments { ixsFun = "*", IxsFunNos = "*", stavTerTrvajci = "*", stavTerSplnen = "*", stavTerNesplnen = "*", datumOd = "*", datumDo = "*", typDatumu = "*",}
	const enum GSeznamTerminyFilterDtoTypes { ixsFun = "string", IxsFunNos = "string", stavTerTrvajci = "boolean", stavTerSplnen = "boolean", stavTerNesplnen = "boolean", datumOd = "JsonDate", datumDo = "JsonDate", typDatumu = "number",}
	const enum GSeznamTerminyFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GSubjektFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**DTO pro FilterSubjekt*/
	interface GSubjektFilterDto {
		/**Identifikátor subjektu*/
		Ixs?: string|null;
		/**Jméno subjektu*/
		Name?: string|null;
		/**Typ identifikátoru*/
		TypeIxs?: Gordic.Gin.Interface.IxsType|null;
		/**Typ subjektu*/
		SubjectStructOrg?: Gordic.Gin.Interface.SubjectStructOrgEnum|null;
	}
	const enum GSubjektFilterDtoNames { Ixs = "Ixs", Name = "Name", TypeIxs = "TypeIxs", SubjectStructOrg = "SubjectStructOrg",}
	const enum GSubjektFilterDtoFragments { Ixs = "*", Name = "*", TypeIxs = "*", SubjectStructOrg = "*",}
	const enum GSubjektFilterDtoTypes { Ixs = "string", Name = "string", TypeIxs = "Gordic.Gin.Interface.IxsType", SubjectStructOrg = "Gordic.Gin.Interface.SubjectStructOrgEnum",}
	const enum GSubjektFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Dto\Filters\GUkolyKontrolniObdobiFilterDto.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Filtr pro seznam úkolů za kontrolní období*/
	interface GUkolyKontrolniObdobiFilterDto {
		/**Datum kontrolního období od*/
		DatumOd?: JsonDate|null;
		/**Datum kontrolního období do*/
		DatumDo?: JsonDate|null;
		/**Identifikátor nositele úkolu*/
		IxsNos?: string|null;
	}
	const enum GUkolyKontrolniObdobiFilterDtoNames { DatumOd = "DatumOd", DatumDo = "DatumDo", IxsNos = "IxsNos",}
	const enum GUkolyKontrolniObdobiFilterDtoFragments { DatumOd = "*", DatumDo = "*", IxsNos = "*",}
	const enum GUkolyKontrolniObdobiFilterDtoTypes { DatumOd = "JsonDate", DatumDo = "JsonDate", IxsNos = "string",}
	const enum GUkolyKontrolniObdobiFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Isl\IGUkol.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část AL pro UKO - detail úkolu*/
	interface Ukol {
		/**List - načtení seznamu úkolů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uko.Interface.GDetailUkoDto>>;
		/**Read - načtení detailu úkolu*/
		read(rq?:Gordic.Uko.Interface.GDetailUkoDto|CallParams<GServiceReadRequest<Gordic.Uko.Interface.GDetailUkoDto>>): _Task<GServiceReadRequest<Gordic.Uko.Interface.GDetailUkoDto>,GServiceReadResponse<Gordic.Uko.Interface.GDetailUkoDto>>;
		/**Create - pořízení detailu úkolu*/
		create(rq?:Gordic.Uko.Interface.GDetailUkoDto|CallParams<GServiceSaveRequest<Gordic.Uko.Interface.GDetailUkoDto>>): _Task<GServiceSaveRequest<Gordic.Uko.Interface.GDetailUkoDto>,GServiceSaveResponse<Gordic.Uko.Interface.GDetailUkoDto>>;
		/**Update - oprava detailu úkolu*/
		update(rq?:Gordic.Uko.Interface.GDetailUkoDto|CallParams<GServiceSaveRequest<Gordic.Uko.Interface.GDetailUkoDto>>): _Task<GServiceSaveRequest<Gordic.Uko.Interface.GDetailUkoDto>,GServiceSaveResponse<Gordic.Uko.Interface.GDetailUkoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ukol: ServiceBase & Catalog.Ukol;
	}
	const Ukol: Client["Ukol"];
}
declare namespace Gordic.Uko.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	interface GUkolFilterDto {
		/**DBCOLUMN:ukospid.ixp_uko*/
		ixp_uko?: string|null;
		/**DBCOLUMN:ukospid.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ukospid.ixs_fun_zad*/
		ixs_fun_zad?: string|null;
		/**DBCOLUMN:ukospid.ixs_fun_nos*/
		ixs_fun_nos?: string|null;
		/**DBCOLUMN:ukospid.cj_uko*/
		cj_uko?: string|null;
	}
	const enum GUkolFilterDtoNames { ixp_uko = "ixp_uko", nazev = "nazev", ixs_fun_zad = "ixs_fun_zad", ixs_fun_nos = "ixs_fun_nos", cj_uko = "cj_uko",}
	const enum GUkolFilterDtoFragments { ixp_uko = "*", nazev = "*", ixs_fun_zad = "*", ixs_fun_nos = "*", cj_uko = "*",}
	const enum GUkolFilterDtoTypes { ixp_uko = "string", nazev = "string", ixs_fun_zad = "string", ixs_fun_nos = "string", cj_uko = "string",}
	const enum GUkolFilterDtoTypeLengths {}
	/**Výčet filtračních kritérií pro filtr*/
	const enum GUkolFilter {
		/**DBCOLUMN:ukospid.ixp_uko*/
		ixp_uko,
		/**DBCOLUMN:ukospid.nazev*/
		nazev,
		/**DBCOLUMN:ukospid.ixs_fun_zad*/
		ixs_fun_zad,
		/**DBCOLUMN:ukospid.ixs_fun_nos*/
		ixs_fun_nos,
		/**DBCOLUMN:ukospid.cj_uko*/
		cj_uko,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Permissions\GDetailKontrTermPermissions.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Oprávnění pro detail kontrolního termínu*/
	interface GDetailKontrTermPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
		/**Příznak, že lze zobrazit hodnocení*/
		CanShowHodnoceni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze hodnotit*/
		CanHodnotit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze potvrdit*/
		CanPotvrdit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDetailKontrTermPermissionsNames { CanShowHodnoceni = "CanShowHodnoceni", CanHodnotit = "CanHodnotit", CanPotvrdit = "CanPotvrdit", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GDetailKontrTermPermissionsFragments { CanShowHodnoceni = "*", CanHodnotit = "*", CanPotvrdit = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GDetailKontrTermPermissionsTypes { CanShowHodnoceni = "Gordic.General.ApplicationInterface.GPermission", CanHodnotit = "Gordic.General.ApplicationInterface.GPermission", CanPotvrdit = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uko.Interface\Permissions\GDetailUkoluPermissions.d.ts 

declare namespace Gordic.Uko.Interface {
	/**Opravneni pro Detail ukolu*/
	interface GDetailUkoluPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions {
		/**Příznak, že nelze editovat název*/
		DisabledNazev: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat stav*/
		DisabledStav: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat obsah*/
		DisabledObsah: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat termín*/
		DisabledTermin: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat zadavatel*/
		DisabledZadavatel: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze změnit termín*/
		CanZmenitTermin: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat pracnost plánovanou*/
		DisabledPracnostPlanovana: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat pracnost měřítko*/
		DisabledPracnostMeritko: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat poznámku*/
		DisabledPoznamka: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat datum vzniku*/
		DisabledDatumVzniku: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat sslstyp*/
		DisabledSslstyp: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat CjUkoSrc*/
		DisabledCjUkoSrc: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat místo vzniku*/
		DisabledMistoVzniku: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat pracnost skutečnou*/
		DisabledPracnostSkutecna: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze měnit pracnost skutečnou*/
		CanZmenitPracnostSkutecna: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat úplnost*/
		DisabledUplnost: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze změnit úplnost*/
		CanZmenitUplnost: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat nositele*/
		DisabledNositelSuFunRef: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze změnit nositele*/
		CanZmenitNositele: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit deník*/
		CanShowUkoDen: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit záložky*/
		CanShowTabs: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit záložku profil úkolu*/
		CanShowTabProfilUko: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit záložku SOD*/
		CanShowTabSOD: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit záložku Poznámky*/
		CanShowTabPoznamky: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit komponentu Poznámky SSL*/
		CanShowPoznamkySSL: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit záložku Geneze*/
		CanShowTabGeneze: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze přidat osobu do spolupracujících nebo informovaných osob*/
		CanInsertOso: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze odstranit osobu ze spolupracujících nebo informovaných osob*/
		CanDeleteOso: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze vytvořit nový SOD, stavová vlastnost*/
		CanInsertSod: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze vytvořit nový podřízený úkol, stavová vlastnost*/
		CanNovyPodr: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit Nový podr.*/
		VisibleNovyPodr: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze pracovat s termíny, stavová vlastnost*/
		CanPracovatSKontrTerminy: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze přidělit úkol*/
		CanPridelitUkol: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze odebrat (zrušit přidělení) úkol*/
		CanOdebratUkol: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze převzít úkol*/
		CanPrevzitUkol: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze předat úkol*/
		CanPredatUkol: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze vyřídit úkol bez hlášení o splnění*/
		CanVyriditUkol: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit Splnit*/
		VisibleSplnit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze splnit úkol*/
		CanSplnit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit PotvrditSplneni*/
		VisiblePotvrditSplneni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze potvrdit splnění úkolu*/
		CanPotvrditSplneni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit Pozastavit*/
		VisiblePozastavit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze pozastavit úkol*/
		CanPozastavit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit Obnovit*/
		VisibleObnovit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze obnovit úkol*/
		CanObnovit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze stornovat úkol*/
		CanStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit Odmitnout*/
		VisibleOdmitnout: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze odmítnout úkol*/
		CanOdmitnout: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že nelze editovat zatržítko tichá procedura*/
		DisabledTichaProc: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit seznam odmítnutí úkolu*/
		CanShowTabSodOdmitnuti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zadat nového nositele k odmítnutí úkolu*/
		CanOdmitnoutANavrhNovyNositel: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze zobrazit splnění úkolu dokumentem s ČJ*/
		CanShowTabSodSplneni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že je nutné zadat dokumentem s ČJ pro splnění úkolu*/
		CanVyzadovatSplneniDokumentemCJ: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, že lze nastavovat prioritu*/
		DisabledPriorita: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, zda lze zobrazit nadřízený úkol*/
		VisibleZobrazitNadrizeny: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDetailUkoluPermissionsNames { DisabledNazev = "DisabledNazev", DisabledStav = "DisabledStav", DisabledObsah = "DisabledObsah", DisabledTermin = "DisabledTermin", DisabledZadavatel = "DisabledZadavatel", CanZmenitTermin = "CanZmenitTermin", DisabledPracnostPlanovana = "DisabledPracnostPlanovana", DisabledPracnostMeritko = "DisabledPracnostMeritko", DisabledPoznamka = "DisabledPoznamka", DisabledDatumVzniku = "DisabledDatumVzniku", DisabledSslstyp = "DisabledSslstyp", DisabledCjUkoSrc = "DisabledCjUkoSrc", DisabledMistoVzniku = "DisabledMistoVzniku", DisabledPracnostSkutecna = "DisabledPracnostSkutecna", CanZmenitPracnostSkutecna = "CanZmenitPracnostSkutecna", DisabledUplnost = "DisabledUplnost", CanZmenitUplnost = "CanZmenitUplnost", DisabledNositelSuFunRef = "DisabledNositelSuFunRef", CanZmenitNositele = "CanZmenitNositele", CanShowUkoDen = "CanShowUkoDen", CanShowTabs = "CanShowTabs", CanShowTabProfilUko = "CanShowTabProfilUko", CanShowTabSOD = "CanShowTabSOD", CanShowTabPoznamky = "CanShowTabPoznamky", CanShowPoznamkySSL = "CanShowPoznamkySSL", CanShowTabGeneze = "CanShowTabGeneze", CanInsertOso = "CanInsertOso", CanDeleteOso = "CanDeleteOso", CanInsertSod = "CanInsertSod", CanNovyPodr = "CanNovyPodr", VisibleNovyPodr = "VisibleNovyPodr", CanPracovatSKontrTerminy = "CanPracovatSKontrTerminy", CanPridelitUkol = "CanPridelitUkol", CanOdebratUkol = "CanOdebratUkol", CanPrevzitUkol = "CanPrevzitUkol", CanPredatUkol = "CanPredatUkol", CanVyriditUkol = "CanVyriditUkol", VisibleSplnit = "VisibleSplnit", CanSplnit = "CanSplnit", VisiblePotvrditSplneni = "VisiblePotvrditSplneni", CanPotvrditSplneni = "CanPotvrditSplneni", VisiblePozastavit = "VisiblePozastavit", CanPozastavit = "CanPozastavit", VisibleObnovit = "VisibleObnovit", CanObnovit = "CanObnovit", CanStornovat = "CanStornovat", VisibleOdmitnout = "VisibleOdmitnout", CanOdmitnout = "CanOdmitnout", DisabledTichaProc = "DisabledTichaProc", CanShowTabSodOdmitnuti = "CanShowTabSodOdmitnuti", CanOdmitnoutANavrhNovyNositel = "CanOdmitnoutANavrhNovyNositel", CanShowTabSodSplneni = "CanShowTabSodSplneni", CanVyzadovatSplneniDokumentemCJ = "CanVyzadovatSplneniDokumentemCJ", DisabledPriorita = "DisabledPriorita", VisibleZobrazitNadrizeny = "VisibleZobrazitNadrizeny", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanDelete = "CanDelete", CanRestore = "CanRestore",}
	const enum GDetailUkoluPermissionsFragments { DisabledNazev = "*", DisabledStav = "*", DisabledObsah = "*", DisabledTermin = "*", DisabledZadavatel = "*", CanZmenitTermin = "*", DisabledPracnostPlanovana = "*", DisabledPracnostMeritko = "*", DisabledPoznamka = "*", DisabledDatumVzniku = "*", DisabledSslstyp = "*", DisabledCjUkoSrc = "*", DisabledMistoVzniku = "*", DisabledPracnostSkutecna = "*", CanZmenitPracnostSkutecna = "*", DisabledUplnost = "*", CanZmenitUplnost = "*", DisabledNositelSuFunRef = "*", CanZmenitNositele = "*", CanShowUkoDen = "*", CanShowTabs = "*", CanShowTabProfilUko = "*", CanShowTabSOD = "*", CanShowTabPoznamky = "*", CanShowPoznamkySSL = "*", CanShowTabGeneze = "*", CanInsertOso = "*", CanDeleteOso = "*", CanInsertSod = "*", CanNovyPodr = "*", VisibleNovyPodr = "*", CanPracovatSKontrTerminy = "*", CanPridelitUkol = "*", CanOdebratUkol = "*", CanPrevzitUkol = "*", CanPredatUkol = "*", CanVyriditUkol = "*", VisibleSplnit = "*", CanSplnit = "*", VisiblePotvrditSplneni = "*", CanPotvrditSplneni = "*", VisiblePozastavit = "*", CanPozastavit = "*", VisibleObnovit = "*", CanObnovit = "*", CanStornovat = "*", VisibleOdmitnout = "*", CanOdmitnout = "*", DisabledTichaProc = "*", CanShowTabSodOdmitnuti = "*", CanOdmitnoutANavrhNovyNositel = "*", CanShowTabSodSplneni = "*", CanVyzadovatSplneniDokumentemCJ = "*", DisabledPriorita = "*", VisibleZobrazitNadrizeny = "*", CanCreate = "*", CanUpdate = "*", CanDelete = "*", CanRestore = "*",}
	const enum GDetailUkoluPermissionsTypes { DisabledNazev = "Gordic.General.ApplicationInterface.GPermission", DisabledStav = "Gordic.General.ApplicationInterface.GPermission", DisabledObsah = "Gordic.General.ApplicationInterface.GPermission", DisabledTermin = "Gordic.General.ApplicationInterface.GPermission", DisabledZadavatel = "Gordic.General.ApplicationInterface.GPermission", CanZmenitTermin = "Gordic.General.ApplicationInterface.GPermission", DisabledPracnostPlanovana = "Gordic.General.ApplicationInterface.GPermission", DisabledPracnostMeritko = "Gordic.General.ApplicationInterface.GPermission", DisabledPoznamka = "Gordic.General.ApplicationInterface.GPermission", DisabledDatumVzniku = "Gordic.General.ApplicationInterface.GPermission", DisabledSslstyp = "Gordic.General.ApplicationInterface.GPermission", DisabledCjUkoSrc = "Gordic.General.ApplicationInterface.GPermission", DisabledMistoVzniku = "Gordic.General.ApplicationInterface.GPermission", DisabledPracnostSkutecna = "Gordic.General.ApplicationInterface.GPermission", CanZmenitPracnostSkutecna = "Gordic.General.ApplicationInterface.GPermission", DisabledUplnost = "Gordic.General.ApplicationInterface.GPermission", CanZmenitUplnost = "Gordic.General.ApplicationInterface.GPermission", DisabledNositelSuFunRef = "Gordic.General.ApplicationInterface.GPermission", CanZmenitNositele = "Gordic.General.ApplicationInterface.GPermission", CanShowUkoDen = "Gordic.General.ApplicationInterface.GPermission", CanShowTabs = "Gordic.General.ApplicationInterface.GPermission", CanShowTabProfilUko = "Gordic.General.ApplicationInterface.GPermission", CanShowTabSOD = "Gordic.General.ApplicationInterface.GPermission", CanShowTabPoznamky = "Gordic.General.ApplicationInterface.GPermission", CanShowPoznamkySSL = "Gordic.General.ApplicationInterface.GPermission", CanShowTabGeneze = "Gordic.General.ApplicationInterface.GPermission", CanInsertOso = "Gordic.General.ApplicationInterface.GPermission", CanDeleteOso = "Gordic.General.ApplicationInterface.GPermission", CanInsertSod = "Gordic.General.ApplicationInterface.GPermission", CanNovyPodr = "Gordic.General.ApplicationInterface.GPermission", VisibleNovyPodr = "Gordic.General.ApplicationInterface.GPermission", CanPracovatSKontrTerminy = "Gordic.General.ApplicationInterface.GPermission", CanPridelitUkol = "Gordic.General.ApplicationInterface.GPermission", CanOdebratUkol = "Gordic.General.ApplicationInterface.GPermission", CanPrevzitUkol = "Gordic.General.ApplicationInterface.GPermission", CanPredatUkol = "Gordic.General.ApplicationInterface.GPermission", CanVyriditUkol = "Gordic.General.ApplicationInterface.GPermission", VisibleSplnit = "Gordic.General.ApplicationInterface.GPermission", CanSplnit = "Gordic.General.ApplicationInterface.GPermission", VisiblePotvrditSplneni = "Gordic.General.ApplicationInterface.GPermission", CanPotvrditSplneni = "Gordic.General.ApplicationInterface.GPermission", VisiblePozastavit = "Gordic.General.ApplicationInterface.GPermission", CanPozastavit = "Gordic.General.ApplicationInterface.GPermission", VisibleObnovit = "Gordic.General.ApplicationInterface.GPermission", CanObnovit = "Gordic.General.ApplicationInterface.GPermission", CanStornovat = "Gordic.General.ApplicationInterface.GPermission", VisibleOdmitnout = "Gordic.General.ApplicationInterface.GPermission", CanOdmitnout = "Gordic.General.ApplicationInterface.GPermission", DisabledTichaProc = "Gordic.General.ApplicationInterface.GPermission", CanShowTabSodOdmitnuti = "Gordic.General.ApplicationInterface.GPermission", CanOdmitnoutANavrhNovyNositel = "Gordic.General.ApplicationInterface.GPermission", CanShowTabSodSplneni = "Gordic.General.ApplicationInterface.GPermission", CanVyzadovatSplneniDokumentemCJ = "Gordic.General.ApplicationInterface.GPermission", DisabledPriorita = "Gordic.General.ApplicationInterface.GPermission", VisibleZobrazitNadrizeny = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanRestore = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDetailUkoluPermissionsTypeLengths {}
}

//#endregion

